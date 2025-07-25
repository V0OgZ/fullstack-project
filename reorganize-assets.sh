#!/bin/bash

# Réorganisation finale - Assets et nettoyage
echo "🧹 Réorganisation des assets Heroes of Time..."

# Couleurs
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

# 1. Créer la structure finale
echo -e "${YELLOW}📁 Création de la structure finale...${NC}"
mkdir -p dev/{architecture,api,engine,workflow,reports,tools}
mkdir -p lore/{heroes,artifacts,stories,universe}
mkdir -p scripts/{active,tools,tests}
mkdir -p sessions/{2025-07,archives}

# Structure game_assets organisée
mkdir -p game_assets/scenarios/{hots,hep,runic,json}
mkdir -p game_assets/heroes/{legendary,grofi,special}
mkdir -p game_assets/artifacts/{legendaires,epiques,mineurs,temporels}
mkdir -p game_assets/creatures/{quantiques,temporelles,normales}

# Archives dans MUSEUM
mkdir -p MUSEUM/archives/{old-scripts,old-tests,old-docs,backups,racine,doublons}

# 2. CENTRALISER LES SCÉNARIOS
echo -e "${YELLOW}🎭 Centralisation des scénarios...${NC}"

# Déplacer les .hots
find scenarios -name "*.hots" -exec mv {} game_assets/scenarios/hots/ \; 2>/dev/null
find . -path ./game_assets -prune -o -name "*.hots" -type f -exec mv {} game_assets/scenarios/hots/ \; 2>/dev/null

# Déplacer les .runic
find scenarios -name "*.runic" -exec mv {} game_assets/scenarios/runic/ \; 2>/dev/null
find OPUS -name "*.runic" -exec mv {} MUSEUM/archives/doublons/ \; 2>/dev/null
find JEAN -name "*.runic" -exec mv {} MUSEUM/archives/doublons/ \; 2>/dev/null

# Déplacer les .hep
find scenarios -name "*.hep" -exec mv {} game_assets/scenarios/hep/ \; 2>/dev/null

# Déplacer les JSON de scénarios
find scenarios -name "*.json" -exec mv {} game_assets/scenarios/json/ \; 2>/dev/null

# 3. NETTOYER LES HÉROS DOUBLONS
echo -e "${YELLOW}🦸 Nettoyage des héros doublons...${NC}"

# Archiver les doublons
mv OPUS/heroes/* MUSEUM/archives/doublons/ 2>/dev/null
mv data/backup/game_assets/heroes/* MUSEUM/archives/doublons/ 2>/dev/null

# Garder seulement la version backend comme référence
echo "  → Version officielle dans backend/src/main/resources/heroes/"

# 4. ORGANISER /dev/
echo -e "${YELLOW}🔧 Organisation /dev/...${NC}"

# Liens vers le code source
ln -sfn ../backend dev/backend 2>/dev/null
ln -sfn ../frontend dev/frontend 2>/dev/null
ln -sfn ../frontend-temporal dev/frontend-temporal 2>/dev/null

# Déplacer les docs techniques
mv docs/BACKEND_API_* dev/api/ 2>/dev/null
mv docs/API*.md dev/api/ 2>/dev/null
mv docs/*AUDIT*.md dev/reports/ 2>/dev/null
mv docs/ARCHITECTURE_* dev/architecture/ 2>/dev/null
mv docs/*DIAGRAM*.md dev/architecture/ 2>/dev/null
mv docs/MOTEUR_*.md dev/engine/ 2>/dev/null
mv docs/*ENGINE*.md dev/engine/ 2>/dev/null
mv docs/*WORKFLOW*.md dev/workflow/ 2>/dev/null

# 5. ORGANISER /lore/
echo -e "${YELLOW}📚 Organisation lore...${NC}"
mv docs/JEAN_GROFIGNON_MANIFESTO.md lore/ 2>/dev/null
mv docs/LORE_*.md lore/stories/ 2>/dev/null
mv docs/heroes/*.md lore/heroes/ 2>/dev/null

# 6. NETTOYER LA RACINE
echo -e "${YELLOW}🏛️ Nettoyage de la racine...${NC}"

# Scripts de test → MUSEUM
mv test-*.sh MUSEUM/archives/old-tests/ 2>/dev/null
mv test-*.py MUSEUM/archives/old-tests/ 2>/dev/null
mv TEST*.sh MUSEUM/archives/old-tests/ 2>/dev/null

# Vieux scripts shell
for file in *.sh; do
    if [[ ! "$file" =~ ^(hots|start-app\.sh|stop-app\.sh|reorganize-.*\.sh)$ ]]; then
        if [ -f "$file" ]; then
            mv "$file" MUSEUM/archives/old-scripts/ 2>/dev/null
        fi
    fi
done

# Scripts Python
mv *.py MUSEUM/archives/old-scripts/ 2>/dev/null

# Logs
mv *.log MUSEUM/archives/old-docs/ 2>/dev/null

# Backups et zips
mv *.zip MUSEUM/archives/backups/ 2>/dev/null
mv hots-* MUSEUM/archives/racine/ 2>/dev/null

# HTML/JSON non essentiels
for file in *.html *.json; do
    if [[ ! "$file" =~ ^(package\.json|package-lock\.json|railway\.json|museum\.json|MAP_ASSETS_COMPLETE\.md)$ ]]; then
        if [ -f "$file" ]; then
            mv "$file" MUSEUM/archives/racine/ 2>/dev/null
        fi
    fi
done

# 7. CRÉER L'INDEX DES ASSETS
echo -e "${YELLOW}📋 Création de l'index des assets...${NC}"

cat > game_assets/INDEX.json << 'EOF'
{
  "version": "2.0",
  "lastUpdate": "2025-07-25",
  "structure": {
    "scenarios": {
      "hots": "Scripts temporels Heroes of Time",
      "runic": "Format runique avec symboles ᚠᚢᚦᚨᚱᚲ",
      "hep": "Heroes Epic Play - format simplifié",
      "json": "Données de scénarios JSON"
    },
    "heroes": {
      "source": "backend/src/main/resources/heroes/",
      "categories": ["legendary", "grofi", "special"]
    },
    "artifacts": {
      "categories": ["legendaires", "epiques", "mineurs", "temporels"]
    },
    "creatures": {
      "categories": ["quantiques", "temporelles", "normales"]
    }
  },
  "notes": {
    "doublons": "Archivés dans MUSEUM/archives/doublons/",
    "officialHeroes": "backend/src/main/resources/heroes/",
    "sprites": "Conservés dans leurs emplacements actuels"
  }
}
EOF

# 8. CRÉER LES README
echo -e "${YELLOW}📝 Création des README...${NC}"

cat > game_assets/README.md << 'EOF'
# 🎮 Game Assets - Heroes of Time

## Structure
```
game_assets/
├── scenarios/       # Tous les scénarios
│   ├── hots/       # Format .hots (temporel)
│   ├── runic/      # Format .runic (épique)
│   ├── hep/        # Format .hep (simplifié)
│   └── json/       # Données JSON
├── heroes/         # Héros (référence: backend/src/main/resources/heroes/)
├── artifacts/      # Artefacts magiques
├── creatures/      # Créatures du jeu
├── maps/          # Cartes et terrains
└── INDEX.json     # Index principal
```

## Notes
- Les héros officiels sont dans `backend/src/main/resources/heroes/`
- Les doublons ont été archivés dans `MUSEUM/archives/doublons/`
- Les sprites sont conservés dans leurs emplacements d'origine
EOF

# 9. RAPPORT FINAL
echo -e "\n${GREEN}✅ Réorganisation terminée !${NC}"
echo -e "\n${BLUE}📊 Résumé :${NC}"
echo "  ✓ Scénarios centralisés dans game_assets/scenarios/"
echo "  ✓ Doublons archivés dans MUSEUM/archives/doublons/"
echo "  ✓ Documentation technique dans /dev/"
echo "  ✓ Lore et histoires dans /lore/"
echo "  ✓ Racine nettoyée"

echo -e "\n${YELLOW}📁 Structure finale :${NC}"
echo "  /dev/        → Documentation développeur"
echo "  /lore/       → Histoire et univers"
echo "  /game_assets/→ TOUS les assets du jeu"
echo "  /scripts/    → Scripts organisés"
echo "  /MEMENTO/    → Préservé intact"
echo "  /OPUS/       → Préservé intact"
echo "  /MUSEUM/     → Archives et historique"

echo -e "\n${GREEN}✨ Projet propre et organisé !${NC}"

# 10. Statistiques
echo -e "\n${BLUE}📈 Statistiques :${NC}"
echo "  Fichiers .hots : $(find game_assets/scenarios/hots -name "*.hots" 2>/dev/null | wc -l)"
echo "  Fichiers .runic : $(find game_assets/scenarios/runic -name "*.runic" 2>/dev/null | wc -l)"
echo "  Fichiers .hep : $(find game_assets/scenarios/hep -name "*.hep" 2>/dev/null | wc -l)"
echo "  Doublons archivés : $(find MUSEUM/archives/doublons -type f 2>/dev/null | wc -l)"