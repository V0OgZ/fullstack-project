#!/bin/bash

# 🔄 Force Terrain Sprite Cache Refresh
# ================================================================
# Force le rechargement des sprites de terrain en cas de cache bloqué

echo "🔄 Forcing terrain sprite cache refresh..."
echo "========================================"

# Kill any existing frontend process
echo "🛑 Stopping frontend..."
pkill -f "react-scripts" || true

# Clear browser cache data
echo "🧹 Clearing browser cache..."
rm -rf node_modules/.cache 2>/dev/null || true

# Force recompile
echo "🔧 Forcing recompile..."
cd frontend
npm run build 2>/dev/null || true

# Restart with cache clearing
echo "🚀 Restarting with fresh cache..."
cd ..
GENERATE_SOURCEMAP=false npm start --prefix frontend &

echo "✅ Cache refresh complete!"
echo "🌐 Open: http://localhost:3000/game/temporal-rift"
echo "💡 Try Ctrl+F5 or Cmd+Shift+R to force browser refresh" 