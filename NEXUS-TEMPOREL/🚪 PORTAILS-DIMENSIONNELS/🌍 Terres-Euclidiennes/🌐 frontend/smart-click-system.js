// ⚡ SMART CLICK SYSTEM - Éviter les clics lointains
// ================================================
// Raccourcis clavier + actions contextuelles

class SmartClickSystem {
    constructor() {
        this.shortcuts = {
            // Actions principales
            ' ': 'pause-game',           // Espace = Pause
            'Enter': 'confirm-action',   // Enter = Confirmer
            'Escape': 'cancel-action',   // Esc = Annuler
            
            // Raccourcis numériques
            '1': 'new-game-btn',
            '2': 'city-btn', 
            '3': 'combat-btn',
            '4': 'hero-btn',
            '5': 'joint-magic-btn',
            '6': 'scenario-btn',
            '7': 'grofi-heroes-btn',
            
            // Actions héros
            'h': 'hero-select-btn',      // H = Sélectionner héros
            'm': 'move-btn',             // M = Déplacer
            'a': 'attack-btn',           // A = Attaquer
            'e': 'explore-btn',          // E = Explorer
            
            // Actions temporelles
            'p': 'psi-create-btn',       // P = Créer état Psi
            'c': 'psi-collapse-btn',     // C = Collapse
            't': 'timeline-switch-btn',  // T = Timeline
            
            // Navigation
            'ArrowUp': 'move-up',
            'ArrowDown': 'move-down', 
            'ArrowLeft': 'move-left',
            'ArrowRight': 'move-right',
            
            // ZFC
            'z': 'toggle-zfc',           // Z = Toggle ZFC
            'f': 'toggle-fog',           // F = Toggle Fog
        };
        
        this.contextMenu = null;
        this.isEnabled = true;
        
        this.init();
        console.log('⚡ Smart Click System activé !');
        console.log('💡 Raccourcis: Espace=Pause, 1-7=Actions, H=Héros, M=Move, A=Attack');
    }
    
    init() {
        // Raccourcis clavier
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
        
        // Menu contextuel right-click
        document.addEventListener('contextmenu', (e) => this.handleRightClick(e));
        
        // Double-click actions
        document.addEventListener('dblclick', (e) => this.handleDoubleClick(e));
        
        // Hover quick actions
        this.setupHoverActions();
    }
    
    // ⌨️ GESTION RACCOURCIS CLAVIER
    handleKeyboard(e) {
        if (!this.isEnabled) return;
        
        // Ignorer si dans un input
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        
        const key = e.key;
        const action = this.shortcuts[key];
        
        if (action) {
            e.preventDefault();
            this.executeAction(action);
            
            // Feedback visuel
            this.showKeyboardFeedback(key, action);
        }
    }
    
    // 🖱️ MENU CONTEXTUEL RIGHT-CLICK
    handleRightClick(e) {
        e.preventDefault();
        
        const target = e.target.closest('[data-contextual]') || e.target;
        const actions = this.getContextualActions(target);
        
        this.showContextMenu(e.pageX, e.pageY, actions);
    }
    
    // 🖱️ DOUBLE-CLICK ACTIONS
    handleDoubleClick(e) {
        const target = e.target;
        
        // Double-click sur héros = Sélectionner + Centrer
        if (target.classList.contains('hero-element')) {
            this.executeAction('select-and-center-hero', target);
        }
        
        // Double-click sur timeline = Activer
        if (target.classList.contains('timeline-diode')) {
            const timeline = target.dataset.timeline;
            this.executeAction('activate-timeline', timeline);
        }
        
        // Double-click sur canvas = Créer Psi
        if (target.id === 'game-canvas') {
            const rect = target.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            this.executeAction('create-psi-at', {x, y});
        }
    }
    
    // ⚡ EXÉCUTER ACTION
    executeAction(action, data = null) {
        switch(action) {
            case 'pause-game':
                this.toggleGamePause();
                break;
                
            case 'confirm-action':
                this.confirmCurrentAction();
                break;
                
            case 'cancel-action':
                this.cancelCurrentAction();
                break;
                
            case 'move-up':
            case 'move-down':
            case 'move-left':
            case 'move-right':
                this.moveSelectedHero(action);
                break;
                
            case 'toggle-zfc':
                this.toggleZFC();
                break;
                
            case 'toggle-fog':
                this.toggleFogDisplay();
                break;
                
            case 'select-and-center-hero':
                this.selectAndCenterHero(data);
                break;
                
            case 'activate-timeline':
                this.activateTimeline(data);
                break;
                
            case 'create-psi-at':
                this.createPsiAt(data.x, data.y);
                break;
                
            default:
                // Action par ID de bouton
                const button = document.getElementById(action);
                if (button) {
                    button.click();
                }
        }
    }
    
    // 📋 ACTIONS CONTEXTUELLES
    getContextualActions(target) {
        const actions = [];
        
        // Actions sur héros
        if (target.classList.contains('hero-element')) {
            actions.push(
                {label: '👁️ Sélectionner', action: 'select-hero'},
                {label: '🎯 Centrer vue', action: 'center-on-hero'},
                {label: '🚶 Déplacer', action: 'move-hero'},
                {label: '⚔️ Attaquer', action: 'attack-with-hero'},
                {label: '🔮 Créer Psi', action: 'create-psi-hero'}
            );
        }
        
        // Actions sur canvas
        if (target.id === 'game-canvas') {
            actions.push(
                {label: '🔮 Créer état Psi', action: 'create-psi-here'},
                {label: '🌀 Portail temporel', action: 'create-portal'},
                {label: '👁️ Explorer zone', action: 'explore-area'}
            );
        }
        
        // Actions sur timeline
        if (target.classList.contains('timeline-diode')) {
            actions.push(
                {label: '✅ Activer timeline', action: 'activate-timeline'},
                {label: '👁️ Rendre visible', action: 'show-timeline'},
                {label: '🌊 Changer transparence', action: 'change-opacity'}
            );
        }
        
        return actions;
    }
    
    // 💬 AFFICHER MENU CONTEXTUEL
    showContextMenu(x, y, actions) {
        // Supprimer ancien menu
        if (this.contextMenu) {
            this.contextMenu.remove();
        }
        
        // Créer nouveau menu
        this.contextMenu = document.createElement('div');
        this.contextMenu.className = 'smart-context-menu';
        this.contextMenu.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            background: rgba(20, 20, 30, 0.95);
            border: 1px solid #4A90E2;
            border-radius: 6px;
            padding: 4px;
            z-index: 1000;
            font-size: 0.8rem;
            min-width: 150px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        `;
        
        actions.forEach(actionItem => {
            const item = document.createElement('div');
            item.className = 'context-menu-item';
            item.textContent = actionItem.label;
            item.style.cssText = `
                padding: 6px 10px;
                cursor: pointer;
                border-radius: 3px;
                transition: background 0.2s;
            `;
            
            item.addEventListener('mouseenter', () => {
                item.style.background = 'rgba(74, 144, 226, 0.3)';
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.background = 'transparent';
            });
            
            item.addEventListener('click', () => {
                this.executeAction(actionItem.action);
                this.contextMenu.remove();
                this.contextMenu = null;
            });
            
            this.contextMenu.appendChild(item);
        });
        
        document.body.appendChild(this.contextMenu);
        
        // Fermer en cliquant ailleurs
        setTimeout(() => {
            document.addEventListener('click', () => {
                if (this.contextMenu) {
                    this.contextMenu.remove();
                    this.contextMenu = null;
                }
            }, {once: true});
        }, 100);
    }
    
    // ✨ FEEDBACK VISUEL RACCOURCI
    showKeyboardFeedback(key, action) {
        const feedback = document.createElement('div');
        feedback.className = 'keyboard-feedback';
        feedback.textContent = `${key.toUpperCase()} → ${action}`;
        feedback.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(74, 144, 226, 0.9);
            color: white;
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 0.8rem;
            font-weight: bold;
            z-index: 999;
            animation: fadeInOut 1s ease;
        `;
        
        document.body.appendChild(feedback);
        
        setTimeout(() => {
            feedback.remove();
        }, 1000);
    }
    
    // 🎮 ACTIONS SPÉCIFIQUES
    toggleGamePause() {
        if (window.gameRenderer && window.gameRenderer.isPaused !== undefined) {
            window.gameRenderer.isPaused = !window.gameRenderer.isPaused;
            console.log(`🎮 Jeu ${window.gameRenderer.isPaused ? 'mis en pause' : 'repris'}`);
        }
    }
    
    moveSelectedHero(direction) {
        if (window.gameRenderer && window.gameRenderer.selectedHero) {
            const hero = window.gameRenderer.selectedHero;
            let newQ = hero.q || 0;
            let newR = hero.r || 0;
            
            switch(direction) {
                case 'move-up': newR -= 1; break;
                case 'move-down': newR += 1; break;
                case 'move-left': newQ -= 1; break;
                case 'move-right': newQ += 1; break;
            }
            
            // Envoyer commande de déplacement
            if (window.gameAPI) {
                window.gameAPI.moveHero(hero.id, newQ, newR);
            }
        }
    }
    
    toggleZFC() {
        const zfcControls = document.querySelector('.fog-controls-header');
        if (zfcControls) {
            zfcControls.style.display = zfcControls.style.display === 'none' ? 'flex' : 'none';
        }
    }
}

// 🌍 EXPORT GLOBAL
window.SmartClickSystem = SmartClickSystem;

// 🎯 AUTO-INITIALISATION
document.addEventListener('DOMContentLoaded', () => {
    window.smartClickSystem = new SmartClickSystem();
    
    // CSS pour animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInOut {
            0% { opacity: 0; transform: translateY(-10px); }
            50% { opacity: 1; transform: translateY(0); }
            100% { opacity: 0; transform: translateY(-10px); }
        }
    `;
    document.head.appendChild(style);
}); 