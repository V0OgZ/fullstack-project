#!/bin/bash
# 🔮 SORT: Compilation Moteur Geordi
# Type: Compilation Backend
# "I'm giving her all she's got, Captain!"

echo "⚡ ═══════════════════════════════════════"
echo "⚡ INVOCATION: Compilation Geordi Engine"
echo "⚡ ═══════════════════════════════════════"
echo ""

# Navigation vers backend
cd ../../backend

echo "🥽 VISOR MODE: QUANTUM_6D"
echo "🚀 WARP CORE: INITIALIZING..."
echo ""

# Compilation Maven
echo "📦 Compilation du moteur temporel..."
mvn clean compile -DskipTests

RESULT=$?

if [ $RESULT -eq 0 ]; then
    echo ""
    echo "✅ COMPILATION RÉUSSIE !"
    echo "🌟 Warp Core: ONLINE"
    echo "⚡ Dilithium Crystals: ALIGNED"
    echo "🛡️ Temporal Shields: UP"
    echo ""
    echo "💬 Geordi says: 'All systems nominal, Captain!'"
else
    echo ""
    echo "❌ ERREUR DE COMPILATION"
    echo "💬 Geordi says: 'The engines can't take much more of this!'"
fi

echo ""
echo "⚡ ═══════════════════════════════════════"
echo "⚡ FIN DU SORT"
echo "⚡ ═══════════════════════════════════════"

# Retour au Grimoire
cd ../🔮\ GRIMOIRE

exit $RESULT 