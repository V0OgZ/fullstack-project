// @module: Core Game Model
// @exposed-to: GameController, TemporalEngineController
// @related-models: Hero, PsiState, Timeline, GameTile
// @description: Modèle principal du jeu avec coordonnées 5D (x,y,z,timeline,temporalLayer)

package com.heroesoftimepoc.temporalengine.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "games")
public class Game {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "game_name", nullable = false)
    private String gameName;
    
    @Column(name = "current_turn")
    private Integer currentTurn = 0;
    
    @Column(name = "current_player")
    private String currentPlayer;
    
    @Column(name = "map_width")
    private Integer mapWidth = 20;
    
    @Column(name = "map_height")
    private Integer mapHeight = 20;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private GameStatus status = GameStatus.WAITING;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "started_at")
    private LocalDateTime startedAt;
    
    @Column(name = "ended_at")
    private LocalDateTime endedAt;
    
    @ElementCollection
    @CollectionTable(name = "game_players", joinColumns = @JoinColumn(name = "game_id"))
    @Column(name = "player_id")
    private List<String> players = new ArrayList<>();
    
    @OneToMany(mappedBy = "game", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Hero> heroes = new ArrayList<>();
    
    @OneToMany(mappedBy = "game", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<PsiState> psiStates = new ArrayList<>();
    
    @OneToMany(mappedBy = "game", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<GameTile> tiles = new ArrayList<>();
    
    @Column(name = "winner")
    private String winner;
    
    @Column(name = "max_players")
    private Integer maxPlayers = 4;
    
    @Column(name = "current_timeline")
    private String currentTimeline = "ℬ1";
    
    public enum GameStatus {
        WAITING,
        ACTIVE,
        PAUSED,
        FINISHED,
        CANCELLED
    }
    
    // Constructors
    public Game() {
        this.createdAt = LocalDateTime.now();
    }
    
    public Game(String gameName) {
        this();
        this.gameName = gameName;
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getGameName() { return gameName; }
    public void setGameName(String gameName) { this.gameName = gameName; }
    
    public Integer getCurrentTurn() { return currentTurn; }
    public void setCurrentTurn(Integer currentTurn) { this.currentTurn = currentTurn; }
    
    public String getCurrentPlayer() { return currentPlayer; }
    public void setCurrentPlayer(String currentPlayer) { this.currentPlayer = currentPlayer; }
    
    public Integer getMapWidth() { return mapWidth; }
    public void setMapWidth(Integer mapWidth) { this.mapWidth = mapWidth; }
    
    public Integer getMapHeight() { return mapHeight; }
    public void setMapHeight(Integer mapHeight) { this.mapHeight = mapHeight; }
    
    public GameStatus getStatus() { return status; }
    public void setStatus(GameStatus status) { this.status = status; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getStartedAt() { return startedAt; }
    public void setStartedAt(LocalDateTime startedAt) { this.startedAt = startedAt; }
    
    public LocalDateTime getEndedAt() { return endedAt; }
    public void setEndedAt(LocalDateTime endedAt) { this.endedAt = endedAt; }
    
    public List<String> getPlayers() { return players; }
    public void setPlayers(List<String> players) { this.players = players; }
    
    public List<Hero> getHeroes() { return heroes; }
    public void setHeroes(List<Hero> heroes) { this.heroes = heroes; }
    
    public List<PsiState> getPsiStates() { return psiStates; }
    public void setPsiStates(List<PsiState> psiStates) { this.psiStates = psiStates; }
    
    public List<GameTile> getTiles() { return tiles; }
    public void setTiles(List<GameTile> tiles) { this.tiles = tiles; }
    
    public String getWinner() { return winner; }
    public void setWinner(String winner) { this.winner = winner; }
    
    public Integer getMaxPlayers() { return maxPlayers; }
    public void setMaxPlayers(Integer maxPlayers) { this.maxPlayers = maxPlayers; }
    
    public String getCurrentTimeline() { return currentTimeline; }
    public void setCurrentTimeline(String currentTimeline) { this.currentTimeline = currentTimeline; }
    
    // Helper methods
    public void addPlayer(String playerId) {
        if (!players.contains(playerId) && players.size() < maxPlayers) {
            players.add(playerId);
        }
    }
    
    public void removePlayer(String playerId) {
        players.remove(playerId);
    }
    
    public boolean canStart() {
        return status == GameStatus.WAITING && players.size() >= 2;
    }
    
    public void start() {
        if (canStart()) {
            this.status = GameStatus.ACTIVE;
            this.startedAt = LocalDateTime.now();
            this.currentPlayer = players.get(0);
        }
    }
    
    public void nextTurn() {
        if (status == GameStatus.ACTIVE) {
            currentTurn++;
            int currentPlayerIndex = players.indexOf(currentPlayer);
            int nextPlayerIndex = (currentPlayerIndex + 1) % players.size();
            currentPlayer = players.get(nextPlayerIndex);
        }
    }
    
    public void finish(String winner) {
        this.status = GameStatus.FINISHED;
        this.winner = winner;
        this.endedAt = LocalDateTime.now();
    }
    
    public boolean isActive() {
        return status == GameStatus.ACTIVE;
    }
    
    public boolean isPlayerTurn(String playerId) {
        return currentPlayer != null && currentPlayer.equals(playerId);
    }
    
    public Hero getHeroByName(String name) {
        return heroes.stream()
                .filter(hero -> hero.getName().equals(name))
                .findFirst()
                .orElse(null);
    }
    
    public List<Hero> getHeroesByPlayer(String playerId) {
        return heroes.stream()
                .filter(hero -> hero.getPlayerId().equals(playerId))
                .toList();
    }
    
    public List<PsiState> getActivePsiStates() {
        return psiStates.stream()
                .filter(PsiState::isActive)
                .toList();
    }
    
    public List<PsiState> getPsiStatesAtPosition(int x, int y) {
        return psiStates.stream()
                .filter(psi -> psi.isActive() && psi.isAtPosition(x, y))
                .toList();
    }
    
    public GameTile getTileAt(int x, int y) {
        return tiles.stream()
                .filter(tile -> tile.getX() == x && tile.getY() == y)
                .findFirst()
                .orElse(null);
    }
    
    public void addPsiState(PsiState psiState) {
        psiState.setGame(this);
        psiStates.add(psiState);
    }
    
    public void addHero(Hero hero) {
        hero.setGame(this);
        heroes.add(hero);
    }
    
    public void addTile(GameTile tile) {
        tile.setGame(this);
        tiles.add(tile);
    }
    
    @Override
    public String toString() {
        return String.format("Game{id=%d, name='%s', turn=%d, status=%s, players=%d}", 
                           id, gameName, currentTurn, status, players.size());
    }
}