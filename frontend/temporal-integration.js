// temporal-integration.js - Intégration du Système Temporel Révolutionnaire
// Connexion entre le renderer temporel et le backend Heroes of Time

class TemporalIntegration {
    constructor() {
        this.temporalRenderer = null;
        this.backendAPI = null;
        this.temporalWebSocket = null;
        this.gameState = null;
        this.updateInterval = null;
        
        this.initializeIntegration();
    }
    
    initializeIntegration() {
        // Initialiser la connexion au backend
        this.backendAPI = new TemporalAPI();
        
        // Créer le renderer temporel
        this.temporalRenderer = new TemporalHexagonalRenderer('game-canvas');
        
        // Connecter WebSocket pour temps réel
        this.connectTemporalWebSocket();
        
        // Démarrer les mises à jour
        this.startUpdateLoop();
        
        // Initialiser les événements
        this.setupEventListeners();
    }
    
    connectTemporalWebSocket() {
        this.temporalWebSocket = new WebSocket('ws://localhost:8080/temporal-updates');
        
        this.temporalWebSocket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            this.handleTemporalUpdate(data);
        };
        
        this.temporalWebSocket.onopen = () => {
            console.log('🌀 Connexion WebSocket temporelle établie');
        };
        
        this.temporalWebSocket.onerror = (error) => {
            console.error('❌ Erreur WebSocket temporelle:', error);
        };
    }
    
    handleTemporalUpdate(data) {
        switch (data.type) {
            case 'CAUSAL_COLLAPSE':
                this.handleCausalCollapse(data);
                break;
            case 'TEMPORAL_SHIFT':
                this.handleTemporalShift(data);
                break;
            case 'OBSERVATION_TRIGGERED':
                this.handleObservationTriggered(data);
                break;
            case 'ARTIFACT_ACTIVATED':
                this.handleArtifactActivated(data);
                break;
        }
    }
    
    handleCausalCollapse(data) {
        // Gérer l'effondrement causal
        console.log('🌀 Collapse causale détecté:', data);
        
        // Ajouter l'animation de collapse
        this.temporalRenderer.addCollapseAnimation(data.position, data.type);
        
        // Mettre à jour les états fantômes
        this.temporalRenderer.removeGhostState(data.psiStateId);
        
        // Log dans le panneau causal
        this.logCausalEvent(`Collapse ${data.type} en (${data.position.x},${data.position.y})`);
    }
    
    handleTemporalShift(data) {
        // Gérer le décalage temporel
        console.log('⏰ Décalage temporel:', data);
        
        // Mettre à jour les timelines des héros
        if (data.heroId) {
            this.updateHeroTimeline(data.heroId, data.newDay);
        }
        
        // Recalculer les zones temporelles
        this.temporalRenderer.updateTemporalPreview();
    }
    
    handleObservationTriggered(data) {
        // Gérer l'observation quantique
        console.log('👁️ Observation quantique:', data);
        
        // Ajouter zone d'observation
        this.temporalRenderer.addObservationZone(data.position, data.observerId);
        
        // Déclencher collapse si nécessaire
        if (data.triggersCollapse) {
            this.triggerObservationCollapse(data.psiStateId);
        }
    }
    
    handleArtifactActivated(data) {
        // Gérer l'activation d'artefact
        console.log('⚡ Artefact activé:', data);
        
        // Ajouter effet visuel
        this.temporalRenderer.addArtifactEffect(data.position, data.artifactType);
        
        // Appliquer effets temporels
        this.applyArtifactEffects(data);
    }
    
    startUpdateLoop() {
        this.updateInterval = setInterval(() => {
            this.updateGameState();
        }, 1000); // Mise à jour chaque seconde
    }
    
    async updateGameState() {
        try {
            // Récupérer l'état du jeu
            const gameState = await this.backendAPI.getGameState();
            
            // Mettre à jour le renderer
            this.temporalRenderer.updateGameState(gameState);
            
            // Traiter les événements temporels
            this.processTemporalEvents(gameState);
            
        } catch (error) {
            console.error('❌ Erreur mise à jour état:', error);
        }
    }
    
    processTemporalEvents(gameState) {
        // Traiter les nouveaux états ψ
        if (gameState.psiStates) {
            gameState.psiStates.forEach(psi => {
                if (psi.status === 'ACTIVE') {
                    this.temporalRenderer.updateGhostState(psi);
                }
            });
        }
        
        // Détecter les collisions causales
        this.detectCausalCollisions(gameState);
        
        // Mettre à jour les zones d'observation
        this.updateObservationZones(gameState);
        
        // Traiter les artefacts
        this.processArtifacts(gameState);
    }
    
    detectCausalCollisions(gameState) {
        // Détection des collisions causales
        const positions = new Map();
        
        gameState.psiStates?.forEach(psi => {
            if (psi.status === 'ACTIVE' && psi.targetX !== null && psi.targetY !== null) {
                const key = `${psi.targetX},${psi.targetY}`;
                if (!positions.has(key)) {
                    positions.set(key, []);
                }
                positions.get(key).push(psi);
            }
        });
        
        positions.forEach((psiStates, key) => {
            if (psiStates.length > 1) {
                const [x, y] = key.split(',').map(n => parseInt(n));
                this.reportCausalCollision(x, y, psiStates);
            }
        });
    }
    
    updateObservationZones(gameState) {
        // Mise à jour des zones d'observation
        gameState.heroes?.forEach(hero => {
            if (hero.hasObservationAbility) {
                this.temporalRenderer.updateObservationZone(hero);
            }
        });
    }
    
    processArtifacts(gameState) {
        // Traitement des artefacts
        gameState.artifacts?.forEach(artifact => {
            if (artifact.active) {
                this.temporalRenderer.updateArtifactEffect(artifact);
            }
        });
    }
    
    setupEventListeners() {
        // Écouteur pour les commandes temporelles
        document.addEventListener('temporal-command', (event) => {
            this.executeTemporalCommand(event.detail);
        });
        
        // Écouteur pour sélection de héros
        document.addEventListener('hero-selected', (event) => {
            this.selectHero(event.detail.heroId);
        });
        
        // Écouteur pour actions utilisateur
        document.addEventListener('user-action', (event) => {
            this.processUserAction(event.detail);
        });
    }
    
    async executeTemporalCommand(command) {
        try {
            // Exécuter commande temporelle
            const result = await this.backendAPI.executeTemporalScript(command);
            
            // Traiter le résultat
            if (result.success) {
                this.logCausalEvent(`Commande exécutée: ${command}`);
                
                // Mettre à jour affichage
                if (result.quantumStateId) {
                    this.temporalRenderer.highlightNewPsiState(result.quantumStateId);
                }
            } else {
                this.logCausalEvent(`Erreur: ${result.error}`, 'error');
            }
            
        } catch (error) {
            console.error('❌ Erreur commande temporelle:', error);
            this.logCausalEvent(`Erreur système: ${error.message}`, 'error');
        }
    }
    
    selectHero(heroId) {
        // Sélectionner un héros
        const hero = this.gameState.heroes?.find(h => h.id === heroId);
        if (hero) {
            this.temporalRenderer.selectHero(hero);
            this.logCausalEvent(`Héros sélectionné: ${hero.name}`);
        }
    }
    
    processUserAction(action) {
        switch (action.type) {
            case 'MOVE_HERO':
                this.processMoveHero(action);
                break;
            case 'CREATE_PSI_STATE':
                this.createPsiState(action);
                break;
            case 'USE_ARTIFACT':
                this.useArtifact(action);
                break;
            case 'OBSERVE_ZONE':
                this.observeZone(action);
                break;
        }
    }
    
    async processMoveHero(action) {
        // Traiter mouvement de héros avec système UTMD
        const { heroId, targetX, targetY, futureDays } = action;
        
        // Calculer le coût temporel
        const temporalCost = this.calculateTemporalCost(heroId, targetX, targetY);
        
        // Créer commande temporelle
        const command = futureDays > 0 
            ? `ψ${this.generatePsiId()}: ⊙(Δt+${futureDays} @${targetX},${targetY} ⟶ MOV(${heroId}, @${targetX},${targetY}))`
            : `MOV(${heroId}, @${targetX},${targetY})`;
        
        await this.executeTemporalCommand(command);
    }
    
    async createPsiState(action) {
        // Créer état ψ
        const { expression, probability, targetX, targetY } = action;
        
        const command = `ψ${this.generatePsiId()}: ${expression}`;
        await this.executeTemporalCommand(command);
    }
    
    async useArtifact(action) {
        // Utiliser artefact
        const { artifactId, targetX, targetY, heroId } = action;
        
        const command = `USE(ARTIFACT, ${artifactId}, HERO:${heroId})`;
        await this.executeTemporalCommand(command);
    }
    
    async observeZone(action) {
        // Observer une zone
        const { targetX, targetY, observerId } = action;
        
        // Déclencher observation
        const command = `OBSERVE(@${targetX},${targetY}, HERO:${observerId})`;
        await this.executeTemporalCommand(command);
    }
    
    calculateTemporalCost(heroId, targetX, targetY) {
        // Calculer coût temporel selon UTMD
        const hero = this.gameState.heroes?.find(h => h.id === heroId);
        if (!hero) return 1;
        
        const distance = this.calculateHexDistance(
            hero.position.x, hero.position.y,
            targetX, targetY
        );
        
        const movementPerDay = hero.movementPointsPerDay || 4;
        return Math.ceil(distance / movementPerDay);
    }
    
    calculateHexDistance(q1, r1, q2, r2) {
        // Distance hexagonale
        return (Math.abs(q1 - q2) + Math.abs(q1 + r1 - q2 - r2) + Math.abs(r1 - r2)) / 2;
    }
    
    generatePsiId() {
        // Générer ID unique pour état ψ
        return String(Date.now()).slice(-3);
    }
    
    logCausalEvent(message, type = 'info') {
        // Logger événement causal
        const collapseLog = document.getElementById('collapse-log');
        if (collapseLog) {
            const timestamp = new Date().toLocaleTimeString();
            const logEntry = document.createElement('div');
            logEntry.className = `log-entry log-${type}`;
            logEntry.textContent = `[${timestamp}] ${message}`;
            collapseLog.appendChild(logEntry);
            
            // Garder seulement les 10 derniers messages
            while (collapseLog.children.length > 10) {
                collapseLog.removeChild(collapseLog.firstChild);
            }
        }
    }
    
    reportCausalCollision(x, y, psiStates) {
        // Rapporter collision causale
        console.log(`🥊 Collision causale détectée en (${x},${y}):`, psiStates);
        
        // Ajouter animation
        this.temporalRenderer.addCollisionAnimation(x, y, psiStates);
        
        // Logger
        this.logCausalEvent(`Collision causale: ${psiStates.length} états en (${x},${y})`, 'warning');
    }
    
    triggerObservationCollapse(psiStateId) {
        // Déclencher collapse par observation
        const command = `COLLAPSE(${psiStateId})`;
        this.executeTemporalCommand(command);
    }
    
    updateHeroTimeline(heroId, newDay) {
        // Mettre à jour timeline héros
        const hero = this.gameState.heroes?.find(h => h.id === heroId);
        if (hero) {
            hero.currentDay = newDay;
            this.temporalRenderer.updateHeroTimeline(hero);
        }
    }
    
    applyArtifactEffects(artifactData) {
        // Appliquer effets d'artefact
        switch (artifactData.artifactType) {
            case 'VEIL':
                this.temporalRenderer.enableGhostWalk(artifactData.position);
                break;
            case 'ANCHOR_TOWER':
                this.temporalRenderer.createAnchorZone(artifactData.position);
                break;
            case 'WIGNER_EYE':
                this.temporalRenderer.revealGhostOpponents(artifactData.position);
                break;
            case 'TEMPORAL_SWORD':
                this.temporalRenderer.addTemporalCutEffect(artifactData.position);
                break;
        }
    }
    
    // Méthodes utilitaires
    destroy() {
        // Nettoyer ressources
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }
        
        if (this.temporalWebSocket) {
            this.temporalWebSocket.close();
        }
        
        if (this.temporalRenderer) {
            this.temporalRenderer.destroy();
        }
    }
}

// API Backend Temporelle
class TemporalAPI {
    constructor() {
        this.baseUrl = 'http://localhost:8080/api/temporal';
        this.gameId = 1; // ID par défaut
    }
    
    async getGameState() {
        const response = await fetch(`${this.baseUrl}/game/${this.gameId}/state`);
        return response.json();
    }
    
    async executeTemporalScript(script) {
        const response = await fetch(`${this.baseUrl}/game/${this.gameId}/execute`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ script })
        });
        return response.json();
    }
    
    async getCollapseStatistics() {
        const response = await fetch(`${this.baseUrl}/game/${this.gameId}/collapse-stats`);
        return response.json();
    }
    
    async getTemporalMetrics() {
        const response = await fetch(`${this.baseUrl}/game/${this.gameId}/temporal-metrics`);
        return response.json();
    }
}

// Initialisation globale
window.temporalIntegration = null;

// Fonction d'initialisation
function initializeTemporalSystem() {
    if (window.temporalIntegration) {
        window.temporalIntegration.destroy();
    }
    
    window.temporalIntegration = new TemporalIntegration();
    console.log('🚀 Système temporel Heroes of Time initialisé');
}

// Auto-initialisation
document.addEventListener('DOMContentLoaded', () => {
    initializeTemporalSystem();
}); 