# CAUSALITY_OBJECT_INFLUENCE.md

## Purpose

This document defines how items (artifacts, legendaries, singularities) influence the causal graph engine in *Heroes of Time*, and how they should be declared to participate (or not) in visibility and reachability calculations.

---

## ⚖️ Default Rule

By default, all objects placed on the map (or equipped) are considered part of the **causal computation**:
- They influence reachable zones.
- They determine possible collapses.
- They may block or extend movement, vision, or causal projection.

---

## 🚫 Opt-Out Mechanism

Some objects must NOT be included in projection logic, to preserve their gameplay mystery or strategic advantage.

### Attribute:
```yaml
affectsTimeline: false
```

When set, the engine will **not** include the object’s effect in timeline projection:
- Opponents will not "see" the impact before interaction.
- AI/pathfinding won’t treat it as a blocker or influencer.
- Collapse only occurs upon contact or specific observation.

---

## ✅ Opt-In Examples (default):

- **Tower of Anchoring**:
  - `affectsTimeline: true`
  - Prevents timeline projection in an area.
- **Eye of Wigner**:
  - `affectsTimeline: true`
  - Forces observation and collapse in adjacent zones.
- **Veil**:
  - `affectsTimeline: true`
  - Enables ghost vision; does not block.

---

## ❌ Opt-Out Examples:

- **Lame d’Avant-Monde**:
  - Forces collapse **only when used**, not before.
  - `affectsTimeline: false`
- **Rollback Totem**:
  - Rewinds reality but is unpredictable.
  - `affectsTimeline: false`
- **Spectral Shoes**:
  - Allow movement in ghost zones without interaction.
  - `affectsTimeline: false`

---

## 🎯 Game Engine Behavior

1. On map load or event tick:
   - Engine scans all entities with `affectsTimeline: true`.
   - They are inserted into the PsiGraph.
2. Player planning:
   - Uses filtered graph that excludes `false` nodes.
3. On action execution:
   - Any object may trigger full resolution (even if `false`).
   - Observers may then become aware.

---

## 📐 Object Definition Extension

```yaml
name: "Lame d’Avant-Monde"
type: legendary
effects:
  - collapse_opponent_timeline
visibility: ghost_only
affectsTimeline: false
```

---

> This model ensures both strategic clarity and surprise, letting designers decide when an object's presence is part of the shared causal map—or hidden until critical use.
