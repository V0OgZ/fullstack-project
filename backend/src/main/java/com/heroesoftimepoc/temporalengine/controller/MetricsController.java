package com.heroesoftimepoc.temporalengine.controller;

import com.heroesoftimepoc.temporalengine.service.PerformanceMetricsService;
import com.heroesoftimepoc.temporalengine.service.TemporalEngineService;
import com.heroesoftimepoc.temporalengine.repository.GameRepository;
import com.heroesoftimepoc.temporalengine.repository.PsiStateRepository;
import com.heroesoftimepoc.temporalengine.repository.HeroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * MetricsController - Exposition des métriques de performance
 * Contrôleur pour exposer les métriques temporelles au frontend
 */
@RestController
@RequestMapping("/api/metrics")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8000", "http://localhost:8001"})
public class MetricsController {
    
    @Autowired
    private PerformanceMetricsService performanceMetrics;
    
    @Autowired
    private TemporalEngineService temporalEngineService;
    
    @Autowired
    private GameRepository gameRepository;
    
    @Autowired
    private PsiStateRepository psiStateRepository;
    
    @Autowired
    private HeroRepository heroRepository;
    
    /**
     * Obtenir les métriques temporelles générales
     */
    @GetMapping("/temporal")
    public ResponseEntity<Map<String, Object>> getTemporalMetrics() {
        Map<String, Object> metrics = new HashMap<>();
        
        try {
            // Métriques d'exécution
            metrics.put("totalScriptsExecuted", performanceMetrics.getCounter("quantum_scripts_executed") + 
                                               performanceMetrics.getCounter("classic_scripts_executed"));
            metrics.put("quantumScriptsExecuted", performanceMetrics.getCounter("quantum_scripts_executed"));
            metrics.put("classicScriptsExecuted", performanceMetrics.getCounter("classic_scripts_executed"));
            metrics.put("successfulExecutions", performanceMetrics.getCounter("successful_script_executions"));
            metrics.put("executionErrors", performanceMetrics.getCounter("script_execution_errors"));
            metrics.put("executionExceptions", performanceMetrics.getCounter("script_execution_exceptions"));
            
            // Métriques de jeu
            metrics.put("totalGames", gameRepository.count());
            metrics.put("totalPsiStates", psiStateRepository.count());
            metrics.put("totalHeroes", heroRepository.count());
            
            // Métriques d'erreur
            metrics.put("gameNotFoundErrors", performanceMetrics.getCounter("game_not_found_errors"));
            
            // Statut
            metrics.put("status", "healthy");
            metrics.put("timestamp", System.currentTimeMillis());
            
            return ResponseEntity.ok(metrics);
            
        } catch (Exception e) {
            metrics.put("status", "error");
            metrics.put("error", e.getMessage());
            metrics.put("timestamp", System.currentTimeMillis());
            return ResponseEntity.status(500).body(metrics);
        }
    }
    
    /**
     * Obtenir les métriques de performance détaillées
     */
    @GetMapping("/performance")
    public ResponseEntity<Map<String, Object>> getPerformanceMetrics() {
        Map<String, Object> metrics = new HashMap<>();
        
        try {
            // Métriques d'opération
            metrics.put("executeTemporalGameScript", performanceMetrics.getOperationStats("executeTemporalGameScript"));
            metrics.put("quantumScriptExecution", performanceMetrics.getOperationStats("quantum_script_execution"));
            metrics.put("classicScriptExecution", performanceMetrics.getOperationStats("classic_script_execution"));
            metrics.put("scriptTypeDetection", performanceMetrics.getOperationStats("script_type_detection"));
            metrics.put("quantumObservationTriggers", performanceMetrics.getOperationStats("quantum_observation_triggers"));
            metrics.put("quantumTileUpdates", performanceMetrics.getOperationStats("quantum_tile_updates"));
            metrics.put("gameSave", performanceMetrics.getOperationStats("game_save"));
            
            // Métriques système
            metrics.put("timestamp", System.currentTimeMillis());
            metrics.put("status", "healthy");
            
            return ResponseEntity.ok(metrics);
            
        } catch (Exception e) {
            metrics.put("status", "error");
            metrics.put("error", e.getMessage());
            metrics.put("timestamp", System.currentTimeMillis());
            return ResponseEntity.status(500).body(metrics);
        }
    }
    
    /**
     * Obtenir les métriques de collapse causale
     */
    @GetMapping("/collapse")
    public ResponseEntity<Map<String, Object>> getCollapseMetrics() {
        Map<String, Object> metrics = new HashMap<>();
        
        try {
            // Métriques de collapse par jeu
            Long gameId = 1L; // Jeu par défaut pour les métriques
            
            if (gameRepository.existsById(gameId)) {
                // Récupérer les statistiques via le service temporal
                Map<String, Object> gameMetrics = temporalEngineService.getQuantumGameStateWithTemporalInfo(gameId);
                
                if (gameMetrics.containsKey("quantumAnalysis")) {
                    Map<String, Object> analysis = (Map<String, Object>) gameMetrics.get("quantumAnalysis");
                    metrics.put("totalComplexQuantumStates", analysis.get("totalComplexQuantumStates"));
                    metrics.put("totalClassicQuantumStates", analysis.get("totalClassicQuantumStates"));
                    metrics.put("totalInterferenceZones", analysis.get("totalInterferenceZones"));
                    metrics.put("interferenceZones", analysis.get("interferenceZones"));
                }
            }
            
            // Métriques générales
            metrics.put("totalActivePsiStates", psiStateRepository.countByStatus("ACTIVE"));
            metrics.put("totalCollapsedPsiStates", psiStateRepository.countByStatus("COLLAPSED"));
            metrics.put("totalTriggeredPsiStates", psiStateRepository.countByStatus("TRIGGERED"));
            
            metrics.put("timestamp", System.currentTimeMillis());
            metrics.put("status", "healthy");
            
            return ResponseEntity.ok(metrics);
            
        } catch (Exception e) {
            metrics.put("status", "error");
            metrics.put("error", e.getMessage());
            metrics.put("timestamp", System.currentTimeMillis());
            return ResponseEntity.status(500).body(metrics);
        }
    }
    
    /**
     * Obtenir les métriques spécifiques à un jeu
     */
    @GetMapping("/game/{gameId}")
    public ResponseEntity<Map<String, Object>> getGameMetrics(@PathVariable Long gameId) {
        Map<String, Object> metrics = new HashMap<>();
        
        try {
            if (!gameRepository.existsById(gameId)) {
                metrics.put("status", "error");
                metrics.put("error", "Game not found");
                return ResponseEntity.notFound().build();
            }
            
            // Récupérer les métriques via le service temporal
            Map<String, Object> gameState = temporalEngineService.getQuantumGameStateWithTemporalInfo(gameId);
            
            // Extraire les métriques importantes
            metrics.put("gameId", gameId);
            metrics.put("currentTurn", gameState.get("currentTurn"));
            metrics.put("currentPlayer", gameState.get("currentPlayer"));
            metrics.put("status", gameState.get("status"));
            metrics.put("currentTimeline", gameState.get("currentTimeline"));
            
            // Compter les entités
            if (gameState.containsKey("heroes")) {
                metrics.put("heroCount", ((java.util.List) gameState.get("heroes")).size());
            }
            
            if (gameState.containsKey("quantumStates")) {
                metrics.put("quantumStateCount", ((java.util.List) gameState.get("quantumStates")).size());
            }
            
            if (gameState.containsKey("tiles")) {
                metrics.put("tileCount", ((java.util.List) gameState.get("tiles")).size());
            }
            
            // Analyse quantique
            if (gameState.containsKey("quantumAnalysis")) {
                metrics.put("quantumAnalysis", gameState.get("quantumAnalysis"));
            }
            
            metrics.put("timestamp", System.currentTimeMillis());
            
            return ResponseEntity.ok(metrics);
            
        } catch (Exception e) {
            metrics.put("status", "error");
            metrics.put("error", e.getMessage());
            metrics.put("timestamp", System.currentTimeMillis());
            return ResponseEntity.status(500).body(metrics);
        }
    }
    
    /**
     * Réinitialiser les métriques
     */
    @PostMapping("/reset")
    public ResponseEntity<Map<String, Object>> resetMetrics() {
        Map<String, Object> result = new HashMap<>();
        
        try {
            // Réinitialiser les compteurs
            performanceMetrics.resetCounters();
            
            result.put("status", "success");
            result.put("message", "Metrics reset successfully");
            result.put("timestamp", System.currentTimeMillis());
            
            return ResponseEntity.ok(result);
            
        } catch (Exception e) {
            result.put("status", "error");
            result.put("error", e.getMessage());
            result.put("timestamp", System.currentTimeMillis());
            return ResponseEntity.status(500).body(result);
        }
    }
    
    /**
     * Obtenir le statut de santé du système temporel
     */
    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> getHealthStatus() {
        Map<String, Object> health = new HashMap<>();
        
        try {
            // Vérifier les composants principaux
            health.put("database", gameRepository.count() >= 0 ? "healthy" : "unhealthy");
            health.put("temporalEngine", "healthy");
            health.put("performanceMetrics", performanceMetrics != null ? "healthy" : "unhealthy");
            
            // Statistiques rapides
            health.put("totalGames", gameRepository.count());
            health.put("totalPsiStates", psiStateRepository.count());
            health.put("totalHeroes", heroRepository.count());
            
            // Statut global
            health.put("status", "healthy");
            health.put("service", "Heroes of Time - Temporal Engine");
            health.put("version", "1.0.0-TEMPORAL");
            health.put("timestamp", System.currentTimeMillis());
            
            return ResponseEntity.ok(health);
            
        } catch (Exception e) {
            health.put("status", "unhealthy");
            health.put("error", e.getMessage());
            health.put("timestamp", System.currentTimeMillis());
            return ResponseEntity.status(500).body(health);
        }
    }
} 