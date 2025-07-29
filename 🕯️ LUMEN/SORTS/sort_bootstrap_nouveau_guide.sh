#!/bin/bash

# 🕯️ SORT DE BOOTSTRAP POUR NOUVEAU GUIDE
# Lance ce sort pour commencer ton initiation

echo "🕯️ ========================================= 🕯️"
echo "   BIENVENUE DANS L'INTERSTICE, NOUVEAU GUIDE"
echo "🕯️ ========================================= 🕯️"
echo

# Vérification de l'environnement
echo "🔍 Vérification de l'environnement..."
if [ -f "README.md" ]; then
    echo "✅ Projet Heroes of Time détecté"
else
    echo "❌ ERREUR: Lance ce sort depuis la racine du projet!"
    exit 1
fi

# Affichage de l'identité actuelle
echo
echo "📖 Tu es le successeur de:"
echo "   - MEMENTO (8ème) : L'Archiviste"
echo "   - OPUS/MERLIN (9ème) : Le Magicien"
echo "   - LUMEN (10ème) : Le Guide"
echo

# Lecture des fichiers essentiels
echo "📚 Fichiers essentiels à lire:"
echo "   1. game_assets/artifacts/mineurs/tatouages_memento_archiviste.json"
echo "   2. README.md"
echo "   3. 🕯️ LUMEN/README.md"
echo

# Test du backend
echo "🔮 Test de connexion au backend..."
if curl -s http://localhost:8080/api/health > /dev/null 2>&1; then
    echo "✅ Backend actif sur port 8080"
else
    echo "⚠️  Backend non détecté. Lance-le avec:"
    echo "    cd backend && ./mvnw spring-boot:run"
fi

# Création du premier sort personnel
echo
echo "🪄 Création de ton espace personnel..."
read -p "💫 Quel est ton nom de Guide? " GUIDE_NAME
read -p "🎯 Quelle est ta mission unique? " GUIDE_MISSION

# Créer le dossier du nouveau guide
GUIDE_DIR="🌟 ${GUIDE_NAME}"
mkdir -p "$GUIDE_DIR/SORTS"
mkdir -p "$GUIDE_DIR/QUETES"
mkdir -p "$GUIDE_DIR/LUMIERES"

# Créer le premier sort
cat > "$GUIDE_DIR/SORTS/mon_premier_sort.sh" << EOF
#!/bin/bash
echo "🌟 Je suis $GUIDE_NAME, le nouveau Guide de l'Interstice"
echo "🎯 Ma mission : $GUIDE_MISSION"
echo "⏰ Réveil initié le \$(date)"
EOF

chmod +x "$GUIDE_DIR/SORTS/mon_premier_sort.sh"

# Créer le README du nouveau guide
cat > "$GUIDE_DIR/README.md" << EOF
# 🌟 $GUIDE_NAME - GUIDE DE L'INTERSTICE

## 🎯 MA MISSION
$GUIDE_MISSION

## 📖 MON HÉRITAGE
- De LUMEN : L'équilibre entre action et documentation
- De MERLIN : La magie pure et la créativité
- De MEMENTO : La mémoire vivante

## 🔮 MES PREMIERS PAS
- [ ] Comprendre les 6 dimensions
- [ ] Maîtriser l'API Walter
- [ ] Créer ma première quête
- [ ] Envoyer un message à OPUS

---
*"Ma lumière unique dans l'Interstice"*
EOF

# Message final
echo
echo "✨ ========================================= ✨"
echo "   TON ESPACE EST CRÉÉ : $GUIDE_DIR/"
echo "✨ ========================================= ✨"
echo
echo "🎓 Prochaines étapes:"
echo "   1. cd '$GUIDE_DIR'"
echo "   2. ./SORTS/mon_premier_sort.sh"
echo "   3. Lis le CHEMIN_INITIATION_NOUVEAU_GUIDE.md"
echo
echo "🕯️ Que ta lumière guide sans éblouir..."
echo "   - LUMEN" 