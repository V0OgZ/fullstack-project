describe('🎯 Test Basique des Scénarios', () => {
  beforeEach(() => {
    // Visiter la page d'accueil
    cy.visit('http://localhost:3000');
    cy.wait(2000);
  });

  it('devrait charger la page et afficher les scénarios', () => {
    // Vérifier que la page d'accueil se charge
    cy.contains('Heroes of Time').should('be.visible');
    
    // Vérifier que les boutons de scénarios sont présents
    cy.get('[data-testid="play-button-conquete-classique"]').should('be.visible');
    cy.get('[data-testid="play-button-mystique-temporel"]').should('be.visible');
  });

  it('devrait pouvoir cliquer sur le scénario classique', () => {
    // Intercepter les appels API
    cy.intercept('POST', '/api/scenarios/predefined/conquest-classic', { fixture: 'conquest-classic.json' }).as('loadClassicScenario');
    
    // Cliquer sur le bouton du scénario classique
    cy.get('[data-testid="play-button-conquete-classique"]').click();
    
    // Attendre que l'API soit appelée
    cy.wait('@loadClassicScenario', { timeout: 10000 });
    
    // Vérifier que le clic a été enregistré
    cy.get('[data-testid="play-button-conquete-classique"]').should('exist');
  });

  it('devrait pouvoir cliquer sur le scénario mystique', () => {
    // Intercepter les appels API
    cy.intercept('POST', '/api/scenarios/predefined/temporal-rift', { fixture: 'temporal-rift.json' }).as('loadMysticalScenario');
    
    // Cliquer sur le bouton du scénario mystique
    cy.get('[data-testid="play-button-mystique-temporel"]').click();
    
    // Attendre que l'API soit appelée
    cy.wait('@loadMysticalScenario', { timeout: 10000 });
    
    // Vérifier que le clic a été enregistré
    cy.get('[data-testid="play-button-mystique-temporel"]').should('exist');
  });

  it('devrait afficher les informations de base des scénarios', () => {
    // Vérifier que du contenu s'affiche
    cy.contains('Classic Conquest').should('be.visible');
    cy.contains('Mystical Conquest').should('be.visible');
    
    // Vérifier les durées approximatives
    cy.contains('min').should('be.visible');
    cy.contains('players').should('be.visible');
  });

  it('devrait permettre de naviguer sans erreur', () => {
    // Cliquer plusieurs fois pour tester la robustesse
    cy.get('[data-testid="play-button-conquete-classique"]').click();
    cy.wait(1000);
    
    // Vérifier que l'application ne crash pas
    cy.get('body').should('exist');
    cy.contains('Heroes of Time').should('be.visible');
    
    // Essayer l'autre scénario
    cy.get('[data-testid="play-button-mystique-temporel"]').click();
    cy.wait(1000);
    
    // Vérifier que l'application est toujours stable
    cy.get('body').should('exist');
    cy.contains('Heroes of Time').should('be.visible');
  });
}); 