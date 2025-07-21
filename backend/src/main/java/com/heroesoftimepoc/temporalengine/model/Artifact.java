package com.heroesoftimepoc.temporalengine.model;

import javax.persistence.*;
import java.time.LocalDateTime;

/**
 * Artifact - Modèle pour les artefacts temporels
 * Représente les artefacts temporels révolutionnaires du jeu
 */
@Entity
@Table(name = "temporal_artifacts")
public class Artifact {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "artifact_id", unique = true, nullable = false)
    private String artifactId; // ART001, ART002, etc.
    
    @Column(name = "name", nullable = false)
    private String name;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false)
    private ArtifactType type;
    
    @Column(name = "position_x")
    private Integer positionX;
    
    @Column(name = "position_y")
    private Integer positionY;
    
    @Column(name = "owner_id")
    private String ownerId; // ID du héros ou joueur propriétaire
    
    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private ArtifactStatus status = ArtifactStatus.INACTIVE;
    
    @Column(name = "effect_radius")
    private Integer effectRadius = 3;
    
    @Column(name = "effect_duration")
    private Integer effectDuration = 5; // Durée en tours
    
    @Column(name = "remaining_duration")
    private Integer remainingDuration = 5;
    
    @Column(name = "effect_power")
    private Integer effectPower = 1; // Puissance de l'effet
    
    @Column(name = "temporal_energy_cost")
    private Integer temporalEnergyCost = 10;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "activated_at")
    private LocalDateTime activatedAt;
    
    @Column(name = "description", columnDefinition = "TEXT")
    private String description;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "game_id")
    private Game game;
    
    // Énumérations
    public enum ArtifactType {
        VEIL("Veil of Temporal Concealment"),
        ANCHOR_TOWER("Anchor Tower"),
        WIGNER_EYE("Wigner's Eye of Observation"),
        TEMPORAL_SWORD("Temporal Sword of Causality"),
        CHRONOS_SHIELD("Chronos Shield"),
        QUANTUM_MIRROR("Quantum Mirror"),
        TEMPORAL_COMPASS("Temporal Compass"),
        CAUSAL_DISRUPTOR("Causal Disruptor");
        
        private final String displayName;
        
        ArtifactType(String displayName) {
            this.displayName = displayName;
        }
        
        public String getDisplayName() {
            return displayName;
        }
    }
    
    public enum ArtifactStatus {
        INACTIVE,
        ACTIVE,
        EXHAUSTED,
        DESTROYED,
        CHARGING
    }
    
    // Constructeurs
    public Artifact() {
        this.createdAt = LocalDateTime.now();
    }
    
    public Artifact(String artifactId, String name, ArtifactType type) {
        this();
        this.artifactId = artifactId;
        this.name = name;
        this.type = type;
        this.description = generateDescription(type);
    }
    
    // Getters et Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getArtifactId() { return artifactId; }
    public void setArtifactId(String artifactId) { this.artifactId = artifactId; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public ArtifactType getType() { return type; }
    public void setType(ArtifactType type) { this.type = type; }
    
    public Integer getPositionX() { return positionX; }
    public void setPositionX(Integer positionX) { this.positionX = positionX; }
    
    public Integer getPositionY() { return positionY; }
    public void setPositionY(Integer positionY) { this.positionY = positionY; }
    
    public String getOwnerId() { return ownerId; }
    public void setOwnerId(String ownerId) { this.ownerId = ownerId; }
    
    public ArtifactStatus getStatus() { return status; }
    public void setStatus(ArtifactStatus status) { this.status = status; }
    
    public Integer getEffectRadius() { return effectRadius; }
    public void setEffectRadius(Integer effectRadius) { this.effectRadius = effectRadius; }
    
    public Integer getEffectDuration() { return effectDuration; }
    public void setEffectDuration(Integer effectDuration) { this.effectDuration = effectDuration; }
    
    public Integer getRemainingDuration() { return remainingDuration; }
    public void setRemainingDuration(Integer remainingDuration) { this.remainingDuration = remainingDuration; }
    
    public Integer getEffectPower() { return effectPower; }
    public void setEffectPower(Integer effectPower) { this.effectPower = effectPower; }
    
    public Integer getTemporalEnergyCost() { return temporalEnergyCost; }
    public void setTemporalEnergyCost(Integer temporalEnergyCost) { this.temporalEnergyCost = temporalEnergyCost; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getActivatedAt() { return activatedAt; }
    public void setActivatedAt(LocalDateTime activatedAt) { this.activatedAt = activatedAt; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public Game getGame() { return game; }
    public void setGame(Game game) { this.game = game; }
    
    // Méthodes utilitaires
    
    /**
     * Activer l'artefact
     */
    public boolean activate() {
        if (status == ArtifactStatus.INACTIVE) {
            status = ArtifactStatus.ACTIVE;
            activatedAt = LocalDateTime.now();
            remainingDuration = effectDuration;
            return true;
        }
        return false;
    }
    
    /**
     * Désactiver l'artefact
     */
    public void deactivate() {
        status = ArtifactStatus.INACTIVE;
        activatedAt = null;
        remainingDuration = effectDuration;
    }
    
    /**
     * Épuiser l'artefact
     */
    public void exhaust() {
        status = ArtifactStatus.EXHAUSTED;
        remainingDuration = 0;
    }
    
    /**
     * Détruire l'artefact
     */
    public void destroy() {
        status = ArtifactStatus.DESTROYED;
        remainingDuration = 0;
    }
    
    /**
     * Avancer d'un tour (décrémenter la durée)
     */
    public void processTurn() {
        if (status == ArtifactStatus.ACTIVE && remainingDuration > 0) {
            remainingDuration--;
            if (remainingDuration <= 0) {
                exhaust();
            }
        }
    }
    
    /**
     * Vérifier si l'artefact est actif
     */
    public boolean isActive() {
        return status == ArtifactStatus.ACTIVE && remainingDuration > 0;
    }
    
    /**
     * Vérifier si l'artefact peut être activé
     */
    public boolean canActivate() {
        return status == ArtifactStatus.INACTIVE || status == ArtifactStatus.CHARGING;
    }
    
    /**
     * Calculer la distance à une position
     */
    public int getDistanceTo(int x, int y) {
        if (positionX == null || positionY == null) return Integer.MAX_VALUE;
        return Math.abs(positionX - x) + Math.abs(positionY - y);
    }
    
    /**
     * Vérifier si une position est dans la portée de l'effet
     */
    public boolean isInEffectRange(int x, int y) {
        return getDistanceTo(x, y) <= effectRadius;
    }
    
    /**
     * Placer l'artefact à une position
     */
    public void placeAt(int x, int y) {
        this.positionX = x;
        this.positionY = y;
    }
    
    /**
     * Générer une description basée sur le type
     */
    private String generateDescription(ArtifactType type) {
        switch (type) {
            case VEIL:
                return "Permet au héros de se déplacer sans être détecté par les observations quantiques.";
            case ANCHOR_TOWER:
                return "Verrouille les tuiles environnantes, empêchant les états quantiques de s'y manifester.";
            case WIGNER_EYE:
                return "Révèle les états quantiques fantômes des adversaires dans un rayon étendu.";
            case TEMPORAL_SWORD:
                return "Permet de couper les liens causaux et de dissiper les états quantiques ennemis.";
            case CHRONOS_SHIELD:
                return "Protège contre les effets temporels négatifs et les paradoxes causaux.";
            case QUANTUM_MIRROR:
                return "Reflète les états quantiques, créant des copies miroir des actions ennemies.";
            case TEMPORAL_COMPASS:
                return "Indique les perturbations temporelles et les zones de forte activité quantique.";
            case CAUSAL_DISRUPTOR:
                return "Perturbe les chaînes causales, rendant les prédictions temporelles impossibles.";
            default:
                return "Un artefact temporel mystérieux aux pouvoirs inconnus.";
        }
    }
    
    /**
     * Obtenir l'effet spécial de l'artefact
     */
    public String getSpecialEffect() {
        switch (type) {
            case VEIL:
                return "GHOST_WALK";
            case ANCHOR_TOWER:
                return "TEMPORAL_LOCK";
            case WIGNER_EYE:
                return "QUANTUM_VISION";
            case TEMPORAL_SWORD:
                return "CAUSAL_CUT";
            case CHRONOS_SHIELD:
                return "TEMPORAL_PROTECTION";
            case QUANTUM_MIRROR:
                return "QUANTUM_REFLECTION";
            case TEMPORAL_COMPASS:
                return "TEMPORAL_DETECTION";
            case CAUSAL_DISRUPTOR:
                return "CAUSAL_DISRUPTION";
            default:
                return "UNKNOWN_EFFECT";
        }
    }
    
    @Override
    public String toString() {
        return String.format("Artifact{id='%s', name='%s', type=%s, status=%s, position=(%d,%d)}", 
                           artifactId, name, type, status, positionX, positionY);
    }
} 