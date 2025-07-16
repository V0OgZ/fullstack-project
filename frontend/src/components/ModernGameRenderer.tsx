import React, { forwardRef, useRef, useCallback, useEffect, useImperativeHandle, useState, useMemo } from 'react';
import { useGameStore } from '../store/useGameStore';
import { Position, Tile, Hero } from '../types/game';
import { useTranslation } from '../i18n';
import './ModernGameRenderer.css';
import { enrichMapWithZones, EnrichedTile } from '../utils/zoneDetection';
import { createSeededNoise } from '../utils/seededNoise';

interface ModernGameRendererProps {
  width: number;
  height: number;
  onTileClick?: (position: Position) => void;
}

export interface ModernGameRendererRef {
  centerOnPosition: (position: Position) => void;
}

const ModernGameRenderer = forwardRef<ModernGameRendererRef, ModernGameRendererProps>(({ width, height, onTileClick }, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { map, selectedHero, setSelectedTile, moveHero, canMoveToPosition } = useGameStore();
  const { t } = useTranslation();
  
  const [hoveredTile, setHoveredTile] = useState<{x:number, y:number}|null>(null);
  const [svgSelectedTile, setSvgSelectedTile] = useState<{x:number, y:number}|null>(null);
  const [mapOffset, setMapOffset] = useState<Position>({ x: 0, y: 0 });

  // Configuration du rendu hexagonal - PLUS COMPACT
  const hexRadius = 15; // Réduit encore plus
  const hexWidth = hexRadius * 2;
  const hexHeight = Math.sqrt(3) * hexRadius;
  const hexHorizontalSpacing = hexWidth * 0.6; // Plus compact
  const hexVerticalSpacing = hexHeight * 0.7; // Plus compact

  // Conversion coordonnées hex vers pixel
  const hexToPixel = useCallback((hexX: number, hexY: number): Position => {
    const x = hexX * hexHorizontalSpacing + (hexY % 2) * (hexHorizontalSpacing / 2);
    const y = hexY * hexVerticalSpacing;
    return { x: x + mapOffset.x + 50, y: y + mapOffset.y + 50 }; // Centrage réduit
  }, [mapOffset, hexHorizontalSpacing, hexVerticalSpacing]);

  // Rendu d'une tuile hexagonale
  const renderTileContent = useCallback((ctx: CanvasRenderingContext2D, tile: any, x: number, y: number, radius: number) => {
    if (!tile) return;

    // Dessiner l'hexagone
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3;
      const px = x + Math.cos(angle) * radius;
      const py = y + Math.sin(angle) * radius;
      if (i === 0) {
        ctx.moveTo(px, py);
      } else {
        ctx.lineTo(px, py);
      }
    }
    ctx.closePath();

    // Couleurs de terrain
    const terrainColors: { [key: string]: string } = {
      'WATER': '#4A90E2',
      'GRASS': '#7ED321',
      'FOREST': '#417505',
      'MOUNTAIN': '#8E8E93',
      'DESERT': '#F5A623',
      'SWAMP': '#5A6B3C'
    };
    
    const terrainColor = terrainColors[tile.terrain] || '#7ED321';
    
    // Remplir l'hexagone
    ctx.fillStyle = terrainColor;
    ctx.fill();
    
    // Bordure
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 1;
    ctx.stroke();
  }, []);

  // Rendu des héros - PLUS VISIBLE
  const renderHero = useCallback((
    ctx: CanvasRenderingContext2D,
    hero: Hero,
    pixelPos: Position
  ) => {
    const { x: px, y: py } = pixelPos;
    
    // Cercle de base du héros - PLUS GRAND
    ctx.fillStyle = selectedHero?.id === hero.id ? '#FFD700' : '#4A90E2';
    ctx.beginPath();
    ctx.arc(px, py, 8, 0, Math.PI * 2);
    ctx.fill();
    
    // Contour
    ctx.strokeStyle = '#2C3E50';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Icône héros
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('⚔️', px, py);
  }, [selectedHero]);

  // Rendu des overlays
  const renderOverlays = useCallback((ctx: CanvasRenderingContext2D) => {
    if (!map || map.length === 0) return;

    const selectedTile = selectedHero ? { x: selectedHero.position?.x || 0, y: selectedHero.position?.y || 0 } : null;

    // Overlay de sélection
    if (selectedTile) {
      const coords = hexToPixel(selectedTile.x, selectedTile.y);
      
      const pulseIntensity = 0.5 + 0.3 * Math.sin(Date.now() * 0.003);
      
      ctx.save();
      ctx.globalAlpha = pulseIntensity;
      
      // Dessiner la sélection hexagonale
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3;
        const px = coords.x + Math.cos(angle) * (hexRadius + 3);
        const py = coords.y + Math.sin(angle) * (hexRadius + 3);
        if (i === 0) {
          ctx.moveTo(px, py);
        } else {
          ctx.lineTo(px, py);
        }
      }
      ctx.closePath();
      
      ctx.strokeStyle = '#FFD700';
      ctx.lineWidth = 3;
      ctx.stroke();
      
      ctx.restore();
    }
  }, [map, hexRadius, hexToPixel, selectedHero]);

  // --- Nouvelle map enrichie ---
  const mapId = 'main-map'; // TODO: utiliser un vrai id si dispo
  const enrichedMap: EnrichedTile[][] = useMemo(() => map ? enrichMapWithZones(map, mapId) : [], [map, mapId]);

  // Handle click on tile
  const handleTileClick = (x: number, y: number) => {
    setSvgSelectedTile({x, y});
    if (onTileClick) onTileClick({x, y});
  };
  // Handle hover on tile
  const handleTileHover = (x: number, y: number) => {
    setHoveredTile({x, y});
  };

  // --- Rendu SVG organique ---
  const renderTiles = () => {
    if (!enrichedMap || enrichedMap.length === 0) return null;
    const tiles: React.ReactNode[] = [];
    for (let y = 0; y < enrichedMap.length; y++) {
      for (let x = 0; x < enrichedMap[y].length; x++) {
        const tile = enrichedMap[y][x];
        if (!tile) continue;
        // Merge hero info from original map
        const hero = map?.[y]?.[x]?.hero;
        // Position pixel
        const px = x * 0.6 * 2 * 15 + (y % 2) * 0.6 * 15 + 50;
        const py = y * 0.7 * Math.sqrt(3) * 15 + 50;
        // Motif contextuel par biome
        let fill = '';
        let extra: React.ReactNode = null;
        if (tile.biome === 'WATER') {
          // Dégradé de profondeur + brillance
          const depth = Math.min(tile.distance_to_border / 6, 1);
          const base = 180 - 60 * depth;
          const color = `hsl(${base},70%,${45-15*depth}%)`;
          fill = color;
          // Brillance subtile (effet vague)
          const { noise2D } = createSeededNoise(`${mapId}-water-${tile.zone_id}`);
          const shine = 0.5 + 0.5 * noise2D(x/3, y/3);
          extra = <ellipse cx={px} cy={py+6} rx={10} ry={2} fill="white" opacity={0.08+0.08*shine} />;
        } else if (tile.biome === 'DESERT') {
          // Dune multi-tuiles si zone grande
          const { noise2D } = createSeededNoise(`${mapId}-desert-${tile.zone_id}`);
          let dune = null;
          if (tile.zone_size > 12 && tile.distance_to_border > 1) {
            // Dune = vague jaune pâle, orientée par bruit
            const angle = noise2D(tile.x/2, tile.y/2) * Math.PI * 2;
            const dx = Math.cos(angle) * 7;
            const dy = Math.sin(angle) * 3;
            dune = <ellipse cx={px+dx} cy={py+dy} rx={8} ry={2.5} fill="#fff7c2" opacity={0.22} />;
          }
          fill = '#f5e6b2';
          extra = dune;
        } else if (tile.biome === 'FOREST') {
          // Forêt : densité au centre, clairière possible
          const { noise2D } = createSeededNoise(`${mapId}-forest-${tile.zone_id}`);
          // Densité : plus sombre au centre, plus clair au bord
          const density = Math.max(0, 1 - tile.distance_to_border / Math.max(3, tile.zone_size/4));
          let base = Math.round(60 - 20 * density); // teinte verte
          let light = Math.round(30 + 30 * (1-density));
          fill = `hsl(${base}, 60%, ${light}%)`;
          // Clairière : bruit + centre de zone
          let clearing = null;
          if (tile.zone_size > 10 && tile.distance_to_border < 2) {
            const distToCenter = Math.sqrt(Math.pow(tile.x-tile.zone_center.x,2)+Math.pow(tile.y-tile.zone_center.y,2));
            if (distToCenter < 2.5 + 1.5*noise2D(tile.x, tile.y)) {
              clearing = <circle cx={px} cy={py} r={6+2*noise2D(tile.x, tile.y)} fill="#e6e6b2" opacity={0.18} />;
            }
          }
          extra = clearing;
        } else if (tile.biome === 'MOUNTAIN') {
          // Montagne : crevasses, cailloux
          fill = '#b0b0b0';
          const { noise2D } = createSeededNoise(`${mapId}-mountain-${tile.zone_id}`);
          let cracks = null;
          if (tile.zone_size > 6 && tile.distance_to_border > 0) {
            // Crevasse : ligne sombre, orientée bruit
            const angle = noise2D(tile.x, tile.y) * Math.PI * 2;
            const dx = Math.cos(angle) * 7;
            const dy = Math.sin(angle) * 7;
            cracks = <line x1={px-dx} y1={py-dy} x2={px+dx} y2={py+dy} stroke="#444" strokeWidth={1.2} opacity={0.22+0.18*Math.abs(noise2D(tile.x, tile.y))} />;
          }
          // Cailloux : petits cercles bruités
          let rocks = [];
          if (tile.zone_size > 3 && tile.distance_to_border > 0.5) {
            for (let i=0; i<2; i++) {
              const rx = px + 6*Math.cos(i+noise2D(tile.x,i));
              const ry = py + 6*Math.sin(i+noise2D(tile.y,i));
              rocks.push(<circle key={i} cx={rx} cy={ry} r={1.5+1.2*Math.abs(noise2D(tile.x,i))} fill="#888" opacity={0.32} />);
            }
          }
          extra = <>{cracks}{rocks}</>;
        } else {
          fill = '#bada55';
        }
        // Compute neighbor biomes for edge blending
        const neighbors = [
          [x+1, y], [x-1, y],
          [x, y+1], [x, y-1],
          [x + (y%2 ? 1 : -1), y-1],
          [x + (y%2 ? 1 : -1), y+1]
        ];
        let edgeBlend = false;
        for (const [nx, ny] of neighbors) {
          if (
            ny >= 0 && ny < enrichedMap.length &&
            nx >= 0 && nx < enrichedMap[0].length &&
            enrichedMap[ny][nx] && enrichedMap[ny][nx].biome !== tile.biome
          ) {
            edgeBlend = true;
            break;
          }
        }
        // Biome color palettes
        const biomeColors: Record<string, string> = {
          WATER: '#4a90e2',
          DESERT: '#f5e6b2',
          FOREST: '#3a5c1a',
          MOUNTAIN: '#b0b0b0',
          GRASS: '#bada55',
          SWAMP: '#5A6B3C',
        };
        // Soft edge blending: interpolate color with neighbor biome if at edge
        let fillColor = fill;
        if (edgeBlend) {
          // Find the most common neighbor biome
          const biomeCounts: Record<string, number> = {};
          for (const [nx, ny] of neighbors) {
            if (
              ny >= 0 && ny < enrichedMap.length &&
              nx >= 0 && nx < enrichedMap[0].length &&
              enrichedMap[ny][nx]
            ) {
              const b = enrichedMap[ny][nx].biome;
              if (b !== tile.biome) biomeCounts[b] = (biomeCounts[b]||0)+1;
            }
          }
          const edgeBiome = Object.entries(biomeCounts).sort((a,b)=>b[1]-a[1])[0]?.[0];
          if (edgeBiome && biomeColors[edgeBiome]) {
            // Blend 60% main, 40% neighbor
            fillColor = `url(#blend-${tile.biome}-${edgeBiome})`;
          }
        }
        // Hexagone SVG
        const hexPoints = Array.from({length: 6}).map((_, i) => {
          const angle = Math.PI/3 * i;
          const hx = px + Math.cos(angle) * 15;
          const hy = py + Math.sin(angle) * 15;
          return `${hx},${hy}`;
        }).join(' ');
        tiles.push(
          <g key={`tile-${x}-${y}`}
            onClick={() => handleTileClick(x, y)}
            onMouseMove={() => handleTileHover(x, y)}
            style={{cursor:'pointer'}}
          >
            <polygon points={hexPoints} fill={fillColor} stroke="none" />
            {extra}
            {/* Hero rendering */}
            {hero && (
              <g>
                <circle cx={px} cy={py} r={8} fill={svgSelectedTile && svgSelectedTile.x===x && svgSelectedTile.y===y ? '#FFD700' : '#4A90E2'} stroke="#2C3E50" strokeWidth={2} />
                <text x={px} y={py+2} textAnchor="middle" fontSize="12" fill="#fff">⚔️</text>
              </g>
            )}
            {/* Overlay selection/hover */}
            {svgSelectedTile && svgSelectedTile.x===x && svgSelectedTile.y===y && (
              <polygon points={hexPoints} fill="none" stroke="#FFD700" strokeWidth={3} />
            )}
            {hoveredTile && hoveredTile.x===x && hoveredTile.y===y && (
              <polygon points={hexPoints} fill="none" stroke="#fff" strokeWidth={2} opacity={0.5} />
            )}
          </g>
        );
      }
    }
    return tiles;
  };

  // --- Rendu principal ---
  return (
    <div className="modern-game-renderer">
      <svg width={width} height={height} style={{background:'#1a1a2e', display:'block'}}>
        <defs>
          <linearGradient id="blend-WATER-DESERT" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4a90e2" />
            <stop offset="100%" stopColor="#f5e6b2" />
          </linearGradient>
          <linearGradient id="blend-WATER-FOREST" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4a90e2" />
            <stop offset="100%" stopColor="#3a5c1a" />
          </linearGradient>
          <linearGradient id="blend-DESERT-WATER" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f5e6b2" />
            <stop offset="100%" stopColor="#4a90e2" />
          </linearGradient>
          <linearGradient id="blend-DESERT-FOREST" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f5e6b2" />
            <stop offset="100%" stopColor="#3a5c1a" />
          </linearGradient>
          <linearGradient id="blend-FOREST-WATER" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3a5c1a" />
            <stop offset="100%" stopColor="#4a90e2" />
          </linearGradient>
          <linearGradient id="blend-FOREST-DESERT" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3a5c1a" />
            <stop offset="100%" stopColor="#f5e6b2" />
          </linearGradient>
          <linearGradient id="blend-FOREST-MOUNTAIN" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3a5c1a" />
            <stop offset="100%" stopColor="#b0b0b0" />
          </linearGradient>
          <linearGradient id="blend-MOUNTAIN-WATER" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#b0b0b0" />
            <stop offset="100%" stopColor="#4a90e2" />
          </linearGradient>
          <linearGradient id="blend-MOUNTAIN-DESERT" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#b0b0b0" />
            <stop offset="100%" stopColor="#f5e6b2" />
          </linearGradient>
          <linearGradient id="blend-MOUNTAIN-FOREST" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#b0b0b0" />
            <stop offset="100%" stopColor="#3a5c1a" />
          </linearGradient>
          <linearGradient id="blend-GRASS-WATER" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#bada55" />
            <stop offset="100%" stopColor="#4a90e2" />
          </linearGradient>
          <linearGradient id="blend-GRASS-DESERT" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#bada55" />
            <stop offset="100%" stopColor="#f5e6b2" />
          </linearGradient>
          <linearGradient id="blend-GRASS-FOREST" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#bada55" />
            <stop offset="100%" stopColor="#3a5c1a" />
          </linearGradient>
          <linearGradient id="blend-SWAMP-WATER" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#5A6B3C" />
            <stop offset="100%" stopColor="#4a90e2" />
          </linearGradient>
          <linearGradient id="blend-SWAMP-DESERT" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#5A6B3C" />
            <stop offset="100%" stopColor="#f5e6b2" />
          </linearGradient>
          <linearGradient id="blend-SWAMP-FOREST" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#5A6B3C" />
            <stop offset="100%" stopColor="#3a5c1a" />
          </linearGradient>
          <linearGradient id="blend-SWAMP-MOUNTAIN" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#5A6B3C" />
            <stop offset="100%" stopColor="#b0b0b0" />
          </linearGradient>
        </defs>
        {renderTiles()}
      </svg>
      {/* Debug info conservée */}
      <div className="debug-info">
        <div>Carte: {map?.length || 0}x{map?.[0]?.length || 0}</div>
        {hoveredTile && (
          <div>
            Tuile: {hoveredTile.x},{hoveredTile.y} - {enrichedMap?.[hoveredTile.y]?.[hoveredTile.x]?.biome}
          </div>
        )}
        {svgSelectedTile && (
          <div>
            Sélection: {svgSelectedTile.x},{svgSelectedTile.y} - {enrichedMap?.[svgSelectedTile.y]?.[svgSelectedTile.x]?.biome}
          </div>
        )}
      </div>
    </div>
  );
});

export default ModernGameRenderer; 