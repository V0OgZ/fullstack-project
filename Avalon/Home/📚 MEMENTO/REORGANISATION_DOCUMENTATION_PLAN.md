# 🧹 PLAN DE RÉORGANISATION DOCUMENTATION & MEMENTO
## Date : 21 Juillet 2025 - 06:45

---

## 🎯 **OBJECTIF**
Nettoyer et réorganiser complètement la documentation et MEMENTO pour éliminer les doublons, versions multiples et désordre actuel.

---

## 📊 **ÉTAT ACTUEL - PROBLÈMES IDENTIFIÉS**

### 🔴 **DOCS/ - CHAOS TOTAL**
- **50+ fichiers** sans structure claire
- **Doublons** : HEROES_OF_TIME_DEVELOPMENT_LORE.html + .md
- **Versions multiples** : TEMPORAL_CODEX.md, GRAMMAIRE_SPATIO_TEMPORELLE.md
- **Fichiers obsolètes** : cursor.md, cursor-roll.md
- **Mélange** : technique, lore, guides, rapports

### 🔴 **📚 MEMENTO/ - DÉSORDRE COMPLET**
- **40+ fichiers** sans organisation
- **Rapports multiples** : 20+ rapports de session
- **Doublons** : HISTOIRE_HEROES_OF_TIME.md + .html
- **Fichiers temporaires** : benchmark_results_*.json
- **Pas de hiérarchie** claire

---

## 🏗️ **NOUVELLE STRUCTURE PROPOSÉE**

### 📁 **DOCS/ - Documentation Officielle**
```
📖 docs/
├── 📖 README.md                    # Point d'entrée principal
├── 🎮 GAMEPLAY/
│   ├── CORE_MECHANICS.md          # Mécaniques de base
│   ├── HOTS_SCRIPTING.md          # Guide HOTS
│   ├── QUANTUM_SYSTEMS.md         # Systèmes quantiques
│   └── TEMPORAL_DECAY.md          # Système Anna the Martopicker
├── 🏗️ ARCHITECTURE/
│   ├── SYSTEM_OVERVIEW.md         # Vue d'ensemble
│   ├── BACKEND_ARCHITECTURE.md    # Architecture backend
│   ├── FRONTEND_ARCHITECTURE.md   # Architecture frontend
│   └── API_REFERENCE.md           # Référence API
├── 🎭 LORE/
│   ├── WORLD_HISTORY.md           # Histoire du monde
│   ├── HEROES_CATALOG.md          # Catalogue des héros
│   ├── ARTIFACTS_GUIDE.md         # Guide des artefacts
│   └── GROFI_SYSTEM.md            # Système GROFI
├── 🛠️ DEVELOPMENT/
│   ├── SETUP_GUIDE.md             # Guide d'installation
│   ├── CONTRIBUTING.md            # Guide contributeur
│   └── TESTING.md                 # Guide des tests
└── 📊 REPORTS/
    ├── CURRENT_STATUS.md          # Statut actuel
    └── ROADMAP.md                 # Feuille de route
```

### 📁 **📚 MEMENTO/ - Mémoire de Développement**
```
📚 MEMENTO/
├── 📋 README.md                   # Guide MEMENTO
├── 🎯 CURRENT_SESSION/
│   ├── TODO.md                    # Tâches actuelles
│   ├── PROGRESS.md                # Progrès en cours
│   └── DECISIONS.md               # Décisions prises
├── 📚 KNOWLEDGE_BASE/
│   ├── JEAN_PHILOSOPHY.md         # Philosophie de Jean
│   ├── GROFI_KNOWLEDGE.md         # Connaissances GROFI
│   └── TECHNICAL_INSIGHTS.md      # Insights techniques
├── 📈 SESSION_HISTORY/
│   ├── 2025-07-20_SESSION.md      # Session 20 juillet
│   ├── 2025-07-21_SESSION.md      # Session 21 juillet
│   └── SESSION_INDEX.md           # Index des sessions
├── 🔧 IMPLEMENTATIONS/
│   ├── TEMPORAL_DECAY_SYSTEM.md   # Système de décroissance
│   ├── INTERFACE_8000_COMPLETE.md # Interface port 8000
│   └── IMPLEMENTATION_INDEX.md    # Index des implémentations
└── 🧪 EXPERIMENTS/
    ├── BENCHMARK_RESULTS/         # Résultats de tests
    ├── PROTOTYPES/                # Prototypes
    └── EXPERIMENT_INDEX.md        # Index des expériences
```

---

## 🗂️ **PLAN DE MIGRATION**

### **PHASE 1 : SAUVEGARDE ET ANALYSE**
1. ✅ Créer sauvegarde complète
2. ✅ Analyser tous les fichiers existants
3. ✅ Identifier doublons et obsolètes
4. ✅ Définir contenu à conserver

### **PHASE 2 : NOUVELLE STRUCTURE**
1. 🔄 Créer nouvelle hiérarchie de dossiers
2. 🔄 Migrer fichiers vers nouvelles catégories
3. 🔄 Fusionner doublons
4. 🔄 Supprimer obsolètes

### **PHASE 3 : CONTENU UNIFIÉ**
1. 🔄 Créer README.md principaux
2. 🔄 Standardiser format des documents
3. 🔄 Ajouter index et navigation
4. 🔄 Vérifier cohérence

### **PHASE 4 : VALIDATION**
1. 🔄 Tester navigation
2. 🔄 Vérifier liens internes
3. 🔄 Valider avec Jean
4. 🔄 Commit final

---

## 📋 **FICHIERS À FUSIONNER**

### **DOCS/ - Fusions Principales**
- `HEROES_OF_TIME_DEVELOPMENT_LORE.html` + `.md` → `LORE/WORLD_HISTORY.md`
- `TEMPORAL_CODEX.md` + `GRAMMAIRE_SPATIO_TEMPORELLE.md` → `GAMEPLAY/HOTS_SCRIPTING.md`
- `TECHNICAL.md` + `ARCHITECTURE_DIAGRAMS.md` → `ARCHITECTURE/SYSTEM_OVERVIEW.md`
- `FRONTEND_*.md` → `ARCHITECTURE/FRONTEND_ARCHITECTURE.md`

### **📚 MEMENTO/ - Fusions Principales**
- `HISTOIRE_HEROES_OF_TIME.md` + `.html` → `KNOWLEDGE_BASE/WORLD_LORE.md`
- `JEAN_MESSAGES_BEST_OF.md` + `PHILOSOPHY_*.md` → `KNOWLEDGE_BASE/JEAN_PHILOSOPHY.md`
- `RAPPORT_*_2025.md` → `SESSION_HISTORY/2025-07-20_SESSION.md`
- `IMPLEMENTATION_*.md` → `IMPLEMENTATIONS/`

---

## 🗑️ **FICHIERS À SUPPRIMER**

### **DOCS/ - Obsolètes**
- `cursor.md`, `cursor-roll.md`
- `DEVELOPER_INSTRUCTIONS.md` (560B)
- `GIT_SHARED_AGENT_RULES.md`
- `CURSOR_*.md` (obsolètes)

### **📚 MEMENTO/ - Obsolètes**
- `benchmark_results_*.json` (déplacer vers EXPERIMENTS/)
- `FIX_*.md` (fusionner dans IMPLEMENTATIONS/)
- `RAPPORT_*_SPECIAL.md` (fusionner dans SESSION_HISTORY/)

---

## 🎯 **BÉNÉFICES ATTENDUS**

### **Pour les Développeurs**
- ✅ Navigation claire et logique
- ✅ Pas de doublons ou contradictions
- ✅ Documentation à jour et cohérente
- ✅ Séparation claire docs officielles vs mémoire

### **Pour Jean**
- ✅ Lecture facilitée depuis le canapé
- ✅ Informations organisées par thème
- ✅ Historique des sessions préservé
- ✅ Philosophie GROFI centralisée

### **Pour le Projet**
- ✅ Maintenance simplifiée
- ✅ Onboarding nouveaux contributeurs
- ✅ Documentation scalable
- ✅ Cohérence globale

---

## 🚀 **PROCHAINES ÉTAPES**

1. **Approbation du plan** par Jean
2. **Création de la nouvelle structure**
3. **Migration progressive** des fichiers
4. **Validation et tests**
5. **Documentation finale**

---

*"L'ordre naît du chaos, et la clarté de l'organisation."* - Jean-Grofignon, Architecte de la Documentation 