# INSTRUCTIONS POUR TOI - Heroes of Time Project

## 🚨 SCRIPTS AMÉLIORÉS - HOT RELOAD FRIENDLY!

### Scripts Principaux (AMÉLIORÉS):
- `./start-app.sh` - Démarre backend + frontend **avec hot reload** (AMÉLIORÉ!)
- `./stop-app.sh` - Arrête tout proprement (EXISTANT)
- `./run-playwright-tests.sh` - Tests Playwright headless **NOUVEAU!**
- `./run-all-tests.sh` - Tests complets (EXISTANT)
- `./debug-scenario-loading.sh` - Debug persistant (EXISTANT)

### 🔥 NOUVEAU: Hot Reload Sans Blocage!

```bash
# Démarrer avec hot reload en terminaux séparés (RECOMMANDÉ)
./start-app.sh

# Tests Playwright headless (pas de navigateurs ouverts)
./run-playwright-tests.sh

# Tests avec rapport HTML
./run-playwright-tests.sh --report

# Arrêter les services
./stop-app.sh
```

### 🖥️ Comment ça marche maintenant:

#### Mode Interactif (Recommandé):
- **Backend**: S'ouvre dans un terminal séparé avec hot reload
- **Frontend**: S'ouvre dans un terminal séparé avec hot reload
- **Avantages**: Aucun blocage, logs en temps réel, hot reload fonctionnel

#### Mode Background (pour CI/CD):
- Processus en arrière-plan avec logs dans `logs/`
- Utilisé automatiquement en mode non-interactif

### 🎭 Tests Playwright:
- **Mode headless**: Aucun navigateur ouvert
- **Tests automatiques**: Tous les scénarios testés
- **Rapport HTML**: Disponible avec `--report`
- **Nettoyage automatique**: Processus fermés à la fin

## 🔧 Problème Résolu: Hot Reload

### ✅ Ce qui a été fixé:
1. **Hot reload bloqué** - Maintenant fonctionne parfaitement
2. **Processus zombies** - Nettoyage automatique amélioré
3. **Logs invisibles** - Terminaux séparés pour voir en temps réel
4. **Tests avec navigateurs** - Mode headless par défaut

### État actuel:
- **Backend**: ✅ Spring Boot avec hot reload
- **Frontend**: ✅ React avec hot reload rapide
- **Tests**: ✅ Playwright headless automatique
- **Nettoyage**: ✅ Processus correctement fermés

## 🚀 Utilisation Recommandée:

### Pour développer:
```bash
# 1. Démarrer les services (terminaux séparés)
./start-app.sh

# 2. Développer normalement - hot reload actif!
# Les changements se rechargent automatiquement

# 3. Tester rapidement
./run-playwright-tests.sh

# 4. Arrêter quand terminé
./stop-app.sh
```

### Pour tests complets:
```bash
# Tests avec rapport détaillé
./run-playwright-tests.sh --report

# Voir le rapport dans: frontend/test-results/playwright-report/
```

## 🐛 Debug Commands:

```bash
# Test backend direct
curl http://localhost:8080/api/scenarios/all

# Test frontend
curl http://localhost:3000

# Vérifier processus
lsof -i:8080  # Backend
lsof -i:3000  # Frontend

# Voir logs en temps réel (si mode background)
tail -f logs/backend.log
tail -f logs/frontend.log
```

## 💡 Conseils d'utilisation:

### Hot Reload qui marche:
- ✅ Utilise `./start-app.sh` pour les terminaux séparés
- ✅ Garde les terminaux ouverts pour voir les logs
- ✅ Les changements se rechargent automatiquement
- ✅ Pas besoin de redémarrer manuellement

### Tests automatiques:
- ✅ `./run-playwright-tests.sh` pour tests rapides
- ✅ Aucun navigateur ne s'ouvre
- ✅ Résultats en mode texte
- ✅ Rapport HTML disponible avec `--report`

### Arrêt propre:
- ✅ `./stop-app.sh` nettoie tout
- ✅ Ou ferme simplement les terminaux
- ✅ Pas de processus zombies

## 🚫 NE PAS FAIRE:
- ❌ Recréer les scripts (ils sont maintenant optimisés)
- ❌ Tuer les processus manuellement (utilise ./stop-app.sh)
- ❌ Redémarrer pour chaque changement (hot reload actif)
- ❌ Ouvrir manuellement des navigateurs pour les tests

## ✅ À FAIRE:
- ✅ Utiliser `./start-app.sh` pour démarrer
- ✅ Laisser les terminaux ouverts pour voir les logs
- ✅ Utiliser `./run-playwright-tests.sh` pour tests
- ✅ Développer normalement avec hot reload
- ✅ Arrêter proprement avec `./stop-app.sh`

## 📝 Notes Techniques:
- **Backend**: Spring Boot DevTools activé
- **Frontend**: React Fast Refresh activé
- **Terminaux**: Détection automatique (macOS/Linux)
- **Ports**: 8080 (backend), 3000 (frontend)
- **Logs**: `logs/backend.log`, `logs/frontend.log`
- **Tests**: Mode headless par défaut

## 🎯 Prochaines étapes:
1. Lancer `./start-app.sh` pour démarrer les services
2. Développer avec hot reload actif
3. Tester avec `./run-playwright-tests.sh`
4. Arrêter avec `./stop-app.sh` quand terminé

## 🎮 Gameplay Test:
1. **Démarrer**: `./start-app.sh`
2. **Naviguer**: http://localhost:3000
3. **Tester**: Sélection de scénarios, gameplay
4. **Automatiser**: `./run-playwright-tests.sh`

---

**🔥 NOUVEAU**: Hot reload fonctionne maintenant parfaitement!
**🎭 NOUVEAU**: Tests Playwright headless automatiques!
**⚡ AMÉLIORÉ**: Terminaux séparés pour un développement fluide! 