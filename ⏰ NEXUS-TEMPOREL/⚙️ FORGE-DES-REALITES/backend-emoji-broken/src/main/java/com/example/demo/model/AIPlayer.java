package com.example.demo.model;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "ai_players")
public class AIPlayer {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "ai_player_id", unique = true, nullable = false)
    private String aiPlayerId;
    
    @Column(name = "game_id", nullable = false)
    private String gameId;
    
    @Column(name = "player_name", nullable = false)
    private String playerName;
    
    @Column(name = "difficulty_level", nullable = false)
    private String difficultyLevel; // easy, normal, hard, expert
    
    @Column(name = "ai_personality", nullable = false)
    private String aiPersonality; // aggressive, defensive, economic, balanced
    
    @Column(name = "faction", nullable = false)
    private String faction; // castle, rampart, tower, inferno, etc.
    
    @Column(name = "position_x", nullable = false)
    private Integer positionX;
    
    @Column(name = "position_y", nullable = false)
    private Integer positionY;
    
    @Column(name = "is_active", nullable = false)
    private Boolean isActive;
    
    @Column(name = "is_turn_active", nullable = false)
    private Boolean isTurnActive;
    
    @Column(name = "turn_priority", nullable = false)
    private Integer turnPriority;
    
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;
    
    @Column(name = "last_action_at")
    private LocalDateTime lastActionAt;
    
    // AI Strategy Parameters
    @Column(name = "aggression_level", nullable = false)
    private Integer aggressionLevel; // 1-10
    
    @Column(name = "economic_focus", nullable = false)
    private Integer economicFocus; // 1-10
    
    @Column(name = "exploration_tendency", nullable = false)
    private Integer explorationTendency; // 1-10
    
    @Column(name = "military_focus", nullable = false)
    private Integer militaryFocus; // 1-10
    
    @Column(name = "building_priority", nullable = false)
    private Integer buildingPriority; // 1-10
    
    @Column(name = "magic_affinity", nullable = false)
    private Integer magicAffinity; // 1-10
    
    // AI Decision History
    @ElementCollection
    @CollectionTable(name = "ai_decision_history", joinColumns = @JoinColumn(name = "ai_player_id"))
    private List<AIDecision> decisionHistory;
    
    // AI Goals and Objectives
    @ElementCollection
    @CollectionTable(name = "ai_goals", joinColumns = @JoinColumn(name = "ai_player_id"))
    private List<AIGoal> currentGoals;
    
    // AI Memory and Learning
    @Column(name = "enemy_threat_assessment", length = 2000)
    private String enemyThreatAssessment; // JSON string
    
    @Column(name = "resource_priorities", length = 1000)
    private String resourcePriorities; // JSON string
    
    @Column(name = "territory_control", length = 1000)
    private String territoryControl; // JSON string
    
    @Column(name = "learned_patterns", length = 2000)
    private String learnedPatterns; // JSON string
    
    // Performance Metrics
    @Column(name = "total_turns_played", nullable = false)
    private Integer totalTurnsPlayed;
    
    @Column(name = "successful_actions", nullable = false)
    private Integer successfulActions;
    
    @Column(name = "failed_actions", nullable = false)
    private Integer failedActions;
    
    @Column(name = "victories", nullable = false)
    private Integer victories;
    
    @Column(name = "defeats", nullable = false)
    private Integer defeats;
    
    @Column(name = "average_decision_time", nullable = false)
    private Integer averageDecisionTime; // milliseconds
    
    // Constructor
    public AIPlayer() {
        this.decisionHistory = new ArrayList<>();
        this.currentGoals = new ArrayList<>();
        this.isActive = true;
        this.isTurnActive = false;
        this.turnPriority = 1;
        this.createdAt = LocalDateTime.now();
        this.totalTurnsPlayed = 0;
        this.successfulActions = 0;
        this.failedActions = 0;
        this.victories = 0;
        this.defeats = 0;
        this.averageDecisionTime = 1000;
    }
    
    public AIPlayer(String aiPlayerId, String gameId, String playerName, String difficultyLevel, 
                   String aiPersonality, String faction, Integer positionX, Integer positionY) {
        this();
        this.aiPlayerId = aiPlayerId;
        this.gameId = gameId;
        this.playerName = playerName;
        this.difficultyLevel = difficultyLevel;
        this.aiPersonality = aiPersonality;
        this.faction = faction;
        this.positionX = positionX;
        this.positionY = positionY;
        this.turnPriority = 1;
        
        // Set AI parameters based on difficulty and personality
        setAIParameters();
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getAiPlayerId() { return aiPlayerId; }
    public void setAiPlayerId(String aiPlayerId) { this.aiPlayerId = aiPlayerId; }
    
    public String getGameId() { return gameId; }
    public void setGameId(String gameId) { this.gameId = gameId; }
    
    public String getPlayerName() { return playerName; }
    public void setPlayerName(String playerName) { this.playerName = playerName; }
    
    public String getDifficultyLevel() { return difficultyLevel; }
    public void setDifficultyLevel(String difficultyLevel) { this.difficultyLevel = difficultyLevel; }
    
    public String getAiPersonality() { return aiPersonality; }
    public void setAiPersonality(String aiPersonality) { this.aiPersonality = aiPersonality; }
    
    public String getFaction() { return faction; }
    public void setFaction(String faction) { this.faction = faction; }
    
    public Integer getPositionX() { return positionX; }
    public void setPositionX(Integer positionX) { this.positionX = positionX; }
    
    public Integer getPositionY() { return positionY; }
    public void setPositionY(Integer positionY) { this.positionY = positionY; }
    
    public Boolean getIsActive() { return isActive; }
    public void setIsActive(Boolean isActive) { this.isActive = isActive; }
    
    public Boolean getIsTurnActive() { return isTurnActive; }
    public void setIsTurnActive(Boolean isTurnActive) { this.isTurnActive = isTurnActive; }
    
    public Integer getTurnPriority() { return turnPriority; }
    public void setTurnPriority(Integer turnPriority) { this.turnPriority = turnPriority; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getLastActionAt() { return lastActionAt; }
    public void setLastActionAt(LocalDateTime lastActionAt) { this.lastActionAt = lastActionAt; }
    
    public Integer getAggressionLevel() { return aggressionLevel; }
    public void setAggressionLevel(Integer aggressionLevel) { this.aggressionLevel = aggressionLevel; }
    
    public Integer getEconomicFocus() { return economicFocus; }
    public void setEconomicFocus(Integer economicFocus) { this.economicFocus = economicFocus; }
    
    public Integer getExplorationTendency() { return explorationTendency; }
    public void setExplorationTendency(Integer explorationTendency) { this.explorationTendency = explorationTendency; }
    
    public Integer getMilitaryFocus() { return militaryFocus; }
    public void setMilitaryFocus(Integer militaryFocus) { this.militaryFocus = militaryFocus; }
    
    public Integer getBuildingPriority() { return buildingPriority; }
    public void setBuildingPriority(Integer buildingPriority) { this.buildingPriority = buildingPriority; }
    
    public Integer getMagicAffinity() { return magicAffinity; }
    public void setMagicAffinity(Integer magicAffinity) { this.magicAffinity = magicAffinity; }
    
    public List<AIDecision> getDecisionHistory() { return decisionHistory; }
    public void setDecisionHistory(List<AIDecision> decisionHistory) { this.decisionHistory = decisionHistory; }
    
    public List<AIGoal> getCurrentGoals() { return currentGoals; }
    public void setCurrentGoals(List<AIGoal> currentGoals) { this.currentGoals = currentGoals; }
    
    public String getEnemyThreatAssessment() { return enemyThreatAssessment; }
    public void setEnemyThreatAssessment(String enemyThreatAssessment) { this.enemyThreatAssessment = enemyThreatAssessment; }
    
    public String getResourcePriorities() { return resourcePriorities; }
    public void setResourcePriorities(String resourcePriorities) { this.resourcePriorities = resourcePriorities; }
    
    public String getTerritoryControl() { return territoryControl; }
    public void setTerritoryControl(String territoryControl) { this.territoryControl = territoryControl; }
    
    public String getLearnedPatterns() { return learnedPatterns; }
    public void setLearnedPatterns(String learnedPatterns) { this.learnedPatterns = learnedPatterns; }
    
    public Integer getTotalTurnsPlayed() { return totalTurnsPlayed; }
    public void setTotalTurnsPlayed(Integer totalTurnsPlayed) { this.totalTurnsPlayed = totalTurnsPlayed; }
    
    public Integer getSuccessfulActions() { return successfulActions; }
    public void setSuccessfulActions(Integer successfulActions) { this.successfulActions = successfulActions; }
    
    public Integer getFailedActions() { return failedActions; }
    public void setFailedActions(Integer failedActions) { this.failedActions = failedActions; }
    
    public Integer getVictories() { return victories; }
    public void setVictories(Integer victories) { this.victories = victories; }
    
    public Integer getDefeats() { return defeats; }
    public void setDefeats(Integer defeats) { this.defeats = defeats; }
    
    public Integer getAverageDecisionTime() { return averageDecisionTime; }
    public void setAverageDecisionTime(Integer averageDecisionTime) { this.averageDecisionTime = averageDecisionTime; }
    
    // Helper Methods
    public void addDecision(AIDecision decision) {
        this.decisionHistory.add(decision);
        this.lastActionAt = LocalDateTime.now();
    }
    
    public void addGoal(AIGoal goal) {
        this.currentGoals.add(goal);
    }
    
    public void removeGoal(String goalId) {
        this.currentGoals.removeIf(goal -> goal.getGoalId().equals(goalId));
    }
    
    public void activateTurn() {
        this.isTurnActive = true;
        this.totalTurnsPlayed++;
    }
    
    public void deactivateTurn() {
        this.isTurnActive = false;
    }
    
    public void recordSuccess() {
        this.successfulActions++;
    }
    
    public void recordFailure() {
        this.failedActions++;
    }
    
    public void recordVictory() {
        this.victories++;
    }
    
    public void recordDefeat() {
        this.defeats++;
    }
    
    public double getSuccessRate() {
        int totalActions = successfulActions + failedActions;
        if (totalActions == 0) return 0.0;
        return (double) successfulActions / totalActions;
    }
    
    public double getWinRate() {
        int totalGames = victories + defeats;
        if (totalGames == 0) return 0.0;
        return (double) victories / totalGames;
    }
    
    private void setAIParameters() {
        // Set base parameters based on difficulty
        switch (difficultyLevel) {
            case "easy":
                setEasyParameters();
                break;
            case "normal":
                setNormalParameters();
                break;
            case "hard":
                setHardParameters();
                break;
            case "expert":
                setExpertParameters();
                break;
            default:
                setNormalParameters();
        }
        
        // Adjust based on personality
        adjustForPersonality();
    }
    
    private void setEasyParameters() {
        this.aggressionLevel = 3;
        this.economicFocus = 5;
        this.explorationTendency = 4;
        this.militaryFocus = 4;
        this.buildingPriority = 6;
        this.magicAffinity = 3;
    }
    
    private void setNormalParameters() {
        this.aggressionLevel = 5;
        this.economicFocus = 6;
        this.explorationTendency = 5;
        this.militaryFocus = 6;
        this.buildingPriority = 7;
        this.magicAffinity = 5;
    }
    
    private void setHardParameters() {
        this.aggressionLevel = 7;
        this.economicFocus = 8;
        this.explorationTendency = 7;
        this.militaryFocus = 8;
        this.buildingPriority = 8;
        this.magicAffinity = 7;
    }
    
    private void setExpertParameters() {
        this.aggressionLevel = 9;
        this.economicFocus = 9;
        this.explorationTendency = 8;
        this.militaryFocus = 9;
        this.buildingPriority = 9;
        this.magicAffinity = 8;
    }
    
    private void adjustForPersonality() {
        switch (aiPersonality) {
            case "aggressive":
                this.aggressionLevel = Math.min(10, this.aggressionLevel + 3);
                this.militaryFocus = Math.min(10, this.militaryFocus + 2);
                this.economicFocus = Math.max(1, this.economicFocus - 1);
                break;
            case "defensive":
                this.aggressionLevel = Math.max(1, this.aggressionLevel - 2);
                this.buildingPriority = Math.min(10, this.buildingPriority + 2);
                this.economicFocus = Math.min(10, this.economicFocus + 1);
                break;
            case "economic":
                this.economicFocus = Math.min(10, this.economicFocus + 3);
                this.buildingPriority = Math.min(10, this.buildingPriority + 2);
                this.aggressionLevel = Math.max(1, this.aggressionLevel - 1);
                break;
            case "balanced":
                // No adjustments - keep base values
                break;
        }
    }
    
    // Inner Classes
    @Embeddable
    public static class AIDecision {
        @Column(name = "decision_id")
        private String decisionId;
        
        @Column(name = "decision_type")
        private String decisionType; // move, attack, build, recruit, cast_spell
        
        @Column(name = "decision_rationale")
        private String decisionRationale;
        
        @Column(name = "decision_parameters")
        private String decisionParameters; // JSON string
        
        @Column(name = "decision_timestamp")
        private LocalDateTime decisionTimestamp;
        
        @Column(name = "decision_outcome")
        private String decisionOutcome; // success, failure, pending
        
        @Column(name = "decision_score")
        private Integer decisionScore; // 1-10 rating
        
        public AIDecision() {
            this.decisionTimestamp = LocalDateTime.now();
            this.decisionOutcome = "pending";
            this.decisionScore = 5;
        }
        
        public AIDecision(String decisionId, String decisionType, String decisionRationale, String decisionParameters) {
            this();
            this.decisionId = decisionId;
            this.decisionType = decisionType;
            this.decisionRationale = decisionRationale;
            this.decisionParameters = decisionParameters;
        }
        
        // Getters and Setters
        public String getDecisionId() { return decisionId; }
        public void setDecisionId(String decisionId) { this.decisionId = decisionId; }
        
        public String getDecisionType() { return decisionType; }
        public void setDecisionType(String decisionType) { this.decisionType = decisionType; }
        
        public String getDecisionRationale() { return decisionRationale; }
        public void setDecisionRationale(String decisionRationale) { this.decisionRationale = decisionRationale; }
        
        public String getDecisionParameters() { return decisionParameters; }
        public void setDecisionParameters(String decisionParameters) { this.decisionParameters = decisionParameters; }
        
        public LocalDateTime getDecisionTimestamp() { return decisionTimestamp; }
        public void setDecisionTimestamp(LocalDateTime decisionTimestamp) { this.decisionTimestamp = decisionTimestamp; }
        
        public String getDecisionOutcome() { return decisionOutcome; }
        public void setDecisionOutcome(String decisionOutcome) { this.decisionOutcome = decisionOutcome; }
        
        public Integer getDecisionScore() { return decisionScore; }
        public void setDecisionScore(Integer decisionScore) { this.decisionScore = decisionScore; }
    }
    
    @Embeddable
    public static class AIGoal {
        @Column(name = "goal_id")
        private String goalId;
        
        @Column(name = "goal_type")
        private String goalType; // expand, defend, attack, economic, research
        
        @Column(name = "goal_priority")
        private Integer goalPriority; // 1-10
        
        @Column(name = "goal_description")
        private String goalDescription;
        
        @Column(name = "goal_target")
        private String goalTarget; // player, location, resource, building
        
        @Column(name = "goal_progress")
        private Integer goalProgress; // 0-100
        
        @Column(name = "goal_deadline")
        private LocalDateTime goalDeadline;
        
        @Column(name = "goal_status")
        private String goalStatus; // active, completed, failed, paused
        
        public AIGoal() {
            this.goalProgress = 0;
            this.goalStatus = "active";
        }
        
        public AIGoal(String goalId, String goalType, Integer goalPriority, String goalDescription, String goalTarget) {
            this();
            this.goalId = goalId;
            this.goalType = goalType;
            this.goalPriority = goalPriority;
            this.goalDescription = goalDescription;
            this.goalTarget = goalTarget;
        }
        
        // Getters and Setters
        public String getGoalId() { return goalId; }
        public void setGoalId(String goalId) { this.goalId = goalId; }
        
        public String getGoalType() { return goalType; }
        public void setGoalType(String goalType) { this.goalType = goalType; }
        
        public Integer getGoalPriority() { return goalPriority; }
        public void setGoalPriority(Integer goalPriority) { this.goalPriority = goalPriority; }
        
        public String getGoalDescription() { return goalDescription; }
        public void setGoalDescription(String goalDescription) { this.goalDescription = goalDescription; }
        
        public String getGoalTarget() { return goalTarget; }
        public void setGoalTarget(String goalTarget) { this.goalTarget = goalTarget; }
        
        public Integer getGoalProgress() { return goalProgress; }
        public void setGoalProgress(Integer goalProgress) { this.goalProgress = goalProgress; }
        
        public LocalDateTime getGoalDeadline() { return goalDeadline; }
        public void setGoalDeadline(LocalDateTime goalDeadline) { this.goalDeadline = goalDeadline; }
        
        public String getGoalStatus() { return goalStatus; }
        public void setGoalStatus(String goalStatus) { this.goalStatus = goalStatus; }
        
        public void updateProgress(Integer progress) {
            this.goalProgress = progress;
            if (progress >= 100) {
                this.goalStatus = "completed";
            }
        }
        
        public void completeGoal() {
            this.goalProgress = 100;
            this.goalStatus = "completed";
        }
        
        public void failGoal() {
            this.goalStatus = "failed";
        }
    }
} 