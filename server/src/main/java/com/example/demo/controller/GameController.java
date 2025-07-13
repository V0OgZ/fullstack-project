package com.example.demo.controller;

import com.example.demo.service.GameService;
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
        Map<String, Object> game = gameService.createGame(request);
        return ResponseEntity.ok(game);
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
    @PostMapping("/heroes/{heroId}/move")
    public ResponseEntity<Map<String, Object>> moveHero(
            @PathVariable String heroId,
            @RequestBody Map<String, Object> request) {
        Map<String, Object> action = gameService.moveHero(heroId, request.get("targetPosition"));
        return ResponseEntity.ok(action);
    }

    @PostMapping("/heroes/{heroId}/attack")
    public ResponseEntity<Map<String, Object>> attackTarget(
            @PathVariable String heroId,
            @RequestBody Map<String, Object> request) {
        Map<String, Object> action = gameService.attackTarget(heroId, (String) request.get("targetId"));
        return ResponseEntity.ok(action);
    }

    @PostMapping("/heroes/{heroId}/collect")
    public ResponseEntity<Map<String, Object>> collectResource(
            @PathVariable String heroId,
            @RequestBody Map<String, Object> request) {
        Map<String, Object> action = gameService.collectResource(heroId, (String) request.get("objectId"));
        return ResponseEntity.ok(action);
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
    public ResponseEntity<Void> endTurn(@PathVariable String gameId) {
        gameService.endTurn(gameId);
        return ResponseEntity.ok().build();
    }

    // Combat results endpoints
    @GetMapping("/games/{gameId}/combat-results")
    public ResponseEntity<List<Map<String, Object>>> getCombatResults(@PathVariable String gameId) {
        List<Map<String, Object>> results = gameService.getCombatResults(gameId);
        return ResponseEntity.ok(results);
    }

    // Game state polling
    @GetMapping("/games/{gameId}/state")
    public ResponseEntity<Map<String, Object>> getGameState(@PathVariable String gameId) {
        Map<String, Object> game = gameService.getGameState(gameId);
        return ResponseEntity.ok(game);
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