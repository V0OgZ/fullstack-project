# 🚀 HEROES OF TIME - GUIDE DES SCRIPTS

## 📋 **Scripts Disponibles**

### **🎮 Script Principal - Tout Lancer**
```bash
./run-everything.sh
```
**Lance absolument tout :**
- ✅ Backend Spring Boot (Maven)
- ✅ Frontend Principal (port 8081)
- ✅ Frontend Temporal (port 8082) 
- ✅ Quantum Visualizer (port 8083)
- ✅ Dashboard Secure (port 8090)
- ✅ Tous les tests Java Maven
- ✅ Tous les scénarios .hots
- ✅ Tests d'intégration du dossier `/test`

### **🌀 Script Scénarios - Tests Complets**
```bash
./run-all-scenarios.sh
```
**Lance tous les scénarios de test :**
- 🧪 Tests Java Maven (8 classes)
- 🌀 Scénarios .hots (7 fichiers)
- 🧪 Scripts du dossier `/test` (différents des .hots)
- ⚡ Tests de performance et stress

### **🛑 Arrêter Tous les Services**
```bash
./stop-all-services.sh
```

---

## 🎯 **Utilisation Rapide**

### **Démarrage Complet (Recommandé)**
```bash
# Lance tout le système Heroes of Time
./run-everything.sh

# Attendre que tous les services démarrent...
# Puis accéder aux UIs :
# - Frontend Principal: http://localhost:8081
# - Frontend Temporal: http://localhost:8082
# - Quantum Visualizer: http://localhost:8083
# - Dashboard: http://localhost:8090
```

### **Tests Seulement (Backend requis)**
```bash
# Option 1: Lancer le backend séparément
cd backend && mvn spring-boot:run &

# Puis exécuter tous les scénarios
./run-all-scenarios.sh

# Option 2: Utiliser run-everything.sh qui lance tout
```

---

## 📊 **Types de Tests Expliqués**

### **🧪 Tests Java Maven**
Ces sont les **vraies** classes de test d'intégration :
- `ComplexScenarioTest` : Scénario épique complet
- `BatailleTemporelleIntegrationTest` : Combat temporel
- `QuantumArtifactsIntegrationTest` : Artefacts quantiques
- `TemporalStressTest` : Test de charge
- etc.

**Différence** : Ces tests sont en **Java** et utilisent **Spring Boot Test**

### **🌀 Scénarios .hots**
Fichiers de script dans le langage Heroes of Time :
- `bataille_temporelle_combat.hots` 
- `temporal-stress-test.hots`
- `quantum_artifacts_test.hots`
- etc.

**Différence** : Ces tests sont en **HOTS script** et passent par l'**API REST**

### **🧪 Scripts du Dossier `/test`**
Scripts d'intégration bash spécialisés :
- `test/run-bataille-temporelle.sh`
- `test/run_converted_epic_scenario.sh`

**Différence** : Ces scripts **combinent** plusieurs types de tests et **valident l'état final**

---

## 📋 **Logs et Debugging**

### **📁 Dossier `logs/`**
Tous les logs sont sauvegardés automatiquement :
```
logs/
├── backend-full.log              # Backend Spring Boot
├── test-ComplexScenarioTest.log  # Tests Java individuels
├── test-BatailleTemporelleIntegrationTest.log
├── frontend-principal.log        # UIs
├── quantum-visualizer.log
├── dashboard-secure.log
└── test-bataille-temporelle.log  # Scripts /test
```

### **🔍 Debug Rapide**
```bash
# Voir le backend en temps réel
tail -f logs/backend-full.log

# Voir tous les logs en même temps
tail -f logs/*.log

# Chercher les erreurs
grep -r "ERROR\|FAILED\|❌" logs/
```

---

## ⚡ **Ordre des Opérations**

### **🚀 Démarrage Recommandé**
1. **Backend** démarre en premier (60s max)
2. **UIs** démarrent en parallèle (3s)
3. **Tests Java** s'exécutent (Maven)
4. **Scénarios .hots** s'exécutent (API REST)
5. **Scripts `/test`** s'exécutent (intégration)
6. **Rapport final** avec statistiques

### **📊 Métriques Attendues**
- ✅ Backend : Prêt en ~15-30s
- ✅ Tests Java : 8 classes, ~80% succès
- ✅ Scénarios .hots : 7 fichiers, ~70% succès  
- ✅ Performance : >1000 commandes/seconde

---

## 🛠️ **Personnalisation**

### **Modifier les Ports**
Dans `run-everything.sh` :
```bash
FRONTEND_PORT=8081    # Frontend Principal
TEMPORAL_PORT=8082    # Frontend Temporal
QUANTUM_PORT=8083     # Quantum Visualizer
```

### **Ajouter des Scénarios**
Dans `run-all-scenarios.sh` :
```bash
HOTS_SCENARIOS=(
    "game_assets/tests/hots/votre-scenario.hots"
    # ...
)
```

### **Seuil de Succès**
```bash
if [ $success_rate -ge 70 ]; then  # 70% minimum
```

---

## 🎉 **Résultat Attendu**

Après `./run-everything.sh`, vous devriez avoir :

```
🚀 HEROES OF TIME - DÉMARRAGE COMPLET
=====================================
✅ Backend prêt !
✅ Toutes les UIs démarrées :
   🌐 Frontend Principal: http://localhost:8081
   ⏰ Frontend Temporal:  http://localhost:8082
   🔮 Quantum Visualizer: http://localhost:8083
   📊 Dashboard:          http://localhost:8090

✅ Tests Java Maven: 8/8 PASSÉS
✅ Scénarios .hots: 6/7 PASSÉS (85%)
✅ Scripts /test: 2/2 PASSÉS
✅ Performance: 1370 cmd/s

🎉 SYSTÈME COMPLET DÉMARRÉ !
```

**Votre système Heroes of Time est maintenant 100% opérationnel !** 🏆 