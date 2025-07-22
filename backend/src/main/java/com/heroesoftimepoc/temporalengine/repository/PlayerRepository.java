package com.heroesoftimepoc.temporalengine.repository;

import com.heroesoftimepoc.temporalengine.model.Player;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PlayerRepository extends JpaRepository<Player, Long> {
    
    List<Player> findByGameId(Long gameId);
    
    List<Player> findByStatus(String status);
    
    Optional<Player> findByName(String name);
    
    @Query("SELECT p FROM Player p WHERE p.game.id = :gameId AND p.status = :status")
    List<Player> findByGameIdAndStatus(@Param("gameId") Long gameId, @Param("status") String status);
    
    @Query("SELECT COUNT(p) FROM Player p WHERE p.game.id = :gameId")
    long countByGameId(@Param("gameId") Long gameId);
    
    @Query("SELECT COUNT(p) FROM Player p WHERE p.game.id = :gameId AND p.status = :status")
    long countByGameIdAndStatus(@Param("gameId") Long gameId, @Param("status") String status);
    
    @Query("DELETE FROM Player p WHERE p.game.id = :gameId")
    void deleteByGameId(@Param("gameId") Long gameId);
} 