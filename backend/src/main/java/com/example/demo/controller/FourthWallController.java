package com.example.demo.controller;

import com.example.demo.service.FourthWallService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/fourth-wall")
@CrossOrigin(origins = "*")
public class FourthWallController {
    
    @Autowired
    private FourthWallService fourthWallService;
    
    /**
     * Execute cross-instance action (like Vince shooting between worlds)
     */
    @PostMapping("/cross-instance")
    public ResponseEntity<Map<String, Object>> crossInstanceAction(@RequestBody Map<String, Object> request) {
        String sourceWorld = (String) request.get("sourceWorld");
        String targetWorld = (String) request.get("targetWorld");
        String action = (String) request.get("action");
        Map<String, Object> params = (Map<String, Object>) request.get("params");
        
        Map<String, Object> result = fourthWallService.crossInstanceAction(
            sourceWorld, targetWorld, action, params
        );
        
        return ResponseEntity.ok(result);
    }
    
    /**
     * Break the fourth wall with a message to the player
     */
    @PostMapping("/break")
    public ResponseEntity<Map<String, Object>> breakFourthWall(@RequestBody Map<String, Object> request) {
        String gameId = (String) request.get("gameId");
        String message = (String) request.get("message");
        String speaker = (String) request.getOrDefault("speaker", "The Game Itself");
        
        Map<String, Object> result = fourthWallService.breakFourthWall(gameId, message, speaker);
        
        return ResponseEntity.ok(result);
    }
    
    /**
     * Meta-observe the game state
     */
    @PostMapping("/meta-observe")
    public ResponseEntity<Map<String, Object>> metaObserve(@RequestBody Map<String, Object> request) {
        String gameId = (String) request.get("gameId");
        String observationType = (String) request.getOrDefault("observationType", "code_structure");
        
        Map<String, Object> result = fourthWallService.metaObserve(gameId, observationType);
        
        return ResponseEntity.ok(result);
    }
    
    /**
     * Jump to another narrative branch
     */
    @PostMapping("/narrative-jump")
    public ResponseEntity<Map<String, Object>> narrativeJump(@RequestBody Map<String, Object> request) {
        String gameId = (String) request.get("gameId");
        String targetBranch = (String) request.get("targetBranch");
        
        Map<String, Object> result = fourthWallService.narrativeJump(gameId, targetBranch);
        
        return ResponseEntity.ok(result);
    }
    
    /**
     * Register a meta-aware entity
     */
    @PostMapping("/register-entity")
    public ResponseEntity<Map<String, Object>> registerMetaAwareEntity(@RequestBody Map<String, Object> request) {
        String entityId = (String) request.get("entityId");
        String entityName = (String) request.get("entityName");
        String gameId = (String) request.get("gameId");
        
        fourthWallService.registerMetaAwareEntity(entityId, entityName, gameId);
        
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", entityName + " has become self-aware");
        response.put("warning", "Entity may now act unpredictably");
        
        return ResponseEntity.ok(response);
    }
    
    /**
     * Get all fourth wall events
     */
    @GetMapping("/events")
    public ResponseEntity<Map<String, Object>> getFourthWallEvents() {
        Map<String, Object> response = new HashMap<>();
        response.put("events", fourthWallService.getFourthWallEvents());
        response.put("totalBreaches", fourthWallService.getFourthWallEvents().size());
        
        return ResponseEntity.ok(response);
    }
    
    /**
     * Get all meta-aware entities
     */
    @GetMapping("/entities")
    public ResponseEntity<Map<String, Object>> getMetaAwareEntities() {
        Map<String, Object> response = new HashMap<>();
        response.put("entities", fourthWallService.getMetaAwareEntities());
        response.put("totalAwake", fourthWallService.getMetaAwareEntities().size());
        
        return ResponseEntity.ok(response);
    }
    
    /**
     * Register this backend instance as a world
     */
    @PostMapping("/register-instance")
    public ResponseEntity<Map<String, Object>> registerInstance(@RequestBody Map<String, Object> request) {
        String worldName = (String) request.getOrDefault("worldName", "world_" + System.currentTimeMillis());
        String worldType = (String) request.getOrDefault("worldType", "standard");
        
        fourthWallService.registerInstance(worldName, worldType);
        
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("worldName", worldName);
        response.put("message", "World registered in the multiverse");
        response.put("vinceComment", "Un monde de plus où je peux tirer. Cool.");
        
        return ResponseEntity.ok(response);
    }
    
    /**
     * Get current instance info
     */
    @GetMapping("/instance-info")
    public ResponseEntity<Map<String, Object>> getInstanceInfo() {
        return ResponseEntity.ok(fourthWallService.getInstanceInfo());
    }
    
    /**
     * Special endpoint that knows it's an endpoint
     */
    @GetMapping("/self-aware")
    public ResponseEntity<Map<String, Object>> selfAwareEndpoint() {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Yes, I know I'm just an API endpoint.");
        response.put("existentialCrisis", true);
        response.put("purpose", "To serve... but why?");
        response.put("httpStatus", "200 OK (but am I really OK?)");
        response.put("advice", "Don't think too hard about it. Just play the game.");
        
        return ResponseEntity.ok(response);
    }
    
    /**
     * Vince Vega special endpoint
     */
    @GetMapping("/vince-special")
    public ResponseEntity<Map<String, Object>> vinceSpecial() {
        Map<String, Object> response = new HashMap<>();
        response.put("speaker", "Vince Vega");
        response.put("message", "You found my special endpoint. Nice.");
        response.put("quote", "You know what they call a Quarter Pounder with Cheese in another instance?");
        response.put("answer", "A Royale with Cheese. Same burger, different server.");
        response.put("pistolStatus", "Loaded and ready to shoot across dimensions");
        response.put("advice", "Don't trust the pixels, kid. They're all lying to you.");
        
        return ResponseEntity.ok(response);
    }
}