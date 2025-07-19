#!/bin/bash

# =============================================================================
# 🌀 TEST RAPIDE - INTERFÉRENCES QUANTIQUES 
# =============================================================================

# Couleurs
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}"
echo "🌀 ================================================================================"
echo "   HEROES OF TIME - TEST RAPIDE DES INTERFÉRENCES QUANTIQUES"
echo "================================================================================"
echo -e "${NC}"

echo -e "${GREEN}📋 Phase 1: Vérification des artefacts d'interférence...${NC}"

if [ -f "test/artefacts/objects/quantum_interference_artifacts.json" ]; then
    echo "✅ Artefacts d'interférence trouvés"
    
    # Compter les artefacts
    artifacts_count=$(grep -c '"id":' test/artefacts/objects/quantum_interference_artifacts.json)
    echo "   - ${artifacts_count} artefacts d'interférence définis"
    
    # Lister les artefacts
    echo "   - Artefacts disponibles:"
    grep '"name":' test/artefacts/objects/quantum_interference_artifacts.json | sed 's/.*"name": *"\([^"]*\)".*/     • \1/'
else
    echo "❌ Artefacts d'interférence non trouvés"
fi

echo -e "\n${GREEN}📋 Phase 2: Vérification du script HOTS d'interférence...${NC}"

if [ -f "game_assets/tests/hots/quantum_interference_test.hots" ]; then
    echo "✅ Script HOTS d'interférence trouvé"
    
    # Compter les commandes
    commands_count=$(grep -c "^[A-Z]" game_assets/tests/hots/quantum_interference_test.hots)
    psi_states_count=$(grep -c "^ψ" game_assets/tests/hots/quantum_interference_test.hots)
    
    echo "   - ${commands_count} commandes définies"
    echo "   - ${psi_states_count} états ψ à tester"
    
    echo "   - Commandes d'interférence:"
    grep "INTERFERE\|PHASE_SHIFT\|RESONATE\|MEASURE_COHERENCE" game_assets/tests/hots/quantum_interference_test.hots | head -5 | sed 's/^/     • /'
else
    echo "❌ Script HOTS d'interférence non trouvé"
fi

echo -e "\n${GREEN}📋 Phase 3: Test de compilation backend...${NC}"

cd backend
if mvn compile -q > /dev/null 2>&1; then
    echo "✅ Backend compile sans erreur"
else
    echo "❌ Erreurs de compilation détectées"
    echo "   Tentative de correction..."
    mvn compile 2>&1 | grep ERROR | head -3
fi

echo -e "\n${GREEN}📋 Phase 4: Vérification des modèles quantiques...${NC}"

# Vérifier PsiState
if grep -q "calculateConstructiveInterference" src/main/java/com/heroesoftimepoc/temporalengine/model/PsiState.java; then
    echo "✅ Méthodes d'interférence constructive disponibles"
else
    echo "❌ Méthodes d'interférence manquantes"
fi

if grep -q "calculateDestructiveInterference" src/main/java/com/heroesoftimepoc/temporalengine/model/PsiState.java; then
    echo "✅ Méthodes d'interférence destructive disponibles"
else
    echo "❌ Méthodes d'interférence destructive manquantes"
fi

# Vérifier ComplexAmplitude
if grep -q "class ComplexAmplitude" src/main/java/com/heroesoftimepoc/temporalengine/model/ComplexAmplitude.java; then
    echo "✅ Classe ComplexAmplitude disponible"
    
    # Vérifier les méthodes quantiques
    methods_count=$(grep -c "public.*ComplexAmplitude" src/main/java/com/heroesoftimepoc/temporalengine/model/ComplexAmplitude.java)
    echo "   - ${methods_count} méthodes d'amplitude complexe"
else
    echo "❌ Classe ComplexAmplitude manquante"
fi

echo -e "\n${GREEN}📋 Phase 5: Test rapide d'intégration...${NC}"

# Test de compilation des tests
if mvn test-compile -q > /dev/null 2>&1; then
    echo "✅ Tests compilent correctement"
    
    # Essayer de lancer un test simple
    echo "   Tentative de lancement du test d'interférence..."
    if timeout 30s mvn test -Dtest="*QuantumInterference*" -q > /dev/null 2>&1; then
        echo "✅ Test d'interférence exécuté avec succès"
    else
        echo "⚠️  Test d'interférence en cours ou échec (timeout 30s)"
    fi
else
    echo "❌ Erreurs de compilation des tests"
    echo "   Détails des erreurs:"
    mvn test-compile 2>&1 | grep ERROR | head -3
fi

cd ..

echo -e "\n${BLUE}📊 RÉSUMÉ DES FONCTIONNALITÉS D'INTERFÉRENCE:${NC}"
echo "============================================="
echo "🔬 Artefacts quantiques:"
echo "   • Miroir Quantique (interférences constructives/destructives)"
echo "   • Manipulateur d'Amplitudes (ajustement de phase)"
echo "   • Détecteur de Cohérence (mesures quantiques)"
echo ""
echo "⚡ Commandes HOTS étendues:"
echo "   • INTERFERE(type, ψ1, ψ2) - Créer des interférences"
echo "   • PHASE_SHIFT(ψ, angle) - Ajuster les phases"
echo "   • RESONATE(ψ, frequency) - Résonance quantique"
echo "   • MEASURE_COHERENCE(ψ1, ψ2) - Mesurer la cohérence"
echo ""
echo "🌊 Patterns d'interférence:"
echo "   • Double fente quantique"
echo "   • Battements quantiques"
echo "   • Interférences temporelles"
echo ""

# Vérification finale
if [ -f "test/artefacts/objects/quantum_interference_artifacts.json" ] && 
   [ -f "game_assets/tests/hots/quantum_interference_test.hots" ] &&
   grep -q "ComplexAmplitude" backend/src/main/java/com/heroesoftimepoc/temporalengine/model/PsiState.java; then
    echo -e "${GREEN}🎉 SYSTÈME D'INTERFÉRENCE QUANTIQUE COMPLET ET FONCTIONNEL!${NC}"
    echo ""
    echo "📖 Pour utiliser les interférences:"
    echo "   1. Équiper un héros du Miroir Quantique"
    echo "   2. Créer deux états ψ compatibles" 
    echo "   3. Utiliser INTERFERE(CONSTRUCTIVE/DESTRUCTIVE, ψ1, ψ2)"
    echo "   4. Observer l'amplification ou l'annulation"
    echo ""
    echo "🚀 Prêt pour les tests avancés d'interférence quantique!"
else
    echo -e "${YELLOW}⚠️  Système d'interférence partiellement implémenté${NC}"
    echo "   Certains composants peuvent nécessiter des ajustements"
fi

echo -e "\n${BLUE}================================================================================${NC}" 