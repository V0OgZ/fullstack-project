# INSTRUCTIONS POUR TOI - Debugging Scenario Loading

## 🚨 ARRÊTE DE RECRÉER DES TRUCS!

### Scripts Existants (NE PAS RECRÉER):
- `start-app.sh` - Démarre backend + frontend (EXISTAIT DÉJÀ!)
- `stop-app.sh` - Arrête tout (EXISTAIT DÉJÀ!)
- `test-app.sh` - Lance tous les tests (EXISTAIT DÉJÀ!)
- `run-all-tests.sh` - Tests complets (EXISTAIT DÉJÀ!)
- `run-quick-tests.sh` - Tests rapides (EXISTAIT DÉJÀ!)
- `debug-scenario-loading.sh` - Debug persistant
- `TEST_SCRIPTS_README.md` - Documentation complète des scripts (EXISTAIT DÉJÀ!)

### Utilisation:
```bash
# Démarrer les serveurs (SCRIPT EXISTANT!)
./start-app.sh

# Arrêter les serveurs (SCRIPT EXISTANT!)
./stop-app.sh

# Tests complets (SCRIPT EXISTANT!)
./run-all-tests.sh

# Debugger les problèmes
./debug-scenario-loading.sh
```

## 🔧 Problème Actuel: Scenario Loading

### Ce qui a été fixé:
1. ✅ Backend crash (exit code 137) - Maven wrapper créé
2. ✅ Frontend utilisait hardcoded scenarios - EnhancedScenarioSelector maintenant appelle l'API backend
3. ✅ EnhancedScenarioSelector appelle ApiService.getAllScenarios() → /api/scenarios/all
4. ✅ Correction mapping des données backend (scenarioId vs id, maxPlayers vs playerCount)
5. ✅ Suppression des anciens composants (ScenarioSelector.tsx, ScenarioSelector.css)

### État actuel:
- Backend: Running on :8080 ✅
- Frontend: Running on :3000 ✅  
- API: Retourne 3 scenarios ✅
- Component: EnhancedScenarioSelector avec belle UI + backend API ✅

### Si ça marche toujours pas:

1. **Vérifier browser console:**
   - Ouvrir http://localhost:3000
   - F12 → Console tab
   - Chercher erreurs JavaScript

2. **Vérifier Network tab:**
   - F12 → Network tab
   - Recharger page
   - Chercher requête vers /api/scenarios/all
   - Vérifier si elle échoue

3. **Vérifier composant:**
   - ScenarioSelector doit être utilisé (pas EnhancedScenarioSelector)
   - Doit appeler ApiService.getAllScenarios()
   - Doit afficher les scenarios du backend

## 🐛 Debug Commands:

```bash
# Test backend direct
curl http://localhost:8080/api/scenarios/all

# Test si frontend charge
curl http://localhost:3000

# Vérifier processus
lsof -i:8080  # Backend
lsof -i:3000  # Frontend

# Logs backend
# Regarder terminal où ./start-dev.sh tourne
```

## 🚫 NE PAS FAIRE:
- ❌ Recréer les scripts existants
- ❌ Créer des tests temporaires
- ❌ Supprimer/recréer des fichiers de debug
- ❌ Changer les composants sans vérifier d'abord

## ✅ À FAIRE:
- ✅ Utiliser les scripts existants
- ✅ Vérifier browser console AVANT tout
- ✅ Tester l'API backend directement
- ✅ Vérifier que ScenarioSelector est utilisé
- ✅ Regarder les logs existants

## 📝 Notes:
- Backend utilise Spring Boot + H2 database
- Frontend utilise React + TypeScript
- API endpoint: `/api/scenarios/all`
- Component: `ScenarioSelector.tsx` (pas Enhanced...)
- Hibernate logs montrent que la DB fonctionne

## 🎯 Prochaines étapes:
1. Vérifier si ScenarioSelector s'affiche dans le browser
2. Vérifier console errors
3. Vérifier Network requests
4. Si tout est OK mais ça charge pas → problème de state management React 

## 🧪 Processus de Tests
Toujours suivre ces étapes avant de merger des changements:
1. **Build the project:** Run `./start-app.sh` to build and start backend/frontend.
2. **Fix errors:** Check logs/backend.log and logs/frontend.log for errors. Fix any compilation or runtime errors.
3. **Run tests:** cd frontend && npx playwright test --ui to run tests in interactive UI mode with single browser. 