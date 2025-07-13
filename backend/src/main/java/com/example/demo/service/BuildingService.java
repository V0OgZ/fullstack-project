package com.example.demo.service;

import com.example.demo.model.Building;
import com.example.demo.model.Unit;
import com.example.demo.repository.BuildingRepository;
import com.example.demo.repository.UnitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
public class BuildingService {
    
    @Autowired
    private BuildingRepository buildingRepository;
    
    @Autowired
    private UnitRepository unitRepository;
    
    // ======================
    // BUILDING MANAGEMENT
    // ======================
    
    public List<Building> getAllBuildings() {
        return buildingRepository.findAll();
    }
    
    public Optional<Building> getBuildingById(String buildingId) {
        return buildingRepository.findByBuildingId(buildingId);
    }
    
    public List<Building> getBuildingsByCastle(String castleId) {
        return buildingRepository.findByCastleId(castleId);
    }
    
    public List<Building> getBuildingsByPlayer(String playerId) {
        return buildingRepository.findByPlayerId(playerId);
    }
    
    public List<Building> getBuildingsByGame(String gameId) {
        return buildingRepository.findByGameId(gameId);
    }
    
    public List<Building> getBuildingsByType(String buildingType) {
        return buildingRepository.findByBuildingType(buildingType);
    }
    
    public List<Building> getConstructedBuildings(String castleId) {
        return buildingRepository.findByCastleIdAndIsConstructed(castleId, true);
    }
    
    public List<Building> getBuildingsUnderConstruction(String castleId) {
        return buildingRepository.findByCastleIdAndIsConstructed(castleId, false);
    }
    
    // ======================
    // BUILDING CONSTRUCTION
    // ======================
    
    public Building startConstruction(String castleId, String playerId, String gameId, 
                                    String buildingType, Integer positionX, Integer positionY) {
        // Check if position is available
        if (buildingRepository.isPositionOccupied(castleId, positionX, positionY)) {
            throw new RuntimeException("Position already occupied");
        }
        
        // Generate unique building ID
        String buildingId = generateBuildingId(castleId, buildingType);
        
        // Create new building
        Building building = new Building(buildingId, castleId, playerId, gameId, 
                                       buildingType, positionX, positionY);
        
        // Save and return
        return buildingRepository.save(building);
    }
    
    public Building startConstructionWithResources(String castleId, String playerId, String gameId, 
                                                 String buildingType, Integer positionX, Integer positionY,
                                                 Map<String, Integer> playerResources) {
        // Check if position is available
        if (buildingRepository.isPositionOccupied(castleId, positionX, positionY)) {
            throw new RuntimeException("Position already occupied");
        }
        
        // Create building to get costs
        Building building = new Building(generateBuildingId(castleId, buildingType), 
                                       castleId, playerId, gameId, buildingType, positionX, positionY);
        
        // Check if player has enough resources
        if (!canAffordBuilding(building, playerResources)) {
            throw new RuntimeException("Insufficient resources");
        }
        
        // Deduct resources (this would be handled by GameService)
        Map<String, Integer> resourceCost = getBuildingCost(building);
        
        // Save and return
        return buildingRepository.save(building);
    }
    
    public Building completeConstruction(String buildingId) {
        Optional<Building> optBuilding = buildingRepository.findByBuildingId(buildingId);
        if (!optBuilding.isPresent()) {
            throw new RuntimeException("Building not found");
        }
        
        Building building = optBuilding.get();
        if (building.getIsConstructed()) {
            throw new RuntimeException("Building already constructed");
        }
        
        // Check if construction time has passed
        LocalDateTime constructionEnd = building.getConstructionStarted().plusSeconds(building.getConstructionTime());
        if (LocalDateTime.now().isBefore(constructionEnd)) {
            throw new RuntimeException("Construction not ready");
        }
        
        building.completeConstruction();
        
        // Reset weekly growth for military buildings
        if (building.getWeeklyGrowth() != null && building.getWeeklyGrowth() > 0) {
            building.resetWeeklyGrowth();
        }
        
        return buildingRepository.save(building);
    }
    
    public List<Building> checkAndCompleteReadyBuildings(String gameId) {
        List<Building> readyBuildings = buildingRepository.findByGameIdAndIsConstructed(gameId, false)
                .stream()
                .filter(building -> {
                    LocalDateTime constructionEnd = building.getConstructionStarted().plusSeconds(building.getConstructionTime());
                    return LocalDateTime.now().isAfter(constructionEnd);
                })
                .collect(Collectors.toList());
        
        List<Building> completedBuildings = new ArrayList<>();
        for (Building building : readyBuildings) {
            building.completeConstruction();
            if (building.getWeeklyGrowth() != null && building.getWeeklyGrowth() > 0) {
                building.resetWeeklyGrowth();
            }
            completedBuildings.add(buildingRepository.save(building));
        }
        
        return completedBuildings;
    }
    
    // ======================
    // BUILDING UPGRADES
    // ======================
    
    public Building upgradeBuilding(String buildingId, Map<String, Integer> playerResources) {
        Optional<Building> optBuilding = buildingRepository.findByBuildingId(buildingId);
        if (!optBuilding.isPresent()) {
            throw new RuntimeException("Building not found");
        }
        
        Building building = optBuilding.get();
        if (!building.canUpgrade()) {
            throw new RuntimeException("Building cannot be upgraded");
        }
        
        // Check resource costs for next level
        Building nextLevel = new Building();
        nextLevel.setBuildingType(building.getBuildingType());
        nextLevel.setLevel(building.getLevel() + 1);
        
        if (!canAffordBuilding(nextLevel, playerResources)) {
            throw new RuntimeException("Insufficient resources for upgrade");
        }
        
        // Upgrade building
        building.upgradeLevel();
        building.setIsConstructed(false);
        building.setConstructionStarted(LocalDateTime.now());
        
        return buildingRepository.save(building);
    }
    
    public List<Building> getUpgradeableBuildings(String castleId) {
        return buildingRepository.findUpgradeableBuildingsByCastle(castleId);
    }
    
    // ======================
    // UNIT RECRUITMENT
    // ======================
    
    public List<Building> getBuildingsWithUnits(String castleId) {
        return buildingRepository.findBuildingsWithAvailableUnitsByCastle(castleId);
    }
    
    public Map<String, Integer> getAvailableUnitsForRecruitment(String castleId) {
        List<Building> buildings = getBuildingsWithUnits(castleId);
        Map<String, Integer> availableUnits = new HashMap<>();
        
        for (Building building : buildings) {
            for (String unitType : building.getRecruitableUnits()) {
                availableUnits.merge(unitType, building.getCurrentUnitsAvailable(), Integer::sum);
            }
        }
        
        return availableUnits;
    }
    
    public boolean canRecruitUnit(String castleId, String unitType, Integer quantity) {
        List<Building> buildings = buildingRepository.findBuildingsWithAvailableUnitsByCastle(castleId);
        
        int totalAvailable = 0;
        for (Building building : buildings) {
            if (building.getRecruitableUnits().contains(unitType)) {
                totalAvailable += building.getCurrentUnitsAvailable();
            }
        }
        
        return totalAvailable >= quantity;
    }
    
    public Building recruitUnits(String buildingId, String unitType, Integer quantity) {
        Optional<Building> optBuilding = buildingRepository.findByBuildingId(buildingId);
        if (!optBuilding.isPresent()) {
            throw new RuntimeException("Building not found");
        }
        
        Building building = optBuilding.get();
        
        if (!building.getRecruitableUnits().contains(unitType)) {
            throw new RuntimeException("Building cannot recruit this unit type");
        }
        
        if (building.getCurrentUnitsAvailable() < quantity) {
            throw new RuntimeException("Not enough units available");
        }
        
        // Reduce available units
        building.setCurrentUnitsAvailable(building.getCurrentUnitsAvailable() - quantity);
        
        return buildingRepository.save(building);
    }
    
    public void resetWeeklyGrowth(String gameId) {
        List<Building> buildings = buildingRepository.findByGameId(gameId);
        for (Building building : buildings) {
            if (building.getWeeklyGrowth() != null && building.getWeeklyGrowth() > 0) {
                building.resetWeeklyGrowth();
                buildingRepository.save(building);
            }
        }
    }
    
    public void resetWeeklyGrowthForCastle(String castleId) {
        List<Building> buildings = buildingRepository.findByCastleId(castleId);
        for (Building building : buildings) {
            if (building.getWeeklyGrowth() != null && building.getWeeklyGrowth() > 0) {
                building.resetWeeklyGrowth();
                buildingRepository.save(building);
            }
        }
    }
    
    // ======================
    // CASTLE BONUSES
    // ======================
    
    public Map<String, Integer> getCastleBonuses(String castleId) {
        List<Building> buildings = getConstructedBuildings(castleId);
        
        Map<String, Integer> bonuses = new HashMap<>();
        bonuses.put("gold", 0);
        bonuses.put("resource", 0);
        bonuses.put("defense", 0);
        bonuses.put("morale", 0);
        bonuses.put("luck", 0);
        bonuses.put("spellPower", 0);
        bonuses.put("manaRegeneration", 0);
        
        for (Building building : buildings) {
            if (building.getDailyGoldBonus() != null) {
                bonuses.merge("gold", building.getDailyGoldBonus(), Integer::sum);
            }
            if (building.getDailyResourceBonus() != null) {
                bonuses.merge("resource", building.getDailyResourceBonus(), Integer::sum);
            }
            if (building.getDefenseBonus() != null) {
                bonuses.merge("defense", building.getDefenseBonus(), Integer::sum);
            }
            if (building.getMoraleBonus() != null) {
                bonuses.merge("morale", building.getMoraleBonus(), Integer::sum);
            }
            if (building.getLuckBonus() != null) {
                bonuses.merge("luck", building.getLuckBonus(), Integer::sum);
            }
            if (building.getSpellPowerBonus() != null) {
                bonuses.merge("spellPower", building.getSpellPowerBonus(), Integer::sum);
            }
            if (building.getManaRegenerationBonus() != null) {
                bonuses.merge("manaRegeneration", building.getManaRegenerationBonus(), Integer::sum);
            }
        }
        
        return bonuses;
    }
    
    public List<String> getAvailableSpells(String castleId) {
        List<Building> buildings = getConstructedBuildings(castleId);
        Set<String> spells = new HashSet<>();
        
        for (Building building : buildings) {
            spells.addAll(building.getAvailableSpells());
        }
        
        return new ArrayList<>(spells);
    }
    
    // ======================
    // CASTLE TEMPLATES
    // ======================
    
    public List<Building> createStartingCastle(String castleId, String playerId, String gameId, String castleType) {
        List<Building> buildings = new ArrayList<>();
        
        // Town Hall (always at center)
        Building townHall = new Building(generateBuildingId(castleId, "town_hall"), 
                                       castleId, playerId, gameId, "town_hall", 2, 2);
        townHall.completeConstruction();
        buildings.add(buildingRepository.save(townHall));
        
        // Castle-specific starting buildings
        switch (castleType) {
            case "castle":
                buildings.addAll(createCastleStartingBuildings(castleId, playerId, gameId));
                break;
            case "rampart":
                buildings.addAll(createRampartStartingBuildings(castleId, playerId, gameId));
                break;
            case "tower":
                buildings.addAll(createTowerStartingBuildings(castleId, playerId, gameId));
                break;
            case "inferno":
                buildings.addAll(createInfernoStartingBuildings(castleId, playerId, gameId));
                break;
            case "necropolis":
                buildings.addAll(createNecropolisStartingBuildings(castleId, playerId, gameId));
                break;
            case "dungeon":
                buildings.addAll(createDungeonStartingBuildings(castleId, playerId, gameId));
                break;
            case "stronghold":
                buildings.addAll(createStrongholdStartingBuildings(castleId, playerId, gameId));
                break;
            case "fortress":
                buildings.addAll(createFortressStartingBuildings(castleId, playerId, gameId));
                break;
        }
        
        return buildings;
    }
    
    private List<Building> createCastleStartingBuildings(String castleId, String playerId, String gameId) {
        List<Building> buildings = new ArrayList<>();
        
        // Barracks
        Building barracks = new Building(generateBuildingId(castleId, "barracks"), 
                                       castleId, playerId, gameId, "barracks", 1, 1);
        barracks.completeConstruction();
        buildings.add(buildingRepository.save(barracks));
        
        // Archery Range
        Building archeryRange = new Building(generateBuildingId(castleId, "archery_range"), 
                                           castleId, playerId, gameId, "archery_range", 3, 1);
        archeryRange.completeConstruction();
        buildings.add(buildingRepository.save(archeryRange));
        
        // Tavern
        Building tavern = new Building(generateBuildingId(castleId, "tavern"), 
                                     castleId, playerId, gameId, "tavern", 1, 3);
        tavern.completeConstruction();
        buildings.add(buildingRepository.save(tavern));
        
        return buildings;
    }
    
    private List<Building> createRampartStartingBuildings(String castleId, String playerId, String gameId) {
        // Similar implementation for other castle types
        return new ArrayList<>();
    }
    
    private List<Building> createTowerStartingBuildings(String castleId, String playerId, String gameId) {
        return new ArrayList<>();
    }
    
    private List<Building> createInfernoStartingBuildings(String castleId, String playerId, String gameId) {
        return new ArrayList<>();
    }
    
    private List<Building> createNecropolisStartingBuildings(String castleId, String playerId, String gameId) {
        return new ArrayList<>();
    }
    
    private List<Building> createDungeonStartingBuildings(String castleId, String playerId, String gameId) {
        return new ArrayList<>();
    }
    
    private List<Building> createStrongholdStartingBuildings(String castleId, String playerId, String gameId) {
        return new ArrayList<>();
    }
    
    private List<Building> createFortressStartingBuildings(String castleId, String playerId, String gameId) {
        return new ArrayList<>();
    }
    
    // ======================
    // STATISTICS
    // ======================
    
    public Map<String, Object> getBuildingStatistics() {
        Map<String, Object> stats = new HashMap<>();
        
        List<Object[]> typeStats = buildingRepository.getBuildingCountsByType();
        Map<String, Long> buildingsByType = new HashMap<>();
        for (Object[] row : typeStats) {
            buildingsByType.put((String) row[0], (Long) row[1]);
        }
        
        stats.put("totalBuildings", buildingRepository.count());
        stats.put("buildingsByType", buildingsByType);
        stats.put("constructedBuildings", buildingRepository.findByIsConstructed(true).size());
        stats.put("buildingsUnderConstruction", buildingRepository.findByIsConstructed(false).size());
        
        return stats;
    }
    
    public Map<String, Object> getPlayerBuildingStatistics(String playerId) {
        List<Building> playerBuildings = buildingRepository.findByPlayerId(playerId);
        
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalBuildings", playerBuildings.size());
        stats.put("constructedBuildings", playerBuildings.stream().filter(Building::getIsConstructed).count());
        stats.put("buildingsUnderConstruction", playerBuildings.stream().filter(b -> !b.getIsConstructed()).count());
        
        // Resource production
        Integer goldProduction = buildingRepository.getTotalDailyGoldBonusByPlayer(playerId);
        Integer resourceProduction = buildingRepository.getTotalDailyResourceBonusByPlayer(playerId);
        stats.put("dailyGoldProduction", goldProduction != null ? goldProduction : 0);
        stats.put("dailyResourceProduction", resourceProduction != null ? resourceProduction : 0);
        
        return stats;
    }
    
    // ======================
    // UTILITY METHODS
    // ======================
    
    private String generateBuildingId(String castleId, String buildingType) {
        return castleId + "_" + buildingType + "_" + System.currentTimeMillis();
    }
    
    private boolean canAffordBuilding(Building building, Map<String, Integer> playerResources) {
        Map<String, Integer> cost = getBuildingCost(building);
        
        for (Map.Entry<String, Integer> entry : cost.entrySet()) {
            String resource = entry.getKey();
            Integer required = entry.getValue();
            Integer available = playerResources.getOrDefault(resource, 0);
            
            if (available < required) {
                return false;
            }
        }
        
        return true;
    }
    
    private Map<String, Integer> getBuildingCost(Building building) {
        Map<String, Integer> cost = new HashMap<>();
        
        if (building.getGoldCost() != null) cost.put("gold", building.getGoldCost());
        if (building.getWoodCost() != null) cost.put("wood", building.getWoodCost());
        if (building.getStoneCost() != null) cost.put("stone", building.getStoneCost());
        if (building.getOreCost() != null) cost.put("ore", building.getOreCost());
        if (building.getCrystalCost() != null) cost.put("crystal", building.getCrystalCost());
        if (building.getGemsCost() != null) cost.put("gems", building.getGemsCost());
        if (building.getSulfurCost() != null) cost.put("sulfur", building.getSulfurCost());
        
        return cost;
    }
    
    // ======================
    // CLEANUP
    // ======================
    
    public void deleteBuilding(String buildingId) {
        Optional<Building> building = buildingRepository.findByBuildingId(buildingId);
        if (building.isPresent()) {
            buildingRepository.delete(building.get());
        }
    }
    
    public void deleteAllBuildingsForGame(String gameId) {
        buildingRepository.deleteByGameId(gameId);
    }
    
    public void deleteAllBuildingsForPlayer(String playerId) {
        buildingRepository.deleteByPlayerId(playerId);
    }
    
    public void deleteAllBuildingsForCastle(String castleId) {
        buildingRepository.deleteByCastleId(castleId);
    }
} 