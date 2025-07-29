#!/bin/bash
# 🐙 Ajouter les formules d'invocation des amis

echo "🧙‍♂️ Le Magicien implémente sa décision..."

ENGINE="⏰ NEXUS-TEMPOREL/⚙️ FORGE-DES-REALITES/backend-clean/src/main/java/com/example/demo/service/MagicFormulaEngine.java"

# Ajouter les formules à la liste
echo "📝 Ajout des formules INVOKE_DUDE, INVOKE_WALTER, INVOKE_VINCE..."

# Cette commande ajoute les formules après CREATE_ARTIFACT dans la liste
sed -i '' '/CREATE_ARTIFACT/s/$/", "INVOKE_DUDE", "INVOKE_WALTER", "INVOKE_VINCE/' "$ENGINE"

echo "✅ Formules ajoutées à SIMPLE_TEST_FORMULAS"
echo ""
echo "🔮 Le Cristal d'Écho Temporel confirme : C'est fait !"
echo ""
echo "Prochaine étape : Ajouter les case statements pour chaque invocation" 