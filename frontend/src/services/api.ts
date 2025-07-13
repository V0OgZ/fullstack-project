const BASE_URL = 'http://localhost:8080/api';

export class ApiService {
  private static async makeRequest(endpoint: string, options: RequestInit = {}): Promise<any> {
    const url = `${BASE_URL}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  // Health check
  static async getHealth(): Promise<any> {
    return this.makeRequest('/health');
  }

  // Game management
  static async createGame(gameData: any): Promise<any> {
    return this.makeRequest('/games', {
      method: 'POST',
      body: JSON.stringify(gameData)
    });
  }

  static async getGame(gameId: string): Promise<any> {
    return this.makeRequest(`/games/${gameId}`);
  }

  static async getGameState(gameId: string): Promise<any> {
    return this.makeRequest(`/games/${gameId}/state`);
  }

  static async joinGame(gameId: string): Promise<any> {
    return this.makeRequest(`/games/${gameId}/join`, {
      method: 'POST'
    });
  }

  static async getAvailableGames(): Promise<any> {
    return this.makeRequest('/games/available');
  }

  static async getCurrentPlayer(gameId: string): Promise<any> {
    return this.makeRequest(`/games/${gameId}/current-player`);
  }

  static async endTurn(gameId: string): Promise<any> {
    return this.makeRequest(`/games/${gameId}/end-turn`, {
      method: 'POST'
    });
  }

  static async getGameHistory(gameId: string): Promise<any> {
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

  // Actions
  static async getPendingActions(gameId: string): Promise<any> {
    return this.makeRequest(`/games/${gameId}/actions/pending`);
  }

  static async cancelAction(actionId: string): Promise<any> {
    return this.makeRequest(`/actions/${actionId}/cancel`, {
      method: 'POST'
    });
  }

  static async getCombatResults(gameId: string): Promise<any> {
    return this.makeRequest(`/games/${gameId}/combat-results`);
  }

  // Magic Items API
  static async getAllMagicItems(): Promise<any> {
    return this.makeRequest('/magic-items', {
      method: 'GET'
    });
  }

  static async getMagicItem(itemId: string): Promise<any> {
    return this.makeRequest(`/magic-items/${itemId}`, {
      method: 'GET'
    });
  }

  static async applyItemEffects(hero: any, equippedItems: any): Promise<any> {
    return this.makeRequest('/magic-items/apply-effects', {
      method: 'POST',
      body: JSON.stringify({ hero, equippedItems })
    });
  }

  static async validateEquipItem(itemId: string, heroLevel: number): Promise<any> {
    return this.makeRequest('/magic-items/validate-equip', {
      method: 'POST',
      body: JSON.stringify({ itemId, heroLevel })
    });
  }

  static async consumeItem(itemId: string, hero: any, playerGold: number): Promise<any> {
    return this.makeRequest('/magic-items/consume', {
      method: 'POST',
      body: JSON.stringify({ itemId, hero, playerGold })
    });
  }

  static async calculateTemporalEffects(equippedItems: any): Promise<any> {
    return this.makeRequest('/magic-items/temporal-effects', {
      method: 'POST',
      body: JSON.stringify(equippedItems)
    });
  }

  static async getTotalItemBonuses(equippedItems: any): Promise<any> {
    return this.makeRequest('/magic-items/total-bonuses', {
      method: 'POST',
      body: JSON.stringify(equippedItems)
    });
  }

  // ZFC API
  static async calculateZFC(playerId: string, heroId: string, hero: any, map: any, currentTurn: number): Promise<any> {
    return this.makeRequest('/zfc/calculate', {
      method: 'POST',
      body: JSON.stringify({ playerId, heroId, hero, map, currentTurn })
    });
  }

  static async calculateZFCMovementCost(from: any, to: any, hero: any, map: any): Promise<any> {
    return this.makeRequest('/zfc/movement-cost', {
      method: 'POST',
      body: JSON.stringify({ from, to, hero, map })
    });
  }

  static async validateZFCAction(actionType: string, heroId: string, targetPosition: any, zfc: any, map: any): Promise<any> {
    return this.makeRequest('/zfc/validate-action', {
      method: 'POST',
      body: JSON.stringify({ actionType, heroId, targetPosition, zfc, map })
    });
  }

  static async generateShadowActions(pendingActions: any, currentTurn: number): Promise<any> {
    return this.makeRequest('/zfc/shadow-actions', {
      method: 'POST',
      body: JSON.stringify({ pendingActions, currentTurn })
    });
  }

  static async calculateTemporalInterference(activeZFCs: any): Promise<any> {
    return this.makeRequest('/zfc/temporal-interference', {
      method: 'POST',
      body: JSON.stringify({ activeZFCs })
    });
  }

  // Castle Management
  static async getBuildingsByCastle(castleId: string): Promise<any> {
    return this.makeRequest(`/castles/${castleId}/buildings`);
  }

  static async getAvailableUnitsForRecruitment(castleId: string): Promise<any> {
    return this.makeRequest(`/castles/${castleId}/units/available`);
  }

  static async getCastleBonuses(castleId: string): Promise<any> {
    return this.makeRequest(`/castles/${castleId}/bonuses`);
  }

  static async constructBuilding(castleId: string, buildingId: string): Promise<any> {
    return this.makeRequest(`/castles/${castleId}/buildings/${buildingId}/construct`, {
      method: 'POST'
    });
  }

  static async upgradeBuilding(buildingId: string, data: any): Promise<any> {
    return this.makeRequest(`/buildings/${buildingId}/upgrade`, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  static async recruitUnits(buildingId: string, data: any): Promise<any> {
    return this.makeRequest(`/buildings/${buildingId}/recruit`, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  static async checkAndCompleteReadyBuildings(gameId: string): Promise<any> {
    return this.makeRequest(`/games/${gameId}/buildings/check-ready`, {
      method: 'POST'
    });
  }

  static async startConstructionWithResources(data: any): Promise<any> {
    return this.makeRequest('/buildings/start-construction', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  static async completeConstruction(buildingId: string): Promise<any> {
    return this.makeRequest(`/buildings/${buildingId}/complete`, {
      method: 'POST'
    });
  }

  static async getJoinableSessions(): Promise<any> {
    return this.makeRequest('/games/joinable');
  }

  static async createMultiplayerSession(data: any): Promise<any> {
    return this.makeRequest('/games/multiplayer', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  static async joinMultiplayerSession(sessionId: string, playerId: string): Promise<any> {
    return this.makeRequest(`/games/multiplayer/${sessionId}/join`, {
      method: 'POST',
      body: JSON.stringify({ playerId })
    });
  }

  static async createConquestClassicScenario(): Promise<any> {
    return this.makeRequest('/scenarios/predefined/conquest-classic', { method: 'POST' });
  }

  static async createTemporalRiftScenario(): Promise<any> {
    return this.makeRequest('/scenarios/predefined/temporal-rift', { method: 'POST' });
  }

  static async initializeDefaultScenarios(): Promise<any> {
    return this.makeRequest('/scenarios/initialize', {
      method: 'POST'
    });
  }

  static async getAllScenarios(): Promise<any> {
    return this.makeRequest('/scenarios');
  }

  static async getPoliticalAdvisors(): Promise<any> {
    return this.makeRequest('/political/advisors');
  }

  static async generateAdvisorRecommendations(event: any, choice: any): Promise<any> {
    return this.makeRequest('/political/recommendations', {
      method: 'POST',
      body: JSON.stringify({ event, choice })
    });
  }

  static async generatePoliticalEvent(currentReputation: any, turn: number): Promise<any> {
    return this.makeRequest('/political/events/generate', {
      method: 'POST',
      body: JSON.stringify({ currentReputation, turn })
    });
  }

  static async updateAdvisorOpinions(currentAdvisors: any, choice: any): Promise<any> {
    return this.makeRequest('/political/advisors/update', {
      method: 'POST',
      body: JSON.stringify({ currentAdvisors, choice })
    });
  }

  static async calculatePoliticalStability(advisors: any): Promise<any> {
    return this.makeRequest('/political/stability/calculate', {
      method: 'POST',
      body: JSON.stringify({ advisors })
    });
  }

  static async checkBackendStatus(): Promise<boolean> {
    try {
      await this.makeRequest('/health');
      return true;
    } catch (error) {
      return false;
    }
  }
} 