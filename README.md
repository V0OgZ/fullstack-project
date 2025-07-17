# Heroes of Time - Quantum Temporal Strategy Game

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