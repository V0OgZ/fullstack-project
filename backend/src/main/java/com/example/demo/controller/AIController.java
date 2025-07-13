package com.example.demo.controller;

import com.example.demo.model.AIPlayer;
import com.example.demo.service.AIService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "http://localhost:3000")
public class AIController {

    @Autowired
    private AIService aiService;

    // Get all AI players for a game
    @GetMapping("/players/{gameId}")
    public ResponseEntity<List<AIPlayer>> getAIPlayers(@PathVariable String gameId) {
        try {
            List<AIPlayer> aiPlayers = aiService.getAIPlayersForGame(gameId);
            return ResponseEntity.ok(aiPlayers);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    // Get specific AI player details
    @GetMapping("/player/{aiPlayerId}")
    public ResponseEntity<AIPlayer> getAIPlayer(@PathVariable String aiPlayerId) {
        try {
            AIPlayer aiPlayer = aiService.getAIPlayer(aiPlayerId);
            if (aiPlayer != null) {
                return ResponseEntity.ok(aiPlayer);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    // Get recent AI decisions for a game
    @GetMapping("/recent-actions/{gameId}")
    public ResponseEntity<List<AIPlayer.AIDecision>> getRecentAIActions(@PathVariable String gameId) {
        try {
            List<AIPlayer.AIDecision> recentActions = aiService.getRecentAIActions(gameId);
            return ResponseEntity.ok(recentActions);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    // Get AI goals for a specific player
    @GetMapping("/goals/{aiPlayerId}")
    public ResponseEntity<List<AIPlayer.AIGoal>> getAIGoals(@PathVariable String aiPlayerId) {
        try {
            List<AIPlayer.AIGoal> goals = aiService.getAIGoals(aiPlayerId);
            return ResponseEntity.ok(goals);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    // Get AI decision history for a specific player
    @GetMapping("/decisions/{aiPlayerId}")
    public ResponseEntity<List<AIPlayer.AIDecision>> getAIDecisions(@PathVariable String aiPlayerId) {
        try {
            List<AIPlayer.AIDecision> decisions = aiService.getAIDecisions(aiPlayerId);
            return ResponseEntity.ok(decisions);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    // Create AI player for a game
    @PostMapping("/create")
    public ResponseEntity<AIPlayer> createAIPlayer(@RequestBody Map<String, Object> request) {
        try {
            String gameId = (String) request.get("gameId");
            String playerName = (String) request.get("playerName");
            String difficultyLevel = (String) request.get("difficultyLevel");
            String aiPersonality = (String) request.get("aiPersonality");
            String faction = (String) request.get("faction");
            Integer positionX = (Integer) request.get("positionX");
            Integer positionY = (Integer) request.get("positionY");

            AIPlayer aiPlayer = aiService.createAIPlayer(
                gameId, playerName, difficultyLevel, aiPersonality, 
                faction, positionX, positionY
            );
            
            return ResponseEntity.ok(aiPlayer);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    // Process AI turn
    @PostMapping("/process-turn/{aiPlayerId}")
    public ResponseEntity<Map<String, Object>> processAITurn(@PathVariable String aiPlayerId) {
        try {
            Map<String, Object> result = aiService.processAITurn(aiPlayerId);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    // Get AI performance metrics
    @GetMapping("/metrics/{aiPlayerId}")
    public ResponseEntity<Map<String, Object>> getAIMetrics(@PathVariable String aiPlayerId) {
        try {
            Map<String, Object> metrics = aiService.getAIMetrics(aiPlayerId);
            return ResponseEntity.ok(metrics);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    // Update AI goal
    @PutMapping("/goal/{aiPlayerId}/{goalId}")
    public ResponseEntity<AIPlayer.AIGoal> updateAIGoal(
            @PathVariable String aiPlayerId, 
            @PathVariable String goalId,
            @RequestBody Map<String, Object> request) {
        try {
            Integer progress = (Integer) request.get("progress");
            String status = (String) request.get("status");
            
            AIPlayer.AIGoal updatedGoal = aiService.updateAIGoal(aiPlayerId, goalId, progress, status);
            return ResponseEntity.ok(updatedGoal);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    // Add new AI goal
    @PostMapping("/goal/{aiPlayerId}")
    public ResponseEntity<AIPlayer.AIGoal> addAIGoal(
            @PathVariable String aiPlayerId,
            @RequestBody Map<String, Object> request) {
        try {
            String goalType = (String) request.get("goalType");
            Integer priority = (Integer) request.get("priority");
            String description = (String) request.get("description");
            String target = (String) request.get("target");
            
            AIPlayer.AIGoal newGoal = aiService.addAIGoal(aiPlayerId, goalType, priority, description, target);
            return ResponseEntity.ok(newGoal);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    // Get AI threat assessment
    @GetMapping("/threat-assessment/{aiPlayerId}")
    public ResponseEntity<Map<String, Object>> getAIThreatAssessment(@PathVariable String aiPlayerId) {
        try {
            Map<String, Object> threatAssessment = aiService.getThreatAssessment(aiPlayerId);
            return ResponseEntity.ok(threatAssessment);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    // Get AI resource priorities
    @GetMapping("/resource-priorities/{aiPlayerId}")
    public ResponseEntity<Map<String, Object>> getAIResourcePriorities(@PathVariable String aiPlayerId) {
        try {
            Map<String, Object> resourcePriorities = aiService.getResourcePriorities(aiPlayerId);
            return ResponseEntity.ok(resourcePriorities);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    // Activate AI player turn
    @PostMapping("/activate-turn/{aiPlayerId}")
    public ResponseEntity<Map<String, Object>> activateAITurn(@PathVariable String aiPlayerId) {
        try {
            Map<String, Object> result = aiService.activateAITurn(aiPlayerId);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    // Deactivate AI player turn
    @PostMapping("/deactivate-turn/{aiPlayerId}")
    public ResponseEntity<Map<String, Object>> deactivateAITurn(@PathVariable String aiPlayerId) {
        try {
            Map<String, Object> result = aiService.deactivateAITurn(aiPlayerId);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    // Get AI learning patterns
    @GetMapping("/learning-patterns/{aiPlayerId}")
    public ResponseEntity<Map<String, Object>> getAILearningPatterns(@PathVariable String aiPlayerId) {
        try {
            Map<String, Object> learningPatterns = aiService.getLearningPatterns(aiPlayerId);
            return ResponseEntity.ok(learningPatterns);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
} 