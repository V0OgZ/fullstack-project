// 📡 WEBSOCKET HANDLER ZFC - COMMUNICATION INSTANTANÉE JEAN
// ===========================================================
// Système WebSocket pour multi-joueurs temps réel
// Synchronisation états quantiques et actions temporelles

class WebSocketHandlerZFC {
    constructor() {
        this.socket = null;
        this.connectionState = 'DISCONNECTED';
        this.playerId = null;
        this.gameId = null;
        this.reconnectAttempts = 0;
        this.maxReconnectAttempts = 5;
        this.reconnectDelay = 1000; // 1 seconde
        
        // Queue des messages en attente
        this.messageQueue = [];
        this.quantumStates = new Map();
        this.playerStates = new Map();
        
        // Handlers d'événements
        this.eventHandlers = {
            'game_state_update': this.handleGameStateUpdate.bind(this),
            'quantum_state_sync': this.handleQuantumStateSync.bind(this),
            'player_action': this.handlePlayerAction.bind(this),
            'temporal_event': this.handleTemporalEvent.bind(this),
            'conflict_detected': this.handleConflictDetected.bind(this),
            'timeline_merge': this.handleTimelineMerge.bind(this),
            'player_join': this.handlePlayerJoin.bind(this),
            'player_leave': this.handlePlayerLeave.bind(this)
        };
        
        console.log('📡 WebSocketHandlerZFC initialisé');
    }
    
    // 🔌 CONNEXION WEBSOCKET
    connect(gameId, playerId) {
        this.gameId = gameId;
        this.playerId = playerId;
        
        const wsUrl = `ws://localhost:8080/ws/game/${gameId}?playerId=${playerId}`;
        
        try {
            this.socket = new WebSocket(wsUrl);
            this.setupEventListeners();
            this.connectionState = 'CONNECTING';
            
            console.log(`📡 Connexion WebSocket: ${wsUrl}`);
        } catch (error) {
            console.error('❌ Erreur connexion WebSocket:', error);
            this.handleConnectionError(error);
        }
    }
    
    // 🎯 CONFIGURATION LISTENERS
    setupEventListeners() {
        this.socket.onopen = (event) => {
            console.log('✅ WebSocket connecté !');
            this.connectionState = 'CONNECTED';
            this.reconnectAttempts = 0;
            
            // Envoyer messages en attente
            this.flushMessageQueue();
            
            // S'identifier auprès du serveur
            this.sendMessage({
                type: 'player_identify',
                playerId: this.playerId,
                gameId: this.gameId,
                timestamp: Date.now()
            });
        };
        
        this.socket.onmessage = (event) => {
            try {
                const message = JSON.parse(event.data);
                this.handleIncomingMessage(message);
            } catch (error) {
                console.error('❌ Erreur parsing message WebSocket:', error);
            }
        };
        
        this.socket.onclose = (event) => {
            console.log('🔌 WebSocket fermé:', event.code, event.reason);
            this.connectionState = 'DISCONNECTED';
            
            // Tentative de reconnexion automatique
            if (this.reconnectAttempts < this.maxReconnectAttempts) {
                this.scheduleReconnect();
            }
        };
        
        this.socket.onerror = (error) => {
            console.error('❌ Erreur WebSocket:', error);
            this.handleConnectionError(error);
        };
    }
    
    // 📨 TRAITEMENT MESSAGES ENTRANTS
    handleIncomingMessage(message) {
        console.log(`📨 Message reçu:`, message.type);
        
        // Vérifier si handler existe
        const handler = this.eventHandlers[message.type];
        if (handler) {
            handler(message);
        } else {
            console.warn(`⚠️ Handler non trouvé pour: ${message.type}`);
        }
        
        // Notifier les listeners externes
        this.notifyExternalListeners(message);
    }
    
    // 🎮 HANDLERS SPÉCIFIQUES
    handleGameStateUpdate(message) {
        console.log('🎮 Mise à jour état jeu:', message.gameState);
        
        // Synchroniser avec le store local
        if (window.gameStore && window.gameStore.setCurrentGame) {
            window.gameStore.setCurrentGame(message.gameState);
        }
        
        // Mettre à jour les états quantiques
        if (message.quantumStates) {
            this.syncQuantumStates(message.quantumStates);
        }
    }
    
    handleQuantumStateSync(message) {
        console.log('🔮 Synchronisation états quantiques:', message.states.length);
        
        // Mettre à jour les états quantiques locaux
        for (const state of message.states) {
            this.quantumStates.set(state.id, {
                ...state,
                lastSync: Date.now()
            });
        }
        
        // Notifier le système de brouillard
        if (window.fogSystem) {
            window.fogSystem.syncQuantumStates(message.states);
        }
    }
    
    handlePlayerAction(message) {
        console.log(`⚔️ Action joueur ${message.playerId}:`, message.action);
        
        // Afficher l'action avec symboles runiques
        if (window.runicSymbols && message.action.position) {
            const symbolType = this.getSymbolForAction(message.action.type);
            window.runicSymbols.triggerRunicEffect(
                message.action.position.x * 32, 
                message.action.position.y * 32, 
                symbolType
            );
        }
        
        // Vérifier conflits temporels
        if (window.conflictDetector) {
            const conflicts = window.conflictDetector.detectConflicts(
                message.gameState, 
                message.action
            );
            
            if (conflicts.length > 0) {
                console.log(`🔄 ${conflicts.length} conflits détectés`);
            }
        }
    }
    
    handleTemporalEvent(message) {
        console.log('⏰ Événement temporel:', message.event);
        
        // Traitement selon type d'événement
        switch (message.event.type) {
            case 'TIMELINE_BRANCH':
                this.handleTimelineBranch(message.event);
                break;
            case 'CAUSAL_COLLAPSE':
                this.handleCausalCollapse(message.event);
                break;
            case 'QUANTUM_SUPERPOSITION':
                this.handleQuantumSuperposition(message.event);
                break;
        }
    }
    
    handleConflictDetected(message) {
        console.log('🔄 Conflit détecté par serveur:', message.conflict);
        
        // Notifier le système de détection local
        if (window.conflictDetector) {
            window.conflictDetector.handleServerConflict(message.conflict);
        }
        
        // Afficher notification utilisateur
        this.showConflictNotification(message.conflict);
    }
    
    handleTimelineMerge(message) {
        console.log('🌀 Fusion timeline:', message.timelines);
        
        // Effectuer la fusion côté client
        if (window.gameStore) {
            window.gameStore.mergeTimelines(message.timelines);
        }
    }
    
    handlePlayerJoin(message) {
        console.log(`👤 Joueur rejoint: ${message.player.name}`);
        this.playerStates.set(message.player.id, message.player);
        this.showPlayerNotification(`${message.player.name} a rejoint la partie`, 'join');
    }
    
    handlePlayerLeave(message) {
        console.log(`👋 Joueur quitte: ${message.playerId}`);
        this.playerStates.delete(message.playerId);
        this.showPlayerNotification(`Un joueur a quitté la partie`, 'leave');
    }
    
    // 📤 ENVOI MESSAGES
    sendMessage(message) {
        if (this.connectionState === 'CONNECTED' && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify({
                ...message,
                playerId: this.playerId,
                gameId: this.gameId,
                timestamp: Date.now()
            }));
        } else {
            // Ajouter à la queue si déconnecté
            this.messageQueue.push(message);
            console.log('📦 Message ajouté à la queue (déconnecté)');
        }
    }
    
    // ⚔️ ACTIONS SPÉCIFIQUES
    sendPlayerAction(action) {
        this.sendMessage({
            type: 'player_action',
            action: action
        });
    }
    
    sendQuantumStateUpdate(stateId, newState) {
        this.sendMessage({
            type: 'quantum_state_update',
            stateId: stateId,
            state: newState
        });
    }
    
    sendTemporalAction(temporalAction) {
        this.sendMessage({
            type: 'temporal_action',
            action: temporalAction
        });
    }
    
    requestGameStateSync() {
        this.sendMessage({
            type: 'request_game_sync'
        });
    }
    
    // 🔄 GESTION RECONNEXION
    scheduleReconnect() {
        this.reconnectAttempts++;
        const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1); // Backoff exponentiel
        
        console.log(`🔄 Reconnexion dans ${delay}ms (tentative ${this.reconnectAttempts})`);
        
        setTimeout(() => {
            if (this.connectionState === 'DISCONNECTED') {
                this.connect(this.gameId, this.playerId);
            }
        }, delay);
    }
    
    flushMessageQueue() {
        console.log(`📦 Envoi ${this.messageQueue.length} messages en attente`);
        
        while (this.messageQueue.length > 0) {
            const message = this.messageQueue.shift();
            this.sendMessage(message);
        }
    }
    
    // 🔮 SYNCHRONISATION ÉTATS QUANTIQUES
    syncQuantumStates(states) {
        for (const state of states) {
            const localState = this.quantumStates.get(state.id);
            
            // Vérifier si mise à jour nécessaire
            if (!localState || localState.version < state.version) {
                this.quantumStates.set(state.id, state);
                console.log(`🔮 État quantique ${state.id} synchronisé`);
            }
        }
    }
    
    // 🎨 UTILITAIRES INTERFACE
    getSymbolForAction(actionType) {
        const symbolMap = {
            'MOVE': 'MOV',
            'ATTACK': 'ATTACK',
            'CAST_SPELL': 'CAST',
            'USE_ARTIFACT': 'USE',
            'CREATE_UNIT': 'CREATE',
            'TEMPORAL_JUMP': 'TEMPORAL',
            'QUANTUM_SPLIT': 'QUANTUM'
        };
        
        return symbolMap[actionType] || 'CAST';
    }
    
    showConflictNotification(conflict) {
        // Notification visuelle simple
        console.log(`🔄 CONFLIT: ${conflict.description}`);
        
        // Créer notification DOM si possible
        if (document.body) {
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: rgba(255, 0, 0, 0.8);
                color: white;
                padding: 10px;
                border-radius: 5px;
                z-index: 10000;
                font-family: monospace;
            `;
            notification.textContent = `⚠️ Conflit: ${conflict.description}`;
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 5000);
        }
    }
    
    showPlayerNotification(message, type) {
        console.log(`👤 ${message}`);
        
        // Notification DOM
        if (document.body) {
            const notification = document.createElement('div');
            const color = type === 'join' ? 'green' : 'orange';
            
            notification.style.cssText = `
                position: fixed;
                top: 60px;
                right: 20px;
                background: rgba(0, 0, 0, 0.8);
                color: ${color};
                padding: 8px;
                border-radius: 5px;
                z-index: 10000;
                font-family: monospace;
                font-size: 12px;
            `;
            notification.textContent = message;
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 3000);
        }
    }
    
    // 📊 STATISTIQUES ET MONITORING
    getConnectionStats() {
        return {
            state: this.connectionState,
            playerId: this.playerId,
            gameId: this.gameId,
            reconnectAttempts: this.reconnectAttempts,
            messageQueueSize: this.messageQueue.length,
            quantumStatesCount: this.quantumStates.size,
            playersCount: this.playerStates.size
        };
    }
    
    // 🧹 NETTOYAGE
    disconnect() {
        if (this.socket) {
            this.socket.close();
            this.socket = null;
        }
        
        this.connectionState = 'DISCONNECTED';
        this.messageQueue = [];
        this.quantumStates.clear();
        this.playerStates.clear();
        
        console.log('🔌 WebSocket déconnecté et nettoyé');
    }
    
    // 🎯 LISTENERS EXTERNES
    notifyExternalListeners(message) {
        // Notifier window.gameStore si disponible
        if (window.gameStore && window.gameStore.handleWebSocketMessage) {
            window.gameStore.handleWebSocketMessage(message);
        }
        
        // Event custom pour autres listeners
        window.dispatchEvent(new CustomEvent('zfc-websocket-message', {
            detail: message
        }));
    }
}

// 🌍 EXPORT GLOBAL
window.WebSocketHandlerZFC = WebSocketHandlerZFC;

// 🎯 AUTO-INITIALISATION
document.addEventListener('DOMContentLoaded', () => {
    if (typeof window !== 'undefined') {
        window.wsHandler = new WebSocketHandlerZFC();
        
        console.log('📡 WebSocketHandlerZFC prêt !');
        console.log('💡 Usage: window.wsHandler.connect(gameId, playerId)');
        
        // Test de connexion automatique si paramètres disponibles
        const urlParams = new URLSearchParams(window.location.search);
        const gameId = urlParams.get('gameId');
        const playerId = urlParams.get('playerId');
        
        if (gameId && playerId) {
            console.log(`🚀 Auto-connexion: game=${gameId}, player=${playerId}`);
            setTimeout(() => {
                window.wsHandler.connect(gameId, playerId);
            }, 1000);
        }
    }
}); 