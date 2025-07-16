// 🚀 SERVICE API POUR CONTENU ÉPIQUE
// Récupère les données depuis le backend au lieu du frontend

const API_BASE_URL = 'http://localhost:8080/api/epic';

export interface EpicHero {
  id: string;
  name: string;
  race: string;
  class: string;
  gender: string;
  level: number;
  experience: number;
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
  personality: string;
  portraitStyle: string;
  voiceType: string;
  favoriteCreatures: string[];
  hatedEnemies: string[];
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
  cost: number;
  special: string;
  spriteSize: string;
  animations: string[];
  description: string;
  spriteUrl: string;
}

// 🦸 RÉCUPÉRATION DES HÉROS
export async function fetchEpicHeroes(): Promise<EpicHero[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/heroes`);
    if (!response.ok) {
      throw new Error('Failed to fetch heroes');
    }
    const data = await response.json();
    return data.epic_heroes || [];
  } catch (error) {
    console.error('Error fetching epic heroes:', error);
    return [];
  }
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
    if (!response.ok) {
      throw new Error('Failed to fetch creatures');
    }
    const data = await response.json();
    return data.epic_creatures || [];
  } catch (error) {
    console.error('Error fetching epic creatures:', error);
    return [];
  }
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