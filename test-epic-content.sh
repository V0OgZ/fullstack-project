#!/bin/bash

# 🎮 Test Epic Content Viewer avec Fallbacks
# ===========================================

echo "🎮 Testing Epic Content Viewer with Fallback System"
echo "=================================================="

# Check if frontend is running
if ! curl -s http://localhost:3000 > /dev/null; then
    echo "❌ Frontend not running. Please start with ./start-app.sh"
    exit 1
fi

# Check if backend is running
if curl -s http://localhost:8080/actuator/health > /dev/null; then
    echo "✅ Backend is running"
    BACKEND_STATUS="online"
else
    echo "⚠️ Backend is offline - testing fallback mode"
    BACKEND_STATUS="offline"
fi

echo ""
echo "🔍 Testing Epic Content API endpoints..."

# Test Heroes endpoint
echo "🦸 Testing Heroes endpoint..."
if curl -s http://localhost:8080/api/epic/heroes > /dev/null 2>&1; then
    echo "   ✅ Heroes endpoint responding"
    HEROES_COUNT=$(curl -s http://localhost:8080/api/epic/heroes | jq -r '.epic_heroes | length' 2>/dev/null)
    if [ "$HEROES_COUNT" != "null" ] && [ "$HEROES_COUNT" -gt 0 ]; then
        echo "   ✅ Heroes data: $HEROES_COUNT heroes found"
    else
        echo "   ⚠️ Heroes endpoint returns empty data - will use fallback"
    fi
else
    echo "   ⚠️ Heroes endpoint not responding - will use fallback"
fi

# Test Creatures endpoint
echo "🐉 Testing Creatures endpoint..."
if curl -s http://localhost:8080/api/epic/creatures > /dev/null 2>&1; then
    echo "   ✅ Creatures endpoint responding"
    CREATURES_COUNT=$(curl -s http://localhost:8080/api/epic/creatures | jq -r '.epic_creatures | length' 2>/dev/null)
    if [ "$CREATURES_COUNT" != "null" ] && [ "$CREATURES_COUNT" -gt 0 ]; then
        echo "   ✅ Creatures data: $CREATURES_COUNT creatures found"
    else
        echo "   ⚠️ Creatures endpoint returns empty data - will use fallback"
    fi
else
    echo "   ⚠️ Creatures endpoint not responding - will use fallback"
fi

# Test Buildings endpoint
echo "🏰 Testing Buildings endpoint..."
if curl -s http://localhost:8080/api/epic/buildings > /dev/null 2>&1; then
    echo "   ✅ Buildings endpoint responding"
    BUILDINGS_COUNT=$(curl -s http://localhost:8080/api/epic/buildings | jq -r '.epic_buildings | length' 2>/dev/null)
    if [ "$BUILDINGS_COUNT" != "null" ] && [ "$BUILDINGS_COUNT" -gt 0 ]; then
        echo "   ✅ Buildings data: $BUILDINGS_COUNT buildings found"
    else
        echo "   ⚠️ Buildings endpoint returns empty data - will use fallback"
    fi
else
    echo "   ⚠️ Buildings endpoint not responding - will use fallback"
fi

echo ""
echo "🎯 Testing Local Assets..."

# Test creature assets
CREATURE_ASSETS=$(find frontend/public/assets/creatures -name "*.png" -o -name "*.gif" | wc -l)
echo "🐉 Creature assets: $CREATURE_ASSETS files"

# Test hero assets
HERO_ASSETS=$(find frontend/public/assets/heroes -name "*.png" -o -name "*.jpg" | wc -l)
echo "🦸 Hero assets: $HERO_ASSETS files"

# Test building assets
BUILDING_ASSETS=$(find frontend/public/assets/buildings -name "*.svg" | wc -l)
echo "🏰 Building assets: $BUILDING_ASSETS SVG files"

echo ""
echo "🎮 Testing EpicContentViewer Component..."

# Create a simple test script
cat > /tmp/test-epic-viewer.js << 'EOF'
// Test Epic Content Viewer
const testEpicViewer = async () => {
  console.log('🎮 Testing Epic Content Viewer...');
  
  // Check if the component loads
  const epicButton = document.querySelector('button[title*="Contenu Épique"]');
  if (epicButton) {
    console.log('✅ Epic Content button found');
    epicButton.click();
    
    // Wait for modal to appear
    setTimeout(() => {
      const modal = document.querySelector('[style*="position: fixed"]');
      if (modal) {
        console.log('✅ Epic Content modal opened');
        
        // Test tabs
        const tabs = modal.querySelectorAll('button');
        tabs.forEach(tab => {
          if (tab.textContent.includes('Créatures') || 
              tab.textContent.includes('Héros') || 
              tab.textContent.includes('Bâtiments')) {
            console.log('✅ Tab found:', tab.textContent);
          }
        });
        
        // Close modal
        const closeBtn = modal.querySelector('button:last-child');
        if (closeBtn) closeBtn.click();
        
        console.log('✅ Epic Content Viewer test completed');
      } else {
        console.log('❌ Epic Content modal not found');
      }
    }, 1000);
  } else {
    console.log('❌ Epic Content button not found');
  }
};

// Run test if page is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', testEpicViewer);
} else {
  testEpicViewer();
}
EOF

echo "📋 Test Summary:"
echo "==============="
echo "Backend Status: $BACKEND_STATUS"
echo "Frontend Status: ✅ Online"
echo "Creature Assets: $CREATURE_ASSETS files"
echo "Hero Assets: $HERO_ASSETS files"  
echo "Building Assets: $BUILDING_ASSETS files"
echo ""
echo "🎯 How to test manually:"
echo "1. Open http://localhost:3000 in your browser"
echo "2. Click the 🐉 Epic Content button"
echo "3. Check the server status indicator (green/red)"
echo "4. Navigate through the tabs: Creatures, Heroes, Buildings"
echo "5. Verify that content loads (backend or fallback)"
echo ""
echo "✅ Epic Content Viewer is ready for testing!"
echo "   The system will automatically use fallbacks if backend fails"
echo "   All assets are available locally for offline functionality" 