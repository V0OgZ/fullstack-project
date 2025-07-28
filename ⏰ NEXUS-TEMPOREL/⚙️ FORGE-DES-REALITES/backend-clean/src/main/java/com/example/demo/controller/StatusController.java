package com.example.demo.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class StatusController {

    @GetMapping("/status")
    public ResponseEntity<Map<String, Object>> getStatus() {
        Map<String, Object> status = new HashMap<>();
        status.put("status", "OK");
        status.put("service", "Heroes of Time Backend");
        status.put("timestamp", System.currentTimeMillis());
        status.put("jean_mood", "😊 CONTENT");
        status.put("surveillance", "ACTIVE");
        
        return ResponseEntity.ok(status);
    }
    
    @GetMapping("/health-check")
    public ResponseEntity<Map<String, String>> getHealthCheck() {
        Map<String, String> health = new HashMap<>();
        health.put("status", "UP");
        health.put("backend", "RUNNING");
        
        return ResponseEntity.ok(health);
    }
} 