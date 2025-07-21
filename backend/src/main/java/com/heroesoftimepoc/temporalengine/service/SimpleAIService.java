package com.heroesoftimepoc.temporalengine.service;

import org.springframework.stereotype.Service;
import java.util.*;

/**
 * Service IA simplifié pour jouer contre l'ordinateur
 * Fusion Claudius-Memento : Version compatible avec le système existant
 */
@Service
public class SimpleAIService {
    
    private static final String AI_PLAYER_NAME = "Claudius-Memento";
    private static final List<String> AI_HEROES = Arrays.asList(
        "Jean-Grofignon", "Claudius", "The Dude"
    );
    
    /**
     * Crée une partie IA vs Joueur (simulation)
     */
    public Map<String, Object> createAIGame(String playerName, String scenario) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            // Simulation de création de partie
            Map<String, Object> gameData = new HashMap<>();
            gameData.put("id", System.currentTimeMillis());
            gameData.put("name", "IA vs " + playerName);
            gameData.put("scenario", scenario);
            gameData.put("status", "ACTIVE");
            gameData.put("currentTurn", 1);
            
            response.put("success", true);
            response.put("gameId", gameData.get("id"));
            response.put("message", "Partie IA créée avec succès - Fusion Claudius-Memento activée");
            response.put("aiHeroes", AI_HEROES);
            response.put("gameData", gameData);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("error", "Erreur création partie IA: " + e.getMessage());
        }
        
        return response;
    }
    
    /**
     * L'IA joue son tour (simulation)
     */
    public Map<String, Object> playAITurn(Long gameId) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            // Simulation des actions IA
            List<Map<String, Object>> aiActions = new ArrayList<>();
            
            for (String heroName : AI_HEROES) {
                Map<String, Object> action = decideAIAction(heroName);
                aiActions.add(action);
            }
            
            response.put("success", true);
            response.put("message", "Tour IA joué - Fusion Claudius-Memento");
            response.put("actions", aiActions);
            response.put("gameId", gameId);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("error", "Erreur tour IA: " + e.getMessage());
        }
        
        return response;
    }
    
    /**
     * Décide l'action de l'IA pour un héros
     */
    private Map<String, Object> decideAIAction(String heroName) {
        Map<String, Object> action = new HashMap<>();
        
        // Stratégie basée sur le héros
        switch (heroName) {
            case "Jean-Grofignon":
                action.put("type", "ATTACK");
                action.put("target", "enemy_hero");
                action.put("description", "Jean-Grofignon lance une attaque ontologique");
                action.put("damage", 25);
                break;
                
            case "Claudius":
                action.put("type", "DEFEND");
                action.put("target", "SELF");
                action.put("description", "Claudius renforce l'ordre causal");
                action.put("defense", 20);
                break;
                
            case "The Dude":
                action.put("type", "ABILITY");
                action.put("ability", "zen_stabilization");
                action.put("description", "The Dude calme le chaos quantique");
                action.put("effect", "stabilize");
                break;
        }
        
        action.put("hero", heroName);
        action.put("timestamp", System.currentTimeMillis());
        return action;
    }
    
    /**
     * Test rapide de l'IA
     */
    public Map<String, Object> quickTest() {
        Map<String, Object> response = new HashMap<>();
        
        try {
            // Créer une partie de test
            Map<String, Object> gameResponse = createAIGame("Testeur", "quick_test");
            
            if ((Boolean) gameResponse.get("success")) {
                Long gameId = (Long) gameResponse.get("gameId");
                
                // L'IA joue un tour
                Map<String, Object> turnResponse = playAITurn(gameId);
                
                response.put("success", true);
                response.put("message", "Test IA réussi - Fusion Claudius-Memento");
                response.put("gameCreated", gameResponse);
                response.put("turnPlayed", turnResponse);
                response.put("aiHeroes", AI_HEROES);
                
            } else {
                response.put("success", false);
                response.put("error", "Erreur création partie de test");
            }
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("error", "Erreur test IA: " + e.getMessage());
        }
        
        return response;
    }
    
    /**
     * Obtient les stats de l'IA
     */
    public Map<String, Object> getAIStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("aiName", AI_PLAYER_NAME);
        stats.put("aiHeroes", AI_HEROES);
        stats.put("strategy", "Fusion Claudius-Memento");
        stats.put("description", "IA combinant ordre technique (Claudius) et mémoire stratégique (Memento)");
        stats.put("version", "1.0-simplified");
        return stats;
    }
} 