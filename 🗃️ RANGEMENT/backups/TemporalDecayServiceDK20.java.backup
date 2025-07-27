package com.heroesoftimepoc.temporalengine.service;

import com.heroesoftimepoc.temporalengine.model.*;
import com.heroesoftimepoc.temporalengine.repository.PsiStateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;

/**
 * DK20 Temporal Decay System Service
 * 
 * Implements Anna the Martopicker's temporal decay mechanics
 * "If you lag behind time, time lags behind you."
 * 
 * Integrates with existing PsiState and GROFI architecture
 * 
 * @version DK20 - New temporal decay system
 * @see TemporalDecayServiceLegacy for compatibility
 */
@Service("temporalDecayServiceDK20")
public class TemporalDecayServiceDK20 {
    
    private static final Logger logger = LoggerFactory.getLogger(TemporalDecayServiceDK20.class);
    
    // DK20 Constants
    private static final int DECAY_THRESHOLD_DAYS = 5;
    private static final int CAUSAL_DENSITY_LIMIT = 10;
    private static final int MAX_DECAY_LEVEL = 3;
    
    @Autowired
    private PsiStateRepository psiStateRepository;
    
    @Autowired 
    private CausalCollapseService causalCollapseService;
    
    @Autowired
    private TemporalEngineService temporalEngineService;
    
    /**
     * Apply temporal decay to a hero based on their temporal delay
     * Core DK20 mechanic implementation
     */
    public void applyDecayToHero(Hero hero, Game game) {
        logger.info("Checking temporal decay for hero: {}", hero.getName());
        
        double temporalDelay = calculateTemporalDelay(hero, game);
        
        if (temporalDelay > DECAY_THRESHOLD_DAYS) {
            int decayLevel = calculateDecayLevel(temporalDelay);
            logger.info("Applying decay level {} to hero {}", decayLevel, hero.getName());
            
            applyDecayEffects(hero, decayLevel);
            
            // Create decay state for tracking
            createOrUpdateDecayState(hero, game, decayLevel);
        }
    }
    
    /**
     * Check causal density in a zone and apply zone decay if needed
     * Prevents causal overload as per DK20 specs
     */
    public void checkZoneCausalDensity(String zoneName, Game game) {
        List<PsiState> activePsiStates = psiStateRepository.findByGameAndZone(game, zoneName);
        
        if (activePsiStates.size() > CAUSAL_DENSITY_LIMIT) {
            logger.warn("Causal overload detected in zone: {} with {} active psi states", 
                       zoneName, activePsiStates.size());
            
            triggerZoneDecay(zoneName, game, activePsiStates);
        }
    }
    
    /**
     * Calculate temporal delay for a hero relative to game time
     */
    private double calculateTemporalDelay(Hero hero, Game game) {
        LocalDateTime gameTime = game.getCurrentGameTime();
        LocalDateTime heroTime = hero.getLastActionTime();
        
        if (heroTime == null) {
            heroTime = game.getCreatedAt();
        }
        
        return ChronoUnit.DAYS.between(heroTime, gameTime);
    }
    
    /**
     * Calculate decay level based on temporal delay
     * Level 1: 3-5 days, Level 2: 5-7 days, Level 3: 7+ days
     */
    private int calculateDecayLevel(double temporalDelay) {
        if (temporalDelay >= 7.0) return 3;
        if (temporalDelay >= 5.0) return 2;
        if (temporalDelay >= 3.0) return 1;
        return 0;
    }
    
    /**
     * Apply decay effects based on level
     * Implements DK20 effect table
     */
    private void applyDecayEffects(Hero hero, int decayLevel) {
        switch (decayLevel) {
            case 1:
                // Level 1: -1 to non-anchored buildings
                logger.info("Level 1 decay: Reducing building levels for {}", hero.getName());
                hero.setBuildingLevel(Math.max(0, hero.getBuildingLevel() - 1));
                break;
                
            case 2:
                // Level 2: Limited temporal vision, NPCs move away
                logger.info("Level 2 decay: Limiting vision and NPC interaction for {}", hero.getName());
                hero.setTemporalVisionRange(Math.max(1, hero.getTemporalVisionRange() - 1));
                hero.addStatusEffect("NPC_AVOIDANCE");
                break;
                
            case 3:
                // Level 3: Unstable artifacts, building collapse, collapse risks
                logger.warn("Level 3 decay: Critical temporal degradation for {}", hero.getName());
                hero.setBuildingLevel(0); // Buildings collapse
                hero.addStatusEffect("ARTIFACT_INSTABILITY");
                hero.addStatusEffect("COLLAPSE_RISK");
                
                // Trigger potential causal collapse
                triggerCollapseRisk(hero);
                break;
        }
    }
    
    /**
     * Create or update decay state tracking
     */
    private void createOrUpdateDecayState(Hero hero, Game game, int decayLevel) {
        // Create a PsiState to track decay (reusing existing architecture)
        PsiState decayState = new PsiState();
        decayState.setGame(game);
        decayState.setHeroName(hero.getName());
        decayState.setStateType("TEMPORAL_DECAY");
        decayState.setTemporalOffset(decayLevel);
        decayState.setCreatedAt(LocalDateTime.now());
        
        // Use complex amplitude to represent decay intensity
        ComplexAmplitude decayAmplitude = new ComplexAmplitude(
            (double) decayLevel / MAX_DECAY_LEVEL,  // Real part: decay intensity
            0.0  // Imaginary part: reserved for future complexity
        );
        decayState.setComplexAmplitude(decayAmplitude);
        
        psiStateRepository.save(decayState);
        logger.info("Created decay state for hero {} with level {}", hero.getName(), decayLevel);
    }
    
    /**
     * Trigger zone decay when causal density limit is exceeded
     */
    private void triggerZoneDecay(String zoneName, Game game, List<PsiState> psiStates) {
        logger.warn("Triggering zone decay for: {}", zoneName);
        
        // Apply decay to all heroes in the overloaded zone
        for (PsiState psiState : psiStates) {
            String heroName = psiState.getHeroName();
            Optional<Hero> heroOpt = game.getHeroes().stream()
                .filter(h -> h.getName().equals(heroName))
                .findFirst();
                
            if (heroOpt.isPresent()) {
                Hero hero = heroOpt.get();
                applyZoneDecayEffects(hero, zoneName);
            }
        }
    }
    
    /**
     * Apply zone-specific decay effects
     */
    private void applyZoneDecayEffects(Hero hero, String zoneName) {
        logger.info("Applying zone decay effects to {} in zone {}", hero.getName(), zoneName);
        
        // Zone decay applies level 2 effects regardless of time
        hero.addStatusEffect("ZONE_DECAY_" + zoneName);
        hero.setTemporalVisionRange(Math.max(1, hero.getTemporalVisionRange() - 1));
    }
    
    /**
     * Trigger collapse risk for severe decay
     */
    private void triggerCollapseRisk(Hero hero) {
        logger.warn("Triggering collapse risk for hero: {}", hero.getName());
        
        // Use existing causal collapse service
        causalCollapseService.triggerCollapseRisk(hero);
    }
    
    /**
     * Check if hero has anti-decay artifacts (Pendule d'Echo, etc.)
     */
    public boolean hasAntiDecayProtection(Hero hero) {
        List<String> artifacts = hero.getArtifacts();
        
        return artifacts.stream().anyMatch(artifact -> 
            "Pendule d'Echo".equals(artifact) ||
            "Lunettes de l'Oraculon".equals(artifact) ||
            "Spanner of Rewind".equals(artifact)
        );
    }
    
    /**
     * Apply anti-decay artifact effects
     */
    public void applyAntiDecayArtifact(Hero hero, String artifactName) {
        logger.info("Applying anti-decay artifact {} for hero {}", artifactName, hero.getName());
        
        switch (artifactName) {
            case "Pendule d'Echo":
                // Suspend decay for 3 turns
                hero.addTemporaryAbility("DECAY_SUSPENDED", 3);
                break;
                
            case "Lunettes de l'Oraculon":
                // Future vision without decay
                hero.addTemporaryAbility("DECAY_IMMUNE_VISION", 5);
                hero.setTemporalVisionRange(hero.getTemporalVisionRange() + 3);
                break;
                
            case "Spanner of Rewind":
                // Auto-repair structures
                hero.addTemporaryAbility("AUTO_REPAIR", 10);
                hero.setBuildingLevel(hero.getBuildingLevel() + 1);
                break;
        }
    }
    
    /**
     * Get decay statistics for game monitoring
     */
    public DecayStatistics getDecayStatistics(Game game) {
        List<PsiState> decayStates = psiStateRepository.findByGameAndStateType(game, "TEMPORAL_DECAY");
        
        DecayStatistics stats = new DecayStatistics();
        stats.setTotalDecayStates(decayStates.size());
        stats.setAverageDecayLevel(
            decayStates.stream()
                .mapToInt(PsiState::getTemporalOffset)
                .average()
                .orElse(0.0)
        );
        
        return stats;
    }
    
    /**
     * Inner class for decay statistics
     */
    public static class DecayStatistics {
        private int totalDecayStates;
        private double averageDecayLevel;
        
        // Getters and setters
        public int getTotalDecayStates() { return totalDecayStates; }
        public void setTotalDecayStates(int totalDecayStates) { this.totalDecayStates = totalDecayStates; }
        
        public double getAverageDecayLevel() { return averageDecayLevel; }
        public void setAverageDecayLevel(double averageDecayLevel) { this.averageDecayLevel = averageDecayLevel; }
    }
} 