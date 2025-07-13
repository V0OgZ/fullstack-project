import { ApiService } from './api';
import { GameState, Player, Game } from '../types/game';

export class GameService {
  
  // Transform backend Scenario data to frontend Game data
  private static transformScenarioToGame(scenarioData: any): Game {
    // Create mock players based on starting positions
    const players: Player[] = scenarioData.startingPositions?.map((pos: any, index: number) => ({
      id: pos.playerId,
      username: pos.startingHero || `Player ${index + 1}`,
      email: `${pos.playerId}@example.com`,
      color: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b'][index % 6],
      isActive: index === 0, // First player is active
      resources: {
        gold: 1000,
        wood: 200,
        stone: 100,
        mana: 50
      },
      heroes: [{
        id: `hero_${pos.playerId}`,
        name: pos.startingHero || 'Unknown Hero',
        position: { x: pos.positionX, y: pos.positionY },
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
        playerId: pos.playerId,
        units: [],
        inventory: []
      }]
    })) || [];

    // Create a basic map structure
    const mapWidth = scenarioData.mapWidth || 20;
    const mapHeight = scenarioData.mapHeight || 20;
    const tiles = [];
    
    for (let y = 0; y < mapHeight; y++) {
      for (let x = 0; x < mapWidth; x++) {
        tiles.push({
          x,
          y,
          terrain: 'grass' as const,
          walkable: true,
          movementCost: 1,
          isVisible: true
        });
      }
    }

    // Create map objects from starting positions
    const objects = scenarioData.startingPositions?.map((pos: any, index: number) => ({
      id: `castle_${pos.playerId}`,
      x: pos.positionX,
      y: pos.positionY,
      type: 'city' as const,
      content: {
        resource: 'gold' as const,
        amount: 500
      }
    })) || [];

    const game: Game = {
      id: scenarioData.scenarioId,
      name: scenarioData.name,
      status: 'active',
      currentTurn: 1,
      turnStartTime: new Date().toISOString(),
      turnDuration: 300000, // 5 minutes
      players: players,
      map: {
        id: `map_${scenarioData.scenarioId}`,
        width: mapWidth,
        height: mapHeight,
        tiles: tiles,
        objects: objects
      },
      actions: [],
      timeline: [],
      zfcMap: [],
      gameSettings: {
        maxPlayers: scenarioData.maxPlayers || 2,
        turnTimeLimit: scenarioData.timeLimit ? scenarioData.timeLimit * 1000 : 300000,
        victoryConditions: [scenarioData.victoryCondition || 'conquest']
      },
      gameMode: 'async',
      currentPlayerTurn: players[0]?.id
    };

    return game;
  }

  static async initializeGame(scenarioId: string): Promise<GameState> {
    console.log(`Initializing game for scenario: ${scenarioId}`);
    
    try {
      let scenarioData: any;
      if (scenarioId === 'conquest-classic') {
        scenarioData = await ApiService.createConquestClassicScenario();
      } else if (scenarioId === 'temporal-rift') {
        scenarioData = await ApiService.createTemporalRiftScenario();
      } else {
        throw new Error(`Unknown scenario ID: ${scenarioId}`);
      }
      
      if (!scenarioData || !scenarioData.scenarioId) {
        throw new Error('Failed to create game from the backend.');
      }

      // Transform scenario data to game data
      const gameData = this.transformScenarioToGame(scenarioData);

      // Find the current player
      const currentPlayer = gameData.players.find(p => p.id === gameData.currentPlayerTurn);

      return {
        currentGame: gameData,
        currentPlayer: currentPlayer || null,
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

    } catch (error) {
      console.error('Error initializing game:', error);
      throw error;
    }
  }

  static async getGameState(gameId: string): Promise<GameState> {
    // For now, we'll reinitialize the game since the backend doesn't store game state
    // This is a temporary solution - in a real app, we'd have proper game state storage
    return this.initializeGame(gameId);
  }

  static async endTurn(gameId: string): Promise<void> {
    return ApiService.endTurn(gameId);
  }
} 