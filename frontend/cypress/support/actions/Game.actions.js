// cypress/support/actions/Game.actions.js

export const endTurn = () => {
  cy.get('[data-testid="end-turn-button"]').click();
}; 