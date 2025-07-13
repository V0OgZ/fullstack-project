// ***********************************************
// Heroes Reforged - Custom Cypress Commands
// ***********************************************

// Game Management Commands

Cypress.Commands.add('createGame', (gameMode = 'conquest-classique') => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('backendUrl')}/api/games`,
    body: {
      name: `Test Game ${Date.now()}`,
      gameMode: gameMode,
      players: 1
    }
  }).then((response) => {
    expect(response.status).to.eq(200);
    return cy.wrap(response.body);
  });
});

Cypress.Commands.add('joinGame', (gameId) => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('backendUrl')}/api/games/${gameId}/join`,
    body: {
      playerId: 'test-player-' + Date.now()
    }
  }).then((response) => {
    expect(response.status).to.eq(200);
    return cy.wrap(response.body);
  });
});

// Multiplayer Session Commands

Cypress.Commands.add('createMultiplayerSession', (sessionName, maxPlayers = 2, gameMode = 'conquest-classique') => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('backendUrl')}/api/multiplayer/sessions`,
    body: {
      name: sessionName,
      maxPlayers: maxPlayers,
      gameMode: gameMode,
      creatorId: 'test-player-1'
    }
  }).then((response) => {
    expect(response.status).to.eq(200);
    return cy.wrap(response.body);
  });
});

Cypress.Commands.add('joinMultiplayerSession', (sessionId, playerId) => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('backendUrl')}/api/multiplayer/sessions/${sessionId}/join`,
    body: {
      playerId: playerId
    }
  }).then((response) => {
    expect(response.status).to.eq(200);
    return cy.wrap(response.body);
  });
});

Cypress.Commands.add('getAvailableSessions', () => {
  cy.request({
    method: 'GET',
    url: `${Cypress.env('backendUrl')}/api/multiplayer/sessions`
  }).then((response) => {
    expect(response.status).to.eq(200);
    return cy.wrap(response.body);
  });
});

// Game Actions Commands

Cypress.Commands.add('moveHero', (gameId, heroId, targetX, targetY) => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('backendUrl')}/api/heroes/${heroId}/move`,
    body: {
      gameId: gameId,
      targetPosition: { x: targetX, y: targetY }
    }
  }).then((response) => {
    expect(response.status).to.eq(200);
    return cy.wrap(response.body);
  });
});

Cypress.Commands.add('attackTarget', (gameId, heroId, targetId) => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('backendUrl')}/api/heroes/${heroId}/attack`,
    body: {
      gameId: gameId,
      targetId: targetId
    }
  }).then((response) => {
    expect(response.status).to.eq(200);
    return cy.wrap(response.body);
  });
});

// UI Interaction Commands

Cypress.Commands.add('selectGameMode', (mode) => {
  cy.get('[data-testid="game-mode-selector"]').click();
  cy.get(`[data-testid="game-mode-${mode}"]`).click();
});

Cypress.Commands.add('clickHex', (x, y) => {
  cy.get(`[data-testid="hex-${x}-${y}"]`).click();
});

Cypress.Commands.add('selectHero', (heroId) => {
  cy.get(`[data-testid="hero-${heroId}"]`).click();
});

Cypress.Commands.add('waitForGameLoad', () => {
  cy.get('[data-testid="game-canvas"]', { timeout: 15000 }).should('be.visible');
  cy.get('[data-testid="loading-spinner"]').should('not.exist');
});

Cypress.Commands.add('waitForMapRender', () => {
  cy.get('[data-testid="game-map"]', { timeout: 10000 }).should('be.visible');
});

// ZFC and Shadow Actions Commands

Cypress.Commands.add('verifyZFCZone', (heroId) => {
  cy.get(`[data-testid="zfc-zone-${heroId}"]`).should('be.visible');
  cy.get(`[data-testid="zfc-zone-${heroId}"]`).should('have.class', 'zfc-zone-active');
});

Cypress.Commands.add('verifyShadowAction', (actionType, playerId) => {
  cy.get(`[data-testid="shadow-action-${actionType}-${playerId}"]`)
    .should('be.visible')
    .and('have.class', 'shadow-action');
});

// Multiplayer UI Commands

Cypress.Commands.add('openMultiplayerLobby', () => {
  cy.get('[data-testid="multiplayer-button"]').click();
  cy.get('[data-testid="multiplayer-lobby"]').should('be.visible');
});

Cypress.Commands.add('createSessionUI', (sessionName) => {
  cy.get('[data-testid="create-session-button"]').click();
  cy.get('[data-testid="session-name-input"]').type(sessionName);
  cy.get('[data-testid="create-session-confirm"]').click();
});

Cypress.Commands.add('joinSessionUI', (sessionId) => {
  cy.get(`[data-testid="join-session-${sessionId}"]`).click();
  cy.get('[data-testid="join-session-confirm"]').click();
});

// Network/WebSocket Commands

Cypress.Commands.add('waitForWebSocketConnection', () => {
  cy.window().then((win) => {
    return new Cypress.Promise((resolve) => {
      const checkConnection = () => {
        if (win.websocketConnected) {
          resolve();
        } else {
          setTimeout(checkConnection, 100);
        }
      };
      checkConnection();
    });
  });
});

Cypress.Commands.add('verifyPlayerConnected', (playerId) => {
  cy.get(`[data-testid="player-${playerId}"]`)
    .should('be.visible')
    .and('contain', 'Connected');
});

// Resource Management Commands

Cypress.Commands.add('verifyResources', (expectedResources) => {
  Object.entries(expectedResources).forEach(([resource, amount]) => {
    cy.get(`[data-testid="resource-${resource}"]`)
      .should('contain', amount.toString());
  });
});

// Political System Commands

Cypress.Commands.add('selectAdvisor', (advisorName) => {
  cy.get('[data-testid="political-panel"]').click();
  cy.get(`[data-testid="advisor-${advisorName}"]`).click();
});

Cypress.Commands.add('makePoliticalDecision', (decisionId) => {
  cy.get(`[data-testid="decision-${decisionId}"]`).click();
  cy.get('[data-testid="confirm-decision"]').click();
});

// Unit Management Commands

Cypress.Commands.add('verifyUnits', (expectedUnits) => {
  cy.get('[data-testid="units-panel"]').should('be.visible');
  expectedUnits.forEach((unit) => {
    cy.get(`[data-testid="unit-${unit.id}"]`)
      .should('be.visible')
      .and('contain', unit.name);
  });
});

Cypress.Commands.add('recruitUnit', (unitType, quantity = 1) => {
  cy.get('[data-testid="recruitment-panel"]').click();
  cy.get(`[data-testid="unit-${unitType}"]`).click();
  if (quantity > 1) {
    cy.get('[data-testid="quantity-input"]').clear().type(quantity.toString());
  }
  cy.get('[data-testid="recruit-button"]').click();
});

// Utility Commands

Cypress.Commands.add('skipAnimation', () => {
  cy.window().then((win) => {
    win.SKIP_ANIMATIONS = true;
  });
});

Cypress.Commands.add('logToConsole', (message) => {
  cy.task('log', `[Cypress] ${message}`);
});

// WebSocket Message Commands

Cypress.Commands.add('sendWebSocketMessage', (messageType, data) => {
  cy.window().then((win) => {
    if (win.websocketClient) {
      win.websocketClient.send(JSON.stringify({
        type: messageType,
        data: data,
        timestamp: Date.now()
      }));
    }
  });
});

// Custom assertion for game state

Cypress.Commands.add('verifyGameState', (expectedState) => {
  cy.request({
    method: 'GET',
    url: `${Cypress.env('backendUrl')}/api/games/${expectedState.gameId}/state`
  }).then((response) => {
    expect(response.status).to.eq(200);
    if (expectedState.currentTurn) {
      expect(response.body.currentTurn).to.eq(expectedState.currentTurn);
    }
    if (expectedState.playerCount) {
      expect(response.body.players).to.have.length(expectedState.playerCount);
    }
  });
}); 