import React, { useEffect, useRef, useState } from 'react';
import * as PIXI from 'pixi.js';
import { HexTile, BiomeType } from '../types/terrain';

interface OrganicTerrainRendererProps {
  width: number;
  height: number;
  tiles: HexTile[];
  onTileClick?: (tile: HexTile) => void;
  onTileHover?: (tile: HexTile | null) => void;
}

interface TerrainSprite {
  sprite: PIXI.Sprite;
  tile: HexTile;
  transitions: PIXI.Sprite[];
  overlays: PIXI.Sprite[];
}

// Configuration du terrain organique
const TILE_WIDTH = 64;
const TILE_HEIGHT = 56;
const BIOME_VARIANTS = 3; // Nombre de variantes par biome

// Couleurs organiques pour chaque biome (style HoMM3)
const BIOME_COLORS = {
  forest: 0x2D5016,
  desert: 0xF4A460,
  water: 0x4A90E2,
  mountain: 0x8B4513,
  grass: 0x7FB069,
  swamp: 0x556B2F,
  snow: 0xF0F8FF,
  lava: 0xFF4500,
  crystal: 0x9932CC,
  corruption: 0x8B0000
};

// Textures d'overlay pour les détails
const OVERLAY_COLORS = {
  river: 0x87CEEB,
  road: 0x8B4513,
  forest_trees: 0x1A3009,
  mountain_peaks: 0x696969,
  water_waves: 0x6CB4EE
};

const OrganicTerrainRenderer: React.FC<OrganicTerrainRendererProps> = ({
  width,
  height,
  tiles,
  onTileClick,
  onTileHover
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<PIXI.Application | null>(null);
  const terrainContainer = useRef<PIXI.Container | null>(null);
  const spritesRef = useRef<Map<string, TerrainSprite>>(new Map());
  const texturesRef = useRef<Map<string, PIXI.Texture>>(new Map());
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialiser PIXI
  useEffect(() => {
    if (!containerRef.current || tiles.length === 0) return;

    initializeRenderer();
    
    return () => {
      cleanup();
    };
  }, [tiles]);

  const initializeRenderer = async () => {
    try {
      // Créer l'application PIXI
      const app = new PIXI.Application({
        width,
        height,
        backgroundColor: 0x2C3E50,
        antialias: true,
        resolution: window.devicePixelRatio || 1,
        autoDensity: true
      });

      // Ajouter au DOM
      if (containerRef.current) {
        containerRef.current.appendChild(app.view as HTMLCanvasElement);
      }

      appRef.current = app;

      // Créer le conteneur terrain
      const container = new PIXI.Container();
      app.stage.addChild(container);
      terrainContainer.current = container;

      // Générer les textures organiques
      await generateOrganicTextures(app);

      // Créer les sprites de terrain
      await createTerrainSprites(app, container);

      // Appliquer les effets visuels finaux
      applyGlobalEffects(container);

      setIsInitialized(true);
    } catch (error) {
      console.error('❌ Error initializing organic terrain renderer:', error);
    }
  };

  const generateOrganicTextures = async (app: PIXI.Application) => {
    // Créer les textures de base pour chaque biome
    Object.entries(BIOME_COLORS).forEach(([biome, color]) => {
      for (let variant = 0; variant < BIOME_VARIANTS; variant++) {
        const texture = createOrganicBiomeTexture(app, biome, color, variant);
        texturesRef.current.set(`${biome}_${variant}`, texture);
      }
    });

    // Créer les textures de transition
    const biomes = Object.keys(BIOME_COLORS);
    biomes.forEach(biome1 => {
      biomes.forEach(biome2 => {
        if (biome1 !== biome2) {
          const transition = createTransitionTexture(app, biome1, biome2);
          texturesRef.current.set(`transition_${biome1}_${biome2}`, transition);
        }
      });
    });

    // Créer les overlays
    Object.entries(OVERLAY_COLORS).forEach(([overlay, color]) => {
      const texture = createOverlayTexture(app, overlay, color);
      texturesRef.current.set(`overlay_${overlay}`, texture);
    });
  };

  const createOrganicBiomeTexture = (app: PIXI.Application, biome: string, color: number, variant: number): PIXI.Texture => {
    const graphics = new PIXI.Graphics();
    const radius = TILE_WIDTH / 2;
    
    // Créer une forme hexagonale organique (sans bords nets)
    const hexPoints = createOrganicHexPoints(radius, variant);
    
    // Fond de base avec dégradé
    graphics.beginFill(color);
    graphics.drawPolygon(hexPoints);
    graphics.endFill();

    // Ajouter des détails spécifiques au biome
    addBiomeDetails(graphics, biome, radius, variant);

    // Créer un masque pour adoucir les bords
    const mask = createSoftMask(graphics, radius);
    graphics.mask = mask;

    // Note: Blur filter removed for now - to be implemented with proper PIXI filters
    // const blur = new PIXI.BlurFilter(0.5);
    // graphics.filters = [blur];

    return app.renderer.generateTexture(graphics);
  };

  const createOrganicHexPoints = (radius: number, variant: number): number[] => {
    const points: number[] = [];
    const centerX = radius;
    const centerY = radius;
    
    // Créer des points hexagonaux avec variation organique
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3;
      
      // Ajouter une variation basée sur le variant et la position
      const variation = (Math.sin(variant * 123.45 + i * 67.89) * 0.1 + 1);
      const hexRadius = radius * 0.9 * variation;
      
      const x = centerX + hexRadius * Math.cos(angle);
      const y = centerY + hexRadius * Math.sin(angle);
      
      points.push(x, y);
    }
    
    return points;
  };

  const addBiomeDetails = (graphics: PIXI.Graphics, biome: string, radius: number, variant: number) => {
    const centerX = radius;
    const centerY = radius;
    
    // Utiliser le variant pour créer des détails déterministes mais variés
    const seed = variant * 1000 + biome.length * 100;
    
    switch (biome) {
      case 'forest':
        // Ajouter des "arbres" organiques
        for (let i = 0; i < 4; i++) {
          const angle = (i * Math.PI * 2) / 4 + (seed % 100) * 0.01;
          const distance = radius * 0.3 + (seed % 50) * 0.005;
          const x = centerX + distance * Math.cos(angle);
          const y = centerY + distance * Math.sin(angle);
          
          graphics.beginFill(OVERLAY_COLORS.forest_trees, 0.7);
          graphics.drawCircle(x, y, 3 + (seed % 3));
          graphics.endFill();
        }
        break;
        
      case 'water':
        // Ajouter des "vagues" organiques
        graphics.lineStyle(1, OVERLAY_COLORS.water_waves, 0.6);
        for (let i = 0; i < 3; i++) {
          const y = centerY * 0.6 + i * centerY * 0.2;
          const waveOffset = (seed % 30) * 0.1;
          graphics.moveTo(centerX * 0.3, y + waveOffset);
          graphics.bezierCurveTo(
            centerX * 0.7, y - 3 + waveOffset,
            centerX * 1.3, y + 3 + waveOffset,
            centerX * 1.7, y + waveOffset
          );
        }
        break;
        
      case 'mountain':
        // Ajouter des "pics" organiques
        graphics.beginFill(OVERLAY_COLORS.mountain_peaks, 0.8);
        const peakPoints = [
          centerX * 0.7, centerY * 0.4,
          centerX * 0.9, centerY * 1.1,
          centerX * 1.1, centerY * 1.1,
          centerX * 1.3, centerY * 0.4
        ];
        graphics.drawPolygon(peakPoints);
        graphics.endFill();
        break;
        
      case 'desert':
        // Ajouter des "dunes" organiques
        graphics.beginFill(darkenColor(BIOME_COLORS.desert, 0.9), 0.4);
        graphics.drawEllipse(centerX * 0.8, centerY * 0.7, radius * 0.3, radius * 0.2);
        graphics.endFill();
        break;
    }
  };

  const createSoftMask = (graphics: PIXI.Graphics, radius: number): PIXI.Graphics => {
    const mask = new PIXI.Graphics();
    mask.beginFill(0xFFFFFF);
    mask.drawCircle(radius, radius, radius * 0.95);
    mask.endFill();
    return mask;
  };

  const createTransitionTexture = (app: PIXI.Application, biome1: string, biome2: string): PIXI.Texture => {
    const graphics = new PIXI.Graphics();
    const radius = TILE_WIDTH / 2;
    
    const color1 = BIOME_COLORS[biome1 as keyof typeof BIOME_COLORS];
    const color2 = BIOME_COLORS[biome2 as keyof typeof BIOME_COLORS];
    
    // Créer un dégradé entre les deux biomes
    const gradient = blendColors(color1, color2, 0.5);
    
    graphics.beginFill(gradient, 0.6);
    graphics.drawPolygon(createOrganicHexPoints(radius, 0));
    graphics.endFill();
    
    // Note: Blur filter removed for now - to be implemented with proper PIXI filters
    // const blur = new BlurFilter(1.5);
    // graphics.filters = [blur];
    
    return app.renderer.generateTexture(graphics);
  };

  const createOverlayTexture = (app: PIXI.Application, overlay: string, color: number): PIXI.Texture => {
    const graphics = new PIXI.Graphics();
    const radius = TILE_WIDTH / 2;
    
    graphics.lineStyle(2, color, 0.8);
    
    switch (overlay) {
      case 'river':
        // Rivière serpentine
        graphics.moveTo(0, radius);
        graphics.bezierCurveTo(radius * 0.5, radius * 0.3, radius * 1.5, radius * 1.7, radius * 2, radius);
        break;
      case 'road':
        // Route rectiligne
        graphics.moveTo(0, radius);
        graphics.lineTo(radius * 2, radius);
        break;
    }
    
    return app.renderer.generateTexture(graphics);
  };

  const createTerrainSprites = async (app: PIXI.Application, container: PIXI.Container) => {
    const hexMap = createHexMap(tiles);
    
    tiles.forEach(tile => {
      const { x, y } = axialToPixel(tile.q, tile.r);
      
      // Choisir une variante déterministe
      const variant = (tile.q * 928371 + tile.r * 123457) % BIOME_VARIANTS;
      const textureKey = `${tile.biome}_${variant}`;
      const texture = texturesRef.current.get(textureKey);
      
      if (texture) {
        const sprite = new PIXI.Sprite(texture);
        sprite.anchor.set(0.5);
        sprite.position.set(x, y);
        
        // Ajouter événements de clic et hover
        sprite.interactive = true;
        sprite.on('pointerdown', () => onTileClick?.(tile));
        sprite.on('pointerover', () => onTileHover?.(tile));
        sprite.on('pointerout', () => onTileHover?.(null));
        
        container.addChild(sprite);
        
        // Créer les transitions avec les voisins
        const neighbors = getNeighbors(tile, hexMap);
        const transitions: PIXI.Sprite[] = [];
        
        neighbors.forEach(neighbor => {
          if (neighbor.biome !== tile.biome) {
            const transitionKey = `transition_${tile.biome}_${neighbor.biome}`;
            const transitionTexture = texturesRef.current.get(transitionKey);
            
            if (transitionTexture) {
              const transitionSprite = new PIXI.Sprite(transitionTexture);
              transitionSprite.anchor.set(0.5);
              transitionSprite.position.set(x, y);
              container.addChild(transitionSprite);
              transitions.push(transitionSprite);
            }
          }
        });
        
        // Ajouter les overlays (rivières, routes, etc.)
        const overlays: PIXI.Sprite[] = [];
        if (tile.riverFlowDir) {
          const riverTexture = texturesRef.current.get('overlay_river');
          if (riverTexture) {
            const riverSprite = new PIXI.Sprite(riverTexture);
            riverSprite.anchor.set(0.5);
            riverSprite.position.set(x, y);
            riverSprite.alpha = 0.7;
            container.addChild(riverSprite);
            overlays.push(riverSprite);
          }
        }
        
        // Stocker la référence du sprite
        spritesRef.current.set(`${tile.q}_${tile.r}`, {
          sprite,
          tile,
          transitions,
          overlays
        });
      }
    });
  };

  const applyGlobalEffects = (container: PIXI.Container) => {
    // Note: Global blur filter removed for now - to be implemented with proper PIXI filters
    // const globalBlur = new BlurFilter(0.2);
    // container.filters = [globalBlur];
  };

  // Utilitaires
  const axialToPixel = (q: number, r: number) => ({
    x: q * TILE_WIDTH * 0.75 + width / 2,
    y: (r * TILE_HEIGHT + (q % 2) * (TILE_HEIGHT / 2)) + height / 2
  });

  const createHexMap = (tiles: HexTile[]): Map<string, HexTile> => {
    const map = new Map<string, HexTile>();
    tiles.forEach(tile => {
      map.set(`${tile.q}_${tile.r}`, tile);
    });
    return map;
  };

  const getNeighbors = (tile: HexTile, hexMap: Map<string, HexTile>): HexTile[] => {
    const neighbors: HexTile[] = [];
    const directions = [
      [+1, 0], [+1, -1], [0, -1], [-1, 0], [-1, +1], [0, +1]
    ];
    
    directions.forEach(([dq, dr]) => {
      const neighbor = hexMap.get(`${tile.q + dq}_${tile.r + dr}`);
      if (neighbor) {
        neighbors.push(neighbor);
      }
    });
    
    return neighbors;
  };

  const darkenColor = (color: number, factor: number): number => {
    const r = Math.floor(((color >> 16) & 0xFF) * factor);
    const g = Math.floor(((color >> 8) & 0xFF) * factor);
    const b = Math.floor((color & 0xFF) * factor);
    return (r << 16) | (g << 8) | b;
  };

  const blendColors = (color1: number, color2: number, factor: number): number => {
    const r1 = (color1 >> 16) & 0xFF;
    const g1 = (color1 >> 8) & 0xFF;
    const b1 = color1 & 0xFF;
    
    const r2 = (color2 >> 16) & 0xFF;
    const g2 = (color2 >> 8) & 0xFF;
    const b2 = color2 & 0xFF;
    
    const r = Math.floor(r1 * (1 - factor) + r2 * factor);
    const g = Math.floor(g1 * (1 - factor) + g2 * factor);
    const b = Math.floor(b1 * (1 - factor) + b2 * factor);
    
    return (r << 16) | (g << 8) | b;
  };

  const cleanup = () => {
    if (appRef.current) {
      appRef.current.destroy(true);
      appRef.current = null;
    }
    
    spritesRef.current.clear();
    texturesRef.current.clear();
    setIsInitialized(false);
  };

  return (
    <div 
      ref={containerRef}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '8px'
      }}
    >
      {!isInitialized && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: 'white',
          fontSize: '14px'
        }}>
          🎨 Rendering organic terrain...
        </div>
      )}
    </div>
  );
};

export default OrganicTerrainRenderer; 