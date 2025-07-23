// api.js - Connexion API REST vers backend Heroes of Time
class GameAPI {
    constructor(baseUrl = 'http://localhost:8080/api/temporal') {
        this.baseUrl = baseUrl;
        this.gameId = null;
    }
    
    async createGame(gameName) {
        try {
            const response = await fetch(`${this.baseUrl}/games`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    gameName: gameName,
                    playerId: 'player1' 
                })
            });
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const game = await response.json();
            this.gameId = game.id || 1; // Fallback to 1 if no ID returned
            
            // Start the game automatically
            await this.startGame();
            
            return game;
        } catch (error) {
            console.error('Failed to create game:', error);
            throw error;
        }
    }
    
    async startGame() {
        if (!this.gameId) {
            throw new Error('No game ID available');
        }
        
        try {
            const response = await fetch(`${this.baseUrl}/games/${this.gameId}/start`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            });
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Failed to start game:', error);
            throw error;
        }
    }
    
    async executeScript(script) {
        if (!this.gameId) {
            throw new Error('No game created. Click "New Game" first.');
        }
        
        try {
            const response = await fetch(`${this.baseUrl}/games/${this.gameId}/script`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ script: script })
            });
            
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP ${response.status}: ${errorText}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Failed to execute script:', error);
            throw error;
        }
    }
    
    async getGameState() {
        if (!this.gameId) {
            throw new Error('No game created');
        }
        
        try {
            const response = await fetch(`${this.baseUrl}/games/${this.gameId}/state`);
            
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
            const response = await fetch(`${this.baseUrl}/games/${this.gameId}/next-turn`, {
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