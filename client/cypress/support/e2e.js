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
  if (err.message.includes('Failed to fetch')) {
    return false;
  }
  if (err.message.includes('NetworkError')) {
    return false;
  }
  // Allow other errors to fail the test
  return true;
});

// Global configuration for Heroes Reforged tests
Cypress.Commands.add('waitForHeroesReforged', () => {
  cy.visit('/');
  cy.get('[data-testid="app-container"]', { timeout: 15000 }).should('be.visible');
  cy.url().should('include', '/');
}); 