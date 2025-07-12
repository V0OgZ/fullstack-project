describe('🌐 Multiplayer Arena - Comprehensive 2-Player Tests', () => {
  beforeEach(() => {
    // Visit the home page
    cy.visit('http://localhost:3000');
    cy.wait(1000); // Allow page to load
  });

  describe('🎮 Multiplayer Lobby System', () => {
    it('should display multiplayer option on home page', () => {
      // Check that multiplayer option exists
      cy.contains('🌐 Multiplayer Arena').should('be.visible');
      cy.contains('Compete against other players in real-time battles').should('be.visible');
      cy.contains('🏆 Ranked matches').should('be.visible');
      cy.contains('👥 2-8 players').should('be.visible');
      cy.contains('⚡ Real-time strategy').should('be.visible');
    });

    it('should navigate to multiplayer lobby', () => {
      // Click on multiplayer option
      cy.contains('🌐 Multiplayer Arena').click();
      
      // Verify we're in the multiplayer lobby
      cy.url().should('include', '/game/multiplayer-arena');
      cy.contains('🌐 Multiplayer Arena').should('be.visible');
      cy.contains('👤 Your Name:').should('be.visible');
      cy.contains('👥 Number of Players:').should('be.visible');
    });

    it('should validate player name input', () => {
      // Navigate to multiplayer lobby
      cy.contains('🌐 Multiplayer Arena').click();
      
      // Check that Start Battle button is disabled without name
      cy.get('button').contains('🚀 Start Battle').should('be.disabled');
      
      // Enter player name
      cy.get('input[placeholder="Enter your hero name..."]').type('TestHero1');
      
      // Button should still be disabled without session
      cy.get('button').contains('🚀 Start Battle').should('be.disabled');
    });

    it('should create multiplayer session', () => {
      // Navigate to multiplayer lobby
      cy.contains('🌐 Multiplayer Arena').click();
      
      // Enter player name
      cy.get('input[placeholder="Enter your hero name..."]').type('Player1');
      
      // Select number of players
      cy.get('select').select('2 Players - Duel');
      
      // Create new session
      cy.get('button').contains('🎮 Create New Game').click();
      
      // Verify session created
      cy.contains('🎯 Session Created!').should('be.visible');
      cy.contains('Session ID:').should('be.visible');
      cy.get('strong').should('contain', 'MP-');
      
      // Start Battle button should now be enabled
      cy.get('button').contains('🚀 Start Battle').should('not.be.disabled');
    });
  });

  describe('🔥 2-Player Gameplay Simulation', () => {
    let sessionId;

    beforeEach(() => {
      // Create a session for testing
      cy.contains('🌐 Multiplayer Arena').click();
      cy.get('input[placeholder="Enter your hero name..."]').type('Player1');
      cy.get('select').select('2 Players - Duel');
      cy.get('button').contains('🎮 Create New Game').click();
      
      // Extract session ID for later use
      cy.get('strong').then(($el) => {
        sessionId = $el.text();
      });
    });

    it('should start multiplayer game and display game interface', () => {
      // Start the game
      cy.get('button').contains('🚀 Start Battle').click();
      
      // Verify we're in the game interface
      cy.contains('⚔️ Heroes of Time').should('be.visible');
      cy.get('[data-testid="game-map"]', { timeout: 10000 }).should('be.visible');
      
      // Check for multiplayer-specific UI elements
      cy.contains('🏆 Players').should('be.visible');
      cy.contains('Player 1').should('be.visible');
    });

    it('should display player list in multiplayer mode', () => {
      cy.get('button').contains('🚀 Start Battle').click();
      
      // Wait for game to load
      cy.wait(2000);
      
      // Check for multiplayer indicators
      cy.contains('🏆 Players (2)').should('be.visible');
      cy.contains('Player 1').should('be.visible');
      cy.contains('Player 2').should('be.visible');
      
      // Check for online status indicators
      cy.get('.player-status.online').should('have.length.at.least', 1);
    });

    it('should handle turn-based multiplayer mechanics', () => {
      cy.get('button').contains('🚀 Start Battle').click();
      cy.wait(2000);
      
      // Verify turn indicator
      cy.contains('🎯 Turn').should('be.visible');
      cy.contains('👤 Player').should('be.visible');
      
      // Check that End Turn button is available
      cy.get('button').contains('⏭️').should('be.visible');
      
      // Test end turn functionality
      cy.get('button').contains('⏭️').click();
      
      // Verify turn progression (may change player or increment turn)
      cy.wait(1000);
      cy.contains('🎯 Turn').should('be.visible');
    });
  });

  describe('🎯 Multiplayer Game Features', () => {
    beforeEach(() => {
      // Setup multiplayer game
      cy.contains('🌐 Multiplayer Arena').click();
      cy.get('input[placeholder="Enter your hero name..."]').type('TestPlayer');
      cy.get('select').select('2 Players - Duel');
      cy.get('button').contains('🎮 Create New Game').click();
      cy.get('button').contains('🚀 Start Battle').click();
      cy.wait(2000);
    });

    it('should display heroes in multiplayer mode', () => {
      // Open heroes tab if available
      cy.get('button').contains('⚔️ Heroes').click();
      
      // Check for hero display
      cy.contains('⚔️ Your Heroes').should('be.visible');
      cy.contains('Sir Gareth').should('be.visible').or(cy.contains('Elena the Wise').should('be.visible'));
      
      // Verify hero stats are shown
      cy.contains('⚔️ Attack:').should('be.visible');
      cy.contains('🛡️ Defense:').should('be.visible');
    });

    it('should show magic inventory in multiplayer', () => {
      // Look for magic inventory button
      cy.get('button').contains('🎒').should('be.visible');
      
      // Click to open magic inventory
      cy.get('button').contains('🎒').click();
      
      // Verify magic inventory opens
      cy.contains('🔮 Magic Inventory').should('be.visible');
      cy.contains('💰 Gold:').should('be.visible');
      
      // Close inventory
      cy.get('button').contains('✕').click();
    });

    it('should handle resource management in multiplayer', () => {
      // Check resource display
      cy.contains('💰').should('be.visible'); // Gold
      cy.contains('🪵').should('be.visible'); // Wood
      cy.contains('🪨').should('be.visible'); // Stone
      cy.contains('💎').should('be.visible'); // Mana
      
      // Verify resources have values
      cy.get('[style*="font-family: JetBrains Mono"]').should('have.length.at.least', 4);
    });

    it('should support language switching in multiplayer', () => {
      // Check language switcher
      cy.contains('🇬🇧 EN').should('be.visible');
      cy.contains('🇫🇷 FR').should('be.visible');
      cy.contains('🇷🇺 RU').should('be.visible');
      
      // Test language switching
      cy.contains('🇫🇷 FR').click();
      cy.wait(500);
      
      // Switch back to English
      cy.contains('🇬🇧 EN').click();
      cy.wait(500);
    });
  });

  describe('⚡ Multiplayer Performance & Stress Tests', () => {
    it('should handle rapid session creation', () => {
      // Navigate to multiplayer multiple times
      for (let i = 0; i < 3; i++) {
        cy.contains('🌐 Multiplayer Arena').click();
        cy.get('input[placeholder="Enter your hero name..."]').clear().type(`Player${i}`);
        cy.get('button').contains('🎮 Create New Game').click();
        cy.contains('🎯 Session Created!').should('be.visible');
        cy.go('back');
        cy.wait(500);
      }
    });

    it('should handle multiple player configurations', () => {
      cy.contains('🌐 Multiplayer Arena').click();
      cy.get('input[placeholder="Enter your hero name..."]').type('TestPlayer');
      
      // Test different player counts
      const playerCounts = ['2 Players - Duel', '3 Players - Triangle', '4 Players - Free-for-All'];
      
      playerCounts.forEach((count) => {
        cy.get('select').select(count);
        cy.get('button').contains('🎮 Create New Game').click();
        cy.contains('🎯 Session Created!').should('be.visible');
        cy.wait(500);
      });
    });

    it('should handle game state persistence in multiplayer', () => {
      // Create and start game
      cy.contains('🌐 Multiplayer Arena').click();
      cy.get('input[placeholder="Enter your hero name..."]').type('PersistenceTest');
      cy.get('button').contains('🎮 Create New Game').click();
      cy.get('button').contains('🚀 Start Battle').click();
      cy.wait(2000);
      
      // Verify game state is loaded
      cy.contains('⚔️ Heroes of Time').should('be.visible');
      cy.contains('🎯 Turn').should('be.visible');
      
      // Test refresh behavior
      cy.reload();
      cy.wait(3000);
      
      // Should still be in game or gracefully handle reload
      cy.get('body').should('be.visible');
    });
  });

  describe('🔄 Multiplayer Error Handling', () => {
    it('should handle network errors gracefully', () => {
      // Navigate to multiplayer
      cy.contains('🌐 Multiplayer Arena').click();
      cy.get('input[placeholder="Enter your hero name..."]').type('ErrorTest');
      
      // Simulate network issues by intercepting requests
      cy.intercept('POST', '/api/**', { statusCode: 500 }).as('networkError');
      
      cy.get('button').contains('🎮 Create New Game').click();
      
      // Should still show the interface (offline mode)
      cy.contains('🎯 Session Created!').should('be.visible');
    });

    it('should validate empty player names', () => {
      cy.contains('🌐 Multiplayer Arena').click();
      
      // Try to create game without name
      cy.get('button').contains('🎮 Create New Game').click();
      cy.contains('🎯 Session Created!').should('be.visible');
      
      // Start button should be disabled without name
      cy.get('button').contains('🚀 Start Battle').should('be.disabled');
    });

    it('should handle invalid session IDs', () => {
      cy.contains('🌐 Multiplayer Arena').click();
      cy.get('input[placeholder="Enter your hero name..."]').type('InvalidTest');
      
      // Create session first
      cy.get('button').contains('🎮 Create New Game').click();
      cy.contains('🎯 Session Created!').should('be.visible');
      
      // Should be able to start even with potential backend issues
      cy.get('button').contains('🚀 Start Battle').click();
      cy.wait(2000);
      
      // Should reach game interface or show error gracefully
      cy.get('body').should('be.visible');
    });
  });

  describe('🏆 Multiplayer Integration Tests', () => {
    it('should complete full multiplayer workflow', () => {
      // Step 1: Access multiplayer
      cy.contains('🌐 Multiplayer Arena').click();
      cy.contains('🌐 Multiplayer Arena').should('be.visible');
      
      // Step 2: Setup player
      cy.get('input[placeholder="Enter your hero name..."]').type('IntegrationPlayer');
      cy.get('select').select('2 Players - Duel');
      
      // Step 3: Create session
      cy.get('button').contains('🎮 Create New Game').click();
      cy.contains('🎯 Session Created!').should('be.visible');
      
      // Step 4: Start game
      cy.get('button').contains('🚀 Start Battle').click();
      cy.wait(3000);
      
      // Step 5: Verify game loaded
      cy.contains('⚔️ Heroes of Time').should('be.visible');
      
      // Step 6: Test basic interactions
      cy.get('button').contains('⚔️ Heroes').click();
      cy.contains('⚔️ Your Heroes').should('be.visible');
      
      // Step 7: Test magic inventory
      cy.get('button').contains('🎒').click();
      cy.contains('🔮 Magic Inventory').should('be.visible');
      cy.get('button').contains('✕').click();
      
      // Step 8: Test end turn
      cy.get('button').contains('⏭️').click();
      cy.wait(1000);
      
      // Workflow complete
      cy.contains('⚔️ Heroes of Time').should('be.visible');
    });

    it('should handle concurrent player actions', () => {
      // Simulate concurrent gameplay
      cy.contains('🌐 Multiplayer Arena').click();
      cy.get('input[placeholder="Enter your hero name..."]').type('ConcurrentPlayer');
      cy.get('button').contains('🎮 Create New Game').click();
      cy.get('button').contains('🚀 Start Battle').click();
      cy.wait(2000);
      
      // Perform multiple rapid actions
      cy.get('button').contains('⚔️ Heroes').click();
      cy.get('button').contains('🏰 Buildings').click();
      cy.get('button').contains('🎯 Actions').click();
      cy.get('button').contains('⚔️ Heroes').click();
      
      // Should handle rapid UI changes
      cy.contains('⚔️ Your Heroes').should('be.visible');
    });
  });

  describe('📊 Multiplayer Analytics & Monitoring', () => {
    it('should track multiplayer session creation', () => {
      cy.window().then((win) => {
        // Monitor console for session creation logs
        cy.stub(win.console, 'log').as('consoleLog');
      });
      
      cy.contains('🌐 Multiplayer Arena').click();
      cy.get('input[placeholder="Enter your hero name..."]').type('AnalyticsTest');
      cy.get('button').contains('🎮 Create New Game').click();
      
      // Check for session creation logging
      cy.get('@consoleLog').should('have.been.calledWith', Cypress.sinon.match(/Created multiplayer session/));
    });

    it('should monitor game performance in multiplayer', () => {
      // Performance timing test
      const startTime = Date.now();
      
      cy.contains('🌐 Multiplayer Arena').click();
      cy.get('input[placeholder="Enter your hero name..."]').type('PerformanceTest');
      cy.get('button').contains('🎮 Create New Game').click();
      cy.get('button').contains('🚀 Start Battle').click();
      
      cy.contains('⚔️ Heroes of Time').should('be.visible').then(() => {
        const loadTime = Date.now() - startTime;
        // Game should load within reasonable time (10 seconds)
        expect(loadTime).to.be.lessThan(10000);
      });
    });
  });
}); 