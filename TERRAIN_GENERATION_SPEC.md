# 🗺️ Spec: Terrain Generation with Topological & Environmental Attributes

## 📋 Issue Description

**Problem**: Current map generation produces random biomes without coherent topological or environmental attributes. This results in unrealistic terrain that lacks natural formations like forest clearings, mountain valleys, or river systems.

**Goal**: Implement a contextual terrain generation system that creates natural, realistic terrain formations with proper topological attributes during initial map generation.

---

## 🎯 Requirements

### Core Functionality
- Generate maps with **contextual terrain attributes** (not pure random)
- Create **natural formations** (clearings, bays, valleys, ridges)
- Ensure **deterministic generation** using seed values
- Support **gameplay-relevant** terrain features
- Maintain **performance** for 20x20+ maps

### Technical Requirements
- Integrate with existing hex tile system
- Compatible with current backend/frontend architecture
- Extensible for future terrain features
- Deterministic with seed support

---

## 🔧 Technical Specification

### 1. **Base Biome Generation**
```typescript
interface HexTile {
  q: number;
  r: number;
  biome: BiomeType;
  // New attributes:
  groupId: number;
  distanceToEdge: number;
  elevation: number;
  vegetationLevel: number;
  riverFlowDir?: string;
  naturalBarrier: boolean;
  corruption?: number;
}
```

### 2. **Generation Pipeline**

#### Step 1: Initial Biome Assignment
```typescript
// Use noise-based or zone-based generation
const generateBaseBiomes = (width: number, height: number, seed: number): BiomeType[][] => {
  // Implementation using simplex noise or diamond-square
  // Creates coherent biome zones, not random scattered tiles
}
```

#### Step 2: Group ID Assignment
```typescript
// Flood-fill to identify continuous biome zones
const assignGroupIds = (tiles: HexTile[][]): void => {
  // Each continuous area of same biome gets unique groupId
  // Example: forest zone #1, forest zone #2, water zone #1, etc.
}
```

#### Step 3: Distance to Edge Calculation
```typescript
// Calculate distance from each tile to edge of its biome zone
const calculateDistanceToEdge = (tiles: HexTile[][]): void => {
  // Distance = number of tiles to nearest different biome
  // Used for determining core vs edge characteristics
}
```

#### Step 4: Environmental Attributes
```typescript
const addEnvironmentalAttributes = (tiles: HexTile[][]): void => {
  tiles.forEach(row => {
    row.forEach(tile => {
      // Contextual logic based on biome, position, and neighbors
      if (tile.biome === 'forest' && tile.distanceToEdge >= 3) {
        tile.vegetationLevel = 3; // Dense forest core
      }
      if (tile.biome === 'forest' && tile.distanceToEdge <= 1) {
        tile.vegetationLevel = 1; // Forest edge/clearing
      }
      // Add rivers in valleys (low elevation + slope)
      if (tile.elevation < averageElevation && hasSlope(tile)) {
        tile.riverFlowDir = calculateFlowDirection(tile);
      }
    });
  });
}
```

---

## 🌍 Terrain Feature Examples

### Forest Formations
```typescript
// Dense forest core
tile.biome = 'forest';
tile.groupId = 3;
tile.distanceToEdge = 4;
tile.vegetationLevel = 3;

// Forest clearing
tile.biome = 'grass';
tile.groupId = 7;
tile.distanceToEdge = 0;
tile.vegetationLevel = 1;
// Surrounded by forest tiles
```

### Water Features
```typescript
// Deep lake center
tile.biome = 'water';
tile.groupId = 1;
tile.distanceToEdge = 5;
tile.elevation = -20;

// Lake shore
tile.biome = 'water';
tile.groupId = 1;
tile.distanceToEdge = 1;
tile.elevation = -5;
// Adjacent to grass/forest
```

### Mountain Ranges
```typescript
// Mountain peak
tile.biome = 'mountain';
tile.groupId = 2;
tile.distanceToEdge = 3;
tile.elevation = 80;
tile.naturalBarrier = true;

// Mountain valley
tile.biome = 'grass';
tile.groupId = 5;
tile.distanceToEdge = 2;
tile.elevation = 30;
tile.riverFlowDir = 'NE';
```

---

## 🛠️ Implementation Plan

### Phase 1: Core Generation System
- [ ] Implement noise-based biome generation
- [ ] Add flood-fill for group ID assignment
- [ ] Calculate distance to edge for all tiles
- [ ] Add basic environmental attributes

### Phase 2: Advanced Features
- [ ] River system generation
- [ ] Natural barrier detection
- [ ] Vegetation level calculation
- [ ] Elevation-based features

### Phase 3: Special Formations
- [ ] Force-generate clearings in forests
- [ ] Create mountain valleys
- [ ] Add coastal features (bays, peninsulas)
- [ ] Implement corruption zones

---

## 📊 Acceptance Criteria

### Functional Requirements
- [ ] Maps generate with coherent biome zones (no random scatter)
- [ ] Each tile has contextually appropriate attributes
- [ ] Natural formations are recognizable (clearings, valleys, etc.)
- [ ] Generation is deterministic with same seed
- [ ] Performance: Generate 20x20 map in < 100ms

### Visual Requirements
- [ ] Forest cores are visually distinct from edges
- [ ] Water features flow naturally
- [ ] Mountain ranges form coherent chains
- [ ] Rivers follow logical paths (valleys)

### Technical Requirements
- [ ] Integrates with existing `HexTile` interface
- [ ] Works with current `OrganicTerrainRenderer`
- [ ] Extensible for future terrain types
- [ ] Proper TypeScript types for all attributes

---

## 🔍 Testing Strategy

### Unit Tests
```typescript
describe('TerrainGenerator', () => {
  it('should generate consistent biomes with same seed', () => {
    const map1 = generateTerrain(20, 20, 12345);
    const map2 = generateTerrain(20, 20, 12345);
    expect(map1).toEqual(map2);
  });

  it('should assign group IDs to continuous biome zones', () => {
    const map = generateTerrain(10, 10, 12345);
    const forestTiles = map.flat().filter(t => t.biome === 'forest');
    const uniqueGroups = new Set(forestTiles.map(t => t.groupId));
    expect(uniqueGroups.size).toBeGreaterThan(1); // Multiple forest zones
  });

  it('should calculate distance to edge correctly', () => {
    // Test with known pattern
    const centerTile = map[5][5]; // Known forest center
    expect(centerTile.distanceToEdge).toBeGreaterThan(2);
  });
});
```

### Visual Tests
```typescript
// Playwright test for terrain formations
test('should display natural forest clearings', async ({ page }) => {
  await page.goto('/game');
  await page.waitForSelector('.organic-terrain-renderer');
  
  // Check that forest zones have variation
  const forestTiles = await page.locator('[data-biome="forest"]').all();
  const vegetationLevels = await Promise.all(
    forestTiles.map(tile => tile.getAttribute('data-vegetation-level'))
  );
  
  expect(new Set(vegetationLevels).size).toBeGreaterThan(1);
});
```

---

## 📁 File Structure

```
backend/src/main/java/com/example/demo/service/
├── TerrainGeneratorService.java
├── BiomeAssignmentService.java
├── EnvironmentalAttributeService.java
└── TerrainValidationService.java

frontend/src/utils/
├── terrainGenerator.ts
├── biomeProcessor.ts
├── environmentalAttributes.ts
└── terrainFormations.ts
```

---

## 🚀 Implementation Notes

### Seed Usage
```typescript
// Consistent generation with same seed
const generator = new TerrainGenerator(seed);
const map = generator.generate(width, height);
```

### Contextual Logic Example
```typescript
const addForestFeatures = (tile: HexTile, neighbors: HexTile[]): void => {
  if (tile.biome !== 'forest') return;
  
  // Dense forest core
  if (tile.distanceToEdge >= 3) {
    tile.vegetationLevel = 3;
  }
  
  // Forest clearing (surrounded by forest but different biome)
  if (tile.biome === 'grass' && neighbors.every(n => n.biome === 'forest')) {
    tile.vegetationLevel = 0; // Clearing
  }
  
  // Forest edge
  if (tile.distanceToEdge <= 1) {
    tile.vegetationLevel = 1;
  }
};
```

### Performance Optimization
```typescript
// Cache neighbor calculations
const neighborCache = new Map<string, HexTile[]>();

// Batch process by biome type
const processByBiome = (tiles: HexTile[][], biome: BiomeType): void => {
  const biomeTiles = tiles.flat().filter(t => t.biome === biome);
  biomeTiles.forEach(tile => processSpecificBiome(tile));
};
```

---

## 📝 Related Issues

- [ ] #XXX: Implement PIXI.js blur filters for terrain rendering
- [ ] #XXX: Add terrain assets (PNG sprites) for organic rendering
- [ ] #XXX: Integrate with existing game state management

---

## 🎯 Definition of Done

- [ ] Terrain generation produces natural, coherent formations
- [ ] All tiles have appropriate contextual attributes
- [ ] System is deterministic with seed values
- [ ] Performance meets requirements (< 100ms for 20x20)
- [ ] Integration tests pass with existing systems
- [ ] Visual tests confirm natural appearance
- [ ] Code review completed
- [ ] Documentation updated

### 🎨 Rendering Integration
- [ ] Works seamlessly with `OrganicTerrainRenderer.tsx`
- [ ] Supports 3 variants per biome for visual variety
- [ ] Generates smooth transitions between biome zones
- [ ] Renders without visible hexagonal grid

### 🔧 Technical Implementation
- [ ] Implements flood-fill algorithm for group ID assignment
- [ ] Calculates distance-to-edge for all tiles correctly
- [ ] Supports all biome types (forest, water, mountain, desert, etc.)
- [ ] Includes proper TypeScript interfaces and types

### 🗺️ Required Terrain Attributes
- [ ] `groupId: number` - Unique identifier for each continuous biome zone
- [ ] `distanceToEdge: number` - Distance in tiles to edge of biome zone
- [ ] `elevation: number` - Height value for terrain elevation
- [ ] `vegetationLevel: number` - Density of vegetation (0-3)
- [ ] `riverFlowDir?: string` - Direction of river flow if present
- [ ] `naturalBarrier: boolean` - Whether tile blocks movement
- [ ] `corruption?: number` - Level of corruption/magical influence
- [ ] All attributes must be contextual, not random
- [ ] Attributes must be deterministic with same seed

### 🚀 Performance & Quality
- [ ] Memory usage stays within acceptable limits
- [ ] Hot reload works correctly during development
- [ ] Integrates with existing game state management
- [ ] Supports both frontend and backend implementation paths

### 🧪 Testing Requirements
- [ ] Unit tests for terrain generation algorithms
- [ ] Visual regression tests with Playwright
- [ ] Performance benchmarks for different map sizes
- [ ] Integration tests with existing game systems

### 📋 Documentation & Deployment
- [ ] API documentation updated (if backend implementation)
- [ ] Component documentation updated (if frontend implementation)
- [ ] Migration guide for existing games/saves
- [ ] Performance optimization guide included

---

*This spec can be implemented in either backend (Java) or frontend (TypeScript) - the logic is framework-agnostic and focuses on spatial algorithms rather than rendering.* 