// 🗺️ TerrainSpriteService - David Gervais Tileset with Elevations
// ================================================================
// Service pour gérer les sprites de terrain hexagonaux avec élévations
// Utilise le système David Gervais avec transitions et variantes

export interface TerrainSpriteData {
  core: string;
  edge?: string;
  transitions?: Record<string, string>;
  elevation?: {
    low: string;
    medium: string;
    high: string;
  };
  variants?: string[];
}

export interface TerrainZone {
  biome: string;
  size: number;
  centerX: number;
  centerY: number;
  distanceToEdge: number;
  elevation: number;
  moistureLevel: number;
  temperature: number;
}

export interface TerrainTile {
  x: number;
  y: number;
  type: string;
  elevation: number;
  tilesetVariant: string;
  transitions: Record<string, string>;
  biome: string;
  moistureLevel: number;
  temperature: number;
  walkable: boolean;
  movementCost: number;
}

export class TerrainSpriteService {
  private static instance: TerrainSpriteService;
  private spriteCache = new Map<string, HTMLImageElement>();
  private loadingPromises = new Map<string, Promise<HTMLImageElement>>();

  // David Gervais Hex Tileset avec élévations
  private readonly TERRAIN_SPRITES: Record<string, TerrainSpriteData> = {
    grass: {
      core: '/assets/terrain/grass/grass_core.png',
      edge: '/assets/terrain/grass/grass_edge.png',
      elevation: {
        low: '/assets/terrain/grass/grass_low.png',
        medium: '/assets/terrain/grass/grass_medium.png',
        high: '/assets/terrain/grass/grass_high.png'
      },
      transitions: {
        'forest': '/assets/terrain/transitions/grass_to_forest.png',
        'water': '/assets/terrain/transitions/grass_to_water.png',
        'mountain': '/assets/terrain/transitions/grass_to_mountain.png',
        'desert': '/assets/terrain/transitions/grass_to_desert.png',
        'swamp': '/assets/terrain/transitions/grass_to_swamp.png'
      },
      variants: [
        '/assets/terrain/grass/grass_variant1.png',
        '/assets/terrain/grass/grass_variant2.png',
        '/assets/terrain/grass/grass_variant3.png'
      ]
    },
    forest: {
      core: '/assets/terrain/forest/forest_core.png',
      edge: '/assets/terrain/forest/forest_edge.png',
      elevation: {
        low: '/assets/terrain/forest/forest_low.png',
        medium: '/assets/terrain/forest/forest_medium.png',
        high: '/assets/terrain/forest/forest_high.png'
      },
      transitions: {
        'grass': '/assets/terrain/transitions/forest_to_grass.png',
        'water': '/assets/terrain/transitions/forest_to_water.png',
        'mountain': '/assets/terrain/transitions/forest_to_mountain.png',
        'desert': '/assets/terrain/transitions/forest_to_desert.png',
        'swamp': '/assets/terrain/transitions/forest_to_swamp.png'
      },
      variants: [
        '/assets/terrain/forest/forest_dense.png',
        '/assets/terrain/forest/forest_sparse.png',
        '/assets/terrain/forest/forest_mixed.png'
      ]
    },
    water: {
      core: '/assets/terrain/water/water_core.png',
      edge: '/assets/terrain/water/water_edge.png',
      elevation: {
        low: '/assets/terrain/water/water_shallow.png',
        medium: '/assets/terrain/water/water_medium.png',
        high: '/assets/terrain/water/water_deep.png'
      },
      transitions: {
        'grass': '/assets/terrain/transitions/water_to_grass.png',
        'forest': '/assets/terrain/transitions/water_to_forest.png',
        'mountain': '/assets/terrain/transitions/water_to_mountain.png',
        'desert': '/assets/terrain/transitions/water_to_desert.png',
        'swamp': '/assets/terrain/transitions/water_to_swamp.png'
      },
      variants: [
        '/assets/terrain/water/water_clear.png',
        '/assets/terrain/water/water_murky.png',
        '/assets/terrain/water/water_frozen.png'
      ]
    },
    mountain: {
      core: '/assets/terrain/mountain/mountain_core.png',
      edge: '/assets/terrain/mountain/mountain_edge.png',
      elevation: {
        low: '/assets/terrain/mountain/mountain_hills.png',
        medium: '/assets/terrain/mountain/mountain_peaks.png',
        high: '/assets/terrain/mountain/mountain_alpine.png'
      },
      transitions: {
        'grass': '/assets/terrain/transitions/mountain_to_grass.png',
        'forest': '/assets/terrain/transitions/mountain_to_forest.png',
        'water': '/assets/terrain/transitions/mountain_to_water.png',
        'desert': '/assets/terrain/transitions/mountain_to_desert.png',
        'swamp': '/assets/terrain/transitions/mountain_to_swamp.png'
      },
      variants: [
        '/assets/terrain/mountain/mountain_rocky.png',
        '/assets/terrain/mountain/mountain_snowy.png',
        '/assets/terrain/mountain/mountain_volcanic.png'
      ]
    },
    desert: {
      core: '/assets/terrain/desert/desert_core.png',
      edge: '/assets/terrain/desert/desert_edge.png',
      elevation: {
        low: '/assets/terrain/desert/desert_oasis.png',
        medium: '/assets/terrain/desert/desert_sand.png',
        high: '/assets/terrain/desert/desert_dunes.png'
      },
      transitions: {
        'grass': '/assets/terrain/transitions/desert_to_grass.png',
        'forest': '/assets/terrain/transitions/desert_to_forest.png',
        'water': '/assets/terrain/transitions/desert_to_water.png',
        'mountain': '/assets/terrain/transitions/desert_to_mountain.png',
        'swamp': '/assets/terrain/transitions/desert_to_swamp.png'
      },
      variants: [
        '/assets/terrain/desert/desert_red.png',
        '/assets/terrain/desert/desert_yellow.png',
        '/assets/terrain/desert/desert_rocky.png'
      ]
    },
    swamp: {
      core: '/assets/terrain/swamp/swamp_core.png',
      edge: '/assets/terrain/swamp/swamp_edge.png',
      elevation: {
        low: '/assets/terrain/swamp/swamp_bog.png',
        medium: '/assets/terrain/swamp/swamp_marsh.png',
        high: '/assets/terrain/swamp/swamp_mire.png'
      },
      transitions: {
        'grass': '/assets/terrain/transitions/swamp_to_grass.png',
        'forest': '/assets/terrain/transitions/swamp_to_forest.png',
        'water': '/assets/terrain/transitions/swamp_to_water.png',
        'mountain': '/assets/terrain/transitions/swamp_to_mountain.png',
        'desert': '/assets/terrain/transitions/swamp_to_desert.png'
      },
      variants: [
        '/assets/terrain/swamp/swamp_dark.png',
        '/assets/terrain/swamp/swamp_misty.png',
        '/assets/terrain/swamp/swamp_toxic.png'
      ]
    }
  };

  // Couleurs de fallback pour les élévations
  private readonly ELEVATION_COLORS: Record<string, Record<string, string>> = {
    grass: {
      low: '#7CB342',
      medium: '#8BC34A',
      high: '#9CCC65'
    },
    forest: {
      low: '#2E7D32',
      medium: '#388E3C',
      high: '#43A047'
    },
    water: {
      low: '#0277BD',
      medium: '#0288D1',
      high: '#039BE5'
    },
    mountain: {
      low: '#5D4037',
      medium: '#6D4C41',
      high: '#795548'
    },
    desert: {
      low: '#F57C00',
      medium: '#FB8C00',
      high: '#FF9800'
    },
    swamp: {
      low: '#33691E',
      medium: '#689F38',
      high: '#7CB342'
    }
  };

  private constructor() {}

  static getInstance(): TerrainSpriteService {
    if (!TerrainSpriteService.instance) {
      TerrainSpriteService.instance = new TerrainSpriteService();
    }
    return TerrainSpriteService.instance;
  }

  async getTerrainSprite(tile: TerrainTile): Promise<HTMLImageElement | null> {
    const spriteData = this.TERRAIN_SPRITES[tile.type];
    if (!spriteData) return null;

    // Choisir le sprite basé sur l'élévation et les variantes
    const spriteUrl = this.selectSpriteUrl(tile, spriteData);
    
    if (this.spriteCache.has(spriteUrl)) {
      return this.spriteCache.get(spriteUrl)!;
    }

    if (this.loadingPromises.has(spriteUrl)) {
      return this.loadingPromises.get(spriteUrl)!;
    }

    const loadPromise = this.loadSprite(spriteUrl);
    this.loadingPromises.set(spriteUrl, loadPromise);

    try {
      const sprite = await loadPromise;
      this.spriteCache.set(spriteUrl, sprite);
      this.loadingPromises.delete(spriteUrl);
      return sprite;
    } catch (error) {
      this.loadingPromises.delete(spriteUrl);
      console.warn(`Failed to load terrain sprite: ${spriteUrl}`, error);
      return null;
    }
  }

  private selectSpriteUrl(tile: TerrainTile, spriteData: TerrainSpriteData): string {
    // Prioriser les sprites d'élévation
    if (spriteData.elevation) {
      const elevationSprite = spriteData.elevation[tile.tilesetVariant as keyof typeof spriteData.elevation];
      if (elevationSprite) return elevationSprite;
    }

    // Utiliser les variantes si disponibles
    if (spriteData.variants && spriteData.variants.length > 0) {
      const variantIndex = this.getVariantIndex(tile);
      return spriteData.variants[variantIndex];
    }

    // Fallback sur le sprite de base
    return spriteData.core;
  }

  private getVariantIndex(tile: TerrainTile): number {
    // Utiliser les coordonnées et les propriétés du tile pour déterminer la variante
    const hash = (tile.x * 31 + tile.y * 17 + tile.elevation * 13 + tile.moistureLevel * 7 + tile.temperature * 3) % 1000;
    const spriteData = this.TERRAIN_SPRITES[tile.type];
    if (!spriteData.variants) return 0;
    return Math.floor(hash / 1000 * spriteData.variants.length);
  }

  async getTransitionSprite(tile: TerrainTile, direction: string): Promise<HTMLImageElement | null> {
    const spriteData = this.TERRAIN_SPRITES[tile.type];
    if (!spriteData?.transitions) return null;

    const neighborTerrain = tile.transitions[direction];
    if (!neighborTerrain) return null;

    const transitionUrl = spriteData.transitions[neighborTerrain];
    if (!transitionUrl) return null;

    try {
      return await this.loadSprite(transitionUrl);
    } catch (error) {
      console.warn(`Failed to load transition sprite: ${transitionUrl}`, error);
      return null;
    }
  }

  private async loadSprite(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error(`Failed to load sprite: ${url}`));
      img.src = url;
    });
  }

  getTerrainColor(tile: TerrainTile): string {
    const elevationColors = this.ELEVATION_COLORS[tile.type];
    if (elevationColors) {
      return elevationColors[tile.tilesetVariant] || elevationColors.medium;
    }
    
    // Fallback colors
    const fallbackColors: Record<string, string> = {
      grass: '#7CB342',
      forest: '#2E7D32',
      water: '#0277BD',
      mountain: '#5D4037',
      desert: '#F57C00',
      swamp: '#33691E'
    };
    
    return fallbackColors[tile.type] || '#888888';
  }

  // Méthodes utilitaires pour les zones de terrain
  detectTerrainZones(tiles: TerrainTile[]): TerrainZone[] {
    const zones: TerrainZone[] = [];
    const processedTiles = new Set<string>();

    for (const tile of tiles) {
      const tileKey = `${tile.x},${tile.y}`;
      if (processedTiles.has(tileKey)) continue;

      const zone = this.expandZone(tile, tiles, processedTiles);
      if (zone.size > 1) {
        zones.push(zone);
      }
    }

    return zones;
  }

  private expandZone(startTile: TerrainTile, allTiles: TerrainTile[], processedTiles: Set<string>): TerrainZone {
    const zone: TerrainZone = {
      biome: startTile.biome,
      size: 0,
      centerX: 0,
      centerY: 0,
      distanceToEdge: 0,
      elevation: startTile.elevation,
      moistureLevel: startTile.moistureLevel,
      temperature: startTile.temperature
    };

    const queue: TerrainTile[] = [startTile];
    const zoneTiles: TerrainTile[] = [];

    while (queue.length > 0) {
      const tile = queue.shift()!;
      const tileKey = `${tile.x},${tile.y}`;
      
      if (processedTiles.has(tileKey)) continue;
      processedTiles.add(tileKey);
      
      zoneTiles.push(tile);
      
      // Chercher les voisins du même biome
      const neighbors = this.getNeighbors(tile, allTiles);
      for (const neighbor of neighbors) {
        const neighborKey = `${neighbor.x},${neighbor.y}`;
        if (!processedTiles.has(neighborKey) && neighbor.biome === startTile.biome) {
          queue.push(neighbor);
        }
      }
    }

    // Calculer les propriétés de la zone
    zone.size = zoneTiles.length;
    zone.centerX = zoneTiles.reduce((sum, t) => sum + t.x, 0) / zoneTiles.length;
    zone.centerY = zoneTiles.reduce((sum, t) => sum + t.y, 0) / zoneTiles.length;
    zone.elevation = zoneTiles.reduce((sum, t) => sum + t.elevation, 0) / zoneTiles.length;
    zone.moistureLevel = zoneTiles.reduce((sum, t) => sum + t.moistureLevel, 0) / zoneTiles.length;
    zone.temperature = zoneTiles.reduce((sum, t) => sum + t.temperature, 0) / zoneTiles.length;

    return zone;
  }

  private getNeighbors(tile: TerrainTile, allTiles: TerrainTile[]): TerrainTile[] {
    const neighbors: TerrainTile[] = [];
    const directions = [
      {dx: -1, dy: 0}, {dx: 1, dy: 0},
      {dx: 0, dy: -1}, {dx: 0, dy: 1},
      {dx: -1, dy: -1}, {dx: 1, dy: -1}
    ];

    for (const dir of directions) {
      const neighbor = allTiles.find(t => t.x === tile.x + dir.dx && t.y === tile.y + dir.dy);
      if (neighbor) {
        neighbors.push(neighbor);
      }
    }

    return neighbors;
  }

  // Nettoyage du cache
  clearCache(): void {
    this.spriteCache.clear();
    this.loadingPromises.clear();
  }

  // Statistiques du cache
  getCacheStats(): { size: number; loaded: number; loading: number } {
    return {
      size: this.spriteCache.size,
      loaded: this.spriteCache.size,
      loading: this.loadingPromises.size
    };
  }
}
 
 // Export singleton instance
 export const terrainSpriteService = TerrainSpriteService.getInstance(); 