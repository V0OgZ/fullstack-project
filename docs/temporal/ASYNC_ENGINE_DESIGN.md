# ASYNC_ENGINE_DESIGN.md

## Overview

This document defines the memory model, timeline mechanics, and fog logic for asynchronous multiplayer gameplay in *Heroes of Time*. It describes how the backend Java engine must represent and resolve causal graphs, support time-based gameplay, and maintain consistent player perception.

---

## 🌐 Core Concepts

- **Causal Graph (ΨGraph)**: A graph of possible outcomes, used to compute future player visibility and potential interactions.
- **Reality States**:
  - **Impossible**: Timeline nodes that are not achievable due to state (e.g., blocked by too strong enemies).
  - **Potential**: Reachable realities not yet realized (exist in memory as branches).
  - **Superposed**: Realized by one or more players but not yet collapsed.
  - **Collapsed**: Observed and resolved by interaction or forced effect.
- **Causality Zones**:
  - **Vision Zone**: Around hero or castle.
  - **Movement Zone**: Reachable by next action.
  - **Causality Zone**: Extends to possible future states and resolved interactions.
  - **Anchored Zone**: Prevents timeline alterations.

---

## 🧠 Memory Structure

- **Graph**: Modeled via adjacency list/graph structure in Java (e.g., `Guava Graph`, `JGraphT`, or custom engine).
- **Nodes**: Represent tile + time + player context.
- **Edges**: Represent time transitions or actions.
- **Tagged Timelines**: Nodes tagged by probability, collapse state, visibility.

### Data Structures (Java, conceptual):

```java
class PsiNode {
  TileCoord tile;
  TimeCoord time;
  Player owner;
  List<ScriptCommand> interactions;
  boolean isObserved;
  boolean isReachable;
  boolean isGhostVisible;
  Set<String> activeEffects;
}
```

---

## 🧮 Causal Collapse Logic

- Triggered by:
  - Player interaction (move, pickup, fight).
  - Forced effect (object like Wigner’s Eye).
  - Anchor zone (Tower of Anchoring).
- Collapse updates:
  - Player’s local timeline.
  - Visibility map (fog or overlay).
  - Ghost state (if seen by others).

---

## ⚙️ Fog and Zone Mechanics

### Zones:
- **FogOfWar**: Classic dark.
- **GhostZone**: Translucent if known via object.
- **Reachable**: Light aura.
- **Superposed**: Glitchy effect.

### Zone Calculation:
- From current player timeline only.
- Uses BFS from node position with movement, vision, and timeline graph.
- Future potential zones are computed but filtered by plausibility:
  - Combat result estimated.
  - Interaction with known causal objects (e.g., Tower) blocks projection.

---

## 📦 Object Effects and Exclusions

- **Default**: Objects are considered in zone computation.
- **Exception**: Legendary or scripted items may opt-out of graph updates.
  - Defined via flag: `affectsTimeline = false`
  - e.g., *Lame d’Avant-Monde* or *Rollback Totem*.

---

## 🔄 Algorithm Summary

```text
1. Player makes action request.
2. Engine updates causal graph with action node.
3. System computes reachability and collapses as needed.
4. Fog, superposition and ghost overlays update.
5. Broadcast minimal change to other players asynchronously.
```

---

> This engine design enables a rich asynchronous experience, preserving performance while supporting complex causal dynamics and player agency.
