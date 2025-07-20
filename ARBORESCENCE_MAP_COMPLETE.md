# 🗺️ ARBORESCENCE MAP COMPLÈTE - HEROES OF TIME
*Pour ne pas se perdre dans le projet*

## 📁 STRUCTURE PRINCIPALE

```
Heroes-of-Time/
│
├── 📝 RAPPORTS & DOCUMENTATION (Racine)
│   ├── ARCHITECTURE_COMPREHENSION_OPUS.md - Architecture backend
│   ├── MEMOIRE_TRAVAIL_CLAUDE_CAUSALITY_WALL.md - Vision Jean + implémentations
│   ├── RAPPORT_VINCE_VEGA_FORMULES_SCENARIOS.md - Audit formules
│   ├── RAPPORT_TESTS_ET_SCRIPTS_2025_07_20.md - État des tests
│   └── STATUT_FORMULES_SYSTEMES_2025_07_20.md - Statut systèmes
│
├── 🎮 SCÉNARIOS .HOTS
│   └── game_assets/scenarios/
│       └── hots/
│           ├── oeil_de_wigner_scenario.hots - 👁️ L'Œil de Wigner
│           ├── epic-arthur-vs-ragnar.hots - ⚔️ Combat épique
│           ├── quantum_interference_example.hots
│           └── bataille_temporelle_setup.hots
│
├── 🧪 SCRIPTS DE TEST
│   ├── scripts/
│   │   ├── test-causality-wall.sh - 🌀 Test mur de causalité
│   │   ├── test-vision-temporelle.sh - 🔮 Test vision futur
│   │   └── test/
│   │       ├── test-backend-conformity.sh
│   │       ├── test-complet-final.sh - 🏆 Test final complet
│   │       └── test-scenarios-ui.sh
│   │
│   ├── hots - 🎯 Script principal de contrôle
│   └── test-artifacts-hybrid.sh - Test système hybride
│
├── 💾 BACKEND JAVA
│   └── backend/src/main/java/com/heroesoftimepoc/temporalengine/
│       ├── service/
│       │   ├── TemporalEngineService.java - 🎯 Moteur principal
│       │   ├── ArtifactEffectExecutor.java - 🔧 Effets artefacts
│       │   ├── DynamicFormulaParser.java - 📊 Parser formules
│       │   ├── CausalityZoneService.java - 🌀 Zones causales
│       │   ├── CausalCollapseService.java - 💥 Collapse causal
│       │   └── GrofiCausalIntegrationService.java - 🌐 GROFI
│       │
│       └── model/
│           ├── Hero.java - 🦸 Héros avec temps individuel
│           ├── Game.java - 🎮 État du jeu
│           └── PsiState.java - 🌊 États quantiques
│
├── 📋 FICHIERS JSON
│   └── backend/src/main/resources/
│       ├── custom-artifacts.json - ✅ Formules parsées
│       ├── temporal-artifacts-advanced.json - ✅ Formules avancées
│       ├── quantum-artifacts.json - ❌ amplitudeFormula inutiles
│       │
│       └── heroes/
│           ├── grofi/
│           │   ├── JeanGrofignon.json - 🧘 Formules GROFI
│           │   ├── VinceVega.json - 🔫 Formules spéciales
│           │   └── TheDude.json - 🎳 Formules zen
│           │
│           └── legendary/
│               ├── Arthur.json
│               └── Ragnar.json
│
├── 🌐 FRONTENDS
│   ├── frontend/ - Interface principale (port 8000)
│   ├── frontend-temporal/ - Interface temporelle (port 5174)
│   ├── quantum-visualizer/ - Visualiseur quantique (port 8001)
│   └── dashboard.html - Dashboard unifié (port 9000)
│
└── 📚 DOCUMENTATION
    └── docs/
        ├── temporal/ - Docs temporelles
        ├── GROFI/ - Système GROFI
        └── items/ - Artefacts et formules

## 🔍 FICHIERS CLÉS À RETENIR

### 🧠 Mémoire & Rapports
- `MEMOIRE_TRAVAIL_CLAUDE_CAUSALITY_WALL.md` - Ma mémoire de travail
- `RAPPORT_VINCE_VEGA_FORMULES_SCENARIOS.md` - Audit des formules

### 🎯 Scénarios Importants
- `oeil_de_wigner_scenario.hots` - Scénario complet avec Arthur
- `epic-arthur-vs-ragnar.hots` - Combat temporel

### 🔧 Code Backend Critique
- `TemporalEngineService.java` → `moveGameHero()` - Mur de causalité
- `ArtifactEffectExecutor.java` → `executeMagicSpyglass()` - Vision futur
- `DynamicFormulaParser.java` - Parse les formules JSON

### 📊 JSON avec Vraies Formules
- `custom-artifacts.json` - CONSTRUCTIVE, DESTRUCTIVE, etc.
- `temporal-artifacts-advanced.json` - Formules complexes

### 🧪 Tests Principaux
- `./hots test final` - Test complet
- `./scripts/test-causality-wall.sh` - Test mur causalité
- `./scripts/test-vision-temporelle.sh` - Test vision temporelle

## 🎯 NAVIGATION RAPIDE

### Pour tester le mur de causalité:
```bash
./scripts/test-causality-wall.sh
```

### Pour voir tous les tests:
```bash
./hots test list
```

### Pour lancer le test final:
```bash
./hots test final
```

### Pour voir les formules parsées:
```bash
cat backend/src/main/resources/custom-artifacts.json | jq
```

### Pour voir les scénarios:
```bash
ls -la game_assets/scenarios/hots/
```

## 🚨 ZONES À NETTOYER

1. **quantum-artifacts.json** - `amplitudeFormula` inutiles
2. **game_assets/scenarios/visualizer/** - Formules décoratives
3. **docs/items/** - Mix de vraies et fausses formules

## 💡 PROCHAINES ÉTAPES

1. Nettoyer les JSON (supprimer les fakes)
2. Implémenter parser GROFI (Σ, †, Ω, ↯)
3. Connecter immunités aux collapses
4. Server load → collapse automatique 