package com.heroesoftimepoc.temporalengine.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "psi_states")
public class PsiState {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "psi_id", unique = true, nullable = false)
    private String psiId; // ψ001, ψ002, etc.
    
    @Column(name = "expression", columnDefinition = "TEXT")
    private String expression; // ⊙(Δt+2 @126,65 ⟶ CREATE(CREATURE, Dragon))
    
    @Column(name = "branch_id")
    private String branchId; // ℬ1, ℬ2, etc.
    
    @Column(name = "probability")
    private Double probability = 1.0;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private PsiStatus status = PsiStatus.ACTIVE;
    
    @Column(name = "target_x")
    private Integer targetX;
    
    @Column(name = "target_y")
    private Integer targetY;
    
    @Column(name = "delta_t")
    private Integer deltaT; // Δt+2 -> 2
    
    @Column(name = "action_type")
    private String actionType; // MOV, CREATE, BATTLE, etc.
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "collapse_trigger")
    private String collapseTrigger; // Π condition
    
    @Column(name = "owner_hero")
    private String ownerHero;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "game_id")
    private Game game;
    
    public enum PsiStatus {
        ACTIVE,
        COLLAPSED,
        TRIGGERED,
        EXPIRED
    }
    
    // Constructors
    public PsiState() {
        this.createdAt = LocalDateTime.now();
    }
    
    public PsiState(String psiId, String expression, String branchId) {
        this();
        this.psiId = psiId;
        this.expression = expression;
        this.branchId = branchId;
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getPsiId() { return psiId; }
    public void setPsiId(String psiId) { this.psiId = psiId; }
    
    public String getExpression() { return expression; }
    public void setExpression(String expression) { this.expression = expression; }
    
    public String getBranchId() { return branchId; }
    public void setBranchId(String branchId) { this.branchId = branchId; }
    
    public Double getProbability() { return probability; }
    public void setProbability(Double probability) { this.probability = probability; }
    
    public PsiStatus getStatus() { return status; }
    public void setStatus(PsiStatus status) { this.status = status; }
    
    public Integer getTargetX() { return targetX; }
    public void setTargetX(Integer targetX) { this.targetX = targetX; }
    
    public Integer getTargetY() { return targetY; }
    public void setTargetY(Integer targetY) { this.targetY = targetY; }
    
    public Integer getDeltaT() { return deltaT; }
    public void setDeltaT(Integer deltaT) { this.deltaT = deltaT; }
    
    public String getActionType() { return actionType; }
    public void setActionType(String actionType) { this.actionType = actionType; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public String getCollapseTrigger() { return collapseTrigger; }
    public void setCollapseTrigger(String collapseTrigger) { this.collapseTrigger = collapseTrigger; }
    
    public String getOwnerHero() { return ownerHero; }
    public void setOwnerHero(String ownerHero) { this.ownerHero = ownerHero; }
    
    public Game getGame() { return game; }
    public void setGame(Game game) { this.game = game; }
    
    // Helper methods
    public boolean isActive() {
        return status == PsiStatus.ACTIVE;
    }
    
    public void collapse() {
        this.status = PsiStatus.COLLAPSED;
    }
    
    public boolean isAtPosition(int x, int y) {
        return targetX != null && targetY != null && 
               targetX.equals(x) && targetY.equals(y);
    }
    
    @Override
    public String toString() {
        return String.format("PsiState{id='%s', expression='%s', status=%s, branch='%s'}", 
                           psiId, expression, status, branchId);
    }
}