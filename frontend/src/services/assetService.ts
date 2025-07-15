// 🎮 Service de Gestion d'Assets Unifié
// Service centralisé pour gérer tous les assets du jeu

import { 
  AssetInfo, 
  HEROES_ASSETS, 
  CREATURES_ASSETS, 
  TERRAIN_ASSETS, 
  EFFECTS_ASSETS, 
  UI_ICONS,
  getHeroAsset,
  getCreatureAsset,
  getTerrainAsset,
  getEffectAsset,
  loadAssetWithFallback,
  isAnimatedAsset,
  getAssetsByCategory,
  HERO_BY_SCENARIO,
  CREATURE_BY_TERRAIN,
  type HeroName,
  type CreatureName,
  type TerrainType,
  type EffectType
} from '../constants/unifiedAssets';

class AssetService {
  private imageCache: Map<string, HTMLImageElement> = new Map();
  private loadingPromises: Map<string, Promise<HTMLImageElement>> = new Map();

  /**
   * Charge un asset hero avec cache
   */
  async loadHeroAsset(heroName: string): Promise<HTMLImageElement> {
    const asset = getHeroAsset(heroName);
    return this.loadAssetWithCache(asset);
  }

  /**
   * Charge un asset créature avec cache
   */
  async loadCreatureAsset(creatureName: string): Promise<HTMLImageElement> {
    const asset = getCreatureAsset(creatureName);
    return this.loadAssetWithCache(asset);
  }

  /**
   * Charge un asset terrain avec cache
   */
  async loadTerrainAsset(terrainType: string): Promise<HTMLImageElement> {
    const asset = getTerrainAsset(terrainType);
    return this.loadAssetWithCache(asset);
  }

  /**
   * Charge un asset effet avec cache
   */
  async loadEffectAsset(effectType: string): Promise<HTMLImageElement> {
    const asset = getEffectAsset(effectType);
    return this.loadAssetWithCache(asset);
  }

  /**
   * Charge un asset avec mise en cache
   */
  private async loadAssetWithCache(asset: AssetInfo): Promise<HTMLImageElement> {
    const cacheKey = asset.path;
    
    // Vérifier le cache
    if (this.imageCache.has(cacheKey)) {
      return this.imageCache.get(cacheKey)!;
    }

    // Vérifier si déjà en cours de chargement
    if (this.loadingPromises.has(cacheKey)) {
      return this.loadingPromises.get(cacheKey)!;
    }

    // Charger l'image
    const loadPromise = loadAssetWithFallback(asset);
    this.loadingPromises.set(cacheKey, loadPromise);

    try {
      const image = await loadPromise;
      this.imageCache.set(cacheKey, image);
      console.log(`✅ Asset loaded and cached: ${cacheKey}`);
      return image;
    } catch (error) {
      console.error(`❌ Failed to load asset: ${cacheKey}`, error);
      throw error;
    } finally {
      this.loadingPromises.delete(cacheKey);
    }
  }

  /**
   * Précharge tous les assets essentiels
   */
  async preloadEssentialAssets(): Promise<void> {
    const essentialAssets = [
      // Héros principaux
      'ARTHUR', 'MORGANA', 'TRISTAN', 'ELARA',
      // Créatures communes
      'DRAGON_RED', 'GRIFFIN', 'KNIGHT',
      // Terrains de base
      'GRASS', 'FOREST', 'MOUNTAIN', 'WATER'
    ];

    console.log('🚀 Préchargement des assets essentiels...');
    
    const loadPromises = essentialAssets.map(async (assetName) => {
      try {
        if (assetName in HEROES_ASSETS) {
          await this.loadHeroAsset(assetName);
        } else if (assetName in CREATURES_ASSETS) {
          await this.loadCreatureAsset(assetName);
        } else if (assetName in TERRAIN_ASSETS) {
          await this.loadTerrainAsset(assetName);
        }
      } catch (error) {
        console.warn(`⚠️ Failed to preload ${assetName}:`, error);
      }
    });

    await Promise.all(loadPromises);
    console.log('✅ Préchargement terminé');
  }

  /**
   * Obtient l'URL d'un asset sans le charger
   */
  getAssetUrl(category: 'hero' | 'creature' | 'terrain' | 'effect', name: string): string {
    switch (category) {
      case 'hero':
        return getHeroAsset(name).path;
      case 'creature':
        return getCreatureAsset(name).path;
      case 'terrain':
        return getTerrainAsset(name).path;
      case 'effect':
        return getEffectAsset(name).path;
      default:
        return '';
    }
  }

  /**
   * Obtient l'icône UI appropriée
   */
  getUIIcon(iconName: string): string {
    const normalizedName = iconName.toUpperCase() as keyof typeof UI_ICONS;
    return UI_ICONS[normalizedName] || '❓';
  }

  /**
   * Vérifie si un asset est animé
   */
  isAssetAnimated(category: 'hero' | 'creature' | 'terrain' | 'effect', name: string): boolean {
    let asset: AssetInfo;
    switch (category) {
      case 'hero':
        asset = getHeroAsset(name);
        break;
      case 'creature':
        asset = getCreatureAsset(name);
        break;
      case 'terrain':
        asset = getTerrainAsset(name);
        break;
      case 'effect':
        asset = getEffectAsset(name);
        break;
      default:
        return false;
    }
    return isAnimatedAsset(asset);
  }

  /**
   * Obtient le héros recommandé pour un scénario
   */
  getRecommendedHeroForScenario(scenarioId: string): HeroName {
    const normalizedId = scenarioId.toLowerCase() as keyof typeof HERO_BY_SCENARIO;
    return HERO_BY_SCENARIO[normalizedId] || 'ARTHUR';
  }

  /**
   * Obtient la créature recommandée pour un type de terrain
   */
  getRecommendedCreatureForTerrain(terrainType: string): CreatureName {
    const normalizedType = terrainType.toLowerCase() as keyof typeof CREATURE_BY_TERRAIN;
    return CREATURE_BY_TERRAIN[normalizedType] || 'KNIGHT';
  }

  /**
   * Obtient les statistiques du cache
   */
  getCacheStats() {
    return {
      cached: this.imageCache.size,
      loading: this.loadingPromises.size,
      available: getAssetsByCategory()
    };
  }

  /**
   * Vide le cache (utile pour le développement)
   */
  clearCache(): void {
    this.imageCache.clear();
    this.loadingPromises.clear();
    console.log('🧹 Cache d\'assets vidé');
  }

  /**
   * Obtient tous les assets disponibles
   */
  getAvailableAssets() {
    return getAssetsByCategory();
  }

  /**
   * Précharge les assets pour un scénario spécifique
   */
  async preloadScenarioAssets(scenarioId: string): Promise<void> {
    const heroName = this.getRecommendedHeroForScenario(scenarioId);
    
    console.log(`🎮 Préchargement assets pour scénario: ${scenarioId}`);
    
    try {
      // Précharger le héros principal
      await this.loadHeroAsset(heroName);
      
      // Précharger quelques créatures communes
      await Promise.all([
        this.loadCreatureAsset('DRAGON_RED'),
        this.loadCreatureAsset('GRIFFIN'),
        this.loadCreatureAsset('KNIGHT')
      ]);
      
      // Précharger tous les terrains
      await Promise.all([
        this.loadTerrainAsset('GRASS'),
        this.loadTerrainAsset('FOREST'),
        this.loadTerrainAsset('MOUNTAIN'),
        this.loadTerrainAsset('WATER'),
        this.loadTerrainAsset('DESERT'),
        this.loadTerrainAsset('SWAMP')
      ]);
      
      console.log(`✅ Assets préchargés pour ${scenarioId}`);
    } catch (error) {
      console.error(`❌ Erreur lors du préchargement pour ${scenarioId}:`, error);
    }
  }
}

// Instance singleton
export const assetService = new AssetService();

// Hooks React pour utiliser le service
export function useAssetService() {
  return assetService;
}

// Fonctions utilitaires exportées
export {
  getHeroAsset,
  getCreatureAsset,
  getTerrainAsset,
  getEffectAsset,
  isAnimatedAsset,
  getAssetsByCategory,
  type HeroName,
  type CreatureName,
  type TerrainType,
  type EffectType,
  type AssetInfo
}; 