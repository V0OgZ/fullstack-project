# 🎮 Heroes of Time - Revolutionary Temporal Strategy Game

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.x-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-2.7.18-green.svg)](https://spring.io/projects/spring-boot)
[![Languages](https://img.shields.io/badge/Languages-FR%20%7C%20EN-green.svg)](https://github.com/V0OgZ/heroes-of-time)

> **Where strategy meets spacetime** - A revolutionary turn-based strategy game featuring **unified dual scenarios**: Classic conquest and mystical temporal warfare with magical objects.

## 🌟 Revolutionary Dual-Scenario System

### 🏰 **Classic Conquest Scenario**
- **Traditional Heroes gameplay** with modern hexagonal interface
- **Castle conquest** and resource management
- **Turn-based strategy** with immediate action execution
- **Hero development** and unit recruitment

### 🔮 **Mystical Conquest Scenario** 
- **Same unified interface** as Classic mode
- **+ Magical Inventory System** with 30+ enchanted objects
- **+ Temporal Objects** integrated naturally on the map
- **+ Advanced magic mechanics** and artifact collection

### 🎯 **One Interface, Two Experiences**
Both scenarios share the **exact same game interface** but offer completely different strategic depth:
- **Classic**: Focus on territorial control and traditional Heroes mechanics
- **Mystical**: Add magical objects, temporal artifacts, and advanced inventory management

## 🌍 **Full Multilingual Support (FR/EN)**

**Heroes of Time** features **complete internationalization**:
- **🇫🇷 French**: Native interface with full translations
- **🇬🇧 English**: Complete English localization
- **Persistent language preference** saved automatically
- **80+ translated UI elements** for seamless experience

```typescript
// Dynamic language switching
const { t, setLanguage } = useTranslation();
console.log(t('gameTitle')); // "Heroes of Time" | "Heroes of Time"
setLanguage('fr'); // Switch to French instantly
```

## 🎒 **Magical Objects System (30+ Items)**

### ⚔️ **Weapons Collection**
- **Épée du Novice** → **Excalibur** (Common to Legendary)
- **Bâton de l'Archimage** - Legendary staff (+10 Spell Power)

### 🛡️ **Armor & Protection** 
- **Armure de Cuir** → **Écailles de Dragon** (Basic to Epic)
- **Cuirasse des Titans** - Ultimate defense with spell immunity

### ⏰ **Temporal Objects** (Mystical Mode Only)
- **Ancre Temporelle** - Create temporal savepoints
- **Prisme Temporel** - Reveal future enemy actions
- **Sablier Éternel** - Manipulate time itself
- **Boussole Temporelle** - Detect temporal anomalies

### 💍 **Magical Accessories**
- **Anneau de Pouvoir** - Increase spell effectiveness
- **Bottes de Célérité** - Enhanced movement speed
- **Cape d'Invisibilité** - Stealth mechanics

### 🧪 **Consumables & Resources**
- **Potions** for health and mana restoration
- **Scrolls** for instant teleportation
- **Experience Elixirs** for rapid hero development

## 🚀 Quick Start

### Prerequisites
- **Node.js** 16+ and npm
- **Java 17+** (SDKMAN recommended)
- **Maven** 3.6+

### Installation

```bash
# Clone Heroes of Time
git clone https://github.com/V0OgZ/heroes-of-time.git
cd heroes-of-time

# Backend (Terminal 1) - Spring Boot API
cd backend
mvn spring-boot:run

# Frontend (Terminal 2) - React Interface
cd frontend
npm install
npm start
```

### Launch Game
- **Game Interface**: http://localhost:3000
- **Backend API**: http://localhost:8080

## 🎮 Gameplay Modes

### 🏰 **Classic Conquest**
**Traditional Heroes of Might & Magic experience with modern interface:**

- **Hexagonal map rendering** with 60 FPS performance
- **Hero management** with stats progression
- **Resource collection** (Gold, Wood, Stone, Mana)
- **Turn-based combat** with tactical positioning
- **Castle building** and territory expansion

### 🔮 **Mystical Conquest**
**Enhanced magical experience using the same interface:**

- **Everything from Classic mode** +
- **Magic Inventory overlay** with advanced item management
- **Temporal objects** scattered across the map
- **Magical effects** and enchanted weapons
- **Advanced artifact system** with equipment slots
- **Mystical scenarios** with unique challenges

## 🏗️ **Modern Architecture**

### 🖥️ **Backend Intelligence (Spring Boot)**
```java
@RestController
public class GameController {
    // Complete REST API for game logic
    // ZFC calculations for temporal mechanics
    // Combat resolution and validation
    // Resource management systems
}
```

### 🌐 **Frontend Interface (React + TypeScript)**
```typescript
// Unified interface for both scenarios
interface TrueHeroesInterface {
  scenarioType: 'classique' | 'mystique';
  // Same UI components
  // Conditional magic inventory
  // Shared game renderer
}
```

### 🎨 **Canvas Rendering Engine**
- **Hexagonal precision** with mathematical accuracy
- **Real-time animations** at 60 FPS
- **Particle effects** for magical spells
- **Responsive design** for all screen sizes

## 🌟 **Technical Innovation**

### 🔮 **Temporal Zone System (ZFC)**
Advanced spacetime mechanics for mystical scenarios:

```typescript
interface ZoneOfCausality {
  playerId: string;
  radius: number;
  center: Position;
  temporalMana: number;
  conflictZones: Position[];
}
```

### 🗺️ **Procedural Map Generation**
- **Advanced terrain generation** with multiple biomes
- **Strategic resource placement** for balanced gameplay  
- **Hexagonal grid system** with perfect tile alignment
- **Runtime map creation** with infinite variety

### 🎭 **State Management**
```typescript
// Zustand stores for performance
const useGameStore = create<GameStore>(() => ({
  // Immutable state updates
  // Backend synchronization
  // Real-time game state
}));
```

## 📁 **Project Structure**

```
heroes-of-time/
├── 🖥️ backend/               # Spring Boot API
│   ├── GameController.java   # REST endpoints
│   ├── GameService.java      # Business logic
│   └── Position.java         # Game models
├── 🌐 frontend/              # React + TypeScript
│   ├── components/           # UI components
│   │   ├── TrueHeroesInterface.tsx    # Unified game interface
│   │   ├── MagicInventory.tsx         # Magical items system
│   │   └── ModernGameRenderer.tsx     # Canvas rendering
│   ├── store/                # State management
│   ├── services/             # API integration
│   ├── data/                 # Game data
│   │   └── magicObjects.ts   # 30+ magical items
│   ├── i18n/                 # Internationalization
│   └── utils/                # Map generators
└── 📚 docs/                  # Documentation
    ├── ARCHITECTURE.md       # Technical documentation
    └── README.md            # This file
```

## 🎯 **Key Features**

### ✨ **Unified Dual Experience**
- **One codebase, two games** - Revolutionary architecture
- **Seamless transition** between Classic and Mystical modes
- **Shared progression** - Heroes carry over between scenarios
- **Consistent UI/UX** - No learning curve when switching modes

### 🌍 **Complete Internationalization**
- **Native French support** with full translations
- **Professional English localization** 
- **Instant language switching** with persistent preferences
- **Cultural adaptation** for both audiences

### 🎨 **Modern Technical Stack**
- **React 18** with TypeScript for type safety
- **Spring Boot 2.7** for robust backend API
- **Canvas rendering** for 60 FPS performance
- **Zustand state management** for reactive updates
- **Responsive design** for desktop and tablet

### 🔧 **Developer Experience**
- **Hot reload** development with <2s refresh
- **TypeScript** for compile-time error catching
- **Clean architecture** with separation of concerns
- **Comprehensive documentation** for contributors

## 📊 **Performance Metrics**

| Metric | Value |
|--------|-------|
| **Build Time** | ~30 seconds |
| **Hot Reload** | <2 seconds |
| **API Response** | <100ms (local) |
| **Map Generation** | <500ms |
| **Rendering** | 60 FPS stable |

## 🚀 **Future Roadmap**

### 🗄️ **Database Integration**
- **PostgreSQL** for game persistence
- **Redis** for session caching
- **Player profiles** and progression tracking

### 🌐 **Multiplayer Enhancement**
- **WebSocket** real-time communication
- **Game rooms** for multiple sessions
- **Spectator mode** for observers

### 🤖 **AI & Automation**
- **AI opponents** with different difficulty levels
- **Smart tutorials** for new players
- **Automated tournaments** and ranking systems

## 📚 **Documentation**

- [**Technical Architecture**](ARCHITECTURE.md) - Complete system documentation
- [**Game Specification**](HEROES_REFORGED_COMPLETE_SPEC.md) - Feature breakdown
- [**Contributing Guide**](CONTRIBUTING.md) - Development guidelines
- [**Game Analysis**](GAME_ANALYSIS_AND_IMPROVEMENTS.md) - Design philosophy

## 🤝 **Contributing**

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup
```bash
# Development workflow
git clone https://github.com/V0OgZ/heroes-of-time.git
cd heroes-of-time

# Start both services
npm run dev:backend    # Spring Boot on :8080
npm run dev:frontend   # React on :3000
```

## 📄 **License**

MIT License - See [LICENSE](LICENSE) for details.

## 🔗 **Links**

- **Repository**: https://github.com/V0OgZ/heroes-of-time
- **Issues**: https://github.com/V0OgZ/heroes-of-time/issues
- **Discussions**: https://github.com/V0OgZ/heroes-of-time/discussions
- **Releases**: https://github.com/V0OgZ/heroes-of-time/releases

## 🌟 **The Vision**

**Heroes of Time** represents a new paradigm in strategy gaming:

🎮 **One Interface, Multiple Experiences** - Revolutionary dual-scenario architecture  
🌍 **Global Accessibility** - Native FR/EN support for worldwide audience  
⚔️ **Classic Meets Modern** - Traditional Heroes gameplay with cutting-edge tech  
🔮 **Mystical Innovation** - Temporal mechanics and magical object systems  
🎨 **Technical Excellence** - 60 FPS canvas rendering with TypeScript safety  

> **"Not just a game - a new way to think about strategy gaming architecture"**

---

**Made with ⚡ passion and ☕ coffee by [V0OgZ](https://github.com/V0OgZ)**

*"Where strategy meets spacetime - Heroes of Time awaits"* ⏰✨ 
