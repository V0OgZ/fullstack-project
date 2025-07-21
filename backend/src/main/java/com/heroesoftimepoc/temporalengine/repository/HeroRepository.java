package com.heroesoftimepoc.temporalengine.repository;

import com.heroesoftimepoc.temporalengine.model.Hero;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface HeroRepository extends JpaRepository<Hero, Long> {
    
    Optional<Hero> findByName(String name);
    
    List<Hero> findByPlayerId(String playerId);
    
    List<Hero> findByStatus(Hero.HeroStatus status);
    
    List<Hero> findByTimelineBranch(String timelineBranch);
    
    @Query("SELECT h FROM Hero h WHERE h.game.id = :gameId")
    List<Hero> findByGameId(@Param("gameId") Long gameId);
    
    @Query("SELECT h FROM Hero h WHERE h.game.id = :gameId AND h.playerId = :playerId")
    List<Hero> findByGameIdAndPlayerId(@Param("gameId") Long gameId, @Param("playerId") String playerId);
    
    @Query("SELECT h FROM Hero h WHERE h.positionX = :x AND h.positionY = :y")
    List<Hero> findByPosition(@Param("x") Integer x, @Param("y") Integer y);
    
    @Query("SELECT h FROM Hero h WHERE h.game.id = :gameId AND h.positionX = :x AND h.positionY = :y")
    List<Hero> findByGameIdAndPosition(@Param("gameId") Long gameId, @Param("x") Integer x, @Param("y") Integer y);
    
    @Query("SELECT h FROM Hero h WHERE h.temporalEnergy > :minEnergy")
    List<Hero> findByTemporalEnergyGreaterThan(@Param("minEnergy") Integer minEnergy);
    
    @Query("SELECT h FROM Hero h WHERE h.game.id = :gameId AND h.status = :status")
    List<Hero> findByGameIdAndStatus(@Param("gameId") Long gameId, @Param("status") Hero.HeroStatus status);

    /**
     * Trouve un héros par son nom et l'ID de la partie
     */
    Optional<Hero> findByGameIdAndName(Long gameId, String name);

    /**
     * Trouve un héros par son nom et l'ID de la partie (alias)
     */
    Optional<Hero> findByNameAndGameId(String name, Long gameId);
    
    // Méthode pour l'administration multijoueur
    @Query("DELETE FROM Hero h WHERE h.game.id = :gameId")
    void deleteByGameId(@Param("gameId") Long gameId);
}