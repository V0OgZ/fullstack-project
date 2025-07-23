package com.heroesoftimepoc.temporalengine.controller;

import com.heroesoftimepoc.temporalengine.model.Game;
import com.heroesoftimepoc.temporalengine.repository.GameRepository;
import com.heroesoftimepoc.temporalengine.service.TemporalEngineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8000", "http://localhost:5173"})
public class ApiGamesController {
    
    @Autowired
    private TemporalEngineService temporalEngineService;
    
    @Autowired
    private GameRepository gameRepository;
    
    /**
     * Health check endpoint
     */
    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> health() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "healthy");
        response.put("service", "Heroes of Time API");
        response.put("version", "POC-0.1");
        response.put("timestamp", System.currentTimeMillis());
        response.put("activeGames", gameRepository.count());
        
        return ResponseEntity.ok(response);
    }
    
    /**
     * Create a new game - Main endpoint for tests
     */
    @PostMapping("/games")
    public ResponseEntity<Map<String, Object>> createGame(@RequestBody Map<String, String> request) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            String gameName = request.getOrDefault("gameName", "Test Game");
            String playerId = request.getOrDefault("playerId", "player1");
            
            Game game = new Game(gameName);
            game.addPlayer(playerId);
            gameRepository.save(game);
            
            response.put("success", true);
            response.put("gameId", game.getId());
            response.put("gameName", game.getGameName());
            response.put("message", "Game created successfully");
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    /**
     * Get all games
     */
    @GetMapping("/games")
    public ResponseEntity<Map<String, Object>> getAllGames() {
        Map<String, Object> response = new HashMap<>();
        
        try {
            List<Game> games = gameRepository.findAll();
            
            response.put("success", true);
            response.put("games", games);
            response.put("count", games.size());
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    /**
     * Get game by ID
     */
    @GetMapping("/games/{gameId}")
    public ResponseEntity<Map<String, Object>> getGame(@PathVariable Long gameId) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            Game game = gameRepository.findById(gameId).orElseThrow();
            
            response.put("success", true);
            response.put("gameId", game.getId());
            response.put("gameName", game.getGameName());
            response.put("players", game.getPlayers());
            response.put("status", game.getStatus());
            response.put("currentPlayer", game.getCurrentPlayer());
            response.put("turnCount", game.getCurrentTurn());
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    /**
     * Execute a temporal script
     */
    @PostMapping("/games/{gameId}/script")
    public ResponseEntity<Map<String, Object>> executeScript(
            @PathVariable Long gameId, 
            @RequestBody Map<String, String> request) {
        
        Map<String, Object> response = new HashMap<>();
        
        try {
            String script = request.get("script");
            
            Map<String, Object> result = temporalEngineService.executeScript(gameId, script);
            
            response.put("success", true);
            response.put("result", result);
            response.put("message", "Script executed successfully");
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    /**
     * Execute multiple temporal scripts
     */
    @PostMapping("/games/{gameId}/scripts")
    public ResponseEntity<Map<String, Object>> executeScripts(
            @PathVariable Long gameId, 
            @RequestBody Map<String, Object> request) {
        
        Map<String, Object> response = new HashMap<>();
        
        try {
            @SuppressWarnings("unchecked")
            List<String> scripts = (List<String>) request.get("scripts");
            
            Map<String, Object> results = new HashMap<>();
            
            for (int i = 0; i < scripts.size(); i++) {
                String script = scripts.get(i);
                Map<String, Object> result = temporalEngineService.executeScript(gameId, script);
                results.put("script_" + i, result);
                
                // Stop execution if there's an error
                if (Boolean.FALSE.equals(result.get("success"))) {
                    break;
                }
            }
            
            response.put("success", true);
            response.put("results", results);
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
} 