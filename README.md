# 🎮 Heroes of Time - Revolutionary Temporal Strategy Game

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.x-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-2.7.18-green.svg)](https://spring.io/projects/spring-boot)
[![Languages](https://img.shields.io/badge/Languages-FR%20%7C%20EN-green.svg)](https://github.com/V0OgZ/heroes-of-time)

> **Revolutionary turn-based strategy game** featuring complete temporal mechanics, political simulation, and dual-scenario gameplay with unified architecture.

## 🏗️ **Technical Architecture**

### **Technology Stack**

#### **Frontend** (React + TypeScript)
- **React 18** with TypeScript for type safety
- **Canvas 2D** rendering for 60 FPS performance  
- **Zustand** for reactive state management
- **i18n** complete internationalization (FR/EN)
- **Responsive design** with modern CSS and Glassmorphism

#### **Backend** (Spring Boot + Java)
- **Spring Boot 2.7.18** with Java 17
- **REST API** with full CORS support
- **H2 Database** for development (PostgreSQL for production)
- **Maven** dependency management

### **Project Structure**

```
heroes-of-time/
├── 🖥️ backend/               # Spring Boot API
│   ├── src/main/java/
│   │   └── com/example/demo/
│   │       ├── controller/    # REST Controllers
│   │       ├── service/       # Business Logic
│   │       └── model/         # Data Models  
│   └── pom.xml               # Maven dependencies
├── 🌐 frontend/              # React + TypeScript
│   ├── src/
│   │   ├── components/       # React Components
│   │   ├── types/           # TypeScript definitions
│   │   ├── services/        # API integration
│   │   ├── store/           # State management
│   │   └── utils/           # Utilities
│   └── package.json         # NPM dependencies
└── 📚 docs/                 # Documentation
```

### **Development Setup**

#### **Prerequisites**
- **Node.js 18+** and npm
- **Java 17+** (SDKMAN recommended)
- **Maven 3.6+**
- **Git**

#### **Quick Start**
```bash
# Clone repository
git clone https://github.com/V0OgZ/heroes-of-time.git
cd heroes-of-time

# Start Backend (Terminal 1)
cd backend
mvn spring-boot:run

# Start Frontend (Terminal 2)  
cd frontend
npm install
npm start

# Access game
open http://localhost:3000
```

#### **Build for Production**
```bash
# Backend
cd backend && mvn clean package

# Frontend  
cd frontend && npm run build
```

### **🚨 Critical Architecture Issue**

⚠️ **IMPORTANT**: The current backend is **mostly mock data**. Critical game logic is currently client-side:

| System | Current Location | Should Be |
|--------|------------------|-----------|
| **ZFC Calculations** | Frontend | Backend |
| **Political System** | Frontend | Backend |
| **Temporal Mechanics** | Frontend | Backend |
| **Combat Resolution** | Frontend | Backend |
| **Game State Authority** | Frontend | Backend |

**This is a blocker for real multiplayer gameplay** and needs refactoring for production.

### **API Endpoints** (Current)

```typescript
// Game Management
GET    /api/games/{gameId}
POST   /api/games  
GET    /api/games/available
POST   /api/games/{gameId}/join

// Hero Actions  
POST   /api/heroes/{heroId}/move
POST   /api/heroes/{heroId}/attack
POST   /api/heroes/{heroId}/collect

// Game State
GET    /api/games/{gameId}/state
GET    /api/health
```

### **Performance Metrics**

| Metric | Value |
|--------|-------|
| **Build Time** | ~30 seconds |
| **Hot Reload** | <2 seconds |
| **API Response** | <100ms (local) |
| **Map Generation** | <500ms |
| **Rendering** | 60 FPS stable |

---

## 🎮 **Game Features & Mechanics**

### **🌟 Revolutionary Dual-Scenario System**

Heroes of Time features **two complete game experiences** within a unified interface:

#### **🏰 Classic Conquest**
- Traditional Heroes of Might & Magic gameplay
- Castle building and resource management
- Hero development and unit recruitment
- Turn-based strategy with immediate execution

#### **🔮 Mystical Conquest**  
- **Same interface** as Classic mode
- **+ 30+ Magical Objects** with temporal artifacts
- **+ Advanced inventory system** with equipment
- **+ Temporal mechanics** integrated seamlessly

**Key Innovation**: One codebase powers two completely different strategic experiences.

### **🎯 Complete Phase Implementation**

#### **✅ Phase 1: Foundation System**
- **Hexagonal map rendering** with Canvas 2D
- **Hero management** with stats and progression
- **Resource economy** with 7 resource types
- **Modern UI** with responsive design

#### **✅ Phase 2: Castle & Combat System**
- **8 Castle Types** with unique characteristics
- **168 Unit Types** (7 tiers × 8 castles × 3 variants)
- **70+ Spells** across 5 magic schools
- **150+ Artifacts** with equipment system
- **Tactical combat** with morale & luck mechanics

#### **✅ Phase 3: Advanced ZFC System**
- **Zone de Causalité calculations** for async gameplay
- **Shadow action bluffing** with quantum superposition
- **Temporal paradox resolution** engine
- **Multi-layer zone interactions**
- **Quantum entanglement** mechanics

#### **✅ Phase 4: Perestroika Political System**
- **4 Specialized Advisors** with unique personalities:
  - **General Volkov** (🎖️) - Military strategist
  - **Dr. Petrova** (💼) - Economic planner  
  - **Ambassador Kozlov** (🤝) - Diplomatic expert
  - **Prof. Ivanova** (🔬) - Scientific visionary
- **Dynamic crisis events** across 4 categories
- **Complex decision trees** with long-term consequences
- **6-category reputation system**

### **🌍 Complete Internationalization**

**Native multilingual support**:
- **🇫🇷 French**: Complete interface with cultural adaptation
- **🇬🇧 English**: Professional localization
- **80+ translated elements** with context-aware messaging
- **Persistent language preferences**

### **🎨 Modern Interface Features**

- **Glassmorphism design** with backdrop blur effects
- **Animated components** with smooth transitions  
- **Canvas rendering** for optimal performance
- **Responsive layout** for desktop and tablet
- **Dark theme** with gold accent colors

---

## 🚀 **Gameplay Mechanics**

### **🔮 Temporal Strategy (ZFC System)**

**Zone de Causalité** revolutionizes async strategy gaming:

- **Real-time zone calculations** showing influence areas
- **Conflict detection** between overlapping player zones  
- **Shadow actions** creating psychological warfare
- **Temporal paradoxes** requiring strategic resolution

```typescript
// Example ZFC calculation
const zone = calculateZFC(hero, gameState);
// Returns: influence radius, conflict zones, temporal effects
```

### **🏛️ Political Simulation**

Inspired by **Perestroika-era decision making**:

- **Advisor debates** with contradictory recommendations
- **Crisis management** requiring careful balance
- **Reputation consequences** affecting all interactions
- **Long-term strategic planning** across multiple metrics

### **⚔️ Advanced Combat**

- **Hex-based tactical battles** with positioning
- **Initiative system** determining turn order
- **Spell combinations** and area effects
- **Morale & luck** affecting unit performance

---

## 📊 **System Requirements**

### **Minimum Requirements**
- **Browser**: Chrome 90+, Firefox 88+, Safari 14+
- **RAM**: 4 GB available memory
- **Storage**: 500 MB free space
- **Network**: Broadband connection for multiplayer

### **Recommended Requirements**  
- **Browser**: Latest Chrome/Firefox/Edge
- **RAM**: 8 GB available memory
- **Storage**: 1 GB free space
- **GPU**: Hardware acceleration enabled

---

## 🛣️ **Development Roadmap**

### **🔧 Immediate Priorities**

#### **Backend Refactoring** (Critical)
- [ ] Move ZFC calculations to server-side
- [ ] Implement political system backend
- [ ] Add temporal mechanics server authority  
- [ ] Create combat resolution engine
- [ ] Establish game state synchronization

#### **Database Integration**
- [ ] PostgreSQL for game persistence
- [ ] Redis for session caching
- [ ] Player progression tracking

### **🌐 Future Enhancements**

#### **Multiplayer Features**
- [ ] WebSocket real-time communication
- [ ] Game lobbies and matchmaking
- [ ] Spectator mode with replay system
- [ ] Voice chat integration

#### **Advanced Features**
- [ ] AI opponents with difficulty levels
- [ ] Map editor with sharing capabilities
- [ ] Tournament system with rankings
- [ ] Mobile app development

---

## 🤝 **Contributing**

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### **Development Workflow**
```bash
# Create feature branch
git checkout -b feature/your-feature

# Make changes and test
npm run test
mvn test

# Submit pull request
git push origin feature/your-feature
```

### **Coding Standards**
- **TypeScript** for all frontend code
- **Java** following Spring Boot conventions
- **ESLint** for code formatting
- **Comprehensive testing** for new features

---

## 📚 **Documentation**

- [**Technical Architecture**](ARCHITECTURE.md) - Complete system documentation
- [**Game Specification**](HEROES_REFORGED_COMPLETE_SPEC.md) - Feature breakdown  
- [**Development Log**](frontend/DEVELOPMENT_LOG.md) - Implementation timeline
- [**Contributing Guide**](CONTRIBUTING.md) - Development guidelines

---

## 📄 **License**

MIT License - See [LICENSE](LICENSE) for details.

---

## 🔗 **Links**

- **Repository**: https://github.com/V0OgZ/heroes-of-time
- **Issues**: https://github.com/V0OgZ/heroes-of-time/issues
- **Discussions**: https://github.com/V0OgZ/heroes-of-time/discussions

---

**Heroes of Time** represents the evolution of strategy gaming - combining beloved classic mechanics with revolutionary innovations in temporal strategy, political simulation, and asynchronous gameplay. 

*The future of strategy gaming starts here.* ⏰✨ 
