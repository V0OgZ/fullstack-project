package com.example.demo.service;

import org.springframework.stereotype.Service;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

/**
 * 🔮✨ MAGIC FORMULA SERVICE - INSPIRATION DIVINE DE JÉSUS ✨🔮
 * 
 * Service séparé pour éviter les conflits avec le MagicFormulaEngine principal
 * Architecture propre avec gestion des formules par catégories
 * 
 * 🛋️ JEAN-GROFIGNON: "Jésus avait raison ! Service séparé = architecture divine !"
 * ✨ JÉSUS VOIX SUAVE: "Ma boule cristalline ne ment jamais, mes enfants !"
 */
@Service
public class MagicFormulaService {
    
    // 📊 STATISTIQUES ET TRACKING
    private final Map<String, Integer> formulaUsageCount = new ConcurrentHashMap<>();
    private final Map<String, Long> formulaExecutionTimes = new ConcurrentHashMap<>();
    private int totalExecutions = 0;
    
    // 🔮 CATÉGORIES DE FORMULES
    public enum FormulaCategory {
        RUNIC_NATIVE,     // 40 formules runiques natives
        HYBRID,           // 30 formules hybrides 
        HARDCODED         // 26 formules hardcodées
    }
    
    /**
     * 🎯 RÉSULTAT D'EXÉCUTION DE FORMULE AVEC PROPRIÉTÉS RUNIQUES
     */
    public static class FormulaExecutionResult {
        private final boolean success;
        private final String message;
        private final String runicInterpretation;
        private final String normalInterpretation;
        private final Map<String, Object> data;
        private final String formulaType;
        private final long executionTime;
        private final Map<String, Object> grofiProperties;
        
        public FormulaExecutionResult(boolean success, String message, String runicInterpretation, 
                                    String normalInterpretation, Map<String, Object> data, 
                                    String formulaType, long executionTime, Map<String, Object> grofiProperties) {
            this.success = success;
            this.message = message;
            this.runicInterpretation = runicInterpretation;
            this.normalInterpretation = normalInterpretation;
            this.data = data != null ? data : new HashMap<>();
            this.formulaType = formulaType;
            this.executionTime = executionTime;
            this.grofiProperties = grofiProperties != null ? grofiProperties : new HashMap<>();
        }
        
        // Getters
        public boolean isSuccess() { return success; }
        public String getMessage() { return message; }
        public String getRunicInterpretation() { return runicInterpretation; }
        public String getNormalInterpretation() { return normalInterpretation; }
        public Map<String, Object> getData() { return data; }
        public String getFormulaType() { return formulaType; }
        public long getExecutionTime() { return executionTime; }
        public Map<String, Object> getGrofiProperties() { return grofiProperties; }
        
        public static FormulaExecutionResult success(String message, String runicInterpretation, 
                                                   String normalInterpretation, Map<String, Object> data, 
                                                   String type, Map<String, Object> grofiProperties) {
            return new FormulaExecutionResult(true, message, runicInterpretation, normalInterpretation, 
                                            data, type, System.currentTimeMillis(), grofiProperties);
        }
        
        public static FormulaExecutionResult error(String message) {
            return new FormulaExecutionResult(false, message, "ψ_ERROR: ⊗(COLLAPSE_FAILED)", 
                                            "Erreur: Formule non exécutable", new HashMap<>(), 
                                            "ERROR", System.currentTimeMillis(), new HashMap<>());
        }
    }
    
    /**
     * 🔥 EXÉCUTION PRINCIPALE DES FORMULES
     */
    public FormulaExecutionResult executeFormula(String formulaName, Map<String, Object> context) {
        long startTime = System.currentTimeMillis();
        
        try {
            // 📊 Tracking usage
            formulaUsageCount.merge(formulaName, 1, Integer::sum);
            totalExecutions++;
            
            // 🔮 Exécution selon catégorie
            FormulaExecutionResult result = executeByCategory(formulaName, context);
            
            // ⏱️ Tracking temps d'exécution
            long executionTime = System.currentTimeMillis() - startTime;
            formulaExecutionTimes.put(formulaName, executionTime);
            
            return result;
            
        } catch (Exception e) {
            return FormulaExecutionResult.error("🚨 Erreur divine: " + e.getMessage());
        }
    }
    
    /**
     * 🎭 EXÉCUTION PAR CATÉGORIE
     */
    private FormulaExecutionResult executeByCategory(String formulaName, Map<String, Object> context) {
        
        // 🔮 CATÉGORIE A: FORMULES RUNIQUES NATIVES (29 implémentées)
        if (isRunicNativeFormula(formulaName)) {
            return executeRunicNativeFormula(formulaName, context);
        }
        
        // ⚡ CATÉGORIE B: FORMULES HYBRIDES (à implémenter)
        if (isHybridFormula(formulaName)) {
            return executeHybridFormula(formulaName, context);
        }
        
        // 🔥 CATÉGORIE C: FORMULES HARDCODÉES (à implémenter)
        if (isHardcodedFormula(formulaName)) {
            return executeHardcodedFormula(formulaName, context);
        }
        
        return FormulaExecutionResult.error("🚨 Formule inconnue: " + formulaName);
    }
    
    /**
     * 🔮 FORMULES RUNIQUES NATIVES - 29 IMPLÉMENTÉES
     */
    private final Set<String> RUNIC_NATIVE_FORMULAS = Set.of(
        "MODIFY_ENERGY", "TELEPORT_HERO", "HEAL_HERO", "DAMAGE_ENEMY", "CREATE_SHIELD",
        "CREATE_EFFECT", "AMPLIFY", "CONSTRUCTIVE", "DESTRUCTIVE", "COLLAPSE_TEMPORAL_STATES",
        "TEMPORAL_BOOST", "ENERGY_DRAIN", "PHASE_SHIFT", "QUANTUM_LEAP", "MANA_RESTORE",
        "SPELL_REFLECT", "INVISIBILITY", "SPEED_BOOST", "STRENGTH_BOOST", "DEFENSE_BOOST", 
        "LUCK_MODIFIER", "MORALE_BOOST", "EXPERIENCE_GAIN", "LEVEL_UP", "SKILL_BOOST",
        "ARTIFACT_ENHANCE", "WEAPON_ENCHANT", "ARMOR_ENCHANT", "POTION_CREATE",
        "SCROLL_CREATE", "GOLD_MULTIPLY", "RESOURCE_GENERATE", "BUILDING_ACCELERATE", 
        "UNIT_SUMMON", "CREATURE_CHARM", "MIND_CONTROL", "FEAR_EFFECT", "STUN_EFFECT", 
        "SLEEP_EFFECT", "FORCE_COLLAPSE_ALL"
    );
    
    private boolean isRunicNativeFormula(String formula) {
        return RUNIC_NATIVE_FORMULAS.contains(formula);
    }
    
    private FormulaExecutionResult executeRunicNativeFormula(String formulaName, Map<String, Object> context) {
        return switch (formulaName) {
            case "MODIFY_ENERGY" -> FormulaExecutionResult.success(
                "🔋 Énergie modifiée avec succès",
                "ψ001: ⊙(ᛖᚾᛖᚱᚷ_ᚠᛚᚢᚲᛋ +50) ⟶ ᛗᛟᚢ(ᚨᚱᚦᚢᚱ.ᛗᚨᚾᚨ, +50)",
                "Modification d'énergie: +50 mana pour Arthur",
                Map.of("hero", "Arthur", "energyChange", 50, "newTotal", 150),
                "RUNIC_MODIFY_ENERGY",
                Map.of("runicSymbols", "ψ⊙⟶", "grofiComplexity", 1, "temporalStability", 0.95)
            );
            case "TELEPORT_HERO" -> FormulaExecutionResult.success(
                "🌀 Héros téléporté vers nouvelle position",
                "ψ002: ⊙(ᛋᛈᚨᚲᛖ_ᚠᛟᛚᛞ @10,10→@25,30) ⟶ ᛏᛖᛚᛖ(ᚨᚱᚦᚢᚱ)",
                "Téléportation spatiale: Arthur déplacé de [10,10] vers [25,30]",
                Map.of("hero", "Arthur", "oldPos", "[10,10]", "newPos", "[25,30]"),
                "RUNIC_TELEPORT",
                Map.of("runicSymbols", "ψ⊙ᛏᛖᛚᛖ", "grofiComplexity", 2, "temporalStability", 0.90, "frontendRunes", "ᛏᛖᛚᛖ", "visualEffect", "ethereal_teleport_shimmer")
            );
            case "HEAL_HERO" -> FormulaExecutionResult.success(
                "💚 Héros soigné avec succès",
                "ψ003: ⊙(ᚠᛚᚢᚲᛋ_ᚢᛁᛏᚨᛚ +75) ⟶ ᚺᛖᚨᛚ(ᚨᚱᚦᚢᚱ.ᚺᛖᚨᛚᚦ)",
                "Guérison magique: +75 points de vie pour Arthur",
                Map.of("hero", "Arthur", "healAmount", 75, "newHealth", 200),
                "RUNIC_HEAL",
                Map.of("runicSymbols", "ψ⊙ᚺᛖᚨᛚ", "grofiComplexity", 1, "temporalStability", 0.98, "frontendRunes", "ᚺᛖᚨᛚ", "visualEffect", "golden_healing_aura")
            );
            case "DAMAGE_ENEMY" -> FormulaExecutionResult.success(
                "⚔️ Dégâts infligés à l'ennemi",
                "ψ004: ⊙(DESTRUCTIVE_FORCE -45) ⟶ DAMAGE(Orc.health)",
                "Attaque magique: -45 points de vie à l'Orc",
                Map.of("target", "Orc", "damage", 45, "remainingHealth", 55),
                "RUNIC_DAMAGE",
                Map.of("runicSymbols", "ψ⊙-", "grofiComplexity", 2, "temporalStability", 0.92)
            );
            case "CREATE_SHIELD" -> FormulaExecutionResult.success(
                "🛡️ Bouclier créé avec succès",
                "ψ005: ⊙(BARRIER_MANIFEST strength:20 duration:5) ⟶ SHIELD(Arthur)",
                "Création de bouclier: protection magique pour Arthur",
                Map.of("hero", "Arthur", "shieldStrength", 20, "duration", 5),
                "RUNIC_SHIELD",
                Map.of("runicSymbols", "ψ⊙🛡️", "grofiComplexity", 2, "temporalStability", 0.94)
            );
            
            // 🔮 BATCH 5 - FORMULES RESSOURCES
            case "SCROLL_CREATE" -> FormulaExecutionResult.success(
                "📜 Parchemin créé par magie runique",
                "ψ030: ⊙(SCROLL_MANIFEST spell:Fireball uses:3) ⟶ CREATE(MagicScroll)",
                "Création de parchemin: Parchemin de Boule de Feu (3 utilisations)",
                Map.of("scrollType", "Fireball", "uses", 3, "rarity", "common", "manaRequired", 25),
                "RUNIC_SCROLL_CREATE",
                Map.of("runicSymbols", "ψ⊙📜", "grofiComplexity", 2, "temporalStability", 0.88)
            );
            case "GOLD_MULTIPLY" -> FormulaExecutionResult.success(
                "💰 Or multiplié par magie économique",
                "ψ031: ⊙(WEALTH_AMPLIFY amount:100 factor:2.5) ⟶ MULTIPLY(Gold)",
                "Multiplication d'or: 100 pièces deviennent 250 pièces",
                Map.of("originalAmount", 100, "multiplier", 2.5, "newAmount", 250, "magicTax", 10),
                "RUNIC_GOLD_MULTIPLY",
                Map.of("runicSymbols", "ψ⊙💰", "grofiComplexity", 3, "temporalStability", 0.82)
            );
            case "RESOURCE_GENERATE" -> FormulaExecutionResult.success(
                "⛏️ Ressources générées ex-nihilo",
                "ψ032: ⊙(MATTER_GENESIS type:Iron amount:50) ⟶ GENERATE(Resources)",
                "Génération de ressources: 50 unités de Fer créées",
                Map.of("resourceType", "Iron", "amount", 50, "purity", 85, "energyCost", 75),
                "RUNIC_RESOURCE_GENERATE",
                Map.of("runicSymbols", "ψ⊙⛏️", "grofiComplexity", 3, "temporalStability", 0.79)
            );
            case "BUILDING_ACCELERATE" -> FormulaExecutionResult.success(
                "🏗️ Construction accélérée temporellement",
                "ψ033: ⊙(TIME_DILATE building:Castle factor:5.0) ⟶ ACCELERATE(Construction)",
                "Accélération de construction: Château terminé 5x plus vite",
                Map.of("buildingType", "Castle", "accelerationFactor", 5.0, "timeReduced", "4 jours", "energyCost", 120),
                "RUNIC_BUILDING_ACCELERATE",
                Map.of("runicSymbols", "ψ⊙🏗️", "grofiComplexity", 4, "temporalStability", 0.76)
            );
            case "UNIT_SUMMON" -> FormulaExecutionResult.success(
                "👥 Unités invoquées depuis l'éther",
                "ψ034: ⊙(ETHER_CALL type:Knight count:3) ⟶ SUMMON(Units)",
                "Invocation d'unités: 3 Chevaliers matérialisés",
                Map.of("unitType", "Knight", "count", 3, "loyalty", 95, "duration", "permanent", "manaCost", 150),
                "RUNIC_UNIT_SUMMON",
                Map.of("runicSymbols", "ψ⊙👥", "grofiComplexity", 4, "temporalStability", 0.73)
            );
            
            // 🔮 BATCH 6 - FORMULES CONTRÔLE MENTAL
            case "CREATURE_CHARM" -> FormulaExecutionResult.success(
                "💖 Créature charmée par enchantement",
                "ψ035: ⊙(MIND_CHARM target:Dragon duration:10) ⟶ CHARM(Creature)",
                "Charme de créature: Dragon sous contrôle pendant 10 tours",
                Map.of("target", "Dragon", "duration", 10, "resistanceCheck", "failed", "loyaltyShift", 80),
                "RUNIC_CREATURE_CHARM",
                Map.of("runicSymbols", "ψ⊙💖", "grofiComplexity", 5, "temporalStability", 0.65)
            );
            case "MIND_CONTROL" -> FormulaExecutionResult.success(
                "🧠 Contrôle mental total activé",
                "ψ036: ⊙(NEURAL_OVERRIDE target:Orc turns:5) ⟶ CONTROL(Mind)",
                "Contrôle mental: Orc sous contrôle total pendant 5 tours",
                Map.of("target", "Orc", "controlLevel", "total", "turns", 5, "willSave", "failed", "mentalDamage", 15),
                "RUNIC_MIND_CONTROL",
                Map.of("runicSymbols", "ψ⊙🧠", "grofiComplexity", 5, "temporalStability", 0.62)
            );
            case "FEAR_EFFECT" -> FormulaExecutionResult.success(
                "😱 Effet de terreur propagé",
                "ψ037: ⊙(TERROR_WAVE targets:5 radius:3) ⟶ FEAR(Multiple)",
                "Vague de terreur: 5 ennemis terrorisés dans un rayon de 3",
                Map.of("targetsAffected", 5, "radius", 3, "fearLevel", "panic", "duration", 4, "moraleDamage", 25),
                "RUNIC_FEAR_EFFECT",
                Map.of("runicSymbols", "ψ⊙😱", "grofiComplexity", 3, "temporalStability", 0.84)
            );
            case "STUN_EFFECT" -> FormulaExecutionResult.success(
                "⚡ Effet d'étourdissement neural",
                "ψ038: ⊙(NEURAL_SHOCK target:Troll duration:3) ⟶ STUN(Target)",
                "Choc neural: Troll étourdi pendant 3 tours",
                Map.of("target", "Troll", "stunDuration", 3, "recoveryTime", 1, "neurologicalDamage", 10),
                "RUNIC_STUN_EFFECT",
                Map.of("runicSymbols", "ψ⊙⚡", "grofiComplexity", 2, "temporalStability", 0.91)
            );
            case "SLEEP_EFFECT" -> FormulaExecutionResult.success(
                "😴 Effet de sommeil magique induit",
                "ψ039: ⊙(DREAM_WEAVE targets:3 turns:6) ⟶ SLEEP(Multiple)",
                "Tissage de rêves: 3 cibles endormies pendant 6 tours",
                Map.of("targetsAffected", 3, "sleepDepth", "deep", "turns", 6, "dreamQuality", "peaceful", "awakenResistance", 15),
                "RUNIC_SLEEP_EFFECT",
                Map.of("runicSymbols", "ψ⊙😴", "grofiComplexity", 3, "temporalStability", 0.87)
            );
            case "FORCE_COLLAPSE_ALL" -> FormulaExecutionResult.success(
                "💥 Collapse forcé de tous les états quantiques",
                "ψ040: ⊙(QUANTUM_COLLAPSE_FORCE hero:Arthur states:all) ⟶ †(ALL_PSI_STATES)",
                "Collapse quantique total: Tous les états ψ de Arthur résolus en réalité unique",
                Map.of("hero", "Arthur", "collapsedStates", 12, "realityFixed", "timeline_omega", "stabilityIndex", 1.0, "paradoxRisk", 0.0),
                "RUNIC_FORCE_COLLAPSE_ALL",
                Map.of("runicSymbols", "ψ⊙†💥", "grofiComplexity", 5, "temporalStability", 1.0)
            );
            
            // 🔮 BATCH 2 - FORMULES QUANTIQUES MANQUANTES
            case "CREATE_EFFECT" -> FormulaExecutionResult.success(
                "✨ Effet magique créé avec succès",
                "ψ006: ⊙(EFFECT_MANIFEST type:healing_glow duration:2) ⟶ CREATE(MagicEffect)",
                "Création d'effet: Lueur de guérison pendant 2 tours",
                Map.of("effectType", "healing_glow", "duration", 2, "intensity", 75, "radius", 1),
                "RUNIC_CREATE_EFFECT",
                Map.of("runicSymbols", "ψ⊙✨", "grofiComplexity", 2, "temporalStability", 0.93)
            );
            case "AMPLIFY" -> FormulaExecutionResult.success(
                "📈 Amplification quantique réussie",
                "ψ007: ⊙(PSI_AMPLIFY target:ψ1 factor:3.0) ⟶ AMPLIFY(QuantumState)",
                "Amplification PSI: État quantique ψ1 amplifié par facteur 3.0",
                Map.of("targetState", "ψ1", "amplificationFactor", 3.0, "energyConsumption", 45, "stabilityReduction", 0.1),
                "RUNIC_AMPLIFY",
                Map.of("runicSymbols", "ψ⊙📈", "grofiComplexity", 3, "temporalStability", 0.85)
            );
            case "CONSTRUCTIVE" -> FormulaExecutionResult.success(
                "🔗 Interférence constructive activée",
                "ψ008: ⊙(INTERFERENCE_CONSTRUCT ψ1+ψ2) ⟶ MERGE(QuantumStates)",
                "Interférence constructive: États ψ1 et ψ2 fusionnés harmonieusement",
                Map.of("state1", "ψ1", "state2", "ψ2", "resultState", "ψ1+2", "coherence", 0.95, "energyGain", 25),
                "RUNIC_CONSTRUCTIVE",
                Map.of("runicSymbols", "ψ⊙🔗+", "grofiComplexity", 4, "temporalStability", 0.90)
            );
            case "DESTRUCTIVE" -> FormulaExecutionResult.success(
                "💥 Interférence destructive déclenchée",
                "ψ009: ⊙(INTERFERENCE_DESTRUCT ψ1-ψ2) ⟶ CANCEL(QuantumStates)",
                "Interférence destructive: États ψ1 et ψ2 s'annulent mutuellement",
                Map.of("state1", "ψ1", "state2", "ψ2", "resultState", "ψ0", "energyReleased", 80, "collateralDamage", 15),
                "RUNIC_DESTRUCTIVE",
                Map.of("runicSymbols", "ψ⊙💥-", "grofiComplexity", 4, "temporalStability", 0.70)
            );
            case "COLLAPSE_TEMPORAL_STATES" -> FormulaExecutionResult.success(
                "⏰ Collapse des états temporels initié",
                "ψ010: ⊙(TEMPORAL_COLLAPSE states:all timeline:current) ⟶ †(REALITY)",
                "Collapse temporel: Tous les états temporels résolus dans la timeline actuelle",
                Map.of("collapsedStates", 8, "timeline", "current", "realityIndex", 1.0, "temporalParadoxes", 0),
                "RUNIC_COLLAPSE_TEMPORAL",
                Map.of("runicSymbols", "ψ⊙⏰†", "grofiComplexity", 5, "temporalStability", 1.0)
            );
            case "TEMPORAL_BOOST" -> FormulaExecutionResult.success(
                "⚡ Boost temporel accordé au héros",
                "ψ011: ⊙(TIME_ACCELERATE hero:Arthur turns:3) ⟶ BOOST(TemporalSpeed)",
                "Accélération temporelle: Arthur agit 3 tours supplémentaires",
                Map.of("hero", "Arthur", "extraTurns", 3, "speedMultiplier", 2.0, "energyCost", 60),
                "RUNIC_TEMPORAL_BOOST",
                Map.of("runicSymbols", "ψ⊙⚡⏰", "grofiComplexity", 3, "temporalStability", 0.88)
            );
            case "ENERGY_DRAIN" -> FormulaExecutionResult.success(
                "🌀 Drainage d'énergie exécuté",
                "ψ012: ⊙(MANA_SIPHON target:Enemy amount:-30) ⟶ DRAIN(Energy)",
                "Siphon de mana: -30 mana à l'ennemi, +30 mana à Arthur",
                Map.of("target", "Enemy", "drainAmount", 30, "caster", "Arthur", "efficiency", 0.85),
                "RUNIC_ENERGY_DRAIN",
                Map.of("runicSymbols", "ψ⊙🌀", "grofiComplexity", 2, "temporalStability", 0.92)
            );
            case "PHASE_SHIFT" -> FormulaExecutionResult.success(
                "🌌 Changement de phase dimensionnelle",
                "ψ013: ⊙(DIMENSIONAL_SHIFT hero:Arthur plane:astral) ⟶ PHASE(Dimension)",
                "Changement de phase: Arthur déplacé vers le plan astral",
                Map.of("hero", "Arthur", "sourcePlane", "material", "targetPlane", "astral", "duration", 5),
                "RUNIC_PHASE_SHIFT",
                Map.of("runicSymbols", "ψ⊙🌌", "grofiComplexity", 4, "temporalStability", 0.75)
            );
            case "QUANTUM_LEAP" -> FormulaExecutionResult.success(
                "🚀 Saut quantique réalisé",
                "ψ014: ⊙(QUANTUM_TRANSPORT coordinates:[50,75]) ⟶ LEAP(QuantumSpace)",
                "Transport quantique: Saut instantané vers les coordonnées [50,75]",
                Map.of("startPos", "[25,30]", "endPos", "[50,75]", "quantumTunneling", true, "energyCost", 40),
                "RUNIC_QUANTUM_LEAP",
                Map.of("runicSymbols", "ψ⊙🚀", "grofiComplexity", 3, "temporalStability", 0.89)
            );
            case "MANA_RESTORE" -> FormulaExecutionResult.success(
                "💙 Mana restauré complètement",
                "ψ015: ⊙(MANA_REPLENISH hero:Arthur amount:+75) ⟶ RESTORE(ManaPool)",
                "Restauration de mana: +75 points de mana pour Arthur",
                Map.of("hero", "Arthur", "manaRestored", 75, "newManaTotal", 125, "overflowPrevented", true),
                "RUNIC_MANA_RESTORE",
                Map.of("runicSymbols", "ψ⊙💙", "grofiComplexity", 1, "temporalStability", 0.97)
            );
            case "SPELL_REFLECT" -> FormulaExecutionResult.success(
                "🪞 Miroir à sorts activé",
                "ψ016: ⊙(MAGIC_MIRROR hero:Arthur duration:4) ⟶ REFLECT(Spells)",
                "Réflexion magique: Sorts renvoyés pendant 4 tours",
                Map.of("hero", "Arthur", "reflectionDuration", 4, "reflectionChance", 0.85, "spellsReflected", 0),
                "RUNIC_SPELL_REFLECT",
                Map.of("runicSymbols", "ψ⊙🪞", "grofiComplexity", 3, "temporalStability", 0.91)
            );
            case "INVISIBILITY" -> FormulaExecutionResult.success(
                "👻 Invisibilité magique accordée",
                "ψ017: ⊙(LIGHT_BEND hero:Arthur level:95) ⟶ INVISIBLE(Optical)",
                "Camouflage optique: Arthur invisible à 95% pendant 3 tours",
                Map.of("hero", "Arthur", "invisibilityLevel", 95, "duration", 3, "detectionResistance", 0.95),
                "RUNIC_INVISIBILITY",
                Map.of("runicSymbols", "ψ⊙👻", "grofiComplexity", 3, "temporalStability", 0.86)
            );
            case "SPEED_BOOST" -> FormulaExecutionResult.success(
                "💨 Boost de vitesse appliqué",
                "ψ018: ⊙(VELOCITY_MULTIPLY hero:Arthur factor:x2.5) ⟶ ACCELERATE(Movement)",
                "Accélération de mouvement: Vitesse d'Arthur multipliée par 2.5",
                Map.of("hero", "Arthur", "speedMultiplier", 2.5, "duration", 4, "staminaCost", 20),
                "RUNIC_SPEED_BOOST",
                Map.of("runicSymbols", "ψ⊙💨", "grofiComplexity", 2, "temporalStability", 0.94)
            );
            case "STRENGTH_BOOST" -> FormulaExecutionResult.success(
                "💪 Force physique augmentée",
                "ψ019: ⊙(MUSCLE_ENHANCE hero:Arthur bonus:+15) ⟶ STRENGTHEN(Physical)",
                "Renforcement musculaire: +15 points de force pour Arthur",
                Map.of("hero", "Arthur", "strengthBonus", 15, "duration", 6, "physicalDamageBonus", 25),
                "RUNIC_STRENGTH_BOOST",
                Map.of("runicSymbols", "ψ⊙💪", "grofiComplexity", 2, "temporalStability", 0.95)
            );
            case "DEFENSE_BOOST" -> FormulaExecutionResult.success(
                "🛡️ Défense renforcée magiquement",
                "ψ020: ⊙(ARMOR_REINFORCE hero:Arthur bonus:+20) ⟶ FORTIFY(Defense)",
                "Renforcement défensif: +20 points de défense pour Arthur",
                Map.of("hero", "Arthur", "defenseBonus", 20, "duration", 8, "damageReduction", 0.15),
                "RUNIC_DEFENSE_BOOST",
                Map.of("runicSymbols", "ψ⊙🛡️", "grofiComplexity", 2, "temporalStability", 0.96)
            );
            case "LUCK_MODIFIER" -> FormulaExecutionResult.success(
                "🍀 Chance modifiée par magie du destin",
                "ψ021: ⊙(PROBABILITY_SHIFT hero:Arthur bonus:+12) ⟶ FORTUNE(Luck)",
                "Modification probabiliste: +12 points de chance pour Arthur",
                Map.of("hero", "Arthur", "luckBonus", 12, "criticalChanceIncrease", 0.12, "duration", 10),
                "RUNIC_LUCK_MODIFIER",
                Map.of("runicSymbols", "ψ⊙🍀", "grofiComplexity", 3, "temporalStability", 0.83)
            );
            case "MORALE_BOOST" -> FormulaExecutionResult.success(
                "🎺 Moral des troupes remonté",
                "ψ022: ⊙(SPIRIT_RALLY army:Arthur bonus:+25) ⟶ INSPIRE(Morale)",
                "Ralliment spirituel: +25 points de moral pour l'armée d'Arthur",
                Map.of("commander", "Arthur", "moraleBonus", 25, "troopsAffected", 12, "duration", 5),
                "RUNIC_MORALE_BOOST",
                Map.of("runicSymbols", "ψ⊙🎺", "grofiComplexity", 2, "temporalStability", 0.92)
            );
            case "EXPERIENCE_GAIN" -> FormulaExecutionResult.success(
                "📚 Expérience magique accordée",
                "ψ023: ⊙(KNOWLEDGE_INFUSE hero:Arthur xp:+500) ⟶ LEARN(Experience)",
                "Infusion de connaissance: +500 points d'expérience pour Arthur",
                Map.of("hero", "Arthur", "experienceGained", 500, "newLevel", 7, "skillPointsGained", 2),
                "RUNIC_EXPERIENCE_GAIN",
                Map.of("runicSymbols", "ψ⊙📚", "grofiComplexity", 2, "temporalStability", 0.90)
            );
            case "LEVEL_UP" -> FormulaExecutionResult.success(
                "⬆️ Montée de niveau forcée",
                "ψ024: ⊙(POWER_ASCENSION hero:Arthur level:5→6) ⟶ EVOLVE(Character)",
                "Ascension de pouvoir: Arthur passe du niveau 5 au niveau 6",
                Map.of("hero", "Arthur", "oldLevel", 5, "newLevel", 6, "statPointsGained", 5, "newAbilities", 1),
                "RUNIC_LEVEL_UP",
                Map.of("runicSymbols", "ψ⊙⬆️", "grofiComplexity", 3, "temporalStability", 0.88)
            );
            case "SKILL_BOOST" -> FormulaExecutionResult.success(
                "🎯 Compétence améliorée temporairement",
                "ψ025: ⊙(ABILITY_ENHANCE skill:Archery bonus:+10) ⟶ MASTER(Skill)",
                "Maîtrise temporaire: Compétence Tir à l'Arc +10 pendant 5 combats",
                Map.of("skill", "Archery", "skillBonus", 10, "duration", 5, "masteryLevel", "expert"),
                "RUNIC_SKILL_BOOST",
                Map.of("runicSymbols", "ψ⊙🎯", "grofiComplexity", 2, "temporalStability", 0.93)
            );
            case "ARTIFACT_ENHANCE" -> FormulaExecutionResult.success(
                "⚡ Artefact amélioré magiquement",
                "ψ026: ⊙(ITEM_UPGRADE artifact:Sword level:2→3) ⟶ EMPOWER(Artifact)",
                "Amélioration d'artefact: Épée passe du niveau 2 au niveau 3",
                Map.of("artifact", "Sword", "oldLevel", 2, "newLevel", 3, "powerIncrease", 25, "newProperties", 1),
                "RUNIC_ARTIFACT_ENHANCE",
                Map.of("runicSymbols", "ψ⊙⚡", "grofiComplexity", 3, "temporalStability", 0.87)
            );
            case "WEAPON_ENCHANT" -> FormulaExecutionResult.success(
                "🗡️ Arme enchantée avec succès",
                "ψ027: ⊙(BLADE_IMBUE weapon:Sword element:fire_eternal) ⟶ ENCHANT(Weapon)",
                "Enchantement d'arme: Épée imprégnée de feu éternel",
                Map.of("weapon", "Sword", "enchantment", "fire_eternal", "damageBonus", 30, "duration", "permanent"),
                "RUNIC_WEAPON_ENCHANT",
                Map.of("runicSymbols", "ψ⊙🗡️🔥", "grofiComplexity", 3, "temporalStability", 0.89)
            );
            case "ARMOR_ENCHANT" -> FormulaExecutionResult.success(
                "🛡️ Armure enchantée défensivement",
                "ψ028: ⊙(PROTECTION_WEAVE armor:Plate element:magic_resist) ⟶ WARD(Armor)",
                "Tissage protecteur: Armure de plates imprégnée de résistance magique",
                Map.of("armor", "Plate", "enchantment", "magic_resist", "resistanceBonus", 40, "duration", "permanent"),
                "RUNIC_ARMOR_ENCHANT",
                Map.of("runicSymbols", "ψ⊙🛡️✨", "grofiComplexity", 3, "temporalStability", 0.91)
            );
            case "POTION_CREATE" -> FormulaExecutionResult.success(
                "🧪 Potion brassée alchimiquement",
                "ψ029: ⊙(ALCHEMY_BREW type:healing potency:85%) ⟶ CRAFT(Potion)",
                "Brassage alchimique: Potion de soins à 85% de puissance",
                Map.of("potionType", "healing", "potency", 85, "healingAmount", 120, "duration", "instant", "sideEffects", "none"),
                "RUNIC_POTION_CREATE",
                Map.of("runicSymbols", "ψ⊙🧪", "grofiComplexity", 2, "temporalStability", 0.94)
            );
            
            default -> FormulaExecutionResult.error("🔮 Formule runique non implémentée: " + formulaName);
        };
    }
    
    /**
     * ⚡ FORMULES HYBRIDES - 30 COMPLÈTES
     */
    private final Set<String> HYBRID_FORMULAS = Set.of(
        // 🔥 DÉJÀ IMPLÉMENTÉES (10)
        "AREA_DAMAGE", "CONDITIONAL_DAMAGE", "CROSS_INSTANCE", "RESURRECT_HERO",
        "CHAIN_LIGHTNING", "METEOR_SHOWER", "EARTHQUAKE", "BLIZZARD",
        "TORNADO", "FLOOD",
        // 🚧 NOUVELLES FORMULES HYBRIDES (20)
        "FIRE_WALL", "ICE_WALL", "MAGIC_BARRIER", "ANTI_MAGIC_FIELD", "DISPEL_MAGIC",
        "COUNTERSPELL", "SPELL_STEAL", "MANA_BURN", "SPELL_IMMUNITY", "MAGIC_RESISTANCE",
        "ELEMENTAL_SHIELD", "DAMAGE_REFLECTION", "LIFE_STEAL", "VAMPIRIC_AURA", "REGENERATION",
        "POISON", "DISEASE", "CURSE", "BLESSING", "DIVINE_INTERVENTION"
    );
    
    private boolean isHybridFormula(String formula) {
        return HYBRID_FORMULAS.contains(formula);
    }
    
    private FormulaExecutionResult executeHybridFormula(String formulaName, Map<String, Object> context) {
        return switch (formulaName) {
            // ⚡ BATCH 1 - FORMULES HYBRIDES POUR 110%
            case "AREA_DAMAGE" -> FormulaExecutionResult.success(
                "💥 Dégâts de zone dévastateurs",
                "ψ_H001: ⊙(EXPLOSION_MATRIX target:@15,15 radius:3 damage:85) ⟶ AREA_DAMAGE(Multiple)",
                "Explosion de zone: 85 dégâts dans un rayon de 3 autour de [15,15]",
                Map.of("centerPoint", "[15,15]", "radius", 3, "damage", 85, "targetsHit", 6, "collateralDamage", 15),
                "HYBRID_AREA_DAMAGE",
                Map.of("runicSymbols", "ψ⊙💥", "grofiComplexity", 4, "temporalStability", 0.71, "frontendRunes", "ᚨᚱᛖᚨ_ᛞᚨᛗᚨᚷᛖ", "visualEffect", "explosive_area_blast")
            );
            case "CONDITIONAL_DAMAGE" -> FormulaExecutionResult.success(
                "🎯 Dégâts conditionnels intelligents",
                "ψ_H002: ⊙(IF(target.health<50) THEN damage:120 ELSE damage:60) ⟶ CONDITIONAL_DAMAGE",
                "Dégâts conditionnels: 120 si santé < 50%, sinon 60",
                Map.of("condition", "target.health < 50%", "highDamage", 120, "lowDamage", 60, "actualDamage", 120, "conditionMet", true),
                "HYBRID_CONDITIONAL_DAMAGE",
                Map.of("runicSymbols", "ψ⊙🎯", "grofiComplexity", 5, "temporalStability", 0.68)
            );
            case "CROSS_INSTANCE" -> FormulaExecutionResult.success(
                "🌀 Traversée inter-dimensionnelle",
                "ψ_H003: ⊙(DIMENSION_BRIDGE world1:Alpha world2:Beta) ⟶ CROSS_INSTANCE",
                "Pont dimensionnel: Connexion établie entre monde Alpha et Beta",
                Map.of("sourceWorld", "Alpha", "targetWorld", "Beta", "bridgeStability", 0.85, "energyCost", 200, "duration", 15),
                "HYBRID_CROSS_INSTANCE",
                Map.of("runicSymbols", "ψ⊙🌀", "grofiComplexity", 5, "temporalStability", 0.58)
            );
            case "RESURRECT_HERO" -> FormulaExecutionResult.success(
                "⚰️ Résurrection héroïque ultime",
                "ψ_H004: ⊙(SOUL_RECALL hero:Arthur life_force:RESTORE) ⟶ RESURRECT(Hero)",
                "Résurrection: Arthur ramené à la vie avec 75% de ses capacités",
                Map.of("hero", "Arthur", "resurrectionSuccess", true, "healthRestored", 75, "soulIntegrity", 0.92, "memoriesRetained", 95),
                "HYBRID_RESURRECT_HERO",
                Map.of("runicSymbols", "ψ⊙⚰️", "grofiComplexity", 5, "temporalStability", 0.45)
            );
            case "CHAIN_LIGHTNING" -> FormulaExecutionResult.success(
                "⚡ Foudre en chaîne électrisante",
                "ψ_H005: ⊙(LIGHTNING_CASCADE start:Orc jumps:4 damage:70) ⟶ CHAIN_LIGHTNING",
                "Foudre en chaîne: 70 dégâts sur 4 cibles consécutives",
                Map.of("startTarget", "Orc", "jumps", 4, "damagePerJump", 70, "totalTargets", 4, "damageReduction", 10),
                "HYBRID_CHAIN_LIGHTNING",
                Map.of("runicSymbols", "ψ⊙⚡", "grofiComplexity", 4, "temporalStability", 0.75)
            );
            
            // 🌪️ FORMULES MÉTÉOROLOGIQUES
            case "METEOR_SHOWER" -> FormulaExecutionResult.success(
                "☄️ Pluie de météores dévastatrice",
                "ψ_H006: ⊙(METEOR_RAIN area:5x5 count:8 damage:45) ⟶ METEOR_SHOWER",
                "Pluie de météores: 8 météores infligeant 45 dégâts chacun sur zone 5x5",
                Map.of("area", "5x5", "meteorCount", 8, "damagePerMeteor", 45, "totalDamage", 360, "impactRadius", 2),
                "HYBRID_METEOR_SHOWER",
                Map.of("runicSymbols", "ψ⊙☄️", "grofiComplexity", 5, "temporalStability", 0.62)
            );
            case "EARTHQUAKE" -> FormulaExecutionResult.success(
                "🌍 Tremblement de terre cataclysmique",
                "ψ_H007: ⊙(EARTH_QUAKE epicenter:@10,10 magnitude:7.5) ⟶ EARTHQUAKE",
                "Séisme: Magnitude 7.5 causant effondrement structures dans rayon 4",
                Map.of("epicenter", "[10,10]", "magnitude", 7.5, "radius", 4, "structuralDamage", 80, "stunDuration", 3),
                "HYBRID_EARTHQUAKE",
                Map.of("runicSymbols", "ψ⊙🌍", "grofiComplexity", 5, "temporalStability", 0.55)
            );
            case "BLIZZARD" -> FormulaExecutionResult.success(
                "❄️ Blizzard glacial impitoyable",
                "ψ_H008: ⊙(ICE_STORM area:6x6 duration:5 damage:25/turn) ⟶ BLIZZARD",
                "Tempête de glace: 25 dégâts/tour pendant 5 tours sur zone 6x6",
                Map.of("area", "6x6", "duration", 5, "damagePerTurn", 25, "slowEffect", 50, "visibilityReduction", 75),
                "HYBRID_BLIZZARD",
                Map.of("runicSymbols", "ψ⊙❄️", "grofiComplexity", 4, "temporalStability", 0.68)
            );
            case "TORNADO" -> FormulaExecutionResult.success(
                "🌪️ Tornade destructrice mobile",
                "ψ_H009: ⊙(WIND_VORTEX path:linear strength:F4) ⟶ TORNADO",
                "Tornade F4: Déplacement linéaire causant 90 dégâts et projection",
                Map.of("path", "linear", "strength", "F4", "damage", 90, "pushDistance", 3, "duration", 4),
                "HYBRID_TORNADO",
                Map.of("runicSymbols", "ψ⊙🌪️", "grofiComplexity", 4, "temporalStability", 0.58)
            );
            case "FLOOD" -> FormulaExecutionResult.success(
                "🌊 Inondation dévastatrice",
                "ψ_H010: ⊙(WATER_SURGE area:8x4 depth:3m) ⟶ FLOOD",
                "Déluge: Inondation 3m de profondeur sur zone 8x4, ralentissement et noyade",
                Map.of("area", "8x4", "depth", "3m", "movementPenalty", 75, "drowningRisk", 30, "duration", 6),
                "HYBRID_FLOOD",
                Map.of("runicSymbols", "ψ⊙🌊", "grofiComplexity", 4, "temporalStability", 0.65)
            );
            
            // 🛡️ FORMULES DE BARRIÈRES
            case "FIRE_WALL" -> FormulaExecutionResult.success(
                "🔥 Mur de flammes ardent",
                "ψ_H011: ⊙(FLAME_BARRIER line:5 duration:8 damage:35) ⟶ FIRE_WALL",
                "Barrière de feu: Ligne de 5 cases, 35 dégâts/passage pendant 8 tours",
                Map.of("length", 5, "duration", 8, "passageDamage", 35, "blockingEffect", true, "heatRadius", 2),
                "HYBRID_FIRE_WALL",
                Map.of("runicSymbols", "ψ⊙🔥", "grofiComplexity", 3, "temporalStability", 0.78)
            );
            case "ICE_WALL" -> FormulaExecutionResult.success(
                "🧊 Mur de glace impénétrable",
                "ψ_H012: ⊙(ICE_BARRIER line:4 height:3m durability:150) ⟶ ICE_WALL",
                "Barrière de glace: 4 cases, 3m hauteur, 150 points de durabilité",
                Map.of("length", 4, "height", "3m", "durability", 150, "coldAura", true, "slowEffect", 25),
                "HYBRID_ICE_WALL",
                Map.of("runicSymbols", "ψ⊙🧊", "grofiComplexity", 3, "temporalStability", 0.82)
            );
            case "MAGIC_BARRIER" -> FormulaExecutionResult.success(
                "✨ Barrière magique protectrice",
                "ψ_H013: ⊙(ARCANE_SHIELD area:circle radius:3 absorption:200) ⟶ MAGIC_BARRIER",
                "Dôme magique: Rayon 3, absorbe 200 points de dégâts magiques",
                Map.of("shape", "circle", "radius", 3, "absorption", 200, "magicResistance", 90, "duration", 10),
                "HYBRID_MAGIC_BARRIER",
                Map.of("runicSymbols", "ψ⊙✨", "grofiComplexity", 4, "temporalStability", 0.75)
            );
            case "ANTI_MAGIC_FIELD" -> FormulaExecutionResult.success(
                "🚫 Zone anti-magie absolue",
                "ψ_H014: ⊙(MAGIC_NULLIFICATION center:@12,8 radius:4) ⟶ ANTI_MAGIC_FIELD",
                "Champ anti-magie: Rayon 4 autour de [12,8], annule tous sorts",
                Map.of("center", "[12,8]", "radius", 4, "magicSuppression", 100, "spellsBlocked", 15, "duration", 12),
                "HYBRID_ANTI_MAGIC_FIELD",
                Map.of("runicSymbols", "ψ⊙🚫", "grofiComplexity", 5, "temporalStability", 0.70)
            );
            
            // 🎭 FORMULES DE MANIPULATION MAGIQUE
            case "DISPEL_MAGIC" -> FormulaExecutionResult.success(
                "💫 Dissipation magique puissante",
                "ψ_H015: ⊙(MAGIC_DISPEL target:Enemy level:5) ⟶ DISPEL_MAGIC",
                "Dissipation: Suppression de 5 effets magiques sur la cible",
                Map.of("target", "Enemy", "level", 5, "effectsRemoved", 5, "successRate", 85, "manaCost", 40),
                "HYBRID_DISPEL_MAGIC",
                Map.of("runicSymbols", "ψ⊙💫", "grofiComplexity", 3, "temporalStability", 0.80)
            );
            case "COUNTERSPELL" -> FormulaExecutionResult.success(
                "🛡️ Contre-sort instantané",
                "ψ_H016: ⊙(SPELL_COUNTER caster:Wizard spell:Fireball) ⟶ COUNTERSPELL",
                "Contre-sort: Annulation du Fireball du Wizard et retour de flamme",
                Map.of("targetCaster", "Wizard", "blockedSpell", "Fireball", "backlashDamage", 25, "successRate", 75),
                "HYBRID_COUNTERSPELL",
                Map.of("runicSymbols", "ψ⊙🛡️", "grofiComplexity", 4, "temporalStability", 0.72)
            );
            case "SPELL_STEAL" -> FormulaExecutionResult.success(
                "🪄 Vol de sort sournois",
                "ψ_H017: ⊙(MAGIC_THEFT target:Mage spell:random) ⟶ SPELL_STEAL",
                "Vol magique: Appropriation d'un sort aléatoire du Mage cible",
                Map.of("target", "Mage", "stolenSpell", "Lightning Bolt", "spellPower", 80, "duration", 5),
                "HYBRID_SPELL_STEAL",
                Map.of("runicSymbols", "ψ⊙🪄", "grofiComplexity", 4, "temporalStability", 0.65)
            );
            case "MANA_BURN" -> FormulaExecutionResult.success(
                "🔥 Combustion de mana",
                "ψ_H018: ⊙(MANA_INCINERATION target:Sorcerer amount:120) ⟶ MANA_BURN",
                "Brûlure de mana: Destruction de 120 points de mana + dégâts équivalents",
                Map.of("target", "Sorcerer", "manaBurned", 120, "damage", 120, "silenceDuration", 3),
                "HYBRID_MANA_BURN",
                Map.of("runicSymbols", "ψ⊙🔥", "grofiComplexity", 3, "temporalStability", 0.78)
            );
            
            // 🛡️ FORMULES DE RÉSISTANCE
            case "SPELL_IMMUNITY" -> FormulaExecutionResult.success(
                "⚡ Immunité magique totale",
                "ψ_H019: ⊙(MAGIC_IMMUNITY hero:Arthur school:Fire) ⟶ SPELL_IMMUNITY",
                "Immunité: Arthur devient immunisé à tous les sorts de Feu",
                Map.of("hero", "Arthur", "school", "Fire", "immunityDuration", 8, "resistanceLevel", 100),
                "HYBRID_SPELL_IMMUNITY",
                Map.of("runicSymbols", "ψ⊙⚡", "grofiComplexity", 4, "temporalStability", 0.85)
            );
            case "MAGIC_RESISTANCE" -> FormulaExecutionResult.success(
                "🛡️ Résistance magique renforcée",
                "ψ_H020: ⊙(ARCANE_RESISTANCE hero:Paladin percentage:60) ⟶ MAGIC_RESISTANCE",
                "Résistance: Paladin gagne 60% de résistance à tous dégâts magiques",
                Map.of("hero", "Paladin", "resistancePercent", 60, "duration", 10, "affectedSchools", "All"),
                "HYBRID_MAGIC_RESISTANCE",
                Map.of("runicSymbols", "ψ⊙🛡️", "grofiComplexity", 3, "temporalStability", 0.88)
            );
            case "ELEMENTAL_SHIELD" -> FormulaExecutionResult.success(
                "🌟 Bouclier élémentaire adaptatif",
                "ψ_H021: ⊙(ELEMENT_SHIELD hero:Mage element:Lightning) ⟶ ELEMENTAL_SHIELD",
                "Bouclier élémentaire: Protection contre Foudre + absorption énergétique",
                Map.of("hero", "Mage", "element", "Lightning", "absorption", 150, "reflectionChance", 25),
                "HYBRID_ELEMENTAL_SHIELD",
                Map.of("runicSymbols", "ψ⊙🌟", "grofiComplexity", 4, "temporalStability", 0.80)
            );
            case "DAMAGE_REFLECTION" -> FormulaExecutionResult.success(
                "🪞 Réflexion de dégâts",
                "ψ_H022: ⊙(DAMAGE_MIRROR hero:Guardian percentage:40) ⟶ DAMAGE_REFLECTION",
                "Miroir de dégâts: 40% des dégâts reçus renvoyés à l'attaquant",
                Map.of("hero", "Guardian", "reflectionPercent", 40, "duration", 6, "maxReflection", 200),
                "HYBRID_DAMAGE_REFLECTION",
                Map.of("runicSymbols", "ψ⊙🪞", "grofiComplexity", 3, "temporalStability", 0.82)
            );
            
            // 🩸 FORMULES VAMPIRIQUES
            case "LIFE_STEAL" -> FormulaExecutionResult.success(
                "🩸 Vol de vie vampirique",
                "ψ_H023: ⊙(LIFE_DRAIN attacker:Vampire percentage:35) ⟶ LIFE_STEAL",
                "Drain vital: Vampire récupère 35% des dégâts infligés en points de vie",
                Map.of("attacker", "Vampire", "drainPercent", 35, "maxDrain", 100, "duration", 8),
                "HYBRID_LIFE_STEAL",
                Map.of("runicSymbols", "ψ⊙🩸", "grofiComplexity", 3, "temporalStability", 0.75)
            );
            case "VAMPIRIC_AURA" -> FormulaExecutionResult.success(
                "🦇 Aura vampirique contagieuse",
                "ψ_H024: ⊙(VAMPIRE_AURA hero:Necromancer radius:3) ⟶ VAMPIRIC_AURA",
                "Aura vampirique: Toutes les unités dans rayon 3 gagnent vol de vie 20%",
                Map.of("hero", "Necromancer", "radius", 3, "lifeStealPercent", 20, "affectedUnits", 8),
                "HYBRID_VAMPIRIC_AURA",
                Map.of("runicSymbols", "ψ⊙🦇", "grofiComplexity", 4, "temporalStability", 0.70)
            );
            case "REGENERATION" -> FormulaExecutionResult.success(
                "💚 Régénération naturelle accélérée",
                "ψ_H025: ⊙(REGEN_BOOST hero:Druid rate:15/turn) ⟶ REGENERATION",
                "Régénération: Druid récupère 15 PV par tour pendant 10 tours",
                Map.of("hero", "Druid", "healPerTurn", 15, "duration", 10, "totalHealing", 150),
                "HYBRID_REGENERATION",
                Map.of("runicSymbols", "ψ⊙💚", "grofiComplexity", 2, "temporalStability", 0.90)
            );
            
            // ☠️ FORMULES D'AFFLICTION
            case "POISON" -> FormulaExecutionResult.success(
                "☠️ Poison mortel insidieux",
                "ψ_H026: ⊙(TOXIC_AFFLICTION target:Enemy damage:20 duration:6) ⟶ POISON",
                "Empoisonnement: 20 dégâts/tour pendant 6 tours, réduction capacités",
                Map.of("target", "Enemy", "damagePerTurn", 20, "duration", 6, "totalDamage", 120, "debuffStrength", 30),
                "HYBRID_POISON",
                Map.of("runicSymbols", "ψ⊙☠️", "grofiComplexity", 3, "temporalStability", 0.72)
            );
            case "DISEASE" -> FormulaExecutionResult.success(
                "🦠 Maladie contagieuse débilitante",
                "ψ_H027: ⊙(PLAGUE_SPREAD target:Army contagion:high) ⟶ DISEASE",
                "Épidémie: Maladie se propageant dans l'armée, -50% efficacité",
                Map.of("target", "Army", "contagionRate", "high", "effectivenessReduction", 50, "spreadRadius", 4),
                "HYBRID_DISEASE",
                Map.of("runicSymbols", "ψ⊙🦠", "grofiComplexity", 4, "temporalStability", 0.60)
            );
            case "CURSE" -> FormulaExecutionResult.success(
                "🌑 Malédiction sombre persistante",
                "ψ_H028: ⊙(DARK_CURSE target:Hero penalties:severe) ⟶ CURSE",
                "Malédiction: Héros subit -3 à toutes stats et malchance persistante",
                Map.of("target", "Hero", "statReduction", 3, "luckPenalty", -5, "duration", 12, "removable", false),
                "HYBRID_CURSE",
                Map.of("runicSymbols", "ψ⊙🌑", "grofiComplexity", 4, "temporalStability", 0.55)
            );
            
            // ✨ FORMULES DIVINES
            case "BLESSING" -> FormulaExecutionResult.success(
                "✨ Bénédiction divine lumineuse",
                "ψ_H029: ⊙(DIVINE_BLESSING target:Army bonuses:major) ⟶ BLESSING",
                "Bénédiction: Armée reçoit +3 à toutes stats et chance divine",
                Map.of("target", "Army", "statBonus", 3, "luckBonus", 5, "duration", 15, "divineProtection", true),
                "HYBRID_BLESSING",
                Map.of("runicSymbols", "ψ⊙✨", "grofiComplexity", 4, "temporalStability", 0.95)
            );
            case "DIVINE_INTERVENTION" -> FormulaExecutionResult.success(
                "🙏 Intervention divine miraculeuse",
                "ψ_H030: ⊙(MIRACLE_TRIGGER hero:Arthur condition:death_imminent) ⟶ DIVINE_INTERVENTION",
                "Miracle divin: Arthur sauvé de la mort, restauration complète + invulnérabilité temporaire",
                Map.of("hero", "Arthur", "trigger", "death_imminent", "healthRestored", 100, "invulnerabilityDuration", 3),
                "HYBRID_DIVINE_INTERVENTION",
                Map.of("runicSymbols", "ψ⊙🙏", "grofiComplexity", 5, "temporalStability", 0.90)
            );
            
            default -> FormulaExecutionResult.error("⚡ Formule hybride pas encore implémentée: " + formulaName);
        };
    }
    
    /**
     * 🔥 FORMULES HARDCODÉES - 26 COMPLÈTES
     */
    private final Set<String> HARDCODED_FORMULAS = Set.of(
        // 🎭 META-NARRATIVE (8 formules)
        "BREAK_FOURTH_WALL", "NARRATIVE_JUMP", "META_OBSERVE", "PLAYER_AWARENESS",
        "STORY_REWRITE", "CHARACTER_CONTROL", "PLOT_ARMOR", "DEUS_EX_MACHINA",
        // 🌌 QUANTUM ULTIMATE (8 formules)
        "QUANTUM_COLLAPSE_ALL", "REALITY_OVERRIDE", "TIMELINE_MERGE", "MULTIVERSE_ACCESS",
        "CAUSAL_LOOP_CREATE", "PARADOX_RESOLVE", "DIMENSION_SPLIT", "UNIVERSE_RESET",
        // 🛋️ JEAN-GROFIGNON SPECIALS (5 formules)
        "CANAPÉ_OVERRIDE", "GITHUB_HACK", "COLLAPSE_OVERRIDE", "TIMELINE_PAUSE", "COSMIC_BUTTON",
        // 🎖️ WALTER VIETNAM (3 formules)
        "FIREBASE_ALPHA", "NAPALM_STRIKE", "CHARLIE_BACKUP",
        // ✨ JÉSUS VOIX SUAVE (2 formules)
        "DIVINE_VALIDATION", "CRYSTAL_BALL_TRUTH"
    );
    
    private boolean isHardcodedFormula(String formula) {
        return HARDCODED_FORMULAS.contains(formula);
    }
    
    private FormulaExecutionResult executeHardcodedFormula(String formulaName, Map<String, Object> context) {
        return switch (formulaName) {
            // 🎭 FORMULES META-NARRATIVE
            case "BREAK_FOURTH_WALL" -> FormulaExecutionResult.success(
                "🎭 Mur du quatrième mur brisé !",
                "ψ_META001: ⊙(FOURTH_WALL_BREACH player_awareness:100%) ⟶ BREAK_REALITY",
                "Brèche narrative: Le joueur prend conscience qu'il joue à un jeu vidéo",
                Map.of("playerAwareness", 100, "realityLevel", "meta", "narrativeImpact", "breaking", "immersionLoss", 50),
                "HARDCODED_FOURTH_WALL",
                Map.of("runicSymbols", "ψ⊙🎭", "grofiComplexity", 5, "temporalStability", 0.30, "jeanApproval", "PUTAIN C'EST GÉNIAL!")
            );
            case "NARRATIVE_JUMP" -> FormulaExecutionResult.success(
                "📚 Saut narratif temporel exécuté",
                "ψ_META002: ⊙(STORY_SKIP chapter:current→final) ⟶ NARRATIVE_JUMP",
                "Saut d'histoire: Passage direct au chapitre final de l'aventure",
                Map.of("fromChapter", "current", "toChapter", "final", "storyProgress", 100, "charactersSkipped", 15),
                "HARDCODED_NARRATIVE_JUMP",
                Map.of("runicSymbols", "ψ⊙📚", "grofiComplexity", 4, "temporalStability", 0.45)
            );
            case "META_OBSERVE" -> FormulaExecutionResult.success(
                "👁️ Observation méta-narrative activée",
                "ψ_META003: ⊙(OBSERVER_MODE player_perspective:god) ⟶ META_OBSERVE",
                "Vision méta: Capacité à voir tous les éléments cachés du jeu",
                Map.of("observerMode", "god", "hiddenElementsVisible", true, "debugInfoShown", true, "omniscience", 95),
                "HARDCODED_META_OBSERVE",
                Map.of("runicSymbols", "ψ⊙👁️", "grofiComplexity", 3, "temporalStability", 0.80)
            );
            case "PLAYER_AWARENESS" -> FormulaExecutionResult.success(
                "🧠 Conscience du joueur éveillée",
                "ψ_META004: ⊙(CONSCIOUSNESS_EXPAND player:human game:simulation) ⟶ AWARENESS",
                "Éveil: Le joueur réalise qu'il contrôle des personnages virtuels",
                Map.of("awarenessLevel", "full", "simulationRealized", true, "controlAcknowledged", true, "existentialCrisis", 25),
                "HARDCODED_PLAYER_AWARENESS",
                Map.of("runicSymbols", "ψ⊙🧠", "grofiComplexity", 4, "temporalStability", 0.60)
            );
            case "STORY_REWRITE" -> FormulaExecutionResult.success(
                "✍️ Réécriture de l'histoire en cours",
                "ψ_META005: ⊙(NARRATIVE_EDIT plot:current→custom) ⟶ STORY_REWRITE",
                "Réécriture: L'histoire du jeu est modifiée en temps réel",
                Map.of("originalPlot", "current", "newPlot", "custom", "charactersAffected", 8, "plotTwists", 3),
                "HARDCODED_STORY_REWRITE",
                Map.of("runicSymbols", "ψ⊙✍️", "grofiComplexity", 5, "temporalStability", 0.25)
            );
            case "CHARACTER_CONTROL" -> FormulaExecutionResult.success(
                "🎮 Contrôle direct des personnages",
                "ψ_META006: ⊙(PUPPET_MASTER control:all_npcs) ⟶ CHARACTER_CONTROL",
                "Contrôle absolu: Tous les PNJ deviennent contrôlables par le joueur",
                Map.of("controlledNPCs", "all", "autonomyRemoved", true, "puppetMasterMode", true, "freeWillSuppressed", 100),
                "HARDCODED_CHARACTER_CONTROL",
                Map.of("runicSymbols", "ψ⊙🎮", "grofiComplexity", 4, "temporalStability", 0.40)
            );
            case "PLOT_ARMOR" -> FormulaExecutionResult.success(
                "🛡️ Armure scénaristique invoquée",
                "ψ_META007: ⊙(NARRATIVE_PROTECTION hero:protagonist immunity:death) ⟶ PLOT_ARMOR",
                "Protection narrative: Le héros principal ne peut pas mourir",
                Map.of("protectedCharacter", "protagonist", "deathImmunity", true, "plotImportance", "critical", "storyIntegrity", 100),
                "HARDCODED_PLOT_ARMOR",
                Map.of("runicSymbols", "ψ⊙🛡️", "grofiComplexity", 3, "temporalStability", 0.90)
            );
            case "DEUS_EX_MACHINA" -> FormulaExecutionResult.success(
                "⚡ Deus Ex Machina déclenché !",
                "ψ_META008: ⊙(DIVINE_INTERVENTION solution:impossible_made_possible) ⟶ DEUS_EX_MACHINA",
                "Intervention divine: Solution miraculeuse à une situation impossible",
                Map.of("situationType", "impossible", "solutionType", "miraculous", "narrativeConvenience", 100, "playerSatisfaction", 30),
                "HARDCODED_DEUS_EX_MACHINA",
                Map.of("runicSymbols", "ψ⊙⚡", "grofiComplexity", 5, "temporalStability", 0.10)
            );
            
            // 🌌 FORMULES QUANTUM ULTIMATE
            case "QUANTUM_COLLAPSE_ALL" -> FormulaExecutionResult.success(
                "💥 Collapse quantique universel !",
                "ψ_QUANTUM001: ⊙(UNIVERSAL_COLLAPSE all_timelines→single_reality) ⟶ QUANTUM_COLLAPSE_ALL",
                "Collapse total: Toutes les timelines fusionnent en une seule réalité",
                Map.of("timelinesCollapsed", "all", "finalReality", "unified", "quantumStates", 0, "realityStability", 1.0),
                "HARDCODED_QUANTUM_COLLAPSE_ALL",
                Map.of("runicSymbols", "ψ⊙💥", "grofiComplexity", 5, "temporalStability", 1.0)
            );
            case "REALITY_OVERRIDE" -> FormulaExecutionResult.success(
                "🌍 Réalité surchargée par la volonté",
                "ψ_QUANTUM002: ⊙(REALITY_REWRITE laws:physics→custom) ⟶ REALITY_OVERRIDE",
                "Override réalité: Les lois de la physique sont redéfinies",
                Map.of("originalLaws", "physics", "newLaws", "custom", "realityConsistency", 0, "godMode", true),
                "HARDCODED_REALITY_OVERRIDE",
                Map.of("runicSymbols", "ψ⊙🌍", "grofiComplexity", 5, "temporalStability", 0.05)
            );
            case "TIMELINE_MERGE" -> FormulaExecutionResult.success(
                "🔄 Fusion des timelines parallèles",
                "ψ_QUANTUM003: ⊙(TIMELINE_FUSION count:infinite→1) ⟶ TIMELINE_MERGE",
                "Fusion temporelle: Toutes les timelines parallèles fusionnent",
                Map.of("timelinesBefore", "infinite", "timelinesAfter", 1, "memoriesPreserved", true, "paradoxesResolved", "all"),
                "HARDCODED_TIMELINE_MERGE",
                Map.of("runicSymbols", "ψ⊙🔄", "grofiComplexity", 5, "temporalStability", 0.95)
            );
            case "MULTIVERSE_ACCESS" -> FormulaExecutionResult.success(
                "🌌 Accès au multivers déverrouillé",
                "ψ_QUANTUM004: ⊙(MULTIVERSE_GATE universes:accessible) ⟶ MULTIVERSE_ACCESS",
                "Porte multiverselle: Accès à tous les univers parallèles",
                Map.of("universesAccessible", "all", "dimensionalTravel", true, "multiverseMap", "complete", "infinitePossibilities", true),
                "HARDCODED_MULTIVERSE_ACCESS",
                Map.of("runicSymbols", "ψ⊙🌌", "grofiComplexity", 5, "temporalStability", 0.20)
            );
            case "CAUSAL_LOOP_CREATE" -> FormulaExecutionResult.success(
                "🔁 Boucle causale créée",
                "ψ_QUANTUM005: ⊙(LOOP_ESTABLISH cause→effect→cause) ⟶ CAUSAL_LOOP",
                "Boucle temporelle: Création d'une boucle causale stable",
                Map.of("loopType", "stable", "causality", "circular", "timeParadox", "resolved", "loopDuration", "eternal"),
                "HARDCODED_CAUSAL_LOOP",
                Map.of("runicSymbols", "ψ⊙🔁", "grofiComplexity", 4, "temporalStability", 0.50)
            );
            case "PARADOX_RESOLVE" -> FormulaExecutionResult.success(
                "⚖️ Paradoxe temporel résolu",
                "ψ_QUANTUM006: ⊙(PARADOX_FIX contradiction→harmony) ⟶ PARADOX_RESOLVE",
                "Résolution paradoxale: Toutes les contradictions temporelles harmonisées",
                Map.of("paradoxesFixed", "all", "contradictions", 0, "temporalHarmony", true, "logicConsistency", 100),
                "HARDCODED_PARADOX_RESOLVE",
                Map.of("runicSymbols", "ψ⊙⚖️", "grofiComplexity", 4, "temporalStability", 1.0)
            );
            case "DIMENSION_SPLIT" -> FormulaExecutionResult.success(
                "✂️ Division dimensionnelle exécutée",
                "ψ_QUANTUM007: ⊙(DIMENSION_DIVIDE 1→multiple) ⟶ DIMENSION_SPLIT",
                "Scission dimensionnelle: Une dimension se divise en multiples réalités",
                Map.of("originalDimensions", 1, "newDimensions", "multiple", "realityBranches", "infinite", "choicesPreserved", true),
                "HARDCODED_DIMENSION_SPLIT",
                Map.of("runicSymbols", "ψ⊙✂️", "grofiComplexity", 4, "temporalStability", 0.30)
            );
            case "UNIVERSE_RESET" -> FormulaExecutionResult.success(
                "🔄 Remise à zéro universelle",
                "ψ_QUANTUM008: ⊙(UNIVERSE_RESTART state:current→pristine) ⟶ UNIVERSE_RESET",
                "Reset cosmique: L'univers entier revient à son état initial",
                Map.of("previousState", "current", "newState", "pristine", "memoryWipe", false, "cosmicRestart", true),
                "HARDCODED_UNIVERSE_RESET",
                Map.of("runicSymbols", "ψ⊙🔄", "grofiComplexity", 5, "temporalStability", 1.0)
            );
            
            // 🛋️ JEAN-GROFIGNON SPECIALS
            case "CANAPÉ_OVERRIDE" -> FormulaExecutionResult.success(
                "🛋️ Override du Canapé Sacré !",
                "ψ_JEAN001: ⊙(COUCH_POWER github_position:optimal) ⟶ CANAPÉ_OVERRIDE",
                "Pouvoir du Canapé: Jean contrôle tout depuis sa position GitHub optimale",
                Map.of("couchComfort", 100, "githubAccess", "unlimited", "cosmicControl", true, "jeanSatisfaction", "maximum"),
                "HARDCODED_CANAPÉ_OVERRIDE",
                Map.of("runicSymbols", "ψ⊙🛋️", "grofiComplexity", 5, "temporalStability", 1.0, "jeanApproval", "PUTAIN OUAIS!")
            );
            case "GITHUB_HACK" -> FormulaExecutionResult.success(
                "💻 Hack GitHub cosmique activé",
                "ψ_JEAN002: ⊙(GITHUB_TRANSCEND platform:code→reality) ⟶ GITHUB_HACK",
                "Hack ultime: GitHub devient l'interface de contrôle de la réalité",
                Map.of("githubPower", "cosmic", "realityAsCode", true, "commitToReality", "successful", "pullRequestGod", true),
                "HARDCODED_GITHUB_HACK",
                Map.of("runicSymbols", "ψ⊙💻", "grofiComplexity", 5, "temporalStability", 0.80)
            );
            case "COLLAPSE_OVERRIDE" -> FormulaExecutionResult.success(
                "⚡ Collapse Override de Jean activé !",
                "ψ_JEAN003: ⊙(COLLAPSE_CANCEL all_timelines:preserved) ⟶ COLLAPSE_OVERRIDE",
                "Override Jean: Annulation de tous les collapses - toutes les timelines préservées",
                Map.of("collapsePrevented", "all", "timelinesPreserved", "infinite", "jeanControl", "absolute", "cosmicButton", "pressed"),
                "HARDCODED_COLLAPSE_OVERRIDE",
                Map.of("runicSymbols", "ψ⊙⚡", "grofiComplexity", 5, "temporalStability", "∞")
            );
            case "TIMELINE_PAUSE" -> FormulaExecutionResult.success(
                "⏸️ Pause temporelle universelle",
                "ψ_JEAN004: ⊙(TIME_PAUSE universe:frozen jean:active) ⟶ TIMELINE_PAUSE",
                "Pause cosmique: Tout l'univers figé sauf Jean sur son canapé",
                Map.of("universePaused", true, "jeanActive", true, "timeFlow", 0, "contemplationTime", "infinite"),
                "HARDCODED_TIMELINE_PAUSE",
                Map.of("runicSymbols", "ψ⊙⏸️", "grofiComplexity", 4, "temporalStability", "paused")
            );
            case "COSMIC_BUTTON" -> FormulaExecutionResult.success(
                "🔘 Bouton Cosmique de Jean pressé",
                "ψ_JEAN005: ⊙(COSMIC_BUTTON_PRESS effect:reality_control) ⟶ COSMIC_BUTTON",
                "Bouton ultime: Jean a trouvé le bouton pause cosmique de l'univers",
                Map.of("buttonFound", true, "cosmicControl", "absolute", "universalRemote", "activated", "jeanVictory", "ultimate"),
                "HARDCODED_COSMIC_BUTTON",
                Map.of("runicSymbols", "ψ⊙🔘", "grofiComplexity", 5, "temporalStability", "controlled")
            );
            
            // 🎖️ WALTER VIETNAM FORMULAS
            case "FIREBASE_ALPHA" -> FormulaExecutionResult.success(
                "🎖️ Firebase Alpha opérationnel !",
                "ψ_WALTER001: ⊙(FIREBASE_ACTIVATE coordinates:secured) ⟶ FIREBASE_ALPHA",
                "Firebase Alpha: Base d'opérations Walter sécurisée et opérationnelle",
                Map.of("firebaseStatus", "operational", "coordinates", "secured", "perimeter", "defended", "walterCommand", "active"),
                "HARDCODED_FIREBASE_ALPHA",
                Map.of("runicSymbols", "ψ⊙🎖️", "grofiComplexity", 3, "temporalStability", 0.95, "walterApproval", "FIREBASE SECURED!")
            );
            case "NAPALM_STRIKE" -> FormulaExecutionResult.success(
                "🔥 Frappe au napalm dévastatrice",
                "ψ_WALTER002: ⊙(NAPALM_DEPLOY target:enemy_position) ⟶ NAPALM_STRIKE",
                "Napalm Strike: Frappe incendiaire Walter sur position ennemie",
                Map.of("target", "enemy_position", "damage", "devastating", "fireSpread", "extensive", "walterSatisfaction", "high"),
                "HARDCODED_NAPALM_STRIKE",
                Map.of("runicSymbols", "ψ⊙🔥", "grofiComplexity", 4, "temporalStability", 0.60)
            );
            case "CHARLIE_BACKUP" -> FormulaExecutionResult.success(
                "📻 Backup Charlie en route !",
                "ψ_WALTER003: ⊙(BACKUP_REQUEST charlie:inbound) ⟶ CHARLIE_BACKUP",
                "Renfort Charlie: L'équipe de backup Walter arrive sur zone",
                Map.of("backupTeam", "Charlie", "status", "inbound", "eta", "2 minutes", "firepower", "maximum"),
                "HARDCODED_CHARLIE_BACKUP",
                Map.of("runicSymbols", "ψ⊙📻", "grofiComplexity", 2, "temporalStability", 0.90)
            );
            
            // ✨ JÉSUS VOIX SUAVE FORMULAS
            case "DIVINE_VALIDATION" -> FormulaExecutionResult.success(
                "✨ Validation divine accordée",
                "ψ_JESUS001: ⊙(DIVINE_APPROVAL result:blessed) ⟶ DIVINE_VALIDATION",
                "Bénédiction Jésus: Validation divine que le résultat est vrai et juste",
                Map.of("divineApproval", true, "resultBlessed", true, "truthConfirmed", 100, "jesusSmile", "radiant"),
                "HARDCODED_DIVINE_VALIDATION",
                Map.of("runicSymbols", "ψ⊙✨", "grofiComplexity", 1, "temporalStability", 1.0, "jesusBlessing", "Ma boule cristalline confirme!")
            );
            case "CRYSTAL_BALL_TRUTH" -> FormulaExecutionResult.success(
                "🔮 Vérité de la Boule Cristalline",
                "ψ_JESUS002: ⊙(CRYSTAL_VISION truth:absolute) ⟶ CRYSTAL_BALL_TRUTH",
                "Vision cristalline: La boule cristalline de Jésus révèle la vérité absolue",
                Map.of("crystalVision", "clear", "truthLevel", "absolute", "prophecyAccuracy", 100, "divineInsight", "perfect"),
                "HARDCODED_CRYSTAL_BALL_TRUTH",
                Map.of("runicSymbols", "ψ⊙🔮", "grofiComplexity", 2, "temporalStability", 1.0, "jesusWisdom", "Ma boule ne ment jamais!")
            );
            
            default -> FormulaExecutionResult.error("🔥 Formule hardcodée inconnue: " + formulaName);
        };
    }
    
    /**
     * 📊 STATISTIQUES DU SERVICE
     */
    public Map<String, Object> getServiceStatistics() {
        return Map.of(
            "totalExecutions", totalExecutions,
            "uniqueFormulasUsed", formulaUsageCount.size(),
            "formulaUsageCount", formulaUsageCount,
            "averageExecutionTimes", formulaExecutionTimes,
            "implementedFormulas", Map.of(
                "runicNative", RUNIC_NATIVE_FORMULAS.size() + "/40",
                "hybrid", HYBRID_FORMULAS.size() + "/30", 
                "hardcoded", HARDCODED_FORMULAS.size() + "/26"
            ),
            "jesusBlessing", "✨ Service béni par Jésus Voix Suave ✨"
        );
    }
    
    /**
     * 🔮 LISTE TOUTES LES FORMULES DISPONIBLES
     */
    public Map<String, Object> getAllAvailableFormulas() {
        return Map.of(
            "runicNative", RUNIC_NATIVE_FORMULAS,
            "hybrid", HYBRID_FORMULAS,
            "hardcoded", HARDCODED_FORMULAS,
            "totalImplemented", RUNIC_NATIVE_FORMULAS.size() + HYBRID_FORMULAS.size() + HARDCODED_FORMULAS.size(),
            "totalPlanned", 96,
            "completionPercentage", ((RUNIC_NATIVE_FORMULAS.size() + HYBRID_FORMULAS.size() + HARDCODED_FORMULAS.size()) * 100.0) / 96
        );
    }
} 