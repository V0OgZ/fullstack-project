// 🌟 SYSTÈME DE LOG D'ÉVÉNEMENTS INTELLIGENT - Heroes of Time
// Affiche des événements traduits de manière élégante sans encombrer l'interface

class IntelligentEventLogSystem {
    constructor() {
        this.translationService = null;
        this.eventQueue = [];
        this.activeEvents = new Map();
        this.maxVisibleEvents = 3;
        this.eventTimeout = 5000; // 5 secondes par défaut
        this.priorityLevels = {
            'CRITICAL': { priority: 5, timeout: 8000, color: '#e74c3c' },
            'IMPORTANT': { priority: 4, timeout: 6000, color: '#f39c12' },
            'SPELL_EFFECT': { priority: 3, timeout: 5000, color: '#9b59b6' },
            'HERO_ACTION': { priority: 3, timeout: 4000, color: '#3498db' },
            'QUANTUM': { priority: 3, timeout: 5000, color: '#1abc9c' },
            'INFO': { priority: 2, timeout: 3000, color: '#95a5a6' },
            'DEBUG': { priority: 1, timeout: 2000, color: '#7f8c8d' }
        };
        
        this.init();
    }
    
    async init() {
        // Initialiser le service de traduction
        if (window.TranslationService) {
            this.translationService = new window.TranslationService();
            await this.translationService.checkAvailability();
        }
        
        this.createEventLogContainer();
        this.setupEventFiltering();
        this.startEventProcessor();
        
        console.log('🌟 Système de log d\'événements intelligent initialisé');
    }
    
    // 🎨 CRÉER LE CONTENEUR D'ÉVÉNEMENTS
    createEventLogContainer() {
        // Supprimer l'ancien conteneur s'il existe
        const existing = document.getElementById('intelligent-event-log');
        if (existing) existing.remove();
        
        const container = document.createElement('div');
        container.id = 'intelligent-event-log';
        container.className = 'intelligent-event-log';
        
        container.innerHTML = `
            <div class="event-log-header">
                <span class="event-log-title">📋 Événements</span>
                <div class="event-log-controls">
                    <button id="event-log-filter" class="event-control-btn" title="Filtrer les événements">🔍</button>
                    <button id="event-log-clear" class="event-control-btn" title="Effacer les événements">🗑️</button>
                    <button id="event-log-toggle" class="event-control-btn" title="Masquer/Afficher">👁️</button>
                </div>
            </div>
            <div class="event-log-content" id="event-log-content">
                <!-- Les événements apparaîtront ici -->
            </div>
            <div class="event-log-filters" id="event-log-filters" style="display: none;">
                <label><input type="checkbox" checked data-priority="CRITICAL"> Critique</label>
                <label><input type="checkbox" checked data-priority="IMPORTANT"> Important</label>
                <label><input type="checkbox" checked data-priority="SPELL_EFFECT"> Sorts</label>
                <label><input type="checkbox" checked data-priority="HERO_ACTION"> Héros</label>
                <label><input type="checkbox" checked data-priority="QUANTUM"> Quantique</label>
                <label><input type="checkbox" data-priority="INFO"> Info</label>
                <label><input type="checkbox" data-priority="DEBUG"> Debug</label>
            </div>
        `;
        
        // Ajouter au body
        document.body.appendChild(container);
        
        // Configurer les contrôles
        this.setupEventControls();
    }
    
    // ⚙️ CONFIGURER LES CONTRÔLES
    setupEventControls() {
        document.getElementById('event-log-filter').addEventListener('click', () => {
            const filters = document.getElementById('event-log-filters');
            filters.style.display = filters.style.display === 'none' ? 'block' : 'none';
        });
        
        document.getElementById('event-log-clear').addEventListener('click', () => {
            this.clearAllEvents();
        });
        
        document.getElementById('event-log-toggle').addEventListener('click', () => {
            const content = document.getElementById('event-log-content');
            const isVisible = content.style.display !== 'none';
            content.style.display = isVisible ? 'none' : 'block';
            document.getElementById('event-log-toggle').textContent = isVisible ? '👁️‍🗨️' : '👁️';
        });
    }
    
    // 🎯 CONFIGURER LE FILTRAGE D'ÉVÉNEMENTS
    setupEventFiltering() {
        // Filtres intelligents par défaut
        this.enabledFilters = new Set(['CRITICAL', 'IMPORTANT', 'SPELL_EFFECT', 'HERO_ACTION', 'QUANTUM']);
        
        // Écouter les changements de filtres
        document.addEventListener('change', (e) => {
            if (e.target.dataset.priority) {
                if (e.target.checked) {
                    this.enabledFilters.add(e.target.dataset.priority);
                } else {
                    this.enabledFilters.delete(e.target.dataset.priority);
                }
                this.refreshVisibleEvents();
            }
        });
    }
    
    // 📝 AJOUTER UN ÉVÉNEMENT
    async addEvent(script, priority = 'INFO', context = {}) {
        const eventId = Date.now() + Math.random();
        
        // Traduire le script si possible
        let translatedText = script;
        let eventDetails = null;
        
        if (this.translationService && this.translationService.isAvailable) {
            try {
                const translation = await this.translationService.analyzeScript(script);
                translatedText = translation.translated || script;
                eventDetails = {
                    type: translation.type,
                    complexity: translation.complexity,
                    details: translation.details,
                    icon: this.getScriptIcon(translation.type)
                };
            } catch (error) {
                console.warn('Erreur de traduction pour l\'événement:', error);
            }
        }
        
        const event = {
            id: eventId,
            originalScript: script,
            translatedText,
            priority,
            timestamp: Date.now(),
            context,
            details: eventDetails,
            ...this.priorityLevels[priority]
        };
        
        // Ajouter à la queue avec intelligence
        this.addToQueue(event);
    }
    
    // 🧠 AJOUTER À LA QUEUE INTELLIGEMMENT
    addToQueue(event) {
        // Éviter les doublons récents (même script dans les 2 dernières secondes)
        const recentDuplicate = this.eventQueue.find(e => 
            e.originalScript === event.originalScript && 
            Date.now() - e.timestamp < 2000
        );
        
        if (recentDuplicate) {
            console.log('🔄 Événement dupliqué ignoré:', event.originalScript);
            return;
        }
        
        // Limiter la taille de la queue
        if (this.eventQueue.length >= 50) {
            this.eventQueue.shift(); // Supprimer le plus ancien
        }
        
        this.eventQueue.push(event);
        
        // Trier par priorité et timestamp
        this.eventQueue.sort((a, b) => {
            if (a.priority !== b.priority) {
                return b.priority - a.priority; // Plus haute priorité d'abord
            }
            return b.timestamp - a.timestamp; // Plus récent d'abord
        });
    }
    
    // ⚡ PROCESSEUR D'ÉVÉNEMENTS
    startEventProcessor() {
        setInterval(() => {
            this.processEventQueue();
            this.cleanupExpiredEvents();
        }, 100);
    }
    
    processEventQueue() {
        // Afficher les événements si on a de la place
        while (this.activeEvents.size < this.maxVisibleEvents && this.eventQueue.length > 0) {
            const event = this.eventQueue.shift();
            
            // Vérifier si le filtre est activé
            if (!this.enabledFilters.has(event.priority)) {
                continue;
            }
            
            this.displayEvent(event);
        }
    }
    
    // 🎭 AFFICHER UN ÉVÉNEMENT
    displayEvent(event) {
        const container = document.getElementById('event-log-content');
        if (!container) return;
        
        const eventElement = document.createElement('div');
        eventElement.className = 'event-item';
        eventElement.id = `event-${event.id}`;
        
        const icon = event.details?.icon || this.getPriorityIcon(event.priority);
        const complexityBadge = event.details?.complexity ? 
            `<span class="complexity-badge ${event.details.complexity}">${event.details.complexity}</span>` : '';
        
        eventElement.innerHTML = `
            <div class="event-header">
                <span class="event-icon">${icon}</span>
                <span class="event-priority ${event.priority.toLowerCase()}">${event.priority}</span>
                ${complexityBadge}
                <span class="event-time">${new Date(event.timestamp).toLocaleTimeString()}</span>
            </div>
            <div class="event-content">
                <div class="event-text">${event.translatedText}</div>
                ${event.details?.details ? `<div class="event-details">${event.details.details}</div>` : ''}
                ${event.context.location ? `<div class="event-location">📍 ${event.context.location}</div>` : ''}
            </div>
            <div class="event-progress">
                <div class="event-progress-bar" style="background-color: ${event.color}"></div>
            </div>
        `;
        
        // Animation d'entrée
        eventElement.style.transform = 'translateX(100%)';
        eventElement.style.opacity = '0';
        
        container.appendChild(eventElement);
        
        // Animation d'apparition
        requestAnimationFrame(() => {
            eventElement.style.transition = 'all 0.3s ease-out';
            eventElement.style.transform = 'translateX(0)';
            eventElement.style.opacity = '1';
        });
        
        // Ajouter aux événements actifs
        this.activeEvents.set(event.id, {
            ...event,
            element: eventElement,
            startTime: Date.now()
        });
        
        // Programmer la disparition
        setTimeout(() => {
            this.removeEvent(event.id);
        }, event.timeout);
        
        // Animation de la barre de progression
        this.animateProgressBar(event.id, event.timeout);
    }
    
    // 📊 ANIMER LA BARRE DE PROGRESSION
    animateProgressBar(eventId, duration) {
        const activeEvent = this.activeEvents.get(eventId);
        if (!activeEvent) return;
        
        const progressBar = activeEvent.element.querySelector('.event-progress-bar');
        if (!progressBar) return;
        
        progressBar.style.transition = `width ${duration}ms linear`;
        progressBar.style.width = '100%';
        
        // Démarrer l'animation
        requestAnimationFrame(() => {
            progressBar.style.width = '0%';
        });
    }
    
    // 🗑️ SUPPRIMER UN ÉVÉNEMENT
    removeEvent(eventId) {
        const activeEvent = this.activeEvents.get(eventId);
        if (!activeEvent) return;
        
        // Animation de sortie
        activeEvent.element.style.transition = 'all 0.3s ease-in';
        activeEvent.element.style.transform = 'translateX(-100%)';
        activeEvent.element.style.opacity = '0';
        
        setTimeout(() => {
            if (activeEvent.element.parentNode) {
                activeEvent.element.parentNode.removeChild(activeEvent.element);
            }
            this.activeEvents.delete(eventId);
        }, 300);
    }
    
    // 🧹 NETTOYER LES ÉVÉNEMENTS EXPIRÉS
    cleanupExpiredEvents() {
        const now = Date.now();
        for (const [eventId, event] of this.activeEvents.entries()) {
            if (now - event.startTime > event.timeout + 1000) {
                this.removeEvent(eventId);
            }
        }
    }
    
    // 🔄 RAFRAÎCHIR LES ÉVÉNEMENTS VISIBLES
    refreshVisibleEvents() {
        // Masquer tous les événements non filtrés
        for (const [eventId, event] of this.activeEvents.entries()) {
            const shouldShow = this.enabledFilters.has(event.priority);
            event.element.style.display = shouldShow ? 'block' : 'none';
        }
    }
    
    // 🗑️ EFFACER TOUS LES ÉVÉNEMENTS
    clearAllEvents() {
        for (const eventId of this.activeEvents.keys()) {
            this.removeEvent(eventId);
        }
        this.eventQueue = [];
    }
    
    // 🎨 UTILITAIRES D'ICÔNES
    getScriptIcon(scriptType) {
        const icons = {
            'PSI_STATE': 'ψ',
            'COLLAPSE': '†',
            'OBSERVATION': 'Π',
            'HERO_CREATION': '👤',
            'MOVEMENT': '🚶',
            'CREATION': '✨',
            'ARTIFACT_USAGE': '🔮',
            'BATTLE': '⚔️',
            'SPELL_CAST': '🌟',
            'UNKNOWN': '❓'
        };
        return icons[scriptType] || '📍';
    }
    
    getPriorityIcon(priority) {
        const icons = {
            'CRITICAL': '🚨',
            'IMPORTANT': '⚠️',
            'SPELL_EFFECT': '✨',
            'HERO_ACTION': '⚔️',
            'QUANTUM': 'ψ',
            'INFO': 'ℹ️',
            'DEBUG': '🔧'
        };
        return icons[priority] || 'ℹ️';
    }
    
    // 📊 STATISTIQUES DU SYSTÈME
    getStats() {
        return {
            activeEvents: this.activeEvents.size,
            queuedEvents: this.eventQueue.length,
            translationAvailable: this.translationService?.isAvailable || false,
            enabledFilters: Array.from(this.enabledFilters)
        };
    }
}

// 🌍 EXPORT ET INITIALISATION GLOBALE
window.IntelligentEventLogSystem = IntelligentEventLogSystem;

// Auto-initialisation
document.addEventListener('DOMContentLoaded', () => {
    if (!window.intelligentEventLog) {
        window.intelligentEventLog = new IntelligentEventLogSystem();
    }
});

// 🎯 API SIMPLIFIÉE POUR L'UTILISATION
window.logEvent = (script, priority = 'INFO', context = {}) => {
    if (window.intelligentEventLog) {
        window.intelligentEventLog.addEvent(script, priority, context);
    }
};

// 🎮 INTÉGRATION AVEC LES SYSTÈMES EXISTANTS
// Hook dans le système de console existant
if (window.scriptConsole) {
    const originalAddToOutput = window.scriptConsole.addToOutput;
    window.scriptConsole.addToOutput = function(text, type) {
        // Appeler la méthode originale
        originalAddToOutput.call(this, text, type);
        
        // Ajouter au système d'événements intelligent
        if (window.intelligentEventLog && type !== 'debug') {
            const priority = type === 'error' ? 'CRITICAL' : 
                           type === 'success' ? 'IMPORTANT' : 
                           type === 'warning' ? 'IMPORTANT' : 'INFO';
            
            window.intelligentEventLog.addEvent(text, priority);
        }
    };
}