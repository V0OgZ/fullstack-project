import { Client, StompSubscription } from '@stomp/stompjs';

interface GameActionMessage {
  type: 'GAME_ACTION';
  playerId: string;
  actionType: string;
  actionData: any;
  result: any;
}

interface PlayerMessage {
  type: 'PLAYER_JOINED' | 'PLAYER_LEFT';
  playerId: string;
  session: any;
}

interface ChatMessage {
  type: 'CHAT_MESSAGE';
  playerId: string;
  message: string;
  timestamp: number;
}

interface SyncMessage {
  type: 'SYNC_RESPONSE';
  sessionId: string;
  gameState: any;
}

type MultiplayerMessage = GameActionMessage | PlayerMessage | ChatMessage | SyncMessage;

export class WebSocketService {
  private client: Client | null = null;
  private subscriptions: Map<string, StompSubscription> = new Map();
  private messageHandlers: Map<string, (message: MultiplayerMessage) => void> = new Map();
  private currentSessionId: string | null = null;
  private currentPlayerId: string | null = null;

  constructor() {
    this.initializeClient();
  }

  private initializeClient() {
    this.client = new Client({
      brokerURL: 'ws://localhost:8080/ws',
      connectHeaders: {},
      debug: (str) => {
        console.log('[WebSocket]', str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    this.client.onConnect = (frame) => {
      console.log('Connected to WebSocket server:', frame);
    };

    this.client.onDisconnect = (frame) => {
      console.log('Disconnected from WebSocket server:', frame);
    };

    this.client.onStompError = (frame) => {
      console.error('WebSocket error:', frame);
    };
  }

  async connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.client) {
        reject(new Error('WebSocket client not initialized'));
        return;
      }

      // Set up timeout for connection
      const connectionTimeout = setTimeout(() => {
        console.error('WebSocket connection timeout after 10 seconds');
        reject(new Error('WebSocket connection timeout'));
      }, 10000);

      this.client.onConnect = () => {
        console.log('WebSocket connected successfully');
        clearTimeout(connectionTimeout);
        resolve();
      };

      this.client.onStompError = (frame) => {
        console.error('WebSocket connection error:', frame);
        clearTimeout(connectionTimeout);
        reject(new Error('Failed to connect to WebSocket server'));
      };

      this.client.onWebSocketError = (error) => {
        console.error('WebSocket error:', error);
        clearTimeout(connectionTimeout);
        reject(new Error('WebSocket connection failed'));
      };

      this.client.onWebSocketClose = (event) => {
        console.log('WebSocket closed:', event);
        clearTimeout(connectionTimeout);
        if (event.code !== 1000) {
          reject(new Error('WebSocket connection closed unexpectedly'));
        }
      };

      try {
        this.client.activate();
      } catch (error) {
        console.error('Error activating WebSocket client:', error);
        clearTimeout(connectionTimeout);
        reject(error);
      }
    });
  }

  disconnect() {
    if (this.client && this.client.connected) {
      this.subscriptions.forEach((subscription) => {
        subscription.unsubscribe();
      });
      this.subscriptions.clear();
      
      this.client.deactivate();
      console.log('WebSocket disconnected');
    }
  }

  joinSession(sessionId: string, playerId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.client || !this.client.connected) {
        reject(new Error('WebSocket not connected'));
        return;
      }

      this.currentSessionId = sessionId;
      this.currentPlayerId = playerId;

      const sessionSubscription = this.client.subscribe(
        `/topic/session/${sessionId}`,
        (message) => {
          try {
            const data = JSON.parse(message.body);
            this.handleMessage(data);
          } catch (error) {
            console.error('Error parsing session message:', error);
          }
        }
      );

      this.subscriptions.set(`session-${sessionId}`, sessionSubscription);

      this.client.publish({
        destination: '/app/game.join',
        body: JSON.stringify({
          sessionId,
          playerId
        })
      });

      console.log(`Joined WebSocket session: ${sessionId}`);
      resolve();
    });
  }

  leaveSession(sessionId: string, playerId: string) {
    if (!this.client || !this.client.connected) {
      console.warn('WebSocket not connected');
      return;
    }

    // Send leave message
    this.client.publish({
      destination: '/app/game.leave',
      body: JSON.stringify({
        sessionId,
        playerId
      })
    });

    // Unsubscribe from session-specific subscriptions
    this.subscriptions.forEach((subscription, key) => {
      if (key.includes(sessionId) || key.includes(playerId)) {
        subscription.unsubscribe();
        this.subscriptions.delete(key);
      }
    });

    this.currentSessionId = null;
    this.currentPlayerId = null;
    console.log(`🚪 Left WebSocket session: ${sessionId}`);
  }

  sendGameAction(actionType: string, actionData: any) {
    if (!this.client || !this.client.connected || !this.currentSessionId || !this.currentPlayerId) {
      console.warn('WebSocket not ready for game actions');
      return;
    }

    this.client.publish({
      destination: '/app/game.action',
      body: JSON.stringify({
        sessionId: this.currentSessionId,
        playerId: this.currentPlayerId,
        actionType,
        actionData
      })
    });

    console.log(`⚡ Sent game action: ${actionType}`, actionData);
  }

  sendChatMessage(message: string) {
    if (!this.client || !this.client.connected || !this.currentSessionId || !this.currentPlayerId) {
      console.warn('WebSocket not ready for chat');
      return;
    }

    this.client.publish({
      destination: '/app/game.chat',
      body: JSON.stringify({
        sessionId: this.currentSessionId,
        playerId: this.currentPlayerId,
        message
      })
    });

    console.log(`💬 Sent chat message: ${message}`);
  }

  requestSync() {
    if (!this.client || !this.client.connected || !this.currentSessionId || !this.currentPlayerId) {
      console.warn('WebSocket not ready for sync');
      return;
    }

    this.client.publish({
      destination: '/app/game.sync',
      body: JSON.stringify({
        sessionId: this.currentSessionId,
        playerId: this.currentPlayerId
      })
    });

    console.log('🔄 Requested game state sync');
  }

  private handleMessage(message: MultiplayerMessage) {
    const handler = this.messageHandlers.get(message.type);
    if (handler) {
      handler(message);
    } else {
      console.log('📨 Unhandled message type:', message.type, message);
    }
  }

  // Message handler registration
  onMessage(messageType: string, handler: (message: MultiplayerMessage) => void) {
    this.messageHandlers.set(messageType, handler);
  }

  // Remove message handler
  offMessage(messageType: string) {
    this.messageHandlers.delete(messageType);
  }

  // Utility methods
  isConnected(): boolean {
    return this.client?.connected || false;
  }

  getCurrentSessionId(): string | null {
    return this.currentSessionId;
  }

  getCurrentPlayerId(): string | null {
    return this.currentPlayerId;
  }
}

// Singleton instance
export const websocketService = new WebSocketService(); 