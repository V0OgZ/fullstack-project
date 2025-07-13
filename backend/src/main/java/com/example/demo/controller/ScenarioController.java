package com.example.demo.controller;

import com.example.demo.model.Scenario;
import com.example.demo.service.ScenarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/scenarios")
@CrossOrigin(origins = "http://localhost:3000")
public class ScenarioController {
    
    @Autowired
    private ScenarioService scenarioService;
    
    // ======================
    // SCENARIO QUERIES
    // ======================
    
    @GetMapping
    public ResponseEntity<List<Scenario>> getAllScenarios() {
        List<Scenario> scenarios = scenarioService.getAllScenarios();
        return ResponseEntity.ok(scenarios);
    }
    
    @GetMapping("/{scenarioId}")
    public ResponseEntity<Scenario> getScenarioById(@PathVariable String scenarioId) {
        return scenarioService.getScenarioById(scenarioId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/active")
    public ResponseEntity<List<Scenario>> getActiveScenarios() {
        List<Scenario> scenarios = scenarioService.getActiveScenarios();
        return ResponseEntity.ok(scenarios);
    }
    
    @GetMapping("/difficulty/{difficulty}")
    public ResponseEntity<List<Scenario>> getScenariosByDifficulty(@PathVariable String difficulty) {
        List<Scenario> scenarios = scenarioService.getScenariosByDifficulty(difficulty);
        return ResponseEntity.ok(scenarios);
    }
    
    @GetMapping("/map-size/{mapSize}")
    public ResponseEntity<List<Scenario>> getScenariosByMapSize(@PathVariable String mapSize) {
        List<Scenario> scenarios = scenarioService.getScenariosByMapSize(mapSize);
        return ResponseEntity.ok(scenarios);
    }
    
    @GetMapping("/players/{playerCount}")
    public ResponseEntity<List<Scenario>> getScenariosByPlayerCount(@PathVariable Integer playerCount) {
        List<Scenario> scenarios = scenarioService.getScenariosByPlayerCount(playerCount);
        return ResponseEntity.ok(scenarios);
    }
    
    @GetMapping("/single-player")
    public ResponseEntity<List<Scenario>> getSinglePlayerScenarios() {
        List<Scenario> scenarios = scenarioService.getSinglePlayerScenarios();
        return ResponseEntity.ok(scenarios);
    }
    
    @GetMapping("/multiplayer")
    public ResponseEntity<List<Scenario>> getMultiplayerScenarios() {
        List<Scenario> scenarios = scenarioService.getMultiplayerScenarios();
        return ResponseEntity.ok(scenarios);
    }
    
    @GetMapping("/beginner")
    public ResponseEntity<List<Scenario>> getBeginnerScenarios() {
        List<Scenario> scenarios = scenarioService.getBeginnerScenarios();
        return ResponseEntity.ok(scenarios);
    }
    
    @GetMapping("/expert")
    public ResponseEntity<List<Scenario>> getExpertScenarios() {
        List<Scenario> scenarios = scenarioService.getExpertScenarios();
        return ResponseEntity.ok(scenarios);
    }
    
    // ======================
    // CAMPAIGN MANAGEMENT
    // ======================
    
    @GetMapping("/campaign")
    public ResponseEntity<List<Scenario>> getCampaignScenarios() {
        List<Scenario> scenarios = scenarioService.getCampaignScenarios();
        return ResponseEntity.ok(scenarios);
    }
    
    @GetMapping("/{scenarioId}/next")
    public ResponseEntity<Scenario> getNextScenarioInCampaign(@PathVariable String scenarioId) {
        return scenarioService.getNextScenarioInCampaign(scenarioId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/{scenarioId}/previous")
    public ResponseEntity<Scenario> getPreviousScenarioInCampaign(@PathVariable String scenarioId) {
        return scenarioService.getPreviousScenarioInCampaign(scenarioId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/campaign/range")
    public ResponseEntity<List<Scenario>> getCampaignScenariosByRange(
            @RequestParam Integer start, 
            @RequestParam Integer end) {
        List<Scenario> scenarios = scenarioService.getCampaignScenariosByRange(start, end);
        return ResponseEntity.ok(scenarios);
    }
    
    @PostMapping("/campaign/create")
    public ResponseEntity<Scenario> createCampaignScenario(@RequestBody Map<String, Object> request) {
        try {
            String scenarioId = (String) request.get("scenarioId");
            String name = (String) request.get("name");
            String description = (String) request.get("description");
            String difficulty = (String) request.get("difficulty");
            Integer maxPlayers = (Integer) request.get("maxPlayers");
            Integer mapWidth = (Integer) request.get("mapWidth");
            Integer mapHeight = (Integer) request.get("mapHeight");
            String victoryCondition = (String) request.get("victoryCondition");
            Integer campaignOrder = (Integer) request.get("campaignOrder");
            
            Scenario scenario = scenarioService.createCampaignScenario(scenarioId, name, description, 
                                                                     difficulty, maxPlayers, mapWidth, mapHeight, 
                                                                     victoryCondition, campaignOrder);
            return ResponseEntity.ok(scenario);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PostMapping("/campaign/link")
    public ResponseEntity<Map<String, Object>> linkCampaignScenarios(@RequestBody Map<String, Object> request) {
        try {
            String previousScenarioId = (String) request.get("previousScenarioId");
            String nextScenarioId = (String) request.get("nextScenarioId");
            
            scenarioService.linkCampaignScenarios(previousScenarioId, nextScenarioId);
            
            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Campaign scenarios linked successfully"
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", e.getMessage()
            ));
        }
    }
    
    // ======================
    // PREDEFINED SCENARIOS
    // ======================
    
    @PostMapping("/predefined/temporal-rift")
    public ResponseEntity<Scenario> createTemporalRiftScenario() {
        Scenario scenario = scenarioService.createTemporalRiftScenario();
        return ResponseEntity.ok(scenario);
    }
    
    @PostMapping("/predefined/conquest-classic")
    public ResponseEntity<Scenario> createConquestClassicScenario() {
        Scenario scenario = scenarioService.createConquestClassicScenario();
        return ResponseEntity.ok(scenario);
    }
    
    @PostMapping("/predefined/economic-race")
    public ResponseEntity<Scenario> createEconomicRaceScenario() {
        Scenario scenario = scenarioService.createEconomicRaceScenario();
        return ResponseEntity.ok(scenario);
    }
    
    @PostMapping("/predefined/artifact-hunt")
    public ResponseEntity<Scenario> createArtifactHuntScenario() {
        Scenario scenario = scenarioService.createArtifactHuntScenario();
        return ResponseEntity.ok(scenario);
    }
    
    @PostMapping("/predefined/survival")
    public ResponseEntity<Scenario> createSurvivalScenario() {
        Scenario scenario = scenarioService.createSurvivalScenario();
        return ResponseEntity.ok(scenario);
    }
    
    @PostMapping("/initialize-defaults")
    public ResponseEntity<Map<String, Object>> initializeDefaultScenarios() {
        try {
            scenarioService.initializeDefaultScenarios();
            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Default scenarios initialized successfully"
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", e.getMessage()
            ));
        }
    }
    
    // ======================
    // OBJECTIVE MANAGEMENT
    // ======================
    
    @GetMapping("/{scenarioId}/objectives")
    public ResponseEntity<List<Scenario.ScenarioObjective>> getScenarioObjectives(@PathVariable String scenarioId) {
        List<Scenario.ScenarioObjective> objectives = scenarioService.getScenarioObjectives(scenarioId);
        return ResponseEntity.ok(objectives);
    }
    
    @GetMapping("/{scenarioId}/objectives/completed")
    public ResponseEntity<List<Scenario.ScenarioObjective>> getCompletedObjectives(@PathVariable String scenarioId) {
        List<Scenario.ScenarioObjective> objectives = scenarioService.getCompletedObjectives(scenarioId);
        return ResponseEntity.ok(objectives);
    }
    
    @GetMapping("/{scenarioId}/objectives/pending")
    public ResponseEntity<List<Scenario.ScenarioObjective>> getPendingObjectives(@PathVariable String scenarioId) {
        List<Scenario.ScenarioObjective> objectives = scenarioService.getPendingObjectives(scenarioId);
        return ResponseEntity.ok(objectives);
    }
    
    @PostMapping("/{scenarioId}/objectives/{objectiveId}/progress")
    public ResponseEntity<Map<String, Object>> updateObjectiveProgress(
            @PathVariable String scenarioId,
            @PathVariable String objectiveId,
            @RequestBody Map<String, Object> request) {
        try {
            Integer currentValue = (Integer) request.get("currentValue");
            boolean completed = scenarioService.checkObjectiveCompletion(scenarioId, objectiveId, currentValue);
            
            return ResponseEntity.ok(Map.of(
                "success", true,
                "completed", completed,
                "message", completed ? "Objective completed!" : "Objective progress updated"
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", e.getMessage()
            ));
        }
    }
    
    @PostMapping("/{scenarioId}/objectives/{objectiveId}/increment")
    public ResponseEntity<Map<String, Object>> incrementObjectiveProgress(
            @PathVariable String scenarioId,
            @PathVariable String objectiveId) {
        try {
            scenarioService.incrementObjectiveProgress(scenarioId, objectiveId);
            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Objective progress incremented"
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", e.getMessage()
            ));
        }
    }
    
    @GetMapping("/{scenarioId}/victory-check")
    public ResponseEntity<Map<String, Object>> checkVictoryCondition(@PathVariable String scenarioId) {
        try {
            boolean victory = scenarioService.checkVictoryCondition(scenarioId);
            return ResponseEntity.ok(Map.of(
                "victory", victory,
                "message", victory ? "Victory achieved!" : "Victory conditions not met"
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "victory", false,
                "message", e.getMessage()
            ));
        }
    }
    
    // ======================
    // EVENT MANAGEMENT
    // ======================
    
    @GetMapping("/{scenarioId}/events/triggered")
    public ResponseEntity<List<Scenario.ScenarioEvent>> getTriggeredEvents(
            @PathVariable String scenarioId,
            @RequestParam Integer currentTurn) {
        List<Scenario.ScenarioEvent> events = scenarioService.getTriggeredEvents(scenarioId, currentTurn);
        return ResponseEntity.ok(events);
    }
    
    @PostMapping("/{scenarioId}/events/{eventId}/trigger")
    public ResponseEntity<Map<String, Object>> triggerEvent(
            @PathVariable String scenarioId,
            @PathVariable String eventId) {
        try {
            scenarioService.triggerEvent(scenarioId, eventId);
            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Event triggered successfully"
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", e.getMessage()
            ));
        }
    }
    
    // ======================
    // MAP GENERATION
    // ======================
    
    @GetMapping("/{scenarioId}/map")
    public ResponseEntity<Map<String, Object>> generateScenarioMap(@PathVariable String scenarioId) {
        try {
            Map<String, Object> map = scenarioService.generateScenarioMap(scenarioId);
            return ResponseEntity.ok(map);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "error", e.getMessage()
            ));
        }
    }
    
    // ======================
    // STATISTICS
    // ======================
    
    @GetMapping("/statistics")
    public ResponseEntity<Map<String, Object>> getScenarioStatistics() {
        Map<String, Object> statistics = scenarioService.getScenarioStatistics();
        return ResponseEntity.ok(statistics);
    }
    
    // ======================
    // CRUD OPERATIONS
    // ======================
    
    @PostMapping
    public ResponseEntity<Scenario> createScenario(@RequestBody Scenario scenario) {
        try {
            Scenario createdScenario = scenarioService.createScenario(scenario);
            return ResponseEntity.ok(createdScenario);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/{scenarioId}")
    public ResponseEntity<Scenario> updateScenario(@PathVariable String scenarioId, @RequestBody Scenario scenario) {
        try {
            scenario.setScenarioId(scenarioId);
            Scenario updatedScenario = scenarioService.updateScenario(scenario);
            return ResponseEntity.ok(updatedScenario);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @DeleteMapping("/{scenarioId}")
    public ResponseEntity<Map<String, Object>> deleteScenario(@PathVariable String scenarioId) {
        try {
            scenarioService.deleteScenario(scenarioId);
            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Scenario deleted successfully"
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", e.getMessage()
            ));
        }
    }
    
    // ======================
    // HEALTH CHECK
    // ======================
    
    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> health() {
        return ResponseEntity.ok(Map.of("status", "UP", "service", "ScenarioService"));
    }
} 