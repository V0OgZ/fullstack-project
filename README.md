# 🕰️ HEROES OF TIME - Temporal Strategy Game

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/heroes-of-time) [![Frontend](https://img.shields.io/badge/frontend-React-blue)](http://localhost:3000) [![Backend](https://img.shields.io/badge/backend-Spring%20Boot-green)](http://localhost:8080) [![Quantum](https://img.shields.io/badge/quantum-enabled-purple)](docs/temporal/)

**Un jeu de stratégie révolutionnaire intégrant la vraie mécanique quantique avec des amplitudes complexes (a + bi) pour des possibilités tactiques infinies !**

## 🚀 Démarrage Rapide

```bash
# Lancer le backend
cd backend && mvn spring-boot:run

# Lancer le frontend
cd frontend && npm start

# Lancer l'interface temporelle
cd frontend-temporal && python3 -m http.server 5174
```

**🎮 Accès au jeu :** http://localhost:3000  
**🔧 API Backend :** http://localhost:8080  
**⚡ Interface Temporelle :** http://localhost:5174  

## 🎯 Concept du Jeu

### 🗡️ **Qu'est-ce que Heroes of Time ?**

Heroes of Time est un jeu de stratégie où vous contrôlez des héros capables de **manipuler le temps**. Imaginez pouvoir :

- **📍 Préparer des actions à l'avance** - Planifiez le déplacement de votre héros 3 tours dans le futur
- **🔄 Exécuter plusieurs stratégies en parallèle** - Comme avoir plusieurs onglets ouverts, mais pour vos actions
- **⚡ Créer des "timelines" alternatives** - Testez différentes approches en même temps
- **🌀 Combiner vos stratégies** - Quand deux actions se rencontrent, elles peuvent se renforcer ou s'annuler

### 🎮 **Gameplay Simple à Comprendre**

```
Tour 1 : Vous programmez "Arthur va en (5,3) dans 2 tours"
Tour 2 : Vous programmez "Arthur attaque le dragon dans 1 tour"  
Tour 3 : Les deux actions se déclenchent → Arthur est en (5,3) ET attaque le dragon !
```

**🔗 Pensez à ça comme :**
- **Calendrier intelligent** - Vos actions sont programmées à l'avance
- **Multitâche temporel** - Plusieurs stratégies tournent en background
- **Synchronisation** - Quand vos plans se croisent, la magie opère

### 🎲 **Pourquoi c'est révolutionnaire ?**

Au lieu de jouer "action par action" comme les jeux classiques, vous jouez **"stratégie par stratégie"** :

- **🧠 Stratégique** - Anticipez les mouvements de l'adversaire
- **💫 Créatif** - Combinez vos actions de manière inattendue  
- **⚡ Dynamique** - Plusieurs choses se passent en même temps
- **🎯 Tactique** - Timing parfait = victoire

**💡 En résumé :** C'est comme jouer aux échecs, mais où vous pouvez programmer vos coups à l'avance et les voir s'exécuter de manière asynchrone !

*📚 Pour les détails techniques et mécaniques avancées, consultez la [documentation complète](docs/GAMEPLAY.md)*

## 📚 Documentation Complète

### 🌟 Système Quantique Révolutionnaire

| Document | Description | Lien |
|----------|-------------|------|
| **📖 Codex Temporel** | Guide complet des amplitudes complexes | [docs/TEMPORAL_CODEX.md](docs/TEMPORAL_CODEX.md) |
| **🔬 Implémentation Quantique** | Architecture technique des amplitudes | [docs/temporal/TEMPORAL_AMPLITUDES_IMPLEMENTATION.md](docs/temporal/TEMPORAL_AMPLITUDES_IMPLEMENTATION.md) |
| **📊 Rapport Complet** | Analyse détaillée de l'implémentation | [docs/temporal/TEMPORAL_IMPLEMENTATION_COMPLETE_REPORT.md](docs/temporal/TEMPORAL_IMPLEMENTATION_COMPLETE_REPORT.md) |
| **🎯 Scénarios d'Interférence** | Exemples concrets d'utilisation | [docs/temporal/SCENARIO_INTERFERENCE_QUANTIQUE.md](docs/temporal/SCENARIO_INTERFERENCE_QUANTIQUE.md) |
| **📈 Visualiseur Timeline** | Plan du visualiseur quantique | [docs/temporal/TEMPORAL_TIMELINE_VISUALIZER_PLAN.md](docs/temporal/TEMPORAL_TIMELINE_VISUALIZER_PLAN.md) |

### 🏆 Contenus de Jeu

| Catégorie | Description | Lien |
|-----------|-------------|------|
| **🗡️ Artefacts Temporels** | Guide des objets Tier 6-8 | [docs/items/TEMPORAL_ARTIFACTS_GUIDE.md](docs/items/TEMPORAL_ARTIFACTS_GUIDE.md) |
| **🐉 Créatures Temporelles** | Bestiaire des créatures avancées | [docs/items/TEMPORAL_CREATURES_GUIDE.md](docs/items/TEMPORAL_CREATURES_GUIDE.md) |
| **📦 Index des Artefacts** | Catalogue complet des objets | [docs/items/HEROES_OF_TIME_ARTEFACTS_INDEX.md](docs/items/HEROES_OF_TIME_ARTEFACTS_INDEX.md) |

### 🎮 Guides Utilisateur

| Guide | Description | Lien |
|-------|-------------|------|
| **🎯 Gameplay** | Mécaniques de jeu fondamentales | [docs/GAMEPLAY.md](docs/GAMEPLAY.md) |
| **💾 Installation** | Guide d'installation complet | [docs/INSTALLATION.md](docs/INSTALLATION.md) |
| **📜 Référence Scripts** | Syntaxe des scripts temporels | [docs/SCRIPT_REFERENCE.md](docs/SCRIPT_REFERENCE.md) |
| **🔧 Documentation Technique** | Architecture et APIs | [docs/TECHNICAL.md](docs/TECHNICAL.md) |
| **🧪 Rapports de Tests** | Résultats des tests complets | [docs/reports/](docs/reports/) |

### 🚀 Scripts et Tests

| Script | Description | Lien |
|--------|-------------|------|
| **🧪 Tests Complets** | Lancer tous les tests | [./run-tests.sh](./run-tests.sh) |
| **📋 Scripts Organisés** | Tous les scripts de test | [scripts/](scripts/) |
| **📖 Documentation Scripts** | Guide des scripts | [SCRIPTS_DOCUMENTATION.md](SCRIPTS_DOCUMENTATION.md) |
| **🛑 Arrêt Services** | Arrêter tous les services | [./stop-all.sh](./stop-all.sh) |

## 🎯 Statut des Features

### 🚀 Systèmes Principaux
```
🔧 Backend Quantique     ████████████████████ 100%  ✅ Complet
⚡ Moteur Temporel       ████████████████████  95%  🟡 Optimisations
🎮 API REST              ████████████████████  90%  🟡 Tests end-to-end
📊 Base de Données       ████████████████████ 100%  ✅ H2 + JPA
🧪 Tests Unitaires       █████████████████▓▓▓  87%  🟡 11 tests à corriger
```

### 🎨 Interface Utilisateur
```
🖼️  Interface Moderne     ████████▓▓▓▓▓▓▓▓▓▓▓▓  40%  🔴 En développement
🏰 Système Châteaux      ███▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  15%  🔴 Conception
🗺️  Rendu Cartes         ██████████▓▓▓▓▓▓▓▓▓▓  50%  🟡 Hexagonal basic
🎯 Sélecteurs UI         █████▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  25%  🔴 Proto seulement
📱 Interface Mobile      ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓   0%  🔴 Non commencé
```

### 🎮 Gameplay
```
⚔️  Système Combat       ████████████▓▓▓▓▓▓▓▓  60%  🟡 Logic de base
🏃 Déplacement Héros     ████████████████████  90%  🟡 Finalisation
🔮 Magie & Sorts         ██████▓▓▓▓▓▓▓▓▓▓▓▓▓▓  30%  🔴 Prototypes
🏰 Gestion Villes        ██▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  10%  🔴 Conception
🌍 Exploration Carte     ███████████▓▓▓▓▓▓▓▓▓  55%  🟡 FOW basique
```

### 🔬 Technologies Avancées
```
⚛️  Amplitudes Complexes ████████████████████ 100%  ✅ Implémenté
🌀 Interférences Ψ       ███████████████████▓  95%  🟡 Tests finaux
🔄 Migration Quantique   ████████████████████ 100%  ✅ Service complet
📈 Visualiseur Quantique ██████████████████▓▓  90%  🟡 Améliorations UI
🧠 IA Quantique          ████████▓▓▓▓▓▓▓▓▓▓▓▓  40%  🟡 Algorithmes
```

### 🎭 Contenu
```
🗡️  Artefacts Légendaires ████████████████████ 100%  ✅ 50+ objets Tier 6-8
🐉 Créatures Épiques     ████████████████████ 100%  ✅ Bestiaire complet
🏛️  Scénarios            ████████████████████ 100%  ✅ 7 scénarios finis
⚡ Scripts HOTS          ███████████████████▓  95%  🟡 Parser optimisé
🌟 Easter Eggs          ████████████▓▓▓▓▓▓▓▓  60%  🟡 Goldorak & plus
```

### 🔮 À Venir
```
🎨 UI/UX Moderne         ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓   0%  🔴 Refonte complète
🏰 Système Châteaux      ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓   0%  🔴 Architecture HoMM3
🌐 Multijoueur Temps Réel ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓   0%  🔴 WebSockets
🎵 Audio & Musique       ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓   0%  🔴 Sound Design
📊 Analytics & Stats     ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓   0%  🔴 Métriques jeu
```

**🎮 État Global du Projet :** `███████████▓▓▓▓▓▓▓▓▓ 65%` - **Moteur fonctionnel, UI à refaire** 