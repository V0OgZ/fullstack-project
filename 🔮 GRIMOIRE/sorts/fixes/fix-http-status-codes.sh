#!/bin/bash
# 👮 CORRECTION DES CODES HTTP - Mission Walter
# Merlin Direct - 29/07/2025

echo "👮 WALTER : 'Il y a des règles ! Les erreurs retournent 400 ou 500, pas 200 !'"
echo ""
echo "🔧 Correction du MagicFormulaServiceController..."

# Naviguer vers le controller
CONTROLLER_PATH="⏰ NEXUS-TEMPOREL/⚙️ FORGE-DES-REALITES/backend-clean/src/main/java/com/example/demo/controller/MagicFormulaServiceController.java"

# Sauvegarder l'original
cp "$CONTROLLER_PATH" "${CONTROLLER_PATH}.backup.$(date +%Y%m%d_%H%M%S)"

# Créer la nouvelle version avec les codes HTTP corrects
cat > fix_controller.tmp << 'EOF'
package com.example.demo.controller;

import com.example.demo.model.FormulaResult;
import com.example.demo.service.MagicFormulaEngine;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/magic-formulas")
@CrossOrigin(origins = "*")
public class MagicFormulaServiceController {

    @Autowired
    private MagicFormulaEngine magicFormulaEngine;

    @PostMapping("/execute")
    public ResponseEntity<Map<String, Object>> executeFormula(@RequestBody Map<String, Object> request) {
        String formula = (String) request.get("formula");
        
        // Validation de base
        if (formula == null || formula.trim().isEmpty()) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", "Formule vide ou manquante");
            errorResponse.put("normalInterpretation", "Erreur : Aucune formule fournie");
            errorResponse.put("formulaType", "ERROR");
            errorResponse.put("executionTime", System.currentTimeMillis());
            return ResponseEntity.badRequest().body(errorResponse);
        }

        try {
            // Exécuter la formule via le moteur
            FormulaResult result = magicFormulaEngine.executeFormula(formula);
            
            // Construire la réponse
            Map<String, Object> response = new HashMap<>();
            response.put("success", result.isSuccess());
            response.put("message", result.getMessage());
            response.put("normalInterpretation", result.getMessage());
            response.put("data", result.getData() != null ? result.getData() : new HashMap<>());
            response.put("formulaType", result.getFormulaType() != null ? result.getFormulaType() : "UNKNOWN");
            response.put("executionTime", System.currentTimeMillis());
            
            // Déterminer le code HTTP selon le résultat
            if (!result.isSuccess()) {
                String message = result.getMessage().toLowerCase();
                
                // 404 pour formules non trouvées
                if (message.contains("inconnue") || message.contains("non trouvée") || 
                    message.contains("unknown") || message.contains("not found")) {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
                }
                
                // 400 pour erreurs de validation
                if (message.contains("invalide") || message.contains("malformée") || 
                    message.contains("invalid") || message.contains("malformed")) {
                    return ResponseEntity.badRequest().body(response);
                }
                
                // 500 pour autres erreurs
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
            }
            
            // 200 seulement pour les succès
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            // Erreur inattendue
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", "Erreur serveur : " + e.getMessage());
            errorResponse.put("normalInterpretation", "Erreur : Exception lors de l'exécution");
            errorResponse.put("formulaType", "ERROR");
            errorResponse.put("executionTime", System.currentTimeMillis());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }
}
EOF

# Copier le nouveau controller
mv fix_controller.tmp "$CONTROLLER_PATH"

echo "✅ Controller corrigé avec les codes HTTP appropriés !"
echo ""
echo "📋 Codes HTTP implémentés :"
echo "  - 200 : Succès uniquement"
echo "  - 400 : Erreurs de validation (formule vide, invalide)"
echo "  - 404 : Formule non trouvée"
echo "  - 500 : Erreurs serveur"
echo ""
echo "🔄 Recompilation nécessaire..."

# Compiler
cd "⏰ NEXUS-TEMPOREL/⚙️ FORGE-DES-REALITES/backend-clean"
mvn compile

if [ $? -eq 0 ]; then
    echo "✅ Compilation réussie !"
    echo ""
    echo "⚠️  ATTENTION : Redémarrage du backend nécessaire pour appliquer les changements"
    echo ""
    echo "👮 WALTER : 'Voilà ! Maintenant les codes HTTP respectent les règles !'"
else
    echo "❌ Erreur de compilation"
    echo "Restauration du backup..."
    mv "${CONTROLLER_PATH}.backup."* "$CONTROLLER_PATH"
fi 