import React, { useState, useEffect } from 'react';
import { useTranslation } from '../i18n';
import { useGameStore } from '../store/useGameStore';
import ModernGameRenderer from './ModernGameRenderer';
import OptimizedGameRenderer from './OptimizedGameRenderer';
import MagicInventory from './MagicInventory';
import AIActionVisualizer from './AIActionVisualizer';
import PerformanceDashboard from './PerformanceDashboard';
import CastleManagement from './CastleManagement';
import './TrueHeroesInterface.css';

interface TrueHeroesInterfaceProps {
  playerCount: number;
  scenarioType: 'classique' | 'mystique' | 'multiplayer';
  scenarioId: string;
}

const TrueHeroesInterface: React.FC<TrueHeroesInterfaceProps> = ({ scenarioId, scenarioType }) => {
  const { t } = useTranslation();
  const { 
    currentGame, 
    currentPlayer, 
    isLoading, 
    error,
    endTurn,
    nextPlayer
  } = useGameStore();
  
  const [showMagicInventory, setShowMagicInventory] = useState(false);
  const [showHeroesPanel, setShowHeroesPanel] = useState(false);
  const [showCastleManagement, setShowCastleManagement] = useState(false);
  const [selectedHeroId, setSelectedHeroId] = useState<string | null>(null);
  const [selectedCastleId, setSelectedCastleId] = useState<string | null>(null);

  // THIS useEffect was causing the infinite loop. It has been removed.
  // The Game.tsx component is now solely responsible for loading the game.
  /*
  useEffect(() => {
    if (scenarioId) {
      loadGame(scenarioId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scenarioId]); // Only reload when scenarioId changes
  */

  const handleEndTurn = () => {
    if (currentGame?.gameMode === 'hotseat') {
      nextPlayer();
    } else {
      endTurn();
    }
  };

  const handleHeroSelect = (heroId: string) => {
    setSelectedHeroId(heroId);
  };

  const handleCastleSelect = (castleId: string) => {
    setSelectedCastleId(castleId);
    setShowCastleManagement(true);
  };

  if (isLoading) {
    return (
      <div className="true-heroes-loading">
        <div className="loading-spinner"></div>
        <p>{t('loading')}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="true-heroes-error">
        <h2>{t('error')}</h2>
        <p>{error}</p>
        {/* <button onClick={() => loadGame(scenarioId)} className="retry-button">
          {t('back')}
        </button> */}
      </div>
    );
  }

  // Render the interface only when the game is fully loaded
  if (!currentGame || !currentPlayer) {
    return (
      <div className="true-heroes-loading">
        <div className="loading-spinner"></div>
        <p>{t('loading')}</p>
      </div>
    );
  }

  return (
    <div className="true-heroes-interface">
      {/* Header */}
      <div className="game-header">
        <div className="game-info">
          <h1 className="game-title">
            <span className="scenario-badge" data-scenario={scenarioType}>
              {scenarioType === 'classique' && '🏰 Classic'}
              {scenarioType === 'mystique' && '🔮 Mystical'}
              {scenarioType === 'multiplayer' && '🌐 Multiplayer'}
            </span>
            Heroes of Time
          </h1>
          <div className="turn-info">
            <span className="turn-label">{t('turn')}</span>
            <span className="turn-number">{currentGame.currentTurn}</span>
          </div>
        </div>

        <div className="header-controls">
          {/* Simplified Control Panel */}
          <div className="control-panel">
            <button 
              className={`control-btn ${showHeroesPanel ? 'active' : ''}`}
              onClick={() => setShowHeroesPanel(!showHeroesPanel)}
              title="Heroes Management"
            >
              <span className="btn-icon">⚔️</span>
              <span className="btn-label">Heroes</span>
            </button>

            <button 
              className={`control-btn ${showMagicInventory ? 'active' : ''}`}
              onClick={() => setShowMagicInventory(!showMagicInventory)}
              title="Magic Inventory"
            >
              <span className="btn-icon">🎒</span>
              <span className="btn-label">Inventory</span>
            </button>

            <button 
              className="control-btn castle-btn"
              onClick={() => handleCastleSelect('main-castle')}
              title="Castle Management"
            >
              <span className="btn-icon">🏰</span>
              <span className="btn-label">Castle</span>
            </button>

            <button 
              className="control-btn disabled"
              disabled
              title="AI Features - Coming Soon!"
            >
              <span className="btn-icon">🤖</span>
              <span className="btn-label">AI</span>
            </button>
          </div>

          <button className="end-turn-btn" onClick={handleEndTurn}>
            <span className="btn-icon">➡️</span>
            <span className="btn-label">{t('endTurn')}</span>
          </button>
        </div>
      </div>

      {/* Main Game Area */}
      <div className="game-main">
        {/* Game Renderer - Only ModernGameRenderer */}
        <div className="game-renderer-container">
          <ModernGameRenderer 
            width={800} 
            height={600} 
          />
        </div>

        {/* Side Panel */}
        <div className="game-side-panel">
          {/* Player Info */}
          <div className="player-info-section">
            <h3>{t('player')}</h3>
            <div className="player-card">
              <div className="player-name">{currentPlayer.username}</div>
              <div className="player-resources">
                <div className="resource-item">
                  <span className="resource-icon">💰</span>
                  <span className="resource-value">{currentPlayer.resources.gold}</span>
                </div>
                <div className="resource-item">
                  <span className="resource-icon">🪵</span>
                  <span className="resource-value">{currentPlayer.resources.wood}</span>
                </div>
                <div className="resource-item">
                  <span className="resource-icon">🪨</span>
                  <span className="resource-value">{currentPlayer.resources.stone}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Heroes Section */}
          <div className="heroes-section">
            <h3>{t('heroes')}</h3>
            <div className="heroes-list">
              {currentPlayer.heroes.map(hero => (
                <div 
                  key={hero.id} 
                  className={`hero-card ${selectedHeroId === hero.id ? 'selected' : ''}`}
                  onClick={() => handleHeroSelect(hero.id)}
                >
                  <div className="hero-avatar">⚔️</div>
                  <div className="hero-info">
                    <div className="hero-name">{hero.name}</div>
                    <div className="hero-level">Level {hero.level}</div>
                    <div className="hero-mp">
                      MP: {hero.movementPoints}/{hero.maxMovementPoints}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="quick-actions">
            <h3>Quick Actions</h3>
            <div className="action-buttons">
              <button 
                className="action-btn"
                onClick={() => setShowMagicInventory(true)}
              >
                <span className="action-icon">🎒</span>
                <span className="action-label">Inventory</span>
              </button>
              <button 
                className="action-btn"
                onClick={() => handleCastleSelect('main-castle')}
              >
                <span className="action-icon">🏰</span>
                <span className="action-label">Castle</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay Components */}
      {showMagicInventory && (
        <MagicInventory />
      )}

      {showHeroesPanel && currentPlayer && (
        <div className="heroes-panel">
          <div className="heroes-panel-header">
            <h3 className="heroes-panel-title">⚔️ {t('myHeroes')}</h3>
            <button 
              className="close-panel-btn"
              onClick={() => setShowHeroesPanel(false)}
            >
              ×
            </button>
          </div>
          <div className="heroes-list">
            {currentPlayer.heroes && currentPlayer.heroes.length > 0 ? (
              currentPlayer.heroes.map(hero => (
                <div 
                  key={hero.id} 
                  className={`hero-item ${selectedHeroId === hero.id ? 'selected' : ''}`}
                  onClick={() => handleHeroSelect(hero.id)}
                >
                  <div className="hero-avatar">
                    {hero.name.includes('Arthur') ? '👑' : 
                     hero.name.includes('Morgana') ? '🔮' : 
                     hero.name.includes('Archer') ? '🏹' : 
                     hero.name.includes('Paladin') ? '🛡️' : '⚔️'}
                  </div>
                  <div className="hero-details">
                    <div className="hero-name">{hero.name}</div>
                    <div className="hero-stats">
                      <span className="hero-stat">
                        📍 {hero.position?.x || 0},{hero.position?.y || 0}
                      </span>
                      <span className="hero-stat">
                        ⭐ Lv.{hero.level || 1}
                      </span>
                      <span className="hero-stat">
                        🦶 {hero.movementPoints || 0}/{hero.maxMovementPoints || 3}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ color: '#999', textAlign: 'center', padding: '20px' }}>
                No heroes available
              </div>
            )}
          </div>
        </div>
      )}

      {showCastleManagement && selectedCastleId && (
        <CastleManagement 
          castleId={selectedCastleId}
          isVisible={showCastleManagement}
          onClose={() => setShowCastleManagement(false)}
        />
      )}
    </div>
  );
};

export default TrueHeroesInterface; 