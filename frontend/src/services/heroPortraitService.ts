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

  // Mapping héros -> portraits Flare (vrais noms de fichiers)
  private heroPortraitMapping: HeroPortraitMapping = {
    // Guerriers & Combattants masculins
    'WARRIOR': 'flaremalehero1.png',
    'KNIGHT': 'branko.png',
    'PALADIN': 'jonas.png',
    'BARBARIAN': 'kain.png',
    'BERSERKER': 'branko2.png',
    
    // Mages & Casters masculins
    'MAGE': 'flaremalehero2.png',
    'WIZARD': 'lessig.png',
    'SORCERER': 'fredg.png',
    'NECROMANCER': 'flaremalehero3.png',
    'WARLOCK': 'maxime.png',
    'DRUID': 'alec.png',
    'CLERIC': 'florent.png',
    'PRIEST': 'marcos.png',
    
    // Archers & Scouts masculins
    'ARCHER': 'jordan.png',
    'RANGER': 'jonas2.png',
    'HUNTER': 'brendanportrait.png',
    'SCOUT': 'jordanportrait.png',
    
    // Rogues & Assassins masculins
    'ROGUE': 'bjin.png',
    'ASSASSIN': 'kain.png',
    'THIEF': 'branko2.png',
    
    // Héroïnes féminines
    'WARRIOR_F': 'flarefemalehero1.png',
    'MAGE_F': 'flarefemalehero2.png',
    'ARCHER_F': 'flarefemalehero3.png',
    'ROGUE_F': 'aileen.png',
    'PALADIN_F': 'ashita.png',
    'NECROMANCER_F': 'frieda.png',
    
    // Héros spéciaux (nommés)
    'ARTHUR': 'jonas.png',      // Noble knight
    'MORGANA': 'frieda.png',    // Dark sorceress
    'MERLIN': 'lessig.png',     // Wise wizard
    'TRISTAN': 'branko.png',    // Valiant paladin
    'ELENA': 'ashita.png',      // Wise mage
    'GARETH': 'flaremalehero1.png', // Strong warrior
    'THORIN': 'kain.png'        // Dwarven barbarian
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