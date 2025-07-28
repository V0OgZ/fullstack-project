# Tests de Debug Sauvegardés

Ce répertoire contient des tests de debug utiles sauvegardés avec l'extension `.txt` pour qu'ils ne soient pas exécutés automatiquement.

## 📋 Tests disponibles :

### `debug-hero-movement.spec.txt`
- **Objectif** : Tester le mouvement du héros avec logs détaillés
- **Utilité** : Débugger les problèmes de mouvement et API backend
- **Logs** : Capture les logs de console pour voir les appels API
- **Sélection héros** : Teste différents sélecteurs pour trouver les héros

### `debug-simple-demo.spec.txt`
- **Objectif** : Test de démonstration simple sans tooltips
- **Utilité** : Tester le gameplay de base sans complications
- **Couverture** : Navigation, sélection scénario, héros, carte, château, fin de tour
- **Stabilité** : Version stable du test principal

## 🔧 Comment utiliser :

1. **Pour réactiver un test** :
   ```bash
   cp 🧪 tests/e2e/debug-hero-movement.spec.txt 🧪 tests/e2e/debug-hero-movement.spec.ts
   npx playwright test 🧪 tests/e2e/debug-hero-movement.spec.ts --project=demo --headed
   ```

2. **Pour modifier un test** :
   - Éditer le fichier `.txt`
   - Le copier vers `.spec.ts` quand prêt à tester

## 📝 Notes :

- Ces tests ont été créés pour débugger des problèmes spécifiques
- Ils contiennent des logs détaillés utiles pour le diagnostic
- Ils sont complémentaires aux tests principaux du projet
- Garder ces tests peut aider pour de futurs débugages

## ✅ Tests principaux actifs :

- `01-single-demo.spec.ts` - Test principal (peut avoir des problèmes de tooltips)
- `debug-scenarios.spec.ts` - Test des scénarios
- `multiplayer-demo.spec.ts` - Test multijoueur
- `terrain-vision*.spec.ts` - Tests de vision du terrain 