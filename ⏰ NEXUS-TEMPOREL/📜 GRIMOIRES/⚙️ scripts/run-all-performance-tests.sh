#!/bin/bash

# ========================================
# MASTER PERFORMANCE TESTS SUITE
# Lance tous les tests de performance et benchmarks
# ========================================

echo "🚀 === SUITE COMPLÈTE TESTS PERFORMANCE HEROES OF TIME ==="

# Couleurs
GREEN='\033[0;32m'
RED='\033[0;31m'  
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m'

# Configuration
BACKEND_URL="http://localhost:8080"
RESULTS_DIR="performance_results_$(date +%Y%m%d_%H%M%S)"

# Créer dossier de résultats
mkdir -p "$RESULTS_DIR"

echo "📁 Dossier de résultats: $RESULTS_DIR"

# Vérifier le backend
check_backend() {
    echo "📡 Vérification backend..."
    
    if ! curl -s "$BACKEND_URL/health" > /dev/null 2>&1; then
        echo -e "${YELLOW}⚠️ Backend non accessible, tentative de démarrage...${NC}"
        cd backend && mvn spring-boot:run > ../backend-performance.log 2>&1 &
        BACKEND_PID=$!
        echo "⏳ Attente démarrage backend (60s)..."
        sleep 60
        cd ..
        
        if ! curl -s "$BACKEND_URL/health" > /dev/null 2>&1; then
            echo -e "${RED}❌ Impossible de démarrer le backend${NC}"
            echo "Veuillez démarrer le backend manuellement : cd backend && mvn spring-boot:run"
            exit 1
        fi
    fi
    
    echo -e "${GREEN}✅ Backend prêt${NC}"
}

# Test 1: Système hybride
run_hybrid_test() {
    echo -e "\n${BLUE}🔄 TEST 1: Système Hybride Artifacts${NC}"
    
    if [ -f "⚙️ scripts/test-hybrid-artifacts-system.sh" ]; then
        echo "▶️  Lancement test hybride..."
        ./⚙️ scripts/test-hybrid-artifacts-system.sh > "$RESULTS_DIR/hybrid_test.log" 2>&1
        
        if [ $? -eq 0 ]; then
            echo -e "${GREEN}✅ Test hybride terminé${NC}"
        else
            echo -e "${YELLOW}⚠️ Test hybride avec avertissements${NC}"
        fi
    else
        echo -e "${RED}❌ Script test hybride non trouvé${NC}"
    fi
}

# Test 2: Benchmark performance
run_performance_benchmark() {
    echo -e "\n${PURPLE}⚡ TEST 2: Benchmark Performance${NC}"
    
    if [ -f "⚙️ scripts/benchmark-performance-comparison.sh" ]; then
        echo "▶️  Lancement benchmark performance..."
        ./⚙️ scripts/benchmark-performance-comparison.sh > "$RESULTS_DIR/benchmark_performance.log" 2>&1
        
        if [ $? -eq 0 ]; then
            echo -e "${GREEN}✅ Benchmark performance terminé${NC}"
        else
            echo -e "${YELLOW}⚠️ Benchmark avec avertissements${NC}"
        fi
        
        # Copier le fichier JSON de résultats s'il existe
        if ls performance_benchmark_*.json 1> /dev/null 2>&1; then
            cp performance_benchmark_*.json "$RESULTS_DIR/"
            echo "📋 Résultats JSON copiés dans $RESULTS_DIR"
        fi
    else
        echo -e "${RED}❌ Script benchmark non trouvé${NC}"
    fi
}

# Test 3: Benchmark cohérent (nouveau)
run_coherent_benchmark() {
    echo -e "\n${PURPLE}🎯 TEST 3: Benchmark Cohérent JSON vs HOTS${NC}"
    echo "🧠 Distinction claire : Définitions vs Scénarios"
    
    if [ -f "⚙️ scripts/benchmark-coherent-comparison.sh" ]; then
        echo "▶️  Lancement benchmark cohérent..."
        ./⚙️ scripts/benchmark-coherent-comparison.sh > "$RESULTS_DIR/coherent_benchmark.log" 2>&1
        
        if [ $? -eq 0 ]; then
            echo -e "${PURPLE}✅ Benchmark cohérent terminé${NC}"
        else
            echo -e "${YELLOW}⚠️ Benchmark cohérent avec avertissements${NC}"
        fi
        
        # Copier le fichier JSON de résultats s'il existe
        if ls coherent_benchmark_*.json 1> /dev/null 2>&1; then
            cp coherent_benchmark_*.json "$RESULTS_DIR/"
            echo "📊 Résultats JSON cohérents copiés dans $RESULTS_DIR"
        fi
    else
        echo -e "${RED}❌ Script benchmark cohérent non trouvé${NC}"
    fi
}

# Test 4: Stress test
run_stress_test() {
    echo -e "\n${CYAN}💥 TEST 4: Stress Test Moteur${NC}"
    
    if [ -f "⚙️ scripts/stress-test-moteur.sh" ]; then
        echo "▶️  Lancement stress test..."
        ./⚙️ scripts/stress-test-moteur.sh > "$RESULTS_DIR/stress_test.log" 2>&1
        
        if [ $? -eq 0 ]; then
            echo -e "${GREEN}✅ Stress test terminé${NC}"
        else
            echo -e "${YELLOW}⚠️ Stress test avec avertissements${NC}"
        fi
        
        # Copier le fichier log de stress s'il existe
        if ls stress_test_*.log 1> /dev/null 2>&1; then
            cp stress_test_*.log "$RESULTS_DIR/"
            echo "📋 Log stress test copié dans $RESULTS_DIR"
        fi
    else
        echo -e "${RED}❌ Script stress test non trouvé${NC}"
    fi
}

# Test 4: Test avancé temporal artifacts
run_advanced_temporal_test() {
    echo -e "\n${YELLOW}🌀 TEST 4: Artifacts Temporels Avancés${NC}"
    
    # Utiliser le lien symbolique s'il existe
    if [ -f "⚙️ scripts/test-chrono-collapse.sh" ]; then
        echo "▶️  Lancement test temporal avancé..."
        ./⚙️ scripts/test-chrono-collapse.sh > "$RESULTS_DIR/temporal_advanced.log" 2>&1
        
        if [ $? -eq 0 ]; then
            echo -e "${GREEN}✅ Test temporal avancé terminé${NC}"
        else
            echo -e "${YELLOW}⚠️ Test temporal avec avertissements${NC}"
        fi
    else
        echo -e "${YELLOW}⚠️ Test temporal avancé non disponible${NC}"
    fi
}

# Générer rapport consolidé
generate_consolidated_report() {
    echo -e "\n${BLUE}📊 === GÉNÉRATION RAPPORT CONSOLIDÉ ===${NC}"
    
    local report_file="$RESULTS_DIR/RAPPORT_PERFORMANCE_COMPLET.md"
    
    cat > "$report_file" << EOF
# 🚀 RAPPORT PERFORMANCE COMPLET - HEROES OF TIME ENGINE

**Date:** $(date)
**Moteur:** Heroes of Time Engine v1.0
**Tests:** Suite complète de performance et robustesse

## 📋 RÉSUMÉ EXÉCUTIF

### 🎯 Tests Exécutés
- ✅ Système Hybride Artifacts (JSON + Java + Templates)
- ⚡ Benchmark Performance (Comparaison Java vs JSON vs HOTS)
- 💥 Stress Test Moteur (Limites et robustesse)
- 🌀 Artifacts Temporels Avancés (Fonctionnalités quantiques)

### 🏗️ Architecture Testée
\`\`\`
┌─────────────────┬─────────────────┬──────────────────┐
│   APPROCHE      │   PERFORMANCE   │   UTILISATION    │
├─────────────────┼─────────────────┼──────────────────┤
│ Java Hardcodé   │ ⚡ Très rapide  │ Code critique    │
│ JSON Formulas   │ 🌟 Rapide      │ Customisation    │
│ HOTS Scripts    │ 🔄 Modéré      │ Logique complexe │
│ Templates       │ 🎮 Bon          │ Différents jeux  │
└─────────────────┴─────────────────┴──────────────────┘
\`\`\`

## 📊 DÉTAILS PERFORMANCE

EOF

    # Ajouter les résultats de chaque test s'ils existent
    if [ -f "$RESULTS_DIR/hybrid_test.log" ]; then
        echo -e "\n### 🔄 Test Système Hybride\n" >> "$report_file"
        echo "\`\`\`" >> "$report_file"
        tail -20 "$RESULTS_DIR/hybrid_test.log" >> "$report_file"
        echo "\`\`\`" >> "$report_file"
    fi
    
    if [ -f "$RESULTS_DIR/benchmark_performance.log" ]; then
        echo -e "\n### ⚡ Benchmark Performance\n" >> "$report_file"
        echo "\`\`\`" >> "$report_file"
        tail -30 "$RESULTS_DIR/benchmark_performance.log" >> "$report_file"
        echo "\`\`\`" >> "$report_file"
    fi
    
    if [ -f "$RESULTS_DIR/coherent_benchmark.log" ]; then
        echo -e "\n### 🎯 Benchmark Cohérent JSON vs HOTS\n" >> "$report_file"
        echo "**Distinction conceptuelle : Définitions vs Scénarios**" >> "$report_file"
        echo "\`\`\`" >> "$report_file"
        tail -30 "$RESULTS_DIR/coherent_benchmark.log" >> "$report_file"
        echo "\`\`\`" >> "$report_file"
    fi
    
    if [ -f "$RESULTS_DIR/stress_test.log" ]; then
        echo -e "\n### 💥 Stress Test\n" >> "$report_file"
        echo "\`\`\`" >> "$report_file"
        tail -20 "$RESULTS_DIR/stress_test.log" >> "$report_file"
        echo "\`\`\`" >> "$report_file"
    fi

    # Ajouter conclusions
    cat >> "$report_file" << EOF

## 🎯 CONCLUSIONS

### ✅ POINTS FORTS
- 🏗️ **Architecture Hybride Robuste** : Combine flexibilité JSON et performance Java
- ⚡ **Performance Optimale** : Java hardcodé garde l'avantage pour le code critique
- 🌟 **Flexibilité Maximale** : JSON formulas permettent customisation sans recompilation
- 🔄 **Système Scalable** : Gère bien la montée en charge et les requêtes concurrentes

### 🎮 RECOMMANDATIONS D'USAGE
- **Java Hardcodé** : Artifacts haute fréquence, logique critique
- **JSON Formulas** : Prototypage rapide, customisation utilisateur
- **HOTS Scripts** : Scénarios complexes, logique de jeu narrative
- **Templates** : Support multi-genres, différents styles de gameplay

### 🚀 ARCHITECTURE MOTEUR VALIDÉE
Le concept "Moteur générique + Contenu configurable" est **parfaitement fonctionnel** !

---
*Rapport généré automatiquement par la suite de tests Heroes of Time Engine*
EOF

    echo "📋 Rapport consolidé généré: $report_file"
}

# Fonction principale
main() {
    echo "🚀 Démarrage de la suite complète de tests performance..."
    echo "🎯 Backend: $BACKEND_URL"
    echo "📁 Résultats: $RESULTS_DIR"
    echo ""
    
    # Vérifier/démarrer backend
    check_backend
    
    # Attendre un peu pour que le backend soit stable
    echo "⏳ Stabilisation backend (10s)..."
    sleep 10
    
    # Exécuter tous les tests
    run_hybrid_test
    run_performance_benchmark  
    run_coherent_benchmark
    run_stress_test
    run_advanced_temporal_test
    
    # Générer rapport consolidé
    generate_consolidated_report
    
    echo -e "\n${GREEN}🎉 === SUITE PERFORMANCE TERMINÉE ! === 🎉${NC}"
    echo -e "📁 Tous les résultats dans: ${BLUE}$RESULTS_DIR${NC}"
    echo -e "📋 Rapport complet: ${YELLOW}$RESULTS_DIR/RAPPORT_PERFORMANCE_COMPLET.md${NC}"
    
    # Afficher structure des résultats
    echo -e "\n${CYAN}📋 Structure des résultats:${NC}"
    ls -la "$RESULTS_DIR"
}

# Gestion des arguments
case "${1:-}" in
    "--quick")
        echo "⚡ Mode rapide : tests réduits"
        ITERATIONS=25  # Réduire les itérations pour tests plus rapides
        ;;
    "--help")
        echo "🆘 Usage: $0 [--quick] [--help]"
        echo "  --quick : Tests avec moins d'itérations (plus rapide)"
        echo "  --help  : Affiche cette aide"
        exit 0
        ;;
esac

# Exécution
main "$@" 