class QuantumVisualizer {
    constructor() {
        this.baseUrl = 'http://localhost:8080/api/temporal';
        this.currentGameId = null;
        this.refreshInterval = null;
        this.scenarioLoader = null;
        this.initializeEventListeners();
        this.loadGames();
        this.initializeScenarioLoader();
    }

    initializeScenarioLoader() {
        this.scenarioLoader = new ScenarioLoader(this);
        this.addScenarioPanel();
    }

    addScenarioPanel() {
        const leftPanel = document.querySelector('.left-panel');
        const scenarioPanel = this.scenarioLoader.createScenarioUI();
        leftPanel.insertBefore(scenarioPanel, leftPanel.firstChild);
    }

    initializeEventListeners() {
        document.getElementById('createGame').addEventListener('click', () => this.createGame());
        document.getElementById('loadGame').addEventListener('click', () => this.loadGame());
        document.getElementById('refreshState').addEventListener('click', () => this.refreshGameState());
        document.getElementById('executeCommand').addEventListener('click', () => this.executeCommand());
        document.getElementById('commandInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.executeCommand();
        });
        document.getElementById('gameSelect').addEventListener('change', (e) => {
            this.currentGameId = e.target.value;
            if (this.currentGameId) this.loadGameState();
        });
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
            this.updateScenarioStatus(gameState);
            
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
            <div class="hero-card ${this.getHeroClass(hero.name)}">
                <div class="hero-name">${hero.name}</div>
                <div class="hero-title">${this.getHeroTitle(hero.name)}</div>
                <div class="hero-position">Position: (${hero.position.x}, ${hero.position.y})</div>
                <div class="hero-timeline">Timeline: ${hero.timeline}</div>
                <div class="hero-health">Santé: ${hero.health}/${hero.maxHealth || hero.health}</div>
                <div class="hero-energy">Énergie: ${hero.temporalEnergy}</div>
                <div class="hero-equipment">
                    <strong>Équipement:</strong>
                    ${hero.inventory && hero.inventory.length > 0 ? 
                        hero.inventory.map(item => `<span class="item-badge">${item}</span>`).join(' ') : 
                        'Aucun'}
                </div>
            </div>
        `).join('');
    }

    getHeroClass(heroName) {
        if (heroName.includes('Lysandrel')) return 'hero-lysandrel';
        if (heroName.includes('Nyx')) return 'hero-nyx';
        return 'hero-default';
    }

    getHeroTitle(heroName) {
        if (heroName.includes('Lysandrel')) return 'Le Forgeron de Réalité';
        if (heroName.includes('Nyx')) return 'Tisseuse de Mondes Latents';
        return '';
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
                    <div>Héros: ${psi.ownerHero}</div>
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
                <div>Probabilité: ${zone.combinedProbability.toFixed(4)}</div>
                <div>Contraste: ${zone.contrast.toFixed(4)}</div>
                <div class="interference-description">
                    ${this.getInterferenceDescription(zone.type, zone.combinedProbability)}
                </div>
            </div>
        `).join('');
    }

    getInterferenceDescription(type, probability) {
        if (type === 'CONSTRUCTIVE') {
            return `⚡ Amplification ${(probability * 100).toFixed(1)}%`;
        } else if (type === 'DESTRUCTIVE') {
            return `💥 Annulation ${(100 - probability * 100).toFixed(1)}%`;
        } else {
            return '⚖️ Équilibre quantique';
        }
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
            
            // Hero-specific colors
            let color = `hsl(${index * 60}, 70%, 60%)`;
            if (psi.ownerHero && psi.ownerHero.includes('Lysandrel')) {
                color = '#ffd93d';
            } else if (psi.ownerHero && psi.ownerHero.includes('Nyx')) {
                color = '#9d4edd';
            }
            
            // Draw vector
            ctx.strokeStyle = color;
            ctx.fillStyle = color;
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

    updateScenarioStatus(gameState) {
        const scenario = this.scenarioLoader?.getCurrentScenario();
        if (!scenario) return;

        const currentTurn = gameState.currentTurn || 0;
        const scenarioTurn = scenario.turns.find(t => t.turn === currentTurn);
        
        if (scenarioTurn) {
            this.logSuccess(`📖 Tour ${currentTurn}: ${scenarioTurn.description}`);
        }
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
                this.logSuccess(`✓ ${result.message || 'Commande exécutée'}`);
                
                // Afficher les informations quantiques
                if (result.psiId) {
                    this.logSuccess(`🌀 État créé: ${result.psiId}`);
                }
                if (result.complexAmplitude) {
                    this.logSuccess(`📊 Amplitude: ${result.complexAmplitude}`);
                }
                if (result.interferenceType) {
                    this.logSuccess(`⚡ Interférence: ${result.interferenceType}`);
                }
                if (result.successModifier) {
                    this.logSuccess(`🎯 Modificateur: ${result.successModifier}x`);
                }
                
                this.loadGameState(); // Refresh state after command
            } else {
                this.logError(`✗ ${result.error || 'Commande échouée'}`);
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

        // Limiter le nombre de messages
        if (output.children.length > 100) {
            output.removeChild(output.firstChild);
        }
    }
}

// Initialize the visualizer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new QuantumVisualizer();
}); 