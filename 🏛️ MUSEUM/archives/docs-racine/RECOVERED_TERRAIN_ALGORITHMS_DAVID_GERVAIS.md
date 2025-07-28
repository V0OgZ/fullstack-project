# 🏛️ ALGORITHMES TERRAIN DAVID GERVAIS RÉCUPÉRÉS
**Archéologie Port 3000 - Algorithmes génération terrain sauvegardés**  
*Récupéré de `🌐 frontend/src/components/ModernGameRenderer.tsx`*

## 🎨 SYSTÈME COULEURS TERRAIN
```typescript
const TERRAIN_COLORS: Record<string, string> = {
  grass: '#4CAF50',      // Vert prairie
  forest: '#2E7D32',     // Vert foncé forêt  
  mountain: '#795548',   // Brun montagne
  water: '#2196F3',      // Bleu eau
  desert: '#FF9800',     // Orange désert
  swamp: '#607D8B',      // Bleu-gris marécage
  dirt: '#8D6E63',       // Brun terre
  road: '#9E9E9E',       // Gris route
  neutral: '#9E9E9E'     // Gris neutre
};
```

## ⛰️ SYSTÈME ÉLÉVATION TERRAIN  
```typescript
const TERRAIN_ELEVATION: Record<string, number> = {
  water: 0.2,       // Très bas (lacs, rivières)
  grass: 0.5,       // Niveau standard
  dirt: 0.5,        // Niveau standard  
  road: 0.5,        // Niveau standard
  desert: 0.6,      // Légèrement élevé
  swamp: 0.3,       // Bas (marécages)
  forest: 0.7,      // Élevé (collines boisées)
  mountain: 1.0     // Maximum (pics)
};
```

## 🔷 INTERFACE TUILE TERRAIN COMPLÈTE
```typescript
interface TerrainTile {
  x: number;           // Position X hexagonale
  y: number;          // Position Y hexagonale
  type: string;       // Type de terrain (grass, forest, etc.)
  elevation: number;  // Élévation (0.0 à 1.0)
  tilesetVariant?: string;           // Variante tileset David Gervais
  transitions?: Record<string, boolean>;  // Transitions entre terrains
  biome?: string;                    // Biome (tempéré, désertique, etc.)
  moistureLevel?: number;            // Niveau humidité (génération procédurale)
}
```

## 🔷 ALGORITHME DESSIN HEXAGONAL
```typescript
const drawHexagon = useCallback((ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const angle = (i * Math.PI) / 3;  // 60° par côté
    const hx = x + size * Math.cos(angle);
    const hy = y + size * Math.sin(angle);
    if (i === 0) {
      ctx.moveTo(hx, hy);
    } else {
      ctx.lineTo(hx, hy);
    }
  }
  ctx.closePath();
}, []);
```

## 🏞️ ALGORITHME RENDU TERRAIN DAVID GERVAIS
```typescript
const renderTerrain = useCallback(async (ctx: CanvasRenderingContext2D) => {
  terrainTiles.forEach(tile => {
    const pixelPos = tileToPixel(tile.x, tile.y);
    const terrainColor = TERRAIN_COLORS[tile.type] || TERRAIN_COLORS.neutral;
    const elevation = TERRAIN_ELEVATION[tile.type] || 0.5;
    
    // Base hexagon - Couleur du terrain
    ctx.fillStyle = terrainColor;
    drawHexagon(ctx, pixelPos.x, pixelPos.y, hexSize);
    ctx.fill();
    
    // Elevation effect - Effet 3D avec transparence blanche
    if (showElevation && elevation > 0.5) {
      ctx.fillStyle = `rgba(255, 255, 255, ${(elevation - 0.5) * 0.3})`;
      drawHexagon(ctx, pixelPos.x, pixelPos.y, hexSize);
      ctx.fill();
    }
    
    // Grid - Contours hexagones
    if (showGrid) {
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.lineWidth = 1;
      drawHexagon(ctx, pixelPos.x, pixelPos.y, hexSize);
      ctx.stroke();
    }
  });
}, [terrainTiles, tileToPixel, drawHexagon, hexSize, showElevation, showGrid]);
```

## 🔮 SYSTÈME SYMBOLES RUNIQUES HOTS
```typescript
// Correspondances formules HOTS → Symboles runiques
const RUNIC_FORMULAS: Record<string, { symbol: string; color: string }> = {
  'MOV': { symbol: '⟶', color: '#4ECDC4' },     // Mouvement
  'CAST': { symbol: 'ψ', color: '#9C27B0' },    // Sort (Psi-State)
  'CREATE': { symbol: '⊙', color: '#FF6B6B' },  // Création (Superposition)
  'USE': { symbol: 'Π', color: '#FF9800' },     // Utilisation (Observation)
  'ATTACK': { symbol: '†', color: '#F44336' },  // Attaque (Collapse)
  'BATTLE': { symbol: '⨉', color: '#D32F2F' },  // Bataille (Conflit)
  'HERO': { symbol: 'Ω', color: '#FFD700' },    // Héros (Oméga)
  'TEMPORAL': { symbol: 'τ', color: '#7B1FA2' }, // Temporal
  'TIMELINE': { symbol: 'ℬ', color: '#3F51B5' }, // Branche
  'QUANTUM': { symbol: '↯', color: '#00BCD4' },  // ZFC
  'COLLAPSE': { symbol: '†', color: '#E91E63' }, // Collapse causal
  'ROLLBACK': { symbol: '↺', color: '#795548' }, // Rollback
  'DELTA': { symbol: 'Δt', color: '#607D8B' },   // Délai temporel
};
```

## ✨ INTERFACE SYMBOLES RUNIQUES
```typescript
interface RunicSymbol {
  id: string;
  symbol: string;   // Le symbole HOTS (ψ, †, Ω, etc.)
  x: number;        // Position initiale
  y: number;
  startTime: number;
  duration: number; // Durée de vie en ms
  type: 'spell' | 'movement' | 'creation' | 'combat' | 'temporal' | 'quantum';
  opacity: number;
  scale: number;
  offsetY: number;  // Pour le flottement
  color: string;    // Couleur du symbole
}
```

## 🚀 UTILISATION
Ces algorithmes peuvent être intégrés dans :
- ✅ **Backend Java** - Pour génération procédurale de cartes
- ✅ **Frontend React** - Pour rendu temps réel
- ✅ **Interface Temporal Port 8000** - Pour version simplifiée  
- ✅ **Nouveau moteur de jeu** - Comme base terrain

## 🎯 AVANTAGES SYSTÈME DAVID GERVAIS
- **Modulaire** : Chaque terrain a ses propriétés
- **Scalable** : Support transitions et variantes
- **Performant** : Rendu optimisé Canvas 2D
- **Extensible** : Ajout facile nouveaux terrains
- **Esthétique** : Effets élévation et grille
- **Intégré HOTS** : Symboles runiques quantiques

*✅ Archéologie terminée - Algorithmes sauvegardés !* 