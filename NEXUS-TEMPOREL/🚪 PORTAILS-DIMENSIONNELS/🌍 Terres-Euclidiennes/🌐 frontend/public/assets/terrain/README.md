# 🗺️ Terrain Assets - David Gervais Hex Tileset

## 📋 Source
- **Tileset**: [David Gervais Hex Tileset](https://opengameart.org/content/hexagon-tileset)
- **Author**: David E. Gervais
- **License**: CC-BY 3.0 (Commercial use allowed with attribution)
- **Format**: PNG, ~64x56 pixels per tile

## 📁 Directory Structure

```
assets/terrain/
├── grass/
│   ├── grass_core.png          # Core grass tiles
│   ├── grass_edge.png          # Edge grass tiles
│   ├── grass_to_forest.png     # Transition to forest
│   ├── grass_to_water.png      # Transition to water
│   ├── grass_to_desert.png     # Transition to desert
│   └── grass_to_mountain.png   # Transition to mountain
├── forest/
│   ├── forest_core.png         # Dense forest center
│   ├── forest_edge.png         # Forest edge tiles
│   ├── forest_to_grass.png     # Transition to grass
│   ├── forest_to_water.png     # Transition to water
│   └── forest_to_mountain.png  # Transition to mountain
├── water/
│   ├── water_deep.png          # Deep water center
│   ├── water_shore.png         # Water shore/edge
│   ├── water_to_grass.png      # Water to grass shore
│   ├── water_to_forest.png     # Water to forest shore
│   └── water_to_desert.png     # Water to desert shore
├── desert/
│   ├── desert_core.png         # Desert center
│   ├── desert_dune.png         # Desert dunes/edge
│   ├── desert_to_grass.png     # Desert to grass
│   ├── desert_to_water.png     # Desert to water (oasis)
│   └── desert_to_mountain.png  # Desert to mountain
├── mountain/
│   ├── mountain_peak.png       # Mountain peaks
│   ├── mountain_slope.png      # Mountain slopes/edge
│   ├── mountain_to_grass.png   # Mountain to grass
│   ├── mountain_to_forest.png  # Mountain to forest
│   └── mountain_to_desert.png  # Mountain to desert
└── swamp/
    ├── swamp_core.png          # Dense swamp center
    ├── swamp_edge.png          # Swamp edge
    ├── swamp_to_grass.png      # Swamp to grass
    ├── swamp_to_water.png      # Swamp to water
    └── swamp_to_forest.png     # Swamp to forest
```

## 🔧 Integration Process

### 1. Download & Extract
```bash
# Download from OpenGameArt
wget https://opengameart.org/content/hexagon-tileset

# Extract to temporary folder
unzip hexagon-tileset.zip
```

### 2. Manual Organization
- Sort tiles by terrain type
- Rename according to structure above
- Ensure consistent naming convention

### 3. Sprite Selection Logic
```typescript
// Core tiles: Used in zone centers (distance > 1 from edge)
// Edge tiles: Used at zone boundaries (distance = 0)
// Transition tiles: Used near different terrain (distance = 1)
```

## 🎨 Usage in Game

### Terrain Selection Algorithm
1. **Zone Detection**: Backend creates contiguous terrain zones
2. **Distance Calculation**: Calculate distance from tile to zone edge
3. **Sprite Selection**: Choose appropriate sprite based on:
   - Distance to edge (core/edge/transition)
   - Neighboring terrain types
   - Zone size and density

### Rendering Priority
1. **Core sprites**: Center of large zones
2. **Edge sprites**: Boundaries of zones
3. **Transition sprites**: Where different terrains meet
4. **Color fallback**: When sprites fail to load

## 🔄 Fallback System

If sprites fail to load, the game falls back to:
- **Grass**: #4CAF50 (Green)
- **Forest**: #2E7D32 (Dark Green)
- **Water**: #2196F3 (Blue)
- **Desert**: #FFC107 (Amber)
- **Mountain**: #795548 (Brown)
- **Swamp**: #8BC34A (Light Green)

## 📊 Performance Notes

- Sprites are cached after first load
- Core sprites are preloaded for better performance
- Transition sprites are loaded on-demand
- Memory management with cache clearing

## 🎯 Future Enhancements

- **Seasonal variations**: Different sprites for winter/summer
- **Animated tiles**: Water ripples, grass movement
- **Elevated terrain**: Mountain height variations
- **Weather effects**: Rain, fog, snow overlays

---

*Credit: David E. Gervais for the beautiful hex tileset (CC-BY 3.0)* 