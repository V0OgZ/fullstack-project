import { computeHexBitmask, getNeighborPositions, HEX_NEIGHBORS } from '../hexBitmask';
import { Tile } from '../../types/game';

describe('hexBitmask utilities', () => {
  // Helper to create a tile
  const createTile = (x: number, y: number, terrain: "grass" | "forest" | "mountain" | "water" | "desert" | "swamp"): Tile => ({
    x,
    y,
    terrain,
    walkable: true,
    movementCost: 1,
    hero: null,
    creature: null,
    structure: null,
    isVisible: true,
    isExplored: false
  });

  describe('computeHexBitmask', () => {
    it('should return 0 for empty map', () => {
      const map: Tile[][] = [];
      expect(computeHexBitmask(map, { x: 0, y: 0 })).toBe(0);
    });

    it('should return 0 for out-of-bounds position', () => {
      const map: Tile[][] = [[createTile(0, 0, 'grass')]];
      expect(computeHexBitmask(map, { x: 5, y: 5 })).toBe(0);
    });

    it('should return 0 for isolated tile (no same terrain neighbors)', () => {
      const map: Tile[][] = [
        [createTile(0, 0, 'water'), createTile(1, 0, 'water'), createTile(2, 0, 'water')],
        [createTile(0, 1, 'water'), createTile(1, 1, 'grass'), createTile(2, 1, 'water')],
        [createTile(0, 2, 'water'), createTile(1, 2, 'water'), createTile(2, 2, 'water')]
      ];
      expect(computeHexBitmask(map, { x: 1, y: 1 })).toBe(0);
    });

    it('should return 0b111111 (63) for fully surrounded tile', () => {
      const map: Tile[][] = [
        [createTile(0, 0, 'grass'), createTile(1, 0, 'grass'), createTile(2, 0, 'grass')],
        [createTile(0, 1, 'grass'), createTile(1, 1, 'grass'), createTile(2, 1, 'grass')],
        [createTile(0, 2, 'grass'), createTile(1, 2, 'grass'), createTile(2, 2, 'grass')]
      ];
      expect(computeHexBitmask(map, { x: 1, y: 1 })).toBe(0b111111);
    });

    it('should correctly compute bitmask for partial neighbors', () => {
      const map: Tile[][] = [
        [createTile(0, 0, 'water'), createTile(1, 0, 'grass'), createTile(2, 0, 'grass')],
        [createTile(0, 1, 'water'), createTile(1, 1, 'grass'), createTile(2, 1, 'grass')],
        [createTile(0, 2, 'water'), createTile(1, 2, 'water'), createTile(2, 2, 'water')]
      ];
      const mask = computeHexBitmask(map, { x: 1, y: 1 });
      // Check E (bit 0) - position (2,1) is grass
      expect(mask & (1 << 0)).toBeTruthy();
      // Check NE (bit 1) - position (2,0) is grass  
      expect(mask & (1 << 1)).toBeTruthy();
      // Check NW (bit 2) - position (1,0) is grass
      expect(mask & (1 << 2)).toBeTruthy();
      // Check W (bit 3) - position (0,1) is water
      expect(mask & (1 << 3)).toBeFalsy();
    });
  });

  describe('getNeighborPositions', () => {
    it('should return 6 neighbor positions', () => {
      const neighbors = getNeighborPositions({ x: 5, y: 5 });
      expect(neighbors).toHaveLength(6);
    });

    it('should return correct neighbor positions for hex grid', () => {
      const neighbors = getNeighborPositions({ x: 10, y: 10 });
      const expected = [
        { x: 11, y: 10 },  // E
        { x: 11, y: 9 },   // NE
        { x: 10, y: 9 },   // NW
        { x: 9, y: 10 },   // W
        { x: 9, y: 11 },   // SW
        { x: 10, y: 11 }   // SE
      ];
      expect(neighbors).toEqual(expected);
    });

    it('should handle edge positions (can return negative coordinates)', () => {
      const neighbors = getNeighborPositions({ x: 0, y: 0 });
      expect(neighbors).toContainEqual({ x: -1, y: 0 });  // W
      expect(neighbors).toContainEqual({ x: 0, y: -1 });  // NW
    });
  });

  describe('HEX_NEIGHBORS constant', () => {
    it('should have 6 directions', () => {
      expect(HEX_NEIGHBORS).toHaveLength(6);
    });

    it('should have correct offsets for pointy-top hex', () => {
      expect(HEX_NEIGHBORS[0]).toEqual({ x: 1, y: 0 });   // E
      expect(HEX_NEIGHBORS[1]).toEqual({ x: 1, y: -1 });  // NE
      expect(HEX_NEIGHBORS[2]).toEqual({ x: 0, y: -1 });  // NW
      expect(HEX_NEIGHBORS[3]).toEqual({ x: -1, y: 0 });  // W
      expect(HEX_NEIGHBORS[4]).toEqual({ x: -1, y: 1 });  // SW
      expect(HEX_NEIGHBORS[5]).toEqual({ x: 0, y: 1 });   // SE
    });
  });
}); 