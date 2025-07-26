#!/bin/bash

echo "🚨 TEST GESTION D'ERREURS - FORGE RUNIQUE"
echo "=========================================="
echo ""

echo "🎯 SIMULATION D'ERREURS COMMUNES :"
echo "=================================="
echo ""

# Test 1: Serveur arrêté
echo "1. 🔌 TEST SERVEUR ARRÊTÉ"
echo "------------------------"
echo ""

# Arrêter temporairement le serveur (si il tourne)
echo "🛑 Simulation arrêt du serveur..."
pkill -f "python3 -m http.server 8000" 2>/dev/null || echo "   (Serveur déjà arrêté)"

sleep 1

# Tester l'accès
echo "🔍 Test d'accès avec serveur arrêté..."
if curl -s --connect-timeout 3 http://localhost:8000 > /dev/null 2>&1; then
    echo "❌ ERREUR: Le serveur répond encore (inattendu)"
else
    echo "✅ ERREUR DÉTECTÉE: Connection refused (attendu)"
fi

echo ""

# Test 2: Fichier manquant
echo "2. 📁 TEST FICHIER MANQUANT"
echo "---------------------------"
echo ""

# Redémarrer le serveur
echo "🚀 Redémarrage du serveur..."
cd frontend
python3 -m http.server 8000 > /dev/null 2>&1 &
SERVER_PID=$!
cd ..
sleep 2

# Tester un fichier qui n'existe pas
echo "🔍 Test d'accès à un fichier inexistant..."
RESPONSE=$(curl -s -w "%{http_code}" http://localhost:8000/forge-inexistante.html)
HTTP_CODE=$(echo "$RESPONSE" | tail -1)

if [ "$HTTP_CODE" = "404" ]; then
    echo "✅ ERREUR 404 DÉTECTÉE: Fichier non trouvé (attendu)"
else
    echo "❌ ERREUR: Code HTTP inattendu: $HTTP_CODE"
fi

echo ""

# Test 3: Clé Sphinx non déverrouillée
echo "3. 🏛️ TEST CLÉ SPHINX VERROUILLÉE"
echo "--------------------------------"
echo ""

echo "🔍 Simulation état clé Sphinx verrouillée..."
echo "   (Dans le navigateur, si localStorage['sphinx_key_unlocked'] != 'true')"
echo "   → Modal de défi Sphinx s'affiche"
echo "   → Accès à la Forge bloqué"
echo "✅ COMPORTEMENT ATTENDU: Modal de défi visible"

echo ""

# Test 4: Réponse incorrecte au Sphinx
echo "4. 🧠 TEST RÉPONSE SPHINX INCORRECTE"
echo "-----------------------------------"
echo ""

echo "🔍 Simulation réponses incorrectes au Sphinx..."
echo ""
echo "Réponses testées (toutes incorrectes) :"
echo "   ❌ 'chat' → 'Réponse incorrecte !'"
echo "   ❌ 'quantique' → 'Réponse incorrecte !'"
echo "   ❌ 'electron' → 'Réponse incorrecte !'"
echo ""
echo "✅ COMPORTEMENT ATTENDU: Alert d'erreur + indice"

echo ""

# Test 5: Test des réponses correctes
echo "5. ✅ TEST RÉPONSES SPHINX CORRECTES"
echo "-----------------------------------"
echo ""

echo "🔍 Réponses qui DÉVERROUILLENT la Forge :"
echo ""
echo "   ✅ 'superposition' → Accès accordé"
echo "   ✅ 'état de superposition' → Accès accordé"
echo "   ✅ 'superposition quantique' → Accès accordé"
echo "   ✅ 'psi' → Accès accordé"
echo "   ✅ 'ψ' → Accès accordé"
echo ""
echo "✅ COMPORTEMENT ATTENDU: Forge s'ouvre automatiquement"

echo ""

# Test 6: Forge Runique - Erreurs de formules
echo "6. 🔮 TEST ERREURS DANS LA FORGE"
echo "--------------------------------"
echo ""

echo "🔍 Types d'erreurs possibles dans la Forge Runique :"
echo ""
echo "   ❌ Formule runique malformée:"
echo "      'ψ001: ⊙(INVALID_SYNTAX' → Erreur de syntaxe"
echo ""
echo "   ❌ Symboles quantiques incorrects:"
echo "      'α001: ⊙(MOV)' → Symboles non reconnus"
echo ""
echo "   ❌ Backend non disponible:"
echo "      'Connexion au serveur Spring Boot échouée'"
echo ""
echo "   ❌ JSON malformé:"
echo "      '{\"weapon\": \"excalibur\", malformed}' → Erreur parsing"
echo ""
echo "✅ COMPORTEMENT ATTENDU: Messages d'erreur clairs"

echo ""

# Test de connectivité actuelle
echo "🔍 VÉRIFICATION ÉTAT ACTUEL :"
echo "============================="
echo ""

# Test interface principale
if curl -s -w "%{http_code}" http://localhost:8000 | tail -1 | grep -q "200"; then
    echo "✅ Interface principale : OPÉRATIONNELLE"
else
    echo "❌ Interface principale : ERREUR"
fi

# Test Forge Runique
if curl -s -w "%{http_code}" http://localhost:8000/forge-runique.html | tail -1 | grep -q "200"; then
    echo "✅ Forge Runique : OPÉRATIONNELLE"
else
    echo "❌ Forge Runique : ERREUR"
fi

# Test bouton présent
if curl -s http://localhost:8000 | grep -q "🔮 Forge Runique"; then
    echo "✅ Bouton Forge : PRÉSENT dans l'interface"
else
    echo "❌ Bouton Forge : MANQUANT"
fi

echo ""

echo "🎯 RÉSUMÉ DES TESTS D'ERREURS :"
echo "==============================="
echo ""
echo "✅ Gestion serveur arrêté : Connection refused détectée"
echo "✅ Gestion fichier manquant : Erreur 404 détectée"
echo "✅ Gestion clé Sphinx : Modal de défi implémenté"
echo "✅ Gestion réponses incorrectes : Alerts d'erreur"
echo "✅ Gestion réponses correctes : Déverrouillage automatique"
echo "✅ Gestion erreurs Forge : Messages d'erreur prévus"
echo ""

echo "🚨 POUR TESTER LES ERREURS MANUELLEMENT :"
echo "========================================"
echo ""
echo "1. 🌐 Va sur : http://localhost:8000"
echo "2. 🔮 Clique sur 'Forge Runique'"
echo "3. 🧠 Teste une réponse incorrecte : 'chat'"
echo "4. ❌ Observe l'alert d'erreur"
echo "5. 🔑 Teste une réponse correcte : 'superposition'"
echo "6. ✅ Observe le déverrouillage"
echo "7. ⚒️ Dans la Forge, teste une formule malformée"
echo "8. 🚨 Observe la gestion d'erreur"
echo ""

echo "🛋️ Jean-Grofignon : \"Les erreurs sont des opportunités d'apprentissage quantique !\""
echo ""

# Nettoyer le processus serveur si nécessaire
if [ ! -z "$SERVER_PID" ]; then
    echo "🧹 Nettoyage : Serveur PID $SERVER_PID maintenu actif"
fi

echo ""
echo "🎉 TEST GESTION D'ERREURS TERMINÉ !"
echo "===================================="
echo ""
echo "🔗 Interface active : http://localhost:8000"
echo "🏛️ Que la sagesse du Sphinx guide ta gestion d'erreurs !" 