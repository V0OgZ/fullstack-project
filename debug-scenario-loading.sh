#!/bin/bash

# Heroes of Time - Persistent Scenario Loading Debug Script
echo "🐛 Debugging Scenario Loading Issues..."

# Function to test backend
test_backend() {
    echo "🔧 Testing Backend..."
    
    # Check if backend is running
    if ! curl -s http://localhost:8080/api/scenarios/all > /dev/null; then
        echo "❌ Backend not running on port 8080"
        echo "💡 Run: ./start-app.sh"
        return 1
    fi
    
    # Test scenarios endpoint
    echo "📊 Backend scenarios:"
    curl -s http://localhost:8080/api/scenarios/all | jq '.[].name' 2>/dev/null || curl -s http://localhost:8080/api/scenarios/all | head -20
    
    echo "✅ Backend is working"
    return 0
}

# Function to test frontend
test_frontend() {
    echo "🎨 Testing Frontend..."
    
    # Check if frontend is running
    if ! curl -s http://localhost:3000 > /dev/null; then
        echo "❌ Frontend not running on port 3000"
        echo "💡 Run: ./start-app.sh"
        return 1
    fi
    
    echo "✅ Frontend is running"
    return 0
}

# Function to check browser console
check_browser_console() {
    echo "🌐 Browser Console Check:"
    echo "1. Open http://localhost:3000 in browser"
    echo "2. Press F12 to open DevTools"
    echo "3. Check Console tab for errors"
    echo "4. Check Network tab for failed requests"
    echo "5. Look for 'ScenarioSelector' component loading"
}

# Function to check component usage
check_component_usage() {
    echo "📦 Checking Component Usage..."
    
    # Check if App.tsx uses EnhancedScenarioSelector
    if grep -q "EnhancedScenarioSelector" frontend/src/App.tsx; then
        echo "✅ App.tsx uses EnhancedScenarioSelector (correct)"
    else
        echo "❌ App.tsx doesn't use EnhancedScenarioSelector"
        echo "💡 Should import and use EnhancedScenarioSelector for beautiful UI"
    fi
    
    # Check EnhancedScenarioSelector implementation
    if grep -q "ApiService.getAllScenarios" frontend/src/components/EnhancedScenarioSelector.tsx; then
        echo "✅ EnhancedScenarioSelector calls backend API"
    else
        echo "❌ EnhancedScenarioSelector doesn't call backend API"
    fi
}

# Main debug flow
echo "🔍 Running comprehensive debug..."
echo "================================"

test_backend
BACKEND_OK=$?

test_frontend  
FRONTEND_OK=$?

check_component_usage

if [ $BACKEND_OK -eq 0 ] && [ $FRONTEND_OK -eq 0 ]; then
    echo ""
    echo "✅ Both servers are running!"
    echo "🐛 If scenarios still don't load, check:"
    check_browser_console
    echo ""
    echo "🔧 Common fixes:"
    echo "   - Clear browser cache (Ctrl+Shift+R)"
    echo "   - Check browser DevTools console for errors"
    echo "   - Verify ScenarioSelector component is being used"
    echo "   - Check API calls in Network tab"
else
    echo ""
    echo "❌ Servers not running properly"
    echo "💡 Run: ./start-app.sh to start both servers"
fi

echo ""
echo "📝 Debug complete. Check output above for issues." 