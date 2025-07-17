package com.heroesoftimeporal.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 🗺️ GameMap - Represents a 5D spacetime map with terrain, buildings, and temporal zones
 * 
 * 5D Structure:
 * - x, y: Standard map coordinates
 * - z: Vertical layers (underground=-1, ground=0, flying=1)
 * - timeline: Timeline branches (ℬ1, ℬ2, etc.)
 * - temporalLayer: Past/Present/Future layers
 */
public class GameMap {
    
    @JsonProperty("id")
    private String id;
    
    @JsonProperty("name")
    private String name;
    
    @JsonProperty("width")
    private int width;
    
    @JsonProperty("height")
    private int height;
    
    @JsonProperty("depth")
    private int depth;  // Z-axis layers
    
    @JsonProperty("timelines")
    private List<String> timelines = new ArrayList<>();
    
    @JsonProperty("temporalLayers")
    private List<Integer> temporalLayers = new ArrayList<>();
    
    // Terrain data: [x][y][z][timeline][temporalLayer]
    @JsonProperty("terrain")
    private Map<String, TerrainTile> terrain = new HashMap<>();
    
    // Buildings and structures
    @JsonProperty("buildings")
    private List<Building> buildings = new ArrayList<>();
    
    // Temporal zones and anomalies
    @JsonProperty("temporalZones")
    private List<TemporalZone> temporalZones = new ArrayList<>();
    
    // Nexus points for timeline convergence
    @JsonProperty("nexusPoints")
    private List<NexusPoint> nexusPoints = new ArrayList<>();
    
    @JsonProperty("createdAt")
    private LocalDateTime createdAt;
    
    // Terrain Types
    public enum TerrainType {
        GRASS, FOREST, MOUNTAIN, WATER, DESERT, SWAMP, VOID, TEMPORAL_RIFT
    }
    
    // Terrain Tile
    public static class TerrainTile {
        @JsonProperty("type")
        private TerrainType type;
        
        @JsonProperty("movementCost")
        private int movementCost;
        
        @JsonProperty("defensiveBonus")
        private double defensiveBonus;
        
        @JsonProperty("temporalStability")
        private double temporalStability;
        
        @JsonProperty("passable")
        private boolean passable;
        
        public TerrainTile(TerrainType type) {
            this.type = type;
            switch (type) {
                case GRASS:
                    this.movementCost = 1;
                    this.defensiveBonus = 0.0;
                    this.temporalStability = 1.0;
                    this.passable = true;
                    break;
                case FOREST:
                    this.movementCost = 2;
                    this.defensiveBonus = 0.2;
                    this.temporalStability = 0.9;
                    this.passable = true;
                    break;
                case MOUNTAIN:
                    this.movementCost = 3;
                    this.defensiveBonus = 0.4;
                    this.temporalStability = 1.2;
                    this.passable = true;
                    break;
                case WATER:
                    this.movementCost = 2;
                    this.defensiveBonus = -0.1;
                    this.temporalStability = 0.8;
                    this.passable = false;  // Unless flying
                    break;
                case DESERT:
                    this.movementCost = 2;
                    this.defensiveBonus = -0.2;
                    this.temporalStability = 0.7;
                    this.passable = true;
                    break;
                case SWAMP:
                    this.movementCost = 3;
                    this.defensiveBonus = -0.3;
                    this.temporalStability = 0.6;
                    this.passable = true;
                    break;
                case VOID:
                    this.movementCost = Integer.MAX_VALUE;
                    this.defensiveBonus = 0.0;
                    this.temporalStability = 0.0;
                    this.passable = false;
                    break;
                case TEMPORAL_RIFT:
                    this.movementCost = 1;
                    this.defensiveBonus = 0.0;
                    this.temporalStability = 0.3;
                    this.passable = true;
                    break;
            }
        }
        
        // Getters and setters
        public TerrainType getType() { return type; }
        public void setType(TerrainType type) { this.type = type; }
        
        public int getMovementCost() { return movementCost; }
        public void setMovementCost(int movementCost) { this.movementCost = movementCost; }
        
        public double getDefensiveBonus() { return defensiveBonus; }
        public void setDefensiveBonus(double defensiveBonus) { this.defensiveBonus = defensiveBonus; }
        
        public double getTemporalStability() { return temporalStability; }
        public void setTemporalStability(double temporalStability) { this.temporalStability = temporalStability; }
        
        public boolean isPassable() { return passable; }
        public void setPassable(boolean passable) { this.passable = passable; }
    }
    
    // Building
    public static class Building {
        @JsonProperty("id")
        private String id;
        
        @JsonProperty("type")
        private BuildingType type;
        
        @JsonProperty("x")
        private int x;
        
        @JsonProperty("y")
        private int y;
        
        @JsonProperty("z")
        private int z;
        
        @JsonProperty("timeline")
        private String timeline;
        
        @JsonProperty("temporalLayer")
        private int temporalLayer;
        
        @JsonProperty("ownerId")
        private String ownerId;
        
        @JsonProperty("health")
        private int health;
        
        @JsonProperty("maxHealth")
        private int maxHealth;
        
        public enum BuildingType {
            CASTLE, TOWER, MINE, TEMPLE, TEMPORAL_ANCHOR, NEXUS_GATE
        }
        
        public Building(String id, BuildingType type, int x, int y, int z, String timeline, int temporalLayer) {
            this.id = id;
            this.type = type;
            this.x = x;
            this.y = y;
            this.z = z;
            this.timeline = timeline;
            this.temporalLayer = temporalLayer;
            
            switch (type) {
                case CASTLE:
                    this.health = 1000;
                    this.maxHealth = 1000;
                    break;
                case TOWER:
                    this.health = 500;
                    this.maxHealth = 500;
                    break;
                case MINE:
                    this.health = 200;
                    this.maxHealth = 200;
                    break;
                case TEMPLE:
                    this.health = 300;
                    this.maxHealth = 300;
                    break;
                case TEMPORAL_ANCHOR:
                    this.health = 800;
                    this.maxHealth = 800;
                    break;
                case NEXUS_GATE:
                    this.health = 1500;
                    this.maxHealth = 1500;
                    break;
            }
        }
        
        public String get5DPosition() {
            return String.format("(%d,%d,%d,%s,%d)", x, y, z, timeline, temporalLayer);
        }
        
        // Getters and setters
        public String getId() { return id; }
        public void setId(String id) { this.id = id; }
        
        public BuildingType getType() { return type; }
        public void setType(BuildingType type) { this.type = type; }
        
        public int getX() { return x; }
        public void setX(int x) { this.x = x; }
        
        public int getY() { return y; }
        public void setY(int y) { this.y = y; }
        
        public int getZ() { return z; }
        public void setZ(int z) { this.z = z; }
        
        public String getTimeline() { return timeline; }
        public void setTimeline(String timeline) { this.timeline = timeline; }
        
        public int getTemporalLayer() { return temporalLayer; }
        public void setTemporalLayer(int temporalLayer) { this.temporalLayer = temporalLayer; }
        
        public String getOwnerId() { return ownerId; }
        public void setOwnerId(String ownerId) { this.ownerId = ownerId; }
        
        public int getHealth() { return health; }
        public void setHealth(int health) { this.health = health; }
        
        public int getMaxHealth() { return maxHealth; }
        public void setMaxHealth(int maxHealth) { this.maxHealth = maxHealth; }
    }
    
    // Temporal Zone
    public static class TemporalZone {
        @JsonProperty("id")
        private String id;
        
        @JsonProperty("type")
        private ZoneType type;
        
        @JsonProperty("centerX")
        private int centerX;
        
        @JsonProperty("centerY")
        private int centerY;
        
        @JsonProperty("radius")
        private int radius;
        
        @JsonProperty("timeline")
        private String timeline;
        
        @JsonProperty("temporalLayer")
        private int temporalLayer;
        
        @JsonProperty("intensity")
        private double intensity;
        
        @JsonProperty("duration")
        private int duration;  // Turns remaining
        
        public enum ZoneType {
            TEMPORAL_STORM,     // Reduces ψ-state probability
            CHRONOS_FIELD,      // Increases temporal energy regeneration
            PARADOX_VORTEX,     // Causes random timeline switches
            STABILITY_ANCHOR,   // Prevents temporal manipulation
            TIME_DILATION       // Affects movement speed
        }
        
        public TemporalZone(String id, ZoneType type, int centerX, int centerY, int radius, String timeline, int temporalLayer) {
            this.id = id;
            this.type = type;
            this.centerX = centerX;
            this.centerY = centerY;
            this.radius = radius;
            this.timeline = timeline;
            this.temporalLayer = temporalLayer;
            this.intensity = 1.0;
            this.duration = 10;  // Default 10 turns
        }
        
        public boolean contains(int x, int y) {
            double distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
            return distance <= radius;
        }
        
        // Getters and setters
        public String getId() { return id; }
        public void setId(String id) { this.id = id; }
        
        public ZoneType getType() { return type; }
        public void setType(ZoneType type) { this.type = type; }
        
        public int getCenterX() { return centerX; }
        public void setCenterX(int centerX) { this.centerX = centerX; }
        
        public int getCenterY() { return centerY; }
        public void setCenterY(int centerY) { this.centerY = centerY; }
        
        public int getRadius() { return radius; }
        public void setRadius(int radius) { this.radius = radius; }
        
        public String getTimeline() { return timeline; }
        public void setTimeline(String timeline) { this.timeline = timeline; }
        
        public int getTemporalLayer() { return temporalLayer; }
        public void setTemporalLayer(int temporalLayer) { this.temporalLayer = temporalLayer; }
        
        public double getIntensity() { return intensity; }
        public void setIntensity(double intensity) { this.intensity = intensity; }
        
        public int getDuration() { return duration; }
        public void setDuration(int duration) { this.duration = duration; }
    }
    
    // Nexus Point
    public static class NexusPoint {
        @JsonProperty("id")
        private String id;
        
        @JsonProperty("x")
        private int x;
        
        @JsonProperty("y")
        private int y;
        
        @JsonProperty("connectedTimelines")
        private List<String> connectedTimelines = new ArrayList<>();
        
        @JsonProperty("stabilityLevel")
        private double stabilityLevel;
        
        @JsonProperty("active")
        private boolean active;
        
        public NexusPoint(String id, int x, int y) {
            this.id = id;
            this.x = x;
            this.y = y;
            this.stabilityLevel = 1.0;
            this.active = true;
        }
        
        // Getters and setters
        public String getId() { return id; }
        public void setId(String id) { this.id = id; }
        
        public int getX() { return x; }
        public void setX(int x) { this.x = x; }
        
        public int getY() { return y; }
        public void setY(int y) { this.y = y; }
        
        public List<String> getConnectedTimelines() { return connectedTimelines; }
        public void setConnectedTimelines(List<String> connectedTimelines) { this.connectedTimelines = connectedTimelines; }
        
        public double getStabilityLevel() { return stabilityLevel; }
        public void setStabilityLevel(double stabilityLevel) { this.stabilityLevel = stabilityLevel; }
        
        public boolean isActive() { return active; }
        public void setActive(boolean active) { this.active = active; }
    }
    
    // Constructors
    public GameMap() {
        this.createdAt = LocalDateTime.now();
        this.timelines = new ArrayList<>();
        this.temporalLayers = new ArrayList<>();
        this.terrain = new HashMap<>();
        this.buildings = new ArrayList<>();
        this.temporalZones = new ArrayList<>();
        this.nexusPoints = new ArrayList<>();
    }
    
    public GameMap(String id, String name, int width, int height, int depth) {
        this();
        this.id = id;
        this.name = name;
        this.width = width;
        this.height = height;
        this.depth = depth;
        
        // Initialize default timelines and temporal layers
        this.timelines.add("ℬ1");
        this.temporalLayers.add(0);  // Present
        
        // Initialize terrain
        initializeTerrain();
    }
    
    // Map Methods
    private void initializeTerrain() {
        for (int x = 0; x < width; x++) {
            for (int y = 0; y < height; y++) {
                for (int z = -1; z <= 1; z++) {  // Underground, ground, flying
                    for (String timeline : timelines) {
                        for (int temporalLayer : temporalLayers) {
                            String key = getTerrainKey(x, y, z, timeline, temporalLayer);
                            terrain.put(key, new TerrainTile(TerrainType.GRASS));
                        }
                    }
                }
            }
        }
    }
    
    private String getTerrainKey(int x, int y, int z, String timeline, int temporalLayer) {
        return String.format("%d,%d,%d,%s,%d", x, y, z, timeline, temporalLayer);
    }
    
    public TerrainTile getTerrainAt(int x, int y, int z, String timeline, int temporalLayer) {
        String key = getTerrainKey(x, y, z, timeline, temporalLayer);
        return terrain.get(key);
    }
    
    public void setTerrainAt(int x, int y, int z, String timeline, int temporalLayer, TerrainTile tile) {
        String key = getTerrainKey(x, y, z, timeline, temporalLayer);
        terrain.put(key, tile);
    }
    
    public boolean isValidPosition(int x, int y, int z, String timeline, int temporalLayer) {
        return x >= 0 && x < width && 
               y >= 0 && y < height && 
               z >= -1 && z <= 1 &&
               timelines.contains(timeline) &&
               temporalLayers.contains(temporalLayer);
    }
    
    public boolean isPassable(int x, int y, int z, String timeline, int temporalLayer) {
        if (!isValidPosition(x, y, z, timeline, temporalLayer)) {
            return false;
        }
        
        TerrainTile tile = getTerrainAt(x, y, z, timeline, temporalLayer);
        return tile != null && tile.isPassable();
    }
    
    public int getMovementCost(int x, int y, int z, String timeline, int temporalLayer) {
        TerrainTile tile = getTerrainAt(x, y, z, timeline, temporalLayer);
        return tile != null ? tile.getMovementCost() : Integer.MAX_VALUE;
    }
    
    public double getTemporalStability(int x, int y, int z, String timeline, int temporalLayer) {
        TerrainTile tile = getTerrainAt(x, y, z, timeline, temporalLayer);
        double baseStability = tile != null ? tile.getTemporalStability() : 0.0;
        
        // Check for temporal zones
        for (TemporalZone zone : temporalZones) {
            if (zone.getTimeline().equals(timeline) && 
                zone.getTemporalLayer() == temporalLayer &&
                zone.contains(x, y)) {
                
                switch (zone.getType()) {
                    case TEMPORAL_STORM:
                        baseStability *= (1.0 - zone.getIntensity() * 0.3);
                        break;
                    case STABILITY_ANCHOR:
                        baseStability *= (1.0 + zone.getIntensity() * 0.5);
                        break;
                    case PARADOX_VORTEX:
                        baseStability *= (1.0 - zone.getIntensity() * 0.5);
                        break;
                }
            }
        }
        
        return Math.max(0.0, Math.min(2.0, baseStability));
    }
    
    // Building Methods
    public void addBuilding(Building building) {
        buildings.add(building);
    }
    
    public void removeBuilding(String buildingId) {
        buildings.removeIf(b -> b.getId().equals(buildingId));
    }
    
    public Building getBuildingAt(int x, int y, int z, String timeline, int temporalLayer) {
        return buildings.stream()
                .filter(b -> b.getX() == x && b.getY() == y && b.getZ() == z &&
                           b.getTimeline().equals(timeline) && b.getTemporalLayer() == temporalLayer)
                .findFirst()
                .orElse(null);
    }
    
    // Temporal Zone Methods
    public void addTemporalZone(TemporalZone zone) {
        temporalZones.add(zone);
    }
    
    public void removeTemporalZone(String zoneId) {
        temporalZones.removeIf(z -> z.getId().equals(zoneId));
    }
    
    public List<TemporalZone> getTemporalZonesAt(int x, int y, String timeline, int temporalLayer) {
        return temporalZones.stream()
                .filter(z -> z.getTimeline().equals(timeline) && 
                           z.getTemporalLayer() == temporalLayer &&
                           z.contains(x, y))
                .toList();
    }
    
    // Timeline Methods
    public void addTimeline(String timeline) {
        if (!timelines.contains(timeline)) {
            timelines.add(timeline);
            expandTerrainForTimeline(timeline);
        }
    }
    
    private void expandTerrainForTimeline(String timeline) {
        for (int x = 0; x < width; x++) {
            for (int y = 0; y < height; y++) {
                for (int z = -1; z <= 1; z++) {
                    for (int temporalLayer : temporalLayers) {
                        String key = getTerrainKey(x, y, z, timeline, temporalLayer);
                        terrain.put(key, new TerrainTile(TerrainType.GRASS));
                    }
                }
            }
        }
    }
    
    public void addTemporalLayer(int temporalLayer) {
        if (!temporalLayers.contains(temporalLayer)) {
            temporalLayers.add(temporalLayer);
            expandTerrainForTemporalLayer(temporalLayer);
        }
    }
    
    private void expandTerrainForTemporalLayer(int temporalLayer) {
        for (int x = 0; x < width; x++) {
            for (int y = 0; y < height; y++) {
                for (int z = -1; z <= 1; z++) {
                    for (String timeline : timelines) {
                        String key = getTerrainKey(x, y, z, timeline, temporalLayer);
                        terrain.put(key, new TerrainTile(TerrainType.GRASS));
                    }
                }
            }
        }
    }
    
    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public int getWidth() { return width; }
    public void setWidth(int width) { this.width = width; }
    
    public int getHeight() { return height; }
    public void setHeight(int height) { this.height = height; }
    
    public int getDepth() { return depth; }
    public void setDepth(int depth) { this.depth = depth; }
    
    public List<String> getTimelines() { return timelines; }
    public void setTimelines(List<String> timelines) { this.timelines = timelines; }
    
    public List<Integer> getTemporalLayers() { return temporalLayers; }
    public void setTemporalLayers(List<Integer> temporalLayers) { this.temporalLayers = temporalLayers; }
    
    public Map<String, TerrainTile> getTerrain() { return terrain; }
    public void setTerrain(Map<String, TerrainTile> terrain) { this.terrain = terrain; }
    
    public List<Building> getBuildings() { return buildings; }
    public void setBuildings(List<Building> buildings) { this.buildings = buildings; }
    
    public List<TemporalZone> getTemporalZones() { return temporalZones; }
    public void setTemporalZones(List<TemporalZone> temporalZones) { this.temporalZones = temporalZones; }
    
    public List<NexusPoint> getNexusPoints() { return nexusPoints; }
    public void setNexusPoints(List<NexusPoint> nexusPoints) { this.nexusPoints = nexusPoints; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    @Override
    public String toString() {
        return String.format("GameMap{id='%s', name='%s', dimensions=%dx%dx%d, timelines=%d, temporalLayers=%d}", 
                           id, name, width, height, depth, timelines.size(), temporalLayers.size());
    }
}