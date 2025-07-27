import React, { useRef, useEffect, useCallback } from 'react';
import { useGameStore } from '../store/useGameStore';

interface HexagonalTerrainRendererProps {
  width: number;
  height: number;
}

const HexagonalTerrainRenderer: React.FC<HexagonalTerrainRendererProps> = ({ width, height }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { map } = useGameStore();

  // Hexagonal constants
  const hexRadius = 25;
  const hexWidth = hexRadius * 2;
  const hexHeight = Math.sqrt(3) * hexRadius;

  // Convert hex coordinates to pixel coordinates
  const hexToPixel = useCallback((hexX: number, hexY: number) => {
    const x = hexRadius * (3/2 * hexX) + width / 2;
    const y = hexHeight * (Math.sqrt(3)/2 * hexX + Math.sqrt(3) * hexY) + height / 2;
    return { x, y };
  }, [hexRadius, hexHeight, width, height]);

  // Draw a hexagon
  const drawHexagon = useCallback((ctx: CanvasRenderingContext2D, x: number, y: number, fillColor: string, strokeColor: string = '#333') => {
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3;
      const px = x + Math.cos(angle) * hexRadius;
      const py = y + Math.sin(angle) * hexRadius;
      if (i === 0) {
        ctx.moveTo(px, py);
      } else {
        ctx.lineTo(px, py);
      }
    }
    ctx.closePath();
    
    ctx.fillStyle = fillColor;
    ctx.fill();
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 1;
    ctx.stroke();
  }, [hexRadius]);

  // Get terrain color
  const getTerrainColor = useCallback((terrain: string) => {
    const colors: { [key: string]: string } = {
      'WATER': '#4A90E2',
      'GRASS': '#7ED321',
      'FOREST': '#417505',
      'MOUNTAIN': '#8E8E93',
      'DESERT': '#F5A623',
      'SWAMP': '#5A6B3C'
    };
    return colors[terrain] || '#7ED321';
  }, []);

  // Render the hexagonal map
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
        
        // Skip if outside visible area
        if (pixelPos.x < -hexRadius || pixelPos.x > canvas.width + hexRadius ||
            pixelPos.y < -hexRadius || pixelPos.y > canvas.height + hexRadius) {
          continue;
        }

        const terrainColor = getTerrainColor(tile.terrain);
        drawHexagon(ctx, pixelPos.x, pixelPos.y, terrainColor);
      }
    }

    // Draw grid lines for better visibility
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 0.5;
    
    for (let y = 0; y < mapHeight; y++) {
      for (let x = 0; x < mapWidth; x++) {
        const pixelPos = hexToPixel(x, y);
        drawHexagon(ctx, pixelPos.x, pixelPos.y, 'transparent', 'rgba(255, 255, 255, 0.1)');
      }
    }
  }, [map, hexToPixel, drawHexagon, getTerrainColor]);

  // Render on mount and when dependencies change
  useEffect(() => {
    render();
  }, [render]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{
        border: '1px solid #333',
        backgroundColor: '#1a1a2e',
        display: 'block'
      }}
    />
  );
};

export default HexagonalTerrainRenderer; 