package com.example.demo.service;

import com.example.demo.model.TemporalItem;
import com.example.demo.repository.TemporalItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Service
public class TemporalItemService {
    
    @Autowired
    private TemporalItemRepository temporalItemRepository;
    
    // PERFORMANCE CACHE - THE DUDE WAY (don't overdo it)
    private final Map<String, List<TemporalItem>> gameItemsCache = new ConcurrentHashMap<>();
    private final Map<String, LocalDateTime> cacheTimestamps = new ConcurrentHashMap<>();
    private static final int CACHE_DURATION_MINUTES = 2; // Short cache for 3 players
    
    // ======================
    // OBJECT REALM CREATION
    // ======================
    
    public TemporalItem createTemporalItem(String gameId, String itemName, String itemType, 
                                         String temporalEffectType, Integer refreshInterval) {
        String itemId = "item-" + System.currentTimeMillis() + "-" + (int)(Math.random() * 1000);
        
        TemporalItem item = new TemporalItem(itemId, gameId, itemName, itemType, temporalEffectType, refreshInterval);
        
        // Set default effects based on type
        setupItemDefaults(item);
        
        TemporalItem saved = temporalItemRepository.save(item);
        invalidateGameCache(gameId);
        
        return saved;
    }
    
    private void setupItemDefaults(TemporalItem item) {
        switch (item.getItemType()) {
            case "weapon":
                item.setEffectDescription("Increases attack power temporarily");
                item.setMaxUses(5);
                item.setPerformancePriority(7);
                break;
            case "armor":
                item.setEffectDescription("Provides protection against damage");
                item.setMaxUses(10);
                item.setPerformancePriority(6);
                break;
            case "artifact":
                item.setEffectDescription("Mystical powers with temporal effects");
                item.setMaxUses(3);
                item.setPerformancePriority(9);
                break;
            case "consumable":
                item.setEffectDescription("Single-use item with immediate effect");
                item.setMaxUses(1);
                item.setPerformancePriority(5);
                break;
            case "relic":
                item.setEffectDescription("Ancient item with continuous temporal loop");
                item.setMaxUses(999);
                item.setPerformancePriority(10);
                break;
            default:
                item.setMaxUses(1);
                item.setPerformancePriority(5);
        }
        
        item.setCurrentUses(item.getMaxUses());
    }
    
    // ======================
    // PREDEFINED TEMPORAL ITEMS - THE DUDE'S COLLECTION
    // ======================
    
    public List<TemporalItem> createDefaultItemsForGame(String gameId) {
        List<TemporalItem> items = new ArrayList<>();
        
        // TIC-BASED ITEMS (refresh every few seconds)
        TemporalItem quickPotion = createTemporalItem(gameId, "Quick Healing Potion", "consumable", "TIC_BASED", 30);
        quickPotion.setEffectDescription("Heals 50 HP every 30 seconds");
        quickPotion.setRarity("common");
        quickPotion.setPowerLevel(25);
        items.add(temporalItemRepository.save(quickPotion));
        
        TemporalItem speedBoots = createTemporalItem(gameId, "Boots of Swift Movement", "armor", "TIC_BASED", 60);
        speedBoots.setEffectDescription("Increases movement speed, refreshes every minute");
        speedBoots.setRarity("rare");
        speedBoots.setPowerLevel(40);
        items.add(temporalItemRepository.save(speedBoots));
        
        // DAY-BASED ITEMS (refresh daily)
        TemporalItem sunBlade = createTemporalItem(gameId, "Blade of the Rising Sun", "weapon", "DAY_BASED", 1);
        sunBlade.setEffectDescription("Powerful attack bonus, recharges at dawn");
        sunBlade.setRarity("epic");
        sunBlade.setPowerLevel(75);
        items.add(temporalItemRepository.save(sunBlade));
        
        TemporalItem moonAmulet = createTemporalItem(gameId, "Amulet of Lunar Cycles", "artifact", "DAY_BASED", 1);
        moonAmulet.setEffectDescription("Mystical protection, power waxes and wanes daily");
        moonAmulet.setRarity("legendary");
        moonAmulet.setPowerLevel(85);
        items.add(temporalItemRepository.save(moonAmulet));
        
        // TURN-BASED ITEMS (refresh every few turns)
        TemporalItem tacticalScroll = createTemporalItem(gameId, "Scroll of Tactical Insight", "consumable", "TURN_BASED", 3);
        tacticalScroll.setEffectDescription("Reveals enemy positions, usable every 3 turns");
        tacticalScroll.setRarity("rare");
        tacticalScroll.setPowerLevel(50);
        items.add(temporalItemRepository.save(tacticalScroll));
        
        // RELIC - CONTINUOUS LOOP
        TemporalItem timeRelic = createTemporalItem(gameId, "Relic of Eternal Moments", "relic", "TIC_BASED", 10);
        timeRelic.setEffectDescription("Grants temporal awareness - THE DUDE'S FAVORITE");
        timeRelic.setRarity("mythic");
        timeRelic.setPowerLevel(100);
        timeRelic.setMaxUses(999);
        items.add(temporalItemRepository.save(timeRelic));
        
        invalidateGameCache(gameId);
        return items;
    }
    
    // ======================
    // TEMPORAL LOOP PROCESSING - INTELLIGENT & PERFORMANCE OPTIMIZED
    // ======================
    
    public void processTemporalLoops(String gameId) {
        LocalDateTime now = LocalDateTime.now();
        
        // Get only items that actually need processing (performance!)
        List<TemporalItem> itemsNeedingRefresh = temporalItemRepository.findItemsNeedingRefresh(gameId, now);
        
        if (itemsNeedingRefresh.isEmpty()) {
            return; // Nothing to do, save CPU
        }
        
        // Process in priority order (high priority first)
        itemsNeedingRefresh.sort((a, b) -> b.getPerformancePriority().compareTo(a.getPerformancePriority()));
        
        int processed = 0;
        for (TemporalItem item : itemsNeedingRefresh) {
            if (processed >= 10) break; // Limit processing for 3 players max
            
            if (item.shouldCalculateEffect()) {
                processItemTemporalEffect(item);
                temporalItemRepository.save(item);
                processed++;
            }
        }
        
        if (processed > 0) {
            invalidateGameCache(gameId);
        }
    }
    
    private void processItemTemporalEffect(TemporalItem item) {
        // Perform refresh
        item.performRefresh();
        
        // Calculate and cache effect based on type
        String effectResult = calculateTemporalEffect(item);
        item.cacheEffect(effectResult, 5); // Cache for 5 minutes
        
        // Log for debugging (THE DUDE style)
        System.out.println("[TEMPORAL] " + item.getItemName() + " refreshed - " + 
                          item.getTemporalEffectType() + " - Uses: " + item.getCurrentUses());
    }
    
    private String calculateTemporalEffect(TemporalItem item) {
        switch (item.getTemporalEffectType()) {
            case "TIC_BASED":
                return "Effect active for " + item.getRefreshInterval() + " seconds";
            case "DAY_BASED":
                return "Daily effect - next refresh in " + item.getRefreshInterval() + " day(s)";
            case "TURN_BASED":
                return "Turn-based effect - " + item.getCurrentUses() + " uses remaining";
            default:
                return "Temporal effect active";
        }
    }
    
    // ======================
    // ITEM MANAGEMENT
    // ======================
    
    public List<TemporalItem> getGameItems(String gameId) {
        // Check cache first (performance optimization)
        if (isCacheValid(gameId)) {
            return gameItemsCache.get(gameId);
        }
        
        List<TemporalItem> items = temporalItemRepository.findByGameId(gameId);
        
        // Cache for short duration (3 players, don't need long cache)
        gameItemsCache.put(gameId, items);
        cacheTimestamps.put(gameId, LocalDateTime.now());
        
        return items;
    }
    
    public List<TemporalItem> getPlayerItems(String gameId, String playerId) {
        return temporalItemRepository.findByGameIdAndOwnerId(gameId, playerId);
    }
    
    public List<TemporalItem> getMapItems(String gameId) {
        return temporalItemRepository.findByGameIdAndOwnerIdIsNull(gameId);
    }
    
    public List<TemporalItem> getItemsAtPosition(String gameId, Integer x, Integer y) {
        return temporalItemRepository.findByGameIdAndPositionXAndPositionY(gameId, x, y);
    }
    
    // ======================
    // ITEM INTERACTIONS
    // ======================
    
    public boolean useItem(String itemId, String playerId) {
        Optional<TemporalItem> itemOpt = temporalItemRepository.findByItemId(itemId);
        if (!itemOpt.isPresent()) return false;
        
        TemporalItem item = itemOpt.get();
        
        // Check if player owns item and can use it
        if (!playerId.equals(item.getOwnerId()) || !item.canUse()) {
            return false;
        }
        
        // Use the item
        item.use();
        temporalItemRepository.save(item);
        
        invalidateGameCache(item.getGameId());
        
        System.out.println("[USE] " + playerId + " used " + item.getItemName() + 
                          " - Remaining uses: " + item.getCurrentUses());
        
        return true;
    }
    
    public boolean pickupItem(String itemId, String playerId) {
        Optional<TemporalItem> itemOpt = temporalItemRepository.findByItemId(itemId);
        if (!itemOpt.isPresent()) return false;
        
        TemporalItem item = itemOpt.get();
        
        // Can only pickup items that are on the map
        if (item.getOwnerId() != null) return false;
        
        // Give item to player
        item.setOwnerId(playerId);
        item.setPositionX(null);
        item.setPositionY(null);
        
        temporalItemRepository.save(item);
        invalidateGameCache(item.getGameId());
        
        System.out.println("[PICKUP] " + playerId + " picked up " + item.getItemName());
        
        return true;
    }
    
    public boolean dropItem(String itemId, Integer x, Integer y) {
        Optional<TemporalItem> itemOpt = temporalItemRepository.findByItemId(itemId);
        if (!itemOpt.isPresent()) return false;
        
        TemporalItem item = itemOpt.get();
        
        // Drop item on map
        item.setOwnerId(null);
        item.setPositionX(x);
        item.setPositionY(y);
        
        temporalItemRepository.save(item);
        invalidateGameCache(item.getGameId());
        
        return true;
    }
    
    // ======================
    // PERFORMANCE UTILITIES - THE DUDE OPTIMIZATION
    // ======================
    
    private boolean isCacheValid(String gameId) {
        LocalDateTime cacheTime = cacheTimestamps.get(gameId);
        if (cacheTime == null) return false;
        
        return LocalDateTime.now().isBefore(cacheTime.plusMinutes(CACHE_DURATION_MINUTES));
    }
    
    private void invalidateGameCache(String gameId) {
        gameItemsCache.remove(gameId);
        cacheTimestamps.remove(gameId);
    }
    
    public Map<String, Object> getGameItemsStats(String gameId) {
        Long activeCount = temporalItemRepository.countActiveItemsByGame(gameId);
        List<TemporalItem> needingRefresh = temporalItemRepository.findItemsNeedingRefresh(gameId, LocalDateTime.now());
        
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalActiveItems", activeCount);
        stats.put("itemsNeedingRefresh", needingRefresh.size());
        stats.put("cacheStatus", isCacheValid(gameId) ? "valid" : "expired");
        stats.put("performanceOptimized", activeCount <= 50); // Good for 3 players
        
        return stats;
    }
    
    // ======================
    // FRONTEND HELPERS - SIMPLE AND CLEAN
    // ======================
    
    public List<Map<String, Object>> getSimpleItemList(String gameId) {
        return getGameItems(gameId).stream()
                .filter(TemporalItem::getIsActive)
                .map(TemporalItem::toSimpleMap)
                .collect(Collectors.toList());
    }
    
    public List<Map<String, Object>> getPlayerInventory(String gameId, String playerId) {
        return getPlayerItems(gameId, playerId).stream()
                .map(TemporalItem::toSimpleMap)
                .collect(Collectors.toList());
    }
} 