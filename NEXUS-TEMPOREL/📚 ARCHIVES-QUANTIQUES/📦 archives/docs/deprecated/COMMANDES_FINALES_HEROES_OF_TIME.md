# 🎯 COMMANDES FINALES - HEROES OF TIME

**Toutes les commandes importantes pour utiliser le système**

---

## 🚀 **COMMANDE PRINCIPALE - TEST ET PUSH**

### ⚡ **Une seule commande pour tout faire :**
```bash
./test-et-push-complet.sh
```

**Cette commande :**
1. ✅ Démarre le backend automatiquement
2. 🌀 Intègre le test d'interférence dans dashboard 8888
3. 🧪 Lance le Test Runner UI sur port 8888
4. 🔬 Teste l'interférence quantique via API
5. 🏁 Exécute le benchmark NATIVE vs SCRIPT
6. 📦 Commit et push automatiquement si tout OK

---

## 🧪 **COMMANDES DE TEST SPÉCIFIQUES**

### 🏆 **Test complet général :**
```bash
./test-complet-final.sh
```

### 🌐 **Test Runner Interface Web :**
```bash
python3 test-runner-server.py
# Puis ouvrir http://localhost:8888
```

### 🏁 **Benchmark NATIVE vs SCRIPT :**
```bash
./⚙️ scripts/test/test-complet-avec-benchmark.sh
```

### ⚡ **Test rapide interférence quantique :**
```bash
./test-interference-rapide.sh
```

### 🎯 **Tests UI rapides :**
```bash
./⚙️ scripts/actifs/test-ui-quick.sh
```

---

## 🌐 **DÉMARRAGE DES SERVICES**

### 🚀 **Backend seul :**
```bash
cd backend && mvn spring-boot:run
```

### 🖥️ **Tous les services (backend + frontends) :**
```bash
./⚙️ scripts/start/all.sh
```

### 🔬 **Service spécifique :**
```bash
# Test Runner UI seulement
python3 test-runner-server.py

# Quantum Visualizer seulement  
cd quantum-visualizer && python3 -m http.server 8001
```

---

## 📊 **INTERFACES DISPONIBLES**

### 🌐 **Après démarrage, accès à :**
- **Backend API**: http://localhost:8080
- **Frontend Classique**: http://localhost:8000  
- **Frontend Temporal**: http://localhost:5173
- **Quantum Visualizer**: http://localhost:8001
- **Test Runner Complet**: http://localhost:8888 ← **LE PRINCIPAL**

---

## 🔧 **COMMANDES DE BENCHMARK**

### 🏁 **Comparer NATIVE vs SCRIPT :**
```bash
# Benchmark automatique complet
./⚙️ scripts/test/benchmark-native-vs-script.sh

# Test via API directement
curl -X POST "http://localhost:8080/api/benchmark/compare/bataille_temporelle_setup?gameId=1&iterations=5"
```

### 📊 **Statistiques de performance :**
```bash
curl "http://localhost:8080/api/benchmark/stats"
curl "http://localhost:8080/api/benchmark/scenarios"
```

---

## 🌀 **COMMANDES QUANTIQUES**

### 🔬 **Test d'interférence via API :**
```bash
# Créer une partie
curl -X POST "http://localhost:8080/api/game/create" \
  -H "Content-Type: application/json" \
  -d '{"gameName": "TestQuantique"}'

# Exécuter des commandes quantiques
curl -X POST "http://localhost:8080/api/game/1/script" \
  -H "Content-Type: application/json" \
  -d '{"script": "ψ101: (0.6+0.8i) ⊙(Δt+1 @10,10 ⟶ MOV(Tesla, @10,10))"}'
```

### 🎯 **Commandes HOTS avancées :**
```bash
# Dans l'interface ou via API
INTERFERE(CONSTRUCTIVE, ψ101, ψ102)
PHASE_SHIFT(ψ301, 45)
RESONATE(ψ401, 440)
MEASURE_COHERENCE(ψ101, ψ102)
```

---

## 🔄 **CONVERSION HOTS ↔ JSON**

### 📝 **Convertir un scénario :**
```bash
# HOTS vers JSON
./convertir-scenario-hots-vers-json.sh hots-to-json bataille_temporelle_setup.hots

# JSON vers HOTS  
./convertir-scenario-hots-vers-json.sh json-to-hots bataille_temporelle_setup.json
```

---

## 🛠️ **COMMANDES DE MAINTENANCE**

### 🧹 **Arrêter tous les services :**
```bash
./⚙️ scripts/stop/all.sh
```

### 🔍 **Vérifier les ports utilisés :**
```bash
lsof -i :8080  # Backend
lsof -i :8888  # Test Runner  
lsof -i :8001  # Quantum Visualizer
lsof -i :8000  # Frontend Classique
lsof -i :5173  # Frontend Temporal
```

### 📊 **Logs des services :**
```bash
tail -f backend.log         # Backend Spring Boot
tail -f test-runner.log     # Test Runner UI
tail -f quantum-demo.log    # Quantum Visualizer
```

---

## 🎯 **WORKFLOW RECOMMANDÉ**

### 🚀 **Pour développer :**
1. `./test-et-push-complet.sh` → Test complet automatique
2. Développer dans le code
3. `./test-interference-rapide.sh` → Test rapide pendant dev
4. `./test-et-push-complet.sh` → Test et push final

### 🧪 **Pour tester :**
1. `./⚙️ scripts/start/all.sh` → Démarrer tous les services  
2. Ouvrir http://localhost:8888 → Test Runner UI
3. Tester via l'interface web
4. `./⚙️ scripts/stop/all.sh` → Arrêter proprement

### 🎮 **Pour jouer :**
1. `cd backend && mvn spring-boot:run` → Backend seulement
2. Ouvrir http://localhost:8000 → Interface de jeu
3. Utiliser la console pour taper des commandes HOTS

---

## 🏆 **COMMANDE ULTIME - TOUT EN UN**

```bash
# 🚀 LA COMMANDE MAGIQUE :
./test-et-push-complet.sh

# Elle fait TOUT :
# ✅ Démarre le backend
# 🌀 Intègre les tests d'interférence  
# 🧪 Lance l'UI de test
# 📊 Exécute tous les benchmarks
# 🔬 Teste les APIs quantiques
# 📦 Commit et push si OK
# 🎉 Système complet opérationnel !
```

---

**🎮 Heroes of Time - Système NATIVE vs SCRIPT prêt à l'emploi ! ⚡** 