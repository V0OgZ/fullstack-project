import React, { useRef, useEffect, useState, useCallback, useMemo, forwardRef, useImperativeHandle } from 'react';
import { useGameStore } from '../store/useGameStore';
import { Position, Tile, Hero } from '../types/game';
import { useTranslation } from '../i18n';
import './ModernGameRenderer.css';
import { computeHexBitmask } from '../utils/hexBitmask';
import { TERRAIN_EDGE_SPRITES } from '../constants/terrainSprites';
import { heroSpriteService } from '../services/heroSpriteService';
import { getPlayerColorConfig } from '../constants/playerColors';
import { pathDotsService } from '../services/pathDotsService';

interface ModernGameRendererProps {
  width: number;
  height: number;
  onTileClick?: (position: Position) => void;
}

export interface ModernGameRendererRef {
  centerOnPosition: (position: Position) => void;
}

interface AnimatedElement {
  id: string;
  type: 'particle' | 'effect';
  position: Position;
  startTime: number;
  duration: number;
  color: string;
  size: number;
}

const ModernGameRenderer = forwardRef<ModernGameRendererRef, ModernGameRendererProps>(({ width, height, onTileClick }, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const animatedElementsRef = useRef<AnimatedElement[]>([]);
  const { map, currentGame, /* currentPlayer, */ selectedTile, setSelectedTile, visibleZFCs, selectedHero, movementRange, movementMode, selectHero, moveHero, canMoveToPosition } = useGameStore();
  const { t } = useTranslation();
  
  const [animatedElements, setAnimatedElements] = useState<AnimatedElement[]>([]);
  
  // Synchroniser la référence avec l'état
  useEffect(() => {
    animatedElementsRef.current = animatedElements;
  }, [animatedElements]);
  const [hoveredTile, setHoveredTile] = useState<Position | null>(null);
  const [heroImages, setHeroImages] = useState<Map<string, HTMLImageElement>>(new Map());
  const [mountImages, setMountImages] = useState<Map<string, HTMLImageElement>>(new Map());
  const [flagImages, setFlagImages] = useState<Map<string, HTMLImageElement>>(new Map());
  const [mapOffset, setMapOffset] = useState<Position>({ x: 0, y: 0 });
  const [spriteCache] = useState<Map<string, HTMLImageElement>>(new Map());

  // Pre-compute extended (projection) movement range when hero selected
  const projectionRange: Position[] = useMemo(() => {
    if (!selectedHero) return [];
    // Clone hero with doubled movement points for projection calculation
    const heroClone = { ...selectedHero, movementPoints: selectedHero.movementPoints * 2 } as Hero;
    return useGameStore.getState().calculateMovementRange(heroClone);
  }, [selectedHero]);
  
  // Initialize pathDotsService when canvas is ready
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      pathDotsService.initialize(canvas);
    }
  }, []);

  // Show path dots when hero is selected and movement mode is active
  useEffect(() => {
    if (selectedHero && movementMode && selectedTile) {
      pathDotsService.createHeroes3Path(selectedHero.id, selectedHero.position, selectedTile);
      pathDotsService.animatePathDots(selectedHero.id);
    } else if (selectedHero) {
      pathDotsService.clearPathDots(selectedHero.id);
    }
  }, [selectedHero, selectedTile, movementMode]);

  // Handle tile clicks for hero selection and movement
  const handleTileClick = useCallback((position: Position) => {
    if (!map || map.length === 0 || !currentGame) return;
    if (!position || typeof position.x !== 'number' || typeof position.y !== 'number') return;
    
    const tile = map[position.y]?.[position.x];
    if (!tile) return;
    
    // If there's a hero on this tile, select it
    if (tile.hero) {
      selectHero(tile.hero);
      setSelectedTile(position);
      return;
    }
    
    // If we have a selected hero and are in movement mode, try to move
    if (selectedHero && movementMode && canMoveToPosition(selectedHero, position)) {
      // Clear path dots before moving
      pathDotsService.clearPathDots(selectedHero.id);
      
      // Move the hero
      moveHero(selectedHero.id, position);
      setSelectedTile(position);
      return;
    }
    
    // Otherwise, just select the tile
    setSelectedTile(position);
    
    // Call external handler if provided
    if (onTileClick) {
      onTileClick(position);
    }
  }, [map, currentGame, selectedHero, movementMode, canMoveToPosition, selectHero, moveHero, setSelectedTile, onTileClick]);

  // Preload hero images
  const preloadHeroImage = useCallback(async (heroName: string) => {
    try {
      const image = await heroSpriteService.loadHeroSprite(heroName);
      setHeroImages((prev: Map<string, HTMLImageElement>) => new Map(prev).set(heroName, image));
    } catch (error) {
      console.warn(`Failed to preload hero image: ${heroName}`, error);
    }
  }, []);

  // Preload mount images
  const preloadMountImage = useCallback(async (mountType: string) => {
    try {
      const image = await heroSpriteService.loadMountSprite(mountType as any);
      if (image) {
        setMountImages((prev: Map<string, HTMLImageElement>) => new Map(prev).set(mountType, image));
      }
    } catch (error) {
      console.warn(`Failed to preload mount image: ${mountType}`, error);
    }
  }, []);

  // Preload flag images
  const preloadFlagImage = useCallback(async (playerColor: string) => {
    try {
      const image = await heroSpriteService.loadFlagSprite(playerColor as any);
      setFlagImages((prev: Map<string, HTMLImageElement>) => new Map(prev).set(playerColor, image));
    } catch (error) {
      console.warn(`Failed to preload flag image: ${playerColor}`, error);
    }
  }, []);

  // Précharger les images des héros visibles
  useEffect(() => {
    if (!map) return;
    
    const heroesToPreload = new Set<string>();
    const mountsToPreload = new Set<string>();
    const flagsToPreload = new Set<string>();
    
    // Collecter tous les héros visibles
    map.forEach(row => {
      row.forEach(tile => {
        if (tile.hero) {
          heroesToPreload.add(tile.hero.name);
          if (tile.hero.mountType && tile.hero.mountType !== 'none') {
            mountsToPreload.add(tile.hero.mountType);
          }
          if (tile.hero.playerColor) {
            flagsToPreload.add(tile.hero.playerColor);
          }
        }
      });
    });
    
    // Précharger les images
    heroesToPreload.forEach(heroName => preloadHeroImage(heroName));
    mountsToPreload.forEach(mountType => preloadMountImage(mountType));
    flagsToPreload.forEach(playerColor => preloadFlagImage(playerColor));
    
  }, [map, preloadHeroImage, preloadMountImage, preloadFlagImage]);

  // Précharger les images de terrain - TEMPORAIREMENT DÉSACTIVÉ
  useEffect(() => {
    console.log('🔧 Terrain image preloading temporarily disabled for debugging');
  }, []);

  // Render configuration
  const config = useMemo(() => ({
    tileSize: 50,
    hexRadius: 25,
    hexWidth: 43.3,
    hexHeight: 50,
    offsetX: 50 + mapOffset.x,
    offsetY: 50 + mapOffset.y,
    colors: {
      // HOMM3 terrain colors
      grass: '#7fb069',        // HOMM3 grass green
      dirt: '#a68a64',         // HOMM3 dirt road brown
      forest: '#386641',       // HOMM3 forest green
      mountain: '#8d5524',     // HOMM3 rocky brown
      water: '#3a86ff',        // HOMM3 deep blue
      sand: '#e9c46a',         // HOMM3 desert sand
      snow: '#e0e1dd',         // HOMM3 snow white
      swamp: '#52796f',        // HOMM3 swamp green
      rough: '#936639',        // HOMM3 wasteland brown
      lava: '#e63946',         // HOMM3 lava red
      // UI colors
      default: '#7fb069',
      hover: 'rgba(255, 255, 255, 0.2)',
      selected: '#FFD700',
      movement: 'rgba(76, 175, 80, 0.4)'
    },
    // HOMM3-style terrain gradients
    gradients: {
      grass: ['#7fb069', '#8fbf7a'],
      dirt: ['#a68a64', '#b59a74'],
      forest: ['#386641', '#487651'],
      mountain: ['#8d5524', '#9d6534'],
      water: ['#3a86ff', '#4a96ff'],
      sand: ['#e9c46a', '#f9d47a'],
      snow: ['#e0e1dd', '#f0f1ed'],
      swamp: ['#52796f', '#62897f'],
      rough: ['#936639', '#a37649'],
      lava: ['#e63946', '#f64956']
    }
  }), [mapOffset]);

  // Conversion coordonnées hexagonales (pointy-top hexagons)
  const hexToPixel = useCallback((hex: Position): Position => {
    if (!hex || typeof hex.x !== 'number' || typeof hex.y !== 'number') {
      return { x: 0, y: 0 };
    }
    const x = config.hexWidth * (hex.x + hex.y * 0.5) + config.offsetX;
    const y = config.hexHeight * hex.y * 0.75 + config.offsetY;
    return { x, y };
  }, [config.hexWidth, config.hexHeight, config.offsetX, config.offsetY]);

  const pixelToHex = useCallback((pixel: Position): Position => {
    if (!pixel || typeof pixel.x !== 'number' || typeof pixel.y !== 'number') {
      return { x: 0, y: 0 };
    }
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
    if (!center || typeof center.x !== 'number' || typeof center.y !== 'number') return;
    if (!structure) return;
    
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
    if (!center || typeof center.x !== 'number' || typeof center.y !== 'number') return;
    if (!creature) return;
    
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

  // Rendu d'un héros avec système unifié (portrait + monture + drapeau)
  const drawHero = useCallback(async (
    ctx: CanvasRenderingContext2D,
    center: Position,
    hero: Hero
  ) => {
    if (!center || typeof center.x !== 'number' || typeof center.y !== 'number') return;
    if (!hero || !hero.position) return;
    
    const { x, y } = center;
    const size = 20; // Taille optimisée pour les sprites sur carte

    try {
      // Obtenir les informations de rendu du héros
      const renderInfo = heroSpriteService.getHeroRenderInfo(hero);
      const colorConfig = getPlayerColorConfig(hero.playerColor || 'blue');
      
      // Charger les images nécessaires
      const heroImage = heroImages.get(hero.name);
      const mountImage = hero.mountType && hero.mountType !== 'none' ? mountImages.get(hero.mountType) : null;
      const flagImage = hero.playerColor ? flagImages.get(hero.playerColor) : null;

      // Base circulaire pour le héros (style Heroes 3)
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      
      // Couleur selon la couleur du joueur
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, size);
      gradient.addColorStop(0, colorConfig.hex);
      gradient.addColorStop(1, colorConfig.borderColor);
      ctx.fillStyle = gradient;
      ctx.fill();
      ctx.strokeStyle = colorConfig.borderColor;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Dessiner le portrait du héros si disponible
      if (heroImage) {
        const portraitSize = 16;
        ctx.save();
        ctx.beginPath();
        ctx.arc(x, y, portraitSize, 0, Math.PI * 2);
        ctx.clip();
        ctx.drawImage(heroImage, x - portraitSize, y - portraitSize, portraitSize * 2, portraitSize * 2);
        ctx.restore();
      } else {
        // Fallback : dessiner le héros selon sa classe (style pixelisé Heroes 3)
        ctx.fillStyle = '#FFFFFF';
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 1;
        
        const heroClass = hero.class || 'Warrior';
        
        if (heroClass === 'Knight' || heroClass === 'Warrior') {
          // Chevalier avec épée et bouclier
          // Corps
          ctx.fillRect(x - 3, y - 8, 6, 12);
          ctx.strokeRect(x - 3, y - 8, 6, 12);
          
          // Tête (casque)
          ctx.fillRect(x - 4, y - 12, 8, 6);
          ctx.strokeRect(x - 4, y - 12, 8, 6);
          
          // Épée
          ctx.fillRect(x + 6, y - 10, 2, 8);
          ctx.strokeRect(x + 6, y - 10, 2, 8);
          
          // Bouclier
          ctx.fillRect(x - 8, y - 6, 3, 6);
          ctx.strokeRect(x - 8, y - 6, 3, 6);
          
        } else if (heroClass === 'Mage' || heroClass === 'Wizard') {
          // Mage avec bâton et robe
          // Corps (robe)
          ctx.fillRect(x - 4, y - 8, 8, 12);
          ctx.strokeRect(x - 4, y - 8, 8, 12);
          
          // Tête (chapeau pointu)
          ctx.beginPath();
          ctx.moveTo(x, y - 16);
          ctx.lineTo(x - 3, y - 8);
          ctx.lineTo(x + 3, y - 8);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          
          // Bâton magique
          ctx.fillRect(x + 5, y - 14, 1, 12);
          ctx.strokeRect(x + 5, y - 14, 1, 12);
          
          // Orbe magique
          ctx.beginPath();
          ctx.arc(x + 5, y - 16, 2, 0, Math.PI * 2);
          ctx.fillStyle = '#00FFFF';
          ctx.fill();
          ctx.stroke();
          
        } else if (heroClass === 'Archer') {
          // Archer avec arc
          // Corps
          ctx.fillRect(x - 3, y - 8, 6, 12);
          ctx.strokeRect(x - 3, y - 8, 6, 12);
          
          // Tête
          ctx.fillRect(x - 3, y - 12, 6, 6);
          ctx.strokeRect(x - 3, y - 12, 6, 6);
          
          // Arc
          ctx.beginPath();
          ctx.arc(x - 6, y - 2, 6, Math.PI * 0.2, Math.PI * 0.8);
          ctx.stroke();
          
          // Flèche
          ctx.fillRect(x - 10, y - 3, 8, 1);
          ctx.strokeRect(x - 10, y - 3, 8, 1);
          
        } else {
          // Héros générique
          // Corps
          ctx.fillRect(x - 3, y - 8, 6, 12);
          ctx.strokeRect(x - 3, y - 8, 6, 12);
          
          // Tête
          ctx.fillRect(x - 3, y - 12, 6, 6);
          ctx.strokeRect(x - 3, y - 12, 6, 6);
          
          // Arme générique
          ctx.fillRect(x + 4, y - 8, 1, 8);
          ctx.strokeRect(x + 4, y - 8, 1, 8);
        }
      }

      // Dessiner la monture si présente
      if (mountImage && hero.mountType && hero.mountType !== 'none') {
        const mountSize = 24;
        ctx.drawImage(mountImage, x - mountSize/2, y + size - 8, mountSize, mountSize * 0.75);
      }

      // Dessiner le drapeau si présent
      if (flagImage && hero.playerColor) {
        const flagSize = 12;
        ctx.drawImage(flagImage, x + size - 2, y - flagSize/2, flagSize, flagSize);
      }

      // Ajouter un petit indicateur de niveau
      ctx.fillStyle = '#FFD700';
      ctx.font = 'bold 8px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(hero.level?.toString() || '1', x, y + size + 12);

      // Ajouter un indicateur de sélection si c'est le héros sélectionné
      if (selectedHero && selectedHero.id === hero.id) {
        ctx.beginPath();
        ctx.arc(x, y, size + 4, 0, Math.PI * 2);
        ctx.strokeStyle = '#FFD700';
        ctx.lineWidth = 3;
        ctx.stroke();
      }

    } catch (error) {
      console.warn('⚠️ Error drawing hero, falling back to simple method:', error);
      
      // Fallback simple avec cercle coloré
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fillStyle = '#FFD700';
      ctx.fill();
      ctx.strokeStyle = '#B8860B';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Nom du héros
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 10px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(hero.name.charAt(0), x, y + 3);
    }
  }, [heroImages, mountImages, flagImages, selectedHero]);

  // Render hexagonal tile with enhanced visuals and ZFC vision levels
  const drawHexTile = useCallback((
    ctx: CanvasRenderingContext2D,
    center: Position,
    tile: Tile,
    tilePosition: Position,
    isSelected: boolean,
    isHovered: boolean
  ) => {
    if (!center || typeof center.x !== 'number' || typeof center.y !== 'number') return;
    if (!tile) return;
    if (!tilePosition || typeof tilePosition.x !== 'number' || typeof tilePosition.y !== 'number') return;
    
    const { x, y } = center;
    const radius = config.hexRadius;
    
    // Check if this tile is in movement range
    const isInMovementRange = movementRange.some(pos => pos && pos.x === tilePosition.x && pos.y === tilePosition.y);
    const isInProjectionRange = !isInMovementRange && projectionRange.some(pos => pos && pos.x === tilePosition.x && pos.y === tilePosition.y);
    
    // Check if this tile has the selected hero
    const hasSelectedHero = selectedHero && tile.hero && tile.hero.id === selectedHero.id;

    // Create hexagonal path
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

    // Apply vision-based rendering with ZFC levels
    let tileOpacity = 1.0;
    let overlayColor = 'rgba(0, 0, 0, 0)';
    
    if (!tile.visible && !tile.explored) {
      // Level 4: Hidden - completely black
      tileOpacity = 0.1;
      overlayColor = 'rgba(0, 0, 0, 0.9)';
    } else if (tile.visionLevel === 'explored') {
      // Level 3: Explored but not visible - very dark
      tileOpacity = 0.3;
      overlayColor = 'rgba(0, 0, 0, 0.7)';
    } else if (tile.visionLevel === 'zfc') {
      // Level 2: ZFC zone - dimmed visibility
      tileOpacity = 0.6;
      overlayColor = 'rgba(0, 0, 0, 0.4)';
    } else if (tile.visionLevel === 'clear') {
      // Level 1: Clear zone - full visibility
      tileOpacity = 1.0;
      overlayColor = 'rgba(0, 0, 0, 0)';
    }

    // Get terrain color with variety
    const terrainColor = getTerrainColor(tile.terrain);
    
    // Apply opacity to terrain color
    ctx.globalAlpha = tileOpacity;
    ctx.fillStyle = terrainColor;
    ctx.fill();
    ctx.globalAlpha = 1.0;

    // Add fog overlay
    if (overlayColor !== 'rgba(0, 0, 0, 0)') {
      ctx.fillStyle = overlayColor;
      ctx.fill();
    }

    // Enhanced borders and selection
    if (isSelected) {
      ctx.strokeStyle = '#FFD700';
      ctx.lineWidth = 4;
      ctx.stroke();
    } else if (isHovered) {
      ctx.strokeStyle = 'rgba(255, 215, 0, 0.6)';
      ctx.lineWidth = 2;
      ctx.stroke();
    } else if (isInMovementRange) {
      ctx.strokeStyle = 'rgba(0, 255, 0, 0.8)';
      ctx.lineWidth = 2;
      ctx.stroke();
    } else if (isInProjectionRange) {
      ctx.strokeStyle = 'rgba(0, 255, 0, 0.4)';
      ctx.lineWidth = 1;
      ctx.stroke();
    } else {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Special ZFC zone indicator
    if (tile.visionLevel === 'zfc') {
      ctx.beginPath();
      ctx.arc(x, y, radius * 0.8, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 215, 0, 0.3)';
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
  }, [config.hexRadius, movementRange, projectionRange, selectedHero, drawStructure, drawCreature, drawHero]);

  // Get terrain color based on terrain type
  const getTerrainColor = (terrain: string): string => {
    switch (terrain) {
      case 'grass': return '#4CAF50';
      case 'forest': return '#2E7D32';
      case 'mountain': return '#795548';
      case 'water': return '#2196F3';
      case 'desert': return '#FFC107';
      case 'swamp': return '#8BC34A';
      default: return '#4CAF50';
    }
  };

  // Render ZFC zones
  const drawZFCZones = useCallback((ctx: CanvasRenderingContext2D) => {
    visibleZFCs.forEach(zfc => {
      if (!zfc || !zfc.affectedTiles) return;
      zfc.affectedTiles.forEach(tile => {
        if (!tile || typeof tile.x !== 'number' || typeof tile.y !== 'number') return;
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
        ctx.fillStyle = config.colors.movement;
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
    
    // Utiliser une référence pour éviter les re-rendus
    const currentElements = animatedElementsRef.current;
    
    currentElements.forEach(element => {
      if (!element || !element.position) return;
      
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
    const filteredElements = currentElements.filter(el => (currentTime - el.startTime) < el.duration);
    if (filteredElements.length !== currentElements.length) {
      animatedElementsRef.current = filteredElements;
      setAnimatedElements(filteredElements);
    }
  }, [hexToPixel]);



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

    try {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      
      const hexCoord = pixelToHex({ x, y });
      
      console.log('Click event:', event, 'Hex coordinates:', hexCoord);

      if (map && hexCoord.y >= 0 && hexCoord.y < map.length && 
          hexCoord.x >= 0 && hexCoord.x < map[0].length) {
        handleTileClick(hexCoord);
      }
    } catch (error) {
      console.error("Error in handleClick:", error)
    }
  }, [map, pixelToHex, handleTileClick]);

  // Initialiser le rendu
  useEffect(() => {
    const renderLoop = () => {
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
        animationRef.current = requestAnimationFrame(renderLoop);
        return;
      }

      // Draw ZFC zones in background
      if (typeof drawZFCZones === 'function') {
        drawZFCZones(ctx);
      }

      // Draw tiles
      map.forEach((row, y) => {
        row.forEach((tile, x) => {
          const center = hexToPixel({ x, y });
          const tilePosition = { x, y };
          
          const isSelected = selectedTile?.x === x && selectedTile?.y === y;
          const isHovered = hoveredTile?.x === x && hoveredTile?.y === y;
          
          if (typeof drawHexTile === 'function') {
            drawHexTile(ctx, center, tile, tilePosition, isSelected, isHovered);
          }
        });
      });

      // Draw heroes - CORRECTED: Use currentPlayer and currentGame properly
      const { currentGame, currentPlayer } = useGameStore.getState();
      
      // Draw current player heroes
      if (currentPlayer && currentPlayer.heroes && currentPlayer.heroes.length > 0) {
        currentPlayer.heroes.forEach(hero => {
          if (hero && hero.position) {
            const center = hexToPixel(hero.position);
            if (typeof drawHero === 'function') {
              drawHero(ctx, center, hero);
            }
          }
        });
      }

      // Draw other players' heroes if available
      if (currentGame && currentGame.players) {
        currentGame.players.forEach(player => {
          if (player.id !== currentPlayer?.id && player.heroes) {
            player.heroes.forEach(hero => {
              if (hero && hero.position) {
                const center = hexToPixel(hero.position);
                if (typeof drawHero === 'function') {
                  drawHero(ctx, center, hero);
                }
              }
            });
          }
        });
      }

      // Draw particle effects
      if (typeof drawParticles === 'function') {
        drawParticles(ctx);
      }

      // Schedule next render
      animationRef.current = requestAnimationFrame(renderLoop);
    };

    renderLoop();
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [map, selectedTile, hoveredTile, width, height, drawZFCZones, drawHexTile, drawParticles, hexToPixel, drawHero, t]);

  // Exposer la fonction centerOnPosition
  useImperativeHandle(ref, () => ({
    centerOnPosition: (position: Position) => {
      // Calculer la position pixel du héros
      const heroPixel = hexToPixel(position);
      
      // Calculer l'offset nécessaire pour centrer ce point sur l'écran
      const centerX = width / 2;
      const centerY = height / 2;
      
      const newOffsetX = centerX - heroPixel.x + 50; // +50 pour le offset initial
      const newOffsetY = centerY - heroPixel.y + 50; // +50 pour le offset initial
      
      setMapOffset({ x: newOffsetX - 50, y: newOffsetY - 50 });
    }
  }), [hexToPixel, width, height]);

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
});

export default ModernGameRenderer; 