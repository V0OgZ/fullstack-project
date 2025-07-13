// cypress/support/actions/MainMenu.actions.js

export const selectScenario = (scenarioId) => {
  cy.get(`[data-testid="play-button-${scenarioId}"]`).click();
}; 