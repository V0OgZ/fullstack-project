package com.heroesoftimepoc.temporalengine.model;

import java.util.*;

/**
 * Représente un nœud dans le graphe causal (ΨGraph)
 * Chaque nœud contient une position + temps + contexte joueur
 */
public class PsiNode {
    
    private Long id;
    
    private TileCoord tile;
    
    private TimeCoord time;
    
    private Game game;
    
    private String ownerPlayer;
    
    private List<ScriptCommand> interactions = new ArrayList<>();
    
    private boolean isObserved = false;
    
    private boolean isReachable = false;
    
    private boolean isGhostVisible = false;
    
    private Set<String> activeEffects = new HashSet<>();
    
    private RealityState realityState = RealityState.POTENTIAL;
    
    private CausalityZone causalityZone = CausalityZone.UNKNOWN;
    
    private Double probability = 1.0;
    
    private String collapseTrigger;
    
    private Long createdAt;
    
    private Long updatedAt;
    
    // Constructeurs
    public PsiNode() {
        this.createdAt = System.currentTimeMillis();
        this.updatedAt = System.currentTimeMillis();
    }
    
    public PsiNode(TileCoord tile, TimeCoord time, String ownerPlayer) {
        this();
        this.tile = tile;
        this.time = time;
        this.ownerPlayer = ownerPlayer;
    }
    
    // Méthodes utilitaires
    public boolean isCollapsed() {
        return realityState == RealityState.COLLAPSED;
    }
    
    public boolean isSuperposed() {
        return realityState == RealityState.SUPERPOSED;
    }
    
    public boolean isInZone(CausalityZone zone) {
        return this.causalityZone == zone;
    }
    
    public void addEffect(String effect) {
        this.activeEffects.add(effect);
        this.updatedAt = System.currentTimeMillis();
    }
    
    public void removeEffect(String effect) {
        this.activeEffects.remove(effect);
        this.updatedAt = System.currentTimeMillis();
    }
    
    public void collapse() {
        this.realityState = RealityState.COLLAPSED;
        this.updatedAt = System.currentTimeMillis();
    }
    
    public void observe() {
        this.isObserved = true;
        this.updatedAt = System.currentTimeMillis();
    }
    
    public void updateReachability(boolean reachable) {
        this.isReachable = reachable;
        this.updatedAt = System.currentTimeMillis();
    }
    
    public void updateGhostVisibility(boolean visible) {
        this.isGhostVisible = visible;
        this.updatedAt = System.currentTimeMillis();
    }
    
    public String getPositionKey() {
        return tile.getX() + "," + tile.getY() + "," + time.getTurn();
    }
    
    @Override
    public String toString() {
        return String.format("PsiNode[%s@%s:%s - %s]", 
                tile, time, ownerPlayer, realityState);
    }
    
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof PsiNode)) return false;
        PsiNode psiNode = (PsiNode) o;
        return Objects.equals(tile, psiNode.tile) &&
               Objects.equals(time, psiNode.time) &&
               Objects.equals(ownerPlayer, psiNode.ownerPlayer);
    }
    
    @Override
    public int hashCode() {
        return Objects.hash(tile, time, ownerPlayer);
    }
    
    // Getters et Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public TileCoord getTile() { return tile; }
    public void setTile(TileCoord tile) { this.tile = tile; }
    
    public TimeCoord getTime() { return time; }
    public void setTime(TimeCoord time) { this.time = time; }
    
    public Game getGame() { return game; }
    public void setGame(Game game) { this.game = game; }
    
    public String getOwnerPlayer() { return ownerPlayer; }
    public void setOwnerPlayer(String ownerPlayer) { this.ownerPlayer = ownerPlayer; }
    
    public List<ScriptCommand> getInteractions() { return interactions; }
    public void setInteractions(List<ScriptCommand> interactions) { this.interactions = interactions; }
    
    public boolean isObserved() { return isObserved; }
    public void setObserved(boolean observed) { isObserved = observed; }
    
    public boolean isReachable() { return isReachable; }
    public void setReachable(boolean reachable) { isReachable = reachable; }
    
    public boolean isGhostVisible() { return isGhostVisible; }
    public void setGhostVisible(boolean ghostVisible) { isGhostVisible = ghostVisible; }
    
    public Set<String> getActiveEffects() { return activeEffects; }
    public void setActiveEffects(Set<String> activeEffects) { this.activeEffects = activeEffects; }
    
    public RealityState getRealityState() { return realityState; }
    public void setRealityState(RealityState realityState) { this.realityState = realityState; }
    
    public CausalityZone getCausalityZone() { return causalityZone; }
    public void setCausalityZone(CausalityZone causalityZone) { this.causalityZone = causalityZone; }
    
    public Double getProbability() { return probability; }
    public void setProbability(Double probability) { this.probability = probability; }
    
    public String getCollapseTrigger() { return collapseTrigger; }
    public void setCollapseTrigger(String collapseTrigger) { this.collapseTrigger = collapseTrigger; }
    
    public Long getCreatedAt() { return createdAt; }
    public void setCreatedAt(Long createdAt) { this.createdAt = createdAt; }
    
    public Long getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Long updatedAt) { this.updatedAt = updatedAt; }
} 