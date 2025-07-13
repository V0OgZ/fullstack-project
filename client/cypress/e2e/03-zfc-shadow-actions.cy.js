describe('Heroes Reforged - ZFC & Shadow Actions', () => {
  let sessionId;
  let player1Id = 'zfc-player-1-' + Date.now();
  let player2Id = 'zfc-player-2-' + Date.now();

  beforeEach(() => {
    cy.skipAnimation();
  });

  it('should display ZFC zones correctly in solo mode', () => {
    cy.logToConsole('Testing ZFC zones in solo mode');
    
    cy.visit('/');
    cy.waitForHeroesReforged();
    cy.selectGameMode('conquest-mystique');
    cy.get('[data-testid="start-game-button"]').click();
    cy.waitForGameLoad();
    
    // Select a hero
    cy.get('[data-testid^="hero-"]').first().click();
    
    // Verify ZFC zone is displayed
    cy.get('[data-testid="zfc-overlay"]').should('be.visible');
    cy.get('[data-testid="zfc-zone"]').should('have.class', 'zfc-active');
    
    // Verify ZFC calculation details
    cy.get('[data-testid="zfc-calculations"]').should('be.visible');
    cy.get('[data-testid="movement-cost"]').should('contain', 'ZFC Cost:');
    
    // Test movement cost calculation
    cy.clickHex(5, 5);
    cy.get('[data-testid="zfc-cost-display"]').should('be.visible');
    cy.get('[data-testid="movement-preview"]').should('contain', 'Cost: ');
  });

  it('should handle temporal objects in conquest mystique mode', () => {
    cy.logToConsole('Testing temporal objects');
    
    cy.visit('/');
    cy.waitForHeroesReforged();
    cy.selectGameMode('conquest-mystique');
    cy.get('[data-testid="start-game-button"]').click();
    cy.waitForGameLoad();
    
    // Verify temporal objects are present
    cy.get('[data-testid="temporal-objects"]').should('be.visible');
    cy.get('[data-testid^="temporal-object-"]').should('have.length.at.least', 1);
    
    // Interact with a temporal object
    cy.get('[data-testid^="temporal-object-"]').first().click();
    
    // Verify temporal interaction interface
    cy.get('[data-testid="temporal-interaction"]').should('be.visible');
    cy.get('[data-testid="temporal-effects"]').should('be.visible');
    
    // Verify quantum superposition states
    cy.get('[data-testid="quantum-states"]').should('be.visible');
    cy.get('[data-testid="superposition-indicator"]').should('contain', 'Quantum');
  });

  it('should calculate ZFC network mode in multiplayer', () => {
    cy.logToConsole('Testing ZFC network mode calculations');
    
    cy.createMultiplayerSession('ZFC Network', 2, 'conquest-mystique')
      .then((session) => {
        sessionId = session.sessionId;
        cy.joinMultiplayerSession(sessionId, player2Id);
        
        cy.visit(`/multiplayer/session/${sessionId}?playerId=${player1Id}`);
        cy.waitForGameLoad();
        cy.waitForWebSocketConnection();
        
        // Verify network ZFC mode is active
        cy.get('[data-testid="zfc-network-mode"]').should('be.visible');
        cy.get('[data-testid="network-calculations"]').should('contain', 'Network Mode Active');
        
        // Select hero and verify network ZFC
        cy.selectHero('hero-1');
        cy.get('[data-testid="zfc-network-zone"]').should('be.visible');
        
        // Verify distributed calculations
        cy.get('[data-testid="distributed-zfc"]').should('contain', 'Distributed Processing');
        
        // Test movement with network ZFC
        cy.clickHex(8, 8);
        
        // Verify network synchronization
        cy.get('[data-testid="zfc-network-sync"]').should('contain', 'Synchronized');
      });
  });

  it('should display shadow actions from other players', () => {
    cy.logToConsole('Testing shadow actions display');
    
    cy.createMultiplayerSession('Shadow Actions', 2)
      .then((session) => {
        sessionId = session.sessionId;
        cy.joinMultiplayerSession(sessionId, player2Id);
        
        cy.visit(`/multiplayer/session/${sessionId}?playerId=${player1Id}`);
        cy.waitForGameLoad();
        cy.waitForWebSocketConnection();
        
        // Create a shadow action via WebSocket
        cy.sendWebSocketMessage('game.action', {
          sessionId: sessionId,
          playerId: player2Id,
          actionType: 'MOVE_HERO',
          actionData: {
            heroId: 'hero-2',
            targetX: 6,
            targetY: 6
          }
        });
        
        // Verify shadow action appears
        cy.get('[data-testid="shadow-actions"]').should('be.visible');
        cy.get(`[data-testid="shadow-action-${player2Id}"]`)
          .should('be.visible')
          .and('have.class', 'shadow-action');
        
        // Verify shadow action is translucent
        cy.get(`[data-testid="shadow-action-${player2Id}"]`)
          .should('have.css', 'opacity')
          .and('match', /^0\.[2-7]/);
        
        // Verify shadow action preview
        cy.get('[data-testid="shadow-preview"]').should('contain', 'Player 2');
        cy.get('[data-testid="action-type-preview"]').should('contain', 'Movement');
      });
  });

  it('should handle shadow action bluffing mechanics', () => {
    cy.logToConsole('Testing shadow action bluffing');
    
    cy.createMultiplayerSession('Bluffing Test', 2)
      .then((session) => {
        sessionId = session.sessionId;
        cy.joinMultiplayerSession(sessionId, player2Id);
        
        cy.visit(`/multiplayer/session/${sessionId}?playerId=${player1Id}`);
        cy.waitForGameLoad();
        cy.waitForWebSocketConnection();
        
        // Create a bluff action
        cy.get('[data-testid="bluff-mode"]').click();
        cy.selectHero('hero-1');
        cy.clickHex(9, 9);
        
        // Verify bluff action is created
        cy.get('[data-testid="bluff-actions"]').should('be.visible');
        cy.get('[data-testid="bluff-indicator"]').should('contain', 'Bluff Active');
        
        // Verify bluff action appears to other players
        cy.get('[data-testid="fake-shadow-action"]').should('be.visible');
        
        // Cancel bluff
        cy.get('[data-testid="cancel-bluff"]').click();
        cy.get('[data-testid="bluff-cancelled"]').should('be.visible');
      });
  });

  it('should detect and resolve ZFC conflicts', () => {
    cy.logToConsole('Testing ZFC conflict detection and resolution');
    
    cy.createMultiplayerSession('Conflict Resolution', 2)
      .then((session) => {
        sessionId = session.sessionId;
        cy.joinMultiplayerSession(sessionId, player2Id);
        
        cy.visit(`/multiplayer/session/${sessionId}?playerId=${player1Id}`);
        cy.waitForGameLoad();
        cy.waitForWebSocketConnection();
        
        // Create overlapping ZFC zones
        cy.selectHero('hero-1');
        cy.clickHex(7, 7);
        
        // Simulate conflicting action from another player
        cy.sendWebSocketMessage('game.action', {
          sessionId: sessionId,
          playerId: player2Id,
          actionType: 'MOVE_HERO',
          actionData: {
            heroId: 'hero-2',
            targetX: 7,
            targetY: 7
          }
        });
        
        // Verify conflict detection
        cy.get('[data-testid="zfc-conflict"]').should('be.visible');
        cy.get('[data-testid="conflict-warning"]').should('contain', 'ZFC Conflict Detected');
        
        // Verify conflict resolution options
        cy.get('[data-testid="resolution-options"]').should('be.visible');
        cy.get('[data-testid="priority-resolution"]').should('be.visible');
        cy.get('[data-testid="temporal-resolution"]').should('be.visible');
        
        // Choose resolution method
        cy.get('[data-testid="priority-resolution"]').click();
        
        // Verify conflict is resolved
        cy.get('[data-testid="conflict-resolved"]').should('be.visible');
        cy.get('[data-testid="resolution-result"]').should('contain', 'Resolved');
      });
  });

  it('should handle temporal paradox resolution', () => {
    cy.logToConsole('Testing temporal paradox resolution');
    
    cy.createMultiplayerSession('Paradox Test', 2, 'conquest-mystique')
      .then((session) => {
        sessionId = session.sessionId;
        cy.joinMultiplayerSession(sessionId, player2Id);
        
        cy.visit(`/multiplayer/session/${sessionId}?playerId=${player1Id}`);
        cy.waitForGameLoad();
        
        // Create temporal paradox scenario
        cy.get('[data-testid="temporal-mode"]').click();
        cy.selectHero('hero-1');
        
        // Interact with temporal object
        cy.get('[data-testid^="temporal-object-"]').first().click();
        cy.get('[data-testid="temporal-manipulation"]').click();
        
        // Create paradox by modifying past action
        cy.get('[data-testid="modify-past-action"]').click();
        
        // Verify paradox detection
        cy.get('[data-testid="temporal-paradox"]').should('be.visible');
        cy.get('[data-testid="paradox-warning"]').should('contain', 'Temporal Paradox');
        
        // Verify paradox resolution mechanism
        cy.get('[data-testid="paradox-resolution"]').should('be.visible');
        cy.get('[data-testid="timeline-correction"]').should('be.visible');
        
        // Apply resolution
        cy.get('[data-testid="apply-correction"]').click();
        
        // Verify paradox is resolved
        cy.get('[data-testid="paradox-resolved"]').should('be.visible');
        cy.get('[data-testid="timeline-stable"]').should('contain', 'Timeline Stabilized');
      });
  });

  it('should display quantum superposition states', () => {
    cy.logToConsole('Testing quantum superposition visualization');
    
    cy.visit('/');
    cy.waitForHeroesReforged();
    cy.selectGameMode('conquest-mystique');
    cy.get('[data-testid="start-game-button"]').click();
    cy.waitForGameLoad();
    
    // Enable quantum mode
    cy.get('[data-testid="quantum-mode"]').click();
    
    // Select hero and create superposition
    cy.selectHero('hero-1');
    cy.get('[data-testid="create-superposition"]').click();
    
    // Verify multiple possible states
    cy.get('[data-testid="quantum-states"]').should('be.visible');
    cy.get('[data-testid^="quantum-state-"]').should('have.length.at.least', 2);
    
    // Verify probability indicators
    cy.get('[data-testid="probability-indicators"]').should('be.visible');
    cy.get('[data-testid^="probability-"]').each(($el) => {
      cy.wrap($el).should('contain', '%');
    });
    
    // Collapse superposition
    cy.get('[data-testid="collapse-superposition"]').click();
    
    // Verify state collapse
    cy.get('[data-testid="collapsed-state"]').should('be.visible');
    cy.get('[data-testid="final-state"]').should('be.visible');
  });

  it('should handle multi-layer ZFC interactions', () => {
    cy.logToConsole('Testing multi-layer ZFC interactions');
    
    cy.createMultiplayerSession('Multi-layer ZFC', 3, 'conquest-mystique')
      .then((session) => {
        sessionId = session.sessionId;
        cy.joinMultiplayerSession(sessionId, player2Id);
        cy.joinMultiplayerSession(sessionId, 'zfc-player-3-' + Date.now());
        
        cy.visit(`/multiplayer/session/${sessionId}?playerId=${player1Id}`);
        cy.waitForGameLoad();
        cy.waitForWebSocketConnection();
        
        // Create multi-layer interaction
        cy.selectHero('hero-1');
        cy.get('[data-testid="multi-layer-mode"]').click();
        
        // Verify multiple ZFC layers
        cy.get('[data-testid="zfc-layers"]').should('be.visible');
        cy.get('[data-testid^="zfc-layer-"]').should('have.length.at.least', 3);
        
        // Test layer interactions
        cy.clickHex(10, 10);
        
        // Verify layer calculations
        cy.get('[data-testid="layer-calculations"]').should('be.visible');
        cy.get('[data-testid="interaction-matrix"]').should('be.visible');
        
        // Verify complex conflict resolution
        cy.get('[data-testid="multi-layer-resolution"]').should('be.visible');
      });
  });

  it('should handle real-time shadow action updates', () => {
    cy.logToConsole('Testing real-time shadow action updates');
    
    cy.createMultiplayerSession('Real-time Shadows', 2)
      .then((session) => {
        sessionId = session.sessionId;
        cy.joinMultiplayerSession(sessionId, player2Id);
        
        cy.visit(`/multiplayer/session/${sessionId}?playerId=${player1Id}`);
        cy.waitForGameLoad();
        cy.waitForWebSocketConnection();
        
        // Monitor shadow action updates
        cy.get('[data-testid="shadow-monitor"]').should('be.visible');
        
        // Create rapid shadow actions
        for (let i = 0; i < 5; i++) {
          cy.sendWebSocketMessage('game.action', {
            sessionId: sessionId,
            playerId: player2Id,
            actionType: 'MOVE_HERO',
            actionData: {
              heroId: 'hero-2',
              targetX: 5 + i,
              targetY: 5 + i
            }
          });
          
          // Wait briefly between actions
          cy.wait(500);
        }
        
        // Verify all shadow actions are displayed
        cy.get('[data-testid="shadow-actions"]')
          .find('[data-testid^="shadow-action-"]')
          .should('have.length', 5);
        
        // Verify real-time updates
        cy.get('[data-testid="update-indicator"]').should('contain', 'Real-time');
      });
  });

  afterEach(() => {
    // Clean up session
    if (sessionId) {
      cy.request({
        method: 'DELETE',
        url: `${Cypress.env('backendUrl')}/api/multiplayer/sessions/${sessionId}`,
        failOnStatusCode: false
      });
    }
  });
}); 