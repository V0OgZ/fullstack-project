package com.example.demo.service;

import com.example.demo.model.AIPlayer;
import com.example.demo.repository.AIPlayerRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
public class AIService {

    @Autowired
    private AIPlayerRepository aiPlayerRepository;

    private final ObjectMapper objectMapper = new ObjectMapper();

    // ======================
    // AI PLAYER MANAGEMENT
    // ======================

    public List<AIPlayer> getAIPlayersForGame(String gameId) {
        return aiPlayerRepository.findByGameId(gameId);
    }

    public AIPlayer getAIPlayer(String aiPlayerId) {
        return aiPlayerRepository.findByAiPlayerId(aiPlayerId).orElse(null);
    }

    public AIPlayer createAIPlayer(String gameId, String playerName, String difficultyLevel, 
                                  String aiPersonality, String faction, Integer positionX, Integer positionY) {
        String aiPlayerId = generateAIPlayerId(gameId);
        
        AIPlayer aiPlayer = new AIPlayer(aiPlayerId, gameId, playerName, difficultyLevel, 
                                       aiPersonality, faction, positionX, positionY);
        
        // Initialize with default goals based on personality
        initializeDefaultGoals(aiPlayer);
        
        return aiPlayerRepository.save(aiPlayer);
    }

    public void deleteAIPlayer(String aiPlayerId) {
        aiPlayerRepository.deleteByAiPlayerId(aiPlayerId);
    }

    // ======================
    // AI DECISION PROCESSING
    // ======================

    public Map<String, Object> processAITurn(String aiPlayerId) {
        AIPlayer aiPlayer = getAIPlayer(aiPlayerId);
        if (aiPlayer == null) {
            throw new RuntimeException("AI Player not found: " + aiPlayerId);
        }

        aiPlayer.activateTurn();
        
        Map<String, Object> result = new HashMap<>();
        List<AIPlayer.AIDecision> turnDecisions = new ArrayList<>();

        try {
            // Process AI decision making
            turnDecisions.addAll(processMovementDecisions(aiPlayer));
            turnDecisions.addAll(processCombatDecisions(aiPlayer));
            turnDecisions.addAll(processBuildingDecisions(aiPlayer));
            turnDecisions.addAll(processResourceDecisions(aiPlayer));
            turnDecisions.addAll(processStrategicDecisions(aiPlayer));

            // Update AI goals based on decisions
            updateAIGoalsProgress(aiPlayer, turnDecisions);

            // Record successful turn
            aiPlayer.recordSuccess();
            
            result.put("success", true);
            result.put("decisionsCount", turnDecisions.size());
            result.put("decisions", turnDecisions);
            
        } catch (Exception e) {
            aiPlayer.recordFailure();
            result.put("success", false);
            result.put("error", e.getMessage());
        } finally {
            aiPlayer.deactivateTurn();
            aiPlayerRepository.save(aiPlayer);
        }

        return result;
    }

    // ======================
    // AI DECISION TYPES
    // ======================

    private List<AIPlayer.AIDecision> processMovementDecisions(AIPlayer aiPlayer) {
        List<AIPlayer.AIDecision> decisions = new ArrayList<>();
        
        // Simulate movement decision based on AI personality
        if (shouldMakeMovementDecision(aiPlayer)) {
            AIPlayer.AIDecision decision = new AIPlayer.AIDecision(
                generateDecisionId(),
                "move",
                generateMovementRationale(aiPlayer),
                generateMovementParameters(aiPlayer)
            );
            
            decision.setDecisionOutcome("success");
            decision.setDecisionScore(calculateDecisionScore(aiPlayer, "move"));
            
            aiPlayer.addDecision(decision);
            decisions.add(decision);
        }
        
        return decisions;
    }

    private List<AIPlayer.AIDecision> processCombatDecisions(AIPlayer aiPlayer) {
        List<AIPlayer.AIDecision> decisions = new ArrayList<>();
        
        // Simulate combat decision based on aggression level
        if (shouldMakeCombatDecision(aiPlayer)) {
            AIPlayer.AIDecision decision = new AIPlayer.AIDecision(
                generateDecisionId(),
                "attack",
                generateCombatRationale(aiPlayer),
                generateCombatParameters(aiPlayer)
            );
            
            decision.setDecisionOutcome(simulateCombatOutcome(aiPlayer));
            decision.setDecisionScore(calculateDecisionScore(aiPlayer, "attack"));
            
            aiPlayer.addDecision(decision);
            decisions.add(decision);
        }
        
        return decisions;
    }

    private List<AIPlayer.AIDecision> processBuildingDecisions(AIPlayer aiPlayer) {
        List<AIPlayer.AIDecision> decisions = new ArrayList<>();
        
        // Simulate building decision based on economic focus
        if (shouldMakeBuildingDecision(aiPlayer)) {
            AIPlayer.AIDecision decision = new AIPlayer.AIDecision(
                generateDecisionId(),
                "build",
                generateBuildingRationale(aiPlayer),
                generateBuildingParameters(aiPlayer)
            );
            
            decision.setDecisionOutcome("success");
            decision.setDecisionScore(calculateDecisionScore(aiPlayer, "build"));
            
            aiPlayer.addDecision(decision);
            decisions.add(decision);
        }
        
        return decisions;
    }

    private List<AIPlayer.AIDecision> processResourceDecisions(AIPlayer aiPlayer) {
        List<AIPlayer.AIDecision> decisions = new ArrayList<>();
        
        // Simulate resource collection decision
        if (shouldMakeResourceDecision(aiPlayer)) {
            AIPlayer.AIDecision decision = new AIPlayer.AIDecision(
                generateDecisionId(),
                "collect",
                generateResourceRationale(aiPlayer),
                generateResourceParameters(aiPlayer)
            );
            
            decision.setDecisionOutcome("success");
            decision.setDecisionScore(calculateDecisionScore(aiPlayer, "collect"));
            
            aiPlayer.addDecision(decision);
            decisions.add(decision);
        }
        
        return decisions;
    }

    private List<AIPlayer.AIDecision> processStrategicDecisions(AIPlayer aiPlayer) {
        List<AIPlayer.AIDecision> decisions = new ArrayList<>();
        
        // Simulate strategic decisions like recruiting or casting spells
        if (shouldMakeStrategicDecision(aiPlayer)) {
            String decisionType = Math.random() > 0.5 ? "recruit" : "cast_spell";
            
            AIPlayer.AIDecision decision = new AIPlayer.AIDecision(
                generateDecisionId(),
                decisionType,
                generateStrategicRationale(aiPlayer, decisionType),
                generateStrategicParameters(aiPlayer, decisionType)
            );
            
            decision.setDecisionOutcome("success");
            decision.setDecisionScore(calculateDecisionScore(aiPlayer, decisionType));
            
            aiPlayer.addDecision(decision);
            decisions.add(decision);
        }
        
        return decisions;
    }

    // ======================
    // AI GOAL MANAGEMENT
    // ======================

    public List<AIPlayer.AIGoal> getAIGoals(String aiPlayerId) {
        AIPlayer aiPlayer = getAIPlayer(aiPlayerId);
        return aiPlayer != null ? aiPlayer.getCurrentGoals() : new ArrayList<>();
    }

    public AIPlayer.AIGoal addAIGoal(String aiPlayerId, String goalType, Integer priority, 
                                   String description, String target) {
        AIPlayer aiPlayer = getAIPlayer(aiPlayerId);
        if (aiPlayer == null) {
            throw new RuntimeException("AI Player not found: " + aiPlayerId);
        }

        AIPlayer.AIGoal newGoal = new AIPlayer.AIGoal(
            generateGoalId(),
            goalType,
            priority,
            description,
            target
        );

        aiPlayer.addGoal(newGoal);
        aiPlayerRepository.save(aiPlayer);
        
        return newGoal;
    }

    public AIPlayer.AIGoal updateAIGoal(String aiPlayerId, String goalId, Integer progress, String status) {
        AIPlayer aiPlayer = getAIPlayer(aiPlayerId);
        if (aiPlayer == null) {
            throw new RuntimeException("AI Player not found: " + aiPlayerId);
        }

        for (AIPlayer.AIGoal goal : aiPlayer.getCurrentGoals()) {
            if (goal.getGoalId().equals(goalId)) {
                if (progress != null) {
                    goal.updateProgress(progress);
                }
                if (status != null) {
                    goal.setGoalStatus(status);
                }
                aiPlayerRepository.save(aiPlayer);
                return goal;
            }
        }
        
        throw new RuntimeException("Goal not found: " + goalId);
    }

    private void updateAIGoalsProgress(AIPlayer aiPlayer, List<AIPlayer.AIDecision> decisions) {
        for (AIPlayer.AIGoal goal : aiPlayer.getCurrentGoals()) {
            if (goal.getGoalStatus().equals("active")) {
                // Update progress based on decisions made
                int progressIncrease = calculateGoalProgress(goal, decisions);
                goal.updateProgress(goal.getGoalProgress() + progressIncrease);
            }
        }
    }

    // ======================
    // AI METRICS AND ANALYSIS
    // ======================

    public Map<String, Object> getAIMetrics(String aiPlayerId) {
        AIPlayer aiPlayer = getAIPlayer(aiPlayerId);
        if (aiPlayer == null) {
            throw new RuntimeException("AI Player not found: " + aiPlayerId);
        }

        Map<String, Object> metrics = new HashMap<>();
        metrics.put("totalTurnsPlayed", aiPlayer.getTotalTurnsPlayed());
        metrics.put("successfulActions", aiPlayer.getSuccessfulActions());
        metrics.put("failedActions", aiPlayer.getFailedActions());
        metrics.put("successRate", aiPlayer.getSuccessRate());
        metrics.put("victories", aiPlayer.getVictories());
        metrics.put("defeats", aiPlayer.getDefeats());
        metrics.put("winRate", aiPlayer.getWinRate());
        metrics.put("averageDecisionTime", aiPlayer.getAverageDecisionTime());
        
        return metrics;
    }

    public List<AIPlayer.AIDecision> getAIDecisions(String aiPlayerId) {
        AIPlayer aiPlayer = getAIPlayer(aiPlayerId);
        return aiPlayer != null ? aiPlayer.getDecisionHistory() : new ArrayList<>();
    }

    public List<AIPlayer.AIDecision> getRecentAIActions(String gameId) {
        List<AIPlayer> aiPlayers = getAIPlayersForGame(gameId);
        List<AIPlayer.AIDecision> allDecisions = new ArrayList<>();
        
        for (AIPlayer aiPlayer : aiPlayers) {
            List<AIPlayer.AIDecision> playerDecisions = aiPlayer.getDecisionHistory();
            // Add player name to decisions for display
            for (AIPlayer.AIDecision decision : playerDecisions) {
                // Create a wrapper or modify the decision to include player name
                allDecisions.add(decision);
            }
        }
        
        // Sort by timestamp and return most recent
        return allDecisions.stream()
                .sorted((a, b) -> b.getDecisionTimestamp().compareTo(a.getDecisionTimestamp()))
                .limit(20)
                .collect(Collectors.toList());
    }

    // ======================
    // AI TURN MANAGEMENT
    // ======================

    public Map<String, Object> activateAITurn(String aiPlayerId) {
        AIPlayer aiPlayer = getAIPlayer(aiPlayerId);
        if (aiPlayer == null) {
            throw new RuntimeException("AI Player not found: " + aiPlayerId);
        }

        aiPlayer.activateTurn();
        aiPlayerRepository.save(aiPlayer);
        
        Map<String, Object> result = new HashMap<>();
        result.put("success", true);
        result.put("message", "AI turn activated");
        result.put("aiPlayerId", aiPlayerId);
        
        return result;
    }

    public Map<String, Object> deactivateAITurn(String aiPlayerId) {
        AIPlayer aiPlayer = getAIPlayer(aiPlayerId);
        if (aiPlayer == null) {
            throw new RuntimeException("AI Player not found: " + aiPlayerId);
        }

        aiPlayer.deactivateTurn();
        aiPlayerRepository.save(aiPlayer);
        
        Map<String, Object> result = new HashMap<>();
        result.put("success", true);
        result.put("message", "AI turn deactivated");
        result.put("aiPlayerId", aiPlayerId);
        
        return result;
    }

    // ======================
    // AI ANALYSIS METHODS
    // ======================

    public Map<String, Object> getThreatAssessment(String aiPlayerId) {
        AIPlayer aiPlayer = getAIPlayer(aiPlayerId);
        if (aiPlayer == null) {
            throw new RuntimeException("AI Player not found: " + aiPlayerId);
        }

        Map<String, Object> assessment = new HashMap<>();
        try {
            String threatData = aiPlayer.getEnemyThreatAssessment();
            if (threatData != null) {
                assessment = objectMapper.readValue(threatData, Map.class);
            }
        } catch (Exception e) {
            // Return default assessment if parsing fails
            assessment.put("overallThreat", "moderate");
            assessment.put("nearbyEnemies", 2);
            assessment.put("militaryStrength", "average");
        }
        
        return assessment;
    }

    public Map<String, Object> getResourcePriorities(String aiPlayerId) {
        AIPlayer aiPlayer = getAIPlayer(aiPlayerId);
        if (aiPlayer == null) {
            throw new RuntimeException("AI Player not found: " + aiPlayerId);
        }

        Map<String, Object> priorities = new HashMap<>();
        try {
            String priorityData = aiPlayer.getResourcePriorities();
            if (priorityData != null) {
                priorities = objectMapper.readValue(priorityData, Map.class);
            }
        } catch (Exception e) {
            // Return default priorities based on AI personality
            priorities.put("gold", aiPlayer.getEconomicFocus());
            priorities.put("wood", 5);
            priorities.put("stone", 4);
            priorities.put("ore", aiPlayer.getMilitaryFocus());
        }
        
        return priorities;
    }

    public Map<String, Object> getLearningPatterns(String aiPlayerId) {
        AIPlayer aiPlayer = getAIPlayer(aiPlayerId);
        if (aiPlayer == null) {
            throw new RuntimeException("AI Player not found: " + aiPlayerId);
        }

        Map<String, Object> patterns = new HashMap<>();
        try {
            String patternData = aiPlayer.getLearnedPatterns();
            if (patternData != null) {
                patterns = objectMapper.readValue(patternData, Map.class);
            }
        } catch (Exception e) {
            // Return default patterns
            patterns.put("preferredStrategy", aiPlayer.getAiPersonality());
            patterns.put("adaptationRate", "medium");
            patterns.put("learningProgress", 0.6);
        }
        
        return patterns;
    }

    // ======================
    // HELPER METHODS
    // ======================

    private void initializeDefaultGoals(AIPlayer aiPlayer) {
        // Add default goals based on AI personality
        switch (aiPlayer.getAiPersonality()) {
            case "aggressive":
                aiPlayer.addGoal(new AIPlayer.AIGoal("goal1", "attack", 8, "Eliminate nearby enemies", "player"));
                aiPlayer.addGoal(new AIPlayer.AIGoal("goal2", "expand", 6, "Capture strategic locations", "territory"));
                break;
            case "defensive":
                aiPlayer.addGoal(new AIPlayer.AIGoal("goal1", "defend", 9, "Fortify home base", "castle"));
                aiPlayer.addGoal(new AIPlayer.AIGoal("goal2", "economic", 7, "Build economic infrastructure", "resources"));
                break;
            case "economic":
                aiPlayer.addGoal(new AIPlayer.AIGoal("goal1", "economic", 9, "Maximize resource production", "resources"));
                aiPlayer.addGoal(new AIPlayer.AIGoal("goal2", "research", 6, "Develop advanced technologies", "knowledge"));
                break;
            default:
                aiPlayer.addGoal(new AIPlayer.AIGoal("goal1", "expand", 7, "Balanced expansion", "territory"));
                aiPlayer.addGoal(new AIPlayer.AIGoal("goal2", "economic", 6, "Steady economic growth", "resources"));
        }
    }

    private String generateAIPlayerId(String gameId) {
        return "ai_" + gameId + "_" + System.currentTimeMillis();
    }

    private String generateDecisionId() {
        return "decision_" + System.currentTimeMillis() + "_" + (int)(Math.random() * 1000);
    }

    private String generateGoalId() {
        return "goal_" + System.currentTimeMillis() + "_" + (int)(Math.random() * 1000);
    }

    // Decision making logic
    private boolean shouldMakeMovementDecision(AIPlayer aiPlayer) {
        return Math.random() < (aiPlayer.getExplorationTendency() / 10.0);
    }

    private boolean shouldMakeCombatDecision(AIPlayer aiPlayer) {
        return Math.random() < (aiPlayer.getAggressionLevel() / 10.0);
    }

    private boolean shouldMakeBuildingDecision(AIPlayer aiPlayer) {
        return Math.random() < (aiPlayer.getBuildingPriority() / 10.0);
    }

    private boolean shouldMakeResourceDecision(AIPlayer aiPlayer) {
        return Math.random() < (aiPlayer.getEconomicFocus() / 10.0);
    }

    private boolean shouldMakeStrategicDecision(AIPlayer aiPlayer) {
        return Math.random() < 0.3; // 30% chance for strategic decisions
    }

    // Rationale generation
    private String generateMovementRationale(AIPlayer aiPlayer) {
        String[] rationales = {
            "Exploring nearby territory for resources",
            "Moving to strategic position",
            "Advancing toward enemy territory",
            "Retreating to safer position",
            "Scouting for threats"
        };
        return rationales[(int)(Math.random() * rationales.length)];
    }

    private String generateCombatRationale(AIPlayer aiPlayer) {
        String[] rationales = {
            "Enemy forces detected - engaging",
            "Opportunity to eliminate weak opponent",
            "Defending territory from invasion",
            "Preemptive strike against threat",
            "Clearing path for expansion"
        };
        return rationales[(int)(Math.random() * rationales.length)];
    }

    private String generateBuildingRationale(AIPlayer aiPlayer) {
        String[] rationales = {
            "Expanding economic infrastructure",
            "Building defensive structures",
            "Upgrading military capabilities",
            "Improving resource production",
            "Strengthening strategic position"
        };
        return rationales[(int)(Math.random() * rationales.length)];
    }

    private String generateResourceRationale(AIPlayer aiPlayer) {
        String[] rationales = {
            "Collecting valuable resources",
            "Securing economic advantage",
            "Gathering materials for expansion",
            "Harvesting strategic resources",
            "Building resource reserves"
        };
        return rationales[(int)(Math.random() * rationales.length)];
    }

    private String generateStrategicRationale(AIPlayer aiPlayer, String decisionType) {
        if (decisionType.equals("recruit")) {
            return "Reinforcing military forces";
        } else {
            return "Casting strategic spell";
        }
    }

    // Parameter generation (simplified)
    private String generateMovementParameters(AIPlayer aiPlayer) {
        return "{\"targetX\": " + (int)(Math.random() * 20) + ", \"targetY\": " + (int)(Math.random() * 20) + "}";
    }

    private String generateCombatParameters(AIPlayer aiPlayer) {
        return "{\"targetType\": \"enemy\", \"expectedDamage\": " + (int)(Math.random() * 50) + "}";
    }

    private String generateBuildingParameters(AIPlayer aiPlayer) {
        String[] buildings = {"barracks", "market", "tower", "wall"};
        return "{\"buildingType\": \"" + buildings[(int)(Math.random() * buildings.length)] + "\"}";
    }

    private String generateResourceParameters(AIPlayer aiPlayer) {
        return "{\"resourceType\": \"gold\", \"amount\": " + (int)(Math.random() * 100) + "}";
    }

    private String generateStrategicParameters(AIPlayer aiPlayer, String decisionType) {
        if (decisionType.equals("recruit")) {
            return "{\"unitType\": \"warrior\", \"quantity\": " + (int)(Math.random() * 10 + 1) + "}";
        } else {
            return "{\"spellType\": \"blessing\", \"target\": \"ally\"}";
        }
    }

    private String simulateCombatOutcome(AIPlayer aiPlayer) {
        double successChance = aiPlayer.getMilitaryFocus() / 10.0;
        return Math.random() < successChance ? "success" : "failure";
    }

    private int calculateDecisionScore(AIPlayer aiPlayer, String decisionType) {
        int baseScore = 5;
        
        switch (decisionType) {
            case "move":
                baseScore += aiPlayer.getExplorationTendency() / 2;
                break;
            case "attack":
                baseScore += aiPlayer.getAggressionLevel() / 2;
                break;
            case "build":
                baseScore += aiPlayer.getBuildingPriority() / 2;
                break;
            case "collect":
                baseScore += aiPlayer.getEconomicFocus() / 2;
                break;
            default:
                baseScore += 2;
        }
        
        return Math.min(10, Math.max(1, baseScore));
    }

    private int calculateGoalProgress(AIPlayer.AIGoal goal, List<AIPlayer.AIDecision> decisions) {
        int progress = 0;
        
        for (AIPlayer.AIDecision decision : decisions) {
            if (decision.getDecisionOutcome().equals("success")) {
                switch (goal.getGoalType()) {
                    case "attack":
                        if (decision.getDecisionType().equals("attack")) progress += 20;
                        break;
                    case "defend":
                        if (decision.getDecisionType().equals("build")) progress += 15;
                        break;
                    case "economic":
                        if (decision.getDecisionType().equals("collect") || decision.getDecisionType().equals("build")) progress += 10;
                        break;
                    case "expand":
                        if (decision.getDecisionType().equals("move")) progress += 10;
                        break;
                    default:
                        progress += 5;
                }
            }
        }
        
        return Math.min(20, progress); // Max 20% progress per turn
    }
} 