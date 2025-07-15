import { Position, Tile } from '../types/game';

/**
 * Axial neighbor offsets for pointy-top hexes.
 * Index order (bit significance):
 * 0 = East ( +1 ,  0 )
 * 1 = North-East ( +1 , -1 )
 * 2 = North-West (  0 , -1 )
 * 3 = West ( -1 ,  0 )
 * 4 = South-West ( -1 , +1 )
 * 5 = South-East (  0 , +1 )
 */
export const HEX_NEIGHBORS: readonly Position[] = [
  { x: 1, y: 0 },   // E
  { x: 1, y: -1 },  // NE
  { x: 0, y: -1 },  // NW
  { x: -1, y: 0 },  // W
  { x: -1, y: 1 },  // SW
  { x: 0, y: 1 }    // SE
] as const;

/**
 * Safely retrieves a tile from a 2-D array using axial coordinates.
 */
function getTile(map: Tile[][], pos: Position): Tile | null {
  const row = map[pos.y];
  return row ? row[pos.x] ?? null : null;
}

/**
 * Computes a 6-bit bitmask for the tile located at `pos`.
 * Each bit `i` is 1 if the adjacent tile in direction `i` exists
 * and shares the same terrain type. 0 otherwise.
 */
export function computeHexBitmask(map: Tile[][], pos: Position): number {
  const center = getTile(map, pos);
  if (!center) return 0;

  let mask = 0;
  HEX_NEIGHBORS.forEach((offset, i) => {
    const neighborPos = { x: pos.x + offset.x, y: pos.y + offset.y };
    const neighbor = getTile(map, neighborPos);
    if (neighbor && neighbor.terrain === center.terrain) {
      mask |= 1 << i;
    }
  });

  return mask;
}

export function getNeighborPositions(pos: Position): Position[] {
  return HEX_NEIGHBORS.map(o => ({ x: pos.x + o.x, y: pos.y + o.y }));
} 