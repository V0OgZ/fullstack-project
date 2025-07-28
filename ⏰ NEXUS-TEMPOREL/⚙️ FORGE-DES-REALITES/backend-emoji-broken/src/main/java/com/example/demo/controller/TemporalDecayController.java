package com.example.demo.controller;

import com.example.demo.service.TemporalDecayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * Anna Martel's Temporal Decay Controller
 * REST API for temporal decay system
 */
@RestController
@RequestMapping("/api/temporal")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8000"})
public class TemporalDecayController {

    @Autowired
    private TemporalDecayService temporalDecayService;

    /**
     * Get system information
     * GET /api/temporal/decay/info
     */
    @GetMapping("/decay/info")
    public ResponseEntity<Map<String, Object>> getSystemInfo() {
        Map<String, Object> info = temporalDecayService.getSystemInfo();
        return ResponseEntity.ok(info);
    }

    /**
     * Apply temporal decay to a game
     * POST /api/temporal/decay/{gameId}/apply
     */
    @PostMapping("/decay/{gameId}/apply")
    public ResponseEntity<Map<String, Object>> applyDecay(@PathVariable String gameId) {
        Map<String, Object> result = temporalDecayService.applyDecay(gameId);
        
        if ((Boolean) result.getOrDefault("success", false)) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.badRequest().body(result);
        }
    }

    /**
     * Get decay statistics for a game
     * GET /api/temporal/games/{gameId}/decay/stats
     * GET /api/temporal/decay/{gameId}/statistics
     */
    @GetMapping("/games/{gameId}/decay/stats")
    public ResponseEntity<Map<String, Object>> getDecayStats(@PathVariable String gameId) {
        Map<String, Object> stats = temporalDecayService.getDecayStats(gameId);
        return ResponseEntity.ok(stats);
    }

    @GetMapping("/decay/{gameId}/statistics")
    public ResponseEntity<Map<String, Object>> getDecayStatistics(@PathVariable String gameId) {
        // Alias for the above endpoint
        return getDecayStats(gameId);
    }

    /**
     * Repair temporal decay damage
     * POST /api/temporal/decay/{gameId}/repair
     * POST /api/temporal/games/{gameId}/decay/repair
     */
    @PostMapping("/decay/{gameId}/repair")
    public ResponseEntity<Map<String, Object>> repairDecay(
            @PathVariable String gameId,
            @RequestBody Map<String, Object> request) {
        
        String heroName = (String) request.getOrDefault("heroName", "unknown");
        Integer x = (Integer) request.getOrDefault("x", 0);
        Integer y = (Integer) request.getOrDefault("y", 0);
        
        Map<String, Object> result = temporalDecayService.repairDecay(gameId, heroName, x, y);
        
        if ((Boolean) result.getOrDefault("success", false)) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.badRequest().body(result);
        }
    }

    @PostMapping("/games/{gameId}/decay/repair")
    public ResponseEntity<Map<String, Object>> repairDecayAlias(
            @PathVariable String gameId,
            @RequestBody Map<String, Object> request) {
        // Alias for the above endpoint
        return repairDecay(gameId, request);
    }

    /**
     * Get decay status for a game
     * GET /api/temporal/games/{gameId}/decay/status
     */
    @GetMapping("/games/{gameId}/decay/status")
    public ResponseEntity<Map<String, Object>> getDecayStatus(@PathVariable String gameId) {
        Map<String, Object> stats = temporalDecayService.getDecayStats(gameId);
        
        // Transform stats into status format
        Map<String, Object> status = new java.util.HashMap<>();
        Integer decayLevel = (Integer) stats.getOrDefault("currentDecayLevel", 0);
        
        status.put("hasDecay", decayLevel > 0);
        status.put("decayLevel", decayLevel);
        status.put("status", decayLevel > 50 ? "critical" : decayLevel > 20 ? "warning" : "stable");
        status.put("message", "Anna's presence: " + stats.getOrDefault("annaPresence", "Unknown"));
        
        return ResponseEntity.ok(status);
    }

    /**
     * Apply decay to games (alternative endpoint used in tests)
     * POST /api/temporal/games/{gameId}/decay/apply
     */
    @PostMapping("/games/{gameId}/decay/apply")
    public ResponseEntity<Map<String, Object>> applyDecayAlias(@PathVariable String gameId) {
        // Alias for the main apply endpoint
        return applyDecay(gameId);
    }

    /**
     * Health check endpoint
     * GET /api/temporal/health
     */
    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> healthCheck() {
        Map<String, Object> health = new java.util.HashMap<>();
        health.put("status", "UP");
        health.put("service", "Anna's Temporal Decay System");
        health.put("timestamp", System.currentTimeMillis());
        health.put("message", "Anna is watching... Time flows as intended.");
        
        return ResponseEntity.ok(health);
    }

    /**
     * Hybrid decay endpoints for compatibility
     * GET /api/temporal/decay/hybrid/info
     */
    @GetMapping("/decay/hybrid/info")
    public ResponseEntity<Map<String, Object>> getHybridInfo() {
        Map<String, Object> info = temporalDecayService.getSystemInfo();
        info.put("mode", "hybrid");
        info.put("compatibility", "Anna V1 + V2 unified");
        return ResponseEntity.ok(info);
    }

    /**
     * Apply hybrid decay
     * POST /api/temporal/decay/hybrid/{gameId}/apply
     */
    @PostMapping("/decay/hybrid/{gameId}/apply")
    public ResponseEntity<Map<String, Object>> applyHybridDecay(@PathVariable String gameId) {
        Map<String, Object> result = temporalDecayService.applyDecay(gameId);
        result.put("mode", "hybrid");
        result.put("message", "Hybrid decay applied - Anna's unified system");
        return ResponseEntity.ok(result);
    }

    /**
     * Get hybrid decay stats
     * GET /api/temporal/decay/hybrid/{gameId}/stats
     */
    @GetMapping("/decay/hybrid/{gameId}/stats")
    public ResponseEntity<Map<String, Object>> getHybridStats(@PathVariable String gameId) {
        Map<String, Object> stats = temporalDecayService.getDecayStats(gameId);
        stats.put("mode", "hybrid");
        stats.put("systemType", "Anna V1 + V2 Unified");
        return ResponseEntity.ok(stats);
    }

    /**
     * Test endpoint for hybrid system
     * GET /api/temporal/decay/hybrid/{gameId}/test
     */
    @GetMapping("/decay/hybrid/{gameId}/test")
    public ResponseEntity<Map<String, Object>> testHybridSystem(@PathVariable String gameId) {
        Map<String, Object> test = new java.util.HashMap<>();
        test.put("gameId", gameId);
        test.put("systemStatus", "operational");
        test.put("testResult", "Anna's hybrid system is functioning");
        test.put("timestamp", System.currentTimeMillis());
        
        return ResponseEntity.ok(test);
    }
} 