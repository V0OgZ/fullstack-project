package com.example.demo.model;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Entity
@Table(name = "game_states")
public class GameState {
    
    @Id
    private String gameId;
    
    // Basic game info
    @Column(name = "current_turn", nullable = false)
    private Integer currentTurn;
    
    @Column(name = "current_player_id")
    private String currentPlayerId;
    
    @Column(name = "turn_start_time")
    private LocalDateTime turnStartTime;
    
    @Column(name = "turn_duration_minutes")
    private Integer turnDurationMinutes;
    
    @Column(name = "game_status")
    @Enumerated(EnumType.STRING)
    private GameStatus gameStatus;
    
    // CRITICAL GAME STATE ONLY (not UI state)
    @Column(name = "selected_heroes", columnDefinition = "TEXT")
    private String selectedHeroes; // JSON: {playerId: heroId} - CRITICAL for gameplay
    
    @Column(name = "hero_positions", columnDefinition = "TEXT")
    private String heroPositions; // JSON: {heroId: {x, y}} - CRITICAL for multiplayer sync
    
    @Column(name = "movement_ranges", columnDefinition = "TEXT")
    private String movementRanges; // JSON: {heroId: [positions]} - CRITICAL for validation
    
    @Column(name = "pending_actions", columnDefinition = "TEXT")
    private String pendingActions; // JSON: [actions] - CRITICAL for game logic
    
    @Column(name = "combat_results", columnDefinition = "TEXT")
    private String combatResults; // JSON: [results] - CRITICAL for game state
    
    // Temporal/ZFC state - CRITICAL for game mechanics
    @Column(name = "shadow_actions", columnDefinition = "TEXT")
    private String shadowActions; // JSON: [shadowActions]
    
    @Column(name = "visible_zfcs", columnDefinition = "TEXT")
    private String visibleZFCs; // JSON: [zfcs]
    
    @Column(name = "locked_zones", columnDefinition = "TEXT")
    private String lockedZones; // JSON: [zones]
    
    // Player resources and inventory - CRITICAL for gameplay
    @Column(name = "player_resources", columnDefinition = "TEXT")
    private String playerResources; // JSON: {playerId: {gold, wood, stone, etc.}}
    
    @Column(name = "player_inventories", columnDefinition = "TEXT")
    private String playerInventories; // JSON: {playerId: [itemIds]}
    
    @Column(name = "equipped_items", columnDefinition = "TEXT")
    private String equippedItems; // JSON: {playerId: {heroId: {slot: itemId}}}
    
    // Political state - CRITICAL for game logic
    @Column(name = "political_advisors", columnDefinition = "TEXT")
    private String politicalAdvisors; // JSON: [advisors]
    
    @Column(name = "current_political_event", columnDefinition = "TEXT")
    private String currentPoliticalEvent; // JSON: event
    
    @Column(name = "reputation", columnDefinition = "TEXT")
    private String reputation; // JSON: {international, domestic, military, etc.}
    
    @Column(name = "active_events", columnDefinition = "TEXT")
    private String activeEvents; // JSON: [events]
    
    // Timestamps
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
    
    @Column(name = "last_action_time")
    private LocalDateTime lastActionTime;
    
    // Constructors
    public GameState() {
        this.currentTurn = 1;
        this.gameStatus = GameStatus.WAITING;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
        this.selectedHeroes = "{}";
        this.heroPositions = "{}";
        this.movementRanges = "{}";
        this.pendingActions = "[]";
        this.combatResults = "[]";
        this.shadowActions = "[]";
        this.visibleZFCs = "[]";
        this.lockedZones = "[]";
        this.playerResources = "{}";
        this.playerInventories = "{}";
        this.equippedItems = "{}";
        this.politicalAdvisors = "[]";
        this.currentPoliticalEvent = "null";
        this.reputation = "{}";
        this.activeEvents = "[]";
    }
    
    public GameState(String gameId) {
        this();
        this.gameId = gameId;
    }
    
    // Getters and Setters
    public String getGameId() { return gameId; }
    public void setGameId(String gameId) { this.gameId = gameId; }
    
    public Integer getCurrentTurn() { return currentTurn; }
    public void setCurrentTurn(Integer currentTurn) { 
        this.currentTurn = currentTurn; 
        this.updatedAt = LocalDateTime.now();
    }
    
    public String getCurrentPlayerId() { return currentPlayerId; }
    public void setCurrentPlayerId(String currentPlayerId) { 
        this.currentPlayerId = currentPlayerId; 
        this.updatedAt = LocalDateTime.now();
    }
    
    public LocalDateTime getTurnStartTime() { return turnStartTime; }
    public void setTurnStartTime(LocalDateTime turnStartTime) { 
        this.turnStartTime = turnStartTime; 
        this.updatedAt = LocalDateTime.now();
    }
    
    public Integer getTurnDurationMinutes() { return turnDurationMinutes; }
    public void setTurnDurationMinutes(Integer turnDurationMinutes) { 
        this.turnDurationMinutes = turnDurationMinutes; 
        this.updatedAt = LocalDateTime.now();
    }
    
    public GameStatus getGameStatus() { return gameStatus; }
    public void setGameStatus(GameStatus gameStatus) { 
        this.gameStatus = gameStatus; 
        this.updatedAt = LocalDateTime.now();
    }
    
    // JSON field getters/setters
    public String getSelectedHeroes() { return selectedHeroes; }
    public void setSelectedHeroes(String selectedHeroes) { 
        this.selectedHeroes = selectedHeroes; 
        this.updatedAt = LocalDateTime.now();
    }
    
    public String getHeroPositions() { return heroPositions; }
    public void setHeroPositions(String heroPositions) { 
        this.heroPositions = heroPositions; 
        this.updatedAt = LocalDateTime.now();
    }
    
    public String getMovementRanges() { return movementRanges; }
    public void setMovementRanges(String movementRanges) { 
        this.movementRanges = movementRanges; 
        this.updatedAt = LocalDateTime.now();
    }
    
    public String getPendingActions() { return pendingActions; }
    public void setPendingActions(String pendingActions) { 
        this.pendingActions = pendingActions; 
        this.updatedAt = LocalDateTime.now();
    }
    
    public String getCombatResults() { return combatResults; }
    public void setCombatResults(String combatResults) { 
        this.combatResults = combatResults; 
        this.updatedAt = LocalDateTime.now();
    }
    
    public String getShadowActions() { return shadowActions; }
    public void setShadowActions(String shadowActions) { 
        this.shadowActions = shadowActions; 
        this.updatedAt = LocalDateTime.now();
    }
    
    public String getVisibleZFCs() { return visibleZFCs; }
    public void setVisibleZFCs(String visibleZFCs) { 
        this.visibleZFCs = visibleZFCs; 
        this.updatedAt = LocalDateTime.now();
    }
    
    public String getLockedZones() { return lockedZones; }
    public void setLockedZones(String lockedZones) { 
        this.lockedZones = lockedZones; 
        this.updatedAt = LocalDateTime.now();
    }
    
    public String getPlayerResources() { return playerResources; }
    public void setPlayerResources(String playerResources) { 
        this.playerResources = playerResources; 
        this.updatedAt = LocalDateTime.now();
    }
    
    public String getPlayerInventories() { return playerInventories; }
    public void setPlayerInventories(String playerInventories) { 
        this.playerInventories = playerInventories; 
        this.updatedAt = LocalDateTime.now();
    }
    
    public String getEquippedItems() { return equippedItems; }
    public void setEquippedItems(String equippedItems) { 
        this.equippedItems = equippedItems; 
        this.updatedAt = LocalDateTime.now();
    }
    
    public String getPoliticalAdvisors() { return politicalAdvisors; }
    public void setPoliticalAdvisors(String politicalAdvisors) { 
        this.politicalAdvisors = politicalAdvisors; 
        this.updatedAt = LocalDateTime.now();
    }
    
    public String getCurrentPoliticalEvent() { return currentPoliticalEvent; }
    public void setCurrentPoliticalEvent(String currentPoliticalEvent) { 
        this.currentPoliticalEvent = currentPoliticalEvent; 
        this.updatedAt = LocalDateTime.now();
    }
    
    public String getReputation() { return reputation; }
    public void setReputation(String reputation) { 
        this.reputation = reputation; 
        this.updatedAt = LocalDateTime.now();
    }
    
    public String getActiveEvents() { return activeEvents; }
    public void setActiveEvents(String activeEvents) { 
        this.activeEvents = activeEvents; 
        this.updatedAt = LocalDateTime.now();
    }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
    
    public LocalDateTime getLastActionTime() { return lastActionTime; }
    public void setLastActionTime(LocalDateTime lastActionTime) { 
        this.lastActionTime = lastActionTime; 
        this.updatedAt = LocalDateTime.now();
    }
    
    // Helper methods
    public void markUpdated() {
        this.updatedAt = LocalDateTime.now();
    }
    
    public void markAction() {
        this.lastActionTime = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
    
    public boolean isPlayerTurn(String playerId) {
        return playerId != null && playerId.equals(this.currentPlayerId);
    }
    
    public boolean isGameActive() {
        return this.gameStatus == GameStatus.ACTIVE;
    }
}

// Enum for game status
enum GameStatus {
    WAITING,
    ACTIVE,
    PAUSED,
    FINISHED,
    CANCELLED
} 