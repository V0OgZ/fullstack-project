package com.heroesoftimepoc.temporalengine.model;

import java.util.List;
import java.util.ArrayList;

/**
 * Couche temporelle dans le World State Graph
 */
public class TemporalLayer {
    private int deltaT;
    private String timeline;
    private List<String> nodeIds = new ArrayList<>();
    private String description;
    
    // Constructeurs
    public TemporalLayer() {}
    
    public TemporalLayer(int deltaT, String timeline) {
        this.deltaT = deltaT;
        this.timeline = timeline;
    }
    
    // Getters et Setters
    public int getDeltaT() { return deltaT; }
    public void setDeltaT(int deltaT) { this.deltaT = deltaT; }
    
    public String getTimeline() { return timeline; }
    public void setTimeline(String timeline) { this.timeline = timeline; }
    
    public List<String> getNodeIds() { return nodeIds; }
    public void setNodeIds(List<String> nodeIds) { this.nodeIds = nodeIds; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public void addNodeId(String nodeId) {
        if (!nodeIds.contains(nodeId)) {
            nodeIds.add(nodeId);
        }
    }
} 