

## `UTMD_SPACETIME_MODEL.md`  
### 💡 Unified Temporal Movement Design (UTMD) — Modèle Espace/Temps lié

---

### 🧠 Concept central

> Dans *Heroes of Time*, il n'y a **pas de tour universel partagé**. Chaque héros progresse **dans le temps** en fonction de son **déplacement spatial**.  
> 👉 **Temps ≈ Distance parcourue / Vitesse héroïque**.

---

### ⏱ Unités temporelles : les *Jours héroïques*

- Un **"Jour"** (ancien équivalent de "tour") représente la **quantité de mouvement maximale** d’un héros standard (ex. : 4 tuiles pour un héros lent).
- Un héros avec plus de points de mouvement (ex. : 8) **parcourt plus d’espace dans un même Jour**, et donc **avance plus vite dans le temps**.

---

### 🌀 Conséquences gameplay

| Action | Conséquence temporelle |
|-------|------------------------|
| Un héros bouge de 1 tuile | Il avance dans le temps de 1/PM (partie d’un jour) |
| Il reste immobile | Il reste figé dans le temps (peut se faire rattraper par d’autres timelines) |
| Il traverse une zone à fort coût | Il avance lentement dans le temps (retard relatif) |
| Il utilise un artefact de déplacement temporel | Il saute dans le temps sans bouger spatialement |

---

### ❌ Pourquoi le **slider temporel** n’est plus pertinent

L’idée d’un **slider qui avance le temps** manuellement n’est **pas compatible** avec ce système, car :

- Le temps **dépend des actions du joueur**, pas d’un curseur arbitraire.
- Cela casserait la cohérence "Einsteinienne" du gameplay.
- Ce serait trop abstrait pour les joueurs (et abusé avec des artefacts ou des rollback).

👉 En revanche, un **indicateur visuel** du "Jour" courant (nombre de jours écoulés pour un joueur) peut **être utile en UI**, mais **pas cliquable ni modifiable**.

---

### 👁‍🗨 Visualisation UI (résumé)

- **Map principale** : inchangée, mais chaque tuile traversée **fait progresser la timeline personnelle du héros**.
- **Indicateur de Jour** par joueur (dans l’UI) : montre à quel moment il est dans sa timeline.
- **Couleurs/ombres** sur la map :
  - Zones inaccessibles dans ta timeline : **grisé + flou**
  - Zones accessibles mais contestées (superposées) : **transparentes colorées**
  - Zones effondrées (fixées par d’autres timelines) : **nettes et opaques**

---

### ⚙️ Implémentation back-end (Java)

- Chaque `HeroState` possède :
  - `currentDay: int` → jour personnel atteint.
  - `movementPointsPerDay: int`
  - `tilesTraversedThisDay: int`
- Le `WorldGraph` gère les timelines avec des nœuds contenant :
  - `tileId`
  - `heroId`
  - `dayReached`
- Toute action est horodatée avec le `currentDay` du joueur qui l’émet → cohérence dans le graphe temporel global.