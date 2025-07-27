# FOG_AND_ZONE_GAMEPLAY.md

## Summary

This document outlines the different *zones* and *fog states* encountered in *Heroes of Time*, and how they relate to gameplay, exploration, and visibility mechanics in asynchronous, time-divergent play.

---

## ☁️ Fog / Vision States

Each tile for a player can be in one of the following states:

| State | Name | Description | Interaction |
|-------|------|-------------|-------------|
| 0 | Unexplored | Full fog. Never seen. | None |
| 1 | Collapsed (Past) | Explored in a resolved timeline. Dimmed. | View only |
| 2 | Reachable | Within movement range, but not yet observed. | Planning only |
| 3 | Vision | Within direct vision of unit or castle. | Fully interactive |
| 4 | Ghost | Seen with spectral object (Veil, etc.). | No interaction |
| 5 | Superposed | Entity is in quantum flux. Not yet collapsed. | Partially visible |
| 6 | Anchored | Within a zone that blocks timeline branching. | Forces collapse |

---

## 🔁 Movement and Zone Rules

- **Vision Zone**:
  - Radius around heroes, castles.
  - Used to reveal and collapse surroundings.
- **Movement Zone**:
  - Extended planning radius.
  - May include unreachable or superposed tiles.
- **Causality Zone**:
  - All possible forward evolutions from current state.
  - Computed in background, partially visible to players.

---

## 🧙‍♂️ Player Actions

- **Move** → Triggers collapse along path.
- **Observe** (via vision item) → Reveals ghost objects.
- **Use Item** (e.g., Eye of Wigner) → Forces collapse.
- **Wait** → May delay collapse but increase complexity.

---

## 🏰 Special Zones

- **Anchored Zone**: (e.g., Tower of Anchoring)
  - Prevents projection through it.
  - Must be considered in all reachability algorithms.
- **Ghost Zone**: (via objects like Veil)
  - Can be visited but not interacted with.
  - Presented in grayscale.
- **Rollback Zone**:
  - Represents historical rewind.
  - Changes fog dynamically.

---

## 🧩 Implementation Hints

- `zone_state: Enum` per tile, per player.
- States can overlap: `reachable + ghost`, etc.
- Render layering: fog > ghost > halo > shimmer.
- Planning UI should clearly distinguish actionable vs. passive states.

---

> Mastery of the fog and zone system is essential to gain strategic advantage and manipulate causality in a dynamic, multiplayer temporal battlefield.
