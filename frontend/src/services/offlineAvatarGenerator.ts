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
  // Use Record<string, string> so we can safely index with dynamic hero names
  private readonly HERO_STYLE_MAPPING: Record<string, string> = {
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

      // Générer le SVG – the Dicebear typings may miss the sync helper, so cast to any
      const svgContent: string = (avatar as any).toDataUriSync
        ? (avatar as any).toDataUriSync()
        : await (avatar as any).toDataUri();
      
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
   * Obtient tous les avatars générés
   */
  getGeneratedAvatars(): Map<string, HeroAvatarData> {
    return new Map(this.generatedAvatars);
  }

  /**
   * Exporte les avatars pour sauvegarde
   */
  exportAvatarsForDownload(): string {
    const avatars = Array.from(this.generatedAvatars.values());
    return JSON.stringify(avatars, null, 2);
  }

  /**
   * Télécharge un avatar spécifique en fichier SVG
   */
  downloadAvatarAsSVG(heroName: string): void {
    const normalizedName = heroName.toUpperCase();
    const avatar = this.generatedAvatars.get(normalizedName);
    
    if (!avatar || !avatar.svgContent) {
      console.error(`❌ Avatar ${heroName} non trouvé ou pas de contenu SVG`);
      return;
    }

    try {
      // Créer le blob avec le contenu SVG
      const blob = new Blob([avatar.svgContent], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      
      // Créer le lien de téléchargement
      const a = document.createElement('a');
      a.href = url;
      a.download = `${normalizedName.toLowerCase()}-${avatar.style}.svg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      // Nettoyer l'URL
      URL.revokeObjectURL(url);
      
      console.log(`✅ Avatar ${heroName} téléchargé en SVG`);
    } catch (error) {
      console.error(`❌ Erreur téléchargement SVG ${heroName}:`, error);
    }
  }

  /**
   * Télécharge tous les avatars en fichiers SVG
   */
  downloadAllAvatarsAsSVG(): void {
    const avatars = Array.from(this.generatedAvatars.values());
    
    if (avatars.length === 0) {
      console.warn('⚠️ Aucun avatar à télécharger');
      return;
    }

    console.log(`🚀 Téléchargement de ${avatars.length} avatars en SVG...`);
    
    avatars.forEach(avatar => {
      if (avatar.isGenerated && avatar.svgContent) {
        this.downloadAvatarAsSVG(avatar.name);
      }
    });
  }

  /**
   * Télécharge un avatar en PNG (conversion SVG vers PNG)
   */
  async downloadAvatarAsPNG(heroName: string, size: number = 256): Promise<void> {
    const normalizedName = heroName.toUpperCase();
    const avatar = this.generatedAvatars.get(normalizedName);
    
    if (!avatar || !avatar.svgContent) {
      console.error(`❌ Avatar ${heroName} non trouvé ou pas de contenu SVG`);
      return;
    }

    try {
      // Créer un canvas pour convertir SVG vers PNG
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = size;
      canvas.height = size;
      
      // Créer une image à partir du SVG
      const img = new Image();
      img.onload = () => {
        // Dessiner l'image sur le canvas
        ctx?.drawImage(img, 0, 0, size, size);
        
        // Convertir en PNG et télécharger
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${normalizedName.toLowerCase()}-${avatar.style}.png`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            console.log(`✅ Avatar ${heroName} téléchargé en PNG`);
          }
        }, 'image/png');
      };
      
      img.src = avatar.svgContent;
    } catch (error) {
      console.error(`❌ Erreur téléchargement PNG ${heroName}:`, error);
    }
  }

  /**
   * Télécharge tous les avatars en PNG
   */
  async downloadAllAvatarsAsPNG(size: number = 256): Promise<void> {
    const avatars = Array.from(this.generatedAvatars.values());
    
    if (avatars.length === 0) {
      console.warn('⚠️ Aucun avatar à télécharger');
      return;
    }

    console.log(`🚀 Téléchargement de ${avatars.length} avatars en PNG...`);
    
    for (const avatar of avatars) {
      if (avatar.isGenerated) {
        await this.downloadAvatarAsPNG(avatar.name, size);
        // Petit délai pour éviter de surcharger le navigateur
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }
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