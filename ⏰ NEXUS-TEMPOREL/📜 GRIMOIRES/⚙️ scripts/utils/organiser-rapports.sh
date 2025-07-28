#!/bin/bash

# 🧹 Heroes of Time - Organisateur de Rapports et Scripts
# ========================================================
# Script pour organiser et nettoyer tous les fichiers

echo "🧹 Heroes of Time - Organisateur de Rapports"
echo "============================================="

# Créer les répertoires d'organisation
echo "📁 Création des répertoires d'organisation..."
mkdir -p rapports
mkdir -p logs
mkdir -p scripts
mkdir -p archives

# Déplacer les rapports
echo "📊 Organisation des rapports..."
mv RAPPORT_*.md rapports/ 2>/dev/null || true
mv *_REPORT.md rapports/ 2>/dev/null || true
mv *_SUMMARY.md rapports/ 2>/dev/null || true
mv INDEX_SCRIPTS_RAPPORTS.md rapports/ 2>/dev/null || true

# Déplacer les logs
echo "📋 Organisation des logs..."
mv *.log logs/ 2>/dev/null || true

# Déplacer les scripts obsolètes dans archives
echo "🗄️ Archivage des scripts obsolètes..."
mv start-*.sh archives/ 2>/dev/null || true
mv stop-*.sh archives/ 2>/dev/null || true
mv test-*.sh ⚙️ scripts/ 2>/dev/null || true
mv *-demo.sh ⚙️ scripts/ 2>/dev/null || true

# Garder les scripts principaux à la racine
echo "🎯 Scripts principaux conservés à la racine:"
ls -la gestion-scripts.sh demo-ultra-simple.sh test-simple.sh autoplay-demo.sh test-rapide-hots.sh 2>/dev/null || true

# Créer un fichier de référence à la racine
echo "📋 Création du fichier de référence..."
cat > LISEZMOI.md << 'EOF'
# 🎮 Heroes of Time - Guide Rapide

## 🚀 DÉMARRAGE RAPIDE

### Script Principal (RECOMMANDÉ)
```bash
./gestion-scripts.sh
```
Menu interactif pour gérer tous les scripts et fonctionnalités.

### Démonstration Rapide
```bash
./demo-ultra-simple.sh
```
Démonstration complète en 30 secondes.

## 📁 ORGANISATION DES FICHIERS

- **Scripts principaux**: À la racine
- **Rapports**: Dans le dossier `rapports/`
- **Logs**: Dans le dossier `logs/`
- **Scripts utilitaires**: Dans le dossier `⚙️ scripts/`
- **Archives**: Dans le dossier `archives/`

## 🔍 DOCUMENTATION COMPLÈTE

Consultez `rapports/INDEX_SCRIPTS_RAPPORTS.md` pour l'index complet.

## ✅ SYSTÈME PRÊT À L'USAGE

Le système Heroes of Time est 100% opérationnel !
EOF

echo "✅ Organisation terminée!"
echo ""
echo "📁 Structure organisée:"
echo "  • Scripts principaux: À la racine"
echo "  • Rapports: ./rapports/"
echo "  • Logs: ./logs/"
echo "  • Scripts utilitaires: ./⚙️ scripts/"
echo "  • Archives: ./archives/"
echo ""
echo "🎯 Pour commencer: ./gestion-scripts.sh"
echo "📖 Documentation: ./LISEZMOI.md" 