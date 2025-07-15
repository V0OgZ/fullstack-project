// Helper pour gérer les spritesheets de héros LPC (Liberated Pixel Cup)
// Utilise les sprites open source de OpenGameArt.org
// Source: https://opengameart.org/content/lpc-medieval-fantasy-character-sprites

export interface SpriteInfo {
  x: number;        // Position X dans la spritesheet
  y: number;        // Position Y dans la spritesheet
  width: number;    // Largeur du sprite
  height: number;   // Hauteur du sprite
}

export interface HeroSpriteData {
  spritesheet: string;  // URL de la spritesheet
  sprite: SpriteInfo;   // Informations du sprite individuel
}

// Configuration des spritesheets LPC de héros
// Basé sur les sprites LPC Medieval Fantasy Character (64x64 pixels)
export const HERO_SPRITES: Record<string, HeroSpriteData> = {
  // Héros classiques
  ARTHUR: {
    spritesheet: '/assets/heroes/lpc-knight-male.png',
    sprite: { x: 0, y: 0, width: 64, height: 64 }  // Position du chevalier
  },
  MORGANA: {
    spritesheet: '/assets/heroes/lpc-mage-female.png', 
    sprite: { x: 0, y: 0, width: 64, height: 64 }  // Position de la mage
  },
  WARRIOR: {
    spritesheet: '/assets/heroes/lpc-warrior-male.png',
    sprite: { x: 0, y: 0, width: 64, height: 64 }  // Position du guerrier
  },
  ARCHER: {
    spritesheet: '/assets/heroes/lpc-archer-female.png',
    sprite: { x: 0, y: 0, width: 64, height: 64 }  // Position de l'archer
  },
  PALADIN: {
    spritesheet: '/assets/heroes/lpc-paladin-male.png',
    sprite: { x: 0, y: 0, width: 64, height: 64 }  // Position du paladin
  },
  MAGE: {
    spritesheet: '/assets/heroes/lpc-mage-male.png',
    sprite: { x: 0, y: 0, width: 64, height: 64 }  // Position du mage
  },
  NECROMANCER: {
    spritesheet: '/assets/heroes/lpc-necromancer-male.png',
    sprite: { x: 0, y: 0, width: 64, height: 64 }  // Position du nécromancien
  },
  
  // Héros pour différents scénarios
  TRISTAN: {
    spritesheet: '/assets/heroes/lpc-knight-male.png',
    sprite: { x: 64, y: 0, width: 64, height: 64 }  // Variante chevalier
  },
  ELARA: {
    spritesheet: '/assets/heroes/lpc-mage-female.png',
    sprite: { x: 64, y: 0, width: 64, height: 64 }  // Variante mage
  },
  GARETH: {
    spritesheet: '/assets/heroes/lpc-warrior-male.png',
    sprite: { x: 64, y: 0, width: 64, height: 64 }  // Variante guerrier
  },
  LYANNA: {
    spritesheet: '/assets/heroes/lpc-archer-female.png',
    sprite: { x: 64, y: 0, width: 64, height: 64 }  // Variante archer
  },
  CEDRIC: {
    spritesheet: '/assets/heroes/lpc-paladin-male.png',
    sprite: { x: 64, y: 0, width: 64, height: 64 }  // Variante paladin
  },
  SERAPHINA: {
    spritesheet: '/assets/heroes/lpc-mage-female.png',
    sprite: { x: 128, y: 0, width: 64, height: 64 }  // Variante mage féminine
  },
  VALEN: {
    spritesheet: '/assets/heroes/lpc-necromancer-male.png',
    sprite: { x: 64, y: 0, width: 64, height: 64 }  // Variante nécromancien
  }
};

// Fallback vers des images PNG simples si les spritesheets ne sont pas disponibles
export const HERO_FALLBACK_IMAGES: Record<string, string> = {
  ARTHUR: '/assets/heroes/knight-arthur.png',
  MORGANA: '/assets/heroes/mage-morgana.png',
  WARRIOR: '/assets/heroes/warrior-base.png',
  ARCHER: '/assets/heroes/archer-base.png',
  PALADIN: '/assets/heroes/paladin-base.png',
  MAGE: '/assets/heroes/mage-base.png',
  NECROMANCER: '/assets/heroes/necromancer-base.png',
  TRISTAN: '/assets/heroes/knight-tristan.png',
  ELARA: '/assets/heroes/mage-elara.png',
  GARETH: '/assets/heroes/warrior-gareth.png',
  LYANNA: '/assets/heroes/archer-lyanna.png',
  CEDRIC: '/assets/heroes/paladin-cedric.png',
  SERAPHINA: '/assets/heroes/mage-seraphina.png',
  VALEN: '/assets/heroes/necromancer-valen.png'
};

// Configuration des héros par défaut pour chaque scénario
export const DEFAULT_HEROES_BY_SCENARIO: Record<string, string> = {
  'conquest-classic': 'ARTHUR',      // Arthur pour le scénario classique
  'temporal-rift': 'TRISTAN',        // Tristan pour le temporal rift
  'multiplayer-arena': 'RANDOM',     // Héros aléatoire pour le multijoueur
  'dragon-campaign': 'GARETH'        // Gareth pour la campagne dragon
};

// Liste des héros disponibles pour la sélection aléatoire
export const RANDOM_HEROES = [
  'ARTHUR', 'MORGANA', 'WARRIOR', 'ARCHER', 'PALADIN', 'MAGE', 'NECROMANCER',
  'TRISTAN', 'ELARA', 'GARETH', 'LYANNA', 'CEDRIC', 'SERAPHINA', 'VALEN'
];

/**
 * Obtient les informations du sprite d'un héros
 * @param heroName - Nom du héros
 * @returns Les données du sprite ou null si non trouvé
 */
export function getHeroSprite(heroName: string): HeroSpriteData | null {
  const normalizedName = heroName.toUpperCase();
  return HERO_SPRITES[normalizedName] || null;
}

/**
 * Obtient l'image de fallback pour un héros avec système de fallback robuste
 * @param heroName - Nom du héros
 * @returns URL de l'image de fallback
 */
export function getHeroFallbackImage(heroName: string): string {
  const normalizedName = heroName.toUpperCase();
  
  // Essayer d'abord les assets spécifiques
  const heroAssetMap: Record<string, string> = {
    ARTHUR: '/assets/heroes/knight.png',
    MORGANA: '/assets/heroes/mage.png',
    WARRIOR: '/assets/heroes/warrior.png',
    ARCHER: '/assets/heroes/archer.png',
    PALADIN: '/assets/heroes/paladin.png',
    MAGE: '/assets/heroes/mage.png',
    NECROMANCER: '/assets/heroes/necromancer.png',
    TRISTAN: '/assets/heroes/knight.png',
    ELARA: '/assets/heroes/mage.png',
    GARETH: '/assets/heroes/warrior.png',
    LYANNA: '/assets/heroes/archer.png',
    CEDRIC: '/assets/heroes/paladin.png',
    SERAPHINA: '/assets/heroes/mage.png',
    VALEN: '/assets/heroes/necromancer.png'
  };
  
  // Retourner l'asset spécifique ou un fallback générique
  return heroAssetMap[normalizedName] || '/assets/heroes/default-hero.png';
}

/**
 * Vérifie si une image existe et peut être chargée
 * @param src - URL de l'image
 * @returns Promise qui resolve si l'image existe
 */
export function checkImageExists(src: string): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = src;
  });
}

/**
 * Charge une image héros avec fallback automatique
 * @param heroName - Nom du héros
 * @returns Promise avec l'image chargée
 */
export async function loadHeroImageWithFallback(heroName: string): Promise<HTMLImageElement> {
  const sources = [
    // 1. Essayer la spritesheet LPC
    getHeroSprite(heroName)?.spritesheet,
    // 2. Essayer l'image PNG spécifique
    getHeroFallbackImage(heroName),
    // 3. Fallback générique
    '/assets/heroes/default-hero.png'
  ].filter(Boolean) as string[];
  
  for (const src of sources) {
    try {
      const img = new Image();
      const loadPromise = new Promise<HTMLImageElement>((resolve, reject) => {
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
      });
      
      // Timeout de 3 secondes par image
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('Image load timeout')), 3000);
      });
      
      const loadedImg = await Promise.race([loadPromise, timeoutPromise]);
      console.log(`✅ Hero image loaded successfully: ${heroName} from ${src}`);
      return loadedImg;
    } catch (error) {
      console.warn(`⚠️ Failed to load ${src} for hero ${heroName}:`, error);
    }
  }
  
  // Si tout échoue, créer une image de fallback simple
  throw new Error(`Failed to load any image for hero ${heroName}`);
}

/**
 * Obtient le héros par défaut pour un scénario donné
 * @param scenarioId - ID du scénario
 * @returns Nom du héros par défaut
 */
export function getDefaultHeroForScenario(scenarioId: string): string {
  const defaultHero = DEFAULT_HEROES_BY_SCENARIO[scenarioId];
  
  if (defaultHero === 'RANDOM') {
    // Sélection aléatoire d'un héros
    const randomIndex = Math.floor(Math.random() * RANDOM_HEROES.length);
    return RANDOM_HEROES[randomIndex];
  }
  
  return defaultHero || 'ARTHUR';
}

/**
 * Crée le style CSS pour afficher un sprite d'une spritesheet
 * @param spriteData - Données du sprite
 * @returns Objet de style CSS
 */
export function createSpriteStyle(spriteData: HeroSpriteData): React.CSSProperties {
  const { spritesheet, sprite } = spriteData;
  
  return {
    backgroundImage: `url(${spritesheet})`,
    backgroundPosition: `-${sprite.x}px -${sprite.y}px`,
    backgroundRepeat: 'no-repeat',
    width: `${sprite.width}px`,
    height: `${sprite.height}px`,
    backgroundSize: 'auto' // Garde la taille originale de la spritesheet
  };
}

/**
 * Dessine un sprite de héros sur un canvas
 * @param ctx - Contexte du canvas
 * @param heroName - Nom du héros
 * @param x - Position X sur le canvas
 * @param y - Position Y sur le canvas
 * @param width - Largeur d'affichage
 * @param height - Hauteur d'affichage
 */
export function drawHeroSprite(
  ctx: CanvasRenderingContext2D,
  heroName: string,
  x: number,
  y: number,
  width: number,
  height: number
): void {
  const spriteData = getHeroSprite(heroName);
  if (!spriteData) {
    console.warn(`No sprite data found for hero: ${heroName}`);
    return;
  }

  const img = new Image();
  img.onload = () => {
    const { sprite } = spriteData;
    ctx.drawImage(
      img,
      sprite.x, sprite.y, sprite.width, sprite.height,  // Source (dans la spritesheet)
      x, y, width, height                                // Destination (sur le canvas)
    );
  };
  img.src = spriteData.spritesheet;
}

/**
 * Obtient l'emoji de fallback pour un héros
 * @param heroName - Nom du héros
 * @returns Emoji du héros
 */
export function getHeroEmoji(heroName: string): string {
  const normalizedName = heroName.toUpperCase();
  
  switch (normalizedName) {
    case 'ARTHUR':
    case 'TRISTAN':
    case 'KNIGHT':
      return '🛡️';
    case 'MORGANA':
    case 'ELARA':
    case 'SERAPHINA':
    case 'MAGE':
    case 'WIZARD':
      return '🧙‍♀️';
    case 'WARRIOR':
    case 'GARETH':
      return '⚔️';
    case 'ARCHER':
    case 'LYANNA':
      return '🏹';
    case 'PALADIN':
    case 'CEDRIC':
      return '✨';
    case 'NECROMANCER':
    case 'VALEN':
      return '💀';
    default:
      return '🦸';
  }
}

/**
 * Obtient les informations d'un héros (nom, classe, description)
 * @param heroName - Nom du héros
 * @returns Informations du héros
 */
export function getHeroInfo(heroName: string): { name: string; class: string; description: string } {
  const normalizedName = heroName.toUpperCase();
  
  const heroInfos: Record<string, { name: string; class: string; description: string }> = {
    ARTHUR: {
      name: 'Arthur',
      class: 'Knight',
      description: 'Noble knight of the realm, skilled in combat and leadership'
    },
    MORGANA: {
      name: 'Morgana',
      class: 'Mage',
      description: 'Powerful sorceress with mastery over arcane arts'
    },
    WARRIOR: {
      name: 'Warrior',
      class: 'Fighter',
      description: 'Fierce warrior with exceptional combat prowess'
    },
    ARCHER: {
      name: 'Archer',
      class: 'Ranger',
      description: 'Expert marksman with deadly precision'
    },
    PALADIN: {
      name: 'Paladin',
      class: 'Holy Warrior',
      description: 'Divine warrior blessed with holy powers'
    },
    MAGE: {
      name: 'Mage',
      class: 'Wizard',
      description: 'Scholar of magic with vast knowledge of spells'
    },
    NECROMANCER: {
      name: 'Necromancer',
      class: 'Dark Mage',
      description: 'Master of death magic and undead minions'
    },
    TRISTAN: {
      name: 'Tristan',
      class: 'Knight',
      description: 'Brave knight from another time, skilled in temporal combat'
    },
    ELARA: {
      name: 'Elara',
      class: 'Time Mage',
      description: 'Mystical mage with power over time and space'
    },
    GARETH: {
      name: 'Gareth',
      class: 'Dragon Slayer',
      description: 'Legendary warrior specialized in fighting dragons'
    },
    LYANNA: {
      name: 'Lyanna',
      class: 'Elven Archer',
      description: 'Elven archer with supernatural accuracy'
    },
    CEDRIC: {
      name: 'Cedric',
      class: 'Paladin',
      description: 'Righteous paladin devoted to justice and honor'
    },
    SERAPHINA: {
      name: 'Seraphina',
      class: 'Celestial Mage',
      description: 'Angelic mage with divine magical powers'
    },
    VALEN: {
      name: 'Valen',
      class: 'Shadow Necromancer',
      description: 'Dark necromancer who commands shadows and death'
    }
  };
  
  return heroInfos[normalizedName] || {
    name: heroName,
    class: 'Unknown',
    description: 'Mysterious hero of unknown origins'
  };
} 