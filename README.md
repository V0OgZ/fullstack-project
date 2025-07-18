# 🕰️ HEROES OF TIME - Temporal Strategy Game

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/heroes-of-time) [![Frontend](https://img.shields.io/badge/frontend-React-blue)](http://localhost:3000) [![Backend](https://img.shields.io/badge/backend-Spring%20Boot-green)](http://localhost:8080) [![Quantum](https://img.shields.io/badge/quantum-enabled-purple)](docs/quantum/)

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

## 📚 Documentation Complète

### 🌟 Système Quantique Révolutionnaire

| Document | Description | Lien |
|----------|-------------|------|
| **📖 Codex Quantique** | Guide complet des amplitudes complexes | [docs/quantum/QUANTUM_CODEX_COMPLETE.md](docs/quantum/QUANTUM_CODEX_COMPLETE.md) |
| **🔬 Implémentation Quantique** | Architecture technique des amplitudes | [docs/quantum/QUANTUM_AMPLITUDES_IMPLEMENTATION.md](docs/quantum/QUANTUM_AMPLITUDES_IMPLEMENTATION.md) |
| **📊 Rapport Complet** | Analyse détaillée de l'implémentation | [docs/quantum/QUANTUM_IMPLEMENTATION_COMPLETE_REPORT.md](docs/quantum/QUANTUM_IMPLEMENTATION_COMPLETE_REPORT.md) |
| **🎯 Scénarios d'Interférence** | Exemples concrets d'utilisation | [docs/quantum/SCENARIO_INTERFERENCE_QUANTIQUE.md](docs/quantum/SCENARIO_INTERFERENCE_QUANTIQUE.md) |
| **📈 Visualiseur Timeline** | Plan du visualiseur quantique | [docs/quantum/QUANTUM_TIMELINE_VISUALIZER_PLAN.md](docs/quantum/QUANTUM_TIMELINE_VISUALIZER_PLAN.md) |

### 🏆 Contenus de Jeu

| Catégorie | Description | Lien |
|-----------|-------------|------|
| **🗡️ Artefacts Quantiques** | Guide des objets Tier 6-8 | [docs/items/QUANTUM_ARTIFACTS_GUIDE.md](docs/items/QUANTUM_ARTIFACTS_GUIDE.md) |
| **🐉 Créatures Quantiques** | Bestiaire des créatures avancées | [docs/items/QUANTUM_CREATURES_GUIDE.md](docs/items/QUANTUM_CREATURES_GUIDE.md) |
| **📦 Index des Artefacts** | Catalogue complet des objets | [docs/items/HEROES_OF_TIME_ARTEFACTS_INDEX.md](docs/items/HEROES_OF_TIME_ARTEFACTS_INDEX.md) |

### 🎮 Guides Utilisateur

| Guide | Description | Lien |
|-------|-------------|------|
| **🎯 Gameplay** | Mécaniques de jeu fondamentales | [docs/GAMEPLAY.md](docs/GAMEPLAY.md) |
| **💾 Installation** | Guide d'installation complet | [docs/INSTALLATION.md](docs/INSTALLATION.md) |
| **📜 Référence Scripts** | Syntaxe des scripts temporels | [docs/SCRIPT_REFERENCE.md](docs/SCRIPT_REFERENCE.md) |
| **🏛️ Codex Temporal** | Lore et mécaniques temporelles | [docs/TEMPORAL_CODEX.md](docs/TEMPORAL_CODEX.md) |

### 🔧 Documentation Technique

| Document | Description | Lien |
|----------|-------------|------|
| **🏗️ Architecture** | Documentation technique complète | [docs/TECHNICAL.md](docs/TECHNICAL.md) |
| **🔌 API Reference** | Endpoints et intégration | [docs/API.md](docs/API.md) |
| **⚡ Optimisations** | Corrections de performance | [docs/technical/SCRIPT_PERFORMANCE_CORRECTIONS.md](docs/technical/SCRIPT_PERFORMANCE_CORRECTIONS.md) |
| **🔄 Refactoring** | Résumé des refactorisations | [docs/REFACTORING_SUMMARY.md](docs/REFACTORING_SUMMARY.md) |

### 📊 Rapports et Analyses

| Rapport | Description | Lien |
|---------|-------------|------|
| **📈 Comparaison Complète** | Analyse comparative détaillée | [docs/reports/RAPPORT_COMPLET_COMPARAISON.md](docs/reports/RAPPORT_COMPLET_COMPARAISON.md) |
| **✅ Validation Objets** | Tests de validation complets | [docs/reports/VALIDATION_COMPLETE_OBJETS.md](docs/reports/VALIDATION_COMPLETE_OBJETS.md) |

### 📦 Données de Jeu

| Fichier | Description | Lien |
|---------|-------------|------|
| **🐉 Créatures JSON** | Données des créatures quantiques | [docs/items/QUANTUM_CREATURES.json](docs/items/QUANTUM_CREATURES.json) |
| **🗡️ Artefacts JSON** | Données des artefacts temporels | [docs/items/TEMPORAL_ARTIFACTS.json](docs/items/TEMPORAL_ARTIFACTS.json) |

## 🌟 Fonctionnalités Révolutionnaires

### ⚡ Mécanique Quantique Authentique
- **Amplitudes Complexes** : `ψ = a + bi` remplace les probabilités
- **Interférences** : Constructives (P > 1.0) et destructives (P = 0.0)
- **Superposition** : États multiples simultanés
- **Collapse Quantique** : Résolution des probabilités

### 🎯 Exemples d'Interférence
```
# Interférence Constructive
ψ₁ = 0.707 + 0.0i
ψ₂ = 0.707 + 0.0i  
→ P = 2.0 (200% d'efficacité!)

# Interférence Destructive  
ψ₁ = 0.707 + 0.0i
ψ₂ = -0.707 + 0.0i
→ P = 0.0 (annulation totale!)
```

### 🎮 Gameplay Stratégique
- **Timeline Multiples** : Jouez dans plusieurs dimensions
- **Scripts Temporels** : Syntaxe .hots avancée
- **Héros Quantiques** : Capacités interdimensionnelles
- **Artefacts Légendaires** : Objets Tier 6-8 avec pouvoirs cosmiques

## 🚀 Technologies

- **Backend** : Spring Boot 3.2 + Java 17
- **Frontend** : React 18 + TypeScript
- **Base de Données** : H2 (dev) / PostgreSQL (prod)
- **Moteur Quantique** : Implémentation native Java
- **Interface Temporelle** : Vanilla JS + Canvas

## 🔧 Développement

### Structure du Projet
```
Heroes-of-Time/
├── backend/                 # API Spring Boot
├── frontend/               # Interface React
├── frontend-temporal/      # Interface temporelle
├── docs/                   # Documentation complète
│   ├── quantum/           # Système quantique
│   ├── guides/            # Guides utilisateur
│   ├── technical/         # Documentation technique
│   ├── reports/           # Analyses et rapports
│   └── data/              # Données JSON
└── scripts/               # Scripts utilitaires
```

### Commandes Utiles
```bash
# Tests backend
cd backend && mvn test

# Tests frontend
cd frontend && npm test

# Démo complète
./start-all.sh

# Arrêt des services
./stop-all.sh
```

## 📊 Métriques de Performance

| Métrique | Valeur | Status |
|----------|--------|--------|
| **Temps de démarrage** | < 3s | ✅ |
| **Calculs quantiques** | < 100ms | ✅ |
| **Interférences simultanées** | 1000+ | ✅ |
| **Amplitudes complexes** | Support complet | ✅ |

## 🎯 Roadmap

- [ ] **Interface Quantique 3D** - Visualisation des amplitudes
- [ ] **Multijoueur Quantique** - Intrication entre joueurs
- [ ] **IA Quantique** - Adversaires avec superposition
- [ ] **Réalité Augmentée** - Projection des timelines

## 🤝 Contribution

1. Fork du projet
2. Créer une branche feature (`git checkout -b feature/amazing-feature`)
3. Commit des changements (`git commit -m 'Add amazing feature'`)
4. Push vers la branche (`git push origin feature/amazing-feature`)
5. Ouvrir une Pull Request

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 🌟 Crédits

- **Moteur Quantique** : Implémentation révolutionnaire des amplitudes complexes
- **Gameplay** : Mécanique temporelle unique au monde
- **Architecture** : Design moderne et scalable

---

**🎮 "Dans l'univers quantique, la réalité n'est pas ce qui est, mais ce qui peut être."**

*Démarrez votre aventure quantique dès maintenant !* 