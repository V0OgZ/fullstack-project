# 🎨 TERRAIN_RENDER_GUIDE.md

## Rendu naturel et fluide façon Heroes III (sans zoom, sans 3D)

---

## 🧠 But du rendu

Créer un terrain **hexagonal sous-jacent**, mais **visuellement naturel**,
sans que l'utilisateur voie de cases ou de grille.
Comme dans *Heroes of Might and Magic III*, le joueur perçoit des **formes organiques**, pas une structure artificielle.

---

## ✅ Objectifs visuels

| Cible                          | Concrètement                                    |
| ------------------------------ | ----------------------------------------------- |
| Terrain **fluide, organique**  | Pas de bord net, pas de grille visible          |
| **Pas de zoom ni rotation**    | Vue **fixe 2D**, projection plane               |
| Formes **macro** perceptibles  | Clairières, golfes, rivières cohérentes         |
| Effet **"peinture numérique"** | Couleurs légèrement fusionnées, textures douces |
| Ambiance **fantasy tactique**  | Terrain lisible mais stylisé à l'ancienne       |

---

## 🧰 Librairies recommandées (JavaScript)

### 🖼 Rendu visuel

| Lib                                                 | Rôle                                                  | Pourquoi                                |
| --------------------------------------------------- | ----------------------------------------------------- | --------------------------------------- |
| [`pixi.js`](https://pixijs.com/)                    | Rendu 2D GPU performant                               | Idéal pour gérer les sprites à la frame |
| [`pixi-filters`](https://github.com/pixijs/filters) | Appliquer des effets doux (flou, grain, désaturation) | Pour casser la netteté trop digitale    |

> ⚠️ **Pas besoin de `pixi-viewport` ni de zoom/caméra**.
> La carte est en **projection fixe 2D**, comme dans HoMM3.

---

## 🗺 Organisation des assets

Tu bosses avec un système de **sprites semi-transparents**, organisés par biome + variantes.

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

* Tous les fichiers doivent être **PNG transparents**
* Les bords doivent être **progressifs (flous ou fondus)**
* Les **sprites de transition** sont des **patchs semi-transparents** qui viennent se superposer

---

## 🧪 Exemple de rendu d'une case avec `pixi.js`

### 📌 Placement hex axial (flat-topped hex)

```ts
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

> ✅ Tu places tes sprites **un par un**, **sans bordure visible**, et **avec superposition si nécessaire** (ex : overlay rivière).

---

## 🎨 Style et effets recommandés

| Élément               | Recommandation                                                      |
| --------------------- | ------------------------------------------------------------------- |
| Palette               | Désaturée, fantasy nature, lumière douce                            |
| Transitions           | Fusion douce entre biomes (blur, dégradé)                           |
| Détail de surface     | Ajouté par **overlay semi-translucide**                             |
| Bord hex visible      | ❌ Interdit !                                                        |
| Variation intra-biome | Utiliser `(q, r)` pour choisir sprite différent (mais déterministe) |

### Exemple de variation :

```ts
const variantId = (tile.q * 928371 + tile.r * 123457) % biomeVariantCount;
const spriteId = `${tile.biome}/forest_core_${variantId}.png`;
```

---

## 🎯 Résultat attendu

* Les **formes naturelles** (forêt dense, clairière, baie, dune) ressortent immédiatement
* La **grille hexagonale est invisible**
* La **richesse visuelle** ne nuit pas à la lisibilité
* Le jeu semble **peint à la main**, pas carrelé

---

## 🚀 Implémentation avec PIXI.js

### 1. Configuration de base

```ts
const app = new PIXI.Application({
  width: 1200,
  height: 800,
  backgroundColor: 0x2C3E50,
  antialias: true,
  resolution: window.devicePixelRatio || 1
});

// Conteneur principal pour le terrain
const terrainContainer = new PIXI.Container();
app.stage.addChild(terrainContainer);
```

### 2. Création des textures de biome

```ts
// Couleurs de base pour chaque biome
const BIOME_COLORS = {
  forest: 0x2D5016,
  desert: 0xF4A460,
  water: 0x4A90E2,
  mountain: 0x8B4513,
  grass: 0x7FB069,
  swamp: 0x556B2F
};

// Créer une texture organique pour chaque biome
const createOrganicTexture = (biome: string, color: number) => {
  const graphics = new PIXI.Graphics();
  const size = TILE_WIDTH;
  const radius = size / 2;
  
  // Forme hexagonale avec bords flous
  graphics.beginFill(color);
  graphics.drawPolygon(createHexPoints(radius));
  graphics.endFill();
  
  // Ajouter du grain et des détails
  addBiomeDetails(graphics, biome, radius);
  
  // Appliquer un filtre de flou léger
  const blur = new PIXI.filters.BlurFilter(0.5);
  graphics.filters = [blur];
  
  return app.renderer.generateTexture(graphics);
};
```

### 3. Système de transition

```ts
const createTransitionSprite = (fromBiome: string, toBiome: string) => {
  const graphics = new PIXI.Graphics();
  
  // Créer un dégradé entre les deux biomes
  const gradient = createBiomeGradient(
    BIOME_COLORS[fromBiome], 
    BIOME_COLORS[toBiome]
  );
  
  graphics.beginFill(gradient);
  graphics.drawPolygon(createHexPoints(TILE_WIDTH / 2));
  graphics.endFill();
  
  // Transparence pour la fusion
  graphics.alpha = 0.6;
  
  return graphics;
};
```

### 4. Rendu final

```ts
// Pour chaque tuile
tiles.forEach(tile => {
  const { x, y } = axialToPixel(tile.q, tile.r);
  
  // Sprite de base
  const baseSprite = new PIXI.Sprite(getTexture(tile.biome));
  baseSprite.anchor.set(0.5);
  baseSprite.position.set(x, y);
  terrainContainer.addChild(baseSprite);
  
  // Ajouter les transitions si nécessaire
  const neighbors = getNeighbors(tile);
  neighbors.forEach(neighbor => {
    if (neighbor.biome !== tile.biome) {
      const transition = createTransitionSprite(tile.biome, neighbor.biome);
      transition.position.set(x, y);
      terrainContainer.addChild(transition);
    }
  });
  
  // Overlays (rivières, routes, etc.)
  if (tile.hasRiver) {
    const riverSprite = new PIXI.Sprite(getRiverTexture(tile.riverDirection));
    riverSprite.anchor.set(0.5);
    riverSprite.position.set(x, y);
    riverSprite.alpha = 0.7;
    terrainContainer.addChild(riverSprite);
  }
});
```

---

## 📦 Assets requis

### Structure des dossiers

```
public/assets/terrain/
├── forest/
│   ├── forest_core_1.png
│   ├── forest_core_2.png
│   ├── forest_core_3.png
│   └── forest_edge.png
├── desert/
│   ├── desert_core_1.png
│   ├── desert_dune_1.png
│   └── desert_oasis.png
├── water/
│   ├── water_deep.png
│   ├── water_shore.png
│   └── water_waves.png
└── transitions/
    ├── forest_to_grass.png
    ├── water_to_desert.png
    └── mountain_to_grass.png
```

### Spécifications techniques

| Propriété    | Valeur                     |
| ------------ | -------------------------- |
| Format       | PNG avec canal alpha       |
| Taille       | 64x56 pixels              |
| Résolution   | 72 DPI                    |
| Transparence | Bords progressifs         |
| Palette      | Désaturée, tons naturels  |

---

## 🎮 Intégration dans Heroes of Time

### Modifications nécessaires

1. **Remplacer `HexTerrainRenderer`** par le nouveau système
2. **Créer les assets** selon les spécifications
3. **Ajouter pixi-filters** aux dépendances
4. **Optimiser les performances** pour 20x20 tuiles minimum

### Code d'intégration

```ts
// Dans TrueHeroesInterface.tsx
import { OrganicTerrainRenderer } from './OrganicTerrainRenderer';

const TrueHeroesInterface = () => {
  return (
    <div className="game-interface">
      <OrganicTerrainRenderer
        width={800}
        height={600}
        tiles={hexTiles}
        onTileClick={handleTileClick}
        onTileHover={handleTileHover}
      />
    </div>
  );
};
```

---

## 🔍 Résultat final

Avec cette implémentation, tu obtiendras :

✅ **Terrain organique** sans grille visible  
✅ **Transitions fluides** entre biomes  
✅ **Variations naturelles** au sein d'un même biome  
✅ **Performance optimisée** avec PIXI.js  
✅ **Style Heroes III** authentique  

Le joueur verra un **monde vivant et naturel** où les formes macroscopiques (forêts, lacs, montagnes) ressortent clairement, tout en conservant la précision tactique de la grille hexagonale sous-jacente.

---

*Ce guide est la base technique pour implémenter le rendu "aérosol" dans Heroes of Time. Prochaine étape : créer les assets et implémenter le nouveau renderer.* 