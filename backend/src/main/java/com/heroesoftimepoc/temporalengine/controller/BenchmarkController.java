package com.heroesoftimepoc.temporalengine.controller;

import com.heroesoftimepoc.temporalengine.service.NativeScenarioService;
import com.heroesoftimepoc.temporalengine.service.TemporalEngineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

/**
 * Controller pour les benchmarks NATIVE vs SCRIPT
 * Permet de comparer les performances entre Java hardcodé et JSON+HOTS
 */
@RestController
@RequestMapping("/api/benchmark")
@CrossOrigin(origins = "*")
public class BenchmarkController {
    
    @Autowired
    private NativeScenarioService nativeScenarioService;
    
    @Autowired
    private TemporalEngineService temporalEngineService;
    
    /**
     * Exécuter un scénario en mode NATIF (Java hardcodé)
     */
    @PostMapping("/native/{scenarioName}")
    public ResponseEntity<Map<String, Object>> executeNativeScenario(
            @PathVariable String scenarioName,
            @RequestParam Long gameId) {
        
        Map<String, Object> result;
        
        switch (scenarioName) {
            case "bataille_temporelle_setup":
                result = nativeScenarioService.executeBatailleTemporelleSetupNative(gameId);
                break;
            case "bataille_temporelle_combat":
                result = nativeScenarioService.executeBatailleTemporelleCombatNative(gameId);
                break;
            default:
                result = new HashMap<>();
                result.put("success", false);
                result.put("error", "Unknown native scenario: " + scenarioName);
                result.put("availableScenarios", Arrays.asList("bataille_temporelle_setup", "bataille_temporelle_combat"));
        }
        
        return ResponseEntity.ok(result);
    }
    
    /**
     * Exécuter un scénario en mode SCRIPT (JSON + HOTS)
     */
    @PostMapping("/script/{scenarioName}")
    public ResponseEntity<Map<String, Object>> executeScriptScenario(
            @PathVariable String scenarioName,
            @RequestParam Long gameId) {
        
        Map<String, Object> result = new HashMap<>();
        
        try {
            // Charger le scénario JSON et l'exécuter via le moteur temporel
            String scenarioPath = "game_assets/tests/json/" + scenarioName + ".json";
            result = executeScriptFromFile(gameId, scenarioPath);
            
        } catch (Exception e) {
            result.put("success", false);
            result.put("error", "Script scenario execution failed: " + e.getMessage());
            result.put("scenarioType", "SCRIPT_JSON_HOTS");
        }
        
        return ResponseEntity.ok(result);
    }
    
    /**
     * Benchmark complet: NATIVE vs SCRIPT
     */
    @PostMapping("/compare/{scenarioName}")
    public ResponseEntity<Map<String, Object>> benchmarkNativeVsScript(
            @PathVariable String scenarioName,
            @RequestParam Long gameId,
            @RequestParam(defaultValue = "5") int iterations) {
        
        Map<String, Object> result = new HashMap<>();
        List<Map<String, Object>> nativeResults = new ArrayList<>();
        List<Map<String, Object>> scriptResults = new ArrayList<>();
        
        // Mesurer les performances NATIVE
        long totalNativeTime = 0;
        int nativeSuccessCount = 0;
        
        for (int i = 0; i < iterations; i++) {
            long startTime = System.nanoTime();
            
            Map<String, Object> nativeResult = null;
            switch (scenarioName) {
                case "bataille_temporelle_setup":
                    nativeResult = nativeScenarioService.executeBatailleTemporelleSetupNative(gameId + i);
                    break;
                case "bataille_temporelle_combat":
                    nativeResult = nativeScenarioService.executeBatailleTemporelleCombatNative(gameId + i);
                    break;
            }
            
            long endTime = System.nanoTime();
            double executionTimeMs = (endTime - startTime) / 1_000_000.0;
            
            if (nativeResult != null && (Boolean) nativeResult.getOrDefault("success", false)) {
                totalNativeTime += (endTime - startTime);
                nativeSuccessCount++;
                
                Map<String, Object> iterationResult = new HashMap<>();
                iterationResult.put("iteration", i + 1);
                iterationResult.put("executionTimeMs", executionTimeMs);
                iterationResult.put("success", true);
                nativeResults.add(iterationResult);
            } else {
                Map<String, Object> iterationResult = new HashMap<>();
                iterationResult.put("iteration", i + 1);
                iterationResult.put("executionTimeMs", executionTimeMs);
                iterationResult.put("success", false);
                iterationResult.put("error", nativeResult != null ? nativeResult.get("error") : "Unknown error");
                nativeResults.add(iterationResult);
            }
        }
        
        // Mesurer les performances SCRIPT
        long totalScriptTime = 0;
        int scriptSuccessCount = 0;
        
        for (int i = 0; i < iterations; i++) {
            long startTime = System.nanoTime();
            
            String scenarioPath = "game_assets/tests/json/" + scenarioName + ".json";
            Map<String, Object> scriptResult = executeScriptFromFile(gameId + iterations + i, scenarioPath);
            
            long endTime = System.nanoTime();
            double executionTimeMs = (endTime - startTime) / 1_000_000.0;
            
            if ((Boolean) scriptResult.getOrDefault("success", false)) {
                totalScriptTime += (endTime - startTime);
                scriptSuccessCount++;
                
                Map<String, Object> iterationResult = new HashMap<>();
                iterationResult.put("iteration", i + 1);
                iterationResult.put("executionTimeMs", executionTimeMs);
                iterationResult.put("success", true);
                scriptResults.add(iterationResult);
            } else {
                Map<String, Object> iterationResult = new HashMap<>();
                iterationResult.put("iteration", i + 1);
                iterationResult.put("executionTimeMs", executionTimeMs);
                iterationResult.put("success", false);
                iterationResult.put("error", scriptResult.get("error"));
                scriptResults.add(iterationResult);
            }
        }
        
        // Calculer les statistiques
        double avgNativeTimeMs = nativeSuccessCount > 0 ? (totalNativeTime / 1_000_000.0) / nativeSuccessCount : 0;
        double avgScriptTimeMs = scriptSuccessCount > 0 ? (totalScriptTime / 1_000_000.0) / scriptSuccessCount : 0;
        
        // Assembler les résultats du benchmark
        result.put("benchmarkType", "NATIVE_vs_SCRIPT");
        result.put("scenarioName", scenarioName);
        result.put("iterations", iterations);
        result.put("timestamp", new Date());
        
        Map<String, Object> nativeStats = new HashMap<>();
        nativeStats.put("avgTimeMs", avgNativeTimeMs);
        nativeStats.put("successCount", nativeSuccessCount);
        nativeStats.put("successRate", (double) nativeSuccessCount / iterations * 100);
        nativeStats.put("totalTimeMs", totalNativeTime / 1_000_000.0);
        nativeStats.put("results", nativeResults);
        
        Map<String, Object> scriptStats = new HashMap<>();
        scriptStats.put("avgTimeMs", avgScriptTimeMs);
        scriptStats.put("successCount", scriptSuccessCount);
        scriptStats.put("successRate", (double) scriptSuccessCount / iterations * 100);
        scriptStats.put("totalTimeMs", totalScriptTime / 1_000_000.0);
        scriptStats.put("results", scriptResults);
        
        result.put("native", nativeStats);
        result.put("script", scriptStats);
        
        // Calcul de la comparaison
        Map<String, Object> comparison = new HashMap<>();
        if (avgNativeTimeMs > 0 && avgScriptTimeMs > 0) {
            if (avgNativeTimeMs < avgScriptTimeMs) {
                comparison.put("winner", "NATIVE");
                comparison.put("speedup", avgScriptTimeMs / avgNativeTimeMs);
            } else {
                comparison.put("winner", "SCRIPT");
                comparison.put("speedup", avgNativeTimeMs / avgScriptTimeMs);
            }
            comparison.put("differencePercent", ((avgScriptTimeMs - avgNativeTimeMs) / avgNativeTimeMs) * 100);
        } else {
            comparison.put("winner", "INCONCLUSIVE");
            comparison.put("reason", "Insufficient successful executions");
        }
        
        result.put("comparison", comparison);
        result.put("success", true);
        
        return ResponseEntity.ok(result);
    }
    
    /**
     * Lister les scénarios disponibles pour benchmark
     */
    @GetMapping("/scenarios")
    public ResponseEntity<Map<String, Object>> getAvailableScenarios() {
        Map<String, Object> result = new HashMap<>();
        
        List<Map<String, Object>> scenarios = new ArrayList<>();
        
        Map<String, Object> setup = new HashMap<>();
        setup.put("name", "bataille_temporelle_setup");
        setup.put("title", "Bataille Temporelle - Setup");
        setup.put("difficulty", "INTERMEDIATE");
        setup.put("description", "Configuration initiale avec héros, artefacts et zones temporelles");
        setup.put("estimatedDuration", "3-5 minutes");
        scenarios.add(setup);
        
        Map<String, Object> combat = new HashMap<>();
        combat.put("name", "bataille_temporelle_combat");
        combat.put("title", "Bataille Temporelle - Combat");
        combat.put("difficulty", "ADVANCED");
        combat.put("description", "Combat avec mécaniques temporelles complexes");
        combat.put("estimatedDuration", "8-12 minutes");
        combat.put("prerequisites", Arrays.asList("bataille_temporelle_setup"));
        scenarios.add(combat);
        
        result.put("scenarios", scenarios);
        result.put("totalCount", scenarios.size());
        result.put("benchmarkTypes", Arrays.asList("NATIVE", "SCRIPT", "COMPARISON"));
        
        return ResponseEntity.ok(result);
    }
    
    /**
     * Obtenir les statistiques de performance globales
     */
    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getBenchmarkStats() {
        Map<String, Object> result = new HashMap<>();
        
        // Statistiques depuis PerformanceMetricsService
        result.put("systemStats", getSystemPerformanceStats());
        result.put("availableMetrics", Arrays.asList(
            "native_scenarios_success", 
            "native_scenarios_error",
            "script_scenarios_success",
            "script_scenarios_error",
            "avg_native_execution_time",
            "avg_script_execution_time"
        ));
        
        return ResponseEntity.ok(result);
    }
    
    // =============================================
    // MÉTHODES PRIVÉES
    // =============================================
    
    private Map<String, Object> executeScriptFromFile(Long gameId, String scenarioPath) {
        Map<String, Object> result = new HashMap<>();
        
        try {
            // Pour l'instant, simulation d'exécution de script
            // TODO: Implémenter le chargement et l'exécution du JSON
            
            // Simuler l'exécution du scénario via des commandes HOTS
            result = simulateScriptExecution(gameId, scenarioPath);
            
        } catch (Exception e) {
            result.put("success", false);
            result.put("error", "Failed to execute script scenario: " + e.getMessage());
            result.put("scenarioType", "SCRIPT_JSON_HOTS");
        }
        
        return result;
    }
    
    private Map<String, Object> simulateScriptExecution(Long gameId, String scenarioPath) {
        Map<String, Object> result = new HashMap<>();
        
        // Simulation basique - remplacer par la vraie implémentation
        result.put("success", true);
        result.put("scenarioType", "SCRIPT_JSON_HOTS");
        result.put("scenarioPath", scenarioPath);
        result.put("gameId", gameId);
        result.put("phasesExecuted", 9);
        result.put("actionsExecuted", 25);
        result.put("executionMethod", "SIMULATED");
        
        return result;
    }
    
    private Map<String, Object> getSystemPerformanceStats() {
        Map<String, Object> stats = new HashMap<>();
        
        Runtime runtime = Runtime.getRuntime();
        stats.put("totalMemoryMB", runtime.totalMemory() / 1024 / 1024);
        stats.put("freeMemoryMB", runtime.freeMemory() / 1024 / 1024);
        stats.put("usedMemoryMB", (runtime.totalMemory() - runtime.freeMemory()) / 1024 / 1024);
        stats.put("availableProcessors", runtime.availableProcessors());
        stats.put("timestamp", new Date());
        
        return stats;
    }
} 