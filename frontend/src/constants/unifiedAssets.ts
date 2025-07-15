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

// ===== SYSTÈME DE HÉROS UNIFIÉ =====
export const HEROES_ASSETS = {
  // Héros principaux avec images PNG locales
  ARTHUR: {
    path: '/assets/heroes/warrior.png',
    type: 'png' as const,
    fallback: '/assets/heroes/paladin.png',
    metadata: { width: 64, height: 64 }
  },
  MORGANA: {
    path: '/assets/heroes/mage.png',
    type: 'png' as const,
    fallback: '/assets/heroes/warrior.png',
    metadata: { width: 64, height: 64 }
  },
  TRISTAN: {
    path: '/assets/heroes/archer.png',
    type: 'png' as const,
    fallback: '/assets/heroes/warrior.png',
    metadata: { width: 64, height: 64 }
  },
  ELARA: {
    path: '/assets/heroes/paladin.png',
    type: 'png' as const,
    fallback: '/assets/heroes/mage.png',
    metadata: { width: 64, height: 64 }
  },
  // Héros additionnels
  GARETH: {
    path: '/assets/heroes/warrior.png',
    type: 'png' as const,
    fallback: '/assets/heroes/paladin.png',
    metadata: { width: 64, height: 64 }
  },
  LYANNA: {
    path: '/assets/heroes/archer.png',
    type: 'png' as const,
    fallback: '/assets/heroes/mage.png',
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
  GEMS: '💎',
  CRYSTAL: '🔮',
  
  // Bâtiments
  CASTLE: '🏰',
  TOWER: '🗼',
  MARKET: '🏪',
  MINE: '⛏️',
  
  // Éléments décoratifs
  STAR: '⭐',
  CROWN: '👑',
  FLAG: '🏁',
  TORCH: '🔥'
} as const;

// ===== FONCTIONS UTILITAIRES =====

/**
 * Obtient les informations d'un asset héros avec fallback robuste
 */
export function getHeroAsset(heroName: string): AssetInfo {
  const normalizedName = heroName.toUpperCase() as keyof typeof HEROES_ASSETS;
  return HEROES_ASSETS[normalizedName] || HEROES_ASSETS.ARTHUR;
}

/**
 * Obtient les informations d'un asset créature avec fallback
 */
export function getCreatureAsset(creatureName: string): AssetInfo {
  const normalizedName = creatureName.toUpperCase() as keyof typeof CREATURES_ASSETS;
  return CREATURES_ASSETS[normalizedName] || CREATURES_ASSETS.KNIGHT;
}

/**
 * Obtient les informations d'un asset terrain
 */
export function getTerrainAsset(terrainType: string): AssetInfo {
  const normalizedType = terrainType.toUpperCase() as keyof typeof TERRAIN_ASSETS;
  return TERRAIN_ASSETS[normalizedType] || TERRAIN_ASSETS.GRASS;
}

/**
 * Obtient les informations d'un effet visuel
 */
export function getEffectAsset(effectType: string): AssetInfo {
  const normalizedType = effectType.toUpperCase() as keyof typeof EFFECTS_ASSETS;
  return EFFECTS_ASSETS[normalizedType] || {
    path: '',
    type: 'png' as const,
    fallback: '✨'
  };
}

/**
 * Charge une image avec fallback automatique
 */
export async function loadAssetWithFallback(asset: AssetInfo): Promise<HTMLImageElement> {
  const sources = [asset.path, asset.fallback].filter(Boolean) as string[];
  
  for (const src of sources) {
    try {
      const img = new Image();
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = reject;
        img.src = src;
      });
      return img;
    } catch (error) {
      console.warn(`Failed to load ${src}:`, error);
    }
  }
  
  // Fallback final : créer une image par défaut
  throw new Error(`Failed to load asset: ${asset.path}`);
}

/**
 * Vérifie si un asset est animé
 */
export function isAnimatedAsset(asset: AssetInfo): boolean {
  return asset.type === 'gif' || asset.type === 'animated';
}

/**
 * Obtient tous les assets disponibles par catégorie
 */
export function getAssetsByCategory() {
  return {
    heroes: Object.keys(HEROES_ASSETS),
    creatures: Object.keys(CREATURES_ASSETS),
    terrain: Object.keys(TERRAIN_ASSETS),
    effects: Object.keys(EFFECTS_ASSETS),
    ui: Object.keys(UI_ICONS)
  };
}

// ===== MAPPINGS POUR COMPATIBILITÉ =====

// Mapping des héros par scénario
export const HERO_BY_SCENARIO = {
  'conquest-classic': 'ARTHUR',
  'temporal-rift': 'MORGANA',
  'dragon-campaign': 'GARETH',
  'multiplayer-arena': 'TRISTAN'
} as const;

// Mapping des créatures par type de terrain
export const CREATURE_BY_TERRAIN = {
  mountain: 'DRAGON_RED',
  forest: 'UNICORN',
  swamp: 'DRAGON_BLUE',
  desert: 'PHOENIX',
  grass: 'GRIFFIN',
  water: 'KNIGHT'
} as const;

// Export des types pour TypeScript
export type HeroName = keyof typeof HEROES_ASSETS;
export type CreatureName = keyof typeof CREATURES_ASSETS;
export type TerrainType = keyof typeof TERRAIN_ASSETS;
export type EffectType = keyof typeof EFFECTS_ASSETS;
export type UIIcon = keyof typeof UI_ICONS; 