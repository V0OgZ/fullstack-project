// 🏛️ INTERFACE DE VILLE SIMPLIFIÉE - Heroes of Time
// PRIORITÉ 1 : Core gameplay manquant

class CityInterface {
    constructor() {
        this.cityData = null;
        this.selectedBuilding = null;
        this.isVisible = false;
        this.gameId = null;
        this.init();
    }
    
    async init() {
        await this.loadCityData();
        this.createCityUI();
        this.bindEvents();
        this.updateDisplay();
    }
    
    async loadCityData() {
        try {
            // Charger les données depuis l'API backend
            const response = await fetch(`http://localhost:8080/api/temporal/city/data`);
            if (response.ok) {
                this.cityData = await response.json();
            } else {
                // Fallback avec données par défaut si l'API n'est pas disponible
                this.cityData = this.getDefaultCityData();
            }
        } catch (error) {
            console.log('Erreur chargement données ville, utilisation données par défaut:', error);
            this.cityData = this.getDefaultCityData();
        }
    }
    
    getDefaultCityData() {
        return {
            name: "Ville d'Arthur",
            level: 1,
            resources: {
                gold: 1000,
                wood: 500,
                stone: 300,
                mana: 100
            },
            buildings: {
                townHall: { level: 1, maxLevel: 5, cost: { gold: 200, wood: 100, stone: 50 } },
                barracks: { level: 0, maxLevel: 3, cost: { gold: 150, wood: 80, stone: 40 } },
                tower: { level: 0, maxLevel: 3, cost: { gold: 120, wood: 60, stone: 30 } },
                mageTower: { level: 0, maxLevel: 2, cost: { gold: 300, wood: 150, stone: 100 } }
            },
            income: {
                gold: 50,
                wood: 20,
                stone: 10,
                mana: 5
            }
        };
    }
    
    async saveCityData() {
        try {
            const response = await fetch(`http://localhost:8080/api/temporal/city/save`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.cityData)
            });
            
            if (response.ok) {
                console.log('✅ Données ville sauvegardées');
            } else {
                console.error('❌ Erreur sauvegarde ville');
            }
        } catch (error) {
            console.error('Erreur sauvegarde ville:', error);
        }
    }
    
    createCityUI() {
        // Créer le conteneur principal
        const cityContainer = document.createElement('div');
        cityContainer.id = 'city-interface';
        cityContainer.className = 'city-interface';
        cityContainer.style.display = 'none';
        
        cityContainer.innerHTML = `
            <div class="city-header">
                <h2>🏛️ ${this.cityData.name}</h2>
                <div class="city-level">Niveau ${this.cityData.level}</div>
                <button class="close-city-btn" onclick="cityInterface.hide()">×</button>
            </div>
            
            <div class="city-content">
                <div class="resources-panel">
                    <h3>💰 Ressources</h3>
                    <div class="resources-grid">
                        <div class="resource-item">
                            <span class="resource-icon">🪙</span>
                            <span class="resource-name">Or</span>
                            <span class="resource-amount" id="gold-amount">${this.cityData.resources.gold}</span>
                            <span class="resource-income">+${this.cityData.income.gold}/tour</span>
                        </div>
                        <div class="resource-item">
                            <span class="resource-icon">🪵</span>
                            <span class="resource-name">Bois</span>
                            <span class="resource-amount" id="wood-amount">${this.cityData.resources.wood}</span>
                            <span class="resource-income">+${this.cityData.income.wood}/tour</span>
                        </div>
                        <div class="resource-item">
                            <span class="resource-icon">🪨</span>
                            <span class="resource-name">Pierre</span>
                            <span class="resource-amount" id="stone-amount">${this.cityData.resources.stone}</span>
                            <span class="resource-income">+${this.cityData.income.stone}/tour</span>
                        </div>
                        <div class="resource-item">
                            <span class="resource-icon">🔮</span>
                            <span class="resource-name">Mana</span>
                            <span class="resource-amount" id="mana-amount">${this.cityData.resources.mana}</span>
                            <span class="resource-income">+${this.cityData.income.mana}/tour</span>
                        </div>
                    </div>
                </div>
                
                <div class="buildings-panel">
                    <h3>🏗️ Bâtiments</h3>
                    <div class="buildings-grid">
                        <div class="building-card" data-building="townHall">
                            <div class="building-icon">🏛️</div>
                            <div class="building-info">
                                <h4>Hôtel de Ville</h4>
                                <div class="building-level">Niveau ${this.cityData.buildings.townHall.level}/${this.cityData.buildings.townHall.maxLevel}</div>
                                <div class="building-effects">
                                    <span>+${this.cityData.buildings.townHall.level * 10} or/tour</span>
                                    <span>+${this.cityData.buildings.townHall.level * 2} héros max</span>
                                </div>
                            </div>
                            <button class="upgrade-btn" onclick="cityInterface.upgradeBuilding('townHall')">
                                Améliorer (${this.cityData.buildings.townHall.cost.gold}🪙)
                            </button>
                        </div>
                        
                        <div class="building-card" data-building="barracks">
                            <div class="building-icon">⚔️</div>
                            <div class="building-info">
                                <h4>Caserne</h4>
                                <div class="building-level">Niveau ${this.cityData.buildings.barracks.level}/${this.cityData.buildings.barracks.maxLevel}</div>
                                <div class="building-effects">
                                    <span>+${this.cityData.buildings.barracks.level * 5} unités/tour</span>
                                    <span>+${this.cityData.buildings.barracks.level * 10}% attaque</span>
                                </div>
                            </div>
                            <button class="upgrade-btn" onclick="cityInterface.upgradeBuilding('barracks')">
                                ${this.cityData.buildings.barracks.level === 0 ? 'Construire' : 'Améliorer'} (${this.cityData.buildings.barracks.cost.gold}🪙)
                            </button>
                        </div>
                        
                        <div class="building-card" data-building="tower">
                            <div class="building-icon">🗼</div>
                            <div class="building-info">
                                <h4>Tour de Défense</h4>
                                <div class="building-level">Niveau ${this.cityData.buildings.tower.level}/${this.cityData.buildings.tower.maxLevel}</div>
                                <div class="building-effects">
                                    <span>+${this.cityData.buildings.tower.level * 15}% défense</span>
                                    <span>+${this.cityData.buildings.tower.level * 2} portée</span>
                                </div>
                            </div>
                            <button class="upgrade-btn" onclick="cityInterface.upgradeBuilding('tower')">
                                ${this.cityData.buildings.tower.level === 0 ? 'Construire' : 'Améliorer'} (${this.cityData.buildings.tower.cost.gold}🪙)
                            </button>
                        </div>
                        
                        <div class="building-card" data-building="mageTower">
                            <div class="building-icon">🧙‍♂️</div>
                            <div class="building-info">
                                <h4>Tour des Mages</h4>
                                <div class="building-level">Niveau ${this.cityData.buildings.mageTower.level}/${this.cityData.buildings.mageTower.maxLevel}</div>
                                <div class="building-effects">
                                    <span>+${this.cityData.buildings.mageTower.level * 10} mana/tour</span>
                                    <span>+${this.cityData.buildings.mageTower.level * 15}% puissance magique</span>
                                </div>
                            </div>
                            <button class="upgrade-btn" onclick="cityInterface.upgradeBuilding('mageTower')">
                                ${this.cityData.buildings.mageTower.level === 0 ? 'Construire' : 'Améliorer'} (${this.cityData.buildings.mageTower.cost.gold}🪙)
                            </button>
                        </div>
                    </div>
                </div>
                
                <div class="city-actions">
                    <button class="action-btn primary" onclick="cityInterface.collectIncome()">
                        💰 Collecter Revenus
                    </button>
                    <button class="action-btn secondary" onclick="cityInterface.nextTurn()">
                        ⏰ Tour Suivant
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(cityContainer);
        this.container = cityContainer;
    }
    
    bindEvents() {
        // Gestion des clics sur les bâtiments
        document.addEventListener('click', (e) => {
            if (e.target.closest('.building-card')) {
                const buildingCard = e.target.closest('.building-card');
                const buildingType = buildingCard.dataset.building;
                this.selectBuilding(buildingType);
            }
        });
    }
    
    show() {
        this.isVisible = true;
        this.container.style.display = 'block';
        this.updateDisplay();
        console.log('🏛️ Interface de ville ouverte');
    }
    
    hide() {
        this.isVisible = false;
        this.container.style.display = 'none';
        console.log('🏛️ Interface de ville fermée');
    }
    
    toggle() {
        if (this.isVisible) {
            this.hide();
        } else {
            this.show();
        }
    }
    
    selectBuilding(buildingType) {
        this.selectedBuilding = buildingType;
        
        // Mettre à jour la sélection visuelle
        document.querySelectorAll('.building-card').forEach(card => {
            card.classList.remove('selected');
        });
        
        const selectedCard = document.querySelector(`[data-building="${buildingType}"]`);
        if (selectedCard) {
            selectedCard.classList.add('selected');
        }
        
        console.log(`🏗️ Bâtiment sélectionné: ${buildingType}`);
    }
    
    upgradeBuilding(buildingType) {
        const building = this.cityData.buildings[buildingType];
        const cost = building.cost;
        
        // Vérifier si on peut payer
        if (this.cityData.resources.gold < cost.gold ||
            this.cityData.resources.wood < cost.wood ||
            this.cityData.resources.stone < cost.stone) {
            this.showMessage('❌ Ressources insuffisantes pour cette amélioration', 'error');
            return;
        }
        
        // Vérifier le niveau maximum
        if (building.level >= building.maxLevel) {
            this.showMessage('❌ Niveau maximum atteint', 'error');
            return;
        }
        
        // Effectuer l'amélioration
        this.cityData.resources.gold -= cost.gold;
        this.cityData.resources.wood -= cost.wood;
        this.cityData.resources.stone -= cost.stone;
        
        building.level++;
        
        // Augmenter les coûts pour le prochain niveau
        cost.gold = Math.floor(cost.gold * 1.5);
        cost.wood = Math.floor(cost.wood * 1.3);
        cost.stone = Math.floor(cost.stone * 1.2);
        
        this.updateDisplay();
        this.showMessage(`✅ ${buildingType} amélioré au niveau ${building.level}`, 'success');
        
        // Mettre à jour les revenus
        this.updateIncome();
        
        console.log(`🏗️ ${buildingType} amélioré au niveau ${building.level}`);
    }
    
    collectIncome() {
        this.cityData.resources.gold += this.cityData.income.gold;
        this.cityData.resources.wood += this.cityData.income.wood;
        this.cityData.resources.stone += this.cityData.income.stone;
        this.cityData.resources.mana += this.cityData.income.mana;
        
        this.updateDisplay();
        this.showMessage(`💰 Revenus collectés: +${this.cityData.income.gold}🪙 +${this.cityData.income.wood}🪵 +${this.cityData.income.stone}🪨 +${this.cityData.income.mana}🔮`, 'success');
        
        console.log('💰 Revenus collectés');
    }
    
    nextTurn() {
        // Collecter automatiquement les revenus
        this.collectIncome();
        
        // Logique du tour suivant
        this.showMessage('⏰ Tour suivant - Ville mise à jour', 'info');
        
        console.log('⏰ Tour suivant');
    }
    
    updateIncome() {
        // Recalculer les revenus basés sur les niveaux des bâtiments
        this.cityData.income.gold = 50 + (this.cityData.buildings.townHall.level * 10);
        this.cityData.income.wood = 20 + (this.cityData.buildings.barracks.level * 5);
        this.cityData.income.stone = 10 + (this.cityData.buildings.tower.level * 3);
        this.cityData.income.mana = 5 + (this.cityData.buildings.mageTower.level * 10);
    }
    
    updateDisplay() {
        // Mettre à jour les ressources
        document.getElementById('gold-amount').textContent = this.cityData.resources.gold;
        document.getElementById('wood-amount').textContent = this.cityData.resources.wood;
        document.getElementById('stone-amount').textContent = this.cityData.resources.stone;
        document.getElementById('mana-amount').textContent = this.cityData.resources.mana;
        
        // Mettre à jour les revenus
        document.querySelectorAll('.resource-income').forEach((income, index) => {
            const values = [this.cityData.income.gold, this.cityData.income.wood, this.cityData.income.stone, this.cityData.income.mana];
            income.textContent = `+${values[index]}/tour`;
        });
        
        // Mettre à jour les bâtiments
        Object.keys(this.cityData.buildings).forEach(buildingType => {
            const building = this.cityData.buildings[buildingType];
            const card = document.querySelector(`[data-building="${buildingType}"]`);
            
            if (card) {
                // Mettre à jour le niveau
                const levelElement = card.querySelector('.building-level');
                levelElement.textContent = `Niveau ${building.level}/${building.maxLevel}`;
                
                // Mettre à jour les effets
                const effectsElement = card.querySelector('.building-effects');
                this.updateBuildingEffects(effectsElement, buildingType, building.level);
                
                // Mettre à jour le bouton
                const button = card.querySelector('.upgrade-btn');
                const cost = building.cost;
                button.textContent = `${building.level === 0 ? 'Construire' : 'Améliorer'} (${cost.gold}🪙)`;
                
                // Désactiver si niveau max
                if (building.level >= building.maxLevel) {
                    button.disabled = true;
                    button.textContent = 'Niveau Max';
                } else {
                    button.disabled = false;
                }
            }
        });
    }
    
    updateBuildingEffects(effectsElement, buildingType, level) {
        const effects = {
            townHall: [
                `+${level * 10} or/tour`,
                `+${level * 2} héros max`
            ],
            barracks: [
                `+${level * 5} unités/tour`,
                `+${level * 10}% attaque`
            ],
            tower: [
                `+${level * 15}% défense`,
                `+${level * 2} portée`
            ],
            mageTower: [
                `+${level * 10} mana/tour`,
                `+${level * 15}% puissance magique`
            ]
        };
        
        effectsElement.innerHTML = effects[buildingType].map(effect => `<span>${effect}</span>`).join('');
    }
    
    showMessage(message, type = 'info') {
        // Créer un message temporaire
        const messageDiv = document.createElement('div');
        messageDiv.className = `city-message ${type}`;
        messageDiv.textContent = message;
        
        this.container.appendChild(messageDiv);
        
        // Animer l'apparition
        setTimeout(() => messageDiv.classList.add('show'), 10);
        
        // Supprimer après 3 secondes
        setTimeout(() => {
            messageDiv.classList.remove('show');
            setTimeout(() => messageDiv.remove(), 300);
        }, 3000);
    }
    
    // Méthodes pour l'intégration avec le jeu principal
    getCityData() {
        return this.cityData;
    }
    
    setCityData(data) {
        this.cityData = { ...this.cityData, ...data };
        this.updateDisplay();
    }
    
    // Méthode pour sauvegarder l'état
    saveState() {
        return {
            cityData: this.cityData,
            isVisible: this.isVisible
        };
    }
    
    // Méthode pour charger l'état
    loadState(state) {
        this.cityData = state.cityData;
        this.isVisible = state.isVisible;
        this.updateDisplay();
        
        if (this.isVisible) {
            this.show();
        }
    }
}

// 🌍 EXPORT POUR UTILISATION GLOBALE
window.CityInterface = CityInterface; 