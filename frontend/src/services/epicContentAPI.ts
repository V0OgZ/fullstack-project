// 🚀 SERVICE API POUR CONTENU ÉPIQUE
// Récupère les données depuis le backend avec fallbacks locaux

import { BUILDING_IMAGES, BuildingVisual } from './buildingImageService';

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

export interface EpicBuilding {
  id: string;
  name: string;
  race: string;
  type: string;
  imageUrl: string;
  iconUrl: string;
  description: string;
  cost: {
    wood: number;
    stone: number;
    gold: number;
  };
  buildTime: number;
  level: number;
}

// 🔧 HELPER FUNCTIONS
function isServerAvailable(): Promise<boolean> {
  return fetch(`${API_BASE_URL.replace('/api/epic', '')}/actuator/health`)
    .then(response => response.ok)
    .catch(() => false);
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
    
    // Fallback vers les données locales
    console.log('🔄 Fallback: Using local hero data');
    return generateFallbackHeroes();
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
    
    // Fallback vers les données locales
    console.log('🔄 Fallback: Using local creature data');
    return generateFallbackCreatures();
  }
}

// 🏰 RÉCUPÉRATION DES BÂTIMENTS
export async function fetchEpicBuildings(): Promise<EpicBuilding[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/buildings`);
    if (!response.ok) {
      throw new Error('Failed to fetch buildings');
    }
    const data = await response.json();
    return data.epic_buildings || [];
  } catch (error) {
    console.error('Error fetching epic buildings:', error);
    
    // Fallback vers les données locales
    console.log('🔄 Fallback: Using local building data');
    return generateFallbackBuildings();
  }
}

// 🔄 FALLBACK DATA GENERATORS
function generateFallbackHeroes(): EpicHero[] {
  return [
    {
      id: 'arthur_local',
      name: 'Arthur (Local)',
      race: 'Human',
      class: 'Roi-Chevalier',
      gender: 'Male',
      level: 25,
      experience: 50000,
      stats: {
        attack: 20,
        defense: 18,
        spellPower: 8,
        knowledge: 12,
        morale: 15,
        luck: 10
      },
      specialAbility: 'Excalibur - Épée légendaire',
      ultimateSkill: 'Table Ronde - Invoque les chevaliers',
      backstory: 'Roi légendaire d\'Angleterre',
      personality: 'Noble et juste',
      portraitStyle: 'Médiéval',
      voiceType: 'Grave',
      favoriteCreatures: ['knight', 'griffin'],
      hatedEnemies: ['mordred', 'darkness'],
      portraitUrl: '/assets/heroes/arthur.png'
    },
    {
      id: 'morgana_local',
      name: 'Morgana (Local)',
      race: 'Human',
      class: 'Sorcière',
      gender: 'Female',
      level: 22,
      experience: 40000,
      stats: {
        attack: 12,
        defense: 15,
        spellPower: 25,
        knowledge: 20,
        morale: 8,
        luck: 12
      },
      specialAbility: 'Magie Noire - Sorts interdits',
      ultimateSkill: 'Tempête Mystique - Chaos magique',
      backstory: 'Sorcière légendaire de Camelot',
      personality: 'Mystérieuse et puissante',
      portraitStyle: 'Gothique',
      voiceType: 'Envoutant',
      favoriteCreatures: ['dragon', 'phantom'],
      hatedEnemies: ['arthur', 'light'],
      portraitUrl: '/assets/heroes/morgana.png'
    }
  ];
}

function generateFallbackCreatures(): EpicCreature[] {
  return [
    {
      id: 'dragon_local',
      name: 'Dragon (Local)',
      race: 'Legendary',
      tier: 7,
      health: 300,
      attack: 25,
      defense: 20,
      speed: 15,
      damage: [40, 60],
      cost: 5000,
      special: 'Breath of Fire - Area damage',
      spriteSize: '128x128',
      animations: ['idle', 'attack', 'death'],
      description: 'Créature légendaire des cieux',
      spriteUrl: '/assets/creatures/dragon.png'
    },
    {
      id: 'knight_local',
      name: 'Knight (Local)',
      race: 'Human',
      tier: 4,
      health: 120,
      attack: 18,
      defense: 22,
      speed: 8,
      damage: [15, 25],
      cost: 800,
      special: 'Shield Wall - Defense boost',
      spriteSize: '64x64',
      animations: ['idle', 'attack', 'defend'],
      description: 'Guerrier noble et courageux',
      spriteUrl: '/assets/creatures/knight.png'
    },
    {
      id: 'griffin_local',
      name: 'Griffin (Local)',
      race: 'Magical',
      tier: 5,
      health: 150,
      attack: 20,
      defense: 18,
      speed: 12,
      damage: [18, 30],
      cost: 1200,
      special: 'Dive Attack - Flying strike',
      spriteSize: '96x96',
      animations: ['idle', 'fly', 'attack'],
      description: 'Créature ailée majestueuse',
      spriteUrl: '/assets/creatures/griffin.png'
    }
  ];
}

function generateFallbackBuildings(): EpicBuilding[] {
  return Object.values(BUILDING_IMAGES).map(building => ({
    id: building.id,
    name: building.name,
    race: building.style,
    type: getTypeFromDescription(building.description),
    imageUrl: building.imageUrl,
    iconUrl: building.iconUrl,
    description: building.description,
    cost: {
      wood: Math.floor(Math.random() * 20) + 5,
      stone: Math.floor(Math.random() * 25) + 10,
      gold: Math.floor(Math.random() * 1500) + 500
    },
    buildTime: Math.floor(Math.random() * 8) + 3,
    level: 1
  }));
}

function getTypeFromDescription(description: string): string {
  if (description.includes('château') || description.includes('forteresse')) return 'Castle';
  if (description.includes('caserne') || description.includes('combat')) return 'Military';
  if (description.includes('tour') || description.includes('magie')) return 'Magic';
  if (description.includes('forge') || description.includes('artisan')) return 'Production';
  return 'General';
}

// 🔍 INDIVIDUAL FETCH FUNCTIONS (with fallbacks)
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

export async function fetchBuildingById(id: string): Promise<EpicBuilding | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/buildings/${id}`);
    if (!response.ok) {
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching building by ID:', error);
    return null;
  }
}

// 🌐 SERVER STATUS
export async function getServerStatus(): Promise<{
  isAvailable: boolean;
  endpoints: {
    heroes: boolean;
    creatures: boolean;
    buildings: boolean;
  };
}> {
  const isAvailable = await isServerAvailable();
  
  if (!isAvailable) {
    return {
      isAvailable: false,
      endpoints: { heroes: false, creatures: false, buildings: false }
    };
  }
  
  const endpoints = {
    heroes: await fetch(`${API_BASE_URL}/heroes`).then(r => r.ok).catch(() => false),
    creatures: await fetch(`${API_BASE_URL}/creatures`).then(r => r.ok).catch(() => false),
    buildings: await fetch(`${API_BASE_URL}/buildings`).then(r => r.ok).catch(() => false)
  };
  
  return { isAvailable, endpoints };
}

console.log('🚀 Epic Content API Service Loaded with Fallbacks!'); 