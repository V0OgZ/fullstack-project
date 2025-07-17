package com.heroesoftimeporal.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/**
 * 🦸 Hero - Represents a hero with 5D spacetime coordinates and temporal abilities
 * 
 * 5D Coordinates: (x, y, z, timeline, temporalLayer)
 * - x, y: Standard map coordinates
 * - z: Vertical dimension (ground=0, flying=1, underground=-1)
 * - timeline: Which timeline branch (ℬ1, ℬ2, etc.)
 * - temporalLayer: Temporal depth (past=-1, present=0, future=+1)
 */
public class Hero {
    
    @JsonProperty("id")
    private String id;
    
    @JsonProperty("name")
    private String name;
    
    @JsonProperty("playerId")
    private String playerId;
    
    // 5D Spacetime Coordinates
    @JsonProperty("x")
    private int x;
    
    @JsonProperty("y")
    private int y;
    
    @JsonProperty("z")
    private int z;  // Vertical dimension
    
    @JsonProperty("timeline")
    private String timeline;  // ℬ1, ℬ2, etc.
    
    @JsonProperty("temporalLayer")
    private int temporalLayer;  // -1=past, 0=present, +1=future
    
    // Hero Stats
    @JsonProperty("level")
    private int level;
    
    @JsonProperty("power")
    private double power;  // 0.0 to 1.0
    
    @JsonProperty("health")
    private int health;
    
    @JsonProperty("maxHealth")
    private int maxHealth;
    
    @JsonProperty("mana")
    private int mana;
    
    @JsonProperty("maxMana")
    private int maxMana;
    
    // Temporal Abilities
    @JsonProperty("temporalEnergy")
    private int temporalEnergy;  // For ψ-state creation
    
    @JsonProperty("maxTemporalEnergy")
    private int maxTemporalEnergy;
    
    @JsonProperty("timelineAffinity")
    private double timelineAffinity;  // Bonus for timeline operations
    
    // Movement and Actions
    @JsonProperty("movementPoints")
    private int movementPoints;
    
    @JsonProperty("maxMovementPoints")
    private int maxMovementPoints;
    
    @JsonProperty("actionsRemaining")
    private int actionsRemaining;
    
    // Artifacts
    @JsonProperty("artifacts")
    private List<String> artifacts = new ArrayList<>();
    
    // Status
    @JsonProperty("status")
    private HeroStatus status;
    
    @JsonProperty("createdAt")
    private LocalDateTime createdAt;
    
    @JsonProperty("lastAction")
    private LocalDateTime lastAction;
    
    public enum HeroStatus {
        ACTIVE,
        INACTIVE,
        TEMPORAL_SHIFT,  // Moving between timelines
        QUANTUM_SUPERPOSITION,  // Exists in multiple states
        EFFACED  // Removed from timeline
    }
    
    // Constructors
    public Hero() {
        this.createdAt = LocalDateTime.now();
        this.status = HeroStatus.ACTIVE;
        this.temporalLayer = 0;  // Start in present
        this.z = 0;  // Start on ground level
        this.timeline = "ℬ1";  // Start in primary timeline
        this.artifacts = new ArrayList<>();
    }
    
    public Hero(String id, String name, String playerId, int x, int y) {
        this();
        this.id = id;
        this.name = name;
        this.playerId = playerId;
        this.x = x;
        this.y = y;
        this.level = 1;
        this.power = 0.5;
        this.health = 100;
        this.maxHealth = 100;
        this.mana = 50;
        this.maxMana = 50;
        this.temporalEnergy = 10;
        this.maxTemporalEnergy = 10;
        this.timelineAffinity = 0.1;
        this.movementPoints = 3;
        this.maxMovementPoints = 3;
        this.actionsRemaining = 2;
    }
    
    // 5D Position Methods
    public String get5DPosition() {
        return String.format("(%d,%d,%d,%s,%d)", x, y, z, timeline, temporalLayer);
    }
    
    public boolean isInSameTimeline(Hero other) {
        return this.timeline.equals(other.timeline) && 
               this.temporalLayer == other.temporalLayer;
    }
    
    public double getDistanceTo(Hero other) {
        if (!isInSameTimeline(other)) {
            return Double.MAX_VALUE;  // Infinite distance across timelines
        }
        
        double dx = this.x - other.x;
        double dy = this.y - other.y;
        double dz = this.z - other.z;
        
        return Math.sqrt(dx*dx + dy*dy + dz*dz);
    }
    
    // Temporal Methods
    public boolean canCreatePsiState() {
        return temporalEnergy >= 1 && status == HeroStatus.ACTIVE;
    }
    
    public void consumeTemporalEnergy(int amount) {
        this.temporalEnergy = Math.max(0, this.temporalEnergy - amount);
    }
    
    public void restoreTemporalEnergy(int amount) {
        this.temporalEnergy = Math.min(maxTemporalEnergy, this.temporalEnergy + amount);
    }
    
    public boolean canMove() {
        return movementPoints > 0 && status == HeroStatus.ACTIVE;
    }
    
    public boolean canAct() {
        return actionsRemaining > 0 && status == HeroStatus.ACTIVE;
    }
    
    // Artifact Methods
    public void addArtifact(String artifactId) {
        if (!artifacts.contains(artifactId)) {
            artifacts.add(artifactId);
        }
    }
    
    public void removeArtifact(String artifactId) {
        artifacts.remove(artifactId);
    }
    
    public boolean hasArtifact(String artifactId) {
        return artifacts.contains(artifactId);
    }
    
    // Turn Management
    public void startTurn() {
        this.movementPoints = maxMovementPoints;
        this.actionsRemaining = 2;
        this.restoreTemporalEnergy(2);  // Restore 2 temporal energy per turn
        this.lastAction = LocalDateTime.now();
    }
    
    public void endTurn() {
        this.movementPoints = 0;
        this.actionsRemaining = 0;
    }
    
    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getPlayerId() { return playerId; }
    public void setPlayerId(String playerId) { this.playerId = playerId; }
    
    public int getX() { return x; }
    public void setX(int x) { this.x = x; }
    
    public int getY() { return y; }
    public void setY(int y) { this.y = y; }
    
    public int getZ() { return z; }
    public void setZ(int z) { this.z = z; }
    
    public String getTimeline() { return timeline; }
    public void setTimeline(String timeline) { this.timeline = timeline; }
    
    public int getTemporalLayer() { return temporalLayer; }
    public void setTemporalLayer(int temporalLayer) { this.temporalLayer = temporalLayer; }
    
    public int getLevel() { return level; }
    public void setLevel(int level) { this.level = level; }
    
    public double getPower() { return power; }
    public void setPower(double power) { this.power = power; }
    
    public int getHealth() { return health; }
    public void setHealth(int health) { this.health = health; }
    
    public int getMaxHealth() { return maxHealth; }
    public void setMaxHealth(int maxHealth) { this.maxHealth = maxHealth; }
    
    public int getMana() { return mana; }
    public void setMana(int mana) { this.mana = mana; }
    
    public int getMaxMana() { return maxMana; }
    public void setMaxMana(int maxMana) { this.maxMana = maxMana; }
    
    public int getTemporalEnergy() { return temporalEnergy; }
    public void setTemporalEnergy(int temporalEnergy) { this.temporalEnergy = temporalEnergy; }
    
    public int getMaxTemporalEnergy() { return maxTemporalEnergy; }
    public void setMaxTemporalEnergy(int maxTemporalEnergy) { this.maxTemporalEnergy = maxTemporalEnergy; }
    
    public double getTimelineAffinity() { return timelineAffinity; }
    public void setTimelineAffinity(double timelineAffinity) { this.timelineAffinity = timelineAffinity; }
    
    public int getMovementPoints() { return movementPoints; }
    public void setMovementPoints(int movementPoints) { this.movementPoints = movementPoints; }
    
    public int getMaxMovementPoints() { return maxMovementPoints; }
    public void setMaxMovementPoints(int maxMovementPoints) { this.maxMovementPoints = maxMovementPoints; }
    
    public int getActionsRemaining() { return actionsRemaining; }
    public void setActionsRemaining(int actionsRemaining) { this.actionsRemaining = actionsRemaining; }
    
    public List<String> getArtifacts() { return artifacts; }
    public void setArtifacts(List<String> artifacts) { this.artifacts = artifacts; }
    
    public HeroStatus getStatus() { return status; }
    public void setStatus(HeroStatus status) { this.status = status; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getLastAction() { return lastAction; }
    public void setLastAction(LocalDateTime lastAction) { this.lastAction = lastAction; }
    
    @Override
    public String toString() {
        return String.format("Hero{id='%s', name='%s', position=%s, power=%.2f, status=%s}", 
                           id, name, get5DPosition(), power, status);
    }
    
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Hero hero = (Hero) o;
        return Objects.equals(id, hero.id);
    }
    
    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}