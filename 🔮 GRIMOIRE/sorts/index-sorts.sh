#!/bin/bash
# 📚 SORT D'INDEXATION : CATALOGUE DES SORTS
# Par MERLIN - 2025-01-30 (Nuit profonde)
# Génère un index de tous les sorts disponibles

echo "╔════════════════════════════════════════════╗"
echo "║    📚 GÉNÉRATION INDEX DES SORTS 📚       ║"
echo "╚════════════════════════════════════════════╝"
echo ""

GRIMOIRE_DIR="🔮 GRIMOIRE/sorts"
OUTPUT_FILE="🔮 GRIMOIRE/INDEX_SORTS_AUTO.md"

echo "🔍 Scan du grimoire..."
echo ""

# Début du fichier index
cat << 'HEADER' > "$OUTPUT_FILE"
# 📚 INDEX AUTOMATIQUE DES SORTS

**Généré le** : $(date '+%Y-%m-%d %H:%M:%S')  
**Par** : MERLIN (Sort d'indexation automatique)  

---

## 🪄 SORTS DISPONIBLES

HEADER

# Fonction pour extraire la description d'un sort
get_description() {
    local file=$1
    # Extraire la première ligne de commentaire après le shebang
    grep -m1 "^# " "$file" | sed 's/^# //'
}

# Parcourir les catégories
echo "📂 Catégories trouvées:"
for category in $(find "$GRIMOIRE_DIR" -type d -not -path "$GRIMOIRE_DIR" | sort); do
    CATEGORY_NAME=$(basename "$category")
    echo "  • $CATEGORY_NAME"
    
    # Ajouter la catégorie à l'index
    echo "" >> "$OUTPUT_FILE"
    echo "### 🗂️ **$CATEGORY_NAME**" >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"
    
    # Lister les sorts de cette catégorie
    for sort in $(find "$category" -name "*.sh" -type f | sort); do
        SORT_NAME=$(basename "$sort" .sh)
        DESCRIPTION=$(get_description "$sort")
        
        # Vérifier si exécutable
        if [ -x "$sort" ]; then
            EXEC_STATUS="✅"
        else
            EXEC_STATUS="⚠️"
        fi
        
        # Ajouter à l'index
        echo "- **\`$SORT_NAME\`** $EXEC_STATUS" >> "$OUTPUT_FILE"
        echo "  - $DESCRIPTION" >> "$OUTPUT_FILE"
        echo "  - Path: \`$sort\`" >> "$OUTPUT_FILE"
        echo "" >> "$OUTPUT_FILE"
    done
done

# Ajouter les statistiques
echo "" >> "$OUTPUT_FILE"
echo "---" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"
echo "## 📊 STATISTIQUES" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

TOTAL_SORTS=$(find "$GRIMOIRE_DIR" -name "*.sh" -type f | wc -l)
EXECUTABLE_SORTS=$(find "$GRIMOIRE_DIR" -name "*.sh" -type f -executable | wc -l)
CATEGORIES=$(find "$GRIMOIRE_DIR" -type d -not -path "$GRIMOIRE_DIR" | wc -l)

echo "- **Total de sorts** : $TOTAL_SORTS" >> "$OUTPUT_FILE"
echo "- **Sorts exécutables** : $EXECUTABLE_SORTS ✅" >> "$OUTPUT_FILE"
echo "- **Sorts non exécutables** : $((TOTAL_SORTS - EXECUTABLE_SORTS)) ⚠️" >> "$OUTPUT_FILE"
echo "- **Catégories** : $CATEGORIES" >> "$OUTPUT_FILE"

# Ajouter la légende
echo "" >> "$OUTPUT_FILE"
echo "---" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"
echo "## 📖 LÉGENDE" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"
echo "- ✅ : Sort exécutable (chmod +x appliqué)" >> "$OUTPUT_FILE"
echo "- ⚠️ : Sort non exécutable (nécessite chmod +x)" >> "$OUTPUT_FILE"

# Footer
echo "" >> "$OUTPUT_FILE"
echo "---" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"
echo "*Index généré automatiquement par le sort d'indexation*" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"
echo "**Pour régénérer :** \`./sorts/index-sorts.sh\`" >> "$OUTPUT_FILE"

# Afficher le résumé
echo ""
echo "╔════════════════════════════════════════════╗"
echo "║         ✨ INDEX GÉNÉRÉ ✨               ║"
echo "╠════════════════════════════════════════════╣"
echo "║ Fichier: $OUTPUT_FILE                      ║"
echo "║ Sorts trouvés: $TOTAL_SORTS               ║"
echo "║ Catégories: $CATEGORIES                   ║"
echo "╚════════════════════════════════════════════╝"

echo ""
echo "💡 ASTUCE: Ajoute ce sort au cron pour mise à jour automatique!"
echo "   0 6 * * * cd /path/to/project && ./🔮\\ GRIMOIRE/sorts/index-sorts.sh"

echo ""
echo "🌙 Index créé par MERLIN dans le silence de la nuit"

exit 0 