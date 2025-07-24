package com.example.demo.service;

import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class CausalInteractionEngine {
    
    // LEBOSKU SAYS: DIRECT CODE, NO BULLSHIT!
    
    public boolean canStealObject(String thiefId, String objectId, String ownerId, 
                                 Map<String, Object> gameState) {
        
        // Get player temporal states
        int thiefDay = getPlayerTemporalDay(thiefId, gameState);
        int ownerDay = getPlayerTemporalDay(ownerId, gameState);
        
        // CAUSAL RULE: Can't steal if owner hasn't reached object's temporal state
        if (ownerDay < thiefDay) {
            System.out.println("[CAUSAL] " + thiefId + " blocked from stealing - owner temporal lag");
            return false;
        }
        
        // Normal distance/ownership checks
        return checkNormalRules(thiefId, objectId, ownerId, gameState);
    }
    
    public boolean canAttackPlayer(String attackerId, String targetId, Map<String, Object> gameState) {
        int attackerDay = getPlayerTemporalDay(attackerId, gameState);
        int targetDay = getPlayerTemporalDay(targetId, gameState);
        
        int dayDiff = Math.abs(attackerDay - targetDay);
        
        // Can't attack if too far apart temporally
        if (dayDiff > 3) {
            System.out.println("[CAUSAL] Attack blocked - temporal separation too high: " + dayDiff);
            return false;
        }
        
        return true;
    }
    
    public int calculateFogOpacity(String observerId, String targetId, Map<String, Object> gameState) {
        int observerDay = getPlayerTemporalDay(observerId, gameState);
        int targetDay = getPlayerTemporalDay(targetId, gameState);
        
        int dayDiff = Math.abs(observerDay - targetDay);
        
        // More temporal separation = more fog
        return Math.min(90, dayDiff * 30);
    }
    
    // HELPER METHODS - KEEP IT SIMPLE
    
    private int getPlayerTemporalDay(String playerId, Map<String, Object> gameState) {
        // Mock implementation - in real game this would come from PlayerTemporalState
        Map<String, Integer> playerDays = (Map<String, Integer>) gameState.get("playerTemporalDays");
        return playerDays.getOrDefault(playerId, 1);
    }
    
    private boolean checkNormalRules(String thiefId, String objectId, String ownerId, 
                                   Map<String, Object> gameState) {
        // Normal game rules - distance, ownership, etc.
        return true; // Simplified for now
    }
} 