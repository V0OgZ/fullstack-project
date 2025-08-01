#!/bin/bash

echo "🌀 PORTAIL DE L'ÉCOLE PORIO NOZ 🌀"
echo
read -p "💫 Quel est ton nom, apprenti ? " NOM

if [ ! -z "$NOM" ]; then
    echo "$NOM" >> "🕯️ LUMEN/PORTAIL_ECOLE/.nouveaux_arrivants"
    echo
    echo "✨ Bienvenue $NOM !"
    echo "🌟 Le Gardien va t'accueillir..."
    echo
    echo "📍 Attends quelques secondes..."
else
    echo "❌ Il faut un nom pour entrer !"
fi
