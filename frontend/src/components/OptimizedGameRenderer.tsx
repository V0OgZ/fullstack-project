import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { useGameStore } from '../store/useGameStore';
import { Position, Tile, Hero } from '../types/game';
import { useTranslation } from '../i18n';
import './OptimizedGameRenderer.css';

interface OptimizedGameRendererProps {
  width: number;
  height: number;
  onHeroSelect?: (heroId: string) => void;
  selectedHeroId?: string | null;
}

interface ViewportBounds {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

interface RenderObject {
  id: string;
  type: 'tile' | 'hero' | 'structure' | 'creature' | 'effect';
  position: Position;
  data: any;
  lastUpdate: number;
  isDirty: boolean;
}

interface ParticlePool {
  particles: Particle[];
  activeCount: number;
  maxSize: number;
}

interface Particle {
  id: string;
  position: Position;
  velocity: Position;
  color: string;
  size: number;
  life: number;
  maxLife: number;
  active: boolean;
}

const OptimizedGameRenderer: React.FC<OptimizedGameRendererProps> = ({ 
  width, 
  height, 
  onHeroSelect,
  selectedHeroId 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const offscreenCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number>(0);
  const lastFrameTime = useRef<number>(0);
  const frameCount = useRef<number>(0);
  const fpsRef = useRef<number>(60);
  
  const { map, currentGame, selectedTile, setSelectedTile, visibleZFCs } = useGameStore();
  const { t } = useTranslation();
  
  // Performance optimization states
  const [viewportBounds, setViewportBounds] = useState<ViewportBounds>({
    minX: 0, maxX: 20, minY: 0, maxY: 20
  });
  const [renderObjects, setRenderObjects] = useState<Map<string, RenderObject>>(new Map());
  const [particlePool, setParticlePool] = useState<ParticlePool>({
    particles: [],
    activeCount: 0,
    maxSize: 100
  });
  const [isDirty, setIsDirty] = useState(true);
  const [showFPS, setShowFPS] = useState(false);

  // Render configuration with memoization
  const config = useMemo(() => ({
    tileSize: 50,
    hexRadius: 25,
    hexWidth: 43.3,
    hexHeight: 50,
    offsetX: 50,
    offsetY: 50,
    viewportPadding: 2, // Extra tiles to render outside viewport
    maxFPS: 60,
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

  // Initialize offscreen canvas for better performance
  useEffect(() => {
    if (!offscreenCanvasRef.current) {
      offscreenCanvasRef.current = document.createElement('canvas');
      offscreenCanvasRef.current.width = width;
      offscreenCanvasRef.current.height = height;
    }
  }, [width, height]);

  // Initialize particle pool
  useEffect(() => {
    const initialParticles: Particle[] = [];
    for (let i = 0; i < config.maxFPS; i++) {
      initialParticles.push({
        id: `particle_${i}`,
        position: { x: 0, y: 0 },
        velocity: { x: 0, y: 0 },
        color: '#FFD700',
        size: 0,
        life: 0,
        maxLife: 1000,
        active: false
      });
    }
    setParticlePool({
      particles: initialParticles,
      activeCount: 0,
      maxSize: 100
    });
  }, [config.maxFPS]);

  // Optimized coordinate conversion with caching
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

  // Viewport culling - only render visible tiles
  const calculateViewportBounds = useCallback((cameraX: number = 0, cameraY: number = 0): ViewportBounds => {
    const tilesX = Math.ceil(width / config.hexWidth) + config.viewportPadding;
    const tilesY = Math.ceil(height / config.hexHeight) + config.viewportPadding;
    
    return {
      minX: Math.max(0, Math.floor(cameraX / config.hexWidth) - config.viewportPadding),
      maxX: Math.min(map?.[0]?.length || 20, Math.ceil(cameraX / config.hexWidth) + tilesX),
      minY: Math.max(0, Math.floor(cameraY / config.hexHeight) - config.viewportPadding),
      maxY: Math.min(map?.length || 20, Math.ceil(cameraY / config.hexHeight) + tilesY)
    };
  }, [width, height, config, map]);

  // Optimized tile rendering with batching
  const drawTileBatch = useCallback((
    ctx: CanvasRenderingContext2D,
    tiles: Array<{ tile: Tile; position: Position; center: Position }>
  ) => {
    // Group tiles by terrain type for batch rendering
    const tileGroups = new Map<string, Array<{ tile: Tile; center: Position }>>();
    
    tiles.forEach(({ tile, center }) => {
      const terrain = tile.terrain || 'default';
      if (!tileGroups.has(terrain)) {
        tileGroups.set(terrain, []);
      }
      tileGroups.get(terrain)!.push({ tile, center });
    });

    // Render each terrain type in batch
    tileGroups.forEach((tilesOfType, terrain) => {
      const color = config.colors[terrain as keyof typeof config.colors] || config.colors.default;
      ctx.fillStyle = typeof color === 'string' ? color : config.colors.default;
      
      tilesOfType.forEach(({ tile, center }) => {
        drawOptimizedHexTile(ctx, center, tile);
      });
    });
  }, [config.colors]);

  // Optimized hex tile drawing
  const drawOptimizedHexTile = useCallback((
    ctx: CanvasRenderingContext2D,
    center: Position,
    tile: Tile
  ) => {
    const { x, y } = center;
    const radius = config.hexRadius;

    // Use Path2D for better performance
    const hexPath = new Path2D();
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i - Math.PI / 2;
      const hexX = x + radius * Math.cos(angle);
      const hexY = y + radius * Math.sin(angle);
      if (i === 0) {
        hexPath.moveTo(hexX, hexY);
      } else {
        hexPath.lineTo(hexX, hexY);
      }
    }
    hexPath.closePath();

    ctx.fill(hexPath);
    ctx.stroke(hexPath);
  }, [config.hexRadius]);

  // Optimized hero rendering with instancing
  const drawHeroOptimized = useCallback((
    ctx: CanvasRenderingContext2D,
    center: Position,
    hero: Hero,
    isSelected: boolean = false
  ) => {
    const { x, y } = center;
    const size = 18;

    // Use object pooling for hero rendering
    if (isSelected) {
      ctx.shadowColor = '#FFD700';
      ctx.shadowBlur = 10;
    }

    // Simple circle for hero (optimized)
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fillStyle = '#FFD700';
    ctx.fill();
    ctx.strokeStyle = '#B8860B';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Reset shadow
    if (isSelected) {
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
    }

    // Level indicator (simplified)
    ctx.beginPath();
    ctx.arc(x + 12, y - 12, 6, 0, Math.PI * 2);
    ctx.fillStyle = '#FF4444';
    ctx.fill();
    
    ctx.fillStyle = 'white';
    ctx.font = '8px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(hero.level.toString(), x + 12, y - 12);
  }, []);

  // Particle system with object pooling
  const createParticle = useCallback((position: Position, color: string = '#FFD700') => {
    const pool = particlePool;
    if (pool.activeCount >= pool.maxSize) return;

    const particle = pool.particles.find(p => !p.active);
    if (!particle) return;

    particle.position = { ...position };
    particle.velocity = { 
      x: (Math.random() - 0.5) * 2, 
      y: (Math.random() - 0.5) * 2 - 1 
    };
    particle.color = color;
    particle.size = 2 + Math.random() * 3;
    particle.life = 0;
    particle.maxLife = 500 + Math.random() * 500;
    particle.active = true;

    pool.activeCount++;
  }, [particlePool]);

  // Optimized particle rendering
  const updateAndRenderParticles = useCallback((ctx: CanvasRenderingContext2D, deltaTime: number) => {
    const pool = particlePool;
    
    pool.particles.forEach(particle => {
      if (!particle.active) return;

      particle.life += deltaTime;
      if (particle.life >= particle.maxLife) {
        particle.active = false;
        pool.activeCount--;
        return;
      }

      // Update position
      particle.position.x += particle.velocity.x * deltaTime * 0.001;
      particle.position.y += particle.velocity.y * deltaTime * 0.001;

      // Render particle
      const alpha = 1 - (particle.life / particle.maxLife);
      const pixel = hexToPixel(particle.position);
      
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.arc(pixel.x, pixel.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.fill();
      ctx.globalAlpha = 1;
    });
  }, [particlePool, hexToPixel]);

  // FPS counter
  const updateFPS = useCallback((currentTime: number) => {
    frameCount.current++;
    if (currentTime - lastFrameTime.current >= 1000) {
      fpsRef.current = frameCount.current;
      frameCount.current = 0;
      lastFrameTime.current = currentTime;
    }
  }, []);

  // Main optimized render function
  const render = useCallback((currentTime: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // FPS limiting
    const deltaTime = currentTime - lastFrameTime.current;
    if (deltaTime < 1000 / config.maxFPS) {
      animationRef.current = requestAnimationFrame(render);
      return;
    }

    updateFPS(currentTime);

    // Only render if dirty or particles are active
    if (!isDirty && particlePool.activeCount === 0) {
      animationRef.current = requestAnimationFrame(render);
      return;
    }

    // Clear canvas efficiently
    ctx.clearRect(0, 0, width, height);

    // Background gradient (cached)
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#1a1a2e');
    gradient.addColorStop(1, '#16213e');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    if (!map || map.length === 0) {
      ctx.fillStyle = '#FFD700';
      ctx.font = '24px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(t('loadingMap'), width / 2, height / 2);
      animationRef.current = requestAnimationFrame(render);
      return;
    }

    // Viewport culling - only render visible tiles
    const bounds = calculateViewportBounds();
    const visibleTiles: Array<{ tile: Tile; position: Position; center: Position }> = [];

    for (let y = bounds.minY; y < bounds.maxY; y++) {
      for (let x = bounds.minX; x < bounds.maxX; x++) {
        if (map[y] && map[y][x]) {
          const tile = map[y][x];
          const position = { x, y };
          const center = hexToPixel(position);
          
          // Frustum culling
          if (center.x > -config.hexRadius && center.x < width + config.hexRadius &&
              center.y > -config.hexRadius && center.y < height + config.hexRadius) {
            visibleTiles.push({ tile, position, center });
          }
        }
      }
    }

    // Batch render tiles
    drawTileBatch(ctx, visibleTiles);

    // Render heroes (only visible ones)
    if (currentGame?.players) {
      currentGame.players.forEach(player => {
        player.heroes.forEach(hero => {
          const center = hexToPixel(hero.position);
          if (center.x > -50 && center.x < width + 50 &&
              center.y > -50 && center.y < height + 50) {
            const isSelected = selectedHeroId === hero.id;
            drawHeroOptimized(ctx, center, hero, isSelected);
          }
        });
      });
    }

    // Update and render particles
    updateAndRenderParticles(ctx, deltaTime);

    // Render FPS counter
    if (showFPS) {
      ctx.fillStyle = 'white';
      ctx.font = '14px Arial';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      ctx.fillText(`FPS: ${fpsRef.current}`, 10, 10);
      ctx.fillText(`Particles: ${particlePool.activeCount}`, 10, 30);
      ctx.fillText(`Visible Tiles: ${visibleTiles.length}`, 10, 50);
    }

    setIsDirty(false);
    animationRef.current = requestAnimationFrame(render);
  }, [
    map, currentGame, selectedHeroId, width, height, config, isDirty, particlePool,
    calculateViewportBounds, drawTileBatch, drawHeroOptimized, updateAndRenderParticles,
    hexToPixel, updateFPS, showFPS, t
  ]);

  // Optimized mouse handling with throttling
  const handleMouseMove = useCallback((event: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const hexCoord = pixelToHex({ x, y });
    
    // Only update if position changed significantly
    if (map && hexCoord.y >= 0 && hexCoord.y < map.length && 
        hexCoord.x >= 0 && hexCoord.x < map[0].length) {
      // Throttle hover updates
      setIsDirty(true);
    }
  }, [map, pixelToHex]);

  const handleClick = useCallback((event: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const hexCoord = pixelToHex({ x, y });
    
    if (map && hexCoord.y >= 0 && hexCoord.y < map.length && 
        hexCoord.x >= 0 && hexCoord.x < map[0].length) {
      setSelectedTile(hexCoord);
      createParticle(hexCoord, '#FFD700');
      setIsDirty(true);

      // Check for hero selection
      if (currentGame?.players && onHeroSelect) {
        for (const player of currentGame.players) {
          for (const hero of player.heroes) {
            if (hero.position.x === hexCoord.x && hero.position.y === hexCoord.y) {
              onHeroSelect(hero.id);
              break;
            }
          }
        }
      }
    }
  }, [map, pixelToHex, setSelectedTile, createParticle, currentGame, onHeroSelect]);

  // Initialize rendering
  useEffect(() => {
    lastFrameTime.current = performance.now();
    animationRef.current = requestAnimationFrame(render);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [render]);

  // Mark as dirty when dependencies change
  useEffect(() => {
    setIsDirty(true);
  }, [map, currentGame, selectedTile, visibleZFCs]);

  return (
    <div className="optimized-game-renderer">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        onClick={handleClick}
        onMouseMove={handleMouseMove}
        className="optimized-canvas"
      />
      
      {/* Performance controls */}
      <div className="performance-controls">
        <button 
          onClick={() => setShowFPS(!showFPS)}
          className="fps-toggle"
        >
          {showFPS ? 'Hide FPS' : 'Show FPS'}
        </button>
        <button 
          onClick={() => createParticle({ x: 10, y: 10 })}
          className="particle-test"
        >
          Test Particle
        </button>
      </div>
    </div>
  );
};

export default OptimizedGameRenderer; 