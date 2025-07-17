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
        this.loadingScreen = null;
        this.loadingStatus = null;
        this.mainInterface = null;
        this.temporalConfig = {
            maxPsiStates: 10,
            maxTimelines: 5,
            turnTime: 120,
            mapSize: 'medium',
            difficulty: 'normal',
            enableTemporalArtifacts: true,
            enableMultipleTimelines: true,
            enablePhantomBattles: true,
            enableQuantumSuperposition: true,
            enableDebugMode: false,
            enableSpectatorMode: false,
            enableAutoSave: false,
            enableVisualEffects: true,
            selectedScenario: 'temporal-conquest'
        };
        
        this.initializeLoadingScreen();
        this.initializeTemporalConfig();
        this.init();
    }

    // ============================================
    // TEMPORAL CONFIGURATION MANAGEMENT
    // ============================================

    initializeTemporalConfig() {
        // Initialize range inputs with real-time updates
        ['maxPsiStates', 'maxTimelines', 'turnTime'].forEach(id => {
            const input = document.getElementById(id);
            const valueSpan = document.getElementById(id + 'Value');
            
            if (input && valueSpan) {
                input.addEventListener('input', (e) => {
                    valueSpan.textContent = e.target.value;
                    this.temporalConfig[id] = parseInt(e.target.value);
                });
            }
        });

        // Initialize scenario selection
        this.initializeScenarioSelection();
    }

    initializeScenarioSelection() {
        const scenarioCards = document.querySelectorAll('.scenario-card');
        scenarioCards.forEach(card => {
            card.addEventListener('click', () => {
                // Remove selected class from all cards
                scenarioCards.forEach(c => c.classList.remove('selected'));
                // Add selected class to clicked card
                card.classList.add('selected');
                // Update config
                this.temporalConfig.selectedScenario = card.dataset.scenario;
                this.log(`Scenario selected: ${card.dataset.scenario}`, 'info');
            });
        });
    }

    openTemporalConfig() {
        const menu = document.getElementById('temporalConfigMenu');
        menu.classList.add('active');
        this.log('Temporal Configuration Menu opened', 'info');
    }

    closeTemporalConfig() {
        const menu = document.getElementById('temporalConfigMenu');
        menu.classList.remove('active');
        this.log('Temporal Configuration Menu closed', 'info');
    }

    async startQuantumGame() {
        this.log('Starting quantum game with custom configuration...', 'info');
        
        try {
            // Collect all configuration values
            this.collectConfigurationValues();
            
            // Create game with custom settings
            const response = await fetch(`${this.baseUrl}/api/temporal/games`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    gameName: `Quantum Game - ${this.temporalConfig.selectedScenario}`,
                    playerId: 'quantum-player',
                    settings: this.temporalConfig
                })
            });

            const data = await response.json();
            
            if (data.success) {
                this.currentGameId = data.gameId;
                this.log(`Quantum game created: ID ${data.gameId}`, 'success');
                
                // Initialize game based on selected scenario
                await this.initializeScenario(this.temporalConfig.selectedScenario);
                
                this.closeTemporalConfig();
                await this.refreshGameState();
            } else {
                this.log(`Failed to create quantum game: ${data.error}`, 'error');
            }
        } catch (error) {
            this.log(`Error starting quantum game: ${error.message}`, 'error');
        }
    }

    async runQuantumDemo() {
        this.log('Running quantum temporal demonstration...', 'info');
        
        try {
            // Use the demo endpoint with enhanced scripts
            const response = await fetch(`${this.baseUrl}/api/temporal/demo/create-sample-game`, {
                method: 'POST'
            });

            const data = await response.json();
            
            if (data.success) {
                this.currentGameId = data.gameId;
                this.log('Quantum demonstration completed successfully!', 'success');
                this.log(`Demo game ID: ${data.gameId}`, 'info');
                
                // Show demo results
                if (data.scriptResults) {
                    this.log('Demo script results:', 'info');
                    Object.entries(data.scriptResults).forEach(([key, result]) => {
                        if (result.success) {
                            this.log(`${key}: ${result.message}`, 'success');
                        } else {
                            this.log(`${key}: ${result.error}`, 'error');
                        }
                    });
                }
                
                this.closeTemporalConfig();
                await this.refreshGameState();
            } else {
                this.log(`Demo failed: ${data.error}`, 'error');
            }
        } catch (error) {
            this.log(`Error running quantum demo: ${error.message}`, 'error');
        }
    }

    collectConfigurationValues() {
        // Collect all form values
        const elements = {
            maxPsiStates: document.getElementById('maxPsiStates'),
            maxTimelines: document.getElementById('maxTimelines'), 
            turnTime: document.getElementById('turnTime'),
            mapSize: document.getElementById('mapSize'),
            difficulty: document.getElementById('difficulty'),
            enableTemporalArtifacts: document.getElementById('enableTemporalArtifacts'),
            enableMultipleTimelines: document.getElementById('enableMultipleTimelines'),
            enablePhantomBattles: document.getElementById('enablePhantomBattles'),
            enableQuantumSuperposition: document.getElementById('enableQuantumSuperposition'),
            enableDebugMode: document.getElementById('enableDebugMode'),
            enableSpectatorMode: document.getElementById('enableSpectatorMode'),
            enableAutoSave: document.getElementById('enableAutoSave'),
            enableVisualEffects: document.getElementById('enableVisualEffects')
        };

        Object.entries(elements).forEach(([key, element]) => {
            if (element) {
                if (element.type === 'checkbox') {
                    this.temporalConfig[key] = element.checked;
                } else if (element.type === 'range') {
                    this.temporalConfig[key] = parseInt(element.value);
                } else {
                    this.temporalConfig[key] = element.value;
                }
            }
        });

        this.log('Configuration collected:', 'info');
        this.log(JSON.stringify(this.temporalConfig, null, 2), 'info');
    }

    async initializeScenario(scenarioType) {
        this.log(`Initializing scenario: ${scenarioType}`, 'info');
        
        const scenarios = {
            'classic': this.initializeClassicScenario,
            'quantum-chaos': this.initializeQuantumChaosScenario,
            'temporal-conquest': this.initializeTemporalConquestScenario,
            'artifact-hunt': this.initializeArtifactHuntScenario
        };

        if (scenarios[scenarioType]) {
            await scenarios[scenarioType].call(this);
        } else {
            this.log(`Unknown scenario type: ${scenarioType}`, 'error');
        }
    }

    async initializeClassicScenario() {
        const scripts = [
            'HERO(Arthur)',
            'HERO(Ragnar)',
            'MOV(Arthur, @10,10)',
            'MOV(Ragnar, @15,15)',
            'ψ001: ⊙(Δt+2 @12,12 ⟶ CREATE(CREATURE, Dragon, @12,12))'
        ];

        await this.executeScriptSequence(scripts);
    }

    async initializeQuantumChaosScenario() {
        const scripts = [
            'HERO(Arthur)',
            'HERO(Ragnar)',
            'HERO(Merlin)',
            'CREATE(ITEM, AvantWorldBlade, HERO:Arthur)',
            'CREATE(ITEM, ReverseClock, HERO:Ragnar)',
            'CREATE(ITEM, ApocalypseHorn, HERO:Merlin)',
            'ψ001: ⊙(Δt+1 @10,10 ⟶ MOV(HERO, Arthur, @10,10))',
            'ψ002: ⊙(Δt+1 @10,10 ⟶ MOV(HERO, Ragnar, @10,10))',
            'ψ003: ⊙(Δt+2 @12,12 ⟶ CREATE(CREATURE, Dragon, @12,12))',
            'ψ004: ⊙(Δt+2 @12,12 ⟶ CREATE(CREATURE, Phoenix, @12,12))',
            'Π(Dragon spawns @12,12) ⇒ †ψ004'
        ];

        await this.executeScriptSequence(scripts);
    }

    async initializeTemporalConquestScenario() {
        const scripts = [
            'HERO(Arthur)',
            'HERO(Ragnar)',
            'CREATE(ITEM, AnchorTower, HERO:Arthur)',
            'MOV(Arthur, @12,12)',
            'MOV(Ragnar, @18,18)',
            'ψ001: ⊙(Δt+2 @15,15 ⟶ CREATE(STRUCTURE, Castle, @15,15))',
            'ψ002: ⊙(Δt+3 @15,15 ⟶ BATTLE(HERO Arthur, HERO Ragnar))',
            'USE(ITEM, AnchorTower, @15,15)'
        ];

        await this.executeScriptSequence(scripts);
    }

    async initializeArtifactHuntScenario() {
        const scripts = [
            'HERO(Arthur)',
            'HERO(Ragnar)',
            'HERO(Merlin)',
            'CREATE(ITEM, AvantWorldBlade, @8,8)',
            'CREATE(ITEM, ReverseClock, @12,12)',
            'CREATE(ITEM, ApocalypseHorn, @16,16)',
            'ψ001: ⊙(Δt+1 @8,8 ⟶ MOV(HERO, Arthur, @8,8))',
            'ψ002: ⊙(Δt+1 @12,12 ⟶ MOV(HERO, Ragnar, @12,12))',
            'ψ003: ⊙(Δt+1 @16,16 ⟶ MOV(HERO, Merlin, @16,16))',
            'Π(Arthur reaches @8,8) ⇒ USE(ITEM, AvantWorldBlade, HERO:Arthur)'
        ];

        await this.executeScriptSequence(scripts);
    }

    async executeScriptSequence(scripts) {
        for (const script of scripts) {
            try {
                await this.executeScriptCommand(script);
                await this.delay(200); // Small delay between commands
            } catch (error) {
                this.log(`Error executing script: ${script} - ${error.message}`, 'error');
            }
        }
    }

    async executeScriptCommand(script) {
        const response = await fetch(`${this.baseUrl}/api/temporal/games/${this.currentGameId}/script`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ script })
        });

        const data = await response.json();
        
        if (data.success) {
            this.log(`Script executed: ${script}`, 'success');
        } else {
            this.log(`Script failed: ${script} - ${data.error}`, 'error');
        }
        
        return data;
    }

    // ============================================
    // LOADING SCREEN MANAGEMENT
    // ============================================

    initializeLoadingScreen() {
        this.loadingScreen = document.getElementById('loadingScreen');
        this.loadingStatus = document.querySelector('.loading-status');
        this.mainInterface = document.getElementById('mainInterface');
        
        // Create particle effects
        this.createParticles();
        
        this.updateLoadingStatus('Initializing temporal matrix...');
    }

    createParticles() {
        const particlesContainer = document.getElementById('particles');
        if (!particlesContainer) return;
        
        // Create 30 particles
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 8 + 's';
            particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
            particlesContainer.appendChild(particle);
        }
    }

    updateLoadingStatus(message) {
        if (this.loadingStatus) {
            this.loadingStatus.textContent = message;
        }
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async hideLoadingScreen() {
        return new Promise((resolve) => {
            if (this.loadingScreen) {
                this.loadingScreen.classList.add('hidden');
                this.mainInterface.classList.add('visible');
                
                // Wait for transition to complete
                setTimeout(() => {
                    this.loadingScreen.style.display = 'none';
                    resolve();
                }, 1000);
            } else {
                resolve();
            }
        });
    }

    // ============================================
    // BACKEND CONNECTION
    // ============================================

    async checkConnection() {
        try {
            const response = await fetch(`${this.baseUrl}/api/temporal/health`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                const data = await response.json();
                this.isConnected = true;
                this.updateConnectionStatus(true);
                this.log(`Connected to temporal engine: ${data.service} v${data.version}`, 'success');
                return true;
            } else {
                throw new Error(`HTTP ${response.status}`);
            }
        } catch (error) {
            this.isConnected = false;
            this.updateConnectionStatus(false);
            this.log(`Connection failed: ${error.message}`, 'error');
            return false;
        }
    }

    updateConnectionStatus(isConnected) {
        const statusDot = document.getElementById('statusDot');
        const statusText = document.getElementById('statusText');
        
        if (statusDot && statusText) {
            if (isConnected) {
                statusDot.style.background = '#27ae60';
                statusText.textContent = 'Connected';
            } else {
                statusDot.style.background = '#e74c3c';
                statusText.textContent = 'Disconnected';
            }
        }
    }

    // ============================================
    // GAME MANAGEMENT
    // ============================================

    async createNewGame() {
        if (!this.isConnected) {
            this.log('Cannot create game: Not connected to backend', 'error');
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
                this.log(`New game created: ID ${data.gameId}`, 'success');
                this.updateGameInfo();
                await this.refreshGameState();
            } else {
                this.log(`Failed to create game: ${data.error}`, 'error');
            }
        } catch (error) {
            this.log(`Error creating game: ${error.message}`, 'error');
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
            this.log(`Error refreshing game state: ${error.message}`, 'error');
        }
    }

    updateGameInfo() {
        if (!this.gameState) return;

        const elements = {
            gameId: document.getElementById('gameId'),
            currentTurn: document.getElementById('currentTurn'),
            heroCount: document.getElementById('heroCount')
        };

        if (elements.gameId) elements.gameId.textContent = this.gameState.gameId || '-';
        if (elements.currentTurn) elements.currentTurn.textContent = this.gameState.turnCount || '0';
        if (elements.heroCount) elements.heroCount.textContent = this.gameState.players?.length || '0';
    }

    async executeScript() {
        const scriptInput = document.getElementById('scriptInput');
        const script = scriptInput.value.trim();
        
        if (!script) {
            this.log('No script provided', 'error');
            return;
        }

        if (!this.currentGameId) {
            this.log('No active game. Create a game first.', 'error');
            return;
        }

        try {
            const response = await fetch(`${this.baseUrl}/api/game/${this.currentGameId}/script`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ script })
            });

            const data = await response.json();
            
            if (data.success) {
                this.log(`Script executed: ${script}`, 'success');
                this.log(`Result: ${JSON.stringify(data.result)}`, 'info');
                scriptInput.value = '';
                await this.refreshGameState();
            } else {
                this.log(`Script failed: ${data.error}`, 'error');
            }
        } catch (error) {
            this.log(`Error executing script: ${error.message}`, 'error');
        }
    }

    async runDemo() {
        if (!this.isConnected) {
            this.log('Cannot run demo: Not connected to backend', 'error');
            return;
        }

        try {
            this.log('Running temporal engine demo...', 'info');
            
            const response = await fetch(`${this.baseUrl}/api/game/demo`, {
                method: 'POST'
            });

            const data = await response.json();
            
            if (data.success) {
                this.currentGameId = data.gameId;
                this.log('Demo completed successfully!', 'success');
                this.log(`Demo game ID: ${data.gameId}`, 'info');
                
                if (data.collapseResult) {
                    this.log(`Collapse result: ${JSON.stringify(data.collapseResult)}`, 'info');
                }
                
                await this.refreshGameState();
            } else {
                this.log(`Demo failed: ${data.error}`, 'error');
            }
        } catch (error) {
            this.log(`Error running demo: ${error.message}`, 'error');
        }
    }

    // ============================================
    // UI UPDATES
    // ============================================

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

    onTileClick(x, y) {
        this.log(`Tile clicked: (${x}, ${y})`, 'info');
        
        // Add visual feedback
        const tile = document.querySelector(`[data-x="${x}"][data-y="${y}"]`);
        if (tile) {
            tile.style.background = 'rgba(243, 156, 18, 0.8)';
            setTimeout(() => {
                tile.style.background = '';
            }, 500);
        }
    }

    updateGameBoard() {
        // Clear existing tile states
        const tiles = document.querySelectorAll('.tile');
        tiles.forEach(tile => {
            tile.classList.remove('has-hero', 'has-psi-state');
        });

        // Update based on game state
        if (this.gameState && this.gameState.heroes) {
            this.gameState.heroes.forEach(hero => {
                const tile = document.querySelector(`[data-x="${hero.positionX}"][data-y="${hero.positionY}"]`);
                if (tile) {
                    tile.classList.add('has-hero');
                    tile.title = `(${hero.positionX}, ${hero.positionY}) - ${hero.name}`;
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

    async collapseState(psiId) {
        if (!this.currentGameId) {
            this.log('No active game', 'error');
            return;
        }

        try {
            const response = await fetch(`${this.baseUrl}/api/game/${this.currentGameId}/script`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ script: `†${psiId}` })
            });

            const data = await response.json();
            
            if (data.success) {
                this.log(`ψ-state collapsed: ${psiId}`, 'success');
                await this.refreshGameState();
            } else {
                this.log(`Failed to collapse ψ-state: ${data.error}`, 'error');
            }
        } catch (error) {
            this.log(`Error collapsing ψ-state: ${error.message}`, 'error');
        }
    }

    // ============================================
    // LOGGING
    // ============================================

    log(message, type = 'info') {
        const logArea = document.getElementById('logArea');
        if (!logArea) return;

        const timestamp = new Date().toLocaleTimeString();
        const logEntry = document.createElement('div');
        logEntry.className = `log-entry ${type}`;
        logEntry.textContent = `[${timestamp}] ${message}`;
        
        logArea.appendChild(logEntry);
        logArea.scrollTop = logArea.scrollHeight;

        // Keep only last 50 entries
        while (logArea.children.length > 50) {
            logArea.removeChild(logArea.firstChild);
        }
    }

    // ============================================
    // PERIODIC UPDATES
    // ============================================

    startPeriodicUpdates() {
        // Update every 5 seconds
        this.updateInterval = setInterval(() => {
            this.checkConnection();
            if (this.currentGameId) {
                this.refreshGameState();
            }
        }, 5000);
    }

    stopPeriodicUpdates() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
            this.updateInterval = null;
        }
    }

    // ============================================
    // INITIALIZATION
    // ============================================

    async init() {
        console.log('Initializing Temporal Engine Interface...');
        
        // Step 1: Initialize UI components
        this.updateLoadingStatus('Activating quantum interface...');
        await this.delay(800);
        this.createGameBoard();
        
        // Step 2: Check backend connection
        this.updateLoadingStatus('Establishing temporal link...');
        await this.delay(600);
        const connected = await this.checkConnection();
        
        if (!connected) {
            this.updateLoadingStatus('Temporal rift detected - Running offline mode');
            await this.delay(1200);
        } else {
            this.updateLoadingStatus('Temporal engine synchronized');
            await this.delay(400);
        }
        
        // Step 3: Initialize periodic updates
        this.updateLoadingStatus('Calibrating quantum state monitors...');
        await this.delay(500);
        this.startPeriodicUpdates();
        
        // Step 4: Final initialization
        this.updateLoadingStatus('Charging temporal capacitors...');
        await this.delay(600);
        
        // Step 5: Ready to launch
        this.updateLoadingStatus('Temporal engine ready - Entering quantum realm...');
        await this.delay(800);
        
        // Step 6: Hide loading screen and show main interface
        await this.hideLoadingScreen();
        
        this.log('Heroes of Time - Temporal Engine Interface Ready', 'success');
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

function openTemporalConfig() {
    engine.openTemporalConfig();
}

function closeTemporalConfig() {
    engine.closeTemporalConfig();
}

function startQuantumGame() {
    engine.startQuantumGame();
}

function runQuantumDemo() {
    engine.runQuantumDemo();
}