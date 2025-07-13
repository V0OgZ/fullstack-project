import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import TrueHeroesInterface from '../components/TrueHeroesInterface';
import MultiplayerSessionManager from '../components/MultiplayerSessionManager';
import { useTranslation } from '../i18n';

const Game: React.FC = () => {
  const { scenarioId } = useParams<{ scenarioId: string }>();
  const location = useLocation();
  const { t } = useTranslation();
  const [scenarioType, setScenarioType] = useState<'classique' | 'mystique' | 'multiplayer'>('classique');
  const [playerCount, setPlayerCount] = useState(2);
  const [multiplayerSessionId, setMultiplayerSessionId] = useState<string | null>(null);

  useEffect(() => {
    const isMultiplayerRoute = location.pathname === '/multiplayer';

    // Determine scenario type
    if (scenarioId === 'mystique-temporel') {
      setScenarioType('mystique');
      setPlayerCount(2);
      console.log('🔮 Loading Mystique scenario with temporal objects...');
    } else if (isMultiplayerRoute || scenarioId === 'multiplayer-arena') {
      setScenarioType('multiplayer');
      setPlayerCount(4); // Default to 4 players for multiplayer
      console.log('🌐 Loading Multiplayer Arena with 4 players...');
    } else {
      setScenarioType('classique');
      setPlayerCount(2);
      console.log('🏰 Loading Classic scenario...');
    }
  }, [scenarioId, location.pathname]);

  if (!scenarioId && location.pathname !== '/multiplayer') {
    return (
      <div style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#1a1a1a',
        color: 'white'
      }}>
        <h2>❌ {t('gameNotFound')}</h2>
      </div>
    );
  }

  // For multiplayer, show the proper multiplayer session manager
  if (scenarioType === 'multiplayer') {
    // If we have a session, start the game
    if (multiplayerSessionId) {
      return (
        <div className="multiplayer-game">
          <TrueHeroesInterface 
            playerCount={playerCount} 
            scenarioType="multiplayer"
            scenarioId={multiplayerSessionId}
          />
        </div>
      );
    }
    
    // Otherwise show the multiplayer lobby
    return (
      <div className="multiplayer-lobby">
        <MultiplayerSessionManager 
          onSessionJoined={(sessionId) => {
            console.log(`🎮 Joined multiplayer session: ${sessionId}`);
            setMultiplayerSessionId(sessionId);
          }}
          onError={(error) => {
            console.error('Multiplayer error:', error);
            alert(`Multiplayer Error: ${error}`);
          }}
        />
      </div>
    );
  }

  return (
    <div className="game-page">
      {/* Use the same Heroes interface for both scenarios */}
      <TrueHeroesInterface 
        playerCount={playerCount} 
        scenarioType={scenarioType}
        scenarioId={scenarioId as string}
      />
    </div>
  );
};

export default Game; 