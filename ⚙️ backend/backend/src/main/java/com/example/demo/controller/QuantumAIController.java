package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.demo.service.QuantumAIService;
import com.example.demo.service.QuantumAIService.*;
import java.util.*;

/**
 * Contrôleur REST pour l'IA Quantique
 * 
 * Endpoints pour :
 * - Parser des capacités avec grammaire quantique
 * - Obtenir des décisions tactiques intelligentes
 * - Mettre à jour la mémoire de l'IA avec les résultats
 * - Exporter l'analyse de l'IA pour debug
 */
@RestController
@RequestMapping("/api/quantum-ai")
@CrossOrigin(origins = "*")
public class QuantumAIController {
    
    @Autowired
    private QuantumAIService quantumAIService;
    
    /**
     * Parse une capacité avec sa grammaire quantique
     */
    @PostMapping("/parse-ability")
    public Map<String, Object> parseAbility(@RequestBody String abilityJson) {
        ParsedAbility parsed = quantumAIService.parseQuantumAbility(abilityJson);
        
        Map<String, Object> response = new HashMap<>();
        response.put("name", parsed.name);
        response.put("quantum_grammar", parsed.quantumGrammar);
        response.put("effects", parsed.effects);
        response.put("synergies", parsed.synergies);
        response.put("cooldown", parsed.cooldown);
        response.put("mana_cost", parsed.manaCost);
        response.put("target_type", parsed.targetType);
        response.put("success_probability", parsed.successProbability);
        response.put("quantum_analysis", analyzeQuantumEffects(parsed));
        
        return response;
    }
    
    /**
     * Obtient une décision tactique de l'IA
     */
    @PostMapping("/get-decision")
    public Map<String, Object> getAIDecision(@RequestBody Map<String, Object> gameState) {
        AIDecision decision = quantumAIService.makeDecision(gameState);
        
        Map<String, Object> response = new HashMap<>();
        response.put("action", decision.action);
        response.put("target", decision.target);
        response.put("parameters", decision.parameters);
        response.put("score", decision.score);
        response.put("reasoning", decision.reasoning);
        response.put("predicted_outcomes", decision.predictedOutcomes);
        response.put("confidence", calculateConfidence(decision));
        
        return response;
    }
    
    /**
     * Met à jour la mémoire de l'IA avec le résultat d'une action
     */
    @PostMapping("/update-memory/{aiId}")
    public Map<String, Object> updateMemory(
            @PathVariable String aiId,
            @RequestBody Map<String, Object> result) {
        
        // Extraire les données du résultat
        AIDecision decision = reconstructDecision(result);
        boolean success = (Boolean) result.getOrDefault("success", false);
        double effectiveness = ((Number) result.getOrDefault("effectiveness", 0.5)).doubleValue();
        
        quantumAIService.updateMemoryWithResult(aiId, decision, success, effectiveness);
        
        Map<String, Object> response = new HashMap<>();
        response.put("status", "memory_updated");
        response.put("ai_id", aiId);
        response.put("learning_applied", true);
        
        return response;
    }
    
    /**
     * Exporte l'analyse complète de l'IA pour debug
     */
    @GetMapping("/analysis/{aiId}")
    public Map<String, Object> getAIAnalysis(@PathVariable String aiId) {
        return quantumAIService.exportAIAnalysis(aiId);
    }
    
    /**
     * Teste l'IA avec un scénario de combat
     */
    @PostMapping("/test-scenario")
    public Map<String, Object> testScenario(@RequestBody Map<String, Object> scenario) {
        Map<String, Object> response = new HashMap<>();
        List<Map<String, Object>> decisions = new ArrayList<>();
        
        // Simuler plusieurs tours
        Map<String, Object> gameState = (Map<String, Object>) scenario.get("initial_state");
        int turns = ((Number) scenario.getOrDefault("turns", 5)).intValue();
        
        for (int i = 0; i < turns; i++) {
            AIDecision decision = quantumAIService.makeDecision(gameState);
            
            Map<String, Object> turnResult = new HashMap<>();
            turnResult.put("turn", i + 1);
            turnResult.put("decision", decision);
            turnResult.put("game_state_summary", summarizeGameState(gameState));
            
            decisions.add(turnResult);
            
            // Simuler l'évolution de l'état du jeu
            gameState = simulateGameStateEvolution(gameState, decision);
        }
        
        response.put("scenario_name", scenario.get("name"));
        response.put("decisions", decisions);
        response.put("ai_performance", evaluatePerformance(decisions));
        
        return response;
    }
    
    /**
     * Analyse les capacités quantiques disponibles
     */
    @PostMapping("/analyze-abilities")
    public Map<String, Object> analyzeAbilities(@RequestBody List<String> abilities) {
        Map<String, Object> analysis = new HashMap<>();
        List<Map<String, Object>> parsedAbilities = new ArrayList<>();
        Map<String, List<String>> synergies = new HashMap<>();
        Map<String, Double> powerRankings = new HashMap<>();
        
        for (String abilityJson : abilities) {
            ParsedAbility parsed = quantumAIService.parseQuantumAbility(abilityJson);
            
            Map<String, Object> abilityAnalysis = new HashMap<>();
            abilityAnalysis.put("name", parsed.name);
            abilityAnalysis.put("quantum_effects", parsed.effects);
            abilityAnalysis.put("power_level", calculatePowerLevel(parsed));
            abilityAnalysis.put("complexity", parsed.quantumGrammar != null ? parsed.quantumGrammar.length() : 0);
            
            parsedAbilities.add(abilityAnalysis);
            
            // Analyser les synergies
            for (String synergy : parsed.synergies) {
                synergies.computeIfAbsent(synergy, k -> new ArrayList<>()).add(parsed.name);
            }
            
            powerRankings.put(parsed.name, calculatePowerLevel(parsed));
        }
        
        analysis.put("abilities", parsedAbilities);
        analysis.put("synergy_groups", synergies);
        analysis.put("power_rankings", powerRankings);
        analysis.put("optimal_combos", findOptimalCombos(parsedAbilities));
        
        return analysis;
    }
    
    // Méthodes utilitaires privées
    
    private Map<String, Object> analyzeQuantumEffects(ParsedAbility ability) {
        Map<String, Object> analysis = new HashMap<>();
        
        if (ability.effects.containsKey("quantum_superposition")) {
            analysis.put("superposition", "Peut exister dans plusieurs états simultanément");
        }
        if (ability.effects.containsKey("quantum_entanglement")) {
            analysis.put("entanglement", "Crée des liens instantanés entre entités");
        }
        if (ability.effects.containsKey("wave_function_collapse")) {
            analysis.put("collapse", "Force la résolution d'états quantiques");
        }
        if (ability.effects.containsKey("wormhole_creation")) {
            analysis.put("wormhole", "Permet le voyage instantané ER=EPR");
        }
        if (ability.effects.containsKey("temporal_manipulation")) {
            analysis.put("temporal", "Modifie l'écoulement du temps");
        }
        
        return analysis;
    }
    
    private double calculateConfidence(AIDecision decision) {
        // Calculer la confiance basée sur le score et d'autres facteurs
        double baseConfidence = Math.min(decision.score / 100.0, 1.0);
        double outcomeBonus = decision.predictedOutcomes.size() * 0.05;
        return Math.min(baseConfidence + outcomeBonus, 0.95);
    }
    
    private AIDecision reconstructDecision(Map<String, Object> result) {
        AIDecision decision = new AIDecision();
        decision.action = (String) result.get("action");
        decision.target = (String) result.get("target");
        decision.parameters = (Map<String, Object>) result.getOrDefault("parameters", new HashMap<>());
        return decision;
    }
    
    private Map<String, Object> summarizeGameState(Map<String, Object> gameState) {
        Map<String, Object> summary = new HashMap<>();
        summary.put("ai_health", gameState.get("current_health"));
        summary.put("ai_mana", gameState.get("current_mana"));
        summary.put("enemy_count", ((List) gameState.getOrDefault("enemies", new ArrayList<>())).size());
        summary.put("ally_count", ((List) gameState.getOrDefault("allies", new ArrayList<>())).size());
        return summary;
    }
    
    private Map<String, Object> simulateGameStateEvolution(Map<String, Object> gameState, AIDecision decision) {
        // Simulation simple de l'évolution de l'état
        Map<String, Object> newState = new HashMap<>(gameState);
        
        // Réduire la mana si une capacité a été utilisée
        if (decision.action.equals("use_ability")) {
            double currentMana = ((Number) newState.getOrDefault("current_mana", 100)).doubleValue();
            newState.put("current_mana", currentMana - 10);
        }
        
        // Simuler des dégâts aléatoires
        double currentHealth = ((Number) newState.getOrDefault("current_health", 100)).doubleValue();
        newState.put("current_health", currentHealth - Math.random() * 10);
        
        return newState;
    }
    
    private Map<String, Object> evaluatePerformance(List<Map<String, Object>> decisions) {
        Map<String, Object> evaluation = new HashMap<>();
        
        double averageScore = decisions.stream()
            .mapToDouble(d -> ((AIDecision) d.get("decision")).score)
            .average()
            .orElse(0.0);
        
        evaluation.put("average_decision_score", averageScore);
        evaluation.put("decision_variety", countUniqueActions(decisions));
        evaluation.put("tactical_consistency", calculateConsistency(decisions));
        
        return evaluation;
    }
    
    private double calculatePowerLevel(ParsedAbility ability) {
        double power = 0.0;
        
        // Calculer basé sur les effets
        power += ability.effects.getOrDefault("damage", 0.0) * 1.0;
        power += ability.effects.getOrDefault("stun", 0.0) * 20.0;
        power += ability.effects.getOrDefault("quantum_superposition", 0.0) * 30.0;
        power += ability.effects.getOrDefault("quantum_entanglement", 0.0) * 40.0;
        power += ability.effects.getOrDefault("power_multiplier", 1.0) * 10.0;
        
        // Ajuster par le coût
        if (ability.manaCost > 0) {
            power = power / (ability.manaCost / 20.0);
        }
        
        return power;
    }
    
    private List<Map<String, Object>> findOptimalCombos(List<Map<String, Object>> abilities) {
        // TODO: Implémenter la recherche de combos optimaux
        return new ArrayList<>();
    }
    
    private int countUniqueActions(List<Map<String, Object>> decisions) {
        return (int) decisions.stream()
            .map(d -> ((AIDecision) d.get("decision")).action)
            .distinct()
            .count();
    }
    
    private double calculateConsistency(List<Map<String, Object>> decisions) {
        // Mesurer la cohérence tactique
        return 0.8; // Placeholder
    }
} 