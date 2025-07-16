import React, { forwardRef, useRef, useCallback, useEffect, useImperativeHandle, useState, useMemo } from 'react';
import { useGameStore } from '../store/useGameStore';
import { Position, Tile, Hero } from '../types/game';
import './ModernGameRenderer.css';

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
  
  // Hexagonal rendering constants
  const hexSize = 20;
  const hexWidth = hexSize * 2;
  const hexHeight = Math.sqrt(3) * hexSize;
  const hexVerticalSpacing = hexHeight * 0.75;
  const hexHorizontalSpacing = hexWidth * 0.875;

  // Calculate visible area
  const visibleTiles = useMemo(() => {
    if (!map.length) return [];
    
    const tiles: Tile[] = [];
    const centerX = Math.floor(map[0].length / 2);
    const centerY = Math.floor(map.length / 2);
    
    // Show tiles in a radius around center
    const radius = 15;
    for (let y = Math.max(0, centerY - radius); y <= Math.min(map.length - 1, centerY + radius); y++) {
      for (let x = Math.max(0, centerX - radius); x <= Math.min(map[0].length - 1, centerX + radius); x++) {
        if (map[y] && map[y][x]) {
          tiles.push(map[y][x]);
        }
      }
    }
    
    return tiles;
  }, [map]);

  // Convert tile coordinates to pixel coordinates
  const tileToPixel = useCallback((x: number, y: number): { x: number; y: number } => {
    const pixelX = x * hexHorizontalSpacing + (y % 2) * (hexHorizontalSpacing / 2);
    const pixelY = y * hexVerticalSpacing;
    return { x: pixelX, y: pixelY };
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

  // Get terrain color
  const getTerrainColor = useCallback((terrain: string): string => {
    switch (terrain) {
      case 'grass': return '#90EE90';
      case 'forest': return '#228B22';
      case 'mountain': return '#8B4513';
      case 'water': return '#4169E1';
      case 'desert': return '#F4A460';
      default: return '#90EE90';
    }
  }, []);

  // Handle canvas click
  const handleCanvasClick = useCallback((event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || !onTileClick) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Convert pixel coordinates to tile coordinates
    const tileY = Math.floor(y / hexVerticalSpacing);
    const tileX = Math.floor((x - (tileY % 2) * (hexHorizontalSpacing / 2)) / hexHorizontalSpacing);
    
    if (tileX >= 0 && tileY >= 0 && map[tileY] && map[tileY][tileX]) {
      onTileClick({ x: tileX, y: tileY });
    }
  }, [onTileClick, map, hexVerticalSpacing, hexHorizontalSpacing]);

  // Render the game map
  const renderMap = useCallback(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw tiles
    visibleTiles.forEach(tile => {
      const pixelPos = tileToPixel(tile.x, tile.y);
      const terrainColor = getTerrainColor(tile.terrain);
      
      // Draw hexagon
      drawHexagon(ctx, pixelPos.x, pixelPos.y, hexSize, terrainColor);
      
      // Draw hero if present
      if (tile.hero) {
        ctx.fillStyle = '#FFD700';
        ctx.beginPath();
        ctx.arc(pixelPos.x, pixelPos.y, hexSize * 0.3, 0, 2 * Math.PI);
        ctx.fill();
        
        // Hero name
        ctx.fillStyle = '#000';
        ctx.font = '10px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(tile.hero.name, pixelPos.x, pixelPos.y + hexSize + 12);
      }
      
      // Draw creature if present
      if (tile.creature) {
        ctx.fillStyle = '#FF4500';
        ctx.beginPath();
        ctx.arc(pixelPos.x, pixelPos.y, hexSize * 0.2, 0, 2 * Math.PI);
        ctx.fill();
      }
      
      // Draw structure if present
      if (tile.structure) {
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(pixelPos.x - hexSize * 0.3, pixelPos.y - hexSize * 0.3, hexSize * 0.6, hexSize * 0.6);
      }
    });
    
    // Draw movement range if hero is selected
    if (selectedHero) {
      // This would be implemented with pathfinding logic
      // For now, just highlight the selected hero
      const heroTile = visibleTiles.find(tile => tile.hero?.id === selectedHero.id);
      if (heroTile) {
        const pixelPos = tileToPixel(heroTile.x, heroTile.y);
        ctx.strokeStyle = '#FFD700';
        ctx.lineWidth = 3;
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const angle = (i * Math.PI) / 3;
          const hexX = pixelPos.x + hexSize * Math.cos(angle);
          const hexY = pixelPos.y + hexSize * Math.sin(angle);
          if (i === 0) {
            ctx.moveTo(hexX, hexY);
          } else {
            ctx.lineTo(hexX, hexY);
          }
        }
        ctx.closePath();
        ctx.stroke();
      }
    }
  }, [visibleTiles, tileToPixel, getTerrainColor, drawHexagon, hexSize, selectedHero]);

  // Expose methods via ref
  useImperativeHandle(ref, () => ({
    centerOnPosition: (position: Position) => {
      // Implementation for centering on a specific position
      console.log('Center on position:', position);
    }
  }));

  // Render when dependencies change
  useEffect(() => {
    renderMap();
  }, [renderMap]);

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