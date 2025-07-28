// 🎯 SYSTEM MESSAGES - Zone messages propre
// =======================================

class SystemMessages {
    constructor() {
        this.statusBar = document.getElementById('status-bar');
        this.messageQueue = [];
        this.currentMessage = null;
        this.messageInterval = null;
        
        this.initializeSystem();
    }
    
    initializeSystem() {
        if (this.statusBar) {
            this.statusBar.className = 'system-messages-bar';
            this.statusBar.style.cssText = `
                position: fixed;
                bottom: 0;
                left: 0;
                right: 0;
                background: rgba(20, 20, 30, 0.95);
                border-top: 1px solid rgba(74, 144, 226, 0.3);
                padding: 8px 16px;
                font-family: 'Courier New', monospace;
                font-size: 0.8rem;
                color: #E8E8E8;
                z-index: 50;
                min-height: 32px;
                backdrop-filter: blur(5px);
            `;
        }
        
        // Message initial
        this.showSystemMessage('⚡ HEROES OF TIME ENGINE - Ready for temporal operations');
        
        console.log('🎯 System Messages initialized');
    }
    
    // 🎯 MESSAGE SYSTEM
    showSystemMessage(message, type = 'system', duration = 5000) {
        const timestamp = new Date().toLocaleTimeString('fr-FR', { 
            hour12: false, 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit' 
        });
        
        const prefixes = {
            'system': '⚙️ SYS',
            'event': '📋 EVT', 
            'quote': '💬 QTE',
            'warning': '⚠️ WRN',
            'error': '❌ ERR',
            'success': '✅ OK'
        };
        
        const colors = {
            'system': '#4A90E2',
            'event': '#00D2D3',
            'quote': '#FFEAA7',
            'warning': '#FDCB6E',
            'error': '#FF6B6B',
            'success': '#6BCF7F'
        };
        
        const prefix = prefixes[type] || '⚡ MSG';
        const color = colors[type] || '#E8E8E8';
        
        const formattedMessage = `[${timestamp}] ${prefix}: ${message}`;
        
        if (this.statusBar) {
            this.statusBar.innerHTML = `
                <span style="color: ${color}; font-weight: bold;">${prefix}</span>
                <span style="color: #87CEEB; margin: 0 8px;">[${timestamp}]</span>
                <span style="color: #E8E8E8;">${message}</span>
            `;
        }
        
        // Auto-clear après duration
        if (duration > 0) {
            setTimeout(() => {
                this.showIdleMessage();
            }, duration);
        }
        
        console.log(`🎯 ${formattedMessage}`);
    }
    
    // 💬 MESSAGES SPÉCIALISÉS
    showEvent(eventName, details = '') {
        const message = details ? `${eventName} - ${details}` : eventName;
        this.showSystemMessage(message, 'event');
    }
    
    showQuote(quote, author = 'Anna Martel') {
        this.showSystemMessage(`"${quote}" - ${author}`, 'quote', 8000);
    }
    
    showWarning(warning) {
        this.showSystemMessage(warning, 'warning', 7000);
    }
    
    showSuccess(message) {
        this.showSystemMessage(message, 'success', 4000);
    }
    
    showError(error) {
        this.showSystemMessage(error, 'error', 10000);
    }
    
    // 😴 MESSAGE AU REPOS
    showIdleMessage() {
        const idleMessages = [
            'Engine operational - Awaiting temporal instructions',
            'Timeline systems stable - Ready for hero commands',
            'Anna Martel: "Le temps attend vos décisions"',
            'Anna Martel: "When you tell people something, they don\'t listen. Then something happens - ALL THE TIME, ALL THE TIME, the same thing."',
            'Anna Martel: "Quand on prévient les gens, ils n\'écoutent pas. Puis ça arrive - TOUJOURS, TOUJOURS, la même chose."',
            'Anna Martel: "J\'ai construit ce système pour éviter les répétitions causales, mais les humains... toujours les mêmes erreurs."',
            'Quantum states in equilibrium - Ready to collapse',
            'Temporal nexus active - Heroes ready for deployment'
        ];
        
        const randomMessage = idleMessages[Math.floor(Math.random() * idleMessages.length)];
        this.showSystemMessage(randomMessage, 'system', 0); // Permanent until new message
    }
    
    // 🎮 INTÉGRATIONS GAMEPLAY
    onHeroAction(heroName, action) {
        this.showEvent(`Hero Action`, `${heroName} executed ${action}`);
    }
    
    onTimelineChange(newTimeline) {
        this.showEvent(`Timeline Switch`, `Active timeline: ${newTimeline}`);
    }
    
    onTemporalEvent(eventType, description) {
        this.showEvent(`Temporal Event`, `${eventType}: ${description}`);
    }
    
    onQuaternaryWallBreak() {
        this.showQuote('Les murs de la réalité ne résistent pas longtemps à la détermination', 'Anna Martel');
    }
    
    // 🔧 INTÉGRATION AVEC AUTRES SYSTÈMES
    integrateWithGameSystems() {
        // Écouter les événements timeline
        if (window.timelineDiodesSystem) {
            const originalSelect = window.timelineDiodesSystem.selectTimeline;
            window.timelineDiodesSystem.selectTimeline = (timelineId) => {
                originalSelect.call(window.timelineDiodesSystem, timelineId);
                this.onTimelineChange(timelineId);
            };
        }
        
        // Écouter les actions de jeu
        if (window.gameAPI) {
            // Hook les actions héros si l'API existe
        }
    }
}

// 🌍 EXPORT GLOBAL
window.SystemMessages = SystemMessages;

// 🎯 AUTO-INITIALISATION
document.addEventListener('DOMContentLoaded', () => {
    window.systemMessages = new SystemMessages();
    
    // Intégrer avec les autres systèmes après un délai
    setTimeout(() => {
        window.systemMessages.integrateWithGameSystems();
    }, 1000);
    
    // Messages de test au développement
    if (window.location.hostname === 'localhost') {
        setTimeout(() => {
            window.systemMessages.showQuote('Le développement progresse bien', 'Jean-Grofignon');
        }, 3000);
    }
}); 