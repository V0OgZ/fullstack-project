package com.heroesoftimepoc.temporalengine.controller;

import com.heroesoftimepoc.temporalengine.model.ComplexAmplitude;
import com.heroesoftimepoc.temporalengine.model.PsiState;
import com.heroesoftimepoc.temporalengine.service.QuantumInterferenceService;
import com.heroesoftimepoc.temporalengine.service.QuantumMigrationService;
import com.heroesoftimepoc.temporalengine.service.TemporalEngineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

/**
 * Contrôleur REST pour les fonctionnalités quantiques
 */
@RestController
@RequestMapping("/api/quantum")
@CrossOrigin(origins = "*")
public class QuantumController {
    
    @Autowired
    private QuantumInterferenceService quantumInterferenceService;
    
    @Autowired
    private QuantumMigrationService quantumMigrationService;
    
    @Autowired
    private TemporalEngineService temporalEngineService;
    
    /**
     * Analyse les interférences quantiques dans un jeu
     */
    @GetMapping("/analysis/{gameId}")
    public ResponseEntity<Map<String, Object>> analyzeQuantumState(@PathVariable Long gameId) {
        try {
            Map<String, Object> gameState = temporalEngineService.getQuantumGameStateWithTemporalInfo(gameId);
            if (gameState.containsKey("quantumAnalysis")) {
                return ResponseEntity.ok(gameState);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Erreur lors de l'analyse quantique: " + e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }
    
    /**
     * Calcule l'interférence à une position spécifique
     */
    @GetMapping("/interference/{gameId}/position/{x}/{y}")
    public ResponseEntity<Map<String, Object>> calculateInterferenceAtPosition(
            @PathVariable Long gameId, 
            @PathVariable int x, 
            @PathVariable int y) {
        try {
            // Récupérer le jeu (simplifié pour l'exemple)
            Map<String, Object> gameState = temporalEngineService.getQuantumGameStateWithTemporalInfo(gameId);
            
            // Calculer l'interférence (nécessiterait une méthode publique dans TemporalEngineService)
            Map<String, Object> result = new HashMap<>();
            result.put("position", Map.of("x", x, "y", y));
            result.put("message", "Calcul d'interférence à la position (" + x + "," + y + ")");
            result.put("interferenceType", "CONSTRUCTIVE"); // Placeholder
            result.put("combinedProbability", 1.5); // Placeholder
            
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Erreur lors du calcul d'interférence: " + e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }
    
    /**
     * Crée un scénario d'interférence quantique
     */
    @PostMapping("/scenario/{gameId}")
    public ResponseEntity<Map<String, Object>> createQuantumScenario(
            @PathVariable Long gameId,
            @RequestBody Map<String, Object> scenarioData) {
        try {
            @SuppressWarnings("unchecked")
            Map<String, Integer> position = (Map<String, Integer>) scenarioData.get("position");
            @SuppressWarnings("unchecked")
            List<Map<String, Double>> amplitudeData = (List<Map<String, Double>>) scenarioData.get("amplitudes");
            
            if (position == null || amplitudeData == null) {
                Map<String, Object> errorResponse = new HashMap<>();
                errorResponse.put("error", "Position et amplitudes requises");
                return ResponseEntity.badRequest().body(errorResponse);
            }
            
            int x = position.get("x");
            int y = position.get("y");
            
            List<ComplexAmplitude> amplitudes = new ArrayList<>();
            for (Map<String, Double> ampData : amplitudeData) {
                double realPart = ampData.getOrDefault("realPart", 1.0);
                double imaginaryPart = ampData.getOrDefault("imaginaryPart", 0.0);
                amplitudes.add(new ComplexAmplitude(realPart, imaginaryPart));
            }
            
            Map<String, Object> result = temporalEngineService.createQuantumInterferenceScenario(gameId, x, y, amplitudes);
            return ResponseEntity.ok(result);
            
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Erreur lors de la création du scénario: " + e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }
    
    /**
     * Effectue la migration vers les amplitudes complexes
     */
    @PostMapping("/migrate/{gameId}")
    public ResponseEntity<Map<String, Object>> migrateToQuantumAmplitudes(@PathVariable Long gameId) {
        try {
            Map<String, Object> result = temporalEngineService.migrateToQuantumAmplitudes(gameId);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Erreur lors de la migration: " + e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }
    
    /**
     * Test la migration sans l'appliquer
     */
    @PostMapping("/test-migration/{gameId}")
    public ResponseEntity<Map<String, Object>> testMigration(
            @PathVariable Long gameId,
            @RequestParam(defaultValue = "true") boolean toComplex) {
        try {
            QuantumMigrationService.MigrationResult result = quantumMigrationService.testMigration(gameId, toComplex);
            
            Map<String, Object> response = new HashMap<>();
            response.put("migrationResult", result.toString());
            response.put("candidateStates", result.getMigratedStates());
            response.put("incompatibleStates", result.getSkippedStates());
            response.put("messages", result.getMessages());
            response.put("success", result.isSuccess());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Erreur lors du test de migration: " + e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }
    
    /**
     * Génère un rapport de migration détaillé
     */
    @GetMapping("/migration-report/{gameId}")
    public ResponseEntity<Map<String, Object>> getMigrationReport(@PathVariable Long gameId) {
        try {
            Map<String, Object> report = temporalEngineService.getQuantumMigrationAnalysis(gameId);
            return ResponseEntity.ok(report);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Erreur lors de la génération du rapport: " + e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }
    
    /**
     * Optimise les phases pour l'interférence constructive
     */
    @PostMapping("/optimize-constructive/{gameId}")
    public ResponseEntity<Map<String, Object>> optimizeConstructiveInterference(
            @PathVariable Long gameId,
            @RequestBody Map<String, Object> optimizationData) {
        try {
            @SuppressWarnings("unchecked")
            Map<String, Integer> position = (Map<String, Integer>) optimizationData.get("position");
            
            if (position == null) {
                Map<String, Object> errorResponse = new HashMap<>();
                errorResponse.put("error", "Position requise pour l'optimisation");
                return ResponseEntity.badRequest().body(errorResponse);
            }
            
            // Placeholder pour l'optimisation
            Map<String, Object> result = new HashMap<>();
            result.put("message", "Optimisation pour interférence constructive effectuée");
            result.put("position", position);
            result.put("optimizationType", "CONSTRUCTIVE");
            result.put("success", true);
            
            return ResponseEntity.ok(result);
            
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Erreur lors de l'optimisation: " + e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }
    
    /**
     * Optimise les phases pour l'interférence destructive
     */
    @PostMapping("/optimize-destructive/{gameId}")
    public ResponseEntity<Map<String, Object>> optimizeDestructiveInterference(
            @PathVariable Long gameId,
            @RequestBody Map<String, Object> optimizationData) {
        try {
            @SuppressWarnings("unchecked")
            Map<String, Integer> position = (Map<String, Integer>) optimizationData.get("position");
            
            if (position == null) {
                Map<String, Object> errorResponse = new HashMap<>();
                errorResponse.put("error", "Position requise pour l'optimisation");
                return ResponseEntity.badRequest().body(errorResponse);
            }
            
            // Placeholder pour l'optimisation
            Map<String, Object> result = new HashMap<>();
            result.put("message", "Optimisation pour interférence destructive effectuée");
            result.put("position", position);
            result.put("optimizationType", "DESTRUCTIVE");
            result.put("success", true);
            
            return ResponseEntity.ok(result);
            
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Erreur lors de l'optimisation: " + e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }
    
    /**
     * Simule l'évolution temporelle des interférences
     */
    @PostMapping("/simulate-evolution/{gameId}")
    public ResponseEntity<Map<String, Object>> simulateTemporalEvolution(
            @PathVariable Long gameId,
            @RequestBody Map<String, Object> simulationData) {
        try {
            Integer steps = (Integer) simulationData.getOrDefault("steps", 10);
            @SuppressWarnings("unchecked")
            Map<String, Integer> position = (Map<String, Integer>) simulationData.get("position");
            
            if (position == null) {
                Map<String, Object> errorResponse = new HashMap<>();
                errorResponse.put("error", "Position requise pour la simulation");
                return ResponseEntity.badRequest().body(errorResponse);
            }
            
            // Placeholder pour la simulation
            Map<String, Object> result = new HashMap<>();
            result.put("message", "Simulation d'évolution temporelle effectuée");
            result.put("position", position);
            result.put("steps", steps);
            result.put("evolution", "Données d'évolution simulées");
            result.put("success", true);
            
            return ResponseEntity.ok(result);
            
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Erreur lors de la simulation: " + e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }
    
    /**
     * Obtient la compatibilité quantique d'un jeu
     */
    @GetMapping("/compatibility/{gameId}")
    public ResponseEntity<Map<String, Object>> getQuantumCompatibility(@PathVariable Long gameId) {
        try {
            Map<String, Object> compatibility = quantumMigrationService.analyzeGameCompatibility(gameId);
            return ResponseEntity.ok(compatibility);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Erreur lors de l'analyse de compatibilité: " + e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }
    
    /**
     * Exécute un script quantique avec syntaxe complexe
     */
    @PostMapping("/execute-script/{gameId}")
    public ResponseEntity<Map<String, Object>> executeQuantumScript(
            @PathVariable Long gameId,
            @RequestBody Map<String, Object> scriptData) {
        try {
            String script = (String) scriptData.get("script");
            
            if (script == null || script.trim().isEmpty()) {
                Map<String, Object> errorResponse = new HashMap<>();
                errorResponse.put("error", "Script requis");
                return ResponseEntity.badRequest().body(errorResponse);
            }
            
            Map<String, Object> result = temporalEngineService.executeScript(gameId, script);
            return ResponseEntity.ok(result);
            
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Erreur lors de l'exécution du script: " + e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }
    
    /**
     * Obtient les statistiques quantiques d'un jeu
     */
    @GetMapping("/statistics/{gameId}")
    public ResponseEntity<Map<String, Object>> getQuantumStatistics(@PathVariable Long gameId) {
        try {
            Map<String, Object> gameState = temporalEngineService.getQuantumGameStateWithTemporalInfo(gameId);
            Map<String, Object> statistics = new HashMap<>();
            
            if (gameState.containsKey("quantumAnalysis")) {
                @SuppressWarnings("unchecked")
                Map<String, Object> quantumAnalysis = (Map<String, Object>) gameState.get("quantumAnalysis");
                
                statistics.put("totalComplexStates", quantumAnalysis.get("totalComplexStates"));
                statistics.put("totalClassicStates", quantumAnalysis.get("totalClassicStates"));
                statistics.put("totalInterferenceZones", quantumAnalysis.get("totalInterferenceZones"));
                
                @SuppressWarnings("unchecked")
                List<Map<String, Object>> interferenceZones = 
                    (List<Map<String, Object>>) quantumAnalysis.get("interferenceZones");
                
                // Calculer les statistiques des interférences
                long constructiveCount = interferenceZones.stream()
                    .filter(zone -> "CONSTRUCTIVE".equals(zone.get("type")))
                    .count();
                
                long destructiveCount = interferenceZones.stream()
                    .filter(zone -> "DESTRUCTIVE".equals(zone.get("type")))
                    .count();
                
                statistics.put("constructiveInterferences", constructiveCount);
                statistics.put("destructiveInterferences", destructiveCount);
                statistics.put("complexInterferences", interferenceZones.size() - constructiveCount - destructiveCount);
                
                // Calculer la probabilité moyenne
                double averageProbability = interferenceZones.stream()
                    .mapToDouble(zone -> ((Number) zone.get("combinedProbability")).doubleValue())
                    .average()
                    .orElse(0.0);
                
                statistics.put("averageCombinedProbability", averageProbability);
            }
            
            statistics.put("success", true);
            return ResponseEntity.ok(statistics);
            
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Erreur lors du calcul des statistiques: " + e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }
} 