import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TrueHeroesInterface from '../components/TrueHeroesInterface';
import MultiplayerSessionManager from '../components/MultiplayerSessionManager';
import { useGameStore } from '../store/useGameStore';
import { useTranslation } from '../i18n';

const Game: React.FC = () => {
  const { scenarioId } = useParams<{ scenarioId: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { currentGame, isLoading, error, loadGame } = useGameStore();

  useEffect(() => {
    console.log(`[GAME PAGE] --- Component mounted for scenarioId: ${scenarioId} ---`);
    console.log(`[GAME PAGE] Current URL: ${window.location.href}`);
    console.log(`[GAME PAGE] Current pathname: ${window.location.pathname}`);
    
    // ALWAYS load the game when scenarioId is provided
    // This ensures fresh data from backend every time
    if (scenarioId) {
      console.log(`[GAME PAGE] Force loading game for scenarioId: ${scenarioId}`);
      loadGame(scenarioId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scenarioId]); // Only depend on scenarioId to avoid infinite loops

  // Remove the navigation logic that was causing issues
  // The game should stay on the current URL

  if (isLoading) {
    console.log('[GAME PAGE] Status: Loading...');
    return <div>Loading...</div>;
  }

  if (error) {
    console.error(`[GAME PAGE] Status: Error - ${error}`);
    return <div>Error: {error}</div>;
  }

  if (window.location.pathname === '/multiplayer') {
    return <MultiplayerSessionManager onSessionJoined={(id) => navigate(`/game/${id}`)} onError={(e) => console.error(e)} />;
  }

  if (!currentGame) {
    console.log('[GAME PAGE] Status: No game data available. Waiting for data...');
    return <div>{t('gameNotFound')}</div>;
  }

  console.log('[GAME PAGE] Status: Game data loaded successfully. Rendering game components.');
  
  // Determine scenario type based on the URL parameter, not the game name
  let scenarioType: 'classique' | 'mystique' | 'multiplayer' = 'classique';
  if (scenarioId) {
    if (scenarioId.includes('mystique')) {
      scenarioType = 'mystique';
    } else if (scenarioId.includes('multiplayer') || scenarioId.includes('arena')) {
      scenarioType = 'multiplayer';
    }
  }
  
  return (
    <div className="game-page">
      <TrueHeroesInterface
        playerCount={currentGame.players.length}
        scenarioType={scenarioType}
        scenarioId={scenarioId || currentGame.id}
      />
    </div>
  );
};

export default Game; 