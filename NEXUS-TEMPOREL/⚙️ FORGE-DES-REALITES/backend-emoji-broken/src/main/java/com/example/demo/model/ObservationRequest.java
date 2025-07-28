package com.example.demo.model;

import java.util.List;

/**
 * 👁️ OBSERVATION REQUEST - Modèle pour les requêtes d'observation
 * ===============================================================
 * 
 * Modèle pour les demandes d'observation du Panopticon 6D.
 * Permet de spécifier quelles dimensions observer et avec quelle précision.
 * 
 * STATUS: ✅ CRÉÉ pour PanopticonController
 */
public class ObservationRequest {
    
    private String observerId;
    private String worldId;
    private List<String> targetDimensions;
    private String observationType;
    private double precision;
    private boolean includeQuantumState;
    private boolean includeRecursionData;
    
    // Constructeurs
    public ObservationRequest() {}
    
    public ObservationRequest(String observerId, String worldId, List<String> targetDimensions) {
        this.observerId = observerId;
        this.worldId = worldId;
        this.targetDimensions = targetDimensions;
        this.observationType = "STANDARD";
        this.precision = 1.0;
        this.includeQuantumState = true;
        this.includeRecursionData = false;
    }
    
    // Getters et Setters
    public String getObserverId() {
        return observerId;
    }
    
    public void setObserverId(String observerId) {
        this.observerId = observerId;
    }
    
    public String getWorldId() {
        return worldId;
    }
    
    public void setWorldId(String worldId) {
        this.worldId = worldId;
    }
    
    public List<String> getTargetDimensions() {
        return targetDimensions;
    }
    
    public void setTargetDimensions(List<String> targetDimensions) {
        this.targetDimensions = targetDimensions;
    }
    
    public String getObservationType() {
        return observationType;
    }
    
    public void setObservationType(String observationType) {
        this.observationType = observationType;
    }
    
    public double getPrecision() {
        return precision;
    }
    
    public void setPrecision(double precision) {
        this.precision = precision;
    }
    
    public boolean isIncludeQuantumState() {
        return includeQuantumState;
    }
    
    public void setIncludeQuantumState(boolean includeQuantumState) {
        this.includeQuantumState = includeQuantumState;
    }
    
    public boolean isIncludeRecursionData() {
        return includeRecursionData;
    }
    
    public void setIncludeRecursionData(boolean includeRecursionData) {
        this.includeRecursionData = includeRecursionData;
    }
} 