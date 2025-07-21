// @module: Temporal Engine Core
// @exposed-to: Frontend (TemporalInterface.tsx), Advanced Scripts
// @related-models: Game, Timeline, PsiState, TemporalEvent
// @endpoints: POST /api/temporal/games, POST /api/temporal/scripts, GET /api/temporal/health
// @description: Moteur temporel principal - gestion des ψ-states, timelines, collapse causal

package com.heroesoftimepoc.temporalengine.controller;

import com.heroesoftimepoc.temporalengine.model.Game;
import com.heroesoftimepoc.temporalengine.repository.GameRepository;
import com.heroesoftimepoc.temporalengine.service.TemporalEngineService;
import com.heroesoftimepoc.temporalengine.service.TemporalCacheService;
import com.heroesoftimepoc.temporalengine.service.ObservationTriggerService;
import com.heroesoftimepoc.temporalengine.service.GameInitializationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.ArrayList;
import java.util.Set;

@RestController
@RequestMapping("/api/temporal")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8000", "http://localhost:5173"})
public class TemporalEngineController {
    
    @Autowired
    private TemporalEngineService temporalEngineService;
    
    @Autowired
    private GameRepository gameRepository;
    
    @Autowired
    private TemporalCacheService cacheService;
    
    @Autowired
    private ObservationTriggerService observationTriggerService;
    
    @Autowired
    private GameInitializationService gameInitializationService;
    
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
            
            // Initialiser le jeu avec tuiles et économie
            gameInitializationService.initializeGame(game);
            gameInitializationService.initializePlayerEconomy(game, playerId);
            
            response.put("success", true);
            response.put("gameId", game.getId());
            response.put("gameName", game.getGameName());
            response.put("tilesInitialized", game.getTiles().size());
            response.put("message", "Game created and initialized successfully");
            
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
            Map<String, Object> gameState = temporalEngineService.getQuantumGameStateWithTemporalInfo(gameId);
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
    
    // ========================================================================
    // 🚀 ENHANCED TEMPORAL ENGINE ENDPOINTS
    // ========================================================================
    
    /**
     * Cache management and statistics
     */
    @GetMapping("/cache/stats")
    public ResponseEntity<Map<String, Object>> getCacheStatistics() {
        try {
            Map<String, Object> stats = cacheService.getCacheStatistics();
            return ResponseEntity.ok(stats);
            
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    /**
     * Clear cache for a specific game
     */
    @DeleteMapping("/cache/games/{gameId}")
    public ResponseEntity<Map<String, Object>> clearGameCache(@PathVariable Long gameId) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            cacheService.invalidateGameCache(gameId);
            
            response.put("success", true);
            response.put("message", "Cache cleared for game " + gameId);
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    /**
     * Preload cache for a game
     */
    @PostMapping("/cache/games/{gameId}/preload")
    public ResponseEntity<Map<String, Object>> preloadGameCache(@PathVariable Long gameId) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            Game game = gameRepository.findById(gameId).orElseThrow();
            cacheService.preloadGameCache(game);
            
            response.put("success", true);
            response.put("message", "Cache preloaded for game " + gameId);
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    /**
     * Register observation trigger Π(condition) ⇒ †ψ001
     */
    @PostMapping("/games/{gameId}/observation-trigger")
    public ResponseEntity<Map<String, Object>> registerObservationTrigger(
            @PathVariable Long gameId, 
            @RequestBody Map<String, String> request) {
        
        Map<String, Object> response = new HashMap<>();
        
        try {
            String observationScript = request.get("trigger");
            
            observationTriggerService.registerObservationTrigger(gameId, observationScript);
            
            response.put("success", true);
            response.put("message", "Observation trigger registered");
            response.put("trigger", observationScript);
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    /**
     * Get observation trigger statistics
     */
    @GetMapping("/games/{gameId}/observation-triggers")
    public ResponseEntity<Map<String, Object>> getObservationTriggers(@PathVariable Long gameId) {
        try {
            Map<String, Object> stats = observationTriggerService.getObservationStatistics(gameId);
            List<ObservationTriggerService.ObservationTrigger> triggers = 
                observationTriggerService.getActiveTriggers(gameId);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("statistics", stats);
            response.put("activeTriggers", triggers);
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    /**
     * Force check observation triggers
     */
    @PostMapping("/games/{gameId}/check-triggers")
    public ResponseEntity<Map<String, Object>> checkObservationTriggers(@PathVariable Long gameId) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            Game game = gameRepository.findById(gameId).orElseThrow();
            List<String> collapsesToTrigger = observationTriggerService.checkTriggersAndGetCollapses(game);
            
            // Execute collapses
            List<Map<String, Object>> collapseResults = new ArrayList<>();
            for (String psiId : collapsesToTrigger) {
                Map<String, Object> collapseResult = temporalEngineService.executeScript(gameId, "†" + psiId);
                collapseResults.add(collapseResult);
            }
            
            response.put("success", true);
            response.put("triggeredCollapses", collapsesToTrigger.size());
            response.put("collapseResults", collapseResults);
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    /**
     * Advanced game state with performance metrics
     */
    @GetMapping("/games/{gameId}/enhanced-state")
    public ResponseEntity<Map<String, Object>> getEnhancedGameState(@PathVariable Long gameId) {
        try {
            long startTime = System.currentTimeMillis();
            
            // Get game state (potentially from cache)
            Object cachedGame = cacheService.getCachedGameState(gameId);
            Game game = cachedGame instanceof Game ? (Game) cachedGame : gameRepository.findById(gameId).orElseThrow();
            
            Map<String, Object> gameState = temporalEngineService.getQuantumGameStateWithTemporalInfo(gameId);
            
            // Add cache statistics
            Map<String, Object> cacheStats = cacheService.getCacheStatistics();
            
            // Add observation trigger statistics
            Map<String, Object> observationStats = observationTriggerService.getObservationStatistics(gameId);
            
            // Performance metrics
            long executionTime = System.currentTimeMillis() - startTime;
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("gameState", gameState);
            response.put("cacheStatistics", cacheStats);
            response.put("observationStatistics", observationStats);
            response.put("performanceMetrics", Map.of(
                "executionTimeMs", executionTime,
                "cacheUsed", cacheService.getCachedGameState(gameId) != null
            ));
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    /**
     * Temporal engine performance optimization
     */
    @PostMapping("/optimize")
    public ResponseEntity<Map<String, Object>> optimizeEngine() {
        Map<String, Object> response = new HashMap<>();
        
        try {
            // Clean expired cache entries
            cacheService.cleanExpiredEntries();
            
            // Get performance metrics
            Map<String, Object> cacheStats = cacheService.getCacheStatistics();
            
            response.put("success", true);
            response.put("message", "Temporal engine optimized");
            response.put("cacheStatistics", cacheStats);
            response.put("timestamp", System.currentTimeMillis());
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    /**
     * BROADCAST INTELLIGENT - Évite la surcharge serveur
     * Broadcast seulement les événements critiques
     */
    @PostMapping("/broadcast")
    public ResponseEntity<Map<String, Object>> broadcastEvent(@RequestBody Map<String, Object> request) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            String eventType = (String) request.get("eventType");
            Map<String, Object> data = (Map<String, Object>) request.get("data");
            Long gameId = request.get("gameId") != null ? Long.valueOf(request.get("gameId").toString()) : null;
            
            // Liste des événements critiques qui méritent un broadcast
            Set<String> criticalEvents = Set.of(
                "COLLAPSE_CAUSAL",
                "HERO_DEATH", 
                "BOSS_ACTION",
                "SCENARIO_PHASE_CHANGE",
                "CAPACITY_SPECIALE_ACTIVEE",
                "FORGE_DANGEREUSE"
            );
            
            // Vérifier si c'est un événement critique
            if (!criticalEvents.contains(eventType)) {
                response.put("success", true);
                response.put("message", "Événement non-critique ignoré (économie serveur)");
                response.put("ignored", true);
                return ResponseEntity.ok(response);
            }
            
            // Log de l'événement critique
            System.out.println("📡 BROADCAST CRITIQUE: " + eventType);
            System.out.println("   Données: " + data);
            
            // Traitement spécifique selon le type d'événement
            switch (eventType) {
                case "COLLAPSE_CAUSAL":
                    handleCausalCollapseBroadcast(data, gameId);
                    break;
                case "HERO_DEATH":
                    handleHeroDeathBroadcast(data, gameId);
                    break;
                case "BOSS_ACTION":
                    handleBossActionBroadcast(data, gameId);
                    break;
                case "CAPACITY_SPECIALE_ACTIVEE":
                    handleSpecialCapacityBroadcast(data, gameId);
                    break;
                case "FORGE_DANGEREUSE":
                    handleDangerousForgeBroadcast(data, gameId);
                    break;
                default:
                    // Événement critique non géré spécifiquement
                    break;
            }
            
            response.put("success", true);
            response.put("message", "Broadcast critique traité");
            response.put("eventType", eventType);
            response.put("timestamp", System.currentTimeMillis());
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("error", "Erreur lors du broadcast: " + e.getMessage());
        }
        
        return ResponseEntity.ok(response);
    }
    
    /**
     * Gestion du broadcast pour collapse causal
     */
    private void handleCausalCollapseBroadcast(Map<String, Object> data, Long gameId) {
        System.out.println("🌀 Collapse causal détecté - Notification aux joueurs");
        // Ici on pourrait envoyer une notification aux joueurs connectés
        // Mais sans WebSocket, on se contente de logger
    }
    
    /**
     * Gestion du broadcast pour mort de héros
     */
    private void handleHeroDeathBroadcast(Map<String, Object> data, Long gameId) {
        String heroName = (String) data.get("hero");
        System.out.println("💀 Mort du héros " + heroName + " - Notification aux joueurs");
    }
    
    /**
     * Gestion du broadcast pour action de boss
     */
    private void handleBossActionBroadcast(Map<String, Object> data, Long gameId) {
        String boss = (String) data.get("boss");
        String action = (String) data.get("action");
        System.out.println("👹 Action de boss " + boss + ": " + action + " - Notification aux joueurs");
    }
    
    /**
     * Gestion du broadcast pour capacité spéciale
     */
    private void handleSpecialCapacityBroadcast(Map<String, Object> data, Long gameId) {
        String capacity = (String) data.get("capacity");
        String hero = (String) data.get("hero");
        System.out.println("⚔️ Capacité spéciale " + capacity + " activée par " + hero + " - Notification aux joueurs");
    }
    
    /**
     * Gestion du broadcast pour forge dangereuse
     */
    private void handleDangerousForgeBroadcast(Map<String, Object> data, Long gameId) {
        String objectName = (String) data.get("objectName");
        Double riskLevel = (Double) data.get("riskLevel");
        System.out.println("⚠️ Forge dangereuse: " + objectName + " (risque: " + riskLevel + ") - Notification aux joueurs");
    }
}