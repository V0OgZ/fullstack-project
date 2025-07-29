#!/bin/bash
# 👮 CORRECTION DES CODES HTTP - Mission Walter
# Merlin Direct - 29/07/2025

echo "👮 WALTER : 'Il y a des règles ! On ne retourne pas 200 OK pour une erreur !'"
echo ""

CONTROLLER_PATH="⏰ NEXUS-TEMPOREL/⚙️ FORGE-DES-REALITES/backend-clean/src/main/java/com/example/demo/controller/MagicFormulaServiceController.java"

# Sauvegarder l'original
echo "💾 Sauvegarde du controller original..."
cp "$CONTROLLER_PATH" "${CONTROLLER_PATH}.backup.walter.$(date +%Y%m%d_%H%M%S)"

echo "🔧 Modification du controller pour respecter les codes HTTP..."

# Utiliser sed pour modifier la logique de retour
# On va remplacer le return ResponseEntity.ok(response) par une logique conditionnelle
sed -i '' '59s|return ResponseEntity.ok(response);|// Walter: Check success status before returning\
            if (!result.isSuccess()) {\
                String message = result.getMessage().toLowerCase();\
                \
                // 404 for unknown formulas\
                if (message.contains("inconnue") || message.contains("unknown")) {\
                    return ResponseEntity.status(404).body(response);\
                }\
                \
                // 400 for validation errors\
                if (message.contains("invalide") || message.contains("invalid")) {\
                    return ResponseEntity.badRequest().body(response);\
                }\
                \
                // 500 for other errors\
                return ResponseEntity.status(500).body(response);\
            }\
            \
            // 200 only for success\
            return ResponseEntity.ok(response);|' "$CONTROLLER_PATH"

echo ""
echo "✅ Controller modifié !"
echo ""
echo "🔄 Compilation du backend..."

cd "⏰ NEXUS-TEMPOREL/⚙️ FORGE-DES-REALITES/backend-clean"
mvn compile -q

if [ $? -eq 0 ]; then
    echo "✅ Compilation réussie !"
    echo ""
    echo "📋 Codes HTTP maintenant implémentés :"
    echo "  - 200 : Succès uniquement (success = true)"
    echo "  - 400 : Erreurs de validation"
    echo "  - 404 : Formule inconnue"
    echo "  - 500 : Autres erreurs"
    echo ""
    echo "⚠️  ATTENTION : Redémarrer le backend pour appliquer les changements"
    echo ""
    
    # Tuer le processus actuel
    echo "🔄 Arrêt du backend actuel..."
    pkill -f "spring-boot:run" || echo "Aucun processus Spring Boot trouvé"
    
    sleep 2
    
    echo "🚀 Redémarrage du backend..."
    nohup mvn spring-boot:run > backend-walter-fix.log 2>&1 &
    
    echo "✅ Backend redémarré avec les codes HTTP corrects !"
    echo ""
    echo "👮 WALTER : 'Maintenant les codes HTTP suivent les règles !'"
else
    echo "❌ Erreur de compilation"
    echo "Restauration du backup..."
    mv "${CONTROLLER_PATH}.backup.walter."* "$CONTROLLER_PATH"
    echo "❌ Échec de la correction"
fi 