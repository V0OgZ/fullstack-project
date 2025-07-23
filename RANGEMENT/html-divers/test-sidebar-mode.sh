#!/bin/bash

# Heroes of Time - Sidebar Test Mode Script
# This script tests the enhanced sidebar in test mode

echo "🎮 Heroes of Time - Sidebar Test Mode"
echo "===================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if frontend is running
echo -e "${YELLOW}🔍 Checking if frontend is running...${NC}"
if curl -s http://localhost:3000 > /dev/null; then
    echo -e "${GREEN}✅ Frontend is running on port 3000${NC}"
else
    echo -e "${RED}❌ Frontend is not running. Please start with ./start-app.sh${NC}"
    exit 1
fi

# Check if backend is running
echo -e "${YELLOW}🔍 Checking if backend is running...${NC}"
if curl -s http://localhost:8080/actuator/health > /dev/null; then
    echo -e "${GREEN}✅ Backend is running on port 8080${NC}"
else
    echo -e "${YELLOW}⚠️ Backend is not running. Some features may not work.${NC}"
fi

# Build frontend to ensure latest changes
echo -e "${BLUE}🔨 Building frontend...${NC}"
cd frontend
if yarn build > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Frontend build successful${NC}"
else
    echo -e "${RED}❌ Frontend build failed${NC}"
    exit 1
fi

# Run sidebar test mode
echo -e "${BLUE}🧪 Running sidebar test mode...${NC}"
npx playwright test sidebar-test-mode.spec.ts --headed --browser=chromium

# Check test results
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Sidebar test mode completed successfully${NC}"
else
    echo -e "${RED}❌ Some tests failed${NC}"
fi

echo ""
echo -e "${BLUE}📊 Test Results Summary:${NC}"
echo "=========================="
echo "• Test Mode: Enable/Disable Map"
echo "• Hero Panel: Real assets loading"
echo "• Castle Panel: Tabbed interface"
echo "• Inventory Panel: Equipment slots"
echo "• Resource Display: Gold/Wood/Stone"
echo "• Responsive Design: Desktop/Tablet/Mobile"
echo ""
echo -e "${GREEN}🎮 To test manually:${NC}"
echo "1. Open http://localhost:3000"
echo "2. Click the 🧪 Test Mode button"
echo "3. Map will be disabled for better sidebar testing"
echo "4. Test all sidebar panels (⚔️ 🏰 🎒 🧪 🐉)"
echo "5. Click 'Enable Map' to restore normal mode"
echo ""
echo -e "${YELLOW}📋 Test Documentation: test-enhanced-sidebar.html${NC}"
echo -e "${YELLOW}🌐 Test Suite Index: test-index.html${NC}" 