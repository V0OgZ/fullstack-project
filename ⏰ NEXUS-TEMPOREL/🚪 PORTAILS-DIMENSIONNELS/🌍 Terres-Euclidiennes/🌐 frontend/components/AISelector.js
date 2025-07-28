// 🤖 INTERFACE DE SÉLECTION IA - Heroes of Time
// PRIORITÉ CRITIQUE : Interface IA manquante pour Alpha

class AISelector {
    constructor() {
        this.aiData = null;
        this.selectedDifficulty = 'MEDIUM';
        this.isVisible = false;
        this.gameId = null;
        this.aiStats = {};
        this.init();
    }
    
    async init() {
        await this.loadAIData();
        this.createAIUI();
        this.bindEvents();
        this.updateDisplay();
    }
    
    async loadAIData() {
        try {
            // Charger les données IA depuis l'API backend
            const response = await fetch(`http://localhost:8080/api/temporal/ai/players`);
            if (response.ok) {
                this.aiData = await response.json();
            } else {
                // Fallback avec données par défaut
                this.aiData = this.getDefaultAIData();
            }
        } catch (error) {
            console.log('Erreur chargement données IA, utilisation données par défaut:', error);
            this.aiData = this.getDefaultAIData();
        }
    }
    
    getDefaultAIData() {
        return {
            difficulties: [
                { id: 'EASY', name: 'Facile', description: 'IA basique pour débutants', color: '#00ff88' },
                { id: 'MEDIUM', name: 'Moyen', description: 'IA équilibrée', color: '#00bfff' },
                { id: 'HARD', name: 'Difficile', description: 'IA avancée', color: '#ff8800' },
                { id: 'EXPERT', name: 'Expert', description: 'IA experte', color: '#ff4400' },
                { id: 'PARADOX', name: 'Paradox', description: 'IA maximale Claudius-Memento', color: '#ff0088' }
            ],
            aiPlayers: [
                { id: 'claudius', name: 'Claudius', difficulty: 'PARADOX', avatar: '👑' },
                { id: 'memento', name: 'Memento', difficulty: 'EXPERT', avatar: '🧠' },
                { id: 'arthur', name: 'Arthur', difficulty: 'MEDIUM', avatar: '⚔️' },
                { id: 'merlin', name: 'Merlin', difficulty: 'HARD', avatar: '🔮' }
            ],
            stats: {
                gamesPlayed: 0,
                winRate: 0,
                averageTurns: 0,
                learningProgress: 0
            }
        };
    }
    
    async saveAIData() {
        try {
            const response = await fetch(`http://localhost:8080/api/temporal/ai/save`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.aiData)
            });
            
            if (response.ok) {
                console.log('✅ Données IA sauvegardées');
            } else {
                console.error('❌ Erreur sauvegarde IA');
            }
        } catch (error) {
            console.error('Erreur sauvegarde IA:', error);
        }
    }
    
    createAIUI() {
        // Créer le conteneur principal
        const aiContainer = document.createElement('div');
        aiContainer.id = 'ai-selector';
        aiContainer.className = 'ai-selector';
        aiContainer.style.display = 'none';
        
        aiContainer.innerHTML = `
            <div class="ai-header">
                <h2>🤖 Sélection IA</h2>
                <div class="ai-stats">
                    <span class="stat">Parties: <span id="games-played">0</span></span>
                    <span class="stat">Victoires: <span id="win-rate">0%</span></span>
                    <span class="stat">Tours moy: <span id="avg-turns">0</span></span>
                </div>
                <button class="close-ai-btn" onclick="aiSelector.hide()">×</button>
            </div>
            
            <div class="ai-content">
                <div class="difficulty-panel">
                    <h3>📊 Niveau de Difficulté</h3>
                    <div class="difficulty-grid" id="difficulty-grid">
                        <!-- Difficultés générées dynamiquement -->
                    </div>
                </div>
                
                <div class="ai-players-panel">
                    <h3>👥 IA Disponibles</h3>
                    <div class="ai-players-grid" id="ai-players-grid">
                        <!-- IA players générés dynamiquement -->
                    </div>
                </div>
                
                <div class="ai-controls">
                    <button class="ai-start-btn" onclick="aiSelector.startAIGame()">
                        🎮 Démarrer Partie IA
                    </button>
                    <button class="ai-training-btn" onclick="aiSelector.trainAI()">
                        🧠 Entraîner IA
                    </button>
                    <button class="ai-reset-btn" onclick="aiSelector.resetAIStats()">
                        🔄 Réinitialiser Stats
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(aiContainer);
        this.updateDifficultyGrid();
        this.updateAIPlayersGrid();
    }
    
    updateDifficultyGrid() {
        const grid = document.getElementById('difficulty-grid');
        if (!grid) return;
        
        grid.innerHTML = this.aiData.difficulties.map(diff => `
            <div class="difficulty-item ${this.selectedDifficulty === diff.id ? 'selected' : ''}" 
                 onclick="aiSelector.selectDifficulty('${diff.id}')">
                <div class="difficulty-icon">${this.getDifficultyIcon(diff.id)}</div>
                <div class="difficulty-name">${diff.name}</div>
                <div class="difficulty-desc">${diff.description}</div>
                <div class="difficulty-color" style="background: ${diff.color}"></div>
            </div>
        `).join('');
    }
    
    updateAIPlayersGrid() {
        const grid = document.getElementById('ai-players-grid');
        if (!grid) return;
        
        grid.innerHTML = this.aiData.aiPlayers.map(player => `
            <div class="ai-player-item" onclick="aiSelector.selectAIPlayer('${player.id}')">
                <div class="ai-avatar">${player.avatar}</div>
                <div class="ai-name">${player.name}</div>
                <div class="ai-difficulty" style="color: ${this.getDifficultyColor(player.difficulty)}">
                    ${this.getDifficultyName(player.difficulty)}
                </div>
                <div class="ai-stats">
                    <span class="ai-win-rate">${this.getAIWinRate(player.id)}%</span>
                </div>
            </div>
        `).join('');
    }
    
    getDifficultyIcon(difficulty) {
        const icons = {
            'EASY': '😊',
            'MEDIUM': '😐',
            'HARD': '😤',
            'EXPERT': '😈',
            'PARADOX': '🌀'
        };
        return icons[difficulty] || '❓';
    }
    
    getDifficultyColor(difficulty) {
        const colors = {
            'EASY': '#00ff88',
            'MEDIUM': '#00bfff',
            'HARD': '#ff8800',
            'EXPERT': '#ff4400',
            'PARADOX': '#ff0088'
        };
        return colors[difficulty] || '#ffffff';
    }
    
    getDifficultyName(difficulty) {
        const names = {
            'EASY': 'Facile',
            'MEDIUM': 'Moyen',
            'HARD': 'Difficile',
            'EXPERT': 'Expert',
            'PARADOX': 'Paradox'
        };
        return names[difficulty] || 'Inconnu';
    }
    
    getAIWinRate(playerId) {
        // Simuler des stats d'IA
        const rates = {
            'claudius': 95,
            'memento': 87,
            'arthur': 65,
            'merlin': 78
        };
        return rates[playerId] || 50;
    }
    
    bindEvents() {
        // Événements pour les contrôles IA
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isVisible) {
                this.hide();
            }
        });
    }
    
    show() {
        const aiSelector = document.getElementById('ai-selector');
        if (aiSelector) {
            aiSelector.style.display = 'block';
            this.isVisible = true;
            this.updateDisplay();
        }
    }
    
    hide() {
        const aiSelector = document.getElementById('ai-selector');
        if (aiSelector) {
            aiSelector.style.display = 'none';
            this.isVisible = false;
        }
    }
    
    toggle() {
        if (this.isVisible) {
            this.hide();
        } else {
            this.show();
        }
    }
    
    selectDifficulty(difficulty) {
        this.selectedDifficulty = difficulty;
        this.updateDifficultyGrid();
        this.updateDisplay();
        console.log(`🎯 Difficulté sélectionnée: ${difficulty}`);
    }
    
    selectAIPlayer(playerId) {
        const player = this.aiData.aiPlayers.find(p => p.id === playerId);
        if (player) {
            console.log(`🤖 IA sélectionnée: ${player.name} (${player.difficulty})`);
            this.selectedDifficulty = player.difficulty;
            this.updateDifficultyGrid();
        }
    }
    
    async startAIGame() {
        try {
            console.log(`🎮 Démarrage partie IA - Difficulté: ${this.selectedDifficulty}`);
            
            // Appel API pour démarrer une partie IA
            const response = await fetch(`http://localhost:8080/api/temporal/game/start-ai`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    difficulty: this.selectedDifficulty,
                    aiPlayer: this.getSelectedAIPlayer()
                })
            });
            
            if (response.ok) {
                const gameData = await response.json();
                this.gameId = gameData.gameId;
                console.log(`✅ Partie IA démarrée - ID: ${this.gameId}`);
                this.hide();
                
                // Démarrer l'interface de jeu
                if (window.gameInterface) {
                    window.gameInterface.startGame(gameData);
                }
            } else {
                console.error('❌ Erreur démarrage partie IA');
            }
        } catch (error) {
            console.error('Erreur démarrage partie IA:', error);
            // Fallback - démarrer en mode local
            this.startLocalAIGame();
        }
    }
    
    getSelectedAIPlayer() {
        // Retourner l'IA sélectionnée ou une IA par défaut
        return this.aiData.aiPlayers.find(p => p.difficulty === this.selectedDifficulty) || 
               this.aiData.aiPlayers[0];
    }
    
    startLocalAIGame() {
        console.log('🎮 Démarrage partie IA en mode local');
        // Simulation d'une partie IA locale
        this.gameId = 'local-ai-' + Date.now();
        
        // Créer des données de jeu simulées
        const gameData = {
            gameId: this.gameId,
            difficulty: this.selectedDifficulty,
            aiPlayer: this.getSelectedAIPlayer(),
            map: 'default',
            heroes: ['arthur', 'merlin'],
            resources: { gold: 1000, wood: 500, stone: 300 }
        };
        
        // Démarrer l'interface de jeu
        if (window.gameInterface) {
            window.gameInterface.startGame(gameData);
        }
    }
    
    async trainAI() {
        try {
            console.log('🧠 Entraînement IA en cours...');
            
            const response = await fetch(`http://localhost:8080/api/temporal/ai/train`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    difficulty: this.selectedDifficulty,
                    trainingGames: 10
                })
            });
            
            if (response.ok) {
                const trainingResult = await response.json();
                console.log('✅ Entraînement IA terminé:', trainingResult);
                this.updateAIStats(trainingResult);
            } else {
                console.error('❌ Erreur entraînement IA');
            }
        } catch (error) {
            console.error('Erreur entraînement IA:', error);
            // Simulation d'entraînement local
            this.simulateAITraining();
        }
    }
    
    simulateAITraining() {
        console.log('🧠 Simulation entraînement IA local...');
        
        // Simuler des améliorations de stats
        this.aiStats.gamesPlayed += 10;
        this.aiStats.winRate = Math.min(100, this.aiStats.winRate + 5);
        this.aiStats.averageTurns = Math.max(1, this.aiStats.averageTurns - 1);
        this.aiStats.learningProgress += 15;
        
        this.updateDisplay();
        console.log('✅ Entraînement IA simulé terminé');
    }
    
    resetAIStats() {
        console.log('🔄 Réinitialisation stats IA...');
        
        this.aiStats = {
            gamesPlayed: 0,
            winRate: 0,
            averageTurns: 0,
            learningProgress: 0
        };
        
        this.updateDisplay();
        console.log('✅ Stats IA réinitialisées');
    }
    
    updateAIStats(newStats) {
        this.aiStats = { ...this.aiStats, ...newStats };
        this.updateDisplay();
    }
    
    updateDisplay() {
        // Mettre à jour les statistiques affichées
        const gamesPlayed = document.getElementById('games-played');
        const winRate = document.getElementById('win-rate');
        const avgTurns = document.getElementById('avg-turns');
        
        if (gamesPlayed) gamesPlayed.textContent = this.aiStats.gamesPlayed;
        if (winRate) winRate.textContent = `${this.aiStats.winRate}%`;
        if (avgTurns) avgTurns.textContent = this.aiStats.averageTurns;
    }
    
    getAIData() {
        return this.aiData;
    }
    
    setAIData(data) {
        this.aiData = data;
        this.updateDifficultyGrid();
        this.updateAIPlayersGrid();
        this.updateDisplay();
    }
    
    saveState() {
        const state = {
            selectedDifficulty: this.selectedDifficulty,
            aiStats: this.aiStats,
            gameId: this.gameId
        };
        localStorage.setItem('aiSelectorState', JSON.stringify(state));
    }
    
    loadState() {
        const state = localStorage.getItem('aiSelectorState');
        if (state) {
            const parsedState = JSON.parse(state);
            this.selectedDifficulty = parsedState.selectedDifficulty || 'MEDIUM';
            this.aiStats = parsedState.aiStats || {};
            this.gameId = parsedState.gameId || null;
        }
    }
}

// Initialiser l'interface IA
window.aiSelector = new AISelector();