package com.example.demo.controller;

import com.example.demo.model.AIPlayer;
import com.example.demo.model.AIPlayer.AIDecision;
import com.example.demo.service.AIService;
import com.example.demo.service.AIService.PoliticalAdvisor;
import com.example.demo.service.AIService.PoliticalEvent;
import com.example.demo.service.AIService.PoliticalChoice;
import com.example.demo.service.AIService.AdvisorRecommendation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "http://localhost:3000")
public class AIController {

    @Autowired
    private AIService aiService;

    // Political Advisor Endpoints

    /**
     * Get all political advisors
     */
    @GetMapping("/political-advisors")
    public ResponseEntity<List<PoliticalAdvisor>> getPoliticalAdvisors() {
        List<PoliticalAdvisor> advisors = aiService.getPoliticalAdvisors();
        return ResponseEntity.ok(advisors);
    }

    /**
     * Generate advisor recommendations for a political choice
     */
    @PostMapping("/political-advisors/recommendations")
    public ResponseEntity<List<AdvisorRecommendation>> generateAdvisorRecommendations(
            @RequestBody Map<String, Object> request) {
        
        // Extract event and choice from request
        // This would need proper deserialization in a real implementation
        PoliticalEvent event = deserializePoliticalEvent(request.get("event"));
        PoliticalChoice choice = deserializePoliticalChoice(request.get("choice"));
        
        List<AdvisorRecommendation> recommendations = aiService.generateAdvisorRecommendations(event, choice);
        return ResponseEntity.ok(recommendations);
    }

    /**
     * Generate a random political event
     */
    @PostMapping("/political-events/generate")
    public ResponseEntity<PoliticalEvent> generatePoliticalEvent(@RequestBody Map<String, Object> request) {
        @SuppressWarnings("unchecked")
        Map<String, Integer> currentReputation = (Map<String, Integer>) request.get("currentReputation");
        Integer turn = (Integer) request.get("turn");
        
        PoliticalEvent event = aiService.generateRandomPoliticalEvent(currentReputation, turn);
        return ResponseEntity.ok(event);
    }

    /**
     * Update advisor opinions based on player decision
     */
    @PostMapping("/political-advisors/update-opinions")
    public ResponseEntity<List<PoliticalAdvisor>> updateAdvisorOpinions(@RequestBody Map<String, Object> request) {
        @SuppressWarnings("unchecked")
        List<PoliticalAdvisor> currentAdvisors = (List<PoliticalAdvisor>) request.get("currentAdvisors");
        PoliticalChoice choice = deserializePoliticalChoice(request.get("choice"));
        
        List<PoliticalAdvisor> updatedAdvisors = aiService.updateAdvisorOpinions(currentAdvisors, choice);
        return ResponseEntity.ok(updatedAdvisors);
    }

    /**
     * Calculate political stability
     */
    @PostMapping("/political-advisors/calculate-stability")
    public ResponseEntity<Map<String, Object>> calculatePoliticalStability(@RequestBody Map<String, Object> request) {
        @SuppressWarnings("unchecked")
        List<PoliticalAdvisor> advisors = (List<PoliticalAdvisor>) request.get("advisors");
        
        Map<String, Object> stability = aiService.calculatePoliticalStability(advisors);
        return ResponseEntity.ok(stability);
    }

    // AI Player Management Endpoints

    /**
     * Get AI player by ID
     */
    @GetMapping("/players/{aiPlayerId}")
    public ResponseEntity<AIPlayer> getAIPlayer(@PathVariable String aiPlayerId) {
        Optional<AIPlayer> aiPlayer = aiService.getAIPlayer(aiPlayerId);
        return aiPlayer.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    /**
     * Get all AI players for a game
     */
    @GetMapping("/players/game/{gameId}")
    public ResponseEntity<List<AIPlayer>> getAIPlayersForGame(@PathVariable String gameId) {
        List<AIPlayer> aiPlayers = aiService.getAIPlayersForGame(gameId);
        return ResponseEntity.ok(aiPlayers);
    }

    /**
     * Create a new AI player
     */
    @PostMapping("/players")
    public ResponseEntity<AIPlayer> createAIPlayer(@RequestBody Map<String, Object> request) {
        String gameId = (String) request.get("gameId");
        String playerName = (String) request.get("playerName");
        String difficultyLevel = (String) request.get("difficultyLevel");
        String aiPersonality = (String) request.get("aiPersonality");
        String faction = (String) request.get("faction");
        Integer positionX = (Integer) request.get("positionX");
        Integer positionY = (Integer) request.get("positionY");
        
        AIPlayer aiPlayer = aiService.createAIPlayer(gameId, playerName, difficultyLevel, aiPersonality, faction, positionX, positionY);
        return ResponseEntity.ok(aiPlayer);
    }

    /**
     * Make AI decision for a player
     */
    @PostMapping("/players/{aiPlayerId}/decision")
    public ResponseEntity<AIDecision> makeAIDecision(@PathVariable String aiPlayerId, @RequestBody Map<String, Object> gameState) {
        AIDecision decision = aiService.makeAIDecision(aiPlayerId, gameState);
        if (decision != null) {
            return ResponseEntity.ok(decision);
        }
        return ResponseEntity.notFound().build();
    }

    /**
     * Update AI player statistics
     */
    @PostMapping("/players/{aiPlayerId}/stats")
    public ResponseEntity<Void> updateAIPlayerStats(@PathVariable String aiPlayerId, @RequestBody Map<String, String> request) {
        String outcome = request.get("outcome");
        aiService.updateAIPlayerStats(aiPlayerId, outcome);
        return ResponseEntity.ok().build();
    }

    // Helper methods for deserialization
    // In a real implementation, these would be more robust

    private PoliticalEvent deserializePoliticalEvent(Object eventObj) {
        // Simplified deserialization - in real implementation, use proper JSON mapping
        if (eventObj instanceof Map) {
            @SuppressWarnings("unchecked")
            Map<String, Object> eventMap = (Map<String, Object>) eventObj;
            return new PoliticalEvent(
                (String) eventMap.get("id"),
                (String) eventMap.get("type"),
                (String) eventMap.get("title"),
                (String) eventMap.get("description"),
                null, // choices would need proper deserialization
                (String) eventMap.get("deadline"),
                (String) eventMap.get("severity"),
                null // consequences would need proper deserialization
            );
        }
        return null;
    }

    private PoliticalChoice deserializePoliticalChoice(Object choiceObj) {
        // Simplified deserialization - in real implementation, use proper JSON mapping
        if (choiceObj instanceof Map) {
            @SuppressWarnings("unchecked")
            Map<String, Object> choiceMap = (Map<String, Object>) choiceObj;
            return new PoliticalChoice(
                (String) choiceMap.get("id"),
                (String) choiceMap.get("text"),
                (Map<String, Object>) choiceMap.get("consequences"),
                (Map<String, String>) choiceMap.get("advisorRecommendations")
            );
        }
        return null;
    }
} 