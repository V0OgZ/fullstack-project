# Heroes of Time - Game Workflow

## 🎮 How to Play a Complete Turn

### Quick Start
```bash
# Start the game
./start-app.sh

# Frontend: http://localhost:3000
# Backend:  http://localhost:8080
```

### 🔄 Complete Turn Workflow

#### **1. View Game State**
- Check your current resources (Gold: ~21,100)
- View your heroes and their positions
- See available buildings and construction progress
- Plan your actions for the turn

**API Check:**
```bash
curl http://localhost:8080/api/games/demo-game
```

#### **2. Move Heroes**
- Select a hero (e.g., "Arthur" at position 2,2)
- Click target position on map
- System calculates movement cost with ZFC (Zone of Temporal Causality)
- Hero moves with proper pathfinding

**Example Move:**
```bash
curl -X POST http://localhost:8080/api/heroes/hero-1/move \
  -H "Content-Type: application/json" \
  -d '{"targetPosition": {"x": 5, "y": 5}}'
```

**Result:** Hero moves with ZFC cost calculation (e.g., 2.0 movement points)

#### **3. Construct Buildings**
- Open Castle Management interface
- Choose building type (barracks, archery_range, magic_guild, etc.)
- Verify resource costs
- Place building at chosen position

**Example Construction:**
```bash
curl -X POST http://localhost:8080/api/games/demo-game/buildings/construct \
  -H "Content-Type: application/json" \
  -d '{
    "playerId": "player1",
    "castleId": "castle_player1", 
    "buildingType": "magic_guild",
    "positionX": 9,
    "positionY": 9
  }'
```

**Result:** Building enters construction queue with completion timer

#### **4. Manage Resources**
- Check current resources: Gold, Wood, Stone, Ore, etc.
- Buildings provide daily bonuses (Gold: +6,300, Defense: +16)
- Plan future constructions based on available resources

#### **5. End Turn**
- Click "End Turn" button
- Backend processes all pending actions
- Buildings complete if construction time elapsed
- Daily resource bonuses applied
- Turn advances to next player

**End Turn:**
```bash
curl -X POST http://localhost:8080/api/games/demo-game/end-turn
```

**Result:** `{"success":true,"message":"Turn ended successfully"}`

### 🏗️ Building System

#### Available Building Types
- **town_hall**: +750 gold/day, +2 defense
- **barracks**: Recruit pikemen, +2 unit production
- **archery_range**: Recruit archers, +2 unit production  
- **magic_guild**: Provides spells, +3 spell power/level
- **marketplace**: +300 gold/day, +2 resource bonus
- **tavern**: +2 morale, +1 luck
- **blacksmith**: +3 unit production, +2 defense

#### Construction Process
1. Choose building type and position
2. Verify resource costs (gold, wood, stone)
3. Building enters construction queue
4. Wait for construction time (30-120 seconds)
5. Building completes automatically on next turn

### ⚔️ Hero Actions

#### Movement
- Heroes have movement points (default: 3)
- Terrain affects movement cost:
  - Grass: 1 point
  - Forest/Desert: 2 points  
  - Mountain/Swamp: 3 points
  - Water: 4 points
- ZFC system calculates temporal movement costs

#### Combat
- Heroes can attack enemies within range
- Combat resolution is automatic
- Experience gained from victories

#### Resource Collection
- Heroes can collect treasure chests on map
- Provides gold and gems for kingdom

### 🎯 Victory Conditions

#### Single Player Scenarios
- **Conquest Classic**: Defeat all enemy heroes
- **Temporal Rift**: Control temporal nexus points

#### Multiplayer Scenarios  
- **Multiplayer Arena**: Last player standing wins
- Eliminate all opponent heroes and castles

### 🔧 Technical Details

#### Game State
- Turn-based with 30-second time limits
- Real-time action processing
- Automatic building completion
- Resource generation each turn

#### APIs Available
- Game state: `GET /api/games/{gameId}`
- Hero movement: `POST /api/heroes/{heroId}/move`
- Building construction: `POST /api/games/{gameId}/buildings/construct`
- Turn management: `POST /api/games/{gameId}/end-turn`
- Castle info: `GET /api/games/{gameId}/players/{playerId}/buildings`

### 🎮 Player Tips

#### Resource Management
- Start with substantial resources (20,000+ gold)
- Build economy buildings first (town_hall, marketplace)
- Balance military and economic development

#### Strategy
- Scout map for treasure chests
- Control key terrain positions  
- Build defensive structures near borders
- Recruit balanced armies

#### Turn Efficiency
- Plan multiple actions per turn
- Move heroes first, then construct
- End turn promptly to advance game

---

🎯 **The game is fully functional - enjoy strategic gameplay!** 