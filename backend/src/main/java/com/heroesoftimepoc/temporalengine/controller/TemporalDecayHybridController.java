package com.heroesoftimepoc.temporalengine.controller;

import com.heroesoftimepoc.temporalengine.service.TemporalDecayHybridService;
import com.heroesoftimepoc.temporalengine.repository.GameRepository;
import com.heroesoftimepoc.temporalengine.model.Game;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

/**
 * The Dude's Temporal Decay Hybrid Controller
 * 
 * "Sometimes you eat the bar, and sometimes the bar eats you."
 * 
 * Simple controller to test the unified decay system
 */
@RestController
@RequestMapping("/api/temporal/decay/hybrid")
@CrossOrigin(origins = "*")
public class TemporalDecayHybridController {

    @Autowired
    private TemporalDecayHybridService hybridDecayService;
    
    @Autowired
    private GameRepository gameRepository;

    /**
     * TEST ENDPOINT: Quick test of the unified system
     * 
     * Endpoint: GET /api/temporal/decay/hybrid/{gameId}/test
     * 
     * Perfect for immediate validation that everything works
     */
    @GetMapping("/{gameId}/test")
    public ResponseEntity<Map<String, Object>> testUnifiedSystem(@PathVariable Long gameId) {
        try {
            Optional<Game> gameOpt = gameRepository.findById(gameId);
            if (gameOpt.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "error", "Game not found with ID: " + gameId,
                    "dudeQuote", "The Dude says: 'Can't test decay on a game that doesn't exist, man.'"
                ));
            }
            
            String testResult = hybridDecayService.testUnifiedSystem(gameOpt.get());
            
            return ResponseEntity.ok(Map.of(
                "success", true,
                "testResult", testResult,
                "message", "Unified decay test completed successfully",
                "system", "The Dude's Temporal Decay Hybrid Service"
            ));
            
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of(
                "success", false,
                "error", "Test failed: " + e.getMessage(),
                "dudeQuote", "The Dude says: 'That's a bummer, man. Something went wrong.'"
            ));
        }
    }

    /**
     * APPLY ENDPOINT: Apply unified temporal decay
     * 
     * Endpoint: POST /api/temporal/decay/hybrid/{gameId}/apply
     * 
     * Applies both structural and personal decay
     */
    @PostMapping("/{gameId}/apply")
    public ResponseEntity<Map<String, Object>> applyUnifiedDecay(@PathVariable Long gameId) {
        try {
            Optional<Game> gameOpt = gameRepository.findById(gameId);
            if (gameOpt.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "error", "Game not found with ID: " + gameId
                ));
            }
            
            TemporalDecayHybridService.TemporalDecayReport report = 
                hybridDecayService.applyUnifiedDecay(gameOpt.get());
            
            return ResponseEntity.ok(Map.of(
                "success", true,
                "report", report,
                "structuralDecayCount", report.getStructuralDecay().size(),
                "personalDecayCount", report.getPersonalDecay().size(),
                "dudeQuote", report.getDudeQuote(),
                "message", "Unified temporal decay applied successfully"
            ));
            
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of(
                "success", false,
                "error", "Failed to apply unified decay: " + e.getMessage(),
                "dudeQuote", "The Dude says: 'Sometimes these things don't work out, man.'"
            ));
        }
    }

    /**
     * STATS ENDPOINT: Get unified decay statistics
     * 
     * Endpoint: GET /api/temporal/decay/hybrid/{gameId}/stats
     * 
     * Returns comprehensive statistics for both decay systems
     */
    @GetMapping("/{gameId}/stats")
    public ResponseEntity<Map<String, Object>> getUnifiedStats(@PathVariable Long gameId) {
        try {
            Optional<Game> gameOpt = gameRepository.findById(gameId);
            if (gameOpt.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "error", "Game not found with ID: " + gameId
                ));
            }
            
            Map<String, Object> stats = hybridDecayService.getUnifiedDecayStatistics(gameOpt.get());
            stats.put("success", true);
            stats.put("gameId", gameId);
            
            return ResponseEntity.ok(stats);
            
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of(
                "success", false,
                "error", "Failed to get unified stats: " + e.getMessage()
            ));
        }
    }

    /**
     * INFO ENDPOINT: Get information about the hybrid system
     * 
     * Endpoint: GET /api/temporal/decay/hybrid/info
     * 
     * Returns information about The Dude's unified approach
     */
    @GetMapping("/info")
    public ResponseEntity<Map<String, Object>> getHybridSystemInfo() {
        Map<String, Object> info = Map.of(
            "system", "The Dude's Temporal Decay Hybrid Service",
            "philosophy", "Order (Jean) + Structure (Anna V1) + Individual (Anna DK20) = Perfect Harmony",
            "description", "Combines the best of both Anna the Martopicker's visions",
            "quote", "Why choose between a White Russian and a Caucasian when you can have both?",
            "author", "The Dude (Vince Vega Temporal Consultant)",
            "systems", Map.of(
                "structural", Map.of(
                    "description", "Legacy timeline-based decay for buildings",
                    "targets", "Châteaux, tours, murs, maisons",
                    "logic", "Buildings crumble when players lag in past timelines",
                    "status", "Proven and functional"
                ),
                "personal", Map.of(
                    "description", "DK20 concept for hero ability decay",
                    "targets", "Vision temporelle, interactions NPCs, stabilité artefacts",
                    "logic", "Hero capabilities fade when lagging behind time",
                    "status", "Simplified implementation using existing methods"
                )
            ),
            "thresholds", Map.of(
                "structural", "5+ days behind triggers building decay",
                "personal", Map.of(
                    "day3", "Temporal vision reduction",
                    "day5", "NPC avoidance",
                    "day7", "Artifact instability"
                )
            ),
            "endpoints", Map.of(
                "test", "GET /api/temporal/decay/hybrid/{gameId}/test",
                "apply", "POST /api/temporal/decay/hybrid/{gameId}/apply", 
                "stats", "GET /api/temporal/decay/hybrid/{gameId}/stats",
                "info", "GET /api/temporal/decay/hybrid/info"
            )
        );
        
        return ResponseEntity.ok(info);
    }
} 