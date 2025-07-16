import seedrandom from 'seedrandom';

export interface EnrichedTile {
  x: number;
  y: number;
  biome: string;
  zone_id: string;
  zone_size: number;
  distance_to_border: number;
  zone_center: { x: number; y: number };
}

// Helper: BFS for zone detection
function bfsZone(map: any[][], visited: boolean[][], x: number, y: number, biome: string, zoneId: string, zoneTiles: {x: number, y: number}[]): void {
  const queue = [{x, y}];
  visited[y][x] = true;
  while (queue.length > 0) {
    const {x: cx, y: cy} = queue.shift()!;
    zoneTiles.push({x: cx, y: cy});
    // Hex neighbors (odd-q vertical layout)
    const neighbors = [
      [cx+1, cy], [cx-1, cy],
      [cx, cy+1], [cx, cy-1],
      [cx + (cy%2 ? 1 : -1), cy-1],
      [cx + (cy%2 ? 1 : -1), cy+1]
    ];
    for (const [nx, ny] of neighbors) {
      if (
        ny >= 0 && ny < map.length &&
        nx >= 0 && nx < map[0].length &&
        !visited[ny][nx] &&
        map[ny][nx]?.terrain === biome
      ) {
        visited[ny][nx] = true;
        queue.push({x: nx, y: ny});
      }
    }
  }
}

// Helper: compute distance to border for each tile in a zone
function computeDistances(zoneTiles: {x: number, y: number}[], map: any[][], biome: string): Record<string, number> {
  const dist: Record<string, number> = {};
  const tileSet = new Set(zoneTiles.map(t => `${t.x}_${t.y}`));
  // BFS from border tiles
  const queue: {x: number, y: number, d: number}[] = [];
  for (const {x, y} of zoneTiles) {
    // If any neighbor is not in zone, it's a border
    const neighbors = [
      [x+1, y], [x-1, y],
      [x, y+1], [x, y-1],
      [x + (y%2 ? 1 : -1), y-1],
      [x + (y%2 ? 1 : -1), y+1]
    ];
    if (neighbors.some(([nx, ny]) => !tileSet.has(`${nx}_${ny}`))) {
      dist[`${x}_${y}`] = 0;
      queue.push({x, y, d: 0});
    }
  }
  // BFS to fill distances
  while (queue.length > 0) {
    const {x, y, d} = queue.shift()!;
    const neighbors = [
      [x+1, y], [x-1, y],
      [x, y+1], [x, y-1],
      [x + (y%2 ? 1 : -1), y-1],
      [x + (y%2 ? 1 : -1), y+1]
    ];
    for (const [nx, ny] of neighbors) {
      if (
        tileSet.has(`${nx}_${ny}`) &&
        dist[`${nx}_${ny}`] === undefined
      ) {
        dist[`${nx}_${ny}`] = d + 1;
        queue.push({x: nx, y: ny, d: d+1});
      }
    }
  }
  return dist;
}

// Helper: compute barycenter
function computeCenter(zoneTiles: {x: number, y: number}[]): {x: number, y: number} {
  const sx = zoneTiles.reduce((sum, t) => sum + t.x, 0);
  const sy = zoneTiles.reduce((sum, t) => sum + t.y, 0);
  return {
    x: Math.round(sx / zoneTiles.length),
    y: Math.round(sy / zoneTiles.length)
  };
}

// Main function: enrich map with zone info
type MapTile = any & { terrain?: string };
export function enrichMapWithZones(map: MapTile[][], mapId: string): EnrichedTile[][] {
  const height = map.length;
  const width = map[0]?.length || 0;
  const visited: boolean[][] = Array.from({length: height}, () => Array(width).fill(false));
  const result: EnrichedTile[][] = Array.from({length: height}, () => Array(width));
  let zoneCount = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (!visited[y][x] && map[y][x]?.terrain) {
        const biome = map[y][x].terrain;
        const zoneId = `Z${++zoneCount}`;
        const zoneTiles: {x: number, y: number}[] = [];
        bfsZone(map, visited, x, y, biome, zoneId, zoneTiles);
        const zoneSize = zoneTiles.length;
        const zoneCenter = computeCenter(zoneTiles);
        const distToBorder = computeDistances(zoneTiles, map, biome);
        for (const {x: zx, y: zy} of zoneTiles) {
          result[zy][zx] = {
            x: zx,
            y: zy,
            biome,
            zone_id: zoneId,
            zone_size: zoneSize,
            distance_to_border: distToBorder[`${zx}_${zy}`] ?? 0,
            zone_center: zoneCenter
          };
        }
      }
    }
  }
  return result;
} 