package com.example.demo.controller;

import com.example.demo.service.GameService;
import com.example.demo.service.GameStateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.ArrayList;
import java.util.HashMap;
import com.example.demo.model.Building;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class GameController {

    @Autowired
    private GameService gameService;
    
    @Autowired
    private GameStateService gameStateService;

    // Game management endpoints
    @GetMapping("/games/{gameId}")
    public ResponseEntity<Map<String, Object>> getGame(@PathVariable String gameId) {
        Map<String, Object> game = gameService.getGame(gameId);
        return ResponseEntity.ok(game);
    }

    @GetMapping("/games/available")
    public ResponseEntity<List<Map<String, Object>>> getAvailableGames() {
        List<Map<String, Object>> games = gameService.getAvailableGames();
        return ResponseEntity.ok(games);
    }

    @PostMapping("/games")
    public ResponseEntity<Map<String, Object>> createGame(@RequestBody Map<String, Object> request) {
        // Validate input data
        Integer playerCount = (Integer) request.get("playerCount");
        if (playerCount != null && playerCount < 1) {
            throw new RuntimeException("Invalid player count: " + playerCount);
        }
        
        Map<String, Object> game = gameService.createGame(request);
        return ResponseEntity.ok(game);
    }

    @PostMapping("/games/multiplayer")
    public ResponseEntity<Map<String, Object>> createMultiplayerSession(@RequestBody Map<String, Object> sessionData) {
        String sessionName = (String) sessionData.getOrDefault("sessionName", "Multiplayer Session");
        Integer maxPlayers = (Integer) sessionData.getOrDefault("maxPlayers", 4);
        String gameMode = (String) sessionData.getOrDefault("gameMode", "conquest-classic");
        String createdBy = (String) sessionData.getOrDefault("createdBy", "anonymous");
        
        // Create a multiplayer game session
        Map<String, Object> session = gameService.createMultiplayerSession(sessionName, maxPlayers, gameMode, createdBy);
        return ResponseEntity.ok(session);
    }

    @GetMapping("/games/joinable")
    public ResponseEntity<Map<String, Object>> getJoinableSessions() {
        // For now, return a mock joinable session
        Map<String, Object> session = gameService.getGame("joinable");
        return ResponseEntity.ok(session);
    }

    @PostMapping("/games/{gameId}/join")
    public ResponseEntity<Map<String, Object>> joinGame(@PathVariable String gameId) {
        Map<String, Object> game = gameService.joinGame(gameId);
        return ResponseEntity.ok(game);
    }

    @GetMapping("/games/{gameId}/current-player")
    public ResponseEntity<Map<String, Object>> getCurrentPlayer(@PathVariable String gameId) {
        Map<String, Object> player = gameService.getCurrentPlayer(gameId);
        return ResponseEntity.ok(player);
    }

    // Hero action endpoints
    @PostMapping("/games/{gameId}/heroes/{heroId}/attack")
    public ResponseEntity<Map<String, Object>> attackTarget(
            @PathVariable String gameId,
            @PathVariable String heroId,
            @RequestBody Map<String, Object> request) {
        try {
            String targetId = (String) request.get("targetId");
            Map<String, Object> result = gameService.attackTarget(heroId, targetId);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "error", e.getMessage()
            ));
        }
    }

    @PostMapping("/games/{gameId}/heroes/{heroId}/collect")
    public ResponseEntity<Map<String, Object>> collectResource(
            @PathVariable String gameId,
            @PathVariable String heroId,
            @RequestBody Map<String, Object> request) {
        try {
            String objectId = (String) request.get("objectId");
            Map<String, Object> result = gameService.collectResource(heroId, objectId);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "error", e.getMessage()
            ));
        }
    }

    // 🌀 FUSION OPUS-MEMENTO : ENDPOINT DE DÉPLACEMENT RÉPARÉ !
    @PostMapping("/games/{gameId}/heroes/{heroId}/move")
    public ResponseEntity<Map<String, Object>> moveHero(
            @PathVariable String gameId,
            @PathVariable String heroId,
            @RequestBody Map<String, Object> request) {
        try {
            @SuppressWarnings("unchecked")
            Map<String, Object> targetPosition = (Map<String, Object>) request.get("targetPosition");
            Integer targetX = (Integer) targetPosition.get("x");
            Integer targetY = (Integer) targetPosition.get("y");
            
            Map<String, Object> result = gameService.moveHero(gameId, heroId, targetX, targetY);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", e.getMessage()
            ));
        }
    }

    // ======================
    // CASTLE BUILDING ENDPOINTS
    // ======================

    @PostMapping("/games/{gameId}/buildings/construct")
    public ResponseEntity<Map<String, Object>> constructBuilding(@PathVariable String gameId,
                                                               @RequestBody Map<String, Object> request) {
        try {
            String playerId = (String) request.get("playerId");
            String castleId = (String) request.get("castleId");
            String buildingType = (String) request.get("buildingType");
            Integer positionX = (Integer) request.get("positionX");
            Integer positionY = (Integer) request.get("positionY");

            Map<String, Object> action = gameService.buildStructure(gameId, playerId, castleId, buildingType, positionX, positionY);
            return ResponseEntity.ok(action);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", e.getMessage()
            ));
        }
    }

    @PostMapping("/games/{gameId}/buildings/{buildingId}/upgrade")
    public ResponseEntity<Map<String, Object>> upgradeBuilding(@PathVariable String gameId,
                                                             @PathVariable String buildingId,
                                                             @RequestBody Map<String, Object> request) {
        try {
            String playerId = (String) request.get("playerId");
            Map<String, Object> action = gameService.upgradeBuilding(gameId, playerId, buildingId);
            return ResponseEntity.ok(action);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", e.getMessage()
            ));
        }
    }

    @PostMapping("/games/{gameId}/buildings/{buildingId}/recruit")
    public ResponseEntity<Map<String, Object>> recruitUnits(@PathVariable String gameId,
                                                          @PathVariable String buildingId,
                                                          @RequestBody Map<String, Object> request) {
        try {
            String playerId = (String) request.get("playerId");
            String unitType = (String) request.get("unitType");
            Integer quantity = (Integer) request.get("quantity");

            Map<String, Object> action = gameService.recruitUnits(gameId, playerId, buildingId, unitType, quantity);
            return ResponseEntity.ok(action);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", e.getMessage()
            ));
        }
    }

    // ===========================
    // TEMPORAL GAMES ENDPOINTS
    // ===========================
    
    @PostMapping("/temporal/games")
    public ResponseEntity<Map<String, Object>> createTemporalGame(@RequestBody Map<String, Object> request) {
        try {
            // Utiliser le GameService existant avec des paramètres temporels
            Map<String, Object> temporalRequest = new HashMap<>(request);
            temporalRequest.put("gameMode", "temporal-engine");
            temporalRequest.put("temporalEnabled", true);
            
            Map<String, Object> game = gameService.createGame(temporalRequest);
            
            // Ajouter des propriétés temporelles spécifiques
            game.put("temporalEngine", "ACTIVE");
            game.put("quantumState", "INITIALIZED");
            game.put("timelineCount", 1);
            
            return ResponseEntity.ok(game);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", "Erreur création jeu temporel: " + e.getMessage(),
                "temporalEngine", "ERROR"
            ));
        }
    }

    @GetMapping("/temporal/games/{gameId}")
    public ResponseEntity<Map<String, Object>> getTemporalGame(@PathVariable String gameId) {
        try {
            Map<String, Object> game = gameService.getGame(gameId);
            
            // Ajouter des informations temporelles
            game.put("temporalEngine", "ACTIVE");
            game.put("quantumState", "STABLE");
            
            return ResponseEntity.ok(game);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", "Jeu temporel non trouvé: " + e.getMessage()
            ));
        }
    }

    @GetMapping("/games/{gameId}/players/{playerId}/buildings")
    public ResponseEntity<List<Building>> getPlayerBuildings(@PathVariable String gameId,
                                                           @PathVariable String playerId) {
        try {
            List<Building> buildings = gameService.getCastleBuildings(gameId, playerId);
            return ResponseEntity.ok(buildings);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ArrayList<>());
        }
    }

    @GetMapping("/games/{gameId}/players/{playerId}/castle/bonuses")
    public ResponseEntity<Map<String, Integer>> getCastleBonuses(@PathVariable String gameId,
                                                               @PathVariable String playerId) {
        try {
            Map<String, Integer> bonuses = gameService.getCastleBonuses(gameId, playerId);
            return ResponseEntity.ok(bonuses);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new HashMap<>());
        }
    }

    @GetMapping("/games/{gameId}/players/{playerId}/units/available")
    public ResponseEntity<Map<String, Integer>> getAvailableUnits(@PathVariable String gameId,
                                                                @PathVariable String playerId) {
        try {
            Map<String, Integer> units = gameService.getAvailableUnitsForRecruitment(gameId, playerId);
            return ResponseEntity.ok(units);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new HashMap<>());
        }
    }

    @GetMapping("/games/{gameId}/players/{playerId}/spells/available")
    public ResponseEntity<List<String>> getAvailableSpells(@PathVariable String gameId,
                                                         @PathVariable String playerId) {
        try {
            List<String> spells = gameService.getAvailableSpells(gameId, playerId);
            return ResponseEntity.ok(spells);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ArrayList<>());
        }
    }

    // Action management endpoints
    @PostMapping("/actions/{actionId}/cancel")
    public ResponseEntity<Void> cancelAction(@PathVariable String actionId) {
        gameService.cancelAction(actionId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/games/{gameId}/actions/pending")
    public ResponseEntity<List<Map<String, Object>>> getPendingActions(@PathVariable String gameId) {
        List<Map<String, Object>> actions = gameService.getPendingActions(gameId);
        return ResponseEntity.ok(actions);
    }

    // Turn management endpoints
    @PostMapping("/games/{gameId}/end-turn")
    public ResponseEntity<Map<String, Object>> endTurn(@PathVariable String gameId, @RequestBody Map<String, String> request) {
        try {
            String playerId = request.get("playerId");
            
            if (!gameStateService.isPlayerTurn(gameId, playerId)) {
                Map<String, Object> error = new HashMap<>();
                error.put("error", "Not your turn");
                return ResponseEntity.badRequest().body(error);
            }
            
            // Pass the current player ID to the service
            gameStateService.endPlayerTurn(gameId, playerId);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Turn ended successfully");
            response.put("currentTurn", gameStateService.getOrCreateGameState(gameId).getCurrentTurn());
            response.put("currentPlayerId", gameStateService.getOrCreateGameState(gameId).getCurrentPlayerId());
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", "Failed to end turn: " + e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    // Combat results endpoints
    @GetMapping("/games/{gameId}/combat-results")
    public ResponseEntity<List<Map<String, Object>>> getCombatResults(@PathVariable String gameId) {
        List<Map<String, Object>> results = gameService.getCombatResults(gameId);
        return ResponseEntity.ok(results);
    }

    // Get complete game state
    @GetMapping("/games/{gameId}/state")
    public ResponseEntity<Map<String, Object>> getGameState(@PathVariable String gameId, @RequestParam String playerId) {
        try {
            Map<String, Object> game = gameService.getGame(gameId);
            
            // Add player-specific CRITICAL game state only
            Map<String, Object> response = new HashMap<>(game);
            response.put("selectedHero", gameStateService.getSelectedHero(gameId, playerId));
            response.put("playerResources", gameStateService.getPlayerResources(gameId, playerId));
            response.put("isPlayerTurn", gameStateService.isPlayerTurn(gameId, playerId));
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", "Failed to get game state: " + e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    // ======================
    // HERO MANAGEMENT - CRITICAL GAME STATE
    // ======================
    
    @PostMapping("/games/{gameId}/select-hero")
    public ResponseEntity<Map<String, Object>> selectHero(@PathVariable String gameId, @RequestBody Map<String, String> request) {
        try {
            String playerId = request.get("playerId");
            String heroId = request.get("heroId");
            
            gameStateService.selectHero(gameId, playerId, heroId);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("selectedHero", heroId);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", "Failed to select hero: " + e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    @PostMapping("/games/{gameId}/move-hero")
    public ResponseEntity<Map<String, Object>> moveHero(@PathVariable String gameId, @RequestBody Map<String, Object> request) {
        try {
            String heroId = (String) request.get("heroId");
            Object positionObj = request.get("position");
            
            // Safely cast to Map<String, Integer>
            @SuppressWarnings("unchecked")
            Map<String, Integer> position = (Map<String, Integer>) positionObj;
            
            gameStateService.updateHeroPosition(gameId, heroId, position.get("x"), position.get("y"));
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("heroId", heroId);
            response.put("newPosition", position);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", "Failed to move hero: " + e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    // ======================
    // RESOURCE MANAGEMENT - CRITICAL GAME STATE
    // ======================
    
    @PostMapping("/games/{gameId}/update-resources")
    public ResponseEntity<Map<String, Object>> updatePlayerResources(@PathVariable String gameId, @RequestBody Map<String, Object> request) {
        try {
            String playerId = (String) request.get("playerId");
            String resourceType = (String) request.get("resourceType");
            Integer amount = (Integer) request.get("amount");
            
            gameStateService.updatePlayerResources(gameId, playerId, resourceType, amount);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("updatedResources", gameStateService.getPlayerResources(gameId, playerId));
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", "Failed to update resources: " + e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    // ======================
    // 🌀 QUANTUM ACTIONS - NOUVEAU SYSTÈME UNIFIÉ
    // ======================

    @PostMapping("/games/{gameId}/heroes/{heroId}/quantum-action")
    public ResponseEntity<Map<String, Object>> executeQuantumAction(
            @PathVariable String gameId,
            @PathVariable String heroId,
            @RequestBody Map<String, Object> request) {
        try {
            String action = (String) request.get("action");
            Map<String, Object> params = (Map<String, Object>) request.getOrDefault("params", new HashMap<>());
            
            Map<String, Object> result = gameService.executeHeroQuantumAction(gameId, heroId, action, params);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", "Erreur action quantique: " + e.getMessage(),
                "error", e.getClass().getSimpleName()
            ));
        }
    }

    @GetMapping("/games/{gameId}/quantum/scripts")
    public ResponseEntity<Map<String, String>> getQuantumScripts(@PathVariable String gameId) {
        try {
            Map<String, String> scripts = gameService.loadHeroQuantumScripts();
            return ResponseEntity.ok(scripts);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "error", "Erreur chargement scripts: " + e.getMessage()
            ));
        }
    }

    @GetMapping("/games/{gameId}/quantum/validate")
    public ResponseEntity<Map<String, Object>> validateQuantumScripts(@PathVariable String gameId) {
        try {
            Map<String, Object> validation = gameService.validateAllQuantumScripts();
            return ResponseEntity.ok(validation);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", "Erreur validation: " + e.getMessage()
            ));
        }
    }

    // Utility endpoints
    @GetMapping("/games/{gameId}/history")
    public ResponseEntity<List<Map<String, Object>>> getGameHistory(@PathVariable String gameId) {
        List<Map<String, Object>> history = gameService.getGameHistory(gameId);
        return ResponseEntity.ok(history);
    }

    // Health check endpoint
    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> health() {
        return ResponseEntity.ok(Map.of("status", "UP"));
    }
} 