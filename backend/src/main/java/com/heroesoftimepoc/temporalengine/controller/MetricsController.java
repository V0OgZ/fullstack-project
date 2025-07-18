package com.heroesoftimepoc.temporalengine.controller;

import com.heroesoftimepoc.temporalengine.service.PerformanceMetricsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/metrics")
@CrossOrigin(origins = "*")
public class MetricsController {
    
    @Autowired
    private PerformanceMetricsService performanceMetrics;
    
    /**
     * Obtenir toutes les métriques de performance
     */
    @GetMapping("/performance")
    public Map<String, Object> getPerformanceMetrics() {
        return performanceMetrics.getMetrics();
    }
    
    /**
     * Obtenir les métriques rapides (top opérations lentes)
     */
    @GetMapping("/quick")
    public Map<String, Object> getQuickMetrics() {
        return performanceMetrics.getQuickMetrics();
    }
    
    /**
     * Obtenir un résumé textuel des performances
     */
    @GetMapping("/summary")
    public String getPerformanceSummary() {
        return performanceMetrics.getPerformanceSummary();
    }
    
    /**
     * Reset des métriques
     */
    @PostMapping("/reset")
    public Map<String, Object> resetMetrics() {
        performanceMetrics.resetMetrics();
        return Map.of("success", true, "message", "Métriques réinitialisées");
    }
    
    /**
     * Endpoint de test pour générer des métriques
     */
    @PostMapping("/test")
    public Map<String, Object> testMetrics() {
        // Simuler différentes opérations
        for (int i = 0; i < 100; i++) {
            performanceMetrics.measureOperation("test_operation_fast", () -> {
                try { Thread.sleep(1); } catch (InterruptedException e) {}
                return null;
            });
        }
        
        for (int i = 0; i < 50; i++) {
            performanceMetrics.measureOperation("test_operation_slow", () -> {
                try { Thread.sleep(10); } catch (InterruptedException e) {}
                return null;
            });
        }
        
        performanceMetrics.incrementCounter("test_counter");
        
        return Map.of("success", true, "message", "Métriques de test générées");
    }
} 