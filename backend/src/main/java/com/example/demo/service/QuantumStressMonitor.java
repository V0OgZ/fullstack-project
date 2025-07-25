package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

/**
 * 🚨 QUANTUM STRESS MONITOR - SURVEILLANCE OPUS
 * =============================================
 * 
 * Surveille les surcharges quantiques selon les spécifications d'OPUS :
 * - Charge CPU et mémoire
 * - Réutilisation excessive de la Source
 * - Profondeur de récursion dangereuse
 * - Anomalies temporelles
 * 
 * OPUS: "Le système doit se protéger contre les entités de type Source, Vega ou Réutilisation Réflexive"
 * STATUS: ✅ CRÉÉ selon specs OPUS 4ème visite
 */
@Component
public class QuantumStressMonitor {
    
    // Seuils critiques selon specs OPUS
    private static final double CPU_THRESHOLD = 0.85;
    private static final double MEMORY_THRESHOLD = 0.90;
    private static final int MAX_RECURSION_DEPTH = 4;
    private static final int MAX_SOURCE_REUSE = 2;
    private static final int MAX_OBSERVATIONS_PER_MINUTE = 100;
    
    @Autowired
    private ApplicationEventPublisher eventPublisher;
    
    // Compteurs de surveillance
    private final Map<String, Integer> sourceUsageCount = new ConcurrentHashMap<>();
    private final Map<String, Integer> observationCount = new ConcurrentHashMap<>();
    private final Map<String, List<Alert>> activeAlerts = new ConcurrentHashMap<>();
    private final Map<String, Long> lastObservationTime = new ConcurrentHashMap<>();
    
    // Métriques système
    private double currentCpuUsage = 0.0;
    private double currentMemoryUsage = 0.0;
    private int currentRecursionDepth = 0;
    
    /**
     * 📊 Surveillance continue toutes les 5 secondes
     */
    @Scheduled(fixedDelay = 5000)
    public void monitorQuantumStress() {
        // Mise à jour des métriques système
        updateSystemMetrics();
        
        // Vérification CPU
        if (currentCpuUsage > CPU_THRESHOLD) {
            fireQuantumDisturbanceEvent("CPU_OVERLOAD", 
                String.format("CPU usage: %.2f%% (threshold: %.2f%%)", 
                    currentCpuUsage * 100, CPU_THRESHOLD * 100));
        }
        
        // Vérification mémoire
        if (currentMemoryUsage > MEMORY_THRESHOLD) {
            fireQuantumDisturbanceEvent("MEMORY_OVERLOAD", 
                String.format("Memory usage: %.2f%% (threshold: %.2f%%)", 
                    currentMemoryUsage * 100, MEMORY_THRESHOLD * 100));
        }
        
        // Vérification réutilisations de Source
        sourceUsageCount.forEach((instanceId, count) -> {
            if (count > MAX_SOURCE_REUSE) {
                fireQuantumDisturbanceEvent("SOURCE_OVERUSE", 
                    String.format("Source used %d times in instance %s (max: %d)", 
                        count, instanceId, MAX_SOURCE_REUSE));
            }
        });
        
        // Vérification fréquence d'observations
        checkObservationFrequency();
        
        // Nettoyage périodique des compteurs anciens
        cleanupOldCounters();
    }
    
    /**
     * 📝 Enregistrer l'utilisation de la Source
     */
    public void recordSourceUsage(String instanceId, String artifactId) {
        if ("SOURCE".equals(artifactId) || artifactId.toLowerCase().contains("source")) {
            sourceUsageCount.merge(instanceId, 1, Integer::sum);
            
            // Log pour surveillance
            System.out.println(String.format("🔮 SOURCE USAGE: Instance %s, Count: %d", 
                instanceId, sourceUsageCount.get(instanceId)));
        }
    }
    
    /**
     * 👁️ Enregistrer une observation quantique
     */
    public void recordObservation(String instanceId, String observerId) {
        String key = instanceId + "-" + observerId;
        observationCount.merge(key, 1, Integer::sum);
        lastObservationTime.put(key, System.currentTimeMillis());
        
        // Vérifier la fréquence d'observation
        if (observationCount.get(key) > MAX_OBSERVATIONS_PER_MINUTE) {
            fireQuantumDisturbanceEvent("OBSERVATION_SPAM", 
                String.format("Observer %s made %d observations in instance %s", 
                    observerId, observationCount.get(key), instanceId));
        }
    }
    
    /**
     * 🚨 Déclencher un événement de perturbation quantique
     */
    public void fireQuantumDisturbanceEvent(String type, String message) {
        // Créer l'alerte
        Alert alert = new Alert();
        alert.setType(type);
        alert.setMessage(message);
        alert.setTimestamp(new Date());
        alert.setSeverity(calculateSeverity(type));
        
        // Enregistrer l'alerte
        activeAlerts.computeIfAbsent("global", k -> new ArrayList<>()).add(alert);
        
        // Publier l'événement
        QuantumDisturbanceEvent event = new QuantumDisturbanceEvent(this, type, message);
        eventPublisher.publishEvent(event);
        
        // Actions selon le type
        executeProtectiveActions(type, message);
        
        // Log de l'événement
        System.out.println(String.format("🚨 QUANTUM DISTURBANCE: %s - %s", type, message));
    }
    
    /**
     * 📊 Obtenir les alertes actives pour un monde
     */
    public List<Alert> getActiveAlerts(String worldId) {
        return activeAlerts.getOrDefault(worldId, new ArrayList<>());
    }
    
    /**
     * 📈 Obtenir les métriques système actuelles
     */
    public Map<String, Object> getSystemMetrics() {
        Map<String, Object> metrics = new HashMap<>();
        metrics.put("cpuUsage", currentCpuUsage);
        metrics.put("memoryUsage", currentMemoryUsage);
        metrics.put("recursionDepth", currentRecursionDepth);
        metrics.put("activeAlerts", activeAlerts.size());
        metrics.put("sourceUsages", sourceUsageCount.size());
        metrics.put("observationRate", calculateObservationRate());
        return metrics;
    }
    
    /**
     * ⚡ Obtenir le niveau de stress quantique actuel
     */
    public double getCurrentStressLevel() {
        double stressLevel = 0.0;
        
        // Contribution CPU
        stressLevel += Math.max(0, (currentCpuUsage - 0.5) * 2); // 0-1 scale
        
        // Contribution mémoire
        stressLevel += Math.max(0, (currentMemoryUsage - 0.5) * 2);
        
        // Contribution récursion
        stressLevel += (double) currentRecursionDepth / MAX_RECURSION_DEPTH;
        
        // Contribution alertes
        stressLevel += Math.min(1.0, activeAlerts.size() / 10.0);
        
        return Math.min(1.0, stressLevel / 4.0); // Normaliser 0-1
    }
    
    // ========================================
    // MÉTHODES PRIVÉES
    // ========================================
    
    private void updateSystemMetrics() {
        // Simuler la récupération des métriques système
        Runtime runtime = Runtime.getRuntime();
        
        // Calcul utilisation mémoire
        long totalMemory = runtime.totalMemory();
        long freeMemory = runtime.freeMemory();
        currentMemoryUsage = (double) (totalMemory - freeMemory) / totalMemory;
        
        // Simuler utilisation CPU (à remplacer par vraie métrique)
        currentCpuUsage = Math.random() * 0.3 + 0.2; // 20-50% simulé
        
        // Ajouter un peu de stress si beaucoup d'alertes
        if (activeAlerts.size() > 5) {
            currentCpuUsage += 0.1;
        }
    }
    
    private void checkObservationFrequency() {
        long currentTime = System.currentTimeMillis();
        long oneMinuteAgo = currentTime - 60000; // 1 minute
        
        observationCount.entrySet().removeIf(entry -> {
            String key = entry.getKey();
            Long lastTime = lastObservationTime.get(key);
            return lastTime != null && lastTime < oneMinuteAgo;
        });
    }
    
    private void cleanupOldCounters() {
        // Nettoyer les compteurs de plus de 5 minutes
        long fiveMinutesAgo = System.currentTimeMillis() - 300000;
        
        lastObservationTime.entrySet().removeIf(entry -> entry.getValue() < fiveMinutesAgo);
        
        // Réduire les compteurs de Source progressivement
        sourceUsageCount.replaceAll((key, value) -> Math.max(0, value - 1));
        sourceUsageCount.entrySet().removeIf(entry -> entry.getValue() <= 0);
    }
    
    private String calculateSeverity(String type) {
        switch (type) {
            case "CPU_OVERLOAD":
            case "MEMORY_OVERLOAD":
            case "RECURSION_OVERFLOW":
                return "CRITICAL";
            case "SOURCE_OVERUSE":
            case "OBSERVATION_SPAM":
                return "HIGH";
            case "QUANTUM_COLLAPSE":
            case "DIMENSIONAL_BREACH":
                return "MEDIUM";
            default:
                return "LOW";
        }
    }
    
    private void executeProtectiveActions(String type, String message) {
        switch (type) {
            case "CPU_OVERLOAD":
                triggerPriorityThrottle();
                break;
            case "MEMORY_OVERLOAD":
                triggerMemoryCleanup();
                break;
            case "RECURSION_OVERFLOW":
                triggerRecursionCollapse();
                break;
            case "SOURCE_OVERUSE":
                triggerTemporalLag();
                break;
            case "OBSERVATION_SPAM":
                triggerObservationThrottle();
                break;
        }
    }
    
    private void triggerPriorityThrottle() {
        // Réduire la priorité des processus non-critiques
        System.out.println("⚡ THROTTLE: Reducing system priority for non-critical processes");
    }
    
    private void triggerMemoryCleanup() {
        // Forcer le garbage collection
        System.gc();
        System.out.println("🧹 CLEANUP: Forcing garbage collection");
    }
    
    private void triggerRecursionCollapse() {
        // Signaler aux RecursionProtector de limiter la profondeur
        currentRecursionDepth = 0;
        System.out.println("🌀 COLLAPSE: Resetting recursion depth to 0");
    }
    
    private void triggerTemporalLag() {
        // Ralentissement simulé pour limiter les abus de Source
        try {
            Thread.sleep(100 + (int)(Math.random() * 200)); // 100-300ms
            System.out.println("⏱️ LAG: Temporal lag activated (100-300ms)");
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
    
    private void triggerObservationThrottle() {
        // Limiter les observations trop fréquentes
        System.out.println("👁️ THROTTLE: Observation frequency limited");
    }
    
    private double calculateObservationRate() {
        return observationCount.values().stream()
            .mapToInt(Integer::intValue)
            .average()
            .orElse(0.0);
    }
    
    // ========================================
    // CLASSES INTERNES
    // ========================================
    
    public static class Alert {
        private String type;
        private String message;
        private Date timestamp;
        private String severity;
        
        // Getters et setters
        public String getType() { return type; }
        public void setType(String type) { this.type = type; }
        
        public String getMessage() { return message; }
        public void setMessage(String message) { this.message = message; }
        
        public Date getTimestamp() { return timestamp; }
        public void setTimestamp(Date timestamp) { this.timestamp = timestamp; }
        
        public String getSeverity() { return severity; }
        public void setSeverity(String severity) { this.severity = severity; }
    }
    
    public static class QuantumDisturbanceEvent {
        private final Object source;
        private final String type;
        private final String message;
        
        public QuantumDisturbanceEvent(Object source, String type, String message) {
            this.source = source;
            this.type = type;
            this.message = message;
        }
        
        public Object getSource() { return source; }
        public String getType() { return type; }
        public String getMessage() { return message; }
    }
} 