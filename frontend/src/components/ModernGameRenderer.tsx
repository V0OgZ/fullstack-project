import React, { useRef, useEffect, useState, useCallback, useMemo, forwardRef, useImperativeHandle } from 'react';
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

  // Rendu contextuel par biome
  const renderBiomeTile = useCallback((
    ctx: CanvasRenderingContext2D,
    tile: EnrichedTile,
    pixelPos: Position
  ) => {
    const { x: px, y: py } = pixelPos;
    const rng = seededRandom(`${tile.zoneId}-${tile.x}-${tile.y}`);
    
    // Dessine l'hexagone de base avec un rayon légèrement réduit pour éviter les chevauchements
    ctx.save();
    ctx.beginPath();
    const effectiveRadius = hexRadius * 0.95; // Réduit de 5% pour éviter les chevauchements
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3 - Math.PI / 2; // Rotation pour orientation pointy-top
      const x = px + effectiveRadius * Math.cos(angle);
      const y = py + effectiveRadius * Math.sin(angle);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.clip();

    switch (tile.terrain) {
      case 'water':
        renderWater(ctx, tile, px, py, rng);
        break;
      case 'desert':
        renderDesert(ctx, tile, px, py, rng);
        break;
      case 'forest':
        renderForest(ctx, tile, px, py, rng);
        break;
      case 'mountain':
        renderMountain(ctx, tile, px, py, rng);
        break;
      case 'swamp':
        renderSwamp(ctx, tile, px, py, rng);
        break;
      default: // grass
        renderGrass(ctx, tile, px, py, rng);
        break;
    }
    
    ctx.restore();
  }, [hexRadius]);

  // Rendu de l'eau avec profondeur
  const renderWater = useCallback((
    ctx: CanvasRenderingContext2D,
    tile: EnrichedTile,
    px: number,
    py: number,
    rng: () => number
  ) => {
    const depth = Math.min(tile.distanceToBorder / 3, 1);
    const baseColor = `hsl(200, 80%, ${Math.max(20, 50 - depth * 30)}%)`;
    
    // Fond de base
    ctx.fillStyle = baseColor;
    ctx.fillRect(px - hexRadius, py - hexRadius, hexRadius * 2, hexRadius * 2);
    
    // Effet de brillance
    if (rng() > 0.7) {
      ctx.fillStyle = `hsla(200, 60%, 70%, 0.3)`;
      const sparkleX = px + (rng() - 0.5) * hexRadius;
      const sparkleY = py + (rng() - 0.5) * hexRadius;
      ctx.beginPath();
      ctx.arc(sparkleX, sparkleY, 2, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // Vagues subtiles
    ctx.strokeStyle = `hsla(200, 60%, 80%, 0.2)`;
    ctx.lineWidth = 1;
    for (let i = 0; i < 3; i++) {
      const waveY = py + (rng() - 0.5) * hexRadius;
      ctx.beginPath();
      ctx.moveTo(px - hexRadius, waveY);
      ctx.lineTo(px + hexRadius, waveY);
      ctx.stroke();
    }
  }, [hexRadius]);

  // Rendu du désert avec dunes
  const renderDesert = useCallback((
    ctx: CanvasRenderingContext2D,
    tile: EnrichedTile,
    px: number,
    py: number,
    rng: () => number
  ) => {
    const sandColor = `hsl(45, 70%, ${60 + rng() * 20}%)`;
    ctx.fillStyle = sandColor;
    ctx.fillRect(px - hexRadius, py - hexRadius, hexRadius * 2, hexRadius * 2);
    
    // Dunes pour les grandes zones
    if (tile.zoneSize > 10) {
      const duneIntensity = Math.min(tile.distanceToBorder / 2, 1);
      const duneAngle = rng() * Math.PI * 2;
      
      ctx.fillStyle = `hsla(45, 60%, 40%, ${duneIntensity * 0.3})`;
      ctx.beginPath();
      ctx.ellipse(
        px + Math.cos(duneAngle) * hexRadius * 0.3,
        py + Math.sin(duneAngle) * hexRadius * 0.3,
        hexRadius * 0.6,
        hexRadius * 0.3,
        duneAngle,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }
    
    // Texture sable
    ctx.fillStyle = `hsla(45, 50%, 80%, 0.1)`;
    for (let i = 0; i < 5; i++) {
      const grainX = px + (rng() - 0.5) * hexRadius * 1.5;
      const grainY = py + (rng() - 0.5) * hexRadius * 1.5;
      ctx.fillRect(grainX, grainY, 1, 1);
    }
  }, [hexRadius]);

  // Rendu de la forêt avec densité
  const renderForest = useCallback((
    ctx: CanvasRenderingContext2D,
    tile: EnrichedTile,
    px: number,
    py: number,
    rng: () => number
  ) => {
    const density = Math.min(tile.distanceToBorder / 3, 1);
    const baseGreen = `hsl(120, 60%, ${30 + density * 20}%)`;
    
    ctx.fillStyle = baseGreen;
    ctx.fillRect(px - hexRadius, py - hexRadius, hexRadius * 2, hexRadius * 2);
    
    // Arbres selon la densité
    const treeCount = Math.floor(density * 8 + 3);
    for (let i = 0; i < treeCount; i++) {
      const treeX = px + (rng() - 0.5) * hexRadius * 1.4;
      const treeY = py + (rng() - 0.5) * hexRadius * 1.4;
      const treeSize = 3 + rng() * 4;
      
      // Tronc
      ctx.fillStyle = '#8B4513';
      ctx.fillRect(treeX - 1, treeY, 2, treeSize);
      
      // Feuillage
      ctx.fillStyle = `hsl(120, 70%, ${25 + rng() * 15}%)`;
      ctx.beginPath();
      ctx.arc(treeX, treeY - treeSize/2, treeSize, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // Clairière au centre des grandes zones
    if (tile.zoneSize > 20 && tile.distanceToBorder > 3) {
      const clearingSize = Math.min(tile.distanceToBorder - 2, 5);
      ctx.fillStyle = `hsla(120, 40%, 70%, 0.4)`;
      ctx.beginPath();
      ctx.arc(px, py, clearingSize * 3, 0, Math.PI * 2);
      ctx.fill();
    }
  }, [hexRadius]);

  // Rendu des montagnes
  const renderMountain = useCallback((
    ctx: CanvasRenderingContext2D,
    tile: EnrichedTile,
    px: number,
    py: number,
    rng: () => number
  ) => {
    const altitude = Math.min(tile.distanceToBorder / 2, 1);
    const rockColor = `hsl(30, 30%, ${40 + altitude * 20}%)`;
    
    ctx.fillStyle = rockColor;
    ctx.fillRect(px - hexRadius, py - hexRadius, hexRadius * 2, hexRadius * 2);
    
    // Pics rocheux
    const peakCount = Math.floor(altitude * 3 + 1);
    for (let i = 0; i < peakCount; i++) {
      const peakX = px + (rng() - 0.5) * hexRadius;
      const peakY = py + (rng() - 0.5) * hexRadius;
      const peakHeight = 5 + altitude * 10;
      
      ctx.fillStyle = `hsl(30, 20%, ${30 + rng() * 20}%)`;
      ctx.beginPath();
      ctx.moveTo(peakX, peakY);
      ctx.lineTo(peakX - 4, peakY + peakHeight);
      ctx.lineTo(peakX + 4, peakY + peakHeight);
      ctx.closePath();
      ctx.fill();
      
      // Ombre
      ctx.fillStyle = `hsla(30, 20%, 20%, 0.5)`;
      ctx.beginPath();
      ctx.moveTo(peakX, peakY);
      ctx.lineTo(peakX + 4, peakY + peakHeight);
      ctx.lineTo(peakX + 6, peakY + peakHeight);
      ctx.closePath();
      ctx.fill();
    }
  }, [hexRadius]);

  // Rendu du marais
  const renderSwamp = useCallback((
    ctx: CanvasRenderingContext2D,
    tile: EnrichedTile,
    px: number,
    py: number,
    rng: () => number
  ) => {
    const murkiness = Math.min(tile.distanceToBorder / 2, 1);
    const swampColor = `hsl(90, 40%, ${20 + murkiness * 15}%)`;
    
    ctx.fillStyle = swampColor;
    ctx.fillRect(px - hexRadius, py - hexRadius, hexRadius * 2, hexRadius * 2);
    
    // Flaques d'eau
    for (let i = 0; i < 3; i++) {
      const puddleX = px + (rng() - 0.5) * hexRadius;
      const puddleY = py + (rng() - 0.5) * hexRadius;
      const puddleSize = 2 + rng() * 4;
      
      ctx.fillStyle = `hsla(200, 50%, 25%, 0.7)`;
      ctx.beginPath();
      ctx.arc(puddleX, puddleY, puddleSize, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // Végétation clairsemée
    if (rng() > 0.5) {
      const grassX = px + (rng() - 0.5) * hexRadius;
      const grassY = py + (rng() - 0.5) * hexRadius;
      
      ctx.strokeStyle = `hsl(90, 60%, 40%)`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(grassX, grassY);
      ctx.lineTo(grassX, grassY - 6);
      ctx.stroke();
    }
  }, [hexRadius]);

  // Rendu de l'herbe
  const renderGrass = useCallback((
    ctx: CanvasRenderingContext2D,
    tile: EnrichedTile,
    px: number,
    py: number,
    rng: () => number
  ) => {
    const fertility = Math.min(tile.distanceToBorder / 4, 1);
    const grassColor = `hsl(100, 50%, ${40 + fertility * 20}%)`;
    
    ctx.fillStyle = grassColor;
    ctx.fillRect(px - hexRadius, py - hexRadius, hexRadius * 2, hexRadius * 2);
    
    // Brins d'herbe
    ctx.strokeStyle = `hsl(100, 60%, ${50 + rng() * 20}%)`;
    ctx.lineWidth = 1;
    for (let i = 0; i < 8; i++) {
      const bladX = px + (rng() - 0.5) * hexRadius * 1.5;
      const bladY = py + (rng() - 0.5) * hexRadius * 1.5;
      
      ctx.beginPath();
      ctx.moveTo(bladX, bladY);
      ctx.lineTo(bladX + (rng() - 0.5) * 2, bladY - 3 - rng() * 3);
      ctx.stroke();
    }
    
    // Fleurs occasionnelles
    if (rng() > 0.8) {
      const flowerX = px + (rng() - 0.5) * hexRadius;
      const flowerY = py + (rng() - 0.5) * hexRadius;
      
      ctx.fillStyle = `hsl(${rng() * 360}, 80%, 60%)`;
      ctx.beginPath();
      ctx.arc(flowerX, flowerY, 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }, [hexRadius]);

  // Rendu des héros
  const renderHero = useCallback((
    ctx: CanvasRenderingContext2D,
    hero: Hero,
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

  // Rendu des overlays (sélection, mouvement, etc.)
  const renderOverlays = useCallback((
    ctx: CanvasRenderingContext2D,
    tile: EnrichedTile,
    pixelPos: Position
  ) => {
    const { x: px, y: py } = pixelPos;
    const effectiveRadius = hexRadius * 0.95;
    
    // Tuile sélectionnée
    if (selectedTile && selectedTile.x === tile.x && selectedTile.y === tile.y) {
      ctx.strokeStyle = '#FFD700';
      ctx.lineWidth = 3;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3 - Math.PI / 2;
        const x = px + effectiveRadius * Math.cos(angle);
        const y = py + effectiveRadius * Math.sin(angle);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();
      ctx.setLineDash([]);
    }
    
    // Zone de mouvement
    if (movementMode && movementRange.some(pos => pos.x === tile.x && pos.y === tile.y)) {
      ctx.fillStyle = 'rgba(76, 175, 80, 0.3)';
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3 - Math.PI / 2;
        const x = px + effectiveRadius * Math.cos(angle);
        const y = py + effectiveRadius * Math.sin(angle);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fill();
    }
    
    // Tuile survolée
    if (hoveredTile && hoveredTile.x === tile.x && hoveredTile.y === tile.y) {
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3 - Math.PI / 2;
        const x = px + effectiveRadius * Math.cos(angle);
        const y = py + effectiveRadius * Math.sin(angle);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();
    }
  }, [selectedTile, movementMode, movementRange, hoveredTile, hexRadius]);

  // Rendu principal
  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !enrichedTiles.length) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Rendu des tuiles
    enrichedTiles.forEach((row, y) => {
      row.forEach((tile, x) => {
        const pixelPos = hexToPixel(x, y);
        
        // Skip si hors écran
        if (pixelPos.x < -hexRadius || pixelPos.x > canvas.width + hexRadius ||
            pixelPos.y < -hexRadius || pixelPos.y > canvas.height + hexRadius) {
          return;
        }
        
        // Rendu du terrain
        renderBiomeTile(ctx, tile, pixelPos);
        
        // Rendu du héros s'il y en a un
        if (tile.hero) {
          renderHero(ctx, tile.hero, pixelPos);
        }
        
        // Overlays
        renderOverlays(ctx, tile, pixelPos);
      });
    });
  }, [enrichedTiles, hexToPixel, renderBiomeTile, renderHero, renderOverlays]);

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