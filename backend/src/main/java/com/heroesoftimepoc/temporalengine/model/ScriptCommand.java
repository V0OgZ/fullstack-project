package com.heroesoftimepoc.temporalengine.model;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

/**
 * Représente une commande de script dans le système temporel
 * Utilisée pour stocker les interactions dans les PsiNode
 */
public class ScriptCommand {
    
    private Long id;
    private String commandType;
    private String commandText;
    private PsiNode psiNode;
    private Map<String, String> parameters = new HashMap<>();
    private Integer executionOrder = 0;
    private boolean isExecuted = false;
    private String executionResult;
    private Long createdAt;
    private Long executedAt;
    
    public ScriptCommand() {
        this.createdAt = System.currentTimeMillis();
    }
    
    public ScriptCommand(String commandType, String commandText) {
        this();
        this.commandType = commandType;
        this.commandText = commandText;
    }
    
    public ScriptCommand(String commandType, Map<String, String> parameters) {
        this();
        this.commandType = commandType;
        this.parameters = parameters != null ? new HashMap<>(parameters) : new HashMap<>();
    }
    
    // Méthodes utilitaires
    public void addParameter(String key, String value) {
        this.parameters.put(key, value);
    }
    
    public String getParameter(String key) {
        return this.parameters.get(key);
    }
    
    public boolean hasParameter(String key) {
        return this.parameters.containsKey(key);
    }
    
    public void execute(String result) {
        this.isExecuted = true;
        this.executionResult = result;
        this.executedAt = System.currentTimeMillis();
    }
    
    public boolean isMovementCommand() {
        return "MOV".equals(commandType) || "MOVE".equals(commandType);
    }
    
    public boolean isBattleCommand() {
        return "BATTLE".equals(commandType) || "FIGHT".equals(commandType);
    }
    
    public boolean isCreationCommand() {
        return "CREATE".equals(commandType);
    }
    
    public boolean isTemporalCommand() {
        return commandText != null && commandText.contains("ψ");
    }
    
    @Override
    public String toString() {
        return String.format("ScriptCommand[%s: %s]", commandType, 
                           commandText != null ? commandText : parameters.toString());
    }
    
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ScriptCommand)) return false;
        ScriptCommand that = (ScriptCommand) o;
        return Objects.equals(commandType, that.commandType) &&
               Objects.equals(commandText, that.commandText) &&
               Objects.equals(parameters, that.parameters);
    }
    
    @Override
    public int hashCode() {
        return Objects.hash(commandType, commandText, parameters);
    }
    
    // Getters et Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getCommandType() { return commandType; }
    public void setCommandType(String commandType) { this.commandType = commandType; }
    
    public String getCommandText() { return commandText; }
    public void setCommandText(String commandText) { this.commandText = commandText; }
    
    public PsiNode getPsiNode() { return psiNode; }
    public void setPsiNode(PsiNode psiNode) { this.psiNode = psiNode; }
    
    public Map<String, String> getParameters() { return parameters; }
    public void setParameters(Map<String, String> parameters) { this.parameters = parameters; }
    
    public Integer getExecutionOrder() { return executionOrder; }
    public void setExecutionOrder(Integer executionOrder) { this.executionOrder = executionOrder; }
    
    public boolean isExecuted() { return isExecuted; }
    public void setExecuted(boolean executed) { isExecuted = executed; }
    
    public String getExecutionResult() { return executionResult; }
    public void setExecutionResult(String executionResult) { this.executionResult = executionResult; }
    
    public Long getCreatedAt() { return createdAt; }
    public void setCreatedAt(Long createdAt) { this.createdAt = createdAt; }
    
    public Long getExecutedAt() { return executedAt; }
    public void setExecutedAt(Long executedAt) { this.executedAt = executedAt; }
} 