package com.example.demo.repository;

import com.example.demo.model.TemporalItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface TemporalItemRepository extends JpaRepository<TemporalItem, Long> {
    
    // Find item by unique ID
    Optional<TemporalItem> findByItemId(String itemId);
    
    // Find all items in a game
    List<TemporalItem> findByGameId(String gameId);
    
    // Find items owned by a player
    List<TemporalItem> findByGameIdAndOwnerId(String gameId, String ownerId);
    
    // Find items on the map (no owner)
    List<TemporalItem> findByGameIdAndOwnerIdIsNull(String gameId);
    
    // Find items at specific position
    List<TemporalItem> findByGameIdAndPositionXAndPositionY(String gameId, Integer x, Integer y);
    
    // PERFORMANCE OPTIMIZED QUERIES - 3 PLAYERS MAX
    
    // Find items that need refresh (performance critical)
    @Query("SELECT ti FROM TemporalItem ti WHERE ti.gameId = :gameId AND ti.isActive = true AND ti.nextRefreshTime <= :currentTime ORDER BY ti.performancePriority DESC")
    List<TemporalItem> findItemsNeedingRefresh(@Param("gameId") String gameId, @Param("currentTime") LocalDateTime currentTime);
    
    // Find high priority items only (server optimization)
    @Query("SELECT ti FROM TemporalItem ti WHERE ti.gameId = :gameId AND ti.isActive = true AND ti.performancePriority >= :minPriority")
    List<TemporalItem> findHighPriorityItems(@Param("gameId") String gameId, @Param("minPriority") Integer minPriority);
    
    // Find items by temporal effect type
    List<TemporalItem> findByGameIdAndTemporalEffectType(String gameId, String temporalEffectType);
    
    // Find usable items (has uses left)
    @Query("SELECT ti FROM TemporalItem ti WHERE ti.gameId = :gameId AND ti.isActive = true AND ti.currentUses > 0")
    List<TemporalItem> findUsableItems(@Param("gameId") String gameId);
    
    // Find items by rarity (for loot generation)
    List<TemporalItem> findByGameIdAndRarity(String gameId, String rarity);
    
    // Count active items per game (performance monitoring)
    @Query("SELECT COUNT(ti) FROM TemporalItem ti WHERE ti.gameId = :gameId AND ti.isActive = true")
    Long countActiveItemsByGame(@Param("gameId") String gameId);
    
    // Find items with expired cache (need recalculation)
    @Query("SELECT ti FROM TemporalItem ti WHERE ti.gameId = :gameId AND ti.isActive = true AND (ti.cacheValidUntil IS NULL OR ti.cacheValidUntil <= :currentTime)")
    List<TemporalItem> findItemsWithExpiredCache(@Param("gameId") String gameId, @Param("currentTime") LocalDateTime currentTime);
    
    // THE DUDE OPTIMIZATION - Find items that actually matter right now
    @Query("SELECT ti FROM TemporalItem ti WHERE ti.gameId = :gameId AND ti.isActive = true AND (ti.ownerId = :playerId OR (ti.positionX = :x AND ti.positionY = :y)) ORDER BY ti.performancePriority DESC")
    List<TemporalItem> findRelevantItemsForPlayer(@Param("gameId") String gameId, @Param("playerId") String playerId, @Param("x") Integer x, @Param("y") Integer y);
} 