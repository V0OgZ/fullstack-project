import React, { useState, useEffect, useCallback } from 'react';
import { ApiService } from '../services/api';
import { generateSessionNameId, useSessionNameTranslator } from '../services/sessionNameGenerator';

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
  const [heroName, setHeroName] = useState('');
  const [waitingForPlayers, setWaitingForPlayers] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  
  // Use the session name translator
  const { translateSessionName } = useSessionNameTranslator();

  // Generate a new session name using game resources
  const generateNewSessionName = () => {
    try {
      const nameId = generateSessionNameId();
      const translatedName = translateSessionName(nameId);
      setSessionName(translatedName || `Epic Battle ${Math.floor(Math.random() * 1000)}`);
    } catch (error) {
      console.warn('Failed to generate session name, using fallback:', error);
      setSessionName(`Epic Battle ${Math.floor(Math.random() * 1000)}`);
    }
  };

  // Generate a unique player ID when component mounts
  useEffect(() => {
    const generatePlayerId = () => {
      const timestamp = Date.now();
      const random = Math.random().toString(36).substring(2, 15);
      return `player_${timestamp}_${random}`;
    };
    
    setPlayerId(generatePlayerId());
    setHeroName(`Hero_${Math.floor(Math.random() * 1000)}`);
    
    // Generate initial session name automatically (only once on mount)
    try {
      const nameId = generateSessionNameId();
      const translatedName = translateSessionName(nameId);
      setSessionName(translatedName || `Epic Battle ${Math.floor(Math.random() * 1000)}`);
    } catch (error) {
      console.warn('Failed to generate session name, using fallback:', error);
      setSessionName(`Epic Battle ${Math.floor(Math.random() * 1000)}`);
    }
  }, []); // Empty dependency array to run only once on mount

  // Connection mode settings
  const [connectionMode, setConnectionMode] = useState<'polling' | 'websocket'>('polling');
  const isWebSocketAvailable = false; // WebSocket is disabled for stability

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

  // WebSocket disabled - using polling mode only for better reliability
  useEffect(() => {
    console.log('🔄 Multiplayer mode: Polling every 5 seconds (WebSocket disabled)');
    // No WebSocket initialization - polling mode only
  }, []);

  useEffect(() => {
    loadSessions();
    // Auto-refresh sessions every 5 seconds
    const interval = setInterval(loadSessions, 5000);
    return () => clearInterval(interval);
  }, [loadSessions]);

  const createSession = async () => {
    if (!sessionName || !sessionName.trim()) {
      onError('Please enter a session name');
      return;
    }

    try {
      setLoading(true);
      
      // Simple name storage without complex logic
      let nameToStore = sessionName.trim();
      
      // Basic validation - if session name is empty after trim, generate a new one
      if (!nameToStore) {
        const nameId = generateSessionNameId();
        nameToStore = translateSessionName(nameId);
      }
      
      const response = await ApiService.createMultiplayerSession({
        sessionName: nameToStore,
        maxPlayers,
        gameMode,
        creatorId: playerId
      });
      
      console.log('✅ Session created successfully:', response);
      
      // Log connection mode for debugging
      console.log(`🔄 Using ${connectionMode} mode (WebSocket ${isWebSocketAvailable ? 'available' : 'disabled'})`);
      
      setCurrentSessionId(response.sessionId);
      setWaitingForPlayers(true);
      setCreateSessionMode(false);
      setSessionName('');
      
      // Refresh sessions list immediately and more frequently when waiting
      await loadSessions();
      
      // Auto-refresh every 2 seconds while waiting for players
      const waitingInterval = setInterval(async () => {
        if (waitingForPlayers) {
          await loadSessions();
        } else {
          clearInterval(waitingInterval);
        }
      }, 2000);
      
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

    if (!sessionId || sessionId.trim() === '' || sessionId === 'undefined') {
      onError('Invalid session ID. Please select a valid session.');
      return;
    }

    try {
      setLoading(true);
      console.log(`🎮 Joining session ${sessionId} with player ${playerId} using ${connectionMode} mode`);
      
      const response = await ApiService.joinMultiplayerSession(sessionId, playerId);
      console.log('✅ Successfully joined session:', response);
      
      // Wait a moment for the session to update, then refresh
      setTimeout(async () => {
        await loadSessions();
      }, 1000);
      
      onSessionJoined(sessionId);
      
    } catch (error) {
      console.error('❌ Failed to join session:', error);
      onError(`Failed to join session: ${error instanceof Error ? error.message : 'Unknown error'}`);
      
      // Refresh sessions list in case of error
      await loadSessions();
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
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type="text"
              value={sessionName}
              onChange={e => setSessionName(e.target.value)}
              placeholder="Enter session name..."
              data-testid="session-name-input"
              style={{
                flex: 1,
                padding: '8px',
                background: '#1a1a1a',
                border: '1px solid #404040',
                borderRadius: '4px',
                color: '#fff'
              }}
            />
            <button
              type="button"
              onClick={generateNewSessionName}
              title="Generate epic session name"
              style={{
                padding: '8px 12px',
                background: '#FF6B35',
                border: 'none',
                borderRadius: '4px',
                color: '#fff',
                cursor: 'pointer',
                fontSize: '14px',
                whiteSpace: 'nowrap'
              }}
            >
              🎲 Epic Name
            </button>
          </div>
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
            <option value="multiplayer-arena">Multiplayer Arena</option>
            <option value="conquest-classic">Classic Conquest</option>
            <option value="temporal-rift">Temporal Rift</option>
          </select>
        </div>

        {/* Connection Mode Select */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', color: '#fff', marginBottom: '5px' }}>
            Connection Mode:
          </label>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="button"
              onClick={() => setConnectionMode('polling')}
              style={{
                flex: 1,
                padding: '8px 12px',
                background: connectionMode === 'polling' ? '#4CAF50' : '#2a2a2a',
                color: connectionMode === 'polling' ? '#fff' : '#ccc',
                border: `1px solid ${connectionMode === 'polling' ? '#4CAF50' : '#404040'}`,
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              📡 Polling (Stable)
            </button>
            <button
              type="button"
              onClick={() => setConnectionMode('websocket')}
              disabled={!isWebSocketAvailable}
              style={{
                flex: 1,
                padding: '8px 12px',
                background: connectionMode === 'websocket' ? '#4CAF50' : '#2a2a2a',
                color: isWebSocketAvailable ? 
                  (connectionMode === 'websocket' ? '#fff' : '#ccc') : '#666',
                border: `1px solid ${connectionMode === 'websocket' ? '#4CAF50' : '#404040'}`,
                borderRadius: '4px',
                cursor: isWebSocketAvailable ? 'pointer' : 'not-allowed',
                opacity: isWebSocketAvailable ? 1 : 0.5
              }}
            >
              ⚡ WebSocket 🚧
            </button>
          </div>
          <div style={{ 
            fontSize: '11px', 
            color: '#888', 
            marginTop: '5px',
            fontStyle: 'italic'
          }}>
            {connectionMode === 'polling' ? 
              'Polling: Stable connection, updates every 5 seconds' : 
              'WebSocket: Real-time but currently disabled for stability'}
          </div>
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
      {/* WebSocket removed - using reliable 5-second polling */}
      
      {/* Clean Header Section */}
      <div style={{ 
        marginBottom: '30px', 
        padding: '15px', 
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
        borderRadius: '8px',
        borderLeft: '4px solid #00d4ff'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ color: '#00d4ff', fontSize: '16px', fontWeight: 'bold' }}>🔄 Polling Mode Active</div>
            <div style={{ color: '#888', fontSize: '12px' }}>Auto-refresh every 5 seconds</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ color: '#fff', fontSize: '14px' }}>Player ID</div>
            <div style={{ color: '#00d4ff', fontSize: '16px', fontWeight: 'bold' }}>{playerId}</div>
          </div>
        </div>
      </div>

      {/* Sessions Header with Actions */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '20px',
        padding: '15px',
        background: '#1a1a1a',
        borderRadius: '8px'
      }}>
        <div>
          <div style={{ color: '#fff', fontSize: '18px', fontWeight: 'bold' }}>
            🌐 Available Sessions
          </div>
          <div style={{ color: '#888', fontSize: '14px' }}>
            {sessions.length} {sessions.length === 1 ? 'session' : 'sessions'} found
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={loadSessions}
            disabled={loading}
            style={{
              padding: '12px 20px',
              background: loading ? '#666' : '#4ade80',
              color: loading ? '#aaa' : '#000',
              border: 'none',
              borderRadius: '6px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontWeight: 'bold',
              transition: 'all 0.2s ease'
            }}
          >
            🔄 {loading ? 'Loading...' : 'Refresh'}
          </button>
          <button
            onClick={() => setCreateSessionMode(true)}
            disabled={loading}
            data-testid="create-session-btn"
            style={{
              padding: '12px 20px',
              background: loading ? '#666' : '#00d4ff',
              color: loading ? '#aaa' : '#000',
              border: 'none',
              borderRadius: '6px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontWeight: 'bold',
              transition: 'all 0.2s ease'
            }}
          >
            ✨ Create New Session
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
                  🎮 {session.sessionName && session.sessionName.includes('_') ? translateSessionName(session.sessionName) : (session.sessionName || 'Unnamed Session')}
                </h3>
                {session.sessionName && session.sessionName.includes('_') && (
                  <div style={{ color: '#FF6B35', fontSize: '10px', marginBottom: '3px' }}>
                    ⚡ Epic Generated Name
                  </div>
                )}
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