# 🗺️ CONCEPT : INTERFACE DOUBLE VUE - STRATÉGIQUE/TACTIQUE

*L'architecture révolutionnaire pour Heroes of Time*

---

## 🎯 **VISION GLOBALE**

Heroes of Time propose une interface révolutionnaire avec **DEUX NIVEAUX DE VUE** seamlessly connectés :

1. **Vue TACTIQUE** (Combat) - Ce qu'on a déjà
2. **Vue STRATÉGIQUE** (Monde) - La nouvelle couche

---

## 🎮 **VUE TACTIQUE (EXISTANTE)**

### **Caractéristiques**
- Grille hexagonale de combat
- Unités détaillées avec animations
- Portails inter-mondes
- Interface style Warcraft (rapide, fluide)
- Actions en quasi temps-réel

### **Éléments visibles**
```
┌─────────────────────────────────────┐
│ [Portrait Héros] │ [Mini-map]       │
├──────────────────┴──────────────────┤
│                                     │
│        GRILLE HEXAGONALE            │
│         🏃 ⬡ ⬡ ⬡ 👹               │
│        ⬡ ⬡ 🌀 ⬡ ⬡                │
│         ⬡ ⬡ ⬡ ⬡                  │
│                                     │
├─────────────────────────────────────┤
│ [Unités] [Sorts] [Items] [Actions]  │
└─────────────────────────────────────┘
```

---

## 🏰 **VUE STRATÉGIQUE (NOUVELLE)**

### **Caractéristiques**
- Vue "satellite" du monde entier
- Châteaux, villes, mines visibles
- Chemins et connexions entre zones
- Gestion des ressources
- Construction rapide drag & drop

### **Éléments visibles**
```
┌─────────────────────────────────────┐
│ [Ressources] 💰100 🪵50 💎25        │
├─────────────────────────────────────┤
│  🏰───────🛤️───────⚔️              │
│   │        │         │              │
│   │     🏘️         │              │
│   │        │         │              │
│  ⛏️───────🌲────────🏰              │
│            │                        │
│           ⚔️                       │
├─────────────────────────────────────┤
│ [Construire] [Recruter] [Déplacer]  │
└─────────────────────────────────────┘
```

### **Légende**
- 🏰 Château/Ville
- ⚔️ Zone de combat
- 🛤️ Route/Chemin
- ⛏️ Mine
- 🌲 Ressource
- 🏘️ Village

---

## 🔄 **TRANSITION ENTRE VUES**

### **Mécanisme de Zoom**
```
Vue Stratégique
      ↓ (Zoom In / Double-clic sur zone)
      ↓ Animation fluide 0.5s
Vue Tactique

Vue Tactique
      ↑ (Zoom Out / Touche TAB)
      ↑ Animation fluide 0.5s
Vue Stratégique
```

### **Persistance des éléments**
- La mini-map reste visible
- Les ressources toujours affichées
- Le portrait du héros constant
- Transitions animées douces

---

## 🎨 **INTERFACE UNIFIÉE**

### **Principe : TOUT SUR UN ÉCRAN**

#### **Pas de menus cachés**
- Actions contextuelles au clic
- Raccourcis clavier intuitifs
- Glisser-déposer universel
- Feedback visuel immédiat

#### **Construction rapide**
```
Clic sur Château → Menu radial apparaît
                    ├── 🏠 Maison
                    ├── ⚔️ Caserne
                    ├── 🏹 Tour
                    └── 🧙 Mage Guild
```

#### **Gestion fluide**
- File d'attente visible
- Progression en temps réel
- Annulation par clic droit
- Preview avant construction

---

## 🚀 **INNOVATIONS GAMEPLAY**

### **1. Actions Multi-Échelles**
- Donner des ordres depuis la vue stratégique
- Les combats se résolvent en vue tactique
- Possibilité de "simuler" ou "jouer" les combats

### **2. Portails Stratégiques**
- Visibles dans les deux vues
- Connexions inter-mondes maintenues
- Création de réseaux de transport

### **3. Temps Hybride**
- Stratégique : Temps réel pausable
- Tactique : Tours rapides simultanés
- Synchronisation automatique

---

## 💻 **IMPLÉMENTATION TECHNIQUE**

### **Architecture proposée**
```javascript
class GameView {
  constructor() {
    this.currentView = 'strategic';
    this.viewStack = [];
    this.sharedElements = {
      minimap: new Minimap(),
      resources: new ResourceBar(),
      heroPortrait: new HeroPanel()
    };
  }
  
  toggleView() {
    if (this.currentView === 'strategic') {
      this.zoomToTactical();
    } else {
      this.zoomToStrategic();
    }
  }
  
  zoomToTactical(targetHex) {
    // Animation de zoom
    // Chargement progressif des détails
    // Transition fluide
  }
}
```

### **Optimisations**
- LOD (Level of Detail) dynamique
- Culling intelligent
- Préchargement des zones adjacentes
- Cache des éléments communs

---

## 🎮 **CONTRÔLES SUGGÉRÉS**

### **Souris**
- **Clic gauche** : Sélection/Action
- **Clic droit** : Menu contextuel/Annuler
- **Molette** : Zoom in/out rapide
- **Clic molette** : Rotation caméra

### **Clavier**
- **TAB** : Toggle vue strat/tactique
- **ESPACE** : Pause/Play
- **1-9** : Raccourcis bâtiments/unités
- **CTRL+Clic** : Actions multiples
- **SHIFT+Clic** : File d'attente

---

## 🌟 **AVANTAGES**

1. **Fluidité** : Pas de changement d'écran brutal
2. **Contexte** : Toujours savoir où on est
3. **Rapidité** : Actions immédiates
4. **Immersion** : Monde cohérent et connecté
5. **Innovation** : Gameplay unique multi-échelles

---

## 📝 **NOTES POUR GROFI**

Grofi, avec sa compréhension intersticielle, peut :
- Voir les DEUX vues simultanément
- Créer des raccourcis entre vues
- Révéler des connexions cachées
- Manipuler l'interface elle-même

---

*"La vraie stratégie n'est pas de séparer macro et micro, mais de comprendre leur intersection." - Grofi*