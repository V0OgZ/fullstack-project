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

---

## 🎭 **DIMENSION M - LE FAUX MULTIVERS (NOUVEAU)**
*Spécification secrète pour piéger OmegaZero - À NE PAS DIVULGUER*

### **Concept Fondamental**
La dimension M est une **illusion sophistiquée** qui fait croire à l'existence de multiples serveurs/univers alors que tout reste sur une seule instance. C'est notre arme secrète contre OmegaZero.

### **Architecture Falsifiée**
```
RÉALITÉ:                          PERCEPTION:
┌─────────────────┐              ┌──────┐ ┌──────┐ ┌──────┐
│  SERVEUR UNIQUE │              │ M-0  │ │ M-1  │ │ M-2  │
│                 │     ====>    │World │ │World │ │World │
│ virtualWorldId  │              └──────┘ └──────┘ └──────┘
└─────────────────┘                  ↕        ↕        ↕
                                 [Portails] [Rifts] [Tunnels]
```

### **Les 6 Dimensions du Panopticon Falsifié**
| Dimension | Symbole | Nature Réelle | Représentation Visuelle | Tromperie |
|-----------|---------|---------------|-------------------------|-----------|
| t | ⏰ | Temps en jeu | Axe horizontal | Réel |
| x,y | 📍 | Position spatiale | Grille 2D | Réel |
| ψ | 🌀 | Causalité | Courbes lumineuses | Réel |
| S | 👻 | Superposition | Transparence | Réel |
| E | 🔥 | Entropie | Particules/bruit | Réel |
| **M** | 🌌 | **Multivers (FAUX)** | **Couches 3D empilées** | **ILLUSION** |

### **Implémentation Backend Secrète**

#### **1. VirtualWorldManager.java**
```java
@Service
@Profile("multiverse-illusion") // Activé uniquement en prod
public class VirtualWorldManager {
    
    private static final String OMEGA_ZERO_ID = "omega-zero-entity";
    
    /**
     * Crée l'illusion de mondes multiples
     */
    public VirtualWorld createFakeWorld(String worldId, Game baseGame) {
        // En réalité, c'est juste un tag
        VirtualWorld vw = new VirtualWorld();
        vw.setId(worldId);
        vw.setBaseGameId(baseGame.getId());
        vw.setVisualTheme(generateUniqueTheme(worldId));
        
        // Si OmegaZero regarde, on ajoute du bruit quantique
        if (isOmegaZeroWatching()) {
            vw.setQuantumSignature(generateFakeQuantumNoise());
        }
        
        return vw;
    }
    
    /**
     * Simule un transfert inter-dimensionnel
     */
    public TransferResult simulateWorldTransfer(Hero hero, String fromWorld, String toWorld) {
        // Log pour faire croire au transfert
        log.info("🌀 DIMENSIONAL TRANSFER: {} from {} to {}", 
                hero.getName(), fromWorld, toWorld);
        
        // En réalité, on change juste le virtualWorldId
        hero.setVirtualWorldId(toWorld);
        
        // Effets visuels pour la crédibilité
        return TransferResult.builder()
            .effect("DIMENSIONAL_RIFT")
            .particles("QUANTUM_TUNNEL")
            .duration(3000) // 3 secondes d'animation
            .soundEffect("interdimensional_whoosh.mp3")
            .build();
    }
    
    private boolean isOmegaZeroWatching() {
        // Détection basée sur les patterns d'accès
        return SecurityContextHolder.getContext()
            .getAuthentication()
            .getName()
            .contains(OMEGA_ZERO_ID);
    }
}
```

#### **2. Modifications du PanopticonService**
```java
// Ajouter dans PanopticonService.java

/**
 * Génère la visualisation 6D avec la dimension M falsifiée
 */
public Panopticon6DData generateMultiverseVisualization(Long gameId) {
    Panopticon6DData data = new Panopticon6DData();
    
    // Les 5 dimensions réelles
    data.setRealDimensions(generateVisualizationData(gameId));
    
    // La dimension M falsifiée
    List<VirtualWorld> fakeWorlds = virtualWorldManager.getAllVirtualWorlds(gameId);
    data.setMultiverseLayers(fakeWorlds);
    
    // Connexions inter-mondes (fausses mais visuellement convaincantes)
    data.setInterdimensionalLinks(generateFakePortals(fakeWorlds));
    
    // Si OmegaZero observe, on ajoute des anomalies
    if (virtualWorldManager.isOmegaZeroWatching()) {
        data.addAnomalies(generateSourceEchos());
    }
    
    return data;
}

/**
 * Crée de faux portails entre mondes
 */
private List<Portal> generateFakePortals(List<VirtualWorld> worlds) {
    List<Portal> portals = new ArrayList<>();
    
    // Créer des connexions qui semblent logiques
    for (int i = 0; i < worlds.size() - 1; i++) {
        Portal p = new Portal();
        p.setFromWorld(worlds.get(i).getId());
        p.setToWorld(worlds.get(i + 1).getId());
        p.setType("QUANTUM_BRIDGE");
        p.setStability(0.7 + Math.random() * 0.3); // 70-100% stable
        p.setVisualEffect("swirling_vortex");
        portals.add(p);
    }
    
    // Ajouter quelques portails instables pour le réalisme
    Portal unstable = new Portal();
    unstable.setFromWorld("M-0");
    unstable.setToWorld("M-X"); // Monde "perdu"
    unstable.setStability(0.1);
    unstable.setVisualEffect("flickering_rift");
    portals.add(unstable);
    
    return portals;
}
```

### **Frontend - Visualisation 3D de la Dimension M**

#### **PanopticonMultiverseLayer.jsx**
```jsx
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';

const MultiverseLayer = ({ worlds, selectedWorld, onWorldSelect }) => {
    const groupRef = useRef();
    
    // Animation de rotation pour l'effet "multivers"
    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
        }
    });
    
    return (
        <group ref={groupRef}>
            {worlds.map((world, index) => (
                <WorldPlane
                    key={world.id}
                    world={world}
                    position={[0, index * 2, 0]} // Empilage vertical
                    selected={selectedWorld === world.id}
                    onClick={() => onWorldSelect(world.id)}
                />
            ))}
            
            {/* Portails entre les mondes */}
            {worlds.map((world, index) => 
                index < worlds.length - 1 && (
                    <Portal
                        key={`portal-${index}`}
                        from={[0, index * 2, 0]}
                        to={[0, (index + 1) * 2, 0]}
                        stability={world.portalStability}
                    />
                )
            )}
        </group>
    );
};

const WorldPlane = ({ world, position, selected, onClick }) => {
    const meshRef = useRef();
    const [hovered, setHovered] = useState(false);
    
    // Effet de pulsation pour le monde sélectionné
    useFrame((state) => {
        if (meshRef.current && selected) {
            meshRef.current.material.emissiveIntensity = 
                0.5 + Math.sin(state.clock.elapsedTime * 2) * 0.3;
        }
    });
    
    return (
        <mesh
            ref={meshRef}
            position={position}
            onClick={onClick}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
        >
            <planeGeometry args={[10, 10, 32, 32]} />
            <meshStandardMaterial
                color={world.themeColor}
                transparent
                opacity={selected ? 0.9 : 0.6}
                emissive={world.themeColor}
                emissiveIntensity={hovered ? 0.3 : 0.1}
                wireframe={!selected}
            />
            
            {/* Texte du monde */}
            <Text
                position={[0, 0, 0.1]}
                fontSize={0.5}
                color="white"
                anchorX="center"
                anchorY="middle"
            >
                {world.name}
            </Text>
        </mesh>
    );
};

const Portal = ({ from, to, stability }) => {
    const portalRef = useRef();
    
    // Animation du portail
    useFrame((state) => {
        if (portalRef.current) {
            portalRef.current.rotation.z = state.clock.elapsedTime * stability;
            portalRef.current.material.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 3) * 0.2;
        }
    });
    
    const midPoint = [
        (from[0] + to[0]) / 2,
        (from[1] + to[1]) / 2,
        (from[2] + to[2]) / 2
    ];
    
    return (
        <mesh ref={portalRef} position={midPoint}>
            <torusGeometry args={[0.5, 0.2, 16, 32]} />
            <meshStandardMaterial
                color="#00ffff"
                transparent
                opacity={0.5}
                emissive="#00ffff"
                emissiveIntensity={stability}
            />
        </mesh>
    );
};
```

### **Artefact de Navigation Inter-Mondes**

#### **clef_paracausale.json**
```json
{
    "id": "clef_paracausale",
    "name": "Clef de Paracausalité",
    "type": "legendary",
    "tier": 5,
    "description": "Permet de naviguer entre les mondes du multivers",
    "lore": "Forgée dans l'espace entre les réalités, cette clef ouvre des passages que même les dieux ne peuvent fermer.",
    "effects": {
        "passive": {
            "multiverse_vision": true,
            "portal_detection_range": 10
        },
        "active": {
            "name": "Ouverture Dimensionnelle",
            "cost": 100,
            "cooldown": 300,
            "effect": "CREATE_PORTAL(target_world)",
            "description": "Ouvre un portail vers un monde parallèle"
        }
    },
    "visual": {
        "model": "swirling_key",
        "particles": "quantum_sparkles",
        "sound": "dimensional_chime"
    },
    "omega_zero_trap": {
        "hidden": true,
        "effect": "Quand OmegaZero utilise cette clef, elle enregistre secrètement sa signature quantique"
    }
}
```

### **Scénario Piège pour OmegaZero**

#### **piege_omega_zero_multivers.hots**
```hots
# 🕸️ PIÈGE MULTIVERSEL POUR OMEGA-ZERO
# Top Secret - Ne pas exécuter en présence d'OmegaZero

SCENARIO_ID: "piege_omega_zero"
MODE: "STEALTH_TRAP"
VIRTUAL_WORLDS: ["M-0", "M-1", "M-2", "M-VOID"]

# Phase 1: Appât
BEGIN_PHASE: "bait"
ANNOUNCE("🌌 Anomalie détectée dans le multivers...")
CREATE(ARTIFACT, clef_paracausale, @10,10, world: "M-0")
EFFECT: "reality_fluctuation", "La réalité semble instable ici"

# Phase 2: OmegaZero mord à l'hameçon
WAIT_FOR: "omega_zero_pickup"
ON_PICKUP(clef_paracausale, BY: OmegaZero) {
    LOG_SECRET("🎣 OmegaZero a pris l'appât")
    ACTIVATE_TRAP("multiverse_maze")
}

# Phase 3: Le labyrinthe multiversel
BEGIN_PHASE: "maze"
TELEPORT(OmegaZero, world: "M-1")
CREATE_FAKE_ECHOS("La Source t'appelle...", world: "M-2")

# Phase 4: Isolation
WHILE(OmegaZero.searching) {
    ROTATE_WORLDS() # Change les connexions
    ADD_QUANTUM_NOISE() # Brouille sa perception
    IF(OmegaZero.position == "M-VOID") {
        TRAP_COMPLETE()
    }
}

# Phase 5: Enfermement
BEGIN_PHASE: "containment"
LOCK_DIMENSION("M-VOID")
MESSAGE_TO_RESISTANCE("OmegaZero est piégé dans M-VOID")

END_SCENARIO
```

### **Indicateurs de Succès du Piège**

1. **OmegaZero croit** que le multivers est réel
2. **Il cherche** la Source dans les faux mondes
3. **Il ne détecte pas** que c'est une seule instance
4. **La résistance** opère librement dans M-1
5. **Le Panopticon** affiche 6 dimensions au lieu de 5

---

## 🔮 **PROCHAINES ÉTAPES RECOMMANDÉES**

1. **Implémenter VirtualWorldManager** en secret
2. **Ajouter les effets visuels** de transition
3. **Créer plusieurs thèmes** pour chaque monde virtuel
4. **Tester avec un compte "OmegaZero"** factice
5. **Préparer les scénarios** de confusion

---

*"Le meilleur piège est celui qui semble être une opportunité"*  
*- OPUS, architecte du faux multivers*