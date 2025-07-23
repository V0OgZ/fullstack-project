package com.heroesoftimepoc.temporalengine.controller;

import com.heroesoftimepoc.temporalengine.service.ExtendedTemporalEngineService;
import com.heroesoftimepoc.temporalengine.service.GrofiCausalIntegrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * Controller REST pour tester l'intégration causale GROFI
 * Démontre la corrélation entre grammaire étendue et système de collapse
 */
@RestController
@RequestMapping("/api/causal-integration")
@CrossOrigin(origins = "*")
public class CausalIntegrationController {
    
    @Autowired
    private ExtendedTemporalEngineService extendedTemporalEngine;
    
    @Autowired
    private GrofiCausalIntegrationService grofiCausalIntegration;
    
    /**
     * Exécuter un script GROFI avec intégration causale complète
     * POST /api/causal-integration/games/{gameId}/execute-integrated
     */
    @PostMapping("/games/{gameId}/execute-integrated")
    public ResponseEntity<Map<String, Object>> executeWithCausalIntegration(
            @PathVariable Long gameId,
            @RequestBody Map<String, String> request) {
        
        Map<String, Object> response = new HashMap<>();
        
        try {
            String script = request.get("script");
            if (script == null || script.trim().isEmpty()) {
                response.put("success", false);
                response.put("error", "Script requis");
                return ResponseEntity.badRequest().body(response);
            }
            
            // Utiliser le service intégré
            Map<String, Object> result = extendedTemporalEngine.executeExtendedScript(gameId, script);
            
            // Ajouter des métadonnées d'intégration
            result.put("causalIntegration", true);
            result.put("systemVersion", "GROFI-Causal-Integrated-v1.0");
            
            return ResponseEntity.ok(result);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("error", "Erreur intégration causale: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    /**
     * Tester les immunités et restrictions GROFI
     * POST /api/causal-integration/games/{gameId}/test-immunities
     */
    @PostMapping("/games/{gameId}/test-immunities")
    public ResponseEntity<Map<String, Object>> testGrofiImmunities(
            @PathVariable Long gameId,
            @RequestBody Map<String, String> request) {
        
        Map<String, Object> response = new HashMap<>();
        
        try {
            String testType = request.getOrDefault("testType", "ultimate_power");
            String heroName = request.get("heroName");
            
            Map<String, Object> testResults = new HashMap<>();
            
            switch (testType) {
                case "ultimate_power":
                    // Test Ultimate Power avec immunités
                    String ultimateScript = "ψ†[FREEZE {all.timeline.superposition}] ⊙ HERO(" + heroName + ")";
                    Map<String, Object> ultimateResult = extendedTemporalEngine.executeExtendedScript(gameId, ultimateScript);
                    testResults.put("ultimatePowerTest", ultimateResult);
                    break;
                    
                case "rollback_immunity":
                    // Test rollback avec artefacts bloquants
                    String rollbackScript = "†[ALL]";
                    Map<String, Object> rollbackResult = extendedTemporalEngine.executeExtendedScript(gameId, rollbackScript);
                    testResults.put("rollbackTest", rollbackResult);
                    break;
                    
                case "collapse_protection":
                    // Test collapse total avec immunités
                    String collapseScript = "⊙ ψ[ALL] ⇒ Ω[ONE]";
                    Map<String, Object> collapseResult = extendedTemporalEngine.executeExtendedScript(gameId, collapseScript);
                    testResults.put("collapseTest", collapseResult);
                    break;
                    
                default:
                    response.put("success", false);
                    response.put("error", "Type de test non supporté: " + testType);
                    return ResponseEntity.badRequest().body(response);
            }
            
            response.put("success", true);
            response.put("testType", testType);
            response.put("results", testResults);
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("error", "Erreur test immunités: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    /**
     * Obtenir les statistiques d'intégration causale
     * GET /api/causal-integration/games/{gameId}/stats
     */
    @GetMapping("/games/{gameId}/stats")
    public ResponseEntity<Map<String, Object>> getCausalIntegrationStats(@PathVariable Long gameId) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            Map<String, Object> stats = extendedTemporalEngine.getCausalIntegrationStats(gameId);
            
            response.put("success", true);
            response.put("gameId", gameId);
            response.put("integrationStats", stats);
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("error", "Erreur récupération stats: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    /**
     * Démonstration complète d'intégration causale
     * POST /api/causal-integration/games/{gameId}/demo
     */
    @PostMapping("/games/{gameId}/demo")
    public ResponseEntity<Map<String, Object>> demonstrateCausalIntegration(@PathVariable Long gameId) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            Map<String, Object> demoResults = new HashMap<>();
            
            // 1. Créer quelques états quantiques
            String[] setupScripts = {
                "ψ001: ⊙(Δt+2 @15,15 ⟶ MOV(Arthur, @15,15))",
                "ψ002: ⊙(Δt+3 @16,16 ⟶ MOV(Lysandrel, @16,16))"
            };
            
            for (String script : setupScripts) {
                Map<String, Object> setupResult = extendedTemporalEngine.executeExtendedScript(gameId, script);
                demoResults.put("setup_" + script.substring(0, 4), setupResult.get("success"));
            }
            
            // 2. Tester Ultimate Power avec immunités
            String ultimateScript = "ψ†[FREEZE {all.timeline.superposition}] ⊙ HERO(Jean-Grofignon)";
            Map<String, Object> ultimateResult = extendedTemporalEngine.executeExtendedScript(gameId, ultimateScript);
            demoResults.put("ultimatePowerDemo", ultimateResult);
            
            // 3. Tester rollback avec restrictions
            String rollbackScript = "†[Δt-2 TO Δt-1]";
            Map<String, Object> rollbackResult = extendedTemporalEngine.executeExtendedScript(gameId, rollbackScript);
            demoResults.put("rollbackDemo", rollbackResult);
            
            // 4. Tester collapse total avec immunités
            String collapseScript = "⊙ ψ[ALL] ⇒ Ω[ONE]";
            Map<String, Object> collapseResult = extendedTemporalEngine.executeExtendedScript(gameId, collapseScript);
            demoResults.put("totalCollapseDemo", collapseResult);
            
            // 5. Statistiques finales
            Map<String, Object> finalStats = extendedTemporalEngine.getCausalIntegrationStats(gameId);
            demoResults.put("finalStats", finalStats);
            
            response.put("success", true);
            response.put("demoTitle", "GROFI Causal Integration Demonstration");
            response.put("description", "Démonstration complète de l'intégration entre grammaire GROFI et système causale");
            response.put("results", demoResults);
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("error", "Erreur démonstration: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    /**
     * Tester les scénarios de stress causale
     * POST /api/causal-integration/games/{gameId}/stress-test
     */
    @PostMapping("/games/{gameId}/stress-test")
    public ResponseEntity<Map<String, Object>> testCausalStress(@PathVariable Long gameId) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            Map<String, Object> stressTests = new HashMap<>();
            
            // Test 1: Créer beaucoup d'états quantiques
            for (int i = 1; i <= 10; i++) {
                String script = "ψ" + String.format("%03d", i) + ": ⊙(Δt+" + i + " @" + (10+i) + "," + (10+i) + " ⟶ MOV(TestHero" + i + ", @" + (10+i) + "," + (10+i) + "))";
                Map<String, Object> result = extendedTemporalEngine.executeExtendedScript(gameId, script);
                stressTests.put("createState" + i, result.get("success"));
            }
            
            // Test 2: Stress test avec Ultimate Power
            String stressScript = "ψ†[FREEZE {all.timeline.superposition}] ⊙ HERO(Jean-Grofignon)";
            Map<String, Object> stressResult = extendedTemporalEngine.executeExtendedScript(gameId, stressScript);
            stressTests.put("stressUltimatePower", stressResult);
            
            // Test 3: Mesurer le stress causale
            Map<String, Object> stressStats = extendedTemporalEngine.getCausalIntegrationStats(gameId);
            stressTests.put("causalStressLevel", stressStats.get("stressLevel"));
            stressTests.put("causalStressValue", stressStats.get("causalStress"));
            
            response.put("success", true);
            response.put("stressTestResults", stressTests);
            response.put("message", "Test de stress causale terminé");
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("error", "Erreur test stress: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
} 