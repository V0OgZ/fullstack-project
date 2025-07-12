// Types for magic objects
export interface MagicObject {
  id: string;
  name: string;
  description: string;
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
    specialEffect?: string;
  };
  slot?: 'weapon' | 'armor' | 'helmet' | 'boots' | 'ring' | 'amulet' | 'cape';
  requiresLevel?: number;
  temporal?: boolean;
}

// All magic objects collection
export const ALL_MAGIC_OBJECTS: MagicObject[] = [
  // === WEAPONS ===
  {
    id: 'sword_basic',
    name: 'Épée du Novice',
    description: 'Une épée simple mais efficace pour débuter.',
    type: 'weapon',
    rarity: 'common',
    value: 100,
    effects: { attack: 2 },
    slot: 'weapon'
  },
  {
    id: 'sword_steel',
    name: 'Épée d\'Acier',
    description: 'Une épée solide forgée dans l\'acier le plus pur.',
    type: 'weapon',
    rarity: 'uncommon',
    value: 250,
    effects: { attack: 4 },
    slot: 'weapon'
  },
  {
    id: 'sword_magic',
    name: 'Lame Enchantée',
    description: 'Une épée magique qui brille d\'une lueur mystique.',
    type: 'weapon',
    rarity: 'rare',
    value: 500,
    effects: { attack: 6, spellPower: 2 },
    slot: 'weapon'
  },
  {
    id: 'sword_legendary',
    name: 'Excalibur',
    description: 'L\'épée légendaire des rois. Confère une autorité naturelle.',
    type: 'weapon',
    rarity: 'legendary',
    value: 2000,
    effects: { attack: 12, defense: 3, specialEffect: 'Augmente le moral des troupes' },
    slot: 'weapon',
    requiresLevel: 10
  },

  // === ARMOR ===
  {
    id: 'armor_leather',
    name: 'Armure de Cuir',
    description: 'Protection légère mais flexible.',
    type: 'armor',
    rarity: 'common',
    value: 80,
    effects: { defense: 2 },
    slot: 'armor'
  },
  {
    id: 'armor_chain',
    name: 'Cotte de Mailles',
    description: 'Armure métallique offrant une bonne protection.',
    type: 'armor',
    rarity: 'uncommon',
    value: 200,
    effects: { defense: 4 },
    slot: 'armor'
  },
  {
    id: 'armor_plate',
    name: 'Armure de Plates',
    description: 'Protection maximale pour les guerriers expérimentés.',
    type: 'armor',
    rarity: 'rare',
    value: 450,
    effects: { defense: 7 },
    slot: 'armor'
  },
  {
    id: 'armor_dragon',
    name: 'Écailles de Dragon',
    description: 'Armure légendaire taillée dans les écailles d\'un dragon ancien.',
    type: 'armor',
    rarity: 'legendary',
    value: 1800,
    effects: { defense: 10, attack: 2, specialEffect: 'Résistance au feu' },
    slot: 'armor',
    requiresLevel: 8
  },

  // === ACCESSORIES ===
  {
    id: 'ring_power',
    name: 'Anneau de Pouvoir',
    description: 'Augmente la puissance magique de son porteur.',
    type: 'accessory',
    rarity: 'rare',
    value: 400,
    effects: { spellPower: 3, mana: 5 },
    slot: 'ring'
  },
  {
    id: 'amulet_wisdom',
    name: 'Amulette de Sagesse',
    description: 'Confère une grande connaissance à son porteur.',
    type: 'accessory',
    rarity: 'uncommon',
    value: 300,
    effects: { knowledge: 4, experience: 10 },
    slot: 'amulet'
  },
  {
    id: 'boots_speed',
    name: 'Bottes de Célérité',
    description: 'Permet de se déplacer plus rapidement sur la carte.',
    type: 'accessory',
    rarity: 'rare',
    value: 350,
    effects: { movementPoints: 2 },
    slot: 'boots'
  },
  {
    id: 'cape_stealth',
    name: 'Cape d\'Invisibilité',
    description: 'Permet de passer inaperçu aux yeux des ennemis.',
    type: 'accessory',
    rarity: 'epic',
    value: 800,
    effects: { defense: 2, specialEffect: 'Évite certains combats' },
    slot: 'cape',
    requiresLevel: 5
  },

  // === ARTIFACTS ===
  {
    id: 'crown_kings',
    name: 'Couronne des Rois',
    description: 'Artefact royal qui inspire le respect et la loyauté.',
    type: 'artifact',
    rarity: 'legendary',
    value: 2500,
    effects: { 
      attack: 3, 
      defense: 3, 
      knowledge: 3, 
      spellPower: 3,
      specialEffect: 'Augmente les revenus de tous les châteaux' 
    },
    requiresLevel: 12
  },
  {
    id: 'orb_knowledge',
    name: 'Orbe de Connaissance',
    description: 'Artefact mystique contenant le savoir des anciens.',
    type: 'artifact',
    rarity: 'epic',
    value: 1200,
    effects: { knowledge: 8, experience: 50 },
    requiresLevel: 6
  },
  {
    id: 'staff_archmage',
    name: 'Bâton de l\'Archimage',
    description: 'Bâton légendaire amplifiant tous les pouvoirs magiques.',
    type: 'artifact',
    rarity: 'legendary',
    value: 3000,
    effects: { 
      spellPower: 10, 
      mana: 20, 
      knowledge: 5,
      specialEffect: 'Double les effets de tous les sorts' 
    },
    requiresLevel: 15
  },

  // === TEMPORAL OBJECTS ===
  {
    id: 'temporal_anchor',
    name: 'Ancre Temporelle',
    description: 'Permet de fixer un point dans le temps pour y revenir.',
    type: 'temporal',
    rarity: 'temporal',
    value: 1500,
    effects: { 
      temporalMana: 10, 
      specialEffect: 'Permet de créer un point de sauvegarde temporel' 
    },
    temporal: true,
    requiresLevel: 8
  },
  {
    id: 'temporal_prism',
    name: 'Prisme Temporel',
    description: 'Cristal qui révèle les futurs possibles.',
    type: 'temporal',
    rarity: 'temporal',
    value: 2000,
    effects: { 
      temporalMana: 15, 
      knowledge: 5,
      specialEffect: 'Vision des actions futures ennemies' 
    },
    temporal: true,
    requiresLevel: 10
  },
  {
    id: 'temporal_hourglass',
    name: 'Sablier Éternel',
    description: 'Artefact légendaire permettant de manipuler le temps.',
    type: 'temporal',
    rarity: 'temporal',
    value: 5000,
    effects: { 
      temporalMana: 30, 
      spellPower: 8,
      specialEffect: 'Permet de rejouer un tour' 
    },
    temporal: true,
    requiresLevel: 20
  },
  {
    id: 'temporal_compass',
    name: 'Boussole Temporelle',
    description: 'Indique la direction des anomalies temporelles.',
    type: 'temporal',
    rarity: 'temporal',
    value: 800,
    effects: { 
      temporalMana: 5, 
      movementPoints: 1,
      specialEffect: 'Détecte les objets temporels sur la carte' 
    },
    temporal: true,
    requiresLevel: 3
  },

  // === CONSUMABLES ===
  {
    id: 'potion_health',
    name: 'Potion de Soins',
    description: 'Restaure la santé des unités blessées.',
    type: 'consumable',
    rarity: 'common',
    value: 50,
    effects: { specialEffect: 'Restaure 25% des PV de toutes les unités' }
  },
  {
    id: 'potion_mana',
    name: 'Potion de Mana',
    description: 'Restaure les points de mana du héros.',
    type: 'consumable',
    rarity: 'uncommon',
    value: 80,
    effects: { mana: 20 }
  },
  {
    id: 'scroll_teleport',
    name: 'Parchemin de Téléportation',
    description: 'Permet de se téléporter instantanément.',
    type: 'consumable',
    rarity: 'rare',
    value: 200,
    effects: { specialEffect: 'Téléportation vers n\'importe quelle position' }
  },
  {
    id: 'elixir_experience',
    name: 'Élixir d\'Expérience',
    description: 'Accélère la progression du héros.',
    type: 'consumable',
    rarity: 'epic',
    value: 400,
    effects: { experience: 1000 }
  },

  // === RESOURCES ===
  {
    id: 'gold_pile',
    name: 'Tas d\'Or',
    description: 'Une petite fortune en pièces d\'or.',
    type: 'resource',
    rarity: 'common',
    value: 500,
    effects: { gold: 500 }
  },
  {
    id: 'gold_chest',
    name: 'Coffre au Trésor',
    description: 'Un coffre rempli de richesses.',
    type: 'resource',
    rarity: 'uncommon',
    value: 1000,
    effects: { gold: 1000 }
  },
  {
    id: 'gold_vault',
    name: 'Chambre au Trésor',
    description: 'Une fortune considérable.',
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