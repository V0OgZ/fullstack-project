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
  const [gameMode, setGameMode] = useState('multiplayer-arena');
  const [playerId, setPlayerId] = useState('');
  const [websocketConnected, setWebsocketConnected] = useState(false);
  const [heroName, setHeroName] = useState('');
  const [waitingForPlayers, setWaitingForPlayers] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);

  // Generate a unique player ID when component mounts
  useEffect(() => {
    const generatePlayerId = () => {
      const timestamp = Date.now();
      const random = Math.random().toString(36).substring(2, 15);
      return `player_${timestamp}_${random}`;
    };
    
    setPlayerId(generatePlayerId());
    setHeroName(`Hero_${Math.floor(Math.random() * 1000)}`);
  }, []);

  const loadSessions = useCallback(async () => {
    try {
      setLoading(true);
      const response = await ApiService.getJoinableSessions();
      // Ensure sessions is always an array
      setSessions(Array.isArray(response) ? response : []);
    } catch (error) {
      console.error('Failed to load sessions:', error);
      setSessions([]); // Set empty array on error
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
        setWebsocketConnected(websocketService.isConnected());
        
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
        console.warn('⚠️  WebSocket connection failed, but continuing with limited functionality');
        // Don't show error to user, just continue with limited functionality
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
    // Auto-refresh sessions every 5 seconds
    const interval = setInterval(loadSessions, 5000);
    return () => clearInterval(interval);
  }, [loadSessions]);

  const createSession = async () => {
    if (!sessionName.trim()) {
      onError('Please enter a session name');
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
      
      console.log('✅ Session created:', response);
      
      // Join the WebSocket session if connected
      if (websocketConnected) {
        try {
          await websocketService.joinSession(response.sessionId, playerId);
        } catch (error) {
          console.warn('⚠️  Failed to join WebSocket session, continuing anyway:', error);
        }
      } else {
        console.warn('⚠️  WebSocket not connected, creating session in basic mode');
      }
      
      // Set waiting state and session ID
      setCurrentSessionId(response.sessionId);
      setWaitingForPlayers(true);
      setCreateSessionMode(false);
      setSessionName('');
      
      // Refresh sessions list so others can see it
      await loadSessions();
      
    } catch (error) {
      console.error('❌ Failed to create session:', error);
      onError(`Failed to create session: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const joinSession = async (sessionId: string) => {
    if (!playerId || playerId.trim() === '') {
      onError('Player ID not set. Please refresh the page.');
      return;
    }

    if (!sessionId || sessionId.trim() === '') {
      onError('Invalid session ID.');
      return;
    }

    try {
      setLoading(true);
      console.log(`🎮 Attempting to join session ${sessionId} with player ID ${playerId}`);
      const response = await ApiService.joinMultiplayerSession(sessionId, playerId);
      console.log('✅ Joined session:', response);
      
      // Join the WebSocket session if connected
      if (websocketConnected) {
        try {
          await websocketService.joinSession(sessionId, playerId);
        } catch (error) {
          console.warn('⚠️  Failed to join WebSocket session, continuing anyway:', error);
        }
      } else {
        console.warn('⚠️  WebSocket not connected, joining session in basic mode');
      }
      
      onSessionJoined(sessionId);
    } catch (error) {
      console.error('❌ Failed to join session:', error);
      onError(`Failed to join session: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const startGame = async () => {
    if (!currentSessionId) {
      onError('No session selected');
      return;
    }

    try {
      setLoading(true);
      // Start the game by joining the session
      onSessionJoined(currentSessionId);
    } catch (error) {
      console.error('❌ Failed to start game:', error);
      onError(`Failed to start game: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const cancelWaiting = () => {
    setWaitingForPlayers(false);
    setCurrentSessionId(null);
    loadSessions();
  };

  // Waiting for players screen
  if (waitingForPlayers && currentSessionId) {
    const currentSession = sessions.find(s => s.sessionId === currentSessionId);
    
    return (
      <div style={{ 
        padding: '20px', 
        background: '#2a2a2a', 
        borderRadius: '8px',
        maxWidth: '500px',
        margin: '20px auto',
        textAlign: 'center'
      }} data-testid="waiting-room">
        <h2 style={{ color: '#00d4ff', marginBottom: '20px' }}>🎮 Waiting Room</h2>
        
        <div style={{ 
          padding: '20px', 
          background: '#1a1a1a',
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          <h3 style={{ color: '#fff', marginBottom: '10px' }}>
            {currentSession?.sessionName || 'Your Session'}
          </h3>
          <div style={{ color: '#888', marginBottom: '15px' }}>
            Session ID: <strong style={{ color: '#00d4ff' }}>{currentSessionId}</strong>
          </div>
          <div style={{ color: '#888', marginBottom: '15px' }}>
            Players: <strong style={{ color: '#00d4ff' }}>
              {currentSession?.currentPlayers || 1}/{currentSession?.maxPlayers || maxPlayers}
            </strong>
          </div>
          <div style={{ color: '#888' }}>
            Game Mode: <strong style={{ color: '#00d4ff' }}>{currentSession?.gameMode || gameMode}</strong>
          </div>
        </div>

        <div style={{ 
          padding: '15px', 
          background: '#1a4d1a',
          borderRadius: '4px',
          color: '#4ade80',
          marginBottom: '20px'
        }}>
          ✅ Session created! Share the Session ID with other players
        </div>

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button
            onClick={startGame}
            disabled={loading || !currentSession || currentSession.currentPlayers < 2}
            data-testid="start-battle-btn"
            style={{
              padding: '12px 24px',
              background: (loading || !currentSession || currentSession.currentPlayers < 2) ? '#666' : '#8b5cf6',
              color: (loading || !currentSession || currentSession.currentPlayers < 2) ? '#aaa' : '#fff',
              border: 'none',
              borderRadius: '6px',
              fontWeight: 'bold',
              cursor: (loading || !currentSession || currentSession.currentPlayers < 2) ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Starting...' : '🚀 Start Battle'}
          </button>
          
          <button
            onClick={cancelWaiting}
            style={{
              padding: '12px 24px',
              background: '#666',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Back to Lobby
          </button>
        </div>

        {(!currentSession || currentSession.currentPlayers < 2) && (
          <div style={{ 
            marginTop: '20px', 
            color: '#888',
            fontStyle: 'italic'
          }}>
            Waiting for at least 2 players to join...
          </div>
        )}
      </div>
    );
  }

  // Create session screen
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
        
        {/* Session Name Input */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', color: '#fff', marginBottom: '5px' }}>
            Session Name:
          </label>
          <input
            type="text"
            value={sessionName}
            onChange={e => setSessionName(e.target.value)}
            placeholder="Enter session name..."
            data-testid="session-name-input"
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

        {/* Game Mode Select */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', color: '#fff', marginBottom: '5px' }}>
            Game Mode:
          </label>
          <select
            value={gameMode}
            onChange={e => setGameMode(e.target.value)}
            data-testid="game-mode-select"
            style={{
              width: '100%',
              padding: '8px',
              background: '#1a1a1a',
              border: '1px solid #404040',
              borderRadius: '4px',
              color: '#fff'
            }}
          >
            <option value="conquest-classic">🏰 Classic Conquest</option>
            <option value="temporal-rift">🔮 Temporal Rift</option>
            <option value="multiplayer-arena">⚡ Multiplayer Arena</option>
          </select>
        </div>

        {/* Create Button */}
        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <button
            onClick={createSession}
            disabled={loading || !sessionName.trim() || !heroName.trim()}
            data-testid="create-new-game-btn"
            style={{
              flex: 1,
              padding: '10px',
              background: (loading || !sessionName.trim() || !heroName.trim()) ? '#666' : '#00d4ff',
              color: (loading || !sessionName.trim() || !heroName.trim()) ? '#aaa' : '#000',
              border: 'none',
              borderRadius: '4px',
              cursor: (loading || !sessionName.trim() || !heroName.trim()) ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Creating...' : '🎮 Create Session'}
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
      </div>
    );
  }

  // Main sessions list
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
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={loadSessions}
            disabled={loading}
            style={{
              padding: '8px 16px',
              background: loading ? '#666' : '#4ade80',
              color: loading ? '#aaa' : '#000',
              border: 'none',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            🔄 Refresh
          </button>
          <button
            onClick={() => setCreateSessionMode(true)}
            disabled={loading}
            data-testid="create-session-btn"
            style={{
              padding: '8px 16px',
              background: loading ? '#666' : '#00d4ff',
              color: loading ? '#aaa' : '#000',
              border: 'none',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            🎮 Create New Session
          </button>
        </div>
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
              data-testid="session-item"
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
                <div style={{ color: '#666', fontSize: '10px', marginTop: '2px' }}>
                  ID: {session.sessionId}
                </div>
              </div>
              <button
                onClick={() => joinSession(session.sessionId)}
                disabled={loading || session.currentPlayers >= session.maxPlayers}
                data-testid="join-session-btn"
                style={{
                  padding: '8px 16px',
                  background: (loading || session.currentPlayers >= session.maxPlayers) ? '#666' : '#00d4ff',
                  color: (loading || session.currentPlayers >= session.maxPlayers) ? '#aaa' : '#000',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: (loading || session.currentPlayers >= session.maxPlayers) ? 'not-allowed' : 'pointer'
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