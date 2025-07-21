// 👤 INTERFACE DE HÉROS COMPLÈTE - Heroes of Time
// PRIORITÉ 3 : Progression des personnages essentielle

class HeroInterface {
    constructor() {
        this.heroes = [];
        this.selectedHero = null;
        this.isVisible = false;
        this.gameId = null;
        this.init();
    }
    
    async init() {
        await this.loadHeroesData();
        this.createHeroUI();
        this.bindEvents();
        this.updateDisplay();
    }
    
    async loadHeroesData() {
        try {
            // Charger les données depuis l'API backend
            const response = await fetch(`http://localhost:8080/api/temporal/heroes/data`);
            if (response.ok) {
                this.heroes = await response.json();
            } else {
                // Fallback avec données par défaut
                this.heroes = this.getDefaultHeroesData();
            }
        } catch (error) {
            console.log('Erreur chargement données héros, utilisation données par défaut:', error);
            this.heroes = this.getDefaultHeroesData();
        }
    }
    
    getDefaultHeroesData() {
        return [
            {
                id: 1,
                name: "Arthur",
                title: "Roi Temporel",
                level: 5,
                experience: 1250,
                experienceToNext: 2000,
                health: 120,
                maxHealth: 120,
                mana: 80,
                maxMana: 80,
                attack: 15,
                defense: 12,
                magic: 8,
                knowledge: 10,
                movement: 3,
                maxMovement: 3,
                position: { x: 5, y: 5 },
                timeline: "ℬ1",
                inventory: [
                    { id: "sword_excalibur", name: "Excalibur", type: "weapon", attack: 10 },
                    { id: "shield_round", name: "Bouclier Rond", type: "shield", defense: 5 }
                ],
                skills: [
                    { id: "leadership", name: "Leadership", level: 3, maxLevel: 5, description: "+15% attaque pour les unités" },
                    { id: "tactics", name: "Tactique", level: 2, maxLevel: 5, description: "+10% défense pour les unités" },
                    { id: "logistics", name: "Logistique", level: 1, maxLevel: 5, description: "+1 mouvement par jour" }
                ],
                spells: [
                    { id: "heal", name: "Soin", cost: 5, school: "Life", level: 1 },
                    { id: "bless", name: "Bénédiction", cost: 8, school: "Life", level: 2 }
                ]
            },
            {
                id: 2,
                name: "Ragnar",
                title: "Seigneur de Guerre",
                level: 4,
                experience: 800,
                experienceToNext: 1500,
                health: 150,
                maxHealth: 150,
                mana: 40,
                maxMana: 40,
                attack: 18,
                defense: 15,
                magic: 3,
                knowledge: 6,
                movement: 2,
                maxMovement: 2,
                position: { x: 8, y: 3 },
                timeline: "ℬ1",
                inventory: [
                    { id: "axe_battle", name: "Hache de Bataille", type: "weapon", attack: 12 },
                    { id: "armor_plate", name: "Armure de Plaques", type: "armor", defense: 8 }
                ],
                skills: [
                    { id: "offense", name: "Offensive", level: 4, maxLevel: 5, description: "+20% attaque" },
                    { id: "armorer", name: "Armurier", level: 2, maxLevel: 5, description: "+15% défense" },
                    { id: "pathfinding", name: "Orientation", level: 1, maxLevel: 5, description: "Coût de mouvement réduit" }
                ],
                spells: [
                    { id: "rage", name: "Rage", cost: 6, school: "Fire", level: 1 },
                    { id: "fireball", name: "Boule de Feu", cost: 10, school: "Fire", level: 2 }
                ]
            },
            {
                id: 3,
                name: "Merlin",
                title: "Archimage",
                level: 6,
                experience: 2100,
                experienceToNext: 3000,
                health: 80,
                maxHealth: 80,
                mana: 120,
                maxMana: 120,
                attack: 6,
                defense: 8,
                magic: 18,
                knowledge: 16,
                movement: 2,
                maxMovement: 2,
                position: { x: 3, y: 7 },
                timeline: "ℬ1",
                inventory: [
                    { id: "staff_magic", name: "Bâton Magique", type: "weapon", magic: 8 },
                    { id: "robe_archmage", name: "Robe d'Archimage", type: "armor", magic: 5 }
                ],
                skills: [
                    { id: "wisdom", name: "Sagesse", level: 5, maxLevel: 5, description: "+25% mana" },
                    { id: "intelligence", name: "Intelligence", level: 4, maxLevel: 5, description: "+20% puissance magique" },
                    { id: "scholar", name: "Érudit", level: 2, maxLevel: 5, description: "Apprend les sorts plus rapidement" }
                ],
                spells: [
                    { id: "lightning", name: "Éclair", cost: 8, school: "Air", level: 2 },
                    { id: "teleport", name: "Téléportation", cost: 15, school: "Air", level: 3 },
                    { id: "mass_heal", name: "Soin de Masse", cost: 20, school: "Life", level: 3 }
                ]
            }
        ];
    }
    
    createHeroUI() {
        // Créer le conteneur principal
        const heroContainer = document.createElement('div');
        heroContainer.id = 'hero-interface';
        heroContainer.className = 'hero-interface';
        heroContainer.style.display = 'none';
        
        heroContainer.innerHTML = `
            <div class="hero-header">
                <h2>👤 Gestion des Héros</h2>
                <div class="hero-count">${this.heroes.length} héros disponibles</div>
                <button class="close-hero-btn" onclick="heroInterface.hide()">×</button>
            </div>
            
            <div class="hero-content">
                <div class="hero-list-panel">
                    <h3>🗺️ Héros Disponibles</h3>
                    <div class="hero-list" id="hero-list">
                        ${this.heroes.map(hero => `
                            <div class="hero-card" data-hero-id="${hero.id}">
                                <div class="hero-avatar">${this.getHeroAvatar(hero.name)}</div>
                                <div class="hero-basic-info">
                                    <h4>${hero.name}</h4>
                                    <div class="hero-title">${hero.title}</div>
                                    <div class="hero-level">Niveau ${hero.level}</div>
                                    <div class="hero-position">Position: (${hero.position.x}, ${hero.position.y})</div>
                                </div>
                                <div class="hero-status">
                                    <div class="health-bar">
                                        <div class="health-fill" style="width: ${(hero.health / hero.maxHealth) * 100}%"></div>
                                        <span>${hero.health}/${hero.maxHealth}</span>
                                    </div>
                                    <div class="mana-bar">
                                        <div class="mana-fill" style="width: ${(hero.mana / hero.maxMana) * 100}%"></div>
                                        <span>${hero.mana}/${hero.maxMana}</span>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="hero-detail-panel" id="hero-detail-panel">
                    <div class="hero-detail-placeholder">
                        <p>Sélectionnez un héros pour voir ses détails</p>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(heroContainer);
        this.container = heroContainer;
    }
    
    getHeroAvatar(heroName) {
        const avatars = {
            'Arthur': '👑',
            'Ragnar': '⚔️',
            'Merlin': '🧙‍♂️',
            'Jean-Grofignon': '🌀',
            'Claudius': '🎭'
        };
        return avatars[heroName] || '👤';
    }
    
    bindEvents() {
        // Gestion des clics sur les cartes de héros
        document.addEventListener('click', (e) => {
            if (e.target.closest('.hero-card')) {
                const heroCard = e.target.closest('.hero-card');
                const heroId = parseInt(heroCard.dataset.heroId);
                this.selectHero(heroId);
            }
        });
    }
    
    show() {
        this.isVisible = true;
        this.container.style.display = 'block';
        this.updateDisplay();
        console.log('👤 Interface de héros ouverte');
    }
    
    hide() {
        this.isVisible = false;
        this.container.style.display = 'none';
        console.log('👤 Interface de héros fermée');
    }
    
    toggle() {
        if (this.isVisible) {
            this.hide();
        } else {
            this.show();
        }
    }
    
    selectHero(heroId) {
        this.selectedHero = this.heroes.find(hero => hero.id === heroId);
        
        // Mettre à jour la sélection visuelle
        document.querySelectorAll('.hero-card').forEach(card => {
            card.classList.remove('selected');
        });
        
        const selectedCard = document.querySelector(`[data-hero-id="${heroId}"]`);
        if (selectedCard) {
            selectedCard.classList.add('selected');
        }
        
        this.updateHeroDetail();
        console.log(`👤 Héros sélectionné: ${this.selectedHero.name}`);
    }
    
    updateHeroDetail() {
        if (!this.selectedHero) return;
        
        const hero = this.selectedHero;
        const detailPanel = document.getElementById('hero-detail-panel');
        
        detailPanel.innerHTML = `
            <div class="hero-detail-header">
                <div class="hero-detail-avatar">${this.getHeroAvatar(hero.name)}</div>
                <div class="hero-detail-info">
                    <h3>${hero.name}</h3>
                    <div class="hero-detail-title">${hero.title}</div>
                    <div class="hero-detail-level">Niveau ${hero.level}</div>
                </div>
            </div>
            
            <div class="hero-stats-panel">
                <h4>📊 Statistiques</h4>
                <div class="stats-grid">
                    <div class="stat-item">
                        <span class="stat-label">Attaque</span>
                        <span class="stat-value">${hero.attack}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Défense</span>
                        <span class="stat-value">${hero.defense}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Magie</span>
                        <span class="stat-value">${hero.magic}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Connaissance</span>
                        <span class="stat-value">${hero.knowledge}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Mouvement</span>
                        <span class="stat-value">${hero.movement}/${hero.maxMovement}</span>
                    </div>
                </div>
            </div>
            
            <div class="hero-experience-panel">
                <h4>⭐ Expérience</h4>
                <div class="experience-bar">
                    <div class="experience-fill" style="width: ${(hero.experience / hero.experienceToNext) * 100}%"></div>
                    <span>${hero.experience}/${hero.experienceToNext} XP</span>
                </div>
                <button class="level-up-btn" onclick="heroInterface.levelUpHero()" ${hero.experience >= hero.experienceToNext ? '' : 'disabled'}>
                    ${hero.experience >= hero.experienceToNext ? '🎯 Monter de Niveau' : 'XP Insuffisant'}
                </button>
            </div>
            
            <div class="hero-skills-panel">
                <h4>🎯 Compétences</h4>
                <div class="skills-grid">
                    ${hero.skills.map(skill => `
                        <div class="skill-item">
                            <div class="skill-header">
                                <span class="skill-name">${skill.name}</span>
                                <span class="skill-level">${skill.level}/${skill.maxLevel}</span>
                            </div>
                            <div class="skill-description">${skill.description}</div>
                            <button class="upgrade-skill-btn" onclick="heroInterface.upgradeSkill('${skill.id}')" ${skill.level >= skill.maxLevel ? 'disabled' : ''}>
                                ${skill.level >= skill.maxLevel ? 'Niveau Max' : 'Améliorer'}
                            </button>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="hero-spells-panel">
                <h4>🔮 Sorts</h4>
                <div class="spells-grid">
                    ${hero.spells.map(spell => `
                        <div class="spell-item">
                            <div class="spell-header">
                                <span class="spell-name">${spell.name}</span>
                                <span class="spell-school">${spell.school}</span>
                            </div>
                            <div class="spell-info">
                                <span>Coût: ${spell.cost} mana</span>
                                <span>Niveau: ${spell.level}</span>
                            </div>
                            <button class="cast-spell-btn" onclick="heroInterface.castSpell('${spell.id}')" ${hero.mana < spell.cost ? 'disabled' : ''}>
                                ${hero.mana < spell.cost ? 'Mana Insuffisant' : 'Lancer'}
                            </button>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="hero-inventory-panel">
                <h4>🎒 Inventaire</h4>
                <div class="inventory-grid">
                    ${hero.inventory.map(item => `
                        <div class="inventory-item">
                            <div class="item-icon">${this.getItemIcon(item.type)}</div>
                            <div class="item-info">
                                <div class="item-name">${item.name}</div>
                                <div class="item-type">${item.type}</div>
                                ${item.attack ? `<div class="item-stat">+${item.attack} attaque</div>` : ''}
                                ${item.defense ? `<div class="item-stat">+${item.defense} défense</div>` : ''}
                                ${item.magic ? `<div class="item-stat">+${item.magic} magie</div>` : ''}
                            </div>
                            <button class="unequip-btn" onclick="heroInterface.unequipItem('${item.id}')">
                                Retirer
                            </button>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    getItemIcon(itemType) {
        const icons = {
            'weapon': '⚔️',
            'shield': '🛡️',
            'armor': '🦾',
            'artifact': '🔮',
            'potion': '🧪'
        };
        return icons[itemType] || '📦';
    }
    
    levelUpHero() {
        if (!this.selectedHero) return;
        
        const hero = this.selectedHero;
        if (hero.experience < hero.experienceToNext) {
            this.showMessage('❌ Expérience insuffisante pour monter de niveau', 'error');
            return;
        }
        
        // Monter de niveau
        hero.level++;
        hero.experience -= hero.experienceToNext;
        hero.experienceToNext = Math.floor(hero.experienceToNext * 1.5);
        
        // Améliorer les stats
        hero.maxHealth += 10;
        hero.health = hero.maxHealth; // Restaurer la vie
        hero.maxMana += 5;
        hero.mana = hero.maxMana; // Restaurer le mana
        hero.attack += 1;
        hero.defense += 1;
        hero.magic += 1;
        hero.knowledge += 1;
        
        this.updateDisplay();
        this.updateHeroDetail();
        this.showMessage(`🎯 ${hero.name} monte au niveau ${hero.level} !`, 'success');
        
        console.log(`🎯 ${hero.name} monte au niveau ${hero.level}`);
    }
    
    upgradeSkill(skillId) {
        if (!this.selectedHero) return;
        
        const hero = this.selectedHero;
        const skill = hero.skills.find(s => s.id === skillId);
        
        if (!skill || skill.level >= skill.maxLevel) {
            this.showMessage('❌ Impossible d\'améliorer cette compétence', 'error');
            return;
        }
        
        // Améliorer la compétence
        skill.level++;
        
        // Appliquer les effets de la compétence
        this.applySkillEffects(hero, skill);
        
        this.updateDisplay();
        this.updateHeroDetail();
        this.showMessage(`🎯 Compétence ${skill.name} améliorée au niveau ${skill.level}`, 'success');
        
        console.log(`🎯 Compétence ${skill.name} améliorée`);
    }
    
    applySkillEffects(hero, skill) {
        // Appliquer les effets des compétences
        switch (skill.id) {
            case 'leadership':
                // +15% attaque pour les unités (géré par le système de combat)
                break;
            case 'tactics':
                // +10% défense pour les unités (géré par le système de combat)
                break;
            case 'logistics':
                hero.maxMovement += 1;
                hero.movement = hero.maxMovement;
                break;
            case 'offense':
                hero.attack += 2;
                break;
            case 'armorer':
                hero.defense += 2;
                break;
            case 'wisdom':
                hero.maxMana += 10;
                hero.mana = hero.maxMana;
                break;
            case 'intelligence':
                hero.magic += 2;
                break;
        }
    }
    
    castSpell(spellId) {
        if (!this.selectedHero) return;
        
        const hero = this.selectedHero;
        const spell = hero.spells.find(s => s.id === spellId);
        
        if (!spell || hero.mana < spell.cost) {
            this.showMessage('❌ Mana insuffisant pour lancer ce sort', 'error');
            return;
        }
        
        // Consommer le mana
        hero.mana -= spell.cost;
        
        // Effet du sort (simulation)
        let effect = '';
        switch (spell.id) {
            case 'heal':
                const healAmount = 20 + (hero.magic * 2);
                hero.health = Math.min(hero.maxHealth, hero.health + healAmount);
                effect = `Soigne ${healAmount} points de vie`;
                break;
            case 'bless':
                effect = 'Bénédiction lancée sur l\'unité';
                break;
            case 'rage':
                effect = 'Rage lancée sur l\'unité';
                break;
            case 'fireball':
                effect = 'Boule de feu lancée';
                break;
            case 'lightning':
                effect = 'Éclair lancé';
                break;
            case 'teleport':
                effect = 'Téléportation effectuée';
                break;
            case 'mass_heal':
                effect = 'Soin de masse lancé';
                break;
            default:
                effect = 'Sort lancé';
        }
        
        this.updateDisplay();
        this.updateHeroDetail();
        this.showMessage(`🔮 ${spell.name} : ${effect}`, 'success');
        
        console.log(`🔮 ${hero.name} lance ${spell.name}`);
    }
    
    unequipItem(itemId) {
        if (!this.selectedHero) return;
        
        const hero = this.selectedHero;
        const itemIndex = hero.inventory.findIndex(item => item.id === itemId);
        
        if (itemIndex === -1) {
            this.showMessage('❌ Objet non trouvé', 'error');
            return;
        }
        
        const item = hero.inventory[itemIndex];
        
        // Retirer les bonus de l'objet
        if (item.attack) hero.attack -= item.attack;
        if (item.defense) hero.defense -= item.defense;
        if (item.magic) hero.magic -= item.magic;
        
        // Retirer l'objet de l'inventaire
        hero.inventory.splice(itemIndex, 1);
        
        this.updateDisplay();
        this.updateHeroDetail();
        this.showMessage(`🎒 ${item.name} retiré de l'équipement`, 'info');
        
        console.log(`🎒 ${item.name} retiré de ${hero.name}`);
    }
    
    updateDisplay() {
        // Mettre à jour la liste des héros
        this.heroes.forEach(hero => {
            const heroCard = document.querySelector(`[data-hero-id="${hero.id}"]`);
            if (heroCard) {
                // Mettre à jour les barres de vie et mana
                const healthFill = heroCard.querySelector('.health-fill');
                const manaFill = heroCard.querySelector('.mana-fill');
                
                if (healthFill) {
                    healthFill.style.width = `${(hero.health / hero.maxHealth) * 100}%`;
                }
                if (manaFill) {
                    manaFill.style.width = `${(hero.mana / hero.maxMana) * 100}%`;
                }
                
                // Mettre à jour les valeurs
                const healthSpan = heroCard.querySelector('.health-bar span');
                const manaSpan = heroCard.querySelector('.mana-bar span');
                
                if (healthSpan) healthSpan.textContent = `${hero.health}/${hero.maxHealth}`;
                if (manaSpan) manaSpan.textContent = `${hero.mana}/${hero.maxMana}`;
            }
        });
        
        // Mettre à jour les détails si un héros est sélectionné
        if (this.selectedHero) {
            this.updateHeroDetail();
        }
    }
    
    showMessage(message, type = 'info') {
        // Créer un message temporaire
        const messageDiv = document.createElement('div');
        messageDiv.className = `hero-message ${type}`;
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
    getHeroes() {
        return this.heroes;
    }
    
    getHeroById(heroId) {
        return this.heroes.find(hero => hero.id === heroId);
    }
    
    addExperience(heroId, experience) {
        const hero = this.getHeroById(heroId);
        if (hero) {
            hero.experience += experience;
            this.updateDisplay();
        }
    }
    
    // Méthode pour sauvegarder l'état
    saveState() {
        return {
            heroes: this.heroes,
            selectedHero: this.selectedHero,
            isVisible: this.isVisible
        };
    }
    
    // Méthode pour charger l'état
    loadState(state) {
        this.heroes = state.heroes;
        this.selectedHero = state.selectedHero;
        this.isVisible = state.isVisible;
        this.updateDisplay();
        
        if (this.isVisible) {
            this.show();
        }
    }
}

// 🌍 EXPORT POUR UTILISATION GLOBALE
window.HeroInterface = HeroInterface; 