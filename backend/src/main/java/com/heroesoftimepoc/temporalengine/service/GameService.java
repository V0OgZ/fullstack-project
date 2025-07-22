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
import java.util.List;
import java.util.Optional;

@Service
public class GameService {
    
    @Autowired
    private GameRepository gameRepository;
    
    @Autowired
    private HeroRepository heroRepository;
    
    @Autowired
    private PlayerRepository playerRepository;
    
    public List<Game> getAllGames() {
        return gameRepository.findAll();
    }
    
    public Optional<Game> getGameById(Long id) {
        return gameRepository.findById(id);
    }
    
    public Game createGame(String name, String mode, String scenario) {
        Game game = new Game();
        game.setGameName(name);
        // game.setMode(mode); // Méthode non disponible temporairement
        // game.setScenario(scenario); // Méthode non disponible temporairement
        game.setStatus(Game.GameStatus.WAITING);
        game.setCreatedAt(LocalDateTime.now());
        return gameRepository.save(game);
    }
    
    public Game saveGame(Game game) {
        return gameRepository.save(game);
    }
    
    public void deleteGame(Long id) {
        gameRepository.deleteById(id);
    }
    
    public List<Game> getActiveGames() {
        return gameRepository.findByStatus(Game.GameStatus.ACTIVE);
    }
    
    public List<Hero> getHeroesForGame(Long gameId) {
        return heroRepository.findByGameId(gameId);
    }
    
    public List<Player> getPlayersForGame(Long gameId) {
        return playerRepository.findByGameId(gameId);
    }
    
    public Hero getHeroByName(Long gameId, String heroName) {
        List<Hero> heroes = getHeroesForGame(gameId);
        return heroes.stream()
                .filter(hero -> heroName.equals(hero.getName()))
                .findFirst()
                .orElse(null);
    }
    
    public Player getPlayerByName(Long gameId, String playerName) {
        List<Player> players = getPlayersForGame(gameId);
        return players.stream()
                .filter(player -> playerName.equals(player.getName()))
                .findFirst()
                .orElse(null);
    }
} 