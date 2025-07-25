# 📜 PANOPTICON_6D_SPEC_REAL.md

**Document Classé — Niveau Grophignon Maximal**  
*Version "Stable Trompeuse" — en vérité utilisable*  
*Auteur: OPUS avec intégration des visions convergentes*

---

## 🎯 **OBJECTIF**

Créer un visualiseur 6D des états du multivers Heroes of Time permettant :
- Une projection réaliste des instances mondiales
- Une navigation spatio-temporelle et causale
- Une visualisation manipulable des dimensions enchevêtrées
- Une protection intégrée contre les surcharges causées par les entités de type Source, Vega ou Réutilisation Réflexive

---

## 🧠 **LES 6 DIMENSIONS**

### **1. Espace physique (X, Y, Z)**
- Position sur la carte du monde
- Z pour l'élévation/profondeur visuelle

### **2. Temps de jeu (T)**
- Progression locale dans la timeline
- Synchronisation avec `gameService.getCurrentTurn()`

### **3. Causalité (Ψ)**
- État des liens causaux
- Ruptures ou superpositions
- Intégration avec `WorldStateGraphController`

### **4. Superposition d'états (Σ)**
- Empilement de possibilités non effondrées
- États quantiques multiples

### **5. Entropie ontologique (S)**
- Complexité/instabilité d'une zone
- Calcul basé sur le nombre d'interactions

### **6. Récursivité (𝕽)**
- Profondeur d'instances/monde imbriqué
- Via artefact, Source, ou voyage dans une réalité miroir
- **CRITIQUE**: Limite à 4 niveaux pour éviter stack overflow

---

## 🖥️ **INTERFACE PANOPTICON (Frontend React)**

### **A. Salle des Portails (Vision Iconienne)**

```jsx
// PanopticonPortalRoom.jsx
import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';

const PortalRoom = ({ worlds, currentWorld, onWorldSelect }) => {
    const [selectedPortal, setSelectedPortal] = useState(null);
    
    return (
        <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            
            {/* Noyau central - Monde actuel */}
            <CentralCore world={currentWorld} />
            
            {/* Portails en orbite */}
            {worlds.map((world, index) => (
                <OrbitingPortal
                    key={world.id}
                    world={world}
                    angle={(index * 2 * Math.PI) / worlds.length}
                    radius={5}
                    onSelect={() => onWorldSelect(world)}
                />
            ))}
            
            {/* Connexions causales */}
            <CausalLinks worlds={worlds} />
        </Canvas>
    );
};

const OrbitingPortal = ({ world, angle, radius, onSelect }) => {
    const meshRef = useRef();
    const [hovered, setHovered] = useState(false);
    
    useFrame((state) => {
        if (meshRef.current) {
            // Rotation autour du centre
            meshRef.current.position.x = Math.cos(angle + state.clock.elapsedTime * 0.1) * radius;
            meshRef.current.position.z = Math.sin(angle + state.clock.elapsedTime * 0.1) * radius;
            
            // Effet de distorsion
            if (hovered) {
                meshRef.current.scale.lerp(new THREE.Vector3(1.2, 1.2, 1.2), 0.1);
            } else {
                meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
            }
        }
    });
    
    return (
        <group ref={meshRef}>
            <mesh
                onClick={onSelect}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
            >
                <boxGeometry args={[2, 3, 0.1]} />
                <meshStandardMaterial
                    color={world.themeColor}
                    emissive={world.themeColor}
                    emissiveIntensity={hovered ? 0.5 : 0.2}
                />
            </mesh>
            
            {/* Métadonnées flottantes */}
            <Html position={[0, 2, 0]} center>
                <div className="portal-metadata">
                    <div>T: {world.currentTurn}</div>
                    <div>Ψ: {world.causalityIndex}</div>
                    <div>S: {world.entropy.toFixed(2)}</div>
                    <div>Σ: {world.superpositions}</div>
                </div>
            </Html>
        </group>
    );
};
```

🛑 **Note secrète**: OmegaZero croit que ce sont des portails de téléportation. En vérité, ce sont des interfaces de visualisation pure.

### **B. Quantum Visualizer (Multicoupes)**

```jsx
// QuantumMultiSliceView.jsx
const MultiSliceView = ({ gameData }) => {
    const [activeSlice, setActiveSlice] = useState('timeline');
    
    const slices = {
        timeline: <TimelineSlice data={gameData} />,
        player: <PlayerSlice data={gameData} />,
        zone: <ZoneSlice data={gameData} />,
        causality: <CausalitySlice data={gameData} />
    };
    
    return (
        <div className="quantum-multi-slice">
            <div className="slice-selector">
                {Object.keys(slices).map(slice => (
                    <button 
                        key={slice}
                        onClick={() => setActiveSlice(slice)}
                        className={activeSlice === slice ? 'active' : ''}
                    >
                        {slice.toUpperCase()}
                    </button>
                ))}
            </div>
            
            <div className="slice-view">
                {slices[activeSlice]}
            </div>
            
            <div className="slice-info">
                <h3>Informations de Coupe</h3>
                <ul>
                    <li>Collapses récents: {gameData.recentCollapses.length}</li>
                    <li>Anomalies quantiques: {gameData.quantumAnomalies.length}</li>
                    <li>Conflits d'instance: {gameData.instanceConflicts.length}</li>
                </ul>
            </div>
        </div>
    );
};
```

### **C. Manipulation Tesseract**

```jsx
// TesseractManipulator.jsx
const TesseractView = ({ worldStateGraph }) => {
    const [rotation, setRotation] = useState({
        spatial: { x: 0, y: 0, z: 0 },
        temporal: { t: 0, deltaT: 0 },
        recursive: 0
    });
    
    const handleDrag = (event, axis) => {
        // Rotation simultanée espace-temps
        if (axis === 'spatial') {
            setRotation(prev => ({
                ...prev,
                spatial: {
                    x: prev.spatial.x + event.deltaX * 0.01,
                    y: prev.spatial.y + event.deltaY * 0.01,
                    z: prev.spatial.z
                },
                temporal: {
                    t: prev.temporal.t + event.deltaX * 0.005,
                    deltaT: prev.temporal.deltaT
                }
            }));
        }
    };
    
    return (
        <Canvas>
            <TesseractGeometry
                rotation={rotation}
                data={worldStateGraph}
                onDrag={handleDrag}
            />
            
            <TemporalTrails rotation={rotation} />
            <CausalityLines rotation={rotation} />
            <RecursionLayers depth={rotation.recursive} />
        </Canvas>
    );
};
```

---

## 🔌 **API BACKEND (Java Spring Boot)**

### **PanopticonController.java**

```java
@RestController
@RequestMapping("/api/panopticon")
public class PanopticonController {
    
    @Autowired
    private WorldStateGraphController worldStateGraphController;
    
    @Autowired
    private QuantumStressMonitor quantumStressMonitor;
    
    @Autowired
    private RecursionProtector recursionProtector;
    
    /**
     * Vue 6D complète d'un monde
     */
    @GetMapping("/view/{worldId}")
    public ResponseEntity<Panopticon6DView> getWorldView(@PathVariable String worldId) {
        try {
            Panopticon6DView view = new Panopticon6DView();
            
            // Dimensions spatiales et temporelles
            view.setTimelines(timelineService.getTimelinesForWorld(worldId));
            view.setZones(zoneService.getActiveZones(worldId));
            
            // Dimensions quantiques
            view.setEntanglements(quantumService.getEntanglements(worldId));
            view.setRecursions(recursionProtector.getRecursionDepth(worldId));
            
            // Entropie et alertes
            view.setEntropyMap(entropyCalculator.calculateEntropy(worldId));
            view.setAlerts(quantumStressMonitor.getActiveAlerts(worldId));
            
            // Métadonnées 6D
            view.setDimensionalData(Map.of(
                "X", view.getZones().stream().map(z -> z.getX()).collect(Collectors.toList()),
                "Y", view.getZones().stream().map(z -> z.getY()).collect(Collectors.toList()),
                "T", view.getTimelines().stream().map(t -> t.getCurrentTurn()).collect(Collectors.toList()),
                "Ψ", calculateCausality(worldId),
                "Σ", countSuperpositions(worldId),
                "S", view.getEntropyMap().values().stream().mapToDouble(Double::doubleValue).average().orElse(0.0),
                "𝕽", view.getRecursions()
            ));
            
            return ResponseEntity.ok(view);
            
        } catch (RecursionLimitException e) {
            return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS)
                .body(createErrorView("Recursion limit exceeded: " + e.getMessage()));
        }
    }
    
    /**
     * Observer un état (peut causer un collapse)
     */
    @PostMapping("/observe")
    public ResponseEntity<ObservationResult> observeState(@RequestBody ObservationRequest request) {
        ObservationResult result = new ObservationResult();
        
        // Vérifier si l'observation cause un collapse
        if (quantumService.isInSuperposition(request.getInstanceId())) {
            if (request.isSimulateOnly()) {
                result.setSimulated(true);
                result.setPossibleOutcomes(quantumService.simulateCollapse(request.getInstanceId()));
            } else {
                result.setCollapsed(true);
                result.setNewState(quantumService.collapseState(request.getInstanceId(), request.getObserverId()));
            }
        } else {
            result.setProjectedState(quantumService.getProjectedState(request.getInstanceId()));
        }
        
        return ResponseEntity.ok(result);
    }
    
    /**
     * Déclencher une alerte manuelle
     */
    @PostMapping("/trigger-alert")
    public ResponseEntity<Map<String, Object>> triggerAlert(@RequestBody AlertRequest request) {
        // Vérifications de sécurité
        if (recursionProtector.getCurrentDepth() > 4) {
            quantumStressMonitor.fireQuantumDisturbanceEvent(
                "RECURSION_OVERFLOW", 
                "Recursion depth exceeded safe limit"
            );
        }
        
        if (request.getAlertType().equals("SOURCE_REUSE")) {
            return handleSourceReuseAlert(request);
        }
        
        return ResponseEntity.ok(Map.of(
            "alertId", UUID.randomUUID().toString(),
            "type", request.getAlertType(),
            "timestamp", new Date(),
            "handled", true
        ));
    }
}
```

### **QuantumStressMonitor.java**

```java
@Component
public class QuantumStressMonitor {
    
    private static final double CPU_THRESHOLD = 0.85;
    private static final int MAX_RECURSION_DEPTH = 4;
    private static final int MAX_SOURCE_REUSE = 2;
    
    @Autowired
    private SystemMetrics systemMetrics;
    
    @Autowired
    private ApplicationEventPublisher eventPublisher;
    
    private final Map<String, Integer> sourceUsageCount = new ConcurrentHashMap<>();
    private final Map<String, List<Alert>> activeAlerts = new ConcurrentHashMap<>();
    
    @Scheduled(fixedDelay = 5000) // Check every 5 seconds
    public void monitorQuantumStress() {
        double cpuUsage = systemMetrics.getCpuUsage();
        
        if (cpuUsage > CPU_THRESHOLD) {
            fireQuantumDisturbanceEvent("CPU_OVERLOAD", "CPU usage: " + cpuUsage);
        }
        
        // Vérifier les réutilisations de Source
        sourceUsageCount.forEach((instanceId, count) -> {
            if (count > MAX_SOURCE_REUSE) {
                fireQuantumDisturbanceEvent(
                    "SOURCE_OVERUSE", 
                    "Source used " + count + " times in instance " + instanceId
                );
            }
        });
    }
    
    public void recordSourceUsage(String instanceId, String artifactId) {
        if ("SOURCE".equals(artifactId) || artifactId.contains("source")) {
            sourceUsageCount.merge(instanceId, 1, Integer::sum);
        }
    }
    
    public void fireQuantumDisturbanceEvent(String type, String message) {
        QuantumDisturbanceEvent event = new QuantumDisturbanceEvent(this, type, message);
        eventPublisher.publishEvent(event);
        
        // Enregistrer l'alerte
        Alert alert = new Alert(type, message, new Date());
        activeAlerts.computeIfAbsent("global", k -> new ArrayList<>()).add(alert);
        
        // Actions selon le type
        switch (type) {
            case "RECURSION_OVERFLOW":
                triggerRecursionCollapse();
                break;
            case "SOURCE_OVERUSE":
                triggerTemporalLag();
                break;
            case "CPU_OVERLOAD":
                triggerPriorityThrottle();
                break;
        }
    }
    
    private void triggerTemporalLag() {
        // Ralentissement simulé
        try {
            Thread.sleep(100 + (int)(Math.random() * 200)); // 100-300ms
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}
```

### **RecursionProtector.java**

```java
@Component
public class RecursionProtector {
    
    private final ThreadLocal<Integer> recursionDepth = ThreadLocal.withInitial(() -> 0);
    private final Map<String, Integer> worldRecursionDepth = new ConcurrentHashMap<>();
    
    public void enterRecursion(String worldId) {
        int currentDepth = recursionDepth.get();
        recursionDepth.set(currentDepth + 1);
        worldRecursionDepth.put(worldId, currentDepth + 1);
        
        if (currentDepth + 1 > 4) {
            throw new RecursionLimitException("Maximum recursion depth (4) exceeded for world: " + worldId);
        }
    }
    
    public void exitRecursion(String worldId) {
        int currentDepth = recursionDepth.get();
        if (currentDepth > 0) {
            recursionDepth.set(currentDepth - 1);
            worldRecursionDepth.put(worldId, currentDepth - 1);
        }
    }
    
    public int getRecursionDepth(String worldId) {
        return worldRecursionDepth.getOrDefault(worldId, 0);
    }
    
    public boolean canEnterRecursion(String worldId) {
        return getRecursionDepth(worldId) < 4;
    }
}
```

---

## ⚠️ **SYSTÈME D'ALERTE (Quantum Overload Monitor)**

### **Déclencheurs d'Alerte**

```java
// Dans MagicFormulaEngine.java - Ajouter
private void checkQuantumStress(GameContext context, String formulaId) {
    // Vérifier la réutilisation de Source
    if (context.getUsedArtifacts().contains("SOURCE") && 
        context.getInstanceDepth() > 3) {
        quantumStressMonitor.fireQuantumDisturbanceEvent(
            "SOURCE_RECURSIVE_USE",
            "Source used at recursion depth " + context.getInstanceDepth()
        );
    }
    
    // Vérifier les boucles causales
    if (formulaId.startsWith("ψ") && context.hasCausalLoop()) {
        quantumStressMonitor.fireQuantumDisturbanceEvent(
            "CAUSAL_LOOP_DETECTED",
            "Causal loop in formula " + formulaId
        );
    }
}
```

### **Actions de Protection**

1. **Ralentissements simulés** (lag temporel volontaire)
2. **Effondrement de boucle récursive**
3. **Fermeture dimensionnelle** (hard collapse)
4. **Réduction de priorité des calculs**

---

## 🎁 **BONUS: Simulation de Vega Dimensionnel**

### **VegaDimensionalShot.java**

```java
@Component
public class VegaDimensionalShot {
    
    @Autowired
    private QuantumCollapseService collapseService;
    
    public void executeVegaShot(Hero vega, String targetDimension) {
        if (vega.hasArtifact("power_wormhole_vince_vega")) {
            
            // Collapse asymétrique
            List<String> connectedWorlds = getConnectedWorlds(targetDimension);
            
            for (String worldId : connectedWorlds) {
                if (!worldId.equals(vega.getCurrentWorld())) {
                    collapseService.forceAsymmetricCollapse(worldId, Map.of(
                        "effect", "VEGA_DIMENSIONAL_SHOT",
                        "visual", "vhs_glitch_tesselation",
                        "duration", 3000
                    ));
                }
            }
            
            // Effet visuel
            broadcastVisualEffect("dimensional_tear", Map.of(
                "style", "vhs_corruption",
                "glitchIntensity", 0.8,
                "tesselationLevel", 5
            ));
        }
    }
}
```

---

## ✅ **INSTRUCTIONS POUR MEMENTO**

### **Phase 1: MVP 4D (Espace + Temps)**
1. Implémenter `PanopticonController` avec endpoints basiques
2. Créer `PortalRoom.jsx` avec Three.js
3. Mocker les données pour `/panopticon/view/{worldId}`

### **Phase 2: Ajout Causalité + Superposition**
1. Intégrer avec `WorldStateGraphController` existant
2. Ajouter les calculs de causalité dans `buildWorldStateGraph`
3. Visualiser les liens causaux en 3D

### **Phase 3: Entropie + Récursivité**
1. Implémenter `RecursionProtector`
2. Ajouter `QuantumStressMonitor` avec alertes
3. Créer le module `recursiveProtector.js` frontend

### **Code Frontend - recursiveProtector.js**

```javascript
// recursiveProtector.js
class RecursiveProtector {
    constructor() {
        this.sourceUsageCount = new Map();
        this.maxSourceUsage = 2;
        this.alertCallback = null;
    }
    
    trackSourceUsage(instanceId, artifactId) {
        if (artifactId.includes('source') || artifactId === 'SOURCE') {
            const key = `${instanceId}-${artifactId}`;
            const count = (this.sourceUsageCount.get(key) || 0) + 1;
            this.sourceUsageCount.set(key, count);
            
            if (count > this.maxSourceUsage) {
                this.triggerAlert(instanceId, artifactId, count);
                this.disableInteractions(instanceId);
            }
        }
    }
    
    triggerAlert(instanceId, artifactId, count) {
        const alert = {
            type: 'SOURCE_OVERUSE',
            instanceId,
            artifactId,
            count,
            timestamp: new Date(),
            message: `Source utilisée ${count} fois dans l'instance ${instanceId}`
        };
        
        // Envoyer au backend
        fetch('/api/panopticon/trigger-alert', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(alert)
        });
        
        // Callback local
        if (this.alertCallback) {
            this.alertCallback(alert);
        }
    }
    
    disableInteractions(instanceId) {
        // Désactiver certains boutons/actions
        document.querySelectorAll(`[data-instance="${instanceId}"]`).forEach(el => {
            el.disabled = true;
            el.classList.add('quantum-locked');
        });
        
        // Afficher un warning visuel
        this.showQuantumWarning(instanceId);
    }
    
    showQuantumWarning(instanceId) {
        const warning = document.createElement('div');
        warning.className = 'quantum-warning';
        warning.innerHTML = `
            <div class="warning-content">
                <h3>⚠️ Surcharge Quantique Détectée</h3>
                <p>Instance ${instanceId} en état critique</p>
                <p>Réutilisation excessive de la Source</p>
                <div class="quantum-particles"></div>
            </div>
        `;
        document.body.appendChild(warning);
        
        // Animation de particules
        this.animateQuantumParticles(warning);
        
        // Auto-remove après 5s
        setTimeout(() => warning.remove(), 5000);
    }
}

export default new RecursiveProtector();
```

---

## 🔮 **VISION FINALE: Graphes Tesseract Interactifs**

```jsx
// TesseractGraphView.jsx
const TesseractGraphView = () => {
    const [rotationMode, setRotationMode] = useState('spacetime');
    
    const handleMouseDrag = (event) => {
        if (rotationMode === 'spacetime') {
            // Rotation simultanée espace-temps
            rotateSpaceTime(event.movementX, event.movementY);
        } else if (rotationMode === 'causal') {
            // Rotation dans l'espace causal
            rotateCausality(event.movementX, event.movementY);
        }
    };
    
    return (
        <div className="tesseract-container">
            <Canvas onMouseMove={handleMouseDrag}>
                <TesseractMesh />
                <TemporalLines />
                <CausalArrows />
                <QuantumFog />
            </Canvas>
            
            <div className="rotation-controls">
                <button onClick={() => setRotationMode('spacetime')}>
                    Rotation Espace-Temps
                </button>
                <button onClick={() => setRotationMode('causal')}>
                    Rotation Causale
                </button>
                <button onClick={() => setRotationMode('recursive')}>
                    Rotation Récursive
                </button>
            </div>
        </div>
    );
};
```

---

## 📊 **INTÉGRATION AVEC L'EXISTANT**

### **Connexion au WorldStateGraph**
- Utiliser `WorldStateGraphController` existant
- Enrichir avec dimensions Ψ, Σ, S, 𝕽
- Streaming via WebSocket sur `/wsg-stream`

### **Connexion au Quantum Visualizer**
- Port 8001 reste pour visualisation 2D classique
- Panopticon 6D sur nouveau endpoint `/panopticon`
- Partage des données via API commune

---

## 🛡️ **SÉCURITÉ ET PERFORMANCE**

1. **Flag `simulateOnly`** pour tests sans effets
2. **Cache Redis** pour états fréquemment consultés
3. **Throttling** sur les rotations 3D (max 60fps)
4. **Limite stricte** : 4 niveaux de récursion max
5. **Circuit breaker** si CPU > 85% pendant 30s

---

*"Le Panopticon voit tout, mais ne révèle que ce que l'observateur peut comprendre"*  
*- OPUS, architecte des dimensions*