import React, { useMemo } from 'react';
import { useGameStore } from '../store/useGameStore';
import { getTerrainAsset, TERRAIN_TYPES } from '../constants/assets';
import './HoMM3Map.css';

interface HexTileProps {
  x: number;
  y: number;
  terrainType: string;
  isSelected: boolean;
  hasHero: boolean;
  hasCreature: boolean;
  onClick: () => void;
}

const HexTile: React.FC<HexTileProps> = ({
  x,
  y,
  terrainType,
  isSelected,
  hasHero,
  hasCreature,
  onClick
}) => {
  const terrainAsset = `/assets/tiles/${terrainType}.png`;
  
  // Calculate hex position
  const hexSize = 60;
  const hexWidth = hexSize * 2;
  const hexHeight = Math.sqrt(3) * hexSize;
  const horizontalSpacing = hexWidth * 0.75;
  const verticalSpacing = hexHeight;
  
  const left = x * horizontalSpacing + (y % 2) * (horizontalSpacing / 2);
  const top = y * verticalSpacing * 0.85;

  return (
    <div
      className={`hex-tile ${isSelected ? 'selected' : ''} ${hasHero ? 'has-hero' : ''} ${hasCreature ? 'has-creature' : ''}`}
      style={{
        left: `${left}px`,
        top: `${top}px`,
        width: `${hexWidth}px`,
        height: `${hexHeight}px`,
        backgroundImage: `url(${terrainAsset})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      onClick={onClick}
    >
      <div className="hex-content">
        {hasHero && <div className="hero-indicator">⚔️</div>}
        {hasCreature && <div className="creature-indicator">🐉</div>}
      </div>
    </div>
  );
};

const HoMM3Map: React.FC = () => {
  const { map, selectedTile, setSelectedTile, currentPlayerNumber } = useGameStore();

  const mapSize = useMemo(() => {
    if (!map || map.length === 0) return { width: 0, height: 0 };
    return { width: map[0].length, height: map.length };
  }, [map]);

  const handleTileClick = (x: number, y: number) => {
    setSelectedTile({ x, y });
  };

  if (!map || map.length === 0) {
    return (
      <div className="homm3-map-container">
        <div className="loading-message">Generating map...</div>
      </div>
    );
  }

  return (
    <div className="homm3-map-container">
      <div className="map-grid">
        {map.map((row, y) =>
          row.map((tile, x) => (
            <HexTile
              key={`${x}-${y}`}
              x={x}
              y={y}
              terrainType={tile.terrain}
              isSelected={selectedTile?.x === x && selectedTile?.y === y}
              hasHero={tile.hero !== null}
              hasCreature={tile.creature !== null}
              onClick={() => handleTileClick(x, y)}
            />
          ))
        )}
      </div>
      
      {/* Map overlay for UI elements */}
      <div className="map-overlay">
        <div className="player-info">
          <div className="player-turn">
            Player {currentPlayerNumber}'s Turn
          </div>
        </div>
        
        {selectedTile && (
          <div className="tile-info">
            <div className="info-panel">
              <h3>Tile Information</h3>
              <p>Position: ({selectedTile.x}, {selectedTile.y})</p>
              <p>Terrain: {map[selectedTile.y][selectedTile.x].terrain}</p>
              {map[selectedTile.y][selectedTile.x].hero && (
                <p>Hero: {map[selectedTile.y][selectedTile.x].hero?.name}</p>
              )}
              {map[selectedTile.y][selectedTile.x].creature && (
                <p>Creature: {map[selectedTile.y][selectedTile.x].creature?.name}</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HoMM3Map; 