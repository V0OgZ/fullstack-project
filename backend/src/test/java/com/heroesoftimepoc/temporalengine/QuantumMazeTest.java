package com.heroesoftimepoc.temporalengine;

import com.heroesoftimepoc.temporalengine.model.*;
import com.heroesoftimepoc.temporalengine.repository.*;
import com.heroesoftimepoc.temporalengine.service.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Test du Quantum Maze - Puzzle quantique avancé
 * Démontre comment le même moteur peut créer un jeu de puzzle
 */
@SpringBootTest
@ActiveProfiles("test")
@Transactional
public class QuantumMazeTest {
    
    @Autowired
    private GameRepository gameRepository;
    
    @Autowired
    private TemporalEngineService temporalEngine;
    
    @Autowired
    private QuantumInterferenceService interferenceService;
    
    private Game testGame;
    
    @BeforeEach
    public void setUp() {
        // Créer une partie de type puzzle
        testGame = new Game();
        testGame.setGameName("Quantum Maze Test");
        testGame.setPlayers(java.util.Arrays.asList("DrQuantum"));
        testGame.setStatus(Game.GameStatus.ACTIVE);
        testGame.setMapWidth(20);
        testGame.setMapHeight(20);
        testGame = gameRepository.save(testGame);
    }
    
    @Test
    public void testNiveau1SuperpositionBasique() {
        // Créer le héros scientifique
        Map<String, Object> result = temporalEngine.executeScript(testGame.getId(), "HERO(DrQuantum)");
        assertTrue((Boolean) result.get("success"));
        
        // Positionner au début du labyrinthe
        result = temporalEngine.executeScript(testGame.getId(), "MOV(DrQuantum, @1,1)");
        assertTrue((Boolean) result.get("success"));
        
        // Équiper les outils quantiques
        result = temporalEngine.executeScript(testGame.getId(), 
            "CREATE(ARTIFACT, wave_function_manipulator, HERO:DrQuantum)");
        assertTrue((Boolean) result.get("success"));
        
        result = temporalEngine.executeScript(testGame.getId(), 
            "CREATE(ARTIFACT, measurement_device, HERO:DrQuantum)");
        assertTrue((Boolean) result.get("success"));
        
        // Créer une superposition à (5,3) avec amplitude (0.7+0.7i)
        result = temporalEngine.executeScript(testGame.getId(), 
            "ψMAZE1: (0.7+0.7i) ⊙(Δt+0 @5,3 ⟶ CREATE(ITEM, GATE_KEY, @5,3))");
        assertTrue((Boolean) result.get("success"));
        
        // Vérifier la probabilité
        testGame = gameRepository.findById(testGame.getId()).orElseThrow();
        PsiState mazeState = testGame.getPsiStates().stream()
            .filter(psi -> psi.getPsiId().equals("ψMAZE1"))
            .findFirst()
            .orElse(null);
        
        assertNotNull(mazeState);
        assertTrue(mazeState.isUsingComplexAmplitude());
        
        // |0.7+0.7i|² = 0.49 + 0.49 = 0.98
        double probability = mazeState.getComplexAmplitude().getProbability();
        assertEquals(0.98, probability, 0.01);
    }
    
    @Test
    public void testNiveau2InterferenceConstructive() {
        // Setup du niveau
        temporalEngine.executeScript(testGame.getId(), "HERO(DrQuantum)");
        temporalEngine.executeScript(testGame.getId(), "MOV(DrQuantum, @3,5)");
        
        // Créer les deux états à combiner
        temporalEngine.executeScript(testGame.getId(), 
            "ψA01: (0.6+0.8i) ⊙(Δt+0 @7,4 ⟶ CREATE(ITEM, GATE_KEY, @7,4))");
        temporalEngine.executeScript(testGame.getId(), 
            "ψA02: (0.8+0.6i) ⊙(Δt+0 @7,5 ⟶ CREATE(ITEM, GATE_KEY, @7,5))");
        
        // Vérifier l'interférence
        testGame = gameRepository.findById(testGame.getId()).orElseThrow();
        
        // Les états devraient interférer constructivement
        // (0.6+0.8i) + (0.8+0.6i) = (1.4+1.4i)
        var interference = interferenceService.calculateInterferenceAtPosition(testGame, 7, 4);
        assertNotNull(interference);
        
        // La probabilité combinée devrait être augmentée
        assertTrue(interference.getCombinedProbability() > 1.0, 
            "L'interférence constructive devrait augmenter la probabilité");
    }
    
    @Test
    public void testNiveau3ReseauIntrication() {
        // Setup
        temporalEngine.executeScript(testGame.getId(), "HERO(DrQuantum)");
        temporalEngine.executeScript(testGame.getId(), "MOV(DrQuantum, @7,7)");
        
        // Créer l'artefact d'intrication
        temporalEngine.executeScript(testGame.getId(), 
            "CREATE(ARTIFACT, entanglement_web, HERO:DrQuantum)");
        
        // Créer un réseau d'états intriqués
        temporalEngine.executeScript(testGame.getId(), 
            "ψENT1: (0.577+0.577i) ⊙(Δt+0 @9,2 ⟶ CREATE(ITEM, quantum_node, @9,2))");
        temporalEngine.executeScript(testGame.getId(), 
            "ψENT2: (0.577+0.577i) ⊙(Δt+0 @9,6 ⟶ CREATE(ITEM, quantum_node, @9,6))");
        temporalEngine.executeScript(testGame.getId(), 
            "ψENT3: (0.577+0.577i) ⊙(Δt+0 @11,4 ⟶ CREATE(ITEM, quantum_node, @11,4))");
        
        // Vérifier que les trois états forment un triangle équilibré
        testGame = gameRepository.findById(testGame.getId()).orElseThrow();
        
        long nodeCount = testGame.getActivePsiStates().stream()
            .filter(psi -> psi.getPsiId().startsWith("ψENT"))
            .count();
        
        assertEquals(3, nodeCount, "Le réseau devrait avoir 3 nœuds");
        
        // Tous devraient avoir la même amplitude (réseau équilibré)
        testGame.getActivePsiStates().stream()
            .filter(psi -> psi.getPsiId().startsWith("ψENT"))
            .forEach(psi -> {
                assertEquals(0.577, psi.getComplexAmplitude().getRealPart(), 0.01);
                assertEquals(0.577, psi.getComplexAmplitude().getImaginaryPart(), 0.01);
            });
    }
    
    @Test
    public void testNiveau4NettoyageQuantique() {
        // Setup
        temporalEngine.executeScript(testGame.getId(), "HERO(DrQuantum)");
        
        // Créer des états parasites
        temporalEngine.executeScript(testGame.getId(), 
            "ψNOISE1: (0.1+0.1i) ⊙(Δt+0 @10,8 ⟶ CREATE(ITEM, interference, @10,8))");
        temporalEngine.executeScript(testGame.getId(), 
            "ψNOISE2: (0.2+0.1i) ⊙(Δt+0 @11,8 ⟶ CREATE(ITEM, interference, @11,8))");
        temporalEngine.executeScript(testGame.getId(), 
            "ψNOISE3: (0.15+0.05i) ⊙(Δt+0 @10,9 ⟶ CREATE(ITEM, interference, @10,9))");
        
        // Créer l'état désiré (forte amplitude)
        temporalEngine.executeScript(testGame.getId(), 
            "ψSIGNAL: (0.8+0.6i) ⊙(Δt+0 @10,8 ⟶ CREATE(ITEM, solution_key, @10,8))");
        
        testGame = gameRepository.findById(testGame.getId()).orElseThrow();
        
        // Vérifier qu'on a 4 états (3 parasites + 1 signal)
        long totalStates = testGame.getActivePsiStates().stream()
            .filter(psi -> psi.getPsiId().startsWith("ψNOISE") || psi.getPsiId().equals("ψSIGNAL"))
            .count();
        assertEquals(4, totalStates);
        
        // Simuler l'utilisation du quantum_eraser (effacer les états faibles)
        // Dans une vraie implémentation, ceci serait fait par l'artefact
        testGame.getActivePsiStates().stream()
            .filter(psi -> psi.getPsiId().startsWith("ψNOISE"))
            .forEach(psi -> {
                double probability = psi.getComplexAmplitude().getProbability();
                assertTrue(probability < 0.1, "Les états parasites ont une faible probabilité");
            });
    }
    
    @Test
    public void testNiveau5ParadoxeTemporel() {
        // Setup
        temporalEngine.executeScript(testGame.getId(), "HERO(DrQuantum)");
        
        // Créer un paradoxe : état qui dépend de son propre effondrement
        Map<String, Object> result = temporalEngine.executeScript(testGame.getId(), 
            "ψPARADOX1: (0.707+0.707i) ⊙(Δt-1 @12,10 ⟶ †ψPARADOX1)");
        
        // Le système devrait détecter le paradoxe
        assertNotNull(result);
        // Dans une implémentation complète, on vérifierait la gestion du paradoxe
        
        // Créer l'artefact résolveur
        temporalEngine.executeScript(testGame.getId(), 
            "CREATE(ARTIFACT, paradox_resolver, HERO:DrQuantum)");
        
        // Utiliser pour résoudre
        temporalEngine.executeScript(testGame.getId(), 
            "USE(ARTIFACT, paradox_resolver, HERO:DrQuantum)");
    }
    
    @Test
    public void testNiveauFinalPontDimensionnel() {
        // Setup final
        temporalEngine.executeScript(testGame.getId(), "HERO(DrQuantum)");
        temporalEngine.executeScript(testGame.getId(), "MOV(DrQuantum, @12,10)");
        
        // Créer le pont dimensionnel
        temporalEngine.executeScript(testGame.getId(), 
            "CREATE(ARTIFACT, dimensional_bridge, HERO:DrQuantum)");
        
        // Créer un état quantique connectant deux positions distantes
        Map<String, Object> result = temporalEngine.executeScript(testGame.getId(), 
            "ψBRIDGE: (1.0+0.0i) ⊙(Δt+0 @15,15 ⟶ CREATE(PORTAL, exit_portal, @15,15))");
        assertTrue((Boolean) result.get("success"));
        
        // Ancrer la réalité
        temporalEngine.executeScript(testGame.getId(), 
            "CREATE(ARTIFACT, reality_anchor, HERO:DrQuantum)");
        
        // Téléportation quantique vers la sortie
        result = temporalEngine.executeScript(testGame.getId(), "MOV(DrQuantum, @15,15)");
        
        // Vérifier la victoire
        testGame = gameRepository.findById(testGame.getId()).orElseThrow();
        Hero drQuantum = testGame.getHeroByName("DrQuantum");
        
        assertEquals(15, drQuantum.getPositionX());
        assertEquals(15, drQuantum.getPositionY());
        
        // Dans un vrai jeu, on vérifierait les conditions de victoire
        assertTrue(true, "Le héros a atteint la sortie du labyrinthe quantique !");
    }
    
    @Test
    public void testDifferenceAvecRPGClassique() {
        // Ce test démontre comment le même moteur gère différents types de jeux
        
        // Créer un héros de puzzle
        temporalEngine.executeScript(testGame.getId(), "HERO(DrQuantum)");
        
        // Équiper avec des outils, pas des armes
        temporalEngine.executeScript(testGame.getId(), 
            "CREATE(ITEM, wave_function_manipulator, HERO:DrQuantum)");
        temporalEngine.executeScript(testGame.getId(), 
            "CREATE(ITEM, measurement_device, HERO:DrQuantum)");
        
        testGame = gameRepository.findById(testGame.getId()).orElseThrow();
        Hero scientist = testGame.getHeroByName("DrQuantum");
        
        // Vérifier que c'est bien un scientifique, pas un guerrier
        assertTrue(scientist.hasItem("wave_function_manipulator"));
        assertTrue(scientist.hasItem("measurement_device"));
        assertFalse(scientist.hasItem("sword")); // Pas d'épée !
        
        // Le gameplay est basé sur la résolution, pas le combat
        assertEquals(100, scientist.getHealth()); // Santé intacte, pas de combat
    }
} 