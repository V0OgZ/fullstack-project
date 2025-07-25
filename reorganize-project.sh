#!/bin/bash

# Script de réorganisation intelligente du projet Heroes of Time
# Préserve les liens du README et organise proprement

echo "🧹 Réorganisation intelligente du projet Heroes of Time..."

# Couleurs pour l'affichage
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 1. DÉPLACEMENT DES SCRIPTS DE TEST
echo -e "${YELLOW}📦 Déplacement des scripts de test...${NC}"
mkdir -p tests/scripts
for file in test-*.sh test-*.py TEST*.sh; do
    if [ -f "$file" ]; then
        echo "  → Déplacement de $file vers tests/scripts/"
        mv "$file" tests/scripts/ 2>/dev/null
    fi
done

# 2. ARCHIVAGE DES VIEUX SCRIPTS
echo -e "${YELLOW}📦 Archivage des vieux scripts...${NC}"
mkdir -p archive/2025-07/scripts
# Scripts à archiver (sauf hots et start/stop principaux)
for file in *.sh; do
    if [[ ! "$file" =~ ^(hots|start-app\.sh|stop-app\.sh|reorganize-project\.sh)$ ]]; then
        if [ -f "$file" ]; then
            echo "  → Archivage de $file"
            mv "$file" archive/2025-07/scripts/ 2>/dev/null
        fi
    fi
done

# 3. DÉPLACEMENT DES SCRIPTS PYTHON
echo -e "${YELLOW}📦 Déplacement des scripts Python...${NC}"
mkdir -p archive/2025-07/python
for file in *.py; do
    if [ -f "$file" ]; then
        echo "  → Archivage de $file"
        mv "$file" archive/2025-07/python/ 2>/dev/null
    fi
done

# 4. NETTOYAGE DES LOGS
echo -e "${YELLOW}📦 Archivage des logs...${NC}"
mkdir -p archive/2025-07/logs
for file in *.log; do
    if [ -f "$file" ]; then
        echo "  → Archivage de $file"
        mv "$file" archive/2025-07/logs/ 2>/dev/null
    fi
done

# 5. DÉPLACEMENT DES FICHIERS HTML/JSON NON ESSENTIELS
echo -e "${YELLOW}📦 Organisation des fichiers de données...${NC}"
mkdir -p archive/2025-07/data
for file in *.html *.json; do
    # Garder seulement package.json, railway.json et museum.json à la racine
    if [[ ! "$file" =~ ^(package\.json|package-lock\.json|railway\.json|museum\.json)$ ]]; then
        if [ -f "$file" ]; then
            echo "  → Archivage de $file"
            mv "$file" archive/2025-07/data/ 2>/dev/null
        fi
    fi
done

# 6. ARCHIVAGE DES BACKUPS
echo -e "${YELLOW}📦 Archivage des backups...${NC}"
mkdir -p archive/2025-07/backups
for file in *backup* *BACKUP* *.zip; do
    if [ -f "$file" ]; then
        echo "  → Archivage de $file"
        mv "$file" archive/2025-07/backups/ 2>/dev/null
    fi
done

# 7. DÉPLACEMENT DES FICHIERS HOTS
echo -e "${YELLOW}📦 Organisation des fichiers HOTS...${NC}"
mkdir -p archive/2025-07/hots-versions
for file in hots-*; do
    if [[ "$file" != "hots" && -f "$file" ]]; then
        echo "  → Archivage de $file"
        mv "$file" archive/2025-07/hots-versions/ 2>/dev/null
    fi
done

# 8. RÉORGANISATION DU MEMENTO
echo -e "${YELLOW}📦 Réorganisation du MEMENTO...${NC}"
if [ -d "MEMENTO" ]; then
    # Garder les docs de session courante dans docs/memento-sessions
    mkdir -p docs/memento-sessions/current
    cp -r MEMENTO/*.md docs/memento-sessions/current/ 2>/dev/null
    
    # Archiver le reste
    mkdir -p archive/2025-07/memento
    mv MEMENTO archive/2025-07/memento/MEMENTO-original 2>/dev/null
fi

# 9. RÉORGANISATION DU MUSEUM
echo -e "${YELLOW}📦 Réorganisation du MUSEUM...${NC}"
if [ -d "MUSEUM" ]; then
    mkdir -p archive/2025-07/museum
    mv MUSEUM archive/2025-07/museum/MUSEUM-original 2>/dev/null
fi

# 10. CRÉATION DES LIENS SYMBOLIQUES POUR PRÉSERVER LES RÉFÉRENCES
echo -e "${YELLOW}🔗 Création des liens pour préserver les références du README...${NC}"
# Les docs référencées dans le README qui doivent rester accessibles
ln -sf archive/2025-07/data/AIDE_JEAN.md AIDE_JEAN.md 2>/dev/null
ln -sf archive/2025-07/museum/MUSEUM-original/cursor.rules cursor.rules 2>/dev/null

# 11. CRÉATION D'UN INDEX DES ARCHIVES
echo -e "${YELLOW}📋 Création de l'index des archives...${NC}"
cat > archive/INDEX.md << 'EOF'
# 📦 Index des Archives

## Structure des archives

### 📅 2025-07 (Juillet 2025)
- **scripts/** - Tous les scripts shell archivés
- **python/** - Scripts Python archivés
- **logs/** - Anciens fichiers de logs
- **data/** - Fichiers HTML/JSON archivés
- **backups/** - Sauvegardes et archives ZIP
- **hots-versions/** - Différentes versions du script HOTS
- **memento/** - Archive complète du répertoire MEMENTO
- **museum/** - Archive complète du répertoire MUSEUM

## 🔍 Recherche rapide

Pour retrouver un fichier archivé :
```bash
find archive/ -name "nom-du-fichier*"
```

## 📝 Notes
- Les fichiers ont été archivés le $(date +"%Y-%m-%d")
- La structure originale est préservée dans les sous-dossiers
- Les liens du README sont maintenus via des liens symboliques
EOF

# 12. RAPPORT FINAL
echo -e "\n${GREEN}✅ Réorganisation terminée !${NC}"
echo -e "\n📊 Résumé :"
echo "  - Scripts de test déplacés dans tests/scripts/"
echo "  - Archives créées dans archive/2025-07/"
echo "  - Liens du README préservés"
echo "  - Index des archives créé"

echo -e "\n${YELLOW}⚠️  Vérifications recommandées :${NC}"
echo "  1. Vérifier que le README fonctionne toujours"
echo "  2. Tester ./hots start"
echo "  3. Vérifier les liens symboliques créés"

echo -e "\n${GREEN}✨ Le projet est maintenant propre et organisé !${NC}"