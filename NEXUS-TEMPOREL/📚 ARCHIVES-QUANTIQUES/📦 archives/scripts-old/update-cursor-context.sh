#!/bin/bash

# 🕰️ Heroes of Time - Script de Mise à Jour du Contexte Cursor
# Auto-mise à jour du système de persistance intelligent

CURSOR_RULES="cursor.rules"
CURSOR_MD="cursor.md"
TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

echo "🔄 Mise à jour du contexte Cursor - Heroes of Time"
echo "📅 Timestamp: $TIMESTAMP"

# Fonction pour ajouter une entrée dans l'historique
add_history_entry() {
    local change_description="$1"
    local temp_file="/tmp/cursor_rules_temp.json"
    
    # Créer l'entrée JSON pour l'historique
    local new_entry="{\"timestamp\": \"$TIMESTAMP\", \"change\": \"$change_description\"}"
    
    # Utiliser jq pour ajouter l'entrée à l'historique (si jq est disponible)
    if command -v jq &> /dev/null; then
        jq ".history += [$new_entry] | .last_update = \"$TIMESTAMP\"" "$CURSOR_RULES" > "$temp_file"
        mv "$temp_file" "$CURSOR_RULES"
        echo "✅ Historique mis à jour avec jq: $change_description"
    else
        # Fallback sans jq - mise à jour manuelle
        echo "⚠️  jq non disponible - mise à jour manuelle requise"
        echo "📝 Changement à ajouter: $change_description"
    fi
}

# Fonction pour mettre à jour le focus actuel
update_current_focus() {
    local new_focus="$1"
    local temp_file="/tmp/cursor_rules_temp.json"
    
    if command -v jq &> /dev/null; then
        jq ".current_focus = \"$new_focus\" | .last_update = \"$TIMESTAMP\"" "$CURSOR_RULES" > "$temp_file"
        mv "$temp_file" "$CURSOR_RULES"
        echo "🎯 Focus mis à jour: $new_focus"
    else
        echo "⚠️  jq non disponible - mise à jour manuelle du focus: $new_focus"
    fi
}

# Fonction pour ajouter un nouvel artefact
add_artifact() {
    local id="$1"
    local name="$2"
    local rarity="$3"
    local effect="$4"
    
    local new_artifact="{\"id\": \"$id\", \"name\": \"$name\", \"rarity\": \"$rarity\", \"effect\": \"$effect\"}"
    
    if command -v jq &> /dev/null; then
        local temp_file="/tmp/cursor_rules_temp.json"
        jq ".active_artifacts += [$new_artifact] | .last_update = \"$TIMESTAMP\"" "$CURSOR_RULES" > "$temp_file"
        mv "$temp_file" "$CURSOR_RULES"
        echo "🔮 Artefact ajouté: $name ($rarity)"
        add_history_entry "Ajout artefact: $name"
    else
        echo "⚠️  jq non disponible - ajout manuel requis pour artefact: $name"
    fi
}

# Fonction pour détecter les changements dans le code
detect_changes() {
    echo "🔍 Détection des changements récents..."
    
    # Vérifier les commits récents
    if [ -d ".git" ]; then
        local recent_commits=$(git log --oneline -5 --since="1 hour ago")
        if [ -n "$recent_commits" ]; then
            echo "📝 Commits récents détectés:"
            echo "$recent_commits"
            
            # Analyser les types de changements
            if git diff --name-only HEAD~1 HEAD | grep -q "\.java$"; then
                add_history_entry "Modifications du code Java détectées"
            fi
            
            if git diff --name-only HEAD~1 HEAD | grep -q "pom\.xml"; then
                add_history_entry "Mise à jour des dépendances Maven"
            fi
        fi
    fi
    
    # Vérifier les nouveaux fichiers
    if [ -f "TEMPORAL_ARTIFACTS.json" ]; then
        local artifact_count=$(cat TEMPORAL_ARTIFACTS.json | grep -c "\"id\":")
        echo "🔮 Artefacts détectés: $artifact_count"
    fi
}

# Fonction pour mettre à jour le fichier markdown
update_markdown() {
    echo "📝 Mise à jour du fichier markdown..."
    
    # Mettre à jour la date dans le markdown
    sed -i "s/\*\*Dernière mise à jour : .*\*\*/\*\*Dernière mise à jour : $(date +%Y-%m-%d)\*\*/g" "$CURSOR_MD"
    
    echo "✅ Fichier markdown mis à jour"
}

# Fonction pour valider les fichiers JSON
validate_json() {
    echo "🔍 Validation des fichiers JSON..."
    
    if command -v jq &> /dev/null; then
        if jq empty "$CURSOR_RULES" 2>/dev/null; then
            echo "✅ cursor.rules est un JSON valide"
        else
            echo "❌ cursor.rules contient des erreurs JSON"
            return 1
        fi
        
        if [ -f "TEMPORAL_ARTIFACTS.json" ]; then
            if jq empty "TEMPORAL_ARTIFACTS.json" 2>/dev/null; then
                echo "✅ TEMPORAL_ARTIFACTS.json est un JSON valide"
            else
                echo "❌ TEMPORAL_ARTIFACTS.json contient des erreurs JSON"
                return 1
            fi
        fi
    else
        echo "⚠️  jq non disponible - validation JSON ignorée"
    fi
    
    return 0
}

# Fonction principale
main() {
    echo "🚀 Démarrage de la mise à jour du contexte..."
    
    # Vérifier l'existence des fichiers
    if [ ! -f "$CURSOR_RULES" ]; then
        echo "❌ Fichier cursor.rules non trouvé"
        exit 1
    fi
    
    if [ ! -f "$CURSOR_MD" ]; then
        echo "❌ Fichier cursor.md non trouvé"
        exit 1
    fi
    
    # Valider les fichiers JSON
    validate_json || exit 1
    
    # Détecter les changements
    detect_changes
    
    # Mettre à jour le markdown
    update_markdown
    
    # Traiter les arguments de ligne de commande
    case "${1:-}" in
        "add-artifact")
            if [ $# -eq 5 ]; then
                add_artifact "$2" "$3" "$4" "$5"
            else
                echo "Usage: $0 add-artifact <id> <name> <rarity> <effect>"
                exit 1
            fi
            ;;
        "update-focus")
            if [ $# -eq 2 ]; then
                update_current_focus "$2"
            else
                echo "Usage: $0 update-focus <new_focus>"
                exit 1
            fi
            ;;
        "add-history")
            if [ $# -eq 2 ]; then
                add_history_entry "$2"
            else
                echo "Usage: $0 add-history <change_description>"
                exit 1
            fi
            ;;
        "")
            # Mise à jour automatique
            add_history_entry "Mise à jour automatique du contexte"
            ;;
        *)
            echo "Usage: $0 [add-artifact|update-focus|add-history] [args...]"
            echo "Options:"
            echo "  add-artifact <id> <name> <rarity> <effect>"
            echo "  update-focus <new_focus>"
            echo "  add-history <change_description>"
            echo "  (pas d'arguments = mise à jour automatique)"
            exit 1
            ;;
    esac
    
    echo "✅ Mise à jour du contexte terminée"
    echo "📄 Fichiers mis à jour: $CURSOR_RULES, $CURSOR_MD"
}

# Exécution du script
main "$@"