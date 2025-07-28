# 🧹 PLAN RÉORGANISATION DOCUMENTATION

**Problème :** Plus de 100 fichiers .md éparpillés partout dans le projet !

## 🎯 **STRUCTURE CIBLE**

```
📖 docs/
├── 📚 core/                    # Documentation essentielle
│   ├── README.md              # Guide principal
│   ├── GAMEPLAY.md            # Comment jouer
│   ├── API.md                 # API Reference
│   └── INSTALLATION.md        # Setup
├── 🏗️ architecture/           # Architecture technique
│   ├── ENGINE_ARCHITECTURE.md # Architecture moteur
│   ├── WORLD_STATE_GRAPH.md   # Graphes d'état
│   └── FRONTENDS_DOCUMENTATION.md
├── 🌀 temporal/               # Mécaniques temporelles
│   ├── TEMPORAL_SCRIPT_CORE_REFERENCE.md
│   ├── CAUSALITY_OBJECT_INFLUENCE.md
│   └── ASYNC_ENGINE_DESIGN.md
├── 🔮 heroes/                 # Héros et personnages
│   ├── DISTINCTION_JSON_vs_HOTS.md
│   ├── hero_jean_grofignon.md
│   └── TEMPLATE_HERO.md
├── ⚔️ items/                  # Artefacts et objets
│   ├── ARTEFACTS_COMPLETE_GUIDE.md
│   ├── QUANTUM_ARTIFACTS_CATALOG.md
│   └── TEMPORAL_CREATURES_GUIDE.md
├── 🧪 technical/              # Docs techniques
│   ├── cursor.md
│   ├── SCRIPT_PERFORMANCE_CORRECTIONS.md
│   └── VISUALIZER_MODULE.md
└── 📊 reports/                # Rapports récents
    ├── RAPPORT_COMPLET_COMPARAISON.md
    └── RAPPORT_TESTS_COMPLET_2025_07_18.md

archives/📖 docs/                 # Vieux docs obsolètes
├── old-reports/               # Anciens rapports
├── deprecated/                # Docs obsolètes
└── duplicates/                # Doublons

rapports/                      # Rapports spéciaux (garder)
analysis/                      # Notes développement (garder)
⚙️ scripts/                       # Index scripts (garder)
```

## 🗑️ **FICHIERS À ARCHIVER (OBSOLÈTES)**

### **Rapports de Performance Obsolètes**
- `performance_report_20250718_*.md`
- `RAPPORT_PERFORMANCE_METRICS_DETAILLE.md`
- `RAPPORT_TEST_COMPLET_FINAL_CHIFFRES.md`

### **Rapports de Nettoyage/Corrections Terminés**
- `CLEANUP_ANTLR_REPORT.md`
- `CLEANUP_SCRIPTS_REPORT.md`
- `SCRIPTS_CLEANED_REPORT.md`
- `SYSTEM_CLEANUP_REPORT.md`
- `FINAL_CLEANUP_REPORT.md`

### **Status/État Obsolètes**
- `CURRENT_STATUS_ANALYSIS.md`
- `ETAT_ACTUEL_UI_FINAL.md`
- `ETAT_DES_LIEUX_COMPLET_HEROES_OF_TIME.md`
- `UI_STATUS_DOCUMENTATION.md`

### **Doublons/Duplicatas**
- `📖 docs/GROFI/QUANTUM_ARTIFACTS_CATALOG.md` (doublon de `📖 docs/quantum/`)
- `📖 docs/GROFI/TEMPORAL_SCRIPT_CORE_REFERENCE.md` (doublon de `📖 docs/grammar/`)
- `📖 docs/GROFI/WORLD_STATE_GRAPH.md` (doublon de `📖 docs/architecture/`)

### **Guides/Plans Terminés**
- `COMMANDES_FINALES_HEROES_OF_TIME.md`
- `PLAN_INTEGRATION_FORMULES_ARTEFACTS.md`
- `WORKFLOW_SYSTEME_UNIFIE.md`
- `ORGANISATION_COMPLETE.md`
- `ORGANISATION_DOCUMENTATION_FINALE.md`

## ✅ **FICHIERS À GARDER (ESSENTIELS)**

### **Core Documentation**
- `README.md` (principal)
- `📖 docs/API.md`
- `📖 docs/GAMEPLAY.md`
- `📖 docs/INSTALLATION.md`

### **Architecture**
- `ENGINE_ARCHITECTURE.md` → `📖 docs/architecture/`
- `📖 docs/architecture/WORLD_STATE_GRAPH.md`
- `📖 docs/technical/FRONTENDS_DOCUMENTATION.md`

### **Héros & Gameplay**
- `📖 docs/DISTINCTION_JSON_vs_HOTS.md` (nouveau, important)
- `📖 docs/GROFI/hero_jean_grofignon.md`
- `📖 docs/templates/TEMPLATE_HERO.md`

### **Items & Artefacts**
- `📖 docs/items/ARTEFACTS_COMPLETE_GUIDE.md`
- `📖 docs/quantum/QUANTUM_ARTIFACTS_CATALOG.md`

### **Rapports Récents (rapports/)**
- Garder tous les fichiers dans `rapports/` (déjà organisés)

### **Scripts & Outils**
- `⚙️ scripts/INDEX_SCRIPTS_HEROES_OF_TIME.md`
- `⚙️ scripts/README.md`

## 🚀 **PLAN D'ACTION**

1. **Créer les dossiers d'archives**
2. **Déplacer les fichiers obsolètes**
3. **Réorganiser la documentation essentielle**
4. **Supprimer les vrais doublons**
5. **Créer un nouveau INDEX principal**
6. **Nettoyer la racine du projet**

## 🎯 **RÉSULTAT ATTENDU**

- **Racine propre** avec seulement README.md principal
- **📖 docs/** bien organisé par catégories
- **archives/** pour l'historique
- **Suppression** des 80+ fichiers .md inutiles
- **Navigation claire** pour les développeurs 