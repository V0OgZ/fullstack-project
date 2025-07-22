package com.heroesoftimepoc.temporalengine.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

/**
 * Entité représentant un joueur dans le jeu
 */
@Entity
@Table(name = "players")
public class Player {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "name", nullable = false)
    private String name;
    
    @Column(name = "status")
    private String status = "ACTIVE";
    
    @Column(name = "joined_at")
    private LocalDateTime joinedAt;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "game_id")
    private Game game;
    
    // Constructors
    public Player() {
        this.joinedAt = LocalDateTime.now();
    }
    
    public Player(String name) {
        this();
        this.name = name;
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    
    public LocalDateTime getJoinedAt() { return joinedAt; }
    public void setJoinedAt(LocalDateTime joinedAt) { this.joinedAt = joinedAt; }
    
    public Game getGame() { return game; }
    public void setGame(Game game) { this.game = game; }
    
    @Override
    public String toString() {
        return "Player{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", status='" + status + '\'' +
                ", joinedAt=" + joinedAt +
                '}';
    }
} 