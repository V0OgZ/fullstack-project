import { Client, over, StompSubscription } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

interface WebSocketMessage {
  type: string;
  payload: any;
}

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
    const socket = new SockJS('http://localhost:8080/ws');
    this.client = over(socket);
    
    // Disable debug logs in production
    this.client.debug = (str) => {
      console.log('[WebSocket]', str);
    };

    this.client.onConnect = (frame) => {
      console.log('🌐 Connected to WebSocket server:', frame);
    };

    this.client.onDisconnect = (frame) => {
      console.log('🌐 Disconnected from WebSocket server:', frame);
    };

    this.client.onStompError = (frame) => {
      console.error('🚨 WebSocket error:', frame);
    };
  }

  async connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.client) {
        reject(new Error('WebSocket client not initialized'));
        return;
      }

      this.client.onConnect = (frame) => {
        console.log('✅ WebSocket connected successfully');
        resolve();
      };

      this.client.onStompError = (frame) => {
        console.error('❌ WebSocket connection error:', frame);
        reject(new Error('Failed to connect to WebSocket server'));
      };

      this.client.activate();
    });
  }

  disconnect() {
    if (this.client && this.client.connected) {
      // Unsubscribe from all subscriptions
      this.subscriptions.forEach((subscription) => {
        subscription.unsubscribe();
      });
      this.subscriptions.clear();
      
      this.client.deactivate();
      console.log('🌐 WebSocket disconnected');
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

      // Subscribe to session-specific messages
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

      // Subscribe to player-specific messages
      const playerSubscription = this.client.subscribe(
        `/user/${playerId}/queue/reply`,
        (message) => {
          try {
            const data = JSON.parse(message.body);
            this.handleMessage(data);
          } catch (error) {
            console.error('Error parsing player message:', error);
          }
        }
      );

      // Subscribe to sync messages
      const syncSubscription = this.client.subscribe(
        `/user/${playerId}/queue/sync`,
        (message) => {
          try {
            const data = JSON.parse(message.body);
            this.handleMessage(data);
          } catch (error) {
            console.error('Error parsing sync message:', error);
          }
        }
      );

      // Subscribe to error messages
      const errorSubscription = this.client.subscribe(
        `/user/${playerId}/queue/error`,
        (message) => {
          try {
            const data = JSON.parse(message.body);
            console.error('Server error:', data);
          } catch (error) {
            console.error('Error parsing error message:', error);
          }
        }
      );

      this.subscriptions.set(`session-${sessionId}`, sessionSubscription);
      this.subscriptions.set(`player-${playerId}`, playerSubscription);
      this.subscriptions.set(`sync-${playerId}`, syncSubscription);
      this.subscriptions.set(`error-${playerId}`, errorSubscription);

      // Send join message
      this.client.publish({
        destination: '/app/game.join',
        body: JSON.stringify({
          sessionId,
          playerId
        })
      });

      console.log(`🎮 Joined WebSocket session: ${sessionId}`);
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