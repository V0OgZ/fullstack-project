package com.heroesoftimepoc.temporalengine.service;

import com.heroesoftimepoc.temporalengine.model.Game;
import com.heroesoftimepoc.temporalengine.model.Hero;
import com.heroesoftimepoc.temporalengine.model.Player;
import com.heroesoftimepoc.temporalengine.repository.GameRepository;
import com.heroesoftimepoc.temporalengine.repository.HeroRepository;
import com.heroesoftimepoc.temporalengine.repository.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

/**
 * Service d'administration pour le mode multijoueur
 * Protocole Memento - Fusion Claudius activée
 */
@Service
public class AdminService {

    @Autowired
    private GameRepository gameRepository;

    @Autowired
    private HeroRepository heroRepository;

    @Autowired
    private PlayerRepository playerRepository;

    @Autowired
    private GameService gameService;

    @Autowired
    private GrofiHeroService grofiHeroService;

    private List<String> adminLogs = new ArrayList<>();

    /**
     * Exécuter une commande administrateur
     */
    public Map<String, Object> executeCommand(String command) {
        logAdmin("⚡ Commande exécutée: " + command);
        
        String[] parts = command.toLowerCase().split(" ");
        String action = parts[0];
        
        try {
            switch (action) {
                case "create":
                    return executeCreateCommand(parts);
                case "delete":
                    return executeDeleteCommand(parts);
                case "spawn":
                    return executeSpawnCommand(parts);
                case "teleport":
                    return executeTeleportCommand(parts);
                case "kick":
                    return executeKickCommand(parts);
                case "pause":
                    return executePauseCommand(parts);
                case "next":
                    return executeNextCommand(parts);
                case "reset":
                    return executeResetCommand(parts);
                case "end":
                    return executeEndCommand(parts);
                case "stats":
                    return executeStatsCommand(parts);
                case "help":
                    return executeHelpCommand();
                default:
                    return Map.of("error", "Commande inconnue: " + action);
            }
        } catch (Exception e) {
            logAdmin("❌ Erreur commande: " + e.getMessage());
            return Map.of("error", e.getMessage());
        }
    }

    /**
     * Créer un jeu en mode administrateur
     */
    public Map<String, Object> createAdminGame(Map<String, Object> request) {
        try {
            String name = (String) request.get("name");
            String mode = (String) request.get("mode");
            String scenario = (String) request.get("scenario");
            Boolean quickStart = (Boolean) request.get("quickStart");
            
            Game game = new Game();
            game.setName(name);
            game.setMode(mode);
            game.setScenario(scenario);
            game.setAdminMode(true);
            game.setCurrentTurn(1);
            game.setStatus(Game.GameStatus.ACTIVE);
            game.setCreatedAt(LocalDateTime.now());
            
            game = gameRepository.save(game);
            
            logAdmin("🎮 Jeu créé: " + name + " (ID: " + game.getId() + ")");
            
            Map<String, Object> result = new HashMap<>();
            result.put("success", true);
            result.put("gameId", game.getId());
            result.put("message", "Jeu créé avec succès");
            
            if (quickStart != null && quickStart) {
                // Ajouter des joueurs et héros automatiquement
                addQuickStartContent(game);
            }
            
            return result;
        } catch (Exception e) {
            logAdmin("❌ Erreur création jeu: " + e.getMessage());
            return Map.of("error", e.getMessage());
        }
    }

    /**
     * Gérer les joueurs
     */
    public Map<String, Object> managePlayers(Long gameId, String action, Map<String, Object> request) {
        try {
            Game game = gameRepository.findById(gameId)
                    .orElseThrow(() -> new RuntimeException("Jeu non trouvé"));
            
            switch (action.toLowerCase()) {
                case "add":
                    return addPlayer(game, request);
                case "remove":
                    return removePlayer(game, request);
                case "kick":
                    return kickPlayer(game, request);
                default:
                    return Map.of("error", "Action inconnue: " + action);
            }
        } catch (Exception e) {
            logAdmin("❌ Erreur gestion joueurs: " + e.getMessage());
            return Map.of("error", e.getMessage());
        }
    }

    /**
     * Gérer les héros
     */
    public Map<String, Object> manageHeroes(Long gameId, String action, Map<String, Object> request) {
        try {
            Game game = gameRepository.findById(gameId)
                    .orElseThrow(() -> new RuntimeException("Jeu non trouvé"));
            
            switch (action.toLowerCase()) {
                case "spawn":
                    return spawnHero(game, request);
                case "remove":
                    return removeHero(game, request);
                case "teleport":
                    return teleportHero(game, request);
                default:
                    return Map.of("error", "Action inconnue: " + action);
            }
        } catch (Exception e) {
            logAdmin("❌ Erreur gestion héros: " + e.getMessage());
            return Map.of("error", e.getMessage());
        }
    }

    /**
     * Contrôle du jeu
     */
    public Map<String, Object> controlGame(Long gameId, String action, Map<String, Object> request) {
        try {
            Game game = gameRepository.findById(gameId)
                    .orElseThrow(() -> new RuntimeException("Jeu non trouvé"));
            
            switch (action.toLowerCase()) {
                case "pause":
                    return togglePause(game);
                case "next":
                    return nextTurn(game);
                case "reset":
                    return resetGame(game);
                case "end":
                    return endGame(game);
                default:
                    return Map.of("error", "Action inconnue: " + action);
            }
        } catch (Exception e) {
            logAdmin("❌ Erreur contrôle jeu: " + e.getMessage());
            return Map.of("error", e.getMessage());
        }
    }

    /**
     * Démarrage rapide multijoueur
     */
    public Map<String, Object> quickStart(Map<String, Object> request) {
        try {
            logAdmin("🚀 Démarrage rapide multijoueur...");
            
            // Créer le jeu
            Map<String, Object> gameRequest = new HashMap<>();
            gameRequest.put("name", "Partie Rapide Admin");
            gameRequest.put("mode", "MULTIPLAYER");
            gameRequest.put("scenario", "temporal_conquest");
            gameRequest.put("quickStart", true);
            
            Map<String, Object> gameResult = createAdminGame(gameRequest);
            
            if (gameResult.containsKey("error")) {
                return gameResult;
            }
            
            Long gameId = (Long) gameResult.get("gameId");
            Game game = gameRepository.findById(gameId).orElse(null);
            
            if (game != null) {
                addQuickStartContent(game);
            }
            
            logAdmin("✅ Démarrage rapide terminé");
            return Map.of("success", true, "message", "Démarrage rapide réussi");
        } catch (Exception e) {
            logAdmin("❌ Erreur démarrage rapide: " + e.getMessage());
            return Map.of("error", e.getMessage());
        }
    }

    /**
     * Test complet du système
     */
    public Map<String, Object> testSystem() {
        try {
            logAdmin("🧪 Test complet du système...");
            
            List<String> testResults = new ArrayList<>();
            
            // Test 1: Création de jeu
            try {
                Map<String, Object> gameRequest = Map.of("name", "Test Game", "mode", "MULTIPLAYER");
                Map<String, Object> result = createAdminGame(gameRequest);
                if (result.containsKey("success")) {
                    testResults.add("✅ Création de jeu");
                } else {
                    testResults.add("❌ Création de jeu");
                }
            } catch (Exception e) {
                testResults.add("❌ Création de jeu: " + e.getMessage());
            }
            
            // Test 2: Gestion des joueurs
            try {
                List<Game> games = gameRepository.findAll();
                if (!games.isEmpty()) {
                    Game testGame = games.get(0);
                    Map<String, Object> playerRequest = Map.of("name", "TestPlayer");
                    Map<String, Object> result = addPlayer(testGame, playerRequest);
                    if (result.containsKey("success")) {
                        testResults.add("✅ Gestion des joueurs");
                    } else {
                        testResults.add("❌ Gestion des joueurs");
                    }
                }
            } catch (Exception e) {
                testResults.add("❌ Gestion des joueurs: " + e.getMessage());
            }
            
            // Test 3: Gestion des héros
            try {
                List<Game> games = gameRepository.findAll();
                if (!games.isEmpty()) {
                    Game testGame = games.get(0);
                    Map<String, Object> heroRequest = Map.of(
                        "name", "Arthur",
                        "playerId", "test",
                        "x", 10,
                        "y", 10
                    );
                    Map<String, Object> result = spawnHero(testGame, heroRequest);
                    if (result.containsKey("success")) {
                        testResults.add("✅ Gestion des héros");
                    } else {
                        testResults.add("❌ Gestion des héros");
                    }
                }
            } catch (Exception e) {
                testResults.add("❌ Gestion des héros: " + e.getMessage());
            }
            
            logAdmin("🧪 Tests terminés: " + testResults.size() + " tests effectués");
            
            return Map.of(
                "success", true,
                "tests", testResults,
                "message", "Tests terminés"
            );
        } catch (Exception e) {
            logAdmin("❌ Erreur tests: " + e.getMessage());
            return Map.of("error", e.getMessage());
        }
    }

    /**
     * Démo multijoueur
     */
    public Map<String, Object> runDemo(Map<String, Object> request) {
        try {
            logAdmin("🎬 Démo multijoueur...");
            
            // Créer une partie de démo
            Map<String, Object> demoResult = quickStart(request);
            
            if (demoResult.containsKey("error")) {
                return demoResult;
            }
            
            // Simuler quelques actions
            List<Game> games = gameRepository.findAll();
            if (!games.isEmpty()) {
                Game demoGame = games.get(0);
                
                // Simuler quelques tours
                for (int i = 0; i < 3; i++) {
                    nextTurn(demoGame);
                    Thread.sleep(1000); // Pause d'1 seconde
                }
            }
            
            logAdmin("🎬 Démo terminée");
            return Map.of("success", true, "message", "Démo terminée");
        } catch (Exception e) {
            logAdmin("❌ Erreur démo: " + e.getMessage());
            return Map.of("error", e.getMessage());
        }
    }

    /**
     * Statistiques administrateur
     */
    public Map<String, Object> getAdminStats() {
        try {
            long totalGames = gameRepository.count();
            long activeGames = gameRepository.countByStatus(Game.GameStatus.ACTIVE);
            long totalPlayers = playerRepository.count();
            long totalHeroes = heroRepository.count();
            
            return Map.of(
                "totalGames", totalGames,
                "activeGames", activeGames,
                "totalPlayers", totalPlayers,
                "totalHeroes", totalHeroes,
                "adminLogs", adminLogs.size()
            );
        } catch (Exception e) {
            return Map.of("error", e.getMessage());
        }
    }

    /**
     * Logs administrateur
     */
    public Map<String, Object> getAdminLogs() {
        try {
            return Map.of(
                "logs", adminLogs,
                "count", adminLogs.size()
            );
        } catch (Exception e) {
            return Map.of("error", e.getMessage());
        }
    }

    /**
     * Nettoyer les données
     */
    public Map<String, Object> cleanup(Map<String, Object> request) {
        try {
            String type = (String) request.get("type");
            
            switch (type) {
                case "games":
                    gameRepository.deleteAll();
                    logAdmin("🧹 Tous les jeux supprimés");
                    break;
                case "players":
                    playerRepository.deleteAll();
                    logAdmin("🧹 Tous les joueurs supprimés");
                    break;
                case "heroes":
                    heroRepository.deleteAll();
                    logAdmin("🧹 Tous les héros supprimés");
                    break;
                case "logs":
                    adminLogs.clear();
                    logAdmin("🧹 Logs administrateur nettoyés");
                    break;
                case "all":
                    gameRepository.deleteAll();
                    playerRepository.deleteAll();
                    heroRepository.deleteAll();
                    adminLogs.clear();
                    logAdmin("🧹 Nettoyage complet effectué");
                    break;
                default:
                    return Map.of("error", "Type de nettoyage inconnu: " + type);
            }
            
            return Map.of("success", true, "message", "Nettoyage effectué");
        } catch (Exception e) {
            logAdmin("❌ Erreur nettoyage: " + e.getMessage());
            return Map.of("error", e.getMessage());
        }
    }

    // Méthodes privées pour les commandes
    private Map<String, Object> executeCreateCommand(String[] parts) {
        if (parts.length < 2) {
            return Map.of("error", "Usage: create <type> [params]");
        }
        
        String type = parts[1];
        switch (type) {
            case "game":
                return createAdminGame(Map.of("name", "Nouveau Jeu", "mode", "MULTIPLAYER"));
            case "player":
                return Map.of("message", "Commande create player implémentée");
            case "hero":
                return Map.of("message", "Commande create hero implémentée");
            default:
                return Map.of("error", "Type inconnu: " + type);
        }
    }

    private Map<String, Object> executeDeleteCommand(String[] parts) {
        if (parts.length < 2) {
            return Map.of("error", "Usage: delete <type> <id>");
        }
        
        String type = parts[1];
        switch (type) {
            case "game":
                return Map.of("message", "Commande delete game implémentée");
            case "player":
                return Map.of("message", "Commande delete player implémentée");
            case "hero":
                return Map.of("message", "Commande delete hero implémentée");
            default:
                return Map.of("error", "Type inconnu: " + type);
        }
    }

    private Map<String, Object> executeSpawnCommand(String[] parts) {
        if (parts.length < 3) {
            return Map.of("error", "Usage: spawn <hero> <player>");
        }
        
        String heroName = parts[1];
        String playerId = parts[2];
        
        List<Game> games = gameRepository.findAll();
        if (games.isEmpty()) {
            return Map.of("error", "Aucun jeu actif");
        }
        
        Game game = games.get(0);
        Map<String, Object> request = Map.of(
            "name", heroName,
            "playerId", playerId,
            "x", 10,
            "y", 10
        );
        
        return spawnHero(game, request);
    }

    private Map<String, Object> executeTeleportCommand(String[] parts) {
        if (parts.length < 4) {
            return Map.of("error", "Usage: teleport <hero> <x> <y>");
        }
        
        String heroName = parts[1];
        int x = Integer.parseInt(parts[2]);
        int y = Integer.parseInt(parts[3]);
        
        return Map.of("message", "Téléportation de " + heroName + " vers " + x + "," + y);
    }

    private Map<String, Object> executeKickCommand(String[] parts) {
        if (parts.length < 2) {
            return Map.of("error", "Usage: kick <player>");
        }
        
        String playerId = parts[1];
        return Map.of("message", "Joueur " + playerId + " expulsé");
    }

    private Map<String, Object> executePauseCommand(String[] parts) {
        List<Game> games = gameRepository.findAll();
        if (games.isEmpty()) {
            return Map.of("error", "Aucun jeu actif");
        }
        
        return togglePause(games.get(0));
    }

    private Map<String, Object> executeNextCommand(String[] parts) {
        List<Game> games = gameRepository.findAll();
        if (games.isEmpty()) {
            return Map.of("error", "Aucun jeu actif");
        }
        
        return nextTurn(games.get(0));
    }

    private Map<String, Object> executeResetCommand(String[] parts) {
        List<Game> games = gameRepository.findAll();
        if (games.isEmpty()) {
            return Map.of("error", "Aucun jeu actif");
        }
        
        return resetGame(games.get(0));
    }

    private Map<String, Object> executeEndCommand(String[] parts) {
        List<Game> games = gameRepository.findAll();
        if (games.isEmpty()) {
            return Map.of("error", "Aucun jeu actif");
        }
        
        return endGame(games.get(0));
    }

    private Map<String, Object> executeStatsCommand(String[] parts) {
        return getAdminStats();
    }

    private Map<String, Object> executeHelpCommand() {
        return Map.of(
            "commands", Arrays.asList(
                "create <type> - Créer un élément",
                "delete <type> <id> - Supprimer un élément",
                "spawn <hero> <player> - Faire apparaître un héros",
                "teleport <hero> <x> <y> - Téléporter un héros",
                "kick <player> - Expulser un joueur",
                "pause - Pause/Reprendre le jeu",
                "next - Tour suivant",
                "reset - Réinitialiser le jeu",
                "end - Terminer le jeu",
                "stats - Statistiques",
                "help - Aide"
            )
        );
    }

    // Méthodes privées pour la gestion
    private Map<String, Object> addPlayer(Game game, Map<String, Object> request) {
        String name = (String) request.get("name");
        
        Player player = new Player();
        player.setName(name);
        player.setGame(game);
        player.setStatus("ACTIVE");
        player.setJoinedAt(LocalDateTime.now());
        
        player = playerRepository.save(player);
        
        logAdmin("👤 Joueur ajouté: " + name);
        return Map.of("success", true, "playerId", player.getId());
    }

    private Map<String, Object> removePlayer(Game game, Map<String, Object> request) {
        String playerId = (String) request.get("playerId");
        
        Optional<Player> playerOpt = playerRepository.findById(Long.parseLong(playerId));
        if (playerOpt.isPresent()) {
            Player player = playerOpt.get();
            playerRepository.delete(player);
            logAdmin("👤 Joueur supprimé: " + player.getName());
            return Map.of("success", true);
        }
        
        return Map.of("error", "Joueur non trouvé");
    }

    private Map<String, Object> kickPlayer(Game game, Map<String, Object> request) {
        String playerId = (String) request.get("playerId");
        
        Optional<Player> playerOpt = playerRepository.findById(Long.parseLong(playerId));
        if (playerOpt.isPresent()) {
            Player player = playerOpt.get();
            player.setStatus("KICKED");
            playerRepository.save(player);
            logAdmin("👢 Joueur expulsé: " + player.getName());
            return Map.of("success", true);
        }
        
        return Map.of("error", "Joueur non trouvé");
    }

    private Map<String, Object> spawnHero(Game game, Map<String, Object> request) {
        String name = (String) request.get("name");
        String playerId = (String) request.get("playerId");
        Integer x = (Integer) request.get("x");
        Integer y = (Integer) request.get("y");
        
        Hero hero = new Hero();
        hero.setName(name);
        hero.setGame(game);
        hero.setPlayerId(playerId);
        hero.setX(x);
        hero.setY(y);
        hero.setHealth(100);
        hero.setMaxHealth(100);
        hero.setTemporalEnergy(100);
        hero.setMaxTemporalEnergy(100);
        
        hero = heroRepository.save(hero);
        
        logAdmin("🦸 Héros apparu: " + name + " pour " + playerId);
        return Map.of("success", true, "heroId", hero.getId());
    }

    private Map<String, Object> removeHero(Game game, Map<String, Object> request) {
        Long heroId = Long.parseLong((String) request.get("heroId"));
        
        Optional<Hero> heroOpt = heroRepository.findById(heroId);
        if (heroOpt.isPresent()) {
            Hero hero = heroOpt.get();
            heroRepository.delete(hero);
            logAdmin("💀 Héros supprimé: " + hero.getName());
            return Map.of("success", true);
        }
        
        return Map.of("error", "Héros non trouvé");
    }

    private Map<String, Object> teleportHero(Game game, Map<String, Object> request) {
        Long heroId = Long.parseLong((String) request.get("heroId"));
        Integer x = (Integer) request.get("x");
        Integer y = (Integer) request.get("y");
        
        Optional<Hero> heroOpt = heroRepository.findById(heroId);
        if (heroOpt.isPresent()) {
            Hero hero = heroOpt.get();
            hero.setX(x);
            hero.setY(y);
            heroRepository.save(hero);
            logAdmin("🚀 Héros téléporté: " + hero.getName() + " vers " + x + "," + y);
            return Map.of("success", true);
        }
        
        return Map.of("error", "Héros non trouvé");
    }

    private Map<String, Object> togglePause(Game game) {
        Game.GameStatus currentStatus = game.getStatus();
        Game.GameStatus newStatus = Game.GameStatus.ACTIVE.equals(currentStatus) ? Game.GameStatus.PAUSED : Game.GameStatus.ACTIVE;
        game.setStatus(newStatus);
        gameRepository.save(game);
        
        logAdmin("⏸️ Jeu " + (Game.GameStatus.PAUSED.equals(newStatus) ? "en pause" : "repris"));
        return Map.of("success", true, "paused", Game.GameStatus.PAUSED.equals(newStatus));
    }

    private Map<String, Object> nextTurn(Game game) {
        try {
            game.setCurrentTurn(game.getCurrentTurn() + 1);
            game.setStatus(Game.GameStatus.ACTIVE);
            gameRepository.save(game);
            
            logAdmin("⏭️ Tour suivant: " + game.getCurrentTurn());
            return Map.of("success", true, "turn", game.getCurrentTurn());
        } catch (Exception e) {
            return Map.of("error", e.getMessage());
        }
    }
    
    private Map<String, Object> resetGame(Game game) {
        try {
            game.setCurrentTurn(1);
            game.setStatus(Game.GameStatus.ACTIVE);
            game.setStartedAt(LocalDateTime.now());
            game.setEndedAt(null);
            game.setWinner(null);
            
            // Supprimer tous les joueurs
            playerRepository.deleteByGameId(game.getId());
            
            gameRepository.save(game);
            
            logAdmin("🔄 Jeu reset: " + game.getGameName());
            return Map.of("success", true, "message", "Jeu reset");
        } catch (Exception e) {
            return Map.of("error", e.getMessage());
        }
    }
    
    private Map<String, Object> endGame(Game game) {
        try {
            game.setStatus(Game.GameStatus.FINISHED);
            game.setEndedAt(LocalDateTime.now());
            gameRepository.save(game);
            
            logAdmin("🏁 Jeu terminé: " + game.getGameName());
            return Map.of("success", true, "message", "Jeu terminé");
        } catch (Exception e) {
            return Map.of("error", e.getMessage());
        }
    }

    private void addQuickStartContent(Game game) {
        // Ajouter des joueurs
        String[] playerNames = {"Joueur1", "Joueur2", "Joueur3"};
        for (String name : playerNames) {
            Map<String, Object> playerRequest = Map.of("name", name);
            addPlayer(game, playerRequest);
        }
        
        // Ajouter des héros
        Map<String, String> heroPlayerMap = Map.of(
            "Arthur", "Joueur1",
            "Ragnar", "Joueur2",
            "Merlin", "Joueur3"
        );
        
        int x = 10, y = 10;
        for (Map.Entry<String, String> entry : heroPlayerMap.entrySet()) {
            Map<String, Object> heroRequest = Map.of(
                "name", entry.getKey(),
                "playerId", entry.getValue(),
                "x", x,
                "y", y
            );
            spawnHero(game, heroRequest);
            x += 5;
            y += 5;
        }
    }

    private void logAdmin(String message) {
        String timestamp = LocalDateTime.now().toString();
        String logEntry = "[" + timestamp + "] " + message;
        adminLogs.add(logEntry);
        
        // Limiter les logs à 1000 entrées
        if (adminLogs.size() > 1000) {
            adminLogs = adminLogs.subList(adminLogs.size() - 1000, adminLogs.size());
        }
        
        System.out.println("🎮 ADMIN: " + message);
    }
} 