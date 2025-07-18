package com.heroesoftimepoc.temporalengine.controller;

import com.heroesoftimepoc.temporalengine.model.*;
import com.heroesoftimepoc.temporalengine.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

/**
 * Controller pour les API du système temporel avancé
 * Basé sur la documentation temporelle FULL PATATE
 */
@RestController
@RequestMapping("/api/v1/temporal/advanced")
@CrossOrigin(origins = "*")
public class AdvancedTemporalController {
    
    @Autowired
    private PsiGraphService psiGraphService;
    
    @Autowired
    private CausalityZoneService causalityZoneService;
    
    @Autowired
    private LegendaryObjectService legendaryObjectService;
    
    /**
     * Créer un nouveau nœud PsiGraph
     */
    @PostMapping("/games/{gameId}/psi-nodes")
    public ResponseEntity<Map<String, Object>> createPsiNode(
            @PathVariable Long gameId,
            @RequestBody Map<String, Object> request) {
        
        try {
            TileCoord tile = new TileCoord(
                (Integer) request.get("x"), 
                (Integer) request.get("y")
            );
            
            TimeCoord time = new TimeCoord(
                (Integer) request.get("turn"), 
                (String) request.get("timeline")
            );
            
            String ownerPlayer = (String) request.get("ownerPlayer");
            
            // Trouver le jeu (simplifié)
            Game game = new Game();
            game.setId(gameId);
            game.setCurrentTurn((Integer) request.get("turn"));
            game.setCurrentTimeline((String) request.get("timeline"));
            
            PsiNode psiNode = psiGraphService.createPsiNode(game, tile, time, ownerPlayer);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("psiNode", serializePsiNode(psiNode));
            response.put("message", "PsiNode créé avec succès");
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    /**
     * Calculer toutes les zones de causalité pour un joueur
     */
    @GetMapping("/games/{gameId}/players/{playerId}/causality-zones")
    public ResponseEntity<Map<String, Object>> getCausalityZones(
            @PathVariable Long gameId,
            @PathVariable String playerId) {
        
        try {
            // Créer un jeu simplifié
            Game game = new Game();
            game.setId(gameId);
            game.setMapWidth(20);
            game.setMapHeight(20);
            game.setCurrentTurn(1);
            game.setCurrentTimeline("ℬ1");
            
            // Ajouter des héros fictifs pour la démonstration
            Hero hero1 = new Hero("Arthur", 10, 10);
            hero1.setPlayerId(playerId);
            game.addHero(hero1);
            
            Map<String, Object> zones = causalityZoneService.calculateAllCausalityZones(game, playerId);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("zones", zones);
            response.put("message", "Zones de causalité calculées avec succès");
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    /**
     * Obtenir l'état de brouillard pour une position
     */
    @GetMapping("/games/{gameId}/players/{playerId}/fog-state")
    public ResponseEntity<Map<String, Object>> getFogState(
            @PathVariable Long gameId,
            @PathVariable String playerId,
            @RequestParam int x,
            @RequestParam int y) {
        
        try {
            Game game = new Game();
            game.setId(gameId);
            
            TileCoord position = new TileCoord(x, y);
            FogState fogState = causalityZoneService.determineFogState(game, position, playerId);
            VisualAura visualAura = causalityZoneService.getVisualAura(game, position, playerId);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("position", Map.of("x", x, "y", y));
            response.put("fogState", serializeFogState(fogState));
            response.put("visualAura", serializeVisualAura(visualAura));
            response.put("message", "État de brouillard calculé avec succès");
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    /**
     * Initialiser les objets légendaires
     */
    @PostMapping("/legendary-objects/initialize")
    public ResponseEntity<Map<String, Object>> initializeLegendaryObjects() {
        
        try {
            legendaryObjectService.initializeLegendaryObjects();
            
            List<LegendaryObject> objects = legendaryObjectService.getAllLegendaryObjects();
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("objectCount", objects.size());
            response.put("objects", objects.stream()
                    .map(this::serializeLegendaryObject)
                    .toList());
            response.put("message", "Objets légendaires initialisés avec succès");
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    /**
     * Activer un objet légendaire
     */
    @PostMapping("/legendary-objects/{objectName}/activate")
    public ResponseEntity<Map<String, Object>> activateLegendaryObject(
            @PathVariable String objectName,
            @RequestBody Map<String, Object> request) {
        
        try {
            Long gameId = ((Number) request.get("gameId")).longValue();
            int x = (Integer) request.get("x");
            int y = (Integer) request.get("y");
            String activatingPlayer = (String) request.get("activatingPlayer");
            
            // Créer un jeu simplifié
            Game game = new Game();
            game.setId(gameId);
            game.setCurrentTurn(1);
            
            TileCoord position = new TileCoord(x, y);
            
            Map<String, Object> result = legendaryObjectService.activateLegendaryObject(
                    objectName, game, position, activatingPlayer);
            
            return ResponseEntity.ok(result);
            
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    /**
     * Analyser le graphe PsiGraph
     */
    @GetMapping("/games/{gameId}/psi-graph/analysis")
    public ResponseEntity<Map<String, Object>> analyzePsiGraph(@PathVariable Long gameId) {
        
        try {
            Game game = new Game();
            game.setId(gameId);
            
            Map<String, Object> analysis = psiGraphService.analyzeGraph(game);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("analysis", analysis);
            response.put("message", "Analyse du graphe PsiGraph terminée");
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    /**
     * Analyser les objets légendaires
     */
    @GetMapping("/games/{gameId}/legendary-objects/analysis")
    public ResponseEntity<Map<String, Object>> analyzeLegendaryObjects(@PathVariable Long gameId) {
        
        try {
            Game game = new Game();
            game.setId(gameId);
            
            Map<String, Object> analysis = legendaryObjectService.analyzeLegendaryObjects(game);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("analysis", analysis);
            response.put("message", "Analyse des objets légendaires terminée");
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    /**
     * Endpoint de test pour vérifier le système
     */
    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> health() {
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Système temporel avancé opérationnel");
        response.put("timestamp", System.currentTimeMillis());
        response.put("version", "FULL PATATE v1.0");
        
        // Statistiques système
        Map<String, Object> stats = new HashMap<>();
        stats.put("legendaryObjects", legendaryObjectService.getAllLegendaryObjects().size());
        stats.put("systemStatus", "ACTIVE");
        stats.put("features", List.of(
            "PsiGraph System",
            "Causality Zones",
            "Fog States (7 types)",
            "Visual Auras (6 types)",
            "Legendary Objects",
            "Quantum Interference",
            "Timeline Projection"
        ));
        
        response.put("stats", stats);
        return ResponseEntity.ok(response);
    }
    
    // Méthodes utilitaires de sérialisation
    
    private Map<String, Object> serializePsiNode(PsiNode psiNode) {
        Map<String, Object> data = new HashMap<>();
        data.put("id", psiNode.getId());
        data.put("tile", Map.of("x", psiNode.getTile().getX(), "y", psiNode.getTile().getY()));
        data.put("time", Map.of("turn", psiNode.getTime().getTurn(), "timeline", psiNode.getTime().getTimeline()));
        data.put("ownerPlayer", psiNode.getOwnerPlayer());
        data.put("realityState", psiNode.getRealityState().toString());
        data.put("causalityZone", psiNode.getCausalityZone().toString());
        data.put("probability", psiNode.getProbability());
        data.put("isObserved", psiNode.isObserved());
        data.put("isReachable", psiNode.isReachable());
        data.put("isGhostVisible", psiNode.isGhostVisible());
        data.put("activeEffects", psiNode.getActiveEffects());
        return data;
    }
    
    private Map<String, Object> serializeFogState(FogState fogState) {
        Map<String, Object> data = new HashMap<>();
        data.put("stateId", fogState.getStateId());
        data.put("name", fogState.getName());
        data.put("description", fogState.getDescription());
        data.put("isInteractable", fogState.isInteractable());
        data.put("isVisible", fogState.isVisible());
        data.put("displayColor", fogState.getDisplayColor());
        data.put("visualEffect", fogState.getVisualEffect());
        data.put("displayPriority", fogState.getDisplayPriority());
        return data;
    }
    
    private Map<String, Object> serializeVisualAura(VisualAura visualAura) {
        Map<String, Object> data = new HashMap<>();
        data.put("name", visualAura.getName());
        data.put("description", visualAura.getDescription());
        data.put("effect", visualAura.getEffect());
        data.put("color", visualAura.getColor());
        data.put("opacity", visualAura.getOpacity());
        data.put("isInteractable", visualAura.isInteractable());
        data.put("cssClass", visualAura.getCssClass());
        data.put("cssProperties", visualAura.getCssProperties());
        data.put("displayPriority", visualAura.getDisplayPriority());
        return data;
    }
    
    private Map<String, Object> serializeLegendaryObject(LegendaryObject object) {
        Map<String, Object> data = new HashMap<>();
        data.put("id", object.getId());
        data.put("name", object.getName());
        data.put("description", object.getDescription());
        data.put("objectType", object.getObjectType().toString());
        data.put("affectsTimeline", object.isAffectsTimeline());
        data.put("visibilityMode", object.getVisibilityMode().toString());
        data.put("radiusOfInfluence", object.getRadiusOfInfluence());
        data.put("strength", object.getStrength());
        data.put("isActive", object.isActive());
        data.put("requiresActivation", object.isRequiresActivation());
        data.put("activationCost", object.getActivationCost());
        data.put("cooldownTurns", object.getCooldownTurns());
        data.put("effects", object.getEffects().stream()
                .map(CausalityEffect::toString)
                .toList());
        data.put("properties", object.getProperties());
        return data;
    }
} 