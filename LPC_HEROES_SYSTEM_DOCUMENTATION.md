# 🎮 Heroes of Time - Système de Héros LPC

## 📋 Vue d'ensemble

Le système de héros a été entièrement refactorisé pour utiliser les sprites **LPC (Liberated Pixel Cup) Medieval Fantasy Character** d'OpenGameArt.org et inclure une configuration dynamique des héros par scénario.

## 🎨 Sprites LPC Open Source

### Source
- **Origine :** [OpenGameArt.org - LPC Medieval Fantasy Character Sprites](https://opengameart.org/content/lpc-medieval-fantasy-character-sprites)
- **Auteur :** wulax
- **Licence :** CC-BY-SA 3.0, GPL 3.0, OGA-BY 3.0
- **Format :** Sprites 64x64 pixels

### Avantages
- ✅ **Open Source** - Utilisable librement
- ✅ **Haute qualité** - Sprites professionnels
- ✅ **Cohérence visuelle** - Style uniforme
- ✅ **Animations** - Support des animations de mouvement
- ✅ **Modularité** - Sprites découpables

## 🏗️ Architecture du Système

### 1. Configuration Frontend (`heroAssets.ts`)

```typescript
// Sprites LPC avec coordonnées précises
export const HERO_SPRITES: Record<string, HeroSpriteData> = {
  ARTHUR: {
    spritesheet: '/assets/heroes/lpc-knight-male.png',
    sprite: { x: 0, y: 0, width: 64, height: 64 }
  },
  TRISTAN: {
    spritesheet: '/assets/heroes/lpc-knight-male.png',
    sprite: { x: 64, y: 0, width: 64, height: 64 }
  }
  // ... autres héros
};

// Héros par défaut par scénario
export const DEFAULT_HEROES_BY_SCENARIO: Record<string, string> = {
  'conquest-classic': 'ARTHUR',
  'temporal-rift': 'TRISTAN',
  'multiplayer-arena': 'RANDOM'
};
```

### 2. Configuration Backend (JSON de Scénarios)

```json
{
  "scenarioId": "conquest-classic",
  "defaultHero": "ARTHUR",
  "heroConfig": {
    "heroId": "ARTHUR",
    "heroName": "Arthur",
    "heroClass": "Knight",
    "heroDescription": "Noble knight of the realm, skilled in combat and leadership",
    "startingLevel": 1,
    "startingStats": {
      "attack": 10,
      "defense": 8,
      "spellPower": 2,
      "knowledge": 3,
      "health": 100,
      "mana": 20
    },
    "startingSkills": ["Leadership", "Combat"],
    "startingSpells": []
  }
}
```

## 🦸 Héros Disponibles

### Héros Classiques
- **ARTHUR** - Noble Knight (Conquest Classic)
- **MORGANA** - Powerful Sorceress
- **WARRIOR** - Fierce Fighter
- **ARCHER** - Expert Marksman
- **PALADIN** - Holy Warrior
- **MAGE** - Scholar of Magic
- **NECROMANCER** - Master of Death Magic

### Héros Spécialisés par Scénario
- **TRISTAN** - Temporal Knight (Temporal Rift)
- **ELARA** - Time Mage
- **GARETH** - Dragon Slayer
- **LYANNA** - Elven Archer
- **CEDRIC** - Righteous Paladin
- **SERAPHINA** - Celestial Mage
- **VALEN** - Shadow Necromancer

## 🎯 Configuration par Scénario

### Conquest Classic
```json
{
  "defaultHero": "ARTHUR",
  "heroConfig": {
    "heroId": "ARTHUR",
    "startingLevel": 1,
    "startingStats": {
      "attack": 10,
      "defense": 8,
      "spellPower": 2,
      "knowledge": 3,
      "health": 100,
      "mana": 20
    },
    "startingSkills": ["Leadership", "Combat"]
  }
}
```

### Temporal Rift
```json
{
  "defaultHero": "TRISTAN",
  "heroConfig": {
    "heroId": "TRISTAN",
    "startingLevel": 3,
    "startingStats": {
      "attack": 12,
      "defense": 10,
      "spellPower": 4,
      "knowledge": 5,
      "health": 120,
      "mana": 40
    },
    "startingSkills": ["Leadership", "Combat", "Time Magic"],
    "startingSpells": ["Temporal Shield", "Haste"]
  }
}
```

### Multiplayer Arena
```json
{
  "defaultHero": "RANDOM",
  "heroConfig": {
    "heroSelection": "RANDOM",
    "heroPool": ["ARTHUR", "MORGANA", "WARRIOR", "ARCHER", "PALADIN", "MAGE", "NECROMANCER", "TRISTAN", "ELARA", "GARETH", "LYANNA", "CEDRIC", "SERAPHINA", "VALEN"],
    "allowDuplicates": false,
    "startingLevel": 1,
    "baseStats": {
      "attack": 8,
      "defense": 6,
      "spellPower": 3,
      "knowledge": 4,
      "health": 80,
      "mana": 30
    }
  }
}
```

## 🛠️ Fonctions Helper

### `getDefaultHeroForScenario(scenarioId: string)`
- Retourne le héros par défaut pour un scénario
- Gère la sélection aléatoire pour le multijoueur
- Fallback vers Arthur si non trouvé

### `getHeroInfo(heroName: string)`
- Retourne les informations détaillées d'un héros
- Inclut nom, classe, description
- Utilisé pour l'affichage dans l'interface

### `getHeroSprite(heroName: string)`
- Retourne les données de sprite LPC
- Coordonnées exactes dans la spritesheet
- Null si sprite non trouvé

### `createSpriteStyle(spriteData: HeroSpriteData)`
- Crée le style CSS pour afficher le sprite
- Utilise `background-position` pour découper
- Garde la taille originale de 64x64

## 🎨 Système d'Affichage

### 1. Sprites avec CSS
```tsx
const HeroDisplay = ({ heroName }: { heroName: string }) => {
  const spriteData = getHeroSprite(heroName);
  
  if (spriteData) {
    const style = createSpriteStyle(spriteData);
    return <div className="hero-sprite" style={style} />;
  }
  
  return <img src={getHeroFallbackImage(heroName)} alt={heroName} />;
};
```

### 2. Système de Fallback
```
1. Sprite LPC (spritesheet) →
2. Image PNG individuelle →
3. Emoji de fallback
```

### 3. Styles CSS
```css
.hero-sprite {
  display: block;
  image-rendering: pixelated;
  image-rendering: crisp-edges;
  width: 64px;
  height: 64px;
}

.hero-class {
  color: #FFD700;
  font-weight: bold;
}

.skill-badge {
  background: rgba(255, 215, 0, 0.2);
  color: #FFD700;
  padding: 2px 6px;
  border-radius: 4px;
}

.spell-badge {
  background: rgba(138, 43, 226, 0.2);
  color: #DA70D6;
}
```

## 🔄 Intégration Backend

### Service Java (ScenarioService)
```java
public Map<String, Object> getHeroConfigForScenario(String scenarioId) {
    String jsonContent = loadScenarioJson(scenarioId);
    Map<String, Object> scenarioData = parseScenarioJson(jsonContent);
    return (Map<String, Object>) scenarioData.get("heroConfig");
}

public String getDefaultHeroForScenario(String scenarioId) {
    // Charge la configuration depuis le JSON
    // Gère la sélection aléatoire
    // Retourne le héros approprié
}
```

### GameService Integration
```java
private Map<String, Object> createHero(String id, String name, String heroClass, 
                                     int x, int y, String playerId, 
                                     Map<String, Object> heroConfig) {
    // Utilise heroConfig pour définir les stats
    // Applique les skills et spells de départ
    // Configure selon le scénario
}
```

## 📁 Structure des Assets

```
public/assets/heroes/
├── lpc-knight-male.png          # Sprites des chevaliers
├── lpc-mage-female.png          # Sprites des mages féminines
├── lpc-warrior-male.png         # Sprites des guerriers
├── lpc-archer-female.png        # Sprites des archers
├── lpc-paladin-male.png         # Sprites des paladins
├── lpc-necromancer-male.png     # Sprites des nécromanciens
└── fallbacks/                   # Images PNG individuelles
    ├── knight-arthur.png
    ├── mage-morgana.png
    └── warrior-base.png
```

## 🎯 Avantages du Système

1. **Flexibilité** - Configuration par scénario
2. **Cohérence** - Style visuel uniforme LPC
3. **Performance** - Sprites optimisés
4. **Extensibilité** - Facile d'ajouter de nouveaux héros
5. **Open Source** - Assets libres et légaux
6. **Personnalisation** - Stats et skills configurables
7. **Multijoueur** - Sélection aléatoire supportée

## 🚀 Utilisation

### Ajouter un Nouveau Héros
1. Ajouter l'entrée dans `HERO_SPRITES`
2. Ajouter l'image fallback dans `HERO_FALLBACK_IMAGES`
3. Ajouter les informations dans `getHeroInfo()`
4. Mettre à jour `RANDOM_HEROES` si nécessaire
5. Configurer dans les JSON de scénarios

### Créer un Nouveau Scénario
1. Créer le fichier JSON dans `backend/src/main/resources/scenarios/`
2. Définir `defaultHero` et `heroConfig`
3. Ajouter l'entrée dans `DEFAULT_HEROES_BY_SCENARIO`
4. Tester avec différents héros

## 🧪 Tests

### Frontend
```typescript
// Test du système de sprites
describe('Hero Sprites System', () => {
  it('should return correct sprite data for Arthur', () => {
    const sprite = getHeroSprite('ARTHUR');
    expect(sprite).toBeDefined();
    expect(sprite.sprite.width).toBe(64);
  });
});
```

### Backend
```java
@Test
public void testHeroConfigLoading() {
    Map<String, Object> config = scenarioService.getHeroConfigForScenario("conquest-classic");
    assertNotNull(config);
    assertEquals("ARTHUR", config.get("heroId"));
}
```

## 🔮 Évolutions Futures

1. **Animations** - Support des animations de mouvement LPC
2. **Équipement** - Sprites d'armures et d'armes
3. **Races** - Elfes, nains, orcs avec sprites LPC
4. **Customisation** - Éditeur de héros personnalisés
5. **Portraits** - Portraits haute résolution pour les dialogues

---

*Ce système garantit une expérience visuelle cohérente et professionnelle tout en respectant les licences open source et en offrant une flexibilité maximale pour la configuration des héros par scénario.* 