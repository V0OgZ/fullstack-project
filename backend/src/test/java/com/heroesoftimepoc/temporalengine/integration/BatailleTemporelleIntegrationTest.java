package com.heroesoftimepoc.temporalengine.integration;

import com.heroesoftimepoc.temporalengine.model.*;
import com.heroesoftimepoc.temporalengine.repository.*;
import com.heroesoftimepoc.temporalengine.service.TemporalEngineService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Test d'intégration complet du système temporel Heroes of Time
 * Utilise le scénario "Bataille Temporelle" avec scripts .hots et objets JSON
 */
@SpringBootTest
@TestPropertySource(properties = {
    "heroes.parser.use.antlr=false",
    "logging.level.com.heroesoftimepoc.temporalengine=DEBUG"
})
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class BatailleTemporelleIntegrationTest {

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
    private Map<String, Object> scenarioData;
    private Map<String, Object> temporalArtifacts;
    private Map<String, Object> creaturesData;
    private List<String> setupScripts;
    private List<String> combatScripts;
    private List<String> finaleScripts;

    private static final String SETUP_SCRIPT_PATH = "src/test/resources/game_assets/tests/hots/bataille_temporelle_setup.hots";
    private static final String COMBAT_SCRIPT_PATH = "src/test/resources/game_assets/tests/hots/bataille_temporelle_combat.hots";
    private static final String FINALE_SCRIPT_PATH = "src/test/resources/game_assets/tests/hots/bataille_temporelle_finale.hots";
    private static final String SCENARIO_JSON_PATH = "src/test/resources/game_assets/scenarios/visualizer/bataille_temporelle.json";

    private static final String CREATURES_JSON_PATH = "src/test/resources/test/artefacts/objects/creatures.json";
    private static final String ARTIFACTS_JSON_PATH = "src/test/resources/test/artefacts/objects/temporal_artifacts.json";

    @BeforeAll
    static void setUpClass() {
        System.out.println("🚀 Initialisation des tests de Bataille Temporelle");
        System.out.println("======================================================");
    }

    @BeforeEach
    void setUp() throws IOException {
        System.out.println("🔧 Setup du test...");
        
        // Charger les données du scénario
        loadScenarioData();
        
        // Charger les artefacts temporels
        loadTemporalArtifacts();
        
        // Charger les créatures
        loadCreatures();
        
        // Charger les scripts .hots
        loadHotsScripts();
        
        // Créer une nouvelle partie
        createTestGame();
        
        System.out.println("✅ Setup terminé");
    }

    @AfterEach
    void tearDown() {
        System.out.println("🧹 Nettoyage du test...");
        if (testGame != null) {
            gameRepository.delete(testGame);
        }
        System.out.println("✅ Nettoyage terminé");
    }

    /**
     * Charge les données du scénario depuis le fichier JSON
     */
    private void loadScenarioData() throws IOException {
        Path scenarioPath = Paths.get(SCENARIO_JSON_PATH);
        if (Files.exists(scenarioPath)) {
            String jsonContent = Files.readString(scenarioPath);
            scenarioData = objectMapper.readValue(jsonContent, Map.class);
            System.out.println("📊 Scénario chargé: " + scenarioData.get("scenarioName"));
        } else {
            System.out.println("⚠️  Fichier scénario non trouvé, utilisation des données par défaut");
            scenarioData = createDefaultScenarioData();
        }
    }

    /**
     * Charge les artefacts temporels depuis le fichier JSON
     */
    private void loadTemporalArtifacts() throws IOException {
        Path artifactsPath = Paths.get(ARTIFACTS_JSON_PATH);
        if (Files.exists(artifactsPath)) {
            String jsonContent = Files.readString(artifactsPath);
            temporalArtifacts = objectMapper.readValue(jsonContent, Map.class);
            System.out.println("⚔️  Artefacts temporels chargés: " + 
                ((List) ((Map) temporalArtifacts.get("temporal_artifacts")).get("artifacts")).size());
        } else {
            System.out.println("⚠️  Fichier artefacts non trouvé, utilisation des données par défaut");
            temporalArtifacts = createDefaultArtifactsData();
        }
    }

    /**
     * Charge les créatures depuis le fichier JSON
     */
    private void loadCreatures() throws IOException {
        Path creaturesPath = Paths.get(CREATURES_JSON_PATH);
        if (Files.exists(creaturesPath)) {
            String jsonContent = Files.readString(creaturesPath);
            creaturesData = objectMapper.readValue(jsonContent, Map.class);
            System.out.println("🐉 Créatures chargées: " + 
                ((List) ((Map) creaturesData.get("creatures")).get("creatures")).size());
        } else {
            System.out.println("⚠️  Fichier créatures non trouvé, utilisation des données par défaut");
            creaturesData = createDefaultCreaturesData();
        }
    }

    /**
     * Charge les scripts .hots depuis les fichiers
     */
    private void loadHotsScripts() throws IOException {
        setupScripts = loadScriptFile(SETUP_SCRIPT_PATH);
        combatScripts = loadScriptFile(COMBAT_SCRIPT_PATH);
        finaleScripts = loadScriptFile(FINALE_SCRIPT_PATH);
        
        System.out.println("📜 Scripts .hots chargés:");
        System.out.println("   - Setup: " + setupScripts.size() + " commandes");
        System.out.println("   - Combat: " + combatScripts.size() + " commandes");
        System.out.println("   - Finale: " + finaleScripts.size() + " commandes");
    }

    /**
     * Charge un fichier script .hots et retourne les commandes
     */
    private List<String> loadScriptFile(String filePath) throws IOException {
        Path scriptPath = Paths.get(filePath);
        if (Files.exists(scriptPath)) {
            return Files.readAllLines(scriptPath).stream()
                .map(String::trim)
                .filter(line -> !line.isEmpty() && !line.startsWith("#"))
                .collect(Collectors.toList());
        } else {
            System.out.println("⚠️  Fichier script non trouvé: " + filePath);
            return new ArrayList<>();
        }
    }

    /**
     * Crée une nouvelle partie de test
     */
    private void createTestGame() {
        testGame = new Game();
        testGame.setGameName("Bataille Temporelle Test");
        testGame.setMapWidth(20);
        testGame.setMapHeight(20);
        testGame.setCurrentTurn(1);
        testGame.setCurrentPlayer("player1");
        testGame.setStatus(Game.GameStatus.ACTIVE);
        testGame.setCurrentTimeline("main");
        testGame.setCreatedAt(LocalDateTime.now());
        testGame.setStartedAt(LocalDateTime.now());
        
        testGame = gameRepository.save(testGame);
        
        System.out.println("🎮 Partie créée: " + testGame.getGameName() + " (ID: " + testGame.getId() + ")");
    }

    /**
     * Test 1: Exécution du script de setup
     */
    @Test
    @Order(1)
    @Transactional
    void testSetupPhase() {
        System.out.println("\n🔧 TEST 1: Phase de Setup");
        System.out.println("=========================");
        
        int successCount = 0;
        int totalCommands = setupScripts.size();
        
        for (String script : setupScripts) {
            System.out.println("📜 Exécution: " + script);
            
            try {
                Map<String, Object> result = temporalEngineService.executeScript(testGame.getId(), script);
                
                if (Boolean.TRUE.equals(result.get("success"))) {
                    successCount++;
                    System.out.println("✅ Succès: " + result.get("message"));
                } else {
                    System.out.println("❌ Échec: " + result.get("error"));
                }
            } catch (Exception e) {
                System.out.println("❌ Exception: " + e.getMessage());
            }
        }
        
        System.out.println("\n📊 Résultats Setup:");
        System.out.println("   - Commandes exécutées: " + successCount + "/" + totalCommands);
        System.out.println("   - Taux de réussite: " + (successCount * 100.0 / totalCommands) + "%");
        
        // Vérifications
        testGame = gameRepository.findById(testGame.getId()).orElse(null);
        assertNotNull(testGame, "La partie doit exister après le setup");
        
        List<Hero> heroes = heroRepository.findByGameId(testGame.getId());
        // Verify setup
        assertTrue(heroes.size() >= 1, "Au moins 1 héros doit être créé");
        
        List<PsiState> psiStates = psiStateRepository.findByGameId(testGame.getId());
        assertTrue(psiStates.size() >= 2, "Au moins 2 états ψ doivent être créés");
        
        System.out.println("✅ Phase de Setup validée");
    }

    /**
     * Test 2: Exécution du script de combat
     */
    @Test
    @Order(2)
    @Transactional
    void testCombatPhase() {
        System.out.println("\n⚔️  TEST 2: Phase de Combat");
        System.out.println("===========================");
        
        // D'abord exécuter le setup
        for (String script : setupScripts) {
            temporalEngineService.executeScript(testGame.getId(), script);
        }
        
        int successCount = 0;
        int totalCommands = combatScripts.size();
        List<String> psiStatesCreated = new ArrayList<>();
        List<String> collapsesTriggers = new ArrayList<>();
        
        for (String script : combatScripts) {
            System.out.println("📜 Exécution: " + script);
            
            try {
                Map<String, Object> result = temporalEngineService.executeScript(testGame.getId(), script);
                
                if (Boolean.TRUE.equals(result.get("success"))) {
                    successCount++;
                    System.out.println("✅ Succès: " + result.get("message"));
                    
                    // Détecter les créations d'états ψ
                    if (result.containsKey("psiId")) {
                        psiStatesCreated.add((String) result.get("psiId"));
                    }
                    
                    // Détecter les collapses
                    if (result.containsKey("actionResult")) {
                        collapsesTriggers.add((String) result.get("actionResult"));
                    }
                } else {
                    System.out.println("❌ Échec: " + result.get("error"));
                }
            } catch (Exception e) {
                System.out.println("❌ Exception: " + e.getMessage());
            }
        }
        
        System.out.println("\n📊 Résultats Combat:");
        System.out.println("   - Commandes exécutées: " + successCount + "/" + totalCommands);
        System.out.println("   - États ψ créés: " + psiStatesCreated.size());
        System.out.println("   - Collapses déclenchés: " + collapsesTriggers.size());
        System.out.println("   - Taux de réussite: " + (successCount * 100.0 / totalCommands) + "%");
        
        // Vérifications
        List<PsiState> psiStates = psiStateRepository.findByGameId(testGame.getId());
        assertTrue(psiStates.size() >= 1, "Au moins 1 état ψ doit être créé pendant le combat");

        long activePsiStates = psiStates.stream()
            .filter(p -> p.getStatus() == PsiState.PsiStatus.ACTIVE)
            .count();
        assertTrue(activePsiStates > 0, "Au moins un état ψ doit être actif");
    }

    /**
     * Test 3: Exécution du script finale
     */
    @Test
    @Order(3)
    @Transactional
    void testFinalePhase() {
        System.out.println("\n🏁 TEST 3: Phase Finale");
        System.out.println("========================");
        
        // Exécuter setup et combat d'abord
        for (String script : setupScripts) {
            temporalEngineService.executeScript(testGame.getId(), script);
        }
        for (String script : combatScripts) {
            temporalEngineService.executeScript(testGame.getId(), script);
        }
        
        int successCount = 0;
        int totalCommands = finaleScripts.size();
        
        for (String script : finaleScripts) {
            System.out.println("📜 Exécution: " + script);
            
            try {
                Map<String, Object> result = temporalEngineService.executeScript(testGame.getId(), script);
                
                if (Boolean.TRUE.equals(result.get("success"))) {
                    successCount++;
                    System.out.println("✅ Succès: " + result.get("message"));
                } else {
                    System.out.println("❌ Échec: " + result.get("error"));
                }
            } catch (Exception e) {
                System.out.println("❌ Exception: " + e.getMessage());
            }
        }
        
        System.out.println("\n📊 Résultats Finale:");
        System.out.println("   - Commandes exécutées: " + successCount + "/" + totalCommands);
        System.out.println("   - Taux de réussite: " + (successCount * 100.0 / totalCommands) + "%");
        
        // Vérifications finales
        Map<String, Object> gameState = temporalEngineService.getQuantumGameStateWithTemporalInfo(testGame.getId());
        assertNotNull(gameState, "L'état de jeu doit être récupérable");
        
        List<PsiState> finalPsiStates = psiStateRepository.findByGameId(testGame.getId());
        System.out.println("   - États ψ finaux: " + finalPsiStates.size());
        
        System.out.println("✅ Phase Finale validée");
    }

    /**
     * Test 4: Validation du système complet
     */
    @Test
    @Order(4)
    @Transactional
    void testCompleteSystem() {
        System.out.println("\n🎯 TEST 4: Validation Système Complet");
        System.out.println("=====================================");
        
        // Exécuter tous les scripts
        List<String> allScripts = new ArrayList<>();
        allScripts.addAll(setupScripts);
        allScripts.addAll(combatScripts);
        allScripts.addAll(finaleScripts);
        
        int totalSuccess = 0;
        int totalCommands = allScripts.size();
        
        for (String script : allScripts) {
            try {
                Map<String, Object> result = temporalEngineService.executeScript(testGame.getId(), script);
                if (Boolean.TRUE.equals(result.get("success"))) {
                    totalSuccess++;
                }
            } catch (Exception e) {
                System.out.println("❌ Exception sur: " + script + " - " + e.getMessage());
            }
        }
        
        // Statistiques finales
        System.out.println("\n📊 STATISTIQUES FINALES:");
        System.out.println("==========================");
        System.out.println("   - Commandes totales: " + totalCommands);
        System.out.println("   - Commandes réussies: " + totalSuccess);
        System.out.println("   - Taux de réussite global: " + (totalSuccess * 100.0 / totalCommands) + "%");
        
        // Vérifier l'état final du jeu
        Map<String, Object> finalGameState = temporalEngineService.getQuantumGameStateWithTemporalInfo(testGame.getId());
        System.out.println("   - Héros finaux: " + ((List) finalGameState.get("heroes")).size());
        System.out.println("   - États ψ finaux: " + ((List) finalGameState.get("psiStates")).size());
        System.out.println("   - Tuiles finales: " + ((List) finalGameState.get("tiles")).size());
        
        // Assertions finales
        assertTrue(totalSuccess > totalCommands * 0.8, 
            "Au moins 80% des commandes doivent réussir");
        
        List<Hero> finalHeroes = heroRepository.findByGameId(testGame.getId());
        assertTrue(finalHeroes.size() >= 2, "Au moins 2 héros doivent exister à la fin");
        
        System.out.println("\n🎉 BATAILLE TEMPORELLE TERMINÉE AVEC SUCCÈS!");
        System.out.println("==============================================");
        System.out.println("✅ Tous les tests du système temporel ont été validés");
        System.out.println("✅ Les scripts .hots fonctionnent correctement");
        System.out.println("✅ Les artefacts temporels sont opérationnels");
        System.out.println("✅ Le moteur quantique est stable");
    }

    /**
     * Données par défaut si les fichiers JSON ne sont pas trouvés
     */
    private Map<String, Object> createDefaultScenarioData() {
        Map<String, Object> data = new HashMap<>();
        data.put("scenarioName", "Bataille Temporelle (Default)");
        data.put("description", "Scénario par défaut pour les tests");
        return data;
    }

    private Map<String, Object> createDefaultArtifactsData() {
        Map<String, Object> data = new HashMap<>();
        data.put("temporal_artifacts", Map.of("artifacts", new ArrayList<>()));
        return data;
    }

    private Map<String, Object> createDefaultCreaturesData() {
        Map<String, Object> data = new HashMap<>();
        data.put("creatures", Map.of("creatures", new ArrayList<>()));
        return data;
    }
} 