# 🎮 Heroes of Time - Gameplay Guide

**Master the Art of Temporal Strategy**

---

## 🎯 Introduction

Heroes of Time revolutionizes strategy gaming by introducing **quantum temporal mechanics**. Unlike traditional turn-based games, players can manipulate time itself, creating parallel realities, predicting futures, and collapsing timelines through strategic decisions.

---

## 🧠 Core Concepts

### 🌌 Quantum Superposition (ψ-states)

**ψ-states** represent actions that exist in quantum superposition - they are planned but not yet real until they "collapse" into reality.

```javascript
// Create a dragon in 2 turns at coordinates 126,65
ψ001: ⊙(Δt+2 @126,65 ⟶ CREATE(CREATURE, Dragon))
```

**Key Properties:**
- **Probability**: Each ψ-state has a probability of occurring (0.0 to 1.0)
- **Trigger Time**: When the ψ-state will activate (Δt+n)
- **Collapse Conditions**: What causes the ψ-state to become real
- **Observation**: Other players entering the zone can trigger collapse

### 🌍 Timeline Branching (ℬ1, ℬ2, ℬ3...)

Multiple timelines can exist simultaneously, each representing different possible futures.

```javascript
Timeline ℬ1: Arthur conquers the castle
Timeline ℬ2: Arthur retreats to the forest
Timeline ℬ3: Arthur uses temporal magic
```

**Timeline Rules:**
- Each player starts in timeline ℬ1
- Actions can create new branches
- Only one timeline survives conflict resolution
- Temporal artifacts can force timeline merging

### ⚔️ Causal Conflicts

When multiple ψ-states affect the same location at the same time, a **causal conflict** occurs.

```javascript
// Conflict: Two dragons at same location
ψ001: ⊙(Δt+2 @126,65 ⟶ CREATE(CREATURE, Dragon))    // Player 1
ψ002: ⊙(Δt+2 @126,65 ⟶ CREATE(CREATURE, Phoenix))   // Player 2
```

**Resolution Methods:**
1. **Phantom Battle**: Simulated combat between forces
2. **Temporal Artifact Priority**: Artifacts override normal actions
3. **Random Selection**: Quantum uncertainty principle
4. **Timeline Merge**: Compatible actions combine

---

## 🔮 Temporal Artifacts

### ⚔️ Lame d'Avant-Monde (Paradox Tier)

**Effect**: Write future events that ignore timeline conflicts

```javascript
USE(ITEM, AvantWorldBlade, HERO:Arthur)
ψ001: ⊙(Δt+3 @128,66 ⟶ BATTLE(HERO Arthur, HERO Ragnar))
```

**Mechanics:**
- Creates high-priority ψ-states
- Triggers phantom battles on observation
- Ignores slow/inactive timelines
- Can create temporal anomalies

### 🕰️ Horloge du Dernier Instant (Legendary Tier)

**Effect**: Rollback 1-3 turns for a hero or building

```javascript
USE(ITEM, ReverseClock, HERO:Arthur)
// Arthur returns to his position 2 turns ago
```

**Mechanics:**
- Creates temporal "gel zone" for 1 turn
- Cannot undo actions validated by other players
- Limited uses per game
- Affects only target entity

### 🚫 Balise d'Ignorance Temporelle (Legendary Tier)

**Effect**: Ignore weak/inactive heroes blocking advancement

```javascript
USE(ITEM, IgnoreBeacon, @125,64)
// Arthur can move through weak enemy heroes
```

**Mechanics:**
- Creates micro-anomaly if ignored hero becomes active
- Temporary effect (3 turns)
- Only affects heroes below threshold power
- Can be countered by direct engagement

### 🏗️ Tour de l'Ancrage (Legendary Tier)

**Effect**: Create zone immune to temporal alterations

```javascript
USE(ITEM, AnchorTower, @128,64)
// 3x3 zone around @128,64 becomes temporally locked
```

**Mechanics:**
- Lasts X turns (artifact dependent)
- Affects 3-tile radius
- Blocks all ψ-state effects
- Useful for defense or blocking Nexus points

### 📯 Trompette de l'Apocalypse (Singularity Tier)

**Effect**: Force single timeline on a zone

```javascript
USE(ITEM, ApocalypseHorn, @130,70)
// All timelines collapse to one reality
```

**Mechanics:**
- Suppresses all other futures/pasts
- Triggers duels if contested
- Risk of total effacement if lost
- Game-changing artifact

---

## 🎯 Strategic Gameplay

### 🚀 Opening Strategies

#### 1. **Temporal Expansion**
```javascript
HERO(Arthur)
MOV(Arthur, @125,64)
ψ001: ⊙(Δt+2 @126,65 ⟶ CREATE(STRUCTURE, Castle))
ψ002: ⊙(Δt+3 @127,66 ⟶ CREATE(CREATURE, Dragon))
```

**Advantages:**
- Secures multiple future positions
- Creates expansion pressure
- Difficult for opponents to counter

#### 2. **Artifact Rush**
```javascript
HERO(Arthur)
CREATE(ITEM, AvantWorldBlade, HERO:Arthur)
ψ001: ⊙(Δt+1 @128,66 ⟶ BATTLE(HERO Arthur, HERO Enemy))
```

**Advantages:**
- Early temporal artifact advantage
- High-priority actions
- Forces opponent reactions

#### 3. **Timeline Forking**
```javascript
HERO(Arthur)
// Create multiple possible futures
ψ001: ⊙(Δt+2 @125,64 ⟶ MOV(HERO Arthur, @130,70))
ψ002: ⊙(Δt+2 @125,64 ⟶ MOV(HERO Arthur, @120,60))
```

**Advantages:**
- Opponent cannot predict your moves
- Multiple escape routes
- Confusion tactics

### 🛡️ Defensive Strategies

#### 1. **Temporal Anchoring**
```javascript
// Lock critical zones
USE(ITEM, AnchorTower, @128,64)
USE(ITEM, AnchorTower, @132,68)
```

#### 2. **Observation Traps**
```javascript
// Set up collapse triggers
Π(Enemy enters @126,65) ⇒ †ψ001
// When enemy enters, your dragon appears
```

#### 3. **Counter-Temporal**
```javascript
// Counter enemy ψ-states
ψ001: ⊙(Δt+2 @126,65 ⟶ CREATE(CREATURE, Dragon))
// Place your own ψ-state to force conflict
```

### ⚡ Advanced Tactics

#### 1. **Phantom Battle Optimization**
```javascript
// Maximize battle scores
USE(ITEM, AvantWorldBlade, HERO:Arthur)  // +0.5 score
ψ001: ⊙(Δt+2 @126,65 ⟶ CREATE(CREATURE, Dragon))  // +0.6 score
```

#### 2. **Timeline Cascade**
```javascript
// Chain reactions across timelines
ψ001: ⊙(Δt+1 @125,64 ⟶ MOV(HERO Arthur, @126,65))
ψ002: ⊙(Δt+2 @126,65 ⟶ CREATE(CREATURE, Dragon))
ψ003: ⊙(Δt+3 @127,66 ⟶ BATTLE(CREATURE Dragon, HERO Enemy))
```

#### 3. **Temporal Loops**
```javascript
// Create self-reinforcing patterns
USE(ITEM, ReverseClock, HERO:Arthur)
ψ001: ⊙(Δt+1 @125,64 ⟶ USE(ITEM, ReverseClock, HERO:Arthur))
```

---

## 🎲 Probability & Randomness

### 🎯 ψ-state Probability

Each ψ-state has an inherent probability:

```javascript
ψ001: ⊙(Δt+2 @126,65 ⟶ CREATE(CREATURE, Dragon))  // 1.0 probability
ψ002: ⊙(Δt+2 @126,65 ⟶ CREATE(CREATURE, Phoenix)) // 0.8 probability
```

**Factors Affecting Probability:**
- **Temporal Artifacts**: +0.1 to +0.5 bonus
- **Hero Power**: Stronger heroes = higher probability
- **Distance**: Closer actions = higher probability
- **Resource Availability**: Sufficient resources = higher probability

### 🎰 Conflict Resolution

When conflicts occur, resolution follows priority:

1. **Temporal Artifacts** (highest priority)
2. **Phantom Battle** (combat simulation)
3. **Probability Comparison** (higher wins)
4. **Timeline Age** (older timelines win)
5. **Random Selection** (quantum uncertainty)

---

## 🏆 Victory Conditions

### 🎯 Standard Victory

- **Conquest**: Control 75% of strategic locations
- **Temporal Dominance**: Maintain 5+ active timelines
- **Artifact Mastery**: Possess 3+ Singularity artifacts
- **Timeline Collapse**: Force all opponents into single timeline

### 🌟 Special Victory

- **Temporal Paradox**: Create stable time loop
- **Quantum Supremacy**: 100+ active ψ-states
- **Causal Mastery**: Win 10+ phantom battles
- **Timeline Architect**: Successfully merge 5+ timelines

---

## 🧪 Example Game Flow

### Turn 1: Opening
```javascript
// Player 1
HERO(Arthur)
MOV(Arthur, @125,64)
ψ001: ⊙(Δt+2 @126,65 ⟶ CREATE(CREATURE, Dragon))

// Player 2
HERO(Merlin)
MOV(Merlin, @130,70)
ψ002: ⊙(Δt+2 @126,65 ⟶ CREATE(CREATURE, Phoenix))
```

### Turn 2: Conflict Detection
```
⚔️ Conflict detected at @126,65:
- ψ001: Dragon (Player 1)
- ψ002: Phoenix (Player 2)
```

### Turn 3: Temporal Resolution
```javascript
// Phantom battle initiated
Dragon vs Phoenix
Battle Score: Dragon 0.75, Phoenix 0.68
Winner: Dragon
Result: †ψ002 (Phoenix collapsed)
```

### Turn 4: Adaptation
```javascript
// Player 2 adapts strategy
USE(ITEM, AvantWorldBlade, HERO:Merlin)
ψ003: ⊙(Δt+1 @127,66 ⟶ BATTLE(HERO Merlin, CREATURE Dragon))
```

---

## 💡 Pro Tips

### 🎯 Timing Mastery
- **Early ψ-states** are harder to counter
- **Late ψ-states** can adapt to opponent moves
- **Staggered timing** creates cascading effects

### 🔮 Artifact Management
- **Save artifacts** for critical moments
- **Combine artifacts** for maximum effect
- **Counter artifacts** with observation triggers

### 🌍 Timeline Strategy
- **Branch early** to create options
- **Merge late** to consolidate power
- **Monitor conflicts** to predict collapses

### ⚡ Quantum Tactics
- **High probability** ψ-states for reliability
- **Low probability** ψ-states for surprise
- **Multiple ψ-states** for redundancy

---

## 🎭 Multiplayer Dynamics

### 👥 2-Player Games
- **Direct confrontation** common
- **Temporal artifacts** crucial
- **Timeline branching** for escape

### 🌐 3+ Player Games
- **Alliance formation** possible
- **Temporal manipulation** more complex
- **Cascade effects** across all players

### 🏆 Tournament Play
- **Best of 3** matches
- **Artifact drafting** before games
- **Timeline complexity** scoring

---

**🕰️ Master these concepts and you'll control time itself! The quantum realm awaits your strategic brilliance! ⚡**

*"In Heroes of Time, the best strategy is not just to win the present, but to write the future itself."*