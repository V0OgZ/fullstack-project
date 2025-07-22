package com.heroesoftimepoc.temporalengine.service;

import org.springframework.stereotype.Service;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

/**
 * Service de métriques de performance pour identifier les goulots d'étranglement
 */
@Service
public class PerformanceMetricsService {
    
    private final Map<String, AtomicLong> counters = new ConcurrentHashMap<>();
    private final Map<String, AtomicLong> timers = new ConcurrentHashMap<>();
    private final Map<String, List<Long>> operationTimes = new ConcurrentHashMap<>();
    
    /**
     * Démarrer une mesure de temps
     */
    public long startTimer(String operation) {
        long start = System.nanoTime();
        return start;
    }
    
    /**
     * Arrêter une mesure de temps
     */
    public void stopTimer(String operation, long startTime) {
        long duration = System.nanoTime() - startTime;
        timers.computeIfAbsent(operation, k -> new AtomicLong(0)).addAndGet(duration);
        operationTimes.computeIfAbsent(operation, k -> new ArrayList<>()).add(duration);
        counters.computeIfAbsent(operation + "_count", k -> new AtomicLong(0)).incrementAndGet();
    }
    
    /**
     * Incrémenter un compteur
     */
    public void incrementCounter(String counter) {
        counters.computeIfAbsent(counter, k -> new AtomicLong(0)).incrementAndGet();
    }
    
    /**
     * Mesurer une opération avec lambda
     */
    public <T> T measureOperation(String operation, java.util.function.Supplier<T> supplier) {
        long start = startTimer(operation);
        try {
            return supplier.get();
        } finally {
            stopTimer(operation, start);
        }
    }
    
    /**
     * Obtenir les métriques complètes
     */
    public Map<String, Object> getMetrics() {
        Map<String, Object> metrics = new HashMap<>();
        
        // Métriques temporelles
        Map<String, Object> timing = new HashMap<>();
        for (Map.Entry<String, AtomicLong> entry : timers.entrySet()) {
            String operation = entry.getKey();
            long totalNanos = entry.getValue().get();
            long count = counters.getOrDefault(operation + "_count", new AtomicLong(0)).get();
            
            Map<String, Object> opMetrics = new HashMap<>();
            opMetrics.put("totalTimeMs", totalNanos / 1_000_000.0);
            opMetrics.put("count", count);
            opMetrics.put("averageTimeMs", count > 0 ? (totalNanos / count) / 1_000_000.0 : 0);
            opMetrics.put("operationsPerSecond", count > 0 ? (count * 1_000_000_000.0) / totalNanos : 0);
            
            // Calcul percentiles
            List<Long> times = operationTimes.get(operation);
            if (times != null && !times.isEmpty()) {
                List<Long> sorted = new ArrayList<>(times);
                sorted.sort(Long::compareTo);
                
                opMetrics.put("minTimeMs", sorted.get(0) / 1_000_000.0);
                opMetrics.put("maxTimeMs", sorted.get(sorted.size() - 1) / 1_000_000.0);
                opMetrics.put("p50TimeMs", sorted.get(sorted.size() / 2) / 1_000_000.0);
                opMetrics.put("p95TimeMs", sorted.get((int) (sorted.size() * 0.95)) / 1_000_000.0);
                opMetrics.put("p99TimeMs", sorted.get((int) (sorted.size() * 0.99)) / 1_000_000.0);
            }
            
            timing.put(operation, opMetrics);
        }
        metrics.put("timing", timing);
        
        // Compteurs simples
        Map<String, Object> counts = new HashMap<>();
        for (Map.Entry<String, AtomicLong> entry : counters.entrySet()) {
            if (!entry.getKey().endsWith("_count")) {
                counts.put(entry.getKey(), entry.getValue().get());
            }
        }
        metrics.put("counters", counts);
        
        // Métriques système
        Runtime runtime = Runtime.getRuntime();
        Map<String, Object> system = new HashMap<>();
        system.put("totalMemoryMB", runtime.totalMemory() / (1024 * 1024));
        system.put("freeMemoryMB", runtime.freeMemory() / (1024 * 1024));
        system.put("usedMemoryMB", (runtime.totalMemory() - runtime.freeMemory()) / (1024 * 1024));
        system.put("availableProcessors", runtime.availableProcessors());
        metrics.put("system", system);
        
        return metrics;
    }
    
    /**
     * Obtenir les métriques rapides (performance critique)
     */
    public Map<String, Object> getQuickMetrics() {
        Map<String, Object> quick = new HashMap<>();
        
        // Top 5 opérations les plus lentes
        List<Map.Entry<String, AtomicLong>> slowest = timers.entrySet().stream()
            .sorted((a, b) -> Long.compare(b.getValue().get(), a.getValue().get()))
            .limit(5)
            .collect(java.util.stream.Collectors.toList());
        
        Map<String, Object> topSlow = new HashMap<>();
        for (Map.Entry<String, AtomicLong> entry : slowest) {
            String op = entry.getKey();
            long count = counters.getOrDefault(op + "_count", new AtomicLong(0)).get();
            if (count > 0) {
                topSlow.put(op, Map.of(
                    "avgMs", (entry.getValue().get() / count) / 1_000_000.0,
                    "totalMs", entry.getValue().get() / 1_000_000.0,
                    "count", count
                ));
            }
        }
        quick.put("slowestOperations", topSlow);
        
        // Métriques système essentielles
        Runtime runtime = Runtime.getRuntime();
        quick.put("memoryUsedMB", (runtime.totalMemory() - runtime.freeMemory()) / (1024 * 1024));
        quick.put("cpuCount", runtime.availableProcessors());
        
        return quick;
    }
    
    /**
     * Réinitialiser les métriques
     */
    public void resetMetrics() {
        counters.clear();
        timers.clear();
        operationTimes.clear();
    }
    
    // ============================
    // MÉTHODES AJOUTÉES POUR METRICCONTROLLER
    // ============================
    
    /**
     * Obtenir la valeur d'un compteur
     */
    public long getCounter(String counterName) {
        AtomicLong counter = counters.get(counterName);
        return counter != null ? counter.get() : 0L;
    }
    
    /**
     * Obtenir les statistiques d'une opération
     */
    public Map<String, Object> getOperationStats(String operation) {
        Map<String, Object> stats = new HashMap<>();
        
        // Temps total
        AtomicLong totalTime = timers.get(operation);
        long totalTimeNs = totalTime != null ? totalTime.get() : 0L;
        
        // Nombre d'appels
        AtomicLong count = counters.get(operation + "_count");
        long callCount = count != null ? count.get() : 0L;
        
        // Calculs
        double totalTimeMs = totalTimeNs / 1_000_000.0;
        double averageTimeMs = callCount > 0 ? totalTimeMs / callCount : 0.0;
        
        stats.put("totalTimeMs", totalTimeMs);
        stats.put("averageTimeMs", averageTimeMs);
        stats.put("count", callCount);
        
        // Temps récents
        List<Long> times = operationTimes.get(operation);
        if (times != null && !times.isEmpty()) {
            stats.put("lastExecutionMs", times.get(times.size() - 1) / 1_000_000.0);
            
            // Calculer les percentiles
            List<Long> sortedTimes = new ArrayList<>(times);
            Collections.sort(sortedTimes);
            
            int size = sortedTimes.size();
            if (size > 0) {
                stats.put("minTimeMs", sortedTimes.get(0) / 1_000_000.0);
                stats.put("maxTimeMs", sortedTimes.get(size - 1) / 1_000_000.0);
                stats.put("medianTimeMs", sortedTimes.get(size / 2) / 1_000_000.0);
            }
        }
        
        return stats;
    }
    
    /**
     * Réinitialiser les compteurs
     */
    public void resetCounters() {
        counters.clear();
    }
    
    /**
     * Réinitialiser les timers
     */
    public void resetTimers() {
        timers.clear();
        operationTimes.clear();
    }
    
    /**
     * Obtenir tous les compteurs
     */
    public Map<String, Long> getAllCounters() {
        Map<String, Long> result = new HashMap<>();
        for (Map.Entry<String, AtomicLong> entry : counters.entrySet()) {
            result.put(entry.getKey(), entry.getValue().get());
        }
        return result;
    }
    
    /**
     * Obtenir tous les timers
     */
    public Map<String, Long> getAllTimers() {
        Map<String, Long> result = new HashMap<>();
        for (Map.Entry<String, AtomicLong> entry : timers.entrySet()) {
            result.put(entry.getKey(), entry.getValue().get());
        }
        return result;
    }
    
    /**
     * Vérifier si un compteur existe
     */
    public boolean hasCounter(String counterName) {
        return counters.containsKey(counterName);
    }
    
    /**
     * Vérifier si un timer existe
     */
    public boolean hasTimer(String timerName) {
        return timers.containsKey(timerName);
    }
    
    /**
     * Obtenir le nombre d'opérations suivies
     */
    public int getTrackedOperationCount() {
        return operationTimes.size();
    }
    
    /**
     * Obtenir le nombre total d'appels
     */
    public long getTotalCallCount() {
        return counters.values().stream()
            .filter(counter -> counter != null)
            .mapToLong(AtomicLong::get)
            .sum();
    }

    /**
     * Obtenir un résumé des performances
     */
    public String getPerformanceSummary() {
        Map<String, Object> metrics = getMetrics();
        StringBuilder summary = new StringBuilder();
        
        summary.append("🚀 MÉTRIQUES DE PERFORMANCE\n");
        summary.append("==========================\n");
        
        @SuppressWarnings("unchecked")
        Map<String, Object> timing = (Map<String, Object>) metrics.get("timing");
        if (timing != null && !timing.isEmpty()) {
            summary.append("⏱️ OPÉRATIONS PRINCIPALES:\n");
            timing.entrySet().stream()
                .sorted((a, b) -> {
                    @SuppressWarnings("unchecked")
                    Map<String, Object> aMetrics = (Map<String, Object>) a.getValue();
                    @SuppressWarnings("unchecked")
                    Map<String, Object> bMetrics = (Map<String, Object>) b.getValue();
                    return Double.compare(
                        (Double) bMetrics.get("totalTimeMs"),
                        (Double) aMetrics.get("totalTimeMs")
                    );
                })
                .limit(10)
                .forEach(entry -> {
                    @SuppressWarnings("unchecked")
                    Map<String, Object> opMetrics = (Map<String, Object>) entry.getValue();
                    summary.append(String.format(
                        "  %s: %.2f ms/op, %.0f ops/sec, %d calls\n",
                        entry.getKey(),
                        (Double) opMetrics.get("averageTimeMs"),
                        (Double) opMetrics.get("operationsPerSecond"),
                        ((Number) opMetrics.get("count")).longValue()
                    ));
                });
        }
        
        @SuppressWarnings("unchecked")
        Map<String, Object> system = (Map<String, Object>) metrics.get("system");
        if (system != null) {
            summary.append(String.format(
                "💾 MÉMOIRE: %d MB utilisés / %d MB total\n",
                ((Number) system.get("usedMemoryMB")).longValue(),
                ((Number) system.get("totalMemoryMB")).longValue()
            ));
            summary.append(String.format(
                "🔧 CPU: %d processeurs disponibles\n",
                ((Number) system.get("availableProcessors")).intValue()
            ));
        }
        
        return summary.toString();
    }
} 