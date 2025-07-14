# DEVELOPER INSTRUCTIONS - Heroes of Time Project

## 🚨 CURRENT STATE (JANUARY 2025)

### ✅ MAJOR IMPROVEMENTS COMPLETED!
- **🌍 MULTILINGUAL SUPPORT**: Complete internationalization with FR/EN/RU language switching
- **Interface Polish**: Removed useless AI button, improved button design
- **Dynamic Titles**: Browser title changes based on context (Castle, Inventory, Hero name, Map name)
- **End Turn Button**: Fixed functionality with fantasy ⭐ icon
- **Demo Route**: Added `/demo` for quick testing without scenario selection
- **Tooltips System**: Completely overhauled both game and demo tooltips (English)
- **Arthur Hero**: Fixed mapping to use noble paladin.png image
- **Playwright Positioning**: Perfect side-by-side window placement for multiplayer tests
- **Demo Experience**: Smooth animations, proper timing, professional appearance

### 🎮 WORKING FEATURES

#### ✅ Fully Functional:
- **🌍 Multilingual Interface**: Complete FR/EN/RU support with language selector
- **Solo Gameplay**: Classic Conquest scenario working perfectly
- **Hero Management**: Cycling, selection, positioning with real images
- **Interface Panels**: Heroes, Inventory, Castle panels with dynamic content
- **Turn System**: End turn functionality stable
- **Demo System**: Automated Playwright demos with beautiful English tooltips
- **Asset System**: Hero images with proper fallbacks
- **Dynamic Titles**: Browser title reflects current game context

#### ✅ Backend API:
- **Scenarios**: `/api/scenarios/all` fully operational
- **Game Sessions**: Creation and management working
- **Hero Data**: Real hero data with proper assets
- **H2 Database**: In-memory database functioning

### 🔧 Essential Scripts

```bash
# Start development environment (MAIN COMMAND)
./start-app.sh

# Stop all services
./stop-app.sh

# Run complete test suite
./run-all-tests.sh

# Quick demo tests
cd frontend && npx playwright test tests/e2e/gameplay-demo.spec.ts --headed --project=solo-fullscreen
cd frontend && npx playwright test tests/e2e/multiplayer-demo.spec.ts --headed --project=multiplayer
cd frontend && npx playwright test tests/e2e/demo-route.spec.ts --headed --project=demo

# API health check
curl http://localhost:8080/api/scenarios/all
```

### 🌍 MULTILINGUAL SYSTEM

#### **Complete Language Support:**
- **French (FR)**: Français complet
- **English (EN)**: Full English support  
- **Russian (RU)**: Полная поддержка русского языка

#### **Language Switching:**
- **UI Selector**: Top-right corner flags (🇫🇷 FR | 🇺🇸 EN | 🇷🇺 RU)
- **Demo Tooltips**: Automatically translated
- **Game Interface**: All panels and buttons translated
- **Test System**: English tooltips for consistency

#### **Adding New Languages:**
1. Add language to `frontend/src/i18n/index.ts`
2. Add flag icon to language selector
3. Translate all interface strings
4. Update demo tooltips if needed

### 🏗️ Project Architecture

#### Backend (Spring Boot - Port 8080):
```
backend/
├── src/main/java/com/example/demo/
│   ├── controller/          # REST endpoints
│   ├── service/            # Business logic
│   ├── model/              # Data entities
│   └── repository/         # Data access
└── src/main/resources/
    ├── application.properties
    └── scenarios/          # JSON scenario files
```

#### Frontend (React TypeScript - Port 3000):
```
frontend/
├── src/
│   ├── components/          # React components
│   │   ├── TrueHeroesInterface.tsx  # Main game interface ⭐
│   │   ├── ModernGameRenderer.tsx   # Map rendering
│   │   └── LanguageSelector.tsx     # Language switching 🌍
│   ├── constants/           # Asset mappings
│   ├── i18n/               # Internationalization 🌍
│   ├── services/           # API communication
│   ├── store/              # State management
│   └── types/              # TypeScript definitions
├── tests/e2e/              # Playwright tests
└── public/assets/          # Static assets (hero images)
```

### 🚀 Quick Routes for Testing

#### **Demo Route**: `http://localhost:3000/demo`
- **Purpose**: Skip scenario selection, jump directly to game
- **Scenario**: Automatically loads "conquest-classic"
- **Usage**: Perfect for quick testing and development

#### **Main Routes**:
- `/` - Scenario selection (multilingual)
- `/game/:scenarioId` - Game interface
- `/multiplayer` - Multiplayer setup
- `/demo` - Quick game access ⭐

### 📊 Testing Strategy (Enhanced)

#### **Playwright Projects**:
- **`solo-fullscreen`**: Single window, maximized (1280x800)
- **`multiplayer`**: Dual windows, side-by-side positioning
  - Player 1: Position (20,100) - Size 620x850
  - Player 2: Position (660,100) - Size 620x850
- **`demo`**: Quick demo route testing

#### **E2E Tests**:
```bash
# Solo gameplay with English tooltips
npx playwright test tests/e2e/gameplay-demo.spec.ts --headed --project=solo-fullscreen

# Multiplayer with perfect window positioning
npx playwright test tests/e2e/multiplayer-demo.spec.ts --headed --project=multiplayer

# Demo route testing
npx playwright test tests/e2e/demo-route.spec.ts --headed --project=demo
```

#### **Test Features**:
- ✅ **English Tooltips**: All demo tooltips in English
- ✅ **Perfect Positioning**: No window overlap on Mac 1280x800
- ✅ **Complex Actions**: Panel navigation, hero selection, movements
- ✅ **Multiplayer Session**: 2-player connection and gameplay
- ✅ **Statistics Verification**: Gold, turns, game state

### 🎨 UI/UX Guidelines

#### **Dynamic Title System**:
- **Context Aware**: Title changes based on current panel
- **"Heroes of Time - Castle"** when in Castle panel
- **"Heroes of Time - [Hero Name]"** when hero selected
- **"Heroes of Time - [Map Name]"** when in game
- **"Heroes of Time"** as fallback

#### **Button Design**:
- **No borders**: Clean, modern appearance
- **Hover effects**: Subtle glow and elevation
- **Icons only**: No text labels for header buttons (⚔️🏰🎒)
- **Fantasy theme**: Gold colors, medieval feeling

#### **Tooltip Philosophy**:
- **Game tooltips**: Positioned relative to content
- **Demo tooltips**: Fixed position with branding
- **No jarring animations**: Clean appear/disappear
- **English for tests**: Consistency in automated demos

### 🌍 Internationalization System

#### **Translation Structure**:
```typescript
// frontend/src/i18n/index.ts
export const translations = {
  fr: {
    'game.heroes': 'Héros',
    'game.castle': 'Château',
    'game.inventory': 'Inventaire',
    'demo.welcome': '🏠 Bienvenue dans Heroes of Time !',
    // ... more translations
  },
  en: {
    'game.heroes': 'Heroes',
    'game.castle': 'Castle', 
    'game.inventory': 'Inventory',
    'demo.welcome': '🏠 Welcome to Heroes of Time!',
    // ... more translations
  },
  ru: {
    'game.heroes': 'Герои',
    'game.castle': 'Замок',
    'game.inventory': 'Инвентарь',
    'demo.welcome': '🏠 Добро пожаловать в Heroes of Time!',
    // ... more translations
  }
};
```

#### **Usage in Components**:
```typescript
import { useTranslation } from '../i18n';

const { t } = useTranslation();
return <button>{t('game.heroes')}</button>;
```

### 🛠️ Development Workflow

#### **Adding New Features**:
1. **Check existing components** - Don't recreate what exists
2. **Add translations** - Support all 3 languages (FR/EN/RU)
3. **Follow naming conventions** - CamelCase for components
4. **Test multilingually** - Verify in all language modes
5. **Update dynamic titles** - If adding new contexts
6. **Test with Playwright** - Use existing test patterns

#### **Common Issues & Solutions**:
- **Language switching**: Use LanguageSelector component
- **Missing translations**: Add to all 3 language objects
- **Tooltip positioning**: Use absolute positioning
- **Hero images**: Check HERO_ASSETS mapping in gameAssets.ts
- **State management**: Use useGameStore for all game state
- **Window positioning**: Use separate browser instances for multiplayer

### 📋 Quick Reference

#### **Essential Commands**:
```bash
./start-app.sh          # Start development (with hot reload)
./stop-app.sh           # Stop everything cleanly
./run-all-tests.sh      # Run complete test suite
npx playwright test --headed  # Visual Playwright tests
```

#### **Important URLs**:
- **Frontend**: http://localhost:3000 (with language selector)
- **Demo Route**: http://localhost:3000/demo ⭐
- **Backend**: http://localhost:8080
- **Health Check**: http://localhost:8080/actuator/health
- **Scenarios API**: http://localhost:8080/api/scenarios/all

#### **Key Files to Remember**:
- `TrueHeroesInterface.tsx` - Main game interface with dynamic titles
- `LanguageSelector.tsx` - Language switching component 🌍
- `useGameStore.ts` - Game state management
- `gameAssets.ts` - Hero image mappings
- `i18n/index.ts` - Complete multilingual translations ⭐
- `gameplay-demo.spec.ts` - Solo demo with English tooltips
- `multiplayer-demo.spec.ts` - Dual window demo

#### **Playwright Window Positioning**:
- **Mac 1280x800 optimized**: Perfect side-by-side layout
- **No overlap**: 20px spacing between windows
- **Consistent**: Reproducible positioning every time

---

## 🎯 Current Capabilities Summary

### ✅ **Internationalization**: Complete FR/EN/RU support
### ✅ **Demo System**: English tooltips, perfect window positioning
### ✅ **Dynamic Interface**: Context-aware titles and panels
### ✅ **Testing**: Robust Playwright suite with visual demos
### ✅ **Asset Management**: Hero images with smart fallbacks
### ✅ **Quick Access**: `/demo` route for rapid development

---

*Last Updated: January 2025 - After multilingual system implementation and Playwright positioning optimization* 🌍✨ 