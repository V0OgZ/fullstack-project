package com.heroesoftimepoc.temporalengine.model;

import jakarta.persistence.*;
import java.util.Map;

/**
 * Modèle pour les villes
 * Remplace les mocks par de vraies données
 */
@Entity
@Table(name = "cities")
public class City {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "level")
    private Integer level;

    @Column(name = "resources", columnDefinition = "TEXT")
    @Convert(converter = JsonConverter.class)
    private Map<String, Object> resources;

    @Column(name = "buildings", columnDefinition = "TEXT")
    @Convert(converter = JsonConverter.class)
    private Map<String, Object> buildings;

    @Column(name = "income", columnDefinition = "TEXT")
    @Convert(converter = JsonConverter.class)
    private Map<String, Object> income;

    @Column(name = "game_id")
    private Long gameId;

    @Column(name = "player_id")
    private String playerId;

    // Constructeurs
    public City() {}

    public City(String name, Integer level) {
        this.name = name;
        this.level = level;
    }

    // Getters et Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getLevel() {
        return level;
    }

    public void setLevel(Integer level) {
        this.level = level;
    }

    public Map<String, Object> getResources() {
        return resources;
    }

    public void setResources(Map<String, Object> resources) {
        this.resources = resources;
    }

    public Map<String, Object> getBuildings() {
        return buildings;
    }

    public void setBuildings(Map<String, Object> buildings) {
        this.buildings = buildings;
    }

    public Map<String, Object> getIncome() {
        return income;
    }

    public void setIncome(Map<String, Object> income) {
        this.income = income;
    }

    public Long getGameId() {
        return gameId;
    }

    public void setGameId(Long gameId) {
        this.gameId = gameId;
    }

    public String getPlayerId() {
        return playerId;
    }

    public void setPlayerId(String playerId) {
        this.playerId = playerId;
    }

    @Override
    public String toString() {
        return "City{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", level=" + level +
                ", gameId=" + gameId +
                ", playerId='" + playerId + '\'' +
                '}';
    }
} 