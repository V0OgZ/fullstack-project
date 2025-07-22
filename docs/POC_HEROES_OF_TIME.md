# 🎯 POC Heroes of Time - Brief Technique

## Objectif du POC

Créer un prototype **100 % fonctionnel** de *Heroes of Time*, avec :

* Une carte en tuiles hexagonales minimalistes
* Des héros qui peuvent se déplacer, interagir, et manipuler le temps
* Un système de **simulation de futurs possibles**
* Un langage de script **interprété côté back-end**
* Des objets temporels **déclencheurs d'effets spatio-temporels**
* Une **gestion du conflit de causalité et du collapse** quantique
* Un affichage visuel **des timelines** ou des zones "floues"

## 🔤 1. Langage de Script d'Action

### Syntaxe de base

```plaintext
HERO(Arthur)
MOV(Arthur, @125,64)
CREATE(CREATURE, Dragon, @126,65)
USE(ITEM, AvantWorldBlade, HERO:Arthur)
```

### Actions temporelles

```plaintext
⊙(Δt+2 ⟶ MOV(HERO, Arthur, @128,68))  => ψ001
Π(Brutus entre dans @128,68 à Δt+2) ⇒ †ψ001
```

## 🧠 2. Grammaire Spatio-Temporelle

### Intégration avec le script

* Le back-end doit pouvoir parser et interpréter les lignes avec `⊙`, `ψ`, `†`, `Π`, etc.
* Il faut une structure de données claire pour stocker les états potentiels.

## 🗺️ 3. Structure de Données — Carte et Tuiles

### Exemple de carte (backend)

```json
{
  "tiles": [
    {
      "x": 125,
      "y": 64,
      "terrain": "grass",
      "occupants": ["Arthur"],
      "ψ_states": [
        {
          "id": "ψ001",
          "expression": "⊙(Δt+2 ⟶ MOV(HERO, Arthur, @128,68))",
          "branch": "ℬ1",
          "status": "active"
        }
      ]
    }
  ]
}
```

### Héros

```json
{
  "id": "Arthur",
  "position": { "x": 125, "y": 64 },
  "inventory": ["AvantWorldBlade"],
  "timeline": "ℬ1"
}
```

## 🧩 4. État Quantique : Simulation & Collapse

### Principe

* Chaque action temporelle est encodée sous forme de `ψ` (état en superposition).
* Un joueur peut planifier 2–3 tours dans le futur **tant que personne d'autre n'affecte cette zone**.
* Si un autre joueur entre dans cette zone à un tour en conflit : **collapse** (choix du moteur selon règles).

### Exemple

```plaintext
⊙(Δt+2 ⟶ MOV(HERO, Arthur, @128,68))  => ψ001
Π(Brutus entre dans @128,68 à Δt+2) ⇒ †ψ001
```

## ⏳ 5. Système de Temps & Branches

* Chaque action temporelle se produit dans un **espace-temps à 5 dimensions :** `(x, y, t, τ, ℬ)`
* Le système peut autoriser plusieurs branches **ℬ1, ℬ2…**
* Seule une branche sera collapsée en réalité (la "vraie" timeline)

## 🔄 6. Exécution du Tour (back-end)

À chaque tick / tour :

1. On avance d'un pas (`Δt+1`)
2. On traite les `ψ` actifs
3. On déclenche les `Π` s'il y a interaction (ex : entrée dans zone)
4. On applique les `†ψ` si besoin
5. On purge les états invalidés

## 🧪 7. Ce qu'il faut coder dans ce POC

### 1. Carte

* Carte de tuiles hexa simple (200x200 ou plus petit pour test)
* Peut être monochrome / brut

### 2. Moteur de simulation

* Gestion des héros
* Interprétation des scripts
* Déclenchement de mouvements futurs (ψ)
* Affichage d'un symbole pour une case "floue" (superposition active)
* Gestion d'un collapse simple quand conflit

### 3. Langage & Parsing

* Parser texte à la main (simple)
* Ou JSON si plus rapide pour le POC

### 4. UI minimale

* Affichage d'un héros
* Sélection d'action / position
* Aperçu des timelines actives (couleur différente ? halo ?)

## 💥 8. Priorités et bonus

### 🎯 Prioritaire

* Support du script MOV / CREATE
* Superpositions (`⊙`) et collapses (`†`)
* Timeline unique + visualisation floue
* Test de 1 artefact (ex : Lame d'Avant-Monde)

### ➕ Bonus

* Plusieurs branches (`ℬ1`, `ℬ2`)
* Objets de rollback
* Affichage dynamique des timelines

## 📝 Exemple complet de POC scripté

```plaintext
HERO(Arthur)
CREATE(ITEM, AvantWorldBlade, HERO:Arthur)
⊙(Δt+3 ⟶ BATTLE(HERO Arthur, HERO Ragnar))
Π(Ragnar entre dans zone) ⇒ †
```

## 🧠 Conseil final

> Ne cherche pas à faire beau. L'important, c'est **le moteur**. Les graphismes moches sont OK.
> Il faut juste que le système de timeline + collapse + script soit **visuellement testable**, même en console si besoin.
> On intégrera la carte, les assets, la beauté plus tard.