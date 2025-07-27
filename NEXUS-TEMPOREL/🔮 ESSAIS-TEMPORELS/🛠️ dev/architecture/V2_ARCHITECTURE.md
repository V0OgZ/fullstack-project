# 🏗️ Heroes of Time - Technical Architecture

*Complete system architecture and technical design documentation*

## 🎯 **System Overview**

Heroes of Time is a **full-stack asynchronous multiplayer strategy game** built with modern web technologies. The system combines real-time multiplayer capabilities with innovative temporal mechanics through a sophisticated hexagonal terrain system and advanced state management. **Updated January 2025** with Quantum Hero Abilities and Temporal Engine integration.

---

## 🏗️ **High-Level Architecture**

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    HEROES OF TIME ARCHITECTURE (2025)                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────────┐ │
│  │                              CLIENT LAYER                              │ │
│  │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────────┐ │ │
│  │  │ React App       │  │   Game Store    │  │   Temporal Engine       │ │ │
│  │  │ (Port 8000) ✨  │  │   (Zustand)     │  │   (Quantum Logic)       │ │ │
│  │  │ TrueHeroes UI   │  │   Magic Items   │  │   Vision Causale        │ │ │
│  │  └─────────────────┘  └─────────────────┘  └─────────────────────────┘ │ │
│  │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────────┐ │ │
│  │  │ Epic Content    │  │ Hero Abilities  │  │   ZFC Engine            │ │ │
│  │  │ Viewer (Assets) │  │ Nikita Powers   │  │   (Temporal Logic)      │ │ │
│  │  └─────────────────┘  └─────────────────┘  └─────────────────────────┘ │ │
│  └─────────────────────────────────────────────────────────────────────────┘ │
│                                    │                                        │
│                                    │ WebSocket + REST API                   │
│                                    ▼                                        │
│  ┌─────────────────────────────────────────────────────────────────────────┐ │
│  │                             SERVER LAYER                               │ │
│  │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────────┐ │ │
│  │  │  Spring Boot    │  │   Game Service  │  │   Multiplayer Service   │ │ │
│  │  │  (Port 8080)    │  │   (Business)    │  │   (WebSocket)           │ │ │
│  │  │  Backend API    │  │   Hero Logic    │  │   Real-time Sync        │ │ │
│  │  └─────────────────┘  └─────────────────┘  └─────────────────────────┘ │ │
│  │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────────┐ │ │
│  │  │ Quantum Parser  │  │   AI Service    │  │   Epic Content API      │ │ │
│  │  │ Formula Engine  │  │   (Opponents)   │  │   (Assets Manager)      │ │ │
│  │  └─────────────────┘  └─────────────────┘  └─────────────────────────┘ │ │
│  └─────────────────────────────────────────────────────────────────────────┘ │
│                                    │                                        │
│                                    │ JPA/Hibernate                          │
│                                    ▼                                        │
│  ┌─────────────────────────────────────────────────────────────────────────┐ │
│  │                            DATA LAYER                                  │ │
│  │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────────┐ │ │
│  │  │   H2 Database   │  │   Game State    │  │   Temporal Data         │ │ │
│  │  │   (In-Memory)   │  │   (Entities)    │  │   (ZFC Zones)           │ │ │
│  │  │   Hero Assets   │  │   AI Players    │  │   Quantum States        │ │ │
│  │  └─────────────────┘  └─────────────────┘  └─────────────────────────┘ │ │
│  └─────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

## 🎮 **NEW: Quantum Hero System**

### **🎯 Nikita Victor Nettoyeur - Temporal Sniper**
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        QUANTUM ABILITY WORKFLOW                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  [Frontend] Ability Activation                                             │
│       │                                                                     │
│       ▼                                                                     │
│  [Parser] Quantum Formula Processing                                       │
│       │ ψ{Nikita} = OBSERVE[lunette_quantique] ⊗ PIERCE[brouillard_causal] │
│       ▼                                                                     │
│  [Backend] Script Execution Engine                                         │
│       │ PIERCE[fog_of_causality] ⇒ REVEAL(enemy.position)                  │
│       ▼                                                                     │
│  [Engine] Temporal Effect Processing                                       │
│       │ Vision through causality mist                                      │
│       ▼                                                                     │
│  [Result] Enemy revealed, penalties ignored                                │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🔧 **Technology Stack**

### **Frontend (React TypeScript)**
- **Framework**: React 18 with TypeScript
- **State Management**: Zustand (lightweight, performant)
- **UI Components**: Custom components with CSS modules
- **Real-time**: WebSocket for multiplayer communication
- **Testing**: Playwright for E2E testing
- **Build**: Vite for fast development

### **Backend (Spring Boot)**
- **Framework**: Spring Boot 3.x (Java 17)
- **Database**: H2 in-memory with JPA/Hibernate
- **Real-time**: WebSocket with STOMP protocol
- **API**: RESTful endpoints with comprehensive coverage
- **Testing**: JUnit 5 with Mockito
- **Build**: Maven

### **Infrastructure**
- **Database**: H2 in-memory (development) / PostgreSQL (production)
- **Real-time**: WebSocket for live multiplayer
- **Caching**: In-memory caching for game state
- **Security**: CORS configuration for cross-origin requests

---

## 🎮 **Core Game Systems**

### **1. Hexagonal Terrain System**
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           HEXAGONAL TERRAIN ENGINE                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────────┐     │
│  │   Map Generator │  │   Pathfinding   │  │   Vision System         │     │
│  │   (Procedural)  │  │   (A* Algorithm)│  │   (Line of Sight)       │     │
│  └─────────────────┘  └─────────────────┘  └─────────────────────────┘     │
│           │                     │                     │                     │
│           ▼                     ▼                     ▼                     │
│  ┌─────────────────────────────────────────────────────────────────────────┐ │
│  │                        HEXAGONAL COORDINATE SYSTEM                     │ │
│  │  • Cube coordinates (q, r, s) for precise positioning                  │ │
│  │  • Axial coordinates for efficient storage                             │ │
│  │  • Perfect tessellation with no gaps or overlaps                       │ │
│  └─────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Key Components:**
- **Coordinate System**: Cube coordinates for precise hexagonal positioning
- **Pathfinding**: A* algorithm optimized for hexagonal grids
- **Vision System**: Line-of-sight calculations with fog of war
- **Terrain Types**: Grass, forest, mountain, water with movement costs

### **2. Temporal Causality Zones (ZFC)**
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           TEMPORAL ZFC ENGINE                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────────┐     │
│  │  Quantum Zones  │  │  Shadow Actions │  │   Paradox Resolution    │     │
│  │  (Superposition)│  │   (Bluffing)    │  │   (Conflict Mgmt)       │     │
│  └─────────────────┘  └─────────────────┘  └─────────────────────────┘     │
│           │                     │                     │                     │
│           ▼                     ▼                     ▼                     │
│  ┌─────────────────────────────────────────────────────────────────────────┐ │
│  │                        TEMPORAL STATE MANAGEMENT                       │ │
│  │  • Multiple timeline branches                                          │ │
│  │  • Quantum superposition states                                        │ │
│  │  • Reality stability monitoring                                        │ │
│  └─────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Key Features:**
- **Quantum Superposition**: Multiple possible futures exist simultaneously
- **Shadow Actions**: Fake moves to deceive opponents
- **Paradox Resolution**: Manage temporal conflicts and reality stability
- **Chronoflame Effects**: Magical fires that manipulate time

### **3. Asynchronous Multiplayer System**
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        ASYNCHRONOUS MULTIPLAYER ENGINE                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────────┐     │
│  │  Session Mgmt   │  │  Turn System    │  │   Notification Engine   │     │
│  │  (Game Rooms)   │  │  (Async)        │  │   (Real-time)           │     │
│  └─────────────────┘  └─────────────────┘  └─────────────────────────┘     │
│           │                     │                     │                     │
│           ▼                     ▼                     ▼                     │
│  ┌─────────────────────────────────────────────────────────────────────────┐ │
│  │                           WEB SOCKET LAYER                             │ │
│  │  • Real-time game state synchronization                                 │ │
│  │  • Turn notifications and updates                                       │ │
│  │  • Cross-platform compatibility                                         │ │
│  └─────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Key Features:**
- **Session Management**: Game rooms with persistent state
- **Turn System**: Asynchronous turns with no waiting
- **Real-time Notifications**: Instant updates when it's your turn
- **Cross-platform**: Works on desktop, tablet, and mobile

---

## 📁 **Project Structure**

### **Frontend Structure**
```
🌐 frontend/
├── src/
│   ├── components/           # React components
│   │   ├── TrueHeroesInterface.tsx    # Main game interface
│   │   ├── ModernGameRenderer.tsx     # Hexagonal map renderer
│   │   ├── CastleManagementPanel.tsx  # Castle management
│   │   └── ...                        # Other UI components
│   ├── store/
│   │   └── useGameStore.ts            # Zustand state management
│   ├── services/                      # API services
│   │   ├── api.ts                     # Main API client
│   │   ├── gameService.ts             # Game logic
│   │   ├── zfcService.ts              # Temporal mechanics
│   │   └── ...                        # Other services
│   ├── types/                         # TypeScript definitions
│   │   ├── game.ts                    # Core game types
│   │   ├── temporal.ts                # ZFC system types
│   │   └── ...                        # Other type definitions
│   ├── utils/                         # Utility functions
│   │   ├── hexMapGenerator.ts         # Map generation
│   │   ├── pathfinding.ts             # A* algorithm
│   │   └── ...                        # Other utilities
│   └── i18n/                          # Internationalization
└── 🧪 tests/
    └── e2e/                           # Playwright tests
```

### **Backend Structure**
```
🖥️ backend/
├── src/main/java/com/example/demo/
│   ├── controller/                     # REST API controllers
│   │   ├── GameController.java         # Game management
│   │   ├── MultiplayerController.java  # Multiplayer logic
│   │   ├── ZFCController.java          # Temporal mechanics
│   │   └── ...                         # Other controllers
│   ├── service/                        # Business logic
│   │   ├── GameService.java            # Core game logic
│   │   ├── MultiplayerService.java     # Session management
│   │   ├── ZFCService.java             # Temporal calculations
│   │   └── ...                         # Other services
│   ├── model/                          # Data models
│   │   ├── Game.java                   # Game entity
│   │   ├── Player.java                 # Player entity
│   │   ├── Hero.java                   # Hero entity
│   │   └── ...                         # Other entities
│   ├── repository/                     # Data access
│   │   ├── GameRepository.java         # Game data access
│   │   ├── PlayerRepository.java       # Player data access
│   │   └── ...                         # Other repositories
│   └── config/                         # Configuration
│       ├── WebSocketConfig.java        # WebSocket setup
│       └── WebConfig.java              # CORS and security
└── src/test/java/                      # Unit tests
```

---

## 🔄 **Data Flow Architecture**

### **1. Game State Synchronization**
```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Client    │    │   Server    │    │  Database   │
│  (React)    │    │ (Spring)    │    │    (H2)     │
└─────────────┘    └─────────────┘    └─────────────┘
       │                   │                   │
       │ 1. Action         │                   │
       │ (Move Hero)       │                   │
       ├──────────────────►│                   │
       │                   │ 2. Validate       │
       │                   │ & Process         │
       │                   ├──────────────────►│
       │                   │                   │ 3. Update
       │                   │                   │ Game State
       │                   │◄──────────────────┤
       │                   │ 4. Broadcast      │
       │                   │ Update            │
       │◄──────────────────┤                   │
       │ 5. Update UI      │                   │
       │                   │                   │
```

### **2. Asynchronous Turn Flow**
```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│ Player A    │    │   Server    │    │ Player B    │
│ (Turn 1)    │    │ (Game State)│    │ (Turn 2)    │
└─────────────┘    └─────────────┘    └─────────────┘
       │                   │                   │
       │ 1. Take Turn      │                   │
       ├──────────────────►│                   │
       │                   │ 2. Process        │
       │                   │ & Save State      │
       │                   │                   │
       │                   │ 3. Notify         │
       │                   │ Next Player       │
       │                   ├──────────────────►│
       │                   │                   │ 4. Take Turn
       │                   │                   │ (Later)
```

### **3. ZFC System Flow**
```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Client    │    │ ZFC Engine  │    │ Game State  │
│  (Action)   │    │ (Temporal)  │    │ (Database)  │
└─────────────┘    └─────────────┘    └─────────────┘
       │                   │                   │
       │ 1. Create         │                   │
       │ Shadow Action     │                   │
       ├──────────────────►│                   │
       │                   │ 2. Calculate      │
       │                   │ Temporal Effects  │
       │                   ├──────────────────►│
       │                   │                   │ 3. Store
       │                   │                   │ Quantum State
       │                   │◄──────────────────┤
       │                   │ 4. Return         │
       │                   │ Possibilities     │
       │◄──────────────────┤                   │
       │ 5. Display        │                   │
       │ Shadow Actions    │                   │
       │                   │                   │
```

---

## 🔧 **Key Technical Components**

### **1. Hexagonal Coordinate System**
```typescript
// Cube coordinates for precise hexagonal positioning
interface CubeCoord {
  q: number; // Column
  r: number; // Row  
  s: number; // Third axis (q + r + s = 0)
}

// Conversion utilities
const cubeToPixel = (cube: CubeCoord, size: number): Point => ({
  x: size * (Math.sqrt(3) * cube.q + Math.sqrt(3)/2 * cube.r),
  y: size * (3/2 * cube.r)
});
```

### **2. ZFC State Management**
```typescript
interface ZFCZone {
  id: string;
  center: Position;
  radius: number;
  temporalState: TemporalState;
  superpositionStates: TemporalState[];
  probability: number;
  entangledZones: string[];
}

interface ShadowAction {
  id: string;
  playerId: string;
  shadowType: ShadowType;
  realAction?: ActionPlan;
  bluffData?: BluffAction;
  detectionProbability: number;
}
```

### **3. Asynchronous Turn System**
```typescript
interface GameSession {
  id: string;
  players: Player[];
  currentPlayerIndex: number;
  turnNumber: number;
  gameState: GameState;
  lastActionTime: Date;
  turnTimeout: number;
}
```

---

## 🧪 **Testing Architecture**

### **Frontend Testing (Playwright)**
```
🧪 tests/e2e/
├── 01-single-demo.spec.ts      # Basic gameplay tests
├── multiplayer-demo.spec.ts    # Multiplayer functionality
├── epic-content-demo.spec.ts   # Epic content system
├── terrain-vision.spec.ts      # Hexagonal terrain
└── utils/
    └── translations.ts         # i18n test utilities
```

### **Backend Testing (JUnit)**
```
src/test/java/
├── controller/                 # API endpoint tests
├── service/                    # Business logic tests
├── repository/                 # Data access tests
└── integration/                # End-to-end tests
```

---

## 🚀 **Performance Considerations**

### **Frontend Optimization**
- **React.memo()** for expensive components
- **useCallback()** and **useMemo()** for expensive calculations
- **Canvas rendering** for hexagonal terrain
- **Virtual scrolling** for large maps

### **Backend Optimization**
- **In-memory caching** for game state
- **Connection pooling** for database access
- **Async processing** for temporal calculations
- **WebSocket compression** for real-time data

### **Database Optimization**
- **Indexed queries** for game state lookups
- **Batch operations** for turn processing
- **Connection pooling** for concurrent access
- **Query optimization** for temporal data

---

## 🔒 **Security Architecture**

### **API Security**
- **CORS configuration** for cross-origin requests
- **Input validation** on all endpoints
- **Rate limiting** for API calls
- **Authentication** for multiplayer sessions

### **Data Security**
- **SQL injection prevention** with JPA
- **XSS protection** with React sanitization
- **CSRF protection** for state-changing operations
- **Secure WebSocket** connections

---

## 📊 **Monitoring & Observability**

### **Application Metrics**
- **Game session count** and duration
- **API response times** and error rates
- **WebSocket connection** health
- **Database performance** metrics

### **Business Metrics**
- **Player engagement** and retention
- **Game completion** rates
- **Feature usage** statistics
- **Multiplayer session** success rates

---

## 🎯 **Future Architecture Considerations**

### **Scalability**
- **Microservices** architecture for game components
- **Redis** for session management and caching
- **PostgreSQL** for production database
- **Load balancing** for multiplayer servers

### **Deployment**
- **Docker** containers for consistent deployment
- **Kubernetes** for orchestration
- **CI/CD** pipeline for automated testing
- **Monitoring** and alerting systems

---

*This architecture provides a solid foundation for a modern, scalable, and maintainable strategy game with innovative temporal mechanics.* 🏗️⚔️ 