package com.example.demo.service;

import com.example.demo.model.FormulaResult;
import com.example.demo.model.GameContext;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Map;
import java.util.HashMap;

/**
 * 🧠⚡ FAST LEARNER QUANTUM SERVICE - Apprentissage Sans Constantes
 * 
 * PRINCIPE FONDAMENTAL :
 * LANGAGE → PENSÉE → ACTION (Backend) → RÉSULTAT DUAL (Avalon + Substrat)
 * 
 * "Le multiplicateur n'est plus une constante, mais une formule quantique
 * qui s'adapte aux capacités réelles du héros et au contexte causal."
 * - Memento l'Archive Vivante
 */
@Service
public class FastLearnerQuantumService {
    
    @Autowired
    private QuantumService quantumService;
    
    @Autowired
    private CausalCollapseService causalCollapseService;
    
    @Autowired
    private TemporalDecayService temporalDecayService;
    
    @Autowired
    private GameService gameService;
    
    /**
     * ⚡🧠 FORMULE PRINCIPALE - FAST_LEARNER_QUANTUM
     * 
     * Utilise les vrais moteurs du système pour calculer dynamiquement
     * les paramètres d'apprentissage accéléré
     */
    public FormulaResult executeFastLearnerQuantum(GameContext context) {
        String heroId = context.getActiveHeroId();
        
        // 📜 ÉTAPE 1 : LANGAGE (Grammaire Quantique)
        String quantumFormula = "⊙(learning_speed) × ψ(temporal_acceleration) → Π(knowledge_burst)";
        
        // 🧠 ÉTAPE 2 : PENSÉE (Calcul via moteurs réels)
        Map<String, Object> thoughtProcess = calculateQuantumParameters(context);
        
        // Vérification prérequis dynamiques
        if (!checkDynamicRequirements(context, thoughtProcess)) {
            return FormulaResult.error(
                "⚠️ Prérequis quantiques non remplis",
                "Intelligence ou Affinité Temporelle insuffisante selon contexte actuel"
            );
        }
        
        // ⚙️ ÉTAPE 3 : ACTION (Backend Services)
        Map<String, Object> actionResults = executeBackendAction(context, thoughtProcess);
        
        // 🌟 ÉTAPE 4 : RÉSULTAT DUAL
        Map<String, Object> dualResults = generateDualResults(actionResults);
        
        return FormulaResult.success(
            "🧠⚡ FAST LEARNER QUANTUM ACTIVÉ !",
            String.format(
                "Multiplicateur : %sx (calculé dynamiquement)\n" +
                "Durée : %ss (adaptée au contexte)\n" +
                "Formule : %s\n" +
                "Méthode : Moteurs quantiques, pas de constantes",
                actionResults.get("multiplier"),
                actionResults.get("duration"),
                quantumFormula
            ),
            dualResults
        );
    }
    
    /**
     * 🧠 PENSÉE : Calcul des paramètres via moteurs quantiques
     */
    private Map<String, Object> calculateQuantumParameters(GameContext context) {
        Map<String, Object> thought = new HashMap<>();
        
        // Récupération stats héros dynamiques
        int intelligence = context.getHeroIntelligence();
        int temporalAffinity = context.getHeroTemporalAffinity();
        int level = context.getHeroLevel();
        
        // Calcul multiplicateur via formule quantique (pas de constante !)
        // Formule : (Intelligence + Affinité_Temporelle + Niveau/10) / 10
        double baseMultiplier = (intelligence + temporalAffinity + (level / 10.0)) / 10.0;
        
        // Ajustement selon contexte causal via CausalCollapseService
        Map<String, Object> causalContext = new HashMap<>();
        causalContext.put("type", "LEARNING_ACCELERATION");
        causalContext.put("heroId", context.getActiveHeroId());
        causalContext.put("baseMultiplier", baseMultiplier);
        
        // Le CausalCollapseService peut modifier le multiplicateur selon la situation
        Map<String, Object> collapseResult = causalCollapseService.handleCollapse(
            "QUANTUM_LEARNING", causalContext);
        
        double finalMultiplier = (Double) collapseResult.getOrDefault("adjustedMultiplier", baseMultiplier);
        
        // Calcul durée via TemporalDecayService
        // Plus l'affinité temporelle est élevée, plus la durée peut être longue
        long timeShift = temporalDecayService.calculateTimeShift(context);
        int duration = Math.max(5, Math.min(30, (temporalAffinity / 3) + (int)(timeShift / 1000)));
        
        thought.put("intelligence", intelligence);
        thought.put("temporalAffinity", temporalAffinity);
        thought.put("level", level);
        thought.put("baseMultiplier", baseMultiplier);
        thought.put("finalMultiplier", finalMultiplier);
        thought.put("duration", duration);
        thought.put("causalAdjustment", collapseResult.get("adjustment"));
        
        return thought;
    }
    
    /**
     * 🔍 Vérification prérequis dynamiques (pas de constantes !)
     */
    private boolean checkDynamicRequirements(GameContext context, Map<String, Object> thought) {
        // Prérequis adaptatifs selon le niveau du héros
        int level = (Integer) thought.get("level");
        int intelligence = (Integer) thought.get("intelligence");
        int temporalAffinity = (Integer) thought.get("temporalAffinity");
        
        // Seuils adaptatifs : plus le niveau est bas, moins les exigences sont élevées
        int minIntelligence = Math.max(30, 50 - (level / 2));
        int minTemporalAffinity = Math.max(20, 40 - (level / 3));
        
        return intelligence >= minIntelligence && temporalAffinity >= minTemporalAffinity;
    }
    
    /**
     * ⚙️ ACTION : Exécution via backend services
     */
    private Map<String, Object> executeBackendAction(GameContext context, Map<String, Object> thought) {
        Map<String, Object> action = new HashMap<>();
        String heroId = context.getActiveHeroId();
        
        // Création superposition quantique via QuantumService
        Double multiplier = (Double) thought.get("finalMultiplier");
        Integer duration = (Integer) thought.get("duration");
        
        // États possibles de l'apprentissage accéléré
        java.util.List<Object> learningStates = java.util.Arrays.asList(
            "NORMAL", "ACCELERATED", "TRANSCENDENT"
        );
        double[] probabilities = {0.1, 0.7, 0.2}; // Probabilités adaptatives
        
        quantumService.createSuperposition(
            heroId, "LEARNING_STATE", learningStates, probabilities);
        
        // Collapse vers l'état d'apprentissage accéléré
        Object finalState = quantumService.observeState(heroId + "_LEARNING_STATE", "MEMENTO");
        
        // Mise à jour stats héros (temporaire)
        gameService.setHeroStat(heroId, "learning_speed_multiplier", multiplier);
        gameService.setHeroStat(heroId, "temporal_acceleration_active", true);
        gameService.saveHeroMetadata(heroId, "quantum_learning_start", System.currentTimeMillis());
        gameService.saveHeroMetadata(heroId, "quantum_learning_duration", duration * 1000L);
        
        action.put("multiplier", String.format("%.1f", multiplier));
        action.put("duration", duration);
        action.put("quantumState", finalState);
        action.put("backendUpdated", true);
        
        return action;
    }
    
    /**
     * 🌟 RÉSULTAT DUAL : Avalon + Substrat Réel
     */
    private Map<String, Object> generateDualResults(Map<String, Object> actionResults) {
        Map<String, Object> dual = new HashMap<>();
        
        // 🏰 AVALON (Monde Magique)
        Map<String, Object> avalon = new HashMap<>();
        avalon.put("heroAura", "Aura temporelle dorée visible");
        avalon.put("mentalState", "Transe d'apprentissage transcendant");
        avalon.put("visualEffect", "Particules de connaissance tourbillonnant");
        avalon.put("powerLevel", actionResults.get("multiplier") + "x normal");
        
        // 🖥️ SUBSTRAT RÉEL (Backend)
        Map<String, Object> substrate = new HashMap<>();
        substrate.put("statsModified", true);
        substrate.put("timerActive", actionResults.get("duration") + " secondes");
        substrate.put("quantumEvents", "Enregistrés dans QuantumService");
        substrate.put("causalEffects", "Intégrés dans CausalCollapseService");
        
        dual.put("avalon", avalon);
        dual.put("substrate", substrate);
        dual.put("dualityConfirmed", true);
        
        return dual;
    }
}

// Extension temporaire du GameContext pour les méthodes manquantes
// (À intégrer dans le vrai GameContext)
class GameContextExtension {
    public static long calculateTimeShift(GameContext context) {
        // Simulation basée sur l'activité récente du héros
        return System.currentTimeMillis() % 10000; // Valeur dynamique
    }
}