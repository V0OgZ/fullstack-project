# 🕰️ Heroes of Time Temporal Engine - Technical Explanation

## 🎯 Overview

The Heroes of Time temporal engine is a quantum game system that allows creating **temporal superpositions** (ψ-states) and managing their **collapse** according to causal rules. It's like Git for game actions, but with quantum rules.

---

## 🧠 Fundamental Concept

### Basic Principle
Instead of executing actions immediately, the engine can create **"possible futures"** that exist only virtually until they are **"observed"** or **"collapsed"**.

### Simple Analogy
```
Normal Action:    HERO moves → Position updated immediately
Temporal Action:  HERO moves → Superposition created → Collapse → Position updated
```

---

## 🔧 Technical Architecture

### 1. Main Classes

#### **PsiState.java** - Quantum State
```java
public class PsiState {
    private String id;              // "ψ001"
    private String expression;      // "⊙(Δt+2 @15,15 ⟶ MOV(HERO, Arthur, @15,15))"
    private PsiStatus status;       // ACTIVE, COLLAPSED, OBSERVED
    private int deltaT;             // +2 turns in the future
    private int targetX, targetY;   // Target position
    private String action;          // Action to execute
    
    // Parsing of temporal expression
    public static PsiState parse(String expression) {
        // Regex to extract: ⊙(Δt+2 @15,15 ⟶ MOV(HERO, Arthur, @15,15))
        Pattern pattern = Pattern.compile("⊙\\(Δt\\+(\\d+) @(\\d+),(\\d+) ⟶ (.+)\\)");
        Matcher matcher = pattern.matcher(expression);
        
        if (matcher.find()) {
            PsiState psi = new PsiState();
            psi.deltaT = Integer.parseInt(matcher.group(1));
            psi.targetX = Integer.parseInt(matcher.group(2));
            psi.targetY = Integer.parseInt(matcher.group(3));
            psi.action = matcher.group(4);
            psi.status = PsiStatus.ACTIVE;
            return psi;
        }
        throw new IllegalArgumentException("Invalid psi expression");
    }
}
```

#### **Timeline.java** - Temporal Branch
```java
public class Timeline {
    private String id;                    // "ℬ1", "ℬ2"
    private List<TemporalEvent> events;   // Event history
    private Map<String, PsiState> psiStates; // Active quantum states
    private Timeline parentTimeline;      // Parent timeline (for forks)
    
    // Create a new branch
    public Timeline fork(String reason) {
        Timeline newBranch = new Timeline();
        newBranch.id = generateTimelineId();
        newBranch.parentTimeline = this;
        newBranch.events = new ArrayList<>(this.events); // Copy history
        newBranch.psiStates = new HashMap<>(this.psiStates); // Copy ψ-states
        
        // Log branch creation
        TemporalEvent forkEvent = new TemporalEvent(
            EventType.TIMELINE_FORK, 
            reason, 
            System.currentTimeMillis()
        );
        newBranch.events.add(forkEvent);
        
        return newBranch;
    }
    
    // Merge with another timeline
    public void merge(Timeline other) {
        // Event merging algorithm
        List<TemporalEvent> mergedEvents = new ArrayList<>();
        
        // Sort by timestamp to maintain causality
        Stream.concat(this.events.stream(), other.events.stream())
              .sorted(Comparator.comparing(TemporalEvent::getTimestamp))
              .forEach(mergedEvents::add);
              
        this.events = mergedEvents;
        
        // ψ-states merging (conflict resolution)
        for (Map.Entry<String, PsiState> entry : other.psiStates.entrySet()) {
            if (this.psiStates.containsKey(entry.getKey())) {
                // Conflict detected - resolution needed
                resolveConflict(entry.getKey(), this.psiStates.get(entry.getKey()), entry.getValue());
            } else {
                this.psiStates.put(entry.getKey(), entry.getValue());
            }
        }
    }
}
```

### 2. Main Manager

#### **TimelineManager.java** - Orchestrator
```java
@Service
public class TimelineManager {
    private Map<String, Timeline> timelines = new ConcurrentHashMap<>();
    private String currentTimelineId = "ℬ1";
    
    // Create a superposition
    public void createPsiState(String gameId, String psiId, String expression) {
        Timeline current = getCurrentTimeline(gameId);
        
        // Parse expression
        PsiState psi = PsiState.parse(expression);
        psi.setId(psiId);
        
        // Add to current timeline
        current.getPsiStates().put(psiId, psi);
        
        // Log event
        TemporalEvent event = new TemporalEvent(
            EventType.PSI_STATE_CREATED,
            "ψ-state " + psiId + " created: " + expression,
            System.currentTimeMillis()
        );
        current.getEvents().add(event);
        
        log.info("ψ-state {} created in timeline {}", psiId, current.getId());
    }
    
    // Collapse a superposition
    public void collapsePsiState(String gameId, String psiId) {
        Timeline current = getCurrentTimeline(gameId);
        PsiState psi = current.getPsiStates().get(psiId);
        
        if (psi == null || psi.getStatus() != PsiStatus.ACTIVE) {
            throw new IllegalStateException("Cannot collapse inactive ψ-state: " + psiId);
        }
        
        // Execute superposition action
        executeAction(gameId, psi.getAction());
        
        // Mark as collapsed
        psi.setStatus(PsiStatus.COLLAPSED);
        
        // Log event
        TemporalEvent event = new TemporalEvent(
            EventType.PSI_STATE_COLLAPSED,
            "ψ-state " + psiId + " collapsed, action executed: " + psi.getAction(),
            System.currentTimeMillis()
        );
        current.getEvents().add(event);
        
        log.info("ψ-state {} collapsed in timeline {}", psiId, current.getId());
    }
}
```

---

## 🎮 Concrete Usage Examples

### Example 1: Simple Superposition

#### **User Script:**
```javascript
// 1. Create a hero
HERO(Arthur)

// 2. Position him
MOV(Arthur, @10,10)

// 3. Create a superposition
ψ001: ⊙(Δt+2 @15,15 ⟶ MOV(HERO, Arthur, @15,15))
```

#### **Backend Processing:**
```java
// 1. Script parsing
public void executeScript(String script) {
    String[] lines = script.split("\n");
    
    for (String line : lines) {
        if (line.startsWith("HERO(")) {
            createHero(extractHeroName(line));
        } 
        else if (line.startsWith("MOV(")) {
            moveHero(extractMoveParams(line));
        }
        else if (line.matches("ψ\\d+: ⊙.*")) {
            // Superposition detected
            String psiId = line.substring(0, line.indexOf(":"));
            String expression = line.substring(line.indexOf("⊙"));
            createPsiState(gameId, psiId, expression);
        }
    }
}

// 2. Superposition creation
private void createPsiState(String gameId, String psiId, String expression) {
    // Parse: ⊙(Δt+2 @15,15 ⟶ MOV(HERO, Arthur, @15,15))
    PsiState psi = PsiState.parse(expression);
    
    // Game state BEFORE superposition
    GameState beforeState = gameStateService.getState(gameId);
    Hero arthur = beforeState.getHero("Arthur");
    // Arthur is at @10,10
    
    // Superposition creation
    Timeline timeline = timelineManager.getCurrentTimeline(gameId);
    timeline.getPsiStates().put(psiId, psi);
    
    // Arthur remains at @10,10 in reality
    // But superposition "imagines" he'll be at @15,15 in 2 turns
}
```

#### **Resulting State:**
```json
{
  "gameState": {
    "heroes": [
      {
        "name": "Arthur",
        "x": 10,
        "y": 10,
        "status": "ACTIVE"
      }
    ],
    "psiStates": [
      {
        "id": "ψ001",
        "status": "ACTIVE",
        "deltaT": 2,
        "targetX": 15,
        "targetY": 15,
        "action": "MOV(HERO, Arthur, @15,15)"
      }
    ]
  }
}
```

### Example 2: Superposition Collapse

#### **User Script:**
```javascript
// Collapse the superposition
†ψ001
```

#### **Backend Processing:**
```java
public void collapsePsiState(String gameId, String psiId) {
    Timeline timeline = timelineManager.getCurrentTimeline(gameId);
    PsiState psi = timeline.getPsiStates().get(psiId);
    
    if (psi.getStatus() == PsiStatus.ACTIVE) {
        // Execute stored action
        executeAction(gameId, psi.getAction()); // "MOV(HERO, Arthur, @15,15)"
        
        // Arthur instantly moves from @10,10 to @15,15
        Hero arthur = gameStateService.getHero(gameId, "Arthur");
        arthur.setX(15);
        arthur.setY(15);
        
        // Mark as collapsed
        psi.setStatus(PsiStatus.COLLAPSED);
        
        log.info("Arthur teleported from @10,10 to @15,15 by collapse of ψ001");
    }
}
```

### Example 3: Observation Trigger

#### **User Script:**
```javascript
// Create a trigger
Π(Player2 enters @15,15) ⇒ †ψ001

// When Player2 moves to @15,15
MOV(Player2, @15,15)
```

#### **Backend Processing:**
```java
public class ObservationTrigger {
    private String condition;  // "Player2 enters @15,15"
    private String action;     // "†ψ001"
    
    public void checkTrigger(String gameId, GameEvent event) {
        if (event.getType() == EventType.HERO_MOVED) {
            HeroMovedEvent moveEvent = (HeroMovedEvent) event;
            
            if (moveEvent.getHeroName().equals("Player2") && 
                moveEvent.getNewX() == 15 && 
                moveEvent.getNewY() == 15) {
                
                // Trigger activated!
                log.info("Observation trigger activated: Player2 entered @15,15");
                
                // Execute action: †ψ001
                timelineManager.collapsePsiState(gameId, "ψ001");
            }
        }
    }
}
```

---

## 🔄 Resolution Algorithms

### 1. Collapse Algorithm

```java
public class CausalCollapseHandler {
    
    // Main collapse method
    public void handleCollapse(String gameId, String psiId) {
        Timeline timeline = timelineManager.getCurrentTimeline(gameId);
        PsiState psi = timeline.getPsiStates().get(psiId);
        
        // 1. Check preconditions
        if (!canCollapse(psi)) {
            throw new TemporalException("Cannot collapse ψ-state: " + psiId);
        }
        
        // 2. Calculate cascade effects
        List<PsiState> cascadeEffects = calculateCascadeEffects(timeline, psi);
        
        // 3. Execute main collapse
        executeCollapse(gameId, psi);
        
        // 4. Process cascade effects
        for (PsiState cascadePsi : cascadeEffects) {
            if (cascadePsi.getStatus() == PsiStatus.ACTIVE) {
                executeCollapse(gameId, cascadePsi);
            }
        }
        
        // 5. Cleanup temporary states
        cleanupTemporalStates(timeline);
    }
    
    // Calculate cascade effects
    private List<PsiState> calculateCascadeEffects(Timeline timeline, PsiState collapsing) {
        List<PsiState> effects = new ArrayList<>();
        
        for (PsiState other : timeline.getPsiStates().values()) {
            if (other.getId().equals(collapsing.getId())) continue;
            
            // Check if other ψ-state is affected
            if (isAffectedByCollapse(other, collapsing)) {
                effects.add(other);
            }
        }
        
        return effects;
    }
    
    // Check if a ψ-state is affected by a collapse
    private boolean isAffectedByCollapse(PsiState target, PsiState collapsing) {
        // Same position in space-time
        if (target.getTargetX() == collapsing.getTargetX() && 
            target.getTargetY() == collapsing.getTargetY() &&
            target.getDeltaT() == collapsing.getDeltaT()) {
            return true;
        }
        
        // Same hero involved
        if (extractHeroFromAction(target.getAction()).equals(
            extractHeroFromAction(collapsing.getAction()))) {
            return true;
        }
        
        return false;
    }
}
```

### 2. Conflict Resolution Algorithm

```java
public class ConflictResolver {
    
    // Resolve conflict between two ψ-states
    public void resolveConflict(String gameId, PsiState psi1, PsiState psi2) {
        ConflictType type = detectConflictType(psi1, psi2);
        
        switch (type) {
            case SPATIAL_CONFLICT:
                resolveSpatialConflict(gameId, psi1, psi2);
                break;
                
            case TEMPORAL_CONFLICT:
                resolveTemporalConflict(gameId, psi1, psi2);
                break;
                
            case CAUSAL_CONFLICT:
                resolveCausalConflict(gameId, psi1, psi2);
                break;
                
            default:
                throw new TemporalException("Unknown conflict type");
        }
    }
    
    // Spatial conflict: two actions at same location
    private void resolveSpatialConflict(String gameId, PsiState psi1, PsiState psi2) {
        log.info("Resolving spatial conflict between {} and {}", psi1.getId(), psi2.getId());
        
        // Create a "phantom battle"
        PhantomBattle battle = new PhantomBattle(psi1, psi2);
        BattleResult result = battle.simulate();
        
        if (result.getWinner().equals(psi1.getId())) {
            // psi1 wins, psi2 is cancelled
            psi2.setStatus(PsiStatus.CANCELLED);
            executeCollapse(gameId, psi1);
        } else {
            // psi2 wins, psi1 is cancelled
            psi1.setStatus(PsiStatus.CANCELLED);
            executeCollapse(gameId, psi2);
        }
    }
    
    // Temporal conflict: causal paradox
    private void resolveTemporalConflict(String gameId, PsiState psi1, PsiState psi2) {
        log.info("Resolving temporal conflict between {} and {}", psi1.getId(), psi2.getId());
        
        // Create new timeline to avoid paradox
        Timeline newTimeline = timelineManager.getCurrentTimeline(gameId).fork("Temporal conflict resolution");
        
        // Execute psi1 in current timeline
        executeCollapse(gameId, psi1);
        
        // Execute psi2 in new timeline
        timelineManager.switchTimeline(gameId, newTimeline.getId());
        executeCollapse(gameId, psi2);
        
        // Both realities now coexist
    }
}
```

### 3. Phantom Battle Algorithm

```java
public class PhantomBattle {
    private PsiState attacker;
    private PsiState defender;
    
    public BattleResult simulate() {
        // Extract involved heroes
        Hero hero1 = extractHeroFromPsiState(attacker);
        Hero hero2 = extractHeroFromPsiState(defender);
        
        // Calculate battle scores
        int score1 = calculateBattleScore(hero1, attacker);
        int score2 = calculateBattleScore(hero2, defender);
        
        // Quantum randomness factor
        double quantumFactor = Math.random() * 0.3; // 30% chance
        
        // Determine winner
        if (score1 + quantumFactor > score2) {
            return new BattleResult(attacker.getId(), score1, score2);
        } else {
            return new BattleResult(defender.getId(), score2, score1);
        }
    }
    
    private int calculateBattleScore(Hero hero, PsiState psi) {
        int baseScore = hero.getHp() + hero.getAttack();
        
        // Bonus for temporal artifacts
        for (Artifact artifact : hero.getArtifacts()) {
            if (artifact.getType() == ArtifactType.TEMPORAL) {
                baseScore += artifact.getPower();
            }
        }
        
        // Bonus for temporal priority (smaller Δt = faster)
        baseScore += (10 - psi.getDeltaT()) * 5;
        
        return baseScore;
    }
}
```

---

## 🎯 Complete Example: Temporal Combat Scenario

### User Script:
```javascript
// 1. Create two heroes
HERO(Arthur)
HERO(Ragnar)

// 2. Position them
MOV(Arthur, @10,10)
MOV(Ragnar, @20,20)

// 3. Arthur equips a temporal blade
USE(ITEM, AvantWorldBlade, HERO:Arthur)

// 4. Create combat superpositions
ψ001: ⊙(Δt+1 @15,15 ⟶ MOV(HERO, Arthur, @15,15))
ψ002: ⊙(Δt+1 @15,15 ⟶ MOV(HERO, Ragnar, @15,15))

// 5. Observation triggers
Π(Arthur enters @15,15) ⇒ †ψ001
Π(Ragnar enters @15,15) ⇒ †ψ002

// 6. Simultaneous collapse (spatial conflict)
†ψ001
†ψ002
```

### Backend Processing:
```java
// 1. Spatial conflict detection
ConflictDetector detector = new ConflictDetector();
List<PsiState> conflicts = detector.detectConflicts(timeline);
// Conflict found: ψ001 and ψ002 target same position @15,15

// 2. Resolution by phantom battle
PhantomBattle battle = new PhantomBattle(psi001, psi002);
BattleResult result = battle.simulate();

// Score calculation:
// Arthur: HP(100) + Attack(50) + AvantWorldBlade(30) + Speed(9) = 189
// Ragnar: HP(120) + Attack(60) + Speed(9) = 189
// Quantum factor: 0.15 for Arthur

// 3. Result
if (result.getWinner().equals("ψ001")) {
    // Arthur wins
    executeCollapse(gameId, psi001); // Arthur teleports to @15,15
    psi002.setStatus(PsiStatus.CANCELLED); // Ragnar stays at @20,20
    
    log.info("Arthur wins phantom battle, teleports to @15,15");
} else {
    // Ragnar wins
    executeCollapse(gameId, psi002); // Ragnar teleports to @15,15
    psi001.setStatus(PsiStatus.CANCELLED); // Arthur stays at @10,10
    
    log.info("Ragnar wins phantom battle, teleports to @15,15");
}
```

---

## 🔧 Optimizations and Performance

### 1. Temporal States Cache
```java
@Component
public class TemporalStateCache {
    private final Map<String, GameState> stateCache = new ConcurrentHashMap<>();
    
    public GameState getOrCompute(String gameId, int turn, Supplier<GameState> computer) {
        String key = gameId + ":" + turn;
        return stateCache.computeIfAbsent(key, k -> computer.get());
    }
}
```

### 2. Temporal Branches Limitation
```java
// Maximum 5 timelines per game
private static final int MAX_TIMELINES = 5;

public Timeline createTimeline(String gameId) {
    if (getTimelineCount(gameId) >= MAX_TIMELINES) {
        // Merge oldest timelines
        mergeOldestTimelines(gameId);
    }
    return new Timeline();
}
```

### 3. Temporal Garbage Collection
```java
@Scheduled(fixedRate = 60000) // Every minute
public void cleanupExpiredStates() {
    long cutoff = System.currentTimeMillis() - Duration.ofMinutes(10).toMillis();
    
    timelines.values().forEach(timeline -> {
        timeline.getPsiStates().entrySet().removeIf(entry -> 
            entry.getValue().getCreatedAt() < cutoff && 
            entry.getValue().getStatus() == PsiStatus.COLLAPSED
        );
    });
}
```

---

## 🎉 Summary for Your Colleague

The Heroes of Time temporal engine is essentially:

1. **A "possible futures" system** stored as PsiState objects
2. **A temporal language parser** that understands ψ, ⊙, †, Π
3. **A timeline manager** that can create parallel branches
4. **A conflict resolver** that runs automatic "phantom battles"
5. **An observation system** that triggers actions based on conditions

**The innovation**: Instead of executing actions immediately, we store them as "potentials" and resolve them later according to quantum rules. This enables game mechanics impossible with a classic engine!

**Complete code**: Everything is implemented in the Java backend with ~3000 lines of code distributed across 15+ classes.

---

*Heroes of Time Temporal Engine - Complete Technical Explanation*

**Status: ✅ DOCUMENTED & IMPLEMENTED** 