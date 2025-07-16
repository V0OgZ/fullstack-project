import { ApiService } from './api';
import { Game, Player, GameState } from '../types/game';

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
    const tiles: any[][] = [];
    
    for (let y = 0; y < mapHeight; y++) {
      const row = [];
      for (let x = 0; x < mapWidth; x++) {
        row.push({
          x,
          y,
          terrain: 'grass' as const,
          walkable: true,
          movementCost: 1,
          isVisible: true,
          visible: true,
          explored: true
        });
      }
      tiles.push(row);
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
      scenario: scenarioData.scenarioId,
      players: players,
      currentPlayerId: players[0]?.id || 'player1',
      turn: 1,
      maxTurns: scenarioData.maxTurns || 200,
      map: tiles,
      date: new Date().toISOString(),
      status: 'active',
      settings: {
        mapSize: 'medium',
        playerCount: players.length,
        aiCount: 0,
        startingResources: 'normal',
        startingHeroes: 1,
        startingLevel: 1,
        victoryConditions: [],
        defeatConditions: []
      },
      gameMode: players.length > 1 ? 'multiplayer' : 'standard',
      timeline: []
    };

    return game;
  }

  static async initializeGame(scenarioId: string): Promise<GameState> {
    console.log(`%c🎮 [GameService] Initializing game for scenario: ${scenarioId}`, 'color: purple; font-weight: bold');
    
    try {
      // Step 1: Create a game directly using the scenario ID
      console.log(`%c🎯 [GameService] Creating game for scenario: ${scenarioId}`, 'color: blue');
      const gameData = await ApiService.createGame({
        scenarioId: scenarioId,
        playerCount: 2, // Default to 2 players
        gameMode: scenarioId
      });
      
      console.log(`%c🎮 [GameService] Game created successfully:`, 'color: green', gameData);
      
      // The backend returns the full game state directly from createGame
      // No need to make a second API call
      const fullGameState = gameData;
      
      // Step 2: Transform to frontend format
      const transformedGame: Game = {
        id: fullGameState.id,
        name: fullGameState.name,
        scenario: fullGameState.scenario,
        players: fullGameState.players,
        currentPlayerId: fullGameState.currentPlayer?.id || 'player1',
        turn: fullGameState.currentTurn || 1,
        maxTurns: fullGameState.maxTurns || 200,
        map: fullGameState.map || [],
        date: fullGameState.date || new Date().toISOString(),
        status: fullGameState.status || 'active',
        settings: fullGameState.settings || {},
        // Fix game mode logic: if 2+ players, it's always multiplayer (backend-managed)
        gameMode: fullGameState.players?.length > 1 ? 'multiplayer' : 'standard',
        timeline: fullGameState.timeline || []
      };

      return {
        currentGame: transformedGame,
        currentPlayer: fullGameState.currentPlayer || fullGameState.players?.[0],
        pendingActions: [],
        combatResults: [],
        isLoading: false,
        error: null
      };
      
    } catch (error) {
      console.error(`%c💥 [GameService] Error initializing game:`, 'color: red; font-weight: bold', error);
      throw error;
    }
  }

  static async getGameState(gameId: string): Promise<GameState> {
    console.log(`%c🔄 [GameService] Getting game state for: ${gameId}`, 'color: blue');
    
    try {
      const fullGameState = await ApiService.getGame(gameId);
      console.log(`%c📊 [GameService] Game state retrieved:`, 'color: green', fullGameState);
      
      return {
        currentGame: {
          id: fullGameState.id,
          name: fullGameState.name,
          scenario: fullGameState.scenario,
          players: fullGameState.players,
          currentPlayerId: fullGameState.currentPlayer?.id || 'player1',
          turn: fullGameState.currentTurn || 1,
          maxTurns: fullGameState.maxTurns || 200,
          map: fullGameState.map || [],
          date: fullGameState.date || new Date().toISOString(),
          status: fullGameState.status || 'active',
          settings: fullGameState.settings || {},
          // Fix game mode logic: if 2+ players, it's always multiplayer (backend-managed)
          gameMode: fullGameState.players?.length > 1 ? 'multiplayer' : 'standard',
          timeline: fullGameState.timeline || []
        },
        currentPlayer: fullGameState.currentPlayer || fullGameState.players?.[0],
        pendingActions: [],
        combatResults: [],
        isLoading: false,
        error: null
      };
      
    } catch (error) {
      console.error(`%c💥 [GameService] Error getting game state:`, 'color: red; font-weight: bold', error);
      throw error;
    }
  }

  static async endTurn(gameId: string, playerId: string = 'player1'): Promise<void> {
    return ApiService.endTurn(gameId, playerId);
  }
} 