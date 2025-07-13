package com.example.demo.repository;

import com.example.demo.model.AIPlayer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AIPlayerRepository extends JpaRepository<AIPlayer, Long> {
    
    /**
     * Find AI player by AI player ID
     */
    Optional<AIPlayer> findByAiPlayerId(String aiPlayerId);
    
    /**
     * Find all AI players for a specific game
     */
    List<AIPlayer> findByGameId(String gameId);
    
    /**
     * Find active AI players for a game
     */
    List<AIPlayer> findByGameIdAndIsActiveTrue(String gameId);
    
    /**
     * Find AI players by difficulty level
     */
    List<AIPlayer> findByDifficultyLevel(String difficultyLevel);
    
    /**
     * Find AI players by personality type
     */
    List<AIPlayer> findByAiPersonality(String aiPersonality);
    
    /**
     * Find AI players by faction
     */
    List<AIPlayer> findByFaction(String faction);
    
    /**
     * Find AI players whose turn is active
     */
    List<AIPlayer> findByIsTurnActiveTrue();
    
    /**
     * Find AI players by game and turn priority
     */
    List<AIPlayer> findByGameIdOrderByTurnPriorityAsc(String gameId);
    
    /**
     * Count AI players in a game
     */
    @Query("SELECT COUNT(ai) FROM AIPlayer ai WHERE ai.gameId = :gameId")
    long countByGameId(@Param("gameId") String gameId);
    
    /**
     * Find AI players with high success rate
     */
    @Query("SELECT ai FROM AIPlayer ai WHERE ai.successfulActions > ai.failedActions AND ai.totalTurnsPlayed > 10")
    List<AIPlayer> findHighPerformingAIPlayers();
    
    /**
     * Find AI players by position range
     */
    @Query("SELECT ai FROM AIPlayer ai WHERE ai.positionX BETWEEN :minX AND :maxX AND ai.positionY BETWEEN :minY AND :maxY")
    List<AIPlayer> findByPositionRange(@Param("minX") Integer minX, @Param("maxX") Integer maxX, 
                                      @Param("minY") Integer minY, @Param("maxY") Integer maxY);
    
    /**
     * Delete all AI players for a game
     */
    void deleteByGameId(String gameId);
} 