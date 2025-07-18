
# AMD_TEMPORAL_TRAVEL_VISUAL_SPEC.md

## 📄 Concept : Remplacer le tour par une métrique spatio-temporelle fluide ("jours parcourus")

### 🎯 Objectif
Donner aux joueurs une **perception spatiale et temporelle** de leur mouvement dans la timeline, avec des repères visuels de "jours", sans imposer une logique de fin de tour synchrone.

---

## 🧠 Principes clés

### 1. 🔁 Unité de déplacement normalisée : *le "jour"*

- Chaque héros a une capacité de mouvement : `X tiles / jour`
  - Exemple : un héros rapide = 6 tuiles/jour, un lent = 3 tuiles/jour.
- Le joueur peut choisir d'enchaîner plusieurs "jours" (donc mouvements + actions) si rien ne l'en empêche.
- Les **jours** deviennent des **jalons temporels**, visibles sur la map.

### 2. 🕶️ Visualisation temporelle intégrée
Au lieu d'un tour partagé, le jeu affiche :
- Des **zones colorées ou dégradées** indiquant les `+1 jour`, `+2 jours`, `+3 jours`, etc., à partir de la position actuelle du héros.
- Une **teinte de lumière dynamique** : ex. plus on avance dans le temps, plus c’est sombre ou bleuté.
- Peut se coupler à la transparence déjà utilisée pour visualiser des réalités alternatives.

### 3. 🧭 Nouveaux marqueurs visuels sur la map

| Élément                          | Représentation visuelle proposée                |
|----------------------------------|--------------------------------------------------|
| Zones atteignables jour 0       | Aucune teinte (actuel)                          |
| Zones atteignables jour +1      | Halo jaune clair / dégradé radial               |
| Zones atteignables jour +2      | Halo orange clair                               |
| Zones atteignables jour +3      | Halo rouge pâle ou bleuté (si paradoxal)        |
| Zones bloquées / hors causalité | Teinte grise ou bleue + effet de distorsion     |
| Sauts temporels (artefacts)     | Anneau spectral animé ou éclairs cristallins    |

---

## 🔄 Interactions gameplay

- Un joueur peut choisir d’aller *plus loin dans le temps* (ex : enchaîner 3 jours de déplacement), ce qui le **projette plus loin dans la timeline locale** → les autres joueurs devront “rattraper” cet écart.
- Un effet visuel peut accompagner l’**avancée temporelle** (effet de shift, distorsion, traînée temporelle…)
- Les joueurs **plus lents** seront donc “coincés dans le passé” en termes de causalité.

---

## 💡 Proposition UX/UI concrète

### Sur la map principale (port 8000) :
- **Clic sur le héros** → affiche la **zone de déplacement actuelle** (jour 0), avec overlays des **jours suivants** (jour +1, +2, etc.).
- **Barre d'info flottante** indiquant :
  - Position temporelle actuelle : “Jour 18 (local)”
  - Avancée possible : “3 jours max”
- **Curseur ou slider** pour simuler la trajectoire à travers plusieurs jours (preview avant validation).
- **Couleurs des halos** empilables sur les hexagones atteignables, avec transparence adaptative.

---

## 🧱 Back-end : conséquences et besoins

- Le moteur Java doit gérer :
  - Le calcul des tuiles atteignables par jour (`BFS` ou `Dijkstra` pondéré sur le coût en jours).
  - Le marquage des nœuds avec un tag `day=X` dans la timeline du joueur.
  - Le découpage des mouvements dans le script `TemporalScript` avec horodatage implicite.
- L’UI (Pixi.js ou autre) devra **interpréter ces distances temporelles** et les visualiser sous forme de couches colorées.

---

## 🚫 Remarques importantes

- Ce système **ne nécessite plus de bouton “Fin de tour”** : on avance tant qu’on a de l’énergie, ou qu’un événement intervient.
- Les objets comme *l’Éclat du Futur*, *l’Ancrage*, *le Voile*, etc., peuvent influer sur :
  - La visibilité des jours futurs
  - Les zones atteignables malgré les blocages de causalité
  - La **précipitation** ou **ralentissement** du temps local
