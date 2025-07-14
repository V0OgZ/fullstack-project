package com.example.demo.model;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "scenarios")
public class Scenario {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "scenario_id", unique = true, nullable = false)
    private String scenarioId;
    
    @Column(name = "name", nullable = false)
    private String name;
    
    @Column(name = "description", length = 1000)
    private String description;
    
    @Column(name = "difficulty", nullable = false)
    private String difficulty; // easy, normal, hard, expert
    
    @Column(name = "max_players", nullable = false)
    private Integer maxPlayers;
    
    @Column(name = "recommended_players", nullable = false)
    private Integer recommendedPlayers;
    
    @Column(name = "map_size", nullable = false)
    private String mapSize; // small, medium, large, extra_large
    
    @Column(name = "map_width", nullable = false)
    private Integer mapWidth;
    
    @Column(name = "map_height", nullable = false)
    private Integer mapHeight;
    
    @Column(name = "turn_limit")
    private Integer turnLimit;
    
    @Column(name = "time_limit")
    private Integer timeLimit; // in minutes
    
    @Column(name = "victory_condition", nullable = false)
    private String victoryCondition; // conquest, economic, artifact, time, custom
    
    @Column(name = "victory_requirement", length = 500)
    private String victoryRequirement;
    
    @Column(name = "defeat_condition")
    private String defeatCondition;
    
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
    
    @Column(name = "is_active", nullable = false)
    private Boolean isActive;
    
    @Column(name = "is_campaign", nullable = false)
    private Boolean isCampaign;
    
    @Column(name = "is_multiplayer", nullable = false)
    private Boolean isMultiplayer;
    
    @Column(name = "campaign_order")
    private Integer campaignOrder;
    
    @Column(name = "previous_scenario_id")
    private String previousScenarioId;
    
    @Column(name = "next_scenario_id")
    private String nextScenarioId;
    
    // Map configuration
    @Column(name = "terrain_distribution", length = 1000)
    private String terrainDistribution; // JSON string
    
    @Column(name = "starting_resources", length = 1000)
    private String startingResources; // JSON string
    
    @Column(name = "neutral_creatures", length = 2000)
    private String neutralCreatures; // JSON string
    
    @Column(name = "artifacts", length = 1000)
    private String artifacts; // JSON string
    
    @Column(name = "special_buildings", length = 1000)
    private String specialBuildings; // JSON string
    
    @ElementCollection
    @CollectionTable(name = "scenario_objectives", joinColumns = @JoinColumn(name = "scenario_id"))
    private List<ScenarioObjective> objectives;
    
    @ElementCollection
    @CollectionTable(name = "scenario_starting_positions", joinColumns = @JoinColumn(name = "scenario_id"))
    private List<StartingPosition> startingPositions;
    
    @ElementCollection
    @CollectionTable(name = "scenario_events", joinColumns = @JoinColumn(name = "scenario_id"))
    private List<ScenarioEvent> events;
    
    // Constructor
    public Scenario() {
        this.objectives = new ArrayList<>();
        this.startingPositions = new ArrayList<>();
        this.events = new ArrayList<>();
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
        this.isActive = true;
        this.isCampaign = false;
        this.isMultiplayer = false;
    }
    
    public Scenario(String scenarioId, String name, String description, String difficulty, 
                   Integer maxPlayers, Integer mapWidth, Integer mapHeight, String victoryCondition) {
        this();
        this.scenarioId = scenarioId;
        this.name = name;
        this.description = description;
        this.difficulty = difficulty;
        this.maxPlayers = maxPlayers;
        this.recommendedPlayers = maxPlayers;
        this.mapWidth = mapWidth;
        this.mapHeight = mapHeight;
        this.victoryCondition = victoryCondition;
        this.mapSize = determineMapSize(mapWidth, mapHeight);
        this.isMultiplayer = maxPlayers > 1;
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getScenarioId() { return scenarioId; }
    public void setScenarioId(String scenarioId) { this.scenarioId = scenarioId; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public String getDifficulty() { return difficulty; }
    public void setDifficulty(String difficulty) { this.difficulty = difficulty; }
    
    public Integer getMaxPlayers() { return maxPlayers; }
    public void setMaxPlayers(Integer maxPlayers) { 
        this.maxPlayers = maxPlayers; 
        this.isMultiplayer = maxPlayers > 1;
    }
    
    public Integer getRecommendedPlayers() { return recommendedPlayers; }
    public void setRecommendedPlayers(Integer recommendedPlayers) { this.recommendedPlayers = recommendedPlayers; }
    
    public String getMapSize() { return mapSize; }
    public void setMapSize(String mapSize) { this.mapSize = mapSize; }
    
    public Integer getMapWidth() { return mapWidth; }
    public void setMapWidth(Integer mapWidth) { this.mapWidth = mapWidth; }
    
    public Integer getMapHeight() { return mapHeight; }
    public void setMapHeight(Integer mapHeight) { this.mapHeight = mapHeight; }
    
    public Integer getTurnLimit() { return turnLimit; }
    public void setTurnLimit(Integer turnLimit) { this.turnLimit = turnLimit; }
    
    public Integer getTimeLimit() { return timeLimit; }
    public void setTimeLimit(Integer timeLimit) { this.timeLimit = timeLimit; }
    
    public String getVictoryCondition() { return victoryCondition; }
    public void setVictoryCondition(String victoryCondition) { this.victoryCondition = victoryCondition; }
    
    public String getVictoryRequirement() { return victoryRequirement; }
    public void setVictoryRequirement(String victoryRequirement) { this.victoryRequirement = victoryRequirement; }
    
    public String getDefeatCondition() { return defeatCondition; }
    public void setDefeatCondition(String defeatCondition) { this.defeatCondition = defeatCondition; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
    
    public Boolean getIsActive() { return isActive; }
    public void setIsActive(Boolean isActive) { this.isActive = isActive; }
    
    public Boolean getIsCampaign() { return isCampaign; }
    public void setIsCampaign(Boolean isCampaign) { this.isCampaign = isCampaign; }
    
    public Boolean getIsMultiplayer() { return isMultiplayer; }
    public void setIsMultiplayer(Boolean isMultiplayer) { this.isMultiplayer = isMultiplayer; }
    
    public Integer getCampaignOrder() { return campaignOrder; }
    public void setCampaignOrder(Integer campaignOrder) { this.campaignOrder = campaignOrder; }
    
    public String getPreviousScenarioId() { return previousScenarioId; }
    public void setPreviousScenarioId(String previousScenarioId) { this.previousScenarioId = previousScenarioId; }
    
    public String getNextScenarioId() { return nextScenarioId; }
    public void setNextScenarioId(String nextScenarioId) { this.nextScenarioId = nextScenarioId; }
    
    public String getTerrainDistribution() { return terrainDistribution; }
    public void setTerrainDistribution(String terrainDistribution) { this.terrainDistribution = terrainDistribution; }
    
    public String getStartingResources() { return startingResources; }
    public void setStartingResources(String startingResources) { this.startingResources = startingResources; }
    
    public String getNeutralCreatures() { return neutralCreatures; }
    public void setNeutralCreatures(String neutralCreatures) { this.neutralCreatures = neutralCreatures; }
    
    public String getArtifacts() { return artifacts; }
    public void setArtifacts(String artifacts) { this.artifacts = artifacts; }
    
    public String getSpecialBuildings() { return specialBuildings; }
    public void setSpecialBuildings(String specialBuildings) { this.specialBuildings = specialBuildings; }
    
    public List<ScenarioObjective> getObjectives() { return objectives; }
    public void setObjectives(List<ScenarioObjective> objectives) { this.objectives = objectives; }
    
    public List<StartingPosition> getStartingPositions() { return startingPositions; }
    public void setStartingPositions(List<StartingPosition> startingPositions) { this.startingPositions = startingPositions; }
    
    public List<ScenarioEvent> getEvents() { return events; }
    public void setEvents(List<ScenarioEvent> events) { this.events = events; }
    
    // Helper methods
    public void addObjective(ScenarioObjective objective) {
        this.objectives.add(objective);
    }
    
    public void addStartingPosition(StartingPosition position) {
        this.startingPositions.add(position);
    }
    
    public void addEvent(ScenarioEvent event) {
        this.events.add(event);
    }
    
    public boolean isCompleted(String objectiveId) {
        return objectives.stream()
                .anyMatch(obj -> obj.getObjectiveId().equals(objectiveId) && obj.getIsCompleted());
    }
    
    public boolean allObjectivesCompleted() {
        return objectives.stream()
                .filter(obj -> obj.getIsRequired())
                .allMatch(ScenarioObjective::getIsCompleted);
    }
    
    private String determineMapSize(Integer width, Integer height) {
        int totalTiles = width * height;
        if (totalTiles <= 400) return "small";
        if (totalTiles <= 900) return "medium";
        if (totalTiles <= 1600) return "large";
        return "extra_large";
    }
    
    public void updateTimestamp() {
        this.updatedAt = LocalDateTime.now();
    }
    
    // Inner Classes
    @Embeddable
    public static class ScenarioObjective {
        @Column(name = "objective_id")
        private String objectiveId;
        
        @Column(name = "objective_type")
        private String objectiveType; // eliminate, capture, collect, survive, escort
        
        @Column(name = "objective_title")
        private String objectiveTitle;
        
        @Column(name = "objective_description")
        private String objectiveDescription;
        
        @Column(name = "target_value")
        private Integer targetValue;
        
        @Column(name = "current_value")
        private Integer currentValue;
        
        @Column(name = "is_required")
        private Boolean isRequired;
        
        @Column(name = "is_completed")
        private Boolean isCompleted;
        
        @Column(name = "completion_reward")
        private String completionReward;
        
        public ScenarioObjective() {
            this.currentValue = 0;
            this.isRequired = true;
            this.isCompleted = false;
        }
        
        public ScenarioObjective(String objectiveId, String objectiveType, String objectiveTitle, 
                               String objectiveDescription, Integer targetValue) {
            this();
            this.objectiveId = objectiveId;
            this.objectiveType = objectiveType;
            this.objectiveTitle = objectiveTitle;
            this.objectiveDescription = objectiveDescription;
            this.targetValue = targetValue;
        }
        
        // Getters and Setters
        public String getObjectiveId() { return objectiveId; }
        public void setObjectiveId(String objectiveId) { this.objectiveId = objectiveId; }
        
        public String getObjectiveType() { return objectiveType; }
        public void setObjectiveType(String objectiveType) { this.objectiveType = objectiveType; }
        
        public String getObjectiveTitle() { return objectiveTitle; }
        public void setObjectiveTitle(String objectiveTitle) { this.objectiveTitle = objectiveTitle; }
        
        public String getObjectiveDescription() { return objectiveDescription; }
        public void setObjectiveDescription(String objectiveDescription) { this.objectiveDescription = objectiveDescription; }
        
        public Integer getTargetValue() { return targetValue; }
        public void setTargetValue(Integer targetValue) { this.targetValue = targetValue; }
        
        public Integer getCurrentValue() { return currentValue; }
        public void setCurrentValue(Integer currentValue) { this.currentValue = currentValue; }
        
        public Boolean getIsRequired() { return isRequired; }
        public void setIsRequired(Boolean isRequired) { this.isRequired = isRequired; }
        
        public Boolean getIsCompleted() { return isCompleted; }
        public void setIsCompleted(Boolean isCompleted) { this.isCompleted = isCompleted; }
        
        public String getCompletionReward() { return completionReward; }
        public void setCompletionReward(String completionReward) { this.completionReward = completionReward; }
        
        public void updateProgress(Integer value) {
            this.currentValue = value;
            if (this.currentValue >= this.targetValue) {
                this.isCompleted = true;
            }
        }
        
        public void incrementProgress() {
            this.currentValue++;
            if (this.currentValue >= this.targetValue) {
                this.isCompleted = true;
            }
        }
    }
    
    @Embeddable
    public static class StartingPosition {
        @Column(name = "player_id")
        private String playerId;
        
        @Column(name = "position_x")
        private Integer positionX;
        
        @Column(name = "position_y")
        private Integer positionY;
        
        @Column(name = "castle_type")
        private String castleType;
        
        @Column(name = "starting_hero")
        private String startingHero;
        
        @Column(name = "starting_army")
        private String startingArmy; // JSON string
        
        @Column(name = "starting_resources")
        private String startingResources; // JSON string
        
        @Column(name = "handicap")
        private Integer handicap; // percentage bonus/penalty
        
        public StartingPosition() {
            this.handicap = 0;
        }
        
        public StartingPosition(String playerId, Integer positionX, Integer positionY, 
                              String castleType, String startingHero) {
            this();
            this.playerId = playerId;
            this.positionX = positionX;
            this.positionY = positionY;
            this.castleType = castleType;
            this.startingHero = startingHero;
        }
        
        // Getters and Setters
        public String getPlayerId() { return playerId; }
        public void setPlayerId(String playerId) { this.playerId = playerId; }
        
        public Integer getPositionX() { return positionX; }
        public void setPositionX(Integer positionX) { this.positionX = positionX; }
        
        public Integer getPositionY() { return positionY; }
        public void setPositionY(Integer positionY) { this.positionY = positionY; }
        
        public String getCastleType() { return castleType; }
        public void setCastleType(String castleType) { this.castleType = castleType; }
        
        public String getStartingHero() { return startingHero; }
        public void setStartingHero(String startingHero) { this.startingHero = startingHero; }
        
        public String getStartingArmy() { return startingArmy; }
        public void setStartingArmy(String startingArmy) { this.startingArmy = startingArmy; }
        
        public String getStartingResources() { return startingResources; }
        public void setStartingResources(String startingResources) { this.startingResources = startingResources; }
        
        public Integer getHandicap() { return handicap; }
        public void setHandicap(Integer handicap) { this.handicap = handicap; }
    }
    
    @Embeddable
    public static class ScenarioEvent {
        @Column(name = "event_id")
        private String eventId;
        
        @Column(name = "event_type")
        private String eventType; // timed, triggered, conditional
        
        @Column(name = "trigger_condition")
        private String triggerCondition;
        
        @Column(name = "trigger_turn")
        private Integer triggerTurn;
        
        @Column(name = "event_title")
        private String eventTitle;
        
        @Column(name = "event_description")
        private String eventDescription;
        
        @Column(name = "event_effect")
        private String eventEffect; // JSON string
        
        @Column(name = "is_triggered")
        private Boolean isTriggered;
        
        @Column(name = "is_repeatable")
        private Boolean isRepeatable;
        
        public ScenarioEvent() {
            this.isTriggered = false;
            this.isRepeatable = false;
        }
        
        public ScenarioEvent(String eventId, String eventType, String eventTitle, 
                           String eventDescription, String eventEffect) {
            this();
            this.eventId = eventId;
            this.eventType = eventType;
            this.eventTitle = eventTitle;
            this.eventDescription = eventDescription;
            this.eventEffect = eventEffect;
        }
        
        // Getters and Setters
        public String getEventId() { return eventId; }
        public void setEventId(String eventId) { this.eventId = eventId; }
        
        public String getEventType() { return eventType; }
        public void setEventType(String eventType) { this.eventType = eventType; }
        
        public String getTriggerCondition() { return triggerCondition; }
        public void setTriggerCondition(String triggerCondition) { this.triggerCondition = triggerCondition; }
        
        public Integer getTriggerTurn() { return triggerTurn; }
        public void setTriggerTurn(Integer triggerTurn) { this.triggerTurn = triggerTurn; }
        
        public String getEventTitle() { return eventTitle; }
        public void setEventTitle(String eventTitle) { this.eventTitle = eventTitle; }
        
        public String getEventDescription() { return eventDescription; }
        public void setEventDescription(String eventDescription) { this.eventDescription = eventDescription; }
        
        public String getEventEffect() { return eventEffect; }
        public void setEventEffect(String eventEffect) { this.eventEffect = eventEffect; }
        
        public Boolean getIsTriggered() { return isTriggered; }
        public void setIsTriggered(Boolean isTriggered) { this.isTriggered = isTriggered; }
        
        public Boolean getIsRepeatable() { return isRepeatable; }
        public void setIsRepeatable(Boolean isRepeatable) { this.isRepeatable = isRepeatable; }
        
        public void trigger() {
            this.isTriggered = true;
        }
        
        public void reset() {
            if (this.isRepeatable) {
                this.isTriggered = false;
            }
        }
    }
} 