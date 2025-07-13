// cypress/support/actions/MultiplayerLobby.actions.js

export const createSession = (heroName) => {
  cy.get('[data-testid="create-session-btn"]').should('be.enabled').click();
  cy.get('[data-testid="hero-name-input"]').type(heroName);
  cy.get('[data-testid="create-new-game-btn"]').click();
};

export const getSessionId = () => {
  return cy.get('[data-testid="session-created-msg"] strong').then(($strong) => {
    return $strong.text();
  });
};

export const startBattle = () => {
  cy.get('[data-testid="start-battle-btn"]').click();
}; 