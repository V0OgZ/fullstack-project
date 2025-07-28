# 🎨 Hero Assets Integration Guide

## 🎯 Current State
Your game already has:
- ✅ **4 hero graphics**: warrior.png, mage.png, archer.png, paladin.png
- ✅ **Dynamic SVG system**: Creates beautiful heroes programmatically
- ✅ **Asset directories**: Organized structure in `/assets/heroes/`

## 📥 Best FREE Resources (Run `./download-hero-assets.sh`)

### 🏆 **Top Recommendation: OpenGameArt.org**
1. **[Cabbit's 24x32 Big Pack](https://opengameart.org/content/24x32-characters-with-faces-big-pack)**
   - 53 characters including heroes, NPCs, and faces
   - Perfect for both movement sprites AND portraits
   - CC-BY license (just credit the artist)

2. **[Classic Hero Pack](https://opengameart.org/content/classic-hero-and-baddies-pack)**
   - Animated heroes with movement, punching, kicking
   - Perfect for your hero movement todo item!

### 🎨 **Kenney.nl (CC0 - No Attribution Needed)**
- **[Roguelike Characters](https://kenney.nl/assets/roguelike-characters)** - 450+ sprites!
- **[Tiny Dungeon](https://kenney-assets.itch.io/tiny-dungeon)** - 130+ sprites

## 🔧 Integration with Your Current System

### 1. **Download and Organize**
```bash
# Run the script to see all resources
./download-hero-assets.sh

# Organize downloaded assets
🌐 frontend/public/assets/heroes/sprites/     # For map movement
🌐 frontend/public/assets/heroes/portraits/   # For UI portraits
🌐 frontend/public/assets/heroes/animations/  # For combat animations
```

### 2. **Update gameAssets.ts**
```typescript
// Add to 🌐 frontend/src/constants/gameAssets.ts
export const HERO_SPRITES = {
  WARRIOR: '/assets/heroes/sprites/warrior_sprite.png',
  MAGE: '/assets/heroes/sprites/mage_sprite.png',
  ARCHER: '/assets/heroes/sprites/archer_sprite.png',
  KNIGHT: '/assets/heroes/sprites/knight_sprite.png',
  ROGUE: '/assets/heroes/sprites/rogue_sprite.png',
};

export const HERO_PORTRAITS = {
  WARRIOR: '/assets/heroes/portraits/warrior_portrait.png',
  MAGE: '/assets/heroes/portraits/mage_portrait.png',
  ARCHER: '/assets/heroes/portraits/archer_portrait.png',
  KNIGHT: '/assets/heroes/portraits/knight_portrait.png',
  ROGUE: '/assets/heroes/portraits/rogue_portrait.png',
};
```

### 3. **Hero Movement Implementation (Todo #1)**
```typescript
// In your hero movement component
import { HERO_SPRITES } from '../constants/gameAssets';

const HeroMovement: React.FC = ({ hero, position }) => {
  const [isMoving, setIsMoving] = useState(false);
  
  const handleHeroClick = async (targetPosition: Position) => {
    setIsMoving(true);
    
    // Use the sprite for movement animation
    const heroSprite = HERO_SPRITES[hero.type] || HERO_SPRITES.WARRIOR;
    
    try {
      // Call your backend movement API
      await ApiService.moveHero(hero.id, targetPosition);
      
      // Update hero position visually
      // Animation will use the sprite image
      
    } catch (error) {
      console.error('Movement failed:', error);
    } finally {
      setIsMoving(false);
    }
  };

  return (
    <div 
      className={`hero-sprite ${isMoving ? 'moving' : ''}`}
      style={{ 
        backgroundImage: `url(${HERO_SPRITES[hero.type]})`,
        left: position.x * 32,
        top: position.y * 32
      }}
      onClick={() => handleHeroClick(targetPosition)}
    />
  );
};
```

### 4. **Hero Portraits for UI**
```typescript
// In your hero selection/status UI
const HeroPortrait: React.FC<{ heroType: string }> = ({ heroType }) => {
  const portraitUrl = HERO_PORTRAITS[heroType] || HERO_PORTRAITS.WARRIOR;
  
  return (
    <div className="hero-portrait">
      <img src={portraitUrl} alt={`${heroType} portrait`} />
    </div>
  );
};
```

## 🎯 Perfect for Your Todo Items

### **Todo #1: Hero Movement**
- Download **Classic Hero Pack** for animated movement sprites
- Use sprites for click-to-move visualization
- Show movement animations during hero actions

### **Todo #2: Turn Management**
- Use **portraits** for turn indicator UI
- Show current player's hero portrait
- Animate portraits during turn transitions

## 🎨 Fallback System
Keep your existing SVG system as fallback:

```typescript
const getHeroImage = (heroType: string): string => {
  // Try sprite first
  if (HERO_SPRITES[heroType]) {
    return HERO_SPRITES[heroType];
  }
  
  // Fallback to SVG generation
  return generateHeroSVG(heroType);
};
```

## 💡 Pro Tips

1. **Start Small**: Download just the Classic Hero Pack first
2. **Test Integration**: Use one hero type to test the movement system
3. **Gradual Expansion**: Add more heroes as you implement features
4. **Keep SVG Fallback**: Your SVG system is excellent for prototyping

## 🚀 Quick Start
```bash
# 1. Run the asset discovery script
./download-hero-assets.sh

# 2. Download Classic Hero Pack from the URLs shown
# 3. Extract to 🌐 frontend/public/assets/heroes/sprites/
# 4. Update gameAssets.ts with new paths
# 5. Implement hero movement with real graphics!
```

This will give you beautiful, animated heroes that players can actually click and move around the map! 🎮 