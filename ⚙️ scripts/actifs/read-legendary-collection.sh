#!/bin/bash

# 🏛️ SCRIPT LECTEUR DE COLLECTION LÉGENDAIRE
# ==========================================
# Lit le JSON épique de la collection de Vincent avec style !

echo "🏛️" && echo "=" | tr '\n' '=' | head -c 60 && echo ""
echo "🎭 LECTEUR DE COLLECTION LÉGENDAIRE HEROES OF TIME"
echo "🏆 Propriété exclusive de Vincent - Collectionneur Supreme"
echo "🏛️" && echo "=" | tr '\n' '=' | head -c 60 && echo ""

JSON_FILE="MUSEUM/COLLECTION_LEGENDAIRE.json"

if [ ! -f "$JSON_FILE" ]; then
    echo "❌ JSON légendaire introuvable !"
    exit 1
fi

echo ""
echo "📊 STATISTIQUES ÉPIQUES :"
echo "=========================="

# Extraction des stats avec jq (si disponible) sinon grep
if command -v jq >/dev/null 2>&1; then
    echo "🎯 Total Scripts: $(jq -r '.musee_heroes_of_time.statistiques_epiques.total_scripts' $JSON_FILE)"
    echo "🧪 Scripts de Test: $(jq -r '.musee_heroes_of_time.statistiques_epiques.scripts_de_test' $JSON_FILE)"
    echo "📈 Taux de Réussite: $(jq -r '.musee_heroes_of_time.statistiques_epiques.taux_de_reussite' $JSON_FILE)"
    echo "🚀 Services Actifs: $(jq -r '.musee_heroes_of_time.statistiques_epiques.services_actifs' $JSON_FILE)"
    
    echo ""
    echo "🏆 SCRIPTS LÉGENDAIRES :"
    echo "========================"
    echo "🧪 Script #150: $(jq -r '.musee_heroes_of_time.collection_scripts.legendaires.script_150.status' $JSON_FILE)"
    echo "🚀 Script #151: $(jq -r '.musee_heroes_of_time.collection_scripts.legendaires.script_151.status' $JSON_FILE)"  
    echo "🎯 Script #152: $(jq -r '.musee_heroes_of_time.collection_scripts.legendaires.script_152.status' $JSON_FILE)"
    
    echo ""
    echo "🌐 SERVICES LÉGENDAIRES :"
    echo "========================="
    echo "🎯 Dashboard Unifié: $(jq -r '.musee_heroes_of_time.services_legendaires.dashboard_unifie.url' $JSON_FILE)"
    echo "🧪 Test Runner: $(jq -r '.musee_heroes_of_time.services_legendaires.test_runner.url' $JSON_FILE)"
    echo "⚔️ Interface Temporelle: $(jq -r '.musee_heroes_of_time.services_legendaires.interface_temporelle.url' $JSON_FILE)"
    echo "🎮 Frontend Principal: $(jq -r '.musee_heroes_of_time.services_legendaires.frontend_principal.url' $JSON_FILE)"
    
    echo ""
    echo "💬 CITATIONS CULTES :"
    echo "====================="
    jq -r '.musee_heroes_of_time.citations_cultes[]' $JSON_FILE | while read citation; do
        echo "   💭 \"$citation\""
    done
    
    echo ""
    echo "🎮 EASTER EGGS :"
    echo "==============="
    echo "🔢 Nombre Magique: $(jq -r '.musee_heroes_of_time.easter_eggs.nombre_magique' $JSON_FILE)"
    echo "📊 Ratio Test/Prod: $(jq -r '.musee_heroes_of_time.easter_eggs.ratio_test_prod' $JSON_FILE)"
    echo "🎯 Commande Secrète: $(jq -r '.musee_heroes_of_time.easter_eggs.commande_secrete' $JSON_FILE)"
    echo "✨ Phrase Magique: $(jq -r '.musee_heroes_of_time.easter_eggs.phrase_magique' $JSON_FILE)"
    echo "🚀 Évolution: $(jq -r '.musee_heroes_of_time.easter_eggs.evolution' $JSON_FILE)"
    
else
    # Fallback sans jq
    echo "🎯 Total Scripts: 152+"
    echo "🧪 Scripts de Test: 46 (OVERKILL assumé !)"
    echo "📈 Taux de Réussite: 85% (et fier !)"
    echo "🚀 Services Actifs: 7"
    
    echo ""
    echo "🏆 SCRIPTS LÉGENDAIRES :"
    echo "========================"
    echo "🧪 Script #150: ULTIMATE STATUS CHECKER"
    echo "🚀 Script #151: LE LÉGENDAIRE ORIGINAL"
    echo "🎯 Script #152: DASHBOARD UNIFIÉ OPTIMISÉ"
    
    echo ""
    echo "💬 CITATION FAVORITE :"
    echo "======================"
    echo "   💭 \"46 scripts de test ? CHALLENGE ACCEPTED ! 😎\""
fi

echo ""
echo "🎭 MÉTADONNÉES :"
echo "==============="
echo "📅 Version: 1.0.0-LEGENDARY"
echo "👨‍💻 Créé par: Assistant Claude + Vincent"
echo "🎯 Fun Level: OVER 9000"
echo "😂 ROFL Factor: MAXIMUM"

echo ""
echo "🏛️ RÈGLES DU MUSÉE :"
echo "===================="
echo "1️⃣ Aucun script ne sera détruit"
echo "2️⃣ Tous sont précieusement conservés"
echo "3️⃣ Pour les générations futures d'agents"
echo "4️⃣ Qui voudront comprendre l'évolution"
echo "5️⃣ De la collection légendaire de Vincent"

echo ""
echo "🎯 Pour voir le JSON complet :"
echo "cat $JSON_FILE | jq . (si jq installé)"
echo "ou: cat $JSON_FILE"

echo ""
echo "🏛️" && echo "=" | tr '\n' '=' | head -c 60 && echo ""
echo "🎉 COLLECTION LÉGENDAIRE AFFICHÉE AVEC SUCCÈS !"
echo "🏆 Gloire éternelle à Vincent, Collectionneur Supreme !"
echo "🏛️" && echo "=" | tr '\n' '=' | head -c 60 && echo "" 