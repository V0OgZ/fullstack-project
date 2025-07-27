package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;
import java.time.LocalDateTime;

/**
 * 🪄 SPELL SERVICE - JEAN-GROFIGNON MAGIC SYSTEM
 * ==============================================
 * 
 * Service de gestion des sorts et de la magie dans Heroes of Time.
 * Implémente la logique métier pour les sorts, effets temporels et quantiques.
 * 
 * FONCTIONNALITÉS:
 * - Bibliothèque de sorts complète
 * - Calcul des effets et dégâts  
 * - Gestion mana et cooldowns
 * - Sorts temporels AXISI/LENTUS
 * - Sorts quantiques avec superposition
 * 
 * JEAN SAYS: "Chaque sort est un collapse d'état quantique contrôlé !"
 */
@Service
public class SpellService {

    @Autowired
    private BuildingService buildingService;

    // Base spell database
    private static final Map<String, Map<String, Object>> SPELL_DATABASE = new HashMap<>();
    
    // Hero spell cooldowns (heroId -> spellId -> cooldownEnd)
    private final Map<String, Map<String, LocalDateTime>> spellCooldowns = new HashMap<>();
    
    // Spell effect history
    private final Map<String, List<Map<String, Object>>> spellHistory = new HashMap<>();

    static {
        initializeSpellDatabase();
    }

    /**
     * 🔮 Cast a spell with full effects calculation
     */
    public Map<String, Object> castSpell(String spellId, String casterId, String targetId, 
                                       Integer casterLevel, Integer manaCost, 
                                       Map<String, Object> causalEffects) {
        
        Map<String, Object> spell = getSpell(spellId);
        if (spell == null) {
            throw new RuntimeException("Spell not found: " + spellId);
        }
        
        // Check cooldown
        if (isSpellOnCooldown(casterId, spellId)) {
            throw new RuntimeException("Spell is on cooldown");
        }
        
        // Calculate spell effects
        Map<String, Object> effects = calculateSpellEffects(spellId, casterLevel, 
                                     (Integer) spell.get("basePower"), "unit");
        
        // Apply cooldown
        applySpellCooldown(casterId, spellId, (Integer) spell.get("cooldown"));
        
        // Create result
        Map<String, Object> result = new HashMap<>();
        result.put("success", true);
        result.put("spellId", spellId);
        result.put("spellName", spell.get("name"));
        result.put("casterId", casterId);
        result.put("targetId", targetId);
        result.put("manaCost", manaCost);
        result.put("effects", effects);
        result.put("causalEffects", causalEffects);
        result.put("castTime", LocalDateTime.now());
        
        // Add to history
        addToSpellHistory(casterId, result);
        
        return result;
    }

    /**
     * 📚 Get available spells for a hero
     */
    public List<Map<String, Object>> getAvailableSpells(String heroId, Integer heroLevel, Integer currentMana) {
        List<Map<String, Object>> availableSpells = new ArrayList<>();
        
        for (Map.Entry<String, Map<String, Object>> entry : SPELL_DATABASE.entrySet()) {
            String spellId = entry.getKey();
            Map<String, Object> spell = entry.getValue();
            
            Integer requiredLevel = (Integer) spell.get("requiredLevel");
            Integer manaCost = (Integer) spell.get("manaCost");
            
            // Check level and mana requirements
            if (heroLevel >= requiredLevel && currentMana >= manaCost) {
                Map<String, Object> availableSpell = new HashMap<>(spell);
                availableSpell.put("spellId", spellId);
                availableSpell.put("onCooldown", isSpellOnCooldown(heroId, spellId));
                availableSpells.add(availableSpell);
            }
        }
        
        return availableSpells;
    }

    /**
     * 🏰 Get spells available from castle buildings
     */
    public List<Map<String, Object>> getCastleSpells(String castleId) {
        // Real implementation - integrated with BuildingService
        List<Map<String, Object>> castleSpells = new ArrayList<>();
        
        try {
            // Get spell IDs from castle buildings
            List<String> availableSpellIds = buildingService.getAvailableSpells(castleId);
            
            // Convert spell IDs to full spell information
            for (String spellId : availableSpellIds) {
                if (SPELL_DATABASE.containsKey(spellId)) {
                    Map<String, Object> spellData = SPELL_DATABASE.get(spellId);
                    castleSpells.add(createSpellInfoFromData(spellId, spellData));
                } else {
                    // Fallback: create basic spell info if not in database  
                    castleSpells.add(createBasicSpellInfo(spellId));
                }
            }
            
            // If no spells found, add default castle spells
            if (castleSpells.isEmpty()) {
                castleSpells.add(createSpellInfo("magic_arrow", "Magic Arrow", 1, 5, 10));
                castleSpells.add(createSpellInfo("bless", "Bless", 2, 10, 15));
            }
            
        } catch (Exception e) {
            // Fallback to basic spells on error
            castleSpells.add(createSpellInfo("magic_arrow", "Magic Arrow", 1, 5, 10));
            castleSpells.add(createSpellInfo("bless", "Bless", 2, 10, 15));
        }
        
        return castleSpells;
    }

    /**
     * 📖 Get spell details
     */
    public Map<String, Object> getSpell(String spellId) {
        return SPELL_DATABASE.get(spellId);
    }

    /**
     * 🧪 Calculate spell effects based on level and power
     */
    public Map<String, Object> calculateSpellEffects(String spellId, Integer casterLevel, 
                                                   Integer spellPower, String targetType) {
        Map<String, Object> spell = getSpell(spellId);
        if (spell == null) {
            throw new RuntimeException("Spell not found: " + spellId);
        }
        
        Map<String, Object> effects = new HashMap<>();
        String spellType = (String) spell.get("type");
        Integer baseDamage = (Integer) spell.get("baseDamage");
        
        switch (spellType) {
            case "offensive":
                effects.put("damage", calculateDamage(baseDamage, casterLevel, spellPower));
                effects.put("hitChance", Math.min(95, 70 + casterLevel * 2));
                break;
                
            case "defensive":
                effects.put("shieldValue", baseDamage + casterLevel * 5);
                effects.put("duration", 3 + casterLevel / 2);
                break;
                
            case "healing":
                effects.put("healAmount", calculateHealing(baseDamage, casterLevel, spellPower));
                effects.put("overHealPossible", casterLevel >= 5);
                break;
                
            case "temporal":
                effects.put("temporalFactor", 1.0 + (casterLevel * 0.1));
                effects.put("durationTurns", Math.max(1, casterLevel / 2));
                effects.put("affectedRadius", 1.0 + (casterLevel / 3.0));
                break;
                
            case "quantum":
                effects.put("quantumAmplitude", 0.5 + (casterLevel * 0.05));
                effects.put("superpositionTargets", Math.min(5, 1 + casterLevel / 3));
                effects.put("collapseChance", Math.min(90, 50 + casterLevel * 3));
                break;
        }
        
        effects.put("spellType", spellType);
        effects.put("casterLevel", casterLevel);
        effects.put("spellPower", spellPower);
        
        return effects;
    }

    /**
     * ⏰ Apply temporal spell effects
     */
    public Map<String, Object> applyTemporalSpell(String casterId, String targetId, String spellType,
                                                Double temporalFactor, Integer durationTurns, 
                                                Map<String, Object> causalEffects) {
        
        Map<String, Object> result = new HashMap<>();
        result.put("success", true);
        result.put("casterId", casterId);
        result.put("targetId", targetId);
        result.put("spellType", spellType);
        result.put("temporalFactor", temporalFactor);
        result.put("durationTurns", durationTurns);
        result.put("causalEffects", causalEffects);
        result.put("appliedAt", LocalDateTime.now());
        
        // Add specific temporal effects
        if ("AXISI".equals(spellType)) {
            result.put("effect", "Time acceleration applied");
            result.put("speedBonus", temporalFactor);
            result.put("actionPointsBonus", (int)(temporalFactor * 2));
        } else if ("LENTUS".equals(spellType)) {
            result.put("effect", "Time deceleration applied");
            result.put("speedPenalty", 1.0 / temporalFactor);
            result.put("actionPointsPenalty", temporalFactor.intValue());
        }
        
        return result;
    }

    /**
     * 🌀 Cast quantum spell with superposition
     */
    public Map<String, Object> castQuantumSpell(String spellId, String casterId, 
                                              List<String> targetIds, Double quantumAmplitude) {
        
        Map<String, Object> spell = getSpell(spellId);
        if (spell == null) {
            throw new RuntimeException("Spell not found: " + spellId);
        }
        
        Map<String, Object> result = new HashMap<>();
        result.put("success", true);
        result.put("spellId", spellId);
        result.put("casterId", casterId);
        result.put("quantumTargets", targetIds);
        result.put("quantumAmplitude", quantumAmplitude);
        result.put("superpositionState", "active");
        
        // Calculate quantum effects for each target
        List<Map<String, Object>> quantumEffects = new ArrayList<>();
        for (String targetId : targetIds) {
            Map<String, Object> targetEffect = new HashMap<>();
            targetEffect.put("targetId", targetId);
            targetEffect.put("amplitude", quantumAmplitude / targetIds.size());
            targetEffect.put("probability", quantumAmplitude * quantumAmplitude);
            targetEffect.put("state", "superposed");
            quantumEffects.add(targetEffect);
        }
        
        result.put("quantumEffects", quantumEffects);
        result.put("collapseCondition", "observation_or_interaction");
        
        return result;
    }

    /**
     * 📊 Get spell statistics for a hero
     */
    public Map<String, Object> getSpellStatistics(String heroId) {
        Map<String, Object> stats = new HashMap<>();
        
        List<Map<String, Object>> history = spellHistory.getOrDefault(heroId, new ArrayList<>());
        
        stats.put("totalSpellsCast", history.size());
        stats.put("favoriteSpell", getMostUsedSpell(history));
        stats.put("totalManaCost", calculateTotalManaCost(history));
        stats.put("spellTypes", getSpellTypeBreakdown(history));
        stats.put("recentSpells", history.stream().limit(10).toList());
        
        return stats;
    }

    /**
     * 🔄 Reset spell cooldowns
     */
    public boolean resetSpellCooldowns(String heroId) {
        spellCooldowns.remove(heroId);
        return true;
    }

    // ======================
    // PRIVATE HELPER METHODS
    // ======================

    private static void initializeSpellDatabase() {
        // Offensive Spells
        SPELL_DATABASE.put("magic_arrow", createSpell("Magic Arrow", "offensive", 1, 5, 10, 0, 15));
        SPELL_DATABASE.put("fireball", createSpell("Fireball", "offensive", 3, 15, 25, 2, 20));
        SPELL_DATABASE.put("lightning_bolt", createSpell("Lightning Bolt", "offensive", 4, 20, 35, 1, 25));
        SPELL_DATABASE.put("meteor_shower", createSpell("Meteor Shower", "offensive", 6, 50, 80, 5, 40));
        
        // Defensive Spells
        SPELL_DATABASE.put("bless", createSpell("Bless", "defensive", 2, 10, 0, 3, 15));
        SPELL_DATABASE.put("shield", createSpell("Shield", "defensive", 3, 15, 0, 4, 20));
        SPELL_DATABASE.put("protection", createSpell("Protection", "defensive", 4, 25, 0, 5, 30));
        
        // Healing Spells
        SPELL_DATABASE.put("cure", createSpell("Cure", "healing", 1, 8, 20, 0, 10));
        SPELL_DATABASE.put("heal", createSpell("Heal", "healing", 3, 15, 40, 2, 15));
        SPELL_DATABASE.put("regeneration", createSpell("Regeneration", "healing", 5, 30, 60, 4, 25));
        
        // Temporal Spells (Jean-Grofignon Special)
        SPELL_DATABASE.put("axisi_acceleration", createSpell("AXISI Acceleration", "temporal", 4, 25, 0, 3, 30));
        SPELL_DATABASE.put("lentus_deceleration", createSpell("LENTUS Deceleration", "temporal", 4, 25, 0, 3, 30));
        SPELL_DATABASE.put("temporal_rift", createSpell("Temporal Rift", "temporal", 6, 40, 0, 5, 45));
        
        // Quantum Spells (Advanced Jean-Grofignon)
        SPELL_DATABASE.put("quantum_superposition", createSpell("Quantum Superposition", "quantum", 5, 35, 0, 4, 40));
        SPELL_DATABASE.put("causal_collapse", createSpell("Causal Collapse", "quantum", 7, 50, 50, 6, 50));
        SPELL_DATABASE.put("grofi_fusion", createSpell("Grofi Fusion", "quantum", 8, 60, 80, 7, 60));
    }

    private static Map<String, Object> createSpell(String name, String type, Integer requiredLevel,
                                                 Integer manaCost, Integer baseDamage, Integer cooldown, Integer basePower) {
        Map<String, Object> spell = new HashMap<>();
        spell.put("name", name);
        spell.put("type", type);
        spell.put("requiredLevel", requiredLevel);
        spell.put("manaCost", manaCost);
        spell.put("baseDamage", baseDamage);
        spell.put("cooldown", cooldown);
        spell.put("basePower", basePower);
        return spell;
    }

    private Map<String, Object> createSpellInfo(String spellId, String name, Integer level, Integer mana, Integer power) {
        Map<String, Object> spell = new HashMap<>();
        spell.put("spellId", spellId);
        spell.put("name", name);
        spell.put("requiredLevel", level);
        spell.put("manaCost", mana);
        spell.put("basePower", power);
        spell.put("available", true);
        return spell;
    }

    private boolean isSpellOnCooldown(String heroId, String spellId) {
        Map<String, LocalDateTime> heroCooldowns = spellCooldowns.get(heroId);
        if (heroCooldowns == null) return false;
        
        LocalDateTime cooldownEnd = heroCooldowns.get(spellId);
        return cooldownEnd != null && LocalDateTime.now().isBefore(cooldownEnd);
    }

    private void applySpellCooldown(String heroId, String spellId, Integer cooldownTurns) {
        spellCooldowns.computeIfAbsent(heroId, k -> new HashMap<>())
                     .put(spellId, LocalDateTime.now().plusMinutes(cooldownTurns));
    }

    private void addToSpellHistory(String heroId, Map<String, Object> spellResult) {
        spellHistory.computeIfAbsent(heroId, k -> new ArrayList<>()).add(spellResult);
    }

    private Integer calculateDamage(Integer baseDamage, Integer casterLevel, Integer spellPower) {
        return baseDamage + (casterLevel * 2) + (spellPower / 2) + (int)(Math.random() * 10);
    }

    private Integer calculateHealing(Integer baseHealing, Integer casterLevel, Integer spellPower) {
        return baseHealing + (casterLevel * 3) + (spellPower / 3) + (int)(Math.random() * 5);
    }

    private String getMostUsedSpell(List<Map<String, Object>> history) {
        Map<String, Long> spellCounts = new HashMap<>();
        for (Map<String, Object> spell : history) {
            String spellId = (String) spell.get("spellId");
            spellCounts.put(spellId, spellCounts.getOrDefault(spellId, 0L) + 1);
        }
        return spellCounts.entrySet().stream()
                         .max(Map.Entry.comparingByValue())
                         .map(Map.Entry::getKey)
                         .orElse("none");
    }

    private Integer calculateTotalManaCost(List<Map<String, Object>> history) {
        return history.stream()
                     .mapToInt(spell -> (Integer) spell.getOrDefault("manaCost", 0))
                     .sum();
    }

    private Map<String, Long> getSpellTypeBreakdown(List<Map<String, Object>> history) {
        Map<String, Long> breakdown = new HashMap<>();
        for (Map<String, Object> spell : history) {
            Map<String, Object> effects = (Map<String, Object>) spell.get("effects");
            if (effects != null) {
                String type = (String) effects.get("spellType");
                breakdown.put(type, breakdown.getOrDefault(type, 0L) + 1);
            }
        }
        return breakdown;
    }
    
    /**
     * Create spell info from database data
     */
    private Map<String, Object> createSpellInfoFromData(String spellId, Map<String, Object> spellData) {
        Map<String, Object> spellInfo = new HashMap<>();
        spellInfo.put("id", spellId);
        spellInfo.put("name", spellData.getOrDefault("name", spellId));
        spellInfo.put("level", spellData.getOrDefault("level", 1));
        spellInfo.put("manaCost", spellData.getOrDefault("manaCost", 10));
        spellInfo.put("damage", spellData.getOrDefault("damage", 15));
        spellInfo.put("description", spellData.getOrDefault("description", "Castle spell"));
        spellInfo.put("type", spellData.getOrDefault("type", "offensive"));
        spellInfo.put("range", spellData.getOrDefault("range", 1));
        spellInfo.put("duration", spellData.getOrDefault("duration", 0));
        spellInfo.put("source", "castle_building");
        return spellInfo;
    }
    
    /**
     * Create basic spell info for unknown spells
     */
    private Map<String, Object> createBasicSpellInfo(String spellId) {
        Map<String, Object> spellInfo = new HashMap<>();
        spellInfo.put("id", spellId);
        spellInfo.put("name", capitalizeFirst(spellId.replace("_", " ")));
        spellInfo.put("level", 1);
        spellInfo.put("manaCost", 10);
        spellInfo.put("damage", 12);
        spellInfo.put("description", "Basic castle spell");
        spellInfo.put("type", "offensive");
        spellInfo.put("range", 1);
        spellInfo.put("duration", 0);
        spellInfo.put("source", "castle_building");
        return spellInfo;
    }
    
    /**
     * Capitalize first letter of a string
     */
    private String capitalizeFirst(String str) {
        if (str == null || str.isEmpty()) return str;
        return str.substring(0, 1).toUpperCase() + str.substring(1);
    }
} 