# 📜 *Heroes of Time* — Grammaire Spatio-Temporelle et Scripting Artefactuel

**Version : Alpha V0.1 – Codex quantique intégrable au moteur**

## 🧩 1. Grammaire spatio-temporelle quantique

### 🔣 Symboles de base

| Symbole  | Signification                                 |
| -------- | --------------------------------------------- |
| `⊙(…)`   | Action en superposition temporelle            |
| `†ψ`     | État effondré (collapse)                      |
| `ψ(id)`  | Instance d'un état superposé                  |
| `Π(obs)` | Observation externe (déclencheur de collapse) |
| `Δt+n`   | Délai temporel (ex: dans n tours)             |
| `@x,y`   | Coordonnées spatiales                         |
| `ℬn`     | Branche temporelle (multivers n)              |
| `⟶`      | Projection d'effet ou d'action                |
| `⨉`      | Conflit de timeline                           |
| `↺`      | Rollback potentiel                            |
| `τ`      | Marqueur temporel relatif                     |
| `{}`     | Bloc causal ou set d'états                    |

## ⚙️ 2. Intégration au système de script (`MOV`, `HERO`, `CREATE`…)

### 🎮 Script simple (existant)

```plaintext
HERO(Arthur)
MOV(Arthur, @125,64)
CREATE(CREATURE, Dragon, @126,65)
```

### 🧠 Script spatio-temporel étendu

```plaintext
ψ001: ⊙(Δt+2 @126,65 ⟶ CREATE(CREATURE, Dragon))
ψ002: ⊙(Δt+2 @125,64 ⟶ MOV(HERO, Arthur, @128,68))
ψ003: ⊙(Δt+3 @129,70 ⟶ USE(ITEM, AvantWorldBlade))
```

Un effondrement :

```plaintext
Π(Player2 enters @126,65 at Δt+2) ⇒ †ψ001
```

Ou avec rollback forcé :

```plaintext
†ψ002 ↺ @Δt+1
```

## 🏗️ 3. Back-end – Exécution et logique

### 📦 Structures de données

```json
{
  "tile": {
    "x": 125,
    "y": 64,
    "ψ_states": [
      {
        "id": "ψ001",
        "expression": "⊙(Δt+2 ⟶ MOV(HERO, Arthur, @128,68))",
        "branch": "ℬ1",
        "probability": 1.0,
        "status": "active"
      }
    ]
  }
}
```

### 🔁 Traitement dans le moteur

1. Chaque tour, on lit les `ψ` actifs et on les simule.
2. Si un autre joueur entre dans une zone avec un `ψ`, on applique `Π()`.
3. En cas de `†ψ`, on applique l'état sélectionné, on nettoie les autres.
4. Les artefacts peuvent injecter, retarder, altérer ou prioriser des `ψ`.

## 🧙 4. Objets temporels réécrits en grammaire + script

### 🔥 Lame d'Avant-Monde

* **Effet** : Simule une bataille en avance. Si l'état est validé par un conflit, il devient effectif (dommages, morts…).
* **Grammaire** :

```plaintext
ψ_battle: ⊙(Δt+3 @128,66 ⟶ BATTLE(HERO Arthur, HERO Ragnar))
Π(Ragnar enters zone @128,66 at Δt+3) ⇒ †ψ_battle
```

* **Script intégré** :

```plaintext
CREATE(ITEM, AvantWorldBlade, HERO:Arthur)
ψ_battle: ⊙(Δt+3 @128,66 ⟶ BATTLE(HERO Arthur, HERO Ragnar))
```

### 🕰️ Horloge Inversée

* **Effet** : Retourne une action en arrière dans le passé, tant que cela ne crée pas de `⨉`.
* **Grammaire** :

```plaintext
ψ_rewind: ⊙(Δt-2 @127,68 ⟶ ROLLBACK(HERO, Arthur))
†ψ_rewind if ¬⨉
```

* **Script** :

```plaintext
USE(ITEM, ReverseClock, HERO:Arthur)
ψ_rewind: ⊙(Δt-2 @127,68 ⟶ ROLLBACK(HERO, Arthur))
```

### 🧢 Balise d'Ignorance

* **Effet** : Marque une action comme "non-perturbatrice", elle n'entraîne aucun collapse sauf combat ou capture.
* **Grammaire** :

```plaintext
ψ_ghost: ⊙(Δt+1 @130,65 ⟶ MOV(HERO, Peon, @132,66)) tagged `silent`
```

* **Script** :

```plaintext
TAG(HERO, Peon, "silent")
MOV(Peon, @132,66)
```

### 🗼 Tour de l'Ancrage

* **Effet** : Gèle tous les ψ d'une zone jusqu'à destruction de la tour.
* **Grammaire** :

```plaintext
LOCK_ZONE(@128,64, radius=3)
∀ψ ∈ zone → hold
```

* **Script** :

```plaintext
CREATE(STRUCTURE, AnchorTower, @128,64)
```

### 📯 Trompette de l'Apocalypse (catégorie : Singularité)

* **Effet** : Fait collapsar brutalement toutes les ψ d'un joueur dans un rayon, provoquant un chaos irréversible.
* **Grammaire** :

```plaintext
Π(TrumpetBlow @x,y) ⇒ ∀ψ ∈ radius → †ψ (random collapse)
```

* **Script** :

```plaintext
USE(ITEM, ApocalypseHorn, HERO:Arthur)
```

## 🧮 5. Résumé visuel des flux temporels

```plaintext
        Time →
ℬ1 ───A───ψ001─────B─────†
ℬ2 ───A────────────ψ002──†
ℬ3 ───A────ψ003────(wait)…

           ↑ Collapse trigger here (Π)
```

## 🌌 **Heroes of Time – Modèle Spatio-Causal-Quantique (V2)**

### *Quand la stratégie devient une science expérimentale.*

### 🧭 Concept-clé 1 : **La Superposition Temporelle**

> Tant qu'une action n'est **pas observée** (i.e. aucun joueur ou événement ne vient la valider), elle existe dans **plusieurs états potentiels**, tous valides.

**Exemple concret :**

Un joueur A simule deux chemins possibles avec son héros à t+2 :

* Aller vers un château
* Aller vers un artefact

Tant que **personne d'autre n'interagit** avec cette zone (aucun adversaire ne s'y rend, aucune info n'est observée), les deux réalités coexistent.

### 🧪 Concept-clé 2 : **L'Écroulement Causal (Collapse)**

> Lorsqu'une zone est **visitée, scrutée, ou altérée par une autre causalité**, la fonction d'onde "gameplay" s'effondre en un **état unique**.

**Déclencheurs possibles d'un collapse :**

* Un adversaire entre dans une zone où une action en superposition est projetée.
* Un artefact permet une **vision du futur** ou une **lecture de projection**.
* Une action du joueur est confirmée dans une autre timeline, créant un **conflit causal**.

**Résultat :**

> On choisit **l'état à plus forte probabilité** (ou, selon la nature de l'objet, un choix stratégique est proposé),
> puis on **efface** les autres timelines dépendantes.

## 🧠 Modélisation formelle : Ajout des symboles quantiques

| Symbole  | Signification                         |                                       |
| -------- | ------------------------------------- | ------------------------------------- |
| `ψ(...)` | État en superposition                 |                                       |
| `|ψ⟩`    | Vecteur d'état (timeline potentielle) |                                       |
| `⟨A|ψ⟩`  | Probabilité d'observation de A        |                                       |
| `†ψ`     | État effondré (collapsed)             |                                       |
| `Π(obs)` | Opérateur d'observation               |                                       |
| `τ(...)` | Étiquette temporelle dans la timeline |                                       |
| `ℬn`     | Branche n du multivers en cours       |                                       |

### 🎮 Exemple de scénario avec formules

```plaintext
ψ(
  ⊙(Δt+2 @123,65 [main] → capture_castle),
  ⊙(Δt+2 @126,68 [main] → pickup_artifact)
)
```

→ personne ne vient perturber → l'IA pré-calculera les deux chemins

Mais :

```plaintext
Π(player2 enters @123,65 Δt+2) ⇒ †ψ → ⊙(Δt+2 → pickup_artifact)
```

→ Observation = effondrement de l'état vers la **seconde option uniquement**.

## 🔧 Implémentation technique possible

1. Chaque héros ou artefact peut stocker une **liste de `ψ-states`**, identifiés par :
   * ID
   * Grammaire symbolique logique
   * Probabilité (poids)
   * Branch ID (ℬ)

2. Une boucle de simulation asynchrone évalue les ψ jusqu'à :
   * Une observation externe
   * Un time limit (on ne garde pas tout indéfiniment)

3. Si un effondrement a lieu :
   * Le moteur sélectionne l'état
   * Toutes les actions dépendantes reçoivent un *"wave collapse signal"* pour revalidation

## 🎭 Ajout de "Rôles Quantiques"

Les artefacts pourraient avoir des propriétés comme :

* **Dissiper ψ** (force une décision prématurée)
* **Prolonger ψ** (retarde l'effondrement)
* **Inverser l'effondrement** (rollback forcé d'une résolution causale)
* **Superposer des versions ennemies** (leur faire croire à une réalité fausse)

## 🧱 Données pour le moteur

Tu pourrais avoir ça par tuile :

```json
{
  "x": 123,
  "y": 65,
  "ψ_states": [
    {
      "id": "ψ123",
      "expression": "⊙(Δt+2 → capture_castle)",
      "branch": "ℬ1",
      "probability": 0.6,
      "owner": "hero_A"
    },
    {
      "id": "ψ124",
      "expression": "⊙(Δt+2 → pickup_artifact)",
      "branch": "ℬ2",
      "probability": 0.4,
      "owner": "hero_A"
    }
  ]
}
```

## 🔮 Conséquence design : une *stratégie quantique*

Le joueur ne planifie plus seulement **où aller**,
mais aussi **quand ses choix deviennent réalité**,
et **comment influencer ou retarder ceux des autres**.