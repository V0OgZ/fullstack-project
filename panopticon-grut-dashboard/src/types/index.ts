// 🏛️ TYPES PANOPTICON GRUT - Vision 5D→2.5D des données Heroes of Time

/* ================================
   TYPES DE BASE DU MONDE 
   ================================ */

export interface Position {
  x: number;
  y: number;
}

export interface Position3D extends Position {
  z?: number;
  timeline?: number;
  temporalLayer?: number;
}

/* ================================
   ÉTAT DU JEU - GAMESTATE
   ================================ */

export interface GameState {
  gameId: string;
  currentPlayerId: string;
  currentTurn: number;
  turnStartTime: string;
  lastActionTime: string;
  
  // États des joueurs
  playerIds: string[];
  selectedHeroes: Record<string, string>; // playerId -> heroId
  heroPositions: Record<string, Position>; // heroId -> position
  
  // État du monde
  mapData: GameMap;
  buildings: Building[];
  resources: Record<string, number>;
  
  // Métadonnées temporelles GRUT
  quantumState?: string;
  timelineCount?: number;
  temporalEngine?: string;
}

/* ================================
   CARTE DU MONDE
   ================================ */

export interface GameMap {
  width: number;
  height: number;
  tiles: MapTile[][];
  structures: Structure[];
  neutralCreatures: Creature[];
}

export interface MapTile {
  x: number;
  y: number;
  terrain: TerrainType;
  isVisible: boolean;
  isExplored: boolean;
  occupiedBy?: string; // heroId ou creatureId
}

export type TerrainType = 'grass' | 'forest' | 'mountain' | 'water' | 'desert' | 'swamp';

export interface Structure {
  id: string;
  type: StructureType;
  position: Position;
  ownerId?: string;
  garrison?: Creature[];
}

export type StructureType = 'castle' | 'mine' | 'dwelling' | 'artifact_site' | 'temple';

/* ================================
   HÉROS ET CRÉATURES
   ================================ */

export interface Hero {
  id: string;
  name: string;
  class: HeroClass;
  level: number;
  experience: number;
  position: Position;
  ownerId: string;
  
  // Stats
  attack: number;
  defense: number;
  knowledge: number;
  spellPower: number;
  
  // Resources
  movementPoints: number;
  maxMovementPoints: number;
  health: number;
  maxHealth: number;
  mana: number;
  maxMana: number;
  
  // Inventory
  artifacts: Artifact[];
  spells: Spell[];
  army: CreatureStack[];
}

export type HeroClass = 'knight' | 'cleric' | 'ranger' | 'druid' | 'alchemist' | 'wizard' | 'warlock' | 'necromancer' | 'PHILOSOPHER_HERO';

export interface CreatureStack {
  creatureType: string;
  quantity: number;
  health: number;
}

export interface Creature {
  id: string;
  type: string;
  name: string;
  level: number;
  position: Position;
  health: number;
  maxHealth: number;
  
  // Combat stats
  attack: number;
  defense: number;
  damage: [number, number]; // min-max damage
  speed: number;
  
  // Special abilities
  abilities: string[];
  immunities: string[];
}

/* ================================
   OBJETS ET ARTEFACTS
   ================================ */

export interface Artifact {
  id: string;
  name: string;
  type: ArtifactType;
  tier: number;
  effects: ArtifactEffect[];
  description: string;
}

export type ArtifactType = 'weapon' | 'armor' | 'accessory' | 'misc' | 'artefact_légendaire';

export interface ArtifactEffect {
  type: 'stat_bonus' | 'spell_cast' | 'immunity' | 'special';
  value: number | string;
  target: string;
}

export interface Spell {
  id: string;
  name: string;
  school: MagicSchool;
  level: number;
  manaCost: number;
  effect: string;
  description: string;
}

export type MagicSchool = 'air' | 'earth' | 'fire' | 'water' | 'death';

/* ================================
   HÉROS PHILOSOPHIQUES SPÉCIAUX
   ================================ */

export interface PhilosopherHero extends Hero {
  class: 'PHILOSOPHER_HERO';
  philosophicalType: 'evade_cave' | 'ontological_guide' | 'truth_revealer';
  specialAbilities: PhilosopherAbility[];
  panopticonAccess: boolean;
}

export interface PhilosopherAbility {
  name: string;
  type: 'shadow_perception' | 'truth_unveiling' | 'reality_guidance' | 'panopticon_opening';
  description: string;
  hotsFormula: string;
  cooldown?: number;
}

/* ================================
   ARTEFACTS LÉGENDAIRES GRUT
   ================================ */

export interface LegendaryArtifact extends Artifact {
  type: 'artefact_légendaire';
  rarity: 'unique' | 'legendary' | 'mythical';
  faction: string;
  formula: string;
  activation: string;
  effect: {
    summary: string;
    details: string[];
  };
  quotes: string[];
  metadata: {
    access_mode?: string;
    source?: string;
    translator_warning?: string;
    tags: string[];
  };
}

export interface JointCosmiqueJean extends LegendaryArtifact {
  id: 'item_joint_jean_grofignon';
  name: 'Le Joint Oublié de Jean-Grofignon';
  metadata: {
    access_mode: 'PANOPTICON:200D:READ_ONLY';
    source: 'Jean-Grofignon';
    translator_warning: string;
    tags: ['godmode', 'admin', 'hallucination', 'temps', 'meta'];
  };
}

/* ================================
   BÂTIMENTS ET ÉCONOMIE
   ================================ */

export interface Building {
  id: string;
  buildingId: string;
  castleId: string;
  playerId: string;
  gameId: string;
  
  buildingType: string;
  level: number;
  maxLevel: number;
  position: Position;
  
  isConstructed: boolean;
  constructionTime: number;
  constructionStarted: string;
  constructionCompleted?: string;
  
  // Costs
  goldCost: number;
  woodCost?: number;
  stoneCost?: number;
  oreCost?: number;
  crystalCost?: number;
  gemsCost?: number;
}

export interface Resources {
  gold: number;
  wood: number;
  stone: number;
  ore: number;
  crystal: number;
  gems: number;
  mercury: number;
  sulfur: number;
}

/* ================================
   SESSIONS MULTIJOUEUR
   ================================ */

export interface GameSession {
  id: number;
  sessionId: string;
  name: string;
  status: GameSessionStatus;
  maxPlayers: number;
  currentPlayers: number;
  gameMode: string;
  
  createdAt: string;
  startedAt?: string;
  endedAt?: string;
  
  playerIds: string[];
  
  // Phase 5 network features
  networkMode: boolean;
  realTimeSync: boolean;
  zfcEnabled: boolean;
}

export type GameSessionStatus = 'WAITING' | 'ACTIVE' | 'PAUSED' | 'ENDED' | 'CANCELLED';

/* ================================
   VISION GRUT 5D→2.5D
   ================================ */

export interface GrutVision {
  // Vue omnisciente de tous les jeux actifs
  activeGames: GameState[];
  activeSessions: GameSession[];
  
  // Analyse causale
  causalConflicts: CausalConflict[];
  timelineIntegrity: number;
  
  // Métriques de performance
  systemMetrics: SystemMetrics;
  
  // État du panopticon
  panopticonStatus: 'WATCHING' | 'ANALYZING' | 'INTERVENING';
  lastUpdate: string;
  
  // NOUVEAUX : Éléments légendaires
  legendaryArtifacts?: LegendaryArtifact[];
  philosopherHeroes?: PhilosopherHero[];
  jointCosmiqueStatus?: {
    isActive: boolean;
    currentUser?: string;
    panopticonMode?: string;
    hallucinationLevel?: number;
  };
}

export interface CausalConflict {
  id: string;
  gameId: string;
  type: 'temporal' | 'spatial' | 'resource';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  affectedPlayers: string[];
  detectedAt: string;
}

export interface SystemMetrics {
  activeGames: number;
  totalPlayers: number;
  averageResponseTime: number;
  memoryUsage: number;
  cpuUsage: number;
  
  // Métriques Heroes of Time spécifiques
  totalHeroes: number;
  totalBuildings: number;
  activeSpells: number;
  quantumStates: number;
  
  // NOUVEAUX : Métriques philosophiques
  philosopherHeroesActive?: number;
  legendaryArtifactsInUse?: number;
  panopticonAccessCount?: number;
}

/* ================================
   RÉPONSES API
   ================================ */

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: string;
}

export interface GameListResponse {
  games: GameState[];
  total: number;
  page: number;
  pageSize: number;
}

export interface SessionListResponse {
  sessions: GameSession[];
  total: number;
} 