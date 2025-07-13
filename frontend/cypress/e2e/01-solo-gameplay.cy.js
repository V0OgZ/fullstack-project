describe('Heroes of Time - Solo Gameplay', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should load the main page and display game selector', () => {
    cy.logToConsole('Testing main page load');
    
    // Verify main page elements
    cy.contains('🎮 Heroes of Time 🎮').should('be.visible');
    cy.get('.language-selector').should('be.visible');
    cy.get('a[href*="/game/conquete-classique"]').should('be.visible');
    cy.get('a[href*="/game/mystique-temporel"]').should('be.visible');
  });

  it('should navigate to classic conquest game', () => {
    cy.logToConsole('Testing classic conquest navigation');
    
    // Click on classic conquest
    cy.get('a[href*="/game/conquete-classique"]').click();
    
    // Wait for game to load
    cy.url().should('include', '/game/conquete-classique');
    
    // Check that we're in a game (basic check)
    cy.get('body').should('be.visible');
  });

  it('should navigate to mystical conquest game', () => {
    cy.logToConsole('Testing mystical conquest navigation');
    
    // Click on mystical conquest
    cy.get('a[href*="/game/mystique-temporel"]').click();
    
    // Wait for game to load
    cy.url().should('include', '/game/mystique-temporel');
    
    // Check that we're in a game (basic check)
    cy.get('body').should('be.visible');
  });

  it('should display game features and tips', () => {
    cy.logToConsole('Testing game features display');
    
    // Check that game features are present (using translation keys)
    cy.get('.game-features').should('be.visible');
    cy.get('.rotating-tips').should('be.visible');
  });

  it('should display multiplayer arena option', () => {
    cy.logToConsole('Testing multiplayer arena option');
    
    // Check multiplayer arena link
    cy.get('a[href*="/game/multiplayer-arena"]').should('be.visible');
  });

  it('should have proper responsive design', () => {
    cy.logToConsole('Testing responsive design');
    
    // Test mobile viewport
    cy.viewport('iphone-x');
    cy.contains('🎮 Heroes of Time 🎮').should('be.visible');
    
    // Test tablet viewport
    cy.viewport('ipad-2');
    cy.contains('🎮 Heroes of Time 🎮').should('be.visible');
    cy.get('.game-options').should('be.visible');
    
    // Back to desktop
    cy.viewport(1280, 720);
    cy.contains('🎮 Heroes of Time 🎮').should('be.visible');
  });

  it('should display difficulty indicators', () => {
    cy.logToConsole('Testing difficulty indicators');
    
    // Check difficulty indicators are present
    cy.get('.difficulty-indicator').should('have.length', 3);
  });

  it('should display game icons', () => {
    cy.logToConsole('Testing game icons');
    
    // Check game icons are present
    cy.get('.game-icon').should('have.length', 3);
    cy.contains('🏰').should('be.visible'); // Classic
    cy.contains('🔮').should('be.visible'); // Mystical
    cy.contains('🌐').should('be.visible'); // Multiplayer
  });

  it('should display language selector with flags', () => {
    cy.logToConsole('Testing language selector');
    
    // Check that language selector is present
    cy.get('.language-selector').should('be.visible');
    
    // Check for flag buttons
    cy.contains('🇫🇷 FR').should('be.visible');
    cy.contains('🇬🇧 EN').should('be.visible');
    cy.contains('🇷🇺 RU').should('be.visible');
  });

  it('should switch languages correctly', () => {
    cy.logToConsole('Testing language switching');
    
    // Switch to French
    cy.contains('🇫🇷 FR').click();
    cy.contains('Choisir un scénario').should('be.visible');
    
    // Switch to Russian
    cy.contains('🇷🇺 RU').click();
    cy.contains('Выберите сценарий').should('be.visible');
    
    // Switch back to English
    cy.contains('🇬🇧 EN').click();
    cy.contains('Choose a scenario').should('be.visible');
  });
}); 