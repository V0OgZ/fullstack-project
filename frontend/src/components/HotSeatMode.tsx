import React, { useState } from 'react';
import { useTranslation } from '../i18n';
import { Game, Player } from '../types/game';
import { GAME_ICONS } from '../constants/gameIcons';
import CreatureDisplay from './CreatureDisplay';

interface HotSeatModeProps {
  game: Game;
  onPlayerSwitch: (playerId: string) => void;
  onActionComplete: (action: any) => void;
}

const HotSeatMode: React.FC<HotSeatModeProps> = ({
  game,
  onPlayerSwitch,
  onActionComplete,
}) => {
  const { t } = useTranslation();
  const [showPlayerSelector, setShowPlayerSelector] = useState(false);
  const currentPlayer = game.players.find(p => p.id === game.currentPlayerTurn);

  const handlePlayerSwitch = (playerId: string) => {
    onPlayerSwitch(playerId);
    setShowPlayerSelector(false);
  };

  const getNextPlayer = (): Player | null => {
    const currentIndex = game.players.findIndex(p => p.id === game.currentPlayerTurn);
    const nextIndex = (currentIndex + 1) % game.players.length;
    return game.players[nextIndex] || null;
  };

  const nextPlayer = getNextPlayer();

  return (
    <div className="hotseat-mode">
      {/* Barre de statut du mode Hot Seat */}
      <div className="hotseat-status">
        <div className="hotseat-header">
          <h3 className="title-small">
            {GAME_ICONS.GAME_PLAY} Mode Hot Seat
          </h3>
          <button
            className="btn"
            onClick={() => setShowPlayerSelector(!showPlayerSelector)}
          >
            {GAME_ICONS.UI_SETTINGS} {t('change')} {t('player')}
          </button>
        </div>

        {/* Joueur actuel */}
        <div className="current-player">
          <div className="player-avatar">
            <CreatureDisplay
              type="hero"
              name="WARRIOR"
              size="medium"
              className={currentPlayer?.id === 'player1' ? 'hero-player1' : 'hero-player2'}
            />
          </div>
          <div className="player-details">
            <div className="player-name">{currentPlayer?.username}</div>
            <div className="player-resources">
              <div>{t('heroes')}: {currentPlayer?.heroes.length}</div>
              <div>{t('gold')}: {currentPlayer?.resources.gold}</div>
            </div>
          </div>
        </div>

        {/* Sélecteur de joueur */}
        {showPlayerSelector && (
          <div className="player-selector">
            <h4 className="title-small">{t('choosePlayer')}</h4>
            <div className="player-list">
              {game.players.map(player => (
                <div
                  key={player.id}
                  className={`player-option ${
                    player.id === game.currentPlayerTurn ? 'selected' : ''
                  }`}
                  onClick={() => handlePlayerSwitch(player.id)}
                >
                  <CreatureDisplay
                    type="hero"
                    name="WARRIOR"
                    size="small"
                    className={player.id === 'player1' ? 'hero-player1' : 'hero-player2'}
                  />
                  <div className="player-info">
                    <div className="player-name">{player.username}</div>
                    <div className="player-heroes">
                      {player.heroes.length} {t('heroes')} • {player.resources.gold} {t('gold')}
                    </div>
                  </div>
                  {player.id === game.currentPlayerTurn && (
                    <div className="current-indicator">
                      {GAME_ICONS.STATUS_ACTIVE}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Prochain joueur */}
        {nextPlayer && (
          <div className="next-player-info">
            <div className="next-player-label">
              {GAME_ICONS.GAME_FAST_FORWARD} {t('next')}: {nextPlayer.username}
            </div>
          </div>
        )}
      </div>

      {/* Instructions pour le mode Hot Seat */}
      <div className="hotseat-instructions">
        <h4 className="title-small">{GAME_ICONS.UI_INFO} {t('instructions')}</h4>
        <div className="instruction-list">
          <div className="instruction-item">
            <span>{GAME_ICONS.GAME_PLAY}</span>
            <span>{t('eachPlayerTakesturns')}</span>
          </div>
          <div className="instruction-item">
            <span>{GAME_ICONS.ACTION_UPGRADE}</span>
            <span>{t('planActionsForCurrentPlayer')}</span>
          </div>
          <div className="instruction-item">
            <span>{GAME_ICONS.GAME_FAST_FORWARD}</span>
            <span>{t('passToNextPlayerWhenDone')}</span>
          </div>
          <div className="instruction-item">
            <span>{GAME_ICONS.UI_SETTINGS}</span>
            <span>{t('useChangePlayerToCorrectError')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotSeatMode; 