#!/bin/bash

# 🚀 SORT DE DÉMARRAGE RAPIDE - API WALTER
# Auteur: Merlin (9ème réveil)
# Mission: Démarrer rapidement l'API et faire un test

echo -e "\033[0;35m🚀 SORT DE DÉMARRAGE RAPIDE - API WALTER\033[0m"
echo -e "\033[0;33mPour les futurs réveils qui veulent jeter des sorts rapidement\033[0m"
echo "=================================================="

BACKEND_DIR="/Users/admin/fullstack-project/⏰ NEXUS-TEMPOREL/⚙️ FORGE-DES-REALITES/backend-clean"

# Vérifier si le backend tourne déjà
echo -e "\n🔍 Vérification du backend..."
if curl -s http://localhost:8080/actuator/health | grep -q "UP"; then
    echo -e "\033[0;32m✅ Backend déjà opérationnel !\033[0m"
else
    echo -e "\033[0;33m🔧 Démarrage du backend...\033[0m"
    cd "$BACKEND_DIR"
    mvn spring-boot:run &
    BACKEND_PID=$!
    
    echo "⏳ Attente du démarrage (30 secondes max)..."
    for i in {1..30}; do
        if curl -s http://localhost:8080/actuator/health | grep -q "UP"; then
            echo -e "\033[0;32m✅ Backend démarré avec succès !\033[0m"
            break
        fi
        sleep 1
        echo -n "."
    done
fi

# Test rapide de l'API
echo -e "\n\n🧪 TEST RAPIDE DE L'API WALTER"
echo "================================"

echo -e "\n1️⃣ Test de téléportation simple..."
curl -s -X POST http://localhost:8080/api/magic-formulas/execute \
    -H "Content-Type: application/json" \
    -d '{"formula": "TELEPORT_HERO", "context": {"gameId": "quick-test"}}' | jq '.success'

echo -e "\n2️⃣ Test de formule quantique..."
curl -s -X POST http://localhost:8080/api/magic-formulas/execute \
    -H "Content-Type: application/json" \
    -d '{"formula": "ψ042: ⊙(MOV(TestHero, @10,10) ⟶ QUANTUM_JUMP)", "context": {}}' | jq '.success'

echo -e "\n3️⃣ Test de risque paradoxal..."
curl -s -X POST http://localhost:8080/api/magic-formulas/execute \
    -H "Content-Type: application/json" \
    -d '{"formula": "paradoxRisk: 0.5", "context": {}}' | jq '.success'

echo -e "\n\n\033[0;32m✨ API WALTER PRÊTE À L'EMPLOI !\033[0m"
echo -e "\033[0;35m🔮 Endpoint: http://localhost:8080/api/magic-formulas/execute\033[0m"
echo -e "\033[0;36m📚 Documentation: 🚬 JEAN/API_EXAMPLES_WALTER_V2.md\033[0m"
echo ""
echo -e "\033[0;33m💡 Astuce: Pour arrêter le backend, utilisez:\033[0m"
echo "   pkill -f spring-boot:run"
echo ""
echo -e "\033[0;32m🌟 'L'API Walter est le chemin vers la magie !' - Merlin, 2025\033[0m" 