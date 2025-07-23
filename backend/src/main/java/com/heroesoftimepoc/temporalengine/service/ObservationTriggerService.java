package com.heroesoftimepoc.temporalengine.service;

import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class ObservationTriggerService {
    
    private final Map<String, ObservationTrigger> triggers = new ConcurrentHashMap<>();
    
    public static class ObservationTrigger {
        private String id;
        private String condition;
        private String action;
        private boolean active;
        
        public ObservationTrigger(String id, String condition, String action) {
            this.id = id;
            this.condition = condition;
            this.action = action;
            this.active = true;
        }
        
        // Getters and setters
        public String getId() { return id; }
        public void setId(String id) { this.id = id; }
        
        public String getCondition() { return condition; }
        public void setCondition(String condition) { this.condition = condition; }
        
        public String getAction() { return action; }
        public void setAction(String action) { this.action = action; }
        
        public boolean isActive() { return active; }
        public void setActive(boolean active) { this.active = active; }
    }
    
    public void registerTrigger(String id, String condition, String action) {
        triggers.put(id, new ObservationTrigger(id, condition, action));
    }
    
    public void removeTrigger(String id) {
        triggers.remove(id);
    }
    
    public List<ObservationTrigger> getAllTriggers() {
        return new ArrayList<>(triggers.values());
    }
    
    public ObservationTrigger getTrigger(String id) {
        return triggers.get(id);
    }
    
    public void activateTrigger(String id) {
        ObservationTrigger trigger = triggers.get(id);
        if (trigger != null) {
            trigger.setActive(true);
        }
    }
    
    public void deactivateTrigger(String id) {
        ObservationTrigger trigger = triggers.get(id);
        if (trigger != null) {
            trigger.setActive(false);
        }
    }
    
    public int getTriggerCount() {
        return triggers.size();
    }
    
    public void clearAllTriggers() {
        triggers.clear();
    }
    
    public void registerObservationTrigger(Long gameId, String triggerDefinition) {
        String triggerId = "trigger_" + gameId + "_" + System.currentTimeMillis();
        registerTrigger(triggerId, triggerDefinition, "default_action");
    }
    
    public Map<String, Object> getObservationStatistics(Long gameId) {
        Map<String, Object> stats = new ConcurrentHashMap<>();
        stats.put("gameId", gameId);
        stats.put("totalTriggers", triggers.size());
        stats.put("activeTriggers", triggers.values().stream().mapToLong(t -> t.isActive() ? 1 : 0).sum());
        return stats;
    }
    
    public List<ObservationTrigger> getActiveTriggers(Long gameId) {
        return triggers.values().stream()
                .filter(ObservationTrigger::isActive)
                .collect(java.util.stream.Collectors.toList());
    }
    
    public List<String> checkTriggersAndGetCollapses(Object game) {
        // Vérification des triggers et retour des collapse nécessaires
        List<String> collapses = new ArrayList<>();
        // Logique de vérification des triggers
        return collapses;
    }
} 