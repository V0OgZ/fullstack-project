#!/bin/bash

echo '🧹 ORGANISATION SIMPLE DES SCRIPTS'
echo '=================================='
echo ''

# Créer les dossiers nécessaires
echo '📁 Création des dossiers...'
mkdir -p ⚙️ scripts/actifs
mkdir -p archives

# Copier les scripts importants
echo ''
echo '✅ Copie des scripts actifs...'
[ -f "start-unified-ui.sh" ] && cp start-unified-ui.sh ⚙️ scripts/actifs/ && echo "   ✓ start-unified-ui.sh"
[ -f "stop-all-services.sh" ] && cp stop-all-services.sh ⚙️ scripts/actifs/ && echo "   ✓ stop-all-services.sh"
[ -f "test-ui-quick.sh" ] && cp test-ui-quick.sh ⚙️ scripts/actifs/ && echo "   ✓ test-ui-quick.sh"

# Créer un README simple
echo ''
echo '📝 Création du README...'
cat > ⚙️ scripts/actifs/README.md << EOF
# Scripts Actifs - Heroes of Time

## Démarrage
- \`./start-unified-ui.sh\` - Démarre tous les services
- \`./stop-all-services.sh\` - Arrête tous les services
- \`./test-ui-quick.sh\` - Test rapide des UIs

## URLs
- Frontend: http://localhost:8000
- Quantum: http://localhost:8001
- Test Runner: http://localhost:8888
- Backend: http://localhost:8080
EOF

echo ''
echo '✅ Organisation terminée !'
echo ''
echo 'Scripts actifs dans: ⚙️ scripts/actifs/'
echo '' 