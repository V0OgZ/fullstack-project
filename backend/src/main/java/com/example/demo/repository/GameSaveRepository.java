package com.example.demo.repository;

import com.example.demo.model.GameSave;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface GameSaveRepository extends JpaRepository<GameSave, Long> {
    
    // Find saves by game ID
    List<GameSave> findByGameId(String gameId);
    
    // Find saves by player ID
    List<GameSave> findByPlayerId(String playerId);
    
    // Find saves by game and player
    List<GameSave> findByGameIdAndPlayerId(String gameId, String playerId);
    
    // Find save by name and player
    Optional<GameSave> findBySaveNameAndPlayerId(String saveName, String playerId);
    
    // Find auto-saves
    List<GameSave> findByIsAutoSaveOrderByCreatedAtDesc(Boolean isAutoSave);
    
    // Find latest auto-save for a game
    @Query("SELECT gs FROM GameSave gs WHERE gs.gameId = :gameId AND gs.isAutoSave = true ORDER BY gs.createdAt DESC")
    List<GameSave> findLatestAutoSave(@Param("gameId") String gameId);
    
    // Count saves for a player
    Long countByPlayerId(String playerId);
    
    // Delete old auto-saves (keep only last N) - using native query for complex logic
    @Modifying
    @Transactional
    @Query(value = "DELETE FROM game_saves WHERE is_auto_save = true AND game_id = :gameId AND id NOT IN " +
           "(SELECT id FROM (SELECT id FROM game_saves WHERE game_id = :gameId AND is_auto_save = true ORDER BY created_at DESC LIMIT :keepCount) AS subquery)", 
           nativeQuery = true)
    void deleteOldAutoSaves(@Param("gameId") String gameId, @Param("keepCount") int keepCount);
} 