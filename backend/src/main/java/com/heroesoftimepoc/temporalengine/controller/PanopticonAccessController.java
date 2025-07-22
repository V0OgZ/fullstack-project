package com.heroesoftimepoc.temporalengine.controller;

import com.heroesoftimepoc.temporalengine.service.PanopticonAccessService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * Contrôleur pour l'accès au Panopticon via le Joint Oublié de Jean-Grofignon
 */
@RestController
@RequestMapping("/api/temporal/panopticon")
public class PanopticonAccessController {

    @Autowired
    private PanopticonAccessService panopticonAccessService;

    /**
     * Active l'accès au Panopticon via le Joint Oublié
     */
    @PostMapping("/joint-access/{gameId}")
    public ResponseEntity<Map<String, Object>> activateJointAccess(
            @PathVariable Long gameId,
            @RequestBody Map<String, String> request) {
        
        try {
            String heroName = request.get("heroName");
            if (heroName == null || heroName.isEmpty()) {
                return ResponseEntity.badRequest().body(createErrorResponse("Nom du héros requis"));
            }

            PanopticonAccessService.PanopticonView view = 
                panopticonAccessService.activateJointAccess(gameId, heroName);

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Accès Panopticon activé via le Joint Oublié");
            response.put("accessMode", view.getAccessMode());
            response.put("hallucinated", view.isHallucinated());
            response.put("heroName", view.getHeroName());
            response.put("activationTime", view.getActivationTime());
            response.put("gameState", view.getGameState());
            response.put("timelines", view.getTimelines());
            response.put("psiStates", view.getPsiStates());
            response.put("causalLogs", view.getCausalLogs());
            response.put("futurePredictions", view.getFuturePredictions());

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(createErrorResponse(e.getMessage()));
        }
    }

    /**
     * Obtient les informations sur le Joint Oublié
     */
    @GetMapping("/joint-info")
    public ResponseEntity<Map<String, Object>> getJointInfo() {
        Map<String, Object> info = new HashMap<>();
        info.put("name", "Le Joint Oublié de Jean-Grofignon");
        info.put("type", "artefact_légendaire");
        info.put("rarity", "unique");
        info.put("effect", "Ouvre l'accès au Panopticon en mode lecture seule hallucinée");
        info.put("accessMode", "PANOPTICON:200D:READ_ONLY");
        info.put("warning", "Effet halluciné - lecture seule - aucune modification possible");
        
        return ResponseEntity.ok(info);
    }

    /**
     * Teste l'accès au Panopticon (sans Joint)
     */
    @GetMapping("/test-access/{gameId}")
    public ResponseEntity<Map<String, Object>> testAccess(@PathVariable Long gameId) {
        try {
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Test d'accès Panopticon");
            response.put("gameId", gameId);
            response.put("accessMode", "TEST");
            response.put("hallucinated", false);
            response.put("note", "Accès réel nécessite le Joint Oublié de Jean-Grofignon");
            
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(createErrorResponse(e.getMessage()));
        }
    }

    /**
     * Obtient les logs hallucinés du Panopticon
     */
    @GetMapping("/hallucinated-logs/{gameId}")
    public ResponseEntity<Map<String, Object>> getHallucinatedLogs(@PathVariable Long gameId) {
        try {
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Logs hallucinés du Panopticon");
            response.put("gameId", gameId);
            response.put("logs", new String[]{
                "ψ001: COLLAPSE(conscience_joueur) → GAIN(ontic_insight)",
                "ψ002: OBSERVER(système_jeu) → COMPREHENSION(mécaniques_internes)",
                "ψ003: HALLUCINATION(timeline_parallèle) → VISION(multivers)",
                "ψ004: META_LEVEL(200D) → ACCESS(panopticon_total)",
                "ψ005: CONSCIOUSNESS_EXPANSION → REALITY_AWARENESS"
            });
            
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(createErrorResponse(e.getMessage()));
        }
    }

    /**
     * Crée une réponse d'erreur
     */
    private Map<String, Object> createErrorResponse(String message) {
        Map<String, Object> error = new HashMap<>();
        error.put("success", false);
        error.put("message", message);
        return error;
    }
} 