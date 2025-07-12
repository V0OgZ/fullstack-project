package com.example.demo.service;

import com.example.demo.model.Unit;
import com.example.demo.repository.UnitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class UnitService {
    
    @Autowired
    private UnitRepository unitRepository;
    
    // Get all units
    public List<Unit> getAllUnits() {
        return unitRepository.findAll();
    }
    
    // Get unit by ID
    public Optional<Unit> getUnitById(String id) {
        return unitRepository.findById(id);
    }
    
    // Get units by castle
    public List<Unit> getUnitsByCastle(String castle) {
        return unitRepository.findByCastle(castle);
    }
    
    // Get units by tier
    public List<Unit> getUnitsByTier(Integer tier) {
        return unitRepository.findByTier(tier);
    }
    
    // Get complete castle roster (all tiers for a castle)
    public Map<Integer, List<Unit>> getCastleRoster(String castle) {
        List<Unit> castleUnits = unitRepository.findByCastle(castle);
        return castleUnits.stream()
                .collect(Collectors.groupingBy(Unit::getTier));
    }
    
    // Get unit progression line (basic -> upgraded -> champion)
    public List<Unit> getUnitProgressionLine(String castle, Integer tier) {
        return unitRepository.findByCastleAndTier(castle, tier)
                .stream()
                .sorted(Comparator.comparing(u -> getVariantOrder(u.getVariant())))
                .collect(Collectors.toList());
    }
    
    // Get all castle types
    public List<String> getAllCastleTypes() {
        return unitRepository.findAllCastleTypes();
    }
    
    // Get unit statistics
    public Map<String, Object> getUnitStatistics() {
        Map<String, Object> stats = new HashMap<>();
        
        List<Object[]> countsByCastle = unitRepository.getUnitCountsByCastle();
        Map<String, Long> castleCounts = new HashMap<>();
        for (Object[] row : countsByCastle) {
            castleCounts.put((String) row[0], (Long) row[1]);
        }
        
        stats.put("totalUnits", unitRepository.count());
        stats.put("unitsByCastle", castleCounts);
        stats.put("castleCount", getAllCastleTypes().size());
        
        return stats;
    }
    
    // Create or update unit
    public Unit saveUnit(Unit unit) {
        return unitRepository.save(unit);
    }
    
    // Create multiple units
    public List<Unit> saveAllUnits(List<Unit> units) {
        return unitRepository.saveAll(units);
    }
    
    // Delete unit
    public void deleteUnit(String id) {
        unitRepository.deleteById(id);
    }
    
    // Initialize default units (for development)
    public void initializeDefaultUnits() {
        if (unitRepository.count() == 0) {
            List<Unit> defaultUnits = createDefaultUnits();
            unitRepository.saveAll(defaultUnits);
        }
    }
    
    // Helper method to get variant order for sorting
    private int getVariantOrder(String variant) {
        switch (variant.toLowerCase()) {
            case "basic": return 1;
            case "upgraded": return 2;
            case "champion": return 3;
            default: return 4;
        }
    }
    
    // Create sample units for testing
    private List<Unit> createDefaultUnits() {
        List<Unit> units = new ArrayList<>();
        
        // Castle - Tier 1: Pikeman line
        units.add(new Unit("castle_pikeman_basic", "Pikeman", "castle", 1, "basic", 
                           4, 5, 10, 1, 3, 4, 14, 80));
        units.add(new Unit("castle_pikeman_upgraded", "Halberdier", "castle", 1, "upgraded", 
                           6, 5, 10, 2, 3, 5, 14, 115));
        units.add(new Unit("castle_pikeman_champion", "Royal Halberdier", "castle", 1, "champion", 
                           8, 7, 12, 2, 4, 6, 14, 150));
        
        // Castle - Tier 2: Archer line
        units.add(new Unit("castle_archer_basic", "Archer", "castle", 2, "basic", 
                           6, 3, 10, 2, 3, 4, 9, 150));
        units.add(new Unit("castle_archer_upgraded", "Marksman", "castle", 2, "upgraded", 
                           6, 3, 10, 2, 3, 6, 9, 185));
        units.add(new Unit("castle_archer_champion", "Royal Marksman", "castle", 2, "champion", 
                           8, 5, 12, 3, 4, 7, 9, 230));
        
        // Castle - Tier 7: Angel line
        units.add(new Unit("castle_angel_basic", "Angel", "castle", 7, "basic", 
                           20, 20, 200, 50, 50, 12, 1, 3000));
        units.add(new Unit("castle_angel_upgraded", "Archangel", "castle", 7, "upgraded", 
                           30, 30, 250, 50, 50, 18, 1, 4000));
        units.add(new Unit("castle_angel_champion", "Seraphim", "castle", 7, "champion", 
                           35, 35, 300, 60, 80, 20, 1, 5000));
        
        // Set costs for units
        for (Unit unit : units) {
            switch (unit.getTier()) {
                case 1:
                    unit.setGoldCost(unit.getVariant().equals("basic") ? 80 : 
                                   unit.getVariant().equals("upgraded") ? 115 : 150);
                    unit.setWoodCost(5);
                    break;
                case 2:
                    unit.setGoldCost(unit.getVariant().equals("basic") ? 150 : 
                                   unit.getVariant().equals("upgraded") ? 185 : 230);
                    unit.setWoodCost(10);
                    break;
                case 7:
                    unit.setGoldCost(unit.getVariant().equals("basic") ? 3000 : 
                                   unit.getVariant().equals("upgraded") ? 4000 : 5000);
                    unit.setCrystalCost(unit.getVariant().equals("basic") ? 20 : 
                                      unit.getVariant().equals("upgraded") ? 20 : 25);
                    unit.setGemsCost(unit.getVariant().equals("basic") ? 5 : 
                                   unit.getVariant().equals("upgraded") ? 5 : 10);
                    break;
            }
        }
        
        return units;
    }
} 