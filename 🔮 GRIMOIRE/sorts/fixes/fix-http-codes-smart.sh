#!/bin/bash
# 🎭 CORRECTION INTELLIGENTE DES CODES HTTP
# Garde les messages poétiques mais retourne les vrais codes

echo "🎭 Architecture 'Erreurs Belles' détectée !"
echo "   - Messages poétiques : ✅ ON GARDE"
echo "   - Codes HTTP corrects : ✅ ON AJOUTE"
echo ""

CONTROLLER="⏰ NEXUS-TEMPOREL/⚙️ FORGE-DES-REALITES/backend-clean/src/main/java/com/example/demo/controller/MagicFormulaServiceController.java"

echo "💾 Sauvegarde..."
cp "$CONTROLLER" "${CONTROLLER}.backup.smart"

echo "🔧 Modification intelligente du controller..."

# On va modifier uniquement la ligne 59 pour ajouter une logique de code HTTP
# tout en gardant les beaux messages
cat > patch_smart.tmp << 'EOF'
            // Architecture "Erreurs Belles" - On garde les messages poétiques
            // mais on retourne les vrais codes HTTP pour les tests
            if (!result.isSuccess()) {
                // Walter insiste : les codes HTTP doivent être corrects !
                return ResponseEntity.status(400).body(response);
            }
            
            return ResponseEntity.ok(response);
EOF

# Remplacer la ligne 59 avec notre logique
sed -i '' '59s|.*return ResponseEntity.ok(response);|            // Smart HTTP codes while keeping beautiful messages\
            if (!result.isSuccess()) {\
                return ResponseEntity.status(400).body(response);\
            }\
            return ResponseEntity.ok(response);|' "$CONTROLLER"

echo ""
echo "✅ Modification appliquée !"
echo ""
echo "🎭 RÉSULTAT :"
echo "  - Messages poétiques : TOUJOURS LÀ ✨"
echo "  - Codes HTTP : MAINTENANT CORRECTS 👮"
echo "  - Tests : PEUVENT VÉRIFIER LA VÉRITÉ ✅"
echo ""
echo "Exemple :"
echo '  Erreur -> 400 + {"jesusMessage": "Mes enfants, une erreur cosmique..."}'
echo '  Succès -> 200 + {"jesusBlessing": "✨ Exécution bénie..."}'
echo ""
echo "🎯 Le meilleur des deux mondes !" 