import React, { useState, useEffect, useRef } from 'react';
import { useGameStore } from '../store/useGameStore';
import OrganicTerrainRenderer from './OrganicTerrainRenderer';
import CastleManagementPanel from './CastleManagementPanel';
import GoldorakEasterEgg from './GoldorakEasterEgg';
import { useRetroKonami } from '../utils/retro-konami';
import { HexTile, BiomeType } from '../types/terrain';
import './TrueHeroesInterface.css';

// Simple hash function for string
const hashCode = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
};

const TrueHeroesInterface: React.FC = () => {
  const { 
    currentGame, 
    currentPlayer, 
    loadGame, 
    endTurn, 
    selectHero, 
    selectedHero,
    map
  } = useGameStore();
  
  const [activePanel, setActivePanel] = useState<'scenario' | 'hero' | 'inventory' | 'castle'>('scenario');
  const [showGoldorakEasterEgg, setShowGoldorakEasterEgg] = useState(false);
  const { startListening, stopListening } = useRetroKonami();

  // Load default game on component mount
  useEffect(() => {
    if (!currentGame) {
      loadGame('conquest-classic');
    }
    
    // Easter egg hint
    console.log('🚀 [RETRO CODEUR] Tapez G-O-L-D-O-R-A-K pour activer le FULGOROCURSOR!');
  }, [currentGame, loadGame]);

  // Système de codes rétro - Écouter les événements custom
  useEffect(() => {
    // Démarrer l'écoute des codes rétro
    startListening();
    
    // Écouter l'événement Goldorak
    const handleGoldorakActivated = (event: CustomEvent) => {
      console.log('🚀 GOLDORAK EVENT RECEIVED:', event.detail.message);
      setShowGoldorakEasterEgg(true);
    };

    window.addEventListener('goldorak-activated', handleGoldorakActivated as EventListener);
    
    return () => {
      stopListening();
      window.removeEventListener('goldorak-activated', handleGoldorakActivated as EventListener);
    };
  }, [startListening, stopListening]);

  // Convert backend map data to HexTile format
  const convertToHexTiles = (backendMap: any[][]): HexTile[] => {
    const hexTiles: HexTile[] = [];
    
    if (!backendMap || !Array.isArray(backendMap)) return hexTiles;
    
    for (let row = 0; row < backendMap.length; row++) {
      for (let col = 0; col < backendMap[row].length; col++) {
        const tile = backendMap[row][col];
        if (tile) {
          // Convert backend terrain types to BiomeType
          let biome: BiomeType = 'grass';
          switch (tile.terrain?.toLowerCase()) {
            case 'water': biome = 'water'; break;
            case 'forest': biome = 'forest'; break;
            case 'mountain': biome = 'mountain'; break;
            case 'desert': biome = 'desert'; break;
            case 'swamp': biome = 'swamp'; break;
            case 'snow': biome = 'snow'; break;
            default: biome = 'grass'; break;
          }
          
          // Convert row/col to hex coordinates (odd-q vertical layout)
          const q = col;
          const r = row - Math.floor(col / 2);
          
          hexTiles.push({
            q,
            r,
            biome,
            elevation: tile.elevation || Math.random() * 100,
            humidity: tile.humidity || Math.random() * 100,
            riverFlowDir: tile.riverFlowDir,
            naturalBarrier: tile.naturalBarrier || false
          });
        }
      }
    }
    
    console.log('🗺️ [TrueHeroesInterface] Converted', hexTiles.length, 'tiles to hex format');
    return hexTiles;
  };

  const hexTiles = convertToHexTiles(map);

  const handleTileClick = (tile: HexTile) => {
    console.log('🎯 Hex tile clicked:', tile);
    // Handle tile selection logic here
  };

  const handleTileHover = (tile: HexTile | null) => {
    console.log('🖱️ Hex tile hovered:', tile);
    // Handle tile hover logic here
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
      <div className="interface-header game-header">
        <div className="header-left">
          <h1>🎮 Heroes of Time ⚔️</h1>
          <div className="game-info">
            <span>Turn: {currentGame?.turn || 1}</span>
            <span>Player: {currentPlayer?.name || 'Unknown'}</span>
            <span>Map: {hexTiles.length} tiles</span>
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
          <OrganicTerrainRenderer
            width={900}
            height={700}
            tiles={hexTiles}
            onTileClick={handleTileClick}
            onTileHover={handleTileHover}
          />
        </div>

        {/* Right Panel - Dynamic Content */}
        <div className="right-panel">
          {activePanel === 'scenario' && (
            <div className="panel-content">
              <h2>🏔️ Terrain System</h2>
              <div className="scenario-info">
                <h3>{currentGame?.scenario || 'Conquest Classic'}</h3>
                <p>🎯 <strong>Nouveau système de terrain hexagonal avancé</strong></p>
                <div className="scenario-stats">
                  <div>🗺️ Tiles: {hexTiles.length}</div>
                                      <div>🎲 Seed: {currentGame?.id ? hashCode(currentGame.id) : 12345}</div>
                  <div>🌍 Biomes: {new Set(hexTiles.map(t => t.biome)).size}</div>
                  <div>🏰 Players: {currentGame?.players?.length || 4}</div>
                </div>
                <div className="terrain-legend">
                  <h4>🌈 Biomes disponibles:</h4>
                  <div className="biome-list">
                    {Array.from(new Set(hexTiles.map(t => t.biome))).map(biome => (
                      <div key={biome} className="biome-item">
                        {biome === 'forest' && '🌲'} 
                        {biome === 'water' && '🌊'} 
                        {biome === 'mountain' && '⛰️'} 
                        {biome === 'desert' && '🏜️'} 
                        {biome === 'grass' && '🌱'} 
                        {biome === 'swamp' && '🐸'} 
                        {biome === 'snow' && '❄️'} 
                        {biome}
                      </div>
                    ))}
                  </div>
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
              <CastleManagementPanel 
                gameId={currentGame?.id || ''}
                playerId={currentPlayer?.id || ''}
                onClose={() => setActivePanel('scenario')}
              />
            </div>
          )}
        </div>
      </div>

      {/* 🚀 GOLDORAK EASTER EGG - Tapez G-O-L-D-O-R-A-K pour l'activer! */}
      <GoldorakEasterEgg 
        isActive={showGoldorakEasterEgg} 
        onClose={() => setShowGoldorakEasterEgg(false)} 
      />
    </div>
  );
};

export default TrueHeroesInterface; 