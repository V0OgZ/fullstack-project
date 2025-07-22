// gameplay-enhancement.js - Système de gameplay complet pour Heroes of Time
class GameplayEnhancement {
    constructor() {
        this.avatarSystem = new HeroAvatarSystem();
        this.selectedHero = null;
        this.gameState = null;
        this.isPlaying = false;
        
        this.setupEventListeners();
        this.initializeUI();
    }
    
    setupEventListeners() {
        // Boutons de héros
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('hero-select-btn')) {
                const heroName = e.target.dataset.hero;
                this.selectHero(heroName);
            }
            
            if (e.target.classList.contains('hero-action-btn')) {
                const action = e.target.dataset.action;
                this.executeHeroAction(action);
            }
        });
        
        // Clics sur la carte
        document.addEventListener('click', (e) => {
            if (e.target.id === 'game-canvas') {
                this.handleMapClick(e);
            }
        });
    }
    
    initializeUI() {
        // Créer le panneau de sélection de héros
        this.createHeroSelectionPanel();
        
        // Créer le panneau d'actions
        this.createActionPanel();
        
        // Créer le panneau d'inventaire
        this.createInventoryPanel();
        
        // Créer le panneau de ressources
        this.createResourcePanel();
    }
    
    createHeroSelectionPanel() {
        const container = document.querySelector('.side-panel');
        if (!container) return;
        
        const heroPanel = document.createElement('div');
        heroPanel.className = 'hero-selection-panel';
        heroPanel.innerHTML = `
            <h3>🦸 Sélection de Héros</h3>
            <div class="hero-grid" id="hero-grid">
                ${this.getAvailableHeroes().map(hero => `
                    <button class="hero-select-btn" data-hero="${hero}">
                        <div class="hero-icon">${this.getHeroIcon(hero)}</div>
                        <span class="hero-name">${hero}</span>
                    </button>
                `).join('')}
            </div>
        `;
        
        container.appendChild(heroPanel);
    }
    
    createActionPanel() {
        const container = document.querySelector('.side-panel');
        if (!container) return;
        
        const actionPanel = document.createElement('div');
        actionPanel.className = 'action-panel';
        actionPanel.innerHTML = `
            <h3>⚡ Actions</h3>
            <div class="action-grid" id="action-grid">
                <button class="hero-action-btn" data-action="move">🚶‍♂️ Déplacer</button>
                <button class="hero-action-btn" data-action="attack">⚔️ Attaquer</button>
                <button class="hero-action-btn" data-action="use-artifact">🔮 Artefact</button>
                <button class="hero-action-btn" data-action="psi-state">🌀 ψ-State</button>
                <button class="hero-action-btn" data-action="collapse">💥 Collapse</button>
                <button class="hero-action-btn" data-action="battle">⚔️ Combat</button>
            </div>
            <div class="selected-hero-info" id="selected-hero-info">
                <p>Aucun héros sélectionné</p>
            </div>
        `;
        
        container.appendChild(actionPanel);
    }
    
    createInventoryPanel() {
        const container = document.querySelector('.side-panel');
        if (!container) return;
        
        const inventoryPanel = document.createElement('div');
        inventoryPanel.className = 'inventory-panel';
        inventoryPanel.innerHTML = `
            <h3>🎒 Inventaire</h3>
            <div class="inventory-grid" id="inventory-grid">
                <p>Aucun héros sélectionné</p>
            </div>
        `;
        
        container.appendChild(inventoryPanel);
    }
    
    createResourcePanel() {
        const container = document.querySelector('.side-panel');
        if (!container) return;
        
        const resourcePanel = document.createElement('div');
        resourcePanel.className = 'resource-panel';
        resourcePanel.innerHTML = `
            <h3>💰 Ressources</h3>
            <div class="resource-display">
                <span>💰 500</span>
                <span>⚡ 200</span>
                <span>🪵 100</span>
                <span>🪨 50</span>
                <span>✨ 10</span>
            </div>
            <div class="resource-actions">
                <button class="resource-btn" onclick="window.gameplayConstruction.showBuildingMenu(10, 10)">🏗️ Construire</button>
                <button class="resource-btn" onclick="window.gameplayConstruction.showRecruitmentMenu('BARRACKS')">⚔️ Recruter</button>
            </div>
        `;
        
        container.appendChild(resourcePanel);
    }
    
    getAvailableHeroes() {
        // Liste simplifiée des héros principaux
        return [
            'Arthur', 'Ragnar', 'Merlin', 'Jean-Grofignon', 'Claudius'
        ];
    }
    
    selectHero(heroName) {
        this.selectedHero = heroName;
        
        // Mettre à jour l'interface
        this.updateSelectedHeroInfo();
        this.updateInventory();
        
        // Effet visuel
        document.querySelectorAll('.hero-select-btn').forEach(btn => {
            btn.classList.remove('selected');
            if (btn.dataset.hero === heroName) {
                btn.classList.add('selected');
            }
        });
        
        // Centrer sur le héros
        this.centerOnHero(heroName);
        
        console.log(`Héros sélectionné: ${heroName}`);
    }
    
    updateSelectedHeroInfo() {
        const infoDiv = document.getElementById('selected-hero-info');
        if (!infoDiv || !this.selectedHero) return;
        
        const hero = this.findHeroInGameState(this.selectedHero);
        if (!hero) {
            infoDiv.innerHTML = `<p>Héros ${this.selectedHero} non trouvé dans le jeu</p>`;
            return;
        }
        
        infoDiv.innerHTML = `
            <div class="hero-info">
                <div class="hero-avatar-large">
                    <div class="hero-icon-large">${this.getHeroIcon(this.selectedHero)}</div>
                </div>
                <div class="hero-stats">
                    <h4>${this.selectedHero}</h4>
                    <p>❤️ Santé: ${hero.health}/${hero.maxHealth || 100}</p>
                    <p>⚡ Énergie: ${hero.temporalEnergy}/${hero.maxTemporalEnergy || 100}</p>
                    <p>🚶‍♂️ Mouvement: ${hero.movementPoints}/${hero.maxMovementPoints || 3}</p>
                    <p>📍 Position: (${hero.position.x}, ${hero.position.y})</p>
                    <p>⏰ Timeline: ${hero.timeline}</p>
                </div>
            </div>
        `;
    }
    
    updateInventory() {
        const inventoryDiv = document.getElementById('inventory-grid');
        if (!inventoryDiv || !this.selectedHero) return;
        
        const hero = this.findHeroInGameState(this.selectedHero);
        if (!hero || !hero.inventory || hero.inventory.length === 0) {
            inventoryDiv.innerHTML = '<p>Aucun objet dans l\'inventaire</p>';
            return;
        }
        
        inventoryDiv.innerHTML = `
            <div class="inventory-items">
                ${hero.inventory.map(item => `
                    <div class="inventory-item">
                        <span class="item-icon">🎒</span>
                        <span class="item-name">${item}</span>
                        <button class="use-item-btn" data-item="${item}">Utiliser</button>
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    findHeroInGameState(heroName) {
        if (!this.gameState || !this.gameState.heroes) return null;
        return this.gameState.heroes.find(hero => hero.name === heroName);
    }
    
    centerOnHero(heroName) {
        const hero = this.findHeroInGameState(heroName);
        if (!hero || !window.gameRenderer) return;
        
        window.gameRenderer.centerOnHero(heroName);
    }
    
    getHeroIcon(heroName) {
        const icons = {
            'Arthur': '⚔️',
            'Ragnar': '🛡️',
            'Merlin': '🔮',
            'Jean-Grofignon': '🧠',
            'Claudius': '⚖️'
        };
        return icons[heroName] || '👤';
    }
    
    executeHeroAction(action) {
        if (!this.selectedHero) {
            alert('Veuillez sélectionner un héros d\'abord');
            return;
        }
        
        switch (action) {
            case 'move':
                this.startMovementMode();
                break;
            case 'attack':
                this.startAttackMode();
                break;
            case 'use-artifact':
                this.showArtifactMenu();
                break;
            case 'psi-state':
                this.showPsiStateMenu();
                break;
            case 'collapse':
                this.showCollapseMenu();
                break;
            case 'battle':
                this.startBattleMode();
                break;
        }
    }
    
    startMovementMode() {
        this.isPlaying = true;
        this.currentMode = 'movement';
        
        // Activer le mode clic sur carte
        document.getElementById('game-canvas').style.cursor = 'crosshair';
        
        // Afficher les instructions
        this.showInstructions('Cliquez sur la carte pour déplacer ' + this.selectedHero);
    }
    
    startAttackMode() {
        this.isPlaying = true;
        this.currentMode = 'attack';
        
        document.getElementById('game-canvas').style.cursor = 'crosshair';
        this.showInstructions('Cliquez sur un ennemi pour attaquer');
    }
    
    showArtifactMenu() {
        const hero = this.findHeroInGameState(this.selectedHero);
        if (!hero || !hero.inventory) {
            alert('Aucun artefact disponible');
            return;
        }
        
        const artifacts = hero.inventory.filter(item => 
            item.includes('Blade') || item.includes('Clock') || item.includes('Beacon')
        );
        
        if (artifacts.length === 0) {
            alert('Aucun artefact utilisable');
            return;
        }
        
        const artifact = prompt(`Artefacts disponibles: ${artifacts.join(', ')}\nEntrez le nom de l'artefact à utiliser:`);
        if (artifact && artifacts.includes(artifact)) {
            this.executeScript(`USE(ITEM, ${artifact}, HERO:${this.selectedHero})`);
        }
    }
    
    showPsiStateMenu() {
        const psiState = prompt(`Créer un ψ-state pour ${this.selectedHero}:\nFormat: ψ001: ⊙(Δt+1 @x,y ⟶ ACTION)`);
        if (psiState) {
            this.executeScript(psiState);
        }
    }
    
    showCollapseMenu() {
        const collapse = prompt(`Collapser un ψ-state:\nFormat: †ψ001`);
        if (collapse) {
            this.executeScript(collapse);
        }
    }
    
    startBattleMode() {
        const target = prompt(`Avec qui ${this.selectedHero} doit-il combattre?`);
        if (target) {
            this.executeScript(`BATTLE(${this.selectedHero}, ${target})`);
        }
    }
    
    handleMapClick(event) {
        if (!this.selectedHero) return;
        
        const rect = event.target.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        // Convertir en coordonnées hexagonales
        const hex = window.gameRenderer.pixelToHex(x, y);
        
        // Mode intelligent : détecter automatiquement l'action
        if (this.isPlaying) {
            // Mode action en cours
            switch (this.currentMode) {
                case 'movement':
                    this.executeScript(`MOV(${this.selectedHero}, @${hex.q},${hex.r})`);
                    this.exitMode();
                    break;
                case 'attack':
                    const target = this.findHeroAtPosition(hex.q, hex.r);
                    if (target && target !== this.selectedHero) {
                        this.executeScript(`BATTLE(${this.selectedHero}, ${target})`);
                    } else {
                        alert('Aucun ennemi à cette position');
                    }
                    this.exitMode();
                    break;
            }
        } else {
            // Mode intelligent : détecter automatiquement
            const target = this.findHeroAtPosition(hex.q, hex.r);
            
            if (target) {
                if (target === this.selectedHero) {
                    // Clic sur le héros sélectionné : afficher info
                    this.showHeroInfo(target);
                } else {
                    // Clic sur autre héros : attaquer
                    this.executeScript(`BATTLE(${this.selectedHero}, ${target})`);
                }
            } else {
                // Clic sur case vide : déplacer
                this.executeScript(`MOV(${this.selectedHero}, @${hex.q},${hex.r})`);
            }
        }
    }
    
    showHeroInfo(heroName) {
        const hero = this.findHeroInGameState(heroName);
        if (!hero) return;
        
        const info = `
            🦸 ${heroName}
            ❤️ Santé: ${hero.health}/${hero.maxHealth || 100}
            ⚡ Énergie: ${hero.temporalEnergy}/${hero.maxTemporalEnergy || 100}
            📍 Position: (${hero.position.x}, ${hero.position.y})
        `;
        
        this.showMessage(info, 'info');
    }
    
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
    
    findHeroAtPosition(x, y) {
        if (!this.gameState || !this.gameState.heroes) return null;
        
        const hero = this.gameState.heroes.find(h => 
            h.position.x === x && h.position.y === y
        );
        
        return hero ? hero.name : null;
    }
    
    exitMode() {
        this.isPlaying = false;
        this.currentMode = null;
        document.getElementById('game-canvas').style.cursor = 'default';
        this.hideInstructions();
    }
    
    showInstructions(message) {
        let instructions = document.getElementById('game-instructions');
        if (!instructions) {
            instructions = document.createElement('div');
            instructions.id = 'game-instructions';
            instructions.style.cssText = `
                position: fixed;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                background: rgba(0,0,0,0.8);
                color: white;
                padding: 10px 20px;
                border-radius: 5px;
                z-index: 1000;
                font-size: 14px;
            `;
            document.body.appendChild(instructions);
        }
        instructions.textContent = message;
    }
    
    hideInstructions() {
        const instructions = document.getElementById('game-instructions');
        if (instructions) {
            instructions.remove();
        }
    }
    
    async executeScript(script) {
        if (!window.gameAPI || !window.gameAPI.gameId) {
            alert('Aucun jeu actif');
            return;
        }
        
        try {
            const response = await fetch(`http://localhost:8080/api/temporal/games/${window.gameAPI.gameId}/script`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ script: script })
            });
            
            const result = await response.json();
            
            if (result.success) {
                console.log('Script exécuté:', result);
                this.refreshGameState();
                
                // Afficher le résultat
                if (window.scriptConsole) {
                    window.scriptConsole.addToOutput(`✅ ${script}`, 'success');
                }
            } else {
                console.error('Erreur script:', result.error);
                alert(`Erreur: ${result.error}`);
            }
        } catch (error) {
            console.error('Erreur exécution script:', error);
            alert('Erreur de connexion au serveur');
        }
    }
    
    async refreshGameState() {
        if (!window.gameAPI || !window.gameAPI.gameId) return;
        
        try {
            const response = await fetch(`http://localhost:8080/api/temporal/games/${window.gameAPI.gameId}/state`);
            this.gameState = await response.json();
            
            // Mettre à jour l'affichage
            if (window.gameRenderer) {
                window.gameRenderer.updateState(this.gameState);
            }
            
            // Mettre à jour les infos du héros sélectionné
            if (this.selectedHero) {
                this.updateSelectedHeroInfo();
                this.updateInventory();
            }
        } catch (error) {
            console.error('Erreur rafraîchissement état:', error);
        }
    }
}

// Export pour utilisation globale
window.GameplayEnhancement = GameplayEnhancement; 