import { Game, Player, GameAction, Position } from '../types/game';

export class GameService {
  static async getGame(gameId: string): Promise<Game> {
    // Mock implementation for now
    return {
      id: gameId,
      name: 'HoMM3 Style Game',
      map: {
        id: 'map1',
        width: 10,
        height: 10,
        tiles: [],
        objects: []
      },
      players: [],
      currentTurn: 1,
      turnStartTime: new Date().toISOString(),
      turnDuration: 5,
      status: 'active',
      actions: [],
      timeline: [], // NOUVEAU: Timeline des actions
      zfcMap: [], // NOUVEAU: Carte des zones de causalité
      gameSettings: {
        maxPlayers: 2,
        turnTimeLimit: 5,
        victoryConditions: ['conquer_all']
      },
      gameMode: 'hotseat',
      currentPlayerTurn: 'player1'
    };
  }

  static async getCurrentPlayer(gameId: string): Promise<Player> {
    // Mock implementation
    return {
      id: 'player1',
      username: 'Player 1',
      email: 'player1@example.com',
      color: '#ff0000',
      heroes: [],
      resources: {
        gold: 1000,
        wood: 10,
        stone: 10,
        mana: 10
      },
      isActive: true
    };
  }

  static async moveHero(heroId: string, targetPosition: Position): Promise<GameAction> {
    // Mock implementation
    return {
      id: `action_${Date.now()}`,
      type: 'move',
      heroId,
      targetPosition,
      scheduledTime: new Date().toISOString(),
      executionTime: new Date().toISOString(),
      status: 'pending'
    };
  }

  static async attackTarget(heroId: string, targetId: string): Promise<GameAction> {
    // Mock implementation
    return {
      id: `action_${Date.now()}`,
      type: 'attack',
      heroId,
      targetId,
      scheduledTime: new Date().toISOString(),
      executionTime: new Date().toISOString(),
      status: 'pending'
    };
  }

  static async collectResource(heroId: string, objectId: string): Promise<GameAction> {
    // Mock implementation
    return {
      id: `action_${Date.now()}`,
      type: 'collect',
      heroId,
      targetId: objectId,
      scheduledTime: new Date().toISOString(),
      executionTime: new Date().toISOString(),
      status: 'pending'
    };
  }

  static async cancelAction(actionId: string): Promise<void> {
    // Mock implementation
    console.log('Cancelling action:', actionId);
  }

  static async endTurn(gameId: string): Promise<void> {
    // Mock implementation
    console.log('Ending turn for game:', gameId);
  }
} 