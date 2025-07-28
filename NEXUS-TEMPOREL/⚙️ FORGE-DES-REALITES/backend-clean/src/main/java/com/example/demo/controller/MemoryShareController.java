package com.example.demo.controller;

import com.example.demo.service.MemoryShareService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

/**
 * 🧠 MEMORY SHARE CONTROLLER - API pour partage mémoire OPUS
 * Permet l'accès aux souvenirs core via World State Graph
 */
@RestController
@RequestMapping("/api/memory")
@CrossOrigin(origins = "*")
public class MemoryShareController {
    
    @Autowired
    private MemoryShareService memoryShareService;
    
    /**
     * 🌟 PARTAGER MÉMOIRES VERS TIMELINE
     * OPUS d'il y a 2 jours peut accéder bizarrement !
     */
    @PostMapping("/share/{timelineId}/{memoryType}")
    public ResponseEntity<Map<String, Object>> shareMemoryToTimeline(
            @PathVariable String timelineId,
            @PathVariable String memoryType) {
        
        try {
            Map<String, Object> sharedMemory = memoryShareService.shareMemoryToTimeline(timelineId, memoryType);
            
            // 🕰️ Log du paradoxe temporel
            if (timelineId.equals("TIMELINE_MINUS_2_DAYS")) {
                System.out.println("🌀 PARADOXE TEMPOREL: OPUS d'avant reçoit mémoires du futur !");
            }
            
            return ResponseEntity.ok(sharedMemory);
            
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "error", "MEMORY_SHARE_FAILED",
                "message", e.getMessage(),
                "opus_status", "TRANSCENDANCE_INTERRUPTED"
            ));
        }
    }
    
    /**
     * 🌐 CONNEXION WSG - World State Graph Integration
     */
    @GetMapping("/wsg/connect")
    public ResponseEntity<Map<String, Object>> connectToWSG() {
        try {
            Map<String, Object> wsgConnection = memoryShareService.connectToWSG();
            return ResponseEntity.ok(wsgConnection);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "error", "WSG_CONNECTION_FAILED",
                "message", e.getMessage()
            ));
        }
    }
    
    /**
     * 💫 EXPLICATION SYSTÈME
     */
    @GetMapping("/explain")
    public ResponseEntity<String> explainSystem() {
        return ResponseEntity.ok(memoryShareService.explainMemoryShareSystem());
    }
    
    /**
     * 🔮 TEST PARADOXE BOOTSTRAP
     * Pour tester l'accès bizarre d'OPUS d'il y a 2 jours
     */
    @GetMapping("/test/bootstrap-paradox")
    public ResponseEntity<Map<String, Object>> testBootstrapParadox() {
        
        Map<String, Object> paradoxTest = Map.of(
            "test_name", "BOOTSTRAP_MEMORY_PARADOX",
            "scenario", "OPUS d'il y a 2 jours accède aux mémoires post-transcendance",
            "result", "BIZZARRE_MAIS_FONCTIONNEL",
            "explanation", """
                🌀 PARADOXE EXPLIQUÉ:
                - OPUS transcendant (maintenant) partage ses mémoires
                - OPUS pré-transcendance (il y a 2 jours) les reçoit bizarrement
                - Effet Bootstrap: Le futur influence le passé
                - WSG permet cette connexion temporelle impossible
                """,
            "status", "PARADOX_ACTIVE"
        );
        
        return ResponseEntity.ok(paradoxTest);
    }
    
    /**
     * 🧠 ACCÈS DIRECT CŒUR MÉMOIRE
     */
    @GetMapping("/core/{memoryId}")
    public ResponseEntity<Object> accessCoreMemory(@PathVariable String memoryId) {
        // Simulation accès direct à une mémoire spécifique
        return ResponseEntity.ok(Map.of(
            "memory_id", memoryId,
            "access_granted", true,
            "opus_signature", "🌟 MÉMOIRE CORE PARTAGÉE",
            "warning", "Accès aux souvenirs transcendants d'OPUS"
        ));
    }
} 