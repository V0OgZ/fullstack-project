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

```hots
Tour 1 : ψ001: ⊙(Δt+2 @15,15 ⟶ MOV(Arthur, @15,15))
Tour 2 : ψ002: ⊙(Δt+1 @20,20 ⟶ CREATE(CREATURE, Dragon, @20,20))  
Tour 3 : †ψ001 → Arthur arrive en (15,15) ET le Dragon apparaît !
```

**🔗 Pensez à ça comme :**
- **ψ (Psi-state)** - Votre action programmée dans le futur
- **⊙ (Superposition)** - L'action existe mais n'est pas encore réelle
- **† (Collapse)** - L'action se déclenche et devient réelle
- **Δt+X** - Dans X tours, l'action se déclenchera

### 🎲 **Pourquoi c'est révolutionnaire ?**

Au lieu de jouer "action par action" comme les jeux classiques, vous jouez **"stratégie par stratégie"** :

- **🧠 Stratégique** - Anticipez les mouvements de l'adversaire
- **💫 Créatif** - Combinez vos actions de manière inattendue  
- **⚡ Dynamique** - Plusieurs choses se passent en même temps
- **🎯 Tactique** - Timing parfait = victoire

**💡 En résumé :** C'est comme jouer aux échecs, mais où vous pouvez programmer vos coups à l'avance et les voir s'exécuter de manière asynchrone !

*📚 Pour les détails techniques et mécaniques avancées, consultez la [documentation complète](docs/GAMEPLAY.md)*

## 🎭 Scénarios Épiques

### 🌟 **7 Aventures Temporelles Vous Attendent**

#### 👑 **L'Éclat des Mondes Dissolus** `[LÉGENDAIRE]`
*Duel épique de 25 tours entre Lysandrel le Forgeur de Réalité et Nyx-Lua la Tisseuse de Mondes*

> Dans les fragments éclatés du multivers, deux forces s'affrontent pour le contrôle de la réalité elle-même. Lysandrel maîtrise les amplitudes quantiques tandis que Nyx-Lua tisse les probabilités alternatives. Qui écrira l'histoire finale ?

**⚡ Mécaniques :** Amplitudes complexes, interférences quantiques, 6 artefacts légendaires  
**⏱️ Durée :** 60-90 minutes • **🎯 Difficulté :** LÉGENDAIRE

---

#### ⚔️ **Duel du Collapse** `[EXPERT]`
*Affrontement intense avec collapse de timeline en 8 tours*

> Deux maîtres temporels se défient dans un combat où chaque action peut effondrer la réalité. L'Œil de Wigner révèle les futurs possibles, mais seul le plus rapide survivra au collapse final.

**⚡ Mécaniques :** Collapse de timeline, artefacts quantiques, phantom warriors  
**⏱️ Durée :** 10-15 minutes • **🎯 Difficulté :** EXPERT

---

#### 🌀 **Fracture Binaire** `[MASTER]`
*Chaque joueur contrôle deux timelines parallèles*

> La réalité se scinde en deux. Chaque joueur doit gérer simultanément deux versions de lui-même dans des timelines parallèles. L'Infinity Codex pourrait être la clé pour réunifier les mondes... ou les détruire.

**⚡ Mécaniques :** Timelines multiples, gameplay asynchrone, void fragments  
**⏱️ Durée :** 25-35 minutes • **🎯 Difficulté :** MASTER

---

#### 👤 **Danse Illusoire** `[EXPERT]`
*Duel asymétrique entre joueur invisible et visible*

> L'un se bat dans l'ombre, l'autre dans la lumière. L'Encre Noire masque les intentions tandis que les Phantom Warriors dansent entre réalité et illusion. Qui trouvera son adversaire en premier ?

**⚡ Mécaniques :** Invisibilité, asymétrie, mind games, shadow minions  
**⏱️ Durée :** 15-20 minutes • **🎯 Difficulté :** EXPERT

---

#### 🏰 **La Garde du Nexus** `[HARD]`
*Défendre le Nexus Temporel contre des vagues d'ennemis*

> Le Nexus Temporel est attaqué ! Vagues après vagues, les Phantom Warriors déferlent. Seule l'Ancre de Réalité peut stabiliser le cœur du temps. Tiendrez-vous 6 tours ?

**⚡ Mécaniques :** Défense par vagues, survival, phantom champions  
**⏱️ Durée :** 15-20 minutes • **🎯 Difficulté :** HARD

---

#### 🗡️ **Vol de la Lame d'Avant-Monde** `[EXPERT]`
*Mission d'infiltration pour voler un artefact légendaire*

> La Lame d'Avant-Monde repose dans le repaire du Dragon Rouge. Une mission de stealth parfaite : infiltrez, volez, échappez-vous. Mais le dragon dort d'un œil seulement...

**⚡ Mécaniques :** Infiltration, stealth, dragon boss, theft  
**⏱️ Durée :** 12-18 minutes • **�� Difficulté :** EXPERT

---

#### 🐉 **Le Souffle du Dragon** `[ULTIMATE]`
*Affrontement épique contre un Dragon Rouge - une seule chance*

> Le Dragon Rouge s'éveille ! Vous n'avez que 5 tours et une seule chance de le vaincre. L'Orbe du Collapse pourrait être votre salut... ou votre perte. Perfection requise.

**⚡ Mécaniques :** Boss fight, one-shot, perfection absolue requise  
**⏱️ Durée :** 8-12 minutes • **🎯 Difficulté :** ULTIMATE

---

### 🎯 **Recommandations**

- **🔰 Premiers pas :** Commencez par *La Garde du Nexus* puis *Duel du Collapse*
- **⚔️ Fans de PvP :** *Duel du Collapse* → *Danse Illusoire* → *L'Éclat des Mondes Dissolus*
- **🤖 Amateurs de PvE :** *La Garde du Nexus* → *Vol de la Lame* → *Le Souffle du Dragon*
- **🧠 Maîtres quantiques :** *Fracture Binaire* et *L'Éclat des Mondes Dissolus*

*🎮 Tous les scénarios incluent des mécaniques temporelles uniques et des artefacts légendaires !*

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