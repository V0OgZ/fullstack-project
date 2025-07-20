#!/bin/bash

# Wrapper pour exposer le test "bataille temporelle" au chemin attendu par ./hots
# Ce script se contente de se placer à la racine du projet puis
# d'appeler le script historique placé dans scripts/archives/.

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
cd "$PROJECT_ROOT"

# Propager tous les arguments éventuels
bash scripts/archives/test-complete-bataille-temporelle.sh "$@"