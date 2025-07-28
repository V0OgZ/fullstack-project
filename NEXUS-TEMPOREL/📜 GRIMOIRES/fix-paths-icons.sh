#!/bin/bash

echo "🔧 CORRECTION AUTOMATIQUE CHEMINS ICÔNES"
echo "========================================"

# Fonction de correction dans un fichier
fix_paths_in_file() {
    local file="$1"
    if [ -f "$file" ]; then
        echo "  📝 Correction: $file"
        # Remplacer les anciens chemins par les nouveaux avec icônes
        sed -i.backup \
            -e 's|🖥️ 🖥️ backend/|🖥️ 🖥️ 🖥️ backend/|g' \
            -e 's|🌐 🌐 frontend/|🌐 🌐 🌐 frontend/|g' \
            -e 's|⚙️ ⚙️ scripts/|⚙️ ⚙️ ⚙️ scripts/|g' \
            -e 's|🎮 🎮 game_assets/|🎮 🎮 🎮 game_assets/|g' \
            -e 's|📖 📖 docs/|📖 📖 📖 docs/|g' \
            -e 's|💾 💾 data/|💾 💾 💾 data/|g' \
            -e 's|🧪 🧪 tests/|🧪 🧪 🧪 tests/|g' \
            -e 's|🚬 🚬 JEAN/|🚬 🚬 🚬 JEAN/|g' \
            -e 's|👁️ 👁️ GRUT/|👁️ 👁️ 👁️ GRUT/|g' \
            -e 's|📚 📚 MEMENTO/|📚 📚 📚 MEMENTO/|g' \
            -e 's|📜 📜 OPUS/|📜 📜 📜 OPUS/|g' \
            -e 's|🔒 🔒 WALTER_SEC/|🔒 🔒 🔒 WALTER_SEC/|g' \
            -e 's|🎬 🎬 Vincent/|🎬 🎬 🎬 Vincent/|g' \
            -e 's|🔫 🔫 VINCE/|🔫 🔫 🔫 VINCE/|g' \
            -e 's|🥤 🥤 DUDE/|🥤 🥤 🥤 DUDE/|g' \
            "$file"
    fi
}

echo "🎯 Phase 1: Scripts Shell (.sh)"
find . -name "*.sh" -type f | while read file; do
    fix_paths_in_file "$file"
done

echo ""
echo "🎯 Phase 2: Scripts JavaScript (.js)"
find . -name "*.js" -type f | while read file; do
    fix_paths_in_file "$file"
done

echo ""
echo "🎯 Phase 3: Configuration (.json, .md)"
find . -name "*.json" -o -name "*.md" | while read file; do
    fix_paths_in_file "$file"
done

echo ""
echo "🎯 Phase 4: Scripts Python (.py)"
find . -name "*.py" -type f | while read file; do
    fix_paths_in_file "$file"
done

echo ""
echo "✅ CORRECTION TERMINÉE !"
echo "📋 Fichiers .backup créés pour rollback si besoin"
echo ""
echo "🧪 TEST RAPIDE:"
echo "  - Vérifiez que ./hots fonctionne maintenant"
echo "  - Testez le backend avec les nouveaux chemins"
echo "" 