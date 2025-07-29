package com.example.demo.service;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.*;
import java.util.stream.Collectors;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Service d'IA Quantique Intelligente pour Heroes of Time
 * 
 * Cette IA peut :
 * - Comprendre et parser la grammaire quantique des capacités
 * - Analyser les synergies entre héros et aptitudes
 * - Prédire les résultats des actions (RollStatsGraph)
 * - Apprendre des patterns de combat efficaces
 * - S'adapter au style du joueur
 */
@Service
public class QuantumAIService {
    
    @Autowired(required = false)
    private MagicFormulaService magicFormulaService;
    
    @Autowired(required = false)
    private QuantumService quantumService;
    
    private final ObjectMapper objectMapper = new ObjectMapper();
    
    // Mémoire tactique de l'IA
    private final Map<String, TacticalMemory> tacticalMemories = new ConcurrentHashMap<>();
    
    // Cache des capacités parsées
    private final Map<String, ParsedAbility> abilityCache = new ConcurrentHashMap<>();
    
    /**
     * Classe représentant une capacité parsée
     */
    public static class ParsedAbility {
        public String name;
        public String quantumGrammar;
        public Map<String, Double> effects = new HashMap<>();
        public List<String> synergies = new ArrayList<>();
        public double cooldown;
        public double manaCost;
        public String targetType; // self, enemy, ally, area
        public double successProbability = 1.0;
    }
    
    /**
     * Classe représentant la mémoire tactique
     */
    public static class TacticalMemory {
        public Map<String, Double> actionSuccessRates = new HashMap<>();
        public Map<String, Integer> actionUsageCount = new HashMap<>();
        public List<String> effectivePatterns = new ArrayList<>();
        public Map<String, Double> enemyWeaknesses = new HashMap<>();
    }
    
    /**
     * Décision d'IA avec scoring
     */
    public static class AIDecision {
        public String action;
        public String target;
        public Map<String, Object> parameters = new HashMap<>();
        public double score;
        public String reasoning;
        public List<String> predictedOutcomes = new ArrayList<>();
    }
    
    /**
     * Parse et comprend une capacité avec sa grammaire quantique
     */
    public ParsedAbility parseQuantumAbility(String abilityJson) {
        try {
            Map<String, Object> abilityData = objectMapper.readValue(abilityJson, Map.class);
            ParsedAbility parsed = new ParsedAbility();
            
            parsed.name = (String) abilityData.get("name");
            parsed.quantumGrammar = (String) abilityData.get("quantum_grammar");
            
            // Parser la grammaire quantique
            if (parsed.quantumGrammar != null) {
                parseQuantumGrammar(parsed);
            }
            
            // Extraire les effets
            if (abilityData.containsKey("effects")) {
                Map<String, Object> effects = (Map<String, Object>) abilityData.get("effects");
                effects.forEach((key, value) -> {
                    if (value instanceof Number) {
                        parsed.effects.put(key, ((Number) value).doubleValue());
                    }
                });
            }
            
            // Identifier les synergies
            if (abilityData.containsKey("synergies")) {
                parsed.synergies = (List<String>) abilityData.get("synergies");
            }
            
            // Coûts et cooldowns
            parsed.cooldown = getDoubleValue(abilityData, "cooldown", 0);
            parsed.manaCost = getDoubleValue(abilityData, "mana_cost", 0);
            parsed.targetType = (String) abilityData.getOrDefault("target_type", "enemy");
            
            // Calculer la probabilité de succès basée sur la complexité
            parsed.successProbability = calculateSuccessProbability(parsed);
            
            // Mettre en cache
            abilityCache.put(parsed.name, parsed);
            
            return parsed;
            
        } catch (Exception e) {
            System.err.println("Erreur parsing capacité: " + e.getMessage());
            return new ParsedAbility();
        }
    }
    
    /**
     * Parse la grammaire quantique pour extraire les effets
     */
    private void parseQuantumGrammar(ParsedAbility ability) {
        String grammar = ability.quantumGrammar;
        
        // Exemples de patterns quantiques
        if (grammar.contains("Ψ")) {
            ability.effects.put("quantum_superposition", 1.0);
        }
        if (grammar.contains("⊗")) {
            ability.effects.put("quantum_entanglement", 1.0);
        }
        if (grammar.contains("∇²")) {
            ability.effects.put("wave_function_collapse", 1.0);
        }
        if (grammar.contains("ER=EPR")) {
            ability.effects.put("wormhole_creation", 1.0);
        }
        if (grammar.contains("∂t")) {
            ability.effects.put("temporal_manipulation", 1.0);
        }
        
        // Calculer la puissance basée sur la complexité
        double complexity = grammar.length() / 10.0;
        ability.effects.put("power_multiplier", 1.0 + complexity);
    }
    
    /**
     * Prend une décision tactique intelligente
     */
    public AIDecision makeDecision(Map<String, Object> gameState) {
        String aiId = (String) gameState.get("ai_id");
        List<ParsedAbility> availableAbilities = getAvailableAbilities(gameState);
        List<Map<String, Object>> enemies = (List<Map<String, Object>>) gameState.get("enemies");
        List<Map<String, Object>> allies = (List<Map<String, Object>>) gameState.get("allies");
        
        // Récupérer ou créer la mémoire tactique
        TacticalMemory memory = tacticalMemories.computeIfAbsent(aiId, k -> new TacticalMemory());
        
        // Générer toutes les décisions possibles
        List<AIDecision> possibleDecisions = generatePossibleDecisions(
            availableAbilities, enemies, allies, gameState, memory
        );
        
        // Scorer chaque décision
        for (AIDecision decision : possibleDecisions) {
            decision.score = scoreDecision(decision, gameState, memory);
            decision.predictedOutcomes = predictOutcomes(decision, gameState);
        }
        
        // Choisir la meilleure décision
        AIDecision bestDecision = possibleDecisions.stream()
            .max(Comparator.comparing(d -> d.score))
            .orElse(createDefaultDecision());
        
        // Mettre à jour la mémoire
        updateMemory(memory, bestDecision);
        
        return bestDecision;
    }
    
    /**
     * Génère toutes les décisions possibles
     */
    private List<AIDecision> generatePossibleDecisions(
            List<ParsedAbility> abilities,
            List<Map<String, Object>> enemies,
            List<Map<String, Object>> allies,
            Map<String, Object> gameState,
            TacticalMemory memory) {
        
        List<AIDecision> decisions = new ArrayList<>();
        
        // Pour chaque capacité disponible
        for (ParsedAbility ability : abilities) {
            // Déterminer les cibles valides
            List<Map<String, Object>> validTargets = getValidTargets(ability, enemies, allies, gameState);
            
            for (Map<String, Object> target : validTargets) {
                AIDecision decision = new AIDecision();
                decision.action = "use_ability";
                decision.parameters.put("ability", ability.name);
                decision.target = (String) target.get("id");
                
                // Raisonnement basé sur l'analyse
                decision.reasoning = generateReasoning(ability, target, gameState, memory);
                
                decisions.add(decision);
            }
        }
        
        // Ajouter des décisions de mouvement tactique
        decisions.addAll(generateMovementDecisions(gameState, enemies, allies));
        
        // Ajouter des décisions défensives si nécessaire
        if (isInDanger(gameState)) {
            decisions.addAll(generateDefensiveDecisions(gameState));
        }
        
        return decisions;
    }
    
    /**
     * Score une décision basée sur plusieurs facteurs
     */
    private double scoreDecision(AIDecision decision, Map<String, Object> gameState, TacticalMemory memory) {
        double score = 0.0;
        
        // Score basé sur l'historique de succès
        String actionKey = decision.action + "_" + decision.parameters.get("ability");
        Double historicalSuccess = memory.actionSuccessRates.get(actionKey);
        if (historicalSuccess != null) {
            score += historicalSuccess * 20;
        }
        
        // Score basé sur la situation tactique
        if (decision.action.equals("use_ability")) {
            ParsedAbility ability = abilityCache.get((String) decision.parameters.get("ability"));
            if (ability != null) {
                // Dégâts potentiels
                score += ability.effects.getOrDefault("damage", 0.0) * 10;
                
                // Effets de contrôle
                score += ability.effects.getOrDefault("stun", 0.0) * 15;
                score += ability.effects.getOrDefault("slow", 0.0) * 8;
                
                // Synergies
                score += calculateSynergyBonus(ability, gameState) * 12;
                
                // Efficacité contre la cible
                score += calculateTargetEfficiency(ability, decision.target, gameState) * 10;
                
                // Pénalité pour le coût en mana
                double currentMana = getDoubleValue(gameState, "current_mana", 100);
                if (ability.manaCost > currentMana * 0.5) {
                    score -= 10; // Éviter de gaspiller trop de mana
                }
            }
        }
        
        // Score basé sur la priorité tactique
        score += calculateTacticalPriority(decision, gameState);
        
        // Ajouter un peu d'aléatoire pour éviter la prédictibilité
        score += Math.random() * 5;
        
        return Math.max(0, score);
    }
    
    /**
     * Prédit les résultats d'une décision (RollStatsGraph)
     */
    private List<String> predictOutcomes(AIDecision decision, Map<String, Object> gameState) {
        List<String> outcomes = new ArrayList<>();
        
        if (decision.action.equals("use_ability")) {
            ParsedAbility ability = abilityCache.get((String) decision.parameters.get("ability"));
            if (ability != null) {
                // Prédire les dégâts
                if (ability.effects.containsKey("damage")) {
                    double damage = ability.effects.get("damage") * ability.effects.getOrDefault("power_multiplier", 1.0);
                    outcomes.add(String.format("Dégâts prédits: %.0f-%.0f", damage * 0.8, damage * 1.2));
                }
                
                // Prédire les effets
                if (ability.effects.containsKey("stun")) {
                    outcomes.add("Étourdissement probable (" + (ability.successProbability * 100) + "%)");
                }
                
                // Prédire les conséquences quantiques
                if (ability.effects.containsKey("quantum_entanglement")) {
                    outcomes.add("Intrication quantique créée - effets propagés aux alliés proches");
                }
                
                if (ability.effects.containsKey("temporal_manipulation")) {
                    outcomes.add("Manipulation temporelle - cooldowns ennemis augmentés");
                }
            }
        }
        
        return outcomes;
    }
    
    /**
     * Calcule les bonus de synergie
     */
    private double calculateSynergyBonus(ParsedAbility ability, Map<String, Object> gameState) {
        double bonus = 0.0;
        List<String> activeBuffs = (List<String>) gameState.getOrDefault("active_buffs", new ArrayList<>());
        
        for (String synergy : ability.synergies) {
            if (activeBuffs.contains(synergy)) {
                bonus += 1.0;
            }
        }
        
        return bonus;
    }
    
    /**
     * Met à jour la mémoire tactique après une action
     */
    public void updateMemoryWithResult(String aiId, AIDecision decision, boolean success, double effectiveness) {
        TacticalMemory memory = tacticalMemories.get(aiId);
        if (memory == null) return;
        
        String actionKey = decision.action + "_" + decision.parameters.get("ability");
        
        // Mettre à jour le taux de succès
        double currentRate = memory.actionSuccessRates.getOrDefault(actionKey, 0.5);
        double newRate = currentRate * 0.8 + (success ? effectiveness : 0.0) * 0.2;
        memory.actionSuccessRates.put(actionKey, newRate);
        
        // Incrémenter le compteur d'usage
        memory.actionUsageCount.merge(actionKey, 1, Integer::sum);
        
        // Ajouter aux patterns efficaces si très bon
        if (success && effectiveness > 0.8) {
            String pattern = decision.action + " -> " + decision.target + " (" + decision.reasoning + ")";
            if (!memory.effectivePatterns.contains(pattern)) {
                memory.effectivePatterns.add(pattern);
            }
        }
    }
    
    // Méthodes utilitaires
    
    private void updateMemory(TacticalMemory memory, AIDecision decision) {
        // Mise à jour simplifiée pour l'instant
        String actionKey = decision.action + "_" + decision.parameters.get("ability");
        memory.actionUsageCount.merge(actionKey, 1, Integer::sum);
    }
    
    private double getDoubleValue(Map<String, Object> map, String key, double defaultValue) {
        Object value = map.get(key);
        if (value instanceof Number) {
            return ((Number) value).doubleValue();
        }
        return defaultValue;
    }
    
    private List<ParsedAbility> getAvailableAbilities(Map<String, Object> gameState) {
        // TODO: Implémenter la récupération des capacités disponibles
        return new ArrayList<>(abilityCache.values());
    }
    
    private List<Map<String, Object>> getValidTargets(ParsedAbility ability, 
            List<Map<String, Object>> enemies, 
            List<Map<String, Object>> allies,
            Map<String, Object> gameState) {
        
        List<Map<String, Object>> targets = new ArrayList<>();
        
        switch (ability.targetType) {
            case "enemy":
                targets.addAll(enemies);
                break;
            case "ally":
                targets.addAll(allies);
                break;
            case "self":
                targets.add(gameState);
                break;
            case "area":
                // Pour les capacités de zone, on cible une position
                Map<String, Object> areaTarget = new HashMap<>();
                areaTarget.put("id", "area_center");
                areaTarget.put("x", calculateOptimalAreaPosition(enemies, allies));
                targets.add(areaTarget);
                break;
        }
        
        return targets;
    }
    
    private String generateReasoning(ParsedAbility ability, Map<String, Object> target, 
            Map<String, Object> gameState, TacticalMemory memory) {
        
        StringBuilder reasoning = new StringBuilder();
        
        // Analyser pourquoi cette capacité est choisie
        if (ability.effects.containsKey("damage")) {
            reasoning.append("Infliger des dégâts élevés. ");
        }
        
        if (ability.synergies.size() > 0) {
            reasoning.append("Synergies actives détectées. ");
        }
        
        // Vérifier l'historique
        String actionKey = "use_ability_" + ability.name;
        Double successRate = memory.actionSuccessRates.get(actionKey);
        if (successRate != null && successRate > 0.7) {
            reasoning.append("Historique de succès élevé (").append(String.format("%.0f%%", successRate * 100)).append("). ");
        }
        
        return reasoning.toString();
    }
    
    private double calculateSuccessProbability(ParsedAbility ability) {
        // Plus la capacité est complexe, plus elle est difficile à réussir
        double complexity = ability.quantumGrammar != null ? ability.quantumGrammar.length() / 50.0 : 0;
        return Math.max(0.5, 1.0 - complexity * 0.3);
    }
    
    private boolean isInDanger(Map<String, Object> gameState) {
        double health = getDoubleValue(gameState, "current_health", 100);
        double maxHealth = getDoubleValue(gameState, "max_health", 100);
        return health < maxHealth * 0.3;
    }
    
    private List<AIDecision> generateMovementDecisions(Map<String, Object> gameState, 
            List<Map<String, Object>> enemies, List<Map<String, Object>> allies) {
        // TODO: Implémenter la génération de décisions de mouvement tactique
        return new ArrayList<>();
    }
    
    private List<AIDecision> generateDefensiveDecisions(Map<String, Object> gameState) {
        // TODO: Implémenter la génération de décisions défensives
        return new ArrayList<>();
    }
    
    private double calculateTargetEfficiency(ParsedAbility ability, String targetId, Map<String, Object> gameState) {
        // TODO: Calculer l'efficacité contre une cible spécifique
        return 1.0;
    }
    
    private double calculateTacticalPriority(AIDecision decision, Map<String, Object> gameState) {
        // TODO: Calculer la priorité tactique de la décision
        return 0.0;
    }
    
    private Map<String, Double> calculateOptimalAreaPosition(List<Map<String, Object>> enemies, 
            List<Map<String, Object>> allies) {
        // TODO: Calculer la position optimale pour une capacité de zone
        Map<String, Double> position = new HashMap<>();
        position.put("x", 0.0);
        position.put("y", 0.0);
        return position;
    }
    
    private AIDecision createDefaultDecision() {
        AIDecision decision = new AIDecision();
        decision.action = "basic_attack";
        decision.reasoning = "Aucune meilleure option disponible";
        decision.score = 10.0;
        return decision;
    }
    
    /**
     * Exporte l'analyse de l'IA pour debug
     */
    public Map<String, Object> exportAIAnalysis(String aiId) {
        Map<String, Object> analysis = new HashMap<>();
        
        TacticalMemory memory = tacticalMemories.get(aiId);
        if (memory != null) {
            analysis.put("action_success_rates", memory.actionSuccessRates);
            analysis.put("action_usage_counts", memory.actionUsageCount);
            analysis.put("effective_patterns", memory.effectivePatterns);
            analysis.put("learned_weaknesses", memory.enemyWeaknesses);
        }
        
        analysis.put("parsed_abilities", abilityCache.size());
        analysis.put("quantum_understanding", true);
        
        return analysis;
    }
} 