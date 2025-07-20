package com.heroesoftimepoc.temporalengine.controller;

import com.heroesoftimepoc.temporalengine.service.TemporalEngineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * Contrôleur pour gérer la décroissance temporelle d'Anna the Martopicker
 * 
 * "Le temps n'attend personne, et ceux qui s'attardent dans le passé
 *  verront leurs constructions s'effriter comme le sable entre leurs doigts."
 *  - Anna the Martopicker, Architecte du Temps
 */
@RestController
@RequestMapping("/api/temporal/decay")
@CrossOrigin(origins = "*")
public class TemporalDecayController {

    @Autowired
    private TemporalEngineService temporalEngineService;

    /**
     * APPLIQUER : Appliquer la décroissance temporelle à un jeu
     * 
     * Endpoint: POST /api/temporal/decay/{gameId}/apply
     * 
     * Punition pour les joueurs qui restent trop longtemps dans le passé :
     * - Décroissance des bâtiments après 5 jours de retard
     * - Destruction possible après 10 jours
     * - Protection par objets de vision future
     */
    @PostMapping("/{gameId}/apply")
    public ResponseEntity<Map<String, Object>> applyTemporalDecay(@PathVariable Long gameId) {
        try {
            Map<String, Object> result = temporalEngineService.applyTemporalDecay(gameId);
            
            if ((Boolean) result.get("success")) {
                return ResponseEntity.ok(result);
            } else {
                return ResponseEntity.badRequest().body(result);
            }
        } catch (Exception e) {
            Map<String, Object> error = Map.of(
                "success", false,
                "error", "Failed to apply temporal decay: " + e.getMessage()
            );
            return ResponseEntity.internalServerError().body(error);
        }
    }

    /**
     * RÉPARER : Réparer un bâtiment endommagé par la décroissance
     * 
     * Endpoint: POST /api/temporal/decay/{gameId}/repair
     * 
     * Coût : 10 énergie temporelle
     * Conditions : Le héros doit posséder le bâtiment
     */
    @PostMapping("/{gameId}/repair")
    public ResponseEntity<Map<String, Object>> repairDecayedBuilding(
            @PathVariable Long gameId,
            @RequestBody Map<String, Object> request) {
        
        try {
            String heroName = (String) request.get("heroName");
            Integer x = (Integer) request.get("x");
            Integer y = (Integer) request.get("y");
            
            if (heroName == null || x == null || y == null) {
                Map<String, Object> error = Map.of(
                    "success", false,
                    "error", "Missing required parameters: heroName, x, y"
                );
                return ResponseEntity.badRequest().body(error);
            }
            
            Map<String, Object> result = temporalEngineService.repairDecayedBuilding(gameId, heroName, x, y);
            
            if ((Boolean) result.get("success")) {
                return ResponseEntity.ok(result);
            } else {
                return ResponseEntity.badRequest().body(result);
            }
        } catch (Exception e) {
            Map<String, Object> error = Map.of(
                "success", false,
                "error", "Failed to repair building: " + e.getMessage()
            );
            return ResponseEntity.internalServerError().body(error);
        }
    }

    /**
     * STATISTIQUES : Obtenir les statistiques de décroissance temporelle
     * 
     * Endpoint: GET /api/temporal/decay/{gameId}/statistics
     * 
     * Retourne :
     * - Nombre de héros affectés
     * - Bâtiments endommagés/détruits
     * - Héros avec protection vision future
     * - Détails par héros
     */
    @GetMapping("/{gameId}/statistics")
    public ResponseEntity<Map<String, Object>> getTemporalDecayStatistics(@PathVariable Long gameId) {
        try {
            Map<String, Object> result = temporalEngineService.getTemporalDecayStatistics(gameId);
            
            if ((Boolean) result.get("success")) {
                return ResponseEntity.ok(result);
            } else {
                return ResponseEntity.badRequest().body(result);
            }
        } catch (Exception e) {
            Map<String, Object> error = Map.of(
                "success", false,
                "error", "Failed to get decay statistics: " + e.getMessage()
            );
            return ResponseEntity.internalServerError().body(error);
        }
    }

    /**
     * INFO : Informations sur le système de décroissance temporelle
     * 
     * Endpoint: GET /api/temporal/decay/info
     * 
     * Retourne les règles et mécaniques du système
     */
    @GetMapping("/info")
    public ResponseEntity<Map<String, Object>> getDecaySystemInfo() {
        Map<String, Object> info = Map.of(
            "system", "Temporal Decay System by Anna the Martopicker",
            "description", "Punishes players who stay too long in the past",
            "quote", "Le temps n'attend personne, et ceux qui s'attardent dans le passé verront leurs constructions s'effriter comme le sable entre leurs doigts.",
            "author", "Anna the Martopicker, Architecte du Temps",
            "mechanics", Map.of(
                "decayThreshold", 5,
                "decayRatePerDay", 0.15,
                "maxDecayDays", 10,
                "superpositionMultiplier", 2.0,
                "repairCost", 10
            ),
            "protection", Map.of(
                "futureVisionItems", "Lunettes de Wigner, Spyglass, etc.",
                "protectionEffect", "50% reduction in decay rate"
            ),
            "effects", Map.of(
                "buildings", "Damage and destruction of player buildings",
                "superposition", "Increased decay in areas with excessive quantum superposition",
                "repair", "Costs temporal energy to repair damaged buildings"
            )
        );
        
        return ResponseEntity.ok(info);
    }
} 