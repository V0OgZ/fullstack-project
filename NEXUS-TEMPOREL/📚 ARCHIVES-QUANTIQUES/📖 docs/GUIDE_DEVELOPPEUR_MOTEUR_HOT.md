# 🛠️ GUIDE DÉVELOPPEUR - MOTEUR HEROES OF TIME

*Comment créer vos propres jeux avec notre moteur quantique*

---

## 🎯 **CE QUE VOUS POUVEZ FAIRE**

Le moteur Heroes of Time n'est pas qu'un jeu - c'est un **FRAMEWORK** pour créer des expériences uniques !

### **Possibilités Infinies**
- 🎮 **Jeux Stratégiques** : Comme HOMM mais dans votre univers
- 🌀 **Puzzles Temporels** : Exploitez les paradoxes
- 🎭 **Narratifs Non-Linéaires** : Histoires qui changent selon l'observation
- 🔮 **Roguelikes Quantiques** : Chaque run modifie la réalité
- 🎲 **Expériences Méta** : Cassez le 4ème mur

---

## 🚀 **QUICK START**

### **1. Structure Minimale**
```
mon-jeu/
├── 🎮 game_assets/
│   ├── heroes/
│   │   └── mon_heros.json
│   ├── artifacts/
│   │   └── mon_item.json
│   └── maps/
│       └── ma_map.json
├── scenarios/
│   └── intro.hots
└── config.json
```

### **2. Créer un Héros Simple**
```json
{
  "id": "cyber_knight",
  "name": "Chevalier Cybernétique",
  "class": "WARRIOR",
  "stats": {
    "health": 100,
    "attack": 15,
    "defense": 10
  },
  "abilities": [{
    "name": "Frappe Laser",
    "damage": 20,
    "cost": 10
  }]
}
```

### **3. Script HOTS Basique**
```hots
SETUP(MAP: cyber_city, MODE: exploration)
SPAWN HERO=cyber_knight AT @5,5
NARRATE "Bienvenue dans Cyber City!"

ON_MOVE TO @10,10:
  SPAWN ENEMY=drone AT @11,11
  COMBAT START
```

---

## 🎨 **CONCEPTS UNIQUES À EXPLOITER**

### **1. Brouillard de Causalité**
Au lieu du brouillard de guerre classique :
```javascript
// Le brouillard cache les CONSÉQUENCES, pas la carte
fog.reveal = (action) => {
  showPossibleFutures(action);
  hideImpossibleTimelines();
}
```

### **2. Objets Quantiques**
```json
{
  "id": "quantum_sword",
  "states": {
    "observed": { "damage": 10 },
    "superposed": { "damage": "10|20|30" },
    "collapsed": { "damage": "random(states)" }
  }
}
```

### **3. Maps Multi-Dimensionnelles**
```json
{
  "id": "shifting_maze",
  "layers": [
    { "dimension": "reality", "tiles": [...] },
    { "dimension": "dream", "tiles": [...] },
    { "dimension": "nightmare", "tiles": [...] }
  ],
  "portals": [
    { "from": [5,5,"reality"], "to": [10,10,"dream"] }
  ]
}
```

---

## 🔧 **SYSTÈMES AVANCÉS**

### **1. Créer des Paradoxes**
```hots
CREATE PARADOX:
  EVENT past_change AT T-10
  AFFECTS current_state
  IF paradox_unresolved:
    SPAWN temporal_anomaly
```

### **2. IA Personnalisée**
```javascript
class MyCustomAI extends ClaudiusBase {
  decide(gameState) {
    // Votre logique IA
    if (gameState.playerNearPortal) {
      return this.blockPortal();
    }
    return super.decide(gameState);
  }
}
```

### **3. Mécaniques Méta**
```javascript
// Sauvegarder des infos entre les parties
MetaProgress.save('player_discovered_secret', true);

// Modifier le jeu selon l'historique
if (MetaProgress.get('total_deaths') > 100) {
  unlockHardMode();
}
```

---

## 💡 **EXEMPLES CONCRETS**

### **Exemple 1 : Puzzle Temporel**
```hots
SCENARIO "La Clé du Futur"
OBJECTIVE: Obtenir une clé qui n'existe que dans le futur

SETUP:
  PLACE door AT @10,10 STATE=locked
  SET key.exists = false

ON_ACTION use_time_machine:
  JUMP_FORWARD 10_years
  SPAWN key AT @5,5
  NARRATE "La clé apparaît, rouillée par le temps"

ON_ACTION return_to_present WITH key:
  CREATE bootstrap_paradox
  NARRATE "Mais qui a mis la clé là en premier lieu?"
```

### **Exemple 2 : Combat Quantique**
```javascript
// Ennemi qui existe dans plusieurs états
const quantumBoss = {
  states: ['solid', 'ghost', 'energy'],
  currentState: 'superposition',
  
  onAttack: function(damage, type) {
    if (this.currentState === 'superposition') {
      this.collapse(type); // S'adapte à l'attaque
    }
    return this.states[this.currentState].resist(damage);
  }
};
```

### **Exemple 3 : Monde Vivant**
```javascript
// NPCs qui se souviennent entre les timelines
class TemporalNPC extends NPC {
  constructor() {
    super();
    this.memories = new TimelineMemory();
  }
  
  interact(player) {
    if (this.memories.has(player, 'killed_me')) {
      return "Tu... tu m'as tué dans une autre timeline!";
    }
    return super.interact(player);
  }
}
```

---

## 🎯 **PATTERNS DE DESIGN**

### **1. Le Bootstrap Créatif**
```javascript
// Le joueur crée la solution à son propre problème
if (!solutionExists) {
  player.createSolution();
  timeline.sendToPast(solution);
  // La solution a toujours existé !
}
```

### **2. L'Observation Modificatrice**
```javascript
// L'acte de regarder change la réalité
onObserve(target) {
  if (target.isQuantum) {
    target.collapse(observer.expectations);
  }
}
```

### **3. La Causalité Inversée**
```javascript
// L'effet précède la cause
triggerEffect();
waitForPlayerToCreateCause();
validateCausality();
```

---

## 📚 **RESSOURCES**

### **Documentation**
- `/📖 docs/api/` - Référence complète de l'API
- `/examples/` - Projets exemples
- `/templates/` - Templates de démarrage

### **Outils**
- **HOT Editor** - Éditeur visuel de scénarios
- **Quantum Debugger** - Debug les paradoxes
- **Timeline Visualizer** - Voir toutes les branches

### **Communauté**
- Discord : Pour l'aide et le partage
- GitHub : Contributions welcome
- Workshop : Partagez vos créations

---

## 🚀 **COMMENCER MAINTENANT**

```bash
# Cloner le template de base
git clone https://github.com/heroes-of-time/game-template

# Installer les dépendances
cd game-template
npm install

# Lancer en mode dev
npm run dev

# Créer votre premier héros
npm run create:hero
```

---

## 💭 **PHILOSOPHIE DU MOTEUR**

> "Ne créez pas juste des jeux. Créez des expériences qui questionnent la nature même du jeu vidéo."

Le moteur HOT vous permet de :
- **Casser les conventions** : Le tour par tour n'existe plus vraiment
- **Explorer l'impossible** : Les paradoxes sont des features
- **Raconter différemment** : L'histoire change selon qui l'observe
- **Innover** : Les bugs peuvent devenir des mécaniques

---

*"Avec HOT, vous ne codez pas un jeu. Vous tissez des réalités." - Grofi*