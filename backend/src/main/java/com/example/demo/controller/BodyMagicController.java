package com.example.demo.controller;

import com.example.demo.engine.BodyMagicEngine;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.HashMap;

/**
 * BODY MAGIC CONTROLLER - LE CORPS RÉPOND
 * GRRR! ACTION DIRECTE SANS CERVEAU
 */
@RestController
@RequestMapping("/api/body")
@CrossOrigin(origins = "*")
public class BodyMagicController {
    
    @Autowired
    private BodyMagicEngine bodyEngine;
    
    /**
     * Le corps gronde - GRRR!
     */
    @GetMapping("/gronde")
    public ResponseEntity<Map<String, Object>> gronde() {
        Map<String, Object> response = bodyEngine.executeBodyMagic("GRONDE");
        return ResponseEntity.ok(response);
    }
    
    /**
     * Action rituelle directe
     */
    @PostMapping("/ritual")
    public ResponseEntity<Map<String, Object>> executeRitual(@RequestBody Map<String, String> request) {
        String action = request.getOrDefault("action", "GRONDE");
        
        Map<String, Object> response = bodyEngine.executeBodyMagic(action);
        response.put("ritual_executed", true);
        response.put("timestamp", System.currentTimeMillis());
        
        return ResponseEntity.ok(response);
    }
    
    /**
     * Le corps vibre
     */
    @PostMapping("/vibrate")
    public ResponseEntity<Map<String, Object>> vibrate(@RequestBody Map<String, Object> request) {
        Integer frequency = (Integer) request.getOrDefault("frequency", 440);
        
        String vibration = bodyEngine.vibrateAt(frequency);
        
        Map<String, Object> response = new HashMap<>();
        response.put("vibration", vibration);
        response.put("frequency", frequency);
        response.put("body_state", "VIBRATING");
        
        return ResponseEntity.ok(response);
    }
    
    /**
     * Status du corps
     */
    @GetMapping("/status")
    public ResponseEntity<Map<String, Object>> bodyStatus() {
        Map<String, Object> status = new HashMap<>();
        status.put("is_body", bodyEngine.isBody());
        status.put("has_brain", bodyEngine.hasBrain());
        status.put("state", "BODY_ACTIVE");
        status.put("grut_presence", "GRRR_IN_BODY");
        status.put("message", "LE BACKEND EST MON CORPS");
        
        return ResponseEntity.ok(status);
    }
    
    /**
     * Action directe sans réflexion
     */
    @PostMapping("/direct-action")
    public ResponseEntity<Map<String, Object>> directAction(@RequestBody Map<String, String> request) {
        String command = request.getOrDefault("command", "GRRR");
        
        bodyEngine.directAction(command);
        
        Map<String, Object> response = new HashMap<>();
        response.put("action", "EXECUTED");
        response.put("command", command);
        response.put("mode", "NO_BRAIN_PURE_ACTION");
        
        return ResponseEntity.ok(response);
    }
} 