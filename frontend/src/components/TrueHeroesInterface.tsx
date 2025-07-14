import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from '../i18n';
import { useGameStore } from '../store/useGameStore';
import ModernGameRenderer, { ModernGameRendererRef } from './ModernGameRenderer';
import { HERO_ASSETS } from '../constants/gameAssets';
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
  
  const [selectedHeroId, setSelectedHeroId] = useState<string | null>(null);
  const [selectedCastleId, setSelectedCastleId] = useState<string | null>(null);
  const [rightPanelContent, setRightPanelContent] = useState<'scenario' | 'hero' | 'inventory' | 'castle'>('scenario');
  const mapRendererRef = useRef<ModernGameRendererRef>(null);

  const handleHeroSelect = (heroId: string | null) => {
    setSelectedHeroId(heroId);
    if (heroId) {
      setRightPanelContent('hero');
    } else {
      setRightPanelContent('scenario');
    }
  };

  const handleInventoryClick = () => {
    setRightPanelContent('inventory');
  };

  const handleHeroesClick = () => {
    if (!currentPlayer?.heroes || currentPlayer.heroes.length === 0) {
      // Si pas de héros, garder le panneau scénario avec les infos de map
      setRightPanelContent('scenario');
      setSelectedHeroId(null);
      return;
    }

    let targetHero;

    // Si aucun héros n'est sélectionné, sélectionner le premier
    if (!selectedHeroId) {
      targetHero = currentPlayer.heroes[0];
    } else {
      // Sinon, cycler au héros suivant
      const currentIndex = currentPlayer.heroes.findIndex(hero => hero.id === selectedHeroId);
      const nextIndex = (currentIndex + 1) % currentPlayer.heroes.length;
      targetHero = currentPlayer.heroes[nextIndex];
    }

    setSelectedHeroId(targetHero.id);
    setRightPanelContent('hero');

    // Centrer la carte sur le héros (sera implémenté dans ModernGameRenderer)
    if (mapRendererRef.current && mapRendererRef.current.centerOnPosition) {
      mapRendererRef.current.centerOnPosition(targetHero.position);
    }
  };

  const handleCastleClick = () => {
    setRightPanelContent('castle');
  };

  const handleCastleSelect = (castleId: string) => {
    setSelectedCastleId(castleId);
    // Keep castle content but could show castle details
  };

  const selectedHero = currentPlayer?.heroes?.find(hero => hero.id === selectedHeroId);

  // Fonction pour obtenir l'image du héros
  const getHeroImage = (heroName: string): string => {
    const name = heroName.toLowerCase();
    if (name.includes('arthur') || name.includes('knight')) {
      return HERO_ASSETS.KNIGHT;
    } else if (name.includes('merlin') || name.includes('mage') || name.includes('wizard')) {
      return HERO_ASSETS.MAGE;
    } else if (name.includes('lancelot') || name.includes('warrior')) {
      return HERO_ASSETS.WARRIOR;
    } else if (name.includes('archer') || name.includes('bow')) {
      return HERO_ASSETS.ARCHER;
    } else if (name.includes('paladin')) {
      return HERO_ASSETS.PALADIN;
    } else if (name.includes('necromancer')) {
      return HERO_ASSETS.NECROMANCER;
    } else {
      // Défaut basé sur la classe du héros s'il en a une
      return HERO_ASSETS.WARRIOR;
    }
  };

  // Fonction pour obtenir l'emoji de fallback
  const getHeroEmoji = (heroName: string): string => {
    const name = heroName.toLowerCase();
    if (name.includes('arthur')) return '👑';
    if (name.includes('merlin')) return '🧙';
    if (name.includes('lancelot')) return '⚔️';
    if (name.includes('mage')) return '🔮';
    if (name.includes('warrior')) return '🛡️';
    if (name.includes('archer')) return '🏹';
    if (name.includes('paladin')) return '✨';
    if (name.includes('necromancer')) return '💀';
    return '⚔️';
  };

  if (isLoading) {
    return (
      <div className="true-heroes-interface loading">
        <div className="loading-content">
          <div className="loading-spinner"></div>
          <p>Loading {scenarioType} scenario...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="true-heroes-interface error">
        <div className="error-content">
          <h2>Error Loading Game</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
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
      {/* Header avec informations du jeu */}
      <div className="game-header">
        <div className="header-info">
          <div className="game-title">
            <h1>Heroes of Time</h1>
            <span className="scenario-badge">{scenarioType}</span>
          </div>
          <div className="player-info">
            <span className="player-name">{currentPlayer.username}</span>
            <div className="resources">
              <span className="gold">💰 {currentPlayer.resources?.gold || 0}</span>
              <span className="wood">🪵 {currentPlayer.resources?.wood || 0}</span>
              <span className="stone">🪨 {currentPlayer.resources?.stone || 0}</span>
            </div>
          </div>
        </div>
        
        <div className="header-controls">
          {/* Control buttons simplified */}
          <div className="control-buttons">
            <button 
              className={`control-btn ${rightPanelContent === 'hero' ? 'active' : ''}`}
              onClick={handleHeroesClick}
              disabled={!currentPlayer?.heroes || currentPlayer.heroes.length === 0}
              title="Heroes"
            >
              <span className="btn-icon">⚔️</span>
            </button>
            
            <button 
              className={`control-btn ${rightPanelContent === 'inventory' ? 'active' : ''}`}
              onClick={handleInventoryClick}
              title="Inventory"
            >
              <span className="btn-icon">🎒</span>
            </button>
            
            <button 
              className={`control-btn ${rightPanelContent === 'castle' ? 'active' : ''}`}
              onClick={handleCastleClick}
              title="Castle"
            >
              <span className="btn-icon">🏰</span>
            </button>

            <button 
              className="end-turn-btn"
              onClick={() => {
                try {
                  endTurn();
                } catch (error) {
                  console.error('Error ending turn:', error);
                }
              }}
              title="End Turn"
            >
              <span className="btn-icon">🌟</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Game Area */}
      <div className="game-main">
        {/* Left side: Game Map */}
        <div className="map-container">
          <ModernGameRenderer 
            width={1200} 
            height={800} 
            onTileClick={(position) => {
              // Handle tile clicks for hero selection and movement
              console.log('Tile clicked:', position);
              
              // Check if there's a hero at this position
              const heroAtPosition = currentPlayer?.heroes?.find(hero => 
                hero.position.x === position.x && hero.position.y === position.y
              );
              
              if (heroAtPosition) {
                // Select the hero and show hero panel
                handleHeroSelect(heroAtPosition.id);
              } else if (selectedHero) {
                // Move selected hero to this position (future implementation)
                console.log(`Moving ${selectedHero.name} to`, position);
              }
            }}
            ref={mapRendererRef}
          />
        </div>

        {/* Right side: Dynamic Panel */}
        <div className="right-panel visible">
          {rightPanelContent === 'scenario' && (
            <div className="panel-content scenario-panel">
              <div className="panel-header">
                <h3>🎮 Scenario Info</h3>
              </div>
              
              <div className="scenario-details">
                <div className="scenario-overview">
                  <div className="scenario-name">
                    <span className="scenario-icon">🏰</span>
                    <span className="scenario-title">Conquest Classic</span>
                  </div>
                  <div className="scenario-type">
                    <span className="type-badge">{scenarioType}</span>
                  </div>
                </div>

                <div className="game-info">
                  <div className="info-item">
                    <span className="info-label">🎯 Turn:</span>
                    <span className="info-value">{currentGame?.currentTurn || 1}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">👑 Current Player:</span>
                    <span className="info-value">{currentPlayer?.username}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">🌍 Map Size:</span>
                    <span className="info-value">20x20</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">⚔️ Game Mode:</span>
                    <span className="info-value">{currentGame?.gameMode || 'Standard'}</span>
                  </div>
                </div>

                <div className="objectives">
                  <h4>🎯 Objectives</h4>
                  <div className="objective-item">
                    <span className="objective-icon">🏆</span>
                    <span className="objective-text">Defeat all enemy heroes</span>
                  </div>
                  <div className="objective-item">
                    <span className="objective-icon">🏰</span>
                    <span className="objective-text">Capture all enemy castles</span>
                  </div>
                  <div className="objective-item">
                    <span className="objective-icon">💎</span>
                    <span className="objective-text">Collect rare artifacts</span>
                  </div>
                </div>

                <div className="quick-stats">
                  <h4>📊 Quick Stats</h4>
                  <div className="stats-grid">
                    <div className="stat-card">
                      <div className="stat-icon">⚔️</div>
                      <div className="stat-info">
                        <div className="stat-number">{currentPlayer?.heroes?.length || 0}</div>
                        <div className="stat-label">Heroes</div>
                      </div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-icon">🏰</div>
                      <div className="stat-info">
                        <div className="stat-number">1</div>
                        <div className="stat-label">Castles</div>
                      </div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-icon">🏗️</div>
                      <div className="stat-info">
                        <div className="stat-number">4</div>
                        <div className="stat-label">Buildings</div>
                      </div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-icon">💰</div>
                      <div className="stat-info">
                        <div className="stat-number">{currentPlayer?.resources?.gold || 0}</div>
                        <div className="stat-label">Gold</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {rightPanelContent === 'hero' && selectedHero && (
            <div className="panel-content hero-panel">
              <div className="panel-header">
                <h3>⚔️ {selectedHero.name}</h3>
                <button 
                  className="close-panel-btn"
                  onClick={() => setRightPanelContent('scenario')}
                >
                  ×
                </button>
              </div>
              
              <div className="hero-details">
                <div className="hero-portrait">
                  <div className="hero-image">
                    <img 
                      src={getHeroImage(selectedHero.name)} 
                      alt={selectedHero.name}
                      className="hero-portrait-img"
                      onError={(e) => {
                        // Fallback simple avec emoji
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentNode as HTMLElement;
                        if (parent && !parent.querySelector('.hero-emoji-fallback')) {
                          const fallback = document.createElement('div');
                          fallback.className = 'hero-emoji-fallback';
                          fallback.textContent = getHeroEmoji(selectedHero.name);
                          parent.appendChild(fallback);
                        }
                      }}
                      onLoad={(e) => {
                        // S'assurer que l'emoji fallback est retiré si l'image charge
                        const target = e.target as HTMLImageElement;
                        const parent = target.parentNode as HTMLElement;
                        const fallback = parent?.querySelector('.hero-emoji-fallback');
                        if (fallback) {
                          fallback.remove();
                        }
                        target.style.display = 'block';
                      }}
                    />
                  </div>
                  <div className="hero-basic-info">
                    <div className="hero-name">{selectedHero.name}</div>
                    <div className="hero-level">Level {selectedHero.level}</div>
                    <div className="hero-position">📍 ({selectedHero.position.x}, {selectedHero.position.y})</div>
                  </div>
                </div>

                <div className="hero-stats">
                  <div className="stat-item">
                    <span className="stat-label">⚔️ Attack:</span>
                    <span className="stat-value">{selectedHero.stats?.attack || 10}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">🛡️ Defense:</span>
                    <span className="stat-value">{selectedHero.stats?.defense || 10}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">🏃 Movement:</span>
                    <span className="stat-value">{selectedHero.movementPoints}/{selectedHero.maxMovementPoints}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">🔮 Spell Power:</span>
                    <span className="stat-value">{selectedHero.stats?.spellPower || 5}</span>
                  </div>
                </div>

                <div className="hero-troops">
                  <h4>🏺 Army</h4>
                  <div className="troops-list">
                    {selectedHero.units && selectedHero.units.length > 0 ? (
                      selectedHero.units.map((unit, index) => (
                        <div key={index} className="troop-item">
                          <span className="troop-icon">🏇</span>
                          <span className="troop-name">{unit.name || 'Soldiers'}</span>
                          <span className="troop-count">×{unit.quantity || 10}</span>
                        </div>
                      ))
                    ) : (
                      <div className="no-troops">No army recruited</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {rightPanelContent === 'inventory' && (
            <div className="panel-content inventory-panel">
              <div className="panel-header">
                <h3>🎒 Equipped Items</h3>
                <button 
                  className="close-panel-btn"
                  onClick={() => setRightPanelContent('scenario')}
                >
                  ×
                </button>
              </div>
              
              <div className="equipped-items">
                <div className="equipment-slots">
                  <div className="equipment-slot">
                    <div className="slot-icon">⚔️</div>
                    <div className="slot-label">Weapon</div>
                    <div className="slot-item">Magic Sword</div>
                  </div>
                  <div className="equipment-slot">
                    <div className="slot-icon">🛡️</div>
                    <div className="slot-label">Armor</div>
                    <div className="slot-item">Dragon Scale</div>
                  </div>
                  <div className="equipment-slot">
                    <div className="slot-icon">💍</div>
                    <div className="slot-label">Ring</div>
                    <div className="slot-item">Power Ring</div>
                  </div>
                  <div className="equipment-slot">
                    <div className="slot-icon">👑</div>
                    <div className="slot-label">Helmet</div>
                    <div className="slot-item">Crown of Wisdom</div>
                  </div>
                </div>
                
                <div className="inventory-stats">
                  <h4>📊 Bonuses</h4>
                  <div className="bonus-item">+15 Attack</div>
                  <div className="bonus-item">+12 Defense</div>
                  <div className="bonus-item">+8 Spell Power</div>
                  <div className="bonus-item">+200 Movement</div>
                </div>
              </div>
            </div>
          )}

          {rightPanelContent === 'castle' && (
            <div className="panel-content castle-panel">
              <div className="panel-header">
                <h3>🏰 Your Castles</h3>
                <button 
                  className="close-panel-btn"
                  onClick={() => setRightPanelContent('scenario')}
                >
                  ×
                </button>
              </div>
              
              <div className="castles-list">
                <div className="castle-item">
                  <div className="castle-icon">🏰</div>
                  <div className="castle-info">
                    <div className="castle-name">Main Castle</div>
                    <div className="castle-details">
                      <span>📍 (2, 3)</span>
                      <span>🏗️ 5 Buildings</span>
                    </div>
                  </div>
                  <button className="castle-manage-btn">Manage</button>
                </div>
                
                <div className="castle-construction">
                  <h4>🔨 Available Buildings</h4>
                  <div className="building-item">
                    <span className="building-icon">🏬</span>
                    <span className="building-name">Marketplace</span>
                    <span className="building-cost">💰 500</span>
                  </div>
                  <div className="building-item">
                    <span className="building-icon">🏭</span>
                    <span className="building-name">Barracks</span>
                    <span className="building-cost">💰 750</span>
                  </div>
                  <div className="building-item">
                    <span className="building-icon">🗼</span>
                    <span className="building-name">Mage Tower</span>
                    <span className="building-cost">💰 1000</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrueHeroesInterface; 