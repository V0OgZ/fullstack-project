package com.heroesoftimepoc.temporalengine.model;

/**
 * Auras visuelles pour l'interface utilisateur temporelle
 * Basé sur CAUSALITY_UI_AND_TIMELINE_VISUALS.md
 */
public enum VisualAura {
    /**
     * 1. Fully Realized (Opaque) - This tile or object is in a resolved timeline 
     * and visible to the player. It is part of the player's main causal reality.
     */
    FULLY_REALIZED("Fully Realized", "Normal sprite", "Opaque", true, "#FFFFFF", 1.0f),
    
    /**
     * 2. Explored but Collapsed (Dimmed) - The player has visited this location; 
     * the timeline has collapsed, but there's no current visibility.
     */
    EXPLORED_COLLAPSED("Explored but Collapsed", "Slightly dimmed, faded colors", "Dimmed", true, "#CCCCCC", 0.7f),
    
    /**
     * 3. Potentially Reachable (Colored Outline / Pulsing Halo) - This tile is reachable 
     * based on the player's movement range and known causality state.
     */
    POTENTIALLY_REACHABLE("Potentially Reachable", "Halo in blue, slightly transparent", "Halo", true, "#0066CC", 0.6f),
    
    /**
     * 4. Unknown / Unexplored (Fogged) - Never visited, no information.
     */
    UNKNOWN_UNEXPLORED("Unknown / Unexplored", "Classic dark fog", "Fogged", false, "#000000", 0.0f),
    
    /**
     * 5. Ghost Layer (Phased Reality) - Seen using objects like the Veil or spectral modes. 
     * The tile is visible but not interactable.
     */
    GHOST_LAYER("Ghost Layer", "Grayscale or slight blue/purple transparency", "Ghost", false, "#9999FF", 0.4f),
    
    /**
     * 6. Timeline Superposition (Glitch / Mirror Effect) - This entity or tile exists 
     * in multiple timelines and hasn't collapsed.
     */
    TIMELINE_SUPERPOSITION("Timeline Superposition", "Slight shimmer, multi-shadow or chromatic aberration", "Glitch", true, "#FF6600", 0.8f);
    
    private final String name;
    private final String description;
    private final String effect;
    private final boolean interactable;
    private final String color;
    private final float opacity;
    
    VisualAura(String name, String description, String effect, boolean interactable, String color, float opacity) {
        this.name = name;
        this.description = description;
        this.effect = effect;
        this.interactable = interactable;
        this.color = color;
        this.opacity = opacity;
    }
    
    public String getName() {
        return name;
    }
    
    public String getDescription() {
        return description;
    }
    
    public String getEffect() {
        return effect;
    }
    
    public boolean isInteractable() {
        return interactable;
    }
    
    public String getColor() {
        return color;
    }
    
    public float getOpacity() {
        return opacity;
    }
    
    public boolean isVisible() {
        return this != UNKNOWN_UNEXPLORED;
    }
    
    public boolean isReadOnly() {
        return this == GHOST_LAYER || this == EXPLORED_COLLAPSED;
    }
    
    public boolean isQuantumState() {
        return this == TIMELINE_SUPERPOSITION;
    }
    
    public boolean allowsPlanning() {
        return this == POTENTIALLY_REACHABLE;
    }
    
    public boolean isFullyOpaque() {
        return this == FULLY_REALIZED;
    }
    
    public boolean isTransparent() {
        return opacity < 1.0f;
    }
    
    public boolean requiresSpecialRendering() {
        return this == TIMELINE_SUPERPOSITION || this == GHOST_LAYER;
    }
    
    /**
     * Obtenir l'aura basée sur l'état de brouillard
     */
    public static VisualAura fromFogState(FogState fogState) {
        switch (fogState) {
            case UNEXPLORED:
                return UNKNOWN_UNEXPLORED;
            case COLLAPSED_PAST:
                return EXPLORED_COLLAPSED;
            case REACHABLE:
                return POTENTIALLY_REACHABLE;
            case VISION:
                return FULLY_REALIZED;
            case GHOST:
                return GHOST_LAYER;
            case SUPERPOSED:
                return TIMELINE_SUPERPOSITION;
            case ANCHORED:
                return FULLY_REALIZED; // Ancré = pleinement visible
            default:
                return UNKNOWN_UNEXPLORED;
        }
    }
    
    /**
     * Obtenir l'aura basée sur l'état de réalité
     */
    public static VisualAura fromRealityState(RealityState realityState) {
        switch (realityState) {
            case IMPOSSIBLE:
                return UNKNOWN_UNEXPLORED;
            case POTENTIAL:
                return POTENTIALLY_REACHABLE;
            case SUPERPOSED:
                return TIMELINE_SUPERPOSITION;
            case COLLAPSED:
                return FULLY_REALIZED;
            default:
                return UNKNOWN_UNEXPLORED;
        }
    }
    
    /**
     * Obtenir l'aura basée sur la zone de causalité
     */
    public static VisualAura fromCausalityZone(CausalityZone causalityZone) {
        switch (causalityZone) {
            case UNKNOWN:
                return UNKNOWN_UNEXPLORED;
            case VISION:
                return FULLY_REALIZED;
            case MOVEMENT:
                return POTENTIALLY_REACHABLE;
            case CAUSALITY:
                return POTENTIALLY_REACHABLE;
            case ANCHORED:
                return FULLY_REALIZED;
            case GHOST:
                return GHOST_LAYER;
            case ROLLBACK:
                return EXPLORED_COLLAPSED;
            default:
                return UNKNOWN_UNEXPLORED;
        }
    }
    
    /**
     * Combiner plusieurs auras (prendre la plus prioritaire)
     */
    public static VisualAura combine(VisualAura... auras) {
        VisualAura result = UNKNOWN_UNEXPLORED;
        int highestPriority = -1;
        
        for (VisualAura aura : auras) {
            if (aura != null) {
                int priority = aura.getDisplayPriority();
                if (priority > highestPriority) {
                    highestPriority = priority;
                    result = aura;
                }
            }
        }
        
        return result;
    }
    
    /**
     * Obtenir la priorité d'affichage
     */
    public int getDisplayPriority() {
        switch (this) {
            case FULLY_REALIZED: return 100;
            case TIMELINE_SUPERPOSITION: return 90;
            case GHOST_LAYER: return 80;
            case POTENTIALLY_REACHABLE: return 70;
            case EXPLORED_COLLAPSED: return 60;
            case UNKNOWN_UNEXPLORED: return 0;
            default: return 0;
        }
    }
    
    /**
     * Obtenir le nom de la classe CSS pour le rendu
     */
    public String getCssClass() {
        switch (this) {
            case FULLY_REALIZED: return "aura-fully-realized";
            case EXPLORED_COLLAPSED: return "aura-explored-collapsed";
            case POTENTIALLY_REACHABLE: return "aura-potentially-reachable";
            case UNKNOWN_UNEXPLORED: return "aura-unknown-unexplored";
            case GHOST_LAYER: return "aura-ghost-layer";
            case TIMELINE_SUPERPOSITION: return "aura-timeline-superposition";
            default: return "aura-unknown";
        }
    }
    
    /**
     * Obtenir les propriétés CSS pour le rendu
     */
    public String getCssProperties() {
        return String.format("color: %s; opacity: %.1f; filter: %s;", 
                           color, opacity, getCssFilter());
    }
    
    /**
     * Obtenir le filtre CSS pour les effets spéciaux
     */
    public String getCssFilter() {
        switch (this) {
            case EXPLORED_COLLAPSED: return "brightness(0.7) saturate(0.5)";
            case POTENTIALLY_REACHABLE: return "drop-shadow(0 0 5px #0066CC)";
            case GHOST_LAYER: return "grayscale(0.5) hue-rotate(240deg)";
            case TIMELINE_SUPERPOSITION: return "hue-rotate(30deg) drop-shadow(1px 1px 2px rgba(255,102,0,0.5))";
            default: return "none";
        }
    }
    
    @Override
    public String toString() {
        return String.format("VisualAura[%s: %s - %s]", name, effect, description);
    }
} 