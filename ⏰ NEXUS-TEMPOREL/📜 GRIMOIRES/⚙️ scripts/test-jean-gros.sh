#!/bin/bash

# 🎯 TEST JEAN-GROS - LE TEST QUI BALANCE TOUT
# Version 1.0 - 20 juillet 2025
# =============================================
# "On va tout tester, tout fouiller, et faire un rapport de malade !"

echo "🎯 TEST JEAN-GROS v1.0 - LE TEST ULTIME"
echo "======================================"
echo "⚡ Ce test va TOUT lancer et faire un rapport complet"
echo ""

# Configuration
REPORT_DIR="test-reports/rapport-jean-gros-$(date +%Y%m%d_%H%M%S)"
mkdir -p "$REPORT_DIR"
REPORT_FILE="$REPORT_DIR/RAPPORT_COMPLET.md"

# Fonction pour logger
log() {
    echo "$1"
    echo "$1" >> "$REPORT_FILE"
}

# Fonction pour exécuter et logger
execute_and_log() {
    local name="$1"
    local cmd="$2"
    local output_file="$REPORT_DIR/${name}.log"
    
    log ""
    log "### 🔧 Test: $name"
    log "Commande: \`$cmd\`"
    log ""
    
    echo "🔧 Exécution: $name..."
    
    # Exécuter la commande
    if eval "$cmd" > "$output_file" 2>&1; then
        log "✅ **SUCCÈS**"
        tail -n 20 "$output_file" >> "$REPORT_FILE"
    else
        log "❌ **ÉCHEC** (code: $?)"
        tail -n 50 "$output_file" >> "$REPORT_FILE"
    fi
    
    log ""
    log "📄 Log complet: \`$output_file\`"
    log ""
}

# Début du rapport
cat > "$REPORT_FILE" << EOF
# 📊 RAPPORT JEAN-GROS - TEST COMPLET
*Généré le $(date)*

## 🎯 OBJECTIF
Tester TOUT le projet Heroes of Time et identifier les pépites/problèmes.

## 📋 TESTS EXÉCUTÉS

EOF

# ========================================
# PHASE 1 : VÉRIFICATION SERVICES
# ========================================
log "## 🚀 PHASE 1 : VÉRIFICATION DES SERVICES"

execute_and_log "status-services" "./hots status"

# ========================================
# PHASE 2 : TESTS BACKEND JAVA
# ========================================
log "## 💾 PHASE 2 : TESTS BACKEND JAVA"

execute_and_log "maven-compile" "cd backend && mvn compile -DskipTests"
execute_and_log "maven-tests" "cd backend && mvn test"

# ========================================
# PHASE 3 : TESTS SCRIPTS CRITIQUES
# ========================================
log "## 🧪 PHASE 3 : TESTS SCRIPTS CRITIQUES"

# Nouveaux tests
execute_and_log "test-causality-wall" "./⚙️ scripts/test-causality-wall.sh"
execute_and_log "test-vision-temporelle" "./⚙️ scripts/test-vision-temporelle.sh"
execute_and_log "test-quantum-maze" "./⚙️ scripts/test-quantum-maze.sh"

# Tests système
execute_and_log "test-artifacts-hybrid" "./test-artifacts-hybrid.sh"
execute_and_log "test-ui-quick" "./⚙️ scripts/actifs/test-ui-quick.sh"

# ========================================
# PHASE 4 : SCÉNARIOS HOTS
# ========================================
log "## 🎮 PHASE 4 : SCÉNARIOS HOTS"

# Lister tous les .hots
log "### 📋 Inventaire des scénarios .hots"
log "\`\`\`"
find . -name "*.hots" -type f | grep -v node_modules | sort >> "$REPORT_FILE"
log "\`\`\`"

# Tester quelques scénarios clés
if [ -f "./⚙️ scripts/test/run-all-hots-scenarios.sh" ]; then
    execute_and_log "run-all-hots" "./⚙️ scripts/test/run-all-hots-scenarios.sh"
fi

# ========================================
# PHASE 5 : ANALYSE DES FORMULES
# ========================================
log "## 📊 PHASE 5 : ANALYSE DES FORMULES JSON"

log "### 🔍 Formules trouvées dans les JSON"
log "\`\`\`"
grep -r "formula" --include="*.json" . | grep -v node_modules | head -50 >> "$REPORT_FILE"
log "\`\`\`"

# ========================================
# PHASE 6 : TESTS DE PERFORMANCE
# ========================================
log "## ⚡ PHASE 6 : TESTS DE PERFORMANCE"

if [ -f "./⚙️ scripts/stress-test-moteur.sh" ]; then
    execute_and_log "stress-test" "./⚙️ scripts/stress-test-moteur.sh"
fi

if [ -f "./⚙️ scripts/test/benchmark-native-vs-script.sh" ]; then
    execute_and_log "benchmark" "./⚙️ scripts/test/benchmark-native-vs-script.sh"
fi

# ========================================
# PHASE 7 : EXPLORATION DES PÉPITES
# ========================================
log "## 💎 PHASE 7 : EXPLORATION DES PÉPITES"

log "### 🏛️ Contenu du MUSEUM"
log "\`\`\`"
ls -la MUSEUM/scripts-collection/ >> "$REPORT_FILE" 2>&1
log "\`\`\`"

log "### 📁 Archives intéressantes"
log "\`\`\`"
ls -la archives/scripts-old/*grofi* >> "$REPORT_FILE" 2>&1
ls -la archives/scripts-old/*quantum* >> "$REPORT_FILE" 2>&1
log "\`\`\`"

# ========================================
# PHASE 8 : TEST FINAL COMPLET
# ========================================
log "## 🏆 PHASE 8 : TEST FINAL COMPLET"

if [ -f "./⚙️ scripts/test/test-complet-final.sh" ]; then
    execute_and_log "test-final-28k" "./⚙️ scripts/test/test-complet-final.sh"
else
    log "⚠️ test-complet-final.sh non trouvé"
fi

# ========================================
# RÉSUMÉ FINAL
# ========================================
log ""
log "## 📊 RÉSUMÉ FINAL"
log ""

# Compter les succès/échecs
SUCCESS_COUNT=$(grep -c "✅ **SUCCÈS**" "$REPORT_FILE")
FAIL_COUNT=$(grep -c "❌ **ÉCHEC**" "$REPORT_FILE")

log "### 📈 Statistiques"
log "- Tests réussis : $SUCCESS_COUNT"
log "- Tests échoués : $FAIL_COUNT"
log "- Taux de réussite : $(( SUCCESS_COUNT * 100 / (SUCCESS_COUNT + FAIL_COUNT) ))%"
log ""

log "### 🔍 Fichiers analysés"
log "- Scénarios .hots : $(find . -name "*.hots" | grep -v node_modules | wc -l)"
log "- Scripts .sh : $(find . -name "*.sh" | grep -v node_modules | wc -l)"
log "- Tests Java : $(find . -name "*Test.java" | wc -l)"
log "- Fichiers JSON : $(find . -name "*.json" | grep -v node_modules | wc -l)"
log ""

log "### 💡 Recommandations"
log "1. Vérifier les tests échoués dans les logs"
log "2. Explorer les pépites trouvées dans archives/"
log "3. Nettoyer les formules JSON inutiles"
log "4. Implémenter le parser GROFI"
log ""

log "### 📁 Rapport complet disponible dans :"
log "\`$REPORT_DIR/\`"
log ""
log "---"
log "*Test Jean-Gros v1.0 - Terminé le $(date)*"

# ========================================
# AFFICHAGE FINAL
# ========================================
echo ""
echo "✅ TEST JEAN-GROS TERMINÉ !"
echo ""
echo "📊 Résultats :"
echo "  - Tests réussis : $SUCCESS_COUNT"
echo "  - Tests échoués : $FAIL_COUNT"
echo ""
echo "📁 Rapport complet dans : $REPORT_DIR/"
echo "📄 Fichier principal : $REPORT_FILE"
echo ""
echo "💡 Ouvrir le rapport :"
echo "  cat $REPORT_FILE"
echo ""

# Créer un index des logs
cat > "$REPORT_DIR/INDEX.md" << EOF
# 📚 INDEX DES LOGS - TEST JEAN-GROS
*Généré le $(date)*

## 📁 Structure
\`\`\`
$(ls -la "$REPORT_DIR/" | grep -v "^total")
\`\`\`

## 🔍 Pour explorer
- Rapport principal : \`RAPPORT_COMPLET.md\`
- Logs détaillés : \`*.log\`

## 💡 Commandes utiles
\`\`\`bash
# Voir le rapport
cat RAPPORT_COMPLET.md

# Chercher les erreurs
grep -r "ERROR\|FAIL\|Exception" .

# Voir les succès
grep "✅" RAPPORT_COMPLET.md
\`\`\`
EOF

echo "🎉 Test Jean-Gros : Mission accomplie !" 