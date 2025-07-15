# 🎮 Documentation - Système de Sprites de Héros

## 📋 Problème Résolu

**Problème initial :** Les spritesheets de héros s'affichaient entièrement au lieu d'un sprite individuel, montrant toute la grille/mosaïque d'images.

**Solution :** Système de découpage de sprites avec `background-position` CSS et `drawImage()` canvas pour n'afficher qu'un sprite spécifique.

## 🏗️ Architecture du Système

### 1. Structure des Fichiers

```
frontend/src/
├── utils/
│   └── heroAssets.ts          # Helper principal pour les sprites
├── components/
│   ├── TrueHeroesInterface.tsx # Interface principale (mise à jour)
│   ├── ModernGameRenderer.tsx  # Rendu canvas (mise à jour)
│   └── HeroSpriteTest.tsx     # Composant de test
└── constants/
    └── gameAssets.ts          # Assets de base (conservé)
```

### 2. Configuration des Sprites

```typescript
// Dans utils/heroAssets.ts
export const HERO_SPRITES: Record<string, HeroSpriteData> = {
  ARTHUR: {
    spritesheet: '/assets/heroes/knights-spritesheet.png',
    sprite: { x: 0, y: 0, width: 64, height: 64 }  // Premier sprite
  },
  MORGANA: {
    spritesheet: '/assets/heroes/mages-spritesheet.png', 
    sprite: { x: 64, y: 0, width: 64, height: 64 }  // Deuxième sprite
  },
  // ... autres héros
};
```

## 🛠️ Fonctions Helper

### `getHeroSprite(heroName: string)`
- **Usage :** Obtient les données de sprite d'un héros
- **Retour :** `HeroSpriteData | null`
- **Exemple :** `const spriteData = getHeroSprite('Arthur');`

### `createSpriteStyle(spriteData: HeroSpriteData)`
- **Usage :** Crée le style CSS pour afficher un sprite
- **Retour :** `React.CSSProperties`
- **Technique :** Utilise `background-position` pour découper la spritesheet

### `drawHeroSprite(ctx, heroName, x, y, width, height)`
- **Usage :** Dessine un sprite sur un canvas
- **Technique :** Utilise `drawImage()` avec coordonnées source/destination

### `getHeroFallbackImage(heroName: string)`
- **Usage :** Obtient l'image PNG de fallback
- **Retour :** URL de l'image PNG simple

## 📝 Méthodes d'Utilisation

### 1. Affichage avec CSS (Recommandé)

```tsx
const HeroComponent = ({ heroName }: { heroName: string }) => {
  const spriteData = getHeroSprite(heroName);
  
  if (spriteData) {
    const style = createSpriteStyle(spriteData);
    return <div className="hero-sprite" style={style} />;
  }
  
  // Fallback vers image PNG
  return <img src={getHeroFallbackImage(heroName)} alt={heroName} />;
};
```

### 2. Affichage sur Canvas

```typescript
const drawHero = (ctx: CanvasRenderingContext2D, heroName: string) => {
  const spriteData = getHeroSprite(heroName);
  
  if (spriteData) {
    const img = new Image();
    img.onload = () => {
      const { sprite } = spriteData;
      ctx.drawImage(
        img,
        sprite.x, sprite.y, sprite.width, sprite.height,  // Source
        x, y, displayWidth, displayHeight                  // Destination
      );
    };
    img.src = spriteData.spritesheet;
  }
};
```

### 3. Système de Fallback à 3 Niveaux

```
1. Spritesheet avec découpage → 
2. Image PNG simple → 
3. Emoji de fallback
```

## 🎨 Styles CSS

```css
.hero-sprite {
  display: block;
  image-rendering: pixelated;     /* Pour sprites pixelisés */
  image-rendering: crisp-edges;
  transition: transform 0.2s ease;
}

.hero-image {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 215, 0, 0.3);
}
```

## 🔧 Configuration des Coordonnées

### Exemple de Spritesheet 4x4 (256x256px, sprites 64x64)

```
┌─────┬─────┬─────┬─────┐
│ 0,0 │64,0 │128,0│192,0│  ← Ligne 1
├─────┼─────┼─────┼─────┤
│0,64 │64,64│128,64│192,64│ ← Ligne 2
├─────┼─────┼─────┼─────┤
│0,128│64,128│128,128│192,128│ ← Ligne 3
├─────┼─────┼─────┼─────┤
│0,192│64,192│128,192│192,192│ ← Ligne 4
└─────┴─────┴─────┴─────┘
```

### Configuration Correspondante

```typescript
HERO_SPRITES: {
  ARTHUR: { spritesheet: 'knights.png', sprite: { x: 0, y: 0, width: 64, height: 64 } },
  LANCELOT: { spritesheet: 'knights.png', sprite: { x: 64, y: 0, width: 64, height: 64 } },
  GAWAIN: { spritesheet: 'knights.png', sprite: { x: 128, y: 0, width: 64, height: 64 } },
  // ...
}
```

## 🚀 Avantages du Système

1. **Performance :** Une seule spritesheet au lieu de multiples images
2. **Flexibilité :** Facile d'ajouter de nouveaux héros
3. **Fallback Robuste :** 3 niveaux de fallback
4. **Maintenabilité :** Configuration centralisée
5. **Optimisation :** Réutilisation des spritesheets chargées

## 🧪 Test du Système

Utilisez le composant `HeroSpriteTest` pour tester :

```tsx
import HeroSpriteTest from './components/HeroSpriteTest';

// Dans votre composant de développement
<HeroSpriteTest />
```

## 📁 Structure des Assets

```
public/assets/heroes/
├── knights-spritesheet.png     # Spritesheet des chevaliers
├── mages-spritesheet.png       # Spritesheet des mages
├── warriors-spritesheet.png    # Spritesheet des guerriers
├── archers-spritesheet.png     # Spritesheet des archers
└── fallbacks/                  # Images PNG individuelles
    ├── arthur.png
    ├── morgana.png
    └── warrior.png
```

## 🔄 Migration depuis l'Ancien Système

### Avant (Problématique)
```tsx
// Affichait toute la spritesheet
<img src="/assets/heroes/knights-spritesheet.png" alt="Arthur" />
```

### Après (Correct)
```tsx
// Affiche uniquement le sprite d'Arthur
const spriteData = getHeroSprite('Arthur');
if (spriteData) {
  const style = createSpriteStyle(spriteData);
  return <div style={style} />;
}
```

## 🎯 Bonnes Pratiques

1. **Nommage :** Utilisez des noms cohérents pour les héros
2. **Tailles :** Gardez des tailles de sprites uniformes (64x64 recommandé)
3. **Fallbacks :** Toujours prévoir un fallback PNG + emoji
4. **Performance :** Préchargez les spritesheets utilisées
5. **Accessibilité :** Ajoutez des `alt` et `title` appropriés

## 🛠️ Maintenance

- **Ajouter un héros :** Mettre à jour `HERO_SPRITES` et `HERO_FALLBACK_IMAGES`
- **Modifier une spritesheet :** Ajuster les coordonnées `x, y`
- **Déboguer :** Utiliser `HeroSpriteTest` pour vérifier l'affichage

---

*Cette documentation garantit que les spritesheets sont correctement découpées et que seuls les sprites individuels sont affichés, résolvant le problème initial.* 