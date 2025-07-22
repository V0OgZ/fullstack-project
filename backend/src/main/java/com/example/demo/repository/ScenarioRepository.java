package com.example.demo.repository;

import com.example.demo.model.Scenario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ScenarioRepository extends JpaRepository<Scenario, Long> {
    
    // Find scenario by unique scenario ID
    Optional<Scenario> findByScenarioId(String scenarioId);
    
    // Find scenarios by difficulty
    List<Scenario> findByDifficulty(String difficulty);
    
    // Find scenarios by max players
    List<Scenario> findByMaxPlayers(Integer maxPlayers);
    
    // Find scenarios by map size
    List<Scenario> findByMapSize(String mapSize);
    
    // Find active scenarios
    List<Scenario> findByIsActive(Boolean isActive);
    
    // Find campaign scenarios
    List<Scenario> findByIsCampaign(Boolean isCampaign);
    
    // Find multiplayer scenarios
    List<Scenario> findByIsMultiplayer(Boolean isMultiplayer);
    
    // Find scenarios by victory condition
    List<Scenario> findByVictoryCondition(String victoryCondition);
    
    // Find campaign scenarios ordered by campaign order
    @Query("SELECT s FROM Scenario s WHERE s.isCampaign = true ORDER BY s.campaignOrder ASC")
    List<Scenario> findCampaignScenariosInOrder();
    
    // Find scenarios by difficulty and max players
    List<Scenario> findByDifficultyAndMaxPlayers(String difficulty, Integer maxPlayers);
    
    // Find scenarios by difficulty and map size
    List<Scenario> findByDifficultyAndMapSize(String difficulty, String mapSize);
    
    // Find scenarios suitable for multiplayer
    @Query("SELECT s FROM Scenario s WHERE s.isMultiplayer = true AND s.isActive = true")
    List<Scenario> findMultiplayerScenarios();
    
    // Find scenarios suitable for single player
    @Query("SELECT s FROM Scenario s WHERE s.isMultiplayer = false AND s.isActive = true")
    List<Scenario> findSinglePlayerScenarios();
    
    // Find scenarios by map dimensions
    List<Scenario> findByMapWidthAndMapHeight(Integer width, Integer height);
    
    // Find scenarios with turn limit
    @Query("SELECT s FROM Scenario s WHERE s.turnLimit IS NOT NULL AND s.turnLimit > 0")
    List<Scenario> findScenariosWithTurnLimit();
    
    // Find scenarios with time limit
    @Query("SELECT s FROM Scenario s WHERE s.timeLimit IS NOT NULL AND s.timeLimit > 0")
    List<Scenario> findScenariosWithTimeLimit();
    
    // Find scenarios by name pattern
    @Query("SELECT s FROM Scenario s WHERE s.name LIKE %:pattern%")
    List<Scenario> findByNameContaining(@Param("pattern") String pattern);
    
    // Find next scenario in campaign
    @Query("SELECT s FROM Scenario s WHERE s.previousScenarioId = :scenarioId")
    Optional<Scenario> findNextScenarioInCampaign(@Param("scenarioId") String scenarioId);
    
    // Find previous scenario in campaign
    @Query("SELECT s FROM Scenario s WHERE s.nextScenarioId = :scenarioId")
    Optional<Scenario> findPreviousScenarioInCampaign(@Param("scenarioId") String scenarioId);
    
    // Find scenarios by campaign order range
    @Query("SELECT s FROM Scenario s WHERE s.isCampaign = true AND s.campaignOrder BETWEEN :start AND :end ORDER BY s.campaignOrder ASC")
    List<Scenario> findCampaignScenariosByOrderRange(@Param("start") Integer start, @Param("end") Integer end);
    
    // Get scenario statistics
    @Query("SELECT s.difficulty, COUNT(s) FROM Scenario s GROUP BY s.difficulty")
    List<Object[]> getScenarioCountsByDifficulty();
    
    @Query("SELECT s.mapSize, COUNT(s) FROM Scenario s GROUP BY s.mapSize")
    List<Object[]> getScenarioCountsByMapSize();
    
    @Query("SELECT s.victoryCondition, COUNT(s) FROM Scenario s GROUP BY s.victoryCondition")
    List<Object[]> getScenarioCountsByVictoryCondition();
    
    @Query("SELECT s.maxPlayers, COUNT(s) FROM Scenario s GROUP BY s.maxPlayers")
    List<Object[]> getScenarioCountsByMaxPlayers();
    
    // Count scenarios by type
    @Query("SELECT COUNT(s) FROM Scenario s WHERE s.isCampaign = false")
    Long countSingleScenarios();
    
    @Query("SELECT COUNT(s) FROM Scenario s WHERE s.isCampaign = true")
    Long countCampaignScenarios();
    
    @Query("SELECT COUNT(s) FROM Scenario s WHERE s.isActive = true")
    Long countActiveScenarios();
    
    // Find scenarios suitable for specific player count
    @Query("SELECT s FROM Scenario s WHERE s.maxPlayers >= :playerCount AND s.isActive = true")
    List<Scenario> findScenariosForPlayerCount(@Param("playerCount") Integer playerCount);
    
    // Find scenarios with specific objectives
    @Query("SELECT s FROM Scenario s JOIN s.objectives o WHERE o.objectiveType = :objectiveType")
    List<Scenario> findScenariosWithObjectiveType(@Param("objectiveType") String objectiveType);
    
    // Find scenarios with timed events
    @Query("SELECT s FROM Scenario s JOIN s.events e WHERE e.eventType = 'timed'")
    List<Scenario> findScenariosWithTimedEvents();
    
    // Find scenarios by recommended players
    List<Scenario> findByRecommendedPlayers(Integer recommendedPlayers);
    
    // Find scenarios suitable for beginners
    @Query("SELECT s FROM Scenario s WHERE s.difficulty IN ('easy', 'normal') AND s.maxPlayers <= 2 AND s.isActive = true")
    List<Scenario> findBeginnerScenarios();
    
    // Find scenarios suitable for experts
    @Query("SELECT s FROM Scenario s WHERE s.difficulty IN ('hard', 'expert') AND s.isActive = true")
    List<Scenario> findExpertScenarios();
    
    // Find scenarios with specific map size range
    @Query("SELECT s FROM Scenario s WHERE s.mapWidth * s.mapHeight BETWEEN :minSize AND :maxSize")
    List<Scenario> findScenariosByMapSizeRange(@Param("minSize") Integer minSize, @Param("maxSize") Integer maxSize);
    
    // Find most popular scenarios (this would be based on play count in a real system)
    @Query("SELECT s FROM Scenario s WHERE s.isActive = true ORDER BY s.updatedAt DESC")
    List<Scenario> findPopularScenarios();
    
    // Find recently created scenarios
    @Query("SELECT s FROM Scenario s WHERE s.isActive = true ORDER BY s.createdAt DESC")
    List<Scenario> findRecentScenarios();
    
    // Find scenarios with custom victory conditions
    @Query("SELECT s FROM Scenario s WHERE s.victoryCondition = 'custom' AND s.isActive = true")
    List<Scenario> findCustomVictoryScenarios();
    
    // Delete scenarios by scenario ID
    void deleteByScenarioId(String scenarioId);
    
    // Batch operations
    @Query("SELECT s FROM Scenario s WHERE s.isActive = true AND s.isCampaign = false ORDER BY s.difficulty, s.name")
    List<Scenario> findAllActiveStandaloneScenarios();
    
    @Query("SELECT s FROM Scenario s WHERE s.isActive = true AND s.isCampaign = true ORDER BY s.campaignOrder")
    List<Scenario> findAllActiveCampaignScenarios();
} 