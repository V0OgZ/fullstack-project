import React, { useState, useEffect } from 'react';
import { useGameStore } from '../store/useGameStore';
import ModernGameRenderer, { ModernGameRendererRef } from './ModernGameRenderer';
import CastleManagementPanel from './CastleManagementPanel';
import './TrueHeroesInterface.css';

const TrueHeroesInterface: React.FC = () => {
  const { 
    currentGame, 
    currentPlayer, 
    loadGame, 
    endTurn, 
    selectHero, 
    selectedHero 
  } = useGameStore();
  
  const [activePanel, setActivePanel] = useState<'scenario' | 'hero' | 'inventory' | 'castle'>('scenario');
  const [rendererRef] = useState<React.RefObject<ModernGameRendererRef>>(React.createRef());

  // Load default game on component mount
  useEffect(() => {
    if (!currentGame) {
      loadGame('conquest-classic');
    }
  }, [currentGame, loadGame]);

  const handleTileClick = (position: { x: number; y: number }) => {
    console.log('Tile clicked:', position);
    // Handle tile selection logic here
  };

  const handleEndTurn = async () => {
    try {
      await endTurn();
      console.log('Turn ended successfully');
    } catch (error) {
      console.error('Error ending turn:', error);
    }
  };

  const handleHeroSelect = (hero: any) => {
    selectHero(hero);
  };

  return (
    <div className="true-heroes-interface">
      {/* Header */}
      <div className="interface-header">
        <div className="header-left">
          <h1>Heroes of Time</h1>
          <div className="game-info">
            <span>Turn: {currentGame?.turnNumber || 1}</span>
            <span>Player: {currentPlayer?.name || 'Unknown'}</span>
          </div>
        </div>
        
        <div className="header-center">
          <div className="control-buttons">
            <button 
              className={`control-btn ${activePanel === 'scenario' ? 'active' : ''}`}
              onClick={() => setActivePanel('scenario')}
              title="Scenario Info"
            >
              📋
            </button>
            <button 
              className={`control-btn ${activePanel === 'hero' ? 'active' : ''}`}
              onClick={() => setActivePanel('hero')}
              title="Hero Management"
            >
              ⚔️
            </button>
            <button 
              className={`control-btn ${activePanel === 'inventory' ? 'active' : ''}`}
              onClick={() => setActivePanel('inventory')}
              title="Inventory"
            >
              🎒
            </button>
            <button 
              className={`control-btn ${activePanel === 'castle' ? 'active' : ''}`}
              onClick={() => setActivePanel('castle')}
              title="Castle Management"
            >
              🏰
            </button>
          </div>
        </div>
        
        <div className="header-right">
          <button 
            className="end-turn-btn"
            onClick={handleEndTurn}
            title="End Turn"
          >
            ⭐
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="interface-content">
        {/* Left Panel - Game Map */}
        <div className="left-panel">
          <ModernGameRenderer
            ref={rendererRef}
            width={800}
            height={600}
            onTileClick={handleTileClick}
          />
        </div>

        {/* Right Panel - Dynamic Content */}
        <div className="right-panel">
          {activePanel === 'scenario' && (
            <div className="panel-content">
              <h2>Scenario Information</h2>
              <div className="scenario-info">
                <h3>{currentGame?.scenario?.name || 'Conquest Classic'}</h3>
                <p>{currentGame?.scenario?.description || 'A classic strategy scenario.'}</p>
                <div className="scenario-stats">
                  <div>Map Size: {currentGame?.scenario?.mapSize || 'Medium'}</div>
                  <div>Players: {currentGame?.scenario?.maxPlayers || 4}</div>
                  <div>Difficulty: {currentGame?.scenario?.difficulty || 'Normal'}</div>
                </div>
              </div>
            </div>
          )}

          {activePanel === 'hero' && (
            <div className="panel-content">
              <h2>Hero Management</h2>
              <div className="hero-list">
                {currentPlayer?.heroes?.map((hero: any) => (
                  <div 
                    key={hero.id} 
                    className={`hero-card ${selectedHero?.id === hero.id ? 'selected' : ''}`}
                    onClick={() => handleHeroSelect(hero)}
                  >
                    <div className="hero-avatar">👤</div>
                    <div className="hero-info">
                      <h4>{hero.name}</h4>
                      <p>Level {hero.level}</p>
                      <p>Class: {hero.class}</p>
                    </div>
                  </div>
                )) || <p>No heroes available</p>}
              </div>
            </div>
          )}

          {activePanel === 'inventory' && (
            <div className="panel-content">
              <h2>Inventory</h2>
              <div className="inventory-grid">
                <div className="inventory-slot">Empty</div>
                <div className="inventory-slot">Empty</div>
                <div className="inventory-slot">Empty</div>
                <div className="inventory-slot">Empty</div>
                <div className="inventory-slot">Empty</div>
                <div className="inventory-slot">Empty</div>
              </div>
            </div>
          )}

          {activePanel === 'castle' && (
            <div className="panel-content">
              <CastleManagementPanel />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrueHeroesInterface; 