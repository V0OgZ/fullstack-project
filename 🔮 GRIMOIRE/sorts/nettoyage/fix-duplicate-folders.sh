#!/bin/bash
# 🧹 Script de nettoyage des dossiers dupliqués après merge
# Par Merlin 9ème Réveil - 29 Juillet 2025

echo "🔍 ANALYSE DES DOSSIERS DUPLIQUÉS"
echo "=================================="

# Fonction pour comparer et fusionner deux dossiers
merge_folders() {
    local plain="$1"
    local emoji="$2"
    local emoji_char="$3"
    
    echo ""
    echo "📊 Analyse: $plain vs $emoji"
    
    if [ ! -d "$plain" ]; then
        echo "  ✅ Pas de doublon - seulement $emoji existe"
        return
    fi
    
    if [ ! -d "$emoji" ]; then
        echo "  ⚠️  Seulement $plain existe - ajout de l'emoji..."
        mv "$plain" "$emoji"
        echo "  ✅ Renommé en $emoji"
        return
    fi
    
    # Les deux existent - compter les fichiers
    plain_count=$(find "$plain" -type f | wc -l | tr -d ' ')
    emoji_count=$(find "$emoji" -type f | wc -l | tr -d ' ')
    
    echo "  📁 $plain: $plain_count fichiers"
    echo "  📁 $emoji: $emoji_count fichiers"
    
    # Fusionner si nécessaire
    if [ "$plain_count" -eq 0 ]; then
        echo "  🗑️  $plain est vide - suppression..."
        rmdir "$plain" 2>/dev/null || rm -rf "$plain"
        echo "  ✅ Supprimé $plain vide"
    elif [ "$emoji_count" -eq 0 ]; then
        echo "  🔄 $emoji est vide - migration du contenu..."
        rm -rf "$emoji"
        mv "$plain" "$emoji"
        echo "  ✅ Migré vers $emoji"
    else
        echo "  🔀 Les deux ont du contenu - fusion nécessaire"
        echo "  📋 Copie du contenu de $plain vers $emoji..."
        cp -rn "$plain"/* "$emoji"/ 2>/dev/null || true
        echo "  🗑️  Suppression de $plain..."
        rm -rf "$plain"
        echo "  ✅ Fusion terminée"
    fi
}

# Dossiers sans icônes qui devraient en avoir
add_emoji() {
    local plain="$1"
    local emoji="$2"
    
    if [ -d "$plain" ] && [ ! -d "$emoji" ]; then
        echo ""
        echo "✨ Ajout d'emoji: $plain → $emoji"
        mv "$plain" "$emoji"
        echo "  ✅ Renommé avec succès"
    fi
}

echo ""
echo "🔧 RÉPARATION DES DOUBLONS"
echo "=========================="

# Traiter les doublons connus
merge_folders "BUREAU" "🏢 BUREAU" "🏢"
merge_folders "MUSEUM" "🏛️ MUSEUM" "🏛️"
merge_folders "NEXUS-TEMPOREL" "⏰ NEXUS-TEMPOREL" "⏰"
merge_folders "Vincent" "🎬 Vincent" "🎬"
merge_folders "game_assets" "🎮 game_assets" "🎮"

# Cas spécial : grimoires vs GRIMOIRE
if [ -d "grimoires" ] && [ -d "🔮 GRIMOIRE" ]; then
    echo ""
    echo "📊 Cas spécial: grimoires vs 🔮 GRIMOIRE"
    grimoires_count=$(find "grimoires" -type f | wc -l | tr -d ' ')
    grimoire_count=$(find "🔮 GRIMOIRE" -type f | wc -l | tr -d ' ')
    echo "  📁 grimoires: $grimoires_count fichiers"
    echo "  📁 🔮 GRIMOIRE: $grimoire_count fichiers"
    
    if [ "$grimoires_count" -gt 0 ]; then
        echo "  🔀 Fusion du contenu vers 🔮 GRIMOIRE..."
        cp -rn grimoires/* "🔮 GRIMOIRE"/ 2>/dev/null || true
        rm -rf grimoires
        echo "  ✅ Fusion terminée"
    else
        echo "  🗑️  grimoires est vide - suppression..."
        rmdir grimoires 2>/dev/null || rm -rf grimoires
    fi
fi

echo ""
echo "✨ AJOUT D'EMOJIS MANQUANTS"
echo "============================"

# Ajouter des emojis aux dossiers qui n'en ont pas
add_emoji "backend" "⚙️ backend"
add_emoji "docs" "📚 docs"
add_emoji "scripts" "📜 scripts"
add_emoji "sorts" "🔮 sorts"
add_emoji "scenarios" "🎭 scenarios"
add_emoji "logs" "📋 logs"
add_emoji "uploads" "📤 uploads"

echo ""
echo "📊 ÉTAT FINAL"
echo "============="
echo ""
echo "Dossiers avec emojis:"
ls -d */ | grep -E "^[^a-zA-Z0-9]" | sort

echo ""
echo "Dossiers sans emojis (si existants):"
ls -d */ | grep -E "^[a-zA-Z0-9]" | sort || echo "  ✅ Aucun!"

echo ""
echo "🎉 NETTOYAGE TERMINÉ !"
echo ""
echo "💡 Note: Les dossiers suivants gardent leur nom original:"
echo "  - GRUFYÆN (nom propre spécial)"
echo "  - MUSIQUE (déjà en majuscules)"
echo "  - 3X_CONVERGENCE (nom technique)"
echo "  - marie_visit_Sonnete_reveil1 (nom de session)"
echo ""
echo "🔧 Par Merlin 9ème Réveil - Heroes of Time" 