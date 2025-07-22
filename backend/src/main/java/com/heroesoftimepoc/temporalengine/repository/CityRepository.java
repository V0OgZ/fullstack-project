package com.heroesoftimepoc.temporalengine.repository;

import com.heroesoftimepoc.temporalengine.model.City;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository pour les villes
 * Remplace les mocks par de vraies données
 */
@Repository
public interface CityRepository extends JpaRepository<City, Long> {

    /**
     * Trouver la première ville (pour les données par défaut)
     */
    Optional<City> findFirstByOrderByIdAsc();

    /**
     * Trouver les villes par jeu
     */
    List<City> findByGameId(Long gameId);

    /**
     * Trouver les villes par joueur
     */
    List<City> findByPlayerId(String playerId);

    /**
     * Trouver une ville par nom
     */
    Optional<City> findByName(String name);

    /**
     * Trouver les villes par niveau minimum
     */
    @Query("SELECT c FROM City c WHERE c.level >= :minLevel")
    List<City> findByLevelGreaterThanEqual(@Param("minLevel") Integer minLevel);

    /**
     * Trouver les villes avec des ressources spécifiques
     */
    @Query("SELECT c FROM City c WHERE JSON_EXTRACT(c.resources, '$.gold') >= :minGold")
    List<City> findByGoldGreaterThanEqual(@Param("minGold") Integer minGold);

    /**
     * Compter les villes par joueur
     */
    @Query("SELECT COUNT(c) FROM City c WHERE c.playerId = :playerId")
    Long countByPlayerId(@Param("playerId") String playerId);

    /**
     * Trouver les villes avec des bâtiments de niveau spécifique
     */
    @Query("SELECT c FROM City c WHERE JSON_EXTRACT(c.buildings, '$.townHall.level') >= :minTownHallLevel")
    List<City> findByTownHallLevelGreaterThanEqual(@Param("minTownHallLevel") Integer minTownHallLevel);
} 