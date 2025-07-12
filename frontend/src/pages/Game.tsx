import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGameStore } from '../store/useGameStore';
import SimpleGameInterface from '../components/SimpleGameInterface';
import PoliticalSystem from '../components/PoliticalSystem';
import { generateAdvancedMap } from '../utils/advancedMapGenerator';
import { useTranslation } from '../i18n';

const Game: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const { t } = useTranslation();
  const {
    currentGame,
    currentPlayer,
    isLoading,
    error,
    map,
    setMap,
    loadGame,
    refreshGameState,
  } = useGameStore();

  const [showPoliticalSystem, setShowPoliticalSystem] = useState(false);

  useEffect(() => {
    if (gameId) {
      loadGame(gameId);
    }
  }, [gameId, loadGame]);

  // Initialize the advanced map
  useEffect(() => {
    if (map.length === 0) {
      const advancedMap = generateAdvancedMap(20, 15, 12345);
      setMap(advancedMap);
    }
  }, [map.length, setMap]);

  useEffect(() => {
    if (currentGame) {
      // Auto-refresh every 30 seconds
      const interval = setInterval(() => {
        refreshGameState();
      }, 30000);

      return () => clearInterval(interval);
    }
  }, [currentGame, refreshGameState]);

  if (isLoading) {
    return (
      <div style={{ 
        height: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: '#0F0F0F',
        color: 'white'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            border: '4px solid rgba(255,255,255,0.1)', 
            borderTop: '4px solid #00D4FF', 
            borderRadius: '50%', 
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px'
          }}></div>
          <p>{t('loading')}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        height: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: '#0F0F0F',
        color: 'white'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: '#FF6B6B', fontSize: '18px', marginBottom: '16px' }}>{t('error')}</div>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!currentGame || !currentPlayer) {
    return (
      <div style={{ 
        height: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: '#0F0F0F',
        color: 'white'
      }}>
        <div style={{ textAlign: 'center' }}>
          <p>{t('gameNotFound')}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <SimpleGameInterface />
      
      {/* Système politique */}
      <PoliticalSystem 
        isVisible={showPoliticalSystem} 
        onClose={() => setShowPoliticalSystem(false)} 
      />
    </>
  );
};

export default Game; 