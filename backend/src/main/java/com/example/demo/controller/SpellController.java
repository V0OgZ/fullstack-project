package com.example.demo.controller;

import com.example.demo.service.SpellService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

/**
 * 🪄 SPELL CONTROLLER - JEAN-GROFIGNON MAGIC SYSTEM
 * ================================================
 * 
 * Contrôleur pour la gestion des sorts et de la magie dans Heroes of Time.
 * Intègre les formules causales pour les effets temporels et quantiques.
 * 
 * FONCTIONNALITÉS:
 * - Cast de sorts avec formules causales
 * - Gestion du mana et des cooldowns
 * - Effets temporels (AXISI/LENTUS)
 * - Validation des sorts disponibles
 * - Calcul des dégâts et effets
 * 
 * JEAN SAYS: "La magie, c'est de la physique quantique déguisée !"
 */
@RestController
@RequestMapping("/api/spells")
@CrossOrigin(origins = "http://localhost:8000")
public class SpellController {

    @Autowired
    private SpellService spellService;

    /**
     * 🔮 Cast a spell with causal effects
     */
    @PostMapping("/cast")
    public ResponseEntity<Map<String, Object>> castSpell(@RequestBody Map<String, Object> request) {
        try {
            String spellId = (String) request.get("spellId");
            String casterId = (String) request.get("casterId");
            String targetId = (String) request.get("targetId");
            Integer casterLevel = (Integer) request.getOrDefault("casterLevel", 1);
            Integer manaCost = (Integer) request.getOrDefault("manaCost", 10);
            String spellType = (String) request.getOrDefault("spellType", "offensive");
            
            // Get spell details
            Map<String, Object> spell = spellService.getSpell(spellId);
            if (spell == null) {
                return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", "Spell not found: " + spellId
                ));
            }
            
            // Calculate causal effects for temporal spells
            Map<String, Object> causalEffects = new HashMap<>();
            if (isTemporalSpell(spellType)) {
                causalEffects = calculateTemporalSpellEffects(spell, casterLevel);
            }
            
            // Cast the spell
            Map<String, Object> result = spellService.castSpell(
                spellId, casterId, targetId, casterLevel, manaCost, causalEffects
            );
            
            // Add causal metrics to result
            result.putAll(causalEffects);
            
            return ResponseEntity.ok(result);
            
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", "Spell cast failed: " + e.getMessage()
            ));
        }
    }

    /**
     * 📚 Get available spells for a hero
     */
    @GetMapping("/hero/{heroId}/available")
    public ResponseEntity<List<Map<String, Object>>> getAvailableSpells(
            @PathVariable String heroId,
            @RequestParam(defaultValue = "1") Integer heroLevel,
            @RequestParam(defaultValue = "100") Integer currentMana) {
        
        List<Map<String, Object>> spells = spellService.getAvailableSpells(heroId, heroLevel, currentMana);
        return ResponseEntity.ok(spells);
    }

    /**
     * 🏰 Get spells available from castle buildings
     */
    @GetMapping("/castle/{castleId}/available")
    public ResponseEntity<List<Map<String, Object>>> getCastleSpells(@PathVariable String castleId) {
        List<Map<String, Object>> spells = spellService.getCastleSpells(castleId);
        return ResponseEntity.ok(spells);
    }

    /**
     * 📖 Get spell details
     */
    @GetMapping("/{spellId}")
    public ResponseEntity<Map<String, Object>> getSpellDetails(@PathVariable String spellId) {
        Map<String, Object> spell = spellService.getSpell(spellId);
        if (spell == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(spell);
    }

    /**
     * 🧪 Calculate spell damage/effects
     */
    @PostMapping("/calculate-effects")
    public ResponseEntity<Map<String, Object>> calculateSpellEffects(@RequestBody Map<String, Object> request) {
        try {
            String spellId = (String) request.get("spellId");
            Integer casterLevel = (Integer) request.getOrDefault("casterLevel", 1);
            Integer spellPower = (Integer) request.getOrDefault("spellPower", 10);
            String targetType = (String) request.getOrDefault("targetType", "unit");
            
            Map<String, Object> effects = spellService.calculateSpellEffects(
                spellId, casterLevel, spellPower, targetType
            );
            
            return ResponseEntity.ok(effects);
            
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", "Effect calculation failed: " + e.getMessage()
            ));
        }
    }

    /**
     * ⏰ Cast temporal spell (AXISI/LENTUS effects)
     */
    @PostMapping("/cast-temporal")
    public ResponseEntity<Map<String, Object>> castTemporalSpell(@RequestBody Map<String, Object> request) {
        try {
            String spellType = (String) request.get("spellType"); // "AXISI" or "LENTUS"
            Double temporalFactor = (Double) request.getOrDefault("temporalFactor", 1.5);
            Integer durationTurns = (Integer) request.getOrDefault("durationTurns", 3);
            String casterId = (String) request.get("casterId");
            String targetId = (String) request.get("targetId");
            
            // Calculate causal effects (simplified implementation)
            Map<String, Object> causalEffects = new HashMap<>();
            if ("AXISI".equals(spellType)) {
                causalEffects.put("paradoxRisk", Math.min(0.95, temporalFactor * 0.15 + (durationTurns * 0.05)));
                causalEffects.put("temporalStability", Math.max(0.1, 1.0 - (temporalFactor - 1.0) * 0.3));
                causalEffects.put("affectedRadius", Math.sqrt(temporalFactor * temporalFactor + durationTurns * durationTurns) * 1.2);
                causalEffects.put("causalWeight", temporalFactor * durationTurns * 0.4);
            } else if ("LENTUS".equals(spellType)) {
                causalEffects.put("paradoxRisk", Math.min(0.95, (1.0 - temporalFactor) * 0.2));
                causalEffects.put("temporalStability", Math.max(0.2, 0.8 + temporalFactor * 0.2));
                causalEffects.put("affectedRadius", Math.sqrt(temporalFactor * temporalFactor) * 0.8);
            } else {
                throw new IllegalArgumentException("Invalid temporal spell type: " + spellType);
            }
            
            // Apply temporal spell effects
            Map<String, Object> result = spellService.applyTemporalSpell(
                casterId, targetId, spellType, temporalFactor, durationTurns, causalEffects
            );
            
            return ResponseEntity.ok(result);
            
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", "Temporal spell failed: " + e.getMessage()
            ));
        }
    }

    /**
     * 🌀 Cast quantum spell with superposition effects
     */
    @PostMapping("/cast-quantum")
    public ResponseEntity<Map<String, Object>> castQuantumSpell(@RequestBody Map<String, Object> request) {
        try {
            String spellId = (String) request.get("spellId");
            String casterId = (String) request.get("casterId");
            @SuppressWarnings("unchecked")
            List<String> targetIds = (List<String>) request.get("targetIds");
            Double quantumAmplitude = (Double) request.getOrDefault("quantumAmplitude", 0.8);
            
            Map<String, Object> result = spellService.castQuantumSpell(
                spellId, casterId, targetIds, quantumAmplitude
            );
            
            return ResponseEntity.ok(result);
            
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", "Quantum spell failed: " + e.getMessage()
            ));
        }
    }

    /**
     * 📊 Get spell statistics and effects history
     */
    @GetMapping("/stats/{heroId}")
    public ResponseEntity<Map<String, Object>> getSpellStats(@PathVariable String heroId) {
        Map<String, Object> stats = spellService.getSpellStatistics(heroId);
        return ResponseEntity.ok(stats);
    }

    /**
     * 🔄 Reset spell cooldowns (admin/debug)
     */
    @PostMapping("/reset-cooldowns/{heroId}")
    public ResponseEntity<Map<String, Object>> resetSpellCooldowns(@PathVariable String heroId) {
        boolean success = spellService.resetSpellCooldowns(heroId);
        return ResponseEntity.ok(Map.of(
            "success", success,
            "message", success ? "Cooldowns reset" : "Failed to reset cooldowns"
        ));
    }

    // ======================
    // PRIVATE HELPER METHODS
    // ======================

    private boolean isTemporalSpell(String spellType) {
        return spellType.contains("temporal") || 
               spellType.contains("time") || 
               spellType.contains("causal") ||
               spellType.equals("AXISI") ||
               spellType.equals("LENTUS");
    }

    private Map<String, Object> calculateTemporalSpellEffects(Map<String, Object> spell, Integer casterLevel) {
        Map<String, Object> effects = new HashMap<>();
        
        try {
            // Base temporal factor based on spell level and caster level
            Double temporalFactor = 1.0 + (casterLevel * 0.2);
            Integer durationTurns = Math.max(1, casterLevel / 2);
            
            // Calculate causal effects using simplified formulas
            effects.put("paradoxRisk", Math.min(0.95, temporalFactor * 0.15 + (durationTurns * 0.05)));
            effects.put("temporalStability", Math.max(0.1, 1.0 - (temporalFactor - 1.0) * 0.3));
            effects.put("affectedRadius", Math.sqrt(temporalFactor * temporalFactor + durationTurns * durationTurns) * 1.2);
            effects.put("causalWeight", temporalFactor * durationTurns * 0.4);
            effects.put("spellType", "temporal");
            effects.put("casterLevel", casterLevel);
            
        } catch (Exception e) {
            System.err.println("Error calculating temporal spell effects: " + e.getMessage());
            // Fallback values
            effects.put("paradoxRisk", 0.1);
            effects.put("temporalStability", 0.9);
            effects.put("affectedRadius", 1.0);
        }
        
        return effects;
    }
} 