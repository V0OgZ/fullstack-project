class ScenarioLoader {
    constructor(visualizer) {
        this.visualizer = visualizer;
        this.scenarios = new Map();
        this.loadBuiltInScenarios();
    }

    loadBuiltInScenarios() {
        // L'Éclat des Mondes Dissolus
        this.scenarios.set('eclat_mondes_dissolus', {
            id: 'eclat_mondes_dissolus',
            name: 'L\'Éclat des Mondes Dissolus',
            description: 'Affrontement épique entre Lysandrel et Nyx-Lua',
            players: [
                {
                    name: 'Lysandrel',
                    title: 'Le Forgeron de Réalité',
                    color: '#gold'
                },
                {
                    name: 'Nyx-Lua',
                    title: 'Tisseuse de Mondes Latents',
                    color: '#purple'
                }
            ],
            turns: [
                {
                    phase: 'SETUP',
                    turn: 1,
                    player: 'Lysandrel',
                    action: 'CREATE(CREATURE, PhoenixQuantique, @11,3)',
                    description: 'Déploie le Phénix Quantique vers l\'est'
                },
                {
                    phase: 'SETUP',
                    turn: 2,
                    player: 'Nyx-Lua',
                    action: 'USE(ITEM, infinity_codex, HERO:Nyx-Lua)',
                    description: 'Observe les futurs possibles avec le Codex'
                },
                {
                    phase: 'SETUP',
                    turn: 3,
                    player: 'Nyx-Lua',
                    action: 'ψ001: (0.8+0.6i) ⊙(Δt+5 @5,2 ⟶ MOV(Nyx-Lua, @5,2))',
                    description: 'Active une timeline Schrödinger cachée'
                },
                {
                    phase: 'PREMIERS_ECLATS',
                    turn: 6,
                    player: 'Lysandrel',
                    action: 'ψ002: (0.95+0.0i) ⊙(Δt+3 @8,10 ⟶ CREATE(BUILDING, Fortress, @8,10))',
                    description: 'Utilise la Lame d\'Avant-Monde sur zone non-jouée'
                },
                {
                    phase: 'PREMIERS_ECLATS',
                    turn: 9,
                    player: 'Lysandrel',
                    action: '†ψ001',
                    description: 'Active l\'Œil de Wigner, effondre une timeline'
                },
                {
                    phase: 'BASCULE_POUVOIR',
                    turn: 13,
                    player: 'Lysandrel',
                    action: 'BUILD(ANCHOR, RealityAnchor, @7,6, lysandrel)',
                    description: 'Installe une Ancre de Réalité au Nexus central'
                },
                {
                    phase: 'GUERRE_MONDES',
                    turn: 17,
                    player: 'Nyx-Lua',
                    action: 'ψ003: (0.7+0.7i) ⊙(Δt+2 @9,10 ⟶ MOV(Nyx-Lua, @9,10))',
                    description: 'Joue deux timelines simultanément'
                },
                {
                    phase: 'COLLAPSE_FINAL',
                    turn: 25,
                    player: 'System',
                    action: 'QUANTUM_ANALYSIS(all_timelines)',
                    description: 'Résolution quantique finale - Lysandrel gagne'
                }
            ]
        });
    }

    getScenarios() {
        return Array.from(this.scenarios.values());
    }

    getScenario(id) {
        return this.scenarios.get(id);
    }

    async loadScenario(scenarioId) {
        const scenario = this.scenarios.get(scenarioId);
        if (!scenario) {
            throw new Error(`Scenario not found: ${scenarioId}`);
        }

        try {
            // Créer une nouvelle partie pour le scénario
            const gameResponse = await fetch(`${this.visualizer.baseUrl}/games`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    gameName: scenario.name,
                    playerId: 'scenario_player',
                    maxPlayers: 2,
                    scenarioId: scenarioId
                })
            });

            if (!gameResponse.ok) {
                throw new Error('Failed to create scenario game');
            }

            const gameResult = await gameResponse.json();
            
            if (!gameResult.success) {
                throw new Error(gameResult.error || 'Failed to create scenario game');
            }

            // Initialiser le scénario
            await this.initializeScenario(gameResult.gameId, scenario);

            return {
                gameId: gameResult.gameId,
                scenario: scenario,
                success: true
            };

        } catch (error) {
            console.error('Error loading scenario:', error);
            throw error;
        }
    }

    async initializeScenario(gameId, scenario) {
        // Créer les héros
        for (const player of scenario.players) {
            await this.executeCommand(gameId, `HERO(${player.name})`);
        }

        // Exécuter les actions de setup
        const setupActions = scenario.turns.filter(turn => turn.phase === 'SETUP');
        for (const action of setupActions) {
            await this.executeCommand(gameId, action.action);
        }
    }

    async executeCommand(gameId, command) {
        try {
            const response = await fetch(`${this.visualizer.baseUrl}/games/${gameId}/script`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ script: command })
            });

            const result = await response.json();
            return result;
        } catch (error) {
            console.error('Error executing command:', error);
            return { success: false, error: error.message };
        }
    }

    async playScenarioTurn(gameId, turnNumber) {
        const scenario = this.getCurrentScenario();
        if (!scenario) return;

        const turn = scenario.turns.find(t => t.turn === turnNumber);
        if (!turn) return;

        const result = await this.executeCommand(gameId, turn.action);
        
        // Notifier le visualisateur
        this.visualizer.logSuccess(`Tour ${turnNumber}: ${turn.description}`);
        
        if (result.success) {
            this.visualizer.logSuccess(`✓ ${turn.action}`);
        } else {
            this.visualizer.logError(`✗ ${turn.action}: ${result.error}`);
        }

        return result;
    }

    getCurrentScenario() {
        return this.currentScenario;
    }

    setCurrentScenario(scenario) {
        this.currentScenario = scenario;
    }

    createScenarioUI() {
        const scenarioPanel = document.createElement('div');
        scenarioPanel.className = 'scenario-panel';
        scenarioPanel.innerHTML = `
            <h3>📚 Scénarios</h3>
            <select id="scenarioSelect">
                <option value="">Sélectionner un scénario...</option>
                ${this.getScenarios().map(scenario => 
                    `<option value="${scenario.id}">${scenario.name}</option>`
                ).join('')}
            </select>
            <button id="loadScenario">Charger Scénario</button>
            <div id="scenarioInfo"></div>
            <div id="scenarioControls" style="display: none;">
                <h4>Contrôles du Scénario</h4>
                <div class="turn-controls">
                    <button id="playTurn">Jouer Tour</button>
                    <button id="autoPlay">Lecture Auto</button>
                    <button id="resetScenario">Reset</button>
                </div>
                <div id="currentTurn">Tour: 1</div>
                <div id="currentPhase">Phase: SETUP</div>
            </div>
        `;

        // Ajouter les event listeners
        scenarioPanel.querySelector('#loadScenario').addEventListener('click', () => {
            this.loadSelectedScenario();
        });

        scenarioPanel.querySelector('#scenarioSelect').addEventListener('change', (e) => {
            this.displayScenarioInfo(e.target.value);
        });

        return scenarioPanel;
    }

    displayScenarioInfo(scenarioId) {
        const scenario = this.getScenario(scenarioId);
        const infoDiv = document.getElementById('scenarioInfo');
        
        if (!scenario) {
            infoDiv.innerHTML = '';
            return;
        }

        infoDiv.innerHTML = `
            <div class="scenario-info">
                <h4>${scenario.name}</h4>
                <p>${scenario.description}</p>
                <div class="players">
                    <h5>Joueurs:</h5>
                    ${scenario.players.map(player => 
                        `<div class="player-info">
                            <strong>${player.name}</strong> - ${player.title}
                        </div>`
                    ).join('')}
                </div>
                <div class="phases">
                    <h5>Phases:</h5>
                    <div class="phase-list">
                        ${['SETUP', 'PREMIERS_ECLATS', 'BASCULE_POUVOIR', 'GUERRE_MONDES', 'COLLAPSE_FINAL'].map(phase => 
                            `<span class="phase-badge">${phase}</span>`
                        ).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    async loadSelectedScenario() {
        const scenarioId = document.getElementById('scenarioSelect').value;
        if (!scenarioId) return;

        try {
            this.visualizer.logSuccess('Chargement du scénario...');
            
            const result = await this.loadScenario(scenarioId);
            
            if (result.success) {
                this.setCurrentScenario(result.scenario);
                this.visualizer.currentGameId = result.gameId;
                this.visualizer.logSuccess(`Scénario chargé: ${result.scenario.name}`);
                
                // Afficher les contrôles
                document.getElementById('scenarioControls').style.display = 'block';
                
                // Charger l'état initial
                await this.visualizer.loadGameState();
                
                // Initialiser les contrôles de tour
                this.initializeTurnControls();
                
            } else {
                this.visualizer.logError('Échec du chargement du scénario');
            }
        } catch (error) {
            this.visualizer.logError('Erreur: ' + error.message);
        }
    }

    initializeTurnControls() {
        let currentTurn = 1;
        
        document.getElementById('playTurn').addEventListener('click', async () => {
            await this.playScenarioTurn(this.visualizer.currentGameId, currentTurn);
            currentTurn++;
            this.updateTurnDisplay(currentTurn);
        });

        document.getElementById('autoPlay').addEventListener('click', () => {
            this.startAutoPlay(currentTurn);
        });

        document.getElementById('resetScenario').addEventListener('click', () => {
            this.resetScenario();
        });
    }

    updateTurnDisplay(turn) {
        document.getElementById('currentTurn').textContent = `Tour: ${turn}`;
        
        const scenario = this.getCurrentScenario();
        if (scenario) {
            const turnData = scenario.turns.find(t => t.turn === turn);
            if (turnData) {
                document.getElementById('currentPhase').textContent = `Phase: ${turnData.phase}`;
            }
        }
    }

    async startAutoPlay(startTurn) {
        const scenario = this.getCurrentScenario();
        if (!scenario) return;

        this.visualizer.logSuccess('Lecture automatique démarrée...');
        
        const turns = scenario.turns.filter(t => t.turn >= startTurn).sort((a, b) => a.turn - b.turn);
        
        for (const turn of turns) {
            await this.playScenarioTurn(this.visualizer.currentGameId, turn.turn);
            this.updateTurnDisplay(turn.turn + 1);
            
            // Attendre entre les tours
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
        
        this.visualizer.logSuccess('Scénario terminé!');
    }

    resetScenario() {
        this.currentScenario = null;
        this.visualizer.currentGameId = null;
        document.getElementById('scenarioControls').style.display = 'none';
        document.getElementById('scenarioInfo').innerHTML = '';
        document.getElementById('scenarioSelect').value = '';
        this.visualizer.logSuccess('Scénario réinitialisé');
    }
}

// Styles CSS pour les scénarios
const scenarioStyles = `
.scenario-panel {
    background: rgba(255,255,255,0.1);
    border-radius: 15px;
    padding: 20px;
    margin-bottom: 20px;
}

.scenario-info {
    margin-top: 15px;
}

.player-info {
    margin: 5px 0;
    padding: 5px;
    background: rgba(255,255,255,0.05);
    border-radius: 5px;
}

.phase-list {
    display: flex;
    gap: 5px;
    flex-wrap: wrap;
    margin-top: 5px;
}

.phase-badge {
    background: rgba(0,255,136,0.2);
    border: 1px solid rgba(0,255,136,0.5);
    border-radius: 15px;
    padding: 3px 8px;
    font-size: 0.8em;
}

.turn-controls {
    display: flex;
    gap: 10px;
    margin-bottom: 10px;
}

.turn-controls button {
    padding: 8px 16px;
    background: rgba(0,255,136,0.2);
    border: 1px solid rgba(0,255,136,0.5);
    border-radius: 15px;
    color: white;
    cursor: pointer;
    font-size: 0.9em;
}

.turn-controls button:hover {
    background: rgba(0,255,136,0.3);
}

#currentTurn, #currentPhase {
    font-weight: bold;
    margin: 5px 0;
    color: #00ff88;
}
`;

// Injecter les styles
const styleElement = document.createElement('style');
styleElement.textContent = scenarioStyles;
document.head.appendChild(styleElement); 