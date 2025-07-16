import React, { useCallback } from 'react';
import { Position } from '../types/game';

interface SmartTerrainProps {
  ctx: CanvasRenderingContext2D;
  center: Position;
  terrain: string;
  radius: number;
  opacity?: number;
}

// Smart HEXAGONAL terrain renderer (BESTAGON!) with seamless textures
export const renderSmartTerrain = ({ ctx, center, terrain, radius, opacity = 1.0 }: SmartTerrainProps) => {
  const { x, y } = center;
  
  // Create perfect hexagon path (BESTAGON geometry!)
  ctx.save();
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const angle = (i * Math.PI) / 3;
    const hx = x + radius * Math.cos(angle);
    const hy = y + radius * Math.sin(angle);
    if (i === 0) {
      ctx.moveTo(hx, hy);
    } else {
      ctx.lineTo(hx, hy);
    }
  }
  ctx.closePath();
  ctx.clip(); // Clip to hexagon shape
  
  // Create radial gradient within hexagon for depth
  const terrainGradient = ctx.createRadialGradient(x, y, 0, x, y, radius * 1.2);
  
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
  
  // Fill hexagon with terrain gradient
  ctx.globalAlpha = opacity;
  ctx.fillStyle = terrainGradient;
  ctx.fill();
  
  // Add seamless terrain textures (Diablo/Heroes style)
  drawSeamlessTexture(ctx, x, y, terrain, radius, opacity);
  
  ctx.restore();
};

// Draw seamless textures that connect perfectly between hexagons
const drawSeamlessTexture = (ctx: CanvasRenderingContext2D, x: number, y: number, terrain: string, radius: number, opacity: number) => {
  const seed = x * 7 + y * 11; // Deterministic seed based on position
  
  switch (terrain) {
    case 'grass':
      // Grass blades that align with hexagon edges
      for (let i = 0; i < 8; i++) {
        const grassX = x + Math.sin(seed + i * 0.8) * radius * 0.6;
        const grassY = y + Math.cos(seed + i * 0.8) * radius * 0.6;
        const grassHeight = 3 + Math.abs(Math.sin(seed + i)) * 4;
        
        ctx.strokeStyle = `rgba(95, 144, 68, ${(0.4 + Math.sin(seed + i * 0.3) * 0.3) * opacity})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(grassX, grassY);
        ctx.lineTo(grassX + Math.sin(seed + i * 0.5) * 2, grassY - grassHeight);
        ctx.stroke();
      }
      break;
      
    case 'forest':
      // Tree clusters that respect hexagon boundaries
      for (let i = 0; i < 4; i++) {
        const treeX = x + Math.sin(seed + i * 1.2) * radius * 0.5;
        const treeY = y + Math.cos(seed + i * 1.2) * radius * 0.5;
        const treeSize = 2 + Math.abs(Math.sin(seed + i * 0.7)) * 3;
        
        ctx.fillStyle = `rgba(26, 48, 9, ${(0.5 + Math.sin(seed + i * 0.4) * 0.3) * opacity})`;
        ctx.beginPath();
        ctx.arc(treeX, treeY, treeSize, 0, Math.PI * 2);
        ctx.fill();
      }
      break;
      
    case 'water':
      // Water sparkles that don't cross hexagon borders
      const time = Date.now() / 3000;
      for (let i = 0; i < 5; i++) {
        const sparkleX = x + Math.sin(seed + i * 0.9) * radius * 0.6;
        const sparkleY = y + Math.cos(seed + i * 0.9) * radius * 0.6;
        const sparkleIntensity = Math.sin(time + seed + i * 0.8) * 0.4 + 0.6;
        
        ctx.fillStyle = `rgba(255, 255, 255, ${sparkleIntensity * opacity})`;
        ctx.beginPath();
        ctx.arc(sparkleX, sparkleY, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
      break;
      
    case 'desert':
      // Sand dunes that flow naturally within hexagon
      for (let i = 0; i < 3; i++) {
        const duneX = x + Math.sin(seed + i * 1.4) * radius * 0.4;
        const duneY = y + Math.cos(seed + i * 1.4) * radius * 0.4;
        const duneW = 6 + Math.abs(Math.sin(seed + i * 0.6)) * 8;
        const duneH = 3 + Math.abs(Math.cos(seed + i * 0.5)) * 4;
        
        ctx.fillStyle = `rgba(233, 196, 106, ${(0.3 + Math.sin(seed + i * 0.2) * 0.2) * opacity})`;
        ctx.beginPath();
        ctx.ellipse(duneX, duneY, duneW, duneH, Math.sin(seed + i) * Math.PI, 0, Math.PI * 2);
        ctx.fill();
      }
      break;
      
    case 'mountain':
      // Rocky texture within hexagon bounds
      for (let i = 0; i < 6; i++) {
        const rockX = x + Math.sin(seed + i * 1.1) * radius * 0.7;
        const rockY = y + Math.cos(seed + i * 1.1) * radius * 0.7;
        const rockSize = 1 + Math.abs(Math.sin(seed + i * 0.8)) * 2;
        
        ctx.fillStyle = `rgba(109, 53, 4, ${(0.4 + Math.sin(seed + i * 0.3) * 0.3) * opacity})`;
        ctx.beginPath();
        ctx.arc(rockX, rockY, rockSize, 0, Math.PI * 2);
        ctx.fill();
      }
      break;
  }
};

export default renderSmartTerrain; 