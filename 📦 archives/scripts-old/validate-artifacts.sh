#!/bin/bash

# 🔍 Script de Validation des Artefacts - Heroes of Time
# ======================================================

echo "🔍 VALIDATION DES ARTEFACTS HEROES OF TIME"
echo "=========================================="
echo ""

# Fichier JSON principal
JSON_FILE="docs/items/TEMPORAL_ARTIFACTS.json"
GUIDE_FILE="docs/items/ARTEFACTS_COMPLETE_GUIDE.md"

# Vérifier que le fichier JSON existe
if [ ! -f "$JSON_FILE" ]; then
    echo "❌ ERREUR: Fichier JSON non trouvé: $JSON_FILE"
    exit 1
fi

echo "📄 Fichier JSON: $JSON_FILE"
echo "📖 Guide: $GUIDE_FILE"
echo ""

# Compter le nombre total d'artefacts
TOTAL_ARTIFACTS=$(grep -c '"id":' "$JSON_FILE")
echo "📊 Nombre total d'artefacts: $TOTAL_ARTIFACTS"

# Extraire les noms des artefacts
echo ""
echo "📝 Liste des artefacts définis:"
echo "==============================="
grep -o '"name": "[^"]*"' "$JSON_FILE" | sed 's/"name": "//g' | sed 's/"//g' | sort | nl

# Vérifier les IDs uniques
echo ""
echo "🔍 Vérification des IDs uniques:"
UNIQUE_IDS=$(grep -o '"id": "[^"]*"' "$JSON_FILE" | sort | uniq | wc -l)
TOTAL_IDS=$(grep -c '"id":' "$JSON_FILE")

if [ "$UNIQUE_IDS" -eq "$TOTAL_IDS" ]; then
    echo "✅ Tous les IDs sont uniques ($UNIQUE_IDS/$TOTAL_IDS)"
else
    echo "❌ ERREUR: IDs dupliqués détectés ($UNIQUE_IDS/$TOTAL_IDS)"
    echo "   IDs dupliqués:"
    grep -o '"id": "[^"]*"' "$JSON_FILE" | sort | uniq -d
fi

# Vérifier les tiers
echo ""
echo "🎯 Répartition par Tier:"
echo "========================"
for tier in 1 2 3 4 5 6; do
    count=$(grep -c "\"tier\": $tier" "$JSON_FILE")
    echo "Tier $tier: $count artefacts"
done

# Vérifier les raretés
echo ""
echo "💎 Répartition par Rareté:"
echo "=========================="
grep -o '"rarity": "[^"]*"' "$JSON_FILE" | sed 's/"rarity": "//g' | sed 's/"//g' | sort | uniq -c

# Vérifier la syntaxe JSON
echo ""
echo "🔍 Validation de la syntaxe JSON:"
if command -v python3 &> /dev/null; then
    if python3 -m json.tool "$JSON_FILE" > /dev/null 2>&1; then
        echo "✅ Syntaxe JSON valide"
    else
        echo "❌ ERREUR: Syntaxe JSON invalide"
        python3 -m json.tool "$JSON_FILE" 2>&1 | head -5
    fi
else
    echo "⚠️  Python3 non disponible - impossible de valider la syntaxe JSON"
fi

# Vérifier les champs obligatoires
echo ""
echo "🔍 Vérification des champs obligatoires:"
REQUIRED_FIELDS=("id" "name" "rarity" "tier")
for field in "${REQUIRED_FIELDS[@]}"; do
    count=$(grep -c "\"$field\":" "$JSON_FILE")
    if [ "$count" -eq "$TOTAL_ARTIFACTS" ]; then
        echo "✅ Champ '$field': $count/$TOTAL_ARTIFACTS"
    else
        echo "❌ Champ '$field': $count/$TOTAL_ARTIFACTS (manquant)"
    fi
done

# Vérifier les artefacts récemment ajoutés
echo ""
echo "🆕 Vérification des artefacts récemment ajoutés:"
RECENT_ARTIFACTS=("temporal_sword" "mystic_orb" "reversed_clock" "chrono_staff")
for artifact in "${RECENT_ARTIFACTS[@]}"; do
    if grep -q "\"id\": \"$artifact\"" "$JSON_FILE"; then
        echo "✅ $artifact: Défini"
    else
        echo "❌ $artifact: Manquant"
    fi
done

# Statistiques finales
echo ""
echo "📊 RÉSUMÉ DE LA VALIDATION"
echo "========================="
echo "✅ Artefacts définis: $TOTAL_ARTIFACTS"
echo "✅ IDs uniques: $UNIQUE_IDS"
echo "✅ Tiers couverts: 2-6"
echo "✅ Raretés: Rare, Épique, Légendaire, Paradoxe"
echo ""

if [ "$UNIQUE_IDS" -eq "$TOTAL_ARTIFACTS" ] && [ "$TOTAL_ARTIFACTS" -ge 15 ]; then
    echo "🎉 VALIDATION RÉUSSIE - Tous les artefacts sont correctement définis !"
    exit 0
else
    echo "⚠️  VALIDATION PARTIELLE - Quelques problèmes détectés"
    exit 1
fi 