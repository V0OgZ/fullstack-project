import React, { useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import TrueHeroesInterface from '../components/TrueHeroesInterface';
import MultiplayerSessionManager from '../components/MultiplayerSessionManager';
import { useGameStore } from '../store/useGameStore';
import { useTranslation } from '../i18n';

const Game: React.FC = () => {
  const { scenarioId } = useParams<{ scenarioId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const { currentGame, isLoading, error, loadGame } = useGameStore();

  useEffect(() => {
    // If we have a scenarioId and no game loaded, load it.
    if (scenarioId && !currentGame) {
      loadGame(scenarioId);
    }
  }, [scenarioId, currentGame, loadGame]);

  // When a game is successfully loaded, navigate to its specific URL
  useEffect(() => {
    if (currentGame && scenarioId !== currentGame.id) {
      navigate(`/game/${currentGame.id}`, { replace: true });
    }
  }, [currentGame, scenarioId, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  
  // This part handles the multiplayer lobby
  if (location.pathname === '/multiplayer') {
    return <MultiplayerSessionManager onSessionJoined={(id) => navigate(`/game/${id}`)} onError={(e) => console.error(e)} />;
  }

  if (!currentGame) {
    return <div>{t('gameNotFound')}</div>;
  }

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