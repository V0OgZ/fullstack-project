// 🎮 Système d'Assets Unifié pour Heroes of Time
// Consolidation de toutes les ressources fantasy disponibles
// Remplace les systèmes fragmentés : gameAssets.ts, assets.ts, heroAssets.ts

// ===== TYPES ET INTERFACES =====
export interface AssetInfo {
  path: string;
  type: 'png' | 'gif' | 'sprite' | 'animated';
  fallback?: string;
  metadata?: {
    width?: number;
    height?: number;
    frames?: number;
    duration?: number;
  };
}

export interface SpriteInfo extends AssetInfo {
  type: 'sprite';
  spriteSheet: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

// ===== SYSTÈME DE HÉROS UNIFIÉ - CORRIGÉ =====
// Utilise les images SVG créées + PNG existantes
export const HEROES_ASSETS = {
  // Héros principaux - MAPPING CORRIGÉ vers les images SVG
  ARTHUR: {
    path: '/assets/heroes/arthur.svg',
    type: 'png' as const,
    fallback: '/assets/heroes/warrior.png',
    metadata: { width: 64, height: 64 }
  },
  MORGANA: {
    path: '/assets/heroes/morgana.svg',
    type: 'png' as const,
    fallback: '/assets/heroes/mage.png',
    metadata: { width: 64, height: 64 }
  },
  TRISTAN: {
    path: '/assets/heroes/tristan.svg',
    type: 'png' as const,
    fallback: '/assets/heroes/archer.png',
    metadata: { width: 64, height: 64 }
  },
  ELARA: {
    path: '/assets/heroes/elara.svg',
    type: 'png' as const,
    fallback: '/assets/heroes/paladin.png',
    metadata: { width: 64, height: 64 }
  },
  // Héros additionnels - MAPPING CORRIGÉ
  GARETH: {
    path: '/assets/heroes/warrior.png', // Dragon Slayer = Warrior
    type: 'png' as const,
    fallback: '/assets/heroes/paladin.png',
    metadata: { width: 64, height: 64 }
  },
  LYANNA: {
    path: '/assets/heroes/archer.png', // Elven Archer = Archer
    type: 'png' as const,
    fallback: '/assets/heroes/mage.png',
    metadata: { width: 64, height: 64 }
  },
  // Classes génériques - MAPPING DIRECT
  WARRIOR: {
    path: '/assets/heroes/warrior.png',
    type: 'png' as const,
    fallback: '/assets/heroes/paladin.png',
    metadata: { width: 64, height: 64 }
  },
  MAGE: {
    path: '/assets/heroes/mage.png',
    type: 'png' as const,
    fallback: '/assets/heroes/warrior.png',
    metadata: { width: 64, height: 64 }
  },
  ARCHER: {
    path: '/assets/heroes/archer.png',
    type: 'png' as const,
    fallback: '/assets/heroes/warrior.png',
    metadata: { width: 64, height: 64 }
  },
  PALADIN: {
    path: '/assets/heroes/paladin.png',
    type: 'png' as const,
    fallback: '/assets/heroes/mage.png',
    metadata: { width: 64, height: 64 }
  },
  // Héros additionnels avec mapping vers les classes existantes
  CEDRIC: {
    path: '/assets/heroes/paladin.png', // Paladin
    type: 'png' as const,
    fallback: '/assets/heroes/mage.png',
    metadata: { width: 64, height: 64 }
  },
  SERAPHINA: {
    path: '/assets/heroes/mage.png', // Sorceress = Mage
    type: 'png' as const,
    fallback: '/assets/heroes/warrior.png',
    metadata: { width: 64, height: 64 }
  },
  VALEN: {
    path: '/assets/heroes/mage.png', // Dark Mage = Mage
    type: 'png' as const,
    fallback: '/assets/heroes/warrior.png',
    metadata: { width: 64, height: 64 }
  }
} as const;

// ===== CRÉATURES FANTASY AVEC ANIMATIONS =====
export const CREATURES_ASSETS = {
  // Créatures animées (GIFs locaux)
  DRAGON_RED: {
    path: '/assets/creatures/dragon-red.gif',
    type: 'gif' as const,
    fallback: '/assets/creatures/dragon.png',
    metadata: { width: 128, height: 128, frames: 8, duration: 1000 }
  },
  DRAGON_BLUE: {
    path: '/assets/creatures/dragon-red.gif', // Temporaire - à remplacer par dragon-blue.gif
    type: 'gif' as const,
    fallback: '/assets/creatures/dragon.png',
    metadata: { width: 128, height: 128, frames: 8, duration: 1000 }
  },
  PHOENIX: {
    path: '/assets/creatures/phoenix.gif',
    type: 'gif' as const,
    fallback: '/assets/creatures/phoenix.png',
    metadata: { width: 96, height: 96, frames: 6, duration: 800 }
  },
  GRIFFIN: {
    path: '/assets/creatures/griffin.gif',
    type: 'gif' as const,
    fallback: '/assets/creatures/griffin.png',
    metadata: { width: 96, height: 96, frames: 6, duration: 800 }
  },
  UNICORN: {
    path: '/assets/creatures/unicorn.gif',
    type: 'gif' as const,
    fallback: '/assets/creatures/unicorn.png',
    metadata: { width: 96, height: 96, frames: 6, duration: 800 }
  },
  // Créatures statiques
  KNIGHT: {
    path: '/assets/creatures/knight.png',
    type: 'png' as const,
    fallback: '/assets/heroes/warrior.png',
    metadata: { width: 64, height: 64 }
  }
} as const;

// ===== TERRAIN ET ENVIRONNEMENT =====
export const TERRAIN_ASSETS = {
  GRASS: {
    path: '/assets/terrain/grass.png',
    type: 'png' as const,
    metadata: { width: 64, height: 64 }
  },
  FOREST: {
    path: '/assets/terrain/forest.png',
    type: 'png' as const,
    metadata: { width: 64, height: 64 }
  },
  MOUNTAIN: {
    path: '/assets/terrain/mountain.png',
    type: 'png' as const,
    metadata: { width: 64, height: 64 }
  },
  WATER: {
    path: '/assets/terrain/water.png',
    type: 'png' as const,
    metadata: { width: 64, height: 64 }
  },
  DESERT: {
    path: '/assets/terrain/desert.png',
    type: 'png' as const,
    metadata: { width: 64, height: 64 }
  },
  SWAMP: {
    path: '/assets/terrain/swamp.png',
    type: 'png' as const,
    metadata: { width: 64, height: 64 }
  }
} as const;

// ===== BÂTIMENTS - NOUVEAU SYSTÈME =====
export const BUILDINGS_ASSETS = {
  CASTLE: {
    path: '/assets/buildings/castle.svg',
    type: 'png' as const,
    fallback: '🏰',
    metadata: { width: 64, height: 64 }
  },
  BARRACKS: {
    path: '/assets/buildings/barracks.svg',
    type: 'png' as const,
    fallback: '⚔️',
    metadata: { width: 64, height: 64 }
  },
  MAGE_TOWER: {
    path: '/assets/buildings/mage-tower.svg',
    type: 'png' as const,
    fallback: '🧙‍♀️',
    metadata: { width: 64, height: 64 }
  },
  ARCHERY_RANGE: {
    path: '/assets/buildings/archery-range.svg',
    type: 'png' as const,
    fallback: '🏹',
    metadata: { width: 64, height: 64 }
  },
  TEMPLE: {
    path: '/assets/buildings/temple.svg',
    type: 'png' as const,
    fallback: '⛪',
    metadata: { width: 64, height: 64 }
  },
  FARM: {
    path: '/assets/buildings/farm.svg',
    type: 'png' as const,
    fallback: '🌾',
    metadata: { width: 64, height: 64 }
  },
  MINE: {
    path: '/assets/buildings/mine.svg',
    type: 'png' as const,
    fallback: '⛏️',
    metadata: { width: 64, height: 64 }
  },
  WORKSHOP: {
    path: '/assets/buildings/workshop.svg',
    type: 'png' as const,
    fallback: '🔨',
    metadata: { width: 64, height: 64 }
  }
} as const;

// ===== EFFETS VISUELS LOCAUX =====
export const EFFECTS_ASSETS = {
  // Remplace les URLs externes Giphy par des effets locaux
  FIRE: {
    path: '/assets/effects/fire.gif',
    type: 'gif' as const,
    fallback: '🔥', // Emoji fallback
    metadata: { width: 32, height: 32, frames: 4, duration: 500 }
  },
  ICE: {
    path: '/assets/effects/ice.gif',
    type: 'gif' as const,
    fallback: '❄️',
    metadata: { width: 32, height: 32, frames: 4, duration: 500 }
  },
  LIGHTNING: {
    path: '/assets/effects/lightning.gif',
    type: 'gif' as const,
    fallback: '⚡',
    metadata: { width: 32, height: 32, frames: 6, duration: 300 }
  },
  HEAL: {
    path: '/assets/effects/heal.gif',
    type: 'gif' as const,
    fallback: '💚',
    metadata: { width: 32, height: 32, frames: 4, duration: 600 }
  },
  SHIELD: {
    path: '/assets/effects/shield.gif',
    type: 'gif' as const,
    fallback: '🛡️',
    metadata: { width: 32, height: 32, frames: 4, duration: 600 }
  }
} as const;

// ===== ICÔNES EMOJI POUR INTERFACE =====
export const UI_ICONS = {
  // Navigation
  MENU: '☰',
  CLOSE: '✕',
  SETTINGS: '⚙️',
  HELP: '❓',
  
  // Actions
  MOVE: '👣',
  ATTACK: '⚔️',
  CAST: '🔮',
  COLLECT: '📦',
  BUILD: '🏗️',
  
  // Statuts
  ACTIVE: '✅',
  WAITING: '⏳',
  ERROR: '❌',
  LOCKED: '🔒',
  
  // Ressources
  GOLD: '💰',
  WOOD: '🪵',
  STONE: '🪨',
  FOOD: '🍖',
  MANA: '🔮',
  
  // Héros
  HERO: '🦸',
  KNIGHT: '🛡️',
  MAGE: '🧙‍♀️',
  ARCHER: '🏹',
  PALADIN: '✨',
  
  // Créatures
  DRAGON: '🐉',
  GRIFFIN: '🦅',
  UNICORN: '🦄',
  PHOENIX: '🔥',
  
  // Interface
  TURN: '⭐',
  END_TURN: '⏭️',
  SAVE: '💾',
  LOAD: '📂',
  NEW_GAME: '🎮',
  SETTINGS: '⚙️',
  HELP: '❓',
  CLOSE: '✕'
} as const;

// ===== FONCTIONS D'ACCÈS UNIFIÉES =====

/**
 * Obtient l'asset d'un héros
 */
export function getHeroAsset(heroName: string): AssetInfo {
  const normalizedName = heroName.toUpperCase() as keyof typeof HEROES_ASSETS;
  return HEROES_ASSETS[normalizedName] || HEROES_ASSETS.ARTHUR;
}

/**
 * Obtient l'asset d'une créature
 */
export function getCreatureAsset(creatureName: string): AssetInfo {
  const normalizedName = creatureName.toUpperCase() as keyof typeof CREATURES_ASSETS;
  return CREATURES_ASSETS[normalizedName] || CREATURES_ASSETS.KNIGHT;
}

/**
 * Obtient l'asset d'un terrain
 */
export function getTerrainAsset(terrainType: string): AssetInfo {
  const normalizedName = terrainType.toUpperCase() as keyof typeof TERRAIN_ASSETS;
  return TERRAIN_ASSETS[normalizedName] || TERRAIN_ASSETS.GRASS;
}

/**
 * Obtient l'asset d'un bâtiment
 */
export function getBuildingAsset(buildingType: string): AssetInfo {
  const normalizedName = buildingType.toUpperCase() as keyof typeof BUILDINGS_ASSETS;
  return BUILDINGS_ASSETS[normalizedName] || BUILDINGS_ASSETS.CASTLE;
}

/**
 * Obtient l'asset d'un effet
 */
export function getEffectAsset(effectType: string): AssetInfo {
  const normalizedName = effectType.toUpperCase() as keyof typeof EFFECTS_ASSETS;
  return EFFECTS_ASSETS[normalizedName] || EFFECTS_ASSETS.FIRE;
}

/**
 * Charge un asset avec fallback automatique
 */
export async function loadAssetWithFallback(asset: AssetInfo): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    
    img.onload = () => resolve(img);
    img.onerror = () => {
      // Essayer le fallback
      if (asset.fallback && asset.fallback !== asset.path) {
        const fallbackImg = new Image();
        fallbackImg.onload = () => resolve(fallbackImg);
        fallbackImg.onerror = () => reject(new Error(`Failed to load asset: ${asset.path} and fallback: ${asset.fallback}`));
        fallbackImg.src = asset.fallback;
      } else {
        reject(new Error(`Failed to load asset: ${asset.path}`));
      }
    };
    
    img.src = asset.path;
  });
}

/**
 * Vérifie si un asset est animé
 */
export function isAnimatedAsset(asset: AssetInfo): boolean {
  return asset.type === 'gif' || asset.type === 'animated';
}

/**
 * Obtient tous les assets par catégorie
 */
export function getAssetsByCategory() {
  return {
    heroes: Object.keys(HEROES_ASSETS),
    creatures: Object.keys(CREATURES_ASSETS),
    terrain: Object.keys(TERRAIN_ASSETS),
    buildings: Object.keys(BUILDINGS_ASSETS),
    effects: Object.keys(EFFECTS_ASSETS)
  };
}

// ===== MAPPINGS RECOMMANDÉS =====

// Héros recommandés par scénario
export const HERO_BY_SCENARIO = {
  'conquest-classic': 'ARTHUR',
  'temporal-rift': 'MORGANA',
  'dragon-campaign': 'GARETH',
  'multiplayer-arena': 'TRISTAN',
  'mystic-quest': 'ELARA',
  'paladin-crusade': 'CEDRIC'
} as const;

// Créatures recommandées par terrain
export const CREATURE_BY_TERRAIN = {
  'grass': 'GRIFFIN',
  'forest': 'UNICORN',
  'mountain': 'DRAGON_RED',
  'water': 'PHOENIX',
  'desert': 'DRAGON_RED',
  'swamp': 'KNIGHT'
} as const;

// ===== TYPES EXPORTÉS =====
export type HeroName = keyof typeof HEROES_ASSETS;
export type CreatureName = keyof typeof CREATURES_ASSETS;
export type TerrainType = keyof typeof TERRAIN_ASSETS;
export type BuildingType = keyof typeof BUILDINGS_ASSETS;
export type EffectType = keyof typeof EFFECTS_ASSETS;
export type UIIcon = keyof typeof UI_ICONS; 