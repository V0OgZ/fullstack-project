package com.heroesoftimepoc.temporalengine.model;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

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
    
    public enum HeroStatus {
        ACTIVE,
        TEMPORAL_SHIFT,
        QUANTUM_SUPERPOSITION,
        COLLAPSED,
        DEAD
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
    
    public void removeItem(String item) {
        inventory.remove(item);
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
    
    @Override
    public String toString() {
        return String.format("Hero{name='%s', position=(%d,%d), timeline='%s', status=%s}", 
                           name, positionX, positionY, timelineBranch, status);
    }
}