// @module: Game Management API
// @exposed-to: Frontend (GameInterface.tsx), Test Scripts
// @related-models: Game, Hero, PsiState, Timeline
// @endpoints: GET /api/game/status, POST /api/game/create, GET /api/game/{id}
// @description: Gère les opérations de jeu de base (création, statut, exécution de scripts)

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
@RequestMapping("/api/game")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8000", "http://localhost:5173"})
public class GameController {
    
    @Autowired
    private TemporalEngineService temporalEngineService;
    
    @Autowired
    private GameRepository gameRepository;
    
    /**
     * Game status endpoint
     */
    @GetMapping("/status")
    public ResponseEntity<Map<String, Object>> getStatus() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "running");
        response.put("engine", "Heroes of Time Temporal Engine");
        response.put("version", "POC-0.1");
        response.put("timestamp", System.currentTimeMillis());
        response.put("activeGames", gameRepository.count());
        
        return ResponseEntity.ok(response);
    }
    
    /**
     * Create a new game
     */
    @PostMapping("/create")
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
     * Get game info
     */
    @GetMapping("/{gameId}")
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
    @PostMapping("/{gameId}/script")
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
     * Get all games
     */
    @GetMapping("/all")
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
     * Demo endpoint for testing
     */
    @PostMapping("/demo")
    public ResponseEntity<Map<String, Object>> runDemo() {
        Map<String, Object> response = new HashMap<>();
        
        try {
            // Create a demo game
            Game game = new Game("Demo Game");
            game.addPlayer("demo-player");
            gameRepository.save(game);
            
            // Execute some demo scripts
            temporalEngineService.executeScript(game.getId(), "HERO(Arthur)");
            temporalEngineService.executeScript(game.getId(), "MOV(Arthur, @10,10)");
            temporalEngineService.executeScript(game.getId(), "ψ001: ⊙(Δt+1 @11,11 ⟶ MOV(Arthur, @11,11))");
            
            Map<String, Object> collapseResult = temporalEngineService.executeScript(game.getId(), "†ψ001");
            
            response.put("success", true);
            response.put("gameId", game.getId());
            response.put("collapseResult", collapseResult);
            response.put("message", "Demo completed successfully");
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
}