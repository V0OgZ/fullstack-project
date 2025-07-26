package com.example.demo.model;

import jakarta.persistence.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Arrays;

@Entity
@Table(name = "time_configurations")
public class TimeConfiguration {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "world_id")
    private String worldId;
    
    @Column(name = "zone_id")
    private String zoneId;
    
    @Column(name = "zone_type")
    @Enumerated(EnumType.STRING)
    private ZoneType zoneType; // WORLD, REGION, COMBAT_POCKET
    
    // Configuration temporelle globale
    @Column(name = "base_tick_per_day")
    private Integer baseTickPerDay = 24; // Par défaut 24 ticks = 1 jour
    
    @Column(name = "time_scale")
    private Double timeScale = 1.0; // Multiplicateur global
    
    // Temps différencié par joueur
    @ElementCollection
    @CollectionTable(name = "player_time_configs", 
                     joinColumns = @JoinColumn(name = "time_config_id"))
    @MapKeyColumn(name = "player_id")
    @Column(name = "tick_per_day")
    private Map<String, Integer> playerTicksPerDay = new HashMap<>();
    
    // Points de synchronisation
    @ElementCollection
    @CollectionTable(name = "sync_points")
    private List<String> syncPoints; // "dawn", "noon", "dusk", "midnight"
    
    @Column(name = "max_temporal_delta")
    private Integer maxTemporalDelta = 500; // Écart max avant sync forcée
    
    @Column(name = "timeline_phasing_enabled")
    private Boolean timelinePhasingEnabled = false;
    
    // Configuration spéciale pour zones de combat
    @Column(name = "combat_time_mode")
    @Enumerated(EnumType.STRING)
    private CombatTimeMode combatTimeMode = CombatTimeMode.FLUID;
    
    @Column(name = "combat_tick_rate")
    private Integer combatTickRate = 100; // ms entre chaque tick en combat
    
    // Effets visuels de divergence temporelle
    @Embedded
    private DivergenceVisuals divergenceVisuals;
    
    public enum ZoneType {
        WORLD,          // Monde entier
        REGION,         // Région sur la carte stratégique
        COMBAT_POCKET,  // Zone de combat isolée
        TEMPORAL_NEXUS  // Zone spéciale (Tour de Dolburd)
    }
    
    public enum CombatTimeMode {
        TURN_BASED,     // Tour par tour classique
        FLUID,          // Temps fluide (notre mode)
        REAL_TIME,      // Temps réel
        PAUSED          // Pausé tactique
    }
    
    @Embeddable
    public static class DivergenceVisuals {
        private Boolean ghostEchoes = true;
        private Double phaseTransparency = 0.3;
        private String temporalBlur = "adaptive";
        private String realityGlitches = "moderate";
        
        // Getters/Setters
    }
    
    // Méthodes utilitaires
    public Integer getTicksForPlayer(String playerId) {
        return playerTicksPerDay.getOrDefault(playerId, baseTickPerDay);
    }
    
    public void setPlayerTickRate(String playerId, Integer ticksPerDay) {
        playerTicksPerDay.put(playerId, ticksPerDay);
    }
    
    public Double getTimeRatioForPlayer(String playerId) {
        return (double) getTicksForPlayer(playerId) / baseTickPerDay;
    }
    
    public boolean needsSync(Map<String, Integer> playerTicks) {
        if (playerTicks.size() < 2) return false;
        
        int min = playerTicks.values().stream().min(Integer::compareTo).orElse(0);
        int max = playerTicks.values().stream().max(Integer::compareTo).orElse(0);
        
        return (max - min) > maxTemporalDelta;
    }
    
    // Constructeurs
    public TimeConfiguration() {
        this.syncPoints = Arrays.asList("dawn", "noon", "dusk", "midnight");
        this.divergenceVisuals = new DivergenceVisuals();
    }
    
    public TimeConfiguration(String worldId, ZoneType zoneType) {
        this();
        this.worldId = worldId;
        this.zoneType = zoneType;
    }
    
    // Configuration pour une zone de combat
    public static TimeConfiguration createCombatZone(String zoneId) {
        TimeConfiguration config = new TimeConfiguration();
        config.zoneId = zoneId;
        config.zoneType = ZoneType.COMBAT_POCKET;
        config.combatTimeMode = CombatTimeMode.FLUID;
        config.baseTickPerDay = 100; // Combat plus rapide
        config.timelinePhasingEnabled = true;
        return config;
    }
    
    // Configuration pour le monde stratégique
    public static TimeConfiguration createWorldConfig(String worldId) {
        TimeConfiguration config = new TimeConfiguration();
        config.worldId = worldId;
        config.zoneType = ZoneType.WORLD;
        config.baseTickPerDay = 24;
        config.timelinePhasingEnabled = false; // Pas de phase en vue monde
        return config;
    }
    
    // Getters/Setters standards...
}