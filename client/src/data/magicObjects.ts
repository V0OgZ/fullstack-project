// Types for magic objects
export interface MagicObject {
  id: string;
  name: string; // Direct name instead of translation key
  description: string; // Direct description instead of translation key
  type: 'weapon' | 'armor' | 'accessory' | 'artifact' | 'temporal' | 'consumable' | 'resource';
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'temporal';
  value: number;
  effects: {
    attack?: number;
    defense?: number;
    knowledge?: number;
    spellPower?: number;
    movementPoints?: number;
    mana?: number;
    temporalMana?: number;
    experience?: number;
    gold?: number;
    specialEffect?: string; // Direct special effect text
  };
  slot?: 'weapon' | 'armor' | 'helmet' | 'boots' | 'ring' | 'amulet' | 'cape';
  requiresLevel?: number;
  temporal?: boolean;
}

// All magic objects collection - using direct text for now
export const ALL_MAGIC_OBJECTS: MagicObject[] = [
  // === WEAPONS ===
  {
    id: 'sword_basic',
    name: 'Basic Sword',
    description: 'A simple and robust sword.',
    type: 'weapon',
    rarity: 'common',
    value: 100,
    effects: { attack: 2 },
    slot: 'weapon'
  },
  {
    id: 'sword_steel',
    name: 'Steel Sword',
    description: 'A light and fast sword.',
    type: 'weapon',
    rarity: 'uncommon',
    value: 250,
    effects: { attack: 4 },
    slot: 'weapon'
  },
  {
    id: 'sword_magic',
    name: 'Magic Sword',
    description: 'A sword infused with magical energy.',
    type: 'weapon',
    rarity: 'rare',
    value: 500,
    effects: { attack: 6, spellPower: 2 },
    slot: 'weapon'
  },
  {
    id: 'sword_legendary',
    name: 'Legendary Blade',
    description: 'A legendary sword of immense power.',
    type: 'weapon',
    rarity: 'legendary',
    value: 2000,
    effects: { attack: 12, defense: 3, specialEffect: 'Critical hits deal double damage' },
    slot: 'weapon',
    requiresLevel: 10
  },

  // === ARMOR ===
  {
    id: 'armor_leather',
    name: 'Leather Armor',
    description: 'Basic protection made of leather.',
    type: 'armor',
    rarity: 'common',
    value: 80,
    effects: { defense: 2 },
    slot: 'armor'
  },
  {
    id: 'armor_chain',
    name: 'Chain Mail',
    description: 'Flexible metallic protection.',
    type: 'armor',
    rarity: 'uncommon',
    value: 200,
    effects: { defense: 4 },
    slot: 'armor'
  },
  {
    id: 'armor_plate',
    name: 'Plate Armor',
    description: 'Heavy metallic protection.',
    type: 'armor',
    rarity: 'rare',
    value: 450,
    effects: { defense: 7 },
    slot: 'armor'
  },
  {
    id: 'armor_dragon',
    name: 'Dragon Scale Armor',
    description: 'Armor made from dragon scales.',
    type: 'armor',
    rarity: 'legendary',
    value: 1800,
    effects: { defense: 10, attack: 2, specialEffect: 'Immune to fire damage' },
    slot: 'armor',
    requiresLevel: 8
  },

  // === ACCESSORIES ===
  {
    id: 'ring_power',
    name: 'Ring of Power',
    description: 'A ring that enhances magical abilities.',
    type: 'accessory',
    rarity: 'rare',
    value: 400,
    effects: { spellPower: 3, mana: 5 },
    slot: 'ring'
  },
  {
    id: 'amulet_wisdom',
    name: 'Amulet of Wisdom',
    description: 'An amulet that increases knowledge.',
    type: 'accessory',
    rarity: 'uncommon',
    value: 300,
    effects: { knowledge: 4, experience: 10 },
    slot: 'amulet'
  },
  {
    id: 'boots_speed',
    name: 'Boots of Speed',
    description: 'Boots that increase movement speed.',
    type: 'accessory',
    rarity: 'rare',
    value: 350,
    effects: { movementPoints: 2 },
    slot: 'boots'
  },
  {
    id: 'cape_stealth',
    name: 'Cape of Stealth',
    description: 'A cape that provides stealth abilities.',
    type: 'accessory',
    rarity: 'epic',
    value: 800,
    effects: { defense: 2, specialEffect: 'Grants invisibility for 1 turn' },
    slot: 'cape',
    requiresLevel: 5
  },

  // === ARTIFACTS ===
  {
    id: 'crown_kings',
    name: 'Crown of Kings',
    description: 'A crown worn by legendary rulers.',
    type: 'artifact',
    rarity: 'legendary',
    value: 2500,
    effects: { 
      attack: 3, 
      defense: 3, 
      knowledge: 3, 
      spellPower: 3,
      specialEffect: 'Increases all stats and grants leadership bonus'
    },
    requiresLevel: 12
  },
  {
    id: 'orb_knowledge',
    name: 'Orb of Knowledge',
    description: 'A mystical orb containing ancient wisdom.',
    type: 'artifact',
    rarity: 'epic',
    value: 1200,
    effects: { knowledge: 8, experience: 50 },
    requiresLevel: 6
  },
  {
    id: 'staff_archmage',
    name: 'Staff of the Archmage',
    description: 'The legendary staff of a powerful archmage.',
    type: 'artifact',
    rarity: 'legendary',
    value: 3000,
    effects: { 
      spellPower: 10, 
      mana: 20, 
      knowledge: 5,
      specialEffect: 'All spells cost 50% less mana'
    },
    requiresLevel: 15
  },

  // === TEMPORAL OBJECTS ===
  {
    id: 'temporal_anchor',
    name: 'Temporal Anchor',
    description: 'An artifact that stabilizes temporal distortions.',
    type: 'temporal',
    rarity: 'temporal',
    value: 1500,
    effects: { 
      temporalMana: 10, 
      specialEffect: 'Prevents temporal paradoxes'
    },
    temporal: true,
    requiresLevel: 8
  },
  {
    id: 'temporal_prism',
    name: 'Temporal Prism',
    description: 'A crystal that refracts time itself.',
    type: 'temporal',
    rarity: 'temporal',
    value: 2000,
    effects: { 
      temporalMana: 15, 
      knowledge: 5,
      specialEffect: 'Can see 3 turns into the future'
    },
    temporal: true,
    requiresLevel: 10
  },
  {
    id: 'temporal_hourglass',
    name: 'Eternal Hourglass',
    description: 'An hourglass that controls the flow of time.',
    type: 'temporal',
    rarity: 'temporal',
    value: 5000,
    effects: { 
      temporalMana: 30, 
      spellPower: 8,
      specialEffect: 'Can rewind one action per turn'
    },
    temporal: true,
    requiresLevel: 20
  },
  {
    id: 'temporal_compass',
    name: 'Temporal Compass',
    description: 'A compass that points to temporal anomalies.',
    type: 'temporal',
    rarity: 'temporal',
    value: 800,
    effects: { 
      temporalMana: 5, 
      movementPoints: 1,
      specialEffect: 'Detects temporal objects nearby'
    },
    temporal: true,
    requiresLevel: 3
  },

  // === CONSUMABLES ===
  {
    id: 'potion_health',
    name: 'Health Potion',
    description: 'A potion that restores health.',
    type: 'consumable',
    rarity: 'common',
    value: 50,
    effects: { specialEffect: 'Restores 50 HP' }
  },
  {
    id: 'potion_mana',
    name: 'Mana Potion',
    description: 'A potion that restores mana.',
    type: 'consumable',
    rarity: 'uncommon',
    value: 80,
    effects: { mana: 20 }
  },
  {
    id: 'scroll_teleport',
    name: 'Teleport Scroll',
    description: 'A scroll that enables instant teleportation.',
    type: 'consumable',
    rarity: 'rare',
    value: 200,
    effects: { specialEffect: 'Teleport to any visible location' }
  },
  {
    id: 'elixir_experience',
    name: 'Experience Elixir',
    description: 'An elixir that grants experience.',
    type: 'consumable',
    rarity: 'epic',
    value: 400,
    effects: { experience: 1000 }
  },

  // === RESOURCES ===
  {
    id: 'gold_pile',
    name: 'Gold Pile',
    description: 'A pile of gold that can be used to buy objects.',
    type: 'resource',
    rarity: 'common',
    value: 500,
    effects: { gold: 500 }
  },
  {
    id: 'gold_chest',
    name: 'Gold Chest',
    description: 'A gold chest that can contain lots of gold.',
    type: 'resource',
    rarity: 'uncommon',
    value: 1000,
    effects: { gold: 1000 }
  },
  {
    id: 'gold_vault',
    name: 'Gold Vault',
    description: 'A gold vault that is very secure.',
    type: 'resource',
    rarity: 'rare',
    value: 2000,
    effects: { gold: 2000 }
  }
];

// Helper functions
export const getObjectsByType = (type: MagicObject['type']): MagicObject[] => {
  return ALL_MAGIC_OBJECTS.filter(obj => obj.type === type);
};

export const getObjectsByRarity = (rarity: MagicObject['rarity']): MagicObject[] => {
  return ALL_MAGIC_OBJECTS.filter(obj => obj.rarity === rarity);
};

export const getTemporalObjects = (): MagicObject[] => {
  return ALL_MAGIC_OBJECTS.filter(obj => obj.temporal === true);
};

export const getObjectById = (id: string): MagicObject | undefined => {
  return ALL_MAGIC_OBJECTS.find(obj => obj.id === id);
};

// Statistics
export const MAGIC_OBJECTS_STATS = {
  total: ALL_MAGIC_OBJECTS.length,
  temporal: getTemporalObjects().length,
  weapons: getObjectsByType('weapon').length,
  armor: getObjectsByType('armor').length,
  accessories: getObjectsByType('accessory').length,
  artifacts: getObjectsByType('artifact').length,
  consumables: getObjectsByType('consumable').length,
  resources: getObjectsByType('resource').length,
  legendary: getObjectsByRarity('legendary').length,
  byRarity: {
    common: getObjectsByRarity('common').length,
    uncommon: getObjectsByRarity('uncommon').length,
    rare: getObjectsByRarity('rare').length,
    epic: getObjectsByRarity('epic').length,
    legendary: getObjectsByRarity('legendary').length,
    temporal: getObjectsByRarity('temporal').length
  }
};

export default ALL_MAGIC_OBJECTS; 