package com.heroesoftimepoc.temporalengine.model;

import java.util.Map;
import java.util.HashMap;

/**
 * Connexion causale entre nœuds du World State Graph
 */
public class CausalConnection {
    public enum CausalType {
        SPATIAL,        // Proximité géographique
        TEMPORAL,       // Même timeline/layer
        QUANTUM,        // Intrication quantique
        ARTIFACT,       // Influence d'artefact
        OBSERVATION     // Déclencheur d'observation
    }
    
    private String sourceNodeId;
    private String targetNodeId;
    private double strength;        // Force de la connexion [0.0, 1.0]
    private CausalType type;
    private Map<String, Object> properties = new HashMap<>();
    
    // Constructeurs
    public CausalConnection() {}
    
    public CausalConnection(String sourceNodeId, String targetNodeId, double strength, CausalType type) {
        this.sourceNodeId = sourceNodeId;
        this.targetNodeId = targetNodeId;
        this.strength = strength;
        this.type = type;
    }
    
    // Getters et Setters
    public String getSourceNodeId() { return sourceNodeId; }
    public void setSourceNodeId(String sourceNodeId) { this.sourceNodeId = sourceNodeId; }
    
    public String getTargetNodeId() { return targetNodeId; }
    public void setTargetNodeId(String targetNodeId) { this.targetNodeId = targetNodeId; }
    
    public double getStrength() { return strength; }
    public void setStrength(double strength) { this.strength = strength; }
    
    public CausalType getType() { return type; }
    public void setType(CausalType type) { this.type = type; }
    
    public Map<String, Object> getProperties() { return properties; }
    public void setProperties(Map<String, Object> properties) { this.properties = properties; }
} 