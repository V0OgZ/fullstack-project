package com.heroesoftimepoc.temporalengine.controller;

import com.heroesoftimepoc.temporalengine.model.ForgedObject;
import com.heroesoftimepoc.temporalengine.service.RunicForgeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/runic-forge")
@CrossOrigin(origins = "*")
public class RunicForgeController {

    @Autowired
    private RunicForgeService runicForgeService;

    /**
     * Forger un objet via grammaire runique
     */
    @PostMapping("/forge")
    public ResponseEntity<Map<String, Object>> forgeObject(@RequestBody Map<String, String> request) {
        try {
            String grammar = request.get("grammar");
            String heroName = request.get("heroName");
            Long gameId = Long.parseLong(request.getOrDefault("gameId", "1"));

            if (grammar == null || grammar.trim().isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "error", "Grammaire runique requise"
                ));
            }

            ForgedObject forgedObject = runicForgeService.forgeObject(grammar, heroName, gameId);
            
            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Objet forgé avec succès",
                "forgedObject", Map.of(
                    "id", forgedObject.getId(),
                    "name", forgedObject.getName(),
                    "type", forgedObject.getType(),
                    "power", forgedObject.getPower(),
                    "description", forgedObject.getDescription(),
                    "risks", forgedObject.getRisks(),
                    "createdAt", forgedObject.getCreatedAt()
                )
            ));

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "error", "Erreur de forge: " + e.getMessage()
            ));
        }
    }

    /**
     * Obtenir la liste des objets forgés
     */
    @GetMapping("/objects")
    public ResponseEntity<Map<String, Object>> getForgedObjects(@RequestParam(defaultValue = "1") Long gameId) {
        try {
            List<ForgedObject> objects = runicForgeService.getForgedObjects(gameId);
            
            return ResponseEntity.ok(Map.of(
                "success", true,
                "objects", objects.stream().map(obj -> Map.of(
                    "id", obj.getId(),
                    "name", obj.getName(),
                    "type", obj.getType(),
                    "power", obj.getPower(),
                    "description", obj.getDescription(),
                    "risks", obj.getRisks(),
                    "createdAt", obj.getCreatedAt()
                )).toList()
            ));

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "error", "Erreur lors de la récupération: " + e.getMessage()
            ));
        }
    }

    /**
     * Obtenir un objet forgé spécifique
     */
    @GetMapping("/objects/{objectId}")
    public ResponseEntity<Map<String, Object>> getForgedObject(@PathVariable Long objectId) {
        try {
            ForgedObject obj = runicForgeService.getForgedObject(objectId);
            
            if (obj == null) {
                return ResponseEntity.notFound().build();
            }

            return ResponseEntity.ok(Map.of(
                "success", true,
                "object", Map.of(
                    "id", obj.getId(),
                    "name", obj.getName(),
                    "type", obj.getType(),
                    "power", obj.getPower(),
                    "description", obj.getDescription(),
                    "risks", obj.getRisks(),
                    "createdAt", obj.getCreatedAt()
                )
            ));

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "error", "Erreur lors de la récupération: " + e.getMessage()
            ));
        }
    }

    /**
     * Utiliser un objet forgé
     */
    @PostMapping("/objects/{objectId}/use")
    public ResponseEntity<Map<String, Object>> useForgedObject(
            @PathVariable Long objectId,
            @RequestBody Map<String, String> request) {
        try {
            String heroName = request.get("heroName");
            Long gameId = Long.parseLong(request.getOrDefault("gameId", "1"));

            if (heroName == null || heroName.trim().isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "error", "Nom du héros requis"
                ));
            }

            Map<String, Object> result = runicForgeService.useForgedObject(objectId, heroName, gameId);
            
            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Objet utilisé avec succès",
                "result", result
            ));

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "error", "Erreur lors de l'utilisation: " + e.getMessage()
            ));
        }
    }

    /**
     * Obtenir les exemples de grammaire runique
     */
    @GetMapping("/grammar-examples")
    public ResponseEntity<Map<String, Object>> getGrammarExamples() {
        Map<String, Object> examples = new HashMap<>();
        
        examples.put("basic_sword", Map.of(
            "grammar", "FORGE(SWORD, POWER:50, ELEMENT:FIRE)",
            "description", "Épée de feu basique",
            "risk", "Faible"
        ));
        
        examples.put("quantum_mirror", Map.of(
            "grammar", "FORGE(MIRROR, POWER:100, QUANTUM:TRUE, AMPLITUDE:0.8)",
            "description", "Miroir quantique avec amplitude 0.8",
            "risk", "Moyen"
        ));
        
        examples.put("temporal_artifact", Map.of(
            "grammar", "FORGE(ARTIFACT, POWER:200, TEMPORAL:TRUE, DELTA_T:3)",
            "description", "Artefact temporel avec décalage de 3 tours",
            "risk", "Élevé"
        ));
        
        examples.put("chaos_weapon", Map.of(
            "grammar", "FORGE(WEAPON, POWER:150, CHAOS:TRUE, PROBABILITY:0.6)",
            "description", "Arme chaotique avec 60% de chance d'effet",
            "risk", "Très élevé"
        ));
        
        examples.put("omega_artifact", Map.of(
            "grammar", "FORGE(ARTIFACT, POWER:999, OMEGA:TRUE, GROFI:TRUE)",
            "description", "Artefact Oméga avec pouvoir GROFI",
            "risk", "Extrême - Peut tuer le héros"
        ));

        return ResponseEntity.ok(Map.of(
            "success", true,
            "examples", examples
        ));
    }

    /**
     * Valider une grammaire runique sans la forger
     */
    @PostMapping("/validate")
    public ResponseEntity<Map<String, Object>> validateGrammar(@RequestBody Map<String, String> request) {
        try {
            String grammar = request.get("grammar");
            
            if (grammar == null || grammar.trim().isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "error", "Grammaire runique requise"
                ));
            }

            Map<String, Object> validation = runicForgeService.validateGrammar(grammar);
            
            return ResponseEntity.ok(Map.of(
                "success", true,
                "valid", validation.get("valid"),
                "analysis", validation.get("analysis"),
                "risks", validation.get("risks"),
                "estimatedPower", validation.get("estimatedPower")
            ));

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "error", "Erreur de validation: " + e.getMessage()
            ));
        }
    }

    /**
     * Obtenir les statistiques de forge
     */
    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getForgeStats(@RequestParam(defaultValue = "1") Long gameId) {
        try {
            Map<String, Object> stats = runicForgeService.getForgeStats(gameId);
            
            return ResponseEntity.ok(Map.of(
                "success", true,
                "stats", stats
            ));

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "error", "Erreur lors de la récupération des stats: " + e.getMessage()
            ));
        }
    }

    /**
     * Health check pour la Forge Runique
     */
    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> health() {
        return ResponseEntity.ok(Map.of(
            "service", "Runic Forge API",
            "status", "healthy",
            "version", "1.0",
            "timestamp", System.currentTimeMillis()
        ));
    }
} 