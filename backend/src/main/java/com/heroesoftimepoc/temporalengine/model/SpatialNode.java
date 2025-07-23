package com.heroesoftimepoc.temporalengine.model;

import java.util.Map;
import java.util.HashMap;

/**
 * Nœud spatial dans le World State Graph
 */
public class SpatialNode {
    public enum NodeType {
        HERO,           // 👤 Héros avec position et capacités
        PSI_STATE,      // 🌀 État quantique en superposition
        ARTIFACT,       // 🔮 Artefact temporel avec zone d'influence
        BUILDING,       // 🏰 Structure avec état temporel
        TEMPORAL_ZONE   // ⏰ Zone d'effet temporel
    }
    
    private String id;
    private int x, y, z;
    private String timeline;
    private int temporalLayer;
    private NodeType type;
    private boolean quantumState;
    private double probability;
    private Map<String, Object> metadata = new HashMap<>();
    
    // Constructeurs
    public SpatialNode() {}
    
    public SpatialNode(String id, int x, int y, NodeType type) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.z = 0;
        this.type = type;
        this.quantumState = false;
        this.probability = 1.0;
    }
    
    // Getters et Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    
    public int getX() { return x; }
    public void setX(int x) { this.x = x; }
    
    public int getY() { return y; }
    public void setY(int y) { this.y = y; }
    
    public int getZ() { return z; }
    public void setZ(int z) { this.z = z; }
    
    public String getTimeline() { return timeline; }
    public void setTimeline(String timeline) { this.timeline = timeline; }
    
    public int getTemporalLayer() { return temporalLayer; }
    public void setTemporalLayer(int temporalLayer) { this.temporalLayer = temporalLayer; }
    
    public NodeType getType() { return type; }
    public void setType(NodeType type) { this.type = type; }
    
    public boolean isQuantumState() { return quantumState; }
    public void setQuantumState(boolean quantumState) { this.quantumState = quantumState; }
    
    public double getProbability() { return probability; }
    public void setProbability(double probability) { this.probability = probability; }
    
    public Map<String, Object> getMetadata() { return metadata; }
    public void setMetadata(Map<String, Object> metadata) { this.metadata = metadata; }
} 