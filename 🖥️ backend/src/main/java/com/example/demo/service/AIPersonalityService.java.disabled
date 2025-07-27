package com.example.demo.service;

import com.example.demo.model.AIPlayer;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class AIPersonalityService {
    
    // Personnalités existantes + nouvelles
    public enum AIPersonality {
        AGGRESSIVE("Agressif", "Attaque constamment"),
        DEFENSIVE("Défensif", "Protège ses positions"),
        BALANCED("Équilibré", "Stratégie mixte"),
        EXPLORER("Explorateur", "Cherche les secrets"),
        BUILDER("Bâtisseur", "Focus économie"),
        
        // Nouvelles personnalités quantiques
        GROFI_INTERSTICE("Grofi", "Voit toutes les couches, comprend les intersections"),
        ZHUANGRI_DREAMER("Zhuangri", "Logique onirique, actions imprévisibles"),
        TEMPORAL_PARADOX("Paradoxal", "Crée des paradoxes volontairement"),
        QUANTUM_GAMBLER("Parieur Quantique", "Utilise le 50-50 constamment")
    }
    
    /**
     * Obtenir le comportement d'une personnalité
     */
    public Map<String, Object> getPersonalityBehavior(AIPersonality personality) {
        Map<String, Object> behavior = new HashMap<>();
        
        switch (personality) {
            case GROFI_INTERSTICE:
                behavior.put("vision", "OMNISCIENT");
                behavior.put("decision_style", "INTERSECTION_BASED");
                behavior.put("special_abilities", Arrays.asList(
                    "see_all_timelines",
                    "understand_hidden_connections",
                    "switch_view_modes",
                    "create_shortcuts"
                ));
                behavior.put("priority_weights", Map.of(
                    "exploration", 0.8,
                    "combat", 0.4,
                    "building", 0.6,
                    "paradox_creation", 0.9
                ));
                break;
                
            case ZHUANGRI_DREAMER:
                behavior.put("vision", "DREAM_LOGIC");
                behavior.put("decision_style", "NON_LINEAR");
                behavior.put("special_abilities", Arrays.asList(
                    "phase_through_obstacles",
                    "create_dream_echoes",
                    "reality_manipulation",
                    "unpredictable_actions"
                ));
                behavior.put("priority_weights", Map.of(
                    "exploration", 0.9,
                    "combat", 0.3,
                    "building", 0.2,
                    "reality_alteration", 1.0
                ));
                // Actions aléatoires 30% du temps
                behavior.put("randomness_factor", 0.3);
                break;
                
            case TEMPORAL_PARADOX:
                behavior.put("vision", "TEMPORAL");
                behavior.put("decision_style", "PARADOX_SEEKING");
                behavior.put("special_abilities", Arrays.asList(
                    "create_bootstrap_paradox",
                    "temporal_rewind",
                    "causality_manipulation"
                ));
                behavior.put("priority_weights", Map.of(
                    "paradox_creation", 1.0,
                    "timeline_disruption", 0.8,
                    "normal_actions", 0.2
                ));
                break;
                
            case QUANTUM_GAMBLER:
                behavior.put("vision", "PROBABILISTIC");
                behavior.put("decision_style", "FIFTY_FIFTY");
                behavior.put("special_abilities", Arrays.asList(
                    "force_fifty_fifty",
                    "probability_manipulation",
                    "quantum_dice_roll"
                ));
                behavior.put("priority_weights", Map.of(
                    "risky_actions", 1.0,
                    "safe_actions", 0.0,
                    "gambling", 0.9
                ));
                // Toutes les décisions à 50/50
                behavior.put("decision_method", "COIN_FLIP");
                break;
                
            default:
                // Comportements classiques existants
                behavior = getClassicBehavior(personality);
        }
        
        return behavior;
    }
    
    /**
     * Décision spéciale pour Grofi
     */
    public AIPlayer.AIDecision makeGrofiDecision(AIPlayer aiPlayer, Map<String, Object> gameState) {
        AIPlayer.AIDecision decision = new AIPlayer.AIDecision();
        
        // Grofi voit toutes les couches
        List<String> visibleLayers = Arrays.asList("tactical", "strategic", "temporal", "interstice");
        
        // Analyser les intersections
        Map<String, Object> intersections = findIntersections(gameState, visibleLayers);
        
        // Décider basé sur les intersections
        if (intersections.containsKey("hidden_portal")) {
            decision.setDecisionType("USE_PORTAL");
            decision.setTarget((String) intersections.get("hidden_portal"));
            decision.setReasoning("J'ai vu une connexion que personne d'autre ne peut voir");
        } else if (intersections.containsKey("timeline_convergence")) {
            decision.setDecisionType("CREATE_PARADOX");
            decision.setReasoning("Les timelines convergent, c'est le moment parfait");
        } else {
            // Action normale mais avec vision augmentée
            decision = makeStandardDecision(aiPlayer, gameState);
            decision.setReasoning(decision.getReasoning() + " (avec vision intersticielle)");
        }
        
        return decision;
    }
    
    /**
     * Décision spéciale pour Zhuangri
     */
    public AIPlayer.AIDecision makeZhuangriDecision(AIPlayer aiPlayer, Map<String, Object> gameState) {
        AIPlayer.AIDecision decision = new AIPlayer.AIDecision();
        
        // 30% de chance d'action onirique
        if (Math.random() < 0.3) {
            // Action complètement imprévisible
            String[] dreamActions = {
                "PHASE_THROUGH_WALL",
                "CREATE_DREAM_ECHO",
                "REALITY_SHIFT",
                "BUTTERFLY_EFFECT"
            };
            
            decision.setDecisionType(dreamActions[(int)(Math.random() * dreamActions.length)]);
            decision.setReasoning("Je rêve que " + generateDreamReason());
            decision.setConfidence(Math.random()); // Confiance aléatoire
        } else {
            // Action semi-logique
            decision = makeStandardDecision(aiPlayer, gameState);
            // Modifier la décision avec logique de rêve
            decision.setReasoning("Dans mon rêve, " + decision.getReasoning().toLowerCase());
        }
        
        return decision;
    }
    
    private Map<String, Object> findIntersections(Map<String, Object> gameState, List<String> layers) {
        Map<String, Object> intersections = new HashMap<>();
        
        // Logique pour trouver les intersections entre couches
        // Simplifié pour l'exemple
        if (gameState.containsKey("portals")) {
            intersections.put("hidden_portal", "portal_to_interstice");
        }
        
        return intersections;
    }
    
    private String generateDreamReason() {
        String[] reasons = {
            "je suis un papillon qui rêve d'être un héros",
            "la réalité est trop rigide",
            "les murs n'existent pas vraiment",
            "le futur m'a dit de le faire",
            "c'est ce qui arrive dans toutes les timelines"
        };
        return reasons[(int)(Math.random() * reasons.length)];
    }
    
    private AIPlayer.AIDecision makeStandardDecision(AIPlayer aiPlayer, Map<String, Object> gameState) {
        // Logique de décision standard existante
        AIPlayer.AIDecision decision = new AIPlayer.AIDecision();
        decision.setDecisionType("MOVE");
        decision.setTarget("nearest_objective");
        decision.setConfidence(0.8);
        decision.setReasoning("Stratégie optimale calculée");
        return decision;
    }
    
    private Map<String, Object> getClassicBehavior(AIPersonality personality) {
        // Comportements classiques existants
        Map<String, Object> behavior = new HashMap<>();
        behavior.put("vision", "NORMAL");
        behavior.put("decision_style", "STANDARD");
        return behavior;
    }
}