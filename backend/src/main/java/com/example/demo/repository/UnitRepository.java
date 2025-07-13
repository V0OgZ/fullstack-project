package com.example.demo.repository;

import com.example.demo.model.Unit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UnitRepository extends JpaRepository<Unit, String> {
    
    // Find units by castle type
    List<Unit> findByCastle(String castle);
    
    // Find units by tier
    List<Unit> findByTier(Integer tier);
    
    // Find units by variant (basic, upgraded, champion)
    List<Unit> findByVariant(String variant);
    
    // Find units by castle and tier
    List<Unit> findByCastleAndTier(String castle, Integer tier);
    
    // Find units by castle, tier and variant
    List<Unit> findByCastleAndTierAndVariant(String castle, Integer tier, String variant);
    
    // Get all castle types
    @Query("SELECT DISTINCT u.castle FROM Unit u ORDER BY u.castle")
    List<String> findAllCastleTypes();
    
    // Get unit counts by castle
    @Query("SELECT u.castle, COUNT(u) FROM Unit u GROUP BY u.castle")
    List<Object[]> getUnitCountsByCastle();
    
    // Find units with cost filters
    @Query("SELECT u FROM Unit u WHERE " +
           "(:maxGold IS NULL OR u.goldCost <= :maxGold) AND " +
           "(:maxOre IS NULL OR u.oreCost <= :maxOre OR u.oreCost IS NULL) AND " +
           "(:maxSulfur IS NULL OR u.sulfurCost <= :maxSulfur OR u.sulfurCost IS NULL)")
    List<Unit> findUnitsByCostFilter(@Param("maxGold") Integer maxGold, 
                                   @Param("maxOre") Integer maxOre, 
                                   @Param("maxSulfur") Integer maxSulfur);
    
    // Find strongest units by tier
    @Query("SELECT u FROM Unit u WHERE u.tier = :tier ORDER BY u.aiValue DESC")
    List<Unit> findStrongestUnitsByTier(@Param("tier") Integer tier);
} 