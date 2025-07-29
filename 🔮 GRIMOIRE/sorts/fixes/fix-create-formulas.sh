#!/bin/bash
# 🔧 CORRIGER LES FORMULES CREATE_*

BACKEND_DIR="⏰ NEXUS-TEMPOREL/⚙️ FORGE-DES-REALITES/backend-clean"
ENGINE_FILE="$BACKEND_DIR/src/main/java/com/example/demo/service/MagicFormulaEngine.java"

echo "🔧 CORRECTION DES FORMULES CREATE_*"
echo "==================================="

# Chercher la ligne où insérer après HEAL_HERO
LINE=$(grep -n "case \"HEAL_HERO\":" "$ENGINE_FILE" | cut -d: -f1)
INSERT_LINE=$((LINE + 3))

# Créer le code correct
cat > /tmp/create_cases.txt << 'EOF'
            case "CREATE_ITEM":
                return FormulaResult.success("🎁 Item créé avec succès", 
                    Map.of("itemId", "item_" + System.currentTimeMillis()), "SIMPLE_CREATE_ITEM");
                    
            case "CREATE_HERO":
                return FormulaResult.success("🦸 Héros créé avec succès", 
                    Map.of("heroId", "hero_" + System.currentTimeMillis()), "SIMPLE_CREATE_HERO");
                    
            case "CREATE_ARTIFACT":
                return FormulaResult.success("✨ Artifact créé avec succès", 
                    Map.of("artifactId", "artifact_" + System.currentTimeMillis()), "SIMPLE_CREATE_ARTIFACT");
EOF

# Insérer le code
sed -i '' "${INSERT_LINE}r /tmp/create_cases.txt" "$ENGINE_FILE"

# Nettoyer
rm /tmp/create_cases.txt

echo "✅ Formules CREATE_* corrigées !" 