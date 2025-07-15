// 🎮 Helper pour gérer les assets de héros - VERSION MIGRÉE
// Désormais utilise le système d'assets unifié
// Migration depuis le système fragmenté vers unifiedAssets.ts

import { 
  assetService, 
  getHeroAsset, 
  type HeroName, 
  type AssetInfo 
} from '../services/assetService';

// ===== SYSTÈME MIGRÉ - UTILISE UNIFIED ASSETS =====

/**
 * Obtient l'asset d'un héros via le système unifié
 * @param heroName - Nom du héros
 * @returns Les données de l'asset ou défaut
 */
export function getHeroAssetMigrated(heroName: string): AssetInfo {
  return getHeroAsset(heroName);
}

/**
 * Obtient l'URL d'image d'un héros via le service unifié
 * @param heroName - Nom du héros
 * @returns URL de l'image
 */
export function getHeroImageUrl(heroName: string): string {
  return assetService.getAssetUrl('hero', heroName);
}

/**
 * Charge une image héros avec fallback automatique via le service unifié
 * @param heroName - Nom du héros
 * @returns Promise avec l'image chargée
 */
export async function loadHeroImageWithFallback(heroName: string): Promise<HTMLImageElement> {
  try {
    return await assetService.loadHeroAsset(heroName);
  } catch (error) {
    console.error(`❌ Failed to load hero image: ${heroName}`, error);
    // Fallback vers Arthur par défaut
    return await assetService.loadHeroAsset('ARTHUR');
  }
}

/**
 * Obtient le héros par défaut pour un scénario donné
 * @param scenarioId - ID du scénario
 * @returns Nom du héros par défaut
 */
export function getDefaultHeroForScenario(scenarioId: string): HeroName {
  return assetService.getRecommendedHeroForScenario(scenarioId);
}

/**
 * Vérifie si une image existe et peut être chargée
 * @param heroName - Nom du héros
 * @returns Promise qui resolve si l'image existe
 */
export async function checkHeroImageExists(heroName: string): Promise<boolean> {
  try {
    await assetService.loadHeroAsset(heroName);
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Précharge les assets pour un scénario spécifique
 * @param scenarioId - ID du scénario
 */
export async function preloadHeroAssetsForScenario(scenarioId: string): Promise<void> {
  await assetService.preloadScenarioAssets(scenarioId);
}

// ===== MAPPINGS DE COMPATIBILITÉ =====

// Mapping des héros par scénario (pour compatibilité)
export const DEFAULT_HEROES_BY_SCENARIO = {
  'conquest-classic': 'ARTHUR',
  'temporal-rift': 'MORGANA',
  'dragon-campaign': 'GARETH',
  'multiplayer-arena': 'TRISTAN'
} as const;

// Liste des héros disponibles
export const AVAILABLE_HEROES = [
  'ARTHUR', 'MORGANA', 'TRISTAN', 'ELARA', 'GARETH', 'LYANNA'
] as const;

// ===== FONCTIONS UTILITAIRES =====

/**
 * Obtient tous les héros disponibles
 * @returns Array des noms de héros
 */
export function getAvailableHeroes(): string[] {
  return assetService.getAvailableAssets().heroes;
}

/**
 * Obtient les stats du cache pour les héros
 * @returns Statistiques du cache
 */
export function getHeroCacheStats() {
  return assetService.getCacheStats();
}

/**
 * Vide le cache des héros (utile pour le développement)
 */
export function clearHeroCache(): void {
  assetService.clearCache();
}

// ===== EXPORTS POUR COMPATIBILITÉ =====

// Export du service pour utilisation avancée
export { assetService } from '../services/assetService';

// Export des types
export type { HeroName, AssetInfo } from '../services/assetService';

// ===== ANCIENNE INTERFACE (DÉPRÉCIÉE) =====
// Conservée pour compatibilité, mais redirige vers le nouveau système

/**
 * @deprecated Utilisez getHeroAssetMigrated() à la place
 */
export function getHeroSprite(heroName: string): any {
  console.warn('⚠️ getHeroSprite() is deprecated. Use getHeroAssetMigrated() instead.');
  return getHeroAssetMigrated(heroName);
}

/**
 * @deprecated Utilisez getHeroImageUrl() à la place
 */
export function getHeroFallbackImage(heroName: string): string {
  console.warn('⚠️ getHeroFallbackImage() is deprecated. Use getHeroImageUrl() instead.');
  return getHeroImageUrl(heroName);
}

/**
 * Obtient l'emoji de fallback pour un héros
 * @param heroName - Nom du héros
 * @returns Emoji du héros
 */
export function getHeroEmoji(heroName: string): string {
  const normalizedName = heroName.toUpperCase();
  
  switch (normalizedName) {
    case 'ARTHUR':
    case 'TRISTAN':
    case 'KNIGHT':
      return '🛡️';
    case 'MORGANA':
    case 'ELARA':
    case 'SERAPHINA':
    case 'MAGE':
    case 'WIZARD':
      return '🧙‍♀️';
    case 'WARRIOR':
    case 'GARETH':
      return '⚔️';
    case 'ARCHER':
    case 'LYANNA':
      return '🏹';
    case 'PALADIN':
    case 'CEDRIC':
      return '✨';
    case 'NECROMANCER':
    case 'VALEN':
      return '💀';
    default:
      return '🦸';
  }
}

/**
 * Obtient les informations d'un héros (nom, classe, description)
 * @param heroName - Nom du héros
 * @returns Informations du héros
 */
export function getHeroInfo(heroName: string): { name: string; class: string; description: string } {
  const normalizedName = heroName.toUpperCase();
  
  const heroInfos: Record<string, { name: string; class: string; description: string }> = {
    ARTHUR: {
      name: 'Arthur',
      class: 'Knight',
      description: 'Noble knight of the realm, skilled in combat and leadership'
    },
    MORGANA: {
      name: 'Morgana',
      class: 'Mage',
      description: 'Powerful sorceress with mastery over arcane arts'
    },
    WARRIOR: {
      name: 'Warrior',
      class: 'Fighter',
      description: 'Fierce warrior with exceptional combat prowess'
    },
    ARCHER: {
      name: 'Archer',
      class: 'Ranger',
      description: 'Expert marksman with deadly precision'
    },
    PALADIN: {
      name: 'Paladin',
      class: 'Holy Warrior',
      description: 'Divine warrior blessed with holy powers'
    },
    MAGE: {
      name: 'Mage',
      class: 'Wizard',
      description: 'Scholar of magic with vast knowledge of spells'
    },
    NECROMANCER: {
      name: 'Necromancer',
      class: 'Dark Mage',
      description: 'Master of death magic and undead minions'
    },
    TRISTAN: {
      name: 'Tristan',
      class: 'Knight',
      description: 'Brave knight from another time, skilled in temporal combat'
    },
    ELARA: {
      name: 'Elara',
      class: 'Time Mage',
      description: 'Mystical mage with power over time and space'
    },
    GARETH: {
      name: 'Gareth',
      class: 'Dragon Slayer',
      description: 'Legendary warrior specialized in fighting dragons'
    },
    LYANNA: {
      name: 'Lyanna',
      class: 'Elven Archer',
      description: 'Elven archer with supernatural accuracy'
    },
    CEDRIC: {
      name: 'Cedric',
      class: 'Paladin',
      description: 'Righteous paladin devoted to justice and honor'
    },
    SERAPHINA: {
      name: 'Seraphina',
      class: 'Celestial Mage',
      description: 'Angelic mage with divine magical powers'
    },
    VALEN: {
      name: 'Valen',
      class: 'Shadow Necromancer',
      description: 'Dark necromancer who commands shadows and death'
    }
  };
  
  return heroInfos[normalizedName] || {
    name: heroName,
    class: 'Unknown',
    description: 'Mysterious hero of unknown origins'
  };
}

/**
 * Crée le style CSS pour afficher un sprite (compatible avec l'ancien système)
 * @param spriteData - Données du sprite ou asset
 * @returns Objet de style CSS
 */
export function createSpriteStyle(spriteData: any): React.CSSProperties {
  // Si c'est un asset du nouveau système, utiliser l'URL directement
  if (spriteData && spriteData.path) {
    return {
      backgroundImage: `url(${spriteData.path})`,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      width: '64px',
      height: '64px'
    };
  }
  
  // Ancien système LPC (pour compatibilité)
  if (spriteData && spriteData.spritesheet && spriteData.sprite) {
    const { spritesheet, sprite } = spriteData;
    return {
      backgroundImage: `url(${spritesheet})`,
      backgroundPosition: `-${sprite.x}px -${sprite.y}px`,
      backgroundRepeat: 'no-repeat',
      width: `${sprite.width}px`,
      height: `${sprite.height}px`,
      backgroundSize: 'auto'
    };
  }
  
  // Fallback par défaut
  return {
    width: '64px',
    height: '64px',
    backgroundColor: '#333',
    backgroundImage: 'none'
  };
}

// ===== NOTES DE MIGRATION =====
/*
🔄 MIGRATION NOTES:

1. ANCIEN SYSTÈME (FRAGMENTÉ):
   - Multiples fichiers: gameAssets.ts, assets.ts, heroAssets.ts
   - Système LPC complexe avec spritesheets
   - URLs externes pour les effets
   - Duplications et réutilisations non optimales

2. NOUVEAU SYSTÈME (UNIFIÉ):
   - Fichier unique: unifiedAssets.ts
   - Service centralisé: assetService.ts
   - Cache intelligent
   - Fallbacks robustes
   - Ressources locales prioritaires

3. AVANTAGES:
   ✅ Consolidation des ressources fantasy
   ✅ Élimination des duplications
   ✅ Cache intelligent avec préchargement
   ✅ Fallbacks robustes
   ✅ Meilleure performance
   ✅ Maintenance simplifiée

4. MIGRATION:
   - Remplacer les imports de heroAssets.ts par assetService
   - Utiliser getHeroAsset() au lieu du système LPC
   - Précharger les assets avec preloadScenarioAssets()
   - Utiliser le cache intelligent

5. COMPATIBILITÉ:
   - Les anciennes fonctions sont conservées mais dépréciées
   - Migration progressive possible
   - Aucune rupture pour les composants existants
*/ 