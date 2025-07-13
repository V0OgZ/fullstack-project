import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { useGameStore } from '../store/useGameStore';
import { Position, Tile, Hero } from '../types/game';
import { useTranslation } from '../i18n';
import './ModernGameRenderer.css';

interface ModernGameRendererProps {
  width: number;
  height: number;
}

interface AnimatedElement {
  id: string;
  type: 'hero' | 'effect' | 'particle';
  position: Position;
  targetPosition?: Position;
  startTime: number;
  duration: number;
  color: string;
  size: number;
}

const ModernGameRenderer: React.FC<ModernGameRendererProps> = ({ width, height }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const { map, currentGame, selectedTile, setSelectedTile, visibleZFCs, moveHero, attackTarget, collectResource } = useGameStore();
  const { t } = useTranslation();
  
  const [animatedElements, setAnimatedElements] = useState<AnimatedElement[]>([]);
  const [hoveredTile, setHoveredTile] = useState<Position | null>(null);
  const [selectedHeroId, setSelectedHeroId] = useState<string | null>(null);
  const [validMoveTiles, setValidMoveTiles] = useState<Position[]>([]);
  const [validTargets, setValidTargets] = useState<{position: Position, type: 'enemy' | 'resource'}[]>([]);

  // Render configuration
  const config = useMemo(() => ({
    tileSize: 50,
    hexRadius: 25,
    hexWidth: 43.3,
    hexHeight: 50,
    offsetX: 50,
    offsetY: 50,
    colors: {
      grass: '#4CAF50',
      forest: '#2E7D32',
      mountain: '#795548',
      water: '#2196F3',
      desert: '#FFC107',
      swamp: '#8BC34A',
      default: '#4CAF50',
      selected: '#FFD700',
      hover: '#FFA726',
      zfc: {
        friendly: 'rgba(76, 175, 80, 0.3)',
        enemy: 'rgba(244, 67, 54, 0.3)',
        neutral: 'rgba(255, 193, 7, 0.3)',
        locked: 'rgba(156, 39, 176, 0.5)'
      }
    }
  }), []);

  // Conversion coordonnées hexagonales (pointy-top hexagons)
  const hexToPixel = useCallback((hex: Position): Position => {
    const x = config.hexWidth * (hex.x + hex.y * 0.5) + config.offsetX;
    const y = config.hexHeight * hex.y * 0.75 + config.offsetY;
    return { x, y };
  }, [config.hexWidth, config.hexHeight, config.offsetX, config.offsetY]);

  const pixelToHex = useCallback((pixel: Position): Position => {
    const adjustedX = (pixel.x - config.offsetX) / config.hexWidth;
    const adjustedY = (pixel.y - config.offsetY) / (config.hexHeight * 0.75);
    
    const y = Math.round(adjustedY);
    const x = Math.round(adjustedX - y * 0.5);
    
    return { x, y };
  }, [config.hexWidth, config.hexHeight, config.offsetX, config.offsetY]);

  // Rendu d'une structure
  const drawStructure = useCallback((
    ctx: CanvasRenderingContext2D,
    center: Position,
    structure: any
  ) => {
    const { x, y } = center;
    const size = 22;

    // Halo de la structure
    ctx.beginPath();
    ctx.arc(x, y, size + 4, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(139, 69, 19, 0.3)';
    ctx.fill();

    // Fond de la structure avec gradient
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, size);
    gradient.addColorStop(0, '#DEB887');
    gradient.addColorStop(1, '#8B4513');
    
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
    ctx.strokeStyle = '#654321';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Icône de la structure avec des formes géométriques au lieu d'émojis
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    
    // Dessiner différentes formes selon le type
    if (structure.type === 'castle') {
      // Château - forme rectangulaire avec créneaux
      ctx.fillRect(x - 8, y - 8, 16, 16);
      ctx.strokeRect(x - 8, y - 8, 16, 16);
      // Créneaux
      ctx.fillRect(x - 10, y - 10, 4, 4);
      ctx.fillRect(x - 2, y - 10, 4, 4);
      ctx.fillRect(x + 6, y - 10, 4, 4);
    } else if (structure.type === 'gold_mine') {
      // Mine d'or - forme de diamant
      ctx.beginPath();
      ctx.moveTo(x, y - 8);
      ctx.lineTo(x + 8, y);
      ctx.lineTo(x, y + 8);
      ctx.lineTo(x - 8, y);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    } else if (structure.type === 'village') {
      // Village - forme de maison
      ctx.beginPath();
      ctx.moveTo(x, y - 8);
      ctx.lineTo(x + 8, y);
      ctx.lineTo(x + 6, y + 8);
      ctx.lineTo(x - 6, y + 8);
      ctx.lineTo(x - 8, y);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    } else {
      // Défaut - cercle
      ctx.beginPath();
      ctx.arc(x, y, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }

    // Indicateur de propriétaire
    if (structure.owner) {
      ctx.beginPath();
      ctx.arc(x + 15, y - 15, 6, 0, Math.PI * 2);
      ctx.fillStyle = structure.owner === 'player1' ? '#4CAF50' : '#F44336';
      ctx.fill();
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Nom de la structure avec contour
    ctx.fillStyle = 'white';
    ctx.font = 'bold 9px Arial';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.strokeText(structure.name, x, y + 32);
    ctx.fillText(structure.name, x, y + 32);
  }, []);

  // Rendu d'une créature
  const drawCreature = useCallback((
    ctx: CanvasRenderingContext2D,
    center: Position,
    creature: any
  ) => {
    const { x, y } = center;
    const size = 15;

    ctx.beginPath();
    ctx.arc(x, y + 10, size, 0, Math.PI * 2);
    ctx.fillStyle = '#9C27B0';
    ctx.fill();
    ctx.strokeStyle = '#7B1FA2';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Forme géométrique pour la créature
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    
    // Triangle pour représenter la créature
    ctx.beginPath();
    ctx.moveTo(x, y + 5);
    ctx.lineTo(x - 6, y + 15);
    ctx.lineTo(x + 6, y + 15);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }, []);

  // Rendu d'un héros
  const drawHero = useCallback((
    ctx: CanvasRenderingContext2D,
    center: Position,
    hero: Hero
  ) => {
    const { x, y } = center;
    const size = 18;

    // Halo autour du héros
    ctx.beginPath();
    ctx.arc(x, y, size + 3, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 215, 0, 0.4)';
    ctx.fill();

    // Cercle de base avec gradient
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, size);
    gradient.addColorStop(0, '#FFD700');
    gradient.addColorStop(1, '#FFA500');
    
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
    ctx.strokeStyle = '#B8860B';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Symbole héros avec formes géométriques
    ctx.fillStyle = '#8B4513';
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 1;
    
    // Épée stylisée
    ctx.beginPath();
    ctx.moveTo(x, y - 8);
    ctx.lineTo(x, y + 8);
    ctx.moveTo(x - 4, y - 4);
    ctx.lineTo(x + 4, y - 4);
    ctx.stroke();

    // Niveau du héros
    ctx.beginPath();
    ctx.arc(x + 12, y - 12, 8, 0, Math.PI * 2);
    ctx.fillStyle = '#FF4444';
    ctx.fill();
    ctx.strokeStyle = '#CC0000';
    ctx.lineWidth = 1;
    ctx.stroke();
    
    ctx.fillStyle = 'white';
    ctx.font = 'bold 10px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(hero.level.toString(), x + 12, y - 12);

    // Nom du héros avec contour
    ctx.fillStyle = 'white';
    ctx.font = 'bold 11px Arial';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 3;
    ctx.strokeText(hero.name, x, y + 28);
    ctx.fillText(hero.name, x, y + 28);

    // Barre de mouvement
    const mpBarWidth = 30;
    const mpBarHeight = 4;
    const mpRatio = hero.movementPoints / hero.maxMovementPoints;
    
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(x - mpBarWidth/2, y + 35, mpBarWidth, mpBarHeight);
    
    ctx.fillStyle = mpRatio > 0.5 ? '#4CAF50' : mpRatio > 0.2 ? '#FF9800' : '#F44336';
    ctx.fillRect(x - mpBarWidth/2, y + 35, mpBarWidth * mpRatio, mpBarHeight);
  }, []);

  // Render hexagonal tile
  const drawHexTile = useCallback((
    ctx: CanvasRenderingContext2D,
    center: Position,
    tile: Tile,
    isSelected: boolean,
    isHovered: boolean
  ) => {
    const { x, y } = center;
    const radius = config.hexRadius;

    // Create hexagonal path
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i - Math.PI / 2;
      const hexX = x + radius * Math.cos(angle);
      const hexY = y + radius * Math.sin(angle);
      if (i === 0) {
        ctx.moveTo(hexX, hexY);
      } else {
        ctx.lineTo(hexX, hexY);
      }
    }
    ctx.closePath();

    // Fill with terrain color - Fix the color mapping
    let baseColor = config.colors.default;
    const terrainKey = tile.terrain;
    
    if (terrainKey && config.colors[terrainKey as keyof typeof config.colors]) {
      const colorValue = config.colors[terrainKey as keyof typeof config.colors];
      if (typeof colorValue === 'string') {
        baseColor = colorValue;
      }
    }
    
    ctx.fillStyle = baseColor;
    ctx.fill();

    // Visual feedback for valid moves
    const isValidMove = validMoveTiles.some(t => t.x === tile.x && t.y === tile.y);
    if (isValidMove) {
      ctx.fillStyle = 'rgba(46, 204, 113, 0.4)';
      ctx.fill();
    }

    // Visual feedback for valid targets
    const isValidTarget = validTargets.some(t => t.position.x === tile.x && t.position.y === tile.y);
    if (isValidTarget) {
      const targetType = validTargets.find(t => t.position.x === tile.x && t.position.y === tile.y)?.type;
      if (targetType === 'enemy') {
        ctx.fillStyle = 'rgba(231, 76, 60, 0.4)';
      } else {
        ctx.fillStyle = 'rgba(243, 156, 18, 0.4)';
      }
      ctx.fill();
    }

    // Visual feedback for selected hero
    const isSelectedHero = tile.hero && selectedHeroId === tile.hero.id;
    if (isSelectedHero) {
      ctx.fillStyle = 'rgba(255, 215, 0, 0.6)';
      ctx.fill();
    }

    // Hover effect
    if (isHovered) {
      ctx.fillStyle = config.colors.hover;
      ctx.globalAlpha = 0.3;
      ctx.fill();
      ctx.globalAlpha = 1;
    }

    // Selection border
    if (isSelected) {
      ctx.strokeStyle = config.colors.selected;
      ctx.lineWidth = 3;
      ctx.stroke();
    } else {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Draw structure if present
    if (tile.structure) {
      drawStructure(ctx, center, tile.structure);
    }

    // Draw creature if present
    if (tile.creature) {
      drawCreature(ctx, center, tile.creature);
    }

    // Draw hero if present
    if (tile.hero) {
      drawHero(ctx, center, tile.hero);
    }
  }, [config, drawStructure, drawCreature, drawHero, validMoveTiles, validTargets, selectedHeroId]);

  // Render ZFC zones
  const drawZFCZones = useCallback((ctx: CanvasRenderingContext2D) => {
    visibleZFCs.forEach(zfc => {
      zfc.reachableTiles.forEach(tile => {
        const center = hexToPixel(tile);
        
        // Draw zone
        ctx.beginPath();
        const radius = config.hexRadius;
        for (let i = 0; i < 6; i++) {
          const angle = (Math.PI / 3) * i - Math.PI / 2;
          const hexX = center.x + radius * Math.cos(angle);
          const hexY = center.y + radius * Math.sin(angle);
          if (i === 0) {
            ctx.moveTo(hexX, hexY);
          } else {
            ctx.lineTo(hexX, hexY);
          }
        }
        ctx.closePath();

        // Color by zone type
        ctx.fillStyle = config.colors.zfc.friendly;
        ctx.fill();
        
        // Animated border
        const time = Date.now() / 1000;
        const alpha = 0.5 + 0.3 * Math.sin(time * 2);
        ctx.strokeStyle = `rgba(76, 175, 80, ${alpha})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      });
    });
  }, [visibleZFCs, hexToPixel, config]);

  // Rendu des effets de particules
  const drawParticles = useCallback((ctx: CanvasRenderingContext2D) => {
    const currentTime = Date.now();
    
    animatedElements.forEach(element => {
      const progress = Math.min(1, (currentTime - element.startTime) / element.duration);
      
      if (element.type === 'particle') {
        const pixel = hexToPixel(element.position);
        const alpha = 1 - progress;
        const size = element.size * (1 + progress * 0.5);
        
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(pixel.x, pixel.y, size, 0, Math.PI * 2);
        ctx.fillStyle = element.color;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    });

    // Nettoyer les éléments expirés
    setAnimatedElements(prev => 
      prev.filter(el => (currentTime - el.startTime) < el.duration)
    );
  }, [animatedElements, hexToPixel]);

  // Ajouter un effet de particule
  const addParticleEffect = useCallback((position: Position, color: string) => {
    const newParticle: AnimatedElement = {
      id: `particle_${Date.now()}_${Math.random()}`,
      type: 'particle',
      position,
      startTime: Date.now(),
      duration: 1000,
      color,
      size: 5
    };
    
    setAnimatedElements(prev => [...prev, newParticle]);
  }, []);

  // Helper function to calculate valid moves for a hero
  const calculateValidMoves = useCallback((hero: Hero): Position[] => {
    if (!map || !map.length) return [];
    
    const validMoves: Position[] = [];
    const maxDistance = hero.movementPoints;
    
    for (let y = 0; y < map.length; y++) {
      for (let x = 0; x < map[y].length; x++) {
        const distance = Math.abs(x - hero.position.x) + Math.abs(y - hero.position.y);
        if (distance <= maxDistance && map[y][x].walkable && !map[y][x].hero) {
          validMoves.push({ x, y });
        }
      }
    }
    
    return validMoves;
  }, [map]);

  // Helper function to find valid targets
  const findValidTargets = useCallback((hero: Hero): {position: Position, type: 'enemy' | 'resource'}[] => {
    if (!map || !map.length) return [];
    
    const targets: {position: Position, type: 'enemy' | 'resource'}[] = [];
    const maxDistance = 1; // Attack range
    
    for (let y = 0; y < map.length; y++) {
      for (let x = 0; x < map[y].length; x++) {
        const distance = Math.abs(x - hero.position.x) + Math.abs(y - hero.position.y);
        if (distance <= maxDistance) {
          if (map[y][x].creature) {
            targets.push({ position: { x, y }, type: 'enemy' });
          } else if (map[y][x].structure && map[y][x].structure?.owner !== hero.playerId) {
            targets.push({ position: { x, y }, type: 'enemy' });
          } else if (map[y][x].structure && map[y][x].structure?.type === 'gold_mine') {
            targets.push({ position: { x, y }, type: 'resource' });
          }
        }
      }
    }
    
    return targets;
  }, [map]);

  // Handle hero selection and action execution
  const handleTileClick = useCallback(async (position: Position) => {
    if (!map || !currentGame) return;
    
    const tile = map[position.y]?.[position.x];
    if (!tile) return;
    
    // If clicking on a hero, select it
    if (tile.hero && tile.hero.playerId === currentGame.currentPlayerTurn) {
      setSelectedHeroId(tile.hero.id);
      const validMoves = calculateValidMoves(tile.hero);
      const validTargets = findValidTargets(tile.hero);
      setValidMoveTiles(validMoves);
      setValidTargets(validTargets);
      console.log(`🎯 Selected hero: ${tile.hero.name}`);
      return;
    }
    
    // If a hero is selected, try to perform an action
    if (selectedHeroId) {
      const selectedHero = currentGame.players
        .flatMap(p => p.heroes)
        .find(h => h.id === selectedHeroId);
      
      if (!selectedHero) return;
      
      // Check if clicking on a valid move tile
      if (validMoveTiles.some(t => t.x === position.x && t.y === position.y)) {
        try {
          await moveHero(selectedHeroId, position);
          console.log(`🚶 Moved hero to (${position.x}, ${position.y})`);
          setSelectedHeroId(null);
          setValidMoveTiles([]);
          setValidTargets([]);
        } catch (error) {
          console.error('Failed to move hero:', error);
        }
        return;
      }
      
      // Check if clicking on a valid target
      const target = validTargets.find(t => t.position.x === position.x && t.position.y === position.y);
      if (target) {
        try {
          if (target.type === 'enemy') {
            const targetId = tile.creature?.id || tile.structure?.id;
            if (targetId) {
              await attackTarget(selectedHeroId, targetId);
              console.log(`⚔️ Attacking target at (${position.x}, ${position.y})`);
            }
          } else if (target.type === 'resource') {
            const objectId = tile.structure?.id;
            if (objectId) {
              await collectResource(selectedHeroId, objectId);
              console.log(`💎 Collecting resource at (${position.x}, ${position.y})`);
            }
          }
          setSelectedHeroId(null);
          setValidMoveTiles([]);
          setValidTargets([]);
        } catch (error) {
          console.error('Failed to perform action:', error);
        }
        return;
      }
      
      // If clicking elsewhere, deselect hero
      setSelectedHeroId(null);
      setValidMoveTiles([]);
      setValidTargets([]);
    }
    
    // Set selected tile for info display
    setSelectedTile(position);
  }, [map, currentGame, selectedHeroId, validMoveTiles, validTargets, moveHero, attackTarget, collectResource, calculateValidMoves, findValidTargets, setSelectedTile]);

  // Handle keyboard events
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setSelectedHeroId(null);
      setValidMoveTiles([]);
      setValidTargets([]);
      console.log('🎯 Hero deselected');
    }
  }, []);

  // Add keyboard event listener
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  // Main render loop
  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw gradient background
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#1a1a2e');
    gradient.addColorStop(1, '#16213e');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    if (!map || map.length === 0) {
      // Loading message
      ctx.fillStyle = '#FFD700';
      ctx.font = '24px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(t('loadingMap'), width / 2, height / 2);
      return;
    }

    // Draw ZFC zones in background
    drawZFCZones(ctx);

    // Draw tiles
    map.forEach((row, y) => {
      row.forEach((tile, x) => {
        const center = hexToPixel({ x, y });
        
        const isSelected = selectedTile?.x === x && selectedTile?.y === y;
        const isHovered = hoveredTile?.x === x && hoveredTile?.y === y;
        
        drawHexTile(ctx, center, tile, isSelected, isHovered);
      });
    });

    // Draw all player heroes
    if (currentGame && currentGame.players) {
      currentGame.players.forEach(player => {
        player.heroes.forEach(hero => {
          const center = hexToPixel(hero.position);
          drawHero(ctx, center, hero);
        });
      });
    }

    // Draw particle effects
    drawParticles(ctx);

    // Schedule next render
    animationRef.current = requestAnimationFrame(render);
  }, [map, selectedTile, hoveredTile, width, height, drawZFCZones, drawHexTile, drawParticles, hexToPixel, currentGame, drawHero, t]);

  // Gestion des événements de souris
  const handleMouseMove = useCallback((event: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const hexCoord = pixelToHex({ x, y });
    
    if (map && hexCoord.y >= 0 && hexCoord.y < map.length && 
        hexCoord.x >= 0 && hexCoord.x < map[0].length) {
      setHoveredTile(hexCoord);
    } else {
      setHoveredTile(null);
    }
  }, [map, pixelToHex]);

  const handleMouseLeave = useCallback(() => {
    setHoveredTile(null);
  }, []);

  const handleClick = useCallback((event: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const hexCoord = pixelToHex({ x, y });
    
    if (map && hexCoord.y >= 0 && hexCoord.y < map.length && 
        hexCoord.x >= 0 && hexCoord.x < map[0].length) {
      handleTileClick(hexCoord);
    }
  }, [map, pixelToHex, handleTileClick]);

  // Initialiser le rendu
  useEffect(() => {
    render();
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [render]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        border: '1px solid #444',
        borderRadius: '8px',
        cursor: 'crosshair',
        imageRendering: 'pixelated'
      }}
    />
  );
};

export default ModernGameRenderer; 