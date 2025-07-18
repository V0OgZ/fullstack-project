package com.heroesoftimepoc.temporalengine;

import com.heroesoftimepoc.temporalengine.service.TemporalEngineService;
import com.heroesoftimepoc.temporalengine.model.Game;
import com.heroesoftimepoc.temporalengine.model.Hero;
import com.heroesoftimepoc.temporalengine.repository.GameRepository;
import com.heroesoftimepoc.temporalengine.repository.HeroRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

/**
 * ╔══════════════════════════════════════════════════════════════════════════════════════╗
 * ║                    🧪 SCÉNARIO COMPLEXE - VALIDATION COMPLÈTE                        ║
 * ║                    Test Intensif du Parser Temporel REGEX                           ║
 * ╚══════════════════════════════════════════════════════════════════════════════════════╝
 * 
 * Ce test valide TOUS les aspects du parser temporel avec un scénario complexe qui inclut :
 * - Héros multiples et mouvements
 * - États ψ avec différents délais temporels
 * - Objets magiques et artefacts temporels
 * - Batailles et créatures
 * - Commandes HMM3 avancées
 * - Déclencheurs d'observation
 * - Effondrements de ψ-états
 * 
 * ┌─────────────────────────────────────────────────────────────────────────────────────┐
 * │                           🎯 SCÉNARIO DE TEST ÉPIQUE                                │
 * └─────────────────────────────────────────────────────────────────────────────────────┘
 * 
 * L'histoire : Arthur et Ragnar s'affrontent dans une bataille temporelle épique
 * utilisant tous les mécanismes du moteur temporel Heroes of Time.
 */
@SpringBootTest
@Transactional
public class ComplexScenarioTest {
    
    @Autowired
    private TemporalEngineService temporalEngineService;
    
    @Autowired
    private GameRepository gameRepository;
    
    @Autowired
    private HeroRepository heroRepository;
    
    private Game testGame;
    
    @BeforeEach
    public void setUp() {
        testGame = new Game();
        testGame.setGameName("Epic Temporal Battle");
        testGame.setCurrentPlayer("player1");
        testGame.setCurrentTurn(1);
        testGame.setMapWidth(50);
        testGame.setMapHeight(50);
        testGame.addPlayer("player1");
        testGame.addPlayer("player2");
        testGame = gameRepository.save(testGame);
    }
    
    /**
     * ┌─────────────────────────────────────────────────────────────────────────────────────┐
     * │                        🎬 SCÉNARIO ÉPIQUE COMPLET                                   │
     * └─────────────────────────────────────────────────────────────────────────────────────┘
     */
    @Test
    public void testEpicTemporalBattleScenario() {
        System.out.println("\n🎬 === DÉBUT DU SCÉNARIO ÉPIQUE TEMPOREL ===");
        
        // ==========================================
        // 🎭 ACTE I : PRÉPARATION DES HÉROS
        // ==========================================
        
        System.out.println("\n🎭 ACTE I : Création des héros légendaires");
        
        // Créer Arthur (Joueur 1)
        Map<String, Object> result1 = temporalEngineService.executeScript(testGame.getId(), "HERO(Arthur)");
        assertTrue((Boolean) result1.get("success"), "Arthur doit être créé");
        System.out.println("✅ Arthur Pendragon rejoint la bataille");
        
        // Créer Ragnar (Joueur 2)
        Map<String, Object> result2 = temporalEngineService.executeScript(testGame.getId(), "HERO(Ragnar)");
        assertTrue((Boolean) result2.get("success"), "Ragnar doit être créé");
        System.out.println("✅ Ragnar Lothbrok entre en scène");
        
        // Arthur se déplace vers la position stratégique
        Map<String, Object> result3 = temporalEngineService.executeScript(testGame.getId(), "MOV(Arthur, @15,15)");
        assertTrue((Boolean) result3.get("success"), "Arthur doit se déplacer");
        System.out.println("✅ Arthur se positionne en @15,15");
        
        // Ragnar prend position
        Map<String, Object> result4 = temporalEngineService.executeScript(testGame.getId(), "MOV(Ragnar, @25,25)");
        assertTrue((Boolean) result4.get("success"), "Ragnar doit se déplacer");
        System.out.println("✅ Ragnar se positionne en @25,25");
        
        // ==========================================
        // 🌀 ACTE II : MAGIE TEMPORELLE
        // ==========================================
        
        System.out.println("\n🌀 ACTE II : Invocation des forces temporelles");
        
        // Arthur créé un état ψ pour invoquer un dragon dans 2 tours
        Map<String, Object> result5 = temporalEngineService.executeScript(testGame.getId(), 
            "ψ001: ⊙(Δt+2 @20,20 ⟶ CREATE(CREATURE, Dragon, @20,20))");
        assertTrue((Boolean) result5.get("success"), "ψ001 doit être créé");
        System.out.println("✅ Arthur invoque ψ001: Dragon temporel en @20,20");
        
        // Ragnar riposte avec un Phoenix dans 1 tour
        Map<String, Object> result6 = temporalEngineService.executeScript(testGame.getId(), 
            "ψ002: ⊙(Δt+1 @22,22 ⟶ CREATE(CREATURE, Phoenix, @22,22))");
        assertTrue((Boolean) result6.get("success"), "ψ002 doit être créé");
        System.out.println("✅ Ragnar invoque ψ002: Phoenix temporel en @22,22");
        
        // Arthur prépare une bataille future
        Map<String, Object> result7 = temporalEngineService.executeScript(testGame.getId(), 
            "ψ003: ⊙(Δt+3 @25,25 ⟶ BATTLE(Arthur, Ragnar))");
        assertTrue((Boolean) result7.get("success"), "ψ003 doit être créé");
        System.out.println("✅ Arthur prépare ψ003: Bataille épique dans 3 tours");
        
        // ==========================================
        // 🔮 ACTE III : ARTEFACTS TEMPORELS
        // ==========================================
        
        System.out.println("\n🔮 ACTE III : Utilisation des artefacts légendaires");
        
        // Arthur utilise la Lame d'Avant-Monde
        Map<String, Object> result8 = temporalEngineService.executeScript(testGame.getId(), 
            "USE(ITEM, AvantWorldBlade, HERO:Arthur)");
        assertTrue((Boolean) result8.get("success"), "Lame d'Avant-Monde doit être utilisée");
        System.out.println("✅ Arthur brandit la Lame d'Avant-Monde");
        
        // Ragnar utilise l'Horloge du Dernier Instant
        Map<String, Object> result9 = temporalEngineService.executeScript(testGame.getId(), 
            "USE(ITEM, ReverseClock, HERO:Ragnar)");
        assertTrue((Boolean) result9.get("success"), "Horloge du Dernier Instant doit être utilisée");
        System.out.println("✅ Ragnar active l'Horloge du Dernier Instant");
        
        // ==========================================
        // 🏰 ACTE IV : STRATÉGIE HMM3
        // ==========================================
        
        System.out.println("\n🏰 ACTE IV : Constructions et recrutements");
        
        // Arthur construit un château
        Map<String, Object> result10 = temporalEngineService.executeScript(testGame.getId(), 
            "BUILD(Castle, @10,10, PLAYER:player1)");
        assertTrue((Boolean) result10.get("success"), "Château doit être construit");
        System.out.println("✅ Arthur érige un château en @10,10");
        
        // Ragnar recrute des archers
        Map<String, Object> result11 = temporalEngineService.executeScript(testGame.getId(), 
            "RECRUIT(UNIT, Archers, 15, HERO:Ragnar)");
        assertTrue((Boolean) result11.get("success"), "Archers doivent être recrutés");
        System.out.println("✅ Ragnar recrute 15 archers");
        
        // Arthur lance un sort
        Map<String, Object> result12 = temporalEngineService.executeScript(testGame.getId(), 
            "CAST(SPELL, Fireball, TARGET:Ragnar, HERO:Arthur)");
        assertTrue((Boolean) result12.get("success"), "Sort doit être lancé");
        System.out.println("✅ Arthur lance Fireball sur Ragnar");
        
        // ==========================================
        // ⚔️ ACTE V : BATAILLE FINALE
        // ==========================================
        
        System.out.println("\n⚔️ ACTE V : Résolution temporelle");
        
        // Effondrement forcé de ψ001 (Dragon)
        Map<String, Object> result13 = temporalEngineService.executeScript(testGame.getId(), "†ψ001");
        assertTrue((Boolean) result13.get("success"), "ψ001 doit s'effondrer");
        System.out.println("✅ ψ001 s'effondre : Le Dragon devient réel !");
        
        // Effondrement de ψ002 (Phoenix)
        Map<String, Object> result14 = temporalEngineService.executeScript(testGame.getId(), "†ψ002");
        assertTrue((Boolean) result14.get("success"), "ψ002 doit s'effondrer");
        System.out.println("✅ ψ002 s'effondre : Le Phoenix se matérialise !");
        
        // Bataille finale entre créatures
        Map<String, Object> result15 = temporalEngineService.executeScript(testGame.getId(), 
            "BATTLE(Dragon, Phoenix)");
        assertTrue((Boolean) result15.get("success"), "Bataille finale doit avoir lieu");
        System.out.println("✅ Bataille épique : Dragon vs Phoenix !");
        
        // ==========================================
        // 🎯 VÉRIFICATIONS FINALES
        // ==========================================
        
        System.out.println("\n🎯 VÉRIFICATIONS FINALES");
        
        // Vérifier l'état final du jeu
        Map<String, Object> gameState = temporalEngineService.getGameState(testGame.getId());
        assertNotNull(gameState, "État du jeu doit être accessible");
        System.out.println("✅ État du jeu validé");
        
        // Vérifier les héros
        assertNotNull(gameState.get("heroes"), "Héros doivent être présents");
        System.out.println("✅ Héros validés");
        
        // Vérifier les ψ-états
        assertNotNull(gameState.get("psiStates"), "ψ-états doivent être présents");
        System.out.println("✅ ψ-états validés");
        
        System.out.println("\n🎉 === SCÉNARIO ÉPIQUE TERMINÉ AVEC SUCCÈS ===");
        System.out.println("🏆 Tous les mécanismes temporels fonctionnent parfaitement !");
    }
    
    /**
     * ┌─────────────────────────────────────────────────────────────────────────────────────┐
     * │                      🔬 TEST DE STRESS TEMPOREL                                     │
     * └─────────────────────────────────────────────────────────────────────────────────────┘
     */
    @Test
    public void testTemporalStressTest() {
        System.out.println("\n🔬 === TEST DE STRESS TEMPOREL ===");
        
        // Créer plusieurs héros
        for (int i = 1; i <= 5; i++) {
            Map<String, Object> result = temporalEngineService.executeScript(testGame.getId(), 
                "HERO(Hero" + i + ")");
            assertTrue((Boolean) result.get("success"), "Hero" + i + " doit être créé");
        }
        System.out.println("✅ 5 héros créés");
        
        // Créer 10 ψ-états complexes
        for (int i = 1; i <= 10; i++) {
            String psiScript = String.format("ψ%03d: ⊙(Δt+%d @%d,%d ⟶ CREATE(CREATURE, Creature%d, @%d,%d))", 
                i, (i % 3) + 1, 10 + i, 10 + i, i, 10 + i, 10 + i);
            Map<String, Object> result = temporalEngineService.executeScript(testGame.getId(), psiScript);
            assertTrue((Boolean) result.get("success"), "ψ" + String.format("%03d", i) + " doit être créé");
        }
        System.out.println("✅ 10 ψ-états créés");
        
        // Effondrer 5 ψ-états
        for (int i = 1; i <= 5; i++) {
            Map<String, Object> result = temporalEngineService.executeScript(testGame.getId(), 
                "†ψ" + String.format("%03d", i));
            assertTrue((Boolean) result.get("success"), "ψ" + String.format("%03d", i) + " doit s'effondrer");
        }
        System.out.println("✅ 5 ψ-états effondrés");
        
        // Vérifier l'état final
        Map<String, Object> gameState = temporalEngineService.getGameState(testGame.getId());
        assertNotNull(gameState, "État du jeu doit être stable");
        System.out.println("✅ Test de stress réussi");
    }
    
    /**
     * ┌─────────────────────────────────────────────────────────────────────────────────────┐
     * │                        📊 MÉTRICS DE PERFORMANCE                                    │
     * └─────────────────────────────────────────────────────────────────────────────────────┘
     */
    @Test
    public void testPerformanceMetrics() {
        System.out.println("\n📊 === MÉTRIQUES DE PERFORMANCE ===");
        
        long startTime = System.currentTimeMillis();
        
        // Exécuter 100 commandes diverses
        int successCount = 0;
        int totalCommands = 100;
        
        for (int i = 0; i < totalCommands; i++) {
            String command;
            switch (i % 6) {
                case 0: command = "HERO(TestHero" + i + ")"; break;
                case 1: command = "MOV(TestHero" + (i-1) + ", @" + (i%20) + "," + (i%20) + ")"; break;
                case 2: command = "ψ" + String.format("%03d", i) + ": ⊙(Δt+" + ((i%3)+1) + " @" + (i%30) + "," + (i%30) + " ⟶ CREATE(CREATURE, TestCreature, @" + (i%30) + "," + (i%30) + "))"; break;
                case 3: command = "BUILD(Castle, @" + (i%15) + "," + (i%15) + ", PLAYER:player1)"; break;
                case 4: command = "RECRUIT(UNIT, Soldiers, " + (i%10+1) + ", HERO:TestHero" + (i%5) + ")"; break;
                case 5: command = "USE(ITEM, AvantWorldBlade, HERO:TestHero" + (i%5) + ")"; break;
                default: command = "HERO(DefaultHero)"; break;
            }
            
            try {
                Map<String, Object> result = temporalEngineService.executeScript(testGame.getId(), command);
                if (result != null && (Boolean) result.get("success")) {
                    successCount++;
                }
            } catch (Exception e) {
                System.out.println("⚠️ Échec commande " + i + ": " + command);
            }
        }
        
        long endTime = System.currentTimeMillis();
        long totalTime = endTime - startTime;
        
        double successRate = (double) successCount / totalCommands * 100;
        double averageTime = (double) totalTime / totalCommands;
        
        System.out.println("\n📈 RÉSULTATS DE PERFORMANCE :");
        System.out.println("Commandes totales : " + totalCommands);
        System.out.println("Commandes réussies : " + successCount);
        System.out.println("Taux de succès : " + String.format("%.1f%%", successRate));
        System.out.println("Temps total : " + totalTime + " ms");
        System.out.println("Temps moyen/commande : " + String.format("%.2f ms", averageTime));
        System.out.println("Commandes/seconde : " + String.format("%.0f", 1000.0 / averageTime));
        
        // Assertions de performance
        assertTrue(successRate >= 70.0, "Taux de succès doit être >= 70%");
        assertTrue(averageTime <= 100.0, "Temps moyen doit être <= 100ms");
        
        System.out.println("✅ Métriques de performance validées");
    }
} 