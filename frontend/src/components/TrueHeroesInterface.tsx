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
    loadGame, 
    isLoading, 
    error,
    endTurn,
    nextPlayer
  } = useGameStore();
  
  const [showMagicInventory, setShowMagicInventory] = useState(false);
  const [showAIVisualizer, setShowAIVisualizer] = useState(false);
  const [showPerformanceDashboard, setShowPerformanceDashboard] = useState(false);
  const [showCastleManagement, setShowCastleManagement] = useState(false);
  const [selectedHeroId, setSelectedHeroId] = useState<string | null>(null);
  const [selectedCastleId, setSelectedCastleId] = useState<string | null>(null);
  const [useOptimizedRenderer, setUseOptimizedRenderer] = useState(false);

  useEffect(() => {
    if (scenarioId) {
      loadGame(scenarioId);
    }
  }, [scenarioId, loadGame]);

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
        <button onClick={() => loadGame(scenarioId)} className="retry-button">
          {t('back')}
        </button>
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
          {/* Enhanced Control Panel */}
          <div className="control-panel">
            <button 
              className={`control-btn ${useOptimizedRenderer ? 'active' : ''}`}
              onClick={() => setUseOptimizedRenderer(!useOptimizedRenderer)}
              title="Toggle Optimized Renderer"
            >
              <span className="btn-icon">⚡</span>
              <span className="btn-label">Optimized</span>
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
              className={`control-btn ${showAIVisualizer ? 'active' : ''}`}
              onClick={() => setShowAIVisualizer(!showAIVisualizer)}
              title="AI Visualizer"
            >
              <span className="btn-icon">🤖</span>
              <span className="btn-label">AI</span>
            </button>

            <button 
              className={`control-btn ${showPerformanceDashboard ? 'active' : ''}`}
              onClick={() => setShowPerformanceDashboard(!showPerformanceDashboard)}
              title="Performance Dashboard"
            >
              <span className="btn-icon">📊</span>
              <span className="btn-label">Performance</span>
            </button>

            <button 
              className="control-btn castle-btn"
              onClick={() => handleCastleSelect('main-castle')}
              title="Castle Management"
            >
              <span className="btn-icon">🏰</span>
              <span className="btn-label">Castle</span>
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
        {/* Game Renderer */}
        <div className="game-renderer-container">
          {useOptimizedRenderer ? (
            <OptimizedGameRenderer 
              width={800} 
              height={600} 
              onHeroSelect={handleHeroSelect}
              selectedHeroId={selectedHeroId}
            />
          ) : (
            <ModernGameRenderer 
              width={800} 
              height={600} 
            />
          )}
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
              <button 
                className="action-btn"
                onClick={() => setShowAIVisualizer(true)}
              >
                <span className="action-icon">🤖</span>
                <span className="action-label">AI Status</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay Components */}
      {showMagicInventory && (
        <MagicInventory />
      )}

      {showAIVisualizer && (
        <AIActionVisualizer 
          gameId={scenarioId}
          isVisible={showAIVisualizer}
          onClose={() => setShowAIVisualizer(false)}
        />
      )}

      {showPerformanceDashboard && (
        <PerformanceDashboard 
          isVisible={showPerformanceDashboard}
          onClose={() => setShowPerformanceDashboard(false)}
        />
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