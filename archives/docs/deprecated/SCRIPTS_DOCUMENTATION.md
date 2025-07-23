# 🧪 Documentation des Scripts - Heroes of Time

## 📁 **Organisation des Scripts**

Les scripts de test ont été organisés dans le dossier `scripts/` pour une meilleure structure :

```
Heroes-of-Time/
├── run-tests.sh                    # Script principal à la racine
├── scripts/                        # Dossier des scripts de test
│   ├── README.md                   # Documentation détaillée
│   ├── list-scripts.sh             # Liste tous les scripts
│   ├── test-everything.sh          # Script master (TOUS les tests)
│   ├── test-scenarios.sh           # Tests des 7 scénarios
│   ├── test-temporal-engine.sh     # Tests moteur temporel
│   ├── test-heroes-of-time-complet.sh # Tests complets backend
│   └── ... (14 scripts au total)
└── stop-all.sh                     # Script d'arrêt des services
```

## 🚀 **Utilisation Rapide**

### **Lancer tous les tests :**
```bash
./run-tests.sh
```

### **Lancer des tests spécifiques :**
```bash
cd scripts/
./test-scenarios.sh              # Tests des 7 scénarios
./test-temporal-engine.sh        # Tests moteur temporel
./test-services.sh               # Tests des services
```

### **Lister tous les scripts :**
```bash
cd scripts/
./list-scripts.sh
```

## 📋 **Scripts Disponibles (14 au total)**

### **🎯 Script Principal**
- **`test-everything.sh`** - Script master qui lance TOUS les tests

### **🔧 Scripts Backend**
- **`test-heroes-of-time-complet.sh`** - Tests complets backend
- **`test-game-scripts.sh`** - Tests des scripts de jeu
- **`test-services.sh`** - Tests des services

### **⚡ Scripts Temporels & Quantiques**
- **`test-temporal-engine.sh`** - Tests du moteur temporel
- **`test-temporal-collapse.sh`** - Tests de collapse quantique
- **`test-complete-bataille-temporelle.sh`** - Tests bataille temporelle
- **`test-quick-temporal.sh`** - Tests rapides temporels

### **📋 Scripts Scénarios**
- **`test-scenarios.sh`** - Tests des 7 scénarios complets
- **`test-complete-comparison.sh`** - Tests de comparaison
- **`test-complete-comparison-fixed.sh`** - Tests de comparaison (fixé)

### **🎨 Scripts Interface**
- **`test-ui-fix.sh`** - Tests UI
- **`test-manual.sh`** - Tests manuels
- **`test-simple.sh`** - Tests simples

### **📊 Scripts Utilitaires**
- **`list-scripts.sh`** - Affiche la liste des scripts

## 🎯 **Ce qui est testé**

### **Backend (Java)**
- ✅ **Compilation Maven** - Vérification de la compilation
- ✅ **Tests unitaires** - 60+ tests Java
- ✅ **Tests d'intégration** - Tests API complets
- ✅ **Parser HOTS/REGEX** - Langage de script temporel
- ✅ **Moteur quantique** - États ψ et collapse

### **Scénarios**
- ✅ **7 scénarios complets** - JSON validés
- ✅ **Index des scénarios** - SCENARIOS_INDEX.json
- ✅ **Intégration visualizer** - Copie automatique
- ✅ **Validation syntaxe** - Tests JSON

### **Services**
- ✅ **Backend API** - Port 8080, health checks
- ✅ **Quantum Visualizer** - Port 8001, interface web
- ✅ **Frontend Temporal** - Port 5173, interface test
- ✅ **API REST** - Endpoints complets

## 🛠️ **Maintenance**

### **Ajouter un nouveau script**
1. Créer le script dans `scripts/`
2. Le rendre exécutable : `chmod +x scripts/mon-script.sh`
3. Mettre à jour `scripts/README.md`
4. Mettre à jour `scripts/list-scripts.sh`

### **Modifier le script principal**
- Éditer `scripts/test-everything.sh`
- Ajuster les chemins relatifs (préfixe `../`)
- Tester depuis le dossier `scripts/`

### **Logs et Déboggage**
- Logs générés dans le dossier parent : `../backend-compile.log`
- Vérifier les ports : `lsof -i :8080,8001,5173`
- Arrêter les services : `./stop-all.sh`

## 📊 **Statistiques**

| **Catégorie** | **Nombre** | **Type** |
|---------------|------------|----------|
| **Scripts Total** | 14 | Tous dans scripts/ |
| **Tests Backend** | 60+ | Tests Java unitaires |
| **Tests E2E** | 25+ | Tests Playwright |
| **Scénarios** | 7 | JSONs complets |
| **Services** | 3 | Backend, Visualizer, Frontend |

## 🎮 **Prêt pour les tests !**

Système Heroes of Time complètement organisé et testé.

**Pour démarrer :** `./run-tests.sh`
**Pour explorer :** `cd scripts/ && ./list-scripts.sh` 