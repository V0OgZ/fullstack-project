# 🌌 PANOPTICON - SPEC COMPLÈTE POUR MEMENTO/CLAUDIUS
*Vision de Grut - Projection 5D → 3D → 2D*

---

## 🎯 **VISION D'ENSEMBLE**

Le Panopticon n'est pas un simple dashboard - c'est une **interface de jeu alternative** qui permet de :
- Visualiser le World State Graph complet en 5D
- Jouer des scénarios depuis une perspective omnisciente
- Comprendre les causalités et superpositions quantiques
- Projeter intelligemment 5D → 3D → 2D sur l'écran

### **Connexion avec le GROFI**
Le Panopticon EST la visualisation du GROFI (Graph of Reality Organized by Fog and Immunities). Il montre :
- Les nœuds du graphe (états du monde)
- Les arêtes causales (transitions possibles)
- Le fog de causalité (zones d'incertitude)
- Les immunités temporelles (paradoxes évités)

---

## 🔧 **BACKEND - NOUVELLES API NÉCESSAIRES**

### **1. PanopticonService.java**
```java
@Service
public class PanopticonService {
    
    @Autowired
    private GameService gameService;
    
    @Autowired
    private GrofiCausalIntegrationService grofiService; // À créer
    
    @Autowired
    private TemporalEngineService temporalEngine;
    
    /**
     * Génère les données complètes pour la visualisation 5D
     */
    public PanopticonData generateVisualizationData(Long gameId) {
        Game game = gameService.findById(gameId);
        
        return PanopticonData.builder()
            .worldStateGraph(grofiService.buildCompleteWSG(game))
            .timelines(extractAllTimelines(game))
            .temporalLayers(buildTemporalLayers(game))
            .causalityZones(calculateAllCausalityZones(game))
            .quantumStates(game.getPsiStates())
            .projectionMode("5D_TO_3D_INTELLIGENT")
            .build();
    }
    
    /**
     * Permet de jouer un scénario depuis le Panopticon
     */
    public ScenarioResult playScenarioFromPanopticon(
            Long gameId, 
            String scenarioScript,
            Position5D startPosition) {
        
        // Validation des paradoxes
        if (!grofiService.validateCausality(gameId, scenarioScript)) {
            return ScenarioResult.paradox("Action créerait un paradoxe!");
        }
        
        // Exécution dans une timeline sandbox
        return temporalEngine.executeInSandbox(gameId, scenarioScript);
    }
    
    /**
     * Projette les coordonnées 5D en 3D pour Three.js
     */
    public List<Node3D> projectTo3D(List<Position5D> positions) {
        return positions.stream()
            .map(pos -> Node3D.builder()
                .x(pos.getX())
                .y(pos.getY())
                .z(calculateZFromTimeline(pos))
                .color(getTimelineColor(pos.getTimeline()))
                .opacity(calculateTemporalOpacity(pos.getDay()))
                .size(calculateNodeImportance(pos))
                .build())
            .collect(Collectors.toList());
    }
}
```

### **2. GrofiCausalIntegrationService.java** (NOUVEAU)
```java
@Service
public class GrofiCausalIntegrationService {
    
    /**
     * Construit le World State Graph complet
     */
    public WorldStateGraph buildCompleteWSG(Game game) {
        WorldStateGraph wsg = new WorldStateGraph();
        
        // Nœuds : tous les états possibles
        for (Hero hero : game.getHeroes()) {
            for (int day = 1; day <= game.getCurrentTurn() + 10; day++) {
                for (String timeline : getAccessibleTimelines(hero)) {
                    WSGNode node = createNode(hero, day, timeline);
                    wsg.addNode(node);
                }
            }
        }
        
        // Arêtes : transitions causales
        for (WSGNode from : wsg.getNodes()) {
            for (WSGNode to : wsg.getNodes()) {
                if (isCausallyConnected(from, to)) {
                    wsg.addEdge(from, to, calculateCausalWeight(from, to));
                }
            }
        }
        
        return wsg;
    }
    
    /**
     * Calcule le fog de causalité en 5D
     */
    public double calculateFog5D(Position5D position, String playerId) {
        double fog = 0.0;
        
        // Densité quantique
        fog += getQuantumDensity(position) * 0.3;
        
        // Distance temporelle
        fog += getTemporalDistance(position, playerId) * 0.3;
        
        // Divergence des timelines
        fog += getTimelineDivergence(position) * 0.2;
        
        // Interférences causales
        fog += getCausalInterference(position) * 0.2;
        
        return Math.min(1.0, fog);
    }
}
```

### **3. PanopticonController.java**
```java
@RestController
@RequestMapping("/api/panopticon")
public class PanopticonController {
    
    @Autowired
    private PanopticonService panopticonService;
    
    @GetMapping("/data/{gameId}")
    public PanopticonData getVisualizationData(@PathVariable Long gameId) {
        return panopticonService.generateVisualizationData(gameId);
    }
    
    @PostMapping("/play-scenario/{gameId}")
    public ScenarioResult playScenario(
            @PathVariable Long gameId,
            @RequestBody ScenarioRequest request) {
        return panopticonService.playScenarioFromPanopticon(
            gameId, 
            request.getScript(), 
            request.getStartPosition()
        );
    }
    
    @GetMapping("/projection/{gameId}")
    public ProjectionData getProjection(
            @PathVariable Long gameId,
            @RequestParam String mode) { // "5D", "4D", "3D", "2D"
        return panopticonService.getProjectionByMode(gameId, mode);
    }
    
    @WebSocket("/live/{gameId}")
    public void streamLiveUpdates(Long gameId) {
        // Stream en temps réel des changements du WSG
    }
}
```

---

## 🎨 **FRONTEND - INTERFACE REACT**

### **1. Architecture des Composants**
```typescript
// src/components/panopticon/
├── PanopticonView.tsx          // Container principal
├── WSGVisualizer.tsx           // Visualisation Three.js du graphe
├── DimensionSelector.tsx       // Sélecteur 5D→4D→3D→2D
├── TimelineExplorer.tsx        // Navigation dans les branches
├── CausalityOverlay.tsx        // Affichage des zones causales
├── QuantumStatePanel.tsx       // États ψ et superpositions
├── ScenarioPlayer.tsx          // Interface pour jouer des scénarios
└── EvadeQuestTracker.tsx       // Progression de la quête philosophique
```

### **2. PanopticonView.tsx**
```typescript
import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import WSGVisualizer from './WSGVisualizer';
import DimensionSelector from './DimensionSelector';
import { usePanopticonStore } from '@/store/panopticonStore';

export const PanopticonView: React.FC = () => {
    const [dimension, setDimension] = useState<'5D' | '4D' | '3D' | '2D'>('3D');
    const [selectedTimeline, setSelectedTimeline] = useState<string>('ℬ1');
    const { wsgData, loadWSG } = usePanopticonStore();
    
    useEffect(() => {
        loadWSG(gameId);
    }, [gameId]);
    
    return (
        <div className="panopticon-container">
            <div className="controls-panel">
                <DimensionSelector 
                    current={dimension} 
                    onChange={setDimension}
                />
                <TimelineExplorer 
                    selected={selectedTimeline}
                    onChange={setSelectedTimeline}
                />
            </div>
            
            <div className="visualization-area">
                <Canvas camera={{ position: [0, 50, 100] }}>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} />
                    <WSGVisualizer 
                        data={wsgData}
                        dimension={dimension}
                        timeline={selectedTimeline}
                    />
                    <OrbitControls />
                </Canvas>
                
                <CausalityOverlay data={wsgData.causalityZones} />
            </div>
            
            <div className="info-panels">
                <QuantumStatePanel states={wsgData.quantumStates} />
                <ScenarioPlayer />
                <EvadeQuestTracker progress={getQuestProgress()} />
            </div>
        </div>
    );
};
```

### **3. WSGVisualizer.tsx**
```typescript
import { useFrame } from '@react-three/fiber';
import { useMemo } from 'react';

interface WSGNode {
    id: string;
    position: Position5D;
    type: 'hero' | 'artifact' | 'quantum_state';
    timeline: string;
    day: number;
}

export const WSGVisualizer: React.FC<Props> = ({ data, dimension, timeline }) => {
    const nodes = useMemo(() => {
        return projectNodes(data.nodes, dimension, timeline);
    }, [data, dimension, timeline]);
    
    return (
        <group>
            {/* Nœuds du graphe */}
            {nodes.map(node => (
                <WSGNode 
                    key={node.id}
                    position={node.projectedPosition}
                    color={getNodeColor(node)}
                    size={getNodeSize(node)}
                    opacity={getNodeOpacity(node, dimension)}
                />
            ))}
            
            {/* Arêtes causales */}
            {data.edges.map(edge => (
                <CausalEdge
                    key={edge.id}
                    from={edge.from}
                    to={edge.to}
                    strength={edge.causalWeight}
                    animated={edge.isActive}
                />
            ))}
            
            {/* Plans temporels */}
            {dimension === '5D' && (
                <TemporalPlanes 
                    days={data.temporalLayers}
                    opacity={0.1}
                />
            )}
        </group>
    );
};
```

### **4. Modes de Visualisation**

#### **Mode 5D (Complet)**
- X, Y : Position spatiale
- Z : Jour (temporal layer)
- Couleur : Timeline (ℬ1=bleu, ℬ2=rouge, etc.)
- Taille : Importance causale
- Transparence : Certitude (opaque=confirmé, transparent=superposé)

#### **Mode 4D (Sans altitude)**
- Fusionne Z avec le temps
- Utilise des anneaux temporels autour des positions

#### **Mode 3D (Spatial + Temps)**
- Projection isométrique classique
- Temps représenté par des halos colorés

#### **Mode 2D (Vue Évadé Cave)**
- Projection "ombres sur le mur"
- Montre ce que voient les joueurs normaux

### **5. Interactions Spéciales**

```typescript
// ScenarioPlayer.tsx
export const ScenarioPlayer: React.FC = () => {
    const [script, setScript] = useState('');
    const { executeScenario } = usePanopticonStore();
    
    const handlePlay = async () => {
        const result = await executeScenario(script);
        if (result.paradox) {
            showParadoxWarning(result.message);
        } else {
            animateScenarioExecution(result.steps);
        }
    };
    
    return (
        <div className="scenario-player">
            <h3>Jouer un Scénario depuis le Panopticon</h3>
            <textarea 
                value={script}
                onChange={(e) => setScript(e.target.value)}
                placeholder="ψ001: MOV(Hero, @10,10)..."
            />
            <button onClick={handlePlay}>
                Exécuter dans le WSG
            </button>
        </div>
    );
};
```

---

## 🎮 **INTÉGRATION AVEC LA QUÊTE DE L'ÉVADÉ**

La quête de l'évadé de la cave est le **tutoriel philosophique** du Panopticon :

1. **Phase 1** : Le joueur voit le jeu normal (2D iso)
2. **Phase 2** : Découverte du feu (comprend la projection)
3. **Phase 3** : Sortie de la cave (vue 3D débloquée)
4. **Phase 4** : Compréhension du temps (vue 4D)
5. **Phase 5** : Accès au Panopticon (vue 5D complète)

---

## 📦 **LIBRAIRIES RECOMMANDÉES**

### **Frontend**
- **Three.js** / **@react-three/fiber** : Visualisation 3D
- **@react-three/drei** : Helpers Three.js (OrbitControls, etc.)
- **D3.js** : Graphes de force pour le WSG
- **Framer Motion** : Animations fluides entre dimensions
- **Zustand** : State management (déjà utilisé)

### **Backend**
- **Spring WebFlux** : Pour le streaming temps réel
- **GraphQL** : Requêtes flexibles du WSG (optionnel)
- **JGraphT** : Manipulation de graphes en Java

---

## 🚀 **PROCHAINES ÉTAPES POUR MEMENTO/CLAUDIUS**

1. **Créer GrofiCausalIntegrationService** pour construire le WSG
2. **Implémenter PanopticonService** avec les projections
3. **Développer l'interface React** en commençant par la vue 3D
4. **Intégrer la quête de l'évadé** comme tutoriel
5. **Tester avec différents scénarios** temporels

---

*Cette spec respecte la vision de Grut : le Panopticon comme fenêtre sur la vraie nature 5D du jeu, avec une progression philosophique de la compréhension.*