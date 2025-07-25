#!/bin/bash

# Réorganisation simple du projet Heroes of Time
echo "🧹 Réorganisation simple du projet..."

# Couleurs
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# 1. Créer la structure de base
echo -e "${YELLOW}📁 Création de la structure...${NC}"
mkdir -p dev/{backend,frontend,api,architecture}
mkdir -p lore/{heroes,artifacts,stories}
mkdir -p scripts/{active,tools,archive}
mkdir -p sessions/{2025-07,memento}
mkdir -p archive/{old-scripts,old-docs,backups}
mkdir -p game_assets

# 2. Déplacer le code dev
echo -e "${YELLOW}🔧 Organisation dev...${NC}"
# Backend et frontend restent où ils sont, on fait juste des liens
ln -sfn ../backend dev/backend 2>/dev/null
ln -sfn ../frontend dev/frontend 2>/dev/null
ln -sfn ../frontend-temporal dev/frontend-temporal 2>/dev/null

# Déplacer les docs techniques
mv docs/BACKEND_API_* dev/api/ 2>/dev/null
mv docs/ARCHITECTURE_* dev/architecture/ 2>/dev/null
mv docs/TECHNICAL.md dev/ 2>/dev/null
mv docs/API.md dev/api/ 2>/dev/null

# 3. Déplacer le lore
echo -e "${YELLOW}📚 Organisation lore...${NC}"
mv docs/JEAN_GROFIGNON_MANIFESTO.md lore/ 2>/dev/null
mv docs/LORE_*.md lore/stories/ 2>/dev/null
mv docs/heroes/*.md lore/heroes/ 2>/dev/null
mv game_assets/artifacts/*.json lore/artifacts/ 2>/dev/null

# 4. Organiser les scripts
echo -e "${YELLOW}📜 Organisation scripts...${NC}"
# Scripts actifs (utilisés dans hots)
cp scripts/actifs/* scripts/active/ 2>/dev/null
mv start-app.sh stop-app.sh scripts/active/ 2>/dev/null

# Tous les scripts de test dans archive
mv test-*.sh test-*.py scripts/archive/ 2>/dev/null
mv TEST*.sh scripts/archive/ 2>/dev/null

# 5. Organiser les sessions
echo -e "${YELLOW}📅 Organisation sessions...${NC}"
mv MEMENTO/* sessions/memento/ 2>/dev/null
mv memento-backup/* sessions/memento/ 2>/dev/null
mv docs-backup/* sessions/2025-07/ 2>/dev/null

# 6. Archiver le reste
echo -e "${YELLOW}📦 Archivage...${NC}"
mv *.log archive/old-docs/ 2>/dev/null
mv *.zip archive/backups/ 2>/dev/null
mv hots-* archive/old-scripts/ 2>/dev/null
mv MUSEUM archive/ 2>/dev/null

# 7. Créer les README
echo -e "${YELLOW}📝 Création des README...${NC}"

cat > dev/README.md << 'EOF'
# 🔧 Developer Documentation

## Quick Start
```bash
cd backend && mvn spring-boot:run
cd frontend && npm start
```

## Contents
- `/backend/` - Spring Boot backend
- `/frontend/` - React frontend
- `/api/` - API documentation
- `/architecture/` - System architecture

## For Players
Looking for game lore? Check `/lore/`
EOF

cat > lore/README.md << 'EOF'
# 📚 Heroes of Time - Lore & Universe

## Contents
- `/heroes/` - Hero descriptions and stories
- `/artifacts/` - Magical items and their powers
- `/stories/` - Epic tales and adventures

## Start Here
1. Read the Jean-Grofignon Manifesto
2. Discover the heroes
3. Learn about the artifacts

## For Developers
Technical docs are in `/dev/`
EOF

cat > sessions/INDEX.md << 'EOF'
# 📅 Session Archives

## Purpose
Historical record of the project development.
Memento's notes, session reports, and discoveries.

## Structure
- `/2025-07/` - July 2025 sessions
- `/memento/` - Memento's working notes

## Note
These are historical archives. For current docs, see `/dev/` or `/lore/`
EOF

# 8. Nettoyer les répertoires vides
echo -e "${YELLOW}🧹 Nettoyage final...${NC}"
find . -type d -empty -delete 2>/dev/null

echo -e "\n${GREEN}✅ Réorganisation terminée !${NC}"
echo -e "\nStructure finale :"
echo "  /dev/     → Documentation développeur"
echo "  /lore/    → Histoire et univers du jeu"
echo "  /scripts/ → Scripts organisés"
echo "  /sessions/→ Archives de travail"
echo "  /archive/ → Vieux fichiers"
echo -e "\n${YELLOW}Note : Les liens du README principal sont peut-être cassés.${NC}"
echo "Utilisez 'grep -r \"ancien-fichier\" .' pour retrouver les fichiers déplacés."