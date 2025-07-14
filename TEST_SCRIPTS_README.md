# 🧪 Scripts de Tests - Heroes of Time

Ce répertoire contient des scripts shell pour automatiser les tests du projet Heroes of Time.

## 📋 Scripts Disponibles

### 1. `./run-all-tests.sh` - Tests Complets
**Script principal** qui lance tous les tests avec gestion complète des services.

**Ce qu'il fait :**
- 🚀 Démarre automatiquement le backend (port 8080)
- 🚀 Démarre automatiquement le frontend (port 3000)
- 🧪 Lance les tests backend (unitaires + intégration)
- 🧪 Lance les tests frontend (Jest)
- 🧪 Lance les tests Cypress (E2E)
- 🔌 Teste les APIs REST
- 🧹 Nettoie automatiquement les processus à la fin

**Utilisation :**
```bash
./run-all-tests.sh
```

### 2. `./run-quick-tests.sh` - Tests Rapides
**Script rapide** pour les tests essentiels sans démarrer les services.

**Ce qu'il fait :**
- 🧪 Tests backend (unitaires seulement)
- 🧪 Tests frontend (Jest)
- 🧪 Un test Cypress basique

**Utilisation :**
```bash
./run-quick-tests.sh
```

## 🎯 Recommandations d'Usage

### Développement quotidien
```bash
# Tests rapides avant chaque commit
./run-quick-tests.sh
```

### Avant déploiement
```bash
# Tests complets avant merge/déploiement
./run-all-tests.sh
```

### CI/CD
```bash
# Dans votre pipeline CI/CD
./run-all-tests.sh
```

## 🔧 Prérequis

- **Java 11+** avec Maven
- **Node.js 16+** avec npm
- **curl** (pour les tests d'APIs)
- **lsof** (pour la gestion des ports)

## 🚨 Résolution des Problèmes

### Port déjà utilisé
Les scripts gèrent automatiquement les ports occupés :
- Backend: port 8080
- Frontend: port 3000

### Processus zombies
Le script de nettoyage automatique s'occupe des processus qui traînent.

### Logs de débogage
Les logs sont sauvegardés dans :
- `backend.log` - Logs du backend
- `frontend.log` - Logs du frontend

## 📊 Couverture de Tests

### Backend Tests
- ✅ Tests unitaires des controllers
- ✅ Tests d'intégration des services
- ✅ Tests de repository
- ✅ Tests des APIs REST

### Frontend Tests
- ✅ Tests unitaires des composants React
- ✅ Tests d'intégration des services
- ✅ Tests des utils et helpers

### Tests E2E
- ✅ Tests de sélection de scénarios
- ✅ Tests de gameplay solo
- ✅ Tests multijoueur
- ✅ Tests de performance

## 🎨 Codes Couleur

- 🔵 **Bleu** : Informations et étapes
- 🟡 **Jaune** : Avertissements et préparations
- 🟢 **Vert** : Succès et validations
- 🔴 **Rouge** : Erreurs et échecs

## 🚀 Exemple d'Exécution

```bash
$ ./run-all-tests.sh

🎯 === SCRIPT DE TESTS COMPLET HEROES OF TIME ===
🎯 Lancement de tous les tests...
📦 Vérification des dépendances...
🚀 Démarrage du backend...
⏳ Attente du démarrage de Backend...
✅ Backend est prêt!
🚀 Démarrage du frontend...
⏳ Attente du démarrage de Frontend...
✅ Frontend est prêt!
🎯 === DÉBUT DES TESTS ===
🧪 Test des APIs...
✅ API conquest-classic: OK
✅ API temporal-rift: OK
✅ Tests APIs terminés
🧪 Lancement des tests backend...
✅ Tests backend terminés
🧪 Lancement des tests frontend...
✅ Tests frontend terminés
🧪 Lancement des tests Cypress...
✅ Tests Cypress terminés
🎉 === TOUS LES TESTS TERMINÉS ===
🧹 Nettoyage des processus...
✅ Nettoyage terminé
```

## 📝 Notes

- Les scripts s'arrêtent au premier échec (`set -e`)
- Le nettoyage automatique se fait même en cas d'interruption (Ctrl+C)
- Les ports sont automatiquement libérés avant le démarrage
- Les logs sont disponibles pour le debug post-échec 