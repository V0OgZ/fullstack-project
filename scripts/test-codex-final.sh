#!/bin/bash
# Script de test pour le scénario "Le Treizième Codex"
# Combat final : Coalition des Trois vs Omega-Zéro

echo "🔮 ========================================="
echo "   LE TREIZIÈME CODEX - TEST SCENARIO"
echo "   Coalition vs Omega-Zéro"
echo "🔮 ========================================="

# Configuration
API_URL="http://localhost:8080/api"
GAME_NAME="codex_final_test_$(date +%s)"

# Créer une nouvelle partie
echo -e "\n📖 Création du Treizième Codex..."
GAME_RESPONSE=$(curl -s -X POST "$API_URL/games" \
  -H "Content-Type: application/json" \
  -d "{\"gameName\": \"$GAME_NAME\", \"maxPlayers\": 4}")

GAME_ID=$(echo $GAME_RESPONSE | grep -o '"id":[0-9]*' | cut -d: -f2)
echo "✓ Partie créée: ID=$GAME_ID"

# Fonction pour exécuter des commandes
execute_command() {
    local command=$1
    local description=$2
    echo -e "\n⚡ $description"
    echo "   Commande: $command"
    
    RESPONSE=$(curl -s -X POST "$API_URL/games/$GAME_ID/execute" \
      -H "Content-Type: application/json" \
      -d "{\"command\": \"$command\"}")
    
    if echo "$RESPONSE" | grep -q '"success":true'; then
        echo "   ✓ Succès"
    else
        echo "   ✗ Erreur: $RESPONSE"
    fi
    
    sleep 0.5
}

# Phase 1: Configuration initiale
echo -e "\n\n🌌 === PHASE 1: CONFIGURATION DU NEXUS ==="

execute_command "WORLD_SIZE(21, 21)" "Configuration de la carte 21x21"
execute_command "SET_TURN_LIMIT(30)" "Limite à 30 tours"

# Créer les zones spéciales
execute_command "CREATE(ZONE, nexus_central, @10,10)" "Création du Nexus Central"
execute_command "CREATE(ZONE, fracture_ouest, @3,10)" "Fracture temporelle Ouest"
execute_command "CREATE(ZONE, fracture_est, @17,10)" "Fracture temporelle Est"

# Phase 2: Invocation des héros
echo -e "\n\n⚔️ === PHASE 2: INVOCATION DE LA COALITION ==="

# Jean-Grofignon
execute_command "HERO(Jean-Grofignon)" "Invocation de Jean-Grofignon"
execute_command "MOV(Jean-Grofignon, @5,15)" "Positionnement de Jean"
execute_command "CREATE(ITEM, container_paradoxal, HERO:Jean-Grofignon)" "Container Paradoxal"
execute_command "CREATE(ITEM, debugger_supreme, HERO:Jean-Grofignon)" "Debugger Suprême"

# Claudius
execute_command "HERO(Claudius)" "Invocation de Claudius"
execute_command "MOV(Claudius, @15,15)" "Positionnement de Claudius"
execute_command "CREATE(ITEM, compilateur_quantique, HERO:Claudius)" "Compilateur Quantique"
execute_command "CREATE(ITEM, fork_dimensionnel, HERO:Claudius)" "Fork Dimensionnel"

# Chlamydius
execute_command "HERO(Chlamydius)" "Invocation de Chlamydius"
execute_command "MOV(Chlamydius, @10,18)" "Positionnement de Chlamydius"
execute_command "CREATE(ITEM, parchemin_sale, HERO:Chlamydius)" "Parchemin Sale"
execute_command "CREATE(ITEM, encre_vivante, HERO:Chlamydius)" "Encre Vivante"

# Phase 3: Apparition d'Omega-Zéro
echo -e "\n\n👁️ === PHASE 3: MANIFESTATION D'OMEGA-ZÉRO ==="

execute_command "HERO(Omega-Zero)" "Manifestation d'Omega-Zéro"
execute_command "MOV(Omega-Zero, @10,10)" "Omega au centre du Nexus"

# Les 7 artefacts légendaires
echo -e "\n🎭 Équipement des 7 Artefacts Légendaires..."
execute_command "CREATE(ITEM, oeil_de_wigner, HERO:Omega-Zero)" "Œil de Wigner"
execute_command "CREATE(ITEM, trompette_apocalypse, HERO:Omega-Zero)" "Trompette de l'Apocalypse"
execute_command "CREATE(ITEM, codex_eternite, HERO:Omega-Zero)" "Codex de l'Éternité"
execute_command "CREATE(ITEM, lame_avant_monde, HERO:Omega-Zero)" "Lame d'Avant-Monde"
execute_command "CREATE(ITEM, orbe_echos, HERO:Omega-Zero)" "Orbe des Échos"
execute_command "CREATE(ITEM, graine_origine, HERO:Omega-Zero)" "Graine de l'Origine"
execute_command "CREATE(ITEM, cristal_nexus, HERO:Omega-Zero)" "Cristal du Nexus"

# États quantiques d'Omega
echo -e "\n🌀 Création des états quantiques d'Omega..."
execute_command "ψ001: (0.9+0.1i) ⊙(Δt+0 @10,10 ⟶ MOV(Omega-Zero, @10,10))" "État Prime"
execute_command "ψ002: (0.7+0.3i) ⊙(Δt+0 @10,10 ⟶ CREATE(ECHO, shadow))" "État Ombre"
execute_command "ψ003: (0.5+0.5i) ⊙(Δt+0 @10,10 ⟶ CREATE(PARADOX, nexus))" "État Écho"

# Phase 4: Combat - Tours 1-5 (Éveil)
echo -e "\n\n🎮 === PHASE 4: ÉVEIL (Tours 1-5) ==="

execute_command "MOV(Jean-Grofignon, @7,13)" "Jean s'approche du Nexus"
execute_command "MOV(Claudius, @13,13)" "Claudius analyse Omega"
execute_command "USE(ITEM, parchemin_sale, HERO:Chlamydius)" "Chlamydius révèle l'origine"

# Gel temporel de Jean
execute_command "ψ004: ⊙(Δt+1 @8,10 ⟶ CREATE(ZONE, temporal_gel))" "Jean crée un gel temporel"

# Phase 5: Combat - Tours 6-15 (Fracture)
echo -e "\n\n💥 === PHASE 5: FRACTURE (Tours 6-15) ==="

# Omega active ses artefacts
execute_command "USE(ARTIFACT, orbe_echos, HERO:Omega-Zero)" "Activation de l'Orbe"
execute_command "USE(ARTIFACT, codex_eternite, HERO:Omega-Zero)" "Ouverture du Codex"
execute_command "USE(ARTIFACT, graine_origine, HERO:Omega-Zero)" "Germination de la Graine"

# Timeline secondaire
execute_command "ψ010: (0.8+0.2i) ⊙(Δt+2 @15,10 ⟶ CREATE(TIMELINE, secondary))" "Timeline parallèle"

# Tentative de recompilation
execute_command "USE(ITEM, compilateur_quantique, HERO:Claudius)" "Claudius tente la recompilation"

# Phase 6: Combat - Tours 16-25 (Entropie)
echo -e "\n\n🌪️ === PHASE 6: ENTROPIE (Tours 16-25) ==="

# Sacrifice de Jean
execute_command "USE(ABILITY, sacrifice_anchor, HERO:Jean-Grofignon)" "Jean sacrifie son ancrage!"

# Effacement de Chlamydius
execute_command "SCRIBE(Chlamydius, 'L\\'Orbe des Échos n\\'a jamais existé')" "Effacement d'un artefact"

# Infection mémorielle
execute_command "USE(ABILITY, memory_infection, HERO:Omega-Zero)" "Omega infecte les mémoires"

# Phase 7: Combat Final - Tours 26-30
echo -e "\n\n🔥 === PHASE 7: LE CODEX FINAL (Tours 26-30) ==="

# Faux héros
execute_command "CREATE(COPY, False_Jean, @5,5)" "Apparition du Faux-Jean"
execute_command "CREATE(COPY, False_Claudius, @15,5)" "Apparition du Faux-Claudius"
execute_command "CREATE(COPY, False_Chlamydius, @10,5)" "Apparition du Faux-Chlamydius"

# Formation de la Coalition
execute_command "MOV(Jean-Grofignon, @10,12)" "Jean rejoint le centre"
execute_command "MOV(Claudius, @11,11)" "Claudius forme le triangle"
execute_command "MOV(Chlamydius, @9,11)" "Chlamydius complète la formation"

# La Séquence Ultime
echo -e "\n\n⚡⚡⚡ SÉQUENCE ULTIME ⚡⚡⚡"
echo "Les trois héros entonnent l'incantation finale..."

execute_command "†ψ001" "Jean: Effondrement contrôlé des paradoxes!"
execute_command "Σ[ALL_POSSIBILITIES]" "Claudius: Compilation de toutes les possibilités!"
execute_command "FORGE(REALITY_CORE, livre_vide_sans_nom)" "Chlamydius: Création de la prison!"

# Scellement final
execute_command "SEAL(Omega-Zero, IN:livre_vide_sans_nom)" "SCELLEMENT D'OMEGA-ZÉRO!"

# Vérification du résultat
echo -e "\n\n📊 === RÉSULTAT FINAL ==="
curl -s "$API_URL/games/$GAME_ID/state" | grep -E "(currentTurn|winner|status)" | sed 's/,/\n/g' | sed 's/^/   /'

echo -e "\n\n🏆 === ÉPILOGUE ==="
echo "Dans les marges du livre, une note apparaît..."
echo "'L'encre sèche, mais les mots restent. - Ω'"
echo ""
echo "Le Treizième Codex est scellé. Pour l'instant."
echo ""
echo "🔮 ========================================="
echo "   FIN DU TEST - LE TREIZIÈME CODEX"
echo "🔮 =========================================" 