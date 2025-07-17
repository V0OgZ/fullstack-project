// @controller: GameController.java, TemporalEngineController.java
// @endpoints: GET /api/game/status, POST /api/game/create, POST /api/game/{id}/script
// @uses: createGame(), executeScript(), getGameState(), updateUI()
// @description: Interface JavaScript pour le moteur temporel Heroes of Time

class TemporalEngine {
    constructor() {
        this.baseUrl = 'http://localhost:8080';
        this.currentGameId = null;
        this.gameState = null;
        this.isConnected = false;
        this.updateInterval = null;
        
        this.init();
    }

    async init() {
        console.log('🚀 Initializing Temporal Engine Interface...');
        this.createGameBoard();
        await this.checkConnection();
        this.startPeriodicUpdates();
        this.log('✅ Temporal Engine Interface Ready', 'success');
    }

    // ============================================
    // CONNECTION & STATUS
    // ============================================

    async checkConnection() {
        try {
            const response = await fetch(`${this.baseUrl}/api/game/status`);
            if (response.ok) {
                const data = await response.json();
                this.isConnected = true;
                this.updateStatus('Connected', true);
                this.log(`🔌 Connected to Temporal Engine v${data.version}`, 'success');
                return true;
            }
        } catch (error) {
            this.isConnected = false;
            this.updateStatus('Disconnected', false);
            this.log('❌ Failed to connect to backend', 'error');
            return false;
        }
    }

    updateStatus(text, connected) {
        const statusText = document.getElementById('statusText');
        const statusDot = document.getElementById('statusDot');
        
        statusText.textContent = text;
        statusDot.style.background = connected ? '#27ae60' : '#e74c3c';
    }

    // ============================================
    // GAME MANAGEMENT
    // ============================================

    async createNewGame() {
        if (!this.isConnected) {
            this.log('❌ Cannot create game: Not connected to backend', 'error');
            return;
        }

        try {
            const response = await fetch(`${this.baseUrl}/api/game/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    gameName: 'Temporal Game',
                    playerId: 'temporal-player'
                })
            });

            const data = await response.json();
            
            if (data.success) {
                this.currentGameId = data.gameId;
                this.log(`🎮 New game created: ID ${data.gameId}`, 'success');
                this.updateGameInfo();
                await this.refreshGameState();
            } else {
                this.log(`❌ Failed to create game: ${data.error}`, 'error');
            }
        } catch (error) {
            this.log(`❌ Error creating game: ${error.message}`, 'error');
        }
    }

    async refreshGameState() {
        if (!this.currentGameId) return;

        try {
            const response = await fetch(`${this.baseUrl}/api/game/${this.currentGameId}`);
            const data = await response.json();
            
            if (data.success) {
                this.gameState = data;
                this.updateGameInfo();
                this.updateGameBoard();
                this.updatePsiStatesList();
            }
        } catch (error) {
            this.log(`❌ Error refreshing game state: ${error.message}`, 'error');
        }
    }

    // ============================================
    // SCRIPT EXECUTION
    // ============================================

    async executeScript() {
        const scriptInput = document.getElementById('scriptInput');
        const script = scriptInput.value.trim();
        
        if (!script) {
            this.log('❌ No script to execute', 'error');
            return;
        }

        if (!this.currentGameId) {
            this.log('❌ No active game. Create a game first.', 'error');
            return;
        }

        try {
            this.log(`⚡ Executing: ${script}`, 'info');
            
            const response = await fetch(`${this.baseUrl}/api/game/${this.currentGameId}/script`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ script: script })
            });

            const data = await response.json();
            
            if (data.success) {
                this.log(`✅ Script executed successfully`, 'success');
                if (data.result && data.result.message) {
                    this.log(`📝 Result: ${data.result.message}`, 'info');
                }
                
                // Clear the input after successful execution
                scriptInput.value = '';
                
                // Refresh game state
                await this.refreshGameState();
            } else {
                this.log(`❌ Script execution failed: ${data.error}`, 'error');
            }
        } catch (error) {
            this.log(`❌ Error executing script: ${error.message}`, 'error');
        }
    }

    async runDemo() {
        if (!this.isConnected) {
            this.log('❌ Cannot run demo: Not connected to backend', 'error');
            return;
        }

        try {
            this.log('🎬 Running temporal engine demo...', 'info');
            
            const response = await fetch(`${this.baseUrl}/api/game/demo`, {
                method: 'POST'
            });

            const data = await response.json();
            
            if (data.success) {
                this.currentGameId = data.gameId;
                this.log('🎬 Demo completed successfully!', 'success');
                this.log(`🎮 Demo game ID: ${data.gameId}`, 'info');
                
                if (data.collapseResult) {
                    this.log(`🌀 Collapse result: ${JSON.stringify(data.collapseResult)}`, 'info');
                }
                
                await this.refreshGameState();
            } else {
                this.log(`❌ Demo failed: ${data.error}`, 'error');
            }
        } catch (error) {
            this.log(`❌ Error running demo: ${error.message}`, 'error');
        }
    }

    // ============================================
    // UI UPDATES
    // ============================================

    updateGameInfo() {
        if (this.gameState) {
            document.getElementById('gameId').textContent = this.gameState.gameId || '-';
            document.getElementById('currentTurn').textContent = this.gameState.turnCount || 0;
            document.getElementById('heroCount').textContent = this.gameState.heroes?.length || 0;
        }
        
        if (this.currentGameId) {
            document.getElementById('gameId').textContent = this.currentGameId;
        }
    }

    createGameBoard() {
        const gameBoard = document.getElementById('gameBoard');
        gameBoard.innerHTML = '';

        // Create 20x15 grid
        for (let y = 0; y < 15; y++) {
            for (let x = 0; x < 20; x++) {
                const tile = document.createElement('div');
                tile.className = 'tile';
                tile.dataset.x = x;
                tile.dataset.y = y;
                tile.title = `(${x}, ${y})`;
                
                tile.addEventListener('click', () => this.onTileClick(x, y));
                
                gameBoard.appendChild(tile);
            }
        }
    }

    updateGameBoard() {
        // Clear all special tile classes
        document.querySelectorAll('.tile').forEach(tile => {
            tile.classList.remove('has-hero', 'has-psi-state');
            tile.innerHTML = '';
        });

        if (!this.gameState) return;

        // Add heroes to board
        if (this.gameState.heroes) {
            this.gameState.heroes.forEach(hero => {
                const tile = this.getTileAt(hero.position?.x, hero.position?.y);
                if (tile) {
                    tile.classList.add('has-hero');
                    tile.innerHTML = `<span style="font-size: 0.7em;">🦸</span>`;
                    tile.title = `${hero.name} at (${hero.position.x}, ${hero.position.y})`;
                }
            });
        }

        // Add ψ-states to board
        if (this.gameState.psiStates) {
            this.gameState.psiStates.forEach(psi => {
                if (psi.targetPosition) {
                    const tile = this.getTileAt(psi.targetPosition.x, psi.targetPosition.y);
                    if (tile) {
                        tile.classList.add('has-psi-state');
                        tile.innerHTML += `<span style="font-size: 0.6em;">ψ</span>`;
                        tile.title += ` | ψ-state: ${psi.psiId}`;
                    }
                }
            });
        }
    }

    updatePsiStatesList() {
        const psiStateList = document.getElementById('psiStateList');
        
        if (!this.gameState || !this.gameState.psiStates || this.gameState.psiStates.length === 0) {
            psiStateList.innerHTML = `
                <p style="color: rgba(233, 69, 96, 0.5); text-align: center; margin-top: 50px;">
                    No active ψ-states
                </p>
            `;
            document.getElementById('activePsiStates').textContent = '0';
            return;
        }

        const activePsiStates = this.gameState.psiStates.filter(psi => psi.status === 'ACTIVE');
        document.getElementById('activePsiStates').textContent = activePsiStates.length;

        psiStateList.innerHTML = activePsiStates.map(psi => `
            <div class="psi-state-item">
                <div class="psi-id">${psi.psiId}</div>
                <div class="psi-action">${psi.actionType || 'Unknown'}: ${psi.ownerHero || 'N/A'}</div>
                <div style="font-size: 0.8em; color: #3498db;">
                    Target: (${psi.targetPosition?.x || '?'}, ${psi.targetPosition?.y || '?'})
                    | Δt: ${psi.deltaT || '?'}
                </div>
                <button class="btn" style="margin-top: 5px; padding: 5px 10px; font-size: 0.8em;" 
                        onclick="engine.collapseState('${psi.psiId}')">
                    † Collapse
                </button>
            </div>
        `).join('');
    }

    getTileAt(x, y) {
        if (x === undefined || y === undefined) return null;
        return document.querySelector(`[data-x="${x}"][data-y="${y}"]`);
    }

    onTileClick(x, y) {
        this.log(`🎯 Clicked tile (${x}, ${y})`, 'info');
        
        // Quick action: move hero to clicked position
        if (this.gameState && this.gameState.heroes && this.gameState.heroes.length > 0) {
            const hero = this.gameState.heroes[0];
            const script = `MOV(${hero.name}, @${x},${y})`;
            document.getElementById('scriptInput').value = script;
        }
    }

    async collapseState(psiId) {
        const script = `†${psiId}`;
        document.getElementById('scriptInput').value = script;
        await this.executeScript();
    }

    // ============================================
    // LOGGING
    // ============================================

    log(message, type = 'info') {
        const logArea = document.getElementById('logArea');
        const timestamp = new Date().toLocaleTimeString();
        
        const logEntry = document.createElement('div');
        logEntry.className = `log-entry ${type}`;
        logEntry.textContent = `[${timestamp}] ${message}`;
        
        logArea.appendChild(logEntry);
        logArea.scrollTop = logArea.scrollHeight;
        
        // Keep only last 50 log entries
        while (logArea.children.length > 50) {
            logArea.removeChild(logArea.firstChild);
        }
    }

    // ============================================
    // PERIODIC UPDATES
    // ============================================

    startPeriodicUpdates() {
        // Check connection every 10 seconds
        setInterval(() => {
            this.checkConnection();
        }, 10000);

        // Refresh game state every 5 seconds if we have an active game
        setInterval(() => {
            if (this.currentGameId && this.isConnected) {
                this.refreshGameState();
            }
        }, 5000);
    }
}

// ============================================
// GLOBAL FUNCTIONS
// ============================================

// Global instance
let engine;

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    engine = new TemporalEngine();
});

// Global functions for HTML onclick handlers
function createNewGame() {
    engine.createNewGame();
}

function runDemo() {
    engine.runDemo();
}

function executeScript() {
    engine.executeScript();
}

// Handle Enter key in script input
document.addEventListener('DOMContentLoaded', () => {
    const scriptInput = document.getElementById('scriptInput');
    if (scriptInput) {
        scriptInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && e.ctrlKey) {
                e.preventDefault();
                executeScript();
            }
        });
    }
});

// Export for debugging
window.TemporalEngine = TemporalEngine;