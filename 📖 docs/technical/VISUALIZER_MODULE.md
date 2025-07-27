# 🎛️ **PANOPTICΩN** - Visualiseur des États du Monde

*Nom de code : `PANOPTICΩN` - Le pouvoir ultime d'observation temporelle*

---

## 🎯 **Vision Globale**

Le **PANOPTICΩN** est un système de visualisation spatio-temporelle qui permet de voir simultanément :
- **Toutes les timelines** superposées (actuelles, futures, divergentes)
- **Les zones de causalité** figées ou incertaines  
- **La topologie spatio-temporelle** complète
- **Les influences causales** entre événements

### 🔄 **Double Usage**
1. **🛠️ Mode Développeur** - Debug et analyse des systèmes temporels
2. **⚡ Pouvoir Ultime** - Capacité jouable façon *Za Warudo*

---

## 🗺️ **Représentation Graphique**

### **Graphe Spatio-Temporel Hybride**

#### **🌐 Axes de Représentation**
- **Axe X/Y** : Topologie spatiale classique (hexagones, zones, routes)
- **Axe Z/Intensité** : Position temporelle relative
  - Plus c'est **foncé** → plus c'est "dans le futur"
  - **Superposition** → zones brumeuses avec effets d'interférence
  - **États quantiques** → clignotement ou pulsation

#### **🔗 Connexions Causales**
- **Arêtes/Traits** : Lignes causales entre événements
- **Flèches** : Influences directionnelles d'un événement sur un autre
- **Fibres temporelles** : Connexions entre timelines parallèles

#### **🎯 Nœuds Dynamiques**
- **Héros** : Icônes avec état d'indétermination (clignotement quantique)
- **Artefacts** : Visualisation des zones d'influence temporelle
- **Bâtiments** : États de construction/destruction superposés
- **Scripts Actifs** : ψ-states visibles avec leur portée

---

## 🎮 **Interface Utilisateur**

### **🖱️ Interactions**
- **Hover sur nœud** → Affiche le script lié (`ψ001: ⊙(Δt+2 @15,15 ⟶ MOV(Arthur, @15,15))`)
- **Click sur timeline** → Focus sur cette branche temporelle
- **Slider temporel** → Navigation dans l'historique des branches
- **Zoom 3D** → Exploration des couches temporelles

### **🎨 Codes Visuels**
- **🟢 Vert** : États confirmés/collapsés
- **🔵 Bleu** : États quantiques stables
- **🟡 Jaune** : États en conflit potentiel
- **🔴 Rouge** : Conflits détectés nécessitant résolution
- **⚪ Gris** : États expirés ou annulés
- **🌈 Arc-en-ciel** : Interférences quantiques complexes

---

## ⚡ **Pouvoir Ultime : "LE PANOPTICΩN"**

### **📜 Spécifications**
- **Nom de Sort** : `ABSOLUTE_OBSERVER`
- **Héros Utilisateur** : Jean-Grofignon Éveillé (ou antagoniste futur)
- **Coût** : 1 charge d'artefact Singularité
- **Durée** : 1 tour complet

### **🎯 Effet Gameplay**
> Pendant un tour, le joueur **voit tous les états futurs probables** et peut y **injecter une action directe**, même dans des timelines non confirmées.

**Mécaniques :**
1. **Révélation Totale** : Affiche le visualiseur complet au joueur
2. **Injection Temporelle** : Choisir une timeline → appliquer une commande
3. **Action Suspendue** : La commande reste en attente jusqu'au collapse réel
4. **Paradoxe Contrôlé** : Peut créer des boucles causales intentionnelles

### **🔮 Grammaire Quantique**
```hots
# Activation du PANOPTICΩN
ψ†[OBSERVE_ALL {timelines}] ⊙ HERO:Jean-Grofignon

# Injection d'action dans le futur
ψ[INJECT_ACTION {targeted_future}] ⇒ SUPERPOSITION++

# Exemple concret
ABSOLUTE_OBSERVER(Jean-Grofignon) → REVEAL_ALL_TIMELINES
ψ999: ⊙(Δt+5 @20,20 ⟶ KILL(HERO, Arthur)) [INJECTED_FROM_PANOPTICON]
```

---

## 🛠️ **Implémentation Technique**

### **🏗️ Architecture Backend**

#### **WorldStateGraph.java**
```java
public class WorldStateGraph {
    private Map<String, Timeline> timelines;
    private Map<Position, List<QuantumState>> spatialStates;
    private Map<String, CausalConnection> causalLinks;
    private TemporalLayer[] temporalLayers;
    
    // Génération du graphe complet
    public GraphData generateVisualizationData(Game game);
    
    // Injection d'actions via PANOPTICΩN
    public void injectPanopticonAction(String timelineId, Action action);
}
```

#### **PanopticonService.java**
```java
@Service
public class PanopticonService {
    
    // Activation du pouvoir ultime
    public PanopticonView activateAbsoluteObserver(Long gameId, String heroName);
    
    // Injection d'action temporelle
    public ActionResult injectTemporalAction(Long gameId, String timelineId, 
                                           String action, Position target);
    
    // Génération des données de visualisation
    public VisualizationData generateGraphData(Game game);
}
```

### **🎨 Frontend Visualizer**

#### **Structure des Données**
```typescript
interface VisualizationData {
  timelines: Timeline[];
  spatialNodes: SpatialNode[];
  causalConnections: CausalLink[];
  temporalLayers: TemporalLayer[];
  quantumInterferences: InterferenceZone[];
}

interface SpatialNode {
  id: string;
  position: { x: number, y: number, z: number };
  type: 'hero' | 'artifact' | 'building' | 'psi_state';
  status: 'confirmed' | 'quantum' | 'conflicted' | 'expired';
  timeline: string;
  metadata: NodeMetadata;
}
```

#### **Rendu 3D avec Three.js**
```javascript
class PanopticonRenderer {
  constructor(container) {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera();
    this.renderer = new THREE.WebGLRenderer();
    
    this.initializeQuantumEffects();
    this.setupTemporalLayers();
  }
  
  renderWorldState(visualizationData) {
    this.clearPreviousState();
    this.renderSpatialNodes(visualizationData.spatialNodes);
    this.renderCausalConnections(visualizationData.causalConnections);
    this.renderQuantumInterferences(visualizationData.quantumInterferences);
    this.animateTemporalEffects();
  }
  
  // Effets visuels quantiques
  initializeQuantumEffects() {
    this.quantumShader = new QuantumInterferenceShader();
    this.temporalParticles = new TemporalParticleSystem();
  }
}
```

---

## 🧪 **Mode Développeur**

### **🔧 Activation**
- **Raccourci** : `⌘ + ⌥ + C` (Cmd+Alt+C) sur map de test
- **URL** : `http://localhost:8001/panopticon-debug`
- **API** : `GET /api/temporal/panopticon/debug/{gameId}`

### **🛠️ Fonctionnalités Debug**
1. **Visualisation Conflits** : Zones rouges pour conflits de causalité
2. **Collapses Imminents** : Timeline avec countdown visuel
3. **Effets Paradoxaux** : Boucles causales en surbrillance
4. **Performance Metrics** : Nombre de ψ-states, calculs d'interférence
5. **Timeline Inspector** : Détails techniques de chaque branche

### **📊 Panneau de Contrôle**
```html
<div class="panopticon-debug-panel">
  <h3>🎛️ PANOPTICΩN Debug Console</h3>
  
  <div class="timeline-controls">
    <button onclick="freezeTime()">⏸️ Freeze Time</button>
    <button onclick="stepByStep()">⏯️ Step-by-Step</button>
    <button onclick="fastForward()">⏩ Fast Forward</button>
  </div>
  
  <div class="quantum-metrics">
    <span>Active ψ-states: <strong id="psi-count">0</strong></span>
    <span>Quantum Interferences: <strong id="interference-count">0</strong></span>
    <span>Timeline Branches: <strong id="timeline-count">0</strong></span>
  </div>
  
  <div class="causal-graph">
    <canvas id="causal-network"></canvas>
  </div>
</div>
```

---

## 🚀 **Roadmap d'Implémentation**

### **Phase 1 : Fondations** ⚡
- [ ] `WorldStateGraph.java` - Structure de données backend
- [ ] `PanopticonService.java` - Service principal
- [ ] API endpoints pour récupération des données
- [ ] Interface Three.js basique

### **Phase 2 : Visualisation** 🎨
- [ ] Rendu 3D des timelines superposées
- [ ] Effets visuels quantiques (clignotement, interférences)
- [ ] Navigation temporelle avec slider
- [ ] Codes couleur pour les différents états

### **Phase 3 : Interaction** 🖱️
- [ ] Hover tooltips avec détails des scripts
- [ ] Click pour focus sur timeline
- [ ] Mode debug développeur complet
- [ ] Panneau de contrôle temps réel

### **Phase 4 : Pouvoir Ultime** ⚡
- [ ] Implémentation `ABSOLUTE_OBSERVER`
- [ ] Injection d'actions dans les timelines futures
- [ ] Gestion des paradoxes contrôlés
- [ ] Balancing gameplay

---

## 🎯 **Intégration avec l'Existant**

### **🔗 Connexions Backend**
- **TemporalEngineService** → Données des ψ-states
- **CausalCollapseService** → Conflits et résolutions
- **QuantumInterferenceService** → Calculs d'interférence
- **TimelineManager** → Gestion des branches temporelles

### **🌐 Endpoints API**
```http
GET /api/temporal/panopticon/data/{gameId}
GET /api/temporal/panopticon/debug/{gameId}
POST /api/temporal/panopticon/inject-action
POST /api/temporal/panopticon/activate-observer
```

### **📱 Interface Frontend**
- **Port 8001** : Quantum Visualizer existant → Extension PANOPTICΩN
- **Intégration** avec `causal-graph-d3.js` existant
- **Réutilisation** des services `gameService.ts` et `api.ts`

---

## 🎨 **Expérience Utilisateur**

### **👁️ Vision du Joueur**
> *"Je vois le temps lui-même se déployer devant moi. Chaque possibilité, chaque futur, chaque paradoxe. Je suis le maître du temps et de l'espace."*

### **🎮 Sensation de Pouvoir**
- **Révélation Progressive** : Les timelines apparaissent une par une
- **Contrôle Absolu** : Manipulation directe des futurs possibles  
- **Feedback Visuel** : Effets spectaculaires lors de l'injection d'actions
- **Tension Dramatique** : Countdown avant le collapse des actions injectées

---

**🌟 Le PANOPTICΩN représente l'aboutissement ultime des mécaniques temporelles de Heroes of Time - le moment où le joueur transcende le temps lui-même !** 