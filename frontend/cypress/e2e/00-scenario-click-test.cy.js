describe('🎯 Test Clic sur Scénarios', () => {
  beforeEach(() => {
    // Visiter la page d'accueil et attendre le chargement
    cy.visit('http://localhost:3000');
    cy.wait(3000);
  });

  it('devrait charger la page d\'accueil avec les scénarios', () => {
    // Vérifier que la page d'accueil se charge
    cy.contains('Heroes of Time').should('be.visible');
    
    // Vérifier que les boutons de scénarios sont visibles
    cy.get('[data-testid="play-button-conquete-classique"]').should('be.visible');
    cy.get('[data-testid="play-button-mystique-temporel"]').should('be.visible');
    
    // Vérifier que les noms des scénarios apparaissent quelque part
    cy.contains('Classic Conquest').should('be.visible');
    cy.contains('Mystical Conquest').should('be.visible');
  });

  it('devrait pouvoir cliquer sur le scénario Classique et le charger', () => {
    // Cliquer sur le bouton du scénario classique
    cy.get('[data-testid="play-button-conquete-classique"]').click();
    
    // Attendre que le scénario se charge
    cy.wait(3000);
    
    // Vérifier qu'il y a un changement d'état (loading ou navigation)
    // Soit on va au jeu, soit on voit un loader, soit on voit des éléments de jeu
    cy.get('body').then(($body) => {
      // Vérifier l'un des cas possibles
      expect($body.find('game, .game-container, .loading, [data-testid="game-screen"]').length).to.be.greaterThan(0);
    });
  });

  it('devrait pouvoir cliquer sur le scénario Mystique et le charger', () => {
    // Cliquer sur le bouton du scénario mystique
    cy.get('[data-testid="play-button-mystique-temporel"]').click();
    
    // Attendre que le scénario se charge
    cy.wait(3000);
    
    // Vérifier qu'il y a un changement d'état
    cy.get('body').then(($body) => {
      expect($body.find('game, .game-container, .loading, [data-testid="game-screen"]').length).to.be.greaterThan(0);
    });
  });

  it('devrait afficher les informations des scénarios', () => {
    // Vérifier que les informations sont affichées
    cy.contains('30-60 min').should('be.visible');
    cy.contains('45-90 min').should('be.visible');
    cy.contains('1-2 players').should('be.visible');
    
    // Vérifier les badges de difficulté
    cy.contains('Easy').should('be.visible');
    cy.contains('Hard').should('be.visible');
  });

  it('devrait pouvoir interagir avec l\'interface sans erreur', () => {
    // Simuler plusieurs clics pour tester la robustesse
    cy.get('[data-testid="play-button-conquete-classique"]').click();
    cy.wait(1000);
    
    // Vérifier que l'application ne crash pas
    cy.get('body').should('exist');
    cy.get('[data-testid="play-button-conquete-classique"]').should('exist');
  });
}); 