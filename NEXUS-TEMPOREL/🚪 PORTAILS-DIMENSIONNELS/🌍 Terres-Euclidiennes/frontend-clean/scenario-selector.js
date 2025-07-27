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
                category: 'tutorial',
                heroes: ['Arthur', 'Merlin'],
                items: []
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
                category: 'tutorial',
                heroes: ['Guenièvre'],
                items: ['sword_basic', 'shield_round']
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
                category: 'combat',
                heroes: ['Arthur', 'Ragnar'],
                items: ['sword_excalibur', 'axe_battle']
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
                category: 'philosophie',
                heroes: ['Claudius Memento', 'Jean-Grofignon'],
                items: ['TOME_MEMOIRE', 'JOINT_MAGIQUE']
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
                category: 'quantique',
                heroes: ['Morgana', 'Lancelot'],
                items: ['temporal_anchor', 'phoenix_feather']
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
                category: 'artefacts',
                heroes: ['Nikita Victor Nettoyeur'],
                items: ['oeil_de_wigner', 'lunette_quantique']
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
                category: 'temporel',
                heroes: ['Claudius Memento', 'Memento'],
                items: ['avantworld_blade', 'nexus_blade']
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
                
                <div class="scenario-avatars" id="avatars-${scenario.id}">
                    <!-- Les avatars dicebear seront ajoutés ici -->
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
        
        // Charger les avatars dicebear après le rendu
        this.loadScenarioAvatars(filteredScenarios);
    }
    
    // 🎨 CHARGER LES AVATARS DICEBEAR
    loadScenarioAvatars(scenarios) {
        if (!window.dicebarSystem) {
            console.warn('DicebarSystem non disponible');
            return;
        }
        
        scenarios.forEach(scenario => {
            const avatarsContainer = document.getElementById(`avatars-${scenario.id}`);
            if (!avatarsContainer) return;
            
            const avatarsHTML = [];
            
            // Ajouter les héros
            if (scenario.heroes && scenario.heroes.length > 0) {
                const heroesDiv = document.createElement('div');
                heroesDiv.className = 'scenario-heroes';
                heroesDiv.innerHTML = '<span class="avatars-label">Héros :</span>';
                
                scenario.heroes.forEach(heroName => {
                    const avatarElement = window.dicebarSystem.createMapElement(
                        'hero',
                        heroName,
                        40,
                        {
                            showIcon: false,
                            glow: false
                        }
                    );
                    
                    if (avatarElement) {
                        avatarElement.style.display = 'inline-block';
                        avatarElement.style.margin = '0 5px';
                        avatarElement.title = heroName;
                        heroesDiv.appendChild(avatarElement);
                    }
                });
                
                avatarsContainer.appendChild(heroesDiv);
            }
            
            // Ajouter les items
            if (scenario.items && scenario.items.length > 0) {
                const itemsDiv = document.createElement('div');
                itemsDiv.className = 'scenario-items';
                itemsDiv.innerHTML = '<span class="avatars-label">Items :</span>';
                
                scenario.items.forEach(itemName => {
                    const avatarElement = window.dicebarSystem.createMapElement(
                        'artifact',
                        itemName,
                        35,
                        {
                            showIcon: false,
                            glow: true,
                            rarity: 'rare'
                        }
                    );
                    
                    if (avatarElement) {
                        avatarElement.style.display = 'inline-block';
                        avatarElement.style.margin = '0 3px';
                        avatarElement.title = itemName;
                        itemsDiv.appendChild(avatarElement);
                    }
                });
                
                avatarsContainer.appendChild(itemsDiv);
            }
        });
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
    
    // 👁️ APERÇU DU SCÉNARIO AVEC CARTE D'INFO SYMPA
    async previewSelectedScenario() {
        if (!this.selectedScenario) {
            this.showMessage('Veuillez sélectionner un scénario', 'warning');
            return;
        }
        
        try {
            // Charger le contenu du fichier HOTS
            const hotsContent = await this.loadHotsFile(this.selectedScenario.file);
            
            // Analyser le contenu pour extraire des infos
            const analysis = this.analyzeScenarioContent(hotsContent);
            
            // Créer la carte d'info sympa
            this.showScenarioInfoCard(analysis);
            
        } catch (error) {
            console.error('Erreur lors de l\'analyse du scénario:', error);
            this.showMessage('Erreur lors de l\'analyse du scénario', 'error');
        }
    }
    
    // 🔍 ANALYSER LE CONTENU DU SCÉNARIO
    analyzeScenarioContent(hotsContent) {
        const lines = hotsContent.split('\n');
        const analysis = {
            totalLines: lines.length,
            commands: [],
            heroes: [],
            artifacts: [],
            psiStates: [],
            battles: [],
            movements: [],
            creations: [],
            gameMode: 'async', // Par défaut asynchrone
            complexity: 'medium',
            estimatedTurns: 0,
            specialFeatures: []
        };
        
        lines.forEach((line, index) => {
            line = line.trim();
            
            // Ignorer les commentaires et lignes vides
            if (line.startsWith('#') || line === '') return;
            
            // Analyser chaque type de commande
            if (line.startsWith('HERO(')) {
                const heroMatch = line.match(/HERO\(([^)]+)\)/);
                if (heroMatch) {
                    analysis.heroes.push(heroMatch[1]);
                }
                analysis.commands.push({ type: 'HERO', line: index + 1, content: line });
            } else if (line.startsWith('MOV(')) {
                analysis.movements.push({ line: index + 1, content: line });
                analysis.commands.push({ type: 'MOVEMENT', line: index + 1, content: line });
            } else if (line.startsWith('CREATE(')) {
                analysis.creations.push({ line: index + 1, content: line });
                analysis.commands.push({ type: 'CREATE', line: index + 1, content: line });
            } else if (line.startsWith('BATTLE(')) {
                analysis.battles.push({ line: index + 1, content: line });
                analysis.commands.push({ type: 'BATTLE', line: index + 1, content: line });
            } else if (line.startsWith('USE(')) {
                const artifactMatch = line.match(/USE\([^,]+,\s*([^,)]+)/);
                if (artifactMatch) {
                    analysis.artifacts.push(artifactMatch[1]);
                }
                analysis.commands.push({ type: 'USE', line: index + 1, content: line });
            } else if (line.includes('ψ') && line.includes('⊙')) {
                analysis.psiStates.push({ line: index + 1, content: line });
                analysis.commands.push({ type: 'PSI_STATE', line: index + 1, content: line });
            } else if (line.startsWith('†')) {
                analysis.commands.push({ type: 'COLLAPSE', line: index + 1, content: line });
            } else if (line.includes('Π(')) {
                analysis.commands.push({ type: 'OBSERVATION', line: index + 1, content: line });
                analysis.specialFeatures.push('Triggers d\'observation');
            } else if (line.includes('TIMELINE(')) {
                analysis.commands.push({ type: 'TIMELINE', line: index + 1, content: line });
                analysis.specialFeatures.push('Timelines parallèles');
            } else if (line.includes('MERGE(')) {
                analysis.commands.push({ type: 'MERGE', line: index + 1, content: line });
                analysis.specialFeatures.push('Fusion de timelines');
            }
        });
        
        // Déterminer la complexité
        if (analysis.psiStates.length > 10 || analysis.battles.length > 5) {
            analysis.complexity = 'high';
        } else if (analysis.psiStates.length > 5 || analysis.battles.length > 2) {
            analysis.complexity = 'medium';
        } else {
            analysis.complexity = 'low';
        }
        
        // Estimer le nombre de tours
        analysis.estimatedTurns = Math.max(
            analysis.movements.length,
            analysis.battles.length * 2,
            analysis.psiStates.length
        );
        
        // Détecter le mode de jeu
        const uniqueHeroes = [...new Set(analysis.heroes)];
        
        // Mode IA par défaut (exécution automatique)
        analysis.gameMode = 'async';
        
        // Détecter si c'est un scénario multiplayer (plusieurs héros différents)
        if (uniqueHeroes.length > 1) {
            analysis.gameMode = 'multiplayer';
        }
        
        return analysis;
    }
    
    // 🎨 AFFICHER LA CARTE D'INFO SYMPA
    showScenarioInfoCard(analysis) {
        // Supprimer l'ancienne carte si elle existe
        const existingCard = document.querySelector('.scenario-info-card');
        if (existingCard) {
            existingCard.remove();
        }
        
        const card = document.createElement('div');
        card.className = 'scenario-info-card';
        
        const complexityColor = {
            'low': '#27ae60',
            'medium': '#f39c12',
            'high': '#e74c3c'
        };
        
        const complexityIcon = {
            'low': '🟢',
            'medium': '🟡',
            'high': '🔴'
        };
        
        card.innerHTML = `
            <div class="info-card-header">
                <h3>${this.selectedScenario.name}</h3>
                <button class="close-info-btn" onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
            
            <div class="info-card-content">
                <div class="info-section">
                    <h4>📊 Statistiques</h4>
                    <div class="stats-grid">
                        <div class="stat-item">
                            <span class="stat-icon">📜</span>
                            <span class="stat-label">Commandes</span>
                            <span class="stat-value">${analysis.commands.length}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-icon">ψ</span>
                            <span class="stat-label">États Quantiques</span>
                            <span class="stat-value">${analysis.psiStates.length}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-icon">⚔️</span>
                            <span class="stat-label">Batailles</span>
                            <span class="stat-value">${analysis.battles.length}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-icon">🔄</span>
                            <span class="stat-label">Mouvements</span>
                            <span class="stat-value">${analysis.movements.length}</span>
                        </div>
                    </div>
                </div>
                
                <div class="info-section">
                    <h4>🎮 Mode de Jeu</h4>
                    <div class="game-mode-info">
                        <span class="mode-badge ${analysis.gameMode}">
                            ${analysis.gameMode === 'multiplayer' ? '👥 Multiplayer' : '🤖 Mode IA'}
                        </span>
                        <p class="mode-description">
                            ${analysis.gameMode === 'multiplayer' 
                                ? 'Scénario multiplayer - Plusieurs héros/joueurs peuvent participer'
                                : 'Mode IA - L\'intelligence artificielle exécute les commandes automatiquement'}
                        </p>
                    </div>
                </div>
                
                <div class="info-section">
                    <h4>🎯 Complexité</h4>
                    <div class="complexity-info">
                        <span class="complexity-badge" style="color: ${complexityColor[analysis.complexity]}">
                            ${complexityIcon[analysis.complexity]} ${analysis.complexity.toUpperCase()}
                        </span>
                        <p>${this.getComplexityDescription(analysis.complexity)}</p>
                    </div>
                </div>
                
                ${analysis.heroes.length > 0 ? `
                <div class="info-section">
                    <h4>🦸 Héros</h4>
                    <div class="heroes-list">
                        ${analysis.heroes.map(hero => `<span class="hero-tag">${hero}</span>`).join('')}
                    </div>
                </div>
                ` : ''}
                
                ${analysis.artifacts.length > 0 ? `
                <div class="info-section">
                    <h4>🔮 Artefacts</h4>
                    <div class="artifacts-list">
                        ${analysis.artifacts.map(artifact => `<span class="artifact-tag">${artifact}</span>`).join('')}
                    </div>
                </div>
                ` : ''}
                
                ${analysis.specialFeatures.length > 0 ? `
                <div class="info-section">
                    <h4>✨ Fonctionnalités Spéciales</h4>
                    <div class="features-list">
                        ${analysis.specialFeatures.map(feature => `<span class="feature-tag">${feature}</span>`).join('')}
                    </div>
                </div>
                ` : ''}
                
                <div class="info-section">
                    <h4>⏱️ Estimation</h4>
                    <div class="estimation-info">
                        <p><strong>Durée:</strong> ${this.selectedScenario.duration}</p>
                        <p><strong>Tours estimés:</strong> ${analysis.estimatedTurns}</p>
                        <p><strong>Difficulté:</strong> ${this.selectedScenario.difficulty}</p>
                    </div>
                </div>
            </div>
            
            <div class="info-card-actions">
                <button class="action-btn primary" onclick="scenarioSelector.startSelectedScenario()">
                    🚀 Lancer le Scénario
                </button>
                <button class="action-btn secondary" onclick="this.parentElement.parentElement.remove()">
                    ✋ Annuler
                </button>
            </div>
        `;
        
        // Ajouter la carte au DOM
        document.body.appendChild(card);
        
        // Animation d'apparition
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 10);
    }
    
    // 📝 DESCRIPTION DE LA COMPLEXITÉ
    getComplexityDescription(complexity) {
        const descriptions = {
            'low': 'Scénario simple - Parfait pour débuter avec Heroes of Time',
            'medium': 'Complexité modérée - Nécessite une bonne compréhension des mécaniques',
            'high': 'Scénario avancé - Maîtrise des concepts temporels requise'
        };
        return descriptions[complexity] || descriptions.medium;
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
            const response = await fetch(`🎮 game_assets/scenarios/hots/${filename}`);
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
    
    // 💬 AFFICHER UN MESSAGE SOPHISTIQUÉ
    showMessage(message, type = 'info') {
        // Supprimer les anciens messages
        const existingMessages = document.querySelectorAll('.scenario-message');
        existingMessages.forEach(msg => msg.remove());
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `scenario-message ${type}`;
        
        const icons = {
            'info': 'ℹ️',
            'success': '✅',
            'warning': '⚠️',
            'error': '❌'
        };
        
        messageDiv.innerHTML = `
            <div class="message-content">
                <span class="message-icon">${icons[type] || icons.info}</span>
                <span class="message-text">${message}</span>
            </div>
            <button class="message-close" onclick="this.parentElement.remove()">×</button>
        `;
        
        document.body.appendChild(messageDiv);
        
        // Animation d'apparition
        setTimeout(() => {
            messageDiv.style.opacity = '1';
            messageDiv.style.transform = 'translateY(0)';
        }, 10);
        
        // Auto-suppression après 5 secondes
        setTimeout(() => {
            if (messageDiv.parentElement) {
                messageDiv.style.opacity = '0';
                messageDiv.style.transform = 'translateY(-20px)';
                setTimeout(() => {
                    if (messageDiv.parentElement) {
                        messageDiv.remove();
                    }
                }, 300);
            }
        }, 5000);
    }
    
    // 🔄 FERMER LE SÉLECTEUR
    closeSelector() {
        const selector = document.querySelector('.scenario-selector');
        if (selector) {
            selector.remove();
        }
    }
    
    // 🎯 AFFICHER LE SÉLECTEUR
    show() {
        // Supprimer l'ancien sélecteur s'il existe
        this.closeSelector();
        
        // Créer et afficher le nouveau sélecteur
        const selectorUI = this.createSelectorInterface();
        document.body.appendChild(selectorUI);
        
        // Charger les avatars dicebear après un court délai pour s'assurer que le DOM est prêt
        setTimeout(() => {
            this.renderScenarios();
        }, 100);
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