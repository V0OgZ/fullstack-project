import { create } from 'zustand';
import { GameState, Game, Player, Tile, Position, Hero, GameAction, CombatResult, TimelineAction, ShadowAction, ZoneOfCausality } from '../types/game';
import { MagicItemService, EquippedItems } from '../services/magicItemService';
import { ZFCService } from '../services/zfcService';
import { GameService } from '../services/gameService';
import { ApiService } from '../services/api';

interface GameStore extends GameState {
  // Map state
  map: Tile[][];
  selectedTile: Position | null;
  currentPlayerNumber: number;
  
  // Hero selection and movement
  selectedHero: Hero | null;
  movementRange: Position[];
  movementMode: boolean;
  // Vision
  updateVision: (playerId: string) => void;
  
  // NEW: Magic Item State
  playerInventory: string[];
  equippedItems: { [heroId: string]: EquippedItems };
  
  // ZFC State
  visibleZFCs: ZoneOfCausality[];
  shadowActions: ShadowAction[];
  timelineActions: TimelineAction[];
  lockedZones: Position[];
  
  // Actions
  setCurrentGame: (game: Game) => void;
  setCurrentPlayer: (player: Player) => void;
  setMap: (map: Tile[][]) => void;
  setSelectedTile: (position: Position | null) => void;
  setCurrentPlayerNumber: (playerNumber: number) => void;
  addPendingAction: (action: GameAction) => void;
  removePendingAction: (actionId: string) => void;
  updateActionStatus: (actionId: string, status: GameAction['status']) => void;
  addCombatResult: (result: CombatResult) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  
  // Hero selection and movement actions
  selectHero: (hero: Hero | null) => void;
  setMovementRange: (range: Position[]) => void;
  setMovementMode: (mode: boolean) => void;
  calculateMovementRange: (hero: Hero) => Position[];
  canMoveToPosition: (hero: Hero, position: Position) => boolean;
  
  // NEW: Magic Item Actions (now using backend)
  equipItem: (heroId: string, itemId: string, slot: string) => Promise<boolean>;
  unequipItem: (heroId: string, slot: string) => boolean;
  consumeItem: (itemId: string, heroId: string) => Promise<boolean>;
  addItemToInventory: (itemId: string) => void;
  removeItemFromInventory: (itemId: string) => void;
  getEnhancedHero: (heroId: string) => Promise<Hero | null>;
  
  // Helper functions
  convertTilesToMap: (tiles: any[], width: number, height: number) => Tile[][];
  
  // ZFC Actions (now using backend)
  addTimelineAction: (action: TimelineAction) => void;
  updateTimelineAction: (actionId: string, status: TimelineAction['status']) => void;
  setShadowActions: (shadows: ShadowAction[]) => void;
  setVisibleZFCs: (zfcs: ZoneOfCausality[]) => void;
  setLockedZones: (zones: Position[]) => void;
  calculateZFC: (playerId: string, heroId: string) => Promise<ZoneOfCausality>;
  validateAction: (actionId: string) => Promise<boolean>;
  
  // Game actions
  moveHero: (heroId: string, targetPosition: Position) => Promise<void>;
  attackTarget: (heroId: string, targetId: string) => Promise<void>;
  collectResource: (heroId: string, objectId: string) => Promise<void>;
  cancelAction: (actionId: string) => Promise<void>;
  
  // Game state management
  resetGame: () => void; // New action
  loadGame: (gameId: string) => Promise<void>;
  refreshGameState: () => Promise<void>;
  endTurn: () => Promise<void>;
  
  // Hot Seat mode
  switchPlayer: (playerId: string) => void;
  nextPlayer: () => void;

  // New function to reset a specific game session
  resetGameSession: (scenarioId: string) => void;
}

const initialState = {
  currentGame: null,
  currentPlayer: null,
  pendingActions: [],
  combatResults: [],
  isLoading: false,
  error: null,
  map: [],
  selectedTile: null,
  currentPlayerNumber: 1,
  
  // Hero selection and movement
  selectedHero: null,
  movementRange: [],
  movementMode: false,
  // vision handled per tile flags
  
  shadowActions: [],
  timelineActions: [],
  visibleZFCs: [],
  lockedZones: [],
  politicalAdvisors: [],
  currentPoliticalEvent: null,
  reputation: {
    international: 0,
    domestic: 0,
    military: 0,
    economic: 0,
    diplomatic: 0
  },
  activeEvents: [],
  playerInventory: [],
  equippedItems: {},
};

export const useGameStore = create<GameStore>((set, get) => ({
  ...initialState,

  // Helper function to convert flat tiles array to 2D array
  convertTilesToMap: (tiles: any[], width: number, height: number): Tile[][] => {
    
    
    const map: Tile[][] = [];
    for (let y = 0; y < height; y++) {
      const row: Tile[] = [];
      for (let x = 0; x < width; x++) {
        const tileIndex = y * width + x;
        const tile = tiles[tileIndex];
        if (tile) {
          // Convert from flat tile format to game store tile format
          row.push({
            x: tile.x || x,
            y: tile.y || y,
            terrain: tile.terrain || 'grass',
            walkable: tile.walkable !== undefined ? tile.walkable : true,
            movementCost: tile.movementCost || 1,
            hero: tile.hero || undefined,
            creature: tile.creature || undefined,
            structure: tile.structure || undefined,
            visible: tile.visible !== undefined ? tile.visible : false,
            explored: tile.explored !== undefined ? tile.explored : false
          });
        } else {
          // Default tile if missing
          row.push({
            x,
            y,
            terrain: 'grass',
            walkable: true,
            movementCost: 1,
            hero: undefined,
            creature: undefined,
            structure: undefined,
            visible: false,
            explored: false
          });
        }
      }
      map.push(row);
    }
    
    console.log('🗺️ convertTilesToMap: Map created with', map.length, 'rows');
    
    // Vision update removed to prevent infinite re-renders
    // Vision will be updated manually when needed
    
    return map;
  },

  // NEW: Magic Item Actions (now using backend)
  equipItem: async (heroId: string, itemId: string, slot: string) => {
    const { equippedItems, currentGame, currentPlayer } = get();
    if (!currentGame || !currentPlayer) return false;

    const hero = currentPlayer.heroes.find(h => h.id === heroId);
    if (!hero) return false;

    try {
      // Check level requirement using backend MagicItemService
      const result = await MagicItemService.equipItem(itemId, hero.level);
      if (!result.success) {
        console.log(result.message);
        return false;
      }

      // Update equipped items
      const newEquippedItems = { ...equippedItems };
      if (!newEquippedItems[heroId]) {
        newEquippedItems[heroId] = {};
      }

      // Use type assertion for slot access
      (newEquippedItems[heroId] as any)[slot] = itemId;
      
      set({ equippedItems: newEquippedItems });
      console.log(result.message);
      return true;
    } catch (error) {
      console.error('Error equipping item:', error);
      return false;
    }
  },

  unequipItem: (heroId: string, slot: string) => {
    const { equippedItems } = get();
    if (!equippedItems[heroId]) return false;

    const newEquippedItems = { ...equippedItems };
    
    // Use type assertion for slot access
    delete (newEquippedItems[heroId] as any)[slot];

    if (Object.keys(newEquippedItems[heroId]).length === 0) {
      delete newEquippedItems[heroId];
    }

    set({ equippedItems: newEquippedItems });
    return true;
  },

  consumeItem: async (itemId: string, heroId: string) => {
    const { currentGame, currentPlayer } = get();
    if (!currentGame || !currentPlayer) return false;

    const hero = currentPlayer.heroes.find(h => h.id === heroId);
    if (!hero) return false;

    try {
      const result = await MagicItemService.consumeItem(
        itemId, 
        hero, 
        currentPlayer.resources.gold
      );

      if (result.success) {
        console.log(result.message);
        // Remove item from inventory after use
        get().removeItemFromInventory(itemId);
        return true;
      } else {
        console.log(result.message);
        return false;
      }
    } catch (error) {
      console.error('Error consuming item:', error);
      return false;
    }
  },

  addItemToInventory: (itemId: string) => {
    const { playerInventory } = get();
    if (playerInventory.includes(itemId)) return;
    
    set((state) => ({
      playerInventory: [...state.playerInventory, itemId]
    }));
  },

  removeItemFromInventory: (itemId: string) => {
    set((state) => ({
      playerInventory: state.playerInventory.filter(id => id !== itemId)
    }));
  },

  getEnhancedHero: async (heroId: string) => {
    const { equippedItems, currentGame, currentPlayer } = get();
    if (!currentGame || !currentPlayer) return null;

    const hero = currentPlayer.heroes.find(h => h.id === heroId);
    if (!hero) return null;

    try {
      // Apply item effects using backend MagicItemService
      const enhancedHero = await MagicItemService.applyItemEffectsToHero(
        hero, 
        equippedItems[heroId] || {}
      );

      return enhancedHero;
    } catch (error) {
      console.error('Error getting enhanced hero:', error);
      return hero;
    }
  },

  // State setters
  setCurrentGame: (game) => set({ currentGame: game }),
  setCurrentPlayer: (player) => {
    console.log('🔄 setCurrentPlayer: Setting new current player:', player?.id);
    set({ currentPlayer: player });
    
    // Update vision for the new current player
    if (player?.id) {
      console.log('🔄 setCurrentPlayer: Updating vision for new current player:', player.id);
      setTimeout(() => {
        get().updateVision(player.id);
      }, 50); // Small delay to ensure state is updated
    }
  },
  setMap: (map) => {
    console.log('🗺️ setMap: Setting new map with', map.length, 'rows');
    set({ map });
    
    // Update vision after setting map if we have a current player
    const { currentPlayer } = get();
    if (currentPlayer?.id) {
      console.log('🗺️ setMap: Updating vision for current player after map set');
      setTimeout(() => {
        get().updateVision(currentPlayer.id);
      }, 100); // Small delay to ensure map is set
    }
  },
  setSelectedTile: (position) => set({ selectedTile: position }),
  setCurrentPlayerNumber: (playerNumber) => set({ currentPlayerNumber: playerNumber }),
  
  // Hero selection and movement methods
  selectHero: (hero) => {
    set({ selectedHero: hero });
    if (hero) {
      const { calculateMovementRange, setMovementRange, setMovementMode } = get();
      const range = calculateMovementRange(hero);
      setMovementRange(range);
      setMovementMode(true);
    } else {
      set({ movementRange: [], movementMode: false });
    }
  },
  setMovementRange: (range) => set({ movementRange: range }),
  setMovementMode: (mode) => set({ movementMode: mode }),

  // Simple vision update: mark tiles within radius 4 of each hero of the player as visible & explored, others remain previous explored.
  updateVision: (playerId: string) => {
    const { map, currentGame } = get();
    if (!currentGame || !map.length) {
      console.log('🔍 updateVision: No game or map data');
      return;
    }
    
    const player = currentGame.players.find(p => p.id === playerId);
    if (!player) {
      console.log('🔍 updateVision: Player not found:', playerId);
      return;
    }

    if (!player.heroes || player.heroes.length === 0) {
      console.log('🔍 updateVision: No heroes found for player:', playerId);
      return;
    }

    console.log('🔍 updateVision: Updating vision for player:', playerId, 'with heroes:', player.heroes.length);

    // Increased vision radius for better gameplay
    const visibilityRadius = 6;
    const explorationRadius = 8;

    // Clone map to avoid mutating directly, preserving previously explored tiles
    const newMap = map.map(row => row.map(tile => ({ 
      ...tile, 
      visible: tile.explored || false // Keep explored tiles visible
    })));

    let visibleTilesCount = 0;
    let exploredTilesCount = 0;
    let processedHeroes = 0;
    
    player.heroes.forEach(hero => {
      if (!hero.position) {
        console.log('🔍 updateVision: Hero has no position:', hero.name);
        return;
      }
      
      processedHeroes++;
      console.log('🔍 updateVision: Processing hero:', hero.name, 'at position:', hero.position);
      
      // Check if hero position is within map bounds
      if (hero.position.y < 0 || hero.position.y >= newMap.length || 
          hero.position.x < 0 || hero.position.x >= newMap[0].length) {
        console.warn('🔍 updateVision: Hero position out of bounds:', hero.position);
        return;
      }
      
      // Larger exploration radius for discovered areas
      for (let y = -explorationRadius; y <= explorationRadius; y++) {
        for (let x = -explorationRadius; x <= explorationRadius; x++) {
          const tx = hero.position.x + x;
          const ty = hero.position.y + y;
    
          if (ty >= 0 && ty < newMap.length && tx >= 0 && tx < newMap[ty].length) {
            const dist = Math.abs(x) + Math.abs(y);
            const tile = newMap[ty][tx];
            
            if (dist <= visibilityRadius) {
              // Close tiles are fully visible
              tile.visible = true;
              tile.explored = true;
              visibleTilesCount++;
            } else if (dist <= explorationRadius) {
              // Farther tiles are explored but not currently visible
              tile.explored = true;
              exploredTilesCount++;
            }
          }
        }
      }
    });

    console.log('🔍 updateVision: Processed', processedHeroes, 'heroes, made', visibleTilesCount, 'tiles visible,', exploredTilesCount, 'tiles explored');
    
    // Only update the map if we processed at least one hero
    if (processedHeroes > 0) {
      set({ map: newMap });
    } else {
      console.warn('🔍 updateVision: No heroes processed, keeping existing map');
    }
  },
  
  calculateMovementRange: (hero) => {
    const { map } = get();
    if (!map || map.length === 0) return [];
    
    const range: Position[] = [];
    const movementPoints = hero.movementPoints || 1000;
    const maxDistance = Math.floor(movementPoints / 100); // Each tile costs 100 movement points
    
    for (let y = 0; y < map.length; y++) {
      for (let x = 0; x < map[y].length; x++) {
        const tile = map[y][x];
        if (tile && tile.walkable) {
          const distance = Math.abs(x - hero.position.x) + Math.abs(y - hero.position.y);
          if (distance <= maxDistance) {
            range.push({ x, y });
          }
        }
      }
    }
    
    return range;
  },
  
  canMoveToPosition: (hero, position) => {
    const { map, movementRange } = get();
    if (!map || map.length === 0) return false;
    
    const tile = map[position.y]?.[position.x];
    if (!tile || !tile.walkable) return false;
    
    return movementRange.some(pos => pos.x === position.x && pos.y === position.y);
  },
  
  addPendingAction: (action) => set((state) => ({
    pendingActions: [...state.pendingActions, action]
  })),
  removePendingAction: (actionId) => set((state) => ({
    pendingActions: state.pendingActions.filter(action => action.id !== actionId)
  })),
  updateActionStatus: (actionId, status) => set((state) => ({
    pendingActions: state.pendingActions.map(action =>
      action.id === actionId ? { ...action, status } : action
    )
  })),
  addCombatResult: (result) => set((state) => ({
    combatResults: [...state.combatResults, result]
  })),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),

  // NOUVEAU: Actions ZFC (now using backend)
  addTimelineAction: (action: TimelineAction) => set((state) => ({
    currentGame: state.currentGame ? {
      ...state.currentGame,
      timeline: [...(state.currentGame.timeline || []), action]
    } : null
  })),
  
  updateTimelineAction: (actionId, status) => set((state) => ({
    currentGame: state.currentGame ? {
      ...state.currentGame,
      timeline: (state.currentGame.timeline || []).map(action =>
        action.id === actionId ? { ...action, status } : action
      )
    } : null
  })),
  
  setShadowActions: (shadows) => set({ shadowActions: shadows }),
  setVisibleZFCs: (zfcs) => set({ visibleZFCs: zfcs }),
  setLockedZones: (zones) => set({ lockedZones: zones }),

  // NOUVEAU: Calcul de Zone de Causalité (now using backend)
  calculateZFC: async (playerId: string, heroId: string): Promise<ZoneOfCausality> => {
    const { map, currentGame } = get();
    const hero = currentGame?.players
      .find(p => p.id === playerId)
      ?.heroes.find(h => h.id === heroId);
    
    if (!hero || !map.length) {
      return {
        id: `zfc-${playerId}-${heroId}`,
        center: { x: 0, y: 0 },
        radius: 0,
        temporalStrength: 0.5,
        affectedTiles: []
      };
    }

    try {
      // Convert map to the format expected by the backend
      const gameMap = {
        width: map[0]?.length || 0,
        height: map.length,
        tiles: map.map(row => row.map(tile => ({
          x: tile.x,
          y: tile.y,
          terrain: tile.terrain,
          walkable: tile.walkable !== false,
          movementCost: tile.movementCost,
          hero: tile.hero || undefined,
          creature: tile.creature || undefined,
          structure: tile.structure || undefined,
          visible: tile.visible,
          explored: tile.explored
        })))
      };

      const result = await ZFCService.calculateZFC(playerId, heroId, hero, gameMap, currentGame?.turn || 1);
      
      // Extract the first ZFC zone from the result, or return a default one
      const zfcZone = result.zfc[0];
      if (zfcZone) {
        return {
          id: `zfc-${zfcZone.playerId}-${zfcZone.heroId}`,
          center: zfcZone.center,
          radius: zfcZone.radius,
          temporalStrength: zfcZone.temporalStability || 0.5,
          affectedTiles: zfcZone.reachableTiles || []
        };
      }
    } catch (error) {
      console.error('Error calculating ZFC:', error);
    }

    return {
      id: `zfc-${playerId}-${heroId}`,
      center: { x: 0, y: 0 },
      radius: 0,
      temporalStrength: 0.5,
      affectedTiles: []
    };
  },

  validateAction: async (actionId: string) => {
    const { currentGame } = get();
    if (!currentGame || !currentGame.timeline) return false;

    const action = currentGame.timeline.find(a => a.id === actionId);
    if (!action) return false;

    try {
      const zfcMap = ZFCService.convertGameTilesToZFCTiles(get().map);
      
      // Extract target position from action
      const targetPosition = action.targetPosition || { x: 0, y: 0 };
      
      // Validate using backend
      if (!action.heroId) {
        return false;
      }
      
      const gameMapForValidation = {
        width: zfcMap[0]?.length || 0,
        height: zfcMap.length,
        tiles: zfcMap
      };
      
      const isValid = await ZFCService.validateZFCAction(
        action.type,
        action.heroId,
        targetPosition,
        [], // ZFC zones - we'll need to convert or get from backend
        gameMapForValidation
      );
      
      return isValid;
    } catch (error) {
      console.error('Error validating action:', error);
      return false;
    }
  },

  // Game actions (practical implementation)
  moveHero: async (heroId: string, targetPosition: Position) => {
    const { setLoading, setError, refreshGameState, currentGame, currentPlayer } = get();
    setLoading(true);
    setError(null);

    console.log('🎯 moveHero called:', { heroId, targetPosition });

    try {
      if (!currentGame || !currentPlayer) throw new Error('No active game or player');

      console.log('📡 Calling backend API to move hero...');
      // Call backend API to move hero
      const result = await ApiService.moveHero(currentGame.id, heroId, targetPosition);
      
      console.log('📨 Backend response:', result);
      
      if (result.success) {
        // Refresh game state to reflect the move
        await refreshGameState();
        
        // Update hero position in the current state immediately for UI feedback
        const updatedGame = { ...currentGame };
        const hero = updatedGame.players
          .flatMap(p => p.heroes)
          .find(h => h.id === heroId);
        
        if (hero) {
          console.log('✅ Updating hero position locally:', {
            oldPosition: hero.position,
            newPosition: targetPosition,
            movementPointsBefore: hero.movementPoints,
            movementPointsAfter: Math.max(0, hero.movementPoints - (result.movementCost || 100))
          });
          hero.position = targetPosition;
          hero.movementPoints = Math.max(0, hero.movementPoints - (result.movementCost || 100));
          set({ currentGame: updatedGame });
        }
        
        console.log('✅ Hero moved successfully:', result);
      } else {
        throw new Error(result.message || 'Failed to move hero');
      }
      
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to move hero');
      console.error('Hero movement error:', error);
    } finally {
      setLoading(false);
    }
  },

  attackTarget: async (heroId: string, targetId: string) => {
    const { setLoading, setError, addTimelineAction, calculateZFC, currentGame, currentPlayer } = get();
    setLoading(true);
    setError(null);

    try {
      if (!currentGame || !currentPlayer) throw new Error('No active game or player');

      const zfc = await calculateZFC(currentPlayer.id, heroId);
      
      const timelineAction: TimelineAction = {
        id: `action_${Date.now()}`,
        type: 'attack',
        heroId,
        targetPosition: undefined,
        timestamp: Date.now(),
        status: 'PENDING'
      };

      addTimelineAction(timelineAction);
      
      // Validation automatique si possible
      const { validateAction } = get();
      await validateAction(timelineAction.id);
      
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to attack target');
    } finally {
      setLoading(false);
    }
  },

  collectResource: async (heroId: string, objectId: string) => {
    const { setLoading, setError, addTimelineAction, calculateZFC, currentGame, currentPlayer } = get();
    setLoading(true);
    setError(null);

    try {
      if (!currentGame || !currentPlayer) throw new Error('No active game or player');

      const zfc = await calculateZFC(currentPlayer.id, heroId);
      
      const timelineAction: TimelineAction = {
        id: `action_${Date.now()}`,
        type: 'collect',
        heroId,
        targetPosition: undefined,
        timestamp: Date.now(),
        status: 'PENDING'
      };

      addTimelineAction(timelineAction);
      
      // Validation automatique si possible
      const { validateAction } = get();
      await validateAction(timelineAction.id);
      
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to collect resource');
    } finally {
      setLoading(false);
    }
  },

  cancelAction: async (actionId: string) => {
    const { setLoading, setError, updateTimelineAction } = get();
    setLoading(true);
    setError(null);

    try {
      updateTimelineAction(actionId, 'DISCARDED');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to cancel action');
    } finally {
      setLoading(false);
    }
  },

  // Game state management
  resetGame: () => set(initialState),
  
  loadGame: async (gameId: string) => {
    const { setLoading, setError, setCurrentGame, setCurrentPlayer, setMap, convertTilesToMap } = get();
    setLoading(true);
    setError(null);

    try {
      const gameData = await GameService.initializeGame(gameId);
      console.log('🎮 loadGame: Game data loaded:', gameData);
      
      if (gameData.currentGame) {
        setCurrentGame(gameData.currentGame);
        
        // Set current player (should be the first player initially)
        const currentPlayer = gameData.currentGame.players.find(p => p.id === gameData.currentGame?.currentPlayerId) || gameData.currentGame.players[0];
        setCurrentPlayer(currentPlayer);
        
        // Convert and set map - use fixed map size for now
        const mapWidth = 20;
        const mapHeight = 20;
        const map = convertTilesToMap(gameData.currentGame.map, mapWidth, mapHeight);
        setMap(map);
        
        // Initialize magic item system with demo items
        get().addItemToInventory('sword_of_might');
        get().addItemToInventory('shield_of_protection');
        get().addItemToInventory('ring_of_wisdom');
        get().addItemToInventory('healing_potion');
        get().addItemToInventory('mana_crystal');
        
        console.log('✅ loadGame: Game loaded successfully');
      } else {
        throw new Error('Failed to load game data');
      }
    } catch (error) {
      console.error('❌ loadGame: Error loading game:', error);
      setError(error instanceof Error ? error.message : 'Failed to load game');
    } finally {
      setLoading(false);
    }
  },
  
  refreshGameState: async () => {
    const { currentGame, setCurrentGame, setCurrentPlayer, setMap, convertTilesToMap } = get();
    if (!currentGame) return;

    try {
      const gameData = await GameService.getGameState(currentGame.id);
      console.log('🔄 refreshGameState: Game state refreshed:', gameData);
      
      if (gameData.currentGame) {
        setCurrentGame(gameData.currentGame);
        
        // Update current player
        const currentPlayer = gameData.currentGame.players.find(p => p.id === gameData.currentGame?.currentPlayerId) || gameData.currentGame.players[0];
        setCurrentPlayer(currentPlayer);
        
        // Update map - use fixed map size for now
        const mapWidth = 20;
        const mapHeight = 20;
        const map = convertTilesToMap(gameData.currentGame.map, mapWidth, mapHeight);
        setMap(map);
      }
    } catch (error) {
      console.error('❌ refreshGameState: Error refreshing game state:', error);
    }
  },
  
  endTurn: async () => {
    const { currentGame, currentPlayer, setLoading, setError, refreshGameState } = get();
    if (!currentGame || !currentPlayer) return;

    console.log('⭐ endTurn: Ending turn for player:', currentPlayer.id);
    setLoading(true);
    setError(null);

    try {
      // Clear any selected hero and movement state
      get().selectHero(null);
      
      if (currentGame.gameMode === 'hotseat') {
        // In hotseat mode, switch to next player locally
        console.log('🔄 endTurn: Hotseat mode - switching to next player');
        get().nextPlayer();
      } else {
        // In multiplayer mode, call backend API
        console.log('📡 endTurn: Multiplayer mode - calling backend API');
        const result = await ApiService.endTurn(currentGame.id, currentPlayer.id);
        
        if (result.success) {
          console.log('✅ endTurn: Turn ended successfully');
          // Refresh game state to get updated turn info
          await refreshGameState();
        } else {
          throw new Error(result.message || 'Failed to end turn');
        }
      }
    } catch (error) {
      console.error('❌ endTurn: Error ending turn:', error);
      setError(error instanceof Error ? error.message : 'Failed to end turn');
    } finally {
      setLoading(false);
    }
  },
  
  // Enhanced Hot Seat mode with proper player switching
  switchPlayer: (playerId: string) => {
    const { currentGame, setCurrentPlayer, updateVision } = get();
    if (!currentGame) return;

    console.log('🔄 switchPlayer: Switching to player:', playerId);
    
    const newPlayer = currentGame.players.find(p => p.id === playerId);
    if (!newPlayer) {
      console.error('❌ switchPlayer: Player not found:', playerId);
      return;
    }

    // Clear any selected hero and movement state
    get().selectHero(null);
    
    // Update current player
    setCurrentPlayer(newPlayer);
    
    // Update game's current player ID
    const updatedGame = { ...currentGame, currentPlayerId: playerId };
    get().setCurrentGame(updatedGame);
    
    // Update vision for the new player
    setTimeout(() => {
      updateVision(playerId);
    }, 50);
    
    console.log('✅ switchPlayer: Player switched successfully to:', newPlayer.name);
  },
  
  nextPlayer: () => {
    const { currentGame, currentPlayer } = get();
    if (!currentGame || !currentPlayer) return;

    console.log('➡️ nextPlayer: Finding next player after:', currentPlayer.id);
    
    const currentIndex = currentGame.players.findIndex(p => p.id === currentPlayer.id);
    const nextIndex = (currentIndex + 1) % currentGame.players.length;
    const nextPlayer = currentGame.players[nextIndex];
    
    console.log('➡️ nextPlayer: Next player will be:', nextPlayer.id, 'at index:', nextIndex);
    
    // Switch to the next player
    get().switchPlayer(nextPlayer.id);
    
    // Update the game's turn number if we've completed a full cycle
    if (nextIndex === 0) {
      const updatedGame = { ...currentGame, turn: currentGame.turn + 1 };
      get().setCurrentGame(updatedGame);
      console.log('🔄 nextPlayer: Turn incremented to:', updatedGame.turn);
    }
  },

  // New function to reset a specific game session
  resetGameSession: (scenarioId: string) => {
    const sessionKey = `heroesOfTime_session_${scenarioId}`;
    localStorage.removeItem(sessionKey);
    console.log(`%c🔄 [GameStore] Game session reset for scenario: ${scenarioId}`, 'color: orange');
    set(initialState);
  }
})); 