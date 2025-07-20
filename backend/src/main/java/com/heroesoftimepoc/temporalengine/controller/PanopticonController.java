package com.heroesoftimepoc.temporalengine.controller;

import com.heroesoftimepoc.temporalengine.service.PanopticonService;
import com.heroesoftimepoc.temporalengine.service.PanopticonService.*;
import com.heroesoftimepoc.temporalengine.service.GodViewService.Position5D;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * 🎛️ PANOPTICΩN Controller - API pour la visualisation 3D ultime
 * 
 * @author JeanGrofignon
 */
@RestController
@RequestMapping("/api/temporal/panopticon")
@CrossOrigin(origins = "*")
public class PanopticonController {
    
    @Autowired
    private PanopticonService panopticonService;
    
    /**
     * Obtenir les données de visualisation PANOPTICΩN
     */
    @GetMapping("/data/{gameId}")
    public VisualizationData getPanopticonData(@PathVariable Long gameId) {
        return panopticonService.generatePanopticonData(gameId);
    }
    
    /**
     * Activer le pouvoir ABSOLUTE_OBSERVER
     */
    @PostMapping("/activate-observer/{gameId}")
    public PanopticonView activateAbsoluteObserver(
            @PathVariable Long gameId,
            @RequestParam String heroName) {
        return panopticonService.activateAbsoluteObserver(gameId, heroName);
    }
    
    /**
     * Injecter une action dans une timeline future
     */
    @PostMapping("/inject-action/{gameId}")
    public ActionResult injectTemporalAction(
            @PathVariable Long gameId,
            @RequestParam String timelineId,
            @RequestParam int x,
            @RequestParam int y,
            @RequestParam(defaultValue = "0") int z,
            @RequestParam int day,
            @RequestParam String action) {
        
        Position5D target = new Position5D(x, y, z, timelineId, day);
        return panopticonService.injectTemporalAction(gameId, timelineId, target, action);
    }
    
    /**
     * Obtenir les métriques de debug
     */
    @GetMapping("/debug/{gameId}")
    public Map<String, Object> getDebugMetrics(@PathVariable Long gameId) {
        return panopticonService.getDebugMetrics(gameId);
    }
    
    /**
     * Endpoint spécial pour le mode développeur
     */
    @GetMapping("/dev-mode/{gameId}")
    public Map<String, Object> getDevModeData(@PathVariable Long gameId) {
        Map<String, Object> devData = panopticonService.getDebugMetrics(gameId);
        
        // Ajouter des infos supplémentaires pour le dev
        devData.put("panopticonVersion", "1.0-OMEGA");
        devData.put("visualizationEngine", "Three.js + D3.js");
        devData.put("quantumEffectsEnabled", true);
        devData.put("maxRenderablePsiStates", 1000);
        
        return devData;
    }
    
    /**
     * Simuler le vol du trésor depuis le PANOPTICΩN
     */
    @PostMapping("/simulate/treasure-theft/{gameId}")
    public ActionResult simulateTreasureTheftFromPanopticon(
            @PathVariable Long gameId,
            @RequestParam String thiefHero,
            @RequestParam int treasureX,
            @RequestParam int treasureY,
            @RequestParam int targetDay) {
        
        // Créer l'action de vol
        String action = String.format(
            "MOV(%s, @%d,%d) + TAKE(TREASURE, @%d,%d)",
            thiefHero, treasureX, treasureY, treasureX, treasureY
        );
        
        Position5D treasurePos = new Position5D(treasureX, treasureY, 0, "ℬ1", targetDay);
        
        return panopticonService.injectTemporalAction(
            gameId, "ℬ1", treasurePos, action
        );
    }
    
    /**
     * Obtenir une vue "cinématique" pour l'effet visuel ABSOLUTE_OBSERVER
     */
    @GetMapping("/cinematic/{gameId}")
    public Map<String, Object> getCinematicView(@PathVariable Long gameId) {
        VisualizationData data = panopticonService.generatePanopticonData(gameId);
        
        return Map.of(
            "cameraPath", generateCameraPath(data),
            "focusPoints", identifyFocusPoints(data),
            "effectSequence", Map.of(
                "phase1", "Timeline revelation",
                "phase2", "Quantum interference visualization",
                "phase3", "Causal connections highlight",
                "phase4", "Future possibilities overlay"
            ),
            "duration", 10000 // 10 secondes d'animation
        );
    }
    
    // Méthodes helper pour la vue cinématique
    private Object generateCameraPath(VisualizationData data) {
        // Générer un chemin de caméra pour l'animation
        return Map.of(
            "start", Map.of("x", 0, "y", 0, "z", 100),
            "waypoints", new Object[]{
                Map.of("x", 50, "y", 50, "z", 200, "time", 2000),
                Map.of("x", -50, "y", 50, "z", 300, "time", 4000),
                Map.of("x", 0, "y", 100, "z", 400, "time", 6000)
            },
            "end", Map.of("x", 0, "y", 0, "z", 500, "lookAt", Map.of("x", 0, "y", 0, "z", 0))
        );
    }
    
    private Object identifyFocusPoints(VisualizationData data) {
        // Identifier les points importants à mettre en valeur
        return data.spatialNodes.stream()
            .filter(node -> "hero".equals(node.type) || 
                           ("psi_state".equals(node.type) && "quantum".equals(node.status)))
            .limit(5)
            .map(node -> Map.of(
                "id", node.id,
                "position", node.position,
                "importance", node.metadata.getOrDefault("probability", 1.0)
            ))
            .toList();
    }
} 