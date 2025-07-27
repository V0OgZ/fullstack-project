#!/bin/bash

# 🎳 AUDIT 96 FORMULES WALTER - URGENCE BACKEND
# Vérification formules magiques + API + Backend

echo "🎳 WALTER: AUDIT 96 FORMULES MAGIQUES - URGENCE !"
echo "================================================"

# Test Backend API
echo "🔍 Test Backend API..."
curl -s http://localhost:8080/api/formulas/count || echo "❌ Backend non disponible"

# Test MagicFormulaEngine
echo "🔍 Test MagicFormulaEngine Java..."
if [ -f "🖥️ backend/src/main/java/com/example/demo/service/MagicFormulaEngine.java" ]; then
    echo "✅ MagicFormulaEngine trouvé"
    grep -c "tier" 🖥️ backend/src/main/java/com/example/demo/service/MagicFormulaEngine.java
else
    echo "❌ MagicFormulaEngine MANQUANT !"
fi

# Test formules dans game_assets
echo "🔍 Audit formules game_assets..."
find 🎮 game_assets/ -name "*.json" -exec grep -l "formula\|tier\|magic" {} \; | wc -l

echo "🎳 WALTER: AUDIT TERMINÉ - Quelque chose arrive bientôt !" 