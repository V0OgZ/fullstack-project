package com.example.demo.controller;

import com.example.demo.model.GameSave;
import com.example.demo.service.PersistenceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/persistence")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8000", "http://localhost:9000"})
public class PersistenceController {
    
    @Autowired
    private PersistenceService persistenceService;
    
    // Save game
    @PostMapping("/games/{gameId}/save")
    public ResponseEntity<Map<String, Object>> saveGame(
            @PathVariable String gameId,
            @RequestBody Map<String, Object> request) {
        
        try {
            String playerId = (String) request.get("playerId");
            String saveName = (String) request.get("saveName");
            String description = (String) request.get("description");
            
            if (playerId == null || saveName == null) {
                return ResponseEntity.badRequest().body(Map.of(
                    "error", "Missing required fields: playerId, saveName"
                ));
            }
            
            GameSave gameSave = persistenceService.saveGame(gameId, playerId, saveName, description);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("saveId", gameSave.getId());
            response.put("saveName", gameSave.getSaveName());
            response.put("message", "Game saved successfully");
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                "error", e.getMessage()
            ));
        }
    }
    
    // Auto-save game
    @PostMapping("/games/{gameId}/autosave")
    public ResponseEntity<Map<String, Object>> autoSaveGame(@PathVariable String gameId) {
        try {
            GameSave gameSave = persistenceService.autoSaveGame(gameId);
            
            if (gameSave != null) {
                Map<String, Object> response = new HashMap<>();
                response.put("success", true);
                response.put("saveId", gameSave.getId());
                response.put("saveName", gameSave.getSaveName());
                response.put("message", "Auto-save successful");
                
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body(Map.of(
                    "message", "Auto-save skipped"
                ));
            }
            
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                "error", e.getMessage()
            ));
        }
    }
    
    // Load game
    @PostMapping("/saves/{saveId}/load")
    public ResponseEntity<Map<String, Object>> loadGame(
            @PathVariable Long saveId,
            @RequestBody Map<String, Object> request) {
        
        try {
            String playerId = (String) request.get("playerId");
            
            if (playerId == null) {
                return ResponseEntity.badRequest().body(Map.of(
                    "error", "Missing required field: playerId"
                ));
            }
            
            Map<String, Object> gameState = persistenceService.loadGame(saveId, playerId);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("gameState", gameState);
            response.put("message", "Game loaded successfully");
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                "error", e.getMessage()
            ));
        }
    }
    
    // Load latest auto-save
    @PostMapping("/games/{gameId}/load-autosave")
    public ResponseEntity<Map<String, Object>> loadAutoSave(
            @PathVariable String gameId,
            @RequestBody Map<String, Object> request) {
        
        try {
            String playerId = (String) request.get("playerId");
            
            if (playerId == null) {
                return ResponseEntity.badRequest().body(Map.of(
                    "error", "Missing required field: playerId"
                ));
            }
            
            Map<String, Object> gameState = persistenceService.loadLatestAutoSave(gameId, playerId);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("gameState", gameState);
            response.put("message", "Auto-save loaded successfully");
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                "error", e.getMessage()
            ));
        }
    }
    
    // List saves
    @GetMapping("/saves")
    public ResponseEntity<Map<String, Object>> listSaves(@RequestParam String playerId) {
        try {
            List<Map<String, Object>> saves = persistenceService.listSaves(playerId);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("saves", saves);
            response.put("count", saves.size());
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                "error", e.getMessage()
            ));
        }
    }
    
    // Delete save
    @DeleteMapping("/saves/{saveId}")
    public ResponseEntity<Map<String, Object>> deleteSave(
            @PathVariable Long saveId,
            @RequestParam String playerId) {
        
        try {
            persistenceService.deleteSave(saveId, playerId);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Save deleted successfully");
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                "error", e.getMessage()
            ));
        }
    }
    
    // Export save
    @GetMapping("/saves/{saveId}/export")
    public ResponseEntity<?> exportSave(
            @PathVariable Long saveId,
            @RequestParam String playerId) {
        
        try {
            String exportData = persistenceService.exportSave(saveId, playerId);
            
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setContentDispositionFormData("attachment", "heroes_of_time_save_" + saveId + ".json");
            
            return new ResponseEntity<>(exportData, headers, HttpStatus.OK);
            
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                "error", e.getMessage()
            ));
        }
    }
    
    // Import save
    @PostMapping("/saves/import")
    public ResponseEntity<Map<String, Object>> importSave(
            @RequestBody Map<String, Object> request) {
        
        try {
            String playerId = (String) request.get("playerId");
            String exportData = (String) request.get("exportData");
            
            if (playerId == null || exportData == null) {
                return ResponseEntity.badRequest().body(Map.of(
                    "error", "Missing required fields: playerId, exportData"
                ));
            }
            
            GameSave gameSave = persistenceService.importSave(exportData, playerId);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("saveId", gameSave.getId());
            response.put("saveName", gameSave.getSaveName());
            response.put("message", "Save imported successfully");
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                "error", e.getMessage()
            ));
        }
    }
    
    // Enable/disable auto-save for a game
    @PostMapping("/games/{gameId}/autosave/toggle")
    public ResponseEntity<Map<String, Object>> toggleAutoSave(
            @PathVariable String gameId,
            @RequestBody Map<String, Object> request) {
        
        try {
            Boolean enable = (Boolean) request.get("enable");
            
            if (enable == null) {
                return ResponseEntity.badRequest().body(Map.of(
                    "error", "Missing required field: enable"
                ));
            }
            
            if (enable) {
                persistenceService.markGameForAutoSave(gameId);
            } else {
                persistenceService.unmarkGameForAutoSave(gameId);
            }
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("autoSaveEnabled", enable);
            response.put("message", "Auto-save " + (enable ? "enabled" : "disabled"));
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                "error", e.getMessage()
            ));
        }
    }
} 