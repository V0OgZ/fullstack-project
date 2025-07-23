package com.heroesoftimepoc.temporalengine.repository;

import com.heroesoftimepoc.temporalengine.model.Game;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GameRepository extends JpaRepository<Game, Long> {
    
    List<Game> findByStatus(Game.GameStatus status);
    
    Optional<Game> findByGameName(String gameName);
    
    @Query("SELECT g FROM Game g WHERE g.currentPlayer = :playerId")
    List<Game> findByCurrentPlayer(@Param("playerId") String playerId);
    
    @Query("SELECT g FROM Game g JOIN g.players p WHERE p = :playerId")
    List<Game> findByPlayerInGame(@Param("playerId") String playerId);
    
    @Query("SELECT g FROM Game g WHERE g.status = :status AND SIZE(g.players) < g.maxPlayers")
    List<Game> findAvailableGames(@Param("status") Game.GameStatus status);
    
    @Query("SELECT g FROM Game g WHERE g.currentTimeline = :timeline")
    List<Game> findByCurrentTimeline(@Param("timeline") String timeline);
}