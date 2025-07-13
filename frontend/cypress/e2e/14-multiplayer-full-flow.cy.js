import { selectScenario } from '../support/actions/MainMenu.actions';
import { createSession, getSessionId, startBattle } from '../support/actions/MultiplayerLobby.actions';
import { endTurn } from '../support/actions/Game.actions';

describe('Multiplayer Full Flow', () => {
  const heroName = 'Test Hero - ' + Date.now();
  const player2Name = 'Player 2 - ' + Date.now();

  it('should allow two players to create, join, start, and play a multiplayer game', () => {
    cy.log('--- Player 1: Navigates to lobby and creates game ---');
    cy.visit('/');
    selectScenario('multiplayer-arena');
    createSession(heroName);

    getSessionId().then((sessionId) => {
      cy.log(`Game created with Session ID: ${sessionId}`);
      
      cy.log('--- Player 2: Joins Game (via API) ---');
      cy.joinMultiplayerSession(sessionId, player2Name);
      
      cy.log('--- Player 1: Starts Battle ---');
      startBattle();
      
      cy.log('--- Gameplay Simulation: Round 1 ---');
      cy.contains('h2', 'Round 1', { timeout: 20000 }).should('be.visible');
      endTurn();
      
      cy.log('--- Gameplay Simulation: Round 2 ---');
      cy.contains('h2', 'Round 2', { timeout: 10000 }).should('be.visible');
    });
  });
}); 