// 🎨 Service d'avatars modernes pour héros - Dicebear API
// Génération d'avatars uniques et beaux pour chaque héros

export interface AvatarOptions {
  seed: string;
  style: 'adventurer' | 'avataaars' | 'big-ears' | 'big-smile' | 'croodles' | 'fun-emoji' | 'icons' | 'identicon' | 'initials' | 'lorelei' | 'micah' | 'miniavs' | 'open-peeps' | 'personas' | 'pixel-art' | 'shapes' | 'thumbs';
  size: number;
  backgroundColor?: string;
  format: 'svg' | 'png' | 'jpg';
}

class AvatarService {
  private readonly baseUrl = 'https://api.dicebear.com/7.x';
  private cache = new Map<string, string>();

  /**
   * Génère une URL d'avatar unique pour un héros
   */
  generateHeroAvatar(heroName: string, options: Partial<AvatarOptions> = {}): string {
    const config: AvatarOptions = {
      seed: heroName,
      style: 'adventurer', // Style fantasy parfait pour heroes
      size: 128,
      format: 'svg',
      ...options
    };

    const cacheKey = `${heroName}-${JSON.stringify(config)}`;
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }

    const params = new URLSearchParams({
      seed: config.seed,
      size: config.size.toString(),
      format: config.format,
      ...(config.backgroundColor && { backgroundColor: config.backgroundColor })
    });

    const url = `${this.baseUrl}/${config.style}/svg?${params}`;
    this.cache.set(cacheKey, url);
    
    return url;
  }

  /**
   * Styles spécialisés par type de héros
   */
  getHeroStyleByClass(heroClass: string): AvatarOptions['style'] {
    const styleMap: Record<string, AvatarOptions['style']> = {
      'warrior': 'adventurer',
      'knight': 'adventurer', 
      'mage': 'lorelei',
      'wizard': 'lorelei',
      'archer': 'micah',
      'paladin': 'personas',
      'necromancer': 'big-ears',
      'druid': 'open-peeps',
      'barbarian': 'big-smile',
      'sorceress': 'avataaars'
    };

    return styleMap[heroClass.toLowerCase()] || 'adventurer';
  }

  /**
   * Génère un avatar avec style automatique selon la classe
   */
  generateSmartHeroAvatar(heroName: string, heroClass: string = 'warrior'): string {
    const style = this.getHeroStyleByClass(heroClass);
    
    return this.generateHeroAvatar(heroName, {
      style,
      size: 128,
      backgroundColor: this.getClassColor(heroClass)
    });
  }

  /**
   * Couleurs de fond par classe de héros
   */
  private getClassColor(heroClass: string): string {
    const colorMap: Record<string, string> = {
      'warrior': 'FF6B6B',
      'knight': 'FFD93D', 
      'mage': '6BCF7F',
      'wizard': '4ECDC4',
      'archer': '45B7D1',
      'paladin': 'F9CA24',
      'necromancer': '6C5CE7',
      'druid': '26DE81',
      'barbarian': 'FD79A8',
      'sorceress': 'A29BFE'
    };

    return colorMap[heroClass.toLowerCase()] || 'FFD93D';
  }

  /**
   * Précharge les avatars des héros
   */
  async preloadHeroAvatars(heroes: Array<{name: string, class?: string}>): Promise<void> {
    const promises = heroes.map(hero => {
      const url = this.generateSmartHeroAvatar(hero.name, hero.class);
      return this.preloadImage(url);
    });

    await Promise.all(promises);
  }

  /**
   * Précharge une image
   */
  private preloadImage(url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = reject;
      img.src = url;
    });
  }

  /**
   * Fallback vers emoji si l'API échoue
   */
  getEmojiAvatar(heroName: string, heroClass: string = 'warrior'): string {
    const emojiMap: Record<string, string> = {
      'warrior': '⚔️',
      'knight': '🛡️',
      'mage': '🔮',
      'wizard': '🧙‍♂️',
      'archer': '🏹',
      'paladin': '⚡',
      'necromancer': '💀',
      'druid': '🌿',
      'barbarian': '🪓',
      'sorceress': '✨'
    };

    return emojiMap[heroClass.toLowerCase()] || '⚔️';
  }
}

export const avatarService = new AvatarService();
export default avatarService; 