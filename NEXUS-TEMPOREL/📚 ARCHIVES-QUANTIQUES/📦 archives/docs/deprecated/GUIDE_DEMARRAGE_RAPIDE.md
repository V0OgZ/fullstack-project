# 🚀 HEROES OF TIME - GUIDE DE DÉMARRAGE RAPIDE

**Bienvenue dans l'équipe Heroes of Time !** Ce guide vous permettra de comprendre rapidement le projet et de commencer à contribuer.

---

## 📖 Comprendre le Projet en 5 Minutes

### Qu'est-ce que Heroes of Time ?

Heroes of Time est un **jeu de stratégie temporelle quantique** où les joueurs peuvent :
- 🌀 Planifier des actions dans le futur (états quantiques)
- ⏱️ Naviguer entre plusieurs timelines parallèles
- 🎯 Utiliser la physique quantique pour créer des stratégies
- 🦸 Jouer des héros légendaires avec des pouvoirs spéciaux

### Concepts Clés à Retenir

1. **ψ-State** : Une action planifiée qui existe en "superposition" jusqu'à son exécution
2. **Timeline (ℬ)** : Une branche temporelle du jeu (comme un univers parallèle)
3. **Collapse** : Quand une action planifiée se matérialise dans le jeu
4. **Amplitude Complexe** : Un nombre complexe (a+bi) qui détermine la probabilité d'une action
5. **GROFI** : Système de héros spéciaux avec des pouvoirs méta

---

## 🛠️ Installation Rapide

### Prérequis
- Java 17+
- Maven 3.6+
- Node.js 16+
- Git

### Étapes d'Installation

```bash
# 1. Cloner le projet
git clone https://github.com/your-org/heroes-of-time.git
cd heroes-of-time

# 2. Installer et démarrer le backend
cd backend
mvn clean install
mvn spring-boot:run

# 3. Dans un autre terminal, installer et démarrer le frontend
cd ../frontend
npm install
npm start

# 4. Ouvrir le navigateur
# Frontend: http://localhost:8000
# API: http://localhost:8080
# WebSocket: ws://localhost:8001
```

---

## 🎮 Premier Test : Créer une Action Temporelle

### 1. Via l'API REST

```bash
# Créer une partie
curl -X POST http://localhost:8080/api/games \
  -H "Content-Type: application/json" \
  -d '{"playerName": "TestPlayer"}'

# Exécuter un script temporel (remplacer {gameId})
curl -X POST http://localhost:8080/api/temporal/execute/{gameId} \
  -H "Content-Type: application/json" \
  -d '{
    "script": "HERO(Arthur)\nψ001: ⊙(Δt+2 @10,10 ⟶ MOV(HERO, Arthur, @10,10))"
  }'
```

### 2. Via l'Interface Web

1. Ouvrir http://localhost:8000
2. Créer une nouvelle partie
3. Dans la console de script, taper :
```javascript
HERO(Arthur)
ψ001: ⊙(Δt+2 @10,10 ⟶ MOV(HERO, Arthur, @10,10))
```
4. Observer Arthur se déplacer après 2 tours !

---

## 📝 Syntaxe du Langage Temporel

### Commandes de Base

```javascript
// Créer un héros
HERO(Arthur)

// Déplacer un héros
MOV(Arthur, @15,15)

// Combat
BATTLE(Arthur, Dragon)

// Utiliser un artefact
USE(ITEM, TemporalSword, HERO:Arthur)
```

### Commandes Temporelles

```javascript
// Créer un état quantique (action future)
ψ001: ⊙(Δt+2 @10,10 ⟶ MOV(HERO, Arthur, @10,10))
//     │  │    │         └─ Action à exécuter
//     │  │    └─ Position cible
//     │  └─ Dans 2 tours
//     └─ Symbole de superposition

// Avec amplitude complexe (avancé)
ψ002: (0.8+0.6i) ⊙(Δt+1 @5,5 ⟶ BATTLE(Arthur, Dragon))
//     └─ Amplitude complexe (probabilité = |0.8+0.6i|² = 1.0)

// Forcer un collapse
†ψ001

// Trigger conditionnel
Π(Arthur enters @10,10) ⇒ †ψ001
```

---

## 🏗️ Architecture Simplifiée

```
heroes-of-time/
├── 🖥️ backend/                      # API Spring Boot
│   ├── temporalengine/          
│   │   ├── service/             # Logique métier
│   │   │   ├── TemporalEngineService.java    # Moteur principal
│   │   │   ├── CausalCollapseService.java    # Gestion des collapses
│   │   │   └── GrofiHeroService.java         # Héros spéciaux
│   │   ├── controller/          # Endpoints REST
│   │   └── model/               # Entités
│   └── resources/               
│       └── grofi/               # Fichiers JSON des héros
├── 🌐 frontend/                    # Interface React
│   ├── components/              
│   │   ├── GameBoard.jsx        # Plateau de jeu
│   │   ├── Timeline.jsx         # Visualisation temporelle
│   │   └── ScriptConsole.jsx    # Console de commandes
│   └── services/                # Communication API
└── 📖 docs/                        # Documentation
```

---

## 🔍 Points d'Entrée pour Explorer le Code

### Backend - Commencer par :

1. **`TemporalEngineService.java`** - Le cœur du moteur temporel
   ```java
   // Méthode principale pour exécuter un script
   public Map<String, Object> executeTemporalGameScript(Long gameId, String script)
   ```

2. **`CausalCollapseService.java`** - Gestion des collapses
   ```java
   // Détection des triggers de collapse
   public CollapseTrigger detectCollapseTrigger(Game game, PsiState state)
   ```

3. **`GrofiHeroService.java`** - Héros spéciaux et immunités
   ```java
   // Récupérer les immunités d'un héros
   public List<String> getHeroImmunities(Hero hero)
   ```

### Frontend - Commencer par :

1. **`App.js`** - Point d'entrée React
2. **`GameBoard.jsx`** - Visualisation du plateau
3. **`apiService.js`** - Communication avec le backend

---

## 🧪 Tests Rapides

### Tester les Interférences Quantiques

```javascript
// Interférence constructive (amplification)
ψ001: (0.707+0.0i) ⊙(Δt+1 @5,5 ⟶ BATTLE(Arthur, Dragon))
ψ002: (0.707+0.0i) ⊙(Δt+1 @5,5 ⟶ BATTLE(Arthur, Dragon))
// Résultat : Dégâts doublés !

// Interférence destructive (annulation)
ψ003: (1.0+0.0i) ⊙(Δt+1 @10,10 ⟶ MOV(Arthur, @10,10))
ψ004: (-1.0+0.0i) ⊙(Δt+1 @10,10 ⟶ MOV(Ragnar, @10,10))
// Résultat : Les deux mouvements s'annulent !
```

### Tester un Héros GROFI

```javascript
// Créer Jean-Grofignon (héros légendaire)
HERO(Jean-Grofignon)

// Utiliser son pouvoir ultime
ψ†[FREEZE {all.timeline.superposition}]
// Tous les états quantiques sont gelés !
```

---

## 📚 Documentation Approfondie

Pour aller plus loin :

1. **[DOCUMENTATION_TECHNIQUE_COMPLETE.md](./DOCUMENTATION_TECHNIQUE_COMPLETE.md)** - Architecture détaillée
2. **[TEMPORAL_CODEX.md](./TEMPORAL_CODEX.md)** - Référence complète du langage
3. **[ARCHITECTURE_DIAGRAMS.md](./ARCHITECTURE_DIAGRAMS.md)** - Diagrammes visuels
4. **[📖 docs/GROFI/](./GROFI/)** - Système des héros spéciaux

---

## 🤝 Contribuer au Projet

### Workflow Git

```bash
# 1. Créer une branche pour votre feature
git checkout -b feature/ma-nouvelle-fonctionnalite

# 2. Faire vos modifications
# ...

# 3. Commiter avec un message clair
git commit -m "feat: Ajouter la téléportation quantique"

# 4. Pousser et créer une PR
git push origin feature/ma-nouvelle-fonctionnalite
```

### Standards de Code

- **Java** : Suivre les conventions Java standard
- **JavaScript** : ESLint configuré dans le projet
- **Commits** : Format conventionnel (feat:, fix:, docs:, etc.)

### Tests

```bash
# Backend
cd backend
mvn test

# Frontend
cd frontend
npm test
```

---

## 🆘 Besoin d'Aide ?

### Ressources

- **Discord** : [Lien vers le Discord de l'équipe]
- **Wiki** : [Lien vers le wiki du projet]
- **Issues** : [GitHub Issues pour les bugs/features]

### Contacts

- **Lead Dev** : [Contact du lead]
- **Architecture** : [Contact architecture]
- **Game Design** : [Contact game design]

---

## 🎯 Prochaines Étapes

1. ✅ Installer le projet
2. ✅ Lancer un premier test
3. 📖 Lire la doc technique complète
4. 🔧 Choisir une issue "good first issue"
5. 💻 Commencer à coder !

---

**Bienvenue dans l'aventure temporelle ! 🚀**

*"Le futur du jeu stratégique quantique commence avec vous !"*