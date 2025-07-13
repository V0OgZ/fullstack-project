import { ApiService } from '../services/api';

// Configuration pour les tests d'intégration
const BACKEND_URL = 'http://localhost:8080';
const TEST_TIMEOUT = 10000;

describe('API Integration Tests', () => {
  // Skip ces tests si le backend n'est pas disponible
  beforeAll(async () => {
    try {
      await ApiService.getHealth();
    } catch (error) {
      console.warn('Backend not available, skipping integration tests');
      return;
    }
  }, TEST_TIMEOUT);

  describe('Health Check', () => {
    it('should return backend health status', async () => {
      const health = await ApiService.getHealth();
      expect(health).toBeDefined();
      expect(health.status).toBe('UP');
    }, TEST_TIMEOUT);
  });

  describe('Game Management', () => {
    let createdGameId: string;

    it('should create a new game', async () => {
      const gameData = {
        scenario: 'conquest-classic',
        playerCount: 2,
        gameMode: 'async'
      };

      const game = await ApiService.createGame(gameData);
      
      expect(game).toBeDefined();
      expect(game.id).toBeDefined();
      expect(game.players).toHaveLength(2);
      expect(game.map).toBeDefined();
      expect(game.status).toBe('active');
      
      createdGameId = game.id;
    }, TEST_TIMEOUT);

    it('should retrieve game by ID', async () => {
      if (!createdGameId) {
        throw new Error('Game not created in previous test');
      }

      const game = await ApiService.getGame(createdGameId);
      
      expect(game).toBeDefined();
      expect(game.id).toBe(createdGameId);
      expect(game.players).toBeDefined();
      expect(game.map).toBeDefined();
    }, TEST_TIMEOUT);

    it('should get game state', async () => {
      if (!createdGameId) {
        throw new Error('Game not created in previous test');
      }

      const gameState = await ApiService.getGameState(createdGameId);
      
      expect(gameState).toBeDefined();
      expect(gameState.id).toBe(createdGameId);
      expect(gameState.currentTurn).toBeDefined();
      expect(gameState.players).toBeDefined();
    }, TEST_TIMEOUT);

    it('should get current player', async () => {
      if (!createdGameId) {
        throw new Error('Game not created in previous test');
      }

      const currentPlayer = await ApiService.getCurrentPlayer(createdGameId);
      
      expect(currentPlayer).toBeDefined();
      expect(currentPlayer.id).toBeDefined();
      expect(currentPlayer.username).toBeDefined();
      expect(currentPlayer.resources).toBeDefined();
    }, TEST_TIMEOUT);

    it('should get available games', async () => {
      const games = await ApiService.getAvailableGames();
      
      expect(games).toBeDefined();
      expect(Array.isArray(games)).toBe(true);
      expect(games.length).toBeGreaterThan(0);
    }, TEST_TIMEOUT);
  });

  describe('Hero Actions', () => {
    let testGameId: string;
    let testHeroId: string;

    beforeAll(async () => {
      // Create a test game
      const gameData = {
        scenario: 'conquest-classic',
        playerCount: 2,
        gameMode: 'async'
      };
      const game = await ApiService.createGame(gameData);
      testGameId = game.id;
      testHeroId = game.players[0].heroes[0].id;
    }, TEST_TIMEOUT);

    it('should move hero', async () => {
      const targetPosition = { x: 5, y: 5 };
      
      const moveResult = await ApiService.moveHero(testHeroId, targetPosition);
      
      expect(moveResult).toBeDefined();
      expect(moveResult.type).toBe('move');
      expect(moveResult.heroId).toBe(testHeroId);
      expect(moveResult.status).toBeDefined();
    }, TEST_TIMEOUT);

    it('should attack target', async () => {
      const targetId = 'enemy-1';
      
      const attackResult = await ApiService.attackTarget(testHeroId, targetId);
      
      expect(attackResult).toBeDefined();
      expect(attackResult.type).toBe('attack');
      expect(attackResult.heroId).toBe(testHeroId);
    }, TEST_TIMEOUT);

    it('should collect resource', async () => {
      const objectId = 'resource-1';
      
      const collectResult = await ApiService.collectResource(testHeroId, objectId);
      
      expect(collectResult).toBeDefined();
      expect(collectResult.type).toBe('collect');
      expect(collectResult.heroId).toBe(testHeroId);
    }, TEST_TIMEOUT);
  });

  describe('Game Actions', () => {
    let testGameId: string;

    beforeAll(async () => {
      const gameData = {
        scenario: 'conquest-classic',
        playerCount: 2,
        gameMode: 'async'
      };
      const game = await ApiService.createGame(gameData);
      testGameId = game.id;
    }, TEST_TIMEOUT);

    it('should get pending actions', async () => {
      const pendingActions = await ApiService.getPendingActions(testGameId);
      
      expect(pendingActions).toBeDefined();
      expect(Array.isArray(pendingActions)).toBe(true);
    }, TEST_TIMEOUT);

    it('should end turn', async () => {
      const endTurnResult = await ApiService.endTurn(testGameId);
      
      expect(endTurnResult).toBeDefined();
    }, TEST_TIMEOUT);

    it('should get game history', async () => {
      const history = await ApiService.getGameHistory(testGameId);
      
      expect(history).toBeDefined();
      expect(Array.isArray(history)).toBe(true);
    }, TEST_TIMEOUT);

    it('should get combat results', async () => {
      const combatResults = await ApiService.getCombatResults(testGameId);
      
      expect(combatResults).toBeDefined();
      expect(Array.isArray(combatResults)).toBe(true);
    }, TEST_TIMEOUT);
  });

  describe('Error Handling', () => {
    it('should handle 404 errors', async () => {
      const nonExistentGameId = 'non-existent-game-123';
      
      await expect(ApiService.getGame(nonExistentGameId)).rejects.toThrow();
    }, TEST_TIMEOUT);

    it('should handle invalid data', async () => {
      const invalidGameData = {
        scenario: 'invalid-scenario',
        playerCount: -1
      };
      
      await expect(ApiService.createGame(invalidGameData)).rejects.toThrow();
    }, TEST_TIMEOUT);

    it('should handle network timeouts', async () => {
      // Test avec un endpoint qui n'existe pas
      const originalMakeRequest = (ApiService as any).makeRequest;
      
      (ApiService as any).makeRequest = jest.fn().mockImplementation(() => {
        return new Promise((_, reject) => {
          setTimeout(() => reject(new Error('Network timeout')), 100);
        });
      });

      await expect(ApiService.getHealth()).rejects.toThrow('Network timeout');
      
      // Restore original method
      (ApiService as any).makeRequest = originalMakeRequest;
    }, TEST_TIMEOUT);
  });

  describe('Multiplayer API', () => {
    it('should get joinable sessions', async () => {
      const sessions = await ApiService.getJoinableSessions();
      
      expect(sessions).toBeDefined();
      expect(Array.isArray(sessions)).toBe(true);
    }, TEST_TIMEOUT);

    it('should create multiplayer session', async () => {
      const sessionData = {
        sessionName: 'Test Session',
        maxPlayers: 4,
        gameMode: 'conquest-classic',
        createdBy: 'test-player'
      };

      const session = await ApiService.createMultiplayerSession(sessionData);
      
      expect(session).toBeDefined();
      expect(session.sessionId).toBeDefined();
      expect(session.sessionName).toBe(sessionData.sessionName);
      expect(session.maxPlayers).toBe(sessionData.maxPlayers);
    }, TEST_TIMEOUT);
  });

  describe('Backend Status Check', () => {
    it('should verify backend is available', async () => {
      const isAvailable = await ApiService.checkBackendStatus();
      
      expect(isAvailable).toBe(true);
    }, TEST_TIMEOUT);
  });
}); 