// Moteur de terrain hexagonal Heroes of Time
import { 
  HexTile, 
  TerrainGroup, 
  HexMap, 
  BiomeType, 
  AxialCoord, 
  PixelCoord, 
  MacroFormation,
  TERRAIN_CONSTANTS 
} from '../types/terrain';

// Utilitaires pour les coordonnées hexagonales
export class HexUtils {
  static tileKey(q: number, r: number): string {
    return `${q},${r}`;
  }

  static axialToPixel(q: number, r: number): PixelCoord {
    const x = q * TERRAIN_CONSTANTS.TILE_WIDTH * 0.75;
    const y = r * TERRAIN_CONSTANTS.TILE_HEIGHT + (q % 2) * (TERRAIN_CONSTANTS.TILE_HEIGHT / 2);
    return { x, y };
  }

  static getNeighbors(q: number, r: number): AxialCoord[] {
    return TERRAIN_CONSTANTS.HEX_NEIGHBORS.map(offset => ({
      q: q + offset.q,
      r: r + offset.r
    }));
  }

  static distance(a: AxialCoord, b: AxialCoord): number {
    return (Math.abs(a.q - b.q) + Math.abs(a.q + a.r - b.q - b.r) + Math.abs(a.r - b.r)) / 2;
  }

  static deterministicHash(q: number, r: number, seed: number = 0): number {
    let hash = ((q * 928371 + r * 123457 + seed) & 0x7fffffff) % 1000000;
    return hash / 1000000;
  }
}

// Classe principale du moteur de terrain
export class TerrainEngine {
  private hexMap: HexMap;
  private processed: boolean = false;

  constructor(tiles: HexTile[], seed: number = 12345) {
    this.hexMap = {
      tiles: new Map(),
      groups: [],
      seed,
      bounds: { minQ: 0, maxQ: 0, minR: 0, maxR: 0 }
    };

    // Initialiser la carte
    this.initializeMap(tiles);
  }

  private initializeMap(tiles: HexTile[]): void {
    if (tiles.length === 0) return;

    let minQ = tiles[0].q, maxQ = tiles[0].q;
    let minR = tiles[0].r, maxR = tiles[0].r;

    for (const tile of tiles) {
      this.hexMap.tiles.set(HexUtils.tileKey(tile.q, tile.r), tile);
      
      minQ = Math.min(minQ, tile.q);
      maxQ = Math.max(maxQ, tile.q);
      minR = Math.min(minR, tile.r);
      maxR = Math.max(maxR, tile.r);
    }

    this.hexMap.bounds = { minQ, maxQ, minR, maxR };
  }

  // 1. Flood-fill par biome (déterministe)
  public computeGroups(): TerrainGroup[] {
    const visited = new Set<string>();
    const groups: TerrainGroup[] = [];
    let groupId = 0;

    // Parcours déterministe des tiles
    const sortedTiles = Array.from(this.hexMap.tiles.values())
      .sort((a, b) => a.q - b.q || a.r - b.r);

    for (const tile of sortedTiles) {
      const key = HexUtils.tileKey(tile.q, tile.r);
      if (visited.has(key)) continue;

      const group = this.floodFillGroup(tile, visited, groupId++);
      groups.push(group);
    }

    this.hexMap.groups = groups;
    return groups;
  }

  private floodFillGroup(startTile: HexTile, visited: Set<string>, groupId: number): TerrainGroup {
    const queue = [startTile];
    const tiles: HexTile[] = [];
    const biome = startTile.biome;
    
    let sumQ = 0, sumR = 0;

    while (queue.length > 0) {
      const current = queue.shift()!;
      const key = HexUtils.tileKey(current.q, current.r);
      
      if (visited.has(key)) continue;
      visited.add(key);

      current.groupId = groupId;
      tiles.push(current);
      sumQ += current.q;
      sumR += current.r;

      // Voisins dans l'ordre fixe pour déterminisme
      const neighbors = HexUtils.getNeighbors(current.q, current.r);
      for (const neighbor of neighbors) {
        const neighborKey = HexUtils.tileKey(neighbor.q, neighbor.r);
        const neighborTile = this.hexMap.tiles.get(neighborKey);
        
        if (neighborTile && !visited.has(neighborKey) && neighborTile.biome === biome) {
          queue.push(neighborTile);
        }
      }
    }

    return {
      id: groupId,
      biome,
      tiles,
      center: { q: sumQ / tiles.length, r: sumR / tiles.length },
      area: tiles.length
    };
  }

  // 2. Distance au bord (BFS)
  public computeDistanceToEdge(): void {
    for (const group of this.hexMap.groups) {
      this.computeGroupDistanceToEdge(group);
    }
  }

  private computeGroupDistanceToEdge(group: TerrainGroup): void {
    const queue: { tile: HexTile; distance: number }[] = [];
    const distances = new Map<string, number>();

    // Trouver les tiles de bord
    for (const tile of group.tiles) {
      const neighbors = HexUtils.getNeighbors(tile.q, tile.r);
      let isEdge = false;

      for (const neighbor of neighbors) {
        const neighborTile = this.hexMap.tiles.get(HexUtils.tileKey(neighbor.q, neighbor.r));
        if (!neighborTile || neighborTile.biome !== group.biome) {
          isEdge = true;
          break;
        }
      }

      if (isEdge) {
        queue.push({ tile, distance: 0 });
        distances.set(HexUtils.tileKey(tile.q, tile.r), 0);
        tile.distanceToEdge = 0;
      }
    }

    // BFS pour calculer les distances
    while (queue.length > 0) {
      const { tile, distance } = queue.shift()!;
      
      const neighbors = HexUtils.getNeighbors(tile.q, tile.r);
      for (const neighbor of neighbors) {
        const neighborKey = HexUtils.tileKey(neighbor.q, neighbor.r);
        const neighborTile = this.hexMap.tiles.get(neighborKey);
        
        if (neighborTile && 
            neighborTile.biome === group.biome && 
            !distances.has(neighborKey)) {
          
          const newDistance = distance + 1;
          distances.set(neighborKey, newDistance);
          neighborTile.distanceToEdge = newDistance;
          queue.push({ tile: neighborTile, distance: newDistance });
        }
      }
    }
  }

  // 3. Gradient directionnel
  public computeGradientDirection(): void {
    const tileEntries = Array.from(this.hexMap.tiles.entries());
    for (const [key, tile] of tileEntries) {
      const neighbors = HexUtils.getNeighbors(tile.q, tile.r);
      let minElevation = tile.elevation;
      let gradientDir = { dx: 0, dy: 0 };

      for (const neighbor of neighbors) {
        const neighborTile = this.hexMap.tiles.get(HexUtils.tileKey(neighbor.q, neighbor.r));
        if (neighborTile && neighborTile.elevation < minElevation) {
          minElevation = neighborTile.elevation;
          const direction = HexUtils.axialToPixel(neighbor.q - tile.q, neighbor.r - tile.r);
          gradientDir = { dx: direction.x, dy: direction.y };
        }
      }

      tile.gradientDir = gradientDir;
    }
  }

  // 4. Sélection du sprite
  public getSpriteForTile(tile: HexTile): string {
    const neighbors = HexUtils.getNeighbors(tile.q, tile.r)
      .map(coord => this.hexMap.tiles.get(HexUtils.tileKey(coord.q, coord.r)))
      .filter(t => t !== undefined) as HexTile[];

    // Déterminisme avec hash
    const hash = HexUtils.deterministicHash(tile.q, tile.r, this.hexMap.seed);
    
    // Vérifier les transitions
    const differentBiomes = neighbors.some(n => n.biome !== tile.biome);
    if (differentBiomes) {
      return this.getEdgeSprite(tile, neighbors, hash);
    }

    // Sprite basé sur la distance au bord
    const distance = tile.distanceToEdge || 0;
    if (distance === 0) {
      return this.getEdgeSprite(tile, neighbors, hash);
    } else if (distance === 1) {
      return this.getInnerSprite(tile, hash);
    } else {
      return this.getCoreSprite(tile, hash);
    }
  }

  private getEdgeSprite(tile: HexTile, neighbors: HexTile[], hash: number): string {
    const variants = this.getBiomeVariants(tile.biome, 'edge');
    const variantIndex = Math.floor(hash * variants);
    return `${tile.biome}_edge_${variantIndex}`;
  }

  private getInnerSprite(tile: HexTile, hash: number): string {
    const variants = this.getBiomeVariants(tile.biome, 'inner');
    const variantIndex = Math.floor(hash * variants);
    return `${tile.biome}_inner_${variantIndex}`;
  }

  private getCoreSprite(tile: HexTile, hash: number): string {
    const variants = this.getBiomeVariants(tile.biome, 'core');
    const variantIndex = Math.floor(hash * variants);
    return `${tile.biome}_core_${variantIndex}`;
  }

  private getBiomeVariants(biome: BiomeType, type: string): number {
    // Nombre de variantes par biome et type
    const variants: Record<string, Record<string, number>> = {
      forest: { core: 3, inner: 2, edge: 4 },
      desert: { core: 2, inner: 2, edge: 3 },
      water: { core: 2, inner: 1, edge: 3 },
      mountain: { core: 2, inner: 2, edge: 2 },
      grass: { core: 3, inner: 2, edge: 3 },
      swamp: { core: 2, inner: 1, edge: 2 }
    };

    return variants[biome]?.[type] || 1;
  }

  // 5. Rivières
  public computeRivers(): void {
    const tileEntries = Array.from(this.hexMap.tiles.entries());
    for (const [key, tile] of tileEntries) {
      if (tile.riverFlowDir) {
        this.processRiverTile(tile);
      }
    }
  }

  private processRiverTile(tile: HexTile): void {
    // Logique pour traiter les rivières
    // Connecter avec les tiles voisines qui ont des directions opposées
    const neighbors = HexUtils.getNeighbors(tile.q, tile.r);
    // Implementation détaillée selon le flow direction
  }

  // 6. Formes macro-naturelles
  public generateMacroFormations(): MacroFormation[] {
    const formations: MacroFormation[] = [];
    
    // Générer des clairières dans les forêts
    formations.push(...this.generateClearings());
    
    // Générer des dunes dans les déserts
    formations.push(...this.generateDunes());
    
    // Générer des golfes dans l'eau
    formations.push(...this.generateGulfs());
    
    return formations;
  }

  private generateClearings(): MacroFormation[] {
    const clearings: MacroFormation[] = [];
    
    for (const group of this.hexMap.groups) {
      if (group.biome === 'forest' && group.area > 50) {
        // Seed fixe pour déterminisme
        const hash = HexUtils.deterministicHash(Math.floor(group.center.q), Math.floor(group.center.r), this.hexMap.seed);
        
        if (hash < 0.3) { // 30% de chance
          const centerTile = group.tiles.find(t => (t.distanceToEdge || 0) > 4);
          if (centerTile) {
            clearings.push({
              type: 'clearing',
              center: { q: centerTile.q, r: centerTile.r },
              radius: 2,
              tiles: this.getCircularArea(centerTile.q, centerTile.r, 2),
              parameters: { originalBiome: 'forest' }
            });
          }
        }
      }
    }
    
    return clearings;
  }

  private generateDunes(): MacroFormation[] {
    const dunes: MacroFormation[] = [];
    
    for (const group of this.hexMap.groups) {
      if (group.biome === 'desert') {
        for (const tile of group.tiles) {
          if (tile.gradientDir && (Math.abs(tile.gradientDir.dx) > 0.5 || Math.abs(tile.gradientDir.dy) > 0.5)) {
            // Tile avec pente douce -> dune
            tile.spriteId = this.getDuneSprite(tile);
          }
        }
      }
    }
    
    return dunes;
  }

  private generateGulfs(): MacroFormation[] {
    const gulfs: MacroFormation[] = [];
    
    for (const group of this.hexMap.groups) {
      if (group.biome === 'water' && group.area > 30) {
        // Trouver les tiles côtières
        const coastalTiles = group.tiles.filter(t => (t.distanceToEdge || 0) === 0);
        
        if (coastalTiles.length > 10) {
          gulfs.push({
            type: 'gulf',
            center: group.center,
            radius: Math.sqrt(group.area / Math.PI),
            tiles: coastalTiles.map(t => ({ q: t.q, r: t.r })),
            parameters: { depth: 'shallow' }
          });
        }
      }
    }
    
    return gulfs;
  }

  private getDuneSprite(tile: HexTile): string {
    const gradient = tile.gradientDir!;
    const angle = Math.atan2(gradient.dy, gradient.dx);
    const direction = this.angleToDirection(angle);
    return `desert_dune_${direction}`;
  }

  private angleToDirection(angle: number): string {
    const directions = ['E', 'NE', 'NW', 'W', 'SW', 'SE'];
    const index = Math.floor(((angle + Math.PI) / (2 * Math.PI)) * 6) % 6;
    return directions[index];
  }

  private getCircularArea(centerQ: number, centerR: number, radius: number): AxialCoord[] {
    const area: AxialCoord[] = [];
    
    for (let q = centerQ - radius; q <= centerQ + radius; q++) {
      for (let r = centerR - radius; r <= centerR + radius; r++) {
        if (HexUtils.distance({ q, r }, { q: centerQ, r: centerR }) <= radius) {
          area.push({ q, r });
        }
      }
    }
    
    return area;
  }

  // Pipeline complet de traitement
  public processAll(): HexMap {
    if (this.processed) return this.hexMap;

    console.log('🔄 Processing terrain...');
    
    // 1. Flood-fill par biome
    this.computeGroups();
    
    // 2. Distance au bord
    this.computeDistanceToEdge();
    
    // 3. Gradient directionnel
    this.computeGradientDirection();
    
    // 4. Sélection des sprites
    const tileEntries = Array.from(this.hexMap.tiles.entries());
    for (const [key, tile] of tileEntries) {
      tile.spriteId = this.getSpriteForTile(tile);
    }
    
    // 5. Rivières
    this.computeRivers();
    
    // 6. Formes macro-naturelles
    this.generateMacroFormations();
    
    this.processed = true;
    console.log('✅ Terrain processing complete');
    
    return this.hexMap;
  }

  // Getters
  public getHexMap(): HexMap {
    return this.hexMap;
  }

  public getTile(q: number, r: number): HexTile | undefined {
    return this.hexMap.tiles.get(HexUtils.tileKey(q, r));
  }

  public getGroups(): TerrainGroup[] {
    return this.hexMap.groups;
  }

  public getBounds() {
    return this.hexMap.bounds;
  }
}