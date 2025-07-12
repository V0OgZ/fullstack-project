import { ApiService } from './api';
import { GameState, Game, Position, GameAction, Player, GameMap, Tile } from '../types/game';

export class GameService {
  private static gameCache: Map<string, GameState> = new Map();

  // Create mock game data for scenario-based games
  private static createMockGameData(scenarioId: string): any {
    const baseMap = GameService.generateDemoMap(20, 20);
    
    const mockPlayer: Player = {
      id: 'player1',
      username: 'Player 1',
      email: 'player1@example.com',
      color: '#ff6b6b',
      isActive: true,
      resources: {
        gold: 1000,
        wood: 200,
        stone: 100,
        mana: 50
      },
      heroes: [{
        id: 'hero1',
        name: 'Arthur',
        position: { x: 2, y: 2 },
        level: 1,
        experience: 0,
        movementPoints: 3,
        maxMovementPoints: 3,
        stats: {
          attack: 5,
          defense: 3,
          knowledge: 2,
          spellPower: 1
        },
        playerId: 'player1',
        units: [],
        inventory: []
      }]
    };

    const mockPlayer2: Player = {
      id: 'player2',
      username: 'Player 2',
      email: 'player2@example.com',
      color: '#4ecdc4',
      isActive: false,
      resources: {
        gold: 1000,
        wood: 200,
        stone: 100,
        mana: 50
      },
      heroes: [{
        id: 'hero2',
        name: 'Merlin',
        position: { x: 17, y: 17 },
        level: 1,
        experience: 0,
        movementPoints: 3,
        maxMovementPoints: 3,
        stats: {
          attack: 3,
          defense: 2,
          knowledge: 4,
          spellPower: 5
        },
        playerId: 'player2',
        units: [],
        inventory: []
      }]
    };

    return {
      id: scenarioId,
      name: scenarioId.includes('mystique') ? 'Mystical Conquest' : 'Classic Conquest',
      status: 'active',
      currentTurn: 1,
      turnStartTime: new Date().toISOString(),
      turnDuration: 300000, // 5 minutes
      players: [mockPlayer, mockPlayer2],
      map: baseMap,
      actions: [],
      gameSettings: {
        maxPlayers: 2,
        turnTimeLimit: 300000,
        victoryConditions: ['capture_all_cities', 'eliminate_enemies']
      },
      currentPlayer: mockPlayer
    };
  }

  // Generate a demo map
  private static generateDemoMap(width: number, height: number): GameMap {
    const tiles: Tile[] = [];
    
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        let terrain: 'grass' | 'forest' | 'mountain' | 'water' | 'desert' | 'swamp' = 'grass';
        let walkable = true;
        let movementCost = 1;
        
        // Add some variety
        if (Math.random() < 0.2) {
          terrain = 'forest';
          movementCost = 2;
        } else if (Math.random() < 0.1) {
          terrain = 'mountain';
          walkable = false;
          movementCost = 3;
        } else if (Math.random() < 0.05) {
          terrain = 'water';
          walkable = false;
          movementCost = 1;
        }
        
        tiles.push({
          x,
          y,
          terrain,
          walkable,
          movementCost,
          isVisible: true
        });
      }
    }
    
    return {
      id: 'demo-map',
      width,
      height,
      tiles,
      objects: []
    };
  }

  // Game state management
  static async initializeGame(gameId: string): Promise<GameState> {
    try {
      // Check if this is a scenario-based game (demo mode)
      if (gameId.includes('classique') || gameId.includes('mystique')) {
        const gameData = this.createMockGameData(gameId);
        
        // Transform mock data to Game object
        const game: Game = {
          id: gameData.id,
          name: gameData.name,
          status: gameData.status,
          currentTurn: gameData.currentTurn,
          turnStartTime: gameData.turnStartTime,
          turnDuration: gameData.turnDuration,
          players: gameData.players,
          map: gameData.map,
          actions: gameData.actions || [],
          timeline: [],
          zfcMap: [],
          gameSettings: gameData.gameSettings,
          gameMode: 'async',
          currentPlayerTurn: gameData.currentPlayer ? gameData.currentPlayer.id : undefined
        };

        // Create GameState
        const gameState: GameState = {
          currentGame: game,
          currentPlayer: gameData.currentPlayer || null,
          pendingActions: [],
          combatResults: [],
          isLoading: false,
          error: null,
          shadowActions: [],
          visibleZFCs: [],
          lockedZones: [],
          politicalAdvisors: [],
          currentPoliticalEvent: null,
          reputation: {
            international: 0,
            domestic: 0,
            military: 0,
            economic: 0,
            diplomatic: 0
          },
          activeEvents: []
        };

        // Cache the game state
        this.gameCache.set(gameId, gameState);
        
        return gameState;
      }
      
      // For real games, use the API
      const gameData = await ApiService.getGame(gameId);
      
      // Transform backend data to Game object
      const game: Game = {
        id: gameData.id,
        name: gameData.name,
        status: gameData.status,
        currentTurn: gameData.currentTurn,
        turnStartTime: gameData.turnStartTime,
        turnDuration: gameData.turnDuration,
        players: gameData.players.map((p: any) => ({
          id: p.id,
          username: p.username,
          email: p.email,
          color: p.color,
          isActive: p.isActive,
          resources: p.resources,
          heroes: p.heroes.map((h: any) => ({
            id: h.id,
            name: h.name,
            position: h.position,
            level: h.level,
            experience: h.experience,
            movementPoints: h.movementPoints,
            maxMovementPoints: h.maxMovementPoints,
            stats: h.stats,
            playerId: h.playerId,
            units: h.units,
            inventory: h.inventory
          }))
        })),
        map: {
          id: gameData.map.id,
          width: gameData.map.width,
          height: gameData.map.height,
          tiles: gameData.map.tiles,
          objects: gameData.map.objects
        },
        actions: gameData.actions || [],
        timeline: [],
        zfcMap: [],
        gameSettings: gameData.gameSettings,
        gameMode: 'async',
        currentPlayerTurn: gameData.currentPlayer ? gameData.currentPlayer.id : undefined
      };

      // Create GameState
      const gameState: GameState = {
        currentGame: game,
        currentPlayer: gameData.currentPlayer || null,
        pendingActions: [],
        combatResults: [],
        isLoading: false,
        error: null,
        shadowActions: [],
        visibleZFCs: [],
        lockedZones: [],
        politicalAdvisors: [],
        currentPoliticalEvent: null,
        reputation: {
          international: 0,
          domestic: 0,
          military: 0,
          economic: 0,
          diplomatic: 0
        },
        activeEvents: []
      };

      // Cache the game state
      this.gameCache.set(gameId, gameState);
      
      return gameState;
    } catch (error) {
      console.error('Error initializing game:', error);
      throw error;
    }
  }

  // Get current game state (with backend sync)
  static async getGameState(gameId: string): Promise<GameState> {
    try {
      // Check for cached demo games first
      if (gameId.includes('classique') || gameId.includes('mystique')) {
        const cached = this.gameCache.get(gameId);
        if (cached) {
          return cached;
        }
        // If not cached, initialize it
        return await this.initializeGame(gameId);
      }
      
      const gameData = await ApiService.getGameState(gameId);
      
      // Transform backend data to Game object
      const game: Game = {
        id: gameData.id,
        name: gameData.name,
        status: gameData.status,
        currentTurn: gameData.currentTurn,
        turnStartTime: gameData.turnStartTime,
        turnDuration: gameData.turnDuration,
        players: gameData.players.map((p: any) => ({
          id: p.id,
          username: p.username,
          email: p.email,
          color: p.color,
          isActive: p.isActive,
          resources: p.resources,
          heroes: p.heroes.map((h: any) => ({
            id: h.id,
            name: h.name,
            position: h.position,
            level: h.level,
            experience: h.experience,
            movementPoints: h.movementPoints,
            maxMovementPoints: h.maxMovementPoints,
            stats: h.stats,
            playerId: h.playerId,
            units: h.units,
            inventory: h.inventory
          }))
        })),
        map: {
          id: gameData.map.id,
          width: gameData.map.width,
          height: gameData.map.height,
          tiles: gameData.map.tiles,
          objects: gameData.map.objects
        },
        actions: gameData.actions || [],
        timeline: [],
        zfcMap: [],
        gameSettings: gameData.gameSettings,
        gameMode: 'async',
        currentPlayerTurn: gameData.currentPlayer ? gameData.currentPlayer.id : undefined
      };

      // Update cached GameState
      const cached = this.gameCache.get(gameId);
      const gameState: GameState = {
        currentGame: game,
        currentPlayer: gameData.currentPlayer || null,
        pendingActions: cached?.pendingActions || [],
        combatResults: cached?.combatResults || [],
        isLoading: false,
        error: null,
        shadowActions: cached?.shadowActions || [],
        visibleZFCs: cached?.visibleZFCs || [],
        lockedZones: cached?.lockedZones || [],
        politicalAdvisors: cached?.politicalAdvisors || [],
        currentPoliticalEvent: cached?.currentPoliticalEvent || null,
        reputation: cached?.reputation || {
          international: 0,
          domestic: 0,
          military: 0,
          economic: 0,
          diplomatic: 0
        },
        activeEvents: cached?.activeEvents || []
      };

      this.gameCache.set(gameId, gameState);
      return gameState;
    } catch (error) {
      console.error('Error getting game state:', error);
      
      // Fallback to cached data
      const cached = this.gameCache.get(gameId);
      if (cached) {
        return cached;
      }
      
      throw error;
    }
  }

  // Hero movement (ZFC calculations done server-side)
  static async moveHero(heroId: string, targetPosition: Position): Promise<GameAction> {
    try {
      const result = await ApiService.moveHero(heroId, targetPosition);
      
      // Return the action details from backend
      return {
        id: result.id,
        type: result.type,
        heroId: result.heroId,
        targetPosition: result.targetPosition,
        scheduledTime: result.scheduledTime,
        executionTime: result.executionTime,
        status: result.status
      };
    } catch (error) {
      console.error('Error moving hero:', error);
      throw error;
    }
  }

  // Combat (ZFC calculations done server-side)
  static async attackTarget(heroId: string, targetId: string): Promise<GameAction> {
    try {
      const result = await ApiService.attackTarget(heroId, targetId);
      
      return {
        id: result.id,
        type: result.type,
        heroId: result.heroId,
        targetId: result.targetId,
        scheduledTime: result.scheduledTime,
        executionTime: result.executionTime,
        status: result.status
      };
    } catch (error) {
      console.error('Error attacking target:', error);
      throw error;
    }
  }

  // Resource collection (ZFC calculations done server-side)
  static async collectResource(heroId: string, objectId: string): Promise<GameAction> {
    try {
      const result = await ApiService.collectResource(heroId, objectId);
      
      return {
        id: result.id,
        type: result.type,
        heroId: result.heroId,
        targetId: result.objectId,
        scheduledTime: result.scheduledTime,
        executionTime: result.executionTime,
        status: result.status
      };
    } catch (error) {
      console.error('Error collecting resource:', error);
      throw error;
    }
  }

  // Get pending actions (ZFC shadow actions)
  static async getPendingActions(gameId: string): Promise<GameAction[]> {
    try {
      const actions = await ApiService.getPendingActions(gameId);
      
      return actions.map(action => ({
        id: action.id,
        type: action.type,
        heroId: action.heroId,
        targetPosition: action.targetPosition,
        targetId: action.targetId || action.objectId,
        scheduledTime: action.scheduledTime,
        executionTime: action.executionTime,
        status: action.status
      }));
    } catch (error) {
      console.error('Error getting pending actions:', error);
      throw error;
    }
  }

  // Cancel action
  static async cancelAction(actionId: string): Promise<void> {
    try {
      await ApiService.cancelAction(actionId);
    } catch (error) {
      console.error('Error canceling action:', error);
      throw error;
    }
  }

  // End turn
  static async endTurn(gameId: string): Promise<void> {
    try {
      await ApiService.endTurn(gameId);
    } catch (error) {
      console.error('Error ending turn:', error);
      throw error;
    }
  }

  // Get combat results
  static async getCombatResults(gameId: string): Promise<any[]> {
    try {
      const results = await ApiService.getCombatResults(gameId);
      return results;
    } catch (error) {
      console.error('Error getting combat results:', error);
      throw error;
    }
  }

  // Check backend connectivity
  static async checkBackendStatus(): Promise<boolean> {
    return await ApiService.checkBackendStatus();
  }

  // Get cached game state (for offline/fast access)
  static getCachedGameState(gameId: string): GameState | null {
    return this.gameCache.get(gameId) || null;
  }
} 