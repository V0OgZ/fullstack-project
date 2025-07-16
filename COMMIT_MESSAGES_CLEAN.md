# MESSAGES DE COMMIT PROPRES (SANS CARACTÈRES SPÉCIAUX)

## PROBLÈME IDENTIFIÉ
Les messages de commit avec emojis et caractères spéciaux peuvent faire bugger certaines consoles.

## SOLUTION: MESSAGES PROPRES

### Pour ce commit (système de tests):
```bash
git add .
git commit -m "Refactor: Playwright testing system with headless automation and visual demos

- Configure headless automated tests (mute audio, disable GPU, fast execution)
- Preserve visual demos with original configurations (fullscreen + side-by-side)
- Integrate GameScriptEngine with Playwright for scripted game testing  
- Add complete-game-turns test simulating 2 full turns
- Add hybrid UI + scripting validation tests
- Create run-tests.sh for automated testing
- Create run-demos.sh for visual demonstrations
- Maintain all existing test functionality
- Fix multiplayer demo positioning (640x700 at 0,0 and 650,0)"
```

### Messages de commit standards:
```bash
# Backend
git commit -m "feat: Add new API endpoint for hero management"
git commit -m "fix: Resolve multiplayer session timeout issue"
git commit -m "refactor: Improve game state management"

# Frontend  
git commit -m "feat: Add new hero selection interface"
git commit -m "fix: Resolve canvas rendering issues"
git commit -m "style: Update UI components styling"

# Tests
git commit -m "test: Add comprehensive E2E test suite"
git commit -m "test: Fix flaky hero movement tests"
git commit -m "test: Add backend API integration tests"

# Documentation
git commit -m "docs: Update README with new features"
git commit -m "docs: Add technical architecture documentation"
```

## CONSEILS POUR ÉVITER LES PROBLÈMES:

### 1. Utiliser des préfixes standards:
- `feat:` pour les nouvelles fonctionnalités
- `fix:` pour les corrections de bugs
- `refactor:` pour le refactoring
- `test:` pour les tests
- `docs:` pour la documentation
- `style:` pour le styling
- `perf:` pour les optimisations

### 2. Éviter complètement:
- Emojis (🎮, ✅, 🚀, etc.)
- Caractères spéciaux (⚔️, 🏰, ⭐, etc.)
- Caractères Unicode non-ASCII
- Symboles fantaisistes

### 3. Structure recommandée:
```
type(scope): description courte

Description détaillée si nécessaire
- Point 1
- Point 2
- Point 3
```

### 4. Exemple concret pour notre commit:
```bash
git commit -m "refactor(tests): Separate automated tests from visual demos

- Add headless automated testing with optimized performance
- Preserve original visual demo configurations
- Integrate GameScriptEngine with Playwright testing
- Add complete game turn simulation tests
- Create separate scripts for tests vs demos"
```

## COMMANDE POUR CORRIGER UN COMMIT RÉCENT:
```bash
# Si tu viens de faire un commit avec caractères bizarres:
git commit --amend -m "Message propre sans caractères spéciaux"
```

## CONFIGURATION GIT POUR ÉVITER LES PROBLÈMES:
```bash
git config --global core.quotepath false
git config --global core.precomposeunicode true
git config --global core.autocrlf false
``` 