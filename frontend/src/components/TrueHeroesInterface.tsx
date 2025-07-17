import React, { useState, useEffect, useCallback } from 'react';
import { useGameStore } from '../store/useGameStore';
import { useTranslation } from '../i18n';
import ModernGameRenderer from './ModernGameRenderer';
import EnhancedScenarioSelector from './EnhancedScenarioSelector';
import CastleManagementPanel from './CastleManagementPanel';
import GameScriptTester from './GameScriptTester';
import EpicContentViewer from './EpicContentViewer';
import { EnhancedHeroPanel, EnhancedCastlePanel, EnhancedInventoryPanel } from './EnhancedSidebarPanels';
import './TrueHeroesInterface.css';
import './EnhancedSidebarPanels.css';

interface TrueHeroesInterfaceProps {
  onNavigate: (page: string) => void;
}

const TrueHeroesInterface: React.FC<TrueHeroesInterfaceProps> = ({ onNavigate }) => {
  const { t } = useTranslation();
  const { 
    currentGame, 
    currentPlayer, 
    selectedHero,
    selectHero,
    moveHero,
    attackTarget,
    endTurn,
    isLoading,
    error
  } = useGameStore();
  
  const [rightPanelContent, setRightPanelContent] = useState<'scenario' | 'hero' | 'castle' | 'inventory' | 'script' | 'epic'>('scenario');
  const [showEpicContent, setShowEpicContent] = useState(false);
  const [movementMode, setMovementMode] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [testMode, setTestMode] = useState(false);

  // Enhanced action handlers
  const handleHeroAction = useCallback((action: string) => {
    if (!selectedHero) return;
    
    switch (action) {
      case 'move':
        setMovementMode(true);
        console.log('Movement mode activated for:', selectedHero.name);
        break;
      case 'attack':
        attackTarget(selectedHero.id, 'enemy-1');
        break;
      case 'cast':
        console.log('Cast spell:', selectedHero.name);
        break;
      case 'collect':
        console.log('Collect resource:', selectedHero.name);
        break;
      default:
        console.log('Unknown hero action:', action);
    }
  }, [selectedHero, attackTarget]);

  const handleCastleAction = useCallback(async (action: string, params?: any) => {
    switch (action) {
      case 'resetGrowth':
        console.log('Reset weekly growth');
        break;
      case 'viewBonuses':
        console.log('View castle bonuses');
        break;
      case 'viewSpells':
        console.log('View available spells');
        break;
      case 'recruit':
        console.log('Recruiting creature:', params);
        break;
      case 'build':
        console.log('Building structure:', params);
        break;
      default:
        console.log('Unknown castle action:', action);
    }
  }, []);

  const handleInventoryAction = useCallback((itemId: string) => {
    console.log('Using item:', itemId);
  }, []);

  // Load default game on component mount
  useEffect(() => {
    if (!currentGame) {
      // This part needs to be updated to use the new scenario selector
      // For now, it will load a default if no game is selected
      // setSelectedScenario('conquest-classic'); // Example
    }
  }, [currentGame]);

  // Handlers pour les boutons de contrôle
  const handleHexClick = (x: number, y: number) => {
    const position = { x, y };
    console.log('Hex clicked:', position);
    if (movementMode && selectedHero) {
      // Try to move hero to the clicked position
      moveHero(selectedHero.id, position);
      setMovementMode(false);
    } else {
      // Handle tile selection logic here
      console.log('Tile selected:', position);
    }
  };

  const handleHeroSelect = (heroId: string) => {
    const hero = currentPlayer?.heroes?.find(h => h.id === heroId);
    if (hero) {
      selectHero(hero);
    }
  };

  const handleEndTurn = async () => {
    if (!currentGame || !currentPlayer) return;
    
    try {
      await endTurn();
      console.log('Turn ended successfully');
    } catch (error) {
      console.error('Error ending turn:', error);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">⏳</div>
        <p>Loading Heroes of Time...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="error-container">
        <div className="error-icon">❌</div>
        <p>Error: {error}</p>
        <button onClick={() => window.location.reload()}>
          🔄 Reload Game
        </button>
      </div>
    );
  }

  return (
    <div className={`true-heroes-interface ${testMode ? 'test-mode' : ''}`}>
      <div className="game-layout">
        {/* Left side - Game Map */}
        <div className="game-map-container">
          {!testMode ? (
            <ModernGameRenderer 
              map={currentGame?.map || []}
              heroes={currentPlayer?.heroes || []}
              creatures={[]}
              structures={[]}
              selectedHero={selectedHero}
              validMoves={[]}
              validTargets={[]}
              onTileClick={handleHexClick}
              currentPlayer={currentPlayer?.id}
              showFog={false}
              showGrid={true}
              showElevation={true}
              showTransitions={true}
              width={1000}
              height={600}
            />
          ) : (
            <div className="test-mode-placeholder">
              <div>🗺️ MAP DISABLED FOR TESTING</div>
              <div>🎮 Testing Enhanced Sidebar</div>
              <button 
                className="btn"
                onClick={() => setTestMode(false)}
                style={{
                  marginTop: '20px',
                  padding: '10px 20px',
                  background: 'linear-gradient(45deg, #d4af37, #ffd700)',
                  color: '#2a1810',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                🗺️ Enable Map
              </button>
            </div>
          )}
        </div>

        {/* Right side - Enhanced Sidebar */}
        <div className="right-sidebar">
          <div className="sidebar-header">
            <div className="game-info">
              <div className="turn-info">
                🎯 Turn: {currentGame?.turn || 1}/{currentGame?.maxTurns || 200}
              </div>
              <div className="player-resources">
                <span className="resource">💰 {currentPlayer?.resources?.gold || 10000}</span>
                <span className="resource">🪵 {currentPlayer?.resources?.wood || 500}</span>
                <span className="resource">🪨 {currentPlayer?.resources?.stone || 300}</span>
              </div>
            </div>
          </div>

          <div className="sidebar-controls">
            <button 
              className={`control-btn ${rightPanelContent === 'hero' ? 'active' : ''}`}
              onClick={() => setRightPanelContent('hero')}
              title={t('tooltip.heroes')}
            >
              <span className="btn-icon">⚔️</span>
            </button>

            <button 
              className={`control-btn ${rightPanelContent === 'castle' ? 'active' : ''}`}
              onClick={() => setRightPanelContent('castle')}
              title={t('tooltip.castle')}
            >
              <span className="btn-icon">🏰</span>
            </button>

            <button 
              className={`control-btn ${rightPanelContent === 'inventory' ? 'active' : ''}`}
              onClick={() => setRightPanelContent('inventory')}
              title="Inventory"
            >
              <span className="btn-icon">🎒</span>
            </button>

            <button 
              className={`control-btn ${rightPanelContent === 'script' ? 'active' : ''}`}
              onClick={() => setRightPanelContent('script')}
              title={t('tooltip.scriptTester')}
            >
              <span className="btn-icon">🧪</span>
            </button>

            <button 
              className={`control-btn ${showEpicContent ? 'active' : ''}`}
              onClick={() => setShowEpicContent(true)}
              title="🎮 Contenu Épique - Créatures, Héros et Bâtiments"
            >
              <span className="btn-icon">🐉</span>
            </button>

            {!testMode && (
              <button 
                className="control-btn"
                onClick={() => setTestMode(true)}
                title="Test Mode - Disable Map"
                style={{ background: 'linear-gradient(45deg, #FFA500, #FF8C00)' }}
              >
                <span className="btn-icon">🧪</span>
              </button>
            )}

            <button 
              className="end-turn-btn"
              onClick={handleEndTurn}
              title="End Turn"
            >
              <span className="btn-icon">⭐</span>
            </button>
          </div>

          <div className="sidebar-content">
            {/* Hero Panel */}
            {rightPanelContent === 'hero' && (
              <EnhancedHeroPanel
                selectedHero={selectedHero}
                heroes={currentPlayer?.heroes || []}
                onHeroSelect={selectHero}
                onHeroAction={handleHeroAction}
              />
            )}

            {/* Castle Panel */}
            {rightPanelContent === 'castle' && currentGame && currentPlayer && (
              <EnhancedCastlePanel
                gameId={currentGame.id}
                playerId={currentPlayer.id}
                onAction={handleCastleAction}
              />
            )}

            {/* Inventory Panel */}
            {rightPanelContent === 'inventory' && (
              <EnhancedInventoryPanel
                selectedHero={selectedHero}
                onItemUse={handleInventoryAction}
              />
            )}

            {/* Script Panel */}
            {rightPanelContent === 'script' && (
              <div className="panel-content script-panel">
                <div className="panel-header">
                  <h3>🧪 {t('tooltip.scriptTester')}</h3>
                  <button 
                    className="close-panel-btn"
                    onClick={() => setRightPanelContent('hero')}
                  >
                    ×
                  </button>
                </div>
                
                <div className="script-tester-container">
                  <GameScriptTester />
                </div>
              </div>
            )}

            {/* Scenario Panel (fallback) */}
            {rightPanelContent === 'scenario' && (
              <div className="panel-content scenario-panel">
                <div className="panel-header">
                  <h3>🎮 Game Scenario</h3>
                </div>
                <div className="scenario-content">
                  <p>Game scenario information will be displayed here.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Epic Content Viewer Modal */}
      {showEpicContent && (
        <EpicContentViewer 
          isVisible={showEpicContent}
          onClose={() => setShowEpicContent(false)}
        />
      )}
    </div>
  );
};

export default TrueHeroesInterface; 