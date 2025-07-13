import React, { useState, useEffect } from 'react';
import { GameMap, MapTile, TerrainType } from '../types/map';
import { createDefaultMap } from '../utils/mapGenerator';

interface MatrixGameMapProps {
  width?: number;
  height?: number;
  onTileClick?: (tile: MapTile) => void;
  onHeroClick?: (hero: any) => void;
  selectedHero?: any;
  heroes?: any[];
}

const terrainTextures: Record<TerrainType, string> = {
  grass: '/assets/tiles/grass.png',
  forest: '/assets/tiles/forest.png',
  mountain: '/assets/tiles/mountain.png',
  water: '/assets/tiles/water.png',
  desert: '/assets/tiles/desert.png',
  swamp: '/assets/tiles/swamp.png',
  castle: '/assets/tiles/grass.png', // Placeholder
  mine: '/assets/tiles/mountain.png', // Placeholder
  tower: '/assets/tiles/mountain.png', // Placeholder
  village: '/assets/tiles/grass.png', // Placeholder
};

const MatrixGameMap: React.FC<MatrixGameMapProps> = ({
  width = 20,
  height = 15,
  onTileClick,
  onHeroClick,
  selectedHero,
  heroes = []
}) => {
  const [gameMap, setGameMap] = useState<GameMap | null>(null);
  const [hoveredTile, setHoveredTile] = useState<MapTile | null>(null);

  useEffect(() => {
    // Générer une nouvelle carte
    const newMap = createDefaultMap(width, height);
    setGameMap(newMap);
  }, [width, height]);

  const getHeroAtPosition = (x: number, y: number) => {
    return heroes.find(hero => hero.position.x === x && hero.position.y === y);
  };

  const handleTileClick = (tile: MapTile) => {
    if (onTileClick) {
      onTileClick(tile);
    }
  };

  const handleTileHover = (tile: MapTile) => {
    setHoveredTile(tile);
  };

  if (!gameMap) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '400px',
        background: '#1a1a2e',
        color: 'white'
      }}>
        Génération de la carte...
      </div>
    );
  }

  return (
    <div className="matrix-game-map">
      {/* Informations de la carte */}
      <div className="map-info" style={{ 
        marginBottom: '10px', 
        padding: '10px', 
        background: 'rgba(255,255,255,0.7)', 
        borderRadius: '8px',
        color: '#b8860b',
        fontSize: '13px',
        boxShadow: '0 2px 8px #ffe06622',
        maxWidth: 400,
        textAlign: 'center'
      }}>
        <div>Carte: {gameMap.width} x {gameMap.height} • Seed: {gameMap.seed}</div>
        {hoveredTile && (
          <div style={{ marginTop: '5px', fontSize: '0.9em' }}>
            Position: ({hoveredTile.x}, {hoveredTile.y}) • 
            Terrain: {hoveredTile.terrain} • 
            Coût: {hoveredTile.movementCost} MP
            {hoveredTile.resources && hoveredTile.resources.length > 0 && 
              ` • Ressource: ${hoveredTile.resources.join(', ')}`
            }
          </div>
        )}
      </div>

      {/* Grille de la carte */}
      <div className="map-grid" style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${gameMap.width}, 1fr)`,
        gap: '6px',
        background: 'none',
        borderRadius: '18px',
        border: 'none',
        boxShadow: 'none',
        padding: 0
      }}>
        {gameMap.tiles.map((row, y) =>
          row.map((tile, x) => {
            const hero = getHeroAtPosition(x, y);
            const isSelected = selectedHero && hero && selectedHero.id === hero.id;
            return (
              <div
                key={`${x}-${y}`}
                className={`map-tile ${isSelected ? 'selected' : ''}`}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '10px',
                  background: `url(${terrainTextures[tile.terrain]}) center/cover no-repeat`,
                  boxShadow: isSelected
                    ? '0 0 0 3px #ffd700, 0 8px 32px #ffe066'
                    : '0 2px 8px #ffe06633',
                  position: 'relative',
                  cursor: 'pointer',
                  transition: 'box-shadow 0.2s, background 0.2s, filter 0.2s',
                  filter: isSelected ? 'brightness(1.1) drop-shadow(0 0 6px #ffd70088)' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onClick={() => handleTileClick(tile)}
                onMouseEnter={() => handleTileHover(tile)}
                onMouseLeave={() => setHoveredTile(null)}
              >
                {/* Héros (optionnel, à styliser plus tard) */}
                {hero && (
                  <div 
                    style={{ 
                      position: 'absolute', 
                      bottom: '2px', 
                      left: '2px',
                      cursor: 'pointer',
                      zIndex: 2
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onHeroClick) onHeroClick(hero);
                    }}
                  >
                    <div style={{
                      width: 18,
                      height: 18,
                      borderRadius: '50%',
                      background: '#ffd700cc',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      color: '#fff',
                      fontSize: 12,
                      boxShadow: '0 1px 4px #ffe06699',
                    }}>{hero.name[0]}</div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default MatrixGameMap; 