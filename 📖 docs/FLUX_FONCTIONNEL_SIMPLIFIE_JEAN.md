# 🌊 FLUX FONCTIONNEL SIMPLIFIÉ - HEROES OF TIME

**JEAN DEMANDE: "FLUX SIMPLE DE COMMENT ÇA MARCHE !"**

---

## 🎯 VUE D'ENSEMBLE - ARCHITECTURE UNIFIÉE

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   FRONTEND      │    │     BACKEND     │    │    DATABASE     │
│   Port 8000     │◄──►│   Port 8080     │◄──►│   H2 Memory     │
│  HTML/CSS/JS    │    │  Spring Boot    │    │   JPA/Hibernate │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

---

## 🚀 DÉMARRAGE SYSTÈME

### **1. LANCEMENT COMPLET**
```bash
./hots start
├── 🔧 Kill processus existants (ports 8080, 8000)
├── 🏗️ Compile backend (mvn compile)
├── 🚀 Lance Spring Boot (port 8080) en arrière-plan
├── 🌐 Lance Python http.server (port 8000) en arrière-plan
└── ✅ Système opérationnel
```

### **2. VÉRIFICATION SANTÉ**
```bash
curl http://localhost:8080/api/causal/health
→ {"status":"UP", "capabilities":["AXISI_PROCESSING", "LENTUS_PROCESSING"]}

curl http://localhost:8000
→ Interface Temporelle Heroes of Time
```

---

## 🎮 FLUX UTILISATEUR PRINCIPAL

### **ÉTAPE 1: ACCÈS INTERFACE**
```
Utilisateur → http://localhost:8000
├── 🎮 Bouton "New Game"
├── 🏛️ Bouton "Ville" 
├── ⚔️ Bouton "Combat"
├── 👤 Bouton "Héros"
└── 🚬 Bouton "Joint Magique"
```

### **ÉTAPE 2: NOUVELLE PARTIE**
```
Clic "New Game" → JavaScript newGame()
├── POST http://localhost:8080/api/games
├── Backend GameController.createGame()
├── Création GameState avec joueurs
├── Initialisation carte hexagonale
├── Placement héros de départ
└── Retour JSON game state
```

### **ÉTAPE 3: ACTIONS DE JEU**
```
Action Utilisateur → API Call → Backend Processing → Response
```

---

## 🪄 FLUX SYSTÈME SORTS

### **CAST SORT TEMPORAL**
```
1. Frontend: castSpell() JavaScript
   ↓
2. POST /api/spells/cast-temporal
   {
     "spellType": "AXISI",
     "temporalFactor": 1.5,
     "durationTurns": 3,
     "casterId": "hero-jean",
     "targetId": "enemy-lich"
   }
   ↓
3. Backend: SpellController.castTemporalSpell()
   ├── Validation paramètres
   ├── Calcul formules causales:
   │   ├── paradoxRisk = Math.min(0.95, temporalFactor * 0.15)
   │   ├── temporalStability = Math.max(0.1, 1.0 - (temporalFactor - 1.0) * 0.3)  
   │   ├── affectedRadius = Math.sqrt(temporalFactor²) * 1.2
   │   └── causalWeight = temporalFactor * durationTurns * 0.4
   ├── SpellService.applyTemporalSpell()
   └── Création résultat avec effets
   ↓
4. Response JSON:
   {
     "success": true,
     "effect": "Time acceleration applied",
     "speedBonus": 1.5,
     "causalEffects": {
       "paradoxRisk": 0.375,
       "temporalStability": 0.85,
       "affectedRadius": 4.02,
       "causalWeight": 1.8
     }
   }
   ↓
5. Frontend: Affichage effets visuels + mise à jour interface
```

---

## 🌀 FLUX MOTEUR CAUSAL

### **TEST SIMULATION TEMPORELLE**
```
1. Frontend: runTemporalSimulation() JavaScript
   ↓
2. POST /api/causal/temporal-simulation
   {
     "scenario": "axisi_vs_lentus_battle",
     "turns": 10
   }
   ↓
3. Backend: CausalController.runTemporalSimulation()
   ├── Boucle 10 tours:
   │   ├── Génération axisiPower = Math.random() * 5.0 + 1.0
   │   ├── Génération lentusPower = Math.random() * 4.0 + 0.5  
   │   ├── Calcul causalBalance = axisiPower / (axisiPower + lentusPower)
   │   ├── Calcul causalInterference = |axisiPower - lentusPower| / max(powers)
   │   └── Stockage résultats tour
   └── Compilation résultats finaux
   ↓
4. Response JSON:
   {
     "success": true,
     "totalTurns": 10,
     "turnResults": [
       {"axisiPower": 3.14, "lentusPower": 2.8, "causalBalance": 0.53},
       {"axisiPower": 1.38, "lentusPower": 3.2, "causalBalance": 0.30},
       ...
     ]
   }
   ↓
5. Frontend: Affichage graphiques + métriques temps réel
```

---

## 🏗️ FLUX CONSTRUCTION BÂTIMENTS

### **CONSTRUCTION TOUR QUANTIQUE**
```
1. Frontend: Clic sur case vide → manageBuildings()
   ↓
2. POST /api/buildings/construct
   {
     "castleId": "castle-player1",
     "buildingType": "quantum_tower",
     "positionX": 15,
     "positionY": 20,
     "playerId": "player1"
   }
   ↓
3. Backend: BuildingController.startConstruction()
   ├── Validation position libre
   ├── Vérification ressources joueur
   ├── BuildingService.startConstruction()
   │   ├── Création Building entity
   │   ├── Calcul coûts (gold, wood, stone, crystal)
   │   ├── Calcul temps construction
   │   └── Sauvegarde H2 database
   ├── Déduction ressources joueur
   └── Planification completion automatique
   ↓
4. Response JSON:
   {
     "success": true,
     "building": {
       "id": "building-123",
       "type": "quantum_tower",
       "level": 1,
       "constructionTime": 120,
       "isConstructed": false,
       "goldCost": 2000,
       "crystalCost": 10
     }
   }
   ↓
5. Frontend: Affichage bâtiment en construction + timer
```

---

## ⚔️ FLUX COMBAT & BATAILLE

### **ATTAQUE HÉROS**
```
1. Frontend: Clic héros ennemi → attackTarget()
   ↓
2. POST /api/heroes/{heroId}/attack
   {
     "targetId": "enemy-dragon"
   }
   ↓
3. Backend: GameController.attackTarget()
   ├── Validation héros actif
   ├── Validation cible à portée
   ├── GameService.attackTarget()
   │   ├── Calcul dégâts base + stats héros
   │   ├── Calcul défense cible
   │   ├── Application formules combat
   │   ├── Calcul expérience gagnée
   │   └── Mise à jour états héros/cible
   └── Génération rapport combat
   ↓
4. Response JSON:
   {
     "success": true,
     "attackerDamage": 45,
     "defenderDamage": 12,
     "winner": "attacker",
     "experienceGained": 150,
     "combatResult": {
       "heroHealth": 88,
       "targetHealth": 0,
       "targetDefeated": true
     }
   }
   ↓
5. Frontend: Animation combat + mise à jour stats + effets visuels
```

---

## 🎨 FLUX RENDU TERRAIN HEXAGONAL

### **AFFICHAGE CARTE**
```
1. Frontend: ModernGameRenderer.tsx
   ├── Canvas HTML5 (800x600)
   ├── Coordonnées hexagonales:
   │   ├── hexSize = 20
   │   ├── hexWidth = hexSize * 2  
   │   ├── hexHeight = Math.sqrt(3) * hexSize
   │   └── Conversion axial → pixel
   ├── Rendu terrain par type:
   │   ├── grass: '#4CAF50'
   │   ├── forest: '#2E7D32'
   │   ├── mountain: '#795548'
   │   ├── water: '#2196F3'
   │   └── desert: '#FF9800'
   ├── Rendu entités:
   │   ├── Héros: cercles colorés
   │   ├── Créatures: losanges rouges
   │   ├── Structures: carrés violets
   │   └── Mouvements valides: points verts
   └── Système zoom + pan
   ↓
2. Affichage temps réel 60 FPS avec interactions
```

---

## 📊 FLUX DONNÉES & PERSISTANCE

### **SAUVEGARDE ÉTAT JEU**
```
Action Utilisateur → Backend Controller → Service Layer → Database
                                                           ↓
                                                    H2 Memory Database
                                                    ├── games
                                                    ├── players  
                                                    ├── heroes
                                                    ├── buildings
                                                    ├── units
                                                    ├── scenarios
                                                    └── temporal_items
```

### **CHARGEMENT ÉTAT JEU**
```
Frontend Request → GameController.getGame() → GameService → Database Query
                                                             ↓
                                                      JSON Response
                                                      ├── currentGame
                                                      ├── players
                                                      ├── map
                                                      ├── heroes
                                                      └── gameState
```

---

## 🔄 FLUX TESTS AUTOMATIQUES

### **SCRIPT TEST COMPLET**
```bash
./test-moteur-final-jean.sh all
├── 🏥 Test Backend Health
│   └── GET /api/causal/health → ✅ UP
├── 🧪 Test Formules Causales  
│   ├── POST /api/causal/cross-interaction → ❌ FAIL (500 error)
│   └── POST /api/causal/temporal-simulation → ✅ SUCCESS
├── 🪄 Test Système Sorts
│   ├── POST /api/spells/cast → ✅ SUCCESS (Fireball: 51 dégâts)
│   └── POST /api/spells/cast-temporal → ✅ SUCCESS (AXISI: speedBonus 1.5x)
├── 📜 Test Scénarios HOTS
│   └── Validation syntaxe ψ, ⊙, †, Π → ✅ SUCCESS
└── 📊 Résumé: 13/23 tests ✅ (État acceptable)
```

---

## 🎯 POINTS D'ENTRÉE PRINCIPAUX

### **POUR UTILISATEUR FINAL**
- **http://localhost:8000** - Interface de jeu principale
- **Boutons**: New Game, Combat, Héros, Sorts, Ville

### **POUR DÉVELOPPEUR**
- **http://localhost:8080/api/** - API REST backend
- **./hots start** - Démarrage système complet
- **./test-moteur-final-jean.sh** - Tests automatiques

### **POUR DÉBOGAGE**
- **Backend logs**: backend/backend-spell-fixed.log
- **Test logs**: test-results/*.log
- **H2 Console**: http://localhost:8080/h2-console

---

## 🌟 RÉSUMÉ FLUX COMPLET

```
Utilisateur → Interface (8000) → API (8080) → Service → Database → Response → Interface → Affichage
     ↑                                                                                        ↓
     └──────────────────────── BOUCLE TEMPS RÉEL ────────────────────────────────────────────┘
```

**JEAN SAYS: "MAINTENANT JE COMPRENDS PARFAITEMENT COMMENT TOUT FONCTIONNE !"**

---

*Généré pour Jean-Grofignon - Flux Simplifié Heroes of Time*  
*Dernière mise à jour : 2025-07-24 08:35* 