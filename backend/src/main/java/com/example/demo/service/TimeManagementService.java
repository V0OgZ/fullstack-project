package com.example.demo.service;

import com.example.demo.model.TimeConfiguration;
import com.example.demo.model.TimeConfiguration.ZoneType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Service
@Transactional
public class TimeManagementService {
    
    @Autowired
    private TimeConfigurationRepository timeConfigRepository;
    
    // Cache des configurations actives
    private final Map<String, TimeConfiguration> activeConfigs = new ConcurrentHashMap<>();
    
    // Ticks actuels par joueur par zone
    private final Map<String, Map<String, Integer>> playerTicks = new ConcurrentHashMap<>();
    
    /**
     * Créer une configuration temporelle pour une zone
     */
    public TimeConfiguration createTimeConfig(String zoneId, ZoneType zoneType) {
        TimeConfiguration config;
        
        switch (zoneType) {
            case COMBAT_POCKET:
                config = TimeConfiguration.createCombatZone(zoneId);
                break;
            case WORLD:
                config = TimeConfiguration.createWorldConfig(zoneId);
                break;
            default:
                config = new TimeConfiguration(zoneId, zoneType);
        }
        
        timeConfigRepository.save(config);
        activeConfigs.put(zoneId, config);
        return config;
    }
    
    /**
     * Définir le tick rate d'un joueur pour une zone
     */
    public void setPlayerTickRate(String zoneId, String playerId, Integer ticksPerDay) {
        TimeConfiguration config = activeConfigs.get(zoneId);
        if (config == null) {
            config = timeConfigRepository.findByZoneId(zoneId)
                .orElseThrow(() -> new RuntimeException("Zone not found: " + zoneId));
        }
        
        config.setPlayerTickRate(playerId, ticksPerDay);
        timeConfigRepository.save(config);
        
        // Initialiser les ticks du joueur
        playerTicks.computeIfAbsent(zoneId, k -> new ConcurrentHashMap<>())
                   .put(playerId, 0);
    }
    
    /**
     * Avancer le temps pour un joueur
     */
    public void advancePlayerTime(String zoneId, String playerId, int ticks) {
        Map<String, Integer> zoneTicks = playerTicks.get(zoneId);
        if (zoneTicks == null) return;
        
        Integer currentTicks = zoneTicks.getOrDefault(playerId, 0);
        zoneTicks.put(playerId, currentTicks + ticks);
        
        // Vérifier si sync nécessaire
        TimeConfiguration config = activeConfigs.get(zoneId);
        if (config != null && config.needsSync(zoneTicks)) {
            synchronizePlayers(zoneId);
        }
    }
    
    /**
     * Synchroniser tous les joueurs d'une zone
     */
    public void synchronizePlayers(String zoneId) {
        Map<String, Integer> zoneTicks = playerTicks.get(zoneId);
        if (zoneTicks == null || zoneTicks.size() < 2) return;
        
        // Calculer la moyenne
        double averageTicks = zoneTicks.values().stream()
            .mapToInt(Integer::intValue)
            .average()
            .orElse(0);
        
        // Synchroniser tous les joueurs
        int syncTick = (int) Math.round(averageTicks);
        zoneTicks.replaceAll((k, v) -> syncTick);
        
        // Déclencher event de sync
        publishSyncEvent(zoneId, syncTick);
    }
    
    /**
     * Obtenir le décalage temporel entre deux joueurs
     */
    public int getTemporalDelta(String zoneId, String player1, String player2) {
        Map<String, Integer> zoneTicks = playerTicks.get(zoneId);
        if (zoneTicks == null) return 0;
        
        Integer ticks1 = zoneTicks.getOrDefault(player1, 0);
        Integer ticks2 = zoneTicks.getOrDefault(player2, 0);
        
        return Math.abs(ticks1 - ticks2);
    }
    
    /**
     * Créer une divergence temporelle (pour effets spéciaux)
     */
    public void createTemporalDivergence(String zoneId, String playerId, int divergenceTicks) {
        TimeConfiguration config = activeConfigs.get(zoneId);
        if (config == null || !config.getTimelinePhasingEnabled()) return;
        
        // Créer une copie du joueur dans une timeline alternative
        String altPlayerId = playerId + "_alt";
        setPlayerTickRate(zoneId, altPlayerId, config.getTicksForPlayer(playerId) + divergenceTicks);
        
        // Publier event de divergence
        publishDivergenceEvent(zoneId, playerId, altPlayerId);
    }
    
    /**
     * Transition entre zone de combat et monde
     */
    public void transitionZone(String fromZoneId, String toZoneId, String playerId) {
        // Sauvegarder l'état temporel du joueur
        Map<String, Integer> fromTicks = playerTicks.get(fromZoneId);
        if (fromTicks != null) {
            Integer playerTickCount = fromTicks.get(playerId);
            
            // Transférer au nouveau zone avec conversion
            TimeConfiguration fromConfig = activeConfigs.get(fromZoneId);
            TimeConfiguration toConfig = activeConfigs.get(toZoneId);
            
            if (fromConfig != null && toConfig != null) {
                // Convertir les ticks selon le ratio
                double ratio = (double) toConfig.getBaseTickPerDay() / fromConfig.getBaseTickPerDay();
                int convertedTicks = (int) (playerTickCount * ratio);
                
                playerTicks.computeIfAbsent(toZoneId, k -> new ConcurrentHashMap<>())
                           .put(playerId, convertedTicks);
            }
        }
    }
    
    /**
     * Obtenir l'état temporel complet d'une zone
     */
    public Map<String, Object> getZoneTemporalState(String zoneId) {
        Map<String, Object> state = new HashMap<>();
        
        TimeConfiguration config = activeConfigs.get(zoneId);
        Map<String, Integer> zoneTicks = playerTicks.get(zoneId);
        
        state.put("config", config);
        state.put("playerTicks", zoneTicks);
        state.put("needsSync", config != null && zoneTicks != null && config.needsSync(zoneTicks));
        
        // Calculer les divergences visuelles
        if (zoneTicks != null && zoneTicks.size() > 1) {
            int maxDelta = calculateMaxDelta(zoneTicks);
            state.put("maxTemporalDelta", maxDelta);
            state.put("divergenceLevel", calculateDivergenceLevel(maxDelta));
        }
        
        return state;
    }
    
    private int calculateMaxDelta(Map<String, Integer> ticks) {
        if (ticks.size() < 2) return 0;
        
        int min = ticks.values().stream().min(Integer::compareTo).orElse(0);
        int max = ticks.values().stream().max(Integer::compareTo).orElse(0);
        
        return max - min;
    }
    
    private String calculateDivergenceLevel(int delta) {
        if (delta < 10) return "STABLE";
        if (delta < 50) return "MINOR";
        if (delta < 100) return "MODERATE";
        if (delta < 200) return "MAJOR";
        return "CRITICAL";
    }
    
    private void publishSyncEvent(String zoneId, int syncTick) {
        // Publier via WebSocket ou event bus
        // TODO: Implémenter avec WebSocket
    }
    
    private void publishDivergenceEvent(String zoneId, String playerId, String altPlayerId) {
        // Publier via WebSocket ou event bus
        // TODO: Implémenter avec WebSocket
    }
}