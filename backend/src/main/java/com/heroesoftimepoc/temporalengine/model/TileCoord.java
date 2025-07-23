package com.heroesoftimepoc.temporalengine.model;

import java.util.Objects;

/**
 * Coordonnées spatiales d'une tuile dans le système temporel
 * Basé sur ASYNC_ENGINE_DESIGN.md
 */
public class TileCoord {
    
    private Integer x;
    private Integer y;
    
    public TileCoord() {}
    
    public TileCoord(Integer x, Integer y) {
        this.x = x;
        this.y = y;
    }
    
    public double distanceTo(TileCoord other) {
        if (other == null) return Double.MAX_VALUE;
        return Math.sqrt(Math.pow(this.x - other.x, 2) + Math.pow(this.y - other.y, 2));
    }
    
    public boolean isAdjacent(TileCoord other) {
        if (other == null) return false;
        return Math.abs(this.x - other.x) <= 1 && Math.abs(this.y - other.y) <= 1;
    }
    
    public TileCoord offset(int dx, int dy) {
        return new TileCoord(this.x + dx, this.y + dy);
    }
    
    @Override
    public String toString() {
        return String.format("(%d,%d)", x, y);
    }
    
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof TileCoord)) return false;
        TileCoord tileCoord = (TileCoord) o;
        return Objects.equals(x, tileCoord.x) && Objects.equals(y, tileCoord.y);
    }
    
    @Override
    public int hashCode() {
        return Objects.hash(x, y);
    }
    
    // Getters et Setters
    public Integer getX() { return x; }
    public void setX(Integer x) { this.x = x; }
    
    public Integer getY() { return y; }
    public void setY(Integer y) { this.y = y; }
} 