import { create } from 'zustand';
import { GameState, Game, Player, GameAction, Position, CombatResult, Tile, ZoneOfCausality, TimelineAction, ShadowAction, Hero } from '../types/game';
import { GameService } from '../services/gameService';
import { MagicItemService, EquippedItems } from '../services/magicItemService';

interface GameStore extends GameState {
  // Map state
  map: Tile[][];
  selectedTile: Position | null;
  currentPlayerNumber: number;
  
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
  
  // NEW: Magic Item Actions
  equipItem: (heroId: string, itemId: string, slot: string) => boolean;
  unequipItem: (heroId: string, slot: string) => boolean;
  consumeItem: (itemId: string, heroId: string) => boolean;
  addItemToInventory: (itemId: string) => void;
  removeItemFromInventory: (itemId: string) => void;
  getEnhancedHero: (heroId: string) => Hero | null;
  
  // Helper functions
  convertTilesToMap: (tiles: any[], width: number, height: number) => Tile[][];
  
  // ZFC Actions
  addTimelineAction: (action: TimelineAction) => void;
  updateTimelineAction: (actionId: string, status: TimelineAction['status']) => void;
  setShadowActions: (shadows: ShadowAction[]) => void;
  setVisibleZFCs: (zfcs: ZoneOfCausality[]) => void;
  setLockedZones: (zones: Position[]) => void;
  calculateZFC: (playerId: string, heroId: string) => ZoneOfCausality;
  validateAction: (actionId: string) => Promise<boolean>;
  
  // Game actions
  moveHero: (heroId: string, targetPosition: Position) => Promise<void>;
  attackTarget: (heroId: string, targetId: string) => Promise<void>;
  collectResource: (heroId: string, objectId: string) => Promise<void>;
  cancelAction: (actionId: string) => Promise<void>;
  
  // Game state management
  loadGame: (gameId: string) => Promise<void>;
  refreshGameState: () => Promise<void>;
  endTurn: () => Promise<void>;
  
  // Hot Seat mode
  switchPlayer: (playerId: string) => void;
  nextPlayer: () => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  // Initial state
  currentGame: null,
  currentPlayer: null,
  pendingActions: [],
  combatResults: [],
  isLoading: false,
  error: null,
  map: [],
  selectedTile: null,
  currentPlayerNumber: 1,
  // NOUVEAU: État ZFC
  shadowActions: [],
  visibleZFCs: [],
  lockedZones: [],
  // NOUVEAU: État politique
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

  // NEW: Magic Item State
  playerInventory: [],
  equippedItems: {},

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

  // NEW: Magic Item Actions
  equipItem: (heroId: string, itemId: string, slot: string) => {
    const { equippedItems, currentGame, currentPlayer } = get();
    if (!currentGame || !currentPlayer) return false;

    const hero = currentPlayer.heroes.find(h => h.id === heroId);
    if (!hero) return false;

    // Check level requirement using MagicItemService
    const result = MagicItemService.equipItem(itemId, hero.level);
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

  consumeItem: (itemId: string, heroId: string) => {
    const { currentGame, currentPlayer } = get();
    if (!currentGame || !currentPlayer) return false;

    const hero = currentPlayer.heroes.find(h => h.id === heroId);
    if (!hero) return false;

    const result = MagicItemService.consumeItem(
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

  getEnhancedHero: (heroId: string) => {
    const { equippedItems, currentGame, currentPlayer } = get();
    if (!currentGame || !currentPlayer) return null;

    const hero = currentPlayer.heroes.find(h => h.id === heroId);
    if (!hero) return null;

    // Apply item effects using MagicItemService
    const enhancedHero = MagicItemService.applyItemEffectsToHero(
      hero, 
      equippedItems[heroId] || {}
    );

    return enhancedHero;
  },

  // State setters
  setCurrentGame: (game) => set({ currentGame: game }),
  setCurrentPlayer: (player) => set({ currentPlayer: player }),
  setMap: (map) => set({ map }),
  setSelectedTile: (position) => set({ selectedTile: position }),
  setCurrentPlayerNumber: (playerNumber) => set({ currentPlayerNumber: playerNumber }),
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

  // NOUVEAU: Actions ZFC
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

  // NOUVEAU: Calcul de Zone de Causalité
  calculateZFC: (playerId: string, heroId: string) => {
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
        conflictZones: []
      };
    }

    const reachableTiles: Position[] = [];
    const radius = hero.movementPoints;
    
    // Calcul des cases atteignables (simplifié pour MVP)
    for (let y = Math.max(0, hero.position.y - radius); y <= Math.min(map.length - 1, hero.position.y + radius); y++) {
      for (let x = Math.max(0, hero.position.x - radius); x <= Math.min(map[0].length - 1, hero.position.x + radius); x++) {
        const distance = Math.abs(x - hero.position.x) + Math.abs(y - hero.position.y);
        if (distance <= radius && map[y][x].walkable) {
          reachableTiles.push({ x, y });
        }
      }
    }

    return {
      playerId,
      radius,
      center: hero.position,
      includesTeleport: false, // À implémenter avec les sorts
      validUntil: currentGame?.currentTurn || 1,
      reachableTiles,
      conflictZones: []
    };
  },

  // NOUVEAU: Validation d'action
  validateAction: async (actionId: string) => {
    const { currentGame, updateTimelineAction } = get();
    if (!currentGame) return false;

    try {
      // Simulation de validation (à remplacer par l'API)
      const action = currentGame.timeline.find(a => a.id === actionId);
      if (!action) return false;

      // Vérification des conflits ZFC
      const hasConflict = currentGame.timeline.some(otherAction => 
        otherAction.id !== actionId && 
        otherAction.status === 'PENDING' &&
        otherAction.playerId !== action.playerId &&
        otherAction.zfc.reachableTiles.some(tile => 
          action.zfc.reachableTiles.some(actionTile => 
            actionTile.x === tile.x && actionTile.y === tile.y
          )
        )
      );

      if (hasConflict) {
        updateTimelineAction(actionId, 'LOCKED');
        return false;
      } else {
        updateTimelineAction(actionId, 'CONFIRMED');
        return true;
      }
    } catch (error) {
      console.error('Validation error:', error);
      return false;
    }
  },

  // Game actions
  moveHero: async (heroId: string, targetPosition: Position) => {
    const { setLoading, setError, addTimelineAction, calculateZFC, currentGame, currentPlayer } = get();
    setLoading(true);
    setError(null);

    try {
      if (!currentGame || !currentPlayer) throw new Error('No active game or player');

      const zfc = calculateZFC(currentPlayer.id, heroId);
      
      const timelineAction: TimelineAction = {
        id: `action_${Date.now()}`,
        turn: currentGame.currentTurn,
        playerId: currentPlayer.id,
        action: {
          type: 'move',
          heroId,
          targetPosition
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
      setError(error instanceof Error ? error.message : 'Failed to move hero');
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

      const zfc = calculateZFC(currentPlayer.id, heroId);
      
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

      const zfc = calculateZFC(currentPlayer.id, heroId);
      
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
  loadGame: async (gameId: string) => {
    const { setLoading, setError, setCurrentGame, setCurrentPlayer, setMap } = get();
    setLoading(true);
    setError(null);

    try {
      const gameState = await GameService.initializeGame(gameId);
      
      if (gameState.currentGame) {
        setCurrentGame(gameState.currentGame);
        // CRITICAL FIX: Set the map state when game loads
        if (gameState.currentGame.map && gameState.currentGame.map.tiles) {
          setMap(get().convertTilesToMap(gameState.currentGame.map.tiles, gameState.currentGame.map.width, gameState.currentGame.map.height));
        }
      }
      if (gameState.currentPlayer) {
        setCurrentPlayer(gameState.currentPlayer);
        
        // Initialize magic item system with demo items
        const demoItems = [
          'sword_basic', 'armor_leather', 'ring_power', 'boots_speed',
          'potion_health', 'potion_mana', 'scroll_teleport',
          'temporal_anchor', 'temporal_prism', 'crown_kings',
          'staff_archmage', 'orb_knowledge', 'sword_legendary'
        ];
        
        set({ 
          playerInventory: demoItems,
          equippedItems: {
            [gameState.currentPlayer.heroes[0]?.id]: {
              weapon: 'sword_basic',
              armor: 'armor_leather',
              ring: 'ring_power',
              boots: 'boots_speed'
            }
          }
        });
        
        console.log('🎒 Magic item system initialized with', demoItems.length, 'items');
      }
    } catch (error) {
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
        // CRITICAL FIX: Set the map state when refreshing
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
    const { currentGame, setCurrentGame, setCurrentPlayer } = get();
    if (!currentGame) return;

    const newPlayer = currentGame.players.find(p => p.id === playerId);
    if (!newPlayer) return;

    const updatedGame = {
      ...currentGame,
      currentPlayerTurn: playerId,
    };

    setCurrentGame(updatedGame);
    setCurrentPlayer(newPlayer);
  },

  nextPlayer: () => {
    const { currentGame, switchPlayer } = get();
    if (!currentGame || !currentGame.currentPlayerTurn) return;

    const currentIndex = currentGame.players.findIndex(p => p.id === currentGame.currentPlayerTurn);
    const nextIndex = (currentIndex + 1) % currentGame.players.length;
    const nextPlayer = currentGame.players[nextIndex];

    if (nextPlayer) {
      switchPlayer(nextPlayer.id);
    }
  },
})); 