// 🦸 HÉROS ÉPIQUES PAR RACE POUR HEROES OF TIME
// Système complet de héros légendaires avec capacités uniques

export interface EpicHero {
  id: string;
  name: string;
  race: 'Human' | 'Elf' | 'Dwarf' | 'Orc' | 'Angel' | 'Demon' | 'Dragon' | 'Undead';
  class: string;
  gender: 'Male' | 'Female';
  level: number;
  experience: number;
  stats: {
    attack: number;
    defense: number;
    spellPower: number;
    knowledge: number;
    morale: number;
    luck: number;
  };
  specialAbility: string;
  ultimateSkill: string;
  backstory: string;
  personality: 'Noble' | 'Chaotic' | 'Wise' | 'Brutal' | 'Mysterious' | 'Heroic' | 'Dark';
  portraitStyle: 'Realistic' | 'Anime' | 'Fantasy' | 'Dark' | 'Celestial';
  voiceType: 'Deep' | 'Melodic' | 'Rough' | 'Ethereal' | 'Commanding';
  favoriteCreatures: string[];
  hatedEnemies: string[];
}

// 👑 HÉROS HUMAINS
export const HUMAN_HEROES: EpicHero[] = [
  {
    id: 'arthur_pendragon',
    name: 'Arthur Pendragon',
    race: 'Human',
    class: 'Roi-Chevalier',
    gender: 'Male',
    level: 25,
    experience: 50000,
    stats: { attack: 20, defense: 18, spellPower: 8, knowledge: 12, morale: 15, luck: 10 },
    specialAbility: 'Excalibur - Épée légendaire qui double les dégâts',
    ultimateSkill: 'Table Ronde - Invoque les chevaliers légendaires',
    backstory: 'Roi légendaire d\'Angleterre, tiré l\'épée de la pierre et unit le royaume',
    personality: 'Noble',
    portraitStyle: 'Realistic',
    voiceType: 'Commanding',
    favoriteCreatures: ['archangel', 'griffin', 'pegasus'],
    hatedEnemies: ['lich', 'bone_dragon', 'demon']
  },
  {
    id: 'jeanne_darc',
    name: 'Jeanne d\'Arc',
    race: 'Human',
    class: 'Paladine Sainte',
    gender: 'Female',
    level: 22,
    experience: 40000,
    stats: { attack: 16, defense: 20, spellPower: 15, knowledge: 18, morale: 20, luck: 12 },
    specialAbility: 'Inspiration Divine - Booste toute l\'armée',
    ultimateSkill: 'Flamme Purificatrice - Détruit les morts-vivants',
    backstory: 'Paysanne française guidée par les voix célestes pour sauver son pays',
    personality: 'Heroic',
    portraitStyle: 'Realistic',
    voiceType: 'Melodic',
    favoriteCreatures: ['seraph', 'unicorn', 'phoenix'],
    hatedEnemies: ['undead', 'demon', 'dark_magic']
  },
  {
    id: 'merlin_wizard',
    name: 'Merlin l\'Enchanteur',
    race: 'Human',
    class: 'Archimage',
    gender: 'Male',
    level: 30,
    experience: 80000,
    stats: { attack: 8, defense: 12, spellPower: 25, knowledge: 30, morale: 10, luck: 15 },
    specialAbility: 'Magie Primordiale - Contrôle tous les éléments',
    ultimateSkill: 'Métamorphose Draconique - Se transforme en dragon',
    backstory: 'Sorcier légendaire, mentor d\'Arthur et gardien des secrets anciens',
    personality: 'Wise',
    portraitStyle: 'Fantasy',
    voiceType: 'Ethereal',
    favoriteCreatures: ['golden_dragon', 'phoenix', 'fire_elemental'],
    hatedEnemies: ['chaos', 'corruption', 'ignorance']
  }
];

// 🧝 HÉROS ELFES
export const ELF_HEROES: EpicHero[] = [
  {
    id: 'legolas_greenleaf',
    name: 'Legolas Feuille-Verte',
    race: 'Elf',
    class: 'Archer Royal',
    gender: 'Male',
    level: 20,
    experience: 35000,
    stats: { attack: 18, defense: 14, spellPower: 12, knowledge: 16, morale: 12, luck: 18 },
    specialAbility: 'Tir Infaillible - Ne rate jamais sa cible',
    ultimateSkill: 'Pluie de Flèches Elfiques - Attaque tous les ennemis',
    backstory: 'Prince elfe des forêts éternelles, gardien de la nature',
    personality: 'Noble',
    portraitStyle: 'Fantasy',
    voiceType: 'Melodic',
    favoriteCreatures: ['unicorn', 'pegasus', 'griffin'],
    hatedEnemies: ['orc', 'undead', 'pollution']
  },
  {
    id: 'galadriel_light',
    name: 'Galadriel Lumière-Étoilée',
    race: 'Elf',
    class: 'Reine Mage',
    gender: 'Female',
    level: 28,
    experience: 70000,
    stats: { attack: 10, defense: 16, spellPower: 22, knowledge: 25, morale: 15, luck: 20 },
    specialAbility: 'Miroir de Vérité - Révèle les secrets ennemis',
    ultimateSkill: 'Lumière d\'Eärendil - Aveugle et purifie',
    backstory: 'Reine millénaire des elfes, gardienne de l\'anneau de pouvoir',
    personality: 'Wise',
    portraitStyle: 'Celestial',
    voiceType: 'Ethereal',
    favoriteCreatures: ['archangel', 'seraph', 'phoenix'],
    hatedEnemies: ['darkness', 'corruption', 'sauron']
  },
  {
    id: 'thranduil_woodland',
    name: 'Thranduil Roi-des-Bois',
    race: 'Elf',
    class: 'Roi Sylvestre',
    gender: 'Male',
    level: 24,
    experience: 55000,
    stats: { attack: 16, defense: 18, spellPower: 18, knowledge: 20, morale: 16, luck: 14 },
    specialAbility: 'Maîtrise Forestière - Contrôle la nature',
    ultimateSkill: 'Armée des Arbres - Anime la forêt au combat',
    backstory: 'Roi des elfes sylvestres, protecteur de la forêt noire',
    personality: 'Mysterious',
    portraitStyle: 'Fantasy',
    voiceType: 'Deep',
    favoriteCreatures: ['griffin', 'unicorn', 'green_dragon'],
    hatedEnemies: ['orc', 'spider', 'deforestation']
  }
];

// ⚒️ HÉROS NAINS
export const DWARF_HEROES: EpicHero[] = [
  {
    id: 'gimli_gloinsson',
    name: 'Gimli fils de Glóin',
    race: 'Dwarf',
    class: 'Guerrier de Mithril',
    gender: 'Male',
    level: 18,
    experience: 30000,
    stats: { attack: 22, defense: 20, spellPower: 6, knowledge: 10, morale: 18, luck: 8 },
    specialAbility: 'Rage Naine - Double les dégâts pendant 3 tours',
    ultimateSkill: 'Hache Runique - Ignore toutes les défenses',
    backstory: 'Guerrier nain de la Moria, ami des elfes malgré les traditions',
    personality: 'Brutal',
    portraitStyle: 'Realistic',
    voiceType: 'Rough',
    favoriteCreatures: ['griffin', 'fire_elemental', 'manticore'],
    hatedEnemies: ['orc', 'balrog', 'darkness']
  },
  {
    id: 'thorin_oakenshield',
    name: 'Thorin Écu-de-Chêne',
    race: 'Dwarf',
    class: 'Roi sous la Montagne',
    gender: 'Male',
    level: 20,
    experience: 38000,
    stats: { attack: 20, defense: 22, spellPower: 8, knowledge: 14, morale: 16, luck: 6 },
    specialAbility: 'Orcrist - Épée tueuse de gobelins',
    ultimateSkill: 'Trésor d\'Erebor - Invoque des guerriers en or',
    backstory: 'Roi nain en exil, récupère son royaume sous la montagne',
    personality: 'Noble',
    portraitStyle: 'Fantasy',
    voiceType: 'Commanding',
    favoriteCreatures: ['golden_dragon', 'griffin', 'fire_elemental'],
    hatedEnemies: ['smaug', 'orc', 'goblin']
  },
  {
    id: 'dain_ironfoot',
    name: 'Dain Pied-de-Fer',
    race: 'Dwarf',
    class: 'Seigneur de Guerre',
    gender: 'Male',
    level: 22,
    experience: 45000,
    stats: { attack: 24, defense: 18, spellPower: 4, knowledge: 12, morale: 20, luck: 10 },
    specialAbility: 'Charge Dévastatrice - Brise les lignes ennemies',
    ultimateSkill: 'Armée des Collines de Fer - Invoque une légion',
    backstory: 'Seigneur des Collines de Fer, cousin de Thorin et grand guerrier',
    personality: 'Brutal',
    portraitStyle: 'Realistic',
    voiceType: 'Rough',
    favoriteCreatures: ['manticore', 'hydra', 'fire_elemental'],
    hatedEnemies: ['orc', 'goblin', 'dragon']
  }
];

// 💀 HÉROS ORCS
export const ORC_HEROES: EpicHero[] = [
  {
    id: 'azog_defiler',
    name: 'Azog le Profanateur',
    race: 'Orc',
    class: 'Seigneur de Guerre',
    gender: 'Male',
    level: 21,
    experience: 42000,
    stats: { attack: 25, defense: 16, spellPower: 6, knowledge: 8, morale: 12, luck: 6 },
    specialAbility: 'Fureur Sanguinaire - Plus fort quand blessé',
    ultimateSkill: 'Horde Infernale - Invoque une armée d\'orcs',
    backstory: 'Chef orc albinos, ennemi juré de Thorin et terreur de la Moria',
    personality: 'Brutal',
    portraitStyle: 'Dark',
    voiceType: 'Rough',
    favoriteCreatures: ['bone_dragon', 'hydra', 'manticore'],
    hatedEnemies: ['dwarf', 'elf', 'human']
  },
  {
    id: 'bolg_spawn',
    name: 'Bolg le Géniteur',
    race: 'Orc',
    class: 'Champion Orc',
    gender: 'Male',
    level: 19,
    experience: 36000,
    stats: { attack: 23, defense: 14, spellPower: 4, knowledge: 6, morale: 14, luck: 8 },
    specialAbility: 'Régénération Brutale - Récupère en tuant',
    ultimateSkill: 'Spawn d\'Azog - Invoque des orcs géants',
    backstory: 'Fils d\'Azog, hérite de la haine familiale envers les nains',
    personality: 'Chaotic',
    portraitStyle: 'Dark',
    voiceType: 'Rough',
    favoriteCreatures: ['lich', 'bone_dragon', 'fire_elemental'],
    hatedEnemies: ['dwarf', 'light', 'order']
  }
];

// 😇 HÉROS ANGES
export const ANGEL_HEROES: EpicHero[] = [
  {
    id: 'gabriel_messenger',
    name: 'Gabriel le Messager',
    race: 'Angel',
    class: 'Archange',
    gender: 'Male',
    level: 30,
    experience: 100000,
    stats: { attack: 18, defense: 20, spellPower: 20, knowledge: 22, morale: 25, luck: 18 },
    specialAbility: 'Trompette Divine - Ressuscite les morts',
    ultimateSkill: 'Jugement Dernier - Détruit le mal absolu',
    backstory: 'Archange messager de Dieu, annonce les volontés divines',
    personality: 'Heroic',
    portraitStyle: 'Celestial',
    voiceType: 'Ethereal',
    favoriteCreatures: ['archangel', 'seraph', 'unicorn'],
    hatedEnemies: ['demon', 'undead', 'corruption']
  },
  {
    id: 'michael_warrior',
    name: 'Michel le Guerrier',
    race: 'Angel',
    class: 'Archange Guerrier',
    gender: 'Male',
    level: 32,
    experience: 120000,
    stats: { attack: 25, defense: 22, spellPower: 18, knowledge: 20, morale: 30, luck: 15 },
    specialAbility: 'Épée Flamboyante - Brûle les démons',
    ultimateSkill: 'Armée Céleste - Invoque les anges',
    backstory: 'Archange guerrier, chef des armées célestes contre les démons',
    personality: 'Heroic',
    portraitStyle: 'Celestial',
    voiceType: 'Commanding',
    favoriteCreatures: ['archangel', 'seraph', 'golden_dragon'],
    hatedEnemies: ['demon', 'satan', 'evil']
  }
];

// 🎯 SYSTÈME COMPLET
export const ALL_EPIC_HEROES = [
  ...HUMAN_HEROES,
  ...ELF_HEROES,
  ...DWARF_HEROES,
  ...ORC_HEROES,
  ...ANGEL_HEROES
];

// 🎨 PORTRAITS HÉROS
export const HERO_PORTRAITS = {
  // Humains
  arthur_pendragon: '/assets/heroes/humans/arthur_pendragon.svg',
  jeanne_darc: '/assets/heroes/humans/jeanne_darc.svg',
  merlin_wizard: '/assets/heroes/humans/merlin_wizard.svg',
  
  // Elfes
  legolas_greenleaf: '/assets/heroes/elves/legolas_greenleaf.svg',
  galadriel_light: '/assets/heroes/elves/galadriel_light.svg',
  thranduil_woodland: '/assets/heroes/elves/thranduil_woodland.svg',
  
  // Nains
  gimli_gloinsson: '/assets/heroes/dwarves/gimli_gloinsson.svg',
  thorin_oakenshield: '/assets/heroes/dwarves/thorin_oakenshield.svg',
  dain_ironfoot: '/assets/heroes/dwarves/dain_ironfoot.svg',
  
  // Orcs
  azog_defiler: '/assets/heroes/orcs/azog_defiler.svg',
  bolg_spawn: '/assets/heroes/orcs/bolg_spawn.svg',
  
  // Anges
  gabriel_messenger: '/assets/heroes/angels/gabriel_messenger.svg',
  michael_warrior: '/assets/heroes/angels/michael_warrior.svg'
};

// 🎯 FONCTIONS UTILITAIRES
export function getHeroesByRace(race: EpicHero['race']): EpicHero[] {
  return ALL_EPIC_HEROES.filter(hero => hero.race === race);
}

export function getHeroById(id: string): EpicHero | undefined {
  return ALL_EPIC_HEROES.find(hero => hero.id === id);
}

export function getRandomHero(): EpicHero {
  return ALL_EPIC_HEROES[Math.floor(Math.random() * ALL_EPIC_HEROES.length)];
}

export function getHeroesByPersonality(personality: EpicHero['personality']): EpicHero[] {
  return ALL_EPIC_HEROES.filter(hero => hero.personality === personality);
}

console.log('🦸 Epic Heroes System Loaded!', ALL_EPIC_HEROES.length, 'legendary heroes available'); 