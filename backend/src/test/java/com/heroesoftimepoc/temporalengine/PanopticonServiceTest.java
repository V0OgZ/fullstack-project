package com.heroesoftimepoc.temporalengine;

import com.heroesoftimepoc.temporalengine.model.*;
import com.heroesoftimepoc.temporalengine.repository.*;
import com.heroesoftimepoc.temporalengine.service.*;
import com.heroesoftimepoc.temporalengine.service.PanopticonService.*;
import com.heroesoftimepoc.temporalengine.service.GodViewService.Position5D;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Test du service PANOPTICΩN
 */
@SpringBootTest
@ActiveProfiles("test")
@Transactional
public class PanopticonServiceTest {
    
    @Autowired
    private PanopticonService panopticonService;
    
    @Autowired
    private GameRepository gameRepository;
    
    @Autowired
    private TemporalEngineService temporalEngine;
    
    private Game testGame;
    private Hero testHero;
    
    @BeforeEach
    public void setUp() {
        // Créer une partie de test
        testGame = new Game();
        testGame.setGameName("Test PANOPTICΩN");
        testGame.setPlayers(java.util.Arrays.asList("Jean", "Claude"));
        testGame.setStatus(Game.GameStatus.ACTIVE);
        testGame.setMapWidth(50);
        testGame.setMapHeight(50);
        testGame = gameRepository.save(testGame);
        
        // Créer un héros
        temporalEngine.executeScript(testGame.getId(), "HERO(Jean-Grofignon)");
        testGame = gameRepository.findById(testGame.getId()).orElseThrow();
        testHero = testGame.getHeroByName("Jean-Grofignon");
        assertNotNull(testHero, "Hero should be created");
    }
    
    @Test
    public void testGeneratePanopticonData() {
        // Créer quelques états ψ
        temporalEngine.executeScript(testGame.getId(), 
            "ψ001: (0.8+0.6i) ⊙(Δt+2 @15,15 ⟶ MOV(Jean-Grofignon, @15,15))");
        temporalEngine.executeScript(testGame.getId(), 
            "ψ002: (0.6+0.8i) ⊙(Δt+3 @20,20 ⟶ CREATE(ITEM, quantum_key, @20,20))");
        
        // Générer les données PANOPTICΩN
        VisualizationData data = panopticonService.generatePanopticonData(testGame.getId());
        
        assertNotNull(data);
        assertNotNull(data.spatialNodes);
        assertFalse(data.spatialNodes.isEmpty(), "Should have spatial nodes");
        
        // Vérifier qu'on a le héros
        assertTrue(data.spatialNodes.stream()
            .anyMatch(node -> "hero".equals(node.type) && node.id.contains("Jean-Grofignon")));
        
        // Vérifier qu'on a les états ψ
        assertTrue(data.spatialNodes.stream()
            .anyMatch(node -> "psi_state".equals(node.type) && node.id.contains("ψ001")));
    }
    
    @Test
    public void testActivateAbsoluteObserver() {
        // Donner l'artefact singularité
        testHero.addItem("singularity_artifact");
        
        // Activer ABSOLUTE_OBSERVER
        PanopticonView view = panopticonService.activateAbsoluteObserver(
            testGame.getId(), "Jean-Grofignon"
        );
        
        assertNotNull(view);
        assertNotNull(view.metadata);
        assertTrue((Boolean) view.metadata.get("absoluteObserver"));
        assertEquals("Jean-Grofignon", view.metadata.get("heroName"));
    }
    
    @Test
    public void testInjectTemporalAction() {
        // Donner l'artefact singularité
        testHero.addItem("singularity_artifact");
        
        // Injecter une action dans le futur
        Position5D futurePos = new Position5D(25, 25, 0, "ℬ1", 10);
        ActionResult result = panopticonService.injectTemporalAction(
            testGame.getId(), "ℬ1", futurePos, 
            "MOV(Jean-Grofignon, @25,25)"
        );
        
        assertTrue(result.success);
        assertNotNull(result.actionId);
        assertTrue(result.actionId.contains("PANOPTICON"));
    }
    
    @Test
    public void testDebugMetrics() {
        // Créer quelques états pour les métriques
        temporalEngine.executeScript(testGame.getId(), 
            "ψ001: (0.8+0.6i) ⊙(Δt+2 @15,15 ⟶ MOV(Jean-Grofignon, @15,15))");
        
        var metrics = panopticonService.getDebugMetrics(testGame.getId());
        
        assertNotNull(metrics);
        assertTrue(metrics.containsKey("activePsiStates"));
        assertTrue(metrics.containsKey("averageFogDensity"));
        assertTrue(metrics.containsKey("quantumInterferences"));
    }
    
    @Test
    public void test3DPositionMapping() {
        // Créer un héros au jour 5
        testHero.setCurrentDay(5);
        
        VisualizationData data = panopticonService.generatePanopticonData(testGame.getId());
        
        // Trouver le nœud du héros
        PanopticonService.SpatialNode heroNode = data.spatialNodes.stream()
            .filter(n -> n.id.contains("Jean-Grofignon"))
            .findFirst()
            .orElseThrow();
        
        // Vérifier que Z = jour * 10
        assertEquals(50.0, heroNode.position.z, "Z should be day * 10");
    }
    
    @Test
    public void testTimelineColors() {
        VisualizationData data = panopticonService.generatePanopticonData(testGame.getId());
        
        assertNotNull(data.timelines);
        assertTrue(data.timelines.containsKey("ℬ1"));
        assertEquals("#0066CC", data.timelines.get("ℬ1").color);
    }
} 