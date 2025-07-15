// 🎮 Service unifié pour les sprites de héros, montures et drapeaux
// Système complet inspiré de Heroes of Might and Magic 3

import { 
  HeroPortrait, 
  HeroSprite, 
  MountSprite, 
  FlagSprite, 
  PlayerColor, 
  MountType,
  Hero 
} from '../types/game';
import { getPlayerColorConfig } from '../constants/playerColors';

// ===== PORTRAITS DE HÉROS =====
export const HERO_PORTRAITS: Record<string, HeroPortrait> = {
  // Héros principaux avec portraits SVG
  ARTHUR: {
    id: 'arthur',
    name: 'Arthur',
    class: 'Knight',
    path: '/assets/heroes/arthur.svg',
    fallback: '/assets/heroes/warrior.png',
    type: 'svg',
    metadata: { width: 64, height: 64, animated: false }
  },
  MORGANA: {
    id: 'morgana',
    name: 'Morgana',
    class: 'Mage',
    path: '/assets/heroes/morgana.svg',
    fallback: '/assets/heroes/mage.png',
    type: 'svg',
    metadata: { width: 64, height: 64, animated: false }
  },
  TRISTAN: {
    id: 'tristan',
    name: 'Tristan',
    class: 'Archer',
    path: '/assets/heroes/tristan.svg',
    fallback: '/assets/heroes/archer.png',
    type: 'svg',
    metadata: { width: 64, height: 64, animated: false }
  },
  ELARA: {
    id: 'elara',
    name: 'Elara',
    class: 'Paladin',
    path: '/assets/heroes/elara.svg',
    fallback: '/assets/heroes/paladin.png',
    type: 'svg',
    metadata: { width: 64, height: 64, animated: false }
  },
  // Classes génériques avec images PNG
  WARRIOR: {
    id: 'warrior',
    name: 'Warrior',
    class: 'Warrior',
    path: '/assets/heroes/warrior.png',
    fallback: '/assets/heroes/paladin.png',
    type: 'png',
    metadata: { width: 64, height: 64, animated: false }
  },
  MAGE: {
    id: 'mage',
    name: 'Mage',
    class: 'Mage',
    path: '/assets/heroes/mage.png',
    fallback: '/assets/heroes/warrior.png',
    type: 'png',
    metadata: { width: 64, height: 64, animated: false }
  },
  ARCHER: {
    id: 'archer',
    name: 'Archer',
    class: 'Archer',
    path: '/assets/heroes/archer.png',
    fallback: '/assets/heroes/warrior.png',
    type: 'png',
    metadata: { width: 64, height: 64, animated: false }
  },
  PALADIN: {
    id: 'paladin',
    name: 'Paladin',
    class: 'Paladin',
    path: '/assets/heroes/paladin.png',
    fallback: '/assets/heroes/mage.png',
    type: 'png',
    metadata: { width: 64, height: 64, animated: false }
  }
};

// ===== SPRITES DE HÉROS POUR LA CARTE =====
export const HERO_SPRITES: Record<string, HeroSprite> = {
  // Héros principaux - sprites simplifiés pour la carte
  ARTHUR: {
    id: 'arthur_sprite',
    name: 'Arthur',
    class: 'Knight',
    path: '/assets/heroes/arthur.svg', // Réutilise le portrait pour l'instant
    fallback: '/assets/heroes/warrior.png',
    type: 'svg',
    metadata: { width: 32, height: 32, animated: false }
  },
  MORGANA: {
    id: 'morgana_sprite',
    name: 'Morgana',
    class: 'Mage',
    path: '/assets/heroes/morgana.svg',
    fallback: '/assets/heroes/mage.png',
    type: 'svg',
    metadata: { width: 32, height: 32, animated: false }
  },
  TRISTAN: {
    id: 'tristan_sprite',
    name: 'Tristan',
    class: 'Archer',
    path: '/assets/heroes/tristan.svg',
    fallback: '/assets/heroes/archer.png',
    type: 'svg',
    metadata: { width: 32, height: 32, animated: false }
  },
  ELARA: {
    id: 'elara_sprite',
    name: 'Elara',
    class: 'Paladin',
    path: '/assets/heroes/elara.svg',
    fallback: '/assets/heroes/paladin.png',
    type: 'svg',
    metadata: { width: 32, height: 32, animated: false }
  },
  // Classes génériques
  WARRIOR: {
    id: 'warrior_sprite',
    name: 'Warrior',
    class: 'Warrior',
    path: '/assets/heroes/warrior.png',
    fallback: '/assets/heroes/paladin.png',
    type: 'png',
    metadata: { width: 32, height: 32, animated: false }
  },
  MAGE: {
    id: 'mage_sprite',
    name: 'Mage',
    class: 'Mage',
    path: '/assets/heroes/mage.png',
    fallback: '/assets/heroes/warrior.png',
    type: 'png',
    metadata: { width: 32, height: 32, animated: false }
  },
  ARCHER: {
    id: 'archer_sprite',
    name: 'Archer',
    class: 'Archer',
    path: '/assets/heroes/archer.png',
    fallback: '/assets/heroes/warrior.png',
    type: 'png',
    metadata: { width: 32, height: 32, animated: false }
  },
  PALADIN: {
    id: 'paladin_sprite',
    name: 'Paladin',
    class: 'Paladin',
    path: '/assets/heroes/paladin.png',
    fallback: '/assets/heroes/mage.png',
    type: 'png',
    metadata: { width: 32, height: 32, animated: false }
  }
};

// ===== SPRITES DE MONTURES =====
export const MOUNT_SPRITES: Record<MountType, MountSprite> = {
  horse: {
    type: 'horse',
    path: '/assets/mounts/horse.svg',
    fallback: '🐎',
    metadata: { width: 32, height: 24, animated: false }
  },
  pegasus: {
    type: 'pegasus',
    path: '/assets/mounts/pegasus.svg',
    fallback: '🦄',
    metadata: { width: 32, height: 24, animated: false }
  },
  griffin: {
    type: 'griffin',
    path: '/assets/mounts/griffin.svg',
    fallback: '🦅',
    metadata: { width: 32, height: 24, animated: false }
  },
  dragon: {
    type: 'dragon',
    path: '/assets/mounts/dragon.svg',
    fallback: '🐉',
    metadata: { width: 32, height: 24, animated: false }
  },
  unicorn: {
    type: 'unicorn',
    path: '/assets/mounts/unicorn.svg',
    fallback: '🦄',
    metadata: { width: 32, height: 24, animated: false }
  },
  none: {
    type: 'none',
    path: '',
    fallback: '',
    metadata: { width: 0, height: 0, animated: false }
  }
};

// ===== SPRITES DE DRAPEAUX =====
export const FLAG_SPRITES: Record<PlayerColor, FlagSprite> = {
  red: {
    color: 'red',
    path: '/assets/flags/red.svg',
    fallback: '🔴',
    metadata: { width: 16, height: 12 }
  },
  blue: {
    color: 'blue',
    path: '/assets/flags/blue.svg',
    fallback: '🔵',
    metadata: { width: 16, height: 12 }
  },
  green: {
    color: 'green',
    path: '/assets/flags/green.svg',
    fallback: '🟢',
    metadata: { width: 16, height: 12 }
  },
  yellow: {
    color: 'yellow',
    path: '/assets/flags/yellow.svg',
    fallback: '🟡',
    metadata: { width: 16, height: 12 }
  },
  purple: {
    color: 'purple',
    path: '/assets/flags/purple.svg',
    fallback: '🟣',
    metadata: { width: 16, height: 12 }
  },
  orange: {
    color: 'orange',
    path: '/assets/flags/orange.svg',
    fallback: '🟠',
    metadata: { width: 16, height: 12 }
  },
  cyan: {
    color: 'cyan',
    path: '/assets/flags/cyan.svg',
    fallback: '🔷',
    metadata: { width: 16, height: 12 }
  },
  pink: {
    color: 'pink',
    path: '/assets/flags/pink.svg',
    fallback: '💗',
    metadata: { width: 16, height: 12 }
  }
};

class HeroSpriteService {
  private imageCache: Map<string, HTMLImageElement> = new Map();
  private loadingPromises: Map<string, Promise<HTMLImageElement>> = new Map();

  /**
   * Obtient le portrait d'un héros
   */
  getHeroPortrait(heroName: string): HeroPortrait {
    const normalizedName = heroName.toUpperCase();
    return HERO_PORTRAITS[normalizedName] || HERO_PORTRAITS.WARRIOR;
  }

  /**
   * Obtient le sprite d'un héros pour la carte
   */
  getHeroSprite(heroName: string): HeroSprite {
    const normalizedName = heroName.toUpperCase();
    return HERO_SPRITES[normalizedName] || HERO_SPRITES.WARRIOR;
  }

  /**
   * Obtient le sprite d'une monture
   */
  getMountSprite(mountType: MountType): MountSprite {
    return MOUNT_SPRITES[mountType] || MOUNT_SPRITES.none;
  }

  /**
   * Obtient le sprite d'un drapeau
   */
  getFlagSprite(playerColor: PlayerColor): FlagSprite {
    return FLAG_SPRITES[playerColor] || FLAG_SPRITES.blue;
  }

  /**
   * Charge une image avec cache
   */
  async loadImage(path: string): Promise<HTMLImageElement> {
    if (!path) {
      throw new Error('Path is empty');
    }

    // Vérifier le cache
    if (this.imageCache.has(path)) {
      return this.imageCache.get(path)!;
    }

    // Vérifier si déjà en cours de chargement
    if (this.loadingPromises.has(path)) {
      return this.loadingPromises.get(path)!;
    }

    // Charger l'image
    const loadPromise = new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error(`Failed to load image: ${path}`));
      img.src = path;
    });

    this.loadingPromises.set(path, loadPromise);

    try {
      const image = await loadPromise;
      this.imageCache.set(path, image);
      console.log(`✅ Hero sprite loaded and cached: ${path}`);
      return image;
    } catch (error) {
      console.error(`❌ Failed to load hero sprite: ${path}`, error);
      throw error;
    } finally {
      this.loadingPromises.delete(path);
    }
  }

  /**
   * Charge le portrait d'un héros
   */
  async loadHeroPortrait(heroName: string): Promise<HTMLImageElement> {
    const portrait = this.getHeroPortrait(heroName);
    return this.loadImage(portrait.path);
  }

  /**
   * Charge le sprite d'un héros pour la carte
   */
  async loadHeroSprite(heroName: string): Promise<HTMLImageElement> {
    const sprite = this.getHeroSprite(heroName);
    return this.loadImage(sprite.path);
  }

  /**
   * Charge le sprite d'une monture
   */
  async loadMountSprite(mountType: MountType): Promise<HTMLImageElement | null> {
    if (mountType === 'none') return null;
    const sprite = this.getMountSprite(mountType);
    return this.loadImage(sprite.path);
  }

  /**
   * Charge le sprite d'un drapeau
   */
  async loadFlagSprite(playerColor: PlayerColor): Promise<HTMLImageElement> {
    const sprite = this.getFlagSprite(playerColor);
    return this.loadImage(sprite.path);
  }

  /**
   * Obtient les informations complètes d'un héros pour le rendu
   */
  getHeroRenderInfo(hero: Hero) {
    const portrait = this.getHeroPortrait(hero.name);
    const sprite = this.getHeroSprite(hero.name);
    const mount = this.getMountSprite(hero.mountType || 'horse');
    const flag = this.getFlagSprite(hero.playerColor || 'blue');
    const colorConfig = getPlayerColorConfig(hero.playerColor || 'blue');

    return {
      portrait,
      sprite,
      mount,
      flag,
      colorConfig,
      hero
    };
  }

  /**
   * Vide le cache (utile pour le développement)
   */
  clearCache(): void {
    this.imageCache.clear();
    this.loadingPromises.clear();
    console.log('🗑️ Hero sprite cache cleared');
  }

  /**
   * Obtient les statistiques du cache
   */
  getCacheStats() {
    return {
      cached: this.imageCache.size,
      loading: this.loadingPromises.size,
      total: this.imageCache.size + this.loadingPromises.size
    };
  }
}

// Instance singleton
export const heroSpriteService = new HeroSpriteService();

// Export par défaut pour compatibilité
export default heroSpriteService;