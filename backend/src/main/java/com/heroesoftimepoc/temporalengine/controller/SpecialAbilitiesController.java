package com.heroesoftimepoc.temporalengine.controller;

import com.heroesoftimepoc.temporalengine.model.*;
import com.heroesoftimepoc.temporalengine.service.SpecialAbilitiesService;
import com.heroesoftimepoc.temporalengine.repository.GameRepository;
import com.heroesoftimepoc.temporalengine.repository.HeroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

/**
 * API REST pour les capacités spéciales des scénarios épiques
 * Endpoint: /api/abilities
 */
@RestController
@RequestMapping("/api/abilities")
@CrossOrigin(origins = "*")
public class SpecialAbilitiesController {
    
    @Autowired
    private SpecialAbilitiesService specialAbilitiesService;
    
    @Autowired
    private GameRepository gameRepository;
    
    @Autowired
    private HeroRepository heroRepository;
    
    /**
     * PRE_EXISTENCE_STRIKE - Attaque avant d'exister
     */
    @PostMapping("/pre-existence-strike")
    public ResponseEntity<Map<String, Object>> preExistenceStrike(
            @RequestParam Long gameId,
            @RequestParam String attackerName,
            @RequestParam String targetName) {
        
        Game game = gameRepository.findById(gameId).orElse(null);
        if (game == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Game not found"));
        }
        
        Hero attacker = game.getHeroByName(attackerName);
        Hero target = game.getHeroByName(targetName);
        
        if (attacker == null || target == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Hero not found"));
        }
        
        Map<String, Object> result = specialAbilitiesService.executePreExistenceStrike(game, attacker, target);
        return ResponseEntity.ok(result);
    }
    
    /**
     * MEMORY_INFECTION - Infecte les souvenirs
     */
    @PostMapping("/memory-infection")
    public ResponseEntity<Map<String, Object>> memoryInfection(
            @RequestParam Long gameId,
            @RequestParam String casterName,
            @RequestBody List<String> targetNames) {
        
        Game game = gameRepository.findById(gameId).orElse(null);
        if (game == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Game not found"));
        }
        
        Hero caster = game.getHeroByName(casterName);
        if (caster == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Caster not found"));
        }
        
        List<Hero> targets = targetNames.stream()
            .map(game::getHeroByName)
            .filter(Objects::nonNull)
            .collect(Collectors.toList());
        
        Map<String, Object> result = specialAbilitiesService.executeMemoryInfection(game, caster, targets);
        return ResponseEntity.ok(result);
    }
    
    /**
     * REALITY_RECOMPILE - Recompile une zone
     */
    @PostMapping("/reality-recompile")
    public ResponseEntity<Map<String, Object>> realityRecompile(
            @RequestParam Long gameId,
            @RequestParam String casterName,
            @RequestParam int x,
            @RequestParam int y,
            @RequestParam(defaultValue = "2") int radius) {
        
        Game game = gameRepository.findById(gameId).orElse(null);
        if (game == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Game not found"));
        }
        
        Hero caster = game.getHeroByName(casterName);
        if (caster == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Caster not found"));
        }
        
        Map<String, Object> result = specialAbilitiesService.executeRealityRecompile(game, caster, x, y, radius);
        return ResponseEntity.ok(result);
    }
    
    /**
     * SCRIBE_NONEXISTENCE - Efface de l'existence
     */
    @PostMapping("/scribe-nonexistence")
    public ResponseEntity<Map<String, Object>> scribeNonexistence(
            @RequestParam Long gameId,
            @RequestParam String scribeName,
            @RequestParam String targetType,
            @RequestParam String targetName) {
        
        Game game = gameRepository.findById(gameId).orElse(null);
        if (game == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Game not found"));
        }
        
        Hero scribe = game.getHeroByName(scribeName);
        if (scribe == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Scribe not found"));
        }
        
        Map<String, Object> result = specialAbilitiesService.executeScribeNonexistence(game, scribe, targetType, targetName);
        return ResponseEntity.ok(result);
    }
    
    /**
     * CREATE_FALSE_HEROES - Crée des faux héros
     */
    @PostMapping("/create-false-heroes")
    public ResponseEntity<Map<String, Object>> createFalseHeroes(
            @RequestParam Long gameId,
            @RequestBody List<String> originalHeroNames) {
        
        Game game = gameRepository.findById(gameId).orElse(null);
        if (game == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Game not found"));
        }
        
        List<Hero> originals = originalHeroNames.stream()
            .map(game::getHeroByName)
            .filter(Objects::nonNull)
            .collect(Collectors.toList());
        
        Map<String, Object> result = specialAbilitiesService.createFalseHeroes(game, originals);
        return ResponseEntity.ok(result);
    }
    
    /**
     * ULTIMATE_SEQUENCE - La séquence finale
     */
    @PostMapping("/ultimate-sequence")
    public ResponseEntity<Map<String, Object>> ultimateSequence(
            @RequestParam Long gameId,
            @RequestParam String jeanName,
            @RequestParam String claudiusName,
            @RequestParam String chlamydiusName,
            @RequestParam String targetName) {
        
        Game game = gameRepository.findById(gameId).orElse(null);
        if (game == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Game not found"));
        }
        
        Hero jean = game.getHeroByName(jeanName);
        Hero claudius = game.getHeroByName(claudiusName);
        Hero chlamydius = game.getHeroByName(chlamydiusName);
        Hero target = game.getHeroByName(targetName);
        
        if (jean == null || claudius == null || chlamydius == null || target == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "One or more heroes not found"));
        }
        
        Map<String, Object> result = specialAbilitiesService.executeUltimateSequence(
            game, jean, claudius, chlamydius, target);
        return ResponseEntity.ok(result);
    }
    
    /**
     * GET /api/abilities/list - Liste toutes les capacités spéciales disponibles
     */
    @GetMapping("/list")
    public ResponseEntity<Map<String, Object>> listAbilities() {
        Map<String, Object> abilities = new HashMap<>();
        
        abilities.put("boss_abilities", List.of(
            Map.of(
                "id", "pre_existence_strike",
                "name", "Frappe Pré-Existante",
                "description", "Attaque avant même d'avoir agi",
                "cost", "Aucun"
            ),
            Map.of(
                "id", "memory_infection",
                "name", "Infection Mémorielle", 
                "description", "Échange les souvenirs et capacités des héros",
                "cost", "Aucun"
            ),
            Map.of(
                "id", "create_false_heroes",
                "name", "Faux Héros",
                "description", "Crée des copies maléfiques inversées",
                "cost", "Aucun"
            )
        ));
        
        abilities.put("hero_abilities", List.of(
            Map.of(
                "id", "reality_recompile",
                "name", "Recompilation de Réalité",
                "description", "Recompile une zone (70% succès, 30% bugs)",
                "cost", "50 énergie temporelle",
                "hero", "Claudius"
            ),
            Map.of(
                "id", "scribe_nonexistence",
                "name", "Écriture du Néant",
                "description", "Efface quelque chose de l'existence",
                "cost", "80 énergie temporelle",
                "hero", "Chlamydius"
            )
        ));
        
        abilities.put("ultimate", Map.of(
            "id", "ultimate_sequence",
            "name", "Séquence du Treizième Codex",
            "description", "ψ† + Σ + FORGE(REALITY_CORE) - Scelle la cible dans le Livre Vide",
            "requirements", List.of(
                "Les trois héros adjacents",
                "Tour 27+",
                "50 énergie chacun"
            )
        ));
        
        return ResponseEntity.ok(abilities);
    }
} 