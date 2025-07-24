package com.example.demo.model;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Entity
@Table(name = "temporal_items")
public class TemporalItem {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "item_id", unique = true, nullable = false)
    private String itemId;
    
    @Column(name = "game_id", nullable = false)
    private String gameId;
    
    @Column(name = "owner_id") // null si sur le terrain
    private String ownerId;
    
    @Column(name = "position_x")
    private Integer positionX;
    
    @Column(name = "position_y") 
    private Integer positionY;
    
    // OBJECT REALM PROPERTIES
    @Column(name = "item_name", nullable = false)
    private String itemName;
    
    @Column(name = "item_type", nullable = false)
    private String itemType; // weapon, armor, artifact, consumable, relic
    
    @Column(name = "rarity", nullable = false)
    private String rarity; // common, rare, epic, legendary, mythic
    
    @Column(name = "power_level", nullable = false)
    private Integer powerLevel; // 1-100
    
    // TEMPORAL LOOP MECHANICS - THE DUDE STYLE
    @Column(name = "temporal_effect_type", nullable = false)
    private String temporalEffectType; // TIC_BASED, DAY_BASED, TURN_BASED, EVENT_BASED
    
    @Column(name = "effect_description", length = 1000)
    private String effectDescription;
    
    @Column(name = "effect_parameters", length = 2000)
    private String effectParameters; // JSON string with effect config
    
    // REFRESH MECHANICS
    @Column(name = "refresh_interval", nullable = false)
    private Integer refreshInterval; // Every X tics/days/turns
    
    @Column(name = "last_refresh_time", nullable = false)
    private LocalDateTime lastRefreshTime;
    
    @Column(name = "next_refresh_time", nullable = false)
    private LocalDateTime nextRefreshTime;
    
    @Column(name = "current_uses", nullable = false)
    private Integer currentUses;
    
    @Column(name = "max_uses", nullable = false)
    private Integer maxUses;
    
    // PERFORMANCE OPTIMIZATION - 3 PLAYERS MAX
    @Column(name = "is_active", nullable = false)
    private Boolean isActive;
    
    @Column(name = "performance_priority", nullable = false)
    private Integer performancePriority; // 1-10, higher = more important
    
    @Column(name = "last_calculation_time")
    private LocalDateTime lastCalculationTime;
    
    // INTELLIGENT CACHING
    @Column(name = "cached_effect_result", length = 1000)
    private String cachedEffectResult;
    
    @Column(name = "cache_valid_until")
    private LocalDateTime cacheValidUntil;
    
    // Constructors
    public TemporalItem() {
        this.isActive = true;
        this.currentUses = 0;
        this.maxUses = 1;
        this.performancePriority = 5;
        this.lastRefreshTime = LocalDateTime.now();
        this.nextRefreshTime = LocalDateTime.now().plusMinutes(1);
    }
    
    public TemporalItem(String itemId, String gameId, String itemName, String itemType, 
                       String temporalEffectType, Integer refreshInterval) {
        this();
        this.itemId = itemId;
        this.gameId = gameId;
        this.itemName = itemName;
        this.itemType = itemType;
        this.temporalEffectType = temporalEffectType;
        this.refreshInterval = refreshInterval;
        this.rarity = "common";
        this.powerLevel = 1;
    }
    
    // TEMPORAL MECHANICS METHODS
    public boolean needsRefresh() {
        return LocalDateTime.now().isAfter(nextRefreshTime);
    }
    
    public void performRefresh() {
        if (!needsRefresh()) return;
        
        this.currentUses = maxUses;
        this.lastRefreshTime = LocalDateTime.now();
        
        // Calculate next refresh based on type
        switch (temporalEffectType) {
            case "TIC_BASED":
                this.nextRefreshTime = lastRefreshTime.plusSeconds(refreshInterval);
                break;
            case "DAY_BASED":
                this.nextRefreshTime = lastRefreshTime.plusDays(refreshInterval);
                break;
            case "TURN_BASED":
                this.nextRefreshTime = lastRefreshTime.plusMinutes(refreshInterval * 5);
                break;
            default:
                this.nextRefreshTime = lastRefreshTime.plusMinutes(refreshInterval);
        }
        
        // Clear cache on refresh
        this.cachedEffectResult = null;
        this.cacheValidUntil = null;
        this.lastCalculationTime = LocalDateTime.now();
    }
    
    public boolean canUse() {
        return isActive && currentUses > 0;
    }
    
    public void use() {
        if (canUse()) {
            this.currentUses--;
            this.lastCalculationTime = LocalDateTime.now();
        }
    }
    
    // PERFORMANCE METHODS
    public boolean shouldCalculateEffect() {
        // Don't calculate if cached and cache still valid
        if (cachedEffectResult != null && cacheValidUntil != null && 
            LocalDateTime.now().isBefore(cacheValidUntil)) {
            return false;
        }
        
        // Calculate based on priority and server load
        return performancePriority >= 5 || needsRefresh();
    }
    
    public void cacheEffect(String result, int validForMinutes) {
        this.cachedEffectResult = result;
        this.cacheValidUntil = LocalDateTime.now().plusMinutes(validForMinutes);
    }
    
    // GETTERS AND SETTERS
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getItemId() { return itemId; }
    public void setItemId(String itemId) { this.itemId = itemId; }
    
    public String getGameId() { return gameId; }
    public void setGameId(String gameId) { this.gameId = gameId; }
    
    public String getOwnerId() { return ownerId; }
    public void setOwnerId(String ownerId) { this.ownerId = ownerId; }
    
    public Integer getPositionX() { return positionX; }
    public void setPositionX(Integer positionX) { this.positionX = positionX; }
    
    public Integer getPositionY() { return positionY; }
    public void setPositionY(Integer positionY) { this.positionY = positionY; }
    
    public String getItemName() { return itemName; }
    public void setItemName(String itemName) { this.itemName = itemName; }
    
    public String getItemType() { return itemType; }
    public void setItemType(String itemType) { this.itemType = itemType; }
    
    public String getRarity() { return rarity; }
    public void setRarity(String rarity) { this.rarity = rarity; }
    
    public Integer getPowerLevel() { return powerLevel; }
    public void setPowerLevel(Integer powerLevel) { this.powerLevel = powerLevel; }
    
    public String getTemporalEffectType() { return temporalEffectType; }
    public void setTemporalEffectType(String temporalEffectType) { this.temporalEffectType = temporalEffectType; }
    
    public String getEffectDescription() { return effectDescription; }
    public void setEffectDescription(String effectDescription) { this.effectDescription = effectDescription; }
    
    public String getEffectParameters() { return effectParameters; }
    public void setEffectParameters(String effectParameters) { this.effectParameters = effectParameters; }
    
    public Integer getRefreshInterval() { return refreshInterval; }
    public void setRefreshInterval(Integer refreshInterval) { this.refreshInterval = refreshInterval; }
    
    public LocalDateTime getLastRefreshTime() { return lastRefreshTime; }
    public void setLastRefreshTime(LocalDateTime lastRefreshTime) { this.lastRefreshTime = lastRefreshTime; }
    
    public LocalDateTime getNextRefreshTime() { return nextRefreshTime; }
    public void setNextRefreshTime(LocalDateTime nextRefreshTime) { this.nextRefreshTime = nextRefreshTime; }
    
    public Integer getCurrentUses() { return currentUses; }
    public void setCurrentUses(Integer currentUses) { this.currentUses = currentUses; }
    
    public Integer getMaxUses() { return maxUses; }
    public void setMaxUses(Integer maxUses) { this.maxUses = maxUses; }
    
    public Boolean getIsActive() { return isActive; }
    public void setIsActive(Boolean isActive) { this.isActive = isActive; }
    
    public Integer getPerformancePriority() { return performancePriority; }
    public void setPerformancePriority(Integer performancePriority) { this.performancePriority = performancePriority; }
    
    public LocalDateTime getLastCalculationTime() { return lastCalculationTime; }
    public void setLastCalculationTime(LocalDateTime lastCalculationTime) { this.lastCalculationTime = lastCalculationTime; }
    
    public String getCachedEffectResult() { return cachedEffectResult; }
    public void setCachedEffectResult(String cachedEffectResult) { this.cachedEffectResult = cachedEffectResult; }
    
    public LocalDateTime getCacheValidUntil() { return cacheValidUntil; }
    public void setCacheValidUntil(LocalDateTime cacheValidUntil) { this.cacheValidUntil = cacheValidUntil; }
    
    // HELPER METHODS FOR FRONTEND
    public Map<String, Object> toSimpleMap() {
        Map<String, Object> map = new HashMap<>();
        map.put("id", itemId);
        map.put("name", itemName);
        map.put("type", itemType);
        map.put("rarity", rarity);
        map.put("powerLevel", powerLevel);
        map.put("description", effectDescription);
        map.put("uses", currentUses + "/" + maxUses);
        map.put("refreshType", temporalEffectType);
        map.put("needsRefresh", needsRefresh());
        map.put("canUse", canUse());
        return map;
    }
} 