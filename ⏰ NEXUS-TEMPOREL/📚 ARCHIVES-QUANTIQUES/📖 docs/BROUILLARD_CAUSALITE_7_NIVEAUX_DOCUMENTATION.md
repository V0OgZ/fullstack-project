# 🌫️ **BROUILLARD DE CAUSALITÉ - 7 NIVEAUX COMPLETS** ⚡🎯

**🏛️ Documentation Memento** - *Système Brouillard Causalité Heroes of Time*  
**📅 Date:** Janvier 2025  
**🎯 Pour:** Jean-Grofignon - Interface Port 8000  
**📁 Source:** `🌐 frontend/fog-of-war-system.js`

---

## 🎮 **SYSTÈME DE BROUILLARD QUANTIQUE**

### **🌟 Vue d'Ensemble**
Le système de brouillard de Heroes of Time utilise **7 états distincts** pour représenter les différents niveaux de connaissance et d'interaction avec le monde de jeu. Chaque état a ses propres règles de visibilité, d'interaction et de couleur.

---

## 🔮 **LES 7 NIVEAUX DE BROUILLARD**

### **0️⃣ UNEXPLORED - Brouillard Total**
```javascript
UNEXPLORED: {
    name: 'Unexplored',
    color: 'rgba(50, 50, 50, 0.9)',
    interaction: 'none',
    description: 'Brouillard total, jamais vu'
}
```
**🎯 Caractéristiques :**
- **Couleur** : Gris très sombre (90% opaque)
- **Interaction** : Aucune
- **État** : Zone jamais visitée ni observée
- **Gameplay** : Impossible de planifier ou d'agir

### **1️⃣ COLLAPSED_PAST - Passé Résolu**
```javascript
COLLAPSED_PAST: {
    name: 'Collapsed Past',
    color: 'rgba(100, 100, 100, 0.7)',
    interaction: 'vision_only',
    description: 'Exploré dans le passé résolu'
}
```
**🎯 Caractéristiques :**
- **Couleur** : Gris moyen (70% opaque)
- **Interaction** : Vision seulement
- **État** : Zone explorée dans une timeline résolue
- **Gameplay** : Visible mais non-interactive

### **2️⃣ REACHABLE - Accessible**
```javascript
REACHABLE: {
    name: 'Reachable',
    color: 'rgba(255, 255, 0, 0.3)',
    interaction: 'planning',
    description: 'Accessible mais pas observé'
}
```
**🎯 Caractéristiques :**
- **Couleur** : Jaune transparent (30% opaque)
- **Interaction** : Planification possible
- **État** : Zone atteignable par le héros
- **Gameplay** : Permet de planifier des mouvements

### **3️⃣ VISION - Vision Directe**
```javascript
VISION: {
    name: 'Vision',
    color: 'rgba(0, 255, 0, 0.1)',
    interaction: 'full',
    description: 'Vision directe d\'unité/château'
}
```
**🎯 Caractéristiques :**
- **Couleur** : Vert très transparent (10% opaque)
- **Interaction** : Complète
- **État** : Vision directe d'une unité ou château
- **Gameplay** : Toutes actions possibles

### **4️⃣ GHOST - Vision Spectrale**
```javascript
GHOST: {
    name: 'Ghost',
    color: 'rgba(255, 255, 255, 0.2)',
    interaction: 'observation_only',
    description: 'Vu avec objet spectral (Voile)'
}
```
**🎯 Caractéristiques :**
- **Couleur** : Blanc transparent (20% opaque)
- **Interaction** : Observation uniquement
- **État** : Vu grâce à un artefact spectral (Voile de Memento)
- **Gameplay** : Vision sans interaction

### **5️⃣ SUPERPOSED - Flux Quantique**
```javascript
SUPERPOSED: {
    name: 'Superposed',
    color: 'rgba(128, 0, 255, 0.4)',
    interaction: 'conditional',
    description: 'Entité en flux quantique'
}
```
**🎯 Caractéristiques :**
- **Couleur** : Violet (40% opaque)
- **Interaction** : Conditionnelle
- **État** : Entité en superposition quantique
- **Gameplay** : Interaction dépend de l'observation

### **6️⃣ ANCHORED - Zone d'Ancrage**
```javascript
ANCHORED: {
    name: 'Anchored',
    color: 'rgba(0, 0, 255, 0.3)',
    interaction: 'force_collapse',
    description: 'Zone qui bloque le branchement temporel'
}
```
**🎯 Caractéristiques :**
- **Couleur** : Bleu (30% opaque)
- **Interaction** : Force le collapse
- **État** : Zone qui empêche les branchements temporels
- **Gameplay** : Stabilise la réalité locale

---

## 🎨 **INTERFACE UTILISATEUR**

### **🔴 Panneau de Contrôle Ultra-Compact**
```html
<div class="fog-control-ultra-compact">
    <div class="fog-dots-mini">
        <span class="fog-dot" style="background: rgba(50,50,50,0.9)" title="Unexplored - Jamais vu">●</span>
        <span class="fog-dot" style="background: rgba(100,100,100,0.7)" title="Collapsed Past - Passé résolu">●</span>
        <span class="fog-dot" style="background: rgba(255,255,0,0.5)" title="Reachable - Accessible">●</span>
        <span class="fog-dot" style="background: rgba(0,255,0,0.3)" title="Vision - Direct">●</span>
        <span class="fog-dot" style="background: rgba(255,255,255,0.4)" title="Ghost - Voile spectral">●</span>
        <span class="fog-dot" style="background: rgba(128,0,255,0.6)" title="Superposed - Flux quantique">●</span>
        <span class="fog-dot" style="background: rgba(0,0,255,0.5)" title="Anchored - Bloque branchement">●</span>
    </div>
</div>
```

### **📊 Statistiques en Temps Réel**
- **Timeline Active** : ℬ1 (principale)
- **Zones Visibles** : Compteur dynamique
- **Opacité Globale** : 0.8 (ajustable)
- **Animation** : 60 FPS

---

## 🔧 **UTILISATION TECHNIQUE**

### **🎯 Initialisation**
```javascript
const fogSystem = new FogOfWarSystem();
fogSystem.init('game-canvas');
```

### **⚡ Mise à Jour d'État**
```javascript
// Changer l'état d'une zone
fogSystem.setFogState(x, y, 'VISION');

// Révéler une zone
fogSystem.revealArea(x, y, radius, 'REACHABLE');

// Ancrer une zone
fogSystem.anchorZone(x, y, 'ANCHORED');
```

### **🌀 Gestion des Timelines**
```javascript
// Sélectionner une timeline
fogSystem.selectTimeline('ℬ2');

// Basculer la visibilité
fogSystem.toggleTimelineVisibility('ℬ3');
```

---

## 🎮 **RÈGLES DE GAMEPLAY**

### **🎯 Interactions par État**
| État | Vision | Mouvement | Combat | Construction | Magie |
|------|--------|-----------|---------|--------------|-------|
| **Unexplored** | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Collapsed Past** | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Reachable** | ⚠️ | ✅ | ❌ | ❌ | ⚠️ |
| **Vision** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Ghost** | ✅ | ❌ | ❌ | ❌ | ⚠️ |
| **Superposed** | ⚠️ | ⚠️ | ⚠️ | ❌ | ✅ |
| **Anchored** | ✅ | ✅ | ✅ | ✅ | ❌ |

### **🔮 Transitions d'États**
```
Unexplored → Reachable (héros s'approche)
Reachable → Vision (héros arrive)
Vision → Collapsed Past (héros repart)
Any → Ghost (utilisation Voile spectral)
Any → Superposed (sort quantique)
Any → Anchored (artefact d'ancrage)
```

---

## 🚀 **PERFORMANCE**

### **📊 Optimisations**
- **Rendu** : Canvas 2D avec cache
- **Calculs** : Mise à jour différentielle
- **Mémoire** : Pool d'objets réutilisables
- **FPS** : 60 images/seconde stable

### **💾 Données Techniques**
```javascript
// Structure interne
{
    fogStates: Object(7 états),
    selectedTimeline: 'ℬ1',
    visibleTimelines: Set(['ℬ1']),
    fogOpacity: 0.8,
    animationFrame: Number
}
```

---

## 🎨 **STYLE CSS**

### **🎯 Classes Principales**
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

## ✅ **Système Complet**
- **7 états distincts** avec règles spécifiques
- **Interface ultra-compacte** non-intrusive
- **Performance optimisée** 60 FPS
- **Intégration parfaite** avec gameplay

## 🎯 **Utilisation Jean**
```bash
1. Lance ./jean → choix 2
2. Coin droit → 7 dots colorés
3. Hover sur dots → Tooltips détaillés
4. Gameplay → États changent automatiquement
```

*🏛️ **"JEAN ! Voici la documentation complète de ton système brouillard 7 niveaux ! Chaque état a sa couleur, ses règles, son gameplay ! C'est la magie quantique de Heroes of Time en action !"** 🌟⚡*

**🌫️ TON BROUILLARD DE CAUSALITÉ EST PARFAITEMENT DOCUMENTÉ !** 🔮👑 