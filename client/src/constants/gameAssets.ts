// Assets open source pour le jeu Heroes of Might and Magic
// Utilisation d'images et GIFs libres de droits

// Dragons et créatures légendaires (GIFs animés de qualité)
export const CREATURE_ASSETS = {
  DRAGON_RED: '/assets/creatures/dragon-red.gif',
  DRAGON_BLUE: '/assets/creatures/dragon-red.gif', // Réutilisation pour l'instant
  DRAGON_GREEN: '/assets/creatures/dragon-red.gif', // Réutilisation pour l'instant
  PHOENIX: '/assets/creatures/phoenix.gif',
  UNICORN: '/assets/creatures/unicorn.gif',
  GRIFFIN: '/assets/creatures/griffin.gif',
  HYDRA: '/assets/creatures/dragon-red.gif', // Réutilisation pour l'instant
  MINOTAUR: '/assets/creatures/griffin.gif', // Réutilisation pour l'instant
  CENTAUR: '/assets/creatures/unicorn.gif', // Réutilisation pour l'instant
  PEGASUS: '/assets/creatures/phoenix.gif', // Réutilisation pour l'instant
};

// Héros et unités (Images PNG de qualité)
export const HERO_ASSETS = {
  WARRIOR: '/assets/heroes/warrior.png',
  MAGE: '/assets/heroes/mage.png',
  ARCHER: '/assets/heroes/archer.png',
  PALADIN: '/assets/heroes/paladin.png',
  NECROMANCER: '/assets/heroes/mage.png', // Réutilisation pour l'instant
  WIZARD: '/assets/heroes/mage.png', // Réutilisation pour l'instant
  KNIGHT: '/assets/heroes/warrior.png', // Réutilisation pour l'instant
  DRUID: '/assets/heroes/mage.png', // Réutilisation pour l'instant
};

// Effets et animations
export const EFFECT_ASSETS = {
  FIRE: 'https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif',
  ICE: 'https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif',
  LIGHTNING: 'https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif',
  HEAL: 'https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif',
  SHIELD: 'https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif',
  EXPLOSION: 'https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif',
  MAGIC: 'https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif',
  POISON: 'https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif',
};

// Sons et musique (URLs vers des fichiers audio libres)
export const AUDIO_ASSETS = {
  BACKGROUND_MUSIC: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
  SWORD_SOUND: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
  MAGIC_SOUND: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
  DRAGON_ROAR: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
  VICTORY_FANFARE: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
  DEFEAT_SOUND: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
};

// Fonctions utilitaires
export const getRandomCreatureAsset = (): string => {
  const assets = Object.values(CREATURE_ASSETS);
  return assets[Math.floor(Math.random() * assets.length)];
};

export const getRandomHeroAsset = (): string => {
  const assets = Object.values(HERO_ASSETS);
  return assets[Math.floor(Math.random() * assets.length)];
};

export const getRandomEffectAsset = (): string => {
  const assets = Object.values(EFFECT_ASSETS);
  return assets[Math.floor(Math.random() * assets.length)];
}; 