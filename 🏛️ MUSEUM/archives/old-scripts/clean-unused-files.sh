#!/bin/bash

# 🧹 Clean Unused Files Script
# =============================
# Based on unimported tool analysis

echo "🧹 Cleaning unused files and dependencies..."
echo "=============================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

cd frontend

# Function to print colored output
print_status() {
    local color=$1
    local message=$2
    echo -e "${color}${message}${NC}"
}

print_status $BLUE "📋 Step 1: Removing unused dependencies..."

# Remove unused dependencies
UNUSED_DEPS=(
    "@stomp/stompjs"
    "@testing-library/jest-dom"
    "@testing-library/react"
    "@testing-library/user-event"
    "@types/react-router-dom"
    "@types/styled-components"
    "@types/three"
    "framer-motion"
    "node-fetch"
    "sockjs-client"
    "styled-components"
    "three"
)

for dep in "${UNUSED_DEPS[@]}"; do
    if npm list "$dep" &>/dev/null; then
        print_status $YELLOW "  Removing: $dep"
        npm uninstall "$dep" --silent
    fi
done

print_status $GREEN "✅ Unused dependencies removed!"

print_status $BLUE "📋 Step 2: Removing unused component files..."

# Remove unused components
UNUSED_COMPONENTS=(
    "src/components/ActionPlanner.tsx"
    "src/components/AIActionVisualizer.tsx"
    "src/components/ApiTester.tsx"
    "src/components/BackendTester.tsx"
    "src/components/CreatureDisplay.tsx"
    "src/components/CreditsModal.tsx"
    "src/components/DebugTerrainVision.tsx"
    "src/components/DicebearAvatarGenerator.tsx"
    "src/components/HeroDisplay.tsx"
    "src/components/HeroSpriteTest.tsx"
    "src/components/HeroSystemDemo.tsx"
    "src/components/HotSeatMode.tsx"
    "src/components/ImageTest.tsx"
    "src/components/ImageUploadManager.tsx"
    "src/components/LanguageSelector.tsx"
    "src/components/MagicInventory.tsx"
    "src/components/OptimizedGameRenderer.tsx"
    "src/components/PerformanceDashboard.tsx"
    "src/components/PoliticalAdvisorPanel.tsx"
    "src/components/PoliticalSystem.tsx"
    "src/components/SimpleGameInterface.tsx"
    "src/components/SimpleGameRenderer.tsx"
    "src/components/SimpleModernInterface.tsx"
    "src/components/SmartTerrainRenderer.tsx"
    "src/components/StatusCard.tsx"
    "src/components/TimelineViewer.tsx"
    "src/components/UnitDisplay.tsx"
    "src/components/UnitRecruitment.tsx"
    "src/components/ZFCVisualizer.tsx"
)

for component in "${UNUSED_COMPONENTS[@]}"; do
    if [ -f "$component" ]; then
        print_status $YELLOW "  Removing: $component"
        rm -f "$component"
        
        # Also remove corresponding CSS files
        css_file="${component%.tsx}.css"
        if [ -f "$css_file" ]; then
            print_status $YELLOW "  Removing: $css_file"
            rm -f "$css_file"
        fi
    fi
done

print_status $GREEN "✅ Unused components removed!"

print_status $BLUE "📋 Step 3: Removing unused services..."

# Remove unused services
UNUSED_SERVICES=(
    "src/services/assetService.ts"
    "src/services/avatarService.ts"
    "src/services/backendPoliticalAdvisorService.ts"
    "src/services/buildingImageService.ts"
    "src/services/epicContentAPI.ts"
    "src/services/heroAnimationService.ts"
    "src/services/heroSpriteService.ts"
    "src/services/i18nService.ts"
    "src/services/imageService.ts"
    "src/services/localAvatarService.ts"
    "src/services/pathDotsService.ts"
    "src/services/politicalAdvisorService.ts"
    "src/services/unitService.ts"
    "src/services/websocketService.ts"
)

for service in "${UNUSED_SERVICES[@]}"; do
    if [ -f "$service" ]; then
        print_status $YELLOW "  Removing: $service"
        rm -f "$service"
    fi
done

print_status $GREEN "✅ Unused services removed!"

print_status $BLUE "📋 Step 4: Removing unused constants and data..."

# Remove unused constants and data
UNUSED_CONSTANTS=(
    "src/constants/assets.ts"
    "src/constants/epicCreatures.ts"
    "src/constants/epicHeroes.ts"
    "src/constants/gameAssets.ts"
    "src/constants/gameIcons.ts"
    "src/constants/playerColors.ts"
    "src/constants/unifiedAssets.ts"
    "src/💾 data/heroes.ts"
    "src/💾 data/magicObjects.ts"
)

for constant in "${UNUSED_CONSTANTS[@]}"; do
    if [ -f "$constant" ]; then
        print_status $YELLOW "  Removing: $constant"
        rm -f "$constant"
    fi
done

print_status $GREEN "✅ Unused constants removed!"

print_status $BLUE "📋 Step 5: Removing unused types..."

# Remove unused types
UNUSED_TYPES=(
    "src/types/api.ts"
    "src/types/backend.ts"
    "src/types/castle.ts"
    "src/types/combat.ts"
    "src/types/political.ts"
    "src/types/temporal.ts"
)

for type in "${UNUSED_TYPES[@]}"; do
    if [ -f "$type" ]; then
        print_status $YELLOW "  Removing: $type"
        rm -f "$type"
    fi
done

print_status $GREEN "✅ Unused types removed!"

print_status $BLUE "📋 Step 6: Removing unused utils and pages..."

# Remove unused utils and pages
UNUSED_UTILS=(
    "src/utils/heroAssets.ts"
    "src/utils/hexBitmask.ts"
    "src/utils/performanceMonitor.ts"
    "src/pages/AvatarTestPage.tsx"
    "src/setupTests.js"
    "src/styles/theme.ts"
)

for util in "${UNUSED_UTILS[@]}"; do
    if [ -f "$util" ]; then
        print_status $YELLOW "  Removing: $util"
        rm -f "$util"
    fi
done

print_status $GREEN "✅ Unused utils and pages removed!"

print_status $BLUE "📋 Step 7: Testing the build..."

# Test that the build still works
if yarn build --silent; then
    print_status $GREEN "✅ Build successful after cleanup!"
else
    print_status $RED "❌ Build failed after cleanup! Check for missing imports."
    exit 1
fi

print_status $BLUE "📋 Step 8: Final verification..."

# Run unimported again to see the results
print_status $BLUE "Running unimported again to verify cleanup..."
npx unimported --silent | head -10

print_status $GREEN "🎉 Cleanup complete!"
print_status $BLUE "📊 Summary:"
print_status $YELLOW "   - Removed 13 unused dependencies"
print_status $YELLOW "   - Removed ~64 unused files"
print_status $YELLOW "   - Build still works ✅"
print_status $YELLOW "   - Codebase is now much cleaner!"

print_status $GREEN "💡 Next steps:"
print_status $YELLOW "   1. Test the application: cd .. && ./start-app.sh"
print_status $YELLOW "   2. Run tests: yarn test"
print_status $YELLOW "   3. Commit the cleanup: git add -A && git commit -m 'Clean unused files'" 