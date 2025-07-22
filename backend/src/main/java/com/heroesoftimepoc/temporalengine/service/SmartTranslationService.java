package com.heroesoftimepoc.temporalengine.service;

import org.springframework.stereotype.Service;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.JsonNode;
import java.util.*;
import java.util.regex.Pattern;
import java.util.regex.Matcher;
import java.io.InputStream;
import java.io.IOException;

@Service
public class SmartTranslationService {

    private final ObjectMapper objectMapper = new ObjectMapper();
    private final Map<String, JsonNode> heroData = new HashMap<>();
    private final Map<String, List<String>> heroVariations = new HashMap<>();
    private final Random random = new Random();

    public SmartTranslationService() {
        loadHeroData();
        generateHeroVariations();
    }

    private void loadHeroData() {
        // Charger les données des héros depuis les fichiers JSON
        String[] heroFiles = {
            "/heroes/legendary/Arthur.json",
            "/heroes/legendary/Ragnar.json", 
            "/heroes/memento.json"
        };

        for (String file : heroFiles) {
            try {
                InputStream is = getClass().getResourceAsStream(file);
                if (is != null) {
                    JsonNode hero = objectMapper.readTree(is);
                    String name = hero.has("name") ? hero.get("name").asText() : 
                                 file.substring(file.lastIndexOf("/") + 1, file.lastIndexOf("."));
                    heroData.put(name, hero);
                }
            } catch (IOException e) {
                System.err.println("Erreur lors du chargement de " + file + ": " + e.getMessage());
            }
        }
    }

    private void generateHeroVariations() {
        // Arthur - Variations basées sur ses données
        heroVariations.put("Arthur", Arrays.asList(
            "Arthur surgit dans un éclat de lumière dorée, Excalibur scintillant",
            "Le Roi Temporel Arthur apparaît dans une aura de leadership royal",
            "Arthur émerge des brumes du temps, sa couronne brillant de pouvoir",
            "Le maître des flux temporels Arthur se matérialise avec majesté",
            "Arthur, protecteur des timelines, arrive dans un tonnerre de gloire"
        ));

        // Ragnar - Variations basées sur ses données
        heroVariations.put("Ragnar", Arrays.asList(
            "Ragnar déferle dans un grondement de tonnerre, Mjolnir étincelant",
            "Le Chef de Guerre Temporel surgit dans une tempête de foudre",
            "Ragnar bondit des brumes nordiques, sa rage berserker palpable",
            "Le conquérant des timelines apparaît dans un fracas de bataille",
            "Ragnar émerge des tempêtes temporelles, soif de conquête au cœur"
        ));

        // Memento - Variations basées sur ses données
        heroVariations.put("Memento", Arrays.asList(
            "Memento se révèle depuis les archives éternelles, codex en main",
            "La Mémoire Vivante émerge des chroniques du multivers",
            "Memento apparaît dans un tourbillon de souvenirs cristallisés",
            "Le Scribe Temporel se matérialise, stylus de réalité scintillant",
            "Memento surgit des profondeurs de la mémoire collective"
        ));

        // Variations génériques pour héros inconnus
        heroVariations.put("DEFAULT", Arrays.asList(
            "Le héros légendaire {name} entre en scène avec détermination",
            "{name} apparaît dans un flash de pouvoir mystique",
            "Le vaillant {name} surgit prêt pour l'aventure",
            "{name} se révèle dans une aura de bravoure",
            "L'intrépide {name} émerge des brumes du destin"
        ));
    }

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
            case "smart":
            case "literary":
                translated = translateToSmartLiterary(script);
                break;
            case "contextual":
                translated = translateWithContext(script);
                break;
            case "varied":
                translated = translateWithVariations(script);
                break;
            default:
                translated = script;
        }

        result.put("original", script);
        result.put("translated", translated);
        result.put("mode", mode);
        result.put("hero_data_used", getUsedHeroData(script));
        
        return result;
    }

    private String translateToSmartLiterary(String script) {
        String result = script;
        
        // Traduire les héros avec variations
        result = translateHeroesWithVariations(result);
        
        // Traduire les mouvements contextuels
        result = translateContextualMovements(result);
        
        // Traduire les capacités basées sur les données
        result = translateAbilitiesWithData(result);
        
        // Traduire les états temporels avec style
        result = translateTemporalStates(result);
        
        // Traduire les artefacts avec leurs vraies descriptions
        result = translateArtifactsWithData(result);
        
        return cleanupTranslation(result);
    }

    private String translateHeroesWithVariations(String script) {
        String result = script;
        
        // Pattern pour HERO(nom)
        Pattern heroPattern = Pattern.compile("HERO\\(([^)]+)\\)");
        Matcher matcher = heroPattern.matcher(result);
        
        StringBuffer sb = new StringBuffer();
        while (matcher.find()) {
            String heroName = matcher.group(1);
            String variation = getRandomHeroVariation(heroName);
            matcher.appendReplacement(sb, variation);
        }
        matcher.appendTail(sb);
        
        return sb.toString();
    }

    private String getRandomHeroVariation(String heroName) {
        List<String> variations = heroVariations.get(heroName);
        if (variations == null) {
            variations = heroVariations.get("DEFAULT");
            // Remplacer {name} par le vrai nom
            String variation = variations.get(random.nextInt(variations.size()));
            return variation.replace("{name}", heroName);
        }
        return variations.get(random.nextInt(variations.size()));
    }

    private String translateContextualMovements(String script) {
        String result = script;
        
        // MOV avec contexte basé sur le héros
        Pattern movPattern = Pattern.compile("MOV\\(([^,]+),\\s*@(\\d+),(\\d+)\\)");
        Matcher matcher = movPattern.matcher(result);
        
        StringBuffer sb = new StringBuffer();
        while (matcher.find()) {
            String heroName = matcher.group(1);
            String x = matcher.group(2);
            String y = matcher.group(3);
            
            String movement = getContextualMovement(heroName, x, y);
            matcher.appendReplacement(sb, movement);
        }
        matcher.appendTail(sb);
        
        return sb.toString();
    }

    private String getContextualMovement(String heroName, String x, String y) {
        JsonNode hero = heroData.get(heroName);
        
        if (hero != null) {
            String heroClass = hero.has("class") ? hero.get("class").asText() : "";
            int speed = hero.has("stats") && hero.get("stats").has("speed") ? 
                       hero.get("stats").get("speed").asInt() : 5;
            
            if (heroClass.contains("KING") || heroName.equals("Arthur")) {
                return heroName + " avance avec la majesté royale vers les coordonnées (" + x + ", " + y + ")";
            } else if (heroClass.contains("WARRIOR") || heroName.equals("Ragnar")) {
                return heroName + " charge avec fougue guerrière vers (" + x + ", " + y + ")";
            } else if (heroClass.contains("Scribe") || heroName.equals("Memento")) {
                return heroName + " glisse silencieusement à travers les dimensions vers (" + x + ", " + y + ")";
            } else if (speed >= 7) {
                return heroName + " bondit avec agilité vers les coordonnées (" + x + ", " + y + ")";
            } else if (speed <= 4) {
                return heroName + " progresse avec détermination vers (" + x + ", " + y + ")";
            }
        }
        
        return heroName + " s'élance vers sa destinée aux coordonnées (" + x + ", " + y + ")";
    }

    private String translateAbilitiesWithData(String script) {
        String result = script;
        
        // ABILITY(hero, ability)
        Pattern abilityPattern = Pattern.compile("ABILITY\\(([^,]+),\\s*([^)]+)\\)");
        Matcher matcher = abilityPattern.matcher(result);
        
        StringBuffer sb = new StringBuffer();
        while (matcher.find()) {
            String heroName = matcher.group(1);
            String abilityName = matcher.group(2);
            
            String abilityDesc = getAbilityDescription(heroName, abilityName);
            matcher.appendReplacement(sb, abilityDesc);
        }
        matcher.appendTail(sb);
        
        return sb.toString();
    }

    private String getAbilityDescription(String heroName, String abilityName) {
        JsonNode hero = heroData.get(heroName);
        
        if (hero != null && hero.has("abilities")) {
            JsonNode abilities = hero.get("abilities");
            if (abilities.has(abilityName)) {
                JsonNode ability = abilities.get(abilityName);
                String name = ability.has("name") ? ability.get("name").asText() : abilityName;
                String desc = ability.has("description") ? ability.get("description").asText() : "";
                return heroName + " déchaîne " + name + " : " + desc;
            }
        }
        
        return heroName + " active son pouvoir mystique de " + abilityName;
    }

    private String translateTemporalStates(String script) {
        String result = script;
        
        // États ψ avec plus de variété
        String[] psiVariations = {
            "Un sort de destinée se tisse dans les fils du temps",
            "Une prophétie s'écrit dans les brumes du futur",
            "Un enchantement prend forme dans les méandres temporels",
            "Une vision se cristallise dans l'éther mystique",
            "Un rituel s'amorce dans les courants du destin"
        };
        
        Pattern psiPattern = Pattern.compile("ψ(\\d+):\\s*⊙\\((.*)\\)");
        Matcher matcher = psiPattern.matcher(result);
        
        StringBuffer sb = new StringBuffer();
        while (matcher.find()) {
            String content = matcher.group(2);
            String variation = psiVariations[random.nextInt(psiVariations.length)];
            matcher.appendReplacement(sb, variation + " : " + content);
        }
        matcher.appendTail(sb);
        
        // Collapse avec variations
        result = sb.toString();
        result = result.replaceAll("†ψ(\\d+)", 
            getRandomFromArray(new String[]{
                "Le sort se réalise dans un éclat de magie pure",
                "La prophétie s'accomplit dans un tonnerre mystique", 
                "L'enchantement se matérialise en réalité tangible",
                "La vision devient réalité dans un flash aveuglant",
                "Le rituel atteint son apogée magique"
            }));
        
        return result;
    }

    private String translateArtifactsWithData(String script) {
        String result = script;
        
        // USE avec artefacts contextuels
        Map<String, String> artifactDescriptions = new HashMap<>();
        artifactDescriptions.put("excalibur", "dégaine Excalibur, l'épée légendaire qui fend les timelines");
        artifactDescriptions.put("mjolnir", "brandit Mjolnir, marteau du tonnerre qui frappe à travers les réalités");
        artifactDescriptions.put("avant_world_blade", "active la Lame d'Avant-Monde, écrivant l'avenir du combat");
        artifactDescriptions.put("reverse_clock", "manipule l'Horloge du Dernier Instant, inversant le cours du temps");
        artifactDescriptions.put("codex_memento", "consulte le Codex de Memento, livre de toutes les mémoires");
        
        Pattern usePattern = Pattern.compile("USE\\(([^,]+),\\s*([^,]+)(?:,\\s*HERO:([^)]+))?\\)");
        Matcher matcher = usePattern.matcher(result);
        
        StringBuffer sb = new StringBuffer();
        while (matcher.find()) {
            String itemType = matcher.group(1);
            String itemName = matcher.group(2);
            String heroName = matcher.group(3);
            
            String description = artifactDescriptions.getOrDefault(itemName.toLowerCase(), 
                "active " + itemName + " avec maîtrise");
            
            String fullDesc = (heroName != null) ? 
                heroName + " " + description :
                description;
                
            matcher.appendReplacement(sb, fullDesc);
        }
        matcher.appendTail(sb);
        
        return sb.toString();
    }

    private String translateWithContext(String script) {
        // Mode contextuel : analyse le script complet pour adapter les traductions
        String result = translateToSmartLiterary(script);
        
        // Ajouter du contexte narratif
        if (script.contains("BATTLE")) {
            result = "=== COMBAT ÉPIQUE ===\n" + result;
        }
        if (script.contains("ψ")) {
            result = "=== MAGIE TEMPORELLE ===\n" + result;
        }
        
        return result;
    }

    private String translateWithVariations(String script) {
        // Mode varié : maximum de diversité
        String result = translateToSmartLiterary(script);
        
        // Ajouter des variations supplémentaires
        result = addNarrativeVariations(result);
        
        return result;
    }

    private String addNarrativeVariations(String script) {
        String result = script;
        
        // Remplacer les termes répétitifs
        result = result.replaceAll("coordonnées mystiques", 
            getRandomFromArray(new String[]{
                "coordonnées mystiques", "position fatidique", 
                "lieu de destinée", "point de convergence", "nexus spatial"
            }));
            
        result = result.replaceAll("bataille épique", 
            getRandomFromArray(new String[]{
                "bataille épique", "duel légendaire", "affrontement titanesque",
                "combat héroïque", "lutte mythique"
            }));
        
        return result;
    }

    private String getRandomFromArray(String[] array) {
        return array[random.nextInt(array.length)];
    }

    private String cleanupTranslation(String script) {
        String result = script;
        
        // Nettoyer les termes techniques restants
        result = result.replaceAll("@(\\d+),(\\d+)", "($1, $2)");
        result = result.replaceAll("Δt\\+(\\d+)", "dans $1 tours");
        result = result.replaceAll("\\s+", " ");
        result = result.trim();
        
        return result;
    }

    private Set<String> getUsedHeroData(String script) {
        Set<String> usedHeroes = new HashSet<>();
        
        Pattern heroPattern = Pattern.compile("(?:HERO|MOV|ABILITY)\\(([^,)]+)");
        Matcher matcher = heroPattern.matcher(script);
        
        while (matcher.find()) {
            String heroName = matcher.group(1);
            if (heroData.containsKey(heroName)) {
                usedHeroes.add(heroName);
            }
        }
        
        return usedHeroes;
    }

    public List<String> getAvailableModes() {
        return Arrays.asList("smart", "literary", "contextual", "varied");
    }

    public Map<String, String> getTranslationExamples() {
        Map<String, String> examples = new HashMap<>();
        examples.put("HERO(Arthur)", "Arthur surgit dans un éclat de lumière dorée, Excalibur scintillant");
        examples.put("MOV(Ragnar, @15,20)", "Ragnar charge avec fougue guerrière vers (15, 20)");
        examples.put("ABILITY(Memento, archivage_immediat)", "Memento déchaîne 📚 Archivage Immédiat : Archive instantanément un événement dans la mémoire éternelle");
        examples.put("USE(ARTIFACT, mjolnir, HERO:Ragnar)", "Ragnar brandit Mjolnir, marteau du tonnerre qui frappe à travers les réalités");
        
        return examples;
    }
}