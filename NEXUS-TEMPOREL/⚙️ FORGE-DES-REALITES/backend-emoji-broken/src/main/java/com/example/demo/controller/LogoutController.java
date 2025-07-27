package com.example.demo.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.HashMap;

/**
 * 🛋️ LOGOUT CONTROLLER - RÈGLE GROFIGNONIENNE SUPRÊME
 * 
 * Implémente la règle cosmique de Jean-Grofignon :
 * "Si tu cliques, tu perds" - FORCE_LOGOUT automatique
 */
@RestController
@RequestMapping("/api/logout")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8000", "http://localhost:5174"})
public class LogoutController {

    /**
     * 🚬 FORCE LOGOUT - Règle GROFIGNONIENNE Suprême
     * Déconnecte automatiquement le joueur qui ose cliquer sur les artefacts sacrés
     */
    @PostMapping("/force")
    public ResponseEntity<Map<String, Object>> forceLogout(@RequestBody Map<String, Object> request) {
        String playerId = (String) request.get("playerId");
        String reason = (String) request.getOrDefault("reason", "CLICK_ON_SACRED_ARTIFACT");
        
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("action", "FORCE_LOGOUT");
        response.put("playerId", playerId);
        response.put("reason", reason);
        response.put("message", "Jean-Grofignon a parlé : Tu as cliqué, tu as perdu.");
        response.put("redirect", "/canapé-cosmique");
        
        // Log cosmique
        System.out.println("🛋️ [LOGOUT] RÈGLE GROFIGNONIENNE appliquée à " + playerId + " - Raison: " + reason);
        
        return ResponseEntity.ok(response);
    }

    /**
     * 🌀 SPAWN MONSTER - Déni Existentiel
     * Génère le monstre de déni existentiel après le logout forcé
     */
    @PostMapping("/spawn-denial-monster")
    public ResponseEntity<Map<String, Object>> spawnDenialMonster(@RequestBody Map<String, Object> request) {
        String playerId = (String) request.get("playerId");
        
        Map<String, Object> monster = new HashMap<>();
        monster.put("id", "deni_existentiel_" + System.currentTimeMillis());
        monster.put("name", "Déni Existentiel");
        monster.put("type", "SHADOW_MONSTER");
        monster.put("aggro", true);
        monster.put("shadow", true);
        monster.put("health", 666);
        monster.put("attack", "Questions Existentielles");
        monster.put("special", "Force le joueur à se demander pourquoi il joue encore");
        
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("monster", monster);
        response.put("targetPlayer", playerId);
        response.put("message", "Un Déni Existentiel apparaît ! Il te regarde bizarrement...");
        
        System.out.println("👹 [LOGOUT] Monstre Déni Existentiel spawné pour " + playerId);
        
        return ResponseEntity.ok(response);
    }

    /**
     * 🎭 DROP OBJECT - Illusion du Contrôle
     * Fait perdre l'objet "Illusion du Contrôle" au joueur déconnecté
     */
    @PostMapping("/drop-illusion")
    public ResponseEntity<Map<String, Object>> dropIllusionOfControl(@RequestBody Map<String, Object> request) {
        String playerId = (String) request.get("playerId");
        
        Map<String, Object> droppedObject = new HashMap<>();
        droppedObject.put("id", "illusion_du_controle");
        droppedObject.put("name", "Illusion du Contrôle");
        droppedObject.put("type", "CURSED_ITEM");
        droppedObject.put("description", "Tu croyais vraiment contrôler quelque chose ?");
        droppedObject.put("effect", "NONE - C'était juste une illusion");
        droppedObject.put("rarity", "COMMON");
        droppedObject.put("curse", "Réalise que tu n'as jamais eu le contrôle");
        
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("droppedObject", droppedObject);
        response.put("playerId", playerId);
        response.put("message", "Tu perds ton Illusion du Contrôle. Elle n'a jamais existé de toute façon.");
        
        System.out.println("💫 [LOGOUT] Illusion du Contrôle perdue par " + playerId);
        
        return ResponseEntity.ok(response);
    }

    /**
     * 🛋️ CANAPÉ STATUS - Vérifier si Jean est présent
     */
    @GetMapping("/canape-status")
    public ResponseEntity<Map<String, Object>> getCanapeStatus() {
        Map<String, Object> status = new HashMap<>();
        status.put("jean_present", true);
        status.put("jean_status", "Présent. Immobile. Surpuissant.");
        status.put("player_action", "Rien.");
        status.put("world_response", "Enfin.");
        status.put("canape_location", "REALITY.REALITY");
        status.put("access_level", "GROFI_ONLY");
        
        return ResponseEntity.ok(status);
    }

    /**
     * 🚨 HEALTH CHECK - Vérifier que le système de logout fonctionne
     */
    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> health() {
        Map<String, String> health = new HashMap<>();
        health.put("status", "UP");
        health.put("service", "LogoutController");
        health.put("grofignon_rule", "ACTIVE");
        health.put("cosmic_couch", "OPERATIONAL");
        
        return ResponseEntity.ok(health);
    }
} 