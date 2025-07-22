package com.example.demo.controller;

import com.example.demo.model.Building;
import com.example.demo.service.BuildingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/buildings")
@CrossOrigin(origins = "http://localhost:3000")
public class BuildingController {
    
    @Autowired
    private BuildingService buildingService;
    
    // ======================
    // BUILDING QUERIES
    // ======================
    
    @GetMapping
    public ResponseEntity<List<Building>> getAllBuildings() {
        List<Building> buildings = buildingService.getAllBuildings();
        return ResponseEntity.ok(buildings);
    }
    
    @GetMapping("/{buildingId}")
    public ResponseEntity<Building> getBuildingById(@PathVariable String buildingId) {
        return buildingService.getBuildingById(buildingId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/castle/{castleId}")
    public ResponseEntity<List<Building>> getBuildingsByCastle(@PathVariable String castleId) {
        List<Building> buildings = buildingService.getBuildingsByCastle(castleId);
        return ResponseEntity.ok(buildings);
    }
    
    @GetMapping("/player/{playerId}")
    public ResponseEntity<List<Building>> getBuildingsByPlayer(@PathVariable String playerId) {
        List<Building> buildings = buildingService.getBuildingsByPlayer(playerId);
        return ResponseEntity.ok(buildings);
    }
    
    @GetMapping("/game/{gameId}")
    public ResponseEntity<List<Building>> getBuildingsByGame(@PathVariable String gameId) {
        List<Building> buildings = buildingService.getBuildingsByGame(gameId);
        return ResponseEntity.ok(buildings);
    }
    
    @GetMapping("/type/{buildingType}")
    public ResponseEntity<List<Building>> getBuildingsByType(@PathVariable String buildingType) {
        List<Building> buildings = buildingService.getBuildingsByType(buildingType);
        return ResponseEntity.ok(buildings);
    }
    
    @GetMapping("/castle/{castleId}/constructed")
    public ResponseEntity<List<Building>> getConstructedBuildings(@PathVariable String castleId) {
        List<Building> buildings = buildingService.getConstructedBuildings(castleId);
        return ResponseEntity.ok(buildings);
    }
    
    @GetMapping("/castle/{castleId}/construction")
    public ResponseEntity<List<Building>> getBuildingsUnderConstruction(@PathVariable String castleId) {
        List<Building> buildings = buildingService.getBuildingsUnderConstruction(castleId);
        return ResponseEntity.ok(buildings);
    }
    
    @GetMapping("/castle/{castleId}/upgradeable")
    public ResponseEntity<List<Building>> getUpgradeableBuildings(@PathVariable String castleId) {
        List<Building> buildings = buildingService.getUpgradeableBuildings(castleId);
        return ResponseEntity.ok(buildings);
    }
    
    // ======================
    // BUILDING CONSTRUCTION
    // ======================
    
    @PostMapping("/construct")
    public ResponseEntity<Building> startConstruction(@RequestBody Map<String, Object> request) {
        try {
            String castleId = (String) request.get("castleId");
            String playerId = (String) request.get("playerId");
            String gameId = (String) request.get("gameId");
            String buildingType = (String) request.get("buildingType");
            Integer positionX = (Integer) request.get("positionX");
            Integer positionY = (Integer) request.get("positionY");
            
            Building building = buildingService.startConstruction(castleId, playerId, gameId, 
                                                                buildingType, positionX, positionY);
            return ResponseEntity.ok(building);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
    
    @PostMapping("/construct/with-resources")
    public ResponseEntity<Map<String, Object>> startConstructionWithResources(@RequestBody Map<String, Object> request) {
        try {
            String castleId = (String) request.get("castleId");
            String playerId = (String) request.get("playerId");
            String gameId = (String) request.get("gameId");
            String buildingType = (String) request.get("buildingType");
            Integer positionX = (Integer) request.get("positionX");
            Integer positionY = (Integer) request.get("positionY");
            Map<String, Integer> playerResources = (Map<String, Integer>) request.get("playerResources");
            
            Building building = buildingService.startConstructionWithResources(castleId, playerId, gameId, 
                                                                              buildingType, positionX, positionY, playerResources);
            
            Map<String, Object> response = Map.of(
                "building", building,
                "success", true,
                "message", "Construction started successfully"
            );
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = Map.of(
                "success", false,
                "message", e.getMessage()
            );
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    @PostMapping("/{buildingId}/complete")
    public ResponseEntity<Map<String, Object>> completeConstruction(@PathVariable String buildingId) {
        try {
            Building building = buildingService.completeConstruction(buildingId);
            Map<String, Object> response = Map.of(
                "building", building,
                "success", true,
                "message", "Construction completed successfully"
            );
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = Map.of(
                "success", false,
                "message", e.getMessage()
            );
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    @PostMapping("/game/{gameId}/check-construction")
    public ResponseEntity<List<Building>> checkAndCompleteReadyBuildings(@PathVariable String gameId) {
        List<Building> completedBuildings = buildingService.checkAndCompleteReadyBuildings(gameId);
        return ResponseEntity.ok(completedBuildings);
    }
    
    // ======================
    // BUILDING UPGRADES
    // ======================
    
    @PostMapping("/{buildingId}/upgrade")
    public ResponseEntity<Map<String, Object>> upgradeBuilding(@PathVariable String buildingId, 
                                                             @RequestBody Map<String, Object> request) {
        try {
            Map<String, Integer> playerResources = (Map<String, Integer>) request.get("playerResources");
            Building building = buildingService.upgradeBuilding(buildingId, playerResources);
            
            Map<String, Object> response = Map.of(
                "building", building,
                "success", true,
                "message", "Building upgrade started successfully"
            );
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = Map.of(
                "success", false,
                "message", e.getMessage()
            );
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    // ======================
    // UNIT RECRUITMENT
    // ======================
    
    @GetMapping("/castle/{castleId}/units")
    public ResponseEntity<List<Building>> getBuildingsWithUnits(@PathVariable String castleId) {
        List<Building> buildings = buildingService.getBuildingsWithUnits(castleId);
        return ResponseEntity.ok(buildings);
    }
    
    @GetMapping("/castle/{castleId}/units/available")
    public ResponseEntity<Map<String, Integer>> getAvailableUnitsForRecruitment(@PathVariable String castleId) {
        Map<String, Integer> availableUnits = buildingService.getAvailableUnitsForRecruitment(castleId);
        return ResponseEntity.ok(availableUnits);
    }
    
    @GetMapping("/castle/{castleId}/units/{unitType}/can-recruit")
    public ResponseEntity<Map<String, Object>> canRecruitUnit(@PathVariable String castleId, 
                                                            @PathVariable String unitType,
                                                            @RequestParam Integer quantity) {
        boolean canRecruit = buildingService.canRecruitUnit(castleId, unitType, quantity);
        Map<String, Object> response = Map.of(
            "canRecruit", canRecruit,
            "unitType", unitType,
            "quantity", quantity
        );
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/{buildingId}/recruit")
    public ResponseEntity<Map<String, Object>> recruitUnits(@PathVariable String buildingId, 
                                                          @RequestBody Map<String, Object> request) {
        try {
            String unitType = (String) request.get("unitType");
            Integer quantity = (Integer) request.get("quantity");
            
            Building building = buildingService.recruitUnits(buildingId, unitType, quantity);
            
            Map<String, Object> response = Map.of(
                "building", building,
                "success", true,
                "message", "Units recruited successfully",
                "unitType", unitType,
                "quantity", quantity
            );
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = Map.of(
                "success", false,
                "message", e.getMessage()
            );
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    @PostMapping("/game/{gameId}/reset-weekly-growth")
    public ResponseEntity<Map<String, Object>> resetWeeklyGrowth(@PathVariable String gameId) {
        buildingService.resetWeeklyGrowth(gameId);
        Map<String, Object> response = Map.of(
            "success", true,
            "message", "Weekly growth reset for all buildings"
        );
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/castle/{castleId}/reset-weekly-growth")
    public ResponseEntity<Map<String, Object>> resetWeeklyGrowthForCastle(@PathVariable String castleId) {
        buildingService.resetWeeklyGrowthForCastle(castleId);
        Map<String, Object> response = Map.of(
            "success", true,
            "message", "Weekly growth reset for castle buildings"
        );
        return ResponseEntity.ok(response);
    }
    
    // ======================
    // CASTLE BONUSES
    // ======================
    
    @GetMapping("/castle/{castleId}/bonuses")
    public ResponseEntity<Map<String, Integer>> getCastleBonuses(@PathVariable String castleId) {
        Map<String, Integer> bonuses = buildingService.getCastleBonuses(castleId);
        return ResponseEntity.ok(bonuses);
    }
    
    @GetMapping("/castle/{castleId}/spells")
    public ResponseEntity<List<String>> getAvailableSpells(@PathVariable String castleId) {
        List<String> spells = buildingService.getAvailableSpells(castleId);
        return ResponseEntity.ok(spells);
    }
    
    // ======================
    // CASTLE TEMPLATES
    // ======================
    
    @PostMapping("/castle/create-starting")
    public ResponseEntity<Map<String, Object>> createStartingCastle(@RequestBody Map<String, Object> request) {
        try {
            String castleId = (String) request.get("castleId");
            String playerId = (String) request.get("playerId");
            String gameId = (String) request.get("gameId");
            String castleType = (String) request.get("castleType");
            
            List<Building> buildings = buildingService.createStartingCastle(castleId, playerId, gameId, castleType);
            
            Map<String, Object> response = Map.of(
                "buildings", buildings,
                "success", true,
                "message", "Starting castle created successfully",
                "castleType", castleType
            );
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = Map.of(
                "success", false,
                "message", e.getMessage()
            );
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    // ======================
    // STATISTICS
    // ======================
    
    @GetMapping("/statistics")
    public ResponseEntity<Map<String, Object>> getBuildingStatistics() {
        Map<String, Object> statistics = buildingService.getBuildingStatistics();
        return ResponseEntity.ok(statistics);
    }
    
    @GetMapping("/player/{playerId}/statistics")
    public ResponseEntity<Map<String, Object>> getPlayerBuildingStatistics(@PathVariable String playerId) {
        Map<String, Object> statistics = buildingService.getPlayerBuildingStatistics(playerId);
        return ResponseEntity.ok(statistics);
    }
    
    // ======================
    // BUILDING MANAGEMENT
    // ======================
    
    @PostMapping
    public ResponseEntity<Building> createBuilding(@RequestBody Building building) {
        // This is for manual building creation (admin/testing purposes)
        return ResponseEntity.ok(building);
    }
    
    @PutMapping("/{buildingId}")
    public ResponseEntity<Building> updateBuilding(@PathVariable String buildingId, 
                                                 @RequestBody Building building) {
        building.setBuildingId(buildingId);
        return ResponseEntity.ok(building);
    }
    
    @DeleteMapping("/{buildingId}")
    public ResponseEntity<Map<String, Object>> deleteBuilding(@PathVariable String buildingId) {
        try {
            buildingService.deleteBuilding(buildingId);
            Map<String, Object> response = Map.of(
                "success", true,
                "message", "Building deleted successfully"
            );
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = Map.of(
                "success", false,
                "message", e.getMessage()
            );
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    @DeleteMapping("/game/{gameId}")
    public ResponseEntity<Map<String, Object>> deleteAllBuildingsForGame(@PathVariable String gameId) {
        try {
            buildingService.deleteAllBuildingsForGame(gameId);
            Map<String, Object> response = Map.of(
                "success", true,
                "message", "All buildings deleted for game"
            );
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = Map.of(
                "success", false,
                "message", e.getMessage()
            );
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    @DeleteMapping("/player/{playerId}")
    public ResponseEntity<Map<String, Object>> deleteAllBuildingsForPlayer(@PathVariable String playerId) {
        try {
            buildingService.deleteAllBuildingsForPlayer(playerId);
            Map<String, Object> response = Map.of(
                "success", true,
                "message", "All buildings deleted for player"
            );
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = Map.of(
                "success", false,
                "message", e.getMessage()
            );
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    @DeleteMapping("/castle/{castleId}")
    public ResponseEntity<Map<String, Object>> deleteAllBuildingsForCastle(@PathVariable String castleId) {
        try {
            buildingService.deleteAllBuildingsForCastle(castleId);
            Map<String, Object> response = Map.of(
                "success", true,
                "message", "All buildings deleted for castle"
            );
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = Map.of(
                "success", false,
                "message", e.getMessage()
            );
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    // ======================
    // HEALTH CHECK
    // ======================
    
    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> health() {
        return ResponseEntity.ok(Map.of("status", "UP", "service", "BuildingService"));
    }
} 