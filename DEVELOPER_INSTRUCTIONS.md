# 🎮 Heroes of Time - Instructions pour Développeurs

## 📋 État Actuel du Projet (Janvier 2025)

### ✅ **CORRECTIONS RÉCENTES APPLIQUÉES**

#### 🔧 **Correction de l'erreur "Not your turn"**
- **Problème** : L'API `endTurn` retournait une erreur 400 avec `{"error":"Not your turn"}`
- **Cause** : Le `GameState` n'initialisait pas correctement le `currentPlayerId`
- **Solution** :
  - Modifié `GameStateService.getOrCreateGameState()` pour initialiser `currentPlayerId` avec `"player1"`
  - Ajouté la synchronisation du `currentPlayer` avec le `currentPlayerId` dans `GameService.getGame()`
- **Statut** : ✅ **CORRIGÉ**

#### 🌍 **Améliorations du Système Multilingue**
- **Problème** : Les tests de démonstration n'utilisaient pas la langue sauvegardée
- **Solution** :
  - Créé un fichier utilitaire `frontend/tests/e2e/utils/translations.ts`
  - Les tests lisent maintenant la langue depuis `localStorage` (clé: `'heroes-reforged-i18n'`)
  - Ajouté les traductions EN/RU pour tous les tooltips de démonstration
- **Fonctionnalités** :
  - ✅ Persistance automatique de la langue choisie
  - ✅ 3 langues supportées : FR, EN, RU
  - ✅ Plus de 1800 lignes de traductions
  - ✅ Tests de démonstration multilingues
- **Statut** : ✅ **COMPLÈTEMENT FONCTIONNEL**

### 🎯 **Statut Global du Projet**
- **Backend** : Spring Boot (Java) sur port 8080 - ✅ STABLE
- **Frontend** : React TypeScript sur port 3000 - ✅ INTERFACE MODERNE
- **Base de données** : H2 en mémoire - ✅ FONCTIONNELLE
- **Tests** : Playwright E2E - ✅ DÉMONSTRATIONS MULTILINGUES

## 🚀 **Scripts Essentiels**

### Démarrage Rapide
```bash
./start-app.sh    # Démarre backend + frontend
./stop-app.sh     # Arrête tous les services
./test-app.sh     # Tests rapides
```

### Tests de Démonstration
```bash
cd frontend
npx playwright test tests/e2e/01-single-demo.spec.ts --headed    # Démo solo
npx playwright test tests/e2e/02-multiplayer-demo.spec.ts --headed  # Démo multijoueur
```

## 🌍 **Système Multilingue**

### Configuration
- **Store** : `useI18n` avec `zustand` + `persist`
- **Clé localStorage** : `'heroes-reforged-i18n'`
- **Langues** : FR (défaut), EN, RU
- **Fichier** : `frontend/src/i18n/index.ts`

### Utilisation
```typescript
import { useTranslation } from '../i18n';

const { t, language, setLanguage } = useTranslation();
return <button>{t('endTurn')}</button>;
```

### Tests Multilingues
```typescript
import { getTooltipText } from './utils/translations';

// Lit automatiquement la langue depuis localStorage
const tooltip = getTooltipText('demo.welcome');
```

## 🎮 **Interface Principale (TrueHeroesInterface.tsx)**

### Système de Panneaux
- **Panneau Droit** : Contenu dynamique (scenario/hero/inventory/castle)
- **Boutons Header** : Design poli sans bordures, icônes fantasy
- **Système de Héros** : Rotation, sélection, images réelles avec fallbacks
- **Système de Tours** : Bouton "End Turn" avec icône ⭐ - STABLE

### Fonctionnalités
- ✅ Gameplay solo complètement fonctionnel
- ✅ Gestion des héros avec images réelles
- ✅ Panneaux dynamiques avec changement de contenu
- ✅ Système de tooltips internationalisé
- ✅ UI polie sans éléments inutiles
- ✅ Système de tours stable et flux de jeu

## 🔧 **Architecture Technique**

### Backend (Port 8080)
```
Spring Boot + H2 Database
├── Controllers: Scenario, Game, Multiplayer, AI
├── Services: Couche logique métier
├── Repository: Entités JPA
└── GameStateService: Gestion de l'état critique
```

### Frontend (Port 3000)
```
React TypeScript
├── TrueHeroesInterface.tsx (interface principale)
├── ModernGameRenderer.tsx (rendu de carte)
├── useGameStore.ts (gestion d'état)
├── i18n/ (internationalisation)
└── tests/e2e/ (tests de démonstration)
```

## 🧪 **Tests et Démonstrations**

### Tests E2E Playwright
- **01-single-demo.spec.ts** : Démonstration solo
- **02-multiplayer-demo.spec.ts** : Démonstration multijoueur
- **gameplay-demo.spec.ts** : Démonstration avec tooltips dynamiques

### Tooltips Dynamiques
- Basés sur l'état réel de l'interface
- Attendent le chargement des éléments
- Affichent les vrais états de chargement
- Style adapté et animations fluides

## 📝 **Workflow de Développement**

### Démarrage
1. `./start-app.sh` - Démarre l'environnement de développement
2. Ouvrir http://localhost:3000 - Tester l'UI manuellement
3. `cd frontend && npx playwright test --headed` - Tests visuels

### Vérifications
- Consulter `DEVELOPER_INSTRUCTIONS.md` pour l'état actuel
- Utiliser les scripts existants (ne pas recréer)
- Suivre les patterns établis
- Tester avec les démonstrations Playwright

## 🔍 **Débogage**

### Erreurs Courantes
- **"Not your turn"** : ✅ Corrigé - `currentPlayerId` initialisé correctement
- **Tests qui échouent** : Vérifier que l'application est démarrée
- **Langue non sauvegardée** : ✅ Corrigé - Persistance automatique

### Logs
```bash
tail -f logs/backend.log    # Logs backend
tail -f logs/frontend.log   # Logs frontend
```

## 🎯 **Capacités Actuelles**

### ✅ Fonctionnalités Complètes
- Gameplay solo entièrement fonctionnel
- Gestion des héros avec images réelles
- Panneaux dynamiques avec changement de contenu
- Système de tooltips internationalisé
- Système de tours stable
- Démonstrations automatisées multilingues

### 🚧 En Développement
- Mode multijoueur (infrastructure présente)
- Système de combat avancé
- Gestion des châteaux étendue

## 🚨 **Rappels Importants**

### ⚠️ **À NE JAMAIS FAIRE**
- Recréer les fonctionnalités existantes
- Ignorer `DEVELOPER_INSTRUCTIONS.md`
- Modifier sans tester avec Playwright
- Casser les patterns UI/UX établis

### ✅ **Toujours Faire**
- Lire `DEVELOPER_INSTRUCTIONS.md` en premier
- Utiliser les scripts existants
- Suivre les patterns établis
- Tester avec les démonstrations avant de committer

---

**Dernière mise à jour** : Janvier 2025
**Statut** : ✅ ENTIÈREMENT FONCTIONNEL avec corrections appliquées 