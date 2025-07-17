package com.heroesoftimeporal.script;

import com.heroesoftimeporal.model.*;
import org.springframework.stereotype.Component;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * 🧠 TemporalScriptParser - Parses quantum temporal script language
 * 
 * Supports full temporal grammar:
 * - Basic: HERO(Arthur), MOV(Arthur, @125,64), CREATE(CREATURE, Dragon)
 * - Quantum: ψ001: ⊙(Δt+2 @126,65 ⟶ CREATE(CREATURE, Dragon))
 * - Collapse: Π(Player2 enters @126,65) ⇒ †ψ001
 * - Artifacts: USE(ITEM, AvantWorldBlade, HERO:Arthur)
 */
@Component
public class TemporalScriptParser {
    
    // Regex patterns for different script elements
    private static final Pattern PSI_PATTERN = Pattern.compile(
        "ψ(\\w+):\\s*⊙\\(Δt\\+(\\d+)\\s+@(\\d+),(\\d+)\\s+⟶\\s+(.+)\\)"
    );
    
    private static final Pattern COLLAPSE_PATTERN = Pattern.compile(
        "†ψ(\\w+)(?:\\s+(.+))?"
    );
    
    private static final Pattern OBSERVATION_PATTERN = Pattern.compile(
        "Π\\((.+)\\)\\s*⇒\\s*†ψ(\\w+)"
    );
    
    private static final Pattern BASIC_COMMAND_PATTERN = Pattern.compile(
        "(\\w+)\\((.+)\\)"
    );
    
    private static final Pattern COORDINATE_PATTERN = Pattern.compile(
        "@(\\d+),(\\d+)"
    );
    
    private static final Pattern USE_ARTIFACT_PATTERN = Pattern.compile(
        "USE\\(ITEM,\\s*(\\w+),\\s*HERO:(\\w+)\\)"
    );
    
    // Parse a complete script into executable commands
    public List<ScriptCommand> parseScript(String script) {
        List<ScriptCommand> commands = new ArrayList<>();
        
        String[] lines = script.split("\n");
        for (String line : lines) {
            line = line.trim();
            
            // Skip empty lines and comments
            if (line.isEmpty() || line.startsWith("//")) {
                continue;
            }
            
            ScriptCommand command = parseLine(line);
            if (command != null) {
                commands.add(command);
            }
        }
        
        return commands;
    }
    
    // Parse a single line of script
    public ScriptCommand parseLine(String line) {
        line = line.trim();
        
        // Try to parse as ψ-state creation
        Matcher psiMatcher = PSI_PATTERN.matcher(line);
        if (psiMatcher.matches()) {
            return parsePsiStateCreation(psiMatcher);
        }
        
        // Try to parse as collapse command
        Matcher collapseMatcher = COLLAPSE_PATTERN.matcher(line);
        if (collapseMatcher.matches()) {
            return parseCollapseCommand(collapseMatcher);
        }
        
        // Try to parse as observation trigger
        Matcher observationMatcher = OBSERVATION_PATTERN.matcher(line);
        if (observationMatcher.matches()) {
            return parseObservationTrigger(observationMatcher);
        }
        
        // Try to parse as artifact usage
        Matcher artifactMatcher = USE_ARTIFACT_PATTERN.matcher(line);
        if (artifactMatcher.matches()) {
            return parseArtifactUsage(artifactMatcher);
        }
        
        // Try to parse as basic command
        Matcher basicMatcher = BASIC_COMMAND_PATTERN.matcher(line);
        if (basicMatcher.matches()) {
            return parseBasicCommand(basicMatcher);
        }
        
        System.err.println("⚠️ Could not parse line: " + line);
        return null;
    }
    
    // Parse ψ-state creation: ψ001: ⊙(Δt+2 @126,65 ⟶ CREATE(CREATURE, Dragon))
    private ScriptCommand parsePsiStateCreation(Matcher matcher) {
        String psiId = matcher.group(1);
        int deltaTime = Integer.parseInt(matcher.group(2));
        int x = Integer.parseInt(matcher.group(3));
        int y = Integer.parseInt(matcher.group(4));
        String action = matcher.group(5);
        
        // Parse the action part
        ScriptCommand actionCommand = parseLine(action);
        if (actionCommand == null) {
            System.err.println("⚠️ Could not parse action in ψ-state: " + action);
            return null;
        }
        
        Map<String, Object> params = new HashMap<>();
        params.put("psiId", psiId);
        params.put("deltaTime", deltaTime);
        params.put("x", x);
        params.put("y", y);
        params.put("action", actionCommand.getAction());
        params.put("actionParams", actionCommand.getParameters());
        
        return new ScriptCommand(ScriptCommand.CommandType.CREATE_PSI_STATE, params);
    }
    
    // Parse collapse command: †ψ001
    private ScriptCommand parseCollapseCommand(Matcher matcher) {
        String psiId = matcher.group(1);
        String reason = matcher.group(2);
        
        Map<String, Object> params = new HashMap<>();
        params.put("psiId", psiId);
        params.put("reason", reason != null ? reason : "Manual collapse");
        
        return new ScriptCommand(ScriptCommand.CommandType.COLLAPSE_PSI_STATE, params);
    }
    
    // Parse observation trigger: Π(Player2 enters @126,65) ⇒ †ψ001
    private ScriptCommand parseObservationTrigger(Matcher matcher) {
        String observation = matcher.group(1);
        String psiId = matcher.group(2);
        
        Map<String, Object> params = new HashMap<>();
        params.put("observation", observation);
        params.put("psiId", psiId);
        
        return new ScriptCommand(ScriptCommand.CommandType.OBSERVATION_TRIGGER, params);
    }
    
    // Parse artifact usage: USE(ITEM, AvantWorldBlade, HERO:Arthur)
    private ScriptCommand parseArtifactUsage(Matcher matcher) {
        String artifactName = matcher.group(1);
        String heroId = matcher.group(2);
        
        Map<String, Object> params = new HashMap<>();
        params.put("artifactName", artifactName);
        params.put("heroId", heroId);
        
        return new ScriptCommand(ScriptCommand.CommandType.USE_ARTIFACT, params);
    }
    
    // Parse basic command: HERO(Arthur), MOV(Arthur, @125,64), etc.
    private ScriptCommand parseBasicCommand(Matcher matcher) {
        String command = matcher.group(1);
        String paramString = matcher.group(2);
        
        Map<String, Object> params = parseParameters(paramString);
        
        ScriptCommand.CommandType type = switch (command.toUpperCase()) {
            case "HERO" -> ScriptCommand.CommandType.CREATE_HERO;
            case "MOV", "MOVE" -> ScriptCommand.CommandType.MOVE_HERO;
            case "CREATE" -> ScriptCommand.CommandType.CREATE_ENTITY;
            case "BATTLE" -> ScriptCommand.CommandType.BATTLE;
            case "END_TURN" -> ScriptCommand.CommandType.END_TURN;
            case "WAIT" -> ScriptCommand.CommandType.WAIT;
            case "LOG" -> ScriptCommand.CommandType.LOG;
            default -> ScriptCommand.CommandType.UNKNOWN;
        };
        
        return new ScriptCommand(type, command, params);
    }
    
    // Parse parameters from a parameter string
    private Map<String, Object> parseParameters(String paramString) {
        Map<String, Object> params = new HashMap<>();
        
        // Split by comma, but respect parentheses and quotes
        List<String> paramList = splitParameters(paramString);
        
        for (int i = 0; i < paramList.size(); i++) {
            String param = paramList.get(i).trim();
            
            // Check for coordinates
            Matcher coordMatcher = COORDINATE_PATTERN.matcher(param);
            if (coordMatcher.find()) {
                params.put("x", Integer.parseInt(coordMatcher.group(1)));
                params.put("y", Integer.parseInt(coordMatcher.group(2)));
                continue;
            }
            
            // Check for hero reference
            if (param.startsWith("HERO:")) {
                params.put("heroId", param.substring(5));
                continue;
            }
            
            // Store as positional parameter
            params.put("param" + i, param);
        }
        
        return params;
    }
    
    // Split parameters respecting parentheses and quotes
    private List<String> splitParameters(String paramString) {
        List<String> params = new ArrayList<>();
        StringBuilder current = new StringBuilder();
        int parenthesesLevel = 0;
        boolean inQuotes = false;
        
        for (char c : paramString.toCharArray()) {
            if (c == '"' && !inQuotes) {
                inQuotes = true;
                current.append(c);
            } else if (c == '"' && inQuotes) {
                inQuotes = false;
                current.append(c);
            } else if (c == '(' && !inQuotes) {
                parenthesesLevel++;
                current.append(c);
            } else if (c == ')' && !inQuotes) {
                parenthesesLevel--;
                current.append(c);
            } else if (c == ',' && parenthesesLevel == 0 && !inQuotes) {
                params.add(current.toString().trim());
                current = new StringBuilder();
            } else {
                current.append(c);
            }
        }
        
        if (current.length() > 0) {
            params.add(current.toString().trim());
        }
        
        return params;
    }
    
    // Create a PsiState from parsed parameters
    public PsiState createPsiState(String psiId, int deltaTime, int x, int y, String action, Map<String, Object> actionParams) {
        // Build the expression string
        StringBuilder expression = new StringBuilder();
        expression.append("⊙(Δt+").append(deltaTime).append(" @").append(x).append(",").append(y).append(" ⟶ ");
        expression.append(action).append("(");
        
        // Add parameters
        boolean first = true;
        for (Map.Entry<String, Object> entry : actionParams.entrySet()) {
            if (!first) expression.append(", ");
            expression.append(entry.getValue());
            first = false;
        }
        
        expression.append("))");
        
        PsiState psi = PsiState.fromExpression(psiId, expression.toString(), "ℬ1");
        return psi;
    }
    
    // Validate script syntax
    public List<String> validateScript(String script) {
        List<String> errors = new ArrayList<>();
        
        String[] lines = script.split("\n");
        for (int i = 0; i < lines.length; i++) {
            String line = lines[i].trim();
            
            if (line.isEmpty() || line.startsWith("//")) {
                continue;
            }
            
            ScriptCommand command = parseLine(line);
            if (command == null) {
                errors.add("Line " + (i + 1) + ": Could not parse - " + line);
            } else if (command.getType() == ScriptCommand.CommandType.UNKNOWN) {
                errors.add("Line " + (i + 1) + ": Unknown command - " + line);
            }
        }
        
        return errors;
    }
    
    // Get supported commands documentation
    public String getCommandDocumentation() {
        return """
            🧠 Temporal Script Language - Command Reference
            
            📜 Basic Commands:
            HERO(Arthur)                    - Create hero
            MOV(Arthur, @125,64)           - Move hero to coordinates
            CREATE(CREATURE, Dragon, @126,65) - Create creature
            BATTLE(Arthur, Enemy)          - Initiate battle
            END_TURN                       - End current turn
            WAIT(1000)                     - Wait milliseconds
            LOG("Message")                 - Log message
            
            🧠 Quantum Commands:
            ψ001: ⊙(Δt+2 @126,65 ⟶ CREATE(CREATURE, Dragon))  - Create ψ-state
            †ψ001                                              - Collapse ψ-state
            Π(Player2 enters @126,65) ⇒ †ψ001                 - Observation trigger
            
            🔮 Temporal Artifacts:
            USE(ITEM, AvantWorldBlade, HERO:Arthur)            - Use temporal artifact
            USE(ITEM, TemporalAnchor, @128,64)                 - Place temporal anchor
            USE(ITEM, ReverseClock, HERO:Arthur)               - Reverse time
            
            📍 Coordinates: @x,y format (e.g., @125,64)
            🎯 Hero Reference: HERO:name format (e.g., HERO:Arthur)
            💬 Comments: // comment text
            """;
    }
}