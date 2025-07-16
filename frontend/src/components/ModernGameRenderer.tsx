import React, { useCallback, useEffect, useRef, useMemo, forwardRef, useImperativeHandle } from 'react';
import { Tile, Hero, Creature, Structure } from '../types/game';
import { terrainSpriteService, TerrainTile } from '../services/terrainSpriteService';
import './ModernGameRenderer.css';

interface ModernGameRendererProps {
  map: Tile[][];
  heroes: Hero[];
  creatures: Creature[];
  structures: Structure[];
  selectedHero?: Hero | null;
  validMoves?: { x: number; y: number }[];
  validTargets?: { x: number; y: number }[];
  onTileClick?: (x: number, y: number) => void;
  onHeroClick?: (hero: Hero) => void;
  width?: number;
  height?: number;
  currentPlayer?: string;
  showFog?: boolean;
  showGrid?: boolean;
  showElevation?: boolean;
  showTransitions?: boolean;
}

export interface ModernGameRendererRef {
  centerOnPosition: (x: number, y: number) => void;
}

const ModernGameRenderer = forwardRef<ModernGameRendererRef, ModernGameRendererProps>(({
  map,
  heroes = [],
  creatures = [],
  structures = [],
  selectedHero,
  validMoves = [],
  validTargets = [],
  onTileClick,
  onHeroClick,
  width = 800,
  height = 600,
  currentPlayer,
  showFog = false,
  showGrid = true,
  showElevation = true,
  showTransitions = true
}, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const viewportRef = useRef({ x: 0, y: 0, zoom: 1 });
  
  // Hexagonal rendering constants
  const hexSize = 20;
  const hexWidth = hexSize * 2;
  const hexHeight = Math.sqrt(3) * hexSize;
  const hexVerticalSpacing = hexHeight * 0.75;
  const hexHorizontalSpacing = hexWidth * 0.875;

  // Transform backend tiles to TerrainTile format
  const terrainTiles = useMemo((): TerrainTile[] => {
    if (!map.length) return [];
    
    const tiles: TerrainTile[] = [];
    for (let y = 0; y < map.length; y++) {
      for (let x = 0; x < map[y].length; x++) {
        const tile = map[y][x];
        if (tile) {
          tiles.push({
            x: tile.x,
            y: tile.y,
            type: tile.type || tile.terrain,
            elevation: tile.elevation || 0.5,
            tilesetVariant: tile.tilesetVariant || 'medium',
            transitions: tile.transitions || {},
            biome: tile.biome || 'temperate',
            moistureLevel: tile.moistureLevel || 0.5,
            temperature: tile.temperature || 0.5,
            walkable: tile.walkable !== undefined ? tile.walkable : true,
            movementCost: tile.movementCost || 1
          });
        }
      }
    }
    return tiles;
  }, [map]);

  // Calculate visible area
  const visibleTiles = useMemo(() => {
    if (!terrainTiles.length) return [];
    
    const centerX = Math.floor(map[0]?.length / 2) || 0;
    const centerY = Math.floor(map.length / 2) || 0;
    
    // Show tiles in a radius around center
    const radius = 15;
    return terrainTiles.filter(tile => {
      const dx = tile.x - centerX;
      const dy = tile.y - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      return distance <= radius;
    });
  }, [terrainTiles, map]);

  // Convert tile coordinates to pixel coordinates
  const tileToPixel = useCallback((x: number, y: number): { x: number; y: number } => {
    const pixelX = x * hexHorizontalSpacing + (y % 2) * (hexHorizontalSpacing / 2);
    const pixelY = y * hexVerticalSpacing;
    return { x: pixelX, y: pixelY };
  }, [hexHorizontalSpacing, hexVerticalSpacing]);

  // Convert pixel coordinates to tile coordinates
  const pixelToTile = useCallback((pixelX: number, pixelY: number): { x: number; y: number } => {
    const adjustedY = Math.round(pixelY / hexVerticalSpacing);
    const adjustedX = Math.round((pixelX - (adjustedY % 2) * (hexHorizontalSpacing / 2)) / hexHorizontalSpacing);
    return { x: adjustedX, y: adjustedY };
  }, [hexHorizontalSpacing, hexVerticalSpacing]);

  // Draw a single hexagon
  const drawHexagon = useCallback((ctx: CanvasRenderingContext2D, x: number, y: number, size: number, fillColor: string, strokeColor: string = '#000') => {
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3;
      const hexX = x + size * Math.cos(angle);
      const hexY = y + size * Math.sin(angle);
      if (i === 0) {
        ctx.moveTo(hexX, hexY);
      } else {
        ctx.lineTo(hexX, hexY);
      }
    }
    ctx.closePath();
    ctx.fillStyle = fillColor;
    ctx.fill();
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 1;
    ctx.stroke();
  }, []);

  // Draw elevation indicators
  const drawElevationIndicators = useCallback((ctx: CanvasRenderingContext2D, tile: TerrainTile, pixelPos: { x: number; y: number }) => {
    if (!showElevation) return;
    
    const elevationHeight = tile.elevation * 10; // Scale elevation for visibility
    const elevationColor = `rgba(255, 255, 255, ${tile.elevation * 0.5})`;
    
    // Draw elevation as a small triangle
    ctx.beginPath();
    ctx.moveTo(pixelPos.x, pixelPos.y - elevationHeight);
    ctx.lineTo(pixelPos.x - 5, pixelPos.y - elevationHeight + 8);
    ctx.lineTo(pixelPos.x + 5, pixelPos.y - elevationHeight + 8);
    ctx.closePath();
    ctx.fillStyle = elevationColor;
    ctx.fill();
    
    // Draw elevation text
    ctx.fillStyle = '#000';
    ctx.font = '8px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(tile.elevation.toFixed(1), pixelPos.x, pixelPos.y + 15);
  }, [showElevation]);

  // Draw transition indicators
  const drawTransitionIndicators = useCallback((ctx: CanvasRenderingContext2D, tile: TerrainTile, pixelPos: { x: number; y: number }) => {
    if (!showTransitions || !tile.transitions || Object.keys(tile.transitions).length === 0) return;
    
    const transitionCount = Object.keys(tile.transitions).length;
    const indicatorSize = 3;
    const startAngle = 0;
    const angleStep = (2 * Math.PI) / transitionCount;
    
    Object.entries(tile.transitions).forEach(([direction, neighborTerrain], index) => {
      const angle = startAngle + index * angleStep;
      const indicatorX = pixelPos.x + Math.cos(angle) * (hexSize * 0.7);
      const indicatorY = pixelPos.y + Math.sin(angle) * (hexSize * 0.7);
      
      ctx.beginPath();
      ctx.arc(indicatorX, indicatorY, indicatorSize, 0, 2 * Math.PI);
      ctx.fillStyle = terrainSpriteService.getTerrainColor({
        ...tile,
        type: neighborTerrain
      });
      ctx.fill();
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 1;
      ctx.stroke();
    });
  }, [showTransitions, hexSize]);

  // Render terrain
  const renderTerrain = useCallback(async (ctx: CanvasRenderingContext2D) => {
    for (const tile of visibleTiles) {
      const pixelPos = tileToPixel(tile.x, tile.y);
      
      // Try to load terrain sprite
      const sprite = await terrainSpriteService.getTerrainSprite(tile);
      
      if (sprite) {
        // Draw sprite
        ctx.drawImage(
          sprite,
          pixelPos.x - hexSize,
          pixelPos.y - hexSize,
          hexSize * 2,
          hexSize * 2
        );
        
        // Draw transitions if enabled
        if (showTransitions) {
          for (const [direction, neighborTerrain] of Object.entries(tile.transitions)) {
            const transitionSprite = await terrainSpriteService.getTransitionSprite(tile, direction);
            if (transitionSprite) {
              ctx.drawImage(
                transitionSprite,
                pixelPos.x - hexSize,
                pixelPos.y - hexSize,
                hexSize * 2,
                hexSize * 2
              );
            }
          }
        }
      } else {
        // Fallback to colored hexagon
        const color = terrainSpriteService.getTerrainColor(tile);
        drawHexagon(ctx, pixelPos.x, pixelPos.y, hexSize, color, '#333');
      }
      
      // Draw elevation indicators
      drawElevationIndicators(ctx, tile, pixelPos);
      
      // Draw transition indicators
      drawTransitionIndicators(ctx, tile, pixelPos);
      
      // Draw grid if enabled
      if (showGrid) {
        drawHexagon(ctx, pixelPos.x, pixelPos.y, hexSize, 'transparent', '#666');
      }
    }
  }, [visibleTiles, tileToPixel, hexSize, showTransitions, showGrid, drawHexagon, drawElevationIndicators, drawTransitionIndicators]);

  // Draw heroes
  const drawHeroes = useCallback((ctx: CanvasRenderingContext2D) => {
    heroes.forEach(hero => {
      const pixelPos = tileToPixel(hero.position.x, hero.position.y);
      
      // Hero circle
      const isSelected = selectedHero?.id === hero.id;
      ctx.beginPath();
      ctx.arc(pixelPos.x, pixelPos.y, hexSize * 0.4, 0, 2 * Math.PI);
      ctx.fillStyle = isSelected ? '#FFD700' : '#4CAF50';
      ctx.fill();
      ctx.strokeStyle = isSelected ? '#FF9800' : '#2E7D32';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Hero name
      ctx.fillStyle = '#000';
      ctx.font = '10px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(hero.name, pixelPos.x, pixelPos.y + hexSize * 0.8);
    });
  }, [heroes, selectedHero, tileToPixel, hexSize]);

  // Draw creatures
  const drawCreatures = useCallback((ctx: CanvasRenderingContext2D) => {
    creatures.forEach(creature => {
      const pixelPos = tileToPixel(creature.position.x, creature.position.y);
      
      // Creature circle
      ctx.beginPath();
      ctx.arc(pixelPos.x, pixelPos.y, hexSize * 0.3, 0, 2 * Math.PI);
      ctx.fillStyle = '#F44336';
      ctx.fill();
      ctx.strokeStyle = '#D32F2F';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Creature name
      ctx.fillStyle = '#000';
      ctx.font = '8px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(creature.name, pixelPos.x, pixelPos.y + hexSize * 0.6);
    });
  }, [creatures, tileToPixel, hexSize]);

  // Draw structures
  const drawStructures = useCallback((ctx: CanvasRenderingContext2D) => {
    structures.forEach(structure => {
      const pixelPos = tileToPixel(structure.position.x, structure.position.y);
      
      // Structure square
      ctx.fillStyle = '#9C27B0';
      ctx.fillRect(pixelPos.x - hexSize * 0.3, pixelPos.y - hexSize * 0.3, hexSize * 0.6, hexSize * 0.6);
      ctx.strokeStyle = '#7B1FA2';
      ctx.lineWidth = 2;
      ctx.strokeRect(pixelPos.x - hexSize * 0.3, pixelPos.y - hexSize * 0.3, hexSize * 0.6, hexSize * 0.6);
      
      // Structure name
      ctx.fillStyle = '#000';
      ctx.font = '8px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(structure.name, pixelPos.x, pixelPos.y + hexSize * 0.7);
    });
  }, [structures, tileToPixel, hexSize]);

  // Draw valid moves
  const drawValidMoves = useCallback((ctx: CanvasRenderingContext2D) => {
    validMoves.forEach(move => {
      const pixelPos = tileToPixel(move.x, move.y);
      ctx.beginPath();
      ctx.arc(pixelPos.x, pixelPos.y, hexSize * 0.2, 0, 2 * Math.PI);
      ctx.fillStyle = 'rgba(76, 175, 80, 0.7)';
      ctx.fill();
    });
  }, [validMoves, tileToPixel, hexSize]);

  // Draw valid targets
  const drawValidTargets = useCallback((ctx: CanvasRenderingContext2D) => {
    validTargets.forEach(target => {
      const pixelPos = tileToPixel(target.x, target.y);
      ctx.beginPath();
      ctx.arc(pixelPos.x, pixelPos.y, hexSize * 0.2, 0, 2 * Math.PI);
      ctx.fillStyle = 'rgba(244, 67, 54, 0.7)';
      ctx.fill();
    });
  }, [validTargets, tileToPixel, hexSize]);

  // Main render function
  const render = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set up coordinate system
    ctx.save();
    ctx.translate(width / 2, height / 2);
    ctx.scale(viewportRef.current.zoom, viewportRef.current.zoom);
    ctx.translate(-viewportRef.current.x, -viewportRef.current.y);

    // Render terrain with David Gervais system
    await renderTerrain(ctx);

    // Render game objects
    drawValidMoves(ctx);
    drawValidTargets(ctx);
    drawStructures(ctx);
    drawCreatures(ctx);
    drawHeroes(ctx);

    ctx.restore();
  }, [width, height, renderTerrain, drawValidMoves, drawValidTargets, drawStructures, drawCreatures, drawHeroes]);

  // Handle canvas click
  const handleCanvasClick = useCallback((event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    // Transform to world coordinates
    const worldX = (clickX - width / 2) / viewportRef.current.zoom + viewportRef.current.x;
    const worldY = (clickY - height / 2) / viewportRef.current.zoom + viewportRef.current.y;

    const tilePos = pixelToTile(worldX, worldY);

    // Check if hero was clicked
    const clickedHero = heroes.find(hero => {
      const heroPixel = tileToPixel(hero.position.x, hero.position.y);
      const distance = Math.sqrt(Math.pow(worldX - heroPixel.x, 2) + Math.pow(worldY - heroPixel.y, 2));
      return distance <= hexSize * 0.4;
    });

    if (clickedHero && onHeroClick) {
      onHeroClick(clickedHero);
    } else if (onTileClick) {
      onTileClick(tilePos.x, tilePos.y);
    }
  }, [width, height, heroes, tileToPixel, pixelToTile, hexSize, onHeroClick, onTileClick]);

  // Center on position
  const centerOnPosition = useCallback((x: number, y: number) => {
    const pixelPos = tileToPixel(x, y);
    viewportRef.current.x = pixelPos.x;
    viewportRef.current.y = pixelPos.y;
    render();
  }, [tileToPixel, render]);

  // Expose methods via ref
  useImperativeHandle(ref, () => ({
    centerOnPosition
  }));

  // Render when dependencies change
  useEffect(() => {
    render();
  }, [render]);

  return (
    <div className="modern-game-renderer">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        onClick={handleCanvasClick}
        style={{ 
          border: '1px solid #ccc',
          cursor: 'pointer',
          backgroundColor: '#f0f0f0'
        }}
      />
    </div>
  );
});

ModernGameRenderer.displayName = 'ModernGameRenderer';

export default ModernGameRenderer; 