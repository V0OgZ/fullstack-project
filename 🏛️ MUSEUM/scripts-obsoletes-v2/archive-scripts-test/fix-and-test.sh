#!/bin/bash

# 🔧 Heroes of Time - Diagnostic et Correction Automatique
# =========================================================

echo "🔧 Heroes of Time - Diagnostic et Correction"
echo "============================================="
echo ""

# Fonctions utilitaires
log_error() {
    echo "❌ ERREUR: $1" | tee -a diagnostic.log
}

log_success() {
    echo "✅ SUCCESS: $1" | tee -a diagnostic.log
}

log_warning() {
    echo "⚠️  WARNING: $1" | tee -a diagnostic.log
}

log_info() {
    echo "ℹ️  INFO: $1" | tee -a diagnostic.log
}

# Initialiser le fichier de diagnostic
echo "🔍 Diagnostic Heroes of Time - $(date)" > diagnostic.log
echo "============================================" >> diagnostic.log

# Phase 1: Nettoyage des processus
echo "🧹 Phase 1: Nettoyage des processus"
echo "-----------------------------------"

# Nettoyer les ports utilisés
log_info "Nettoyage des ports 8080, 8001, 5173, 5174..."
lsof -ti:8080 | xargs kill -9 2>/dev/null && log_success "Port 8080 libéré" || log_info "Port 8080 déjà libre"
lsof -ti:8001 | xargs kill -9 2>/dev/null && log_success "Port 8001 libéré" || log_info "Port 8001 déjà libre"
lsof -ti:5173 | xargs kill -9 2>/dev/null && log_success "Port 5173 libéré" || log_info "Port 5173 déjà libre"
lsof -ti:5174 | xargs kill -9 2>/dev/null && log_success "Port 5174 libéré" || log_info "Port 5174 déjà libre"

# Tuer tous les processus Java/Maven/Python liés au projet
log_info "Nettoyage des processus Maven/Java/Python..."
pkill -f "mvn.*spring-boot:run" 2>/dev/null && log_success "Processus Maven terminés" || log_info "Aucun processus Maven actif"
pkill -f "python.*http.server" 2>/dev/null && log_success "Serveurs Python terminés" || log_info "Aucun serveur Python actif"

sleep 2

# Phase 2: Vérification des dépendances
echo ""
echo "🔍 Phase 2: Vérification des dépendances"
echo "----------------------------------------"

# Vérifier Java
if command -v java &> /dev/null; then
    JAVA_VERSION=$(java -version 2>&1 | head -n1 | cut -d'"' -f2)
    log_success "Java détecté: $JAVA_VERSION"
else
    log_error "Java non trouvé"
    exit 1
fi

# Vérifier Maven
if command -v mvn &> /dev/null; then
    MAVEN_VERSION=$(mvn --version 2>&1 | head -n1 | cut -d' ' -f3)
    log_success "Maven détecté: $MAVEN_VERSION"
else
    log_error "Maven non trouvé"
    exit 1
fi

# Vérifier Python
if command -v python3 &> /dev/null; then
    PYTHON_VERSION=$(python3 --version 2>&1 | cut -d' ' -f2)
    log_success "Python3 détecté: $PYTHON_VERSION"
else
    log_error "Python3 non trouvé"
    exit 1
fi

# Phase 3: Diagnostic des fichiers de configuration
echo ""
echo "🔍 Phase 3: Diagnostic des configurations"
echo "----------------------------------------"

# Vérifier le backend
if [ -f "🖥️ 🖥️ backend/pom.xml" ]; then
    log_success "Backend pom.xml trouvé"
else
    log_error "Backend pom.xml manquant"
    exit 1
fi

if [ -f "🖥️ 🖥️ backend/src/main/resources/application.properties" ]; then
    log_success "Configuration backend trouvée"
else
    log_error "Configuration backend manquante"
    exit 1
fi

# Vérifier le frontend-temporal
if [ -d "frontend-temporal" ]; then
    log_success "Frontend-temporal trouvé"
else
    log_error "Frontend-temporal manquant"
    exit 1
fi

# Vérifier le quantum-visualizer
if [ -d "quantum-visualizer" ]; then
    log_success "Quantum-visualizer trouvé"
else
    log_error "Quantum-visualizer manquant"
    exit 1
fi

# Phase 4: Correction des problèmes ANTLR
echo ""
echo "🔧 Phase 4: Correction des problèmes ANTLR"
echo "------------------------------------------"

cd backend 2>/dev/null || { log_error "Impossible d'accéder au dossier backend"; exit 1; }

# Vérifier et corriger les dépendances Maven
log_info "Vérification des dépendances Maven..."
if grep -q "antlr4" pom.xml; then
    log_warning "Dépendances ANTLR trouvées - peuvent causer des conflits"
    # Créer une sauvegarde du pom.xml
    cp pom.xml pom.xml.backup
    log_success "Sauvegarde pom.xml créée"
fi

# Nettoyer le cache Maven
log_info "Nettoyage du cache Maven..."
mvn clean -q 2>/dev/null && log_success "Cache Maven nettoyé" || log_warning "Échec du nettoyage Maven"

cd ..

# Phase 5: Démarrage des services
echo ""
echo "🚀 Phase 5: Démarrage des services"
echo "----------------------------------"

# Démarrer le backend
log_info "Démarrage du backend..."
cd backend
nohup mvn spring-boot:run -Dspring-boot.run.arguments="--heroes.parser.use.antlr=false" > ../backend.log 2>&1 &
BACKEND_PID=$!
cd ..

log_success "Backend démarré (PID: $BACKEND_PID)"

# Attendre que le backend soit prêt
log_info "Attente du démarrage du backend..."
for i in {1..60}; do
    if curl -s http://localhost:8080/api/game/status > /dev/null 2>&1; then
        log_success "Backend prêt sur http://localhost:8080"
        break
    fi
    if [ $i -eq 60 ]; then
        log_error "Timeout: Backend non accessible après 60 secondes"
        tail -20 backend.log >> diagnostic.log
        exit 1
    fi
    sleep 1
done

# Démarrer le quantum-visualizer
log_info "Démarrage du quantum-visualizer..."
cd quantum-visualizer
nohup python3 -m http.server 8001 > ../visualizer.log 2>&1 &
VISUALIZER_PID=$!
cd ..

log_success "Quantum-visualizer démarré (PID: $VISUALIZER_PID)"

# Démarrer le frontend-temporal
log_info "Démarrage du frontend-temporal..."
cd frontend-temporal
nohup python3 -m http.server 5174 > ../frontend.log 2>&1 &
FRONTEND_PID=$!
cd ..

log_success "Frontend-temporal démarré (PID: $FRONTEND_PID)"

# Attendre que les services soient prêts
sleep 5

# Phase 6: Tests de connectivité
echo ""
echo "🧪 Phase 6: Tests de connectivité"
echo "--------------------------------"

# Tester le backend
if curl -s http://localhost:8080/api/game/status > /dev/null 2>&1; then
    log_success "Backend API accessible"
else
    log_error "Backend API non accessible"
fi

# Tester le visualizer
if curl -s http://localhost:8001 > /dev/null 2>&1; then
    log_success "Quantum-visualizer accessible"
else
    log_error "Quantum-visualizer non accessible"
fi

# Tester le frontend
if curl -s http://localhost:5174 > /dev/null 2>&1; then
    log_success "Frontend-temporal accessible"
else
    log_error "Frontend-temporal non accessible"
fi

# Phase 7: Exécution des tests
echo ""
echo "🧪 Phase 7: Exécution des tests"
echo "-------------------------------"

# Exécuter les tests de base
log_info "Exécution des tests de base..."
if [ -f "run-tests.sh" ]; then
    timeout 300 ./run-tests.sh > test-results.log 2>&1
    if [ $? -eq 0 ]; then
        log_success "Tests terminés avec succès"
    else
        log_warning "Tests terminés avec des erreurs - voir test-results.log"
    fi
else
    log_warning "Script de test run-tests.sh non trouvé"
fi

# Phase 8: Rapport final
echo ""
echo "📊 Phase 8: Rapport final"
echo "------------------------"

echo "🎯 SERVICES ACTIFS:"
echo "├─ Backend: http://localhost:8080 (PID: $BACKEND_PID)"
echo "├─ Visualizer: http://localhost:8001 (PID: $VISUALIZER_PID)"
echo "└─ Frontend: http://localhost:5174 (PID: $FRONTEND_PID)"
echo ""

echo "📄 LOGS DISPONIBLES:"
echo "├─ diagnostic.log (ce rapport)"
echo "├─ backend.log (logs backend)"
echo "├─ visualizer.log (logs visualizer)"
echo "├─ frontend.log (logs frontend)"
echo "└─ test-results.log (résultats des tests)"
echo ""

echo "💡 PROCHAINES ÉTAPES:"
echo "1. Vérifier les logs ci-dessus en cas d'erreur"
echo "2. Accéder aux interfaces via les URLs indiquées"
echo "3. Tester les fonctionnalités temporelles"
echo ""

echo "🔧 POUR ARRÊTER:"
echo "   ./stop-all.sh"
echo ""

log_success "Diagnostic et correction terminés - voir diagnostic.log pour le rapport complet" 