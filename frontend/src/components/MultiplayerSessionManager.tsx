import React, { useState, useEffect } from 'react';
import { ApiService } from '../services/api';

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

  useEffect(() => {
    loadSessions();
    // Generate random player ID for testing
    setPlayerId(`player_${Math.random().toString(36).substr(2, 9)}`);
  }, []);

  const loadSessions = async () => {
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
  };

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
      
      console.log('Session created:', response.data);
      onSessionJoined(response.data.sessionId);
      setCreateSessionMode(false);
      setSessionName('');
    } catch (error) {
      console.error('Failed to create session:', error);
      onError('Failed to create multiplayer session');
    } finally {
      setLoading(false);
    }
  };

  const joinSession = async (sessionId: string) => {
    try {
      setLoading(true);
      const response = await ApiService.joinMultiplayerSession(sessionId, playerId);
      console.log('Joined session:', response.data);
      onSessionJoined(sessionId);
    } catch (error) {
      console.error('Failed to join session:', error);
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
      }}>
        <h2 style={{ color: '#00d4ff', marginBottom: '20px' }}>Create New Session</h2>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', color: '#fff', marginBottom: '5px' }}>
            Session Name:
          </label>
          <input
            type="text"
            value={sessionName}
            onChange={(e) => setSessionName(e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              background: '#1a1a1a',
              border: '1px solid #404040',
              borderRadius: '4px',
              color: '#fff'
            }}
            placeholder="Enter session name"
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', color: '#fff', marginBottom: '5px' }}>
            Max Players:
          </label>
          <select
            value={maxPlayers}
            onChange={(e) => setMaxPlayers(parseInt(e.target.value))}
            style={{
              width: '100%',
              padding: '8px',
              background: '#1a1a1a',
              border: '1px solid #404040',
              borderRadius: '4px',
              color: '#fff'
            }}
          >
            <option value={2}>2 Players</option>
            <option value={3}>3 Players</option>
            <option value={4}>4 Players</option>
            <option value={6}>6 Players</option>
          </select>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', color: '#fff', marginBottom: '5px' }}>
            Game Mode:
          </label>
          <select
            value={gameMode}
            onChange={(e) => setGameMode(e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              background: '#1a1a1a',
              border: '1px solid #404040',
              borderRadius: '4px',
              color: '#fff'
            }}
          >
            <option value="conquest-classique">Conquest Classique</option>
            <option value="conquest-mystique">Conquest Mystique</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <button
            onClick={createSession}
            disabled={loading}
            style={{
              flex: 1,
              padding: '10px',
              background: '#00d4ff',
              color: '#000',
              border: 'none',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.6 : 1
            }}
          >
            {loading ? 'Creating...' : 'Create Session'}
          </button>
          <button
            onClick={() => setCreateSessionMode(false)}
            disabled={loading}
            style={{
              flex: 1,
              padding: '10px',
              background: '#404040',
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

  return (
    <div style={{ 
      padding: '20px', 
      background: '#2a2a2a', 
      borderRadius: '8px',
      maxWidth: '800px',
      margin: '20px auto'
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <h2 style={{ color: '#00d4ff', margin: 0 }}>Multiplayer Sessions</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={loadSessions}
            disabled={loading}
            style={{
              padding: '8px 16px',
              background: '#404040',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Loading...' : 'Refresh'}
          </button>
          <button
            onClick={() => setCreateSessionMode(true)}
            disabled={loading}
            style={{
              padding: '8px 16px',
              background: '#00d4ff',
              color: '#000',
              border: 'none',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            Create Session
          </button>
        </div>
      </div>

      <div style={{ color: '#ccc', fontSize: '12px', marginBottom: '15px' }}>
        Player ID: {playerId}
      </div>

      {sessions.length === 0 ? (
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
                  {session.sessionName}
                </h3>
                <div style={{ color: '#888', fontSize: '12px' }}>
                  Players: {session.currentPlayers}/{session.maxPlayers} | 
                  Mode: {session.gameMode} | 
                  Status: {session.status}
                </div>
              </div>
              <button
                onClick={() => joinSession(session.sessionId)}
                disabled={loading || session.currentPlayers >= session.maxPlayers}
                style={{
                  padding: '8px 16px',
                  background: session.currentPlayers >= session.maxPlayers ? '#666' : '#00d4ff',
                  color: session.currentPlayers >= session.maxPlayers ? '#aaa' : '#000',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: session.currentPlayers >= session.maxPlayers ? 'not-allowed' : 'pointer'
                }}
              >
                {session.currentPlayers >= session.maxPlayers ? 'Full' : 'Join'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiplayerSessionManager; 