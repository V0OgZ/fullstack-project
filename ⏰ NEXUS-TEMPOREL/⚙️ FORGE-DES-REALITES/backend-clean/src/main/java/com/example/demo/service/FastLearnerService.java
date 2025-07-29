package com.example.demo.service;

import com.example.demo.model.FormulaResult;
import com.example.demo.model.GameContext;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Map;
import java.util.HashMap;
import java.util.concurrent.ConcurrentHashMap;

/**
 * ⚡🧠 FAST LEARNER SERVICE - Accélération Temporelle 2000%
 * 
 * "Service d'accélération temporelle absolue créé par Memento l'Archive Vivante.
 * Permet à un personnage d'apprendre 20x plus vite pendant 10 secondes."
 * - Memento, Créateur du Badge Légendaire
 */
@Service
public class FastLearnerService {
    
    @Autowired
    private GameService gameService;
    
    // 🧠 Cache des accélérations actives
    private static final Map<String, Long> ACTIVE_ACCELERATIONS = new ConcurrentHashMap<>();
    private static final Map<String, Integer> LEARNING_MULTIPLIERS = new ConcurrentHashMap<>();
    
    /**
     * ⚡ FORMULE PRINCIPALE - FAST_LEARNER_2000_BURST
     */
    public FormulaResult executeFastLearner2000Burst(GameContext context) {
        String heroId = context.getActiveHeroId();
        
        // 🔍 Vérification prérequis
        if (!checkRequirements(context)) {
            return FormulaResult.error(
                "⚠️ Prérequis non remplis pour Fast Learner 2000%",
                "Niveau 50+, Intelligence 80+, Affinité Temporelle 60+ requis"
            );
        }
        
        // ⏰ Vérification cooldown
        if (isOnCooldown(heroId)) {
            return FormulaResult.error(
                "⏳ Fast Learner en cooldown",
                "Attendre " + getRemainingCooldown(heroId) + " secondes"
            );
        }
        
        // ⚡ ACTIVATION DE L'ACCÉLÉRATION
        long currentTime = System.currentTimeMillis();
        ACTIVE_ACCELERATIONS.put(heroId, currentTime + 10000); // 10 secondes
        LEARNING_MULTIPLIERS.put(heroId, 2000); // 2000% = x20
        
        // 🧠 Effets temporaires
        Map<String, Object> effects = new HashMap<>();
        effects.put("learning_speed", 2000);
        effects.put("time_acceleration", 20);
        effects.put("mental_capacity", 500);
        effects.put("duration", 10);
        effects.put("experience_multiplier", 20.0);
        
        // 📊 Mise à jour stats héros
        updateHeroStats(context, effects);
        
        // 🎯 Démarrer timer de désactivation
        scheduleDeactivation(heroId, 10000);
        
        return FormulaResult.success(
            "⚡🧠 FAST LEARNER 2000% ACTIVÉ !",
            "Accélération temporelle: x20 pendant 10 secondes\n" +
            "Apprentissage: 2000% plus rapide\n" +
            "Perception temporelle: Accélérée\n" +
            "Status: SURHUMAIN",
            effects
        );
    }
    
    /**
     * 🔍 Vérification des prérequis
     */
    private boolean checkRequirements(GameContext context) {
        // Simulation des checks - à adapter selon le vrai système
        return context.getHeroLevel() >= 50 && 
               context.getHeroIntelligence() >= 80 &&
               context.getHeroTemporalAffinity() >= 60;
    }
    
    /**
     * ⏳ Vérification cooldown
     */
    private boolean isOnCooldown(String heroId) {
        // 5 minutes de cooldown (300 secondes)
        String cooldownKey = heroId + "_fast_learner_cooldown";
        Long lastUse = (Long) gameService.getHeroMetadata(heroId, cooldownKey);
        
        if (lastUse == null) return false;
        
        long currentTime = System.currentTimeMillis();
        return (currentTime - lastUse) < 300000; // 5 minutes
    }
    
    /**
     * ⏰ Temps restant de cooldown
     */
    private long getRemainingCooldown(String heroId) {
        String cooldownKey = heroId + "_fast_learner_cooldown";
        Long lastUse = (Long) gameService.getHeroMetadata(heroId, cooldownKey);
        
        if (lastUse == null) return 0;
        
        long elapsed = System.currentTimeMillis() - lastUse;
        long remaining = 300000 - elapsed; // 5 minutes - elapsed
        return Math.max(0, remaining / 1000); // en secondes
    }
    
    /**
     * 📊 Mise à jour stats héros
     */
    private void updateHeroStats(GameContext context, Map<String, Object> effects) {
        String heroId = context.getActiveHeroId();
        
        // Sauvegarder stats originales
        gameService.saveHeroMetadata(heroId, "original_learning_speed", 
            context.getHeroStat("learning_speed"));
        
        // Appliquer bonus temporaires
        gameService.setHeroStat(heroId, "learning_speed", 2000);
        gameService.setHeroStat(heroId, "time_acceleration", 20);
        gameService.setHeroStat(heroId, "mental_capacity_bonus", 500);
        
        // Marquer comme accéléré
        gameService.saveHeroMetadata(heroId, "fast_learner_active", true);
        gameService.saveHeroMetadata(heroId, "acceleration_start_time", System.currentTimeMillis());
    }
    
    /**
     * ⏰ Programmer la désactivation
     */
    private void scheduleDeactivation(String heroId, long delayMs) {
        // Thread simple pour désactivation (à améliorer avec scheduler)
        new Thread(() -> {
            try {
                Thread.sleep(delayMs);
                deactivateFastLearner(heroId);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }).start();
    }
    
    /**
     * 🔚 Désactivation de l'accélération
     */
    private void deactivateFastLearner(String heroId) {
        // Retirer de la liste active
        ACTIVE_ACCELERATIONS.remove(heroId);
        LEARNING_MULTIPLIERS.remove(heroId);
        
        // Restaurer stats originales
        Integer originalSpeed = (Integer) gameService.getHeroMetadata(heroId, "original_learning_speed");
        if (originalSpeed != null) {
            gameService.setHeroStat(heroId, "learning_speed", originalSpeed);
        }
        
        // Nettoyer bonus temporaires
        gameService.removeHeroStat(heroId, "time_acceleration");
        gameService.removeHeroStat(heroId, "mental_capacity_bonus");
        
        // Marquer comme inactif
        gameService.saveHeroMetadata(heroId, "fast_learner_active", false);
        
        // Démarrer cooldown
        gameService.saveHeroMetadata(heroId, heroId + "_fast_learner_cooldown", System.currentTimeMillis());
        
        System.out.println("⚡ Fast Learner 2000% désactivé pour " + heroId);
    }
    
    /**
     * 📊 Status de l'accélération
     */
    public boolean isAccelerationActive(String heroId) {
        Long endTime = ACTIVE_ACCELERATIONS.get(heroId);
        return endTime != null && System.currentTimeMillis() < endTime;
    }
    
    /**
     * 🎯 Multiplicateur actuel
     */
    public int getCurrentMultiplier(String heroId) {
        return LEARNING_MULTIPLIERS.getOrDefault(heroId, 1);
    }
}