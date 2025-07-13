// Types pour le système de carte basée sur une matrice

export type TerrainType = 
  | 'grass' 
  | 'forest' 
  | 'mountain' 
  | 'water' 
  | 'desert' 
  | 'swamp' 
  | 'castle' 
  | 'mine' 
  | 'tower' 
  | 'village';

export type ResourceType = 
  | 'gold' 
  | 'wood' 
  | 'stone' 
  | 'crystal' 
  | 'ore' 
  | 'gems';

export type MapTile = {
  x: number;
  y: number;
  terrain: TerrainType;
  resources?: ResourceType[];
  movementCost: number;
  isPassable: boolean;
  hasStructure: boolean;
  structureType?: 'castle' | 'mine' | 'tower' | 'village';
  owner?: string; // ID du joueur qui possède cette case
  units?: any[]; // Unités présentes sur cette case
  hero?: any; // Héros présent sur cette case
};

export type GameMap = {
  width: number;
  height: number;
  tiles: MapTile[][];
  seed: number; // Pour la génération procédurale
  generationParams: MapGenerationParams;
};

export type MapGenerationParams = {
  seed: number;
  width: number;
  height: number;
  terrainDistribution: {
    grass: number;
    forest: number;
    mountain: number;
    water: number;
    desert: number;
    swamp: number;
  };
  structureDensity: number;
  resourceDensity: number;
  smoothingIterations: number;
};

export type MapPosition = {
  x: number;
  y: number;
};

export type MapRegion = {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  terrainType: TerrainType;
  density: number;
}; 