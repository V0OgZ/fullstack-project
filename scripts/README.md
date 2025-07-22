# 🧪 Scripts de Test - Heroes of Time

Ce dossier contient tous les scripts de test pour le projet Heroes of Time.

## 📋 **Scripts Disponibles**

### 🎯 **Script Principal**
- **`test-everything.sh`** - Script master qui lance TOUS les tests
  - Compile le backend
  - Lance les tests unitaires et d'intégration
  - Démarre tous les services (backend, visualizer, frontend)
  - Teste l'API et les 7 scénarios
  - Génère un rapport complet

### 🔧 **Scripts Spécialisés**

#### **Tests Backend**
- **`test-heroes-of-time-complet.sh`** - Tests complets backend
- **`test-game-scripts.sh`** - Tests des scripts de jeu
- **`test-services.sh`** - Tests des services

#### **Tests Temporels & Quantiques**
- **`test-temporal-engine.sh`** - Tests du moteur temporel
- **`test-temporal-collapse.sh`** - Tests de collapse quantique
- **`test-complete-bataille-temporelle.sh`** - Tests bataille temporelle
- **`test-quick-temporal.sh`** - Tests rapides temporels

#### **Tests Scénarios**
- **`test-scenarios.sh`** - Tests des 7 scénarios complets
- **`test-complete-comparison.sh`** - Tests de comparaison
- **`test-complete-comparison-fixed.sh`** - Tests de comparaison (fixé)

#### **Tests Interface**
- **`test-ui-fix.sh`** - Tests UI
- **`test-manual.sh`** - Tests manuels
- **`test-simple.sh`** - Tests simples

## 🚀 **Comment utiliser**

### **Depuis la racine du projet :**
```bash
# Lancer tous les tests
./run-tests.sh

# Ou directement
scripts/test-everything.sh
```

### **Depuis le dossier scripts/ :**
```bash
cd scripts/

# Script principal
./test-everything.sh

# Scripts spécialisés
./test-scenarios.sh
./test-temporal-engine.sh
./test-services.sh
```

## 📊 **Ce qui est testé**

### **Backend (Java)**
- ✅ Compilation Maven
- ✅ Tests unitaires (60+ tests)
- ✅ Tests d'intégration
- ✅ Parser HOTS/REGEX
- ✅ Moteur quantique temporel

### **Scénarios**
- ✅ 7 scénarios complets JSON
- ✅ Validation syntaxe
- ✅ Index des scénarios
- ✅ Intégration visualizer

### **Services**
- ✅ Backend API (port 8080)
- ✅ Quantum Visualizer (port 8001)
- ✅ Frontend Temporal (port 5173)
- ✅ Health checks

### **API**
- ✅ Endpoints REST
- ✅ Création de jeux
- ✅ Exécution de scripts
- ✅ États quantiques

## 🔧 **Maintenance**

### **Ajouter un nouveau script**
1. Créer le script dans `scripts/`
2. Le rendre exécutable : `chmod +x scripts/mon-script.sh`
3. Mettre à jour ce README

### **Modifier le script principal**
- Éditer `scripts/test-everything.sh`
- Ajouter les nouvelles phases de test
- Mettre à jour les logs

### **Déboguer**
- Logs générés dans le dossier parent
- Suffixes : `-compile.log`, `-tests.log`, `-runtime.log`
- Vérifier les ports utilisés avec `lsof -i :8080,8001,5173`

## 📁 **Structure des Logs**

```
Heroes-of-Time/
├── backend-compile.log      # Compilation backend
├── backend-tests.log        # Tests unitaires
├── backend-integration.log  # Tests d'intégration
├── backend-runtime.log      # Runtime backend
├── visualizer-runtime.log   # Runtime visualizer
├── scenarios-test.log       # Tests scénarios
├── frontend-test.log        # Tests frontend
└── playwright-test.log      # Tests Playwright
```

## 🎯 **Ports utilisés**

- **8080** : Backend Spring Boot
- **8001** : Quantum Visualizer
- **5173** : Frontend Temporal
- **3000** : Frontend principal (optionnel)
- **8000** : Serveur de test (optionnel)

## 🛑 **Arrêter les services**

```bash
# Utiliser le script d'arrêt
./stop-all.sh

# Ou manuellement
lsof -ti:8080,8001,5173,3000,8000 | xargs -r kill -9
```

---

**🎮 Système Heroes of Time prêt pour les tests quantiques temporels !** 