import { Tile, Position, Structure, Creature } from '../types/game';

// Types de terrain avec propriétés
export interface TerrainType {
  name: string;
  emoji: string;
  color: string;
  movementCost: number;
  canBuildCastle: boolean;
  preferredStructures: string[];
}

// Configuration des terrains
export const TERRAIN_TYPES: Record<string, TerrainType> = {
  grass: {
    name: 'Plaines',
    emoji: '🌱',
    color: '#4CAF50',
    movementCost: 1,
    canBuildCastle: true,
    preferredStructures: ['village', 'farm', 'tavern']
  },
  forest: {
    name: 'Forêt',
    emoji: '🌲',
    color: '#2E7D32',
    movementCost: 2,
    canBuildCastle: true,
    preferredStructures: ['sawmill', 'elven_dwelling', 'hunting_lodge']
  },
  mountain: {
    name: 'Montagne',
    emoji: '⛰️',
    color: '#795548',
    movementCost: 3,
    canBuildCastle: true,
    preferredStructures: ['gold_mine', 'stone_quarry', 'dwarven_citadel']
  },
  water: {
    name: 'Eau',
    emoji: '🌊',
    color: '#2196F3',
    movementCost: 999, // Impassable sans navire
    canBuildCastle: false,
    preferredStructures: ['lighthouse', 'shipyard', 'sea_temple']
  },
  desert: {
    name: 'Désert',
    emoji: '🏜️',
    color: '#FFC107',
    movementCost: 2,
    canBuildCastle: true,
    preferredStructures: ['oasis', 'pyramid', 'magic_tower']
  },
  swamp: {
    name: 'Marécage',
    emoji: '🐸',
    color: '#8BC34A',
    movementCost: 3,
    canBuildCastle: false,
    preferredStructures: ['witch_hut', 'alchemist_lab', 'bog_creature_den']
  }
};

// Types de structures
export interface StructureType {
  name: string;
  emoji: string;
  type: 'castle' | 'resource' | 'dwelling' | 'special';
  cost: { gold: number; wood: number; stone: number };
  dailyIncome?: { gold?: number; wood?: number; stone?: number; mana?: number };
  description: string;
}

export const STRUCTURE_TYPES: Record<string, StructureType> = {
  // Châteaux
  human_castle: {
    name: 'Château Humain',
    emoji: '🏰',
    type: 'castle',
    cost: { gold: 5000, wood: 50, stone: 50 },
    description: 'Forteresse principale des humains'
  },
  elven_fortress: {
    name: 'Forteresse Elfique',
    emoji: '🌲',
    type: 'castle',
    cost: { gold: 4000, wood: 80, stone: 20 },
    description: 'Citadelle magique des elfes'
  },
  dwarven_citadel: {
    name: 'Citadelle Naine',
    emoji: '⛰️',
    type: 'castle',
    cost: { gold: 6000, wood: 20, stone: 80 },
    description: 'Forteresse souterraine des nains'
  },
  magic_tower: {
    name: 'Tour de Magie',
    emoji: '🔮',
    type: 'castle',
    cost: { gold: 4500, wood: 30, stone: 40 },
    description: 'Spire mystique des mages'
  },
  
  // Mines de ressources
  gold_mine: {
    name: 'Mine d\'Or',
    emoji: '💰',
    type: 'resource',
    cost: { gold: 2000, wood: 10, stone: 20 },
    dailyIncome: { gold: 1000 },
    description: 'Produit de l\'or quotidiennement'
  },
  sawmill: {
    name: 'Scierie',
    emoji: '🪵',
    type: 'resource',
    cost: { gold: 1500, wood: 5, stone: 10 },
    dailyIncome: { wood: 10 },
    description: 'Produit du bois quotidiennement'
  },
  stone_quarry: {
    name: 'Carrière',
    emoji: '🗿',
    type: 'resource',
    cost: { gold: 1800, wood: 8, stone: 5 },
    dailyIncome: { stone: 10 },
    description: 'Produit de la pierre quotidiennement'
  },
  crystal_mine: {
    name: 'Mine de Cristal',
    emoji: '💎',
    type: 'resource',
    cost: { gold: 3000, wood: 15, stone: 25 },
    dailyIncome: { mana: 5 },
    description: 'Produit de la mana quotidiennement'
  },
  
  // Habitations
  village: {
    name: 'Village',
    emoji: '🏘️',
    type: 'dwelling',
    cost: { gold: 1000, wood: 20, stone: 10 },
    description: 'Recrute des paysans et soldats'
  },
  tavern: {
    name: 'Taverne',
    emoji: '🍺',
    type: 'dwelling',
    cost: { gold: 800, wood: 15, stone: 5 },
    description: 'Héros disponibles à l\'embauche'
  },
  temple: {
    name: 'Temple',
    emoji: '⛪',
    type: 'special',
    cost: { gold: 2500, wood: 25, stone: 30 },
    description: 'Soigne les héros et bénit les armées'
  },
  laboratory: {
    name: 'Laboratoire',
    emoji: '🧪',
    type: 'special',
    cost: { gold: 2000, wood: 10, stone: 20 },
    description: 'Améliore les sorts et potions'
  }
};

// Types de créatures
export interface CreatureType {
  name: string;
  emoji: string;
  level: number;
  health: number;
  attack: number;
  defense: number;
  preferredTerrain: string[];
  isGuardian: boolean;
  treasure?: { gold: number; items: string[] };
}

export const CREATURE_TYPES: Record<string, CreatureType> = {
  dragon: {
    name: 'Dragon',
    emoji: '🐉',
    level: 7,
    health: 300,
    attack: 25,
    defense: 20,
    preferredTerrain: ['mountain', 'desert'],
    isGuardian: true,
    treasure: { gold: 5000, items: ['Dragon Scale', 'Ancient Artifact'] }
  },
  wolf: {
    name: 'Loup',
    emoji: '🐺',
    level: 2,
    health: 50,
    attack: 8,
    defense: 5,
    preferredTerrain: ['forest'],
    isGuardian: false
  },
  golem: {
    name: 'Golem',
    emoji: '🗿',
    level: 4,
    health: 150,
    attack: 12,
    defense: 18,
    preferredTerrain: ['mountain'],
    isGuardian: true,
    treasure: { gold: 2000, items: ['Magic Stone'] }
  },
  elemental: {
    name: 'Élémentaire',
    emoji: '💫',
    level: 5,
    health: 100,
    attack: 15,
    defense: 10,
    preferredTerrain: ['desert', 'swamp'],
    isGuardian: true,
    treasure: { gold: 3000, items: ['Elemental Essence'] }
  },
  sea_monster: {
    name: 'Monstre Marin',
    emoji: '🐙',
    level: 6,
    health: 200,
    attack: 18,
    defense: 15,
    preferredTerrain: ['water'],
    isGuardian: true,
    treasure: { gold: 4000, items: ['Pearl of Wisdom'] }
  }
};

// Générateur de carte avancé
export class AdvancedMapGenerator {
  private width: number;
  private height: number;
  private seed: number;
  private map: Tile[][];
  
  constructor(width: number, height: number, seed?: number) {
    this.width = width;
    this.height = height;
    this.seed = seed || Math.random();
    this.map = [];
  }

  // Générateur de nombres pseudo-aléatoires basé sur la seed
  private random(): number {
    this.seed = (this.seed * 9301 + 49297) % 233280;
    return this.seed / 233280;
  }

  // Génère un terrain de base avec des biomes cohérents
  private generateBaseTerrain(): void {
    // Initialiser la carte
    for (let y = 0; y < this.height; y++) {
      this.map[y] = [];
      for (let x = 0; x < this.width; x++) {
        this.map[y][x] = {
          x,
          y,
          terrain: 'grass',
          structure: null,
          creature: null,
          hero: null,
          isVisible: true,
          movementCost: 1
        };
      }
    }

    // Générer des zones de terrain cohérentes
    this.generateTerrainZones();
    this.generateRivers();
    this.smoothTerrain();
  }

  // Génère des zones de terrain cohérentes
  private generateTerrainZones(): void {
    const zones: Array<{
      terrain: 'grass' | 'forest' | 'mountain' | 'water' | 'desert' | 'swamp';
      centerX: number;
      centerY: number;
      radius: number;
    }> = [
      { terrain: 'forest', centerX: this.width * 0.2, centerY: this.height * 0.3, radius: 8 },
      { terrain: 'mountain', centerX: this.width * 0.8, centerY: this.height * 0.2, radius: 6 },
      { terrain: 'desert', centerX: this.width * 0.7, centerY: this.height * 0.8, radius: 7 },
      { terrain: 'swamp', centerX: this.width * 0.1, centerY: this.height * 0.7, radius: 5 }
    ];

    zones.forEach(zone => {
      for (let y = 0; y < this.height; y++) {
        for (let x = 0; x < this.width; x++) {
          const distance = Math.sqrt(
            Math.pow(x - zone.centerX, 2) + Math.pow(y - zone.centerY, 2)
          );
          
          if (distance < zone.radius) {
            const probability = 1 - (distance / zone.radius);
            if (this.random() < probability) {
              this.map[y][x].terrain = zone.terrain;
            }
          }
        }
      }
    });
  }

  // Génère des rivières
  private generateRivers(): void {
    const riverPaths = [
      { startX: 0, startY: Math.floor(this.height * 0.3), endX: this.width - 1, endY: Math.floor(this.height * 0.6) },
      { startX: Math.floor(this.width * 0.2), startY: 0, endX: Math.floor(this.width * 0.8), endY: this.height - 1 }
    ];

    riverPaths.forEach(river => {
      const steps = Math.max(Math.abs(river.endX - river.startX), Math.abs(river.endY - river.startY));
      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const x = Math.floor(river.startX + (river.endX - river.startX) * t);
        const y = Math.floor(river.startY + (river.endY - river.startY) * t);
        
        if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
          this.map[y][x].terrain = 'water';
          
          // Ajouter de l'eau autour de la rivière
          for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
              const nx = x + dx;
              const ny = y + dy;
              if (nx >= 0 && nx < this.width && ny >= 0 && ny < this.height) {
                if (this.random() < 0.3) {
                  this.map[ny][nx].terrain = 'water';
                }
              }
            }
          }
        }
      }
    });
  }

  // Lisse le terrain pour des transitions plus naturelles
  private smoothTerrain(): void {
    for (let iteration = 0; iteration < 2; iteration++) {
      const newMap = JSON.parse(JSON.stringify(this.map));
      
      for (let y = 1; y < this.height - 1; y++) {
        for (let x = 1; x < this.width - 1; x++) {
          const neighbors = this.getNeighbors(x, y);
          const terrainCounts: Record<string, number> = {};
          
          neighbors.forEach(neighbor => {
            const terrain = this.map[neighbor.y][neighbor.x].terrain;
            terrainCounts[terrain] = (terrainCounts[terrain] || 0) + 1;
          });
          
          const dominantTerrain = Object.keys(terrainCounts).reduce((a, b) => 
            terrainCounts[a] > terrainCounts[b] ? a : b
          );
          
          if (terrainCounts[dominantTerrain] >= 4) {
            newMap[y][x].terrain = dominantTerrain;
          }
        }
      }
      
      this.map = newMap;
    }
  }

  // Place les structures de manière stratégique
  private placeStructures(): void {
    // Placer les châteaux des joueurs
    const castlePositions = [
      { x: 2, y: 2, type: 'human_castle' },
      { x: this.width - 3, y: this.height - 3, type: 'elven_fortress' },
      { x: 2, y: this.height - 3, type: 'dwarven_citadel' },
      { x: this.width - 3, y: 2, type: 'magic_tower' }
    ];

    castlePositions.forEach(castle => {
      if (this.isValidPosition(castle.x, castle.y)) {
        this.map[castle.y][castle.x].structure = {
          id: `castle_${castle.x}_${castle.y}`,
          type: castle.type,
          name: STRUCTURE_TYPES[castle.type].name,
          owner: null,
          level: 1,
          health: 1000,
          position: { x: castle.x, y: castle.y }
        };
      }
    });

    // Placer les mines de ressources
    this.placeResourceMines();
    
    // Placer les habitations neutres
    this.placeNeutralStructures();
  }

  // Place les mines de ressources
  private placeResourceMines(): void {
    const mineTypes = ['gold_mine', 'sawmill', 'stone_quarry', 'crystal_mine'];
    const minesPerType = 3;

    mineTypes.forEach(mineType => {
      for (let i = 0; i < minesPerType; i++) {
        let attempts = 0;
        let placed = false;
        
        while (!placed && attempts < 50) {
          const x = Math.floor(this.random() * this.width);
          const y = Math.floor(this.random() * this.height);
          
          if (this.isValidStructurePosition(x, y, mineType)) {
            this.map[y][x].structure = {
              id: `${mineType}_${x}_${y}`,
              type: mineType,
              name: STRUCTURE_TYPES[mineType].name,
              owner: null,
              level: 1,
              health: 500,
              position: { x, y }
            };
            placed = true;
          }
          attempts++;
        }
      }
    });
  }

  // Place les structures neutres
  private placeNeutralStructures(): void {
    const neutralStructures = ['village', 'tavern', 'temple', 'laboratory'];
    const structuresPerType = 2;

    neutralStructures.forEach(structureType => {
      for (let i = 0; i < structuresPerType; i++) {
        let attempts = 0;
        let placed = false;
        
        while (!placed && attempts < 50) {
          const x = Math.floor(this.random() * this.width);
          const y = Math.floor(this.random() * this.height);
          
          if (this.isValidStructurePosition(x, y, structureType)) {
            this.map[y][x].structure = {
              id: `${structureType}_${x}_${y}`,
              type: structureType,
              name: STRUCTURE_TYPES[structureType].name,
              owner: null,
              level: 1,
              health: 300,
              position: { x, y }
            };
            placed = true;
          }
          attempts++;
        }
      }
    });
  }

  // Place les créatures
  private placeCreatures(): void {
    const creatureTypes = Object.keys(CREATURE_TYPES);
    const creaturesPerType = 2;

    creatureTypes.forEach(creatureType => {
      const creature = CREATURE_TYPES[creatureType];
      
      for (let i = 0; i < creaturesPerType; i++) {
        let attempts = 0;
        let placed = false;
        
        while (!placed && attempts < 50) {
          const x = Math.floor(this.random() * this.width);
          const y = Math.floor(this.random() * this.height);
          
          if (this.isValidCreaturePosition(x, y, creatureType)) {
            this.map[y][x].creature = {
              id: `${creatureType}_${x}_${y}`,
              type: creatureType,
              name: creature.name,
              level: creature.level,
              health: creature.health,
              maxHealth: creature.health,
              attack: creature.attack,
              defense: creature.defense,
              position: { x, y },
              isGuardian: creature.isGuardian,
              treasure: creature.treasure
            };
            placed = true;
          }
          attempts++;
        }
      }
    });
  }

  // Vérifie si une position est valide
  private isValidPosition(x: number, y: number): boolean {
    return x >= 0 && x < this.width && y >= 0 && y < this.height;
  }

  // Vérifie si une position est valide pour une structure
  private isValidStructurePosition(x: number, y: number, structureType: string): boolean {
    if (!this.isValidPosition(x, y)) return false;
    
    const tile = this.map[y][x];
    if (tile.structure || tile.creature) return false;
    
    const terrainType = TERRAIN_TYPES[tile.terrain];
    if (!terrainType) return false;
    
    // Vérifier si le terrain est approprié
    const structure = STRUCTURE_TYPES[structureType];
    if (structure.type === 'castle' && !terrainType.canBuildCastle) return false;
    
    // Vérifier la distance minimale avec d'autres structures
    const minDistance = structure.type === 'castle' ? 5 : 3;
    return this.getDistanceToNearestStructure(x, y) >= minDistance;
  }

  // Vérifie si une position est valide pour une créature
  private isValidCreaturePosition(x: number, y: number, creatureType: string): boolean {
    if (!this.isValidPosition(x, y)) return false;
    
    const tile = this.map[y][x];
    if (tile.structure || tile.creature) return false;
    
    const creature = CREATURE_TYPES[creatureType];
    if (!creature.preferredTerrain.includes(tile.terrain)) return false;
    
    return this.getDistanceToNearestStructure(x, y) >= 2;
  }

  // Calcule la distance à la structure la plus proche
  private getDistanceToNearestStructure(x: number, y: number): number {
    let minDistance = Infinity;
    
    for (let y2 = 0; y2 < this.height; y2++) {
      for (let x2 = 0; x2 < this.width; x2++) {
        if (this.map[y2][x2].structure) {
          const distance = Math.sqrt(Math.pow(x - x2, 2) + Math.pow(y - y2, 2));
          minDistance = Math.min(minDistance, distance);
        }
      }
    }
    
    return minDistance;
  }

  // Obtient les voisins d'une position
  private getNeighbors(x: number, y: number): Position[] {
    const neighbors: Position[] = [];
    
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (dx === 0 && dy === 0) continue;
        
        const nx = x + dx;
        const ny = y + dy;
        
        if (this.isValidPosition(nx, ny)) {
          neighbors.push({ x: nx, y: ny });
        }
      }
    }
    
    return neighbors;
  }

  // Génère la carte complète
  public generateMap(): Tile[][] {
    console.log('🗺️ Génération de la carte avancée...');
    
    // Étape 1: Terrain de base
    this.generateBaseTerrain();
    console.log('✅ Terrain de base généré');
    
    // Étape 2: Structures
    this.placeStructures();
    console.log('✅ Structures placées');
    
    // Étape 3: Créatures
    this.placeCreatures();
    console.log('✅ Créatures placées');
    
    // Mettre à jour les coûts de mouvement
    this.updateMovementCosts();
    console.log('✅ Coûts de mouvement mis à jour');
    
    console.log('🎉 Carte avancée générée avec succès!');
    return this.map;
  }

  // Met à jour les coûts de mouvement
  private updateMovementCosts(): void {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const tile = this.map[y][x];
        const terrainType = TERRAIN_TYPES[tile.terrain];
        tile.movementCost = terrainType ? terrainType.movementCost : 1;
      }
    }
  }
}

// Fonction utilitaire pour générer une carte
export function generateAdvancedMap(width: number, height: number, seed?: number): Tile[][] {
  const generator = new AdvancedMapGenerator(width, height, seed);
  return generator.generateMap();
} 