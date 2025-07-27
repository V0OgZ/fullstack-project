package com.example.demo.service;

import org.springframework.stereotype.Service;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.List;
import java.util.ArrayList;
import java.util.Set;

/**
 * 🛡️ RECURSION PROTECTOR - PROTECTION CONTRE STACK OVERFLOW
 * =========================================================
 * 
 * Service pour limiter la récursion à 4 niveaux maximum et prévenir
 * les surcharges système dans les calculs quantiques et temporels.
 * 
 * OPUS SPECS: "Recursivity (𝕽) - Dimension critique avec limite 4 niveaux"
 * WALTER CONSTANTE: Mondes Inception autorisent exception à règle 4 récursions
 * ARCHITECTURE: Monitoring + Protection + Logs détaillés + Exception Inception
 * STATUS: ✅ CRÉÉ - Protection active avec exceptions Walter
 */
@Service
public class RecursionProtector {
    
    private static final int MAX_RECURSION_DEPTH = 4;
    private static final int MAX_CONCURRENT_RECURSIONS = 10;
    
    // 🌀 WALTER CONSTANTE - MONDES INCEPTION EXCEPTION
    private static final int INCEPTION_MAX_RECURSION_DEPTH = 8; // Double pour mondes inception
    private static final Set<String> INCEPTION_WORLDS = Set.of(
        "monde_sublime_temporel",
        "temporal_rift", 
        "dimension_m",
        "panopticon_6d",
        "interstice_ultra_instinct",
        "bernard_anti_ford_realm",
        "grofi_partition_realm"
    );
    
    // Tracking des récursions par thread
    private final ThreadLocal<AtomicInteger> recursionDepth = ThreadLocal.withInitial(() -> new AtomicInteger(0));
    
    // Monitoring global
    private final ConcurrentHashMap<String, RecursionInfo> activeRecursions = new ConcurrentHashMap<>();
    private final AtomicInteger totalRecursions = new AtomicInteger(0);
    private final AtomicInteger blockedRecursions = new AtomicInteger(0);
    private final AtomicInteger inceptionExceptions = new AtomicInteger(0);
    
    /**
     * 🔒 ENTER RECURSION - Entrée protégée dans une récursion
     * 🌀 WALTER UPGRADE: Gère exceptions mondes inception
     */
    public RecursionResult enterRecursion(String operationId, String context) {
        return enterRecursion(operationId, context, null);
    }
    
    /**
     * 🔒 ENTER RECURSION WITH WORLD - Entrée avec vérification monde inception
     */
    public RecursionResult enterRecursion(String operationId, String context, String worldId) {
        String threadId = Thread.currentThread().getName();
        int currentDepth = recursionDepth.get().get();
        
        // 🌀 WALTER CONSTANTE - Vérification monde inception
        boolean isInceptionWorld = worldId != null && INCEPTION_WORLDS.contains(worldId);
        int maxDepth = isInceptionWorld ? INCEPTION_MAX_RECURSION_DEPTH : MAX_RECURSION_DEPTH;
        
        // Vérification limite de profondeur (avec exception inception)
        if (currentDepth >= maxDepth) {
            blockedRecursions.incrementAndGet();
            String blockMessage = isInceptionWorld ? 
                String.format("🚫 INCEPTION RECURSION BLOCKED: Depth %d exceeds inception limit %d for world '%s'", 
                    currentDepth, maxDepth, worldId) :
                String.format("🚫 RECURSION BLOCKED: Depth %d exceeds limit %d for operation '%s'", 
                    currentDepth, maxDepth, operationId);
            
            return new RecursionResult(false, blockMessage, currentDepth, maxDepth, isInceptionWorld);
        }
        
        // Vérification limite concurrente
        if (activeRecursions.size() >= MAX_CONCURRENT_RECURSIONS) {
            blockedRecursions.incrementAndGet();
            return new RecursionResult(false,
                String.format("🚫 RECURSION BLOCKED: Too many concurrent recursions (%d)", activeRecursions.size()),
                currentDepth, maxDepth, isInceptionWorld);
        }
        
        // Autorisation d'entrée
        int newDepth = recursionDepth.get().incrementAndGet();
        totalRecursions.incrementAndGet();
        
        if (isInceptionWorld) {
            inceptionExceptions.incrementAndGet();
        }
        
        RecursionInfo info = new RecursionInfo(operationId, context, threadId, newDepth, LocalDateTime.now(), worldId, isInceptionWorld);
        activeRecursions.put(threadId + "_" + operationId, info);
        
        String successMessage = isInceptionWorld ?
            String.format("🌀 INCEPTION RECURSION ALLOWED: Depth %d/%d for world '%s' operation '%s'", 
                newDepth, maxDepth, worldId, operationId) :
            String.format("✅ RECURSION ALLOWED: Depth %d/%d for operation '%s'", 
                newDepth, maxDepth, operationId);
        
        return new RecursionResult(true, successMessage, newDepth, maxDepth, isInceptionWorld);
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
            "inceptionMaxDepth", INCEPTION_MAX_RECURSION_DEPTH,
            "currentDepth", recursionDepth.get().get(),
            "activeRecursions", activeRecursions.size(),
            "totalRecursions", totalRecursions.get(),
            "blockedRecursions", blockedRecursions.get(),
            "inceptionExceptions", inceptionExceptions.get(),
            "inceptionWorlds", INCEPTION_WORLDS,
            "activeOperations", new ArrayList<>(activeRecursions.values())
        );
    }
    
    /**
     * 🌀 IS INCEPTION WORLD - Vérification si monde inception
     */
    public boolean isInceptionWorld(String worldId) {
        return worldId != null && INCEPTION_WORLDS.contains(worldId);
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
     * 📈 GET RECURSION METRICS - Métriques détaillées avec Walter stats
     */
    public Map<String, Object> getMetrics() {
        return Map.of(
            "configuration", Map.of(
                "maxDepth", MAX_RECURSION_DEPTH,
                "inceptionMaxDepth", INCEPTION_MAX_RECURSION_DEPTH,
                "maxConcurrent", MAX_CONCURRENT_RECURSIONS,
                "inceptionWorlds", INCEPTION_WORLDS
            ),
            "current", Map.of(
                "activeCount", activeRecursions.size(),
                "currentDepth", recursionDepth.get().get()
            ),
            "statistics", Map.of(
                "totalRecursions", totalRecursions.get(),
                "blockedRecursions", blockedRecursions.get(),
                "inceptionExceptions", inceptionExceptions.get(),
                "successRate", totalRecursions.get() > 0 ? 
                    (double)(totalRecursions.get() - blockedRecursions.get()) / totalRecursions.get() * 100 : 100.0,
                "inceptionRate", totalRecursions.get() > 0 ?
                    (double)inceptionExceptions.get() / totalRecursions.get() * 100 : 0.0
            )
        );
    }
    
    // Classes internes
    public static class RecursionResult {
        public final boolean allowed;
        public final String message;
        public final int currentDepth;
        public final int maxDepth;
        public final boolean isInceptionWorld;
        
        public RecursionResult(boolean allowed, String message, int currentDepth, int maxDepth) {
            this(allowed, message, currentDepth, maxDepth, false);
        }
        
        public RecursionResult(boolean allowed, String message, int currentDepth, int maxDepth, boolean isInceptionWorld) {
            this.allowed = allowed;
            this.message = message;
            this.currentDepth = currentDepth;
            this.maxDepth = maxDepth;
            this.isInceptionWorld = isInceptionWorld;
        }
    }
    
    public static class RecursionInfo {
        public final String operationId;
        public final String context;
        public final String threadId;
        public final int depth;
        public final LocalDateTime startTime;
        public final String worldId;
        public final boolean isInceptionWorld;
        
        public RecursionInfo(String operationId, String context, String threadId, int depth, LocalDateTime startTime) {
            this(operationId, context, threadId, depth, startTime, null, false);
        }
        
        public RecursionInfo(String operationId, String context, String threadId, int depth, LocalDateTime startTime, String worldId, boolean isInceptionWorld) {
            this.operationId = operationId;
            this.context = context;
            this.threadId = threadId;
            this.depth = depth;
            this.startTime = startTime;
            this.worldId = worldId;
            this.isInceptionWorld = isInceptionWorld;
        }
    }
} 