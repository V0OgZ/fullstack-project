// gameplay-construction.js - Système de construction et recrutement
class GameplayConstruction {
    constructor() {
        this.buildings = {
            'CASTLE': {
                name: 'Château',
                icon: '🏰',
                cost: { gold: 100, temporalEnergy: 50 },
                requirements: { level: 1 },
                effects: { defense: 3, temporalEnergy: 2 },
                description: 'Forteresse défensive avec bonus d\'énergie temporelle'
            },
            'TOWER': {
                name: 'Tour',
                icon: '🗼',
                cost: { gold: 50, temporalEnergy: 25 },
                requirements: { level: 1 },
                effects: { defense: 2 },
                description: 'Tour de guet défensive'
            },
            'ANCHOR_TOWER': {
                name: 'Tour d\'Ancrage',
                icon: '⚓',
                cost: { gold: 200, temporalEnergy: 100 },
                requirements: { level: 5 },
                effects: { defense: 1, lockDuration: 5 },
                description: 'Stabilise la timeline et verrouille la zone'
            },
            'BARRACKS': {
                name: 'Caserne',
                icon: '⚔️',
                cost: { gold: 75, temporalEnergy: 30 },
                requirements: { level: 2 },
                effects: { recruitment: true },
                description: 'Permet de recruter des unités militaires'
            },
            'MAGE_TOWER': {
                name: 'Tour de Mage',
                icon: '🔮',
                cost: { gold: 120, temporalEnergy: 60 },
                requirements: { level: 3 },
                effects: { magic: 2, spellResearch: true },
                description: 'Centre de recherche magique et temporelle'
            },
            'QUANTUM_FORGE': {
                name: 'Forge Quantique',
                icon: '⚡',
                cost: { gold: 300, temporalEnergy: 150 },
                requirements: { level: 8 },
                effects: { artifactCrafting: true, quantumBonus: 1 },
                description: 'Forge des artefacts quantiques légendaires'
            }
        };
        
        this.units = {
            'WARRIOR': {
                name: 'Guerrier',
                icon: '🛡️',
                cost: { gold: 20, temporalEnergy: 5 },
                requirements: { building: 'BARRACKS' },
                stats: { attack: 15, defense: 10, health: 80 },
                description: 'Unité de base, équilibrée'
            },
            'ARCHER': {
                name: 'Archer',
                icon: '🏹',
                cost: { gold: 25, temporalEnergy: 8 },
                requirements: { building: 'BARRACKS' },
                stats: { attack: 20, defense: 5, health: 60, range: 3 },
                description: 'Attaque à distance'
            },
            'MAGE': {
                name: 'Mage',
                icon: '🧙‍♂️',
                cost: { gold: 40, temporalEnergy: 15 },
                requirements: { building: 'MAGE_TOWER' },
                stats: { attack: 25, defense: 3, health: 50, magic: 30 },
                description: 'Lance des sorts puissants'
            },
            'QUANTUM_KNIGHT': {
                name: 'Chevalier Quantique',
                icon: '⚔️',
                cost: { gold: 100, temporalEnergy: 50 },
                requirements: { building: 'QUANTUM_FORGE' },
                stats: { attack: 30, defense: 25, health: 150, quantumArmor: 0.8 },
                description: 'Unité d\'élite avec armure quantique'
            },
            'PHOENIX': {
                name: 'Phénix Quantique',
                icon: '🦅',
                cost: { gold: 200, temporalEnergy: 100 },
                requirements: { building: 'QUANTUM_FORGE' },
                stats: { attack: 35, defense: 15, health: 120, quantumRebirth: true },
                description: 'Créature légendaire qui renaît'
            }
        };
        
        this.resources = {
            gold: 500,
            temporalEnergy: 200,
            wood: 100,
            stone: 50,
            quantumEssence: 10
        };
        
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        // Écouter les clics sur la carte pour construction
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('build-button')) {
                this.showBuildingMenu(e.target.dataset.x, e.target.dataset.y);
            }
        });
    }
    
    // Afficher le menu de construction
    showBuildingMenu(x, y) {
        const menu = this.createBuildingMenu(x, y);
        this.showModal(menu, 'Construction');
    }
    
    // Créer le menu de construction
    createBuildingMenu(x, y) {
        let html = `
            <div class="construction-menu">
                <h3>🏗️ Construction à (@${x}, ${y})</h3>
                <div class="resources-display">
                    <span>💰 ${this.resources.gold}</span>
                    <span>⚡ ${this.resources.temporalEnergy}</span>
                    <span>🪵 ${this.resources.wood}</span>
                    <span>🪨 ${this.resources.stone}</span>
                    <span>✨ ${this.resources.quantumEssence}</span>
                </div>
                <div class="buildings-grid">
        `;
        
        Object.entries(this.buildings).forEach(([key, building]) => {
            const canAfford = this.canAfford(building.cost);
            const canBuild = this.canBuild(building.requirements);
            const disabled = !canAfford || !canBuild;
            
            html += `
                <div class="building-card ${disabled ? 'disabled' : ''}" 
                     onclick="${disabled ? '' : `this.buildStructure('${key}', ${x}, ${y})`}">
                    <div class="building-icon">${building.icon}</div>
                    <div class="building-info">
                        <h4>${building.name}</h4>
                        <p>${building.description}</p>
                        <div class="building-cost">
                            ${Object.entries(building.cost).map(([resource, amount]) => 
                                `<span class="${this.resources[resource] >= amount ? 'affordable' : 'expensive'}">${this.getResourceIcon(resource)} ${amount}</span>`
                            ).join('')}
                        </div>
                        <div class="building-effects">
                            ${Object.entries(building.effects).map(([effect, value]) => 
                                `<span class="effect">${this.getEffectIcon(effect)} ${effect}: ${value}</span>`
                            ).join('')}
                        </div>
                    </div>
                </div>
            `;
        });
        
        html += `
                </div>
                <div class="construction-actions">
                    <button onclick="this.closeModal()" class="cancel-button">❌ Annuler</button>
                </div>
            </div>
        `;
        
        return html;
    }
    
    // Afficher le menu de recrutement
    showRecruitmentMenu(buildingType) {
        const menu = this.createRecruitmentMenu(buildingType);
        this.showModal(menu, 'Recrutement');
    }
    
    // Créer le menu de recrutement
    createRecruitmentMenu(buildingType) {
        let html = `
            <div class="recruitment-menu">
                <h3>⚔️ Recrutement - ${this.buildings[buildingType]?.name || buildingType}</h3>
                <div class="resources-display">
                    <span>💰 ${this.resources.gold}</span>
                    <span>⚡ ${this.resources.temporalEnergy}</span>
                </div>
                <div class="units-grid">
        `;
        
        Object.entries(this.units).forEach(([key, unit]) => {
            const canRecruit = this.canRecruitUnit(unit, buildingType);
            const canAfford = this.canAfford(unit.cost);
            const disabled = !canRecruit || !canAfford;
            
            html += `
                <div class="unit-card ${disabled ? 'disabled' : ''}" 
                     onclick="${disabled ? '' : `this.recruitUnit('${key}')`}">
                    <div class="unit-icon">${unit.icon}</div>
                    <div class="unit-info">
                        <h4>${unit.name}</h4>
                        <p>${unit.description}</p>
                        <div class="unit-cost">
                            ${Object.entries(unit.cost).map(([resource, amount]) => 
                                `<span class="${this.resources[resource] >= amount ? 'affordable' : 'expensive'}">${this.getResourceIcon(resource)} ${amount}</span>`
                            ).join('')}
                        </div>
                        <div class="unit-stats">
                            ${Object.entries(unit.stats).map(([stat, value]) => 
                                `<span class="stat">${this.getStatIcon(stat)} ${stat}: ${value}</span>`
                            ).join('')}
                        </div>
                    </div>
                </div>
            `;
        });
        
        html += `
                </div>
                <div class="recruitment-actions">
                    <button onclick="this.closeModal()" class="cancel-button">❌ Fermer</button>
                </div>
            </div>
        `;
        
        return html;
    }
    
    // Construire un bâtiment
    async buildStructure(buildingType, x, y) {
        const building = this.buildings[buildingType];
        if (!building) {
            console.error('Bâtiment inconnu:', buildingType);
            return;
        }
        
        if (!this.canAfford(building.cost)) {
            this.showMessage('❌ Ressources insuffisantes!', 'error');
            return;
        }
        
        if (!this.canBuild(building.requirements)) {
            this.showMessage('❌ Conditions non remplies!', 'error');
            return;
        }
        
        // Consommer les ressources
        this.spendResources(building.cost);
        
        // Appeler l'API backend
        try {
            const response = await fetch(`/api/temporal/games/${window.gameAPI.gameId}/script`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    script: `BUILD(${buildingType}, @${x},${y})`
                })
            });
            
            const result = await response.json();
            if (result.success) {
                this.showMessage(`✅ ${building.name} construit avec succès!`, 'success');
                this.closeModal();
                // Rafraîchir l'état du jeu
                if (window.gameplayEnhancement) {
                    window.gameplayEnhancement.refreshGameState();
                }
            } else {
                this.showMessage(`❌ Erreur: ${result.error}`, 'error');
                // Rembourser les ressources
                this.addResources(building.cost);
            }
        } catch (error) {
            console.error('Erreur construction:', error);
            this.showMessage('❌ Erreur de connexion', 'error');
            // Rembourser les ressources
            this.addResources(building.cost);
        }
    }
    
    // Recruter une unité
    async recruitUnit(unitType) {
        const unit = this.units[unitType];
        if (!unit) {
            console.error('Unité inconnue:', unitType);
            return;
        }
        
        if (!this.canAfford(unit.cost)) {
            this.showMessage('❌ Ressources insuffisantes!', 'error');
            return;
        }
        
        // Consommer les ressources
        this.spendResources(unit.cost);
        
        // Appeler l'API backend
        try {
            const response = await fetch(`/api/temporal/games/${window.gameAPI.gameId}/script`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    script: `RECRUIT(${unitType}, 1, HERO:${window.gameplayEnhancement?.selectedHero?.name || 'Arthur'})`
                })
            });
            
            const result = await response.json();
            if (result.success) {
                this.showMessage(`✅ ${unit.name} recruté avec succès!`, 'success');
                this.closeModal();
                // Rafraîchir l'état du jeu
                if (window.gameplayEnhancement) {
                    window.gameplayEnhancement.refreshGameState();
                }
            } else {
                this.showMessage(`❌ Erreur: ${result.error}`, 'error');
                // Rembourser les ressources
                this.addResources(unit.cost);
            }
        } catch (error) {
            console.error('Erreur recrutement:', error);
            this.showMessage('❌ Erreur de connexion', 'error');
            // Rembourser les ressources
            this.addResources(unit.cost);
        }
    }
    
    // Vérifier si on peut se permettre le coût
    canAfford(cost) {
        return Object.entries(cost).every(([resource, amount]) => 
            this.resources[resource] >= amount
        );
    }
    
    // Vérifier si on peut construire (niveau requis)
    canBuild(requirements) {
        // Pour l'instant, on suppose que le niveau 1 est toujours disponible
        return true;
    }
    
    // Vérifier si on peut recruter l'unité
    canRecruitUnit(unit, buildingType) {
        return unit.requirements.building === buildingType;
    }
    
    // Consommer des ressources
    spendResources(cost) {
        Object.entries(cost).forEach(([resource, amount]) => {
            this.resources[resource] -= amount;
        });
    }
    
    // Ajouter des ressources (remboursement)
    addResources(cost) {
        Object.entries(cost).forEach(([resource, amount]) => {
            this.resources[resource] += amount;
        });
    }
    
    // Obtenir l'icône d'une ressource
    getResourceIcon(resource) {
        const icons = {
            gold: '💰',
            temporalEnergy: '⚡',
            wood: '🪵',
            stone: '🪨',
            quantumEssence: '✨'
        };
        return icons[resource] || '📦';
    }
    
    // Obtenir l'icône d'un effet
    getEffectIcon(effect) {
        const icons = {
            defense: '🛡️',
            temporalEnergy: '⚡',
            lockDuration: '🔒',
            recruitment: '⚔️',
            magic: '🔮',
            spellResearch: '📚',
            artifactCrafting: '⚡',
            quantumBonus: '✨'
        };
        return icons[effect] || '📊';
    }
    
    // Obtenir l'icône d'une statistique
    getStatIcon(stat) {
        const icons = {
            attack: '⚔️',
            defense: '🛡️',
            health: '❤️',
            range: '🏹',
            magic: '🔮',
            quantumArmor: '✨',
            quantumRebirth: '🔄'
        };
        return icons[stat] || '📊';
    }
    
    // Afficher une modal
    showModal(content, title) {
        const modal = document.createElement('div');
        modal.className = 'game-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>${title}</h2>
                    <button onclick="this.closeModal()" class="close-button">×</button>
                </div>
                <div class="modal-body">
                    ${content}
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Ajouter la méthode closeModal au contexte global
        window.closeModal = () => {
            document.body.removeChild(modal);
        };
    }
    
    // Afficher un message
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
    
    // Mettre à jour l'affichage des ressources
    updateResourceDisplay() {
        const resourceDisplay = document.querySelector('.resource-display');
        if (resourceDisplay) {
            resourceDisplay.innerHTML = `
                <span>💰 ${this.resources.gold}</span>
                <span>⚡ ${this.resources.temporalEnergy}</span>
                <span>🪵 ${this.resources.wood}</span>
                <span>🪨 ${this.resources.stone}</span>
                <span>✨ ${this.resources.quantumEssence}</span>
            `;
        }
    }
    
    // Ajouter des boutons de construction à la carte
    addConstructionButtons() {
        const gameCanvas = document.getElementById('game-canvas');
        if (!gameCanvas) return;
        
        // Ajouter des boutons de construction sur la carte
        // Cette méthode sera appelée après le rendu de la carte
    }
}

// Export pour utilisation globale
window.GameplayConstruction = GameplayConstruction; 