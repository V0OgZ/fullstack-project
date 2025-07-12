package com.example.demo.controller;

import com.example.demo.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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