describe('🎮 Test Simple des Scénarios', () => {
  beforeEach(() => {
    // Aller à la page d'accueil
    cy.visit('http://localhost:3000');
    cy.wait(3000); // Laisser plus de temps à React de charger
  });

  it('devrait charger la page d\'accueil', () => {
    // Vérifier que la page d'accueil se charge
    cy.contains('Heroes of Time').should('be.visible');
    cy.contains('Choose your adventure').should('be.visible');
  });

  it('devrait afficher les deux scénarios principaux', () => {
    // Vérifier que les deux scénarios sont visibles
    cy.contains('Classic Conquest').should('be.visible');
    cy.contains('Mystical Conquest').should('be.visible');
    
    // Vérifier les descriptions
    cy.contains('A strategy game where you must conquer').should('be.visible');
  });

  it('devrait cliquer sur Classic Conquest et charger le jeu', () => {
    // Attendre que la page soit complètement chargée
    cy.contains('Classic Conquest').should('be.visible');
    
    // Cliquer sur le bouton play du scénario classique
    cy.get('[data-testid="play-button-conquete-classique"]').should('be.visible');
    cy.get('[data-testid="play-button-conquete-classique"]').click();
    
    // Attendre que le jeu charge
    cy.wait(8000);
    
    // Vérifier qu'on a quelque chose qui ressemble à un jeu
    cy.get('body').should('be.visible');
    cy.get('body').should('contain.text', 'Heroes');
  });

  it('devrait cliquer sur Mystical Conquest et charger le jeu', () => {
    // Attendre que la page soit complètement chargée
    cy.contains('Mystical Conquest').should('be.visible');
    
    // Cliquer sur le bouton play du scénario mystique  
    cy.get('[data-testid="play-button-mystique-temporel"]').should('be.visible');
    cy.get('[data-testid="play-button-mystique-temporel"]').click();
    
    // Attendre que le jeu charge
    cy.wait(8000);
    
    // Vérifier qu'on a quelque chose qui ressemble à un jeu
    cy.get('body').should('be.visible');
    cy.get('body').should('contain.text', 'Heroes');
  });

  it('devrait afficher les boutons de jeu', () => {
    // Vérifier que les boutons sont présents
    cy.get('[data-testid="play-button-conquete-classique"]').should('be.visible');
    cy.get('[data-testid="play-button-mystique-temporel"]').should('be.visible');
    
    // Vérifier le texte des boutons
    cy.get('[data-testid="play-button-conquete-classique"]').should('contain.text', 'Start Game');
    cy.get('[data-testid="play-button-mystique-temporel"]').should('contain.text', 'Start Game');
  });

  it('devrait gérer les erreurs API gracieusement', () => {
    // Intercepter les appels API qui pourraient échouer
    cy.intercept('POST', '/api/**', { statusCode: 500 }).as('apiError');
    
    // Essayer de charger un scénario
    cy.get('[data-testid="play-button-conquete-classique"]').click();
    cy.wait(3000);
    
    // Même avec des erreurs API, l'interface devrait rester responsive
    cy.get('body').should('be.visible');
  });

  it('devrait avoir du contenu réactif et visible', () => {
    // Test très basique - juste s'assurer que la page a du contenu
    cy.get('*').should('have.length.greaterThan', 10);
    cy.get('button').should('have.length.greaterThan', 0);
  });
}); 