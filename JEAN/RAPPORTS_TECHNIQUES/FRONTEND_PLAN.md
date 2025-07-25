# 🎨 Heroes of Time - Plan Frontend Simple

**Objectif** : Créer une interface utilisateur simple et fonctionnelle pour le moteur temporel Heroes of Time

---

## 🎯 VISION GÉNÉRALE

### Interface Cible
- **Style** : Interface web moderne et épurée
- **Technologie** : React avec TypeScript
- **Design** : Minimaliste mais fonctionnel
- **Responsive** : Adaptable desktop/mobile
- **Thème** : Médiéval fantastique avec touches temporelles

### Fonctionnalités Principales
1. **Visualisation** de la carte hexagonale
2. **Gestion** des héros et leurs actions
3. **Interface** pour les scripts temporels
4. **Affichage** des ψ-states et timelines
5. **Monitoring** des conflits et résolutions

---

## 🏗️ ARCHITECTURE TECHNIQUE

### Stack Technologique
```
Frontend (Port 3000)
├── React 18+ (TypeScript)
├── Vite (Build tool)
├── Tailwind CSS (Styling)
├── Lucide React (Icons)
├── Axios (API calls)
└── Zustand (State management)

Backend (Port 8080)
└── Spring Boot API (existant)
```

### Structure des Dossiers
```
frontend/
├── src/
│   ├── components/
│   │   ├── Game/
│   │   │   ├── GameBoard.tsx
│   │   │   ├── HeroPanel.tsx
│   │   │   ├── ScriptEditor.tsx
│   │   │   └── TimelineView.tsx
│   │   ├── UI/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   └── Modal.tsx
│   │   └── Layout/
│   │       ├── Header.tsx
│   │       ├── Sidebar.tsx
│   │       └── Footer.tsx
│   ├── hooks/
│   │   ├── useGame.ts
│   │   ├── useHeroes.ts
│   │   └── useScripts.ts
│   ├── services/
│   │   ├── api.ts
│   │   ├── gameService.ts
│   │   └── scriptService.ts
│   ├── stores/
│   │   ├── gameStore.ts
│   │   └── uiStore.ts
│   ├── types/
│   │   ├── game.ts
│   │   ├── hero.ts
│   │   └── script.ts
│   └── utils/
│       ├── helpers.ts
│       └── constants.ts
├── public/
│   ├── assets/
│   │   ├── heroes/
│   │   ├── artifacts/
│   │   └── icons/
│   └── index.html
├── package.json
├── vite.config.ts
└── tailwind.config.js
```

---

## 🎮 COMPOSANTS PRINCIPAUX

### 1. **GameBoard** - Carte Hexagonale
```typescript
interface GameBoardProps {
  width: number;
  height: number;
  tiles: GameTile[];
  heroes: Hero[];
  psiStates: PsiState[];
  onTileClick: (x: number, y: number) => void;
}
```

**Fonctionnalités** :
- Affichage grille hexagonale
- Positionnement des héros
- Visualisation des ψ-states (zones floues)
- Zones de conflit temporel (surbrillance rouge)
- Artefacts et structures

### 2. **HeroPanel** - Gestion des Héros
```typescript
interface HeroPanelProps {
  heroes: Hero[];
  selectedHero: Hero | null;
  onHeroSelect: (hero: Hero) => void;
  onHeroAction: (action: HeroAction) => void;
}
```

**Fonctionnalités** :
- Liste des héros disponibles
- Statistiques et état actuel
- Actions disponibles (mouvement, combat, etc.)
- Inventaire d'artefacts temporels

### 3. **ScriptEditor** - Interface de Script
```typescript
interface ScriptEditorProps {
  script: string;
  onScriptChange: (script: string) => void;
  onExecute: () => void;
  suggestions: string[];
}
```

**Fonctionnalités** :
- Éditeur de texte avec coloration syntaxique
- Autocomplétion pour les commandes temporelles
- Validation en temps réel
- Historique des scripts exécutés

### 4. **TimelineView** - Visualisation Temporelle
```typescript
interface TimelineViewProps {
  timelines: Timeline[];
  psiStates: PsiState[];
  currentTurn: number;
  onTimelineSelect: (timeline: Timeline) => void;
}
```

**Fonctionnalités** :
- Ligne de temps interactive
- Branches temporelles (ℬ1, ℬ2, etc.)
- États ψ futurs et passés
- Triggers d'observation actifs

---

## 🎨 DESIGN SYSTEM

### Palette de Couleurs
```css
:root {
  /* Couleurs principales */
  --primary: #8B5A2B;      /* Brun médiéval */
  --secondary: #FFD700;    /* Or */
  --accent: #4A90E2;       /* Bleu temporel */
  
  /* États temporels */
  --psi-state: #9370DB;    /* Violet pour ψ-states */
  --collapsed: #DC143C;    /* Rouge pour collapse */
  --timeline: #32CD32;     /* Vert pour timelines */
  
  /* Interface */
  --background: #1A1A1A;   /* Fond sombre */
  --surface: #2D2D2D;      /* Cartes */
  --text: #FFFFFF;         /* Texte principal */
  --muted: #888888;        /* Texte secondaire */
}
```

### Composants UI
```typescript
// Bouton avec style temporel
<Button 
  variant="temporal" 
  icon={<Clock />}
  onClick={handleTimeAction}
>
  Créer ψ-state
</Button>

// Carte avec effet de lueur
<Card 
  className="glow-effect" 
  variant="artifact"
>
  <ArtifactDisplay artifact={avantWorldBlade} />
</Card>
```

---

## 🔄 FLUX DE DONNÉES

### State Management avec Zustand
```typescript
// Game Store
interface GameState {
  currentGame: Game | null;
  heroes: Hero[];
  psiStates: PsiState[];
  timelines: Timeline[];
  
  // Actions
  createGame: (name: string) => void;
  joinGame: (gameId: string) => void;
  executeScript: (script: string) => void;
  nextTurn: () => void;
}

// UI Store
interface UIState {
  selectedHero: Hero | null;
  selectedTile: Tile | null;
  showScriptEditor: boolean;
  showTimelineView: boolean;
  
  // Actions
  selectHero: (hero: Hero) => void;
  toggleScriptEditor: () => void;
  showNotification: (message: string) => void;
}
```

### API Integration
```typescript
// Service API
class GameService {
  async createGame(name: string): Promise<Game> {
    return api.post('/games', { gameName: name, playerId: 'player1' });
  }
  
  async executeScript(gameId: string, script: string): Promise<void> {
    return api.post(`/games/${gameId}/script`, { script });
  }
  
  async getGameState(gameId: string): Promise<GameState> {
    return api.get(`/games/${gameId}/state`);
  }
}
```

---

## 📱 INTERFACES UTILISATEUR

### 1. **Écran Principal**
```
┌─────────────────────────────────────────────────────────────┐
│ [Heroes of Time] 🕰️                    [⚙️] [❓] [👤]      │
├─────────────────────────────────────────────────────────────┤
│ ┌─────────────────────┐ ┌─────────────────────────────────┐ │
│ │   HERO PANEL        │ │        GAME BOARD              │ │
│ │                     │ │                                │ │
│ │ 🧙 Arthur           │ │     ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡           │ │
│ │ HP: 100/100         │ │    ⬡ ⬡ 🧙 ⬡ ⬡ ⬡ ⬡ ⬡          │ │
│ │ MP: 50/50           │ │   ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡         │ │
│ │                     │ │  ⬡ ⬡ ⬡ ψ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡        │ │
│ │ ⚔️ Ragnar           │ │ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡       │ │
│ │ HP: 120/120         │ │  ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡        │ │
│ │ MP: 30/30           │ │   ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡         │ │
│ │                     │ │    ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡          │ │
│ │ [Move] [Attack]     │ │     ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡           │ │
│ │ [Script] [Items]    │ │                                │ │
│ └─────────────────────┘ └─────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ SCRIPT EDITOR                                           │ │
│ │ > ψ001: ⊙(Δt+2 @15,15 ⟶ MOV(HERO, Arthur, @15,15))   │ │
│ │ > †ψ001                                    [Execute]   │ │
│ └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### 2. **Vue Timeline**
```
┌─────────────────────────────────────────────────────────────┐
│ TIMELINE VIEW                                    [Close X] │
├─────────────────────────────────────────────────────────────┤
│ Turn 1    Turn 2    Turn 3    Turn 4    Turn 5             │
│   │         │         │         │         │                │
│   ●─────────●─────────●─────────●─────────●                │
│   │         │      ψ001│         │         │                │
│   │         │        ↓ │         │         │                │
│   │         │      †ψ001         │         │                │
│   │         │         │         │         │                │
│ ℬ1│       ℬ2│         │         │         │                │
│   ●─────────●─────────●─────────●─────────●                │
│   │         │         │         │         │                │
│   │         │      ψ002│         │         │                │
│   │         │        ↓ │         │         │                │
│   │         │      Active        │         │                │
└─────────────────────────────────────────────────────────────┘
```

---

## 🚀 PLAN DE DÉVELOPPEMENT

### Phase 1 : Setup et Base (2-3 jours)
- ✅ Configuration Vite + React + TypeScript
- ✅ Installation des dépendances
- ✅ Structure des dossiers
- ✅ Configuration Tailwind CSS
- ✅ Composants UI de base

### Phase 2 : Composants Core (3-4 jours)
- ✅ GameBoard avec grille hexagonale
- ✅ HeroPanel avec gestion des héros
- ✅ Intégration API backend
- ✅ State management avec Zustand
- ✅ Routing et navigation

### Phase 3 : Fonctionnalités Temporelles (4-5 jours)
- ✅ ScriptEditor avec coloration syntaxique
- ✅ Visualisation des ψ-states
- ✅ TimelineView interactive
- ✅ Gestion des conflits temporels
- ✅ Notifications en temps réel

### Phase 4 : Polish et Tests (2-3 jours)
- ✅ Animations et transitions
- ✅ Responsive design
- ✅ Tests unitaires
- ✅ Optimisations performance
- ✅ Documentation

### Phase 5 : Déploiement (1 jour)
- ✅ Build de production
- ✅ Configuration serveur
- ✅ Tests end-to-end
- ✅ Déploiement

---

## 🛠️ COMMANDES DE DÉVELOPPEMENT

### Installation
```bash
# Créer le projet React
npm create vite@latest frontend -- --template react-ts
cd frontend

# Installer les dépendances
npm install axios zustand lucide-react
npm install -D tailwindcss @types/node

# Configurer Tailwind
npx tailwindcss init -p
```

### Développement
```bash
# Démarrer le serveur de développement
npm run dev

# Build de production
npm run build

# Tests
npm run test

# Linting
npm run lint
```

---

## 📊 MÉTRIQUES DE SUCCÈS

### Performance
- **Temps de chargement** : < 2s
- **Temps de réponse** : < 100ms pour les actions
- **Taille du bundle** : < 1MB
- **Score Lighthouse** : > 90

### Fonctionnalités
- **Toutes les API** intégrées
- **Scripts temporels** exécutables
- **Visualisation** complète des ψ-states
- **Interface responsive** sur tous les écrans

### Expérience Utilisateur
- **Navigation intuitive** sans formation
- **Feedback visuel** pour toutes les actions
- **Gestion d'erreurs** claire
- **Accessibilité** conforme WCAG

---

## 🎯 PROCHAINES ÉTAPES IMMÉDIATES

1. **Créer le projet** Vite + React + TypeScript
2. **Configurer** l'environnement de développement
3. **Implémenter** les composants de base
4. **Intégrer** l'API backend existante
5. **Tester** avec les scripts de simulation

---

*Plan Frontend Heroes of Time - Prêt pour développement*

**Status : ✅ READY TO START**