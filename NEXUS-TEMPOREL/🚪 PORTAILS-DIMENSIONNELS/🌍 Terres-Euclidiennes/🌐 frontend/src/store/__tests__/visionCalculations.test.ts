import { useGameStore } from '../useGameStore';
import { Game, Player, Hero, Tile } from '../../types/game';

describe('vision calculations', () => {
  // Helper to create a mock game state
  const createMockGame = (): Game => ({
    id: 'test-game',
    name: 'Test Game',
    map: { id: 'test-map', width: 10, height: 10, tiles: [], objects: [] },
    players: [],
    currentTurn: 1,
    turnStartTime: new Date().toISOString(),
    turnDuration: 60,
    status: 'active',
    actions: [],
    timeline: [],
    zfcMap: [],
    gameSettings: {
      maxPlayers: 4,
      turnTimeLimit: 60,
      victoryConditions: []
    },
    gameMode: 'hotseat',
    currentPlayerTurn: 'player1'
  });

  const createMockPlayer = (id: string, heroes: Hero[] = []): Player => ({
    id,
    username: `Player ${id}`,
    email: `${id}@test.com`,
    color: 'blue',
    heroes,
    resources: { gold: 1000, wood: 10, stone: 10, mana: 10 },
    isActive: true
  });

  const createMockHero = (x: number, y: number): Hero => ({
    id: 'hero1',
    name: 'Test Hero',
    level: 1,
    experience: 0,
    stats: {
      attack: 10,
      defense: 10,
      knowledge: 5,
      spellPower: 5
    },
    movementPoints: 1000,
    maxMovementPoints: 1000,
    position: { x, y },
    playerId: 'player1',
    units: [],
    inventory: []
  });

  beforeEach(() => {
    // Reset store to initial state
    useGameStore.setState(useGameStore.getInitialState());
  });

  describe('updateVision', () => {
    it('should mark tiles visible within radius of heroes', () => {
      // Create 5x5 map
      const map: Tile[][] = [];
      for (let y = 0; y < 5; y++) {
        const row: Tile[] = [];
        for (let x = 0; x < 5; x++) {
          row.push({
            x,
            y,
            terrain: 'grass',
            walkable: true,
            movementCost: 1,
            hero: null,
            creature: null,
            structure: null,
            isVisible: false,
            isExplored: false
          });
        }
        map.push(row);
      }

      const hero = createMockHero(2, 2); // Center of map
      const player = createMockPlayer('player1', [hero]);
      const game = createMockGame();
      game.players = [player];

      useGameStore.setState({ 
        map,
        currentGame: game
      });

      // Call updateVision
      useGameStore.getState().updateVision('player1');

      const updatedMap = useGameStore.getState().map;

      // Check center tile is visible
      expect(updatedMap[2][2].isVisible).toBe(true);
      expect(updatedMap[2][2].isExplored).toBe(true);

      // Check tiles within radius 4 (Manhattan distance)
      expect(updatedMap[0][2].isVisible).toBe(true); // 2 tiles up
      expect(updatedMap[4][2].isVisible).toBe(true); // 2 tiles down
      expect(updatedMap[2][0].isVisible).toBe(true); // 2 tiles left
      expect(updatedMap[2][4].isVisible).toBe(true); // 2 tiles right

      // Check diagonal within radius
      expect(updatedMap[1][1].isVisible).toBe(true); // dist = 2
      expect(updatedMap[3][3].isVisible).toBe(true); // dist = 2

      // Check tiles outside radius are not visible
      expect(updatedMap[0][0].isVisible).toBe(false); // dist = 4
    });

    it('should preserve explored state when tiles become not visible', () => {
      const map: Tile[][] = [];
      for (let y = 0; y < 3; y++) {
        const row: Tile[] = [];
        for (let x = 0; x < 3; x++) {
          row.push({
            x,
            y,
            terrain: 'grass',
            walkable: true,
            movementCost: 1,
            hero: null,
            creature: null,
            structure: null,
            isVisible: true,
            isExplored: true // Previously explored
          });
        }
        map.push(row);
      }

      // Hero at corner
      const hero = createMockHero(0, 0);
      const player = createMockPlayer('player1', [hero]);
      const game = createMockGame();
      game.players = [player];

      useGameStore.setState({ 
        map,
        currentGame: game
      });

      useGameStore.getState().updateVision('player1');
      const updatedMap = useGameStore.getState().map;

      // Center should not be visible but still explored
      expect(updatedMap[2][2].isVisible).toBe(false);
      expect(updatedMap[2][2].isExplored).toBe(true);
    });

    it('should handle multiple heroes vision ranges', () => {
      const map: Tile[][] = [];
      for (let y = 0; y < 10; y++) {
        const row: Tile[] = [];
        for (let x = 0; x < 10; x++) {
          row.push({
            x,
            y,
            terrain: 'grass',
            walkable: true,
            movementCost: 1,
            hero: null,
            creature: null,
            structure: null,
            isVisible: false,
            isExplored: false
          });
        }
        map.push(row);
      }

      const hero1 = createMockHero(2, 2);
      const hero2 = createMockHero(7, 7);
      hero2.id = 'hero2';
      
      const player = createMockPlayer('player1', [hero1, hero2]);
      const game = createMockGame();
      game.players = [player];

      useGameStore.setState({ 
        map,
        currentGame: game
      });

      useGameStore.getState().updateVision('player1');
      const updatedMap = useGameStore.getState().map;

      // Both hero positions should be visible
      expect(updatedMap[2][2].isVisible).toBe(true);
      expect(updatedMap[7][7].isVisible).toBe(true);

      // Area around both heroes should be visible
      expect(updatedMap[3][3].isVisible).toBe(true); // Near hero1
      expect(updatedMap[6][6].isVisible).toBe(true); // Near hero2
    });

    it('should handle empty player (no heroes)', () => {
      const map: Tile[][] = [[{
        x: 0,
        y: 0,
        terrain: 'grass',
        walkable: true,
        movementCost: 1,
        hero: null,
        creature: null,
        structure: null,
        isVisible: false,
        isExplored: false
      }]];

      const player = createMockPlayer('player1', []); // No heroes
      const game = createMockGame();
      game.players = [player];

      useGameStore.setState({ 
        map,
        currentGame: game
      });

      // Should not crash
      expect(() => {
        useGameStore.getState().updateVision('player1');
      }).not.toThrow();

      // No tiles should be visible
      const updatedMap = useGameStore.getState().map;
      expect(updatedMap[0][0].isVisible).toBe(false);
    });
  });
}); 