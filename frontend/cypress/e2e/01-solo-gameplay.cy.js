describe('Heroes Reforged - Solo Gameplay', () => {
  beforeEach(() => {
    cy.waitForHeroesReforged();
    cy.skipAnimation();
  });

  it('should load the game and display the main interface', () => {
    cy.logToConsole('Testing game load and main interface');
    
    // Verify main interface elements
    cy.get('[data-testid="game-title"]').should('contain', 'Heroes Reforged');
    cy.get('[data-testid="game-mode-selector"]').should('be.visible');
    cy.get('[data-testid="start-game-button"]').should('be.visible');
  });

  it('should create and start a solo game', () => {
    cy.logToConsole('Testing solo game creation');
    
    // Select conquest classique mode
    cy.selectGameMode('conquest-classique');
    
    // Start the game
    cy.get('[data-testid="start-game-button"]').click();
    
    // Wait for game to load
    cy.waitForGameLoad();
    cy.waitForMapRender();
    
    // Verify game elements are present
    cy.get('[data-testid="game-canvas"]').should('be.visible');
    cy.get('[data-testid="resource-panel"]').should('be.visible');
    cy.get('[data-testid="hero-panel"]').should('be.visible');
    cy.get('[data-testid="political-panel"]').should('be.visible');
  });

  it('should display heroes and allow hero selection', () => {
    cy.logToConsole('Testing hero selection');
    
    // Start a game first
    cy.selectGameMode('conquest-classique');
    cy.get('[data-testid="start-game-button"]').click();
    cy.waitForGameLoad();
    
    // Check that heroes are displayed
    cy.get('[data-testid="hero-list"]').should('be.visible');
    cy.get('[data-testid^="hero-"]').should('have.length.at.least', 1);
    
    // Select the first hero
    cy.get('[data-testid^="hero-"]').first().click();
    
    // Verify hero is selected
    cy.get('[data-testid^="hero-"]').first().should('have.class', 'selected');
    
    // Verify hero details are shown
    cy.get('[data-testid="hero-details"]').should('be.visible');
    cy.get('[data-testid="hero-stats"]').should('be.visible');
  });

  it('should display resources correctly', () => {
    cy.logToConsole('Testing resource display');
    
    cy.selectGameMode('conquest-classique');
    cy.get('[data-testid="start-game-button"]').click();
    cy.waitForGameLoad();
    
    // Verify all resource types are displayed
    const expectedResources = {
      gold: 1000,
      wood: 200,
      stone: 100,
      ore: 50,
      crystal: 10,
      gems: 5,
      sulfur: 8
    };
    
    cy.verifyResources(expectedResources);
  });

  it('should display the political advisor system', () => {
    cy.logToConsole('Testing political advisor system');
    
    cy.selectGameMode('conquest-classique');
    cy.get('[data-testid="start-game-button"]').click();
    cy.waitForGameLoad();
    
    // Open political panel
    cy.get('[data-testid="political-panel"]').click();
    
    // Verify all 4 advisors are present
    const advisors = ['volkov', 'petrova', 'kozlov', 'ivanova'];
    advisors.forEach(advisor => {
      cy.get(`[data-testid="advisor-${advisor}"]`).should('be.visible');
    });
    
    // Select an advisor
    cy.selectAdvisor('volkov');
    cy.get('[data-testid="advisor-volkov"]').should('have.class', 'selected');
    
    // Verify advisor recommendations are shown
    cy.get('[data-testid="advisor-recommendations"]').should('be.visible');
  });

  it('should allow hero movement with ZFC calculations', () => {
    cy.logToConsole('Testing hero movement and ZFC');
    
    cy.selectGameMode('conquest-classique');
    cy.get('[data-testid="start-game-button"]').click();
    cy.waitForGameLoad();
    
    // Select a hero
    cy.get('[data-testid^="hero-"]').first().click();
    
    // Verify ZFC zone is displayed
    cy.get('[data-testid^="hero-"]').first().then($hero => {
      const heroId = $hero.attr('data-testid').replace('hero-', '');
      cy.verifyZFCZone(heroId);
    });
    
    // Click on a moveable hex
    cy.clickHex(3, 3);
    
    // Verify movement action is created
    cy.get('[data-testid="action-queue"]').should('contain', 'Movement');
    
    // Verify ZFC cost is calculated
    cy.get('[data-testid="zfc-cost"]').should('be.visible');
  });

  it('should handle conquest mystique mode with temporal objects', () => {
    cy.logToConsole('Testing conquest mystique mode');
    
    // Select conquest mystique mode
    cy.selectGameMode('conquest-mystique');
    cy.get('[data-testid="start-game-button"]').click();
    cy.waitForGameLoad();
    
    // Verify temporal objects are present
    cy.get('[data-testid="temporal-objects"]').should('be.visible');
    cy.get('[data-testid^="temporal-"]').should('have.length.at.least', 1);
    
    // Verify quantum zones are displayed
    cy.get('[data-testid="quantum-zones"]').should('be.visible');
    
    // Verify advanced ZFC calculations
    cy.get('[data-testid="zfc-advanced"]').should('be.visible');
  });

  it('should display unit recruitment interface', () => {
    cy.logToConsole('Testing unit recruitment');
    
    cy.selectGameMode('conquest-classique');
    cy.get('[data-testid="start-game-button"]').click();
    cy.waitForGameLoad();
    
    // Open recruitment panel
    cy.get('[data-testid="recruitment-button"]').click();
    cy.get('[data-testid="recruitment-panel"]').should('be.visible');
    
    // Verify castle units are available
    cy.get('[data-testid="castle-units"]').should('be.visible');
    
    // Check for tier 1 units
    cy.get('[data-testid="unit-castle_pikeman_basic"]').should('be.visible');
    cy.get('[data-testid="unit-castle_archer_basic"]').should('be.visible');
    
    // Try to recruit a unit
    cy.recruitUnit('castle_pikeman_basic', 5);
    
    // Verify resources are deducted
    cy.get('[data-testid="resource-gold"]').should('not.contain', '1000');
  });

  it('should handle turn progression', () => {
    cy.logToConsole('Testing turn progression');
    
    cy.selectGameMode('conquest-classique');
    cy.get('[data-testid="start-game-button"]').click();
    cy.waitForGameLoad();
    
    // Verify current turn
    cy.get('[data-testid="current-turn"]').should('contain', '1');
    
    // End turn
    cy.get('[data-testid="end-turn-button"]').click();
    
    // Verify turn progression
    cy.get('[data-testid="current-turn"]').should('contain', '2');
    
    // Verify turn timer reset
    cy.get('[data-testid="turn-timer"]').should('be.visible');
  });

  it('should persist game state correctly', () => {
    cy.logToConsole('Testing game state persistence');
    
    // Create a game and make some actions
    cy.createGame('conquest-classique').then((game) => {
      cy.visit('/');
      cy.waitForGameLoad();
      
      // Verify game state persists
      cy.verifyGameState({
        gameId: game.id,
        currentTurn: 1,
        playerCount: 1
      });
    });
  });
}); 