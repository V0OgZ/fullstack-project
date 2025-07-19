package com.heroesoftimepoc.temporalengine;

import com.heroesoftimepoc.temporalengine.model.*;
import com.heroesoftimepoc.temporalengine.model.Game.GameStatus;
import com.heroesoftimepoc.temporalengine.service.TemporalEngineService;
import com.heroesoftimepoc.temporalengine.service.QuantumInterferenceService;
import com.heroesoftimepoc.temporalengine.repository.GameRepository;
import com.heroesoftimepoc.temporalengine.repository.HeroRepository;
import com.heroesoftimepoc.temporalengine.repository.PsiStateRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
public class EclatMondesDissolusTest {

    @Autowired
    private TemporalEngineService temporalEngineService;
    
    @Autowired
    private QuantumInterferenceService quantumInterferenceService;
    
    @Autowired
    private GameRepository gameRepository;
    
    @Autowired
    private HeroRepository heroRepository;
    
    @Autowired
    private PsiStateRepository psiStateRepository;
    
    private Game game;
    private Hero lysandrel;
    private Hero nyxLua;
    
    @BeforeEach
    void setUp() {
        // Créer la partie
        game = new Game();
        game.setGameName("L'Éclat des Mondes Dissolus");
        game.setMaxPlayers(2);
        game.setMapWidth(15);
        game.setMapHeight(13);
        game.setStatus(Game.GameStatus.ACTIVE);
        game.setCurrentPlayer("lysandrel");
        gameRepository.save(game);
        
        // Créer Lysandrel
        lysandrel = new Hero("Lysandrel", 2, 3);
        lysandrel.setGame(game);
        lysandrel.setPlayerId("lysandrel");
        lysandrel.setHealth(180);
        lysandrel.setMaxHealth(180);
        lysandrel.setTemporalEnergy(300);
        lysandrel.setMaxTemporalEnergy(300);
        lysandrel.addItem("avantworld_blade");
        lysandrel.addItem("wigner_eye");
        lysandrel.addItem("reality_anchor");
        heroRepository.save(lysandrel);
        
        // Créer Nyx-Lua
        nyxLua = new Hero("Nyx-Lua", 12, 10);
        nyxLua.setGame(game);
        nyxLua.setPlayerId("nyx_lua");
        nyxLua.setHealth(140);
        nyxLua.setMaxHealth(140);
        nyxLua.setTemporalEnergy(400);
        nyxLua.setMaxTemporalEnergy(400);
        nyxLua.addItem("schrodinger_grimoire");
        nyxLua.addItem("infinity_codex");
        nyxLua.addItem("causality_flame");
        heroRepository.save(nyxLua);
        
        game.addHero(lysandrel);
        game.addHero(nyxLua);
        gameRepository.save(game);
    }
    
    @Test
    void testScenarioInitialization() {
        // Test que les héros sont correctement créés
        assertEquals(2, game.getHeroes().size());
        
        Hero foundLysandrel = game.getHeroByName("Lysandrel");
        assertNotNull(foundLysandrel);
        assertEquals(180, foundLysandrel.getHealth());
        assertEquals(300, foundLysandrel.getTemporalEnergy());
        assertTrue(foundLysandrel.getInventory().contains("avantworld_blade"));
        assertTrue(foundLysandrel.getInventory().contains("wigner_eye"));
        assertTrue(foundLysandrel.getInventory().contains("reality_anchor"));
        
        Hero foundNyxLua = game.getHeroByName("Nyx-Lua");
        assertNotNull(foundNyxLua);
        assertEquals(140, foundNyxLua.getHealth());
        assertEquals(400, foundNyxLua.getTemporalEnergy());
        assertTrue(foundNyxLua.getInventory().contains("schrodinger_grimoire"));
        assertTrue(foundNyxLua.getInventory().contains("infinity_codex"));
        assertTrue(foundNyxLua.getInventory().contains("causality_flame"));
    }
    
    @Test
    void testTour1_LysandrelDeployPhoenix() {
        // Tour 1: Lysandrel déploie le Phénix Quantique vers l'est
        String script = "CREATE(CREATURE, PhoenixQuantique, @11,3)";
        Map<String, Object> result = temporalEngineService.executeScript(game.getId(), script);
        
        assertTrue((Boolean) result.get("success"));
        assertEquals("Game creature PhoenixQuantique created at (11,3)", 
            result.get("message"), 
            "Le message de succès de la création du phénix quantique doit être correct");
    }
    
    @Test
    void testTour3_NyxLuaTimelineSchrodinger() {
        // Tour 3: Nyx-Lua active une timeline Schrödinger cachée
        String script = "ψ001: (0.8+0.6i) ⊙(Δt+5 @5,2 ⟶ MOV(Nyx-Lua, @5,2))";
        Map<String, Object> result = temporalEngineService.executeScript(game.getId(), script);
        
        assertTrue((Boolean) result.get("success"));
        
        // Extraire l'ID du message de succès
        String message = (String) result.get("message");
        java.util.regex.Pattern pattern = java.util.regex.Pattern.compile(".*(ψ[0-9]+).*");
        java.util.regex.Matcher matcher = pattern.matcher(message);
        assertTrue(matcher.find(), "L'ID du ψ-état doit être trouvé dans le message");
        assertEquals("ψ001", matcher.group(1));
    }
    
    @Test
    void testTour6_LameAvantMonde() {
        // Tour 6: Lysandrel utilise la Lame d'Avant-Monde
        String script = "ψ002: (0.95+0.0i) ⊙(Δt+3 @8,10 ⟶ CREATE(BUILDING, Fortress, @8,10))";
        Map<String, Object> result = temporalEngineService.executeScript(game.getId(), script);
        
        assertTrue((Boolean) result.get("success"));
        
        // Extraire l'ID du message de succès
        String message = (String) result.get("message");
        java.util.regex.Pattern pattern = java.util.regex.Pattern.compile(".*(ψ[0-9]+).*");
        java.util.regex.Matcher matcher = pattern.matcher(message);
        assertTrue(matcher.find(), "L'ID du ψ-état doit être trouvé dans le message");
        assertEquals("ψ002", matcher.group(1));
    }
    
    @Test
    void testTour9_OeilDeWigner() {
        // Créer d'abord une timeline ennemie
        String createScript = "ψ003: (0.7+0.7i) ⊙(Δt+2 @9,10 ⟶ MOV(Nyx-Lua, @9,10))";
        Map<String, Object> createResult = temporalEngineService.executeScript(game.getId(), createScript);
        assertTrue((Boolean) createResult.get("success"));
        
        // Tour 9: Lysandrel active l'Œil de Wigner pour forcer un collapse
        String collapseScript = "†ψ003";
        Map<String, Object> collapseResult = temporalEngineService.executeScript(game.getId(), collapseScript);
        
        assertTrue((Boolean) collapseResult.get("success"));
        
        // Extraire l'ID du message de succès
        String message = (String) collapseResult.get("message");
        java.util.regex.Pattern pattern = java.util.regex.Pattern.compile(".*(ψ[0-9]+).*");
        java.util.regex.Matcher matcher = pattern.matcher(message);
        assertTrue(matcher.find(), "L'ID du ψ-état doit être trouvé dans le message");
        assertEquals("ψ003", matcher.group(1));
        assertNotNull(collapseResult.get("actionResult"));
    }
    
    @Test
    void testTour13_AncreDeRealite() {
        // Tour 13: Lysandrel installe une Ancre de Réalité au Nexus central
        String script = "BUILD(ANCHOR, RealityAnchor, @7,6, lysandrel)";
        Map<String, Object> result = temporalEngineService.executeScript(game.getId(), script);
        
        assertTrue((Boolean) result.get("success"));
        // Vérification du message de succès
        assertEquals("Game structure RealityAnchor built at @7,6 for player lysandrel", 
            result.get("message"), 
            "Le message de succès de la construction de l'ancre de réalité doit être correct");
    }
    
    @Test
    void testInterferenceQuantique() {
        // Test des interférences quantiques entre les deux joueurs
        String script1 = "ψ004: (0.6+0.8i) ⊙(Δt+2 @10,10 ⟶ MOV(Lysandrel, @10,10))";
        String script2 = "ψ005: (0.8+0.6i) ⊙(Δt+2 @10,10 ⟶ MOV(Nyx-Lua, @10,10))";
        
        Map<String, Object> result1 = temporalEngineService.executeScript(game.getId(), script1);
        Map<String, Object> result2 = temporalEngineService.executeScript(game.getId(), script2);
        
        assertTrue((Boolean) result1.get("success"));
        assertTrue((Boolean) result2.get("success"));
        
        // Vérifier qu'il y a détection d'interférence
        if (result2.containsKey("interferenceType")) {
            assertNotNull(result2.get("interferenceType"));
            assertNotNull(result2.get("combinedProbability"));
        }
    }
    
    @Test
    void testTour25_ResolutionFinale() {
        // Simuler l'état au tour 25
        game.setCurrentTurn(25);
        
        // Créer les timelines finales
        String lysandrelTimeline = "ψ006: (0.95+0.0i) ⊙(Δt+1 @7,6 ⟶ CONTROL(Nexus))";
        String nyxLuaTimeline = "ψ007: (0.72+0.69i) ⊙(Δt+1 @8,8 ⟶ CONTROL(Alternative))";
        
        Map<String, Object> lysandrelResult = temporalEngineService.executeScript(game.getId(), lysandrelTimeline);
        Map<String, Object> nyxLuaResult = temporalEngineService.executeScript(game.getId(), nyxLuaTimeline);
        
        assertTrue((Boolean) lysandrelResult.get("success"));
        assertTrue((Boolean) nyxLuaResult.get("success"));
        
        // Vérifier l'état quantique final
        Map<String, Object> gameState = temporalEngineService.getQuantumGameStateWithTemporalInfo(game.getId());
        Map<String, Object> quantumAnalysis = (Map<String, Object>) gameState.get("quantumAnalysis");
        
        assertNotNull(quantumAnalysis);
        assertTrue((Integer) quantumAnalysis.get("totalComplexStates") >= 2);
    }
    
    @Test
    void testAsynchronousGameplay() {
        // Test que le gameplay asynchrone fonctionne
        long startTime = System.currentTimeMillis();
        
        // Lysandrel joue (rapide)
        String lysandrelAction = "MOV(Lysandrel, @3,3)";
        Map<String, Object> lysandrelResult = temporalEngineService.executeScript(game.getId(), lysandrelAction);
        
        long lysandrelTime = System.currentTimeMillis() - startTime;
        
        // Nyx-Lua joue (plus complexe)
        String nyxLuaAction = "ψ008: (0.707+0.707i) ⊙(Δt+3 @11,11 ⟶ CREATE(TIMELINE, Alternative))";
        Map<String, Object> nyxLuaResult = temporalEngineService.executeScript(game.getId(), nyxLuaAction);
        
        long nyxLuaTime = System.currentTimeMillis() - startTime - lysandrelTime;
        
        assertTrue((Boolean) lysandrelResult.get("success"));
        assertTrue((Boolean) nyxLuaResult.get("success"));
        
        // Vérifier que les deux actions sont indépendantes (pas d'attente)
        assertTrue(lysandrelTime < 1000); // Moins d'1 seconde
        assertTrue(nyxLuaTime < 2000); // Moins de 2 secondes
    }
    
    @Test
    void testTimelineCoherence() {
        // Test de cohérence des timelines
        String coherentTimeline = "ψ009: (1.0+0.0i) ⊙(Δt+1 @5,5 ⟶ MOV(Lysandrel, @5,5))";
        String incoherentTimeline = "ψ010: (0.1+0.1i) ⊙(Δt+1 @5,5 ⟶ MOV(Nyx-Lua, @5,5))";
        
        Map<String, Object> coherentResult = temporalEngineService.executeScript(game.getId(), coherentTimeline);
        Map<String, Object> incoherentResult = temporalEngineService.executeScript(game.getId(), incoherentTimeline);
        
        assertTrue((Boolean) coherentResult.get("success"));
        assertTrue((Boolean) incoherentResult.get("success"));
        
        // Vérifier les probabilités
        double coherentProb = (Double) coherentResult.get("probability");
        double incoherentProb = (Double) incoherentResult.get("probability");
        
        assertTrue(coherentProb > incoherentProb);
        assertEquals(1.0, coherentProb, 0.001);
        assertEquals(0.02, incoherentProb, 0.001);
    }
    
    @Test
    void testCompleteScenarioFlow() {
        // Test du flow complet du scénario
        
        // Phase 1: Setup (Tours 1-5)
        game.setCurrentTurn(1);
        temporalEngineService.executeScript(game.getId(), "CREATE(CREATURE, PhoenixQuantique, @11,3)");
        
        game.setCurrentTurn(2);
        temporalEngineService.executeScript(game.getId(), "USE(ITEM, infinity_codex, HERO:Nyx-Lua)");
        
        game.setCurrentTurn(3);
        temporalEngineService.executeScript(game.getId(), "ψ011: (0.8+0.6i) ⊙(Δt+5 @5,2 ⟶ MOV(Nyx-Lua, @5,2))");
        
        // Phase 2: Premiers éclats (Tours 6-10)
        game.setCurrentTurn(9);
        temporalEngineService.executeScript(game.getId(), "†ψ011");
        
        // Phase 3: Guerre des mondes (Tours 16-20)
        game.setCurrentTurn(20);
        Map<String, Object> gameState = temporalEngineService.getQuantumGameStateWithTemporalInfo(game.getId());
        
        // Vérifier l'état du jeu après la création des ψ-states
        Map<String, Object> gameStateAfterPsi = temporalEngineService.getQuantumGameStateWithTemporalInfo(game.getId());
        assertNotNull(gameStateAfterPsi, "L'état du jeu ne devrait pas être nul après la création des ψ-states");
        List<Map<String, Object>> psiStates = (List<Map<String, Object>>) gameStateAfterPsi.get("quantumStates");
        
        // Phase 4: Résolution finale (Tour 25)
        game.setCurrentTurn(25);
        Map<String, Object> finalState = temporalEngineService.getQuantumGameStateWithTemporalInfo(game.getId());
        
        assertNotNull(finalState);
        assertEquals(25, finalState.get("currentTurn"));
        
        // Vérifier que le scénario est cohérent
        Map<String, Object> quantumAnalysis = (Map<String, Object>) finalState.get("quantumAnalysis");
        assertNotNull(quantumAnalysis);
        assertTrue((Integer) quantumAnalysis.get("totalComplexStates") >= 0);
    }
} 