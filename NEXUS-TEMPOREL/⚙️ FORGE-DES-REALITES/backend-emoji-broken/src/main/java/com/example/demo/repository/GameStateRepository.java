package com.example.demo.repository;

import com.example.demo.model.GameState;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface GameStateRepository extends JpaRepository<GameState, String> {
    
    // Find game state by game ID
    Optional<GameState> findByGameId(String gameId);
    
    // Find all active games
    @Query("SELECT gs FROM GameState gs WHERE gs.gameStatus = 'ACTIVE'")
    List<GameState> findActiveGames();
    
    // Find games by current player
    @Query("SELECT gs FROM GameState gs WHERE gs.currentPlayerId = :playerId AND gs.gameStatus = 'ACTIVE'")
    List<GameState> findActiveGamesByPlayer(@Param("playerId") String playerId);
    
    // Find games that need turn timeout
    @Query("SELECT gs FROM GameState gs WHERE gs.gameStatus = 'ACTIVE' AND gs.turnStartTime < :timeoutTime")
    List<GameState> findGamesWithTurnTimeout(@Param("timeoutTime") LocalDateTime timeoutTime);
    
    // Find inactive games (for cleanup)
    @Query("SELECT gs FROM GameState gs WHERE gs.updatedAt < :cutoffTime")
    List<GameState> findInactiveGames(@Param("cutoffTime") LocalDateTime cutoffTime);
    
    // Count active games
    @Query("SELECT COUNT(gs) FROM GameState gs WHERE gs.gameStatus = 'ACTIVE'")
    Long countActiveGames();
    
    // Find games by status
    @Query("SELECT gs FROM GameState gs WHERE gs.gameStatus = :status")
    List<GameState> findByGameStatus(@Param("status") String status);
    
    // Delete old finished games
    @Query("DELETE FROM GameState gs WHERE gs.gameStatus IN ('FINISHED', 'CANCELLED') AND gs.updatedAt < :cutoffTime")
    void deleteOldFinishedGames(@Param("cutoffTime") LocalDateTime cutoffTime);
} 