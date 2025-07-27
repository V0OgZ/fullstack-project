// 🐉 DRAGON ROUGE SAUVEGARDÉ
// Sauvegarde du contenu épique que l'utilisateur aime bien

export const DRAGON_ROUGE = {
  id: 'dragon-rouge',
  name: 'Dragon Rouge',
  type: 'creature',
  tier: 7,
  race: 'Dragon',
  attack: 27,
  defense: 27,
  health: 180,
  speed: 11,
  damage: [40, 50],
  special: 'Breath of Fire - Deals fire damage to all enemies',
  spriteUrl: '/assets/creatures/dragon-red.gif',
  description: 'Le plus puissant des dragons, maître du feu et de la destruction',
  rarity: 'Legendary',
  cost: 30000,
  abilities: [
    'Fire Breath',
    'Flight',
    'Large Creature',
    'Immune to Fire',
    'Fear Aura'
  ]
};

// Configuration pour l'affichage du dragon rouge
export const DRAGON_ROUGE_CONFIG = {
  displayName: '🐉 Dragon Rouge',
  emoji: '🐉',
  color: '#ff4444',
  backgroundColor: '#2d0000',
  borderColor: '#ff6666',
  glowColor: '#ff0000'
};

// Fonction pour récupérer le dragon rouge
export const getDragonRouge = () => DRAGON_ROUGE;

// Fonction pour vérifier si le dragon rouge est disponible
export const isDragonRougeAvailable = () => {
  return DRAGON_ROUGE.spriteUrl && DRAGON_ROUGE.name;
}; 