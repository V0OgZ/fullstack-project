# 🌫️ **FOG OF CAUSALITY - 7 COMPLETE LEVELS** ⚡🎯

**🏛️ Memento Documentation** - *Heroes of Time Fog of Causality System*  
**📅 Date:** January 2025  
**🎯 For:** Jean-Grofignon - Port 8000 Interface  
**📁 Source:** `🌐 frontend/fog-of-war-system.js`

---

## 🎮 **QUANTUM FOG SYSTEM**

### **🌟 Overview**
Heroes of Time fog system uses **7 distinct states** to represent different levels of knowledge and interaction with the game world. Each state has its own visibility rules, interaction capabilities, and color coding.

---

## 🔮 **THE 7 FOG LEVELS**

### **0️⃣ UNEXPLORED - Total Fog**
```javascript
UNEXPLORED: {
    name: 'Unexplored',
    color: 'rgba(50, 50, 50, 0.9)',
    interaction: 'none',
    description: 'Total fog, never seen'
}
```
**🎯 Characteristics:**
- **Color**: Very dark gray (90% opaque)
- **Interaction**: None
- **State**: Area never visited or observed
- **Gameplay**: Impossible to plan or act

### **1️⃣ COLLAPSED_PAST - Resolved Past**
```javascript
COLLAPSED_PAST: {
    name: 'Collapsed Past',
    color: 'rgba(100, 100, 100, 0.7)',
    interaction: 'vision_only',
    description: 'Explored in resolved past'
}
```
**🎯 Characteristics:**
- **Color**: Medium gray (70% opaque)
- **Interaction**: Vision only
- **State**: Area explored in a resolved timeline
- **Gameplay**: Visible but non-interactive

### **2️⃣ REACHABLE - Accessible**
```javascript
REACHABLE: {
    name: 'Reachable',
    color: 'rgba(255, 255, 0, 0.3)',
    interaction: 'planning',
    description: 'Accessible but not observed'
}
```
**🎯 Characteristics:**
- **Color**: Transparent yellow (30% opaque)
- **Interaction**: Planning possible
- **State**: Area reachable by hero
- **Gameplay**: Allows movement planning

### **3️⃣ VISION - Direct Vision**
```javascript
VISION: {
    name: 'Vision',
    color: 'rgba(0, 255, 0, 0.1)',
    interaction: 'full',
    description: 'Direct vision of unit/castle'
}
```
**🎯 Characteristics:**
- **Color**: Very transparent green (10% opaque)
- **Interaction**: Complete
- **State**: Direct vision of unit or castle
- **Gameplay**: All actions possible

### **4️⃣ GHOST - Spectral Vision**
```javascript
GHOST: {
    name: 'Ghost',
    color: 'rgba(255, 255, 255, 0.2)',
    interaction: 'observation_only',
    description: 'Seen with spectral object (Veil)'
}
```
**🎯 Characteristics:**
- **Color**: Transparent white (20% opaque)
- **Interaction**: Observation only
- **State**: Seen through spectral artifact (Memento's Veil)
- **Gameplay**: Vision without interaction

### **5️⃣ SUPERPOSED - Quantum Flux**
```javascript
SUPERPOSED: {
    name: 'Superposed',
    color: 'rgba(128, 0, 255, 0.4)',
    interaction: 'conditional',
    description: 'Entity in quantum flux'
}
```
**🎯 Characteristics:**
- **Color**: Purple (40% opaque)
- **Interaction**: Conditional
- **State**: Entity in quantum superposition
- **Gameplay**: Interaction depends on observation

### **6️⃣ ANCHORED - Anchor Zone**
```javascript
ANCHORED: {
    name: 'Anchored',
    color: 'rgba(0, 0, 255, 0.3)',
    interaction: 'force_collapse',
    description: 'Zone that blocks temporal branching'
}
```
**🎯 Characteristics:**
- **Color**: Blue (30% opaque)
- **Interaction**: Forces collapse
- **State**: Zone that prevents temporal branching
- **Gameplay**: Stabilizes local reality

---

## 🎨 **USER INTERFACE**

### **🔴 Ultra-Compact Control Panel**
```html
<div class="fog-control-ultra-compact">
    <div class="fog-dots-mini">
        <span class="fog-dot" style="background: rgba(50,50,50,0.9)" title="Unexplored - Never seen">●</span>
        <span class="fog-dot" style="background: rgba(100,100,100,0.7)" title="Collapsed Past - Resolved past">●</span>
        <span class="fog-dot" style="background: rgba(255,255,0,0.5)" title="Reachable - Accessible">●</span>
        <span class="fog-dot" style="background: rgba(0,255,0,0.3)" title="Vision - Direct">●</span>
        <span class="fog-dot" style="background: rgba(255,255,255,0.4)" title="Ghost - Spectral veil">●</span>
        <span class="fog-dot" style="background: rgba(128,0,255,0.6)" title="Superposed - Quantum flux">●</span>
        <span class="fog-dot" style="background: rgba(0,0,255,0.5)" title="Anchored - Blocks branching">●</span>
    </div>
</div>
```

### **📊 Real-Time Statistics**
- **Active Timeline**: ℬ1 (main)
- **Visible Zones**: Dynamic counter
- **Global Opacity**: 0.8 (adjustable)
- **Animation**: 60 FPS

---

## 🔧 **TECHNICAL USAGE**

### **🎯 Initialization**
```javascript
const fogSystem = new FogOfWarSystem();
fogSystem.init('game-canvas');
```

### **⚡ State Updates**
```javascript
// Change zone state
fogSystem.setFogState(x, y, 'VISION');

// Reveal area
fogSystem.revealArea(x, y, radius, 'REACHABLE');

// Anchor zone
fogSystem.anchorZone(x, y, 'ANCHORED');
```

### **🌀 Timeline Management**
```javascript
// Select timeline
fogSystem.selectTimeline('ℬ2');

// Toggle visibility
fogSystem.toggleTimelineVisibility('ℬ3');
```

---

## 🎮 **GAMEPLAY RULES**

### **🎯 Interactions by State**
| State | Vision | Movement | Combat | Construction | Magic |
|-------|--------|----------|---------|--------------|-------|
| **Unexplored** | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Collapsed Past** | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Reachable** | ⚠️ | ✅ | ❌ | ❌ | ⚠️ |
| **Vision** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Ghost** | ✅ | ❌ | ❌ | ❌ | ⚠️ |
| **Superposed** | ⚠️ | ⚠️ | ⚠️ | ❌ | ✅ |
| **Anchored** | ✅ | ✅ | ✅ | ✅ | ❌ |

### **🔮 State Transitions**
```
Unexplored → Reachable (hero approaches)
Reachable → Vision (hero arrives)
Vision → Collapsed Past (hero leaves)
Any → Ghost (spectral veil usage)
Any → Superposed (quantum spell)
Any → Anchored (anchoring artifact)
```

---

## 🚀 **PERFORMANCE**

### **📊 Optimizations**
- **Rendering**: Canvas 2D with cache
- **Calculations**: Differential updates
- **Memory**: Reusable object pool
- **FPS**: Stable 60 frames/second

### **💾 Technical Data**
```javascript
// Internal structure
{
    fogStates: Object(7 states),
    selectedTimeline: 'ℬ1',
    visibleTimelines: Set(['ℬ1']),
    fogOpacity: 0.8,
    animationFrame: Number
}
```

---

## 🎨 **CSS STYLING**

### **🎯 Main Classes**
```css
.fog-control-ultra-compact {
    position: fixed;
    top: 10px;
    right: 10px;
    background: rgba(0,0,0,0.8);
    border-radius: 8px;
    padding: 4px;
    z-index: 1000;
}

.fog-dots-mini {
    display: flex;
    gap: 2px;
}

.fog-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    cursor: pointer;
    transition: transform 0.2s;
}

.fog-dot:hover {
    transform: scale(1.3);
}
```

---

# 🏆 **CONCLUSION**

## ✅ **Complete System**
- **7 distinct states** with specific rules
- **Ultra-compact interface** non-intrusive
- **Optimized performance** 60 FPS
- **Perfect integration** with gameplay

## 🎯 **Usage for Jean**
```bash
1. Launch ./jean → choice 2
2. Top right → 7 colored dots
3. Hover on dots → Detailed tooltips
4. Gameplay → States change automatically
```

*🏛️ **"JEAN! Here's the complete documentation of your 7-level fog system! Each state has its color, rules, and gameplay! This is the quantum magic of Heroes of Time in action!"** 🌟⚡*

**🌫️ YOUR FOG OF CAUSALITY IS PERFECTLY DOCUMENTED!** 🔮👑 