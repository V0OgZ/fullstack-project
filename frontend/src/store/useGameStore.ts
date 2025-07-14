import { create } from 'zustand';
import { GameState, Game, Player, Tile, Position, Hero, GameAction, CombatResult, TimelineAction, ShadowAction, ZoneOfCausality } from '../types/game';
import { MagicItemService, EquippedItems } from '../services/magicItemService';
import { ZFCService } from '../services/zfcService';
import { GameService } from '../services/gameService';
import { ApiService } from '../services/api'; // Corrected import path

interface GameStore extends GameState {
  // Map state
  map: Tile[][];
  selectedTile: Position | null;
  currentPlayerNumber: number;
  
  // Hero selection and movement
  selectedHero: Hero | null;
  movementRange: Position[];
  movementMode: boolean;
  
  // NEW: Magic Item State
  playerInventory: string[];
  equippedItems: { [heroId: string]: EquippedItems };
  
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
  
  shadowActions: [],
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
            hero: tile.hero || null,
            creature: tile.creature || null
          });
        } else {
          // Fallback tile
          row.push({
            x,
            y,
            terrain: 'grass',
            walkable: true,
            movementCost: 1,
            hero: null,
            creature: null
          });
        }
      }
      map.push(row);
    }
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
  setCurrentPlayer: (player) => set({ currentPlayer: player }),
  setMap: (map) => set({ map }),
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
  addTimelineAction: (action) => set((state) => ({
    currentGame: state.currentGame ? {
      ...state.currentGame,
      timeline: [...state.currentGame.timeline, action]
    } : null
  })),
  
  updateTimelineAction: (actionId, status) => set((state) => ({
    currentGame: state.currentGame ? {
      ...state.currentGame,
      timeline: state.currentGame.timeline.map(action =>
        action.id === actionId ? { ...action, status } : action
      )
    } : null
  })),
  
  setShadowActions: (shadows) => set({ shadowActions: shadows }),
  setVisibleZFCs: (zfcs) => set({ visibleZFCs: zfcs }),
  setLockedZones: (zones) => set({ lockedZones: zones }),

  // NOUVEAU: Calcul de Zone de Causalité (now using backend)
  calculateZFC: async (playerId: string, heroId: string) => {
    const { map, currentGame } = get();
    const hero = currentGame?.players
      .find(p => p.id === playerId)
      ?.heroes.find(h => h.id === heroId);
    
    if (!hero || !map.length) {
      return {
        playerId,
        radius: 0,
        center: { x: 0, y: 0 },
        includesTeleport: false,
        validUntil: 0,
        reachableTiles: [],
        conflictZones: [],
        temporalStability: 0.5,
        metadata: {}
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
          hero: tile.hero || null,
          creature: tile.creature || null,
          structure: tile.structure || null,
          isVisible: tile.isVisible
        })))
      };

      const result = await ZFCService.calculateZFC(playerId, heroId, hero, gameMap, currentGame?.currentTurn || 1);
      
      // Extract the first ZFC zone from the result, or return a default one
      const zfcZone = result.zfc[0];
      if (zfcZone) {
        return {
          playerId: zfcZone.playerId,
          radius: zfcZone.radius,
          center: zfcZone.center,
          includesTeleport: false,
          validUntil: zfcZone.validUntil,
          reachableTiles: zfcZone.reachableTiles,
          conflictZones: zfcZone.conflictZones,
          temporalStability: zfcZone.temporalStability,
          metadata: zfcZone.metadata
        };
      }
    } catch (error) {
      console.error('Error calculating ZFC:', error);
    }

    return {
      playerId,
      radius: 0,
      center: { x: 0, y: 0 },
      includesTeleport: false,
      validUntil: 0,
      reachableTiles: [],
      conflictZones: [],
      temporalStability: 0.5,
      metadata: {}
    };
  },

  validateAction: async (actionId: string) => {
    const { currentGame } = get();
    if (!currentGame) return false;

    const action = currentGame.timeline.find(a => a.id === actionId);
    if (!action) return false;

    try {
      const actionData = action.action;
      const zfcMap = ZFCService.convertGameTilesToZFCTiles(get().map);
      
      // Extract target position from action
      let targetPosition = { x: 0, y: 0 };
      if (actionData.targetPosition) {
        targetPosition = actionData.targetPosition;
      }
      
      // Validate using backend
      if (!actionData.heroId) {
        return false;
      }
      
      const gameMapForValidation = {
        width: zfcMap[0]?.length || 0,
        height: zfcMap.length,
        tiles: zfcMap
      };
      
      const isValid = await ZFCService.validateZFCAction(
        actionData.type,
        actionData.heroId,
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

    try {
      if (!currentGame || !currentPlayer) throw new Error('No active game or player');

      // Call backend API to move hero
      const result = await ApiService.moveHero(heroId, targetPosition);
      
      if (result.success) {
        // Refresh game state to reflect the move
        await refreshGameState();
        
        // Update hero position in the current state immediately for UI feedback
        const updatedGame = { ...currentGame };
        const hero = updatedGame.players
          .flatMap(p => p.heroes)
          .find(h => h.id === heroId);
        
        if (hero) {
          hero.position = targetPosition;
          hero.movementPoints = Math.max(0, hero.movementPoints - (result.movementCost || 100));
          set({ currentGame: updatedGame });
        }
        
        console.log('Hero moved successfully:', result);
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
        turn: currentGame.currentTurn,
        playerId: currentPlayer.id,
        action: {
          type: 'attack',
          heroId,
          targetId
        },
        status: 'PENDING',
        zfc,
        originTimestamp: new Date().toISOString(),
        shadowVisible: true
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
        turn: currentGame.currentTurn,
        playerId: currentPlayer.id,
        action: {
          type: 'collect',
          heroId,
          targetId: objectId
        },
        status: 'PENDING',
        zfc,
        originTimestamp: new Date().toISOString(),
        shadowVisible: true
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

  loadGame: async (scenarioId: string) => {
    console.log(`%c🎮 [GameStore] loadGame called with scenarioId: "${scenarioId}"`, 'color: purple; font-weight: bold');
    
    // IMPORTANT: Always reset state completely before loading a new game
    const { setLoading, setError, setCurrentGame, setCurrentPlayer, setMap } = get();
    
    // Reset everything to initial state
    set(initialState);
    
    // Now set loading true after reset
    setLoading(true);

    try {
      console.log(`%c📡 [GameStore] About to call API for scenario: ${scenarioId}`, 'color: blue');
      // Use GameService to initialize the game
      const gameState = await GameService.initializeGame(scenarioId);
      console.log('%c[DEBUG] Backend response from initializeGame:', 'color: orange; font-weight: bold', gameState);
      // Set the game state in the store
      if (gameState.currentGame) {
        setCurrentGame(gameState.currentGame);
        console.log('%c[DEBUG] setCurrentGame:', 'color: orange', gameState.currentGame);
        // Convert tiles to map format
        if (gameState.currentGame.map && gameState.currentGame.map.tiles) {
          const mapData = get().convertTilesToMap(
            gameState.currentGame.map.tiles, 
            gameState.currentGame.map.width, 
            gameState.currentGame.map.height
          );
          setMap(mapData);
          console.log('%c[DEBUG] setMap:', 'color: orange', mapData);
          console.log('%c[DEBUG] Map dimensions:', 'color: orange', {
            width: gameState.currentGame.map.width,
            height: gameState.currentGame.map.height,
            tilesLength: gameState.currentGame.map.tiles.length,
            mapRows: mapData.length,
            mapCols: mapData[0]?.length || 0
          });
        } else {
          console.warn('[DEBUG] No map or tiles in currentGame!');
        }
      } else {
        console.warn('[DEBUG] No currentGame in gameState!');
      }
      if (gameState.currentPlayer) {
        setCurrentPlayer(gameState.currentPlayer);
        console.log('%c[DEBUG] setCurrentPlayer:', 'color: orange', gameState.currentPlayer);
      } else {
        console.warn('[DEBUG] No currentPlayer in gameState!');
      }
      // Print final state
      const state = get();
      console.log('%c[DEBUG] Final store state after loadGame:', 'color: orange; font-weight: bold', {
        currentGame: state.currentGame,
        currentPlayer: state.currentPlayer,
        map: state.map,
        isLoading: state.isLoading,
        error: state.error
      });
      console.log(`%c🎉 [GameStore] loadGame completed successfully!`, 'color: green; font-weight: bold');
    } catch (error) {
      console.error(`%c💥 [GameStore] loadGame failed:`, 'color: red; font-weight: bold');
      console.error(`%c   Scenario ID: ${scenarioId}`, 'color: red');
      console.error(`%c   Error:`, 'color: red', error);
      setError(error instanceof Error ? error.message : 'Failed to load game');
    } finally {
      setLoading(false);
    }
  },

  refreshGameState: async () => {
    const { currentGame, setLoading, setError, setCurrentGame, setCurrentPlayer, setMap } = get();
    if (!currentGame) return;

    setLoading(true);
    setError(null);

    try {
      const gameState = await GameService.getGameState(currentGame.id);
      
      if (gameState.currentGame) {
        setCurrentGame(gameState.currentGame);
        // Update the map state when refreshing
        if (gameState.currentGame.map && gameState.currentGame.map.tiles) {
          setMap(get().convertTilesToMap(gameState.currentGame.map.tiles, gameState.currentGame.map.width, gameState.currentGame.map.height));
        }
      }
      if (gameState.currentPlayer) {
        setCurrentPlayer(gameState.currentPlayer);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to refresh game state');
    } finally {
      setLoading(false);
    }
  },

  endTurn: async () => {
    const { currentGame, setLoading, setError, refreshGameState } = get();
    if (!currentGame) return;

    setLoading(true);
    setError(null);

    try {
      await GameService.endTurn(currentGame.id);
      await refreshGameState();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to end turn');
    } finally {
      setLoading(false);
    }
  },

  // Hot Seat mode
  switchPlayer: (playerId: string) => {
    const { currentGame, setCurrentPlayer } = get();
    if (!currentGame) return;

    const player = currentGame.players.find(p => p.id === playerId);
    if (player) {
      setCurrentPlayer(player);
    }
  },

  nextPlayer: () => {
    const { currentGame, currentPlayer, switchPlayer } = get();
    if (!currentGame || !currentPlayer) return;

    const currentIndex = currentGame.players.findIndex(p => p.id === currentPlayer.id);
    const nextIndex = (currentIndex + 1) % currentGame.players.length;
    const nextPlayer = currentGame.players[nextIndex];
    
    if (nextPlayer) {
      switchPlayer(nextPlayer.id);
    }
  }
})); 