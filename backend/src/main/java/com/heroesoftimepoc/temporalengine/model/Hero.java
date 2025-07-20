package com.heroesoftimepoc.temporalengine.model;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

@Entity
@Table(name = "heroes")
public class Hero {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "name", nullable = false)
    private String name;
    
    @Column(name = "position_x")
    private Integer positionX;
    
    @Column(name = "position_y")
    private Integer positionY;
    
    @Column(name = "timeline_branch")
    private String timelineBranch = "ℬ1";
    
    @Column(name = "temporal_energy")
    private Integer temporalEnergy = 100;
    
    @Column(name = "max_temporal_energy")
    private Integer maxTemporalEnergy = 100;
    
    @ElementCollection
    @CollectionTable(name = "hero_inventory", joinColumns = @JoinColumn(name = "hero_id"))
    @Column(name = "item")
    private List<String> inventory = new ArrayList<>();
    
    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private HeroStatus status = HeroStatus.ACTIVE;
    
    @Column(name = "health")
    private Integer health = 100;
    
    @Column(name = "max_health")
    private Integer maxHealth = 100;
    
    @Column(name = "movement_points")
    private Integer movementPoints = 3;
    
    @Column(name = "max_movement_points")
    private Integer maxMovementPoints = 3;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "game_id")
    private Game game;
    
    @Column(name = "player_id")
    private String playerId;
    
    @Column(name = "vision_radius")
    private Integer visionRadius = 3; // Rayon de vision par défaut
    
    // ============================
    // SYSTÈME UTMD - UNIFIED TEMPORAL MOVEMENT DESIGN
    // ============================
    
    @Column(name = "current_day")
    private Integer currentDay = 0; // Jour actuel du héros
    
    @Column(name = "movement_points_per_day")
    private Integer movementPointsPerDay = 4; // Points de mouvement par jour
    
    @Column(name = "days_traveled")
    private Integer daysTraveled = 0; // Jours voyagés total
    
    @Column(name = "has_observation_ability")
    private Boolean hasObservationAbility = false; // Capacité d'observation quantique
    
    @Column(name = "observation_range")
    private Integer observationRange = 2; // Portée d'observation
    
    // Immunité temporelle (GROFI)
    @Column(name = "temporal_immunity")
    private boolean temporalImmunity = false;
    
    // Vision temporelle (objets magiques)
    @Column(name = "temporal_vision_range")
    private int temporalVisionRange = 0; // Jours dans le futur/passé visibles
    
    // 🌫️ Fog of causality
    @Column(name = "causality_awareness")
    private int causalityAwareness = 1; // Niveau de conscience causale
    
    public enum HeroStatus {
        ACTIVE,
        TEMPORAL_SHIFT,
        QUANTUM_SUPERPOSITION,
        COLLAPSED,
        DEAD,
        PARADOX_DEATH,  // Mort par paradoxe temporel (Forge Runique)
        SEALED         // Scellé éternellement (Treizième Codex)
    }
    
    // Constructors
    public Hero() {}
    
    public Hero(String name, int x, int y) {
        this.name = name;
        this.positionX = x;
        this.positionY = y;
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public Integer getPositionX() { return positionX; }
    public void setPositionX(Integer positionX) { this.positionX = positionX; }
    
    public Integer getPositionY() { return positionY; }
    public void setPositionY(Integer positionY) { this.positionY = positionY; }
    
    public String getTimelineBranch() { return timelineBranch; }
    public void setTimelineBranch(String timelineBranch) { this.timelineBranch = timelineBranch; }
    
    public Integer getTemporalEnergy() { return temporalEnergy; }
    public void setTemporalEnergy(Integer temporalEnergy) { this.temporalEnergy = temporalEnergy; }
    
    public Integer getMaxTemporalEnergy() { return maxTemporalEnergy; }
    public void setMaxTemporalEnergy(Integer maxTemporalEnergy) { this.maxTemporalEnergy = maxTemporalEnergy; }
    
    public List<String> getInventory() { return inventory; }
    public void setInventory(List<String> inventory) { this.inventory = inventory; }
    
    public HeroStatus getStatus() { return status; }
    public void setStatus(HeroStatus status) { this.status = status; }
    
    public Integer getHealth() { return health; }
    public void setHealth(Integer health) { this.health = health; }
    
    public Integer getMaxHealth() { return maxHealth; }
    public void setMaxHealth(Integer maxHealth) { this.maxHealth = maxHealth; }
    
    public Integer getMovementPoints() { return movementPoints; }
    public void setMovementPoints(Integer movementPoints) { this.movementPoints = movementPoints; }
    
    public Integer getMaxMovementPoints() { return maxMovementPoints; }
    public void setMaxMovementPoints(Integer maxMovementPoints) { this.maxMovementPoints = maxMovementPoints; }
    
    public Game getGame() { return game; }
    public void setGame(Game game) { this.game = game; }
    
    public String getPlayerId() { return playerId; }
    public void setPlayerId(String playerId) { this.playerId = playerId; }
    
    public Integer getVisionRadius() { return visionRadius; }
    public void setVisionRadius(Integer visionRadius) { this.visionRadius = visionRadius; }
    
    // Helper methods
    public void moveTo(int x, int y) {
        this.positionX = x;
        this.positionY = y;
    }
    
    public boolean isAt(int x, int y) {
        return positionX != null && positionY != null && 
               positionX.equals(x) && positionY.equals(y);
    }
    
    public void addItem(String item) {
        if (!inventory.contains(item)) {
            inventory.add(item);
        }
    }
    
    public boolean hasItem(String item) {
        return inventory.contains(item);
    }
    
    public boolean removeItem(String item) {
        return inventory.remove(item);
    }
    
    public boolean canMove() {
        return status == HeroStatus.ACTIVE && movementPoints > 0;
    }
    
    public void useMovementPoint() {
        if (movementPoints > 0) {
            movementPoints--;
        }
    }
    
    public void resetMovementPoints() {
        this.movementPoints = maxMovementPoints;
    }
    
    public boolean canUseTemporalAbility(int cost) {
        return temporalEnergy >= cost;
    }
    
    public void useTemporalEnergy(int cost) {
        if (temporalEnergy >= cost) {
            temporalEnergy -= cost;
        }
    }
    
    public void restoreTemporalEnergy(int amount) {
        temporalEnergy = Math.min(temporalEnergy + amount, maxTemporalEnergy);
    }
    
    public boolean isAlive() {
        return health > 0 && status != HeroStatus.DEAD;
    }
    
    public void takeDamage(int damage) {
        health = Math.max(0, health - damage);
        if (health == 0) {
            status = HeroStatus.DEAD;
        }
    }
    
    public void heal(int amount) {
        if (isAlive()) {
            health = Math.min(health + amount, maxHealth);
        }
    }
    
    // ============================
    // GETTERS/SETTERS UTMD
    // ============================
    
    public Integer getCurrentDay() { return currentDay; }
    public void setCurrentDay(Integer currentDay) { this.currentDay = currentDay; }
    
    public Integer getMovementPointsPerDay() { return movementPointsPerDay; }
    public void setMovementPointsPerDay(Integer movementPointsPerDay) { this.movementPointsPerDay = movementPointsPerDay; }
    
    public Integer getDaysTraveled() { return daysTraveled; }
    public void setDaysTraveled(Integer daysTraveled) { this.daysTraveled = daysTraveled; }
    
    public Boolean getHasObservationAbility() { return hasObservationAbility; }
    public void setHasObservationAbility(Boolean hasObservationAbility) { this.hasObservationAbility = hasObservationAbility; }
    
    public Integer getObservationRange() { return observationRange; }
    public void setObservationRange(Integer observationRange) { this.observationRange = observationRange; }
    
    // Getters/Setters pour les nouveaux champs temporels
    public boolean isTemporalImmunity() { return temporalImmunity; }
    public void setTemporalImmunity(boolean temporalImmunity) { this.temporalImmunity = temporalImmunity; }
    
    public int getTemporalVisionRange() { return temporalVisionRange; }
    public void setTemporalVisionRange(int temporalVisionRange) { this.temporalVisionRange = temporalVisionRange; }
    
    public int getCausalityAwareness() { return causalityAwareness; }
    public void setCausalityAwareness(int causalityAwareness) { this.causalityAwareness = causalityAwareness; }
    
    // ============================
    // TITRES ET ACHIEVEMENTS
    // ============================
    
    @ElementCollection
    @CollectionTable(name = "hero_titles", joinColumns = @JoinColumn(name = "hero_id"))
    @Column(name = "title")
    private List<String> titles = new ArrayList<>();
    
    @ElementCollection
    @CollectionTable(name = "hero_status_effects", joinColumns = @JoinColumn(name = "hero_id"))
    @MapKeyColumn(name = "effect_name")
    @Column(name = "duration")
    private Map<String, Integer> statusEffects = new HashMap<>();
    
    @ElementCollection
    @CollectionTable(name = "hero_abilities", joinColumns = @JoinColumn(name = "hero_id"))
    @Column(name = "ability")
    private List<String> abilities = new ArrayList<>();
    
    /**
     * Ajoute un titre/achievement au héros
     */
    public void addTitle(String title) {
        if (!titles.contains(title)) {
            titles.add(title);
        }
    }
    
    public List<String> getTitles() {
        return new ArrayList<>(titles);
    }
    
    // ============================
    // MÉTHODES UTILITAIRES UTMD
    // ============================
    
    /**
     * Avancer d'un jour dans le système UTMD
     */
    public void advanceDay() {
        currentDay++;
        daysTraveled++;
        // Restaurer les points de mouvement pour le nouveau jour
        this.movementPoints = movementPointsPerDay;
    }
    
    /**
     * Calculer le nombre de jours nécessaires pour parcourir une distance
     */
    public int calculateDaysToReach(int distance) {
        if (movementPointsPerDay <= 0) return distance; // Fallback
        return (int) Math.ceil((double) distance / movementPointsPerDay);
    }
    
    /**
     * Calculer le coût temporel pour un mouvement
     */
    public int calculateTemporalCost(int distance) {
        return calculateDaysToReach(distance);
    }
    
    /**
     * Vérifier si le héros peut atteindre une position en X jours
     */
    public boolean canReachInDays(int distance, int days) {
        return calculateDaysToReach(distance) <= days;
    }
    
    /**
     * Obtenir la portée maximale pour un nombre de jours donné
     */
    public int getMaxRangeForDays(int days) {
        return movementPointsPerDay * days;
    }
    
    /**
     * Activer la capacité d'observation quantique
     */
    public void enableObservationAbility(int range) {
        this.hasObservationAbility = true;
        this.observationRange = range;
    }
    
    /**
     * Désactiver la capacité d'observation quantique
     */
    public void disableObservationAbility() {
        this.hasObservationAbility = false;
        this.observationRange = 0;
    }
    
    /**
     * Vérifier si le héros peut observer une position
     */
    public boolean canObserve(int targetX, int targetY) {
        if (!hasObservationAbility) return false;
        
        int distance = Math.abs(positionX - targetX) + Math.abs(positionY - targetY);
        return distance <= observationRange;
    }
    
    /**
     * Ajouter un effet de statut temporaire
     */
    public void addStatusEffect(String effect, int duration) {
        if (statusEffects == null) {
            statusEffects = new HashMap<>();
        }
        statusEffects.put(effect, duration);
    }
    
    /**
     * Retirer tous les effets de statut
     */
    public void removeAllStatusEffects() {
        if (statusEffects != null) {
            statusEffects.clear();
        }
    }
    
    /**
     * Définir les capacités du héros
     */
    public void setAbilities(List<String> abilities) {
        this.abilities = new ArrayList<>(abilities);
    }
    
    /**
     * Obtenir les capacités du héros
     */
    public List<String> getAbilities() {
        if (abilities == null) {
            abilities = new ArrayList<>();
        }
        return new ArrayList<>(abilities);
    }

    @Override
    public String toString() {
        return String.format("Hero{name='%s', position=(%d,%d), timeline='%s', status=%s, day=%d}", 
                           name, positionX, positionY, timelineBranch, status, currentDay);
    }
}