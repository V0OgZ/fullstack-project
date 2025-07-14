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
    console.log(`%c🎮 [GameService] Initializing game for scenario: ${scenarioId}`, 'color: purple; font-weight: bold');
    
    try {
      let scenarioData: any;
      if (scenarioId === 'conquest-classic') {
        console.log(`%c📡 [GameService] Calling createConquestClassicScenario()`, 'color: blue');
        scenarioData = await ApiService.createConquestClassicScenario();
      } else if (scenarioId === 'temporal-rift') {
        console.log(`%c📡 [GameService] Calling createTemporalRiftScenario()`, 'color: blue');
        scenarioData = await ApiService.createTemporalRiftScenario();
      } else if (scenarioId === 'multiplayer-arena') {
        // For now, use conquest-classic as fallback for multiplayer-arena
        console.log(`%c📡 [GameService] Using conquest-classic fallback for multiplayer-arena`, 'color: orange');
        scenarioData = await ApiService.createConquestClassicScenario();
        scenarioData.scenarioId = 'multiplayer-arena';
        scenarioData.name = 'Multiplayer Arena';
      } else if (scenarioId === 'epic-campaign') {
        // For now, use conquest-classic as fallback for epic-campaign
        console.log(`%c📡 [GameService] Using conquest-classic fallback for epic-campaign`, 'color: orange');
        scenarioData = await ApiService.createConquestClassicScenario();
        scenarioData.scenarioId = 'epic-campaign';
        scenarioData.name = 'Epic Campaign';
      } else {
        // Default fallback - use conquest-classic for any unknown scenario
        console.warn(`%c⚠️ [GameService] Unknown scenario ID: ${scenarioId}, falling back to conquest-classic`, 'color: orange');
        scenarioData = await ApiService.createConquestClassicScenario();
        scenarioData.scenarioId = scenarioId;
        scenarioData.name = `Scenario: ${scenarioId}`;
      }
      
      console.log(`%c✅ [GameService] Backend response:`, 'color: green; font-weight: bold', scenarioData);
      
      if (!scenarioData || !scenarioData.scenarioId) {
        console.error(`%c💥 [GameService] Invalid scenario data:`, 'color: red; font-weight: bold', scenarioData);
        throw new Error('Failed to create game from the backend.');
      }

      // Transform scenario data to game data
      console.log(`%c🔄 [GameService] Transforming scenario data to game data...`, 'color: blue');
      const gameData = this.transformScenarioToGame(scenarioData);
      console.log(`%c✅ [GameService] Game data created:`, 'color: green; font-weight: bold', gameData);

      // Find the current player
      const currentPlayer = gameData.players.find(p => p.id === gameData.currentPlayerTurn);
      console.log(`%c👤 [GameService] Current player:`, 'color: blue', currentPlayer);

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