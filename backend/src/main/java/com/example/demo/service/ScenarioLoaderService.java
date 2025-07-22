package com.example.demo.service;

import com.example.demo.model.Scenario;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class ScenarioLoaderService {
    
    @Autowired
    private ResourceLoader resourceLoader;
    
    @Autowired
    private ScenarioService scenarioService;
    
    private final ObjectMapper objectMapper = new ObjectMapper();
    
    /**
     * Load all scenarios from JSON files in the scenarios directory
     */
    public void loadScenariosFromFiles() {
        System.out.println("🚀 Loading scenarios from JSON files...");
        
        try {
            // Load scenarios from individual JSON files
            loadScenarioFromFile("scenarios/conquest-classic.json");
            loadScenarioFromFile("scenarios/temporal-rift.json");
            loadScenarioFromFile("scenarios/multiplayer-arena.json");
            loadScenarioFromFile("scenarios/dragon-campaign.json");
            
            System.out.println("✅ All scenarios loaded successfully from JSON files!");
            
        } catch (Exception e) {
            System.err.println("❌ Error loading scenarios from files: " + e.getMessage());
            e.printStackTrace();
        }
    }
    
    /**
     * Load a single scenario from a JSON file
     */
    private void loadScenarioFromFile(String filePath) {
        try {
            Resource resource = resourceLoader.getResource("classpath:" + filePath);
            
            if (!resource.exists()) {
                System.out.println("⚠️  Scenario file not found: " + filePath);
                return;
            }
            
            InputStream inputStream = resource.getInputStream();
            Map<String, Object> scenarioData = objectMapper.readValue(inputStream, new TypeReference<Map<String, Object>>() {});
            
            Scenario scenario = createScenarioFromData(scenarioData);
            
            // Check if scenario already exists
            if (scenarioService.getScenarioById(scenario.getScenarioId()).isPresent()) {
                System.out.println("📋 Scenario already exists: " + scenario.getScenarioId());
                return;
            }
            
            scenarioService.createScenario(scenario);
            System.out.println("✨ Loaded scenario: " + scenario.getScenarioId() + " - " + scenario.getName());
            
        } catch (IOException e) {
            System.err.println("❌ Error loading scenario file " + filePath + ": " + e.getMessage());
            e.printStackTrace();
        }
    }
    
    /**
     * Create a Scenario object from JSON data
     */
    private Scenario createScenarioFromData(Map<String, Object> data) {
        Scenario scenario = new Scenario();
        
        // Basic properties
        scenario.setScenarioId((String) data.get("scenarioId"));
        scenario.setName((String) data.get("name"));
        scenario.setDescription((String) data.get("description"));
        scenario.setDifficulty((String) data.get("difficulty"));
        scenario.setMaxPlayers((Integer) data.get("maxPlayers"));
        scenario.setRecommendedPlayers((Integer) data.get("recommendedPlayers"));
        scenario.setMapSize((String) data.get("mapSize"));
        scenario.setMapWidth((Integer) data.get("mapWidth"));
        scenario.setMapHeight((Integer) data.get("mapHeight"));
        scenario.setTurnLimit((Integer) data.get("turnLimit"));
        scenario.setTimeLimit((Integer) data.get("timeLimit"));
        scenario.setVictoryCondition((String) data.get("victoryCondition"));
        scenario.setVictoryRequirement((String) data.get("victoryRequirement"));
        scenario.setDefeatCondition((String) data.get("defeatCondition"));
        scenario.setIsActive((Boolean) data.getOrDefault("isActive", true));
        scenario.setIsCampaign((Boolean) data.getOrDefault("isCampaign", false));
        
        // Load objectives
        List<Map<String, Object>> objectivesData = (List<Map<String, Object>>) data.get("objectives");
        if (objectivesData != null) {
            for (Map<String, Object> objData : objectivesData) {
                Scenario.ScenarioObjective objective = new Scenario.ScenarioObjective(
                    (String) objData.get("objectiveId"),
                    (String) objData.get("objectiveType"),
                    (String) objData.get("objectiveTitle"),
                    (String) objData.get("objectiveDescription"),
                    (Integer) objData.get("targetValue")
                );
                objective.setIsRequired((Boolean) objData.getOrDefault("isRequired", true));
                scenario.addObjective(objective);
            }
        }
        
        // Load starting positions
        List<Map<String, Object>> positionsData = (List<Map<String, Object>>) data.get("startingPositions");
        if (positionsData != null) {
            for (Map<String, Object> posData : positionsData) {
                Scenario.StartingPosition position = new Scenario.StartingPosition(
                    (String) posData.get("playerId"),
                    (Integer) posData.get("positionX"),
                    (Integer) posData.get("positionY"),
                    (String) posData.get("castleType"),
                    (String) posData.get("startingHero")
                );
                position.setHandicap((Integer) posData.getOrDefault("handicap", 0));
                scenario.addStartingPosition(position);
            }
        }
        
        // Load events
        List<Map<String, Object>> eventsData = (List<Map<String, Object>>) data.get("events");
        if (eventsData != null) {
            for (Map<String, Object> eventData : eventsData) {
                Scenario.ScenarioEvent event = new Scenario.ScenarioEvent(
                    (String) eventData.get("eventId"),
                    (String) eventData.get("eventType"),
                    (String) eventData.get("eventTitle"),
                    (String) eventData.get("eventDescription"),
                    (String) eventData.get("eventEffect")
                );
                event.setIsTriggered((Boolean) eventData.getOrDefault("isTriggered", false));
                event.setIsRepeatable((Boolean) eventData.getOrDefault("isRepeatable", false));
                scenario.addEvent(event);
            }
        }
        
        return scenario;
    }
    
    /**
     * Get list of all scenario files in the scenarios directory
     */
    public List<String> getAvailableScenarioFiles() {
        List<String> files = new ArrayList<>();
        // You can extend this to dynamically scan the directory
        files.add("scenarios/conquest-classic.json");
        files.add("scenarios/temporal-rift.json");
        files.add("scenarios/multiplayer-arena.json");
        files.add("scenarios/dragon-campaign.json");
        return files;
    }
} 