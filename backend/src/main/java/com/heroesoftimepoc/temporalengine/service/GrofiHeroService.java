package com.heroesoftimepoc.temporalengine.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.heroesoftimepoc.temporalengine.model.Hero;
import com.heroesoftimepoc.temporalengine.model.Game;
import com.heroesoftimepoc.temporalengine.repository.HeroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.io.InputStream;
import java.util.*;
import java.util.stream.Collectors;

/**
 * Service pour charger et gérer les héros GROFI
 * Compatible avec le système Hero existant - VERSION SIMPLIFIÉE
 */
@Service
public class GrofiHeroService {
    
    @Autowired
    private HeroRepository heroRepository;
    
    private final ObjectMapper objectMapper = new ObjectMapper();
    private Map<String, GrofiHeroData> grofiHeroes = new HashMap<>();
    
    /**
     * Structure interne pour les données GROFI
     */
    public static class GrofiHeroData {
        public String id;
        public String name;
        public String title;
        public String description;
        public String rarity;
        public String role;
        public String faction;
        public List<String> companions = new ArrayList<>();
        public List<String> quotes = new ArrayList<>();
        public Map<String, Object> ultimatePower = new HashMap<>();
        public List<Map<String, Object>> passives = new ArrayList<>();
        public List<String> immunityTags = new ArrayList<>();
        
        // Conversion vers Hero entity existant - COMPATIBLE
        public Hero toHero(int startX, int startY) {
            Hero hero = new Hero(name, startX, startY);
            
            // Définir les propriétés GROFI étendues
            if (rarity != null) {
                // Ajouter rarity comme item spécial pour tracking
                hero.addItem("GROFI_RARITY_" + rarity.toUpperCase());
            }
            
            // Ajouter les artefacts de départ avec leurs formules
            if (startingArtifacts != null) {
                for (Map<String, Object> artifact : startingArtifacts) {
                    String artifactName = (String) artifact.get("name");
                    String formula = (String) artifact.get("formula");
                    
                    // Ajouter l'artefact à l'inventaire
                    hero.addItem(artifactName);
                    
                    // Stocker la formule comme métadonnée (simplifié)
                    if (formula != null) {
                        hero.addItem("FORMULA_" + artifactName.replaceAll("\\s+", "_").toUpperCase() + ":" + formula);
                    }
                }
            }
            
            // Appliquer les stats étendues si disponibles
            if (stats != null) {
                Integer baseHealth = (Integer) stats.get("base_health");
                Integer baseTemporalEnergy = (Integer) stats.get("base_temporal_energy");
                Integer movementPoints = (Integer) stats.get("movement_points");
                Integer visionRadius = (Integer) stats.get("vision_radius");
                Integer level = (Integer) stats.get("level");
                
                if (baseHealth != null) {
                    hero.setHealth(baseHealth);
                    hero.setMaxHealth(baseHealth);
                }
                if (baseTemporalEnergy != null) {
                    hero.setTemporalEnergy(baseTemporalEnergy);
                    hero.setMaxTemporalEnergy(baseTemporalEnergy);
                }
                if (movementPoints != null) {
                    hero.setMovementPoints(movementPoints);
                    hero.setMaxMovementPoints(movementPoints);
                }
                if (visionRadius != null && hero.getVisionRadius() != null) {
                    hero.setVisionRadius(visionRadius);
                }
            }
            
            return hero;
        }
        
        // Nouvelles propriétés pour les artefacts et formules
        public List<Map<String, Object>> startingArtifacts = new ArrayList<>();
        public Map<String, Object> temporalAffinities = new HashMap<>();
        public Map<String, Object> stats = new HashMap<>();
    }
    
    /**
     * Initialiser le service - Charger les héros GROFI depuis les JSON
     */
    @PostConstruct
    public void initializeGrofiHeroes() {
        loadGrofiHeroesFromResources();
    }
    
    /**
     * Charger les héros GROFI depuis les fichiers JSON
     */
    private void loadGrofiHeroesFromResources() {
        String[] heroFiles = {
            "heroes/grofi/JeanGrofignon.json",
            "heroes/grofi/TheDude.json", 
            "heroes/grofi/VinceVega.json",
            "heroes/grofi/WalterSobchak.json"
        };
        
        for (String heroFile : heroFiles) {
            try {
                loadGrofiHero(heroFile);
            } catch (Exception e) {
                System.err.println("❌ Erreur chargement héros GROFI: " + heroFile + " - " + e.getMessage());
            }
        }
        
        System.out.println("🦸 " + grofiHeroes.size() + " héros GROFI chargés avec succès");
    }
    
    /**
     * Charger un héros GROFI depuis un fichier JSON
     */
    private void loadGrofiHero(String resourcePath) throws IOException {
        ClassPathResource resource = new ClassPathResource(resourcePath);
        
        try (InputStream inputStream = resource.getInputStream()) {
            JsonNode jsonNode = objectMapper.readTree(inputStream);
            GrofiHeroData heroData = parseGrofiHeroData(jsonNode);
            grofiHeroes.put(heroData.id, heroData);
            System.out.println("✅ Héros GROFI chargé: " + heroData.name + " (" + heroData.rarity + ")");
        }
    }
    
    /**
     * Parser les données JSON en GrofiHeroData
     */
    private GrofiHeroData parseGrofiHeroData(JsonNode jsonNode) {
        GrofiHeroData data = new GrofiHeroData();
        
        data.id = jsonNode.get("id").asText();
        data.name = jsonNode.get("name").asText();
        data.title = jsonNode.path("title").asText();
        data.description = jsonNode.path("description").asText();
        data.rarity = jsonNode.path("rarity").asText();
        data.role = jsonNode.path("role").asText();
        data.faction = jsonNode.path("faction").asText();
        
        // Charger les compagnons
        if (jsonNode.has("companions")) {
            jsonNode.get("companions").forEach(companion -> 
                data.companions.add(companion.asText()));
        }
        
        // Charger les quotes
        if (jsonNode.has("quotes")) {
            jsonNode.get("quotes").forEach(quote -> 
                data.quotes.add(quote.asText()));
        }
        
        // Charger les immunity tags
        if (jsonNode.has("immunityTags")) {
            jsonNode.get("immunityTags").forEach(tag -> 
                data.immunityTags.add(tag.asText()));
        }
        
        // Charger l'ultimate power
        if (jsonNode.has("ultimate_power")) {
            JsonNode ultimateNode = jsonNode.get("ultimate_power");
            data.ultimatePower.put("name", ultimateNode.path("name").asText());
            data.ultimatePower.put("description", ultimateNode.path("description").asText());
            data.ultimatePower.put("quantum_script", ultimateNode.path("quantum_script").asText());
            data.ultimatePower.put("formula", ultimateNode.path("formula").asText());
            data.ultimatePower.put("cooldown", ultimateNode.path("cooldown").asInt());
            data.ultimatePower.put("cost", ultimateNode.path("cost").asInt());
        }
        
        // Charger les artefacts de départ avec formules
        if (jsonNode.has("starting_artifacts")) {
            jsonNode.get("starting_artifacts").forEach(artifactNode -> {
                Map<String, Object> artifact = new HashMap<>();
                artifact.put("name", artifactNode.path("name").asText());
                artifact.put("type", artifactNode.path("type").asText());
                artifact.put("formula", artifactNode.path("formula").asText());
                artifact.put("description", artifactNode.path("description").asText());
                artifact.put("charges", artifactNode.path("charges").asInt());
                data.startingArtifacts.add(artifact);
            });
        }
        
        // Charger les affinités temporelles
        if (jsonNode.has("temporal_affinities")) {
            JsonNode affinitiesNode = jsonNode.get("temporal_affinities");
            affinitiesNode.fields().forEachRemaining(entry -> 
                data.temporalAffinities.put(entry.getKey(), entry.getValue().asDouble()));
        }
        
        // Charger les stats
        if (jsonNode.has("stats")) {
            JsonNode statsNode = jsonNode.get("stats");
            statsNode.fields().forEachRemaining(entry -> {
                if (entry.getValue().isInt()) {
                    data.stats.put(entry.getKey(), entry.getValue().asInt());
                } else {
                    data.stats.put(entry.getKey(), entry.getValue().asDouble());
                }
            });
        }
        
        return data;
    }
    
    /**
     * Charger tous les héros GROFI depuis les fichiers JSON
     */
    public void loadGrofiHeroes() {
        String[] heroFiles = {
            "heroes/grofi/JeanGrofignon.json",
            "heroes/grofi/TheDude.json", 
            "heroes/grofi/VinceVega.json",
            "heroes/grofi/WalterSobchak.json"
        };
        
        for (String heroFile : heroFiles) {
            try {
                loadGrofiHeroFromFile(heroFile);
            } catch (Exception e) {
                System.err.println("⚠️ Erreur chargement héros GROFI: " + heroFile + " - " + e.getMessage());
                // Ne pas faire planter le système si un héros ne charge pas
            }
        }
        
        System.out.println("✅ Héros GROFI chargés: " + grofiHeroes.size());
    }
    
    /**
     * Charger un héros GROFI depuis un fichier JSON
     */
    private void loadGrofiHeroFromFile(String resourcePath) throws IOException {
        ClassPathResource resource = new ClassPathResource(resourcePath);
        
        if (!resource.exists()) {
            System.out.println("⚠️ Fichier héros GROFI non trouvé: " + resourcePath);
            return;
        }
        
        try (InputStream inputStream = resource.getInputStream()) {
            JsonNode heroNode = objectMapper.readTree(inputStream);
            
            GrofiHeroData heroData = new GrofiHeroData();
            heroData.id = heroNode.path("id").asText();
            heroData.name = heroNode.path("name").asText();
            heroData.title = heroNode.path("title").asText();
            heroData.description = heroNode.path("description").asText();
            heroData.rarity = heroNode.path("rarity").asText();
            heroData.role = heroNode.path("role").asText();
            heroData.faction = heroNode.path("faction").asText();
            
            // Charger companions
            JsonNode companionsNode = heroNode.path("companions");
            if (companionsNode.isArray()) {
                for (JsonNode companion : companionsNode) {
                    heroData.companions.add(companion.asText());
                }
            }
            
            // Charger quotes
            JsonNode quotesNode = heroNode.path("quotes");
            if (quotesNode.isArray()) {
                for (JsonNode quote : quotesNode) {
                    heroData.quotes.add(quote.asText());
                }
            }
            
            // Charger ultimate power
            JsonNode ultimateNode = heroNode.path("ultimate_power");
            if (!ultimateNode.isMissingNode()) {
                heroData.ultimatePower.put("name", ultimateNode.path("name").asText());
                heroData.ultimatePower.put("description", ultimateNode.path("description").asText());
                heroData.ultimatePower.put("quantum_script", ultimateNode.path("quantum_script").asText());
            }
            
            // Charger passives
            JsonNode passivesNode = heroNode.path("passives");
            if (passivesNode.isArray()) {
                for (JsonNode passive : passivesNode) {
                    Map<String, Object> passiveData = new HashMap<>();
                    passiveData.put("name", passive.path("name").asText());
                    passiveData.put("description", passive.path("description").asText());
                    heroData.passives.add(passiveData);
                }
            }
            
            // Extraire immunity tags depuis les items ou autres champs
            extractImmunityTags(heroNode, heroData);
            
            grofiHeroes.put(heroData.id, heroData);
            System.out.println("📦 Héros GROFI chargé: " + heroData.name + " (" + heroData.title + ")");
        }
    }
    
    /**
     * Extraire les tags d'immunité depuis le JSON
     */
    private void extractImmunityTags(JsonNode heroNode, GrofiHeroData heroData) {
        // Implémentation réelle : lire les immunités depuis le JSON
        JsonNode immunityNode = heroNode.get("immunityTags");
        if (immunityNode != null && immunityNode.isArray()) {
            for (JsonNode immunity : immunityNode) {
                if (immunity.isTextual()) {
                    heroData.immunityTags.add(immunity.asText());
                }
            }
        }
        
        // Immunités spéciales basées sur le nom (fallback)
        if (heroData.name.contains("Jean-Grofignon")) {
            if (!heroData.immunityTags.contains("SRTI")) {
                heroData.immunityTags.add("SRTI");
            }
            if (!heroData.immunityTags.contains("ROLLBACK")) {
                heroData.immunityTags.add("ROLLBACK");
            }
        }
        if (heroData.name.contains("TheDude")) {
            if (!heroData.immunityTags.contains("OBS")) {
                heroData.immunityTags.add("OBS");
            }
        }
        if (heroData.name.contains("VinceVega")) {
            if (!heroData.immunityTags.contains("SRTI")) {
                heroData.immunityTags.add("SRTI");
            }
        }
        if (heroData.name.contains("WalterSobchak")) {
            if (!heroData.immunityTags.contains("ROLLBACK")) {
                heroData.immunityTags.add("ROLLBACK");
            }
        }
    }
    
    /**
     * Créer un héros GROFI dans le jeu
     */
    public Hero createGrofiHero(Game game, String grofiHeroId, int startX, int startY, String playerId) {
        GrofiHeroData grofiData = grofiHeroes.get(grofiHeroId);
        if (grofiData == null) {
            throw new IllegalArgumentException("Héros GROFI non trouvé: " + grofiHeroId);
        }
        
        Hero hero = grofiData.toHero(startX, startY);
        hero.setGame(game);
        hero.setPlayerId(playerId);
        
        // Sauvegarder dans la DB
        heroRepository.save(hero);
        game.addHero(hero);
        
        System.out.println("🦸 Héros GROFI créé: " + grofiData.name + " pour joueur " + playerId);
        return hero;
    }
    
    /**
     * Vérifier si un héros est un héros GROFI
     */
    public boolean isGrofiHero(Hero hero) {
        return grofiHeroes.values().stream()
                .anyMatch(data -> data.name.equals(hero.getName()));
    }
    
    /**
     * Obtenir les immunités d'un héros (basées sur son inventaire et ses capacités GROFI)
     */
    public List<String> getHeroImmunities(Hero hero) {
        List<String> immunities = new ArrayList<>();
        
        // Vérifier si c'est un héros GROFI avec des immunités spéciales
        Optional<GrofiHeroData> grofiData = getGrofiData(hero.getName());
        if (grofiData.isPresent()) {
            GrofiHeroData data = grofiData.get();
            
            // Jean-Grofignon a des immunités spéciales
            if ("Jean-Grofignon".equals(data.name)) {
                immunities.add("COLLAPSE"); // Immunité aux collapses forcés
            }
            
            // Autres héros GROFI avec immunités spécifiques
            if ("The Dude".equals(data.name)) {
                immunities.add("STRESS"); // Immunité au stress causale
            }
        }
        
        // Vérifier les artefacts dans l'inventaire
        List<String> inventory = hero.getInventory();
        if (inventory != null) {
            for (String item : inventory) {
                // Artefacts qui donnent des immunités
                switch (item.toLowerCase()) {
                    case "temporal_anchor":
                    case "anchor_temporal":
                        immunities.add("ROLLBACK");
                        immunities.add("TEMPORAL");
                        break;
                        
                    case "quantum_shield":
                    case "bouclier_quantique":
                        immunities.add("OBS");
                        immunities.add("COLLAPSE");
                        break;
                        
                    case "immunity_ring":
                    case "anneau_immunite":
                        immunities.add("OBS");
                        break;
                        
                    case "time_crystal":
                    case "cristal_temporel":
                        immunities.add("ROLLBACK");
                        break;
                        
                    case "void_essence":
                    case "essence_neant":
                        immunities.add("COLLAPSE");
                        immunities.add("STRESS");
                        break;
                }
            }
        }
        
        return immunities;
    }
    
    /**
     * Vérifier si un héros a une immunité spécifique
     */
    public boolean hasImmunity(Hero hero, String immunityType) {
        return getHeroImmunities(hero).contains(immunityType);
    }
    
    /**
     * Obtenir les informations GROFI d'un héros
     */
    public Optional<GrofiHeroData> getGrofiData(String heroName) {
        return grofiHeroes.values().stream()
                .filter(data -> data.name.equals(heroName))
                .findFirst();
    }
    
    /**
     * Lister tous les héros GROFI disponibles
     */
    public List<GrofiHeroData> getAllGrofiHeroes() {
        return new ArrayList<>(grofiHeroes.values());
    }
    
    /**
     * Obtenir les formules d'artefacts d'un héros GROFI
     */
    public List<String> getHeroArtifactFormulas(Hero hero) {
        List<String> formulas = new ArrayList<>();
        
        // Extraire les formules depuis l'inventaire
        List<String> inventory = hero.getInventory();
        if (inventory != null) {
            for (String item : inventory) {
                if (item.startsWith("FORMULA_")) {
                    // Format: FORMULA_ARTIFACT_NAME:formula
                    String[] parts = item.split(":", 2);
                    if (parts.length == 2) {
                        formulas.add(parts[1]);
                    }
                }
            }
        }
        
        // Ajouter les formules des héros GROFI spéciaux
        Optional<GrofiHeroData> grofiData = getGrofiData(hero.getName());
        if (grofiData.isPresent()) {
            GrofiHeroData data = grofiData.get();
            
            // Formules des ultimate powers
            if (data.ultimatePower.containsKey("formula")) {
                formulas.add((String) data.ultimatePower.get("formula"));
            }
            
            // Formules des passives
            for (Map<String, Object> passive : data.passives) {
                if (passive.containsKey("formula")) {
                    formulas.add((String) passive.get("formula"));
                }
            }
        }
        
        return formulas;
    }
    
    /**
     * Vérifier si un héros peut exécuter une formule temporelle spécifique
     */
    public boolean canExecuteFormula(Hero hero, String formula) {
        // Vérifications de base
        if (formula == null || formula.trim().isEmpty()) {
            return false;
        }
        
        // Jean-Grofignon peut tout exécuter
        if ("Jean-Grofignon".equals(hero.getName())) {
            return true;
        }
        
        // Vérifier si le héros a l'artefact correspondant
        List<String> heroFormulas = getHeroArtifactFormulas(hero);
        return heroFormulas.contains(formula);
    }
    
    /**
     * Obtenir les statistiques étendues d'un héros GROFI
     */
    public Map<String, Object> getGrofiStats(Hero hero) {
        Map<String, Object> stats = new HashMap<>();
        
        Optional<GrofiHeroData> grofiData = getGrofiData(hero.getName());
        if (grofiData.isPresent()) {
            GrofiHeroData data = grofiData.get();
            
            stats.put("isGrofiHero", true);
            stats.put("rarity", data.rarity);
            stats.put("role", data.role);
            stats.put("faction", data.faction);
            stats.put("immunityTags", data.immunityTags);
            stats.put("temporalAffinities", data.temporalAffinities);
            stats.put("startingArtifactsCount", data.startingArtifacts.size());
            stats.put("quotesCount", data.quotes.size());
            
            // Calculer l'efficacité temporelle
            Double efficiency = (Double) data.temporalAffinities.get("ultimate_power_efficiency");
            if (efficiency != null) {
                stats.put("temporalEfficiency", efficiency);
            }
            
        } else {
            stats.put("isGrofiHero", false);
        }
        
        return stats;
    }
    
    /**
     * Créer un rapport de compatibilité entre GROFI et le moteur temporal
     */
    public Map<String, Object> generateCompatibilityReport() {
        Map<String, Object> report = new HashMap<>();
        
        // Statistiques générales
        report.put("totalGrofiHeroes", grofiHeroes.size());
        report.put("loadedSuccessfully", grofiHeroes.values().stream()
            .mapToInt(data -> data.name != null ? 1 : 0).sum());
        
        // Analyse des formules
        int totalFormulas = 0;
        int validFormulas = 0;
        
        for (GrofiHeroData data : grofiHeroes.values()) {
            // Compter les formules d'artefacts
            for (Map<String, Object> artifact : data.startingArtifacts) {
                if (artifact.containsKey("formula")) {
                    totalFormulas++;
                    String formula = (String) artifact.get("formula");
                    if (isValidTemporalFormula(formula)) {
                        validFormulas++;
                    }
                }
            }
            
            // Compter les formules d'ultimate power
            if (data.ultimatePower.containsKey("formula")) {
                totalFormulas++;
                String formula = (String) data.ultimatePower.get("formula");
                if (isValidTemporalFormula(formula)) {
                    validFormulas++;
                }
            }
        }
        
        report.put("totalFormulas", totalFormulas);
        report.put("validFormulas", validFormulas);
        report.put("formulaCompatibility", totalFormulas > 0 ? (double) validFormulas / totalFormulas : 0.0);
        
        // Héros par rareté
        Map<String, Long> rarityCount = grofiHeroes.values().stream()
            .collect(Collectors.groupingBy(data -> data.rarity, Collectors.counting()));
        report.put("heroesByRarity", rarityCount);
        
        return report;
    }
    
    /**
     * Vérifier si une formule temporelle est valide (syntaxe de base)
     */
    private boolean isValidTemporalFormula(String formula) {
        if (formula == null || formula.trim().isEmpty()) {
            return false;
        }
        
        // Vérifications basiques de syntaxe GROFI
        return formula.contains("⊙") || 
               formula.contains("†") || 
               formula.contains("Π") || 
               formula.contains("Ω") || 
               formula.contains("Λ") || 
               formula.contains("Σ") || 
               formula.contains("↯") ||
               formula.contains("HERO") ||
               formula.contains("ZONE") ||
               formula.contains("IF");
    }
} 