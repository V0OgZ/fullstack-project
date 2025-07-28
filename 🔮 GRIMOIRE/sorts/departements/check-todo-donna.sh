#!/bin/bash
# 🔮 SORT: Vérification TODO Donna
# Type: Délégation départementale
# Créé par: MEMENTO-MERLIN

echo "🪄 ═══════════════════════════════════════"
echo "🪄 INVOCATION: Check TODO Donna"
echo "🪄 ═══════════════════════════════════════"
echo ""

# Navigation vers le dossier Donna
DONNA_DIR="💼 DONNA_PAULSEN_COO"
TODO_FILE="$DONNA_DIR/TODO_MASTER_REFERENCE_DEPARTMENTS.md"

# Vérification existence
if [ -f "../$TODO_FILE" ]; then
    echo "✅ TODO Master trouvé !"
    echo ""
    echo "📊 STATISTIQUES RAPIDES:"
    echo "────────────────────────"
    
    # Extraire les stats
    grep -A 10 "STATISTIQUES TODOS" "../$TODO_FILE" | grep "|" | tail -n +3
    
    echo ""
    echo "🚨 PRIORITÉS IMMÉDIATES:"
    echo "────────────────────────"
    
    # Extraire les priorités
    grep -A 5 "PRIORITÉS IMMÉDIATES" "../$TODO_FILE" | grep -E "^[0-9]\." | head -4
    
else
    echo "❌ TODO Master non trouvé !"
    echo "🔍 Recherche dans README..."
    
    if [ -f "../$DONNA_DIR/README.md" ]; then
        grep -i "todo" "../$DONNA_DIR/README.md" | head -5
    fi
fi

echo ""
echo "🪄 ═══════════════════════════════════════"
echo "🪄 FIN DU SORT"
echo "🪄 ═══════════════════════════════════════" 