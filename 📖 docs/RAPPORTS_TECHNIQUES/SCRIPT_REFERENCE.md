# 📜 Heroes of Time - Référence des Scripts

## 🎯 Vue d'ensemble

Les scripts Heroes of Time (fichiers `.hots`) permettent de contrôler le moteur temporel du jeu. Ils combinent des commandes classiques de Heroes of Might & Magic 3 avec des mécaniques quantiques temporelles.

## 📝 Syntaxe de base

### **Commandes Heroes of Might & Magic 3**

```javascript
// Gestion des héros
HERO(Arthur)                    // Créer un héros
MOV(Arthur, @125,64)           // Déplacer un héros
LEVELUP(Arthur, Attack)        // Monter de niveau

// Gestion des créatures
CREATE(CREATURE, Dragon, @126,65) // Créer une créature
RECRUIT(Archer, 50, Arthur)    // Recruter des unités
BATTLE(Arthur, Enemy)          // Initier un combat

// Gestion des villes
BUILD(Castle, @128,64)         // Construire une structure
COLLECT(Gold, 1000, Player1)   // Collecter des ressources

// Magie
CAST(Fireball, @130,70)        // Lancer un sort
LEARN(Teleport, Arthur)        // Apprendre un sort

// Autres
USE(ITEM, HealthPotion, Arthur) // Utiliser un objet
END_TURN                       // Finir le tour
```

### **Commandes temporelles quantiques**

```javascript
// Création de ψ-states (superpositions)
ψ001: ⊙(Δt+2 @126,65 ⟶ CREATE(CREATURE, Dragon))

// Collapse d'un ψ-state
†ψ001

// Observation trigger
Π(Player2 enters @126,65) ⇒ †ψ001
```

## 🔮 Mécaniques temporelles

### **ψ-states (Psi-states)**

Les ψ-states permettent de créer des **superpositions d'actions** qui n'existent que potentiellement jusqu'à leur collapse.

```javascript
// Syntaxe : ψ<ID>: ⊙(Δt+<turns> @<x>,<y> ⟶ <ACTION>)
ψ001: ⊙(Δt+2 @15,15 ⟶ MOV(Arthur, @15,15))
ψ002: ⊙(Δt+1 @20,20 ⟶ CREATE(CREATURE, Dragon))
ψ003: ⊙(Δt+3 @25,25 ⟶ BATTLE(Arthur, Enemy))
```

**Paramètres :**
- `ψ<ID>` : Identifiant unique du ψ-state
- `Δt+<turns>` : Nombre de tours avant activation
- `@<x>,<y>` : Position cible
- `<ACTION>` : Action à exécuter lors du collapse

### **Collapse des ψ-states**

```javascript
// Collapse manuel
†ψ001

// Collapse automatique
// - Arrivée du tour prévu (Δt+2)
// - Observation par un autre joueur
// - Conflit avec autre action
```

### **Observation triggers**

```javascript
// Déclencher un collapse si condition remplie
Π(Player2 enters @15,15) ⇒ †ψ001
Π(Arthur reaches level 5) ⇒ †ψ002
Π(Turn >= 10) ⇒ †ψ003
```

## 🏺 Artefacts temporels

### **Lame d'Avant-Monde**
```javascript
// Permet d'écrire des événements futurs
USE(ITEM, AvantWorldBlade, HERO:Arthur)
// Débloquer: création de ψ-states avec Δt+10
```

### **Horloge Inversée**
```javascript
// Revenir 1-3 tours en arrière
USE(ITEM, ReverseClock, HERO:Arthur)
// Effet: rollback du gamestate
```

### **Ancrage Temporel**
```javascript
// Verrouiller une zone contre les changements temporels
USE(ITEM, TemporalAnchor, @128,64)
// Effet: zone immunisée aux ψ-states
```

### **Trompette Apocalypse**
```javascript
// Forcer le collapse de tous les ψ-states
USE(ITEM, ApocalypseHorn, @130,70)
// Effet: tous les †ψ activés immédiatement
```

## 🌌 Timelines et branches

### **Création de branches**
```javascript
// Les conflicts créent automatiquement des branches
Timeline ℬ1: Arthur moves to @125,64
Timeline ℬ2: Arthur moves to @127,66
```

### **Sélection de timeline**
```javascript
// Spécifier la timeline active
BRANCH(ℬ2)
MOV(Arthur, @130,70)
```

## 📊 Exemples de scripts

### **Script basique HMM3**
```javascript
// basic-game.hots
HERO(Arthur)
MOV(Arthur, @10,10)
CREATE(CREATURE, Archer, @11,11)
RECRUIT(Archer, 20, Arthur)
BUILD(Castle, @15,15)
COLLECT(Gold, 500, Player1)
END_TURN
```

### **Script avec mécaniques temporelles**
```javascript
// temporal-demo.hots
HERO(Arthur)
MOV(Arthur, @10,10)

// Créer une superposition de dragon dans 2 tours
ψ001: ⊙(Δt+2 @15,15 ⟶ CREATE(CREATURE, Dragon))

// Utiliser un artefact temporel
USE(ITEM, AvantWorldBlade, HERO:Arthur)

// Trigger si l'ennemi approche
Π(Player2 enters @14,14) ⇒ †ψ001

END_TURN
```

### **Script de stress test**
```javascript
// stress-test.hots
HERO(Arthur)
HERO(Merlin)
HERO(Gandalf)

// Créer 20 ψ-states
ψ001: ⊙(Δt+1 @10,10 ⟶ CREATE(CREATURE, Dragon))
ψ002: ⊙(Δt+2 @11,11 ⟶ CREATE(CREATURE, Phoenix))
ψ003: ⊙(Δt+3 @12,12 ⟶ CREATE(CREATURE, Unicorn))
// ... (répéter jusqu'à ψ020)

// Collapser tous les ψ-states
†ψ001
†ψ002
†ψ003
// ... (tous les autres)

END_TURN
```

## 🔧 Debugging

### **Commandes de debug**
```javascript
LOG("Message de debug")
DEBUG_TIMELINE                 // Afficher l'état des timelines
DEBUG_PSISTATES               // Afficher les ψ-states actifs
DEBUG_CONFLICTS               // Afficher les conflits
```

### **Validation des scripts**
```javascript
// Vérifier la syntaxe
VALIDATE_SCRIPT

// Tester sans exécuter
DRY_RUN
```

## 🎮 Formats de coordonnées

```javascript
// Coordonnées absolues
@125,64
@x,y

// Coordonnées relatives
@+5,+3  // 5 cases à droite, 3 cases vers le haut
@-2,-1  // 2 cases à gauche, 1 case vers le bas
```

## 📋 Gestion d'erreurs

```javascript
// Les erreurs sont automatiquement loggées
// Erreurs courantes :
// - ψ-state ID déjà utilisé
// - Position invalide
// - Héros inexistant
// - Conflit temporel non résolu
```

## 🚀 Exécution via API

```bash
# Exécuter un script .hots
curl -X POST http://localhost:8080/api/temporal/scripts/execute \
  -H "Content-Type: application/json" \
  -d '{"scriptFile": "demos/basic-game.hots", "parser": "regex"}'
```

---

*Cette référence couvre tous les aspects du langage de script Heroes of Time. Pour plus d'exemples, consultez le dossier `scripts-test/`.* 