class QuantumVisualizer {
    constructor() {
        this.baseUrl = 'http://localhost:8080/api/temporal';
        this.currentGameId = null;
        this.refreshInterval = null;
        this.scenarioLoader = null;
        this.isAutoPlay = false;
        this.currentTurn = 1;
        this.initializeEventListeners();
        this.loadGames();
        this.initializeScenarioLoader();
        
        // Rendre les fonctions globales pour onclick
        window.toggleAutoPlay = () => this.toggleAutoPlay();
        window.pauseVisualization = () => this.pauseVisualization();
        window.nextTurn = () => this.nextTurn();
        window.resetVisualization = () => this.resetVisualization();
    }

    initializeEventListeners() {
        // Vérifier si les éléments existent avant d'ajouter les listeners
        const createGameBtn = document.getElementById('createGame');
        if (createGameBtn) {
            createGameBtn.addEventListener('click', () => this.createGame());
        }
        
        const loadGameBtn = document.getElementById('loadGame');
        if (loadGameBtn) {
            loadGameBtn.addEventListener('click', () => this.loadGame());
        }
        
        const refreshStateBtn = document.getElementById('refreshState');
        if (refreshStateBtn) {
            refreshStateBtn.addEventListener('click', () => this.refreshGameState());
        }
        
        const executeCommandBtn = document.getElementById('executeCommand');
        if (executeCommandBtn) {
            executeCommandBtn.addEventListener('click', () => this.executeCommand());
        }
        
        const commandInput = document.getElementById('commandInput');
        if (commandInput) {
            commandInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.executeCommand();
            });
        }
        
        const gameSelect = document.getElementById('gameSelect');
        if (gameSelect) {
            gameSelect.addEventListener('change', (e) => {
                this.currentGameId = e.target.value;
                if (this.currentGameId) this.loadGameState();
            });
        }
    }

    async loadGames() {
        try {
            const response = await fetch(`${this.baseUrl}/games`);
            const games = await response.json();
            
            const select = document.getElementById('gameSelect');
            select.innerHTML = '<option value="">Sélectionner une partie...</option>';
            
            games.forEach(game => {
                const option = document.createElement('option');
                option.value = game.id;
                option.textContent = `${game.gameName} (ID: ${game.id})`;
                select.appendChild(option);
            });
        } catch (error) {
            this.logError('Erreur lors du chargement des parties: ' + error.message);
        }
    }

    async createGame() {
        try {
            const response = await fetch(`${this.baseUrl}/games`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    gameName: `Quantum Game ${Date.now()}`,
                    playerId: 'visualizer'
                })
            });
            
            const result = await response.json();
            
            if (result.success) {
                this.currentGameId = result.gameId;
                this.logSuccess(`Partie créée: ${result.gameName} (ID: ${result.gameId})`);
                this.loadGames();
                this.loadGameState();
            } else {
                this.logError('Erreur lors de la création: ' + result.error);
            }
        } catch (error) {
            this.logError('Erreur réseau: ' + error.message);
        }
    }

    async loadGame() {
        const gameId = document.getElementById('gameSelect').value;
        if (!gameId) {
            this.logError('Veuillez sélectionner une partie');
            return;
        }
        
        this.currentGameId = gameId;
        this.loadGameState();
    }

    async loadGameState() {
        if (!this.currentGameId) return;
        
        try {
            const response = await fetch(`${this.baseUrl}/games/${this.currentGameId}/state`);
            const gameState = await response.json();
            
            this.updateGameInfo(gameState);
            this.updateHeroes(gameState.heroes || []);
            this.updatePsiStates(gameState.psiStates || []);
            this.updateQuantumMetrics(gameState.quantumAnalysis || {});
            this.updateInterferenceZones(gameState.quantumAnalysis?.interferenceZones || []);
            this.updateAmplitudeChart(gameState.psiStates || []);
            
            this.logSuccess('État du jeu mis à jour');
        } catch (error) {
            this.logError('Erreur lors du chargement: ' + error.message);
        }
    }

    updateGameInfo(gameState) {
        const gameInfo = document.getElementById('gameInfo');
        gameInfo.innerHTML = `
            <div class="game-detail">
                <strong>Partie:</strong> ${gameState.gameName || 'N/A'}
            </div>
            <div class="game-detail">
                <strong>ID:</strong> ${gameState.gameId || 'N/A'}
            </div>
            <div class="game-detail">
                <strong>Tour:</strong> ${gameState.currentTurn || 0}
            </div>
            <div class="game-detail">
                <strong>Timeline:</strong> ${gameState.currentTimeline || 'N/A'}
            </div>
            <div class="game-detail">
                <strong>Statut:</strong> ${gameState.status || 'N/A'}
            </div>
        `;
    }

    updateHeroes(heroes) {
        const heroList = document.getElementById('heroList');
        if (!heroes.length) {
            heroList.innerHTML = '<p>Aucun héros</p>';
            return;
        }

        heroList.innerHTML = heroes.map(hero => `
            <div class="hero-card">
                <div class="hero-name">${hero.name}</div>
                <div class="hero-position">Position: (${hero.position.x}, ${hero.position.y})</div>
                <div class="hero-timeline">Timeline: ${hero.timeline}</div>
                <div class="hero-health">Santé: ${hero.health}/${hero.maxHealth}</div>
                <div class="hero-energy">Énergie Temporelle: ${hero.temporalEnergy}</div>
            </div>
        `).join('');
    }

    updatePsiStates(psiStates) {
        const psiContainer = document.getElementById('psiStates');
        if (!psiStates.length) {
            psiContainer.innerHTML = '<p>Aucun état quantique actif</p>';
            return;
        }

        psiContainer.innerHTML = psiStates.map(psi => `
            <div class="psi-state ${psi.usingComplexAmplitude ? 'complex' : 'classic'}">
                <div class="psi-state-header">
                    <span class="psi-id">${psi.psiId}</span>
                    <span class="psi-status ${psi.status.toLowerCase()}">${psi.status}</span>
                </div>
                <div class="psi-expression">${psi.expression}</div>
                ${psi.usingComplexAmplitude ? `
                    <div class="amplitude-display">
                        <div class="complex-amplitude">Amplitude: ${psi.complexAmplitude}</div>
                        <div class="probability">Probabilité: ${psi.probability?.toFixed(4) || 'N/A'}</div>
                        <div>Phase: ${psi.phase?.toFixed(4) || 'N/A'} rad</div>
                        <div>Magnitude: ${psi.magnitude?.toFixed(4) || 'N/A'}</div>
                    </div>
                ` : `
                    <div class="amplitude-display">
                        <div class="probability">Probabilité: ${psi.probability?.toFixed(4) || 'N/A'}</div>
                    </div>
                `}
                ${psi.targetPosition ? `
                    <div class="psi-target">Position: (${psi.targetPosition.x}, ${psi.targetPosition.y})</div>
                ` : ''}
                <div class="psi-details">
                    <div>Action: ${psi.actionType}</div>
                    <div>ΔT: ${psi.deltaT}</div>
                    <div>Branche: ${psi.branch}</div>
                </div>
            </div>
        `).join('');
    }

    updateQuantumMetrics(quantumAnalysis) {
        document.getElementById('complexStates').textContent = quantumAnalysis.totalComplexStates || 0;
        document.getElementById('classicStates').textContent = quantumAnalysis.totalClassicStates || 0;
        document.getElementById('interferenceZones').textContent = quantumAnalysis.totalInterferenceZones || 0;
    }

    updateInterferenceZones(interferenceZones) {
        const container = document.getElementById('interferenceDisplay');
        if (!interferenceZones.length) {
            container.innerHTML = '<p>Aucune zone d\'interférence</p>';
            return;
        }

        container.innerHTML = interferenceZones.map(zone => `
            <div class="interference-zone">
                <div class="interference-type ${zone.type.toLowerCase()}">${zone.type}</div>
                <div>Position: (${zone.position.x}, ${zone.position.y})</div>
                <div>États: ${zone.stateCount}</div>
                <div>Probabilité Combinée: ${zone.combinedProbability.toFixed(4)}</div>
                <div>Contraste: ${zone.contrast.toFixed(4)}</div>
            </div>
        `).join('');
    }

    updateAmplitudeChart(psiStates) {
        const canvas = document.getElementById('amplitudeChart');
        const ctx = canvas.getContext('2d');
        
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        if (!psiStates.length) {
            ctx.fillStyle = 'rgba(255,255,255,0.5)';
            ctx.font = '14px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('Aucune donnée', canvas.width/2, canvas.height/2);
            return;
        }

        // Draw amplitude visualization
        const complexStates = psiStates.filter(psi => psi.usingComplexAmplitude);
        if (complexStates.length === 0) return;

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = Math.min(centerX, centerY) - 20;

        // Draw axes
        ctx.strokeStyle = 'rgba(255,255,255,0.3)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(20, centerY);
        ctx.lineTo(canvas.width - 20, centerY);
        ctx.moveTo(centerX, 20);
        ctx.lineTo(centerX, canvas.height - 20);
        ctx.stroke();

        // Draw unit circle
        ctx.strokeStyle = 'rgba(255,255,255,0.2)';
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.stroke();

        // Draw amplitude vectors
        complexStates.forEach((psi, index) => {
            const realPart = psi.realPart || 0;
            const imagPart = psi.imaginaryPart || 0;
            
            const x = centerX + realPart * radius;
            const y = centerY - imagPart * radius;
            
            // Draw vector
            ctx.strokeStyle = `hsl(${index * 60}, 70%, 60%)`;
            ctx.fillStyle = `hsl(${index * 60}, 70%, 60%)`;
            ctx.lineWidth = 2;
            
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(x, y);
            ctx.stroke();
            
            // Draw point
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, 2 * Math.PI);
            ctx.fill();
            
            // Draw label
            ctx.fillStyle = 'white';
            ctx.font = '10px Arial';
            ctx.fillText(psi.psiId, x + 8, y - 8);
        });

        // Draw labels
        ctx.fillStyle = 'rgba(255,255,255,0.7)';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Re', canvas.width - 15, centerY - 5);
        ctx.fillText('Im', centerX + 5, 15);
    }

    async executeCommand() {
        const input = document.getElementById('commandInput');
        const command = input.value.trim();
        
        if (!command) return;
        if (!this.currentGameId) {
            this.logError('Veuillez d\'abord charger une partie');
            return;
        }

        this.logInput(command);
        input.value = '';

        try {
            const response = await fetch(`${this.baseUrl}/games/${this.currentGameId}/script`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ script: command })
            });

            const result = await response.json();
            
            if (result.success) {
                this.logSuccess(`Succès: ${result.message || 'Commande exécutée'}`);
                if (result.psiId) {
                    this.logSuccess(`État créé: ${result.psiId}`);
                }
                if (result.complexAmplitude) {
                    this.logSuccess(`Amplitude: ${result.complexAmplitude}`);
                }
                if (result.interferenceType) {
                    this.logSuccess(`Interférence: ${result.interferenceType}`);
                }
                this.loadGameState(); // Refresh state after command
            } else {
                this.logError(`Erreur: ${result.error || 'Commande échouée'}`);
            }
        } catch (error) {
            this.logError('Erreur réseau: ' + error.message);
        }
    }

    refreshGameState() {
        if (this.currentGameId) {
            this.loadGameState();
        } else {
            this.logError('Aucune partie chargée');
        }
    }

    logInput(message) {
        this.addToConsole(message, 'command-input-line', '> ');
    }

    logSuccess(message) {
        this.addToConsole(message, 'command-success', '✓ ');
    }

    logError(message) {
        this.addToConsole(message, 'command-error', '✗ ');
    }

    addToConsole(message, className, prefix = '') {
        const output = document.getElementById('commandOutput');
        const div = document.createElement('div');
        div.className = `command-result ${className}`;
        div.textContent = prefix + message;
        output.appendChild(div);
        output.scrollTop = output.scrollHeight;
    }

    toggleAutoPlay() {
        this.isAutoPlay = !this.isAutoPlay;
        const playBtn = document.getElementById('play-btn');
        const pauseBtn = document.getElementById('pause-btn');
        
        if (this.isAutoPlay) {
            if (playBtn) playBtn.textContent = '⏸️ Pause';
            console.log('🎮 Auto-play activé');
            this.startAutoPlay();
        } else {
            if (playBtn) playBtn.textContent = '▶️ Lecture';
            console.log('🎮 Auto-play désactivé');
            this.stopAutoPlay();
        }
    }

    pauseVisualization() {
        this.isAutoPlay = false;
        const playBtn = document.getElementById('play-btn');
        if (playBtn) playBtn.textContent = '▶️ Lecture';
        console.log('⏸️ Visualisation en pause');
        this.stopAutoPlay();
    }

    nextTurn() {
        this.currentTurn++;
        const turnElement = document.getElementById('turn-number');
        if (turnElement) turnElement.textContent = this.currentTurn;
        console.log(`⏭️ Tour suivant: ${this.currentTurn}`);
        this.processNextTurn();
    }

    resetVisualization() {
        this.currentTurn = 1;
        this.isAutoPlay = false;
        const turnElement = document.getElementById('turn-number');
        if (turnElement) turnElement.textContent = this.currentTurn;
        const playBtn = document.getElementById('play-btn');
        if (playBtn) playBtn.textContent = '▶️ Lecture';
        console.log('🔄 Visualisation réinitialisée');
        this.resetGameState();
    }

    startAutoPlay() {
        if (this.refreshInterval) return;
        this.refreshInterval = setInterval(() => {
            if (this.isAutoPlay) {
                this.nextTurn();
            }
        }, 2000);
    }

    stopAutoPlay() {
        if (this.refreshInterval) {
            clearInterval(this.refreshInterval);
            this.refreshInterval = null;
        }
    }

    processNextTurn() {
        // Logique pour traiter le tour suivant
        this.updateGameState();
    }

    resetGameState() {
        // Logique pour réinitialiser l'état du jeu
        this.updateGameState();
    }

    updateGameState() {
        // Mettre à jour l'interface avec l'état actuel
        const phaseElement = document.getElementById('phase-indicator');
        if (phaseElement) {
            phaseElement.textContent = `Tour ${this.currentTurn} - Phase active`;
        }
    }
}

// Initialize the visualizer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new QuantumVisualizer();
}); 