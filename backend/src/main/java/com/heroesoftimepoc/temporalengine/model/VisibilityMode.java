package com.heroesoftimepoc.temporalengine.model;

/**
 * Modes de visibilité pour les objets légendaires
 */
public enum VisibilityMode {
    /**
     * Visibilité normale - l'objet est visible selon les règles standard
     */
    NORMAL,
    
    /**
     * Visible seulement en mode fantôme
     */
    GHOST_ONLY,
    
    /**
     * Toujours visible, même dans le brouillard
     */
    ALWAYS_VISIBLE,
    
    /**
     * Invisible jusqu'à activation
     */
    HIDDEN_UNTIL_ACTIVATION,
    
    /**
     * Visible seulement par le propriétaire
     */
    OWNER_ONLY,
    
    /**
     * Visible seulement par les adversaires
     */
    OPPONENTS_ONLY,
    
    /**
     * Clignote entre visible et invisible
     */
    PHASE_SHIFTING,
    
    /**
     * Visible seulement pendant les tours pairs
     */
    EVEN_TURNS_ONLY,
    
    /**
     * Visible seulement pendant les tours impairs
     */
    ODD_TURNS_ONLY,
    
    /**
     * Visible seulement quand observé directement
     */
    OBSERVATION_DEPENDENT,
    
    /**
     * Devient invisible après utilisation
     */
    DISAPPEARS_AFTER_USE,
    
    /**
     * Visible seulement dans certaines conditions temporelles
     */
    TEMPORAL_CONDITIONAL;
    
    public boolean isAlwaysVisible() {
        return this == ALWAYS_VISIBLE;
    }
    
    public boolean isNeverVisible() {
        return false; // Aucun mode n'est jamais visible
    }
    
    public boolean isPlayerDependent() {
        return this == OWNER_ONLY || this == OPPONENTS_ONLY;
    }
    
    public boolean isTimeDependent() {
        return this == EVEN_TURNS_ONLY || 
               this == ODD_TURNS_ONLY || 
               this == PHASE_SHIFTING ||
               this == TEMPORAL_CONDITIONAL;
    }
    
    public boolean isObservationDependent() {
        return this == OBSERVATION_DEPENDENT || this == GHOST_ONLY;
    }
    
    public boolean isActivationDependent() {
        return this == HIDDEN_UNTIL_ACTIVATION || this == DISAPPEARS_AFTER_USE;
    }
    
    public boolean requiresSpecialVision() {
        return this == GHOST_ONLY;
    }
    
    /**
     * Détermine si l'objet est visible dans un contexte donné
     */
    public boolean isVisibleInContext(String observer, String owner, int currentTurn, boolean hasSpecialVision, boolean isActivated) {
        switch (this) {
            case NORMAL:
                return true;
            case GHOST_ONLY:
                return hasSpecialVision;
            case ALWAYS_VISIBLE:
                return true;
            case HIDDEN_UNTIL_ACTIVATION:
                return isActivated;
            case OWNER_ONLY:
                return observer.equals(owner);
            case OPPONENTS_ONLY:
                return !observer.equals(owner);
            case PHASE_SHIFTING:
                return (currentTurn % 3) != 0; // Visible 2 tours sur 3
            case EVEN_TURNS_ONLY:
                return currentTurn % 2 == 0;
            case ODD_TURNS_ONLY:
                return currentTurn % 2 != 0;
            case OBSERVATION_DEPENDENT:
                return true; // Devient visible quand observé
            case DISAPPEARS_AFTER_USE:
                return !isActivated;
            case TEMPORAL_CONDITIONAL:
                return checkTemporalConditions(currentTurn);
            default:
                return true;
        }
    }
    
    private boolean checkTemporalConditions(int currentTurn) {
        // Implémentation des conditions temporelles spécifiques
        // Par exemple : visible seulement pendant les éclipses temporelles
        return (currentTurn % 10) == 0; // Visible tous les 10 tours
    }
    
    public float getVisibilityOpacity(String observer, String owner, int currentTurn, boolean hasSpecialVision, boolean isActivated) {
        if (!isVisibleInContext(observer, owner, currentTurn, hasSpecialVision, isActivated)) {
            return 0.0f;
        }
        
        switch (this) {
            case GHOST_ONLY:
                return 0.3f;
            case PHASE_SHIFTING:
                return 0.5f + 0.5f * (float) Math.sin(currentTurn * Math.PI / 4);
            case OBSERVATION_DEPENDENT:
                return 0.7f;
            case DISAPPEARS_AFTER_USE:
                return isActivated ? 0.2f : 1.0f;
            default:
                return 1.0f;
        }
    }
    
    public String getVisualEffect() {
        switch (this) {
            case GHOST_ONLY:
                return "translucent-blue";
            case PHASE_SHIFTING:
                return "phase-shift-animation";
            case OBSERVATION_DEPENDENT:
                return "observation-glow";
            case DISAPPEARS_AFTER_USE:
                return "fading-effect";
            case TEMPORAL_CONDITIONAL:
                return "temporal-flicker";
            default:
                return "normal";
        }
    }
} 