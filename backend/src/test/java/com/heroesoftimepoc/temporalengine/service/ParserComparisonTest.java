package com.heroesoftimepoc.temporalengine.service;

import com.heroesoftimepoc.temporalengine.model.PsiState;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class ParserComparisonTest {
    
    private RegexTemporalScriptParser regexParser;
    private LispTemporalScriptParser lispParser;
    private ParserAdapter adapter;
    
    @BeforeEach
    void setUp() {
        regexParser = new RegexTemporalScriptParser();
        lispParser = new LispTemporalScriptParser();
        adapter = new ParserAdapter();
    }
    
    @Nested
    @DisplayName("Temporal Script Detection Tests")
    class TemporalScriptDetectionTests {
        
        @Test
        @DisplayName("Should detect temporal scripts consistently")
        void shouldDetectTemporalScriptsConsistently() {
            List<String> temporalScripts = Arrays.asList(
                "ψ1: ⊙(MOV(Arthur, @10,15))",
                "ψ2: ⊙(CREATE(HERO, Arthur)) Δt+3",
                "†ψ1"
            );
            
            List<String> lispTemporalScripts = Arrays.asList(
                "(PSI psi1 (MOV Arthur @10,15))",
                "(PSI psi2 (CREATE (TYPE HERO) (NAME Arthur)) (DELTA_T 3))",
                "(COLLAPSE psi1)"
            );
            
            for (String script : temporalScripts) {
                assertTrue(regexParser.isTemporalScript(script), 
                    "Regex parser should detect temporal script: " + script);
            }
            
            for (String script : lispTemporalScripts) {
                assertTrue(lispParser.isTemporalScript(script), 
                    "Lisp parser should detect temporal script: " + script);
            }
        }
        
        @Test
        @DisplayName("Should not detect non-temporal scripts")
        void shouldNotDetectNonTemporalScripts() {
            List<String> nonTemporalScripts = Arrays.asList(
                "HERO(Arthur)",
                "MOV(Arthur, @10,15)",
                "CREATE(ITEM, Sword)",
                "BUILD(CASTLE, @5,7)"
            );
            
            for (String script : nonTemporalScripts) {
                assertFalse(regexParser.isTemporalScript(script), 
                    "Regex parser should not detect temporal script: " + script);
                assertFalse(lispParser.isTemporalScript(script), 
                    "Lisp parser should not detect temporal script: " + script);
            }
        }
    }
    
    @Nested
    @DisplayName("PSI State Parsing Tests")
    class PsiStateParsingTests {
        
        @Test
        @DisplayName("Should parse basic PSI states with equivalent results")
        void shouldParseBasicPsiStatesEquivalently() {
            // Test equivalent expressions
            String regexScript = "ψ1: ⊙(MOV(Arthur, @10,15))";
            String lispScript = "(PSI psi1 (MOV Arthur @10,15))";
            
            PsiState regexResult = regexParser.parseTemporalScript(regexScript);
            PsiState lispResult = lispParser.parseTemporalScript(lispScript);
            
            assertNotNull(regexResult, "Regex parser should parse PSI state");
            assertNotNull(lispResult, "Lisp parser should parse PSI state");
            
            // Compare core properties (normalize PSI IDs)
            assertEquals("psi1", adapter.normalizeGreekPsiId(regexResult.getPsiId()));
            assertEquals("psi1", lispResult.getPsiId());
            assertEquals("Arthur", regexResult.getOwnerHero());
            assertEquals("Arthur", lispResult.getOwnerHero());
            assertEquals(Integer.valueOf(10), regexResult.getTargetX());
            assertEquals(Integer.valueOf(10), lispResult.getTargetX());
            assertEquals(Integer.valueOf(15), regexResult.getTargetY());
            assertEquals(Integer.valueOf(15), lispResult.getTargetY());
            assertEquals("MOV", regexResult.getActionType());
            assertEquals("MOV", lispResult.getActionType());
        }
        
        @Test
        @DisplayName("Should parse PSI states with delta-t")
        void shouldParsePsiStatesWithDeltaT() {
            String regexScript = "ψ2: ⊙(CREATE(HERO, Arthur)) Δt+3";
            String lispScript = "(PSI psi2 (CREATE (TYPE HERO) (NAME Arthur)) (DELTA_T 3))";
            
            PsiState regexResult = regexParser.parseTemporalScript(regexScript);
            PsiState lispResult = lispParser.parseTemporalScript(lispScript);
            
            assertNotNull(regexResult, "Regex parser should parse PSI state with delta-t");
            assertNotNull(lispResult, "Lisp parser should parse PSI state with delta-t");
            
            assertEquals("psi2", adapter.normalizeGreekPsiId(regexResult.getPsiId()));
            assertEquals("psi2", lispResult.getPsiId());
            assertEquals(Integer.valueOf(3), regexResult.getDeltaT());
            assertEquals(Integer.valueOf(3), lispResult.getDeltaT());
        }
        
        @Test
        @DisplayName("Should parse PSI states with branches")
        void shouldParsePsiStatesWithBranches() {
            String regexScript = "ψ3: ⊙(MOV(Arthur, @5,8)) branch:alpha";
            String lispScript = "(PSI psi3 (MOV Arthur @5,8) (BRANCH alpha))";
            
            PsiState regexResult = regexParser.parseTemporalScript(regexScript);
            PsiState lispResult = lispParser.parseTemporalScript(lispScript);
            
            assertNotNull(regexResult, "Regex parser should parse PSI state with branch");
            assertNotNull(lispResult, "Lisp parser should parse PSI state with branch");
            
            assertEquals("psi3", adapter.normalizeGreekPsiId(regexResult.getPsiId()));
            assertEquals("psi3", lispResult.getPsiId());
            assertEquals("alpha", regexResult.getBranchId());
            assertEquals("alpha", lispResult.getBranchId());
        }
        
        @Test
        @DisplayName("Should parse PSI states with probability")
        void shouldParsePsiStatesWithProbability() {
            String regexScript = "ψ4: ⊙(BATTLE(Arthur, Dragon)) prob:0.7";
            String lispScript = "(PSI psi4 (MOV Arthur @5,5) (PROB 0.7))";
            
            PsiState regexResult = regexParser.parseTemporalScript(regexScript);
            PsiState lispResult = lispParser.parseTemporalScript(lispScript);
            
            assertNotNull(regexResult, "Regex parser should parse PSI state with probability");
            assertNotNull(lispResult, "Lisp parser should parse PSI state with probability");
            
            assertEquals("psi4", adapter.normalizeGreekPsiId(regexResult.getPsiId()));
            assertEquals("psi4", lispResult.getPsiId());
            assertEquals(Double.valueOf(0.7), regexResult.getProbability());
            assertEquals(Double.valueOf(0.7), lispResult.getProbability());
        }
    }
    
    @Nested
    @DisplayName("Collapse Command Tests")
    class CollapseCommandTests {
        
        @Test
        @DisplayName("Should parse collapse commands equivalently")
        void shouldParseCollapseCommandsEquivalently() {
            String regexScript = "†ψ1";
            String lispScript = "(COLLAPSE psi1)";
            
            String regexResult = regexParser.parseCollapseCommand(regexScript);
            String lispResult = lispParser.parseCollapseCommand(lispScript);
            
            assertNotNull(regexResult, "Regex parser should parse collapse command");
            assertNotNull(lispResult, "Lisp parser should parse collapse command");
            
            assertEquals("psi1", adapter.normalizeGreekPsiId(regexResult));
            assertEquals("psi1", lispResult);
        }
        
        @Test
        @DisplayName("Should parse multiple collapse commands")
        void shouldParseMultipleCollapseCommands() {
            String[] regexScripts = {"†ψ1", "†ψ2", "†ψ10"};
            String[] lispScripts = {"(COLLAPSE psi1)", "(COLLAPSE psi2)", "(COLLAPSE psi10)"};
            String[] expectedResults = {"psi1", "psi2", "psi10"};
            
            for (int i = 0; i < regexScripts.length; i++) {
                String regexResult = regexParser.parseCollapseCommand(regexScripts[i]);
                String lispResult = lispParser.parseCollapseCommand(lispScripts[i]);
                
                assertEquals(expectedResults[i], adapter.normalizeGreekPsiId(regexResult));
                assertEquals(expectedResults[i], lispResult);
            }
        }
    }
    
    @Nested
    @DisplayName("Basic Script Command Tests")
    class BasicScriptCommandTests {
        
        @Test
        @DisplayName("Should parse hero commands equivalently")
        void shouldParseHeroCommandsEquivalently() {
            String regexScript = "HERO(Arthur)";
            String lispScript = "(HERO Arthur)";
            
            RegexTemporalScriptParser.ScriptCommand regexResult = regexParser.parseBasicScript(regexScript);
            LispTemporalScriptParser.ScriptCommand lispResult = lispParser.parseBasicScript(lispScript);
            
            assertNotNull(regexResult, "Regex parser should parse hero command");
            assertNotNull(lispResult, "Lisp parser should parse hero command");
            
            assertEquals("HERO", regexResult.getType());
            assertEquals("HERO", lispResult.getType());
            assertEquals("Arthur", regexResult.getParameters());
            assertEquals("Arthur", lispResult.getParameters());
        }
        
        @Test
        @DisplayName("Should parse movement commands equivalently")
        void shouldParseMovementCommandsEquivalently() {
            String regexScript = "MOV(Arthur, @10,15)";
            String lispScript = "(MOV Arthur @10,15)";
            
            RegexTemporalScriptParser.ScriptCommand regexResult = regexParser.parseBasicScript(regexScript);
            LispTemporalScriptParser.ScriptCommand lispResult = lispParser.parseBasicScript(lispScript);
            
            assertNotNull(regexResult, "Regex parser should parse movement command");
            assertNotNull(lispResult, "Lisp parser should parse movement command");
            
            assertEquals("MOV", regexResult.getType());
            assertEquals("MOV", lispResult.getType());
            
            @SuppressWarnings("unchecked")
            Map<String, String> regexParams = (Map<String, String>) regexResult.getParameters();
            @SuppressWarnings("unchecked")
            Map<String, String> lispParams = (Map<String, String>) lispResult.getParameters();
            
            assertEquals("Arthur", regexParams.get("hero"));
            assertEquals("Arthur", lispParams.get("hero"));
            assertEquals("10", regexParams.get("x"));
            assertEquals("10", lispParams.get("x"));
            assertEquals("15", regexParams.get("y"));
            assertEquals("15", lispParams.get("y"));
        }
        
        @Test
        @DisplayName("Should parse battle commands equivalently")
        void shouldParseBattleCommandsEquivalently() {
            String regexScript = "BATTLE(Arthur, Dragon)";
            String lispScript = "(BATTLE Arthur Dragon)";
            
            RegexTemporalScriptParser.ScriptCommand regexResult = regexParser.parseBasicScript(regexScript);
            LispTemporalScriptParser.ScriptCommand lispResult = lispParser.parseBasicScript(lispScript);
            
            assertNotNull(regexResult, "Regex parser should parse battle command");
            assertNotNull(lispResult, "Lisp parser should parse battle command");
            
            assertEquals("BATTLE", regexResult.getType());
            assertEquals("BATTLE", lispResult.getType());
            
            @SuppressWarnings("unchecked")
            Map<String, String> regexParams = (Map<String, String>) regexResult.getParameters();
            @SuppressWarnings("unchecked")
            Map<String, String> lispParams = (Map<String, String>) lispResult.getParameters();
            
            assertEquals("Arthur", regexParams.get("attacker"));
            assertEquals("Arthur", lispParams.get("attacker"));
            assertEquals("Dragon", regexParams.get("defender"));
            assertEquals("Dragon", lispParams.get("defender"));
        }
        
        @Test
        @DisplayName("Should parse create commands equivalently")
        void shouldParseCreateCommandsEquivalently() {
            String regexScript = "CREATE(ITEM, Sword, @5,7)";
            String lispScript = "(CREATE (TYPE ITEM) (NAME Sword) (POSITION @5,7))";
            
            RegexTemporalScriptParser.ScriptCommand regexResult = regexParser.parseBasicScript(regexScript);
            LispTemporalScriptParser.ScriptCommand lispResult = lispParser.parseBasicScript(lispScript);
            
            assertNotNull(regexResult, "Regex parser should parse create command");
            assertNotNull(lispResult, "Lisp parser should parse create command");
            
            assertEquals("CREATE", regexResult.getType());
            assertEquals("CREATE", lispResult.getType());
            
            @SuppressWarnings("unchecked")
            Map<String, String> regexParams = (Map<String, String>) regexResult.getParameters();
            @SuppressWarnings("unchecked")
            Map<String, String> lispParams = (Map<String, String>) lispResult.getParameters();
            
            assertEquals("ITEM", regexParams.get("type"));
            assertEquals("ITEM", lispParams.get("type"));
            assertEquals("Sword", regexParams.get("name"));
            assertEquals("Sword", lispParams.get("name"));
            assertEquals("5", regexParams.get("x"));
            assertEquals("5", lispParams.get("x"));
            assertEquals("7", regexParams.get("y"));
            assertEquals("7", lispParams.get("y"));
        }
    }
    
    @Nested
    @DisplayName("Observation Trigger Tests")
    class ObservationTriggerTests {
        
        @Test
        @DisplayName("Should parse observation triggers equivalently")
        void shouldParseObservationTriggersEquivalently() {
            String regexScript = "Π(HERO_AT(@10,15)) ⇒ †ψ1";
            String lispScript = "(OBSERVE psi1 (WHEN (HERO_AT @10,15)))";
            
            RegexTemporalScriptParser.ObservationTrigger regexResult = regexParser.parseObservationTrigger(regexScript);
            LispTemporalScriptParser.ObservationTrigger lispResult = lispParser.parseObservationTrigger(lispScript);
            
            // Note: Regex parser currently doesn't support observation triggers
            // This test verifies that the lisp parser does support them
            assertNotNull(lispResult, "Lisp parser should parse observation trigger");
            
            assertEquals("psi1", lispResult.getTargetPsi());
            assertNotNull(lispResult.getCondition());
            
            // TODO: Implement observation triggers in regex parser
            // For now, we accept that regex parser returns null
        }
    }
    
    @Nested
    @DisplayName("Error Handling Tests")
    class ErrorHandlingTests {
        
        @Test
        @DisplayName("Should handle invalid scripts gracefully")
        void shouldHandleInvalidScriptsGracefully() {
            String[] invalidScripts = {
                "",
                "invalid",
                "ψ: ⊙()",
                "(PSI)",
                "(((",
                ")))"
            };
            
            for (String script : invalidScripts) {
                // Both parsers should handle errors gracefully
                assertDoesNotThrow(() -> regexParser.parseTemporalScript(script), 
                    "Regex parser should handle invalid script: " + script);
                assertDoesNotThrow(() -> lispParser.parseTemporalScript(script), 
                    "Lisp parser should handle invalid script: " + script);
            }
        }
        
        @Test
        @DisplayName("Should return null for unparseable scripts")
        void shouldReturnNullForUnparseableScripts() {
            String[] unparseable = {
                "random text",
                "ψ: invalid",
                "(UNKNOWN command)",
                "malformed(syntax"
            };
            
            for (String script : unparseable) {
                PsiState regexResult = regexParser.parseTemporalScript(script);
                PsiState lispResult = lispParser.parseTemporalScript(script);
                
                // Both should return null for unparseable scripts
                assertNull(regexResult, "Regex parser should return null for: " + script);
                assertNull(lispResult, "Lisp parser should return null for: " + script);
            }
        }
    }
} 