package com.heroesoftimepoc.temporalengine;

import com.heroesoftimepoc.temporalengine.model.Game;
import com.heroesoftimepoc.temporalengine.model.Hero;
import com.heroesoftimepoc.temporalengine.model.PsiState;
import com.heroesoftimepoc.temporalengine.repository.GameRepository;
import com.heroesoftimepoc.temporalengine.repository.HeroRepository;
import com.heroesoftimepoc.temporalengine.repository.PsiStateRepository;
import com.heroesoftimepoc.temporalengine.service.TemporalEngineService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test")
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@Transactional
public class TemporalEngineIntegrationTest {

    @Autowired
    private TemporalEngineService temporalEngineService;
    
    @Autowired
    private GameRepository gameRepository;
    
    @Autowired
    private HeroRepository heroRepository;
    
    @Autowired
    private PsiStateRepository psiStateRepository;
    
    private Game testGame;
    
    @BeforeEach
    void setUp() {
        // Create a fresh test game for each test
        testGame = new Game("Integration Test Game");
        testGame.addPlayer("player1");
        testGame.addPlayer("player2");
        testGame.start();
        testGame = gameRepository.save(testGame);
    }
    
    @Test
    @Order(1)
    void testCompleteTemporalScenario() {
        // This test validates the complete temporal engine workflow
        
        // Phase 1: Setup - Create heroes and initial state
        Map<String, Object> result1 = temporalEngineService.executeScript(testGame.getId(), "HERO(Arthur)");
        assertTrue((Boolean) result1.get("success"));
        
        Map<String, Object> result2 = temporalEngineService.executeScript(testGame.getId(), "HERO(Ragnar)");
        assertTrue((Boolean) result2.get("success"));
        
        Map<String, Object> result3 = temporalEngineService.executeScript(testGame.getId(), "HERO(Morgana)");
        assertTrue((Boolean) result3.get("success"));
        
        // Phase 2: Initial positioning
        temporalEngineService.executeScript(testGame.getId(), "MOV(Arthur, @10,10)");
        temporalEngineService.executeScript(testGame.getId(), "MOV(Ragnar, @15,15)");
        temporalEngineService.executeScript(testGame.getId(), "MOV(Morgana, @20,20)");
        
        // Phase 3: Create complex temporal scenario
        String psiScript1 = "ψ001: ⊙(Δt+2 @25,25 ⟶ MOV(HERO, Arthur, @25,25))";
        Map<String, Object> psiResult1 = temporalEngineService.executeScript(testGame.getId(), psiScript1);
        assertTrue((Boolean) psiResult1.get("success"));
        
        String psiScript2 = "ψ002: ⊙(Δt+2 @25,25 ⟶ MOV(HERO, Ragnar, @25,25))";
        Map<String, Object> psiResult2 = temporalEngineService.executeScript(testGame.getId(), psiScript2);
        assertTrue((Boolean) psiResult2.get("success"));
        
        String psiScript3 = "ψ003: ⊙(Δt+3 @30,30 ⟶ BATTLE(HERO Arthur, HERO Ragnar))";
        Map<String, Object> psiResult3 = temporalEngineService.executeScript(testGame.getId(), psiScript3);
        assertTrue((Boolean) psiResult3.get("success"));
        
        // Phase 4: Create observation triggers
        String triggerScript = "Π(Morgana enters @25,25 at Δt+2) ⇒ †ψ001";
        Map<String, Object> triggerResult = temporalEngineService.executeScript(testGame.getId(), triggerScript);
        assertTrue((Boolean) triggerResult.get("success"));
        
        // Phase 5: Use temporal artifacts
        String artifactScript = "USE(ITEM, AvantWorldBlade, HERO:Arthur)";
        Map<String, Object> artifactResult = temporalEngineService.executeScript(testGame.getId(), artifactScript);
        assertTrue((Boolean) artifactResult.get("success"));
        
        // Phase 6: Verify game state
        List<Hero> heroes = heroRepository.findByGameId(testGame.getId());
        assertEquals(3, heroes.size());
        
        List<PsiState> psiStates = psiStateRepository.findByGameId(testGame.getId());
        assertEquals(3, psiStates.size());
        
        // Verify all ψ-states are active
        long activeCount = psiStates.stream()
                .filter(psi -> psi.getStatus() == PsiState.PsiStatus.ACTIVE)
                .count();
        assertEquals(3, activeCount);
        
        // Phase 7: Collapse resolution
        String collapseScript = "†ψ002";
        Map<String, Object> collapseResult = temporalEngineService.executeScript(testGame.getId(), collapseScript);
        assertTrue((Boolean) collapseResult.get("success"));
        
        // Verify collapse effect
        Optional<PsiState> collapsedPsi = psiStateRepository.findByPsiId("ψ002");
        assertTrue(collapsedPsi.isPresent());
        assertEquals(PsiState.PsiStatus.COLLAPSED, collapsedPsi.get().getStatus());
        
        // Phase 8: Final state verification
        List<Hero> finalHeroes = heroRepository.findByGameId(testGame.getId());
        assertEquals(3, finalHeroes.size());
        
        // Verify Ragnar was moved to target position
        Optional<Hero> ragnar = finalHeroes.stream()
                .filter(h -> h.getName().equals("Ragnar"))
                .findFirst();
        assertTrue(ragnar.isPresent());
        assertEquals(25, ragnar.get().getPositionX());
        assertEquals(25, ragnar.get().getPositionY());
    }
    
    @Test
    @Order(2)
    void testConflictResolution() {
        // Test temporal conflict resolution
        
        // Setup heroes
        temporalEngineService.executeScript(testGame.getId(), "HERO(Arthur)");
        temporalEngineService.executeScript(testGame.getId(), "HERO(Ragnar)");
        
        // Create conflicting ψ-states (same position, same time)
        String psi1 = "ψ100: ⊙(Δt+2 @50,50 ⟶ CREATE(CREATURE, Dragon))";
        String psi2 = "ψ101: ⊙(Δt+2 @50,50 ⟶ CREATE(CREATURE, Phoenix))";
        
        Map<String, Object> result1 = temporalEngineService.executeScript(testGame.getId(), psi1);
        assertTrue((Boolean) result1.get("success"));
        
        Map<String, Object> result2 = temporalEngineService.executeScript(testGame.getId(), psi2);
        assertTrue((Boolean) result2.get("success"));
        
        // Verify both ψ-states exist
        List<PsiState> conflictingStates = psiStateRepository.findByGameIdAndTargetPosition(testGame.getId(), 50, 50);
        assertEquals(2, conflictingStates.size());
        
        // Force resolution by collapsing one
        Map<String, Object> collapseResult = temporalEngineService.executeScript(testGame.getId(), "†ψ100");
        assertTrue((Boolean) collapseResult.get("success"));
        
        // Verify conflict resolution
        Optional<PsiState> psi100 = psiStateRepository.findByPsiId("ψ100");
        assertTrue(psi100.isPresent());
        assertEquals(PsiState.PsiStatus.COLLAPSED, psi100.get().getStatus());
        
        Optional<PsiState> psi101 = psiStateRepository.findByPsiId("ψ101");
        assertTrue(psi101.isPresent());
        assertEquals(PsiState.PsiStatus.ACTIVE, psi101.get().getStatus());
    }
    
    @Test
    @Order(3)
    void testArtifactEffects() {
        // Test temporal artifact effects on ψ-states
        
        // Create hero
        temporalEngineService.executeScript(testGame.getId(), "HERO(Arthur)");
        
        // Use powerful artifact
        temporalEngineService.executeScript(testGame.getId(), "USE(ITEM, AvantWorldBlade, HERO:Arthur)");
        
        // Create ψ-state that should be boosted by artifact
        String psiScript = "ψ200: ⊙(Δt+1 @60,60 ⟶ CREATE(CREATURE, Dragon))";
        Map<String, Object> result = temporalEngineService.executeScript(testGame.getId(), psiScript);
        assertTrue((Boolean) result.get("success"));
        
        // Verify ψ-state creation
        Optional<PsiState> psi = psiStateRepository.findByPsiId("ψ200");
        assertTrue(psi.isPresent());
        assertEquals("CREATE", psi.get().getActionType());
        assertEquals(60, psi.get().getTargetX());
        assertEquals(60, psi.get().getTargetY());
        
        // Test artifact effect on collapse
        Map<String, Object> collapseResult = temporalEngineService.executeScript(testGame.getId(), "†ψ200");
        assertTrue((Boolean) collapseResult.get("success"));
        
        // Verify collapse was successful (artifact should ensure success)
        Optional<PsiState> collapsedPsi = psiStateRepository.findByPsiId("ψ200");
        assertTrue(collapsedPsi.isPresent());
        assertEquals(PsiState.PsiStatus.COLLAPSED, collapsedPsi.get().getStatus());
    }
    
    @Test
    @Order(4)
    void testComplexBattleScenario() {
        // Test complex battle scenario with temporal mechanics
        
        // Create heroes
        temporalEngineService.executeScript(testGame.getId(), "HERO(Arthur)");
        temporalEngineService.executeScript(testGame.getId(), "HERO(Ragnar)");
        temporalEngineService.executeScript(testGame.getId(), "HERO(Morgana)");
        
        // Position heroes
        temporalEngineService.executeScript(testGame.getId(), "MOV(Arthur, @70,70)");
        temporalEngineService.executeScript(testGame.getId(), "MOV(Ragnar, @71,71)");
        temporalEngineService.executeScript(testGame.getId(), "MOV(Morgana, @72,72)");
        
        // Create temporal battle scenario
        String battlePsi = "ψ300: ⊙(Δt+2 @75,75 ⟶ BATTLE(HERO Arthur, HERO Ragnar))";
        Map<String, Object> battleResult = temporalEngineService.executeScript(testGame.getId(), battlePsi);
        assertTrue((Boolean) battleResult.get("success"));
        
        // Create support scenario
        String supportPsi = "ψ301: ⊙(Δt+1 @74,74 ⟶ MOV(HERO, Morgana, @74,74))";
        Map<String, Object> supportResult = temporalEngineService.executeScript(testGame.getId(), supportPsi);
        assertTrue((Boolean) supportResult.get("success"));
        
        // Create observation trigger for battle
        String triggerScript = "Π(Arthur enters @75,75 at Δt+2) ⇒ †ψ300";
        Map<String, Object> triggerResult = temporalEngineService.executeScript(testGame.getId(), triggerScript);
        assertTrue((Boolean) triggerResult.get("success"));
        
        // Verify scenario setup
        List<PsiState> battleStates = psiStateRepository.findByGameId(testGame.getId());
        assertEquals(2, battleStates.size());
        
        // Execute support movement
        Map<String, Object> supportCollapseResult = temporalEngineService.executeScript(testGame.getId(), "†ψ301");
        assertTrue((Boolean) supportCollapseResult.get("success"));
        
        // Verify Morgana moved to support position
        List<Hero> heroes = heroRepository.findByGameId(testGame.getId());
        Optional<Hero> morgana = heroes.stream()
                .filter(h -> h.getName().equals("Morgana"))
                .findFirst();
        assertTrue(morgana.isPresent());
        assertEquals(74, morgana.get().getPositionX());
        assertEquals(74, morgana.get().getPositionY());
        
        // Execute battle
        Map<String, Object> battleCollapseResult = temporalEngineService.executeScript(testGame.getId(), "†ψ300");
        assertTrue((Boolean) battleCollapseResult.get("success"));
    }
    
    @Test
    @Order(5)
    void testTimelineConsistency() {
        // Test that the timeline remains consistent throughout operations
        
        // Create initial state
        temporalEngineService.executeScript(testGame.getId(), "HERO(Arthur)");
        temporalEngineService.executeScript(testGame.getId(), "HERO(Ragnar)");
        
        // Create multiple ψ-states with different timelines
        temporalEngineService.executeScript(testGame.getId(), "ψ400: ⊙(Δt+1 @80,80 ⟶ MOV(HERO, Arthur, @80,80))");
        temporalEngineService.executeScript(testGame.getId(), "ψ401: ⊙(Δt+2 @81,81 ⟶ MOV(HERO, Arthur, @81,81))");
        temporalEngineService.executeScript(testGame.getId(), "ψ402: ⊙(Δt+3 @82,82 ⟶ MOV(HERO, Arthur, @82,82))");
        
        // Create parallel timeline for Ragnar
        temporalEngineService.executeScript(testGame.getId(), "ψ403: ⊙(Δt+1 @85,85 ⟶ MOV(HERO, Ragnar, @85,85))");
        temporalEngineService.executeScript(testGame.getId(), "ψ404: ⊙(Δt+2 @86,86 ⟶ MOV(HERO, Ragnar, @86,86))");
        
        // Verify all ψ-states exist
        List<PsiState> allStates = psiStateRepository.findByGameId(testGame.getId());
        assertEquals(5, allStates.size());
        
        // Collapse states in different order
        temporalEngineService.executeScript(testGame.getId(), "†ψ401"); // Δt+2
        temporalEngineService.executeScript(testGame.getId(), "†ψ403"); // Δt+1
        temporalEngineService.executeScript(testGame.getId(), "†ψ402"); // Δt+3
        
        // Verify timeline consistency
        List<Hero> heroes = heroRepository.findByGameId(testGame.getId());
        assertEquals(2, heroes.size());
        
        // Check Arthur's final position (should be from last collapsed state)
        Optional<Hero> arthur = heroes.stream()
                .filter(h -> h.getName().equals("Arthur"))
                .findFirst();
        assertTrue(arthur.isPresent());
        assertEquals(82, arthur.get().getPositionX());
        assertEquals(82, arthur.get().getPositionY());
        
        // Check Ragnar's final position
        Optional<Hero> ragnar = heroes.stream()
                .filter(h -> h.getName().equals("Ragnar"))
                .findFirst();
        assertTrue(ragnar.isPresent());
        assertEquals(85, ragnar.get().getPositionX());
        assertEquals(85, ragnar.get().getPositionY());
        
        // Verify remaining ψ-states
        List<PsiState> remainingStates = psiStateRepository.findByGameIdAndStatus(testGame.getId(), PsiState.PsiStatus.ACTIVE);
        assertEquals(2, remainingStates.size()); // ψ400 and ψ404
        
        List<PsiState> collapsedStates = psiStateRepository.findByGameIdAndStatus(testGame.getId(), PsiState.PsiStatus.COLLAPSED);
        assertEquals(3, collapsedStates.size()); // ψ401, ψ403, ψ402
    }
    
    @Test
    @Order(6)
    void testErrorRecovery() {
        // Test error handling and recovery
        
        // Create valid hero
        temporalEngineService.executeScript(testGame.getId(), "HERO(Arthur)");
        
        // Try invalid operations
        Map<String, Object> invalidResult1 = temporalEngineService.executeScript(testGame.getId(), "MOV(NonExistentHero, @10,10)");
        assertFalse((Boolean) invalidResult1.get("success"));
        
        Map<String, Object> invalidResult2 = temporalEngineService.executeScript(testGame.getId(), "INVALID_COMMAND");
        assertFalse((Boolean) invalidResult2.get("success"));
        
        // Verify valid operations still work after errors
        Map<String, Object> validResult = temporalEngineService.executeScript(testGame.getId(), "MOV(Arthur, @10,10)");
        assertTrue((Boolean) validResult.get("success"));
        
        // Verify hero was moved correctly
        List<Hero> heroes = heroRepository.findByGameId(testGame.getId());
        assertEquals(1, heroes.size());
        assertEquals("Arthur", heroes.get(0).getName());
        assertEquals(10, heroes.get(0).getPositionX());
        assertEquals(10, heroes.get(0).getPositionY());
    }
    
    @Test
    @Order(7)
    void testPerformanceScenario() {
        // Test performance with many operations
        
        // Create multiple heroes
        for (int i = 1; i <= 5; i++) {
            temporalEngineService.executeScript(testGame.getId(), "HERO(Hero" + i + ")");
        }
        
        // Create many ψ-states
        for (int i = 1; i <= 20; i++) {
            String psiScript = String.format("ψ%03d: ⊙(Δt+%d @%d,%d ⟶ MOV(HERO, Hero%d, @%d,%d))", 
                    500 + i, (i % 5) + 1, i * 10, i * 10, (i % 5) + 1, i * 10, i * 10);
            Map<String, Object> result = temporalEngineService.executeScript(testGame.getId(), psiScript);
            assertTrue((Boolean) result.get("success"));
        }
        
        // Verify all states were created
        List<PsiState> allStates = psiStateRepository.findByGameId(testGame.getId());
        assertEquals(20, allStates.size());
        
        // Collapse half of them
        for (int i = 1; i <= 10; i++) {
            String collapseScript = String.format("†ψ%03d", 500 + i);
            Map<String, Object> result = temporalEngineService.executeScript(testGame.getId(), collapseScript);
            assertTrue((Boolean) result.get("success"));
        }
        
        // Verify final state
        List<PsiState> activeStates = psiStateRepository.findByGameIdAndStatus(testGame.getId(), PsiState.PsiStatus.ACTIVE);
        assertEquals(10, activeStates.size());
        
        List<PsiState> collapsedStates = psiStateRepository.findByGameIdAndStatus(testGame.getId(), PsiState.PsiStatus.COLLAPSED);
        assertEquals(10, collapsedStates.size());
        
        // Verify all heroes still exist
        List<Hero> heroes = heroRepository.findByGameId(testGame.getId());
        assertEquals(5, heroes.size());
    }
} 