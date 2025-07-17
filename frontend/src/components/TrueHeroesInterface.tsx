import React, { useState, useEffect, useCallback } from 'react';
import { useGameStore } from '../store/useGameStore';
import { useTranslation } from '../i18n';
import ModernGameRenderer from './ModernGameRenderer';
import EnhancedScenarioSelector from './EnhancedScenarioSelector';
import CastleManagementPanel from './CastleManagementPanel';
import GameScriptTester from './GameScriptTester';
import EpicContentViewer from './EpicContentViewer';
import { EnhancedHeroPanel, EnhancedCastlePanel, EnhancedInventoryPanel } from './EnhancedSidebarPanels';
import TerrainRendererWrapper from './TerrainRendererWrapper';
import TerrainModeSelector, { TerrainMode } from './TerrainModeSelector';
import GoldorakEasterEgg from './GoldorakEasterEgg';
import { gameActionService, quickMove, strategicMove } from '../services/gameActionService';
import { useRetroKonami } from '../utils/retro-konami';
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
  
  // États existants
  const [showGameScriptTester, setShowGameScriptTester] = useState(false);
  const [showEpicContentViewer, setShowEpicContentViewer] = useState(false);
  const [activePanel, setActivePanel] = useState<'scenario' | 'hero' | 'castle' | 'inventory' | 'script' | 'epic'>('scenario');
  const [testMode, setTestMode] = useState(false);
  
  // NOUVEAU: État pour le mode terrain hybride
  const [terrainMode, setTerrainMode] = useState<TerrainMode>('canvas2d');
  
  // NOUVEAU: État pour Goldorak Easter Egg
  const [showGoldorakEasterEgg, setShowGoldorakEasterEgg] = useState(false);
  
  // NOUVEAU: Hook pour les codes konami
  const { manager } = useRetroKonami();

  // Enhanced action handlers
  const handleHeroAction = useCallback((action: string) => {
    if (!selectedHero) return;
    
    switch (action) {
      case 'move':
        // setMovementMode(true); // This state is removed, so this line is removed
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
  const handleHexClick = useCallback(async (x: number, y: number) => {
    if (selectedHero && currentGame) {
      try {
        console.log(`🎯 Attempting to move hero ${selectedHero.name} to (${x}, ${y})`);
        
        // NOUVEAU: Utilisation de GameActionService
        if (Math.abs(selectedHero.position.x - x) <= 1 && Math.abs(selectedHero.position.y - y) <= 1) {
          // Mouvement simple - utilisation de quickMove
          await quickMove(currentGame.id, selectedHero.id, x, y);
        } else {
          // Mouvement complexe - utilisation de strategicMove
          await strategicMove(currentGame.id, selectedHero.id, x, y);
        }
        
        console.log(`✅ Hero movement successful`);
      } catch (error) {
        console.error('❌ Hero movement failed:', error);
      }
    }
  }, [selectedHero, currentGame]);

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
            <TerrainRendererWrapper 
              mode={terrainMode}
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
              <h3>🧪 Test Mode</h3>
              <p>Map désactivée pour tester la sidebar</p>
              <button onClick={() => setTestMode(false)}>
                Réactiver la map
              </button>
            </div>
          )}
        </div>

        {/* Right side - Enhanced Sidebar */}
        <div className="right-sidebar">
          <div className="sidebar-header">
            <div className="game-info">
              <span className="turn-counter">Turn {currentGame?.turn || 1}</span>
              <span className="resources">💰 {currentPlayer?.resources?.gold || 0}</span>
            </div>
            <div className="sidebar-controls">
              <button 
                className={`sidebar-tab ${activePanel === 'scenario' ? 'active' : ''}`}
                onClick={() => setActivePanel('scenario')}
                title="Scenario"
              >
                🏔️
              </button>
              <button 
                className={`sidebar-tab ${activePanel === 'hero' ? 'active' : ''}`}
                onClick={() => setActivePanel('hero')}
                title="Hero"
              >
                ⚔️
              </button>
              <button 
                className={`sidebar-tab ${activePanel === 'castle' ? 'active' : ''}`}
                onClick={() => setActivePanel('castle')}
                title="Castle"
              >
                🏰
              </button>
              <button 
                className={`sidebar-tab ${activePanel === 'inventory' ? 'active' : ''}`}
                onClick={() => setActivePanel('inventory')}
                title="Inventory"
              >
                🎒
              </button>
              <button 
                className={`sidebar-tab ${activePanel === 'script' ? 'active' : ''}`}
                onClick={() => setActivePanel('script')}
                title="Script Editor"
              >
                🧪
              </button>
              <button 
                className={`sidebar-tab ${activePanel === 'epic' ? 'active' : ''}`}
                onClick={() => setActivePanel('epic')}
                title="Epic Content"
              >
                🌟
              </button>
            </div>
          </div>

          <div className="sidebar-content">
            {activePanel === 'scenario' && (
              <div className="panel-content scenario-panel">
                <div className="panel-header">
                  <h3>🏔️ Scenario</h3>
                </div>
                <div className="scenario-info">
                  <h4>{currentGame?.scenario || 'Conquest Classic'}</h4>
                  <p>Welcome to Heroes of Time!</p>
                  
                  {/* Sélecteur de mode terrain */}
                  <TerrainModeSelector 
                    currentMode={terrainMode}
                    onModeChange={setTerrainMode}
                    disabled={isLoading}
                  />
                  
                  <div className="scenario-stats">
                    <div>Turn: {currentGame?.turn || 1}</div>
                    <div>Player: {currentPlayer?.name || 'Player 1'}</div>
                    <div>Heroes: {currentPlayer?.heroes?.length || 0}</div>
                    <div>Gold: {currentPlayer?.resources?.gold || 0}</div>
                  </div>
                  
                  {/* Contrôles du jeu */}
                  <div className="game-controls">
                    <button 
                      className="end-turn-btn"
                      onClick={handleEndTurn}
                      disabled={isLoading}
                    >
                      ⭐ End Turn
                    </button>
                    <button 
                      className="test-mode-btn"
                      onClick={() => setTestMode(!testMode)}
                    >
                      🔧 Test Mode
                    </button>
                  </div>

                  {/* Goldorak Easter Egg */}
                  <div className="easter-egg-section">
                    <button
                      className="goldorak-btn"
                      onClick={() => setShowGoldorakEasterEgg(true)}
                    >
                      🚀 Goldorak Easter Egg
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {activePanel === 'hero' && (
              <EnhancedHeroPanel 
                heroes={currentPlayer?.heroes || []}
                selectedHero={selectedHero}
                onHeroSelect={selectHero}
                onHeroAction={handleHeroAction}
              />
            )}
            
            {activePanel === 'castle' && (
              <EnhancedCastlePanel 
                gameId={currentGame?.id || ''}
                playerId={currentPlayer?.id || ''}
                onAction={handleCastleAction}
              />
            )}
            
            {activePanel === 'inventory' && (
              <EnhancedInventoryPanel 
                selectedHero={selectedHero}
                onItemUse={handleInventoryAction}
              />
            )}

            {/* SCRIPT EDITOR INTÉGRÉ */}
            {activePanel === 'script' && (
              <div className="panel-content script-panel">
                <div className="panel-header">
                  <h3>🧪 Script Editor</h3>
                </div>
                <div className="script-editor-container">
                  <GameScriptTester />
                </div>
              </div>
            )}

            {/* EPIC CONTENT INTÉGRÉ */}
            {activePanel === 'epic' && (
              <div className="panel-content epic-panel">
                <div className="panel-header">
                  <h3>🌟 Epic Content</h3>
                </div>
                <div className="epic-content-container">
                  <EpicContentViewer
                    isVisible={true}
                    onClose={() => setActivePanel('scenario')}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Goldorak Easter Egg */}
      {showGoldorakEasterEgg && (
        <GoldorakEasterEgg
          isActive={showGoldorakEasterEgg}
          onClose={() => setShowGoldorakEasterEgg(false)}
        />
      )}
    </div>
  );
};

export default TrueHeroesInterface; 