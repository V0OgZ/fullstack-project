package com.heroesoftimepoc.temporalengine.service;

import com.heroesoftimepoc.temporalengine.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.*;

/**
 * The Dude's Temporal Decay Hybrid Service
 * 
 * "Why choose between a White Russian and a Caucasian when you can have both?"
 * 
 * Combines the best of both Anna the Martopicker's visions:
 * - V1 Legacy: Structural decay (buildings crumble)
 * - DK20 Concept: Personal decay (hero abilities fade)
 * 
 * Philosophy: Order (Jean) + Structure (Anna V1) + Individual (Anna DK20) = Perfect Harmony
 */
@Service
public class TemporalDecayHybridService {
    
    private static final Logger logger = LoggerFactory.getLogger(TemporalDecayHybridService.class);
    
    @Autowired
    @Qualifier("temporalDecayServiceLegacy")
    private TemporalDecayServiceLegacy structuralDecayService;
    
    /**
     * The Dude's Unified Decay Report
     * Combines structural and personal decay results
     */
    public static class TemporalDecayReport {
        private List<TemporalDecayServiceLegacy.DecayResult> structuralDecay;
        private List<PersonalDecayResult> personalDecay;
        private boolean personalDecayApplied;
        private String dudeQuote;
        
        public TemporalDecayReport() {
            this.structuralDecay = new ArrayList<>();
            this.personalDecay = new ArrayList<>();
            this.personalDecayApplied = false;
        }
        
        // Getters and setters
        public List<TemporalDecayServiceLegacy.DecayResult> getStructuralDecay() { return structuralDecay; }
        public void setStructuralDecay(List<TemporalDecayServiceLegacy.DecayResult> structuralDecay) { this.structuralDecay = structuralDecay; }
        
        public List<PersonalDecayResult> getPersonalDecay() { return personalDecay; }
        public void setPersonalDecay(List<PersonalDecayResult> personalDecay) { this.personalDecay = personalDecay; }
        
        public boolean isPersonalDecayApplied() { return personalDecayApplied; }
        public void setPersonalDecayApplied(boolean personalDecayApplied) { this.personalDecayApplied = personalDecayApplied; }
        
        public String getDudeQuote() { return dudeQuote; }
        public void setDudeQuote(String dudeQuote) { this.dudeQuote = dudeQuote; }
    }
    
    /**
     * Personal Decay Result for heroes
     */
    public static class PersonalDecayResult {
        private String heroName;
        private int daysBehind;
        private List<String> appliedEffects;
        private String personalQuote;
        
        public PersonalDecayResult(String heroName, int daysBehind) {
            this.heroName = heroName;
            this.daysBehind = daysBehind;
            this.appliedEffects = new ArrayList<>();
        }
        
        // Getters and setters
        public String getHeroName() { return heroName; }
        public int getDaysBehind() { return daysBehind; }
        public List<String> getAppliedEffects() { return appliedEffects; }
        public void addEffect(String effect) { this.appliedEffects.add(effect); }
        public String getPersonalQuote() { return personalQuote; }
        public void setPersonalQuote(String personalQuote) { this.personalQuote = personalQuote; }
    }
    
    /**
     * THE DUDE'S MAIN METHOD: Apply unified temporal decay
     * Combines structural (legacy) and personal (DK20 concept) decay
     */
    public TemporalDecayReport applyUnifiedDecay(Game game) {
        logger.info("🎳 The Dude applying unified temporal decay for game: {}", game.getId());
        
        TemporalDecayReport report = new TemporalDecayReport();
        
        // 1. Apply structural decay using proven legacy system
        List<TemporalDecayServiceLegacy.DecayResult> structuralResults = applyStructuralDecay(game);
        report.setStructuralDecay(structuralResults);
        
        // 2. Apply personal decay using DK20 concept (simplified)
        List<PersonalDecayResult> personalResults = applyPersonalDecay(game);
        report.setPersonalDecay(personalResults);
        report.setPersonalDecayApplied(true);
        
        // 3. Generate The Dude's wisdom
        String dudeQuote = generateDudeQuote(structuralResults.size(), personalResults.size());
        report.setDudeQuote(dudeQuote);
        
        logger.info("🎳 Unified decay completed: {} structural, {} personal effects", 
                   structuralResults.size(), personalResults.size());
        
        return report;
    }
    
    /**
     * Apply structural decay using the proven legacy system
     * "If it ain't broke, don't fix it" - The Dude
     */
    private List<TemporalDecayServiceLegacy.DecayResult> applyStructuralDecay(Game game) {
        logger.info("🏰 Applying structural decay (legacy system)");
        return structuralDecayService.applyTemporalDecay(game);
    }
    
    /**
     * Apply personal decay to heroes (DK20 concept simplified)
     * Uses existing Hero methods to avoid compilation errors
     */
    private List<PersonalDecayResult> applyPersonalDecay(Game game) {
        logger.info("🧙 Applying personal decay (DK20 concept)");
        List<PersonalDecayResult> results = new ArrayList<>();
        
        for (Hero hero : game.getHeroes()) {
            int daysBehind = calculateDaysBehind(game, hero);
            
            if (daysBehind >= 3) {
                PersonalDecayResult result = new PersonalDecayResult(hero.getName(), daysBehind);
                
                // Apply effects based on days behind (using existing methods)
                if (daysBehind >= 3) {
                    // Reduce temporal vision (if hero has this capability)
                    if (hero.getTemporalVisionRange() > 1) {
                        hero.setTemporalVisionRange(hero.getTemporalVisionRange() - 1);
                        result.addEffect("Temporal vision reduced to " + hero.getTemporalVisionRange());
                    }
                }
                
                if (daysBehind >= 5) {
                    // NPCs avoid the hero (add status effect with duration)
                    hero.addStatusEffect("NPC_AVOIDANCE", daysBehind);
                    result.addEffect("NPCs avoid interaction (difficulty: " + daysBehind + ")");
                }
                
                if (daysBehind >= 7) {
                    // Artifacts become unstable
                    hero.addStatusEffect("ARTIFACT_INSTABILITY", daysBehind);
                    result.addEffect("Artifacts unstable (risk level: " + daysBehind + ")");
                }
                
                // Generate personal quote
                String personalQuote = generatePersonalDecayQuote(daysBehind, result.getAppliedEffects().size());
                result.setPersonalQuote(personalQuote);
                
                results.add(result);
            }
        }
        
        return results;
    }
    
    /**
     * Calculate days behind using legacy logic (proven to work)
     */
    private int calculateDaysBehind(Game game, Hero hero) {
        try {
            String currentTimelineStr = game.getCurrentTimeline();
            String heroTimelineStr = hero.getTimelineBranch();
            
            int currentTimeline = 0;
            int heroTimeline = 0;
            
            if (currentTimelineStr != null) {
                String currentNumber = currentTimelineStr.replaceAll("[^0-9-]", "");
                if (!currentNumber.isEmpty()) {
                    currentTimeline = Integer.parseInt(currentNumber);
                }
            }
            
            if (heroTimelineStr != null) {
                String heroNumber = heroTimelineStr.replaceAll("[^0-9-]", "");
                if (!heroNumber.isEmpty()) {
                    heroTimeline = Integer.parseInt(heroNumber);
                }
            }
            
            return Math.max(0, currentTimeline - heroTimeline);
        } catch (NumberFormatException e) {
            return 0;
        }
    }
    
    /**
     * Generate The Dude's wisdom about the decay situation
     */
    private String generateDudeQuote(int structuralCount, int personalCount) {
        if (structuralCount == 0 && personalCount == 0) {
            return "The Dude says: 'Everything's cool, man. No decay detected. Time flows like a good White Russian.'";
        } else if (structuralCount > 0 && personalCount > 0) {
            return "The Dude says: 'Whoa, both your buildings AND your heroes are feeling the temporal drag. That's like... double uncool, man.'";
        } else if (structuralCount > 0) {
            return "The Dude says: 'Your buildings are crumbling, dude. Anna was right about that structural decay thing.'";
        } else {
            return "The Dude says: 'Your heroes are losing their mojo, man. Time to catch up or find some anti-decay artifacts.'";
        }
    }
    
    /**
     * Generate personal decay quotes
     */
    private String generatePersonalDecayQuote(int daysBehind, int effectCount) {
        if (effectCount >= 3) {
            return "Anna whispers: 'Time has forgotten you exist. You fade like a shadow in the past.'";
        } else if (daysBehind >= 7) {
            return "Anna warns: 'If you lag behind time, time lags behind you. Catch up before it's too late.'";
        } else if (daysBehind >= 5) {
            return "Anna observes: 'The present moves forward. You remain anchored in yesterday.'";
        } else {
            return "Anna notes: 'Time slips through your fingers like sand. Act swiftly.'";
        }
    }
    
    /**
     * Get statistics for both decay systems
     */
    public Map<String, Object> getUnifiedDecayStatistics(Game game) {
        Map<String, Object> stats = new HashMap<>();
        
        // Get structural stats from legacy system
        Map<String, Object> structuralStats = structuralDecayService.getDecayStatistics(game);
        stats.put("structural", structuralStats);
        
        // Calculate personal decay stats
        List<PersonalDecayResult> personalResults = applyPersonalDecay(game);
        Map<String, Object> personalStats = new HashMap<>();
        personalStats.put("heroesAffected", personalResults.size());
        personalStats.put("totalEffects", personalResults.stream().mapToInt(r -> r.getAppliedEffects().size()).sum());
        stats.put("personal", personalStats);
        
        // Overall stats
        stats.put("totalHeroes", game.getHeroes().size());
        stats.put("unifiedSystem", "The Dude's Temporal Decay Hybrid Service");
        stats.put("philosophy", "Order (Jean) + Structure (Anna V1) + Individual (Anna DK20) = Perfect Harmony");
        
        return stats;
    }
    
    /**
     * Quick test method for immediate validation
     */
    public String testUnifiedSystem(Game game) {
        try {
            TemporalDecayReport report = applyUnifiedDecay(game);
            return String.format("🎳 Unified decay test successful! Structural: %d, Personal: %d effects applied. %s", 
                               report.getStructuralDecay().size(), 
                               report.getPersonalDecay().size(),
                               report.getDudeQuote());
        } catch (Exception e) {
            return "🎳 Test failed: " + e.getMessage();
        }
    }
} 