# MASTER DOCUMENT: UI AND CAUSAL SYSTEMS FOR HEROES OF TIME

## Base Spec (from AMD_UI_FULL_TEMPORAL_SPEC.md)


# UI Temporal Visualisation & Causality Representation

## 🎯 Objective

Integrate a complete, coherent, and visually expressive representation of **timelines**, **causality zones**, **quantum superpositions**, and **artifact effects** across both UIs of *Heroes of Time*, without breaking existing components or logic.

---

## ⚙️ Technical Context

- The game engine is based in **Java**, using a custom Temporal Script parser that recognizes commands such as:
  - `MOV`, `CREATE`, `USE`, `⊙`, `†`, `ψ`, `Δt`
- These scripts produce structured states:
  - `PsiState` (unit state and visibility)
  - `CausalFrame` (localized causal reality for each player)
  - `TemporalStateGraph` (superposed branches and causal divergences)
- Artifacts and units influence timeline structure by:
  - Expanding, blocking, or collapsing possible branches
  - Breaking visibility or preserving uncertainty
  - Allowing rollback or traversal of otherwise blocked paths

---

## 🖥️ UI #1: Main Game Map UI — Port **8000**

➡️ This is the main user-facing game UI with the **hexagonal map**. All causal/temporal visualizations must appear here.

### 🔲 Visual Layer Mapping

| State Type                      | Visual Representation                                          |
|----------------------------------|----------------------------------------------------------------|
| Confirmed Reality                | Full opacity, crisp sprite                                     |
| Fog of Time (not yet played)     | Black or shaded, low opacity                                  |
| Superposed Timelines             | Transparent overlays with unique color tint per timeline      |
| Ghost Actions / Phantom Presence | Translucent unit ghost trails with blinking markers           |
| Quantum Zones (Veil, ghost walk) | Gray-scale tint, fog-like blur — interaction disabled         |
| Causal Anchors (e.g. Anchor Tower)| Golden aura with visual blocking field                        |

### 🧭 Interactions and UI Components

- **No end-turn button**: players progress by causal reach, not by turn count
- Hovering an object shows if it’s accessible now or conditionally (based on timeline collapse)
- Hovering an item like *The Veil* shows potential reachable areas
- Units that interact with ghost states display a special indicator

---

## 🖥️ UI #2: Scenario Replay & Timeline Viewer — Port **8001**

➡️ This is the simulation/replay interface, where players or developers can **visualize causal graphs** and **timeline branching**.

### 🧰 Graph Rendering Options

- Use a lightweight graph lib (`D3.js`, `Cytoscape`, or JavaFX/GraphStream backend)
- Each node = `CausalFrame` or temporal state with unit state + timeline ID
- Arrows represent branching caused by actions or artifact-triggered collapses
- Tooltip over node shows:
  - Heroes present
  - Timeline amplitude
  - Last action (`CREATE`, `MOV`, etc.)

### 📌 Timeline Navigation

- Simple UI to **switch between major timelines** if superpositions exist
- Color-matched indicators link the graph view and the hex map

---

## 🔄 UI Synchronization Principles

- The **TemporalStateGraph** drives both UIs.
- Every state frame update must reflect:
  - Which timelines are collapsed, superposed, or inactive
  - Which objects are visible or not due to artifact effects
- Frontend does **not** infer logic, only visualizes engine output

---

## 🪬 Artifact Display and Mechanics

Artifacts will influence the UI like this:

| Artifact Name           | Effect in UI                                       | Causal Inclusion |
|-------------------------|----------------------------------------------------|------------------|
| The Veil                | Unlocks ghost-walk areas (gray zones), disables interaction | ❌               |
| Anchor Tower            | Renders golden anchor aura; hard-stop for causality         | ✅               |
| Eye of Wigner           | Reveals ghost opponents' location (as transparent units)     | ❌               |
| Codex of the Infinite   | Allows temporary double reality; shows both paths            | ❌ (display only)|
| Sword of Before-Time    | Forces collapse; shows flash effect on timeline cut         | ❌               |

- Default: objects are considered in causal graph **unless `excludedFromCausality: true`** in their JSON.
- Cursor must revisit all defined artifacts to ensure this flag is properly set.

---

## 🧩 UI Engine Suggestions

- Reuse the existing 8000 hex UI and enrich it with causal layers
- Use 8001 for internal dev / timeline replay purposes — isolate graph logic
- Consider Pixi.js overlays, filters, and shader effects for transparency

---

## 🚧 Next Steps

- Add support for causal layering in `ScriptRunner` rendering
- Link scenario runner output to `TemporalStateGraph` JSON and render map accordingly
- Add toggle or selector for `Timeline Perspective` (used with Eye of Wigner etc.)

---



