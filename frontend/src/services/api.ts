import { ApiResponse, HealthResponse } from '../types/api';

const API_BASE_URL = 'http://localhost:8080/api';

export class ApiService {
  private static async makeRequest<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers
      },
      ...options
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  }

  // Basic health endpoints
  static async getHello(): Promise<ApiResponse> {
    return this.makeRequest<ApiResponse>('/hello');
  }

  static async getHealth(): Promise<HealthResponse> {
    return this.makeRequest<HealthResponse>('/health');
  }

  static async checkBackendStatus(): Promise<boolean> {
    try {
      await this.getHealth();
      return true;
    } catch {
      return false;
    }
  }

  // Game management
  static async getGame(gameId: string): Promise<any> {
    return this.makeRequest(`/games/${gameId}`);
  }

  static async getAvailableGames(): Promise<any[]> {
    return this.makeRequest('/games/available');
  }

  static async createGame(request: any): Promise<any> {
    return this.makeRequest('/games', {
      method: 'POST',
      body: JSON.stringify(request)
    });
  }

  static async joinGame(gameId: string): Promise<any> {
    return this.makeRequest(`/games/${gameId}/join`, {
      method: 'POST'
    });
  }

  static async getCurrentPlayer(gameId: string): Promise<any> {
    return this.makeRequest(`/games/${gameId}/current-player`);
  }

  static async getGameState(gameId: string): Promise<any> {
    return this.makeRequest(`/games/${gameId}/state`);
  }

  static async getGameHistory(gameId: string): Promise<any[]> {
    return this.makeRequest(`/games/${gameId}/history`);
  }

  // Hero actions (ZFC calculations will be done server-side)
  static async moveHero(heroId: string, targetPosition: any): Promise<any> {
    return this.makeRequest(`/heroes/${heroId}/move`, {
      method: 'POST',
      body: JSON.stringify({ targetPosition })
    });
  }

  static async attackTarget(heroId: string, targetId: string): Promise<any> {
    return this.makeRequest(`/heroes/${heroId}/attack`, {
      method: 'POST',
      body: JSON.stringify({ targetId })
    });
  }

  static async collectResource(heroId: string, objectId: string): Promise<any> {
    return this.makeRequest(`/heroes/${heroId}/collect`, {
      method: 'POST',
      body: JSON.stringify({ objectId })
    });
  }

  // Action management (for ZFC shadow actions)
  static async getPendingActions(gameId: string): Promise<any[]> {
    return this.makeRequest(`/games/${gameId}/actions/pending`);
  }

  static async cancelAction(actionId: string): Promise<void> {
    await this.makeRequest(`/actions/${actionId}/cancel`, {
      method: 'POST'
    });
  }

  // Turn management
  static async endTurn(gameId: string): Promise<void> {
    await this.makeRequest(`/games/${gameId}/end-turn`, {
      method: 'POST'
    });
  }

  // Combat results
  static async getCombatResults(gameId: string): Promise<any[]> {
    return this.makeRequest(`/games/${gameId}/combat-results`);
  }

  // Multiplayer session management
  static async createMultiplayerSession(request: any): Promise<any> {
    return this.makeRequest('/multiplayer/create', {
      method: 'POST',
      body: JSON.stringify(request)
    });
  }

  static async getJoinableSessions(): Promise<any> {
    return this.makeRequest('/multiplayer/sessions');
  }

  static async joinMultiplayerSession(sessionId: string, playerId: string): Promise<any> {
    return this.makeRequest(`/multiplayer/join/${sessionId}`, {
      method: 'POST',
      body: JSON.stringify({ playerId })
    });
  }

  static async leaveMultiplayerSession(sessionId: string, playerId: string): Promise<any> {
    return this.makeRequest(`/multiplayer/leave/${sessionId}`, {
      method: 'POST',
      body: JSON.stringify({ playerId })
    });
  }

  static async startMultiplayerSession(sessionId: string, playerId: string): Promise<any> {
    return this.makeRequest(`/multiplayer/start/${sessionId}`, {
      method: 'POST',
      body: JSON.stringify({ playerId })
    });
  }

  static async getMultiplayerGameState(sessionId: string): Promise<any> {
    return this.makeRequest(`/multiplayer/game-state/${sessionId}`);
  }

  static async sendGameAction(sessionId: string, playerId: string, actionType: string, actionData: any): Promise<any> {
    return this.makeRequest(`/multiplayer/action/${sessionId}`, {
      method: 'POST',
      body: JSON.stringify({ playerId, actionType, actionData })
    });
  }
} 