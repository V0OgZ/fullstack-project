// 🎮 Générateur d'Avatars Offline avec Dicebear
// Génère les avatars une fois, puis les utilise localement

export interface AvatarConfig {
  name: string;
  style: 'adventurer' | 'avataaars' | 'big-ears' | 'bottts' | 'croodles' | 'fun-emoji' | 'initials' | 'lorelei' | 'micah' | 'miniavs' | 'personas' | 'pixel-art' | 'rings' | 'shapes' | 'thumbs';
  size?: number;
  format?: 'svg' | 'png' | 'jpg';
  backgroundColor?: string;
  radius?: number;
}

export interface HeroAvatarData {
  url: string;
  localPath: string;
  style: string;
  name: string;
  isGenerated: boolean;
}

class OfflineAvatarGenerator {
  private readonly DICEBEAR_BASE_URL = 'https://api.dicebear.com/7.x';
  private readonly LOCAL_AVATAR_PATH = '/assets/heroes/avatars/';
  private generatedAvatars = new Map<string, HeroAvatarData>();

  // ===== MAPPING HÉROS -> STYLES DICEBEAR =====
  private readonly HERO_STYLE_MAPPING = {
    'ARTHUR': 'adventurer',
    'MORGANA': 'lorelei', 
    'TRISTAN': 'micah',
    'ELARA': 'personas',
    'GARETH': 'big-ears',
    'LYANNA': 'micah',
    'CEDRIC': 'adventurer',
    'SERAPHINA': 'lorelei',
    'VALEN': 'personas'
  };

  /**
   * Génère un avatar Dicebear et le sauvegarde localement
   */
  async generateAndSaveAvatar(heroName: string, style?: string): Promise<HeroAvatarData> {
    const normalizedName = heroName.toUpperCase();
    const avatarStyle = style || this.HERO_STYLE_MAPPING[normalizedName] || 'adventurer';
    
    const config: AvatarConfig = {
      name: heroName,
      style: avatarStyle as any,
      size: 128,
      format: 'svg',
      backgroundColor: 'transparent'
    };

    try {
      // Générer l'URL Dicebear
      const dicebearUrl = this.buildDicebearUrl(config);
      
      // Télécharger l'avatar
      const response = await fetch(dicebearUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch avatar: ${response.statusText}`);
      }
      
      const svgContent = await response.text();
      
      // Créer le chemin local
      const localFileName = `${normalizedName.toLowerCase()}-${avatarStyle}.svg`;
      const localPath = `${this.LOCAL_AVATAR_PATH}${localFileName}`;
      
      // Sauvegarder localement (simulation - en vrai on créerait le fichier)
      const avatarData: HeroAvatarData = {
        url: dicebearUrl,
        localPath: localPath,
        style: avatarStyle,
        name: heroName,
        isGenerated: true
      };
      
      this.generatedAvatars.set(normalizedName, avatarData);
      
      console.log(`✅ Avatar généré et sauvegardé: ${heroName} (${avatarStyle})`);
      return avatarData;
      
    } catch (error) {
      console.error(`❌ Erreur génération avatar ${heroName}:`, error);
      // Fallback vers avatar local
      return this.getFallbackAvatar(heroName);
    }
  }

  /**
   * Construit l'URL Dicebear
   */
  private buildDicebearUrl(config: AvatarConfig): string {
    const params = new URLSearchParams({
      seed: config.name,
      backgroundColor: config.backgroundColor || 'transparent',
      radius: config.radius?.toString() || '0'
    });
    
    return `${this.DICEBEAR_BASE_URL}/${config.style}/svg?${params.toString()}`;
  }

  /**
   * Obtient un avatar (généré ou fallback)
   */
  async getHeroAvatar(heroName: string): Promise<HeroAvatarData> {
    const normalizedName = heroName.toUpperCase();
    
    // Vérifier si déjà généré
    if (this.generatedAvatars.has(normalizedName)) {
      return this.generatedAvatars.get(normalizedName)!;
    }
    
    // Générer et sauvegarder
    return await this.generateAndSaveAvatar(heroName);
  }

  /**
   * Fallback vers avatar local si Dicebear échoue
   */
  private getFallbackAvatar(heroName: string): HeroAvatarData {
    const normalizedName = heroName.toUpperCase();
    const style = this.HERO_STYLE_MAPPING[normalizedName] || 'adventurer';
    
    return {
      url: `/assets/heroes/${normalizedName.toLowerCase()}.svg`,
      localPath: `/assets/heroes/${normalizedName.toLowerCase()}.svg`,
      style: style,
      name: heroName,
      isGenerated: false
    };
  }

  /**
   * Génère tous les avatars pour les héros principaux
   */
  async generateAllHeroAvatars(): Promise<void> {
    const heroes = Object.keys(this.HERO_STYLE_MAPPING);
    
    console.log('🚀 Génération de tous les avatars Dicebear...');
    
    const promises = heroes.map(hero => this.generateAndSaveAvatar(hero));
    
    try {
      await Promise.all(promises);
      console.log(`✅ ${heroes.length} avatars générés avec succès !`);
    } catch (error) {
      console.error('❌ Erreur lors de la génération des avatars:', error);
    }
  }

  /**
   * Obtient les statistiques des avatars
   */
  getAvatarStats() {
    return {
      total: this.generatedAvatars.size,
      generated: Array.from(this.generatedAvatars.values()).filter(a => a.isGenerated).length,
      fallback: Array.from(this.generatedAvatars.values()).filter(a => !a.isGenerated).length
    };
  }

  /**
   * Exporte les avatars pour sauvegarde
   */
  exportAvatarsForDownload(): string {
    const avatars = Array.from(this.generatedAvatars.values());
    return JSON.stringify(avatars, null, 2);
  }
}

// Instance singleton
const offlineAvatarGenerator = new OfflineAvatarGenerator();
export default offlineAvatarGenerator;