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
     * ENFORCEMENT - Capacité spéciale de Walter
     * Force l'application des règles même quand il n'y en a pas
     */
    @PostMapping("/enforcement")
    public ResponseEntity<Map<String, Object>> executeEnforcement(@RequestBody Map<String, Object> request) {
        String heroName = (String) request.get("heroName");
        String targetHeroName = (String) request.get("targetHeroName");
        Long gameId = Long.valueOf(request.get("gameId").toString());
        
        Map<String, Object> result = specialAbilitiesService.executeEnforcement(heroName, targetHeroName, gameId);
        
        if ((Boolean) result.get("success")) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.badRequest().body(result);
        }
    }

    /**
     * DUDE_MODE - Capacité spéciale de The Dude
     * Transforme tout en partie de bowling cosmique
     */
    @PostMapping("/dude-mode")
    public ResponseEntity<Map<String, Object>> executeDudeMode(@RequestBody Map<String, Object> request) {
        String heroName = (String) request.get("heroName");
        Long gameId = Long.valueOf(request.get("gameId").toString());
        
        Map<String, Object> result = specialAbilitiesService.executeDudeMode(heroName, gameId);
        
        if ((Boolean) result.get("success")) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.badRequest().body(result);
        }
    }

    /**
     * QUANTUM_BOWLING - Capacité spéciale du Grand Lebowski Quantique
     * Bowling cosmique qui perturbe la réalité
     */
    @PostMapping("/quantum-bowling")
    public ResponseEntity<Map<String, Object>> executeQuantumBowling(@RequestBody Map<String, Object> request) {
        String heroName = (String) request.get("heroName");
        Long gameId = Long.valueOf(request.get("gameId").toString());
        
        Map<String, Object> result = specialAbilitiesService.executeQuantumBowling(heroName, gameId);
        
        if ((Boolean) result.get("success")) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.badRequest().body(result);
        }
    }

    /**
     * PLAN_FOIREUX - Capacité spéciale de Ribouldingue
     */
    @PostMapping("/plan-foireux")
    public ResponseEntity<Map<String, Object>> executePlanFoireux(@RequestBody Map<String, Object> request) {
        String heroName = (String) request.get("heroName");
        Long gameId = Long.valueOf(request.get("gameId").toString());
        
        Map<String, Object> result = specialAbilitiesService.executePlanFoireux(heroName, gameId);
        
        if ((Boolean) result.get("success")) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.badRequest().body(result);
        }
    }

    /**
     * PLAN_TROP_COMPLIQUE - Capacité spéciale de Croquignol
     */
    @PostMapping("/plan-trop-complique")
    public ResponseEntity<Map<String, Object>> executePlanTropComplique(@RequestBody Map<String, Object> request) {
        String heroName = (String) request.get("heroName");
        Long gameId = Long.valueOf(request.get("gameId").toString());
        
        Map<String, Object> result = specialAbilitiesService.executePlanTropComplique(heroName, gameId);
        
        if ((Boolean) result.get("success")) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.badRequest().body(result);
        }
    }

    /**
     * ESQUIVE_TOTALE - Capacité spéciale de Filochard
     */
    @PostMapping("/esquive-totale")
    public ResponseEntity<Map<String, Object>> executeEsquiveTotale(@RequestBody Map<String, Object> request) {
        String heroName = (String) request.get("heroName");
        Long gameId = Long.valueOf(request.get("gameId").toString());
        
        Map<String, Object> result = specialAbilitiesService.executeEsquiveTotale(heroName, gameId);
        
        if ((Boolean) result.get("success")) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.badRequest().body(result);
        }
    }

    /**
     * INTERVENTION_RATE - Capacité spéciale de Bibendum
     */
    @PostMapping("/intervention-rate")
    public ResponseEntity<Map<String, Object>> executeInterventionRate(@RequestBody Map<String, Object> request) {
        String heroName = (String) request.get("heroName");
        Long gameId = Long.valueOf(request.get("gameId").toString());
        
        Map<String, Object> result = specialAbilitiesService.executeInterventionRate(heroName, gameId);
        
        if ((Boolean) result.get("success")) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.badRequest().body(result);
        }
    }

    /**
     * MAUVAISE_PISTE - Capacité spéciale de PiedsPlats
     */
    @PostMapping("/mauvaise-piste")
    public ResponseEntity<Map<String, Object>> executeMauvaisePiste(@RequestBody Map<String, Object> request) {
        String heroName = (String) request.get("heroName");
        Long gameId = Long.valueOf(request.get("gameId").toString());
        
        Map<String, Object> result = specialAbilitiesService.executeMauvaisePiste(heroName, gameId);
        
        if ((Boolean) result.get("success")) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.badRequest().body(result);
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