package com.heroesoftimepoc.temporalengine.controller;

import com.heroesoftimepoc.temporalengine.model.Game;
import com.heroesoftimepoc.temporalengine.model.Hero;
import com.heroesoftimepoc.temporalengine.model.Player;
import com.heroesoftimepoc.temporalengine.service.AdminService;
import com.heroesoftimepoc.temporalengine.service.GameService;
import com.heroesoftimepoc.temporalengine.service.SimpleAIService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * Contrôleur d'administration pour le mode multijoueur
 * Protocole Memento - Fusion Claudius activée
 */
@RestController
@RequestMapping("/api/temporal/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @Autowired
    private GameService gameService;
    
    @Autowired
    private SimpleAIService simpleAIService;

    /**
     * Exécuter une commande administrateur
     */
    @PostMapping("/execute")
    public ResponseEntity<Map<String, Object>> executeCommand(@RequestBody Map<String, Object> request) {
        try {
            String command = (String) request.get("command");
            Map<String, Object> result = adminService.executeCommand(command);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    /**
     * Créer un jeu en mode administrateur
     */
    @PostMapping("/games/create")
    public ResponseEntity<Map<String, Object>> createAdminGame(@RequestBody Map<String, Object> request) {
        try {
            Map<String, Object> result = adminService.createAdminGame(request);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    /**
     * Gérer les joueurs (ajouter, retirer, expulser)
     */
    @PostMapping("/games/{gameId}/players/manage")
    public ResponseEntity<Map<String, Object>> managePlayers(
            @PathVariable Long gameId,
            @RequestBody Map<String, Object> request) {
        try {
            String action = (String) request.get("action");
            Map<String, Object> result = adminService.managePlayers(gameId, action, request);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    /**
     * Gérer les héros (apparaître, supprimer, téléporter)
     */
    @PostMapping("/games/{gameId}/heroes/manage")
    public ResponseEntity<Map<String, Object>> manageHeroes(
            @PathVariable Long gameId,
            @RequestBody Map<String, Object> request) {
        try {
            String action = (String) request.get("action");
            Map<String, Object> result = adminService.manageHeroes(gameId, action, request);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    /**
     * Contrôle du jeu (pause, tour suivant, reset, fin)
     */
    @PostMapping("/games/{gameId}/control")
    public ResponseEntity<Map<String, Object>> controlGame(
            @PathVariable Long gameId,
            @RequestBody Map<String, Object> request) {
        try {
            String action = (String) request.get("action");
            Map<String, Object> result = adminService.controlGame(gameId, action, request);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    /**
     * Démarrage rapide d'une partie
     */
    @PostMapping("/quick-start")
    public ResponseEntity<Map<String, Object>> quickStart(@RequestBody Map<String, Object> request) {
        try {
            Map<String, Object> result = adminService.quickStart(request);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    /**
     * Test du système
     */
    @PostMapping("/test-system")
    public ResponseEntity<Map<String, Object>> testSystem() {
        try {
            Map<String, Object> result = adminService.testSystem();
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    /**
     * Exécuter une démo
     */
    @PostMapping("/demo")
    public ResponseEntity<Map<String, Object>> runDemo(@RequestBody Map<String, Object> request) {
        try {
            Map<String, Object> result = adminService.runDemo(request);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    /**
     * Obtenir les statistiques administrateur
     */
    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getAdminStats() {
        try {
            Map<String, Object> result = adminService.getAdminStats();
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    /**
     * Obtenir les logs administrateur
     */
    @GetMapping("/logs")
    public ResponseEntity<Map<String, Object>> getAdminLogs() {
        try {
            Map<String, Object> result = adminService.getAdminLogs();
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    /**
     * Nettoyage du système
     */
    @PostMapping("/cleanup")
    public ResponseEntity<Map<String, Object>> cleanup(@RequestBody Map<String, Object> request) {
        try {
            Map<String, Object> result = adminService.cleanup(request);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    // === NOUVEAUX ENDPOINTS IA ===
    
    /**
     * Créer une partie IA vs Joueur
     */
    @PostMapping("/ai/create-game")
    public ResponseEntity<Map<String, Object>> createAIGame(@RequestBody Map<String, Object> request) {
        try {
            String playerName = (String) request.get("playerName");
            String scenario = (String) request.getOrDefault("scenario", "default");
            
            if (playerName == null || playerName.trim().isEmpty()) {
                playerName = "Joueur";
            }
            
            Map<String, Object> result = simpleAIService.createAIGame(playerName, scenario);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    /**
     * L'IA joue son tour
     */
    @PostMapping("/ai/play-turn/{gameId}")
    public ResponseEntity<Map<String, Object>> playAITurn(@PathVariable Long gameId) {
        try {
            Map<String, Object> result = simpleAIService.playAITurn(gameId);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    /**
     * Obtenir les stats de l'IA
     */
    @GetMapping("/ai/stats")
    public ResponseEntity<Map<String, Object>> getAIStats() {
        try {
            Map<String, Object> result = simpleAIService.getAIStats();
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    /**
     * Test rapide de l'IA
     */
    @PostMapping("/ai/quick-test")
    public ResponseEntity<Map<String, Object>> quickAITest() {
        try {
            Map<String, Object> result = simpleAIService.quickTest();
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
} 