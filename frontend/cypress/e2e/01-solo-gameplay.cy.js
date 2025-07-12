describe('Heroes Reforged - Solo Gameplay', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should load the main page and display game selector', () => {
    cy.logToConsole('Testing main page load');
    
    // Verify main page elements
    cy.contains('Heroes Reforged').should('be.visible');
    cy.contains('Choose a scenario').should('be.visible');
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

  it('should display backend test link', () => {
    cy.logToConsole('Testing backend test link');
    
    // Check backend test link
    cy.get('a[href*="/backend-test"]').should('be.visible');
    cy.contains('Test backend connection').should('be.visible');
  });

  it('should display multiplayer link', () => {
    cy.logToConsole('Testing multiplayer access');
    
    // Visit multiplayer page directly
    cy.visit('/multiplayer');
    cy.url().should('include', '/multiplayer');
    
    // Basic check that multiplayer page loads
    cy.get('body').should('be.visible');
  });

  it('should have proper responsive design', () => {
    cy.logToConsole('Testing responsive design');
    
    // Test mobile viewport
    cy.viewport('iphone-x');
    cy.contains('Heroes Reforged').should('be.visible');
    cy.get('.language-selector').should('be.visible');
    
    // Test tablet viewport
    cy.viewport('ipad-2');
    cy.contains('Heroes Reforged').should('be.visible');
    cy.get('.game-options').should('be.visible');
    
    // Back to desktop
    cy.viewport(1280, 720);
    cy.contains('Heroes Reforged').should('be.visible');
  });

  it('should navigate to backend tester', () => {
    cy.logToConsole('Testing backend tester navigation');
    
    // Click on backend test link
    cy.get('a[href*="/backend-test"]').click();
    
    // Verify navigation
    cy.url().should('include', '/backend-test');
    
    // Basic check that backend test page loads
    cy.get('body').should('be.visible');
  });

  it('should preserve language selection across navigation', () => {
    cy.logToConsole('Testing language persistence');
    
    // Set to Russian
    cy.contains('🇷🇺 RU').click();
    cy.contains('Выберите сценарий').should('be.visible');
    
    // Navigate to backend test and back
    cy.get('a[href*="/backend-test"]').click();
    cy.visit('/');
    
    // Should still be in Russian
    cy.contains('Выберите сценарий').should('be.visible');
  });
}); 