package com.example.demo.controller;

import org.springframework.core.io.ClassPathResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.JsonNode;

import java.io.IOException;
import java.io.InputStream;

@RestController
@RequestMapping("/api/epic")
@CrossOrigin(origins = "*")
public class EpicContentController {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @GetMapping("/heroes")
    public ResponseEntity<JsonNode> getEpicHeroes() {
        try {
            ClassPathResource resource = new ClassPathResource("epic-heroes.json");
            InputStream inputStream = resource.getInputStream();
            JsonNode heroesData = objectMapper.readTree(inputStream);
            return ResponseEntity.ok(heroesData);
        } catch (IOException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/creatures")
    public ResponseEntity<JsonNode> getEpicCreatures() {
        try {
            ClassPathResource resource = new ClassPathResource("epic-creatures.json");
            InputStream inputStream = resource.getInputStream();
            JsonNode creaturesData = objectMapper.readTree(inputStream);
            return ResponseEntity.ok(creaturesData);
        } catch (IOException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/heroes/{id}")
    public ResponseEntity<JsonNode> getHeroById(@PathVariable String id) {
        try {
            ClassPathResource resource = new ClassPathResource("epic-heroes.json");
            InputStream inputStream = resource.getInputStream();
            JsonNode heroesData = objectMapper.readTree(inputStream);
            
            for (JsonNode hero : heroesData.get("epic_heroes")) {
                if (hero.get("id").asText().equals(id)) {
                    return ResponseEntity.ok(hero);
                }
            }
            
            return ResponseEntity.notFound().build();
        } catch (IOException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/creatures/{id}")
    public ResponseEntity<JsonNode> getCreatureById(@PathVariable String id) {
        try {
            ClassPathResource resource = new ClassPathResource("epic-creatures.json");
            InputStream inputStream = resource.getInputStream();
            JsonNode creaturesData = objectMapper.readTree(inputStream);
            
            for (JsonNode creature : creaturesData.get("epic_creatures")) {
                if (creature.get("id").asText().equals(id)) {
                    return ResponseEntity.ok(creature);
                }
            }
            
            return ResponseEntity.notFound().build();
        } catch (IOException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/heroes/race/{race}")
    public ResponseEntity<JsonNode> getHeroesByRace(@PathVariable String race) {
        try {
            ClassPathResource resource = new ClassPathResource("epic-heroes.json");
            InputStream inputStream = resource.getInputStream();
            JsonNode heroesData = objectMapper.readTree(inputStream);
            
            JsonNode heroesArray = heroesData.get("epic_heroes");
            JsonNode filteredHeroes = objectMapper.createArrayNode();
            
            for (JsonNode hero : heroesArray) {
                if (hero.get("race").asText().equalsIgnoreCase(race)) {
                    ((com.fasterxml.jackson.databind.node.ArrayNode) filteredHeroes).add(hero);
                }
            }
            
            return ResponseEntity.ok(filteredHeroes);
        } catch (IOException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/creatures/race/{race}")
    public ResponseEntity<JsonNode> getCreaturesByRace(@PathVariable String race) {
        try {
            ClassPathResource resource = new ClassPathResource("epic-creatures.json");
            InputStream inputStream = resource.getInputStream();
            JsonNode creaturesData = objectMapper.readTree(inputStream);
            
            JsonNode creaturesArray = creaturesData.get("epic_creatures");
            JsonNode filteredCreatures = objectMapper.createArrayNode();
            
            for (JsonNode creature : creaturesArray) {
                if (creature.get("race").asText().equalsIgnoreCase(race)) {
                    ((com.fasterxml.jackson.databind.node.ArrayNode) filteredCreatures).add(creature);
                }
            }
            
            return ResponseEntity.ok(filteredCreatures);
        } catch (IOException e) {
            return ResponseEntity.notFound().build();
        }
    }
} 