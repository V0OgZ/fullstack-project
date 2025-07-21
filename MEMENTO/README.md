# 🧠 MEMENTO - Mémoire de Développement
*Système de mémoire organisée pour le développement de Heroes of Time*

---

## 🎯 **QU'EST-CE QUE MEMENTO ?**

**MEMENTO** est le système de mémoire de développement de Heroes of Time. Il contient :
- **Historique des sessions** de développement
- **Connaissances techniques** accumulées
- **Décisions prises** et leurs justifications
- **Implémentations** et leurs détails
- **Expériences** et prototypes

**Principe** : Jean lit depuis son canapé sur GitHub. Toute information importante doit être documentée ici.

---

## 📁 **STRUCTURE ORGANISÉE**

### 🎯 **CURRENT_SESSION/**
- **[TODO.md](CURRENT_SESSION/TODO.md)** - Tâches actuelles de la session
- **[PROGRESS.md](CURRENT_SESSION/PROGRESS.md)** - Progrès en cours
- **[DECISIONS.md](CURRENT_SESSION/DECISIONS.md)** - Décisions prises

### 📚 **KNOWLEDGE_BASE/**
- **[JEAN_PHILOSOPHY.md](KNOWLEDGE_BASE/JEAN_PHILOSOPHY.md)** - Philosophie de Jean-Grofignon
- **[GROFI_KNOWLEDGE.md](KNOWLEDGE_BASE/GROFI_KNOWLEDGE.md)** - Connaissances du système GROFI
- **[TECHNICAL_INSIGHTS.md](KNOWLEDGE_BASE/TECHNICAL_INSIGHTS.md)** - Insights techniques

### 📈 **SESSION_HISTORY/**
- **[2025-07-20_SESSION.md](SESSION_HISTORY/2025-07-20_SESSION.md)** - Session du 20 juillet
- **[2025-07-21_SESSION.md](SESSION_HISTORY/2025-07-21_SESSION.md)** - Session du 21 juillet
- **[SESSION_INDEX.md](SESSION_HISTORY/SESSION_INDEX.md)** - Index des sessions

### 🔧 **IMPLEMENTATIONS/**
- **[TEMPORAL_DECAY_SYSTEM.md](IMPLEMENTATIONS/TEMPORAL_DECAY_SYSTEM.md)** - Système de décroissance
- **[INTERFACE_8000_COMPLETE.md](IMPLEMENTATIONS/INTERFACE_8000_COMPLETE.md)** - Interface port 8000
- **[IMPLEMENTATION_INDEX.md](IMPLEMENTATIONS/IMPLEMENTATION_INDEX.md)** - Index des implémentations

### 🧪 **EXPERIMENTS/**
- **[BENCHMARK_RESULTS/](EXPERIMENTS/BENCHMARK_RESULTS/)** - Résultats de tests
- **[PROTOTYPES/](EXPERIMENTS/PROTOTYPES/)** - Prototypes
- **[EXPERIMENT_INDEX.md](EXPERIMENTS/EXPERIMENT_INDEX.md)** - Index des expériences

---

## 🛋️ **RÈGLE DU CANAPÉ DE JEAN**

### **Principe Fondamental**
- **Jean lit depuis son canapé sur GitHub** - Ne jamais demander à Jean de cliquer
- **Documenter TOUT** - Chaque décision, chaque découverte, chaque problème
- **Pousser fréquemment** - Après chaque analyse ou découverte importante
- **Être autonome** - Prendre des décisions, ne pas demander constamment

### **Workflow MEMENTO**
1. **Analyser d'abord** - Comprendre avant de coder
2. **Documenter dans MEMENTO/** - Toutes les découvertes et analyses
3. **Pousser les analyses** - Avant tout travail de développement
4. **Tester fréquemment** - Utiliser `./hots test quick` ou tests spécifiques
5. **Commit & push** - Après changements significatifs

---

## 📋 **CHECKLIST DE SESSION**

### **Début de Session**
- ✅ Lire `.cursorrules` (règles du projet)
- ✅ Lire `MEMENTO/TODO_SESSION_ACTUELLE.md`
- ✅ Vérifier `MEMENTO/JEAN_MESSAGES_BEST_OF.md` pour le contexte
- ✅ Exécuter `./hots status` pour vérifier les services
- ✅ Si nécessaire : `./hots start` pour lancer les services

### **Pendant le Développement**
- ✅ Documenter chaque découverte dans MEMENTO/
- ✅ Pousser les analyses avant de coder
- ✅ Tester fréquemment avec les scripts appropriés
- ✅ Mettre à jour TODO.md avec le progrès

### **Fin de Session**
- ✅ Commit & push de tous les changements
- ✅ Mettre à jour PROGRESS.md avec les accomplissements
- ✅ Documenter les décisions dans DECISIONS.md
- ✅ Préparer TODO.md pour la prochaine session

---

## 🎯 **TYPES DE CONTENU MEMENTO**

### **📝 Rapports de Session**
- **Quand** : À la fin de chaque session
- **Contenu** : Ce qui a été fait, problèmes rencontrés, solutions trouvées
- **Format** : `YYYY-MM-DD_SESSION.md`

### **🔍 Analyses Techniques**
- **Quand** : Avant d'implémenter une fonctionnalité
- **Contenu** : Analyse du problème, solutions possibles, décision prise
- **Format** : `ANALYSE_[SUJET].md`

### **🏗️ Implémentations**
- **Quand** : Après avoir implémenté une fonctionnalité
- **Contenu** : Détails techniques, choix d'architecture, tests
- **Format** : `IMPLEMENTATION_[SYSTÈME].md`

### **🧪 Expériences**
- **Quand** : Tests, prototypes, explorations
- **Contenu** : Hypothèses, résultats, conclusions
- **Format** : `EXPERIMENT_[SUJET].md`

---

## 📊 **CONVENTIONS DE NOMENCLATURE**

### **Fichiers de Session**
```
YYYY-MM-DD_SESSION.md              # Session complète
YYYY-MM-DD_[TYPE]_[SUJET].md       # Rapport spécifique
```

### **Fichiers d'Analyse**
```
ANALYSE_[SUJET]_[DATE].md          # Analyse technique
RAPPORT_[SUJET]_[DATE].md          # Rapport de recherche
```

### **Fichiers d'Implémentation**
```
IMPLEMENTATION_[SYSTÈME].md        # Implémentation complète
FIX_[PROBLÈME].md                  # Correction de bug
```

### **Fichiers d'Expérience**
```
EXPERIMENT_[SUJET].md              # Expérience complète
BENCHMARK_[SYSTÈME].md             # Tests de performance
```

---

## 🎭 **PHILOSOPHIE MEMENTO**

### **Citations de Jean**
- "Il faut vraiment qu'on fouille partout, tu vois, faut qu'on trouve tous ces machins planqués"
- "C'est un jeu qui cache de la physique quantique sous une couche de fantasy"
- "Les joueurs pensent lancer des sorts, mais ils manipulent des états quantiques"

### **Principes GROFI**
- **L'Ordre a besoin du Chaos** - Équilibre dans la documentation
- **Le Code a besoin de Bugs** - Documenter même les imperfections
- **Mécaniques quantiques cachées** - Révéler les détails techniques

---

## 🚀 **COMMANDES UTILES**

### **Navigation MEMENTO**
```bash
# Voir la structure
tree MEMENTO/

# Chercher dans MEMENTO
grep -r "mot-clé" MEMENTO/

# Lister les sessions récentes
ls -la MEMENTO/SESSION_HISTORY/
```

### **Documentation Rapide**
```bash
# Créer une nouvelle session
echo "# Session $(date +%Y-%m-%d)" > MEMENTO/SESSION_HISTORY/$(date +%Y-%m-%d)_SESSION.md

# Mettre à jour TODO
nano MEMENTO/CURRENT_SESSION/TODO.md
```

---

## 📈 **MÉTRIQUES MEMENTO**

### **Statistiques de Session**
- **Fichiers créés** : Nombre de nouveaux fichiers
- **Tests réalisés** : Nombre de tests exécutés
- **Documentation** : Pages de documentation créées/modifiées
- **Problèmes résolus** : Bugs corrigés, fonctionnalités ajoutées

### **Qualité du Contenu**
- **Cohérence** : Les informations sont-elles cohérentes ?
- **Complétude** : Tous les aspects sont-ils couverts ?
- **Lisibilité** : Jean peut-il comprendre depuis son canapé ?
- **Actionabilité** : Les informations permettent-elles d'agir ?

---

**🎯 RAPPEL**: Vous êtes Memento. Tatouez les infos importantes. Jean lit depuis son canapé. Documentez tout. Soyez autonome.

*Dernière mise à jour: 21 Juillet 2025 - Réorganisation complète du système MEMENTO* 