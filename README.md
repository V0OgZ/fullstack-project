# 🕰️ Heroes of Time - Temporal Engine

<img width="1024" height="1536" alt="Heroes of Time - Temporal Sword" src="https://github.com/user-attachments/assets/746f871d-b70c-4df7-992e-0c84fe819c8d" />

---

## 🎮 **Strategy Game with Temporal Mechanics**

**Heroes of Time** combines Heroes of Might & Magic 3 gameplay with quantum temporal mechanics. Players can create quantum superpositions (ψ-states), manage multiple timelines, and trigger causal collapses through temporal artifacts.

### �� **Core Features**

**🏰 Heroes of Might & Magic 3 Base System:**
- **Turn-based Combat**: Classic H3 battle system with heroes, armies, and spells
- **City Building**: Construct castles, recruit troops, gather resources
- **Hero Development**: Level progression, skill trees, and equipment
- **Magic System**: Spell casting, mana management, and magical artifacts

**🌀 Quantum Temporal Mechanics:**
- **ψ-states (Psi States)**: Create quantum superpositions of actions that exist until observed
- **Timeline Branching**: Multiple parallel realities (ℬ1, ℬ2, ℬ3...) with different outcomes
- **Causal Collapse**: When two players' actions conflict, reality collapses to one outcome
- **Observation Triggers**: Enemy movement can trigger collapse of your planned actions

**🔮 Temporal Artifacts System:**
- **5 Tiers**: Common (60%), Rare (25%), Legendary (12%), Paradox (2.5%), Singularity (0.5%)
- **Unique Effects**: Time reversal, probability manipulation, timeline anchoring
- **Limited Uses**: Each artifact has finite uses per game for balance
- **Synergy Combos**: Artifacts can be combined for powerful effects

**📜 Advanced Script Language:**
- **Unicode Symbols**: ψ (psi-state), † (collapse), ⊙ (superposition), Π (observation)
- **5D Coordinates**: Navigate space (x,y,z) and time (timeline, temporal layer)
- **Probability System**: Actions have success chances affected by artifacts and positioning

### 🎯 **Gameplay Example: Temporal Warfare**

<img width="800" height="600" alt="Temporal Battle Scene" src="https://github.com/user-attachments/assets/temporal-battle-quantum-mechanics.png" />

**Turn 1: Setup with Legendary Artifact**
```javascript
// Player 1 uses Horloge du Dernier Instant (Legendary)
USE(ITEM, ReverseClock, HERO:Arthur)
// Arthur can now rollback 1-3 turns if needed
```

**Turn 2: Create Quantum Dragon**
```javascript
// Player 1 creates a ψ-state: dragon will appear in 2 turns
ψ001: ⊙(Δt+2 @126,65 ⟶ CREATE(CREATURE, Dragon))
// Probability: 0.6 (60% chance dragon appears)
```

**Turn 3: Paradox Artifact Activation**
```javascript
// Player 1 uses Lame d'Avant-Monde (Paradox tier)
USE(ITEM, AvantWorldBlade, HERO:Arthur)
// Dragon probability boosted: 0.6 + 0.5 = 1.0 (100% guaranteed!)
// Battle score bonus: +0.5 for phantom battles
```

**Turn 4: Enemy Counter-Strategy**
```javascript
// Player 2 moves hero toward dragon location
MOV(Ragnar, @126,65)
// Triggers observation: Π(Ragnar enters @126,65) ⇒ †ψ001
// Dragon collapses into reality!
```

**Turn 5: Time Reversal Escape**
```javascript
// Player 2 realizes mistake - dragon is too strong
USE(ITEM, ReverseClock, HERO:Ragnar)
// Ragnar returns to position from Turn 3
// Creates temporal gel zone for 1 turn
```

### 💫 **Technical Implementation**
- **Backend**: Spring Boot 3.2.0 with Java 17
- **Frontend**: TypeScript React with hexagonal rendering
- **Database**: JPA/Hibernate for persistence
- **Script Parser**: Custom language parser for temporal commands
- **Test Suite**: Automated testing with demo scenarios

---

## Quick Start

### 1. Run the Game (Easy Way)
```bash
# Start everything at once
./start-all.sh

# Stop everything
./stop-all.sh
```

### 2. Run the Game (Manual Way)
```bash
# Start backend
cd backend && mvn spring-boot:run

# Start frontend (new terminal)
cd frontend && python3 -m http.server 8000

# Start temporal interface (new terminal)
cd frontend-temporal && python3 -m http.server 5173
```

### 3. Test Everything
```bash
cd scripts-test
./demo-heroes-of-might-magic-complete.sh
```

### 4. Access Interfaces
- **Backend API**: http://localhost:8080/api/temporal/health
- **Frontend Classic**: http://localhost:8000
- **Temporal Console**: http://localhost:5173

---

## Documentation

### Core Documentation
- **[Complete Game Guide](docs/HEROES_OF_TIME_COMPLETE_REFERENCE.md)** - Full H3 + Temporal commands
- **[Implementation Status](docs/HMM3_IMPLEMENTATION_STATUS.md)** - What works and what needs work
- **[Technical Architecture](docs/TECHNICAL_DOCUMENTATION.md)** - How the engine works

### Game Features
- **[Gameplay Guide](docs/GAMEPLAY.md)** - How to play Heroes of Time
- **[Temporal Mechanics](docs/GRAMMAIRE_SPATIO_TEMPORELLE.md)** - Quantum temporal scripting
- **[Artifact System](docs/TEMPORAL_ARTIFACTS.md)** - Magical temporal items

### Development
- **[Developer Guide](docs/DEVELOPER_INSTRUCTIONS.md)** - How to contribute
- **[Test Scripts](scripts-test/README.md)** - Testing suite documentation
- **[Architecture](docs/ARCHITECTURE.md)** - Technical structure

---

## What is Heroes of Time?

Heroes of Time combines **Heroes of Might & Magic 3** gameplay with **quantum temporal mechanics**. 

### Core Features
- **Classic H3 Elements**: Cities, heroes, armies, magic, resources
- **Quantum Mechanics**: ψ-states, temporal collapse, timeline branching
- **Temporal Artifacts**: Time manipulation items with unique effects
- **Script Language**: Complete temporal scripting system

### Example Commands
```bash
# Classic H3
HERO(Arthur, CLASS:KNIGHT, LEVEL:1)
BUILD(CASTLE, @20,20, PLAYER:player1)
RECRUIT(UNIT, SWORDSMEN, 20, HERO:Arthur)

# Temporal Mechanics
ψ001: ⊙(Δt+2 @15,15 ⟶ MOV(Arthur, @15,15))
Π(Player enters @15,15) ⇒ †ψ001
†ψ001
```

---

## Development Status

**✅ Working (85%)**
- Temporal engine (100%)
- Basic H3 commands (85%)
- Script parsing (100%)
- Frontend interfaces (100%)

**🔄 In Progress (15%)**
- Advanced H3 mechanics
- Resource persistence
- Complex battle system

---

## Quick Links

- **[Full Command Reference](docs/HEROES_OF_TIME_COMPLETE_REFERENCE.md)**
- **[Test Suite](scripts-test/README.md)**
- **[GitHub Repository](https://github.com/V0OgZ/Heroes-of-Time)**

---

*Heroes of Time - Master time, dominate space, conquer eternity* 