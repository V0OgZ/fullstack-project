package com.heroesoftimepoc.temporalengine.controller;

import com.heroesoftimepoc.temporalengine.model.Game;
import com.heroesoftimepoc.temporalengine.repository.GameRepository;
import com.heroesoftimepoc.temporalengine.service.CausalPerformanceLimitsService;
import com.heroesoftimepoc.temporalengine.service.CausalPerformanceLimitsService.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.HashMap;

/**
 * 🚀 CONTRÔLEUR DE PERFORMANCE CAUSALE
 * ===================================
 * API REST pour surveiller et gérer les performances du graphe causale
 */
@RestController
@RequestMapping("/api/causal-performance")
@CrossOrigin(origins = "*")
public class CausalPerformanceController {
    
    @Autowired
    private CausalPerformanceLimitsService performanceLimitsService;
    
    @Autowired
    private GameRepository gameRepository;
    
    /**
     * 📊 GET /api/causal-performance/metrics/{gameId}
     * Obtenir les métriques de performance d'un jeu
     */
    @GetMapping("/metrics/{gameId}")
    public ResponseEntity<Map<String, Object>> getPerformanceMetrics(@PathVariable Long gameId) {
        try {
            Game game = gameRepository.findById(gameId).orElseThrow();
            CausalLimitsResult limitsResult = performanceLimitsService.checkPerformanceLimits(game);
            
            Map<String, Object> response = new HashMap<>();
            response.put("gameId", gameId);
            response.put("metrics", limitsResult.getMetrics());
            response.put("violations", limitsResult.getViolations());
            response.put("warnings", limitsResult.getWarnings());
            response.put("status", limitsResult.hasViolations() ? "CRITICAL" : 
                                 limitsResult.hasWarnings() ? "WARNING" : "OK");
            response.put("timestamp", System.currentTimeMillis());
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    /**
     * 🧹 POST /api/causal-performance/cleanup/{gameId}
     * Nettoyer les états ψ expirés d'un jeu
     */
    @PostMapping("/cleanup/{gameId}")
    public ResponseEntity<Map<String, Object>> cleanupExpiredStates(@PathVariable Long gameId) {
        try {
            Game game = gameRepository.findById(gameId).orElseThrow();
            CleanupResult cleanupResult = performanceLimitsService.cleanupExpiredStates(game);
            
            // Sauvegarder les changements
            gameRepository.save(game);
            
            Map<String, Object> response = new HashMap<>();
            response.put("gameId", gameId);
            response.put("cleanedCount", cleanupResult.cleanedCount);
            response.put("expiredStates", cleanupResult.expiredStates);
            response.put("message", cleanupResult.cleanedCount + " états ψ expirés nettoyés");
            response.put("success", true);
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", e.getMessage());
            error.put("success", false);
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    /**
     * ⚡ POST /api/causal-performance/optimize/{gameId}
     * Optimiser les performances d'un jeu
     */
    @PostMapping("/optimize/{gameId}")
    public ResponseEntity<Map<String, Object>> optimizePerformance(@PathVariable Long gameId) {
        try {
            Game game = gameRepository.findById(gameId).orElseThrow();
            OptimizationResult optimizationResult = performanceLimitsService.optimizePerformance(game);
            
            // Sauvegarder les changements
            gameRepository.save(game);
            
            // Recalculer les métriques après optimisation
            CausalLimitsResult newLimits = performanceLimitsService.checkPerformanceLimits(game);
            
            Map<String, Object> response = new HashMap<>();
            response.put("gameId", gameId);
            response.put("success", optimizationResult.success);
            response.put("actions", optimizationResult.actions);
            response.put("newMetrics", newLimits.getMetrics());
            response.put("remainingViolations", newLimits.getViolations());
            response.put("message", "Optimisation terminée - " + optimizationResult.actions.size() + " actions effectuées");
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", e.getMessage());
            error.put("success", false);
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    /**
     * 📈 GET /api/causal-performance/limits
     * Obtenir les limites de performance configurées
     */
    @GetMapping("/limits")
    public ResponseEntity<Map<String, Object>> getPerformanceLimits() {
        Map<String, Object> limits = new HashMap<>();
        limits.put("maxPsiStatesPerGame", 1000); // Augmenté pour tester les vraies limites
        limits.put("maxTemporalDaysRange", 5);  // ±5 jours
        limits.put("maxInterferenceCalculations", 500); // Augmenté aussi
        limits.put("maxGraphNodes", 2000); // Augmenté pour supporter plus de ψ-states
        limits.put("performanceWarningThreshold", 0.8); // 80%
        
        limits.put("description", "Limites de performance pour le graphe causale (mode test)");
        limits.put("purpose", "Tester où le système casse vraiment");
        
        return ResponseEntity.ok(limits);
    }
    
    /**
     * 🎯 GET /api/causal-performance/status/{gameId}
     * Obtenir un résumé du statut de performance
     */
    @GetMapping("/status/{gameId}")
    public ResponseEntity<Map<String, Object>> getPerformanceStatus(@PathVariable Long gameId) {
        try {
            Game game = gameRepository.findById(gameId).orElseThrow();
            CausalPerformanceMetrics metrics = performanceLimitsService.getGameMetrics(gameId);
            
            Map<String, Object> status = new HashMap<>();
            status.put("gameId", gameId);
            status.put("gameName", game.getGameName());
            status.put("systemLoad", metrics.systemLoad);
            status.put("activePsiStates", metrics.activePsiStates);
            status.put("maxTemporalRange", "±" + metrics.maxTemporalRange + " jours");
            status.put("graphComplexity", metrics.graphComplexity + " nœuds");
            
            // Déterminer le statut global
            String globalStatus;
            if (metrics.systemLoad >= 1.0) {
                globalStatus = "🔴 CRITIQUE - Limites dépassées";
            } else if (metrics.systemLoad >= 0.8) {
                globalStatus = "🟡 ATTENTION - Approche des limites";
            } else if (metrics.systemLoad >= 0.5) {
                globalStatus = "🟢 NORMAL - Performance acceptable";
            } else {
                globalStatus = "🟢 OPTIMAL - Performance excellente";
            }
            
            status.put("status", globalStatus);
            status.put("recommendation", getRecommendation(metrics));
            
            return ResponseEntity.ok(status);
            
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    /**
     * 💡 OBTENIR UNE RECOMMANDATION BASÉE SUR LES MÉTRIQUES
     */
    private String getRecommendation(CausalPerformanceMetrics metrics) {
        if (metrics.systemLoad >= 1.0) {
            return "Optimisation urgente recommandée - utiliser /optimize";
        } else if (metrics.systemLoad >= 0.8) {
            return "Surveiller de près - envisager un nettoyage avec /cleanup";
        } else if (metrics.activePsiStates > 50) {
            return "Beaucoup d'états ψ actifs - surveiller la complexité";
        } else if (metrics.maxTemporalRange > 3) {
            return "Portée temporelle élevée - limiter les prédictions lointaines";
        } else {
            return "Performance optimale - continuer le gameplay normal";
        }
    }
} 