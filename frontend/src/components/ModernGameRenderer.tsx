import React, { useRef, useCallback, useMemo, useEffect, forwardRef, useImperativeHandle, useState } from 'react';
import { Hero, Structure, Creature, Position } from '../types/game';
import './ModernGameRenderer.css';

// Terrain types with colors
const TERRAIN_COLORS: Record<string, string> = {
  grass: '#4CAF50',
  forest: '#2E7D32',
  mountain: '#795548',
  water: '#2196F3',
  desert: '#FF9800',
  swamp: '#607D8B',
  dirt: '#8D6E63',
  road: '#9E9E9E',
  neutral: '#9E9E9E'
};

// Terrain elevation
const TERRAIN_ELEVATION: Record<string, number> = {
  water: 0.2,
  grass: 0.5,
  dirt: 0.5,
  road: 0.5,
  desert: 0.6,
  swamp: 0.3,
  forest: 0.7,
  mountain: 1.0
};

interface TerrainTile {
  x: number;
  y: number;
  type: string;
  elevation: number;
  tilesetVariant?: string;
  transitions?: Record<string, boolean>;
  biome?: string;
  moistureLevel?: number;
}

// 🔮 SYSTÈME SYMBOLES RUNIQUES FLOTTANTS
interface RunicSymbol {
  id: string;
  symbol: string;  // Le symbole HOTS (ψ, †, Ω, etc.)
  x: number;       // Position initiale
  y: number;
  startTime: number;
  duration: number; // Durée de vie en ms
  type: 'spell' | 'movement' | 'creation' | 'combat' | 'temporal' | 'quantum';
  opacity: number;
  scale: number;
  offsetY: number; // Pour le flottement
  color: string;   // Couleur du symbole
}

// Correspondances formules HOTS → Symboles runiques
const RUNIC_FORMULAS: Record<string, { symbol: string; color: string }> = {
  // Sorts et actions
  'MOV': { symbol: '⟶', color: '#4ECDC4' },     // Mouvement
  'CAST': { symbol: 'ψ', color: '#9C27B0' },    // Sort (Psi-State)
  'CREATE': { symbol: '⊙', color: '#FF6B6B' },  // Création (Superposition)
  'USE': { symbol: 'Π', color: '#FF9800' },     // Utilisation (Observation)
  'ATTACK': { symbol: '†', color: '#F44336' },  // Attaque (Collapse)
  'BATTLE': { symbol: '⨉', color: '#D32F2F' },  // Bataille (Conflit)
  'HERO': { symbol: 'Ω', color: '#FFD700' },    // Héros (Oméga)
  'TEMPORAL': { symbol: 'τ', color: '#7B1FA2' }, // Temporal
  'TIMELINE': { symbol: 'ℬ', color: '#3F51B5' }, // Branche
  'QUANTUM': { symbol: '↯', color: '#00BCD4' },  // ZFC
  'COLLAPSE': { symbol: '†', color: '#E91E63' }, // Collapse causal
  'ROLLBACK': { symbol: '↺', color: '#795548' }, // Rollback
  'DELTA': { symbol: 'Δt', color: '#607D8B' },   // Délai temporel
};

interface ModernGameRendererProps {
  map: any[][];
  heroes?: Hero[];
  creatures?: Creature[];
  structures?: Structure[];
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
  triggerRunicEffect: (x: number, y: number, spellType: string) => void; // ✨ NOUVELLE FONCTION
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
  
  // 🔧 SYSTÈME DE ZOOM AMÉLIORÉ
  const viewportRef = useRef({ 
    x: 0, 
    y: 0, 
    zoom: 0.8  // 🎯 ZOOM PAR DÉFAUT RÉDUIT pour voir plus de tuiles
  });
  
  const animationFrameRef = useRef<number | undefined>();
  
  // 🔮 ÉTAT SYMBOLES RUNIQUES
  const [runicSymbols, setRunicSymbols] = useState<RunicSymbol[]>([]);
  
  // 🔧 CONSTANTES DE ZOOM
  const MIN_ZOOM = 0.2;  // Zoom out maximum
  const MAX_ZOOM = 3.0;  // Zoom in maximum
  const ZOOM_SPEED = 0.1; // Vitesse de zoom
  
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
          });
        }
      }
    }
    return tiles;
  }, [map]);

  // Convert tile coordinates to pixel coordinates
  const tileToPixel = useCallback((tileX: number, tileY: number) => {
    const pixelX = tileX * hexHorizontalSpacing;
    const pixelY = tileY * hexVerticalSpacing + (tileX % 2) * (hexVerticalSpacing / 2);
    return { x: pixelX, y: pixelY };
  }, [hexHorizontalSpacing, hexVerticalSpacing]);

  // Convert pixel coordinates to tile coordinates
  const pixelToTile = useCallback((pixelX: number, pixelY: number) => {
    const tileX = Math.round(pixelX / hexHorizontalSpacing);
    const tileY = Math.round((pixelY - (tileX % 2) * (hexVerticalSpacing / 2)) / hexVerticalSpacing);
    return { x: tileX, y: tileY };
  }, [hexHorizontalSpacing, hexVerticalSpacing]);

  // 🔮 FONCTION POUR DÉCLENCHER EFFETS RUNIQUES
  const triggerRunicEffect = useCallback((x: number, y: number, spellType: string) => {
    const formula = RUNIC_FORMULAS[spellType.toUpperCase()] || RUNIC_FORMULAS['CAST'];
    
    const newSymbol: RunicSymbol = {
      id: `runic-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
      symbol: formula.symbol,
      x,
      y,
      startTime: Date.now(),
      duration: 3000, // 3 secondes
      type: 'spell',
      opacity: 0.8,
      scale: 1.0,
      offsetY: 0,
      color: formula.color
    };

    setRunicSymbols(prev => [...prev, newSymbol]);
    
    // Nettoyer les anciens symboles après leur durée de vie
    setTimeout(() => {
      setRunicSymbols(prev => prev.filter(s => s.id !== newSymbol.id));
    }, newSymbol.duration + 100);
  }, []);

  // 🔮 FONCTION POUR DESSINER LES SYMBOLES RUNIQUES
  const drawRunicSymbols = useCallback((ctx: CanvasRenderingContext2D) => {
    const currentTime = Date.now();
    
    runicSymbols.forEach(runic => {
      const elapsed = currentTime - runic.startTime;
      const progress = Math.min(elapsed / runic.duration, 1);
      
      // Animation de flottement
      const floatOffset = Math.sin((elapsed / 200) + runic.x + runic.y) * 8;
      
      // Animation d'apparition et disparition
      let opacity = runic.opacity;
      if (progress < 0.2) {
        // Apparition graduelle
        opacity *= (progress / 0.2);
      } else if (progress > 0.8) {
        // Disparition graduelle
        opacity *= (1 - (progress - 0.8) / 0.2);
      }
      
      // Animation de scale (grossit puis rétrécit légèrement)
      let scale = runic.scale;
      if (progress < 0.3) {
        scale *= (0.5 + (progress / 0.3) * 0.7); // De 0.5 à 1.2
      } else if (progress > 0.7) {
        scale *= (1.2 - (progress - 0.7) / 0.3 * 0.2); // De 1.2 à 1.0
      } else {
        scale *= 1.2;
      }
      
      const pixelPos = tileToPixel(runic.x, runic.y);
      const finalY = pixelPos.y - 30 + floatOffset - (progress * 20); // Monte en flottant
      
      ctx.save();
      
      // Position et transformation
      ctx.translate(pixelPos.x, finalY);
      ctx.scale(scale, scale);
      
      // Effet de brillance (halo)
      ctx.shadowColor = runic.color;
      ctx.shadowBlur = 15 * scale;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      
      // Dessiner le symbole runique
      ctx.font = `${24 * scale}px serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      // Contour sombre pour plus de lisibilité
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.8)';
      ctx.lineWidth = 3;
      ctx.strokeText(runic.symbol, 0, 0);
      
      // Symbole principal coloré
      ctx.fillStyle = `rgba(${hexToRgb(runic.color)}, ${opacity})`;
      ctx.fillText(runic.symbol, 0, 0);
      
      // Effet de particules autour du symbole (pour les sorts puissants)
      if (runic.type === 'quantum' || runic.symbol === '↯') {
        for (let i = 0; i < 6; i++) {
          const angle = (i / 6) * Math.PI * 2 + elapsed / 300;
          const radius = 35 + Math.sin(elapsed / 150 + i) * 5;
          const particleX = Math.cos(angle) * radius;
          const particleY = Math.sin(angle) * radius;
          
          ctx.beginPath();
          ctx.arc(particleX, particleY, 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${hexToRgb(runic.color)}, ${opacity * 0.6})`;
          ctx.fill();
        }
      }
      
      ctx.restore();
    });
  }, [runicSymbols, tileToPixel]);

  // Utilitaire pour convertir hex en RGB
  const hexToRgb = (hex: string): string => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (result) {
      const r = parseInt(result[1], 16);
      const g = parseInt(result[2], 16);
      const b = parseInt(result[3], 16);
      return `${r}, ${g}, ${b}`;
    }
    return '255, 255, 255';
  };

  // Draw a hexagon
  const drawHexagon = useCallback((ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3;
      const hx = x + size * Math.cos(angle);
      const hy = y + size * Math.sin(angle);
      if (i === 0) {
        ctx.moveTo(hx, hy);
      } else {
        ctx.lineTo(hx, hy);
      }
    }
    ctx.closePath();
  }, []);

  // Render terrain using David Gervais tileset approach
  const renderTerrain = useCallback(async (ctx: CanvasRenderingContext2D) => {
    terrainTiles.forEach(tile => {
      const pixelPos = tileToPixel(tile.x, tile.y);
      const terrainColor = TERRAIN_COLORS[tile.type] || TERRAIN_COLORS.neutral;
      const elevation = TERRAIN_ELEVATION[tile.type] || 0.5;
      
      // Base hexagon
      ctx.fillStyle = terrainColor;
      drawHexagon(ctx, pixelPos.x, pixelPos.y, hexSize);
      ctx.fill();
      
      // Elevation effect
      if (showElevation && elevation > 0.5) {
        ctx.fillStyle = `rgba(255, 255, 255, ${(elevation - 0.5) * 0.3})`;
        drawHexagon(ctx, pixelPos.x, pixelPos.y, hexSize);
        ctx.fill();
      }
      
      // Grid
      if (showGrid) {
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.lineWidth = 1;
        drawHexagon(ctx, pixelPos.x, pixelPos.y, hexSize);
        ctx.stroke();
      }
    });
  }, [terrainTiles, tileToPixel, drawHexagon, hexSize, showElevation, showGrid]);

  // Draw heroes
  const drawHeroes = useCallback((ctx: CanvasRenderingContext2D) => {
    heroes.forEach(hero => {
      const pixelPos = tileToPixel(hero.position.x, hero.position.y);
      
      // Hero circle
      ctx.beginPath();
      ctx.arc(pixelPos.x, pixelPos.y, hexSize * 0.4, 0, 2 * Math.PI);
      
      // Different color based on ownership
      if (hero.playerId === currentPlayer) {
        ctx.fillStyle = '#4CAF50';
        ctx.strokeStyle = '#2E7D32';
      } else {
        ctx.fillStyle = '#2196F3';
        ctx.strokeStyle = '#1976D2';
      }
      
      // Selection highlight
      if (selectedHero && selectedHero.id === hero.id) {
        ctx.fillStyle = '#FFD700';
        ctx.strokeStyle = '#FFA000';
      }
      
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Hero name
      ctx.fillStyle = '#000';
      ctx.font = '10px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(hero.name, pixelPos.x, pixelPos.y + hexSize * 0.7);
    });
  }, [heroes, tileToPixel, hexSize, currentPlayer, selectedHero]);

  // Draw creatures
  const drawCreatures = useCallback((ctx: CanvasRenderingContext2D) => {
    creatures.forEach(creature => {
      const pixelPos = tileToPixel(creature.position.x, creature.position.y);
      
      // Creature diamond
      ctx.save();
      ctx.translate(pixelPos.x, pixelPos.y);
      ctx.rotate(Math.PI / 4);
      ctx.fillRect(
        -hexSize * 0.3,
        -hexSize * 0.3,
        hexSize * 0.6,
        hexSize * 0.6
      );
      ctx.fillStyle = '#F44336';
      ctx.fill();
      ctx.strokeStyle = '#D32F2F';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.restore();
      
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
    
    // 🔮 DESSINER LES SYMBOLES RUNIQUES (par-dessus tout)
    drawRunicSymbols(ctx);

    ctx.restore();
  }, [width, height, renderTerrain, drawValidMoves, drawValidTargets, drawStructures, drawCreatures, drawHeroes, drawRunicSymbols]);

  // Animation loop pour les symboles runiques
  const animate = useCallback(() => {
    render();
    if (runicSymbols.length > 0) {
      animationFrameRef.current = requestAnimationFrame(animate);
    }
  }, [render, runicSymbols.length]);

  // Démarrer/arrêter l'animation
  useEffect(() => {
    if (runicSymbols.length > 0) {
      if (!animationFrameRef.current) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    } else {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = undefined;
      }
    }
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [runicSymbols.length, animate]);

  // 🔧 GESTION DU ZOOM AVEC ROULETTE
  const handleWheelZoom = useCallback((event: WheelEvent) => {
    event.preventDefault();
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Position de la souris dans le canvas
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    
    // Position monde avant zoom
    const worldBeforeX = (mouseX - width / 2) / viewportRef.current.zoom + viewportRef.current.x;
    const worldBeforeY = (mouseY - height / 2) / viewportRef.current.zoom + viewportRef.current.y;
    
    // Calculer nouveau zoom
    const zoomDelta = event.deltaY > 0 ? -ZOOM_SPEED : ZOOM_SPEED;
    const newZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, viewportRef.current.zoom + zoomDelta));
    
    // Position monde après zoom
    const worldAfterX = (mouseX - width / 2) / newZoom + viewportRef.current.x;
    const worldAfterY = (mouseY - height / 2) / newZoom + viewportRef.current.y;
    
    // Ajuster la position pour garder la souris au même endroit
    viewportRef.current.x += worldBeforeX - worldAfterX;
    viewportRef.current.y += worldBeforeY - worldAfterY;
    viewportRef.current.zoom = newZoom;
    
    render();
  }, [width, height, render]);
  
  // 🔧 CONTRÔLES CLAVIER ZOOM
  const handleKeyboardZoom = useCallback((event: KeyboardEvent) => {
    if (event.ctrlKey || event.metaKey) {
      switch (event.key) {
        case '+':
        case '=':
          event.preventDefault();
          viewportRef.current.zoom = Math.min(MAX_ZOOM, viewportRef.current.zoom + ZOOM_SPEED);
          render();
          break;
        case '-':
          event.preventDefault();
          viewportRef.current.zoom = Math.max(MIN_ZOOM, viewportRef.current.zoom - ZOOM_SPEED);
          render();
          break;
        case '0':
          event.preventDefault();
          viewportRef.current.zoom = 0.8; // Reset au zoom par défaut
          render();
          break;
      }
    }
  }, [render]);
  
  // 🔧 DÉPLACEMENT PAR GLISSER
  const [isPanning, setIsPanning] = useState(false);
  const [lastPanPosition, setLastPanPosition] = useState({ x: 0, y: 0 });
  
  const handleMouseDown = useCallback((event: React.MouseEvent<HTMLCanvasElement>) => {
    if (event.button === 1 || (event.button === 0 && event.altKey)) { // Bouton milieu ou Alt+clic
      setIsPanning(true);
      setLastPanPosition({ x: event.clientX, y: event.clientY });
      event.preventDefault();
    }
  }, []);
  
  const handleMouseMove = useCallback((event: React.MouseEvent<HTMLCanvasElement>) => {
    if (isPanning) {
      const deltaX = event.clientX - lastPanPosition.x;
      const deltaY = event.clientY - lastPanPosition.y;
      
      viewportRef.current.x -= deltaX / viewportRef.current.zoom;
      viewportRef.current.y -= deltaY / viewportRef.current.zoom;
      
      setLastPanPosition({ x: event.clientX, y: event.clientY });
      render();
    }
  }, [isPanning, lastPanPosition, render]);
  
  const handleMouseUp = useCallback(() => {
    setIsPanning(false);
  }, []);
  
  // 🔧 BIND EVENTS ZOOM
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    canvas.addEventListener('wheel', handleWheelZoom, { passive: false });
    document.addEventListener('keydown', handleKeyboardZoom);
    
    return () => {
      canvas.removeEventListener('wheel', handleWheelZoom);
      document.removeEventListener('keydown', handleKeyboardZoom);
    };
  }, [handleWheelZoom, handleKeyboardZoom]);

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

    // 🔮 DÉMO : Déclencher effet runique sur clic (pour test)
    if (event.shiftKey) {
      const spells = ['CAST', 'MOV', 'CREATE', 'ATTACK', 'QUANTUM', 'TEMPORAL'];
      const randomSpell = spells[Math.floor(Math.random() * spells.length)];
      triggerRunicEffect(tilePos.x, tilePos.y, randomSpell);
      return;
    }

    // Check if hero was clicked
    const clickedHero = heroes.find(hero => {
      const heroPixel = tileToPixel(hero.position.x, hero.position.y);
      const distance = Math.sqrt(Math.pow(worldX - heroPixel.x, 2) + Math.pow(worldY - heroPixel.y, 2));
      return distance <= hexSize * 0.4;
    });

    if (clickedHero && onHeroClick) {
      onHeroClick(clickedHero);
      // 🔮 Déclencher effet runique quand héros sélectionné
      triggerRunicEffect(clickedHero.position.x, clickedHero.position.y, 'HERO');
    } else if (onTileClick) {
      onTileClick(tilePos.x, tilePos.y);
    }
  }, [width, height, heroes, tileToPixel, pixelToTile, hexSize, onHeroClick, onTileClick, triggerRunicEffect]);

  // Center on position
  const centerOnPosition = useCallback((x: number, y: number) => {
    const pixelPos = tileToPixel(x, y);
    viewportRef.current.x = pixelPos.x;
    viewportRef.current.y = pixelPos.y;
    render();
  }, [tileToPixel, render]);

  // Expose methods via ref
  useImperativeHandle(ref, () => ({
    centerOnPosition,
    triggerRunicEffect // ✨ EXPOSER LA FONCTION POUR DÉCLENCHER LES EFFETS
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
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ cursor: isPanning ? 'grabbing' : 'crosshair' }}
      />
      
      {/* 🔧 CONTRÔLES DE ZOOM */}
      <div className="zoom-controls">
        <button 
          className="zoom-btn zoom-out" 
          onClick={() => {
            viewportRef.current.zoom = Math.max(MIN_ZOOM, viewportRef.current.zoom - ZOOM_SPEED);
            render();
          }}
          title="Zoom Out (Ctrl + -)"
        >
          −
        </button>
        
        <div className="zoom-level" title="Niveau de zoom">
          {Math.round(viewportRef.current.zoom * 100)}%
        </div>
        
        <button 
          className="zoom-btn zoom-in" 
          onClick={() => {
            viewportRef.current.zoom = Math.min(MAX_ZOOM, viewportRef.current.zoom + ZOOM_SPEED);
            render();
          }}
          title="Zoom In (Ctrl + +)"
        >
          +
        </button>
        
        <button 
          className="zoom-btn zoom-reset" 
          onClick={() => {
            viewportRef.current.zoom = 0.8;
            viewportRef.current.x = 0;
            viewportRef.current.y = 0;
            render();
          }}
          title="Reset Zoom (Ctrl + 0)"
        >
          🎯
        </button>
      </div>
      
      {/* 🔧 AIDE CONTRÔLES */}
      <div className="controls-help">
        <div>🖱️ Roulette: Zoom</div>
        <div>🖱️ Alt+Glisser: Déplacer</div>
        <div>⌨️ Ctrl+/- : Zoom</div>
        <div>⌨️ Shift+Clic: Effet runique</div>
      </div>
    </div>
  );
});

ModernGameRenderer.displayName = 'ModernGameRenderer';

export default ModernGameRenderer; 