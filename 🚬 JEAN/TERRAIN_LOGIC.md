# 📜 TERRAIN_LOGIC.md

# Heroes of Time and Magic – Spécification du moteur de terrain hexagonal

⸻

## 1️⃣ Vision

| Cible | Détails |
|-------|---------|
| Style visuel | Pixel-art fantasy proche HoMM III |
| Grille | Hexagonale isométrique, fournie par le back-end |
| Déterminisme | Même seed + même données → même rendu |
| Lisibilité macro | Le joueur voit des formes naturelles (golfe, chaîne de montagnes, clairière…) plutôt qu'un damier |
| Évolutivité | Préparer le terrain à changer dans le temps (croissance d'une forêt, inondation, corruption magique…) |

⸻

## 2️⃣ Schéma de données (back-end → front)

```typescript
interface Tile {
  q: number;                       // coord axiale
  r: number;
  biome: 'forest' | 'desert' | 'water' | 'mountain' | …;
  elevation: number;               // 0-100
  humidity: number;                // 0-100
  riverFlowDir?: 'N' | 'NE' | 'SE' | 'S' | 'SW' | 'NW';
  naturalBarrier?: boolean;        // falaise infranchissable, etc.
}
```

**Important** : le back-end peut enrichir plus tard (végétation, corruption, etc.), le moteur reste extensible.

⸻

## 3️⃣ Pipeline de traitement (front / pré-process)

1. **Flood-fill par biome**
   Attribution d'un groupId déterministe (ordre de voisins figé : [NE,E,SE,SW,W,NW]).

2. **Distance au bord (distanceToEdge)**
   BFS depuis les tuiles en contact d'un autre biome.
   Utilisation : cœur sombre d'une mer, forêt profonde, etc.

3. **Gradient directionnel (optionnel mais utile)**
   Pour chaque tuile, vecteur (dx, dy) = plus bas voisin → orientation des dunes, pentes, rivières.

4. **Sélection du sprite**
   ```typescript
   SpriteId getSpriteForTile(tile, neighbors)
   // critères : biome, distanceToEdge, transitions, hash(q,r) % variants
   ```

5. **Transitions entre biomes**
   • Sprite « lisière » (forest_edge.png)
   • Overlay (water_to_grass.png) si besoin d'un dégradé doux.

6. **Rivières**
   • Overlay directionnel (river_NE.png) si riverFlowDir défini.
   • Relier visuellement deux tuiles si leurs directions sont opposées et alignées.

7. **Relief & ombres**
   • Shader ou filtre selon elevation (ombrage, voile atmosphérique).
   • Peut servir plus tard pour le gameplay (mouvement, vision).

⸻

## 4️⃣ Formation macro-naturelle ("formes intelligentes")

| Phénomène | Algorithme simple & déterministe |
|-----------|-----------------------------------|
| Golfe / Rivage dentelé | • seuil elevation < seaLevel → eau<br>• 3–4 passes de recul côtier : chaque tile water fait −Δelevation sur ses voisins<br>• le trait de côte devient sinueux & naturel |
| Chaînes de dunes | • calculer (dx,dy) (pente moyenne)<br>• si biome = desert & pente douce → choisir sprite desert_dune_<dir>.png aligné sur le gradient |
| Clairière | • choisir seed fixe dans un groupe forest avec distanceToEdge > 4<br>• rayon 2 → changer biome → grass, appliquer forest_to_grass.png tout autour |
| Réseau fluvial | • pluie virtuelle sur chaque tile<br>• l'eau s'écoule vers le voisin le plus bas, accumule un débit<br>• seuil de débit → tuiles riverFlowDir affectées<br>• 100 % déterministe car guidé par la seed d'elevation |

Ces règles « simulent la cause », pas l'effet ; résultat : formes crédibles sans dessin manuel.

⸻

## 5️⃣ Structure des assets

```
assets/
  terrain/
    forest/   {core|inner|edge}.png
    desert/   {core|edge|dune_NE|dune_SE|…}.png
    water/    {deep|mid|shore}.png
    mountain/ {peak|slope|foot}.png
  transitions/
    forest_to_grass.png
    water_to_desert.png
  overlays/
    river_N.png
    river_NE.png
    ...
```

⸻

## 6️⃣ 🎨 Tileset conseillé : David Gervais Hex Tileset

• **URL de téléchargement** : https://opengameart.org/content/hexagon-tileset
• **Licence** : CC-BY 3.0
• **Style** : pixel-art fantasy, très proche HoMM II/III
• **Contenu** : forêts, montagnes, plaines, désert, eau, neige, routes, villes…
• **Avantages** : hexagones déjà détourés (PNG transparent), cohérence visuelle, nombreuses variantes.

**Compléments possibles** :
• RedShrike "Terrain Hexes" (transition plus cartoon)
• Stendhal Hex Tileset (pour variantes épurées)
• Génération IA ciblée (biomes spéciaux : corruption, marécage, cristal…) si un sprite manque.

⸻

## 7️⃣ Librairies recommandées

| Rôle | Lib | Notes rapides |
|------|-----|---------------|
| Grille hexagonale | honeycomb-grid | Coordonnées, voisins, path axial/cube |
| Rendu 2D GPU | pixi.js | Sprites + filtres rapides |
| Filtres / shaders | pixi-filters | Flou, grain peinture, color grading |
| (plus tard) pathfinding | pathfinding.js | A* hex, BFS |

⸻

## 8️⃣ Évolution temporelle (à planifier, non implémentée maintenant)

| Variable d'état | Règles d'évolution par tick | Effet visible |
|------------------|----------------------------|---------------|
| vegetationLevel | +1 si humidité > 60 & voisin forêt, −1 si désert | Forêt qui avance/recul |
| floodLevel | +1 après grosse pluie & elevation < 20, −1 si ensoleillé | Rivières qui débordent puis se retirent |
| corruption | +1/tick près d'une source magique | Terrain "blighted" + sprites sombres |

Simulation discrète : 1 tick = 1 "semaine in-game" entre deux tours.

⸻

## 9️⃣ Roadmap d'implémentation

1. Importer le tileset David Gervais → ranger selon la structure `/assets/…`.
2. Coder le flood-fill groupId + calcul distanceToEdge.
3. Fonction getSpriteForTile (biome + distance + transition).
4. Overlay rivières avec riverFlowDir.
5. Brancher Pixi.js et afficher la carte statique.
6. (Option) Macro-formes : dunes, golfes, clairières.
7. (Plus tard) Évolution temporelle + log d'événements.

⸻

## 1️⃣0️⃣ Déterminisme garanti

• Ordre fixe de parcours (tiles puis voisins)
• Hash (q,r) stable pour toute variance visuelle
• Seed de bruit/élévation stockée et transmise par le back-end

⸻

## 🚀 Livrables immédiats

• Ce fichier TERRAIN_LOGIC.md (présent)
• Dossier `/assets/` peuplé avec le tileset David Gervais renommé
• Module TypeScript terrainEngine.ts contenant :
  • computeGroups()
  • computeDistanceToEdge()
  • getSpriteForTile()
  • helpers river & transition

**Bonne intégration ! 🎮**