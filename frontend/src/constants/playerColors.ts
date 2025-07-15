// 🎨 Configuration des couleurs de joueur pour Heroes of Time
// Inspiré de Heroes of Might and Magic 3

import { PlayerColorConfig, PlayerColor } from '../types/game';

export const PLAYER_COLORS: Record<PlayerColor, PlayerColorConfig> = {
  red: {
    color: 'red',
    hex: '#e74c3c',
    rgb: 'rgb(231, 76, 60)',
    flagColor: '#c0392b',
    borderColor: '#a93226',
    highlightColor: 'rgba(231, 76, 60, 0.3)',
    name: 'Rouge'
  },
  blue: {
    color: 'blue',
    hex: '#3498db',
    rgb: 'rgb(52, 152, 219)',
    flagColor: '#2980b9',
    borderColor: '#1f618d',
    highlightColor: 'rgba(52, 152, 219, 0.3)',
    name: 'Bleu'
  },
  green: {
    color: 'green',
    hex: '#27ae60',
    rgb: 'rgb(39, 174, 96)',
    flagColor: '#229954',
    borderColor: '#1e8449',
    highlightColor: 'rgba(39, 174, 96, 0.3)',
    name: 'Vert'
  },
  yellow: {
    color: 'yellow',
    hex: '#f1c40f',
    rgb: 'rgb(241, 196, 15)',
    flagColor: '#f39c12',
    borderColor: '#d68910',
    highlightColor: 'rgba(241, 196, 15, 0.3)',
    name: 'Jaune'
  },
  purple: {
    color: 'purple',
    hex: '#9b59b6',
    rgb: 'rgb(155, 89, 182)',
    flagColor: '#8e44ad',
    borderColor: '#7d3c98',
    highlightColor: 'rgba(155, 89, 182, 0.3)',
    name: 'Violet'
  },
  orange: {
    color: 'orange',
    hex: '#e67e22',
    rgb: 'rgb(230, 126, 34)',
    flagColor: '#d35400',
    borderColor: '#ba4a00',
    highlightColor: 'rgba(230, 126, 34, 0.3)',
    name: 'Orange'
  },
  cyan: {
    color: 'cyan',
    hex: '#1abc9c',
    rgb: 'rgb(26, 188, 156)',
    flagColor: '#16a085',
    borderColor: '#138d75',
    highlightColor: 'rgba(26, 188, 156, 0.3)',
    name: 'Cyan'
  },
  pink: {
    color: 'pink',
    hex: '#e91e63',
    rgb: 'rgb(233, 30, 99)',
    flagColor: '#c2185b',
    borderColor: '#ad1457',
    highlightColor: 'rgba(233, 30, 99, 0.3)',
    name: 'Rose'
  }
};

export const PLAYER_COLOR_NAMES: Record<PlayerColor, string> = {
  red: 'Rouge',
  blue: 'Bleu',
  green: 'Vert',
  yellow: 'Jaune',
  purple: 'Violet',
  orange: 'Orange',
  cyan: 'Cyan',
  pink: 'Rose'
};

export const PLAYER_COLOR_EMOJIS: Record<PlayerColor, string> = {
  red: '🔴',
  blue: '🔵',
  green: '🟢',
  yellow: '🟡',
  purple: '🟣',
  orange: '🟠',
  cyan: '🔷',
  pink: '💗'
};

/**
 * Obtient la configuration de couleur pour un joueur
 */
export function getPlayerColorConfig(color: PlayerColor): PlayerColorConfig {
  return PLAYER_COLORS[color] || PLAYER_COLORS.blue;
}

/**
 * Obtient le nom de la couleur pour un joueur
 */
export function getPlayerColorName(color: PlayerColor): string {
  return PLAYER_COLOR_NAMES[color] || 'Inconnu';
}

/**
 * Obtient l'emoji de la couleur pour un joueur
 */
export function getPlayerColorEmoji(color: PlayerColor): string {
  return PLAYER_COLOR_EMOJIS[color] || '⚪';
}

/**
 * Obtient toutes les couleurs disponibles
 */
export function getAvailablePlayerColors(): PlayerColor[] {
  return Object.keys(PLAYER_COLORS) as PlayerColor[];
}

/**
 * Obtient une couleur aléatoire pour un joueur
 */
export function getRandomPlayerColor(): PlayerColor {
  const colors = getAvailablePlayerColors();
  return colors[Math.floor(Math.random() * colors.length)];
}

/**
 * Obtient la couleur suivante dans la rotation
 */
export function getNextPlayerColor(currentColor: PlayerColor): PlayerColor {
  const colors = getAvailablePlayerColors();
  const currentIndex = colors.indexOf(currentColor);
  const nextIndex = (currentIndex + 1) % colors.length;
  return colors[nextIndex];
}