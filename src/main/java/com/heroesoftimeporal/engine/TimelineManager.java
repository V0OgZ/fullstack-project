package com.heroesoftimeporal.engine;

import com.heroesoftimeporal.model.*;
import org.springframework.stereotype.Component;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

/**
 * 🕰️ TimelineManager - Manages multiple temporal branches and their interactions
 * 
 * This is the core component that handles timeline creation, branching, 
 * conflict detection, and collapse resolution.
 */
@Component
public class TimelineManager {
    
    private final Map<String, Timeline> timelines;
    private final List<ConflictZone> conflicts;
    private final CausalCollapseHandler collapseHandler;
    private String primaryBranch;
    private int nextBranchId;
    
    public TimelineManager() {
        this.timelines = new ConcurrentHashMap<>();
        this.conflicts = new ArrayList<>();
        this.collapseHandler = new CausalCollapseHandler();
        this.nextBranchId = 1;
        
        // Create primary timeline
        this.primaryBranch = "ℬ1";
        this.timelines.put(primaryBranch, new Timeline(primaryBranch));
    }
    
    // Get or create a timeline
    public Timeline getTimeline(String branchId) {
        return timelines.computeIfAbsent(branchId, Timeline::new);
    }
    
    // Get the primary timeline
    public Timeline getPrimaryTimeline() {
        return getTimeline(primaryBranch);
    }
    
    // Get all active timelines
    public List<Timeline> getActiveTimelines() {
        return timelines.values().stream()
                .filter(Timeline::isActive)
                .sorted(Comparator.comparing(Timeline::getBranchId))
                .toList();
    }
    
    // Create a new branch from existing timeline
    public Timeline createBranch(String parentBranchId) {
        Timeline parent = getTimeline(parentBranchId);
        String newBranchId = "ℬ" + (++nextBranchId);
        
        Timeline newBranch = parent.fork(newBranchId);
        timelines.put(newBranchId, newBranch);
        
        System.out.println("🔀 Created new branch: " + newBranchId + " from " + parentBranchId);
        return newBranch;
    }
    
    // Add a ψ-state to a specific timeline
    public void addPsiState(String branchId, PsiState psiState) {
        Timeline timeline = getTimeline(branchId);
        timeline.addPsiState(psiState);
        
        System.out.println("ψ Added to " + branchId + ": " + psiState.getId());
        
        // Check for conflicts after adding
        detectConflicts();
    }
    
    // Advance all active timelines by one turn
    public void advanceAllTimelines() {
        System.out.println("⏰ Advancing all timelines...");
        
        for (Timeline timeline : getActiveTimelines()) {
            timeline.advanceTurn();
            
            // Trigger ψ-states that should activate this turn
            List<PsiState> toTrigger = timeline.getPsiStatesToTrigger();
            for (PsiState psi : toTrigger) {
                triggerPsiState(timeline, psi);
            }
        }
        
        // Detect and resolve conflicts
        detectConflicts();
        resolveConflicts();
    }
    
    // Trigger a specific ψ-state
    private void triggerPsiState(Timeline timeline, PsiState psi) {
        psi.setStatus(PsiState.PsiStatus.TRIGGERED);
        
        timeline.addEvent(new TemporalEvent(
            TemporalEvent.EventType.PSI_TRIGGERED,
            "ψ-state triggered: " + psi.getId(),
            psi.getTargetX(),
            psi.getTargetY()
        ));
        
        System.out.println("⚡ Triggered ψ" + psi.getId() + " in " + timeline.getBranchId());
    }
    
    // Detect conflicts between timelines
    public void detectConflicts() {
        conflicts.clear();
        
        List<Timeline> activeTimelines = getActiveTimelines();
        
        // Compare each pair of timelines
        for (int i = 0; i < activeTimelines.size(); i++) {
            for (int j = i + 1; j < activeTimelines.size(); j++) {
                Timeline timeline1 = activeTimelines.get(i);
                Timeline timeline2 = activeTimelines.get(j);
                
                List<ConflictZone> newConflicts = timeline1.detectConflicts(timeline2);
                conflicts.addAll(newConflicts);
                
                // Log detected conflicts
                for (ConflictZone conflict : newConflicts) {
                    System.out.println("⚔️ Conflict detected: " + conflict.getDescription());
                }
            }
        }
    }
    
    // Resolve all detected conflicts
    public void resolveConflicts() {
        for (ConflictZone conflict : conflicts) {
            if (!conflict.isResolved()) {
                collapseHandler.resolveConflict(conflict);
                System.out.println("† Resolved conflict: " + conflict.getId());
            }
        }
    }
    
    // Collapse a specific timeline
    public void collapseTimeline(String branchId, String reason) {
        Timeline timeline = getTimeline(branchId);
        timeline.collapse(reason);
        
        System.out.println("💥 Timeline " + branchId + " collapsed: " + reason);
    }
    
    // Get all conflicts
    public List<ConflictZone> getConflicts() {
        return new ArrayList<>(conflicts);
    }
    
    // Get unresolved conflicts
    public List<ConflictZone> getUnresolvedConflicts() {
        return conflicts.stream()
                .filter(conflict -> !conflict.isResolved())
                .toList();
    }
    
    // Get timeline statistics
    public Map<String, Object> getStatistics() {
        Map<String, Object> stats = new HashMap<>();
        
        stats.put("totalTimelines", timelines.size());
        stats.put("activeTimelines", getActiveTimelines().size());
        stats.put("totalConflicts", conflicts.size());
        stats.put("unresolvedConflicts", getUnresolvedConflicts().size());
        
        // ψ-state statistics
        int totalPsiStates = 0;
        int activePsiStates = 0;
        int collapsedPsiStates = 0;
        
        for (Timeline timeline : timelines.values()) {
            totalPsiStates += timeline.getPsiStates().size();
            activePsiStates += timeline.getActivePsiStates().size();
            collapsedPsiStates += (int) timeline.getPsiStates().values().stream()
                    .filter(PsiState::isCollapsed)
                    .count();
        }
        
        stats.put("totalPsiStates", totalPsiStates);
        stats.put("activePsiStates", activePsiStates);
        stats.put("collapsedPsiStates", collapsedPsiStates);
        
        return stats;
    }
    
    // Get debug information for all timelines
    public Map<String, Object> getDebugInfo() {
        Map<String, Object> debug = new HashMap<>();
        
        debug.put("timelines", timelines);
        debug.put("conflicts", conflicts);
        debug.put("statistics", getStatistics());
        debug.put("primaryBranch", primaryBranch);
        debug.put("nextBranchId", nextBranchId);
        
        return debug;
    }
    
    // Reset all timelines (for testing)
    public void reset() {
        timelines.clear();
        conflicts.clear();
        nextBranchId = 1;
        primaryBranch = "ℬ1";
        timelines.put(primaryBranch, new Timeline(primaryBranch));
        
        System.out.println("🔄 TimelineManager reset");
    }
    
    // Check if a specific coordinate has active ψ-states
    public boolean hasActivePsiStatesAt(int x, int y) {
        for (Timeline timeline : getActiveTimelines()) {
            for (PsiState psi : timeline.getActivePsiStates()) {
                if (psi.getTargetX() == x && psi.getTargetY() == y) {
                    return true;
                }
            }
        }
        return false;
    }
    
    // Get all ψ-states affecting a specific coordinate
    public List<PsiState> getPsiStatesAt(int x, int y) {
        List<PsiState> result = new ArrayList<>();
        
        for (Timeline timeline : getActiveTimelines()) {
            for (PsiState psi : timeline.getActivePsiStates()) {
                if (psi.getTargetX() == x && psi.getTargetY() == y) {
                    result.add(psi);
                }
            }
        }
        
        return result;
    }
    
    // Get timeline by branch ID
    public Timeline getTimelineByBranch(String branchId) {
        return timelines.get(branchId);
    }
    
    // Get all timeline IDs
    public Set<String> getTimelineIds() {
        return new HashSet<>(timelines.keySet());
    }
}