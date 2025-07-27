package com.example.demo.model;

import java.time.LocalDateTime;
import java.util.Map;

/**
 * 📊 OBSERVATION RESULT - Modèle pour les résultats d'observation
 * ===============================================================
 * 
 * Modèle contenant les résultats d'une observation du Panopticon 6D.
 * Retourne les données observées avec métadonnées de qualité.
 * 
 * STATUS: ✅ CRÉÉ pour PanopticonController
 */
public class ObservationResult {
    
    private String observationId;
    private String observerId;
    private String worldId;
    private LocalDateTime timestamp;
    private Map<String, Object> observedData;
    private double accuracy;
    private double quantumUncertainty;
    private boolean isStable;
    private String status;
    private String message;
    
    // Constructeurs
    public ObservationResult() {}
    
    public ObservationResult(String observerId, String worldId, Map<String, Object> observedData) {
        this.observerId = observerId;
        this.worldId = worldId;
        this.observedData = observedData;
        this.timestamp = LocalDateTime.now();
        this.accuracy = 1.0;
        this.quantumUncertainty = 0.0;
        this.isStable = true;
        this.status = "SUCCESS";
    }
    
    // Getters et Setters
    public String getObservationId() {
        return observationId;
    }
    
    public void setObservationId(String observationId) {
        this.observationId = observationId;
    }
    
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
    
    public LocalDateTime getTimestamp() {
        return timestamp;
    }
    
    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
    
    public Map<String, Object> getObservedData() {
        return observedData;
    }
    
    public void setObservedData(Map<String, Object> observedData) {
        this.observedData = observedData;
    }
    
    public double getAccuracy() {
        return accuracy;
    }
    
    public void setAccuracy(double accuracy) {
        this.accuracy = accuracy;
    }
    
    public double getQuantumUncertainty() {
        return quantumUncertainty;
    }
    
    public void setQuantumUncertainty(double quantumUncertainty) {
        this.quantumUncertainty = quantumUncertainty;
    }
    
    public boolean isStable() {
        return isStable;
    }
    
    public void setStable(boolean stable) {
        isStable = stable;
    }
    
    public String getStatus() {
        return status;
    }
    
    public void setStatus(String status) {
        this.status = status;
    }
    
    public String getMessage() {
        return message;
    }
    
    public void setMessage(String message) {
        this.message = message;
    }
} 