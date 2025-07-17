package com.heroesoftimeporal.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

/**
 * ⚔️ ConflictZone - Represents a temporal conflict between multiple ψ-states
 * 
 * When two or more ψ-states affect the same coordinates at the same time,
 * a conflict zone is created and must be resolved through collapse.
 */
public class ConflictZone {
    
    @JsonProperty("id")
    private String id;
    
    @JsonProperty("x")
    private int x;
    
    @JsonProperty("y")
    private int y;
    
    @JsonProperty("turn")
    private int turn;
    
    @JsonProperty("conflictingPsiStates")
    private List<PsiState> conflictingPsiStates;
    
    @JsonProperty("resolved")
    private boolean resolved;
    
    @JsonProperty("winner")
    private PsiState winner;
    
    @JsonProperty("resolutionMethod")
    private ResolutionMethod resolutionMethod;
    
    @JsonProperty("createdAt")
    private LocalDateTime createdAt;
    
    @JsonProperty("resolvedAt")
    private LocalDateTime resolvedAt;
    
    @JsonProperty("resolutionReason")
    private String resolutionReason;
    
    public enum ResolutionMethod {
        RANDOM,           // Random selection
        PRIORITY,         // Based on priority/artifact power
        PHANTOM_BATTLE,   // Simulated battle between forces
        TEMPORAL_ANCHOR,  // Temporal anchor artifact
        TIMELINE_MERGE,   // Merge timelines
        MANUAL            // Manual resolution
    }
    
    // Constructors
    public ConflictZone() {
        this.createdAt = LocalDateTime.now();
        this.resolved = false;
        this.id = generateId();
    }
    
    public ConflictZone(int x, int y, int turn, List<PsiState> conflictingPsiStates) {
        this();
        this.x = x;
        this.y = y;
        this.turn = turn;
        this.conflictingPsiStates = conflictingPsiStates;
    }
    
    // Generate a unique ID for the conflict
    private String generateId() {
        return "conflict_" + System.currentTimeMillis() + "_" + 
               (int)(Math.random() * 1000);
    }
    
    // Resolve the conflict using specified method
    public void resolve(ResolutionMethod method, String reason) {
        this.resolutionMethod = method;
        this.resolutionReason = reason;
        this.resolvedAt = LocalDateTime.now();
        
        switch (method) {
            case RANDOM:
                resolveRandomly();
                break;
            case PRIORITY:
                resolveByPriority();
                break;
            case PHANTOM_BATTLE:
                resolveByPhantomBattle();
                break;
            case TEMPORAL_ANCHOR:
                resolveByTemporalAnchor();
                break;
            case TIMELINE_MERGE:
                resolveByTimelineMerge();
                break;
            case MANUAL:
                // Manual resolution - winner must be set externally
                break;
        }
        
        // Collapse losing ψ-states
        for (PsiState psi : conflictingPsiStates) {
            if (psi != winner) {
                psi.collapse("Lost conflict resolution: " + reason);
            }
        }
        
        this.resolved = true;
    }
    
    // Random resolution
    private void resolveRandomly() {
        int randomIndex = (int) (Math.random() * conflictingPsiStates.size());
        this.winner = conflictingPsiStates.get(randomIndex);
    }
    
    // Priority-based resolution (higher probability wins)
    private void resolveByPriority() {
        this.winner = conflictingPsiStates.stream()
                .max((psi1, psi2) -> Double.compare(psi1.getProbability(), psi2.getProbability()))
                .orElse(conflictingPsiStates.get(0));
    }
    
    // Phantom battle resolution (simulate battle between forces)
    private void resolveByPhantomBattle() {
        // Simplified phantom battle - could be extended with actual battle logic
        PsiState battleWinner = null;
        double highestBattleScore = 0;
        
        for (PsiState psi : conflictingPsiStates) {
            double battleScore = calculateBattleScore(psi);
            if (battleScore > highestBattleScore) {
                highestBattleScore = battleScore;
                battleWinner = psi;
            }
        }
        
        this.winner = battleWinner != null ? battleWinner : conflictingPsiStates.get(0);
    }
    
    // Calculate battle score for phantom battle
    private double calculateBattleScore(PsiState psi) {
        // Simplified scoring - could be extended with actual unit stats
        double score = psi.getProbability();
        
        // Bonus for certain actions
        if ("BATTLE".equals(psi.getAction())) {
            score += 0.3;
        } else if ("CREATE".equals(psi.getAction()) && psi.getParameters().contains("Dragon")) {
            score += 0.5;
        }
        
        // Add some randomness
        score += Math.random() * 0.2;
        
        return score;
    }
    
    // Temporal anchor resolution (first in time wins)
    private void resolveByTemporalAnchor() {
        this.winner = conflictingPsiStates.stream()
                .min((psi1, psi2) -> psi1.getCreatedAt().compareTo(psi2.getCreatedAt()))
                .orElse(conflictingPsiStates.get(0));
    }
    
    // Timeline merge resolution (attempt to merge compatible actions)
    private void resolveByTimelineMerge() {
        // For now, just pick the first one
        // In a full implementation, this would attempt to merge compatible actions
        this.winner = conflictingPsiStates.get(0);
    }
    
    // Get conflict severity (more conflicting states = higher severity)
    public int getSeverity() {
        return conflictingPsiStates.size();
    }
    
    // Check if this conflict involves a specific ψ-state
    public boolean involves(PsiState psiState) {
        return conflictingPsiStates.contains(psiState);
    }
    
    // Get a description of the conflict
    public String getDescription() {
        return String.format("Conflict @%d,%d turn %d: %d ψ-states competing", 
                           x, y, turn, conflictingPsiStates.size());
    }
    
    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    
    public int getX() { return x; }
    public void setX(int x) { this.x = x; }
    
    public int getY() { return y; }
    public void setY(int y) { this.y = y; }
    
    public int getTurn() { return turn; }
    public void setTurn(int turn) { this.turn = turn; }
    
    public List<PsiState> getConflictingPsiStates() { return conflictingPsiStates; }
    public void setConflictingPsiStates(List<PsiState> conflictingPsiStates) { 
        this.conflictingPsiStates = conflictingPsiStates; 
    }
    
    public boolean isResolved() { return resolved; }
    public void setResolved(boolean resolved) { this.resolved = resolved; }
    
    public PsiState getWinner() { return winner; }
    public void setWinner(PsiState winner) { this.winner = winner; }
    
    public ResolutionMethod getResolutionMethod() { return resolutionMethod; }
    public void setResolutionMethod(ResolutionMethod resolutionMethod) { 
        this.resolutionMethod = resolutionMethod; 
    }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getResolvedAt() { return resolvedAt; }
    public void setResolvedAt(LocalDateTime resolvedAt) { this.resolvedAt = resolvedAt; }
    
    public String getResolutionReason() { return resolutionReason; }
    public void setResolutionReason(String resolutionReason) { this.resolutionReason = resolutionReason; }
    
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ConflictZone that = (ConflictZone) o;
        return Objects.equals(id, that.id);
    }
    
    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
    
    @Override
    public String toString() {
        return String.format("ConflictZone[%s] @%d,%d turn %d: %d conflicts, resolved: %b", 
                           id, x, y, turn, conflictingPsiStates.size(), resolved);
    }
}