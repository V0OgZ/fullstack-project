# 🧪 TEST RUNNER UI - DOCUMENTATION

## ✅ État Actuel

L'interface Test Runner est **OPÉRATIONNELLE** sur le port 8888.

### 🌐 Accès
- **URL**: http://localhost:8888
- **Titre**: "Heroes of Time - Test Runner Interface"
- **Serveur**: Python HTTP avec handlers personnalisés

### 🚀 Démarrage

1. **Si pas déjà lancé**:
   ```bash
   python3 test-runner-server.py
   ```

2. **Vérifier l'état**:
   ```bash
   curl -s http://localhost:8888 | grep '<title>'
   # Devrait afficher: <title>🎯 Heroes of Time - Test Runner Interface</title>
   ```

### 📋 Fonctionnalités

L'interface Test Runner permet de:

1. **Lancer des tests automatisés**
   - Tests unitaires backend
   - Tests d'intégration
   - Tests de performance
   - Tests Playwright E2E

2. **Monitorer l'exécution**
   - Statut en temps réel
   - Logs détaillés
   - Métriques de performance

3. **Mode Auto-Run**
   - Exécution automatique toutes les X secondes
   - Utile pour les tests de régression

### 🛠️ Architecture

```
test-runner-server.py (Port 8888)
         │
         ├── GET /          → Interface HTML
         ├── GET /status    → État des tests JSON
         ├── GET /logs/{id} → Logs d'un test
         ├── POST /run      → Lancer un test
         └── POST /stop     → Arrêter un test
```

### 📊 Scripts de Test Disponibles

Le Test Runner peut exécuter:

1. **test-simple.sh** - Test basique du jeu
2. **test-rapide-hots.sh** - Test rapide avec scénarios
3. **test-game-scripts.sh** - Test des scripts de jeu
4. **test-temporal-engine.sh** - Test du moteur temporal
5. **test-ui-quick.sh** - Test rapide de toutes les UIs

### 🔧 Résolution de Problèmes

**Port déjà utilisé** (Error 48):
```bash
lsof -ti:8888 | xargs kill -9
python3 test-runner-server.py
```

**Test Runner ne démarre pas**:
```bash
# Vérifier Python
python3 --version

# Lancer avec logs
python3 -u test-runner-server.py
```

### 📝 Scripts Organisés

Les scripts ont été organisés dans:
- `scripts/actifs/` - Scripts principaux actifs
- `scripts/` - Scripts de test
- `archives/` - Anciens scripts archivés

### 🎯 Utilisation Typique

1. **Ouvrir l'interface**: http://localhost:8888
2. **Sélectionner un test** dans la liste
3. **Cliquer "Run Test"** pour lancer
4. **Voir les logs** en temps réel
5. **Activer Auto-Run** pour tests continus

### 💡 Tips

- Le Test Runner utilise l'interface HTML dans `test-runner-interface.html`
- Les tests sont exécutés via subprocess Python
- Les logs sont capturés et affichés en temps réel
- L'état est mis à jour via polling AJAX toutes les secondes

### ✨ Intégration Complète

Le Test Runner fait partie de l'écosystème Heroes of Time:

```
Frontend (8000) ←→ Backend (8080)
     ↓                    ↑
Quantum (8001)      Test Runner (8888)
```

Tous les services communiquent et permettent un développement et test complet du jeu! 