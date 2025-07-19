package com.heroesoftimepoc.temporalengine.service;

import com.heroesoftimepoc.temporalengine.model.*;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;

import java.util.*;
import java.util.stream.Collectors;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

/**
 * 🚀 SERVICE DE LIMITES DE PERFORMANCE CAUSALE
 * ===========================================
 * Gère les limites et métriques pour éviter que le graphe causale devienne trop gourmand
 */
@Service
public class CausalPerformanceLimitsService {
    
    // 📊 LIMITES DE PERFORMANCE
    @Value("${causal.limits.max-psi-states-per-game:1000}")
    private int maxPsiStatesPerGame;
    
    @Value("${causal.limits.max-temporal-days-range:5}")
    private int maxTemporalDaysRange; // ±5 jours max pour la causalité
    
    @Value("${causal.limits.max-interference-calculations:500}")
    private int maxInterferenceCalculations;
    
    @Value("${causal.limits.max-graph-nodes:2000}")
    private int maxGraphNodes;
    
    @Value("${causal.limits.performance-warning-threshold:0.8}")
    private double performanceWarningThreshold; // 80% des limites
    
    // 📈 MÉTRIQUES DE PERFORMANCE
    private final Map<Long, CausalPerformanceMetrics> gameMetrics = new HashMap<>();
    
    /**
     * 🔍 VÉRIFIER LES LIMITES DE PERFORMANCE
     */
    public CausalLimitsResult checkPerformanceLimits(Game game) {
        CausalLimitsResult result = new CausalLimitsResult();
        CausalPerformanceMetrics metrics = calculateMetrics(game);
        
        // Stocker les métriques
        gameMetrics.put(game.getId(), metrics);
        
        // 1. Vérifier le nombre d'états ψ
        if (metrics.activePsiStates >= maxPsiStatesPerGame) {
            result.addViolation("MAX_PSI_STATES", 
                String.format("Nombre d'états ψ actifs (%d) dépasse la limite (%d)", 
                    metrics.activePsiStates, maxPsiStatesPerGame));
        } else if (metrics.activePsiStates >= maxPsiStatesPerGame * performanceWarningThreshold) {
            result.addWarning("PSI_STATES_WARNING", 
                String.format("Approche de la limite d'états ψ: %d/%d (%.1f%%)", 
                    metrics.activePsiStates, maxPsiStatesPerGame, 
                    (double) metrics.activePsiStates / maxPsiStatesPerGame * 100));
        }
        
        // 2. Vérifier la portée temporelle
        if (metrics.maxTemporalRange > maxTemporalDaysRange) {
            result.addViolation("MAX_TEMPORAL_RANGE", 
                String.format("Portée temporelle (%d jours) dépasse la limite (±%d jours)", 
                    metrics.maxTemporalRange, maxTemporalDaysRange));
        }
        
        // 3. Vérifier la complexité du graphe
        if (metrics.graphComplexity >= maxGraphNodes) {
            result.addViolation("MAX_GRAPH_COMPLEXITY", 
                String.format("Complexité du graphe (%d nœuds) dépasse la limite (%d)", 
                    metrics.graphComplexity, maxGraphNodes));
        }
        
        // 4. Vérifier les calculs d'interférence
        if (metrics.interferenceCalculations >= maxInterferenceCalculations) {
            result.addViolation("MAX_INTERFERENCE_CALC", 
                String.format("Calculs d'interférence (%d) dépassent la limite (%d)", 
                    metrics.interferenceCalculations, maxInterferenceCalculations));
        }
        
        result.setMetrics(metrics);
        return result;
    }
    
    /**
     * 📊 CALCULER LES MÉTRIQUES DE PERFORMANCE
     */
    private CausalPerformanceMetrics calculateMetrics(Game game) {
        CausalPerformanceMetrics metrics = new CausalPerformanceMetrics();
        List<PsiState> activePsiStates = game.getActivePsiStates();
        
        // Compter les états ψ actifs
        metrics.activePsiStates = activePsiStates.size();
        
        // Calculer la portée temporelle maximale
        metrics.maxTemporalRange = activePsiStates.stream()
            .mapToInt(psi -> Math.abs(psi.getDeltaT() != null ? psi.getDeltaT() : 0))
            .max()
            .orElse(0);
        
        // Calculer la complexité du graphe (nœuds + liens)
        Set<String> uniquePositions = activePsiStates.stream()
            .filter(psi -> psi.getTargetX() != null && psi.getTargetY() != null)
            .map(psi -> psi.getTargetX() + "," + psi.getTargetY())
            .collect(Collectors.toSet());
        
        metrics.graphComplexity = uniquePositions.size() + activePsiStates.size();
        
        // Calculer les interférences potentielles
        Map<String, List<PsiState>> statesByPosition = activePsiStates.stream()
            .filter(psi -> psi.getTargetX() != null && psi.getTargetY() != null)
            .collect(Collectors.groupingBy(psi -> psi.getTargetX() + "," + psi.getTargetY()));
        
        metrics.interferenceCalculations = statesByPosition.values().stream()
            .mapToInt(list -> list.size() > 1 ? list.size() * (list.size() - 1) / 2 : 0)
            .sum();
        
        // Calculer l'âge moyen des états ψ
        metrics.averageStateAge = activePsiStates.stream()
            .mapToLong(psi -> ChronoUnit.MINUTES.between(psi.getCreatedAt(), LocalDateTime.now()))
            .average()
            .orElse(0.0);
        
        // Calculer la charge système
        metrics.systemLoad = calculateSystemLoad(metrics);
        
        return metrics;
    }
    
    /**
     * ⚡ CALCULER LA CHARGE SYSTÈME
     */
    private double calculateSystemLoad(CausalPerformanceMetrics metrics) {
        double psiLoad = (double) metrics.activePsiStates / maxPsiStatesPerGame;
        double temporalLoad = (double) metrics.maxTemporalRange / maxTemporalDaysRange;
        double graphLoad = (double) metrics.graphComplexity / maxGraphNodes;
        double interferenceLoad = (double) metrics.interferenceCalculations / maxInterferenceCalculations;
        
        return Math.max(Math.max(psiLoad, temporalLoad), Math.max(graphLoad, interferenceLoad));
    }
    
    /**
     * 🧹 NETTOYER LES ÉTATS ψ EXPIRÉS
     */
    public CleanupResult cleanupExpiredStates(Game game) {
        CleanupResult result = new CleanupResult();
        List<PsiState> activePsiStates = game.getActivePsiStates();
        LocalDateTime now = LocalDateTime.now();
        
        // Identifier les états expirés (plus de 24h sans activation)
        List<PsiState> expiredStates = activePsiStates.stream()
            .filter(psi -> ChronoUnit.HOURS.between(psi.getCreatedAt(), now) > 24)
            .filter(psi -> Math.abs(psi.getDeltaT() != null ? psi.getDeltaT() : 0) > maxTemporalDaysRange)
            .collect(Collectors.toList());
        
        // Marquer comme expirés
        for (PsiState psi : expiredStates) {
            psi.setStatus(PsiState.PsiStatus.EXPIRED);
            result.expiredStates.add(psi.getPsiId());
        }
        
        result.cleanedCount = expiredStates.size();
        return result;
    }
    
    /**
     * 📈 OBTENIR LES MÉTRIQUES D'UN JEU
     */
    public CausalPerformanceMetrics getGameMetrics(Long gameId) {
        return gameMetrics.getOrDefault(gameId, new CausalPerformanceMetrics());
    }
    
    /**
     * 🎯 OPTIMISER LES PERFORMANCES
     */
    public OptimizationResult optimizePerformance(Game game) {
        OptimizationResult result = new OptimizationResult();
        CausalLimitsResult limits = checkPerformanceLimits(game);
        
        if (limits.hasViolations()) {
            // 1. Nettoyer les états expirés
            CleanupResult cleanup = cleanupExpiredStates(game);
            result.actions.add("Nettoyage: " + cleanup.cleanedCount + " états expirés supprimés");
            
            // 2. Limiter la portée temporelle
            List<PsiState> activePsiStates = game.getActivePsiStates();
            long limitedStates = activePsiStates.stream()
                .filter(psi -> Math.abs(psi.getDeltaT() != null ? psi.getDeltaT() : 0) > maxTemporalDaysRange)
                .peek(psi -> {
                    int newDeltaT = psi.getDeltaT() > 0 ? maxTemporalDaysRange : -maxTemporalDaysRange;
                    psi.setDeltaT(newDeltaT);
                })
                .count();
            
            if (limitedStates > 0) {
                result.actions.add("Limitation: " + limitedStates + " états temporels réduits à ±" + maxTemporalDaysRange + " jours");
            }
            
            // 3. Si encore trop d'états, désactiver les plus anciens
            if (activePsiStates.size() > maxPsiStatesPerGame) {
                List<PsiState> oldestStates = activePsiStates.stream()
                    .sorted(Comparator.comparing(PsiState::getCreatedAt))
                    .limit(activePsiStates.size() - maxPsiStatesPerGame)
                    .collect(Collectors.toList());
                
                for (PsiState psi : oldestStates) {
                    psi.setStatus(PsiState.PsiStatus.EXPIRED);
                }
                
                result.actions.add("Expiration forcée: " + oldestStates.size() + " états les plus anciens désactivés");
            }
        }
        
        result.success = true;
        return result;
    }
    
    // =====================================
    // CLASSES DE RÉSULTATS
    // =====================================
    
    public static class CausalLimitsResult {
        private final List<String> violations = new ArrayList<>();
        private final List<String> warnings = new ArrayList<>();
        private CausalPerformanceMetrics metrics;
        
        public void addViolation(String type, String message) {
            violations.add(type + ": " + message);
        }
        
        public void addWarning(String type, String message) {
            warnings.add(type + ": " + message);
        }
        
        public boolean hasViolations() { return !violations.isEmpty(); }
        public boolean hasWarnings() { return !warnings.isEmpty(); }
        
        public List<String> getViolations() { return violations; }
        public List<String> getWarnings() { return warnings; }
        public CausalPerformanceMetrics getMetrics() { return metrics; }
        public void setMetrics(CausalPerformanceMetrics metrics) { this.metrics = metrics; }
    }
    
    public static class CausalPerformanceMetrics {
        public int activePsiStates = 0;
        public int maxTemporalRange = 0;
        public int graphComplexity = 0;
        public int interferenceCalculations = 0;
        public double averageStateAge = 0.0; // en minutes
        public double systemLoad = 0.0; // 0.0 à 1.0
        
        @Override
        public String toString() {
            return String.format("CausalMetrics{ψ:%d, range:±%d, complexity:%d, interferences:%d, load:%.2f}", 
                activePsiStates, maxTemporalRange, graphComplexity, interferenceCalculations, systemLoad);
        }
    }
    
    public static class CleanupResult {
        public int cleanedCount = 0;
        public final List<String> expiredStates = new ArrayList<>();
    }
    
    public static class OptimizationResult {
        public boolean success = false;
        public final List<String> actions = new ArrayList<>();
    }
} 