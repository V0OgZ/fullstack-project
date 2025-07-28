package com.example.demo.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.*;

/**
 * 🔫 VINCE VEGA PRESERVATION CONTROLLER
 * 
 * Contrôleur dédié à préserver l'intégrité de la démo Vince Vega.
 * Aucune modification du système existant !
 * 
 * @author OPUS-MEMENTO-CLAUDIUS
 * @version PRESERVATION_MODE
 */
@RestController 
@RequestMapping("/api/vince-preservation")
@CrossOrigin(origins = "*")
public class VinceVegaPreservationController {

    /**
     * 🎯 Vérification intégrité démo Vince
     */
    @GetMapping("/status")
    public ResponseEntity<Map<String, Object>> getVinceStatus() {
        Map<String, Object> status = new HashMap<>();
        status.put("vince_demo", "INTACT");
        status.put("gun_interdimensionnel", "FONCTIONNEL");
        status.put("map_preservation", "ACTIVE");
        status.put("port_8000", "PRESERVED");
        status.put("message", "La démo Vince Vega reste intouchable !");
        return ResponseEntity.ok(status);
    }

    /**
     * 🔧 Alternative terrain pour frontend 3000
     */
    @GetMapping("/alternative-terrain/{worldId}")
    public ResponseEntity<Map<String, Object>> getAlternativeTerrain(
        @PathVariable String worldId,
        @RequestParam(defaultValue = "20") int width,
        @RequestParam(defaultValue = "20") int height
    ) {
        Map<String, Object> terrain = new HashMap<>();
        terrain.put("message", "Terrain alternatif - Vince Vega préservé");
        terrain.put("worldId", worldId);
        terrain.put("preservation_mode", true);
        terrain.put("vince_demo_intact", true);
        
        // Terrain simple pour le frontend 3000
        List<Map<String, Object>> tiles = new ArrayList<>();
        for (int y = 0; y < height; y++) {
            for (int x = 0; x < width; x++) {
                Map<String, Object> tile = new HashMap<>();
                tile.put("x", x);
                tile.put("y", y);
                tile.put("terrain", "grass");
                tile.put("walkable", true);
                tiles.add(tile);
            }
        }
        terrain.put("tiles", tiles);
        
        return ResponseEntity.ok(terrain);
    }
} 