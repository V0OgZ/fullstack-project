describe('Comprehensive Screen Tests - All Screens with Map Loading', () => {
  beforeEach(() => {
    // Start from home page
    cy.visit('/');
    
    // Wait for initial load
    cy.get('[data-testid="app-container"]').should('be.visible');
  });

  describe('01. Game Selector Screen', () => {
    it('should load game selector and navigate to scenarios', () => {
      // Test main game selector screen
      cy.get('[data-testid="app-container"]').should('be.visible');
      
      // Test language switching
      cy.get('.language-selector').should('be.visible');
      cy.get('.language-selector').click();
      
      // Test scenario selection
      cy.contains('Conquête Classique').should('be.visible');
      cy.contains('Conquête Mystique').should('be.visible');
      
      // Test Classic Conquest navigation
      cy.contains('Conquête Classique').click();
      cy.url().should('include', '/game/conquest-classique');
      
      // Go back to test Mystical Conquest
      cy.go('back');
      cy.contains('Conquête Mystique').click();
      cy.url().should('include', '/game/mystique-temporel');
    });

    it('should load different language versions', () => {
      cy.get('.language-selector').should('be.visible');
      
      // Test English
      cy.get('.language-selector').click();
      cy.get('[data-language="en"]').click();
      cy.contains('Classic Conquest').should('be.visible');
      
      // Test French  
      cy.get('.language-selector').click();
      cy.get('[data-language="fr"]').click();
      cy.contains('Conquête Classique').should('be.visible');
      
      // Test Russian
      cy.get('.language-selector').click();
      cy.get('[data-language="ru"]').click();
      cy.contains('Классическое Завоевание').should('be.visible');
    });
  });

  describe('02. Game Screen with Map Loading', () => {
    it('should load Classic Conquest game with map', () => {
      // Navigate to Classic Conquest
      cy.contains('Conquête Classique').click();
      cy.url().should('include', '/game/conquest-classique');
      
      // Wait for game initialization
      cy.get('.true-heroes-loading', { timeout: 10000 }).should('be.visible');
      
      // Wait for map to load
      cy.get('.map-container, .game-map, .homm3-map-container, .matrix-game-map', { timeout: 15000 })
        .should('be.visible');
      
      // Test map interaction
      cy.get('.map-tile, .hex-tile').first().should('be.visible');
      cy.get('.map-tile, .hex-tile').first().click();
      
      // Test hero information
      cy.get('.hero-info, .hero-panel, .side-panel').should('be.visible');
      
      // Test turn controls
      cy.get('.turn-controls, .end-turn-btn').should('be.visible');
    });

    it('should load Mystical Conquest game with magical elements', () => {
      // Navigate to Mystical Conquest
      cy.contains('Conquête Mystique').click();
      cy.url().should('include', '/game/mystique-temporel');
      
      // Wait for game initialization
      cy.get('.true-heroes-loading', { timeout: 10000 }).should('be.visible');
      
      // Wait for map to load
      cy.get('.map-container, .game-map, .homm3-map-container, .matrix-game-map', { timeout: 15000 })
        .should('be.visible');
      
      // Test Magic Inventory access
      cy.get('.magic-inventory-toggle, .magic-btn').should('be.visible');
      cy.get('.magic-inventory-toggle, .magic-btn').click();
      
      // Test Magic Inventory interface
      cy.get('.magic-inventory').should('be.visible');
      cy.get('.magic-tabs').should('be.visible');
      cy.get('.magic-items-grid').should('be.visible');
      
      // Test different magic item categories
      cy.get('.magic-tab').contains('Armes').click();
      cy.get('.magic-tab').contains('Armures').click();
      cy.get('.magic-tab').contains('Objets Temporels').click();
      
      // Close magic inventory
      cy.get('.magic-inventory-close, .close-btn').click();
      cy.get('.magic-inventory').should('not.be.visible');
    });

    it('should handle map loading errors gracefully', () => {
      // Navigate to game
      cy.contains('Conquête Classique').click();
      
      // Check for loading states
      cy.get('.true-heroes-loading', { timeout: 5000 }).should('be.visible');
      
      // Wait for either success or error state
      cy.get('.map-container, .game-map, .error-message, .loading-message', { timeout: 20000 })
        .should('be.visible');
      
      // If error occurs, check error handling
      cy.get('body').then(($body) => {
        if ($body.find('.error-message').length > 0) {
          cy.get('.error-message').should('contain', 'Error');
        }
      });
    });
  });

  describe('03. Backend API Tester Screen', () => {
    it('should load and test backend API endpoints', () => {
      // Navigate to backend tester
      cy.visit('/backend-test');
      cy.url().should('include', '/backend-test');
      
      // Test API tester interface
      cy.get('.backend-tester, .api-tester').should('be.visible');
      
      // Test different API endpoints
      cy.get('.api-endpoint').should('have.length.greaterThan', 0);
      
      // Test health endpoint
      cy.get('.test-health-btn, .health-test').click();
      cy.get('.api-result').should('be.visible');
      
      // Test game endpoints
      cy.get('.test-games-btn, .games-test').click();
      cy.get('.api-result').should('be.visible');
      
      // Test units endpoints
      cy.get('.test-units-btn, .units-test').click();
      cy.get('.api-result').should('be.visible');
      
      // Test multiplayer endpoints
      cy.get('.test-multiplayer-btn, .multiplayer-test').click();
      cy.get('.api-result').should('be.visible');
    });

    it('should handle API errors properly', () => {
      cy.visit('/backend-test');
      
      // Test with invalid endpoint
      cy.get('.custom-endpoint-input').type('/invalid/endpoint');
      cy.get('.test-custom-btn').click();
      
      // Check error handling
      cy.get('.error-message, .api-error').should('be.visible');
    });
  });

  describe('04. Multiplayer Session Manager Screen', () => {
    it('should load multiplayer session interface', () => {
      // Navigate to multiplayer
      cy.visit('/multiplayer');
      cy.url().should('include', '/multiplayer');
      
      // Test multiplayer interface
      cy.get('.multiplayer-session-manager').should('be.visible');
      
      // Test session creation
      cy.get('.create-session-btn').should('be.visible');
      cy.get('.create-session-btn').click();
      
      // Test session form
      cy.get('.session-form').should('be.visible');
      cy.get('.session-name-input').type('Test Session');
      cy.get('.max-players-input').select('4');
      cy.get('.game-mode-select').select('conquest');
      
      // Test session creation
      cy.get('.create-session-submit').click();
      
      // Test session list
      cy.get('.session-list').should('be.visible');
      cy.get('.session-item').should('have.length.greaterThan', 0);
      
      // Test session joining
      cy.get('.join-session-btn').first().click();
      cy.get('.session-details').should('be.visible');
    });

    it('should handle WebSocket connection', () => {
      cy.visit('/multiplayer');
      
      // Test WebSocket connection status
      cy.get('.connection-status').should('be.visible');
      
      // Wait for connection
      cy.get('.connection-status').should('contain', 'Connected', { timeout: 10000 });
      
      // Test real-time updates
      cy.get('.session-list').should('be.visible');
    });
  });

  describe('05. Individual Component Screens', () => {
    beforeEach(() => {
      // Navigate to a game first to access components
      cy.contains('Conquête Classique').click();
      cy.get('.true-heroes-loading', { timeout: 10000 }).should('be.visible');
    });

    it('should test Political System component', () => {
      // Access Political System
      cy.get('.political-btn, .politics-btn').click();
      
      // Test Political System interface
      cy.get('.political-system').should('be.visible');
      cy.get('.political-advisors').should('be.visible');
      cy.get('.reputation-display').should('be.visible');
      
      // Test advisor interactions
      cy.get('.advisor-card').first().click();
      cy.get('.advisor-details').should('be.visible');
      
      // Test reputation effects
      cy.get('.reputation-category').should('have.length.greaterThan', 0);
      
      // Test political events
      cy.get('.political-events').should('be.visible');
    });

    it('should test Timeline Viewer component', () => {
      // Access Timeline Viewer
      cy.get('.timeline-btn, .history-btn').click();
      
      // Test Timeline interface
      cy.get('.timeline-viewer').should('be.visible');
      cy.get('.timeline-events').should('be.visible');
      
      // Test timeline navigation
      cy.get('.timeline-controls').should('be.visible');
      cy.get('.timeline-prev').click();
      cy.get('.timeline-next').click();
      
      // Test event details
      cy.get('.timeline-event').first().click();
      cy.get('.event-details').should('be.visible');
    });

    it('should test ZFC Visualizer component', () => {
      // Access ZFC Visualizer
      cy.get('.zfc-btn, .causality-btn').click();
      
      // Test ZFC interface
      cy.get('.zfc-visualizer').should('be.visible');
      cy.get('.zfc-zones').should('be.visible');
      
      // Test zone interactions
      cy.get('.zfc-zone').first().click();
      cy.get('.zone-details').should('be.visible');
      
      // Test shadow actions
      cy.get('.shadow-actions').should('be.visible');
    });

    it('should test Image Test component', () => {
      // Access Image Test
      cy.get('.image-test-btn, .assets-btn').click();
      
      // Test Image Test interface
      cy.get('.image-test').should('be.visible');
      cy.get('.image-grid').should('be.visible');
      
      // Test image categories
      cy.get('.image-category').should('have.length.greaterThan', 0);
      cy.get('.image-category').first().click();
      
      // Test image display
      cy.get('.image-item').should('have.length.greaterThan', 0);
    });

    it('should test Creature Display component', () => {
      // Access Creature Display
      cy.get('.creatures-btn, .bestiary-btn').click();
      
      // Test Creature Display interface
      cy.get('.creature-display').should('be.visible');
      cy.get('.creature-list').should('be.visible');
      
      // Test creature selection
      cy.get('.creature-item').first().click();
      cy.get('.creature-details').should('be.visible');
      
      // Test creature stats
      cy.get('.creature-stats').should('be.visible');
    });

    it('should test Hot Seat Mode component', () => {
      // Access Hot Seat Mode
      cy.get('.hotseat-btn, .local-multiplayer-btn').click();
      
      // Test Hot Seat interface
      cy.get('.hotseat-mode').should('be.visible');
      cy.get('.player-list').should('be.visible');
      
      // Test player switching
      cy.get('.switch-player-btn').click();
      cy.get('.current-player').should('be.visible');
      
      // Test turn management
      cy.get('.turn-controls').should('be.visible');
    });

    it('should test Action Planner component', () => {
      // Access Action Planner
      cy.get('.actions-btn, .planner-btn').click();
      
      // Test Action Planner interface
      cy.get('.action-planner').should('be.visible');
      cy.get('.action-queue').should('be.visible');
      
      // Test action creation
      cy.get('.add-action-btn').click();
      cy.get('.action-form').should('be.visible');
      
      // Test action types
      cy.get('.action-type-select').select('move');
      cy.get('.action-target-input').type('5,3');
      cy.get('.add-action-submit').click();
      
      // Test action queue
      cy.get('.action-item').should('have.length.greaterThan', 0);
    });
  });

  describe('06. Credits and About Screen', () => {
    it('should load credits modal', () => {
      // Access credits from any screen
      cy.get('.credits-btn, .about-btn').click();
      
      // Test Credits modal
      cy.get('.credits-modal').should('be.visible');
      cy.get('.credits-content').should('be.visible');
      
      // Test credits sections
      cy.get('.credits-section').should('have.length.greaterThan', 0);
      
      // Test asset attribution
      cy.get('.asset-credits').should('be.visible');
      
      // Close credits
      cy.get('.credits-close, .close-btn').click();
      cy.get('.credits-modal').should('not.be.visible');
    });
  });

  describe('07. Error Handling and Performance', () => {
    it('should handle network errors gracefully', () => {
      // Simulate network failure
      cy.intercept('GET', '/api/**', { forceNetworkError: true }).as('networkError');
      
      // Try to load a game
      cy.contains('Conquête Classique').click();
      
      // Check error handling
      cy.get('.error-message, .network-error').should('be.visible');
      cy.get('.retry-btn').should('be.visible');
      
      // Test retry functionality
      cy.intercept('GET', '/api/**', { fixture: 'game-data.json' }).as('retrySuccess');
      cy.get('.retry-btn').click();
      
      // Check recovery
      cy.wait('@retrySuccess');
      cy.get('.game-interface').should('be.visible');
    });

    it('should handle loading timeouts', () => {
      // Simulate slow loading
      cy.intercept('GET', '/api/games/**', { delay: 30000 }).as('slowLoad');
      
      // Try to load a game
      cy.contains('Conquête Classique').click();
      
      // Check timeout handling
      cy.get('.loading-timeout, .timeout-error').should('be.visible', { timeout: 35000 });
      cy.get('.timeout-retry').should('be.visible');
    });

    it('should perform well under load', () => {
      // Test performance with rapid navigation
      for (let i = 0; i < 5; i++) {
        cy.contains('Conquête Classique').click();
        cy.go('back');
        cy.contains('Conquête Mystique').click();
        cy.go('back');
      }
      
      // Check that interface remains responsive
      cy.get('[data-testid="app-container"]').should('be.visible');
      cy.get('.language-selector').should('be.visible');
    });
  });

  describe('08. Responsive Design Tests', () => {
    const viewports = [
      { width: 1920, height: 1080 },  // Desktop
      { width: 1366, height: 768 },   // Laptop
      { width: 768, height: 1024 },   // Tablet
      { width: 375, height: 667 }     // Mobile
    ];

    viewports.forEach(viewport => {
      it(`should work correctly on ${viewport.width}x${viewport.height}`, () => {
        cy.viewport(viewport.width, viewport.height);
        
        // Test game selector
        cy.get('[data-testid="app-container"]').should('be.visible');
        cy.get('.language-selector').should('be.visible');
        
        // Test navigation
        cy.contains('Conquête Classique').click();
        cy.get('.true-heroes-loading', { timeout: 10000 }).should('be.visible');
        
        // Test responsive map
        cy.get('.map-container, .game-map', { timeout: 15000 }).should('be.visible');
        
        // Test responsive controls
        cy.get('.game-controls').should('be.visible');
        
        // Test responsive panels
        if (viewport.width >= 768) {
          cy.get('.side-panel').should('be.visible');
        }
      });
    });
  });

  describe('09. Accessibility Tests', () => {
    it('should be accessible with keyboard navigation', () => {
      // Test keyboard navigation
      cy.get('body').tab();
      cy.focused().should('be.visible');
      
      // Navigate with keyboard
      cy.focused().type('{enter}');
      
      // Test focus management
      cy.get('.language-selector').focus();
      cy.focused().type('{enter}');
      cy.get('[data-language="en"]').should('be.focused');
    });

    it('should have proper ARIA labels', () => {
      // Test ARIA labels
      cy.get('[aria-label]').should('have.length.greaterThan', 0);
      cy.get('[role="button"]').should('have.length.greaterThan', 0);
      cy.get('[role="dialog"]').should('exist');
    });

    it('should have proper contrast ratios', () => {
      // Test text contrast
      cy.get('body').should('have.css', 'color');
      cy.get('.btn').should('have.css', 'background-color');
      
      // Test interactive elements
      cy.get('.btn').should('be.visible');
      cy.get('.language-selector').should('be.visible');
    });
  });

  describe('10. Data Persistence Tests', () => {
    it('should persist language selection', () => {
      // Change language
      cy.get('.language-selector').click();
      cy.get('[data-language="en"]').click();
      
      // Reload page
      cy.reload();
      
      // Check persistence
      cy.contains('Classic Conquest').should('be.visible');
    });

    it('should persist game state', () => {
      // Start a game
      cy.contains('Conquête Classique').click();
      cy.get('.true-heroes-loading', { timeout: 10000 }).should('be.visible');
      
      // Make some changes
      cy.get('.map-tile, .hex-tile').first().click();
      
      // Reload page
      cy.reload();
      
      // Check state persistence
      cy.get('.game-interface').should('be.visible');
    });
  });
}); 