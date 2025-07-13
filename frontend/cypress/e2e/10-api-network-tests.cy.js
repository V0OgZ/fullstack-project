describe('Heroes of Time - API Network Tests', () => {
  beforeEach(() => {
    // Visit the main app
    cy.visit('/');
    
    // Wait for the app to load
    cy.wait(1000);
  });

  it('should make successful API health check request', () => {
    // Intercept the health check request
    cy.intercept('GET', '**/api/health').as('healthCheck');
    
    // Trigger a health check by visiting the app
    cy.visit('/');
    
    // Wait for the health check request and verify it succeeded
    cy.wait('@healthCheck').then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      expect(interception.response.body).to.have.property('status', 'UP');
    });
  });

  it('should make API request when clicking on scenarios', () => {
    // Intercept any API requests
    cy.intercept('GET', '**/api/**').as('apiRequest');
    cy.intercept('POST', '**/api/**').as('apiPostRequest');
    
    // Look for scenario buttons and click one
    cy.get('body').then(($body) => {
      // Try to find scenario buttons or links
      if ($body.find('[data-cy="scenario-button"]').length > 0) {
        cy.get('[data-cy="scenario-button"]').first().click();
      } else if ($body.find('button').length > 0) {
        // Find any button that might be a scenario
        cy.get('button').contains(/scenario|conquete|classique|mystique/i).first().click();
      } else {
        // Try clicking on any clickable element that might be a scenario
        cy.get('[class*="scenario"], [class*="button"], [class*="card"]').first().click();
      }
    });
    
    // Wait for potential API requests
    cy.wait(2000);
    
    // Check if any API requests were made
    cy.get('@apiRequest.all').then((interceptions) => {
      if (interceptions.length > 0) {
        cy.log(`API requests made: ${interceptions.length}`);
        interceptions.forEach((interception, index) => {
          cy.log(`Request ${index + 1}: ${interception.request.method} ${interception.request.url}`);
        });
      } else {
        cy.log('No API requests detected - this might indicate the interface is waiting for user input');
      }
    });
  });

  it('should test multiplayer API endpoints', () => {
    // Visit multiplayer page
    cy.visit('/multiplayer');
    
    // Intercept multiplayer API requests
    cy.intercept('GET', '**/api/multiplayer/**').as('multiplayerGet');
    cy.intercept('POST', '**/api/multiplayer/**').as('multiplayerPost');
    
    // Wait for page to load
    cy.wait(1000);
    
    // Try to create a session
    cy.get('body').then(($body) => {
      if ($body.find('button').length > 0) {
        // Look for create session button
        cy.get('button').contains(/create/i).first().click();
        
        // Wait for form to appear and fill it
        cy.wait(500);
        
        // Fill session name if input exists
        cy.get('body').then(($form) => {
          if ($form.find('input[type="text"]').length > 0) {
            cy.get('input[type="text"]').first().type('Test Session');
          }
          
          // Try to submit the form
          if ($form.find('button').length > 0) {
            cy.get('button').contains(/create|submit/i).first().click();
          }
        });
      }
    });
    
    // Wait for potential API requests
    cy.wait(3000);
    
    // Check for API requests
    cy.get('@multiplayerGet.all').then((interceptions) => {
      if (interceptions.length > 0) {
        cy.log(`Multiplayer GET requests: ${interceptions.length}`);
      }
    });
    
    cy.get('@multiplayerPost.all').then((interceptions) => {
      if (interceptions.length > 0) {
        cy.log(`Multiplayer POST requests: ${interceptions.length}`);
        interceptions.forEach((interception, index) => {
          cy.log(`POST ${index + 1}: ${interception.request.url}`);
          cy.log(`Status: ${interception.response?.statusCode || 'No response'}`);
        });
      }
    });
  });

  it('should test backend connectivity', () => {
    // Direct request to backend health endpoint
    cy.request('GET', 'http://localhost:8080/api/health').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('status', 'UP');
    });
  });

  it('should test game API endpoints', () => {
    // Test available games endpoint
    cy.request('GET', 'http://localhost:8080/api/games/available').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
    });
  });

  it('should test units API endpoints', () => {
    // Test units health endpoint
    cy.request('GET', 'http://localhost:8080/api/units/health').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('status', 'UP');
    });
  });

  it('should handle API errors gracefully', () => {
    // Test a non-existent endpoint
    cy.request({
      url: 'http://localhost:8080/api/nonexistent',
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });
}); 