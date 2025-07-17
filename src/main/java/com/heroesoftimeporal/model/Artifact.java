package com.heroesoftimeporal.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * 🔮 Artifact - Represents temporal artifacts with 5D spacetime effects
 * 
 * Artifacts can manipulate time, space, and probability across multiple timelines
 */
public class Artifact {
    
    @JsonProperty("id")
    private String id;
    
    @JsonProperty("name")
    private String name;
    
    @JsonProperty("displayName")
    private String displayName;
    
    @JsonProperty("tier")
    private ArtifactTier tier;
    
    @JsonProperty("type")
    private ArtifactType type;
    
    @JsonProperty("powerLevel")
    private int powerLevel;
    
    @JsonProperty("rarity")
    private double rarity;  // Drop rate percentage
    
    @JsonProperty("maxUsesPerGame")
    private int maxUsesPerGame;
    
    @JsonProperty("usesRemaining")
    private int usesRemaining;
    
    @JsonProperty("description")
    private String description;
    
    @JsonProperty("effects")
    private List<ArtifactEffect> effects = new ArrayList<>();
    
    @JsonProperty("requirements")
    private ArtifactRequirements requirements;
    
    @JsonProperty("ownerId")
    private String ownerId;
    
    @JsonProperty("createdAt")
    private LocalDateTime createdAt;
    
    @JsonProperty("lastUsed")
    private LocalDateTime lastUsed;
    
    // Artifact Tiers
    public enum ArtifactTier {
        COMMON(0.0, 60.0, 8),
        RARE(0.2, 25.0, 5),
        LEGENDARY(0.5, 12.0, 3),
        PARADOX(1.0, 2.5, 2),
        SINGULARITY(2.0, 0.5, 1);
        
        private final double tierMultiplier;
        private final double dropRate;
        private final int maxPerGame;
        
        ArtifactTier(double tierMultiplier, double dropRate, int maxPerGame) {
            this.tierMultiplier = tierMultiplier;
            this.dropRate = dropRate;
            this.maxPerGame = maxPerGame;
        }
        
        public double getTierMultiplier() { return tierMultiplier; }
        public double getDropRate() { return dropRate; }
        public int getMaxPerGame() { return maxPerGame; }
    }
    
    // Artifact Types
    public enum ArtifactType {
        WEAPON,          // Lame d'Avant-Monde
        TEMPORAL_DEVICE, // Horloge du Dernier Instant
        BEACON,          // Balise d'Ignorance Temporelle
        STRUCTURE,       // Tour de l'Ancrage
        INSTRUMENT,      // Trompette de l'Apocalypse
        CRYSTAL,         // Nexus Crystal
        SHARD,           // Temporal Shard
        ANCHOR,          // Temporal Anchor
        PRISM,           // Battle Prism
        ECHO             // Time Echo
    }
    
    // Artifact Effects
    public static class ArtifactEffect {
        @JsonProperty("type")
        private EffectType type;
        
        @JsonProperty("value")
        private double value;
        
        @JsonProperty("duration")
        private int duration;  // Turns, -1 for permanent
        
        @JsonProperty("radius")
        private int radius;    // Area of effect
        
        @JsonProperty("condition")
        private String condition;  // When effect triggers
        
        public enum EffectType {
            PROBABILITY_BOOST,      // +0.5 to ψ-state probability
            BATTLE_SCORE_BONUS,     // +0.5 to battle score
            PHANTOM_BATTLE_TRIGGER, // 85% chance to trigger phantom battle
            ROLLBACK_TURNS,         // Rollback 1-3 turns
            TEMPORAL_GEL_ZONE,      // Create temporal gel zone
            IGNORE_WEAK_HEROES,     // Ignore heroes below threshold
            MICRO_ANOMALY_RISK,     // Risk of temporal anomaly
            TEMPORAL_RESISTANCE,    // 92% resistance to temporal effects
            ANCHOR_ZONE,            // Create anchor zone
            TIMELINE_COLLAPSE,      // Force single timeline
            DUEL_TRIGGER,           // Trigger duel between players
            EFFACEMENT_RISK,        // Risk of total timeline elimination
            TIMELINE_MERGE,         // Merge multiple timelines
            PROBABILITY_REDISTRIBUTION, // Redistribute probabilities
            TEMPORAL_ENERGY_RESTORE,    // Restore temporal energy
            MOVEMENT_BONUS,         // Extra movement points
            DEFENSIVE_BONUS,        // Defensive bonus in combat
            TEMPORAL_STABILITY      // Increase temporal stability
        }
        
        public ArtifactEffect(EffectType type, double value) {
            this.type = type;
            this.value = value;
            this.duration = -1;  // Permanent by default
            this.radius = 0;     // No area effect by default
        }
        
        public ArtifactEffect(EffectType type, double value, int duration, int radius) {
            this.type = type;
            this.value = value;
            this.duration = duration;
            this.radius = radius;
        }
        
        // Getters and setters
        public EffectType getType() { return type; }
        public void setType(EffectType type) { this.type = type; }
        
        public double getValue() { return value; }
        public void setValue(double value) { this.value = value; }
        
        public int getDuration() { return duration; }
        public void setDuration(int duration) { this.duration = duration; }
        
        public int getRadius() { return radius; }
        public void setRadius(int radius) { this.radius = radius; }
        
        public String getCondition() { return condition; }
        public void setCondition(String condition) { this.condition = condition; }
    }
    
    // Artifact Requirements
    public static class ArtifactRequirements {
        @JsonProperty("minHeroLevel")
        private int minHeroLevel;
        
        @JsonProperty("minTemporalEnergy")
        private int minTemporalEnergy;
        
        @JsonProperty("requiredTimeline")
        private String requiredTimeline;
        
        @JsonProperty("cooldownTurns")
        private int cooldownTurns;
        
        public ArtifactRequirements() {
            this.minHeroLevel = 1;
            this.minTemporalEnergy = 1;
            this.cooldownTurns = 0;
        }
        
        public ArtifactRequirements(int minHeroLevel, int minTemporalEnergy, int cooldownTurns) {
            this.minHeroLevel = minHeroLevel;
            this.minTemporalEnergy = minTemporalEnergy;
            this.cooldownTurns = cooldownTurns;
        }
        
        // Getters and setters
        public int getMinHeroLevel() { return minHeroLevel; }
        public void setMinHeroLevel(int minHeroLevel) { this.minHeroLevel = minHeroLevel; }
        
        public int getMinTemporalEnergy() { return minTemporalEnergy; }
        public void setMinTemporalEnergy(int minTemporalEnergy) { this.minTemporalEnergy = minTemporalEnergy; }
        
        public String getRequiredTimeline() { return requiredTimeline; }
        public void setRequiredTimeline(String requiredTimeline) { this.requiredTimeline = requiredTimeline; }
        
        public int getCooldownTurns() { return cooldownTurns; }
        public void setCooldownTurns(int cooldownTurns) { this.cooldownTurns = cooldownTurns; }
    }
    
    // Constructors
    public Artifact() {
        this.createdAt = LocalDateTime.now();
        this.effects = new ArrayList<>();
        this.requirements = new ArtifactRequirements();
    }
    
    public Artifact(String id, String name, String displayName, ArtifactTier tier, ArtifactType type, int powerLevel) {
        this();
        this.id = id;
        this.name = name;
        this.displayName = displayName;
        this.tier = tier;
        this.type = type;
        this.powerLevel = powerLevel;
        this.rarity = tier.getDropRate();
        this.maxUsesPerGame = calculateMaxUses(tier);
        this.usesRemaining = maxUsesPerGame;
    }
    
    private int calculateMaxUses(ArtifactTier tier) {
        switch (tier) {
            case COMMON: return 10;
            case RARE: return 8;
            case LEGENDARY: return 5;
            case PARADOX: return 3;
            case SINGULARITY: return 1;
            default: return 5;
        }
    }
    
    // Artifact Power Calculation
    public double calculateArtifactPower(double synergyBonus, double temporalResonance) {
        return powerLevel * (1 + tier.getTierMultiplier() + synergyBonus + temporalResonance);
    }
    
    // Usage Methods
    public boolean canUse(Hero hero) {
        if (usesRemaining <= 0) return false;
        if (hero.getLevel() < requirements.getMinHeroLevel()) return false;
        if (hero.getTemporalEnergy() < requirements.getMinTemporalEnergy()) return false;
        if (requirements.getRequiredTimeline() != null && 
            !hero.getTimeline().equals(requirements.getRequiredTimeline())) return false;
        
        return true;
    }
    
    public void use() {
        if (usesRemaining > 0) {
            usesRemaining--;
            lastUsed = LocalDateTime.now();
        }
    }
    
    public void restore() {
        usesRemaining = maxUsesPerGame;
    }
    
    // Effect Methods
    public void addEffect(ArtifactEffect effect) {
        effects.add(effect);
    }
    
    public void removeEffect(ArtifactEffect.EffectType effectType) {
        effects.removeIf(effect -> effect.getType() == effectType);
    }
    
    public boolean hasEffect(ArtifactEffect.EffectType effectType) {
        return effects.stream().anyMatch(effect -> effect.getType() == effectType);
    }
    
    public ArtifactEffect getEffect(ArtifactEffect.EffectType effectType) {
        return effects.stream()
                .filter(effect -> effect.getType() == effectType)
                .findFirst()
                .orElse(null);
    }
    
    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getDisplayName() { return displayName; }
    public void setDisplayName(String displayName) { this.displayName = displayName; }
    
    public ArtifactTier getTier() { return tier; }
    public void setTier(ArtifactTier tier) { this.tier = tier; }
    
    public ArtifactType getType() { return type; }
    public void setType(ArtifactType type) { this.type = type; }
    
    public int getPowerLevel() { return powerLevel; }
    public void setPowerLevel(int powerLevel) { this.powerLevel = powerLevel; }
    
    public double getRarity() { return rarity; }
    public void setRarity(double rarity) { this.rarity = rarity; }
    
    public int getMaxUsesPerGame() { return maxUsesPerGame; }
    public void setMaxUsesPerGame(int maxUsesPerGame) { this.maxUsesPerGame = maxUsesPerGame; }
    
    public int getUsesRemaining() { return usesRemaining; }
    public void setUsesRemaining(int usesRemaining) { this.usesRemaining = usesRemaining; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public List<ArtifactEffect> getEffects() { return effects; }
    public void setEffects(List<ArtifactEffect> effects) { this.effects = effects; }
    
    public ArtifactRequirements getRequirements() { return requirements; }
    public void setRequirements(ArtifactRequirements requirements) { this.requirements = requirements; }
    
    public String getOwnerId() { return ownerId; }
    public void setOwnerId(String ownerId) { this.ownerId = ownerId; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getLastUsed() { return lastUsed; }
    public void setLastUsed(LocalDateTime lastUsed) { this.lastUsed = lastUsed; }
    
    @Override
    public String toString() {
        return String.format("Artifact{id='%s', name='%s', tier=%s, powerLevel=%d, usesRemaining=%d}", 
                           id, displayName, tier, powerLevel, usesRemaining);
    }
    
    // Static Factory Methods for Predefined Artifacts
    public static Artifact createLameAvantMonde() {
        Artifact artifact = new Artifact("avant_world_blade", "AvantWorldBlade", "Lame d'Avant-Monde", 
                                        ArtifactTier.PARADOX, ArtifactType.WEAPON, 9);
        artifact.setDescription("Write future events that ignore timeline conflicts");
        artifact.setMaxUsesPerGame(3);
        artifact.setUsesRemaining(3);
        
        // Add effects
        artifact.addEffect(new ArtifactEffect(ArtifactEffect.EffectType.PROBABILITY_BOOST, 0.5));
        artifact.addEffect(new ArtifactEffect(ArtifactEffect.EffectType.BATTLE_SCORE_BONUS, 0.5));
        artifact.addEffect(new ArtifactEffect(ArtifactEffect.EffectType.PHANTOM_BATTLE_TRIGGER, 0.85));
        
        // Requirements
        artifact.getRequirements().setMinHeroLevel(5);
        artifact.getRequirements().setMinTemporalEnergy(3);
        artifact.getRequirements().setCooldownTurns(2);
        
        return artifact;
    }
    
    public static Artifact createHorlogeDernierInstant() {
        Artifact artifact = new Artifact("reverse_clock", "ReverseClock", "Horloge du Dernier Instant", 
                                        ArtifactTier.LEGENDARY, ArtifactType.TEMPORAL_DEVICE, 6);
        artifact.setDescription("Rollback 1-3 turns for a hero or building");
        artifact.setMaxUsesPerGame(4);
        artifact.setUsesRemaining(4);
        
        // Add effects
        artifact.addEffect(new ArtifactEffect(ArtifactEffect.EffectType.ROLLBACK_TURNS, 3));
        artifact.addEffect(new ArtifactEffect(ArtifactEffect.EffectType.TEMPORAL_GEL_ZONE, 1.4, 1, 3));
        
        // Requirements
        artifact.getRequirements().setMinHeroLevel(3);
        artifact.getRequirements().setMinTemporalEnergy(2);
        artifact.getRequirements().setCooldownTurns(1);
        
        return artifact;
    }
    
    public static Artifact createBaliseIgnoranceTemporelle() {
        Artifact artifact = new Artifact("ignore_beacon", "IgnoreBeacon", "Balise d'Ignorance Temporelle", 
                                        ArtifactTier.LEGENDARY, ArtifactType.BEACON, 5);
        artifact.setDescription("Ignore weak/inactive heroes blocking advancement");
        artifact.setMaxUsesPerGame(5);
        artifact.setUsesRemaining(5);
        
        // Add effects
        artifact.addEffect(new ArtifactEffect(ArtifactEffect.EffectType.IGNORE_WEAK_HEROES, 0.4, 3, 1));
        artifact.addEffect(new ArtifactEffect(ArtifactEffect.EffectType.MICRO_ANOMALY_RISK, 0.3));
        
        // Requirements
        artifact.getRequirements().setMinHeroLevel(2);
        artifact.getRequirements().setMinTemporalEnergy(1);
        
        return artifact;
    }
    
    public static Artifact createTourAncrage() {
        Artifact artifact = new Artifact("anchor_tower", "AnchorTower", "Tour de l'Ancrage", 
                                        ArtifactTier.LEGENDARY, ArtifactType.STRUCTURE, 7);
        artifact.setDescription("Create zone immune to temporal alterations");
        artifact.setMaxUsesPerGame(3);
        artifact.setUsesRemaining(3);
        
        // Add effects
        artifact.addEffect(new ArtifactEffect(ArtifactEffect.EffectType.TEMPORAL_RESISTANCE, 0.92, 7, 3));
        artifact.addEffect(new ArtifactEffect(ArtifactEffect.EffectType.ANCHOR_ZONE, 1.0, 7, 3));
        
        // Requirements
        artifact.getRequirements().setMinHeroLevel(4);
        artifact.getRequirements().setMinTemporalEnergy(3);
        artifact.getRequirements().setCooldownTurns(3);
        
        return artifact;
    }
    
    public static Artifact createTrompetteApocalypse() {
        Artifact artifact = new Artifact("apocalypse_horn", "ApocalypseHorn", "Trompette de l'Apocalypse", 
                                        ArtifactTier.SINGULARITY, ArtifactType.INSTRUMENT, 10);
        artifact.setDescription("Force single timeline on a zone");
        artifact.setMaxUsesPerGame(1);
        artifact.setUsesRemaining(1);
        
        // Add effects
        artifact.addEffect(new ArtifactEffect(ArtifactEffect.EffectType.TIMELINE_COLLAPSE, 0.95, -1, 5));
        artifact.addEffect(new ArtifactEffect(ArtifactEffect.EffectType.DUEL_TRIGGER, 0.8));
        artifact.addEffect(new ArtifactEffect(ArtifactEffect.EffectType.EFFACEMENT_RISK, 0.3));
        
        // Requirements
        artifact.getRequirements().setMinHeroLevel(8);
        artifact.getRequirements().setMinTemporalEnergy(5);
        artifact.getRequirements().setCooldownTurns(0);  // Once per game
        
        return artifact;
    }
    
    public static Artifact createNexusCrystal() {
        Artifact artifact = new Artifact("nexus_crystal", "NexusCrystal", "Nexus Crystal", 
                                        ArtifactTier.PARADOX, ArtifactType.CRYSTAL, 8);
        artifact.setDescription("Merge multiple timelines and redistribute probabilities");
        artifact.setMaxUsesPerGame(2);
        artifact.setUsesRemaining(2);
        
        // Add effects
        artifact.addEffect(new ArtifactEffect(ArtifactEffect.EffectType.TIMELINE_MERGE, 0.7));
        artifact.addEffect(new ArtifactEffect(ArtifactEffect.EffectType.PROBABILITY_REDISTRIBUTION, 0.3));
        
        // Requirements
        artifact.getRequirements().setMinHeroLevel(6);
        artifact.getRequirements().setMinTemporalEnergy(4);
        artifact.getRequirements().setCooldownTurns(5);
        
        return artifact;
    }
}