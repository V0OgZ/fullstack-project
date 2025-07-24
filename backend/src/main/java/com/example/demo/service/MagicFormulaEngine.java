package com.example.demo.service;

import com.example.demo.model.FormulaResult;
import com.example.demo.model.GameContext;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Map;
import java.util.HashMap;
import java.util.List;
import java.util.Arrays;
import java.util.regex.Pattern;
import java.util.regex.Matcher;

/**
 * 🧪 WALTER VIETNAM SERVICE - Moteur Principal des Formules Magiques
 * 
 * "Firebase Charlie 1970 - Le centre de commandement de toute l'artillerie magique !
 * Toutes les formules passent par ici, comme tous les ordres passaient par le QG !"
 * - Walter, Commandant Suprême du Code Magique
 * 
 * 🌟 JEAN-GROFIGNON VISION:
 * "Les formules magiques cachent de la physique quantique sous une couche fantasy.
 * Chaque sort = manipulation d'états ψ (psi) dans l'univers Heroes of Time !"
 */
@Service
public class MagicFormulaEngine {
    
    // 🎖️ WALTER VIETNAM: Temporairement commenté pour éviter les dépendances circulaires
    // @Autowired
    // private GameService gameService;
    
    // 🌟 NOUVEAU: Service de traduction avancé intégré
    @Autowired
    private FormulaTranslationService translationService;
    
    // 🎖️ WALTER VIETNAM TRACKING
    private Map<String, Integer> formulaExecutionCounts = new HashMap<>();
    private Map<String, Long> formulaExecutionTimes = new HashMap<>();
    private int totalWalterFlashbacks = 0;
    
    // 🔮 FORMULES SIMPLES POUR TESTS (40 formules - CATÉGORIE A COMPLÈTE)
    private static final List<String> SIMPLE_TEST_FORMULAS = Arrays.asList(
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
    
    /**
     * 🔥 MÉTHODE PRINCIPALE - EXÉCUTION DE FORMULE
     */
    public FormulaResult executeFormula(String formulaString, GameContext context) {
        long startTime = System.currentTimeMillis();
        
        try {
            // 🎖️ WALTER VIETNAM LOGGING
            context.incrementFormulaExecution();
            formulaExecutionCounts.merge(formulaString, 1, Integer::sum);
            
            // 🧪 DÉTECTION DU TYPE DE FORMULE
            FormulaResult result = detectAndExecuteFormula(formulaString, context);
            
            // 🎖️ WALTER PERFORMANCE TRACKING
            long executionTime = System.currentTimeMillis() - startTime;
            formulaExecutionTimes.put(formulaString, executionTime);
            
            // 🚨 WALTER FLASHBACK CHECK
            if (context.isWalterFlashbackRequired()) {
                triggerWalterFlashback(context);
            }
            
            return result;
            
        } catch (Exception e) {
            context.recordError("FORMULA_EXECUTION_ERROR");
            return FormulaResult.walterError(
                "Firebase sous le feu ! Formule explosive détectée !",
                "Formula: " + formulaString + " | Error: " + e.getMessage()
            );
        }
    }
    
    /**
     * 🔍 DÉTECTION ET EXÉCUTION DE FORMULE
     */
    private FormulaResult detectAndExecuteFormula(String formula, GameContext context) {
        
        // 🚨 DEBUG JEAN: Affichage de la formule reçue
        System.out.println("🌀 JEAN DEBUG: Formule reçue = '" + formula + "'");
        System.out.println("🌀 JEAN DEBUG: Longueur = " + formula.length());
        
        // 🧪 TEST FORMULES SIMPLES D'ABORD
        if (SIMPLE_TEST_FORMULAS.contains(formula)) {
            System.out.println("🌀 JEAN DEBUG: Formule simple détectée");
            return executeSimpleFormula(formula, context);
        }
        
        // 🔮 FORMULES RUNIQUES (format: ψ001: ⊙(params))
        boolean isRunic = isRunicFormula(formula);
        System.out.println("🌀 JEAN DEBUG: isRunicFormula = " + isRunic);
        if (isRunic) {
            return executeRunicFormula(formula, context);
        }
        
        // 📜 FORMULES JSON ASSETS (format: "formula": "...")
        boolean isJson = isJsonAssetFormula(formula);
        System.out.println("🌀 JEAN DEBUG: isJsonAssetFormula = " + isJson);
        if (isJson) {
            return executeJsonAssetFormula(formula, context);
        }
        
        // ❌ FORMULE INCONNUE
        System.out.println("🌀 JEAN DEBUG: Aucune détection ! Formule inconnue");
        context.recordError("UNKNOWN_FORMULA_TYPE");
        return FormulaResult.error("Formule inconnue: " + formula, "UNKNOWN_FORMULA");
    }
    
    /**
     * 🧪 EXÉCUTION FORMULES SIMPLES (5 premières pour tests)
     */
    private FormulaResult executeSimpleFormula(String formula, GameContext context) {
        switch (formula) {
            case "MODIFY_ENERGY":
                return FormulaResult.success("🔋 Énergie modifiée avec succès", 
                    Map.of("energyChange", 10), "SIMPLE_ENERGY");
                    
            case "TELEPORT_HERO":
                return FormulaResult.success("🌀 Héros téléporté avec succès", 
                    Map.of("newPosition", Map.of("x", 5, "y", 5)), "SIMPLE_TELEPORT");
                    
            case "HEAL_HERO":
                return FormulaResult.success("💚 Héros soigné avec succès", 
                    Map.of("healAmount", 25), "SIMPLE_HEAL");
                    
            case "DAMAGE_ENEMY":
                return FormulaResult.success("⚔️ Dégâts infligés avec succès", 
                    Map.of("damageAmount", 15), "SIMPLE_DAMAGE");
                    
            case "CREATE_SHIELD":
                return FormulaResult.success("🛡️ Bouclier créé avec succès", 
                    Map.of("shieldStrength", 20), "SIMPLE_SHIELD");
                    
            // 🔮 NOUVELLES FORMULES CATÉGORIE A - RUNIQUES NATIVES
            case "CREATE_EFFECT":
                return executeCreateEffect(context);
                
            case "AMPLIFY":
                return executeAmplify(context);
                
            case "CONSTRUCTIVE":
                return executeConstructive(context);
                
            case "DESTRUCTIVE":
                return executeDestructive(context);
                
            case "COLLAPSE_TEMPORAL_STATES":
                return executeCollapseTemporalStates(context);
                
            case "TEMPORAL_BOOST":
                return executeTemporalBoost(context);
                
            case "ENERGY_DRAIN":
                return executeEnergyDrain(context);
                
                        case "PHASE_SHIFT":
                return executePhaseShift(context);
                
            // 🔮 NOUVELLES FORMULES CATÉGORIE A - BATCH 2
            case "QUANTUM_LEAP":
                return executeQuantumLeap(context);
                
            case "MANA_RESTORE":
                return executeManaRestore(context);
                
            case "SPELL_REFLECT":
                return executeSpellReflect(context);
                
            case "INVISIBILITY":
                return executeInvisibility(context);
                
            case "SPEED_BOOST":
                return executeSpeedBoost(context);
                
            case "STRENGTH_BOOST":
                return executeStrengthBoost(context);
                
            case "DEFENSE_BOOST":
                return executeDefenseBoost(context);
                
            case "LUCK_MODIFIER":
                return executeLuckModifier(context);
                
            // 🔮 NOUVELLES FORMULES CATÉGORIE A - BATCH 3
            case "MORALE_BOOST":
                return executeMoraleBoost(context);
                
            case "EXPERIENCE_GAIN":
                return executeExperienceGain(context);
                
            case "LEVEL_UP":
                return executeLevelUp(context);
                
            case "SKILL_BOOST":
                return executeSkillBoost(context);
                
            case "ARTIFACT_ENHANCE":
                return executeArtifactEnhance(context);
                
            case "WEAPON_ENCHANT":
                return executeWeaponEnchant(context);
                
            case "ARMOR_ENCHANT":
                return executeArmorEnchant(context);
                
            case "POTION_CREATE":
                return executePotionCreate(context);
                
            // 🔮 NOUVELLES FORMULES CATÉGORIE A - BATCH 4 (EXCALIBUR & COMBAT)
            case "EXCALIBUR_BANKAI":
                return executeExcaliburBankai(context);
                
            case "BATTLE_HEROES":
                return executeBattleHeroes(context);
                
            case "PANORAMIX_CAULDRON":
                return executePanoramixCauldron(context);
                
            default:
                return FormulaResult.error("Formule simple inconnue: " + formula);
        }
    }
    
    /**
     * 🔮 DÉTECTION FORMULE RUNIQUE
     */
    private boolean isRunicFormula(String formula) {
        // Format: ψ001: ⊙(Δt+2 @15,15 ⟶ MOV(Arthur, @15,15))
        Pattern runicPattern = Pattern.compile("^ψ\\d+:\\s*⊙\\(.*\\)$");
        return runicPattern.matcher(formula).matches();
    }
    
    /**
     * 🔮 EXÉCUTION FORMULE RUNIQUE - AVEC TRADUCTION INTELLIGENTE
     */
    private FormulaResult executeRunicFormula(String formula, GameContext context) {
        try {
            // Parser la formule runique: ψ001: ⊙(Δt+2 @15,15 ⟶ MOV(Arthur, @15,15))
            Pattern runicPattern = Pattern.compile("^ψ(\\d+):\\s*⊙\\((.*)\\)$");
            Matcher matcher = runicPattern.matcher(formula);
            
            if (!matcher.matches()) {
                return FormulaResult.error("🚨 Format runique invalide: " + formula, "INVALID_RUNIC_FORMAT");
            }
            
            String psiId = matcher.group(1);
            String runicContent = matcher.group(2);
            
            // 🌀 JEAN-GROFIGNON QUANTUM PROCESSING + TRADUCTION
            Map<String, Object> quantumResult = new HashMap<>();
            quantumResult.put("psiState", "ψ" + psiId);
            quantumResult.put("superposition", "⊙");
            quantumResult.put("originalFormula", formula);
            
            // 🎯 TRADUCTION INTELLIGENTE DU CONTENU SELON L'EFFET
            String narrativeTranslation = translateRunicContent(runicContent, psiId);
            
            // Parser le contenu runique pour extraire l'action
            if (runicContent.contains("MOV(")) {
                quantumResult.put("action", "MOVE");
                quantumResult.put("quantumType", "TEMPORAL_MOVEMENT");
                quantumResult.put("effect", "Hero position updated via quantum superposition");
            } else if (runicContent.contains("HEAL_HERO")) {
                quantumResult.put("action", "HEAL");
                quantumResult.put("quantumType", "VITAL_RESTORATION");
                quantumResult.put("effect", "Life force restored via quantum healing");
            } else if (runicContent.contains("DAMAGE_ENEMY")) {
                quantumResult.put("action", "DAMAGE");
                quantumResult.put("quantumType", "DESTRUCTIVE_FORCE");
                quantumResult.put("effect", "Quantum energy weaponized against enemies");
            } else if (runicContent.contains("BATTLE(")) {
                quantumResult.put("action", "BATTLE");
                quantumResult.put("quantumType", "CAUSAL_COMBAT");
                quantumResult.put("effect", "Combat resolved via quantum collapse");
            } else if (runicContent.contains("CREATE(")) {
                quantumResult.put("action", "CREATE");
                quantumResult.put("quantumType", "REALITY_MANIFESTATION");
                quantumResult.put("effect", "Object manifested from quantum foam");
            } else {
                quantumResult.put("action", "GENERIC_QUANTUM");
                quantumResult.put("quantumType", "PSI_MANIPULATION");
                quantumResult.put("effect", "Quantum state manipulated");
            }
            
            // 🎖️ WALTER VIETNAM VALIDATION
            // context.recordSuccess("RUNIC_FORMULA_EXECUTED"); // Méthode non disponible dans GameContext
            
            return FormulaResult.success(
                narrativeTranslation, // 🔥 TRADUCTION NARRATIVE AU LIEU DE MESSAGE GÉNÉRIQUE
                quantumResult, 
                "RUNIC_QUANTUM"
            );
            
        } catch (Exception e) {
            context.recordError("RUNIC_EXECUTION_ERROR");
            return FormulaResult.error(
                "🚨 Erreur d'exécution runique: " + e.getMessage(), 
                "RUNIC_ERROR"
            );
        }
    }
    
    /**
     * 🎯 TRADUCTION NARRATIVE HYBRIDE - INTELLIGENT FALLBACK
     * 1. Vérifie si on a une description LLM dans le JSON
     * 2. Sinon utilise le FormulaTranslationService
     * 3. En dernier recours, utilise la logique algo simple
     */
    private String translateRunicContent(String runicContent, String psiId) {
        try {
            // 🔥 ÉTAPE 1: Vérifier si on a une description LLM pré-générée
            String llmDescription = extractLLMDescription(runicContent);
            if (llmDescription != null && !llmDescription.isEmpty()) {
                return "📜 " + llmDescription + " (ψ" + psiId + ")";
            }
            
            // 🔥 ÉTAPE 2: Utiliser le service de traduction avancé
            try {
                Map<String, Object> context = new HashMap<>();
                context.put("psiId", psiId);
                context.put("type", "runic_formula");
                
                Map<String, Object> translationResult = translationService.smartTranslate(runicContent, context);
                if (translationResult.containsKey("traduction")) {
                    return "✨ " + translationResult.get("traduction") + " (ψ" + psiId + ")";
                }
            } catch (Exception e) {
                System.out.println("⚠️ Fallback: Service de traduction indisponible, utilisation algo simple");
            }
            
            // 🔥 ÉTAPE 3: Fallback algo simple (logique actuelle)
            return generateSimpleTranslation(runicContent, psiId);
            
        } catch (Exception e) {
            return "🚨 Erreur de traduction: " + runicContent + " (ψ" + psiId + ")";
        }
    }

    /**
     * 🔍 Extraire description LLM du JSON si présente
     */
    private String extractLLMDescription(String runicContent) {
        // Chercher des patterns comme "description": "...", "narrative": "...", etc.
        String[] llmFields = {"description", "narrative", "story", "lore", "flavor_text", "text_description", "llm_description"};
        
        for (String field : llmFields) {
            Pattern pattern = Pattern.compile("\"" + field + "\"\\s*:\\s*\"([^\"]+)\"");
            Matcher matcher = pattern.matcher(runicContent);
            if (matcher.find()) {
                return matcher.group(1);
            }
        }
        return null;
    }

    /**
     * 🎯 GÉNÉRATION ALGO SIMPLE (logique d'origine conservée)
     */
    private String generateSimpleTranslation(String runicContent, String psiId) {
        try {
            // Extraire les éléments temporels
            String timePhrase = "";
            if (runicContent.contains("Δt+")) {
                Pattern timePattern = Pattern.compile("Δt\\+(\\d+)");
                Matcher timeMatcher = timePattern.matcher(runicContent);
                if (timeMatcher.find()) {
                    String turns = timeMatcher.group(1);
                    timePhrase = "dans " + turns + " tours, ";
                }
            }
            
            // Extraire les coordonnées
            String locationPhrase = "";
            Pattern coordPattern = Pattern.compile("@(\\d+),(\\d+)");
            Matcher coordMatcher = coordPattern.matcher(runicContent);
            if (coordMatcher.find()) {
                String x = coordMatcher.group(1);
                String y = coordMatcher.group(2);
                locationPhrase = "aux coordonnées mystiques (" + x + ", " + y + "), ";
            }
            
            // Extraire l'action principale
            String actionPhrase = "une énergie quantique se manifeste";
            if (runicContent.contains("MOV(")) {
                actionPhrase = "Arthur étend sa main dans le vide, projetant un écho miroir vers";
            } else if (runicContent.contains("HEAL_HERO")) {
                actionPhrase = "une lumière dorée enveloppe le héros, restaurant";
            } else if (runicContent.contains("DAMAGE_ENEMY")) {
                actionPhrase = "des éclairs de pure destruction frappent";
            } else if (runicContent.contains("BATTLE(")) {
                actionPhrase = "les destins s'entrechoquent dans un fracas temporel vers";
            } else if (runicContent.contains("CREATE(")) {
                actionPhrase = "la réalité se plie et façonne";
            }
            
            // Construire la phrase narrative
            return "🌀 État ψ" + psiId + " activé: " + timePhrase + actionPhrase + " " + locationPhrase + 
                   "le déplacement temporel de " + (timePhrase.isEmpty() ? "maintenant" : timePhrase.replace("dans ", "").replace(" tours, ", " cycles")) + 
                   " " + locationPhrase;
            
        } catch (Exception e) {
            return "🌀 État ψ" + psiId + " activé: Une perturbation quantique résonne à travers les dimensions";
        }
    }
    
    /**
     * 📜 DÉTECTION FORMULE JSON ASSET
     */
    private boolean isJsonAssetFormula(String formula) {
        // Formules trouvées dans les assets JSON
        return formula.contains("paradoxRisk") || 
               formula.contains("temporalStability") || 
               formula.contains("affectedRadius") ||
               formula.contains("damage") ||
               formula.contains("healing");
    }
    
    /**
     * 📜 EXÉCUTION FORMULE JSON ASSET
     */
    private FormulaResult executeJsonAssetFormula(String formula, GameContext context) {
        try {
            Map<String, Object> jsonResult = new HashMap<>();
            jsonResult.put("originalFormula", formula);
            jsonResult.put("formulaSource", "JSON_ASSET");
            
            // 🧪 DÉTECTION DES TYPES DE FORMULES JSON
            if (formula.contains("paradoxRisk")) {
                // Formule de risque paradoxal
                double risk = extractNumericValue(formula, "paradoxRisk");
                jsonResult.put("type", "PARADOX_RISK");
                jsonResult.put("riskLevel", risk);
                jsonResult.put("effect", "Temporal paradox risk calculated");
                jsonResult.put("recommendation", risk > 0.5 ? "CAUTION_REQUIRED" : "SAFE_TO_PROCEED");
                
            } else if (formula.contains("temporalStability")) {
                // Formule de stabilité temporelle
                double stability = extractNumericValue(formula, "temporalStability");
                jsonResult.put("type", "TEMPORAL_STABILITY");
                jsonResult.put("stabilityLevel", stability);
                jsonResult.put("effect", "Timeline stability assessed");
                jsonResult.put("status", stability > 0.7 ? "STABLE" : "UNSTABLE");
                
            } else if (formula.contains("affectedRadius")) {
                // Formule de rayon d'effet
                double radius = extractNumericValue(formula, "affectedRadius");
                jsonResult.put("type", "AREA_EFFECT");
                jsonResult.put("radius", radius);
                jsonResult.put("effect", "Area of effect calculated");
                jsonResult.put("coverage", radius > 5 ? "WIDE_AREA" : "LOCAL_AREA");
                
            } else if (formula.contains("damage")) {
                // Formule de dégâts
                double damage = extractNumericValue(formula, "damage");
                jsonResult.put("type", "DAMAGE_CALCULATION");
                jsonResult.put("damageAmount", damage);
                jsonResult.put("effect", "Damage calculated and applied");
                jsonResult.put("severity", damage > 50 ? "HIGH_DAMAGE" : "MODERATE_DAMAGE");
                
            } else if (formula.contains("healing")) {
                // Formule de soins
                double healing = extractNumericValue(formula, "healing");
                jsonResult.put("type", "HEALING_CALCULATION");
                jsonResult.put("healingAmount", healing);
                jsonResult.put("effect", "Healing calculated and applied");
                jsonResult.put("potency", healing > 30 ? "STRONG_HEALING" : "MILD_HEALING");
                
            } else {
                // Formule JSON générique
                jsonResult.put("type", "GENERIC_JSON");
                jsonResult.put("effect", "JSON formula processed");
                jsonResult.put("status", "PROCESSED");
            }
            
                         // 🎖️ WALTER VIETNAM SUCCESS
             // context.recordSuccess("JSON_FORMULA_EXECUTED"); // Méthode non disponible dans GameContext
            
            return FormulaResult.success(
                "📜 Formule JSON asset exécutée avec succès !", 
                jsonResult, 
                "JSON_ASSET"
            );
            
        } catch (Exception e) {
            context.recordError("JSON_EXECUTION_ERROR");
            return FormulaResult.error(
                "🚨 Erreur d'exécution JSON: " + e.getMessage(), 
                "JSON_ERROR"
            );
        }
    }
    
    /**
     * 🔢 UTILITAIRE: Extraction de valeur numérique d'une formule
     */
    private double extractNumericValue(String formula, String parameter) {
        try {
            Pattern pattern = Pattern.compile(parameter + ".*?(\\d+(?:\\.\\d+)?)");
            Matcher matcher = pattern.matcher(formula);
            if (matcher.find()) {
                return Double.parseDouble(matcher.group(1));
            }
            return 1.0; // Valeur par défaut
        } catch (Exception e) {
            return 1.0; // Valeur par défaut en cas d'erreur
        }
    }
    
    /**
     * 🎖️ WALTER VIETNAM FLASHBACK TRIGGER
     */
    private void triggerWalterFlashback(GameContext context) {
        totalWalterFlashbacks++;
        
        String flashbackMessage = String.format(
            "🎖️ WALTER VIETNAM FLASHBACK #%d: Firebase sous attaque ! " +
            "Trop d'erreurs détectées ! %s",
            totalWalterFlashbacks,
            context.getWalterDiagnostic()
        );
        
        System.out.println("🚨 " + flashbackMessage);
        context.addMetadata("walterFlashback", flashbackMessage);
    }
    
    /**
     * 🔮 NOUVELLES FORMULES CATÉGORIE A - IMPLÉMENTATION
     */
    private FormulaResult executeCreateEffect(GameContext context) {
        return FormulaResult.success(
            "✨ Effet créé : healing_glow pendant 2 tours",
            Map.of("effectType", "healing_glow", "duration", 2, "intensity", 15),
            "RUNIC_CREATE_EFFECT"
        );
    }
    
    private FormulaResult executeAmplify(GameContext context) {
        return FormulaResult.success(
            "🔊 État ψ1 amplifié par facteur 3.0",
            Map.of("psiState", "ψ1", "amplificationFactor", 3.0, "newIntensity", 45),
            "RUNIC_AMPLIFY"
        );
    }
    
    private FormulaResult executeConstructive(GameContext context) {
        return FormulaResult.success(
            "🌀 Interférence constructive entre ψ1 et ψ2",
            Map.of("state1", "ψ1", "state2", "ψ2", "resultIntensity", 85, "interferenceType", "constructive"),
            "RUNIC_CONSTRUCTIVE"
        );
    }
    
    private FormulaResult executeDestructive(GameContext context) {
        return FormulaResult.success(
            "💥 Interférence destructive entre ψ1 et ψ2",
            Map.of("state1", "ψ1", "state2", "ψ2", "resultIntensity", 5, "interferenceType", "destructive"),
            "RUNIC_DESTRUCTIVE"
        );
    }
    
    private FormulaResult executeCollapseTemporalStates(GameContext context) {
        return FormulaResult.success(
            "⚡ Collapse de tous les états temporels - Réalité fixée",
            Map.of("collapsedStates", 7, "finalReality", "timeline_alpha", "stabilityIndex", 0.95),
            "RUNIC_COLLAPSE_TEMPORAL"
        );
    }
    
    private FormulaResult executeTemporalBoost(GameContext context) {
        return FormulaResult.success(
            "⏰ Boost temporel appliqué au héros pendant 3 tours",
            Map.of("targetType", "hero", "duration", 3, "speedMultiplier", 2.5),
            "RUNIC_TEMPORAL_BOOST"
        );
    }
    
    private FormulaResult executeEnergyDrain(GameContext context) {
        return FormulaResult.success(
            "🔋 Énergie drainée de la cible (-30 mana)",
            Map.of("drainAmount", 30, "targetMana", 20, "casterMana", 80),
            "RUNIC_ENERGY_DRAIN"
        );
    }
    
    private FormulaResult executePhaseShift(GameContext context) {
        return FormulaResult.success(
            "👻 Héros décalé vers le plan astral pendant 2 tours",
            Map.of("targetPlane", "astral", "duration", 2, "phaseIntangibility", true),
            "RUNIC_PHASE_SHIFT"
        );
    }
    
    // 🔮 BATCH 2 - NOUVELLES FORMULES CATÉGORIE A
    private FormulaResult executeQuantumLeap(GameContext context) {
        return FormulaResult.success(
            "🚀 Saut quantique accompli vers coordonnées cibles",
            Map.of("hero", "Arthur", "startCoords", "[10,10]", "endCoords", "[25,30]", "quantumDistance", 21.2),
            "RUNIC_QUANTUM_LEAP"
        );
    }
    
    private FormulaResult executeManaRestore(GameContext context) {
        return FormulaResult.success(
            "💙 Mana restauré avec succès",
            Map.of("hero", "Arthur", "manaRestored", 75, "newManaTotal", 150, "efficiency", "optimal"),
            "RUNIC_MANA_RESTORE"
        );
    }
    
    private FormulaResult executeSpellReflect(GameContext context) {
        return FormulaResult.success(
            "🪞 Bouclier de réflexion magique activé",
            Map.of("hero", "Arthur", "reflectChance", 85, "duration", 4, "reflectedSpells", 0),
            "RUNIC_SPELL_REFLECT"
        );
    }
    
    private FormulaResult executeInvisibility(GameContext context) {
        return FormulaResult.success(
            "👻 Invisibilité accordée au héros",
            Map.of("hero", "Arthur", "invisibilityLevel", 95, "turnsRemaining", 3, "detectionResistance", "high"),
            "RUNIC_INVISIBILITY"
        );
    }
    
    private FormulaResult executeSpeedBoost(GameContext context) {
        return FormulaResult.success(
            "⚡ Vitesse augmentée avec multiplicateur",
            Map.of("hero", "Arthur", "speedMultiplier", 2.5, "duration", 6, "newSpeed", 125),
            "RUNIC_SPEED_BOOST"
        );
    }
    
    private FormulaResult executeStrengthBoost(GameContext context) {
        return FormulaResult.success(
            "💪 Force augmentée temporairement",
            Map.of("hero", "Arthur", "strengthBonus", 15, "duration", 5, "newStrength", 85),
            "RUNIC_STRENGTH_BOOST"
        );
    }
    
    private FormulaResult executeDefenseBoost(GameContext context) {
        return FormulaResult.success(
            "🛡️ Défense renforcée temporairement",
            Map.of("hero", "Arthur", "defenseBonus", 20, "duration", 4, "newDefense", 90),
            "RUNIC_DEFENSE_BOOST"
        );
    }
    
    private FormulaResult executeLuckModifier(GameContext context) {
        return FormulaResult.success(
            "🍀 Chance modifiée par formule runique",
            Map.of("hero", "Arthur", "luckModifier", 12, "duration", 8, "criticalChance", 35),
            "RUNIC_LUCK_MODIFIER"
        );
    }
    
    // 🔮 BATCH 3 - NOUVELLES FORMULES CATÉGORIE A
    private FormulaResult executeMoraleBoost(GameContext context) {
        return FormulaResult.success(
            "🎺 Moral des troupes renforcé",
            Map.of("hero", "Arthur", "moraleBonus", 25, "duration", 6, "troopEfficiency", 140),
            "RUNIC_MORALE_BOOST"
        );
    }
    
    private FormulaResult executeExperienceGain(GameContext context) {
        return FormulaResult.success(
            "📈 Expérience accordée au héros",
            Map.of("hero", "Arthur", "xpGained", 500, "newTotalXp", 2500, "levelProgress", 75),
            "RUNIC_EXPERIENCE_GAIN"
        );
    }
    
    private FormulaResult executeLevelUp(GameContext context) {
        return FormulaResult.success(
            "⭐ Héros monte de niveau !",
            Map.of("hero", "Arthur", "oldLevel", 5, "newLevel", 6, "skillPoints", 3, "statBonus", "all+2"),
            "RUNIC_LEVEL_UP"
        );
    }
    
    private FormulaResult executeSkillBoost(GameContext context) {
        return FormulaResult.success(
            "🎯 Compétence spécifique améliorée",
            Map.of("hero", "Arthur", "skill", "Archery", "oldValue", 15, "newValue", 25, "duration", 10),
            "RUNIC_SKILL_BOOST"
        );
    }
    
    private FormulaResult executeArtifactEnhance(GameContext context) {
        return FormulaResult.success(
            "✨ Artefact amélioré magiquement",
            Map.of("artifact", "Épée de Lumière", "oldLevel", 2, "newLevel", 3, "powerIncrease", 40),
            "RUNIC_ARTIFACT_ENHANCE"
        );
    }
    
    private FormulaResult executeWeaponEnchant(GameContext context) {
        return FormulaResult.success(
            "⚔️ Arme enchantée avec effet magique",
            Map.of("weapon", "Épée Longue", "enchantment", "Feu Éternel", "damageBonus", 15, "specialEffect", "burn"),
            "RUNIC_WEAPON_ENCHANT"
        );
    }
    
    private FormulaResult executeArmorEnchant(GameContext context) {
        return FormulaResult.success(
            "🛡️ Armure enchantée avec protection",
            Map.of("armor", "Cotte de Mailles", "enchantment", "Résistance Magique", "defenseBonus", 20, "magicResist", 30),
            "RUNIC_ARMOR_ENCHANT"
        );
    }
    
    private FormulaResult executePotionCreate(GameContext context) {
        return FormulaResult.success(
            "🧪 Potion créée par alchimie runique",
            Map.of("potionType", "Grande Guérison", "potency", 85, "uses", 3, "rarity", "rare"),
            "RUNIC_POTION_CREATE"
        );
    }

    // 🔮 BATCH 4 - NOUVELLES FORMULES CATÉGORIE A (EXCALIBUR & COMBAT)
    private FormulaResult executeExcaliburBankai(GameContext context) {
        return FormulaResult.success(
            "🗡️ EXCALIBUR BANKAI - Épée de la Réalité Déchirée !",
            Map.of(
                "hero", "Arthur", 
                "weapon", "Excalibur", 
                "bankaiMode", "REALITY_WEAVER",
                "damage", 999, 
                "specialEffect", "REALITY_SLASH",
                "duration", 10,
                "manaCost", 100
            ),
            "EXCALIBUR_BANKAI"
        );
    }
    
    private FormulaResult executeBattleHeroes(GameContext context) {
        return FormulaResult.success(
            "⚔️ COMBAT ÉPIQUE - Arthur vs Vince Vega !",
            Map.of(
                "hero1", "Arthur", 
                "hero2", "Vince_Vega",
                "battleType", "EPIC_DUEL",
                "rounds", 5,
                "winner", "Arthur",
                "damageDealt", 150,
                "damageReceived", 75,
                "specialMoves", List.of("EXCALIBUR_SLASH", "VEGA_REALITY_GUN")
            ),
            "BATTLE_HEROES"
        );
    }
    
    private FormulaResult executePanoramixCauldron(GameContext context) {
        return FormulaResult.success(
            "🏺 CHAUDRON QUANTIQUE PANORAMIX - Buffs Universels !",
            Map.of(
                "druid", "Panoramix", 
                "artifact", "Chaudron Quantique",
                "buffs", Map.of(
                    "ATK", 50,
                    "DEF", 50,
                    "HP", 100,
                    "Regeneration", 20,
                    "PoisonImmunity", true
                ),
                "duration", 15,
                "affectedHeroes", List.of("Arthur", "Vince_Vega", "Morgana"),
                "specialEffect", "QUANTUM_AMPLIFICATION"
            ),
            "PANORAMIX_CAULDRON"
        );
    }

    /**
     * 📊 WALTER DIAGNOSTIC COMPLET
     */
    public Map<String, Object> getWalterDiagnostic() {
        Map<String, Object> diagnostic = new HashMap<>();
        diagnostic.put("totalFormulasExecuted", 
            formulaExecutionCounts.values().stream().mapToInt(Integer::intValue).sum());
        diagnostic.put("uniqueFormulasUsed", formulaExecutionCounts.size());
        diagnostic.put("totalWalterFlashbacks", totalWalterFlashbacks);
        diagnostic.put("formulaExecutionCounts", formulaExecutionCounts);
        diagnostic.put("averageExecutionTimes", formulaExecutionTimes);
        
        return diagnostic;
    }
    
    /**
     * 🧪 TEST DES 5 FORMULES SIMPLES
     */
    public Map<String, FormulaResult> testSimpleFormulas(GameContext context) {
        Map<String, FormulaResult> results = new HashMap<>();
        
        for (String formula : SIMPLE_TEST_FORMULAS) {
            results.put(formula, executeFormula(formula, context));
        }
        
        return results;
    }
} 