/**
 * 🎯 SYSTÈME D'ACTIONS CONTEXTUELLES AUTOUR DES HÉROS
 * Inspiré de Heroes of Might & Magic / Warcraft
 * Actions intelligentes selon le contexte (héros, terrain, cibles)
 */

class ContextualHeroActions {
    constructor() {
        this.selectedHero = null;
        this.actionButtons = [];
        this.circularMenu = null;
        this.canvas = null;
        this.mousePos = { x: 0, y: 0 };
        this.wheelAngle = 0;
        this.isCircularMenuActive = false;
        
        // Actions disponibles selon le contexte
        this.contextualActions = {
            // Actions de mouvement
            movement: [
                { id: 'move', icon: '👟', label: 'Move', hotkey: 'M', color: '#4ECDC4' },
                { id: 'retreat', icon: '🔄', label: 'Retreat', hotkey: 'R', color: '#FF6B6B' },
                { id: 'teleport', icon: '⚡', label: 'Teleport', hotkey: 'T', color: '#9C27B0' }
            ],
            
            // Actions de combat
            combat: [
                { id: 'attack', icon: '⚔️', label: 'Attack', hotkey: 'A', color: '#F44336' },
                { id: 'defend', icon: '🛡️', label: 'Defend', hotkey: 'D', color: '#2196F3' },
                { id: 'cast_spell', icon: '🔮', label: 'Cast Spell', hotkey: 'C', color: '#9C27B0' }
            ],
            
            // Actions de magie
            magic: [
                { id: 'fireball', icon: '🔥', label: 'Fireball', hotkey: '1', color: '#FF5722' },
                { id: 'heal', icon: '💚', label: 'Heal', hotkey: '2', color: '#4CAF50' },
                { id: 'lightning', icon: '⚡', label: 'Lightning', hotkey: '3', color: '#FFD700' },
                { id: 'temporal', icon: 'ψ', label: 'Temporal', hotkey: '4', color: '#7B1FA2' }
            ],
            
            // Actions d'interaction
            interaction: [
                { id: 'search', icon: '🔍', label: 'Search', hotkey: 'S', color: '#607D8B' },
                { id: 'open_chest', icon: '📦', label: 'Open', hotkey: 'O', color: '#FF9800' },
                { id: 'talk', icon: '💬', label: 'Talk', hotkey: 'Space', color: '#795548' },
                { id: 'center_view', icon: '🎯', label: 'Center View', hotkey: 'C', color: '#2196F3' }
            ],
            
            // Actions spéciales Jean-Grofignon
            grofi_special: [
                { id: 'joint_magique', icon: '🚬', label: 'Joint Magique', hotkey: 'J', color: '#4CAF50' },
                { id: 'canape_pause', icon: '🛋️', label: 'Canapé Pause', hotkey: 'P', color: '#8BC34A' },
                { id: 'debug_reality', icon: '🔧', label: 'Debug Reality', hotkey: 'F12', color: '#009688' },
                { id: 'collapse_override', icon: '⏸️', label: 'Collapse Override', hotkey: 'Ctrl+Z', color: '#FFD700' }
            ],
            
            // Actions spéciales Anna Martel
            anna_special: [
                { id: 'temporal_decay', icon: '⏰', label: 'Temporal Decay', hotkey: 'Y', color: '#E91E63' },
                { id: 'time_hammer', icon: '🔨', label: 'Time Hammer', hotkey: 'H', color: '#9C27B0' },
                { id: 'causality_fix', icon: '🧰', label: 'Causality Fix', hotkey: 'F', color: '#3F51B5' }
            ]
        };
        
        this.init();
    }
    
    init() {
        this.createActionContainer();
        this.bindEvents();
        this.initCircularMenu();
        
        console.log('🎯 Contextual Hero Actions System initialized');
    }
    
    createActionContainer() {
        // Container pour les actions contextuelles
        this.actionContainer = document.createElement('div');
        this.actionContainer.id = 'contextual-actions-container';
        this.actionContainer.style.cssText = `
            position: absolute;
            pointer-events: none;
            z-index: 1000;
            display: none;
        `;
        document.body.appendChild(this.actionContainer);
        
        // Container pour le menu circulaire
        this.circularContainer = document.createElement('div');
        this.circularContainer.id = 'circular-menu-container';
        this.circularContainer.style.cssText = `
            position: absolute;
            pointer-events: none;
            z-index: 1001;
            display: none;
            width: 200px;
            height: 200px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(26,26,46,0.9) 0%, rgba(22,33,62,0.7) 100%);
            border: 2px solid #FFD700;
            backdrop-filter: blur(10px);
        `;
        document.body.appendChild(this.circularContainer);
    }
    
    bindEvents() {
        // Écouter la sélection de héros
        document.addEventListener('hero-selected', (e) => {
            this.selectHero(e.detail.hero, e.detail.position);
        });
        
        // Écouter les clics de déselection
        document.addEventListener('click', (e) => {
            if (!e.target.closest('#contextual-actions-container') && 
                !e.target.closest('#circular-menu-container')) {
                this.hideActions();
            }
        });
        
        // Gestion de la roulette pour menu circulaire
        document.addEventListener('wheel', (e) => {
            if (this.selectedHero && e.ctrlKey) {
                e.preventDefault();
                this.handleWheelRotation(e.deltaY);
            }
        });
        
        // Position de la souris pour le menu circulaire
        document.addEventListener('mousemove', (e) => {
            this.mousePos.x = e.clientX;
            this.mousePos.y = e.clientY;
        });
        
        // Raccourcis clavier
        document.addEventListener('keydown', (e) => {
            this.handleHotkey(e);
        });
    }
    
    selectHero(hero, canvasPosition) {
        this.selectedHero = hero;
        this.showContextualActions(hero, canvasPosition);
        
        if (window.systemMessages) {
            window.systemMessages.showEvent(`${hero.name} selected - Actions available`, 'EVT');
        }
    }
    
    showContextualActions(hero, position) {
        this.hideActions();
        
        const actions = this.getContextualActionsForHero(hero);
        const buttonRadius = 40;
        const centerRadius = 60;
        
        // Calculer positions autour du héros
        const angleStep = (Math.PI * 2) / actions.length;
        
        actions.forEach((action, index) => {
            const angle = index * angleStep - Math.PI / 2; // Commencer en haut
            const x = position.x + Math.cos(angle) * centerRadius;
            const y = position.y + Math.sin(angle) * centerRadius;
            
            const button = this.createActionButton(action, x, y);
            this.actionContainer.appendChild(button);
            this.actionButtons.push(button);
        });
        
        this.actionContainer.style.display = 'block';
        
        // Animation d'apparition
        this.actionButtons.forEach((button, index) => {
            setTimeout(() => {
                button.style.transform = 'scale(1)';
                button.style.opacity = '1';
            }, index * 50);
        });
    }
    
    createActionButton(action, x, y) {
        const button = document.createElement('div');
        button.className = 'contextual-action-btn';
        button.style.cssText = `
            position: absolute;
            left: ${x - 25}px;
            top: ${y - 25}px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: ${action.color};
            border: 3px solid #FFD700;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            cursor: pointer;
            pointer-events: auto;
            transform: scale(0);
            opacity: 0;
            transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
        `;
        
        button.innerHTML = `
            <span style="filter: drop-shadow(1px 1px 2px rgba(0,0,0,0.8));">
                ${action.icon}
            </span>
        `;
        
        // Tooltip
        button.title = `${action.label} (${action.hotkey})`;
        
        // Events
        button.addEventListener('click', () => this.executeAction(action));
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'scale(1.2)';
            button.style.boxShadow = `0 6px 20px ${action.color}80`;
        });
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'scale(1)';
            button.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.4)';
        });
        
        return button;
    }
    
    getContextualActionsForHero(hero) {
        const actions = [];
        
        // Actions de base toujours disponibles
        actions.push(...this.contextualActions.movement);
        
        // Actions selon le type de héros
        if (hero.name === 'Jean-Grofignon' || hero.id === 'hero_jean_grofignon') {
            actions.push(...this.contextualActions.grofi_special);
        } else if (hero.name === 'Anna Martel' || hero.id === 'anna_martel') {
            actions.push(...this.contextualActions.anna_special);
        } else {
            // Héros standard
            actions.push(...this.contextualActions.combat);
            actions.push(...this.contextualActions.magic.slice(0, 2)); // Limiter à 2 sorts
        }
        
        // Actions contextuelles selon l'environnement
        // TODO: Ajouter logique selon terrain, ennemis proches, objets, etc.
        
        return actions.slice(0, 8); // Limiter à 8 actions maximum
    }
    
    initCircularMenu() {
        // Canvas pour dessiner le menu circulaire
        this.menuCanvas = document.createElement('canvas');
        this.menuCanvas.width = 200;
        this.menuCanvas.height = 200;
        this.menuCanvas.style.cssText = `
            width: 100%;
            height: 100%;
            pointer-events: auto;
        `;
        this.circularContainer.appendChild(this.menuCanvas);
        this.menuCtx = this.menuCanvas.getContext('2d');
    }
    
    handleWheelRotation(deltaY) {
        if (!this.selectedHero) return;
        
        this.wheelAngle += deltaY * 0.01;
        this.showCircularMenu();
        
        // Auto-hide après 2 secondes d'inactivité
        clearTimeout(this.circularMenuTimeout);
        this.circularMenuTimeout = setTimeout(() => {
            this.hideCircularMenu();
        }, 2000);
    }
    
    showCircularMenu() {
        this.circularContainer.style.display = 'block';
        this.circularContainer.style.left = (this.mousePos.x - 100) + 'px';
        this.circularContainer.style.top = (this.mousePos.y - 100) + 'px';
        
        this.drawCircularMenu();
        this.isCircularMenuActive = true;
    }
    
    drawCircularMenu() {
        const ctx = this.menuCtx;
        const centerX = 100;
        const centerY = 100;
        const radius = 80;
        
        ctx.clearRect(0, 0, 200, 200);
        
        const actions = this.getContextualActionsForHero(this.selectedHero);
        const angleStep = (Math.PI * 2) / actions.length;
        
        actions.forEach((action, index) => {
            const angle = index * angleStep + this.wheelAngle;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;
            
            // Fond de l'action
            ctx.beginPath();
            ctx.arc(x, y, 20, 0, Math.PI * 2);
            ctx.fillStyle = action.color;
            ctx.fill();
            ctx.strokeStyle = '#FFD700';
            ctx.lineWidth = 2;
            ctx.stroke();
            
            // Icône
            ctx.font = '16px serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = 'white';
            ctx.fillText(action.icon, x, y);
        });
        
        // Indicateur central
        ctx.beginPath();
        ctx.arc(centerX, centerY, 10, 0, Math.PI * 2);
        ctx.fillStyle = '#FFD700';
        ctx.fill();
    }
    
    hideCircularMenu() {
        this.circularContainer.style.display = 'none';
        this.isCircularMenuActive = false;
    }
    
    executeAction(action) {
        console.log(`🎯 Executing action: ${action.id} for hero:`, this.selectedHero);
        
        // Actions spécifiques selon l'ID
        switch (action.id) {
            case 'joint_magique':
                this.executeJointMagique();
                break;
            case 'canape_pause':
                this.executeCanapePause();
                break;
            case 'debug_reality':
                this.executeDebugReality();
                break;
            case 'temporal_decay':
                this.executeTemporalDecay();
                break;
            case 'move':
                this.executeMove();
                break;
            case 'attack':
                this.executeAttack();
                break;
            case 'cast_spell':
                this.executeCastSpell();
                break;
            default:
                this.executeGenericAction(action);
        }
        
        if (window.systemMessages) {
            window.systemMessages.showAction(`${this.selectedHero.name} uses ${action.label}`, 'ACTION');
        }
    }
    
    executeJointMagique() {
        console.log('🚬 Joint Magique activated!');
        if (window.systemMessages) {
            window.systemMessages.showQuote(
                'Certains vivent dans le port-genre. Lui, il le fume.', 
                'Jean-Grofignon'
            );
        }
        // TODO: Implémenter l'effet du Joint Magique
    }
    
    executeCanapePause() {
        console.log('🛋️ Canapé Pause activated!');
        if (window.systemMessages) {
            window.systemMessages.showQuote(
                'De mon canapé je vois le multivers !', 
                'Jean-Grofignon'
            );
        }
        // TODO: Mettre en pause la réalité locale
    }
    
    executeDebugReality() {
        console.log('🔧 Debug Reality activated!');
        // TODO: Activer le mode debug de la réalité
    }
    
    executeTemporalDecay() {
        console.log('⏰ Temporal Decay activated!');
        if (window.temporalIntegration) {
            window.temporalIntegration.applyDecay('current-game');
        }
    }
    
    executeMove() {
        console.log('👟 Movement mode activated');
        // TODO: Activer le mode déplacement
    }
    
    executeAttack() {
        console.log('⚔️ Attack mode activated');
        // TODO: Activer le mode attaque
    }
    
    executeCastSpell() {
        console.log('🔮 Spell casting mode activated');
        // TODO: Ouvrir le menu de sorts
    }
    
    executeGenericAction(action) {
        console.log(`⚡ Generic action: ${action.label}`);
        
        // Actions spéciales génériques
        switch (action.id) {
            case 'center_view':
                this.executeCenterView();
                break;
            default:
                console.log(`🎯 Action générique: ${action.label}`);
        }
    }
    
    executeCenterView() {
        console.log('🎯 Center View activated');
        if (this.selectedHero && window.modernGameRenderer) {
            // Utiliser l'API du renderer pour centrer sur le héros
            window.modernGameRenderer.centerOnPosition(
                this.selectedHero.position?.x || 0, 
                this.selectedHero.position?.y || 0
            );
        }
        
        if (window.systemMessages) {
            window.systemMessages.showAction('Vue centrée sur le héros', 'VIEW');
        }
    }
    
    handleHotkey(e) {
        if (!this.selectedHero) return;
        
        const actions = this.getContextualActionsForHero(this.selectedHero);
        const action = actions.find(a => {
            if (a.hotkey.includes('Ctrl') && e.ctrlKey) {
                return a.hotkey.includes(e.key);
            }
            return a.hotkey.toLowerCase() === e.key.toLowerCase() || 
                   a.hotkey === e.code;
        });
        
        if (action) {
            e.preventDefault();
            this.executeAction(action);
        }
    }
    
    hideActions() {
        this.actionContainer.style.display = 'none';
        this.actionButtons.forEach(button => button.remove());
        this.actionButtons = [];
        this.selectedHero = null;
        this.hideCircularMenu();
    }
    
    // API publique pour déclencher depuis l'extérieur
    triggerHeroSelection(hero, position) {
        const event = new CustomEvent('hero-selected', {
            detail: { hero, position }
        });
        document.dispatchEvent(event);
    }
}

// Initialisation automatique
window.contextualHeroActions = new ContextualHeroActions();

console.log('🎯 Contextual Hero Actions System loaded!'); 