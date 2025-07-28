package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.*;

/**
 * Anna Martel's Temporal Decay System
 * Manages temporal degradation of game elements
 */
@Service
public class TemporalDecayService {

    @Autowired
    private GameService gameService;
    
    // Service start time for fallback age calculation
    private final long startTime = System.currentTimeMillis();

    /**
     * Apply temporal decay to a game
     */
    public Map<String, Object> applyDecay(String gameId) {
        Map<String, Object> result = new HashMap<>();
        
        try {
            Map<String, Object> game = gameService.getGame(gameId);
            
            // Calculate decay based on game age and activity
            int decayLevel = calculateDecayLevel(game);
            int affectedBuildings = applyBuildingDecay(game, decayLevel);
            int affectedHeroes = applyHeroDecay(game, decayLevel);
            
            result.put("success", true);
            result.put("decayLevel", decayLevel);
            result.put("affectedBuildings", affectedBuildings);
            result.put("affectedHeroes", affectedHeroes);
            result.put("message", "Anna's temporal decay applied - " + decayLevel + "% degradation");
            result.put("quote", getAnnaQuote(decayLevel));
            
        } catch (Exception e) {
            result.put("success", false);
            result.put("error", e.getMessage());
        }
        
        return result;
    }

    /**
     * Repair temporal decay damage
     */
    public Map<String, Object> repairDecay(String gameId, String heroName, int x, int y) {
        Map<String, Object> result = new HashMap<>();
        
        try {
            Map<String, Object> game = gameService.getGame(gameId);
            
            // Anna's repair mechanics
            int repairEfficiency = calculateRepairEfficiency(heroName);
            int repairedBuildings = performRepairs(game, x, y, repairEfficiency);
            
            result.put("success", true);
            result.put("repairedBuildings", repairedBuildings);
            result.put("efficiency", repairEfficiency);
            result.put("message", "Anna's temporal repairs completed at (" + x + "," + y + ")");
            result.put("quote", "Time flows backward where Anna touches...");
            
        } catch (Exception e) {
            result.put("success", false);
            result.put("error", e.getMessage());
        }
        
        return result;
    }

    /**
     * Get decay statistics for a game
     */
    public Map<String, Object> getDecayStats(String gameId) {
        Map<String, Object> stats = new HashMap<>();
        
        try {
            Map<String, Object> game = gameService.getGame(gameId);
            
            int currentDecay = calculateDecayLevel(game);
            Map<String, Integer> buildingHealth = analyzeBuildingHealth(game);
            Map<String, Integer> heroVitality = analyzeHeroVitality(game);
            
            stats.put("gameId", gameId);
            stats.put("currentDecayLevel", currentDecay);
            stats.put("buildingHealth", buildingHealth);
            stats.put("heroVitality", heroVitality);
            stats.put("temporalStability", 100 - currentDecay);
            stats.put("annaPresence", currentDecay > 50 ? "Critical" : "Stable");
            
        } catch (Exception e) {
            stats.put("error", e.getMessage());
        }
        
        return stats;
    }

    /**
     * Get system information
     */
    public Map<String, Object> getSystemInfo() {
        Map<String, Object> info = new HashMap<>();
        
        info.put("name", "Anna Martel's Temporal Decay System");
        info.put("version", "2.0");
        info.put("status", "Active");
        info.put("architect", "Anna Martel - Time Architect");
        info.put("description", "Manages temporal degradation and repair mechanics");
        info.put("capabilities", Arrays.asList(
            "Building decay calculation",
            "Hero vitality monitoring", 
            "Temporal repair mechanics",
            "Reality stability analysis"
        ));
        
        return info;
    }

    // Private helper methods

    private int calculateDecayLevel(Map<String, Object> game) {
        // Anna's complex decay algorithm
        long gameAge = getGameAge(game);
        int playerActivity = getPlayerActivity(game);
        
        // Base decay increases with time
        int baseDecay = (int) Math.min(gameAge / 1000, 80); // Max 80% base decay
        
        // Activity reduces decay
        int activityReduction = Math.min(playerActivity * 2, 60);
        
        return Math.max(0, baseDecay - activityReduction);
    }

    private int applyBuildingDecay(Map<String, Object> game, int decayLevel) {
        // Simulate building decay effects
        return Math.max(0, decayLevel / 10); // Affected buildings
    }

    private int applyHeroDecay(Map<String, Object> game, int decayLevel) {
        // Simulate hero decay effects  
        return Math.max(0, decayLevel / 15); // Affected heroes
    }

    private int calculateRepairEfficiency(String heroName) {
        // Different heroes have different repair abilities
        switch (heroName.toLowerCase()) {
            case "anna":
            case "anna martel":
                return 95; // Anna is the best at repairs
            case "arthur":
                return 70;
            case "merlin":
                return 80;
            default:
                return 50;
        }
    }

    private int performRepairs(Map<String, Object> game, int x, int y, int efficiency) {
        // Simulate repair mechanics
        return Math.max(1, efficiency / 20); // Repaired buildings
    }

    private Map<String, Integer> analyzeBuildingHealth(Map<String, Object> game) {
        Map<String, Integer> health = new HashMap<>();
        health.put("castle", 85);
        health.put("barracks", 70);
        health.put("market", 90);
        return health;
    }

    private Map<String, Integer> analyzeHeroVitality(Map<String, Object> game) {
        Map<String, Integer> vitality = new HashMap<>();
        vitality.put("arthur", 80);
        vitality.put("merlin", 75);
        vitality.put("anna", 100); // Anna is immune to her own decay
        return vitality;
    }

    private long getGameAge(Map<String, Object> game) {
        // Real game age calculation based on creation timestamp
        if (game.containsKey("createdAt")) {
            long createdAt = (Long) game.get("createdAt");
            return System.currentTimeMillis() - createdAt;
        } else if (game.containsKey("turn")) {
            // Fallback: estimate age from turn number (assuming 5 minutes per turn average)
            int turn = (Integer) game.get("turn");
            return turn * 5 * 60 * 1000L; // 5 minutes per turn in milliseconds
        } else {
            // Fallback: use session start if no other timestamp available
            return System.currentTimeMillis() - startTime;
        }
    }

    private int getPlayerActivity(Map<String, Object> game) {
        // Simulate player activity calculation
        return 20 + (int)(Math.random() * 30); // Random activity 20-50
    }

    private String getAnnaQuote(int decayLevel) {
        String[] quotes = {
            "Time heals all wounds... but I control time.",
            "Your buildings crumble, but my vision endures.",
            "Decay is just change wearing a different mask.",
            "I didn't come to destroy - I came to rebuild properly.",
            "Even gods must face entropy. I make it beautiful."
        };
        
        return quotes[decayLevel % quotes.length];
    }
} 