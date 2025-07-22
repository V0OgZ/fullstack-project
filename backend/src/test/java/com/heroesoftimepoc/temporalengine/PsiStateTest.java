package com.heroesoftimepoc.temporalengine;

import com.heroesoftimepoc.temporalengine.model.Game;
import com.heroesoftimepoc.temporalengine.model.PsiState;
import com.heroesoftimepoc.temporalengine.repository.PsiStateRepository;
import com.heroesoftimepoc.temporalengine.repository.GameRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
public class PsiStateTest {

    @Autowired
    private PsiStateRepository psiStateRepository;
    
    @Autowired
    private GameRepository gameRepository;
    
    private Game testGame;
    
    @BeforeEach
    void setUp() {
        // Create a test game
        testGame = new Game("Test Game");
        testGame.addPlayer("player1");
        testGame.start();
        testGame = gameRepository.save(testGame);
    }
    
    @Test
    void testPsiStateCreation() {
        // Test creating a ψ-state
        PsiState psiState = new PsiState();
        psiState.setPsiId("ψ001");
        psiState.setExpression("⊙(Δt+2 @126,65 ⟶ CREATE(CREATURE, Dragon))");
        psiState.setBranchId("ℬ1");
        psiState.setProbability(0.8);
        psiState.setTargetX(126);
        psiState.setTargetY(65);
        psiState.setDeltaT(2);
        psiState.setActionType("CREATE");
        psiState.setOwnerHero("Arthur");
        psiState.setGame(testGame);
        
        // Save the ψ-state
        PsiState savedPsiState = psiStateRepository.save(psiState);
        
        // Verify it was saved correctly
        assertNotNull(savedPsiState.getId());
        assertEquals("ψ001", savedPsiState.getPsiId());
        assertEquals("⊙(Δt+2 @126,65 ⟶ CREATE(CREATURE, Dragon))", savedPsiState.getExpression());
        assertEquals("ℬ1", savedPsiState.getBranchId());
        assertEquals(0.8, savedPsiState.getProbability());
        assertEquals(126, savedPsiState.getTargetX());
        assertEquals(65, savedPsiState.getTargetY());
        assertEquals(2, savedPsiState.getDeltaT());
        assertEquals("CREATE", savedPsiState.getActionType());
        assertEquals("Arthur", savedPsiState.getOwnerHero());
        assertEquals(PsiState.PsiStatus.ACTIVE, savedPsiState.getStatus());
        assertNotNull(savedPsiState.getCreatedAt());
    }
    
    @Test
    void testPsiStateStatusTransitions() {
        // Create a ψ-state
        PsiState psiState = new PsiState("ψ002", "⊙(Δt+1 @10,10 ⟶ MOV(HERO, Arthur, @10,10))", "ℬ1");
        psiState.setGame(testGame);
        psiState.setTargetX(10);
        psiState.setTargetY(10);
        psiState.setDeltaT(1);
        psiState.setActionType("MOV");
        psiState.setOwnerHero("Arthur");
        psiState = psiStateRepository.save(psiState);
        
        // Test status transitions
        assertEquals(PsiState.PsiStatus.ACTIVE, psiState.getStatus());
        
        // Collapse the ψ-state
        psiState.setStatus(PsiState.PsiStatus.COLLAPSED);
        psiState = psiStateRepository.save(psiState);
        
        assertEquals(PsiState.PsiStatus.COLLAPSED, psiState.getStatus());
        
        // Test finding by status
        List<PsiState> collapsedStates = psiStateRepository.findByStatus(PsiState.PsiStatus.COLLAPSED);
        assertEquals(1, collapsedStates.size());
        assertEquals("ψ002", collapsedStates.get(0).getPsiId());
    }
    
    @Test
    void testPsiStateQuery() {
        // Create multiple ψ-states
        PsiState psi1 = new PsiState("ψ003", "⊙(Δt+1 @10,10 ⟶ MOV(HERO, Arthur, @10,10))", "ℬ1");
        psi1.setGame(testGame);
        psi1.setTargetX(10);
        psi1.setTargetY(10);
        psi1.setDeltaT(1);
        psi1.setActionType("MOV");
        psi1.setOwnerHero("Arthur");
        
        PsiState psi2 = new PsiState("ψ004", "⊙(Δt+2 @10,10 ⟶ CREATE(CREATURE, Dragon))", "ℬ1");
        psi2.setGame(testGame);
        psi2.setTargetX(10);
        psi2.setTargetY(10);
        psi2.setDeltaT(2);
        psi2.setActionType("CREATE");
        psi2.setOwnerHero("Arthur");
        
        PsiState psi3 = new PsiState("ψ005", "⊙(Δt+1 @12,12 ⟶ MOV(HERO, Ragnar, @12,12))", "ℬ1");
        psi3.setGame(testGame);
        psi3.setTargetX(12);
        psi3.setTargetY(12);
        psi3.setDeltaT(1);
        psi3.setActionType("MOV");
        psi3.setOwnerHero("Ragnar");
        
        psiStateRepository.save(psi1);
        psiStateRepository.save(psi2);
        psiStateRepository.save(psi3);
        
        // Test finding by position
        List<PsiState> statesAt10x10 = psiStateRepository.findByTargetPosition(10, 10);
        assertEquals(2, statesAt10x10.size());
        
        // Test finding by game ID
        List<PsiState> gameStates = psiStateRepository.findByGameId(testGame.getId());
        assertEquals(3, gameStates.size());
        
        // Test finding by owner hero
        List<PsiState> arthurStates = psiStateRepository.findByOwnerHero("Arthur");
        assertEquals(2, arthurStates.size());
        
        List<PsiState> ragnarStates = psiStateRepository.findByOwnerHero("Ragnar");
        assertEquals(1, ragnarStates.size());
        
        // Test finding by deltaT
        List<PsiState> deltaT1States = psiStateRepository.findByDeltaT(1);
        assertEquals(2, deltaT1States.size());
        
        List<PsiState> deltaT2States = psiStateRepository.findByDeltaT(2);
        assertEquals(1, deltaT2States.size());
    }
    
    @Test
    void testPsiStateConflictDetection() {
        // Create two conflicting ψ-states (same position, same deltaT)
        PsiState psi1 = new PsiState("ψ006", "⊙(Δt+2 @15,15 ⟶ CREATE(CREATURE, Dragon))", "ℬ1");
        psi1.setGame(testGame);
        psi1.setTargetX(15);
        psi1.setTargetY(15);
        psi1.setDeltaT(2);
        psi1.setActionType("CREATE");
        psi1.setOwnerHero("Arthur");
        
        PsiState psi2 = new PsiState("ψ007", "⊙(Δt+2 @15,15 ⟶ CREATE(CREATURE, Phoenix))", "ℬ1");
        psi2.setGame(testGame);
        psi2.setTargetX(15);
        psi2.setTargetY(15);
        psi2.setDeltaT(2);
        psi2.setActionType("CREATE");
        psi2.setOwnerHero("Ragnar");
        
        psiStateRepository.save(psi1);
        psiStateRepository.save(psi2);
        
        // Test conflict detection query
        List<PsiState> conflictingStates = psiStateRepository.findByGameIdAndTargetPosition(testGame.getId(), 15, 15);
        assertEquals(2, conflictingStates.size());
        
        // Test finding active states with same deltaT
        List<PsiState> activeStatesAtT2 = psiStateRepository.findActiveByGameIdAndDeltaT(testGame.getId(), 2);
        assertEquals(2, activeStatesAtT2.size());
        
        // This would be a conflict that needs resolution
        assertTrue(activeStatesAtT2.size() > 1);
    }
    
    @Test
    void testPsiStateObservationTriggers() {
        // Create a ψ-state with observation trigger
        PsiState psiState = new PsiState("ψ008", "⊙(Δt+3 @20,20 ⟶ BATTLE(HERO Arthur, HERO Ragnar))", "ℬ1");
        psiState.setGame(testGame);
        psiState.setTargetX(20);
        psiState.setTargetY(20);
        psiState.setDeltaT(3);
        psiState.setActionType("BATTLE");
        psiState.setOwnerHero("Arthur");
        psiState.setCollapseTrigger("Π(Ragnar enters @20,20 at Δt+3) ⇒ †ψ008");
        
        psiState = psiStateRepository.save(psiState);
        
        // Verify observation trigger was saved
        assertNotNull(psiState.getCollapseTrigger());
        assertTrue(psiState.getCollapseTrigger().contains("Π(Ragnar enters @20,20"));
        assertTrue(psiState.getCollapseTrigger().contains("†ψ008"));
        
        // Test retrieval by psiId
        Optional<PsiState> foundPsiState = psiStateRepository.findByPsiId("ψ008");
        assertTrue(foundPsiState.isPresent());
        assertEquals("BATTLE", foundPsiState.get().getActionType());
        assertEquals("Arthur", foundPsiState.get().getOwnerHero());
    }
    
    @Test
    void testPsiStateProbabilityCalculations() {
        // Create ψ-states with different probabilities
        PsiState highProbPsi = new PsiState("ψ009", "⊙(Δt+1 @25,25 ⟶ MOV(HERO, Arthur, @25,25))", "ℬ1");
        highProbPsi.setGame(testGame);
        highProbPsi.setProbability(0.9);
        highProbPsi.setTargetX(25);
        highProbPsi.setTargetY(25);
        highProbPsi.setDeltaT(1);
        highProbPsi.setActionType("MOV");
        highProbPsi.setOwnerHero("Arthur");
        
        PsiState lowProbPsi = new PsiState("ψ010", "⊙(Δt+1 @26,26 ⟶ CREATE(CREATURE, Goblin))", "ℬ1");
        lowProbPsi.setGame(testGame);
        lowProbPsi.setProbability(0.3);
        lowProbPsi.setTargetX(26);
        lowProbPsi.setTargetY(26);
        lowProbPsi.setDeltaT(1);
        lowProbPsi.setActionType("CREATE");
        lowProbPsi.setOwnerHero("Arthur");
        
        psiStateRepository.save(highProbPsi);
        psiStateRepository.save(lowProbPsi);
        
        // Test probability values
        Optional<PsiState> highProb = psiStateRepository.findByPsiId("ψ009");
        Optional<PsiState> lowProb = psiStateRepository.findByPsiId("ψ010");
        
        assertTrue(highProb.isPresent());
        assertTrue(lowProb.isPresent());
        
        assertEquals(0.9, highProb.get().getProbability());
        assertEquals(0.3, lowProb.get().getProbability());
        
        // Verify high probability state is more likely to succeed
        assertTrue(highProb.get().getProbability() > lowProb.get().getProbability());
    }
    
    @Test
    void testPsiStateComplexExpressions() {
        // Test complex temporal expressions
        PsiState complexPsi = new PsiState();
        complexPsi.setPsiId("ψ011");
        complexPsi.setExpression("⊙(Δt+3 @30,30 ⟶ BATTLE(HERO Arthur, CREATURE Dragon) ∧ USE(ITEM, AvantWorldBlade))");
        complexPsi.setBranchId("ℬ2");
        complexPsi.setGame(testGame);
        complexPsi.setTargetX(30);
        complexPsi.setTargetY(30);
        complexPsi.setDeltaT(3);
        complexPsi.setActionType("BATTLE");
        complexPsi.setOwnerHero("Arthur");
        complexPsi.setProbability(0.7);
        
        PsiState savedComplexPsi = psiStateRepository.save(complexPsi);
        
        // Verify complex expression was saved
        assertNotNull(savedComplexPsi.getExpression());
        assertTrue(savedComplexPsi.getExpression().contains("BATTLE"));
        assertTrue(savedComplexPsi.getExpression().contains("USE(ITEM, AvantWorldBlade)"));
        assertTrue(savedComplexPsi.getExpression().contains("∧"));
        
        // Test different branch
        assertEquals("ℬ2", savedComplexPsi.getBranchId());
        
        // Test finding by branch
        List<PsiState> branchB2States = psiStateRepository.findByBranchId("ℬ2");
        assertEquals(1, branchB2States.size());
        assertEquals("ψ011", branchB2States.get(0).getPsiId());
    }
} 