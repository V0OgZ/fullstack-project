# 🕰️ Heroes of Time - Référence du Langage de Script

## 📋 **Table des Matières**
1. [Vue d'ensemble](#vue-densemble)
2. [Syntaxe de base](#syntaxe-de-base)
3. [Commandes principales](#commandes-principales)
4. [ψ-states (Superpositions)](#ψ-states-superpositions)
5. [Triggers d'observation](#triggers-dobservation)
6. [Collapses temporels](#collapses-temporels)
7. [Actions avancées](#actions-avancées)
8. [Exemples pratiques](#exemples-pratiques)
9. [API Endpoints](#api-endpoints)

---

## 🎯 **Vue d'ensemble**

Le langage de script Heroes of Time est un langage de programmation temporel qui permet de contrôler des héros, créer des objets, et manipuler le temps à travers des superpositions quantiques.

### **Concepts Clés**
- **Héros** : Personnages contrôlables
- **Coordonnées** : Positions sur la carte (@x,y)
- **ψ-states** : Superpositions temporelles
- **Triggers** : Observations automatiques
- **Collapses** : Réduction des superpositions

---

## 🔤 **Syntaxe de Base**

### **Coordonnées**
```
@x,y          # Position absolue
@10,15        # Exemple : position (10, 15)
```

### **Références**
```
HERO:nom      # Référence à un héros
ITEM:nom      # Référence à un objet
CREATURE:nom  # Référence à une créature
```

### **Temps**
```
Δt+n         # Temps relatif (+n tours)
Δt+2         # Dans 2 tours
Δt+5         # Dans 5 tours
```

---

## 🎮 **Commandes Principales**

### **1. Création de Héros**
```javascript
HERO(nom)
```
**Exemples :**
```javascript
HERO(Arthur)    // Crée le héros Arthur
HERO(Ragnar)    // Crée le héros Ragnar
HERO(Morgana)   // Crée le héros Morgana
```

### **2. Déplacement**
```javascript
MOV(héros, @x,y)
```
**Exemples :**
```javascript
MOV(Arthur, @10,10)     // Arthur va en (10,10)
MOV(Ragnar, @15,15)     // Ragnar va en (15,15)
```

### **3. Création d'Objets**
```javascript
CREATE(type, nom, @x,y)
```
**Types disponibles :**
- `ITEM` : Artefacts et objets
- `CREATURE` : Créatures
- `STRUCTURE` : Bâtiments

**Exemples :**
```javascript
CREATE(ITEM, AvantWorldBlade, @10,10)      // Épée d'Avant-Monde
CREATE(ITEM, ReverseClock, @15,15)         // Horloge Inversée
CREATE(CREATURE, Dragon, @20,20)           // Dragon
CREATE(STRUCTURE, Tower, @25,25)           // Tour
```

### **4. Utilisation d'Objets**
```javascript
USE(ITEM, nom, HERO:héros)
```
**Exemples :**
```javascript
USE(ITEM, AvantWorldBlade, HERO:Arthur)    // Arthur utilise l'épée
USE(ITEM, ReverseClock, HERO:Ragnar)       // Ragnar utilise l'horloge
```

---

## 🌀 **ψ-states (Superpositions)**

Les ψ-states permettent de créer des actions en superposition temporelle qui s'exécutent à un moment futur spécifique.

### **Syntaxe**
```javascript
ψ001: ⊙(Δt+temps @x,y ⟶ action)
```

### **Exemples**
```javascript
// Déplacement en superposition
ψ001: ⊙(Δt+2 @12,12 ⟶ MOV(HERO, Arthur, @12,12))

// Création d'objet en superposition
ψ002: ⊙(Δt+3 @18,18 ⟶ CREATE(CREATURE, Dragon, @18,18))

// Combat en superposition
ψ003: ⊙(Δt+1 @22,22 ⟶ BATTLE(HERO Arthur, CREATURE Dragon))

// Utilisation d'artefact en superposition
ψ004: ⊙(Δt+4 @14,14 ⟶ USE(ITEM, ReverseClock, HERO:Ragnar))
```

---

## 🎯 **Triggers d'Observation**

Les triggers permettent de déclencher automatiquement des collapses basés sur des conditions observées.

### **Syntaxe**
```javascript
Π(condition) ⇒ †ψ001
```

### **Types de Conditions**
- **Position** : `Arthur enters @x,y`
- **Santé** : `Ragnar hp < 50`
- **Apparition** : `Dragon appears @x,y`
- **Joueur** : `Player enters @x,y`
- **Temps** : `at Δt+2`

### **Exemples**
```javascript
// Trigger de position
Π(Arthur enters @12,12 at Δt+2) ⇒ †ψ001

// Trigger de santé
Π(Ragnar hp < 50) ⇒ †ψ002

// Trigger d'apparition
Π(Dragon appears @18,18) ⇒ †ψ003

// Trigger de joueur
Π(Player enters @20,20) ⇒ †ψ004
```

---

## 💥 **Collapses Temporels**

Les collapses réduisent les superpositions en actions concrètes.

### **Syntaxe**
```javascript
†ψ001           // Collapse de ψ001
†ψ002           // Collapse de ψ002
†*              // Collapse de toutes les ψ-states
```

### **Exemples**
```javascript
†ψ001           // Réduit la superposition ψ001
†ψ002           // Réduit la superposition ψ002
†ψ003           // Réduit la superposition ψ003
```

---

## ⚡ **Actions Avancées**

### **Combat**
```javascript
BATTLE(héros1, héros2)
BATTLE(Arthur, Dragon)
```

### **Téléportation**
```javascript
TELEPORT(héros, @x,y)
TELEPORT(Merlin, @5,5)
```

### **Guérison**
```javascript
HEAL(héros, points)
HEAL(Arthur, 50)
```

### **Buffs**
```javascript
BUFF(héros, type, valeur)
BUFF(Ragnar, STRENGTH, 10)
BUFF(Morgana, MAGIC, 15)
```

---

## 🎯 **Exemples Pratiques**

### **Scénario 1 : Combat Temporel**
```javascript
// 1. Créer les héros
HERO(Arthur)
HERO(Dragon)

// 2. Les positionner
MOV(Arthur, @10,10)
MOV(Dragon, @15,15)

// 3. Créer une superposition de combat
ψ001: ⊙(Δt+2 @12,12 ⟶ BATTLE(Arthur, Dragon))

// 4. Trigger automatique
Π(Arthur enters @12,12) ⇒ †ψ001

// 5. Arthur se déplace - déclenche le combat
MOV(Arthur, @12,12)
```

### **Scénario 2 : Artefacts Temporels**
```javascript
// 1. Créer héros et artefact
HERO(Ragnar)
CREATE(ITEM, ReverseClock, @20,20)

// 2. Superposition d'utilisation
ψ002: ⊙(Δt+3 @20,20 ⟶ USE(ITEM, ReverseClock, HERO:Ragnar))

// 3. Trigger conditionnel
Π(Ragnar hp < 30) ⇒ †ψ002

// 4. En cas de danger, l'artefact s'active automatiquement
```

### **Scénario 3 : Invocation Conditionnelle**
```javascript
// 1. Créer héros
HERO(Morgana)

// 2. Superposition de dragon
ψ003: ⊙(Δt+1 @25,25 ⟶ CREATE(CREATURE, Dragon, @25,25))

// 3. Trigger de défense
Π(Player enters @25,25) ⇒ †ψ003

// 4. Le dragon apparaît si zone envahie
```

---

## 🌐 **API Endpoints**

### **Gestion des Jeux**
```bash
# Créer un jeu
POST /api/temporal/games
{"gameName": "Mon Jeu", "playerId": "player1"}

# Exécuter un script
POST /api/temporal/games/{id}/script
{"script": "HERO(Arthur)"}

# État du jeu
GET /api/temporal/games/{id}/state
```

### **Triggers d'Observation**
```bash
# Enregistrer trigger
POST /api/temporal/games/{id}/observation-trigger
{"trigger": "Π(Arthur enters @10,10) ⇒ †ψ001"}

# Vérifier triggers
POST /api/temporal/games/{id}/check-triggers
```

### **Cache et Performance**
```bash
# Statistiques cache
GET /api/temporal/cache/stats

# Optimisation
POST /api/temporal/optimize
```

---

## 🏆 **Artefacts Disponibles**

### **Artefacts Temporels**
- **AvantWorldBlade** : Épée d'Avant-Monde
- **ReverseClock** : Horloge Inversée
- **IgnoreBeacon** : Phare d'Ignorance
- **AnchorTower** : Tour d'Ancrage
- **ApocalypseHorn** : Corne d'Apocalypse
- **TemporalShard** : Éclat Temporel
- **TimeEcho** : Écho du Temps
- **NexusCrystal** : Cristal de Nexus

### **Créatures**
- **Dragon** : Dragon puissant
- **Phoenix** : Phénix immortel
- **Golem** : Golem de pierre
- **Elemental** : Élémentaire

### **Structures**
- **Tower** : Tour de défense
- **Portal** : Portail magique
- **Altar** : Autel mystique
- **Fortress** : Forteresse

---

## 🚀 **Interfaces Disponibles**

### **Frontend Classique**
- **URL** : http://localhost:8000/
- **Fonctionnalités** : Console de script, visualisation hexagonale
- **Utilisation** : Cliquer "New Game" puis utiliser la console

### **Frontend Temporel**
- **URL** : http://localhost:5173/
- **Fonctionnalités** : Interface avancée avec épée temporelle
- **Utilisation** : Interface graphique complète

### **Backend API**
- **URL** : http://localhost:8080/api/temporal/health
- **Fonctionnalités** : Tous les endpoints du moteur temporel
- **Utilisation** : Intégration via API REST

---

## 📝 **Script de Démonstration**

Pour lancer la démonstration complète :
```bash
./demo-heroes-of-time-script.sh
```

Le script crée automatiquement un jeu et démontre toutes les fonctionnalités du langage.

---

## 🎯 **Conclusion**

Le langage Heroes of Time offre un contrôle complet sur :
- ✅ Création et gestion des héros
- ✅ Déplacements tactiques
- ✅ Artefacts et objets magiques
- ✅ Superpositions temporelles (ψ-states)
- ✅ Triggers d'observation automatiques
- ✅ Collapses quantiques
- ✅ Actions avancées de combat
- ✅ Optimisation du moteur temporel

**🚀 PRÊT À EXPLORER LES POSSIBILITÉS INFINIES DU TEMPS !**

---

*Référence complète du langage Heroes of Time - Version 1.0*
*Mise à jour : 18 juillet 2025* 