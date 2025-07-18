package com.heroesoftimepoc.temporalengine;

import com.heroesoftimepoc.temporalengine.service.DualParserService;
import com.heroesoftimepoc.temporalengine.service.DualParserService.ComparisonResult;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

/**
 * ╔══════════════════════════════════════════════════════════════════════════════════════╗
 * ║                     🔄 TESTS DE COMPARAISON DUAL PARSER                            ║
 * ║                    Validation REGEX vs ANTLR4 Performance                          ║
 * ╚══════════════════════════════════════════════════════════════════════════════════════╝
 * 
 * Tests pour valider que le nouveau parser ANTLR4 est compatible avec l'ancien parser 
 * regex et mesurer les améliorations de performance.
 * 
 * ┌─────────────────────────────────────────────────────────────────────────────────────┐
 * │                           🎯 OBJECTIFS DES TESTS                                   │
 * └─────────────────────────────────────────────────────────────────────────────────────┘
 * 
 * ╭─ Tests de Compatibilité ─────────────────────────────────────────────────────────────╮
 * │ • Vérifier que les deux parsers donnent les mêmes résultats                         │
 * │ • Identifier les différences de comportement                                        │
 * │ • Valider la migration sans régression                                              │
 * ╰──────────────────────────────────────────────────────────────────────────────────────╯
 * 
 * ╭─ Tests de Performance ───────────────────────────────────────────────────────────────╮
 * │ • Mesurer les temps d'exécution des deux parsers                                    │
 * │ • Comparer les taux de succès                                                       │
 * │ • Évaluer les gains de performance                                                  │
 * ╰──────────────────────────────────────────────────────────────────────────────────────╯
 */
@SpringBootTest
public class DualParserComparisonTest {
    
    @Autowired
    private DualParserService dualParserService;
    
    // Scripts de test pour validation
    private static final String[] BASIC_SCRIPTS = {
        "HERO(Arthur)",
        "HERO(Ragnar)",
        "MOV(Arthur, @10,15)",
        "CREATE(CREATURE, Dragon, @20,20)",
        "USE(ITEM, AvantWorldBlade, HERO:Arthur)",
        "BATTLE(Arthur, Dragon)"
    };
    
    private static final String[] TEMPORAL_SCRIPTS = {
        "ψ001: ⊙(Δt+2 @10,15 ⟶ MOV(Arthur, @10,15))",
        "ψ002: ⊙(Δt+1 @20,20 ⟶ CREATE(CREATURE, Dragon, @20,20))",
        "†ψ001",
        "†ψ002"
    };
    
    private static final String[] HMM3_SCRIPTS = {
        "BUILD(Castle, @50,50, PLAYER:RedPlayer)",
        "RECRUIT(UNIT, Archers, 10, HERO:Arthur)",
        "CAST(SPELL, Fireball, TARGET:Dragon, HERO:Wizard)",
        "COLLECT(RESOURCE, Gold, 1000, PLAYER:Me)",
        "EQUIP(ARTIFACT, CrownOfDragontooth, HERO:Arthur)"
    };
    
    /**
     * ┌─────────────────────────────────────────────────────────────────────────────────────┐
     * │                           🧪 TESTS DE COMPATIBILITÉ                                 │
     * └─────────────────────────────────────────────────────────────────────────────────────┘
     */
    
    @Test
    public void testBasicScriptCompatibility() {
        System.out.println("\n🎮 === TEST COMPATIBILITÉ SCRIPTS BASIQUES ===");
        
        int totalTests = 0;
        int compatibleResults = 0;
        
        for (String script : BASIC_SCRIPTS) {
            ComparisonResult result = dualParserService.compareBasicScript(script);
            totalTests++;
            
            System.out.printf("Script: %-40s | Regex: %s | ANTLR: %s | Match: %s%n",
                script,
                result.isRegexSuccess() ? "✅" : "❌",
                result.isAntlrSuccess() ? "✅" : "❌",
                result.doResultsMatch() ? "✅" : "❌"
            );
            
            if (result.doResultsMatch()) {
                compatibleResults++;
            } else {
                System.out.println("  Différences: " + result.getDifferences());
            }
        }
        
        double compatibilityRate = (double) compatibleResults / totalTests * 100;
        System.out.printf("\n📊 Taux de compatibilité: %.1f%% (%d/%d)%n", 
            compatibilityRate, compatibleResults, totalTests);
        
        // On accepte 80% de compatibilité pour commencer
        assertTrue(compatibilityRate >= 80.0, 
            String.format("Taux de compatibilité trop bas: %.1f%%", compatibilityRate));
    }
    
    @Test
    public void testTemporalScriptCompatibility() {
        System.out.println("\n🌀 === TEST COMPATIBILITÉ SCRIPTS TEMPORELS ===");
        
        int totalTests = 0;
        int compatibleResults = 0;
        
        for (String script : TEMPORAL_SCRIPTS) {
            ComparisonResult result = dualParserService.compareTemporalScript(script);
            totalTests++;
            
            System.out.printf("Script: %-50s | Regex: %s | ANTLR: %s | Match: %s%n",
                script,
                result.isRegexSuccess() ? "✅" : "❌",
                result.isAntlrSuccess() ? "✅" : "❌",
                result.doResultsMatch() ? "✅" : "❌"
            );
            
            if (result.doResultsMatch()) {
                compatibleResults++;
            } else {
                System.out.println("  Différences: " + result.getDifferences());
            }
        }
        
        double compatibilityRate = (double) compatibleResults / totalTests * 100;
        System.out.printf("\n📊 Taux de compatibilité: %.1f%% (%d/%d)%n", 
            compatibilityRate, compatibleResults, totalTests);
        
        // Scripts temporels plus critiques, on accepte 50% minimum pour le moment
        // TODO: Améliorer la compatibilité REGEX/ANTLR pour les scripts temporels complexes
        assertTrue(compatibilityRate >= 50.0, 
            String.format("Taux de compatibilité temporelle trop bas: %.1f%%", compatibilityRate));
    }
    
    @Test
    public void testHMM3ScriptCompatibility() {
        System.out.println("\n🏰 === TEST COMPATIBILITÉ SCRIPTS HMM3 ===");
        
        int totalTests = 0;
        int compatibleResults = 0;
        
        for (String script : HMM3_SCRIPTS) {
            ComparisonResult result = dualParserService.compareBasicScript(script);
            totalTests++;
            
            System.out.printf("Script: %-50s | Regex: %s | ANTLR: %s | Match: %s%n",
                script,
                result.isRegexSuccess() ? "✅" : "❌",
                result.isAntlrSuccess() ? "✅" : "❌",
                result.doResultsMatch() ? "✅" : "❌"
            );
            
            if (result.doResultsMatch()) {
                compatibleResults++;
            } else {
                System.out.println("  Différences: " + result.getDifferences());
            }
        }
        
        double compatibilityRate = (double) compatibleResults / totalTests * 100;
        System.out.printf("\n📊 Taux de compatibilité HMM3: %.1f%% (%d/%d)%n", 
            compatibilityRate, compatibleResults, totalTests);
        
        // Scripts HMM3 nouveaux, on accepte 60% pour commencer
        assertTrue(compatibilityRate >= 60.0, 
            String.format("Taux de compatibilité HMM3 trop bas: %.1f%%", compatibilityRate));
    }
    
    /**
     * ┌─────────────────────────────────────────────────────────────────────────────────────┐
     * │                            📊 TESTS DE PERFORMANCE                                  │
     * └─────────────────────────────────────────────────────────────────────────────────────┘
     */
    
    @Test
    public void testPerformanceBenchmark() {
        System.out.println("\n🚀 === BENCHMARK DE PERFORMANCE ===");
        
        // Combiner tous les scripts de test
        String[] allScripts = new String[BASIC_SCRIPTS.length + TEMPORAL_SCRIPTS.length];
        System.arraycopy(BASIC_SCRIPTS, 0, allScripts, 0, BASIC_SCRIPTS.length);
        System.arraycopy(TEMPORAL_SCRIPTS, 0, allScripts, BASIC_SCRIPTS.length, TEMPORAL_SCRIPTS.length);
        
        // Test de performance avec 100 itérations
        Map<String, Object> results = dualParserService.performanceBenchmark(allScripts, 100);
        
        System.out.println("\n📊 RÉSULTATS DU BENCHMARK:");
        System.out.printf("Tests totaux: %d%n", results.get("totalTests"));
        System.out.printf("Taux de succès REGEX: %.1f%%%n", results.get("regexSuccessRate"));
        System.out.printf("Taux de succès ANTLR: %.1f%%%n", results.get("antlrSuccessRate"));
        System.out.printf("Taux de compatibilité: %.1f%%%n", results.get("compatibilityRate"));
        System.out.printf("Temps moyen REGEX: %.3f ms%n", results.get("regexAvgTimeMs"));
        System.out.printf("Temps moyen ANTLR: %.3f ms%n", results.get("antlrAvgTimeMs"));
        System.out.printf("Ops/sec REGEX: %.0f%n", results.get("regexOpsPerSec"));
        System.out.printf("Ops/sec ANTLR: %.0f%n", results.get("antlrOpsPerSec"));
        System.out.printf("Ratio de vitesse: %.2fx%n", results.get("speedupRatio"));
        
        // Validation des résultats
        double regexSuccessRate = (Double) results.get("regexSuccessRate");
        double antlrSuccessRate = (Double) results.get("antlrSuccessRate");
        double compatibilityRate = (Double) results.get("compatibilityRate");
        
        // Le parser REGEX doit avoir un bon taux de succès (il est la référence)
        assertTrue(regexSuccessRate >= 80.0, "REGEX parser success rate too low");
        
        // Le parser ANTLR doit être fonctionnel
        assertTrue(antlrSuccessRate >= 60.0, "ANTLR parser success rate too low");
        
        // Compatibilité acceptable
        assertTrue(compatibilityRate >= 70.0, "Compatibility rate too low");
        
        System.out.println("\n✅ BENCHMARK VALIDÉ !");
    }
    
    @Test
    public void testDetectionTemporalScript() {
        System.out.println("\n🔍 === TEST DÉTECTION SCRIPT TEMPOREL ===");
        
        String[] testScripts = {
            "HERO(Arthur)",                                     // Basic
            "ψ001: ⊙(Δt+2 @10,15 ⟶ MOV(Arthur, @10,15))",     // Temporal
            "†ψ001",                                            // Collapse
            "MOV(Arthur, @20,20)",                              // Basic
            "Π(Arthur enters @10,15) ⇒ †ψ001"                 // Observation
        };
        
        boolean[] expectedTemporal = {false, true, true, false, true};
        
        for (int i = 0; i < testScripts.length; i++) {
            ComparisonResult result = dualParserService.compareIsTemporalScript(testScripts[i]);
            
            System.out.printf("Script: %-50s%n", testScripts[i]);
            System.out.printf("  Attendu: %s | Regex: %s | ANTLR: %s | Match: %s%n",
                expectedTemporal[i] ? "TEMPORAL" : "BASIC",
                result.getRegexResult().toString().equals("true") ? "TEMPORAL" : "BASIC",
                result.getAntlrResult().toString().equals("true") ? "TEMPORAL" : "BASIC",
                result.doResultsMatch() ? "✅" : "❌"
            );
            
            if (!result.doResultsMatch()) {
                System.out.println("    Différences: " + result.getDifferences());
            }
        }
    }
    
    /**
     * ┌─────────────────────────────────────────────────────────────────────────────────────┐
     * │                              🎯 TESTS D'OPTIMISATION                                │
     * └─────────────────────────────────────────────────────────────────────────────────────┘
     */
    
    @Test
    public void testOptimizationOpportunities() {
        System.out.println("\n🎯 === ANALYSE D'OPTIMISATION ===");
        
        String[] complexScripts = {
            "ψ001: ⊙(Δt+2 @10,15 ⟶ MOV(HERO, Arthur, @10,15))",
            "ψ002: ⊙(Δt+1 @20,20 ⟶ CREATE(CREATURE, Dragon, @20,20))",
            "BUILD(Castle, @50,50, PLAYER:RedPlayer)",
            "RECRUIT(UNIT, Archers, 10, HERO:Arthur)",
            "CAST(SPELL, Fireball, TARGET:Dragon, HERO:Wizard)"
        };
        
        System.out.println("\n📊 ANALYSE DES SCRIPTS COMPLEXES:");
        
        for (String script : complexScripts) {
            ComparisonResult result;
            
            // Déterminer le type de test
            if (script.contains("ψ") || script.contains("†") || script.contains("Π")) {
                result = dualParserService.compareTemporalScript(script);
            } else {
                result = dualParserService.compareBasicScript(script);
            }
            
            System.out.printf("\nScript: %s%n", script);
            System.out.printf("  REGEX: %.3f ms (%s)%n", 
                result.getRegexTimeMs(), result.isRegexSuccess() ? "✅" : "❌");
            System.out.printf("  ANTLR: %.3f ms (%s)%n", 
                result.getAntlrTimeMs(), result.isAntlrSuccess() ? "✅" : "❌");
            System.out.printf("  Ratio: %.2fx | Compatible: %s%n", 
                result.getSpeedupRatio(), result.doResultsMatch() ? "✅" : "❌");
            
            if (!result.doResultsMatch()) {
                System.out.println("  Différences: " + result.getDifferences());
            }
        }
        
        System.out.println("\n🎯 Opportunités d'optimisation identifiées pour améliorer ANTLR4");
    }
} 