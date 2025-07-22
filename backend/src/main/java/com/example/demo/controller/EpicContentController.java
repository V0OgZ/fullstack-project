package com.example.demo.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.MediaType;
import org.springframework.core.io.ClassPathResource;
import org.springframework.util.StreamUtils;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

@RestController
@RequestMapping("/api/epic")
@CrossOrigin(origins = "*")
public class EpicContentController {
    
    @GetMapping(value = "/heroes", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> getAllHeroes() {
        try {
            ClassPathResource resource = new ClassPathResource("epic-heroes.json");
            String content = StreamUtils.copyToString(resource.getInputStream(), StandardCharsets.UTF_8);
            return ResponseEntity.ok(content);
        } catch (IOException e) {
            return ResponseEntity.internalServerError().body("{\"error\":\"Failed to load heroes: " + e.getMessage() + "\"}");
        }
    }
    
    @GetMapping(value = "/creatures", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> getAllCreatures() {
        try {
            ClassPathResource resource = new ClassPathResource("epic-creatures.json");
            String content = StreamUtils.copyToString(resource.getInputStream(), StandardCharsets.UTF_8);
            return ResponseEntity.ok(content);
        } catch (IOException e) {
            return ResponseEntity.internalServerError().body("{\"error\":\"Failed to load creatures: " + e.getMessage() + "\"}");
        }
    }
    
    // TODO: Add individual hero/creature endpoints when needed
    @GetMapping("/heroes/{heroId}")
    public ResponseEntity<String> getHeroById(@PathVariable String heroId) {
        return ResponseEntity.status(404).body("{\"error\":\"Individual hero endpoint not implemented yet\"}");
    }
    
    @GetMapping("/creatures/{creatureId}")
    public ResponseEntity<String> getCreatureById(@PathVariable String creatureId) {
        return ResponseEntity.status(404).body("{\"error\":\"Individual creature endpoint not implemented yet\"}");
    }
} 