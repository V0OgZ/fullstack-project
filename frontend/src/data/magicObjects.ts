// Heroes of Time and Magic - Complete Magic Objects Library
// Objets temporels spéciaux + objets classiques Heroes of Might and Magic

export interface MagicObject {
  id: string;
  name: string;
  type: 'weapon' | 'armor' | 'accessory' | 'artifact' | 'consumable' | 'temporal' | 'resource';
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'temporal';
  description: string;
  effects: {
    attack?: number;
    defense?: number;
    knowledge?: number;
    spellPower?: number;
    movementPoints?: number;
    mana?: number;
    gold?: number;
    experience?: number;
    temporalMana?: number;
    specialEffect?: string;
  };
  requiresLevel?: number;
  slot?: 'weapon' | 'armor' | 'helmet' | 'boots' | 'ring' | 'amulet' | 'cape' | 'gloves' | 'belt' | 'temporal';
  value: number;
  temporal?: boolean;
}

// ============================================================================
// OBJETS TEMPORELS SPÉCIAUX
// ============================================================================

export const TEMPORAL_OBJECTS: MagicObject[] = [
  {
    id: 'time_crystal',
    name: 'Cristal de Temps',
    type: 'temporal',
    rarity: 'temporal',
    description: 'Énergie temporelle cristallisée qui régénère le mana temporel',
    effects: {
      temporalMana: 2,
      specialEffect: '+2 Mana temporel par tour'
    },
    slot: 'temporal',
    value: 5000,
    temporal: true
  },
  {
    id: 'eternal_hourglass',
    name: 'Sablier Éternel',
    type: 'temporal',
    rarity: 'temporal',
    description: 'Relique des premiers chronurgistes permettant de ralentir le temps local',
    effects: {
      specialEffect: 'Ralentit le temps dans un rayon de 2 zones'
    },
    slot: 'temporal',
    value: 8000,
    temporal: true
  },
  {
    id: 'epoch_mirror',
    name: 'Miroir des Époques',
    type: 'temporal',
    rarity: 'temporal',
    description: 'Reflet des réalités alternatives révélant les actions des autres timelines',
    effects: {
      specialEffect: 'Révèle les actions prévues des ennemis dans les autres timelines'
    },
    slot: 'temporal',
    value: 6000,
    temporal: true
  },
  {
    id: 'temporal_chest',
    name: 'Coffre Temporel',
    type: 'temporal',
    rarity: 'temporal',
    description: 'Trésor perdu dans le temps contenant des artefacts de différentes époques',
    effects: {
      specialEffect: 'Contient 1-3 artefacts aléatoires de différentes époques'
    },
    slot: 'temporal',
    value: 10000,
    temporal: true
  },
  {
    id: 'chronos_amulet',
    name: 'Amulette de Chronos',
    type: 'temporal',
    rarity: 'temporal',
    description: 'Amulette divine permettant de manipuler le flux temporel',
    effects: {
      temporalMana: 3,
      specialEffect: 'Permet de lancer des sorts temporels sans coût de mana (1 fois par tour)'
    },
    slot: 'amulet',
    value: 15000,
    temporal: true
  },
  {
    id: 'time_anchor',
    name: 'Ancre Temporelle',
    type: 'temporal',
    rarity: 'temporal',
    description: 'Dispositif stabilisant une zone contre les interférences temporelles',
    effects: {
      specialEffect: 'Empêche les modifications temporelles dans un rayon de 3 zones'
    },
    slot: 'temporal',
    value: 12000,
    temporal: true
  }
];

// ============================================================================
// ARMES MAGIQUES
// ============================================================================

export const MAGIC_WEAPONS: MagicObject[] = [
  {
    id: 'sword_of_might',
    name: 'Épée de Puissance',
    type: 'weapon',
    rarity: 'uncommon',
    description: 'Épée enchantée qui augmente la force de son porteur',
    effects: { attack: 3 },
    slot: 'weapon',
    value: 1000
  },
  {
    id: 'blade_of_heroes',
    name: 'Lame des Héros',
    type: 'weapon',
    rarity: 'rare',
    description: 'Épée légendaire forgée pour les plus grands héros',
    effects: { attack: 6, experience: 500 },
    slot: 'weapon',
    value: 3000,
    requiresLevel: 5
  },
  {
    id: 'archangel_sword',
    name: 'Épée de l\'Archange',
    type: 'weapon',
    rarity: 'legendary',
    description: 'Arme divine bénie par les archanges',
    effects: { attack: 12, spellPower: 5, specialEffect: 'Résurrection automatique 1 fois par combat' },
    slot: 'weapon',
    value: 10000,
    requiresLevel: 10
  },
  {
    id: 'dragon_slayer',
    name: 'Tueur de Dragons',
    type: 'weapon',
    rarity: 'epic',
    description: 'Épée spécialement forgée pour tuer les dragons',
    effects: { attack: 8, specialEffect: '+50% dégâts contre les dragons' },
    slot: 'weapon',
    value: 5000,
    requiresLevel: 7
  },
  {
    id: 'staff_of_power',
    name: 'Bâton de Puissance',
    type: 'weapon',
    rarity: 'rare',
    description: 'Bâton magique amplifiant les sorts',
    effects: { spellPower: 10, mana: 20 },
    slot: 'weapon',
    value: 4000,
    requiresLevel: 6
  }
];

// ============================================================================
// ARMURES MAGIQUES
// ============================================================================

export const MAGIC_ARMOR: MagicObject[] = [
  {
    id: 'leather_armor',
    name: 'Armure de Cuir Renforcé',
    type: 'armor',
    rarity: 'common',
    description: 'Armure légère offrant une protection de base',
    effects: { defense: 2 },
    slot: 'armor',
    value: 500
  },
  {
    id: 'chain_mail',
    name: 'Cotte de Mailles',
    type: 'armor',
    rarity: 'uncommon',
    description: 'Armure métallique offrant une bonne protection',
    effects: { defense: 4 },
    slot: 'armor',
    value: 1200
  },
  {
    id: 'plate_armor',
    name: 'Armure de Plates',
    type: 'armor',
    rarity: 'rare',
    description: 'Armure lourde offrant une excellente protection',
    effects: { defense: 8, movementPoints: -1 },
    slot: 'armor',
    value: 3000
  },
  {
    id: 'dragon_scale_armor',
    name: 'Armure d\'Écailles de Dragon',
    type: 'armor',
    rarity: 'epic',
    description: 'Armure forgée avec des écailles de dragon légendaire',
    effects: { defense: 12, specialEffect: 'Résistance au feu 50%' },
    slot: 'armor',
    value: 8000,
    requiresLevel: 8
  },
  {
    id: 'titans_cuirass',
    name: 'Cuirasse des Titans',
    type: 'armor',
    rarity: 'legendary',
    description: 'Armure légendaire portée par les titans',
    effects: { defense: 15, attack: 3, specialEffect: 'Immunité aux sorts de niveau 1-2' },
    slot: 'armor',
    value: 15000,
    requiresLevel: 12
  }
];

// ============================================================================
// ACCESSOIRES MAGIQUES
// ============================================================================

export const MAGIC_ACCESSORIES: MagicObject[] = [
  {
    id: 'ring_of_power',
    name: 'Anneau de Pouvoir',
    type: 'accessory',
    rarity: 'uncommon',
    description: 'Anneau augmentant la puissance magique',
    effects: { spellPower: 3 },
    slot: 'ring',
    value: 800
  },
  {
    id: 'amulet_of_life',
    name: 'Amulette de Vie',
    type: 'accessory',
    rarity: 'rare',
    description: 'Amulette protégeant contre la mort',
    effects: { specialEffect: 'Régénère 10% des PV par tour' },
    slot: 'amulet',
    value: 2500
  },
  {
    id: 'boots_of_speed',
    name: 'Bottes de Vitesse',
    type: 'accessory',
    rarity: 'uncommon',
    description: 'Bottes enchantées augmentant la vitesse',
    effects: { movementPoints: 3 },
    slot: 'boots',
    value: 1000
  },
  {
    id: 'crown_of_wisdom',
    name: 'Couronne de Sagesse',
    type: 'accessory',
    rarity: 'epic',
    description: 'Couronne royale augmentant la connaissance',
    effects: { knowledge: 10, mana: 50 },
    slot: 'helmet',
    value: 6000,
    requiresLevel: 8
  },
  {
    id: 'cape_of_shadows',
    name: 'Cape des Ombres',
    type: 'accessory',
    rarity: 'rare',
    description: 'Cape magique permettant de se faufiler discrètement',
    effects: { specialEffect: 'Invisibilité pendant 3 tours (1 fois par jour)' },
    slot: 'cape',
    value: 3500
  },
  {
    id: 'gloves_of_dexterity',
    name: 'Gants de Dextérité',
    type: 'accessory',
    rarity: 'uncommon',
    description: 'Gants améliorant la précision des attaques',
    effects: { attack: 2, specialEffect: '+10% chance de coup critique' },
    slot: 'gloves',
    value: 1200
  }
];

// ============================================================================
// ARTEFACTS LÉGENDAIRES
// ============================================================================

export const LEGENDARY_ARTIFACTS: MagicObject[] = [
  {
    id: 'grail',
    name: 'Graal',
    type: 'artifact',
    rarity: 'legendary',
    description: 'Le Saint Graal, artefact ultime conférant des pouvoirs divins',
    effects: { 
      attack: 10, 
      defense: 10, 
      knowledge: 10, 
      spellPower: 10,
      specialEffect: 'Toutes les créatures gagnent +50% statistiques'
    },
    slot: 'temporal',
    value: 100000,
    requiresLevel: 15
  },
  {
    id: 'orb_of_the_firmament',
    name: 'Orbe du Firmament',
    type: 'artifact',
    rarity: 'legendary',
    description: 'Orbe céleste contrôlant les forces cosmiques',
    effects: { 
      spellPower: 15, 
      mana: 100,
      specialEffect: 'Tous les sorts coûtent 50% de mana en moins'
    },
    slot: 'temporal',
    value: 50000,
    requiresLevel: 12
  },
  {
    id: 'armor_of_the_damned',
    name: 'Armure des Damnés',
    type: 'artifact',
    rarity: 'legendary',
    description: 'Armure maudite conférant des pouvoirs nécromantiques',
    effects: { 
      defense: 12, 
      specialEffect: 'Transforme les ennemis morts en squelettes alliés'
    },
    slot: 'armor',
    value: 40000,
    requiresLevel: 10
  },
  {
    id: 'titan_thunder',
    name: 'Tonnerre des Titans',
    type: 'artifact',
    rarity: 'legendary',
    description: 'Arme des titans maîtres de la foudre',
    effects: { 
      attack: 15, 
      specialEffect: 'Attaque de foudre touchant tous les ennemis'
    },
    slot: 'weapon',
    value: 60000,
    requiresLevel: 14
  }
];

// ============================================================================
// CONSOMMABLES ET RESSOURCES
// ============================================================================

export const CONSUMABLES: MagicObject[] = [
  {
    id: 'mana_potion',
    name: 'Potion de Mana',
    type: 'consumable',
    rarity: 'common',
    description: 'Potion restaurant le mana magique',
    effects: { mana: 50 },
    slot: 'temporal',
    value: 200
  },
  {
    id: 'healing_potion',
    name: 'Potion de Soin',
    type: 'consumable',
    rarity: 'common',
    description: 'Potion restaurant les points de vie',
    effects: { specialEffect: 'Restaure 100% des PV' },
    slot: 'temporal',
    value: 300
  },
  {
    id: 'experience_tome',
    name: 'Tome d\'Expérience',
    type: 'consumable',
    rarity: 'uncommon',
    description: 'Livre magique conférant de l\'expérience',
    effects: { experience: 1000 },
    slot: 'temporal',
    value: 1500
  },
  {
    id: 'temporal_essence',
    name: 'Essence Temporelle',
    type: 'consumable',
    rarity: 'temporal',
    description: 'Essence pure du temps permettant des manipulations temporelles',
    effects: { temporalMana: 10 },
    slot: 'temporal',
    value: 2000,
    temporal: true
  },
  {
    id: 'gold_chest',
    name: 'Coffre d\'Or',
    type: 'resource',
    rarity: 'common',
    description: 'Coffre contenant de l\'or',
    effects: { gold: 1000 },
    slot: 'temporal',
    value: 1000
  }
];

// ============================================================================
// OBJETS COMBINÉS - TOUS LES OBJETS
// ============================================================================

export const ALL_MAGIC_OBJECTS: MagicObject[] = [
  ...TEMPORAL_OBJECTS,
  ...MAGIC_WEAPONS,
  ...MAGIC_ARMOR,
  ...MAGIC_ACCESSORIES,
  ...LEGENDARY_ARTIFACTS,
  ...CONSUMABLES
];

// ============================================================================
// FONCTIONS UTILITAIRES
// ============================================================================

export const getObjectById = (id: string): MagicObject | undefined => {
  return ALL_MAGIC_OBJECTS.find(obj => obj.id === id);
};

export const getObjectsByType = (type: MagicObject['type']): MagicObject[] => {
  return ALL_MAGIC_OBJECTS.filter(obj => obj.type === type);
};

export const getObjectsByRarity = (rarity: MagicObject['rarity']): MagicObject[] => {
  return ALL_MAGIC_OBJECTS.filter(obj => obj.rarity === rarity);
};

export const getTemporalObjects = (): MagicObject[] => {
  return ALL_MAGIC_OBJECTS.filter(obj => obj.temporal === true);
};

export const getClassicObjects = (): MagicObject[] => {
  return ALL_MAGIC_OBJECTS.filter(obj => obj.temporal !== true);
};

export const getRandomObject = (rarity?: MagicObject['rarity']): MagicObject => {
  const objects = rarity ? getObjectsByRarity(rarity) : ALL_MAGIC_OBJECTS;
  return objects[Math.floor(Math.random() * objects.length)];
};

export const getObjectValue = (id: string): number => {
  const obj = getObjectById(id);
  return obj ? obj.value : 0;
};

// ============================================================================
// STATISTIQUES
// ============================================================================

export const MAGIC_OBJECTS_STATS = {
  total: ALL_MAGIC_OBJECTS.length,
  temporal: TEMPORAL_OBJECTS.length,
  weapons: MAGIC_WEAPONS.length,
  armor: MAGIC_ARMOR.length,
  accessories: MAGIC_ACCESSORIES.length,
  legendary: LEGENDARY_ARTIFACTS.length,
  consumables: CONSUMABLES.length,
  byRarity: {
    common: getObjectsByRarity('common').length,
    uncommon: getObjectsByRarity('uncommon').length,
    rare: getObjectsByRarity('rare').length,
    epic: getObjectsByRarity('epic').length,
    legendary: getObjectsByRarity('legendary').length,
    temporal: getObjectsByRarity('temporal').length
  }
};

console.log('🎮 Magic Objects Library loaded:', MAGIC_OBJECTS_STATS); 