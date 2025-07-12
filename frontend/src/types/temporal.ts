// Heroes of Time and Magic - Temporal Game Types
// Revolutionary spacetime strategy game types

import { Position, Hero, Player } from './game';

// ============================================================================
// CORE TEMPORAL TYPES
// ============================================================================

/**
 * Position in spacetime (x, y, t)
 * The fundamental unit of the temporal strategy game
 */
export interface SpacetimePosition {
  x: number;
  y: number;
  t: number; // Time coordinate - turn or timestamp
}

/**
 * Zone states in the temporal engine
 */
export type ZoneState = 
  | 'STABLE'     // No interference possible, player has full control
  | 'UNSTABLE'   // Another player could potentially interfere
  | 'CONTESTED'  // Multiple players converging, requires resolution
  | 'CORRUPTED'; // Zone degraded due to entropy, negative effects

/**
 * Entropy levels affecting zones and actions
 */
export type EntropyLevel = 
  | 'NONE'       // 0-25% - Clean, stable
  | 'LOW'        // 25-50% - Minor instability
  | 'MEDIUM'     // 50-75% - Noticeable degradation
  | 'HIGH'       // 75-90% - Severe corruption
  | 'CRITICAL';  // 90-100% - Zone breakdown

// ============================================================================
// TEMPORAL ACTIONS & PLANS
// ============================================================================

/**
 * Types of temporal actions
 */
export type TemporalActionType = 
  | 'MOVE'
  | 'LOOT'
  | 'ATTACK'
  | 'CAST_SPELL'
  | 'BUILD'
  | 'EXPLORE'
  | 'ANCHOR'
  | 'RETREAT';

/**
 * Action planned in spacetime
 * Core unit of temporal strategy
 */
export interface ActionPlan {
  id: string;
  playerId: string;
  heroId: string;
  type: TemporalActionType;
  
  // Spacetime coordinates
  fromPosition: SpacetimePosition;
  toPosition: SpacetimePosition;
  
  // Temporal properties
  plannedAt: number;        // When player planned this action
  startsAt: number;         // When action begins in game time
  endsAt: number;          // When action completes
  
  // State and dependencies
  status: 'PLANNED' | 'EXECUTING' | 'COMPLETED' | 'CANCELLED' | 'CORRUPTED';
  requiredArtifacts?: string[];
  conflictsWith?: string[]; // Other action IDs this conflicts with
  
  // Metadata
  metadata?: {
    target?: string;        // Target object/player ID
    spell?: TemporalSpellType;
    resources?: Record<string, number>;
    notes?: string;
  };
}

/**
 * Zone state in spacetime
 * Tracks what's happening at each (x, y, t) coordinate
 */
export interface TemporalZone {
  position: SpacetimePosition;
  state: ZoneState;
  entropy: EntropyLevel;
  
  // What's in this zone
  occupiedBy?: string[];    // Player/hero IDs
  contains?: string[];      // Object/artifact IDs
  
  // Temporal properties
  lastActivity: number;     // Last time something happened here
  stabilityUntil?: number;  // When zone might become unstable
  corruptionRate: number;   // How fast entropy increases
  
  // Effects and modifiers
  activeSpells?: TemporalSpell[];
  temporalBarriers?: TemporalBarrier[];
  
  // History and predictions
  history: ZoneEvent[];
  predictions: PredictedEvent[];
  
  // Additional zone properties for map generation
  terrain?: string;
  structure?: {
    name: string;
    type: string;
    owner: string;
    description: string;
    specialAbilities: string[];
    garrison: string[];
  };
  hero?: Hero;
  objects?: Array<{
    id: string;
    type: string;
    name: string;
    effect: string;
    description: string;
  }>;
  entities?: Array<{
    id: string;
    type: string;
    name: string;
    position: SpacetimePosition;
    level: number;
    abilities: string[];
    description: string;
  }>;
  temporalEffects?: Array<{
    type: string;
    name: string;
    description: string;
    duration: number;
    strength: number;
  }>;
  stability?: number;
  influence?: Map<string, number>;
  lastModified?: number;
}

// ============================================================================
// TEMPORAL SPELLS & MAGIC
// ============================================================================

/**
 * Types of temporal spells
 */
export type TemporalSpellType = 
  | 'VISION_FUTURE'      // See what will happen at (x,y,t+n)
  | 'ANCRAGE_TEMPOREL'   // Lock an action to make it unchangeable
  | 'RETOUR_ARRIERE'     // Undo actions in a zone retroactively
  | 'ACCELERATION'       // Skip time/space for a hero
  | 'MUR_CAUSALITE'      // Create temporal barrier
  | 'FAILLE_TEMPORELLE'  // Create chaos zone
  | 'EMPATHIE_CAUSALE'   // Detect nearby plans
  | 'SONDE_TEMPORELLE'   // Take snapshot of future zone
  | 'STABILISATION'      // Reduce entropy in zone
  | 'CORRUPTION_ACTIVE'; // Increase entropy in enemy zone

/**
 * Temporal spell effect
 */
export interface TemporalSpell {
  id: string;
  type: TemporalSpellType;
  casterId: string;
  
  // Spacetime effect area
  targetZone: SpacetimePosition;
  effectRadius: number;
  
  // Temporal properties
  castAt: number;
  duration: number;
  strength: number;
  
  // Effect details
  effects: {
    zoneStateChange?: Partial<TemporalZone>;
    entropyDelta?: number;
    visionRange?: number;
    anchoredActions?: string[];
    undoneActions?: string[];
  };
}

/**
 * Temporal barrier blocking future actions
 */
export interface TemporalBarrier {
  id: string;
  createdBy: string;
  
  // Spacetime bounds
  area: SpacetimePosition[];
  activeFrom: number;
  activeUntil: number;
  
  // Properties
  strength: number;
  bypassRequirements?: string[]; // Artifacts/spells needed to pass
  
  // Effects
  blocksActionTypes: TemporalActionType[];
  entropyGeneration: number;
}

// ============================================================================
// CONFLICT RESOLUTION
// ============================================================================

/**
 * Conflict between multiple players in same spacetime zone
 */
export interface TemporalConflict {
  id: string;
  zone: SpacetimePosition;
  
  // Conflicting parties
  conflictingActions: ActionPlan[];
  involvedPlayers: string[];
  
  // Resolution
  detectedAt: number;
  status: 'DETECTED' | 'RESOLVING' | 'RESOLVED' | 'CORRUPTED';
  resolution?: ConflictResolution;
  
  // Outcome
  winner?: string;
  effects: ConflictEffect[];
}

/**
 * How a temporal conflict was resolved
 */
export interface ConflictResolution {
  method: 'PRIORITY' | 'COMBAT' | 'SPELL' | 'ARTIFACT' | 'RANDOM' | 'CORRUPTION';
  factors: {
    arrivalOrder?: string[];    // Who planned first
    actionAnchor?: string[];    // Who had anchored actions
    artifacts?: Record<string, string[]>; // Artifacts used
    spells?: Record<string, TemporalSpell[]>; // Spells cast
    randomSeed?: number;        // For random resolution
  };
}

/**
 * Effect of conflict resolution
 */
export interface ConflictEffect {
  targetId: string; // Player or action ID affected
  type: 'ACTION_CANCELLED' | 'ACTION_DELAYED' | 'HERO_DAMAGED' | 'RESOURCE_LOSS' | 'ENTROPY_INCREASE';
  magnitude: number;
  description: string;
}

// ============================================================================
// EVENTS & HISTORY
// ============================================================================

/**
 * Event that happened in a zone
 */
export interface ZoneEvent {
  id: string;
  timestamp: number;
  spacetime: SpacetimePosition;
  
  type: 'ACTION_EXECUTED' | 'CONFLICT_RESOLVED' | 'SPELL_CAST' | 'ENTROPY_CHANGE' | 'ZONE_STATE_CHANGE';
  actorId?: string;
  
  // Event data
  description: string;
  data: Record<string, any>;
  
  // Links to other events
  causedBy?: string[];     // Event IDs that caused this
  triggered?: string[];    // Event IDs this triggered
}

/**
 * Predicted future event
 */
export interface PredictedEvent {
  id: string;
  predictedAt: number;
  spacetime: SpacetimePosition;
  
  // Prediction details
  type: 'PLAYER_ARRIVAL' | 'OBJECT_AVAILABLE' | 'CONFLICT_LIKELY' | 'ENTROPY_CRITICAL';
  probability: number;     // 0-1 confidence
  
  // What would happen
  projectedOutcome: {
    description: string;
    involvedPlayers?: string[];
    effects?: ConflictEffect[];
  };
  
  // Prediction metadata
  basedOn: string[];       // Action IDs this prediction is based on
  invalidatedBy?: string[]; // Events that would invalidate this
}

// ============================================================================
// ENTROPY & ANTI-ABUSE
// ============================================================================

/**
 * Entropy state for zones and players
 */
export interface EntropyState {
  zoneEntropy: Record<string, number>; // Zone ID -> entropy level
  playerEntropy: Record<string, number>; // Player ID -> entropy penalty
  
  // Global entropy tracking
  globalEntropy: number;
  entropyTrend: 'INCREASING' | 'STABLE' | 'DECREASING';
  
  // Anti-spam tracking
  spamDetection: {
    playerActionCounts: Record<string, number>;
    recentLowLevelSpam: Record<string, number>;
    repetitivePatterns: Record<string, string[]>;
  };
}

/**
 * Penalty applied due to entropy/spam
 */
export interface EntropyPenalty {
  targetId: string; // Player or action ID
  type: 'MOVEMENT_SLOW' | 'MANA_DRAIN' | 'ACTION_DELAY' | 'ZONE_CORRUPTION' | 'TEMPORARY_BAN';
  
  severity: number;     // 1-10 scale
  duration: number;     // How long penalty lasts
  
  reason: string;
  appliedAt: number;
}

// ============================================================================
// REPLAY & ANALYSIS
// ============================================================================

/**
 * Complete timeline of a game
 */
export interface GameTimeline {
  gameId: string;
  startTime: number;
  endTime?: number;
  
  // All events in chronological order
  events: ZoneEvent[];
  
  // Player timelines
  playerTimelines: Record<string, PlayerTimeline>;
  
  // Key moments
  majorConflicts: TemporalConflict[];
  gameChangingSpells: TemporalSpell[];
  
  // Analysis
  entropyEvolution: EntropyState[];
  zoneControlHistory: Record<string, ZoneControlEvent[]>;
}

/**
 * Individual player's timeline
 */
export interface PlayerTimeline {
  playerId: string;
  actions: ActionPlan[];
  spellsCast: TemporalSpell[];
  conflictsInvolved: string[]; // Conflict IDs
  
  // Performance metrics
  successfulActions: number;
  cancelledActions: number;
  entropyGenerated: number;
  zonesControlled: string[];
}

/**
 * Zone control change event
 */
export interface ZoneControlEvent {
  timestamp: number;
  zone: Position;
  previousController?: string;
  newController?: string;
  method: 'EXPLORATION' | 'COMBAT' | 'SPELL' | 'ABANDONMENT' | 'CORRUPTION';
}

// ============================================================================
// GAME STATE
// ============================================================================

/**
 * Complete temporal game state
 */
export interface TemporalGameState {
  gameId: string;
  currentTime: number;
  maxTime: number;
  
  // Players and their states
  players: Player[];
  currentActivePlayer?: string; // For UI focus, not turns
  
  // World state
  mapZones: Record<string, TemporalZone>; // Position key -> zone state
  activeActions: ActionPlan[];
  activeSpells: TemporalSpell[];
  activeBarriers: TemporalBarrier[];
  
  // Conflicts and entropy
  activeConflicts: TemporalConflict[];
  entropyState: EntropyState;
  
  // History and prediction
  timeline: GameTimeline;
  futurePredictions: PredictedEvent[];
  
  // Game rules
  settings: {
    maxEntropyThreshold: number;
    spellCooldowns: Record<TemporalSpellType, number>;
    conflictResolutionMethod: 'AUTO' | 'PLAYER_CHOICE' | 'RANDOM';
    enableAntiSpam: boolean;
  };
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

/**
 * Helper for spacetime calculations
 */
export interface SpacetimeDistance {
  spatialDistance: number;
  temporalDistance: number;
  totalDistance: number;
  
  canReach: boolean;
  requiredArtifacts?: string[];
  alternativeRoutes?: SpacetimePosition[];
}

/**
 * Vision/prediction query result
 */
export interface TemporalVision {
  queriedZone: SpacetimePosition;
  visionRange: number;
  confidence: number;
  
  // What the vision reveals
  predictedState: Partial<TemporalZone>;
  predictedOccupants: string[];
  predictedObjects: string[];
  
  // Uncertainty factors
  possibleAlternatives: Array<{
    probability: number;
    outcome: Partial<TemporalZone>;
    description: string;
  }>;
}

/**
 * Complete temporal map structure
 */
export interface TemporalMap {
  name: string;
  description: string;
  size: { width: number; height: number };
  timeLines: number[];
  defaultTimeline: number;
  zones: TemporalZone[][][]; // [timeline][y][x]
  startingPositions: SpacetimePosition[];
  victoryConditions: Array<{
    type: string;
    description: string;
  }>;
  ambientEffects: Array<{
    name: string;
    description: string;
    effect: string;
  }>;
} 