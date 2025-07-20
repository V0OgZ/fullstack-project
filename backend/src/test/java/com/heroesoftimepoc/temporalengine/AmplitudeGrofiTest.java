package com.heroesoftimepoc.temporalengine;

import com.heroesoftimepoc.temporalengine.model.*;
import com.heroesoftimepoc.temporalengine.model.Hero.HeroStatus;
import com.heroesoftimepoc.temporalengine.service.*;
import com.heroesoftimepoc.temporalengine.repository.*;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class AmplitudeGrofiTest {
    
    @InjectMocks
    private DynamicFormulaParser dynamicFormulaParser;
    
    @Mock
    private TemporalScriptParser temporalScriptParser;
    
    @Mock
    private PsiStateRepository psiStateRepository;
    
    @Mock
    private HeroRepository heroRepository;
    
    @Mock
    private GameTileRepository gameTileRepository;
    
    private Game testGame;
    private Hero testHero;
    
    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        
        // Créer un jeu de test
        testGame = new Game("Test GROFI");
        testGame.setId(1L);
        
        // Créer un héros de test
        testHero = new Hero("JeanGrofignon", 10, 10);
        testHero.setId(1L);
        testHero.setGame(testGame);
        testHero.setTemporalEnergy(100);
        testGame.addHero(testHero);
    }
    
    @Test
    public void testCreateAmplitude() {
        // Test CREATE_AMPLITUDE
        String formula = "CREATE_AMPLITUDE(0.8, 0.6)";
        
        Map<String, Object> result = dynamicFormulaParser.executeFormulaEffect(
            formula, testHero, testGame, 10
        );
        
        assertNotNull(result);
        assertTrue(result.containsKey("amplitude"));
        ComplexAmplitude amplitude = (ComplexAmplitude) result.get("amplitude");
        assertEquals(0.8, amplitude.getRealPart(), 0.001);
        assertEquals(0.6, amplitude.getImaginaryPart(), 0.001);
        assertEquals(1.0, amplitude.getProbability(), 0.001); // |0.8+0.6i|² = 1.0
    }
    
    @Test
    public void testAmplitudeFromFormula() {
        // Mock la méthode parseComplexAmplitude
        ComplexAmplitude expectedAmplitude = new ComplexAmplitude(0.707, 0.707);
        when(temporalScriptParser.parseComplexAmplitude("(0.707+0.707i)"))
            .thenReturn(expectedAmplitude);
        
        String formula = "AMPLITUDE_FROM_FORMULA(\"(0.707+0.707i)\")";
        
        Map<String, Object> result = dynamicFormulaParser.executeFormulaEffect(
            formula, testHero, testGame, 10
        );
        
        assertNotNull(result);
        assertTrue(result.containsKey("amplitude"));
        ComplexAmplitude amplitude = (ComplexAmplitude) result.get("amplitude");
        assertEquals(0.707, amplitude.getRealPart(), 0.001);
        assertEquals(0.707, amplitude.getImaginaryPart(), 0.001);
    }
    
    @Test
    public void testGrofiSigmaReduction() {
        // Créer des états ψ proches
        PsiState psi1 = new PsiState();
        psi1.setPsiId("ψ001");
        psi1.setComplexAmplitude(1.0, 0.0);
        psi1.setUseComplexAmplitude(true);
        psi1.setTargetX(11);
        psi1.setTargetY(11);
        psi1.setGame(testGame);
        
        List<PsiState> nearbyStates = Arrays.asList(psi1);
        
        // Mock pour retourner les états proches
        when(psiStateRepository.findAll()).thenReturn(nearbyStates);
        
        String formula = "Σ[REDUCE:0.2]";
        
        Map<String, Object> result = dynamicFormulaParser.executeFormulaEffect(
            formula, testHero, testGame, 15
        );
        
        assertNotNull(result);
        assertTrue(result.containsKey("statesReduced"));
        assertEquals(1, result.get("statesReduced"));
        
        // Vérifier que l'amplitude a été réduite
        verify(psiStateRepository, times(1)).save(any(PsiState.class));
    }
    
    @Test
    public void testGrofiDaggerResurrection() {
        // Mettre le héros "mort"
        testHero.setHealth(0);
        testHero.setStatus(HeroStatus.DEAD);
        
        String formula = "†[]";
        
        Map<String, Object> result = dynamicFormulaParser.executeFormulaEffect(
            formula, testHero, testGame, 30
        );
        
        assertNotNull(result);
        assertTrue(result.containsKey("message"));
        assertTrue(result.get("message").toString().contains("Renaissance quantique"));
        
        // Vérifier que le héros est ressuscité
        assertEquals(50, testHero.getHealth()); // 50% des HP max
        assertEquals(HeroStatus.ACTIVE, testHero.getStatus());
        
        verify(heroRepository, times(1)).save(testHero);
    }
    
    @Test
    public void testGrofiOmegaCollapse() {
        // Créer des états ψ actifs
        PsiState psi1 = new PsiState();
        psi1.setPsiId("ψ001");
        psi1.setStatus(PsiState.PsiStatus.ACTIVE);
        
        PsiState psi2 = new PsiState();
        psi2.setPsiId("ψ002");
        psi2.setStatus(PsiState.PsiStatus.ACTIVE);
        
        testGame.addPsiState(psi1);
        testGame.addPsiState(psi2);
        
        String formula = "Ω[]";
        
        Map<String, Object> result = dynamicFormulaParser.executeFormulaEffect(
            formula, testHero, testGame, 50
        );
        
        assertNotNull(result);
        assertTrue(result.containsKey("statesCollapsed"));
        assertEquals(2, result.get("statesCollapsed"));
        
        // Vérifier que les états sont effondrés
        assertEquals(PsiState.PsiStatus.COLLAPSED, psi1.getStatus());
        assertEquals(PsiState.PsiStatus.COLLAPSED, psi2.getStatus());
        
        verify(psiStateRepository, times(2)).save(any(PsiState.class));
    }
    
    @Test
    public void testGrofiChaos() {
        String formula = "↯[]";
        
        Map<String, Object> result = dynamicFormulaParser.executeFormulaEffect(
            formula, testHero, testGame, 25
        );
        
        assertNotNull(result);
        assertTrue(result.containsKey("chaosType"));
        assertTrue(result.containsKey("message"));
        
        // Le chaos a un effet aléatoire, on vérifie juste qu'il s'exécute
        int chaosType = (Integer) result.get("chaosType");
        assertTrue(chaosType >= 0 && chaosType < 4);
    }
    
    @Test
    public void testComplexFormula() {
        // Test d'une formule complexe combinant plusieurs opérations
        String formula = "CREATE_AMPLITUDE(0.8, 0.6) + Σ[REDUCE:0.1] + MODIFY_ENERGY(hero, 30)";
        
        Map<String, Object> result = dynamicFormulaParser.executeFormulaEffect(
            formula, testHero, testGame, 20
        );
        
        assertNotNull(result);
        
        // Vérifier que l'énergie a été modifiée (100 - 20 + 30 = 110)
        assertEquals(110, testHero.getTemporalEnergy());
        
        // Vérifier qu'une amplitude a été créée
        assertTrue(result.containsKey("amplitude") || result.containsKey("finalAmplitude"));
    }
    
    @Test
    public void testJeanUltimateWeapon() {
        // Test de l'arme ultime de Jean
        String formula = "Σ[REDUCE:0.3] + †[] + ↯[] + Ω[] + MODIFY_ENERGY(hero, 50)";
        
        // Le héros est vivant, donc † créera un état de mort/vie
        Map<String, Object> result = dynamicFormulaParser.executeFormulaEffect(
            formula, testHero, testGame, 100
        );
        
        assertNotNull(result);
        
        // Vérifier que l'énergie a été modifiée (100 - 100 + 50 = 50)
        assertEquals(50, testHero.getTemporalEnergy());
        
        // Vérifier qu'au moins une opération s'est exécutée
        assertTrue(result.containsKey("message") || result.containsKey("chaosType"));
    }
} 