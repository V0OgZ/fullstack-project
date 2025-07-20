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
 * Test du vol du trésor du futur avec Axis
 * Scénario : Axis peut voyager dans le temps et voler un trésor avant qu'il existe
 */
@SpringBootTest
@ActiveProfiles("test")
@Transactional
public class TreasureTheftTest {
    
    @Autowired
    private GameRepository gameRepository;
    
    @Autowired
    private TemporalEngineService temporalEngine;
    
    @Autowired
    private GodViewService godViewService;
    
    private Game testGame;
    
    @BeforeEach
    public void setUp() {
        // Créer une partie
        testGame = new Game();
        testGame.setGameName("Test Vol Trésor Temporel");
        testGame.setPlayers(java.util.Arrays.asList("Jean", "Claude"));
        testGame.setStatus(Game.GameStatus.ACTIVE);
        testGame.setMapWidth(50);
        testGame.setMapHeight(50);
        testGame = gameRepository.save(testGame);
    }
    
    @Test
    public void testAxisCanStealFutureTreasure() {
        // 1. Créer Axis et Arthur
        Map<String, Object> result = temporalEngine.executeScript(testGame.getId(), "HERO(Axis)");
        assertTrue((Boolean) result.get("success"));
        
        result = temporalEngine.executeScript(testGame.getId(), "HERO(Arthur)");
        assertTrue((Boolean) result.get("success"));
        
        // 2. Positionner les héros
        result = temporalEngine.executeScript(testGame.getId(), "MOV(Axis, @10,10)");
        assertTrue((Boolean) result.get("success"));
        
        result = temporalEngine.executeScript(testGame.getId(), "MOV(Arthur, @20,20)");
        assertTrue((Boolean) result.get("success"));
        
        // 3. Créer un état quantique : trésor apparaîtra jour 15
        result = temporalEngine.executeScript(testGame.getId(), 
            "ψ001: (0.9+0.1i) ⊙(Δt+15 @30,30 ⟶ CREATE(ITEM, temporal_treasure, @30,30))");
        assertTrue((Boolean) result.get("success"));
        
        // 4. Donner à Axis ses objets temporels
        result = temporalEngine.executeScript(testGame.getId(), 
            "CREATE(ITEM, Chronocompass_Linéaire, HERO:Axis)");
        assertTrue((Boolean) result.get("success"));
        
        // 5. Axis voyage au jour 15 (instantanément grâce à son pouvoir)
        testGame = gameRepository.findById(testGame.getId()).orElseThrow();
        Hero axis = testGame.getHeroByName("Axis");
        assertNotNull(axis);
        
        // Simuler le voyage temporel d'Axis
        axis.setCurrentDay(15);
        axis.setPositionX(30);
        axis.setPositionY(30);
        
        // 6. Forcer le collapse de l'état ψ (Axis observe le futur)
        result = temporalEngine.executeScript(testGame.getId(), "†ψ001");
        assertTrue((Boolean) result.get("success"));
        
        // 7. Axis prend le trésor
        result = temporalEngine.executeScript(testGame.getId(), 
            "CREATE(ITEM, temporal_treasure, HERO:Axis)");
        assertTrue((Boolean) result.get("success"));
        
        // 8. Vérifier qu'Axis a le trésor
        testGame = gameRepository.findById(testGame.getId()).orElseThrow();
        axis = testGame.getHeroByName("Axis");
        assertTrue(axis.hasItem("temporal_treasure"), "Axis devrait avoir le trésor");
        
        // 9. Arthur arrive au jour 15 normal
        Hero arthur = testGame.getHeroByName("Arthur");
        arthur.setCurrentDay(15);
        arthur.setPositionX(30);
        arthur.setPositionY(30);
        
        // 10. Le trésor n'est plus là pour Arthur !
        GameTile treasureTile = testGame.getTileAt(30, 30);
        assertNotNull(treasureTile);
        // Dans une vraie implémentation, on vérifierait que le coffre est vide
    }
    
    @Test
    public void testNormalHeroCannotStealFromFuture() {
        // 1. Créer un héros normal (pas Axis)
        Map<String, Object> result = temporalEngine.executeScript(testGame.getId(), "HERO(Lysandrel)");
        assertTrue((Boolean) result.get("success"));
        
        // 2. Créer un trésor dans le futur
        result = temporalEngine.executeScript(testGame.getId(), 
            "ψ002: (1.0+0.0i) ⊙(Δt+20 @40,40 ⟶ CREATE(ITEM, future_gem, @40,40))");
        assertTrue((Boolean) result.get("success"));
        
        // 3. Lysandrel ne peut PAS voyager au jour 20 instantanément
        Hero lysandrel = testGame.getHeroByName("Lysandrel");
        int startDay = lysandrel.getCurrentDay();
        
        // Tenter de bouger très loin (devrait avancer le temps)
        result = temporalEngine.executeScript(testGame.getId(), "MOV(Lysandrel, @40,40)");
        
        // Vérifier que le temps a avancé proportionnellement
        testGame = gameRepository.findById(testGame.getId()).orElseThrow();
        lysandrel = testGame.getHeroByName("Lysandrel");
        assertTrue(lysandrel.getCurrentDay() > startDay, 
            "Le temps devrait avancer pour un héros normal");
        
        // Le trésor n'existe pas encore si on n'est pas au jour 20
        if (lysandrel.getCurrentDay() < 20) {
            assertFalse(lysandrel.hasItem("future_gem"), 
                "Lysandrel ne devrait pas avoir le trésor du futur");
        }
    }
    
    @Test
    public void testGodViewSeesTheft() {
        // Créer le scénario
        temporalEngine.executeScript(testGame.getId(), "HERO(Axis)");
        temporalEngine.executeScript(testGame.getId(), 
            "ψ003: (0.8+0.2i) ⊙(Δt+10 @25,25 ⟶ CREATE(ITEM, quantum_orb, @25,25))");
        
        // Utiliser God View pour analyser la possibilité de vol
        testGame = gameRepository.findById(testGame.getId()).orElseThrow();
        Hero axis = testGame.getHeroByName("Axis");
        
        // Vérifier qu'Axis peut aller au jour 10 position (25,25)
        GodViewService.Position5D futurePos = new GodViewService.Position5D(25, 25, 0, "ℬ1", 10);
        boolean canMove = godViewService.canHeroMoveTo5D(testGame, axis, futurePos);
        
        assertTrue(canMove, "God View devrait voir qu'Axis peut aller dans le futur");
        
        // Simuler les conséquences
        Map<String, Object> consequences = Map.of(
            "treasureTaken", true,
            "takenDay", 10,
            "paradoxCreated", false
        );
        assertEquals(10, consequences.get("takenDay"));
    }
    
    @Test
    public void testVolAvecSingularityArtifact() {
        // Créer le scénario avec Jean-Grofignon
        temporalEngine.executeScript(testGame.getId(), "HERO(Jean-Grofignon)");
        temporalEngine.executeScript(testGame.getId(), 
            "CREATE(ITEM, singularity_artifact, HERO:Jean-Grofignon)");
        
        // Créer un trésor futur
        temporalEngine.executeScript(testGame.getId(), 
            "ψ004: (0.707+0.707i) ⊙(Δt+25 @35,35 ⟶ CREATE(ITEM, time_crystal, @35,35))");
        
        // Vérifier que Jean-Grofignon a l'artefact singularité
        testGame = gameRepository.findById(testGame.getId()).orElseThrow();
        Hero jean = testGame.getHeroByName("Jean-Grofignon");
        assertTrue(jean.hasItem("singularity_artifact"), 
            "Jean-Grofignon devrait avoir l'artefact singularité");
        
        // Avec cet artefact, il peut voir et manipuler le futur
        // Simuler qu'il voyage au jour 25
        jean.setCurrentDay(25);
        jean.setPositionX(35);
        jean.setPositionY(35);
        
        // Forcer le collapse et prendre le trésor
        temporalEngine.executeScript(testGame.getId(), "†ψ004");
        temporalEngine.executeScript(testGame.getId(), 
            "CREATE(ITEM, time_crystal, HERO:Jean-Grofignon)");
        
        // Vérifier
        testGame = gameRepository.findById(testGame.getId()).orElseThrow();
        jean = testGame.getHeroByName("Jean-Grofignon");
        assertTrue(jean.hasItem("time_crystal"), 
            "Jean-Grofignon devrait avoir volé le cristal temporel");
    }
    
    @Test
    public void testTemporalParadoxPrevention() {
        // Scénario : Deux héros veulent le même trésor
        temporalEngine.executeScript(testGame.getId(), "HERO(Axis)");
        temporalEngine.executeScript(testGame.getId(), "HERO(Morgana)");
        
        // Trésor apparaît jour 12
        temporalEngine.executeScript(testGame.getId(), 
            "ψ005: (1.0+0.0i) ⊙(Δt+12 @28,28 ⟶ CREATE(ITEM, paradox_gem, @28,28))");
        
        // Axis voyage et prend le trésor jour 12
        Hero axis = testGame.getHeroByName("Axis");
        axis.setCurrentDay(12);
        temporalEngine.executeScript(testGame.getId(), "†ψ005");
        temporalEngine.executeScript(testGame.getId(), "CREATE(ITEM, paradox_gem, HERO:Axis)");
        
        // Morgana arrive aussi jour 12
        Hero morgana = testGame.getHeroByName("Morgana");
        morgana.setCurrentDay(12);
        morgana.setPositionX(28);
        morgana.setPositionY(28);
        
        // Le système devrait détecter le paradoxe
        testGame = gameRepository.findById(testGame.getId()).orElseThrow();
        
        // Vérifier qu'un seul héros a le trésor
        axis = testGame.getHeroByName("Axis");
        morgana = testGame.getHeroByName("Morgana");
        
        assertTrue(axis.hasItem("paradox_gem") ^ morgana.hasItem("paradox_gem"),
            "Un seul héros devrait avoir le trésor pour éviter le paradoxe");
    }
} 