package com.heroesoftimeporal.controller;

import com.heroesoftimeporal.model.*;
import com.heroesoftimeporal.engine.TimelineManager;
import com.heroesoftimeporal.engine.CausalCollapseHandler;
import com.heroesoftimeporal.script.TemporalScriptParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

/**
 * 🎮 GameController - Main REST controller for the 5D spacetime temporal game
 * 
 * Provides endpoints for game management, player actions, and temporal manipulation
 */
@RestController
@RequestMapping("/api/game")
@CrossOrigin(origins = "*")
public class GameController {
    
    // In-memory storage for demonstration (replace with database in production)
    private final Map<String, Game> games = new ConcurrentHashMap<>();
    
    @Autowired
    private TimelineManager timelineManager;
    
    @Autowired
    private CausalCollapseHandler causalCollapseHandler;
    
    @Autowired
    private TemporalScriptParser scriptParser;
    
    // Game Management Endpoints
    
    @PostMapping("/create")
    public ResponseEntity<Game> createGame(@RequestBody CreateGameRequest request) {
        Game game = new Game(
            UUID.randomUUID().toString(),
            request.getName(),
            request.getMaxPlayers()
        );
        
        // Configure game settings
        if (request.getSettings() != null) {
            game.setSettings(request.getSettings());
        }
        
        games.put(game.getId(), game);
        
        return ResponseEntity.ok(game);
    }
    
    @GetMapping("/{gameId}")
    public ResponseEntity<Game> getGame(@PathVariable String gameId) {
        Game game = games.get(gameId);
        if (game == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(game);
    }
    
    @GetMapping("/")
    public ResponseEntity<List<Game>> getAllGames() {
        return ResponseEntity.ok(new ArrayList<>(games.values()));
    }
    
    @PostMapping("/{gameId}/join")
    public ResponseEntity<Game> joinGame(@PathVariable String gameId, @RequestBody JoinGameRequest request) {
        Game game = games.get(gameId);
        if (game == null) {
            return ResponseEntity.notFound().build();
        }
        
        Game.Player player = new Game.Player(
            request.getPlayerId(),
            request.getPlayerName(),
            request.getColor()
        );
        
        game.addPlayer(player);
        
        return ResponseEntity.ok(game);
    }
    
    @PostMapping("/{gameId}/start")
    public ResponseEntity<Game> startGame(@PathVariable String gameId) {
        Game game = games.get(gameId);
        if (game == null) {
            return ResponseEntity.notFound().build();
        }
        
        game.startGame();
        
        return ResponseEntity.ok(game);
    }
    
    @PostMapping("/{gameId}/next-turn")
    public ResponseEntity<Game> nextTurn(@PathVariable String gameId) {
        Game game = games.get(gameId);
        if (game == null) {
            return ResponseEntity.notFound().build();
        }
        
        game.nextTurn();
        
        return ResponseEntity.ok(game);
    }
    
    // Hero Management Endpoints
    
    @GetMapping("/{gameId}/heroes")
    public ResponseEntity<List<Hero>> getHeroes(@PathVariable String gameId) {
        Game game = games.get(gameId);
        if (game == null) {
            return ResponseEntity.notFound().build();
        }
        
        return ResponseEntity.ok(game.getHeroes());
    }
    
    @PostMapping("/{gameId}/heroes/{heroId}/move")
    public ResponseEntity<Hero> moveHero(@PathVariable String gameId, @PathVariable String heroId, 
                                        @RequestBody MoveHeroRequest request) {
        Game game = games.get(gameId);
        if (game == null) {
            return ResponseEntity.notFound().build();
        }
        
        Hero hero = game.getHero(heroId);
        if (hero == null) {
            return ResponseEntity.notFound().build();
        }
        
        // Validate movement
        if (!hero.canMove()) {
            return ResponseEntity.badRequest().build();
        }
        
        // Check if position is valid and passable
        if (!game.getGameMap().isPassable(request.getX(), request.getY(), request.getZ(), 
                                         request.getTimeline(), request.getTemporalLayer())) {
            return ResponseEntity.badRequest().build();
        }
        
        // Move hero
        hero.setX(request.getX());
        hero.setY(request.getY());
        hero.setZ(request.getZ());
        hero.setTimeline(request.getTimeline());
        hero.setTemporalLayer(request.getTemporalLayer());
        hero.setMovementPoints(hero.getMovementPoints() - 1);
        
        return ResponseEntity.ok(hero);
    }
    
    // Artifact Management Endpoints
    
    @GetMapping("/{gameId}/artifacts")
    public ResponseEntity<List<Artifact>> getArtifacts(@PathVariable String gameId) {
        Game game = games.get(gameId);
        if (game == null) {
            return ResponseEntity.notFound().build();
        }
        
        return ResponseEntity.ok(game.getArtifacts());
    }
    
    @PostMapping("/{gameId}/artifacts/{artifactId}/use")
    public ResponseEntity<ArtifactUseResult> useArtifact(@PathVariable String gameId, @PathVariable String artifactId,
                                                        @RequestBody UseArtifactRequest request) {
        Game game = games.get(gameId);
        if (game == null) {
            return ResponseEntity.notFound().build();
        }
        
        Artifact artifact = game.getArtifact(artifactId);
        if (artifact == null) {
            return ResponseEntity.notFound().build();
        }
        
        Hero hero = game.getHero(request.getHeroId());
        if (hero == null) {
            return ResponseEntity.notFound().build();
        }
        
        // Check if artifact can be used
        if (!artifact.canUse(hero)) {
            return ResponseEntity.badRequest().build();
        }
        
        // Use artifact
        artifact.use();
        hero.consumeTemporalEnergy(artifact.getRequirements().getMinTemporalEnergy());
        
        ArtifactUseResult result = new ArtifactUseResult();
        result.setSuccess(true);
        result.setMessage("Artifact " + artifact.getDisplayName() + " used successfully");
        result.setArtifact(artifact);
        result.setHero(hero);
        
        return ResponseEntity.ok(result);
    }
    
    // Temporal Script Endpoints
    
    @PostMapping("/{gameId}/script/execute")
    public ResponseEntity<ScriptExecutionResult> executeScript(@PathVariable String gameId,
                                                              @RequestBody ExecuteScriptRequest request) {
        Game game = games.get(gameId);
        if (game == null) {
            return ResponseEntity.notFound().build();
        }
        
        try {
            // Parse and execute temporal script
            List<ScriptCommand> commands = scriptParser.parseScript(request.getScript());
            List<PsiState> psiStates = new ArrayList<>();
            
            // Convert commands to ψ-states
            for (ScriptCommand command : commands) {
                if (command.getType() == ScriptCommand.CommandType.PSI_STATE_CREATION) {
                    PsiState psiState = convertCommandToPsiState(command);
                    psiStates.add(psiState);
                    game.getPsiStates().add(psiState);
                    
                    // Add to appropriate timeline
                    Timeline timeline = timelineManager.getTimeline(psiState.getBranch());
                    timeline.addPsiState(psiState);
                }
            }
            
            // Check for conflicts
            List<ConflictZone> conflicts = new ArrayList<>();  // Simplified for now
            game.getConflictZones().addAll(conflicts);
            
            ScriptExecutionResult result = new ScriptExecutionResult();
            result.setSuccess(true);
            result.setMessage("Script executed successfully");
            result.setPsiStatesCreated(psiStates.size());
            result.setConflictsDetected(conflicts.size());
            result.setPsiStates(psiStates);
            result.setConflicts(conflicts);
            
            return ResponseEntity.ok(result);
            
        } catch (Exception e) {
            ScriptExecutionResult result = new ScriptExecutionResult();
            result.setSuccess(false);
            result.setMessage("Script execution failed: " + e.getMessage());
            
            return ResponseEntity.badRequest().body(result);
        }
    }
    
    // Map and Timeline Endpoints
    
    @GetMapping("/{gameId}/map")
    public ResponseEntity<GameMap> getMap(@PathVariable String gameId) {
        Game game = games.get(gameId);
        if (game == null) {
            return ResponseEntity.notFound().build();
        }
        
        return ResponseEntity.ok(game.getGameMap());
    }
    
    @GetMapping("/{gameId}/timelines")
    public ResponseEntity<List<Timeline>> getTimelines(@PathVariable String gameId) {
        Game game = games.get(gameId);
        if (game == null) {
            return ResponseEntity.notFound().build();
        }
        
        return ResponseEntity.ok(game.getTimelines());
    }
    
    @GetMapping("/{gameId}/psi-states")
    public ResponseEntity<List<PsiState>> getPsiStates(@PathVariable String gameId) {
        Game game = games.get(gameId);
        if (game == null) {
            return ResponseEntity.notFound().build();
        }
        
        return ResponseEntity.ok(game.getPsiStates());
    }
    
    @GetMapping("/{gameId}/conflicts")
    public ResponseEntity<List<ConflictZone>> getConflicts(@PathVariable String gameId) {
        Game game = games.get(gameId);
        if (game == null) {
            return ResponseEntity.notFound().build();
        }
        
        return ResponseEntity.ok(game.getConflictZones());
    }
    
    // Testing and Demo Endpoints
    
    @PostMapping("/demo/create-sample-game")
    public ResponseEntity<Game> createSampleGame() {
        Game game = new Game("demo-game", "5D Spacetime Demo", 2);
        
        // Add sample players
        Game.Player player1 = new Game.Player("player1", "Arthur", "blue");
        Game.Player player2 = new Game.Player("player2", "Merlin", "red");
        
        game.addPlayer(player1);
        game.addPlayer(player2);
        
        // Start the game
        game.startGame();
        
        games.put(game.getId(), game);
        
        return ResponseEntity.ok(game);
    }
    
    @GetMapping("/demo/sample-data")
    public ResponseEntity<SampleData> getSampleData() {
        SampleData data = new SampleData();
        
        // Sample Hero
        Hero sampleHero = new Hero("hero1", "Arthur", "player1", 10, 10);
        sampleHero.addArtifact("avant_world_blade");
        data.setSampleHero(sampleHero);
        
        // Sample Artifact
        Artifact sampleArtifact = Artifact.createLameAvantMonde();
        data.setSampleArtifact(sampleArtifact);
        
        // Sample Map
        GameMap sampleMap = new GameMap("map1", "Demo Map", 20, 20, 3);
        data.setSampleMap(sampleMap);
        
        // Sample Script
        data.setSampleScript("ψ001: ⊙(Δt+2 @126,65 ⟶ CREATE(CREATURE, Dragon))\n" +
                           "USE(ITEM, AvantWorldBlade, HERO:Arthur)\n" +
                           "†ψ001");
        
        return ResponseEntity.ok(data);
    }
    
    // Helper method to convert ScriptCommand to PsiState
    private PsiState convertCommandToPsiState(ScriptCommand command) {
        PsiState psiState = new PsiState();
        psiState.setId(command.getId());
        psiState.setExpression(command.getExpression());
        psiState.setBranch(command.getBranch());
        psiState.setDeltaTime(command.getDeltaTime());
        psiState.setTargetX(command.getTargetX());
        psiState.setTargetY(command.getTargetY());
        psiState.setAction(command.getAction());
        psiState.setParameters(command.getParameters());
        psiState.setProbability(command.getProbability());
        psiState.setStatus(PsiState.PsiStatus.ACTIVE);
        psiState.setTriggerTurn(command.getTriggerTurn());
        return psiState;
    }
    
    // Request/Response DTOs
    
    public static class CreateGameRequest {
        private String name;
        private int maxPlayers;
        private Game.GameSettings settings;
        
        // Getters and setters
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        
        public int getMaxPlayers() { return maxPlayers; }
        public void setMaxPlayers(int maxPlayers) { this.maxPlayers = maxPlayers; }
        
        public Game.GameSettings getSettings() { return settings; }
        public void setSettings(Game.GameSettings settings) { this.settings = settings; }
    }
    
    public static class JoinGameRequest {
        private String playerId;
        private String playerName;
        private String color;
        
        // Getters and setters
        public String getPlayerId() { return playerId; }
        public void setPlayerId(String playerId) { this.playerId = playerId; }
        
        public String getPlayerName() { return playerName; }
        public void setPlayerName(String playerName) { this.playerName = playerName; }
        
        public String getColor() { return color; }
        public void setColor(String color) { this.color = color; }
    }
    
    public static class MoveHeroRequest {
        private int x;
        private int y;
        private int z;
        private String timeline;
        private int temporalLayer;
        
        // Getters and setters
        public int getX() { return x; }
        public void setX(int x) { this.x = x; }
        
        public int getY() { return y; }
        public void setY(int y) { this.y = y; }
        
        public int getZ() { return z; }
        public void setZ(int z) { this.z = z; }
        
        public String getTimeline() { return timeline; }
        public void setTimeline(String timeline) { this.timeline = timeline; }
        
        public int getTemporalLayer() { return temporalLayer; }
        public void setTemporalLayer(int temporalLayer) { this.temporalLayer = temporalLayer; }
    }
    
    public static class UseArtifactRequest {
        private String heroId;
        private int targetX;
        private int targetY;
        private String targetTimeline;
        private int targetTemporalLayer;
        
        // Getters and setters
        public String getHeroId() { return heroId; }
        public void setHeroId(String heroId) { this.heroId = heroId; }
        
        public int getTargetX() { return targetX; }
        public void setTargetX(int targetX) { this.targetX = targetX; }
        
        public int getTargetY() { return targetY; }
        public void setTargetY(int targetY) { this.targetY = targetY; }
        
        public String getTargetTimeline() { return targetTimeline; }
        public void setTargetTimeline(String targetTimeline) { this.targetTimeline = targetTimeline; }
        
        public int getTargetTemporalLayer() { return targetTemporalLayer; }
        public void setTargetTemporalLayer(int targetTemporalLayer) { this.targetTemporalLayer = targetTemporalLayer; }
    }
    
    public static class ExecuteScriptRequest {
        private String script;
        private String playerId;
        
        // Getters and setters
        public String getScript() { return script; }
        public void setScript(String script) { this.script = script; }
        
        public String getPlayerId() { return playerId; }
        public void setPlayerId(String playerId) { this.playerId = playerId; }
    }
    
    public static class ArtifactUseResult {
        private boolean success;
        private String message;
        private Artifact artifact;
        private Hero hero;
        
        // Getters and setters
        public boolean isSuccess() { return success; }
        public void setSuccess(boolean success) { this.success = success; }
        
        public String getMessage() { return message; }
        public void setMessage(String message) { this.message = message; }
        
        public Artifact getArtifact() { return artifact; }
        public void setArtifact(Artifact artifact) { this.artifact = artifact; }
        
        public Hero getHero() { return hero; }
        public void setHero(Hero hero) { this.hero = hero; }
    }
    
    public static class ScriptExecutionResult {
        private boolean success;
        private String message;
        private int psiStatesCreated;
        private int conflictsDetected;
        private List<PsiState> psiStates;
        private List<ConflictZone> conflicts;
        
        // Getters and setters
        public boolean isSuccess() { return success; }
        public void setSuccess(boolean success) { this.success = success; }
        
        public String getMessage() { return message; }
        public void setMessage(String message) { this.message = message; }
        
        public int getPsiStatesCreated() { return psiStatesCreated; }
        public void setPsiStatesCreated(int psiStatesCreated) { this.psiStatesCreated = psiStatesCreated; }
        
        public int getConflictsDetected() { return conflictsDetected; }
        public void setConflictsDetected(int conflictsDetected) { this.conflictsDetected = conflictsDetected; }
        
        public List<PsiState> getPsiStates() { return psiStates; }
        public void setPsiStates(List<PsiState> psiStates) { this.psiStates = psiStates; }
        
        public List<ConflictZone> getConflicts() { return conflicts; }
        public void setConflicts(List<ConflictZone> conflicts) { this.conflicts = conflicts; }
    }
    
    public static class SampleData {
        private Hero sampleHero;
        private Artifact sampleArtifact;
        private GameMap sampleMap;
        private String sampleScript;
        
        // Getters and setters
        public Hero getSampleHero() { return sampleHero; }
        public void setSampleHero(Hero sampleHero) { this.sampleHero = sampleHero; }
        
        public Artifact getSampleArtifact() { return sampleArtifact; }
        public void setSampleArtifact(Artifact sampleArtifact) { this.sampleArtifact = sampleArtifact; }
        
        public GameMap getSampleMap() { return sampleMap; }
        public void setSampleMap(GameMap sampleMap) { this.sampleMap = sampleMap; }
        
        public String getSampleScript() { return sampleScript; }
        public void setSampleScript(String sampleScript) { this.sampleScript = sampleScript; }
    }
}