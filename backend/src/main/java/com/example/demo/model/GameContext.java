package com.example.demo.model;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

/**
 * 🧪 WALTER VIETNAM CLASS - Contexte d'exécution des formules magiques
 * 
 * "Province de Quang Nam 1970 - Pour chaque mission, on avait besoin du contexte complet :
 * terrain, ennemis, alliés, météo, munitions... Pareil pour les formules magiques !"
 * - Walter, Stratège du Code de Combat
 */
public class GameContext {
    
    private String gameId;
    private String currentPlayerId;
    private Map<String, Object> gameState;
    private Map<String, Object> heroes;
    private Map<String, Object> players;
    private List<List<Map<String, Object>>> map;
    private Map<String, Object> metadata;
    
    // 🎖️ WALTER VIETNAM TRACKING
    private long contextCreationTime;
    private int formulaExecutionCount;
    private Map<String, Integer> errorCounts;
    
    public GameContext(String gameId) {
        this.gameId = gameId;
        this.gameState = new HashMap<>();
        this.heroes = new HashMap<>();
        this.players = new HashMap<>();
        this.metadata = new HashMap<>();
        this.errorCounts = new HashMap<>();
        this.contextCreationTime = System.currentTimeMillis();
        this.formulaExecutionCount = 0;
    }
    
    // 🔥 MÉTHODES D'ACCÈS AUX DONNÉES DE JEU
    
    public Map<String, Object> getHero(String heroId) {
        return (Map<String, Object>) heroes.get(heroId);
    }
    
    public void setHero(String heroId, Map<String, Object> hero) {
        heroes.put(heroId, hero);
    }
    
    public Map<String, Object> getPlayer(String playerId) {
        return (Map<String, Object>) players.get(playerId);
    }
    
    public void setPlayer(String playerId, Map<String, Object> player) {
        players.put(playerId, player);
    }
    
    public Position getPosition(String entityId) {
        Map<String, Object> entity = getHero(entityId);
        if (entity != null && entity.containsKey("position")) {
            Map<String, Object> pos = (Map<String, Object>) entity.get("position");
            return new Position((Integer) pos.get("x"), (Integer) pos.get("y"));
        }
        return null;
    }
    
    public List<Map<String, Object>> getHeroesInRadius(Position center, int radius) {
        // TODO: Implémenter la recherche géométrique
        return List.of();
    }
    
    // 🎖️ WALTER VIETNAM DIAGNOSTICS
    
    public void incrementFormulaExecution() {
        this.formulaExecutionCount++;
    }
    
    public void recordError(String errorType) {
        errorCounts.merge(errorType, 1, Integer::sum);
    }
    
    public boolean isWalterFlashbackRequired() {
        return errorCounts.values().stream().mapToInt(Integer::intValue).sum() >= 3;
    }
    
    public String getWalterDiagnostic() {
        long uptime = System.currentTimeMillis() - contextCreationTime;
        return String.format("🎖️ WALTER CONTEXT: Game=%s, Formulas=%d, Errors=%d, Uptime=%dms", 
                            gameId, formulaExecutionCount, 
                            errorCounts.values().stream().mapToInt(Integer::intValue).sum(), 
                            uptime);
    }
    
    // 🔮 GETTERS ET SETTERS STANDARD
    
    public String getGameId() {
        return gameId;
    }
    
    public String getCurrentPlayerId() {
        return currentPlayerId;
    }
    
    public void setCurrentPlayerId(String currentPlayerId) {
        this.currentPlayerId = currentPlayerId;
    }
    
    public Map<String, Object> getGameState() {
        return gameState;
    }
    
    public void setGameState(Map<String, Object> gameState) {
        this.gameState = gameState;
    }
    
    public List<List<Map<String, Object>>> getMap() {
        return map;
    }
    
    public void setMap(List<List<Map<String, Object>>> map) {
        this.map = map;
    }
    
    public Map<String, Object> getMetadata() {
        return metadata;
    }
    
    public void addMetadata(String key, Object value) {
        metadata.put(key, value);
    }
    
    // 🎖️ CLASSE INTERNE POSITION
    public static class Position {
        private int x, y;
        
        public Position(int x, int y) {
            this.x = x;
            this.y = y;
        }
        
        public int getX() { return x; }
        public int getY() { return y; }
        
        public double distanceTo(Position other) {
            return Math.sqrt(Math.pow(x - other.x, 2) + Math.pow(y - other.y, 2));
        }
        
        @Override
        public String toString() {
            return String.format("Position(%d, %d)", x, y);
        }
    }
} 