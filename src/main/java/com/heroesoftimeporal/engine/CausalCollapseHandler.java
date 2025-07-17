package com.heroesoftimeporal.engine;

import com.heroesoftimeporal.model.*;
import org.springframework.stereotype.Component;
import java.util.List;
import java.util.Random;
import java.util.Map;
import java.util.HashMap;

/**
 * 💥 CausalCollapseHandler - Handles conflict resolution and timeline collapse
 * 
 * When multiple ψ-states conflict, this handler determines which one survives
 * and collapses the others. Different resolution methods can be used.
 */
@Component
public class CausalCollapseHandler {
    
    private final Random random;
    
    public CausalCollapseHandler() {
        this.random = new Random();
    }
    
    // Resolve a conflict between multiple ψ-states
    public void resolveConflict(ConflictZone conflict) {
        if (conflict.isResolved()) {
            return;
        }
        
        List<PsiState> conflictingStates = conflict.getConflictingPsiStates();
        
        // Determine resolution method based on the ψ-states involved
        ConflictZone.ResolutionMethod method = determineResolutionMethod(conflictingStates);
        
        // Resolve the conflict
        conflict.resolve(method, "Automatic resolution");
        
        // Log the resolution
        System.out.println("† Conflict resolved at @" + conflict.getX() + "," + conflict.getY() + 
                          " using " + method + " - Winner: ψ" + conflict.getWinner().getId());
    }
    
    // Determine the best resolution method for a conflict
    private ConflictZone.ResolutionMethod determineResolutionMethod(List<PsiState> conflictingStates) {
        // Check if any ψ-state involves temporal artifacts
        boolean hasTemporalArtifact = conflictingStates.stream()
                .anyMatch(psi -> psi.getParameters().contains("AvantWorldBlade") || 
                               psi.getParameters().contains("TemporalAnchor"));
        
        if (hasTemporalArtifact) {
            return ConflictZone.ResolutionMethod.PRIORITY;
        }
        
        // Check if any ψ-state involves battle
        boolean hasBattle = conflictingStates.stream()
                .anyMatch(psi -> "BATTLE".equals(psi.getAction()));
        
        if (hasBattle) {
            return ConflictZone.ResolutionMethod.PHANTOM_BATTLE;
        }
        
        // Check if states are from the same timeline (can potentially merge)
        boolean sameTimeline = conflictingStates.stream()
                .map(PsiState::getBranch)
                .distinct()
                .count() == 1;
        
        if (sameTimeline) {
            return ConflictZone.ResolutionMethod.TIMELINE_MERGE;
        }
        
        // Default to random resolution
        return ConflictZone.ResolutionMethod.RANDOM;
    }
    
    // Perform phantom battle resolution
    public PsiState performPhantomBattle(List<PsiState> combatants) {
        System.out.println("⚔️ Phantom battle initiated between " + combatants.size() + " ψ-states");
        
        PsiState winner = null;
        double highestScore = 0;
        
        for (PsiState psi : combatants) {
            double battleScore = calculateBattleScore(psi);
            System.out.println("  ψ" + psi.getId() + " battle score: " + String.format("%.2f", battleScore));
            
            if (battleScore > highestScore) {
                highestScore = battleScore;
                winner = psi;
            }
        }
        
        System.out.println("🏆 Phantom battle winner: ψ" + winner.getId() + " (score: " + String.format("%.2f", highestScore) + ")");
        return winner;
    }
    
    // Calculate battle score for phantom battle
    private double calculateBattleScore(PsiState psi) {
        double score = 0.5; // Base score
        
        // Action type bonuses
        switch (psi.getAction()) {
            case "BATTLE":
                score += 0.4;
                break;
            case "CREATE":
                if (psi.getParameters().contains("Dragon")) {
                    score += 0.6;
                } else if (psi.getParameters().contains("CREATURE")) {
                    score += 0.3;
                }
                break;
            case "MOV":
                score += 0.1;
                break;
            default:
                score += 0.2;
        }
        
        // Temporal artifact bonuses
        if (psi.getParameters().contains("AvantWorldBlade")) {
            score += 0.5;
        } else if (psi.getParameters().contains("TemporalAnchor")) {
            score += 0.3;
        }
        
        // Probability bonus
        score += psi.getProbability() * 0.2;
        
        // Time advantage (earlier ψ-states get slight bonus)
        long timeAdvantage = System.currentTimeMillis() - psi.getCreatedAt().getNano();
        score += Math.min(timeAdvantage / 1000000.0, 0.1);
        
        // Add randomness (20% random factor)
        score += random.nextDouble() * 0.2;
        
        return score;
    }
    
    // Resolve priority-based conflicts (temporal artifacts)
    public PsiState resolvePriorityConflict(List<PsiState> conflictingStates) {
        System.out.println("🔮 Priority resolution for " + conflictingStates.size() + " ψ-states");
        
        // Priority order: Temporal artifacts > Higher probability > Earlier creation
        PsiState winner = conflictingStates.stream()
                .max((psi1, psi2) -> {
                    // First: Check for temporal artifacts
                    int artifact1 = getArtifactPriority(psi1);
                    int artifact2 = getArtifactPriority(psi2);
                    
                    if (artifact1 != artifact2) {
                        return Integer.compare(artifact1, artifact2);
                    }
                    
                    // Second: Check probability
                    int probCompare = Double.compare(psi1.getProbability(), psi2.getProbability());
                    if (probCompare != 0) {
                        return probCompare;
                    }
                    
                    // Third: Earlier creation time wins
                    return psi2.getCreatedAt().compareTo(psi1.getCreatedAt());
                })
                .orElse(conflictingStates.get(0));
        
        System.out.println("👑 Priority winner: ψ" + winner.getId() + " (priority: " + getArtifactPriority(winner) + ")");
        return winner;
    }
    
    // Get artifact priority level
    private int getArtifactPriority(PsiState psi) {
        String params = psi.getParameters();
        
        if (params.contains("AvantWorldBlade")) {
            return 10; // Highest priority
        } else if (params.contains("TemporalAnchor")) {
            return 8;
        } else if (params.contains("ApocalypseHorn")) {
            return 9;
        } else if (params.contains("ReverseClock")) {
            return 7;
        } else if (params.contains("Dragon")) {
            return 5;
        } else if (params.contains("CREATURE")) {
            return 3;
        } else if ("BATTLE".equals(psi.getAction())) {
            return 4;
        }
        
        return 1; // Default priority
    }
    
    // Attempt to merge compatible ψ-states
    public PsiState attemptMerge(List<PsiState> conflictingStates) {
        System.out.println("🔀 Attempting to merge " + conflictingStates.size() + " ψ-states");
        
        // For now, just pick the first one
        // In a full implementation, this would check if actions are compatible
        // and create a merged ψ-state
        
        PsiState primary = conflictingStates.get(0);
        
        // Log what would be merged
        for (int i = 1; i < conflictingStates.size(); i++) {
            PsiState secondary = conflictingStates.get(i);
            System.out.println("  Would merge ψ" + secondary.getId() + " into ψ" + primary.getId());
        }
        
        System.out.println("🔗 Merge result: ψ" + primary.getId() + " (primary)");
        return primary;
    }
    
    // Force collapse all ψ-states except the winner
    public void forceCollapseOthers(List<PsiState> conflictingStates, PsiState winner, String reason) {
        for (PsiState psi : conflictingStates) {
            if (psi != winner && !psi.isCollapsed()) {
                psi.collapse("Conflict resolution: " + reason);
                System.out.println("† Collapsed ψ" + psi.getId() + " - " + reason);
            }
        }
    }
    
    // Get collapse statistics
    public Map<String, Integer> getCollapseStatistics() {
        Map<String, Integer> stats = new HashMap<>();
        
        // This would normally track statistics across all collapses
        // For now, return empty stats
        stats.put("totalCollapses", 0);
        stats.put("randomResolutions", 0);
        stats.put("priorityResolutions", 0);
        stats.put("phantomBattles", 0);
        stats.put("mergedStates", 0);
        
        return stats;
    }
    
    // Check if two ψ-states can be merged
    private boolean canMerge(PsiState psi1, PsiState psi2) {
        // Compatible if same action type and non-conflicting parameters
        if (!psi1.getAction().equals(psi2.getAction())) {
            return false;
        }
        
        // MOV actions can't be merged if going to different locations
        if ("MOV".equals(psi1.getAction()) && 
            (psi1.getTargetX() != psi2.getTargetX() || psi1.getTargetY() != psi2.getTargetY())) {
            return false;
        }
        
        // BATTLE actions can't be merged
        if ("BATTLE".equals(psi1.getAction())) {
            return false;
        }
        
        return true;
    }
}