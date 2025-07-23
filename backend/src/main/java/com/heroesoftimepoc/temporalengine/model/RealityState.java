package com.heroesoftimepoc.temporalengine.model;

/**
 * États de réalité dans le système temporel
 * Basé sur ASYNC_ENGINE_DESIGN.md
 */
public enum RealityState {
    /**
     * Timeline nodes that are not achievable due to state 
     * (e.g., blocked by too strong enemies)
     */
    IMPOSSIBLE,
    
    /**
     * Reachable realities not yet realized 
     * (exist in memory as branches)
     */
    POTENTIAL,
    
    /**
     * Realized by one or more players but not yet collapsed
     */
    SUPERPOSED,
    
    /**
     * Observed and resolved by interaction or forced effect
     */
    COLLAPSED;
    
    public boolean isResolved() {
        return this == COLLAPSED;
    }
    
    public boolean isAchievable() {
        return this != IMPOSSIBLE;
    }
    
    public boolean isQuantum() {
        return this == SUPERPOSED;
    }
    
    public boolean isPotential() {
        return this == POTENTIAL;
    }
} 