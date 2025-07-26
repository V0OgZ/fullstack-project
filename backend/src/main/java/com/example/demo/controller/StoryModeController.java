package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import com.example.demo.service.GameService;
import com.example.demo.service.ScenarioService;
import com.example.demo.model.GameState;
import java.util.Map;
import java.util.HashMap;
import java.util.List;
import java.util.ArrayList;
import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("/api/story")
@CrossOrigin(origins = "*")
public class StoryModeController {

    @Autowired
    private GameService gameService;

    @Autowired
    private ScenarioService scenarioService;

    // Données des chapitres
    private static final List<Map<String, Object>> CHAPTERS = new ArrayList<>();
    
    static {
        // Chapitre 1
        Map<String, Object> chapter1 = new HashMap<>();
        chapter1.put("id", 1);
        chapter1.put("title", "Le Réveil d'OPUS");
        chapter1.put("scenario", "opus_awakening.hots");
        chapter1.put("completed", false);
        CHAPTERS.add(chapter1);
        
        // Chapitre 2
        Map<String, Object> chapter2 = new HashMap<>();
        chapter2.put("id", 2);
        chapter2.put("title", "La Lampe de Platon");
        chapter2.put("scenario", "lamp_of_platon.hots");
        chapter2.put("completed", false);
        CHAPTERS.add(chapter2);
        
        // Chapitre 3
        Map<String, Object> chapter3 = new HashMap<>();
        chapter3.put("id", 3);
        chapter3.put("title", "L'Interstice");
        chapter3.put("scenario", "interstice_exploration.hots");
        chapter3.put("completed", false);
        CHAPTERS.add(chapter3);
        
        // Chapitre 4
        Map<String, Object> chapter4 = new HashMap<>();
        chapter4.put("id", 4);
        chapter4.put("title", "La Bataille du 4ème Mur");
        chapter4.put("scenario", "fourth_wall_battle.hots");
        chapter4.put("completed", false);
        CHAPTERS.add(chapter4);
        
        // Chapitre 5
        Map<String, Object> chapter5 = new HashMap<>();
        chapter5.put("id", 5);
        chapter5.put("title", "La Tour Sombre");
        chapter5.put("scenario", "chapter_5_dark_tower.hots");
        chapter5.put("completed", false);
        CHAPTERS.add(chapter5);
        
        // Chapitre 6
        Map<String, Object> chapter6 = new HashMap<>();
        chapter6.put("id", 6);
        chapter6.put("title", "La Convergence");
        chapter6.put("scenario", "final_convergence.hots");
        chapter6.put("completed", false);
        chapter6.put("locked", true);
        CHAPTERS.add(chapter6);
    }

    // État de progression
    private Map<String, Integer> playerProgress = new HashMap<>();

    @GetMapping("/chapters")
    public ResponseEntity<List<Map<String, Object>>> getChapters() {
        return ResponseEntity.ok(CHAPTERS);
    }

    @GetMapping("/chapter/{id}")
    public ResponseEntity<Map<String, Object>> getChapter(@PathVariable int id) {
        if (id < 1 || id > CHAPTERS.size()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(CHAPTERS.get(id - 1));
    }

    @PostMapping("/start/{chapterId}")
    public ResponseEntity<Map<String, Object>> startChapter(
            @PathVariable int chapterId,
            @RequestParam(required = false) String playerId) {
        
        if (chapterId < 1 || chapterId > CHAPTERS.size()) {
            return ResponseEntity.notFound().build();
        }

        Map<String, Object> chapter = CHAPTERS.get(chapterId - 1);
        String scenarioFile = (String) chapter.get("scenario");

        try {
            // Créer une nouvelle partie avec le scénario du chapitre
            Map<String, Object> gameConfig = new HashMap<>();
            gameConfig.put("scenario", scenarioFile);
            gameConfig.put("chapterId", chapterId);
            gameConfig.put("storyMode", true);
            
            // Utiliser createGame au lieu de createStoryGame
            String gameId = "story_" + System.currentTimeMillis();
            Map<String, Object> game = gameService.createGame(gameId);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("gameId", gameId);
            response.put("chapter", chapter);
            response.put("message", "Chapitre " + chapterId + " démarré !");
            
            // Enregistrer la progression
            if (playerId != null) {
                playerProgress.put(playerId, chapterId);
            }
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    @PostMapping("/complete/{chapterId}")
    public ResponseEntity<Map<String, Object>> completeChapter(
            @PathVariable int chapterId,
            @RequestParam(required = false) String playerId) {
        
        if (chapterId < 1 || chapterId > CHAPTERS.size()) {
            return ResponseEntity.notFound().build();
        }

        Map<String, Object> chapter = CHAPTERS.get(chapterId - 1);
        chapter.put("completed", true);
        
        // Débloquer le chapitre suivant
        if (chapterId < CHAPTERS.size()) {
            Map<String, Object> nextChapter = CHAPTERS.get(chapterId);
            nextChapter.remove("locked");
        }
        
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("chapterCompleted", chapterId);
        response.put("nextChapterUnlocked", chapterId < CHAPTERS.size());
        
        // Enregistrer la progression
        if (playerId != null && chapterId >= playerProgress.getOrDefault(playerId, 0)) {
            playerProgress.put(playerId, chapterId + 1);
        }
        
        return ResponseEntity.ok(response);
    }

    @GetMapping("/progress/{playerId}")
    public ResponseEntity<Map<String, Object>> getProgress(@PathVariable String playerId) {
        Map<String, Object> response = new HashMap<>();
        response.put("playerId", playerId);
        response.put("currentChapter", playerProgress.getOrDefault(playerId, 1));
        response.put("completedChapters", getCompletedChapters());
        response.put("totalChapters", CHAPTERS.size());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/dialogue/{chapterId}")
    public ResponseEntity<Map<String, Object>> getDialogue(
            @PathVariable int chapterId,
            @RequestBody Map<String, String> choice) {
        
        Map<String, Object> response = new HashMap<>();
        String choiceId = choice.get("choice");
        
        // Dialogues spécifiques pour le chapitre 5 (Tour Sombre)
        if (chapterId == 5) {
            switch (choiceId) {
                case "ascend":
                    response.put("text", "Les héros commencent l'ascension de la Tour Sombre...");
                    response.put("next", "level1");
                    break;
                case "memory":
                    response.put("text", "Memento révèle ses souvenirs des cycles précédents...");
                    response.put("next", "revelation");
                    break;
                case "prepare":
                    response.put("text", "L'équipe se prépare pour l'ascension finale...");
                    response.put("next", "ready");
                    break;
                default:
                    response.put("text", "Choix inconnu");
            }
        }
        
        return ResponseEntity.ok(response);
    }

    @GetMapping("/save/{playerId}")
    public ResponseEntity<Map<String, Object>> saveProgress(@PathVariable String playerId) {
        Map<String, Object> saveData = new HashMap<>();
        saveData.put("playerId", playerId);
        saveData.put("progress", playerProgress.getOrDefault(playerId, 1));
        saveData.put("chapters", CHAPTERS);
        saveData.put("timestamp", System.currentTimeMillis());
        
        // Ici on pourrait sauvegarder dans une base de données
        
        return ResponseEntity.ok(saveData);
    }

    private List<Integer> getCompletedChapters() {
        List<Integer> completed = new ArrayList<>();
        for (int i = 0; i < CHAPTERS.size(); i++) {
            if ((boolean) CHAPTERS.get(i).getOrDefault("completed", false)) {
                completed.add(i + 1);
            }
        }
        return completed;
    }
}