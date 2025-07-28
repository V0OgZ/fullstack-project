#!/bin/bash

# 📋 WALTER TODO REPORTER
# Génère des rapports quotidiens de TODOs pour Walter
# Par OPUS-MEMENTO-CLAUDIUS

set -e

# Configuration
WALTER_DIR="WALTER_SEC"
TODO_DIR="$WALTER_DIR/TODO_REPORTS"
DATE=$(date +%Y-%m-%d)
TIME=$(date +%H:%M)
REPORT_FILE="$TODO_DIR/daily_report_$DATE.md"

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}📋 WALTER TODO REPORTER - $DATE $TIME${NC}"
echo "========================================"

# Créer les dossiers si nécessaire
mkdir -p "$TODO_DIR"

# Fonction pour compter les TODOs
count_todos() {
    local pattern=$1
    local dir=${2:-.}
    grep -r "$pattern" "$dir" --include="*.md" --include="*.todo" 2>/dev/null | wc -l || echo 0
}

# Scanner les TODOs
echo -e "${YELLOW}🔍 Scanning TODOs...${NC}"

# Compter par status
TODO_COUNT=$(count_todos "Status.*:.*TODO")
IN_PROGRESS_COUNT=$(count_todos "Status.*:.*IN_PROGRESS")
BLOCKED_COUNT=$(count_todos "Status.*:.*BLOCKED")
DONE_COUNT=$(count_todos "Status.*:.*DONE")

# Compter par priorité
CRITICAL_COUNT=$(count_todos "Priorité.*:.*CRITIQUE")
HIGH_COUNT=$(count_todos "Priorité.*:.*HAUTE")
NORMAL_COUNT=$(count_todos "Priorité.*:.*NORMALE")
LOW_COUNT=$(count_todos "Priorité.*:.*BASSE")

# Générer le rapport
cat > "$REPORT_FILE" << EOF
# 📊 RAPPORT QUOTIDIEN TODOS - WALTER

**Date** : $DATE  
**Heure** : $TIME  
**Généré par** : walter-todo-reporter.sh  
**Version** : 1.0

---

## 📈 **RÉSUMÉ EXÉCUTIF**

### **Métriques Globales**
\`\`\`
Total TODOs      : $((TODO_COUNT + IN_PROGRESS_COUNT + BLOCKED_COUNT))
Complétés        : $DONE_COUNT
En cours         : $IN_PROGRESS_COUNT
Bloqués          : $BLOCKED_COUNT
Non commencés    : $TODO_COUNT

Taux completion  : $(( DONE_COUNT * 100 / (TODO_COUNT + IN_PROGRESS_COUNT + BLOCKED_COUNT + DONE_COUNT) ))%
\`\`\`

### **Distribution par Priorité**
- 🔴 CRITIQUE : $CRITICAL_COUNT
- 🟠 HAUTE : $HIGH_COUNT
- 🟡 NORMALE : $NORMAL_COUNT
- 🟢 BASSE : $LOW_COUNT

---

## 🚨 **ALERTES AUTOMATIQUES**

EOF

# Vérifier les alertes
if [ $BLOCKED_COUNT -gt 0 ]; then
    echo "### ⛔ TODOs Bloqués" >> "$REPORT_FILE"
    echo "- **$BLOCKED_COUNT** TODOs sont bloqués et nécessitent une intervention" >> "$REPORT_FILE"
    echo "" >> "$REPORT_FILE"
fi

if [ $CRITICAL_COUNT -gt 0 ]; then
    echo "### 🔴 TODOs Critiques" >> "$REPORT_FILE"
    echo "- **$CRITICAL_COUNT** TODOs critiques en attente" >> "$REPORT_FILE"
    echo "" >> "$REPORT_FILE"
fi

# Ajouter les fichiers modifiés récemment
echo "## 📝 **Activité Récente**" >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"
echo "### Fichiers TODO modifiés (dernières 24h)" >> "$REPORT_FILE"
echo "\`\`\`" >> "$REPORT_FILE"
find . -name "*.todo" -mtime -1 -type f 2>/dev/null | head -10 >> "$REPORT_FILE"
echo "\`\`\`" >> "$REPORT_FILE"

# Ajouter les nouveaux TODOs du jour
echo "" >> "$REPORT_FILE"
echo "### Nouveaux TODOs aujourd'hui" >> "$REPORT_FILE"
echo "\`\`\`" >> "$REPORT_FILE"
grep -r "Date.*:.*$DATE" . --include="*.todo" --include="*.md" 2>/dev/null | head -5 >> "$REPORT_FILE" || echo "Aucun nouveau TODO" >> "$REPORT_FILE"
echo "\`\`\`" >> "$REPORT_FILE"

# Recommandations
echo "" >> "$REPORT_FILE"
echo "## 💡 **RECOMMANDATIONS AUTOMATIQUES**" >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"

if [ $BLOCKED_COUNT -gt 2 ]; then
    echo "1. **🚨 Déblocage Urgent** : Plus de 2 TODOs bloqués, organiser une session de déblocage" >> "$REPORT_FILE"
fi

if [ $IN_PROGRESS_COUNT -gt 5 ]; then
    echo "2. **⚠️ WIP Élevé** : Trop de tâches en cours ($IN_PROGRESS_COUNT), risque de dispersion" >> "$REPORT_FILE"
fi

if [ $CRITICAL_COUNT -gt 0 ] && [ $TODO_COUNT -gt 10 ]; then
    echo "3. **🔥 Priorisation** : TODOs critiques présents avec backlog important, revoir les priorités" >> "$REPORT_FILE"
fi

# Footer
echo "" >> "$REPORT_FILE"
echo "---" >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"
echo "*Rapport généré automatiquement par walter-todo-reporter.sh*" >> "$REPORT_FILE"
echo "*Pour modifier la configuration, éditer scripts/walter-todo-reporter.sh*" >> "$REPORT_FILE"

# Afficher le résumé dans le terminal
echo -e "${GREEN}✅ Rapport généré : $REPORT_FILE${NC}"
echo ""
echo "📊 Résumé:"
echo "  - Total TODOs: $((TODO_COUNT + IN_PROGRESS_COUNT + BLOCKED_COUNT))"
echo "  - Complétés: $DONE_COUNT"
echo "  - Bloqués: $BLOCKED_COUNT"
echo ""

# Optionnel : Git commit automatique
if command -v git &> /dev/null; then
    echo -e "${YELLOW}📤 Commit Git...${NC}"
    git add "$REPORT_FILE" 2>/dev/null || true
    git commit -m "📊 Rapport TODO quotidien pour Walter - $DATE" 2>/dev/null || echo "Pas de changements à commiter"
fi

echo -e "${BLUE}✨ Reporting terminé !${NC}" 