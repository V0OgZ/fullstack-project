#!/bin/bash

# Réorganisation finale du projet Heroes of Time
# Garde MEMENTO et OPUS intacts
echo "🧹 Réorganisation finale du projet..."

# Couleurs
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# 1. Créer la structure de base
echo -e "${YELLOW}📁 Création de la structure...${NC}"
mkdir -p dev/{backend,frontend,api,architecture,tools}
mkdir -p lore/{heroes,artifacts,stories,universe}
mkdir -p scripts/{active,tools,tests}
mkdir -p sessions/{2025-07,archives}
mkdir -p archive/{old-scripts,old-docs,backups,old-tests}

# 2. PRÉSERVER LES RÉPERTOIRES IMPORTANTS
echo -e "${GREEN}✅ Préservation de MEMENTO et OPUS...${NC}"
# MEMENTO et OPUS restent où ils sont !

# 3. Déplacer le code dev
echo -e "${YELLOW}🔧 Organisation dev...${NC}"
# Créer des liens symboliques pour le code
ln -sfn ../backend dev/backend 2>/dev/null
ln -sfn ../frontend dev/frontend 2>/dev/null
ln -sfn ../frontend-temporal dev/frontend-temporal 2>/dev/null

# Déplacer les docs techniques
mv docs/BACKEND_API_* dev/api/ 2>/dev/null
mv docs/ARCHITECTURE_* dev/architecture/ 2>/dev/null
mv docs/TECHNICAL.md dev/ 2>/dev/null
mv docs/API.md dev/api/ 2>/dev/null
mv docs/EN/TECHNICAL_* dev/architecture/ 2>/dev/null

# 4. Déplacer le lore
echo -e "${YELLOW}📚 Organisation lore...${NC}"
mv docs/JEAN_GROFIGNON_MANIFESTO.md lore/ 2>/dev/null
mv docs/LORE_*.md lore/stories/ 2>/dev/null
mv docs/heroes/*.md lore/heroes/ 2>/dev/null
# Copier (pas déplacer) les artefacts JSON pour garder les références
cp -r game_assets/artifacts/* lore/artifacts/ 2>/dev/null

# 5. Organiser les scripts
echo -e "${YELLOW}📜 Organisation scripts...${NC}"
# Scripts actifs (utilisés dans hots)
cp scripts/actifs/* scripts/active/ 2>/dev/null
cp start-app.sh stop-app.sh scripts/active/ 2>/dev/null

# Tous les scripts de test
mv test-*.sh scripts/tests/ 2>/dev/null
mv test-*.py scripts/tests/ 2>/dev/null
mv TEST*.sh scripts/tests/ 2>/dev/null

# 6. Organiser les sessions (sans toucher à MEMENTO)
echo -e "${YELLOW}📅 Organisation sessions...${NC}"
mv memento-backup/* sessions/archives/ 2>/dev/null
mv docs-backup/* sessions/2025-07/ 2>/dev/null
# Copier les rapports intéressants
cp rapports/*.md sessions/2025-07/ 2>/dev/null

# 7. Archiver le reste
echo -e "${YELLOW}📦 Archivage...${NC}"
mv *.log archive/old-docs/ 2>/dev/null
mv *.zip archive/backups/ 2>/dev/null
mv hots-* archive/old-scripts/ 2>/dev/null
mv MUSEUM archive/ 2>/dev/null

# Archiver les vieux fichiers HTML/JSON sauf les essentiels
for file in *.html *.json; do
    if [[ ! "$file" =~ ^(package\.json|package-lock\.json|railway\.json|museum\.json)$ ]]; then
        if [ -f "$file" ]; then
            mv "$file" archive/old-docs/ 2>/dev/null
        fi
    fi
done

# 8. Nettoyer les scripts Python éparpillés
mv *.py archive/old-scripts/ 2>/dev/null

# 9. Créer les README et INDEX
echo -e "${YELLOW}📝 Création des README...${NC}"

cat > dev/README.md << 'EOF'
# 🔧 Developer Documentation

## Quick Start
```bash
./hots start          # Start all services
./hots test quick     # Run quick tests
```

## Structure
- `/backend/` - Spring Boot backend (Java)
- `/frontend/` - React frontend 
- `/frontend-temporal/` - Temporal interface
- `/api/` - API documentation
- `/architecture/` - System architecture docs

## Key Commands
- `./hots compile` - Compile backend
- `./hots debug` - Debug mode
- `./hots logs` - View logs

## For Game Lore
Looking for heroes and stories? → Check `/lore/`
EOF

cat > lore/README.md << 'EOF'
# 📚 Heroes of Time - Lore & Universe

## Start Here
1. **Jean-Grofignon Manifesto** - The vision
2. **Heroes** - Meet the legendary heroes
3. **Artifacts** - Discover powerful items
4. **Stories** - Epic tales and adventures

## Key Stories
- The Eye of Wigner saga
- Temporal collapse events  
- Bootstrap paradox revelations

## For Developers
Technical documentation → Check `/dev/`
EOF

cat > scripts/README.md << 'EOF'
# 📜 Scripts Organization

## Structure
- `/active/` - Scripts used by hots (DO NOT DELETE)
- `/tools/` - Utility scripts
- `/tests/` - Test scripts

## Important Scripts
All essential scripts are referenced in the main `hots` script.
Run `./hots help` to see available commands.
EOF

cat > sessions/INDEX.md << 'EOF'
# 📅 Session Archives

Historical record of the Heroes of Time development journey.

## Structure
- `/2025-07/` - July 2025 sessions
- `/archives/` - Older sessions

## Special Directories (DO NOT MOVE)
- `/MEMENTO/` - Memento's working directory
- `/OPUS/` - OPUS artifact intelligence

These directories contain active work and should remain at root level.
EOF

# 10. Vérifier et corriger les liens du README principal
echo -e "${YELLOW}🔗 Vérification des liens du README...${NC}"
if [ -f "README.md" ]; then
    # Créer des liens symboliques pour les fichiers déplacés référencés dans le README
    ln -sf lore/JEAN_GROFIGNON_MANIFESTO.md docs/JEAN_GROFIGNON_MANIFESTO.md 2>/dev/null
    ln -sf lore/stories/LORE_MEMENTO_JEAN_ETERNAL.md docs/LORE_MEMENTO_JEAN_ETERNAL.md 2>/dev/null
fi

# 11. Nettoyer les répertoires vides
echo -e "${YELLOW}🧹 Nettoyage final...${NC}"
find archive scripts sessions -type d -empty -delete 2>/dev/null

# 12. Rapport final
echo -e "\n${GREEN}✅ Réorganisation terminée !${NC}"
echo -e "\nStructure finale :"
echo -e "  ${GREEN}/dev/${NC}      → Documentation développeur"
echo -e "  ${GREEN}/lore/${NC}     → Histoire et univers du jeu"  
echo -e "  ${GREEN}/scripts/${NC}  → Scripts organisés"
echo -e "  ${GREEN}/sessions/${NC} → Archives historiques"
echo -e "  ${GREEN}/archive/${NC}  → Vieux fichiers"
echo -e "\n${YELLOW}Préservés intacts :${NC}"
echo -e "  ${GREEN}/MEMENTO/${NC}  → Répertoire de travail Memento"
echo -e "  ${GREEN}/OPUS/${NC}     → Intelligence artificielle OPUS"
echo -e "\n${YELLOW}⚠️  Actions recommandées :${NC}"
echo "  1. Vérifier que './hots start' fonctionne"
echo "  2. Tester quelques liens du README"
echo "  3. Supprimer ce script après utilisation"
echo -e "\n${GREEN}✨ Projet organisé avec respect des espaces de travail !${NC}"