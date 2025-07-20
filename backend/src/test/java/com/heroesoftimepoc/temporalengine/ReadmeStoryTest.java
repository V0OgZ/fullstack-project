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
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Test de l'histoire du README - L'Œil de Wigner
 * Vérifie que l'histoire épique racontée dans le README est bien implémentée
 */
@SpringBootTest
@ActiveProfiles("test")
@Transactional
public class ReadmeStoryTest {
    
    @Autowired
    private GameRepository gameRepository;
    
    @Autowired
    private TemporalEngineService temporalEngine;
    
    private Game epicGame;
    
    @BeforeEach
    public void setUp() {
        // Créer la partie épique
        epicGame = new Game();
        epicGame.setGameName("La Rencontre Épique - Œil de Wigner");
        epicGame.setPlayers(java.util.Arrays.asList("Arthur", "Ennemi"));
        epicGame.setStatus(Game.GameStatus.ACTIVE);
        epicGame.setMapWidth(50);
        epicGame.setMapHeight(50);
        epicGame = gameRepository.save(epicGame);
    }
    
    @Test
    public void testActeI_MiseEnScene() {
        // "L'Œil de Wigner scintille au sommet de la tour en ruines"
        
        // Créer Arthur et Lysandrel
        Map<String, Object> result = temporalEngine.executeScript(epicGame.getId(), "HERO(Arthur)");
        assertTrue((Boolean) result.get("success"));
        
        result = temporalEngine.executeScript(epicGame.getId(), "HERO(Lysandrel)");
        assertTrue((Boolean) result.get("success"));
        
        // "Arthur s'approche prudemment"
        result = temporalEngine.executeScript(epicGame.getId(), "MOV(Arthur, @25,30)");
        assertTrue((Boolean) result.get("success"));
        
        // "Lysandrel crie depuis la vallée"
        result = temporalEngine.executeScript(epicGame.getId(), "MOV(Lysandrel, @25,10)");
        assertTrue((Boolean) result.get("success"));
        
        // Créer l'Œil de Wigner au sommet de la tour
        result = temporalEngine.executeScript(epicGame.getId(), "CREATE(ARTIFACT, wigner_eye, @25,35)");
        assertTrue((Boolean) result.get("success"));
        
        // Vérifier les positions
        epicGame = gameRepository.findById(epicGame.getId()).orElseThrow();
        Hero arthur = epicGame.getHeroByName("Arthur");
        Hero lysandrel = epicGame.getHeroByName("Lysandrel");
        
        assertEquals(25, arthur.getPositionX());
        assertEquals(30, arthur.getPositionY());
        assertEquals(25, lysandrel.getPositionX());
        assertEquals(10, lysandrel.getPositionY());
    }
    
    @Test
    public void testActeII_ArmeeEnnemie() {
        // "Mais Arthur voit l'armée ennemie approcher"
        
        // Setup héros
        temporalEngine.executeScript(epicGame.getId(), "HERO(Arthur)");
        temporalEngine.executeScript(epicGame.getId(), "HERO(Lysandrel)");
        
        // Créer l'armée ennemie
        temporalEngine.executeScript(epicGame.getId(), "HERO(Ragnar)");
        temporalEngine.executeScript(epicGame.getId(), "HERO(EnemySoldier1)");
        temporalEngine.executeScript(epicGame.getId(), "HERO(EnemySoldier2)");
        temporalEngine.executeScript(epicGame.getId(), "HERO(EnemySoldier3)");
        
        // Positionner l'armée
        temporalEngine.executeScript(epicGame.getId(), "MOV(Ragnar, @20,5)");
        temporalEngine.executeScript(epicGame.getId(), "MOV(EnemySoldier1, @21,6)");
        temporalEngine.executeScript(epicGame.getId(), "MOV(EnemySoldier2, @22,7)");
        temporalEngine.executeScript(epicGame.getId(), "MOV(EnemySoldier3, @23,8)");
        
        // Vérifier qu'on a bien 6 héros (2 alliés + 4 ennemis)
        epicGame = gameRepository.findById(epicGame.getId()).orElseThrow();
        assertEquals(6, epicGame.getHeroes().size());
        
        // Vérifier que l'armée ennemie est bien positionnée
        Hero ragnar = epicGame.getHeroByName("Ragnar");
        assertNotNull(ragnar);
        assertEquals(20, ragnar.getPositionX());
        assertEquals(5, ragnar.getPositionY());
    }
    
    @Test
    public void testActeIII_OptionsQuantiques() {
        // "Arthur contemple ses actions futures en superposition"
        
        temporalEngine.executeScript(epicGame.getId(), "HERO(Arthur)");
        
        // Option 1: Saisir l'Œil (haute probabilité)
        Map<String, Object> result = temporalEngine.executeScript(epicGame.getId(), 
            "ψ001: (0.8+0.2i) ⊙(Δt+2 @25,35 ⟶ USE(ARTIFACT, wigner_eye, HERO:Arthur))");
        assertTrue((Boolean) result.get("success"));
        
        // Option 2: Combattre (probabilité moyenne)
        result = temporalEngine.executeScript(epicGame.getId(), 
            "ψ002: (0.6+0.4i) ⊙(Δt+3 @22,8 ⟶ BATTLE(Arthur, Ragnar))");
        assertTrue((Boolean) result.get("success"));
        
        // Option 3: Sort de protection (probabilité moyenne)
        result = temporalEngine.executeScript(epicGame.getId(), 
            "ψ003: (0.7+0.3i) ⊙(Δt+1 @25,15 ⟶ CAST(SPELL, temporal_shield, HERO:Lysandrel))");
        assertTrue((Boolean) result.get("success"));
        
        // Vérifier qu'on a bien 3 états quantiques
        epicGame = gameRepository.findById(epicGame.getId()).orElseThrow();
        List<PsiState> activeStates = epicGame.getActivePsiStates();
        assertEquals(3, activeStates.size());
        
        // Vérifier les probabilités
        PsiState psi001 = activeStates.stream()
            .filter(psi -> psi.getPsiId().equals("ψ001"))
            .findFirst().orElseThrow();
        
        assertTrue(psi001.isUsingComplexAmplitude());
        assertEquals(0.8, psi001.getComplexAmplitude().getRealPart(), 0.01);
        assertEquals(0.2, psi001.getComplexAmplitude().getImaginaryPart(), 0.01);
        
        // |0.8+0.2i|² = 0.64 + 0.04 = 0.68
        assertEquals(0.68, psi001.getComplexAmplitude().getProbability(), 0.01);
    }
    
    @Test
    public void testActeIV_DecisionFatidique() {
        // "Il n'a qu'un choix : saisir l'Œil et forcer le collapse causal"
        
        // Setup complet
        temporalEngine.executeScript(epicGame.getId(), "HERO(Arthur)");
        temporalEngine.executeScript(epicGame.getId(), "MOV(Arthur, @25,30)");
        
        // Arthur se déplace vers l'Œil
        Map<String, Object> result = temporalEngine.executeScript(epicGame.getId(), "MOV(Arthur, @25,35)");
        assertTrue((Boolean) result.get("success"));
        
        // Arthur prend l'Œil de Wigner
        result = temporalEngine.executeScript(epicGame.getId(), "CREATE(ARTIFACT, wigner_eye, HERO:Arthur)");
        assertTrue((Boolean) result.get("success"));
        
        // Vérifier qu'Arthur possède l'Œil
        epicGame = gameRepository.findById(epicGame.getId()).orElseThrow();
        Hero arthur = epicGame.getHeroByName("Arthur");
        assertTrue(arthur.hasItem("wigner_eye"));
        assertEquals(25, arthur.getPositionX());
        assertEquals(35, arthur.getPositionY());
    }
    
    @Test
    public void testActeV_CollapseCausal() {
        // "💥 ARTHUR FORCE LE COLLAPSE CAUSAL ! 💥"
        
        // Setup avec états quantiques
        temporalEngine.executeScript(epicGame.getId(), "HERO(Arthur)");
        temporalEngine.executeScript(epicGame.getId(), 
            "ψ001: (0.8+0.2i) ⊙(Δt+2 @25,35 ⟶ USE(ARTIFACT, wigner_eye, HERO:Arthur))");
        temporalEngine.executeScript(epicGame.getId(), 
            "ψ002: (0.6+0.4i) ⊙(Δt+3 @22,8 ⟶ BATTLE(Arthur, Ragnar))");
        
        // Vérifier qu'on a des états actifs
        epicGame = gameRepository.findById(epicGame.getId()).orElseThrow();
        assertEquals(2, epicGame.getActivePsiStates().size());
        
        // Forcer le collapse avec le symbole †
        Map<String, Object> result = temporalEngine.executeScript(epicGame.getId(), "†ψ001");
        assertTrue((Boolean) result.get("success"));
        
        result = temporalEngine.executeScript(epicGame.getId(), "†ψ002");
        assertTrue((Boolean) result.get("success"));
        
        // Vérifier que les états sont effondrés
        epicGame = gameRepository.findById(epicGame.getId()).orElseThrow();
        List<PsiState> collapsedStates = epicGame.getPsiStates().stream()
            .filter(psi -> psi.getStatus() == PsiState.PsiStatus.COLLAPSED)
            .toList();
        
        assertEquals(2, collapsedStates.size());
        assertEquals(0, epicGame.getActivePsiStates().size());
    }
    
    @Test
    public void testMecaniquesCompletes() {
        // Test complet de toutes les mécaniques mentionnées dans le README
        
        // "📜 Advanced Script Language"
        // Unicode Symbols: ψ, †, ⊙
        Map<String, Object> result = temporalEngine.executeScript(epicGame.getId(), 
            "ψTEST: (0.5+0.5i) ⊙(Δt+1 @10,10 ⟶ CREATE(ITEM, test, @10,10))");
        assertTrue((Boolean) result.get("success"));
        
        result = temporalEngine.executeScript(epicGame.getId(), "†ψTEST");
        assertTrue((Boolean) result.get("success"));
        
        // "5D Coordinates: Navigate space (x,y,z) and time (timeline, temporal layer)"
        epicGame = gameRepository.findById(epicGame.getId()).orElseThrow();
        PsiState testState = epicGame.getPsiStates().stream()
            .filter(psi -> psi.getPsiId().equals("ψTEST"))
            .findFirst().orElseThrow();
        
        // Vérifier les coordonnées spatiales
        assertEquals(10, testState.getTargetX());
        assertEquals(10, testState.getTargetY());
        
        // Vérifier la couche temporelle (Δt)
        assertEquals(1, testState.getDeltaT());
        
        // "Probability System: Actions have success chances"
        assertTrue(testState.isUsingComplexAmplitude());
        double probability = testState.getComplexAmplitude().getProbability();
        assertTrue(probability > 0 && probability <= 1);
    }
    
    @Test
    public void testDeviseDuJeu() {
        // "Maîtrisez le temps, dominez l'espace, conquérez l'éternité"
        
        // MAÎTRISER LE TEMPS - Créer des actions futures
        temporalEngine.executeScript(epicGame.getId(), "HERO(Arthur)");
        Map<String, Object> result = temporalEngine.executeScript(epicGame.getId(), 
            "ψFUTUR: (0.9+0.1i) ⊙(Δt+5 @40,40 ⟶ MOV(Arthur, @40,40))");
        assertTrue((Boolean) result.get("success"));
        
        // DOMINER L'ESPACE - Se déplacer librement
        result = temporalEngine.executeScript(epicGame.getId(), "MOV(Arthur, @10,10)");
        assertTrue((Boolean) result.get("success"));
        
        result = temporalEngine.executeScript(epicGame.getId(), "MOV(Arthur, @45,45)");
        assertTrue((Boolean) result.get("success"));
        
        // CONQUÉRIR L'ÉTERNITÉ - Manipuler les états quantiques
        result = temporalEngine.executeScript(epicGame.getId(), "†ψFUTUR");
        assertTrue((Boolean) result.get("success"));
        
        epicGame = gameRepository.findById(epicGame.getId()).orElseThrow();
        
        // Arthur a voyagé dans l'espace
        Hero arthur = epicGame.getHeroByName("Arthur");
        assertNotNull(arthur);
        
        // Les états quantiques ont été manipulés
        assertTrue(epicGame.getPsiStates().size() > 0);
        
        // Le temps a été maîtrisé (états avec Δt)
        boolean hasTemporalStates = epicGame.getPsiStates().stream()
            .anyMatch(psi -> psi.getDeltaT() != null && psi.getDeltaT() > 0);
        assertTrue(hasTemporalStates);
    }
} 