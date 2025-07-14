package com.example.demo.service;

import com.example.demo.model.Scenario;
import com.example.demo.repository.ScenarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
public class ScenarioService {
    
    @Autowired
    private ScenarioRepository scenarioRepository;
    
    // ======================
    // SCENARIO MANAGEMENT
    // ======================
    
    public List<Scenario> getAllScenarios() {
        return scenarioRepository.findAll();
    }
    
    public Optional<Scenario> getScenarioById(String scenarioId) {
        return scenarioRepository.findByScenarioId(scenarioId);
    }
    
    public List<Scenario> getActiveScenarios() {
        return scenarioRepository.findByIsActive(true);
    }
    
    public List<Scenario> getScenariosByDifficulty(String difficulty) {
        return scenarioRepository.findByDifficulty(difficulty);
    }
    
    public List<Scenario> getScenariosByMapSize(String mapSize) {
        return scenarioRepository.findByMapSize(mapSize);
    }
    
    public List<Scenario> getScenariosByPlayerCount(Integer playerCount) {
        return scenarioRepository.findScenariosForPlayerCount(playerCount);
    }
    
    public List<Scenario> getSinglePlayerScenarios() {
        return scenarioRepository.findSinglePlayerScenarios();
    }
    
    public List<Scenario> getMultiplayerScenarios() {
        return scenarioRepository.findMultiplayerScenarios();
    }
    
    public List<Scenario> getBeginnerScenarios() {
        return scenarioRepository.findBeginnerScenarios();
    }
    
    public List<Scenario> getExpertScenarios() {
        return scenarioRepository.findExpertScenarios();
    }
    
    // ======================
    // CAMPAIGN MANAGEMENT
    // ======================
    
    public List<Scenario> getCampaignScenarios() {
        return scenarioRepository.findCampaignScenariosInOrder();
    }
    
    public Optional<Scenario> getNextScenarioInCampaign(String scenarioId) {
        return scenarioRepository.findNextScenarioInCampaign(scenarioId);
    }
    
    public Optional<Scenario> getPreviousScenarioInCampaign(String scenarioId) {
        return scenarioRepository.findPreviousScenarioInCampaign(scenarioId);
    }
    
    public List<Scenario> getCampaignScenariosByRange(Integer start, Integer end) {
        return scenarioRepository.findCampaignScenariosByOrderRange(start, end);
    }
    
    public Scenario createCampaignScenario(String scenarioId, String name, String description, 
                                         String difficulty, Integer maxPlayers, Integer mapWidth, 
                                         Integer mapHeight, String victoryCondition, Integer campaignOrder) {
        Scenario scenario = new Scenario(scenarioId, name, description, difficulty, maxPlayers, mapWidth, mapHeight, victoryCondition);
        scenario.setIsCampaign(true);
        scenario.setCampaignOrder(campaignOrder);
        
        return scenarioRepository.save(scenario);
    }
    
    public void linkCampaignScenarios(String previousScenarioId, String nextScenarioId) {
        Optional<Scenario> previousScenario = scenarioRepository.findByScenarioId(previousScenarioId);
        Optional<Scenario> nextScenario = scenarioRepository.findByScenarioId(nextScenarioId);
        
        if (previousScenario.isPresent() && nextScenario.isPresent()) {
            Scenario prev = previousScenario.get();
            Scenario next = nextScenario.get();
            
            prev.setNextScenarioId(nextScenarioId);
            next.setPreviousScenarioId(previousScenarioId);
            
            scenarioRepository.save(prev);
            scenarioRepository.save(next);
        }
    }
    
    // ======================
    // PREDEFINED SCENARIOS
    // ======================
    
    public Scenario createTemporalRiftScenario() {
        // Vérifier si le scénario existe déjà
        Optional<Scenario> existing = scenarioRepository.findByScenarioId("temporal-rift");
        if (existing.isPresent()) {
            return existing.get();
        }
        
        Scenario scenario = new Scenario("temporal-rift", "The Temporal Rift", 
                                       "A mysterious rift in time threatens to tear reality apart. Heroes must navigate through temporal zones to restore balance.",
                                       "hard", 4, 25, 25, "custom");
        
        scenario.setTurnLimit(100);
        scenario.setTimeLimit(180); // 3 hours
        scenario.setVictoryRequirement("Control the Temporal Nexus and close 3 time rifts");
        scenario.setDefeatCondition("All heroes are lost or time runs out");
        
        // Add objectives
        scenario.addObjective(new Scenario.ScenarioObjective("obj1", "capture", "Control the Temporal Nexus", 
                                                           "Capture and hold the central Temporal Nexus", 1));
        scenario.addObjective(new Scenario.ScenarioObjective("obj2", "collect", "Close Time Rifts", 
                                                           "Find and close 3 unstable time rifts", 3));
        scenario.addObjective(new Scenario.ScenarioObjective("obj3", "eliminate", "Defeat the Temporal Guardian", 
                                                           "Eliminate the powerful Temporal Guardian", 1));
        
        // Add starting positions
        scenario.addStartingPosition(new Scenario.StartingPosition("player1", 2, 2, "castle", "Arthur"));
        scenario.addStartingPosition(new Scenario.StartingPosition("player2", 22, 2, "rampart", "Elara"));
        scenario.addStartingPosition(new Scenario.StartingPosition("player3", 2, 22, "tower", "Zoltan"));
        scenario.addStartingPosition(new Scenario.StartingPosition("player4", 22, 22, "inferno", "Dagon"));
        
        // Add timed events
        scenario.addEvent(new Scenario.ScenarioEvent("event1", "timed", "Temporal Storm", 
                                                   "A temporal storm sweeps across the land, affecting all units", 
                                                   "{\"effect\": \"all_units_stunned\", \"duration\": 1}"));
        scenario.addEvent(new Scenario.ScenarioEvent("event2", "timed", "Ancient Artifact", 
                                                   "An ancient artifact appears in the center of the map", 
                                                   "{\"effect\": \"spawn_artifact\", \"location\": \"center\"}"));
        
        return scenarioRepository.save(scenario);
    }
    
    public Scenario createConquestClassicScenario() {
        // Vérifier si le scénario existe déjà
        Optional<Scenario> existing = scenarioRepository.findByScenarioId("conquest-classic");
        if (existing.isPresent()) {
            return existing.get();
        }
        
        Scenario scenario = new Scenario("conquest-classic", "Classic Conquest", 
                                       "A traditional conquest scenario where players must eliminate all enemies or capture their main towns.",
                                       "normal", 6, 30, 30, "conquest");
        
        scenario.setTurnLimit(200);
        scenario.setVictoryRequirement("Eliminate all enemy players or capture all enemy towns");
        scenario.setDefeatCondition("All towns are captured or all heroes are eliminated");
        
        // Add objectives
        scenario.addObjective(new Scenario.ScenarioObjective("obj1", "eliminate", "Total Victory", 
                                                           "Eliminate all enemy players", 5));
        scenario.addObjective(new Scenario.ScenarioObjective("obj2", "capture", "Capture All Towns", 
                                                           "Capture all enemy towns", 5));
        
        // Add starting positions in a circle
        scenario.addStartingPosition(new Scenario.StartingPosition("player1", 5, 15, "castle", "Arthur"));
        scenario.addStartingPosition(new Scenario.StartingPosition("player2", 15, 5, "rampart", "Elara"));
        scenario.addStartingPosition(new Scenario.StartingPosition("player3", 25, 15, "tower", "Zoltan"));
        scenario.addStartingPosition(new Scenario.StartingPosition("player4", 15, 25, "inferno", "Dagon"));
        scenario.addStartingPosition(new Scenario.StartingPosition("player5", 5, 25, "necropolis", "Thant"));
        scenario.addStartingPosition(new Scenario.StartingPosition("player6", 25, 5, "dungeon", "Gunnar"));
        
        return scenarioRepository.save(scenario);
    }
    
    public Scenario createEconomicRaceScenario() {
        Scenario scenario = new Scenario("economic-race", "Economic Race", 
                                       "A peaceful economic competition where players race to accumulate resources and build the most prosperous kingdom.",
                                       "easy", 4, 20, 20, "economic");
        
        scenario.setTurnLimit(150);
        scenario.setVictoryRequirement("Accumulate 100,000 gold and build 20 buildings");
        scenario.setDefeatCondition("Turn limit reached without achieving victory");
        
        // Add objectives
        scenario.addObjective(new Scenario.ScenarioObjective("obj1", "collect", "Accumulate Gold", 
                                                           "Collect 100,000 gold", 100000));
        scenario.addObjective(new Scenario.ScenarioObjective("obj2", "collect", "Build Kingdom", 
                                                           "Construct 20 buildings", 20));
        
        // Add starting positions
        scenario.addStartingPosition(new Scenario.StartingPosition("player1", 5, 5, "castle", "Arthur"));
        scenario.addStartingPosition(new Scenario.StartingPosition("player2", 15, 5, "rampart", "Elara"));
        scenario.addStartingPosition(new Scenario.StartingPosition("player3", 5, 15, "tower", "Zoltan"));
        scenario.addStartingPosition(new Scenario.StartingPosition("player4", 15, 15, "inferno", "Dagon"));
        
        return scenarioRepository.save(scenario);
    }
    
    public Scenario createArtifactHuntScenario() {
        Scenario scenario = new Scenario("artifact-hunt", "Artifact Hunt", 
                                       "A treasure hunting scenario where players search for powerful artifacts scattered across the map.",
                                       "normal", 3, 25, 25, "artifact");
        
        scenario.setTurnLimit(100);
        scenario.setVictoryRequirement("Collect 5 major artifacts");
        scenario.setDefeatCondition("Turn limit reached or all heroes eliminated");
        
        // Add objectives
        scenario.addObjective(new Scenario.ScenarioObjective("obj1", "collect", "Collect Major Artifacts", 
                                                           "Find and collect 5 major artifacts", 5));
        scenario.addObjective(new Scenario.ScenarioObjective("obj2", "eliminate", "Defeat Artifact Guardians", 
                                                           "Eliminate the guardians protecting the artifacts", 5));
        
        // Add starting positions
        scenario.addStartingPosition(new Scenario.StartingPosition("player1", 3, 12, "castle", "Arthur"));
        scenario.addStartingPosition(new Scenario.StartingPosition("player2", 12, 3, "rampart", "Elara"));
        scenario.addStartingPosition(new Scenario.StartingPosition("player3", 22, 12, "tower", "Zoltan"));
        
        return scenarioRepository.save(scenario);
    }
    
    public Scenario createSurvivalScenario() {
        Scenario scenario = new Scenario("survival", "Last Stand", 
                                       "Survive waves of increasingly powerful enemies while defending your stronghold.",
                                       "expert", 2, 15, 15, "survival");
        
        scenario.setTurnLimit(50);
        scenario.setVictoryRequirement("Survive 50 turns against endless waves");
        scenario.setDefeatCondition("Main stronghold is destroyed or all heroes eliminated");
        
        // Add objectives
        scenario.addObjective(new Scenario.ScenarioObjective("obj1", "survive", "Survive Enemy Waves", 
                                                           "Survive 50 turns of enemy attacks", 50));
        scenario.addObjective(new Scenario.ScenarioObjective("obj2", "eliminate", "Defeat Wave Bosses", 
                                                           "Defeat 5 wave bosses", 5));
        
        // Add starting positions
        scenario.addStartingPosition(new Scenario.StartingPosition("player1", 7, 7, "castle", "Arthur"));
        scenario.addStartingPosition(new Scenario.StartingPosition("player2", 8, 8, "rampart", "Elara"));
        
        // Add wave events
        for (int i = 1; i <= 10; i++) {
            scenario.addEvent(new Scenario.ScenarioEvent("wave" + i, "timed", "Enemy Wave " + i, 
                                                       "A wave of enemies approaches", 
                                                       "{\"effect\": \"spawn_enemies\", \"wave\": " + i + "}"));
        }
        
        return scenarioRepository.save(scenario);
    }
    
    // ======================
    // OBJECTIVE MANAGEMENT
    // ======================
    
    public boolean checkObjectiveCompletion(String scenarioId, String objectiveId, Integer currentValue) {
        Optional<Scenario> scenarioOpt = scenarioRepository.findByScenarioId(scenarioId);
        if (scenarioOpt.isPresent()) {
            Scenario scenario = scenarioOpt.get();
            
            for (Scenario.ScenarioObjective objective : scenario.getObjectives()) {
                if (objective.getObjectiveId().equals(objectiveId)) {
                    objective.updateProgress(currentValue);
                    scenario.updateTimestamp();
                    scenarioRepository.save(scenario);
                    return objective.getIsCompleted();
                }
            }
        }
        return false;
    }
    
    public void incrementObjectiveProgress(String scenarioId, String objectiveId) {
        Optional<Scenario> scenarioOpt = scenarioRepository.findByScenarioId(scenarioId);
        if (scenarioOpt.isPresent()) {
            Scenario scenario = scenarioOpt.get();
            
            for (Scenario.ScenarioObjective objective : scenario.getObjectives()) {
                if (objective.getObjectiveId().equals(objectiveId)) {
                    objective.incrementProgress();
                    scenario.updateTimestamp();
                    scenarioRepository.save(scenario);
                    break;
                }
            }
        }
    }
    
    public boolean checkVictoryCondition(String scenarioId) {
        Optional<Scenario> scenarioOpt = scenarioRepository.findByScenarioId(scenarioId);
        if (scenarioOpt.isPresent()) {
            Scenario scenario = scenarioOpt.get();
            return scenario.allObjectivesCompleted();
        }
        return false;
    }
    
    public List<Scenario.ScenarioObjective> getScenarioObjectives(String scenarioId) {
        Optional<Scenario> scenarioOpt = scenarioRepository.findByScenarioId(scenarioId);
        if (scenarioOpt.isPresent()) {
            return scenarioOpt.get().getObjectives();
        }
        return new ArrayList<>();
    }
    
    public List<Scenario.ScenarioObjective> getCompletedObjectives(String scenarioId) {
        return getScenarioObjectives(scenarioId).stream()
                .filter(Scenario.ScenarioObjective::getIsCompleted)
                .collect(Collectors.toList());
    }
    
    public List<Scenario.ScenarioObjective> getPendingObjectives(String scenarioId) {
        return getScenarioObjectives(scenarioId).stream()
                .filter(obj -> !obj.getIsCompleted())
                .collect(Collectors.toList());
    }
    
    // ======================
    // EVENT MANAGEMENT
    // ======================
    
    public List<Scenario.ScenarioEvent> getTriggeredEvents(String scenarioId, Integer currentTurn) {
        Optional<Scenario> scenarioOpt = scenarioRepository.findByScenarioId(scenarioId);
        if (scenarioOpt.isPresent()) {
            Scenario scenario = scenarioOpt.get();
            return scenario.getEvents().stream()
                    .filter(event -> shouldTriggerEvent(event, currentTurn))
                    .collect(Collectors.toList());
        }
        return new ArrayList<>();
    }
    
    private boolean shouldTriggerEvent(Scenario.ScenarioEvent event, Integer currentTurn) {
        if (event.getIsTriggered() && !event.getIsRepeatable()) {
            return false;
        }
        
        if (event.getEventType().equals("timed") && event.getTriggerTurn() != null) {
            return currentTurn.equals(event.getTriggerTurn());
        }
        
        return false;
    }
    
    public void triggerEvent(String scenarioId, String eventId) {
        Optional<Scenario> scenarioOpt = scenarioRepository.findByScenarioId(scenarioId);
        if (scenarioOpt.isPresent()) {
            Scenario scenario = scenarioOpt.get();
            
            for (Scenario.ScenarioEvent event : scenario.getEvents()) {
                if (event.getEventId().equals(eventId)) {
                    event.trigger();
                    scenario.updateTimestamp();
                    scenarioRepository.save(scenario);
                    break;
                }
            }
        }
    }
    
    // ======================
    // SCENARIO GENERATION
    // ======================
    
    public Map<String, Object> generateScenarioMap(String scenarioId) {
        Optional<Scenario> scenarioOpt = scenarioRepository.findByScenarioId(scenarioId);
        if (!scenarioOpt.isPresent()) {
            throw new RuntimeException("Scenario not found: " + scenarioId);
        }
        
        Scenario scenario = scenarioOpt.get();
        Map<String, Object> map = new HashMap<>();
        
        map.put("id", scenarioId + "-map");
        map.put("type", "hexagonal");
        map.put("width", scenario.getMapWidth());
        map.put("height", scenario.getMapHeight());
        map.put("scenarioId", scenarioId);
        
        // Generate tiles based on scenario
        List<Map<String, Object>> tiles = generateTiles(scenario);
        map.put("tiles", tiles);
        
        // Generate objects based on scenario
        List<Map<String, Object>> objects = generateObjects(scenario);
        map.put("objects", objects);
        
        return map;
    }
    
    private List<Map<String, Object>> generateTiles(Scenario scenario) {
        List<Map<String, Object>> tiles = new ArrayList<>();
        String[] terrainTypes = {"grass", "forest", "mountain", "water", "desert", "swamp"};
        
        for (int y = 0; y < scenario.getMapHeight(); y++) {
            for (int x = 0; x < scenario.getMapWidth(); x++) {
                Map<String, Object> tile = new HashMap<>();
                tile.put("x", x);
                tile.put("y", y);
                
                // Special terrain based on scenario
                if (scenario.getScenarioId().equals("temporal-rift")) {
                    tile.put("type", getTemporalTerrain(x, y, scenario.getMapWidth(), scenario.getMapHeight()));
                } else {
                    tile.put("type", terrainTypes[(int)(Math.random() * terrainTypes.length)]);
                }
                
                tile.put("walkable", true);
                tile.put("movementCost", getTerrainMovementCost(tile.get("type")));
                tiles.add(tile);
            }
        }
        
        return tiles;
    }
    
    private List<Map<String, Object>> generateObjects(Scenario scenario) {
        List<Map<String, Object>> objects = new ArrayList<>();
        
        // Add player starting castles
        for (Scenario.StartingPosition position : scenario.getStartingPositions()) {
            Map<String, Object> castle = new HashMap<>();
            castle.put("id", "castle_" + position.getPlayerId());
            castle.put("x", position.getPositionX());
            castle.put("y", position.getPositionY());
            castle.put("type", "castle");
            castle.put("owner", position.getPlayerId());
            castle.put("castleType", position.getCastleType());
            objects.add(castle);
        }
        
        // Add scenario-specific objects
        if (scenario.getScenarioId().equals("temporal-rift")) {
            objects.addAll(generateTemporalObjects(scenario));
        } else if (scenario.getScenarioId().equals("artifact-hunt")) {
            objects.addAll(generateArtifactObjects(scenario));
        } else {
            objects.addAll(generateStandardObjects(scenario));
        }
        
        return objects;
    }
    
    private List<Map<String, Object>> generateTemporalObjects(Scenario scenario) {
        List<Map<String, Object>> objects = new ArrayList<>();
        
        // Central Temporal Nexus
        Map<String, Object> nexus = new HashMap<>();
        nexus.put("id", "temporal-nexus");
        nexus.put("x", scenario.getMapWidth() / 2);
        nexus.put("y", scenario.getMapHeight() / 2);
        nexus.put("type", "temporal_nexus");
        nexus.put("capturable", true);
        objects.add(nexus);
        
        // Time Rifts
        for (int i = 1; i <= 3; i++) {
            Map<String, Object> rift = new HashMap<>();
            rift.put("id", "time-rift-" + i);
            rift.put("x", (int)(Math.random() * scenario.getMapWidth()));
            rift.put("y", (int)(Math.random() * scenario.getMapHeight()));
            rift.put("type", "time_rift");
            rift.put("closable", true);
            objects.add(rift);
        }
        
        return objects;
    }
    
    private List<Map<String, Object>> generateArtifactObjects(Scenario scenario) {
        List<Map<String, Object>> objects = new ArrayList<>();
        
        // Major Artifacts
        String[] artifactNames = {"Crown of Eternity", "Sword of Time", "Shield of Dimensions", "Orb of Infinity", "Staff of Reality"};
        for (int i = 0; i < 5; i++) {
            Map<String, Object> artifact = new HashMap<>();
            artifact.put("id", "artifact-" + (i + 1));
            artifact.put("x", (int)(Math.random() * scenario.getMapWidth()));
            artifact.put("y", (int)(Math.random() * scenario.getMapHeight()));
            artifact.put("type", "major_artifact");
            artifact.put("name", artifactNames[i]);
            artifact.put("guarded", true);
            objects.add(artifact);
        }
        
        return objects;
    }
    
    private List<Map<String, Object>> generateStandardObjects(Scenario scenario) {
        List<Map<String, Object>> objects = new ArrayList<>();
        
        // Resource nodes
        for (int i = 0; i < 10; i++) {
            Map<String, Object> resource = new HashMap<>();
            resource.put("id", "resource-" + i);
            resource.put("x", (int)(Math.random() * scenario.getMapWidth()));
            resource.put("y", (int)(Math.random() * scenario.getMapHeight()));
            resource.put("type", "resource_node");
            resource.put("resourceType", Math.random() > 0.5 ? "gold_mine" : "sawmill");
            objects.add(resource);
        }
        
        // Neutral creatures
        for (int i = 0; i < 5; i++) {
            Map<String, Object> creature = new HashMap<>();
            creature.put("id", "neutral-" + i);
            creature.put("x", (int)(Math.random() * scenario.getMapWidth()));
            creature.put("y", (int)(Math.random() * scenario.getMapHeight()));
            creature.put("type", "neutral_creature");
            creature.put("creatureType", "dragon");
            creature.put("strength", (int)(Math.random() * 1000) + 500);
            objects.add(creature);
        }
        
        return objects;
    }
    
    // ======================
    // UTILITY METHODS
    // ======================
    
    private String getTemporalTerrain(int x, int y, int width, int height) {
        int centerX = width / 2;
        int centerY = height / 2;
        double distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
        
        if (distance < 3) return "temporal_grass";
        if (distance < 6) return "chrono_forest";
        if (distance < 10) return "time_river";
        return "grass";
    }
    
    private int getTerrainMovementCost(Object terrainType) {
        switch (terrainType.toString()) {
            case "grass": case "temporal_grass": return 1;
            case "forest": case "chrono_forest": return 2;
            case "mountain": return 3;
            case "water": case "time_river": return 4;
            case "desert": return 2;
            case "swamp": return 3;
            default: return 1;
        }
    }
    
    // ======================
    // STATISTICS
    // ======================
    
    public Map<String, Object> getScenarioStatistics() {
        Map<String, Object> stats = new HashMap<>();
        
        stats.put("totalScenarios", scenarioRepository.count());
        stats.put("activeScenarios", scenarioRepository.countActiveScenarios());
        stats.put("campaignScenarios", scenarioRepository.countCampaignScenarios());
        stats.put("standaloneScenarios", scenarioRepository.countSingleScenarios());
        
        // Difficulty distribution
        List<Object[]> difficultyStats = scenarioRepository.getScenarioCountsByDifficulty();
        Map<String, Long> difficultyDistribution = new HashMap<>();
        for (Object[] row : difficultyStats) {
            difficultyDistribution.put((String) row[0], (Long) row[1]);
        }
        stats.put("difficultyDistribution", difficultyDistribution);
        
        // Map size distribution
        List<Object[]> mapSizeStats = scenarioRepository.getScenarioCountsByMapSize();
        Map<String, Long> mapSizeDistribution = new HashMap<>();
        for (Object[] row : mapSizeStats) {
            mapSizeDistribution.put((String) row[0], (Long) row[1]);
        }
        stats.put("mapSizeDistribution", mapSizeDistribution);
        
        return stats;
    }
    
    // ======================
    // CRUD OPERATIONS
    // ======================
    
    public Scenario createScenario(Scenario scenario) {
        scenario.updateTimestamp();
        return scenarioRepository.save(scenario);
    }
    
    public Scenario updateScenario(Scenario scenario) {
        scenario.updateTimestamp();
        return scenarioRepository.save(scenario);
    }
    
    public void deleteScenario(String scenarioId) {
        scenarioRepository.deleteByScenarioId(scenarioId);
    }
    
    public void initializeDefaultScenarios() {
        if (scenarioRepository.count() == 0) {
            createTemporalRiftScenario();
            createConquestClassicScenario();
            createEconomicRaceScenario();
            createArtifactHuntScenario();
            createSurvivalScenario();
        }
    }
} 