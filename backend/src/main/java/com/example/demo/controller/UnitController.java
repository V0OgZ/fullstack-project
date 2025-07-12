package com.example.demo.controller;

import com.example.demo.model.Unit;
import com.example.demo.service.UnitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/units")
@CrossOrigin(origins = "http://localhost:3000")
public class UnitController {
    
    @Autowired
    private UnitService unitService;
    
    // Get all units
    @GetMapping
    public ResponseEntity<List<Unit>> getAllUnits() {
        List<Unit> units = unitService.getAllUnits();
        return ResponseEntity.ok(units);
    }
    
    // Get unit by ID
    @GetMapping("/{id}")
    public ResponseEntity<Unit> getUnitById(@PathVariable String id) {
        Optional<Unit> unit = unitService.getUnitById(id);
        return unit.map(ResponseEntity::ok)
                  .orElse(ResponseEntity.notFound().build());
    }
    
    // Get units by castle
    @GetMapping("/castle/{castle}")
    public ResponseEntity<List<Unit>> getUnitsByCastle(@PathVariable String castle) {
        List<Unit> units = unitService.getUnitsByCastle(castle);
        return ResponseEntity.ok(units);
    }
    
    // Get units by tier
    @GetMapping("/tier/{tier}")
    public ResponseEntity<List<Unit>> getUnitsByTier(@PathVariable Integer tier) {
        List<Unit> units = unitService.getUnitsByTier(tier);
        return ResponseEntity.ok(units);
    }
    
    // Get complete castle roster (grouped by tier)
    @GetMapping("/castle/{castle}/roster")
    public ResponseEntity<Map<Integer, List<Unit>>> getCastleRoster(@PathVariable String castle) {
        Map<Integer, List<Unit>> roster = unitService.getCastleRoster(castle);
        return ResponseEntity.ok(roster);
    }
    
    // Get unit progression line (basic -> upgraded -> champion)
    @GetMapping("/castle/{castle}/tier/{tier}/progression")
    public ResponseEntity<List<Unit>> getUnitProgressionLine(
            @PathVariable String castle, 
            @PathVariable Integer tier) {
        List<Unit> progression = unitService.getUnitProgressionLine(castle, tier);
        return ResponseEntity.ok(progression);
    }
    
    // Get all castle types
    @GetMapping("/castles")
    public ResponseEntity<List<String>> getAllCastleTypes() {
        List<String> castles = unitService.getAllCastleTypes();
        return ResponseEntity.ok(castles);
    }
    
    // Get unit statistics
    @GetMapping("/statistics")
    public ResponseEntity<Map<String, Object>> getUnitStatistics() {
        Map<String, Object> stats = unitService.getUnitStatistics();
        return ResponseEntity.ok(stats);
    }
    
    // Create new unit
    @PostMapping
    public ResponseEntity<Unit> createUnit(@RequestBody Unit unit) {
        Unit savedUnit = unitService.saveUnit(unit);
        return ResponseEntity.ok(savedUnit);
    }
    
    // Create multiple units
    @PostMapping("/batch")
    public ResponseEntity<List<Unit>> createUnits(@RequestBody List<Unit> units) {
        List<Unit> savedUnits = unitService.saveAllUnits(units);
        return ResponseEntity.ok(savedUnits);
    }
    
    // Update unit
    @PutMapping("/{id}")
    public ResponseEntity<Unit> updateUnit(@PathVariable String id, @RequestBody Unit unit) {
        unit.setId(id);
        Unit savedUnit = unitService.saveUnit(unit);
        return ResponseEntity.ok(savedUnit);
    }
    
    // Delete unit
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUnit(@PathVariable String id) {
        unitService.deleteUnit(id);
        return ResponseEntity.noContent().build();
    }
    
    // Initialize default units (for development)
    @PostMapping("/initialize")
    public ResponseEntity<String> initializeDefaultUnits() {
        unitService.initializeDefaultUnits();
        return ResponseEntity.ok("Default units initialized successfully");
    }
    
    // Health check for units API
    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> getUnitsHealth() {
        Map<String, Object> health = Map.of(
            "status", "UP",
            "service", "Units API",
            "totalUnits", unitService.getAllUnits().size(),
            "timestamp", System.currentTimeMillis()
        );
        return ResponseEntity.ok(health);
    }
} 