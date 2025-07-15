// 🐉 CRÉATURES ÉPIQUES POUR HEROES OF TIME
// Système complet de créatures fantastiques avec sprites et animations

export interface EpicCreature {
  id: string;
  name: string;
  race: 'Dragon' | 'Magical' | 'Beast' | 'Undead' | 'Elemental' | 'Celestial';
  tier: 1 | 2 | 3 | 4 | 5 | 6 | 7; // Niveau de puissance
  health: number;
  attack: number;
  defense: number;
  speed: number;
  damage: [number, number]; // [min, max]
  cost: number;
  special: string;
  spriteSize: 'small' | 'medium' | 'large' | 'huge';
  animations: string[];
  description: string;
}

// 🐉 DRAGONS LÉGENDAIRES
export const EPIC_DRAGONS: EpicCreature[] = [
  {
    id: 'red_dragon',
    name: 'Dragon Rouge',
    race: 'Dragon',
    tier: 7,
    health: 180,
    attack: 19,
    defense: 19,
    speed: 11,
    damage: [40, 50],
    cost: 4000,
    special: 'Souffle de Feu - Dégâts de zone',
    spriteSize: 'huge',
    animations: ['idle', 'attack', 'fly', 'breathe_fire', 'roar'],
    description: 'Le plus redoutable des dragons, maître du feu et de la destruction'
  },
  {
    id: 'blue_dragon',
    name: 'Dragon Bleu',
    race: 'Dragon',
    tier: 7,
    health: 180,
    attack: 19,
    defense: 19,
    speed: 11,
    damage: [40, 50],
    cost: 4000,
    special: 'Éclair Foudroyant - Paralyse les ennemis',
    spriteSize: 'huge',
    animations: ['idle', 'attack', 'fly', 'lightning_breath', 'roar'],
    description: 'Dragon des orages, contrôleur de la foudre et des tempêtes'
  },
  {
    id: 'green_dragon',
    name: 'Dragon Vert',
    race: 'Dragon',
    tier: 7,
    health: 180,
    attack: 19,
    defense: 19,
    speed: 11,
    damage: [40, 50],
    cost: 4000,
    special: 'Nuage Toxique - Empoisonne les ennemis',
    spriteSize: 'huge',
    animations: ['idle', 'attack', 'fly', 'poison_breath', 'roar'],
    description: 'Dragon des forêts sombres, maître des poisons mortels'
  },
  {
    id: 'golden_dragon',
    name: 'Dragon Doré',
    race: 'Dragon',
    tier: 7,
    health: 250,
    attack: 27,
    defense: 27,
    speed: 16,
    damage: [50, 66],
    cost: 8000,
    special: 'Lumière Divine - Soigne les alliés et aveugle les ennemis',
    spriteSize: 'huge',
    animations: ['idle', 'attack', 'fly', 'holy_breath', 'divine_roar'],
    description: 'Dragon céleste, gardien de la justice et de la lumière'
  }
];

// 🦄 CRÉATURES MAGIQUES
export const MAGICAL_CREATURES: EpicCreature[] = [
  {
    id: 'unicorn',
    name: 'Licorne',
    race: 'Magical',
    tier: 6,
    health: 90,
    attack: 15,
    defense: 14,
    speed: 18,
    damage: [20, 25],
    cost: 1500,
    special: 'Purification - Dissipe la magie noire',
    spriteSize: 'large',
    animations: ['idle', 'gallop', 'attack', 'heal', 'purify'],
    description: 'Créature pure aux pouvoirs de guérison et de purification'
  },
  {
    id: 'phoenix',
    name: 'Phénix',
    race: 'Magical',
    tier: 6,
    health: 100,
    attack: 17,
    defense: 11,
    speed: 21,
    damage: [25, 35],
    cost: 2000,
    special: 'Renaissance - Ressuscite après la mort',
    spriteSize: 'large',
    animations: ['idle', 'fly', 'attack', 'fire_aura', 'rebirth'],
    description: 'Oiseau de feu immortel qui renaît de ses cendres'
  },
  {
    id: 'pegasus',
    name: 'Pégase',
    race: 'Magical',
    tier: 5,
    health: 60,
    attack: 12,
    defense: 9,
    speed: 20,
    damage: [15, 20],
    cost: 800,
    special: 'Vol Magique - Ignore les obstacles',
    spriteSize: 'medium',
    animations: ['idle', 'fly', 'attack', 'dive', 'wing_gust'],
    description: 'Cheval ailé aux ailes scintillantes de magie'
  }
];

// 🦅 CRÉATURES SAUVAGES
export const WILD_BEASTS: EpicCreature[] = [
  {
    id: 'griffin',
    name: 'Griffon',
    race: 'Beast',
    tier: 5,
    health: 75,
    attack: 13,
    defense: 12,
    speed: 15,
    damage: [18, 22],
    cost: 1000,
    special: 'Plongée Dévastatrice - Double dégâts en vol',
    spriteSize: 'large',
    animations: ['idle', 'fly', 'attack', 'dive_attack', 'screech'],
    description: 'Créature mi-aigle mi-lion, gardien des trésors'
  },
  {
    id: 'hydra',
    name: 'Hydre',
    race: 'Beast',
    tier: 6,
    health: 120,
    attack: 16,
    defense: 18,
    speed: 8,
    damage: [25, 45],
    cost: 2500,
    special: 'Têtes Multiples - Attaque plusieurs ennemis',
    spriteSize: 'huge',
    animations: ['idle', 'multi_attack', 'regenerate', 'poison_spit', 'roar'],
    description: 'Serpent à plusieurs têtes aux pouvoirs régénérants'
  },
  {
    id: 'manticore',
    name: 'Manticore',
    race: 'Beast',
    tier: 5,
    health: 80,
    attack: 14,
    defense: 13,
    speed: 12,
    damage: [20, 30],
    cost: 1200,
    special: 'Dards Empoisonnés - Poison et paralysie',
    spriteSize: 'large',
    animations: ['idle', 'attack', 'tail_strike', 'poison_dart', 'roar'],
    description: 'Créature à tête humaine, corps de lion et queue de scorpion'
  }
];

// 👻 CRÉATURES MORTES-VIVANTES
export const UNDEAD_CREATURES: EpicCreature[] = [
  {
    id: 'lich',
    name: 'Liche',
    race: 'Undead',
    tier: 6,
    health: 60,
    attack: 13,
    defense: 10,
    speed: 6,
    damage: [11, 13],
    cost: 1500,
    special: 'Magie Noire - Sorts dévastateurs',
    spriteSize: 'medium',
    animations: ['idle', 'cast_spell', 'death_ray', 'summon', 'float'],
    description: 'Sorcier mort-vivant maître de la nécromancie'
  },
  {
    id: 'bone_dragon',
    name: 'Dragon Osseux',
    race: 'Undead',
    tier: 7,
    health: 150,
    attack: 17,
    defense: 15,
    speed: 9,
    damage: [25, 50],
    cost: 3000,
    special: 'Souffle Mortel - Vieillit les ennemis',
    spriteSize: 'huge',
    animations: ['idle', 'attack', 'fly', 'death_breath', 'bone_rattle'],
    description: 'Dragon ressuscité par la magie noire, terreur des vivants'
  }
];

// ⚡ CRÉATURES ÉLÉMENTAIRES
export const ELEMENTAL_CREATURES: EpicCreature[] = [
  {
    id: 'fire_elemental',
    name: 'Élémentaire de Feu',
    race: 'Elemental',
    tier: 4,
    health: 50,
    attack: 12,
    defense: 8,
    speed: 14,
    damage: [15, 25],
    cost: 600,
    special: 'Immunité au Feu - Dégâts de feu',
    spriteSize: 'medium',
    animations: ['idle', 'attack', 'fire_burst', 'flame_wall', 'burn'],
    description: 'Esprit de feu pur, incarnation de la destruction ardente'
  },
  {
    id: 'water_elemental',
    name: 'Élémentaire d\'Eau',
    race: 'Elemental',
    tier: 4,
    health: 70,
    attack: 10,
    defense: 12,
    speed: 10,
    damage: [12, 20],
    cost: 600,
    special: 'Vague Déferlante - Repousse les ennemis',
    spriteSize: 'medium',
    animations: ['idle', 'attack', 'water_wave', 'heal_rain', 'flow'],
    description: 'Esprit d\'eau cristalline aux pouvoirs de guérison'
  }
];

// 😇 CRÉATURES CÉLESTES
export const CELESTIAL_CREATURES: EpicCreature[] = [
  {
    id: 'archangel',
    name: 'Archange',
    race: 'Celestial',
    tier: 7,
    health: 120,
    attack: 18,
    defense: 16,
    speed: 18,
    damage: [30, 40],
    cost: 5000,
    special: 'Résurrection - Ramène les morts à la vie',
    spriteSize: 'large',
    animations: ['idle', 'fly', 'attack', 'heal', 'resurrect', 'divine_light'],
    description: 'Guerrier céleste aux ailes d\'or, champion de la justice'
  },
  {
    id: 'seraph',
    name: 'Séraphin',
    race: 'Celestial',
    tier: 6,
    health: 90,
    attack: 16,
    defense: 14,
    speed: 20,
    damage: [25, 35],
    cost: 3000,
    special: 'Feu Sacré - Brûle les démons',
    spriteSize: 'large',
    animations: ['idle', 'fly', 'attack', 'holy_fire', 'blessing'],
    description: 'Ange de feu sacré, purificateur des ténèbres'
  }
];

// 🎯 FONCTIONS UTILITAIRES
export const ALL_EPIC_CREATURES = [
  ...EPIC_DRAGONS,
  ...MAGICAL_CREATURES,
  ...WILD_BEASTS,
  ...UNDEAD_CREATURES,
  ...ELEMENTAL_CREATURES,
  ...CELESTIAL_CREATURES
];

export function getCreatureByRace(race: EpicCreature['race']): EpicCreature[] {
  return ALL_EPIC_CREATURES.filter(creature => creature.race === race);
}

export function getCreatureByTier(tier: number): EpicCreature[] {
  return ALL_EPIC_CREATURES.filter(creature => creature.tier === tier);
}

export function getCreatureById(id: string): EpicCreature | undefined {
  return ALL_EPIC_CREATURES.find(creature => creature.id === id);
}

export function getRandomCreature(): EpicCreature {
  return ALL_EPIC_CREATURES[Math.floor(Math.random() * ALL_EPIC_CREATURES.length)];
}

// 🎨 SPRITES POUR CRÉATURES
export const CREATURE_SPRITES = {
  // Dragons
  red_dragon: '/assets/creatures/dragons/red_dragon.svg',
  blue_dragon: '/assets/creatures/dragons/blue_dragon.svg',
  green_dragon: '/assets/creatures/dragons/green_dragon.svg',
  golden_dragon: '/assets/creatures/dragons/golden_dragon.svg',
  
  // Créatures magiques
  unicorn: '/assets/creatures/magical/unicorn.svg',
  phoenix: '/assets/creatures/magical/phoenix.svg',
  pegasus: '/assets/creatures/magical/pegasus.svg',
  
  // Bêtes sauvages
  griffin: '/assets/creatures/beasts/griffin.svg',
  hydra: '/assets/creatures/beasts/hydra.svg',
  manticore: '/assets/creatures/beasts/manticore.svg',
  
  // Morts-vivants
  lich: '/assets/creatures/undead/lich.svg',
  bone_dragon: '/assets/creatures/undead/bone_dragon.svg',
  
  // Élémentaires
  fire_elemental: '/assets/creatures/elementals/fire_elemental.svg',
  water_elemental: '/assets/creatures/elementals/water_elemental.svg',
  
  // Célestes
  archangel: '/assets/creatures/celestial/archangel.svg',
  seraph: '/assets/creatures/celestial/seraph.svg'
};

console.log('🐉 Epic Creatures System Loaded!', ALL_EPIC_CREATURES.length, 'creatures available'); 