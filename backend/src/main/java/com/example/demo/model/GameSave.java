package com.example.demo.model;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "game_saves")
public class GameSave {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "save_name", nullable = false)
    private String saveName;
    
    @Column(name = "game_id", nullable = false)
    private String gameId;
    
    @Column(name = "player_id", nullable = false)
    private String playerId;
    
    @Column(name = "save_data", columnDefinition = "TEXT")
    private String saveData; // JSON serialized game state
    
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;
    
    @Column(name = "last_played_at")
    private LocalDateTime lastPlayedAt;
    
    @Column(name = "turn_number")
    private Integer turnNumber;
    
    @Column(name = "is_auto_save")
    private Boolean isAutoSave;
    
    @Column(name = "description")
    private String description;
    
    // Constructors
    public GameSave() {
        this.createdAt = LocalDateTime.now();
        this.lastPlayedAt = LocalDateTime.now();
        this.isAutoSave = false;
    }
    
    public GameSave(String saveName, String gameId, String playerId, String saveData, Integer turnNumber) {
        this();
        this.saveName = saveName;
        this.gameId = gameId;
        this.playerId = playerId;
        this.saveData = saveData;
        this.turnNumber = turnNumber;
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getSaveName() { return saveName; }
    public void setSaveName(String saveName) { this.saveName = saveName; }
    
    public String getGameId() { return gameId; }
    public void setGameId(String gameId) { this.gameId = gameId; }
    
    public String getPlayerId() { return playerId; }
    public void setPlayerId(String playerId) { this.playerId = playerId; }
    
    public String getSaveData() { return saveData; }
    public void setSaveData(String saveData) { this.saveData = saveData; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getLastPlayedAt() { return lastPlayedAt; }
    public void setLastPlayedAt(LocalDateTime lastPlayedAt) { this.lastPlayedAt = lastPlayedAt; }
    
    public Integer getTurnNumber() { return turnNumber; }
    public void setTurnNumber(Integer turnNumber) { this.turnNumber = turnNumber; }
    
    public Boolean getIsAutoSave() { return isAutoSave; }
    public void setIsAutoSave(Boolean isAutoSave) { this.isAutoSave = isAutoSave; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
} 