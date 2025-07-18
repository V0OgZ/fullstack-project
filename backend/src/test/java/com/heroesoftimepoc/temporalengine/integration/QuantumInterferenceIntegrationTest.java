package com.heroesoftimepoc.temporalengine.integration;

import com.heroesoftimepoc.temporalengine.model.*;
import com.heroesoftimepoc.temporalengine.service.QuantumInterferenceService;
import com.heroesoftimepoc.temporalengine.service.QuantumMigrationService;
import com.heroesoftimepoc.temporalengine.service.TemporalEngineService;
import com.heroesoftimepoc.temporalengine.repository.GameRepository;
import com.heroesoftimepoc.temporalengine.repository.PsiStateRepository;
import com.heroesoftimepoc.temporalengine.repository.HeroRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Test d'intégration pour les interférences quantiques
 * Scénario: "La Bataille des Résonances Quantiques"
 */
@SpringBootTest
@ActiveProfiles("test")
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
@Transactional
public class QuantumInterferenceIntegrationTest {

    @Autowired
    private TemporalEngineService temporalEngineService;
    
    @Autowired
    private QuantumInterferenceService quantumInterferenceService;
    
    @Autowired
    private QuantumMigrationService quantumMigrationService;
    
    @Autowired
    private GameRepository gameRepository;
    
    @Autowired
    private PsiStateRepository psiStateRepository;
    
    @Autowired
    private HeroRepository heroRepository;
    
    private Game testGame;
    private Hero arthur;
    private Hero morgana;
    
    @BeforeEach
    void setUp() {
        // Créer un jeu de test
        testGame = new Game("Bataille des Résonances Quantiques");
        testGame.addPlayer("Arthur");
        testGame.addPlayer("Morgana");
        testGame.setStatus(Game.GameStatus.ACTIVE);
        testGame.setCurrentPlayer("Arthur");
        gameRepository.save(testGame);
        
        // Créer les héros
        arthur = new Hero("Arthur", 10, 10);
        arthur.setGame(testGame);
        arthur.setPlayerId("Arthur");
        arthur.setTemporalEnergy(200);
        heroRepository.save(arthur);
        
        morgana = new Hero("Morgana", 20, 20);
        morgana.setGame(testGame);
        morgana.setPlayerId("Morgana");
        morgana.setTemporalEnergy(200);
        heroRepository.save(morgana);
        
        testGame.addHero(arthur);
        testGame.addHero(morgana);
        gameRepository.save(testGame);
    }
    
    @Test
    void testQuantumInterferenceScenario_ConstructiveAmplification() {
        // Scénario: Arthur crée deux PsiStates constructifs au même endroit
        
        // Phase 1: Créer des PsiStates avec amplitudes complexes
        Map<String, Object> result1 = temporalEngineService.executeScript(testGame.getId(), 
            "ψ001: (0.707+0.0i) ⊙(Δt+2 @15,15 ⟶ MOV(Arthur, @15,15))");
        
        Map<String, Object> result2 = temporalEngineService.executeScript(testGame.getId(), 
            "ψ002: (0.707+0.0i) ⊙(Δt+2 @15,15 ⟶ MOV(Arthur, @15,15))");
        
        // Vérifier que les PsiStates sont créés avec succès
        assertTrue((Boolean) result1.get("success"));
        assertTrue((Boolean) result2.get("success"));
        
        // Phase 2: Analyser l'interférence
        QuantumInterferenceService.InterferenceResult interference = 
            quantumInterferenceService.calculateInterferenceAtPosition(testGame, 15, 15);
        
        // Vérifier l'interférence constructive
        assertEquals(QuantumInterferenceService.InterferenceType.CONSTRUCTIVE, interference.getType());
        assertEquals(2.0, interference.getCombinedProbability(), 0.01);
        assertEquals(2, interference.getInvolvedStates().size());
        
        // Phase 3: Calculer les effets sur le jeu
        Map<String, Object> interferenceEffects = 
            quantumInterferenceService.calculateInterferenceEffects(testGame, interference);
        
        double successModifier = (Double) interferenceEffects.get("successModifier");
        assertTrue(successModifier > 1.0, "L'interférence constructive devrait augmenter les chances de succès");
        
        assertEquals("AMPLIFICATION", interferenceEffects.get("specialEffect"));
        
        // Phase 4: Collapse et vérification des effets
        Map<String, Object> collapseResult = temporalEngineService.executeScript(testGame.getId(), "†ψ001");
        assertTrue((Boolean) collapseResult.get("success"));
        
        // Vérifier les modificateurs d'interférence
        if (collapseResult.containsKey("successModifier")) {
            assertTrue((Double) collapseResult.get("successModifier") > 1.0);
        }
    }
    
    @Test
    void testQuantumInterferenceScenario_DestructiveCancellation() {
        // Scénario: Morgana crée des PsiStates destructifs pour annuler l'action d'Arthur
        
        // Phase 1: Arthur crée un PsiState d'attaque
        Map<String, Object> arthurAttack = temporalEngineService.executeScript(testGame.getId(), 
            "ψ010: (1.0+0.0i) ⊙(Δt+3 @25,25 ⟶ BATTLE(Arthur, DragonRouge))");
        
        assertTrue((Boolean) arthurAttack.get("success"));
        
        // Phase 2: Morgana crée un PsiState de contre-attaque en opposition de phase
        Map<String, Object> morganaCounter = temporalEngineService.executeScript(testGame.getId(), 
            "ψ011: (-1.0+0.0i) ⊙(Δt+3 @25,25 ⟶ BATTLE(Morgana, DragonRouge))");
        
        assertTrue((Boolean) morganaCounter.get("success"));
        
        // Phase 3: Analyser l'interférence destructive
        QuantumInterferenceService.InterferenceResult interference = 
            quantumInterferenceService.calculateInterferenceAtPosition(testGame, 25, 25);
        
        assertEquals(QuantumInterferenceService.InterferenceType.DESTRUCTIVE, interference.getType());
        assertEquals(0.0, interference.getCombinedProbability(), 0.01);
        
        // Phase 4: Vérifier les effets d'annulation
        Map<String, Object> interferenceEffects = 
            quantumInterferenceService.calculateInterferenceEffects(testGame, interference);
        
        assertEquals("CANCELLATION", interferenceEffects.get("specialEffect"));
        
        double successModifier = (Double) interferenceEffects.get("successModifier");
        assertTrue(successModifier < 0.5, "L'interférence destructive devrait réduire drastiquement les chances de succès");
    }
    
    @Test
    void testQuantumInterferenceScenario_ComplexPhaseInterference() {
        // Scénario: Interférence complexe avec phases différentes
        
        // Phase 1: Créer des PsiStates avec des phases différentes
        Map<String, Object> result1 = temporalEngineService.executeScript(testGame.getId(), 
            "ψ020: (0.5+0.866i) ⊙(Δt+1 @30,30 ⟶ MOV(Arthur, @30,30))");  // 60° phase
        
        Map<String, Object> result2 = temporalEngineService.executeScript(testGame.getId(), 
            "ψ021: (0.866+0.5i) ⊙(Δt+1 @30,30 ⟶ MOV(Arthur, @30,30))");  // 30° phase
        
        Map<String, Object> result3 = temporalEngineService.executeScript(testGame.getId(), 
            "ψ022: (0.0+1.0i) ⊙(Δt+1 @30,30 ⟶ MOV(Arthur, @30,30))");    // 90° phase
        
        assertTrue((Boolean) result1.get("success"));
        assertTrue((Boolean) result2.get("success"));
        assertTrue((Boolean) result3.get("success"));
        
        // Phase 2: Analyser l'interférence complexe
        QuantumInterferenceService.InterferenceResult interference = 
            quantumInterferenceService.calculateInterferenceAtPosition(testGame, 30, 30);
        
        // Vérifier que c'est une interférence complexe
        assertTrue(interference.getType() == QuantumInterferenceService.InterferenceType.COMPLEX || 
                  interference.getType() == QuantumInterferenceService.InterferenceType.CONSTRUCTIVE);
        
        // La probabilité combinée devrait être différente de la somme des probabilités individuelles
        double expectedIndividualSum = 1.0 + 1.0 + 1.0; // 3 PsiStates avec |ψ|² = 1.0 chacun
        double actualCombinedProbability = interference.getCombinedProbability();
        
        assertNotEquals(expectedIndividualSum, actualCombinedProbability, 0.01);
        
        // Phase 3: Vérifier les effets complexes
        Map<String, Object> interferenceEffects = 
            quantumInterferenceService.calculateInterferenceEffects(testGame, interference);
        
        // Les effets devraient être variables ou complexes
        assertNotNull(interferenceEffects.get("specialEffect"));
    }
    
    @Test
    void testQuantumInterferenceScenario_TemporalEvolution() {
        // Scénario: Évolution temporelle des interférences
        
        // Phase 1: Créer des PsiStates avec amplitudes complexes
        PsiState psi1 = new PsiState("ψ030", "Test evolution", "ℬ1");
        psi1.setComplexAmplitude(new ComplexAmplitude(1.0, 0.0));
        psi1.setUseComplexAmplitude(true);
        psi1.setTargetX(35);
        psi1.setTargetY(35);
        psi1.setGame(testGame);
        psiStateRepository.save(psi1);
        
        PsiState psi2 = new PsiState("ψ031", "Test evolution", "ℬ1");
        psi2.setComplexAmplitude(new ComplexAmplitude(0.0, 1.0));
        psi2.setUseComplexAmplitude(true);
        psi2.setTargetX(35);
        psi2.setTargetY(35);
        psi2.setGame(testGame);
        psiStateRepository.save(psi2);
        
        List<PsiState> psiStates = Arrays.asList(psi1, psi2);
        
        // Phase 2: Simuler l'évolution temporelle
        List<QuantumInterferenceService.InterferenceResult> evolution = 
            quantumInterferenceService.simulateTemporalEvolution(psiStates, 5);
        
        // Vérifier que l'évolution change au fil du temps
        assertNotNull(evolution);
        assertEquals(5, evolution.size());
        
        // Les probabilités devraient changer à cause de l'évolution des phases
        double firstProbability = evolution.get(0).getCombinedProbability();
        double lastProbability = evolution.get(4).getCombinedProbability();
        
        // Avec l'évolution des phases, la probabilité combinée devrait changer
        // Fix: Augmenter la tolérance pour éviter les erreurs de précision flottante
        assertNotEquals(firstProbability, lastProbability, 0.1);
    }
    
    @Test
    void testQuantumMigrationScenario_ClassicToQuantum() {
        // Scénario: Migration des PsiStates classiques vers quantiques
        
        // Phase 1: Créer des PsiStates classiques
        Map<String, Object> classicResult = temporalEngineService.executeScript(testGame.getId(), 
            "ψ040: ⊙(Δt+2 @40,40 ⟶ MOV(Arthur, @40,40))");
        
        assertTrue((Boolean) classicResult.get("success"));
        
        // Phase 2: Analyser la compatibilité
        Map<String, Object> compatibility = quantumMigrationService.analyzeGameCompatibility(testGame.getId());
        
        assertNotNull(compatibility);
        assertTrue((Integer) compatibility.get("classicStates") > 0);
        assertTrue((Boolean) compatibility.get("canMigrateToComplex"));
        
        // Phase 3: Effectuer la migration
        QuantumMigrationService.MigrationResult migration = 
            quantumMigrationService.migrateGameToComplexAmplitudes(testGame.getId());
        
        assertTrue(migration.isSuccess());
        assertTrue(migration.getMigratedStates() > 0);
        
        // Phase 4: Vérifier que les PsiStates sont maintenant quantiques
        Map<String, Object> newCompatibility = quantumMigrationService.analyzeGameCompatibility(testGame.getId());
        
        assertTrue((Integer) newCompatibility.get("complexStates") > 0);
        assertTrue((Integer) newCompatibility.get("classicStates") == 0);
    }
    
    @Test
    void testQuantumInterferenceScenario_OptimizedPhases() {
        // Scénario: Optimisation des phases pour maximiser l'interférence
        
        // Phase 1: Créer des PsiStates avec phases aléatoires
        PsiState psi1 = new PsiState("ψ050", "Test optimization", "ℬ1");
        psi1.setComplexAmplitude(ComplexAmplitude.fromPolar(1.0, 0.5));
        psi1.setUseComplexAmplitude(true);
        psi1.setTargetX(50);
        psi1.setTargetY(50);
        psi1.setGame(testGame);
        psiStateRepository.save(psi1);
        
        PsiState psi2 = new PsiState("ψ051", "Test optimization", "ℬ1");
        psi2.setComplexAmplitude(ComplexAmplitude.fromPolar(1.0, 2.1));
        psi2.setUseComplexAmplitude(true);
        psi2.setTargetX(50);
        psi2.setTargetY(50);
        psi2.setGame(testGame);
        psiStateRepository.save(psi2);
        
        List<PsiState> psiStates = Arrays.asList(psi1, psi2);
        
        // Phase 2: Calculer l'interférence avant optimisation
        QuantumInterferenceService.InterferenceResult beforeOptimization = 
            quantumInterferenceService.calculateInterference(psiStates);
        
        // Phase 3: Optimiser pour l'interférence constructive
        quantumInterferenceService.optimizeForConstructiveInterference(psiStates);
        
        // Phase 4: Calculer l'interférence après optimisation
        QuantumInterferenceService.InterferenceResult afterOptimization = 
            quantumInterferenceService.calculateInterference(psiStates);
        
        // Vérifier que l'optimisation a amélioré l'interférence
        assertTrue(afterOptimization.getCombinedProbability() >= beforeOptimization.getCombinedProbability());
        assertEquals(QuantumInterferenceService.InterferenceType.CONSTRUCTIVE, afterOptimization.getType());
    }
    
    @Test
    void testQuantumInterferenceScenario_GameStateAnalysis() {
        // Scénario: Analyse de l'état du jeu avec informations quantiques
        
        // Phase 1: Créer un mélange de PsiStates classiques et quantiques
        temporalEngineService.executeScript(testGame.getId(), 
            "ψ060: (0.8+0.6i) ⊙(Δt+1 @60,60 ⟶ MOV(Arthur, @60,60))");
        
        temporalEngineService.executeScript(testGame.getId(), 
            "ψ061: (0.6+0.8i) ⊙(Δt+1 @60,60 ⟶ MOV(Morgana, @60,60))");
        
        temporalEngineService.executeScript(testGame.getId(), 
            "ψ062: ⊙(Δt+1 @70,70 ⟶ MOV(Arthur, @70,70))");
        
        // Phase 2: Analyser l'état du jeu
        Map<String, Object> gameState = temporalEngineService.getGameState(testGame.getId());
        
        assertNotNull(gameState);
        assertTrue(gameState.containsKey("quantumAnalysis"));
        
        @SuppressWarnings("unchecked")
        Map<String, Object> quantumAnalysis = (Map<String, Object>) gameState.get("quantumAnalysis");
        
        // Vérifier les informations quantiques
        assertTrue((Integer) quantumAnalysis.get("totalComplexStates") > 0);
        assertTrue((Integer) quantumAnalysis.get("totalClassicStates") >= 0);
        assertTrue((Integer) quantumAnalysis.get("totalInterferenceZones") > 0);
        
        // Vérifier les zones d'interférence
        @SuppressWarnings("unchecked")
        List<Map<String, Object>> interferenceZones = 
            (List<Map<String, Object>>) quantumAnalysis.get("interferenceZones");
        
        assertNotNull(interferenceZones);
        assertTrue(interferenceZones.size() > 0);
        
        // Vérifier les détails d'une zone d'interférence
        Map<String, Object> zone = interferenceZones.get(0);
        assertNotNull(zone.get("position"));
        assertNotNull(zone.get("type"));
        assertNotNull(zone.get("combinedProbability"));
        assertTrue((Integer) zone.get("stateCount") > 1);
    }
    
    @Test
    void testQuantumInterferenceScenario_FullGameplayIntegration() {
        // Scénario: Intégration complète dans le gameplay avec HMM3
        
        // Phase 1: Setup du château et ressources
        temporalEngineService.executeScript(testGame.getId(), 
            "BUILD(CASTLE, @80,80, PLAYER:Arthur)");
        
        temporalEngineService.executeScript(testGame.getId(), 
            "COLLECT(GOLD, 1000, PLAYER:Arthur)");
        
        // Phase 2: Créer des PsiStates pour le recrutement quantique
        temporalEngineService.executeScript(testGame.getId(), 
            "ψ070: (0.8+0.6i) ⊙(Δt+1 @80,80 ⟶ RECRUIT(UNIT, Knight, 10, HERO:Arthur))");
        
        temporalEngineService.executeScript(testGame.getId(), 
            "ψ071: (0.6+0.8i) ⊙(Δt+1 @80,80 ⟶ RECRUIT(UNIT, Archer, 20, HERO:Arthur))");
        
        // Phase 3: Analyser les effets d'interférence sur le recrutement
        QuantumInterferenceService.InterferenceResult interference = 
            quantumInterferenceService.calculateInterferenceAtPosition(testGame, 80, 80);
        
        Map<String, Object> interferenceEffects = 
            quantumInterferenceService.calculateInterferenceEffects(testGame, interference);
        
        // Phase 4: Appliquer les effets et vérifier
        assertNotNull(interferenceEffects);
        assertTrue(interferenceEffects.containsKey("successModifier"));
        assertTrue(interferenceEffects.containsKey("energyModifier"));
        
        // Phase 5: Collapse avec effets d'interférence
        Map<String, Object> collapseResult = temporalEngineService.executeScript(testGame.getId(), "†ψ070");
        
        assertTrue((Boolean) collapseResult.get("success"));
        
        // Vérifier que les effets d'interférence sont appliqués
        if (collapseResult.containsKey("interferenceEffects")) {
            assertNotNull(collapseResult.get("interferenceEffects"));
        }
        
        // Phase 6: Vérifier l'état final du jeu
        Map<String, Object> finalGameState = temporalEngineService.getGameState(testGame.getId());
        assertNotNull(finalGameState);
        
        // Le héros devrait avoir évolué avec les effets quantiques
        @SuppressWarnings("unchecked")
        List<Map<String, Object>> heroes = (List<Map<String, Object>>) finalGameState.get("heroes");
        assertNotNull(heroes);
        assertTrue(heroes.size() > 0);
        
        // Vérifier qu'Arthur a bien été affecté
        Map<String, Object> arthurState = heroes.stream()
            .filter(hero -> "Arthur".equals(hero.get("name")))
            .findFirst()
            .orElse(null);
        
        assertNotNull(arthurState);
        assertNotNull(arthurState.get("temporalEnergy"));
    }
} 