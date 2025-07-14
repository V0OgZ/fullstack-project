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
    
    // If we have a scenarioId and no game loaded, load it.
    if (scenarioId && !currentGame) {
      console.log(`[GAME PAGE] Current game not found. Calling loadGame with scenarioId: ${scenarioId}`);
      loadGame(scenarioId);
    } else {
      console.log(`[GAME PAGE] Game already loaded or no scenarioId provided.`);
      console.log(`[GAME PAGE] scenarioId: ${scenarioId}, currentGame: ${currentGame ? currentGame.id : 'null'}`);
    }
  }, [scenarioId, currentGame, loadGame]);

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
  return (
    <div className="game-page">
      <TrueHeroesInterface
        playerCount={currentGame.players.length}
        scenarioType={currentGame.name.toLowerCase().includes('mystique') ? 'mystique' : 'classique'}
        scenarioId={currentGame.id}
      />
    </div>
  );
};

export default Game; 