package com.heroesoftimepoc.temporalengine.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.heroesoftimepoc.temporalengine.model.Hero;
import com.heroesoftimepoc.temporalengine.model.Game;
import com.heroesoftimepoc.temporalengine.repository.HeroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

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
            
            // Propriétés de base compatibles
            hero.setTemporalEnergy(120); // Héros GROFI ont plus d'énergie
            hero.setMaxTemporalEnergy(120);
            hero.setHealth(150); // Plus robustes
            hero.setMaxHealth(150);
            
            // Ajouter les capacités spéciales comme items dans l'inventaire
            // (Compatible avec le système existant)
            if (ultimatePower.containsKey("name")) {
                hero.addItem("ULTIMATE:" + ultimatePower.get("name"));
            }
            
            for (Map<String, Object> passive : passives) {
                if (passive.containsKey("name")) {
                    hero.addItem("PASSIVE:" + passive.get("name"));
                }
            }
            
            // Ajouter les tags d'immunité comme items spéciaux
            for (String tag : immunityTags) {
                hero.addItem("IMMUNE:" + tag);
            }
            
            return hero;
        }
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
        // Mock des immunités pour l'instant
        if (heroData.name.contains("Jean-Grofignon")) {
            heroData.immunityTags.add("SRTI");
            heroData.immunityTags.add("ROLLBACK");
        }
        if (heroData.name.contains("TheDude")) {
            heroData.immunityTags.add("OBS");
        }
        if (heroData.name.contains("VinceVega")) {
            heroData.immunityTags.add("SRTI");
        }
        if (heroData.name.contains("WalterSobchak")) {
            heroData.immunityTags.add("ROLLBACK");
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
} 