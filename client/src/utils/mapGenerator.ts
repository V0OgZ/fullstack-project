import { GameMap, MapTile, TerrainType, MapGenerationParams, MapRegion } from '../types/map';

// Générateur de bruit de Perlin simplifié
class SimpleNoise {
  private permutation: number[];

  constructor(seed: number) {
    this.permutation = this.generatePermutation(seed);
  }

  private generatePermutation(seed: number): number[] {
    const perm = Array.from({ length: 256 }, (_, i) => i);
    let currentSeed = seed;
    
    // Fisher-Yates shuffle avec seed
    for (let i = perm.length - 1; i > 0; i--) {
      currentSeed = (currentSeed * 9301 + 49297) % 233280;
      const j = Math.floor((currentSeed / 233280) * (i + 1));
      [perm[i], perm[j]] = [perm[j], perm[i]];
    }
    
    return [...perm, ...perm]; // Dupliquer pour éviter les index out of bounds
  }

  noise2D(x: number, y: number): number {
    const xi = Math.floor(x) & 255;
    const yi = Math.floor(y) & 255;
    const xf = x - Math.floor(x);
    const yf = y - Math.floor(y);
    
    const u = this.fade(xf);
    const v = this.fade(yf);
    
    const a = this.permutation[xi] + yi;
    const b = this.permutation[xi + 1] + yi;
    const c = this.permutation[xi] + yi + 1;
    const d = this.permutation[xi + 1] + yi + 1;
    
    const grad1 = this.grad(this.permutation[a], xf, yf);
    const grad2 = this.grad(this.permutation[b], xf - 1, yf);
    const grad3 = this.grad(this.permutation[c], xf, yf - 1);
    const grad4 = this.grad(this.permutation[d], xf - 1, yf - 1);
    
    const x1 = this.lerp(grad1, grad2, u);
    const x2 = this.lerp(grad3, grad4, u);
    
    return this.lerp(x1, x2, v);
  }

  private fade(t: number): number {
    return t * t * t * (t * (t * 6 - 15) + 10);
  }

  private lerp(a: number, b: number, t: number): number {
    return a + t * (b - a);
  }

  private grad(hash: number, x: number, y: number): number {
    const h = hash & 15;
    const grad = 1 + (h & 7);
    return ((h & 8) === 0 ? x : -x) + ((h & 4) === 0 ? y : -y);
  }
}

// Générateur de carte procédurale
export class MapGenerator {
  private noise: SimpleNoise;

  constructor(seed: number) {
    this.noise = new SimpleNoise(seed);
  }

  generateMap(params: MapGenerationParams): GameMap {
    const { width, height, seed, terrainDistribution, structureDensity, resourceDensity, smoothingIterations } = params;
    
    // Initialiser la matrice de tuiles
    const tiles: MapTile[][] = [];
    
    // Générer le terrain de base
    for (let y = 0; y < height; y++) {
      tiles[y] = [];
      for (let x = 0; x < width; x++) {
        const terrain = this.generateTerrain(x, y, terrainDistribution);
        tiles[y][x] = this.createTile(x, y, terrain);
      }
    }

    // Appliquer le lissage
    for (let i = 0; i < smoothingIterations; i++) {
      this.smoothTerrain(tiles);
    }

    // Ajouter les structures
    this.addStructures(tiles, structureDensity);

    // Ajouter les ressources
    this.addResources(tiles, resourceDensity);

    return {
      width,
      height,
      tiles,
      seed,
      generationParams: params
    };
  }

  private generateTerrain(x: number, y: number, distribution: any): TerrainType {
    // Utiliser plusieurs couches de bruit pour créer un terrain naturel
    const noise1 = this.noise.noise2D(x * 0.1, y * 0.1);
    const noise2 = this.noise.noise2D(x * 0.05, y * 0.05);
    const noise3 = this.noise.noise2D(x * 0.02, y * 0.02);
    
    const combinedNoise = (noise1 * 0.5 + noise2 * 0.3 + noise3 * 0.2);
    
    // Normaliser entre 0 et 1
    const normalized = (combinedNoise + 1) / 2;
    
    // Déterminer le type de terrain basé sur la valeur de bruit
    if (normalized < 0.15) return 'water';
    if (normalized < 0.25) return 'swamp';
    if (normalized < 0.45) return 'grass';
    if (normalized < 0.65) return 'forest';
    if (normalized < 0.85) return 'mountain';
    return 'desert';
  }

  private createTile(x: number, y: number, terrain: TerrainType): MapTile {
    const movementCosts = {
      grass: 1,
      forest: 2,
      mountain: 3,
      water: 4,
      desert: 2,
      swamp: 3,
      castle: 1,
      mine: 1,
      tower: 1,
      village: 1
    };

    const passable = {
      grass: true,
      forest: true,
      mountain: true,
      water: false,
      desert: true,
      swamp: true,
      castle: true,
      mine: true,
      tower: true,
      village: true
    };

    return {
      x,
      y,
      terrain,
      movementCost: movementCosts[terrain],
      isPassable: passable[terrain],
      hasStructure: false,
      resources: [],
      units: [],
    };
  }

  private smoothTerrain(tiles: MapTile[][]): void {
    const height = tiles.length;
    const width = tiles[0].length;
    const newTiles: MapTile[][] = [];

    for (let y = 0; y < height; y++) {
      newTiles[y] = [];
      for (let x = 0; x < width; x++) {
        const neighbors = this.getNeighbors(tiles, x, y);
        const terrainCounts = this.countTerrainTypes(neighbors);
        const mostCommonTerrain = this.getMostCommonTerrain(terrainCounts);
        
        newTiles[y][x] = {
          ...tiles[y][x],
          terrain: mostCommonTerrain
        };
      }
    }

    // Copier les nouvelles tuiles
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        tiles[y][x] = newTiles[y][x];
      }
    }
  }

  private getNeighbors(tiles: MapTile[][], x: number, y: number): MapTile[] {
    const neighbors: MapTile[] = [];
    const height = tiles.length;
    const width = tiles[0].length;

    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (dx === 0 && dy === 0) continue;
        
        const nx = x + dx;
        const ny = y + dy;
        
        if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
          neighbors.push(tiles[ny][nx]);
        }
      }
    }

    return neighbors;
  }

  private countTerrainTypes(tiles: MapTile[]): Record<TerrainType, number> {
    const counts: Record<TerrainType, number> = {
      grass: 0, forest: 0, mountain: 0, water: 0, desert: 0, swamp: 0,
      castle: 0, mine: 0, tower: 0, village: 0
    };

    tiles.forEach(tile => {
      counts[tile.terrain]++;
    });

    return counts;
  }

  private getMostCommonTerrain(counts: Record<TerrainType, number>): TerrainType {
    let maxCount = 0;
    let mostCommon: TerrainType = 'grass';

    Object.entries(counts).forEach(([terrain, count]) => {
      if (count > maxCount) {
        maxCount = count;
        mostCommon = terrain as TerrainType;
      }
    });

    return mostCommon;
  }

  private addStructures(tiles: MapTile[][], density: number): void {
    const height = tiles.length;
    const width = tiles[0].length;
    const structureTypes: Array<'castle' | 'mine' | 'tower' | 'village'> = ['castle', 'mine', 'tower', 'village'];

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (Math.random() < density && tiles[y][x].terrain === 'grass' && !tiles[y][x].hasStructure) {
          const structureType = structureTypes[Math.floor(Math.random() * structureTypes.length)];
          tiles[y][x].hasStructure = true;
          tiles[y][x].structureType = structureType;
          tiles[y][x].terrain = structureType;
        }
      }
    }
  }

  private addResources(tiles: MapTile[][], density: number): void {
    const height = tiles.length;
    const width = tiles[0].length;
    const resourceTypes: Array<'gold' | 'wood' | 'stone' | 'crystal' | 'ore' | 'gems'> = 
      ['gold', 'wood', 'stone', 'crystal', 'ore', 'gems'];

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (Math.random() < density && !tiles[y][x].hasStructure) {
          const resourceType = resourceTypes[Math.floor(Math.random() * resourceTypes.length)];
          tiles[y][x].resources = [resourceType];
        }
      }
    }
  }

  // Générer des régions de terrain cohérentes
  generateRegions(width: number, height: number, numRegions: number): MapRegion[] {
    const regions: MapRegion[] = [];
    const terrainTypes: TerrainType[] = ['grass', 'forest', 'mountain', 'desert', 'swamp'];

    for (let i = 0; i < numRegions; i++) {
      const terrainType = terrainTypes[Math.floor(Math.random() * terrainTypes.length)];
      const regionSize = Math.floor(Math.random() * 20) + 10; // 10-30 cases
      
      const startX = Math.floor(Math.random() * (width - regionSize));
      const startY = Math.floor(Math.random() * (height - regionSize));
      
      regions.push({
        startX,
        startY,
        endX: startX + regionSize,
        endY: startY + regionSize,
        terrainType,
        density: Math.random() * 0.8 + 0.2 // 20-100% de densité
      });
    }

    return regions;
  }
}

// Fonction utilitaire pour créer une carte par défaut
export const createDefaultMap = (width: number = 20, height: number = 15): GameMap => {
  const generator = new MapGenerator(Date.now());
  
  const params: MapGenerationParams = {
    seed: Date.now(),
    width,
    height,
    terrainDistribution: {
      grass: 0.4,
      forest: 0.25,
      mountain: 0.15,
      water: 0.1,
      desert: 0.05,
      swamp: 0.05
    },
    structureDensity: 0.02,
    resourceDensity: 0.1,
    smoothingIterations: 2
  };

  return generator.generateMap(params);
}; 