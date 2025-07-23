package com.heroesoftimepoc.temporalengine.repository;

import com.heroesoftimepoc.temporalengine.model.GameTile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GameTileRepository extends JpaRepository<GameTile, Long> {
    
    @Query("SELECT t FROM GameTile t WHERE t.x = :x AND t.y = :y")
    Optional<GameTile> findByPosition(@Param("x") Integer x, @Param("y") Integer y);
    
    @Query("SELECT t FROM GameTile t WHERE t.game.id = :gameId AND t.x = :x AND t.y = :y")
    Optional<GameTile> findByGameIdAndPosition(@Param("gameId") Long gameId, @Param("x") Integer x, @Param("y") Integer y);
    
    @Query("SELECT t FROM GameTile t WHERE t.game.id = :gameId")
    List<GameTile> findByGameId(@Param("gameId") Long gameId);
    
    List<GameTile> findByTerrain(String terrain);
    
    @Query("SELECT t FROM GameTile t WHERE t.game.id = :gameId AND t.terrain = :terrain")
    List<GameTile> findByGameIdAndTerrain(@Param("gameId") Long gameId, @Param("terrain") String terrain);
    
    @Query("SELECT t FROM GameTile t WHERE t.hasPsiStates = true")
    List<GameTile> findTilesWithPsiStates();
    
    @Query("SELECT t FROM GameTile t WHERE t.game.id = :gameId AND t.hasPsiStates = true")
    List<GameTile> findTilesWithPsiStatesByGameId(@Param("gameId") Long gameId);
    
    @Query("SELECT t FROM GameTile t WHERE t.isLocked = true")
    List<GameTile> findLockedTiles();
    
    @Query("SELECT t FROM GameTile t WHERE t.game.id = :gameId AND t.isLocked = true")
    List<GameTile> findLockedTilesByGameId(@Param("gameId") Long gameId);
    
    @Query("SELECT t FROM GameTile t WHERE t.buildingType IS NOT NULL")
    List<GameTile> findTilesWithBuildings();
    
    @Query("SELECT t FROM GameTile t WHERE t.game.id = :gameId AND t.buildingType IS NOT NULL")
    List<GameTile> findTilesWithBuildingsByGameId(@Param("gameId") Long gameId);
    
    @Query("SELECT t FROM GameTile t WHERE t.buildingType = :buildingType")
    List<GameTile> findByBuildingType(@Param("buildingType") String buildingType);
    
    @Query("SELECT t FROM GameTile t WHERE t.buildingOwner = :owner")
    List<GameTile> findByBuildingOwner(@Param("owner") String owner);
    
    @Query("SELECT t FROM GameTile t WHERE t.game.id = :gameId AND t.buildingOwner = :owner")
    List<GameTile> findByGameIdAndBuildingOwner(@Param("gameId") Long gameId, @Param("owner") String owner);
    
    @Query("SELECT t FROM GameTile t WHERE t.isTemporalZone = true")
    List<GameTile> findTemporalZones();
    
    @Query("SELECT t FROM GameTile t WHERE t.game.id = :gameId AND t.isTemporalZone = true")
    List<GameTile> findTemporalZonesByGameId(@Param("gameId") Long gameId);
    
    @Query("SELECT t FROM GameTile t WHERE t.temporalZoneType = :zoneType")
    List<GameTile> findByTemporalZoneType(@Param("zoneType") String zoneType);
    
    @Query("SELECT t FROM GameTile t WHERE t.game.id = :gameId AND t.temporalZoneType = :zoneType")
    List<GameTile> findByGameIdAndTemporalZoneType(@Param("gameId") Long gameId, @Param("zoneType") String zoneType);
    
    @Query("SELECT t FROM GameTile t WHERE SIZE(t.occupants) > 0")
    List<GameTile> findOccupiedTiles();
    
    @Query("SELECT t FROM GameTile t WHERE t.game.id = :gameId AND SIZE(t.occupants) > 0")
    List<GameTile> findOccupiedTilesByGameId(@Param("gameId") Long gameId);
    
    // ============================
    // MÉTHODES AJOUTÉES POUR ARTIFACTSERVICE
    // ============================
    
    /**
     * Trouver les tuiles dans une zone rectangulaire
     */
    @Query("SELECT t FROM GameTile t WHERE t.x BETWEEN :minX AND :maxX AND t.y BETWEEN :minY AND :maxY")
    List<GameTile> findInArea(@Param("minX") Integer minX, @Param("maxX") Integer maxX, 
                             @Param("minY") Integer minY, @Param("maxY") Integer maxY);
    
    /**
     * Trouver les tuiles dans une zone rectangulaire pour un jeu spécifique
     */
    @Query("SELECT t FROM GameTile t WHERE t.game.id = :gameId AND t.x BETWEEN :minX AND :maxX AND t.y BETWEEN :minY AND :maxY")
    List<GameTile> findInAreaByGameId(@Param("gameId") Long gameId, @Param("minX") Integer minX, @Param("maxX") Integer maxX, 
                                     @Param("minY") Integer minY, @Param("maxY") Integer maxY);
}