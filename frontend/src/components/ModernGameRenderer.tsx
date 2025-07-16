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

  // Rendu principal
  const render = useCallback(() => {
    if (!canvasRef.current || !map || map.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Fond
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Dessiner les tuiles hexagonales
    const mapWidth = map[0].length;
    const mapHeight = map.length;
    
    for (let y = 0; y < mapHeight; y++) {
      for (let x = 0; x < mapWidth; x++) {
        const tile = map[y][x];
        if (!tile) continue;

        const pixelPos = hexToPixel(x, y);
        
        // Vérifier si la tuile est visible
        if (pixelPos.x < -hexRadius || pixelPos.x > canvas.width + hexRadius ||
            pixelPos.y < -hexRadius || pixelPos.y > canvas.height + hexRadius) {
          continue;
        }

        // Dessiner la tuile
        renderTileContent(ctx, tile, pixelPos.x, pixelPos.y, hexRadius);

        // Dessiner le héros s'il y en a un
        if (tile.hero) {
          renderHero(ctx, tile.hero, pixelPos);
        }
      }
    }

    // Dessiner les overlays
    renderOverlays(ctx);
  }, [map, hexToPixel, renderTileContent, renderHero, renderOverlays]);

  // Gestion des clics
  const handleCanvasClick = useCallback((event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || !map || map.length === 0) return;
    
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    
    // Trouver la tuile cliquée
    for (let y = 0; y < map.length; y++) {
      for (let x = 0; x < map[y].length; x++) {
        const pixelPos = hexToPixel(x, y);
        const distance = Math.sqrt(
          Math.pow(mouseX - pixelPos.x, 2) + Math.pow(mouseY - pixelPos.y, 2)
        );
        
        if (distance <= hexRadius) {
          setSelectedTile({ x, y });
          if (onTileClick) {
            onTileClick({ x, y });
          }
          return;
        }
      }
    }
  }, [map, hexToPixel, hexRadius, setSelectedTile, onTileClick]);

  // Gestion du survol
  const handleCanvasMouseMove = useCallback((event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || !map || map.length === 0) return;
    
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    
    let foundTile: Position | null = null;
    
    for (let y = 0; y < map.length; y++) {
      for (let x = 0; x < map[y].length; x++) {
        const pixelPos = hexToPixel(x, y);
        const distance = Math.sqrt(
          Math.pow(mouseX - pixelPos.x, 2) + Math.pow(mouseY - pixelPos.y, 2)
        );
        
        if (distance <= hexRadius) {
          foundTile = { x, y };
          break;
        }
      }
      if (foundTile) break;
    }
    
    setHoveredTile(foundTile);
  }, [map, hexToPixel, hexRadius]);

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
        <div>Carte: {map?.length || 0}x{map?.[0]?.length || 0}</div>
        {hoveredTile && (
          <div>
            Tuile: {hoveredTile.x},{hoveredTile.y} - 
            {map?.[hoveredTile.y]?.[hoveredTile.x]?.terrain}
          </div>
        )}
        {selectedHero && (
          <div>
            Héros: {selectedHero.name} - Pos: ({selectedHero.position?.x},{selectedHero.position?.y})
          </div>
        )}
      </div>
    </div>
  );
});

export default ModernGameRenderer; 