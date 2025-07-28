package com.example.demo.model;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

/**
 * 🏛️ PANOPTICON 6D VIEW - Modèle pour la vue 6D
 * ==============================================
 * 
 * Modèle représentant une vue complète 6D du Panopticon.
 * Contient toutes les dimensions observables et leurs données.
 * 
 * DIMENSIONS: X,Y,Z (Space) + T (Time) + Ψ (Causality) + Σ (Superposition) + S (Entropy) + 𝕽 (Recursivity)
 * STATUS: ✅ CRÉÉ pour PanopticonController
 */
public class Panopticon6DView {
    
    private String worldId;
    private LocalDateTime timestamp;
    private Map<String, Object> spatialDimensions;  // X, Y, Z
    private Map<String, Object> temporalDimension;  // T
    private Map<String, Object> causalityDimension; // Ψ
    private Map<String, Object> superpositionDimension; // Σ
    private Map<String, Object> entropyDimension;   // S
    private Map<String, Object> recursivityDimension; // 𝕽
    private List<String> activeObservers;
    private double quantumStress;
    private int recursionDepth;
    
    // Constructeurs
    public Panopticon6DView() {}
    
    public Panopticon6DView(String worldId) {
        this.worldId = worldId;
        this.timestamp = LocalDateTime.now();
    }
    
    // Getters et Setters
    public String getWorldId() {
        return worldId;
    }
    
    public void setWorldId(String worldId) {
        this.worldId = worldId;
    }
    
    public LocalDateTime getTimestamp() {
        return timestamp;
    }
    
    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
    
    public Map<String, Object> getSpatialDimensions() {
        return spatialDimensions;
    }
    
    public void setSpatialDimensions(Map<String, Object> spatialDimensions) {
        this.spatialDimensions = spatialDimensions;
    }
    
    public Map<String, Object> getTemporalDimension() {
        return temporalDimension;
    }
    
    public void setTemporalDimension(Map<String, Object> temporalDimension) {
        this.temporalDimension = temporalDimension;
    }
    
    public Map<String, Object> getCausalityDimension() {
        return causalityDimension;
    }
    
    public void setCausalityDimension(Map<String, Object> causalityDimension) {
        this.causalityDimension = causalityDimension;
    }
    
    public Map<String, Object> getSuperpositionDimension() {
        return superpositionDimension;
    }
    
    public void setSuperpositionDimension(Map<String, Object> superpositionDimension) {
        this.superpositionDimension = superpositionDimension;
    }
    
    public Map<String, Object> getEntropyDimension() {
        return entropyDimension;
    }
    
    public void setEntropyDimension(Map<String, Object> entropyDimension) {
        this.entropyDimension = entropyDimension;
    }
    
    public Map<String, Object> getRecursivityDimension() {
        return recursivityDimension;
    }
    
    public void setRecursivityDimension(Map<String, Object> recursivityDimension) {
        this.recursivityDimension = recursivityDimension;
    }
    
    public List<String> getActiveObservers() {
        return activeObservers;
    }
    
    public void setActiveObservers(List<String> activeObservers) {
        this.activeObservers = activeObservers;
    }
    
    public double getQuantumStress() {
        return quantumStress;
    }
    
    public void setQuantumStress(double quantumStress) {
        this.quantumStress = quantumStress;
    }
    
    public int getRecursionDepth() {
        return recursionDepth;
    }
    
    public void setRecursionDepth(int recursionDepth) {
        this.recursionDepth = recursionDepth;
    }
} 