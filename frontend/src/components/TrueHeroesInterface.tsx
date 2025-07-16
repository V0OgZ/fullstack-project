import React, { useState, useEffect, useRef } from 'react';
import { useGameStore } from '../store/useGameStore';
import { useTranslation } from '../i18n';
import ModernGameRenderer, { ModernGameRendererRef } from './ModernGameRenderer';
import CastleManagementPanel from './CastleManagementPanel';
import EpicContentViewer from './EpicContentViewer';
import GameScriptTester from './GameScriptTester';
import './TrueHeroesInterface.css';

interface TrueHeroesInterfaceProps {
  scenarioId?: string;
  scenarioType?: 'classique' | 'mystique' | 'multiplayer';
}

const TrueHeroesInterface: React.FC<TrueHeroesInterfaceProps> = ({ 
  scenarioId, 
  scenarioType = 'classique' 
}) => {
  const { t } = useTranslation();
  const { 
    currentGame, 
    currentPlayer, 
    loadGame, 
    endTurn, 
    selectHero, 
    selectedHero,
    isLoading,
    error,
    moveHero,
    attackTarget,
    collectResource,
    canMoveToPosition,
    refreshGameState
  } = useGameStore();
  
  const [selectedHeroId, setSelectedHeroId] = useState<string | null>(null);
  const [rightPanelContent, setRightPanelContent] = useState<'scenario' | 'hero' | 'castle' | 'script'>('scenario');
  const [showEpicContent, setShowEpicContent] = useState(false);
  const rendererRef = useRef<ModernGameRendererRef>(null);
  const [movementMode, setMovementMode] = useState(false);
  const [selectedTile, setSelectedTile] = useState<{ x: number; y: number } | null>(null);

  // Load default game on component mount
  useEffect(() => {
    if (!currentGame) {
      loadGame(scenarioId || 'conquest-classic');
    }
  }, [currentGame, loadGame, scenarioId]);

  // Handlers pour les boutons de contrôle
  const handleHeroesClick = () => {
    setRightPanelContent('hero');
  };

  const handleCastleClick = () => {
    setRightPanelContent('castle');
  };

  const handleScriptClick = () => {
    setRightPanelContent('script');
  };

  const handleTileClick = (position: { x: number; y: number }) => {
    console.log('Tile clicked:', position);
    
    // If hero is selected and in movement mode
    if (selectedHero && movementMode) {
      // Check if position is within movement range
      const canMove = canMoveToPosition(selectedHero, position);
      if (canMove) {
        handleMoveHero(position);
      } else {
        console.log('Position out of movement range');
      }
    } else {
      // Handle tile selection logic here
      setSelectedTile(position);
    }
  };

  const handleEndTurn = async () => {
    try {
      await endTurn();
      console.log('Turn ended successfully');
    } catch (error) {
      console.error('Error ending turn:', error);
    }
  };

  const handleHeroSelect = (heroId: string) => {
    setSelectedHeroId(heroId);
    const hero = currentPlayer?.heroes?.find(h => h.id === heroId);
    if (hero) {
      selectHero(hero);
    }
  };

  const handleMoveHero = async (targetPosition: { x: number; y: number }) => {
    if (selectedHero) {
      try {
        // Correction: l'API moveHero est dans le store, pas un endpoint direct
        await moveHero(selectedHero.id, targetPosition);
        setMovementMode(false); // Désactiver le mode mouvement après déplacement
        console.log('Hero moved successfully');
      } catch (error) {
        console.error('Error moving hero:', error);
      }
    }
  };

  const handleAttackTarget = async (targetId: string) => {
    if (selectedHero) {
      try {
        await attackTarget(selectedHero.id, targetId);
        console.log('Attack executed successfully');
      } catch (error) {
        console.error('Error attacking target:', error);
      }
    }
  };

  const handleCollectResource = async (objectId: string) => {
    if (selectedHero) {
      try {
        await collectResource(selectedHero.id, objectId);
        console.log('Resource collected successfully');
      } catch (error) {
        console.error('Error collecting resource:', error);
      }
    }
  };

  const handleCastSpell = async (spellId: string) => {
    if (selectedHero) {
      try {
        // TODO: Implement spell casting API call
        console.log('Casting spell:', spellId, 'with hero:', selectedHero.name);
      } catch (error) {
        console.error('Error casting spell:', error);
      }
    }
  };

  const handleRecruitUnit = async (buildingId: string, unitType: string, quantity: number) => {
    if (currentGame && currentPlayer) {
      try {
        // TODO: Implement unit recruitment API call
        console.log('Recruiting units:', unitType, 'x', quantity, 'from building:', buildingId);
      } catch (error) {
        console.error('Error recruiting units:', error);
      }
    }
  };

  const handleBuildStructure = async (buildingType: string, positionX: number, positionY: number) => {
    if (currentGame && currentPlayer) {
      try {
        // TODO: Implement structure building API call
        console.log('Building structure:', buildingType, 'at position:', positionX, positionY);
      } catch (error) {
        console.error('Error building structure:', error);
      }
    }
  };

  const handleUpgradeBuilding = async (buildingId: string) => {
    if (currentGame && currentPlayer) {
      try {
        const response = await fetch(`/api/games/${currentGame.id}/buildings/${buildingId}/upgrade`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ playerId: currentPlayer.id })
        });
        
        if (response.ok) {
          const result = await response.json();
          console.log('Building upgrade started:', result);
          // Rafraîchir les données après l'upgrade
          await refreshGameState();
        } else {
          console.error('Failed to upgrade building');
        }
      } catch (error) {
        console.error('Error upgrading building:', error);
      }
    }
  };

  const handleGetAvailableSpells = async () => {
    if (currentGame && currentPlayer) {
      try {
        const response = await fetch(`/api/games/${currentGame.id}/players/${currentPlayer.id}/spells/available`);
        const spells = await response.json();
        console.log('Available spells:', spells);
        return spells;
      } catch (error) {
        console.error('Error fetching spells:', error);
        return [];
      }
    }
    return [];
  };

  const handleGetCastleBonuses = async () => {
    if (currentGame && currentPlayer) {
      try {
        const response = await fetch(`/api/games/${currentGame.id}/players/${currentPlayer.id}/castle/bonuses`);
        const bonuses = await response.json();
        console.log('Castle bonuses:', bonuses);
        return bonuses;
      } catch (error) {
        console.error('Error fetching castle bonuses:', error);
        return {};
      }
    }
    return {};
  };

  const handleResetWeeklyGrowth = async () => {
    if (currentGame) {
      try {
        const response = await fetch(`/api/buildings/game/${currentGame.id}/reset-weekly-growth`, {
          method: 'POST'
        });
        
        if (response.ok) {
          const result = await response.json();
          console.log('Weekly growth reset:', result);
          await refreshGameState();
        } else {
          console.error('Failed to reset weekly growth');
        }
      } catch (error) {
        console.error('Error resetting weekly growth:', error);
      }
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="true-heroes-interface loading">
        <div className="loading-content">
          <div className="loading-spinner"></div>
          <h2>🎮 Heroes of Time</h2>
          <p>Loading game...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="true-heroes-interface error">
        <div className="error-content">
          <h2>❌ Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!currentGame || !currentPlayer) {
    return (
      <div className="true-heroes-interface error">
        <div className="error-content">
          <h2>No Game Data</h2>
          <p>Unable to load game state.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="true-heroes-interface">
      
      {/* Indicateur de mode de mouvement */}
      {movementMode && selectedHero && (
        <div className="movement-mode-indicator">
          🚶 Mode Déplacement - Cliquez sur une tuile pour déplacer {selectedHero.name}
          <button 
            onClick={() => setMovementMode(false)}
            style={{ 
              marginLeft: '10px', 
              background: 'rgba(255,255,255,0.2)', 
              border: 'none', 
              borderRadius: '50%',
              width: '20px',
              height: '20px',
              cursor: 'pointer',
              color: 'black'
            }}
          >
            ×
          </button>
        </div>
      )}

      {/* Header avec informations du jeu - Style BESTAGON */}
      <div className="game-header">
        <div className="header-info">
          <div className="game-title">
            <h1>Heroes of Time</h1>
            <span className="scenario-badge">{scenarioType}</span>
            {scenarioId && (
              <span className="map-name">🗺️ {scenarioId.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
            )}
          </div>
          <div className="player-info">
            <span className="player-name">{currentPlayer.name}</span>
            <div className="resources">
              <span className="gold">💰 {currentPlayer.resources?.gold || 0}</span>
              <span className="wood">🪵 {currentPlayer.resources?.wood || 0}</span>
              <span className="stone">🪨 {currentPlayer.resources?.stone || 0}</span>
            </div>
          </div>
        </div>
        
        <div className="header-controls">
          <div className="control-buttons">
            <button 
              className={`control-btn ${rightPanelContent === 'hero' ? 'active' : ''}`}
              onClick={handleHeroesClick}
              disabled={!currentPlayer?.heroes || currentPlayer.heroes.length === 0}
              title={t('tooltip.heroes')}
            >
              <span className="btn-icon">⚔️</span>
            </button>
            
            <button 
              className={`control-btn ${rightPanelContent === 'castle' ? 'active' : ''}`}
              onClick={handleCastleClick}
              title={t('tooltip.castle')}
            >
              <span className="btn-icon">🏰</span>
            </button>

            <button 
              className={`control-btn ${rightPanelContent === 'script' ? 'active' : ''}`}
              onClick={handleScriptClick}
              title="🧪 Testeur de Scripts - Automatiser les actions de jeu"
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

            <button 
              className="end-turn-btn"
              onClick={handleEndTurn}
              title={currentGame?.gameMode === 'hotseat' ? t('nextPlayer') : t('tooltip.endTurn')}
            >
              <span className="btn-icon">
                {currentGame?.gameMode === 'hotseat' ? '👤' : '⭐'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Game Area */}
      <div className="game-main">
        {/* Left side: Game Map */}
        <div className="map-container">
          <ModernGameRenderer 
            ref={rendererRef}
            width={1200} 
            height={700}
            onTileClick={handleTileClick}
          />
        </div>

        {/* Right side: Dynamic content panels - Style BESTAGON */}
        <div className="right-panel">
          
          {/* Panel Scenario */}
          {rightPanelContent === 'scenario' && (
            <div className="panel-content scenario-panel">
              <div className="panel-header">
                <h3>🏔️ Scenario Information</h3>
              </div>
              <div className="scenario-details">
                <div className="scenario-overview">
                  <div className="scenario-name">
                    <span className="scenario-icon">🎯</span>
                    <h4 className="scenario-title">{currentGame.scenario || 'Conquest Classic'}</h4>
                  </div>
                  <p>A strategic conquest scenario with advanced terrain system.</p>
                  <div className="scenario-stats">
                    <div>🎲 Seed: {currentGame.id ? currentGame.id.slice(-6) : '123456'}</div>
                    <div>🏰 Players: {currentGame.players?.length || 4}</div>
                    <div>⚔️ Difficulty: Normal</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Panel Heroes - Style BESTAGON avec détails complets */}
          {rightPanelContent === 'hero' && (
            <div className="panel-content hero-panel">
              <div className="panel-header">
                <h3>⚔️ Heroes Management</h3>
                <button 
                  className="close-panel-btn"
                  onClick={() => setRightPanelContent('scenario')}
                >
                  ×
                </button>
              </div>
              
              <div className="hero-management">
                <div className="heroes-list">
                  <h4>🎖️ Your Heroes ({currentPlayer.heroes?.length || 0})</h4>
                  <div className="heroes-grid">
                    {currentPlayer?.heroes?.map((hero: any) => (
                      <div 
                        key={hero.id}
                        className={`hero-card ${selectedHeroId === hero.id ? 'selected' : ''}`}
                        onClick={() => handleHeroSelect(hero.id)}
                      >
                        <div className="hero-portrait">
                          <div className="hero-avatar">👤</div>
                        </div>
                        <div className="hero-info">
                          <h5>{hero.name}</h5>
                          <div className="hero-level">Level {hero.level || 1}</div>
                          <div className="hero-class">{hero.class || 'Warrior'}</div>
                          <div className="hero-movement">
                            🏃 {hero.movementPoints || 1000}/{hero.maxMovementPoints || 1000}
                          </div>
                        </div>
                      </div>
                    )) || <p>No heroes available</p>}
                  </div>
                </div>

                {/* Détails du héros sélectionné - Style BESTAGON */}
                {selectedHeroId && (
                  <div className="hero-details">
                    <h4>🎯 Hero Details</h4>
                    {(() => {
                      const selectedHero = currentPlayer?.heroes?.find(h => h.id === selectedHeroId);
                      return selectedHero ? (
                        <div className="hero-detail-content">
                          <div className="hero-stats">
                            <h5>Primary Stats</h5>
                            <div className="stats-grid">
                              <div className="stat-item">
                                <span className="stat-label">Attack:</span>
                                <span className="stat-value">{selectedHero.attack || 10}</span>
                              </div>
                              <div className="stat-item">
                                <span className="stat-label">Defense:</span>
                                <span className="stat-value">{selectedHero.defense || 10}</span>
                              </div>
                              <div className="stat-item">
                                <span className="stat-label">Spell Power:</span>
                                <span className="stat-value">{selectedHero.spellPower || 5}</span>
                              </div>
                              <div className="stat-item">
                                <span className="stat-label">Knowledge:</span>
                                <span className="stat-value">{selectedHero.knowledge || 5}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="hero-equipped-items">
                            <h5>🎒 Equipped Items</h5>
                            <div className="equipped-slots">
                              <div className="equipment-slot">
                                <span className="slot-icon">⚔️</span>
                                <div className="slot-item">Magic Sword</div>
                              </div>
                              <div className="equipment-slot">
                                <span className="slot-icon">🛡️</span>
                                <div className="slot-item">Dragon Scale</div>
                              </div>
                              <div className="equipment-slot">
                                <span className="slot-icon">💍</span>
                                <div className="slot-item">Power Ring</div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="hero-actions">
                            <button 
                              className="action-button"
                              onClick={() => handleCastSpell('magic-arrow')}
                              disabled={!selectedHero}
                            >
                              🔮 Cast Spell
                            </button>
                            
                            <button 
                              className="action-button"
                              onClick={() => {
                                if (selectedHero) {
                                  console.log('Move hero:', selectedHero.name);
                                  setMovementMode(true);
                                }
                              }}
                              disabled={!selectedHero}
                            >
                              🚶 Move Hero
                            </button>
                            
                            <button 
                              className="action-button"
                              onClick={() => {
                                if (selectedHero) {
                                  handleAttackTarget('enemy-1');
                                }
                              }}
                              disabled={!selectedHero}
                            >
                              ⚔️ Attack
                            </button>
                            
                            <button 
                              className="action-button"
                              onClick={() => {
                                if (selectedHero) {
                                  handleCollectResource('resource-1');
                                }
                              }}
                              disabled={!selectedHero}
                            >
                              💎 Collect
                            </button>
                          </div>
                        </div>
                      ) : <p>No hero selected</p>;
                    })()}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Panel Castle - Style BESTAGON avec plus d'actions */}
          {rightPanelContent === 'castle' && currentGame && currentPlayer && (
            <div className="panel-content castle-panel">
              <div className="panel-header">
                <h3>🏰 Castle Management</h3>
                <button 
                  className="close-panel-btn"
                  onClick={() => setRightPanelContent('scenario')}
                >
                  ×
                </button>
              </div>
              
              <div className="castle-actions">
                <div className="action-buttons">
                  <button 
                    className="action-button" 
                    onClick={handleResetWeeklyGrowth}
                    title="Reset weekly unit growth"
                  >
                    🔄 Reset Growth
                  </button>
                  
                  <button 
                    className="action-button" 
                    onClick={async () => {
                      const bonuses = await handleGetCastleBonuses();
                      alert(`Castle Bonuses:\n${JSON.stringify(bonuses, null, 2)}`);
                    }}
                    title="View castle bonuses"
                  >
                    ⭐ View Bonuses
                  </button>
                  
                  <button 
                    className="action-button" 
                    onClick={async () => {
                      const spells = await handleGetAvailableSpells();
                      alert(`Available Spells:\n${JSON.stringify(spells, null, 2)}`);
                    }}
                    title="View available spells"
                  >
                    🔮 View Spells
                  </button>
                </div>
              </div>
              
              <CastleManagementPanel 
                gameId={currentGame.id}
                playerId={currentPlayer.id}
                onClose={() => setRightPanelContent('scenario')}
              />
            </div>
          )}

          {/* Panel Script Tester */}
          {rightPanelContent === 'script' && (
            <div className="panel-content script-panel">
              <div className="panel-header">
                <h3>🧪 Script Tester</h3>
                <button 
                  className="close-panel-btn"
                  onClick={() => setRightPanelContent('scenario')}
                >
                  ×
                </button>
              </div>
              
              <div className="script-tester-container">
                <GameScriptTester />
              </div>
            </div>
          )}
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