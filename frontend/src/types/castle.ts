// Heroes of Time and Magic - Castle & Building Types
// Temporal strategy castle management

import { Position } from './game';

export interface Castle {
  id: string;
  name: string;
  position: Position;
  ownerId: string | null;
  level: number;
  
  // Buildings and upgrades
  buildings: CastleBuilding[];
  
  // Resources and economy
  dailyIncome: {
    gold: number;
    wood: number;
    stone: number;
    mana: number;
  };
  
  // Defense and military
  garrisonSize: number;
  defenseBonus: number;
  
  // Temporal properties
  lastUpgradeTime: number;
  constructionQueue: Construction[];
  
  // Visual and UI
  appearance: 'human' | 'undead' | 'nature' | 'chaos' | 'neutral';
}

export interface CastleBuilding {
  id: string;
  type: BuildingType;
  level: number;
  position: BuildingSlot; // Position within castle
  constructedAt: number;
  
  // Effects
  effects: BuildingEffect[];
  
  // Upgrade info
  canUpgrade: boolean;
  upgradeRequirements?: UpgradeRequirement[];
}

export type BuildingType = 
  | 'TOWN_HALL'      // Main building - increases population
  | 'MARKETPLACE'    // Trade and resource conversion
  | 'BLACKSMITH'     // Equipment upgrades
  | 'BARRACKS'       // Unit recruitment
  | 'STABLE'         // Mounted units
  | 'MAGIC_TOWER'    // Spell research and mana
  | 'WALLS'          // Defense bonus
  | 'GRANARY'        // Resource storage
  | 'LIBRARY'        // Spell knowledge
  | 'TEMPORAL_ANCHOR'; // Prevents temporal interference

export type BuildingSlot = 
  | 'CENTER'         // Town Hall position
  | 'NORTH'
  | 'SOUTH' 
  | 'EAST'
  | 'WEST'
  | 'NORTHEAST'
  | 'NORTHWEST'
  | 'SOUTHEAST'
  | 'SOUTHWEST';

export interface BuildingEffect {
  type: 'RESOURCE_INCOME' | 'DEFENSE_BONUS' | 'UNIT_RECRUITMENT' | 'SPELL_RESEARCH' | 'TEMPORAL_PROTECTION';
  value: number;
  description: string;
}

export interface Construction {
  id: string;
  buildingType: BuildingType;
  targetSlot: BuildingSlot;
  startTime: number;
  completionTime: number;
  cost: ResourceCost;
  status: 'PLANNED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
}

export interface UpgradeRequirement {
  type: 'BUILDING' | 'RESOURCE' | 'TIME' | 'POPULATION';
  buildingType?: BuildingType;
  buildingLevel?: number;
  resourceType?: 'gold' | 'wood' | 'stone' | 'mana';
  amount?: number;
  description: string;
}

export interface ResourceCost {
  gold: number;
  wood: number;
  stone: number;
  mana: number;
  time: number; // Construction time in turns
}

export interface UnitType {
  id: string;
  name: string;
  tier: number; // 1-7 like classic HoMM
  cost: ResourceCost;
  
  // Combat stats
  health: number;
  attack: number;
  defense: number;
  speed: number;
  initiative: number;
  
  // Special abilities
  abilities: UnitAbility[];
  
  // Requirements
  requiredBuilding: BuildingType;
  requiredBuildingLevel: number;
}

export interface UnitAbility {
  id: string;
  name: string;
  description: string;
  type: 'PASSIVE' | 'ACTIVE' | 'TRIGGER';
  cooldown?: number;
}

export interface RecruitmentOption {
  unitType: UnitType;
  available: number; // How many can be recruited
  weeklyGrowth: number; // How many spawn per week
  costMultiplier: number; // Cost modifier based on castle level
}

// Castle management actions
export interface CastleAction {
  type: 'BUILD' | 'UPGRADE' | 'RECRUIT' | 'RESEARCH' | 'TRADE';
  castleId: string;
  buildingType?: BuildingType;
  buildingSlot?: BuildingSlot;
  unitTypeId?: string;
  quantity?: number;
  cost: ResourceCost;
  plannedTime: number;
}

// Predefined castle configurations
export const CASTLE_TEMPLATES: Record<string, Partial<Castle>> = {
  HUMAN_TOWN: {
    name: 'Human Settlement',
    appearance: 'human',
    buildings: [
      {
        id: 'town_hall',
        type: 'TOWN_HALL',
        level: 1,
        position: 'CENTER',
        constructedAt: 0,
        effects: [
          { type: 'RESOURCE_INCOME', value: 1000, description: '+1000 gold per day' }
        ],
        canUpgrade: true
      },
      {
        id: 'basic_walls',
        type: 'WALLS',
        level: 1,
        position: 'NORTH',
        constructedAt: 0,
        effects: [
          { type: 'DEFENSE_BONUS', value: 25, description: '+25% defense in siege' }
        ],
        canUpgrade: true
      }
    ]
  },
  
  NEUTRAL_FORT: {
    name: 'Abandoned Fort',
    appearance: 'neutral',
    buildings: [
      {
        id: 'ruined_hall',
        type: 'TOWN_HALL',
        level: 1,
        position: 'CENTER',
        constructedAt: 0,
        effects: [
          { type: 'RESOURCE_INCOME', value: 500, description: '+500 gold per day' }
        ],
        canUpgrade: true
      }
    ]
  }
};

// Building upgrade trees
export const BUILDING_UPGRADES: Record<BuildingType, UpgradeRequirement[]> = {
  TOWN_HALL: [
    { type: 'RESOURCE', resourceType: 'gold', amount: 5000, description: 'Requires 5000 gold' },
    { type: 'RESOURCE', resourceType: 'wood', amount: 20, description: 'Requires 20 wood' },
    { type: 'TIME', amount: 3, description: 'Takes 3 days to build' }
  ],
  
  MARKETPLACE: [
    { type: 'BUILDING', buildingType: 'TOWN_HALL', buildingLevel: 1, description: 'Requires Town Hall' },
    { type: 'RESOURCE', resourceType: 'gold', amount: 2500, description: 'Requires 2500 gold' }
  ],
  
  BLACKSMITH: [
    { type: 'BUILDING', buildingType: 'TOWN_HALL', buildingLevel: 1, description: 'Requires Town Hall' },
    { type: 'RESOURCE', resourceType: 'gold', amount: 3000, description: 'Requires 3000 gold' },
    { type: 'RESOURCE', resourceType: 'stone', amount: 10, description: 'Requires 10 stone' }
  ],
  
  BARRACKS: [
    { type: 'BUILDING', buildingType: 'TOWN_HALL', buildingLevel: 1, description: 'Requires Town Hall' },
    { type: 'RESOURCE', resourceType: 'gold', amount: 2000, description: 'Requires 2000 gold' },
    { type: 'RESOURCE', resourceType: 'wood', amount: 15, description: 'Requires 15 wood' }
  ],
  
  STABLE: [
    { type: 'BUILDING', buildingType: 'BARRACKS', buildingLevel: 1, description: 'Requires Barracks' },
    { type: 'RESOURCE', resourceType: 'gold', amount: 4000, description: 'Requires 4000 gold' },
    { type: 'RESOURCE', resourceType: 'wood', amount: 25, description: 'Requires 25 wood' }
  ],
  
  MAGIC_TOWER: [
    { type: 'BUILDING', buildingType: 'TOWN_HALL', buildingLevel: 2, description: 'Requires Town Hall Level 2' },
    { type: 'RESOURCE', resourceType: 'gold', amount: 6000, description: 'Requires 6000 gold' },
    { type: 'RESOURCE', resourceType: 'mana', amount: 50, description: 'Requires 50 mana crystals' }
  ],
  
  WALLS: [
    { type: 'BUILDING', buildingType: 'TOWN_HALL', buildingLevel: 1, description: 'Requires Town Hall' },
    { type: 'RESOURCE', resourceType: 'gold', amount: 1500, description: 'Requires 1500 gold' },
    { type: 'RESOURCE', resourceType: 'stone', amount: 20, description: 'Requires 20 stone' }
  ],
  
  GRANARY: [
    { type: 'BUILDING', buildingType: 'TOWN_HALL', buildingLevel: 1, description: 'Requires Town Hall' },
    { type: 'RESOURCE', resourceType: 'gold', amount: 1000, description: 'Requires 1000 gold' },
    { type: 'RESOURCE', resourceType: 'wood', amount: 10, description: 'Requires 10 wood' }
  ],
  
  LIBRARY: [
    { type: 'BUILDING', buildingType: 'MAGIC_TOWER', buildingLevel: 1, description: 'Requires Magic Tower' },
    { type: 'RESOURCE', resourceType: 'gold', amount: 3500, description: 'Requires 3500 gold' },
    { type: 'RESOURCE', resourceType: 'mana', amount: 25, description: 'Requires 25 mana crystals' }
  ],
  
  TEMPORAL_ANCHOR: [
    { type: 'BUILDING', buildingType: 'MAGIC_TOWER', buildingLevel: 2, description: 'Requires Magic Tower Level 2' },
    { type: 'RESOURCE', resourceType: 'gold', amount: 10000, description: 'Requires 10000 gold' },
    { type: 'RESOURCE', resourceType: 'mana', amount: 100, description: 'Requires 100 mana crystals' },
    { type: 'TIME', amount: 7, description: 'Takes 7 days to build' }
  ]
}; 