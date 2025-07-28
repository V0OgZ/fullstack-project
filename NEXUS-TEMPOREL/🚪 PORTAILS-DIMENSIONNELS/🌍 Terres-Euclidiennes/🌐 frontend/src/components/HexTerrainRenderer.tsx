import React, { useEffect, useRef, useState } from 'react';
import * as PIXI from 'pixi.js';
import { TerrainEngine, HexUtils } from '../utils/terrainEngine';
import { HexTile, HexMap, BiomeType, TERRAIN_CONSTANTS } from '../types/terrain';

interface HexTerrainRendererProps {
  width: number;
  height: number;
  tiles: HexTile[];
  seed?: number;
  onTileClick?: (tile: HexTile) => void;
  onTileHover?: (tile: HexTile | null) => void;
}

interface TerrainSprite {
  sprite: PIXI.Sprite;
  tile: HexTile;
  overlays: PIXI.Sprite[];
}

const HexTerrainRenderer: React.FC<HexTerrainRendererProps> = ({
  width,
  height,
  tiles,
  seed = 12345,
  onTileClick,
  onTileHover
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<PIXI.Application | null>(null);
  const terrainEngineRef = useRef<TerrainEngine | null>(null);
  const spritesRef = useRef<Map<string, TerrainSprite>>(new Map());
  const texturesRef = useRef<Map<string, PIXI.Texture>>(new Map());
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Initialiser PIXI et le terrain
  useEffect(() => {
    if (!containerRef.current || tiles.length === 0) return;

    initializePixi();
    
    return () => {
      cleanup();
    };
  }, [tiles, seed]);

  const initializePixi = async () => {
    try {
      setIsLoading(true);
      setLoadError(null);

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

      // Initialiser le terrain
      terrainEngineRef.current = new TerrainEngine(tiles, seed);
      const hexMap = terrainEngineRef.current.processAll();

      // Charger les assets de base (temporaire - sprites colorés)
      await loadTemporaryAssets(app);

      // Créer les sprites de terrain
      await createTerrainSprites(app, hexMap);

      // Appliquer les effets visuels
      applyVisualEffects(app);

      setIsLoading(false);
    } catch (error) {
      console.error('❌ Error initializing terrain renderer:', error);
      setLoadError(`Failed to initialize terrain: ${error}`);
      setIsLoading(false);
    }
  };

  const loadTemporaryAssets = async (app: PIXI.Application) => {
    // Créer des textures temporaires colorées pour chaque biome
    const biomeColors: Record<BiomeType, number> = {
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
    
    // Créer des textures temporaires
    for (const [biome, color] of Object.entries(biomeColors)) {
      const texture = createColoredHexTexture(app, color as number, biome);
      texturesRef.current.set(`${biome}_temp`, texture);
    }

    // Textures de transition
    const transitionTexture = createTransitionTexture(app);
    texturesRef.current.set('transition_temp', transitionTexture);

    // Texture de rivière
    const riverTexture = createRiverTexture(app);
    texturesRef.current.set('river_temp', riverTexture);
  };

  const createColoredHexTexture = (app: PIXI.Application, color: number, biome: string): PIXI.Texture => {
    const graphics = new PIXI.Graphics();
    const size = TERRAIN_CONSTANTS.TILE_WIDTH;
    const hexRadius = size / 2;
    
    // Créer un hexagone avec dégradé
    const gradient = createBiomeGradient(graphics, color, hexRadius);
    
    // Dessiner l'hexagone
    graphics.beginFill(color);
    graphics.drawPolygon([
      hexRadius, 0,
      hexRadius * 1.5, hexRadius * 0.5,
      hexRadius * 1.5, hexRadius * 1.5,
      hexRadius, hexRadius * 2,
      hexRadius * 0.5, hexRadius * 1.5,
      hexRadius * 0.5, hexRadius * 0.5
    ]);
    graphics.endFill();

    // Ajouter de la texture selon le biome
    addBiomeTexture(graphics, biome, hexRadius);

    return app.renderer.generateTexture(graphics);
  };

  const createBiomeGradient = (graphics: PIXI.Graphics, baseColor: number, radius: number) => {
    // Créer un dégradé subtil pour donner de la profondeur
    const darkerColor = darkenColor(baseColor, 0.8);
    const lighterColor = lightenColor(baseColor, 1.2);
    
    // Simpler gradient effect
    graphics.beginFill(darkerColor, 0.3);
    graphics.drawCircle(radius, radius, radius * 0.8);
    graphics.endFill();
    
    graphics.beginFill(lighterColor, 0.2);
    graphics.drawCircle(radius * 0.7, radius * 0.7, radius * 0.4);
    graphics.endFill();
  };

  const addBiomeTexture = (graphics: PIXI.Graphics, biome: string, radius: number) => {
    switch (biome) {
      case 'forest':
        // Ajouter des "arbres" simples
        for (let i = 0; i < 3; i++) {
          const x = radius * 0.5 + Math.random() * radius;
          const y = radius * 0.5 + Math.random() * radius;
          graphics.beginFill(0x1A3009);
          graphics.drawCircle(x, y, 3);
          graphics.endFill();
        }
        break;
      case 'water':
        // Ajouter des "vagues"
        graphics.lineStyle(2, 0x87CEEB, 0.5);
        for (let i = 0; i < 2; i++) {
          const y = radius * 0.5 + i * radius * 0.5;
          graphics.moveTo(radius * 0.3, y);
          graphics.bezierCurveTo(radius * 0.7, y - 5, radius * 1.3, y + 5, radius * 1.7, y);
        }
        break;
      case 'mountain':
        // Ajouter des "pics"
        graphics.beginFill(0x696969);
        graphics.drawPolygon([
          radius * 0.7, radius * 0.5,
          radius * 0.9, radius * 1.2,
          radius * 1.1, radius * 1.2,
          radius * 1.3, radius * 0.5
        ]);
        graphics.endFill();
        break;
    }
  };

  const createTransitionTexture = (app: PIXI.Application): PIXI.Texture => {
    const graphics = new PIXI.Graphics();
    const size = TERRAIN_CONSTANTS.TILE_WIDTH;
    
    // Créer un dégradé pour les transitions
    graphics.beginFill(0xFFFFFF, 0.3);
    graphics.drawRect(0, 0, size, size);
    graphics.endFill();
    
    return app.renderer.generateTexture(graphics);
  };

  const createRiverTexture = (app: PIXI.Application): PIXI.Texture => {
    const graphics = new PIXI.Graphics();
    const size = TERRAIN_CONSTANTS.TILE_WIDTH;
    
    // Créer une ligne de rivière
    graphics.lineStyle(8, 0x4A90E2, 0.8);
    graphics.moveTo(0, size / 2);
    graphics.lineTo(size, size / 2);
    
    return app.renderer.generateTexture(graphics);
  };

  const createTerrainSprites = async (app: PIXI.Application, hexMap: HexMap) => {
    const container = new PIXI.Container();
    app.stage.addChild(container);

    // Centrer la vue
    const bounds = hexMap.bounds;
    const centerQ = (bounds.minQ + bounds.maxQ) / 2;
    const centerR = (bounds.minR + bounds.maxR) / 2;
    const centerPixel = HexUtils.axialToPixel(centerQ, centerR);
    
    container.x = width / 2 - centerPixel.x;
    container.y = height / 2 - centerPixel.y;

    // Créer les sprites pour chaque tile
    const tileEntries = Array.from(hexMap.tiles.entries());
    for (const [key, tile] of tileEntries) {
      const terrainSprite = await createTileSprite(app, tile);
      container.addChild(terrainSprite.sprite);
      
      // Ajouter les overlays
      for (const overlay of terrainSprite.overlays) {
        container.addChild(overlay);
      }
      
      spritesRef.current.set(key, terrainSprite);
    }
  };

  const createTileSprite = async (app: PIXI.Application, tile: HexTile): Promise<TerrainSprite> => {
    const position = HexUtils.axialToPixel(tile.q, tile.r);
    
    // Sprite principal
    const texture = texturesRef.current.get(`${tile.biome}_temp`) || PIXI.Texture.EMPTY;
    const sprite = new PIXI.Sprite(texture);
    
    sprite.anchor.set(0.5);
    sprite.x = position.x;
    sprite.y = position.y;
    
    // Ajouter de la variation
    const hash = HexUtils.deterministicHash(tile.q, tile.r, seed);
    sprite.rotation = (hash - 0.5) * 0.1; // Rotation légère
    sprite.scale.set(0.95 + hash * 0.1); // Échelle légère
    
    // Interactivité
    sprite.interactive = true;
    sprite.on('pointerdown', () => onTileClick?.(tile));
    sprite.on('pointerover', () => onTileHover?.(tile));
    sprite.on('pointerout', () => onTileHover?.(null));

    const overlays: PIXI.Sprite[] = [];

    // Ajouter overlay de rivière si nécessaire
    if (tile.riverFlowDir) {
      const riverTexture = texturesRef.current.get('river_temp') || PIXI.Texture.EMPTY;
      const riverSprite = new PIXI.Sprite(riverTexture);
      
      riverSprite.anchor.set(0.5);
      riverSprite.x = position.x;
      riverSprite.y = position.y;
      
      // Orienter selon la direction
      riverSprite.rotation = getRiverRotation(tile.riverFlowDir);
      
      overlays.push(riverSprite);
    }

    // Ajouter overlay de transition si nécessaire
    if (tile.distanceToEdge === 0) {
      const transitionTexture = texturesRef.current.get('transition_temp') || PIXI.Texture.EMPTY;
      const transitionSprite = new PIXI.Sprite(transitionTexture);
      
      transitionSprite.anchor.set(0.5);
      transitionSprite.x = position.x;
      transitionSprite.y = position.y;
      transitionSprite.alpha = 0.5;
      
      overlays.push(transitionSprite);
    }

    return { sprite, tile, overlays };
  };

  const getRiverRotation = (direction: string): number => {
    const rotations: Record<string, number> = {
      'E': 0,
      'NE': Math.PI / 3,
      'NW': 2 * Math.PI / 3,
      'W': Math.PI,
      'SW': 4 * Math.PI / 3,
      'SE': 5 * Math.PI / 3
    };
    return rotations[direction] || 0;
  };

  const applyVisualEffects = (app: PIXI.Application) => {
    // TODO: Réactiver les filtres quand pixi-filters sera correctement configuré
    // Pour l'instant, on applique juste un fond coloré
    app.stage.alpha = 0.95;
  };

  const darkenColor = (color: number, factor: number): number => {
    const r = (color >> 16) & 0xFF;
    const g = (color >> 8) & 0xFF;
    const b = color & 0xFF;
    
    return ((r * factor) << 16) | ((g * factor) << 8) | (b * factor);
  };

  const lightenColor = (color: number, factor: number): number => {
    const r = Math.min(255, (color >> 16) & 0xFF * factor);
    const g = Math.min(255, (color >> 8) & 0xFF * factor);
    const b = Math.min(255, color & 0xFF * factor);
    
    return (r << 16) | (g << 8) | b;
  };

  const cleanup = () => {
    if (appRef.current) {
      appRef.current.destroy(true);
      appRef.current = null;
    }
    spritesRef.current.clear();
    texturesRef.current.clear();
    terrainEngineRef.current = null;
  };

  // Redimensionner si nécessaire
  useEffect(() => {
    if (appRef.current) {
      appRef.current.renderer.resize(width, height);
    }
  }, [width, height]);

  if (loadError) {
    return (
      <div className="hex-terrain-error" style={{ 
        width, 
        height, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#f8f9fa',
        color: '#dc3545',
        border: '2px dashed #dc3545'
      }}>
        <div>
          <h3>❌ Terrain Loading Error</h3>
          <p>{loadError}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="hex-terrain-container" style={{ position: 'relative' }}>
      <div 
        ref={containerRef} 
        style={{ width, height }}
        className="hex-terrain-canvas"
      />
      
      {isLoading && (
        <div 
          className="hex-terrain-loading"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(44, 62, 80, 0.8)',
            color: 'white',
            fontSize: '18px'
          }}
        >
          <div>
            <div style={{ marginBottom: '10px' }}>🔄 Processing terrain...</div>
            <div style={{ fontSize: '14px', opacity: 0.8 }}>
              Flood-fill • Distance • Sprites • Effects
            </div>
          </div>
        </div>
      )}
      
      {/* Debug info */}
      {process.env.NODE_ENV === 'development' && terrainEngineRef.current && (
        <div 
          className="hex-terrain-debug"
          style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            padding: '10px',
            borderRadius: '5px',
            fontSize: '12px'
          }}
        >
          <div>Tiles: {tiles.length}</div>
          <div>Groups: {terrainEngineRef.current.getGroups().length}</div>
          <div>Seed: {seed}</div>
        </div>
      )}
    </div>
  );
};

export default HexTerrainRenderer;