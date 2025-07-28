package com.example.demo.controller;

import com.example.demo.service.ZFCService;
import com.example.demo.service.ZFCService.ZoneOfCausality;
import com.example.demo.service.ZFCService.ShadowAction;
import com.example.demo.service.ZFCService.TimelineAction;
import com.example.demo.service.ZFCService.Hero;
import com.example.demo.service.ZFCService.Tile;
import com.example.demo.model.Position;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/zfc")
@CrossOrigin(origins = "*")
public class ZFCController {

    @Autowired
    private ZFCService zfcService;

    /**
     * Calculate ZFC for a hero
     */
    @PostMapping("/calculate")
    public ResponseEntity<ZoneOfCausality> calculateZFC(@RequestBody Map<String, Object> request) {
        try {
            String playerId = (String) request.get("playerId");
            String heroId = (String) request.get("heroId");
            @SuppressWarnings("unchecked")
            Map<String, Object> heroData = (Map<String, Object>) request.get("hero");
            @SuppressWarnings("unchecked")
            List<List<Map<String, Object>>> mapData = (List<List<Map<String, Object>>>) request.get("map");
            Integer currentTurn = (Integer) request.get("currentTurn");
            
            // Convert data to objects
            Hero hero = convertMapToHero(heroData);
            Tile[][] map = convertMapToTiles(mapData);
            
            ZoneOfCausality zfc = zfcService.calculateZFC(playerId, heroId, hero, map, currentTurn);
            return ResponseEntity.ok(zfc);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * Calculate ZFC movement cost
     */
    @PostMapping("/movement-cost")
    public ResponseEntity<Double> calculateMovementCost(@RequestBody Map<String, Object> request) {
        try {
            @SuppressWarnings("unchecked")
            Map<String, Object> fromData = (Map<String, Object>) request.get("from");
            @SuppressWarnings("unchecked")
            Map<String, Object> toData = (Map<String, Object>) request.get("to");
            @SuppressWarnings("unchecked")
            Map<String, Object> heroData = (Map<String, Object>) request.get("hero");
            @SuppressWarnings("unchecked")
            List<List<Map<String, Object>>> mapData = (List<List<Map<String, Object>>>) request.get("map");
            
            Position from = new Position((Integer) fromData.get("x"), (Integer) fromData.get("y"));
            Position to = new Position((Integer) toData.get("x"), (Integer) toData.get("y"));
            Hero hero = convertMapToHero(heroData);
            Tile[][] map = convertMapToTiles(mapData);
            
            double cost = zfcService.calculateZFCMovementCost(from, to, hero, map);
            return ResponseEntity.ok(cost);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * Validate action in ZFC
     */
    @PostMapping("/validate-action")
    public ResponseEntity<Boolean> validateAction(@RequestBody Map<String, Object> request) {
        try {
            String actionType = (String) request.get("actionType");
            String heroId = (String) request.get("heroId");
            @SuppressWarnings("unchecked")
            Map<String, Object> targetPosData = (Map<String, Object>) request.get("targetPosition");
            @SuppressWarnings("unchecked")
            Map<String, Object> zfcData = (Map<String, Object>) request.get("zfc");
            @SuppressWarnings("unchecked")
            List<List<Map<String, Object>>> mapData = (List<List<Map<String, Object>>>) request.get("map");
            
            Position targetPosition = new Position((Integer) targetPosData.get("x"), (Integer) targetPosData.get("y"));
            ZoneOfCausality zfc = convertMapToZFC(zfcData);
            Tile[][] map = convertMapToTiles(mapData);
            
            boolean isValid = zfcService.validateActionInZFC(actionType, heroId, targetPosition, zfc, map);
            return ResponseEntity.ok(isValid);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * Generate shadow actions
     */
    @PostMapping("/shadow-actions")
    public ResponseEntity<List<ShadowAction>> generateShadowActions(@RequestBody Map<String, Object> request) {
        try {
            @SuppressWarnings("unchecked")
            List<Map<String, Object>> pendingActionsData = (List<Map<String, Object>>) request.get("pendingActions");
            Integer currentTurn = (Integer) request.get("currentTurn");
            
            List<TimelineAction> pendingActions = convertMapToTimelineActions(pendingActionsData);
            List<ShadowAction> shadowActions = zfcService.generateShadowActions(pendingActions, currentTurn);
            
            return ResponseEntity.ok(shadowActions);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * Calculate temporal interference
     */
    @PostMapping("/temporal-interference")
    public ResponseEntity<Map<String, Object>> calculateTemporalInterference(@RequestBody Map<String, Object> request) {
        try {
            @SuppressWarnings("unchecked")
            List<Map<String, Object>> activeZFCsData = (List<Map<String, Object>>) request.get("activeZFCs");
            
            List<ZoneOfCausality> activeZFCs = convertMapToZFCs(activeZFCsData);
            Map<String, Object> interference = zfcService.calculateTemporalInterference(activeZFCs);
            
            return ResponseEntity.ok(interference);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // Helper methods for data conversion

    private Hero convertMapToHero(Map<String, Object> heroData) {
        Hero hero = new Hero();
        hero.setId((String) heroData.get("id"));
        hero.setName((String) heroData.get("name"));
        hero.setLevel((Integer) heroData.get("level"));
        hero.setMovementPoints((Integer) heroData.get("movementPoints"));
        hero.setMaxMovementPoints((Integer) heroData.get("maxMovementPoints"));
        hero.setPlayerId((String) heroData.get("playerId"));
        
        // Convert position
        if (heroData.containsKey("position")) {
            @SuppressWarnings("unchecked")
            Map<String, Object> posData = (Map<String, Object>) heroData.get("position");
            Position position = new Position((Integer) posData.get("x"), (Integer) posData.get("y"));
            hero.setPosition(position);
        }
        
        // Convert stats
        if (heroData.containsKey("stats")) {
            @SuppressWarnings("unchecked")
            Map<String, Object> statsData = (Map<String, Object>) heroData.get("stats");
            hero.setStats(statsData);
        }
        
        // Convert temporal attributes
        if (heroData.containsKey("temporalAttributes")) {
            @SuppressWarnings("unchecked")
            Map<String, Object> temporalData = (Map<String, Object>) heroData.get("temporalAttributes");
            hero.setTemporalAttributes(temporalData);
        }
        
        return hero;
    }

    private Tile[][] convertMapToTiles(List<List<Map<String, Object>>> mapData) {
        if (mapData == null || mapData.isEmpty()) {
            return new Tile[0][0];
        }
        
        int height = mapData.size();
        int width = mapData.get(0).size();
        Tile[][] tiles = new Tile[height][width];
        
        for (int y = 0; y < height; y++) {
            for (int x = 0; x < width; x++) {
                Map<String, Object> tileData = mapData.get(y).get(x);
                Tile tile = new Tile();
                tile.setX((Integer) tileData.get("x"));
                tile.setY((Integer) tileData.get("y"));
                tile.setTerrain((String) tileData.get("terrain"));
                tile.setWalkable((Boolean) tileData.get("walkable"));
                tile.setMovementCost((Integer) tileData.get("movementCost"));
                tile.setHero((String) tileData.get("hero"));
                tile.setCreature((String) tileData.get("creature"));
                
                tiles[y][x] = tile;
            }
        }
        
        return tiles;
    }

    private ZoneOfCausality convertMapToZFC(Map<String, Object> zfcData) {
        ZoneOfCausality zfc = new ZoneOfCausality();
        zfc.setPlayerId((String) zfcData.get("playerId"));
        zfc.setRadius((Integer) zfcData.get("radius"));
        zfc.setIncludesTeleport((Boolean) zfcData.get("includesTeleport"));
        zfc.setValidUntil((Integer) zfcData.get("validUntil"));
        zfc.setTemporalStability((Double) zfcData.get("temporalStability"));
        
        // Convert center position
        if (zfcData.containsKey("center")) {
            @SuppressWarnings("unchecked")
            Map<String, Object> centerData = (Map<String, Object>) zfcData.get("center");
            Position center = new Position((Integer) centerData.get("x"), (Integer) centerData.get("y"));
            zfc.setCenter(center);
        }
        
        // Convert reachable tiles
        if (zfcData.containsKey("reachableTiles")) {
            @SuppressWarnings("unchecked")
            List<Map<String, Object>> tilesData = (List<Map<String, Object>>) zfcData.get("reachableTiles");
            List<Position> reachableTiles = tilesData.stream()
                .map(tileData -> new Position((Integer) tileData.get("x"), (Integer) tileData.get("y")))
                .collect(java.util.stream.Collectors.toList());
            zfc.setReachableTiles(reachableTiles);
        }
        
        // Convert conflict zones
        if (zfcData.containsKey("conflictZones")) {
            @SuppressWarnings("unchecked")
            List<Map<String, Object>> conflictData = (List<Map<String, Object>>) zfcData.get("conflictZones");
            List<Position> conflictZones = conflictData.stream()
                .map(conflictTileData -> new Position((Integer) conflictTileData.get("x"), (Integer) conflictTileData.get("y")))
                .collect(java.util.stream.Collectors.toList());
            zfc.setConflictZones(conflictZones);
        }
        
        return zfc;
    }

    private List<TimelineAction> convertMapToTimelineActions(List<Map<String, Object>> actionsData) {
        return actionsData.stream().map(actionData -> {
            TimelineAction action = new TimelineAction();
            action.setId((String) actionData.get("id"));
            action.setTurn((Integer) actionData.get("turn"));
            action.setPlayerId((String) actionData.get("playerId"));
            action.setStatus((String) actionData.get("status"));
            action.setOriginTimestamp((String) actionData.get("originTimestamp"));
            action.setShadowVisible((Boolean) actionData.get("shadowVisible"));
            action.setZfcCost((Double) actionData.get("zfcCost"));
            
            @SuppressWarnings("unchecked")
            Map<String, Object> actionMap = (Map<String, Object>) actionData.get("action");
            action.setAction(actionMap);
            
            if (actionData.containsKey("zfc")) {
                @SuppressWarnings("unchecked")
                Map<String, Object> zfcData = (Map<String, Object>) actionData.get("zfc");
                action.setZfc(convertMapToZFC(zfcData));
            }
            
            return action;
        }).collect(java.util.stream.Collectors.toList());
    }

    private List<ZoneOfCausality> convertMapToZFCs(List<Map<String, Object>> zfcsData) {
        return zfcsData.stream()
            .map(this::convertMapToZFC)
            .collect(java.util.stream.Collectors.toList());
    }
} 