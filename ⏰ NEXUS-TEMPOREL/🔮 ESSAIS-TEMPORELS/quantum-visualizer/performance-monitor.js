/**
 * 🚀 MONITEUR DE PERFORMANCE CAUSALE - FRONTEND
 * ============================================
 * Surveillance en temps réel des performances du graphe causale
 */

class CausalPerformanceMonitor {
    constructor(apiBaseUrl = 'http://localhost:8080') {
        this.apiBaseUrl = apiBaseUrl;
        this.gameId = null;
        this.isMonitoring = false;
        this.monitoringInterval = null;
        this.callbacks = {
            onMetricsUpdate: [],
            onPerformanceWarning: [],
            onPerformanceCritical: []
        };
        
        // Limites par défaut (synchronisées avec le backend) - AUGMENTÉES POUR TESTER
        this.limits = {
            maxPsiStatesPerGame: 1000,  // Augmenté de 100 à 1000
            maxTemporalDaysRange: 5,
            maxInterferenceCalculations: 500,  // Augmenté de 50 à 500
            maxGraphNodes: 2000,  // Augmenté de 200 à 2000
            performanceWarningThreshold: 0.8
        };
        
        this.lastMetrics = null;
    }
    
    /**
     * 🎯 DÉMARRER LA SURVEILLANCE
     */
    async startMonitoring(gameId, intervalMs = 10000) {
        this.gameId = gameId;
        this.isMonitoring = true;
        
        console.log(`🚀 Démarrage surveillance performance causale - Jeu ${gameId}`);
        
        // Charger les limites depuis le backend
        await this.loadPerformanceLimits();
        
        // Premier check immédiat
        await this.checkPerformance();
        
        // Surveillance périodique
        this.monitoringInterval = setInterval(async () => {
            if (this.isMonitoring) {
                await this.checkPerformance();
            }
        }, intervalMs);
    }
    
    /**
     * 🛑 ARRÊTER LA SURVEILLANCE
     */
    stopMonitoring() {
        this.isMonitoring = false;
        if (this.monitoringInterval) {
            clearInterval(this.monitoringInterval);
            this.monitoringInterval = null;
        }
        console.log('🛑 Surveillance performance causale arrêtée');
    }
    
    /**
     * 📊 VÉRIFIER LES PERFORMANCES
     */
    async checkPerformance() {
        if (!this.gameId) return;
        
        try {
            const response = await fetch(`${this.apiBaseUrl}/api/causal-performance/metrics/${this.gameId}`);
            const data = await response.json();
            
            if (response.ok) {
                this.lastMetrics = data;
                this.processMetrics(data);
            } else {
                console.error('❌ Erreur récupération métriques:', data.error);
            }
        } catch (error) {
            console.error('❌ Erreur surveillance performance:', error);
        }
    }
    
    /**
     * ⚙️ CHARGER LES LIMITES DE PERFORMANCE
     */
    async loadPerformanceLimits() {
        try {
            const response = await fetch(`${this.apiBaseUrl}/api/causal-performance/limits`);
            const limits = await response.json();
            
            if (response.ok) {
                this.limits = { ...this.limits, ...limits };
                console.log('📋 Limites de performance chargées:', this.limits);
            }
        } catch (error) {
            console.warn('⚠️ Impossible de charger les limites, utilisation des valeurs par défaut');
        }
    }
    
    /**
     * 🔄 TRAITER LES MÉTRIQUES
     */
    processMetrics(data) {
        const metrics = data.metrics;
        const status = data.status;
        
        // Notifier les callbacks
        this.notifyCallbacks('onMetricsUpdate', { data, metrics, status });
        
        // Vérifier les alertes
        if (status === 'CRITICAL') {
            this.notifyCallbacks('onPerformanceCritical', { data, metrics });
            console.error('🔴 PERFORMANCE CRITIQUE:', data.violations);
        } else if (status === 'WARNING') {
            this.notifyCallbacks('onPerformanceWarning', { data, metrics });
            console.warn('🟡 AVERTISSEMENT PERFORMANCE:', data.warnings);
        }
        
        // Log des métriques importantes
        console.log(`📊 Métriques causales: ψ-states=${metrics.activePsiStates}/${this.limits.maxPsiStatesPerGame}, ` +
                   `portée=±${metrics.maxTemporalRange}/${this.limits.maxTemporalDaysRange}j, ` +
                   `charge=${(metrics.systemLoad * 100).toFixed(1)}%`);
    }
    
    /**
     * 🧹 NETTOYER LES ÉTATS EXPIRÉS
     */
    async cleanupExpiredStates() {
        if (!this.gameId) return null;
        
        try {
            const response = await fetch(`${this.apiBaseUrl}/api/causal-performance/cleanup/${this.gameId}`, {
                method: 'POST'
            });
            const result = await response.json();
            
            if (result.success) {
                console.log(`🧹 Nettoyage réussi: ${result.cleanedCount} états ψ supprimés`);
                // Recheck après nettoyage
                setTimeout(() => this.checkPerformance(), 1000);
            }
            
            return result;
        } catch (error) {
            console.error('❌ Erreur nettoyage:', error);
            return null;
        }
    }
    
    /**
     * ⚡ OPTIMISER LES PERFORMANCES
     */
    async optimizePerformance() {
        if (!this.gameId) return null;
        
        try {
            const response = await fetch(`${this.apiBaseUrl}/api/causal-performance/optimize/${this.gameId}`, {
                method: 'POST'
            });
            const result = await response.json();
            
            if (result.success) {
                console.log('⚡ Optimisation réussie:', result.actions);
                // Recheck après optimisation
                setTimeout(() => this.checkPerformance(), 1000);
            }
            
            return result;
        } catch (error) {
            console.error('❌ Erreur optimisation:', error);
            return null;
        }
    }
    
    /**
     * 📈 OBTENIR LE STATUT DE PERFORMANCE
     */
    async getPerformanceStatus() {
        if (!this.gameId) return null;
        
        try {
            const response = await fetch(`${this.apiBaseUrl}/api/causal-performance/status/${this.gameId}`);
            const status = await response.json();
            
            if (response.ok) {
                return status;
            } else {
                console.error('❌ Erreur statut performance:', status.error);
                return null;
            }
        } catch (error) {
            console.error('❌ Erreur récupération statut:', error);
            return null;
        }
    }
    
    /**
     * 🎯 AJOUTER UN CALLBACK
     */
    on(event, callback) {
        if (this.callbacks[event]) {
            this.callbacks[event].push(callback);
        }
    }
    
    /**
     * 🔔 NOTIFIER LES CALLBACKS
     */
    notifyCallbacks(event, data) {
        if (this.callbacks[event]) {
            this.callbacks[event].forEach(callback => {
                try {
                    callback(data);
                } catch (error) {
                    console.error(`❌ Erreur callback ${event}:`, error);
                }
            });
        }
    }
    
    /**
     * 📊 CRÉER UN WIDGET DE MONITORING
     */
    createMonitoringWidget() {
        const widget = document.createElement('div');
        widget.id = 'causal-performance-widget';
        widget.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 10px;
            border-radius: 8px;
            font-family: monospace;
            font-size: 12px;
            z-index: 1000;
            min-width: 250px;
        `;
        
        const updateWidget = (data) => {
            if (!data.metrics) return;
            
            const m = data.metrics;
            const statusColor = data.status === 'CRITICAL' ? '#ff4444' : 
                               data.status === 'WARNING' ? '#ffaa00' : '#44ff44';
            
            widget.innerHTML = `
                <div style="border-bottom: 1px solid #666; margin-bottom: 5px; padding-bottom: 5px;">
                    <strong>🚀 Performance Causale</strong>
                    <span style="color: ${statusColor}; float: right;">${data.status}</span>
                </div>
                <div>ψ-states: ${m.activePsiStates}/${this.limits.maxPsiStatesPerGame}</div>
                <div>Portée: ±${m.maxTemporalRange}/${this.limits.maxTemporalDaysRange} jours</div>
                <div>Graphe: ${m.graphComplexity}/${this.limits.maxGraphNodes} nœuds</div>
                <div>Interférences: ${m.interferenceCalculations}</div>
                <div>Charge: ${(m.systemLoad * 100).toFixed(1)}%</div>
                <div style="margin-top: 5px; font-size: 10px; color: #aaa;">
                    Âge moyen: ${m.averageStateAge.toFixed(1)}min
                </div>
            `;
        };
        
        // Mettre à jour le widget lors des mises à jour de métriques
        this.on('onMetricsUpdate', updateWidget);
        
        // Ajouter au DOM
        document.body.appendChild(widget);
        
        return widget;
    }
    
    /**
     * 🎮 CRÉER DES CONTRÔLES D'OPTIMISATION
     */
    createOptimizationControls() {
        const controls = document.createElement('div');
        controls.id = 'causal-optimization-controls';
        controls.style.cssText = `
            position: fixed;
            top: 10px;
            left: 10px;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 10px;
            border-radius: 8px;
            font-family: Arial, sans-serif;
            font-size: 12px;
            z-index: 1000;
        `;
        
        controls.innerHTML = `
            <div style="margin-bottom: 10px;"><strong>🛠️ Optimisation Causale</strong></div>
            <button id="cleanup-btn" style="margin-right: 5px; padding: 5px 10px;">🧹 Nettoyer</button>
            <button id="optimize-btn" style="padding: 5px 10px;">⚡ Optimiser</button>
        `;
        
        // Ajouter les événements
        controls.querySelector('#cleanup-btn').onclick = () => this.cleanupExpiredStates();
        controls.querySelector('#optimize-btn').onclick = () => this.optimizePerformance();
        
        // Ajouter au DOM
        document.body.appendChild(controls);
        
        return controls;
    }
    
    /**
     * 📊 OBTENIR LES DERNIÈRES MÉTRIQUES
     */
    getLastMetrics() {
        return this.lastMetrics;
    }
    
    /**
     * ❓ VÉRIFIER SI LA SURVEILLANCE EST ACTIVE
     */
    isMonitoringActive() {
        return this.isMonitoring;
    }
}

// Export pour utilisation
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CausalPerformanceMonitor;
} else {
    window.CausalPerformanceMonitor = CausalPerformanceMonitor;
}

// Initialisation automatique si dans un contexte de navigateur
if (typeof window !== 'undefined') {
    console.log('🚀 Module CausalPerformanceMonitor chargé');
} 