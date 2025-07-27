/**
 * 👤 INTERFACE DE HÉROS - Heroes of Time
 * 
 * Fiche de héros avec stats, inventaire et progression
 */

class HeroInterface {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.currentHero = null;
        this.inventory = [];
        
        this.init();
    }
    
    init() {
        this.createUI();
        this.bindEvents();
        this.loadTestHero();
    }
    
    createUI() {
        this.container.innerHTML = `
            <div class="hero-interface">
                <!-- Portrait et infos principales -->
                <div class="hero-header">
                    <div class="hero-portrait">
                        <div class="portrait-frame">
                            <span class="hero-icon">👤</span>
                        </div>
                        <div class="level-badge">Niv. 1</div>
                    </div>
                    
                    <div class="hero-main-info">
                        <h2 class="hero-name">Héros</h2>
                        <p class="hero-class">Classe</p>
                        <div class="hero-bars">
                            <div class="bar hp-bar">
                                <div class="bar-label">HP</div>
                                <div class="bar-container">
                                    <div class="bar-fill hp-fill"></div>
                                    <span class="bar-text">100/100</span>
                                </div>
                            </div>
                            <div class="bar mp-bar">
                                <div class="bar-label">MP</div>
                                <div class="bar-container">
                                    <div class="bar-fill mp-fill"></div>
                                    <span class="bar-text">50/50</span>
                                </div>
                            </div>
                            <div class="bar xp-bar">
                                <div class="bar-label">XP</div>
                                <div class="bar-container">
                                    <div class="bar-fill xp-fill"></div>
                                    <span class="bar-text">0/1000</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Stats détaillées -->
                <div class="hero-stats">
                    <h3>📊 Statistiques</h3>
                    <div class="stats-grid">
                        <div class="stat-item">
                            <span class="stat-icon">⚔️</span>
                            <span class="stat-name">Attaque</span>
                            <span class="stat-value" id="stat-attack">10</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-icon">🛡️</span>
                            <span class="stat-name">Défense</span>
                            <span class="stat-value" id="stat-defense">10</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-icon">🏃</span>
                            <span class="stat-name">Vitesse</span>
                            <span class="stat-value" id="stat-speed">10</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-icon">🎯</span>
                            <span class="stat-name">Précision</span>
                            <span class="stat-value" id="stat-accuracy">10</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-icon">🍀</span>
                            <span class="stat-name">Chance</span>
                            <span class="stat-value" id="stat-luck">10</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-icon">✨</span>
                            <span class="stat-name">Magie</span>
                            <span class="stat-value" id="stat-magic">10</span>
                        </div>
                    </div>
                </div>
                
                <!-- Compétences -->
                <div class="hero-skills">
                    <h3>🔥 Compétences</h3>
                    <div class="skills-list" id="skills-list">
                        <!-- Les compétences seront générées ici -->
                    </div>
                </div>
                
                <!-- Équipement -->
                <div class="hero-equipment">
                    <h3>⚔️ Équipement</h3>
                    <div class="equipment-slots">
                        <div class="equipment-slot" data-slot="weapon">
                            <span class="slot-icon">🗡️</span>
                            <span class="slot-name">Arme</span>
                            <div class="slot-item" id="slot-weapon">Vide</div>
                        </div>
                        <div class="equipment-slot" data-slot="armor">
                            <span class="slot-icon">🛡️</span>
                            <span class="slot-name">Armure</span>
                            <div class="slot-item" id="slot-armor">Vide</div>
                        </div>
                        <div class="equipment-slot" data-slot="accessory">
                            <span class="slot-icon">💍</span>
                            <span class="slot-name">Accessoire</span>
                            <div class="slot-item" id="slot-accessory">Vide</div>
                        </div>
                        <div class="equipment-slot" data-slot="artifact">
                            <span class="slot-icon">🔮</span>
                            <span class="slot-name">Artefact</span>
                            <div class="slot-item" id="slot-artifact">Vide</div>
                        </div>
                    </div>
                </div>
                
                <!-- Inventaire -->
                <div class="hero-inventory">
                    <h3>🎒 Inventaire</h3>
                    <div class="inventory-grid" id="inventory-grid">
                        <!-- Les items seront générés ici -->
                    </div>
                </div>
                
                <!-- Actions -->
                <div class="hero-actions">
                    <button onclick="heroInterface.levelUp()">⬆️ Monter de Niveau</button>
                    <button onclick="heroInterface.restoreHP()">💚 Soigner</button>
                    <button onclick="heroInterface.restoreMP()">💙 Restaurer Mana</button>
                    <button onclick="heroInterface.showDetails()">📜 Détails Complets</button>
                </div>
            </div>
        `;
        
        this.addStyles();
    }
    
    addStyles() {
        if (document.getElementById('hero-interface-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'hero-interface-styles';
        style.textContent = `
            .hero-interface {
                background: rgba(0, 0, 0, 0.8);
                border: 2px solid #4a7c7e;
                border-radius: 10px;
                padding: 20px;
                color: #eee;
                max-width: 800px;
                margin: 0 auto;
            }
            
            /* Header */
            .hero-header {
                display: flex;
                gap: 20px;
                margin-bottom: 30px;
                background: rgba(74, 124, 126, 0.1);
                padding: 20px;
                border-radius: 10px;
            }
            
            .hero-portrait {
                position: relative;
            }
            
            .portrait-frame {
                width: 120px;
                height: 120px;
                border: 3px solid #c7f464;
                border-radius: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                background: rgba(0, 0, 0, 0.5);
                font-size: 60px;
            }
            
            .level-badge {
                position: absolute;
                bottom: -10px;
                right: -10px;
                background: #c7f464;
                color: #000;
                padding: 5px 10px;
                border-radius: 20px;
                font-weight: bold;
                font-size: 14px;
            }
            
            .hero-main-info {
                flex: 1;
            }
            
            .hero-name {
                margin: 0;
                color: #c7f464;
                font-size: 2em;
            }
            
            .hero-class {
                margin: 5px 0 15px 0;
                color: #4a7c7e;
                font-size: 1.2em;
            }
            
            /* Barres */
            .hero-bars {
                display: flex;
                flex-direction: column;
                gap: 10px;
            }
            
            .bar {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .bar-label {
                width: 30px;
                font-weight: bold;
            }
            
            .bar-container {
                flex: 1;
                height: 20px;
                background: rgba(0, 0, 0, 0.5);
                border: 1px solid #4a7c7e;
                border-radius: 10px;
                position: relative;
                overflow: hidden;
            }
            
            .bar-fill {
                height: 100%;
                transition: width 0.3s ease;
            }
            
            .hp-fill {
                background: linear-gradient(90deg, #e74c3c, #c0392b);
                width: 100%;
            }
            
            .mp-fill {
                background: linear-gradient(90deg, #3498db, #2980b9);
                width: 100%;
            }
            
            .xp-fill {
                background: linear-gradient(90deg, #f39c12, #d68910);
                width: 0%;
            }
            
            .bar-text {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                font-size: 12px;
                font-weight: bold;
                text-shadow: 1px 1px 2px rgba(0,0,0,0.8);
            }
            
            /* Stats */
            .hero-stats {
                background: rgba(255, 255, 255, 0.05);
                padding: 20px;
                border-radius: 10px;
                margin-bottom: 20px;
            }
            
            .hero-stats h3 {
                margin: 0 0 15px 0;
                color: #c7f464;
            }
            
            .stats-grid {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 15px;
            }
            
            .stat-item {
                display: flex;
                align-items: center;
                gap: 10px;
                background: rgba(0, 0, 0, 0.3);
                padding: 10px;
                border-radius: 5px;
            }
            
            .stat-icon {
                font-size: 20px;
            }
            
            .stat-name {
                flex: 1;
                font-size: 14px;
            }
            
            .stat-value {
                font-weight: bold;
                color: #c7f464;
                font-size: 18px;
            }
            
            /* Compétences */
            .hero-skills {
                background: rgba(255, 255, 255, 0.05);
                padding: 20px;
                border-radius: 10px;
                margin-bottom: 20px;
            }
            
            .hero-skills h3 {
                margin: 0 0 15px 0;
                color: #c7f464;
            }
            
            .skill-item {
                background: rgba(0, 0, 0, 0.3);
                padding: 10px;
                border-radius: 5px;
                margin-bottom: 10px;
                display: flex;
                align-items: center;
                gap: 15px;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .skill-item:hover {
                background: rgba(74, 124, 126, 0.3);
                transform: translateX(5px);
            }
            
            .skill-icon {
                font-size: 24px;
            }
            
            .skill-info {
                flex: 1;
            }
            
            .skill-name {
                font-weight: bold;
                color: #c7f464;
            }
            
            .skill-desc {
                font-size: 12px;
                color: #aaa;
            }
            
            .skill-cost {
                color: #3498db;
                font-size: 14px;
            }
            
            /* Équipement */
            .hero-equipment {
                background: rgba(255, 255, 255, 0.05);
                padding: 20px;
                border-radius: 10px;
                margin-bottom: 20px;
            }
            
            .hero-equipment h3 {
                margin: 0 0 15px 0;
                color: #c7f464;
            }
            
            .equipment-slots {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 15px;
            }
            
            .equipment-slot {
                background: rgba(0, 0, 0, 0.3);
                padding: 15px;
                border-radius: 5px;
                text-align: center;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .equipment-slot:hover {
                background: rgba(74, 124, 126, 0.3);
            }
            
            .slot-icon {
                font-size: 30px;
                display: block;
                margin-bottom: 5px;
            }
            
            .slot-name {
                font-size: 12px;
                color: #aaa;
                display: block;
                margin-bottom: 5px;
            }
            
            .slot-item {
                font-weight: bold;
                color: #c7f464;
            }
            
            /* Inventaire */
            .hero-inventory {
                background: rgba(255, 255, 255, 0.05);
                padding: 20px;
                border-radius: 10px;
                margin-bottom: 20px;
            }
            
            .hero-inventory h3 {
                margin: 0 0 15px 0;
                color: #c7f464;
            }
            
            .inventory-grid {
                display: grid;
                grid-template-columns: repeat(8, 1fr);
                gap: 5px;
                min-height: 100px;
            }
            
            .inventory-slot {
                width: 50px;
                height: 50px;
                background: rgba(0, 0, 0, 0.3);
                border: 1px solid #4a7c7e;
                border-radius: 5px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: all 0.2s ease;
            }
            
            .inventory-slot:hover {
                background: rgba(74, 124, 126, 0.3);
                transform: scale(1.1);
            }
            
            .inventory-slot.filled {
                background: rgba(74, 124, 126, 0.2);
            }
            
            .item-icon {
                font-size: 24px;
            }
            
            /* Actions */
            .hero-actions {
                display: flex;
                gap: 10px;
                flex-wrap: wrap;
                justify-content: center;
            }
            
            .hero-actions button {
                background: #4a7c7e;
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 5px;
                font-size: 16px;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .hero-actions button:hover {
                background: #5a8c8e;
                transform: translateY(-2px);
            }
        `;
        
        document.head.appendChild(style);
    }
    
    bindEvents() {
        // Drag & Drop pour l'équipement
        const slots = this.container.querySelectorAll('.equipment-slot');
        slots.forEach(slot => {
            slot.addEventListener('click', () => this.selectEquipmentSlot(slot));
        });
    }
    
    loadTestHero() {
        // Héros de test
        this.currentHero = {
            id: 'hero_test',
            name: 'Arthur Pendragon',
            class: 'Chevalier Légendaire',
            level: 12,
            icon: '⚔️',
            hp: 850,
            maxHp: 1000,
            mp: 200,
            maxMp: 250,
            xp: 7500,
            xpToNext: 10000,
            stats: {
                attack: 45,
                defense: 38,
                speed: 25,
                accuracy: 85,
                luck: 15,
                magic: 20
            },
            skills: [
                {
                    id: 'heroic_strike',
                    name: 'Frappe Héroïque',
                    icon: '⚔️',
                    description: 'Une attaque puissante qui ignore 50% de la défense',
                    mpCost: 20
                },
                {
                    id: 'holy_shield',
                    name: 'Bouclier Sacré',
                    icon: '🛡️',
                    description: 'Augmente la défense de 50% pendant 3 tours',
                    mpCost: 30
                },
                {
                    id: 'excalibur_unleash',
                    name: 'Déchaînement d\'Excalibur',
                    icon: '⚡',
                    description: 'Libère la puissance d\'Excalibur - dégâts massifs',
                    mpCost: 100
                }
            ],
            equipment: {
                weapon: { name: 'Excalibur', icon: '🗡️', bonus: '+20 ATK' },
                armor: { name: 'Armure de Camelot', icon: '🛡️', bonus: '+15 DEF' },
                accessory: { name: 'Anneau Royal', icon: '💍', bonus: '+5 tous stats' },
                artifact: null
            }
        };
        
        // Inventaire de test
        this.inventory = [
            { id: 1, name: 'Potion de Vie', icon: '🧪', quantity: 5 },
            { id: 2, name: 'Potion de Mana', icon: '💙', quantity: 3 },
            { id: 3, name: 'Élixir', icon: '⚗️', quantity: 1 },
            { id: 4, name: 'Pierre de Téléportation', icon: '💎', quantity: 2 }
        ];
        
        this.updateDisplay();
    }
    
    updateDisplay() {
        if (!this.currentHero) return;
        
        const hero = this.currentHero;
        
        // Infos principales
        this.container.querySelector('.hero-icon').textContent = hero.icon;
        this.container.querySelector('.hero-name').textContent = hero.name;
        this.container.querySelector('.hero-class').textContent = hero.class;
        this.container.querySelector('.level-badge').textContent = `Niv. ${hero.level}`;
        
        // Barres
        this.updateBar('hp', hero.hp, hero.maxHp);
        this.updateBar('mp', hero.mp, hero.maxMp);
        this.updateBar('xp', hero.xp, hero.xpToNext);
        
        // Stats
        Object.entries(hero.stats).forEach(([stat, value]) => {
            const element = document.getElementById(`stat-${stat}`);
            if (element) element.textContent = value;
        });
        
        // Compétences
        this.updateSkills();
        
        // Équipement
        this.updateEquipment();
        
        // Inventaire
        this.updateInventory();
    }
    
    updateBar(type, current, max) {
        const fill = this.container.querySelector(`.${type}-fill`);
        const text = this.container.querySelector(`.${type}-bar .bar-text`);
        
        const percentage = (current / max) * 100;
        fill.style.width = `${percentage}%`;
        text.textContent = `${current}/${max}`;
    }
    
    updateSkills() {
        const skillsList = document.getElementById('skills-list');
        skillsList.innerHTML = '';
        
        this.currentHero.skills.forEach(skill => {
            const skillElement = document.createElement('div');
            skillElement.className = 'skill-item';
            skillElement.innerHTML = `
                <span class="skill-icon">${skill.icon}</span>
                <div class="skill-info">
                    <div class="skill-name">${skill.name}</div>
                    <div class="skill-desc">${skill.description}</div>
                </div>
                <div class="skill-cost">${skill.mpCost} MP</div>
            `;
            
            skillElement.addEventListener('click', () => this.useSkill(skill));
            skillsList.appendChild(skillElement);
        });
    }
    
    updateEquipment() {
        const equipment = this.currentHero.equipment;
        
        Object.entries(equipment).forEach(([slot, item]) => {
            const slotElement = document.getElementById(`slot-${slot}`);
            if (slotElement) {
                if (item) {
                    slotElement.innerHTML = `${item.icon} ${item.name}`;
                    slotElement.title = item.bonus;
                } else {
                    slotElement.innerHTML = 'Vide';
                    slotElement.title = '';
                }
            }
        });
    }
    
    updateInventory() {
        const grid = document.getElementById('inventory-grid');
        grid.innerHTML = '';
        
        // Créer 32 slots (4 lignes de 8)
        for (let i = 0; i < 32; i++) {
            const slot = document.createElement('div');
            slot.className = 'inventory-slot';
            
            if (i < this.inventory.length) {
                const item = this.inventory[i];
                slot.className += ' filled';
                slot.innerHTML = `<span class="item-icon">${item.icon}</span>`;
                slot.title = `${item.name} (x${item.quantity})`;
                
                slot.addEventListener('click', () => this.useItem(item));
            }
            
            grid.appendChild(slot);
        }
    }
    
    levelUp() {
        if (!this.currentHero) return;
        
        this.currentHero.level++;
        this.currentHero.maxHp += 50;
        this.currentHero.maxMp += 20;
        this.currentHero.hp = this.currentHero.maxHp;
        this.currentHero.mp = this.currentHero.maxMp;
        
        // Augmenter les stats
        Object.keys(this.currentHero.stats).forEach(stat => {
            this.currentHero.stats[stat] += Math.floor(Math.random() * 3) + 1;
        });
        
        this.currentHero.xp = 0;
        this.currentHero.xpToNext = Math.floor(this.currentHero.xpToNext * 1.5);
        
        this.updateDisplay();
        alert(`🎉 ${this.currentHero.name} est maintenant niveau ${this.currentHero.level} !`);
    }
    
    restoreHP() {
        if (!this.currentHero) return;
        
        const restored = Math.min(
            this.currentHero.maxHp - this.currentHero.hp,
            Math.floor(this.currentHero.maxHp * 0.5)
        );
        
        this.currentHero.hp += restored;
        this.updateDisplay();
        
        if (restored > 0) {
            alert(`💚 ${restored} HP restaurés !`);
        }
    }
    
    restoreMP() {
        if (!this.currentHero) return;
        
        const restored = Math.min(
            this.currentHero.maxMp - this.currentHero.mp,
            Math.floor(this.currentHero.maxMp * 0.5)
        );
        
        this.currentHero.mp += restored;
        this.updateDisplay();
        
        if (restored > 0) {
            alert(`💙 ${restored} MP restaurés !`);
        }
    }
    
    useSkill(skill) {
        if (!this.currentHero) return;
        
        if (this.currentHero.mp < skill.mpCost) {
            alert(`❌ Pas assez de MP ! (${skill.mpCost} requis)`);
            return;
        }
        
        this.currentHero.mp -= skill.mpCost;
        this.updateDisplay();
        alert(`🔥 ${this.currentHero.name} utilise ${skill.name} !`);
    }
    
    useItem(item) {
        if (item.quantity <= 0) return;
        
        item.quantity--;
        
        switch (item.name) {
            case 'Potion de Vie':
                this.currentHero.hp = Math.min(
                    this.currentHero.hp + 100,
                    this.currentHero.maxHp
                );
                alert(`💚 100 HP restaurés !`);
                break;
                
            case 'Potion de Mana':
                this.currentHero.mp = Math.min(
                    this.currentHero.mp + 50,
                    this.currentHero.maxMp
                );
                alert(`💙 50 MP restaurés !`);
                break;
                
            case 'Élixir':
                this.currentHero.hp = this.currentHero.maxHp;
                this.currentHero.mp = this.currentHero.maxMp;
                alert(`✨ HP et MP complètement restaurés !`);
                break;
                
            default:
                alert(`Utilisé : ${item.name}`);
        }
        
        if (item.quantity <= 0) {
            this.inventory = this.inventory.filter(i => i.id !== item.id);
        }
        
        this.updateDisplay();
    }
    
    selectEquipmentSlot(slot) {
        const slotType = slot.dataset.slot;
        alert(`Slot ${slotType} sélectionné. Glissez un objet depuis l'inventaire pour équiper.`);
    }
    
    showDetails() {
        const details = `
📜 FICHE COMPLÈTE DE ${this.currentHero.name.toUpperCase()}

CLASSE: ${this.currentHero.class}
NIVEAU: ${this.currentHero.level}

STATISTIQUES DÉTAILLÉES:
- Points de Vie: ${this.currentHero.hp}/${this.currentHero.maxHp}
- Points de Mana: ${this.currentHero.mp}/${this.currentHero.maxMp}
- Expérience: ${this.currentHero.xp}/${this.currentHero.xpToNext}

ATTRIBUTS DE COMBAT:
- Attaque: ${this.currentHero.stats.attack}
- Défense: ${this.currentHero.stats.defense}
- Vitesse: ${this.currentHero.stats.speed}
- Précision: ${this.currentHero.stats.accuracy}%
- Chance: ${this.currentHero.stats.luck}
- Puissance Magique: ${this.currentHero.stats.magic}

ÉQUIPEMENT ACTUEL:
${Object.entries(this.currentHero.equipment).map(([slot, item]) => 
    item ? `- ${slot}: ${item.name} (${item.bonus})` : `- ${slot}: Aucun`
).join('\n')}

COMPÉTENCES MAÎTRISÉES: ${this.currentHero.skills.length}
${this.currentHero.skills.map(s => `- ${s.name} (${s.mpCost} MP)`).join('\n')}

OBJETS EN INVENTAIRE: ${this.inventory.reduce((sum, item) => sum + item.quantity, 0)}
        `;
        
        alert(details);
    }
}

// Instance globale
let heroInterface = null;

// Initialisation
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        if (document.getElementById('hero-container')) {
            heroInterface = new HeroInterface('hero-container');
        }
    });
} 