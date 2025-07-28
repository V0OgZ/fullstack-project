#!/bin/bash
# 🔮 SORT: Exécution Épreuve Morgana
# Grammaire Temporelle Pure - Sans echo

# Navigation vers racine
cd ../..

# Exécution directe via moteur HOTS
./scripts/run-scenario.sh scenarios/epreuve-morgana-temporelle.hots --mode=quantum --output=silent

# Capture résultat
RESULT=$?

# Retour au Grimoire
cd "🔮 GRIMOIRE"

# Code retour seulement
exit $RESULT 