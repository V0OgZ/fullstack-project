package com.heroesoftimeporal.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

/**
 * 🕰️ Timeline - Manages a temporal branch (ℬn) with its ψ-states and events
 * 
 * Each timeline represents a branch of reality where events can occur.
 * Multiple timelines can exist simultaneously until they collapse.
 */
public class Timeline {
    
    @JsonProperty("branchId")
    private String branchId;  // ℬ1, ℬ2, etc.
    
    @JsonProperty("currentTurn")
    private int currentTurn;
    
    @JsonProperty("psiStates")
    private Map<String, PsiState> psiStates;
    
    @JsonProperty("events")
    private List<TemporalEvent> events;
    
    @JsonProperty("createdAt")
    private LocalDateTime createdAt;
    
    @JsonProperty("active")
    private boolean active;
    
    @JsonProperty("collapsed")
    private boolean collapsed;
    
    @JsonProperty("parentBranch")
    private String parentBranch;
    
    @JsonProperty("collapseReason")
    private String collapseReason;
    
    // Constructors
    public Timeline() {
        this.psiStates = new ConcurrentHashMap<>();
        this.events = new ArrayList<>();
        this.createdAt = LocalDateTime.now();
        this.active = true;
        this.collapsed = false;
        this.currentTurn = 0;
    }
    
    public Timeline(String branchId) {
        this();
        this.branchId = branchId;
    }
    
    public Timeline(String branchId, String parentBranch) {
        this(branchId);
        this.parentBranch = parentBranch;
    }
    
    // Add a ψ-state to this timeline
    public void addPsiState(PsiState psiState) {
        psiState.setBranch(this.branchId);
        psiState.setTriggerTurn(this.currentTurn + psiState.getDeltaTime());
        this.psiStates.put(psiState.getId(), psiState);
        
        // Log the addition
        addEvent(new TemporalEvent(
            TemporalEvent.EventType.PSI_CREATED,
            "ψ-state created: " + psiState.getId(),
            psiState.getTargetX(),
            psiState.getTargetY()
        ));
    }
    
    // Get all active ψ-states
    public List<PsiState> getActivePsiStates() {
        return psiStates.values().stream()
                .filter(psi -> psi.getStatus() == PsiState.PsiStatus.ACTIVE)
                .sorted(Comparator.comparingInt(PsiState::getTriggerTurn))
                .toList();
    }
    
    // Get ψ-states that should trigger this turn
    public List<PsiState> getPsiStatesToTrigger() {
        return psiStates.values().stream()
                .filter(psi -> psi.shouldTrigger(currentTurn))
                .toList();
    }
    
    // Collapse a specific ψ-state
    public void collapsePsiState(String psiId, String reason) {
        PsiState psi = psiStates.get(psiId);
        if (psi != null) {
            psi.collapse(reason);
            addEvent(new TemporalEvent(
                TemporalEvent.EventType.PSI_COLLAPSED,
                "†" + psiId + " collapsed: " + reason,
                psi.getTargetX(),
                psi.getTargetY()
            ));
        }
    }
    
    // Advance timeline by one turn
    public void advanceTurn() {
        this.currentTurn++;
        addEvent(new TemporalEvent(
            TemporalEvent.EventType.TURN_ADVANCED,
            "Turn advanced to " + currentTurn,
            -1, -1
        ));
    }
    
    // Check for conflicts with another timeline
    public List<ConflictZone> detectConflicts(Timeline other) {
        List<ConflictZone> conflicts = new ArrayList<>();
        
        // Check for ψ-states affecting same coordinates at same time
        for (PsiState thisPsi : this.getActivePsiStates()) {
            for (PsiState otherPsi : other.getActivePsiStates()) {
                if (thisPsi.getTriggerTurn() == otherPsi.getTriggerTurn() &&
                    thisPsi.getTargetX() == otherPsi.getTargetX() &&
                    thisPsi.getTargetY() == otherPsi.getTargetY()) {
                    
                    conflicts.add(new ConflictZone(
                        thisPsi.getTargetX(),
                        thisPsi.getTargetY(),
                        thisPsi.getTriggerTurn(),
                        Arrays.asList(thisPsi, otherPsi)
                    ));
                }
            }
        }
        
        return conflicts;
    }
    
    // Collapse this entire timeline
    public void collapse(String reason) {
        this.collapsed = true;
        this.active = false;
        this.collapseReason = reason;
        
        // Collapse all ψ-states
        for (PsiState psi : psiStates.values()) {
            if (!psi.isCollapsed()) {
                psi.collapse("Timeline collapsed: " + reason);
            }
        }
        
        addEvent(new TemporalEvent(
            TemporalEvent.EventType.TIMELINE_COLLAPSED,
            "Timeline " + branchId + " collapsed: " + reason,
            -1, -1
        ));
    }
    
    // Add an event to this timeline
    public void addEvent(TemporalEvent event) {
        event.setTurn(this.currentTurn);
        event.setBranch(this.branchId);
        this.events.add(event);
    }
    
    // Get recent events
    public List<TemporalEvent> getRecentEvents(int count) {
        return events.stream()
                .sorted(Comparator.comparing(TemporalEvent::getTimestamp).reversed())
                .limit(count)
                .toList();
    }
    
    // Fork this timeline into a new branch
    public Timeline fork(String newBranchId) {
        Timeline newTimeline = new Timeline(newBranchId, this.branchId);
        newTimeline.currentTurn = this.currentTurn;
        
        // Copy active ψ-states
        for (PsiState psi : this.getActivePsiStates()) {
            PsiState newPsi = new PsiState(psi.getId() + "_" + newBranchId, 
                                         psi.getExpression(), 
                                         newBranchId);
            newPsi.setDeltaTime(psi.getDeltaTime());
            newPsi.setTargetX(psi.getTargetX());
            newPsi.setTargetY(psi.getTargetY());
            newPsi.setAction(psi.getAction());
            newPsi.setParameters(psi.getParameters());
            newPsi.setTriggerTurn(psi.getTriggerTurn());
            newTimeline.psiStates.put(newPsi.getId(), newPsi);
        }
        
        newTimeline.addEvent(new TemporalEvent(
            TemporalEvent.EventType.TIMELINE_FORKED,
            "Timeline forked from " + this.branchId,
            -1, -1
        ));
        
        return newTimeline;
    }
    
    // Getters and Setters
    public String getBranchId() { return branchId; }
    public void setBranchId(String branchId) { this.branchId = branchId; }
    
    public int getCurrentTurn() { return currentTurn; }
    public void setCurrentTurn(int currentTurn) { this.currentTurn = currentTurn; }
    
    public Map<String, PsiState> getPsiStates() { return psiStates; }
    public void setPsiStates(Map<String, PsiState> psiStates) { this.psiStates = psiStates; }
    
    public List<TemporalEvent> getEvents() { return events; }
    public void setEvents(List<TemporalEvent> events) { this.events = events; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public boolean isActive() { return active; }
    public void setActive(boolean active) { this.active = active; }
    
    public boolean isCollapsed() { return collapsed; }
    public void setCollapsed(boolean collapsed) { this.collapsed = collapsed; }
    
    public String getParentBranch() { return parentBranch; }
    public void setParentBranch(String parentBranch) { this.parentBranch = parentBranch; }
    
    public String getCollapseReason() { return collapseReason; }
    public void setCollapseReason(String collapseReason) { this.collapseReason = collapseReason; }
    
    @Override
    public String toString() {
        return String.format("Timeline[%s] turn:%d, ψ:%d, events:%d, active:%b", 
                           branchId, currentTurn, psiStates.size(), events.size(), active);
    }
}