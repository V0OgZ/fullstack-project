package com.heroesoftimepoc.temporalengine.service;

import org.springframework.stereotype.Service;
import java.util.concurrent.ConcurrentHashMap;
import java.util.Map;

@Service
public class TemporalCacheService {
    
    private final Map<String, Object> cache = new ConcurrentHashMap<>();
    private long hitCount = 0;
    private long missCount = 0;
    
    public void put(String key, Object value) {
        cache.put(key, value);
    }
    
    public Object get(String key) {
        Object value = cache.get(key);
        if (value != null) {
            hitCount++;
        } else {
            missCount++;
        }
        return value;
    }
    
    public boolean containsKey(String key) {
        return cache.containsKey(key);
    }
    
    public void remove(String key) {
        cache.remove(key);
    }
    
    public void clear() {
        cache.clear();
    }
    
    public int size() {
        return cache.size();
    }
    
    public double getHitRate() {
        long total = hitCount + missCount;
        return total > 0 ? (double) hitCount / total : 0.0;
    }
    
    public long getHitCount() {
        return hitCount;
    }
    
    public long getMissCount() {
        return missCount;
    }
    
    public Map<String, Object> getCacheStatistics() {
        Map<String, Object> stats = new ConcurrentHashMap<>();
        stats.put("size", size());
        stats.put("hitCount", hitCount);
        stats.put("missCount", missCount);
        stats.put("hitRate", getHitRate());
        return stats;
    }
    
    public void invalidateGameCache(Long gameId) {
        String key = "game_" + gameId;
        remove(key);
    }
    
    public void preloadGameCache(Object game) {
        // Méthode pour précharger le cache avec un jeu
        if (game != null) {
            // Logique de préchargement
            put("preloaded_game", game);
        }
    }
    
    public Object getCachedGameState(Long gameId) {
        String key = "game_state_" + gameId;
        return get(key);
    }
    
    public void cleanExpiredEntries() {
        // Nettoyage des entrées expirées
        // Pour l'instant, on garde tout car on n'a pas de système d'expiration
    }
} 