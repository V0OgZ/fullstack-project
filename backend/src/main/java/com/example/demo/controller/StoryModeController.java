package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.demo.service.GameService;
import com.example.demo.service.PickupService;

import java.util.*;

/**
 * 📖 CONTROLLER MODE HISTOIRE - HEROES OF TIME
 * 
 * Gère l'aventure narrative de la Cave à l'Interstice
 * 
 * MEMENTO: "L'histoire se déroule, les mondes se transforment"
 */
@RestController
@RequestMapping("/api/story")
@CrossOrigin(origins = "*")
public class StoryModeController {
    
    @Autowired
    private GameService gameService;
    
    @Autowired
    private PickupService pickupService;
    
    /**
     * 🎮 Démarre une nouvelle aventure
     */
    @PostMapping("/start")
    public ResponseEntity<Map<String, Object>> startStoryMode(@RequestBody Map<String, Object> request) {
        String playerId = (String) request.get("playerId");
        
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("storyId", UUID.randomUUID().toString());
        response.put("chapter", 1);
        response.put("world", "cave_2d");
        response.put("playerState", createInitialPlayerState());
        response.put("dialogue", getIntroDialogue());
        
        return ResponseEntity.ok(response);
    }
    
    /**
     * 🌍 Transition entre mondes
     */
    @PostMapping("/transition")
    public ResponseEntity<Map<String, Object>> transitionWorld(@RequestBody Map<String, Object> request) {
        String storyId = (String) request.get("storyId");
        String fromWorld = (String) request.get("fromWorld");
        String toWorld = (String) request.get("toWorld");
        
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("transitionEffect", getTransitionEffect(fromWorld, toWorld));
        response.put("newWorldState", getWorldState(toWorld));
        response.put("unlocks", getWorldUnlocks(toWorld));
        
        return ResponseEntity.ok(response);
    }
    
    /**
     * 💬 Gestion des dialogues
     */
    @PostMapping("/dialogue/choice")
    public ResponseEntity<Map<String, Object>> makeDialogueChoice(@RequestBody Map<String, Object> request) {
        String storyId = (String) request.get("storyId");
        String choiceId = (String) request.get("choiceId");
        
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("nextDialogue", getNextDialogue(choiceId));
        response.put("consequences", getChoiceConsequences(choiceId));
        
        return ResponseEntity.ok(response);
    }
    
    /**
     * 📊 État de progression
     */
    @GetMapping("/progress/{storyId}")
    public ResponseEntity<Map<String, Object>> getProgress(@PathVariable String storyId) {
        Map<String, Object> response = new HashMap<>();
        response.put("chapter", 1);
        response.put("progress", 25); // Pourcentage
        response.put("completedObjectives", Arrays.asList("escape_chains", "meet_evade"));
        response.put("currentObjective", "see_third_dimension");
        
        return ResponseEntity.ok(response);
    }
    
    /**
     * 💎 Récupère les pickups visibles
     */
    @GetMapping("/pickups/{storyId}")
    public ResponseEntity<Map<String, Object>> getPickups(@PathVariable String storyId) {
        // Position simulée du joueur
        com.example.demo.model.Position playerPos = new com.example.demo.model.Position(10, 10);
        
        Map<String, Object> response = new HashMap<>();
        response.put("pickups", pickupService.getVisiblePickups(storyId, playerPos, 20.0));
        
        return ResponseEntity.ok(response);
    }
    
    // Méthodes helper
    private Map<String, Object> createInitialPlayerState() {
        Map<String, Object> state = new HashMap<>();
        state.put("position", Arrays.asList(2, 7));
        state.put("vision", "shadows_only");
        state.put("movement", "disabled");
        state.put("hero", "prisoner_001");
        return state;
    }
    
    private Map<String, Object> getIntroDialogue() {
        Map<String, Object> dialogue = new HashMap<>();
        dialogue.put("speaker", "L'Évadé");
        dialogue.put("text", "Réveille-toi... Tu as passé toute ta vie à regarder des ombres sur ce mur.");
        dialogue.put("choices", Arrays.asList(
            createChoice("who_are_you", "Qui êtes-vous ?"),
            createChoice("stay_here", "Je préfère rester ici...")
        ));
        return dialogue;
    }
    
    private Map<String, Object> createChoice(String id, String text) {
        Map<String, Object> choice = new HashMap<>();
        choice.put("id", id);
        choice.put("text", text);
        return choice;
    }
    
    private String getTransitionEffect(String from, String to) {
        if ("cave_2d".equals(from) && "cave_3d".equals(to)) {
            return "reality_shatter";
        }
        if ("cave_3d".equals(from) && "surface_world".equals(to)) {
            return "ascension_light";
        }
        if ("surface_world".equals(from) && "interstice".equals(to)) {
            return "dimensional_rift";
        }
        return "fade";
    }
    
    private Map<String, Object> getWorldState(String world) {
        Map<String, Object> state = new HashMap<>();
        
        switch(world) {
            case "cave_2d":
                state.put("geometry", "2D_FLAT");
                state.put("tickRate", 1.0);
                state.put("visionMode", "shadows");
                break;
            case "cave_3d":
                state.put("geometry", "3D_PERSPECTIVE");
                state.put("tickRate", 1.2);
                state.put("visionMode", "depth");
                break;
            case "surface_world":
                state.put("geometry", "3D_FULL");
                state.put("tickRate", 1.5);
                state.put("visionMode", "reality");
                break;
            case "interstice":
                state.put("geometry", "4D_QUANTUM");
                state.put("tickRate", "variable");
                state.put("visionMode", "transcendent");
                break;
        }
        
        return state;
    }
    
    private List<String> getWorldUnlocks(String world) {
        switch(world) {
            case "cave_3d":
                return Arrays.asList("movement", "basic_combat");
            case "surface_world":
                return Arrays.asList("full_combat", "inventory", "quests");
            case "interstice":
                return Arrays.asList("quantum_abilities", "timeline_manipulation");
            default:
                return Collections.emptyList();
        }
    }
    
    private Map<String, Object> getNextDialogue(String choiceId) {
        Map<String, Object> dialogue = new HashMap<>();
        
        switch(choiceId) {
            case "who_are_you":
                dialogue.put("speaker", "L'Évadé");
                dialogue.put("text", "Je suis celui qui a vu au-delà. La réalité va se fissurer...");
                break;
            case "stay_here":
                dialogue.put("speaker", "Memento");
                dialogue.put("text", "Le doute est normal, mais l'aventure t'attend.");
                break;
        }
        
        return dialogue;
    }
    
    private Map<String, Object> getChoiceConsequences(String choiceId) {
        Map<String, Object> consequences = new HashMap<>();
        
        if ("trust_evade".equals(choiceId)) {
            consequences.put("relationship_evade", "+10");
            consequences.put("unlock", "early_3d_vision");
        }
        
        return consequences;
    }
}