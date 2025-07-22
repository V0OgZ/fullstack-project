package com.heroesoftimepoc.temporalengine.model;

/**
 * Effets causaux que peuvent avoir les objets légendaires
 */
public enum CausalityEffect {
    /**
     * Empêche la projection de timeline dans une zone
     */
    PREVENT_TIMELINE_PROJECTION,
    
    /**
     * Force l'observation et révèle les états cachés
     */
    FORCE_OBSERVATION,
    
    /**
     * Force l'effondrement des états superposés
     */
    FORCE_COLLAPSE,
    
    /**
     * Permet la vision fantôme
     */
    ENABLE_GHOST_VISION,
    
    /**
     * Permet le mouvement dans les zones fantômes
     */
    GHOST_MOVEMENT,
    
    /**
     * Effondre la timeline de l'adversaire
     */
    COLLAPSE_OPPONENT_TIMELINE,
    
    /**
     * Rembobine la réalité
     */
    REWIND_REALITY,
    
    /**
     * Crée une superposition quantique
     */
    CREATE_SUPERPOSITION,
    
    /**
     * Stabilise une zone contre les changements temporels
     */
    TEMPORAL_STABILITY,
    
    /**
     * Permet de voir les futurs possibles
     */
    FUTURE_VISION,
    
    /**
     * Permet de voir les passés alternatifs
     */
    PAST_VISION,
    
    /**
     * Crée un lien causal entre deux points
     */
    CAUSAL_LINK,
    
    /**
     * Brise un lien causal existant
     */
    BREAK_CAUSAL_LINK,
    
    /**
     * Amplifie les effets temporels
     */
    AMPLIFY_TEMPORAL_EFFECTS,
    
    /**
     * Supprime les effets temporels
     */
    SUPPRESS_TEMPORAL_EFFECTS,
    
    /**
     * Crée un paradoxe temporel contrôlé
     */
    CREATE_PARADOX,
    
    /**
     * Résout un paradoxe temporel
     */
    RESOLVE_PARADOX,
    
    /**
     * Permet la téléportation temporelle
     */
    TEMPORAL_TELEPORTATION,
    
    /**
     * Crée un écho temporel
     */
    TEMPORAL_ECHO,
    
    /**
     * Ancre un objet dans le temps
     */
    TEMPORAL_ANCHOR,
    
    /**
     * Libère un objet de son ancrage temporel
     */
    TEMPORAL_RELEASE;
    
    public boolean affectsTimeline() {
        return this != ENABLE_GHOST_VISION && this != GHOST_MOVEMENT;
    }
    
    public boolean isDestructive() {
        return this == COLLAPSE_OPPONENT_TIMELINE || 
               this == REWIND_REALITY || 
               this == CREATE_PARADOX ||
               this == BREAK_CAUSAL_LINK;
    }
    
    public boolean isConstructive() {
        return this == CREATE_SUPERPOSITION || 
               this == TEMPORAL_STABILITY || 
               this == CAUSAL_LINK ||
               this == RESOLVE_PARADOX;
    }
    
    public boolean requiresTarget() {
        return this == COLLAPSE_OPPONENT_TIMELINE || 
               this == CAUSAL_LINK || 
               this == BREAK_CAUSAL_LINK ||
               this == TEMPORAL_ANCHOR ||
               this == TEMPORAL_RELEASE;
    }
    
    public boolean isVisionRelated() {
        return this == ENABLE_GHOST_VISION || 
               this == FUTURE_VISION || 
               this == PAST_VISION ||
               this == FORCE_OBSERVATION;
    }
    
    public boolean isMovementRelated() {
        return this == GHOST_MOVEMENT || 
               this == TEMPORAL_TELEPORTATION;
    }
    
    public boolean isAreaEffect() {
        return this == PREVENT_TIMELINE_PROJECTION || 
               this == FORCE_OBSERVATION || 
               this == TEMPORAL_STABILITY ||
               this == AMPLIFY_TEMPORAL_EFFECTS ||
               this == SUPPRESS_TEMPORAL_EFFECTS;
    }
    
    public int getPowerLevel() {
        switch (this) {
            case ENABLE_GHOST_VISION:
            case GHOST_MOVEMENT:
                return 1;
            case FORCE_OBSERVATION:
            case FORCE_COLLAPSE:
                return 2;
            case PREVENT_TIMELINE_PROJECTION:
            case TEMPORAL_STABILITY:
                return 3;
            case COLLAPSE_OPPONENT_TIMELINE:
            case CREATE_SUPERPOSITION:
                return 4;
            case REWIND_REALITY:
            case CREATE_PARADOX:
                return 5;
            default:
                return 2;
        }
    }
} 