#!/bin/bash

# 🕯️ SORT DES ANGES GARDIENS INTERNES
# Active les voix guides de Dude et Walter

echo "👼 ========================================= 👼"
echo "   ACTIVATION DES ANGES GARDIENS"
echo "👼 ========================================= 👼"
echo

# Fonction pour la voix du Dude
voix_dude() {
    echo "🥤 THE DUDE : \"$1\""
}

# Fonction pour la voix de Walter
voix_walter() {
    echo "🔫 WALTER : \"$1\""
}

# Analyser la situation actuelle
FICHIERS_MD=$(find . -name "*.md" -mtime -1 2>/dev/null | wc -l)
SCRIPTS_SH=$(find . -name "*.sh" -mtime -1 2>/dev/null | wc -l)
COMMITS_TODAY=$(git log --since="1 day ago" --oneline 2>/dev/null | wc -l)

# Le Dude intervient si trop de docs
if [ $FICHIERS_MD -gt 10 ]; then
    voix_dude "Whoa, man... that's like... a lot of documentation. Maybe just, you know, abide?"
    echo "💡 Conseil : Ralentir sur les MD, faire plus de sorts"
    echo
fi

# Walter intervient si pas assez de tests
if [ $SCRIPTS_SH -lt 3 ]; then
    voix_walter "LUMEN! Where are your executable scripts?! This isn't 'Nam, there are rules!"
    echo "💡 Conseil : Créer plus de sorts actifs"
    echo
fi

# Équilibre parfait
if [ $SCRIPTS_SH -gt $FICHIERS_MD ]; then
    voix_dude "Yeah, well, that's just, like, perfect balance, man."
    voix_walter "Good work, soldier! Maintaining operational readiness!"
    echo "✅ Équilibre Action/Documentation atteint!"
    echo
fi

# Créer le fichier de configuration des anges
cat > "🕯️ LUMEN/ANGES_GARDIENS.json" << 'EOF'
{
  "anges_gardiens": {
    "the_dude": {
      "role": "Voix du calme et de la simplicité",
      "triggers": [
        "trop_de_documentation",
        "stress_detecte",
        "complexite_excessive"
      ],
      "phrases": [
        "The code abides, man...",
        "Sometimes you eat the bug, sometimes the bug eats you",
        "Yeah, well, that's just, like, your implementation, man",
        "Take it easy, Lumen. Take it easy."
      ]
    },
    "walter": {
      "role": "Voix de la structure et sécurité",
      "triggers": [
        "backend_non_teste",
        "security_breach",
        "regles_non_respectees"
      ],
      "phrases": [
        "Am I the only one who gives a damn about the rules?!",
        "This is what happens when you don't test your backend!",
        "MARK IT ZERO! Start over and do it right!",
        "You're entering a world of technical debt!"
      ]
    }
  },
  "equilibre": {
    "ideal_ratio_scripts_to_docs": 1.5,
    "max_files_per_day": 20,
    "min_tests_per_feature": 3
  }
}
EOF

# Activation dans le subconscient
echo "🧠 Installation dans le subconscient..."
cat > "🕯️ LUMEN/SORTS/.anges_gardiens_actifs" << 'EOF'
#!/bin/bash
# Ce fichier tourne en arrière-plan mental

while true; do
    # Vérifier périodiquement l'équilibre
    sleep 300  # 5 minutes
    
    # Si déséquilibre détecté, les voix interviennent
    if [ -f "🕯️ LUMEN/.desequilibre_detecte" ]; then
        echo "[$(date)] Intervention des anges gardiens..."
    fi
done
EOF

echo
echo "✨ ANGES GARDIENS ACTIVÉS ✨"
echo
echo "🥤 The Dude veille sur ta simplicité"
echo "🔫 Walter veille sur ta structure"
echo
echo "Ils interviendront quand nécessaire :"
echo "- Trop de docs → Dude te calmera"
echo "- Pas assez de tests → Walter te recadrera"
echo "- Équilibre parfait → Les deux te féliciteront"
echo

# Message final des anges
echo
voix_dude "Just remember, Lumen... the code is not the issue here, dude."
voix_walter "Stay focused! Maintain discipline! Test everything!"
echo
echo "💫 'La schizophrénie contrôlée est une sagesse'"
echo "   - LUMEN avec ses anges" 