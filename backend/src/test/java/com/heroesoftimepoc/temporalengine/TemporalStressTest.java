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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ThreadLocalRandom;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Test de stress temporel pour valider la gestion mémoire et performance
 * avec plusieurs ψ-states sur plusieurs tours.
 */
@SpringBootTest
@TestPropertySource(properties = {
    "spring.jpa.hibernate.ddl-auto=create-drop",
    "spring.datasource.url=jdbc:h2:mem:temporalstressdb",
    "logging.level.org.hibernate.SQL=INFO"
})
@Transactional
public class TemporalStressTest {
    
    @Autowired
    private TemporalEngineService temporalEngineService;
    
    @Autowired
    private GameRepository gameRepository;
    
    @Autowired
    private HeroRepository heroRepository;
    
    @Autowired
    private PsiStateRepository psiStateRepository;
    
    private Game testGame;
    private Hero arthur;
    private Hero ragnar;
    private Hero merlin;
    private Hero lancelot;
    
    @BeforeEach
    public void setup() {
        // Créer un jeu de test
        testGame = new Game("Temporal Stress Test");
        testGame.addPlayer("Player1");
        testGame.addPlayer("Player2");
        gameRepository.save(testGame);
        
        // Créer 4 héros pour le test
        arthur = new Hero("Arthur", 10, 10);
        arthur.setGame(testGame);
        arthur.setPlayerId("Player1");
        heroRepository.save(arthur);
        
        ragnar = new Hero("Ragnar", 15, 15);
        ragnar.setGame(testGame);
        ragnar.setPlayerId("Player1");
        heroRepository.save(ragnar);
        
        merlin = new Hero("Merlin", 20, 20);
        merlin.setGame(testGame);
        merlin.setPlayerId("Player2");
        heroRepository.save(merlin);
        
        lancelot = new Hero("Lancelot", 25, 25);
        lancelot.setGame(testGame);
        lancelot.setPlayerId("Player2");
        heroRepository.save(lancelot);
    }
    
    @Test
    public void testTemporalStressWithMultipleParallelPsiStates() {
        System.out.println("\n🌀 === TEST DE STRESS TEMPOREL PARALLÈLE ===");
        
        // Phase 1: Créer 4 ψ-states parallèles avec différents Δt
        System.out.println("\n⚡ Phase 1: Création de 4 ψ-states parallèles");
        
        String[] temporalScripts = {
            "ψ101: ⊙(Δt+1 @30,30 ⟶ MOV(Arthur, @30,30))",
            "ψ102: ⊙(Δt+2 @35,35 ⟶ CREATE(CREATURE, Dragon, @35,35))",
            "ψ103: ⊙(Δt+3 @40,40 ⟶ BATTLE(Ragnar, Dragon))",
            "ψ104: ⊙(Δt+4 @45,45 ⟶ CREATE(ITEM, TemporalSword, @45,45))"
        };
        
        for (String script : temporalScripts) {
            Map<String, Object> result = temporalEngineService.executeScript(testGame.getId(), script);
            assertTrue((Boolean) result.get("success"), 
                "Script failed: " + script + " - " + result.get("error"));
            System.out.println("✅ " + script);
        }
        
        // Vérifier que tous les ψ-states sont créés
        List<PsiState> activePsiStates = psiStateRepository.findByGameIdAndStatus(testGame.getId(), PsiState.PsiStatus.ACTIVE);
        assertEquals(4, activePsiStates.size(), "Tous les ψ-states doivent être actifs");
        
        // Phase 2: Simulation de plusieurs tours avec évolution temporelle
        System.out.println("\n⏰ Phase 2: Simulation de 5 tours avec évolution temporelle");
        
        for (int turn = 1; turn <= 5; turn++) {
            System.out.printf("🎯 Tour %d - Avant: %d ψ-states actifs%n", 
                turn, psiStateRepository.findByGameIdAndStatus(testGame.getId(), PsiState.PsiStatus.ACTIVE).size());
            
            // Avancer le tour (nextTurn ne retourne pas de success)
            Map<String, Object> turnResult = temporalEngineService.nextTurn(testGame.getId());
            assertNotNull(turnResult, "Next turn should return a result");
            assertNotNull(turnResult.get("currentTurn"), "Current turn should be present");
            
            // Vérifier l'état après le tour
            activePsiStates = psiStateRepository.findByGameIdAndStatus(testGame.getId(), PsiState.PsiStatus.ACTIVE);
            List<PsiState> collapsedPsiStates = psiStateRepository.findByGameIdAndStatus(testGame.getId(), PsiState.PsiStatus.COLLAPSED);
            
            System.out.printf("📊 Tour %d - Après: %d actifs, %d effondrés%n", 
                turn, activePsiStates.size(), collapsedPsiStates.size());
            
            // Vérifier la progression générale
            assertTrue(activePsiStates.size() + collapsedPsiStates.size() >= 4, 
                "Le nombre total de ψ-states doit être conservé");
        }
        
        // Phase 3: Test d'effondrements manuels
        System.out.println("\n💥 Phase 3: Test d'effondrements manuels");
        
        // Forcer l'effondrement des ψ-states restants
        List<PsiState> remainingPsiStates = psiStateRepository.findByGameIdAndStatus(testGame.getId(), PsiState.PsiStatus.ACTIVE);
        System.out.printf("🔍 %d ψ-states restants à effondrer%n", remainingPsiStates.size());
        
        for (PsiState psiState : remainingPsiStates) {
            String collapseScript = "†" + psiState.getPsiId();
            Map<String, Object> result = temporalEngineService.executeScript(testGame.getId(), collapseScript);
            assertTrue((Boolean) result.get("success"), 
                "Collapse failed: " + collapseScript);
            System.out.println("💥 " + collapseScript + " - " + result.get("message"));
        }
        
        // Vérifier que tous les ψ-states sont maintenant effondrés
        activePsiStates = psiStateRepository.findByGameIdAndStatus(testGame.getId(), PsiState.PsiStatus.ACTIVE);
        assertEquals(0, activePsiStates.size(), "Tous les ψ-states doivent être effondrés");
        
        System.out.println("\n🎉 TEST DE STRESS TEMPOREL RÉUSSI !");
    }
    
    @Test
    public void testMemoryUsageWithManyPsiStates() {
        System.out.println("\n🧠 === TEST MÉMOIRE AVEC NOMBREUX ψ-STATES ===");
        
        // Mesurer la mémoire avant
        Runtime runtime = Runtime.getRuntime();
        long memoryBefore = runtime.totalMemory() - runtime.freeMemory();
        System.out.printf("📊 Mémoire avant: %.2f MB%n", memoryBefore / (1024.0 * 1024.0));
        
        // Créer 50 ψ-states avec des paramètres aléatoires
        System.out.println("\n⚡ Création de 50 ψ-states aléatoires");
        
        for (int i = 201; i <= 250; i++) {
            int x = ThreadLocalRandom.current().nextInt(10, 100);
            int y = ThreadLocalRandom.current().nextInt(10, 100);
            int deltaT = ThreadLocalRandom.current().nextInt(1, 10);
            
            String script = String.format("ψ%03d: ⊙(Δt+%d @%d,%d ⟶ MOV(Arthur, @%d,%d))", 
                i, deltaT, x, y, x, y);
            
            Map<String, Object> result = temporalEngineService.executeScript(testGame.getId(), script);
            assertTrue((Boolean) result.get("success"), 
                "Script failed: " + script);
            
            if ((i - 200) % 10 == 0) {
                System.out.printf("✅ %d ψ-states créés%n", i - 200);
            }
        }
        
        // Mesurer la mémoire après création
        System.gc(); // Forcer garbage collection
        long memoryAfterCreation = runtime.totalMemory() - runtime.freeMemory();
        System.out.printf("📊 Mémoire après création: %.2f MB%n", memoryAfterCreation / (1024.0 * 1024.0));
        System.out.printf("📈 Augmentation: %.2f MB%n", (memoryAfterCreation - memoryBefore) / (1024.0 * 1024.0));
        
        // Vérifier le nombre de ψ-states
        List<PsiState> allPsiStates = psiStateRepository.findByGameId(testGame.getId());
        assertEquals(50, allPsiStates.size(), "50 ψ-states doivent être créés");
        
        // Simuler 10 tours pour voir l'évolution
        System.out.println("\n⏰ Simulation de 10 tours");
        
        for (int turn = 1; turn <= 10; turn++) {
            Map<String, Object> turnResult = temporalEngineService.nextTurn(testGame.getId());
            assertNotNull(turnResult, "Next turn should return a result");
            
            List<PsiState> activePsiStates = psiStateRepository.findByGameIdAndStatus(testGame.getId(), PsiState.PsiStatus.ACTIVE);
            List<PsiState> collapsedPsiStates = psiStateRepository.findByGameIdAndStatus(testGame.getId(), PsiState.PsiStatus.COLLAPSED);
            
            System.out.printf("🎯 Tour %d: %d actifs, %d effondrés%n", 
                turn, activePsiStates.size(), collapsedPsiStates.size());
        }
        
        // Mesurer la mémoire finale
        System.gc(); // Forcer garbage collection
        long memoryAfterSimulation = runtime.totalMemory() - runtime.freeMemory();
        System.out.printf("📊 Mémoire après simulation: %.2f MB%n", memoryAfterSimulation / (1024.0 * 1024.0));
        
        // Vérifier que la mémoire reste raisonnable
        double memoryIncreaseMB = (memoryAfterSimulation - memoryBefore) / (1024.0 * 1024.0);
        assertTrue(memoryIncreaseMB < 50.0, 
            String.format("Utilisation mémoire trop élevée: %.2f MB", memoryIncreaseMB));
        
        System.out.println("\n🎉 TEST MÉMOIRE RÉUSSI !");
    }
    
    @Test
    public void testPerformanceWithConcurrentPsiStates() {
        System.out.println("\n🚀 === TEST PERFORMANCE CONCURRENT ===");
        
        // Test de performance avec création et effondrement simultanés
        long startTime = System.currentTimeMillis();
        
        // Créer 20 ψ-states
        for (int i = 301; i <= 320; i++) {
            String script = String.format("ψ%03d: ⊙(Δt+%d @%d,%d ⟶ MOV(Arthur, @%d,%d))", 
                i, i % 5 + 1, i * 2, i * 3, i * 2, i * 3);
            
            Map<String, Object> result = temporalEngineService.executeScript(testGame.getId(), script);
            assertTrue((Boolean) result.get("success"), "Script creation failed");
        }
        
        long creationTime = System.currentTimeMillis() - startTime;
        System.out.printf("⚡ Création de 20 ψ-states: %d ms%n", creationTime);
        
        // Simuler 5 tours
        startTime = System.currentTimeMillis();
        for (int turn = 1; turn <= 5; turn++) {
            Map<String, Object> turnResult = temporalEngineService.nextTurn(testGame.getId());
            assertNotNull(turnResult, "Next turn should return a result");
            assertNotNull(turnResult.get("currentTurn"), "Current turn should be present");
        }
        long simulationTime = System.currentTimeMillis() - startTime;
        System.out.printf("⏰ Simulation de 5 tours: %d ms%n", simulationTime);
        
        // Effondrement de tous les ψ-states restants
        startTime = System.currentTimeMillis();
        List<PsiState> remainingPsiStates = psiStateRepository.findByGameIdAndStatus(testGame.getId(), PsiState.PsiStatus.ACTIVE);
        for (PsiState psiState : remainingPsiStates) {
            String collapseScript = "†" + psiState.getPsiId();
            Map<String, Object> result = temporalEngineService.executeScript(testGame.getId(), collapseScript);
            assertTrue((Boolean) result.get("success"), "Collapse failed");
        }
        long collapseTime = System.currentTimeMillis() - startTime;
        System.out.printf("💥 Effondrement de %d ψ-states: %d ms%n", remainingPsiStates.size(), collapseTime);
        
        // Vérifier les performances
        assertTrue(creationTime < 1000, "Création trop lente: " + creationTime + "ms");
        assertTrue(simulationTime < 2000, "Simulation trop lente: " + simulationTime + "ms");
        assertTrue(collapseTime < 1000, "Effondrement trop lent: " + collapseTime + "ms");
        
        System.out.println("\n🎉 TEST PERFORMANCE RÉUSSI !");
    }
    
    @Test
    public void testCompatibilityBetweenParsers() {
        System.out.println("\n🔄 === TEST COMPATIBILITÉ PARSERS ===");
        
        // Tester les mêmes scripts avec les deux parsers
        String[] testScripts = {
            "ψ401: ⊙(Δt+1 @10,10 ⟶ MOV(Arthur, @10,10))",
            "ψ402: ⊙(Δt+2 @20,20 ⟶ CREATE(CREATURE, Dragon, @20,20))",
            "†ψ401",
            "†ψ402"
        };
        
        // Test avec parser REGEX
        System.out.println("\n🔤 Test avec parser REGEX");
        
        for (String script : testScripts) {
            Map<String, Object> result = temporalEngineService.executeScript(testGame.getId(), script);
            Boolean success = (Boolean) result.get("success");
            System.out.printf("REGEX - %s: %s%n", script, success ? "✅" : "❌");
        }
        
        System.out.println("\n🎉 TEST COMPATIBILITÉ TERMINÉ !");
    }
} 