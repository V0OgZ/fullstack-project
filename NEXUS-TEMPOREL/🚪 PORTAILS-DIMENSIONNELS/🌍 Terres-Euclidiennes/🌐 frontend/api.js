// api.js - Connexion API REST vers backend Heroes of Time
class GameAPI {
    constructor(baseUrl = 'http://localhost:8080/api') {
        this.baseUrl = baseUrl;
        this.gameId = null;
    }
    
    async createGame(gameName) {
        try {
            const response = await fetch(`${this.baseUrl}/games`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    scenarioId: 'conquest-classic',
                    playerCount: 1
                })
            });
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const game = await response.json();
            this.gameId = game.id || 'game-1'; // Use the returned game ID
            
            return game;
        } catch (error) {
            console.error('Failed to create game:', error);
            throw error;
        }
    }
    
    async executeScript(script) {
        if (!this.gameId) {
            throw new Error('No game created. Click "New Game" first.');
        }
        
        try {
            const response = await fetch(`${this.baseUrl}/temporal/execute`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    gameId: this.gameId,
                    script: script 
                })
            });
            
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP ${response.status}: ${errorText}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Failed to execute HOTS script:', error);
            throw error;
        }
    }
    
    async newGame() {
        // Alias for createGame to match the frontend interface
        return this.createGame('Heroes of Time Game');
    }
    
    async moveHero(heroId, targetX, targetY) {
        if (!this.gameId) {
            throw new Error('No game created');
        }
        
        try {
            const response = await fetch(`${this.baseUrl}/games/${this.gameId}/move-hero`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    heroId: heroId,
                    targetPosition: { x: targetX, y: targetY }
                })
            });
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Failed to move hero:', error);
            throw error;
        }
    }
    
    async getGameState() {
        if (!this.gameId) {
            throw new Error('No game created');
        }
        
        try {
            const response = await fetch(`${this.baseUrl}/games/${this.gameId}`);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Failed to get game state:', error);
            throw error;
        }
    }
    
    async nextTurn() {
        if (!this.gameId) {
            throw new Error('No game created');
        }
        
        try {
            const response = await fetch(`${this.baseUrl}/games/${this.gameId}/end-turn`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            });
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Failed to advance turn:', error);
            throw error;
        }
    }
    
    async checkHealth() {
        try {
            const response = await fetch(`${this.baseUrl}/health`);
            return response.ok;
        } catch (error) {
            console.error('Backend health check failed:', error);
            return false;
        }
    }
    
    // Utility method to test connection
    async testConnection() {
        try {
            const isHealthy = await this.checkHealth();
            if (!isHealthy) {
                throw new Error('Backend server is not responding');
            }
            return true;
        } catch (error) {
            console.error('Connection test failed:', error);
            return false;
        }
    }
}