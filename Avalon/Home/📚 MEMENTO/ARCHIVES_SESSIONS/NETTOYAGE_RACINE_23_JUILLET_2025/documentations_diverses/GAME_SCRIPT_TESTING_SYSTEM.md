# 🎮 Heroes of Time - Game Script Testing System

*Système de test complet avec langage de script custom pour tests, simulation et IA*

---

## 📋 Vue d'ensemble

Ce système révolutionnaire combine :
- **Tests API backend complets** avec vérification d'état
- **Langage de script custom** pour décrire les actions de jeu
- **Simulation de jeu complète** par script
- **Tests Playwright automatisés** utilisant les scripts
- **Base solide pour l'IA future**

## 🚀 Utilisation rapide

```bash
# Démarrer les serveurs
./start-app.sh

# Exécuter tous les tests
./test-complete-system.sh

# Ou tests spécifiques
./test-complete-system.sh --backend-only
./test-complete-system.sh --simulation-only
./test-complete-system.sh --playwright-only
```

## 📁 Structure du système

```
📦 Game Script Testing System
├── 🔧 Backend API Tests
│   ├── ⚙️ scripts/test-backend-complete-enhanced.js
│   └── Teste toutes les actions + vérification d'état
├── 🎯 Game Script Engine
│   ├── 🌐 frontend/src/services/gameScriptEngine.ts
│   └── Langage de script custom pour actions
├── 🎲 Game Simulation Tests
│   ├── ⚙️ scripts/game-simulation-tests.js
│   └── Simule des jeux complets avec stratégies
├── 🎭 Playwright Integration
│   ├── 🌐 frontend/🧪 tests/e2e/script-driven-tests.spec.ts
│   └── Tests E2E utilisant le langage de script
└── 📊 Unified Testing
    ├── test-complete-system.sh
    └── Script principal pour tous les tests
```

## 🎯 Langage de script custom

### Syntaxe de base

```typescript
const script: GameScript = {
  name: 'Mon Script',
  description: 'Description du script',
  variables: {
    heroId: 'hero1',
    playerId: 'player1',
    goldTarget: 1000
  },
  actions: [
    {
      type: 'move',
      params: {
        heroId: '$heroId',
        targetPosition: { x: 10, y: 10 }
      }
    },
    {
      type: 'attack',
      params: {
        heroId: '$heroId',
        targetId: 'enemy1'
      }
    },
    {
      type: 'end_turn'
    }
  ]
};
```

### Actions disponibles

| Action | Description | Paramètres |
|--------|-------------|------------|
| `move` | Déplacer un héros | `heroId`, `targetPosition`, `relative` |
| `attack` | Attaquer une cible | `heroId`, `targetId` |
| `build` | Construire un bâtiment | `buildingType`, `position` |
| `recruit` | Recruter des unités | `buildingId`, `unitType`, `quantity` |
| `collect` | Collecter des ressources | `heroId`, `objectId` |
| `end_turn` | Terminer le tour | - |
| `if` | Condition | `condition`, `actions`, `else` |
| `loop` | Boucle | `times`, `while`, `actions` |
| `assert` | Assertion | `condition`, `message` |
| `wait` | Attendre | `duration` |
| `log` | Logger | `message`, `data` |

### Référence aux variables et état

```typescript
// Variables locales
'$heroId'  // Variable définie dans le script

// État du jeu
'@players.0.resources.gold'  // Accès à l'état
'@players.0.heroes.0.position.x'  // Position du héros
'@map.objects.0.id'  // ID du premier objet
```

### Conditions et contrôle de flux

```typescript
// Condition simple
{
  type: 'if',
  condition: {
    type: 'greater',
    left: '@players.0.resources.gold',
    right: 500
  },
  actions: [
    { type: 'build', params: { buildingType: 'barracks' } }
  ]
}

// Boucle
{
  type: 'loop',
  params: { times: 5 },
  actions: [
    { type: 'move', params: { targetPosition: { x: 1, y: 0 }, relative: true } }
  ]
}
```

## 🎯 Exemples de scripts

### Script de combat basique

```typescript
const basicCombat: GameScript = {
  name: 'Basic Combat',
  description: 'Move hero and attack enemy',
  variables: {
    heroId: 'hero1',
    enemyId: 'enemy1'
  },
  actions: [
    {
      type: 'move',
      params: {
        heroId: '$heroId',
        targetPosition: { x: 10, y: 10 }
      }
    },
    {
      type: 'attack',
      params: {
        heroId: '$heroId',
        targetId: '$enemyId'
      }
    }
  ]
};
```

### Script économique

```typescript
const economicStrategy: GameScript = {
  name: 'Economic Strategy',
  description: 'Focus on rapid economic expansion',
  variables: {
    goldThreshold: 1000,
    turnLimit: 10
  },
  actions: [
    {
      type: 'loop',
      params: { times: '$turnLimit' },
      actions: [
        {
          type: 'if',
          condition: {
            type: 'greater',
            left: '@players.0.resources.gold',
            right: 500
          },
          actions: [
            {
              type: 'build',
              params: {
                buildingType: 'mine',
                position: { x: 3, y: 3 }
              }
            }
          ]
        },
        {
          type: 'move',
          params: {
            targetPosition: { x: 1, y: 1 },
            relative: true
          }
        },
        {
          type: 'end_turn'
        }
      ]
    }
  ]
};
```

## 🔧 Tests backend complets

### Fonctionnalités testées

✅ **Actions de base**
- Création de jeu
- Mouvement de héros
- Attaque et combat
- Construction de bâtiments
- Recrutement d'unités
- Fin de tour

✅ **Vérification d'état**
- État avant/après chaque action
- Validation des changements
- Détection des erreurs
- Rapports détaillés

### Exemple de test

```javascript
await tester.testAction('MOVE_HERO', async () => {
  const hero = game.players[0].heroes[0];
  return await ApiService.moveHero(gameId, hero.id, { x: 5, y: 5 });
}, (stateBefore, stateAfter, result) => {
  const heroBefore = stateBefore.players[0].heroes[0];
  const heroAfter = stateAfter.players[0].heroes[0];
  
  if (heroBefore.position.x === heroAfter.position.x) {
    return { success: false, message: 'Hero did not move' };
  }
  
  return { success: true, message: 'Hero moved successfully' };
});
```

## 🎲 Simulation de jeu complète

### Stratégies testées

🏛️ **Stratégie économique**
- Construction de bâtiments économiques
- Expansion rapide des ressources
- Optimisation des revenus

⚔️ **Stratégie militaire**
- Recrutement d'unités
- Attaques coordonnées
- Conquête territoriale

⚖️ **Stratégie équilibrée**
- Approche mixte
- Adaptation selon les tours
- Gestion des priorités

### Métriques et rapports

```json
{
  "timestamp": "2025-01-09T10:30:00Z",
  "gameId": "test-game-123",
  "totalScripts": 6,
  "passedScripts": 5,
  "failedScripts": 1,
  "passRate": 83.3,
  "results": [...]
}
```

## 🎭 Intégration Playwright

### Tests E2E avec scripts

```typescript
test('UI Basic Actions Script', async ({ page }) => {
  const scriptRunner = new PlaywrightScriptRunner(page);
  
  const results = await scriptRunner.executeScriptWithUI(
    PLAYWRIGHT_SCRIPTS.uiBasicActions,
    { playerId: 'player1' }
  );
  
  for (const result of results) {
    expect(result.success).toBe(true);
  }
});
```

### Actions UI supportées

- **Mouvement** : Clic sur héros + clic sur destination
- **Attaque** : Sélection + clic sur ennemi
- **Construction** : Panneau château + placement
- **Recrutement** : Panneau recrutement + sélection
- **Fin de tour** : Clic sur bouton End Turn

## 🤖 Base pour l'IA

### Utilisation future

Le système de script est conçu pour être utilisé par l'IA :

```typescript
// L'IA peut générer des scripts
const aiScript = aiEngine.generateScript(gameState, objective);

// Puis les exécuter
const results = await scriptEngine.executeScript(aiScript, context);

// Et analyser les résultats
const analysis = aiEngine.analyzeResults(results);
```

### Avantages pour l'IA

- **Langage déclaratif** : Facile à générer
- **Validation intégrée** : Vérification automatique
- **Modularité** : Réutilisation des actions
- **Débogage** : Logs détaillés
- **Évolutivité** : Extensible facilement

## 📊 Rapports et métriques

### Rapports générés

1. **Backend API Report** : `test-results/backend-api-report.json`
2. **Simulation Report** : `test-results/game-simulation-report.json`
3. **Playwright Report** : `🌐 frontend/playwright-report/index.html`
4. **Consolidated Report** : `test-results/consolidated-report.md`

### Métriques suivies

- **Taux de réussite** des actions
- **Temps d'exécution** des scripts
- **Changements d'état** détaillés
- **Erreurs et exceptions**
- **Performance** des tests

## 🔧 Configuration et maintenance

### Prérequis

```bash
# Serveurs en cours d'exécution
./start-app.sh

# Dépendances Node.js
npm install -g colors node-fetch
cd frontend && npm install
```

### Customisation

```typescript
// Ajouter une nouvelle action
case 'my_custom_action':
  return await this.executeMyCustomAction(action, context);

// Nouvelle condition
case 'my_condition':
  return this.evaluateMyCondition(condition, context);
```

### Débogage

```bash
# Mode verbeux
VERBOSE=true ./test-complete-system.sh

# Tests spécifiques
./test-complete-system.sh --backend-only
```

## 🎯 Avantages du système

### Pour le développement

- **Détection rapide** des régressions
- **Validation complète** des fonctionnalités
- **Tests reproductibles** et automatisés
- **Couverture exhaustive** des cas d'usage

### Pour l'IA

- **Langage naturel** pour décrire les actions
- **Validation automatique** des stratégies
- **Réutilisation** des composants
- **Évolutivité** pour nouvelles fonctionnalités

### Pour la maintenance

- **Tests unitaires** et d'intégration
- **Rapports détaillés** avec métriques
- **Nettoyage automatique** des anciens tests
- **Documentation** auto-générée

## 🚀 Prochaines étapes

1. **Intégration IA** : Connexion avec système d'IA
2. **Optimisation** : Amélioration des performances
3. **Extension** : Nouvelles actions et conditions
4. **Monitoring** : Surveillance en temps réel
5. **Déploiement** : Tests en environnement de production

---

## 💡 Conclusion

Ce système révolutionnaire combine :
- **Tests robustes** avec vérification d'état
- **Langage de script expressif** et extensible
- **Simulation complète** de jeux
- **Intégration E2E** avec Playwright
- **Base solide** pour l'IA future

**Résultat** : Un système de test complet, rapide et évolutif qui identifie instantanément ce qui fonctionne et ce qui reste à implémenter, tout en servant de fondation pour le développement de l'IA.

🎉 **Le système est prêt pour une utilisation en production !** 