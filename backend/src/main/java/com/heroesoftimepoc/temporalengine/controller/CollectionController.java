package com.heroesoftimepoc.temporalengine.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.heroesoftimepoc.temporalengine.service.TemporalScriptParser;
import com.heroesoftimepoc.temporalengine.service.ScriptTranslationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/collection")
@CrossOrigin(origins = "*")
public class CollectionController {

    @Autowired
    private TemporalScriptParser temporalParser;
    
    @Autowired
    private ScriptTranslationService scriptTranslationService;

    private final ObjectMapper objectMapper = new ObjectMapper();

    /**
     * Récupérer toute la collection du jeu
     */
    @GetMapping("/all")
    public ResponseEntity<List<Map<String, Object>>> getAllCollection() {
        try {
            List<Map<String, Object>> collection = new ArrayList<>();
            
            // Ajouter les héros
            collection.addAll(loadHeroes());
            
            // Ajouter les artefacts
            collection.addAll(loadArtifacts());
            
            // Ajouter les créatures
            collection.addAll(loadCreatures());
            
            return ResponseEntity.ok(collection);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", "Erreur lors du chargement de la collection: " + e.getMessage());
            return ResponseEntity.badRequest().body(Arrays.asList(error));
        }
    }

    /**
     * Récupérer les héros
     */
    @GetMapping("/heroes")
    public ResponseEntity<List<Map<String, Object>>> getHeroes() {
        try {
            return ResponseEntity.ok(loadHeroes());
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", "Erreur lors du chargement des héros: " + e.getMessage());
            return ResponseEntity.badRequest().body(Arrays.asList(error));
        }
    }

    /**
     * Récupérer les artefacts
     */
    @GetMapping("/artifacts")
    public ResponseEntity<List<Map<String, Object>>> getArtifacts() {
        try {
            return ResponseEntity.ok(loadArtifacts());
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", "Erreur lors du chargement des artefacts: " + e.getMessage());
            return ResponseEntity.badRequest().body(Arrays.asList(error));
        }
    }

    /**
     * Récupérer les créatures
     */
    @GetMapping("/creatures")
    public ResponseEntity<List<Map<String, Object>>> getCreatures() {
        try {
            return ResponseEntity.ok(loadCreatures());
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", "Erreur lors du chargement des créatures: " + e.getMessage());
            return ResponseEntity.badRequest().body(Arrays.asList(error));
        }
    }

    /**
     * Traduire un script HOTS en langage naturel
     */
    @PostMapping("/translate")
    public ResponseEntity<Map<String, Object>> translateScript(@RequestBody Map<String, String> request) {
        try {
            String script = request.get("script");
            String mode = request.getOrDefault("mode", "all");
            
            if (script == null || script.trim().isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("error", "Script requis"));
            }

            Map<String, Object> translation = scriptTranslationService.translateScript(script, mode);
            return ResponseEntity.ok(translation);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", "Erreur de traduction: " + e.getMessage()));
        }
    }

    @PostMapping("/translate-formula")
    public ResponseEntity<Map<String, Object>> translateFormula(@RequestBody Map<String, String> request) {
        try {
            String formula = request.get("formula");
            String mode = request.getOrDefault("mode", "symbols"); // "symbols" ou "text"
            
            if (formula == null || formula.trim().isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("error", "Formule requise"));
            }

            Map<String, Object> result = new HashMap<>();
            result.put("original", formula);
            
            if ("symbols".equals(mode)) {
                result.put("translated", translateArtifactFormula(formula));
                result.put("mode", "symbols");
            } else {
                result.put("translated", translateArtifactFormulaWithText(formula));
                result.put("mode", "text");
            }
            
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", "Erreur de traduction: " + e.getMessage()));
        }
    }

    @GetMapping("/translation-modes")
    public ResponseEntity<Map<String, Object>> getTranslationModes() {
        try {
            Map<String, Object> result = new HashMap<>();
            result.put("modes", scriptTranslationService.getAvailableModes());
            result.put("examples", scriptTranslationService.getTranslationExamples());
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", "Erreur: " + e.getMessage()));
        }
    }

    /**
     * Charger les héros depuis les fichiers JSON
     */
    private List<Map<String, Object>> loadHeroes() throws IOException {
        List<Map<String, Object>> heroes = new ArrayList<>();
        
        // Charger les héros légendaires
        String legendaryPath = "heroes/legendary";
        heroes.addAll(loadHeroesFromDirectory(legendaryPath, "LEGENDARY"));
        
        // Charger les héros GROFI
        String grofiPath = "heroes/grofi";
        heroes.addAll(loadHeroesFromDirectory(grofiPath, "EPIC"));
        
        return heroes;
    }

    /**
     * Charger les héros d'un répertoire
     */
    private List<Map<String, Object>> loadHeroesFromDirectory(String directory, String defaultRarity) throws IOException {
        List<Map<String, Object>> heroes = new ArrayList<>();
        
        try {
            ClassPathResource resource = new ClassPathResource(directory);
            if (resource.exists()) {
                Path dirPath = Paths.get(resource.getURI());
                if (Files.isDirectory(dirPath)) {
                    Files.list(dirPath)
                        .filter(path -> path.toString().endsWith(".json"))
                        .forEach(path -> {
                            try {
                                String content = Files.readString(path);
                                Map<String, Object> hero = objectMapper.readValue(content, Map.class);
                                
                                // Ajouter les métadonnées
                                hero.put("category", "heroes");
                                hero.put("file", path.getFileName().toString());
                                
                                // S'assurer que la rareté est définie
                                if (!hero.containsKey("rarity")) {
                                    hero.put("rarity", defaultRarity);
                                }
                                
                                heroes.add(hero);
                            } catch (IOException e) {
                                System.err.println("Erreur lors du chargement du héros " + path + ": " + e.getMessage());
                            }
                        });
                }
            }
        } catch (Exception e) {
            System.err.println("Erreur lors du chargement du répertoire " + directory + ": " + e.getMessage());
        }
        
        return heroes;
    }

    /**
     * Charger les artefacts
     */
    private List<Map<String, Object>> loadArtifacts() throws IOException {
        List<Map<String, Object>> artifacts = new ArrayList<>();
        
        // Charger les artefacts quantiques
        try {
            ClassPathResource resource = new ClassPathResource("quantum-artifacts.json");
            if (resource.exists()) {
                String content = Files.readString(Paths.get(resource.getURI()));
                Map<String, Object> data = objectMapper.readValue(content, Map.class);
                
                if (data.containsKey("quantumArtifacts")) {
                    Map<String, Object> quantumArtifacts = (Map<String, Object>) data.get("quantumArtifacts");
                    
                    // Traiter chaque tier
                    for (Map.Entry<String, Object> entry : quantumArtifacts.entrySet()) {
                        if (entry.getValue() instanceof List) {
                            List<Map<String, Object>> tierArtifacts = (List<Map<String, Object>>) entry.getValue();
                            for (Map<String, Object> artifact : tierArtifacts) {
                                artifact.put("category", "artifacts");
                                artifact.put("tier", entry.getKey());
                                artifacts.add(artifact);
                            }
                        }
                    }
                }
            }
        } catch (Exception e) {
            System.err.println("Erreur lors du chargement des artefacts quantiques: " + e.getMessage());
        }
        
        // Charger les artefacts temporels avancés
        try {
            ClassPathResource resource = new ClassPathResource("temporal-artifacts-advanced.json");
            if (resource.exists()) {
                String content = Files.readString(Paths.get(resource.getURI()));
                Map<String, Object> data = objectMapper.readValue(content, Map.class);
                
                if (data.containsKey("temporalArtifacts")) {
                    List<Map<String, Object>> temporalArtifacts = (List<Map<String, Object>>) data.get("temporalArtifacts");
                    for (Map<String, Object> artifact : temporalArtifacts) {
                        artifact.put("category", "artifacts");
                        artifact.put("tier", "TEMPORAL");
                        artifacts.add(artifact);
                    }
                }
            }
        } catch (Exception e) {
            System.err.println("Erreur lors du chargement des artefacts temporels: " + e.getMessage());
        }
        
        return artifacts;
    }

    /**
     * Charger les créatures
     */
    private List<Map<String, Object>> loadCreatures() throws IOException {
        List<Map<String, Object>> creatures = new ArrayList<>();
        
        try {
            ClassPathResource resource = new ClassPathResource("quantum-creatures.json");
            if (resource.exists()) {
                String content = Files.readString(Paths.get(resource.getURI()));
                Map<String, Object> data = objectMapper.readValue(content, Map.class);
                
                if (data.containsKey("quantumCreatures")) {
                    List<Map<String, Object>> quantumCreatures = (List<Map<String, Object>>) data.get("quantumCreatures");
                    for (Map<String, Object> creature : quantumCreatures) {
                        creature.put("category", "creatures");
                        creatures.add(creature);
                    }
                }
            }
        } catch (Exception e) {
            System.err.println("Erreur lors du chargement des créatures: " + e.getMessage());
        }
        
        return creatures;
    }

    /**
     * Traduire un script HOTS en langage naturel avec support icônes
     */
    private Map<String, Object> translateHOTSScript(String script) {
        Map<String, Object> translation = new HashMap<>();
        translation.put("original", script);
        translation.put("translation", "");
        translation.put("translation_icons", "");
        translation.put("type", "unknown");
        translation.put("details", new HashMap<>());
        
        try {
            // Détecter le type de script
            if (script.contains("ψ") && script.contains("⊙")) {
                // Script temporel avec ψ-state
                translation.put("type", "temporal_psi_state");
                translation.put("translation", translatePsiState(script));
                translation.put("translation_icons", translatePsiStateWithIcons(script));
                translation.put("details", extractPsiStateDetails(script));
            } else if (script.contains("†")) {
                // Collapse d'état
                translation.put("type", "collapse");
                translation.put("translation", translateCollapse(script));
                translation.put("translation_icons", translateCollapseWithIcons(script));
                translation.put("details", extractCollapseDetails(script));
            } else if (script.contains("Π") && script.contains("⇒")) {
                // Trigger d'observation
                translation.put("type", "observation_trigger");
                translation.put("translation", translateObservationTrigger(script));
                translation.put("translation_icons", translateObservationTriggerWithIcons(script));
                translation.put("details", extractObservationTriggerDetails(script));
            } else if (script.startsWith("HERO(")) {
                // Création de héros
                translation.put("type", "hero_creation");
                translation.put("translation", translateHeroCreation(script));
                translation.put("translation_icons", translateHeroCreationWithIcons(script));
                translation.put("details", extractHeroCreationDetails(script));
            } else if (script.startsWith("MOV(")) {
                // Mouvement
                translation.put("type", "movement");
                translation.put("translation", translateMovement(script));
                translation.put("translation_icons", translateMovementWithIcons(script));
                translation.put("details", extractMovementDetails(script));
            } else if (script.startsWith("CREATE(")) {
                // Création d'objet
                translation.put("type", "creation");
                translation.put("translation", translateCreation(script));
                translation.put("translation_icons", translateCreationWithIcons(script));
                translation.put("details", extractCreationDetails(script));
            } else if (script.startsWith("USE(")) {
                // Utilisation d'objet
                translation.put("type", "usage");
                translation.put("translation", translateUsage(script));
                translation.put("translation_icons", translateUsageWithIcons(script));
                translation.put("details", extractUsageDetails(script));
            } else if (script.startsWith("CAST(")) {
                // Sort avec @
                translation.put("type", "spell_cast");
                translation.put("translation", translateCast(script));
                translation.put("translation_icons", translateCastWithIcons(script));
                translation.put("details", extractCastDetails(script));
            } else {
                translation.put("translation", "Script non reconnu");
                translation.put("translation_icons", "❓ Script non reconnu");
            }
        } catch (Exception e) {
            translation.put("translation", "Erreur de traduction: " + e.getMessage());
            translation.put("translation_icons", "❌ Erreur de traduction");
        }
        
        return translation;
    }

    // Méthodes de traduction spécifiques
    private String translatePsiState(String script) {
        // ψ001: ⊙(Δt+2 @10,10 ⟶ MOV(HERO, Arthur, @10,10))
        return script.replaceAll("ψ(\\d+):\\s*⊙\\((.*)\\)", "État quantique ψ$1: Superposition temporelle - $2");
    }

    private String translateCollapse(String script) {
        // †ψ001
        return script.replaceAll("†ψ(\\d+)", "Effondrement de l'état quantique ψ$1");
    }

    private String translateObservationTrigger(String script) {
        // Π(condition) ⇒ †ψ001
        return script.replaceAll("Π\\(([^)]+)\\)\\s*⇒\\s*†ψ(\\d+)", "Observation: Si $1, alors effondrement de ψ$2");
    }

    private String translateHeroCreation(String script) {
        // HERO(Arthur)
        return script.replaceAll("HERO\\(([^)]+)\\)", "Création du héros $1");
    }

    private String translateMovement(String script) {
        // MOV(HERO, Arthur, @10,10)
        return script.replaceAll("MOV\\(([^,]+),\\s*([^,]+),\\s*@(\\d+),(\\d+)\\)", "Déplacement de $2 vers la position ($3, $4)");
    }

    private String translateCreation(String script) {
        // CREATE(CREATURE, Dragon, @10,10)
        return script.replaceAll("CREATE\\(([^,]+),\\s*([^,]+)(?:,\\s*@(\\d+),(\\d+))?\\)", "Création d'un $1: $2" + (script.contains("@") ? " à la position ($3, $4)" : ""));
    }

    private String translateUsage(String script) {
        // USE(ITEM, AvantWorldBlade, HERO:Arthur)
        return script.replaceAll("USE\\(([^,]+),\\s*([^,]+)(?:,\\s*([^)]+))?\\)", "Utilisation de $2 par $3");
    }

    // Méthodes d'extraction de détails
    private Map<String, Object> extractPsiStateDetails(String script) {
        Map<String, Object> details = new HashMap<>();
        // Extraction des détails du ψ-state
        return details;
    }

    private Map<String, Object> extractCollapseDetails(String script) {
        Map<String, Object> details = new HashMap<>();
        // Extraction des détails du collapse
        return details;
    }

    private Map<String, Object> extractObservationTriggerDetails(String script) {
        Map<String, Object> details = new HashMap<>();
        // Extraction des détails du trigger
        return details;
    }

    private Map<String, Object> extractHeroCreationDetails(String script) {
        Map<String, Object> details = new HashMap<>();
        // Extraction des détails de création de héros
        return details;
    }

    private Map<String, Object> extractMovementDetails(String script) {
        Map<String, Object> details = new HashMap<>();
        // Extraction des détails de mouvement
        return details;
    }

    private Map<String, Object> extractCreationDetails(String script) {
        Map<String, Object> details = new HashMap<>();
        // Extraction des détails de création
        return details;
    }

    private Map<String, Object> extractUsageDetails(String script) {
        Map<String, Object> details = new HashMap<>();
        // Extraction des détails d'utilisation
        return details;
    }

    // Méthodes de traduction avec symboles grecs
    private String translatePsiStateWithIcons(String script) {
        // ψ001: ⊙(Δt+1 @10,10 ⟶ MOV(HERO, Arthur, @10,10))
        return script.replaceAll("ψ(\\d+):\\s*⊙\\((.*)\\)", "ψ$1: ⊙($2)");
    }

    private String translateCollapseWithIcons(String script) {
        // †ψ001
        return script.replaceAll("†ψ(\\d+)", "†ψ$1");
    }

    private String translateObservationTriggerWithIcons(String script) {
        // Π(condition) ⇒ †ψ001
        return script.replaceAll("Π\\(([^)]+)\\)\\s*⇒\\s*†ψ(\\d+)", "Π($1) ⇒ †ψ$2");
    }

    private String translateHeroCreationWithIcons(String script) {
        // HERO(Arthur)
        return script.replaceAll("HERO\\(([^)]+)\\)", "HERO($1)");
    }

    private String translateMovementWithIcons(String script) {
        // MOV(HERO, Arthur, @10,10)
        return script.replaceAll("MOV\\(([^,]+),\\s*([^,]+),\\s*@(\\d+),(\\d+)\\)", "MOV($1, $2, @$3,$4)");
    }

    private String translateCreationWithIcons(String script) {
        // CREATE(CREATURE, Dragon, @10,10)
        return script.replaceAll("CREATE\\(([^,]+),\\s*([^,]+)(?:,\\s*@(\\d+),(\\d+))?\\)", "CREATE($1, $2" + (script.contains("@") ? ", @$3,$4" : "") + ")");
    }

    private String translateUsageWithIcons(String script) {
        // USE(ITEM, AvantWorldBlade, HERO:Arthur)
        return script.replaceAll("USE\\(([^,]+),\\s*([^,]+)(?:,\\s*([^)]+))?\\)", "USE($1, $2" + (script.contains("HERO:") ? ", $3" : "") + ")");
    }

    private String translateCast(String script) {
        // CAST(SPELL, Fireball, TARGET:Ragnar, HERO:Arthur)
        return script.replaceAll("CAST\\(SPELL,\\s*([^,]+),\\s*TARGET:([^,]+),\\s*HERO:([^)]+)\\)", "Lancement du sort $1 sur $2 par $3");
    }

    private String translateCastWithIcons(String script) {
        // CAST(SPELL, Fireball, TARGET:Ragnar, HERO:Arthur)
        return script.replaceAll("CAST\\(SPELL,\\s*([^,]+),\\s*TARGET:([^,]+),\\s*HERO:([^)]+)\\)", "@($1, TARGET:$2, HERO:$3)");
    }

    private Map<String, Object> extractCastDetails(String script) {
        Map<String, Object> details = new HashMap<>();
        // Extraction des détails du sort
        return details;
    }

    // Méthodes pour traduire les formules d'artefacts avec symboles grecs
    private String translateArtifactFormula(String formula) {
        if (formula == null) return "";
        
        // Remplacer les termes d'interférence par des symboles grecs
        String translated = formula
            .replaceAll("CONSTRUCTIVE\\(([^)]+)\\)", "⊕($1)")
            .replaceAll("DESTRUCTIVE\\(([^)]+)\\)", "⊖($1)")
            .replaceAll("NEUTRAL", "⊗")
            .replaceAll("COMPLEX", "⊘");
        
        return translated;
    }

    private String translateArtifactFormulaWithText(String formula) {
        if (formula == null) return "";
        
        // Remplacer les symboles grecs par du texte explicatif
        String translated = formula
            .replaceAll("⊕\\(([^)]+)\\)", "CONSTRUCTIVE($1)")
            .replaceAll("⊖\\(([^)]+)\\)", "DESTRUCTIVE($1)")
            .replaceAll("⊗", "NEUTRAL")
            .replaceAll("⊘", "COMPLEX");
        
        return translated;
    }
} 