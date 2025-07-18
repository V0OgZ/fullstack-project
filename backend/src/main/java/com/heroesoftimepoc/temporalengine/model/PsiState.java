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
    
    // Amplitude complexe pour les calculs quantiques avancés
    @Embedded
    @AttributeOverrides({
        @AttributeOverride(name = "realPart", column = @Column(name = "amplitude_real")),
        @AttributeOverride(name = "imaginaryPart", column = @Column(name = "amplitude_imaginary"))
    })
    private ComplexAmplitude complexAmplitude;
    
    @Column(name = "use_complex_amplitude")
    private Boolean useComplexAmplitude = false;
    
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
        this.complexAmplitude = new ComplexAmplitude(1.0, 0.0);
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
    
    public Double getProbability() { 
        if (useComplexAmplitude != null && useComplexAmplitude && complexAmplitude != null) {
            return complexAmplitude.getProbability();
        }
        return probability; 
    }
    
    public void setProbability(Double probability) { 
        this.probability = probability; 
        // Synchroniser avec l'amplitude complexe si elle est utilisée
        if (useComplexAmplitude != null && useComplexAmplitude && probability != null) {
            this.complexAmplitude = ComplexAmplitude.fromProbability(probability);
        }
    }
    
    public ComplexAmplitude getComplexAmplitude() { return complexAmplitude; }
    public void setComplexAmplitude(ComplexAmplitude complexAmplitude) { 
        this.complexAmplitude = complexAmplitude; 
        // Synchroniser avec la probabilité classique
        if (complexAmplitude != null) {
            this.probability = complexAmplitude.getProbability();
        }
    }
    
    public Boolean getUseComplexAmplitude() { return useComplexAmplitude; }
    public void setUseComplexAmplitude(Boolean useComplexAmplitude) { this.useComplexAmplitude = useComplexAmplitude; }
    
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
    
    // Quantum amplitude methods
    
    /**
     * Active le mode amplitude complexe
     */
    public void enableComplexAmplitude() {
        this.useComplexAmplitude = true;
        if (this.complexAmplitude == null) {
            this.complexAmplitude = ComplexAmplitude.fromProbability(this.probability != null ? this.probability : 1.0);
        }
    }
    
    /**
     * Désactive le mode amplitude complexe et revient aux probabilités classiques
     */
    public void disableComplexAmplitude() {
        this.useComplexAmplitude = false;
        if (this.complexAmplitude != null) {
            this.probability = this.complexAmplitude.getProbability();
        }
    }
    
    /**
     * Définit l'amplitude complexe à partir de composantes réelles et imaginaires
     */
    public void setComplexAmplitude(double realPart, double imaginaryPart) {
        this.complexAmplitude = new ComplexAmplitude(realPart, imaginaryPart);
        this.useComplexAmplitude = true;
        this.probability = this.complexAmplitude.getProbability();
    }
    
    /**
     * Définit l'amplitude complexe à partir de magnitude et phase
     */
    public void setComplexAmplitudeFromPolar(double magnitude, double phase) {
        this.complexAmplitude = ComplexAmplitude.fromPolar(magnitude, phase);
        this.useComplexAmplitude = true;
        this.probability = this.complexAmplitude.getProbability();
    }
    
    /**
     * Obtient la probabilité effective (compatible avec l'ancien système)
     */
    public double getEffectiveProbability() {
        if (useComplexAmplitude != null && useComplexAmplitude && complexAmplitude != null) {
            return complexAmplitude.getProbability();
        }
        return probability != null ? probability : 1.0;
    }
    
    /**
     * Vérifie si cette PsiState utilise les amplitudes complexes
     */
    public boolean isUsingComplexAmplitude() {
        return useComplexAmplitude != null && useComplexAmplitude;
    }
    
    /**
     * Calcule l'interférence avec une autre PsiState
     */
    public ComplexAmplitude calculateInterference(PsiState other) {
        if (!this.isUsingComplexAmplitude() || !other.isUsingComplexAmplitude()) {
            throw new IllegalStateException("Les deux PsiState doivent utiliser les amplitudes complexes");
        }
        
        return this.complexAmplitude.add(other.complexAmplitude);
    }
    
    /**
     * Calcule l'interférence constructive avec une autre PsiState
     */
    public ComplexAmplitude calculateConstructiveInterference(PsiState other) {
        if (!this.isUsingComplexAmplitude() || !other.isUsingComplexAmplitude()) {
            throw new IllegalStateException("Les deux PsiState doivent utiliser les amplitudes complexes");
        }
        
        return ComplexAmplitude.constructiveInterference(this.complexAmplitude, other.complexAmplitude);
    }
    
    /**
     * Calcule l'interférence destructive avec une autre PsiState
     */
    public ComplexAmplitude calculateDestructiveInterference(PsiState other) {
        if (!this.isUsingComplexAmplitude() || !other.isUsingComplexAmplitude()) {
            throw new IllegalStateException("Les deux PsiState doivent utiliser les amplitudes complexes");
        }
        
        return ComplexAmplitude.destructiveInterference(this.complexAmplitude, other.complexAmplitude);
    }
    
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
        if (isUsingComplexAmplitude()) {
            return String.format("PsiState{id='%s', expression='%s', status=%s, branch='%s', amplitude=%s}", 
                               psiId, expression, status, branchId, complexAmplitude.toString());
        } else {
            return String.format("PsiState{id='%s', expression='%s', status=%s, branch='%s', probability=%.4f}", 
                               psiId, expression, status, branchId, probability);
        }
    }
}