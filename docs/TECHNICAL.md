# 🔧 Heroes of Time - Technical Documentation

**Deep Dive into Temporal Engine Architecture**

---

## 🏗️ System Architecture

### 🎯 High-Level Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Database      │
│   (Electron)    │◄──►│   (Spring Boot) │◄──►│   (H2/Memory)   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
    ┌─────────┐            ┌─────────────┐        ┌─────────────┐
    │ Script  │            │ Temporal    │        │ Timeline    │
    │ Console │            │ Engine      │        │ Storage     │
    └─────────┘            └─────────────┘        └─────────────┘
```

### 🧠 Core Components

#### 1. **Temporal Engine Layer**
```java
com.heroesoftimeporal.engine/
├── TemporalEngine.java          # Main orchestrator
├── TimelineManager.java         # Multi-timeline management
├── CausalCollapseHandler.java   # Conflict resolution
└── QuantumProcessor.java        # ψ-state processing
```

#### 2. **Script Processing Layer**
```java
com.heroesoftimeporal.script/
├── TemporalScriptParser.java    # Language parser
├── ScriptCommand.java           # Command representation
├── QuantumScriptEngine.java     # Execution engine
└── ScriptValidator.java         # Syntax validation
```

#### 3. **Model Layer**
```java
com.heroesoftimeporal.model/
├── PsiState.java               # Quantum superposition
├── Timeline.java               # Temporal branch
├── TemporalEvent.java          # Event logging
├── ConflictZone.java           # Causal conflicts
└── TemporalArtifact.java       # Temporal artifacts
```

---

## 🧬 Data Models

### 🌌 PsiState (Quantum Superposition)

```java
@Entity
public class PsiState {
    @Id
    private String id;                    // ψ001, ψ002, etc.
    
    private String expression;            // Full temporal expression
    private String branch;                // Timeline (ℬ1, ℬ2, etc.)
    private int deltaTime;                // Δt+n
    private int targetX, targetY;         // Coordinates
    private String action;                // MOV, CREATE, BATTLE, etc.
    private String parameters;            // Action parameters
    private double probability;           // 0.0 to 1.0
    private PsiStatus status;             // ACTIVE, TRIGGERED, COLLAPSED
    private LocalDateTime createdAt;      // Creation timestamp
    private int triggerTurn;              // When to trigger
    private boolean collapsed;            // Has collapsed
    private String collapseReason;        // Why collapsed
}
```

### 🕰️ Timeline (Temporal Branch)

```java
@Entity
public class Timeline {
    @Id
    private String branchId;              // ℬ1, ℬ2, etc.
    
    private int currentTurn;              // Current turn number
    private Map<String, PsiState> psiStates; // Active ψ-states
    private List<TemporalEvent> events;   // Event history
    private boolean active;               // Is timeline active
    private boolean collapsed;            // Has timeline collapsed
    private String parentBranch;          // Parent timeline
    private String collapseReason;        // Why collapsed
    private LocalDateTime createdAt;      // Creation time
}
```

### ⚔️ ConflictZone (Causal Conflict)

```java
@Entity
public class ConflictZone {
    @Id
    private String id;                    // Unique conflict ID
    
    private int x, y;                     // Conflict coordinates
    private int turn;                     // When conflict occurs
    private List<PsiState> conflictingPsiStates; // Competing ψ-states
    private boolean resolved;             // Is conflict resolved
    private PsiState winner;              // Winning ψ-state
    private ResolutionMethod method;      // How resolved
    private LocalDateTime createdAt;      // When detected
    private LocalDateTime resolvedAt;     // When resolved
}
```

---

## 🎮 Script Language Implementation

### 🧠 Parser Architecture

```java
public class TemporalScriptParser {
    // Regex patterns for different constructs
    private static final Pattern PSI_PATTERN = Pattern.compile(
        "ψ(\\w+):\\s*⊙\\(Δt\\+(\\d+)\\s+@(\\d+),(\\d+)\\s+⟶\\s+(.+)\\)"
    );
    
    private static final Pattern COLLAPSE_PATTERN = Pattern.compile(
        "†ψ(\\w+)(?:\\s+(.+))?"
    );
    
    private static final Pattern OBSERVATION_PATTERN = Pattern.compile(
        "Π\\((.+)\\)\\s*⇒\\s*†ψ(\\w+)"
    );
    
    // Parse complete script
    public List<ScriptCommand> parseScript(String script) {
        // Implementation...
    }
}
```

### 🎯 Command Execution

```java
public class QuantumScriptEngine {
    @Autowired
    private TimelineManager timelineManager;
    
    @Autowired
    private CausalCollapseHandler collapseHandler;
    
    public ExecutionResult executeCommand(ScriptCommand command, String branchId) {
        switch (command.getType()) {
            case CREATE_PSI_STATE:
                return createPsiState(command, branchId);
            case COLLAPSE_PSI_STATE:
                return collapsePsiState(command, branchId);
            case OBSERVATION_TRIGGER:
                return processObservation(command, branchId);
            // ... other commands
        }
    }
}
```

---

## 🌊 Timeline Management

### 🔄 Timeline Lifecycle

```java
public class TimelineManager {
    private final Map<String, Timeline> timelines = new ConcurrentHashMap<>();
    
    // Create new timeline
    public Timeline createTimeline(String branchId) {
        Timeline timeline = new Timeline(branchId);
        timelines.put(branchId, timeline);
        return timeline;
    }
    
    // Advance all timelines
    public void advanceAllTimelines() {
        for (Timeline timeline : getActiveTimelines()) {
            timeline.advanceTurn();
            processPsiStates(timeline);
        }
        detectConflicts();
        resolveConflicts();
    }
    
    // Detect conflicts between timelines
    public void detectConflicts() {
        // Compare all active timelines for conflicts
        // Create ConflictZone objects for each conflict
    }
}
```

### 🌀 Timeline Branching

```java
public Timeline forkTimeline(String parentBranchId, String newBranchId) {
    Timeline parent = getTimeline(parentBranchId);
    Timeline newBranch = parent.fork(newBranchId);
    
    // Copy active ψ-states
    for (PsiState psi : parent.getActivePsiStates()) {
        PsiState newPsi = psi.clone();
        newPsi.setBranch(newBranchId);
        newBranch.addPsiState(newPsi);
    }
    
    timelines.put(newBranchId, newBranch);
    return newBranch;
}
```

---

## ⚔️ Conflict Resolution

### 🎯 Resolution Methods

```java
public class CausalCollapseHandler {
    
    public void resolveConflict(ConflictZone conflict) {
        ResolutionMethod method = determineResolutionMethod(
            conflict.getConflictingPsiStates()
        );
        
        switch (method) {
            case PHANTOM_BATTLE:
                resolveByPhantomBattle(conflict);
                break;
            case PRIORITY:
                resolveByPriority(conflict);
                break;
            case RANDOM:
                resolveRandomly(conflict);
                break;
            case TIMELINE_MERGE:
                resolveByMerge(conflict);
                break;
        }
    }
    
    private void resolveByPhantomBattle(ConflictZone conflict) {
        List<PsiState> combatants = conflict.getConflictingPsiStates();
        PsiState winner = null;
        double highestScore = 0;
        
        for (PsiState psi : combatants) {
            double score = calculateBattleScore(psi);
            if (score > highestScore) {
                highestScore = score;
                winner = psi;
            }
        }
        
        conflict.setWinner(winner);
        collapseOthers(combatants, winner);
    }
}
```

### 🎲 Battle Score Calculation

```java
private double calculateBattleScore(PsiState psi) {
    double score = 0.5; // Base score
    
    // Action bonuses
    switch (psi.getAction()) {
        case "BATTLE": score += 0.4; break;
        case "CREATE": 
            if (psi.getParameters().contains("Dragon")) score += 0.6;
            else if (psi.getParameters().contains("CREATURE")) score += 0.3;
            break;
        case "MOV": score += 0.1; break;
    }
    
    // Temporal artifact bonuses
    if (psi.getParameters().contains("AvantWorldBlade")) score += 0.5;
    if (psi.getParameters().contains("TemporalAnchor")) score += 0.3;
    
    // Probability and randomness
    score += psi.getProbability() * 0.2;
    score += Math.random() * 0.2;
    
    return score;
}
```

---

## 🔮 Temporal Artifacts

### 🏗️ Artifact System

```java
public interface TemporalArtifact {
    String getName();
    ArtifactTier getTier();
    void apply(PsiState psiState, Timeline timeline);
    boolean canApply(PsiState psiState, Timeline timeline);
}

@Component
public class AvantWorldBlade implements TemporalArtifact {
    @Override
    public void apply(PsiState psiState, Timeline timeline) {
        // Increase priority and probability
        psiState.setProbability(Math.min(1.0, psiState.getProbability() + 0.3));
        
        // Create phantom battle trigger
        if (psiState.getAction().equals("BATTLE")) {
            timeline.addEvent(new TemporalEvent(
                TemporalEvent.EventType.ARTIFACT_USED,
                "AvantWorldBlade activated for battle",
                psiState.getTargetX(),
                psiState.getTargetY()
            ));
        }
    }
}
```

### 🎯 Artifact Registry

```java
@Component
public class TemporalArtifactRegistry {
    private final Map<String, TemporalArtifact> artifacts = new HashMap<>();
    
    @PostConstruct
    public void initializeArtifacts() {
        register(new AvantWorldBlade());
        register(new ReverseClock());
        register(new TemporalAnchor());
        register(new ApocalypseHorn());
    }
    
    public TemporalArtifact getArtifact(String name) {
        return artifacts.get(name);
    }
}
```

---

## 🌐 REST API Implementation

### 🎯 Main Controller

```java
@RestController
@RequestMapping("/api/temporal")
public class TemporalController {
    
    @Autowired
    private QuantumScriptEngine scriptEngine;
    
    @Autowired
    private TimelineManager timelineManager;
    
    @PostMapping("/execute")
    public ResponseEntity<ExecutionResponse> executeScript(
            @RequestBody ScriptExecutionRequest request) {
        
        try {
            List<ScriptCommand> commands = scriptParser.parseScript(request.getScript());
            List<ExecutionResult> results = new ArrayList<>();
            
            for (ScriptCommand command : commands) {
                ExecutionResult result = scriptEngine.executeCommand(
                    command, request.getBranch()
                );
                results.add(result);
            }
            
            return ResponseEntity.ok(new ExecutionResponse(results));
            
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new ExecutionResponse(e.getMessage()));
        }
    }
    
    @GetMapping("/timelines")
    public ResponseEntity<Map<String, Object>> getTimelines() {
        Map<String, Object> response = new HashMap<>();
        response.put("timelines", timelineManager.getActiveTimelines());
        response.put("statistics", timelineManager.getStatistics());
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/debug")
    public ResponseEntity<Map<String, Object>> getDebugInfo() {
        return ResponseEntity.ok(timelineManager.getDebugInfo());
    }
}
```

### 📊 Response Models

```java
public class ExecutionResponse {
    private boolean success;
    private long executionTime;
    private List<ExecutionResult> results;
    private TimelineState timeline;
    private String error;
    
    // Constructors, getters, setters...
}

public class ExecutionResult {
    private String command;
    private String status;
    private String message;
    private Object data;
    
    // Constructors, getters, setters...
}
```

---

## 🔧 Performance Optimizations

### 🚀 Concurrent Processing

```java
@Service
public class ConcurrentTimelineProcessor {
    
    @Async
    public CompletableFuture<Timeline> processTimeline(Timeline timeline) {
        // Process ψ-states concurrently
        List<CompletableFuture<PsiState>> futures = timeline.getActivePsiStates()
            .stream()
            .map(this::processPsiStateAsync)
            .collect(Collectors.toList());
        
        // Wait for all to complete
        CompletableFuture.allOf(futures.toArray(new CompletableFuture[0]))
            .join();
        
        return CompletableFuture.completedFuture(timeline);
    }
    
    @Async
    private CompletableFuture<PsiState> processPsiStateAsync(PsiState psi) {
        // Process individual ψ-state
        return CompletableFuture.completedFuture(psi);
    }
}
```

### 💾 Memory Management

```java
@Component
public class MemoryManager {
    
    @Scheduled(fixedRate = 60000) // Every minute
    public void cleanupCollapsedStates() {
        for (Timeline timeline : timelineManager.getActiveTimelines()) {
            timeline.getPsiStates().values()
                .removeIf(psi -> psi.isCollapsed() && 
                    psi.getCreatedAt().isBefore(LocalDateTime.now().minusMinutes(5)));
        }
    }
    
    @Scheduled(fixedRate = 300000) // Every 5 minutes
    public void compactTimelines() {
        timelineManager.getTimelines().values()
            .removeIf(timeline -> timeline.isCollapsed() && 
                timeline.getCreatedAt().isBefore(LocalDateTime.now().minusMinutes(10)));
    }
}
```

---

## 🧪 Testing Strategy

### 🎯 Unit Tests

```java
@SpringBootTest
public class TemporalScriptParserTest {
    
    @Autowired
    private TemporalScriptParser parser;
    
    @Test
    public void testPsiStateCreation() {
        String script = "ψ001: ⊙(Δt+2 @126,65 ⟶ CREATE(CREATURE, Dragon))";
        List<ScriptCommand> commands = parser.parseScript(script);
        
        assertEquals(1, commands.size());
        ScriptCommand command = commands.get(0);
        assertEquals(ScriptCommand.CommandType.CREATE_PSI_STATE, command.getType());
        assertEquals("001", command.getStringParam("psiId"));
        assertEquals(2, command.getIntParam("deltaTime"));
    }
    
    @Test
    public void testConflictResolution() {
        // Create two conflicting ψ-states
        PsiState psi1 = createTestPsiState("001", "CREATE", "Dragon");
        PsiState psi2 = createTestPsiState("002", "CREATE", "Phoenix");
        
        ConflictZone conflict = new ConflictZone(126, 65, 2, Arrays.asList(psi1, psi2));
        
        collapseHandler.resolveConflict(conflict);
        
        assertTrue(conflict.isResolved());
        assertNotNull(conflict.getWinner());
    }
}
```

### 🎮 Integration Tests

```java
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class TemporalEngineIntegrationTest {
    
    @Autowired
    private TestRestTemplate restTemplate;
    
    @Test
    public void testFullScriptExecution() {
        String script = """
            HERO(Arthur)
            MOV(Arthur, @125,64)
            ψ001: ⊙(Δt+2 @126,65 ⟶ CREATE(CREATURE, Dragon))
            USE(ITEM, AvantWorldBlade, HERO:Arthur)
            END_TURN
            """;
        
        ScriptExecutionRequest request = new ScriptExecutionRequest(script, "ℬ1");
        
        ResponseEntity<ExecutionResponse> response = restTemplate.postForEntity(
            "/api/temporal/execute", request, ExecutionResponse.class
        );
        
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertTrue(response.getBody().isSuccess());
        assertEquals(5, response.getBody().getResults().size());
    }
}
```

---

## 📊 Monitoring & Metrics

### 🎯 Custom Metrics

```java
@Component
public class TemporalMetrics {
    
    private final Counter psiStatesCreated = Counter.builder("psi_states_created")
        .description("Number of ψ-states created")
        .register(Metrics.globalRegistry);
    
    private final Counter conflictsResolved = Counter.builder("conflicts_resolved")
        .description("Number of conflicts resolved")
        .register(Metrics.globalRegistry);
    
    private final Gauge activeTimelines = Gauge.builder("active_timelines")
        .description("Number of active timelines")
        .register(Metrics.globalRegistry, this, 
            metrics -> timelineManager.getActiveTimelines().size());
    
    public void recordPsiStateCreated() {
        psiStatesCreated.increment();
    }
    
    public void recordConflictResolved(String method) {
        conflictsResolved.increment(Tags.of("method", method));
    }
}
```

### 📈 Health Checks

```java
@Component
public class TemporalHealthIndicator implements HealthIndicator {
    
    @Override
    public Health health() {
        int activeTimelines = timelineManager.getActiveTimelines().size();
        int unresolvedConflicts = timelineManager.getUnresolvedConflicts().size();
        
        if (activeTimelines > 100) {
            return Health.down()
                .withDetail("reason", "Too many active timelines")
                .withDetail("count", activeTimelines)
                .build();
        }
        
        if (unresolvedConflicts > 50) {
            return Health.down()
                .withDetail("reason", "Too many unresolved conflicts")
                .withDetail("count", unresolvedConflicts)
                .build();
        }
        
        return Health.up()
            .withDetail("activeTimelines", activeTimelines)
            .withDetail("unresolvedConflicts", unresolvedConflicts)
            .build();
    }
}
```

---

## 🔐 Security Considerations

### 🛡️ Script Validation

```java
@Component
public class ScriptSecurityValidator {
    
    private static final Set<String> ALLOWED_COMMANDS = Set.of(
        "HERO", "MOV", "CREATE", "BATTLE", "END_TURN", "USE", "LOG", "WAIT"
    );
    
    public void validateScript(String script) throws SecurityException {
        List<String> errors = new ArrayList<>();
        
        // Check for dangerous patterns
        if (script.contains("System.") || script.contains("Runtime.")) {
            errors.add("System calls not allowed");
        }
        
        // Validate commands
        List<ScriptCommand> commands = parser.parseScript(script);
        for (ScriptCommand command : commands) {
            if (!ALLOWED_COMMANDS.contains(command.getAction())) {
                errors.add("Unknown command: " + command.getAction());
            }
        }
        
        if (!errors.isEmpty()) {
            throw new SecurityException("Script validation failed: " + String.join(", ", errors));
        }
    }
}
```

### 🔒 Rate Limiting

```java
@Component
public class ScriptRateLimiter {
    
    private final Map<String, RateLimiter> limiters = new ConcurrentHashMap<>();
    
    public boolean allowExecution(String clientId) {
        RateLimiter limiter = limiters.computeIfAbsent(clientId, 
            id -> RateLimiter.create(10.0)); // 10 requests per second
        
        return limiter.tryAcquire();
    }
}
```

---

## 🚀 Deployment Configuration

### 🐳 Docker Configuration

```dockerfile
FROM openjdk:17-jdk-slim

WORKDIR /app

COPY target/heroes-of-time-temporal-1.0.0.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
```

### ☸️ Kubernetes Deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: temporal-engine
spec:
  replicas: 3
  selector:
    matchLabels:
      app: temporal-engine
  template:
    metadata:
      labels:
        app: temporal-engine
    spec:
      containers:
      - name: temporal-engine
        image: heroes-of-time-temporal:latest
        ports:
        - containerPort: 8080
        env:
        - name: SPRING_PROFILES_ACTIVE
          value: "production"
        resources:
          requests:
            memory: "512Mi"
            cpu: "500m"
          limits:
            memory: "1Gi"
            cpu: "1000m"
```

---

**🔧 This technical documentation provides the foundation for understanding and extending the Heroes of Time Temporal Engine. The quantum realm awaits your contributions! ⚡**

*"Code is poetry, but temporal code is quantum poetry - it exists in all possible states until observed."*