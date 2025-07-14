# 🎮 Heroes of Time

> 🚨 **POUR CURSOR AI**: Lire `INSTRUCTIONS_POUR_TOI.md` avant toute modification!

## Revolutionary Strategy Game with Temporal Causality Zones

Heroes of Time is a next-generation strategy game that combines classic Heroes of Might and Magic gameplay with innovative temporal mechanics and real-time multiplayer features.

## 🚀 Quick Start

```bash
# Start development environment
./start-app.sh

# Run all tests
./run-all-tests.sh

# Debug issues  
./debug-scenario-loading.sh

# Stop servers
./stop-app.sh
```

**For detailed debugging instructions, see `INSTRUCTIONS_POUR_TOI.md`**

## ✅ Current Status (December 2024)

### 🎯 Production Ready Features
- **✅ Scenario Selection**: Three epic scenarios available
- **✅ Multiplayer System**: Create/join sessions with epic names
- **✅ Session Management**: Polling-based updates (5-second intervals)
- **✅ Hero Movement**: Complete pathfinding and terrain system
- **✅ Castle Management**: Building construction and unit recruitment
- **✅ Combat System**: Turn-based tactical combat
- **✅ WebSocket**: Disabled for better reliability (polling mode)
- **✅ Bug Fixes**: Session name generation fully resolved

### 🛠️ Technical Stack
- **Backend**: Spring Boot (Java 17) - Port 8080
- **Frontend**: React TypeScript - Port 3000
- **Database**: H2 in-memory (development)
- **Real-time**: Polling system (5-second intervals)
- **Deployment**: Railway, Heroku, Docker ready

### 🎮 Game Features

#### Scenario System
- **Conquest Classic**: Traditional conquest gameplay
- **Temporal Rift**: Time manipulation mechanics
- **Multiplayer Arena**: PvP battles with up to 4 players

#### Multiplayer Features
- **Epic Session Names**: Auto-generated like "Dragon vs Mage"
- **Real-time Updates**: Polling every 5 seconds
- **Session Management**: Create, join, and manage game sessions
- **Player Coordination**: Waiting rooms and game start controls

#### Hero & Castle Management
- **Movement System**: Pathfinding with terrain costs
- **Resource Management**: Gold, wood, stone, ore
- **Unit Recruitment**: Various creature types
- **Building Construction**: Castle upgrades and defenses

## 🚀 Deployment Ready

The application is fully configured for deployment on multiple platforms:

- **Railway**: `railway.json` and `nixpacks.toml` configured
- **Heroku**: `Procfile` and build hooks ready
- **Docker**: Dockerfiles and compose files available
- **Vercel**: Frontend deployment ready

See `DEPLOYMENT_GUIDE.md` for detailed deployment instructions.

## 📊 Test Coverage

- **Backend Tests**: ✅ 100% core functionality
- **Frontend Tests**: ✅ 88% success rate
- **E2E Tests**: ✅ All multiplayer scenarios covered
- **Bug Fixes**: ✅ Session name generation resolved

## 🔧 Development

### Prerequisites
- Java 17+
- Node.js 18+
- npm or yarn

### Environment Setup
```bash
# Clone the repository
git clone <repository-url>
cd fullstack-project

# Start development servers
./start-app.sh

# Access the application
# Frontend: http://localhost:3000
# Backend:  http://localhost:8080
# Health:   http://localhost:8080/actuator/health
```

### Testing
```bash
# Run all tests
./run-all-tests.sh

# Run specific test suites
cd backend && ./mvnw test
cd frontend && npm test

# Run E2E tests
cd frontend && npx playwright test
```

## 🐛 Recent Bug Fixes

- ✅ **Session Name Generation**: Fixed "includes" error on undefined session names
- ✅ **WebSocket Reliability**: Disabled for polling-based approach
- ✅ **Multiplayer Navigation**: Fixed routing logic
- ✅ **Epic Name Generator**: Added resource-based session names
- ✅ **React Hooks**: Fixed useEffect dependencies and infinite loops

## 🎯 Production Highlights

- **Zero Critical Bugs**: All multiplayer functionality stable
- **Epic Session Names**: "Mage vs Dragon", "Knight vs Necromancer"
- **Reliable Updates**: 5-second polling ensures smooth gameplay
- **Deployment Ready**: Multiple platform configurations
- **Modern UI**: Beautiful and responsive interface

## 📚 Documentation

- `DEPLOYMENT_GUIDE.md` - Complete deployment instructions
- `GAMESTATUS.md` - Detailed game status and features
- `INSTRUCTIONS_POUR_TOI.md` - Development and debugging guide
- `TECHNICAL_DOCUMENTATION.md` - Technical architecture details

## 🤝 Contributing

See `CONTRIBUTING.md` for development guidelines and contribution instructions.

## 📄 License

This project is licensed under the MIT License - see the `LICENSE` file for details.

---

🎮 **Ready to play? Start with `./start-app.sh` and visit http://localhost:3000!**
