package com.heroesoftimepoc.temporalengine.controller;

import com.heroesoftimepoc.temporalengine.service.CreatureService;
import com.heroesoftimepoc.temporalengine.service.CreatureService.CreatureDefinition;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * 🐉 CREATURE CONTROLLER - HEROES OF TIME
 * ======================================
 * REST API for creature management, abilities, and bestiary
 */
@RestController
@RequestMapping("/api/creatures")
@CrossOrigin(origins = {"http://localhost:8000", "http://localhost:5174", "http://localhost:8001", "http://localhost:5175"})
public class CreatureController {

    @Autowired
    private CreatureService creatureService;

    /**
     * 📋 GET ALL CREATURES
     * Returns complete bestiary with stats and abilities
     */
    @GetMapping("/bestiary")
    public ResponseEntity<Map<String, Object>> getBestiary() {
        Map<String, CreatureDefinition> creatures = creatureService.getAllCreatures();
        
        Map<String, Object> response = Map.of(
            "success", true,
            "totalCreatures", creatures.size(),
            "creatures", creatures,
            "message", "Complete Heroes of Time bestiary"
        );
        
        return ResponseEntity.ok(response);
    }

    /**
     * 🎯 GET CREATURES BY TIER
     */
    @GetMapping("/tier/{tier}")
    public ResponseEntity<Map<String, Object>> getCreaturesByTier(@PathVariable int tier) {
        List<CreatureDefinition> creatures = creatureService.getCreaturesByTier(tier);
        
        Map<String, Object> response = Map.of(
            "success", true,
            "tier", tier,
            "creatures", creatures,
            "count", creatures.size()
        );
        
        return ResponseEntity.ok(response);
    }

    /**
     * 🔍 GET CREATURE DETAILS
     */
    @GetMapping("/{creatureId}")
    public ResponseEntity<Map<String, Object>> getCreatureDetails(@PathVariable String creatureId) {
        CreatureDefinition creature = creatureService.getCreature(creatureId);
        
        if (creature == null) {
            return ResponseEntity.ok(Map.of(
                "success", false,
                "error", "Creature not found: " + creatureId
            ));
        }
        
        Map<String, Object> response = Map.of(
            "success", true,
            "creature", creature,
            "abilities", creature.abilities,
            "message", "Creature details for " + creature.name
        );
        
        return ResponseEntity.ok(response);
    }

    /**
     * 🧚‍♀️ GET QUANTUM CREATURES ONLY
     * Returns creatures with quantum abilities
     */
    @GetMapping("/quantum")
    public ResponseEntity<Map<String, Object>> getQuantumCreatures() {
        Map<String, CreatureDefinition> allCreatures = creatureService.getAllCreatures();
        
        // Filter quantum creatures (those with quantum abilities)
        Map<String, CreatureDefinition> quantumCreatures = allCreatures.entrySet().stream()
            .filter(entry -> isQuantumCreature(entry.getValue()))
            .collect(java.util.stream.Collectors.toMap(
                Map.Entry::getKey, 
                Map.Entry::getValue
            ));
        
        Map<String, Object> response = Map.of(
            "success", true,
            "quantumCreatures", quantumCreatures,
            "count", quantumCreatures.size(),
            "message", "Creatures with quantum abilities"
        );
        
        return ResponseEntity.ok(response);
    }

    /**
     * ⚡ GET TEMPORAL CREATURES ONLY
     * Returns creatures with temporal abilities
     */
    @GetMapping("/temporal")
    public ResponseEntity<Map<String, Object>> getTemporalCreatures() {
        Map<String, CreatureDefinition> allCreatures = creatureService.getAllCreatures();
        
        // Filter temporal creatures
        Map<String, CreatureDefinition> temporalCreatures = allCreatures.entrySet().stream()
            .filter(entry -> isTemporalCreature(entry.getValue()))
            .collect(java.util.stream.Collectors.toMap(
                Map.Entry::getKey, 
                Map.Entry::getValue
            ));
        
        Map<String, Object> response = Map.of(
            "success", true,
            "temporalCreatures", temporalCreatures,
            "count", temporalCreatures.size(),
            "message", "Creatures with temporal abilities"
        );
        
        return ResponseEntity.ok(response);
    }

    /**
     * 📊 GET BESTIARY STATISTICS
     */
    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getBestiaryStats() {
        Map<String, CreatureDefinition> creatures = creatureService.getAllCreatures();
        
        // Calculate statistics
        long tier1Count = creatures.values().stream().filter(c -> c.tier == 1).count();
        long tier2Count = creatures.values().stream().filter(c -> c.tier == 2).count();
        long tier3Count = creatures.values().stream().filter(c -> c.tier == 3).count();
        long tier4Count = creatures.values().stream().filter(c -> c.tier == 4).count();
        
        long commonCount = creatures.values().stream().filter(c -> "COMMON".equals(c.rarity)).count();
        long rareCount = creatures.values().stream().filter(c -> "RARE".equals(c.rarity)).count();
        long epicCount = creatures.values().stream().filter(c -> "EPIC".equals(c.rarity)).count();
        long legendaryCount = creatures.values().stream().filter(c -> "LEGENDARY".equals(c.rarity)).count();
        
        Map<String, Object> response = Map.of(
            "success", true,
            "totalCreatures", creatures.size(),
            "tierDistribution", Map.of(
                "tier1", tier1Count,
                "tier2", tier2Count,
                "tier3", tier3Count,
                "tier4", tier4Count
            ),
            "rarityDistribution", Map.of(
                "common", commonCount,
                "rare", rareCount,
                "epic", epicCount,
                "legendary", legendaryCount
            ),
            "specialCategories", Map.of(
                "quantum", creatures.values().stream().filter(this::isQuantumCreature).count(),
                "temporal", creatures.values().stream().filter(this::isTemporalCreature).count(),
                "phantom", creatures.values().stream().filter(this::isPhantomCreature).count()
            )
        );
        
        return ResponseEntity.ok(response);
    }

    // 🎯 UTILITY METHODS
    private boolean isQuantumCreature(CreatureDefinition creature) {
        return creature.abilities.stream().anyMatch(ability -> 
            ability.contains("quantum") || 
            ability.contains("probability") || 
            ability.contains("amplitude") ||
            ability.contains("coherence") ||
            ability.contains("superposition")
        );
    }
    
    private boolean isTemporalCreature(CreatureDefinition creature) {
        return creature.abilities.stream().anyMatch(ability -> 
            ability.contains("temporal") || 
            ability.contains("time") || 
            ability.contains("phase")
        );
    }
    
    private boolean isPhantomCreature(CreatureDefinition creature) {
        return creature.id.contains("phantom") || 
               creature.id.contains("shadow") || 
               creature.id.contains("void");
    }
}