package com.heroesoftimepoc.temporalengine.model;

/**
 * Zones de causalité dans le système temporel
 * Basé sur ASYNC_ENGINE_DESIGN.md
 */
public enum CausalityZone {
    /**
     * Zone inconnue ou non définie
     */
    UNKNOWN,
    
    /**
     * Around hero or castle - Zone de vision directe
     */
    VISION,
    
    /**
     * Reachable by next action - Zone de mouvement
     */
    MOVEMENT,
    
    /**
     * Extends to possible future states and resolved interactions
     */
    CAUSALITY,
    
    /**
     * Prevents timeline alterations - Zone d'ancrage
     */
    ANCHORED,
    
    /**
     * Ghost zone - visible but not interactable
     */
    GHOST,
    
    /**
     * Rollback zone - historical rewind area
     */
    ROLLBACK;
    
    public boolean isInteractive() {
        return this != GHOST && this != UNKNOWN;
    }
    
    public boolean preventsTimeline() {
        return this == ANCHORED;
    }
    
    public boolean isVisible() {
        return this != UNKNOWN;
    }
    
    public boolean allowsPlanning() {
        return this == MOVEMENT || this == CAUSALITY;
    }
} 