// 🚀 SERVICE API POUR CONTENU ÉPIQUE
// Récupère les données depuis le backend avec fallback

const API_BASE_URL = 'http://localhost:8080/api/epic';

export interface EpicHero {
  id: string;
  name: string;
  race: string;
  class: string;
  level: number;
  stats: {
    attack: number;
    defense: number;
    spellPower: number;
    knowledge: number;
    morale: number;
    luck: number;
  };
  specialAbility: string;
  ultimateSkill: string;
  backstory: string;
  portraitUrl: string;
}

export interface EpicCreature {
  id: string;
  name: string;
  race: string;
  tier: number;
  health: number;
  attack: number;
  defense: number;
  speed: number;
  damage: [number, number];
  special: string;
  spriteUrl: string;
}

// 🛡️ DONNÉES DE FALLBACK
const FALLBACK_HEROES: EpicHero[] = [
  {
    id: "arthur_pendragon",
    name: "Arthur Pendragon",
    race: "Human",
    class: "Roi-Chevalier",
    level: 25,
    stats: {
      attack: 20,
      defense: 18,
      spellPower: 8,
      knowledge: 12,
      morale: 15,
      luck: 10
    },
    specialAbility: "Excalibur - Épée légendaire qui double les dégâts",
    ultimateSkill: "Table Ronde - Invoque les chevaliers légendaires",
    backstory: "Roi légendaire d'Angleterre, tiré l'épée de la pierre et unit le royaume",
    portraitUrl: "/assets/heroes/warrior.png"
  },
  {
    id: "jeanne_darc",
    name: "Jeanne d'Arc",
    race: "Human",
    class: "Paladin",
    level: 22,
    stats: {
      attack: 16,
      defense: 20,
      spellPower: 12,
      knowledge: 10,
      morale: 18,
      luck: 8
    },
    specialAbility: "Flamme Purificatrice - Brûle les morts-vivants",
    ultimateSkill: "Inspiration Divine - Booste toute l'armée",
    backstory: "Héroïne française qui a libéré Orléans et couronné le roi",
    portraitUrl: "/assets/heroes/paladin.png"
  },
  {
    id: "merlin_enchanteur",
    name: "Merlin l'Enchanteur",
    race: "Human",
    class: "Archimage",
    level: 30,
    stats: {
      attack: 8,
      defense: 12,
      spellPower: 25,
      knowledge: 22,
      morale: 10,
      luck: 15
    },
    specialAbility: "Magie Primordiale - Contrôle tous les éléments",
    ultimateSkill: "Transformation Dragon - Devient un dragon ancien",
    backstory: "Le plus grand magicien de tous les temps, conseiller du roi Arthur",
    portraitUrl: "/assets/heroes/mage.png"
  },
  {
    id: "legolas_feuille_verte",
    name: "Legolas Feuille-Verte",
    race: "Elf",
    class: "Archer Royal",
    level: 20,
    stats: {
      attack: 18,
      defense: 14,
      spellPower: 10,
      knowledge: 16,
      morale: 12,
      luck: 14
    },
    specialAbility: "Tir Parfait - Ne rate jamais sa cible",
    ultimateSkill: "Pluie de Flèches Elfiques - Attaque en zone",
    backstory: "Prince elfe et maître archer, gardien de la forêt éternelle",
    portraitUrl: "/assets/heroes/archer.png"
  }
];

const FALLBACK_CREATURES: EpicCreature[] = [
  {
    id: "red_dragon",
    name: "Dragon Rouge",
    race: "Dragon",
    tier: 7,
    health: 300,
    attack: 25,
    defense: 20,
    speed: 8,
    damage: [40, 60],
    special: "Souffle de Feu - Dégâts en zone",
    spriteUrl: "/assets/creatures/dragons/red_dragon.svg"
  },
  {
    id: "unicorn",
    name: "Licorne",
    race: "Magical",
    tier: 5,
    health: 120,
    attack: 15,
    defense: 18,
    speed: 12,
    damage: [18, 25],
    special: "Purification - Soigne les alliés",
    spriteUrl: "/assets/creatures/unicorn.png"
  },
  {
    id: "phoenix",
    name: "Phénix",
    race: "Magical",
    tier: 6,
    health: 150,
    attack: 20,
    defense: 15,
    speed: 15,
    damage: [25, 35],
    special: "Renaissance - Ressuscite après la mort",
    spriteUrl: "/assets/creatures/phoenix.png"
  },
  {
    id: "griffin",
    name: "Griffon",
    race: "Beast",
    tier: 4,
    health: 80,
    attack: 18,
    defense: 12,
    speed: 10,
    damage: [15, 20],
    special: "Vol - Peut voler au-dessus des obstacles",
    spriteUrl: "/assets/creatures/griffin.png"
  }
];

// 🦸 RÉCUPÉRATION DES HÉROS
export async function fetchEpicHeroes(): Promise<EpicHero[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/heroes`);
    if (response.ok) {
      const data = await response.json();
      return data.epic_heroes || [];
    }
  } catch (error) {
    console.warn('Backend not available, using fallback heroes');
  }
  return FALLBACK_HEROES;
}

export async function fetchHeroById(id: string): Promise<EpicHero | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/heroes/${id}`);
    if (!response.ok) {
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching hero by ID:', error);
    return null;
  }
}

export async function fetchHeroesByRace(race: string): Promise<EpicHero[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/heroes/race/${race}`);
    if (!response.ok) {
      throw new Error('Failed to fetch heroes by race');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching heroes by race:', error);
    return [];
  }
}

// 🐉 RÉCUPÉRATION DES CRÉATURES
export async function fetchEpicCreatures(): Promise<EpicCreature[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/creatures`);
    if (response.ok) {
      const data = await response.json();
      return data.epic_creatures || [];
    }
  } catch (error) {
    console.warn('Backend not available, using fallback creatures');
  }
  return FALLBACK_CREATURES;
}

export async function fetchCreatureById(id: string): Promise<EpicCreature | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/creatures/${id}`);
    if (!response.ok) {
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching creature by ID:', error);
    return null;
  }
}

export async function fetchCreaturesByRace(race: string): Promise<EpicCreature[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/creatures/race/${race}`);
    if (!response.ok) {
      throw new Error('Failed to fetch creatures by race');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching creatures by race:', error);
    return [];
  }
}

console.log('🚀 Epic Content API Service Loaded!'); 