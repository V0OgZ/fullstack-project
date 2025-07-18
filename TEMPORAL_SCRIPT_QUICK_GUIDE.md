# ⚡ TEMPORAL SCRIPT LANGUAGE - QUICK GUIDE

> **For Developers, AI Assistants & Power Users**

---

## 🎯 SYNTAX CHEAT SHEET

### Two Formats, Same Power

| **Lisp Format** | **Greek Format** | **Description** |
|----------------|------------------|------------------|
| `(PSI psi1 (MOV Arthur @10,15) (DELTA_T 3))` | `ψ1: ⊙(MOV(Arthur, @10,15)) Δt=3` | Create temporal state |
| `(COLLAPSE psi1)` | `†ψ1` | Collapse PSI state |
| `(HERO Arthur)` | `HERO(Arthur)` | Create hero |
| `(MOV Arthur @10,15)` | `MOV(Arthur, @10,15)` | Move hero |

---

## 🚀 ESSENTIAL COMMANDS

### 1. Hero Management
```lisp
(HERO Arthur)                    // Create hero
(MOV Arthur @10,15)              // Move hero
MOV(Arthur, @10,15)              // Alternative syntax
```

### 2. Temporal Operations
```lisp
// Create PSI state (future action)
(PSI future_battle (BATTLE Arthur Dragon) (DELTA_T 3))
ψ1: ⊙(BATTLE(Arthur, Dragon)) Δt=3

// Collapse PSI state (execute now)
(COLLAPSE future_battle)
†ψ1
```

### 3. Strategic Commands
```
BUILD(Castle, @50,50, PLAYER:RedPlayer)
COLLECT(RESOURCE, Gold, 1000, PLAYER:RedPlayer)
RECRUIT(UNIT, Archers, 10, HERO:Arthur)
CAST(SPELL, Fireball, TARGET:Dragon, HERO:Wizard)
```

---

## 💡 COMMON PATTERNS

### Pattern 1: Simple Hero Action
```lisp
(HERO Arthur)
(MOV Arthur @10,15)
(BATTLE Arthur Dragon)
```

### Pattern 2: Temporal Strategy
```lisp
// Plan future action
(PSI escape_plan (MOV Arthur @0,0) (DELTA_T 2))

// Execute if needed
(COLLAPSE escape_plan)
```

### Pattern 3: Resource & Build
```
COLLECT(RESOURCE, Gold, 500, PLAYER:Me)
BUILD(Castle, @25,25, PLAYER:Me)
RECRUIT(UNIT, Knights, 5, HERO:Arthur)
```

### Pattern 4: Complex Temporal Sequence
```lisp
(PSI complex_strategy 
  (SEQUENCE 
    (MOV Arthur @15,20)
    (COLLECT gold 200)
    (BATTLE Arthur Guardian)) 
  (DELTA_T 5) 
  (PROB 0.75))
```

---

## 🎮 GAME MECHANICS

### Positions
- Format: `@x,y`
- Example: `@10,15` means position (10,15)
- Negative coordinates: `@-5,10`

### Time Deltas
- Lisp: `(DELTA_T 3)`
- Greek: `Δt=3`
- Means: Execute in 3 turns

### Probability
- Lisp: `(PROB 0.8)`
- Greek: `P=0.8`
- Means: 80% chance of success

### Timeline Branches
- Lisp: `(BRANCH alpha)`
- Greek: `α=alpha`
- Means: Execute in timeline "alpha"

---

## 🔧 DEVELOPER INTEGRATION

### Parser Usage
```java
@Autowired
private LispTemporalScriptParser lispParser;

@Autowired
private RegexTemporalScriptParser regexParser;

// Parse script
if (lispParser.isTemporalScript(script)) {
    PsiState psiState = lispParser.parseTemporalScript(script);
} else if (regexParser.isTemporalScript(script)) {
    PsiState psiState = regexParser.parseTemporalScript(script);
}
```

### Performance Tips
- **Simple scripts**: Use Regex parser (fastest)
- **Complex nested**: Use Lisp parser (most accurate)
- **High volume**: Use Regex parser (best throughput)

---

## 🤖 AI ASSISTANT PATTERNS

### Intent Recognition
```
User: "Move Arthur to position 10,15 in 3 turns"
→ Generate: (PSI move_arthur (MOV Arthur @10,15) (DELTA_T 3))

User: "Attack dragon with Arthur"
→ Generate: (BATTLE Arthur Dragon)

User: "Build a castle at 50,50"
→ Generate: BUILD(Castle, @50,50, PLAYER:CurrentPlayer)
```

### Format Selection
```
Simple command → Either format
Complex nested → Lisp format preferred
Mathematical expression → Greek format preferred
```

---

## 📊 EXAMPLE SCRIPTS

### Beginner Level
```lisp
;; Create and move hero
(HERO Arthur)
(MOV Arthur @10,15)

;; Basic combat
(BATTLE Arthur Dragon)
```

### Intermediate Level
```lisp
;; Temporal planning
(PSI attack_plan (BATTLE Arthur Dragon) (DELTA_T 2) (PROB 0.7))
(OBSERVE attack_plan (WHEN (HERO_HEALTH >80)))

;; Resource management
COLLECT(RESOURCE, Gold, 1000, PLAYER:Me)
BUILD(Castle, @50,50, PLAYER:Me)
```

### Advanced Level
```lisp
;; Multi-timeline strategy
(PSI timeline_a 
  (SEQUENCE 
    (MOV Arthur @30,35)
    (RECRUIT (UNIT Dragons 2) (HERO Arthur))
    (SIEGE Castle @100,100)) 
  (DELTA_T 5) 
  (BRANCH alpha) 
  (PROB 0.6))

(PSI timeline_b 
  (SEQUENCE 
    (CAST (SPELL Diplomacy) (TARGET Castle))
    (CAPTURE (OBJECTIVE Castle))) 
  (DELTA_T 3) 
  (BRANCH beta) 
  (PROB 0.4))
```

---

## ⚠️ COMMON MISTAKES

### 1. Syntax Errors
```lisp
❌ (PSI psi1 (MOV Arthur @10,15  // Missing closing parenthesis
✅ (PSI psi1 (MOV Arthur @10,15) (DELTA_T 3))

❌ ψ1: MOV(Arthur, @10,15) Δt=3  // Missing observation operator
✅ ψ1: ⊙(MOV(Arthur, @10,15)) Δt=3
```

### 2. Invalid Positions
```lisp
❌ (MOV Arthur 10,15)          // Missing @ symbol
✅ (MOV Arthur @10,15)

❌ (MOV Arthur @-1000,-1000)   // Out of bounds
✅ (MOV Arthur @10,15)
```

### 3. Non-existent Heroes
```lisp
❌ (MOV UnknownHero @10,15)    // Hero not created
✅ (HERO Arthur)
    (MOV Arthur @10,15)
```

---

## 🎯 QUICK REFERENCE

### Symbols
- `ψ` = PSI state
- `†` = Collapse
- `⊙` = Observation
- `Δt` = Delta time
- `α,β,γ` = Timeline branches
- `@` = Position marker

### Commands
- `HERO` = Create hero
- `MOV` = Move
- `BATTLE` = Combat
- `CREATE` = Create entity
- `BUILD` = Build structure
- `COLLECT` = Gather resources
- `RECRUIT` = Hire units
- `CAST` = Use magic
- `EQUIP` = Equip items

### Temporal
- `PSI` = Create temporal state
- `COLLAPSE` = Execute temporal state
- `OBSERVE` = Set trigger condition
- `DELTA_T` = Time offset
- `PROB` = Probability
- `BRANCH` = Timeline branch

---

## 🚀 GETTING STARTED

1. **Start Simple**: Create a hero and move them
2. **Add Temporal**: Plan a future action with PSI
3. **Use Resources**: Collect and build
4. **Go Complex**: Try multi-step sequences
5. **Master Both**: Use Lisp for complex, Greek for simple

---

*For complete documentation, see `TEMPORAL_SCRIPT_LANGUAGE_REFERENCE.md`* 