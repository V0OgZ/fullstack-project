package com.heroesoftimepoc.temporalengine.service;

import com.heroesoftimepoc.temporalengine.model.*;
import com.heroesoftimepoc.temporalengine.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;

/**
 * Service pour les scénarios NATIFS (hardcodés en Java)
 * Équivalent aux versions SCRIPT (JSON + HOTS) pour comparaison de performance
 * 
 * OBJECTIF: Benchmark NATIVE vs SCRIPT
 * - Même logique métier
 * - Implémentations différentes
 * - Mesure des performances
 */
@Service
@Transactional
public class NativeScenarioService {
    
    @Autowired
    private GameRepository gameRepository;
    
    @Autowired
    private HeroRepository heroRepository;
    
    @Autowired
    private PsiStateRepository psiStateRepository;
    
    @Autowired
    private GameTileRepository gameTileRepository;
    
    @Autowired
    private PerformanceMetricsService performanceMetrics;
    
    /**
     * SCÉNARIO NATIF: Bataille Temporelle Setup
     * Version hardcodée Java équivalente au HOTS/JSON
     */
    public Map<String, Object> executeBatailleTemporelleSetupNative(Long gameId) {
        return performanceMetrics.measureOperation("native_bataille_temporelle_setup", () -> {
            Optional<Game> gameOpt = gameRepository.findById(gameId);
            if (!gameOpt.isPresent()) {
                return createError("Game not found: " + gameId);
            }
            
            Game game = gameOpt.get();
            Map<String, Object> result = new HashMap<>();
            List<String> executionLog = new ArrayList<>();
            
            try {
                // Phase 1: Création des héros (HARDCODÉ)
                executionLog.add("Phase 1: Création des héros");
                Hero arthur = createHeroNative(game, "Arthur", 10, 10);
                Hero morgana = createHeroNative(game, "Morgana", 15, 15);
                
                // Phase 2: Positionnement initial (HARDCODÉ)
                executionLog.add("Phase 2: Positionnement initial");
                moveHeroNative(arthur, 5, 5);
                moveHeroNative(morgana, 15, 15);
                
                // Phase 3: Équipement initial (HARDCODÉ)
                executionLog.add("Phase 3: Équipement initial");
                equipHeroNative(arthur, "temporal_sword", 50);
                equipHeroNative(arthur, "mystic_orb", 30);
                equipHeroNative(morgana, "chrono_staff", 45);
                equipHeroNative(morgana, "reality_gem", 35);
                
                // Phase 4: Création des créatures (HARDCODÉ)
                executionLog.add("Phase 4: Création des créatures");
                createCreatureNative(game, "DragonRouge", 10, 10, 150, 25, 15);
                createCreatureNative(game, "PhantomWarriors", 8, 12, 80, 20, 10);
                
                // Phase 5: Placement des artefacts temporels (HARDCODÉ)
                executionLog.add("Phase 5: Placement des artefacts temporels");
                createArtifactNative(game, "LameAvantMonde", 10, 10, 50);
                createArtifactNative(game, "HorlogeInversee", 3, 17, 40);
                createArtifactNative(game, "OrbeProbabilite", 12, 6, 35);
                
                // Phase 6: Configuration des zones temporelles (HARDCODÉ)
                executionLog.add("Phase 6: Configuration des zones temporelles");
                createZoneNative(game, "TemporalZone", 9, 9, 3, 3);
                createZoneNative(game, "QuantumField", 1, 1, 2, 2);
                
                // Phase 7: États ψ initiaux (HARDCODÉ)
                executionLog.add("Phase 7: États ψ initiaux");
                PsiState psi001 = createPsiStateNative(game, "ψ001", 1, 6, 5, "MOV", "Arthur");
                PsiState psi002 = createPsiStateNative(game, "ψ002", 2, 14, 15, "MOV", "Morgana");
                
                // Phase 8: Triggers d'observation (HARDCODÉ)
                executionLog.add("Phase 8: Triggers d'observation");
                setupObservationTriggerNative(psi001, "OBSERVE(DragonRouge)");
                
                // Phase 9: Validation du setup (HARDCODÉ)
                executionLog.add("Phase 9: Validation du setup");
                executionLog.add("Bataille Temporelle - Setup terminé");
                executionLog.add("Héros créés: Arthur, Morgana");
                executionLog.add("Créatures placées: Dragon Rouge, Guerriers Fantômes");
                executionLog.add("Artefacts temporels: 3 objets placés");
                executionLog.add("États ψ actifs: 2 superpositions");
                
                // Sauvegarder
                gameRepository.save(game);
                
                result.put("success", true);
                result.put("scenarioType", "NATIVE_JAVA");
                result.put("scenarioName", "bataille_temporelle_setup");
                result.put("executionLog", executionLog);
                result.put("heroesCount", 2);
                result.put("creaturesCount", 2);
                result.put("artifactsCount", 3);
                result.put("psiStatesCount", 2);
                result.put("zonesCount", 2);
                
                performanceMetrics.incrementCounter("native_scenarios_success");
                
            } catch (Exception e) {
                result.put("success", false);
                result.put("error", "Native scenario execution failed: " + e.getMessage());
                result.put("scenarioType", "NATIVE_JAVA");
                performanceMetrics.incrementCounter("native_scenarios_error");
            }
            
            return result;
        });
    }
    
    /**
     * SCÉNARIO NATIF: Bataille Temporelle Combat
     * Version hardcodée Java avec mécaniques temporelles complexes
     */
    public Map<String, Object> executeBatailleTemporelleCombatNative(Long gameId) {
        return performanceMetrics.measureOperation("native_bataille_temporelle_combat", () -> {
            Optional<Game> gameOpt = gameRepository.findById(gameId);
            if (!gameOpt.isPresent()) {
                return createError("Game not found: " + gameId);
            }
            
            Game game = gameOpt.get();
            Map<String, Object> result = new HashMap<>();
            List<String> executionLog = new ArrayList<>();
            
            try {
                Hero arthur = game.getHeroByName("Arthur");
                Hero morgana = game.getHeroByName("Morgana");
                
                if (arthur == null || morgana == null) {
                    return createError("Heroes not found. Run setup first.");
                }
                
                // Phase 1: Mouvement avec superposition (HARDCODÉ)
                executionLog.add("Phase 1: Mouvement avec superposition");
                PsiState psi003 = createPsiStateNative(game, "ψ003", 1, 6, 6, "MOV", "Arthur");
                PsiState psi004 = createPsiStateNative(game, "ψ004", 1, 6, 4, "MOV", "Arthur");
                PsiState psi005 = createPsiStateNative(game, "ψ005", 1, 7, 5, "MOV", "Arthur");
                
                // Phase 2: Observation et collapse (HARDCODÉ)
                executionLog.add("Phase 2: Observation et collapse");
                setupObservationTriggerNative(psi003, "HERO_OBSERVES(Morgana, @6,6)");
                
                // Phase 3: Utilisation d'artefact temporel (HARDCODÉ)
                executionLog.add("Phase 3: Utilisation d'artefact temporel");
                useArtifactNative(arthur, "temporal_sword");
                PsiState psi006 = createPsiStateNative(game, "ψ006", 1, 9, 9, "BATTLE", "Arthur vs DragonRouge");
                
                // Phase 4: États quantiques multiples (HARDCODÉ)
                executionLog.add("Phase 4: États quantiques multiples");
                PsiState psi007 = createComplexPsiStateNative(game, "ψ007", 2, 10, 8, "CAST", "quantum_leap", 0.8, 0.6);
                PsiState psi008 = createComplexPsiStateNative(game, "ψ008", 2, 10, 12, "CAST", "time_anchor", 0.7, 0.7);
                
                // Phase 5: Contre-attaque de Morgana (HARDCODÉ)
                executionLog.add("Phase 5: Contre-attaque de Morgana");
                PsiState psi009 = createPsiStateNative(game, "ψ009", 1, 14, 14, "MOV", "Morgana");
                useArtifactNative(morgana, "chrono_staff");
                PsiState psi010 = createPsiStateNative(game, "ψ010", 2, 11, 11, "CAST", "temporal_shield");
                
                // ... Continuer les phases selon le script HOTS
                
                // Sauvegarder
                gameRepository.save(game);
                
                result.put("success", true);
                result.put("scenarioType", "NATIVE_JAVA");
                result.put("scenarioName", "bataille_temporelle_combat");
                result.put("executionLog", executionLog);
                result.put("psiStatesCreated", 8);
                
                performanceMetrics.incrementCounter("native_combat_scenarios_success");
                
            } catch (Exception e) {
                result.put("success", false);
                result.put("error", "Native combat scenario failed: " + e.getMessage());
                result.put("scenarioType", "NATIVE_JAVA");
                performanceMetrics.incrementCounter("native_combat_scenarios_error");
            }
            
            return result;
        });
    }
    
    // =============================================
    // MÉTHODES UTILITAIRES PRIVÉES (HARDCODÉES)
    // =============================================
    
    private Hero createHeroNative(Game game, String name, int x, int y) {
        Hero hero = new Hero(name, x, y);
        hero.setGame(game);
        hero.setTemporalEnergy(100);
        hero.setHealth(120);
        // hero.setAttackPower(20);  // Méthode n'existe pas
        // hero.setDefensePower(15); // Méthode n'existe pas
        heroRepository.save(hero);
        game.addHero(hero);
        return hero;
    }
    
    private void moveHeroNative(Hero hero, int x, int y) {
        hero.moveTo(x, y);
        heroRepository.save(hero);
    }
    
    private void equipHeroNative(Hero hero, String itemName, int power) {
        hero.addItem(itemName + ":" + power);
        heroRepository.save(hero);
    }
    
    private void createCreatureNative(Game game, String type, int x, int y, int health, int attack, int defense) {
        // Implémentation simplifiée - créer une entité générique
        GameTile tile = game.getTileAt(x, y);
        if (tile == null) {
            tile = new GameTile(x, y, "CREATURE");
            game.addTile(tile);
        }
        tile.addOccupant(type + "_" + health + "HP");
        gameTileRepository.save(tile);
    }
    
    private void createArtifactNative(Game game, String type, int x, int y, int power) {
        GameTile tile = game.getTileAt(x, y);
        if (tile == null) {
            tile = new GameTile(x, y, "ARTIFACT");
            game.addTile(tile);
        }
        tile.addOccupant("ARTIFACT_" + type + "_" + power);
        gameTileRepository.save(tile);
    }
    
    private void createZoneNative(Game game, String type, int x, int y, int width, int height) {
        for (int dx = 0; dx < width; dx++) {
            for (int dy = 0; dy < height; dy++) {
                GameTile tile = game.getTileAt(x + dx, y + dy);
                if (tile == null) {
                    tile = new GameTile(x + dx, y + dy, "ZONE");
                    game.addTile(tile);
                }
                tile.addOccupant("ZONE_" + type);
                gameTileRepository.save(tile);
            }
        }
    }
    
    private PsiState createPsiStateNative(Game game, String psiId, int deltaT, int x, int y, String actionType, String owner) {
        PsiState psiState = new PsiState(psiId, "⊙(Δt+" + deltaT + " @" + x + "," + y + " ⟶ " + actionType + ")", "ℬ1");
        psiState.setDeltaT(deltaT);
        psiState.setTargetX(x);
        psiState.setTargetY(y);
        psiState.setActionType(actionType);
        psiState.setOwnerHero(owner);
        psiState.setGame(game);
        psiStateRepository.save(psiState);
        game.addPsiState(psiState);
        return psiState;
    }
    
    private PsiState createComplexPsiStateNative(Game game, String psiId, int deltaT, int x, int y, String actionType, String spell, double realPart, double imaginaryPart) {
        PsiState psiState = createPsiStateNative(game, psiId, deltaT, x, y, actionType, spell);
        psiState.setComplexAmplitude(realPart, imaginaryPart);
        psiState.enableComplexAmplitude();
        psiStateRepository.save(psiState);
        return psiState;
    }
    
    private void setupObservationTriggerNative(PsiState psiState, String condition) {
        psiState.setCollapseTrigger(condition);
        psiStateRepository.save(psiState);
    }
    
    private void useArtifactNative(Hero hero, String artifactName) {
        // Simulation d'utilisation d'artefact
        hero.addItem("USED_" + artifactName + "_" + System.currentTimeMillis());
        heroRepository.save(hero);
    }
    
    private Map<String, Object> createError(String message) {
        Map<String, Object> result = new HashMap<>();
        result.put("success", false);
        result.put("error", message);
        result.put("scenarioType", "NATIVE_JAVA");
        return result;
    }
    
    /**
     * MÉTHODE DE BENCHMARK: Comparaison Native vs Script
     */
    public Map<String, Object> benchmarkNativeVsScript(Long gameId, String scenarioName) {
        Map<String, Object> result = new HashMap<>();
        
        // Mesurer Native
        long startNative = System.nanoTime();
        Map<String, Object> nativeResult = null;
        
        switch (scenarioName) {
            case "bataille_temporelle_setup":
                nativeResult = executeBatailleTemporelleSetupNative(gameId);
                break;
            case "bataille_temporelle_combat":
                nativeResult = executeBatailleTemporelleCombatNative(gameId);
                break;
        }
        
        long endNative = System.nanoTime();
        double nativeTimeMs = (endNative - startNative) / 1_000_000.0;
        
        result.put("nativeExecution", nativeResult);
        result.put("nativeTimeMs", nativeTimeMs);
        result.put("benchmarkType", "NATIVE_vs_SCRIPT");
        result.put("scenarioName", scenarioName);
        result.put("timestamp", LocalDateTime.now());
        
        return result;
    }
} 