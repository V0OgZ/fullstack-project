import React, { useCallback } from 'react';
import { Position } from '../types/game';

interface SmartTerrainProps {
  ctx: CanvasRenderingContext2D;
  center: Position;
  terrain: string;
  radius: number;
  opacity?: number;
}

// Smart terrain renderer with smooth circular zones
export const renderSmartTerrain = ({ ctx, center, terrain, radius, opacity = 1.0 }: SmartTerrainProps) => {
  const { x, y } = center;
  
  // Create smooth circular terrain zones (no hexagons!)
  const smoothRadius = radius * 1.4; // Larger radius for seamless blending
  
  // Create gradient for smooth terrain
  const terrainGradient = ctx.createRadialGradient(x, y, 0, x, y, smoothRadius);
  
  // Set terrain colors based on type
  switch (terrain) {
    case 'grass':
      terrainGradient.addColorStop(0, '#7fb069');
      terrainGradient.addColorStop(0.6, '#6fa054');
      terrainGradient.addColorStop(1, '#5f9044');
      break;
    case 'forest':
      terrainGradient.addColorStop(0, '#386641');
      terrainGradient.addColorStop(0.6, '#2d5016');
      terrainGradient.addColorStop(1, '#1a3009');
      break;
    case 'mountain':
      terrainGradient.addColorStop(0, '#8d5524');
      terrainGradient.addColorStop(0.6, '#7d4514');
      terrainGradient.addColorStop(1, '#6d3504');
      break;
    case 'water':
      terrainGradient.addColorStop(0, '#4a9eff');
      terrainGradient.addColorStop(0.6, '#3a86ff');
      terrainGradient.addColorStop(1, '#2a76ef');
      break;
    case 'desert':
      terrainGradient.addColorStop(0, '#f4d03f');
      terrainGradient.addColorStop(0.6, '#e9c46a');
      terrainGradient.addColorStop(1, '#d9b45a');
      break;
    case 'swamp':
      terrainGradient.addColorStop(0, '#52796f');
      terrainGradient.addColorStop(0.6, '#42695f');
      terrainGradient.addColorStop(1, '#32594f');
      break;
    default:
      terrainGradient.addColorStop(0, '#7fb069');
      terrainGradient.addColorStop(1, '#5f9044');
  }
  
  // Draw smooth circular terrain
  ctx.save();
  ctx.globalAlpha = opacity;
  ctx.fillStyle = terrainGradient;
  ctx.beginPath();
  ctx.arc(x, y, smoothRadius, 0, Math.PI * 2);
  ctx.fill();
  
  // Add minimal water sparkles only
  if (terrain === 'water') {
    const waterSeed = x * 5 + y * 9;
    const time = Date.now() / 3000; // Slow animation
    
    for (let i = 0; i < 4; i++) {
      const sparkleX = x + Math.sin(waterSeed + i * 0.8) * 0.5 * radius;
      const sparkleY = y + Math.cos(waterSeed + i * 0.8) * 0.5 * radius;
      const sparkleIntensity = Math.sin(time + waterSeed + i * 0.7) * 0.3 + 0.5;
      
      ctx.fillStyle = `rgba(255, 255, 255, ${sparkleIntensity * opacity})`;
      ctx.beginPath();
      ctx.arc(sparkleX, sparkleY, 1.2, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  
  ctx.restore();
};

export default renderSmartTerrain; 