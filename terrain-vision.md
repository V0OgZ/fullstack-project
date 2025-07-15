# Terrain & Vision System Design

### 🎯 Objectif global

Créer un **système de rendu visuel cohérent et immersif** sur une grille hexagonale isométrique, qui combine :

1. Le **rendu émergent des terrains** (mer, forêt, etc.) avec effets visuels fluides
2. La **visualisation du déplacement potentiel du héros**, selon ses points de mouvement et la logique du moteur
3. La **gestion de la visibilité et du brouillard de guerre**, avec une zone **intermédiaire de prévisualisation** basée sur les mécaniques de ZFC (*zone de conflit causal*)

---

### 🧱 Contexte technique

* Terrain hexagonal généré dynamiquement
* Sprites 2D affichés en isométrique
* Moteur probable : **Canvas** ou **Trijs (Three.js + wrapper custom)**
* Chaque tuile possède un type (`"water"`, `"forest"`, etc.)
* Le joueur contrôle un héros avec des points de déplacement (PM)
* Certaines zones sont dans le **brouillard de guerre** total, d’autres partiellement visibles

---

### ✅ Objectifs détaillés

#### 1. Rendu terrain par zone

* Identifier les **zones cohérentes** (groupes de tuiles contiguës de même type)
* Pour chaque tuile :
  * Déterminer sa **topologie locale** (bitmask hexagonal)
  * Appliquer un **sprite** adapté (bord de mer, centre forêt…)
  * Moduler la couleur ou l’opacité selon la **profondeur dans la zone**
  * Ajouter de **légers effets animés** (vagues, vent, etc.) sans perte de performance

#### 2. Visualisation des déplacements

* Quand un héros est sélectionné, afficher :
  * Les tuiles atteignables **dans le tour en cours**
  * Les tuiles atteignables **au-delà du tour**, mais sans conflit
* Différencier visuellement :
  * **Zone de mouvement immédiat** → surbrillance claire, ombre portée ou lueur
  * **Zone de projection ZFC** (*Zone de Conflit Causal*) → effet plus flou/estompé, couleur différente
    * Ces tuiles sont atteignables **au-delà du tour courant**
    * On peut y planifier un déplacement **tant qu’aucun conflit n’apparaît avec un autre joueur**

> ⚠️ À ce stade, le ZFC peut être simulé simplement (p. ex. : distance > PM mais < PM × 2). L’implémentation fine viendra plus tard.

#### 3. Brouillard de guerre (vision)

* Trois états visuels pour chaque tuile :
  * 🟢 **Visible** : dans la portée de vision du joueur (pas d’effet spécial)
  * 🟡 **Vue précédemment (zone ZFC)** : tuiles où le joueur **n’a plus de vision**, mais avait exploré (grisées)
  * ⚫️ **Inconnue** : jamais vue par ce joueur → très sombre / opaque

Effets visuels à prévoir :

* **Dégradé radial** autour des unités/joueurs
* **Masques de vision** ou filtres (shader ou blend-mode `multiply`/`darken`)
* Compatible Canvas **et** WebGL (idéalement modulaire)

---

### 📌 Roadmap de développement

- [ ] Intégrer un système de **bitmask topologique** pour déterminer les sprites
- [ ] Définir les types de sprites nécessaires (bord de mer, coins, centre…)
- [ ] Ajouter un **système de surbrillance dynamique** autour du héros selon son PM
- [ ] Implémenter une **zone intermédiaire de déplacement (ZFC)** pour la projection au-delà du tour
- [ ] Gérer les **trois couches de brouillard** (visible / vu mais plus visible / jamais vu)
- [ ] Ajouter des **effets visuels légers** selon le type de zone (eau = vagues, forêt = feuillage animé, etc.)
- [ ] S’assurer que tout est **data-driven** et non codé en dur

---

### 💡 Suggestions techniques

* Vision : masques en Canvas (`globalCompositeOperation`) ou shaders custom en WebGL
* ZFC : map par joueur des zones « visibles », « explorées », « inaccessibles »
* Animations légères : sinusoïdes, gradients dynamiques ou texture scrollée

---

> **VAZY POTO** – adaptons-nous à quelque chose de faisable dans notre contexte 😉 