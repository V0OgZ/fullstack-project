/**
 * 🎮 STARTUP MESSAGE SYSTEM
 * Remplace les animations de début problématiques
 */

class StartupMessageSystem {
    constructor() {
        this.isStartupComplete = false;
        this.init();
    }
    
    init() {
        // Attendre que le DOM soit chargé
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.showStartupMessages());
        } else {
            this.showStartupMessages();
        }
    }
    
    showStartupMessages() {
        console.log('🎮 Heroes of Time - Interface Temporal Engine');
        console.log('🔨 Anna Martel - Le Marteau du Temps - Ready!');
        console.log('🚬 Jean-Grofignon - L\'Éveillé Ontologique - Ready!');
        
        // Message discret dans l'interface
        this.showUIMessage();
        
        // Marquer le démarrage comme terminé
        setTimeout(() => {
            this.isStartupComplete = true;
            this.hideStartupElements();
        }, 1000);
    }
    
    showUIMessage() {
        // Créer un message discret
        const messageContainer = document.createElement('div');
        messageContainer.id = 'startup-message';
        messageContainer.style.cssText = `
            position: fixed;
            top: 20px;
            left: 20px;
            background: rgba(26, 26, 46, 0.9);
            color: #FFD700;
            padding: 10px 15px;
            border-radius: 8px;
            border: 1px solid #FFD700;
            font-size: 14px;
            z-index: 10000;
            backdrop-filter: blur(10px);
            transition: opacity 0.5s ease;
        `;
        
        messageContainer.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
                <span>🔨</span>
                <span>Anna Martel & Jean-Grofignon Ready!</span>
                <span>🚬</span>
            </div>
        `;
        
        document.body.appendChild(messageContainer);
        
        // Auto-hide après 3 secondes
        setTimeout(() => {
            messageContainer.style.opacity = '0';
            setTimeout(() => {
                if (messageContainer.parentNode) {
                    messageContainer.parentNode.removeChild(messageContainer);
                }
            }, 500);
        }, 3000);
    }
    
    hideStartupElements() {
        // Cacher les éléments de chargement qui pourraient masquer Anna
        const loadingElements = document.querySelectorAll('.loading, .loading-spinner, .loading-content');
        loadingElements.forEach(element => {
            element.style.display = 'none';
        });
        
        // S'assurer que les héros sont visibles
        this.ensureHeroesVisible();
        
        // Déclencher un événement pour informer que le startup est terminé
        const event = new CustomEvent('startup-complete', {
            detail: { message: 'Interface ready, heroes visible' }
        });
        document.dispatchEvent(event);
    }
    
    ensureHeroesVisible() {
        // Vérifier que les héros sont visibles dans le dashboard
        setTimeout(() => {
            const heroCards = document.querySelectorAll('.hero-card, .clickable-hero');
            heroCards.forEach(card => {
                card.style.opacity = '1';
                card.style.visibility = 'visible';
                card.style.transform = 'none';
            });
            
            console.log('✅ Heroes visibility ensured:', heroCards.length, 'hero cards found');
        }, 500);
    }
    
    // API publique
    isReady() {
        return this.isStartupComplete;
    }
    
    forceShowHeroes() {
        this.ensureHeroesVisible();
    }
}

// Initialisation automatique
window.startupMessageSystem = new StartupMessageSystem();

// API globale pour déboguer
window.showHeroes = () => {
    window.startupMessageSystem.forceShowHeroes();
    console.log('🔨 Anna Martel et 🚬 Jean-Grofignon forcés à être visibles !');
};

console.log('🎮 Startup Message System loaded - No more blocking animations!'); 