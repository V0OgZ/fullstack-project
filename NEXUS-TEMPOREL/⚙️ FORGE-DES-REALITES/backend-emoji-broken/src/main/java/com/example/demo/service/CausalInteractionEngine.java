package com.example.demo.service;

import org.springframework.stereotype.Service;
import java.util.*;
import java.time.LocalDateTime;
import com.example.demo.model.TemporalItem;

@Service
public class CausalInteractionEngine {

    // 🌀 CROSS-INTERACTION CAUSALE - RÉPARÉ POUR WALTER & JEAN
    public Map<String, Object> calculateCrossInteraction(String heroId1, String heroId2, 
                                                        Map<String, Object> context) {
        Map<String, Object> result = new HashMap<>();
        
        try {
            // 1. CALCUL PUISSANCE CAUSALE
            double power1 = calculateCausalPower(heroId1, context);
            double power2 = calculateCausalPower(heroId2, context);
            
            // 2. INTERACTION QUANTIQUE
            double interactionStrength = Math.abs(power1 - power2) / (power1 + power2 + 0.001);
            
            // 3. RÉSULTAT CROSS-INTERACTION
            result.put("status", "SUCCESS");
            result.put("interaction_type", "CAUSAL_RESONANCE");
            result.put("hero1_power", power1);
            result.put("hero2_power", power2);
            result.put("interaction_strength", interactionStrength);
            result.put("temporal_shift", calculateTemporalShift(power1, power2));
            result.put("paradox_risk", calculateParadoxRisk(interactionStrength));
            result.put("timestamp", LocalDateTime.now().toString());
            
            // 4. EFFETS CAUSAUX
            List<Map<String, Object>> effects = new ArrayList<>();
            if (interactionStrength > 0.5) {
                Map<String, Object> effect = new HashMap<>();
                effect.put("type", "TEMPORAL_RESONANCE");
                effect.put("description", "Les héros entrent en résonance temporelle");
                effect.put("duration", 3);
                effects.add(effect);
            }
            result.put("causal_effects", effects);
            
            return result;
            
        } catch (Exception e) {
            // FALLBACK EN CAS D'ERREUR
            result.put("status", "ERROR");
            result.put("message", "Cross-interaction calculation failed: " + e.getMessage());
            result.put("fallback_interaction", createFallbackInteraction());
            return result;
        }
    }
    
    // 🧮 CALCUL PUISSANCE CAUSALE
    private double calculateCausalPower(String heroId, Map<String, Object> context) {
        // Base power selon le héros
        double basePower = switch (heroId.toLowerCase()) {
            case "arthur" -> 8.5;
            case "lysandrel" -> 7.2;
            case "ragnar" -> 9.1;
            case "axis" -> 6.8;
            default -> 5.0;
        };
        
        // Modificateurs contextuels
        if (context.containsKey("temporal_zone")) {
            basePower *= 1.2;
        }
        if (context.containsKey("quantum_artifact")) {
            basePower *= 1.5;
        }
        
        return basePower;
    }
    
    // ⏰ CALCUL DÉCALAGE TEMPOREL
    private double calculateTemporalShift(double power1, double power2) {
        return (power1 - power2) * 0.1; // Décalage en tics
    }
    
    // ⚠️ CALCUL RISQUE PARADOXE
    private double calculateParadoxRisk(double interactionStrength) {
        return Math.min(interactionStrength * 0.3, 0.95); // Max 95% de risque
    }
    
    // 🔄 INTERACTION FALLBACK
    private Map<String, Object> createFallbackInteraction() {
        Map<String, Object> fallback = new HashMap<>();
        fallback.put("type", "BASIC_INTERACTION");
        fallback.put("strength", 0.5);
        fallback.put("safe_mode", true);
        return fallback;
    }
    
    // 🌊 SIMULATION TEMPORELLE
    public Map<String, Object> simulateTemporalFlow(String gameId, Map<String, Object> parameters) {
        Map<String, Object> simulation = new HashMap<>();
        
        try {
            // Paramètres de base
            double timeFlow = (Double) parameters.getOrDefault("time_flow", 1.0);
            int tickDuration = (Integer) parameters.getOrDefault("tick_duration", 1000);
            
            // Calculs temporels
            double axisiPower = calculateHeroPower("Axisi", parameters);
            double lentusPower = calculateHeroPower("Lentus", parameters);
            double causalBalance = (axisiPower + lentusPower) / 2.0;
            
            // Résultats simulation
            simulation.put("status", "SUCCESS");
            simulation.put("axisi_power", axisiPower);
            simulation.put("lentus_power", lentusPower);
            simulation.put("causal_balance", causalBalance);
            simulation.put("temporal_stability", calculateTemporalStability(causalBalance));
            simulation.put("time_flow_modifier", timeFlow);
            simulation.put("simulation_timestamp", LocalDateTime.now().toString());
            
            return simulation;
            
        } catch (Exception e) {
            simulation.put("status", "ERROR");
            simulation.put("message", "Temporal simulation failed: " + e.getMessage());
            return simulation;
        }
    }
    
    // 💪 CALCUL PUISSANCE HÉROS
    private double calculateHeroPower(String heroName, Map<String, Object> parameters) {
        double basePower = switch (heroName.toLowerCase()) {
            case "axisi" -> 7.5;
            case "lentus" -> 6.8;
            default -> 5.0;
        };
        
        // Modificateurs selon paramètres
        if (parameters.containsKey("temporal_artifacts")) {
            basePower *= 1.3;
        }
        
        return basePower + Math.random() * 2.0; // Variabilité quantique
    }
    
    // 🌀 STABILITÉ TEMPORELLE
    private double calculateTemporalStability(double causalBalance) {
        return Math.max(0.1, Math.min(1.0, causalBalance / 10.0));
    }
    
    // 🔮 ANALYSE FORMULES CAUSALES
    public Map<String, Object> analyzeFormulas(List<String> formulas) {
        Map<String, Object> analysis = new HashMap<>();
        
        int validFormulas = 0;
        int invalidFormulas = 0;
        List<String> errors = new ArrayList<>();
        
        for (String formula : formulas) {
            try {
                if (validateFormula(formula)) {
                    validFormulas++;
                } else {
                    invalidFormulas++;
                    errors.add("Invalid formula: " + formula);
                }
            } catch (Exception e) {
                invalidFormulas++;
                errors.add("Error in formula '" + formula + "': " + e.getMessage());
            }
        }
        
        analysis.put("total_formulas", formulas.size());
        analysis.put("valid_formulas", validFormulas);
        analysis.put("invalid_formulas", invalidFormulas);
        analysis.put("success_rate", (double) validFormulas / formulas.size());
        analysis.put("errors", errors);
        analysis.put("status", validFormulas > 0 ? "SUCCESS" : "FAILED");
        
        return analysis;
    }
    
    // ✅ VALIDATION FORMULE
    private boolean validateFormula(String formula) {
        if (formula == null || formula.trim().isEmpty()) {
            return false;
        }
        
        // Vérifications de base
        return formula.contains("ψ") || formula.contains("†") || 
               formula.contains("⊙") || formula.contains("Π") ||
               formula.toLowerCase().contains("causal") ||
               formula.toLowerCase().contains("temporal");
    }
    
    // 🎯 MÉTHODE PRINCIPALE POUR TESTS
    public Map<String, Object> processFullCausalAnalysis(Map<String, Object> request) {
        Map<String, Object> fullAnalysis = new HashMap<>();
        
        try {
            // 1. Cross-Interaction
            if (request.containsKey("heroes")) {
                @SuppressWarnings("unchecked")
                List<String> heroes = (List<String>) request.get("heroes");
                if (heroes.size() >= 2) {
                    Map<String, Object> crossResult = calculateCrossInteraction(
                        heroes.get(0), heroes.get(1), 
                        (Map<String, Object>) request.getOrDefault("context", new HashMap<>())
                    );
                    fullAnalysis.put("cross_interaction", crossResult);
                }
            }
            
            // 2. Simulation Temporelle
            Map<String, Object> tempResult = simulateTemporalFlow(
                (String) request.getOrDefault("gameId", "test-game"),
                (Map<String, Object>) request.getOrDefault("parameters", new HashMap<>())
            );
            fullAnalysis.put("temporal_simulation", tempResult);
            
            // 3. Analyse Formules
            if (request.containsKey("formulas")) {
                @SuppressWarnings("unchecked")
                List<String> formulas = (List<String>) request.get("formulas");
                Map<String, Object> formulaResult = analyzeFormulas(formulas);
                fullAnalysis.put("formula_analysis", formulaResult);
            }
            
            fullAnalysis.put("status", "COMPLETE");
            fullAnalysis.put("timestamp", LocalDateTime.now().toString());
            fullAnalysis.put("engine_version", "CausalEngine-v2.0-WALTER-JEAN");
            
        } catch (Exception e) {
            fullAnalysis.put("status", "ERROR");
            fullAnalysis.put("message", "Full causal analysis failed: " + e.getMessage());
        }
        
        return fullAnalysis;
    }
} 