package com.example.demo.service;

import org.springframework.stereotype.Service;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class TerrainZoneService {
    
    // Terrain distribution based on HoMM3 style (percentages)
    private static final Map<String, Double> TERRAIN_DISTRIBUTION = Map.of(
        "grass", 0.30,      // 30% - Base terrain
        "forest", 0.25,     // 25% - Common terrain
        "water", 0.15,      // 15% - Rivers and lakes
        "mountain", 0.15,   // 15% - Mountain ranges
        "desert", 0.10,     // 10% - Desert regions
        "swamp", 0.05       // 5% - Rare swamp areas
    );
    
    // Minimum zone sizes to ensure coherent regions
    private static final Map<String, Integer> MIN_ZONE_SIZES = Map.of(
        "grass", 8,         // Grass can be in small patches
        "forest", 12,       // Forests should be substantial
        "water", 6,         // Water can be smaller (lakes)
        "mountain", 10,     // Mountains form ranges
        "desert", 15,       // Deserts are large regions
        "swamp", 6          // Swamps can be small
    );
    
    public static class TerrainZone {
        public String terrain;
        public int centerX;
        public int centerY;
        public int size;
        public List<Position> tiles;
        
        public TerrainZone(String terrain, int centerX, int centerY) {
            this.terrain = terrain;
            this.centerX = centerX;
            this.centerY = centerY;
            this.tiles = new ArrayList<>();
            this.size = 0;
        }
    }
    
    public static class Position {
        public int x, y;
        public Position(int x, int y) { this.x = x; this.y = y; }
        
        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            Position position = (Position) o;
            return x == position.x && y == position.y;
        }
        
        @Override
        public int hashCode() {
            return Objects.hash(x, y);
        }
    }
    
    /**
     * Generate contiguous terrain zones for hexagonal map
     * Replaces random terrain generation with coherent zones
     */
    public List<List<Map<String, Object>>> generateTerrainZones(int width, int height, long seed) {
        Random random = new Random(seed);
        
        // Initialize empty map
        String[][] terrainMap = new String[height][width];
        boolean[][] occupied = new boolean[height][width];
        
        // Calculate target tile counts for each terrain
        int totalTiles = width * height;
        Map<String, Integer> targetCounts = TERRAIN_DISTRIBUTION.entrySet().stream()
            .collect(Collectors.toMap(
                Map.Entry::getKey,
                e -> (int) (totalTiles * e.getValue())
            ));
        
        // Generate zones for each terrain type
        List<TerrainZone> zones = new ArrayList<>();
        
        for (Map.Entry<String, Integer> entry : targetCounts.entrySet()) {
            String terrain = entry.getKey();
            int targetCount = entry.getValue();
            int minZoneSize = MIN_ZONE_SIZES.get(terrain);
            
            // Create multiple zones for this terrain type
            int remainingTiles = targetCount;
            int attempts = 0;
            
            while (remainingTiles > minZoneSize && attempts < 50) {
                // Find a suitable center point
                Position center = findSuitableCenter(width, height, occupied, random);
                if (center == null) {
                    attempts++;
                    continue;
                }
                
                // Determine zone size (between min and remaining)
                int maxSize = Math.min(remainingTiles, minZoneSize * 3);
                int zoneSize = random.nextInt(maxSize - minZoneSize + 1) + minZoneSize;
                
                // Create the zone using flood-fill
                TerrainZone zone = createZone(terrain, center, zoneSize, width, height, occupied, random);
                
                if (zone.size >= minZoneSize) {
                    zones.add(zone);
                    remainingTiles -= zone.size;
                    
                    // Mark tiles as occupied
                    for (Position pos : zone.tiles) {
                        terrainMap[pos.y][pos.x] = terrain;
                        occupied[pos.y][pos.x] = true;
                    }
                }
                
                attempts++;
            }
        }
        
        // Fill remaining empty tiles with grass
        for (int y = 0; y < height; y++) {
            for (int x = 0; x < width; x++) {
                if (terrainMap[y][x] == null) {
                    terrainMap[y][x] = "grass";
                }
            }
        }
        
        // Convert to game format with zone data
        return convertToGameFormat(terrainMap, zones, width, height);
    }
    
    /**
     * Find a suitable center point for a new zone
     */
    private Position findSuitableCenter(int width, int height, boolean[][] occupied, Random random) {
        for (int attempt = 0; attempt < 100; attempt++) {
            int x = random.nextInt(width);
            int y = random.nextInt(height);
            
            if (!occupied[y][x]) {
                // Check if there's enough space around this point
                int freeNeighbors = countFreeNeighbors(x, y, width, height, occupied);
                if (freeNeighbors >= 3) {
                    return new Position(x, y);
                }
            }
        }
        return null;
    }
    
    /**
     * Count free neighboring tiles
     */
    private int countFreeNeighbors(int x, int y, int width, int height, boolean[][] occupied) {
        int[] dx = {-1, -1, 0, 0, 1, 1};
        int[] dy = {-1, 0, -1, 1, 0, 1};
        
        int count = 0;
        for (int i = 0; i < 6; i++) {
            int nx = x + dx[i];
            int ny = y + dy[i];
            
            if (nx >= 0 && nx < width && ny >= 0 && ny < height && !occupied[ny][nx]) {
                count++;
            }
        }
        return count;
    }
    
    /**
     * Create a contiguous zone using flood-fill algorithm
     */
    private TerrainZone createZone(String terrain, Position center, int targetSize, 
                                   int width, int height, boolean[][] occupied, Random random) {
        TerrainZone zone = new TerrainZone(terrain, center.x, center.y);
        Queue<Position> queue = new LinkedList<>();
        Set<Position> visited = new HashSet<>();
        
        queue.offer(center);
        visited.add(center);
        
        while (!queue.isEmpty() && zone.size < targetSize) {
            Position current = queue.poll();
            
            if (occupied[current.y][current.x]) continue;
            
            // Add this tile to the zone
            zone.tiles.add(current);
            zone.size++;
            occupied[current.y][current.x] = true;
            
            // Add neighboring tiles to queue
            List<Position> neighbors = getHexNeighbors(current, width, height);
            Collections.shuffle(neighbors, random); // Randomize growth direction
            
            for (Position neighbor : neighbors) {
                if (!visited.contains(neighbor) && !occupied[neighbor.y][neighbor.x]) {
                    visited.add(neighbor);
                    queue.offer(neighbor);
                }
            }
        }
        
        return zone;
    }
    
    /**
     * Get hexagonal neighbors for a position
     */
    private List<Position> getHexNeighbors(Position pos, int width, int height) {
        List<Position> neighbors = new ArrayList<>();
        
        // Hexagonal grid neighbors (odd-q vertical layout)
        int[][] offsets = (pos.x % 2 == 0) ? 
            new int[][]{{-1, -1}, {0, -1}, {1, -1}, {-1, 0}, {1, 0}, {0, 1}} :
            new int[][]{{0, -1}, {-1, 0}, {1, 0}, {-1, 1}, {0, 1}, {1, 1}};
        
        for (int[] offset : offsets) {
            int nx = pos.x + offset[0];
            int ny = pos.y + offset[1];
            
            if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
                neighbors.add(new Position(nx, ny));
            }
        }
        
        return neighbors;
    }
    
    /**
     * Convert terrain map to game format with zone metadata
     */
    private List<List<Map<String, Object>>> convertToGameFormat(String[][] terrainMap, 
                                                               List<TerrainZone> zones, 
                                                               int width, int height) {
        List<List<Map<String, Object>>> gameMap = new ArrayList<>();
        
        // Create zone lookup for distance calculations
        Map<Position, TerrainZone> tileToZone = new HashMap<>();
        for (TerrainZone zone : zones) {
            for (Position pos : zone.tiles) {
                tileToZone.put(pos, zone);
            }
        }
        
        for (int y = 0; y < height; y++) {
            List<Map<String, Object>> row = new ArrayList<>();
            
            for (int x = 0; x < width; x++) {
                Map<String, Object> tile = new HashMap<>();
                tile.put("x", x);
                tile.put("y", y);
                tile.put("terrain", terrainMap[y][x]);
                tile.put("walkable", !terrainMap[y][x].equals("water"));
                tile.put("movementCost", getMovementCost(terrainMap[y][x]));
                tile.put("hero", null);
                tile.put("creature", null);
                tile.put("building", null);
                tile.put("resource", null);
                tile.put("structure", null);
                tile.put("explored", false);
                tile.put("visible", false);
                
                // Add zone metadata for sprite selection
                Position pos = new Position(x, y);
                TerrainZone zone = tileToZone.get(pos);
                if (zone != null) {
                    tile.put("zoneData", Map.of(
                        "biome", zone.terrain,
                        "size", zone.size,
                        "centerX", zone.centerX,
                        "centerY", zone.centerY,
                        "distanceToEdge", calculateDistanceToEdge(pos, zone)
                    ));
                }
                
                row.add(tile);
            }
            
            gameMap.add(row);
        }
        
        return gameMap;
    }
    
    /**
     * Calculate distance from tile to zone edge
     */
    private int calculateDistanceToEdge(Position pos, TerrainZone zone) {
        int minDistance = Integer.MAX_VALUE;
        
        for (Position zoneTile : zone.tiles) {
            int distance = Math.max(Math.abs(pos.x - zoneTile.x), Math.abs(pos.y - zoneTile.y));
            minDistance = Math.min(minDistance, distance);
        }
        
        return minDistance;
    }
    
    /**
     * Get movement cost for terrain type
     */
    private int getMovementCost(String terrain) {
        return switch (terrain) {
            case "grass" -> 100;
            case "forest" -> 200;
            case "mountain" -> 300;
            case "water" -> 999; // Impassable without ship
            case "desert" -> 200;
            case "swamp" -> 300;
            default -> 100;
        };
    }
    
    /**
     * Get neighboring terrain types for transition calculation
     */
    public List<String> getNeighboringTerrain(int x, int y, String[][] terrainMap) {
        List<String> neighbors = new ArrayList<>();
        List<Position> neighborPos = getHexNeighbors(new Position(x, y), 
                                                     terrainMap[0].length, 
                                                     terrainMap.length);
        
        for (Position pos : neighborPos) {
            if (pos.x >= 0 && pos.x < terrainMap[0].length && 
                pos.y >= 0 && pos.y < terrainMap.length) {
                neighbors.add(terrainMap[pos.y][pos.x]);
            }
        }
        
        return neighbors;
    }
} 