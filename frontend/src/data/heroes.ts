// 🎮 Données des héros pour Heroes of Time
// Système unifié avec couleurs de joueur et montures

import { Hero, PlayerColor, MountType } from '../types/game';

export const HEROES_DATA: Record<string, Partial<Hero>> = {
  // Héros principaux
  ARTHUR: {
    id: 'arthur_001',
    name: 'Arthur',
    class: 'Knight',
    level: 1,
    experience: 0,
    health: 100,
    maxHealth: 100,
    mana: 50,
    maxMana: 50,
    attack: 15,
    defense: 12,
    spellPower: 8,
    knowledge: 6,
    morale: 10,
    luck: 8,
    movementPoints: 1500,
    maxMovementPoints: 1500,
    playerColor: 'blue' as PlayerColor,
    portraitId: 'arthur',
    mountType: 'horse' as MountType,
    flagColor: '#3498db',
    skills: [],
    spells: [],
    artifacts: [],
    army: [],
    playerId: 'player_1'
  },
  
  MORGANA: {
    id: 'morgana_001',
    name: 'Morgana',
    class: 'Mage',
    level: 1,
    experience: 0,
    health: 80,
    maxHealth: 80,
    mana: 100,
    maxMana: 100,
    attack: 8,
    defense: 6,
    spellPower: 18,
    knowledge: 15,
    morale: 8,
    luck: 10,
    movementPoints: 1200,
    maxMovementPoints: 1200,
    playerColor: 'purple' as PlayerColor,
    portraitId: 'morgana',
    mountType: 'none' as MountType,
    flagColor: '#9b59b6',
    skills: [],
    spells: [],
    artifacts: [],
    army: [],
    playerId: 'player_2'
  },
  
  TRISTAN: {
    id: 'tristan_001',
    name: 'Tristan',
    class: 'Archer',
    level: 1,
    experience: 0,
    health: 90,
    maxHealth: 90,
    mana: 60,
    maxMana: 60,
    attack: 18,
    defense: 8,
    spellPower: 6,
    knowledge: 8,
    morale: 12,
    luck: 15,
    movementPoints: 1400,
    maxMovementPoints: 1400,
    playerColor: 'green' as PlayerColor,
    portraitId: 'tristan',
    mountType: 'horse' as MountType,
    flagColor: '#27ae60',
    skills: [],
    spells: [],
    artifacts: [],
    army: [],
    playerId: 'player_3'
  },
  
  ELARA: {
    id: 'elara_001',
    name: 'Elara',
    class: 'Paladin',
    level: 1,
    experience: 0,
    health: 110,
    maxHealth: 110,
    mana: 70,
    maxMana: 70,
    attack: 14,
    defense: 16,
    spellPower: 10,
    knowledge: 12,
    morale: 15,
    luck: 12,
    movementPoints: 1300,
    maxMovementPoints: 1300,
    playerColor: 'yellow' as PlayerColor,
    portraitId: 'elara',
    mountType: 'pegasus' as MountType,
    flagColor: '#f1c40f',
    skills: [],
    spells: [],
    artifacts: [],
    army: [],
    playerId: 'player_4'
  },
  
  // Héros génériques par classe
  WARRIOR: {
    id: 'warrior_generic',
    name: 'Warrior',
    class: 'Warrior',
    level: 1,
    experience: 0,
    health: 100,
    maxHealth: 100,
    mana: 40,
    maxMana: 40,
    attack: 16,
    defense: 14,
    spellPower: 4,
    knowledge: 4,
    morale: 12,
    luck: 8,
    movementPoints: 1500,
    maxMovementPoints: 1500,
    playerColor: 'red' as PlayerColor,
    portraitId: 'warrior',
    mountType: 'horse' as MountType,
    flagColor: '#e74c3c',
    skills: [],
    spells: [],
    artifacts: [],
    army: [],
    playerId: 'player_1'
  },
  
  MAGE: {
    id: 'mage_generic',
    name: 'Mage',
    class: 'Mage',
    level: 1,
    experience: 0,
    health: 70,
    maxHealth: 70,
    mana: 120,
    maxMana: 120,
    attack: 6,
    defense: 4,
    spellPower: 20,
    knowledge: 18,
    morale: 6,
    luck: 12,
    movementPoints: 1000,
    maxMovementPoints: 1000,
    playerColor: 'blue' as PlayerColor,
    portraitId: 'mage',
    mountType: 'none' as MountType,
    flagColor: '#3498db',
    skills: [],
    spells: [],
    artifacts: [],
    army: [],
    playerId: 'player_2'
  },
  
  ARCHER: {
    id: 'archer_generic',
    name: 'Archer',
    class: 'Archer',
    level: 1,
    experience: 0,
    health: 85,
    maxHealth: 85,
    mana: 50,
    maxMana: 50,
    attack: 20,
    defense: 6,
    spellPower: 4,
    knowledge: 6,
    morale: 10,
    luck: 16,
    movementPoints: 1400,
    maxMovementPoints: 1400,
    playerColor: 'green' as PlayerColor,
    portraitId: 'archer',
    mountType: 'horse' as MountType,
    flagColor: '#27ae60',
    skills: [],
    spells: [],
    artifacts: [],
    army: [],
    playerId: 'player_3'
  },
  
  PALADIN: {
    id: 'paladin_generic',
    name: 'Paladin',
    class: 'Paladin',
    level: 1,
    experience: 0,
    health: 120,
    maxHealth: 120,
    mana: 80,
    maxMana: 80,
    attack: 12,
    defense: 18,
    spellPower: 12,
    knowledge: 14,
    morale: 18,
    luck: 14,
    movementPoints: 1200,
    maxMovementPoints: 1200,
    playerColor: 'yellow' as PlayerColor,
    portraitId: 'paladin',
    mountType: 'pegasus' as MountType,
    flagColor: '#f1c40f',
    skills: [],
    spells: [],
    artifacts: [],
    army: [],
    playerId: 'player_4'
  }
};

/**
 * Obtient les données d'un héros par son nom
 */
export function getHeroData(heroName: string): Partial<Hero> | null {
  const normalizedName = heroName.toUpperCase();
  return HEROES_DATA[normalizedName] || null;
}

/**
 * Obtient tous les héros disponibles
 */
export function getAllHeroes(): Partial<Hero>[] {
  return Object.values(HEROES_DATA);
}

/**
 * Obtient les héros par classe
 */
export function getHeroesByClass(heroClass: string): Partial<Hero>[] {
  return Object.values(HEROES_DATA).filter(hero => hero.class === heroClass);
}

/**
 * Obtient les héros par couleur de joueur
 */
export function getHeroesByPlayerColor(playerColor: PlayerColor): Partial<Hero>[] {
  return Object.values(HEROES_DATA).filter(hero => hero.playerColor === playerColor);
}

/**
 * Obtient un héros aléatoire
 */
export function getRandomHero(): Partial<Hero> {
  const heroes = getAllHeroes();
  return heroes[Math.floor(Math.random() * heroes.length)];
}

/**
 * Obtient un héros aléatoire par classe
 */
export function getRandomHeroByClass(heroClass: string): Partial<Hero> | null {
  const heroes = getHeroesByClass(heroClass);
  if (heroes.length === 0) return null;
  return heroes[Math.floor(Math.random() * heroes.length)];
}

/**
 * Obtient un héros aléatoire par couleur de joueur
 */
export function getRandomHeroByPlayerColor(playerColor: PlayerColor): Partial<Hero> | null {
  const heroes = getHeroesByPlayerColor(playerColor);
  if (heroes.length === 0) return null;
  return heroes[Math.floor(Math.random() * heroes.length)];
}

/**
 * Crée un héros complet avec toutes les propriétés requises
 */
export function createCompleteHero(heroName: string, playerId: string, playerColor: PlayerColor): Hero {
  const baseData = getHeroData(heroName);
  if (!baseData) {
    throw new Error(`Hero data not found for: ${heroName}`);
  }
  
  return {
    ...baseData,
    id: `${heroName.toLowerCase()}_${Date.now()}`,
    playerId,
    playerColor,
    position: { x: 0, y: 0 }, // Position par défaut
    movementPoints: baseData.maxMovementPoints || 1500,
    health: baseData.maxHealth || 100,
    mana: baseData.maxMana || 50,
    skills: baseData.skills || [],
    spells: baseData.spells || [],
    artifacts: baseData.artifacts || [],
    army: baseData.army || []
  } as Hero;
}