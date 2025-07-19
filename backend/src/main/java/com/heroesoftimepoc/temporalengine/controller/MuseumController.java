package com.heroesoftimepoc.temporalengine.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.ResponseEntity;
import org.springframework.http.MediaType;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;

/**
 * 🏛️ CONTRÔLEUR DU MUSÉE LÉGENDAIRE
 * Gère l'accès aux collections épiques de Vincent
 */
@RestController
@RequestMapping("/api/museum")
@CrossOrigin(origins = "*")
public class MuseumController {

    /**
     * 🎭 Endpoint pour accéder à la collection légendaire JSON
     */
    @GetMapping("/legendary-collection")
    public ResponseEntity<Map<String, Object>> getLegendaryCollection() {
        try {
            // Lire le fichier JSON légendaire
            String jsonPath = "MUSEUM/COLLECTION_LEGENDAIRE.json";
            String jsonContent = Files.readString(Paths.get(jsonPath));
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "🏛️ Bienvenue dans le Musée Légendaire de Vincent !");
            response.put("collection", jsonContent);
            response.put("easter_egg", "ROFL ! Tu as trouvé l'easter egg ! 🤣");
            
            return ResponseEntity.ok(response);
        } catch (IOException e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("error", "Collection légendaire temporairement indisponible");
            error.put("hint", "Essaie de lancer le script #151 ! 😉");
            
            return ResponseEntity.ok(error);
        }
    }

    /**
     * 🎯 Endpoint pour les statistiques du héros Vincent
     */
    @GetMapping("/vincent-stats")
    public ResponseEntity<Map<String, Object>> getVincentStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("heroName", "Vincent le Collectionneur Légendaire");
        stats.put("level", 152);
        stats.put("totalScripts", 152);
        stats.put("testScripts", 46);
        stats.put("successRate", "85%");
        stats.put("specialQuote", "46 scripts de test ? CHALLENGE ACCEPTED ! 😎");
        stats.put("legendaryArtifacts", new String[]{
            "Script #151 - L'Ultime",
            "Collection JSON Épique", 
            "Clé du Musée Temporel"
        });
        stats.put("achievement", "🏆 Créateur du Dashboard Unifié");
        
        return ResponseEntity.ok(stats);
    }

    /**
     * 🎪 Endpoint pour déclencher l'effet ROFL
     */
    @PostMapping("/rofl-effect")
    public ResponseEntity<Map<String, Object>> triggerRoflEffect() {
        Map<String, Object> effect = new HashMap<>();
        effect.put("success", true);
        effect.put("message", "ROFL ! 🤣 Effet légendaire déclenché !");
        effect.put("confusionRadius", 152);
        effect.put("duration", "46 secondes");
        effect.put("specialEffect", "Tous les ennemis sont confus par tant d'épicité !");
        effect.put("soundEffect", "legendary_laughter.mp3");
        
        return ResponseEntity.ok(effect);
    }

    /**
     * 🔧 Endpoint pour invoquer le Script #151
     */
    @PostMapping("/invoke-script-151")
    public ResponseEntity<Map<String, Object>> invokeScript151() {
        Map<String, Object> result = new HashMap<>();
        result.put("success", true);
        result.put("message", "🚀 Script #151 invoqué avec succès !");
        result.put("effect", "Tous les services Heroes of Time sont maintenant actifs");
        result.put("servicesStarted", new String[]{
            "Dashboard Unifié (9000)",
            "JSON Visualizer (5170)", 
            "HOTS Visualizer (5171)",
            "Interface Temporelle (5174)",
            "Frontend (8000)",
            "Test Runner (8888)"
        });
        result.put("legendaryQuote", "Le Script Ultime ne faillit jamais ! ⚡");
        
        return ResponseEntity.ok(result);
    }
} 