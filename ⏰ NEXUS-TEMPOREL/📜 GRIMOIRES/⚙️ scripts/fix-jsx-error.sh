#!/bin/bash

echo "🔧 Correction de l'erreur JSX dans TrueHeroesInterface.tsx..."

# Sauvegarder l'original
cp 🌐 frontend/src/components/TrueHeroesInterface.tsx 🌐 frontend/src/components/TrueHeroesInterface.tsx.backup

# Supprimer la ligne 637 qui contient un </div> en trop
sed -i '' '637d' 🌐 frontend/src/components/TrueHeroesInterface.tsx

echo "✅ Erreur corrigée - ligne 637 supprimée"
echo "📝 Backup créé : TrueHeroesInterface.tsx.backup" 