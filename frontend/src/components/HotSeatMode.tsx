import React, { useState } from 'react';
import { Game, Player, Hero } from '../types/game';
import { GAME_ICONS } from '../constants/gameIcons';
import CreatureDisplay from './CreatureDisplay';

interface HotSeatModeProps {
  game: Game;
  onPlayerSwitch: (playerId: string) => void;
  onActionComplete: () => void;
}

const HotSeatMode: React.FC<HotSeatModeProps> = ({
  game,
  onPlayerSwitch,
  onActionComplete,
}) => {
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
            {GAME_ICONS.UI_SETTINGS} Changer Joueur
          </button>
        </div>

        {/* Joueur actuel */}
        {currentPlayer && (
          <div className="current-player-info">
            <div className="player-avatar">
              <CreatureDisplay
                type="hero"
                name="WARRIOR"
                size="small"
                className="hero-player1"
              />
            </div>
            <div className="player-details">
              <h4 className="hero-name">{currentPlayer.username}</h4>
              <div className="player-stats">
                <div>Héros: {currentPlayer.heroes.length}</div>
                <div>Or: {currentPlayer.resources.gold}</div>
                <div>Tour: {game.currentTurn}</div>
              </div>
            </div>
            <div className="player-turn-indicator">
              <div className="turn-badge">
                {GAME_ICONS.STATUS_ACTIVE} À vous de jouer
              </div>
            </div>
          </div>
        )}

        {/* Sélecteur de joueur */}
        {showPlayerSelector && (
          <div className="player-selector">
            <h4 className="title-small">Choisir le joueur</h4>
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
                      {player.heroes.length} héros • {player.resources.gold} or
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
              {GAME_ICONS.GAME_FAST_FORWARD} Prochain: {nextPlayer.username}
            </div>
          </div>
        )}
      </div>

      {/* Instructions pour le mode Hot Seat */}
      <div className="hotseat-instructions">
        <h4 className="title-small">Instructions Hot Seat</h4>
        <div className="instructions-list">
          <div className="instruction-item">
            <span className="instruction-icon">{GAME_ICONS.UI_INFO}</span>
            <span>Chaque joueur joue à tour de rôle sur le même écran</span>
          </div>
          <div className="instruction-item">
            <span className="instruction-icon">{GAME_ICONS.ACTION_MOVE}</span>
            <span>Planifiez vos actions pour le joueur actuel</span>
          </div>
          <div className="instruction-item">
            <span className="instruction-icon">{GAME_ICONS.GAME_FAST_FORWARD}</span>
            <span>Passez au joueur suivant quand vous avez fini</span>
          </div>
          <div className="instruction-item">
            <span className="instruction-icon">{GAME_ICONS.UI_SETTINGS}</span>
            <span>Utilisez "Changer Joueur" pour corriger une erreur</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotSeatMode; 