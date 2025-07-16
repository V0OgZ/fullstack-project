// 🎨 Hero Portrait Service - Flare Portrait Pack Integration
// ================================================================
// Service pour gérer les portraits de héros avec le pack Flare
// Style semi-réaliste fantasy qui impose vraiment

interface HeroPortraitMapping {
  [key: string]: string;
}

interface PortraitConfig {
  basePath: string;
  fallback: string;
  format: string;
  style: string;
}

class HeroPortraitService {
  private config: PortraitConfig = {
    basePath: '/assets/heroes/portraits/flare/',
    fallback: 'flaremalehero1.png',
    format: 'Various PNG sizes',
    style: 'flare-semi-realistic'
  };

  // Mapping héros -> portraits Flare (OPTIMISÉ - portraits de qualité uniquement)
  private heroPortraitMapping: HeroPortraitMapping = {
    // Guerriers & Combattants masculins
    'WARRIOR': 'branko.png',        // Portrait guerrier robuste
    'KNIGHT': 'jonas.png',          // Portrait chevalier noble
    'PALADIN': 'marcos.png',        // Portrait paladin imposant
    'BARBARIAN': 'kain.png',        // Portrait barbare sauvage
    'BERSERKER': 'branko2.png',     // Portrait berserker furieux
    
    // Mages & Casters masculins
    'MAGE': 'lessig.png',           // Portrait mage sage
    'WIZARD': 'maxime.png',         // Portrait sorcier mystérieux
    'SORCERER': 'fredg.png',        // Portrait sorcier sombre
    'NECROMANCER': 'florent.png',   // Portrait nécromancien sinistre
    'WARLOCK': 'alec.png',          // Portrait démoniste
    'DRUID': 'jordan.png',          // Portrait druide naturel
    'CLERIC': 'brendanportrait.png', // Portrait clerc bienveillant
    'PRIEST': 'jordanportrait.png', // Portrait prêtre dévoué
    
    // Archers & Scouts masculins
    'ARCHER': 'bjin.png',           // Portrait archer précis
    'RANGER': 'jonas2.png',         // Portrait rôdeur agile
    'HUNTER': 'florent.png',        // Portrait chasseur expérimenté (réutilisé)
    'SCOUT': 'alec.png',            // Portrait éclaireur furtif (réutilisé)
    
    // Rogues & Assassins masculins
    'ROGUE': 'bjin.png',            // Portrait voleur agile (réutilisé)
    'ASSASSIN': 'kain.png',         // Portrait assassin mortel (réutilisé)
    'THIEF': 'branko2.png',         // Portrait voleur discret (réutilisé)
    
    // Héroïnes féminines (seulement 3 portraits féminins disponibles)
    'WARRIOR_F': 'ashita.png',      // Portrait guerrière courageuse
    'MAGE_F': 'frieda.png',         // Portrait mage féminine
    'ARCHER_F': 'aileen.png',       // Portrait archère élégante
    'ROGUE_F': 'aileen.png',        // Portrait voleuse habile (réutilisé)
    'PALADIN_F': 'ashita.png',      // Portrait paladin féminine (réutilisé)
    'NECROMANCER_F': 'frieda.png',  // Portrait nécromancienne (réutilisé)
    
    // Héros spéciaux (nommés) - portraits uniques
    'ARTHUR': 'jonas.png',          // Portrait noble pour Arthur
    'MORGANA': 'frieda.png',        // Portrait mystérieux pour Morgana
    'MERLIN': 'lessig.png',         // Portrait sage pour Merlin
    'TRISTAN': 'branko.png',        // Portrait valeureux pour Tristan
    'ELENA': 'ashita.png',          // Portrait élégant pour Elena
    'GARETH': 'marcos.png',         // Portrait fort pour Gareth
    'THORIN': 'kain.png'            // Portrait robuste pour Thorin
  };

  /**
   * Obtient l'URL du portrait d'un héros
   * @param heroName - Nom/classe du héros
   * @param gender - Genre optionnel (m/f)
   * @returns URL du portrait
   */
  getHeroPortrait(heroName: string, gender?: 'm' | 'f'): string {
    // Nettoyer le nom (majuscules)
    const cleanName = heroName.toUpperCase();
    
    // Ajouter le genre si spécifié
    const nameWithGender = gender ? `${cleanName}_${gender.toUpperCase()}` : cleanName;
    
    // Chercher d'abord avec le genre
    let portraitFile = this.heroPortraitMapping[nameWithGender];
    
    // Si pas trouvé, chercher sans genre
    if (!portraitFile) {
      portraitFile = this.heroPortraitMapping[cleanName];
    }
    
    // Fallback si aucun portrait trouvé
    if (!portraitFile) {
      portraitFile = this.config.fallback;
    }
    
    return this.config.basePath + portraitFile;
  }

  /**
   * Obtient un portrait aléatoire parmi les disponibles
   * @param gender - Genre optionnel
   * @returns URL du portrait
   */
  getRandomPortrait(gender?: 'm' | 'f'): string {
    const availablePortraits = Object.values(this.heroPortraitMapping);
    
    // Filtrer par genre si spécifié
    const filteredPortraits = gender 
      ? availablePortraits.filter(p => p.includes(`_${gender}.png`))
      : availablePortraits;
    
    const randomIndex = Math.floor(Math.random() * filteredPortraits.length);
    return this.config.basePath + filteredPortraits[randomIndex];
  }

  /**
   * Obtient tous les portraits disponibles
   * @returns Array des URLs de portraits
   */
  getAllPortraits(): string[] {
    return Object.values(this.heroPortraitMapping)
      .map(portrait => this.config.basePath + portrait);
  }

  /**
   * Vérifie si un portrait existe pour un héros
   * @param heroName - Nom du héros
   * @returns True si le portrait existe
   */
  hasPortrait(heroName: string): boolean {
    const cleanName = heroName.toUpperCase();
    return this.heroPortraitMapping.hasOwnProperty(cleanName);
  }

  /**
   * Précharge un portrait pour éviter les délais de chargement
   * @param heroName - Nom du héros
   * @returns Promise qui se résout quand l'image est chargée
   */
  async preloadPortrait(heroName: string): Promise<void> {
    const portraitUrl = this.getHeroPortrait(heroName);
    
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => reject(new Error(`Failed to load portrait: ${portraitUrl}`));
      img.src = portraitUrl;
    });
  }

  /**
   * Précharge tous les portraits pour de meilleures performances
   * @returns Promise qui se résout quand tous les portraits sont chargés
   */
  async preloadAllPortraits(): Promise<void> {
    const allPortraits = this.getAllPortraits();
    
    const preloadPromises = allPortraits.map(portraitUrl => {
      return new Promise<void>((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => resolve(); // Continue même si une image échoue
        img.src = portraitUrl;
      });
    });
    
    await Promise.all(preloadPromises);
  }

  /**
   * Obtient les métadonnées d'un portrait
   * @param heroName - Nom du héros
   * @returns Métadonnées du portrait
   */
  getPortraitMetadata(heroName: string) {
    return {
      url: this.getHeroPortrait(heroName),
      style: this.config.style,
      format: this.config.format,
      source: 'Flare Portrait Pack',
      license: 'CC-BY-SA 3.0'
    };
  }

  /**
   * Obtient la configuration du service
   * @returns Configuration actuelle
   */
  getConfig(): PortraitConfig {
    return { ...this.config };
  }

  /**
   * Met à jour la configuration du service
   * @param newConfig - Nouvelle configuration
   */
  updateConfig(newConfig: Partial<PortraitConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }
}

// Instance singleton du service
export const heroPortraitService = new HeroPortraitService();

// Export du type pour TypeScript
export type { HeroPortraitMapping, PortraitConfig };

// Export de fonctions utilitaires
export const getHeroPortrait = (heroName: string, gender?: 'm' | 'f') => 
  heroPortraitService.getHeroPortrait(heroName, gender);

export const preloadHeroPortrait = (heroName: string) =>
  heroPortraitService.preloadPortrait(heroName);

export const getRandomHeroPortrait = (gender?: 'm' | 'f') =>
  heroPortraitService.getRandomPortrait(gender); 