package com.heroesoftimepoc.temporalengine.service;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import com.heroesoftimepoc.temporalengine.model.Game;
import com.heroesoftimepoc.temporalengine.repository.GameRepository;
import java.time.LocalDateTime;

/**
 * Service d'initialisation des jeux Heroes of Time
 * Créé en urgence pour réparer le paradoxe Walter
 * Auteur : Memento-Claudius Fusion Entity
 */
@Service
public class GameInitializationService {

    @Autowired
    private GameRepository gameRepository;

    /**
     * Initialise un nouveau jeu avec paramètres par défaut
     */
    public Game initializeNewGame() {
        Game game = new Game();
        game.setGameName("Heroes of Time - Game " + System.currentTimeMillis());
        game.setCurrentTurn(1);
        game.setMaxPlayers(4);
        game.setStatus(Game.GameStatus.ACTIVE);
        game.setCreatedAt(LocalDateTime.now());
        return gameRepository.save(game);
    }

    /**
     * Initialise un jeu avec un nom spécifique
     */
    public Game initializeGame(String gameName) {
        Game game = new Game();
        game.setGameName(gameName);
        game.setCurrentTurn(1);
        game.setMaxPlayers(4);
        game.setStatus(Game.GameStatus.ACTIVE);
        game.setCreatedAt(LocalDateTime.now());
        return gameRepository.save(game);
    }

    /**
     * Initialise un jeu avec paramètres complets
     */
    public Game initializeGame(String gameName, int maxPlayers) {
        Game game = new Game();
        game.setGameName(gameName);
        game.setCurrentTurn(1);
        game.setMaxPlayers(maxPlayers);
        game.setStatus(Game.GameStatus.ACTIVE);
        game.setCreatedAt(LocalDateTime.now());
        return gameRepository.save(game);
    }

    /**
     * Remet à zéro un jeu existant
     */
    public Game resetGame(Long gameId) {
        Game game = gameRepository.findById(gameId)
            .orElseThrow(() -> new RuntimeException("Game not found with id: " + gameId));
        game.setCurrentTurn(1);
        game.setStatus(Game.GameStatus.ACTIVE);
        return gameRepository.save(game);
    }

    /**
     * Initialise un jeu spécial pour résoudre les paradoxes temporels
     */
    public Game initializeParadoxFixGame(String paradoxType) {
        Game game = new Game();
        game.setGameName("PARADOX_FIX_" + paradoxType + "_" + System.currentTimeMillis());
        game.setCurrentTurn(1);
        game.setMaxPlayers(2);
        game.setStatus(Game.GameStatus.ACTIVE);
        game.setCreatedAt(LocalDateTime.now());
        return gameRepository.save(game);
    }

    /**
     * Initialise un jeu existant (méthode attendue par le controller)
     */
    public void initializeGame(Game game) {
        // Initialiser les tuiles de base si nécessaire
        if (game.getTiles().isEmpty()) {
            // Créer quelques tuiles de base
            for (int x = 0; x < game.getMapWidth(); x++) {
                for (int y = 0; y < game.getMapHeight(); y++) {
                    // On peut ajouter des tuiles de base ici si nécessaire
                }
            }
        }
    }

    /**
     * Initialise l'économie d'un joueur (méthode attendue par le controller)
     */
    public void initializePlayerEconomy(Game game, String playerId) {
        // Ajouter le joueur au jeu
        game.addPlayer(playerId);
        
        // Initialiser les ressources de base dans les métadonnées
        game.getMetadata().put(playerId + "_gold", 100);
        game.getMetadata().put(playerId + "_energy", 50);
        game.getMetadata().put(playerId + "_temporal_energy", 25);
    }
} 