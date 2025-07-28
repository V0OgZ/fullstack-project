import React, { useMemo } from 'react';
import { Tile, Hero, Creature, Structure } from '../types/game';
import { HexTile, BiomeType } from '../types/terrain';
import ModernGameRenderer from './ModernGameRenderer';
import OrganicTerrainRenderer from './OrganicTerrainRenderer';
import { TerrainMode } from './TerrainModeSelector';

interface TerrainRendererWrapperProps {
  mode: TerrainMode;
  
  // Données d'entrée
  map: Tile[][];
  heroes: Hero[];
  creatures: Creature[];
  structures: Structure[];
  
  // État UI
  selectedHero?: Hero | null;
  validMoves?: { x: number; y: number }[];
  validTargets?: { x: number; y: number }[];
  
  // Callbacks
  onTileClick?: (x: number, y: number) => void;
  onHeroClick?: (hero: Hero) => void;
  
  // Configuration
  width?: number;
  height?: number;
  currentPlayer?: string;
  showFog?: boolean;
  showGrid?: boolean;
  showElevation?: boolean;
  showTransitions?: boolean;
}

// Conversion Tile[][] vers HexTile[] pour PIXI.js
const convertTilesToHexTiles = (map: Tile[][]): HexTile[] => {
  const hexTiles: HexTile[] = [];
  
  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[row].length; col++) {
      const tile = map[row][col];
      if (!tile) continue;
      
      // Conversion terrain vers BiomeType
      let biome: BiomeType = 'grass';
      switch (tile.terrain?.toLowerCase()) {
        case 'water': biome = 'water'; break;
        case 'forest': biome = 'forest'; break;
        case 'mountain': biome = 'mountain'; break;
        case 'desert': biome = 'desert'; break;
        case 'swamp': biome = 'swamp'; break;
        case 'snow': biome = 'snow'; break;
        case 'lava': biome = 'lava'; break;
        case 'crystal': biome = 'crystal'; break;
        case 'corruption': biome = 'corruption'; break;
        default: biome = 'grass'; break;
      }
      
      // Conversion coordinates vers axiales (odd-q vertical layout)
      const q = col;
      const r = row - Math.floor(col / 2);
      
      hexTiles.push({
        q,
        r,
        biome,
        elevation: tile.elevation || 50,
        humidity: tile.moistureLevel ? tile.moistureLevel * 100 : 50,
        riverFlowDir: undefined,
        naturalBarrier: !tile.walkable,
        
        // Propriétés calculées
        groupId: 0,
        distanceToEdge: 0,
        spriteId: `${biome}_${q}_${r}`,
        gradientDir: { dx: 0, dy: 0 }
      });
    }
  }
  
  return hexTiles;
};

const TerrainRendererWrapper: React.FC<TerrainRendererWrapperProps> = ({
  mode,
  map,
  heroes,
  creatures,
  structures,
  selectedHero,
  validMoves,
  validTargets,
  onTileClick,
  onHeroClick,
  width = 800,
  height = 600,
  currentPlayer,
  showFog = false,
  showGrid = true,
  showElevation = true,
  showTransitions = true
}) => {
  // Conversion des données pour PIXI.js
  const hexTiles = useMemo(() => convertTilesToHexTiles(map), [map]);
  
  // Conversion du callback tile click pour PIXI.js
  const handlePixiTileClick = (hexTile: HexTile) => {
    if (onTileClick) {
      // Conversion coordonnées axiales vers x,y
      const col = hexTile.q;
      const row = hexTile.r + Math.floor(hexTile.q / 2);
      onTileClick(col, row);
    }
  };
  
  // Conversion du callback hover pour PIXI.js
  const handlePixiTileHover = (hexTile: HexTile | null) => {
    // Pour l'instant, pas de gestion hover spécifique
    // Peut être ajouté plus tard si nécessaire
  };
  
  if (mode === 'canvas2d') {
    return (
      <ModernGameRenderer
        map={map}
        heroes={heroes}
        creatures={creatures}
        structures={structures}
        selectedHero={selectedHero}
        validMoves={validMoves}
        validTargets={validTargets}
        onTileClick={onTileClick}
        onHeroClick={onHeroClick}
        width={width}
        height={height}
        currentPlayer={currentPlayer}
        showFog={showFog}
        showGrid={showGrid}
        showElevation={showElevation}
        showTransitions={showTransitions}
      />
    );
  } else {
    return (
      <OrganicTerrainRenderer
        width={width}
        height={height}
        tiles={hexTiles}
        onTileClick={handlePixiTileClick}
        onTileHover={handlePixiTileHover}
      />
    );
  }
};

export default TerrainRendererWrapper; 