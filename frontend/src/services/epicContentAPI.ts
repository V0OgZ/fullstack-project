// 🚀 SERVICE API POUR CONTENU ÉPIQUE - GAME ASSETS EDITION
// Lit directement depuis game_assets/ (système restauré par Memento)

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

export interface EpicArtifact {
  id: string;
  name: string;
  type: string;
  rarity: string;
  description: string;
  effects: string[];
  bonus: string;
  iconUrl: string;
}

// 🎯 **NOUVEAU : LECTURE DIRECTE GAME_ASSETS**
async function loadGameAssetFile(path: string): Promise<any> {
  try {
    const response = await fetch(`/public/game_assets/${path}`);
    if (!response.ok) {
      throw new Error(`Failed to load ${path}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`❌ Error loading ${path}:`, error);
    return null;
  }
}

// 🦸 **HÉROS ÉPIQUES - GAME ASSETS**
export async function fetchEpicHeroes(): Promise<EpicHero[]> {
  console.log('🔍 Fetching heroes from game_assets...');
  
  try {
    // Charger depuis game_assets/heroes/epic/epic-heroes.json
    const epicData = await loadGameAssetFile('heroes/epic/epic-heroes.json');
    // Charger depuis game_assets/heroes/extracted_heroes.json  
    const extractedData = await loadGameAssetFile('heroes/extracted_heroes.json');
    
    let allHeroes: EpicHero[] = [];
    
    // Epic heroes
    if (epicData && epicData.epic_heroes) {
      const epicHeroes = epicData.epic_heroes.map((hero: any) => ({
        id: hero.id,
        name: hero.name,
        race: hero.race || 'Unknown',
        class: hero.class || hero.title || 'Warrior',
        gender: hero.gender || 'Male',
        level: hero.level || 1,
        experience: hero.experience || 0,
        stats: {
          attack: hero.stats?.attack || hero.attack || 10,
          defense: hero.stats?.defense || hero.defense || 10,
          spellPower: hero.stats?.spellPower || hero.spell_power || 5,
          knowledge: hero.stats?.knowledge || hero.knowledge || 5,
          morale: hero.stats?.morale || 10,
          luck: hero.stats?.luck || 5
        },
        specialAbility: hero.specialAbility || hero.special_ability || hero.abilities?.[0] || 'Unknown',
        ultimateSkill: hero.ultimateSkill || hero.ultimate_skill || 'Unknown',
        backstory: hero.backstory || hero.description || 'Hero of legend',
        personality: hero.personality || 'Noble',
        portraitStyle: hero.portraitStyle || 'Classic',
        voiceType: hero.voiceType || 'Normal',
        favoriteCreatures: hero.favoriteCreatures || hero.favorite_creatures || [],
        hatedEnemies: hero.hatedEnemies || hero.hated_enemies || [],
        portraitUrl: `/assets/heroes/${hero.id || hero.name?.toLowerCase().replace(/\s+/g, '_')}.png`
      }));
      allHeroes = allHeroes.concat(epicHeroes);
    }
    
    // Extracted heroes (Anna, etc.)
    if (extractedData && extractedData.extracted_heroes) {
      const extractedHeroes = extractedData.extracted_heroes.map((hero: any) => ({
        id: hero.id,
        name: hero.name,
        race: hero.race || 'Unknown',
        class: hero.class || hero.title || 'Specialist',
        gender: hero.gender || 'Unknown',
        level: hero.level || 1,
        experience: hero.experience || 0,
        stats: {
          attack: hero.stats?.attack || hero.attack || 10,
          defense: hero.stats?.defense || hero.defense || 10,
          spellPower: hero.stats?.spellPower || hero.temporal_energy || 5,
          knowledge: hero.stats?.knowledge || hero.knowledge || 5,
          morale: hero.stats?.morale || 10,
          luck: hero.stats?.luck || 5
        },
        specialAbility: hero.specialAbility || hero.special_ability || hero.philosophy || 'Unknown',
        ultimateSkill: hero.ultimateSkill || hero.signature_items?.[0] || 'Unknown',
        backstory: hero.backstory || hero.description || 'Temporal hero',
        personality: hero.personality || hero.philosophy || 'Mysterious',
        portraitStyle: hero.portraitStyle || 'Modern',
        voiceType: hero.voiceType || 'Mystical',
        favoriteCreatures: hero.favoriteCreatures || [],
        hatedEnemies: hero.hatedEnemies || [],
        portraitUrl: `/assets/heroes/${hero.id || hero.name?.toLowerCase().replace(/\s+/g, '_')}.png`
      }));
      allHeroes = allHeroes.concat(extractedHeroes);
    }
    
    console.log(`✅ Loaded ${allHeroes.length} heroes from game_assets`);
    return allHeroes;
    
  } catch (error) {
    console.error('❌ Error loading heroes from game_assets:', error);
    return generateFallbackHeroes();
  }
}

// 🐉 **CRÉATURES ÉPIQUES - GAME ASSETS**
export async function fetchEpicCreatures(): Promise<EpicCreature[]> {
  console.log('🔍 Fetching creatures from game_assets...');
  
  try {
    // Charger depuis game_assets/creatures/
    const epicData = await loadGameAssetFile('creatures/epic/epic-creatures.json');
    const quantumData = await loadGameAssetFile('creatures/quantum/quantum-creatures.json');
    const extractedData = await loadGameAssetFile('creatures/extracted_creatures.json');
    
    let allCreatures: EpicCreature[] = [];
    
    // Epic creatures
    if (epicData && epicData.epic_creatures) {
      const epicCreatures = epicData.epic_creatures.map((creature: any) => ({
        id: creature.id,
        name: creature.name,
        race: creature.race || 'Unknown',
        tier: creature.tier || 1,
        health: creature.health || creature.stats?.health || 50,
        attack: creature.attack || creature.stats?.attack || 10,
        defense: creature.defense || creature.stats?.defense || 10,
        speed: creature.speed || creature.stats?.speed || 5,
        damage: creature.damage || [creature.attack || 10, (creature.attack || 10) + 5],
        cost: creature.cost || creature.goldCost || 100,
        special: creature.special || creature.specialAbility || creature.abilities?.[0] || 'None',
        spriteSize: creature.spriteSize || '64x64',
        animations: creature.animations || ['idle', 'attack'],
        description: creature.description || 'Epic creature',
        spriteUrl: `/assets/creatures/${creature.id || creature.name?.toLowerCase().replace(/\s+/g, '_')}.png`
      }));
      allCreatures = allCreatures.concat(epicCreatures);
    }
    
    // Quantum creatures  
    if (quantumData && quantumData.quantum_creatures) {
      const quantumCreatures = quantumData.quantum_creatures.map((creature: any) => ({
        id: creature.id,
        name: creature.name,
        race: 'Quantum',
        tier: creature.tier || 3,
        health: creature.health || creature.stats?.health || 75,
        attack: creature.attack || creature.stats?.attack || 12,
        defense: creature.defense || creature.stats?.defense || 12,
        speed: creature.speed || creature.stats?.speed || 8,
        damage: creature.damage || [creature.attack || 12, (creature.attack || 12) + 7],
        cost: creature.cost || creature.goldCost || 200,
        special: creature.special || creature.quantumAbility || 'Quantum Effect',
        spriteSize: creature.spriteSize || '64x64',
        animations: creature.animations || ['idle', 'quantum_shift'],
        description: creature.description || 'Quantum creature',
        spriteUrl: `/assets/creatures/${creature.id || creature.name?.toLowerCase().replace(/\s+/g, '_')}.png`
      }));
      allCreatures = allCreatures.concat(quantumCreatures);
    }
    
    // Extracted creatures
    if (extractedData && extractedData.extracted_creatures) {
      const extractedCreatures = extractedData.extracted_creatures.map((creature: any) => ({
        id: creature.id,
        name: creature.name,
        race: creature.race || 'Temporal',
        tier: creature.tier || 2,
        health: creature.health || creature.stats?.health || 60,
        attack: creature.attack || creature.stats?.attack || 11,
        defense: creature.defense || creature.stats?.defense || 11,
        speed: creature.speed || creature.stats?.speed || 6,
        damage: creature.damage || [creature.attack || 11, (creature.attack || 11) + 6],
        cost: creature.cost || creature.goldCost || 150,
        special: creature.special || creature.temporalAbility || 'Temporal Power',
        spriteSize: creature.spriteSize || '64x64',
        animations: creature.animations || ['idle', 'temporal_attack'],
        description: creature.description || 'Temporal creature',
        spriteUrl: `/assets/creatures/${creature.id || creature.name?.toLowerCase().replace(/\s+/g, '_')}.png`
      }));
      allCreatures = allCreatures.concat(extractedCreatures);
    }
    
    console.log(`✅ Loaded ${allCreatures.length} creatures from game_assets`);
    return allCreatures;
    
  } catch (error) {
    console.error('❌ Error loading creatures from game_assets:', error);
    return generateFallbackCreatures();
  }
}

// 🏰 **BÂTIMENTS ÉPIQUES - GAME ASSETS** 
export async function fetchEpicBuildings(): Promise<EpicBuilding[]> {
  console.log('🔍 Fetching buildings from game_assets...');
  
  try {
    const epicData = await loadGameAssetFile('buildings/epic/epic-buildings.json');
    
    let allBuildings: EpicBuilding[] = [];
    
    if (epicData && epicData.epic_buildings) {
      const epicBuildings = epicData.epic_buildings.map((building: any) => ({
        id: building.id,
        name: building.name,
        race: building.race || 'Universal',
        type: building.type || 'General',
        imageUrl: building.imageUrl || `/assets/buildings/${building.id || building.name?.toLowerCase().replace(/\s+/g, '_')}.png`,
        iconUrl: building.iconUrl || building.imageUrl || `/assets/buildings/icons/${building.id}_icon.png`,
        description: building.description || 'Epic building',
        cost: {
          wood: building.cost?.wood || building.woodCost || 10,
          stone: building.cost?.stone || building.stoneCost || 15,
          gold: building.cost?.gold || building.goldCost || 500
        },
        buildTime: building.buildTime || building.build_time || 5,
        level: building.level || 1
      }));
      allBuildings = allBuildings.concat(epicBuildings);
    }
    
    console.log(`✅ Loaded ${allBuildings.length} buildings from game_assets`);
    return allBuildings;
    
  } catch (error) {
    console.error('❌ Error loading buildings from game_assets:', error);
    return generateFallbackBuildings();
  }
}

// ⚔️ **NOUVEAU : ARTEFACTS ÉPIQUES**
export async function fetchEpicArtifacts(): Promise<EpicArtifact[]> {
  console.log('🔍 Fetching artifacts from game_assets...');
  
  try {
    const temporalData = await loadGameAssetFile('artifacts/temporal/temporal-artifacts-advanced.json');
    const classicData = await loadGameAssetFile('artifacts/artifacts.json');
    
    let allArtifacts: EpicArtifact[] = [];
    
    // Temporal artifacts
    if (temporalData && temporalData.temporal_artifacts) {
      const temporalArtifacts = temporalData.temporal_artifacts.map((artifact: any) => ({
        id: artifact.id,
        name: artifact.name,
        type: artifact.type || 'Temporal',
        rarity: artifact.rarity || 'Legendary',
        description: artifact.description || 'Temporal artifact',
        effects: artifact.effects || [],
        bonus: artifact.bonus || artifact.temporal_effect || 'Unknown effect',
        iconUrl: `/assets/artifacts/${artifact.id || artifact.name?.toLowerCase().replace(/\s+/g, '_')}.png`
      }));
      allArtifacts = allArtifacts.concat(temporalArtifacts);
    }
    
    // Classic artifacts
    if (classicData && classicData.artifacts) {
      const classicArtifacts = classicData.artifacts.map((artifact: any) => ({
        id: artifact.id,
        name: artifact.name,
        type: artifact.type || 'Classic',
        rarity: artifact.rarity || 'Epic',
        description: artifact.description || 'Classic artifact',
        effects: artifact.effects || [],
        bonus: artifact.bonus || artifact.effect || 'Unknown effect',
        iconUrl: `/assets/artifacts/${artifact.id || artifact.name?.toLowerCase().replace(/\s+/g, '_')}.png`
      }));
      allArtifacts = allArtifacts.concat(classicArtifacts);
    }
    
    console.log(`✅ Loaded ${allArtifacts.length} artifacts from game_assets`);
    return allArtifacts;
    
  } catch (error) {
    console.error('❌ Error loading artifacts from game_assets:', error);
    return [];
  }
}

// 🔧 HELPER FUNCTIONS
function isServerAvailable(): Promise<boolean> {
  return fetch(`${API_BASE_URL.replace('/api/epic', '')}/actuator/health`)
    .then(response => response.ok)
    .catch(() => false);
}

// 🔄 FALLBACK DATA GENERATORS (conservés pour compatibilité)
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
      id: 'anna_martopicker',
      name: 'Anna the Martopicker',
      race: 'Human',
      class: 'Temporal Specialist',
      gender: 'Female',
      level: 10,
      experience: 25000,
      stats: {
        attack: 20,
        defense: 18,
        spellPower: 25,
        knowledge: 22,
        morale: 12,
        luck: 15
      },
      specialAbility: 'Temporal Decay - Détruit les constructions',
      ultimateSkill: 'Martopicker Strike - Coup décisif',
      backstory: 'Glaneuse d\'Artefacts Oubliés du système temporel',
      personality: 'If you lag behind time, time lags behind you',
      portraitStyle: 'Moderne',
      voiceType: 'Mystérieux',
      favoriteCreatures: ['temporal_echo', 'quantum_ghost'],
      hatedEnemies: ['stagnation', 'lag'],
      portraitUrl: '/assets/heroes/anna.png'
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

// 🌐 **SERVER STATUS - GAME ASSETS EDITION**
export async function getServerStatus(): Promise<{
  isAvailable: boolean;
  endpoints: {
    heroes: boolean;
    creatures: boolean;
    buildings: boolean;
    artifacts?: boolean;
  };
}> {
  // Toujours retourner disponible car on lit depuis game_assets
  console.log('✅ Game Assets system always available');
  
  return {
    isAvailable: true,
    endpoints: { 
      heroes: true, 
      creatures: true, 
      buildings: true,
      artifacts: true
    }
  };
}

console.log('🚀 Epic Content API Service - GAME ASSETS EDITION Loaded!'); 
console.log('🚀 Epic Content API Service Loaded with Fallbacks!'); 