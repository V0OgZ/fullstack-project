# DEVELOPER INSTRUCTIONS - Heroes of Time Project

## 🚨 CURRENT STATE (JANUARY 2025)

### ✅ MAJOR UI IMPROVEMENTS COMPLETED!
- **Interface Polish**: Removed useless AI button, improved button design
- **End Turn Button**: Fixed functionality with fantasy ⭐ icon
- **Tooltips System**: Completely overhauled both game and demo tooltips
- **Arthur Hero**: Fixed mapping to use noble paladin.png image
- **Internationalization**: Added complete i18n system for demo tooltips (FR/EN/RU)
- **Demo Experience**: Smooth animations, proper timing, professional appearance

### 🎮 WORKING FEATURES

#### ✅ Fully Functional:
- **Solo Gameplay**: Classic Conquest scenario working perfectly
- **Hero Management**: Cycling, selection, positioning
- **Interface Panels**: Heroes, Inventory, Castle panels with dynamic content
- **Turn System**: End turn functionality stable
- **Demo System**: Automated Playwright demos with beautiful tooltips
- **Asset System**: Hero images with proper fallbacks

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

# Quick demo test
cd frontend && npx playwright test tests/e2e/gameplay-demo.spec.ts --headed

# API health check
curl http://localhost:8080/api/scenarios/all
```

### 🏗️ Project Architecture

#### Backend (Spring Boot - Port 8080):
- **Database**: H2 in-memory
- **Controllers**: Scenario, Game, Multiplayer, AI, ZFC, MagicItem
- **Services**: Complete business logic layer
- **Repository**: JPA entities for all game objects

#### Frontend (React TypeScript - Port 3000):
- **Main Interface**: `TrueHeroesInterface.tsx` (modern, polished)
- **Game Renderer**: `ModernGameRenderer.tsx` with hero images
- **State Management**: Zustand store in `useGameStore.ts`
- **Internationalization**: Complete i18n system with 3 languages
- **Testing**: Comprehensive Playwright E2E tests

### 🎯 Key Components

#### Game Interface (`TrueHeroesInterface.tsx`):
- **Right Panel System**: Dynamic content (scenario/hero/inventory/castle)
- **Header Controls**: Clean button design with hover effects
- **Hero Cycling**: Smart hero selection and map centering
- **Resource Display**: Gold, wood, stone with proper formatting

#### Asset System:
- **Hero Images**: PNG assets with emoji fallbacks
- **Mapping Logic**: Smart hero-to-image matching
- **Preloading**: Efficient image loading with error handling

#### Tooltip Systems:
- **Game Tooltips**: Positioned above tiles, clean appearance
- **Demo Tooltips**: Beautiful gradient design with header branding
- **Internationalized**: Full translation support

### 🚀 Quick Start Development

```bash
# 1. Start the application
./start-app.sh
# Opens frontend (http://localhost:3000) and backend (http://localhost:8080)

# 2. Test the gameplay
cd frontend
npx playwright test tests/e2e/gameplay-demo.spec.ts --headed

# 3. Manual testing
# - Open http://localhost:3000
# - Select "Classic Conquest" scenario
# - Click "Play" to start game
# - Test hero cycling, panels, end turn

# 4. API testing
curl http://localhost:8080/api/scenarios/all
curl http://localhost:8080/actuator/health
```

### 🛠️ Development Notes

#### When Adding New Features:
1. **Check existing components** - Don't recreate what exists
2. **Follow naming conventions** - CamelCase for components
3. **Update i18n** - Add translation keys for new text
4. **Test thoroughly** - Use existing Playwright tests
5. **Maintain asset system** - Follow hero image patterns

#### Common Issues & Solutions:
- **Tooltip positioning**: Use absolute positioning, not fixed center
- **Hero images**: Check HERO_ASSETS mapping in gameAssets.ts
- **State management**: Use useGameStore for all game state
- **API calls**: Follow existing patterns in api.ts service

#### File Structure:
```
frontend/
├── src/
│   ├── components/          # React components
│   │   ├── TrueHeroesInterface.tsx  # Main game interface
│   │   └── ModernGameRenderer.tsx   # Map rendering
│   ├── constants/           # Asset mappings
│   ├── i18n/               # Internationalization
│   ├── services/           # API communication
│   ├── store/              # State management
│   └── types/              # TypeScript definitions
├── tests/e2e/              # Playwright tests
└── public/assets/          # Static assets
```

### 📊 Testing Strategy

#### E2E Tests (Playwright):
- **gameplay-demo.spec.ts**: Complete gameplay demonstration
- **multiplayer-demo.spec.ts**: Multiplayer session testing
- **Automated**: Run with `npm run test:playwright`

#### Manual Testing Checklist:
- [ ] Scenario selection works
- [ ] Game loads correctly
- [ ] Hero cycling functions
- [ ] Panel switching works
- [ ] End turn completes
- [ ] Tooltips display properly
- [ ] Images load with fallbacks

### 🎨 UI/UX Guidelines

#### Button Design:
- **No borders**: Clean, modern appearance
- **Hover effects**: Subtle glow and elevation
- **Icons only**: No text labels for header buttons
- **Fantasy theme**: Gold colors, medieval feeling

#### Tooltip Philosophy:
- **Game tooltips**: Positioned relative to content
- **Demo tooltips**: Fixed position with branding
- **No animations**: Clean appear/disappear
- **Internationalized**: Support multiple languages

### 🌍 Internationalization

#### Adding New Text:
1. Add key to `frontend/src/i18n/index.ts` interface
2. Add translations for FR/EN/RU
3. Use `useTranslation()` hook in components
4. Follow pattern: `t('key.name')`

#### Demo Tooltips:
- Special system for automated demos
- Structured translation keys (`demo.welcome`, etc.)
- Can be switched to different languages

---

## 📋 Quick Reference

### Essential Commands:
```bash
./start-app.sh          # Start development
./stop-app.sh           # Stop everything  
./run-all-tests.sh      # Run all tests
cd frontend && npx playwright test --headed  # Visual tests
```

### Important URLs:
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:8080
- **Health Check**: http://localhost:8080/actuator/health
- **Scenarios API**: http://localhost:8080/api/scenarios/all

### Key Files to Know:
- `TrueHeroesInterface.tsx` - Main game interface
- `useGameStore.ts` - Game state management
- `gameAssets.ts` - Hero image mappings
- `i18n/index.ts` - All translations
- `gameplay-demo.spec.ts` - Main demo test

---

*Last Updated: January 2025 - After major UI polish and tooltip system overhaul* 