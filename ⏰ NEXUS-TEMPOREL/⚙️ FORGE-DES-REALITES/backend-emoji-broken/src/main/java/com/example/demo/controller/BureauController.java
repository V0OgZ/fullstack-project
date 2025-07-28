package com.example.demo.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.*;

/**
 * 🌀 CONTRÔLEUR LE BUREAU - Nexus Temporel
 * 
 * GRUT: "Ce contrôleur gère l'accès au Bureau où toutes les timelines convergent"
 * MEMENTO: "J'archive toutes les interactions temporelles"
 * JEAN: "Depuis mon canapé virtuel, je supervise"
 */
@RestController
@RequestMapping("/api/bureau")
@CrossOrigin(origins = "*")
public class BureauController {

    // État du paradoxe temporel
    private static final Map<String, Object> TEMPORAL_STATE = new HashMap<>();
    private static final List<String> TIMELINE_EVENTS = new ArrayList<>();
    
    static {
        TEMPORAL_STATE.put("current_loop", "T-3_TO_T+2");
        TEMPORAL_STATE.put("mckinsey_threat_level", "EXTREME");
        TEMPORAL_STATE.put("grut_control", true);
        TEMPORAL_STATE.put("message_encrypted", "█████████████████████████");
    }

    /**
     * 🌀 Obtenir l'état temporel du Bureau
     */
    @GetMapping("/temporal-state")
    public ResponseEntity<Map<String, Object>> getTemporalState() {
        Map<String, Object> response = new HashMap<>();
        response.put("state", TEMPORAL_STATE);
        response.put("timeline_position", calculateTimelinePosition());
        response.put("paradox_level", calculateParadoxLevel());
        response.put("grut_vision", "OMNISCIENT");
        
        return ResponseEntity.ok(response);
    }

    /**
     * 📂 Accéder aux archives classifiées
     */
    @GetMapping("/archives/{classification}")
    public ResponseEntity<Map<String, Object>> getArchives(@PathVariable String classification) {
        Map<String, Object> response = new HashMap<>();
        
        if ("PANOPTICON_ROUGE".equals(classification)) {
            response.put("access", "GRANTED");
            response.put("documents", Arrays.asList(
                "RAPPORT_MCKINSEY_2025-07-26_T0_FROM_T-3",
                "GRUT_INTERCEPT_2025-07-26_T0_THIRSTYSTATE",
                "CONSULTANT_ECHO_2025-07-26_T0_RETROCAUSAL",
                "CONTRE_ANALYSE_GRUT_CONSULTANT_MCKINSEY"
            ));
            response.put("warning", "McKinsey surveillance active");
        } else {
            response.put("access", "DENIED");
            response.put("reason", "Classification insuffisante");
        }
        
        return ResponseEntity.ok(response);
    }

    /**
     * 🕐 Enregistrer un événement temporel
     */
    @PostMapping("/timeline-event")
    public ResponseEntity<Map<String, Object>> recordTimelineEvent(@RequestBody Map<String, Object> event) {
        String timestamp = "T" + TIMELINE_EVENTS.size();
        event.put("timestamp", timestamp);
        TIMELINE_EVENTS.add(event.toString());
        
        Map<String, Object> response = new HashMap<>();
        response.put("recorded", true);
        response.put("timestamp", timestamp);
        response.put("memento_archived", true);
        
        // Vérifier si boucle temporelle
        if (TIMELINE_EVENTS.size() % 23 == 0) {
            response.put("temporal_loop_detected", true);
            response.put("message", "BOUCLE DÉTECTÉE - Retour à T-3");
        }
        
        return ResponseEntity.ok(response);
    }

    /**
     * 🛡️ Scanner pour McKinsey
     */
    @GetMapping("/scan-mckinsey")
    public ResponseEntity<Map<String, Object>> scanForMcKinsey() {
        Map<String, Object> response = new HashMap<>();
        
        response.put("scan_complete", true);
        response.put("threats_detected", Arrays.asList(
            Map.of("location", "zone_consultant", "type", "INFILTRATOR", "level", "HIGH"),
            Map.of("location", "archives", "type", "DOCUMENT_TAMPERING", "level", "MEDIUM"),
            Map.of("location", "temporal_flow", "type", "TIMELINE_MANIPULATION", "level", "EXTREME")
        ));
        response.put("grut_assessment", "MENACE CONFIRMÉE - CONTRE-MESURES ACTIVES");
        
        return ResponseEntity.ok(response);
    }

    /**
     * 🎮 Accéder au Panopticon
     */
    @GetMapping("/panopticon/vision")
    public ResponseEntity<Map<String, Object>> getPanopticonVision() {
        Map<String, Object> response = new HashMap<>();
        
        response.put("vision_mode", "6D");
        response.put("timelines_visible", Arrays.asList("dev", "main", "grofi", "bootstrap"));
        response.put("jean_status", "TOUJOURS_SUR_CANAPE");
        response.put("memento_status", "ARCHIVING_EVERYTHING");
        response.put("vince_status", "GUN_READY");
        response.put("grut_status", "IN_CONTROL");
        
        return ResponseEntity.ok(response);
    }

    /**
     * 🚪 Tenter d'ouvrir l'interstice
     */
    @PostMapping("/interstice/open")
    public ResponseEntity<Map<String, Object>> openInterstice(@RequestParam String destination) {
        Map<String, Object> response = new HashMap<>();
        
        List<String> validDestinations = Arrays.asList("OPUS_WORLD", "TOUR_SOMBRE", "FOURTH_WALL");
        
        if (validDestinations.contains(destination)) {
            response.put("portal_status", "OPEN");
            response.put("destination", destination);
            response.put("warning", "Paradoxe temporel possible");
        } else {
            response.put("portal_status", "BLOCKED");
            response.put("reason", "Destination non autorisée par GRUT");
        }
        
        return ResponseEntity.ok(response);
    }

    /**
     * 🛋️ Interaction avec le canapé de Jean
     */
    @GetMapping("/canape/status")
    public ResponseEntity<Map<String, Object>> getCanapeStatus() {
        Map<String, Object> response = new HashMap<>();
        
        response.put("jean_present", true);
        response.put("comfort_level", "INFINI");
        response.put("motivation_to_move", 0);
        response.put("cosmic_vision_active", true);
        response.put("quote", "Pourquoi bouger quand on peut tout contrôler d'ici ?");
        
        return ResponseEntity.ok(response);
    }

    // Méthodes utilitaires privées
    
    private String calculateTimelinePosition() {
        long currentTime = System.currentTimeMillis();
        long cyclePosition = currentTime % 86400000; // Position dans cycle 24h
        
        if (cyclePosition < 28800000) return "T-3";
        else if (cyclePosition < 43200000) return "T0";
        else if (cyclePosition < 64800000) return "T+1";
        else return "T+2";
    }
    
    private double calculateParadoxLevel() {
        return 0.85 + (Math.random() * 0.15); // Toujours élevé dans Le Bureau
    }
} 