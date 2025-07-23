package com.heroesoftimepoc.temporalengine.model;

import java.util.Objects;

/**
 * Coordonnées temporelles dans le système temporel
 * Basé sur ASYNC_ENGINE_DESIGN.md
 */
public class TimeCoord {
    
    private Integer turn;
    private String timeline;
    private Long timestamp;
    
    public TimeCoord() {
        this.timestamp = System.currentTimeMillis();
    }
    
    public TimeCoord(Integer turn, String timeline) {
        this();
        this.turn = turn;
        this.timeline = timeline;
    }
    
    public TimeCoord(Integer turn, String timeline, Long timestamp) {
        this.turn = turn;
        this.timeline = timeline;
        this.timestamp = timestamp;
    }
    
    public boolean isBefore(TimeCoord other) {
        if (other == null) return false;
        if (!Objects.equals(this.timeline, other.timeline)) return false;
        return this.turn < other.turn;
    }
    
    public boolean isAfter(TimeCoord other) {
        if (other == null) return false;
        if (!Objects.equals(this.timeline, other.timeline)) return false;
        return this.turn > other.turn;
    }
    
    public boolean isSameTurn(TimeCoord other) {
        if (other == null) return false;
        return Objects.equals(this.turn, other.turn) && 
               Objects.equals(this.timeline, other.timeline);
    }
    
    public boolean isDifferentTimeline(TimeCoord other) {
        if (other == null) return true;
        return !Objects.equals(this.timeline, other.timeline);
    }
    
    public int turnDifference(TimeCoord other) {
        if (other == null || isDifferentTimeline(other)) return Integer.MAX_VALUE;
        return Math.abs(this.turn - other.turn);
    }
    
    public TimeCoord nextTurn() {
        return new TimeCoord(this.turn + 1, this.timeline, System.currentTimeMillis());
    }
    
    public TimeCoord previousTurn() {
        return new TimeCoord(Math.max(0, this.turn - 1), this.timeline, System.currentTimeMillis());
    }
    
    @Override
    public String toString() {
        return String.format("T%d:%s", turn, timeline);
    }
    
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof TimeCoord)) return false;
        TimeCoord timeCoord = (TimeCoord) o;
        return Objects.equals(turn, timeCoord.turn) && 
               Objects.equals(timeline, timeCoord.timeline);
    }
    
    @Override
    public int hashCode() {
        return Objects.hash(turn, timeline);
    }
    
    // Getters et Setters
    public Integer getTurn() { return turn; }
    public void setTurn(Integer turn) { this.turn = turn; }
    
    public String getTimeline() { return timeline; }
    public void setTimeline(String timeline) { this.timeline = timeline; }
    
    public Long getTimestamp() { return timestamp; }
    public void setTimestamp(Long timestamp) { this.timestamp = timestamp; }
} 