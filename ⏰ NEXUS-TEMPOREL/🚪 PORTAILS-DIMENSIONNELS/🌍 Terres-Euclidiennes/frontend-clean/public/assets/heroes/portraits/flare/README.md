# Flare Portrait Pack Collection - Heroes of Time

## 🎨 Description
Collection de portraits fantasy semi-réalistes pour des héros qui imposent !
Style inspiré de Heroes of Might and Magic et Baldur's Gate.

## 📦 Contenu des packs
- **Flare Portrait Pack 1** : 6 héros originaux (3 hommes, 3 femmes)
- **Flare Portrait Pack 3** : 6 nouveaux portraits + 1 chien
- **Flare Portrait Pack 4** : 6 portraits supplémentaires
- **Flare Portrait Pack 5** : 6 portraits de plus
- **Flare Female Edition** : Pack dédié aux héroïnes

## 🎯 Utilisation
```typescript
import HeroPortrait from './HeroPortrait';

// Dans votre composant React
<HeroPortrait 
  heroName="WARRIOR" 
  size="medium" 
  showTooltip={true}
/>
```

## 🔧 Mapping des héros
Les portraits sont automatiquement mappés par le service `heroPortraitService.ts`.
Voir `portrait-mapping.json` pour les correspondances.

## 📝 Licence
- **CC-BY-SA 3.0** - Attribution requise
- **Artistes** : Justin Nichol & Clint Bellanger (Flare Project)
- **Source** : OpenGameArt.org

## 🎮 Intégration Heroes of Time
Ces portraits remplacent les emojis par défaut dans :
- Panneau de gestion des héros
- Sélection des héros
- Affichage en jeu

## 🌟 Crédits
- Artwork original : Flare RPG Project
- Intégration : Heroes of Time Team
- Collection : OpenGameArt.org
