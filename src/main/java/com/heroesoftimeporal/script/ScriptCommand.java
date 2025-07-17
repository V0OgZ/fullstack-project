package com.heroesoftimeporal.script;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.Map;
import java.util.HashMap;
import java.util.Objects;

/**
 * 📜 ScriptCommand - Represents a parsed command from the temporal script language
 * 
 * Each command has a type, action, and parameters that can be executed
 * by the QuantumScriptEngine.
 */
public class ScriptCommand {
    
    @JsonProperty("type")
    private CommandType type;
    
    @JsonProperty("action")
    private String action;
    
    @JsonProperty("parameters")
    private Map<String, Object> parameters;
    
    @JsonProperty("lineNumber")
    private int lineNumber;
    
    @JsonProperty("originalLine")
    private String originalLine;
    
    public enum CommandType {
        // Basic commands
        CREATE_HERO,        // HERO(Arthur)
        MOVE_HERO,          // MOV(Arthur, @125,64)
        CREATE_ENTITY,      // CREATE(CREATURE, Dragon, @126,65)
        BATTLE,             // BATTLE(Arthur, Enemy)
        END_TURN,           // END_TURN
        WAIT,               // WAIT(1000)
        LOG,                // LOG("Message")
        
        // Quantum temporal commands
        CREATE_PSI_STATE,   // ψ001: ⊙(Δt+2 @126,65 ⟶ CREATE(CREATURE, Dragon))
        COLLAPSE_PSI_STATE, // †ψ001
        OBSERVATION_TRIGGER, // Π(Player2 enters @126,65) ⇒ †ψ001
        
        // Temporal artifacts
        USE_ARTIFACT,       // USE(ITEM, AvantWorldBlade, HERO:Arthur)
        
        // Control flow
        BRANCH_TIMELINE,    // Branch to new timeline
        MERGE_TIMELINE,     // Merge timelines
        
        // Unknown/error
        UNKNOWN
    }
    
    // Constructors
    public ScriptCommand() {
        this.parameters = new HashMap<>();
    }
    
    public ScriptCommand(CommandType type, Map<String, Object> parameters) {
        this.type = type;
        this.parameters = parameters != null ? parameters : new HashMap<>();
    }
    
    public ScriptCommand(CommandType type, String action, Map<String, Object> parameters) {
        this.type = type;
        this.action = action;
        this.parameters = parameters != null ? parameters : new HashMap<>();
    }
    
    // Convenience methods for getting typed parameters
    public String getStringParam(String key) {
        Object value = parameters.get(key);
        return value != null ? value.toString() : null;
    }
    
    public Integer getIntParam(String key) {
        Object value = parameters.get(key);
        if (value instanceof Integer) {
            return (Integer) value;
        } else if (value instanceof String) {
            try {
                return Integer.parseInt((String) value);
            } catch (NumberFormatException e) {
                return null;
            }
        }
        return null;
    }
    
    public Boolean getBooleanParam(String key) {
        Object value = parameters.get(key);
        if (value instanceof Boolean) {
            return (Boolean) value;
        } else if (value instanceof String) {
            return Boolean.parseBoolean((String) value);
        }
        return null;
    }
    
    public Object getParam(String key) {
        return parameters.get(key);
    }
    
    // Add a parameter
    public void addParam(String key, Object value) {
        this.parameters.put(key, value);
    }
    
    // Check if command has a specific parameter
    public boolean hasParam(String key) {
        return parameters.containsKey(key);
    }
    
    // Get coordinates if present
    public int[] getCoordinates() {
        Integer x = getIntParam("x");
        Integer y = getIntParam("y");
        
        if (x != null && y != null) {
            return new int[]{x, y};
        }
        
        return null;
    }
    
    // Check if this is a quantum command (involves ψ-states)
    public boolean isQuantumCommand() {
        return type == CommandType.CREATE_PSI_STATE || 
               type == CommandType.COLLAPSE_PSI_STATE || 
               type == CommandType.OBSERVATION_TRIGGER;
    }
    
    // Check if this is a temporal artifact command
    public boolean isTemporalArtifactCommand() {
        return type == CommandType.USE_ARTIFACT;
    }
    
    // Check if this command affects a specific coordinate
    public boolean affectsCoordinate(int x, int y) {
        int[] coords = getCoordinates();
        return coords != null && coords[0] == x && coords[1] == y;
    }
    
    // Get a human-readable description of the command
    public String getDescription() {
        StringBuilder desc = new StringBuilder();
        
        switch (type) {
            case CREATE_HERO:
                desc.append("Create hero: ").append(getStringParam("param0"));
                break;
            case MOVE_HERO:
                desc.append("Move hero ").append(getStringParam("param0"));
                int[] coords = getCoordinates();
                if (coords != null) {
                    desc.append(" to @").append(coords[0]).append(",").append(coords[1]);
                }
                break;
            case CREATE_ENTITY:
                desc.append("Create ").append(getStringParam("param0"))
                    .append(" ").append(getStringParam("param1"));
                break;
            case BATTLE:
                desc.append("Battle: ").append(getStringParam("param0"))
                    .append(" vs ").append(getStringParam("param1"));
                break;
            case CREATE_PSI_STATE:
                desc.append("Create ψ-state ").append(getStringParam("psiId"))
                    .append(" (Δt+").append(getIntParam("deltaTime")).append(")");
                break;
            case COLLAPSE_PSI_STATE:
                desc.append("Collapse ψ").append(getStringParam("psiId"));
                break;
            case USE_ARTIFACT:
                desc.append("Use artifact ").append(getStringParam("artifactName"))
                    .append(" with hero ").append(getStringParam("heroId"));
                break;
            case LOG:
                desc.append("Log: ").append(getStringParam("param0"));
                break;
            case WAIT:
                desc.append("Wait ").append(getIntParam("param0")).append("ms");
                break;
            case END_TURN:
                desc.append("End turn");
                break;
            default:
                desc.append("Unknown command: ").append(action);
        }
        
        return desc.toString();
    }
    
    // Get command execution priority (lower = higher priority)
    public int getPriority() {
        return switch (type) {
            case COLLAPSE_PSI_STATE -> 1;      // Highest priority
            case OBSERVATION_TRIGGER -> 2;
            case USE_ARTIFACT -> 3;
            case CREATE_PSI_STATE -> 4;
            case BATTLE -> 5;
            case MOVE_HERO -> 6;
            case CREATE_ENTITY -> 7;
            case CREATE_HERO -> 8;
            case LOG -> 9;
            case WAIT -> 10;
            case END_TURN -> 11;               // Lowest priority
            default -> 99;
        };
    }
    
    // Getters and Setters
    public CommandType getType() { return type; }
    public void setType(CommandType type) { this.type = type; }
    
    public String getAction() { return action; }
    public void setAction(String action) { this.action = action; }
    
    public Map<String, Object> getParameters() { return parameters; }
    public void setParameters(Map<String, Object> parameters) { this.parameters = parameters; }
    
    public int getLineNumber() { return lineNumber; }
    public void setLineNumber(int lineNumber) { this.lineNumber = lineNumber; }
    
    public String getOriginalLine() { return originalLine; }
    public void setOriginalLine(String originalLine) { this.originalLine = originalLine; }
    
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ScriptCommand that = (ScriptCommand) o;
        return type == that.type && 
               Objects.equals(action, that.action) && 
               Objects.equals(parameters, that.parameters);
    }
    
    @Override
    public int hashCode() {
        return Objects.hash(type, action, parameters);
    }
    
    @Override
    public String toString() {
        return String.format("ScriptCommand[%s] %s %s", 
                           type, action != null ? action : "", 
                           parameters.isEmpty() ? "" : parameters.toString());
    }
}