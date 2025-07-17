// @module: Temporal Engine Core
// @exposed-to: Frontend (TemporalInterface.tsx), Advanced Scripts
// @related-models: Game, Timeline, PsiState, TemporalEvent
// @endpoints: POST /api/temporal/games, POST /api/temporal/scripts, GET /api/temporal/health
// @description: Moteur temporel principal - gestion des ψ-states, timelines, collapse causal

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
@RequestMapping("/api/temporal")
@CrossOrigin(origins = "http://localhost:3000")
public class TemporalEngineController {
    
    @Autowired
    private TemporalEngineService temporalEngineService;
    
    @Autowired
    private GameRepository gameRepository;
    
    /**
     * Create a new game
     */
    @PostMapping("/games")
    public ResponseEntity<Map<String, Object>> createGame(@RequestBody Map<String, String> request) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            String gameName = request.get("gameName");
            String playerId = request.get("playerId");
            
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
     * Join an existing game
     */
    @PostMapping("/games/{gameId}/join")
    public ResponseEntity<Map<String, Object>> joinGame(
            @PathVariable Long gameId, 
            @RequestBody Map<String, String> request) {
        
        Map<String, Object> response = new HashMap<>();
        
        try {
            String playerId = request.get("playerId");
            
            Game game = gameRepository.findById(gameId).orElseThrow();
            game.addPlayer(playerId);
            gameRepository.save(game);
            
            response.put("success", true);
            response.put("message", "Joined game successfully");
            response.put("playerCount", game.getPlayers().size());
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    /**
     * Start a game
     */
    @PostMapping("/games/{gameId}/start")
    public ResponseEntity<Map<String, Object>> startGame(@PathVariable Long gameId) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            Game game = gameRepository.findById(gameId).orElseThrow();
            
            if (game.canStart()) {
                game.start();
                gameRepository.save(game);
                
                response.put("success", true);
                response.put("message", "Game started successfully");
                response.put("currentPlayer", game.getCurrentPlayer());
                
            } else {
                response.put("success", false);
                response.put("error", "Cannot start game - need at least 2 players");
            }
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    /**
     * Execute a script command
     */
    @PostMapping("/games/{gameId}/script")
    public ResponseEntity<Map<String, Object>> executeScript(
            @PathVariable Long gameId, 
            @RequestBody Map<String, String> request) {
        
        try {
            String script = request.get("script");
            Map<String, Object> result = temporalEngineService.executeScript(gameId, script);
            
            return ResponseEntity.ok(result);
            
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    /**
     * Execute multiple script commands
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
    
    /**
     * Get game state
     */
    @GetMapping("/games/{gameId}/state")
    public ResponseEntity<Map<String, Object>> getGameState(@PathVariable Long gameId) {
        try {
            Map<String, Object> gameState = temporalEngineService.getGameState(gameId);
            return ResponseEntity.ok(gameState);
            
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    /**
     * Advance to next turn
     */
    @PostMapping("/games/{gameId}/next-turn")
    public ResponseEntity<Map<String, Object>> nextTurn(@PathVariable Long gameId) {
        try {
            Map<String, Object> result = temporalEngineService.nextTurn(gameId);
            return ResponseEntity.ok(result);
            
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    /**
     * Get all games
     */
    @GetMapping("/games")
    public ResponseEntity<List<Game>> getAllGames() {
        try {
            List<Game> games = gameRepository.findAll();
            return ResponseEntity.ok(games);
            
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
    
    /**
     * Get available games (waiting for players)
     */
    @GetMapping("/games/available")
    public ResponseEntity<List<Game>> getAvailableGames() {
        try {
            List<Game> games = gameRepository.findAvailableGames(Game.GameStatus.WAITING);
            return ResponseEntity.ok(games);
            
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
    
    /**
     * Demo endpoint - create a sample game with temporal scripts
     */
    @PostMapping("/demo/create-sample-game")
    public ResponseEntity<Map<String, Object>> createSampleGame() {
        Map<String, Object> response = new HashMap<>();
        
        try {
            // Create a new game
            Game game = new Game("Heroes of Time Demo");
            game.addPlayer("player1");
            game.addPlayer("player2");
            game.start();
            gameRepository.save(game);
            
            // Execute sample scripts
            String[] sampleScripts = {
                "HERO(Arthur)",
                "HERO(Ragnar)",
                "CREATE(ITEM, AvantWorldBlade, HERO:Arthur)",
                "MOV(Arthur, @12,10)",
                "MOV(Ragnar, @15,12)",
                "ψ001: ⊙(Δt+2 @14,11 ⟶ MOV(HERO, Arthur, @14,11))",
                "ψ002: ⊙(Δt+3 @14,11 ⟶ BATTLE(HERO Arthur, HERO Ragnar))",
                "Π(Ragnar enters @14,11 at Δt+2) ⇒ †ψ001"
            };
            
            Map<String, Object> scriptResults = new HashMap<>();
            for (int i = 0; i < sampleScripts.length; i++) {
                Map<String, Object> result = temporalEngineService.executeScript(game.getId(), sampleScripts[i]);
                scriptResults.put("script_" + i, result);
            }
            
            response.put("success", true);
            response.put("gameId", game.getId());
            response.put("gameName", game.getGameName());
            response.put("scriptResults", scriptResults);
            response.put("message", "Sample game created with temporal scripts");
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    /**
     * Demo endpoint - test temporal collapse
     */
    @PostMapping("/demo/test-collapse")
    public ResponseEntity<Map<String, Object>> testCollapse() {
        Map<String, Object> response = new HashMap<>();
        
        try {
            // Create a new game
            Game game = new Game("Collapse Test");
            game.addPlayer("player1");
            game.start();
            gameRepository.save(game);
            
            // Create a hero and a ψ state
            temporalEngineService.executeScript(game.getId(), "HERO(TestHero)");
            temporalEngineService.executeScript(game.getId(), "ψ999: ⊙(Δt+1 @10,10 ⟶ MOV(HERO, TestHero, @10,10))");
            
            // Collapse the ψ state
            Map<String, Object> collapseResult = temporalEngineService.executeScript(game.getId(), "†ψ999");
            
            response.put("success", true);
            response.put("gameId", game.getId());
            response.put("collapseResult", collapseResult);
            response.put("message", "Temporal collapse test completed");
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    /**
     * Health check endpoint
     */
    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> health() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "healthy");
        response.put("service", "Heroes of Time Temporal Engine");
        response.put("version", "POC-0.1");
        response.put("timestamp", System.currentTimeMillis());
        
        return ResponseEntity.ok(response);
    }
}