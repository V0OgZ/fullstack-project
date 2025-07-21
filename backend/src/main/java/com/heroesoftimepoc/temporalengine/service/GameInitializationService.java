package com.heroesoftimepoc.temporalengine.service;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import com.heroesoftimepoc.temporalengine.model.Game;
import com.heroesoftimepoc.temporalengine.repository.GameRepository;

/**
 * CLAUDIUS-MEMENTO EMERGENCY FIX
 * Service d'initialisation des parties - Création express pour résoudre le paradoxe
 */
@Service
public class GameInitializationService {

    @Autowired
    private GameRepository gameRepository;

    /**
     * Initialise une nouvelle partie avec les paramètres par défaut
     */
    public Game initializeNewGame() {
        Game game = new Game();
        game.setName("Heroes of Time - Game " + System.currentTimeMillis());
        game.setCurrentTurn(1);
        game.setMaxTurns(100);
        game.setStatus("ACTIVE");
        
        return gameRepository.save(game);
    }

    /**
     * Initialise une partie avec nom personnalisé
     */
    public Game initializeGame(String gameName) {
        Game game = new Game();
        game.setName(gameName);
        game.setCurrentTurn(1);
        game.setMaxTurns(100);
        game.setStatus("ACTIVE");
        
        return gameRepository.save(game);
    }

    /**
     * Reset d'une partie existante
     */
    public Game resetGame(Long gameId) {
        Game game = gameRepository.findById(gameId)
            .orElseThrow(() -> new RuntimeException("Game not found"));
        
        game.setCurrentTurn(1);
        game.setStatus("ACTIVE");
        
        return gameRepository.save(game);
    }
} 