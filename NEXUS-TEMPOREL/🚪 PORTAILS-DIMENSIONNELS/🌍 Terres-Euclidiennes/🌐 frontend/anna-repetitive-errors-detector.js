/**
 * 🔨 ANNA MARTEL - REPETITIVE ERRORS DETECTOR
 * "When you tell people something, they don't listen. Then something happens - ALL THE TIME, ALL THE TIME, the same thing."
 */

class AnnaRepetitiveErrorsDetector {
    constructor() {
        this.errorHistory = new Map();
        this.warningHistory = new Map();
        this.maxRepeats = 3;
        this.timeWindow = 60000; // 1 minute
        this.annaFrustrationLevel = 0;
        
        this.init();
    }
    
    init() {
        // Observer les erreurs de console
        this.interceptConsoleErrors();
        
        // Observer les actions utilisateur répétitives
        this.observeUserActions();
        
        console.log('🔨 Anna Repetitive Errors Detector initialized');
        console.log('🔨 Anna: "J\'observe vos erreurs causales..."');
    }
    
    interceptConsoleErrors() {
        const originalError = console.error;
        const originalWarn = console.warn;
        
        console.error = (...args) => {
            this.recordError('console_error', args.join(' '));
            originalError.apply(console, args);
        };
        
        console.warn = (...args) => {
            this.recordError('console_warn', args.join(' '));
            originalWarn.apply(console, args);
        };
    }
    
    observeUserActions() {
        // Observer les clics répétitifs sur des éléments cassés
        document.addEventListener('click', (e) => {
            if (e.target.disabled || e.target.classList.contains('broken')) {
                this.recordError('broken_element_click', e.target.className);
            }
        });
        
        // Observer les tentatives d'actions non disponibles
        document.addEventListener('hero-action-failed', (e) => {
            this.recordError('hero_action_failed', e.detail.action);
        });
        
        // Observer les erreurs API répétitives
        window.addEventListener('api-error', (e) => {
            this.recordError('api_error', e.detail.endpoint);
        });
    }
    
    recordError(errorType, errorDetails) {
        const now = Date.now();
        const errorKey = `${errorType}:${errorDetails}`;
        
        // Nettoyer les anciennes entrées
        this.cleanOldEntries(now);
        
        // Enregistrer la nouvelle erreur
        if (!this.errorHistory.has(errorKey)) {
            this.errorHistory.set(errorKey, []);
        }
        
        const errorEntry = { timestamp: now, details: errorDetails };
        this.errorHistory.get(errorKey).push(errorEntry);
        
        // Vérifier si c'est répétitif
        this.checkRepetitive(errorKey, errorType);
    }
    
    cleanOldEntries(currentTime) {
        for (let [key, entries] of this.errorHistory.entries()) {
            const recentEntries = entries.filter(entry => 
                currentTime - entry.timestamp < this.timeWindow
            );
            
            if (recentEntries.length === 0) {
                this.errorHistory.delete(key);
            } else {
                this.errorHistory.set(key, recentEntries);
            }
        }
    }
    
    checkRepetitive(errorKey, errorType) {
        const entries = this.errorHistory.get(errorKey);
        
        if (entries.length >= this.maxRepeats) {
            this.triggerAnnaFrustration(errorKey, errorType, entries.length);
        }
    }
    
    triggerAnnaFrustration(errorKey, errorType, repeatCount) {
        this.annaFrustrationLevel++;
        
        console.log(`🔨 Anna détecte ${repeatCount} répétitions de: ${errorKey}`);
        
        // Choisir la citation d'Anna selon le niveau de frustration
        let annaQuote;
        let annaStyle = 'warning';
        
        if (this.annaFrustrationLevel <= 2) {
            annaQuote = "Quand on prévient les gens, ils n'écoutent pas. Puis ça arrive - TOUJOURS, TOUJOURS, la même chose.";
        } else if (this.annaFrustrationLevel <= 5) {
            annaQuote = "When you tell people something, they don't listen. Then something happens - ALL THE TIME, ALL THE TIME, the same thing.";
            annaStyle = 'error';
        } else {
            annaQuote = "J'ai construit ce système pour éviter les répétitions causales, mais les humains... toujours les mêmes erreurs.";
            annaStyle = 'error';
        }
        
        // Afficher le message d'Anna
        this.showAnnaFrustrationMessage(annaQuote, annaStyle, repeatCount);
        
        // Déclencher l'action de réparation automatique
        this.triggerAutoRepair(errorType);
    }
    
    showAnnaFrustrationMessage(quote, style, repeatCount) {
        // Via system messages si disponible
        if (window.systemMessages) {
            window.systemMessages.showQuote(quote, 'Anna Martel - Time Architect Frustrated');
        }
        
        // Message visuel spécial
        const frustrationMessage = document.createElement('div');
        frustrationMessage.style.cssText = `
            position: fixed;
            top: 20%;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(233, 30, 99, 0.95);
            color: white;
            padding: 20px 30px;
            border-radius: 15px;
            border: 3px solid #FFD700;
            font-weight: bold;
            font-size: 16px;
            text-align: center;
            z-index: 99999;
            max-width: 600px;
            backdrop-filter: blur(10px);
            animation: annaShake 0.5s ease-in-out 3;
        `;
        
        frustrationMessage.innerHTML = `
            <div style="font-size: 24px; margin-bottom: 10px;">🔨 ANNA MARTEL</div>
            <div style="margin-bottom: 15px;">"${quote}"</div>
            <div style="font-size: 14px; opacity: 0.8;">
                Erreur répétée ${repeatCount} fois - Réparation automatique en cours...
            </div>
        `;
        
        document.body.appendChild(frustrationMessage);
        
        // Animation CSS pour Anna frustrée
        const style = document.createElement('style');
        style.textContent = `
            @keyframes annaShake {
                0%, 100% { transform: translateX(-50%) rotate(0deg); }
                25% { transform: translateX(-50%) rotate(-2deg); }
                75% { transform: translateX(-50%) rotate(2deg); }
            }
        `;
        document.head.appendChild(style);
        
        // Auto-remove après 5 secondes
        setTimeout(() => {
            frustrationMessage.style.opacity = '0';
            setTimeout(() => {
                if (frustrationMessage.parentNode) {
                    frustrationMessage.parentNode.removeChild(frustrationMessage);
                }
                if (style.parentNode) {
                    style.parentNode.removeChild(style);
                }
            }, 500);
        }, 5000);
    }
    
    triggerAutoRepair(errorType) {
        console.log(`🔨 Anna déclenche la réparation automatique pour: ${errorType}`);
        
        // Réparations spécifiques selon le type d'erreur
        switch (errorType) {
            case 'broken_element_click':
                this.repairBrokenElements();
                break;
            case 'hero_action_failed':
                this.repairHeroActions();
                break;
            case 'api_error':
                this.repairAPIConnections();
                break;
            case 'console_error':
                this.repairConsoleErrors();
                break;
        }
        
        // Réduire légèrement la frustration après réparation
        this.annaFrustrationLevel = Math.max(0, this.annaFrustrationLevel - 1);
    }
    
    repairBrokenElements() {
        const brokenElements = document.querySelectorAll('.broken, [disabled]');
        brokenElements.forEach(el => {
            el.classList.remove('broken');
            el.disabled = false;
            el.style.opacity = '1';
        });
        console.log('🔨 Anna a réparé', brokenElements.length, 'éléments cassés');
    }
    
    repairHeroActions() {
        // Forcer la visibilité des héros
        if (window.fixAnnaVisibility) {
            window.fixAnnaVisibility();
        }
        console.log('🔨 Anna a réparé les actions de héros');
    }
    
    repairAPIConnections() {
        // Tenter de reconnecter aux APIs
        if (window.apiService) {
            window.apiService.testConnection();
        }
        console.log('🔨 Anna teste les connexions API');
    }
    
    repairConsoleErrors() {
        // Nettoyer la console (symbolique)
        console.clear();
        console.log('🔨 Anna Martel: "Console purifiée des erreurs répétitives"');
    }
    
    // API publique
    getAnnaFrustrationLevel() {
        return this.annaFrustrationLevel;
    }
    
    resetAnnaFrustration() {
        this.annaFrustrationLevel = 0;
        this.errorHistory.clear();
        console.log('🔨 Anna: "Niveau de frustration réinitialisé. Je recommence à observer..."');
    }
    
    triggerManualAnnaQuote() {
        this.showAnnaFrustrationMessage(
            "When you tell people something, they don't listen. Then something happens - ALL THE TIME, ALL THE TIME, the same thing.",
            'warning',
            'Manual'
        );
    }
}

// Initialisation automatique
window.annaErrorDetector = new AnnaRepetitiveErrorsDetector();

// API globale pour déclencher manuellement
window.annaFrustrated = () => {
    window.annaErrorDetector.triggerManualAnnaQuote();
};

console.log('🔨 Anna Repetitive Errors Detector loaded!');
console.log('🔨 Use window.annaFrustrated() to trigger Anna\'s iconic quote'); 