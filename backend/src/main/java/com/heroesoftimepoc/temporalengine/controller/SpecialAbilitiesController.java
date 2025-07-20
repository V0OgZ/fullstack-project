package com.heroesoftimepoc.temporalengine.controller;

import com.heroesoftimepoc.temporalengine.service.SpecialAbilitiesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/special-abilities")
@CrossOrigin(origins = "*")
public class SpecialAbilitiesController {

    @Autowired
    private SpecialAbilitiesService specialAbilitiesService;

    /**
     * Exécuter une Frappe Pré-Existante
     */
    @PostMapping("/pre-existence-strike")
    public ResponseEntity<Map<String, Object>> executePreExistenceStrike(@RequestBody Map<String, String> request) {
        try {
            String heroName = request.get("heroName");
            String targetName = request.get("targetName");
            Long gameId = Long.parseLong(request.getOrDefault("gameId", "1"));

            if (heroName == null || targetName == null) {
                return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "error", "Nom du héros et de la cible requis"
                ));
            }

            Map<String, Object> result = specialAbilitiesService.executePreExistenceStrike(heroName, targetName, gameId);
            return ResponseEntity.ok(result);

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "error", "Erreur lors de la Frappe Pré-Existante: " + e.getMessage()
            ));
        }
    }

    /**
     * Exécuter une Infection Mémorielle
     */
    @PostMapping("/memory-infection")
    public ResponseEntity<Map<String, Object>> executeMemoryInfection(@RequestBody Map<String, String> request) {
        try {
            String heroName = request.get("heroName");
            String targetName = request.get("targetName");
            Long gameId = Long.parseLong(request.getOrDefault("gameId", "1"));

            if (heroName == null || targetName == null) {
                return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "error", "Nom du héros et de la cible requis"
                ));
            }

            Map<String, Object> result = specialAbilitiesService.executeMemoryInfection(heroName, targetName, gameId);
            return ResponseEntity.ok(result);

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "error", "Erreur lors de l'Infection Mémorielle: " + e.getMessage()
            ));
        }
    }

    /**
     * Exécuter une Recompilation de la Réalité
     */
    @PostMapping("/reality-recompile")
    public ResponseEntity<Map<String, Object>> executeRealityRecompile(@RequestBody Map<String, String> request) {
        try {
            String heroName = request.get("heroName");
            Long gameId = Long.parseLong(request.getOrDefault("gameId", "1"));

            if (heroName == null) {
                return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "error", "Nom du héros requis"
                ));
            }

            Map<String, Object> result = specialAbilitiesService.executeRealityRecompile(heroName, gameId);
            return ResponseEntity.ok(result);

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "error", "Erreur lors de la Recompilation: " + e.getMessage()
            ));
        }
    }

    /**
     * Exécuter un Effacement de l'Existence (Chlamydius)
     */
    @PostMapping("/scribe-nonexistence")
    public ResponseEntity<Map<String, Object>> executeScribeNonexistence(@RequestBody Map<String, String> request) {
        try {
            String heroName = request.get("heroName");
            String targetName = request.get("targetName");
            Long gameId = Long.parseLong(request.getOrDefault("gameId", "1"));

            if (heroName == null || targetName == null) {
                return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "error", "Nom du héros et de la cible requis"
                ));
            }

            Map<String, Object> result = specialAbilitiesService.executeScribeNonexistence(heroName, targetName, gameId);
            return ResponseEntity.ok(result);

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "error", "Erreur lors de l'Effacement: " + e.getMessage()
            ));
        }
    }

    /**
     * Exécuter la Transformation Oméga Ultime (Omega-Zéro)
     */
    @PostMapping("/omega-zero-ultimate")
    public ResponseEntity<Map<String, Object>> executeOmegaZeroUltimate(@RequestBody Map<String, String> request) {
        try {
            String heroName = request.get("heroName");
            Long gameId = Long.parseLong(request.getOrDefault("gameId", "1"));

            if (heroName == null) {
                return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "error", "Nom du héros requis"
                ));
            }

            Map<String, Object> result = specialAbilitiesService.executeOmegaZeroUltimate(heroName, gameId);
            return ResponseEntity.ok(result);

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "error", "Erreur lors de la Transformation: " + e.getMessage()
            ));
        }
    }

    /**
     * Obtenir la liste des capacités spéciales disponibles
     */
    @GetMapping("/list")
    public ResponseEntity<Map<String, Object>> getAvailableAbilities() {
        try {
            Map<String, Object> abilities = specialAbilitiesService.getAvailableAbilities();
            
            return ResponseEntity.ok(Map.of(
                "success", true,
                "abilities", abilities
            ));

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "error", "Erreur lors de la récupération: " + e.getMessage()
            ));
        }
    }

    /**
     * Health check pour les capacités spéciales
     */
    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> health() {
        return ResponseEntity.ok(Map.of(
            "service", "Special Abilities API",
            "status", "healthy",
            "version", "1.0",
            "timestamp", System.currentTimeMillis()
        ));
    }
} 