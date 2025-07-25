#!/bin/bash

# Réorganisation propre du projet Heroes of Time
# Garde MEMENTO, OPUS et MUSEUM (comme archives)
echo "🧹 Réorganisation propre du projet Heroes of Time..."

# Couleurs
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# 1. Créer la structure de base
echo -e "${YELLOW}📁 Création de la structure...${NC}"
mkdir -p dev/{architecture,api,engine,workflow,reports,tools}
mkdir -p lore/{heroes,artifacts,stories,universe}
mkdir -p scripts/{active,tools,tests}
mkdir -p sessions/{2025-07,archives}

# 2. PRÉSERVER LES RÉPERTOIRES IMPORTANTS
echo -e "${GREEN}✅ Préservation de MEMENTO, OPUS et MUSEUM...${NC}"
# MEMENTO, OPUS et MUSEUM restent où ils sont !

# 3. Créer la structure d'archives dans MUSEUM
echo -e "${YELLOW}🏛️ Organisation du MUSEUM comme archives...${NC}"
mkdir -p MUSEUM/archives/{old-scripts,old-tests,old-docs,backups,racine}

# 4. Organiser /dev/ proprement
echo -e "${YELLOW}🔧 Organisation /dev/...${NC}"

# Créer des liens symboliques pour le code source
ln -sfn ../backend dev/backend 2>/dev/null
ln -sfn ../frontend dev/frontend 2>/dev/null
ln -sfn ../frontend-temporal dev/frontend-temporal 2>/dev/null

# API docs
mv docs/BACKEND_API_* dev/api/ 2>/dev/null
mv docs/API*.md dev/api/ 2>/dev/null
mv docs/*AUDIT*.md dev/reports/ 2>/dev/null

# Architecture
mv docs/ARCHITECTURE_* dev/architecture/ 2>/dev/null
mv docs/*DIAGRAM*.md dev/architecture/ 2>/dev/null
mv docs/architecture/* dev/architecture/ 2>/dev/null

# Engine explanations
mv docs/MOTEUR_*.md dev/engine/ 2>/dev/null
mv docs/*ENGINE*.md dev/engine/ 2>/dev/null
mv docs/TECHNICAL.md dev/engine/ 2>/dev/null

# Workflow
mv docs/*WORKFLOW*.md dev/workflow/ 2>/dev/null
mv docs/*SETUP*.md dev/workflow/ 2>/dev/null

# Reports
mv rapports/*.md dev/reports/ 2>/dev/null
mv docs/*RAPPORT*.md dev/reports/ 2>/dev/null
mv docs/*REPORT*.md dev/reports/ 2>/dev/null

# 5. Déplacer le lore
echo -e "${YELLOW}📚 Organisation lore...${NC}"
mv docs/JEAN_GROFIGNON_MANIFESTO.md lore/ 2>/dev/null
mv docs/LORE_*.md lore/stories/ 2>/dev/null
mv docs/heroes/*.md lore/heroes/ 2>/dev/null
cp -r game_assets/artifacts/*.json lore/artifacts/ 2>/dev/null

# 6. Organiser les scripts
echo -e "${YELLOW}📜 Organisation scripts...${NC}"
# Scripts actifs (utilisés dans hots)
cp scripts/actifs/* scripts/active/ 2>/dev/null
cp start-app.sh stop-app.sh scripts/active/ 2>/dev/null

# Archiver tous les scripts de test dans MUSEUM
mv test-*.sh MUSEUM/archives/old-tests/ 2>/dev/null
mv test-*.py MUSEUM/archives/old-tests/ 2>/dev/null
mv TEST*.sh MUSEUM/archives/old-tests/ 2>/dev/null

# 7. Organiser les sessions (sans toucher à MEMENTO)
echo -e "${YELLOW}📅 Organisation sessions...${NC}"
mv memento-backup/* sessions/archives/ 2>/dev/null
mv docs-backup/* sessions/2025-07/ 2>/dev/null

# 8. Archiver dans MUSEUM tout le bordel de la racine
echo -e "${YELLOW}🏛️ Archivage dans MUSEUM...${NC}"
# Logs
mv *.log MUSEUM/archives/old-docs/ 2>/dev/null

# Zips et backups
mv *.zip MUSEUM/archives/backups/ 2>/dev/null
mv hots-* MUSEUM/archives/racine/ 2>/dev/null

# Fichiers HTML/JSON non essentiels
for file in *.html *.json *.hots; do
    if [[ ! "$file" =~ ^(package\.json|package-lock\.json|railway\.json|museum\.json)$ ]]; then
        if [ -f "$file" ]; then
            mv "$file" MUSEUM/archives/racine/ 2>/dev/null
        fi
    fi
done

# Scripts Python éparpillés
mv *.py MUSEUM/archives/old-scripts/ 2>/dev/null

# Tous les vieux scripts shell restants
for file in *.sh; do
    if [[ ! "$file" =~ ^(hots|start-app\.sh|stop-app\.sh|reorganize-.*\.sh)$ ]]; then
        if [ -f "$file" ]; then
            mv "$file" MUSEUM/archives/old-scripts/ 2>/dev/null
        fi
    fi
done

# 9. Créer les README
echo -e "${YELLOW}📝 Création des README...${NC}"

cat > dev/README.md << 'EOF'
# 🔧 Developer Documentation

## Quick Start
```bash
./hots start          # Start all services
./hots test quick     # Run quick tests
./hots compile        # Compile backend
```

## Structure
- `/architecture/` - System architecture & diagrams
- `/api/` - API documentation (Walter's docs)
- `/engine/` - Engine explanations & technical details
- `/workflow/` - Development workflows & setup guides
- `/reports/` - Generated reports & audits
- `/tools/` - Development tools

## Code Source
- `/backend/` → Spring Boot backend
- `/frontend/` → React frontend
- `/frontend-temporal/` → Temporal interface

## Key Questions Answered
Check `/engine/` for explanations like "How does X work?"

## For Game Content
→ See `/lore/` for heroes, stories, and universe
EOF

cat > lore/README.md << 'EOF'
# 📚 Heroes of Time - Lore & Universe

## Start Here
1. **Jean-Grofignon Manifesto** - The revolutionary vision
2. **Heroes** - Meet the legendary heroes
3. **Artifacts** - Discover powerful items
4. **Stories** - Epic tales and adventures

## Key Stories
- The Eye of Wigner saga
- Temporal collapse events
- Bootstrap paradox revelations
- Forest revelations (GROFI)

## For Technical Info
→ See `/dev/` for developer documentation
EOF

cat > MUSEUM/README.md << 'EOF'
# 🏛️ MUSEUM - Archives & Historical Artifacts

## Purpose
The MUSEUM contains historical artifacts, old scripts, and archived content.
It's our "organized junk drawer" - stuff we don't want to lose but don't actively use.

## Structure
- `/scripts-collection/` - Interesting old scripts
- `/scripts-obsoletes-v2/` - Obsolete scripts v2
- `/archives/` - New archive structure
  - `/old-scripts/` - Old shell/python scripts
  - `/old-tests/` - Test scripts archive
  - `/old-docs/` - Old documentation
  - `/backups/` - ZIP files and backups
  - `/racine/` - Old root directory files

## Note
This is an ARCHIVE. For active content:
- Development → `/dev/`
- Game content → `/lore/`
- Active scripts → `/scripts/`
EOF

cat > sessions/INDEX.md << 'EOF'
# 📅 Session Archives

Historical record of the Heroes of Time development journey.

## Structure
- `/2025-07/` - July 2025 sessions
- `/archives/` - Older sessions and backups

## Special Directories (DO NOT MOVE)
- `/MEMENTO/` - Memento's active working directory
- `/OPUS/` - OPUS artifact intelligence
- `/MUSEUM/` - Historical archives

These directories are preserved at root level for good reasons.
EOF

# 10. Créer des liens pour préserver les références du README
echo -e "${YELLOW}🔗 Préservation des liens du README...${NC}"
if [ -f "README.md" ]; then
    # Créer des liens symboliques pour les fichiers déplacés
    ln -sf lore/JEAN_GROFIGNON_MANIFESTO.md docs/JEAN_GROFIGNON_MANIFESTO.md 2>/dev/null
    ln -sf lore/stories/LORE_MEMENTO_JEAN_ETERNAL.md docs/LORE_MEMENTO_JEAN_ETERNAL.md 2>/dev/null
    
    # Pour les docs techniques référencées
    ln -sf ../dev/api/BACKEND_API_DOCUMENTATION_WALTER.md docs/BACKEND_API_DOCUMENTATION_WALTER.md 2>/dev/null
fi

# 11. Nettoyer les répertoires vides
echo -e "${YELLOW}🧹 Nettoyage final...${NC}"
find dev scripts sessions -type d -empty -delete 2>/dev/null

# 12. Rapport final
echo -e "\n${GREEN}✅ Réorganisation terminée !${NC}"
echo -e "\n${BLUE}Structure finale :${NC}"
echo -e "  ${GREEN}/dev/${NC}        → Documentation développeur complète"
echo -e "    ├── /architecture/  → Diagrammes et architecture"
echo -e "    ├── /api/          → Documentation API (Walter)"
echo -e "    ├── /engine/       → Explications moteur"
echo -e "    ├── /workflow/     → Guides de développement"
echo -e "    └── /reports/      → Rapports et audits"
echo -e "  ${GREEN}/lore/${NC}       → Histoire et univers du jeu"
echo -e "  ${GREEN}/scripts/${NC}    → Scripts organisés"
echo -e "  ${GREEN}/sessions/${NC}   → Archives de sessions"
echo -e "\n${YELLOW}Préservés intacts :${NC}"
echo -e "  ${GREEN}/MEMENTO/${NC}    → Répertoire de travail Memento"
echo -e "  ${GREEN}/OPUS/${NC}       → Intelligence artificielle OPUS"
echo -e "  ${GREEN}/MUSEUM/${NC}     → Archives et vieux trucs rigolos"
echo -e "\n${YELLOW}⚠️  Actions recommandées :${NC}"
echo "  1. Vérifier './hots start'"
echo "  2. Tester les liens du README"
echo "  3. Explorer /dev/ pour voir l'organisation"
echo -e "\n${GREEN}✨ Projet propre avec MUSEUM comme archives !${NC}"