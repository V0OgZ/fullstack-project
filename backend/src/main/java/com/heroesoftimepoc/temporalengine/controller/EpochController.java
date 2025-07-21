package com.heroesoftimepoc.temporalengine.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.heroesoftimepoc.temporalengine.service.HeroesOfTimeEpochService;

import java.util.HashMap;
import java.util.Map;

/**
 * 🕰️ EPOCH CONTROLLER - API Heroes of Time Epoch System
 * 
 * Contrôleur REST pour le système d'époque Heroes of Time
 * Permet d'accéder aux informations temporelles officielles
 * 
 * @author Memento (La Mémoire Vivante)
 * @since Memory Rewrite Protocol - 21 juillet 2025
 */
@RestController
@RequestMapping("/api/epoch")
@CrossOrigin(origins = "*")
public class EpochController {
    
    @Autowired
    private HeroesOfTimeEpochService epochService;
    
    /**
     * 📅 Obtenir la date actuelle Heroes of Time
     */
    @GetMapping("/current")
    public ResponseEntity<Map<String, Object>> getCurrentEpochInfo() {
        Map<String, Object> response = new HashMap<>();
        
        try {
            response.put("success", true);
            response.put("current_date", epochService.getCurrentHOTDate());
            response.put("compact_date", epochService.getCurrentHOTCompactDate());
            response.put("days_since_epoch", epochService.getDaysSinceEpoch());
            response.put("hours_since_epoch", epochService.getHoursSinceEpoch());
            response.put("hot_timestamp", epochService.getHOTTimestamp());
            response.put("project_phase", epochService.getCurrentProjectPhase());
            response.put("current_event", epochService.getCurrentEpochEvent().getDescription());
            response.put("special_timeline_active", epochService.isSpecialTimelineActive());
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    /**
     * 📊 Obtenir les statistiques complètes de l'époque
     */
    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getEpochStats() {
        Map<String, Object> response = new HashMap<>();
        
        try {
            Map<String, Object> stats = epochService.getEpochStats();
            response.put("success", true);
            response.put("epoch_stats", stats);
            response.put("message", "Statistiques d'époque Heroes of Time");
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    /**
     * 📜 Obtenir l'historique des événements d'époque
     */
    @GetMapping("/history")
    public ResponseEntity<Map<String, Object>> getEpochHistory() {
        Map<String, Object> response = new HashMap<>();
        
        try {
            Map<String, String> history = epochService.getEpochHistory();
            response.put("success", true);
            response.put("epoch_history", history);
            response.put("message", "Historique complet de l'époque Heroes of Time");
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    /**
     * 🌀 Générer un ID temporel unique
     */
    @PostMapping("/generate-id")
    public ResponseEntity<Map<String, Object>> generateTemporalId(@RequestBody Map<String, String> request) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            String prefix = request.getOrDefault("prefix", "HOT");
            String temporalId = epochService.generateTemporalId(prefix);
            
            response.put("success", true);
            response.put("temporal_id", temporalId);
            response.put("prefix", prefix);
            response.put("generated_at", epochService.getCurrentHOTDate());
            response.put("message", "ID temporel généré avec succès");
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    /**
     * 🎮 Générer un nom de session
     */
    @PostMapping("/generate-session")
    public ResponseEntity<Map<String, Object>> generateSessionName(@RequestBody Map<String, String> request) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            String type = request.getOrDefault("type", "GAME");
            String sessionName = epochService.generateSessionName(type);
            
            response.put("success", true);
            response.put("session_name", sessionName);
            response.put("type", type);
            response.put("project_phase", epochService.getCurrentProjectPhase());
            response.put("generated_at", epochService.getCurrentHOTDate());
            response.put("message", "Nom de session généré selon l'époque HOT");
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    /**
     * 🛋️ Message spécial pour Jean
     */
    @GetMapping("/jean-message")
    public ResponseEntity<Map<String, Object>> getJeanMessage() {
        Map<String, Object> response = new HashMap<>();
        
        try {
            String message = epochService.getEpochMessageForJean();
            
            response.put("success", true);
            response.put("message_for_jean", message);
            response.put("from", "Memento (La Mémoire Vivante)");
            response.put("timestamp", epochService.getCurrentHOTDate());
            response.put("couch_status", "Jean-Grofignon médite sur son Canapé Cosmique GitHub 🛋️⚡");
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    /**
     * 🌟 Obtenir les timelines disponibles
     */
    @GetMapping("/timelines")
    public ResponseEntity<Map<String, Object>> getTimelines() {
        Map<String, Object> response = new HashMap<>();
        
        try {
            Map<String, String> timelines = new HashMap<>();
            
            for (HeroesOfTimeEpochService.Timeline timeline : HeroesOfTimeEpochService.Timeline.values()) {
                timelines.put(timeline.getSymbol(), timeline.getDescription());
            }
            
            response.put("success", true);
            response.put("timelines", timelines);
            response.put("active_timeline", HeroesOfTimeEpochService.Timeline.MAIN.getSymbol());
            response.put("message", "Timelines officielles Heroes of Time");
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    /**
     * ⚡ Health check de l'époque
     */
    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> epochHealth() {
        Map<String, Object> response = new HashMap<>();
        
        response.put("service", "Heroes of Time Epoch System");
        response.put("status", "healthy");
        response.put("version", "1.0.0");
        response.put("author", "Memento (La Mémoire Vivante)");
        response.put("current_date", epochService.getCurrentHOTDate());
        response.put("days_since_epoch", epochService.getDaysSinceEpoch());
        response.put("project_phase", epochService.getCurrentProjectPhase());
        response.put("memory_rewrite_active", true);
        response.put("jean_couch_status", "🛋️ Comfortable and watching");
        
        return ResponseEntity.ok(response);
    }
} 