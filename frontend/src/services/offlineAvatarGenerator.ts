// 🎮 Générateur d'Avatars Dicebear 100% OFFLINE
// Utilise les packages Dicebear installés localement

import { createAvatar } from '@dicebear/core';
import { lorelei } from '@dicebear/collection';

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
  svgContent?: string;
}

class OfflineAvatarGenerator {
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
   * Génère un avatar Dicebear 100% offline
   */
  async generateOfflineAvatar(heroName: string, style?: string): Promise<HeroAvatarData> {
    const normalizedName = heroName.toUpperCase();
    const avatarStyle = style || this.HERO_STYLE_MAPPING[normalizedName] || 'adventurer';
    
    try {
      // Utiliser Dicebear en local
      const avatar = createAvatar(lorelei, {
        seed: heroName,
        backgroundColor: ['transparent'],
        radius: 50,
        size: 128
      });

      // Générer le SVG
      const svgContent = await avatar.toDataUriSync();
      
      // Créer le chemin local
      const localFileName = `${normalizedName.toLowerCase()}-${avatarStyle}.svg`;
      const localPath = `/assets/heroes/avatars/${localFileName}`;
      
      const avatarData: HeroAvatarData = {
        url: svgContent,
        localPath: localPath,
        style: avatarStyle,
        name: heroName,
        isGenerated: true,
        svgContent: svgContent
      };
      
      this.generatedAvatars.set(normalizedName, avatarData);
      
      console.log(`✅ Avatar généré offline: ${heroName} (${avatarStyle})`);
      return avatarData;
      
    } catch (error) {
      console.error(`❌ Erreur génération avatar offline ${heroName}:`, error);
      // Fallback vers avatar local
      return this.getFallbackAvatar(heroName);
    }
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
    return await this.generateOfflineAvatar(heroName);
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
    
    console.log('🚀 Génération de tous les avatars Dicebear offline...');
    
    const promises = heroes.map(hero => this.generateOfflineAvatar(hero));
    
    try {
      await Promise.all(promises);
      console.log(`✅ ${heroes.length} avatars générés offline avec succès !`);
    } catch (error) {
      console.error('❌ Erreur lors de la génération des avatars offline:', error);
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

  /**
   * Crée un élément img avec l'avatar
   */
  createAvatarImage(heroName: string, size: number = 64): HTMLImageElement {
    const img = new Image();
    img.width = size;
    img.height = size;
    img.alt = heroName;
    
    // Utiliser l'avatar généré ou le fallback
    const avatar = this.generatedAvatars.get(heroName.toUpperCase());
    if (avatar && avatar.isGenerated) {
      img.src = avatar.url;
    } else {
      img.src = `/assets/heroes/${heroName.toLowerCase()}.svg`;
    }
    
    return img;
  }
}

// Instance singleton
const offlineAvatarGenerator = new OfflineAvatarGenerator();
export default offlineAvatarGenerator;