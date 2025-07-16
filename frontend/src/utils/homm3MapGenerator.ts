// @ts-nocheck
import { Tile } from '../types/game';

// HOMM3 terrain types with their characteristics
export enum HOMM3Terrain {
  GRASS = 'grass',
  DIRT = 'dirt',
  SAND = 'sand',
  SNOW = 'snow',
  SWAMP = 'swamp',
  ROUGH = 'rough',
  LAVA = 'lava',
  WATER = 'water',
  ROCK = 'rock'
}

// Terrain transition rules (which terrains can border each other nicely)
const TERRAIN_COMPATIBILITY = {
  [HOMM3Terrain.GRASS]: [HOMM3Terrain.GRASS, HOMM3Terrain.DIRT, HOMM3Terrain.WATER, HOMM3Terrain.SWAMP],
  [HOMM3Terrain.DIRT]: [HOMM3Terrain.DIRT, HOMM3Terrain.GRASS, HOMM3Terrain.ROUGH, HOMM3Terrain.SAND],
  [HOMM3Terrain.SAND]: [HOMM3Terrain.SAND, HOMM3Terrain.DIRT, HOMM3Terrain.ROUGH, HOMM3Terrain.WATER],
  [HOMM3Terrain.SNOW]: [HOMM3Terrain.SNOW, HOMM3Terrain.ROUGH, HOMM3Terrain.WATER],
  [HOMM3Terrain.SWAMP]: [HOMM3Terrain.SWAMP, HOMM3Terrain.GRASS, HOMM3Terrain.WATER],
  [HOMM3Terrain.ROUGH]: [HOMM3Terrain.ROUGH, HOMM3Terrain.DIRT, HOMM3Terrain.SAND, HOMM3Terrain.SNOW, HOMM3Terrain.LAVA],
  [HOMM3Terrain.LAVA]: [HOMM3Terrain.LAVA, HOMM3Terrain.ROUGH, HOMM3Terrain.ROCK],
  [HOMM3Terrain.WATER]: [HOMM3Terrain.WATER, HOMM3Terrain.GRASS, HOMM3Terrain.SAND, HOMM3Terrain.SWAMP, HOMM3Terrain.SNOW],
  [HOMM3Terrain.ROCK]: [HOMM3Terrain.ROCK, HOMM3Terrain.LAVA]
};

// Movement costs like in HOMM3
const MOVEMENT_COSTS = {
  [HOMM3Terrain.GRASS]: 100,
  [HOMM3Terrain.DIRT]: 125,
  [HOMM3Terrain.SAND]: 150,
  [HOMM3Terrain.SNOW]: 150,
  [HOMM3Terrain.SWAMP]: 175,
  [HOMM3Terrain.ROUGH]: 125,
  [HOMM3Terrain.LAVA]: 100,
  [HOMM3Terrain.WATER]: Infinity, // Not walkable without boat
  [HOMM3Terrain.ROCK]: Infinity  // Not walkable
};

interface TerrainZone {
  type: HOMM3Terrain;
  centerX: number;
  centerY: number;
  radius: number;
}

export class HOMM3MapGenerator {
  private width: number;
  private height: number;
  private tiles: Tile[][];
  
  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.tiles = [];
  }

  generateMap(): Tile[] {
    // Initialize with base terrain (grass)
    this.initializeTiles();
    
    // Generate terrain zones like HOMM3
    this.generateTerrainZones();
    
    // Add rivers
    this.generateRivers();
    
    // Add mountain ranges
    this.generateMountains();
    
    // Smooth terrain transitions
    this.smoothTerrainTransitions();
    
    // Add terrain details (trees, rocks, etc.)
    this.addTerrainDetails();
    
    // Convert to flat array
    return this.tiles.flat();
  }

  private initializeTiles(): void {
    for (let y = 0; y < this.height; y++) {
      this.tiles[y] = [];
      for (let x = 0; x < this.width; x++) {
        this.tiles[y][x] = {
          x,
          y,
          terrain: 'grass' as any,
          movementCost: MOVEMENT_COSTS[HOMM3Terrain.GRASS],
          walkable: true
        };
      }
    }
  }

  private generateTerrainZones(): void {
    // Create zones like HOMM3 maps
    const zones: TerrainZone[] = [];
    const zoneCount = Math.floor((this.width * this.height) / 400); // Adjust for map size
    
    // Define zone types based on HOMM3 map templates
    const zoneTypes = [
      HOMM3Terrain.GRASS,
      HOMM3Terrain.DIRT,
      HOMM3Terrain.SAND,
      HOMM3Terrain.SNOW,
      HOMM3Terrain.SWAMP,
      HOMM3Terrain.ROUGH,
      HOMM3Terrain.LAVA
    ];
    
    for (let i = 0; i < zoneCount; i++) {
      const zone: TerrainZone = {
        type: zoneTypes[Math.floor(Math.random() * zoneTypes.length)],
        centerX: Math.floor(Math.random() * this.width),
        centerY: Math.floor(Math.random() * this.height),
        radius: 5 + Math.floor(Math.random() * 10)
      };
      zones.push(zone);
    }
    
    // Apply zones to map
    for (const zone of zones) {
      this.applyTerrainZone(zone);
    }
  }

  private applyTerrainZone(zone: TerrainZone): void {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const distance = Math.sqrt(
          Math.pow(x - zone.centerX, 2) + 
          Math.pow(y - zone.centerY, 2)
        );
        
        // Use falloff for natural-looking zones
        if (distance <= zone.radius) {
          const falloff = 1 - (distance / zone.radius);
          if (Math.random() < falloff * falloff) {
            this.tiles[y][x].terrain = zone.type as any;
            this.tiles[y][x].movementCost = MOVEMENT_COSTS[zone.type];
            this.tiles[y][x].walkable = zone.type !== HOMM3Terrain.WATER && zone.type !== HOMM3Terrain.ROCK;
          }
        }
      }
    }
  }

  private generateRivers(): void {
    const riverCount = 1 + Math.floor(Math.random() * 3);
    
    for (let i = 0; i < riverCount; i++) {
      // Start from edge
      let x = Math.random() < 0.5 ? 0 : this.width - 1;
      let y = Math.floor(Math.random() * this.height);
      
      // Meander across map
      const targetX = x === 0 ? this.width - 1 : 0;
      
      while (x !== targetX && x >= 0 && x < this.width && y >= 0 && y < this.height) {
        // Make river
        this.tiles[y][x].terrain = 'water' as any;
        this.tiles[y][x].walkable = false;
        this.tiles[y][x].movementCost = Infinity;
        
        // Add river width
        if (y > 0) {
          this.tiles[y - 1][x].terrain = 'water' as any;
          this.tiles[y - 1][x].walkable = false;
          this.tiles[y - 1][x].movementCost = Infinity;
        }
        
        // Move towards target with some randomness
        x += x < targetX ? 1 : -1;
        y += Math.floor(Math.random() * 3) - 1;
      }
    }
  }

  private generateMountains(): void {
    const mountainRanges = 1 + Math.floor(Math.random() * 2);
    
    for (let i = 0; i < mountainRanges; i++) {
      const startX = Math.floor(Math.random() * this.width);
      const startY = Math.floor(Math.random() * this.height);
      const length = 5 + Math.floor(Math.random() * 10);
      const direction = Math.random() * Math.PI * 2;
      
      for (let j = 0; j < length; j++) {
        const x = Math.floor(startX + Math.cos(direction) * j);
        const y = Math.floor(startY + Math.sin(direction) * j);
        
        if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
          this.tiles[y][x].terrain = 'mountain' as any;
          this.tiles[y][x].walkable = true; // Mountains are walkable but slow
          this.tiles[y][x].movementCost = 200;
          
          // Add some width to mountain range
          const adjacentCells = [
            { dx: -1, dy: 0 }, { dx: 1, dy: 0 },
            { dx: 0, dy: -1 }, { dx: 0, dy: 1 }
          ];
          
          for (const adj of adjacentCells) {
            const adjX = x + adj.dx;
            const adjY = y + adj.dy;
            if (adjX >= 0 && adjX < this.width && adjY >= 0 && adjY < this.height) {
              if (Math.random() < 0.5) {
                this.tiles[adjY][adjX].terrain = 'mountain' as any;
                this.tiles[adjY][adjX].walkable = true;
                this.tiles[adjY][adjX].movementCost = 200;
              }
            }
          }
        }
      }
    }
  }

  private smoothTerrainTransitions(): void {
    // Create smooth transitions between terrain types
    const newTiles = JSON.parse(JSON.stringify(this.tiles));
    
    for (let y = 1; y < this.height - 1; y++) {
      for (let x = 1; x < this.width - 1; x++) {
        const currentTerrain = this.tiles[y][x].terrain;
        const neighbors = [
          this.tiles[y - 1][x].terrain,
          this.tiles[y + 1][x].terrain,
          this.tiles[y][x - 1].terrain,
          this.tiles[y][x + 1].terrain
        ];
        
        // Count terrain types around this tile
        const terrainCounts: { [key: string]: number } = {};
        neighbors.forEach(terrain => {
          terrainCounts[terrain] = (terrainCounts[terrain] || 0) + 1;
        });
        
        // If surrounded by different terrain, maybe transition
        const mostCommon = Object.entries(terrainCounts)
          .sort((a, b) => b[1] - a[1])[0];
        
        if (mostCommon && mostCommon[1] >= 3 && mostCommon[0] !== currentTerrain) {
          // Check if transition is allowed
          const compatibleTerrains = TERRAIN_COMPATIBILITY[currentTerrain as HOMM3Terrain] || [];
          if (compatibleTerrains.includes(mostCommon[0] as HOMM3Terrain)) {
            newTiles[y][x].terrain = mostCommon[0];
            newTiles[y][x].movementCost = MOVEMENT_COSTS[mostCommon[0] as HOMM3Terrain];
            newTiles[y][x].walkable = mostCommon[0] !== 'water' && mostCommon[0] !== 'rock';
          }
        }
      }
    }
    
    this.tiles = newTiles;
  }

  private addTerrainDetails(): void {
    // Add forests to grass tiles
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (this.tiles[y][x].terrain === 'grass' && Math.random() < 0.15) {
          this.tiles[y][x].terrain = 'forest' as any;
          this.tiles[y][x].movementCost = 150;
        }
      }
    }
  }
} 