#!/bin/bash

# 🎨 Quick Terrain Sprite Test - Heroes of Time
# ================================================================
# Test rapide pour vérifier si les sprites de terrain se chargent
# et remplacent les couleurs plates dans le jeu

echo "🎨 Testing Terrain Sprites for Heroes of Time..."
echo "=============================================="

# Check if terrain sprites exist
echo "🔍 Checking terrain sprite files..."
TERRAIN_DIR="frontend/public/assets/terrain"

if [ ! -d "$TERRAIN_DIR" ]; then
    echo "❌ Terrain directory not found: $TERRAIN_DIR"
    exit 1
fi

# List of expected terrain sprites
TERRAIN_SPRITES=("grass.png" "forest.png" "water.png" "mountain.png" "desert.png" "swamp.png")
FOUND_SPRITES=0

for sprite in "${TERRAIN_SPRITES[@]}"; do
    if [ -f "$TERRAIN_DIR/$sprite" ]; then
        echo "  ✅ Found: $sprite"
        FOUND_SPRITES=$((FOUND_SPRITES + 1))
    else
        echo "  ❌ Missing: $sprite"
    fi
done

echo ""
echo "📊 Sprite Status: $FOUND_SPRITES/${#TERRAIN_SPRITES[@]} sprites found"

# Check if the terrain sprite service is correctly configured
echo ""
echo "🔧 Checking terrain sprite service configuration..."
SERVICE_FILE="frontend/src/services/terrainSpriteService.ts"

if [ ! -f "$SERVICE_FILE" ]; then
    echo "❌ TerrainSpriteService not found: $SERVICE_FILE"
    exit 1
fi

# Check if service is configured for simple sprites
if grep -q "core: '/assets/terrain/grass.png'" "$SERVICE_FILE"; then
    echo "✅ TerrainSpriteService configured for simple sprites"
else
    echo "❌ TerrainSpriteService not properly configured"
fi

# Check if ModernGameRenderer is importing the service
echo ""
echo "🎮 Checking game renderer integration..."
RENDERER_FILE="frontend/src/components/ModernGameRenderer.tsx"

if [ ! -f "$RENDERER_FILE" ]; then
    echo "❌ ModernGameRenderer not found: $RENDERER_FILE"
    exit 1
fi

if grep -q "terrainSpriteService" "$RENDERER_FILE"; then
    echo "✅ ModernGameRenderer using terrainSpriteService"
else
    echo "❌ ModernGameRenderer not using terrainSpriteService"
fi

# Test sprite loading in browser
echo ""
echo "🌐 Testing sprite loading in browser..."
echo "📄 Opening test page..."

# Create a simple test HTML file
cat > "terrain-sprite-test.html" << 'EOF'
<!DOCTYPE html>
<html>
<head>
    <title>Terrain Sprite Test</title>
    <style>
        body { font-family: Arial, sans-serif; background: #1a1a2e; color: white; padding: 20px; }
        .sprite { width: 64px; height: 64px; margin: 10px; display: inline-block; border: 2px solid #D4AF37; }
        .loaded { border-color: #4CAF50; }
        .error { border-color: #F44336; }
        .result { margin: 10px 0; padding: 10px; background: rgba(255,255,255,0.1); border-radius: 4px; }
    </style>
</head>
<body>
    <h1>🎨 Terrain Sprite Loading Test</h1>
    <div id="sprites"></div>
    <div id="results"></div>
    
    <script>
        const sprites = ['grass', 'forest', 'water', 'mountain', 'desert', 'swamp'];
        let loaded = 0;
        let total = sprites.length;
        
        sprites.forEach(sprite => {
            const img = document.createElement('img');
            img.className = 'sprite';
            img.src = `frontend/public/assets/terrain/${sprite}.png`;
            img.alt = sprite;
            img.title = sprite;
            
            img.onload = function() {
                this.classList.add('loaded');
                loaded++;
                updateResults();
            };
            
            img.onerror = function() {
                this.classList.add('error');
                this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjRkY0NDQ0Ii8+Cjx0ZXh0IHg9IjMyIiB5PSIzNiIgZmlsbD0id2hpdGUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMiIgdGV4dC1hbmNob3I9Im1pZGRsZSI+RVJSPzwvdGV4dD4KPC9zdmc+';
                updateResults();
            };
            
            document.getElementById('sprites').appendChild(img);
        });
        
        function updateResults() {
            const results = document.getElementById('results');
            const success = Math.round((loaded / total) * 100);
            results.innerHTML = `
                <div class="result">
                    <strong>Results:</strong> ${loaded}/${total} sprites loaded (${success}%)
                    ${success === 100 ? '<br>✅ All sprites working!' : '<br>❌ Some sprites failed to load'}
                </div>
            `;
        }
    </script>
</body>
</html>
EOF

echo "✅ Test page created: terrain-sprite-test.html"

# Try to open the test page
if command -v open &> /dev/null; then
    open "terrain-sprite-test.html"
    echo "🌐 Test page opened in browser"
elif command -v xdg-open &> /dev/null; then
    xdg-open "terrain-sprite-test.html"
    echo "🌐 Test page opened in browser"
else
    echo "📄 Please open terrain-sprite-test.html in your browser"
fi

echo ""
echo "🎯 Test Summary:"
echo "================"
echo "• Terrain sprites: $FOUND_SPRITES/${#TERRAIN_SPRITES[@]} found"
echo "• Service: $(grep -q 'core.*grass.png' "$SERVICE_FILE" && echo '✅ Configured' || echo '❌ Not configured')"
echo "• Renderer: $(grep -q 'terrainSpriteService' "$RENDERER_FILE" && echo '✅ Integrated' || echo '❌ Not integrated')"
echo "• Test page: terrain-sprite-test.html"
echo ""
echo "🚀 Next steps:"
echo "   1. Check the test page results"
echo "   2. If sprites load correctly, refresh the game"
echo "   3. You should see textured terrain instead of flat colors!"
echo ""
echo "✅ If everything works, the problem should be resolved!" 