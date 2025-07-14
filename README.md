# 🎮 Heroes of Time

**Revolutionary Strategy Game with Temporal Causality Zones**

Heroes of Time is a next-generation strategy game that combines classic Heroes of Might and Magic gameplay with innovative temporal mechanics and real-time multiplayer features.

## 🚀 Quick Start

```bash
# Start development environment
./start-app.sh

# Run all tests
./run-all-tests.sh

# Stop servers
./stop-app.sh
```

**📋 Essential Documentation:**
- 🎯 **Current Status**: `GAMESTATUS.md` - Complete verified working systems
- 🗺️ **Game Guide**: `WORKFLOW.md` - How to play a complete turn
- 🏗️ **Architecture**: `ARCHITECTURE.md` - Technical design overview
- 🧪 **Testing**: `TEST_SCRIPTS_README.md` - All available test scripts

## ✅ Current Status - FULLY FUNCTIONAL (January 2025)

### 🎮 **Core Game Systems Working**

#### ✅ **Turn Management**
- Complete turn system with ZFC (Zone of Temporal Causality) processing
- End turn functionality with resource bonuses and building completion
- Backend API: `/api/games/{gameId}/end-turn`

#### ✅ **Hero Movement**
- Full click-to-move system with pathfinding
- ZFC cost calculations for temporal movement
- Real-time game state updates after movement
- Backend API: `/api/heroes/{heroId}/move`

#### ✅ **Building Construction**
- Complete building system with costs and construction time
- Castle management with upgrades and resource requirements
- Real-time building completion and bonus application
- Backend API: `/api/games/{gameId}/buildings/construct`

#### ✅ **Unit Recruitment**
- Complete recruitment system with costs and availability
- Tier-based units with proper stats and progression
- Resource validation and quantity selection
- Backend API: `/api/games/{gameId}/units/recruit`

#### ✅ **Scenario System**
- Three complete scenarios: Conquest Classic (single), Temporal Rift (single), Multiplayer Arena
- Dynamic scenario loading from JSON resources
- Proper single-player vs multiplayer configuration

#### ✅ **Modern Interface**
- Clean, responsive game interface with proper controls
- Heroes panel for hero management
- Castle management for building construction
- Magic inventory system
- Simplified, functional UI without unnecessary buttons

### 🛠️ **Technical Stack**
- **Backend**: Spring Boot (Java 17) - Port 8080
- **Frontend**: React TypeScript - Port 3000
- **Database**: H2 in-memory with full persistence
- **APIs**: RESTful with comprehensive endpoints
- **Testing**: Complete test suite with E2E scenarios

### 🎯 **Game Features**
- **Temporal Causality Zones**: Innovative movement system with ZFC costs
- **Resource Management**: Gold, wood, stone with proper economics
- **Building System**: Castle construction with upgrades and bonuses
- **Hero Management**: Movement, stats, progression
- **Turn-Based Strategy**: Complete turn cycle with actions and progression

## 🏃 **How to Play**

1. **Start the game**: `./start-app.sh`
2. **Choose scenario**: Select from Conquest Classic, Temporal Rift, or Multiplayer Arena
3. **Play your turn**: 
   - Move heroes by clicking on the map
   - Construct buildings in your castle
   - Recruit units for your army
   - End turn when ready
4. **Continue**: Game progresses with proper turn management

**See `WORKFLOW.md` for complete turn-by-turn instructions.**

## 📊 **Project Status**

**Status**: ✅ **PRODUCTION READY** - All core systems verified and working

This is a **fully functional strategy game** with complete turn management, hero movement, building construction, and unit recruitment. The game is ready for extended gameplay and further feature development.

## 📚 Documentation

- `DEPLOYMENT_GUIDE.md` - Complete deployment instructions
- `GAMESTATUS.md` - Detailed game status and features
- `GAMESTATUS_UPDATED.md` - Honest assessment of current game state
- `DEVELOPMENT_ROADMAP.md` - Realistic development roadmap
- `INSTRUCTIONS_FOR_DEVELOPERS.md` - Development and debugging guide (English)
- `INSTRUCTIONS_POUR_TOI_FR.md` - Development and debugging guide (French)
- `TECHNICAL_DOCUMENTATION.md` - Technical architecture details

## 🤝 Contributing

See `CONTRIBUTING.md` for development guidelines and contribution instructions.

## 📄 License

This project is licensed under the MIT License - see the `LICENSE` file for details.

---

🎮 **Ready to play? Start with `./start-app.sh` and visit http://localhost:3000!**
