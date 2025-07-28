#!/bin/bash

# Script de lancement du test des interfaces Heroes of Time
# Usage: ./run-interface-test.sh

echo "=== Heroes of Time - Test des Interfaces ==="
echo

# Fonction pour afficher des messages colorés
log() {
    local color=$1
    local message=$2
    case $color in
        "green") echo -e "\033[32m$message\033[0m" ;;
        "red") echo -e "\033[31m$message\033[0m" ;;
        "yellow") echo -e "\033[33m$message\033[0m" ;;
        "blue") echo -e "\033[34m$message\033[0m" ;;
        *) echo "$message" ;;
    esac
}

# Vérifier Node.js
if ! command -v node &> /dev/null; then
    log "red" "❌ Node.js n'est pas installé"
    exit 1
fi

# Vérifier npm
if ! command -v npm &> /dev/null; then
    log "red" "❌ npm n'est pas installé"
    exit 1
fi

# Vérifier Python
if ! command -v python3 &> /dev/null; then
    log "red" "❌ Python 3 n'est pas installé"
    exit 1
fi

log "green" "✅ Prérequis vérifiés"

# Installer les dépendances si nécessaire
if [ ! -d "node_modules" ]; then
    log "blue" "📦 Installation des dépendances..."
    npm install
    if [ $? -ne 0 ]; then
        log "red" "❌ Erreur lors de l'installation des dépendances"
        exit 1
    fi
fi

# Installer Playwright si nécessaire
if [ ! -d "node_modules/playwright" ]; then
    log "blue" "🎭 Installation de Playwright..."
    npx playwright install
    if [ $? -ne 0 ]; then
        log "red" "❌ Erreur lors de l'installation de Playwright"
        exit 1
    fi
fi

# Vérifier que les dossiers frontend existent
if [ ! -d "frontend" ]; then
    log "red" "❌ Dossier 🌐 frontend/ non trouvé"
    exit 1
fi

if [ ! -d "frontend-temporal" ]; then
    log "red" "❌ Dossier frontend-temporal/ non trouvé"
    exit 1
fi

log "green" "✅ Structure du projet vérifiée"

# Nettoyer les processus existants
log "blue" "🧹 Nettoyage des processus existants..."
pkill -f "python3 -m http.server" 2>/dev/null
pkill -f "vite" 2>/dev/null
sleep 2

# Créer les dossiers de test
mkdir -p test-screenshots
mkdir -p test-references

# Lancer le test
log "blue" "🚀 Lancement du test des interfaces..."
echo

node test-dual-interface.js

# Vérifier le résultat
if [ $? -eq 0 ]; then
    log "green" "✅ Test terminé avec succès"
    echo
    log "blue" "📊 Fichiers générés:"
    ls -la test-screenshots/ 2>/dev/null | head -10
    echo
    if [ -f "test-report.json" ]; then
        log "blue" "📄 Rapport généré: test-report.json"
        echo "Contenu du rapport:"
        cat test-report.json | head -20
    fi
else
    log "red" "❌ Erreur lors du test"
    exit 1
fi

echo
log "green" "=== Test terminé ===" 