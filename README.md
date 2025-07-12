# 🎮 Heroes Reforged - Revolutionary Asynchronous Strategy Game

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-19-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-2.7.18-green.svg)](https://spring.io/projects/spring-boot)

> **Un jeu de stratégie multijoueur asynchrone révolutionnaire** inspiré de Heroes of Might and Magic III, avec un système unique de **Zones de Causalité Temporelle (ZFC)** et une gestion politique inspirée de Perestroika.

## 🌟 Fonctionnalités Révolutionnaires

### 🔮 **Système ZFC (Zones de Causalité)**
- **Zones temporelles dynamiques** calculées en temps réel
- **Gameplay asynchrone** sans contraintes de temps
- **Résolution intelligente** des conflits spatio-temporels
- **Visualisation moderne** avec animations fluides

### 🏛️ **Système Politique (Inspiré de Perestroika)**
- **Conseil de conseillers** avec 4 spécialistes (Militaire, Économique, Diplomatique, Scientifique)
- **Événements de crise** avec choix multiples et conséquences
- **Système de réputation** internationale et domestique
- **Débats internes** avec recommandations contradictoires

### 🎨 **Interface Moderne**
- **Rendu Canvas 2D** optimisé avec animations 60 FPS
- **Système hexagonal** avec calculs précis
- **Effets de particules** et interactions riches
- **Design responsive** pour desktop et mobile

## 🚀 Démarrage Rapide

### Prérequis
- **Node.js** 16+ et npm
- **Java 17+** (via SDKMAN recommandé)
- **Maven** 3.6+

### Installation

```bash
# Cloner le repository
git clone https://github.com/V0OgZ/heroes-reforged.git
cd heroes-reforged

# Backend (Terminal 1)
cd backend
mvn spring-boot:run

# Frontend (Terminal 2)
cd frontend
npm install
npm start
```

### Accès
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080

## 🎮 Guide de Jeu

### Commandes Principales
- **Clic gauche** : Sélectionner une case/héros
- **Survol** : Afficher les informations
- **🏛️ Conseil Politique** : Accéder aux décisions stratégiques
- **👁️ ZFC** : Visualiser les zones de causalité
- **📋 Timeline** : Gérer les actions en attente

### Système ZFC
1. **Planifiez vos actions** - Elles s'exécutent automatiquement
2. **Visualisez les zones** - Vos actions possibles en vert
3. **Évitez les conflits** - Zones rouges = synchronisation obligatoire
4. **Exploitez l'asynchrone** - Jouez sans attendre les autres

### Système Politique
1. **Consultez vos conseillers** - Opinions et recommandations
2. **Gérez les crises** - Décisions rapides requises
3. **Surveillez votre réputation** - Impact sur les relations
4. **Anticipez les conséquences** - Effets à long terme

## 🛠️ Architecture Technique

### Frontend
- **React 19** avec TypeScript
- **Zustand** pour la gestion d'état
- **Canvas 2D** pour le rendu optimisé
- **CSS Modules** pour le styling

### Backend
- **Spring Boot 2.7.18** avec Java 17
- **H2 Database** (en mémoire pour le développement)
- **REST API** avec CORS configuré
- **Architecture hexagonale** pour la testabilité

### Innovations Techniques
- **Système ZFC** : Première implémentation de zones temporelles
- **Rendu Canvas** : Performance optimisée 60 FPS
- **Calculs hexagonaux** : Algorithmes précis pour les grilles
- **État réactif** : Synchronisation temps réel

## 🎯 Roadmap

### Version 1.0 (Actuelle)
- ✅ Système ZFC fonctionnel
- ✅ Interface Canvas moderne
- ✅ Système politique complet
- ✅ Mode Hot Seat

### Version 1.1 (Prochaine)
- 🔄 Multijoueur en ligne
- 🔄 Support multilingue
- 🔄 Optimisations mobile
- 🔄 Plus d'événements politiques

### Version 2.0 (Future)
- 📋 Campagne solo
- 📋 Éditeur de cartes
- 📋 Mods communautaires
- 📋 Tournois en ligne

## 🤝 Contribution

Les contributions sont les bienvenues ! Voir [CONTRIBUTING.md](CONTRIBUTING.md) pour les guidelines.

### Développement Local

```bash
# Installer les dépendances
npm install

# Lancer en mode développement
npm start

# Construire pour la production
npm run build

# Lancer les tests
npm test
```

## 📝 Documentation

- [**Guide de Développement**](DEVELOPMENT_LOG.md)
- [**Analyse du Jeu**](GAME_ANALYSIS_AND_IMPROVEMENTS.md)
- [**Résumé des Améliorations**](IMPROVEMENTS_SUMMARY.md)
- [**Spécifications Complètes**](Heroes_Reforged_Full_GameSpec.md)

## 🏆 Crédits

### Développement
- **Conception & Développement** : [V0OgZ](https://github.com/V0OgZ)
- **Système ZFC** : Innovation originale
- **Inspiration** : Heroes of Might and Magic III, Crisis in the Kremlin

### Assets
- **Textures** : [OpenGameArt.org](https://opengameart.org/) (CC0 License)
- **Police** : Cinzel (Google Fonts)
- **Icônes** : Emojis Unicode

## 📄 Licence

Ce projet est sous licence MIT. Voir [LICENSE](LICENSE) pour plus de détails.

## 🌐 Liens

- **Repository** : https://github.com/V0OgZ/heroes-reforged
- **Issues** : https://github.com/V0OgZ/heroes-reforged/issues
- **Wiki** : https://github.com/V0OgZ/heroes-reforged/wiki

---

**Fait avec ❤️ par [V0OgZ](https://github.com/V0OgZ)**

*"Révolutionner le genre stratégique avec l'innovation des zones temporelles"* 