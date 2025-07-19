# WORLD_STATE_GRAPH.md

> *"Le monde n’est pas un flux. C’est un graphe vivant, recomposé à chaque décision."*

---

## 🧠 Structure

- **Nœuds** : états du monde (`PsiState`)
- **Arcs** : transitions causales (`ACTION`, `⊙`, `†`, etc.)
- **Branches** : timelines alternatives

---

## 🧭 Utilisation moteur

- À chaque action, le moteur ajoute un nœud
- Chaque nœud possède :
  - un timestamp (`Δt`)
  - des conditions (`Π[...]`)
  - un état de cohérence (stable / instable)

---

## 🧰 Fonctions critiques

- `addNode(state)`
- `collapse(branch)`
- `rollback(n)`
- `prune(branch)`

---

## 🌌 Visualisation

- Arbre principal = timeline active
- Branches grises = alternatives superposées
- Nœuds rouges = effondrés
- Nœuds bleus = psystates observés

---

## 📉 Optimisation

- Garbage collect automatique des timelines mortes
- Compression des nœuds anciens stables
- Fusion conditionnelle (`if collapse == identical`)