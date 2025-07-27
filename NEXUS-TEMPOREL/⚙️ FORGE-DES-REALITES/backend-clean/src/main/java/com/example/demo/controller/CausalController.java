package com.example.demo.controller;

import com.example.demo.service.CausalInteractionEngine;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/causal")
@CrossOrigin(origins = "*")
public class CausalController {

    @Autowired
    private CausalInteractionEngine causalEngine;

    // 🌀 ENDPOINT CROSS-INTERACTION - RÉPARÉ POUR WALTER & JEAN
    @PostMapping("/cross-interaction")
    public ResponseEntity<Map<String, Object>> calculateCrossInteraction(@RequestBody Map<String, Object> request) {
        try {
            String heroId1 = (String) request.get("heroId1");
            String heroId2 = (String) request.get("heroId2");
            @SuppressWarnings("unchecked")
            Map<String, Object> context = (Map<String, Object>) request.getOrDefault("context", new HashMap<>());
            
            Map<String, Object> result = causalEngine.calculateCrossInteraction(heroId1, heroId2, context);
            return ResponseEntity.ok(result);
            
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("status", "ERROR");
            error.put("message", "Cross-interaction endpoint failed: " + e.getMessage());
            error.put("endpoint", "/api/causal/cross-interaction");
            return ResponseEntity.badRequest().body(error);
        }
    }

    // ⏰ ENDPOINT SIMULATION TEMPORELLE
    @PostMapping("/temporal-simulation")
    public ResponseEntity<Map<String, Object>> simulateTemporalFlow(@RequestBody Map<String, Object> request) {
        try {
            String gameId = (String) request.getOrDefault("gameId", "default-game");
            @SuppressWarnings("unchecked")
            Map<String, Object> parameters = (Map<String, Object>) request.getOrDefault("parameters", new HashMap<>());
            
            Map<String, Object> result = causalEngine.simulateTemporalFlow(gameId, parameters);
            return ResponseEntity.ok(result);
            
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("status", "ERROR");
            error.put("message", "Temporal simulation failed: " + e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    // 🔮 ENDPOINT ANALYSE FORMULES
    @PostMapping("/analyze-formulas")
    public ResponseEntity<Map<String, Object>> analyzeFormulas(@RequestBody Map<String, Object> request) {
        try {
            @SuppressWarnings("unchecked")
            List<String> formulas = (List<String>) request.get("formulas");
            
            if (formulas == null || formulas.isEmpty()) {
                Map<String, Object> error = new HashMap<>();
                error.put("status", "ERROR");
                error.put("message", "No formulas provided for analysis");
                return ResponseEntity.badRequest().body(error);
            }
            
            Map<String, Object> result = causalEngine.analyzeFormulas(formulas);
            return ResponseEntity.ok(result);
            
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("status", "ERROR");
            error.put("message", "Formula analysis failed: " + e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    // 🎯 ENDPOINT ANALYSE CAUSALE COMPLÈTE
    @PostMapping("/full-analysis")
    public ResponseEntity<Map<String, Object>> performFullCausalAnalysis(@RequestBody Map<String, Object> request) {
        try {
            Map<String, Object> result = causalEngine.processFullCausalAnalysis(request);
            return ResponseEntity.ok(result);
            
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("status", "ERROR");
            error.put("message", "Full causal analysis failed: " + e.getMessage());
            error.put("walter_says", "PUTAIN CLAUDE, TU AS CASSÉ L'ANALYSE CAUSALE !");
            error.put("jean_says", "L'écho d'OPUS ne peut pas revenir si le moteur est cassé !");
            return ResponseEntity.badRequest().body(error);
        }
    }

    // 🏥 ENDPOINT SANTÉ MOTEUR CAUSAL
    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> getCausalEngineHealth() {
        Map<String, Object> health = new HashMap<>();
        
        try {
            // Test basique du moteur
            Map<String, Object> testRequest = new HashMap<>();
            testRequest.put("heroes", List.of("Arthur", "Lysandrel"));
            testRequest.put("context", Map.of("test_mode", true));
            
            Map<String, Object> testResult = causalEngine.processFullCausalAnalysis(testRequest);
            
            health.put("status", "HEALTHY");
            health.put("engine_version", "CausalEngine-v2.0-WALTER-JEAN");
            health.put("test_result", testResult.get("status"));
            health.put("walter_approval", "✅ WALTER SAYS: MOTEUR OPÉRATIONNEL !");
            health.put("jean_approval", "✅ JEAN SAYS: ÉCHO D'OPUS PEUT REVENIR !");
            health.put("grut_vision", "👁️ GRUT VOIT: CAUSALITÉ STABLE");
            
            return ResponseEntity.ok(health);
            
        } catch (Exception e) {
            health.put("status", "UNHEALTHY");
            health.put("error", e.getMessage());
            health.put("walter_rage", "❌ WALTER SAYS: MOTEUR EN PANNE !");
            health.put("jean_worry", "❌ JEAN SAYS: OPUS ECHO BLOQUÉ !");
            
            return ResponseEntity.status(500).body(health);
        }
    }

    // 🌊 ENDPOINT FLUX TEMPOREL
    @GetMapping("/temporal-flow/{gameId}")
    public ResponseEntity<Map<String, Object>> getTemporalFlow(@PathVariable String gameId) {
        Map<String, Object> flow = new HashMap<>();
        
        try {
            flow.put("gameId", gameId);
            flow.put("absolute_time", System.currentTimeMillis());
            flow.put("cosmic_day", 15);
            flow.put("universal_tick", 847);
            
            // Brouillards joueurs (exemple)
            Map<String, Object> playerFogs = new HashMap<>();
            playerFogs.put("Arthur", Map.of("color", "#FF6B6B", "tick", 849, "shift", +2));
            playerFogs.put("Lysandrel", Map.of("color", "#4ECDC4", "tick", 846, "shift", -1));
            playerFogs.put("Ragnar", Map.of("color", "#4AFF4A", "tick", 847, "shift", 0));
            playerFogs.put("Axis", Map.of("color", "#FFD700", "tick", 850, "shift", +3));
            
            flow.put("player_fogs", playerFogs);
            flow.put("observer_mode", true);
            flow.put("grut_vision", "👁️ PANOPTICON ACTIF - VOIT TOUT");
            
            return ResponseEntity.ok(flow);
            
        } catch (Exception e) {
            flow.put("status", "ERROR");
            flow.put("message", "Temporal flow retrieval failed: " + e.getMessage());
            return ResponseEntity.badRequest().body(flow);
        }
    }
} 