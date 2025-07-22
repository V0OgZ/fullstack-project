package com.heroesoftimepoc.temporalengine;

import com.heroesoftimepoc.temporalengine.model.PsiState;
import com.heroesoftimepoc.temporalengine.service.TemporalScriptParser;
import com.heroesoftimepoc.temporalengine.service.TemporalScriptParser.ScriptCommand;
import com.heroesoftimepoc.temporalengine.service.TemporalScriptParser.ObservationTrigger;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class TemporalScriptParserTest {
    
    private TemporalScriptParser parser;
    
    @BeforeEach
    public void setUp() {
        parser = new TemporalScriptParser();
    }
    
    @Test
    public void testParseBasicHeroCreation() {
        String script = "HERO(Arthur)";
        ScriptCommand command = parser.parseBasicScript(script);
        
        assertNotNull(command);
        assertEquals("HERO", command.getType());
        assertEquals("Arthur", command.getParameters());
    }
    
    @Test
    public void testParseBasicMovement() {
        String script = "MOV(Arthur, @10,15)";
        ScriptCommand command = parser.parseBasicScript(script);
        
        assertNotNull(command);
        assertEquals("MOV", command.getType());
        assertTrue(command.getParameters() instanceof java.util.Map);
    }
    
    @Test
    public void testParseBasicCreation() {
        String script = "CREATE(CREATURE, Dragon, @20,25)";
        ScriptCommand command = parser.parseBasicScript(script);
        
        assertNotNull(command);
        assertEquals("CREATE", command.getType());
        assertTrue(command.getParameters() instanceof java.util.Map);
    }
    
    @Test
    public void testParseItemUsage() {
        String script = "USE(ITEM, AvantWorldBlade, HERO:Arthur)";
        ScriptCommand command = parser.parseBasicScript(script);
        
        assertNotNull(command);
        assertEquals("USE", command.getType());
        assertTrue(command.getParameters() instanceof java.util.Map);
    }
    
    @Test
    public void testParseBattleCommand() {
        String script = "BATTLE(Arthur, Dragon)";
        ScriptCommand command = parser.parseBasicScript(script);
        
        assertNotNull(command);
        assertEquals("BATTLE", command.getType());
        assertTrue(command.getParameters() instanceof java.util.Map);
    }
    
    @Test
    public void testParseTemporalPsiState() {
        String script = "ψ001: ⊙(Δt+2 @15,20 ⟶ CREATE(CREATURE, Dragon))";
        PsiState psiState = parser.parseTemporalScript(script);
        
        assertNotNull(psiState);
        assertEquals("ψ001", psiState.getPsiId());
        assertEquals(Integer.valueOf(2), psiState.getDeltaT());
        assertEquals(Integer.valueOf(15), psiState.getTargetX());
        assertEquals(Integer.valueOf(20), psiState.getTargetY());
        assertEquals("CREATE", psiState.getActionType());
    }
    
    @Test
    public void testParseCollapseCommand() {
        String script = "†ψ001";
        String collapseTarget = parser.parseCollapseCommand(script);
        
        assertNotNull(collapseTarget);
        assertEquals("ψ001", collapseTarget);
    }
    
    @Test
    public void testParseObservationTrigger() {
        String script = "Π(Player2 enters @15,20) ⇒ †ψ001";
        ObservationTrigger trigger = parser.parseObservationTrigger(script);
        
        assertNotNull(trigger);
        assertEquals("Player2 enters @15,20", trigger.getCondition());
        assertEquals("ψ001", trigger.getTargetPsi());
    }
    
    @Test
    public void testIsTemporalScript() {
        assertTrue(parser.isTemporalScript("ψ001: ⊙(Δt+2 @15,20 ⟶ CREATE(CREATURE, Dragon))"));
        assertTrue(parser.isTemporalScript("†ψ001"));
        assertTrue(parser.isTemporalScript("Π(Player2 enters @15,20) ⇒ †ψ001"));
        assertFalse(parser.isTemporalScript("HERO(Arthur)"));
        assertFalse(parser.isTemporalScript("MOV(Arthur, @10,15)"));
    }
    
    @Test
    public void testExtractBranchIdDefault() {
        String script = "ψ001: ⊙(Δt+2 @15,20 ⟶ CREATE(CREATURE, Dragon))";
        String branchId = parser.extractBranchId(script);
        
        assertEquals("ℬ1", branchId);
    }
    
    @Test
    public void testValidateTemporalScript() {
        assertTrue(parser.isValidTemporalScript("ψ001: ⊙(Δt+2 @15,20 ⟶ CREATE(CREATURE, Dragon))"));
        assertTrue(parser.isValidTemporalScript("†ψ001"));
        assertTrue(parser.isValidTemporalScript("HERO(Arthur)"));
        assertTrue(parser.isValidTemporalScript("MOV(Arthur, @10,15)"));
        assertFalse(parser.isValidTemporalScript("INVALID_COMMAND"));
    }
    
    @Test
    public void testInvalidScript() {
        String script = "INVALID_SYNTAX";
        ScriptCommand command = parser.parseBasicScript(script);
        PsiState psiState = parser.parseTemporalScript(script);
        
        assertNull(command);
        assertNull(psiState);
    }
    
    @Test
    public void testEmptyScript() {
        String script = "";
        ScriptCommand command = parser.parseBasicScript(script);
        PsiState psiState = parser.parseTemporalScript(script);
        
        assertNull(command);
        assertNull(psiState);
    }
    
    @Test
    public void testScriptWithWhitespace() {
        String script = "   HERO(Arthur)   ";
        ScriptCommand command = parser.parseBasicScript(script);
        
        assertNotNull(command);
        assertEquals("HERO", command.getType());
        assertEquals("Arthur", command.getParameters());
    }
} 