#!/bin/bash

echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║          🔍 HEROES OF TIME - DEBUG MODE 🔍                    ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo ""
echo "🔧 Launching debug analysis in headless mode..."
echo ""

# Vérifier que les serveurs sont lancés
if ! curl -s http://localhost:3000 > /dev/null; then
    echo "❌ Frontend not running! Please run ./start-app.sh first"
    exit 1
fi

if ! curl -s http://localhost:8080/api/health > /dev/null; then
    echo "❌ Backend not running! Please run ./start-app.sh first"
    exit 1
fi

echo "✅ Servers detected, starting debug analysis..."
echo ""

# Nettoyer les anciens logs
if [ -f "debug-logs.json" ]; then
    echo "📄 Moving old logs to debug-logs.backup.json"
    mv debug-logs.json debug-logs.backup.json
fi

# Lancer le mode debug
cd frontend
node debug-mode.js

# Vérifier si des erreurs ont été trouvées
if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Debug analysis completed successfully!"
else
    echo ""
    echo "❌ Errors detected during debug analysis!"
    echo ""
    echo "📊 Quick summary from debug-logs.json:"
    if [ -f "debug-logs.json" ]; then
        # Afficher un résumé des erreurs principales
        node -e "
        const log = require('./debug-logs.json');
        if (log.renderErrors.length > 0) {
            console.log('🔴 Render errors:', log.renderErrors.length);
            log.renderErrors.slice(0, 3).forEach(e => {
                console.log('  -', e.text.substring(0, 80) + '...');
            });
        }
        if (log.errors.length > 0) {
            console.log('\\n🟠 Console errors:', log.errors.length);
            log.errors.slice(0, 3).forEach(e => {
                console.log('  -', e.text.substring(0, 80) + '...');
            });
        }
        "
    fi
fi

echo ""
echo "💾 Full debug logs saved in: frontend/debug-logs.json"
echo "" 