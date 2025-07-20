package com.heroesoftimepoc.temporalengine.service;

import org.springframework.stereotype.Service;
import java.util.*;
import java.util.regex.Pattern;
import java.util.regex.Matcher;

@Service
public class ScriptTranslationService {

    // ===== MAPPINGS POUR TRADUCTION LITTÉRAIRE =====
    private static final Map<String, String> LITERARY_TRANSLATIONS = new HashMap<>();
    private static final Map<String, String> ICON_TRANSLATIONS = new HashMap<>();
    private static final Map<String, String> RUNE_TRANSLATIONS = new HashMap<>();

    static {
        // === TRADUCTIONS LITTÉRAIRES ANGLAISES ===
        LITERARY_TRANSLATIONS.put("HERO", "the valiant hero");
        LITERARY_TRANSLATIONS.put("MOV", "extends his hand into the void, projecting a mirrored echo");
        LITERARY_TRANSLATIONS.put("CREATE", "summons from the depths of possibility");
        LITERARY_TRANSLATIONS.put("USE", "channels the ancient power of");
        LITERARY_TRANSLATIONS.put("CAST", "weaves the threads of reality, unleashing");
        LITERARY_TRANSLATIONS.put("ψ", "quantum essence");
        LITERARY_TRANSLATIONS.put("⊙", "temporal projection");
        LITERARY_TRANSLATIONS.put("†", "collapse of probability");
        LITERARY_TRANSLATIONS.put("Π", "observer's gaze");
        LITERARY_TRANSLATIONS.put("Δt", "temporal displacement");
        LITERARY_TRANSLATIONS.put("CONSTRUCTIVE", "constructive interference");
        LITERARY_TRANSLATIONS.put("DESTRUCTIVE", "destructive interference");
        LITERARY_TRANSLATIONS.put("NEUTRAL", "neutral interference");
        LITERARY_TRANSLATIONS.put("COMPLEX", "complex interference");
        LITERARY_TRANSLATIONS.put("CREATURE", "otherworldly entity");
        LITERARY_TRANSLATIONS.put("ITEM", "artifact of power");
        LITERARY_TRANSLATIONS.put("SPELL", "arcane incantation");
        LITERARY_TRANSLATIONS.put("TARGET", "chosen adversary");
        LITERARY_TRANSLATIONS.put("UNIT", "loyal companion");
        LITERARY_TRANSLATIONS.put("BATTLE", "engages in quantum combat with");
        LITERARY_TRANSLATIONS.put("ABILITY", "unleashes the mystical power of");
        LITERARY_TRANSLATIONS.put("ACTIVATE", "awakens the quantum essence of");
        LITERARY_TRANSLATIONS.put("PHASE_SHIFT", "shifts through quantum phases");
        LITERARY_TRANSLATIONS.put("quantum_wisp", "ethereal quantum wisp");
        LITERARY_TRANSLATIONS.put("probability_spider", "probability-weaving spider");
        LITERARY_TRANSLATIONS.put("quantum_knight", "quantum-armored knight");
        LITERARY_TRANSLATIONS.put("quantum_cat", "phase-shifting quantum cat");
        LITERARY_TRANSLATIONS.put("quantum_lich", "death-superposed quantum lich");
        LITERARY_TRANSLATIONS.put("quantum_beetle", "resonance-amplifying beetle");
        LITERARY_TRANSLATIONS.put("quantum_phoenix", "legendary quantum phoenix");
        LITERARY_TRANSLATIONS.put("probability_archon", "probability-governing archon");

        // === TRADUCTIONS ICÔNES/EMOJIS ===
        ICON_TRANSLATIONS.put("HERO", "🧍");
        ICON_TRANSLATIONS.put("MOV", "➡️");
        ICON_TRANSLATIONS.put("CREATE", "✨");
        ICON_TRANSLATIONS.put("USE", "🧙‍♂️");
        ICON_TRANSLATIONS.put("CAST", "🔮");
        ICON_TRANSLATIONS.put("ψ", "🧠");
        ICON_TRANSLATIONS.put("⊙", "⏳");
        ICON_TRANSLATIONS.put("†", "❗");
        ICON_TRANSLATIONS.put("Π", "👁️");
        ICON_TRANSLATIONS.put("Δt", "⏰");
        ICON_TRANSLATIONS.put("CONSTRUCTIVE", "➕");
        ICON_TRANSLATIONS.put("DESTRUCTIVE", "➖");
        ICON_TRANSLATIONS.put("NEUTRAL", "⚖️");
        ICON_TRANSLATIONS.put("COMPLEX", "🌀");
        ICON_TRANSLATIONS.put("CREATURE", "🐉");
        ICON_TRANSLATIONS.put("ITEM", "💎");
        ICON_TRANSLATIONS.put("SPELL", "✨");
        ICON_TRANSLATIONS.put("TARGET", "🎯");
        ICON_TRANSLATIONS.put("UNIT", "⚔️");
        ICON_TRANSLATIONS.put("COORDINATES", "🗺️");
        ICON_TRANSLATIONS.put("ENERGY", "⚡");
        ICON_TRANSLATIONS.put("TIME", "⌛");
        ICON_TRANSLATIONS.put("BATTLE", "⚔️");
        ICON_TRANSLATIONS.put("ABILITY", "🔮");
        ICON_TRANSLATIONS.put("ACTIVATE", "✨");
        ICON_TRANSLATIONS.put("PHASE_SHIFT", "🌀");
        ICON_TRANSLATIONS.put("quantum_wisp", "🧚‍♀️");
        ICON_TRANSLATIONS.put("probability_spider", "🕷️");
        ICON_TRANSLATIONS.put("quantum_knight", "⚔️");
        ICON_TRANSLATIONS.put("quantum_cat", "🐱");
        ICON_TRANSLATIONS.put("quantum_lich", "💀");
        ICON_TRANSLATIONS.put("quantum_beetle", "🪲");
        ICON_TRANSLATIONS.put("quantum_phoenix", "🔥");
        ICON_TRANSLATIONS.put("probability_archon", "👑");

        // === TRADUCTIONS RUNES MYSTIQUES ===
        RUNE_TRANSLATIONS.put("HERO", "ᚺ");
        RUNE_TRANSLATIONS.put("MOV", "ᛗ");
        RUNE_TRANSLATIONS.put("CREATE", "ᚲ");
        RUNE_TRANSLATIONS.put("USE", "ᚢ");
        RUNE_TRANSLATIONS.put("CAST", "ᛊ");
        RUNE_TRANSLATIONS.put("ψ", "☥");
        RUNE_TRANSLATIONS.put("⊙", "⟡");
        RUNE_TRANSLATIONS.put("†", "𐍈");
        RUNE_TRANSLATIONS.put("Π", "☉");
        RUNE_TRANSLATIONS.put("Δt", "⏣");
        RUNE_TRANSLATIONS.put("CONSTRUCTIVE", "⊕");
        RUNE_TRANSLATIONS.put("DESTRUCTIVE", "⊖");
        RUNE_TRANSLATIONS.put("NEUTRAL", "⊗");
        RUNE_TRANSLATIONS.put("COMPLEX", "⊘");
        RUNE_TRANSLATIONS.put("CREATURE", "ᛞ");
        RUNE_TRANSLATIONS.put("ITEM", "ᛃ");
        RUNE_TRANSLATIONS.put("SPELL", "ᛏ");
        RUNE_TRANSLATIONS.put("TARGET", "ᚦ");
        RUNE_TRANSLATIONS.put("UNIT", "ᚹ");
        RUNE_TRANSLATIONS.put("COORDINATES", "⌖");
        RUNE_TRANSLATIONS.put("ENERGY", "⚛");
        RUNE_TRANSLATIONS.put("TIME", "⏜");
        RUNE_TRANSLATIONS.put("BATTLE", "ᛒ");
        RUNE_TRANSLATIONS.put("ABILITY", "ᚨ");
        RUNE_TRANSLATIONS.put("ACTIVATE", "ᚫ");
        RUNE_TRANSLATIONS.put("PHASE_SHIFT", "ᛟ");
        RUNE_TRANSLATIONS.put("quantum_wisp", "ᚹ");
        RUNE_TRANSLATIONS.put("probability_spider", "ᛊ");
        RUNE_TRANSLATIONS.put("quantum_knight", "ᚲ");
        RUNE_TRANSLATIONS.put("quantum_cat", "ᚲᚨᛏ");
        RUNE_TRANSLATIONS.put("quantum_lich", "ᛚ");
        RUNE_TRANSLATIONS.put("quantum_beetle", "ᛒ");
        RUNE_TRANSLATIONS.put("quantum_phoenix", "ᚠ");
        RUNE_TRANSLATIONS.put("probability_archon", "ᚨ");
    }

    // ===== MÉTHODES PRINCIPALES =====

    public Map<String, Object> translateScript(String script, String mode) {
        Map<String, Object> result = new HashMap<>();
        result.put("original", script);
        result.put("mode", mode);

        switch (mode.toLowerCase()) {
            case "literary":
                result.put("translated", translateToLiterary(script));
                break;
            case "icons":
                result.put("translated", translateToIcons(script));
                break;
            case "runes":
                result.put("translated", translateToRunes(script));
                break;
            case "all":
                result.put("literary", translateToLiterary(script));
                result.put("icons", translateToIcons(script));
                result.put("runes", translateToRunes(script));
                break;
            default:
                result.put("error", "Mode de traduction non reconnu: " + mode);
        }

        return result;
    }

    // ===== TRADUCTION LITTÉRAIRE ANGLAISE =====

    private String translateToLiterary(String script) {
        if (script == null || script.trim().isEmpty()) {
            return "The void whispers of forgotten possibilities...";
        }

        String translated = script;

        // Traduire les commandes de base
        translated = translateBasicCommands(translated, LITERARY_TRANSLATIONS);
        
        // Traduire les états quantiques
        translated = translateQuantumStates(translated);
        
        // Traduire les formules d'artefacts
        translated = translateArtifactFormulas(translated);
        
        // Ajouter du style littéraire
        translated = addLiteraryStyle(translated);

        return translated;
    }

    private String translateBasicCommands(String script, Map<String, String> translations) {
        String result = script;
        
        // Patterns pour les commandes - Version plus littéraire et poétique
        result = result.replaceAll("HERO\\(([^)]+)\\)", "the valiant hero $1 emerges from the depths of forgotten memories");
        result = result.replaceAll("MOV\\(([^,]+),\\s*([^,]+),\\s*@(\\d+),(\\d+)\\)", 
            "the valiant hero $2 glides through the fabric of reality, his essence flowing like liquid starlight across the quantum landscape");
        result = result.replaceAll("CREATE\\(([^,]+),\\s*([^,]+)(?:,\\s*@(\\d+),(\\d+))?\\)", 
            "summons from the depths of possibility a $1 named $2, its form shimmering with the essence of quantum uncertainty");
        result = result.replaceAll("USE\\(([^,]+),\\s*([^,]+)(?:,\\s*([^)]+))?\\)", 
            "channels the ancient power of the $1 $2" + 
            (result.contains("HERO:") ? " through the chosen vessel $3, absorbing the very essence of creation" : ""));
        result = result.replaceAll("CAST\\(SPELL,\\s*([^,]+),\\s*TARGET:([^,]+),\\s*HERO:([^)]+)\\)", 
            "weaves the threads of reality, unleashing the arcane incantation $1 upon the chosen adversary $2 through the mystical conduit $3");
        result = result.replaceAll("BATTLE\\(([^,]+),\\s*([^)]+)\\)", 
            "engages in quantum combat with the $1 against the $2, their essences intertwining in a dance of probability and uncertainty");
        result = result.replaceAll("ABILITY\\(([^,]+),\\s*([^)]+)\\)", 
            "unleashes the mystical power of $2 through the quantum essence of $1, causing reality itself to shimmer and shift");
        result = result.replaceAll("ACTIVATE\\(([^)]+)\\)", 
            "awakens the quantum essence of the $1, its ancient power pulsing with the rhythm of creation");
        result = result.replaceAll("PHASE_SHIFT\\(([^,]+),\\s*([^)]+)\\)", 
            "shifts through quantum phases with the $1 by $2 radians, transcending the boundaries of conventional reality");

        return result;
    }

    private String translateQuantumStates(String script) {
        String result = script;
        
        // États quantiques - Version plus poétique
        result = result.replaceAll("ψ(\\d+):\\s*⊙\\((.*)\\)", 
            "quantum essence $1 manifests through temporal projection, its ethereal form dancing between the threads of reality: $2");
        result = result.replaceAll("†ψ(\\d+)", 
            "the collapse of probability shatters quantum essence $1, as reality solidifies from the quantum foam of possibilities");
        result = result.replaceAll("Π\\(([^)]+)\\)\\s*⇒\\s*†ψ(\\d+)", 
            "the observer's gaze upon $1 triggers the collapse of quantum essence $2, as consciousness shapes the fabric of existence");
        result = result.replaceAll("Δt\\+(\\d+)", 
            "temporal displacement of $1 cycles, as time itself bends to the will of quantum uncertainty");

        return result;
    }

    private String translateArtifactFormulas(String script) {
        String result = script;
        
        // Formules d'artefacts - Version plus mystique
        result = result.replaceAll("CONSTRUCTIVE\\(([^)]+)\\)", 
            "constructive interference between $1 creates a wave of amplified probability, where all possibilities exist in perfect harmony");
        result = result.replaceAll("DESTRUCTIVE\\(([^)]+)\\)", 
            "destructive interference annihilating $1, as opposing forces tear at the very fabric of reality");
        result = result.replaceAll("AMPLIFY\\(([^,]+),\\s*([^)]+)\\)", 
            "amplification of $1 by the factor of $2, creating a resonance that shakes the very foundations of existence");
        result = result.replaceAll("MODIFY_ENERGY\\(([^,]+),\\s*([^)]+)\\)", 
            "modification of the hero's essence by $2 units, as the quantum field responds to the call of destiny");

        return result;
    }

    private String addLiteraryStyle(String script) {
        // Ajouter des éléments littéraires
        String[] sentences = script.split("\\.");
        List<String> enhancedSentences = new ArrayList<>();
        
        for (String sentence : sentences) {
            if (sentence.trim().isEmpty()) continue;
            
            String enhanced = sentence.trim();
            
            // Ajouter des adjectifs mystiques
            if (enhanced.contains("hero")) {
                enhanced = enhanced.replace("hero", "valiant hero");
            }
            if (enhanced.contains("moves")) {
                enhanced = enhanced.replace("moves", "glides through the fabric of reality");
            }
            if (enhanced.contains("creates")) {
                enhanced = enhanced.replace("creates", "summons from the depths of possibility");
            }
            
            enhancedSentences.add(enhanced);
        }
        
        return String.join(". ", enhancedSentences) + ".";
    }

    // ===== TRADUCTION ICÔNES/EMOJIS =====

    private String translateToIcons(String script) {
        if (script == null || script.trim().isEmpty()) {
            return "🔮✨";
        }

        String translated = script;

        // Traduire les commandes de base
        translated = translateBasicCommandsIcons(translated);
        
        // Traduire les états quantiques
        translated = translateQuantumStatesIcons(translated);
        
        // Traduire les formules d'artefacts
        translated = translateArtifactFormulasIcons(translated);

        return translated;
    }

    private String translateBasicCommandsIcons(String script) {
        String result = script;
        
        // Commandes avec icônes
        result = result.replaceAll("HERO\\(([^)]+)\\)", "🧍($1)");
        result = result.replaceAll("MOV\\(([^,]+),\\s*([^,]+),\\s*@(\\d+),(\\d+)\\)", 
            "🧍➡️🗺️($3,$4)");
        result = result.replaceAll("CREATE\\(([^,]+),\\s*([^,]+)(?:,\\s*@(\\d+),(\\d+))?\\)", 
            "✨🐉($2)" + (result.contains("@") ? "🗺️($3,$4)" : ""));
        result = result.replaceAll("USE\\(([^,]+),\\s*([^,]+)(?:,\\s*([^)]+))?\\)", 
            "🧙‍♂️💎($2)" + (result.contains("HERO:") ? "🧍($3)" : ""));
        result = result.replaceAll("CAST\\(SPELL,\\s*([^,]+),\\s*TARGET:([^,]+),\\s*HERO:([^)]+)\\)", 
            "🔮✨($1)🎯($2)🧍($3)");
        result = result.replaceAll("BATTLE\\(([^,]+),\\s*([^)]+)\\)", 
            "⚔️($1)vs($2)");
        result = result.replaceAll("ABILITY\\(([^,]+),\\s*([^)]+)\\)", 
            "🔮($1)✨($2)");
        result = result.replaceAll("ACTIVATE\\(([^)]+)\\)", 
            "✨($1)");
        result = result.replaceAll("PHASE_SHIFT\\(([^,]+),\\s*([^)]+)\\)", 
            "🌀($1)⏰($2)");

        return result;
    }

    private String translateQuantumStatesIcons(String script) {
        String result = script;
        
        result = result.replaceAll("ψ(\\d+):\\s*⊙\\((.*)\\)", 
            "🧠$1:⏳($2)");
        result = result.replaceAll("†ψ(\\d+)", 
            "❗🧠$1");
        result = result.replaceAll("Π\\(([^)]+)\\)\\s*⇒\\s*†ψ(\\d+)", 
            "👁️($1)⇒❗🧠$2");
        result = result.replaceAll("Δt\\+(\\d+)", 
            "⏰+$1");

        return result;
    }

    private String translateArtifactFormulasIcons(String script) {
        String result = script;
        
        result = result.replaceAll("CONSTRUCTIVE\\(([^)]+)\\)", 
            "➕($1)");
        result = result.replaceAll("DESTRUCTIVE\\(([^)]+)\\)", 
            "➖($1)");
        result = result.replaceAll("AMPLIFY\\(([^,]+),\\s*([^)]+)\\)", 
            "⚡($1)×$2");
        result = result.replaceAll("MODIFY_ENERGY\\(([^,]+),\\s*([^)]+)\\)", 
            "⚡$2");

        return result;
    }

    // ===== TRADUCTION RUNES MYSTIQUES =====

    private String translateToRunes(String script) {
        if (script == null || script.trim().isEmpty()) {
            return "☥⟡𐍈";
        }

        String translated = script;

        // Traduire les commandes de base
        translated = translateBasicCommandsRunes(translated);
        
        // Traduire les états quantiques
        translated = translateQuantumStatesRunes(translated);
        
        // Traduire les formules d'artefacts
        translated = translateArtifactFormulasRunes(translated);

        return translated;
    }

    private String translateBasicCommandsRunes(String script) {
        String result = script;
        
        result = result.replaceAll("HERO\\(([^)]+)\\)", "ᚺ($1)");
        result = result.replaceAll("MOV\\(([^,]+),\\s*([^,]+),\\s*@(\\d+),(\\d+)\\)", 
            "ᚺᛗ⌖($3,$4)");
        result = result.replaceAll("CREATE\\(([^,]+),\\s*([^,]+)(?:,\\s*@(\\d+),(\\d+))?\\)", 
            "ᚲᛞ($2)" + (result.contains("@") ? "⌖($3,$4)" : ""));
        result = result.replaceAll("USE\\(([^,]+),\\s*([^,]+)(?:,\\s*([^)]+))?\\)", 
            "ᚢᛃ($2)" + (result.contains("HERO:") ? "ᚺ($3)" : ""));
        result = result.replaceAll("CAST\\(SPELL,\\s*([^,]+),\\s*TARGET:([^,]+),\\s*HERO:([^)]+)\\)", 
            "ᛊᛏ($1)ᚦ($2)ᚺ($3)");
        result = result.replaceAll("BATTLE\\(([^,]+),\\s*([^)]+)\\)", 
            "ᛒ($1)vs($2)");
        result = result.replaceAll("ABILITY\\(([^,]+),\\s*([^)]+)\\)", 
            "ᚨ($1)ᚫ($2)");
        result = result.replaceAll("ACTIVATE\\(([^)]+)\\)", 
            "ᚫ($1)");
        result = result.replaceAll("PHASE_SHIFT\\(([^,]+),\\s*([^)]+)\\)", 
            "ᛟ($1)⏣($2)");

        return result;
    }

    private String translateQuantumStatesRunes(String script) {
        String result = script;
        
        result = result.replaceAll("ψ(\\d+):\\s*⊙\\((.*)\\)", 
            "☥$1:⟡($2)");
        result = result.replaceAll("†ψ(\\d+)", 
            "𐍈☥$1");
        result = result.replaceAll("Π\\(([^)]+)\\)\\s*⇒\\s*†ψ(\\d+)", 
            "☉($1)⇒𐍈☥$2");
        result = result.replaceAll("Δt\\+(\\d+)", 
            "⏣+$1");

        return result;
    }

    private String translateArtifactFormulasRunes(String script) {
        String result = script;
        
        result = result.replaceAll("CONSTRUCTIVE\\(([^)]+)\\)", 
            "⊕($1)");
        result = result.replaceAll("DESTRUCTIVE\\(([^)]+)\\)", 
            "⊖($1)");
        result = result.replaceAll("AMPLIFY\\(([^,]+),\\s*([^)]+)\\)", 
            "⚛($1)×$2");
        result = result.replaceAll("MODIFY_ENERGY\\(([^,]+),\\s*([^)]+)\\)", 
            "⚛$2");

        return result;
    }

    // ===== MÉTHODES UTILITAIRES =====

    public List<String> getAvailableModes() {
        return Arrays.asList("literary", "icons", "runes", "all");
    }

    public Map<String, String> getTranslationExamples() {
        Map<String, String> examples = new HashMap<>();
        examples.put("HERO(Arthur)", "the valiant hero Arthur | 🧍(Arthur) | ᚺ(Arthur)");
        examples.put("MOV(HERO, Arthur, @10,10)", 
            "the hero Arthur extends his hand into the void, projecting a mirrored echo to the coordinates (10, 10) | 🧍➡️🗺️(10,10) | ᚺᛗ⌖(10,10)");
        examples.put("ψ001: ⊙(Δt+1 @10,10 ⟶ MOV(HERO, Arthur, @10,10))", 
            "quantum essence 001 manifests through temporal projection: temporal displacement of 1 cycles @10,10 ⟶ the hero Arthur extends his hand into the void, projecting a mirrored echo to the coordinates (10, 10) | 🧠001:⏳(⏰+1 @10,10 ⟶ 🧍➡️🗺️(10,10)) | ☥001:⟡(⏣+1 @10,10 ⟶ ᚺᛗ⌖(10,10))");
        examples.put("CREATE(CREATURE, quantum_phoenix, @15,15)", 
            "summons from the depths of possibility a CREATURE named quantum_phoenix at the mystical coordinates (15, 15) | ✨🐉(quantum_phoenix)🗺️(15,15) | ᚲᛞ(quantum_phoenix)⌖(15,15)");
        examples.put("BATTLE(quantum_phoenix, quantum_lich)", 
            "engages in quantum combat with the quantum_phoenix against the quantum_lich | ⚔️(quantum_phoenix)vs(quantum_lich) | ᛒ(quantum_phoenix)vs(quantum_lich)");
        examples.put("ABILITY(quantum_phoenix, quantum_rebirth)", 
            "unleashes the mystical power of quantum_rebirth through the quantum essence of quantum_phoenix | 🔮(quantum_phoenix)✨(quantum_rebirth) | ᚨ(quantum_phoenix)ᚫ(quantum_rebirth)");
        
        return examples;
    }
} 