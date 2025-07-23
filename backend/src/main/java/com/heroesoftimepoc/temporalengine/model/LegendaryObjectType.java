package com.heroesoftimepoc.temporalengine.model;

/**
 * Types d'objets légendaires dans le système temporel
 */
public enum LegendaryObjectType {
    /**
     * Artefacts portables - ex: Eye of Wigner, Veil, Spectral Shoes
     */
    ARTIFACT,
    
    /**
     * Structures fixes - ex: Tower of Anchoring
     */
    STRUCTURE,
    
    /**
     * Armes spéciales - ex: Lame d'Avant-Monde
     */
    WEAPON,
    
    /**
     * Objets singuliers uniques - ex: Rollback Totem
     */
    SINGULARITY,
    
    /**
     * Objets consommables à usage unique
     */
    CONSUMABLE,
    
    /**
     * Objets passifs qui affectent l'environnement
     */
    PASSIVE,
    
    /**
     * Objets qui nécessitent une activation
     */
    ACTIVE;
    
    public boolean isPortable() {
        return this == ARTIFACT || this == WEAPON || this == CONSUMABLE;
    }
    
    public boolean isFixed() {
        return this == STRUCTURE;
    }
    
    public boolean isUnique() {
        return this == SINGULARITY;
    }
    
    public boolean requiresActivation() {
        return this == ACTIVE || this == WEAPON;
    }
    
    public boolean isPassive() {
        return this == PASSIVE || this == STRUCTURE;
    }
} 