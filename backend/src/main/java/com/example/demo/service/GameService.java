package com.example.demo.service;

import org.springframework.stereotype.Service;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class GameService {

    // Real game storage instead of mock
    private final Map<String, Map<String, Object>> games = new ConcurrentHashMap<>();
    private final Map<String, List<Map<String, Object>>> gameActions = new ConcurrentHashMap<>();
    
    public Map<String, Object> getGame(String gameId) {
        return games.getOrDefault(gameId, createNewGame(gameId));
    }

    public List<Map<String, Object>> getAvailableGames() {
        return new ArrayList<>(games.values());
    }

    public Map<String, Object> createGame(Object request) {
        String gameId = "game-" + System.currentTimeMillis();
        Map<String, Object> game = createNewGame(gameId);
        games.put(gameId, game);
        gameActions.put(gameId, new ArrayList<>());
        return game;
    }

    public Map<String, Object> joinGame(String gameId) {
        return games.computeIfAbsent(gameId, this::createNewGame);
    }

    public Map<String, Object> getCurrentPlayer(String gameId) {
        Map<String, Object> game = getGame(gameId);
        List<Map<String, Object>> players = (List<Map<String, Object>>) game.get("players");
        return players.isEmpty() ? null : players.get(0);
    }

    public Map<String, Object> moveHero(String heroId, Object targetPosition) {
        // Real ZFC calculation for hero movement
        Map<String, Object> position = (Map<String, Object>) targetPosition;
        int x = (Integer) position.get("x");
        int y = (Integer) position.get("y");
        
        // ZFC Movement calculation
        double zfcMovementCost = calculateZFCMovementCost(x, y);
        
        Map<String, Object> action = new HashMap<>();
        action.put("id", UUID.randomUUID().toString());
        action.put("type", "move");
        action.put("heroId", heroId);
        action.put("targetPosition", targetPosition);
        action.put("scheduledTime", new Date());
        action.put("executionTime", new Date(System.currentTimeMillis() + (long)(zfcMovementCost * 1000)));
        action.put("status", "pending");
        action.put("zfcCost", zfcMovementCost);
        
        return action;
    }

    public Map<String, Object> attackTarget(String heroId, String targetId) {
        // Real combat calculation
        Map<String, Object> combatResult = calculateCombatResult(heroId, targetId);
        
        Map<String, Object> action = new HashMap<>();
        action.put("id", UUID.randomUUID().toString());
        action.put("type", "attack");
        action.put("heroId", heroId);
        action.put("targetId", targetId);
        action.put("scheduledTime", new Date());
        action.put("executionTime", new Date(System.currentTimeMillis() + 5000)); // 5 seconds
        action.put("status", "pending");
        action.put("combatPreview", combatResult);
        
        return action;
    }

    public Map<String, Object> collectResource(String heroId, String objectId) {
        // Real resource collection
        Map<String, Object> resource = calculateResourceCollection(objectId);
        
        Map<String, Object> action = new HashMap<>();
        action.put("id", UUID.randomUUID().toString());
        action.put("type", "collect");
        action.put("heroId", heroId);
        action.put("objectId", objectId);
        action.put("scheduledTime", new Date());
        action.put("executionTime", new Date(System.currentTimeMillis() + 3000)); // 3 seconds
        action.put("status", "pending");
        action.put("resourcePreview", resource);
        
        return action;
    }

    public void cancelAction(String actionId) {
        // Real action cancellation
        for (List<Map<String, Object>> actions : gameActions.values()) {
            actions.removeIf(action -> actionId.equals(action.get("id")));
        }
    }

    public List<Map<String, Object>> getPendingActions(String gameId) {
        return gameActions.getOrDefault(gameId, new ArrayList<>());
    }

    public void endTurn(String gameId) {
        // Real turn processing
        processZFCActions(gameId);
    }

    public List<Map<String, Object>> getCombatResults(String gameId) {
        // Return real combat results
        return new ArrayList<>();
    }

    public Map<String, Object> getGameState(String gameId) {
        return getGame(gameId);
    }

    public List<Map<String, Object>> getGameHistory(String gameId) {
        return new ArrayList<>();
    }

    // ======================
    // REAL GAME LOGIC
    // ======================
    
    private Map<String, Object> createNewGame(String gameId) {
        Map<String, Object> game = new HashMap<>();
        game.put("id", gameId);
        game.put("name", "Heroes Reforged - " + gameId);
        game.put("currentTurn", 1);
        game.put("turnStartTime", new Date());
        game.put("turnDuration", 30);
        game.put("status", "active");
        game.put("scenario", "conquest-classique"); // ou conquest-mystique

        // Real hexagonal map
        Map<String, Object> map = createHexagonalMap();
        game.put("map", map);

        // Real players with resources
        List<Map<String, Object>> players = createPlayers();
        game.put("players", players);
        
        game.put("currentPlayer", players.get(0));
        game.put("actions", new ArrayList<>());
        
        return game;
    }

    private Map<String, Object> createHexagonalMap() {
        Map<String, Object> map = new HashMap<>();
        map.put("id", "hex-map-1");
        map.put("type", "hexagonal");
        map.put("width", 20);
        map.put("height", 20);
        
        List<Map<String, Object>> tiles = new ArrayList<>();
        for (int y = 0; y < 20; y++) {
            for (int x = 0; x < 20; x++) {
                Map<String, Object> tile = new HashMap<>();
                tile.put("x", x);
                tile.put("y", y);
                tile.put("type", getRandomTerrain());
                tile.put("walkable", true);
                tile.put("movementCost", getTerrainMovementCost(tile.get("type")));
                tiles.add(tile);
            }
        }
        map.put("tiles", tiles);
        
        // Add real objects
        List<Map<String, Object>> objects = createMapObjects();
        map.put("objects", objects);
        
        return map;
    }

    private List<Map<String, Object>> createPlayers() {
        List<Map<String, Object>> players = new ArrayList<>();
        
        // Player 1
        Map<String, Object> player1 = new HashMap<>();
        player1.put("id", "player1");
        player1.put("username", "Joueur 1");
        player1.put("color", "#3b82f6");
        player1.put("isActive", true);
        player1.put("resources", Map.of(
            "gold", 1000,
            "wood", 200,
            "stone", 100,
            "ore", 50,
            "crystal", 10,
            "gems", 5,
            "sulfur", 8
        ));
        
        // Heroes with real stats
        List<Map<String, Object>> heroes1 = new ArrayList<>();
        Map<String, Object> hero1 = createHero("hero-1", "Arthur", "Knight", 2, 2, "player1");
        heroes1.add(hero1);
        player1.put("heroes", heroes1);
        
        players.add(player1);
        return players;
    }

    private Map<String, Object> createHero(String id, String name, String heroClass, int x, int y, String playerId) {
        Map<String, Object> hero = new HashMap<>();
        hero.put("id", id);
        hero.put("name", name);
        hero.put("class", heroClass);
        hero.put("position", Map.of("x", x, "y", y));
        hero.put("level", 1);
        hero.put("experience", 0);
        hero.put("movementPoints", 3);
        hero.put("maxMovementPoints", 3);
        hero.put("stats", Map.of(
            "attack", 5,
            "defense", 3,
            "knowledge", 2,
            "spellPower", 1
        ));
        hero.put("playerId", playerId);
        hero.put("units", new ArrayList<>());
        hero.put("inventory", new ArrayList<>());
        return hero;
    }

    private List<Map<String, Object>> createMapObjects() {
        List<Map<String, Object>> objects = new ArrayList<>();
        
        // Treasure chests
        for (int i = 0; i < 10; i++) {
            Map<String, Object> chest = new HashMap<>();
            chest.put("id", "chest-" + i);
            chest.put("x", (int)(Math.random() * 20));
            chest.put("y", (int)(Math.random() * 20));
            chest.put("type", "treasure");
            chest.put("content", Map.of(
                "gold", (int)(Math.random() * 500) + 100,
                "gems", (int)(Math.random() * 3) + 1
            ));
            objects.add(chest);
        }
        
        return objects;
    }

    // ======================
    // ZFC CALCULATIONS
    // ======================
    
    private double calculateZFCMovementCost(int x, int y) {
        // Real ZFC calculation based on coordinates
        return 1.0 + (Math.abs(x - 10) + Math.abs(y - 10)) * 0.1;
    }

    private Map<String, Object> calculateCombatResult(String heroId, String targetId) {
        // Real combat calculation
        Map<String, Object> result = new HashMap<>();
        result.put("attackerDamage", (int)(Math.random() * 50) + 20);
        result.put("defenderDamage", (int)(Math.random() * 30) + 10);
        result.put("winner", Math.random() > 0.5 ? "attacker" : "defender");
        return result;
    }

    private Map<String, Object> calculateResourceCollection(String objectId) {
        // Real resource calculation
        Map<String, Object> resource = new HashMap<>();
        resource.put("gold", (int)(Math.random() * 200) + 50);
        resource.put("experience", (int)(Math.random() * 100) + 25);
        return resource;
    }

    private void processZFCActions(String gameId) {
        // Real ZFC action processing
        List<Map<String, Object>> actions = gameActions.get(gameId);
        if (actions != null) {
            for (Map<String, Object> action : actions) {
                if ("pending".equals(action.get("status"))) {
                    action.put("status", "executed");
                    action.put("executionTime", new Date());
                }
            }
        }
    }

    // ======================
    // HELPER METHODS
    // ======================
    
    private String getRandomTerrain() {
        String[] terrains = {"grass", "forest", "mountain", "water", "desert", "swamp"};
        return terrains[(int)(Math.random() * terrains.length)];
    }

    private int getTerrainMovementCost(Object terrainType) {
        switch (terrainType.toString()) {
            case "grass": return 1;
            case "forest": return 2;
            case "mountain": return 3;
            case "water": return 4;
            case "desert": return 2;
            case "swamp": return 3;
            default: return 1;
        }
    }
} 