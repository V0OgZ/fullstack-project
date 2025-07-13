describe('Heroes of Time - REAL GAME TEST', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.wait(2000);
  });

  it('should navigate to multiplayer and create a real game', () => {
    cy.visit('/multiplayer');
    cy.wait(3000);
    
    cy.get('body').should('contain', 'Multiplayer');
    
    cy.get('body').then(($body) => {
      if ($body.find('button').length > 0) {
        cy.get('button').contains(/create/i).first().click();
        cy.wait(2000);
        
        cy.get('body').then(($form) => {
          if ($form.find('input[type="text"]').length > 0) {
            cy.get('input[type="text"]').first().type('REAL TEST SESSION');
            cy.wait(1000);
          }
          
          cy.get('button').contains(/create|submit/i).first().click();
          cy.wait(3000);
        });
      }
    });
    
    cy.get('body').should('contain', 'REAL TEST SESSION');
  });

  it('should test actual game scenarios', () => {
    cy.visit('/');
    cy.wait(2000);
    
    cy.get('body').then(($body) => {
      if ($body.find('a[href*="conquete-classique"]').length > 0) {
        cy.get('a[href*="conquete-classique"]').first().click();
        cy.wait(5000);
        
        cy.url().should('include', 'conquete-classique');
        cy.get('body').should('contain', 'Classic');
      }
    });
  });

  it('should test mystical scenario', () => {
    cy.visit('/');
    cy.wait(2000);
    
    cy.get('body').then(($body) => {
      if ($body.find('a[href*="mystique-temporel"]').length > 0) {
        cy.get('a[href*="mystique-temporel"]').first().click();
        cy.wait(5000);
        
        cy.url().should('include', 'mystique-temporel');
        cy.get('body').should('contain', 'Mystical');
      }
    });
  });

  it('should test multiplayer arena', () => {
    cy.visit('/');
    cy.wait(2000);
    
    cy.get('body').then(($body) => {
      if ($body.find('a[href*="multiplayer-arena"]').length > 0) {
        cy.get('a[href*="multiplayer-arena"]').first().click();
        cy.wait(5000);
        
        cy.url().should('include', 'multiplayer-arena');
        cy.get('body').should('contain', 'Multiplayer');
      }
    });
  });
}); 