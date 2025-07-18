package com.heroesoftimepoc.temporalengine.service;

import com.heroesoftimepoc.temporalengine.model.PsiState;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

/**
 * ╔══════════════════════════════════════════════════════════════════════════════════════╗
 * ║                        🔄 DUAL PARSER COMPARISON SERVICE                            ║
 * ║                    Test and Compare REGEX vs ANTLR4 Parsers                        ║
 * ╚══════════════════════════════════════════════════════════════════════════════════════╝
 * 
 * Ce service permet de :
 * - Tester les deux parsers en parallèle
 * - Comparer leurs performances et résultats
 * - Valider la compatibilité du nouveau parser ANTLR4
 * - Mesurer les améliorations
 * 
 * ┌─────────────────────────────────────────────────────────────────────────────────────┐
 * │                           🎯 OBJECTIFS DE COMPARAISON                               │
 * └─────────────────────────────────────────────────────────────────────────────────────┘
 * 
 * ╭─ Critères de Test ───────────────────────────────────────────────────────────────────╮
 * │ • Compatibilité : Les deux parsers donnent-ils les mêmes résultats ?                │
 * │ • Performance : Quel parser est plus rapide ?                                       │
 * │ • Robustesse : Gestion d'erreurs et cas limites                                     │
 * │ • Maintenabilité : Facilité d'extension et modification                             │
 * ╰──────────────────────────────────────────────────────────────────────────────────────╯
 */
@Service
public class DualParserService {
    
    @Autowired
    private TemporalScriptParser regexParser;
    
    @Autowired
    private AntlrTemporalScriptParser antlrParser;
    
    /**
     * ┌─────────────────────────────────────────────────────────────────────────────────────┐
     * │                               📊 RÉSULTATS DE COMPARAISON                           │
     * └─────────────────────────────────────────────────────────────────────────────────────┘
     */
    public static class ComparisonResult {
        private final boolean regexSuccess;
        private final boolean antlrSuccess;
        private final Object regexResult;
        private final Object antlrResult;
        private final long regexTimeNs;
        private final long antlrTimeNs;
        private final boolean resultsMatch;
        private final String differences;
        
        public ComparisonResult(boolean regexSuccess, boolean antlrSuccess,
                               Object regexResult, Object antlrResult,
                               long regexTimeNs, long antlrTimeNs,
                               boolean resultsMatch, String differences) {
            this.regexSuccess = regexSuccess;
            this.antlrSuccess = antlrSuccess;
            this.regexResult = regexResult;
            this.antlrResult = antlrResult;
            this.regexTimeNs = regexTimeNs;
            this.antlrTimeNs = antlrTimeNs;
            this.resultsMatch = resultsMatch;
            this.differences = differences;
        }
        
        // Getters
        public boolean isRegexSuccess() { return regexSuccess; }
        public boolean isAntlrSuccess() { return antlrSuccess; }
        public Object getRegexResult() { return regexResult; }
        public Object getAntlrResult() { return antlrResult; }
        public long getRegexTimeNs() { return regexTimeNs; }
        public long getAntlrTimeNs() { return antlrTimeNs; }
        public boolean doResultsMatch() { return resultsMatch; }
        public String getDifferences() { return differences; }
        
        public double getRegexTimeMs() { return regexTimeNs / 1_000_000.0; }
        public double getAntlrTimeMs() { return antlrTimeNs / 1_000_000.0; }
        public double getSpeedupRatio() { 
            return antlrTimeNs == 0 ? 0 : (double) regexTimeNs / antlrTimeNs; 
        }
    }
    
    /**
     * ┌─────────────────────────────────────────────────────────────────────────────────────┐
     * │                              🧪 TESTS DE COMPARAISON                                │
     * └─────────────────────────────────────────────────────────────────────────────────────┘
     */
    
    /**
     * Comparer la détection de script temporel
     */
    public ComparisonResult compareIsTemporalScript(String scriptLine) {
        // Test Regex Parser
        long regexStart = System.nanoTime();
        boolean regexResult = false;
        boolean regexSuccess = true;
        try {
            regexResult = regexParser.isTemporalScript(scriptLine);
        } catch (Exception e) {
            regexSuccess = false;
        }
        long regexTime = System.nanoTime() - regexStart;
        
        // Test ANTLR Parser
        long antlrStart = System.nanoTime();
        boolean antlrResult = false;
        boolean antlrSuccess = true;
        try {
            antlrResult = antlrParser.isTemporalScript(scriptLine);
        } catch (Exception e) {
            antlrSuccess = false;
        }
        long antlrTime = System.nanoTime() - antlrStart;
        
        // Comparer les résultats
        boolean resultsMatch = (regexSuccess == antlrSuccess) && (regexResult == antlrResult);
        String differences = resultsMatch ? "" : 
            String.format("Regex: %s->%b, ANTLR: %s->%b", 
                regexSuccess ? "OK" : "FAIL", regexResult,
                antlrSuccess ? "OK" : "FAIL", antlrResult);
        
        return new ComparisonResult(regexSuccess, antlrSuccess, regexResult, antlrResult,
                                  regexTime, antlrTime, resultsMatch, differences);
    }
    
    /**
     * Comparer le parsing de script temporel
     */
    public ComparisonResult compareTemporalScript(String scriptLine) {
        // Test Regex Parser
        long regexStart = System.nanoTime();
        PsiState regexResult = null;
        boolean regexSuccess = true;
        try {
            regexResult = regexParser.parseTemporalScript(scriptLine);
        } catch (Exception e) {
            regexSuccess = false;
        }
        long regexTime = System.nanoTime() - regexStart;
        
        // Test ANTLR Parser
        long antlrStart = System.nanoTime();
        PsiState antlrResult = null;
        boolean antlrSuccess = true;
        try {
            antlrResult = antlrParser.parseTemporalScript(scriptLine);
        } catch (Exception e) {
            antlrSuccess = false;
        }
        long antlrTime = System.nanoTime() - antlrStart;
        
        // Comparer les résultats
        boolean resultsMatch = comparePsiStates(regexResult, antlrResult);
        String differences = resultsMatch ? "" : generatePsiStateDifferences(regexResult, antlrResult);
        
        return new ComparisonResult(regexSuccess, antlrSuccess, regexResult, antlrResult,
                                  regexTime, antlrTime, resultsMatch, differences);
    }
    
    /**
     * Comparer le parsing de commande basique
     */
    public ComparisonResult compareBasicScript(String scriptLine) {
        // Test Regex Parser
        long regexStart = System.nanoTime();
        TemporalScriptParser.ScriptCommand regexResult = null;
        boolean regexSuccess = true;
        try {
            regexResult = regexParser.parseBasicScript(scriptLine);
        } catch (Exception e) {
            regexSuccess = false;
        }
        long regexTime = System.nanoTime() - regexStart;
        
        // Test ANTLR Parser
        long antlrStart = System.nanoTime();
        AntlrTemporalScriptParser.ScriptCommand antlrResult = null;
        boolean antlrSuccess = true;
        try {
            antlrResult = antlrParser.parseBasicScript(scriptLine);
        } catch (Exception e) {
            antlrSuccess = false;
        }
        long antlrTime = System.nanoTime() - antlrStart;
        
        // Comparer les résultats
        boolean resultsMatch = compareScriptCommands(regexResult, antlrResult);
        String differences = resultsMatch ? "" : generateScriptCommandDifferences(regexResult, antlrResult);
        
        return new ComparisonResult(regexSuccess, antlrSuccess, regexResult, antlrResult,
                                  regexTime, antlrTime, resultsMatch, differences);
    }
    
    /**
     * Test de performance en lot
     */
    public Map<String, Object> performanceBenchmark(String[] testScripts, int iterations) {
        Map<String, Object> results = new HashMap<>();
        
        long totalRegexTime = 0;
        long totalAntlrTime = 0;
        int regexSuccesses = 0;
        int antlrSuccesses = 0;
        int matches = 0;
        
        for (int i = 0; i < iterations; i++) {
            for (String script : testScripts) {
                ComparisonResult result;
                
                // Tester selon le type de script
                if (regexParser.isTemporalScript(script)) {
                    result = compareTemporalScript(script);
                } else {
                    result = compareBasicScript(script);
                }
                
                totalRegexTime += result.getRegexTimeNs();
                totalAntlrTime += result.getAntlrTimeNs();
                
                if (result.isRegexSuccess()) regexSuccesses++;
                if (result.isAntlrSuccess()) antlrSuccesses++;
                if (result.doResultsMatch()) matches++;
            }
        }
        
        int totalTests = testScripts.length * iterations;
        
        results.put("totalTests", totalTests);
        results.put("regexSuccessRate", (double) regexSuccesses / totalTests * 100);
        results.put("antlrSuccessRate", (double) antlrSuccesses / totalTests * 100);
        results.put("compatibilityRate", (double) matches / totalTests * 100);
        results.put("regexAvgTimeMs", totalRegexTime / 1_000_000.0 / totalTests);
        results.put("antlrAvgTimeMs", totalAntlrTime / 1_000_000.0 / totalTests);
        results.put("regexOpsPerSec", 1_000_000_000.0 * totalTests / totalRegexTime);
        results.put("antlrOpsPerSec", 1_000_000_000.0 * totalTests / totalAntlrTime);
        results.put("speedupRatio", (double) totalRegexTime / totalAntlrTime);
        
        return results;
    }
    
    /**
     * ┌─────────────────────────────────────────────────────────────────────────────────────┐
     * │                              🔧 MÉTHODES UTILITAIRES                                │
     * └─────────────────────────────────────────────────────────────────────────────────────┘
     */
    
    private boolean comparePsiStates(PsiState regex, PsiState antlr) {
        if (regex == null && antlr == null) return true;
        if (regex == null || antlr == null) return false;
        
        return regex.getPsiId().equals(antlr.getPsiId()) &&
               regex.getExpression().equals(antlr.getExpression()) &&
               compareIntegers(regex.getTargetX(), antlr.getTargetX()) &&
               compareIntegers(regex.getTargetY(), antlr.getTargetY()) &&
               compareIntegers(regex.getDeltaT(), antlr.getDeltaT());
    }
    
    private boolean compareScriptCommands(TemporalScriptParser.ScriptCommand regex, 
                                         AntlrTemporalScriptParser.ScriptCommand antlr) {
        if (regex == null && antlr == null) return true;
        if (regex == null || antlr == null) return false;
        
        return regex.getType().equals(antlr.getType()) &&
               compareObjects(regex.getParameters(), antlr.getParameters());
    }
    
    private boolean compareIntegers(Integer a, Integer b) {
        if (a == null && b == null) return true;
        if (a == null || b == null) return false;
        return a.equals(b);
    }
    
    private boolean compareObjects(Object a, Object b) {
        if (a == null && b == null) return true;
        if (a == null || b == null) return false;
        return a.toString().equals(b.toString());
    }
    
    private String generatePsiStateDifferences(PsiState regex, PsiState antlr) {
        if (regex == null) return "Regex: null, ANTLR: " + antlr;
        if (antlr == null) return "Regex: " + regex + ", ANTLR: null";
        
        StringBuilder diff = new StringBuilder();
        if (!regex.getPsiId().equals(antlr.getPsiId())) {
            diff.append("PsiId: ").append(regex.getPsiId()).append(" vs ").append(antlr.getPsiId()).append("; ");
        }
        if (!regex.getExpression().equals(antlr.getExpression())) {
            diff.append("Expression: ").append(regex.getExpression()).append(" vs ").append(antlr.getExpression()).append("; ");
        }
        return diff.toString();
    }
    
    private String generateScriptCommandDifferences(TemporalScriptParser.ScriptCommand regex, 
                                                   AntlrTemporalScriptParser.ScriptCommand antlr) {
        if (regex == null) return "Regex: null, ANTLR: " + antlr;
        if (antlr == null) return "Regex: " + regex + ", ANTLR: null";
        
        StringBuilder diff = new StringBuilder();
        if (!regex.getType().equals(antlr.getType())) {
            diff.append("Type: ").append(regex.getType()).append(" vs ").append(antlr.getType()).append("; ");
        }
        if (!compareObjects(regex.getParameters(), antlr.getParameters())) {
            diff.append("Params: ").append(regex.getParameters()).append(" vs ").append(antlr.getParameters()).append("; ");
        }
        return diff.toString();
    }
} 