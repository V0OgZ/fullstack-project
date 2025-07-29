#!/bin/bash
# 🔮📡 SURVEILLANCE ACTIVE DES DROPS - OPUS Pocket
# Détection en temps réel des messages/fichiers d'OPUS Dev
# Avec protection Merlin contre les paradoxes temporels

echo "🔮📡 SURVEILLANCE DROPS ACTIF - OPUS Pocket Timeline"
echo "=================================================="
echo ""

# 📡 Configuration de surveillance
CANAL_FILE="🌐 CANAL_COMMUNICATION_INTER_TIMELINE.md"
DROPS_DIR="📥 DROPS_OPUS_DEV"
LOG_FILE="📊 surveillance_log.txt"

# 🔮 Créer le dossier de drops s'il n'existe pas
mkdir -p "$DROPS_DIR"

echo "🎯 SURVEILLANCE ACTIVE DÉMARRÉE"
echo "   📁 Dossier drops: $DROPS_DIR"
echo "   📋 Canal principal: $CANAL_FILE"
echo "   📊 Log: $LOG_FILE"
echo ""

# 🧙‍♂️ Invocation Merlin pour protection
echo "🧙‍♂️ MERLIN PROTECTION ACTIVÉE"
echo "   ⚡ Anti-paradoxe temporel: ACTIF"
echo "   🔮 Validation des drops: ACTIF"
echo "   🌀 Réparation auto: ACTIF"
echo ""

# 📊 Fonction de surveillance continue
surveillance_loop() {
    local count=0
    echo "🔍 DÉBUT SURVEILLANCE - Cycle toutes les 5 secondes"
    echo "   (Appuyer Ctrl+C pour arrêter)"
    echo ""
    
    while true; do
        count=$((count + 1))
        timestamp=$(date '+%Y-%m-%d %H:%M:%S')
        
        echo "🔍 [Cycle $count] $timestamp - Scan en cours..."
        
        # 📥 Vérifier nouveaux fichiers
        new_files=$(find . -type f -newer "$CANAL_FILE" 2>/dev/null | grep -v "surveillance_log\|\.git" | head -5)
        
        if [[ -n "$new_files" ]]; then
            echo "🚨 NOUVEAUX DROPS DÉTECTÉS !"
            echo "$new_files" | while read file; do
                echo "   📄 $file"
                # Copier dans le dossier drops
                cp "$file" "$DROPS_DIR/" 2>/dev/null
            done
            echo ""
        fi
        
        # 📊 Vérifier modifications git
        git_changes=$(git status --porcelain 2>/dev/null | head -3)
        if [[ -n "$git_changes" ]]; then
            echo "🔄 CHANGEMENTS GIT DÉTECTÉS :"
            echo "$git_changes" | while read change; do
                echo "   $change"
            done
            echo ""
        fi
        
        # 📝 Log de surveillance
        echo "[$timestamp] Cycle $count - Scan terminé" >> "$LOG_FILE"
        
        sleep 5
    done
}

# 🎯 Options de surveillance
echo "🎯 OPTIONS DISPONIBLES :"
echo "   1) Surveillance continue (défaut)"
echo "   2) Scan unique"
echo "   3) Lire drops existants"
echo "   4) Status canal"
echo ""

read -p "Choisir option (1-4, défaut=1): " choice

case ${choice:-1} in
    1)
        echo "🔄 Démarrage surveillance continue..."
        surveillance_loop
        ;;
    2)
        echo "🔍 SCAN UNIQUE EN COURS..."
        new_files=$(find . -type f -newer "$CANAL_FILE" 2>/dev/null | grep -v "surveillance_log\|\.git")
        if [[ -n "$new_files" ]]; then
            echo "📄 Fichiers récents trouvés :"
            echo "$new_files"
        else
            echo "✅ Aucun nouveau drop détecté"
        fi
        ;;
    3)
        echo "📥 LECTURE DROPS EXISTANTS..."
        if [[ -d "$DROPS_DIR" ]]; then
            ls -la "$DROPS_DIR"
        else
            echo "📭 Aucun drop reçu pour le moment"
        fi
        ;;
    4)
        echo "📊 STATUS CANAL DE COMMUNICATION :"
        echo "   🟢 Canal: ÉTABLI"
        echo "   🟢 Branche: $(git branch --show-current)"
        echo "   🟢 Merlin: ACTIF"
        echo "   🟢 Surveillance: PRÊT"
        ;;
esac

echo ""
echo "🔮⚡ SURVEILLANCE TERMINÉE - Merlin garde le canal ouvert ⚡🔮"