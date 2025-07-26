# 🔧 Technical Documentation - Heroes of Time

## 🏗️ Architecture Overview

Heroes of Time is built with a **modern full-stack architecture** designed for scalability and real-time multiplayer gameplay.

### Technology Stack

#### Backend - Spring Boot
- **Framework:** Spring Boot 2.7.18
- **Language:** Java 17
- **Database:** H2 (development) / PostgreSQL (production)  
- **WebSocket:** STOMP over SockJS for real-time communication
- **Testing:** JUnit 5, Mockito
- **Build Tool:** Maven
- **Port:** 8080

#### Frontend - React TypeScript
- **Framework:** React 18 with TypeScript
- **State Management:** Zustand
- **Styling:** CSS Modules + Custom CSS
- **WebSocket:** STOMP.js client
- **Testing:** Jest, React Testing Library, Playwright
- **Build Tool:** Create React App
- **Port:** 3000

## 📁 Project Structure

### Backend Structure
```
backend/
├── src/main/java/com/example/demo/
│   ├── controller/           # REST API Controllers
│   │   ├── GameController.java
│   │   ├── MultiplayerController.java
│   │   ├── AIController.java
│   │   ├── BuildingController.java
│   │   └── 🆕 EpicContentController.java
│   ├── service/             # Business Logic Layer
│   │   ├── GameService.java
│   │   ├── BuildingService.java
│   │   ├── AIService.java
│   │   ├── MultiplayerService.java
│   │   └── ScenarioService.java
│   ├── model/               # JPA Entities
│   │   ├── GameSession.java
│   │   ├── Building.java
│   │   ├── AIPlayer.java
│   │   └── Scenario.java
│   ├── repository/          # Data Access Layer
│   │   ├── GameSessionRepository.java
│   │   └── ...
│   └── resources/           # Static Resources
│       ├── 🆕 epic-heroes.json
│       ├── 🆕 epic-creatures.json
│       └── scenarios/
```

### Frontend Structure
```
frontend/
├── src/
│   ├── components/          # React Components
│   │   ├── TrueHeroesInterface.tsx
│   │   ├── ModernGameRenderer.tsx
│   │   ├── CastleManagementPanel.tsx
│   │   └── 🆕 EpicContentViewer.tsx
│   ├── services/            # API Services
│   │   ├── api.ts
│   │   ├── gameService.ts
│   │   ├── 🆕 epicContentAPI.ts
│   │   └── 🆕 buildingImageService.ts
│   ├── store/               # State Management
│   │   └── useGameStore.ts
│   ├── constants/           # Static Data
│   │   ├── 🆕 epicCreatures.ts
│   │   └── 🆕 epicHeroes.ts
│   └── tests/e2e/           # End-to-End Tests
│       ├── gameplay-demo.spec.ts
│       └── 🆕 epic-content-demo.spec.ts
├── public/
│   └── assets/              # Static Assets
│       ├── 🆕 creatures/    # SVG creature sprites
│       ├── 🆕 heroes/       # SVG hero portraits
│       └── 🆕 buildings/    # SVG building images
```

## 🆕 Epic Content System

### Architecture
The Epic Content System provides a rich library of heroes, creatures, and buildings with a clean separation between backend data and frontend presentation.

#### Backend Components
- **EpicContentController.java**: REST API endpoints for epic content
- **epic-heroes.json**: Hero data with stats, abilities, and backstories
- **epic-creatures.json**: Creature data with combat stats and special abilities

#### Frontend Components
- **epicContentAPI.ts**: TypeScript service for API communication
- **EpicContentViewer.tsx**: React component for browsing epic content
- **buildingImageService.ts**: Canvas-based image generation for buildings

#### API Endpoints
```typescript
GET /api/epic/heroes              // All epic heroes
GET /api/epic/creatures           // All epic creatures
GET /api/epic/heroes/{id}         // Specific hero
GET /api/epic/creatures/{id}      // Specific creature
GET /api/epic/heroes/race/{race}  // Heroes by race
GET /api/epic/creatures/race/{race} // Creatures by race
```

#### Data Models
```typescript
interface EpicHero {
  id: string;
  name: string;
  race: string;
  class: string;
  level: number;
  stats: {
    attack: number;
    defense: number;
    spellPower: number;
    knowledge: number;
    morale: number;
    luck: number;
  };
  specialAbility: string;
  ultimateSkill: string;
  backstory: string;
  portraitUrl: string;
}

interface EpicCreature {
  id: string;
  name: string;
  race: string;
  tier: number;
  health: number;
  attack: number;
  defense: number;
  speed: number;
  damage: [number, number];
  special: string;
  spriteUrl: string;
}
```

### Integration
The Epic Content System integrates seamlessly with the main game interface through:
- **Button Integration**: 🐉 button in the main game header
- **Modal Interface**: Full-screen overlay for browsing content
- **Asset Loading**: Dynamic SVG loading with fallback generation
- **API Integration**: Real-time data fetching from backend

### Testing
```bash
# Run epic content demo
./run-epic-demo.sh

# Manual testing
cd frontend
npx playwright test tests/e2e/epic-content-demo.spec.ts --headed
```

## 🔌 API Documentation

### Core Game Endpoints

#### Game Management
```
GET    /api/games/{gameId}              # Get game state
POST   /api/games                       # Create new game
POST   /api/games/{gameId}/join         # Join game
GET    /api/games/available             # List available games
POST   /api/games/{gameId}/end-turn     # End current turn
```

#### Hero Actions
```
POST   /api/heroes/{heroId}/move        # Move hero
POST   /api/heroes/{heroId}/attack      # Attack target
POST   /api/heroes/{heroId}/collect     # Collect resource
```

#### Building System
```
GET    /api/games/{gameId}/players/{playerId}/buildings    # Get player buildings
POST   /api/games/{gameId}/buildings/construct            # Construct building
POST   /api/games/{gameId}/buildings/{buildingId}/upgrade # Upgrade building
POST   /api/games/{gameId}/buildings/{buildingId}/recruit # Recruit units
```

#### Multiplayer
```
GET    /api/multiplayer/sessions        # List multiplayer sessions
POST   /api/multiplayer/sessions        # Create session
POST   /api/multiplayer/sessions/{id}/join    # Join session
```

### WebSocket Events

#### Connection
```
CONNECT    /ws                          # WebSocket connection
SUBSCRIBE  /topic/session/{sessionId}   # Subscribe to session updates
SEND       /app/game.action             # Send game action
```

#### Message Types
```javascript
// Join session
{
  type: "PLAYER_JOINED",
  playerId: "player-123",
  session: { ... }
}

// Game action
{
  type: "GAME_ACTION", 
  playerId: "player-123",
  actionType: "MOVE_HERO",
  actionData: { ... },
  result: { ... }
}
```

## 🎮 Game Systems

### State Management (Frontend)
```typescript
// Zustand store structure
interface GameStore {
  // Game state
  currentGame: Game | null;
  gameMap: HexTile[][];
  selectedHero: Hero | null;
  
  // Actions
  loadGame: (gameId: string) => void;
  moveHero: (heroId: string, position: Position) => void;
  endTurn: () => void;
  
  // Magic system
  playerInventory: MagicObject[];
  equippedItems: Record<string, MagicObject>;
  equipItem: (item: MagicObject) => void;
}
```

### Database Schema (Backend)

#### Core Entities
```sql
-- Game Sessions
CREATE TABLE game_sessions (
    id BIGINT PRIMARY KEY,
    session_id VARCHAR(255) UNIQUE,
    name VARCHAR(255),
    status VARCHAR(50),
    max_players INTEGER,
    current_players INTEGER,
    created_at TIMESTAMP
);

-- Buildings
CREATE TABLE buildings (
    id VARCHAR(255) PRIMARY KEY,
    castle_id VARCHAR(255),
    player_id VARCHAR(255),
    building_type VARCHAR(100),
    level INTEGER,
    construction_time INTEGER,
    is_constructed BOOLEAN
);

-- AI Players
CREATE TABLE ai_players (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255),
    difficulty VARCHAR(50),
    personality VARCHAR(50),
    game_id VARCHAR(255)
);
```

## 🧪 Testing Strategy

### Backend Testing
```java
// Example test structure
@SpringBootTest
@AutoConfigureTestDatabase
class GameControllerTest {
    
    @Autowired
    private TestRestTemplate restTemplate;
    
    @Test
    void shouldCreateGame() {
        // Test game creation
    }
    
    @Test
    void shouldMoveHero() {
        // Test hero movement
    }
}
```

### Frontend Testing
```typescript
// Jest unit tests
describe('GameStore', () => {
  test('should load game correctly', () => {
    // Test state management
  });
});

// Cypress E2E tests
describe('Solo Gameplay', () => {
  it('should display game selector', () => {
    cy.visit('/');
    cy.contains('🎮 Heroes of Time 🎮').should('be.visible');
  });
});
```

## 🚀 Deployment

### Development Environment
```bash
# Start backend
cd backend && mvn spring-boot:run

# Start frontend  
cd frontend && npm start
```

### Production Build
```bash
# Build frontend
cd frontend && npm run build

# Build backend JAR
cd backend && mvn clean package -DskipTests
```

### Docker Deployment
```dockerfile
# Multi-stage build for production
FROM node:16 AS frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

FROM openjdk:17-jdk-slim
WORKDIR /app
COPY backend/target/*.jar app.jar
COPY --from=frontend-build /app/frontend/build ./static
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]
```

## 🔧 Configuration

### Backend Configuration (application.properties)
```properties
# Database
spring.datasource.url=jdbc:h2:mem:testdb
spring.h2.console.enabled=true

# WebSocket
spring.websocket.sockjs.enabled=true

# CORS
cors.allowed.origins=http://localhost:3000
```

### Frontend Configuration (package.json)
```json
{
  "proxy": "http://localhost:8080",
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "cypress": "cypress open"
  }
}
```

## 🐛 Troubleshooting

### Common Issues

#### Backend won't start
```bash
# Check Java version
java -version

# Clean and rebuild
mvn clean install
```

#### Frontend compilation errors
```bash
# Clear node modules
rm -rf node_modules package-lock.json
npm install
```

#### WebSocket connection issues
```bash
# Check CORS configuration
# Verify WebSocket endpoint: ws://localhost:8080/ws
```

## 📈 Performance Considerations

### Backend Optimization
- **Database indexing** on frequently queried fields
- **Connection pooling** for database connections
- **Caching** for static game data
- **Async processing** for long-running operations

### Frontend Optimization
- **Code splitting** for large components
- **Memoization** for expensive calculations
- **Virtual scrolling** for large lists
- **Image optimization** for game assets

## 🐞 Known Issues & Debugging

A persistent and difficult-to-trace bug was causing the frontend to spam the backend with thousands of `POST /api/games` requests, leading to a backend crash and the game getting stuck on the "Loading..." screen.

### Root Cause: React `useEffect` Infinite Loops

The primary cause was a series of `useEffect` hooks that created infinite re-render loops. This happened in multiple components (`Game.tsx`, `TrueHeroesInterface.tsx`, `EnhancedScenarioSelector.tsx`) where a `useEffect` hook had a dependency on a function (e.g., `loadGame`) that was redefined on every render.

**Example of the faulty pattern:**
```javascript
// This creates an infinite loop because `loadGame` is a new function on every render
useEffect(() => {
  loadGame(scenarioId);
}, [scenarioId, loadGame]);
```

### Solution: Correct `useEffect` Dependencies

The issue was resolved by removing the function from the dependency array and adding an `eslint-disable-next-line` comment to acknowledge the intentional omission. This ensures the effect only runs when the `scenarioId` (or other relevant data) changes.

**Corrected pattern:**
```javascript
useEffect(() => {
  loadGame(scenarioId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [scenarioId]);
```

Additionally, responsibility for loading game data was centralized into the top-level `Game.tsx` component to prevent child components from re-triggering the load process. Several `setInterval` calls that were polling the API too frequently were also disabled to improve stability.

---

For more detailed information, see the individual component documentation in the `docs/` directory. 

## 8. WebSocket Communication

WebSocket support for real-time multiplayer features is in development. The current implementation uses HTTP polling for stability.

## 9. Terrain & Vision System

### 9.1 Terrain Rendering

The game uses a bitmask-based system for intelligent terrain sprite selection:

- **Hex Bitmask Calculation** (`utils/hexBitmask.ts`): Computes a 6-bit mask representing which neighboring hexes share the same terrain type
- **Sprite Mapping** (`constants/terrainSprites.ts`): Maps bitmask values to appropriate edge/center sprites
- **Fallback System**: If sprites fail to load, falls back to gradient-based color rendering

### 9.2 Movement Visualization

Two types of movement ranges are displayed when a hero is selected:

- **Immediate Range (Green)**: Tiles reachable within the current turn (based on movement points)
- **Projection Range (Blue)**: Tiles reachable in future turns (ZFC projection, typically 2x movement points)

### 9.3 Fog of War

The vision system implements three visibility states:

1. **Visible** (Clear): Currently within vision range of player's units
2. **Explored** (55% opacity black): Previously seen but no longer in vision
3. **Unknown** (85% opacity black): Never explored by the player

Vision updates are triggered:
- When the game loads
- After hero movement
- When switching players (hot-seat mode)

### 9.4 Implementation Details

```typescript
// Vision calculation in useGameStore
updateVision: (playerId: string) => {
  // Marks tiles within radius 4 of each hero as visible
  // Preserves explored state for previously seen tiles
}

// Rendering in ModernGameRenderer
- Terrain sprites attempted first via createPattern()
- Movement highlights rendered as overlay
- Fog of war applied last to ensure it covers all content
```

## Appendix: Technology Stack 