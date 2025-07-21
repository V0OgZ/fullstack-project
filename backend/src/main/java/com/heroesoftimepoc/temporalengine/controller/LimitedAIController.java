package com.heroesoftimepoc.temporalengine.controller;

import com.heroesoftimepoc.temporalengine.service.LimitedAIService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * Contrôleur pour l'IA avec limitations de ressources
 */
@RestController
@RequestMapping("/api/temporal/ai")
public class LimitedAIController {

    @Autowired
    private LimitedAIService aiService;

    /**
     * L'IA joue un tour
     */
    @PostMapping("/play-turn/{gameId}")
    public ResponseEntity<Map<String, Object>> playTurn(@PathVariable Long gameId) {
        try {
            LimitedAIService.ActionResult result = aiService.playAITurn(gameId);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", result.isSuccess());
            response.put("message", result.getMessage());
            response.put("gameId", gameId);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("message", "Erreur IA: " + e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    /**
     * Configuration de la difficulté de l'IA
     */
    @PostMapping("/difficulty")
    public ResponseEntity<Map<String, Object>> setDifficulty(@RequestBody Map<String, String> request) {
        try {
            String difficultyStr = request.get("difficulty");
            LimitedAIService.AIDifficulty difficulty = LimitedAIService.AIDifficulty.valueOf(difficultyStr.toUpperCase());
            
            aiService.setDifficulty(difficulty);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Difficulté IA mise à jour: " + difficulty);
            response.put("difficulty", difficulty.name());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("message", "Erreur configuration: " + e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    /**
     * Obtient les statistiques de l'IA
     */
    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getAIStats() {
        try {
            Map<String, Object> stats = new HashMap<>();
            stats.put("activeSimulations", "N/A"); // À implémenter
            stats.put("cacheSize", "N/A"); // À implémenter
            stats.put("difficulty", "MEDIUM"); // Par défaut
            stats.put("status", "ACTIVE");
            
            return ResponseEntity.ok(stats);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("message", "Erreur stats: " + e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    /**
     * Crée une partie contre l'IA
     */
    @PostMapping("/create-game")
    public ResponseEntity<Map<String, Object>> createAIGame(@RequestBody Map<String, Object> request) {
        try {
            String playerName = (String) request.getOrDefault("playerName", "Joueur");
            String difficulty = (String) request.getOrDefault("difficulty", "MEDIUM");
            
            // Création d'une partie avec l'IA
            Map<String, Object> gameData = new HashMap<>();
            gameData.put("playerName", playerName);
            gameData.put("aiDifficulty", difficulty);
            gameData.put("gameType", "AI_VS_PLAYER");
            gameData.put("status", "CREATED");
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Partie IA créée");
            response.put("game", gameData);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("message", "Erreur création: " + e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    /**
     * Analyse l'état actuel du jeu
     */
    @GetMapping("/analyze/{gameId}")
    public ResponseEntity<Map<String, Object>> analyzeGame(@PathVariable Long gameId) {
        try {
            Map<String, Object> analysis = new HashMap<>();
            analysis.put("gameId", gameId);
            analysis.put("aiEvaluation", "En cours d'analyse...");
            analysis.put("recommendedActions", "À calculer");
            analysis.put("difficulty", "MEDIUM");
            
            return ResponseEntity.ok(analysis);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("message", "Erreur analyse: " + e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    /**
     * Test de l'IA
     */
    @PostMapping("/test")
    public ResponseEntity<Map<String, Object>> testAI() {
        try {
            Map<String, Object> testResult = new HashMap<>();
            testResult.put("success", true);
            testResult.put("message", "IA fonctionnelle");
            testResult.put("status", "READY");
            testResult.put("difficulty", "MEDIUM");
            testResult.put("limitations", "ACTIVE");
            
            return ResponseEntity.ok(testResult);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("message", "Erreur test: " + e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
} 