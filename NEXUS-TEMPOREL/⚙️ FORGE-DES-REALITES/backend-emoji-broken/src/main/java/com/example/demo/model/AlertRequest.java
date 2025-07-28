package com.example.demo.model;

import java.time.LocalDateTime;
import java.util.Map;

/**
 * 🚨 ALERT REQUEST - Modèle pour les requêtes d'alerte
 * ====================================================
 * 
 * Modèle pour les alertes du système Panopticon 6D.
 * Gère les notifications de problèmes dimensionnels et quantiques.
 * 
 * STATUS: ✅ CRÉÉ pour PanopticonController
 */
public class AlertRequest {
    
    private String alertId;
    private String alertType;
    private String severity;
    private String worldId;
    private String source;
    private String message;
    private Map<String, Object> contextData;
    private LocalDateTime timestamp;
    private boolean requiresImmediate;
    
    // Constructeurs
    public AlertRequest() {
        this.timestamp = LocalDateTime.now();
    }
    
    public AlertRequest(String alertType, String severity, String message) {
        this.alertType = alertType;
        this.severity = severity;
        this.message = message;
        this.timestamp = LocalDateTime.now();
        this.requiresImmediate = "CRITICAL".equals(severity);
    }
    
    // Getters et Setters
    public String getAlertId() {
        return alertId;
    }
    
    public void setAlertId(String alertId) {
        this.alertId = alertId;
    }
    
    public String getAlertType() {
        return alertType;
    }
    
    public void setAlertType(String alertType) {
        this.alertType = alertType;
    }
    
    public String getSeverity() {
        return severity;
    }
    
    public void setSeverity(String severity) {
        this.severity = severity;
    }
    
    public String getWorldId() {
        return worldId;
    }
    
    public void setWorldId(String worldId) {
        this.worldId = worldId;
    }
    
    public String getSource() {
        return source;
    }
    
    public void setSource(String source) {
        this.source = source;
    }
    
    public String getMessage() {
        return message;
    }
    
    public void setMessage(String message) {
        this.message = message;
    }
    
    public Map<String, Object> getContextData() {
        return contextData;
    }
    
    public void setContextData(Map<String, Object> contextData) {
        this.contextData = contextData;
    }
    
    public LocalDateTime getTimestamp() {
        return timestamp;
    }
    
    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
    
    public boolean isRequiresImmediate() {
        return requiresImmediate;
    }
    
    public void setRequiresImmediate(boolean requiresImmediate) {
        this.requiresImmediate = requiresImmediate;
    }
} 