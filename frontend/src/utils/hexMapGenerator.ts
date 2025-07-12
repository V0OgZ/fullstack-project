import { Tile } from '../types/game';
import { TERRAIN_TYPES } from '../constants/assets';

export interface HexMapConfig {
  width: number;
  height: number;
  terrainDistribution?: {
    grass: number;
    forest: number;
    mountain: number;
    water: number;
    desert: number;
    swamp: number;
  };
}

const defaultTerrainDistribution = {
  grass: 0.4,
  forest: 0.25,
  mountain: 0.15,
  water: 0.1,
  desert: 0.05,
  swamp: 0.05,
};

export const generateHexMap = (config: HexMapConfig): Tile[][] => {
  const { width, height, terrainDistribution = defaultTerrainDistribution } = config;
  const map: Tile[][] = [];

  // Create terrain type array based on distribution
  const terrainTypes: string[] = [];
  Object.entries(terrainDistribution).forEach(([terrain, ratio]) => {
    const count = Math.floor(width * height * ratio);
    for (let i = 0; i < count; i++) {
      terrainTypes.push(terrain);
    }
  });

  // Fill remaining slots with grass
  while (terrainTypes.length < width * height) {
    terrainTypes.push(TERRAIN_TYPES.GRASS);
  }

  // Shuffle the terrain types
  for (let i = terrainTypes.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [terrainTypes[i], terrainTypes[j]] = [terrainTypes[j], terrainTypes[i]];
  }

  // Generate the map
  for (let y = 0; y < height; y++) {
    const row: Tile[] = [];
    for (let x = 0; x < width; x++) {
      const terrainIndex = y * width + x;
      const terrainType = terrainTypes[terrainIndex] || TERRAIN_TYPES.GRASS;
      
      const tile: Tile = {
        x,
        y,
        terrain: terrainType as 'grass' | 'forest' | 'mountain' | 'water' | 'desert' | 'swamp',
        walkable: terrainType !== 'water',
        movementCost: getMovementCost(terrainType),
        hero: null,
        creature: null,
      };
      
      row.push(tile);
    }
    map.push(row);
  }

  // Add some heroes and creatures for demonstration
  addDemoEntities(map);

  return map;
};

const getMovementCost = (terrainType: string): number => {
  switch (terrainType) {
    case TERRAIN_TYPES.GRASS:
      return 1;
    case TERRAIN_TYPES.FOREST:
      return 2;
    case TERRAIN_TYPES.MOUNTAIN:
      return 3;
    case TERRAIN_TYPES.WATER:
      return 4;
    case TERRAIN_TYPES.DESERT:
      return 2;
    case TERRAIN_TYPES.SWAMP:
      return 3;
    default:
      return 1;
  }
};

const addDemoEntities = (map: Tile[][]) => {
  const height = map.length;
  const width = map[0].length;

  // Add a hero for player 1
  if (height > 0 && width > 0) {
    const heroTile = map[1][1];
    if (heroTile && heroTile.walkable) {
      heroTile.hero = {
        id: 'hero-1',
        name: 'Arthur',
        position: { x: 1, y: 1 },
        level: 5,
        experience: 1250,
        movementPoints: 3,
        maxMovementPoints: 3,
        stats: { attack: 8, defense: 6, knowledge: 4, spellPower: 3 },
        units: [],
        inventory: [],
        playerId: 'player1',
      };
    }
  }

  // Add a hero for player 2
  if (height > 2 && width > 2) {
    const heroTile = map[height - 2][width - 2];
    if (heroTile && heroTile.walkable) {
      heroTile.hero = {
        id: 'hero-2',
        name: 'Morgana',
        position: { x: width - 2, y: height - 2 },
        level: 4,
        experience: 800,
        movementPoints: 2,
        maxMovementPoints: 2,
        stats: { attack: 6, defense: 4, knowledge: 8, spellPower: 7 },
        units: [],
        inventory: [],
        playerId: 'player2',
      };
    }
  }

  // Add some creatures
  const creaturePositions = [
    { x: 3, y: 3 },
    { x: 5, y: 5 },
    { x: 7, y: 2 },
  ];

  creaturePositions.forEach(({ x, y }) => {
    if (y < map.length && x < map[y].length) {
      const tile = map[y][x];
      if (tile && tile.walkable && !tile.hero) {
        tile.creature = {
          id: `creature-${x}-${y}`,
          name: 'Dragon',
          type: 'dragon',
          level: 5,
          health: 100,
          maxHealth: 100,
          attack: 15,
          defense: 10,
          position: { x, y },
          isGuardian: true,
          treasure: { gold: 1000, items: ['Dragon Scale'] }
        };
      }
    }
  });
};

export const getHexPosition = (x: number, y: number, hexSize: number = 60) => {
  const hexWidth = hexSize * 2;
  const hexHeight = Math.sqrt(3) * hexSize;
  const horizontalSpacing = hexWidth * 0.75;
  const verticalSpacing = hexHeight;
  
  const left = x * horizontalSpacing + (y % 2) * (horizontalSpacing / 2);
  const top = y * verticalSpacing * 0.85;

  return { left, top, width: hexWidth, height: hexHeight };
}; 