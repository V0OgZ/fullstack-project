// Import commands.js using ES2015 syntax:
import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Global configuration
Cypress.on('uncaught:exception', (err, runnable) => {
  // Prevent Cypress from failing on uncaught exceptions from React
  if (err.message.includes('ResizeObserver loop limit exceeded')) {
    return false;
  }
  if (err.message.includes('Non-Error promise rejection captured')) {
    return false;
  }
  // Allow other errors to fail the test
  return true;
});

// Add global before hook
beforeEach(() => {
  // Wait for backend to be ready
  cy.request({
    method: 'GET',
    url: `${Cypress.env('backendUrl')}/api/units/health`,
    timeout: 15000,
    retries: 3
  }).then((response) => {
    expect(response.status).to.eq(200);
  });
});

// Global configuration for Heroes Reforged tests
Cypress.Commands.add('waitForHeroesReforged', () => {
  cy.visit('/');
  cy.get('[data-testid="app-container"]', { timeout: 15000 }).should('be.visible');
  cy.url().should('include', '/');
}); 