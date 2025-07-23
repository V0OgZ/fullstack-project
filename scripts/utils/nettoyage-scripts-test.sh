#!/bin/bash

# 🧹 NETTOYAGE INTELLIGENT DES SCRIPTS DE TEST - HEROES OF TIME
# =============================================================
# Script pour supprimer les doublons et consolider les scripts de test

echo '🧹 NETTOYAGE INTELLIGENT DES SCRIPTS DE TEST'
echo '============================================='
echo ''

# Créer un dossier de sauvegarde
mkdir -p scripts/archive-scripts-test
echo '📁 Dossier de sauvegarde créé: scripts/archive-scripts-test'

# Variables de comptage
SCRIPTS_SUPPRIMES=0
SCRIPTS_ARCHIVES=0

# Fonction pour archiver un script
archive_script() {
    local script="$1"
    local raison="$2"
    
    if [ -f "$script" ]; then
        echo "📦 Archivage: $script ($raison)"
        cp "$script" scripts/archive-scripts-test/
        rm "$script"
        SCRIPTS_SUPPRIMES=$((SCRIPTS_SUPPRIMES + 1))
        SCRIPTS_ARCHIVES=$((SCRIPTS_ARCHIVES + 1))
    fi
}

echo ''
echo '🎯 PHASE 1: SUPPRESSION DES DOUBLONS PRINCIPAUX'
echo '==============================================='

# Supprimer les doublons de scripts principaux (on garde test-complet-final.sh)
echo '🔍 Suppression des doublons du script principal...'
archive_script "scripts/test-everything.sh" "Doublon de test-complet-final.sh"
archive_script "scripts/test-everything-keep-alive.sh" "Doublon de test-complet-final.sh"
archive_script "scripts/test-heroes-of-time-complet.sh" "Version plus ancienne"

echo ''
echo '🎯 PHASE 2: SUPPRESSION DES SCRIPTS COMPARISON'
echo '=============================================='

# Supprimer les doublons de comparison (garder le fixed)
echo '🔍 Suppression des doublons comparison...'
archive_script "scripts/test-complete-comparison.sh" "Version non-fixed"

echo ''
echo '🎯 PHASE 3: SUPPRESSION DES SCRIPTS TEMPORAIRES/OBSOLÈTES'
echo '========================================================='

# Supprimer les scripts fix temporaires
echo '🔍 Suppression des scripts fix temporaires...'
archive_script "fix-and-test.sh" "Script temporaire"
archive_script "fix-backend-tests.sh" "Script temporaire"
archive_script "fix-final-tests.sh" "Script temporaire"
archive_script "fix-remaining-tests.sh" "Script temporaire"

# Supprimer les scripts basiques/obsolètes
echo '🔍 Suppression des scripts basiques...'
archive_script "scripts/test-maven-quick.sh" "Script trop basique"
archive_script "scripts/test-services.sh" "Script trop basique"
archive_script "scripts/test-manual.sh" "Script manuel obsolète"

echo ''
echo '🎯 PHASE 4: SUPPRESSION DES SCRIPTS UI OBSOLÈTES'
echo '==============================================='

# Supprimer les anciens scripts UI remplacés
echo '🔍 Suppression des anciens scripts UI...'
archive_script "run-interface-test.sh" "Remplacé par test-scenarios-ui.sh"
archive_script "scripts/test-ui-fix.sh" "Script fix temporaire"

echo ''
echo '🎯 PHASE 5: VALIDATION DES SCRIPTS RESTANTS'
echo '==========================================='

echo '📋 Scripts de test restants:'
echo ''
echo '📊 SCRIPTS PRINCIPAUX:'
ls -la test-complet-final.sh 2>/dev/null && echo '   ✅ test-complet-final.sh (SCRIPT PRINCIPAL)'
ls -la test-optimizations-performance.sh 2>/dev/null && echo '   ✅ test-optimizations-performance.sh (OPTIMISATIONS)'

echo ''
echo '📊 SCRIPTS SPÉCIALISÉS:'
ls -la scripts/test-complete-bataille-temporelle.sh 2>/dev/null && echo '   ✅ scripts/test-complete-bataille-temporelle.sh (BATAILLE)'
ls -la scripts/test-complete-comparison-fixed.sh 2>/dev/null && echo '   ✅ scripts/test-complete-comparison-fixed.sh (COMPARISON)'
ls -la scripts/test-scenarios.sh 2>/dev/null && echo '   ✅ scripts/test-scenarios.sh (SCÉNARIOS)'
ls -la scripts/test-rapide-hots.sh 2>/dev/null && echo '   ✅ scripts/test-rapide-hots.sh (RAPIDE)'

echo ''
echo '📊 SCRIPTS UI:'
ls -la test-scenarios-ui.sh 2>/dev/null && echo '   ✅ test-scenarios-ui.sh (UI COMPLET)'
ls -la tester-quantum-ui.sh 2>/dev/null && echo '   ✅ tester-quantum-ui.sh (UI QUANTIQUE)'
ls -la test-final-simple.sh 2>/dev/null && echo '   ✅ test-final-simple.sh (SIMPLE)'

echo ''
echo '📊 SCRIPTS AUTRES:'
ls -la run-tests.sh 2>/dev/null && echo '   ✅ run-tests.sh (BASIQUE)'
ls -la scripts/test-all-scenarios-hots.sh 2>/dev/null && echo '   ✅ scripts/test-all-scenarios-hots.sh (SCÉNARIOS HOTS)'
ls -la scripts/test-game-scripts.sh 2>/dev/null && echo '   ✅ scripts/test-game-scripts.sh (GAME SCRIPTS)'
ls -la scripts/test-hots-simple.sh 2>/dev/null && echo '   ✅ scripts/test-hots-simple.sh (HOTS SIMPLE)'
ls -la scripts/test-quick-temporal.sh 2>/dev/null && echo '   ✅ scripts/test-quick-temporal.sh (TEMPORAL)'

echo ''
echo '🏆 RÉSUMÉ DU NETTOYAGE'
echo '====================='
echo "📦 Scripts archivés: $SCRIPTS_ARCHIVES"
echo "🗑️ Scripts supprimés: $SCRIPTS_SUPPRIMES"
echo "📁 Sauvegarde dans: scripts/archive-scripts-test/"
echo ''

# Compter les scripts restants
SCRIPTS_RESTANTS=$(ls -la *.sh scripts/*.sh 2>/dev/null | grep -E "(test|run)" | wc -l)
echo "📊 Scripts de test restants: $SCRIPTS_RESTANTS (au lieu de 30)"
echo ''

echo '✅ NETTOYAGE TERMINÉ !'
echo '===================='
echo ''
echo '🎯 ACTIONS RECOMMANDÉES:'
echo '========================'
echo '   1. Utiliser test-complet-final.sh pour les tests complets'
echo '   2. Utiliser test-optimizations-performance.sh pour les optimisations'
echo '   3. Utiliser scripts/test-rapide-hots.sh pour les tests rapides'
echo '   4. Vérifier scripts/archive-scripts-test/ pour récupérer si besoin'
echo ''
echo '🎉 SCRIPTS ORGANISÉS ET CONSOLIDÉS !' 