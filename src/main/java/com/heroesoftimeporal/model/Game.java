package com.heroesoftimeporal.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 🎮 Game - Main game entity that orchestrates the 5D spacetime temporal strategy game
 * 
 * Manages players, heroes, map, artifacts, timelines, and game state
 */
public class Game {
    
    @JsonProperty("id")
    private String id;
    
    @JsonProperty("name")
    private String name;
    
    @JsonProperty("status")
    private GameStatus status;
    
    @JsonProperty("currentTurn")
    private int currentTurn;
    
    @JsonProperty("currentPlayerId")
    private String currentPlayerId;
    
    @JsonProperty("maxPlayers")
    private int maxPlayers;
    
    @JsonProperty("maxTurns")
    private int maxTurns;
    
    // Game Components
    @JsonProperty("players")
    private List<Player> players = new ArrayList<>();
    
    @JsonProperty("heroes")
    private List<Hero> heroes = new ArrayList<>();
    
    @JsonProperty("artifacts")
    private List<Artifact> artifacts = new ArrayList<>();
    
    @JsonProperty("gameMap")
    private GameMap gameMap;
    
    @JsonProperty("timelines")
    private List<Timeline> timelines = new ArrayList<>();
    
    @JsonProperty("psiStates")
    private List<PsiState> psiStates = new ArrayList<>();
    
    @JsonProperty("conflictZones")
    private List<ConflictZone> conflictZones = new ArrayList<>();
    
    @JsonProperty("temporalEvents")
    private List<TemporalEvent> temporalEvents = new ArrayList<>();
    
    // Game Settings
    @JsonProperty("settings")
    private GameSettings settings;
    
    // Timestamps
    @JsonProperty("createdAt")
    private LocalDateTime createdAt;
    
    @JsonProperty("startedAt")
    private LocalDateTime startedAt;
    
    @JsonProperty("lastActivity")
    private LocalDateTime lastActivity;
    
    @JsonProperty("endedAt")
    private LocalDateTime endedAt;
    
    // Game Status
    public enum GameStatus {
        WAITING_FOR_PLAYERS,
        STARTING,
        IN_PROGRESS,
        PAUSED,
        ENDED,
        CANCELLED
    }
    
    // Player
    public static class Player {
        @JsonProperty("id")
        private String id;
        
        @JsonProperty("name")
        private String name;
        
        @JsonProperty("color")
        private String color;
        
        @JsonProperty("isReady")
        private boolean isReady;
        
        @JsonProperty("isActive")
        private boolean isActive;
        
        @JsonProperty("heroIds")
        private List<String> heroIds = new ArrayList<>();
        
        @JsonProperty("artifactIds")
        private List<String> artifactIds = new ArrayList<>();
        
        @JsonProperty("resources")
        private PlayerResources resources;
        
        @JsonProperty("statistics")
        private PlayerStatistics statistics;
        
        @JsonProperty("joinedAt")
        private LocalDateTime joinedAt;
        
        public Player() {
            this.joinedAt = LocalDateTime.now();
            this.isReady = false;
            this.isActive = true;
            this.heroIds = new ArrayList<>();
            this.artifactIds = new ArrayList<>();
            this.resources = new PlayerResources();
            this.statistics = new PlayerStatistics();
        }
        
        public Player(String id, String name, String color) {
            this();
            this.id = id;
            this.name = name;
            this.color = color;
        }
        
        // Getters and setters
        public String getId() { return id; }
        public void setId(String id) { this.id = id; }
        
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        
        public String getColor() { return color; }
        public void setColor(String color) { this.color = color; }
        
        public boolean isReady() { return isReady; }
        public void setReady(boolean ready) { isReady = ready; }
        
        public boolean isActive() { return isActive; }
        public void setActive(boolean active) { isActive = active; }
        
        public List<String> getHeroIds() { return heroIds; }
        public void setHeroIds(List<String> heroIds) { this.heroIds = heroIds; }
        
        public List<String> getArtifactIds() { return artifactIds; }
        public void setArtifactIds(List<String> artifactIds) { this.artifactIds = artifactIds; }
        
        public PlayerResources getResources() { return resources; }
        public void setResources(PlayerResources resources) { this.resources = resources; }
        
        public PlayerStatistics getStatistics() { return statistics; }
        public void setStatistics(PlayerStatistics statistics) { this.statistics = statistics; }
        
        public LocalDateTime getJoinedAt() { return joinedAt; }
        public void setJoinedAt(LocalDateTime joinedAt) { this.joinedAt = joinedAt; }
    }
    
    // Player Resources
    public static class PlayerResources {
        @JsonProperty("gold")
        private int gold;
        
        @JsonProperty("mana")
        private int mana;
        
        @JsonProperty("temporalEnergy")
        private int temporalEnergy;
        
        @JsonProperty("artifacts")
        private int artifacts;
        
        public PlayerResources() {
            this.gold = 1000;
            this.mana = 100;
            this.temporalEnergy = 50;
            this.artifacts = 0;
        }
        
        // Getters and setters
        public int getGold() { return gold; }
        public void setGold(int gold) { this.gold = gold; }
        
        public int getMana() { return mana; }
        public void setMana(int mana) { this.mana = mana; }
        
        public int getTemporalEnergy() { return temporalEnergy; }
        public void setTemporalEnergy(int temporalEnergy) { this.temporalEnergy = temporalEnergy; }
        
        public int getArtifacts() { return artifacts; }
        public void setArtifacts(int artifacts) { this.artifacts = artifacts; }
    }
    
    // Player Statistics
    public static class PlayerStatistics {
        @JsonProperty("turnsPlayed")
        private int turnsPlayed;
        
        @JsonProperty("heroesCreated")
        private int heroesCreated;
        
        @JsonProperty("artifactsUsed")
        private int artifactsUsed;
        
        @JsonProperty("psiStatesCreated")
        private int psiStatesCreated;
        
        @JsonProperty("timelinesCreated")
        private int timelinesCreated;
        
        @JsonProperty("battlesWon")
        private int battlesWon;
        
        @JsonProperty("battlesLost")
        private int battlesLost;
        
        @JsonProperty("temporalManipulations")
        private int temporalManipulations;
        
        public PlayerStatistics() {
            // Initialize all to 0
        }
        
        // Getters and setters
        public int getTurnsPlayed() { return turnsPlayed; }
        public void setTurnsPlayed(int turnsPlayed) { this.turnsPlayed = turnsPlayed; }
        
        public int getHeroesCreated() { return heroesCreated; }
        public void setHeroesCreated(int heroesCreated) { this.heroesCreated = heroesCreated; }
        
        public int getArtifactsUsed() { return artifactsUsed; }
        public void setArtifactsUsed(int artifactsUsed) { this.artifactsUsed = artifactsUsed; }
        
        public int getPsiStatesCreated() { return psiStatesCreated; }
        public void setPsiStatesCreated(int psiStatesCreated) { this.psiStatesCreated = psiStatesCreated; }
        
        public int getTimelinesCreated() { return timelinesCreated; }
        public void setTimelinesCreated(int timelinesCreated) { this.timelinesCreated = timelinesCreated; }
        
        public int getBattlesWon() { return battlesWon; }
        public void setBattlesWon(int battlesWon) { this.battlesWon = battlesWon; }
        
        public int getBattlesLost() { return battlesLost; }
        public void setBattlesLost(int battlesLost) { this.battlesLost = battlesLost; }
        
        public int getTemporalManipulations() { return temporalManipulations; }
        public void setTemporalManipulations(int temporalManipulations) { this.temporalManipulations = temporalManipulations; }
    }
    
    // Game Settings
    public static class GameSettings {
        @JsonProperty("timePerTurn")
        private int timePerTurn;  // Seconds
        
        @JsonProperty("maxTimelines")
        private int maxTimelines;
        
        @JsonProperty("maxPsiStatesPerPlayer")
        private int maxPsiStatesPerPlayer;
        
        @JsonProperty("enableTemporalArtifacts")
        private boolean enableTemporalArtifacts;
        
        @JsonProperty("enableMultipleTimelines")
        private boolean enableMultipleTimelines;
        
        @JsonProperty("enablePhantomBattles")
        private boolean enablePhantomBattles;
        
        @JsonProperty("mapSize")
        private String mapSize;  // "small", "medium", "large"
        
        @JsonProperty("difficulty")
        private String difficulty;  // "easy", "normal", "hard"
        
        public GameSettings() {
            this.timePerTurn = 120;  // 2 minutes
            this.maxTimelines = 5;
            this.maxPsiStatesPerPlayer = 10;
            this.enableTemporalArtifacts = true;
            this.enableMultipleTimelines = true;
            this.enablePhantomBattles = true;
            this.mapSize = "medium";
            this.difficulty = "normal";
        }
        
        // Getters and setters
        public int getTimePerTurn() { return timePerTurn; }
        public void setTimePerTurn(int timePerTurn) { this.timePerTurn = timePerTurn; }
        
        public int getMaxTimelines() { return maxTimelines; }
        public void setMaxTimelines(int maxTimelines) { this.maxTimelines = maxTimelines; }
        
        public int getMaxPsiStatesPerPlayer() { return maxPsiStatesPerPlayer; }
        public void setMaxPsiStatesPerPlayer(int maxPsiStatesPerPlayer) { this.maxPsiStatesPerPlayer = maxPsiStatesPerPlayer; }
        
        public boolean isEnableTemporalArtifacts() { return enableTemporalArtifacts; }
        public void setEnableTemporalArtifacts(boolean enableTemporalArtifacts) { this.enableTemporalArtifacts = enableTemporalArtifacts; }
        
        public boolean isEnableMultipleTimelines() { return enableMultipleTimelines; }
        public void setEnableMultipleTimelines(boolean enableMultipleTimelines) { this.enableMultipleTimelines = enableMultipleTimelines; }
        
        public boolean isEnablePhantomBattles() { return enablePhantomBattles; }
        public void setEnablePhantomBattles(boolean enablePhantomBattles) { this.enablePhantomBattles = enablePhantomBattles; }
        
        public String getMapSize() { return mapSize; }
        public void setMapSize(String mapSize) { this.mapSize = mapSize; }
        
        public String getDifficulty() { return difficulty; }
        public void setDifficulty(String difficulty) { this.difficulty = difficulty; }
    }
    
    // Constructors
    public Game() {
        this.createdAt = LocalDateTime.now();
        this.status = GameStatus.WAITING_FOR_PLAYERS;
        this.currentTurn = 0;
        this.maxPlayers = 4;
        this.maxTurns = 100;
        this.players = new ArrayList<>();
        this.heroes = new ArrayList<>();
        this.artifacts = new ArrayList<>();
        this.timelines = new ArrayList<>();
        this.psiStates = new ArrayList<>();
        this.conflictZones = new ArrayList<>();
        this.temporalEvents = new ArrayList<>();
        this.settings = new GameSettings();
    }
    
    public Game(String id, String name, int maxPlayers) {
        this();
        this.id = id;
        this.name = name;
        this.maxPlayers = maxPlayers;
    }
    
    // Game Management Methods
    public void startGame() {
        if (status == GameStatus.WAITING_FOR_PLAYERS && players.size() >= 2) {
            status = GameStatus.STARTING;
            startedAt = LocalDateTime.now();
            currentTurn = 1;
            
            // Initialize game components
            initializeMap();
            initializeHeroes();
            initializeArtifacts();
            initializeTimelines();
            
            status = GameStatus.IN_PROGRESS;
            lastActivity = LocalDateTime.now();
        }
    }
    
    public void endGame() {
        status = GameStatus.ENDED;
        endedAt = LocalDateTime.now();
    }
    
    public void nextTurn() {
        if (status == GameStatus.IN_PROGRESS) {
            currentTurn++;
            
            // Process turn logic
            processTurnStart();
            advanceCurrentPlayer();
            
            // Check for game end conditions
            if (currentTurn > maxTurns || checkWinConditions()) {
                endGame();
            }
            
            lastActivity = LocalDateTime.now();
        }
    }
    
    private void processTurnStart() {
        // Process all heroes' turn start
        for (Hero hero : heroes) {
            hero.startTurn();
        }
        
        // Process temporal events
        processTemporalEvents();
        
        // Update temporal zones
        updateTemporalZones();
    }
    
    private void advanceCurrentPlayer() {
        if (players.isEmpty()) return;
        
        int currentIndex = 0;
        for (int i = 0; i < players.size(); i++) {
            if (players.get(i).getId().equals(currentPlayerId)) {
                currentIndex = i;
                break;
            }
        }
        
        int nextIndex = (currentIndex + 1) % players.size();
        currentPlayerId = players.get(nextIndex).getId();
    }
    
    private void processTemporalEvents() {
        // Process ψ-state collapses and temporal manipulations
        for (PsiState psiState : psiStates) {
            if (psiState.getTriggerTurn() == currentTurn) {
                // Trigger ψ-state collapse
                processePsiStateCollapse(psiState);
            }
        }
    }
    
    private void processePsiStateCollapse(PsiState psiState) {
        // Implementation for ψ-state collapse logic
        TemporalEvent event = new TemporalEvent(
            TemporalEvent.EventType.TIMELINE_FORK,
            "ψ-state " + psiState.getId() + " collapsed",
            psiState.getTargetX(),
            psiState.getTargetY()
        );
        temporalEvents.add(event);
    }
    
    private void updateTemporalZones() {
        // Update temporal zones on the map
        if (gameMap != null) {
            gameMap.getTemporalZones().forEach(zone -> {
                zone.setDuration(zone.getDuration() - 1);
                if (zone.getDuration() <= 0) {
                    gameMap.removeTemporalZone(zone.getId());
                }
            });
        }
    }
    
    private boolean checkWinConditions() {
        // Check various win conditions
        for (Player player : players) {
            if (checkPlayerWinCondition(player)) {
                return true;
            }
        }
        return false;
    }
    
    private boolean checkPlayerWinCondition(Player player) {
        // Check if player has won
        // - Control all enemy castles
        // - Achieve temporal dominance
        // - Collect victory artifacts
        return false;  // Implementation needed
    }
    
    private void initializeMap() {
        String mapSize = settings.getMapSize();
        int width, height;
        
        switch (mapSize) {
            case "small":
                width = height = 20;
                break;
            case "large":
                width = height = 40;
                break;
            default: // medium
                width = height = 30;
                break;
        }
        
        gameMap = new GameMap(id + "_map", "Game Map", width, height, 3);
        
        // Add some interesting terrain
        addInterestingTerrain();
        
        // Add buildings
        addInitialBuildings();
        
        // Add nexus points
        addNexusPoints();
    }
    
    private void addInterestingTerrain() {
        // Add some forests, mountains, and water
        for (int i = 0; i < 10; i++) {
            int x = (int) (Math.random() * gameMap.getWidth());
            int y = (int) (Math.random() * gameMap.getHeight());
            
            GameMap.TerrainType[] types = {
                GameMap.TerrainType.FOREST,
                GameMap.TerrainType.MOUNTAIN,
                GameMap.TerrainType.WATER,
                GameMap.TerrainType.DESERT
            };
            
            GameMap.TerrainType type = types[(int) (Math.random() * types.length)];
            gameMap.setTerrainAt(x, y, 0, "ℬ1", 0, new GameMap.TerrainTile(type));
        }
    }
    
    private void addInitialBuildings() {
        // Add a castle for each player
        for (int i = 0; i < players.size(); i++) {
            Player player = players.get(i);
            int x = 5 + i * 10;
            int y = 5 + i * 10;
            
            GameMap.Building castle = new GameMap.Building(
                "castle_" + player.getId(),
                GameMap.Building.BuildingType.CASTLE,
                x, y, 0, "ℬ1", 0
            );
            castle.setOwnerId(player.getId());
            gameMap.addBuilding(castle);
        }
    }
    
    private void addNexusPoints() {
        // Add nexus points for timeline convergence
        int centerX = gameMap.getWidth() / 2;
        int centerY = gameMap.getHeight() / 2;
        
        GameMap.NexusPoint nexus = new GameMap.NexusPoint("nexus_center", centerX, centerY);
        nexus.getConnectedTimelines().add("ℬ1");
        gameMap.getNexusPoints().add(nexus);
    }
    
    private void initializeHeroes() {
        // Create starting heroes for each player
        for (Player player : players) {
            Hero hero = new Hero(
                "hero_" + player.getId(),
                player.getName() + "'s Hero",
                player.getId(),
                10, 10  // Starting position
            );
            heroes.add(hero);
            player.getHeroIds().add(hero.getId());
        }
    }
    
    private void initializeArtifacts() {
        // Create some artifacts for the game
        if (settings.isEnableTemporalArtifacts()) {
            artifacts.add(Artifact.createLameAvantMonde());
            artifacts.add(Artifact.createHorlogeDernierInstant());
            artifacts.add(Artifact.createBaliseIgnoranceTemporelle());
            artifacts.add(Artifact.createTourAncrage());
            artifacts.add(Artifact.createNexusCrystal());
            
            // Only add Singularity artifact for hard difficulty
            if ("hard".equals(settings.getDifficulty())) {
                artifacts.add(Artifact.createTrompetteApocalypse());
            }
        }
    }
    
    private void initializeTimelines() {
        // Create primary timeline
        Timeline primaryTimeline = new Timeline("ℬ1");
        timelines.add(primaryTimeline);
        
        if (settings.isEnableMultipleTimelines()) {
            // Create additional timelines for advanced gameplay
            Timeline secondaryTimeline = new Timeline("ℬ2");
            timelines.add(secondaryTimeline);
        }
    }
    
    // Player Management
    public void addPlayer(Player player) {
        if (players.size() < maxPlayers && status == GameStatus.WAITING_FOR_PLAYERS) {
            players.add(player);
            
            if (currentPlayerId == null) {
                currentPlayerId = player.getId();
            }
            
            lastActivity = LocalDateTime.now();
        }
    }
    
    public void removePlayer(String playerId) {
        players.removeIf(p -> p.getId().equals(playerId));
        
        if (currentPlayerId != null && currentPlayerId.equals(playerId)) {
            advanceCurrentPlayer();
        }
        
        lastActivity = LocalDateTime.now();
    }
    
    public Player getPlayer(String playerId) {
        return players.stream()
                .filter(p -> p.getId().equals(playerId))
                .findFirst()
                .orElse(null);
    }
    
    public Hero getHero(String heroId) {
        return heroes.stream()
                .filter(h -> h.getId().equals(heroId))
                .findFirst()
                .orElse(null);
    }
    
    public Artifact getArtifact(String artifactId) {
        return artifacts.stream()
                .filter(a -> a.getId().equals(artifactId))
                .findFirst()
                .orElse(null);
    }
    
    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public GameStatus getStatus() { return status; }
    public void setStatus(GameStatus status) { this.status = status; }
    
    public int getCurrentTurn() { return currentTurn; }
    public void setCurrentTurn(int currentTurn) { this.currentTurn = currentTurn; }
    
    public String getCurrentPlayerId() { return currentPlayerId; }
    public void setCurrentPlayerId(String currentPlayerId) { this.currentPlayerId = currentPlayerId; }
    
    public int getMaxPlayers() { return maxPlayers; }
    public void setMaxPlayers(int maxPlayers) { this.maxPlayers = maxPlayers; }
    
    public int getMaxTurns() { return maxTurns; }
    public void setMaxTurns(int maxTurns) { this.maxTurns = maxTurns; }
    
    public List<Player> getPlayers() { return players; }
    public void setPlayers(List<Player> players) { this.players = players; }
    
    public List<Hero> getHeroes() { return heroes; }
    public void setHeroes(List<Hero> heroes) { this.heroes = heroes; }
    
    public List<Artifact> getArtifacts() { return artifacts; }
    public void setArtifacts(List<Artifact> artifacts) { this.artifacts = artifacts; }
    
    public GameMap getGameMap() { return gameMap; }
    public void setGameMap(GameMap gameMap) { this.gameMap = gameMap; }
    
    public List<Timeline> getTimelines() { return timelines; }
    public void setTimelines(List<Timeline> timelines) { this.timelines = timelines; }
    
    public List<PsiState> getPsiStates() { return psiStates; }
    public void setPsiStates(List<PsiState> psiStates) { this.psiStates = psiStates; }
    
    public List<ConflictZone> getConflictZones() { return conflictZones; }
    public void setConflictZones(List<ConflictZone> conflictZones) { this.conflictZones = conflictZones; }
    
    public List<TemporalEvent> getTemporalEvents() { return temporalEvents; }
    public void setTemporalEvents(List<TemporalEvent> temporalEvents) { this.temporalEvents = temporalEvents; }
    
    public GameSettings getSettings() { return settings; }
    public void setSettings(GameSettings settings) { this.settings = settings; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getStartedAt() { return startedAt; }
    public void setStartedAt(LocalDateTime startedAt) { this.startedAt = startedAt; }
    
    public LocalDateTime getLastActivity() { return lastActivity; }
    public void setLastActivity(LocalDateTime lastActivity) { this.lastActivity = lastActivity; }
    
    public LocalDateTime getEndedAt() { return endedAt; }
    public void setEndedAt(LocalDateTime endedAt) { this.endedAt = endedAt; }
    
    @Override
    public String toString() {
        return String.format("Game{id='%s', name='%s', status=%s, turn=%d, players=%d/%d}", 
                           id, name, status, currentTurn, players.size(), maxPlayers);
    }
}