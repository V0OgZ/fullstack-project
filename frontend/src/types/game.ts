// Types de base pour le jeu stratégique

export interface Position {
  x: number;
  y: number;
}

export interface Tile {
  x: number;
  y: number;
  terrain: 'grass' | 'forest' | 'mountain' | 'water' | 'desert' | 'swamp';
  walkable: boolean;
  movementCost: number;
  hero?: Hero | null;
  creature?: any | null;
}

export interface MapObject {
  id: string;
  x: number;
  y: number;
  type: 'chest' | 'enemy' | 'mine' | 'temple' | 'city' | 'fort';
  content?: {
    resource?: 'gold' | 'wood' | 'stone' | 'mana';
    amount?: number;
    unitType?: string;
    level?: number;
  };
}

export interface GameMap {
  id: string;
  width: number;
  height: number;
  tiles: Tile[];
  objects: MapObject[];
}

export interface Unit {
  id: string;
  type: string;
  name: string;
  hp: number;
  maxHp: number;
  attack: number;
  defense: number;
  speed: number;
  initiative: number;
  quantity: number;
  heroId: string;
}

export interface Hero {
  id: string;
  name: string;
  position: Position;
  level: number;
  experience: number;
  movementPoints: number;
  maxMovementPoints: number;
  stats: {
    attack: number;
    defense: number;
    knowledge: number;
    spellPower: number;
  };
  units: Unit[];
  inventory: InventoryItem[];
  playerId: string;
}

export interface InventoryItem {
  id: string;
  type: 'weapon' | 'armor' | 'artifact' | 'resource';
  name: string;
  description: string;
  quantity?: number;
  stats?: {
    attack?: number;
    defense?: number;
    knowledge?: number;
    spellPower?: number;
  };
}

export interface Player {
  id: string;
  username: string;
  email: string;
  color: string;
  heroes: Hero[];
  resources: {
    gold: number;
    wood: number;
    stone: number;
    mana: number;
  };
  isActive: boolean;
}

// NOUVEAU: Types pour le système de Zones de Causalité (ZFC)
export interface ZoneOfCausality {
  playerId: string;
  radius: number;
  center: Position;
  includesTeleport: boolean;
  validUntil: number;
  reachableTiles: Position[];
  conflictZones: Position[];
}

export interface TimelineAction {
  id: string;
  turn: number;
  playerId: string;
  action: {
    type: 'move' | 'attack' | 'collect' | 'recruit' | 'build' | 'spell';
    heroId?: string;
    targetPosition?: Position;
    targetId?: string;
    spellId?: string;
    buildingType?: string;
    data?: any;
  };
  status: 'PENDING' | 'CONFIRMED' | 'DISCARDED' | 'LOCKED';
  zfc: ZoneOfCausality;
  originTimestamp: string;
  validationTimestamp?: string;
  shadowVisible: boolean;
}

export interface ShadowAction {
  actionId: string;
  playerId: string;
  type: 'move' | 'attack' | 'collect' | 'recruit' | 'build' | 'spell';
  position?: Position;
  opacity: number;
  isVisible: boolean;
}

export interface GameAction {
  id: string;
  type: 'move' | 'attack' | 'collect' | 'recruit' | 'build';
  heroId: string;
  targetPosition?: Position;
  targetId?: string;
  scheduledTime: string;
  executionTime: string;
  status: 'pending' | 'executing' | 'completed' | 'cancelled';
  data?: any;
}

export interface Game {
  id: string;
  name: string;
  map: GameMap;
  players: Player[];
  currentTurn: number;
  turnStartTime: string;
  turnDuration: number; // en minutes
  status: 'waiting' | 'active' | 'finished';
  actions: GameAction[];
  timeline: TimelineAction[]; // NOUVEAU: Timeline des actions
  zfcMap: ZoneOfCausality[]; // NOUVEAU: Carte des zones de causalité
  gameSettings: {
    maxPlayers: number;
    turnTimeLimit: number;
    victoryConditions: string[];
  };
  gameMode: 'async' | 'hotseat';
  currentPlayerTurn?: string; // ID du joueur actuel pour le mode hotseat
}

export interface CombatResult {
  id: string;
  attacker: {
    heroId: string;
    units: Unit[];
  };
  defender: {
    heroId?: string;
    units: Unit[];
  };
  result: 'victory' | 'defeat' | 'draw';
  losses: {
    attacker: Unit[];
    defender: Unit[];
  };
  loot?: InventoryItem[];
  experience?: number;
}

// NOUVEAU: Types pour le système politique inspiré de Perestroika
export interface PoliticalAdvisor {
  id: string;
  name: string;
  role: 'military' | 'economic' | 'diplomatic' | 'scientific';
  opinion: number; // -100 à +100
  influence: number; // 0 à 100
  personality: 'aggressive' | 'cautious' | 'opportunistic' | 'idealistic';
  avatar: string;
}

export interface PoliticalEvent {
  id: string;
  type: 'crisis' | 'opportunity' | 'diplomatic' | 'economic' | 'military';
  title: string;
  description: string;
  choices: PoliticalChoice[];
  deadline: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  consequences: string[];
}

export interface PoliticalChoice {
  id: string;
  text: string;
  consequences: {
    reputation: number;
    resources: Partial<Player['resources']>;
    advisorOpinions: { [advisorId: string]: number };
    futureEvents: string[];
  };
  advisorRecommendations: { [advisorId: string]: 'strongly_support' | 'support' | 'neutral' | 'oppose' | 'strongly_oppose' };
}

export interface Reputation {
  international: number; // -100 à +100
  domestic: number; // -100 à +100
  military: number; // -100 à +100
  economic: number; // -100 à +100
  diplomatic: number; // -100 à +100
}

export interface DynamicEvent {
  id: string;
  type: 'pandemic' | 'natural_disaster' | 'revolution' | 'discovery' | 'hero_appearance';
  title: string;
  description: string;
  effects: {
    duration: number; // en tours
    resourceModifiers: Partial<Player['resources']>;
    movementRestrictions: Position[];
    specialRules: string[];
  };
  triggerConditions: string[];
}

export interface GameState {
  currentGame: Game | null;
  currentPlayer: Player | null;
  pendingActions: GameAction[];
  combatResults: CombatResult[];
  isLoading: boolean;
  error: string | null;
  // NOUVEAU: État pour le système ZFC
  shadowActions: ShadowAction[];
  visibleZFCs: ZoneOfCausality[];
  lockedZones: Position[];
  // NOUVEAU: État politique
  politicalAdvisors: PoliticalAdvisor[];
  currentPoliticalEvent: PoliticalEvent | null;
  reputation: Reputation;
  activeEvents: DynamicEvent[];
} 