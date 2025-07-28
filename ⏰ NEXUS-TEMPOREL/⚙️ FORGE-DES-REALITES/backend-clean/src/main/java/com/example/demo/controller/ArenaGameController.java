package com.example.demo.controller;

import com.example.demo.service.ArenaWorldService;
import com.example.demo.service.ArenaJudgeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

/**
 * ArenaGameController - Contrôleur REST pour le mode ARÈNE
 * Gère toutes les API pour les combats rapides et spectaculaires
 */
@RestController
@RequestMapping("/api/arena")
@CrossOrigin(origins = "http://localhost:3000")
public class ArenaGameController {

    @Autowired
    private ArenaWorldService arenaWorldService;
    
    @Autowired
    private ArenaJudgeService arenaJudgeService;

    // ===== GESTION DU MONDE ARÈNE =====
    
    /**
     * Récupère l'état du monde arène
     */
    @GetMapping("/world")
    public ResponseEntity<Map<String, Object>> getArenaWorld() {
        try {
            Map<String, Object> worldState = arenaWorldService.getArenaWorldState();
            return ResponseEntity.ok(worldState);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", "Erreur lors de la récupération du monde arène");
            error.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    /**
     * Réinitialise le monde arène
     */
    @PostMapping("/world/reset")
    public ResponseEntity<Map<String, Object>> resetArenaWorld() {
        try {
            Map<String, Object> result = arenaWorldService.resetArena();
            
            // Générer un commentaire du juge
            Map<String, Object> context = new HashMap<>();
            context.put("action", "arena_reset");
            arenaJudgeService.generateCustomComment(
                "L'arène a été réinitialisée! Prête pour de nouveaux défis interdimensionnels!", 
                "situation_speciale"
            );
            
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", "Erreur lors de la réinitialisation de l'arène");
            error.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    /**
     * Met à jour les paramètres de l'arène
     */
    @PostMapping("/world/settings")
    public ResponseEntity<Map<String, Object>> updateArenaSettings(@RequestBody Map<String, Object> settings) {
        try {
            Map<String, Object> result = arenaWorldService.updateArenaSettings(settings);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", "Erreur lors de la mise à jour des paramètres");
            error.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    // ===== GESTION DES COMBATS =====
    
    /**
     * Démarre un nouveau combat
     */
    @PostMapping("/start")
    public ResponseEntity<Map<String, Object>> startBattle(@RequestBody Map<String, Object> battleConfig) {
        try {
            // Démarrer le combat
            Map<String, Object> result = arenaWorldService.startBattle(battleConfig);
            
            // Générer un commentaire de début de combat
            Map<String, Object> context = new HashMap<>();
            context.put("battleConfig", battleConfig);
            context.put("battleId", battleConfig.get("battleId"));
            
            Map<String, Object> judgeComment = arenaJudgeService.commentBattleStart(context);
            if (judgeComment != null) {
                result.put("judgeComment", judgeComment);
            }
            
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", "Erreur lors du démarrage du combat");
            error.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    /**
     * Exécute une action de combat
     */
    @PostMapping("/action")
    public ResponseEntity<Map<String, Object>> executeAction(@RequestBody Map<String, Object> actionData) {
        try {
            // Valider les données d'action
            validateActionData(actionData);
            
            // Simuler l'exécution de l'action (pour l'instant)
            Map<String, Object> result = processAction(actionData);
            
            // Générer un commentaire approprié selon le type d'action
            String actionType = (String) actionData.get("type");
            Map<String, Object> judgeComment = generateActionComment(actionType, actionData, result);
            
            if (judgeComment != null) {
                result.put("judgeComment", judgeComment);
            }
            
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", "Erreur lors de l'exécution de l'action");
            error.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    /**
     * Récupère l'état du combat actuel
     */
    @GetMapping("/status")
    public ResponseEntity<Map<String, Object>> getBattleStatus() {
        try {
            Map<String, Object> worldState = arenaWorldService.getArenaWorldState();
            Map<String, Object> currentBattle = (Map<String, Object>) worldState.get("currentBattle");
            
            Map<String, Object> status = new HashMap<>();
            status.put("isInBattle", worldState.get("isInBattle"));
            status.put("battleData", currentBattle);
            status.put("arenaReady", arenaWorldService.isArenaReady());
            
            return ResponseEntity.ok(status);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", "Erreur lors de la récupération du statut");
            error.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    /**
     * Termine le combat en cours
     */
    @PostMapping("/end")
    public ResponseEntity<Map<String, Object>> endBattle(@RequestBody(required = false) Map<String, Object> endData) {
        try {
            Map<String, Object> result = arenaWorldService.endBattle();
            
            // Générer un commentaire de fin de combat
            Map<String, Object> context = new HashMap<>();
            if (endData != null) {
                context.putAll(endData);
            }
            
            Map<String, Object> judgeComment = arenaJudgeService.commentBattleEnd(context);
            if (judgeComment != null) {
                result.put("judgeComment", judgeComment);
            }
            
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", "Erreur lors de la fin du combat");
            error.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    // ===== GESTION DES HÉROS =====
    
    /**
     * Récupère la liste des héros disponibles pour l'arène
     */
    @GetMapping("/heroes")
    public ResponseEntity<List<Map<String, Object>>> getAvailableHeroes() {
        try {
            List<Map<String, Object>> heroes = arenaWorldService.getAvailableArenaHeroes();
            return ResponseEntity.ok(heroes);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ArrayList<>());
        }
    }
    
    /**
     * Sélectionne un héros pour le combat
     */
    @PostMapping("/heroes/select")
    public ResponseEntity<Map<String, Object>> selectHero(@RequestBody Map<String, Object> heroSelection) {
        try {
            // Valider la sélection
            String heroId = (String) heroSelection.get("heroId");
            String playerId = (String) heroSelection.get("playerId");
            
            if (heroId == null || playerId == null) {
                throw new RuntimeException("ID du héros et du joueur requis");
            }
            
            Map<String, Object> result = new HashMap<>();
            result.put("success", true);
            result.put("heroId", heroId);
            result.put("playerId", playerId);
            result.put("message", "Héros sélectionné pour l'arène!");
            
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", "Erreur lors de la sélection du héros");
            error.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    /**
     * Récupère les sorts disponibles pour un héros
     */
    @GetMapping("/heroes/{heroId}/spells")
    public ResponseEntity<List<Map<String, Object>>> getHeroSpells(@PathVariable String heroId) {
        try {
            // Pour l'instant, retourner un sort basique selon le héros
            List<Map<String, Object>> spells = getBasicSpellsForHero(heroId);
            return ResponseEntity.ok(spells);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ArrayList<>());
        }
    }

    // ===== SYSTÈME DE COMMENTAIRES =====
    
    /**
     * Récupère les commentaires récents du juge
     */
    @GetMapping("/comments")
    public ResponseEntity<List<Map<String, Object>>> getRecentComments(
            @RequestParam(defaultValue = "10") int limit) {
        try {
            List<Map<String, Object>> comments = arenaJudgeService.getRecentComments(limit);
            return ResponseEntity.ok(comments);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ArrayList<>());
        }
    }
    
    /**
     * Récupère les informations du juge
     */
    @GetMapping("/judge")
    public ResponseEntity<Map<String, Object>> getJudgeInfo() {
        try {
            Map<String, Object> judgeInfo = arenaJudgeService.getJudgeInfo();
            return ResponseEntity.ok(judgeInfo);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", "Erreur lors de la récupération des infos du juge");
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    /**
     * Active/désactive le juge
     */
    @PostMapping("/judge/toggle")
    public ResponseEntity<Map<String, Object>> toggleJudge(@RequestBody Map<String, Object> request) {
        try {
            Boolean active = (Boolean) request.get("active");
            if (active == null) {
                active = true;
            }
            
            Map<String, Object> result = arenaJudgeService.setJudgeActive(active);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", "Erreur lors du toggle du juge");
            error.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    // ===== STATISTIQUES =====
    
    /**
     * Récupère les statistiques de l'arène
     */
    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getArenaStats() {
        try {
            Map<String, Object> stats = new HashMap<>();
            stats.put("arenaStats", arenaWorldService.getArenaStats());
            stats.put("commentStats", arenaJudgeService.getCommentStats());
            return ResponseEntity.ok(stats);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", "Erreur lors de la récupération des statistiques");
            return ResponseEntity.badRequest().body(error);
        }
    }

    // ===== MÉTHODES PRIVÉES =====
    
    private void validateActionData(Map<String, Object> actionData) {
        if (actionData == null) {
            throw new RuntimeException("Données d'action manquantes");
        }
        
        if (!actionData.containsKey("type")) {
            throw new RuntimeException("Type d'action manquant");
        }
        
        if (!actionData.containsKey("heroId")) {
            throw new RuntimeException("ID du héros manquant");
        }
    }
    
    private Map<String, Object> processAction(Map<String, Object> actionData) {
        // Simulation basique du traitement d'action
        Map<String, Object> result = new HashMap<>();
        result.put("success", true);
        result.put("actionId", "action_" + System.currentTimeMillis());
        result.put("type", actionData.get("type"));
        result.put("heroId", actionData.get("heroId"));
        result.put("timestamp", System.currentTimeMillis());
        
        // Simuler des résultats selon le type d'action
        String actionType = (String) actionData.get("type");
        switch (actionType) {
            case "attack":
                result.put("damage", 25 + (int)(Math.random() * 20));
                result.put("critical", Math.random() < 0.15); // 15% de chance
                break;
            case "spell":
                result.put("spellEffect", "temporal_distortion");
                result.put("temporal", true);
                break;
            case "move":
                result.put("newPosition", Map.of("x", 3, "y", 4));
                break;
            default:
                result.put("effect", "unknown");
        }
        
        return result;
    }
    
    private Map<String, Object> generateActionComment(String actionType, Map<String, Object> actionData, Map<String, Object> result) {
        Map<String, Object> context = new HashMap<>();
        context.put("actionType", actionType);
        context.put("actionData", actionData);
        context.put("result", result);
        
        switch (actionType) {
            case "attack":
                Boolean critical = (Boolean) result.get("critical");
                if (critical != null && critical) {
                    return arenaJudgeService.commentCriticalHit(context);
                } else {
                    return arenaJudgeService.commentNormalAction(context);
                }
            case "spell":
                Boolean temporal = (Boolean) result.get("temporal");
                if (temporal != null && temporal) {
                    return arenaJudgeService.commentTemporalSpell(context);
                } else {
                    return arenaJudgeService.commentNormalAction(context);
                }
            default:
                return arenaJudgeService.commentNormalAction(context);
        }
    }
    
    private List<Map<String, Object>> getBasicSpellsForHero(String heroId) {
        List<Map<String, Object>> spells = new ArrayList<>();
        
        Map<String, Object> basicSpell = new HashMap<>();
        basicSpell.put("id", "basic_spell_" + heroId);
        basicSpell.put("name", getSpellNameForHero(heroId));
        basicSpell.put("level", 1);
        basicSpell.put("manaCost", 20);
        basicSpell.put("cooldown", 3);
        basicSpell.put("description", "Sort de base niveau 1");
        
        spells.add(basicSpell);
        return spells;
    }
    
    private String getSpellNameForHero(String heroId) {
        switch (heroId) {
            case "arthur": return "Frappe Temporelle";
            case "merlin": return "Portail Temporel";
            case "ragnar": return "Rage Immortelle";
            case "memento": return "Tatouages Évolutifs";
            default: return "Sort Mystérieux";
        }
    }
}