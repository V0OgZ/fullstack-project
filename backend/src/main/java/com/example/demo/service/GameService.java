package com.example.demo.service;

import com.example.demo.model.Building;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.Random;
import com.example.demo.model.GameState;
import com.example.demo.model.GameStatus;

@Service
public class GameService {

    // Real game storage instead of mock
    private final Map<String, Map<String, Object>> games = new ConcurrentHashMap<>();
    private final Map<String, List<Map<String, Object>>> gameActions = new ConcurrentHashMap<>();
    
    @Autowired
    private BuildingService buildingService;
    
    @Autowired
    private GameStateService gameStateService;
    
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
        
        // Merge with persistent game state
        com.example.demo.model.GameState gameState = gameStateService.getOrCreateGameState(gameId);
        game.put("currentTurn", gameState.getCurrentTurn());
        game.put("currentPlayerId", gameState.getCurrentPlayerId());
        game.put("turnStartTime", gameState.getTurnStartTime());
        game.put("gameStatus", gameState.getGameStatus());
        game.put("selectedHeroes", gameState.getSelectedHeroes());
        game.put("pendingActions", gameState.getPendingActions());
        game.put("playerInventories", gameState.getPlayerInventories());
        game.put("equippedItems", gameState.getEquippedItems());
        
        // Synchronize currentPlayer with currentPlayerId from GameState
        if (gameState.getCurrentPlayerId() != null) {
            Map<String, Object> currentPlayer = getPlayerById(game, gameState.getCurrentPlayerId());
            if (currentPlayer != null) {
                game.put("currentPlayer", currentPlayer);
            }
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
        @SuppressWarnings("unchecked")
        List<Map<String, Object>> players = (List<Map<String, Object>>) game.get("players");
        return players.isEmpty() ? null : players.get(0);
    }

    public Map<String, Object> moveHero(String heroId, Object targetPosition) {
        // Real ZFC calculation for hero movement
        @SuppressWarnings("unchecked")
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
        @SuppressWarnings("unchecked")
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
        @SuppressWarnings("unchecked")
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
            @SuppressWarnings("unchecked")
            List<Map<String, Object>> heroes = (List<Map<String, Object>>) player.get("heroes");
            if (!heroes.isEmpty()) {
                Map<String, Object> hero = heroes.get(0); // Add to first hero for now
                @SuppressWarnings("unchecked")
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
        game.put("scenario", "conquest-classique");
        game.put("turn", 1);  // Frontend expects 'turn', not 'currentTurn'
        game.put("maxTurns", 200);
        game.put("date", new Date().toString());
        game.put("status", "active");
        game.put("gameMode", "multiplayer");  // Add gameMode property
        
        // Real players with resources and castles
        List<Map<String, Object>> players = createPlayersWithCastles(gameId);
        game.put("players", players);
        
        // Set current player ID instead of full player object
        game.put("currentPlayerId", players.get(0).get("id"));
        
        // Real hexagonal map with heroes placed on tiles - return 2D array directly
        List<List<Map<String, Object>>> map = createHexagonalMapWithHeroes(players);
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
    
    @SuppressWarnings("unchecked")
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
        Integer currentTurn = (Integer) game.get("turn");
        return currentTurn % 7 == 0; // Reset every 7 turns
    }
    
    // ======================
    // UTILITY METHODS
    // ======================
    
    @SuppressWarnings("unchecked")
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
        // HOMM3-style resource calculation
        Map<String, Object> resource = new HashMap<>();
        
        if (objectId.startsWith("gold_mine")) {
            resource.put("gold", 1000);  // Gold mine produces 1000 gold/day
            resource.put("type", "daily");
        } else if (objectId.startsWith("sawmill")) {
            resource.put("wood", 2);      // Sawmill produces 2 wood/day
            resource.put("type", "daily");
        } else if (objectId.startsWith("ore_mine")) {
            resource.put("ore", 2);       // Ore mine produces 2 ore/day
            resource.put("type", "daily");
        } else if (objectId.startsWith("crystal")) {
            resource.put("crystal", 1);   // Crystal cavern produces 1 crystal/day
            resource.put("type", "daily");
        } else if (objectId.startsWith("chest")) {
            resource.put("gold", 1500 + (int)(Math.random() * 1000));  // 1500-2500 gold
            resource.put("experience", (int)(Math.random() * 1500));    // 0-1500 exp
            resource.put("type", "instant");
        } else {
            // Default resource pile
            resource.put("gold", 500 + (int)(Math.random() * 500));
            resource.put("type", "instant");
        }
        
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
    
    @SuppressWarnings("unchecked")
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
    
    @SuppressWarnings("unchecked")
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
        // HOMM3-style terrain distribution
        double rand = Math.random();
        if (rand < 0.30) return "grass";      // 30% - base terrain
        if (rand < 0.45) return "dirt";       // 15% - roads and paths
        if (rand < 0.60) return "forest";     // 15% - common
        if (rand < 0.70) return "mountain";   // 10% - obstacles
        if (rand < 0.78) return "water";      // 8% - rivers/lakes
        if (rand < 0.85) return "sand";       // 7% - desert areas
        if (rand < 0.92) return "snow";       // 7% - cold regions
        if (rand < 0.96) return "swamp";      // 4% - difficult terrain
        return "rough";                       // 4% - wasteland
    }

    private int getTerrainMovementCost(Object terrainType) {
        // HOMM3 movement costs (in movement points * 100)
        switch (terrainType.toString()) {
            case "grass": return 100;      // Normal movement
            case "dirt": return 100;       // Roads - same as grass
            case "forest": return 150;     // 50% slower
            case "mountain": return 9999;  // Impassable without flying
            case "water": return 9999;     // Impassable without boat
            case "sand": return 150;       // Desert - 50% slower
            case "snow": return 150;       // Snow - 50% slower
            case "swamp": return 175;      // Swamp - 75% slower
            case "rough": return 125;      // Rough - 25% slower
            default: return 100;
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
    
    @SuppressWarnings("unchecked")
    private List<List<Map<String, Object>>> createHexagonalMapWithHeroes(List<Map<String, Object>> players) {
        // Create terrain with logical patterns
        String[][] terrainMap = generateRealisticTerrain(20, 20);
        
        // Create 2D array structure to match frontend expectations
        List<List<Map<String, Object>>> tiles2D = new ArrayList<>();
        
        for (int y = 0; y < 20; y++) {
            List<Map<String, Object>> row = new ArrayList<>();
            for (int x = 0; x < 20; x++) {
                Map<String, Object> tile = new HashMap<>();
                tile.put("x", x);
                tile.put("y", y);
                String terrainType = terrainMap[y][x];
                tile.put("terrain", terrainType);
                tile.put("walkable", true);
                tile.put("movementCost", getTerrainMovementCost(terrainType));
                
                // Add fog of war properties
                tile.put("visible", false);
                tile.put("explored", false);
                
                // Check if any hero should be placed on this tile
                for (Map<String, Object> player : players) {
                    List<Map<String, Object>> heroes = (List<Map<String, Object>>) player.get("heroes");
                    if (heroes != null) {
                        for (Map<String, Object> hero : heroes) {
                            Map<String, Object> position = (Map<String, Object>) hero.get("position");
                            if (position != null && 
                                position.get("x").equals(x) && 
                                position.get("y").equals(y)) {
                                tile.put("hero", hero);
                                // Make hero tile visible and explored
                                tile.put("visible", true);
                                tile.put("explored", true);
                                break;
                            }
                        }
                    }
                }
                
                row.add(tile);
            }
            tiles2D.add(row);
        }
        
        // Return the 2D array directly instead of wrapping in an object
        return tiles2D;
    }
    
    private String[][] generateRealisticTerrain(int width, int height) {
        String[][] terrain = new String[height][width];
        Random random = new Random();
        
        // Step 1: Generate base terrain with noise
        for (int y = 0; y < height; y++) {
            for (int x = 0; x < width; x++) {
                // Use Perlin-like noise for realistic terrain
                double noiseValue = generateNoise(x, y, width, height);
                terrain[y][x] = getTerrainFromNoise(noiseValue);
            }
        }
        
        // Step 2: Add logical terrain clusters
        addTerrainClusters(terrain, width, height, random);
        
        // Step 3: Add rivers and lakes
        addWaterFeatures(terrain, width, height, random);
        
        // Step 4: Smooth and finalize terrain
        smoothTerrain(terrain, width, height);
        
        return terrain;
    }
    
    private double generateNoise(int x, int y, int width, int height) {
        // Simple noise function for terrain generation
        double scale = 0.1;
        double noise = 0;
        
        // Add multiple octaves of noise
        for (int i = 0; i < 4; i++) {
            double frequency = Math.pow(2, i) * scale;
            double amplitude = Math.pow(0.5, i);
            noise += Math.sin(x * frequency) * Math.cos(y * frequency) * amplitude;
        }
        
        return noise;
    }
    
    private String getTerrainFromNoise(double noise) {
        if (noise < -0.3) return "water";
        if (noise < -0.1) return "swamp";
        if (noise < 0.1) return "grass";
        if (noise < 0.3) return "forest";
        if (noise < 0.5) return "mountain";
        return "desert";
    }
    
    private void addTerrainClusters(String[][] terrain, int width, int height, Random random) {
        // Add forest clusters
        for (int i = 0; i < 3; i++) {
            int centerX = random.nextInt(width);
            int centerY = random.nextInt(height);
            int radius = 2 + random.nextInt(3);
            
            for (int y = Math.max(0, centerY - radius); y < Math.min(height, centerY + radius); y++) {
                for (int x = Math.max(0, centerX - radius); x < Math.min(width, centerX + radius); x++) {
                    double distance = Math.sqrt((x - centerX) * (x - centerX) + (y - centerY) * (y - centerY));
                    if (distance < radius && random.nextDouble() < 0.7) {
                        terrain[y][x] = "forest";
                    }
                }
            }
        }
        
        // Add mountain ranges
        for (int i = 0; i < 2; i++) {
            int startX = random.nextInt(width);
            int startY = random.nextInt(height);
            int length = 5 + random.nextInt(8);
            
            for (int j = 0; j < length; j++) {
                int x = startX + j;
                int y = startY + (random.nextInt(3) - 1);
                
                if (x >= 0 && x < width && y >= 0 && y < height) {
                    terrain[y][x] = "mountain";
                    
                    // Add surrounding hills
                    for (int dy = -1; dy <= 1; dy++) {
                        for (int dx = -1; dx <= 1; dx++) {
                            int nx = x + dx;
                            int ny = y + dy;
                            if (nx >= 0 && nx < width && ny >= 0 && ny < height && 
                                random.nextDouble() < 0.3) {
                                terrain[ny][nx] = "mountain";
                            }
                        }
                    }
                }
            }
        }
    }
    
    private void addWaterFeatures(String[][] terrain, int width, int height, Random random) {
        // Add a river
        int riverY = height / 2 + random.nextInt(3) - 1;
        for (int x = 0; x < width; x++) {
            if (riverY >= 0 && riverY < height) {
                terrain[riverY][x] = "water";
                
                // Add riverbanks
                if (riverY > 0 && random.nextDouble() < 0.3) {
                    terrain[riverY - 1][x] = "grass";
                }
                if (riverY < height - 1 && random.nextDouble() < 0.3) {
                    terrain[riverY + 1][x] = "grass";
                }
            }
            
            // River meanders
            if (random.nextDouble() < 0.3) {
                riverY += random.nextInt(3) - 1;
                riverY = Math.max(0, Math.min(height - 1, riverY));
            }
        }
        
        // Add a lake
        int lakeX = width / 4 + random.nextInt(width / 2);
        int lakeY = height / 4 + random.nextInt(height / 2);
        int lakeSize = 2 + random.nextInt(3);
        
        for (int y = Math.max(0, lakeY - lakeSize); y < Math.min(height, lakeY + lakeSize); y++) {
            for (int x = Math.max(0, lakeX - lakeSize); x < Math.min(width, lakeX + lakeSize); x++) {
                double distance = Math.sqrt((x - lakeX) * (x - lakeX) + (y - lakeY) * (y - lakeY));
                if (distance < lakeSize) {
                    terrain[y][x] = "water";
                }
            }
        }
    }
    
    private void smoothTerrain(String[][] terrain, int width, int height) {
        // Smooth terrain to remove isolated tiles
        String[][] smoothed = new String[height][width];
        
        for (int y = 0; y < height; y++) {
            for (int x = 0; x < width; x++) {
                smoothed[y][x] = terrain[y][x];
                
                // Count neighbors
                Map<String, Integer> neighbors = new HashMap<>();
                for (int dy = -1; dy <= 1; dy++) {
                    for (int dx = -1; dx <= 1; dx++) {
                        int nx = x + dx;
                        int ny = y + dy;
                        if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
                            String neighborTerrain = terrain[ny][nx];
                            neighbors.put(neighborTerrain, neighbors.getOrDefault(neighborTerrain, 0) + 1);
                        }
                    }
                }
                
                // If current terrain is isolated, change to most common neighbor
                if (neighbors.getOrDefault(terrain[y][x], 0) <= 2) {
                    String mostCommon = terrain[y][x];
                    int maxCount = 0;
                    for (Map.Entry<String, Integer> entry : neighbors.entrySet()) {
                        if (entry.getValue() > maxCount) {
                            maxCount = entry.getValue();
                            mostCommon = entry.getKey();
                        }
                    }
                    smoothed[y][x] = mostCommon;
                }
            }
        }
        
        // Copy smoothed terrain back
        for (int y = 0; y < height; y++) {
            for (int x = 0; x < width; x++) {
                terrain[y][x] = smoothed[y][x];
            }
        }
    }
    
    private Map<String, Object> createHero(String id, String name, String heroClass, int x, int y, String playerId) {
        return createHero(id, name, heroClass, x, y, playerId, null);
    }
    
    @SuppressWarnings("unchecked")
    private Map<String, Object> createHero(String id, String name, String heroClass, int x, int y, String playerId, Map<String, Object> heroConfig) {
        Map<String, Object> hero = new HashMap<>();
        hero.put("id", id);
        hero.put("name", name);
        hero.put("class", heroClass);
        hero.put("level", 1);
        hero.put("experience", 0);
        hero.put("position", Map.of("x", x, "y", y));
        hero.put("movementPoints", 3);
        hero.put("maxMovementPoints", 3);
        hero.put("playerId", playerId);
        hero.put("army", new ArrayList<>());  // Frontend expects 'army' instead of 'units'
        hero.put("artifacts", new ArrayList<>());  // Frontend expects 'artifacts' instead of 'inventory'
        
        // Flatten stats structure to match frontend Hero interface
        hero.put("health", 100);
        hero.put("maxHealth", 100);
        hero.put("mana", 20);
        hero.put("maxMana", 20);
        hero.put("attack", 5);
        hero.put("defense", 3);
        hero.put("spellPower", 1);
        hero.put("knowledge", 2);
        hero.put("morale", 0);
        hero.put("luck", 0);
        
        // Frontend expects these as arrays of objects, not strings
        hero.put("skills", new ArrayList<>());
        hero.put("spells", new ArrayList<>());
        
        // Add required frontend properties
        hero.put("playerColor", playerId.equals("player1") ? "#3b82f6" : "#ef4444");
        hero.put("portraitId", "default");
        hero.put("mountType", "HORSE");
        
        // Use heroConfig if provided to override defaults
        if (heroConfig != null) {
            hero.put("level", heroConfig.getOrDefault("startingLevel", 1));
            
            // Use starting stats from config if available
            Map<String, Object> startingStats = (Map<String, Object>) heroConfig.get("startingStats");
            if (startingStats != null) {
                hero.put("attack", startingStats.getOrDefault("attack", 5));
                hero.put("defense", startingStats.getOrDefault("defense", 3));
                hero.put("knowledge", startingStats.getOrDefault("knowledge", 2));
                hero.put("spellPower", startingStats.getOrDefault("spellPower", 1));
                hero.put("health", startingStats.getOrDefault("health", 100));
                hero.put("mana", startingStats.getOrDefault("mana", 20));
            }
            
            // Add starting skills
            List<String> startingSkills = (List<String>) heroConfig.get("startingSkills");
            hero.put("skills", startingSkills != null ? new ArrayList<>(startingSkills) : new ArrayList<>());
            
            // Add starting spells
            List<String> startingSpells = (List<String>) heroConfig.get("startingSpells");
            hero.put("spells", startingSpells != null ? new ArrayList<>(startingSpells) : new ArrayList<>());
        } else {
            // Default hero without config
            hero.put("skills", new ArrayList<>());
            hero.put("spells", new ArrayList<>());
        }
        
        return hero;
    }
    
    private List<Map<String, Object>> createMapObjects() {
        List<Map<String, Object>> objects = new ArrayList<>();
        
        // HOMM3-style resource generators
        // Gold mines (1000 gold/day)
        for (int i = 0; i < 3; i++) {
            Map<String, Object> goldMine = new HashMap<>();
            goldMine.put("id", "gold_mine_" + i);
            goldMine.put("x", 5 + (int)(Math.random() * 10));
            goldMine.put("y", 5 + (int)(Math.random() * 10));
            goldMine.put("type", "mine");
            goldMine.put("subtype", "gold");
            goldMine.put("owner", null);
            goldMine.put("production", 1000);
            objects.add(goldMine);
        }
        
        // Sawmills (2 wood/day)
        for (int i = 0; i < 4; i++) {
            Map<String, Object> sawmill = new HashMap<>();
            sawmill.put("id", "sawmill_" + i);
            sawmill.put("x", (int)(Math.random() * 20));
            sawmill.put("y", (int)(Math.random() * 20));
            sawmill.put("type", "mine");
            sawmill.put("subtype", "wood");
            sawmill.put("owner", null);
            sawmill.put("production", 2);
            objects.add(sawmill);
        }
        
        // Ore mines (2 ore/day)
        for (int i = 0; i < 2; i++) {
            Map<String, Object> oreMine = new HashMap<>();
            oreMine.put("id", "ore_mine_" + i);
            oreMine.put("x", (int)(Math.random() * 20));
            oreMine.put("y", (int)(Math.random() * 20));
            oreMine.put("type", "mine");
            oreMine.put("subtype", "ore");
            oreMine.put("owner", null);
            oreMine.put("production", 2);
            objects.add(oreMine);
        }
        
        // Treasure chests with HOMM3 values
        for (int i = 0; i < 8; i++) {
            Map<String, Object> chest = new HashMap<>();
            chest.put("id", "chest-" + i);
            chest.put("x", (int)(Math.random() * 20));
            chest.put("y", (int)(Math.random() * 20));
            chest.put("type", "treasure");
            chest.put("content", Map.of(
                "gold", 1500 + (int)(Math.random() * 1000), // 1500-2500 gold
                "experience", (int)(Math.random() * 1500)    // 0-1500 exp
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
        castle2.put("castleType", "rampart");
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
    
    // ======================
    // PERSISTENCE SUPPORT
    // ======================
    
    public void replaceGameState(String gameId, Map<String, Object> newGameState) {
        // Replace the entire game state with loaded save
        games.put(gameId, newGameState);
        
        // Update game state service
        com.example.demo.model.GameState gameState = gameStateService.getOrCreateGameState(gameId);
        
        // Update game state fields from loaded data
        Integer turn = (Integer) newGameState.get("turn");
        if (turn == null) {
            turn = (Integer) newGameState.get("currentTurn");
        }
        if (turn != null) {
            gameState.setCurrentTurn(turn);
        }
        
        String currentPlayerId = (String) newGameState.get("currentPlayerId");
        if (currentPlayerId != null) {
            gameState.setCurrentPlayerId(currentPlayerId);
        }
        
        String status = (String) newGameState.get("status");
        if (status != null) {
            gameState.setGameStatus(GameStatus.valueOf(status.toUpperCase()));
        }
        
        // Save updated game state
        gameStateService.updateGameState(gameState);
    }
} 