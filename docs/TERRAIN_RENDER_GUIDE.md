# 🎨 TERRAIN_RENDER_GUIDE.md

# Rendu naturel et fluide façon Heroes III (sans zoom, sans 3D)

⸻

## 🧠 But du rendu

Créer un terrain hexagonal sous-jacent, mais visuellement naturel,
sans que l'utilisateur voie de cases ou de grille.
Comme dans Heroes of Might and Magic III, le joueur perçoit des formes organiques, pas une structure artificielle.

⸻

## ✅ Objectifs visuels

| Cible | Concrètement |
|-------|--------------|
| Terrain fluide, organique | Pas de bord net, pas de grille visible |
| Pas de zoom ni rotation | Vue fixe 2D, projection plane |
| Formes macro perceptibles | Clairières, golfes, rivières cohérentes |
| Effet "peinture numérique" | Couleurs légèrement fusionnées, textures douces |
| Ambiance fantasy tactique | Terrain lisible mais stylisé à l'ancienne |

⸻

## 🧰 Librairies recommandées (JavaScript)

### 🖼 Rendu visuel

| Lib | Rôle | Pourquoi |
|-----|------|----------|
| pixi.js | Rendu 2D GPU performant | Idéal pour gérer les sprites à la frame |
| pixi-filters | Appliquer des effets doux (flou, grain, désaturation) | Pour casser la netteté trop digitale |

⚠️ **Pas besoin de pixi-viewport ni de zoom/caméra.**
La carte est en projection fixe 2D, comme dans HoMM3.

⸻

## 🗺 Organisation des assets

Tu bosses avec un système de sprites semi-transparents, organisés par biome + variantes.

```
/assets/
  terrain/
    forest/
      forest_core.png
      forest_edge.png
      forest_inner.png
    desert/
      desert_core.png
      desert_dune_NE.png
    water/
      water_shore.png
      water_mid.png
      water_deep.png

  transitions/
    forest_to_grass.png
    water_to_desert.png

  overlays/
    river_NE.png
    fog_overlay.png
```

• Tous les fichiers doivent être **PNG transparents**
• Les bords doivent être **progressifs** (flous ou fondus)
• Les sprites de transition sont des **patchs semi-transparents** qui viennent se superposer

⸻

## 🧪 Exemple de rendu d'une case avec pixi.js

### 📌 Placement hex axial (flat-topped hex)

```typescript
const TILE_WIDTH = 64;
const TILE_HEIGHT = 56; // adapté au tileset Gervais

function axialToPixel(q: number, r: number) {
  return {
    x: q * TILE_WIDTH * 0.75,
    y: r * TILE_HEIGHT + (q % 2) * (TILE_HEIGHT / 2)
  };
}

const { x, y } = axialToPixel(tile.q, tile.r);
const sprite = new PIXI.Sprite(loader.resources[spriteId].texture);
sprite.anchor.set(0.5);
sprite.position.set(x, y);
container.addChild(sprite);
```

✅ Tu places tes sprites un par un, sans bordure visible, et avec superposition si nécessaire (ex : overlay rivière).

⸻

## 🎨 Style et effets recommandés

| Élément | Recommandation |
|---------|----------------|
| Palette | Désaturée, fantasy nature, lumière douce |
| Transitions | Fusion douce entre biomes (blur, dégradé) |
| Détail de surface | Ajouté par overlay semi-translucide |
| Bord hex visible | ❌ **Interdit !** |
| Variation intra-biome | Utiliser (q, r) pour choisir sprite différent (mais déterministe) |

### Exemple de variation :

```typescript
const variantId = (tile.q * 928371 + tile.r * 123457) % biomeVariantCount;
const spriteId = `${tile.biome}/forest_core_${variantId}.png`;
```

⸻

## 🎯 Résultat attendu

• Les formes naturelles (forêt dense, clairière, baie, dune) ressortent immédiatement
• La grille hexagonale est invisible
• La richesse visuelle ne nuit pas à la lisibilité
• Le jeu semble peint à la main, pas carrelé

⸻

**Tu peux ajouter ce guide à la suite du TERRAIN_LOGIC.md, ou en tant que TERRAIN_RENDER_GUIDE.md.**

**Maintenant update et code tout puis compile**