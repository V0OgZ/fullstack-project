// Types
export interface EpicCreature {
  id: string;
  name: string;
  level: number;
  attack: number;
  defense: number;
  spriteUrl?: string;
  race?: string;
  tier?: number;
  health?: number;
  speed?: number;
  cost?: number;
  special?: string;
  description?: string;
}

export interface EpicHero {
  id: string;
  name: string;
  class: string;
  level: number;
  hp: number;
  xp: number;
  portraitUrl?: string;
  gender?: string;
}

export interface EpicBuilding {
  id: string;
  name: string;
  type: string;
  level: number;
}

export interface EpicArtifact {
  id: string;
  name: string;
  power: number;
  description: string;
}

// API Functions
export const getServerStatus = async () => {
  return { 
    endpoints: { 
      heroes: true, 
      creatures: true, 
      buildings: true, 
      artifacts: true 
    } 
  };
};

export const fetchEpicCreatures = async (): Promise<EpicCreature[]> => {
  try {
    const response = await fetch('http://localhost:8080/api/creatures');
    if (!response.ok) return [];
    return await response.json();
  } catch {
    return [];
  }
};

export const fetchEpicHeroes = async (): Promise<EpicHero[]> => {
  try {
    const response = await fetch('http://localhost:8080/api/heroes');
    if (!response.ok) return [];
    return await response.json();
  } catch {
    return [];
  }
};

export const fetchEpicBuildings = async (): Promise<EpicBuilding[]> => {
  return [];
};

export const fetchEpicArtifacts = async (): Promise<EpicArtifact[]> => {
  return [];
};
