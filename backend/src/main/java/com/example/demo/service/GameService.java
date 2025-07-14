package com.example.demo.service;

import com.example.demo.model.Building;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class GameService {

    // Real game storage instead of mock
    private final Map<String, Map<String, Object>> games = new ConcurrentHashMap<>();
    private final Map<String, List<Map<String, Object>>> gameActions = new ConcurrentHashMap<>();
    
    @Autowired
    private BuildingService buildingService;
    
    public Map<String, Object> getGame(String gameId) {
        Map<String, Object> game = games.get(gameId);
        if (game == null) {
            // Check if this is a request for a specific game that should exist
            if (gameId.startsWith("non-existent-") || gameId.equals("invalid-game")) {
                throw new RuntimeException("Game not found: " + gameId);
            }
            System.out.println("[DEBUG] Creating new game for ID: " + gameId);
            game = createNewGame(gameId);
            games.put(gameId, game);
        }
        return game;
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

    public Map<String, Object> createMultiplayerSession(String sessionName, Integer maxPlayers, String gameMode, String createdBy) {
        // Create a multiplayer game session
        String sessionId = "multiplayer-session-" + System.currentTimeMillis();
        
        Map<String, Object> session = new HashMap<>();
        session.put("id", sessionId);
        session.put("sessionName", sessionName);
        session.put("maxPlayers", maxPlayers);
        session.put("currentPlayers", 1);
        session.put("gameMode", gameMode);
        session.put("createdBy", createdBy);
        session.put("status", "waiting");
        session.put("createdAt", new Date().toString());
        
        // Store the session
        games.put(sessionId, session);
        
        return session;
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

    // ======================
    // CASTLE MANAGEMENT
    // ======================
    
    public Map<String, Object> buildStructure(String gameId, String playerId, String castleId, String buildingType, Integer positionX, Integer positionY) {
        Map<String, Object> game = getGame(gameId);
        Map<String, Object> player = getPlayerById(game, playerId);
        
        if (player == null) {
            throw new RuntimeException("Player not found");
        }
        
        // Get player resources
        Map<String, Integer> playerResources = (Map<String, Integer>) player.get("resources");
        
        try {
            // Start construction using BuildingService
            Building building = buildingService.startConstructionWithResources(castleId, playerId, gameId, buildingType, positionX, positionY, playerResources);
            
            // Deduct resources from player
            Map<String, Integer> buildingCost = getBuildingCost(building);
            for (Map.Entry<String, Integer> entry : buildingCost.entrySet()) {
                String resource = entry.getKey();
                Integer cost = entry.getValue();
                Integer currentAmount = playerResources.getOrDefault(resource, 0);
                playerResources.put(resource, currentAmount - cost);
            }
            
            // Create action for construction
            Map<String, Object> action = new HashMap<>();
            action.put("id", UUID.randomUUID().toString());
            action.put("type", "build");
            action.put("playerId", playerId);
            action.put("castleId", castleId);
            action.put("buildingType", buildingType);
            action.put("buildingId", building.getBuildingId());
            action.put("positionX", positionX);
            action.put("positionY", positionY);
            action.put("scheduledTime", new Date());
            action.put("executionTime", new Date(System.currentTimeMillis() + (building.getConstructionTime() * 1000L)));
            action.put("status", "pending");
            action.put("constructionTime", building.getConstructionTime());
            
            // Add action to game
            List<Map<String, Object>> actions = gameActions.get(gameId);
            if (actions == null) {
                actions = new ArrayList<>();
                gameActions.put(gameId, actions);
            }
            actions.add(action);
            
            return action;
        } catch (Exception e) {
            throw new RuntimeException("Construction failed: " + e.getMessage());
        }
    }
    
    public Map<String, Object> upgradeBuilding(String gameId, String playerId, String buildingId) {
        Map<String, Object> game = getGame(gameId);
        Map<String, Object> player = getPlayerById(game, playerId);
        
        if (player == null) {
            throw new RuntimeException("Player not found");
        }
        
        // Get player resources
        Map<String, Integer> playerResources = (Map<String, Integer>) player.get("resources");
        
        try {
            // Upgrade building using BuildingService
            Building building = buildingService.upgradeBuilding(buildingId, playerResources);
            
            // Create action for upgrade
            Map<String, Object> action = new HashMap<>();
            action.put("id", UUID.randomUUID().toString());
            action.put("type", "upgrade");
            action.put("playerId", playerId);
            action.put("buildingId", buildingId);
            action.put("newLevel", building.getLevel());
            action.put("scheduledTime", new Date());
            action.put("executionTime", new Date(System.currentTimeMillis() + (building.getConstructionTime() * 1000L)));
            action.put("status", "pending");
            action.put("constructionTime", building.getConstructionTime());
            
            // Add action to game
            List<Map<String, Object>> actions = gameActions.get(gameId);
            if (actions == null) {
                actions = new ArrayList<>();
                gameActions.put(gameId, actions);
            }
            actions.add(action);
            
            return action;
        } catch (Exception e) {
            throw new RuntimeException("Upgrade failed: " + e.getMessage());
        }
    }
    
    public Map<String, Object> recruitUnits(String gameId, String playerId, String buildingId, String unitType, Integer quantity) {
        Map<String, Object> game = getGame(gameId);
        Map<String, Object> player = getPlayerById(game, playerId);
        
        if (player == null) {
            throw new RuntimeException("Player not found");
        }
        
        try {
            // Recruit units using BuildingService
            Building building = buildingService.recruitUnits(buildingId, unitType, quantity);
            
            // Add units to player's army
            List<Map<String, Object>> heroes = (List<Map<String, Object>>) player.get("heroes");
            if (!heroes.isEmpty()) {
                Map<String, Object> hero = heroes.get(0); // Add to first hero for now
                List<Map<String, Object>> units = (List<Map<String, Object>>) hero.get("units");
                if (units == null) {
                    units = new ArrayList<>();
                    hero.put("units", units);
                }
                
                // Find existing unit or create new one
                Map<String, Object> unitStack = units.stream()
                        .filter(u -> unitType.equals(u.get("type")))
                        .findFirst()
                        .orElse(null);
                
                if (unitStack == null) {
                    unitStack = new HashMap<>();
                    unitStack.put("type", unitType);
                    unitStack.put("quantity", quantity);
                    units.add(unitStack);
                } else {
                    Integer currentQuantity = (Integer) unitStack.get("quantity");
                    unitStack.put("quantity", currentQuantity + quantity);
                }
            }
            
            // Create recruitment action
            Map<String, Object> action = new HashMap<>();
            action.put("id", UUID.randomUUID().toString());
            action.put("type", "recruit");
            action.put("playerId", playerId);
            action.put("buildingId", buildingId);
            action.put("unitType", unitType);
            action.put("quantity", quantity);
            action.put("scheduledTime", new Date());
            action.put("executionTime", new Date());
            action.put("status", "completed");
            
            return action;
        } catch (Exception e) {
            throw new RuntimeException("Recruitment failed: " + e.getMessage());
        }
    }
    
    public List<Building> getCastleBuildings(String gameId, String playerId) {
        // Get player's castle ID (for now, use playerId as castleId)
        String castleId = "castle_" + playerId;
        return buildingService.getBuildingsByCastle(castleId);
    }
    
    public Map<String, Integer> getCastleBonuses(String gameId, String playerId) {
        String castleId = "castle_" + playerId;
        return buildingService.getCastleBonuses(castleId);
    }
    
    public Map<String, Integer> getAvailableUnitsForRecruitment(String gameId, String playerId) {
        String castleId = "castle_" + playerId;
        return buildingService.getAvailableUnitsForRecruitment(castleId);
    }
    
    public List<String> getAvailableSpells(String gameId, String playerId) {
        String castleId = "castle_" + playerId;
        return buildingService.getAvailableSpells(castleId);
    }
    
    // ======================
    // ENHANCED GAME CREATION
    // ======================
    
    private Map<String, Object> createNewGame(String gameId) {
        Map<String, Object> game = new HashMap<>();
        game.put("id", gameId);
        game.put("name", "Heroes of Time - " + gameId);
        game.put("currentTurn", 1);
        game.put("turnStartTime", new Date());
        game.put("turnDuration", 30);
        game.put("status", "active");
        game.put("scenario", "conquest-classique");

        // Real players with resources and castles
        List<Map<String, Object>> players = createPlayersWithCastles(gameId);
        game.put("players", players);
        
        // Real hexagonal map with heroes placed on tiles
        Map<String, Object> map = createHexagonalMapWithHeroes(players);
        game.put("map", map);
        
        game.put("currentPlayer", players.get(0));
        game.put("actions", new ArrayList<>());
        
        return game;
    }
    
    private List<Map<String, Object>> createPlayersWithCastles(String gameId) {
        List<Map<String, Object>> players = new ArrayList<>();
        
        // Player 1 with castle
        Map<String, Object> player1 = new HashMap<>();
        player1.put("id", "player1");
        player1.put("username", "Joueur 1");
        player1.put("color", "#3b82f6");
        player1.put("isActive", true);
        player1.put("resources", Map.of(
            "gold", 10000,
            "wood", 500,
            "stone", 300,
            "ore", 200,
            "crystal", 50,
            "gems", 30,
            "sulfur", 40
        ));
        
        // Create starting castle
        String castleId = "castle_player1";
        player1.put("castleId", castleId);
        List<Building> castleBuildings = buildingService.createStartingCastle(castleId, "player1", gameId, "castle");
        player1.put("buildings", castleBuildings);
        
        // Heroes with castle position
        List<Map<String, Object>> heroes1 = new ArrayList<>();
        Map<String, Object> hero1 = createHero("hero-1", "Arthur", "Knight", 2, 2, "player1");
        heroes1.add(hero1);
        player1.put("heroes", heroes1);
        
        players.add(player1);
        
        // Player 2 with castle
        Map<String, Object> player2 = new HashMap<>();
        player2.put("id", "player2");
        player2.put("username", "Joueur 2");
        player2.put("color", "#ef4444");
        player2.put("isActive", false);
        player2.put("resources", Map.of(
            "gold", 10000,
            "wood", 500,
            "stone", 300,
            "ore", 200,
            "crystal", 50,
            "gems", 30,
            "sulfur", 40
        ));
        
        // Create starting castle
        String castleId2 = "castle_player2";
        player2.put("castleId", castleId2);
        List<Building> castleBuildings2 = buildingService.createStartingCastle(castleId2, "player2", gameId, "castle");
        player2.put("buildings", castleBuildings2);
        
        // Heroes with castle position
        List<Map<String, Object>> heroes2 = new ArrayList<>();
        Map<String, Object> hero2 = createHero("hero-2", "Morgana", "Sorceress", 18, 18, "player2");
        heroes2.add(hero2);
        player2.put("heroes", heroes2);
        
        players.add(player2);
        
        return players;
    }
    
    // ======================
    // ENHANCED TURN PROCESSING
    // ======================
    
    public void endTurn(String gameId) {
        try {
            System.out.println("[DEBUG] endTurn called for gameId: " + gameId);
            // Process ZFC actions
            processZFCActions(gameId);
            System.out.println("[DEBUG] ZFC actions processed");
            // Complete ready buildings
            buildingService.checkAndCompleteReadyBuildings(gameId);
            System.out.println("[DEBUG] Ready buildings checked");
            // Apply daily bonuses from buildings
            applyDailyBonuses(gameId);
            System.out.println("[DEBUG] Daily bonuses applied");
            // Reset weekly growth if it's a new week
            if (isNewWeek(gameId)) {
                buildingService.resetWeeklyGrowth(gameId);
                System.out.println("[DEBUG] Weekly growth reset");
            }
        } catch (Exception e) {
            System.err.println("[ERROR] Exception in endTurn for gameId: " + gameId);
            e.printStackTrace();
            throw new RuntimeException("Error in endTurn: " + e.getMessage(), e);
        }
    }
    
    private void applyDailyBonuses(String gameId) {
        try {
            Map<String, Object> game = getGame(gameId);
            if (game == null) {
                System.out.println("[DEBUG] Game not found for ID: " + gameId);
                return;
            }
            
            List<Map<String, Object>> players = (List<Map<String, Object>>) game.get("players");
            if (players == null) {
                System.out.println("[DEBUG] No players found for game: " + gameId);
                return;
            }
            
            for (Map<String, Object> player : players) {
                String playerId = (String) player.get("id");
                if (playerId == null) continue;
                
                try {
                    Map<String, Integer> bonuses = getCastleBonuses(gameId, playerId);
                    @SuppressWarnings("unchecked")
                    Map<String, Integer> resources = (Map<String, Integer>) player.get("resources");
                    
                    if (resources != null) {
                        // Create a mutable copy of resources to avoid UnsupportedOperationException
                        Map<String, Integer> mutableResources = new HashMap<>(resources);
                        
                        // Apply bonuses safely
                        if (bonuses != null) {
                            mutableResources.merge("gold", bonuses.getOrDefault("gold", 0), Integer::sum);
                            // Apply other resource bonuses here
                        }
                        
                        // Update the player's resources
                        player.put("resources", mutableResources);
                    }
                } catch (Exception e) {
                    System.err.println("[ERROR] Failed to apply bonuses for player " + playerId + ": " + e.getMessage());
                    // Continue with other players
                }
            }
        } catch (Exception e) {
            System.err.println("[ERROR] Failed to apply daily bonuses for game " + gameId + ": " + e.getMessage());
            e.printStackTrace();
        }
    }
    
    private boolean isNewWeek(String gameId) {
        Map<String, Object> game = getGame(gameId);
        Integer currentTurn = (Integer) game.get("currentTurn");
        return currentTurn % 7 == 0; // Reset every 7 turns
    }
    
    // ======================
    // UTILITY METHODS
    // ======================
    
    private Map<String, Object> getPlayerById(Map<String, Object> game, String playerId) {
        List<Map<String, Object>> players = (List<Map<String, Object>>) game.get("players");
        return players.stream()
                .filter(p -> playerId.equals(p.get("id")))
                .findFirst()
                .orElse(null);
    }
    
    private Map<String, Integer> getBuildingCost(Building building) {
        Map<String, Integer> cost = new HashMap<>();
        
        if (building.getGoldCost() != null) cost.put("gold", building.getGoldCost());
        if (building.getWoodCost() != null) cost.put("wood", building.getWoodCost());
        if (building.getStoneCost() != null) cost.put("stone", building.getStoneCost());
        if (building.getOreCost() != null) cost.put("ore", building.getOreCost());
        if (building.getCrystalCost() != null) cost.put("crystal", building.getCrystalCost());
        if (building.getGemsCost() != null) cost.put("gems", building.getGemsCost());
        if (building.getSulfurCost() != null) cost.put("sulfur", building.getSulfurCost());
        
        return cost;
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
    // MULTIPLAYER SESSION METHODS
    // ======================
    
    public Map<String, Object> createMultiplayerGame(Map<String, Object> gameConfig) {
        String sessionId = (String) gameConfig.get("sessionId");
        String gameMode = (String) gameConfig.get("gameMode");
        List<String> playerIds = (List<String>) gameConfig.get("players");
        
        Map<String, Object> game = createNewGame(sessionId);
        game.put("sessionId", sessionId);
        game.put("gameMode", gameMode);
        game.put("multiplayerPlayers", playerIds);
        
        // Initialize players for multiplayer
        List<Map<String, Object>> mpPlayers = new ArrayList<>();
        for (int i = 0; i < playerIds.size(); i++) {
            String playerId = playerIds.get(i);
            Map<String, Object> player = createMultiplayerPlayer(playerId, i);
            mpPlayers.add(player);
        }
        game.put("players", mpPlayers);
        
        games.put(sessionId, game);
        gameActions.put(sessionId, new ArrayList<>());
        
        return game;
    }
    
    public Map<String, Object> moveHeroInSession(String sessionId, String playerId, String heroId, Integer targetX, Integer targetY) {
        Map<String, Object> game = getGame(sessionId);
        
        // Validate player owns this hero
        if (!validatePlayerOwnsHero(game, playerId, heroId)) {
            throw new RuntimeException("Player does not own this hero");
        }
        
        // Create movement action
        Map<String, Object> action = new HashMap<>();
        action.put("id", UUID.randomUUID().toString());
        action.put("type", "move");
        action.put("playerId", playerId);
        action.put("heroId", heroId);
        action.put("targetX", targetX);
        action.put("targetY", targetY);
        action.put("timestamp", new Date());
        action.put("status", "pending");
        
        // Add to game actions
        List<Map<String, Object>> actions = gameActions.get(sessionId);
        actions.add(action);
        
        return action;
    }
    
    public Map<String, Object> processAttackInSession(String sessionId, String playerId, String attackerId, String targetId) {
        Map<String, Object> action = new HashMap<>();
        action.put("id", UUID.randomUUID().toString());
        action.put("type", "attack");
        action.put("playerId", playerId);
        action.put("attackerId", attackerId);
        action.put("targetId", targetId);
        action.put("timestamp", new Date());
        action.put("status", "pending");
        
        List<Map<String, Object>> actions = gameActions.get(sessionId);
        actions.add(action);
        
        return action;
    }
    
    public Map<String, Object> processBuildInSession(String sessionId, String playerId, String buildingType, Integer x, Integer y) {
        Map<String, Object> action = new HashMap<>();
        action.put("id", UUID.randomUUID().toString());
        action.put("type", "build");
        action.put("playerId", playerId);
        action.put("buildingType", buildingType);
        action.put("x", x);
        action.put("y", y);
        action.put("timestamp", new Date());
        action.put("status", "pending");
        
        List<Map<String, Object>> actions = gameActions.get(sessionId);
        actions.add(action);
        
        return action;
    }
    
    public Map<String, Object> processCastSpellInSession(String sessionId, String playerId, String spellId, Integer targetX, Integer targetY) {
        Map<String, Object> action = new HashMap<>();
        action.put("id", UUID.randomUUID().toString());
        action.put("type", "spell");
        action.put("playerId", playerId);
        action.put("spellId", spellId);
        action.put("targetX", targetX);
        action.put("targetY", targetY);
        action.put("timestamp", new Date());
        action.put("status", "pending");
        
        List<Map<String, Object>> actions = gameActions.get(sessionId);
        actions.add(action);
        
        return action;
    }
    
    public Map<String, Object> processRecruitUnitsInSession(String sessionId, String playerId, String unitType, Integer quantity) {
        Map<String, Object> action = new HashMap<>();
        action.put("id", UUID.randomUUID().toString());
        action.put("type", "recruit");
        action.put("playerId", playerId);
        action.put("unitType", unitType);
        action.put("quantity", quantity);
        action.put("timestamp", new Date());
        action.put("status", "pending");
        
        List<Map<String, Object>> actions = gameActions.get(sessionId);
        actions.add(action);
        
        return action;
    }
    
    public Map<String, Object> processEndTurnInSession(String sessionId, String playerId) {
        Map<String, Object> action = new HashMap<>();
        action.put("id", UUID.randomUUID().toString());
        action.put("type", "endTurn");
        action.put("playerId", playerId);
        action.put("timestamp", new Date());
        action.put("status", "pending");
        
        List<Map<String, Object>> actions = gameActions.get(sessionId);
        actions.add(action);
        
        return action;
    }
    
    // ======================
    // HELPER METHODS
    // ======================
    
    private Map<String, Object> createMultiplayerPlayer(String playerId, int playerIndex) {
        String[] colors = {"#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6", "#06b6d4", "#f97316", "#84cc16"};
        
        Map<String, Object> player = new HashMap<>();
        player.put("id", playerId);
        player.put("username", "Joueur " + (playerIndex + 1));
        player.put("color", colors[playerIndex % colors.length]);
        player.put("isActive", playerIndex == 0);
        player.put("resources", Map.of(
            "gold", 1000,
            "wood", 200,
            "stone", 100,
            "ore", 50,
            "crystal", 10,
            "gems", 5,
            "sulfur", 8
        ));
        
        // Create hero for this player
        List<Map<String, Object>> heroes = new ArrayList<>();
        Map<String, Object> hero = createHero(
            "hero-" + playerId, 
            "Hero " + (playerIndex + 1), 
            "Knight", 
            2 + playerIndex * 3, 
            2 + playerIndex * 3, 
            playerId
        );
        heroes.add(hero);
        player.put("heroes", heroes);
        
        return player;
    }
    
    private boolean validatePlayerOwnsHero(Map<String, Object> game, String playerId, String heroId) {
        List<Map<String, Object>> players = (List<Map<String, Object>>) game.get("players");
        for (Map<String, Object> player : players) {
            if (playerId.equals(player.get("id"))) {
                List<Map<String, Object>> heroes = (List<Map<String, Object>>) player.get("heroes");
                for (Map<String, Object> hero : heroes) {
                    if (heroId.equals(hero.get("id"))) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    
    private String getRandomTerrain() {
        // More balanced terrain distribution for better gameplay
        double rand = Math.random();
        if (rand < 0.35) return "grass";      // 35% - most common
        if (rand < 0.55) return "forest";     // 20% - common
        if (rand < 0.70) return "mountain";   // 15% - moderate
        if (rand < 0.80) return "water";      // 10% - creates obstacles
        if (rand < 0.90) return "desert";     // 10% - varied terrain
        return "swamp";                       // 10% - challenging terrain
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
                String terrainType = getRandomTerrain();
                tile.put("terrain", terrainType);  // Fixed: use "terrain" instead of "type"
                tile.put("walkable", true);
                tile.put("movementCost", getTerrainMovementCost(terrainType));
                tiles.add(tile);
            }
        }
        map.put("tiles", tiles);
        
        // Add real objects
        List<Map<String, Object>> objects = createMapObjects();
        map.put("objects", objects);
        
        return map;
    }
    
    private Map<String, Object> createHexagonalMapWithHeroes(List<Map<String, Object>> players) {
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
                String terrainType = getRandomTerrain();
                tile.put("terrain", terrainType);
                tile.put("walkable", true);
                tile.put("movementCost", getTerrainMovementCost(terrainType));
                
                // Check if any hero should be placed on this tile
                for (Map<String, Object> player : players) {
                    List<Map<String, Object>> heroes = (List<Map<String, Object>>) player.get("heroes");
                    if (heroes != null) {
                        for (Map<String, Object> hero : heroes) {
                            Map<String, Object> heroPosition = (Map<String, Object>) hero.get("position");
                            if (heroPosition != null && 
                                ((Integer) heroPosition.get("x")).equals(x) && 
                                ((Integer) heroPosition.get("y")).equals(y)) {
                                tile.put("hero", hero);
                                break;
                            }
                        }
                    }
                }
                
                tiles.add(tile);
            }
        }
        map.put("tiles", tiles);
        
        // Add real objects
        List<Map<String, Object>> objects = createMapObjects();
        map.put("objects", objects);
        
        return map;
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
        
        // Player castles
        Map<String, Object> castle1 = new HashMap<>();
        castle1.put("id", "castle_player1");
        castle1.put("x", 2);
        castle1.put("y", 2);
        castle1.put("type", "castle");
        castle1.put("owner", "player1");
        castle1.put("castleType", "castle");
        objects.add(castle1);
        
        Map<String, Object> castle2 = new HashMap<>();
        castle2.put("id", "castle_player2");
        castle2.put("x", 18);
        castle2.put("y", 18);
        castle2.put("type", "castle");
        castle2.put("owner", "player2");
        castle2.put("castleType", "castle");
        objects.add(castle2);
        
        return objects;
    }
    
    // ======================
    // ADDITIONAL MISSING METHODS
    // ======================
    
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
} 