package com.example.demo.service;

import org.springframework.stereotype.Service;
import java.util.Map;
import java.util.HashMap;

@Service
public class FormulaTranslationService {

    // 🌟 TRADUCTION FORMULE → ENGLISH
    private static final Map<String, String> FORMULA_TO_ENGLISH = Map.of(
        "METEOR_SHOWER", "Devastating meteor rain from the sky",
        "DIVINE_INTERVENTION", "Miraculous divine salvation for hero",
        "CHAIN_LIGHTNING", "Lightning that jumps between enemies",
        "AREA_DAMAGE", "Massive explosion in target zone",
        "TELEPORT_HERO", "Instantly move hero to new position",
        "HEAL_HERO", "Restore hero health points",
        "MODIFY_ENERGY", "Change hero energy levels",
        "ANTI_MAGIC_FIELD", "Zone that blocks all magical effects",
        "SPELL_STEAL", "Steal enemy magical abilities",
        "REGENERATION", "Continuous health restoration over time"
    );

    // 🔥 TRADUCTION JSON PROPERTIES → FRANÇAIS
    private static final Map<String, String> JSON_TO_FRENCH = new HashMap<String, String>() {{
        put("damage", "dégâts");
        put("radius", "rayon");
        put("duration", "durée");
        put("health", "santé");
        put("mana", "mana");
        put("energy", "énergie");
        put("position", "position");
        put("target", "cible");
        put("effect", "effet");
        put("power", "puissance");
        put("range", "portée");
        put("cooldown", "temps de recharge");
    }};

    // 🌀 TRADUCTION FANTASY INTELLIGENTE → FRANÇAIS
    private static final Map<String, String> FANTASY_TRANSLATION = new HashMap<String, String>() {{
        // Termes Quantiques → Fantasy
        put("ψ", "essence éthérée");
        put("⊙", "déphasage multiple");
        put("†", "convergence temporelle");
        put("Π", "révélation mystique");
        put("Δt", "flux du temps");
        
        // Actions Fantasy
        put("MOV", "glissement éthéré");
        put("DMG", "fracture dimensionnelle");
        put("HEAL", "restauration vitale");
        put("TELEPORT", "translation planaire");
        put("PHASE_SHIFT", "passage entre les voiles");
        
        // Complexité GROFI → Termes Fantasy
        put("ETHEREAL", "éthéré, déphasé");
        put("MULTIPLE", "en même temps, superposé");
        put("REALM", "autre plan d'existence");
        put("TIMELINE", "ligne temporelle parallèle");
        put("SUPERPOSITION", "existence simultanée");
        put("PARALLEL", "dimension sœur");
    }};

    /**
     * 🚀 TRADUCTION PRINCIPALE : Formule → English
     */
    public String translateFormulaToEnglish(String formulaName) {
        return FORMULA_TO_ENGLISH.getOrDefault(formulaName, 
            "Unknown formula: " + formulaName);
    }

    /**
     * 🔥 TRADUCTION JSON PROPERTIES → Français
     */
    public Map<String, Object> translateJsonPropertiesToFrench(Map<String, Object> properties) {
        Map<String, Object> translated = new HashMap<>();
        
        for (Map.Entry<String, Object> entry : properties.entrySet()) {
            String frenchKey = JSON_TO_FRENCH.getOrDefault(entry.getKey(), entry.getKey());
            translated.put(frenchKey, entry.getValue());
        }
        
        return translated;
    }

    /**
     * 🌀 TRADUCTION FANTASY → Français magique
     */
    public String translateFantasyToFrench(String runicText) {
        String translated = runicText;
        
        for (Map.Entry<String, String> entry : FANTASY_TRANSLATION.entrySet()) {
            translated = translated.replace(entry.getKey(), entry.getValue());
        }
        
        return translated;
    }

    /**
     * 🧠 CLASSE GROFI COMPLEXITY HANDLER
     */
    public Map<String, Object> handleGrofiComplexity(String input, int complexity) {
        Map<String, Object> result = new HashMap<>();
        
        if (complexity <= 2) {
            result.put("origine", "plan matériel");
            result.put("description", "effet simple et direct");
        } else if (complexity <= 4) {
            result.put("origine", "entre les voiles");
            result.put("description", "il vient de quand... une époque floue");
        } else {
            result.put("origine", "autre realm");
            result.put("description", "vient d'un plan parallèle, existence multiple");
        }
        
        // Détection intelligente REALM vs TIMELINE
        if (input.contains("PARALLEL") || input.contains("REALM")) {
            result.put("type_origine", "plan géographique parallèle");
        } else if (input.contains("TIME") || input.contains("Δt")) {
            result.put("type_origine", "ligne temporelle alternative");
        } else {
            result.put("type_origine", "superposition dimensionnelle");
        }
        
        return result;
    }

    /**
     * 🎯 TRADUCTION COMPLÈTE : FormulaExecutionResult → Affichage Français
     */
    public Map<String, Object> translateCompleteResult(String formulaName, 
                                                      String runicInterpretation,
                                                      Map<String, Object> properties) {
        Map<String, Object> result = new HashMap<>();
        
        // Formule en anglais
        result.put("formule_anglais", translateFormulaToEnglish(formulaName));
        
        // Fantasy en français
        result.put("interpretation_fantasy", translateFantasyToFrench(runicInterpretation));
        
        // Properties en français
        result.put("proprietes", translateJsonPropertiesToFrench(properties));
        
        // Meta info
        result.put("formule_originale", formulaName);
        result.put("statut_traduction", "✅ Traduit par FormulaTranslationService");
        
        return result;
    }

    /**
     * 🧪 DETECTION AUTO : Quel type de traduction needed
     */
    public String detectTranslationType(String input) {
        if (input.contains("ψ") || input.contains("⊙") || input.contains("†")) {
            return "RUNIC";
        } else if (input.matches("[A-Z_]+")) {
            return "FORMULA";
        } else {
            return "JSON_PROPERTY";
        }
    }

    /**
     * 🚀 SERVICE PRINCIPAL : Traduction intelligente
     */
    public Map<String, Object> smartTranslate(String input, Map<String, Object> context) {
        String type = detectTranslationType(input);
        Map<String, Object> result = new HashMap<>();
        
        switch (type) {
            case "RUNIC":
                result.put("type", "Fantasy");
                result.put("traduction", translateFantasyToFrench(input));
                break;
            case "FORMULA":
                result.put("type", "Formule");
                result.put("traduction", translateFormulaToEnglish(input));
                break;
            case "JSON_PROPERTY":
                result.put("type", "Propriété JSON");
                result.put("traduction", JSON_TO_FRENCH.getOrDefault(input, input));
                break;
        }
        
        result.put("original", input);
        result.put("service", "FormulaTranslationService V2");
        
        return result;
    }
} 