describe('Heroes Reforged - Multiplayer Dual Session', () => {
  let sessionId;
  let player1Id = 'test-player-1-' + Date.now();
  let player2Id = 'test-player-2-' + Date.now();

  beforeEach(() => {
    cy.skipAnimation();
  });

  it('should create a multiplayer session and allow two players to join', () => {
    cy.logToConsole('Testing multiplayer session creation');
    
    // Create a multiplayer session via API
    cy.createMultiplayerSession('Test Dual Session', 2, 'conquest-classique')
      .then((session) => {
        sessionId = session.sessionId;
        cy.logToConsole(`Created session: ${sessionId}`);
        
        // Verify session was created
        expect(session.status).to.eq('WAITING');
        expect(session.maxPlayers).to.eq(2);
        expect(session.currentPlayers).to.eq(1);
      });
    
    // Join with second player
    cy.joinMultiplayerSession(sessionId, player2Id)
      .then((session) => {
        cy.logToConsole('Second player joined session');
        expect(session.currentPlayers).to.eq(2);
        expect(session.status).to.eq('WAITING');
      });
  });

  it('should open two browser windows and connect both players', () => {
    cy.logToConsole('Testing dual browser session');
    
    // Create session first
    cy.createMultiplayerSession('Dual Browser Test', 2)
      .then((session) => {
        sessionId = session.sessionId;
        
        // Test in main window (Player 1)
        cy.visit('/multiplayer');
        cy.waitForHeroesReforged();
        
        // Open multiplayer lobby
        cy.openMultiplayerLobby();
        
        // Join the session
        cy.joinSessionUI(sessionId);
        
        // Verify connection
        cy.waitForWebSocketConnection();
        cy.verifyPlayerConnected(player1Id);
        
        // Open second window using cy.window
        cy.window().then((win) => {
          const newWindow = win.open('/multiplayer', '_blank');
          
          // Wait for second window to load
          cy.wrap(newWindow).should('exist');
          
          // Switch context to second window
          cy.wrap(newWindow).its('document').then((doc) => {
            // Simulate second player joining
            cy.logToConsole('Second window opened, simulating second player join');
            
            // Send API request for second player
            cy.joinMultiplayerSession(sessionId, player2Id);
          });
        });
        
        // Verify both players are connected in main window
        cy.get('[data-testid="player-list"]').should('contain', '2 players');
        cy.verifyPlayerConnected(player2Id);
        
        // Start the multiplayer game
        cy.get('[data-testid="start-multiplayer-game"]').click();
        
        // Verify game starts
        cy.waitForGameLoad();
        cy.get('[data-testid="multiplayer-game-active"]').should('be.visible');
      });
  });

  it('should handle real-time WebSocket communication between players', () => {
    cy.logToConsole('Testing WebSocket communication');
    
    cy.createMultiplayerSession('WebSocket Test', 2)
      .then((session) => {
        sessionId = session.sessionId;
        
        // Join with both players
        cy.joinMultiplayerSession(sessionId, player2Id);
        
        // Visit the game as player 1
        cy.visit(`/multiplayer/session/${sessionId}?playerId=${player1Id}`);
        cy.waitForWebSocketConnection();
        
        // Send a WebSocket message
        cy.sendWebSocketMessage('game.action', {
          sessionId: sessionId,
          playerId: player1Id,
          actionType: 'MOVE_HERO',
          actionData: {
            heroId: 'hero-1',
            targetX: 5,
            targetY: 5
          }
        });
        
        // Verify message was sent and received
        cy.get('[data-testid="action-log"]')
          .should('contain', 'Player 1 moved hero');
        
        // Verify other player receives the action
        cy.get('[data-testid="other-player-actions"]')
          .should('contain', 'Hero movement');
      });
  });

  it('should display shadow actions from other players', () => {
    cy.logToConsole('Testing shadow actions visualization');
    
    cy.createMultiplayerSession('Shadow Actions Test', 2)
      .then((session) => {
        sessionId = session.sessionId;
        cy.joinMultiplayerSession(sessionId, player2Id);
        
        cy.visit(`/multiplayer/session/${sessionId}?playerId=${player1Id}`);
        cy.waitForGameLoad();
        
        // Simulate another player's pending action via API
        cy.request({
          method: 'POST',
          url: `${Cypress.env('backendUrl')}/api/multiplayer/sessions/${sessionId}/action`,
          body: {
            playerId: player2Id,
            actionType: 'MOVE_HERO',
            actionData: {
              heroId: 'hero-2',
              targetX: 8,
              targetY: 8
            }
          }
        });
        
        // Verify shadow action is displayed
        cy.verifyShadowAction('MOVE_HERO', player2Id);
        
        // Verify shadow action is translucent
        cy.get(`[data-testid="shadow-action-MOVE_HERO-${player2Id}"]`)
          .should('have.css', 'opacity')
          .and('match', /^0\.[3-7]/); // Between 0.3 and 0.7 opacity
        
        // Verify ZFC conflict detection
        cy.get('[data-testid="zfc-conflict-warning"]').should('be.visible');
      });
  });

  it('should handle ZFC network mode calculations', () => {
    cy.logToConsole('Testing ZFC network mode');
    
    cy.createMultiplayerSession('ZFC Network Test', 2, 'conquest-mystique')
      .then((session) => {
        sessionId = session.sessionId;
        cy.joinMultiplayerSession(sessionId, player2Id);
        
        cy.visit(`/multiplayer/session/${sessionId}?playerId=${player1Id}`);
        cy.waitForGameLoad();
        
        // Select a hero
        cy.selectHero('hero-1');
        
        // Verify network ZFC calculations
        cy.get('[data-testid="zfc-network-mode"]').should('be.visible');
        cy.get('[data-testid="zfc-calculations"]').should('contain', 'Network Mode');
        
        // Move hero and verify network sync
        cy.clickHex(6, 6);
        
        // Verify action is synchronized across network
        cy.get('[data-testid="network-action-sync"]').should('contain', 'Synchronized');
        
        // Verify temporal calculations for conquest mystique
        cy.get('[data-testid="temporal-calculations"]').should('be.visible');
        cy.get('[data-testid="quantum-superposition"]').should('be.visible');
      });
  });

  it('should handle player disconnection and reconnection', () => {
    cy.logToConsole('Testing player disconnection/reconnection');
    
    cy.createMultiplayerSession('Disconnect Test', 2)
      .then((session) => {
        sessionId = session.sessionId;
        cy.joinMultiplayerSession(sessionId, player2Id);
        
        cy.visit(`/multiplayer/session/${sessionId}?playerId=${player1Id}`);
        cy.waitForWebSocketConnection();
        
        // Simulate disconnection
        cy.window().then((win) => {
          if (win.websocketClient) {
            win.websocketClient.close();
          }
        });
        
        // Verify disconnection state
        cy.get('[data-testid="connection-status"]').should('contain', 'Disconnected');
        cy.get('[data-testid="reconnect-button"]').should('be.visible');
        
        // Reconnect
        cy.get('[data-testid="reconnect-button"]').click();
        
        // Verify reconnection
        cy.waitForWebSocketConnection();
        cy.get('[data-testid="connection-status"]').should('contain', 'Connected');
      });
  });

  it('should synchronize game state between players', () => {
    cy.logToConsole('Testing game state synchronization');
    
    cy.createMultiplayerSession('Sync Test', 2)
      .then((session) => {
        sessionId = session.sessionId;
        cy.joinMultiplayerSession(sessionId, player2Id);
        
        cy.visit(`/multiplayer/session/${sessionId}?playerId=${player1Id}`);
        cy.waitForGameLoad();
        
        // Make an action as player 1
        cy.selectHero('hero-1');
        cy.clickHex(4, 4);
        
        // Verify action is pending
        cy.get('[data-testid="pending-actions"]').should('contain', 'Movement');
        
        // Simulate turn synchronization
        cy.get('[data-testid="sync-turn-button"]').click();
        
        // Verify game state is synchronized
        cy.get('[data-testid="game-state-sync"]').should('contain', 'Synchronized');
        
        // Verify turn progression
        cy.get('[data-testid="current-turn"]').should('contain', '2');
      });
  });

  it('should handle conflict resolution between players', () => {
    cy.logToConsole('Testing conflict resolution');
    
    cy.createMultiplayerSession('Conflict Test', 2)
      .then((session) => {
        sessionId = session.sessionId;
        cy.joinMultiplayerSession(sessionId, player2Id);
        
        cy.visit(`/multiplayer/session/${sessionId}?playerId=${player1Id}`);
        cy.waitForGameLoad();
        
        // Create conflicting actions
        cy.selectHero('hero-1');
        cy.clickHex(7, 7);
        
        // Simulate another player targeting the same hex
        cy.request({
          method: 'POST',
          url: `${Cypress.env('backendUrl')}/api/multiplayer/sessions/${sessionId}/action`,
          body: {
            playerId: player2Id,
            actionType: 'MOVE_HERO',
            actionData: {
              heroId: 'hero-2',
              targetX: 7,
              targetY: 7
            }
          }
        });
        
        // Verify conflict detection
        cy.get('[data-testid="conflict-detected"]').should('be.visible');
        cy.get('[data-testid="conflict-resolution"]').should('contain', 'Priority Resolution');
        
        // Verify conflict resolution mechanism
        cy.get('[data-testid="resolution-method"]').should('be.visible');
      });
  });

  it('should handle multiplayer chat functionality', () => {
    cy.logToConsole('Testing multiplayer chat');
    
    cy.createMultiplayerSession('Chat Test', 2)
      .then((session) => {
        sessionId = session.sessionId;
        cy.joinMultiplayerSession(sessionId, player2Id);
        
        cy.visit(`/multiplayer/session/${sessionId}?playerId=${player1Id}`);
        cy.waitForWebSocketConnection();
        
        // Open chat
        cy.get('[data-testid="chat-button"]').click();
        cy.get('[data-testid="chat-panel"]').should('be.visible');
        
        // Send a message
        cy.get('[data-testid="chat-input"]').type('Hello from Player 1!');
        cy.get('[data-testid="send-message"]').click();
        
        // Verify message appears
        cy.get('[data-testid="chat-messages"]')
          .should('contain', 'Hello from Player 1!');
        
        // Simulate message from other player
        cy.sendWebSocketMessage('game.chat', {
          sessionId: sessionId,
          playerId: player2Id,
          message: 'Hello from Player 2!'
        });
        
        // Verify message from other player
        cy.get('[data-testid="chat-messages"]')
          .should('contain', 'Hello from Player 2!');
      });
  });

  it('should complete a full multiplayer game session', () => {
    cy.logToConsole('Testing complete multiplayer session');
    
    cy.createMultiplayerSession('Complete Test', 2)
      .then((session) => {
        sessionId = session.sessionId;
        cy.joinMultiplayerSession(sessionId, player2Id);
        
        cy.visit(`/multiplayer/session/${sessionId}?playerId=${player1Id}`);
        cy.waitForGameLoad();
        
        // Play several turns
        for (let turn = 1; turn <= 3; turn++) {
          cy.logToConsole(`Playing turn ${turn}`);
          
          // Player actions
          cy.selectHero('hero-1');
          cy.clickHex(2 + turn, 2 + turn);
          
          // Resource management
          cy.verifyResources({ gold: 1000 });
          
          // Political decisions
          cy.selectAdvisor('volkov');
          
          // End turn
          cy.get('[data-testid="end-turn-button"]').click();
          
          // Wait for turn sync
          cy.get('[data-testid="turn-sync"]').should('contain', 'Synchronized');
        }
        
        // Verify game completed successfully
        cy.get('[data-testid="game-status"]').should('contain', 'Active');
        cy.get('[data-testid="current-turn"]').should('contain', '4');
      });
  });

  afterEach(() => {
    // Clean up session if created
    if (sessionId) {
      cy.request({
        method: 'DELETE',
        url: `${Cypress.env('backendUrl')}/api/multiplayer/sessions/${sessionId}`,
        failOnStatusCode: false
      });
    }
  });
}); 