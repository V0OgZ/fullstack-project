package com.example.demo.service;

import org.springframework.stereotype.Service;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.List;
import java.util.ArrayList;

/**
 * 🛡️ RECURSION PROTECTOR - PROTECTION CONTRE STACK OVERFLOW
 * =========================================================
 * 
 * Service pour limiter la récursion à 4 niveaux maximum et prévenir
 * les surcharges système dans les calculs quantiques et temporels.
 * 
 * OPUS SPECS: "Recursivity (𝕽) - Dimension critique avec limite 4 niveaux"
 * ARCHITECTURE: Monitoring + Protection + Logs détaillés
 * STATUS: ✅ CRÉÉ - Protection active contre débordements
 */
@Service
public class RecursionProtector {
    
    private static final int MAX_RECURSION_DEPTH = 4;
    private static final int MAX_CONCURRENT_RECURSIONS = 10;
    
    // Tracking des récursions par thread
    private final ThreadLocal<AtomicInteger> recursionDepth = ThreadLocal.withInitial(() -> new AtomicInteger(0));
    
    // Monitoring global
    private final ConcurrentHashMap<String, RecursionInfo> activeRecursions = new ConcurrentHashMap<>();
    private final AtomicInteger totalRecursions = new AtomicInteger(0);
    private final AtomicInteger blockedRecursions = new AtomicInteger(0);
    
    /**
     * 🔒 ENTER RECURSION - Entrée protégée dans une récursion
     */
    public RecursionResult enterRecursion(String operationId, String context) {
        String threadId = Thread.currentThread().getName();
        int currentDepth = recursionDepth.get().get();
        
        // Vérification limite de profondeur
        if (currentDepth >= MAX_RECURSION_DEPTH) {
            blockedRecursions.incrementAndGet();
            return new RecursionResult(false, 
                String.format("🚫 RECURSION BLOCKED: Depth %d exceeds limit %d for operation '%s'", 
                    currentDepth, MAX_RECURSION_DEPTH, operationId),
                currentDepth, MAX_RECURSION_DEPTH);
        }
        
        // Vérification limite concurrente
        if (activeRecursions.size() >= MAX_CONCURRENT_RECURSIONS) {
            blockedRecursions.incrementAndGet();
            return new RecursionResult(false,
                String.format("🚫 RECURSION BLOCKED: Too many concurrent recursions (%d)", activeRecursions.size()),
                currentDepth, MAX_RECURSION_DEPTH);
        }
        
        // Autorisation d'entrée
        int newDepth = recursionDepth.get().incrementAndGet();
        totalRecursions.incrementAndGet();
        
        RecursionInfo info = new RecursionInfo(operationId, context, threadId, newDepth, LocalDateTime.now());
        activeRecursions.put(threadId + "_" + operationId, info);
        
        return new RecursionResult(true,
            String.format("✅ RECURSION ALLOWED: Depth %d/%d for operation '%s'", 
                newDepth, MAX_RECURSION_DEPTH, operationId),
            newDepth, MAX_RECURSION_DEPTH);
    }
    
    /**
     * 🔓 EXIT RECURSION - Sortie de récursion
     */
    public void exitRecursion(String operationId) {
        String threadId = Thread.currentThread().getName();
        String key = threadId + "_" + operationId;
        
        recursionDepth.get().decrementAndGet();
        activeRecursions.remove(key);
    }
    
    /**
     * 📊 GET RECURSION STATUS - État actuel des récursions
     */
    public Map<String, Object> getRecursionStatus() {
        return Map.of(
            "maxDepth", MAX_RECURSION_DEPTH,
            "currentDepth", recursionDepth.get().get(),
            "activeRecursions", activeRecursions.size(),
            "totalRecursions", totalRecursions.get(),
            "blockedRecursions", blockedRecursions.get(),
            "activeOperations", new ArrayList<>(activeRecursions.values())
        );
    }
    
    /**
     * 🔄 RESET RECURSION - Reset pour thread actuel
     */
    public void resetCurrentThread() {
        recursionDepth.get().set(0);
        String threadId = Thread.currentThread().getName();
        activeRecursions.entrySet().removeIf(entry -> entry.getKey().startsWith(threadId));
    }
    
    /**
     * 🧹 CLEANUP OLD RECURSIONS - Nettoyage des récursions anciennes
     */
    public void cleanupOldRecursions() {
        LocalDateTime cutoff = LocalDateTime.now().minusMinutes(5);
        activeRecursions.entrySet().removeIf(entry -> entry.getValue().startTime.isBefore(cutoff));
    }
    
    /**
     * 📈 GET RECURSION METRICS - Métriques détaillées
     */
    public Map<String, Object> getMetrics() {
        return Map.of(
            "configuration", Map.of(
                "maxDepth", MAX_RECURSION_DEPTH,
                "maxConcurrent", MAX_CONCURRENT_RECURSIONS
            ),
            "current", Map.of(
                "activeCount", activeRecursions.size(),
                "currentDepth", recursionDepth.get().get()
            ),
            "statistics", Map.of(
                "totalRecursions", totalRecursions.get(),
                "blockedRecursions", blockedRecursions.get(),
                "successRate", totalRecursions.get() > 0 ? 
                    (double)(totalRecursions.get() - blockedRecursions.get()) / totalRecursions.get() * 100 : 100.0
            )
        );
    }
    
    // Classes internes
    public static class RecursionResult {
        public final boolean allowed;
        public final String message;
        public final int currentDepth;
        public final int maxDepth;
        
        public RecursionResult(boolean allowed, String message, int currentDepth, int maxDepth) {
            this.allowed = allowed;
            this.message = message;
            this.currentDepth = currentDepth;
            this.maxDepth = maxDepth;
        }
    }
    
    public static class RecursionInfo {
        public final String operationId;
        public final String context;
        public final String threadId;
        public final int depth;
        public final LocalDateTime startTime;
        
        public RecursionInfo(String operationId, String context, String threadId, int depth, LocalDateTime startTime) {
            this.operationId = operationId;
            this.context = context;
            this.threadId = threadId;
            this.depth = depth;
            this.startTime = startTime;
        }
    }
} 