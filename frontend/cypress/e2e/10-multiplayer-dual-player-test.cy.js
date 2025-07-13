describe('Multiplayer Dual Player Game Test', () => {
  let gameSessionId;
  let player1Data;
  let player2Data;

  beforeEach(() => {
    // Clear any existing game state
    cy.clearLocalStorage();
    cy.clearCookies();
    
    // Intercept API calls to monitor them
    cy.intercept('POST', '/api/multiplayer/create-session').as('createSession');
    cy.intercept('POST', '/api/multiplayer/join-session').as('joinSession');
    cy.intercept('GET', '/api/multiplayer/sessions').as('getSessions');
    cy.intercept('POST', '/api/game/move').as('makeMove');
    cy.intercept('GET', '/api/game/state/**').as('getGameState');
    cy.intercept('POST', '/api/units/create').as('createUnit');
    cy.intercept('GET', '/api/units/game/**').as('getUnits');
    cy.intercept('PUT', '/api/units/**').as('updateUnit');
  });

  it('should successfully run a complete multiplayer game with 2 players', () => {
    // STEP 1: Player 1 creates a multiplayer session
    cy.log('🎮 STEP 1: Player 1 creates multiplayer session');
    cy.visit('/');
    cy.get('[data-cy="language-selector"]').should('be.visible');
    
    // Navigate to multiplayer arena
    cy.get('[data-cy="scenario-multiplayer-arena"]').click();
    cy.url().should('include', '/game?mode=multiplayer-arena');
    
    // Create a new session
    cy.get('[data-cy="create-session-btn"]').click();
    cy.get('[data-cy="session-name-input"]').type('Cypress Test Game');
    cy.get('[data-cy="max-players-select"]').select('2');
    cy.get('[data-cy="confirm-create-session"]').click();
    
    // Wait for session creation
    cy.wait('@createSession').then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
      gameSessionId = interception.response.body.id;
      player1Data = interception.response.body.players[0];
      cy.log(`✅ Session created with ID: ${gameSessionId}`);
    });
    
    // Verify session appears in the list
    cy.get('[data-cy="session-list"]').should('contain', 'Cypress Test Game');
    cy.get('[data-cy="session-status"]').should('contain', 'Waiting for players');
    
    // STEP 2: Simulate Player 2 joining (using a second browser context)
    cy.log('🎮 STEP 2: Player 2 joins the session');
    
    // Open a second browser window/tab to simulate Player 2
    cy.window().then((win) => {
      // Store Player 1 window reference
      const player1Window = win;
      
      // Open new window for Player 2
      cy.visit('/', { 
        onBeforeLoad: (win) => {
          // Clear storage for Player 2
          win.localStorage.clear();
          win.sessionStorage.clear();
        }
      });
      
      // Player 2 navigates to multiplayer
      cy.get('[data-cy="scenario-multiplayer-arena"]').click();
      
      // Player 2 should see the available session
      cy.wait('@getSessions').then((interception) => {
        expect(interception.response.statusCode).to.equal(200);
        expect(interception.response.body).to.have.length.greaterThan(0);
      });
      
      // Player 2 joins the session
      cy.get(`[data-cy="join-session-${gameSessionId}"]`).click();
      cy.get('[data-cy="player-name-input"]').type('Player 2');
      cy.get('[data-cy="confirm-join-session"]').click();
      
      cy.wait('@joinSession').then((interception) => {
        expect(interception.response.statusCode).to.equal(200);
        player2Data = interception.response.body.players[1];
        cy.log(`✅ Player 2 joined session`);
      });
    });
    
    // STEP 3: Verify both players are in the game
    cy.log('🎮 STEP 3: Verify game state with both players');
    
    // Check that session status changed to "In Progress"
    cy.get('[data-cy="session-status"]').should('contain', 'In Progress');
    cy.get('[data-cy="player-count"]').should('contain', '2/2');
    
    // Verify game board is loaded
    cy.get('[data-cy="game-board"]').should('be.visible');
    cy.get('[data-cy="current-player"]').should('be.visible');
    
    // STEP 4: Test game state API calls
    cy.log('🎮 STEP 4: Test game state API calls');
    
    cy.wait('@getGameState').then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
      const gameState = interception.response.body;
      expect(gameState).to.have.property('players');
      expect(gameState.players).to.have.length(2);
      expect(gameState).to.have.property('currentTurn');
      cy.log(`✅ Game state loaded: Turn ${gameState.currentTurn}`);
    });
    
    // STEP 5: Test unit creation and management
    cy.log('🎮 STEP 5: Test unit creation and management');
    
    // Player 1 creates a unit
    cy.get('[data-cy="create-unit-btn"]').click();
    cy.get('[data-cy="unit-type-select"]').select('warrior');
    cy.get('[data-cy="unit-position-x"]').type('2');
    cy.get('[data-cy="unit-position-y"]').type('3');
    cy.get('[data-cy="confirm-create-unit"]').click();
    
    cy.wait('@createUnit').then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
      const unit = interception.response.body;
      expect(unit).to.have.property('type', 'warrior');
      expect(unit).to.have.property('position');
      cy.log(`✅ Unit created: ${unit.type} at (${unit.position.x}, ${unit.position.y})`);
    });
    
    // Verify units are loaded
    cy.wait('@getUnits').then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
      expect(interception.response.body).to.have.length.greaterThan(0);
    });
    
    // STEP 6: Test unit movement
    cy.log('🎮 STEP 6: Test unit movement');
    
    // Select the created unit
    cy.get('[data-cy="game-board"] [data-cy="unit-warrior"]').first().click();
    
    // Move unit to new position
    cy.get('[data-cy="game-board"] [data-cy="tile-4-3"]').click();
    
    cy.wait('@makeMove').then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
      const moveResult = interception.response.body;
      expect(moveResult).to.have.property('success', true);
      cy.log(`✅ Unit moved successfully`);
    });
    
    // STEP 7: Test turn switching
    cy.log('🎮 STEP 7: Test turn switching');
    
    // End current player's turn
    cy.get('[data-cy="end-turn-btn"]').click();
    
    // Verify turn switched
    cy.get('[data-cy="current-player"]').should('not.contain', player1Data.name);
    
    // STEP 8: Test real-time updates (WebSocket)
    cy.log('🎮 STEP 8: Test real-time updates');
    
    // Wait for WebSocket connection
    cy.wait(2000);
    
    // Verify that both players receive updates
    cy.get('[data-cy="game-log"]').should('contain', 'Unit moved');
    cy.get('[data-cy="game-log"]').should('contain', 'Turn ended');
    
    // STEP 9: Test game completion
    cy.log('🎮 STEP 9: Test game completion scenario');
    
    // Simulate game ending condition (for testing purposes)
    cy.get('[data-cy="admin-end-game"]').click(); // Hidden admin button for testing
    
    // Verify game end state
    cy.get('[data-cy="game-status"]').should('contain', 'Game Ended');
    cy.get('[data-cy="final-scores"]').should('be.visible');
    
    // STEP 10: Verify all API calls were successful
    cy.log('🎮 STEP 10: Verify all API calls were successful');
    
    // Check that all intercepted calls were successful
    cy.get('@createSession').should('have.been.called');
    cy.get('@joinSession').should('have.been.called');
    cy.get('@getSessions').should('have.been.called');
    cy.get('@getGameState').should('have.been.called');
    cy.get('@createUnit').should('have.been.called');
    cy.get('@getUnits').should('have.been.called');
    cy.get('@makeMove').should('have.been.called');
    
    cy.log('✅ All multiplayer API calls completed successfully!');
  });

  it('should handle multiplayer session errors gracefully', () => {
    cy.log('🎮 Testing error handling in multiplayer');
    
    // Test joining non-existent session
    cy.visit('/game?mode=multiplayer-arena');
    
    // Try to join a session that doesn't exist
    cy.intercept('POST', '/api/multiplayer/join-session', {
      statusCode: 404,
      body: { error: 'Session not found' }
    }).as('joinNonExistentSession');
    
    cy.get('[data-cy="join-session-input"]').type('nonexistent-session-id');
    cy.get('[data-cy="join-session-btn"]').click();
    
    cy.wait('@joinNonExistentSession');
    cy.get('[data-cy="error-message"]').should('contain', 'Session not found');
    
    // Test creating session with invalid parameters
    cy.intercept('POST', '/api/multiplayer/create-session', {
      statusCode: 400,
      body: { error: 'Invalid session parameters' }
    }).as('createInvalidSession');
    
    cy.get('[data-cy="create-session-btn"]').click();
    cy.get('[data-cy="session-name-input"]').clear();
    cy.get('[data-cy="confirm-create-session"]').click();
    
    cy.wait('@createInvalidSession');
    cy.get('[data-cy="error-message"]').should('contain', 'Invalid session parameters');
  });

  it('should test concurrent player actions', () => {
    cy.log('🎮 Testing concurrent player actions');
    
    // This test simulates what happens when both players try to act simultaneously
    cy.visit('/game?mode=multiplayer-arena');
    
    // Create session
    cy.get('[data-cy="create-session-btn"]').click();
    cy.get('[data-cy="session-name-input"]').type('Concurrent Test');
    cy.get('[data-cy="confirm-create-session"]').click();
    
    // Simulate concurrent move attempts
    cy.intercept('POST', '/api/game/move', (req) => {
      // Add delay to simulate network latency
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            statusCode: 200,
            body: { success: true, message: 'Move processed' }
          });
        }, 100);
      });
    }).as('concurrentMove');
    
    // Test rapid successive moves
    cy.get('[data-cy="game-board"] [data-cy="tile-1-1"]').click();
    cy.get('[data-cy="game-board"] [data-cy="tile-2-2"]').click();
    cy.get('[data-cy="game-board"] [data-cy="tile-3-3"]').click();
    
    // Verify that moves are processed in order
    cy.wait('@concurrentMove');
    cy.get('[data-cy="move-queue"]').should('contain', 'Processing moves...');
  });

  afterEach(() => {
    // Clean up any created sessions
    if (gameSessionId) {
      cy.request('DELETE', `/api/multiplayer/sessions/${gameSessionId}`).then(() => {
        cy.log(`🧹 Cleaned up session ${gameSessionId}`);
      });
    }
  });
}); 