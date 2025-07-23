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
    
    // Handle demo route - automatically load conquest-classic
    if (window.location.pathname === '/demo') {
      console.log('[GAME PAGE] Demo route detected - loading conquest-classic');
      loadGame('conquest-classic');
      return;
    }
    
    // Handle root route - load conquest-classic by default
    if (window.location.pathname === '/') {
      console.log('[GAME PAGE] Root route detected - loading conquest-classic by default');
      loadGame('conquest-classic');
      return;
    }
    
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

  console.log('[GAME PAGE] Status: Rendering TrueHeroesInterface');
  
  return (
    <div className="game-page">
      <TrueHeroesInterface />
    </div>
  );
};

export default Game; 