package com.heroesoftimepoc.temporalengine.model;

/**
 * États de brouillard et de visibilité dans le système temporel
 * Basé sur FOG_AND_ZONE_GAMEPLAY.md
 */
public enum FogState {
    /**
     * État 0: Unexplored - Full fog. Never seen.
     * Interaction: None
     */
    UNEXPLORED(0, "Unexplored", "Full fog. Never seen.", false),
    
    /**
     * État 1: Collapsed (Past) - Explored in a resolved timeline. Dimmed.
     * Interaction: View only
     */
    COLLAPSED_PAST(1, "Collapsed (Past)", "Explored in a resolved timeline. Dimmed.", true),
    
    /**
     * État 2: Reachable - Within movement range, but not yet observed.
     * Interaction: Planning only
     */
    REACHABLE(2, "Reachable", "Within movement range, but not yet observed.", true),
    
    /**
     * État 3: Vision - Within direct vision of unit or castle.
     * Interaction: Fully interactive
     */
    VISION(3, "Vision", "Within direct vision of unit or castle.", true),
    
    /**
     * État 4: Ghost - Seen with spectral object (Veil, etc.).
     * Interaction: No interaction
     */
    GHOST(4, "Ghost", "Seen with spectral object (Veil, etc.).", false),
    
    /**
     * État 5: Superposed - Entity is in quantum flux. Not yet collapsed.
     * Interaction: Partially visible
     */
    SUPERPOSED(5, "Superposed", "Entity is in quantum flux. Not yet collapsed.", true),
    
    /**
     * État 6: Anchored - Within a zone that blocks timeline branching.
     * Interaction: Forces collapse
     */
    ANCHORED(6, "Anchored", "Within a zone that blocks timeline branching.", true);
    
    private final int stateId;
    private final String name;
    private final String description;
    private final boolean interactable;
    
    FogState(int stateId, String name, String description, boolean interactable) {
        this.stateId = stateId;
        this.name = name;
        this.description = description;
        this.interactable = interactable;
    }
    
    public int getStateId() {
        return stateId;
    }
    
    public String getName() {
        return name;
    }
    
    public String getDescription() {
        return description;
    }
    
    public boolean isInteractable() {
        return interactable;
    }
    
    public boolean isVisible() {
        return this != UNEXPLORED;
    }
    
    public boolean isFullyVisible() {
        return this == VISION || this == ANCHORED;
    }
    
    public boolean isGhostMode() {
        return this == GHOST;
    }
    
    public boolean isQuantumState() {
        return this == SUPERPOSED;
    }
    
    public boolean allowsPlanning() {
        return this == REACHABLE || this == SUPERPOSED;
    }
    
    public boolean forcesCollapse() {
        return this == ANCHORED;
    }
    
    public boolean isHistorical() {
        return this == COLLAPSED_PAST;
    }
    
    /**
     * Obtenir l'état par son ID
     */
    public static FogState fromStateId(int stateId) {
        for (FogState state : values()) {
            if (state.stateId == stateId) {
                return state;
            }
        }
        return UNEXPLORED;
    }
    
    /**
     * Vérifier si un état peut être transitionné vers un autre
     */
    public boolean canTransitionTo(FogState newState) {
        // Règles de transition
        switch (this) {
            case UNEXPLORED:
                return newState != UNEXPLORED;
            case COLLAPSED_PAST:
                return newState == VISION || newState == GHOST;
            case REACHABLE:
                return newState == VISION || newState == COLLAPSED_PAST || newState == SUPERPOSED;
            case VISION:
                return newState == COLLAPSED_PAST || newState == ANCHORED;
            case GHOST:
                return newState == VISION || newState == COLLAPSED_PAST;
            case SUPERPOSED:
                return newState == COLLAPSED_PAST || newState == ANCHORED;
            case ANCHORED:
                return newState == COLLAPSED_PAST;
            default:
                return false;
        }
    }
    
    /**
     * Obtenir la priorité d'affichage (pour les cas où plusieurs états s'appliquent)
     */
    public int getDisplayPriority() {
        switch (this) {
            case ANCHORED: return 100;
            case VISION: return 90;
            case SUPERPOSED: return 80;
            case GHOST: return 70;
            case REACHABLE: return 60;
            case COLLAPSED_PAST: return 50;
            case UNEXPLORED: return 0;
            default: return 0;
        }
    }
    
    /**
     * Obtenir la couleur d'affichage recommandée
     */
    public String getDisplayColor() {
        switch (this) {
            case UNEXPLORED: return "#000000"; // Noir
            case COLLAPSED_PAST: return "#666666"; // Gris foncé
            case REACHABLE: return "#0066CC"; // Bleu
            case VISION: return "#FFFFFF"; // Blanc
            case GHOST: return "#9999FF"; // Bleu-violet translucide
            case SUPERPOSED: return "#FF6600"; // Orange scintillant
            case ANCHORED: return "#FFFF00"; // Jaune
            default: return "#000000";
        }
    }
    
    /**
     * Obtenir l'effet visuel recommandé
     */
    public String getVisualEffect() {
        switch (this) {
            case UNEXPLORED: return "solid-black";
            case COLLAPSED_PAST: return "dimmed";
            case REACHABLE: return "pulsing-halo";
            case VISION: return "clear";
            case GHOST: return "translucent";
            case SUPERPOSED: return "chromatic-aberration";
            case ANCHORED: return "locked-glow";
            default: return "none";
        }
    }
    
    @Override
    public String toString() {
        return String.format("FogState[%d: %s - %s]", stateId, name, description);
    }
} 