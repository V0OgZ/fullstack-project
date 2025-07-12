describe('Heroes Reforged - Performance & Stress Tests', () => {
  let sessionIds = [];
  const playerCount = 4;

  beforeEach(() => {
    cy.skipAnimation();
  });

  it('should handle multiple concurrent sessions', () => {
    cy.logToConsole('Testing multiple concurrent sessions');
    
    // Create multiple sessions
    for (let i = 0; i < 3; i++) {
      cy.createMultiplayerSession(`Stress Session ${i}`, 2)
        .then((session) => {
          sessionIds.push(session.sessionId);
          cy.logToConsole(`Created session ${i}: ${session.sessionId}`);
        });
    }
    
    // Verify all sessions are active
    cy.getAvailableSessions().then((sessions) => {
      expect(sessions.length).to.be.at.least(3);
    });
    
    // Join all sessions with different players
    sessionIds.forEach((sessionId, index) => {
      cy.joinMultiplayerSession(sessionId, `stress-player-${index}`);
    });
    
    // Verify session load
    cy.get('[data-testid="session-load"]').should('be.visible');
  });

  it('should handle rapid WebSocket message bursts', () => {
    cy.logToConsole('Testing WebSocket message bursts');
    
    cy.createMultiplayerSession('Burst Test', 2)
      .then((session) => {
        sessionIds.push(session.sessionId);
        
        cy.visit(`/multiplayer/session/${session.sessionId}?playerId=burst-player-1`);
        cy.waitForWebSocketConnection();
        
        // Send rapid burst of messages
        const messageCount = 50;
        for (let i = 0; i < messageCount; i++) {
          cy.sendWebSocketMessage('game.action', {
            sessionId: session.sessionId,
            playerId: 'burst-player-2',
            actionType: 'MOVE_HERO',
            actionData: {
              heroId: 'hero-2',
              targetX: i % 10,
              targetY: Math.floor(i / 10)
            }
          });
        }
        
        // Verify messages are handled correctly
        cy.get('[data-testid="message-queue"]', { timeout: 10000 })
          .should('contain', `${messageCount} processed`);
        
        // Verify performance metrics
        cy.get('[data-testid="performance-metrics"]').should('be.visible');
        cy.get('[data-testid="message-rate"]').should('contain', 'msg/s');
      });
  });

  it('should handle large game maps without performance degradation', () => {
    cy.logToConsole('Testing large map performance');
    
    cy.visit('/');
    cy.waitForHeroesReforged();
    
    // Create large map game
    cy.window().then((win) => {
      win.TEST_LARGE_MAP = true; // Flag for testing
    });
    
    cy.selectGameMode('conquest-mystique');
    cy.get('[data-testid="start-game-button"]').click();
    
    // Measure loading time
    const startTime = Date.now();
    cy.waitForGameLoad().then(() => {
      const loadTime = Date.now() - startTime;
      cy.logToConsole(`Large map loaded in ${loadTime}ms`);
      expect(loadTime).to.be.lessThan(15000); // Should load within 15 seconds
    });
    
    // Verify map rendering performance
    cy.get('[data-testid="map-size"]').should('contain', 'Large Map');
    cy.get('[data-testid="performance-warning"]').should('not.exist');
    
    // Test scrolling performance
    for (let i = 0; i < 10; i++) {
      cy.get('[data-testid="game-canvas"]')
        .trigger('wheel', { deltaY: -100 });
      cy.wait(100);
    }
    
    // Verify frame rate
    cy.get('[data-testid="fps-counter"]').should('be.visible');
    cy.get('[data-testid="fps-value"]').should('not.contain', '0');
  });

  it('should handle memory usage efficiently', () => {
    cy.logToConsole('Testing memory usage');
    
    cy.visit('/');
    cy.waitForHeroesReforged();
    
    // Measure initial memory
    cy.window().then((win) => {
      if (win.performance && win.performance.memory) {
        const initialMemory = win.performance.memory.usedJSHeapSize;
        cy.logToConsole(`Initial memory: ${initialMemory / 1024 / 1024} MB`);
        
        // Start game and play for multiple turns
        cy.selectGameMode('conquest-classique');
        cy.get('[data-testid="start-game-button"]').click();
        cy.waitForGameLoad();
        
        // Simulate extensive gameplay
        for (let turn = 0; turn < 10; turn++) {
          cy.selectHero('hero-1');
          cy.clickHex(turn % 5, turn % 5);
          cy.get('[data-testid="end-turn-button"]').click();
          cy.wait(500);
        }
        
        // Check memory after gameplay
        cy.window().then((endWin) => {
          if (endWin.performance && endWin.performance.memory) {
            const finalMemory = endWin.performance.memory.usedJSHeapSize;
            const memoryIncrease = (finalMemory - initialMemory) / 1024 / 1024;
            cy.logToConsole(`Memory increase: ${memoryIncrease} MB`);
            
            // Memory increase should be reasonable (less than 100MB)
            expect(memoryIncrease).to.be.lessThan(100);
          }
        });
      }
    });
  });

  it('should handle network latency gracefully', () => {
    cy.logToConsole('Testing network latency handling');
    
    cy.createMultiplayerSession('Latency Test', 2)
      .then((session) => {
        sessionIds.push(session.sessionId);
        
        cy.visit(`/multiplayer/session/${session.sessionId}?playerId=latency-player-1`);
        cy.waitForWebSocketConnection();
        
        // Simulate network latency
        cy.window().then((win) => {
          if (win.websocketClient) {
            // Override send method to add delay
            const originalSend = win.websocketClient.send;
            win.websocketClient.send = function(data) {
              setTimeout(() => {
                originalSend.call(this, data);
              }, 500); // 500ms latency
            };
          }
        });
        
        // Test actions with latency
        cy.selectHero('hero-1');
        cy.clickHex(3, 3);
        
        // Verify latency compensation
        cy.get('[data-testid="latency-indicator"]').should('be.visible');
        cy.get('[data-testid="predicted-movement"]').should('be.visible');
        
        // Verify action still completes
        cy.get('[data-testid="action-completed"]', { timeout: 2000 })
          .should('be.visible');
      });
  });

  it('should maintain performance with many shadow actions', () => {
    cy.logToConsole('Testing performance with many shadow actions');
    
    cy.createMultiplayerSession('Shadow Performance', 2)
      .then((session) => {
        sessionIds.push(session.sessionId);
        
        cy.visit(`/multiplayer/session/${session.sessionId}?playerId=shadow-player-1`);
        cy.waitForWebSocketConnection();
        
        // Create many shadow actions
        const shadowCount = 100;
        for (let i = 0; i < shadowCount; i++) {
          cy.sendWebSocketMessage('game.action', {
            sessionId: session.sessionId,
            playerId: 'shadow-player-2',
            actionType: 'MOVE_HERO',
            actionData: {
              heroId: 'hero-2',
              targetX: i % 20,
              targetY: Math.floor(i / 20)
            }
          });
        }
        
        // Verify rendering performance
        cy.get('[data-testid="shadow-count"]')
          .should('contain', shadowCount.toString());
        
        // Verify frame rate doesn't drop significantly
        cy.get('[data-testid="fps-counter"]').should('be.visible');
        cy.get('[data-testid="fps-value"]').then(($fps) => {
          const fps = parseInt($fps.text());
          expect(fps).to.be.greaterThan(30); // Should maintain >30 FPS
        });
      });
  });

  it('should handle session cleanup efficiently', () => {
    cy.logToConsole('Testing session cleanup');
    
    // Create and immediately destroy multiple sessions
    for (let i = 0; i < 5; i++) {
      cy.createMultiplayerSession(`Cleanup Test ${i}`, 2)
        .then((session) => {
          // Immediately leave/destroy session
          cy.request({
            method: 'DELETE',
            url: `${Cypress.env('backendUrl')}/api/multiplayer/sessions/${session.sessionId}`,
            failOnStatusCode: false
          });
        });
    }
    
    // Verify no memory leaks in session management
    cy.getAvailableSessions().then((sessions) => {
      const cleanupSessions = sessions.filter(s => s.name.includes('Cleanup Test'));
      expect(cleanupSessions.length).to.eq(0);
    });
  });

  it('should handle 4-player multiplayer session', () => {
    cy.logToConsole('Testing 4-player multiplayer');
    
    cy.createMultiplayerSession('4-Player Test', 4)
      .then((session) => {
        sessionIds.push(session.sessionId);
        
        // Join with 4 players
        for (let i = 1; i <= 4; i++) {
          cy.joinMultiplayerSession(session.sessionId, `4p-player-${i}`);
        }
        
        cy.visit(`/multiplayer/session/${session.sessionId}?playerId=4p-player-1`);
        cy.waitForWebSocketConnection();
        
        // Verify all 4 players are shown
        cy.get('[data-testid="player-list"]').should('contain', '4 players');
        
        // Test simultaneous actions from all players
        for (let i = 2; i <= 4; i++) {
          cy.sendWebSocketMessage('game.action', {
            sessionId: session.sessionId,
            playerId: `4p-player-${i}`,
            actionType: 'MOVE_HERO',
            actionData: {
              heroId: `hero-${i}`,
              targetX: i * 2,
              targetY: i * 2
            }
          });
        }
        
        // Verify all actions are processed
        cy.get('[data-testid="action-count"]').should('contain', '3');
        
        // Verify performance remains good
        cy.get('[data-testid="performance-warning"]').should('not.exist');
      });
  });

  it('should stress test ZFC calculations', () => {
    cy.logToConsole('Stress testing ZFC calculations');
    
    cy.visit('/');
    cy.waitForHeroesReforged();
    cy.selectGameMode('conquest-mystique');
    cy.get('[data-testid="start-game-button"]').click();
    cy.waitForGameLoad();
    
    // Perform rapid ZFC calculations
    for (let i = 0; i < 50; i++) {
      cy.selectHero('hero-1');
      cy.clickHex(i % 20, Math.floor(i / 20));
      cy.wait(50); // Rapid clicks
    }
    
    // Verify calculations complete
    cy.get('[data-testid="zfc-calculation-count"]')
      .should('contain', '50');
    
    // Verify no calculation errors
    cy.get('[data-testid="calculation-errors"]').should('not.exist');
    
    // Verify performance metrics
    cy.get('[data-testid="avg-calculation-time"]').then(($time) => {
      const avgTime = parseInt($time.text());
      expect(avgTime).to.be.lessThan(100); // Less than 100ms average
    });
  });

  it('should handle browser refresh during multiplayer', () => {
    cy.logToConsole('Testing browser refresh handling');
    
    cy.createMultiplayerSession('Refresh Test', 2)
      .then((session) => {
        sessionIds.push(session.sessionId);
        cy.joinMultiplayerSession(session.sessionId, 'refresh-player-2');
        
        cy.visit(`/multiplayer/session/${session.sessionId}?playerId=refresh-player-1`);
        cy.waitForWebSocketConnection();
        
        // Perform some actions
        cy.selectHero('hero-1');
        cy.clickHex(5, 5);
        
        // Refresh the page
        cy.reload();
        
        // Verify reconnection
        cy.waitForWebSocketConnection();
        
        // Verify game state is restored
        cy.get('[data-testid="session-restored"]').should('be.visible');
        cy.get('[data-testid="player-reconnected"]').should('contain', 'refresh-player-1');
        
        // Verify actions still work after refresh
        cy.selectHero('hero-1');
        cy.clickHex(6, 6);
        cy.get('[data-testid="action-after-refresh"]').should('be.visible');
      });
  });

  afterEach(() => {
    // Clean up all sessions
    sessionIds.forEach(sessionId => {
      cy.request({
        method: 'DELETE',
        url: `${Cypress.env('backendUrl')}/api/multiplayer/sessions/${sessionId}`,
        failOnStatusCode: false
      });
    });
    sessionIds = [];
  });
}); 