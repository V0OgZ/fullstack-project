package com.heroesoftimepoc.temporalengine;

import com.heroesoftimepoc.temporalengine.parser.TemporalScriptParser;
import com.heroesoftimepoc.temporalengine.parser.ScriptCommand;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test")
public class TemporalScriptParserTest {

    @Autowired
    private TemporalScriptParser parser;
    
    @BeforeEach
    void setUp() {
        // Parser should be initialized by Spring
        assertNotNull(parser);
    }
    
    @Test
    void testBasicHeroCreation() {
        // Test basic hero creation command
        List<ScriptCommand> commands = parser.parseScript("HERO(Arthur)");
        
        assertEquals(1, commands.size());
        ScriptCommand command = commands.get(0);
        assertEquals(ScriptCommand.CommandType.HERO, command.getType());
        assertEquals("Arthur", command.getStringParam("heroName"));
    }
    
    @Test
    void testHeroMovement() {
        // Test hero movement command
        List<ScriptCommand> commands = parser.parseScript("MOV(Arthur, @10,15)");
        
        assertEquals(1, commands.size());
        ScriptCommand command = commands.get(0);
        assertEquals(ScriptCommand.CommandType.MOV, command.getType());
        assertEquals("Arthur", command.getStringParam("heroName"));
        assertEquals(10, command.getIntParam("x"));
        assertEquals(15, command.getIntParam("y"));
    }
    
    @Test
    void testPsiStateCreation() {
        // Test ψ-state creation with Unicode symbols
        String script = "ψ001: ⊙(Δt+2 @126,65 ⟶ CREATE(CREATURE, Dragon))";
        List<ScriptCommand> commands = parser.parseScript(script);
        
        assertEquals(1, commands.size());
        ScriptCommand command = commands.get(0);
        assertEquals(ScriptCommand.CommandType.CREATE_PSI_STATE, command.getType());
        assertEquals("001", command.getStringParam("psiId"));
        assertEquals(2, command.getIntParam("deltaTime"));
        assertEquals(126, command.getIntParam("x"));
        assertEquals(65, command.getIntParam("y"));
        assertEquals("CREATE", command.getStringParam("actionType"));
        assertEquals("CREATURE", command.getStringParam("targetType"));
        assertEquals("Dragon", command.getStringParam("targetName"));
    }
    
    @Test
    void testPsiStateCollapse() {
        // Test ψ-state collapse command
        String script = "†ψ001";
        List<ScriptCommand> commands = parser.parseScript(script);
        
        assertEquals(1, commands.size());
        ScriptCommand command = commands.get(0);
        assertEquals(ScriptCommand.CommandType.COLLAPSE_PSI_STATE, command.getType());
        assertEquals("001", command.getStringParam("psiId"));
    }
    
    @Test
    void testObservationTrigger() {
        // Test observation trigger with Π symbol
        String script = "Π(Ragnar enters @126,65 at Δt+2) ⇒ †ψ001";
        List<ScriptCommand> commands = parser.parseScript(script);
        
        assertEquals(1, commands.size());
        ScriptCommand command = commands.get(0);
        assertEquals(ScriptCommand.CommandType.OBSERVATION_TRIGGER, command.getType());
        assertEquals("Ragnar", command.getStringParam("observerName"));
        assertEquals(126, command.getIntParam("x"));
        assertEquals(65, command.getIntParam("y"));
        assertEquals(2, command.getIntParam("deltaTime"));
        assertEquals("001", command.getStringParam("targetPsiId"));
    }
    
    @Test
    void testComplexPsiStateWithMovement() {
        // Test complex ψ-state with hero movement
        String script = "ψ002: ⊙(Δt+1 @10,10 ⟶ MOV(HERO, Arthur, @10,10))";
        List<ScriptCommand> commands = parser.parseScript(script);
        
        assertEquals(1, commands.size());
        ScriptCommand command = commands.get(0);
        assertEquals(ScriptCommand.CommandType.CREATE_PSI_STATE, command.getType());
        assertEquals("002", command.getStringParam("psiId"));
        assertEquals(1, command.getIntParam("deltaTime"));
        assertEquals(10, command.getIntParam("x"));
        assertEquals(10, command.getIntParam("y"));
        assertEquals("MOV", command.getStringParam("actionType"));
        assertEquals("HERO", command.getStringParam("targetType"));
        assertEquals("Arthur", command.getStringParam("targetName"));
    }
    
    @Test
    void testBattleCommand() {
        // Test battle command parsing
        String script = "BATTLE(Arthur, Ragnar)";
        List<ScriptCommand> commands = parser.parseScript(script);
        
        assertEquals(1, commands.size());
        ScriptCommand command = commands.get(0);
        assertEquals(ScriptCommand.CommandType.BATTLE, command.getType());
        assertEquals("Arthur", command.getStringParam("attacker"));
        assertEquals("Ragnar", command.getStringParam("defender"));
    }
    
    @Test
    void testCreatureCreation() {
        // Test creature creation command
        String script = "CREATE(CREATURE, Dragon, @30,35)";
        List<ScriptCommand> commands = parser.parseScript(script);
        
        assertEquals(1, commands.size());
        ScriptCommand command = commands.get(0);
        assertEquals(ScriptCommand.CommandType.CREATE, command.getType());
        assertEquals("CREATURE", command.getStringParam("type"));
        assertEquals("Dragon", command.getStringParam("name"));
        assertEquals(30, command.getIntParam("x"));
        assertEquals(35, command.getIntParam("y"));
    }
    
    @Test
    void testTemporalArtifactUsage() {
        // Test temporal artifact usage
        String script = "USE(ITEM, AvantWorldBlade, HERO:Arthur)";
        List<ScriptCommand> commands = parser.parseScript(script);
        
        assertEquals(1, commands.size());
        ScriptCommand command = commands.get(0);
        assertEquals(ScriptCommand.CommandType.USE_ITEM, command.getType());
        assertEquals("AvantWorldBlade", command.getStringParam("itemName"));
        assertEquals("HERO", command.getStringParam("targetType"));
        assertEquals("Arthur", command.getStringParam("targetName"));
    }
    
    @Test
    void testMultipleCommands() {
        // Test parsing multiple commands in one script
        String script = """
            HERO(Arthur)
            MOV(Arthur, @10,10)
            ψ003: ⊙(Δt+1 @11,11 ⟶ MOV(HERO, Arthur, @11,11))
            †ψ003
            """;
        
        List<ScriptCommand> commands = parser.parseScript(script);
        
        assertEquals(4, commands.size());
        
        // Verify each command
        assertEquals(ScriptCommand.CommandType.HERO, commands.get(0).getType());
        assertEquals(ScriptCommand.CommandType.MOV, commands.get(1).getType());
        assertEquals(ScriptCommand.CommandType.CREATE_PSI_STATE, commands.get(2).getType());
        assertEquals(ScriptCommand.CommandType.COLLAPSE_PSI_STATE, commands.get(3).getType());
    }
    
    @Test
    void testPsiStateWithBattle() {
        // Test ψ-state containing battle command
        String script = "ψ004: ⊙(Δt+3 @20,20 ⟶ BATTLE(HERO Arthur, HERO Ragnar))";
        List<ScriptCommand> commands = parser.parseScript(script);
        
        assertEquals(1, commands.size());
        ScriptCommand command = commands.get(0);
        assertEquals(ScriptCommand.CommandType.CREATE_PSI_STATE, command.getType());
        assertEquals("004", command.getStringParam("psiId"));
        assertEquals(3, command.getIntParam("deltaTime"));
        assertEquals(20, command.getIntParam("x"));
        assertEquals(20, command.getIntParam("y"));
        assertEquals("BATTLE", command.getStringParam("actionType"));
        assertTrue(command.getStringParam("expression").contains("Arthur"));
        assertTrue(command.getStringParam("expression").contains("Ragnar"));
    }
    
    @Test
    void testComplexArtifactWithPsiState() {
        // Test complex artifact usage within ψ-state
        String script = "ψ005: ⊙(Δt+2 @25,25 ⟶ USE(ITEM, AvantWorldBlade, HERO:Arthur) ∧ BATTLE(HERO Arthur, CREATURE Dragon))";
        List<ScriptCommand> commands = parser.parseScript(script);
        
        assertEquals(1, commands.size());
        ScriptCommand command = commands.get(0);
        assertEquals(ScriptCommand.CommandType.CREATE_PSI_STATE, command.getType());
        assertEquals("005", command.getStringParam("psiId"));
        assertEquals(2, command.getIntParam("deltaTime"));
        assertEquals(25, command.getIntParam("x"));
        assertEquals(25, command.getIntParam("y"));
        
        // Verify complex expression was preserved
        String expression = command.getStringParam("expression");
        assertTrue(expression.contains("USE(ITEM, AvantWorldBlade"));
        assertTrue(expression.contains("BATTLE(HERO Arthur, CREATURE Dragon)"));
        assertTrue(expression.contains("∧"));
    }
    
    @Test
    void testTimelineBranching() {
        // Test timeline branching syntax
        String script = "ψ006: ⊙(Δt+1 @30,30 ⟶ FORK(TIMELINE, ℬ2))";
        List<ScriptCommand> commands = parser.parseScript(script);
        
        assertEquals(1, commands.size());
        ScriptCommand command = commands.get(0);
        assertEquals(ScriptCommand.CommandType.CREATE_PSI_STATE, command.getType());
        assertEquals("006", command.getStringParam("psiId"));
        assertEquals(1, command.getIntParam("deltaTime"));
        assertEquals(30, command.getIntParam("x"));
        assertEquals(30, command.getIntParam("y"));
        assertEquals("FORK", command.getStringParam("actionType"));
        assertTrue(command.getStringParam("expression").contains("ℬ2"));
    }
    
    @Test
    void testCoordinateParsingVariations() {
        // Test different coordinate formats
        String[] scripts = {
            "MOV(Arthur, @10,15)",
            "MOV(Arthur, @100,200)",
            "MOV(Arthur, @0,0)",
            "CREATE(CREATURE, Dragon, @126,65)"
        };
        
        int[][] expectedCoords = {
            {10, 15},
            {100, 200},
            {0, 0},
            {126, 65}
        };
        
        for (int i = 0; i < scripts.length; i++) {
            List<ScriptCommand> commands = parser.parseScript(scripts[i]);
            assertEquals(1, commands.size());
            ScriptCommand command = commands.get(0);
            assertEquals(expectedCoords[i][0], command.getIntParam("x"));
            assertEquals(expectedCoords[i][1], command.getIntParam("y"));
        }
    }
    
    @Test
    void testDeltaTimeVariations() {
        // Test different delta time formats
        String[] scripts = {
            "ψ007: ⊙(Δt+1 @10,10 ⟶ MOV(HERO, Arthur, @10,10))",
            "ψ008: ⊙(Δt+5 @10,10 ⟶ MOV(HERO, Arthur, @10,10))",
            "ψ009: ⊙(Δt+10 @10,10 ⟶ MOV(HERO, Arthur, @10,10))"
        };
        
        int[] expectedDeltas = {1, 5, 10};
        
        for (int i = 0; i < scripts.length; i++) {
            List<ScriptCommand> commands = parser.parseScript(scripts[i]);
            assertEquals(1, commands.size());
            ScriptCommand command = commands.get(0);
            assertEquals(expectedDeltas[i], command.getIntParam("deltaTime"));
        }
    }
    
    @Test
    void testErrorHandling() {
        // Test invalid command handling
        String invalidScript = "INVALID_COMMAND(test)";
        List<ScriptCommand> commands = parser.parseScript(invalidScript);
        
        // Should return empty list or error command
        assertTrue(commands.isEmpty() || commands.get(0).getType() == ScriptCommand.CommandType.ERROR);
    }
    
    @Test
    void testCommentHandling() {
        // Test comment parsing
        String script = """
            // This is a comment
            HERO(Arthur)
            // Another comment
            MOV(Arthur, @10,10)
            """;
        
        List<ScriptCommand> commands = parser.parseScript(script);
        
        // Should ignore comments and parse only actual commands
        assertEquals(2, commands.size());
        assertEquals(ScriptCommand.CommandType.HERO, commands.get(0).getType());
        assertEquals(ScriptCommand.CommandType.MOV, commands.get(1).getType());
    }
    
    @Test
    void testEmptyAndWhitespaceHandling() {
        // Test empty script and whitespace handling
        String emptyScript = "";
        List<ScriptCommand> commands1 = parser.parseScript(emptyScript);
        assertTrue(commands1.isEmpty());
        
        String whitespaceScript = "   \n\t  \n  ";
        List<ScriptCommand> commands2 = parser.parseScript(whitespaceScript);
        assertTrue(commands2.isEmpty());
        
        String mixedScript = """
            
            HERO(Arthur)
            
            MOV(Arthur, @10,10)
            
            """;
        List<ScriptCommand> commands3 = parser.parseScript(mixedScript);
        assertEquals(2, commands3.size());
    }
    
    @Test
    void testUnicodeSymbolPreservation() {
        // Test that Unicode symbols are preserved correctly
        String script = "ψ010: ⊙(Δt+2 @40,40 ⟶ CREATE(CREATURE, Dragon))";
        List<ScriptCommand> commands = parser.parseScript(script);
        
        assertEquals(1, commands.size());
        ScriptCommand command = commands.get(0);
        
        // Verify original expression is preserved
        String originalExpression = command.getStringParam("originalExpression");
        if (originalExpression != null) {
            assertTrue(originalExpression.contains("ψ"));
            assertTrue(originalExpression.contains("⊙"));
            assertTrue(originalExpression.contains("Δt"));
            assertTrue(originalExpression.contains("⟶"));
        }
    }
    
    @Test
    void testComplexObservationTrigger() {
        // Test complex observation trigger
        String script = "Π(Arthur enters @50,50 at Δt+3 ∧ Ragnar at distance <5) ⇒ †ψ010";
        List<ScriptCommand> commands = parser.parseScript(script);
        
        assertEquals(1, commands.size());
        ScriptCommand command = commands.get(0);
        assertEquals(ScriptCommand.CommandType.OBSERVATION_TRIGGER, command.getType());
        
        // Verify complex condition parsing
        String condition = command.getStringParam("condition");
        if (condition != null) {
            assertTrue(condition.contains("Arthur"));
            assertTrue(condition.contains("Ragnar"));
            assertTrue(condition.contains("distance"));
        }
    }
    
    @Test
    void testParameterExtraction() {
        // Test parameter extraction from various commands
        String script = "CREATE(BUILDING, Castle, @100,100, PLAYER:player1)";
        List<ScriptCommand> commands = parser.parseScript(script);
        
        assertEquals(1, commands.size());
        ScriptCommand command = commands.get(0);
        
        // Test parameter getter methods
        assertEquals("BUILDING", command.getStringParam("type"));
        assertEquals("Castle", command.getStringParam("name"));
        assertEquals(100, command.getIntParam("x"));
        assertEquals(100, command.getIntParam("y"));
        assertEquals("player1", command.getStringParam("player"));
        
        // Test parameter map
        Map<String, Object> params = command.getParameters();
        assertNotNull(params);
        assertTrue(params.containsKey("type"));
        assertTrue(params.containsKey("name"));
        assertTrue(params.containsKey("x"));
        assertTrue(params.containsKey("y"));
    }
    
    @Test
    void testCommandDocumentation() {
        // Test that parser can provide command documentation
        String documentation = parser.getCommandDocumentation();
        
        assertNotNull(documentation);
        assertFalse(documentation.isEmpty());
        
        // Verify documentation contains key elements
        assertTrue(documentation.contains("HERO"));
        assertTrue(documentation.contains("MOV"));
        assertTrue(documentation.contains("ψ"));
        assertTrue(documentation.contains("⊙"));
        assertTrue(documentation.contains("†"));
        assertTrue(documentation.contains("Π"));
    }
} 