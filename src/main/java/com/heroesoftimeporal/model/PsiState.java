package com.heroesoftimeporal.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.LocalDateTime;
import java.util.Objects;

/**
 * 🧠 PsiState - Represents a quantum superposition state in the temporal engine
 * 
 * A PsiState (ψ) represents an action or event that exists in quantum superposition
 * until it collapses into reality through observation or interaction.
 * 
 * Format: ψ001: ⊙(Δt+2 @126,65 ⟶ CREATE(CREATURE, Dragon))
 */
public class PsiState {
    
    @JsonProperty("id")
    private String id;
    
    @JsonProperty("expression")
    private String expression;
    
    @JsonProperty("branch")
    private String branch;  // ℬ1, ℬ2, etc.
    
    @JsonProperty("deltaTime")
    private int deltaTime;  // Δt+n
    
    @JsonProperty("targetX")
    private int targetX;
    
    @JsonProperty("targetY")
    private int targetY;
    
    @JsonProperty("action")
    private String action;  // MOV, CREATE, BATTLE, etc.
    
    @JsonProperty("parameters")
    private String parameters;
    
    @JsonProperty("probability")
    private double probability;
    
    @JsonProperty("status")
    private PsiStatus status;
    
    @JsonProperty("createdAt")
    private LocalDateTime createdAt;
    
    @JsonProperty("triggerTurn")
    private int triggerTurn;
    
    @JsonProperty("collapsed")
    private boolean collapsed;
    
    @JsonProperty("collapseReason")
    private String collapseReason;
    
    public enum PsiStatus {
        ACTIVE,      // ψ is active and waiting
        TRIGGERED,   // ψ has been triggered
        COLLAPSED,   // † collapse occurred
        CANCELLED    // ψ was cancelled/invalidated
    }
    
    // Constructors
    public PsiState() {
        this.probability = 1.0;
        this.status = PsiStatus.ACTIVE;
        this.createdAt = LocalDateTime.now();
        this.collapsed = false;
    }
    
    public PsiState(String id, String expression, String branch) {
        this();
        this.id = id;
        this.expression = expression;
        this.branch = branch;
    }
    
    // Factory method for parsing temporal expressions
    public static PsiState fromExpression(String id, String expression, String branch) {
        PsiState psi = new PsiState(id, expression, branch);
        
        // Parse expression: ⊙(Δt+2 @126,65 ⟶ CREATE(CREATURE, Dragon))
        try {
            // Extract deltaTime (Δt+n)
            if (expression.contains("Δt+")) {
                String deltaStr = expression.substring(expression.indexOf("Δt+") + 3);
                deltaStr = deltaStr.substring(0, deltaStr.indexOf(" "));
                psi.deltaTime = Integer.parseInt(deltaStr);
            }
            
            // Extract coordinates (@x,y)
            if (expression.contains("@")) {
                String coordStr = expression.substring(expression.indexOf("@") + 1);
                coordStr = coordStr.substring(0, coordStr.indexOf(" "));
                String[] coords = coordStr.split(",");
                psi.targetX = Integer.parseInt(coords[0]);
                psi.targetY = Integer.parseInt(coords[1]);
            }
            
            // Extract action (after ⟶)
            if (expression.contains("⟶")) {
                String actionStr = expression.substring(expression.indexOf("⟶") + 1).trim();
                if (actionStr.endsWith(")")) {
                    actionStr = actionStr.substring(0, actionStr.length() - 1);
                }
                
                // Split action and parameters
                if (actionStr.contains("(")) {
                    psi.action = actionStr.substring(0, actionStr.indexOf("("));
                    psi.parameters = actionStr.substring(actionStr.indexOf("(") + 1);
                } else {
                    psi.action = actionStr;
                    psi.parameters = "";
                }
            }
            
        } catch (Exception e) {
            System.err.println("⚠️ Error parsing PsiState expression: " + expression);
            e.printStackTrace();
        }
        
        return psi;
    }
    
    // Collapse this ψ-state
    public void collapse(String reason) {
        this.collapsed = true;
        this.status = PsiStatus.COLLAPSED;
        this.collapseReason = reason;
    }
    
    // Check if this ψ should trigger at given turn
    public boolean shouldTrigger(int currentTurn) {
        return !collapsed && 
               status == PsiStatus.ACTIVE && 
               currentTurn >= triggerTurn;
    }
    
    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    
    public String getExpression() { return expression; }
    public void setExpression(String expression) { this.expression = expression; }
    
    public String getBranch() { return branch; }
    public void setBranch(String branch) { this.branch = branch; }
    
    public int getDeltaTime() { return deltaTime; }
    public void setDeltaTime(int deltaTime) { this.deltaTime = deltaTime; }
    
    public int getTargetX() { return targetX; }
    public void setTargetX(int targetX) { this.targetX = targetX; }
    
    public int getTargetY() { return targetY; }
    public void setTargetY(int targetY) { this.targetY = targetY; }
    
    public String getAction() { return action; }
    public void setAction(String action) { this.action = action; }
    
    public String getParameters() { return parameters; }
    public void setParameters(String parameters) { this.parameters = parameters; }
    
    public double getProbability() { return probability; }
    public void setProbability(double probability) { this.probability = probability; }
    
    public PsiStatus getStatus() { return status; }
    public void setStatus(PsiStatus status) { this.status = status; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public int getTriggerTurn() { return triggerTurn; }
    public void setTriggerTurn(int triggerTurn) { this.triggerTurn = triggerTurn; }
    
    public boolean isCollapsed() { return collapsed; }
    public void setCollapsed(boolean collapsed) { this.collapsed = collapsed; }
    
    public String getCollapseReason() { return collapseReason; }
    public void setCollapseReason(String collapseReason) { this.collapseReason = collapseReason; }
    
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PsiState psiState = (PsiState) o;
        return Objects.equals(id, psiState.id);
    }
    
    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
    
    @Override
    public String toString() {
        return String.format("ψ%s: %s [%s] (turn: %d, collapsed: %b)", 
                           id, expression, status, triggerTurn, collapsed);
    }
}