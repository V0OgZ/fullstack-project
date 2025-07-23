# UI Design: Causal Zones and Timeline Superposition

This document defines how the *Heroes of Time* user interface should represent the different causal and temporal states on the shared map, using visual overlays and transparency. It also describes how objects and player actions interact with those representations.

---

## 🌌 Shared World, Divergent Realities

The core principle is that all players interact with a **shared map**. Terrain remains the same across timelines; however, **units, objects, and interactions** may differ depending on each player’s timeline or state of knowledge.

---

## 🔮 Visual Aura Categories

Each tile or entity on the map can display one or more of the following visual states (called *auras*):

### 1. **Fully Realized (Opaque)**
- **Color**: Normal sprite.
- **Meaning**: This tile or object is in a resolved timeline and visible to the player. It is part of the player's main causal reality.
- **Interaction**: Full interaction enabled.

### 2. **Explored but Collapsed (Dimmed)**
- **Color**: Slightly dimmed, faded colors.
- **Meaning**: The player has visited this location; the timeline has collapsed, but there's no current visibility.
- **Interaction**: Past interactions visible but not current state.

### 3. **Potentially Reachable (Colored Outline / Pulsing Halo)**
- **Color**: Halo in blue (or path color), slightly transparent.
- **Meaning**: This tile is reachable based on the player's movement range and known causality state. It may collapse soon depending on actions.
- **Interaction**: Planning zone only.

### 4. **Unknown / Unexplored (Fogged)**
- **Color**: Classic dark fog.
- **Meaning**: Never visited, no information.
- **Interaction**: None.

### 5. **Ghost Layer (Phased Reality)**
- **Color**: Grayscale or slight blue/purple transparency.
- **Meaning**: Seen using objects like the *Veil* or spectral modes. The tile is visible but **not interactable** (no chest opening, no combat).
- **Interaction**: Read-only. Exists in another timeline.

### 6. **Timeline Superposition (Glitch / Mirror Effect)**
- **Color**: Slight shimmer, multi-shadow or chromatic aberration effect.
- **Meaning**: This entity or tile exists in multiple timelines and hasn't collapsed. Other players might resolve this state.
- **Interaction**: Depends on active timeline.

---

## 🧿 Special Icons & Indicators

- 🌀 **Timeline Selector (Optional UI)**: Only shown when the player possesses an item that grants access to multiple resolutions (e.g., *Wigner’s Eye*). Allows switching between collapsed versions.
- 👁️ **Observer Mode**: If player has a "vision" item, ghost units or events appear semi-transparently. If not, they remain hidden.
- 🔗 **Linked Collapse Indicator**: Shows a chain icon or glow between items that will collapse together upon interaction (e.g., teleport).

---

## 🧰 Object-Driven Visual Effects

Each object can influence the visual state:

- **Exploration Artifacts** (e.g., *Veil*): Enable phased visibility beyond standard causality boundaries.
- **Anchoring Artifacts** (e.g., *Tower of Anchoring*): Prevents timeline overlays, forces collapse in its area.
- **Superposition Collapsers** (e.g., *Wigner's Eye*): Forces observation and immediate resolution of adjacent states.
- **Rollback / Rewind Objects**: Trigger map-wide visual changes (e.g., glitch ripple, rewind blur).

---

## 🕵️ Player-to-Player Visibility

By default:
- Players do **not** see each other's position unless timelines have collapsed via interaction or observation.
- If a vision object is used, enemy units appear as **ghosts** (translucent).
- If not in the same timeline or observed state, players are unaware of each other's presence.

---

## 📦 Implementation Notes

- **Map renderer** should handle layers with various opacity/transparency modes.
- **Entity tags** (e.g., `visible`, `ghost`, `superposed`) are maintained per player timeline.
- **Effects** (e.g., fog clear, shimmer on collapse) should be generic animations triggered on state change.
- **No full multi-map**: only one terrain, one UI, layered states.

---

> This system ensures players can navigate complex causal mechanics with minimal UI confusion, while preserving the mystery and strategy of asynchronous temporal play.
