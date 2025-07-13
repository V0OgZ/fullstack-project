import { ApiService } from './api';
import { GameState, Game, Position, GameAction, Player, GameMap, Tile } from '../types/game';

const gameCache: Map<string, GameState> = new Map();

function createMockClassicGame(): GameState {
    const player1: Player = { id: 'player1', username: 'Player 1', email: 'p1@example.com', color: '#3b82f6', isActive: true, resources: { gold: 1000, wood: 10, stone: 10, mana: 10 }, heroes: [] };
    const player2: Player = { id: 'player2', username: 'AI', email: 'ai@example.com', color: '#ef4444', isActive: false, resources: { gold: 1000, wood: 10, stone: 10, mana: 10 }, heroes: [] };
    const game: Game = {
        id: 'conquete-classique',
        name: 'Classic Conquest',
        status: 'active',
        currentTurn: 1,
        players: [player1, player2],
        map: { id: 'map1', width: 20, height: 20, tiles: [], objects: [] },
        gameMode: 'async',
        currentPlayerTurn: 'player1',
        turnStartTime: new Date().toISOString(),
        turnDuration: 300,
        actions: [],
        timeline: [],
        zfcMap: [],
        gameSettings: { maxPlayers: 2, turnTimeLimit: 300, victoryConditions: [] },
    };
    return {
        currentGame: game,
        currentPlayer: player1,
        isLoading: false,
        error: null,
        pendingActions: [],
        combatResults: [],
        shadowActions: [],
        visibleZFCs: [],
        lockedZones: [],
        politicalAdvisors: [],
        currentPoliticalEvent: null,
        reputation: { international: 0, domestic: 0, military: 0, economic: 0, diplomatic: 0 },
        activeEvents: [],
    };
}

export class GameService {
  static async initializeGame(gameId: string): Promise<GameState> {
    console.log(`Initializing scenario: ${gameId}`);
    if (gameId.includes('classique') || gameId.includes('mystique')) {
        const mockState = createMockClassicGame();
        gameCache.set(gameId, mockState);
        return Promise.resolve(mockState);
    }
    
    // Fallback for any other ID
    return Promise.reject(new Error(`Game ID "${gameId}" not found.`));
  }

  static async getGameState(gameId: string): Promise<GameState> {
    const cachedState = gameCache.get(gameId);
    if(cachedState) {
        console.log(`Returning cached state for game: ${gameId}`);
        return Promise.resolve(cachedState);
    }
    return Promise.reject(new Error(`Game state for "${gameId}" not found.`));
  }

  static async endTurn(gameId: string): Promise<void> {
    console.log(`Ending turn for game: ${gameId}`);
    const state = gameCache.get(gameId);
    if (state && state.currentGame) {
        state.currentGame.currentTurn += 1;
        gameCache.set(gameId, state);
    }
    return Promise.resolve();
  }
} 