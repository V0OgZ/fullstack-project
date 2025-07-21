package com.heroesoftimepoc.temporalengine.model;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "game_tiles")
public class GameTile {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "x", nullable = false)
    private Integer x;
    
    @Column(name = "y", nullable = false)
    private Integer y;
    
    @Column(name = "terrain")
    private String terrain = "grass";
    
    @ElementCollection
    @CollectionTable(name = "tile_occupants", joinColumns = @JoinColumn(name = "tile_id"))
    @Column(name = "occupant")
    private List<String> occupants = new ArrayList<>();
    
    @ElementCollection
    @CollectionTable(name = "tile_effects", joinColumns = @JoinColumn(name = "tile_id"))
    @Column(name = "effect")
    private List<String> effects = new ArrayList<>();
    
    @ElementCollection
    @CollectionTable(name = "tile_items", joinColumns = @JoinColumn(name = "tile_id"))
    @Column(name = "item")
    private List<String> items = new ArrayList<>();
    
    @Column(name = "has_psi_states")
    private Boolean hasPsiStates = false;
    
    @Column(name = "is_temporal_zone")
    private Boolean isTemporalZone = false;
    
    @Column(name = "temporal_zone_type")
    private String temporalZoneType; // TEMPORAL_STORM, CHRONOS_FIELD, etc.
    
    @Column(name = "building_type")
    private String buildingType; // CASTLE, TOWER, etc.
    
    @Column(name = "building_owner")
    private String buildingOwner;
    
    @Column(name = "movement_cost")
    private Integer movementCost = 1;
    
    @Column(name = "defense_bonus")
    private Integer defenseBonus = 0;
    
    @Column(name = "temporal_energy_bonus")
    private Integer temporalEnergyBonus = 0;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "game_id")
    private Game game;
    
    @Column(name = "is_locked")
    private Boolean isLocked = false; // For Anchor Tower effect
    
    @Column(name = "lock_duration")
    private Integer lockDuration = 0;
    
    // Constructors
    public GameTile() {}
    
    public GameTile(int x, int y, String terrain) {
        this.x = x;
        this.y = y;
        this.terrain = terrain;
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public Integer getX() { return x; }
    public void setX(Integer x) { this.x = x; }
    
    public Integer getY() { return y; }
    public void setY(Integer y) { this.y = y; }
    
    public String getTerrain() { return terrain; }
    public void setTerrain(String terrain) { this.terrain = terrain; }
    
    public List<String> getOccupants() { return occupants; }
    public void setOccupants(List<String> occupants) { this.occupants = occupants; }
    
    public Boolean getHasPsiStates() { return hasPsiStates; }
    public void setHasPsiStates(Boolean hasPsiStates) { this.hasPsiStates = hasPsiStates; }
    
    public Boolean getIsTemporalZone() { return isTemporalZone; }
    public void setIsTemporalZone(Boolean isTemporalZone) { this.isTemporalZone = isTemporalZone; }
    
    public String getTemporalZoneType() { return temporalZoneType; }
    public void setTemporalZoneType(String temporalZoneType) { this.temporalZoneType = temporalZoneType; }
    
    public String getBuildingType() { return buildingType; }
    public void setBuildingType(String buildingType) { this.buildingType = buildingType; }
    
    public String getBuildingOwner() { return buildingOwner; }
    public void setBuildingOwner(String buildingOwner) { this.buildingOwner = buildingOwner; }
    
    public Integer getMovementCost() { return movementCost; }
    public void setMovementCost(Integer movementCost) { this.movementCost = movementCost; }
    
    public Integer getDefenseBonus() { return defenseBonus; }
    public void setDefenseBonus(Integer defenseBonus) { this.defenseBonus = defenseBonus; }
    
    public Integer getTemporalEnergyBonus() { return temporalEnergyBonus; }
    public void setTemporalEnergyBonus(Integer temporalEnergyBonus) { this.temporalEnergyBonus = temporalEnergyBonus; }
    
    public Game getGame() { return game; }
    public void setGame(Game game) { this.game = game; }
    
    public Boolean getIsLocked() { return isLocked; }
    public void setIsLocked(Boolean isLocked) { this.isLocked = isLocked; }
    
    public Integer getLockDuration() { return lockDuration; }
    public void setLockDuration(Integer lockDuration) { this.lockDuration = lockDuration; }
    
    // Helper methods
    public void addOccupant(String occupant) {
        if (!occupants.contains(occupant)) {
            occupants.add(occupant);
        }
    }
    
    public void removeOccupant(String occupant) {
        occupants.remove(occupant);
    }
    
    public boolean hasOccupant(String occupant) {
        return occupants.contains(occupant);
    }
    
    public boolean isEmpty() {
        return occupants.isEmpty();
    }
    
    public boolean hasBuilding() {
        return buildingType != null && !buildingType.isEmpty();
    }
    
    public boolean isBuildingOwnedBy(String playerId) {
        return hasBuilding() && buildingOwner != null && buildingOwner.equals(playerId);
    }
    
    public void buildStructure(String type, String owner) {
        this.buildingType = type;
        this.buildingOwner = owner;
        
        // Set bonuses based on building type
        switch (type) {
            case "CASTLE":
                this.defenseBonus = 3;
                this.temporalEnergyBonus = 2;
                break;
            case "TOWER":
                this.defenseBonus = 2;
                break;
            case "ANCHOR_TOWER":
                this.defenseBonus = 1;
                this.isLocked = true;
                this.lockDuration = 5;
                break;
            default:
                this.defenseBonus = 1;
                break;
        }
    }
    
    public void removeBuilding() {
        this.buildingType = null;
        this.buildingOwner = null;
        this.defenseBonus = 0;
        this.temporalEnergyBonus = 0;
        this.isLocked = false;
        this.lockDuration = 0;
    }
    
    public void updatePsiStatePresence(boolean hasPsi) {
        this.hasPsiStates = hasPsi;
    }
    
    public void lockTile(int duration) {
        this.isLocked = true;
        this.lockDuration = duration;
    }
    
    public void unlockTile() {
        this.isLocked = false;
        this.lockDuration = 0;
    }
    
    public void decrementLockDuration() {
        if (lockDuration > 0) {
            lockDuration--;
            if (lockDuration == 0) {
                isLocked = false;
            }
        }
    }
    
    public boolean canAcceptPsiState() {
        return !isLocked;
    }
    
    public boolean isPassable() {
        return !terrain.equals("water") && !terrain.equals("mountain");
    }
    
    public int getTotalMovementCost() {
        int cost = movementCost;
        if (terrain.equals("forest")) cost += 1;
        if (terrain.equals("swamp")) cost += 2;
        return cost;
    }
    
    public void addEffect(String effect) {
        if (effects == null) {
            effects = new ArrayList<>();
        }
        if (!effects.contains(effect)) {
            effects.add(effect);
        }
    }
    
    public boolean removeEffect(String effect) {
        if (effects != null) {
            return effects.remove(effect);
        }
        return false;
    }
    
    public void removeAllEffects() {
        if (effects != null) {
            effects.clear();
        }
    }
    
    public void addItem(String item) {
        if (items == null) {
            items = new ArrayList<>();
        }
        items.add(item);
    }
    
    @Override
    public String toString() {
        return String.format("GameTile{pos=(%d,%d), terrain='%s', occupants=%d, building='%s', psi=%s}", 
                           x, y, terrain, occupants.size(), buildingType, hasPsiStates);
    }
    
    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        GameTile tile = (GameTile) obj;
        return x.equals(tile.x) && y.equals(tile.y);
    }
    
    @Override
    public int hashCode() {
        return x.hashCode() * 31 + y.hashCode();
    }
}