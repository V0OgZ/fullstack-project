package com.heroesoftimepoc.temporalengine.controller;

import com.heroesoftimepoc.temporalengine.service.GodViewService;
import com.heroesoftimepoc.temporalengine.service.GodViewService.*;
import com.heroesoftimepoc.temporalengine.model.FogState;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * API God View - Pour Jean qui voit TOUT le multivers
 * 
 * @author JeanGrofignon
 */
@RestController
@RequestMapping("/api/temporal/godview")
@CrossOrigin(origins = "*")
public class GodViewController {
    
    @Autowired
    private GodViewService godViewService;
    
    /**
     * Obtenir la vue complète du multivers
     * Jean voit TOUT : passé, présent, futur, toutes les timelines
     */
    @GetMapping("/multiverse/{gameId}")
    public MultiverseView getCompleteMultiverse(@PathVariable Long gameId) {
        return godViewService.getCompleteMultiverse(gameId);
    }
    
    /**
     * Calculer le fog à une position 5D spécifique
     */
    @GetMapping("/fog5d/{gameId}")
    public Map<String, Object> getFogAt5D(
            @PathVariable Long gameId,
            @RequestParam int x,
            @RequestParam int y,
            @RequestParam(defaultValue = "0") int z,
            @RequestParam(defaultValue = "ℬ1") String timeline,
            @RequestParam int day) {
        
        Position5D pos = new Position5D(x, y, z, timeline, day);
        double fogValue = godViewService.calculateFogAt5D(
            godViewService.getGame(gameId), pos
        );
        
        Map<String, Object> result = new HashMap<>();
        result.put("position", pos.toString());
        result.put("fogValue", fogValue);
        result.put("fogPercentage", (int)(fogValue * 100) + "%");
        result.put("visibility", fogValue < 0.3 ? "Clear" : 
                                fogValue < 0.6 ? "Partial" : "Heavy");
        
        return result;
    }
    
    /**
     * Obtenir l'état du fog pour un joueur à une position 5D
     */
    @GetMapping("/fogstate/{gameId}")
    public Map<String, Object> getFogStateAt5D(
            @PathVariable Long gameId,
            @RequestParam String playerId,
            @RequestParam int x,
            @RequestParam int y,
            @RequestParam(defaultValue = "0") int z,
            @RequestParam(defaultValue = "ℬ1") String timeline,
            @RequestParam int day) {
        
        Position5D pos = new Position5D(x, y, z, timeline, day);
        FogState state = godViewService.getFogStateAt5D(
            godViewService.getGame(gameId), pos, playerId
        );
        
        Map<String, Object> result = new HashMap<>();
        result.put("position", pos.toString());
        result.put("playerId", playerId);
        result.put("fogState", state.toString());
        result.put("stateIndex", state.ordinal());
        result.put("canInteract", state == FogState.VISION || state == FogState.ANCHORED);
        
        return result;
    }
    
    /**
     * Calculer le mur de causalité pour un héros
     */
    @GetMapping("/causalitywall/{gameId}/{heroName}")
    public CausalityWall getCausalityWall(
            @PathVariable Long gameId,
            @PathVariable String heroName) {
        
        return godViewService.calculateCausalityWall(
            godViewService.getGame(gameId),
            godViewService.getHero(gameId, heroName)
        );
    }
    
    /**
     * Vérifier si un héros peut se déplacer vers une position 5D
     */
    @PostMapping("/canmove/{gameId}")
    public Map<String, Object> canHeroMoveTo5D(
            @PathVariable Long gameId,
            @RequestParam String heroName,
            @RequestParam int x,
            @RequestParam int y,
            @RequestParam(defaultValue = "0") int z,
            @RequestParam(defaultValue = "ℬ1") String timeline,
            @RequestParam int day) {
        
        Position5D target = new Position5D(x, y, z, timeline, day);
        boolean canMove = godViewService.canHeroMoveTo5D(
            godViewService.getGame(gameId),
            godViewService.getHero(gameId, heroName),
            target
        );
        
        Map<String, Object> result = new HashMap<>();
        result.put("hero", heroName);
        result.put("target", target.toString());
        result.put("canMove", canMove);
        
        if (!canMove) {
            // Expliquer pourquoi
            CausalityWall wall = godViewService.calculateCausalityWall(
                godViewService.getGame(gameId),
                godViewService.getHero(gameId, heroName)
            );
            
            result.put("reason", determineBlockReason(target, wall));
        }
        
        return result;
    }
    
    /**
     * Obtenir une carte complète du fog pour une timeline et une plage de jours
     */
    @GetMapping("/fogmap/{gameId}")
    public Map<String, Object> getCompleteFogMap(
            @PathVariable Long gameId,
            @RequestParam(defaultValue = "ℬ1") String timeline,
            @RequestParam int minDay,
            @RequestParam int maxDay) {
        
        Map<String, Object> result = new HashMap<>();
        Map<String, Double> fogMap = new HashMap<>();
        
        for (int day = minDay; day <= maxDay; day++) {
            for (int x = 0; x < 20; x++) { // Taille de carte fixe pour l'exemple
                for (int y = 0; y < 20; y++) {
                    Position5D pos = new Position5D(x, y, 0, timeline, day);
                    double fog = godViewService.calculateFogAt5D(
                        godViewService.getGame(gameId), pos
                    );
                    fogMap.put(pos.toString(), fog);
                }
            }
        }
        
        result.put("timeline", timeline);
        result.put("dayRange", minDay + " to " + maxDay);
        result.put("fogMap", fogMap);
        result.put("totalPositions", fogMap.size());
        
        // Statistiques
        double avgFog = fogMap.values().stream()
            .mapToDouble(Double::doubleValue)
            .average()
            .orElse(0.0);
        result.put("averageFog", avgFog);
        
        return result;
    }
    
    /**
     * Simuler le vol du trésor du futur (exemple de Jean)
     */
    @PostMapping("/simulate/treasuretheft/{gameId}")
    public Map<String, Object> simulateTreasureTheft(
            @PathVariable Long gameId,
            @RequestParam String thiefHero,
            @RequestParam int treasureX,
            @RequestParam int treasureY,
            @RequestParam int targetDay) {
        
        Map<String, Object> result = new HashMap<>();
        
        // Position du trésor dans le temps
        Position5D treasurePos = new Position5D(treasureX, treasureY, 0, "ℬ1", targetDay);
        
        // Le voleur peut-il y aller ?
        boolean canSteal = godViewService.canHeroMoveTo5D(
            godViewService.getGame(gameId),
            godViewService.getHero(gameId, thiefHero),
            treasurePos
        );
        
        result.put("thief", thiefHero);
        result.put("treasurePosition", treasurePos.toString());
        result.put("canSteal", canSteal);
        
        if (canSteal) {
            // Simuler les conséquences
            result.put("consequences", Map.of(
                "treasureTaken", true,
                "takenDay", targetDay,
                "paradoxCreated", false,
                "affectedHeroes", "Heroes arriving after day " + targetDay + " will find empty chest"
            ));
        } else {
            result.put("blockReason", "Temporal constraints prevent theft");
        }
        
        return result;
    }
    
    // Méthode helper pour déterminer la raison du blocage
    private String determineBlockReason(Position5D target, CausalityWall wall) {
        if (target.day < wall.temporalLimitPast) {
            return "Cannot travel that far into the past";
        }
        if (target.day > wall.temporalLimitFuture) {
            return "Cannot see that far into the future";
        }
        if (!wall.accessibleTimelines.contains(target.timeline)) {
            return "Timeline " + target.timeline + " is not accessible";
        }
        if (wall.quantumBarriers.containsKey(target)) {
            return "Quantum barrier too strong (fog: " + wall.quantumBarriers.get(target) + ")";
        }
        return "Unknown restriction";
    }
} 