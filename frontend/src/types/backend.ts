// Types alignés avec les modèles backend Java

// Building model from backend
export interface BackendBuilding {
  id: string;
  buildingId: string;
  buildingType: string; // equivalent to 'type' in frontend
  level: number;
  castleId: string;
  playerId: string;
  gameId: string;
  constructionTime: number;
  currentUnitsAvailable: number;
  weeklyGrowth: number; // equivalent to 'maxUnitsAvailable'
  recruitableUnits: string[];
  goldCost: number;
  isConstructed: boolean;
  
  // Additional fields from Java model
  defenseBonus?: number;
  moraleBonus?: number;
  luckBonus?: number;
  knowledgeBonus?: number;
  manaBonus?: number;
  manaRegenBonus?: number;
  woodCost?: number;
  stoneCost?: number;
  oreCost?: number;
  crystalCost?: number;
  gemsCost?: number;
  sulfurCost?: number;
  constructionStartTime?: string; // ISO date
  constructionEndTime?: string; // ISO date
  lastRecruitmentTime?: string; // ISO date
  isMagicGuild?: boolean;
  guildLevel?: number;
  availableSpells?: string[];
}

// Unit model from backend
export interface BackendUnit {
  id: string;
  name: string;
  castle: string;
  tier: number;
  attack: number;
  defense: number;
  health: number;
  minDamage: number;
  maxDamage: number;
  speed: number;
  goldCost: number;
  variant?: string;
  
  // Additional fields from Java model
  growth?: number;
  aiValue?: number;
  abilities?: string[];
  woodCost?: number;
  stoneCost?: number;
  oreCost?: number;
  crystalCost?: number;
  gemsCost?: number;
  sulfurCost?: number;
}

// Utility functions to convert between frontend and backend types
export const convertBackendBuildingToFrontend = (building: BackendBuilding): any => ({
  id: building.id,
  buildingId: building.buildingId,
  name: building.buildingType, // Using type as name
  type: building.buildingType,
  level: building.level,
  castleId: building.castleId,
  playerId: building.playerId,
  gameId: building.gameId,
  constructionTime: building.constructionTime,
  currentUnitsAvailable: building.currentUnitsAvailable,
  maxUnitsAvailable: building.weeklyGrowth,
  recruitableUnits: building.recruitableUnits,
  goldCost: building.goldCost,
  isConstructed: building.isConstructed
});

export const convertBackendUnitToFrontend = (unit: BackendUnit): any => ({
  id: unit.id,
  name: unit.name,
  castle: unit.castle,
  tier: unit.tier,
  attack: unit.attack,
  defense: unit.defense,
  health: unit.health,
  damage: [unit.minDamage, unit.maxDamage],
  speed: unit.speed,
  goldCost: unit.goldCost,
  growth: unit.growth || 0,
  abilities: unit.abilities || []
}); 