// Terrain Sprites System with Intelligent Variety
export interface TerrainSprite {
  path: string;
  name: string;
  probability: number; // Weight for selection
  contextRules?: string[]; // Rules for when to use this sprite
}

export interface TerrainSpriteSet {
  base: TerrainSprite[];
  variations: TerrainSprite[];
  decorations: TerrainSprite[];
}

export const TERRAIN_SPRITES: Record<string, TerrainSpriteSet> = {
  grass: {
    base: [
      { path: '/assets/terrain/grass.png', name: 'grass_base', probability: 0.7 }
    ],
    variations: [
      { path: '/assets/terrain/grass.png', name: 'grass_plain', probability: 0.4 },
      { path: '/assets/terrain/grass.png', name: 'grass_flowers', probability: 0.3, contextRules: ['spring', 'fertile'] },
      { path: '/assets/terrain/grass.png', name: 'grass_rocky', probability: 0.2, contextRules: ['mountain_nearby'] },
      { path: '/assets/terrain/grass.png', name: 'grass_meadow', probability: 0.1, contextRules: ['open_area'] }
    ],
    decorations: []
  },
  
  forest: {
    base: [
      { path: '/assets/terrain/forest.png', name: 'forest_base', probability: 0.6 }
    ],
    variations: [
      { path: '/assets/terrain/forest.png', name: 'forest_oak', probability: 0.3 },
      { path: '/assets/terrain/forest.png', name: 'forest_pine', probability: 0.3, contextRules: ['mountain_nearby'] },
      { path: '/assets/terrain/forest.png', name: 'forest_birch', probability: 0.2, contextRules: ['water_nearby'] },
      { path: '/assets/terrain/forest.png', name: 'forest_ancient', probability: 0.1, contextRules: ['deep_forest'] },
      { path: '/assets/terrain/forest.png', name: 'forest_clearing', probability: 0.1, contextRules: ['isolated'] }
    ],
    decorations: []
  },
  
  mountain: {
    base: [
      { path: '/assets/terrain/mountain.png', name: 'mountain_base', probability: 0.5 }
    ],
    variations: [
      { path: '/assets/terrain/mountain.png', name: 'mountain_peak', probability: 0.3, contextRules: ['high_elevation'] },
      { path: '/assets/terrain/mountain.png', name: 'mountain_cliff', probability: 0.2, contextRules: ['edge'] },
      { path: '/assets/terrain/mountain.png', name: 'mountain_rocky', probability: 0.3 },
      { path: '/assets/terrain/mountain.png', name: 'mountain_snowy', probability: 0.2, contextRules: ['cold', 'high_elevation'] }
    ],
    decorations: []
  },
  
  water: {
    base: [
      { path: '/assets/terrain/water.png', name: 'water_base', probability: 0.6 }
    ],
    variations: [
      { path: '/assets/terrain/water.png', name: 'water_deep', probability: 0.3, contextRules: ['deep_water'] },
      { path: '/assets/terrain/water.png', name: 'water_shallow', probability: 0.4, contextRules: ['shore_nearby'] },
      { path: '/assets/terrain/water.png', name: 'water_rapids', probability: 0.2, contextRules: ['mountain_nearby'] },
      { path: '/assets/terrain/water.png', name: 'water_lake', probability: 0.1, contextRules: ['surrounded'] }
    ],
    decorations: []
  },
  
  desert: {
    base: [
      { path: '/assets/terrain/desert.png', name: 'desert_base', probability: 0.5 }
    ],
    variations: [
      { path: '/assets/terrain/desert.png', name: 'desert_sand', probability: 0.4 },
      { path: '/assets/terrain/desert.png', name: 'desert_dunes', probability: 0.3, contextRules: ['open_area'] },
      { path: '/assets/terrain/desert.png', name: 'desert_rocky', probability: 0.2, contextRules: ['mountain_nearby'] },
      { path: '/assets/terrain/desert.png', name: 'desert_oasis', probability: 0.1, contextRules: ['water_nearby'] }
    ],
    decorations: []
  },
  
  swamp: {
    base: [
      { path: '/assets/terrain/swamp.png', name: 'swamp_base', probability: 0.6 }
    ],
    variations: [
      { path: '/assets/terrain/swamp.png', name: 'swamp_murky', probability: 0.4 },
      { path: '/assets/terrain/swamp.png', name: 'swamp_moss', probability: 0.3, contextRules: ['forest_nearby'] },
      { path: '/assets/terrain/swamp.png', name: 'swamp_reeds', probability: 0.2, contextRules: ['water_nearby'] },
      { path: '/assets/terrain/swamp.png', name: 'swamp_bog', probability: 0.1, contextRules: ['deep_swamp'] }
    ],
    decorations: []
  }
};

// Intelligent sprite selection based on context
export class TerrainSpriteSelector {
  private seedMap: Map<string, number> = new Map();
  
  constructor() {
    // Initialize with a base seed for consistency
    this.seedMap.set('base', 12345);
  }
  
  // Pseudo-random number generator for consistent results
  private seededRandom(seed: number): number {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  }
  
  // Get consistent seed for a position
  private getPositionSeed(x: number, y: number): number {
    return (x * 73856093) ^ (y * 19349663);
  }
  
  // Analyze context around a tile
  private analyzeContext(x: number, y: number, map: any[][], terrain: string): string[] {
    const context: string[] = [];
    const neighbors = this.getNeighbors(x, y, map);
    
    // Check for nearby terrain types
    const nearbyTypes = neighbors.map(n => n.terrain);
    if (nearbyTypes.includes('mountain')) context.push('mountain_nearby');
    if (nearbyTypes.includes('water')) context.push('water_nearby');
    if (nearbyTypes.includes('forest')) context.push('forest_nearby');
    
    // Check for elevation context
    if (terrain === 'mountain') {
      const mountainNeighbors = nearbyTypes.filter(t => t === 'mountain').length;
      if (mountainNeighbors >= 4) context.push('high_elevation');
    }
    
    // Check for water context
    if (terrain === 'water') {
      const waterNeighbors = nearbyTypes.filter(t => t === 'water').length;
      if (waterNeighbors >= 5) context.push('deep_water');
      if (waterNeighbors <= 2) context.push('shore_nearby');
    }
    
    // Check for forest context
    if (terrain === 'forest') {
      const forestNeighbors = nearbyTypes.filter(t => t === 'forest').length;
      if (forestNeighbors >= 5) context.push('deep_forest');
    }
    
    // Check for isolation
    const sameTypeCount = nearbyTypes.filter(t => t === terrain).length;
    if (sameTypeCount <= 1) context.push('isolated');
    if (sameTypeCount >= 5) context.push('surrounded');
    
    // Check for open areas
    const openTerrains = ['grass', 'desert'];
    if (openTerrains.includes(terrain)) {
      const openNeighbors = nearbyTypes.filter(t => openTerrains.includes(t)).length;
      if (openNeighbors >= 4) context.push('open_area');
    }
    
    return context;
  }
  
  // Get neighboring tiles
  private getNeighbors(x: number, y: number, map: any[][]): any[] {
    const neighbors: any[] = [];
    const offsets = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],           [0, 1],
      [1, -1],  [1, 0],  [1, 1]
    ];
    
    for (const [dx, dy] of offsets) {
      const nx = x + dx;
      const ny = y + dy;
      if (ny >= 0 && ny < map.length && nx >= 0 && nx < map[ny].length) {
        neighbors.push(map[ny][nx]);
      }
    }
    
    return neighbors;
  }
  
  // Select sprite based on terrain and context
  selectSprite(x: number, y: number, terrain: string, map: any[][]): TerrainSprite {
    const spriteSet = TERRAIN_SPRITES[terrain];
    if (!spriteSet) {
      return { path: '/assets/terrain/grass.png', name: 'fallback', probability: 1.0 };
    }
    
    const context = this.analyzeContext(x, y, map, terrain);
    const seed = this.getPositionSeed(x, y);
    const random = this.seededRandom(seed);
    
    // First, try to find a sprite that matches the context
    const contextSprites = spriteSet.variations.filter(sprite => {
      if (!sprite.contextRules) return true;
      return sprite.contextRules.some(rule => context.includes(rule));
    });
    
    // If we have context-appropriate sprites, use them
    if (contextSprites.length > 0) {
      const totalWeight = contextSprites.reduce((sum, sprite) => sum + sprite.probability, 0);
      let accumulator = 0;
      const target = random * totalWeight;
      
      for (const sprite of contextSprites) {
        accumulator += sprite.probability;
        if (target <= accumulator) {
          return sprite;
        }
      }
    }
    
    // Fallback to base sprite
    return spriteSet.base[0];
  }
  
  // Get sprite for a tile with caching
  getSpriteForTile(x: number, y: number, terrain: string, map: any[][]): string {
    const cacheKey = `${x},${y},${terrain}`;
    
    if (!this.seedMap.has(cacheKey)) {
      const sprite = this.selectSprite(x, y, terrain, map);
      this.seedMap.set(cacheKey, this.getPositionSeed(x, y));
      return sprite.path;
    }
    
    // Return cached result
    const sprite = this.selectSprite(x, y, terrain, map);
    return sprite.path;
  }
}

// Global instance
export const terrainSpriteSelector = new TerrainSpriteSelector(); 

// ---------------------------------------------------------------------------
// Hex-bitmask based edge sprites (6-bit mask for pointy-top axial coordinates)
// Bit order: 0=E,1=NE,2=NW,3=W,4=SW,5=SE (same order as utils/hexBitmask.ts)
// The mapping below is **minimal viable**: center + simple edges + isolated.
// More complex combinations (corners, triple edges) can be added later.
// ---------------------------------------------------------------------------
export interface TerrainBitmaskMapping {
  [mask: number]: string; // sprite path
}

// Helper to shorten sprite path declaration
const p = (terrain: string, name: string) => `/assets/terrain/${terrain}/${name}.png`;

export const TERRAIN_EDGE_SPRITES: Record<string, TerrainBitmaskMapping> = {
  grass: {
    0b111111: p('grass', 'center'),   // fully surrounded by same terrain
    0b000000: p('grass', 'isolated'), // no same-type neighbors
    0b000001: p('grass', 'edge_e'),
    0b000010: p('grass', 'edge_ne'),
    0b000100: p('grass', 'edge_nw'),
    0b001000: p('grass', 'edge_w'),
    0b010000: p('grass', 'edge_sw'),
    0b100000: p('grass', 'edge_se')
  },
  forest: {
    0b111111: p('forest', 'center'),
    0b000000: p('forest', 'isolated'),
    0b000001: p('forest', 'edge_e'),
    0b000010: p('forest', 'edge_ne'),
    0b000100: p('forest', 'edge_nw'),
    0b001000: p('forest', 'edge_w'),
    0b010000: p('forest', 'edge_sw'),
    0b100000: p('forest', 'edge_se')
  },
  water: {
    0b111111: p('water', 'center'),
    0b000000: p('water', 'isolated'),
    0b000001: p('water', 'shore_e'),
    0b000010: p('water', 'shore_ne'),
    0b000100: p('water', 'shore_nw'),
    0b001000: p('water', 'shore_w'),
    0b010000: p('water', 'shore_sw'),
    0b100000: p('water', 'shore_se')
  },
  mountain: {
    0b111111: p('mountain', 'center'),
    0b000000: p('mountain', 'isolated'),
    0b000001: p('mountain', 'edge_e'),
    0b000010: p('mountain', 'edge_ne'),
    0b000100: p('mountain', 'edge_nw'),
    0b001000: p('mountain', 'edge_w'),
    0b010000: p('mountain', 'edge_sw'),
    0b100000: p('mountain', 'edge_se')
  },
  desert: {
    0b111111: p('desert', 'center'),
    0b000000: p('desert', 'isolated'),
    0b000001: p('desert', 'edge_e'),
    0b000010: p('desert', 'edge_ne'),
    0b000100: p('desert', 'edge_nw'),
    0b001000: p('desert', 'edge_w'),
    0b010000: p('desert', 'edge_sw'),
    0b100000: p('desert', 'edge_se')
  },
  swamp: {
    0b111111: p('swamp', 'center'),
    0b000000: p('swamp', 'isolated'),
    0b000001: p('swamp', 'edge_e'),
    0b000010: p('swamp', 'edge_ne'),
    0b000100: p('swamp', 'edge_nw'),
    0b001000: p('swamp', 'edge_w'),
    0b010000: p('swamp', 'edge_sw'),
    0b100000: p('swamp', 'edge_se')
  }
  // Other terrains (mountain, desert, etc.) can be added following the same pattern.
}; 