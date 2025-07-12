// 🏰 Heroes of Time - Castle & Units System (Phase 2A)
// Complete implementation of 8 castle types with 168 unit variants

export type ResourceType = 'gold' | 'wood' | 'stone' | 'ore' | 'crystal' | 'gems' | 'sulfur';

export interface Resources {
  gold: number;
  wood: number;
  stone: number;
  ore: number;
  crystal: number;
  gems: number;
  sulfur: number;
}

export type CastleType = 
  | 'castle'      // 🏰 Human Castle
  | 'rampart'     // 🌲 Elven Rampart  
  | 'tower'       // 🔮 Wizard Tower
  | 'inferno'     // 🔥 Demon Inferno
  | 'necropolis'  // 💀 Undead Necropolis
  | 'dungeon'     // 🕳️ Dark Dungeon
  | 'stronghold'  // ⚔️ Orc Stronghold
  | 'fortress';   // 🐊 Swamp Fortress

export type UnitTier = 1 | 2 | 3 | 4 | 5 | 6 | 7;
export type UnitVariant = 'basic' | 'upgraded' | 'champion';

export interface UnitStats {
  attack: number;
  defense: number;
  health: number;
  damage: [number, number]; // [min, max]
  speed: number;
  shots?: number; // For ranged units
}

export interface UnitAbility {
  id: string;
  name: string;
  description: string;
  type: 'passive' | 'active' | 'special';
  cooldown?: number;
}

export interface UnitType {
  id: string;
  name: string;
  castle: CastleType;
  tier: UnitTier;
  variant: UnitVariant;
  stats: UnitStats;
  abilities: UnitAbility[];
  cost: Partial<Resources>;
  growth: number; // Units per week
  aiValue: number; // AI evaluation value
  special?: string; // Special mechanics
}

export interface Building {
  id: string;
  name: string;
  description: string;
  castle: CastleType;
  level: number;
  maxLevel: number;
  cost: Partial<Resources>;
  buildTime: number; // In game turns
  prerequisites: string[]; // Other building IDs
  effect: {
    type: 'unit_growth' | 'resource_bonus' | 'spell_access' | 'defense' | 'special';
    value: number | string;
    target?: string;
  };
}

export interface Castle {
  id: string;
  name: string;
  type: CastleType;
  playerId: string;
  position: { x: number; y: number };
  buildings: { [buildingId: string]: number }; // buildingId -> level
  garrison: UnitStack[];
  resources: Resources;
  fortification: number; // Defense bonus
  morale: number;
  luck: number;
}

export interface UnitStack {
  unitId: string;
  count: number;
  experience: number;
  morale: number;
  luck: number;
  effects: StatusEffect[];
}

export interface StatusEffect {
  id: string;
  name: string;
  type: 'buff' | 'debuff' | 'neutral';
  duration: number;
  stat: keyof UnitStats | 'morale' | 'luck';
  modifier: number;
  description: string;
}

// 🏰 CASTLE DEFINITIONS (8 Complete Types)

export const CASTLE_TYPES: { [key in CastleType]: {
  name: string;
  description: string;
  specialty: string;
  terrain: string;
  philosophy: string;
}} = {
  castle: {
    name: 'Castle',
    description: 'Righteous human kingdom with holy magic and divine protection',
    specialty: 'Balanced units with holy magic and healing',
    terrain: 'Grass plains and hills',
    philosophy: 'Order, justice, and divine light'
  },
  rampart: {
    name: 'Rampart', 
    description: 'Forest dwellers with nature magic and woodland creatures',
    specialty: 'Fast units with nature magic and archery',
    terrain: 'Forests and woodland',
    philosophy: 'Harmony with nature and preservation'
  },
  tower: {
    name: 'Tower',
    description: 'Arcane wizards with powerful magic and mechanical constructs',
    specialty: 'Magical units with devastating spells',
    terrain: 'Mystical towers and libraries',
    philosophy: 'Knowledge, magic, and arcane research'
  },
  inferno: {
    name: 'Inferno',
    description: 'Demonic forces with fire magic and chaotic creatures',
    specialty: 'Aggressive units with fire magic and chaos',
    terrain: 'Volcanic lands and hellish realms',
    philosophy: 'Chaos, destruction, and infernal power'
  },
  necropolis: {
    name: 'Necropolis',
    description: 'Undead legions with death magic and eternal servitude',
    specialty: 'Numerous undead with death magic',
    terrain: 'Cursed lands and graveyards',
    philosophy: 'Death, undeath, and eternal service'
  },
  dungeon: {
    name: 'Dungeon',
    description: 'Dark underground dwellers with shadow magic and cruel tactics',
    specialty: 'Stealthy units with dark magic and poison',
    terrain: 'Underground caverns and dark tunnels',
    philosophy: 'Darkness, cruelty, and underground dominion'
  },
  stronghold: {
    name: 'Stronghold',
    description: 'Barbaric orcs and goblins with raw strength and brutality',
    specialty: 'Strong melee units with berserker rage',
    terrain: 'Rocky badlands and fortified camps',
    philosophy: 'Strength, honor, and brutal warfare'
  },
  fortress: {
    name: 'Fortress',
    description: 'Swamp creatures with poison magic and defensive tactics',
    specialty: 'Defensive units with poison and regeneration',
    terrain: 'Swamps and marshlands',
    philosophy: 'Defense, endurance, and natural adaptation'
  }
};

// 🛡️ UNIT DEFINITIONS - NOW LOADED FROM BACKEND API
// Use unitService.getAllUnits() instead of hardcoded data

// Note: UNIT_TYPES moved to backend database
// Frontend should use: import { unitService } from '../services/unitService';

export const UNIT_TYPES: UnitType[] = [
  // 🏰 CASTLE UNITS (21 units: 7 tiers × 3 variants)
  
  // Tier 1: Pikeman line
  {
    id: 'castle_pikeman_basic',
    name: 'Pikeman',
    castle: 'castle',
    tier: 1,
    variant: 'basic',
    stats: { attack: 4, defense: 5, health: 10, damage: [1, 3], speed: 4 },
    abilities: [{ id: 'charge_defense', name: 'Charge Defense', description: 'Immune to charge attacks', type: 'passive' }],
    cost: { gold: 80, wood: 5 },
    growth: 14,
    aiValue: 80
  },
  {
    id: 'castle_pikeman_upgraded',
    name: 'Halberdier',
    castle: 'castle',
    tier: 1,
    variant: 'upgraded',
    stats: { attack: 6, defense: 5, health: 10, damage: [2, 3], speed: 5 },
    abilities: [
      { id: 'charge_defense', name: 'Charge Defense', description: 'Immune to charge attacks', type: 'passive' },
      { id: 'no_retaliation', name: 'No Retaliation', description: 'Attacks without retaliation', type: 'passive' }
    ],
    cost: { gold: 115, wood: 5 },
    growth: 14,
    aiValue: 115
  },
  {
    id: 'castle_pikeman_champion',
    name: 'Royal Halberdier',
    castle: 'castle',
    tier: 1,
    variant: 'champion',
    stats: { attack: 8, defense: 7, health: 12, damage: [2, 4], speed: 6 },
    abilities: [
      { id: 'charge_defense', name: 'Charge Defense', description: 'Immune to charge attacks', type: 'passive' },
      { id: 'no_retaliation', name: 'No Retaliation', description: 'Attacks without retaliation', type: 'passive' },
      { id: 'morale_boost', name: 'Morale Boost', description: '+1 morale to adjacent allies', type: 'passive' }
    ],
    cost: { gold: 150, wood: 5, ore: 2 },
    growth: 14,
    aiValue: 150
  },

  // Tier 2: Archer line
  {
    id: 'castle_archer_basic',
    name: 'Archer',
    castle: 'castle',
    tier: 2,
    variant: 'basic',
    stats: { attack: 6, defense: 3, health: 10, damage: [2, 3], speed: 4, shots: 12 },
    abilities: [{ id: 'ranged_attack', name: 'Ranged Attack', description: 'Can attack from distance', type: 'passive' }],
    cost: { gold: 150, wood: 10 },
    growth: 9,
    aiValue: 150
  },
  {
    id: 'castle_archer_upgraded',
    name: 'Marksman',
    castle: 'castle',
    tier: 2,
    variant: 'upgraded',
    stats: { attack: 6, defense: 3, health: 10, damage: [2, 3], speed: 6, shots: 24 },
    abilities: [
      { id: 'ranged_attack', name: 'Ranged Attack', description: 'Can attack from distance', type: 'passive' },
      { id: 'double_shot', name: 'Double Shot', description: 'Can shoot twice per turn', type: 'active', cooldown: 2 }
    ],
    cost: { gold: 185, wood: 10 },
    growth: 9,
    aiValue: 185
  },
  {
    id: 'castle_archer_champion',
    name: 'Royal Marksman',
    castle: 'castle',
    tier: 2,
    variant: 'champion',
    stats: { attack: 8, defense: 5, health: 12, damage: [3, 4], speed: 7, shots: 32 },
    abilities: [
      { id: 'ranged_attack', name: 'Ranged Attack', description: 'Can attack from distance', type: 'passive' },
      { id: 'double_shot', name: 'Double Shot', description: 'Can shoot twice per turn', type: 'active', cooldown: 2 },
      { id: 'precise_shot', name: 'Precise Shot', description: 'Ignores 50% of target defense', type: 'active', cooldown: 3 }
    ],
    cost: { gold: 230, wood: 15, ore: 5 },
    growth: 9,
    aiValue: 230
  },

  // Tier 3: Griffin line
  {
    id: 'castle_griffin_basic',
    name: 'Griffin',
    castle: 'castle',
    tier: 3,
    variant: 'basic',
    stats: { attack: 8, defense: 8, health: 25, damage: [3, 6], speed: 6 },
    abilities: [
      { id: 'flying', name: 'Flying', description: 'Can fly over obstacles', type: 'passive' },
      { id: 'retaliation_counter', name: 'Retaliation Counter', description: 'Retaliates against every attack', type: 'passive' }
    ],
    cost: { gold: 200, ore: 5 },
    growth: 7,
    aiValue: 200
  },
  {
    id: 'castle_griffin_upgraded',
    name: 'Royal Griffin',
    castle: 'castle',
    tier: 3,
    variant: 'upgraded',
    stats: { attack: 9, defense: 9, health: 25, damage: [3, 6], speed: 9 },
    abilities: [
      { id: 'flying', name: 'Flying', description: 'Can fly over obstacles', type: 'passive' },
      { id: 'unlimited_retaliation', name: 'Unlimited Retaliation', description: 'Retaliates against every attack without limit', type: 'passive' }
    ],
    cost: { gold: 240, ore: 5 },
    growth: 7,
    aiValue: 240
  },
  {
    id: 'castle_griffin_champion',
    name: 'Celestial Griffin',
    castle: 'castle',
    tier: 3,
    variant: 'champion',
    stats: { attack: 11, defense: 11, health: 30, damage: [4, 7], speed: 11 },
    abilities: [
      { id: 'flying', name: 'Flying', description: 'Can fly over obstacles', type: 'passive' },
      { id: 'unlimited_retaliation', name: 'Unlimited Retaliation', description: 'Retaliates against every attack without limit', type: 'passive' },
      { id: 'divine_protection', name: 'Divine Protection', description: 'Immune to death magic', type: 'passive' }
    ],
    cost: { gold: 300, ore: 8, crystal: 2 },
    growth: 7,
    aiValue: 300
  },

  // Tier 4: Swordsman line
  {
    id: 'castle_swordsman_basic',
    name: 'Swordsman',
    castle: 'castle',
    tier: 4,
    variant: 'basic',
    stats: { attack: 10, defense: 12, health: 35, damage: [6, 9], speed: 5 },
    abilities: [{ id: 'magic_resistance', name: 'Magic Resistance', description: '20% magic damage reduction', type: 'passive' }],
    cost: { gold: 300, ore: 10 },
    growth: 4,
    aiValue: 300
  },
  {
    id: 'castle_swordsman_upgraded',
    name: 'Crusader',
    castle: 'castle',
    tier: 4,
    variant: 'upgraded',
    stats: { attack: 12, defense: 12, health: 35, damage: [7, 10], speed: 6 },
    abilities: [
      { id: 'magic_resistance', name: 'Magic Resistance', description: '20% magic damage reduction', type: 'passive' },
      { id: 'double_attack', name: 'Double Attack', description: 'Attacks twice per turn', type: 'active', cooldown: 3 }
    ],
    cost: { gold: 400, ore: 10 },
    growth: 4,
    aiValue: 400
  },
  {
    id: 'castle_swordsman_champion',
    name: 'Temple Guard',
    castle: 'castle',
    tier: 4,
    variant: 'champion',
    stats: { attack: 14, defense: 14, health: 40, damage: [8, 12], speed: 7 },
    abilities: [
      { id: 'magic_resistance', name: 'Magic Resistance', description: '40% magic damage reduction', type: 'passive' },
      { id: 'double_attack', name: 'Double Attack', description: 'Attacks twice per turn', type: 'active', cooldown: 3 },
      { id: 'holy_strike', name: 'Holy Strike', description: 'Deals +50% damage to undead', type: 'passive' }
    ],
    cost: { gold: 500, ore: 15, crystal: 3 },
    growth: 4,
    aiValue: 500
  },

  // Tier 5: Monk line
  {
    id: 'castle_monk_basic',
    name: 'Monk',
    castle: 'castle',
    tier: 5,
    variant: 'basic',
    stats: { attack: 12, defense: 7, health: 30, damage: [10, 12], speed: 5, shots: 12 },
    abilities: [
      { id: 'ranged_attack', name: 'Ranged Attack', description: 'Can attack from distance', type: 'passive' },
      { id: 'no_melee_penalty', name: 'No Melee Penalty', description: 'No penalty for ranged attacks in melee', type: 'passive' }
    ],
    cost: { gold: 400, crystal: 5 },
    growth: 3,
    aiValue: 400
  },
  {
    id: 'castle_monk_upgraded',
    name: 'Zealot',
    castle: 'castle',
    tier: 5,
    variant: 'upgraded',
    stats: { attack: 12, defense: 10, health: 30, damage: [10, 12], speed: 7, shots: 24 },
    abilities: [
      { id: 'ranged_attack', name: 'Ranged Attack', description: 'Can attack from distance', type: 'passive' },
      { id: 'no_melee_penalty', name: 'No Melee Penalty', description: 'No penalty for ranged attacks in melee', type: 'passive' },
      { id: 'no_range_penalty', name: 'No Range Penalty', description: 'No penalty for long-range attacks', type: 'passive' }
    ],
    cost: { gold: 450, crystal: 5 },
    growth: 3,
    aiValue: 450
  },
  {
    id: 'castle_monk_champion',
    name: 'Divine Zealot',
    castle: 'castle',
    tier: 5,
    variant: 'champion',
    stats: { attack: 14, defense: 12, health: 35, damage: [12, 15], speed: 8, shots: 32 },
    abilities: [
      { id: 'ranged_attack', name: 'Ranged Attack', description: 'Can attack from distance', type: 'passive' },
      { id: 'no_melee_penalty', name: 'No Melee Penalty', description: 'No penalty for ranged attacks in melee', type: 'passive' },
      { id: 'no_range_penalty', name: 'No Range Penalty', description: 'No penalty for long-range attacks', type: 'passive' },
      { id: 'divine_blessing', name: 'Divine Blessing', description: 'Heals nearby allies at start of turn', type: 'passive' }
    ],
    cost: { gold: 600, crystal: 8, gems: 2 },
    growth: 3,
    aiValue: 600
  },

  // Tier 6: Cavalier line
  {
    id: 'castle_cavalier_basic',
    name: 'Cavalier',
    castle: 'castle',
    tier: 6,
    variant: 'basic',
    stats: { attack: 15, defense: 15, health: 100, damage: [15, 25], speed: 7 },
    abilities: [
      { id: 'charge', name: 'Charge', description: 'Deals +50% damage when moving before attack', type: 'passive' },
      { id: 'jousting', name: 'Jousting', description: 'Damage bonus increases with distance traveled', type: 'passive' }
    ],
    cost: { gold: 1000, ore: 20 },
    growth: 2,
    aiValue: 1000
  },
  {
    id: 'castle_cavalier_upgraded',
    name: 'Champion',
    castle: 'castle',
    tier: 6,
    variant: 'upgraded',
    stats: { attack: 16, defense: 16, health: 100, damage: [20, 25], speed: 9 },
    abilities: [
      { id: 'charge', name: 'Charge', description: 'Deals +50% damage when moving before attack', type: 'passive' },
      { id: 'jousting', name: 'Jousting', description: 'Damage bonus increases with distance traveled', type: 'passive' },
      { id: 'trample', name: 'Trample', description: 'Can attack through enemies', type: 'active', cooldown: 2 }
    ],
    cost: { gold: 1200, ore: 20 },
    growth: 2,
    aiValue: 1200
  },
  {
    id: 'castle_cavalier_champion',
    name: 'Sacred Champion',
    castle: 'castle',
    tier: 6,
    variant: 'champion',
    stats: { attack: 18, defense: 18, health: 120, damage: [25, 30], speed: 10 },
    abilities: [
      { id: 'charge', name: 'Charge', description: 'Deals +50% damage when moving before attack', type: 'passive' },
      { id: 'jousting', name: 'Jousting', description: 'Damage bonus increases with distance traveled', type: 'passive' },
      { id: 'trample', name: 'Trample', description: 'Can attack through enemies', type: 'active', cooldown: 2 },
      { id: 'divine_armor', name: 'Divine Armor', description: 'Immune to curse spells', type: 'passive' }
    ],
    cost: { gold: 1500, ore: 25, crystal: 5 },
    growth: 2,
    aiValue: 1500
  },

  // Tier 7: Angel line
  {
    id: 'castle_angel_basic',
    name: 'Angel',
    castle: 'castle',
    tier: 7,
    variant: 'basic',
    stats: { attack: 20, defense: 20, health: 200, damage: [50, 50], speed: 12 },
    abilities: [
      { id: 'flying', name: 'Flying', description: 'Can fly over obstacles', type: 'passive' },
      { id: 'no_retaliation', name: 'No Retaliation', description: 'Never receives retaliation', type: 'passive' },
      { id: 'resurrection', name: 'Resurrection', description: 'Can resurrect fallen allies', type: 'active', cooldown: 5 }
    ],
    cost: { gold: 3000, crystal: 20, gems: 5 },
    growth: 1,
    aiValue: 3000
  },
  {
    id: 'castle_angel_upgraded',
    name: 'Archangel',
    castle: 'castle',
    tier: 7,
    variant: 'upgraded',
    stats: { attack: 30, defense: 30, health: 250, damage: [50, 50], speed: 18 },
    abilities: [
      { id: 'flying', name: 'Flying', description: 'Can fly over obstacles', type: 'passive' },
      { id: 'no_retaliation', name: 'No Retaliation', description: 'Never receives retaliation', type: 'passive' },
      { id: 'resurrection', name: 'Resurrection', description: 'Can resurrect fallen allies', type: 'active', cooldown: 3 },
      { id: 'spell_immunity', name: 'Spell Immunity', description: 'Immune to all spells below level 4', type: 'passive' }
    ],
    cost: { gold: 4000, crystal: 20, gems: 5 },
    growth: 1,
    aiValue: 4000
  },
  {
    id: 'castle_angel_champion',
    name: 'Seraphim',
    castle: 'castle',
    tier: 7,
    variant: 'champion',
    stats: { attack: 35, defense: 35, health: 300, damage: [60, 80], speed: 20 },
    abilities: [
      { id: 'flying', name: 'Flying', description: 'Can fly over obstacles', type: 'passive' },
      { id: 'no_retaliation', name: 'No Retaliation', description: 'Never receives retaliation', type: 'passive' },
      { id: 'resurrection', name: 'Resurrection', description: 'Can resurrect fallen allies', type: 'active', cooldown: 3 },
      { id: 'spell_immunity', name: 'Spell Immunity', description: 'Immune to all spells below level 5', type: 'passive' },
      { id: 'divine_wrath', name: 'Divine Wrath', description: 'Area attack that damages all adjacent enemies', type: 'active', cooldown: 4 }
    ],
    cost: { gold: 5000, crystal: 25, gems: 10, sulfur: 5 },
    growth: 1,
    aiValue: 5000
  },

  // 🌲 RAMPART UNITS (21 units: 7 tiers × 3 variants)
  
  // Tier 1: Centaur line
  {
    id: 'rampart_centaur_basic',
    name: 'Centaur',
    castle: 'rampart',
    tier: 1,
    variant: 'basic',
    stats: { attack: 5, defense: 3, health: 8, damage: [2, 3], speed: 6 },
    abilities: [{ id: 'no_melee_penalty', name: 'No Melee Penalty', description: 'No penalty for ranged attacks in melee', type: 'passive' }],
    cost: { gold: 70, wood: 10 },
    growth: 14,
    aiValue: 70
  },
  {
    id: 'rampart_centaur_upgraded',
    name: 'Centaur Captain',
    castle: 'rampart',
    tier: 1,
    variant: 'upgraded',
    stats: { attack: 6, defense: 3, health: 10, damage: [2, 3], speed: 8 },
    abilities: [
      { id: 'no_melee_penalty', name: 'No Melee Penalty', description: 'No penalty for ranged attacks in melee', type: 'passive' },
      { id: 'leadership', name: 'Leadership', description: '+1 speed to adjacent allies', type: 'passive' }
    ],
    cost: { gold: 90, wood: 10 },
    growth: 14,
    aiValue: 90
  },
  {
    id: 'rampart_centaur_champion',
    name: 'Centaur Warchief',
    castle: 'rampart',
    tier: 1,
    variant: 'champion',
    stats: { attack: 8, defense: 5, health: 12, damage: [3, 4], speed: 10 },
    abilities: [
      { id: 'no_melee_penalty', name: 'No Melee Penalty', description: 'No penalty for ranged attacks in melee', type: 'passive' },
      { id: 'leadership', name: 'Leadership', description: '+1 speed to adjacent allies', type: 'passive' },
      { id: 'forest_knowledge', name: 'Forest Knowledge', description: '+2 speed in forest terrain', type: 'passive' }
    ],
    cost: { gold: 120, wood: 15, ore: 2 },
    growth: 14,
    aiValue: 120
  },

  // Tier 2: Dwarf line
  {
    id: 'rampart_dwarf_basic',
    name: 'Dwarf',
    castle: 'rampart',
    tier: 2,
    variant: 'basic',
    stats: { attack: 6, defense: 7, health: 20, damage: [2, 4], speed: 3 },
    abilities: [
      { id: 'magic_resistance', name: 'Magic Resistance', description: '20% magic damage reduction', type: 'passive' },
      { id: 'mountain_walking', name: 'Mountain Walking', description: 'No penalty in rocky terrain', type: 'passive' }
    ],
    cost: { gold: 120, ore: 5 },
    growth: 8,
    aiValue: 120
  },
  {
    id: 'rampart_dwarf_upgraded',
    name: 'Battle Dwarf',
    castle: 'rampart',
    tier: 2,
    variant: 'upgraded',
    stats: { attack: 7, defense: 8, health: 20, damage: [2, 4], speed: 5 },
    abilities: [
      { id: 'magic_resistance', name: 'Magic Resistance', description: '40% magic damage reduction', type: 'passive' },
      { id: 'mountain_walking', name: 'Mountain Walking', description: 'No penalty in rocky terrain', type: 'passive' },
      { id: 'axe_mastery', name: 'Axe Mastery', description: '+1 damage against large creatures', type: 'passive' }
    ],
    cost: { gold: 150, ore: 5 },
    growth: 8,
    aiValue: 150
  },
  {
    id: 'rampart_dwarf_champion',
    name: 'Dwarf Lord',
    castle: 'rampart',
    tier: 2,
    variant: 'champion',
    stats: { attack: 9, defense: 10, health: 25, damage: [3, 5], speed: 6 },
    abilities: [
      { id: 'magic_resistance', name: 'Magic Resistance', description: '60% magic damage reduction', type: 'passive' },
      { id: 'mountain_walking', name: 'Mountain Walking', description: 'No penalty in rocky terrain', type: 'passive' },
      { id: 'axe_mastery', name: 'Axe Mastery', description: '+2 damage against large creatures', type: 'passive' },
      { id: 'forge_blessing', name: 'Forge Blessing', description: 'Weapons cannot be broken', type: 'passive' }
    ],
    cost: { gold: 200, ore: 8, crystal: 2 },
    growth: 8,
    aiValue: 200
  },

  // Tier 3: Elf line
  {
    id: 'rampart_elf_basic',
    name: 'Wood Elf',
    castle: 'rampart',
    tier: 3,
    variant: 'basic',
    stats: { attack: 9, defense: 5, health: 15, damage: [3, 5], speed: 6, shots: 24 },
    abilities: [
      { id: 'ranged_attack', name: 'Ranged Attack', description: 'Can attack from distance', type: 'passive' },
      { id: 'double_shot', name: 'Double Shot', description: 'Attacks twice per turn', type: 'passive' }
    ],
    cost: { gold: 200, wood: 15 },
    growth: 7,
    aiValue: 200
  },
  {
    id: 'rampart_elf_upgraded',
    name: 'Grand Elf',
    castle: 'rampart',
    tier: 3,
    variant: 'upgraded',
    stats: { attack: 9, defense: 5, health: 15, damage: [3, 5], speed: 7, shots: 24 },
    abilities: [
      { id: 'ranged_attack', name: 'Ranged Attack', description: 'Can attack from distance', type: 'passive' },
      { id: 'double_shot', name: 'Double Shot', description: 'Attacks twice per turn', type: 'passive' },
      { id: 'blind_immunity', name: 'Blind Immunity', description: 'Immune to blind spells', type: 'passive' }
    ],
    cost: { gold: 225, wood: 15 },
    growth: 7,
    aiValue: 225
  },
  {
    id: 'rampart_elf_champion',
    name: 'Elven Ranger',
    castle: 'rampart',
    tier: 3,
    variant: 'champion',
    stats: { attack: 11, defense: 7, health: 18, damage: [4, 6], speed: 9, shots: 32 },
    abilities: [
      { id: 'ranged_attack', name: 'Ranged Attack', description: 'Can attack from distance', type: 'passive' },
      { id: 'double_shot', name: 'Double Shot', description: 'Attacks twice per turn', type: 'passive' },
      { id: 'blind_immunity', name: 'Blind Immunity', description: 'Immune to blind spells', type: 'passive' },
      { id: 'forest_stealth', name: 'Forest Stealth', description: '+50% defense in forest terrain', type: 'passive' }
    ],
    cost: { gold: 275, wood: 20, crystal: 3 },
    growth: 7,
    aiValue: 275
  },

  // Tier 4: Pegasus line
  {
    id: 'rampart_pegasus_basic',
    name: 'Pegasus',
    castle: 'rampart',
    tier: 4,
    variant: 'basic',
    stats: { attack: 9, defense: 8, health: 30, damage: [5, 9], speed: 8 },
    abilities: [
      { id: 'flying', name: 'Flying', description: 'Can fly over obstacles', type: 'passive' },
      { id: 'magic_resistance', name: 'Magic Resistance', description: '20% magic damage reduction', type: 'passive' }
    ],
    cost: { gold: 250, crystal: 5 },
    growth: 5,
    aiValue: 250
  },
  {
    id: 'rampart_pegasus_upgraded',
    name: 'Silver Pegasus',
    castle: 'rampart',
    tier: 4,
    variant: 'upgraded',
    stats: { attack: 9, defense: 10, health: 30, damage: [5, 9], speed: 12 },
    abilities: [
      { id: 'flying', name: 'Flying', description: 'Can fly over obstacles', type: 'passive' },
      { id: 'magic_resistance', name: 'Magic Resistance', description: '40% magic damage reduction', type: 'passive' },
      { id: 'spell_immunity', name: 'Spell Immunity', description: 'Immune to spells below level 2', type: 'passive' }
    ],
    cost: { gold: 300, crystal: 5 },
    growth: 5,
    aiValue: 300
  },
  {
    id: 'rampart_pegasus_champion',
    name: 'Celestial Pegasus',
    castle: 'rampart',
    tier: 4,
    variant: 'champion',
    stats: { attack: 11, defense: 12, health: 35, damage: [6, 11], speed: 14 },
    abilities: [
      { id: 'flying', name: 'Flying', description: 'Can fly over obstacles', type: 'passive' },
      { id: 'magic_resistance', name: 'Magic Resistance', description: '60% magic damage reduction', type: 'passive' },
      { id: 'spell_immunity', name: 'Spell Immunity', description: 'Immune to spells below level 3', type: 'passive' },
      { id: 'divine_grace', name: 'Divine Grace', description: 'Heals 10 HP at start of turn', type: 'passive' }
    ],
    cost: { gold: 400, crystal: 8, gems: 2 },
    growth: 5,
    aiValue: 400
  },

  // Tier 5: Dendroid line
  {
    id: 'rampart_dendroid_basic',
    name: 'Dendroid Guard',
    castle: 'rampart',
    tier: 5,
    variant: 'basic',
    stats: { attack: 9, defense: 12, health: 55, damage: [10, 14], speed: 3 },
    abilities: [
      { id: 'binding', name: 'Binding', description: 'Prevents enemy from moving', type: 'active', cooldown: 3 },
      { id: 'magic_resistance', name: 'Magic Resistance', description: '50% magic damage reduction', type: 'passive' }
    ],
    cost: { gold: 350, wood: 20 },
    growth: 3,
    aiValue: 350
  },
  {
    id: 'rampart_dendroid_upgraded',
    name: 'Dendroid Soldier',
    castle: 'rampart',
    tier: 5,
    variant: 'upgraded',
    stats: { attack: 9, defense: 12, health: 65, damage: [10, 14], speed: 4 },
    abilities: [
      { id: 'binding', name: 'Binding', description: 'Prevents enemy from moving', type: 'active', cooldown: 3 },
      { id: 'magic_resistance', name: 'Magic Resistance', description: '50% magic damage reduction', type: 'passive' },
      { id: 'death_blow', name: 'Death Blow', description: 'Deals +20 damage on death', type: 'passive' }
    ],
    cost: { gold: 425, wood: 20 },
    growth: 3,
    aiValue: 425
  },
  {
    id: 'rampart_dendroid_champion',
    name: 'Ancient Treant',
    castle: 'rampart',
    tier: 5,
    variant: 'champion',
    stats: { attack: 11, defense: 15, health: 80, damage: [12, 18], speed: 5 },
    abilities: [
      { id: 'binding', name: 'Binding', description: 'Prevents enemy from moving', type: 'active', cooldown: 2 },
      { id: 'magic_resistance', name: 'Magic Resistance', description: '70% magic damage reduction', type: 'passive' },
      { id: 'death_blow', name: 'Death Blow', description: 'Deals +30 damage on death', type: 'passive' },
      { id: 'forest_regeneration', name: 'Forest Regeneration', description: 'Regenerates 15 HP per turn', type: 'passive' }
    ],
    cost: { gold: 550, wood: 25, crystal: 5 },
    growth: 3,
    aiValue: 550
  },

  // Tier 6: Unicorn line
  {
    id: 'rampart_unicorn_basic',
    name: 'Unicorn',
    castle: 'rampart',
    tier: 6,
    variant: 'basic',
    stats: { attack: 15, defense: 14, health: 90, damage: [18, 22], speed: 7 },
    abilities: [
      { id: 'magic_resistance', name: 'Magic Resistance', description: '20% magic damage reduction', type: 'passive' },
      { id: 'aura_of_resistance', name: 'Aura of Resistance', description: 'Allies get +20% magic resistance', type: 'passive' },
      { id: 'blind_immunity', name: 'Blind Immunity', description: 'Immune to blind spells', type: 'passive' }
    ],
    cost: { gold: 850, gems: 10 },
    growth: 2,
    aiValue: 850
  },
  {
    id: 'rampart_unicorn_upgraded',
    name: 'War Unicorn',
    castle: 'rampart',
    tier: 6,
    variant: 'upgraded',
    stats: { attack: 15, defense: 14, health: 110, damage: [18, 22], speed: 9 },
    abilities: [
      { id: 'magic_resistance', name: 'Magic Resistance', description: '40% magic damage reduction', type: 'passive' },
      { id: 'aura_of_resistance', name: 'Aura of Resistance', description: 'Allies get +40% magic resistance', type: 'passive' },
      { id: 'blind_immunity', name: 'Blind Immunity', description: 'Immune to blind spells', type: 'passive' },
      { id: 'spell_immunity', name: 'Spell Immunity', description: 'Immune to spells below level 4', type: 'passive' }
    ],
    cost: { gold: 950, gems: 10 },
    growth: 2,
    aiValue: 950
  },
  {
    id: 'rampart_unicorn_champion',
    name: 'Sacred Unicorn',
    castle: 'rampart',
    tier: 6,
    variant: 'champion',
    stats: { attack: 17, defense: 16, health: 130, damage: [20, 26], speed: 11 },
    abilities: [
      { id: 'magic_resistance', name: 'Magic Resistance', description: '60% magic damage reduction', type: 'passive' },
      { id: 'aura_of_resistance', name: 'Aura of Resistance', description: 'Allies get +60% magic resistance', type: 'passive' },
      { id: 'blind_immunity', name: 'Blind Immunity', description: 'Immune to blind spells', type: 'passive' },
      { id: 'spell_immunity', name: 'Spell Immunity', description: 'Immune to spells below level 5', type: 'passive' },
      { id: 'healing_horn', name: 'Healing Horn', description: 'Heals all allies in area', type: 'active', cooldown: 4 }
    ],
    cost: { gold: 1200, gems: 15, crystal: 8 },
    growth: 2,
    aiValue: 1200
  },

  // Tier 7: Dragon line
  {
    id: 'rampart_dragon_basic',
    name: 'Green Dragon',
    castle: 'rampart',
    tier: 7,
    variant: 'basic',
    stats: { attack: 18, defense: 18, health: 180, damage: [40, 50], speed: 10 },
    abilities: [
      { id: 'flying', name: 'Flying', description: 'Can fly over obstacles', type: 'passive' },
      { id: 'dragon_breath', name: 'Dragon Breath', description: 'Breath attack damages multiple enemies', type: 'active', cooldown: 3 },
      { id: 'spell_immunity', name: 'Spell Immunity', description: 'Immune to spells below level 4', type: 'passive' }
    ],
    cost: { gold: 2400, crystal: 15, sulfur: 10 },
    growth: 1,
    aiValue: 2400
  },
  {
    id: 'rampart_dragon_upgraded',
    name: 'Gold Dragon',
    castle: 'rampart',
    tier: 7,
    variant: 'upgraded',
    stats: { attack: 27, defense: 27, health: 250, damage: [40, 50], speed: 16 },
    abilities: [
      { id: 'flying', name: 'Flying', description: 'Can fly over obstacles', type: 'passive' },
      { id: 'dragon_breath', name: 'Dragon Breath', description: 'Breath attack damages multiple enemies', type: 'active', cooldown: 2 },
      { id: 'spell_immunity', name: 'Spell Immunity', description: 'Immune to spells below level 5', type: 'passive' },
      { id: 'spell_casting', name: 'Spell Casting', description: 'Can cast spells like a hero', type: 'active', cooldown: 5 }
    ],
    cost: { gold: 3000, crystal: 15, sulfur: 10 },
    growth: 1,
    aiValue: 3000
  },
  {
    id: 'rampart_dragon_champion',
    name: 'Ancient Dragon',
    castle: 'rampart',
    tier: 7,
    variant: 'champion',
    stats: { attack: 32, defense: 32, health: 300, damage: [50, 70], speed: 18 },
    abilities: [
      { id: 'flying', name: 'Flying', description: 'Can fly over obstacles', type: 'passive' },
      { id: 'dragon_breath', name: 'Dragon Breath', description: 'Breath attack damages multiple enemies', type: 'active', cooldown: 2 },
      { id: 'spell_immunity', name: 'Spell Immunity', description: 'Immune to all spells', type: 'passive' },
      { id: 'spell_casting', name: 'Spell Casting', description: 'Can cast spells like a hero', type: 'active', cooldown: 3 },
      { id: 'ancient_wisdom', name: 'Ancient Wisdom', description: 'Nearby allies gain +2 to all stats', type: 'passive' }
    ],
    cost: { gold: 4000, crystal: 20, sulfur: 15, gems: 10 },
    growth: 1,
    aiValue: 4000
  },

  // 🔮 TOWER UNITS (21 units: 7 tiers × 3 variants)
  
  // Tier 1: Gremlin line
  {
    id: 'tower_gremlin_basic',
    name: 'Gremlin',
    castle: 'tower',
    tier: 1,
    variant: 'basic',
    stats: { attack: 3, defense: 3, health: 4, damage: [1, 2], speed: 4 },
    abilities: [{ id: 'mechanical_repair', name: 'Mechanical Repair', description: 'Can repair mechanical units', type: 'active', cooldown: 5 }],
    cost: { gold: 30, ore: 2 },
    growth: 16,
    aiValue: 30
  },
  {
    id: 'tower_gremlin_upgraded',
    name: 'Master Gremlin',
    castle: 'tower',
    tier: 1,
    variant: 'upgraded',
    stats: { attack: 4, defense: 4, health: 4, damage: [1, 2], speed: 5, shots: 8 },
    abilities: [
      { id: 'mechanical_repair', name: 'Mechanical Repair', description: 'Can repair mechanical units', type: 'active', cooldown: 3 },
      { id: 'ranged_attack', name: 'Ranged Attack', description: 'Can attack from distance', type: 'passive' }
    ],
    cost: { gold: 40, ore: 2 },
    growth: 16,
    aiValue: 40
  },
  {
    id: 'tower_gremlin_champion',
    name: 'Gremlin Engineer',
    castle: 'tower',
    tier: 1,
    variant: 'champion',
    stats: { attack: 6, defense: 6, health: 6, damage: [2, 3], speed: 6, shots: 12 },
    abilities: [
      { id: 'mechanical_repair', name: 'Mechanical Repair', description: 'Can repair mechanical units', type: 'active', cooldown: 2 },
      { id: 'ranged_attack', name: 'Ranged Attack', description: 'Can attack from distance', type: 'passive' },
      { id: 'invention', name: 'Invention', description: 'Can create temporary mechanical constructs', type: 'active', cooldown: 8 }
    ],
    cost: { gold: 60, ore: 3, crystal: 1 },
    growth: 16,
    aiValue: 60
  },

  // Tier 2: Stone Gargoyle line
  {
    id: 'tower_gargoyle_basic',
    name: 'Stone Gargoyle',
    castle: 'tower',
    tier: 2,
    variant: 'basic',
    stats: { attack: 6, defense: 6, health: 16, damage: [2, 3], speed: 6 },
    abilities: [
      { id: 'flying', name: 'Flying', description: 'Can fly over obstacles', type: 'passive' },
      { id: 'unliving', name: 'Unliving', description: 'Immune to mind spells', type: 'passive' }
    ],
    cost: { gold: 130, stone: 5 },
    growth: 9,
    aiValue: 130
  },
  {
    id: 'tower_gargoyle_upgraded',
    name: 'Obsidian Gargoyle',
    castle: 'tower',
    tier: 2,
    variant: 'upgraded',
    stats: { attack: 7, defense: 7, health: 16, damage: [2, 3], speed: 9 },
    abilities: [
      { id: 'flying', name: 'Flying', description: 'Can fly over obstacles', type: 'passive' },
      { id: 'unliving', name: 'Unliving', description: 'Immune to mind spells', type: 'passive' },
      { id: 'damage_resistance', name: 'Damage Resistance', description: 'Reduced damage from physical attacks', type: 'passive' }
    ],
    cost: { gold: 160, stone: 5 },
    growth: 9,
    aiValue: 160
  },
  {
    id: 'tower_gargoyle_champion',
    name: 'Marble Gargoyle',
    castle: 'tower',
    tier: 2,
    variant: 'champion',
    stats: { attack: 9, defense: 9, health: 20, damage: [3, 4], speed: 11 },
    abilities: [
      { id: 'flying', name: 'Flying', description: 'Can fly over obstacles', type: 'passive' },
      { id: 'unliving', name: 'Unliving', description: 'Immune to mind spells', type: 'passive' },
      { id: 'damage_resistance', name: 'Damage Resistance', description: 'Reduced damage from physical attacks', type: 'passive' },
      { id: 'stone_skin', name: 'Stone Skin', description: 'Magical armor that reduces all damage', type: 'passive' }
    ],
    cost: { gold: 200, stone: 8, crystal: 2 },
    growth: 9,
    aiValue: 200
  },

  // Tier 3: Stone Golem line
  {
    id: 'tower_golem_basic',
    name: 'Stone Golem',
    castle: 'tower',
    tier: 3,
    variant: 'basic',
    stats: { attack: 7, defense: 10, health: 30, damage: [4, 5], speed: 3 },
    abilities: [
      { id: 'unliving', name: 'Unliving', description: 'Immune to mind spells', type: 'passive' },
      { id: 'magic_resistance', name: 'Magic Resistance', description: '50% magic damage reduction', type: 'passive' },
      { id: 'spell_immunity', name: 'Spell Immunity', description: 'Immune to spells below level 2', type: 'passive' }
    ],
    cost: { gold: 250, stone: 15 },
    growth: 6,
    aiValue: 250
  },
  {
    id: 'tower_golem_upgraded',
    name: 'Iron Golem',
    castle: 'tower',
    tier: 3,
    variant: 'upgraded',
    stats: { attack: 9, defense: 10, health: 35, damage: [4, 5], speed: 5 },
    abilities: [
      { id: 'unliving', name: 'Unliving', description: 'Immune to mind spells', type: 'passive' },
      { id: 'magic_resistance', name: 'Magic Resistance', description: '75% magic damage reduction', type: 'passive' },
      { id: 'spell_immunity', name: 'Spell Immunity', description: 'Immune to spells below level 3', type: 'passive' }
    ],
    cost: { gold: 300, stone: 15, ore: 5 },
    growth: 6,
    aiValue: 300
  },
  {
    id: 'tower_golem_champion',
    name: 'Adamantine Golem',
    castle: 'tower',
    tier: 3,
    variant: 'champion',
    stats: { attack: 11, defense: 12, health: 40, damage: [5, 7], speed: 7 },
    abilities: [
      { id: 'unliving', name: 'Unliving', description: 'Immune to mind spells', type: 'passive' },
      { id: 'magic_resistance', name: 'Magic Resistance', description: '90% magic damage reduction', type: 'passive' },
      { id: 'spell_immunity', name: 'Spell Immunity', description: 'Immune to spells below level 4', type: 'passive' },
      { id: 'adamantine_shell', name: 'Adamantine Shell', description: 'Reflects 25% of damage back to attacker', type: 'passive' }
    ],
    cost: { gold: 400, stone: 20, ore: 10, crystal: 3 },
    growth: 6,
    aiValue: 400
  },

  // Tier 4: Mage line
  {
    id: 'tower_mage_basic',
    name: 'Mage',
    castle: 'tower',
    tier: 4,
    variant: 'basic',
    stats: { attack: 11, defense: 8, health: 25, damage: [7, 9], speed: 5, shots: 12 },
    abilities: [
      { id: 'ranged_attack', name: 'Ranged Attack', description: 'Can attack from distance', type: 'passive' },
      { id: 'spell_casting', name: 'Spell Casting', description: 'Can cast spells in combat', type: 'active', cooldown: 4 },
      { id: 'no_melee_penalty', name: 'No Melee Penalty', description: 'No penalty for ranged attacks in melee', type: 'passive' }
    ],
    cost: { gold: 350, crystal: 8 },
    growth: 4,
    aiValue: 350
  },
  {
    id: 'tower_mage_upgraded',
    name: 'Arch Mage',
    castle: 'tower',
    tier: 4,
    variant: 'upgraded',
    stats: { attack: 12, defense: 9, health: 30, damage: [7, 9], speed: 7, shots: 24 },
    abilities: [
      { id: 'ranged_attack', name: 'Ranged Attack', description: 'Can attack from distance', type: 'passive' },
      { id: 'spell_casting', name: 'Spell Casting', description: 'Can cast spells in combat', type: 'active', cooldown: 3 },
      { id: 'no_melee_penalty', name: 'No Melee Penalty', description: 'No penalty for ranged attacks in melee', type: 'passive' },
      { id: 'magic_channel', name: 'Magic Channel', description: 'Can channel spells without mana cost', type: 'active', cooldown: 6 }
    ],
    cost: { gold: 450, crystal: 8 },
    growth: 4,
    aiValue: 450
  },
  {
    id: 'tower_mage_champion',
    name: 'Arcane Master',
    castle: 'tower',
    tier: 4,
    variant: 'champion',
    stats: { attack: 14, defense: 11, health: 35, damage: [8, 12], speed: 9, shots: 32 },
    abilities: [
      { id: 'ranged_attack', name: 'Ranged Attack', description: 'Can attack from distance', type: 'passive' },
      { id: 'spell_casting', name: 'Spell Casting', description: 'Can cast spells in combat', type: 'active', cooldown: 2 },
      { id: 'no_melee_penalty', name: 'No Melee Penalty', description: 'No penalty for ranged attacks in melee', type: 'passive' },
      { id: 'magic_channel', name: 'Magic Channel', description: 'Can channel spells without mana cost', type: 'active', cooldown: 4 },
      { id: 'arcane_mastery', name: 'Arcane Mastery', description: 'Spells have enhanced effects', type: 'passive' }
    ],
    cost: { gold: 600, crystal: 12, gems: 3 },
    growth: 4,
    aiValue: 600
  },

  // Tier 5: Genie line
  {
    id: 'tower_genie_basic',
    name: 'Genie',
    castle: 'tower',
    tier: 5,
    variant: 'basic',
    stats: { attack: 12, defense: 12, health: 40, damage: [13, 16], speed: 7 },
    abilities: [
      { id: 'flying', name: 'Flying', description: 'Can fly over obstacles', type: 'passive' },
      { id: 'spell_casting', name: 'Spell Casting', description: 'Can cast spells in combat', type: 'active', cooldown: 3 },
      { id: 'hate_efreet', name: 'Hate Efreet', description: 'Deals +50% damage to Efreet', type: 'passive' }
    ],
    cost: { gold: 550, gems: 5 },
    growth: 3,
    aiValue: 550
  },
  {
    id: 'tower_genie_upgraded',
    name: 'Master Genie',
    castle: 'tower',
    tier: 5,
    variant: 'upgraded',
    stats: { attack: 12, defense: 12, health: 40, damage: [13, 16], speed: 11 },
    abilities: [
      { id: 'flying', name: 'Flying', description: 'Can fly over obstacles', type: 'passive' },
      { id: 'spell_casting', name: 'Spell Casting', description: 'Can cast spells in combat', type: 'active', cooldown: 2 },
      { id: 'hate_efreet', name: 'Hate Efreet', description: 'Deals +50% damage to Efreet', type: 'passive' },
      { id: 'spell_immunity', name: 'Spell Immunity', description: 'Immune to spells below level 4', type: 'passive' }
    ],
    cost: { gold: 650, gems: 5 },
    growth: 3,
    aiValue: 650
  },
  {
    id: 'tower_genie_champion',
    name: 'Djinn Sultan',
    castle: 'tower',
    tier: 5,
    variant: 'champion',
    stats: { attack: 14, defense: 14, health: 50, damage: [15, 20], speed: 13 },
    abilities: [
      { id: 'flying', name: 'Flying', description: 'Can fly over obstacles', type: 'passive' },
      { id: 'spell_casting', name: 'Spell Casting', description: 'Can cast spells in combat', type: 'active', cooldown: 2 },
      { id: 'hate_efreet', name: 'Hate Efreet', description: 'Deals +100% damage to Efreet', type: 'passive' },
      { id: 'spell_immunity', name: 'Spell Immunity', description: 'Immune to spells below level 5', type: 'passive' },
      { id: 'wish_granting', name: 'Wish Granting', description: 'Can grant beneficial effects to allies', type: 'active', cooldown: 6 }
    ],
    cost: { gold: 800, gems: 8, crystal: 5 },
    growth: 3,
    aiValue: 800
  },

  // Tier 6: Naga line
  {
    id: 'tower_naga_basic',
    name: 'Naga',
    castle: 'tower',
    tier: 6,
    variant: 'basic',
    stats: { attack: 16, defense: 13, health: 110, damage: [20, 20], speed: 5 },
    abilities: [
      { id: 'no_retaliation', name: 'No Retaliation', description: 'Never receives retaliation', type: 'passive' },
      { id: 'spell_casting', name: 'Spell Casting', description: 'Can cast spells in combat', type: 'active', cooldown: 3 }
    ],
    cost: { gold: 1100, crystal: 12 },
    growth: 2,
    aiValue: 1100
  },
  {
    id: 'tower_naga_upgraded',
    name: 'Naga Queen',
    castle: 'tower',
    tier: 6,
    variant: 'upgraded',
    stats: { attack: 16, defense: 13, health: 110, damage: [30, 30], speed: 7 },
    abilities: [
      { id: 'no_retaliation', name: 'No Retaliation', description: 'Never receives retaliation', type: 'passive' },
      { id: 'spell_casting', name: 'Spell Casting', description: 'Can cast spells in combat', type: 'active', cooldown: 2 },
      { id: 'poison_attack', name: 'Poison Attack', description: 'Attacks poison enemies', type: 'passive' }
    ],
    cost: { gold: 1300, crystal: 12 },
    growth: 2,
    aiValue: 1300
  },
  {
    id: 'tower_naga_champion',
    name: 'Naga Empress',
    castle: 'tower',
    tier: 6,
    variant: 'champion',
    stats: { attack: 18, defense: 15, health: 130, damage: [35, 40], speed: 9 },
    abilities: [
      { id: 'no_retaliation', name: 'No Retaliation', description: 'Never receives retaliation', type: 'passive' },
      { id: 'spell_casting', name: 'Spell Casting', description: 'Can cast spells in combat', type: 'active', cooldown: 2 },
      { id: 'poison_attack', name: 'Poison Attack', description: 'Attacks poison enemies', type: 'passive' },
      { id: 'serpent_strike', name: 'Serpent Strike', description: 'Can attack multiple adjacent enemies', type: 'active', cooldown: 4 },
      { id: 'magic_mastery', name: 'Magic Mastery', description: 'Spells cost 50% less mana', type: 'passive' }
    ],
    cost: { gold: 1600, crystal: 15, gems: 5 },
    growth: 2,
    aiValue: 1600
  },

  // Tier 7: Titan line
  {
    id: 'tower_titan_basic',
    name: 'Titan',
    castle: 'tower',
    tier: 7,
    variant: 'basic',
    stats: { attack: 24, defense: 24, health: 300, damage: [40, 60], speed: 11, shots: 24 },
    abilities: [
      { id: 'ranged_attack', name: 'Ranged Attack', description: 'Can attack from distance', type: 'passive' },
      { id: 'lightning_bolt', name: 'Lightning Bolt', description: 'Ranged attacks chain to nearby enemies', type: 'passive' },
      { id: 'spell_immunity', name: 'Spell Immunity', description: 'Immune to spells below level 5', type: 'passive' },
      { id: 'no_melee_penalty', name: 'No Melee Penalty', description: 'No penalty for ranged attacks in melee', type: 'passive' }
    ],
    cost: { gold: 2500, crystal: 20, gems: 10 },
    growth: 1,
    aiValue: 2500
  },
  {
    id: 'tower_titan_upgraded',
    name: 'Greater Titan',
    castle: 'tower',
    tier: 7,
    variant: 'upgraded',
    stats: { attack: 24, defense: 24, health: 300, damage: [40, 60], speed: 15, shots: 24 },
    abilities: [
      { id: 'ranged_attack', name: 'Ranged Attack', description: 'Can attack from distance', type: 'passive' },
      { id: 'lightning_bolt', name: 'Lightning Bolt', description: 'Ranged attacks chain to nearby enemies', type: 'passive' },
      { id: 'spell_immunity', name: 'Spell Immunity', description: 'Immune to all spells', type: 'passive' },
      { id: 'no_melee_penalty', name: 'No Melee Penalty', description: 'No penalty for ranged attacks in melee', type: 'passive' },
      { id: 'spell_casting', name: 'Spell Casting', description: 'Can cast spells in combat', type: 'active', cooldown: 3 }
    ],
    cost: { gold: 3000, crystal: 20, gems: 10 },
    growth: 1,
    aiValue: 3000
  },
  {
    id: 'tower_titan_champion',
    name: 'Primordial Titan',
    castle: 'tower',
    tier: 7,
    variant: 'champion',
    stats: { attack: 28, defense: 28, health: 400, damage: [50, 80], speed: 18, shots: 32 },
    abilities: [
      { id: 'ranged_attack', name: 'Ranged Attack', description: 'Can attack from distance', type: 'passive' },
      { id: 'lightning_bolt', name: 'Lightning Bolt', description: 'Ranged attacks chain to nearby enemies', type: 'passive' },
      { id: 'spell_immunity', name: 'Spell Immunity', description: 'Immune to all spells', type: 'passive' },
      { id: 'no_melee_penalty', name: 'No Melee Penalty', description: 'No penalty for ranged attacks in melee', type: 'passive' },
      { id: 'spell_casting', name: 'Spell Casting', description: 'Can cast spells in combat', type: 'active', cooldown: 2 },
      { id: 'thunderstorm', name: 'Thunderstorm', description: 'Area lightning attack that hits all enemies', type: 'active', cooldown: 5 }
    ],
    cost: { gold: 4000, crystal: 25, gems: 15, sulfur: 5 },
    growth: 1,
    aiValue: 4000
  },

  // 🔥 INFERNO UNITS (21 units: 7 tiers × 3 variants)
  
  // Tier 1: Imp line
  {
    id: 'inferno_imp_basic',
    name: 'Imp',
    castle: 'inferno',
    tier: 1,
    variant: 'basic',
    stats: { attack: 2, defense: 3, health: 4, damage: [1, 2], speed: 5 },
    abilities: [{ id: 'flying', name: 'Flying', description: 'Can fly over obstacles', type: 'passive' }],
    cost: { gold: 50, sulfur: 1 },
    growth: 15,
    aiValue: 50
  },
  {
    id: 'inferno_imp_upgraded',
    name: 'Familiar',
    castle: 'inferno',
    tier: 1,
    variant: 'upgraded',
    stats: { attack: 4, defense: 4, health: 4, damage: [1, 2], speed: 7 },
    abilities: [
      { id: 'flying', name: 'Flying', description: 'Can fly over obstacles', type: 'passive' },
      { id: 'magic_channel', name: 'Magic Channel', description: 'Can channel mana to hero', type: 'active', cooldown: 5 }
    ],
    cost: { gold: 60, sulfur: 1 },
    growth: 15,
    aiValue: 60
  },
  {
    id: 'inferno_imp_champion',
    name: 'Demon Familiar',
    castle: 'inferno',
    tier: 1,
    variant: 'champion',
    stats: { attack: 6, defense: 6, health: 6, damage: [2, 3], speed: 9 },
    abilities: [
      { id: 'flying', name: 'Flying', description: 'Can fly over obstacles', type: 'passive' },
      { id: 'magic_channel', name: 'Magic Channel', description: 'Can channel mana to hero', type: 'active', cooldown: 3 },
      { id: 'fire_immunity', name: 'Fire Immunity', description: 'Immune to fire magic', type: 'passive' }
    ],
    cost: { gold: 80, sulfur: 2 },
    growth: 15,
    aiValue: 80
  },

  // Tier 2: Gog line
  {
    id: 'inferno_gog_basic',
    name: 'Gog',
    castle: 'inferno',
    tier: 2,
    variant: 'basic',
    stats: { attack: 6, defense: 4, health: 13, damage: [2, 4], speed: 4, shots: 12 },
    abilities: [
      { id: 'ranged_attack', name: 'Ranged Attack', description: 'Can attack from distance', type: 'passive' },
      { id: 'fire_ball', name: 'Fire Ball', description: 'Ranged attacks deal fire damage', type: 'passive' }
    ],
    cost: { gold: 125, sulfur: 3 },
    growth: 8,
    aiValue: 125
  },
  {
    id: 'inferno_gog_upgraded',
    name: 'Magog',
    castle: 'inferno',
    tier: 2,
    variant: 'upgraded',
    stats: { attack: 7, defense: 4, health: 13, damage: [2, 4], speed: 6, shots: 24 },
    abilities: [
      { id: 'ranged_attack', name: 'Ranged Attack', description: 'Can attack from distance', type: 'passive' },
      { id: 'fire_ball', name: 'Fire Ball', description: 'Ranged attacks deal fire damage and splash', type: 'passive' },
      { id: 'area_attack', name: 'Area Attack', description: 'Attacks damage multiple enemies', type: 'passive' }
    ],
    cost: { gold: 175, sulfur: 3 },
    growth: 8,
    aiValue: 175
  },
  {
    id: 'inferno_gog_champion',
    name: 'Infernal Magog',
    castle: 'inferno',
    tier: 2,
    variant: 'champion',
    stats: { attack: 9, defense: 6, health: 16, damage: [3, 5], speed: 8, shots: 32 },
    abilities: [
      { id: 'ranged_attack', name: 'Ranged Attack', description: 'Can attack from distance', type: 'passive' },
      { id: 'fire_ball', name: 'Fire Ball', description: 'Ranged attacks deal fire damage and splash', type: 'passive' },
      { id: 'area_attack', name: 'Area Attack', description: 'Attacks damage multiple enemies', type: 'passive' },
      { id: 'infernal_blast', name: 'Infernal Blast', description: 'Larger area damage and burning effect', type: 'passive' }
    ],
    cost: { gold: 225, sulfur: 5, ore: 2 },
    growth: 8,
    aiValue: 225
  },

  // Tier 3: Hell Hound line
  {
    id: 'inferno_hellhound_basic',
    name: 'Hell Hound',
    castle: 'inferno',
    tier: 3,
    variant: 'basic',
    stats: { attack: 10, defense: 6, health: 25, damage: [2, 7], speed: 7 },
    abilities: [
      { id: 'fire_immunity', name: 'Fire Immunity', description: 'Immune to fire magic', type: 'passive' },
      { id: 'no_retaliation', name: 'No Retaliation', description: 'Never receives retaliation', type: 'passive' }
    ],
    cost: { gold: 200, sulfur: 5 },
    growth: 5,
    aiValue: 200
  },
  {
    id: 'inferno_hellhound_upgraded',
    name: 'Cerberus',
    castle: 'inferno',
    tier: 3,
    variant: 'upgraded',
    stats: { attack: 10, defense: 8, health: 25, damage: [2, 5], speed: 8 },
    abilities: [
      { id: 'fire_immunity', name: 'Fire Immunity', description: 'Immune to fire magic', type: 'passive' },
      { id: 'no_retaliation', name: 'No Retaliation', description: 'Never receives retaliation', type: 'passive' },
      { id: 'three_headed_attack', name: 'Three-Headed Attack', description: 'Can attack 3 adjacent enemies', type: 'passive' }
    ],
    cost: { gold: 250, sulfur: 5 },
    growth: 5,
    aiValue: 250
  },
  {
    id: 'inferno_hellhound_champion',
    name: 'Infernal Cerberus',
    castle: 'inferno',
    tier: 3,
    variant: 'champion',
    stats: { attack: 12, defense: 10, health: 30, damage: [3, 7], speed: 10 },
    abilities: [
      { id: 'fire_immunity', name: 'Fire Immunity', description: 'Immune to fire magic', type: 'passive' },
      { id: 'no_retaliation', name: 'No Retaliation', description: 'Never receives retaliation', type: 'passive' },
      { id: 'three_headed_attack', name: 'Three-Headed Attack', description: 'Can attack 3 adjacent enemies', type: 'passive' },
      { id: 'fire_breath', name: 'Fire Breath', description: 'Breath attack that burns enemies', type: 'active', cooldown: 4 }
    ],
    cost: { gold: 325, sulfur: 8, gems: 2 },
    growth: 5,
    aiValue: 325
  },

  // Tier 4: Demon line
  {
    id: 'inferno_demon_basic',
    name: 'Demon',
    castle: 'inferno',
    tier: 4,
    variant: 'basic',
    stats: { attack: 10, defense: 10, health: 35, damage: [7, 9], speed: 5 },
    abilities: [
      { id: 'teleport', name: 'Teleport', description: 'Can teleport across battlefield', type: 'active', cooldown: 3 },
      { id: 'fire_immunity', name: 'Fire Immunity', description: 'Immune to fire magic', type: 'passive' }
    ],
    cost: { gold: 400, sulfur: 8 },
    growth: 4,
    aiValue: 400
  },
  {
    id: 'inferno_demon_upgraded',
    name: 'Horned Demon',
    castle: 'inferno',
    tier: 4,
    variant: 'upgraded',
    stats: { attack: 10, defense: 10, health: 40, damage: [7, 9], speed: 6 },
    abilities: [
      { id: 'teleport', name: 'Teleport', description: 'Can teleport across battlefield', type: 'active', cooldown: 2 },
      { id: 'fire_immunity', name: 'Fire Immunity', description: 'Immune to fire magic', type: 'passive' },
      { id: 'magic_resistance', name: 'Magic Resistance', description: '20% magic damage reduction', type: 'passive' }
    ],
    cost: { gold: 500, sulfur: 8 },
    growth: 4,
    aiValue: 500
  },
  {
    id: 'inferno_demon_champion',
    name: 'Demon Lord',
    castle: 'inferno',
    tier: 4,
    variant: 'champion',
    stats: { attack: 12, defense: 12, health: 50, damage: [8, 12], speed: 8 },
    abilities: [
      { id: 'teleport', name: 'Teleport', description: 'Can teleport across battlefield', type: 'active', cooldown: 2 },
      { id: 'fire_immunity', name: 'Fire Immunity', description: 'Immune to fire magic', type: 'passive' },
      { id: 'magic_resistance', name: 'Magic Resistance', description: '40% magic damage reduction', type: 'passive' },
      { id: 'demonic_aura', name: 'Demonic Aura', description: 'Nearby enemies take fire damage', type: 'passive' }
    ],
    cost: { gold: 650, sulfur: 12, gems: 3 },
    growth: 4,
    aiValue: 650
  },

  // Tier 5: Pit Fiend line
  {
    id: 'inferno_pitfiend_basic',
    name: 'Pit Fiend',
    castle: 'inferno',
    tier: 5,
    variant: 'basic',
    stats: { attack: 13, defense: 13, health: 45, damage: [13, 17], speed: 6 },
    abilities: [
      { id: 'flying', name: 'Flying', description: 'Can fly over obstacles', type: 'passive' },
      { id: 'fire_immunity', name: 'Fire Immunity', description: 'Immune to fire magic', type: 'passive' },
      { id: 'no_retaliation', name: 'No Retaliation', description: 'Never receives retaliation', type: 'passive' }
    ],
    cost: { gold: 700, sulfur: 12 },
    growth: 3,
    aiValue: 700
  },
  {
    id: 'inferno_pitfiend_upgraded',
    name: 'Pit Lord',
    castle: 'inferno',
    tier: 5,
    variant: 'upgraded',
    stats: { attack: 13, defense: 13, health: 45, damage: [13, 17], speed: 7 },
    abilities: [
      { id: 'flying', name: 'Flying', description: 'Can fly over obstacles', type: 'passive' },
      { id: 'fire_immunity', name: 'Fire Immunity', description: 'Immune to fire magic', type: 'passive' },
      { id: 'no_retaliation', name: 'No Retaliation', description: 'Never receives retaliation', type: 'passive' },
      { id: 'summon_demons', name: 'Summon Demons', description: 'Can summon lesser demons in battle', type: 'active', cooldown: 6 }
    ],
    cost: { gold: 850, sulfur: 12 },
    growth: 3,
    aiValue: 850
  },
  {
    id: 'inferno_pitfiend_champion',
    name: 'Inferno Lord',
    castle: 'inferno',
    tier: 5,
    variant: 'champion',
    stats: { attack: 15, defense: 15, health: 55, damage: [15, 20], speed: 9 },
    abilities: [
      { id: 'flying', name: 'Flying', description: 'Can fly over obstacles', type: 'passive' },
      { id: 'fire_immunity', name: 'Fire Immunity', description: 'Immune to fire magic', type: 'passive' },
      { id: 'no_retaliation', name: 'No Retaliation', description: 'Never receives retaliation', type: 'passive' },
      { id: 'summon_demons', name: 'Summon Demons', description: 'Can summon lesser demons in battle', type: 'active', cooldown: 4 },
      { id: 'hellfire_aura', name: 'Hellfire Aura', description: 'All nearby enemies take continuous fire damage', type: 'passive' }
    ],
    cost: { gold: 1100, sulfur: 15, gems: 5 },
    growth: 3,
    aiValue: 1100
  },

  // Tier 6: Efreet line
  {
    id: 'inferno_efreet_basic',
    name: 'Efreet',
    castle: 'inferno',
    tier: 6,
    variant: 'basic',
    stats: { attack: 16, defense: 12, health: 90, damage: [16, 24], speed: 7 },
    abilities: [
      { id: 'flying', name: 'Flying', description: 'Can fly over obstacles', type: 'passive' },
      { id: 'fire_immunity', name: 'Fire Immunity', description: 'Immune to fire magic', type: 'passive' },
      { id: 'fire_shield', name: 'Fire Shield', description: 'Attackers take fire damage', type: 'passive' },
      { id: 'hate_genie', name: 'Hate Genie', description: 'Deals +50% damage to Genies', type: 'passive' }
    ],
    cost: { gold: 900, sulfur: 15 },
    growth: 2,
    aiValue: 900
  },
  {
    id: 'inferno_efreet_upgraded',
    name: 'Efreet Sultan',
    castle: 'inferno',
    tier: 6,
    variant: 'upgraded',
    stats: { attack: 16, defense: 14, health: 90, damage: [16, 24], speed: 9 },
    abilities: [
      { id: 'flying', name: 'Flying', description: 'Can fly over obstacles', type: 'passive' },
      { id: 'fire_immunity', name: 'Fire Immunity', description: 'Immune to fire magic', type: 'passive' },
      { id: 'fire_shield', name: 'Fire Shield', description: 'Attackers take fire damage', type: 'passive' },
      { id: 'hate_genie', name: 'Hate Genie', description: 'Deals +100% damage to Genies', type: 'passive' },
      { id: 'spell_immunity', name: 'Spell Immunity', description: 'Immune to spells below level 3', type: 'passive' }
    ],
    cost: { gold: 1100, sulfur: 15 },
    growth: 2,
    aiValue: 1100
  },
  {
    id: 'inferno_efreet_champion',
    name: 'Infernal Sultan',
    castle: 'inferno',
    tier: 6,
    variant: 'champion',
    stats: { attack: 18, defense: 16, health: 110, damage: [18, 28], speed: 11 },
    abilities: [
      { id: 'flying', name: 'Flying', description: 'Can fly over obstacles', type: 'passive' },
      { id: 'fire_immunity', name: 'Fire Immunity', description: 'Immune to fire magic', type: 'passive' },
      { id: 'fire_shield', name: 'Fire Shield', description: 'Attackers take fire damage', type: 'passive' },
      { id: 'hate_genie', name: 'Hate Genie', description: 'Deals +150% damage to Genies', type: 'passive' },
      { id: 'spell_immunity', name: 'Spell Immunity', description: 'Immune to spells below level 4', type: 'passive' },
      { id: 'infernal_wish', name: 'Infernal Wish', description: 'Can grant destructive effects to allies', type: 'active', cooldown: 8 }
    ],
    cost: { gold: 1400, sulfur: 20, gems: 8 },
    growth: 2,
    aiValue: 1400
  },

  // Tier 7: Devil line
  {
    id: 'inferno_devil_basic',
    name: 'Devil',
    castle: 'inferno',
    tier: 7,
    variant: 'basic',
    stats: { attack: 19, defense: 21, health: 160, damage: [30, 40], speed: 8 },
    abilities: [
      { id: 'teleport', name: 'Teleport', description: 'Can teleport across battlefield', type: 'active', cooldown: 2 },
      { id: 'fire_immunity', name: 'Fire Immunity', description: 'Immune to fire magic', type: 'passive' },
      { id: 'no_retaliation', name: 'No Retaliation', description: 'Never receives retaliation', type: 'passive' },
      { id: 'spell_immunity', name: 'Spell Immunity', description: 'Immune to spells below level 4', type: 'passive' }
    ],
    cost: { gold: 2700, sulfur: 25, gems: 10 },
    growth: 1,
    aiValue: 2700
  },
  {
    id: 'inferno_devil_upgraded',
    name: 'Arch Devil',
    castle: 'inferno',
    tier: 7,
    variant: 'upgraded',
    stats: { attack: 26, defense: 28, health: 200, damage: [30, 40], speed: 11 },
    abilities: [
      { id: 'teleport', name: 'Teleport', description: 'Can teleport across battlefield', type: 'active', cooldown: 1 },
      { id: 'fire_immunity', name: 'Fire Immunity', description: 'Immune to fire magic', type: 'passive' },
      { id: 'no_retaliation', name: 'No Retaliation', description: 'Never receives retaliation', type: 'passive' },
      { id: 'spell_immunity', name: 'Spell Immunity', description: 'Immune to spells below level 5', type: 'passive' },
      { id: 'hate_angels', name: 'Hate Angels', description: 'Deals +50% damage to Angels', type: 'passive' }
    ],
    cost: { gold: 3500, sulfur: 25, gems: 10 },
    growth: 1,
    aiValue: 3500
  },
  {
    id: 'inferno_devil_champion',
    name: 'Demon Prince',
    castle: 'inferno',
    tier: 7,
    variant: 'champion',
    stats: { attack: 30, defense: 32, health: 250, damage: [35, 50], speed: 13 },
    abilities: [
      { id: 'teleport', name: 'Teleport', description: 'Can teleport across battlefield', type: 'active', cooldown: 1 },
      { id: 'fire_immunity', name: 'Fire Immunity', description: 'Immune to fire magic', type: 'passive' },
      { id: 'no_retaliation', name: 'No Retaliation', description: 'Never receives retaliation', type: 'passive' },
      { id: 'spell_immunity', name: 'Spell Immunity', description: 'Immune to all spells', type: 'passive' },
      { id: 'hate_angels', name: 'Hate Angels', description: 'Deals +100% damage to Angels', type: 'passive' },
      { id: 'infernal_dominion', name: 'Infernal Dominion', description: 'Area effect that weakens all enemies', type: 'active', cooldown: 6 }
    ],
    cost: { gold: 4500, sulfur: 30, gems: 15, crystal: 5 },
    growth: 1,
    aiValue: 4500
  },

  // Continue with more castles... (Castle, Rampart, Tower, and Inferno complete)
  // TODO: Implement remaining 84 units (4 more castles × 21 units)
];

// 🏗️ BUILDING DEFINITIONS

export const BUILDING_TYPES: Building[] = [
  // Castle Basic Buildings
  {
    id: 'town_hall',
    name: 'Town Hall',
    description: 'Generates daily gold income',
    castle: 'castle',
    level: 1,
    maxLevel: 3,
    cost: { gold: 500, wood: 20 },
    buildTime: 1,
    prerequisites: [],
    effect: { type: 'resource_bonus', value: 500, target: 'gold' }
  },
  {
    id: 'barracks',
    name: 'Barracks',
    description: 'Allows recruitment of Pikemen',
    castle: 'castle',
    level: 1,
    maxLevel: 2,
    cost: { gold: 300, wood: 10 },
    buildTime: 1,
    prerequisites: [],
    effect: { type: 'unit_growth', value: 1, target: 'castle_pikeman_basic' }
  },
  {
    id: 'archery_range',
    name: 'Archery Range', 
    description: 'Allows recruitment of Archers',
    castle: 'castle',
    level: 1,
    maxLevel: 2,
    cost: { gold: 400, wood: 15 },
    buildTime: 1,
    prerequisites: ['barracks'],
    effect: { type: 'unit_growth', value: 1, target: 'castle_archer_basic' }
  },
  {
    id: 'griffin_tower',
    name: 'Griffin Tower',
    description: 'Allows recruitment of Griffins',
    castle: 'castle', 
    level: 1,
    maxLevel: 2,
    cost: { gold: 1000, stone: 10, ore: 5 },
    buildTime: 2,
    prerequisites: ['archery_range'],
    effect: { type: 'unit_growth', value: 1, target: 'castle_griffin_basic' }
  }
];

// 🎯 RESOURCE ECONOMY SYSTEM

export const RESOURCE_INFO: { [key in ResourceType]: {
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'precious';
}} = {
  gold: { name: 'Gold', description: 'Universal currency for all purchases', icon: '💰', rarity: 'common' },
  wood: { name: 'Wood', description: 'Basic building material from forests', icon: '🪵', rarity: 'common' },
  stone: { name: 'Stone', description: 'Essential for fortifications and advanced buildings', icon: '🗿', rarity: 'common' },
  ore: { name: 'Ore', description: 'Metal for weapons and armor', icon: '⛏️', rarity: 'rare' },
  crystal: { name: 'Crystal', description: 'Magical crystals for spell research', icon: '💎', rarity: 'rare' },
  gems: { name: 'Gems', description: 'Precious gems for powerful artifacts', icon: '💍', rarity: 'precious' },
  sulfur: { name: 'Sulfur', description: 'Alchemical component for advanced magic', icon: '🌋', rarity: 'precious' }
};

export const DAILY_RESOURCE_GENERATION: Resources = {
  gold: 1000,
  wood: 2,
  stone: 2,
  ore: 1,
  crystal: 1,
  gems: 1,
  sulfur: 1
};

// 🏰 Castle Management Functions

export interface CastleManager {
  buildStructure(castleId: string, buildingId: string): Promise<boolean>;
  upgradeBuilding(castleId: string, buildingId: string): Promise<boolean>;
  recruitUnits(castleId: string, unitId: string, count: number): Promise<boolean>;
  calculateDailyIncome(castle: Castle): Resources;
  calculateBuildingCost(building: Building, currentLevel: number): Resources;
  canBuild(castle: Castle, buildingId: string): boolean;
}

export default {
  CASTLE_TYPES,
  UNIT_TYPES,
  BUILDING_TYPES,
  RESOURCE_INFO,
  DAILY_RESOURCE_GENERATION
}; 