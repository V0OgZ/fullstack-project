// Types for magic objects
export interface MagicObject {
  id: string;
  nameKey: string; // Translation key instead of hardcoded name
  descriptionKey: string; // Translation key instead of hardcoded description
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
    specialEffectKey?: string; // Translation key for special effects
  };
  slot?: 'weapon' | 'armor' | 'helmet' | 'boots' | 'ring' | 'amulet' | 'cape';
  requiresLevel?: number;
  temporal?: boolean;
}

// All magic objects collection - now using translation keys
export const ALL_MAGIC_OBJECTS: MagicObject[] = [
  // === WEAPONS ===
  {
    id: 'sword_basic',
    nameKey: 'items.sword_basic.name',
    descriptionKey: 'items.sword_basic.description',
    type: 'weapon',
    rarity: 'common',
    value: 100,
    effects: { attack: 2 },
    slot: 'weapon'
  },
  {
    id: 'sword_steel',
    nameKey: 'items.sword_steel.name',
    descriptionKey: 'items.sword_steel.description',
    type: 'weapon',
    rarity: 'uncommon',
    value: 250,
    effects: { attack: 4 },
    slot: 'weapon'
  },
  {
    id: 'sword_magic',
    nameKey: 'items.sword_magic.name',
    descriptionKey: 'items.sword_magic.description',
    type: 'weapon',
    rarity: 'rare',
    value: 500,
    effects: { attack: 6, spellPower: 2 },
    slot: 'weapon'
  },
  {
    id: 'sword_legendary',
    nameKey: 'items.sword_legendary.name',
    descriptionKey: 'items.sword_legendary.description',
    type: 'weapon',
    rarity: 'legendary',
    value: 2000,
    effects: { attack: 12, defense: 3, specialEffectKey: 'items.sword_legendary.effect' },
    slot: 'weapon',
    requiresLevel: 10
  },

  // === ARMOR ===
  {
    id: 'armor_leather',
    nameKey: 'items.armor_leather.name',
    descriptionKey: 'items.armor_leather.description',
    type: 'armor',
    rarity: 'common',
    value: 80,
    effects: { defense: 2 },
    slot: 'armor'
  },
  {
    id: 'armor_chain',
    nameKey: 'items.armor_chain.name',
    descriptionKey: 'items.armor_chain.description',
    type: 'armor',
    rarity: 'uncommon',
    value: 200,
    effects: { defense: 4 },
    slot: 'armor'
  },
  {
    id: 'armor_plate',
    nameKey: 'items.armor_plate.name',
    descriptionKey: 'items.armor_plate.description',
    type: 'armor',
    rarity: 'rare',
    value: 450,
    effects: { defense: 7 },
    slot: 'armor'
  },
  {
    id: 'armor_dragon',
    nameKey: 'items.armor_dragon.name',
    descriptionKey: 'items.armor_dragon.description',
    type: 'armor',
    rarity: 'legendary',
    value: 1800,
    effects: { defense: 10, attack: 2, specialEffectKey: 'items.armor_dragon.effect' },
    slot: 'armor',
    requiresLevel: 8
  },

  // === ACCESSORIES ===
  {
    id: 'ring_power',
    nameKey: 'items.ring_power.name',
    descriptionKey: 'items.ring_power.description',
    type: 'accessory',
    rarity: 'rare',
    value: 400,
    effects: { spellPower: 3, mana: 5 },
    slot: 'ring'
  },
  {
    id: 'amulet_wisdom',
    nameKey: 'items.amulet_wisdom.name',
    descriptionKey: 'items.amulet_wisdom.description',
    type: 'accessory',
    rarity: 'uncommon',
    value: 300,
    effects: { knowledge: 4, experience: 10 },
    slot: 'amulet'
  },
  {
    id: 'boots_speed',
    nameKey: 'items.boots_speed.name',
    descriptionKey: 'items.boots_speed.description',
    type: 'accessory',
    rarity: 'rare',
    value: 350,
    effects: { movementPoints: 2 },
    slot: 'boots'
  },
  {
    id: 'cape_stealth',
    nameKey: 'items.cape_stealth.name',
    descriptionKey: 'items.cape_stealth.description',
    type: 'accessory',
    rarity: 'epic',
    value: 800,
    effects: { defense: 2, specialEffectKey: 'items.cape_stealth.effect' },
    slot: 'cape',
    requiresLevel: 5
  },

  // === ARTIFACTS ===
  {
    id: 'crown_kings',
    nameKey: 'items.crown_kings.name',
    descriptionKey: 'items.crown_kings.description',
    type: 'artifact',
    rarity: 'legendary',
    value: 2500,
    effects: { 
      attack: 3, 
      defense: 3, 
      knowledge: 3, 
      spellPower: 3,
      specialEffectKey: 'items.crown_kings.effect'
    },
    requiresLevel: 12
  },
  {
    id: 'orb_knowledge',
    nameKey: 'items.orb_knowledge.name',
    descriptionKey: 'items.orb_knowledge.description',
    type: 'artifact',
    rarity: 'epic',
    value: 1200,
    effects: { knowledge: 8, experience: 50 },
    requiresLevel: 6
  },
  {
    id: 'staff_archmage',
    nameKey: 'items.staff_archmage.name',
    descriptionKey: 'items.staff_archmage.description',
    type: 'artifact',
    rarity: 'legendary',
    value: 3000,
    effects: { 
      spellPower: 10, 
      mana: 20, 
      knowledge: 5,
      specialEffectKey: 'items.staff_archmage.effect'
    },
    requiresLevel: 15
  },

  // === TEMPORAL OBJECTS ===
  {
    id: 'temporal_anchor',
    nameKey: 'items.temporal_anchor.name',
    descriptionKey: 'items.temporal_anchor.description',
    type: 'temporal',
    rarity: 'temporal',
    value: 1500,
    effects: { 
      temporalMana: 10, 
      specialEffectKey: 'items.temporal_anchor.effect'
    },
    temporal: true,
    requiresLevel: 8
  },
  {
    id: 'temporal_prism',
    nameKey: 'items.temporal_prism.name',
    descriptionKey: 'items.temporal_prism.description',
    type: 'temporal',
    rarity: 'temporal',
    value: 2000,
    effects: { 
      temporalMana: 15, 
      knowledge: 5,
      specialEffectKey: 'items.temporal_prism.effect'
    },
    temporal: true,
    requiresLevel: 10
  },
  {
    id: 'temporal_hourglass',
    nameKey: 'items.temporal_hourglass.name',
    descriptionKey: 'items.temporal_hourglass.description',
    type: 'temporal',
    rarity: 'temporal',
    value: 5000,
    effects: { 
      temporalMana: 30, 
      spellPower: 8,
      specialEffectKey: 'items.temporal_hourglass.effect'
    },
    temporal: true,
    requiresLevel: 20
  },
  {
    id: 'temporal_compass',
    nameKey: 'items.temporal_compass.name',
    descriptionKey: 'items.temporal_compass.description',
    type: 'temporal',
    rarity: 'temporal',
    value: 800,
    effects: { 
      temporalMana: 5, 
      movementPoints: 1,
      specialEffectKey: 'items.temporal_compass.effect'
    },
    temporal: true,
    requiresLevel: 3
  },

  // === CONSUMABLES ===
  {
    id: 'potion_health',
    nameKey: 'items.potion_health.name',
    descriptionKey: 'items.potion_health.description',
    type: 'consumable',
    rarity: 'common',
    value: 50,
    effects: { specialEffectKey: 'items.potion_health.effect' }
  },
  {
    id: 'potion_mana',
    nameKey: 'items.potion_mana.name',
    descriptionKey: 'items.potion_mana.description',
    type: 'consumable',
    rarity: 'uncommon',
    value: 80,
    effects: { mana: 20 }
  },
  {
    id: 'scroll_teleport',
    nameKey: 'items.scroll_teleport.name',
    descriptionKey: 'items.scroll_teleport.description',
    type: 'consumable',
    rarity: 'rare',
    value: 200,
    effects: { specialEffectKey: 'items.scroll_teleport.effect' }
  },
  {
    id: 'elixir_experience',
    nameKey: 'items.elixir_experience.name',
    descriptionKey: 'items.elixir_experience.description',
    type: 'consumable',
    rarity: 'epic',
    value: 400,
    effects: { experience: 1000 }
  },

  // === RESOURCES ===
  {
    id: 'gold_pile',
    nameKey: 'items.gold_pile.name',
    descriptionKey: 'items.gold_pile.description',
    type: 'resource',
    rarity: 'common',
    value: 500,
    effects: { gold: 500 }
  },
  {
    id: 'gold_chest',
    nameKey: 'items.gold_chest.name',
    descriptionKey: 'items.gold_chest.description',
    type: 'resource',
    rarity: 'uncommon',
    value: 1000,
    effects: { gold: 1000 }
  },
  {
    id: 'gold_vault',
    nameKey: 'items.gold_vault.name',
    descriptionKey: 'items.gold_vault.description',
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