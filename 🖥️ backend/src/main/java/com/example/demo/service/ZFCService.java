package com.example.demo.service;

import com.example.demo.model.Position;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class ZFCService {
    
    public static class ZoneOfCausality {
        private String playerId;
        private int radius;
        private Position center;
        private boolean includesTeleport;
        private int validUntil;
        private List<Position> reachableTiles;
        private List<Position> conflictZones;
        private double temporalStability;
        private Map<String, Object> metadata;
        
        public ZoneOfCausality() {}
        
        public ZoneOfCausality(String playerId, int radius, Position center, boolean includesTeleport, 
                              int validUntil, List<Position> reachableTiles, List<Position> conflictZones,
                              double temporalStability, Map<String, Object> metadata) {
            this.playerId = playerId;
            this.radius = radius;
            this.center = center;
            this.includesTeleport = includesTeleport;
            this.validUntil = validUntil;
            this.reachableTiles = reachableTiles;
            this.conflictZones = conflictZones;
            this.temporalStability = temporalStability;
            this.metadata = metadata;
        }
        
        // Getters and setters
        public String getPlayerId() { return playerId; }
        public void setPlayerId(String playerId) { this.playerId = playerId; }
        
        public int getRadius() { return radius; }
        public void setRadius(int radius) { this.radius = radius; }
        
        public Position getCenter() { return center; }
        public void setCenter(Position center) { this.center = center; }
        
        public boolean isIncludesTeleport() { return includesTeleport; }
        public void setIncludesTeleport(boolean includesTeleport) { this.includesTeleport = includesTeleport; }
        
        public int getValidUntil() { return validUntil; }
        public void setValidUntil(int validUntil) { this.validUntil = validUntil; }
        
        public List<Position> getReachableTiles() { return reachableTiles; }
        public void setReachableTiles(List<Position> reachableTiles) { this.reachableTiles = reachableTiles; }
        
        public List<Position> getConflictZones() { return conflictZones; }
        public void setConflictZones(List<Position> conflictZones) { this.conflictZones = conflictZones; }
        
        public double getTemporalStability() { return temporalStability; }
        public void setTemporalStability(double temporalStability) { this.temporalStability = temporalStability; }
        
        public Map<String, Object> getMetadata() { return metadata; }
        public void setMetadata(Map<String, Object> metadata) { this.metadata = metadata; }
    }
    
    public static class ShadowAction {
        private String actionId;
        private String type;
        private Position position;
        private double opacity;
        private String playerId;
        private String heroId;
        private Map<String, Object> parameters;
        private long timestamp;
        private String status;
        
        public ShadowAction() {}
        
        public ShadowAction(String actionId, String type, Position position, double opacity, String playerId, 
                           String heroId, Map<String, Object> parameters, long timestamp, String status) {
            this.actionId = actionId;
            this.type = type;
            this.position = position;
            this.opacity = opacity;
            this.playerId = playerId;
            this.heroId = heroId;
            this.parameters = parameters;
            this.timestamp = timestamp;
            this.status = status;
        }
        
        // Getters and setters
        public String getActionId() { return actionId; }
        public void setActionId(String actionId) { this.actionId = actionId; }
        
        public String getType() { return type; }
        public void setType(String type) { this.type = type; }
        
        public Position getPosition() { return position; }
        public void setPosition(Position position) { this.position = position; }
        
        public double getOpacity() { return opacity; }
        public void setOpacity(double opacity) { this.opacity = opacity; }
        
        public String getPlayerId() { return playerId; }
        public void setPlayerId(String playerId) { this.playerId = playerId; }
        
        public String getHeroId() { return heroId; }
        public void setHeroId(String heroId) { this.heroId = heroId; }
        
        public Map<String, Object> getParameters() { return parameters; }
        public void setParameters(Map<String, Object> parameters) { this.parameters = parameters; }
        
        public long getTimestamp() { return timestamp; }
        public void setTimestamp(long timestamp) { this.timestamp = timestamp; }
        
        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }
    }
    
    public static class TimelineAction {
        private String id;
        private int turn;
        private String playerId;
        private Map<String, Object> action;
        private String status;
        private ZoneOfCausality zfc;
        private String originTimestamp;
        private boolean shadowVisible;
        private double zfcCost;
        private Map<String, Object> metadata;
        
        public TimelineAction() {}
        
        // Getters and setters
        public String getId() { return id; }
        public void setId(String id) { this.id = id; }
        
        public int getTurn() { return turn; }
        public void setTurn(int turn) { this.turn = turn; }
        
        public String getPlayerId() { return playerId; }
        public void setPlayerId(String playerId) { this.playerId = playerId; }
        
        public Map<String, Object> getAction() { return action; }
        public void setAction(Map<String, Object> action) { this.action = action; }
        
        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }
        
        public ZoneOfCausality getZfc() { return zfc; }
        public void setZfc(ZoneOfCausality zfc) { this.zfc = zfc; }
        
        public String getOriginTimestamp() { return originTimestamp; }
        public void setOriginTimestamp(String originTimestamp) { this.originTimestamp = originTimestamp; }
        
        public boolean isShadowVisible() { return shadowVisible; }
        public void setShadowVisible(boolean shadowVisible) { this.shadowVisible = shadowVisible; }
        
        public double getZfcCost() { return zfcCost; }
        public void setZfcCost(double zfcCost) { this.zfcCost = zfcCost; }
        
        public Map<String, Object> getMetadata() { return metadata; }
        public void setMetadata(Map<String, Object> metadata) { this.metadata = metadata; }
    }
    
    public static class Tile {
        private int x;
        private int y;
        private String terrain;
        private boolean walkable;
        private int movementCost;
        private String hero;
        private String creature;
        private Map<String, Object> metadata;
        
        public Tile() {}
        
        public Tile(int x, int y, String terrain, boolean walkable, int movementCost, String hero, String creature) {
            this.x = x;
            this.y = y;
            this.terrain = terrain;
            this.walkable = walkable;
            this.movementCost = movementCost;
            this.hero = hero;
            this.creature = creature;
            this.metadata = new HashMap<>();
        }
        
        // Getters and setters
        public int getX() { return x; }
        public void setX(int x) { this.x = x; }
        
        public int getY() { return y; }
        public void setY(int y) { this.y = y; }
        
        public String getTerrain() { return terrain; }
        public void setTerrain(String terrain) { this.terrain = terrain; }
        
        public boolean isWalkable() { return walkable; }
        public void setWalkable(boolean walkable) { this.walkable = walkable; }
        
        public int getMovementCost() { return movementCost; }
        public void setMovementCost(int movementCost) { this.movementCost = movementCost; }
        
        public String getHero() { return hero; }
        public void setHero(String hero) { this.hero = hero; }
        
        public String getCreature() { return creature; }
        public void setCreature(String creature) { this.creature = creature; }
        
        public Map<String, Object> getMetadata() { return metadata; }
        public void setMetadata(Map<String, Object> metadata) { this.metadata = metadata; }
    }
    
    public static class Hero {
        private String id;
        private String name;
        private Position position;
        private int level;
        private int movementPoints;
        private int maxMovementPoints;
        private String playerId;
        private Map<String, Object> stats;
        private Map<String, Object> temporalAttributes;
        
        public Hero() {}
        
        // Getters and setters
        public String getId() { return id; }
        public void setId(String id) { this.id = id; }
        
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        
        public Position getPosition() { return position; }
        public void setPosition(Position position) { this.position = position; }
        
        public int getLevel() { return level; }
        public void setLevel(int level) { this.level = level; }
        
        public int getMovementPoints() { return movementPoints; }
        public void setMovementPoints(int movementPoints) { this.movementPoints = movementPoints; }
        
        public int getMaxMovementPoints() { return maxMovementPoints; }
        public void setMaxMovementPoints(int maxMovementPoints) { this.maxMovementPoints = maxMovementPoints; }
        
        public String getPlayerId() { return playerId; }
        public void setPlayerId(String playerId) { this.playerId = playerId; }
        
        public Map<String, Object> getStats() { return stats; }
        public void setStats(Map<String, Object> stats) { this.stats = stats; }
        
        public Map<String, Object> getTemporalAttributes() { return temporalAttributes; }
        public void setTemporalAttributes(Map<String, Object> temporalAttributes) { this.temporalAttributes = temporalAttributes; }
    }
    
    /**
     * Calculate Zone of Temporal Causality for a hero
     */
    public ZoneOfCausality calculateZFC(String playerId, String heroId, Hero hero, Tile[][] map, int currentTurn) {
        if (hero == null || map == null || map.length == 0) {
            return new ZoneOfCausality(playerId, 0, new Position(0, 0), false, 0, 
                new ArrayList<>(), new ArrayList<>(), 0.0, new HashMap<>());
        }
        
        List<Position> reachableTiles = new ArrayList<>();
        List<Position> conflictZones = new ArrayList<>();
        int radius = hero.getMovementPoints();
        Position center = hero.getPosition();
        
        // Calculate reachable tiles using pathfinding algorithm
        reachableTiles = calculateReachableTiles(center, radius, map);
        
        // Calculate conflict zones (areas where multiple ZFCs overlap)
        conflictZones = calculateConflictZones(reachableTiles, playerId, map);
        
        // Calculate temporal stability
        double temporalStability = calculateTemporalStability(hero, reachableTiles, map);
        
        // Check for teleportation abilities
        boolean includesTeleport = hasTemporalTeleportAbility(hero);
        if (includesTeleport) {
            reachableTiles.addAll(calculateTeleportTiles(hero, map));
        }
        
        // Add metadata
        Map<String, Object> metadata = new HashMap<>();
        metadata.put("heroLevel", hero.getLevel());
        metadata.put("calculatedAt", System.currentTimeMillis());
        metadata.put("algorithm", "advanced_pathfinding");
        metadata.put("temporalEnhancements", includesTeleport);
        
        return new ZoneOfCausality(playerId, radius, center, includesTeleport, currentTurn + 1, 
            reachableTiles, conflictZones, temporalStability, metadata);
    }
    
    /**
     * Calculate movement cost with ZFC temporal effects
     */
    public double calculateZFCMovementCost(Position from, Position to, Hero hero, Tile[][] map) {
        if (from == null || to == null || hero == null || map == null) {
            return Double.MAX_VALUE;
        }
        
        // Base movement cost
        double baseCost = calculateManhattanDistance(from, to);
        
        // Terrain modifiers
        double terrainModifier = getTerrainModifier(to, map);
        
        // Temporal modifiers based on hero's temporal attributes
        double temporalModifier = getTemporalModifier(hero, to, map);
        
        // ZFC stability modifier
        double stabilityModifier = getZFCStabilityModifier(from, to, hero, map);
        
        return baseCost * terrainModifier * temporalModifier * stabilityModifier;
    }
    
    /**
     * Validate if an action is possible within ZFC constraints
     */
    public boolean validateActionInZFC(String actionType, String heroId, Position targetPosition, 
                                      ZoneOfCausality zfc, Tile[][] map) {
        if (zfc == null || targetPosition == null) {
            return false;
        }
        
        // Check if target position is within ZFC
        boolean withinZFC = zfc.getReachableTiles().stream()
            .anyMatch(tile -> tile.getX() == targetPosition.getX() && tile.getY() == targetPosition.getY());
        
        if (!withinZFC) {
            return false;
        }
        
        // Check action-specific constraints
        switch (actionType) {
            case "move":
                return validateMoveAction(targetPosition, zfc, map);
            case "attack":
                return validateAttackAction(targetPosition, zfc, map);
            case "collect":
                return validateCollectAction(targetPosition, zfc, map);
            case "cast_spell":
                return validateSpellAction(targetPosition, zfc, map);
            default:
                return false;
        }
    }
    
    /**
     * Generate shadow actions for temporal preview
     */
    public List<ShadowAction> generateShadowActions(List<TimelineAction> pendingActions, int currentTurn) {
        List<ShadowAction> shadowActions = new ArrayList<>();
        
        for (TimelineAction action : pendingActions) {
            if (action.isShadowVisible() && "PENDING".equals(action.getStatus())) {
                Position shadowPosition = extractPositionFromAction(action);
                double opacity = calculateShadowOpacity(action, currentTurn);
                
                ShadowAction shadow = new ShadowAction(
                    action.getId(),
                    (String) action.getAction().get("type"),
                    shadowPosition,
                    opacity,
                    action.getPlayerId(),
                    (String) action.getAction().get("heroId"),
                    action.getAction(),
                    System.currentTimeMillis(),
                    "SHADOW"
                );
                
                shadowActions.add(shadow);
            }
        }
        
        return shadowActions;
    }
    
    /**
     * Calculate temporal interference between ZFCs
     */
    public Map<String, Object> calculateTemporalInterference(List<ZoneOfCausality> activeZFCs) {
        Map<String, Object> interference = new HashMap<>();
        List<Position> overlapZones = new ArrayList<>();
        double totalInterference = 0.0;
        
        // Find overlapping zones
        for (int i = 0; i < activeZFCs.size(); i++) {
            for (int j = i + 1; j < activeZFCs.size(); j++) {
                ZoneOfCausality zfc1 = activeZFCs.get(i);
                ZoneOfCausality zfc2 = activeZFCs.get(j);
                
                List<Position> overlap = findZFCOverlap(zfc1, zfc2);
                overlapZones.addAll(overlap);
                
                // Calculate interference strength
                double distance = calculateManhattanDistance(zfc1.getCenter(), zfc2.getCenter());
                double interferenceStrength = Math.max(0, 1.0 - (distance / 10.0));
                totalInterference += interferenceStrength;
            }
        }
        
        interference.put("overlapZones", overlapZones);
        interference.put("totalInterference", totalInterference);
        interference.put("stabilityReduction", Math.min(0.5, totalInterference * 0.1));
        
        return interference;
    }
    
    // Private helper methods
    
    private List<Position> calculateReachableTiles(Position center, int radius, Tile[][] map) {
        List<Position> reachable = new ArrayList<>();
        
        for (int y = Math.max(0, center.getY() - radius); y <= Math.min(map.length - 1, center.getY() + radius); y++) {
            for (int x = Math.max(0, center.getX() - radius); x <= Math.min(map[0].length - 1, center.getX() + radius); x++) {
                int distance = Math.abs(x - center.getX()) + Math.abs(y - center.getY());
                if (distance <= radius && map[y][x].isWalkable()) {
                    reachable.add(new Position(x, y));
                }
            }
        }
        
        return reachable;
    }
    
    private List<Position> calculateConflictZones(List<Position> reachableTiles, String playerId, Tile[][] map) {
        List<Position> conflicts = new ArrayList<>();
        
        // For now, return empty list - would need to compare with other players' ZFCs
        // This would be implemented with actual game state
        
        return conflicts;
    }
    
    private double calculateTemporalStability(Hero hero, List<Position> reachableTiles, Tile[][] map) {
        double baseStability = 0.8;
        
        // Reduce stability based on ZFC size
        double sizeReduction = Math.min(0.3, reachableTiles.size() * 0.01);
        
        // Increase stability based on hero level
        double levelBonus = Math.min(0.2, hero.getLevel() * 0.02);
        
        return Math.max(0.1, baseStability - sizeReduction + levelBonus);
    }
    
    private boolean hasTemporalTeleportAbility(Hero hero) {
        Map<String, Object> temporalAttrs = hero.getTemporalAttributes();
        if (temporalAttrs == null) return false;
        
        return temporalAttrs.containsKey("teleport") && (Boolean) temporalAttrs.get("teleport");
    }
    
    private List<Position> calculateTeleportTiles(Hero hero, Tile[][] map) {
        List<Position> teleportTiles = new ArrayList<>();
        
        // Add some random teleport locations based on hero's temporal power
        int teleportRange = hero.getLevel() * 2;
        Position heroPos = hero.getPosition();
        
        for (int i = 0; i < 3; i++) {
            int x = heroPos.getX() + (int) (Math.random() * teleportRange * 2) - teleportRange;
            int y = heroPos.getY() + (int) (Math.random() * teleportRange * 2) - teleportRange;
            
            if (x >= 0 && x < map[0].length && y >= 0 && y < map.length && map[y][x].isWalkable()) {
                teleportTiles.add(new Position(x, y));
            }
        }
        
        return teleportTiles;
    }
    
    private double calculateManhattanDistance(Position from, Position to) {
        return Math.abs(from.getX() - to.getX()) + Math.abs(from.getY() - to.getY());
    }
    
    private double getTerrainModifier(Position position, Tile[][] map) {
        if (position.getY() >= 0 && position.getY() < map.length && 
            position.getX() >= 0 && position.getX() < map[0].length) {
            
            Tile tile = map[position.getY()][position.getX()];
            return tile.getMovementCost();
        }
        return 1.0;
    }
    
    private double getTemporalModifier(Hero hero, Position position, Tile[][] map) {
        Map<String, Object> temporalAttrs = hero.getTemporalAttributes();
        if (temporalAttrs == null) return 1.0;
        
        // Heroes with temporal attributes move more efficiently
        if (temporalAttrs.containsKey("temporalMastery")) {
            return 0.8; // 20% movement bonus
        }
        
        return 1.0;
    }
    
    private double getZFCStabilityModifier(Position from, Position to, Hero hero, Tile[][] map) {
        double distance = calculateManhattanDistance(from, to);
        
        // Longer distances are more costly in ZFC
        return 1.0 + (distance * 0.1);
    }
    
    private boolean validateMoveAction(Position targetPosition, ZoneOfCausality zfc, Tile[][] map) {
        return map[targetPosition.getY()][targetPosition.getX()].isWalkable();
    }
    
    private boolean validateAttackAction(Position targetPosition, ZoneOfCausality zfc, Tile[][] map) {
        Tile tile = map[targetPosition.getY()][targetPosition.getX()];
        return tile.getCreature() != null || tile.getHero() != null;
    }
    
    private boolean validateCollectAction(Position targetPosition, ZoneOfCausality zfc, Tile[][] map) {
        // Check if there's a collectible object at the position
        return true; // Simplified for now
    }
    
    private boolean validateSpellAction(Position targetPosition, ZoneOfCausality zfc, Tile[][] map) {
        // Spells have different range and targeting rules
        return true; // Simplified for now
    }
    
    private Position extractPositionFromAction(TimelineAction action) {
        Map<String, Object> actionData = action.getAction();
        if (actionData.containsKey("targetPosition")) {
            @SuppressWarnings("unchecked")
            Map<String, Object> pos = (Map<String, Object>) actionData.get("targetPosition");
            return new Position((Integer) pos.get("x"), (Integer) pos.get("y"));
        }
        return action.getZfc().getCenter();
    }
    
    private double calculateShadowOpacity(TimelineAction action, int currentTurn) {
        int turnDifference = action.getTurn() - currentTurn;
        return Math.max(0.2, 1.0 - (turnDifference * 0.2));
    }
    
    private List<Position> findZFCOverlap(ZoneOfCausality zfc1, ZoneOfCausality zfc2) {
        List<Position> overlap = new ArrayList<>();
        
        for (Position pos1 : zfc1.getReachableTiles()) {
            for (Position pos2 : zfc2.getReachableTiles()) {
                if (pos1.getX() == pos2.getX() && pos1.getY() == pos2.getY()) {
                    overlap.add(pos1);
                }
            }
        }
        
        return overlap;
    }
} 