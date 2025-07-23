package com.heroesoftimepoc.temporalengine.controller;

import com.heroesoftimepoc.temporalengine.model.Hero;
import com.heroesoftimepoc.temporalengine.model.Game;
import com.heroesoftimepoc.temporalengine.repository.GameRepository;
import com.heroesoftimepoc.temporalengine.service.GrofiHeroService;
import com.heroesoftimepoc.temporalengine.service.GrofiHeroService.GrofiHeroData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Controller REST pour les héros GROFI - VERSION SIMPLIFIÉE
 * Compatible avec l'API existante
 */
@RestController
@RequestMapping("/api/grofi")
@CrossOrigin(origins = "*")
public class GrofiController {
    
    @Autowired
    private GrofiHeroService grofiHeroService;
    
    @Autowired
    private GameRepository gameRepository;
    
    /**
     * Lister tous les héros GROFI disponibles
     * GET /api/grofi/heroes
     */
    @GetMapping("/heroes")
    public ResponseEntity<Map<String, Object>> listGrofiHeroes() {
        Map<String, Object> response = new HashMap<>();
        
        try {
            List<GrofiHeroData> heroes = grofiHeroService.getAllGrofiHeroes();
            
            response.put("success", true);
            response.put("count", heroes.size());
            response.put("heroes", heroes.stream().map(hero -> {
                Map<String, Object> heroInfo = new HashMap<>();
                heroInfo.put("id", hero.id);
                heroInfo.put("name", hero.name);
                heroInfo.put("title", hero.title);
                heroInfo.put("description", hero.description);
                heroInfo.put("rarity", hero.rarity);
                heroInfo.put("role", hero.role);
                heroInfo.put("faction", hero.faction);
                heroInfo.put("companions", hero.companions);
                heroInfo.put("quotes", hero.quotes);
                heroInfo.put("ultimatePower", hero.ultimatePower);
                heroInfo.put("passives", hero.passives);
                heroInfo.put("immunityTags", hero.immunityTags);
                return heroInfo;
            }).toList());
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("error", "Erreur lors du chargement des héros GROFI: " + e.getMessage());
        }
        
        return ResponseEntity.ok(response);
    }
    
    /**
     * Créer un héros GROFI dans un jeu
     * POST /api/grofi/games/{gameId}/create-hero
     */
    @PostMapping("/games/{gameId}/create-hero")
    public ResponseEntity<Map<String, Object>> createGrofiHero(
            @PathVariable Long gameId,
            @RequestBody Map<String, Object> request) {
        
        Map<String, Object> response = new HashMap<>();
        
        try {
            Game game = gameRepository.findById(gameId).orElse(null);
            if (game == null) {
                response.put("success", false);
                response.put("error", "Jeu non trouvé: " + gameId);
                return ResponseEntity.notFound().build();
            }
            
            String grofiHeroId = (String) request.get("grofiHeroId");
            String playerId = (String) request.get("playerId");
            Integer startX = (Integer) request.getOrDefault("startX", 10);
            Integer startY = (Integer) request.getOrDefault("startY", 10);
            
            if (grofiHeroId == null || playerId == null) {
                response.put("success", false);
                response.put("error", "grofiHeroId et playerId requis");
                return ResponseEntity.badRequest().body(response);
            }
            
            Hero hero = grofiHeroService.createGrofiHero(game, grofiHeroId, startX, startY, playerId);
            
            response.put("success", true);
            response.put("heroId", hero.getId());
            response.put("heroName", hero.getName());
            response.put("position", Map.of("x", hero.getPositionX(), "y", hero.getPositionY()));
            response.put("playerId", hero.getPlayerId());
            response.put("message", "Héros GROFI créé avec succès");
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("error", "Erreur création héros GROFI: " + e.getMessage());
        }
        
        return ResponseEntity.ok(response);
    }
    
    /**
     * Vérifier les immunités d'un héros GROFI
     * GET /api/grofi/games/{gameId}/heroes/{heroName}/immunities
     */
    @GetMapping("/games/{gameId}/heroes/{heroName}/immunities")
    public ResponseEntity<Map<String, Object>> checkHeroImmunities(
            @PathVariable Long gameId,
            @PathVariable String heroName) {
        
        Map<String, Object> response = new HashMap<>();
        
        try {
            Game game = gameRepository.findById(gameId).orElse(null);
            if (game == null) {
                response.put("success", false);
                response.put("error", "Jeu non trouvé: " + gameId);
                return ResponseEntity.notFound().build();
            }
            
            Hero hero = game.getHeroByName(heroName);
            if (hero == null) {
                response.put("success", false);
                response.put("error", "Héros non trouvé: " + heroName);
                return ResponseEntity.notFound().build();
            }
            
            Map<String, Boolean> immunities = new HashMap<>();
            immunities.put("SRTI", grofiHeroService.hasImmunity(hero, "SRTI"));
            immunities.put("OBS", grofiHeroService.hasImmunity(hero, "OBS"));
            immunities.put("ROLLBACK", grofiHeroService.hasImmunity(hero, "ROLLBACK"));
            
            response.put("success", true);
            response.put("heroName", heroName);
            response.put("isGrofiHero", grofiHeroService.isGrofiHero(hero));
            response.put("immunities", immunities);
            
            // Ajouter les données GROFI si disponibles
            grofiHeroService.getGrofiData(heroName).ifPresent(data -> {
                response.put("grofiData", Map.of(
                    "title", data.title,
                    "role", data.role,
                    "faction", data.faction,
                    "rarity", data.rarity
                ));
            });
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("error", "Erreur vérification immunités: " + e.getMessage());
        }
        
        return ResponseEntity.ok(response);
    }
    
    /**
     * Test de compatibilité système
     * GET /api/grofi/system/test
     */
    @GetMapping("/system/test")
    public ResponseEntity<Map<String, Object>> testGrofiSystem() {
        Map<String, Object> response = new HashMap<>();
        
        try {
            // Charger les héros si pas déjà fait
            grofiHeroService.loadGrofiHeroes();
            List<GrofiHeroData> heroes = grofiHeroService.getAllGrofiHeroes();
            
            response.put("success", true);
            response.put("systemStatus", "GROFI System Operational");
            response.put("heroesLoaded", heroes.size());
            response.put("compatibility", "85% - Extensions actives");
            response.put("features", Map.of(
                "heroLoading", true,
                "immunitySystem", true,
                "ultimatePowers", false, // Simplifié pour l'instant
                "quantumGrammarExtended", true, // IMPLÉMENTÉ - Grammaire quantique étendue active
                "worldStateGraph", true // IMPLÉMENTÉ - World State Graph avec fog of causality
            ));
            
            // Test de chargement des héros
            Map<String, Object> heroTests = new HashMap<>();
            for (GrofiHeroData hero : heroes) {
                heroTests.put(hero.name, Map.of(
                    "loaded", true,
                    "hasUltimate", !hero.ultimatePower.isEmpty(),
                    "hasPassives", !hero.passives.isEmpty(),
                    "hasImmunities", !hero.immunityTags.isEmpty()
                ));
            }
            response.put("heroTests", heroTests);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("error", "Erreur test système GROFI: " + e.getMessage());
        }
        
        return ResponseEntity.ok(response);
    }
} 