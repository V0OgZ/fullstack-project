const BASE_URL = 'http://localhost:8080/api';

export class ApiService {
  private static async makeRequest(endpoint: string, options: RequestInit = {}): Promise<any> {
    const url = `${BASE_URL}${endpoint}`;
    console.log(`%c🚀 [ApiService] Making request:`, 'color: purple; font-weight: bold');
    console.log(`%c   Method: ${options.method || 'GET'}`, 'color: blue');
    console.log(`%c   URL: ${url}`, 'color: blue');
    console.log(`%c   Options:`, 'color: blue', options);
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      console.log(`%c📡 Sending fetch request...`, 'color: orange');
      
      // Add timeout to the fetch request
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      const response = await fetch(url, {
        ...config,
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      console.log(`%c📥 Response received:`, 'color: cyan');
      console.log(`%c   Status: ${response.status} ${response.statusText}`, 'color: cyan');
      console.log(`%c   Headers:`, 'color: cyan', response.headers);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`%c❌ API Error:`, 'color: red; font-weight: bold');
        console.error(`%c   Status: ${response.status} ${response.statusText}`, 'color: red');
        console.error(`%c   Error body: ${errorText}`, 'color: red');
        throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
      }
      
      const data = await response.json();
      console.log(`%c✅ API Success:`, 'color: green; font-weight: bold', data);
      return data;
    } catch (error) {
      console.error(`%c💥 API Request Failed:`, 'color: red; font-weight: bold');
      console.error(`%c   URL: ${url}`, 'color: red');
      console.error(`%c   Method: ${options.method || 'GET'}`, 'color: red');
      console.error(`%c   Error:`, 'color: red', error);
      
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error(`Request timeout for ${url}`);
      }
      
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

  static async endTurn(gameId: string, playerId: string = 'player1'): Promise<any> {
    return this.makeRequest(`/games/${gameId}/end-turn`, {
      method: 'POST',
      body: JSON.stringify({
        playerId: playerId
      })
    });
  }

  static async getGameHistory(gameId: string): Promise<any> {
    return this.makeRequest(`/games/${gameId}/history`);
  }

  // Hero actions (ZFC calculations will be done server-side)
  static async moveHero(gameId: string, heroId: string, targetPosition: any): Promise<any> {
    return this.makeRequest(`/games/${gameId}/move-hero`, {
      method: 'POST',
      body: JSON.stringify({ heroId, position: targetPosition })
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

  // Generic API method for game script engine
  static async makeGenericRequest(endpoint: string, options: RequestInit = {}): Promise<any> {
    return this.makeRequest(endpoint, options);
  }

  static async calculateTemporalInterference(activeZFCs: any): Promise<any> {
    return this.makeRequest('/zfc/temporal-interference', {
      method: 'POST',
      body: JSON.stringify({ activeZFCs })
    });
  }

  // Castle Management - legacy methods (kept for compatibility)

  static async recruitUnitsFromGame(gameId: string, buildingId: string, data: any): Promise<any> {
    return this.makeRequest(`/games/${gameId}/buildings/${buildingId}/recruit`, {
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
    return this.makeRequest('/multiplayer/sessions');
  }

  static async createMultiplayerSession(data: any): Promise<any> {
    return this.makeRequest('/multiplayer/sessions', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  static async joinMultiplayerSession(sessionId: string, playerId: string): Promise<any> {
    return this.makeRequest(`/multiplayer/sessions/${sessionId}/join`, {
      method: 'POST',
      body: JSON.stringify({ playerId })
    });
  }

  static async startMultiplayerSession(sessionId: string, playerId: string): Promise<any> {
    return this.makeRequest(`/multiplayer/sessions/${sessionId}/start`, {
      method: 'POST',
      body: JSON.stringify({ playerId })
    });
  }

  static async getMultiplayerSession(sessionId: string): Promise<any> {
    return this.makeRequest(`/multiplayer/sessions/${sessionId}`, {
      method: 'GET'
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

  static async getAllScenarios(language = 'en'): Promise<any> {
    return this.makeRequest(`/scenarios/all?lang=${language}`);
  }

  static async getAvailableLanguages(): Promise<any> {
    return this.makeRequest('/scenarios/languages');
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
      const response = await this.makeRequest('/health');
      return response.status === 'UP';
    } catch (error) {
      console.error('Backend health check failed:', error);
      return false;
    }
  }

  // Castle management methods - aligned with backend endpoints
  static async getPlayerBuildings(gameId: string, playerId: string): Promise<any> {
    // Use the actual backend endpoint
    return this.makeRequest(`/buildings/player/${playerId}`);
  }

  static async getBuildingsByGame(gameId: string): Promise<any> {
    return this.makeRequest(`/buildings/game/${gameId}`);
  }

  static async getCastleBuildings(castleId: string): Promise<any> {
    return this.makeRequest(`/buildings/castle/${castleId}`);
  }

  static async getAvailableUnits(gameId: string, playerId: string, castleId?: string): Promise<any> {
    // If castleId is provided, use castle endpoint, otherwise use game endpoint
    if (castleId) {
      return this.makeRequest(`/buildings/castle/${castleId}/units/available`);
    }
    return this.makeRequest(`/games/${gameId}/players/${playerId}/units/available`);
  }

  static async getUnitDetails(unitId: string): Promise<any> {
    return this.makeRequest(`/units/${unitId}`);
  }

  static async getCastleBonuses(castleId: string): Promise<any> {
    return this.makeRequest(`/buildings/castle/${castleId}/bonuses`);
  }

  static async recruitUnits(buildingId: string, unitType: string, quantity: number): Promise<any> {
    return this.makeRequest(`/buildings/${buildingId}/recruit`, {
      method: 'POST',
      body: JSON.stringify({ unitType, quantity })
    });
  }

  static async constructBuilding(castleId: string, playerId: string, gameId: string, buildingType: string, positionX?: number, positionY?: number): Promise<any> {
    return this.makeRequest(`/buildings/construct`, {
      method: 'POST',
      body: JSON.stringify({ castleId, playerId, gameId, buildingType, positionX, positionY })
    });
  }

  static async upgradeBuilding(buildingId: string, playerResources?: any): Promise<any> {
    return this.makeRequest(`/buildings/${buildingId}/upgrade`, {
      method: 'POST',
      body: JSON.stringify({ playerResources })
    });
  }

} 