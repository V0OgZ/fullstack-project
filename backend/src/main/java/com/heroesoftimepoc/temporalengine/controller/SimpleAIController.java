package com.heroesoftimepoc.temporalengine.controller;

import com.heroesoftimepoc.temporalengine.service.SimpleAIService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.HashMap;

/**
 * Contrôleur simplifié pour l'IA de jeu
 * Endpoints pour créer des parties IA vs Joueur
 */
@RestController
@RequestMapping("/api/temporal/ai")
@CrossOrigin(origins = "*")
public class SimpleAIController {
    
    @Autowired
    private SimpleAIService simpleAIService;
    
    /**
     * Crée une nouvelle partie IA vs Joueur
     */
    @PostMapping("/create-game")
    public ResponseEntity<Map<String, Object>> createAIGame(@RequestBody Map<String, Object> request) {
        String playerName = (String) request.get("playerName");
        String scenario = (String) request.getOrDefault("scenario", "default");
        
        if (playerName == null || playerName.trim().isEmpty()) {
            playerName = "Joueur";
        }
        
        Map<String, Object> response = simpleAIService.createAIGame(playerName, scenario);
        return ResponseEntity.ok(response);
    }
    
    /**
     * L'IA joue son tour
     */
    @PostMapping("/play-turn/{gameId}")
    public ResponseEntity<Map<String, Object>> playAITurn(@PathVariable Long gameId) {
        Map<String, Object> response = simpleAIService.playAITurn(gameId);
        return ResponseEntity.ok(response);
    }
    
    /**
     * Obtient les statistiques de l'IA
     */
    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getAIStats() {
        Map<String, Object> stats = simpleAIService.getAIStats();
        return ResponseEntity.ok(stats);
    }
    
    /**
     * Test rapide de l'IA
     */
    @PostMapping("/quick-test")
    public ResponseEntity<Map<String, Object>> quickTest() {
        Map<String, Object> response = simpleAIService.quickTest();
        return ResponseEntity.ok(response);
    }
} 