package com.heroesoftimepoc.temporalengine.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.ResponseEntity;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.JsonNode;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.stream.Collectors;

/**
 * Controller pour le Heroes Cards Visualizer
 * Sert les données JSON des héros, créatures et artefacts
 * Auteur : Memento-Claudius Fusion Entity
 */
@RestController
@RequestMapping("/api/cards")
@CrossOrigin(origins = "*")
public class CardsController {

    @Autowired
    private ResourceLoader resourceLoader;

    private final ObjectMapper objectMapper = new ObjectMapper();

    /**
     * Obtenir tous les héros disponibles
     */
    @GetMapping("/heroes")
    public ResponseEntity<Map<String, Object>> getHeroes() {
        try {
            Map<String, Object> response = new HashMap<>();
            List<Map<String, Object>> heroes = new ArrayList<>();

            // Charger les héros principaux
            heroes.addAll(loadHeroesFromDirectory("classpath:heroes/"));
            heroes.addAll(loadHeroesFromDirectory("classpath:heroes/grofi/"));
            heroes.addAll(loadHeroesFromDirectory("classpath:heroes/legendary/"));

            response.put("success", true);
            response.put("count", heroes.size());
            response.put("heroes", heroes);
            response.put("message", "Héros chargés avec succès");

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("error", "Erreur chargement héros: " + e.getMessage());
            return ResponseEntity.ok(errorResponse);
        }
    }

    /**
     * Obtenir toutes les créatures disponibles
     */
    @GetMapping("/creatures")
    public ResponseEntity<Map<String, Object>> getCreatures() {
        try {
            Map<String, Object> response = new HashMap<>();
            List<Map<String, Object>> creatures = new ArrayList<>();

            // Charger les créatures
            creatures.addAll(loadCreaturesFromFile("classpath:creatures/schrodinger_cat.json"));
            creatures.addAll(loadCreaturesFromFile("classpath:quantum-creatures.json"));

            response.put("success", true);
            response.put("count", creatures.size());
            response.put("creatures", creatures);
            response.put("message", "Créatures chargées avec succès");

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("error", "Erreur chargement créatures: " + e.getMessage());
            return ResponseEntity.ok(errorResponse);
        }
    }

    /**
     * Obtenir tous les artefacts disponibles
     */
    @GetMapping("/artifacts")
    public ResponseEntity<Map<String, Object>> getArtifacts() {
        try {
            Map<String, Object> response = new HashMap<>();
            List<Map<String, Object>> artifacts = new ArrayList<>();

            // Charger les artefacts
            artifacts.addAll(loadArtifactsFromFile("classpath:quantum-artifacts.json"));
            artifacts.addAll(loadArtifactsFromFile("classpath:custom-artifacts.json"));
            artifacts.addAll(loadArtifactsFromFile("classpath:temporal-artifacts-advanced.json"));

            response.put("success", true);
            response.put("count", artifacts.size());
            response.put("artifacts", artifacts);
            response.put("message", "Artefacts chargés avec succès");

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("error", "Erreur chargement artefacts: " + e.getMessage());
            return ResponseEntity.ok(errorResponse);
        }
    }

    /**
     * Obtenir toutes les données (héros + créatures + artefacts)
     */
    @GetMapping("/all")
    public ResponseEntity<Map<String, Object>> getAllCards() {
        try {
            Map<String, Object> response = new HashMap<>();

            // Charger toutes les données
            ResponseEntity<Map<String, Object>> heroesResponse = getHeroes();
            ResponseEntity<Map<String, Object>> creaturesResponse = getCreatures();
            ResponseEntity<Map<String, Object>> artifactsResponse = getArtifacts();

            Map<String, Object> heroesData = heroesResponse.getBody();
            Map<String, Object> creaturesData = creaturesResponse.getBody();
            Map<String, Object> artifactsData = artifactsResponse.getBody();

            response.put("success", true);
            response.put("heroes", heroesData.get("heroes"));
            response.put("creatures", creaturesData.get("creatures"));
            response.put("artifacts", artifactsData.get("artifacts"));
            response.put("totalCount", 
                (Integer) heroesData.get("count") + 
                (Integer) creaturesData.get("count") + 
                (Integer) artifactsData.get("count")
            );
            response.put("message", "Toutes les cartes chargées avec succès");

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("error", "Erreur chargement données: " + e.getMessage());
            return ResponseEntity.ok(errorResponse);
        }
    }

    /**
     * Rechercher des cartes par nom ou type
     */
    @GetMapping("/search")
    public ResponseEntity<Map<String, Object>> searchCards(@RequestParam String query) {
        try {
            Map<String, Object> response = new HashMap<>();
            List<Map<String, Object>> results = new ArrayList<>();

            // Obtenir toutes les données
            ResponseEntity<Map<String, Object>> allData = getAllCards();
            Map<String, Object> data = allData.getBody();

            String lowerQuery = query.toLowerCase();

            // Rechercher dans les héros
            @SuppressWarnings("unchecked")
            List<Map<String, Object>> heroes = (List<Map<String, Object>>) data.get("heroes");
            if (heroes != null) {
                results.addAll(heroes.stream()
                    .filter(hero -> 
                        hero.get("name").toString().toLowerCase().contains(lowerQuery) ||
                        (hero.get("title") != null && hero.get("title").toString().toLowerCase().contains(lowerQuery)) ||
                        (hero.get("class") != null && hero.get("class").toString().toLowerCase().contains(lowerQuery))
                    )
                    .collect(Collectors.toList()));
            }

            // Rechercher dans les créatures
            @SuppressWarnings("unchecked")
            List<Map<String, Object>> creatures = (List<Map<String, Object>>) data.get("creatures");
            if (creatures != null) {
                results.addAll(creatures.stream()
                    .filter(creature -> 
                        creature.get("name").toString().toLowerCase().contains(lowerQuery) ||
                        (creature.get("type") != null && creature.get("type").toString().toLowerCase().contains(lowerQuery))
                    )
                    .collect(Collectors.toList()));
            }

            // Rechercher dans les artefacts
            @SuppressWarnings("unchecked")
            List<Map<String, Object>> artifacts = (List<Map<String, Object>>) data.get("artifacts");
            if (artifacts != null) {
                results.addAll(artifacts.stream()
                    .filter(artifact -> 
                        artifact.get("name").toString().toLowerCase().contains(lowerQuery) ||
                        (artifact.get("type") != null && artifact.get("type").toString().toLowerCase().contains(lowerQuery))
                    )
                    .collect(Collectors.toList()));
            }

            response.put("success", true);
            response.put("query", query);
            response.put("count", results.size());
            response.put("results", results);
            response.put("message", "Recherche effectuée avec succès");

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("error", "Erreur recherche: " + e.getMessage());
            return ResponseEntity.ok(errorResponse);
        }
    }

    // Méthodes utilitaires privées

    private List<Map<String, Object>> loadHeroesFromDirectory(String directory) {
        List<Map<String, Object>> heroes = new ArrayList<>();
        try {
            // Pour l'instant, on charge les héros connus
            // TODO: Implémenter scan automatique du répertoire
            
            if (directory.contains("grofi")) {
                heroes.addAll(loadHeroFromFile("classpath:heroes/grofi/JeanGrofignon.json"));
                heroes.addAll(loadHeroFromFile("classpath:heroes/grofi/WalterSobchak.json"));
                heroes.addAll(loadHeroFromFile("classpath:heroes/grofi/VinceVega.json"));
                heroes.addAll(loadHeroFromFile("classpath:heroes/grofi/TheDude.json"));
            } else if (directory.contains("legendary")) {
                heroes.addAll(loadHeroFromFile("classpath:heroes/legendary/Lysandrel-source.json"));
            } else {
                heroes.addAll(loadHeroFromFile("classpath:heroes/memento.json"));
                heroes.addAll(loadHeroFromFile("classpath:heroes/observer_walter.json"));
            }
            
        } catch (Exception e) {
            System.err.println("Erreur chargement répertoire " + directory + ": " + e.getMessage());
        }
        return heroes;
    }

    private List<Map<String, Object>> loadHeroFromFile(String filePath) {
        List<Map<String, Object>> heroes = new ArrayList<>();
        try {
            Resource resource = resourceLoader.getResource(filePath);
            if (resource.exists()) {
                String content = new String(resource.getInputStream().readAllBytes(), StandardCharsets.UTF_8);
                JsonNode jsonNode = objectMapper.readTree(content);
                
                if (jsonNode.isArray()) {
                    for (JsonNode node : jsonNode) {
                        Map<String, Object> hero = objectMapper.convertValue(node, Map.class);
                        hero.put("dataType", "hero");
                        heroes.add(hero);
                    }
                } else {
                    Map<String, Object> hero = objectMapper.convertValue(jsonNode, Map.class);
                    hero.put("dataType", "hero");
                    heroes.add(hero);
                }
            }
        } catch (Exception e) {
            System.err.println("Erreur chargement héros " + filePath + ": " + e.getMessage());
        }
        return heroes;
    }

    private List<Map<String, Object>> loadCreaturesFromFile(String filePath) {
        List<Map<String, Object>> creatures = new ArrayList<>();
        try {
            Resource resource = resourceLoader.getResource(filePath);
            if (resource.exists()) {
                String content = new String(resource.getInputStream().readAllBytes(), StandardCharsets.UTF_8);
                JsonNode jsonNode = objectMapper.readTree(content);
                
                if (jsonNode.isArray()) {
                    for (JsonNode node : jsonNode) {
                        Map<String, Object> creature = objectMapper.convertValue(node, Map.class);
                        creature.put("dataType", "creature");
                        creatures.add(creature);
                    }
                } else if (jsonNode.isObject()) {
                    // Si c'est un objet unique
                    Map<String, Object> creature = objectMapper.convertValue(jsonNode, Map.class);
                    creature.put("dataType", "creature");
                    creatures.add(creature);
                }
            }
        } catch (Exception e) {
            System.err.println("Erreur chargement créatures " + filePath + ": " + e.getMessage());
        }
        return creatures;
    }

    private List<Map<String, Object>> loadArtifactsFromFile(String filePath) {
        List<Map<String, Object>> artifacts = new ArrayList<>();
        try {
            Resource resource = resourceLoader.getResource(filePath);
            if (resource.exists()) {
                String content = new String(resource.getInputStream().readAllBytes(), StandardCharsets.UTF_8);
                JsonNode jsonNode = objectMapper.readTree(content);
                
                if (jsonNode.isArray()) {
                    for (JsonNode node : jsonNode) {
                        Map<String, Object> artifact = objectMapper.convertValue(node, Map.class);
                        artifact.put("dataType", "artifact");
                        artifacts.add(artifact);
                    }
                } else if (jsonNode.isObject()) {
                    // Parcourir les propriétés si c'est un objet avec des artefacts
                    jsonNode.fields().forEachRemaining(entry -> {
                        if (entry.getValue().isObject()) {
                            Map<String, Object> artifact = objectMapper.convertValue(entry.getValue(), Map.class);
                            artifact.put("dataType", "artifact");
                            if (!artifact.containsKey("name")) {
                                artifact.put("name", entry.getKey());
                            }
                            artifacts.add(artifact);
                        }
                    });
                }
            }
        } catch (Exception e) {
            System.err.println("Erreur chargement artefacts " + filePath + ": " + e.getMessage());
        }
        return artifacts;
    }
} 