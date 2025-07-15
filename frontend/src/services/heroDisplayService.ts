// 🎮 Service d'Affichage des Héros - VERSION 100% OFFLINE
// Utilise UNIQUEMENT les images locales, aucune API externe !

export interface HeroDisplayRequest {
  name: string;
  heroClass?: string;
  level?: number;
  displayType: 'portrait' | 'sprite' | 'icon';
  size: 'small' | 'medium' | 'large';
}

export interface HeroDisplayResult {
  url: string;
  fallback: string;
  type: 'local' | 'emoji';
  metadata?: {
    width: number;
    height: number;
    animated?: boolean;
  };
}

class HeroDisplayService {
  // ===== IMAGES LOCALES DISPONIBLES =====
  private readonly LOCAL_HERO_IMAGES = {
    // Images SVG locales dans /public/assets/heroes/ (100% offline!)
    'ARTHUR': '/assets/heroes/arthur.svg',
    'MORGANA': '/assets/heroes/morgana.svg', 
    'TRISTAN': '/assets/heroes/tristan.svg',
    'ELARA': '/assets/heroes/elara.svg',
    'GARETH': '/assets/heroes/gareth.svg',
    'LYANNA': '/assets/heroes/lyanna.svg',
    'CEDRIC': '/assets/heroes/cedric.svg',
    'SERAPHINA': '/assets/heroes/seraphina.svg',
    'VALEN': '/assets/heroes/valen.svg',
    
    // Classes génériques (utilisent les images PNG existantes en fallback)
    'WARRIOR': '/assets/heroes/warrior.png',
    'MAGE': '/assets/heroes/mage.png',
    'ARCHER': '/assets/heroes/archer.png',
    'PALADIN': '/assets/heroes/paladin.png',
    'KNIGHT': '/assets/heroes/warrior.png',
    'WIZARD': '/assets/heroes/mage.png',
    'RANGER': '/assets/heroes/archer.png',
    'HOLY_WARRIOR': '/assets/heroes/paladin.png',
    'FIGHTER': '/assets/heroes/warrior.png',
    'SORCERER': '/assets/heroes/mage.png',
    'DRAGON_SLAYER': '/assets/heroes/warrior.png',
    'ELVEN_ARCHER': '/assets/heroes/archer.png',
    'TIME_MAGE': '/assets/heroes/mage.png',
    'DARK_MAGE': '/assets/heroes/mage.png'
  };

  // ===== EMOJIS DE FALLBACK =====
  private readonly HERO_EMOJIS = {
    'ARTHUR': '🛡️',
    'MORGANA': '🧙‍♀️',
    'TRISTAN': '⚔️',
    'ELARA': '✨',
    'GARETH': '🐉',
    'LYANNA': '🏹',
    'CEDRIC': '✨',
    'SERAPHINA': '🔮',
    'VALEN': '💀',
    
    // Classes
    'WARRIOR': '⚔️',
    'MAGE': '🧙‍♀️',
    'ARCHER': '🏹',
    'PALADIN': '✨',
    'KNIGHT': '🛡️',
    'WIZARD': '🔮',
    'RANGER': '🏹',
    'HOLY_WARRIOR': '✨',
    'FIGHTER': '⚔️',
    'SORCERER': '🔮',
    'DRAGON_SLAYER': '🐉',
    'ELVEN_ARCHER': '🏹',
    'TIME_MAGE': '⏰',
    'DARK_MAGE': '💀'
  };

  // ===== MAPPING NOM -> CLASSE =====
  private readonly HERO_CLASS_MAPPING = {
    'ARTHUR': 'WARRIOR',
    'MORGANA': 'MAGE',
    'TRISTAN': 'ARCHER', 
    'ELARA': 'PALADIN',
    'GARETH': 'DRAGON_SLAYER',
    'LYANNA': 'ELVEN_ARCHER',
    'CEDRIC': 'PALADIN',
    'SERAPHINA': 'MAGE',
    'VALEN': 'DARK_MAGE'
  };

  /**
   * Obtient l'affichage d'un héros (100% offline)
   */
  getHeroDisplay(request: HeroDisplayRequest): HeroDisplayResult {
    const normalizedName = request.name.toUpperCase();
    const heroClass = request.heroClass?.toUpperCase() || this.HERO_CLASS_MAPPING[normalizedName] || 'WARRIOR';
    
    // Essayer d'abord avec le nom exact
    let imagePath = this.LOCAL_HERO_IMAGES[normalizedName];
    
    // Si pas trouvé, essayer avec la classe
    if (!imagePath) {
      imagePath = this.LOCAL_HERO_IMAGES[heroClass];
    }
    
    // Si toujours pas trouvé, utiliser la classe par défaut
    if (!imagePath) {
      imagePath = this.LOCAL_HERO_IMAGES['WARRIOR'];
    }

    const emojiFallback = this.HERO_EMOJIS[normalizedName] || this.HERO_EMOJIS[heroClass] || '🦸';

    return {
      url: imagePath,
      fallback: emojiFallback,
      type: 'local',
      metadata: {
        width: 64,
        height: 64,
        animated: false
      }
    };
  }

  /**
   * Obtient un portrait de héros (grande taille)
   */
  getHeroPortrait(heroName: string, heroClass?: string): HeroDisplayResult {
    return this.getHeroDisplay({
      name: heroName,
      heroClass,
      level: 1,
      displayType: 'portrait',
      size: 'large'
    });
  }

  /**
   * Obtient un sprite de héros (taille moyenne)
   */
  getHeroSprite(heroName: string, heroClass?: string): HeroDisplayResult {
    return this.getHeroDisplay({
      name: heroName,
      heroClass,
      level: 1,
      displayType: 'sprite',
      size: 'medium'
    });
  }

  /**
   * Obtient une icône de héros (petite taille)
   */
  getHeroIcon(heroName: string, heroClass?: string): HeroDisplayResult {
    return this.getHeroDisplay({
      name: heroName,
      heroClass,
      level: 1,
      displayType: 'icon',
      size: 'small'
    });
  }

  /**
   * Vérifie si une image locale existe
   */
  async checkLocalImageExists(imagePath: string): Promise<boolean> {
    try {
      const response = await fetch(imagePath, { method: 'HEAD' });
      return response.ok;
    } catch {
      return false;
    }
  }

  /**
   * Obtient tous les héros disponibles (noms locaux)
   */
  getAvailableHeroes(): string[] {
    return Object.keys(this.LOCAL_HERO_IMAGES).filter(key => 
      !key.includes('_') || key === 'DRAGON_SLAYER' || key === 'HOLY_WARRIOR' || key === 'TIME_MAGE' || key === 'DARK_MAGE' || key === 'ELVEN_ARCHER'
    );
  }

  /**
   * Obtient les informations d'un héros
   */
  getHeroInfo(heroName: string): { name: string; class: string; description: string } {
    const normalizedName = heroName.toUpperCase();
    const heroClass = this.HERO_CLASS_MAPPING[normalizedName] || 'WARRIOR';
    
    const descriptions = {
      'ARTHUR': 'Noble knight of the realm, skilled in combat and leadership',
      'MORGANA': 'Powerful sorceress with mastery over arcane arts',
      'TRISTAN': 'Brave knight from another time, skilled in temporal combat',
      'ELARA': 'Mystical mage with power over time and space',
      'GARETH': 'Legendary warrior specialized in fighting dragons',
      'LYANNA': 'Elven archer with supernatural accuracy',
      'CEDRIC': 'Righteous paladin devoted to justice and honor',
      'SERAPHINA': 'Ancient sorceress with forbidden knowledge',
      'VALEN': 'Dark mage who commands the forces of death'
    };

    return {
      name: heroName,
      class: heroClass,
      description: descriptions[normalizedName] || 'A brave hero ready for adventure'
    };
  }
}

// Instance singleton
const heroDisplayService = new HeroDisplayService();
export default heroDisplayService; 