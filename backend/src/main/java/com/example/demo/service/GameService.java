package com.example.demo.service;

import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class GameService {

    // Mock data for testing
    private final Map<String, Object> mockGame = createMockGame();

    public Map<String, Object> getGame(String gameId) {
        return mockGame;
    }

    public List<Map<String, Object>> getAvailableGames() {
        return Arrays.asList(mockGame);
    }

    public Map<String, Object> createGame(Object request) {
        return mockGame;
    }

    public Map<String, Object> joinGame(String gameId) {
        return mockGame;
    }

    public Map<String, Object> getCurrentPlayer(String gameId) {
        return (Map<String, Object>) mockGame.get("currentPlayer");
    }

    public Map<String, Object> moveHero(String heroId, Object targetPosition) {
        Map<String, Object> action = new HashMap<>();
        action.put("id", UUID.randomUUID().toString());
        action.put("type", "move");
        action.put("heroId", heroId);
        action.put("targetPosition", targetPosition);
        action.put("scheduledTime", new Date());
        action.put("executionTime", new Date(System.currentTimeMillis() + 30000)); // 30 seconds from now
        action.put("status", "pending");
        return action;
    }

    public Map<String, Object> attackTarget(String heroId, String targetId) {
        Map<String, Object> action = new HashMap<>();
        action.put("id", UUID.randomUUID().toString());
        action.put("type", "attack");
        action.put("heroId", heroId);
        action.put("targetId", targetId);
        action.put("scheduledTime", new Date());
        action.put("executionTime", new Date(System.currentTimeMillis() + 30000));
        action.put("status", "pending");
        return action;
    }

    public Map<String, Object> collectResource(String heroId, String objectId) {
        Map<String, Object> action = new HashMap<>();
        action.put("id", UUID.randomUUID().toString());
        action.put("type", "collect");
        action.put("heroId", heroId);
        action.put("objectId", objectId);
        action.put("scheduledTime", new Date());
        action.put("executionTime", new Date(System.currentTimeMillis() + 30000));
        action.put("status", "pending");
        return action;
    }

    public void cancelAction(String actionId) {
        // Mock implementation
    }

    public List<Map<String, Object>> getPendingActions(String gameId) {
        return new ArrayList<>();
    }

    public void endTurn(String gameId) {
        // Mock implementation
    }

    public List<Map<String, Object>> getCombatResults(String gameId) {
        return new ArrayList<>();
    }

    public Map<String, Object> getGameState(String gameId) {
        return mockGame;
    }

    public List<Map<String, Object>> getGameHistory(String gameId) {
        return new ArrayList<>();
    }

    private Map<String, Object> createMockGame() {
        Map<String, Object> game = new HashMap<>();
        game.put("id", "demo-game-1");
        game.put("name", "Partie de Démonstration");
        game.put("currentTurn", 1);
        game.put("turnStartTime", new Date());
        game.put("turnDuration", 30);
        game.put("status", "active");

        // Mock map
        Map<String, Object> map = new HashMap<>();
        map.put("id", "map-1");
        map.put("width", 10);
        map.put("height", 10);
        
        List<Map<String, Object>> tiles = new ArrayList<>();
        for (int y = 0; y < 10; y++) {
            for (int x = 0; x < 10; x++) {
                Map<String, Object> tile = new HashMap<>();
                tile.put("x", x);
                tile.put("y", y);
                tile.put("type", x % 3 == 0 ? "forest" : "grass");
                tile.put("walkable", true);
                tile.put("movementCost", x % 3 == 0 ? 2 : 1);
                tiles.add(tile);
            }
        }
        map.put("tiles", tiles);

        List<Map<String, Object>> objects = new ArrayList<>();
        Map<String, Object> chest = new HashMap<>();
        chest.put("id", "chest-1");
        chest.put("x", 3);
        chest.put("y", 3);
        chest.put("type", "chest");
        chest.put("content", Map.of("resource", "gold", "amount", 100));
        objects.add(chest);

        Map<String, Object> enemy = new HashMap<>();
        enemy.put("id", "enemy-1");
        enemy.put("x", 7);
        enemy.put("y", 7);
        enemy.put("type", "enemy");
        enemy.put("content", Map.of("unitType", "goblin", "level", 1));
        objects.add(enemy);

        map.put("objects", objects);
        game.put("map", map);

        // Mock players
        List<Map<String, Object>> players = new ArrayList<>();
        
        Map<String, Object> player1 = new HashMap<>();
        player1.put("id", "player1");
        player1.put("username", "Joueur 1");
        player1.put("email", "player1@example.com");
        player1.put("color", "#3b82f6");
        player1.put("isActive", true);
        player1.put("resources", Map.of(
            "gold", 500,
            "wood", 100,
            "stone", 50,
            "mana", 25
        ));

        List<Map<String, Object>> heroes1 = new ArrayList<>();
        Map<String, Object> hero1 = new HashMap<>();
        hero1.put("id", "hero-1");
        hero1.put("name", "Arthur");
        hero1.put("position", Map.of("x", 1, "y", 1));
        hero1.put("level", 1);
        hero1.put("experience", 0);
        hero1.put("movementPoints", 3);
        hero1.put("maxMovementPoints", 3);
        hero1.put("stats", Map.of(
            "attack", 5,
            "defense", 3,
            "knowledge", 2,
            "spellPower", 1
        ));
        hero1.put("playerId", "player1");
        hero1.put("units", new ArrayList<>());
        hero1.put("inventory", new ArrayList<>());
        heroes1.add(hero1);
        player1.put("heroes", heroes1);
        players.add(player1);

        Map<String, Object> player2 = new HashMap<>();
        player2.put("id", "player2");
        player2.put("username", "Joueur 2");
        player2.put("email", "player2@example.com");
        player2.put("color", "#ef4444");
        player2.put("isActive", true);
        player2.put("resources", Map.of(
            "gold", 500,
            "wood", 100,
            "stone", 50,
            "mana", 25
        ));

        List<Map<String, Object>> heroes2 = new ArrayList<>();
        Map<String, Object> hero2 = new HashMap<>();
        hero2.put("id", "hero-2");
        hero2.put("name", "Morgane");
        hero2.put("position", Map.of("x", 8, "y", 8));
        hero2.put("level", 1);
        hero2.put("experience", 0);
        hero2.put("movementPoints", 3);
        hero2.put("maxMovementPoints", 3);
        hero2.put("stats", Map.of(
            "attack", 3,
            "defense", 2,
            "knowledge", 4,
            "spellPower", 5
        ));
        hero2.put("playerId", "player2");
        hero2.put("units", new ArrayList<>());
        hero2.put("inventory", new ArrayList<>());
        heroes2.add(hero2);
        player2.put("heroes", heroes2);
        players.add(player2);

        game.put("players", players);
        game.put("actions", new ArrayList<>());
        game.put("gameSettings", Map.of(
            "maxPlayers", 4,
            "turnTimeLimit", 30,
            "victoryConditions", Arrays.asList("Conquête", "Économique")
        ));

        // Mock current player (player1 for demo)
        game.put("currentPlayer", player1);

        return game;
    }
} 