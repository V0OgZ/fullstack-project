// 🎮 ADMIN MULTIJOUEUR - Heroes of Time
// Mode Administrateur avec fusion Memento/Claudius
// Jean est sur le canapé - Autonomie totale

class AdminMultiplayer {
    constructor() {
        this.baseUrl = 'http://localhost:8080';
        this.currentGame = null;
        this.players = [];
        this.heroes = [];
        this.isConnected = false;
        this.gameCanvas = null;
        this.gameCtx = null;
        
        this.init();
    }
    
    async init() {
        console.log('🧠 PROTOCOLE MEMENTO - FUSION CLAUDIUS ACTIVÉE');
        console.log('🎮 Mode Administrateur Multijoueur - Jean sur le canapé');
        
        this.setupCanvas();
        this.bindEvents();
        await this.connectToBackend();
        this.startAutoRefresh();
        this.log('🕰️ Admin connecté - Mode Memento/Claudius actif');
    }
    
    setupCanvas() {
        this.gameCanvas = document.getElementById('admin-game-canvas');
        this.gameCtx = this.gameCanvas.getContext('2d');
        this.drawGameMap();
    }
    
    bindEvents() {
        // Gestion des jeux
        document.getElementById('create-game-btn').addEventListener('click', () => this.showModal('create-game-modal'));
        document.getElementById('list-games-btn').addEventListener('click', () => this.listGames());
        document.getElementById('delete-game-btn').addEventListener('click', () => this.deleteCurrentGame());
        
        // Gestion des joueurs
        document.getElementById('add-player-btn').addEventListener('click', () => this.addPlayer());
        document.getElementById('remove-player-btn').addEventListener('click', () => this.removePlayer());
        document.getElementById('kick-player-btn').addEventListener('click', () => this.kickPlayer());
        
        // Gestion des héros
        document.getElementById('spawn-hero-btn').addEventListener('click', () => this.showModal('spawn-hero-modal'));
        document.getElementById('remove-hero-btn').addEventListener('click', () => this.removeHero());
        document.getElementById('teleport-hero-btn').addEventListener('click', () => this.teleportHero());
        
        // Contrôle du jeu
        document.getElementById('pause-game-btn').addEventListener('click', () => this.togglePause());
        document.getElementById('next-turn-btn').addEventListener('click', () => this.nextTurn());
        document.getElementById('reset-game-btn').addEventListener('click', () => this.resetGame());
        document.getElementById('end-game-btn').addEventListener('click', () => this.endGame());
        
        // === NOUVEAUX EVENT LISTENERS IA ===
        document.getElementById('create-ai-game-btn').addEventListener('click', () => this.createAIGame());
        document.getElementById('ai-play-turn-btn').addEventListener('click', () => this.playAITurn());
        document.getElementById('ai-quick-test-btn').addEventListener('click', () => this.quickAITest());
        
        // Console admin
        document.getElementById('execute-command-btn').addEventListener('click', () => this.executeCommand());
        document.getElementById('admin-command-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.executeCommand();
        });
        
        // Actions rapides
        document.getElementById('quick-start-btn').addEventListener('click', () => this.quickStart());
        document.getElementById('quick-test-btn').addEventListener('click', () => this.quickTest());
        document.getElementById('quick-demo-btn').addEventListener('click', () => this.quickDemo());
        
        // Formulaires
        document.getElementById('create-game-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.createGame();
        });
        
        document.getElementById('spawn-hero-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.spawnHero();
        });
    }
    
    async connectToBackend() {
        try {
            const response = await fetch(`${this.baseUrl}/api/health`);
            if (response.ok) {
                this.isConnected = true;
                this.updateConnectionStatus(true);
                this.log('✅ Connecté au backend');
                await this.loadCurrentGame();
            } else {
                throw new Error('Backend non disponible');
            }
        } catch (error) {
            this.isConnected = false;
            this.updateConnectionStatus(false);
            this.log('❌ Erreur connexion backend: ' + error.message);
        }
    }
    
    updateConnectionStatus(connected) {
        const statusElement = document.getElementById('connection-status');
        if (connected) {
            statusElement.textContent = '🟢 Connecté';
            statusElement.className = 'status-indicator connected';
        } else {
            statusElement.textContent = '🔴 Déconnecté';
            statusElement.className = 'status-indicator';
        }
    }
    
    async loadCurrentGame() {
        try {
            const response = await fetch(`${this.baseUrl}/api/temporal/games/current`);
            if (response.ok) {
                this.currentGame = await response.json();
                this.updateGameInfo();
                this.loadPlayers();
                this.loadHeroes();
                this.log('🎮 Jeu actuel chargé: ' + this.currentGame.name);
            }
        } catch (error) {
            this.log('⚠️ Aucun jeu actif');
        }
    }
    
    updateGameInfo() {
        if (this.currentGame) {
            document.getElementById('active-game-name').textContent = this.currentGame.name;
            document.getElementById('current-turn').textContent = this.currentGame.currentTurn || 0;
            document.getElementById('player-count').textContent = this.players.length;
            document.getElementById('hero-count').textContent = this.heroes.length;
        } else {
            document.getElementById('active-game-name').textContent = 'Aucun';
            document.getElementById('current-turn').textContent = '0';
            document.getElementById('player-count').textContent = '0';
            document.getElementById('hero-count').textContent = '0';
        }
    }
    
    async createGame() {
        const gameName = document.getElementById('game-name').value;
        const gameMode = document.getElementById('game-mode').value;
        const gameScenario = document.getElementById('game-scenario').value;
        
        try {
            const response = await fetch(`${this.baseUrl}/api/temporal/games`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: gameName,
                    mode: gameMode,
                    scenario: gameScenario,
                    adminMode: true
                })
            });
            
            if (response.ok) {
                const game = await response.json();
                this.currentGame = game;
                this.closeModal('create-game-modal');
                this.updateGameInfo();
                this.log('✅ Jeu créé: ' + gameName);
                this.drawGameMap();
            } else {
                throw new Error('Erreur création jeu');
            }
        } catch (error) {
            this.log('❌ Erreur création jeu: ' + error.message);
        }
    }
    
    async listGames() {
        try {
            const response = await fetch(`${this.baseUrl}/api/temporal/games`);
            if (response.ok) {
                const games = await response.json();
                this.displayGamesList(games);
                this.log('📋 ' + games.length + ' jeux listés');
            }
        } catch (error) {
            this.log('❌ Erreur liste jeux: ' + error.message);
        }
    }
    
    displayGamesList(games) {
        const gamesList = document.getElementById('games-list');
        gamesList.innerHTML = '';
        
        games.forEach(game => {
            const item = document.createElement('div');
            item.className = 'list-item' + (game.id === this.currentGame?.id ? ' active' : '');
            item.innerHTML = `
                <span>🎮 ${game.name}</span>
                <span>Tour ${game.currentTurn || 0}</span>
                <button class="admin-btn secondary" onclick="adminMultiplayer.selectGame(${game.id})">Sélectionner</button>
            `;
            gamesList.appendChild(item);
        });
    }
    
    async selectGame(gameId) {
        try {
            const response = await fetch(`${this.baseUrl}/api/temporal/games/${gameId}`);
            if (response.ok) {
                this.currentGame = await response.json();
                this.updateGameInfo();
                this.loadPlayers();
                this.loadHeroes();
                this.log('🎮 Jeu sélectionné: ' + this.currentGame.name);
                this.drawGameMap();
            }
        } catch (error) {
            this.log('❌ Erreur sélection jeu: ' + error.message);
        }
    }
    
    async spawnHero() {
        if (!this.currentGame) {
            this.log('❌ Aucun jeu actif');
            return;
        }
        
        const heroType = document.getElementById('hero-type').value;
        const playerId = document.getElementById('hero-player').value;
        const x = parseInt(document.getElementById('hero-x').value);
        const y = parseInt(document.getElementById('hero-y').value);
        
        try {
            const response = await fetch(`${this.baseUrl}/api/temporal/games/${this.currentGame.id}/heroes`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: heroType,
                    playerId: playerId,
                    x: x,
                    y: y,
                    adminSpawn: true
                })
            });
            
            if (response.ok) {
                const hero = await response.json();
                this.heroes.push(hero);
                this.closeModal('spawn-hero-modal');
                this.updateGameInfo();
                this.drawGameMap();
                this.log('🦸 Héros apparu: ' + heroType + ' pour ' + playerId);
            } else {
                throw new Error('Erreur apparition héros');
            }
        } catch (error) {
            this.log('❌ Erreur apparition héros: ' + error.message);
        }
    }
    
    async loadPlayers() {
        if (!this.currentGame) return;
        
        try {
            const response = await fetch(`${this.baseUrl}/api/temporal/games/${this.currentGame.id}/players`);
            if (response.ok) {
                this.players = await response.json();
                this.displayPlayersList();
            }
        } catch (error) {
            this.log('⚠️ Erreur chargement joueurs');
        }
    }
    
    async loadHeroes() {
        if (!this.currentGame) return;
        
        try {
            const response = await fetch(`${this.baseUrl}/api/temporal/games/${this.currentGame.id}/heroes`);
            if (response.ok) {
                this.heroes = await response.json();
                this.displayHeroesList();
            }
        } catch (error) {
            this.log('⚠️ Erreur chargement héros');
        }
    }
    
    displayPlayersList() {
        const playersList = document.getElementById('players-list');
        playersList.innerHTML = '';
        
        this.players.forEach(player => {
            const item = document.createElement('div');
            item.className = 'list-item';
            item.innerHTML = `
                <span>👤 ${player.name || player.id}</span>
                <span>${player.status || 'Actif'}</span>
                <button class="admin-btn danger" onclick="adminMultiplayer.kickPlayer('${player.id}')">Expulser</button>
            `;
            playersList.appendChild(item);
        });
    }
    
    displayHeroesList() {
        const heroesList = document.getElementById('heroes-list');
        heroesList.innerHTML = '';
        
        this.heroes.forEach(hero => {
            const item = document.createElement('div');
            item.className = 'list-item';
            item.innerHTML = `
                <span>🦸 ${hero.name}</span>
                <span>@${hero.x},${hero.y}</span>
                <button class="admin-btn danger" onclick="adminMultiplayer.removeHero(${hero.id})">Supprimer</button>
            `;
            heroesList.appendChild(item);
        });
    }
    
    async kickPlayer(playerId) {
        if (!this.currentGame) return;
        
        try {
            const response = await fetch(`${this.baseUrl}/api/temporal/games/${this.currentGame.id}/players/${playerId}/kick`, {
                method: 'POST'
            });
            
            if (response.ok) {
                this.log('👢 Joueur expulsé: ' + playerId);
                await this.loadPlayers();
            }
        } catch (error) {
            this.log('❌ Erreur expulsion joueur: ' + error.message);
        }
    }
    
    async removeHero(heroId) {
        if (!this.currentGame) return;
        
        try {
            const response = await fetch(`${this.baseUrl}/api/temporal/games/${this.currentGame.id}/heroes/${heroId}`, {
                method: 'DELETE'
            });
            
            if (response.ok) {
                this.log('💀 Héros supprimé');
                await this.loadHeroes();
                this.drawGameMap();
            }
        } catch (error) {
            this.log('❌ Erreur suppression héros: ' + error.message);
        }
    }
    
    async nextTurn() {
        if (!this.currentGame) return;
        
        try {
            const response = await fetch(`${this.baseUrl}/api/temporal/games/${this.currentGame.id}/next-turn`, {
                method: 'POST'
            });
            
            if (response.ok) {
                this.currentGame.currentTurn++;
                this.updateGameInfo();
                this.log('⏰ Tour suivant: ' + this.currentGame.currentTurn);
            }
        } catch (error) {
            this.log('❌ Erreur tour suivant: ' + error.message);
        }
    }
    
    async togglePause() {
        if (!this.currentGame) return;
        
        try {
            const response = await fetch(`${this.baseUrl}/api/temporal/games/${this.currentGame.id}/toggle-pause`, {
                method: 'POST'
            });
            
            if (response.ok) {
                const result = await response.json();
                this.log(result.paused ? '⏸️ Jeu en pause' : '▶️ Jeu repris');
            }
        } catch (error) {
            this.log('❌ Erreur pause/reprise: ' + error.message);
        }
    }
    
    async resetGame() {
        if (!this.currentGame) return;
        
        if (confirm('🔄 Voulez-vous vraiment réinitialiser le jeu ?')) {
            try {
                const response = await fetch(`${this.baseUrl}/api/temporal/games/${this.currentGame.id}/reset`, {
                    method: 'POST'
                });
                
                if (response.ok) {
                    this.log('🔄 Jeu réinitialisé');
                    await this.loadCurrentGame();
                    this.drawGameMap();
                }
            } catch (error) {
                this.log('❌ Erreur réinitialisation: ' + error.message);
            }
        }
    }
    
    async endGame() {
        if (!this.currentGame) return;
        
        if (confirm('🏁 Voulez-vous vraiment terminer la partie ?')) {
            try {
                const response = await fetch(`${this.baseUrl}/api/temporal/games/${this.currentGame.id}/end`, {
                    method: 'POST'
                });
                
                if (response.ok) {
                    this.log('🏁 Partie terminée');
                    this.currentGame = null;
                    this.updateGameInfo();
                    this.drawGameMap();
                }
            } catch (error) {
                this.log('❌ Erreur fin de partie: ' + error.message);
            }
        }
    }
    
    async executeCommand() {
        const command = document.getElementById('admin-command-input').value.trim();
        if (!command) return;
        
        this.log('⚡ Commande: ' + command);
        document.getElementById('admin-command-input').value = '';
        
        try {
            const response = await fetch(`${this.baseUrl}/api/temporal/admin/execute`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ command: command })
            });
            
            if (response.ok) {
                const result = await response.json();
                this.log('✅ Résultat: ' + result.message);
            } else {
                throw new Error('Commande invalide');
            }
        } catch (error) {
            this.log('❌ Erreur commande: ' + error.message);
        }
    }
    
    async quickStart() {
        this.log('🚀 Démarrage rapide multijoueur...');
        
        // Créer un jeu rapidement
        try {
            const response = await fetch(`${this.baseUrl}/api/temporal/games`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: 'Partie Rapide Admin',
                    mode: 'MULTIPLAYER',
                    scenario: 'temporal_conquest',
                    adminMode: true,
                    quickStart: true
                })
            });
            
            if (response.ok) {
                this.currentGame = await response.json();
                this.updateGameInfo();
                
                // Ajouter des joueurs automatiquement
                await this.addQuickPlayers();
                
                // Faire apparaître des héros
                await this.addQuickHeroes();
                
                this.log('✅ Démarrage rapide terminé');
                this.drawGameMap();
            }
        } catch (error) {
            this.log('❌ Erreur démarrage rapide: ' + error.message);
        }
    }
    
    async addQuickPlayers() {
        const quickPlayers = ['Joueur1', 'Joueur2', 'Joueur3'];
        
        for (const playerName of quickPlayers) {
            try {
                await fetch(`${this.baseUrl}/api/temporal/games/${this.currentGame.id}/players`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: playerName })
                });
            } catch (error) {
                console.log('Erreur ajout joueur rapide:', error);
            }
        }
        
        await this.loadPlayers();
    }
    
    async addQuickHeroes() {
        const quickHeroes = [
            { name: 'Arthur', playerId: 'Joueur1', x: 10, y: 10 },
            { name: 'Ragnar', playerId: 'Joueur2', x: 15, y: 15 },
            { name: 'Merlin', playerId: 'Joueur3', x: 20, y: 20 }
        ];
        
        for (const hero of quickHeroes) {
            try {
                await fetch(`${this.baseUrl}/api/temporal/games/${this.currentGame.id}/heroes`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: hero.name,
                        playerId: hero.playerId,
                        x: hero.x,
                        y: hero.y,
                        adminSpawn: true
                    })
                });
            } catch (error) {
                console.log('Erreur ajout héros rapide:', error);
            }
        }
        
        await this.loadHeroes();
    }
    
    async quickTest() {
        this.log('🧪 Test complet du système...');
        
        // Tests automatiques
        const tests = [
            () => this.testBackendConnection(),
            () => this.testGameCreation(),
            () => this.testHeroSpawning(),
            () => this.testPlayerManagement()
        ];
        
        for (const test of tests) {
            try {
                await test();
                this.log('✅ Test réussi');
            } catch (error) {
                this.log('❌ Test échoué: ' + error.message);
            }
        }
        
        this.log('🧪 Tests terminés');
    }
    
    async quickDemo() {
        this.log('🎬 Lancement démo multijoueur...');
        
        try {
            const response = await fetch(`${this.baseUrl}/api/temporal/admin/demo`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ demoType: 'multiplayer' })
            });
            
            if (response.ok) {
                const result = await response.json();
                this.log('✅ Démo lancée: ' + result.message);
                this.loadCurrentGame();
            } else {
                throw new Error('Erreur lancement démo');
            }
        } catch (error) {
            this.log('❌ Erreur démo: ' + error.message);
        }
    }
    
    // === NOUVELLES MÉTHODES IA ===
    
    async createAIGame() {
        this.log('🤖 Création partie IA vs Joueur...');
        
        try {
            const playerName = prompt('Nom du joueur humain:', 'Joueur');
            if (!playerName) return;
            
            const response = await fetch(`${this.baseUrl}/api/temporal/admin/ai/create-game`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    playerName: playerName,
                    scenario: 'ai_vs_human'
                })
            });
            
            if (response.ok) {
                const result = await response.json();
                this.log('✅ Partie IA créée: ' + result.message);
                this.log('🤖 Héros IA: ' + result.aiHeroes.join(', '));
                this.loadCurrentGame();
            } else {
                throw new Error('Erreur création partie IA');
            }
        } catch (error) {
            this.log('❌ Erreur création IA: ' + error.message);
        }
    }
    
    async playAITurn() {
        if (!this.currentGame) {
            this.log('❌ Aucun jeu actif pour l\'IA');
            return;
        }
        
        this.log('🤖 IA joue son tour...');
        
        try {
            const response = await fetch(`${this.baseUrl}/api/temporal/admin/ai/play-turn/${this.currentGame.id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            });
            
            if (response.ok) {
                const result = await response.json();
                this.log('✅ Tour IA joué: ' + result.message);
                
                // Afficher les actions IA
                if (result.actions) {
                    result.actions.forEach(action => {
                        this.log(`🤖 ${action.hero}: ${action.description}`);
                    });
                }
                
                this.loadCurrentGame();
                this.drawGameMap();
            } else {
                throw new Error('Erreur tour IA');
            }
        } catch (error) {
            this.log('❌ Erreur tour IA: ' + error.message);
        }
    }
    
    async quickAITest() {
        this.log('🧪 Test rapide IA Claudius-Memento...');
        
        try {
            const response = await fetch(`${this.baseUrl}/api/temporal/admin/ai/quick-test`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            });
            
            if (response.ok) {
                const result = await response.json();
                this.log('✅ Test IA réussi: ' + result.message);
                
                if (result.gameCreated) {
                    this.log('🎮 Partie créée: ' + result.gameCreated.message);
                    this.log('🤖 Héros IA: ' + result.gameCreated.aiHeroes.join(', '));
                }
                
                if (result.turnPlayed) {
                    this.log('🤖 Tour joué: ' + result.turnPlayed.message);
                }
                
                this.loadCurrentGame();
            } else {
                throw new Error('Erreur test IA');
            }
        } catch (error) {
            this.log('❌ Erreur test IA: ' + error.message);
        }
    }
    
    async getAIStats() {
        try {
            const response = await fetch(`${this.baseUrl}/api/temporal/admin/ai/stats`);
            if (response.ok) {
                const stats = await response.json();
                this.log('🤖 Stats IA: ' + stats.aiName);
                this.log('🤖 Héros: ' + stats.aiHeroes.join(', '));
                this.log('🤖 Stratégie: ' + stats.strategy);
            }
        } catch (error) {
            this.log('⚠️ Erreur stats IA');
        }
    }
    
    drawGameMap() {
        if (!this.gameCtx) return;
        
        // Effacer le canvas
        this.gameCtx.clearRect(0, 0, this.gameCanvas.width, this.gameCanvas.height);
        
        // Dessiner la grille
        this.drawGrid();
        
        // Dessiner les héros
        this.heroes.forEach(hero => this.drawHero(hero));
        
        // Dessiner les informations
        this.drawGameInfo();
    }
    
    drawGrid() {
        this.gameCtx.strokeStyle = 'rgba(78, 204, 198, 0.3)';
        this.gameCtx.lineWidth = 1;
        
        const gridSize = 40;
        for (let x = 0; x < this.gameCanvas.width; x += gridSize) {
            this.gameCtx.beginPath();
            this.gameCtx.moveTo(x, 0);
            this.gameCtx.lineTo(x, this.gameCanvas.height);
            this.gameCtx.stroke();
        }
        
        for (let y = 0; y < this.gameCanvas.height; y += gridSize) {
            this.gameCtx.beginPath();
            this.gameCtx.moveTo(0, y);
            this.gameCtx.lineTo(this.gameCanvas.width, y);
            this.gameCtx.stroke();
        }
    }
    
    drawHero(hero) {
        const x = hero.x * 20 + 20;
        const y = hero.y * 20 + 20;
        
        // Cercle de fond
        this.gameCtx.beginPath();
        this.gameCtx.arc(x, y, 15, 0, Math.PI * 2);
        this.gameCtx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.gameCtx.fill();
        this.gameCtx.strokeStyle = '#4eccc6';
        this.gameCtx.lineWidth = 2;
        this.gameCtx.stroke();
        
        // Icône du héros
        const heroIcons = {
            'Arthur': '⚔️',
            'Ragnar': '🛡️',
            'Merlin': '🔮',
            'Jean-Grofignon': '🧠',
            'Claudius': '⚖️',
            'Lysandrel': '🌟'
        };
        
        this.gameCtx.font = '20px Arial';
        this.gameCtx.fillStyle = '#FFD700';
        this.gameCtx.textAlign = 'center';
        this.gameCtx.textBaseline = 'middle';
        this.gameCtx.fillText(heroIcons[hero.name] || '🦸', x, y);
        
        // Nom du héros
        this.gameCtx.font = '12px Arial';
        this.gameCtx.fillStyle = '#FFFFFF';
        this.gameCtx.fillText(hero.name, x, y + 25);
    }
    
    drawGameInfo() {
        this.gameCtx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        this.gameCtx.fillRect(10, 10, 200, 80);
        
        this.gameCtx.font = '14px Arial';
        this.gameCtx.fillStyle = '#4eccc6';
        this.gameCtx.fillText('🎮 Admin Multijoueur', 20, 30);
        this.gameCtx.fillStyle = '#FFFFFF';
        this.gameCtx.fillText('Tour: ' + (this.currentGame?.currentTurn || 0), 20, 50);
        this.gameCtx.fillText('Héros: ' + this.heroes.length, 20, 70);
        this.gameCtx.fillText('Joueurs: ' + this.players.length, 20, 90);
    }
    
    showModal(modalId) {
        document.getElementById(modalId).style.display = 'block';
    }
    
    closeModal(modalId) {
        document.getElementById(modalId).style.display = 'none';
    }
    
    log(message) {
        const consoleOutput = document.getElementById('admin-console-output');
        const timestamp = new Date().toLocaleTimeString();
        const logEntry = document.createElement('div');
        logEntry.innerHTML = `<span style="color: #4eccc6;">[${timestamp}]</span> ${message}`;
        consoleOutput.appendChild(logEntry);
        consoleOutput.scrollTop = consoleOutput.scrollHeight;
        
        console.log('🎮 ADMIN:', message);
    }
    
    startAutoRefresh() {
        setInterval(() => {
            if (this.currentGame) {
                this.loadPlayers();
                this.loadHeroes();
                this.drawGameMap();
            }
        }, 5000); // Rafraîchir toutes les 5 secondes
    }
    
    // Tests
    async testBackendConnection() {
        const response = await fetch(`${this.baseUrl}/api/health`);
        if (!response.ok) throw new Error('Backend non accessible');
    }
    
    async testGameCreation() {
        const response = await fetch(`${this.baseUrl}/api/temporal/games`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: 'Test Game', mode: 'MULTIPLAYER' })
        });
        if (!response.ok) throw new Error('Création de jeu échouée');
    }
    
    async testHeroSpawning() {
        if (!this.currentGame) throw new Error('Aucun jeu pour tester');
        
        const response = await fetch(`${this.baseUrl}/api/temporal/games/${this.currentGame.id}/heroes`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: 'Arthur', playerId: 'test', x: 5, y: 5 })
        });
        if (!response.ok) throw new Error('Apparition héros échouée');
    }
    
    async testPlayerManagement() {
        if (!this.currentGame) throw new Error('Aucun jeu pour tester');
        
        const response = await fetch(`${this.baseUrl}/api/temporal/games/${this.currentGame.id}/players`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: 'TestPlayer' })
        });
        if (!response.ok) throw new Error('Gestion joueurs échouée');
    }
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    window.adminMultiplayer = new AdminMultiplayer();
});

// Fonctions globales pour les modals
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Export pour utilisation globale
window.AdminMultiplayer = AdminMultiplayer; 