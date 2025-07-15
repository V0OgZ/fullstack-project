// 🎮 Service unifié pour l'affichage des héros - Portraits vs Sprites Map
// Coordonne tous les services existants pour séparer les deux usages

import { Position } from '../types/game';
import avatarService from './avatarService';
import localAvatarService, { LocalAvatarConfig } from './localAvatarService';
import heroAnimationService from './heroAnimationService';
import pathDotsService from './pathDotsService';

export type HeroDisplayType = 'portrait' | 'map-sprite';

export interface HeroDisplayConfig {
  name: string;
  heroClass: string;
  level: number;
  position?: Position;
  displayType: HeroDisplayType;
  size?: 'small' | 'medium' | 'large';
  animated?: boolean;
}

export interface HeroPortraitData {
  url: string;
  localSvg: string;
  fallbackEmoji: string;
  displayName: string;
  heroClass: string;
}

export interface HeroMapSpriteData {
  spriteUrl: string;
  animatedSvg: string;
  position: Position;
  size: number;
  isMoving: boolean;
  pathDots?: Position[];
}

class HeroDisplayService {
  private portraitCache = new Map<string, HeroPortraitData>();
  private spriteCache = new Map<string, HeroMapSpriteData>();

  /**
   * 🖼️ PORTRAITS - Pour les panneaux UI (détaillés)
   */
  getHeroPortrait(config: HeroDisplayConfig): HeroPortraitData {
    const cacheKey = `portrait-${config.name}-${config.heroClass}`;
    
    if (this.portraitCache.has(cacheKey)) {
      return this.portraitCache.get(cacheKey)!;
    }

    const size = this.getPortraitSize(config.size || 'medium');
    
    // Générer avec le service externe (Dicebear)
    const externalUrl = avatarService.generateHeroAvatar(config.name, {
      style: this.getStyleByClass(config.heroClass),
      size: size,
      format: 'svg'
    });

    // Générer avec le service local (SVG)
    const localConfig: LocalAvatarConfig = {
      name: config.name,
      heroClass: config.heroClass,
      size: size,
      style: 'fantasy'
    };
    const localSvg = localAvatarService.generateLocalAvatar(localConfig);

    const portraitData: HeroPortraitData = {
      url: externalUrl,
      localSvg: localSvg,
      fallbackEmoji: this.getHeroEmoji(config.heroClass),
      displayName: config.name,
      heroClass: config.heroClass
    };

    this.portraitCache.set(cacheKey, portraitData);
    return portraitData;
  }

  /**
   * 🐎 MAP SPRITES - Pour les héros sur la carte (petits, animés)
   */
  getHeroMapSprite(config: HeroDisplayConfig): HeroMapSpriteData {
    if (!config.position) {
      throw new Error('Position is required for map sprites');
    }

    const cacheKey = `sprite-${config.name}-${config.position.x}-${config.position.y}`;
    
    if (this.spriteCache.has(cacheKey)) {
      const cached = this.spriteCache.get(cacheKey)!;
      // Mettre à jour la position si elle a changé
      cached.position = config.position;
      return cached;
    }

    const size = this.getMapSpriteSize(config.size || 'small');
    
    // Sprite plus petit pour la carte
    const spriteUrl = avatarService.generateHeroAvatar(config.name, {
      style: 'pixel-art', // Style pixelisé pour la carte
      size: size,
      format: 'svg'
    });

    // Version animée locale
    const animatedConfig: LocalAvatarConfig = {
      name: config.name,
      heroClass: config.heroClass,
      size: size,
      style: 'pixel' // Style pixel pour la carte
    };
    const animatedSvg = localAvatarService.generateLocalAvatar(animatedConfig);

    const spriteData: HeroMapSpriteData = {
      spriteUrl: spriteUrl,
      animatedSvg: animatedSvg,
      position: config.position,
      size: size,
      isMoving: false,
      pathDots: []
    };

    this.spriteCache.set(cacheKey, spriteData);
    return spriteData;
  }

  /**
   * 🎬 ANIMATION - Déplacer un héros sur la carte
   */
  animateHeroMovement(heroName: string, fromPosition: Position, toPosition: Position): Promise<void> {
    return new Promise((resolve) => {
      // Calculer le chemin avec le service d'animation
      // const path = heroAnimationService.calculatePath(fromPosition, toPosition);
      
      // Créer les points de chemin avec pathDotsService
      const pathDots = pathDotsService.createHeroes3Path(heroName, fromPosition, toPosition);
      
      // Mettre à jour le sprite avec animation
      const spriteKey = `sprite-${heroName}-${toPosition.x}-${toPosition.y}`;
      const spriteData = this.spriteCache.get(spriteKey);
      
      if (spriteData) {
        spriteData.isMoving = true;
        spriteData.pathDots = pathDots.map((dot: any) => dot.position);
        spriteData.position = toPosition;
        
        // Simuler l'animation (durée basée sur la distance)
        const distance = Math.sqrt(
          Math.pow(toPosition.x - fromPosition.x, 2) + 
          Math.pow(toPosition.y - fromPosition.y, 2)
        );
        const duration = Math.max(distance * 200, 500); // 200ms par case
        
        setTimeout(() => {
          spriteData.isMoving = false;
          spriteData.pathDots = [];
          resolve();
        }, duration);
      } else {
        resolve();
      }
    });
  }

  /**
   * 🎨 STYLES - Mapping des classes de héros vers styles d'avatar
   */
  private getStyleByClass(heroClass: string): any {
    const classMap: Record<string, string> = {
      'Knight': 'adventurer',
      'Mage': 'lorelei',
      'Wizard': 'lorelei',
      'Warrior': 'adventurer',
      'Archer': 'micah',
      'Paladin': 'adventurer',
      'Necromancer': 'personas',
      'Barbarian': 'big-ears',
      'Sorceress': 'lorelei'
    };
    
    return classMap[heroClass] || 'adventurer';
  }

  /**
   * 📏 TAILLES - Différentes tailles pour portraits vs sprites
   */
  private getPortraitSize(size: string): number {
    const sizeMap: Record<string, number> = {
      'small': 64,
      'medium': 128,
      'large': 256
    };
    return sizeMap[size] || 128;
  }

  private getMapSpriteSize(size: string): number {
    const sizeMap: Record<string, number> = {
      'small': 24,
      'medium': 32,
      'large': 48
    };
    return sizeMap[size] || 32;
  }

  /**
   * 😀 EMOJIS - Fallback pour chaque classe
   */
  private getHeroEmoji(heroClass: string): string {
    const emojiMap: Record<string, string> = {
      'Knight': '🛡️',
      'Mage': '🧙‍♀️',
      'Wizard': '🧙‍♂️',
      'Warrior': '⚔️',
      'Archer': '🏹',
      'Paladin': '✨',
      'Necromancer': '💀',
      'Barbarian': '🪓',
      'Sorceress': '🔮'
    };
    
    return emojiMap[heroClass] || '🦸';
  }

  /**
   * 🧹 CACHE - Gestion du cache
   */
  clearCache(): void {
    this.portraitCache.clear();
    this.spriteCache.clear();
  }

  getCacheStats(): { portraits: number; sprites: number } {
    return {
      portraits: this.portraitCache.size,
      sprites: this.spriteCache.size
    };
  }

  /**
   * 🔄 PRELOAD - Précharger les assets pour un scénario
   */
  async preloadHeroesForScenario(heroes: Array<{ name: string; heroClass: string; position: Position }>): Promise<void> {
    const promises = heroes.map(hero => {
      // Précharger portrait
      const portraitPromise = this.getHeroPortrait({
        name: hero.name,
        heroClass: hero.heroClass,
        level: 1,
        displayType: 'portrait'
      });

      // Précharger sprite
      const spritePromise = this.getHeroMapSprite({
        name: hero.name,
        heroClass: hero.heroClass,
        level: 1,
        position: hero.position,
        displayType: 'map-sprite'
      });

      return Promise.all([portraitPromise, spritePromise]);
    });

    await Promise.all(promises);
    console.log(`✅ Preloaded ${heroes.length} heroes for scenario`);
  }
}

// Export singleton
const heroDisplayService = new HeroDisplayService();
export default heroDisplayService; 