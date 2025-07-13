// Game Assets Constants
// All assets are open-source and properly credited

export const TERRAIN_ASSETS = {
  GRASS: '/assets/terrain/grass.png',
  FOREST: '/assets/terrain/forest.png',
  MOUNTAIN: '/assets/terrain/mountain.png',
  WATER: '/assets/terrain/water.png',
  DESERT: '/assets/terrain/desert.png',
  SWAMP: '/assets/terrain/swamp.png',
} as const;

export const HERO_ASSETS = {
  WARRIOR: '/assets/heroes/warrior.png',
  MAGE: '/assets/heroes/mage.png',
} as const;

export const CREATURE_ASSETS = {
  DRAGON: '/assets/creatures/dragon.png',
  KNIGHT: '/assets/creatures/knight.png',
} as const;

export const UI_ASSETS = {
  PANEL_BG: 'linear-gradient(135deg, rgba(139, 69, 19, 0.9) 0%, rgba(160, 82, 45, 0.9) 100%)',
  GOLD_TRIM: 'linear-gradient(90deg, #FFD700 0%, #FFA500 50%, #FFD700 100%)',
  BUTTON_BG: 'linear-gradient(135deg, #8B4513 0%, #A0522D 100%)',
  BUTTON_HOVER: 'linear-gradient(135deg, #A0522D 0%, #CD853F 100%)',
} as const;

export const TERRAIN_TYPES = {
  GRASS: 'grass',
  FOREST: 'forest',
  MOUNTAIN: 'mountain',
  WATER: 'water',
  DESERT: 'desert',
  SWAMP: 'swamp',
} as const;

export const HERO_TYPES = {
  WARRIOR: 'warrior',
  MAGE: 'mage',
} as const;

export const CREATURE_TYPES = {
  DRAGON: 'dragon',
  KNIGHT: 'knight',
} as const;

// Asset mapping for easy lookup
export const getTerrainAsset = (terrainType: keyof typeof TERRAIN_TYPES): string => {
  const assetMap: Record<string, string> = {
    [TERRAIN_TYPES.GRASS]: TERRAIN_ASSETS.GRASS,
    [TERRAIN_TYPES.FOREST]: TERRAIN_ASSETS.FOREST,
    [TERRAIN_TYPES.MOUNTAIN]: TERRAIN_ASSETS.MOUNTAIN,
    [TERRAIN_TYPES.WATER]: TERRAIN_ASSETS.WATER,
    [TERRAIN_TYPES.DESERT]: TERRAIN_ASSETS.DESERT,
    [TERRAIN_TYPES.SWAMP]: TERRAIN_ASSETS.SWAMP,
  };
  return assetMap[terrainType] || TERRAIN_ASSETS.GRASS;
};

export const getHeroAsset = (heroType: keyof typeof HERO_TYPES): string => {
  const assetMap: Record<string, string> = {
    [HERO_TYPES.WARRIOR]: HERO_ASSETS.WARRIOR,
    [HERO_TYPES.MAGE]: HERO_ASSETS.MAGE,
  };
  return assetMap[heroType] || HERO_ASSETS.WARRIOR;
};

export const getCreatureAsset = (creatureType: keyof typeof CREATURE_TYPES): string => {
  const assetMap: Record<string, string> = {
    [CREATURE_TYPES.DRAGON]: CREATURE_ASSETS.DRAGON,
    [CREATURE_TYPES.KNIGHT]: CREATURE_ASSETS.KNIGHT,
  };
  return assetMap[creatureType] || CREATURE_ASSETS.KNIGHT;
}; 