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
    
    // Mapping des IDs vers descriptions littéraires
    private static final Map<String, String> ID_TO_DESCRIPTION = new HashMap<>();

    static {
        // === MAPPING ID -> DESCRIPTIONS LITTÉRAIRES ===
        ID_TO_DESCRIPTION.put("grofi_omega", "l'Artéfact Ultime de Jean-Grofignon");
        ID_TO_DESCRIPTION.put("custom_mirror", "le Miroir des Possibilités");
        ID_TO_DESCRIPTION.put("avant_world_blade", "la Lame de l'Avant-Monde");
        ID_TO_DESCRIPTION.put("reverse_clock", "l'Horloge du Dernier Instant");
        ID_TO_DESCRIPTION.put("ignorance_beacon", "la Balise d'Ignorance Temporelle");
        ID_TO_DESCRIPTION.put("anchor_tower", "la Tour de l'Ancrage");
        ID_TO_DESCRIPTION.put("temporal_echo", "l'Écho Temporel");
        ID_TO_DESCRIPTION.put("wigner_eye", "l'Œil de Wigner");
        ID_TO_DESCRIPTION.put("chronos_shield", "le Bouclier de Chronos");
        ID_TO_DESCRIPTION.put("quantum_mirror", "le Miroir Quantique");
        ID_TO_DESCRIPTION.put("temporal_compass", "la Boussole Temporelle");
        ID_TO_DESCRIPTION.put("causal_disruptor", "le Perturbateur Causal");
        
        // Artefacts du Codex Final
        ID_TO_DESCRIPTION.put("parchemin_sale", "le Parchemin Sale, manuscrit des vérités interdites");
        ID_TO_DESCRIPTION.put("encre_vivante", "l'Encre Vivante, fluide des réalités oubliées");
        ID_TO_DESCRIPTION.put("livre_vide_sans_nom", "le Livre Vide Sans Nom, grimoire de l'inexistence");
        ID_TO_DESCRIPTION.put("grofi_omega", "l'Oméga de Grofi, cet artefact ultime qui transcende les lois de la réalité");
        
        // Créatures avec descriptions littéraires
        ID_TO_DESCRIPTION.put("quantum_phoenix", "le phénix quantique légendaire");
        ID_TO_DESCRIPTION.put("quantum_wisp", "la lueur quantique éthérée");
        ID_TO_DESCRIPTION.put("probability_spider", "l'araignée tisseuse de probabilités");
        ID_TO_DESCRIPTION.put("quantum_knight", "le chevalier en armure quantique");
        ID_TO_DESCRIPTION.put("quantum_cat", "le chat quantique changeur de phase");
        ID_TO_DESCRIPTION.put("quantum_lich", "le liche quantique superposé à la mort");
        ID_TO_DESCRIPTION.put("quantum_beetle", "le scarabée amplificateur de résonance");
        ID_TO_DESCRIPTION.put("probability_archon", "l'archonte gouvernant les probabilités");
        
        // Héros avec descriptions littéraires
        ID_TO_DESCRIPTION.put("JeanGrofignon", "Jean-Grofignon, l'Éveillé Ontologique");
        ID_TO_DESCRIPTION.put("Claudius", "Claudius, l'Architecte du Multivers");
        ID_TO_DESCRIPTION.put("Arthur", "Arthur, le Roi Temporel");
        ID_TO_DESCRIPTION.put("Ragnar", "Ragnar, le Berserker Quantique");
        ID_TO_DESCRIPTION.put("Merlin", "Merlin, le Sage des Temps");
        ID_TO_DESCRIPTION.put("Morgana", "Morgana, la Tisseuse du Destin");
        ID_TO_DESCRIPTION.put("Axis", "Axis, le Voyageur Linéaire");
        ID_TO_DESCRIPTION.put("Chlamydius", "Chlamydius, le Scribe Non Né");
        ID_TO_DESCRIPTION.put("Omega-Zero", "Omega-Zéro, l'Entité Ultime");
        ID_TO_DESCRIPTION.put("Omega-Zero", "Omega-Zéro, l'Entité Ultime"); // Avec tiret

        // === TRADUCTIONS LITTÉRAIRES ANGLAISES ===
        LITERARY_TRANSLATIONS.put("HERO", "le héros valeureux");
        LITERARY_TRANSLATIONS.put("MOV", "étend sa main dans le vide, projetant un écho miroir");
        LITERARY_TRANSLATIONS.put("CREATE", "invoque depuis les profondeurs de la possibilité");
        LITERARY_TRANSLATIONS.put("USE", "canalise l'ancien pouvoir de");
        LITERARY_TRANSLATIONS.put("CAST", "tisse les fils de la réalité, libérant");
        LITERARY_TRANSLATIONS.put("ψ", "l'essence quantique");
        LITERARY_TRANSLATIONS.put("⊙", "la projection temporelle");
        LITERARY_TRANSLATIONS.put("†", "l'effondrement de la probabilité");
        LITERARY_TRANSLATIONS.put("Π", "le regard de l'observateur");
        LITERARY_TRANSLATIONS.put("Δt", "le déplacement temporel");
        LITERARY_TRANSLATIONS.put("CONSTRUCTIVE", "l'interférence constructive");
        LITERARY_TRANSLATIONS.put("DESTRUCTIVE", "l'interférence destructive");
        LITERARY_TRANSLATIONS.put("NEUTRAL", "l'interférence neutre");
        LITERARY_TRANSLATIONS.put("COMPLEX", "l'interférence complexe");
        LITERARY_TRANSLATIONS.put("CREATURE", "l'entité d'un autre monde");
        LITERARY_TRANSLATIONS.put("ITEM", "l'artéfact de pouvoir");
        LITERARY_TRANSLATIONS.put("SPELL", "l'incantation arcanique");
        LITERARY_TRANSLATIONS.put("TARGET", "l'adversaire choisi");
        LITERARY_TRANSLATIONS.put("UNIT", "le compagnon loyal");
        LITERARY_TRANSLATIONS.put("BATTLE", "s'engage dans un combat quantique avec");
        LITERARY_TRANSLATIONS.put("ABILITY", "libère le pouvoir mystique de");
        LITERARY_TRANSLATIONS.put("ACTIVATE", "éveille l'essence quantique de");
        LITERARY_TRANSLATIONS.put("PHASE_SHIFT", "traverse les phases quantiques");


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
        RUNE_TRANSLATIONS.put("ITEM", "ᛏ");
        RUNE_TRANSLATIONS.put("SPELL", "ᛋ");
        RUNE_TRANSLATIONS.put("TARGET", "ᛟ");
        RUNE_TRANSLATIONS.put("UNIT", "ᚹ");
        RUNE_TRANSLATIONS.put("BATTLE", "ᛒ");
        RUNE_TRANSLATIONS.put("ABILITY", "ᚨ");
        RUNE_TRANSLATIONS.put("ACTIVATE", "ᚱ");
        RUNE_TRANSLATIONS.put("PHASE_SHIFT", "ᛇ");
        RUNE_TRANSLATIONS.put("quantum_wisp", "ᛜ");
        RUNE_TRANSLATIONS.put("probability_spider", "ᛝ");
        RUNE_TRANSLATIONS.put("quantum_knight", "ᛞ");
        RUNE_TRANSLATIONS.put("quantum_cat", "ᛟ");
        RUNE_TRANSLATIONS.put("quantum_lich", "ᛠ");
        RUNE_TRANSLATIONS.put("quantum_beetle", "ᛡ");
        RUNE_TRANSLATIONS.put("quantum_phoenix", "ᛢ");
        RUNE_TRANSLATIONS.put("probability_archon", "ᛣ");
    }

    // ===== MÉTHODES PRINCIPALES =====

    public Map<String, Object> translateScript(String script, String mode) {
        Map<String, Object> result = new HashMap<>();
        
        if (script == null || script.trim().isEmpty()) {
            result.put("original", "");
            result.put("translated", "");
            result.put("mode", mode);
            return result;
        }

        String translated = "";
        switch (mode.toLowerCase()) {
            case "literary":
                translated = translateToLiterary(script);
                break;
            case "icons":
                translated = translateToIcons(script);
                break;
            case "runes":
                translated = translateToRunes(script);
                break;
            default:
                translated = script;
        }

        result.put("original", script);
        result.put("translated", translated);
        result.put("mode", mode);
        
        return result;
    }

    // ===== TRADUCTION LITTÉRAIRE =====

    private String translateToLiterary(String script) {
        if (script == null || script.trim().isEmpty()) {
            return "Dans le silence de l'éternité, rien ne se manifeste.";
        }

        String translated = script;

        // Traduire les commandes de base
        translated = translateBasicCommands(translated, LITERARY_TRANSLATIONS);
        
        // Remplacer les IDs par des descriptions littéraires
        translated = replaceIdsWithDescriptions(translated);
        
        // Traduire les formules d'artefacts
        translated = translateArtifactFormulas(translated);
        
        // Traduire les états quantiques (en dernier pour traiter les commandes à l'intérieur)
        translated = translateQuantumStates(translated);
        
        // Améliorer le style littéraire
        translated = addLiteraryStyle(translated);

        return translated;
    }

    private String translateBasicCommands(String script, Map<String, String> translations) {
        String result = script;
        
        // Commandes de base avec style littéraire
        result = result.replaceAll("HERO\\(([^)]+)\\)", "le héros valeureux $1 émerge de l'éther");
                        result = result.replaceAll("MOV\\(([^,]+),\\s*@(\\d+),(\\d+)\\)", 
            "$1 étend sa main dans le vide, projetant un écho miroir vers les coordonnées mystiques ($2, $3)");

        result = result.replaceAll("USE\\(([^,]+),\\s*([^,]+)(?:,\\s*HERO:([^)]+))?\\)", 
            "canalise l'ancien pouvoir de $2" + (result.contains("HERO:") ? " par l'intermédiaire de $3" : ""));
        result = result.replaceAll("BATTLE\\(([^,]+),\\s*([^)]+)\\)", 
            "$1 s'engage dans un combat quantique avec $2");
        result = result.replaceAll("ABILITY\\(([^,]+),\\s*([^)]+)\\)", 
            "$1 libère le pouvoir mystique de $2");

        return result;
    }

    private String translateQuantumStates(String script) {
        String result = script;
        
        // États quantiques - Version plus poétique (sans numéros)
        result = result.replaceAll("ψ(\\d+):\\s*⊙\\((.*)\\)", 
            "l'essence quantique manifeste sa projection temporelle, sa forme éthérée dansant entre les fils de la réalité: $2");
        result = result.replaceAll("†ψ(\\d+)", 
            "l'effondrement de la probabilité brise l'essence quantique, alors que la réalité se solidifie depuis l'écume quantique des possibilités");
        result = result.replaceAll("Π\\(([^)]+)\\)\\s*⇒\\s*†ψ(\\d+)", 
            "le regard de l'observateur sur $1 déclenche l'effondrement de l'essence quantique, alors que la conscience façonne le tissu de l'existence");
        result = result.replaceAll("Δt\\+(\\d+)", 
            "le déplacement temporel de $1 cycles, alors que le temps lui-même se courbe sous la volonté de l'incertitude quantique");
        
        // Traduire les commandes MOV à l'intérieur des états quantiques
        result = result.replaceAll("MOV\\(([^,]+),\\s*@(\\d+),(\\d+)\\)", 
            "$1 étend sa main dans le vide, projetant un écho miroir vers les coordonnées mystiques ($2, $3)");
        
        // Traduire les commandes MOV avec héros déjà traduits
        result = result.replaceAll("MOV\\(([^,]+),\\s*le Roi Temporel,\\s*@(\\d+),(\\d+)\\)", 
            "$1 étend sa main dans le vide, projetant un écho miroir vers les coordonnées mystiques ($2, $3)");

        return result;
    }

    private String translateArtifactFormulas(String script) {
        String result = script;
        
        // Formules d'artefacts - Version plus mystique
        result = result.replaceAll("CONSTRUCTIVE\\(([^)]+)\\)", 
            "l'interférence constructive entre $1 crée une vague de probabilité amplifiée, où toutes les possibilités existent en parfaite harmonie");
        result = result.replaceAll("DESTRUCTIVE\\(([^)]+)\\)", 
            "l'interférence destructive annihilant $1, alors que les forces opposées déchirent le très tissu de la réalité");
        result = result.replaceAll("AMPLIFY\\(([^,]+),\\s*([^)]+)\\)", 
            "l'amplification de $1 par le facteur de $2, créant une résonance qui ébranle les très fondations de l'existence");
        result = result.replaceAll("MODIFY_ENERGY\\(([^,]+),\\s*([^)]+)\\)", 
            "la modification de l'essence du héros par $2 unités, alors que le champ quantique répond à l'appel du destin");

        return result;
    }

    private String replaceIdsWithDescriptions(String script) {
        String result = script;
        
        // Remplacer les IDs par leurs descriptions littéraires
        for (Map.Entry<String, String> entry : ID_TO_DESCRIPTION.entrySet()) {
            String id = entry.getKey();
            String description = entry.getValue();
            
            // Remplacer dans les commandes USE
            result = result.replaceAll("USE\\([^,]+,\\s*" + id + "(?:,\\s*HERO:([^)]+))?\\)", 
                "canalise l'ancien pouvoir de " + description + (result.contains("HERO:") ? " par l'intermédiaire de $1" : ""));
            
            // Remplacer dans les commandes CREATE
            result = result.replaceAll("CREATE\\([^,]+,\\s*" + id + "(?:,\\s*@([^)]+))?\\)", 
                "invoque depuis les profondeurs de la possibilité " + description + (result.contains("@") ? " aux coordonnées mystiques ($1)" : ""));
            
            // Remplacer les références directes restantes
            result = result.replaceAll("\\b" + id + "\\b", description);
        }
        
        // Nettoyer les duplications
        result = result.replaceAll("invoque depuis les profondeurs de la possibilité depuis les profondeurs de la possibilité", 
            "invoque depuis les profondeurs de la possibilité");
        
        // Remplacer les commandes CREATE non traitées (éviter les IDs déjà traités)
        for (String id : ID_TO_DESCRIPTION.keySet()) {
            result = result.replaceAll("CREATE\\(([^,]+),\\s*" + id + "(?:,\\s*@([^)]+))?\\)", 
                "invoque depuis les profondeurs de la possibilité " + ID_TO_DESCRIPTION.get(id) + (result.contains("@") ? " aux coordonnées mystiques ($2)" : ""));
        }
        
        return result;
    }

    private String addLiteraryStyle(String script) {
        // Ajouter des éléments littéraires
        String[] sentences = script.split("\\.");
        List<String> enhancedSentences = new ArrayList<>();
        
        for (String sentence : sentences) {
            if (sentence.trim().isEmpty()) continue;
            
            String enhanced = sentence.trim();
            
            // Améliorer les descriptions de héros
            if (enhanced.contains("HERO:")) {
                enhanced = enhanced.replaceAll("HERO:([^,\\s]+)", "le héros valeureux $1");
            }
            
            // Ajouter des adjectifs mystiques (éviter les duplications)
            if (enhanced.contains("héros") && !enhanced.contains("héros valeureux")) {
                enhanced = enhanced.replace("héros", "héros valeureux");
            }
            if (enhanced.contains("étend")) {
                enhanced = enhanced.replace("étend", "glisse à travers le tissu de la réalité");
            }
            if (enhanced.contains("invoque")) {
                enhanced = enhanced.replace("invoque", "invoque depuis les profondeurs de la possibilité");
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
        result = result.replaceAll("MOV\\(([^,]+),\\s*@(\\d+),(\\d+)\\)", 
            "🧍➡️🗺️($2,$3)");
        result = result.replaceAll("CREATE\\(([^,]+),\\s*([^)]+)(?:,\\s*@(\\d+),(\\d+))?\\)", 
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
        result = result.replaceAll("MOV\\(([^,]+),\\s*@(\\d+),(\\d+)\\)", 
            "ᚺᛗ⌖($2,$3)");
        result = result.replaceAll("CREATE\\(([^,]+),\\s*([^)]+)(?:,\\s*@(\\d+),(\\d+))?\\)", 
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
        examples.put("HERO(Arthur)", "le héros valeureux Arthur | 🧍(Arthur) | ᚺ(Arthur)");
        examples.put("MOV(HERO, Arthur, @10,10)", 
            "le héros Arthur étend sa main dans le vide, projetant un écho miroir vers les coordonnées mystiques (10, 10) | 🧍➡️🗺️(10,10) | ᚺᛗ⌖(10,10)");
        examples.put("ψ001: ⊙(Δt+1 @10,10 ⟶ MOV(HERO, Arthur, @10,10))", 
            "l'essence quantique 001 manifeste sa projection temporelle: le déplacement temporel de 1 cycles @10,10 ⟶ le héros Arthur étend sa main dans le vide, projetant un écho miroir vers les coordonnées mystiques (10, 10) | 🧠001:⏳(⏰+1 @10,10 ⟶ 🧍➡️🗺️(10,10)) | ☥001:⟡(⏣+1 @10,10 ⟶ ᚺᛗ⌖(10,10))");
        examples.put("CREATE(CREATURE, quantum_phoenix, @15,15)", 
            "invoque depuis les profondeurs de la possibilité un CREATURE nommé quantum_phoenix aux coordonnées mystiques (15, 15) | ✨🐉(quantum_phoenix)🗺️(15,15) | ᚲᛞ(quantum_phoenix)⌖(15,15)");
        examples.put("BATTLE(quantum_phoenix, quantum_lich)", 
            "s'engage dans un combat quantique avec le quantum_phoenix contre le quantum_lich | ⚔️(quantum_phoenix)vs(quantum_lich) | ᛒ(quantum_phoenix)vs(quantum_lich)");
        examples.put("ABILITY(quantum_phoenix, quantum_rebirth)", 
            "libère le pouvoir mystique de quantum_rebirth par l'essence quantique de quantum_phoenix | 🔮(quantum_phoenix)✨(quantum_rebirth) | ᚨ(quantum_phoenix)ᚫ(quantum_rebirth)");
        
        return examples;
    }
} 