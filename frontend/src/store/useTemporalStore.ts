// Heroes of Time and Magic - Temporal Store
// Revolutionary spacetime game state management

import { create } from 'zustand';
import { 
  TemporalGameState, 
  ActionPlan, 
  SpacetimePosition, 
  TemporalSpellType, 
  TemporalZone,
  TemporalConflict,
  TemporalSpell,
  EntropyState,
  GameTimeline,
  PlayerTimeline,
  ZoneEvent
} from '../types/temporal';
import { Player, Position } from '../types/game';
import { TemporalEngine } from '../engine/TemporalEngine';

interface TemporalStore {
  // Game state
  gameState: TemporalGameState;
  temporalEngine: TemporalEngine | null;
  
  // UI state
  selectedTime: number;
  selectedZone: SpacetimePosition | null;
  isPaused: boolean;
  gameSpeed: number;
  
  // Actions
  initializeGame: (players: Player[]) => void;
  planAction: (playerId: string, action: Omit<ActionPlan, 'id' | 'plannedAt' | 'status'>) => void;
  castSpell: (playerId: string, spellType: TemporalSpellType, target: SpacetimePosition) => void;
  tick: () => void;
  pause: () => void;
  resume: () => void;
  setGameSpeed: (speed: number) => void;
  setSelectedTime: (time: number) => void;
  setSelectedZone: (zone: SpacetimePosition | null) => void;
  getZoneState: (position: SpacetimePosition) => TemporalZone | null;
  getPlayerTimeline: (playerId: string) => PlayerTimeline | null;
  exportGameReplay: () => GameTimeline;
  
  // Utility
  reset: () => void;
}

const createInitialGameState = (): TemporalGameState => {
  return {
    gameId: `game_${Date.now()}`,
    currentTime: 0,
    maxTime: 1000,
    players: [],
    currentActivePlayer: undefined,
    mapZones: {},
    activeActions: [],
    activeSpells: [],
    activeBarriers: [],
    activeConflicts: [],
    entropyState: {
      zoneEntropy: {},
      playerEntropy: {},
      globalEntropy: 0,
      entropyTrend: 'STABLE',
      spamDetection: {
        playerActionCounts: {},
        recentLowLevelSpam: {},
        repetitivePatterns: {}
      }
    },
    timeline: {
      gameId: `game_${Date.now()}`,
      startTime: Date.now(),
      events: [],
      playerTimelines: {},
      majorConflicts: [],
      gameChangingSpells: [],
      entropyEvolution: [],
      zoneControlHistory: {}
    },
    futurePredictions: [],
    settings: {
      maxEntropyThreshold: 85,
      spellCooldowns: {
        VISION_FUTURE: 3,
        ANCRAGE_TEMPOREL: 5,
        RETOUR_ARRIERE: 8,
        ACCELERATION: 4,
        MUR_CAUSALITE: 6,
        FAILLE_TEMPORELLE: 10,
        EMPATHIE_CAUSALE: 2,
        SONDE_TEMPORELLE: 3,
        STABILISATION: 7,
        CORRUPTION_ACTIVE: 9
      },
      conflictResolutionMethod: 'AUTO',
      enableAntiSpam: true
    }
  };
};

export const useTemporalStore = create<TemporalStore>((set, get) => ({
  gameState: createInitialGameState(),
  temporalEngine: null,
  selectedTime: 0,
  selectedZone: null,
  isPaused: false,
  gameSpeed: 1,

  initializeGame: (players: Player[]) => {
    const gameState = createInitialGameState();
    gameState.players = players;
    gameState.currentActivePlayer = players[0]?.id;
    
    // Initialize player timelines
    players.forEach(player => {
      gameState.timeline.playerTimelines[player.id] = {
        playerId: player.id,
        actions: [],
        spellsCast: [],
        conflictsInvolved: [],
        successfulActions: 0,
        cancelledActions: 0,
        entropyGenerated: 0,
        zonesControlled: []
      };
    });

    // Initialize temporal engine
    const temporalEngine = new TemporalEngine(gameState);
    
    set({ 
      gameState, 
      temporalEngine, 
      selectedTime: 0,
      selectedZone: null,
      isPaused: false 
    });

    console.log('🚀 TEMPORAL GAME INITIALIZED! Welcome to Heroes of Time and Magic!');
    console.log('Players:', players.map(p => p.username).join(', '));
    console.log('Current time:', gameState.currentTime);
  },

  planAction: (playerId: string, action: Omit<ActionPlan, 'id' | 'playerId' | 'plannedAt' | 'status'>) => {
    const { temporalEngine } = get();
    if (!temporalEngine) return;

    try {
      const actionWithPlayerId = { ...action, playerId };
      const actionPlan = temporalEngine.planAction(playerId, actionWithPlayerId);
      
      // Update store
      set(state => ({
        gameState: {
          ...state.gameState,
          activeActions: temporalEngine.gameState.activeActions,
          activeConflicts: temporalEngine.gameState.activeConflicts,
          timeline: temporalEngine.gameState.timeline
        }
      }));

      console.log(`⚡ Action planned: ${action.type} at (${action.toPosition.x}, ${action.toPosition.y}, ${action.toPosition.t})`);
    } catch (error) {
      console.error('Failed to plan action:', error);
    }
  },

  castSpell: (playerId: string, spellType: TemporalSpellType, target: SpacetimePosition) => {
    const { temporalEngine } = get();
    if (!temporalEngine) return;

    try {
      const spell = temporalEngine.castSpell(playerId, spellType, target);
      
      // Update store
      set(state => ({
        gameState: {
          ...state.gameState,
          activeSpells: temporalEngine.gameState.activeSpells,
          timeline: temporalEngine.gameState.timeline
        }
      }));

      console.log(`🔮 Spell cast: ${spellType} at (${target.x}, ${target.y}, ${target.t})`);
    } catch (error) {
      console.error('Failed to cast spell:', error);
    }
  },

  tick: () => {
    const { temporalEngine, isPaused } = get();
    if (!temporalEngine || isPaused) return;

    temporalEngine.tick();
    
    // Update store with new game state
    set(state => ({
      gameState: {
        ...temporalEngine.gameState,
        currentTime: temporalEngine.gameState.currentTime
      }
    }));

    console.log(`⏰ Game tick: T=${temporalEngine.gameState.currentTime}`);
  },

  pause: () => {
    set({ isPaused: true });
    console.log('⏸️ Game paused');
  },

  resume: () => {
    set({ isPaused: false });
    console.log('▶️ Game resumed');
  },

  setGameSpeed: (speed: number) => {
    set({ gameSpeed: Math.max(0.1, Math.min(10, speed)) });
    console.log(`🏃 Game speed set to ${speed}x`);
  },

  setSelectedTime: (time: number) => {
    set({ selectedTime: time });
  },

  setSelectedZone: (zone: SpacetimePosition | null) => {
    set({ selectedZone: zone });
  },

  getZoneState: (position: SpacetimePosition): TemporalZone | null => {
    const { temporalEngine } = get();
    if (!temporalEngine) return null;

    try {
      return temporalEngine.getZoneState(position);
    } catch (error) {
      console.error('Failed to get zone state:', error);
      return null;
    }
  },

  getPlayerTimeline: (playerId: string): PlayerTimeline | null => {
    const { gameState } = get();
    return gameState.timeline.playerTimelines[playerId] || null;
  },

  exportGameReplay: (): GameTimeline => {
    const { gameState } = get();
    return {
      ...gameState.timeline,
      endTime: Date.now()
    };
  },

  reset: () => {
    set({
      gameState: createInitialGameState(),
      temporalEngine: null,
      selectedTime: 0,
      selectedZone: null,
      isPaused: false,
      gameSpeed: 1
    });
    console.log('🔄 Game reset');
  }
}));

// Helper hook for getting current player
export const useCurrentPlayer = (): Player | null => {
  const { gameState } = useTemporalStore();
  return gameState.players.find(p => p.id === gameState.currentActivePlayer) || null;
};

// Helper hook for getting zone actions
export const useZoneActions = (position: SpacetimePosition): ActionPlan[] => {
  const { gameState } = useTemporalStore();
  return gameState.activeActions.filter(action => 
    action.toPosition.x === position.x && 
    action.toPosition.y === position.y &&
    Math.abs(action.startsAt - position.t) <= 2
  );
};

// Helper hook for getting active conflicts
export const useActiveConflicts = (): TemporalConflict[] => {
  const { gameState } = useTemporalStore();
  return gameState.activeConflicts.filter(conflict => 
    conflict.status === 'DETECTED' || conflict.status === 'RESOLVING'
  );
};

// Helper hook for getting player stats
export const usePlayerStats = (playerId: string) => {
  const { gameState } = useTemporalStore();
  const timeline = gameState.timeline.playerTimelines[playerId];
  
  if (!timeline) return null;
  
  return {
    totalActions: timeline.actions.length,
    successfulActions: timeline.successfulActions,
    cancelledActions: timeline.cancelledActions,
    spellsCast: timeline.spellsCast.length,
    conflictsInvolved: timeline.conflictsInvolved.length,
    entropyGenerated: timeline.entropyGenerated,
    zonesControlled: timeline.zonesControlled.length,
    successRate: timeline.actions.length > 0 ? 
      (timeline.successfulActions / timeline.actions.length) * 100 : 0
  };
};

// Helper hook for entropy monitoring
export const useEntropyMonitor = () => {
  const { gameState } = useTemporalStore();
  const { entropyState } = gameState;
  
  const globalEntropyPercent = Math.min(100, (entropyState.globalEntropy / gameState.settings.maxEntropyThreshold) * 100);
  const isEntropyDangerous = entropyState.globalEntropy > gameState.settings.maxEntropyThreshold * 0.8;
  const isCritical = entropyState.globalEntropy > gameState.settings.maxEntropyThreshold * 0.95;
  
  return {
    globalEntropy: entropyState.globalEntropy,
    globalEntropyPercent,
    trend: entropyState.entropyTrend,
    isEntropyDangerous,
    isCritical,
    playerEntropy: entropyState.playerEntropy,
    zoneEntropy: entropyState.zoneEntropy
  };
};

// Game loop manager
export const useGameLoop = () => {
  const { tick, isPaused, gameSpeed } = useTemporalStore();
  
  const startGameLoop = () => {
    const loop = () => {
      if (!isPaused) {
        tick();
      }
      setTimeout(loop, 1000 / gameSpeed); // Adjust speed
    };
    loop();
  };
  
  return { startGameLoop };
};

// Export the store for external use
export default useTemporalStore; 