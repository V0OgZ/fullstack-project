package com.heroesoftimepoc.temporalengine;

import com.heroesoftimepoc.temporalengine.model.*;
import com.heroesoftimepoc.temporalengine.repository.*;
import com.heroesoftimepoc.temporalengine.service.ArtifactEffectExecutor;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

/**
 * Tests pour ArtifactEffectExecutor
 * Vérifie l'exécution des effets d'artefacts temporels et quantiques
 */
@ExtendWith(MockitoExtension.class)
class ArtifactEffectExecutorTest {

    @Mock
    private PsiStateRepository psiStateRepository;
    
    @Mock
    private HeroRepository heroRepository;
    
    @Mock
    private GameTileRepository gameTileRepository;
    
    @InjectMocks
    private ArtifactEffectExecutor artifactEffectExecutor;
    
    @Mock
    private Game testGame;
    
    @Mock 
    private Hero testHero;
    
    private List<PsiState> mockPsiStates;
    
    @BeforeEach
    void setUp() {
        // Créer des ψ-states de test avec amplitudes complexes
        mockPsiStates = Arrays.asList(
            createPsiState("ψ001", "(1.0+0.0i)", 10, 10),
            createPsiState("ψ002", "(0.7+0.7i)", 10, 10),
            createPsiState("ψ003", "(0.8+0.6i)", 12, 12),
            createPsiState("ψ100", "(0.9+0.4i)", 15, 15),
            createPsiState("ψ101", "(0.6+0.8i)", 15, 15),
            createPsiState("ψ102", "(0.8+0.6i)", 15, 15),
            createPsiState("ψ201", "(0.7+0.7i)", 20, 20)
        );
        
        // Configurer le mock game pour retourner nos ψ-states
        when(testGame.getActivePsiStates()).thenReturn(mockPsiStates);
        
        // Configurer le mock hero
        when(testHero.getId()).thenReturn(1L);
        when(testHero.getName()).thenReturn("Test Hero");
        when(testHero.getTemporalEnergy()).thenReturn(100);
        when(testHero.getPositionX()).thenReturn(10);
        when(testHero.getPositionY()).thenReturn(10);
    }
    
    private PsiState createPsiState(String psiId, String amplitude, int x, int y) {
        PsiState psi = new PsiState();
        psi.setPsiId(psiId);
        psi.setTargetX(x);
        psi.setTargetY(y);
        psi.enableComplexAmplitude();
        psi.setComplexAmplitude(0.6, 0.8); // Amplitude par défaut pour les tests
        psi.setStatus(PsiState.PsiStatus.ACTIVE);
        psi.setGame(testGame);
        return psi;
    }
    
    @Test
    void testQuantumMirror_Success() {
        // GIVEN: Un héros et des ψ-states avec amplitudes complexes
        assertNotNull(testHero);
        assertEquals(2, mockPsiStates.size());
        assertTrue(mockPsiStates.get(0).isUsingComplexAmplitude());
        assertTrue(mockPsiStates.get(1).isUsingComplexAmplitude());
        
        // WHEN: Utilisation du miroir quantique
        Map<String, Object> result = artifactEffectExecutor.executeArtifactEffect(
            "quantum_mirror", testHero, testGame);
        
        // THEN: L'effet s'exécute avec succès
        assertNotNull(result);
        assertTrue((Boolean) result.get("success"));
        assertTrue(result.get("message").toString().contains("Miroir Quantique"));
        
        // Vérifier que l'énergie temporelle a été consommée
        assertEquals(60, testHero.getTemporalEnergy()); // 100 - 40 = 60
        
        // Vérifier que les repositories ont été appelés
        verify(psiStateRepository, atLeast(2)).save(any(PsiState.class));
        verify(heroRepository, times(1)).save(testHero);
    }
    
    @Test
    void testAmplitudeManipulator_Success() {
        // GIVEN: Un héros et un ψ-state
        
        // WHEN: Utilisation du manipulateur d'amplitudes
        Map<String, Object> result = artifactEffectExecutor.executeArtifactEffect(
            "amplitude_manipulator", testHero, testGame);
        
        // THEN: L'effet s'exécute avec succès
        assertNotNull(result);
        assertTrue((Boolean) result.get("success"));
        assertTrue(result.get("message").toString().contains("Manipulateur d'Amplitudes"));
        
        // Vérifier la consommation d'énergie
        assertEquals(75, testHero.getTemporalEnergy()); // 100 - 25 = 75
        
        // Vérifier les sauvegardes
        verify(psiStateRepository, times(1)).save(any(PsiState.class));
        verify(heroRepository, times(1)).save(testHero);
    }
    
    @Test
    void testCoherenceDetector_Success() {
        // GIVEN: Deux ψ-states avec amplitudes complexes
        
        // WHEN: Utilisation du détecteur de cohérence  
        Map<String, Object> result = artifactEffectExecutor.executeArtifactEffect(
            "coherence_detector", testHero, testGame);
        
        // THEN: La mesure s'effectue avec succès
        assertNotNull(result);
        assertTrue((Boolean) result.get("success"));
        assertTrue(result.get("message").toString().contains("Détecteur de Cohérence"));
        
        // Vérifier qu'un facteur de cohérence a été calculé
        assertNotNull(result.get("coherence_factor"));
        assertTrue(result.get("coherence_factor") instanceof Double);
        
        // Vérifier la consommation d'énergie minimale
        assertEquals(85, testHero.getTemporalEnergy()); // 100 - 15 = 85
    }
    
    @Test
    void testTemporalSword_Success() {
        // GIVEN: Un héros
        int initialInventorySize = testHero.getInventory().size();
        
        // WHEN: Utilisation de l'épée temporelle
        Map<String, Object> result = artifactEffectExecutor.executeArtifactEffect(
            "temporal_sword", testHero, testGame);
        
        // THEN: L'effet s'active avec succès
        assertNotNull(result);
        assertTrue((Boolean) result.get("success"));
        assertTrue(result.get("message").toString().contains("Épée Temporelle"));
        
        // Vérifier que des bonus ont été ajoutés à l'inventaire
        assertTrue(testHero.getInventory().size() > initialInventorySize);
        
        // Vérifier la consommation d'énergie
        assertEquals(70, testHero.getTemporalEnergy()); // 100 - 30 = 70
    }
    
    @Test
    void testGenericArtifact_Fallback() {
        // GIVEN: Un héros et un artefact inconnu
        int initialEnergy = testHero.getTemporalEnergy();
        
        // WHEN: Utilisation d'un artefact non spécifié
        Map<String, Object> result = artifactEffectExecutor.executeArtifactEffect(
            "unknown_mysterious_artifact", testHero, testGame);
        
        // THEN: L'effet générique s'active
        assertNotNull(result);
        assertTrue((Boolean) result.get("success"));
        assertTrue(result.get("message").toString().contains("Artefact unknown_mysterious_artifact"));
        
        // Vérifier le bonus d'énergie générique
        assertEquals(initialEnergy + 10, testHero.getTemporalEnergy());
        assertTrue(result.get("details").toString().contains("+10 énergie temporelle"));
    }
    
    @Test
    void testArtifactEffect_NullHero() {
        // GIVEN: Aucun héros
        
        // WHEN: Tentative d'utiliser un artefact sans héros
        Map<String, Object> result = artifactEffectExecutor.executeArtifactEffect(
            "quantum_mirror", null, testGame);
        
        // THEN: Erreur retournée
        assertNotNull(result);
        assertFalse((Boolean) result.get("success"));
        assertEquals("Héros introuvable", result.get("error"));
    }
    
    @Test
    void testArtifactEffect_NullGame() {
        // GIVEN: Aucun jeu
        
        // WHEN: Tentative d'utiliser un artefact sans jeu
        Map<String, Object> result = artifactEffectExecutor.executeArtifactEffect(
            "quantum_mirror", testHero, null);
        
        // THEN: Erreur retournée
        assertNotNull(result);
        assertFalse((Boolean) result.get("success"));
        assertEquals("Jeu introuvable", result.get("error"));
    }
    
    @Test
    void testQuantumMirror_InsufficientPsiStates() {
        // GIVEN: Un seul ψ-state (insuffisant pour l'interférence)
        when(testGame.getActivePsiStates()).thenReturn(Arrays.asList(mockPsiStates.get(0)));
        
        // WHEN: Tentative d'utiliser le miroir quantique
        Map<String, Object> result = artifactEffectExecutor.executeArtifactEffect(
            "quantum_mirror", testHero, testGame);
        
        // THEN: Erreur d'états insuffisants
        assertNotNull(result);
        assertFalse((Boolean) result.get("success"));
        assertTrue(result.get("error").toString().contains("Pas assez d'états quantiques"));
    }
    
    @Test
    void testAllQuantumArtifacts_MethodsExist() {
        // GIVEN: Liste des artefacts quantiques
        String[] quantumArtifacts = {
            "quantum_mirror", "amplitude_manipulator", 
            "coherence_detector", "phase_shifter"
        };
        
        // WHEN/THEN: Tous les artefacts quantiques doivent avoir une méthode
        for (String artifact : quantumArtifacts) {
            Map<String, Object> result = artifactEffectExecutor.executeArtifactEffect(
                artifact, testHero, testGame);
            
            assertNotNull(result, "Artefact " + artifact + " devrait retourner un résultat");
            assertTrue(result.containsKey("success"), 
                "Résultat pour " + artifact + " devrait contenir 'success'");
        }
    }
    
    @Test  
    void testAllTemporalArtifacts_MethodsExist() {
        // GIVEN: Liste des artefacts temporels
        String[] temporalArtifacts = {
            "temporal_sword", "chrono_staff", "time_anchor"
        };
        
        // WHEN/THEN: Tous les artefacts temporels doivent avoir une méthode
        for (String artifact : temporalArtifacts) {
            Map<String, Object> result = artifactEffectExecutor.executeArtifactEffect(
                artifact, testHero, testGame);
            
            assertNotNull(result, "Artefact " + artifact + " devrait retourner un résultat");
            assertTrue((Boolean) result.get("success"), 
                "Artefact " + artifact + " devrait s'exécuter avec succès");
        }
    }
    
    @Test
    void testAllLegendaryArtifacts_MethodsExist() {
        // GIVEN: Liste des artefacts légendaires
        String[] legendaryArtifacts = {
            "avant_world_blade", "reverse_clock", "wigner_eye"
        };
        
        // WHEN/THEN: Tous les artefacts légendaires doivent avoir une méthode
        for (String artifact : legendaryArtifacts) {
            Map<String, Object> result = artifactEffectExecutor.executeArtifactEffect(
                artifact, testHero, testGame);
            
            assertNotNull(result, "Artefact " + artifact + " devrait retourner un résultat");
            assertTrue((Boolean) result.get("success"), 
                "Artefact " + artifact + " devrait s'exécuter avec succès");
        }
    }
} 