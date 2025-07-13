import React, { useState, useEffect, useCallback } from 'react';
import { ApiService } from '../services/api';
import { websocketService } from '../services/websocketService';

interface MultiplayerSession {
  sessionId: string;
  sessionName: string;
  maxPlayers: number;
  currentPlayers: number;
  gameMode: string;
  status: string;
  createdBy: string;
  playerIds: string[];
}

interface MultiplayerSessionManagerProps {
  onSessionJoined: (sessionId: string) => void;
  onError: (error: string) => void;
}

const MultiplayerSessionManager: React.FC<MultiplayerSessionManagerProps> = ({ 
  onSessionJoined, 
  onError 
}) => {
  const [sessions, setSessions] = useState<MultiplayerSession[]>([]);
  const [loading, setLoading] = useState(false);
  const [createSessionMode, setCreateSessionMode] = useState(false);
  const [sessionName, setSessionName] = useState('');
  const [maxPlayers, setMaxPlayers] = useState(4);
  const [gameMode, setGameMode] = useState('conquest-classique');
  const [playerId, setPlayerId] = useState('');
  const [websocketConnected, setWebsocketConnected] = useState(false);
  const [heroName, setHeroName] = useState('');
  const [sessionCreated, setSessionCreated] = useState(false);
  const [createdSessionId, setCreatedSessionId] = useState<string | null>(null);

  const loadSessions = useCallback(async () => {
    try {
      setLoading(true);
      const response = await ApiService.getJoinableSessions();
      setSessions(response.data || []);
    } catch (error) {
      console.error('Failed to load sessions:', error);
      onError('Failed to load multiplayer sessions');
    } finally {
      setLoading(false);
    }
  }, [onError]);

  // Initialize WebSocket connection
  useEffect(() => {
    const initWebSocket = async () => {
      try {
        console.log('🌐 Initializing WebSocket connection...');
        await websocketService.connect();
        setWebsocketConnected(true);
        
        // Set up message handlers
        websocketService.onMessage('PLAYER_JOINED', (message) => {
          console.log('👥 Player joined:', message);
          loadSessions(); // Refresh session list
        });

        websocketService.onMessage('PLAYER_LEFT', (message) => {
          console.log('🚪 Player left:', message);
          loadSessions(); // Refresh session list
        });

        websocketService.onMessage('GAME_ACTION', (message) => {
          console.log('⚡ Game action received:', message);
          // Handle game actions in real-time
        });

        websocketService.onMessage('CHAT_MESSAGE', (message) => {
          console.log('💬 Chat message:', message);
          // Handle chat messages
        });

      } catch (error) {
        console.error('❌ Failed to connect WebSocket:', error);
        setWebsocketConnected(false);
        onError('Failed to connect to real-time server');
      }
    };

    initWebSocket();

    // Cleanup on unmount
    return () => {
      websocketService.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onError]);

  useEffect(() => {
    loadSessions();
    // Generate random player ID for testing
    setPlayerId(`player_${Math.random().toString(36).substr(2, 9)}`);
  }, [loadSessions]);

  const createSession = async () => {
    if (!sessionName.trim()) {
      onError('Please enter a session name');
      return;
    }

    if (!websocketConnected) {
      onError('WebSocket not connected. Please refresh the page.');
      return;
    }

    try {
      setLoading(true);
      const response = await ApiService.createMultiplayerSession({
        sessionName: sessionName.trim(),
        maxPlayers,
        gameMode,
        creatorId: playerId
      });
      
      console.log('✅ Session created:', response.data);
      
      // Join the WebSocket session
      await websocketService.joinSession(response.data.sessionId, playerId);
      
      onSessionJoined(response.data.sessionId);
      setCreateSessionMode(false);
      setSessionName('');
    } catch (error) {
      console.error('❌ Failed to create session:', error);
      onError('Failed to create multiplayer session');
    } finally {
      setLoading(false);
    }
  };

  const joinSession = async (sessionId: string) => {
    if (!websocketConnected) {
      onError('WebSocket not connected. Please refresh the page.');
      return;
    }

    try {
      setLoading(true);
      const response = await ApiService.joinMultiplayerSession(sessionId, playerId);
      console.log('✅ Joined session:', response.data);
      
      // Join the WebSocket session
      await websocketService.joinSession(sessionId, playerId);
      
      onSessionJoined(sessionId);
    } catch (error) {
      console.error('❌ Failed to join session:', error);
      onError(`Failed to join session: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  if (createSessionMode) {
    return (
      <div style={{ 
        padding: '20px', 
        background: '#2a2a2a', 
        borderRadius: '8px',
        maxWidth: '500px',
        margin: '20px auto'
      }} data-testid="multiplayer-lobby">
        <h2 style={{ color: '#00d4ff', marginBottom: '20px' }}>🌐 Create New Session</h2>
        {/* Hero Name Input */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', color: '#fff', marginBottom: '5px' }}>
            Hero Name:
          </label>
          <input
            type="text"
            value={heroName}
            onChange={e => setHeroName(e.target.value)}
            placeholder="Enter your hero name..."
            data-testid="hero-name-input"
            style={{
              width: '100%',
              padding: '8px',
              background: '#1a1a1a',
              border: '1px solid #404040',
              borderRadius: '4px',
              color: '#fff'
            }}
          />
        </div>
        {/* Player Count Select */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', color: '#fff', marginBottom: '5px' }}>
            Number of Players:
          </label>
          <select
            value={maxPlayers}
            onChange={e => setMaxPlayers(Number(e.target.value))}
            data-testid="player-count-select"
            style={{
              width: '100%',
              padding: '8px',
              background: '#1a1a1a',
              border: '1px solid #404040',
              borderRadius: '4px',
              color: '#fff'
            }}
          >
            <option value={2}>2 Players - Duel</option>
            <option value={3}>3 Players - Triangle</option>
            <option value={4}>4 Players - Free-for-All</option>
          </select>
        </div>
        {/* Game Mode Select (keep existing) */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', color: '#fff', marginBottom: '5px' }}>
            Game Mode:
          </label>
          <select
            value={gameMode}
            onChange={e => setGameMode(e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              background: '#1a1a1a',
              border: '1px solid #404040',
              borderRadius: '4px',
              color: '#fff'
            }}
          >
            <option value="conquest-classique">🏰 Classic Conquest</option>
            <option value="mystique-temporel">🔮 Mystical Conquest</option>
            <option value="arena-rapide">⚡ Quick Arena</option>
          </select>
        </div>
        {/* Create New Game Button */}
        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <button
            onClick={async () => {
              await createSession();
              setSessionCreated(true);
              setCreatedSessionId(playerId);
            }}
            disabled={loading || !websocketConnected || !heroName}
            data-testid="create-new-game-btn"
            style={{
              flex: 1,
              padding: '10px',
              background: (!websocketConnected || loading || !heroName) ? '#666' : '#00d4ff',
              color: (!websocketConnected || loading || !heroName) ? '#aaa' : '#000',
              border: 'none',
              borderRadius: '4px',
              cursor: (!websocketConnected || loading || !heroName) ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Creating...' : '🎮 Create New Game'}
          </button>
          <button
            onClick={() => setCreateSessionMode(false)}
            style={{
              flex: 1,
              padding: '10px',
              background: '#666',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
        </div>
        {/* Session Created Message and Start Battle Button */}
        {sessionCreated && (
          <div style={{ marginTop: '30px', textAlign: 'center' }}>
            <div data-testid="session-created-msg">
              <strong>🎯 Session Created!</strong>
              <div>Session ID: <strong>{createdSessionId}</strong></div>
            </div>
            <button
              data-testid="start-battle-btn"
              style={{
                marginTop: '20px',
                padding: '12px 32px',
                background: '#8b5cf6',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                fontWeight: 700,
                fontSize: '1.1rem',
                cursor: 'pointer',
                boxShadow: '0 2px 8px #8b5cf644',
                transition: 'background 0.2s'
              }}
              onClick={() => setCreateSessionMode(false)}
            >
              🚀 Start Battle
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{ 
      padding: '20px', 
      background: '#2a2a2a', 
      borderRadius: '8px',
      maxWidth: '800px',
      margin: '20px auto'
    }}>
      <h2 style={{ color: '#00d4ff', marginBottom: '20px' }}>🌐 Multiplayer Sessions</h2>
      
      {/* WebSocket Status */}
      <div style={{ 
        marginBottom: '20px', 
        padding: '10px', 
        background: websocketConnected ? '#1a4d1a' : '#4d1a1a',
        borderRadius: '4px',
        color: websocketConnected ? '#4ade80' : '#f87171'
      }}>
        {websocketConnected ? '✅ Real-time connection active' : '❌ Real-time connection failed'}
      </div>
      
      {/* Player Info */}
      <div style={{ 
        marginBottom: '20px', 
        padding: '10px', 
        background: '#1a1a1a',
        borderRadius: '4px',
        color: '#888'
      }}>
        👤 Your Player ID: <strong style={{ color: '#00d4ff' }}>{playerId}</strong>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ color: '#fff' }}>
          Available Sessions ({sessions.length})
        </div>
        <button
          onClick={() => setCreateSessionMode(true)}
          disabled={loading || !websocketConnected}
          style={{
            padding: '8px 16px',
            background: (!websocketConnected || loading) ? '#666' : '#00d4ff',
            color: (!websocketConnected || loading) ? '#aaa' : '#000',
            border: 'none',
            borderRadius: '4px',
            cursor: (!websocketConnected || loading) ? 'not-allowed' : 'pointer'
          }}
        >
          🎮 Create New Session
        </button>
      </div>

      {loading && (
        <div style={{ 
          textAlign: 'center', 
          color: '#888',
          padding: '20px'
        }}>
          Loading sessions...
        </div>
      )}

      {sessions.length === 0 && !loading ? (
        <div style={{ 
          color: '#888', 
          textAlign: 'center', 
          padding: '40px',
          background: '#1a1a1a',
          borderRadius: '4px'
        }}>
          No multiplayer sessions available. Create one to start playing!
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {sessions.map((session) => (
            <div
              key={session.sessionId}
              style={{
                padding: '15px',
                background: '#1a1a1a',
                border: '1px solid #404040',
                borderRadius: '4px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div>
                <h3 style={{ color: '#fff', margin: '0 0 5px 0' }}>
                  🎮 {session.sessionName}
                </h3>
                <div style={{ color: '#888', fontSize: '12px' }}>
                  👥 Players: {session.currentPlayers}/{session.maxPlayers} | 
                  🎯 Mode: {session.gameMode} | 
                  📊 Status: {session.status}
                </div>
              </div>
              <button
                onClick={() => joinSession(session.sessionId)}
                disabled={loading || !websocketConnected || session.currentPlayers >= session.maxPlayers}
                style={{
                  padding: '8px 16px',
                  background: (loading || !websocketConnected || session.currentPlayers >= session.maxPlayers) ? '#666' : '#00d4ff',
                  color: (loading || !websocketConnected || session.currentPlayers >= session.maxPlayers) ? '#aaa' : '#000',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: (loading || !websocketConnected || session.currentPlayers >= session.maxPlayers) ? 'not-allowed' : 'pointer'
                }}
              >
                {session.currentPlayers >= session.maxPlayers ? '🚫 Full' : '🎮 Join'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiplayerSessionManager; 