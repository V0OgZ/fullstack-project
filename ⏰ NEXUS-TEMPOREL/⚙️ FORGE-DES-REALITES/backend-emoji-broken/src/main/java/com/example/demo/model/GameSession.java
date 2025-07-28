package com.example.demo.model;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "game_sessions")
public class GameSession {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "session_id", unique = true, nullable = false)
    private String sessionId;
    
    @Column(name = "name", nullable = false)
    private String name;
    
    @Column(name = "status", nullable = false)
    @Enumerated(EnumType.STRING)
    private GameSessionStatus status;
    
    @Column(name = "max_players", nullable = false)
    private Integer maxPlayers;
    
    @Column(name = "current_players", nullable = false)
    private Integer currentPlayers;
    
    @Column(name = "game_mode", nullable = false)
    private String gameMode;
    
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;
    
    @Column(name = "started_at")
    private LocalDateTime startedAt;
    
    @Column(name = "ended_at")
    private LocalDateTime endedAt;
    
    @ElementCollection
    @CollectionTable(name = "game_session_players", joinColumns = @JoinColumn(name = "session_id"))
    @Column(name = "player_id")
    private List<String> playerIds;
    
    // Phase 5 network mode specific fields
    @Column(name = "network_mode", nullable = false)
    private Boolean networkMode;
    
    @Column(name = "real_time_sync", nullable = false)
    private Boolean realTimeSync;
    
    @Column(name = "zfc_enabled", nullable = false)
    private Boolean zfcEnabled;
    
    // Constructors
    public GameSession() {
        this.playerIds = new ArrayList<>();
        this.currentPlayers = 0;
        this.createdAt = LocalDateTime.now();
        this.status = GameSessionStatus.WAITING;
        this.networkMode = true;
        this.realTimeSync = true;
        this.zfcEnabled = true;
    }
    
    public GameSession(String sessionId, String name, Integer maxPlayers, String gameMode) {
        this();
        this.sessionId = sessionId;
        this.name = name;
        this.maxPlayers = maxPlayers;
        this.gameMode = gameMode;
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getSessionId() { return sessionId; }
    public void setSessionId(String sessionId) { this.sessionId = sessionId; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public GameSessionStatus getStatus() { return status; }
    public void setStatus(GameSessionStatus status) { this.status = status; }
    
    public Integer getMaxPlayers() { return maxPlayers; }
    public void setMaxPlayers(Integer maxPlayers) { this.maxPlayers = maxPlayers; }
    
    public Integer getCurrentPlayers() { return currentPlayers; }
    public void setCurrentPlayers(Integer currentPlayers) { this.currentPlayers = currentPlayers; }
    
    public String getGameMode() { return gameMode; }
    public void setGameMode(String gameMode) { this.gameMode = gameMode; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getStartedAt() { return startedAt; }
    public void setStartedAt(LocalDateTime startedAt) { this.startedAt = startedAt; }
    
    public LocalDateTime getEndedAt() { return endedAt; }
    public void setEndedAt(LocalDateTime endedAt) { this.endedAt = endedAt; }
    
    public List<String> getPlayerIds() { return playerIds; }
    public void setPlayerIds(List<String> playerIds) { this.playerIds = playerIds; }
    
    public Boolean getNetworkMode() { return networkMode; }
    public void setNetworkMode(Boolean networkMode) { this.networkMode = networkMode; }
    
    public Boolean getRealTimeSync() { return realTimeSync; }
    public void setRealTimeSync(Boolean realTimeSync) { this.realTimeSync = realTimeSync; }
    
    public Boolean getZfcEnabled() { return zfcEnabled; }
    public void setZfcEnabled(Boolean zfcEnabled) { this.zfcEnabled = zfcEnabled; }
    
    // Helper methods
    public void addPlayer(String playerId) {
        if (!playerIds.contains(playerId) && currentPlayers < maxPlayers) {
            playerIds.add(playerId);
            currentPlayers++;
        }
    }
    
    public void removePlayer(String playerId) {
        if (playerIds.remove(playerId)) {
            currentPlayers--;
        }
    }
    
    public boolean isFull() {
        return currentPlayers >= maxPlayers;
    }
    
    public boolean canStart() {
        return currentPlayers >= 2 && status == GameSessionStatus.WAITING;
    }
    
    public void start() {
        if (canStart()) {
            status = GameSessionStatus.ACTIVE;
            startedAt = LocalDateTime.now();
        }
    }
    
    public void end() {
        status = GameSessionStatus.ENDED;
        endedAt = LocalDateTime.now();
    }
} 