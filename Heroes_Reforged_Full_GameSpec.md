# 🎮 Heroes Reforged – Game Design Document (FULL SPEC)

## 1. Core Concept

Heroes Reforged is a multiplayer strategy game inspired by Heroes of Might and Magic III, built for modern asynchronous play. It retains classic elements such as hero exploration, unit recruitment, castle building, and tactical turn-based combat, while introducing an innovative system for asynchronous gameplay via dynamic zones of conflict.

- Up to 10 players on a shared map
- Fully asynchronous gameplay whenever possible
- Timeline-driven engine with predictive conflict resolution
- Designed for web (PWA), desktop, and tablet

---

## 2. Key Gameplay Mechanics

### 2.1 Player Actions
- Movement (based on speed + terrain)
- Unit recruitment (per castle or dwelling)
- Structure building
- Combat (PvP or PvE)
- Spell casting (with range and impact)
- Turn validation (explicit end turn)

### 2.2 Resources & Economy
- Gold (daily generation via mines and structures)
- Unit growth (weekly, per town)
- Classic map resources (optional in MVP)

---

## 3. Asynchronous Architecture

### 3.1 Timeline Engine
All actions are added to a timeline as `PENDING`. Each action includes:
- Player ID
- Action type and payload
- Origin timestamp
- Zone context
- Validation status (`PENDING`, `CONFIRMED`, `DISCARDED`)

### 3.2 Validation Rules
Actions are processed by a simulation engine that checks:
- Zone of Causality (ZFC) overlap
- Vision state of other players
- Resource consistency
- Prior action conflicts

Actions can be auto-validated if no conflicts are found.

---

## 4. Zone of Causality (ZFC)

ZFCs are dynamically computed spatio-temporal zones representing possible influence areas of a player within a turn.

### 4.1 ZFC Generation
Each turn, the game engine:
- Computes reachable tiles via move points
- Adds teleport range if known spells are available
- Adds artifact or structure-based bonuses
- Computes extended zones for castles with portals

### 4.2 Conflict Zones
Two ZFCs overlapping creates a `LOCKED` zone:
- Players entering locked zones must sync their turns
- Actions in locked zones stay pending until global validation
- Partial zones can remain async if they fall outside conflict area

---

## 5. Shadow System (Fog of War)

### 5.1 Vision
Each player sees:
- Tiles within hero/unit/building vision
- Mines and structures they control

### 5.2 Shadow Actions
Other players’ `PENDING` actions are shown as “shadows” if visible:
- Movement shadows appear as translucent heroes
- Building captures appear uncertain
- Shadow disappears if action is later discarded

This introduces **bluff, paranoia, and psychological pressure**, especially in multiplayer.

---

## 6. Game Flow

### 6.1 During a Turn
- Players act in parallel
- Timeline grows with player actions
- Zones are evaluated per action
- Local confirmations occur if no conflict

### 6.2 End of Turn
- Players explicitly validate
- Engine computes and commits timeline
- Validated actions become visible to all
- New turn begins, ZFCs reset

---

## 7. Late Game Considerations

As mobility increases (teleports, artifacts):
- ZFCs expand massively
- Most zones become conflict-prone
- The game transitions to fully **synchronous turns** by necessity
- However, **recruitment**, **management**, and **combat resolution** may still occur asynchronously

---

## 8. Architecture Overview

### 8.1 Frontend (React PWA)
- Responsive design for desktop, mobile, tablet
- Local state with async API sync
- Shadow display and fog of war integration

### 8.2 Backend
- Lightweight Node.js API for matchmaking and session persistence
- Core engine in Java (modular, testable)
- JSON-based action input/output

### 8.3 Game Engine (Java or Kotlin)
- Timeline engine
- ZFC resolver
- Action validator
- Combat simulator

---

## 9. Example Timeline Entry

```json
{
  "turn": 4,
  "player": "grut",
  "action": {
    "type": "move",
    "heroId": "hero-008",
    "to": [13, 5]
  },
  "status": "PENDING",
  "zfc": {
    "radius": 6,
    "includesTeleport": true,
    "validUntil": 4
  }
}
```

---

## 10. Psychological Layer

Inspired by games like *Among Us*:
- Shadow presence creates paranoia
- Players may delay validation to bait or bluff
- Observing "why is this turn still pending?" becomes part of strategy

---

## 11. MVP Scope

- 1 fixed map
- Hero movement
- Unit recruitment
- Economic loop (gold + unit growth)
- Timeline and async validator
- Shadow/vision logic
- Local AI/bots (optional)
- 2–4 player online session support