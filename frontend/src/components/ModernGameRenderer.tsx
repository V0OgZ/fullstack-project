import React, { forwardRef, useRef, useCallback, useEffect, useImperativeHandle, useState, useMemo } from 'react';
import { useGameStore } from '../store/useGameStore';
import { Position, Tile, Hero } from '../types/game';
import { useTranslation } from '../i18n';
import './ModernGameRenderer.css';
import { heroSpriteService } from '../services/heroSpriteService';
import { getPlayerColorConfig } from '../constants/playerColors';
import { pathDotsService } from '../services/pathDotsService';

// Fonction pseudo-aléatoire seedée pour rendu déterministe
function seededRandom(seed: string): () => number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  return function() {
    hash = ((hash * 1103515245) + 12345) & 0x7fffffff;
    return hash / 0x7fffffff;
  };
}

// Générateur de bruit simplex simplifié
function simpleNoise(x: number, y: number, seed: string): number {
  const rng = seededRandom(seed + x + y);
  return (rng() - 0.5) * 2;
}

interface ZoneInfo {
  id: string;
  biome: string;
  tiles: Position[];
  center: Position;
  size: number;
  boundingBox: { minX: number, maxX: number, minY: number, maxY: number };
}

interface EnrichedTile extends Tile {
  zoneId: string;
  distanceToBorder: number;
  zoneSize: number;
  zoneCenter: Position;
}

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
  const animationRef = useRef<number>(0);
  const { map, currentGame, selectedTile, setSelectedTile, visibleZFCs, selectedHero, movementRange, movementMode, selectHero, moveHero, canMoveToPosition } = useGameStore();
  const { t } = useTranslation();
  
  const [hoveredTile, setHoveredTile] = useState<Position | null>(null);
  const [heroImages, setHeroImages] = useState<Map<string, HTMLImageElement>>(new Map());
  const [mapOffset, setMapOffset] = useState<Position>({ x: 0, y: 0 });

  // Configuration du rendu hexagonal
  const hexRadius = 20; // Réduit de 25 à 20 pour moins de chevauchement
  const hexWidth = hexRadius * 2;
  const hexHeight = Math.sqrt(3) * hexRadius;
  const hexHorizontalSpacing = hexWidth * 0.65; // Réduit de 0.75 à 0.65
  const hexVerticalSpacing = hexHeight * 0.75; // Ajout d'un facteur pour l'espacement vertical

  // Détection des zones connectées
  const detectZones = useCallback((tiles: Tile[][]): ZoneInfo[] => {
    if (!tiles.length) return [];
    
    const zones: ZoneInfo[] = [];
    const visited = new Set<string>();
    let zoneCounter = 0;

    const getNeighbors = (x: number, y: number): Position[] => {
      const neighbors: Position[] = [];
      const isEvenRow = y % 2 === 0;
      
      // Voisins hexagonaux
      const offsets = isEvenRow ? [
        [-1, -1], [0, -1], [-1, 0], [1, 0], [-1, 1], [0, 1]
      ] : [
        [0, -1], [1, -1], [-1, 0], [1, 0], [0, 1], [1, 1]
      ];
      
      offsets.forEach(([dx, dy]) => {
        const nx = x + dx;
        const ny = y + dy;
        if (ny >= 0 && ny < tiles.length && nx >= 0 && nx < tiles[ny].length) {
          neighbors.push({ x: nx, y: ny });
        }
      });
      
      return neighbors;
    };

    const floodFill = (startX: number, startY: number, biome: string): Position[] => {
      const queue: Position[] = [{ x: startX, y: startY }];
      const zoneTiles: Position[] = [];
      
      while (queue.length > 0) {
        const { x, y } = queue.shift()!;
        const key = `${x},${y}`;
        
        if (visited.has(key)) continue;
        if (tiles[y][x].terrain !== biome) continue;
        
        visited.add(key);
        zoneTiles.push({ x, y });
        
        getNeighbors(x, y).forEach(neighbor => {
          const neighborKey = `${neighbor.x},${neighbor.y}`;
          if (!visited.has(neighborKey)) {
            queue.push(neighbor);
          }
        });
      }
      
      return zoneTiles;
    };

    // Parcours de toutes les tuiles pour détecter les zones
    for (let y = 0; y < tiles.length; y++) {
      for (let x = 0; x < tiles[y].length; x++) {
        const key = `${x},${y}`;
        if (visited.has(key)) continue;
        
        const biome = tiles[y][x].terrain;
        const zoneTiles = floodFill(x, y, biome);
        
        if (zoneTiles.length > 0) {
          // Calcul du centre et des limites de la zone
          const minX = Math.min(...zoneTiles.map(t => t.x));
          const maxX = Math.max(...zoneTiles.map(t => t.x));
          const minY = Math.min(...zoneTiles.map(t => t.y));
          const maxY = Math.max(...zoneTiles.map(t => t.y));
          
          const centerX = (minX + maxX) / 2;
          const centerY = (minY + maxY) / 2;
          
          zones.push({
            id: `Z${zoneCounter++}`,
            biome,
            tiles: zoneTiles,
            center: { x: centerX, y: centerY },
            size: zoneTiles.length,
            boundingBox: { minX, maxX, minY, maxY }
          });
        }
      }
    }
    
    return zones;
  }, []);

  // Enrichissement des tuiles avec les données de zone
  const enrichTiles = useCallback((tiles: Tile[][], zones: ZoneInfo[]): EnrichedTile[][] => {
    const enriched: EnrichedTile[][] = [];
    
    for (let y = 0; y < tiles.length; y++) {
      const row: EnrichedTile[] = [];
      for (let x = 0; x < tiles[y].length; x++) {
        const tile = tiles[y][x];
        
        // Trouve la zone correspondante
        const zone = zones.find(z => 
          z.tiles.some(t => t.x === x && t.y === y)
        );
        
        if (zone) {
          // Calcul de la distance au bord de la zone
          const distanceToBorder = Math.min(
            x - zone.boundingBox.minX,
            zone.boundingBox.maxX - x,
            y - zone.boundingBox.minY,
            zone.boundingBox.maxY - y
          );
          
          row.push({
            ...tile,
            zoneId: zone.id,
            distanceToBorder,
            zoneSize: zone.size,
            zoneCenter: zone.center
          });
        } else {
          row.push({
            ...tile,
            zoneId: 'isolated',
            distanceToBorder: 0,
            zoneSize: 1,
            zoneCenter: { x, y }
          });
        }
      }
      enriched.push(row);
    }
    
    return enriched;
  }, []);

  // Zones détectées et tuiles enrichies
  const { zones, enrichedTiles } = useMemo(() => {
    const detectedZones = detectZones(map);
    const enriched = enrichTiles(map, detectedZones);
    return { zones: detectedZones, enrichedTiles: enriched };
  }, [map, detectZones, enrichTiles]);

  // Conversion coordonnées hex vers pixel
  const hexToPixel = useCallback((hexX: number, hexY: number): Position => {
    const x = hexX * hexHorizontalSpacing + (hexY % 2) * (hexHorizontalSpacing / 2);
    const y = hexY * hexVerticalSpacing;
    return { x: x + mapOffset.x + 100, y: y + mapOffset.y + 100 }; // Ajout d'offset pour centrer
  }, [mapOffset, hexHorizontalSpacing, hexVerticalSpacing]);

  // Hexagonal rendering with proper tile coverage
  const renderTileContent = useCallback((ctx: CanvasRenderingContext2D, tile: any, x: number, y: number, radius: number) => {
    if (!tile) return;

    // Draw perfect hexagon
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

    // Get terrain color
    const terrainColors: { [key: string]: string } = {
      'WATER': '#4A90E2',
      'GRASS': '#7ED321',
      'FOREST': '#417505',
      'MOUNTAIN': '#8E8E93',
      'DESERT': '#F5A623',
      'SWAMP': '#5A6B3C'
    };
    
    const terrainColor = terrainColors[tile.terrain] || '#7ED321';
    
    // Fill hexagon
    ctx.fillStyle = terrainColor;
    ctx.fill();
    
    // Draw hexagon border
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 1;
    ctx.stroke();
  }, []);

  // Rendu des héros
  const renderHero = useCallback((
    ctx: CanvasRenderingContext2D,
    hero: Hero, // Hero type is not fully defined in imports, so using 'any' for now
    pixelPos: Position
  ) => {
    const { x: px, y: py } = pixelPos;
    
    // Cercle de base du héros
    ctx.fillStyle = selectedHero?.id === hero.id ? '#FFD700' : '#4A90E2';
    ctx.beginPath();
    ctx.arc(px, py, 12, 0, Math.PI * 2);
    ctx.fill();
    
    // Contour
    ctx.strokeStyle = '#2C3E50';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Icône héros (emoji simple)
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '16px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('⚔️', px, py);
  }, [selectedHero]);

  // Hexagonal overlays with proper hexagonal shapes
  const renderOverlays = useCallback((ctx: CanvasRenderingContext2D) => {
    if (!map || map.length === 0) return;

    const selectedTile = selectedHero ? { x: selectedHero.position?.x || 0, y: selectedHero.position?.y || 0 } : null;

    // Selected tile overlay (hexagonal)
    if (selectedTile) {
      const coords = hexToPixel(selectedTile.x, selectedTile.y);
      const x = coords.x + mapOffset.x;
      const y = coords.y + mapOffset.y;
      
      const pulseIntensity = 0.5 + 0.3 * Math.sin(Date.now() * 0.003);
      
      ctx.save();
      ctx.globalAlpha = pulseIntensity;
      
      // Draw hexagonal selection
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3;
        const px = x + Math.cos(angle) * (hexRadius + 3);
        const py = y + Math.sin(angle) * (hexRadius + 3);
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
  }, [map, hexRadius, mapOffset, hexToPixel, selectedHero]);

  // Rendu principal avec hexagones parfaits
  const render = useCallback(() => {
    if (!canvasRef.current || !map || map.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw hexagonal tiles
    const mapWidth = map[0].length;
    const mapHeight = map.length;
    
    for (let y = 0; y < mapHeight; y++) {
      for (let x = 0; x < mapWidth; x++) {
        const tile = map[y][x];
        if (!tile) continue;

        const pixelPos = hexToPixel(x, y);
        const adjustedX = pixelPos.x + mapOffset.x;
        const adjustedY = pixelPos.y + mapOffset.y;
        
        // Skip if outside visible area
        if (adjustedX < -hexRadius || adjustedX > canvas.width + hexRadius ||
            adjustedY < -hexRadius || adjustedY > canvas.height + hexRadius) {
          continue;
        }

        // Render hexagonal tile
        renderTileContent(ctx, tile, adjustedX, adjustedY, hexRadius);

        // Render hero if present
        if (tile.hero) {
          renderHero(ctx, tile.hero, { x: adjustedX, y: adjustedY });
        }
      }
    }

    // Render overlays
    renderOverlays(ctx);
  }, [map, hexToPixel, mapOffset, renderTileContent, renderHero, renderOverlays]);

  // Gestion des clics
  const handleCanvasClick = useCallback((event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || !enrichedTiles.length) return;
    
    const rect = canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;
    
    // Trouve la tuile cliquée
    for (let y = 0; y < enrichedTiles.length; y++) {
      for (let x = 0; x < enrichedTiles[y].length; x++) {
        const pixelPos = hexToPixel(x, y);
        const distance = Math.sqrt(
          Math.pow(clickX - pixelPos.x, 2) + Math.pow(clickY - pixelPos.y, 2)
        );
        
        if (distance <= hexRadius * 0.95) {
          const position = { x, y };
          setSelectedTile(position);
          onTileClick?.(position);
          
          // Gestion du mouvement des héros
          if (movementMode && selectedHero) {
            const tile = enrichedTiles[y][x];
            if (canMoveToPosition(selectedHero, position)) {
              moveHero(selectedHero.id, position);
            }
          }
          
          return;
        }
      }
    }
  }, [enrichedTiles, hexToPixel, hexRadius, setSelectedTile, onTileClick, movementMode, selectedHero, canMoveToPosition, moveHero]);

  // Gestion du survol
  const handleCanvasMouseMove = useCallback((event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || !enrichedTiles.length) return;
    
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    
    let foundTile: Position | null = null;
    
    for (let y = 0; y < enrichedTiles.length; y++) {
      for (let x = 0; x < enrichedTiles[y].length; x++) {
        const pixelPos = hexToPixel(x, y);
        const distance = Math.sqrt(
          Math.pow(mouseX - pixelPos.x, 2) + Math.pow(mouseY - pixelPos.y, 2)
        );
        
        if (distance <= hexRadius * 0.95) {
          foundTile = { x, y };
          break;
        }
      }
      if (foundTile) break;
    }
    
    setHoveredTile(foundTile);
  }, [enrichedTiles, hexToPixel, hexRadius]);

  // Centrage sur une position
  useImperativeHandle(ref, () => ({
    centerOnPosition: (position: Position) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const targetPixel = hexToPixel(position.x, position.y);
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      setMapOffset({
        x: centerX - targetPixel.x + mapOffset.x,
        y: centerY - targetPixel.y + mapOffset.y
      });
    }
  }));

  // Effect pour le rendu
  useEffect(() => {
    render();
  }, [render]);

  // Effect pour redimensionner le canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    canvas.width = width;
    canvas.height = height;
    render();
  }, [width, height, render]);

  return (
    <div className="modern-game-renderer">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        onClick={handleCanvasClick}
        onMouseMove={handleCanvasMouseMove}
        style={{ cursor: 'pointer' }}
      />
      
      {/* Info de débogage */}
      <div className="debug-info">
        <div>Zones détectées: {zones.length}</div>
        {hoveredTile && (
          <div>
            Tuile: {hoveredTile.x},{hoveredTile.y} - 
            {enrichedTiles[hoveredTile.y]?.[hoveredTile.x]?.terrain} - 
            Zone: {enrichedTiles[hoveredTile.y]?.[hoveredTile.x]?.zoneId}
          </div>
        )}
      </div>
    </div>
  );
});

export default ModernGameRenderer; 