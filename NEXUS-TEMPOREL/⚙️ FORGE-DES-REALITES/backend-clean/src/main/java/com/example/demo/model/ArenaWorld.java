package com.example.demo.model;

import java.util.*;

/**
 * ArenaWorld - Modèle pour le monde unique de l'arène
 * Monde persistant dédié aux combats rapides et spectaculaires
 */
public class ArenaWorld {
    
    private String id;
    private String name;
    private String type;
    private Map<String, Object> terrain;
    private List<Map<String, Object>> observers;
    private Map<String, Object> currentBattle;
    private Map<String, Object> settings;
    private boolean active;
    private long createdAt;
    private long lastUsed;
    
    public ArenaWorld() {
        this.id = "ARENA_WORLD";
        this.name = "Arène Interdimensionnelle";
        this.type = "POCKET_UNIVERSE_ARENA";
        this.terrain = createHexagonalTerrain();
        this.observers = createObservers();
        this.currentBattle = new HashMap<>();
        this.settings = createDefaultSettings();
        this.active = true;
        this.createdAt = System.currentTimeMillis();
        this.lastUsed = System.currentTimeMillis();
    }
    
    private Map<String, Object> createHexagonalTerrain() {
        Map<String, Object> terrain = new HashMap<>();
        terrain.put("type", "hexagonal");
        terrain.put("size", 7); // Grille 7x7 hexagonale
        terrain.put("center", Map.of("x", 3, "y", 3));
        terrain.put("specialTiles", new ArrayList<>());
        terrain.put("effects", new HashMap<>());
        return terrain;
    }
    
    private List<Map<String, Object>> createObservers() {
        List<Map<String, Object>> observers = new ArrayList<>();
        
        // Grut - L'Observateur Cosmique
        Map<String, Object> grut = new HashMap<>();
        grut.put("id", "GRUT");
        grut.put("name", "Grut");
        grut.put("role", "COSMIC_OBSERVER");
        grut.put("position", "TOP_CENTER");
        grut.put("active", true);
        grut.put("commentType", "MYSTICAL");
        observers.add(grut);
        
        // Le Juge de l'Arène
        Map<String, Object> judge = new HashMap<>();
        judge.put("id", "ARENA_JUDGE");
        judge.put("name", "Le Juge de l'Arène");
        judge.put("role", "ARENA_COMMENTATOR");
        judge.put("position", "COMMENTARY_BOX");
        judge.put("active", true);
        judge.put("commentType", "ENTHUSIASTIC");
        observers.add(judge);
        
        return observers;
    }
    
    private Map<String, Object> createDefaultSettings() {
        Map<String, Object> settings = new HashMap<>();
        settings.put("maxHeroesPerSide", 1);
        settings.put("startingLevel", 1);
        settings.put("timeLimit", 300); // 5 minutes
        settings.put("allowTemporalSpells", true);
        settings.put("autoResolveParadoxes", true);
        settings.put("commentaryEnabled", true);
        settings.put("spectatorMode", false);
        return settings;
    }
    
    public void updateLastUsed() {
        this.lastUsed = System.currentTimeMillis();
    }
    
    public boolean isInBattle() {
        return currentBattle != null && !currentBattle.isEmpty();
    }
    
    public void startBattle(Map<String, Object> battleConfig) {
        this.currentBattle = new HashMap<>(battleConfig);
        this.currentBattle.put("startTime", System.currentTimeMillis());
        this.currentBattle.put("status", "IN_PROGRESS");
        updateLastUsed();
    }
    
    public void endBattle() {
        if (currentBattle != null) {
            currentBattle.put("endTime", System.currentTimeMillis());
            currentBattle.put("status", "COMPLETED");
        }
        updateLastUsed();
    }
    
    public void resetArena() {
        this.currentBattle = new HashMap<>();
        this.terrain = createHexagonalTerrain();
        updateLastUsed();
    }
    
    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    
    public Map<String, Object> getTerrain() { return terrain; }
    public void setTerrain(Map<String, Object> terrain) { this.terrain = terrain; }
    
    public List<Map<String, Object>> getObservers() { return observers; }
    public void setObservers(List<Map<String, Object>> observers) { this.observers = observers; }
    
    public Map<String, Object> getCurrentBattle() { return currentBattle; }
    public void setCurrentBattle(Map<String, Object> currentBattle) { this.currentBattle = currentBattle; }
    
    public Map<String, Object> getSettings() { return settings; }
    public void setSettings(Map<String, Object> settings) { this.settings = settings; }
    
    public boolean isActive() { return active; }
    public void setActive(boolean active) { this.active = active; }
    
    public long getCreatedAt() { return createdAt; }
    public void setCreatedAt(long createdAt) { this.createdAt = createdAt; }
    
    public long getLastUsed() { return lastUsed; }
    public void setLastUsed(long lastUsed) { this.lastUsed = lastUsed; }
}