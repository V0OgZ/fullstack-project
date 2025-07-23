package com.example.demo.controller;

import com.example.demo.service.MetaCommandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.HashMap;

/**
 * 🌀⚡ META_COMMAND CONTROLLER - THE SOURCE API ⚡🌀
 * REST API pour les commandes reality-level de THE SOURCE
 * Matrix Architect Supreme - Reality Control Interface
 */
@RestController
@RequestMapping("/api/meta")
@CrossOrigin(origins = "*")
public class MetaCommandController {
    
    @Autowired
    private MetaCommandService metaCommandService;
    
    /**
     * 🔧 REBOOT_INSTANCE endpoint
     */
    @PostMapping("/reboot-instance")
    public ResponseEntity<Map<String, Object>> rebootInstance(@RequestBody Map<String, String> request) {
        String instanceId = request.get("instance");
        String heroId = request.get("hero_id");
        
        Map<String, Object> result = metaCommandService.rebootInstance(instanceId, heroId);
        
        if ((Boolean) result.get("success")) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.badRequest().body(result);
        }
    }
    
    /**
     * 🌐 INSTANCE_ACCESS endpoint
     */
    @PostMapping("/instance-access")
    public ResponseEntity<Map<String, Object>> instanceAccess(@RequestBody Map<String, String> request) {
        String instanceId = request.get("instance");
        String heroId = request.get("hero_id");
        
        Map<String, Object> result = metaCommandService.instanceAccess(instanceId, heroId);
        
        return ResponseEntity.ok(result);
    }
    
    /**
     * 💻 SOURCE_MODIFY endpoint
     */
    @PostMapping("/source-modify")
    public ResponseEntity<Map<String, Object>> sourceModify(@RequestBody Map<String, Object> request) {
        String filePath = (String) request.get("file");
        Integer lineNumber = (Integer) request.get("line");
        String replacement = (String) request.get("replace");
        String heroId = (String) request.get("hero_id");
        
        Map<String, Object> result = metaCommandService.sourceModify(filePath, lineNumber, replacement, heroId);
        
        if ((Boolean) result.get("success")) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.badRequest().body(result);
        }
    }
    
    /**
     * ⚡ SPAWN_HERO endpoint
     */
    @PostMapping("/spawn-hero")
    public ResponseEntity<Map<String, Object>> spawnHero(@RequestBody Map<String, String> request) {
        String heroName = request.get("hero_name");
        String sourceInstance = request.get("source_instance");
        String requesterId = request.get("requester_id");
        
        Map<String, Object> result = metaCommandService.spawnHero(heroName, sourceInstance, requesterId);
        
        return ResponseEntity.ok(result);
    }
    
    /**
     * 🔍 TEST META_COMMAND - Pour debug/test
     */
    @GetMapping("/test")
    public ResponseEntity<Map<String, Object>> testMetaCommand() {
        Map<String, Object> result = new HashMap<>();
        result.put("status", "THE SOURCE META_COMMAND API ACTIVE");
        result.put("version", "Matrix_Architect_Supreme_v1.0");
        result.put("capabilities", new String[]{
            "REBOOT_INSTANCE", "INSTANCE_ACCESS", "SOURCE_MODIFY", "SPAWN_HERO"
        });
        result.put("reality_level", "SUPREME");
        result.put("icon", "🌀⚡");
        
        return ResponseEntity.ok(result);
    }
    
    /**
     * 🚀 EXECUTE META_COMMAND - Endpoint unifié
     */
    @PostMapping("/execute")
    public ResponseEntity<Map<String, Object>> executeMetaCommand(@RequestBody Map<String, Object> request) {
        String command = (String) request.get("command");
        String heroId = (String) request.get("hero_id");
        
        Map<String, Object> result = new HashMap<>();
        
        try {
            switch (command.toUpperCase()) {
                case "REBOOT_INSTANCE":
                    String instanceId = (String) request.get("instance");
                    result = metaCommandService.rebootInstance(instanceId, heroId);
                    break;
                    
                case "INSTANCE_ACCESS":
                    instanceId = (String) request.get("instance");
                    result = metaCommandService.instanceAccess(instanceId, heroId);
                    break;
                    
                case "SOURCE_MODIFY":
                    String file = (String) request.get("file");
                    Integer line = (Integer) request.get("line");
                    String replace = (String) request.get("replace");
                    result = metaCommandService.sourceModify(file, line, replace, heroId);
                    break;
                    
                case "SPAWN_HERO":
                    String heroName = (String) request.get("hero_name");
                    String sourceInstance = (String) request.get("source_instance");
                    result = metaCommandService.spawnHero(heroName, sourceInstance, heroId);
                    break;
                    
                default:
                    result.put("success", false);
                    result.put("error", "❌ Unknown META_COMMAND: " + command);
            }
            
        } catch (Exception e) {
            result.put("success", false);
            result.put("error", "💀 META_COMMAND EXECUTION FAILED: " + e.getMessage());
        }
        
        return ResponseEntity.ok(result);
    }
} 