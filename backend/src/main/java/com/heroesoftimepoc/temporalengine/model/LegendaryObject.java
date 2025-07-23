package com.heroesoftimepoc.temporalengine.model;

import java.util.*;

/**
 * Représente un objet légendaire qui influence la causalité
 * Basé sur CAUSALITY_OBJECT_INFLUENCE.md
 */
public class LegendaryObject {
    
    private Long id;
    private String name;
    private LegendaryObjectType objectType;
    private String description;
    private boolean affectsTimeline = true;
    private VisibilityMode visibilityMode = VisibilityMode.NORMAL;
    private Set<CausalityEffect> effects = new HashSet<>();
    private Integer radiusOfInfluence = 0;
    private Double strength = 1.0;
    private boolean isActive = true;
    private boolean requiresActivation = false;
    private Integer activationCost = 0;
    private Integer cooldownTurns = 0;
    private Integer lastUsedTurn = 0;
    private Map<String, String> properties = new HashMap<>();
    private Long createdAt;
    private Long updatedAt;
    
    // Constructeurs
    public LegendaryObject() {
        this.createdAt = System.currentTimeMillis();
        this.updatedAt = System.currentTimeMillis();
    }
    
    public LegendaryObject(String name, LegendaryObjectType objectType) {
        this();
        this.name = name;
        this.objectType = objectType;
    }
    
    // Méthodes d'objets légendaires prédéfinis
    
    /**
     * Créer la Tower of Anchoring
     */
    public static LegendaryObject createTowerOfAnchoring() {
        LegendaryObject tower = new LegendaryObject("Tower of Anchoring", LegendaryObjectType.STRUCTURE);
        tower.setDescription("Prevents timeline projection in an area");
        tower.setAffectsTimeline(true);
        tower.setRadiusOfInfluence(3);
        tower.addEffect(CausalityEffect.PREVENT_TIMELINE_PROJECTION);
        tower.addEffect(CausalityEffect.FORCE_COLLAPSE);
        tower.addProperty("preventsCausalityCalculation", "true");
        tower.addProperty("anchorsReality", "true");
        return tower;
    }
    
    /**
     * Créer l'Eye of Wigner
     */
    public static LegendaryObject createEyeOfWigner() {
        LegendaryObject eye = new LegendaryObject("Eye of Wigner", LegendaryObjectType.ARTIFACT);
        eye.setDescription("Forces observation and collapse in adjacent zones");
        eye.setAffectsTimeline(true);
        eye.setRadiusOfInfluence(2);
        eye.addEffect(CausalityEffect.FORCE_OBSERVATION);
        eye.addEffect(CausalityEffect.FORCE_COLLAPSE);
        eye.addProperty("forceObservation", "true");
        eye.addProperty("collapseOnObservation", "true");
        return eye;
    }
    
    /**
     * Créer le Veil
     */
    public static LegendaryObject createVeil() {
        LegendaryObject veil = new LegendaryObject("Veil", LegendaryObjectType.ARTIFACT);
        veil.setDescription("Enables ghost vision; does not block");
        veil.setAffectsTimeline(true);
        veil.setVisibilityMode(VisibilityMode.GHOST_ONLY);
        veil.addEffect(CausalityEffect.ENABLE_GHOST_VISION);
        veil.addProperty("enablesGhostVision", "true");
        veil.addProperty("doesNotBlock", "true");
        return veil;
    }
    
    /**
     * Créer la Lame d'Avant-Monde
     */
    public static LegendaryObject createLameDAvantMonde() {
        LegendaryObject lame = new LegendaryObject("Lame d'Avant-Monde", LegendaryObjectType.WEAPON);
        lame.setDescription("Forces collapse only when used, not before");
        lame.setAffectsTimeline(false); // OPT-OUT!
        lame.setRequiresActivation(true);
        lame.setActivationCost(1);
        lame.addEffect(CausalityEffect.COLLAPSE_OPPONENT_TIMELINE);
        lame.addProperty("collapseOnUse", "true");
        lame.addProperty("unpredictable", "true");
        return lame;
    }
    
    /**
     * Créer le Rollback Totem
     */
    public static LegendaryObject createRollbackTotem() {
        LegendaryObject totem = new LegendaryObject("Rollback Totem", LegendaryObjectType.SINGULARITY);
        totem.setDescription("Rewinds reality but is unpredictable");
        totem.setAffectsTimeline(false); // OPT-OUT!
        totem.setRequiresActivation(true);
        totem.setActivationCost(3);
        totem.setCooldownTurns(5);
        totem.addEffect(CausalityEffect.REWIND_REALITY);
        totem.addProperty("rewindsTimeline", "true");
        totem.addProperty("unpredictable", "true");
        return totem;
    }
    
    /**
     * Créer les Spectral Shoes
     */
    public static LegendaryObject createSpectralShoes() {
        LegendaryObject shoes = new LegendaryObject("Spectral Shoes", LegendaryObjectType.ARTIFACT);
        shoes.setDescription("Allow movement in ghost zones without interaction");
        shoes.setAffectsTimeline(false); // OPT-OUT!
        shoes.setVisibilityMode(VisibilityMode.GHOST_ONLY);
        shoes.addEffect(CausalityEffect.GHOST_MOVEMENT);
        shoes.addProperty("allowsGhostMovement", "true");
        shoes.addProperty("noInteraction", "true");
        return shoes;
    }
    
    // Méthodes utilitaires
    
    public void addEffect(CausalityEffect effect) {
        this.effects.add(effect);
        this.updatedAt = System.currentTimeMillis();
    }
    
    public void removeEffect(CausalityEffect effect) {
        this.effects.remove(effect);
        this.updatedAt = System.currentTimeMillis();
    }
    
    public boolean hasEffect(CausalityEffect effect) {
        return this.effects.contains(effect);
    }
    
    public void addProperty(String key, String value) {
        this.properties.put(key, value);
        this.updatedAt = System.currentTimeMillis();
    }
    
    public String getProperty(String key) {
        return this.properties.get(key);
    }
    
    public boolean hasProperty(String key) {
        return this.properties.containsKey(key);
    }
    
    public boolean canBeUsed(int currentTurn) {
        if (!isActive) return false;
        if (!requiresActivation) return true;
        
        // Vérifier le cooldown
        return currentTurn - lastUsedTurn >= cooldownTurns;
    }
    
    public void use(int currentTurn) {
        this.lastUsedTurn = currentTurn;
        this.updatedAt = System.currentTimeMillis();
    }
    
    public boolean isInInfluenceRadius(TileCoord objectPosition, TileCoord targetPosition) {
        if (radiusOfInfluence == 0) return false;
        return objectPosition.distanceTo(targetPosition) <= radiusOfInfluence;
    }
    
    public boolean shouldParticipateInCausalityCalculation() {
        return affectsTimeline && isActive;
    }
    
    public boolean isOptedOutOfTimeline() {
        return !affectsTimeline;
    }
    
    public boolean preventsTimelineProjection() {
        return hasEffect(CausalityEffect.PREVENT_TIMELINE_PROJECTION);
    }
    
    public boolean forcesObservation() {
        return hasEffect(CausalityEffect.FORCE_OBSERVATION);
    }
    
    public boolean enablesGhostVision() {
        return hasEffect(CausalityEffect.ENABLE_GHOST_VISION);
    }
    
    public boolean collapseOnUse() {
        return hasProperty("collapseOnUse") && "true".equals(getProperty("collapseOnUse"));
    }
    
    @Override
    public String toString() {
        return String.format("LegendaryObject[%s: %s - affectsTimeline=%s]", 
                           name, objectType, affectsTimeline);
    }
    
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof LegendaryObject)) return false;
        LegendaryObject that = (LegendaryObject) o;
        return Objects.equals(name, that.name);
    }
    
    @Override
    public int hashCode() {
        return Objects.hash(name);
    }
    
    // Getters et Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public LegendaryObjectType getObjectType() { return objectType; }
    public void setObjectType(LegendaryObjectType objectType) { this.objectType = objectType; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public boolean isAffectsTimeline() { return affectsTimeline; }
    public void setAffectsTimeline(boolean affectsTimeline) { this.affectsTimeline = affectsTimeline; }
    
    public VisibilityMode getVisibilityMode() { return visibilityMode; }
    public void setVisibilityMode(VisibilityMode visibilityMode) { this.visibilityMode = visibilityMode; }
    
    public Set<CausalityEffect> getEffects() { return effects; }
    public void setEffects(Set<CausalityEffect> effects) { this.effects = effects; }
    
    public Integer getRadiusOfInfluence() { return radiusOfInfluence; }
    public void setRadiusOfInfluence(Integer radiusOfInfluence) { this.radiusOfInfluence = radiusOfInfluence; }
    
    public Double getStrength() { return strength; }
    public void setStrength(Double strength) { this.strength = strength; }
    
    public boolean isActive() { return isActive; }
    public void setActive(boolean active) { isActive = active; }
    
    public boolean isRequiresActivation() { return requiresActivation; }
    public void setRequiresActivation(boolean requiresActivation) { this.requiresActivation = requiresActivation; }
    
    public Integer getActivationCost() { return activationCost; }
    public void setActivationCost(Integer activationCost) { this.activationCost = activationCost; }
    
    public Integer getCooldownTurns() { return cooldownTurns; }
    public void setCooldownTurns(Integer cooldownTurns) { this.cooldownTurns = cooldownTurns; }
    
    public Integer getLastUsedTurn() { return lastUsedTurn; }
    public void setLastUsedTurn(Integer lastUsedTurn) { this.lastUsedTurn = lastUsedTurn; }
    
    public Map<String, String> getProperties() { return properties; }
    public void setProperties(Map<String, String> properties) { this.properties = properties; }
    
    public Long getCreatedAt() { return createdAt; }
    public void setCreatedAt(Long createdAt) { this.createdAt = createdAt; }
    
    public Long getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Long updatedAt) { this.updatedAt = updatedAt; }
} 