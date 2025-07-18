package com.heroesoftimepoc.temporalengine.controller;

import com.heroesoftimepoc.temporalengine.service.GameScriptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/temporal/scripts")
@CrossOrigin(origins = "*")
public class GameScriptController {

    @Autowired
    private GameScriptService gameScriptService;

    /**
     * Exécute un script .hots
     */
    @PostMapping("/execute")
    public ResponseEntity<?> executeScript(@RequestBody Map<String, Object> request) {
        try {
            String scriptFile = (String) request.get("scriptFile");
            String parser = (String) request.getOrDefault("parser", "regex");
            Long gameId = request.containsKey("gameId") ? 
                Long.parseLong(request.get("gameId").toString()) : null;
            
            Map<String, Object> options = new HashMap<>();
            options.put("benchmark", request.getOrDefault("benchmark", false));
            options.put("verbose", request.getOrDefault("verbose", false));
            
            Map<String, Object> result = gameScriptService.executeScriptFile(
                scriptFile, parser, gameId, options
            );
            
            return ResponseEntity.ok(result);
            
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    /**
     * Liste les scripts disponibles
     */
    @GetMapping("/list")
    public ResponseEntity<?> listScripts() {
        try {
            Map<String, Object> result = gameScriptService.listAvailableScripts();
            return ResponseEntity.ok(result);
            
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    /**
     * Benchmark rapide entre parsers
     */
    @PostMapping("/benchmark")
    public ResponseEntity<?> benchmarkParsers(@RequestBody Map<String, Object> request) {
        try {
            String scriptFile = (String) request.getOrDefault("scriptFile", "tests/parser-comparison.hots");
            
            Map<String, Object> options = new HashMap<>();
            options.put("benchmark", true);
            options.put("verbose", false);
            
            Map<String, Object> result = gameScriptService.executeScriptFile(
                scriptFile, "regex", null, options
            );
            
            return ResponseEntity.ok(result);
            
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    /**
     * Exécute un script avec logs détaillés
     */
    @PostMapping("/execute-verbose")
    public ResponseEntity<?> executeScriptVerbose(@RequestBody Map<String, Object> request) {
        try {
            String scriptFile = (String) request.get("scriptFile");
            String parser = (String) request.getOrDefault("parser", "regex");
            
            Map<String, Object> options = new HashMap<>();
            options.put("benchmark", false);
            options.put("verbose", true);
            
            Map<String, Object> result = gameScriptService.executeScriptFile(
                scriptFile, parser, null, options
            );
            
            return ResponseEntity.ok(result);
            
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
} 