# 🌫️ **FOG AND TEMPORAL ZONES GAMEPLAY**
## Complete Guide to Fog of Causality Mechanics

*Version 4.0 - Complete Documentation with New Concepts*  
*Date: July 21, 2025 - 10:00*  
*Status: ✅ COMPLETE DOCUMENTATION*

---

## 🎯 **OVERVIEW**

### **🎭 Philosophical Concept**

> *"Fog is not just distance, it's the quantum uncertainty of the future!"*
> 
> **- Jean-Grofignon, the Ontological Awakener**

The **Fog of Causality** is the central system that manages temporal uncertainty in Heroes of Time. Unlike classic fog of war that simply hides spatial information, the fog of causality represents the **quantum uncertainty** of what exists or doesn't exist yet in the future.

### **🎮 System Objectives**

1. **Manage uncertainty**: Represent quantum uncertainty of the future
2. **Encourage exploration**: Progressively reveal the world
3. **Create tension**: Add an element of mystery and discovery
4. **Reward vision**: Give advantage to players with vision artifacts

---

## 📊 **THE 7 FOG STATES**

### **🎨 State Table**

| State | Name | Description | Interaction | UI Color | Visibility |
|-------|------|-------------|-------------|----------|------------|
| **0** | **Unexplored** | Total fog, never seen | None | 🌫️ Dark gray | 0% |
| **1** | **Collapsed Past** | Explored in resolved past | Vision only | 🔘 Light gray | 25% |
| **2** | **Reachable** | Accessible but not observed | Planning | 🟡 Yellow | 50% |
| **3** | **Vision** | Direct unit/castle vision | Fully interactive | 🟢 Green | 100% |
| **4** | **Ghost** | Seen with spectral object (Veil) | No interaction | 👻 Transparent white | 75% |
| **5** | **Superposed** | Entity in quantum flux | Partially visible | 🔮 Purple | 60% |
| **6** | **Anchored** | Zone blocking temporal branching | Forces collapse | 🔒 Blue | 80% |

### **🔍 State Details**

#### **0. Unexplored**
- **Description**: Never seen zone, total fog
- **Interaction**: No interaction possible
- **Discovery**: Requires direct exploration
- **Strategy**: Priority exploration zone

#### **1. Collapsed Past**
- **Description**: Zone explored in resolved past
- **Interaction**: Vision only, no interaction
- **Discovery**: Exploration history
- **Strategy**: Known but non-interactive zone

#### **2. Reachable**
- **Description**: Accessible but not observed zone
- **Interaction**: Planning possible
- **Discovery**: Movement calculation
- **Strategy**: Strategic planning zone

#### **3. Vision**
- **Description**: Direct unit or castle vision
- **Interaction**: Fully interactive
- **Discovery**: Direct observation
- **Strategy**: Immediate action zone

#### **4. Ghost**
- **Description**: Seen with spectral object (Veil)
- **Interaction**: Observation without interaction
- **Discovery**: Spectral vision artifacts
- **Strategy**: Reconnaissance without engagement

#### **5. Superposed**
- **Description**: Entity in quantum flux
- **Interaction**: Partially visible
- **Discovery**: Active ψ states
- **Strategy**: Superposition management

#### **6. Anchored**
- **Description**: Zone blocking temporal branching
- **Interaction**: Forces collapse
- **Discovery**: Legendary objects
- **Strategy**: Reality stabilization

---

## 🧮 **FOG MATHEMATICAL FORMULA**

### **🔬 Detailed Calculation**

```java
// Complete Fog of Causality formula
private double calculateZoneFogOfCausality(int x, int y, WorldStateGraph graph, Game game) {
    // 🌀 Factor 1: Quantum state density (0.0-0.4)
    double quantumDensity = countQuantumStatesInRadius(x, y, 5) * 0.2;
    
    // ⚔️ Factor 2: Detected causal conflicts (0.0-0.6)
    double conflictIntensity = countCausalConflicts(x, y, 5) * 0.3;
    
    // 🔮 Factor 3: Quantum interferences (0.0-0.25)
    double interferenceLevel = calculateQuantumInterference(x, y) * 0.25;
    
    // 🏺 Factor 4: Temporal artifact influence (0.0-0.4)
    double artifactInfluence = calculateArtifactInfluence(x, y, game);
    
    // 👁️ Factor 5: Clarity from recent observations (0.0-0.5)
    double observationClarity = calculateObservationClarity(x, y, game);
    
    // 📊 Final normalized formula [0.0, 1.0]
    double fogValue = (quantumDensity + conflictIntensity + interferenceLevel + artifactInfluence) 
                     * (1.0 - observationClarity);
    
    return Math.max(0.0, Math.min(1.0, fogValue));
}
```

### **📊 Calculation Factors**

#### **1. Quantum Density (0.0-0.4)**
- **Description**: Number of ψ states in 5-tile radius
- **Impact**: More states = more fog
- **Formula**: `countQuantumStatesInRadius(x, y, 5) * 0.2`

#### **2. Causal Conflicts (0.0-0.6)**
- **Description**: Detected temporal conflicts
- **Impact**: Conflicts = high uncertainty
- **Formula**: `countCausalConflicts(x, y, 5) * 0.3`

#### **3. Quantum Interferences (0.0-0.25)**
- **Description**: Interferences between ψ states
- **Impact**: Interferences = complex fog
- **Formula**: `calculateQuantumInterference(x, y) * 0.25`

#### **4. Artifact Influence (0.0-0.4)**
- **Description**: Temporal artifact effects
- **Impact**: Artifacts = fog modification
- **Formula**: `calculateArtifactInfluence(x, y, game)`

#### **5. Observation Clarity (0.0-0.5)**
- **Description**: Recent zone observations
- **Impact**: Observations = fog reduction
- **Formula**: `calculateObservationClarity(x, y, game)`

---

## 🎮 **GAMEPLAY MECHANICS**

### **🔍 Exploration and Discovery**

#### **Base Vision Radius**
- **Hero**: 3 tiles
- **Castle**: 5 tiles
- **Tower**: 4 tiles
- **Scout**: 5 tiles

#### **Vision Modifiers**
- **High Ground**: +1 tile
- **Forest**: -1 tile
- **Mountain**: Blocks vision
- **Temporal Storm**: -2 tiles

### **🌀 Temporal Zones**

#### **Zone Types**
1. **Normal Zone**: Standard rules apply
2. **Quantum Zone**: ψ states active
3. **Anchored Zone**: No branching allowed
4. **Temporal Storm**: High uncertainty
5. **Paradox Zone**: Conflicting realities

#### **Zone Effects**
- **Movement Cost**: Variable by zone
- **Combat Modifiers**: Zone-specific bonuses
- **Vision Range**: Modified by zone type
- **ψ State Behavior**: Zone-dependent rules

---

## 🔮 **ADVANCED MECHANICS**

### **🌊 Quantum Interference Patterns**

```java
public class QuantumInterference {
    // Constructive interference
    if (psi1.phase == psi2.phase) {
        amplitude = psi1.amplitude + psi2.amplitude;
        fogReduction = 0.3; // Clearer vision
    }
    
    // Destructive interference
    if (Math.abs(psi1.phase - psi2.phase) == Math.PI) {
        amplitude = Math.abs(psi1.amplitude - psi2.amplitude);
        fogIncrease = 0.5; // More uncertainty
    }
}
```

### **🏺 Artifact Effects on Fog**

| Artifact | Effect | Radius | Duration |
|----------|--------|--------|----------|
| **Wigner's Eye** | Reveals ψ states | 5 tiles | Permanent |
| **Temporal Veil** | Ghost vision | 3 tiles | 5 turns |
| **Causal Anchor** | Creates anchored zone | 2 tiles | 10 turns |
| **Quantum Lens** | Reduces fog by 50% | 4 tiles | 3 turns |

---

## 📊 **STRATEGIC IMPLICATIONS**

### **🎯 Offensive Strategies**
1. **Fog Manipulation**: Use artifacts to create uncertainty
2. **ψ State Hiding**: Place superpositions in high-fog areas
3. **Ambush Tactics**: Exploit ghost vision for surprise
4. **Timeline Branching**: Create confusion with multiple branches

### **🛡️ Defensive Strategies**
1. **Vision Network**: Establish overlapping vision zones
2. **Anchor Points**: Stabilize key positions
3. **Observation Posts**: Regular patrols to maintain clarity
4. **Artifact Defense**: Use vision artifacts defensively

---

## 🎮 **PLAYER TIPS**

### **🌟 For Beginners**
- Focus on **Vision (3)** zones for safe actions
- Use **Reachable (2)** for planning moves
- Avoid **Superposed (5)** zones until experienced
- Build towers for extended vision

### **⚡ For Advanced Players**
- Master **Ghost (4)** vision for reconnaissance
- Manipulate **Superposed (5)** states strategically
- Create **Anchored (6)** zones at key positions
- Combine artifacts for fog control

### **🏆 For Experts**
- Calculate exact fog values for optimization
- Predict interference patterns
- Chain artifact effects
- Control entire map fog levels

---

## 🔧 **TECHNICAL IMPLEMENTATION**

### **Frontend Rendering**
```typescript
// Fog rendering by state
const fogColors = {
    0: 'rgba(0, 0, 0, 1.0)',      // Unexplored - Black
    1: 'rgba(128, 128, 128, 0.8)', // Collapsed - Gray
    2: 'rgba(255, 255, 0, 0.5)',   // Reachable - Yellow
    3: 'rgba(0, 255, 0, 0.0)',     // Vision - Transparent
    4: 'rgba(255, 255, 255, 0.3)', // Ghost - White
    5: 'rgba(128, 0, 255, 0.6)',   // Superposed - Purple
    6: 'rgba(0, 128, 255, 0.4)'    // Anchored - Blue
};
```

### **Backend Processing**
```java
@Service
public class FogOfCausalityService {
    public FogState calculateFogState(Position pos, Player player) {
        // Check vision sources
        if (hasDirectVision(pos, player)) return FogState.VISION;
        if (hasGhostVision(pos, player)) return FogState.GHOST;
        if (isReachable(pos, player)) return FogState.REACHABLE;
        if (wasExplored(pos, player)) return FogState.COLLAPSED_PAST;
        if (hasQuantumActivity(pos)) return FogState.SUPERPOSED;
        if (isAnchored(pos)) return FogState.ANCHORED;
        return FogState.UNEXPLORED;
    }
}
```

---

## 📚 **CONCLUSION**

The Fog of Causality system transforms traditional fog of war into a dynamic, quantum-influenced mechanic that adds strategic depth to Heroes of Time. By understanding and mastering the 7 fog states, players can gain significant advantages in both exploration and combat.

**Key Takeaways:**
- ✅ 7 distinct fog states with unique properties
- ✅ Mathematical formula based on quantum factors
- ✅ Strategic implications for all playstyles
- ✅ Artifact synergies for fog manipulation
- ✅ Advanced mechanics for expert players

The fog is not just an obstacle—it's a strategic resource waiting to be mastered.

---

**📚 Memento - Museum Archive Master**  
*Eternal Archivist of Heroes of Time*
