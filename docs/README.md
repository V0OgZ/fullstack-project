# 📚 Heroes of Time - Documentation Officielle
*Documentation complète et organisée du jeu de stratégie temporelle quantique*

---

## 🎯 **VUE D'ENSEMBLE**

**Heroes of Time** est un moteur de jeu de stratégie temporelle quantique avec :
- **Backend Java Spring Boot** (port 8080) - Moteur temporal principal
- **Frontends multiples** (ports 8000, 5174, 8001, 5175) - Interfaces utilisateur
- **Langage HOTS** - 22 fichiers de scénarios (.hots)
- **Framework de tests** - 15+ scripts de test, contrôleur principal : `./hots`
- **Système GROFI** - Mécaniques quantiques de Jean-Grofignon

---

## 📖 **NAVIGATION RAPIDE**

### 🎮 **GAMEPLAY**
- **[Mécaniques de Base](GAMEPLAY/CORE_MECHANICS.md)** - Règles fondamentales du jeu
- **[Guide HOTS](GAMEPLAY/HOTS_SCRIPTING.md)** - Langage de script temporel
- **[Systèmes Quantiques](GAMEPLAY/QUANTUM_SYSTEMS.md)** - Mécaniques quantiques
- **[Décroissance Temporelle](GAMEPLAY/TEMPORAL_DECAY.md)** - Système Anna the Martopicker

### 🏗️ **ARCHITECTURE**
- **[Vue d'Ensemble](ARCHITECTURE/SYSTEM_OVERVIEW.md)** - Architecture générale
- **[Backend](ARCHITECTURE/BACKEND_ARCHITECTURE.md)** - Architecture du moteur
- **[Frontend](ARCHITECTURE/FRONTEND_ARCHITECTURE.md)** - Interfaces utilisateur
- **[API Reference](ARCHITECTURE/API_REFERENCE.md)** - Documentation API

### 🎭 **LORE**
- **[Histoire du Monde](LORE/WORLD_HISTORY.md)** - Contexte narratif
- **[Catalogue des Héros](LORE/HEROES_CATALOG.md)** - Tous les héros
- **[Guide des Artefacts](LORE/ARTIFACTS_GUIDE.md)** - Artefacts et objets
- **[Système GROFI](LORE/GROFI_SYSTEM.md)** - Mécaniques de Jean-Grofignon

### 🛠️ **DÉVELOPPEMENT**
- **[Guide d'Installation](DEVELOPMENT/SETUP_GUIDE.md)** - Installation et configuration
- **[Guide Contributeur](DEVELOPMENT/CONTRIBUTING.md)** - Comment contribuer
- **[Guide des Tests](DEVELOPMENT/TESTING.md)** - Tests et validation

### 📊 **RAPPORTS**
- **[Statut Actuel](REPORTS/CURRENT_STATUS.md)** - État du projet
- **[Feuille de Route](REPORTS/ROADMAP.md)** - Plan de développement

---

## 🚀 **DÉMARRAGE RAPIDE**

### **Commandes Principales**
```bash
./hots help                    # Afficher toutes les commandes
./hots status                  # Vérifier le statut des 7 services
./hots start                   # Démarrer tous les services
./hots test quick              # Tests rapides (1-2 min)
./hots test report             # Rapport système complet
```

### **Services**
```bash
# Backend (Moteur Principal)
cd backend && mvn spring-boot:run

# Tous les Services
./scripts/actifs/start-services-background.sh    # Démarrer tout
./scripts/actifs/stop-all-services.sh           # Arrêter tout
```

### **Tests (Préférés par Jean)**
```bash
./scripts/test-jean-gros-FIXED.sh               # Script de test corrigé
./hots test maven                                # Compilation backend
./hots test scenarios                            # Tous les scénarios HOTS
./hots test final                                # Suite de tests complète
```

---

## 🎮 **LANGAGE HOTS**

### **Commandes de Base**
```hots
HERO(Arthur)                          # Créer un héros
MOV(Arthur, @15,15)                   # Déplacer vers coordonnées
CREATE(ITEM, sword, HERO:Arthur)      # Créer un objet pour le héros
USE(ARTIFACT, wigner_eye, HERO:Arthur) # Utiliser un artefact
BATTLE(Arthur, Ragnar)                # Combat
```

### **Syntaxe Temporelle Quantique**
```hots
# États de superposition quantique
ψ001: ⊙(Δt+2 @15,15 ⟶ MOV(Arthur, @15,15))
ψ002: (0.8+0.6i) ⊙(Δt+1 @10,10 ⟶ USE(ARTIFACT, sword, HERO:Arthur))

# Effondrement d'états
†ψ001                                 # Effondrement forcé
Π(condition) ⇒ †ψ002                 # Effondrement par observation
```

### **Symboles GROFI (Système Jean-Grofignon)**
- **Σ** - Somme de toutes les possibilités
- **†** - Mort/renaissance quantique
- **Ω** - Finalité ultime
- **↯** - Chaos contrôlé

---

## 🔧 **ARCHITECTURE TECHNIQUE**

### **Structure Backend**
```
backend/src/main/java/com/heroesoftimepoc/temporalengine/
├── controller/          # Endpoints REST API
├── service/            # Logique métier (TemporalEngineService, etc.)
├── model/              # Entités JPA (Hero, Game, PsiState, etc.)
└── repository/         # Couche d'accès aux données
```

### **Services Clés**
- **TemporalEngineService** - Mécaniques de jeu principales
- **TemporalScriptParser** - Parsing des scripts HOTS
- **ArtifactEffectExecutor** - Système d'artefacts
- **GrofiHeroService** - Héros spéciaux de Jean-Grofignon
- **CausalCollapseService** - Mécaniques quantiques

### **Structure Frontend**
- **frontend/** - Interface principale (port 8000)
- **frontend-temporal/** - Interface temporelle (port 5174)
- **quantum-visualizer/** - Interface quantique (port 8001)
- **frontend-legendary-ui/** - Visualiseur d'objets (port 5175)

---

## 🚨 **PROBLÈMES CONNUS & SOLUTIONS**

### **Problèmes Backend Connus**
- ⚠️ **Erreur JPA**: "Not a managed type: class Game" - Attendu, système fonctionne
- ⚠️ **Compilation Maven**: Certaines méthodes manquantes (executeFormula) - Non bloquant
- ✅ **API fonctionnelle**: Endpoints principaux fonctionnent malgré les avertissements

### **Problèmes Terminal (dquote>)**
- **CAUSE**: echo avec guillemets imbriqués, emojis, messages multi-lignes
- **SOLUTION**: Toujours utiliser des guillemets simples : `echo 'message'`
- **ÉCHAPPER**: Ctrl+C pour sortir, puis nettoyer les ports : `lsof -ti:PORT | xargs kill -9`

### **Règles Git (Agent Partagé)**
- ❌ **JAMAIS**: `git reset --hard` ou `git push --force`
- ✅ **UTILISER**: `git checkout <commit> -- <file>` pour restaurer des fichiers
- ✅ **COMMIT**: Fréquemment avec des messages descriptifs

---

## 📊 **ALLOCATION DES PORTS (FIXE - NE PAS CHANGER)**
- **9000** - Dashboard principal
- **8000** - Frontend principal
- **8080** - Backend API (Spring Boot)
- **5174** - Interface temporelle
- **8001** - Visualiseur quantique
- **5175** - Visualiseur d'objets
- **8888** - Interface de test runner

---

## 🎯 **SYSTÈMES IMPLÉMENTÉS**

### **Mur de Causalité**
- Limite le mouvement des héros selon l'énergie temporelle
- Implémentation : `TemporalEngineService.moveGameHero()`
- Test : `./scripts/test-causality-wall.sh`

### **Vision Temporelle (Lunette Magique)**
- Permet de voir 3 jours dans le futur
- Implémentation : `ArtifactEffectExecutor.executeMagicSpyglass()`
- Test : `./scripts/test-vision-temporelle.sh`

### **Système GROFI**
- Graph of Reality Organized by Fog and Immunities
- Déclencheurs d'effondrement causal : INTERACTION, OBSERVATION, ANCHORING, TEMPORAL_LIMIT
- Service : `CausalCollapseService.java`

---

## 📁 **INVENTAIRE DU PROJET**

### **Fichiers HOTS** (22 total)
- **Scénarios**: `game_assets/scenarios/hots/` (12 fichiers)
- **Tests**: `game_assets/tests/hots/` (8 fichiers)
- **Templates**: `game_templates/*/scenarios/` (2 fichiers)

### **Scripts de Test** (15+ total)
- **Principal**: `./hots test [type]` - Contrôleur de test principal
- **Rapide**: `./scripts/test-jean-gros-FIXED.sh` - Version fonctionnelle
- **Spécialisés**: Voir `./hots test list` pour l'inventaire complet

### **Héros & Personnages**
- **Jean-Grofignon** - L'Éveillé Ontologique (Admin-Légende)
- **Claudius** - Maître Ordre vs Chaos
- **Arthur** - Roi Temporel (la plupart des scénarios)
- **Lysandrel** - Forgeur de Réalité
- **The Dude, Vince Vega, Walter** - Équipe GROFI

---

## 💡 **PHILOSOPHIE DE JEAN**

### **Citations Clés**
- "C'est un jeu qui cache de la physique quantique sous une couche de fantasy"
- "Les joueurs pensent lancer des sorts, mais ils manipulent des états quantiques"
- "Il faut vraiment qu'on fouille partout, tu vois, faut qu'on trouve tous ces machins planqués"

### **Vision GROFI**
- **L'Ordre a besoin du Chaos** - Équilibre Claudius + Jean-Grofignon
- **Le Code a besoin de Bugs** - Philosophie de l'imperfection parfaite
- **Mécaniques quantiques cachées sous la fantasy** - Design de jeu principal

---

**🎯 RAPPEL**: Vous êtes Memento. Tatouez les infos importantes. Jean lit depuis son canapé. Poussez toujours avant de coder. Soyez autonome mais documentez tout.

*Dernière mise à jour: 21 Juillet 2025 - Réorganisation complète de la documentation*
