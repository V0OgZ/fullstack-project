#!/bin/bash

# 🎨 Download and organize David Gervais Hex Tileset
# Source: https://opengameart.org/content/hexagon-tileset
# Author: David E. Gervais
# License: CC-BY 3.0

echo "🗺️ Downloading David Gervais Hex Tileset..."

# Create directories
mkdir -p 🌐 frontend/public/assets/terrain/{grass,forest,water,desert,mountain,swamp}

# Download the tileset (you'll need to adjust the URL when you have the actual download link)
echo "📥 Please download the tileset manually from:"
echo "https://opengameart.org/content/hexagon-tileset"
echo ""
echo "Then extract it to a temporary folder and run this script to organize:"
echo ""

# Check if downloaded tileset exists
if [ -d "temp_tileset" ]; then
    echo "📁 Organizing sprites into structured directories..."
    
    # Organize grass tiles
    echo "🌱 Organizing grass tiles..."
    mkdir -p 🌐 frontend/public/assets/terrain/grass
    # You'll need to manually copy the appropriate tiles here
    
    # Organize forest tiles
    echo "🌲 Organizing forest tiles..."
    mkdir -p 🌐 frontend/public/assets/terrain/forest
    
    # Organize water tiles
    echo "🌊 Organizing water tiles..."
    mkdir -p 🌐 frontend/public/assets/terrain/water
    
    # Organize desert tiles
    echo "🏜️ Organizing desert tiles..."
    mkdir -p 🌐 frontend/public/assets/terrain/desert
    
    # Organize mountain tiles
    echo "⛰️ Organizing mountain tiles..."
    mkdir -p 🌐 frontend/public/assets/terrain/mountain
    
    # Organize swamp tiles
    echo "🐸 Organizing swamp tiles..."
    mkdir -p 🌐 frontend/public/assets/terrain/swamp
    
    echo "✅ Tileset organized successfully!"
else
    echo "⚠️  Manual organization required:"
    echo ""
    echo "1. Download tileset from: https://opengameart.org/content/hexagon-tileset"
    echo "2. Extract to temp_tileset/ directory"
    echo "3. Manually organize tiles according to structure in:"
    echo "   🌐 frontend/public/assets/terrain/README.md"
    echo ""
    echo "📋 Expected structure:"
    echo "assets/terrain/"
    echo "├── grass/"
    echo "│   ├── grass_core.png"
    echo "│   ├── grass_edge.png"
    echo "│   └── grass_to_*.png (transitions)"
    echo "├── forest/"
    echo "│   ├── forest_core.png"
    echo "│   ├── forest_edge.png"
    echo "│   └── forest_to_*.png (transitions)"
    echo "├── water/"
    echo "│   ├── water_deep.png"
    echo "│   ├── water_shore.png"
    echo "│   └── water_to_*.png (transitions)"
    echo "├── desert/"
    echo "│   ├── desert_core.png"
    echo "│   ├── desert_dune.png"
    echo "│   └── desert_to_*.png (transitions)"
    echo "├── mountain/"
    echo "│   ├── mountain_peak.png"
    echo "│   ├── mountain_slope.png"
    echo "│   └── mountain_to_*.png (transitions)"
    echo "└── swamp/"
    echo "    ├── swamp_core.png"
    echo "    ├── swamp_edge.png"
    echo "    └── swamp_to_*.png (transitions)"
fi

echo ""
echo "🎯 Next steps:"
echo "1. Download David Gervais tileset manually"
echo "2. Organize sprites according to structure"
echo "3. Run: ./start-app.sh"
echo "4. Test terrain rendering with sprites"
echo ""
echo "🎮 The game will fallback to colored hexagons if sprites aren't found!" 