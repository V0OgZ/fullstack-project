package com.heroesoftimeporal.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.LocalDateTime;
import java.util.Objects;

/**
 * 📝 TemporalEvent - Represents an event that occurred in a timeline
 * 
 * Events are logged chronologically and help track the history of each timeline.
 */
public class TemporalEvent {
    
    @JsonProperty("id")
    private String id;
    
    @JsonProperty("type")
    private EventType type;
    
    @JsonProperty("description")
    private String description;
    
    @JsonProperty("turn")
    private int turn;
    
    @JsonProperty("branch")
    private String branch;
    
    @JsonProperty("x")
    private int x;
    
    @JsonProperty("y")
    private int y;
    
    @JsonProperty("timestamp")
    private LocalDateTime timestamp;
    
    @JsonProperty("metadata")
    private String metadata;
    
    public enum EventType {
        PSI_CREATED,        // ψ-state created
        PSI_TRIGGERED,      // ψ-state triggered
        PSI_COLLAPSED,      // †ψ collapsed
        TURN_ADVANCED,      // Turn advanced
        TIMELINE_FORKED,    // Timeline forked
        TIMELINE_COLLAPSED, // Timeline collapsed
        CONFLICT_DETECTED,  // Conflict detected
        ARTIFACT_USED,      // Temporal artifact used
        HERO_MOVED,         // Hero moved
        CREATURE_CREATED,   // Creature created
        BATTLE_OCCURRED     // Battle occurred
    }
    
    // Constructors
    public TemporalEvent() {
        this.timestamp = LocalDateTime.now();
        this.id = generateId();
    }
    
    public TemporalEvent(EventType type, String description, int x, int y) {
        this();
        this.type = type;
        this.description = description;
        this.x = x;
        this.y = y;
    }
    
    public TemporalEvent(EventType type, String description, int x, int y, String metadata) {
        this(type, description, x, y);
        this.metadata = metadata;
    }
    
    // Generate a unique ID for the event
    private String generateId() {
        return "evt_" + System.currentTimeMillis() + "_" + 
               (int)(Math.random() * 1000);
    }
    
    // Check if this event affects a specific coordinate
    public boolean affectsCoordinate(int targetX, int targetY) {
        return this.x == targetX && this.y == targetY;
    }
    
    // Check if this event is a ψ-related event
    public boolean isPsiEvent() {
        return type == EventType.PSI_CREATED || 
               type == EventType.PSI_TRIGGERED || 
               type == EventType.PSI_COLLAPSED;
    }
    
    // Get a formatted string representation
    public String getFormattedDescription() {
        String prefix = switch (type) {
            case PSI_CREATED -> "ψ";
            case PSI_TRIGGERED -> "⚡";
            case PSI_COLLAPSED -> "†";
            case TURN_ADVANCED -> "⏰";
            case TIMELINE_FORKED -> "🔀";
            case TIMELINE_COLLAPSED -> "💥";
            case CONFLICT_DETECTED -> "⚔️";
            case ARTIFACT_USED -> "🔮";
            case HERO_MOVED -> "🏃";
            case CREATURE_CREATED -> "🐉";
            case BATTLE_OCCURRED -> "⚔️";
        };
        
        String location = (x >= 0 && y >= 0) ? String.format(" @%d,%d", x, y) : "";
        return String.format("%s %s%s", prefix, description, location);
    }
    
    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    
    public EventType getType() { return type; }
    public void setType(EventType type) { this.type = type; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public int getTurn() { return turn; }
    public void setTurn(int turn) { this.turn = turn; }
    
    public String getBranch() { return branch; }
    public void setBranch(String branch) { this.branch = branch; }
    
    public int getX() { return x; }
    public void setX(int x) { this.x = x; }
    
    public int getY() { return y; }
    public void setY(int y) { this.y = y; }
    
    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
    
    public String getMetadata() { return metadata; }
    public void setMetadata(String metadata) { this.metadata = metadata; }
    
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TemporalEvent that = (TemporalEvent) o;
        return Objects.equals(id, that.id);
    }
    
    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
    
    @Override
    public String toString() {
        return String.format("Event[%s] %s: %s (turn %d)", 
                           id, type, description, turn);
    }
}