// 🔮 Heroes of Time - Advanced ZFC System (Phase 3)
// Revolutionary temporal mechanics with quantum superposition and paradox resolution

import { Position } from './game';

export type TemporalState = 'stable' | 'unstable' | 'contested' | 'corrupted' | 'quantum';
export type ParadoxType = 'grandfather' | 'bootstrap' | 'causal_loop' | 'timeline_split' | 'quantum_entanglement';
export type ShadowType = 'real' | 'bluff' | 'decoy' | 'quantum_superposition' | 'temporal_echo';

// Basic types for temporal mechanics
export interface ActionPlan {
  id: string;
  type: 'move' | 'attack' | 'cast' | 'build' | 'recruit';
  targetPosition?: Position;
  parameters?: any;
}

export interface ConflictZone {
  id: string;
  center: Position;
  radius: number;
  players: string[];
  severity: 'low' | 'medium' | 'high';
}

// 🌀 ADVANCED ZFC ZONE SYSTEM

export interface QuantumZone {
  id: string;
  playerId: string;
  center: Position;
  radius: number;
  temporalState: TemporalState;
  superpositionStates: TemporalState[];
  probability: number; // Probability of collapse to stable state
  entangledZones: string[]; // IDs of quantum entangled zones
  chronoflame?: ChronoflameEffect;
}

export interface ChronoflameEffect {
  type: 'chronoflame' | 'aetheric_pyre' | 'void_ember' | 'celestial_blaze' | 'temporal_conflagration';
  intensity: number; // 1-10 scale
  duration: number;
  effects: {
    timeAcceleration?: number; // Multiplier for actions in zone
    entropyReduction?: number; // Reduces chaos/instability  
    visionRadius?: number; // See future actions
    paradoxImmunity?: boolean; // Immune to temporal paradoxes
    quantumLocking?: boolean; // Prevents superposition collapse
  };
  origin: Position;
  createdBy: string;
  manaCost: number;
}

export interface MultiLayerZone {
  baseZone: QuantumZone;
  layers: {
    past: TemporalLayer;
    present: TemporalLayer;
    future: TemporalLayer;
    quantum: TemporalLayer;
  };
  interactions: LayerInteraction[];
  stability: number; // 0-100, affects probability of collapse
}

export interface TemporalLayer {
  timeline: number; // Which timeline/branch this exists in
  actions: AdvancedShadowAction[];
  conflicts: QuantumZone[];
  temporalMana: number;
  locked: boolean; // Cannot be modified
}

export interface LayerInteraction {
  sourceLayer: keyof MultiLayerZone['layers'];
  targetLayer: keyof MultiLayerZone['layers'];
  interactionType: 'causal_influence' | 'quantum_entanglement' | 'temporal_bleeding' | 'paradox_formation';
  strength: number; // 0-1 influence strength
  consequences: TemporalConsequence[];
}

// 🎭 SHADOW ACTION BLUFFING SYSTEM

export interface AdvancedShadowAction {
  id: string;
  playerId: string;
  shadowType: ShadowType;
  realAction?: ActionPlan; // Only exists if shadowType is 'real'
  bluffData?: BluffAction; // Fake action data for deception
  quantumStates?: QuantumActionState[]; // Multiple possible states
  detectionProbability: number; // 0-1 chance enemies detect it's a bluff
  psychologicalValue: number; // Impact on enemy decision making
  manaCost: number;
  complexity: number; // Higher = harder to detect but more expensive
}

export interface BluffAction {
  fakeActionType: string;
  fakeTarget: Position;
  fakeUnit?: string;
  convincingness: number; // 0-1 how believable the bluff is
  tells: BluffTell[]; // Subtle hints it might be fake
  consequences: string[]; // What happens if bluff is called
}

export interface BluffTell {
  type: 'timing_inconsistency' | 'resource_mismatch' | 'tactical_illogic' | 'pattern_deviation';
  detectability: number; // 0-1 how obvious it is
  description: string;
  counters: string[]; // How players can use this information
}

export interface QuantumActionState {
  probability: number;
  action: ActionPlan;
  prerequisites: string[];
  entangledWith: string[]; // Other quantum actions this is linked to
  collapseConditions: CollapseCondition[];
}

export interface CollapseCondition {
  type: 'observation' | 'interaction' | 'time_limit' | 'external_force' | 'paradox_resolution';
  trigger: any;
  resultingState: TemporalState;
  probability: number;
}

// ⚡ TEMPORAL PARADOX RESOLUTION ENGINE

export interface TemporalParadox {
  id: string;
  type: ParadoxType;
  severity: 'minor' | 'major' | 'catastrophic' | 'reality_breaking';
  involvedPlayers: string[];
  involvedActions: string[];
  timeline: number;
  detectAt: number; // Game turn when paradox was detected
  resolutionOptions: ParadoxResolution[];
  autoResolveIn: number; // Turns until automatic resolution
  temporalStability: number; // How much this affects overall timeline
}

export interface ParadoxResolution {
  id: string;
  type: 'accept_paradox' | 'revert_actions' | 'split_timeline' | 'quantum_superposition' | 'chronoflame_intervention';
  cost: {
    temporalMana?: number;
    gameActions?: number;
    probability?: number; // Chance of success
    sideEffects?: TemporalConsequence[];
  };
  description: string;
  consequences: TemporalConsequence[];
  voterRequirements?: {
    minimumPlayers: number;
    unanimousRequired: boolean;
    timeLimit: number;
  };
}

export interface TemporalConsequence {
  type: 'timeline_split' | 'action_revert' | 'unit_temporal_displacement' | 'resource_fluctuation' | 'memory_alteration' | 'quantum_entanglement';
  magnitude: number;
  affectedPlayers: string[];
  duration: number;
  reversible: boolean;
  description: string;
  gameplayEffect: any;
}

// 🎯 QUANTUM SUPERPOSITION MECHANICS

export interface QuantumSuperposition {
  id: string;
  states: SuperpositionState[];
  observer: string | null; // Player who can collapse the superposition
  collapseConditions: CollapseCondition[];
  entanglements: QuantumEntanglement[];
  stability: number; // Decreases over time, forced collapse at 0
  manaMaintenance: number; // Per turn cost to maintain
}

export interface SuperpositionState {
  probability: number;
  gameState: Partial<any>; // The game state if this possibility is real
  actions: ActionPlan[];
  resources: { [playerId: string]: any };
  conflicts: ConflictZone[];
  label: string; // Human readable description
}

export interface QuantumEntanglement {
  id: string;
  entangledSuperpositions: string[];
  entanglementType: 'action_dependent' | 'resource_linked' | 'outcome_correlated' | 'causal_chain';
  strength: number; // 0-1 how strongly linked
  collapseRules: {
    simultaneousCollapse: boolean;
    correlatedOutcomes: boolean;
    causalDependency: boolean;
  };
}

// 🕰️ ADVANCED TEMPORAL SPELLS AND ABILITIES

export interface TemporalSpell {
  id: string;
  name: string;
  description: string;
  school: 'temporal' | 'chronoflame' | 'quantum' | 'paradox';
  level: 1 | 2 | 3 | 4 | 5 | 6; // Level 6 = Reality-altering
  manaCost: number;
  temporalManaCost?: number;
  castingTime: number; // Turns to cast
  effects: TemporalSpellEffect[];
  requiresParadoxStability?: number;
  forbiddenInQuantumZones?: boolean;
  chronoflameResonance?: boolean; // Enhanced by chronoflame presence
}

export interface TemporalSpellEffect {
  type: 'timeline_manipulation' | 'quantum_state_control' | 'paradox_induction' | 'chronoflame_summoning' | 'reality_anchor';
  value: number | string;
  target: 'zone' | 'player' | 'timeline' | 'reality' | 'quantum_state';
  duration?: number;
  probability?: number;
  sideEffects?: TemporalConsequence[];
}

// 🌊 TEMPORAL SPELLS COLLECTION

export const TEMPORAL_SPELLS: TemporalSpell[] = [
  // Level 1 - Basic Temporal Manipulation
  {
    id: 'temporal_echo',
    name: 'Temporal Echo',
    description: 'Creates a faint shadow of future actions',
    school: 'temporal',
    level: 1,
    manaCost: 5,
    temporalManaCost: 2,
    castingTime: 1,
    effects: [{
      type: 'timeline_manipulation',
      value: 'create_shadow_preview',
      target: 'zone',
      duration: 3
    }]
  },
  {
    id: 'chronostatic_field',
    name: 'Chronostatic Field', 
    description: 'Slows time in target area',
    school: 'temporal',
    level: 1,
    manaCost: 8,
    temporalManaCost: 3,
    castingTime: 2,
    effects: [{
      type: 'timeline_manipulation',
      value: 0.5, // Half speed
      target: 'zone',
      duration: 5
    }]
  },

  // Level 2 - Quantum Manipulation
  {
    id: 'quantum_uncertainty',
    name: 'Quantum Uncertainty',
    description: 'Places action in superposition state',
    school: 'quantum',
    level: 2,
    manaCost: 15,
    temporalManaCost: 8,
    castingTime: 1,
    effects: [{
      type: 'quantum_state_control',
      value: 'create_superposition',
      target: 'player',
      probability: 0.7
    }]
  },
  {
    id: 'quantum_entanglement',
    name: 'Quantum Entanglement',
    description: 'Links two zones quantum-mechanically',
    school: 'quantum',
    level: 2,
    manaCost: 20,
    temporalManaCost: 12,
    castingTime: 3,
    effects: [{
      type: 'quantum_state_control',
      value: 'create_entanglement',
      target: 'zone',
      duration: 10
    }]
  },

  // Level 3 - Chronoflame Magic
  {
    id: 'summon_chronoflame',
    name: 'Summon Chronoflame',
    description: 'Calls forth eternal flames that burn through time',
    school: 'chronoflame',
    level: 3,
    manaCost: 30,
    temporalManaCost: 20,
    castingTime: 4,
    effects: [{
      type: 'chronoflame_summoning',
      value: 'chronoflame',
      target: 'zone',
      duration: 15
    }],
    chronoflameResonance: true
  },
  {
    id: 'aetheric_pyre_ritual',
    name: 'Aetheric Pyre Ritual',
    description: 'Kindles sacred fires from ethereal realms',
    school: 'chronoflame', 
    level: 3,
    manaCost: 35,
    temporalManaCost: 25,
    castingTime: 5,
    effects: [{
      type: 'chronoflame_summoning',
      value: 'aetheric_pyre',
      target: 'zone',
      duration: 20
    }],
    chronoflameResonance: true
  },

  // Level 4 - Paradox Manipulation
  {
    id: 'grandfather_paradox',
    name: 'Grandfather Paradox',
    description: 'Creates intentional causality violation',
    school: 'paradox',
    level: 4,
    manaCost: 50,
    temporalManaCost: 40,
    castingTime: 6,
    effects: [{
      type: 'paradox_induction',
      value: 'grandfather',
      target: 'timeline',
      sideEffects: [
        {
          type: 'timeline_split',
          magnitude: 0.8,
          affectedPlayers: ['all'],
          duration: -1, // Permanent
          reversible: false,
          description: 'Reality branches into multiple timelines',
          gameplayEffect: 'create_parallel_game'
        }
      ]
    }],
    requiresParadoxStability: 80,
    forbiddenInQuantumZones: true
  },

  // Level 5 - Reality Manipulation
  {
    id: 'temporal_singularity',
    name: 'Temporal Singularity',
    description: 'Creates point where all timelines converge',
    school: 'temporal',
    level: 5,
    manaCost: 75,
    temporalManaCost: 60,
    castingTime: 8,
    effects: [{
      type: 'reality_anchor',
      value: 'convergence_point',
      target: 'reality',
      duration: 25
    }],
    requiresParadoxStability: 90
  },

  // Level 6 - Reality-Altering
  {
    id: 'reset_timeline',
    name: 'Reset Timeline',
    description: 'Returns game to previous state, erasing all actions since',
    school: 'temporal',
    level: 6,
    manaCost: 100,
    temporalManaCost: 100,
    castingTime: 10,
    effects: [{
      type: 'timeline_manipulation',
      value: 'complete_revert',
      target: 'reality',
      sideEffects: [
        {
          type: 'memory_alteration',
          magnitude: 1.0,
          affectedPlayers: ['all'],
          duration: -1,
          reversible: false,
          description: 'All players lose memory of reverted actions',
          gameplayEffect: 'revert_to_checkpoint'
        }
      ]
    }],
    requiresParadoxStability: 95,
    forbiddenInQuantumZones: true
  }
];

// 🎮 ADVANCED TEMPORAL GAME MECHANICS

export interface TemporalGameState {
  currentTimeline: number;
  alternateTimelines: TemporalTimeline[];
  paradoxLevel: number; // 0-100, higher = more unstable
  quantumZones: QuantumZone[];
  activeParadoxes: TemporalParadox[];
  superpositions: QuantumSuperposition[];
  chronoflameEffects: ChronoflameEffect[];
  temporalSpellsAvailable: TemporalSpell[];
  temporalManaPool: { [playerId: string]: number };
  realityStability: number; // 0-100, 0 = reality collapse
}

export interface TemporalTimeline {
  id: number;
  parentTimeline?: number;
  branchPoint: number; // Game turn where split occurred
  probability: number; // Likelihood this timeline becomes "real"
  gameState: any; // Complete game state for this timeline
  active: boolean; // Is this timeline being played
  players: string[]; // Which players exist in this timeline
}

// 🧠 ADVANCED AI FOR TEMPORAL MECHANICS

export interface TemporalAI {
  evaluateBluffValue(action: AdvancedShadowAction, gameState: TemporalGameState): number;
  predictParadoxOutcome(paradox: TemporalParadox, resolutions: ParadoxResolution[]): ParadoxResolution;
  optimizeQuantumSuperposition(states: SuperpositionState[]): SuperpositionState;
  detectBluffs(shadowActions: AdvancedShadowAction[], confidence: number): BluffDetection[];
  calculateTemporalStrategy(zones: QuantumZone[], spells: TemporalSpell[]): TemporalStrategy;
}

export interface BluffDetection {
  shadowActionId: string;
  confidence: number; // 0-1 how sure AI is it's a bluff
  reasoning: string[];
  suggestedCounterplay: string[];
  riskAssessment: number; // Cost of being wrong
}

export interface TemporalStrategy {
  priorityActions: string[];
  riskTolerance: number;
  bluffFrequency: number;
  paradoxManagement: 'aggressive' | 'conservative' | 'adaptive';
  quantumExploitation: number; // How much to abuse superposition
}

// 🌟 MASTER TEMPORAL ENGINE

export interface AdvancedTemporalEngine {
  processQuantumCollapse(superposition: QuantumSuperposition): SuperpositionState;
  resolveParadox(paradox: TemporalParadox, resolution: ParadoxResolution): TemporalConsequence[];
  updateRealityStability(events: TemporalConsequence[]): number;
  manageChronoflameInteractions(flames: ChronoflameEffect[], zones: QuantumZone[]): void;
  simulateTimelineConsequences(action: ActionPlan, depth: number): TemporalTimeline[];
  optimizeTemporalManaFlow(players: string[], usage: { [spellId: string]: number }): void;
}

export default {
  TEMPORAL_SPELLS
}; 