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
  
  const [hoveredTile, setHoveredTile] = useState<Position | null>(null);
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

  // --- Rendu SVG organique ---
  const renderTiles = () => {
    if (!enrichedMap || enrichedMap.length === 0) return null;
    const tiles: React.ReactNode[] = [];
    for (let y = 0; y < enrichedMap.length; y++) {
      for (let x = 0; x < enrichedMap[y].length; x++) {
        const tile = enrichedMap[y][x];
        if (!tile) continue;
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
          // TODO: forêt organique (densité, clairière)
          fill = '#3a5c1a';
        } else if (tile.biome === 'MOUNTAIN') {
          // TODO: crevasses, cailloux
          fill = '#b0b0b0';
        } else {
          fill = '#bada55';
        }
        // Hexagone SVG
        const hexPoints = Array.from({length: 6}).map((_, i) => {
          const angle = Math.PI/3 * i;
          const hx = px + Math.cos(angle) * 15;
          const hy = py + Math.sin(angle) * 15;
          return `${hx},${hy}`;
        }).join(' ');
        tiles.push(
          <g key={`tile-${x}-${y}`}> 
            <polygon points={hexPoints} fill={fill} stroke="none" />
            {extra}
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
        {renderTiles()}
      </svg>
      {/* Debug info conservée */}
      <div className="debug-info">
        <div>Carte: {map?.length || 0}x{map?.[0]?.length || 0}</div>
      </div>
    </div>
  );
});

export default ModernGameRenderer; 