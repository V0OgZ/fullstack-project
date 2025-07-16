// TerrainSpriteService for David Gervais Hex Tileset
// Source: https://opengameart.org/content/hexagon-tileset
// Author: David E. Gervais
// License: CC-BY 3.0

export interface TerrainSpriteData {
  core: string;
  edge?: string;
  transitions?: Record<string, string>;
}

export interface TerrainZone {
  biome: string;
  size: number;
  centerX: number;
  centerY: number;
  distanceToEdge: number;
}

export class TerrainSpriteService {
  private static instance: TerrainSpriteService;
  private spriteCache = new Map<string, HTMLImageElement>();
  private loadingPromises = new Map<string, Promise<HTMLImageElement>>();

  // David Gervais Hex Tileset - Organized structure
  private readonly TERRAIN_SPRITES: Record<string, TerrainSpriteData> = {
    grass: {
      core: '/assets/terrain/grass/grass_core.png',
      edge: '/assets/terrain/grass/grass_edge.png',
      transitions: {
        forest: '/assets/terrain/grass/grass_to_forest.png',
        water: '/assets/terrain/grass/grass_to_water.png',
        desert: '/assets/terrain/grass/grass_to_desert.png',
        mountain: '/assets/terrain/grass/grass_to_mountain.png'
      }
    },
    forest: {
      core: '/assets/terrain/forest/forest_core.png',
      edge: '/assets/terrain/forest/forest_edge.png',
      transitions: {
        grass: '/assets/terrain/forest/forest_to_grass.png',
        water: '/assets/terrain/forest/forest_to_water.png',
        mountain: '/assets/terrain/forest/forest_to_mountain.png'
      }
    },
    water: {
      core: '/assets/terrain/water/water_deep.png',
      edge: '/assets/terrain/water/water_shore.png',
      transitions: {
        grass: '/assets/terrain/water/water_to_grass.png',
        forest: '/assets/terrain/water/water_to_forest.png',
        desert: '/assets/terrain/water/water_to_desert.png'
      }
    },
    desert: {
      core: '/assets/terrain/desert/desert_core.png',
      edge: '/assets/terrain/desert/desert_dune.png',
      transitions: {
        grass: '/assets/terrain/desert/desert_to_grass.png',
        water: '/assets/terrain/desert/desert_to_water.png',
        mountain: '/assets/terrain/desert/desert_to_mountain.png'
      }
    },
    mountain: {
      core: '/assets/terrain/mountain/mountain_peak.png',
      edge: '/assets/terrain/mountain/mountain_slope.png',
      transitions: {
        grass: '/assets/terrain/mountain/mountain_to_grass.png',
        forest: '/assets/terrain/mountain/mountain_to_forest.png',
        desert: '/assets/terrain/mountain/mountain_to_desert.png'
      }
    },
    swamp: {
      core: '/assets/terrain/swamp/swamp_core.png',
      edge: '/assets/terrain/swamp/swamp_edge.png',
      transitions: {
        grass: '/assets/terrain/swamp/swamp_to_grass.png',
        water: '/assets/terrain/swamp/swamp_to_water.png',
        forest: '/assets/terrain/swamp/swamp_to_forest.png'
      }
    }
  };

  // Color fallbacks for when sprites fail to load
  private readonly TERRAIN_COLORS: Record<string, string> = {
    grass: '#4CAF50',
    forest: '#2E7D32',
    water: '#2196F3',
    desert: '#FFC107',
    mountain: '#795548',
    swamp: '#8BC34A'
  };

  static getInstance(): TerrainSpriteService {
    if (!TerrainSpriteService.instance) {
      TerrainSpriteService.instance = new TerrainSpriteService();
    }
    return TerrainSpriteService.instance;
  }

  /**
   * Get the appropriate sprite for a terrain tile based on zone data
   */
  async getTerrainSprite(
    terrain: string, 
    zoneData: TerrainZone, 
    neighboringTerrain?: string[]
  ): Promise<HTMLImageElement | null> {
    const spriteData = this.TERRAIN_SPRITES[terrain];
    if (!spriteData) return null;

    // Determine which sprite to use based on zone position
    let spritePath: string;

    if (zoneData.distanceToEdge === 0) {
      // At zone edge - use edge sprite
      spritePath = spriteData.edge || spriteData.core;
    } else if (zoneData.distanceToEdge === 1 && neighboringTerrain) {
      // Near edge with different terrain - use transition sprite
      const neighborTerrain = this.getMostCommonNeighbor(neighboringTerrain);
      spritePath = spriteData.transitions?.[neighborTerrain] || spriteData.core;
    } else {
      // Core of zone - use core sprite
      spritePath = spriteData.core;
    }

    return await this.loadSprite(spritePath);
  }

  /**
   * Get fallback color for terrain when sprite fails
   */
  getTerrainColor(terrain: string): string {
    return this.TERRAIN_COLORS[terrain] || '#666666';
  }

  /**
   * Load and cache a sprite
   */
  private async loadSprite(spritePath: string): Promise<HTMLImageElement | null> {
    // Check cache first
    if (this.spriteCache.has(spritePath)) {
      return this.spriteCache.get(spritePath)!;
    }

    // Check if already loading
    if (this.loadingPromises.has(spritePath)) {
      return await this.loadingPromises.get(spritePath)!;
    }

    // Start loading
    const loadPromise = new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      
      img.onload = () => {
        this.spriteCache.set(spritePath, img);
        this.loadingPromises.delete(spritePath);
        resolve(img);
      };
      
      img.onerror = () => {
        this.loadingPromises.delete(spritePath);
        console.warn(`Failed to load terrain sprite: ${spritePath}`);
        reject(new Error(`Failed to load sprite: ${spritePath}`));
      };
      
      img.src = spritePath;
    });

    this.loadingPromises.set(spritePath, loadPromise);
    
    try {
      return await loadPromise;
    } catch (error) {
      return null; // Return null on error, caller will use color fallback
    }
  }

  /**
   * Get the most common neighboring terrain for transition selection
   */
  private getMostCommonNeighbor(neighboringTerrain: string[]): string {
    const counts: Record<string, number> = {};
    
    neighboringTerrain.forEach(terrain => {
      counts[terrain] = (counts[terrain] || 0) + 1;
    });

    return Object.entries(counts)
      .sort(([,a], [,b]) => b - a)[0]?.[0] || 'grass';
  }

  /**
   * Preload all core sprites for better performance
   */
  async preloadCoreSprites(): Promise<void> {
    const coreSprites = Object.values(this.TERRAIN_SPRITES)
      .map(spriteData => spriteData.core);

    const loadPromises = coreSprites.map(spritePath => 
      this.loadSprite(spritePath).catch(() => null)
    );

    await Promise.all(loadPromises);
    console.log('Core terrain sprites preloaded');
  }

  /**
   * Get all available terrain types
   */
  getAvailableTerrains(): string[] {
    return Object.keys(this.TERRAIN_SPRITES);
  }

  /**
   * Check if a terrain type is supported
   */
  isTerrainSupported(terrain: string): boolean {
    return terrain in this.TERRAIN_SPRITES;
  }

  /**
   * Get sprite dimensions (David Gervais tiles are ~64x56)
   */
  getSpriteSize(): { width: number; height: number } {
    return { width: 64, height: 56 };
  }

  /**
   * Clear sprite cache (useful for memory management)
   */
  clearCache(): void {
    this.spriteCache.clear();
    this.loadingPromises.clear();
  }
}

export const terrainSpriteService = TerrainSpriteService.getInstance(); 