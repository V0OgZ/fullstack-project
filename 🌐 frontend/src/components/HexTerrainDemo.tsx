import React, { useState, useEffect, useMemo } from 'react';
import HexTerrainRenderer from './HexTerrainRenderer';
import { HexTile, BiomeType, RiverDirection } from '../types/terrain';
import { HexUtils } from '../utils/terrainEngine';

interface HexTerrainDemoProps {
  className?: string;
}

const HexTerrainDemo: React.FC<HexTerrainDemoProps> = ({ className }) => {
  const [seed, setSeed] = useState(12345);
  const [mapSize, setMapSize] = useState(20);
  const [selectedTile, setSelectedTile] = useState<HexTile | null>(null);
  const [hoveredTile, setHoveredTile] = useState<HexTile | null>(null);

  // Générer des données de test
  const testTiles = useMemo(() => {
    return generateTestTerrain(mapSize, seed);
  }, [mapSize, seed]);

  const handleTileClick = (tile: HexTile) => {
    setSelectedTile(tile);
    console.log('🎯 Tile clicked:', tile);
  };

  const handleTileHover = (tile: HexTile | null) => {
    setHoveredTile(tile);
  };

  const handleNewSeed = () => {
    setSeed(Math.floor(Math.random() * 100000));
  };

  const handleSizeChange = (newSize: number) => {
    setMapSize(Math.max(10, Math.min(50, newSize)));
  };

  return (
    <div className={`hex-terrain-demo ${className || ''}`}>
      <div className="demo-header" style={{ 
        padding: '20px', 
        backgroundColor: '#f8f9fa', 
        borderBottom: '1px solid #dee2e6',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '15px',
        alignItems: 'center'
      }}>
        <h2 style={{ margin: 0, color: '#495057' }}>🗺️ Hex Terrain System Demo</h2>
        
        <div className="demo-controls" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <label style={{ fontSize: '14px', fontWeight: 'bold' }}>
            Seed:
            <input
              type="number"
              value={seed}
              onChange={(e) => setSeed(parseInt(e.target.value) || 12345)}
              style={{ 
                marginLeft: '5px', 
                width: '80px', 
                padding: '4px',
                borderRadius: '4px',
                border: '1px solid #ced4da'
              }}
            />
          </label>
          
          <label style={{ fontSize: '14px', fontWeight: 'bold' }}>
            Size:
            <input
              type="range"
              min="10"
              max="50"
              value={mapSize}
              onChange={(e) => handleSizeChange(parseInt(e.target.value))}
              style={{ marginLeft: '5px', width: '100px' }}
            />
            <span style={{ marginLeft: '5px', fontSize: '12px' }}>{mapSize}</span>
          </label>
          
          <button
            onClick={handleNewSeed}
            style={{
              padding: '6px 12px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            🎲 Random Seed
          </button>
        </div>
      </div>

      <div className="demo-content" style={{ display: 'flex', height: 'calc(100vh - 140px)' }}>
        <div className="terrain-display" style={{ flex: 1, position: 'relative' }}>
          <HexTerrainRenderer
            width={800}
            height={600}
            tiles={testTiles}
            seed={seed}
            onTileClick={handleTileClick}
            onTileHover={handleTileHover}
          />
        </div>

        <div className="info-panel" style={{ 
          width: '300px', 
          padding: '20px', 
          backgroundColor: '#f8f9fa',
          borderLeft: '1px solid #dee2e6',
          overflowY: 'auto'
        }}>
          <div className="terrain-stats" style={{ marginBottom: '20px' }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#495057' }}>📊 Terrain Stats</h3>
            <div style={{ fontSize: '14px', lineHeight: '1.5' }}>
              <div><strong>Total Tiles:</strong> {testTiles.length}</div>
              <div><strong>Seed:</strong> {seed}</div>
              <div><strong>Map Size:</strong> {mapSize}×{mapSize}</div>
              <div><strong>Biome Distribution:</strong></div>
              <div style={{ marginLeft: '10px', fontSize: '12px' }}>
                {getBiomeStats(testTiles)}
              </div>
            </div>
          </div>

          <div className="tile-info" style={{ marginBottom: '20px' }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#495057' }}>
              🔍 {hoveredTile ? 'Hovered' : selectedTile ? 'Selected' : 'No'} Tile
            </h3>
            {(hoveredTile || selectedTile) && (
              <TileInfo tile={hoveredTile || selectedTile!} />
            )}
          </div>

          <div className="legend" style={{ marginBottom: '20px' }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#495057' }}>🎨 Biome Legend</h3>
            <BiomeLegend />
          </div>

          <div className="features" style={{ marginBottom: '20px' }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#495057' }}>⚡ Features</h3>
            <ul style={{ fontSize: '14px', lineHeight: '1.5', paddingLeft: '20px' }}>
              <li>✅ Hexagonal grid system</li>
              <li>✅ Flood-fill biome grouping</li>
              <li>✅ Distance-to-edge calculation</li>
              <li>✅ Sprite selection algorithm</li>
              <li>✅ Macro-natural formations</li>
              <li>✅ Heroes III visual style</li>
              <li>✅ PIXI.js GPU rendering</li>
              <li>✅ Interactive tiles</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const TileInfo: React.FC<{ tile: HexTile }> = ({ tile }) => (
  <div style={{ fontSize: '14px', lineHeight: '1.5', backgroundColor: 'white', padding: '10px', borderRadius: '4px' }}>
    <div><strong>Position:</strong> ({tile.q}, {tile.r})</div>
    <div><strong>Biome:</strong> {getBiomeIcon(tile.biome)} {tile.biome}</div>
    <div><strong>Elevation:</strong> {tile.elevation}</div>
    <div><strong>Humidity:</strong> {tile.humidity}</div>
    <div><strong>Group ID:</strong> {tile.groupId}</div>
    <div><strong>Distance to Edge:</strong> {tile.distanceToEdge}</div>
    <div><strong>Sprite ID:</strong> {tile.spriteId}</div>
    {tile.riverFlowDir && <div><strong>River:</strong> {tile.riverFlowDir}</div>}
    {tile.naturalBarrier && <div><strong>Natural Barrier:</strong> Yes</div>}
  </div>
);

const BiomeLegend: React.FC = () => {
  const biomes: Array<{ biome: BiomeType; color: string; description: string }> = [
    { biome: 'forest', color: '#2D5016', description: 'Dense woodland' },
    { biome: 'grass', color: '#7FB069', description: 'Open grassland' },
    { biome: 'desert', color: '#F4A460', description: 'Arid wasteland' },
    { biome: 'water', color: '#4A90E2', description: 'Rivers and lakes' },
    { biome: 'mountain', color: '#8B4513', description: 'Rocky peaks' },
    { biome: 'swamp', color: '#556B2F', description: 'Wetlands' },
    { biome: 'snow', color: '#F0F8FF', description: 'Frozen tundra' },
    { biome: 'lava', color: '#FF4500', description: 'Volcanic terrain' },
    { biome: 'crystal', color: '#9932CC', description: 'Magical crystals' },
    { biome: 'corruption', color: '#8B0000', description: 'Tainted lands' }
  ];

  return (
    <div style={{ fontSize: '12px' }}>
      {biomes.map(({ biome, color, description }) => (
        <div key={biome} style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
          <div style={{ 
            width: '16px', 
            height: '16px', 
            backgroundColor: color,
            marginRight: '8px',
            borderRadius: '2px',
            border: '1px solid #ccc'
          }} />
          <span style={{ fontWeight: 'bold', marginRight: '8px' }}>{biome}</span>
          <span style={{ color: '#666' }}>{description}</span>
        </div>
      ))}
    </div>
  );
};

const getBiomeIcon = (biome: BiomeType): string => {
  const icons: Record<BiomeType, string> = {
    forest: '🌲',
    grass: '🌱',
    desert: '🏜️',
    water: '💧',
    mountain: '⛰️',
    swamp: '🌿',
    snow: '❄️',
    lava: '🌋',
    crystal: '💎',
    corruption: '☠️'
  };
  return icons[biome] || '❓';
};

const getBiomeStats = (tiles: HexTile[]): React.ReactElement => {
  const stats = tiles.reduce((acc, tile) => {
    acc[tile.biome] = (acc[tile.biome] || 0) + 1;
    return acc;
  }, {} as Record<BiomeType, number>);

  return (
    <>
      {Object.entries(stats).map(([biome, count]) => (
        <div key={biome}>
          {getBiomeIcon(biome as BiomeType)} {biome}: {count}
        </div>
      ))}
    </>
  );
};

// Générateur de terrain de test
const generateTestTerrain = (size: number, seed: number): HexTile[] => {
  const tiles: HexTile[] = [];
  const centerQ = Math.floor(size / 2);
  const centerR = Math.floor(size / 2);

  for (let q = 0; q < size; q++) {
    for (let r = 0; r < size; r++) {
      const distanceFromCenter = HexUtils.distance({ q, r }, { q: centerQ, r: centerR });
      const noise = HexUtils.deterministicHash(q, r, seed);
      const elevation = Math.max(0, Math.min(100, 50 + (noise - 0.5) * 100));
      const humidity = Math.max(0, Math.min(100, 50 + (HexUtils.deterministicHash(q, r, seed + 1000) - 0.5) * 80));
      
      // Générer le biome basé sur l'élévation, l'humidité et la distance
      const biome = generateBiome(elevation, humidity, distanceFromCenter, size, noise);
      
      // Générer des rivières occasionnelles
      const riverFlowDir = generateRiver(q, r, elevation, seed);
      
      tiles.push({
        q,
        r,
        biome,
        elevation,
        humidity,
        riverFlowDir,
        naturalBarrier: elevation > 80 && biome === 'mountain'
      });
    }
  }

  return tiles;
};

const generateBiome = (
  elevation: number, 
  humidity: number, 
  distanceFromCenter: number, 
  maxDistance: number, 
  noise: number
): BiomeType => {
  const edgeDistance = maxDistance / 2;
  const isEdge = distanceFromCenter > edgeDistance * 0.8;
  
  // Biomes basés sur l'élévation et l'humidité
  if (elevation < 20) {
    return 'water';
  } else if (elevation > 80) {
    return noise < 0.1 ? 'snow' : 'mountain';
  } else if (humidity < 30) {
    return 'desert';
  } else if (humidity > 70) {
    return elevation < 40 ? 'swamp' : 'forest';
  } else {
    if (noise < 0.05) return 'crystal';
    if (noise > 0.95) return 'corruption';
    if (isEdge && noise < 0.3) return 'lava';
    return 'grass';
  }
};

const generateRiver = (
  q: number, 
  r: number, 
  elevation: number, 
  seed: number
): RiverDirection | undefined => {
  const riverChance = HexUtils.deterministicHash(q, r, seed + 2000);
  
  if (riverChance < 0.1 && elevation > 30 && elevation < 60) {
    const directions: RiverDirection[] = ['N', 'NE', 'SE', 'S', 'SW', 'NW'];
    const dirIndex = Math.floor(riverChance * directions.length);
    return directions[dirIndex];
  }
  
  return undefined;
};

export default HexTerrainDemo;