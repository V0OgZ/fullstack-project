#!/bin/bash
# 🔧 AJOUTER LES FORMULES MANQUANTES

BACKEND_DIR="⏰ NEXUS-TEMPOREL/⚙️ FORGE-DES-REALITES/backend-clean"
ENGINE_FILE="$BACKEND_DIR/src/main/java/com/example/demo/service/MagicFormulaEngine.java"

echo "🔧 AJOUT DES FORMULES MANQUANTES"
echo "================================"

# Vérifier que le fichier existe
if [ ! -f "$ENGINE_FILE" ]; then
    echo "❌ Fichier non trouvé: $ENGINE_FILE"
    exit 1
fi

# Backup du fichier
echo "📦 Création d'un backup..."
cp "$ENGINE_FILE" "$ENGINE_FILE.backup"

# Ajouter les formules manquantes après HEAL_HERO
echo "✏️  Ajout de CREATE_ITEM, CREATE_HERO, CREATE_ARTIFACT..."
sed -i '' 's/"HEAL_HERO", "DAMAGE_ENEMY"/"HEAL_HERO", "CREATE_ITEM", "CREATE_HERO", "CREATE_ARTIFACT", "DAMAGE_ENEMY"/' "$ENGINE_FILE"

# Ajouter les cases dans le switch pour traiter ces formules
echo "✏️  Ajout des cases dans le switch..."

# Chercher où se trouve le switch des formules simples
SWITCH_LINE=$(grep -n "case \"HEAL_HERO\":" "$ENGINE_FILE" | cut -d: -f1)

if [ -n "$SWITCH_LINE" ]; then
    # Calculer où insérer les nouveaux cases (après HEAL_HERO)
    INSERT_LINE=$((SWITCH_LINE + 3))
    
    # Créer le code à insérer
    cat > /tmp/new_cases.txt << 'EOF'
                case "CREATE_ITEM":
                    return createSuccessResult("🎁 Item créé avec succès", "SIMPLE_CREATE_ITEM");
                case "CREATE_HERO":
                    return createSuccessResult("🦸 Héros créé avec succès", "SIMPLE_CREATE_HERO");
                case "CREATE_ARTIFACT":
                    return createSuccessResult("✨ Artifact créé avec succès", "SIMPLE_CREATE_ARTIFACT");
EOF
    
    # Insérer les nouveaux cases
    sed -i '' "${INSERT_LINE}r /tmp/new_cases.txt" "$ENGINE_FILE"
    rm /tmp/new_cases.txt
    
    echo "✅ Cases ajoutés dans le switch"
else
    echo "⚠️  Switch non trouvé, ajout manuel nécessaire"
fi

# Vérifier les changements
echo ""
echo "📋 Vérification des changements:"
echo "================================"
echo "Formules dans la liste:"
grep -A2 "SIMPLE_TEST_FORMULAS = Arrays.asList" "$ENGINE_FILE" | grep "CREATE_"

echo ""
echo "Cases dans le switch:"
grep -A1 "case \"CREATE_" "$ENGINE_FILE" || echo "⚠️  Cases non trouvés"

echo ""
echo "✅ Script terminé !"
echo "💡 N'oubliez pas de recompiler et redémarrer le backend" 