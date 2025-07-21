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
    
    // Descriptions uniques pour chaque héros
    private static final Map<String, String> HERO_UNIQUE_DESCRIPTIONS = new HashMap<>();

    static {
        // === DESCRIPTIONS UNIQUES POUR CHAQUE HÉROS ===
        HERO_UNIQUE_DESCRIPTIONS.put("Arthur", "Arthur surgit dans un éclat de lumière dorée, l'épée au poing");
        HERO_UNIQUE_DESCRIPTIONS.put("Ragnar", "Ragnar apparaît dans un grondement de tonnerre, marteau levé");
        HERO_UNIQUE_DESCRIPTIONS.put("Merlin", "Merlin se matérialise dans un tourbillon d'étoiles scintillantes");
        HERO_UNIQUE_DESCRIPTIONS.put("Morgana", "Morgana émerge des ombres mystérieuses, aura sombre");
        HERO_UNIQUE_DESCRIPTIONS.put("JeanGrofignon", "Jean-Grofignon se révèle dans une aura philosophique");
        HERO_UNIQUE_DESCRIPTIONS.put("Claudius", "Claudius apparaît dans une spirale temporelle majestueuse");
        HERO_UNIQUE_DESCRIPTIONS.put("Axis", "Axis traverse les dimensions dans un flash argenté");
        HERO_UNIQUE_DESCRIPTIONS.put("Chlamydius", "Chlamydius émerge des chroniques oubliées");
        HERO_UNIQUE_DESCRIPTIONS.put("Omega-Zero", "Omega-Zéro se manifeste dans un silence cosmique");
        HERO_UNIQUE_DESCRIPTIONS.put("Guinevere", "Guenièvre apparaît dans une lueur de grâce royale");
        HERO_UNIQUE_DESCRIPTIONS.put("Loki", "Loki surgit dans un rire malicieux et des flammes vertes");

        // === MAPPING ID -> DESCRIPTIONS LITTÉRAIRES AMÉLIORÉES ===
        ID_TO_DESCRIPTION.put("grofi_omega", "l'Oméga de Grofi, catalyseur de destinées");
        ID_TO_DESCRIPTION.put("custom_mirror", "le Miroir des Possibles");
        ID_TO_DESCRIPTION.put("avant_world_blade", "la Lame de l'Avant-Monde");
        ID_TO_DESCRIPTION.put("reverse_clock", "l'Horloge du Dernier Instant");
        ID_TO_DESCRIPTION.put("ignorance_beacon", "la Balise d'Ignorance Temporelle");
        ID_TO_DESCRIPTION.put("anchor_tower", "la Tour de l'Ancrage");
        ID_TO_DESCRIPTION.put("temporal_echo", "l'Écho Temporel");
        ID_TO_DESCRIPTION.put("wigner_eye", "l'Œil de Wigner, perceur de voiles temporels");
        ID_TO_DESCRIPTION.put("chronos_shield", "le Bouclier de Chronos");
        ID_TO_DESCRIPTION.put("quantum_mirror", "le Miroir des Réalités Parallèles");
        ID_TO_DESCRIPTION.put("temporal_compass", "la Boussole Temporelle");
        ID_TO_DESCRIPTION.put("causal_disruptor", "le Perturbateur Causal");
        
        // Artefacts du Codex Final
        ID_TO_DESCRIPTION.put("parchemin_sale", "le Parchemin Sale, manuscrit des vérités interdites");
        ID_TO_DESCRIPTION.put("encre_vivante", "l'Encre Vivante, fluide des réalités oubliées");
        ID_TO_DESCRIPTION.put("livre_vide_sans_nom", "le Livre Vide Sans Nom, grimoire de l'inexistence");
        ID_TO_DESCRIPTION.put("Excalibur", "Excalibur, l'épée de légende");
        ID_TO_DESCRIPTION.put("Mjolnir", "Mjolnir, marteau du tonnerre");
        ID_TO_DESCRIPTION.put("StaffOfWisdom", "le Bâton de Sagesse");
        
        // Créatures avec descriptions fantastiques (plus de "quantum")
        ID_TO_DESCRIPTION.put("quantum_phoenix", "le Phénix de Renaissance");
        ID_TO_DESCRIPTION.put("quantum_wisp", "la Lueur Éthérée");
        ID_TO_DESCRIPTION.put("probability_spider", "l'Araignée Tisseuse de Sorts");
        ID_TO_DESCRIPTION.put("quantum_knight", "le Chevalier Spectral");
        ID_TO_DESCRIPTION.put("quantum_cat", "le Chat Changeur de Phase");
        ID_TO_DESCRIPTION.put("quantum_lich", "la Liche des Âges Oubliés");
        ID_TO_DESCRIPTION.put("quantum_beetle", "le Scarabée Amplificateur");
        ID_TO_DESCRIPTION.put("probability_archon", "l'Archonte des Destinées");
        ID_TO_DESCRIPTION.put("Dragon", "le Dragon Rouge, gardien des trésors");
        ID_TO_DESCRIPTION.put("Phoenix", "le Phénix Éternel");
        
        // Héros avec descriptions littéraires
        ID_TO_DESCRIPTION.put("JeanGrofignon", "Jean-Grofignon, l'Éveillé Ontologique");
        ID_TO_DESCRIPTION.put("Claudius", "Claudius, l'Architecte du Multivers");
        ID_TO_DESCRIPTION.put("Arthur", "Arthur, le Roi Temporel");
        ID_TO_DESCRIPTION.put("Ragnar", "Ragnar, le Berserker des Légendes");
        ID_TO_DESCRIPTION.put("Merlin", "Merlin, le Sage des Temps");
        ID_TO_DESCRIPTION.put("Morgana", "Morgana, la Tisseuse du Destin");
        ID_TO_DESCRIPTION.put("Axis", "Axis, le Voyageur Linéaire");
        ID_TO_DESCRIPTION.put("Chlamydius", "Chlamydius, le Scribe Non Né");
        ID_TO_DESCRIPTION.put("Omega-Zero", "Omega-Zéro, l'Entité Ultime");

        // === TRADUCTIONS LITTÉRAIRES AMÉLIORÉES (PLUS DE QUANTUM) ===
        LITERARY_TRANSLATIONS.put("HERO", "le héros légendaire");
        LITERARY_TRANSLATIONS.put("MOV", "s'élance vers sa destinée");
        LITERARY_TRANSLATIONS.put("CREATE", "invoque par un rituel ancien");
        LITERARY_TRANSLATIONS.put("USE", "active avec maîtrise");
        LITERARY_TRANSLATIONS.put("CAST", "libère un sortilège puissant");
        LITERARY_TRANSLATIONS.put("ψ", "un sort en préparation");
        LITERARY_TRANSLATIONS.put("⊙", "vision prophétique");
        LITERARY_TRANSLATIONS.put("†", "se réalise soudainement");
        LITERARY_TRANSLATIONS.put("Π", "l'observation révélatrice");
        LITERARY_TRANSLATIONS.put("Δt", "voyage dans le temps");
        LITERARY_TRANSLATIONS.put("CONSTRUCTIVE", "synergie magique");
        LITERARY_TRANSLATIONS.put("DESTRUCTIVE", "annulation mystique");
        LITERARY_TRANSLATIONS.put("NEUTRAL", "équilibre des forces");
        LITERARY_TRANSLATIONS.put("COMPLEX", "magie complexe");
        LITERARY_TRANSLATIONS.put("CREATURE", "créature légendaire");
        LITERARY_TRANSLATIONS.put("ITEM", "artéfact de pouvoir");
        LITERARY_TRANSLATIONS.put("SPELL", "incantation arcanique");
        LITERARY_TRANSLATIONS.put("TARGET", "adversaire choisi");
        LITERARY_TRANSLATIONS.put("UNIT", "compagnon loyal");
        LITERARY_TRANSLATIONS.put("BATTLE", "livre une bataille épique contre");
        LITERARY_TRANSLATIONS.put("ABILITY", "déchaîne le pouvoir mystique de");
        LITERARY_TRANSLATIONS.put("ACTIVATE", "éveille l'essence de");
        LITERARY_TRANSLATIONS.put("PHASE_SHIFT", "traverse les dimensions");

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

    // ===== TRADUCTION LITTÉRAIRE AMÉLIORÉE =====

    private String translateToLiterary(String script) {
        if (script == null || script.trim().isEmpty()) {
            return "Dans le silence de l'éternité, rien ne se manifeste.";
        }

        String translated = script;

        // Traduire les commandes de base avec descriptions uniques
        translated = translateBasicCommands(translated, LITERARY_TRANSLATIONS);
        
        // Remplacer les IDs par des descriptions littéraires
        translated = replaceIdsWithDescriptions(translated);
        
        // Traduire les formules d'artefacts
        translated = translateArtifactFormulas(translated);
        
        // Traduire les états temporels (plus de "quantum")
        translated = translateTemporalStates(translated);
        
        // Améliorer le style littéraire sans répétitions
        translated = addVariedLiteraryStyle(translated);

        return translated;
    }

    private String translateBasicCommands(String script, Map<String, String> translations) {
        String result = script;
        
        // Commandes HERO avec descriptions uniques
        for (Map.Entry<String, String> entry : HERO_UNIQUE_DESCRIPTIONS.entrySet()) {
            String heroName = entry.getKey();
            String description = entry.getValue();
            result = result.replaceAll("HERO\\(" + heroName + "\\)", description);
        }
        
        // Commandes HERO génériques pour les héros non mappés
        result = result.replaceAll("HERO\\(([^)]+)\\)", "le héros légendaire $1 entre en scène");

        // Commandes MOV avec style épique
        result = result.replaceAll("MOV\\(([^,]+),\\s*@(\\d+),(\\d+)\\)", 
            "$1 s'élance vers sa destinée aux coordonnées mystiques ($2, $3)");

        // Commandes USE avec descriptions spécifiques
        result = result.replaceAll("USE\\(([^,]+),\\s*([^,]+)(?:,\\s*HERO:([^)]+))?\\)", 
            "active avec maîtrise $2" + (result.contains("HERO:") ? " par l'intermédiaire de $3" : ""));
        
        // Commandes BATTLE épiques
        result = result.replaceAll("BATTLE\\(([^,]+),\\s*([^)]+)\\)", 
            "$1 livre une bataille épique contre $2 dans un duel de légende");
        
        // Commandes ABILITY mystiques
        result = result.replaceAll("ABILITY\\(([^,]+),\\s*([^)]+)\\)", 
            "$1 déchaîne le pouvoir mystique de $2");

        return result;
    }

    private String translateTemporalStates(String script) {
        String result = script;
        
        // États temporels - Version fantaisiste (sans "quantum")
        result = result.replaceAll("ψ(\\d+):\\s*⊙\\((.*)\\)", 
            "Un sort en préparation se tisse dans les fils du destin : $2");
        result = result.replaceAll("†ψ(\\d+)", 
            "Le sort se réalise soudainement, la magie se cristallise dans la réalité");
        result = result.replaceAll("Π\\(([^)]+)\\)\\s*⇒\\s*†ψ(\\d+)", 
            "L'observation révélatrice de $1 déclenche la réalisation du sort");
        result = result.replaceAll("Δt\\+(\\d+)", 
            "dans $1 tours, quand les astres s'aligneront");
        
        // Nettoyer les coordonnées dans les états temporels
        result = result.replaceAll("@(\\d+),(\\d+)", "aux coordonnées mystiques ($1, $2)");

        return result;
    }

    private String translateArtifactFormulas(String script) {
        String result = script;
        
        // Formules d'artefacts - Version magique
        result = result.replaceAll("CONSTRUCTIVE\\(([^)]+)\\)", 
            "Une synergie magique entre $1 crée une harmonie parfaite des pouvoirs");
        result = result.replaceAll("DESTRUCTIVE\\(([^)]+)\\)", 
            "Une annulation mystique déchire $1, les forces s'opposent dans un chaos contrôlé");
        result = result.replaceAll("AMPLIFY\\(([^,]+),\\s*([^)]+)\\)", 
            "Le pouvoir de $1 est décuplé par un facteur de $2, créant une résonance magique");
        result = result.replaceAll("MODIFY_ENERGY\\(([^,]+),\\s*([^)]+)\\)", 
            "L'essence magique du héros est modifiée de $2 unités par la volonté du destin");

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
                "active avec maîtrise " + description + (result.contains("HERO:") ? " par l'intermédiaire de $1" : ""));
            
            // Remplacer dans les commandes CREATE
            result = result.replaceAll("CREATE\\([^,]+,\\s*" + id + "(?:,\\s*@([^)]+))?\\)", 
                "invoque par un rituel ancien " + description + (result.contains("@") ? " aux coordonnées mystiques ($1)" : ""));
            
            // Remplacer les références directes
            result = result.replaceAll("\\b" + id + "\\b", description);
        }
        
        // Nettoyer les duplications
        result = result.replaceAll("invoque par un rituel ancien par un rituel ancien", 
            "invoque par un rituel ancien");
        
        return result;
    }

    private String addVariedLiteraryStyle(String script) {
        String result = script;
        
        // Éliminer les répétitions "valiant valiant"
        result = result.replaceAll("valiant valiant", "légendaire");
        
        // Remplacer les termes techniques restants
        result = result.replaceAll("quantum essence", "sort en préparation");
        result = result.replaceAll("temporal projection", "vision prophétique");
        result = result.replaceAll("quantum uncertainty", "magie du possible");
        result = result.replaceAll("ethereal form dancing between threads of reality", "incantation qui se tisse dans les fils du destin");
        result = result.replaceAll("depths of forgotten memories", "brumes du temps");
        result = result.replaceAll("quantum combat", "bataille épique");
        result = result.replaceAll("probability amplified", "pouvoir décuplé");
        
        // Améliorer les coordonnées
        result = result.replaceAll("@(\\d+),(\\d+)", "aux coordonnées mystiques ($1, $2)");
        
        // Nettoyer les phrases trop longues
        result = result.replaceAll("\\s+", " ");
        result = result.trim();
        
        return result;
    }

    // ===== TRADUCTION ICÔNES/EMOJIS =====

    private String translateToIcons(String script) {
        if (script == null || script.trim().isEmpty()) {
            return "🔮✨";
        }

        String translated = script;

        // Traduire les commandes de base
        translated = translateBasicCommandsIcons(translated);
        
        // Traduire les états temporels
        translated = translateTemporalStatesIcons(translated);
        
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

    private String translateTemporalStatesIcons(String script) {
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
        
        // Traduire les états temporels
        translated = translateTemporalStatesRunes(translated);
        
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

    private String translateTemporalStatesRunes(String script) {
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
        examples.put("HERO(Arthur)", "Arthur surgit dans un éclat de lumière dorée, l'épée au poing | 🧍(Arthur) | ᚺ(Arthur)");
        examples.put("MOV(Arthur, @10,10)", 
            "Arthur s'élance vers sa destinée aux coordonnées mystiques (10, 10) | 🧍➡️🗺️(10,10) | ᚺᛗ⌖(10,10)");
        examples.put("ψ001: ⊙(Δt+1 @10,10 ⟶ MOV(Arthur, @10,10))", 
            "Un sort en préparation se tisse dans les fils du destin : dans 1 tours aux coordonnées mystiques (10, 10) ⟶ Arthur s'élance vers sa destinée | 🧠001:⏳(⏰+1 @10,10 ⟶ 🧍➡️🗺️(10,10)) | ☥001:⟡(⏣+1 @10,10 ⟶ ᚺᛗ⌖(10,10))");
        examples.put("CREATE(CREATURE, quantum_phoenix, @15,15)", 
            "invoque par un rituel ancien le Phénix de Renaissance aux coordonnées mystiques (15, 15) | ✨🐉(quantum_phoenix)🗺️(15,15) | ᚲᛞ(quantum_phoenix)⌖(15,15)");
        examples.put("BATTLE(Arthur, Ragnar)", 
            "Arthur livre une bataille épique contre Ragnar dans un duel de légende | ⚔️(Arthur)vs(Ragnar) | ᛒ(Arthur)vs(Ragnar)");
        examples.put("USE(ARTIFACT, grofi_omega, HERO:JeanGrofignon)", 
            "active avec maîtrise l'Oméga de Grofi, catalyseur de destinées par l'intermédiaire de Jean-Grofignon | 🧙‍♂️💎(grofi_omega)🧍(JeanGrofignon) | ᚢᛃ(grofi_omega)ᚺ(JeanGrofignon)");
        
        return examples;
    }
} 