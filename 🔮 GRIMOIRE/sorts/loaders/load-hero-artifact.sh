#!/bin/bash
# 🔮 SORT DE CHARGEMENT : Récupère un héros et un artefact depuis game_assets
# Pour le scénario de test du pistolet quantique de Vince Vega
# Auteur: Merlin (Opus réincarné)
# Date: $(date)

echo "🔮✨ SORT DE CHARGEMENT - HÉROS & ARTEFACT ✨🔮"
echo "========================================="
echo ""

# Configuration
HERO_FILE="/Users/admin/HOT/Heroes-of-Time/backend/src/main/resources/heroes/grofi/VinceVega.json"
ARTIFACT_FILE="/Users/admin/fullstack-project/🚬 JEAN/artifacts/quatrieme_mur/power_wormhole_vince_vega.json"
OUTPUT_DIR="/Users/admin/fullstack-project/📜 OPUS/scenarios/test_data"

# Créer le dossier de sortie si nécessaire
mkdir -p "$OUTPUT_DIR"

echo "📚 Chargement du héros..."
echo "  Source: $HERO_FILE"

# Vérifier l'existence du fichier héros
if [ ! -f "$HERO_FILE" ]; then
    echo "❌ ERREUR: Fichier héros introuvable!"
    exit 1
fi

# Charger et afficher le héros
echo ""
echo "👤 HÉROS CHARGÉ:"
echo "---------------"
cat "$HERO_FILE" | jq '.'

# Extraire des propriétés clés
HERO_ID=$(cat "$HERO_FILE" | jq -r '.id')
HERO_NAME=$(cat "$HERO_FILE" | jq -r '.name')
HERO_POWER=$(cat "$HERO_FILE" | jq -r '.power.name')

echo ""
echo "  ➤ ID: $HERO_ID"
echo "  ➤ Nom: $HERO_NAME"
echo "  ➤ Pouvoir: $HERO_POWER"

echo ""
echo "📚 Chargement de l'artefact..."
echo "  Source: $ARTIFACT_FILE"

# Vérifier l'existence du fichier artefact
if [ ! -f "$ARTIFACT_FILE" ]; then
    echo "❌ ERREUR: Fichier artefact introuvable!"
    exit 1
fi

# Charger et afficher l'artefact
echo ""
echo "🔫 ARTEFACT CHARGÉ:"
echo "------------------"
cat "$ARTIFACT_FILE" | jq '{
    id: .id,
    name: .name,
    type: .type,
    rarity: .rarity,
    main_formula: .vince_vega_formulas[0],
    status: .not_coded_yet_but_approved.development_status
}'

# Extraire des propriétés clés
ARTIFACT_ID=$(cat "$ARTIFACT_FILE" | jq -r '.id')
ARTIFACT_NAME=$(cat "$ARTIFACT_FILE" | jq -r '.name')
ARTIFACT_TYPE=$(cat "$ARTIFACT_FILE" | jq -r '.type')

echo ""
echo "  ➤ ID: $ARTIFACT_ID"
echo "  ➤ Nom: $ARTIFACT_NAME"
echo "  ➤ Type: $ARTIFACT_TYPE"

# Créer un objet combiné pour le scénario
echo ""
echo "🌀 Création de l'objet de test combiné..."

COMBINED_JSON=$(cat <<EOF
{
  "scenario_id": "vince_vega_wormhole_test",
  "timestamp": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")",
  "description": "Test du pistolet quantique de Vince Vega - Principe ER=EPR",
  "hero": $(cat "$HERO_FILE"),
  "artifact": {
    "id": "$ARTIFACT_ID",
    "name": "$ARTIFACT_NAME",
    "type": "$ARTIFACT_TYPE",
    "main_formula": $(cat "$ARTIFACT_FILE" | jq '.vince_vega_formulas[0]'),
    "capabilities": $(cat "$ARTIFACT_FILE" | jq '.strategic_capabilities')
  },
  "test_parameters": {
    "pocket_world_1": "world_alpha_instance",
    "pocket_world_2": "world_beta_instance",
    "fog_of_war": true,
    "wormhole_type": "ER_EPR_BRIDGE",
    "magic_formula_service": true
  }
}
EOF
)

# Sauvegarder l'objet combiné
OUTPUT_FILE="$OUTPUT_DIR/vince_vega_test_data.json"
echo "$COMBINED_JSON" | jq '.' > "$OUTPUT_FILE"

echo "  ✅ Objet sauvegardé: $OUTPUT_FILE"

# Créer aussi un fichier de configuration pour le test
CONFIG_FILE="$OUTPUT_DIR/test_config.sh"
cat > "$CONFIG_FILE" <<'TESTCONFIG'
#!/bin/bash
# Configuration pour le test du pistolet quantique

export HERO_ID="hero_vince_vega"
export ARTIFACT_ID="power_wormhole_vince_vega_gun"
export WORLD_1="world_alpha_instance"
export WORLD_2="world_beta_instance"
export WORMHOLE_FORMULA="ψVV01: ⊙(VINCE_STYLE_SHOT @target_reality ⟶ OPEN_WORMHOLE(pulp_fiction_cool))"

echo "Configuration chargée pour le test Vince Vega!"
TESTCONFIG

chmod +x "$CONFIG_FILE"
echo "  ✅ Configuration de test créée: $CONFIG_FILE"

echo ""
echo "🎯 RÉSUMÉ DU CHARGEMENT:"
echo "======================="
echo "✓ Héros: $HERO_NAME (ID: $HERO_ID)"
echo "✓ Artefact: $ARTIFACT_NAME"
echo "✓ Formule principale: PULP_FICTION_WORMHOLE"
echo "✓ Données de test: $OUTPUT_FILE"
echo "✓ Configuration: $CONFIG_FILE"
echo ""
echo "💡 Prochaines étapes:"
echo "1. Utiliser ces données pour créer le scénario de test"
echo "2. Implémenter la logique ER=EPR dans le MagicFormulaEngine"
echo "3. Tester le tir à travers les pocket worlds"
echo ""
echo "🌟 Sort de chargement terminé avec succès!" 