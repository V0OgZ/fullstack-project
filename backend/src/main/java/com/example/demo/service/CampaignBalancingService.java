package com.example.demo.service;

import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class CampaignBalancingService {

    public enum DifficultyLevel {
        EASY(0.7, 1.5, 1.2),
        MEDIUM(1.0, 1.0, 1.0),
        HARD(1.3, 0.8, 0.9),
        EXPERT(1.6, 0.6, 0.8);

        private final double aiStrengthMultiplier;
        private final double playerResourceMultiplier;
        private final double playerUnitEffectivenessMultiplier;

        DifficultyLevel(double aiStrength, double playerResources, double playerEffectiveness) {
            this.aiStrengthMultiplier = aiStrength;
            this.playerResourceMultiplier = playerResources;
            this.playerUnitEffectivenessMultiplier = playerEffectiveness;
        }

        public double getAiStrengthMultiplier() { return aiStrengthMultiplier; }
        public double getPlayerResourceMultiplier() { return playerResourceMultiplier; }
        public double getPlayerUnitEffectivenessMultiplier() { return playerUnitEffectivenessMultiplier; }
    }

    public static class BalancingConfig {
        private DifficultyLevel difficulty;
        private int playerCount;
        private String mapSize;
        private Map<String, Double> resourceMultipliers;
        private Map<String, Double> unitBalancing;
        private Map<String, Double> buildingCosts;
        private List<String> availableUnits;
        private Map<String, Object> specialRules;

        public BalancingConfig(DifficultyLevel difficulty, int playerCount, String mapSize) {
            this.difficulty = difficulty;
            this.playerCount = playerCount;
            this.mapSize = mapSize;
            this.resourceMultipliers = new HashMap<>();
            this.unitBalancing = new HashMap<>();
            this.buildingCosts = new HashMap<>();
            this.availableUnits = new ArrayList<>();
            this.specialRules = new HashMap<>();
            
            initializeDefaults();
        }

        private void initializeDefaults() {
            // Default resource multipliers
            resourceMultipliers.put("gold", difficulty.getPlayerResourceMultiplier());
            resourceMultipliers.put("wood", difficulty.getPlayerResourceMultiplier());
            resourceMultipliers.put("stone", difficulty.getPlayerResourceMultiplier());
            resourceMultipliers.put("mana", difficulty.getPlayerResourceMultiplier() * 0.8);

            // Default unit balancing
            unitBalancing.put("pikeman", 1.0);
            unitBalancing.put("archer", 1.1);
            unitBalancing.put("griffin", 1.3);
            unitBalancing.put("swordsman", 1.2);
            unitBalancing.put("cavalry", 1.4);
            unitBalancing.put("mage", 1.5);

            // Default building costs
            buildingCosts.put("barracks", 300.0);
            buildingCosts.put("archery_range", 400.0);
            buildingCosts.put("griffin_tower", 1000.0);
            buildingCosts.put("magic_guild", 2000.0);
            buildingCosts.put("castle_walls", 5000.0);

            // Available units based on difficulty
            availableUnits.addAll(Arrays.asList("pikeman", "archer"));
            if (difficulty != DifficultyLevel.EASY) {
                availableUnits.addAll(Arrays.asList("griffin", "swordsman"));
            }
            if (difficulty == DifficultyLevel.HARD || difficulty == DifficultyLevel.EXPERT) {
                availableUnits.addAll(Arrays.asList("cavalry", "mage"));
            }
        }

        // Getters and setters
        public DifficultyLevel getDifficulty() { return difficulty; }
        public int getPlayerCount() { return playerCount; }
        public String getMapSize() { return mapSize; }
        public Map<String, Double> getResourceMultipliers() { return resourceMultipliers; }
        public Map<String, Double> getUnitBalancing() { return unitBalancing; }
        public Map<String, Double> getBuildingCosts() { return buildingCosts; }
        public List<String> getAvailableUnits() { return availableUnits; }
        public Map<String, Object> getSpecialRules() { return specialRules; }
    }

    /**
     * Create balanced configuration for a scenario
     */
    public BalancingConfig createBalancedConfig(String scenarioType, DifficultyLevel difficulty, int playerCount) {
        String mapSize = determineMapSize(playerCount);
        BalancingConfig config = new BalancingConfig(difficulty, playerCount, mapSize);

        // Apply scenario-specific balancing
        switch (scenarioType.toLowerCase()) {
            case "classic":
                applyClassicBalancing(config);
                break;
            case "mystical":
                applyMysticalBalancing(config);
                break;
            case "multiplayer":
                applyMultiplayerBalancing(config);
                break;
            case "campaign":
                applyCampaignBalancing(config);
                break;
            default:
                applyDefaultBalancing(config);
        }

        return config;
    }

    /**
     * Apply classic scenario balancing
     */
    private void applyClassicBalancing(BalancingConfig config) {
        // Classic mode: balanced, traditional gameplay
        config.getSpecialRules().put("enableTeleport", false);
        config.getSpecialRules().put("enableTimeManipulation", false);
        config.getSpecialRules().put("maxTurns", 100);
        config.getSpecialRules().put("victoryCondition", "conquest");

        // Slightly boost defensive units
        config.getUnitBalancing().put("pikeman", 1.1);
        config.getUnitBalancing().put("archer", 1.0);
    }

    /**
     * Apply mystical scenario balancing
     */
    private void applyMysticalBalancing(BalancingConfig config) {
        // Mystical mode: enhanced magic and temporal mechanics
        config.getResourceMultipliers().put("mana", config.getDifficulty().getPlayerResourceMultiplier() * 1.5);
        
        config.getSpecialRules().put("enableTeleport", true);
        config.getSpecialRules().put("enableTimeManipulation", true);
        config.getSpecialRules().put("maxTurns", 150);
        config.getSpecialRules().put("victoryCondition", "artifacts");
        config.getSpecialRules().put("temporalStability", 100);

        // Boost magical units
        config.getUnitBalancing().put("mage", 1.3);
        config.getAvailableUnits().addAll(Arrays.asList("elemental", "phoenix", "dragon"));

        // Add temporal buildings
        config.getBuildingCosts().put("temporal_nexus", 3000.0);
        config.getBuildingCosts().put("chrono_chamber", 2500.0);
    }

    /**
     * Apply multiplayer scenario balancing
     */
    private void applyMultiplayerBalancing(BalancingConfig config) {
        // Multiplayer mode: fast-paced, competitive
        config.getResourceMultipliers().replaceAll((k, v) -> v * 1.2); // Faster resource generation
        
        config.getSpecialRules().put("enableRanking", true);
        config.getSpecialRules().put("maxTurns", 75);
        config.getSpecialRules().put("victoryCondition", "elimination");
        config.getSpecialRules().put("turnTimeLimit", 120); // 2 minutes per turn

        // Balance all units for competitive play
        config.getUnitBalancing().replaceAll((k, v) -> 1.0);
        
        // Reduce building costs for faster gameplay
        config.getBuildingCosts().replaceAll((k, v) -> v * 0.8);
    }

    /**
     * Apply campaign scenario balancing
     */
    private void applyCampaignBalancing(BalancingConfig config) {
        // Campaign mode: progressive difficulty
        config.getSpecialRules().put("enableProgression", true);
        config.getSpecialRules().put("maxTurns", 200);
        config.getSpecialRules().put("victoryCondition", "story");
        config.getSpecialRules().put("allowSaveLoad", true);

        // Progressive unit unlocking
        config.getSpecialRules().put("unlockedUnits", getProgressiveUnits(config.getDifficulty()));
        
        // Story-based resource scaling
        applyStoryBasedScaling(config);
    }

    /**
     * Apply default balancing
     */
    private void applyDefaultBalancing(BalancingConfig config) {
        // Standard balanced gameplay
        config.getSpecialRules().put("maxTurns", 100);
        config.getSpecialRules().put("victoryCondition", "conquest");
    }

    /**
     * Determine appropriate map size based on player count
     */
    private String determineMapSize(int playerCount) {
        if (playerCount <= 2) return "medium";
        if (playerCount <= 4) return "large";
        return "huge";
    }

    /**
     * Get progressive unit unlocks for campaign
     */
    private List<String> getProgressiveUnits(DifficultyLevel difficulty) {
        List<String> units = new ArrayList<>();
        
        // Tier 1 units (always available)
        units.addAll(Arrays.asList("pikeman", "archer"));
        
        // Tier 2 units
        if (difficulty != DifficultyLevel.EASY) {
            units.addAll(Arrays.asList("griffin", "swordsman"));
        }
        
        // Tier 3 units
        if (difficulty == DifficultyLevel.HARD || difficulty == DifficultyLevel.EXPERT) {
            units.addAll(Arrays.asList("cavalry", "mage", "champion"));
        }
        
        // Tier 4 units (expert only)
        if (difficulty == DifficultyLevel.EXPERT) {
            units.addAll(Arrays.asList("dragon", "archangel", "titan"));
        }
        
        return units;
    }

    /**
     * Apply story-based resource scaling
     */
    private void applyStoryBasedScaling(BalancingConfig config) {
        // Early game: limited resources
        config.getResourceMultipliers().replaceAll((k, v) -> v * 0.8);
        
        // Special campaign buildings
        config.getBuildingCosts().put("story_monument", 1500.0);
        config.getBuildingCosts().put("hero_shrine", 2000.0);
        config.getBuildingCosts().put("ancient_library", 2500.0);
    }

    /**
     * Calculate AI scaling based on difficulty
     */
    public Map<String, Double> calculateAIScaling(DifficultyLevel difficulty) {
        Map<String, Double> scaling = new HashMap<>();
        
        double baseMultiplier = difficulty.getAiStrengthMultiplier();
        
        scaling.put("unitStrength", baseMultiplier);
        scaling.put("resourceGeneration", baseMultiplier * 1.1);
        scaling.put("buildSpeed", baseMultiplier * 0.9);
        scaling.put("aggressiveness", baseMultiplier * 1.2);
        scaling.put("strategicThinking", Math.min(baseMultiplier * 1.3, 2.0));
        
        return scaling;
    }

    /**
     * Calculate experience and reward multipliers
     */
    public Map<String, Double> calculateRewardMultipliers(DifficultyLevel difficulty) {
        Map<String, Double> multipliers = new HashMap<>();
        
        // Higher difficulty = higher rewards
        double rewardMultiplier = switch (difficulty) {
            case EASY -> 0.8;
            case MEDIUM -> 1.0;
            case HARD -> 1.3;
            case EXPERT -> 1.6;
        };
        
        multipliers.put("experience", rewardMultiplier);
        multipliers.put("gold", rewardMultiplier);
        multipliers.put("artifacts", rewardMultiplier * 1.2);
        multipliers.put("reputation", rewardMultiplier * 0.9);
        
        return multipliers;
    }

    /**
     * Validate balancing configuration
     */
    public boolean validateBalance(BalancingConfig config) {
        // Check resource multipliers are within reasonable bounds
        for (double multiplier : config.getResourceMultipliers().values()) {
            if (multiplier < 0.1 || multiplier > 3.0) {
                return false;
            }
        }
        
        // Check unit balancing
        for (double balance : config.getUnitBalancing().values()) {
            if (balance < 0.5 || balance > 2.0) {
                return false;
            }
        }
        
        // Check building costs
        for (double cost : config.getBuildingCosts().values()) {
            if (cost < 50 || cost > 50000) {
                return false;
            }
        }
        
        return true;
    }

    /**
     * Get recommended settings for new players
     */
    public BalancingConfig getNewPlayerConfig() {
        BalancingConfig config = createBalancedConfig("classic", DifficultyLevel.EASY, 1);
        
        // Extra help for new players
        config.getResourceMultipliers().replaceAll((k, v) -> v * 1.3);
        config.getSpecialRules().put("showHints", true);
        config.getSpecialRules().put("allowUndo", true);
        config.getSpecialRules().put("extendedTutorial", true);
        
        return config;
    }

    /**
     * Get tournament settings for competitive play
     */
    public BalancingConfig getTournamentConfig() {
        BalancingConfig config = createBalancedConfig("multiplayer", DifficultyLevel.MEDIUM, 4);
        
        // Strict tournament rules
        config.getSpecialRules().put("strictTiming", true);
        config.getSpecialRules().put("noSaveLoad", true);
        config.getSpecialRules().put("standardizedMap", true);
        config.getSpecialRules().put("observerMode", true);
        
        return config;
    }
} 