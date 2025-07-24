package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.HashMap;
import java.util.List;
import java.util.ArrayList;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@RestController
@RequestMapping("/api/causal")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8000"})
public class CausalController {

    // ===========================
    // CAUSAL INTERACTION ENGINE
    // ===========================

    @PostMapping("/interaction")
    public ResponseEntity<Map<String, Object>> processTemporalInteraction(@RequestBody Map<String, Object> request) {
        String sessionId = (String) request.get("sessionId");
        String itemId = (String) request.get("itemId");
        Map<String, Integer> targetCoords = (Map<String, Integer>) request.get("targetCoords");
        String interactionType = (String) request.get("interactionType");
        Map<String, Object> causalParams = (Map<String, Object>) request.get("causalParameters");

        Map<String, Object> result = new HashMap<>();
        
        // Calculer les effets causaux selon l'item
        if (itemId.contains("axisi")) {
            result = processAxisiInteraction(sessionId, targetCoords, causalParams);
        } else if (itemId.contains("lentus")) {
            result = processLentusInteraction(sessionId, targetCoords, causalParams);
        } else {
            result = processGenericTemporalInteraction(sessionId, itemId, targetCoords, causalParams);
        }

        result.put("sessionId", sessionId);
        result.put("itemId", itemId);
        result.put("interactionType", interactionType);
        result.put("timestamp", LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME));
        result.put("success", true);

        return ResponseEntity.ok(result);
    }

    @PostMapping("/cross-interaction")
    public ResponseEntity<Map<String, Object>> processCrossInteraction(@RequestBody Map<String, Object> request) {
        // Nouveau: Support pour format simple axisiPower/lentusPower
        if (request.containsKey("axisiPower") && request.containsKey("lentusPower")) {
            return processSimpleCrossInteraction(request);
        }
        
        // Format original avec interactions list
        String sessionId = (String) request.get("sessionId");
        List<Map<String, Object>> interactions = (List<Map<String, Object>>) request.get("interactions");

        Map<String, Object> result = new HashMap<>();
        List<Map<String, Object>> interactionResults = new ArrayList<>();
        
        double totalCausalWeight = 0.0;
        double maxParadoxRisk = 0.0;
        double minTemporalStability = 1.0;

        for (Map<String, Object> interaction : interactions) {
            String itemId = (String) interaction.get("itemId");
            Map<String, Integer> coords = (Map<String, Integer>) interaction.get("coords");
            String type = (String) interaction.get("type");

            Map<String, Object> singleResult;
            if (itemId.contains("axisi")) {
                singleResult = processAxisiInteraction(sessionId, coords, Map.of());
            } else if (itemId.contains("lentus")) {
                singleResult = processLentusInteraction(sessionId, coords, Map.of());
            } else {
                singleResult = processGenericTemporalInteraction(sessionId, itemId, coords, Map.of());
            }

            interactionResults.add(singleResult);
            
            totalCausalWeight += (Double) singleResult.get("causalWeight");
            maxParadoxRisk = Math.max(maxParadoxRisk, (Double) singleResult.get("paradoxRisk"));
            minTemporalStability = Math.min(minTemporalStability, (Double) singleResult.get("temporalStability"));
        }

        // Calculer l'interférence causale
        double interferenceIndex = calculateCausalInterference(interactionResults);
        
        result.put("sessionId", sessionId);
        result.put("individualResults", interactionResults);
        result.put("totalCausalWeight", totalCausalWeight);
        result.put("maxParadoxRisk", maxParadoxRisk);
        result.put("minTemporalStability", minTemporalStability);
        result.put("causalInterference", interferenceIndex);
        result.put("timestamp", LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME));
        result.put("success", true);

        // Déterminer l'effet combiné
        if (interferenceIndex > 0.7) {
            result.put("combinedEffect", "TEMPORAL_PARADOX_RISK");
            result.put("effectDescription", "Les interactions causales créent un risque de paradoxe temporel!");
        } else if (interferenceIndex > 0.4) {
            result.put("combinedEffect", "CAUSAL_RESONANCE");
            result.put("effectDescription", "Résonance causale détectée - effets amplifiés");
        } else {
            result.put("combinedEffect", "STABLE_INTERACTION");
            result.put("effectDescription", "Interactions stables sans interférence majeure");
        }

        return ResponseEntity.ok(result);
    }

    @PostMapping("/temporal-simulation")
    public ResponseEntity<Map<String, Object>> runTemporalSimulation(@RequestBody Map<String, Object> request) {
        String sessionId = (String) request.get("sessionId");
        String scenario = (String) request.get("scenario");
        Integer turns = (Integer) request.get("turns");

        Map<String, Object> result = new HashMap<>();
        List<Map<String, Object>> turnResults = new ArrayList<>();

        for (int turn = 1; turn <= turns; turn++) {
            Map<String, Object> turnResult = new HashMap<>();
            
            // Simuler AXISI vs LENTUS pour ce tour
            double axisiPower = Math.random() * 2.5 + 1.0; // 1.0 à 3.5
            double lentusPower = Math.random() * 0.6 + 0.2; // 0.2 à 0.8
            
            double causalBalance = axisiPower - (1.0 / lentusPower);
            double temporalStress = Math.abs(causalBalance) * 0.3;
            
            turnResult.put("turn", turn);
            turnResult.put("axisiPower", Math.round(axisiPower * 100.0) / 100.0);
            turnResult.put("lentusPower", Math.round(lentusPower * 100.0) / 100.0);
            turnResult.put("causalBalance", Math.round(causalBalance * 100.0) / 100.0);
            turnResult.put("temporalStress", Math.round(temporalStress * 100.0) / 100.0);
            
            if (temporalStress > 0.8) {
                turnResult.put("event", "TEMPORAL_INSTABILITY");
            } else if (Math.abs(causalBalance) < 0.1) {
                turnResult.put("event", "PERFECT_EQUILIBRIUM");
            } else {
                turnResult.put("event", "NORMAL_FLOW");
            }
            
            turnResults.add(turnResult);
        }

        result.put("sessionId", sessionId);
        result.put("scenario", scenario);
        result.put("totalTurns", turns);
        result.put("turnResults", turnResults);
        result.put("timestamp", LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME));
        result.put("success", true);

        return ResponseEntity.ok(result);
    }

    // ===========================
    // PRIVATE METHODS
    // ===========================

    private Map<String, Object> processAxisiInteraction(String sessionId, Map<String, Integer> coords, Map<String, Object> params) {
        Map<String, Object> result = new HashMap<>();
        
        // AXISI = Accélération temporelle
        double temporalFactor = params.containsKey("temporalFactor") ? 
            ((Number) params.get("temporalFactor")).doubleValue() : 2.0;
        int durationTurns = params.containsKey("durationTurns") ? 
            ((Number) params.get("durationTurns")).intValue() : 3;
        int affectedRadius = params.containsKey("affectedRadius") ? 
            ((Number) params.get("affectedRadius")).intValue() : 2;

        // Calculs causaux pour AXISI
        double causalWeight = temporalFactor * durationTurns * 0.4;
        double paradoxRisk = Math.min(0.95, temporalFactor * 0.15 + (durationTurns * 0.05));
        double temporalStability = Math.max(0.1, 1.0 - (temporalFactor - 1.0) * 0.3);

        result.put("itemType", "AXISI");
        result.put("effect", "TEMPORAL_ACCELERATION");
        result.put("temporalFactor", temporalFactor);
        result.put("durationTurns", durationTurns);
        result.put("affectedRadius", affectedRadius);
        result.put("causalWeight", Math.round(causalWeight * 100.0) / 100.0);
        result.put("paradoxRisk", Math.round(paradoxRisk * 100.0) / 100.0);
        result.put("temporalStability", Math.round(temporalStability * 100.0) / 100.0);
        result.put("coords", coords);
        
        // Effets spéciaux AXISI
        List<String> effects = new ArrayList<>();
        if (temporalFactor > 2.0) effects.add("DOUBLE_ACTION");
        if (durationTurns > 4) effects.add("EXTENDED_ACCELERATION");
        if (affectedRadius > 2) effects.add("AREA_BOOST");
        result.put("specialEffects", effects);

        return result;
    }

    private Map<String, Object> processLentusInteraction(String sessionId, Map<String, Integer> coords, Map<String, Object> params) {
        Map<String, Object> result = new HashMap<>();
        
        // LENTUS = Ralentissement temporel
        double temporalFactor = params.containsKey("temporalFactor") ? 
            ((Number) params.get("temporalFactor")).doubleValue() : 0.5;
        int durationTurns = params.containsKey("durationTurns") ? 
            ((Number) params.get("durationTurns")).intValue() : 5;
        int affectedRadius = params.containsKey("affectedRadius") ? 
            ((Number) params.get("affectedRadius")).intValue() : 3;

        // Calculs causaux pour LENTUS
        double causalWeight = (1.0 - temporalFactor) * durationTurns * 0.6;
        double paradoxRisk = Math.min(0.95, (1.0 - temporalFactor) * 0.2 + (durationTurns * 0.03));
        double temporalStability = Math.max(0.2, 0.8 + temporalFactor * 0.2);

        result.put("itemType", "LENTUS");
        result.put("effect", "TEMPORAL_DECELERATION");
        result.put("temporalFactor", temporalFactor);
        result.put("durationTurns", durationTurns);
        result.put("affectedRadius", affectedRadius);
        result.put("causalWeight", Math.round(causalWeight * 100.0) / 100.0);
        result.put("paradoxRisk", Math.round(paradoxRisk * 100.0) / 100.0);
        result.put("temporalStability", Math.round(temporalStability * 100.0) / 100.0);
        result.put("coords", coords);
        
        // Effets spéciaux LENTUS
        List<String> effects = new ArrayList<>();
        if (temporalFactor < 0.3) effects.add("EXTREME_SLOWDOWN");
        if (durationTurns > 6) effects.add("PERSISTENT_DECELERATION");
        if (affectedRadius > 3) effects.add("WIDE_AREA_SLOW");
        result.put("specialEffects", effects);

        return result;
    }

    private Map<String, Object> processGenericTemporalInteraction(String sessionId, String itemId, 
                                                                Map<String, Integer> coords, 
                                                                Map<String, Object> params) {
        Map<String, Object> result = new HashMap<>();
        
        // Interaction temporelle générique
        double causalWeight = Math.random() * 2.0 + 0.5;
        double paradoxRisk = Math.random() * 0.4 + 0.1;
        double temporalStability = Math.random() * 0.6 + 0.4;

        result.put("itemType", "GENERIC_TEMPORAL");
        result.put("effect", "TEMPORAL_DISTURBANCE");
        result.put("causalWeight", Math.round(causalWeight * 100.0) / 100.0);
        result.put("paradoxRisk", Math.round(paradoxRisk * 100.0) / 100.0);
        result.put("temporalStability", Math.round(temporalStability * 100.0) / 100.0);
        result.put("coords", coords);
        result.put("specialEffects", List.of("MINOR_TEMPORAL_FLUX"));

        return result;
    }

    private double calculateCausalInterference(List<Map<String, Object>> interactions) {
        if (interactions.size() < 2) return 0.0;
        
        double totalInterference = 0.0;
        int comparisons = 0;
        
        for (int i = 0; i < interactions.size(); i++) {
            for (int j = i + 1; j < interactions.size(); j++) {
                Map<String, Object> int1 = interactions.get(i);
                Map<String, Object> int2 = interactions.get(j);
                
                double weight1 = (Double) int1.get("causalWeight");
                double weight2 = (Double) int2.get("causalWeight");
                
                // L'interférence est plus forte quand les poids causaux sont élevés
                double interference = (weight1 * weight2) / (weight1 + weight2 + 1.0);
                totalInterference += interference;
                comparisons++;
            }
        }
        
        return comparisons > 0 ? totalInterference / comparisons : 0.0;
    }

    /**
     * 🚨 WALTER FIX - Simple cross-interaction pour tests
     */
    private ResponseEntity<Map<String, Object>> processSimpleCrossInteraction(Map<String, Object> request) {
        double axisiPower = ((Number) request.get("axisiPower")).doubleValue();
        double lentusPower = ((Number) request.get("lentusPower")).doubleValue();
        String interactionType = (String) request.getOrDefault("interactionType", "BATTLE");
        
        Map<String, Object> result = new HashMap<>();
        
        // Calculs réels selon formules causales - WALTER FIX
        double paradoxRisk = Math.min(0.95, (axisiPower * lentusPower) / (axisiPower + lentusPower + 1.0));
        double temporalStability = Math.max(0.05, 1.0 - (Math.abs(axisiPower - lentusPower) / 10.0));
        double affectedRadius = Math.sqrt(axisiPower * axisiPower + lentusPower * lentusPower) * 1.2; // WALTER: Rayon plus réaliste 
        double causalWeight = (axisiPower + lentusPower) * paradoxRisk;
        
        result.put("axisiPower", axisiPower);
        result.put("lentusPower", lentusPower);
        result.put("interactionType", interactionType);
        result.put("paradoxRisk", Math.round(paradoxRisk * 100.0) / 100.0);
        result.put("temporalStability", Math.round(temporalStability * 100.0) / 100.0);
        result.put("affectedRadius", Math.round(affectedRadius * 100.0) / 100.0);
        result.put("causalWeight", Math.round(causalWeight * 100.0) / 100.0);
        result.put("timestamp", LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME));
        result.put("success", true);
        
        // Effet selon interaction
        if (paradoxRisk > 0.8) {
            result.put("effect", "PARADOX_CRITICAL");
            result.put("description", "Risque critique de paradoxe temporel!");
        } else if (paradoxRisk > 0.5) {
            result.put("effect", "CAUSAL_INSTABILITY");
            result.put("description", "Instabilité causale détectée");
        } else {
            result.put("effect", "STABLE_INTERACTION");
            result.put("description", "Interaction causale stable");
        }
        
        return ResponseEntity.ok(result);
    }

    // ===========================
    // HEALTH CHECK
    // ===========================

    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> health() {
        Map<String, Object> health = new HashMap<>();
        health.put("status", "UP");
        health.put("service", "CausalInteractionEngine");
        health.put("version", "1.0.0");
        health.put("timestamp", LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME));
        health.put("capabilities", List.of("AXISI_PROCESSING", "LENTUS_PROCESSING", "CROSS_INTERACTION", "TEMPORAL_SIMULATION"));
        
        return ResponseEntity.ok(health);
    }
} 