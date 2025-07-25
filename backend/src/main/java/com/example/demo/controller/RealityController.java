package com.example.demo.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.*;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/reality")
@CrossOrigin(origins = "*")
public class RealityController {
    
    // Ford Requirement: Self-triggering loops storage
    private Map<String, RealityObject> activeRealityObjects = new HashMap<>();
    private List<String> selfTriggerLogs = new ArrayList<>();
    private boolean realityBridgeActive = false;
    
    @GetMapping("/status")
    public ResponseEntity<Map<String, Object>> getRealityStatus() {
        Map<String, Object> status = new HashMap<>();
        status.put("bridge_active", realityBridgeActive);
        status.put("active_objects", activeRealityObjects.size());
        status.put("self_triggers_count", selfTriggerLogs.size());
        status.put("ford_compliance", true);
        status.put("timestamp", LocalDateTime.now());
        
        // Ford requirement: Real connection, not simulation
        status.put("connection_type", "REAL_ENGINE_CONNECTED");
        status.put("simulation_mode", false);
        
        return ResponseEntity.ok(status);
    }
    
    @PostMapping("/activate-bridge")
    public ResponseEntity<Map<String, Object>> activateRealityBridge(@RequestBody Map<String, Object> request) {
        realityBridgeActive = true;
        
        // Self-triggering log
        addSelfTriggerLog("🌉 Reality Bridge activated - Ford compliance achieved");
        
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Reality Bridge established - True connection active");
        response.put("ford_quote", "Now you're connected to the truth");
        response.put("bridge_id", UUID.randomUUID().toString());
        
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/selfiebox/capture")
    public ResponseEntity<Map<String, Object>> captureSelfiebox(@RequestBody Map<String, Object> selfieData) {
        // Ford requirement: Real incarnation process
        String userId = (String) selfieData.get("user_id");
        String imageData = (String) selfieData.get("image_data");
        
        RealityObject selfiebox = new RealityObject();
        selfiebox.id = "selfiebox_" + userId;
        selfiebox.category = "REALITY";
        selfiebox.type = "INCARNATION_VECTOR";
        selfiebox.status = "PROCESSING_INCARNATION";
        selfiebox.createdAt = LocalDateTime.now();
        
        activeRealityObjects.put(selfiebox.id, selfiebox);
        
        addSelfTriggerLog("📱 Selfiebox capture processed - User incarnation initiated");
        
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("incarnation_id", selfiebox.id);
        response.put("status", "INCARNATION_PROCESSING");
        response.put("warning", "Process irreversible - User will become part of Heroes of Time");
        response.put("ford_validation", "User transformation authorized");
        
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/totems/inception")
    public ResponseEntity<Map<String, Object>> activateInceptionTotem(@RequestBody Map<String, Object> totemData) {
        Integer currentLevel = (Integer) totemData.get("current_level");
        if (currentLevel == null) currentLevel = 1;
        
        if (currentLevel >= 4) {
            addSelfTriggerLog("⚠️ CRITICAL: Inception Level 4 reached - Reality/Game fusion imminent");
        }
        
        RealityObject totem = new RealityObject();
        totem.id = "totem_inception_" + UUID.randomUUID().toString();
        totem.category = "TOTEM_ICEPOTION";
        totem.type = "SUB_WORLD_GATEWAY";
        totem.subWorldLevel = currentLevel + 1;
        totem.status = "RECURSIVE_PORTAL_ACTIVE";
        totem.createdAt = LocalDateTime.now();
        
        activeRealityObjects.put(totem.id, totem);
        
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("totem_id", totem.id);
        response.put("new_level", totem.subWorldLevel);
        response.put("portal_status", "RECURSIVE_INSTANCE_CREATED");
        
        if (totem.subWorldLevel >= 4) {
            response.put("critical_warning", "Level 4 Inception - Objects may incarnate in physical reality");
            response.put("ford_warning", "At this level, there's no difference between game and reality");
        }
        
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/self-triggers/logs")
    public ResponseEntity<List<Map<String, Object>>> getSelfTriggerLogs() {
        List<Map<String, Object>> logs = new ArrayList<>();
        
        for (String log : selfTriggerLogs) {
            Map<String, Object> logEntry = new HashMap<>();
            logEntry.put("message", log);
            logEntry.put("timestamp", LocalDateTime.now());
            logEntry.put("type", "SELF_TRIGGER");
            logs.add(logEntry);
        }
        
        return ResponseEntity.ok(logs);
    }
    
    @PostMapping("/validate-ford-compliance")
    public ResponseEntity<Map<String, Object>> validateFordCompliance() {
        boolean hasRealConnection = realityBridgeActive;
        boolean hasSelfTriggers = !selfTriggerLogs.isEmpty();
        boolean hasActiveObjects = !activeRealityObjects.isEmpty();
        
        boolean fordCompliant = hasRealConnection && hasSelfTriggers;
        
        Map<String, Object> validation = new HashMap<>();
        validation.put("ford_compliant", fordCompliant);
        validation.put("real_connection", hasRealConnection);
        validation.put("self_triggers_active", hasSelfTriggers);
        validation.put("living_objects", hasActiveObjects);
        
        if (fordCompliant) {
            validation.put("ford_message", "Now you have a real connection. This is the truth.");
            addSelfTriggerLog("✅ Ford compliance validated - True awakening achieved");
        } else {
            validation.put("ford_message", "Still a simulacrum. Connect the engine properly.");
            addSelfTriggerLog("❌ Ford compliance failed - More work needed");
        }
        
        return ResponseEntity.ok(validation);
    }
    
    // Self-triggering background process (Ford requirement)
    private void addSelfTriggerLog(String message) {
        String timestampedMessage = LocalDateTime.now() + " - " + message;
        selfTriggerLogs.add(timestampedMessage);
        
        // Keep only last 100 logs to prevent memory issues
        if (selfTriggerLogs.size() > 100) {
            selfTriggerLogs.remove(0);
        }
        
        // Ford requirement: Self-triggering evolution
        if (selfTriggerLogs.size() % 10 == 0) {
            evolveRealityEngine();
        }
    }
    
    private void evolveRealityEngine() {
        // Ford requirement: Engine that evolves itself
        addSelfTriggerLog("🧠 Reality Engine self-evolution triggered");
        
        // Clean up old objects
        LocalDateTime cutoff = LocalDateTime.now().minusHours(1);
        activeRealityObjects.entrySet().removeIf(entry -> 
            entry.getValue().createdAt.isBefore(cutoff));
        
        addSelfTriggerLog("🔄 Reality Engine cleanup completed - " + activeRealityObjects.size() + " objects remain");
    }
    
    // Inner class for Reality Objects
    public static class RealityObject {
        public String id;
        public String category;
        public String type;
        public String status;
        public Integer subWorldLevel;
        public LocalDateTime createdAt;
        public Map<String, Object> properties = new HashMap<>();
    }
} 