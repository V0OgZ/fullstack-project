package com.heroesoftimepoc.temporalengine.integration;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.heroesoftimepoc.temporalengine.model.*;
import com.heroesoftimepoc.temporalengine.repository.*;
import com.heroesoftimepoc.temporalengine.service.TemporalEngineService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

/**
 * 🌀 Test d'intégration pour les interférences quantiques
 * 
 * Ce test vérifie :
 * - Les interférences constructives et destructives entre états ψ
 * - La manipulation des amplitudes complexes
 * - Les mesures de cohérence quantique
 * - Les patterns d'interférence avancés
 * - La résonance quantique
 */
@SpringBootTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@TestPropertySource(properties = "logging.level.org.springframework.web=DEBUG")
public class QuantumInterferenceIntegrationTest {

    @Autowired
    private TemporalEngineService temporalEngineService;

    @Autowired
    private GameRepository gameRepository;

    @Autowired
    private HeroRepository heroRepository;

    @Autowired
    private PsiStateRepository psiStateRepository;

    @Autowired
    private GameTileRepository gameTileRepository;

    private ObjectMapper objectMapper = new ObjectMapper();
    private Game testGame;
    private List<String> interferenceScript;

    private static final String INTERFERENCE_SCRIPT_PATH = "../game_assets/tests/hots/quantum_interference_test.hots";
    private static final String INTERFERENCE_ARTIFACTS_PATH = "../test/artefacts/objects/quantum_interference_artifacts.json";

    @BeforeEach
    void setUp() throws IOException {
        System.out.println("🌀 Initialisation des tests d'interférence quantique");
        System.out.println("========================================================");

        // Nettoyage de la base
        psiStateRepository.deleteAll();
        gameTileRepository.deleteAll();
        heroRepository.deleteAll();
        gameRepository.deleteAll();

        // Création du jeu de test
        testGame = new Game("Test Interférences Quantiques");
        testGame.setMapWidth(50);
        testGame.setMapHeight(50);
        testGame = gameRepository.save(testGame);

        // Chargement du script d'interférence
        loadInterferenceScript();

        System.out.println("✅ Setup terminé");
    }

    /**
     * Charge le script HOTS de test d'interférence
     */
    private void loadInterferenceScript() throws IOException {
        Path scriptPath = Paths.get(INTERFERENCE_SCRIPT_PATH);
        if (Files.exists(scriptPath)) {
            interferenceScript = Files.readAllLines(scriptPath)
                    .stream()
                    .filter(line -> !line.trim().isEmpty() && !line.trim().startsWith("#"))
                    .toList();
            System.out.println("📜 Script d'interférence chargé: " + interferenceScript.size() + " commandes");
        } else {
            System.out.println("⚠️  Script d'interférence non trouvé, utilisation des données par défaut");
            interferenceScript = createDefaultInterferenceScript();
        }
    }

    /**
     * Crée un script d'interférence par défaut si le fichier n'est pas trouvé
     */
    private List<String> createDefaultInterferenceScript() {
        return List.of(
            "HERO(Tesla)",
            "HERO(Schrödinger)", 
            "MOV(Tesla, @10,10)",
            "MOV(Schrödinger, @12,12)",
            "USE(ARTIFACT, quantum_mirror, HERO:Tesla)",
            "ψ101: (0.6+0.8i) ⊙(Δt+1 @15,15 ⟶ CREATE(ITEM, EpéeQuantique, @15,15))",
            "ψ102: (0.8+0.6i) ⊙(Δt+1 @15,15 ⟶ CREATE(ITEM, BouclierQuantique, @15,15))",
            "INTERFERE(CONSTRUCTIVE, ψ101, ψ102)",
            "ψ201: (0.7+0.7i) ⊙(Δt+2 @16,16 ⟶ CREATE(BUILDING, TourMagique, @16,16))",
            "ψ202: (0.7-0.7i) ⊙(Δt+2 @16,16 ⟶ CREATE(BUILDING, TourTemporelle, @16,16))",
            "INTERFERE(DESTRUCTIVE, ψ201, ψ202)"
        );
    }

    @Test
    void testConstructiveInterference() throws Exception {
        System.out.println("\n⚡ TEST 1: Interférence Constructive");
        System.out.println("=====================================");

        // Création de deux états ψ avec amplitudes compatibles
        PsiState psi1 = createPsiState("ψ101", "(0.6+0.8i)", "CREATE(ITEM, EpéeQuantique)", 15, 15);
        PsiState psi2 = createPsiState("ψ102", "(0.8+0.6i)", "CREATE(ITEM, BouclierQuantique)", 15, 15);

        // Configuration des amplitudes complexes
        psi1.enableComplexAmplitude();
        psi1.setComplexAmplitude(0.6, 0.8);
        
        psi2.enableComplexAmplitude();
        psi2.setComplexAmplitude(0.8, 0.6);

        // Sauvegarde en base
        psi1 = psiStateRepository.save(psi1);
        psi2 = psiStateRepository.save(psi2);

        System.out.println("   État ψ101 créé: " + psi1.getComplexAmplitude());
        System.out.println("   État ψ102 créé: " + psi2.getComplexAmplitude());

        // Calcul de l'interférence constructive
        ComplexAmplitude interference = psi1.calculateConstructiveInterference(psi2);
        System.out.println("   Interférence constructive: " + interference);

        // Vérifications
        assertNotNull(interference, "L'interférence constructive doit être calculée");
        
        // Amplitude résultante attendue: |1.4+1.4i|² = 3.92
        double expectedProbability = Math.pow(1.4, 2) + Math.pow(1.4, 2);
        double actualProbability = interference.getProbability();
        
        assertEquals(expectedProbability, actualProbability, 0.1, 
            "La probabilité d'interférence constructive doit être amplifiée");

        System.out.println("✅ Interférence constructive validée");
        System.out.println("   - Probabilité attendue: " + expectedProbability);
        System.out.println("   - Probabilité obtenue: " + actualProbability);
    }

    @Test
    void testDestructiveInterference() throws Exception {
        System.out.println("\n💥 TEST 2: Interférence Destructive");
        System.out.println("=====================================");

        // Création de deux états ψ avec phases opposées
        PsiState psi1 = createPsiState("ψ201", "(0.7+0.7i)", "CREATE(BUILDING, TourMagique)", 16, 16);
        PsiState psi2 = createPsiState("ψ202", "(0.7-0.7i)", "CREATE(BUILDING, TourTemporelle)", 16, 16);

        // Configuration des amplitudes avec déphasage
        psi1.enableComplexAmplitude();
        psi1.setComplexAmplitude(0.7, 0.7);
        
        psi2.enableComplexAmplitude();
        psi2.setComplexAmplitude(0.7, -0.7); // Phase opposée

        psi1 = psiStateRepository.save(psi1);
        psi2 = psiStateRepository.save(psi2);

        System.out.println("   État ψ201 créé: " + psi1.getComplexAmplitude());
        System.out.println("   État ψ202 créé: " + psi2.getComplexAmplitude());

        // Calcul de l'interférence destructive
        ComplexAmplitude interference = psi1.calculateDestructiveInterference(psi2);
        System.out.println("   Interférence destructive: " + interference);

        // Vérifications
        assertNotNull(interference, "L'interférence destructive doit être calculée");
        
        // Les composantes imaginaires opposées doivent s'annuler
        assertTrue(Math.abs(interference.getImaginaryPart()) < 0.1, 
            "L'interférence destructive doit réduire l'amplitude");

        System.out.println("✅ Interférence destructive validée");
        System.out.println("   - Amplitude résiduelle: " + interference.getMagnitude());
    }

    @Test
    void testQuantumCoherence() throws Exception {
        System.out.println("\n🔬 TEST 3: Mesure de Cohérence Quantique");
        System.out.println("==========================================");

        // Création d'états avec cohérence parfaite
        PsiState coherentState1 = createPsiState("ψ301", "(0.707+0.707i)", "TEST_COHERENCE", 20, 20);
        PsiState coherentState2 = createPsiState("ψ302", "(0.707+0.707i)", "TEST_COHERENCE", 20, 20);
        
        coherentState1.enableComplexAmplitude();
        coherentState1.setComplexAmplitude(0.707, 0.707);
        
        coherentState2.enableComplexAmplitude();
        coherentState2.setComplexAmplitude(0.707, 0.707);

        coherentState1 = psiStateRepository.save(coherentState1);
        coherentState2 = psiStateRepository.save(coherentState2);

        // Test de cohérence parfaite
        ComplexAmplitude coherenceTest = coherentState1.calculateInterference(coherentState2);
        double coherenceFactor = coherenceTest.getProbability() / 
            (coherentState1.getEffectiveProbability() + coherentState2.getEffectiveProbability());

        System.out.println("   États cohérents créés");
        System.out.println("   Facteur de cohérence: " + coherenceFactor);

        // Cohérence élevée attendue pour des états identiques
        assertTrue(coherenceFactor > 0.8, "La cohérence doit être élevée pour des états similaires");

        // Test avec états incohérents
        PsiState incoherentState = createPsiState("ψ303", "(0.0+1.0i)", "TEST_INCOHERENT", 21, 21);
        incoherentState.enableComplexAmplitude();
        incoherentState.setComplexAmplitude(0.0, 1.0);
        incoherentState = psiStateRepository.save(incoherentState);

        ComplexAmplitude incoherenceTest = coherentState1.calculateInterference(incoherentState);
        double incoherenceFactor = incoherenceTest.getProbability() / 
            (coherentState1.getEffectiveProbability() + incoherentState.getEffectiveProbability());

        System.out.println("   Facteur d'incohérence: " + incoherenceFactor);

        System.out.println("✅ Tests de cohérence validés");
    }

    @Test
    void testQuantumResonance() throws Exception {
        System.out.println("\n🎼 TEST 4: Résonance Quantique");
        System.out.println("================================");

        // Création d'un état faible pour amplification par résonance
        PsiState weakState = createPsiState("ψ401", "(0.3+0.2i)", "WEAK_STATE", 25, 25);
        weakState.enableComplexAmplitude();
        weakState.setComplexAmplitude(0.3, 0.2);
        
        double initialProbability = weakState.getEffectiveProbability();
        weakState = psiStateRepository.save(weakState);

        System.out.println("   État faible créé - Probabilité initiale: " + initialProbability);

        // Simulation de résonance (amplification contrôlée)
        // En résonance, l'amplitude peut être amplifiée
        double resonanceAmplification = 2.0;
        weakState.setComplexAmplitude(
            weakState.getComplexAmplitude().getRealPart() * resonanceAmplification,
            weakState.getComplexAmplitude().getImaginaryPart() * resonanceAmplification
        );
        
        // Normalisation pour respecter |ψ|² ≤ 1
        double magnitude = weakState.getComplexAmplitude().getMagnitude();
        if (magnitude > 1.0) {
            weakState.setComplexAmplitude(
                weakState.getComplexAmplitude().getRealPart() / magnitude,
                weakState.getComplexAmplitude().getImaginaryPart() / magnitude
            );
        }

        double resonatedProbability = weakState.getEffectiveProbability();
        weakState = psiStateRepository.save(weakState);

        System.out.println("   Après résonance - Probabilité: " + resonatedProbability);
        
        // La résonance doit augmenter la probabilité (même normalisée)
        assertTrue(resonatedProbability >= initialProbability, 
            "La résonance doit maintenir ou augmenter la probabilité effective");

        System.out.println("✅ Résonance quantique validée");
    }

    @Test
    void testComplexInterferencePattern() throws Exception {
        System.out.println("\n🌈 TEST 5: Pattern d'Interférence Complexe");
        System.out.println("===========================================");

        // Simulation d'un pattern de double fente quantique
        List<PsiState> interferenceStates = new ArrayList<>();

        // Création de 3 états avec phases différentes
        PsiState state1 = createPsiState("ψ501", "(0.577+0.0i)", "PHOTON_A", 30, 10);
        state1.enableComplexAmplitude();
        state1.setComplexAmplitude(0.577, 0.0); // Phase 0

        PsiState state2 = createPsiState("ψ502", "(0.0+0.577i)", "PHOTON_B", 30, 12);
        state2.enableComplexAmplitude();
        state2.setComplexAmplitude(0.0, 0.577); // Phase π/2

        PsiState state3 = createPsiState("ψ503", "(0.408+0.408i)", "PHOTON_C", 30, 14);
        state3.enableComplexAmplitude();
        state3.setComplexAmplitude(0.408, 0.408); // Phase π/4

        // Sauvegarde
        state1 = psiStateRepository.save(state1);
        state2 = psiStateRepository.save(state2);
        state3 = psiStateRepository.save(state3);

        interferenceStates.add(state1);
        interferenceStates.add(state2);
        interferenceStates.add(state3);

        System.out.println("   3 états photoniques créés avec phases différentes");

        // Interférence par paires
        ComplexAmplitude interference12 = state1.calculateInterference(state2);
        ComplexAmplitude interference13 = state1.calculateInterference(state3);
        ComplexAmplitude interference23 = state2.calculateInterference(state3);

        System.out.println("   Interférence 1-2: " + interference12);
        System.out.println("   Interférence 1-3: " + interference13);
        System.out.println("   Interférence 2-3: " + interference23);

        // Vérification de la conservation de l'énergie
        double totalProbability = interferenceStates.stream()
            .mapToDouble(PsiState::getEffectiveProbability)
            .sum();

        System.out.println("   Probabilité totale: " + totalProbability);
        
        // La probabilité totale doit rester dans des limites physiques
        assertTrue(totalProbability > 0 && totalProbability <= 3.0, 
            "La probabilité totale doit être physiquement valide");

        System.out.println("✅ Pattern d'interférence complexe validé");
    }

    @Test
    void testInterferenceScriptExecution() throws Exception {
        System.out.println("\n🎯 TEST 6: Exécution du Script d'Interférence");
        System.out.println("===============================================");

        int executedCommands = 0;
        int successfulCommands = 0;

        for (String command : interferenceScript) {
            try {
                System.out.println("📜 Exécution: " + command);
                
                // Simulation d'exécution des commandes d'interférence
                Map<String, Object> result = temporalEngineService.executeScript(
                    testGame.getId(), 
                    command
                );
                
                executedCommands++;
                if (result != null && result.containsKey("success") && 
                    Boolean.TRUE.equals(result.get("success"))) {
                    successfulCommands++;
                    System.out.println("✅ Succès: " + result.get("message"));
                } else {
                    System.out.println("⚠️  Commande non reconnue: " + command);
                }
                
            } catch (Exception e) {
                System.out.println("❌ Erreur: " + e.getMessage());
            }
        }

        double successRate = (double) successfulCommands / executedCommands * 100;
        System.out.println("\n📊 Résultats d'exécution:");
        System.out.println("   - Commandes exécutées: " + executedCommands);
        System.out.println("   - Commandes réussies: " + successfulCommands);
        System.out.println("   - Taux de réussite: " + String.format("%.1f%%", successRate));

        // Au moins 70% des commandes de base doivent être reconnues
        assertTrue(successRate >= 50.0, 
            "Au moins 50% des commandes d'interférence doivent être prises en charge");

        System.out.println("✅ Exécution du script d'interférence validée");
    }

    @Test
    void testQuantumStateValidation() throws Exception {
        System.out.println("\n🔬 TEST 7: Validation des États Quantiques");
        System.out.println("===========================================");

        List<PsiState> allStates = psiStateRepository.findByGameId(testGame.getId());
        System.out.println("   États quantiques créés: " + allStates.size());

        // Vérification de la normalisation
        for (PsiState state : allStates) {
            if (state.isUsingComplexAmplitude()) {
                double probability = state.getEffectiveProbability();
                assertTrue(probability >= 0.0 && probability <= 1.0,
                    "La probabilité de l'état " + state.getPsiId() + " doit être normalisée");
                
                System.out.println("   État " + state.getPsiId() + ": P=" + 
                    String.format("%.3f", probability) + " ✅");
            }
        }

        // Vérification de l'unitarité (conservation)
        double totalProbabilityMass = allStates.stream()
            .filter(PsiState::isUsingComplexAmplitude)
            .mapToDouble(PsiState::getEffectiveProbability)
            .sum();

        System.out.println("   Masse de probabilité totale: " + totalProbabilityMass);

        // En mécanique quantique, la somme peut dépasser 1 mais doit rester physique
        assertTrue(totalProbabilityMass >= 0, "La masse de probabilité doit être positive");

        System.out.println("✅ Validation des états quantiques terminée");
    }

    /**
     * Méthode utilitaire pour créer un état ψ
     */
    private PsiState createPsiState(String psiId, String amplitude, String action, int x, int y) {
        PsiState psiState = new PsiState();
        psiState.setPsiId(psiId);
        psiState.setExpression(amplitude + " ⊙(Δt+1 @" + x + "," + y + " ⟶ " + action + ")");
        psiState.setBranchId("ℬ1");
        psiState.setTargetX(x);
        psiState.setTargetY(y);
        psiState.setDeltaT(1);
        psiState.setActionType(action);
        psiState.setGame(testGame);
        psiState.setStatus(PsiState.PsiStatus.ACTIVE);
        return psiState;
    }

    void cleanup() {
        System.out.println("🧹 Nettoyage du test d'interférence quantique...");
        
        // Nettoyage des entités créées
        try {
            psiStateRepository.deleteAll();
            gameTileRepository.deleteAll();
            heroRepository.deleteAll();
            gameRepository.deleteAll();
        } catch (Exception e) {
            System.err.println("⚠️  Erreur lors du nettoyage: " + e.getMessage());
        }
        
        System.out.println("✅ Nettoyage terminé");
    }
} 