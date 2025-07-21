// 🎮 SÉLECTEUR DE SCÉNARIOS + IA BASIQUE
// =========================================

class ScenarioSelector {
    constructor() {
        this.scenarios = [
            {
                id: 'simple-game',
                name: '🎮 Démarrer Simple',
                description: 'Tutorial basique - Arthur vs Merlin',
                difficulty: 'Débutant',
                duration: '< 3 min',
                commands: 7,
                psiStates: 1,
                file: 'simple-game.hots',
                category: 'tutorial'
            },
            {
                id: 'initiation-combat',
                name: '⚔️ Initiation Combat',
                description: 'Apprendre les bases du combat avec Guenièvre',
                difficulty: 'Débutant',
                duration: '5 min',
                commands: 15,
                psiStates: 0,
                file: 'initiation_combat.hots',
                category: 'tutorial'
            },
            {
                id: 'epic-arthur-vs-ragnar',
                name: '🏰 Bataille Épique',
                description: 'Arthur vs Ragnar - Combat légendaire',
                difficulty: 'Intermédiaire',
                duration: '10 min',
                commands: 20,
                psiStates: 6,
                file: 'epic-arthur-vs-ragnar.hots',
                category: 'combat'
            },
            {
                id: 'claudius-vs-jeangro',
                name: '🧠 Ordre vs Chaos',
                description: 'Claudius vs Jean-Grofignon - Philosophie',
                difficulty: 'Avancé',
                duration: '15 min',
                commands: 25,
                psiStates: 8,
                file: 'claudius_vs_jeangro_epic.hots',
                category: 'philosophie'
            },
            {
                id: 'quantum-maze',
                name: '🌀 Labyrinthe Quantique',
                description: 'Navigation dans les timelines parallèles',
                difficulty: 'Expert',
                duration: '20 min',
                commands: 30,
                psiStates: 12,
                file: 'quantum_maze.hots',
                category: 'quantique'
            },
            {
                id: 'oeil-de-wigner',
                name: '👁️ Œil de Wigner',
                description: 'Maîtriser l\'artefact temporel légendaire',
                difficulty: 'Légendaire',
                duration: '25 min',
                commands: 35,
                psiStates: 15,
                file: 'oeil_de_wigner_scenario.hots',
                category: 'artefacts'
            },
            {
                id: 'memento-memory-rewrite',
                name: '🧠 Réécriture Mémorielle',
                description: 'Memento réécrit la réalité temporelle',
                difficulty: 'Légendaire',
                duration: '30 min',
                commands: 40,
                psiStates: 20,
                file: 'memento_memory_rewrite.hots',
                category: 'temporel'
            }
        ];
        
        this.selectedScenario = null;
        this.currentGame = null;
        this.aiMode = false;
        this.aiSpeed = 1000; // ms entre les actions
    }
    
    // 🎯 CRÉER L'INTERFACE DE SÉLECTION
    createSelectorInterface() {
        const container = document.createElement('div');
        container.className = 'scenario-selector';
        container.innerHTML = `
            <div class="scenario-panel">
                <h2>🎮 Sélection de Scénario</h2>
                
                <div class="scenario-filters">
                    <button class="filter-btn active" data-filter="all">Tous</button>
                    <button class="filter-btn" data-filter="tutorial">Tutorial</button>
                    <button class="filter-btn" data-filter="combat">Combat</button>
                    <button class="filter-btn" data-filter="philosophie">Philosophie</button>
                    <button class="filter-btn" data-filter="quantique">Quantique</button>
                    <button class="filter-btn" data-filter="artefacts">Artefacts</button>
                    <button class="filter-btn" data-filter="temporel">Temporel</button>
                </div>
                
                <div class="scenarios-grid" id="scenarios-grid">
                    <!-- Les scénarios seront générés ici -->
                </div>
                
                <div class="ai-controls">
                    <h3>🤖 Mode IA</h3>
                    <div class="ai-options">
                        <label>
                            <input type="checkbox" id="ai-mode-toggle"> Activer l'IA
                        </label>
                        <div class="ai-speed-control">
                            <label>Vitesse IA: <span id="ai-speed-value">1s</span></label>
                            <input type="range" id="ai-speed-slider" min="500" max="3000" value="1000" step="500">
                        </div>
                    </div>
                </div>
                
                <div class="scenario-actions">
                    <button id="start-scenario-btn" class="btn-primary" disabled>🚀 Lancer le Scénario</button>
                    <button id="preview-scenario-btn" class="btn-secondary">👁️ Aperçu</button>
                    <button id="close-selector-btn" class="btn-warning">❌ Fermer</button>
                </div>
            </div>
        `;
        
        this.setupEventListeners(container);
        this.renderScenarios();
        
        return container;
    }
    
    // 🎨 RENDRE LES SCÉNARIOS
    renderScenarios(filter = 'all') {
        const grid = document.getElementById('scenarios-grid');
        if (!grid) return;
        
        const filteredScenarios = filter === 'all' 
            ? this.scenarios 
            : this.scenarios.filter(s => s.category === filter);
        
        grid.innerHTML = filteredScenarios.map(scenario => `
            <div class="scenario-card" data-scenario-id="${scenario.id}">
                <div class="scenario-header">
                    <h3>${scenario.name}</h3>
                    <span class="difficulty-badge ${scenario.difficulty.toLowerCase()}">${scenario.difficulty}</span>
                </div>
                
                <div class="scenario-description">
                    <p>${scenario.description}</p>
                </div>
                
                <div class="scenario-stats">
                    <div class="stat">
                        <span class="stat-icon">⏱️</span>
                        <span class="stat-value">${scenario.duration}</span>
                    </div>
                    <div class="stat">
                        <span class="stat-icon">📜</span>
                        <span class="stat-value">${scenario.commands} cmd</span>
                    </div>
                    <div class="stat">
                        <span class="stat-icon">ψ</span>
                        <span class="stat-value">${scenario.psiStates} états</span>
                    </div>
                </div>
                
                <div class="scenario-category">
                    <span class="category-tag">${this.getCategoryIcon(scenario.category)} ${scenario.category}</span>
                </div>
            </div>
        `).join('');
        
        // Ajouter les event listeners pour la sélection
        this.setupScenarioSelection();
    }
    
    // 🎯 CONFIGURER LES EVENT LISTENERS
    setupEventListeners(container) {
        // Filtres
        const filterBtns = container.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                filterBtns.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.renderScenarios(e.target.dataset.filter);
            });
        });
        
        // Toggle IA
        const aiToggle = container.querySelector('#ai-mode-toggle');
        aiToggle.addEventListener('change', (e) => {
            this.aiMode = e.target.checked;
            console.log(`Mode IA: ${this.aiMode ? 'Activé' : 'Désactivé'}`);
        });
        
        // Vitesse IA
        const aiSpeedSlider = container.querySelector('#ai-speed-slider');
        const aiSpeedValue = container.querySelector('#ai-speed-value');
        aiSpeedSlider.addEventListener('input', (e) => {
            this.aiSpeed = parseInt(e.target.value);
            aiSpeedValue.textContent = `${this.aiSpeed / 1000}s`;
        });
        
        // Boutons d'action
        const startBtn = container.querySelector('#start-scenario-btn');
        startBtn.addEventListener('click', () => this.startSelectedScenario());
        
        const previewBtn = container.querySelector('#preview-scenario-btn');
        previewBtn.addEventListener('click', () => this.previewSelectedScenario());
        
        const closeBtn = container.querySelector('#close-selector-btn');
        closeBtn.addEventListener('click', () => this.closeSelector());
    }
    
    // 🎯 CONFIGURER LA SÉLECTION DE SCÉNARIOS
    setupScenarioSelection() {
        const cards = document.querySelectorAll('.scenario-card');
        cards.forEach(card => {
            card.addEventListener('click', (e) => {
                // Désélectionner tous les autres
                cards.forEach(c => c.classList.remove('selected'));
                // Sélectionner celui-ci
                card.classList.add('selected');
                
                const scenarioId = card.dataset.scenarioId;
                this.selectedScenario = this.scenarios.find(s => s.id === scenarioId);
                
                // Activer le bouton de lancement
                const startBtn = document.getElementById('start-scenario-btn');
                if (startBtn) {
                    startBtn.disabled = false;
                }
                
                console.log(`Scénario sélectionné: ${this.selectedScenario.name}`);
            });
        });
    }
    
    // 🚀 LANCER LE SCÉNARIO SÉLECTIONNÉ
    async startSelectedScenario() {
        if (!this.selectedScenario) {
            alert('Veuillez sélectionner un scénario');
            return;
        }
        
        try {
            console.log(`Lancement du scénario: ${this.selectedScenario.name}`);
            
            // Charger le fichier HOTS
            const hotsContent = await this.loadHotsFile(this.selectedScenario.file);
            
            // Créer un nouveau jeu
            this.currentGame = await this.createNewGame(this.selectedScenario.name);
            
            // Exécuter le scénario
            if (this.aiMode) {
                await this.executeScenarioWithAI(hotsContent);
            } else {
                await this.executeScenarioManual(hotsContent);
            }
            
            // Fermer le sélecteur
            this.closeSelector();
            
        } catch (error) {
            console.error('Erreur lors du lancement du scénario:', error);
            alert(`Erreur: ${error.message}`);
        }
    }
    
    // 👁️ APERÇU DU SCÉNARIO
    previewSelectedScenario() {
        if (!this.selectedScenario) {
            alert('Veuillez sélectionner un scénario');
            return;
        }
        
        const preview = `
            <div class="scenario-preview">
                <h3>${this.selectedScenario.name}</h3>
                <p><strong>Description:</strong> ${this.selectedScenario.description}</p>
                <p><strong>Difficulté:</strong> ${this.selectedScenario.difficulty}</p>
                <p><strong>Durée estimée:</strong> ${this.selectedScenario.duration}</p>
                <p><strong>Commandes:</strong> ${this.selectedScenario.commands}</p>
                <p><strong>États ψ:</strong> ${this.selectedScenario.psiStates}</p>
                <p><strong>Fichier:</strong> ${this.selectedScenario.file}</p>
            </div>
        `;
        
        // Afficher dans une modal ou dans la console
        console.log('Aperçu du scénario:', this.selectedScenario);
        alert(preview);
    }
    
    // 🤖 EXÉCUTER AVEC IA
    async executeScenarioWithAI(hotsContent) {
        console.log('🤖 Mode IA activé - Exécution automatique');
        
        const commands = this.parseHotsCommands(hotsContent);
        
        for (let i = 0; i < commands.length; i++) {
            const command = commands[i];
            
            // Afficher la commande en cours
            this.showAIProgress(i + 1, commands.length, command);
            
            // Exécuter la commande
            await this.executeCommand(command);
            
            // Attendre selon la vitesse IA
            await this.delay(this.aiSpeed);
        }
        
        console.log('✅ Scénario terminé par l\'IA');
        this.showMessage('🎉 Scénario terminé avec succès !', 'success');
    }
    
    // 👤 EXÉCUTER MANUELLEMENT
    async executeScenarioManual(hotsContent) {
        console.log('👤 Mode manuel - Exécution pas à pas');
        
        const commands = this.parseHotsCommands(hotsContent);
        
        // Afficher les commandes dans la console de script
        if (window.scriptConsole) {
            window.scriptConsole.log(`📜 Scénario: ${this.selectedScenario.name}`);
            window.scriptConsole.log(`📊 ${commands.length} commandes à exécuter`);
            window.scriptConsole.log('🎮 Mode manuel - Cliquez sur les commandes pour les exécuter');
        }
        
        // Créer des boutons pour chaque commande
        this.createManualCommandButtons(commands);
    }
    
    // 📜 PARSER LES COMMANDES HOTS
    parseHotsCommands(hotsContent) {
        const lines = hotsContent.split('\n');
        const commands = [];
        
        lines.forEach((line, index) => {
            line = line.trim();
            
            // Ignorer les commentaires et lignes vides
            if (line.startsWith('#') || line === '') return;
            
            // Détecter les types de commandes
            if (line.startsWith('HERO:')) {
                commands.push({
                    type: 'HERO',
                    content: line,
                    line: index + 1
                });
            } else if (line.startsWith('MOV(')) {
                commands.push({
                    type: 'MOVEMENT',
                    content: line,
                    line: index + 1
                });
            } else if (line.startsWith('CREATE(')) {
                commands.push({
                    type: 'CREATE',
                    content: line,
                    line: index + 1
                });
            } else if (line.startsWith('BATTLE(')) {
                commands.push({
                    type: 'BATTLE',
                    content: line,
                    line: index + 1
                });
            } else if (line.startsWith('ψ')) {
                commands.push({
                    type: 'PSI_STATE',
                    content: line,
                    line: index + 1
                });
            } else if (line.startsWith('†')) {
                commands.push({
                    type: 'COLLAPSE',
                    content: line,
                    line: index + 1
                });
            } else if (line.startsWith('NEXT_TURN')) {
                commands.push({
                    type: 'NEXT_TURN',
                    content: line,
                    line: index + 1
                });
            } else if (line.startsWith('QUOTE(')) {
                commands.push({
                    type: 'QUOTE',
                    content: line,
                    line: index + 1
                });
            }
        });
        
        return commands;
    }
    
    // 🎮 CRÉER LES BOUTONS DE COMMANDES MANUELLES
    createManualCommandButtons(commands) {
        const container = document.createElement('div');
        container.className = 'manual-commands';
        container.innerHTML = `
            <h3>📜 Commandes du Scénario</h3>
            <div class="commands-list">
                ${commands.map((cmd, index) => `
                    <button class="command-btn ${cmd.type.toLowerCase()}" data-command-index="${index}">
                        <span class="command-number">${index + 1}</span>
                        <span class="command-type">${this.getCommandIcon(cmd.type)}</span>
                        <span class="command-content">${cmd.content.substring(0, 50)}${cmd.content.length > 50 ? '...' : ''}</span>
                    </button>
                `).join('')}
            </div>
        `;
        
        // Ajouter au side panel
        const sidePanel = document.querySelector('.side-panel');
        if (sidePanel) {
            sidePanel.appendChild(container);
        }
        
        // Event listeners pour les boutons
        const commandBtns = container.querySelectorAll('.command-btn');
        commandBtns.forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const index = parseInt(e.target.dataset.commandIndex);
                const command = commands[index];
                
                // Exécuter la commande
                await this.executeCommand(command);
                
                // Marquer comme exécutée
                btn.classList.add('executed');
                btn.disabled = true;
            });
        });
    }
    
    // ⚡ EXÉCUTER UNE COMMANDE
    async executeCommand(command) {
        console.log(`Exécution: ${command.content}`);
        
        try {
            if (window.scriptConsole) {
                window.scriptConsole.executeCommand(command.content);
            }
            
            // Attendre un peu pour l'animation
            await this.delay(500);
            
        } catch (error) {
            console.error(`Erreur lors de l'exécution de la commande:`, error);
        }
    }
    
    // 📁 CHARGER UN FICHIER HOTS
    async loadHotsFile(filename) {
        try {
            const response = await fetch(`game_assets/scenarios/hots/${filename}`);
            if (!response.ok) {
                throw new Error(`Fichier non trouvé: ${filename}`);
            }
            return await response.text();
        } catch (error) {
            console.error('Erreur lors du chargement du fichier HOTS:', error);
            throw error;
        }
    }
    
    // 🎮 CRÉER UN NOUVEAU JEU
    async createNewGame(gameName) {
        try {
            if (window.gameAPI) {
                const gameState = await window.gameAPI.createGame(gameName);
                console.log('Nouveau jeu créé:', gameState);
                return gameState;
            }
        } catch (error) {
            console.error('Erreur lors de la création du jeu:', error);
            throw error;
        }
    }
    
    // 🤖 AFFICHER LE PROGRÈS DE L'IA
    showAIProgress(current, total, command) {
        const progress = Math.round((current / total) * 100);
        const message = `🤖 IA: ${current}/${total} (${progress}%) - ${command.content.substring(0, 30)}...`;
        
        if (window.updateStatusBar) {
            window.updateStatusBar(message);
        }
        
        console.log(message);
    }
    
    // 💬 AFFICHER UN MESSAGE
    showMessage(message, type = 'info') {
        const messageDiv = document.createElement('div');
        messageDiv.className = `game-message ${type}`;
        messageDiv.textContent = message;
        
        document.body.appendChild(messageDiv);
        
        setTimeout(() => {
            if (document.body.contains(messageDiv)) {
                document.body.removeChild(messageDiv);
            }
        }, 3000);
    }
    
    // 🔄 FERMER LE SÉLECTEUR
    closeSelector() {
        const selector = document.querySelector('.scenario-selector');
        if (selector) {
            selector.remove();
        }
    }
    
    // 🎨 UTILITAIRES
    getCategoryIcon(category) {
        const icons = {
            'tutorial': '📚',
            'combat': '⚔️',
            'philosophie': '🧠',
            'quantique': '🌀',
            'artefacts': '🔮',
            'temporel': '⏰'
        };
        return icons[category] || '🎮';
    }
    
    getCommandIcon(type) {
        const icons = {
            'HERO': '👤',
            'MOVEMENT': '🚶',
            'CREATE': '✨',
            'BATTLE': '⚔️',
            'PSI_STATE': 'ψ',
            'COLLAPSE': '†',
            'NEXT_TURN': '⏭️',
            'QUOTE': '💬'
        };
        return icons[type] || '📜';
    }
    
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// 🌍 EXPORT POUR UTILISATION GLOBALE
window.ScenarioSelector = ScenarioSelector; 