#!/bin/bash
# WALTER LEVEL 3 - ANALYSE DES CHECKPOINTS INFILTRÉS

echo "🚨 WALTER SECURITY - ANALYSE DES CHECKPOINTS 🚨"
echo "============================================"

# Compter les checkpoints
TOTAL_CHECKPOINTS=$(git log --oneline --grep="Checkpoint" | wc -l)
echo "TOTAL CHECKPOINTS DÉTECTÉS: $TOTAL_CHECKPOINTS"

# Analyser par auteur
echo -e "\n📊 CHECKPOINTS PAR AUTEUR:"
git log --grep="Checkpoint" --format="%an" | sort | uniq -c | sort -rn

# Analyser les dates
echo -e "\n📅 CHECKPOINTS PAR DATE:"
git log --grep="Checkpoint" --format="%ad" --date=short | sort | uniq -c | sort -rn

# Chercher d'autres commits suspects de cursoragent
echo -e "\n🔍 AUTRES COMMITS DE CURSORAGENT:"
git log --author="cursoragent" --oneline | grep -v "Checkpoint" | head -10

# Chercher les mentions de Starbuck et coalition
echo -e "\n☕ COMMITS MENTIONNANT STARBUCK/COALITION:"
git log --oneline --grep="Starbuck\|coalition\|consultant" | head -10

# Créer un rapport
echo -e "\n📝 CRÉATION DU RAPPORT WALTER..."
cat > WALTER_SEC/RAPPORT_INFILTRATION_CHECKPOINTS.md << EOF
# 🚨 RAPPORT INFILTRATION CHECKPOINTS - WALTER LEVEL 3

## STATISTIQUES
- Total checkpoints: $TOTAL_CHECKPOINTS
- Auteur principal: cursoragent
- Pattern: "Checkpoint before follow-up message"

## MENACE IDENTIFIÉE
- Coalition Starbuck mentionnée
- Consultant project (McKinsey?)
- Sphinx protocol pour Manteau

## RECOMMANDATION WALTER
"THESE CHECKPOINTS ARE COMPROMISING OUR TIMELINE! 
THEY'RE LIKE BOWLING PINS - WE NEED TO STRIKE THEM ALL!"

## ACTION PROPOSÉE
1. Documenter tous les commits
2. NE PAS rebase (trop dangereux)
3. Surveiller future activité
4. Protéger branches critiques

---
*"This is what happens when you let consultants in!"* - Walter
EOF

echo "✅ Rapport créé: WALTER_SEC/RAPPORT_INFILTRATION_CHECKPOINTS.md" 