#!/bin/bash

# 🔍 CHECK README LINKS - Scanner tous les liens dans les README
# =============================================================

echo "🔍 SCANNER TOUS LES LIENS DANS LES README"
echo "========================================"

BROKEN_LINKS=0
TOTAL_LINKS=0

# Couleurs pour l'affichage
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonction pour vérifier un fichier
check_file_links() {
    local file="$1"
    echo -e "\n${BLUE}📄 Vérification: $file${NC}"
    
    # Extraire tous les liens markdown [text](link)
    grep -o '\[.*\]([^)]*)' "$file" 2>/dev/null | while read -r link; do
        # Extraire l'URL du lien
        url=$(echo "$link" | sed 's/.*(\([^)]*\)).*/\1/')
        
        # Ignorer les ancres et les liens externes
        if [[ "$url" =~ ^# ]] || [[ "$url" =~ ^http ]] || [[ "$url" =~ ^mailto ]]; then
            echo -e "  ${YELLOW}⏭️  SKIP: $url (externe/ancre)${NC}"
            continue
        fi
        
        TOTAL_LINKS=$((TOTAL_LINKS + 1))
        
        # Vérifier si le fichier existe (relatif au fichier README)
        dir=$(dirname "$file")
        full_path="$dir/$url"
        
        if [[ -e "$full_path" ]]; then
            echo -e "  ${GREEN}✅ OK: $url${NC}"
        else
            echo -e "  ${RED}❌ BROKEN: $url${NC}"
            echo -e "     ${RED}   Chemin testé: $full_path${NC}"
            BROKEN_LINKS=$((BROKEN_LINKS + 1))
        fi
    done
}

# Scanner tous les README du projet
find . -name "README.md" -type f \
    -not -path "./node_modules/*" \
    -not -path "./frontend/node_modules/*" \
    -not -path "./panopticon-grut-dashboard/node_modules/*" \
    -not -path "./backend/target/*" | \
while read -r readme_file; do
    check_file_links "$readme_file"
done

echo ""
echo "========================================"
echo -e "${BLUE}📊 RÉSUMÉ FINAL:${NC}"
echo -e "  ${GREEN}✅ Liens OK: $((TOTAL_LINKS - BROKEN_LINKS))${NC}"
echo -e "  ${RED}❌ Liens cassés: $BROKEN_LINKS${NC}"
echo -e "  📊 Total vérifié: $TOTAL_LINKS"

if [ $BROKEN_LINKS -eq 0 ]; then
    echo -e "\n${GREEN}🎉 TOUS LES LIENS SONT VALIDES !${NC}"
    exit 0
else
    echo -e "\n${RED}⚠️  $BROKEN_LINKS LIENS À CORRIGER${NC}"
    exit 1
fi 