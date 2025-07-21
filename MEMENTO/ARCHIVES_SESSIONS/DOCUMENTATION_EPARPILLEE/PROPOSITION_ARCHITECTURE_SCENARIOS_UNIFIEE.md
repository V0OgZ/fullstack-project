# 🎯 PROPOSITION - Architecture Unifiée des Scénarios

**Problème actuel** : Confusion entre .hots, .json, .sh - Qui fait quoi ?  
**Solution proposée** : **UN SEUL FORMAT** - Le Scenario Package (.hsp)

---

## 🚨 **PROBLÈME ACTUEL**

### **Confusion des Formats**
- `.hots` → Script de commandes (mais pas de map, pas de lore)
- `.json` → Stats des héros (mais pas d'histoire)  
- `.sh` → Tests automatiques (mais pas pour jouer)

### **Ce qui Manque**
- ❌ **Map/Carte** : Où se déroule l'action ?
- ❌ **Lore/Histoire** : Pourquoi on se bat ?
- ❌ **Objectifs** : Comment gagner ?
- ❌ **Interface** : Comment charger tout ça ?

---

## ✅ **SOLUTION PROPOSÉE**

### **🎁 HSP - Heroes of Time Scenario Package**

**UN SEUL FICHIER** qui contient TOUT :
- 🗺️ **Map** (terrain, positions)
- 📖 **Story** (histoire, dialogues)
- ⚔️ **Actions** (script HOTS)
- 🎯 **Objectives** (conditions victoire)
- 👥 **Heroes** (stats, équipement)

---

## 📦 **STRUCTURE DU SCENARIO PACKAGE**

### **Format : JSON Unifié**
```json
{
  "package": {
    "name": "Bataille d'Arthur",
    "version": "1.0",
    "author": "Jean-Grofignon",
    "description": "Arthur affronte un dragon dans les ruines anciennes"
  },
  
  "map": {
    "size": "20x20",
    "terrain": {
      "type": "ruins",
      "background": "ancient_castle.jpg",
      "obstacles": [
        {"type": "wall", "positions": ["@5,5", "@6,5", "@7,5"]},
        {"type": "tree", "positions": ["@10,10", "@11,10"]}
      ]
    }
  },
  
  "story": {
    "title": "La Dernière Bataille",
    "intro": "Arthur arrive dans les ruines où l'attend le dragon...",
    "acts": [
      {
        "name": "Préparation",
        "dialogue": "Arthur: Je sens sa présence... Le dragon est proche.",
        "narration": "Les ruines résonnent d'un grondement sourd."
      }
    ]
  },
  
  "heroes": {
    "Arthur": {
      "hp": 100,
      "position": "@5,15",
      "equipment": ["épée_magique", "armure_chevalier"]
    }
  },
  
  "script": [
    "HERO(Arthur)",
    "MOV(Arthur, @10,10)",
    "CREATE(CREATURE, Dragon, @15,15)",
    "BATTLE(Arthur, Dragon)"
  ],
  
  "objectives": {
    "victory": ["Dragon defeated"],
    "defeat": ["Arthur HP <= 0"],
    "optional": ["Collect treasure", "Save villagers"]
  }
}
```

---

## 🔄 **COMMENT ÇA MARCHE**

### **1. Chargement Unifié**
```javascript
// Une seule fonction pour tout charger
async function loadScenario(scenarioName) {
  const scenario = await fetch(`/scenarios/${scenarioName}.hsp`);
  
  // Charge automatiquement :
  loadMap(scenario.map);           // 🗺️ Terrain
  loadStory(scenario.story);       // 📖 Histoire  
  loadHeroes(scenario.heroes);     // 👥 Personnages
  loadObjectives(scenario.objectives); // 🎯 Objectifs
  executeScript(scenario.script);  // ⚔️ Actions
}
```

### **2. Interface Simplifiée**
```html
<!-- Menu simple -->
<select id="scenarioSelector">
  <option value="bataille_arthur">🐉 Bataille d'Arthur</option>
  <option value="quantum_maze">🌀 Labyrinthe Quantique</option>
  <option value="memento_test">🧠 Test de Memento</option>
</select>

<button onclick="playScenario()">🎮 Jouer</button>
```

---

## 📁 **NOUVELLE ORGANISATION**

### **Structure Proposée**
```
scenarios/
├── packages/                    ← NOUVEAUX PACKAGES UNIFIÉS
│   ├── bataille_arthur.hsp      ← Tout-en-un Arthur vs Dragon
│   ├── quantum_maze.hsp         ← Labyrinthe avec map + story
│   ├── memento_test.hsp         ← Test Memento complet
│   └── bataille_temporelle.hsp  ← Bataille épique complète
│
├── legacy/                      ← ANCIENS FORMATS (compatibilité)
│   ├── hots/                    ← Scripts .hots existants
│   ├── json/                    ← Configs JSON existantes
│   └── sh/                      ← Scripts de test
│
└── assets/                      ← RESSOURCES PARTAGÉES
    ├── maps/                    ← Images de cartes
    ├── sounds/                  ← Sons et musiques
    └── images/                  ← Sprites et textures
```

---

## 🎮 **EXEMPLES CONCRETS**

### **📦 Bataille Simple (bataille_arthur.hsp)**
```json
{
  "package": {
    "name": "Bataille d'Arthur",
    "duration": "30 secondes",
    "difficulty": "Facile"
  },
  "map": {
    "size": "10x10",
    "theme": "medieval",
    "spawn_points": {
      "Arthur": "@2,2",
      "Dragon": "@8,8"
    }
  },
  "story": {
    "intro": "Arthur doit vaincre le dragon pour sauver le royaume.",
    "victory_text": "Le dragon est vaincu ! Le royaume est sauvé !",
    "defeat_text": "Arthur tombe... Le royaume sombre dans les ténèbres."
  },
  "script": [
    "SETUP(MAP_SIZE: 10x10)",
    "HERO(Arthur)",
    "PLACE(Arthur, @2,2)",
    "CREATE(CREATURE, Dragon, @8,8)",
    "DIALOGUE(Arthur, 'Pour le royaume !')",
    "BATTLE(Arthur, Dragon)",
    "ON_VICTORY: NARRATE('Le royaume est sauvé !')"
  ]
}
```

### **📦 Scénario Complexe (bataille_temporelle.hsp)**
```json
{
  "package": {
    "name": "Bataille Temporelle Complète",
    "duration": "5 minutes",
    "difficulty": "Expert"
  },
  "map": {
    "size": "50x50",
    "theme": "temporal_nexus",
    "layers": ["past", "present", "future"],
    "special_zones": [
      {"type": "temporal_rift", "position": "@25,25", "effect": "timeline_switch"}
    ]
  },
  "story": {
    "chapters": [
      {
        "name": "L'Assemblée des Héros",
        "intro": "Les héros légendaires se rassemblent...",
        "objectives": ["Réunir tous les héros", "Activer le nexus temporel"]
      },
      {
        "name": "La Bataille Finale",
        "intro": "Le destin du multivers se joue maintenant...",
        "objectives": ["Vaincre les forces du chaos", "Stabiliser les timelines"]
      }
    ]
  },
  "heroes": {
    "Arthur": {"position": "@15,15", "timeline": "past"},
    "Memento": {"position": "@25,25", "timeline": "present"},
    "Jean-Grofignon": {"position": "@35,35", "timeline": "future"}
  },
  "script": [
    "SETUP(MAP_SIZE: 50x50, TIMELINES: 3)",
    "CHAPTER(1, 'L\\'Assemblée des Héros')",
    "HERO(Arthur)", "PLACE(Arthur, @15,15, TIMELINE:past)",
    "HERO(Memento)", "PLACE(Memento, @25,25, TIMELINE:present)", 
    "HERO(Jean-Grofignon)", "PLACE(Jean-Grofignon, @35,35, TIMELINE:future)",
    "ψ001: ⊙(Δt+5 ⟶ ACTIVATE(temporal_nexus))",
    "CHAPTER(2, 'La Bataille Finale')",
    "MASSIVE_BATTLE(all_heroes, chaos_forces)"
  ]
}
```

---

## 🔧 **IMPLÉMENTATION**

### **1. Backend - Nouveau Parser HSP**
```java
@Service
public class ScenarioPackageService {
    
    public ScenarioPackage loadScenario(String scenarioName) {
        // Charge le fichier .hsp
        String content = loadFile(scenarioName + ".hsp");
        ScenarioPackage scenario = parseJson(content);
        
        // Valide la structure
        validateScenario(scenario);
        
        return scenario;
    }
    
    public GameSession playScenario(ScenarioPackage scenario) {
        // Crée la map
        GameMap map = createMap(scenario.getMap());
        
        // Place les héros
        placeHeroes(scenario.getHeroes());
        
        // Exécute le script
        executeScript(scenario.getScript());
        
        return gameSession;
    }
}
```

### **2. Frontend - Interface Unifiée**
```javascript
class ScenarioPlayer {
    async loadScenario(scenarioName) {
        const response = await fetch(`/api/scenarios/${scenarioName}`);
        this.scenario = await response.json();
        
        // Affiche la map
        this.renderMap(this.scenario.map);
        
        // Affiche l'histoire
        this.showStory(this.scenario.story);
        
        // Configure les objectifs
        this.setupObjectives(this.scenario.objectives);
    }
    
    async playScenario() {
        // Lance le script
        for (const command of this.scenario.script) {
            await this.executeCommand(command);
            await this.wait(500); // Animation
        }
    }
}
```

### **3. Outil de Création**
```html
<!-- Éditeur de scénarios -->
<div id="scenarioEditor">
    <h2>🛠️ Créateur de Scénarios</h2>
    
    <div class="editor-tabs">
        <button class="tab active" data-tab="info">📝 Info</button>
        <button class="tab" data-tab="map">🗺️ Map</button>
        <button class="tab" data-tab="story">📖 Histoire</button>
        <button class="tab" data-tab="heroes">👥 Héros</button>
        <button class="tab" data-tab="script">⚔️ Actions</button>
    </div>
    
    <div id="tab-info" class="editor-panel">
        <input type="text" placeholder="Nom du scénario" id="scenarioName">
        <textarea placeholder="Description" id="scenarioDesc"></textarea>
    </div>
    
    <div id="tab-map" class="editor-panel">
        <canvas id="mapEditor" width="500" height="500"></canvas>
        <div class="map-tools">
            <button onclick="addWall()">🧱 Mur</button>
            <button onclick="addTree()">🌳 Arbre</button>
            <button onclick="addSpawnPoint()">📍 Point d'apparition</button>
        </div>
    </div>
    
    <button onclick="exportScenario()">💾 Exporter HSP</button>
</div>
```

---

## 🎯 **AVANTAGES DE CETTE APPROCHE**

### **✅ Pour le Joueur**
- **Un clic** → Tout se charge (map + histoire + héros)
- **Interface claire** → Plus de confusion entre formats
- **Expérience complète** → Histoire + gameplay + objectifs

### **✅ Pour le Développeur**
- **Un seul format** → Plus simple à maintenir
- **Validation facile** → Structure JSON claire
- **Extensible** → Facile d'ajouter de nouveaux champs

### **✅ Pour le Créateur**
- **Outil unifié** → Éditeur graphique de scénarios
- **Export simple** → Un fichier .hsp contient tout
- **Partage facile** → Un fichier = un scénario complet

---

## 🔄 **MIGRATION DEPUIS L'EXISTANT**

### **Étape 1 : Convertisseur Automatique**
```bash
# Script de conversion
./scripts/convert-to-hsp.sh

# Convertit :
# - bataille_temporelle_complete.hots → bataille_temporelle.hsp
# - memento.json → memento_test.hsp  
# - test-arthur.sh → arthur_test.hsp
```

### **Étape 2 : Compatibilité Rétrograde**
```javascript
// Le système peut encore lire les anciens formats
if (file.endsWith('.hots')) {
    scenario = convertHotsToHsp(file);
} else if (file.endsWith('.hsp')) {
    scenario = loadHsp(file);
}
```

### **Étape 3 : Migration Progressive**
- **Phase 1** : Créer les HSP pour les scénarios principaux
- **Phase 2** : Mettre à jour l'UI pour utiliser HSP
- **Phase 3** : Déprécier progressivement les anciens formats

---

## 🚀 **PLAN D'IMPLÉMENTATION**

### **Semaine 1 : Structure**
- [ ] Définir le schéma JSON HSP complet
- [ ] Créer le parser backend
- [ ] Convertir 3 scénarios existants

### **Semaine 2 : Interface**
- [ ] Mettre à jour le frontend pour HSP
- [ ] Créer le sélecteur de scénarios unifié
- [ ] Tester le chargement complet

### **Semaine 3 : Outils**
- [ ] Créer l'éditeur de scénarios
- [ ] Script de conversion automatique
- [ ] Documentation utilisateur

### **Semaine 4 : Migration**
- [ ] Convertir tous les scénarios existants
- [ ] Tests complets
- [ ] Déploiement

---

## 🎯 **RÉSULTAT FINAL**

### **Interface Utilisateur Simple**
```html
<div class="scenario-browser">
    <h2>🎮 Choisir un Scénario</h2>
    
    <div class="scenario-grid">
        <div class="scenario-card" onclick="playScenario('bataille_arthur')">
            <img src="preview_arthur.jpg" alt="Bataille d'Arthur">
            <h3>🐉 Bataille d'Arthur</h3>
            <p>Arthur affronte un dragon (30 sec)</p>
            <div class="difficulty">⭐ Facile</div>
        </div>
        
        <div class="scenario-card" onclick="playScenario('bataille_temporelle')">
            <img src="preview_temporal.jpg" alt="Bataille Temporelle">
            <h3>⚡ Bataille Temporelle</h3>
            <p>Combat épique multidimensionnel (5 min)</p>
            <div class="difficulty">⭐⭐⭐ Expert</div>
        </div>
    </div>
</div>
```

### **Expérience Joueur**
1. **Clic** sur un scénario
2. **Chargement automatique** : map + histoire + héros + objectifs
3. **Jeu fluide** avec narration intégrée
4. **Fin claire** avec résultats et stats

---

## 🎯 **CONCLUSION**

**Fini la confusion !** 🎉

- **1 format** (.hsp) au lieu de 3 (.hots + .json + .sh)
- **1 interface** simple pour choisir et jouer
- **1 expérience** complète (map + story + gameplay)

**Tu es d'accord avec cette approche ?** 
On peut commencer par créer un HSP d'exemple et voir si ça clarifie tout ! 😊