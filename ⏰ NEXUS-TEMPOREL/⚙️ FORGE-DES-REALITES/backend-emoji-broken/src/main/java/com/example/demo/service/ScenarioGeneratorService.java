package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class ScenarioGeneratorService {

    @Autowired
    private CampaignBalancingService balancingService;

    public static class ScenarioTemplate {
        private String id;
        private String name;
        private String description;
        private String type;
        private CampaignBalancingService.DifficultyLevel difficulty;
        private int recommendedPlayerCount;
        private String mapSize;
        private List<String> objectives;
        private Map<String, Object> startingConditions;
        private Map<String, Object> winConditions;
        private List<String> specialFeatures;
        private int estimatedDuration; // in minutes

        public ScenarioTemplate(String id, String name, String type) {
            this.id = id;
            this.name = name;
            this.type = type;
            this.objectives = new ArrayList<>();
            this.startingConditions = new HashMap<>();
            this.winConditions = new HashMap<>();
            this.specialFeatures = new ArrayList<>();
        }

        // Getters and setters
        public String getId() { return id; }
        public String getName() { return name; }
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
        public String getType() { return type; }
        public CampaignBalancingService.DifficultyLevel getDifficulty() { return difficulty; }
        public void setDifficulty(CampaignBalancingService.DifficultyLevel difficulty) { this.difficulty = difficulty; }
        public int getRecommendedPlayerCount() { return recommendedPlayerCount; }
        public void setRecommendedPlayerCount(int count) { this.recommendedPlayerCount = count; }
        public String getMapSize() { return mapSize; }
        public void setMapSize(String mapSize) { this.mapSize = mapSize; }
        public List<String> getObjectives() { return objectives; }
        public Map<String, Object> getStartingConditions() { return startingConditions; }
        public Map<String, Object> getWinConditions() { return winConditions; }
        public List<String> getSpecialFeatures() { return specialFeatures; }
        public int getEstimatedDuration() { return estimatedDuration; }
        public void setEstimatedDuration(int duration) { this.estimatedDuration = duration; }
    }

    /**
     * Generate a complete set of balanced scenarios
     */
    public List<ScenarioTemplate> generateScenarioCollection() {
        List<ScenarioTemplate> scenarios = new ArrayList<>();
        
        // Classic scenarios
        scenarios.addAll(generateClassicScenarios());
        
        // Mystical scenarios
        scenarios.addAll(generateMysticalScenarios());
        
        // Multiplayer scenarios
        scenarios.addAll(generateMultiplayerScenarios());
        
        // Campaign scenarios
        scenarios.addAll(generateCampaignScenarios());
        
        return scenarios;
    }

    /**
     * Generate classic conquest scenarios
     */
    private List<ScenarioTemplate> generateClassicScenarios() {
        List<ScenarioTemplate> scenarios = new ArrayList<>();
        
        // Beginner scenario
        ScenarioTemplate beginnerConquest = new ScenarioTemplate("classic-beginner", "First Steps", "classic");
        beginnerConquest.setDescription("Learn the basics of Heroes of Time in this gentle introduction to conquest.");
        beginnerConquest.setDifficulty(CampaignBalancingService.DifficultyLevel.EASY);
        beginnerConquest.setRecommendedPlayerCount(1);
        beginnerConquest.setMapSize("small");
        beginnerConquest.setEstimatedDuration(30);
        beginnerConquest.getObjectives().addAll(Arrays.asList(
            "Build your first castle",
            "Recruit an army",
            "Defeat the enemy hero",
            "Capture the enemy castle"
        ));
        beginnerConquest.getStartingConditions().put("gold", 2000);
        beginnerConquest.getStartingConditions().put("wood", 20);
        beginnerConquest.getStartingConditions().put("stone", 10);
        beginnerConquest.getStartingConditions().put("startingUnits", Arrays.asList("pikeman:5", "archer:3"));
        beginnerConquest.getWinConditions().put("type", "conquest");
        beginnerConquest.getWinConditions().put("captureAllCastles", true);
        beginnerConquest.getSpecialFeatures().addAll(Arrays.asList("tutorial", "hints", "undo"));
        scenarios.add(beginnerConquest);

        // Standard conquest
        ScenarioTemplate standardConquest = new ScenarioTemplate("classic-standard", "Realm Conquest", "classic");
        standardConquest.setDescription("A balanced conquest scenario for experienced players.");
        standardConquest.setDifficulty(CampaignBalancingService.DifficultyLevel.MEDIUM);
        standardConquest.setRecommendedPlayerCount(2);
        standardConquest.setMapSize("medium");
        standardConquest.setEstimatedDuration(60);
        standardConquest.getObjectives().addAll(Arrays.asList(
            "Establish economic dominance",
            "Build a mighty army",
            "Conquer enemy territories",
            "Achieve total victory"
        ));
        standardConquest.getStartingConditions().put("gold", 1500);
        standardConquest.getStartingConditions().put("wood", 15);
        standardConquest.getStartingConditions().put("stone", 8);
        standardConquest.getStartingConditions().put("startingUnits", Arrays.asList("pikeman:3", "archer:2"));
        standardConquest.getWinConditions().put("type", "conquest");
        standardConquest.getWinConditions().put("eliminateAllEnemies", true);
        standardConquest.getSpecialFeatures().addAll(Arrays.asList("diplomacy", "trade"));
        scenarios.add(standardConquest);

        // Expert challenge
        ScenarioTemplate expertConquest = new ScenarioTemplate("classic-expert", "Master's Challenge", "classic");
        expertConquest.setDescription("The ultimate test of strategic mastery for veteran players.");
        expertConquest.setDifficulty(CampaignBalancingService.DifficultyLevel.EXPERT);
        expertConquest.setRecommendedPlayerCount(1);
        expertConquest.setMapSize("large");
        expertConquest.setEstimatedDuration(90);
        expertConquest.getObjectives().addAll(Arrays.asList(
            "Survive the initial onslaught",
            "Build from limited resources",
            "Overcome superior enemy forces",
            "Achieve victory against all odds"
        ));
        expertConquest.getStartingConditions().put("gold", 800);
        expertConquest.getStartingConditions().put("wood", 5);
        expertConquest.getStartingConditions().put("stone", 3);
        expertConquest.getStartingConditions().put("startingUnits", Arrays.asList("pikeman:2"));
        expertConquest.getWinConditions().put("type", "survival");
        expertConquest.getWinConditions().put("surviveTurns", 50);
        expertConquest.getWinConditions().put("captureKeyPoints", 3);
        expertConquest.getSpecialFeatures().addAll(Arrays.asList("permadeath", "limitedResources"));
        scenarios.add(expertConquest);

        return scenarios;
    }

    /**
     * Generate mystical temporal scenarios
     */
    private List<ScenarioTemplate> generateMysticalScenarios() {
        List<ScenarioTemplate> scenarios = new ArrayList<>();

        // Temporal introduction
        ScenarioTemplate temporalIntro = new ScenarioTemplate("mystical-intro", "Temporal Awakening", "mystical");
        temporalIntro.setDescription("Discover the power of time manipulation in this mystical adventure.");
        temporalIntro.setDifficulty(CampaignBalancingService.DifficultyLevel.MEDIUM);
        temporalIntro.setRecommendedPlayerCount(1);
        temporalIntro.setMapSize("medium");
        temporalIntro.setEstimatedDuration(75);
        temporalIntro.getObjectives().addAll(Arrays.asList(
            "Discover temporal artifacts",
            "Master time manipulation",
            "Unlock the Chrono Chamber",
            "Defeat the Time Guardian"
        ));
        temporalIntro.getStartingConditions().put("gold", 1200);
        temporalIntro.getStartingConditions().put("mana", 50);
        temporalIntro.getStartingConditions().put("temporalEnergy", 100);
        temporalIntro.getStartingConditions().put("startingArtifacts", Arrays.asList("temporal_compass"));
        temporalIntro.getWinConditions().put("type", "artifacts");
        temporalIntro.getWinConditions().put("collectArtifacts", 5);
        temporalIntro.getSpecialFeatures().addAll(Arrays.asList("timeTravel", "temporalMagic", "artifacts"));
        scenarios.add(temporalIntro);

        // Chrono war
        ScenarioTemplate chronoWar = new ScenarioTemplate("mystical-war", "The Chrono War", "mystical");
        chronoWar.setDescription("Epic battles across multiple timelines in this advanced mystical scenario.");
        chronoWar.setDifficulty(CampaignBalancingService.DifficultyLevel.HARD);
        chronoWar.setRecommendedPlayerCount(2);
        chronoWar.setMapSize("large");
        chronoWar.setEstimatedDuration(120);
        chronoWar.getObjectives().addAll(Arrays.asList(
            "Control multiple timelines",
            "Prevent temporal paradoxes",
            "Defeat enemies across time",
            "Restore temporal balance"
        ));
        chronoWar.getStartingConditions().put("gold", 1000);
        chronoWar.getStartingConditions().put("mana", 100);
        chronoWar.getStartingConditions().put("temporalEnergy", 200);
        chronoWar.getStartingConditions().put("timelineAccess", 3);
        chronoWar.getWinConditions().put("type", "temporal");
        chronoWar.getWinConditions().put("stabilizeTimelines", true);
        chronoWar.getWinConditions().put("temporalDominance", 75);
        chronoWar.getSpecialFeatures().addAll(Arrays.asList("multipleTimelines", "paradoxes", "temporalUnits"));
        scenarios.add(chronoWar);

        return scenarios;
    }

    /**
     * Generate multiplayer scenarios
     */
    private List<ScenarioTemplate> generateMultiplayerScenarios() {
        List<ScenarioTemplate> scenarios = new ArrayList<>();

        // Quick skirmish
        ScenarioTemplate quickSkirmish = new ScenarioTemplate("mp-skirmish", "Lightning Skirmish", "multiplayer");
        quickSkirmish.setDescription("Fast-paced multiplayer action for quick matches.");
        quickSkirmish.setDifficulty(CampaignBalancingService.DifficultyLevel.MEDIUM);
        quickSkirmish.setRecommendedPlayerCount(4);
        quickSkirmish.setMapSize("medium");
        quickSkirmish.setEstimatedDuration(30);
        quickSkirmish.getObjectives().addAll(Arrays.asList(
            "Rapid expansion",
            "Quick army building",
            "Fast elimination",
            "Victory in 30 turns"
        ));
        quickSkirmish.getStartingConditions().put("gold", 2000);
        quickSkirmish.getStartingConditions().put("acceleratedProduction", true);
        quickSkirmish.getStartingConditions().put("reducedBuildTimes", 0.5);
        quickSkirmish.getWinConditions().put("type", "elimination");
        quickSkirmish.getWinConditions().put("maxTurns", 30);
        quickSkirmish.getSpecialFeatures().addAll(Arrays.asList("fastPaced", "ranking", "spectator"));
        scenarios.add(quickSkirmish);

        // Team battle
        ScenarioTemplate teamBattle = new ScenarioTemplate("mp-teams", "Alliance Warfare", "multiplayer");
        teamBattle.setDescription("Strategic team-based combat with alliance mechanics.");
        teamBattle.setDifficulty(CampaignBalancingService.DifficultyLevel.MEDIUM);
        teamBattle.setRecommendedPlayerCount(6);
        teamBattle.setMapSize("large");
        teamBattle.setEstimatedDuration(90);
        teamBattle.getObjectives().addAll(Arrays.asList(
            "Form strategic alliances",
            "Coordinate team attacks",
            "Share resources with allies",
            "Achieve team victory"
        ));
        teamBattle.getStartingConditions().put("gold", 1500);
        teamBattle.getStartingConditions().put("teamMode", true);
        teamBattle.getStartingConditions().put("sharedVision", true);
        teamBattle.getWinConditions().put("type", "team");
        teamBattle.getWinConditions().put("teamElimination", true);
        teamBattle.getSpecialFeatures().addAll(Arrays.asList("teams", "alliances", "sharedResources"));
        scenarios.add(teamBattle);

        return scenarios;
    }

    /**
     * Generate campaign scenarios
     */
    private List<ScenarioTemplate> generateCampaignScenarios() {
        List<ScenarioTemplate> scenarios = new ArrayList<>();

        // Campaign chapter 1
        ScenarioTemplate chapter1 = new ScenarioTemplate("campaign-ch1", "The Awakening", "campaign");
        chapter1.setDescription("Begin your epic journey in the first chapter of the Heroes of Time campaign.");
        chapter1.setDifficulty(CampaignBalancingService.DifficultyLevel.EASY);
        chapter1.setRecommendedPlayerCount(1);
        chapter1.setMapSize("medium");
        chapter1.setEstimatedDuration(90);
        chapter1.getObjectives().addAll(Arrays.asList(
            "Discover your destiny",
            "Unite the scattered clans",
            "Uncover ancient secrets",
            "Prepare for the coming war"
        ));
        chapter1.getStartingConditions().put("gold", 1000);
        chapter1.getStartingConditions().put("heroLevel", 1);
        chapter1.getStartingConditions().put("questItems", Arrays.asList("ancient_map"));
        chapter1.getWinConditions().put("type", "story");
        chapter1.getWinConditions().put("completeQuests", Arrays.asList("unite_clans", "find_artifact"));
        chapter1.getSpecialFeatures().addAll(Arrays.asList("story", "quests", "progression", "cutscenes"));
        scenarios.add(chapter1);

        // Campaign chapter 2
        ScenarioTemplate chapter2 = new ScenarioTemplate("campaign-ch2", "Shadows of War", "campaign");
        chapter2.setDescription("The conflict escalates as dark forces emerge from the shadows.");
        chapter2.setDifficulty(CampaignBalancingService.DifficultyLevel.MEDIUM);
        chapter2.setRecommendedPlayerCount(1);
        chapter2.setMapSize("large");
        chapter2.setEstimatedDuration(120);
        chapter2.getObjectives().addAll(Arrays.asList(
            "Defend against the shadow army",
            "Forge powerful alliances",
            "Seek the lost artifacts",
            "Uncover the enemy's plan"
        ));
        chapter2.getStartingConditions().put("gold", 800);
        chapter2.getStartingConditions().put("heroLevel", 5);
        chapter2.getStartingConditions().put("inheritedArmy", true);
        chapter2.getWinConditions().put("type", "story");
        chapter2.getWinConditions().put("defeatBoss", "shadow_lord");
        chapter2.getWinConditions().put("protectAllies", 3);
        chapter2.getSpecialFeatures().addAll(Arrays.asList("story", "bossEvents", "allyManagement"));
        scenarios.add(chapter2);

        return scenarios;
    }

    /**
     * Generate a random scenario based on parameters
     */
    public ScenarioTemplate generateRandomScenario(String type, CampaignBalancingService.DifficultyLevel difficulty, int playerCount) {
        Random random = new Random();
        
        ScenarioTemplate scenario = new ScenarioTemplate(
            "random-" + System.currentTimeMillis(),
            "Random " + type.substring(0, 1).toUpperCase() + type.substring(1) + " Scenario",
            type
        );
        
        scenario.setDifficulty(difficulty);
        scenario.setRecommendedPlayerCount(playerCount);
        scenario.setMapSize(determineMapSize(playerCount));
        
        // Generate random objectives
        List<String> possibleObjectives = Arrays.asList(
            "Capture enemy strongholds",
            "Collect magical artifacts",
            "Defeat legendary creatures",
            "Establish trade routes",
            "Survive for " + (20 + random.nextInt(30)) + " turns",
            "Accumulate " + (5000 + random.nextInt(10000)) + " gold",
            "Build " + (3 + random.nextInt(5)) + " advanced structures"
        );
        
        Collections.shuffle(possibleObjectives);
        scenario.getObjectives().addAll(possibleObjectives.subList(0, 3 + random.nextInt(3)));
        
        // Generate random starting conditions based on difficulty
        generateRandomStartingConditions(scenario, difficulty, random);
        
        // Generate win conditions
        generateRandomWinConditions(scenario, type, random);
        
        return scenario;
    }

    private void generateRandomStartingConditions(ScenarioTemplate scenario, CampaignBalancingService.DifficultyLevel difficulty, Random random) {
        double difficultyMultiplier = switch (difficulty) {
            case EASY -> 1.3;
            case MEDIUM -> 1.0;
            case HARD -> 0.8;
            case EXPERT -> 0.6;
        };
        
        scenario.getStartingConditions().put("gold", (int)(1000 + random.nextInt(1000)) * difficultyMultiplier);
        scenario.getStartingConditions().put("wood", (int)(10 + random.nextInt(15)) * difficultyMultiplier);
        scenario.getStartingConditions().put("stone", (int)(5 + random.nextInt(10)) * difficultyMultiplier);
        
        if (scenario.getType().equals("mystical")) {
            scenario.getStartingConditions().put("mana", (int)(30 + random.nextInt(50)) * difficultyMultiplier);
            scenario.getStartingConditions().put("temporalEnergy", (int)(50 + random.nextInt(100)) * difficultyMultiplier);
        }
    }

    private void generateRandomWinConditions(ScenarioTemplate scenario, String type, Random random) {
        switch (type) {
            case "classic":
                scenario.getWinConditions().put("type", "conquest");
                scenario.getWinConditions().put("capturePercentage", 70 + random.nextInt(30));
                break;
            case "mystical":
                scenario.getWinConditions().put("type", "artifacts");
                scenario.getWinConditions().put("collectArtifacts", 3 + random.nextInt(5));
                break;
            case "multiplayer":
                scenario.getWinConditions().put("type", "elimination");
                scenario.getWinConditions().put("maxTurns", 40 + random.nextInt(40));
                break;
            default:
                scenario.getWinConditions().put("type", "mixed");
                break;
        }
    }

    private String determineMapSize(int playerCount) {
        if (playerCount <= 2) return "medium";
        if (playerCount <= 4) return "large";
        return "huge";
    }

    /**
     * Apply balancing to a scenario template
     */
    public ScenarioTemplate applyBalancing(ScenarioTemplate template) {
        CampaignBalancingService.BalancingConfig config = balancingService.createBalancedConfig(
            template.getType(),
            template.getDifficulty(),
            template.getRecommendedPlayerCount()
        );
        
        // Apply resource multipliers
        for (Map.Entry<String, Double> entry : config.getResourceMultipliers().entrySet()) {
            String resource = entry.getKey();
            Double multiplier = entry.getValue();
            
            if (template.getStartingConditions().containsKey(resource)) {
                Object currentValue = template.getStartingConditions().get(resource);
                if (currentValue instanceof Number) {
                    template.getStartingConditions().put(resource, 
                        ((Number) currentValue).doubleValue() * multiplier);
                }
            }
        }
        
        // Apply special rules
        template.getSpecialFeatures().addAll(
            config.getSpecialRules().keySet().stream()
                .filter(key -> Boolean.TRUE.equals(config.getSpecialRules().get(key)))
                .toList()
        );
        
        return template;
    }
} 