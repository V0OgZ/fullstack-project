// 🎮 INTÉGRATION ÉVÉNEMENTS DE JEU - Heroes of Time
// Connecte le système d'événements intelligent avec les actions du jeu

class GameEventIntegration {
    constructor() {
        this.eventLog = null;
        this.gameRenderer = null;
        this.scriptConsole = null;
        this.lastGameState = null;
        this.actionHistory = [];
        this.spellEffects = new Map();
        
        this.init();
    }
    
    async init() {
        // Attendre que les systèmes soient prêts
        await this.waitForSystems();
        
        // Connecter aux systèmes existants
        this.connectToGameRenderer();
        this.connectToScriptConsole();
        this.setupGameStateMonitoring();
        this.setupSpellEffectTracking();
        
        console.log('🎮 Intégration événements de jeu initialisée');
    }
    
    async waitForSystems() {
        return new Promise((resolve) => {
            const checkSystems = () => {
                if (window.intelligentEventLog && 
                    (window.gameRenderer || window.GameRenderer) &&
                    (window.scriptConsole || document.getElementById('script-console'))) {
                    
                    this.eventLog = window.intelligentEventLog;
                    this.gameRenderer = window.gameRenderer || window.GameRenderer;
                    this.scriptConsole = window.scriptConsole;
                    resolve();
                } else {
                    setTimeout(checkSystems, 500);
                }
            };
            checkSystems();
        });
    }
    
    // 🎯 CONNECTER AU GAME RENDERER
    connectToGameRenderer() {
        if (!this.gameRenderer) return;
        
        // Hook les clics sur la carte
        const originalHandleClick = this.gameRenderer.handleClick;
        if (originalHandleClick) {
            this.gameRenderer.handleClick = (e) => {
                originalHandleClick.call(this.gameRenderer, e);
                
                // Récupérer les coordonnées du clic
                const rect = this.gameRenderer.canvas.getBoundingClientRect();
                const x = (e.clientX - rect.left - this.gameRenderer.canvas.width / 2 - this.gameRenderer.offsetX) / this.gameRenderer.zoom;
                const y = (e.clientY - rect.top - this.gameRenderer.canvas.height / 2 - this.gameRenderer.offsetY) / this.gameRenderer.zoom;
                const hex = this.gameRenderer.pixelToHex(x, y);
                
                // Générer un événement de clic
                this.logGameEvent(`MOV(@${hex.q},${hex.r})`, 'HERO_ACTION', {
                    location: `@${hex.q},${hex.r}`,
                    action: 'click',
                    coordinates: { x, y, hex }
                });
            };
        }
        
        // Hook les animations de particules
        const originalAddParticle = this.gameRenderer.addParticle;
        if (originalAddParticle) {
            this.gameRenderer.addParticle = (x, y, type, options = {}) => {
                originalAddParticle.call(this.gameRenderer, x, y, type, options);
                
                if (type === 'spell' || type === 'magic') {
                    this.logGameEvent(`SPELL_EFFECT(${options.spellName || 'Unknown'})`, 'SPELL_EFFECT', {
                        location: `@${Math.round(x)},${Math.round(y)}`,
                        effectType: type,
                        spellName: options.spellName
                    });
                }
            };
        }
    }
    
    // 📝 CONNECTER À LA CONSOLE DE SCRIPT
    connectToScriptConsole() {
        if (!this.scriptConsole) return;
        
        // Hook l'exécution de scripts
        const originalExecuteScript = this.scriptConsole.executeScript;
        if (originalExecuteScript) {
            this.scriptConsole.executeScript = async (script) => {
                const result = await originalExecuteScript.call(this.scriptConsole, script);
                
                // Analyser le type de script et générer l'événement approprié
                this.analyzeAndLogScript(script || this.scriptConsole.input.value);
                
                return result;
            };
        }
    }
    
    // 🔍 ANALYSER ET LOGGER UN SCRIPT
    async analyzeAndLogScript(script) {
        if (!script || script.trim() === '') return;
        
        let priority = 'INFO';
        let context = {};
        
        // Analyser le type de script pour déterminer la priorité
        if (script.includes('ψ') && script.includes('⊙')) {
            priority = 'QUANTUM';
            context.quantumState = true;
        } else if (script.startsWith('†')) {
            priority = 'CRITICAL';
            context.action = 'collapse';
        } else if (script.includes('Π(')) {
            priority = 'QUANTUM';
            context.action = 'observation';
        } else if (script.startsWith('HERO(')) {
            priority = 'HERO_ACTION';
            context.action = 'creation';
        } else if (script.startsWith('MOV(')) {
            priority = 'HERO_ACTION';
            context.action = 'movement';
        } else if (script.startsWith('CREATE(')) {
            priority = 'IMPORTANT';
            context.action = 'creation';
        } else if (script.startsWith('USE(')) {
            priority = 'SPELL_EFFECT';
            context.action = 'artifact_usage';
        } else if (script.startsWith('BATTLE(')) {
            priority = 'CRITICAL';
            context.action = 'battle';
        }
        
        // Extraire les coordonnées si présentes
        const coordMatch = script.match(/@(\d+),(\d+)/);
        if (coordMatch) {
            context.location = `@${coordMatch[1]},${coordMatch[2]}`;
        }
        
        this.logGameEvent(script, priority, context);
    }
    
    // 🎮 SURVEILLER L'ÉTAT DU JEU
    setupGameStateMonitoring() {
        setInterval(() => {
            this.checkGameStateChanges();
        }, 1000);
    }
    
    async checkGameStateChanges() {
        try {
            // Récupérer l'état actuel du jeu
            const currentState = await this.getCurrentGameState();
            
            if (!currentState) return;
            
            // Comparer avec l'état précédent
            if (this.lastGameState) {
                this.detectGameChanges(this.lastGameState, currentState);
            }
            
            this.lastGameState = currentState;
        } catch (error) {
            console.warn('Erreur lors de la surveillance de l\'état du jeu:', error);
        }
    }
    
    async getCurrentGameState() {
        // Essayer différentes méthodes pour récupérer l'état du jeu
        if (window.gameAPI && window.gameAPI.getGameState) {
            return await window.gameAPI.getGameState();
        }
        
        if (window.gameState) {
            return window.gameState;
        }
        
        // Récupérer depuis l'API
        try {
            const response = await fetch('/api/temporal/state');
            if (response.ok) {
                return await response.json();
            }
        } catch (error) {
            // Ignorer les erreurs de réseau
        }
        
        return null;
    }
    
    // 🔍 DÉTECTER LES CHANGEMENTS DANS LE JEU
    detectGameChanges(oldState, newState) {
        // Détecter les nouveaux héros
        if (newState.heroes && oldState.heroes) {
            const newHeroes = newState.heroes.filter(hero => 
                !oldState.heroes.find(oldHero => oldHero.id === hero.id)
            );
            
            newHeroes.forEach(hero => {
                this.logGameEvent(`HERO(${hero.name})`, 'HERO_ACTION', {
                    heroName: hero.name,
                    action: 'creation',
                    location: hero.position ? `@${hero.position.x},${hero.position.y}` : null
                });
            });
        }
        
        // Détecter les mouvements de héros
        if (newState.heroes && oldState.heroes) {
            newState.heroes.forEach(hero => {
                const oldHero = oldState.heroes.find(old => old.id === hero.id);
                if (oldHero && hero.position && oldHero.position) {
                    if (hero.position.x !== oldHero.position.x || 
                        hero.position.y !== oldHero.position.y) {
                        
                        this.logGameEvent(
                            `MOV(${hero.name}, @${hero.position.x},${hero.position.y})`, 
                            'HERO_ACTION', 
                            {
                                heroName: hero.name,
                                action: 'movement',
                                location: `@${hero.position.x},${hero.position.y}`,
                                previousLocation: `@${oldHero.position.x},${oldHero.position.y}`
                            }
                        );
                    }
                }
            });
        }
        
        // Détecter les nouveaux états ψ
        if (newState.psiStates && oldState.psiStates) {
            const newPsiStates = newState.psiStates.filter(state => 
                !oldState.psiStates.find(oldState => oldState.id === state.id)
            );
            
            newPsiStates.forEach(state => {
                this.logGameEvent(state.script || `ψ${state.id}`, 'QUANTUM', {
                    psiStateId: state.id,
                    action: 'creation'
                });
            });
        }
        
        // Détecter les effondrements d'états ψ
        if (oldState.psiStates && newState.psiStates) {
            const collapsedStates = oldState.psiStates.filter(state => 
                !newState.psiStates.find(newState => newState.id === state.id)
            );
            
            collapsedStates.forEach(state => {
                this.logGameEvent(`†ψ${state.id}`, 'CRITICAL', {
                    psiStateId: state.id,
                    action: 'collapse'
                });
            });
        }
        
        // Détecter les changements de timeline
        if (oldState.currentTimeline !== newState.currentTimeline) {
            this.logGameEvent(
                `TIMELINE_SWITCH(${newState.currentTimeline})`, 
                'IMPORTANT', 
                {
                    previousTimeline: oldState.currentTimeline,
                    newTimeline: newState.currentTimeline,
                    action: 'timeline_switch'
                }
            );
        }
        
        // Détecter les nouveaux tours
        if (oldState.currentTurn !== newState.currentTurn) {
            this.logGameEvent(
                `TURN_${newState.currentTurn}`, 
                'INFO', 
                {
                    turn: newState.currentTurn,
                    previousTurn: oldState.currentTurn,
                    action: 'turn_change'
                }
            );
        }
    }
    
    // ✨ TRACKER LES EFFETS DE SORTS
    setupSpellEffectTracking() {
        // Surveiller les éléments avec des classes d'effets magiques
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        // Détecter les effets visuels de sorts
                        if (node.classList && (
                            node.classList.contains('spell-effect') ||
                            node.classList.contains('magic-particle') ||
                            node.classList.contains('artifact-glow')
                        )) {
                            this.trackSpellEffect(node);
                        }
                    }
                });
            });
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
    
    trackSpellEffect(element) {
        const effectType = element.dataset.effectType || 'unknown';
        const spellName = element.dataset.spellName || 'Unknown Spell';
        const duration = parseInt(element.dataset.duration) || 3000;
        
        this.logGameEvent(`SPELL_CAST(${spellName})`, 'SPELL_EFFECT', {
            spellName,
            effectType,
            duration,
            action: 'spell_cast'
        });
        
        // Programmer un événement de fin d'effet
        setTimeout(() => {
            this.logGameEvent(`SPELL_END(${spellName})`, 'INFO', {
                spellName,
                effectType,
                action: 'spell_end'
            });
        }, duration);
    }
    
    // 📝 LOGGER UN ÉVÉNEMENT DE JEU
    async logGameEvent(script, priority, context = {}) {
        if (!this.eventLog) return;
        
        // Éviter les doublons récents
        const now = Date.now();
        const recentAction = this.actionHistory.find(action => 
            action.script === script && 
            now - action.timestamp < 1000
        );
        
        if (recentAction) return;
        
        // Ajouter à l'historique
        this.actionHistory.push({
            script,
            priority,
            context,
            timestamp: now
        });
        
        // Limiter l'historique
        if (this.actionHistory.length > 100) {
            this.actionHistory.shift();
        }
        
        // Logger l'événement
        await this.eventLog.addEvent(script, priority, context);
    }
    
    // 🎯 API PUBLIQUE POUR LES DÉVELOPPEURS
    logCustomEvent(script, priority = 'INFO', context = {}) {
        this.logGameEvent(script, priority, context);
    }
    
    // 📊 STATISTIQUES
    getStats() {
        return {
            actionHistory: this.actionHistory.length,
            spellEffects: this.spellEffects.size,
            isConnected: {
                eventLog: !!this.eventLog,
                gameRenderer: !!this.gameRenderer,
                scriptConsole: !!this.scriptConsole
            }
        };
    }
}

// 🌍 INITIALISATION GLOBALE
window.GameEventIntegration = GameEventIntegration;

// Auto-initialisation
document.addEventListener('DOMContentLoaded', () => {
    if (!window.gameEventIntegration) {
        window.gameEventIntegration = new GameEventIntegration();
    }
});

// 🎮 API SIMPLIFIÉE
window.logGameEvent = (script, priority = 'INFO', context = {}) => {
    if (window.gameEventIntegration) {
        window.gameEventIntegration.logCustomEvent(script, priority, context);
    }
};

// 🔧 HOOKS POUR LES SYSTÈMES EXISTANTS
// Hook pour les boutons d'action
document.addEventListener('click', (e) => {
    if (e.target.matches('.btn-control, .quick-action-btn')) {
        const action = e.target.textContent || e.target.title || 'Unknown Action';
        const script = e.target.dataset.script || action;
        
        if (window.gameEventIntegration) {
            window.gameEventIntegration.logCustomEvent(script, 'HERO_ACTION', {
                buttonText: action,
                buttonType: e.target.className
            });
        }
    }
});

// Hook pour les changements d'état des héros
document.addEventListener('heroStateChange', (e) => {
    if (e.detail && window.gameEventIntegration) {
        window.gameEventIntegration.logCustomEvent(
            `HERO_STATE_CHANGE(${e.detail.heroName})`,
            'HERO_ACTION',
            e.detail
        );
    }
});

// Hook pour les effets quantiques
document.addEventListener('quantumEffect', (e) => {
    if (e.detail && window.gameEventIntegration) {
        window.gameEventIntegration.logCustomEvent(
            e.detail.script || 'QUANTUM_EFFECT',
            'QUANTUM',
            e.detail
        );
    }
});