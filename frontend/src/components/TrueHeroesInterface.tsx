import React, { useState, useEffect } from 'react';
import { useTranslation } from '../i18n';
import { useGameStore } from '../store/useGameStore';
import ModernGameRenderer from './ModernGameRenderer';
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
  const [rightPanelContent, setRightPanelContent] = useState<'empty' | 'hero' | 'inventory' | 'castle'>('empty');

  const handleHeroSelect = (heroId: string | null) => {
    setSelectedHeroId(heroId);
    if (heroId) {
      setRightPanelContent('hero');
    } else {
      setRightPanelContent('empty');
    }
  };

  const handleInventoryClick = () => {
    setRightPanelContent('inventory');
  };

  const handleCastleClick = () => {
    setRightPanelContent('castle');
  };

  const handleCastleSelect = (castleId: string) => {
    setSelectedCastleId(castleId);
    // Keep castle content but could show castle details
  };

  const selectedHero = currentPlayer?.heroes?.find(hero => hero.id === selectedHeroId);

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
              onClick={() => selectedHero ? setRightPanelContent('hero') : null}
              disabled={!selectedHero}
              title={selectedHero ? `Show ${selectedHero.name}` : 'Select a hero first'}
            >
              <span className="btn-icon">⚔️</span>
              <span className="btn-label">Heroes</span>
            </button>
            
            <button 
              className={`control-btn ${rightPanelContent === 'inventory' ? 'active' : ''}`}
              onClick={handleInventoryClick}
            >
              <span className="btn-icon">🎒</span>
              <span className="btn-label">Inventory</span>
            </button>
            
            <button 
              className={`control-btn ${rightPanelContent === 'castle' ? 'active' : ''}`}
              onClick={handleCastleClick}
            >
              <span className="btn-icon">🏰</span>
              <span className="btn-label">Castle</span>
            </button>

            <button 
              className="control-btn disabled"
              disabled
              title="AI features coming soon"
            >
              <span className="btn-icon">🤖</span>
              <span className="btn-label">AI</span>
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
          />
        </div>

        {/* Right side: Dynamic Panel */}
        <div className={`right-panel ${rightPanelContent !== 'empty' ? 'visible' : 'hidden'}`}>
          {rightPanelContent === 'hero' && selectedHero && (
            <div className="panel-content hero-panel">
              <div className="panel-header">
                <h3>⚔️ {selectedHero.name}</h3>
                <button 
                  className="close-panel-btn"
                  onClick={() => setRightPanelContent('empty')}
                >
                  ×
                </button>
              </div>
              
              <div className="hero-details">
                <div className="hero-portrait">
                  <div className="hero-image">
                    {selectedHero.name === 'Arthur' && '👑'}
                    {selectedHero.name === 'Merlin' && '🧙'}
                    {selectedHero.name === 'Lancelot' && '⚔️'}
                    {selectedHero.name.toLowerCase().includes('mage') && '🔮'}
                    {selectedHero.name.toLowerCase().includes('warrior') && '🛡️'}
                    {selectedHero.name.toLowerCase().includes('archer') && '🏹'}
                    {!['Arthur', 'Merlin', 'Lancelot'].includes(selectedHero.name) && 
                     !selectedHero.name.toLowerCase().includes('mage') && 
                     !selectedHero.name.toLowerCase().includes('warrior') && 
                     !selectedHero.name.toLowerCase().includes('archer') && '⚔️'}
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
                  onClick={() => setRightPanelContent('empty')}
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
                  onClick={() => setRightPanelContent('empty')}
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

      {/* Turn End Button */}
      <div className="game-footer">
        <button 
          className="end-turn-btn"
          onClick={endTurn}
        >
          🔄 End Turn
        </button>
      </div>
    </div>
  );
};

export default TrueHeroesInterface; 