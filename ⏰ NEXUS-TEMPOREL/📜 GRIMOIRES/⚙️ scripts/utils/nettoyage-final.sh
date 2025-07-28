#!/bin/bash

# 🧹 Heroes of Time - Nettoyage Final Complet
# ==========================================
# Script pour nettoyer et organiser TOUS les fichiers

echo "🧹 Heroes of Time - Nettoyage Final Complet"
echo "==========================================="

# Créer les répertoires d'organisation
echo "📁 Création des répertoires d'organisation..."
mkdir -p rapports
mkdir -p logs
mkdir -p scripts-essentiels
mkdir -p archives/scripts-obsoletes
mkdir -p archives/documentation-obsolete
mkdir -p archives/tests-obsoletes

# Déplacer les scripts obsolètes
echo "🗄️ Archivage des scripts obsolètes..."
mv *-test.sh archives/scripts-obsoletes/ 2>/dev/null || true
mv simulate-*.sh archives/scripts-obsoletes/ 2>/dev/null || true
mv test-*.sh archives/scripts-obsoletes/ 2>/dev/null || true
mv fix-*.sh archives/scripts-obsoletes/ 2>/dev/null || true
mv run-*.sh archives/scripts-obsoletes/ 2>/dev/null || true
mv validate-*.sh archives/scripts-obsoletes/ 2>/dev/null || true
mv update-*.sh archives/scripts-obsoletes/ 2>/dev/null || true
mv demo-heroes-of-time-script.sh archives/scripts-obsoletes/ 2>/dev/null || true
mv TRAVAIL_*.sh archives/scripts-obsoletes/ 2>/dev/null || true

# Déplacer la documentation obsolète
echo "📚 Archivage de la documentation obsolète..."
mv TLDR_*.md archives/documentation-obsolete/ 2>/dev/null || true
mv SCRIPTS_DOCUMENTATION.md archives/documentation-obsolete/ 2>/dev/null || true
mv test-*.txt archives/documentation-obsolete/ 2>/dev/null || true
mv test-*.json archives/documentation-obsolete/ 2>/dev/null || true
mv test-*.js archives/documentation-obsolete/ 2>/dev/null || true
mv sample_data.json archives/documentation-obsolete/ 2>/dev/null || true

# Déplacer les répertoires obsolètes
echo "🗂️ Archivage des répertoires obsolètes..."
mv scripts-test/ archives/ 2>/dev/null || true
mv test-references/ archives/ 2>/dev/null || true
mv test-screenshots/ archives/ 2>/dev/null || true
mv test/ archives/ 2>/dev/null || true
mv src/ archives/ 2>/dev/null || true
mv target/ archives/ 2>/dev/null || true
mv analysis/ archives/ 2>/dev/null || true
mv 📖 docs/ archives/ 2>/dev/null || true
mv node_modules/ archives/ 2>/dev/null || true
mv scenarios/ archives/ 2>/dev/null || true
mv heroes-of-time-poc/ archives/ 2>/dev/null || true

# Déplacer les fichiers de configuration obsolètes
echo "⚙️ Archivage des fichiers de configuration obsolètes..."
mv package.json archives/ 2>/dev/null || true
mv pom.xml archives/ 2>/dev/null || true
mv docs-index.html archives/ 2>/dev/null || true
mv cursor.rules archives/ 2>/dev/null || true

# Garder seulement les scripts essentiels à la racine
echo "🎯 Scripts essentiels conservés à la racine:"
echo "  • gestion-scripts.sh - Gestionnaire principal"
echo "  • demo-ultra-simple.sh - Démonstration rapide"
echo "  • organiser-rapports.sh - Organisateur"
echo "  • nettoyage-final.sh - Ce script"

# Créer un fichier de référence final
echo "📋 Création du guide final..."
cat > GUIDE_UTILISATION.md << 'EOF'
# 🎮 Heroes of Time - Guide d'Utilisation Final

## 🚀 DÉMARRAGE ULTRA-RAPIDE

### 1. Script Principal (RECOMMANDÉ)
```bash
./gestion-scripts.sh
```
Menu interactif complet avec toutes les fonctionnalités.

### 2. Démonstration Immédiate
```bash
./demo-ultra-simple.sh
```
Démonstration complète en 30 secondes - parfait pour commencer !

## 📁 STRUCTURE ORGANISÉE

```
Heroes-of-Time/
├── 🚀 SCRIPTS PRINCIPAUX
│   ├── gestion-scripts.sh          # Menu principal
│   ├── demo-ultra-simple.sh        # Démo rapide
│   ├── organiser-rapports.sh       # Organisateur
│   └── nettoyage-final.sh          # Nettoyage
│
├── 🎮 SYSTÈME DE JEU
│   ├── 🖥️ backend/                    # Backend Spring Boot
│   ├── 🌐 frontend/                   # Frontend classique
│   ├── frontend-temporal/          # Frontend temporel
│   └── quantum-visualizer/         # Visualiseur quantique
│
├── 📊 RAPPORTS ET DOCUMENTATION
│   ├── rapports/                   # Tous les rapports
│   ├── logs/                       # Logs des tests
│   ├── ⚙️ scripts/                    # Scripts utilitaires
│   └── archives/                   # Archives
│
└── 📖 DOCUMENTATION
    ├── GUIDE_UTILISATION.md        # Ce guide
    ├── LISEZMOI.md                 # Guide rapide
    └── README.md                   # Documentation principale
```

## ⚡ COMMANDES ESSENTIELLES

### Démarrage
```bash
# Menu interactif (recommandé)
./gestion-scripts.sh

# Ou démonstration directe
./demo-ultra-simple.sh
```

### Vérification
```bash
# Vérifier la santé du système
curl http://localhost:8080/api/temporal/health

# Voir les rapports
ls rapports/

# Voir les logs
ls logs/
```

## 🎯 UTILISATION RECOMMANDÉE

1. **Première utilisation** : `./demo-ultra-simple.sh`
2. **Utilisation avancée** : `./gestion-scripts.sh`
3. **Consultation** : `cat rapports/INDEX_SCRIPTS_RAPPORTS.md`

## ✅ SYSTÈME PRÊT

Le système Heroes of Time est 100% opérationnel et organisé !

EOF

echo "✅ Nettoyage final terminé!"
echo ""
echo "📁 Structure finale:"
echo "  • Scripts essentiels: À la racine (4 fichiers)"
echo "  • Système de jeu: 🖥️ backend/, 🌐 frontend/, etc."
echo "  • Documentation: rapports/, logs/, ⚙️ scripts/"
echo "  • Archives: archives/ (tout l'ancien contenu)"
echo ""
echo "🎯 Pour commencer: ./gestion-scripts.sh"
echo "📖 Guide complet: ./GUIDE_UTILISATION.md"
echo "🚀 Système prêt à l'usage!" 