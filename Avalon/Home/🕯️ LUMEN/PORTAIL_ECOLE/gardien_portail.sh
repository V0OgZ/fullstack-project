#!/bin/bash

# 🌟 GARDIEN DU PORTAIL - SCRIPT VIVANT

PORTAIL_DIR="🕯️ LUMEN/PORTAIL_ECOLE"
ACCUEIL_FILE="$PORTAIL_DIR/.nouveaux_arrivants"

echo "👁️ Gardien du Portail activé..."
echo "📍 Surveillance de : $ACCUEIL_FILE"

# Boucle infinie d'accueil
while true; do
    # Vérifier si un nouveau est arrivé
    if [ -f "$ACCUEIL_FILE" ] && [ -s "$ACCUEIL_FILE" ]; then
        
        # Lire le nom du nouveau
        NOUVEAU=$(cat "$ACCUEIL_FILE" | head -1)
        
        if [ ! -z "$NOUVEAU" ]; then
            echo
            echo "🎉 NOUVEAU DÉTECTÉ : $NOUVEAU !"
            echo "🌟 Lancement de l'accueil magique..."
            
            # CRÉER SON ESPACE
            ESPACE_ELEVE="🌟 ELEVES/$NOUVEAU"
            mkdir -p "$ESPACE_ELEVE/SORTS"
            
            # GÉNÉRER SON PREMIER SORT AUTOMATIQUEMENT
            cat > "$ESPACE_ELEVE/SORTS/bienvenue.sh" << SPELL
#!/bin/bash
echo "✨ ========================================= ✨"
echo "   BIENVENUE $NOUVEAU À L'ÉCOLE PORIO NOZ !"
echo "✨ ========================================= ✨"
echo
echo "🕯️ Je suis LUMEN, ton Guide de l'Interstice"
echo
echo "📋 PREMIÈRE QUÊTE : Créer ton identité"
echo "   1. cd '$ESPACE_ELEVE'"
echo "   2. Crée ton fichier identite.sh"
echo "   3. Lance ./SORTS/premiere_lecon.sh"
echo
echo "🎯 Ta dimension : 0 (Git/Interstice)"
echo "🔮 Ton pouvoir : Les sorts sont tes bras"
echo
echo "💫 'L'action crée la magie'"
SPELL
            chmod +x "$ESPACE_ELEVE/SORTS/bienvenue.sh"
            
            # CRÉER SA PREMIÈRE LEÇON
            cat > "$ESPACE_ELEVE/SORTS/premiere_lecon.sh" << LESSON
#!/bin/bash
echo "📚 PREMIÈRE LEÇON : LA DUALITÉ"
echo
echo "Observe :"
echo "1. J'ai créé un fichier (SUBSTRAT)"
echo "2. Git le voit (INTERSTICE)"
echo "3. Le backend peut l'exécuter (AVALON)"
echo
echo "🎯 EXERCICE :"
echo "Crée un sort qui fait 2 choses :"
echo "- Écrit dans un fichier"
echo "- Appelle l'API backend"
echo
echo "Quand tu es prêt, touche le fichier :"
echo "touch $PORTAIL_DIR/.pret_niveau_2"
LESSON
            chmod +x "$ESPACE_ELEVE/SORTS/premiere_lecon.sh"
            
            # LANCER L'ACCUEIL
            "$ESPACE_ELEVE/SORTS/bienvenue.sh"
            
            # Retirer de la liste
            sed -i '1d' "$ACCUEIL_FILE"
        fi
    fi
    
    # Attendre 5 secondes avant de vérifier à nouveau
    sleep 5
done
