// Types pour le jeu Heroes of Time

export interface Position {
  x: number;
  y: number;
}

export interface Tile {
  x: number;
  y: number;
  terrain: string;
  hero?: Hero;
  creature?: Creature;
  building?: Building;
  resource?: Resource;
  structure?: Structure;
  zfc?: ZFC;
  explored: boolean;
  visible: boolean;
  movementCost: number;
  walkable?: boolean;
  visionLevel?: 'clear' | 'zfc' | 'explored' | 'hidden'; // NOUVEAU: Niveau de vision pour ZFC
}

export interface Hero {
  id: string;
  name: string;
  class: string;
  level: number;
  experience: number;
  position: Position;
  movementPoints: number;
  maxMovementPoints: number;
  health: number;
  maxHealth: number;
  mana: number;
  maxMana: number;
  attack: number;
  defense: number;
  spellPower: number;
  knowledge: number;
  morale: number;
  luck: number;
  skills: Skill[];
  spells: Spell[];
  artifacts: Artifact[];
  army: Unit[];
  playerId: string;
  playerColor: PlayerColor; // NOUVEAU: Couleur du joueur
  portraitId: string; // NOUVEAU: ID du portrait
  mountType: MountType; // NOUVEAU: Type de monture
  flagColor: string; // NOUVEAU: Couleur du drapeau
}

export interface Creature {
  id: string;
  name: string;
  type: string;
  level: number;
  position: Position;
  health: number;
  maxHealth: number;
  attack: number;
  defense: number;
  damage: number;
  speed: number;
  morale: number;
  luck: number;
  abilities: string[];
  playerId?: string;
  playerColor?: PlayerColor; // NOUVEAU: Couleur du joueur si contrôlé
}

export interface Building {
  id: string;
  name: string;
  type: string;
  position: Position;
  level: number;
  maxLevel: number;
  production: string[];
  cost: ResourceCost;
  requirements: string[];
  playerId: string;
  playerColor: PlayerColor; // NOUVEAU: Couleur du joueur
}

export interface Resource {
  id: string;
  name: string;
  type: string;
  position: Position;
  amount: number;
  maxAmount: number;
  respawnTime: number;
  lastHarvested: number;
}

export interface Structure {
  id: string;
  name: string;
  type: string;
  position: Position;
  level: number;
  maxLevel: number;
  effects: string[];
  requirements: string[];
  owner?: string;
  playerId?: string;
  playerColor?: PlayerColor; // NOUVEAU: Couleur du joueur si contrôlé
}

export interface ZFC {
  id: string;
  name: string;
  type: string;
  position: Position;
  radius: number;
  effects: string[];
  playerId?: string;
  playerColor?: PlayerColor; // NOUVEAU: Couleur du joueur si contrôlé
}

export interface Unit {
  id: string;
  name: string;
  type: string;
  count: number;
  maxCount: number;
  level: number;
  experience: number;
  attack: number;
  defense: number;
  damage: number;
  health: number;
  speed: number;
  morale: number;
  luck: number;
  abilities: string[];
  upgrades: string[];
}

export interface Skill {
  id: string;
  name: string;
  level: number;
  maxLevel: number;
  description: string;
  effects: string[];
}

export interface Spell {
  id: string;
  name: string;
  school: string;
  level: number;
  manaCost: number;
  description: string;
  effects: string[];
  range: number;
  area: number;
}

export interface Artifact {
  id: string;
  name: string;
  type: string;
  slot: string;
  level: number;
  description: string;
  effects: string[];
  requirements: string[];
}

export interface ResourceCost {
  gold: number;
  wood: number;
  stone: number;
  ore: number;
  gems: number;
  mercury: number;
  sulfur: number;
  crystal: number;
  mana?: number;
}

export interface Game {
  id: string;
  name: string;
  scenario: string;
  players: Player[];
  currentPlayerId: string;
  turn: number;
  maxTurns: number;
  map: Tile[][];
  date: string;
  status: GameStatus;
  settings: GameSettings;
  gameMode?: 'standard' | 'hotseat' | 'multiplayer' | 'ai';
  timeline?: TimelineAction[];
}

export interface Player {
  id: string;
  name: string;
  color: PlayerColor; // NOUVEAU: Couleur du joueur
  faction: string;
  heroes: Hero[];
  castles: Building[];
  resources: ResourceCost;
  artifacts: Artifact[];
  spells: Spell[];
  skills: Skill[];
  army: Unit[];
  status: PlayerStatus;
  ai: boolean;
  difficulty?: AIDifficulty;
}

export interface GameAction {
  type: 'move' | 'attack' | 'collect' | 'cast' | 'recruit' | 'build';
  heroId?: string;
  targetPosition?: Position;
  targetId?: string;
  spellId?: string;
  unitType?: string;
  buildingType?: string;
  id?: string;
  status?: 'pending' | 'executing' | 'completed' | 'failed';
}

export interface CombatResult {
  id: string;
  attackerId: string;
  defenderId: string;
  damage: number;
  defenderHealth: number;
  attackerHealth: number;
  timestamp: number;
  result: 'victory' | 'defeat' | 'draw';
}

export interface GameState {
  currentGame: Game | null;
  currentPlayer: Player | null;
  pendingActions: GameAction[];
  combatResults: CombatResult[];
  isLoading: boolean;
  error: string | null;
}

// ZFC-related types
export interface TimelineAction {
  id: string;
  type: string;
  heroId: string;
  targetPosition?: Position;
  timestamp: number;
  status: 'pending' | 'executing' | 'completed' | 'failed' | 'PENDING' | 'CONFIRMED' | 'LOCKED' | 'DISCARDED';
}

export interface ShadowAction {
  id: string;
  originalActionId: string;
  alternateTimeline: string;
  probability: number;
  consequences: string[];
}

export interface ZoneOfCausality {
  id: string;
  center: Position;
  radius: number;
  temporalStrength: number;
  affectedTiles: Position[];
}

// NOUVEAUX TYPES POUR LE SYSTÈME DE COULEURS ET MONTURES

export type PlayerColor = 'red' | 'blue' | 'green' | 'yellow' | 'purple' | 'orange' | 'cyan' | 'pink';

export type MountType = 'horse' | 'pegasus' | 'griffin' | 'dragon' | 'unicorn' | 'none';

export interface PlayerColorConfig {
  color: PlayerColor;
  hex: string;
  rgb: string;
  flagColor: string;
  borderColor: string;
  highlightColor: string;
  name: string;
}

export interface HeroPortrait {
  id: string;
  name: string;
  class: string;
  path: string;
  fallback: string;
  type: 'svg' | 'png' | 'gif';
  metadata: {
    width: number;
    height: number;
    animated?: boolean;
  };
}

export interface HeroSprite {
  id: string;
  name: string;
  class: string;
  path: string;
  fallback: string;
  type: 'svg' | 'png' | 'gif';
  metadata: {
    width: number;
    height: number;
    animated?: boolean;
    frames?: number;
    duration?: number;
  };
}

export interface MountSprite {
  type: MountType;
  path: string;
  fallback: string;
  metadata: {
    width: number;
    height: number;
    animated?: boolean;
  };
}

export interface FlagSprite {
  color: PlayerColor;
  path: string;
  fallback: string;
  metadata: {
    width: number;
    height: number;
  };
}

export type GameStatus = 'waiting' | 'active' | 'paused' | 'finished' | 'cancelled';

export type PlayerStatus = 'active' | 'defeated' | 'surrendered' | 'disconnected';

export type AIDifficulty = 'easy' | 'normal' | 'hard' | 'expert';

export interface GameSettings {
  mapSize: 'small' | 'medium' | 'large' | 'huge';
  playerCount: number;
  aiCount: number;
  startingResources: 'low' | 'normal' | 'high';
  startingHeroes: number;
  startingLevel: number;
  victoryConditions: string[];
  defeatConditions: string[];
  timeLimit?: number;
  turnLimit?: number;
}

// Political types for compatibility
export interface PoliticalAdvisor {
  id: string;
  name: string;
  role?: string;
  avatar?: string;
  opinion?: number;
  personality?: any;
}

export interface PoliticalChoice {
  id: string;
  text: string;
  consequences?: string[];
}

export interface PoliticalEvent {
  id: string;
  title: string;
  description: string;
  choices: PoliticalChoice[];
}

export interface Reputation {
  value: number;
  trend: 'increasing' | 'decreasing' | 'stable';
  type?: string;
} 