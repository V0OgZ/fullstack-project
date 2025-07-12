# Heroes of Time 🎮⚔️

**Un jeu de stratégie révolutionnaire combinant Heroes of Might & Magic avec des mécaniques temporelles avancées**

[![Backend Status](https://img.shields.io/badge/Backend-✅%20Functional-brightgreen)](http://localhost:8080/api/health)
[![Frontend Status](https://img.shields.io/badge/Frontend-✅%20Compiles-brightgreen)](#)
[![Integration](https://img.shields.io/badge/Integration-🔄%20Progressive-yellow)](#)

## 🏗️ Architecture Technique

### **Stack Technologique**
```
Frontend: React 18 + TypeScript + Tailwind CSS
Backend:  Spring Boot 2.7 + Java 17 + H2 Database  
Build:    Maven + npm + Create React App
Deploy:   Localhost (Dev) → GitHub Pages (Frontend) + Heroku (Backend)
```

### **Structure du Projet**
```
fullstack-project/
├── frontend/          # React + TypeScript application
│   ├── src/types/     # ✅ Complete type definitions (4 phases)
│   ├── src/components/# ✅ Game interfaces + Backend tester
│   └── src/services/  # ✅ API integration layer
├── backend/           # ✅ Spring Boot REST API 
│   ├── src/main/java/ # ✅ Real game logic (not mock!)
│   └── src/resources/ # ✅ Configuration
└── docs/              # ✅ Complete specifications
```

### **⚠️ Architecture critique**
```bash
# CURRENT STATUS: Backend intégré progressivement
✅ Backend: Spring Boot avec vraies données de jeu
✅ Frontend: Interface fonctionnelle + testeur backend
🔄 Integration: Progressive (calculs migrent vers serveur)
```

## 🎮 État des Fonctionnalités

### **✅ PHASE 2A : Châteaux & Unités (Q1 2025)**
| Feature | Status | Détails |
|---------|--------|---------|
| 🏰 Châteaux | ✅ **8/8 Complets** | Castle, Rampart, Tower, Inferno, Necropolis, Dungeon, Stronghold, Fortress |
| 🛡️ Unités | ⚠️ **9/168 Implémentées** | Castle tier 1-3 détaillés, 159 unités restantes |
| 💰 Ressources | ✅ **7/7 Système Complet** | gold, wood, stone, ore, crystal, gems, sulfur |
| 🏗️ Bâtiments | ✅ **Base Implémentée** | Town Hall, Barracks, Archery Range, Griffin Tower |

### **✅ PHASE 2B : Combat & Magie (Q2 2025)**
| Feature | Status | Détails |
|---------|--------|---------|
| 🔮 Sorts | ⚠️ **28/70 Implémentés** | Air (14) + Fire (14), manque Water/Earth/Death |
| 🏺 Artefacts | ⚠️ **5/150+ Implémentés** | 3 armes + 2 armures légendaires |
| ⚔️ Combat Tactique | ✅ **Système Complet** | Hex positions, initiative, dégâts, terrains |
| 🎲 Morale & Chance | ✅ **Système Complet** | 7 niveaux chacun, effets détaillés |

### **✅ PHASE 3 : ZFC Avancé (Q3 2025)**
| Feature | Status | Détails |
|---------|--------|---------|
| 🕰️ Sorts Temporels | ✅ **6/6 Complets** | Level 1-6, reality-altering |
| 🌀 Zones Quantiques | ✅ **Système Complet** | Superposition, entanglement, collapse |
| ⚡ Paradoxes | ✅ **Moteur Complet** | 5 types, résolution automatique/manuelle |
| 🎭 Actions d'Ombre | ✅ **Système Complet** | Bluff, détection, IA avancée |
| 🔥 Chronoflame | ✅ **5 Types Complets** | Chronoflame, Aetheric Pyre, Void Ember... |

### **✅ PHASE 4 : Système Politique (Q4 2025)**
| Feature | Status | Détails |
|---------|--------|---------|
| 👨‍💼 Conseillers | ✅ **4/4 Complets** | Volkov, Petrova, Kozlov, Ivanova |
| 🚨 Événements de Crise | ✅ **4 Catégories** | Military, Economic, Diplomatic, Scientific |
| 📊 Réputation | ✅ **6 Types Complets** | International, Domestic, Military, Economic, Diplomatic, Scientific |
| 🎨 Interface Politique | ✅ **UI Complète** | Glassmorphism design, animations |

## 🔗 API Endpoints (Backend Intégré)

### **Gestion des Parties**
```bash
GET    /api/health                     # ✅ Health check
GET    /api/games/available           # ✅ Parties disponibles  
POST   /api/games                     # ✅ Créer partie
GET    /api/games/{id}                # ✅ État de la partie
```

### **Actions des Héros (ZFC Server-Side)**
```bash
POST   /api/heroes/{id}/move          # ✅ Mouvement avec calculs ZFC
POST   /api/heroes/{id}/attack        # ✅ Combat avec prédictions
POST   /api/heroes/{id}/collect       # ✅ Collecte de ressources
```

### **Système Temporel**
```bash
GET    /api/games/{id}/actions/pending # ✅ Actions en attente ZFC
POST   /api/actions/{id}/cancel       # ✅ Annulation d'actions
POST   /api/games/{id}/end-turn       # ✅ Traitement des tours
```

## 🚀 Installation & Développement

### **Prérequis**
```bash
Java 17+, Maven 3.8+, Node 18+, npm 8+
```

### **Démarrage Rapide**
```bash
# Backend (Terminal 1)
cd backend
mvn spring-boot:run                   # → http://localhost:8080

# Frontend (Terminal 2)  
cd frontend
npm install && npm start             # → http://localhost:3000

# Test Integration
curl http://localhost:8080/api/health # → {"status":"UP"}
```

### **Tests Backend**
```bash
# Tester les vraies données
curl -X POST http://localhost:8080/api/games \
  -H "Content-Type: application/json" \
  -d '{"scenario": "conquest-classique"}'

# Interface de test intégrée
open http://localhost:3000/backend-test
```

## 🎯 Performances

### **Métriques de Performance**
```
Backend startup: ~1.5s
Frontend build:  ~15s  
API response:    <100ms
Memory usage:    <512MB
```

### **Optimisations Implémentées**
- **Spring Boot**: Configuration H2 en mémoire
- **React**: Code splitting automatique
- **API**: Calculs ZFC optimisés côté serveur
- **Frontend**: Bundle size < 100KB gzipped

## 🎮 Gameplay Features

### **Scénarios Disponibles**
1. **🏰 Conquête Classique** - Heroes traditionnel avec mécaniques modernes
2. **🔮 Conquête Mystique** - Même interface + objets temporels

### **Mécaniques Uniques**
- **Zones de Causalité Future (ZFC)** : Actions planifiées avec calculs temporels
- **Combat Hexagonal** : Tactiques avancées sur grille hexagonale  
- **Système Politique** : Conseillers Perestroika avec débats dynamiques
- **Magie Temporelle** : 6 niveaux de sorts reality-altering
- **Actions d'Ombre** : Système de bluff avec IA de détection

## 📋 Roadmap de Développement

### **🔄 Priorité Immédiate**
1. **Compléter les Unités** : 159/168 unités restantes (7 châteaux × 7 tiers × 3 variants)
2. **Compléter la Magie** : Water/Earth/Death schools (42 sorts restants)
3. **Compléter les Artefacts** : 145+ artefacts restants
4. **Interface de Jeu** : Connecter l'interface principale au backend

### **🎯 Prochaines Étapes**
1. **Multijoueur Temps Réel** : WebSocket integration
2. **Base de Données Persistante** : Migration H2 → PostgreSQL
3. **Déploiement Production** : Heroku + GitHub Pages
4. **Tests Automatisés** : Jest + JUnit coverage

### **🚀 Vision Long Terme**
- **Mobile App** : React Native version
- **Tournaments** : Competitive multiplayer
- **Mod Support** : User-generated content
- **VR Mode** : Immersive 3D battles

## 📖 Documentation Complète

- **[Spécifications Complètes](HEROES_REFORGED_COMPLETE_SPEC.md)** - Document maître 4 phases
- **[Configuration GitHub](GITHUB_SETUP.md)** - Guide de déploiement
- **[Analyse du Jeu](GAME_ANALYSIS_AND_IMPROVEMENTS.md)** - Design decisions
- **[API Reference](backend/src/main/java/)** - Documentation du code

## 🤝 Contribution

### **Getting Started**
```bash
git clone https://github.com/V0OgZ/Heroes-of-Time.git
cd Heroes-of-Time
# Suivre les instructions d'installation ci-dessus
```

### **Pull Request Process**
1. Fork le repository
2. Créer une feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branch (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📊 État du Projet

**Dernière mise à jour** : Décembre 2024  
**Statut** : Active Development  
**Prochaine release** : Q1 2025 (Unités complètes)

---

> "Un jeu qui redéfinit le genre stratégique en intégrant des mécaniques temporelles révolutionnaires dans un framework Heroes of Might & Magic moderne."

**Construit avec ❤️ par l'équipe Heroes of Time** 
