package com.heroesoftimepoc.temporalengine.service;

import com.heroesoftimepoc.temporalengine.model.Game;
import com.heroesoftimepoc.temporalengine.repository.GameRepository;
import com.heroesoftimepoc.temporalengine.repository.HeroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class GameScriptService {

    @Autowired
    private TemporalEngineService temporalEngineService;
    
    @Autowired
    private GameRepository gameRepository;
    
    @Autowired
    private HeroRepository heroRepository;

    /**
     * Exécute un script .hots avec options
     */
    public Map<String, Object> executeScriptFile(String scriptPath, String parser, Long gameId, Map<String, Object> options) {
        Map<String, Object> result = new HashMap<>();
        
        try {
            // Lire le script
            List<String> commands = readScriptFile(scriptPath);
            
            // Préparer les statistiques
            ScriptExecutionStats stats = new ScriptExecutionStats();
            stats.startTime = System.currentTimeMillis();
            
            // Créer un nouveau jeu si nécessaire
            Game game;
            if (gameId == null) {
                game = createGameFromScript(commands);
                gameId = game.getId();
            } else {
                game = gameRepository.findById(gameId)
                    .orElseThrow(() -> new RuntimeException("Game not found"));
            }
            
            // Configurer le parser
            boolean useBenchmark = (Boolean) options.getOrDefault("benchmark", false);
            boolean verbose = (Boolean) options.getOrDefault("verbose", false);
            
            if (useBenchmark) {
                result = executeBenchmarkMode(commands, gameId, parser, stats, verbose);
            } else {
                result = executeNormalMode(commands, gameId, parser, stats, verbose);
            }
            
            stats.endTime = System.currentTimeMillis();
            result.put("gameId", gameId);
            result.put("scriptPath", scriptPath);
            result.put("parser", parser);
            result.put("stats", stats.toMap());
            
        } catch (Exception e) {
            result.put("success", false);
            result.put("error", e.getMessage());
        }
        
        return result;
    }
    
    /**
     * Lit un fichier script depuis les resources
     */
    private List<String> readScriptFile(String scriptPath) throws IOException {
        ClassPathResource resource = new ClassPathResource("scripts/" + scriptPath);
        List<String> commands = new ArrayList<>();
        
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(resource.getInputStream()))) {
            String line;
            while ((line = reader.readLine()) != null) {
                line = line.trim();
                
                // Ignorer les commentaires et lignes vides
                if (line.isEmpty() || line.startsWith("#")) {
                    continue;
                }
                
                commands.add(line);
            }
        }
        
        return commands;
    }
    
    /**
     * Crée un nouveau jeu à partir des métadonnées du script
     */
    private Game createGameFromScript(List<String> commands) {
        String gameName = "Script Game";
        
        // Chercher le nom du jeu dans les commandes
        for (String command : commands) {
            if (command.startsWith("GAME:")) {
                gameName = command.substring(5).trim().replaceAll("\"", "");
                break;
            }
        }
        
        Game game = new Game();
        game.setGameName(gameName);
        game.setCurrentPlayer("Player1");
        game.setStatus("ACTIVE");
        game.setMapWidth(50);
        game.setMapHeight(50);
        game.setCurrentTimeline("α");
        game.setCurrentTurn(1);
        
        return gameRepository.save(game);
    }
    
    /**
     * Exécute en mode normal
     */
    private Map<String, Object> executeNormalMode(List<String> commands, Long gameId, String parser, ScriptExecutionStats stats, boolean verbose) {
        Map<String, Object> result = new HashMap<>();
        List<String> executionLog = new ArrayList<>();
        
        // Configurer le parser
        System.setProperty("heroes.parser.use.antlr", "antlr4".equals(parser) ? "true" : "false");
        
        int successCount = 0;
        int errorCount = 0;
        
        for (String command : commands) {
            try {
                if (command.startsWith("GAME:")) {
                    continue; // Déjà traité
                }
                
                Map<String, Object> commandResult;
                
                if (command.equals("NEXT_TURN")) {
                    commandResult = temporalEngineService.nextTurn(gameId);
                } else {
                    commandResult = temporalEngineService.executeScript(gameId, command);
                }
                
                boolean success = (Boolean) commandResult.getOrDefault("success", false);
                
                if (success) {
                    successCount++;
                } else {
                    errorCount++;
                }
                
                if (verbose) {
                    String status = success ? "✅" : "❌";
                    executionLog.add(String.format("%s %s", status, command));
                }
                
                stats.totalCommands++;
                
            } catch (Exception e) {
                errorCount++;
                stats.totalCommands++;
                
                if (verbose) {
                    executionLog.add(String.format("❌ %s (ERROR: %s)", command, e.getMessage()));
                }
            }
        }
        
        result.put("success", errorCount == 0);
        result.put("successCount", successCount);
        result.put("errorCount", errorCount);
        result.put("totalCommands", stats.totalCommands);
        
        if (verbose) {
            result.put("executionLog", executionLog);
        }
        
        return result;
    }
    
    /**
     * Exécute en mode benchmark
     */
    private Map<String, Object> executeBenchmarkMode(List<String> commands, Long gameId, String parser, ScriptExecutionStats stats, boolean verbose) {
        Map<String, Object> result = new HashMap<>();
        
        // Exécuter avec REGEX
        System.setProperty("heroes.parser.use.antlr", "false");
        Map<String, Object> regexResult = executeNormalMode(commands, gameId, "regex", stats, false);
        long regexTime = System.currentTimeMillis() - stats.startTime;
        
        // Reset du jeu pour le test ANTLR
        gameRepository.deleteById(gameId);
        Game newGame = createGameFromScript(commands);
        gameId = newGame.getId();
        
        // Exécuter avec ANTLR4
        stats.startTime = System.currentTimeMillis();
        System.setProperty("heroes.parser.use.antlr", "true");
        Map<String, Object> antlrResult = executeNormalMode(commands, gameId, "antlr4", stats, false);
        long antlrTime = System.currentTimeMillis() - stats.startTime;
        
        // Calculer les performances
        double regexOpsPerSec = (double) stats.totalCommands / (regexTime / 1000.0);
        double antlrOpsPerSec = (double) stats.totalCommands / (antlrTime / 1000.0);
        
        result.put("success", true);
        result.put("benchmark", Map.of(
            "regex", Map.of(
                "time", regexTime,
                "opsPerSec", regexOpsPerSec,
                "success", regexResult.get("success"),
                "successCount", regexResult.get("successCount"),
                "errorCount", regexResult.get("errorCount")
            ),
            "antlr4", Map.of(
                "time", antlrTime,
                "opsPerSec", antlrOpsPerSec,
                "success", antlrResult.get("success"),
                "successCount", antlrResult.get("successCount"),
                "errorCount", antlrResult.get("errorCount")
            )
        ));
        
        return result;
    }
    
    /**
     * Liste les scripts disponibles
     */
    public Map<String, Object> listAvailableScripts() {
        Map<String, Object> result = new HashMap<>();
        
        try {
            Map<String, List<String>> scripts = new HashMap<>();
            
            // Simuler la liste des scripts (en production, on scannerait les resources)
            scripts.put("scenarios", Arrays.asList("epic-arthur-vs-ragnar.hots"));
            scripts.put("tests", Arrays.asList("parser-comparison.hots", "temporal-stress-test.hots"));
            scripts.put("demos", Arrays.asList("simple-game.hots"));
            
            result.put("success", true);
            result.put("scripts", scripts);
            
        } catch (Exception e) {
            result.put("success", false);
            result.put("error", e.getMessage());
        }
        
        return result;
    }
    
    /**
     * Classe pour les statistiques d'exécution
     */
    private static class ScriptExecutionStats {
        long startTime;
        long endTime;
        int totalCommands = 0;
        
        Map<String, Object> toMap() {
            Map<String, Object> map = new HashMap<>();
            map.put("duration", endTime - startTime);
            map.put("totalCommands", totalCommands);
            map.put("avgTimePerCommand", totalCommands > 0 ? (double)(endTime - startTime) / totalCommands : 0);
            return map;
        }
    }
} 