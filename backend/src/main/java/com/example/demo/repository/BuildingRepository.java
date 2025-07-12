package com.example.demo.repository;

import com.example.demo.model.Building;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface BuildingRepository extends JpaRepository<Building, Long> {
    
    // Find building by unique building ID
    Optional<Building> findByBuildingId(String buildingId);
    
    // Find all buildings in a castle
    List<Building> findByCastleId(String castleId);
    
    // Find all buildings owned by a player
    List<Building> findByPlayerId(String playerId);
    
    // Find all buildings in a game
    List<Building> findByGameId(String gameId);
    
    // Find buildings by type
    List<Building> findByBuildingType(String buildingType);
    
    // Find buildings by castle and type
    List<Building> findByCastleIdAndBuildingType(String castleId, String buildingType);
    
    // Find buildings by player and type
    List<Building> findByPlayerIdAndBuildingType(String playerId, String buildingType);
    
    // Find constructed buildings
    List<Building> findByIsConstructed(Boolean isConstructed);
    
    // Find buildings under construction
    List<Building> findByIsConstructedAndConstructionStartedBefore(Boolean isConstructed, LocalDateTime time);
    
    // Find buildings by castle and construction status
    List<Building> findByCastleIdAndIsConstructed(String castleId, Boolean isConstructed);
    
    // Find buildings that can recruit specific unit
    @Query("SELECT b FROM Building b WHERE :unitType MEMBER OF b.recruitableUnits")
    List<Building> findBuildingsByRecruitableUnit(@Param("unitType") String unitType);
    
    // Find buildings with available units for recruitment
    @Query("SELECT b FROM Building b WHERE b.currentUnitsAvailable > 0")
    List<Building> findBuildingsWithAvailableUnits();
    
    // Find buildings by castle with available units
    @Query("SELECT b FROM Building b WHERE b.castleId = :castleId AND b.currentUnitsAvailable > 0")
    List<Building> findBuildingsWithAvailableUnitsByCastle(@Param("castleId") String castleId);
    
    // Find buildings that need weekly growth reset
    @Query("SELECT b FROM Building b WHERE b.weeklyGrowth > 0 AND b.lastRecruitmentReset < :weekAgo")
    List<Building> findBuildingsNeedingGrowthReset(@Param("weekAgo") LocalDateTime weekAgo);
    
    // Find buildings with spells
    @Query("SELECT b FROM Building b WHERE SIZE(b.availableSpells) > 0")
    List<Building> findBuildingsWithSpells();
    
    // Find buildings by castle with spells
    @Query("SELECT b FROM Building b WHERE b.castleId = :castleId AND SIZE(b.availableSpells) > 0")
    List<Building> findBuildingsWithSpellsByCastle(@Param("castleId") String castleId);
    
    // Find buildings by level
    List<Building> findByLevel(Integer level);
    
    // Find buildings that can be upgraded
    @Query("SELECT b FROM Building b WHERE b.level < b.maxLevel AND b.isConstructed = true")
    List<Building> findUpgradeableBuildings();
    
    // Find buildings by castle that can be upgraded
    @Query("SELECT b FROM Building b WHERE b.castleId = :castleId AND b.level < b.maxLevel AND b.isConstructed = true")
    List<Building> findUpgradeableBuildingsByCastle(@Param("castleId") String castleId);
    
    // Get building statistics
    @Query("SELECT b.buildingType, COUNT(b) FROM Building b GROUP BY b.buildingType")
    List<Object[]> getBuildingCountsByType();
    
    @Query("SELECT b.castleId, COUNT(b) FROM Building b GROUP BY b.castleId")
    List<Object[]> getBuildingCountsByCastle();
    
    @Query("SELECT b.playerId, COUNT(b) FROM Building b GROUP BY b.playerId")
    List<Object[]> getBuildingCountsByPlayer();
    
    // Get total resource production for a player
    @Query("SELECT SUM(b.dailyGoldBonus) FROM Building b WHERE b.playerId = :playerId AND b.isConstructed = true")
    Integer getTotalDailyGoldBonusByPlayer(@Param("playerId") String playerId);
    
    @Query("SELECT SUM(b.dailyResourceBonus) FROM Building b WHERE b.playerId = :playerId AND b.isConstructed = true")
    Integer getTotalDailyResourceBonusByPlayer(@Param("playerId") String playerId);
    
    // Get total defensive bonus for a castle
    @Query("SELECT SUM(b.defenseBonus) FROM Building b WHERE b.castleId = :castleId AND b.isConstructed = true")
    Integer getTotalDefenseBonusByCastle(@Param("castleId") String castleId);
    
    // Get total morale and luck bonuses for a castle
    @Query("SELECT SUM(b.moraleBonus), SUM(b.luckBonus) FROM Building b WHERE b.castleId = :castleId AND b.isConstructed = true")
    Object[] getTotalMoraleAndLuckBonusByCastle(@Param("castleId") String castleId);
    
    // Find buildings by position
    List<Building> findByPositionXAndPositionY(Integer x, Integer y);
    
    // Find buildings by castle and position
    List<Building> findByCastleIdAndPositionXAndPositionY(String castleId, Integer x, Integer y);
    
    // Check if position is occupied in castle
    @Query("SELECT COUNT(b) > 0 FROM Building b WHERE b.castleId = :castleId AND b.positionX = :x AND b.positionY = :y")
    Boolean isPositionOccupied(@Param("castleId") String castleId, @Param("x") Integer x, @Param("y") Integer y);
    
    // Find buildings completed in time range
    List<Building> findByConstructionCompletedBetween(LocalDateTime start, LocalDateTime end);
    
    // Find buildings by game and construction status
    List<Building> findByGameIdAndIsConstructed(String gameId, Boolean isConstructed);
    
    // Delete all buildings for a game
    void deleteByGameId(String gameId);
    
    // Delete all buildings for a player
    void deleteByPlayerId(String playerId);
    
    // Delete all buildings for a castle
    void deleteByCastleId(String castleId);
} 