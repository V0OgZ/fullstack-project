// 🗺️ TerrainSpriteService - Simple Terrain Sprites
// ================================================
// Service pour gérer les sprites de terrain hexagonaux avec sprites existants

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

  // Simple terrain sprites using existing assets
  private readonly TERRAIN_SPRITES: Record<string, TerrainSpriteData> = {
    grass: {
      core: '/assets/terrain/grass.png',
      edge: '/assets/terrain/grass.png',
      elevation: {
        low: '/assets/terrain/grass.png',
        medium: '/assets/terrain/grass.png',
        high: '/assets/terrain/grass.png'
      },
      transitions: {
        'forest': '/assets/terrain/forest.png',
        'water': '/assets/terrain/water.png',
        'mountain': '/assets/terrain/mountain.png',
        'desert': '/assets/terrain/desert.png',
        'swamp': '/assets/terrain/swamp.png'
      },
      variants: [
        '/assets/terrain/grass.png',
        '/assets/terrain/grass.png',
        '/assets/terrain/grass.png'
      ]
    },
    forest: {
      core: '/assets/terrain/forest.png',
      edge: '/assets/terrain/forest.png',
      elevation: {
        low: '/assets/terrain/forest.png',
        medium: '/assets/terrain/forest.png',
        high: '/assets/terrain/forest.png'
      },
      transitions: {
        'grass': '/assets/terrain/grass.png',
        'water': '/assets/terrain/water.png',
        'mountain': '/assets/terrain/mountain.png',
        'desert': '/assets/terrain/desert.png',
        'swamp': '/assets/terrain/swamp.png'
      },
      variants: [
        '/assets/terrain/forest.png',
        '/assets/terrain/forest.png',
        '/assets/terrain/forest.png'
      ]
    },
    water: {
      core: '/assets/terrain/water.png',
      edge: '/assets/terrain/water.png',
      elevation: {
        low: '/assets/terrain/water.png',
        medium: '/assets/terrain/water.png',
        high: '/assets/terrain/water.png'
      },
      transitions: {
        'grass': '/assets/terrain/grass.png',
        'forest': '/assets/terrain/forest.png',
        'mountain': '/assets/terrain/mountain.png',
        'desert': '/assets/terrain/desert.png',
        'swamp': '/assets/terrain/swamp.png'
      },
      variants: [
        '/assets/terrain/water.png',
        '/assets/terrain/water.png',
        '/assets/terrain/water.png'
      ]
    },
    mountain: {
      core: '/assets/terrain/mountain.png',
      edge: '/assets/terrain/mountain.png',
      elevation: {
        low: '/assets/terrain/mountain.png',
        medium: '/assets/terrain/mountain.png',
        high: '/assets/terrain/mountain.png'
      },
      transitions: {
        'grass': '/assets/terrain/grass.png',
        'forest': '/assets/terrain/forest.png',
        'water': '/assets/terrain/water.png',
        'desert': '/assets/terrain/desert.png',
        'swamp': '/assets/terrain/swamp.png'
      },
      variants: [
        '/assets/terrain/mountain.png',
        '/assets/terrain/mountain.png',
        '/assets/terrain/mountain.png'
      ]
    },
    desert: {
      core: '/assets/terrain/desert.png',
      edge: '/assets/terrain/desert.png',
      elevation: {
        low: '/assets/terrain/desert.png',
        medium: '/assets/terrain/desert.png',
        high: '/assets/terrain/desert.png'
      },
      transitions: {
        'grass': '/assets/terrain/grass.png',
        'forest': '/assets/terrain/forest.png',
        'water': '/assets/terrain/water.png',
        'mountain': '/assets/terrain/mountain.png',
        'swamp': '/assets/terrain/swamp.png'
      },
      variants: [
        '/assets/terrain/desert.png',
        '/assets/terrain/desert.png',
        '/assets/terrain/desert.png'
      ]
    },
    swamp: {
      core: '/assets/terrain/swamp.png',
      edge: '/assets/terrain/swamp.png',
      elevation: {
        low: '/assets/terrain/swamp.png',
        medium: '/assets/terrain/swamp.png',
        high: '/assets/terrain/swamp.png'
      },
      transitions: {
        'grass': '/assets/terrain/grass.png',
        'forest': '/assets/terrain/forest.png',
        'water': '/assets/terrain/water.png',
        'mountain': '/assets/terrain/mountain.png',
        'desert': '/assets/terrain/desert.png'
      },
      variants: [
        '/assets/terrain/swamp.png',
        '/assets/terrain/swamp.png',
        '/assets/terrain/swamp.png'
      ]
    }
  };

  // Zone de détection des biomes
  private readonly BIOME_ZONES: Record<string, TerrainZone[]> = {
    temperate: [
      { biome: 'temperate', size: 5, centerX: 10, centerY: 10, distanceToEdge: 2, elevation: 0.5, moistureLevel: 0.6, temperature: 0.5 },
      { biome: 'temperate', size: 3, centerX: 25, centerY: 25, distanceToEdge: 1, elevation: 0.3, moistureLevel: 0.7, temperature: 0.6 }
    ],
    cold: [
      { biome: 'cold', size: 4, centerX: 5, centerY: 30, distanceToEdge: 3, elevation: 0.8, moistureLevel: 0.4, temperature: 0.2 }
    ],
    hot: [
      { biome: 'hot', size: 6, centerX: 35, centerY: 15, distanceToEdge: 4, elevation: 0.2, moistureLevel: 0.3, temperature: 0.8 }
    ]
  };

  // Système de couleurs avancé basé sur l'élévation
  private readonly ELEVATION_COLORS: Record<string, Record<string, string>> = {
    grass: {
      low: '#4a7c59',
      medium: '#5a8c69',
      high: '#6a9c79'
    },
    forest: {
      low: '#2d4a2d',
      medium: '#3d5a3d',
      high: '#4d6a4d'
    },
    water: {
      low: '#4a90e2',
      medium: '#5aa0f2',
      high: '#6ab0ff'
    },
    mountain: {
      low: '#8b7355',
      medium: '#9b8365',
      high: '#ab9375'
    },
    desert: {
      low: '#d4a574',
      medium: '#e4b584',
      high: '#f4c594'
    },
    swamp: {
      low: '#5a6b3d',
      medium: '#6a7b4d',
      high: '#7a8b5d'
    }
  };

  static getInstance(): TerrainSpriteService {
    if (!TerrainSpriteService.instance) {
      TerrainSpriteService.instance = new TerrainSpriteService();
    }
    return TerrainSpriteService.instance;
  }

  private constructor() {}

  // Chargement asynchrone des sprites avec cache
  private async loadSprite(path: string): Promise<HTMLImageElement> {
    // Vérifier le cache
    if (this.spriteCache.has(path)) {
      return this.spriteCache.get(path)!;
    }

    // Vérifier si le chargement est déjà en cours
    if (this.loadingPromises.has(path)) {
      return this.loadingPromises.get(path)!;
    }

    // Créer une nouvelle promesse de chargement
    const loadPromise = new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        this.spriteCache.set(path, img);
        this.loadingPromises.delete(path);
        resolve(img);
      };
      img.onerror = () => {
        this.loadingPromises.delete(path);
        console.error(`Failed to load sprite: ${path}`);
        reject(new Error(`Failed to load sprite: ${path}`));
      };
      img.src = path;
    });

    this.loadingPromises.set(path, loadPromise);
    return loadPromise;
  }

  async getTerrainSprite(tile: TerrainTile): Promise<HTMLImageElement | null> {
    const spriteData = this.TERRAIN_SPRITES[tile.type];
    if (!spriteData) return null;

    try {
      // Détermine le sprite à utiliser selon l'élévation
      let spritePath: string;
      if (tile.elevation < 0.3) {
        spritePath = spriteData.elevation?.low || spriteData.core;
      } else if (tile.elevation < 0.7) {
        spritePath = spriteData.elevation?.medium || spriteData.core;
      } else {
        spritePath = spriteData.elevation?.high || spriteData.core;
      }

      // Ajouter variante si disponible
      if (spriteData.variants && spriteData.variants.length > 0) {
        const variantIndex = this.getTerrainVariant(tile);
        spritePath = spriteData.variants[variantIndex] || spritePath;
      }

      return await this.loadSprite(spritePath);
    } catch (error) {
      console.error(`Error loading terrain sprite for ${tile.type}:`, error);
      return null;
    }
  }

  // Calcul déterministe des variantes basé sur la position
  private getTerrainVariant(tile: TerrainTile): number {
    // Utiliser les coordonnées et les propriétés du tile pour déterminer la variante
    const hash = (tile.x * 31 + tile.y * 17 + tile.elevation * 13 + tile.moistureLevel * 7 + tile.temperature * 3) % 1000;
    const spriteData = this.TERRAIN_SPRITES[tile.type];
    if (!spriteData.variants) return 0;
    return Math.floor(hash / 1000 * spriteData.variants.length);
  }

  async getTransitionSprite(tile: TerrainTile, direction: string): Promise<HTMLImageElement | null> {
    const spriteData = this.TERRAIN_SPRITES[tile.type];
    if (!spriteData?.transitions) return null;

    try {
      const transitionPath = spriteData.transitions[direction];
      return transitionPath ? await this.loadSprite(transitionPath) : null;
    } catch (error) {
      console.error(`Error loading transition sprite for ${tile.type} -> ${direction}:`, error);
      return null;
    }
  }

  // Détection des zones de biomes
  detectBiomeZones(tiles: TerrainTile[]): TerrainZone[] {
    const zones: TerrainZone[] = [];
    
    // Analyse des groupes de tiles similaires
    const tileGroups = this.groupTilesByType(tiles);
    
    for (const [type, groupTiles] of Object.entries(tileGroups)) {
      const zone = this.analyzeTileGroup(type, groupTiles);
      if (zone) zones.push(zone);
    }
    
    return zones;
  }

  private groupTilesByType(tiles: TerrainTile[]): Record<string, TerrainTile[]> {
    const groups: Record<string, TerrainTile[]> = {};
    
    for (const tile of tiles) {
      if (!groups[tile.type]) {
        groups[tile.type] = [];
      }
      groups[tile.type].push(tile);
    }
    
    return groups;
  }

  private analyzeTileGroup(type: string, tiles: TerrainTile[]): TerrainZone | null {
    if (tiles.length === 0) return null;
    
    // Calculer le centre de la zone
    const centerX = tiles.reduce((sum, tile) => sum + tile.x, 0) / tiles.length;
    const centerY = tiles.reduce((sum, tile) => sum + tile.y, 0) / tiles.length;
    
    // Calculer les propriétés moyennes
    const avgElevation = tiles.reduce((sum, tile) => sum + tile.elevation, 0) / tiles.length;
    const avgMoisture = tiles.reduce((sum, tile) => sum + tile.moistureLevel, 0) / tiles.length;
    const avgTemp = tiles.reduce((sum, tile) => sum + tile.temperature, 0) / tiles.length;
    
    // Déterminer le biome
    let biome = 'temperate';
    if (avgTemp < 0.3) biome = 'cold';
    else if (avgTemp > 0.7) biome = 'hot';
    
    return {
      biome,
      size: tiles.length,
      centerX,
      centerY,
      distanceToEdge: Math.min(centerX, centerY, 50 - centerX, 50 - centerY),
      elevation: avgElevation,
      moistureLevel: avgMoisture,
      temperature: avgTemp
    };
  }

  // Algorithme de détection des transitions
  detectTransitions(tiles: TerrainTile[]): Record<string, string> {
    const transitions: Record<string, string> = {};
    
    for (const tile of tiles) {
      const neighbors = this.getNeighbors(tile, tiles);
      
      for (const neighbor of neighbors) {
        if (neighbor.type !== tile.type) {
          const transitionKey = `${tile.type}_to_${neighbor.type}`;
          if (!transitions[transitionKey]) {
            transitions[transitionKey] = this.calculateTransitionType(tile, neighbor);
          }
        }
      }
    }
    
    return transitions;
  }

  private getNeighbors(tile: TerrainTile, allTiles: TerrainTile[]): TerrainTile[] {
    const neighbors: TerrainTile[] = [];
    
    // Coordonnées hexagonales - 6 voisins
    const hexOffsets = [
      { x: 1, y: 0 }, { x: -1, y: 0 },
      { x: 0, y: 1 }, { x: 0, y: -1 },
      { x: 1, y: 1 }, { x: -1, y: -1 }
    ];
    
    for (const offset of hexOffsets) {
      const neighbor = allTiles.find(t => 
        t.x === tile.x + offset.x && t.y === tile.y + offset.y
      );
      if (neighbor) neighbors.push(neighbor);
    }
    
    return neighbors;
  }

  private calculateTransitionType(tile1: TerrainTile, tile2: TerrainTile): string {
    // Calculer le type de transition basé sur les propriétés des tiles
    const elevationDiff = Math.abs(tile1.elevation - tile2.elevation);
    const moistureDiff = Math.abs(tile1.moistureLevel - tile2.moistureLevel);
    
    if (elevationDiff > 0.3) return 'steep';
    if (moistureDiff > 0.4) return 'gradual';
    return 'smooth';
  }

  // Méthode pour obtenir la couleur du terrain (pour les indicateurs)
  getTerrainColor(tile: TerrainTile): string {
    const elevationColors = this.ELEVATION_COLORS[tile.type];
    if (elevationColors) {
      // Utiliser l'élévation pour déterminer la couleur
      if (tile.elevation < 0.3) return elevationColors.low;
      if (tile.elevation < 0.7) return elevationColors.medium;
      return elevationColors.high;
    }
    
    // Fallback colors
    const fallbackColors: Record<string, string> = {
      grass: '#4a7c59',
      forest: '#2d4a2d',
      water: '#4a90e2',
      mountain: '#8b7355',
      desert: '#d4a574',
      swamp: '#5a6b3d'
    };
    
    return fallbackColors[tile.type] || '#888888';
  }

  // Nettoyage du cache
  clearCache(): void {
    this.spriteCache.clear();
    this.loadingPromises.clear();
  }

  // Statistiques du cache
  getCacheStats(): { size: number; loading: number } {
    return {
      size: this.spriteCache.size,
      loading: this.loadingPromises.size
    };
  }
}
 
 // Export singleton instance
 export const terrainSpriteService = TerrainSpriteService.getInstance(); 