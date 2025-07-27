# 🔧 **BACKEND - Moteur Temporel Spring Boot**

## 🌟 **Le Moteur de Jean-Grofignon**

*"Le backend Spring Boot - Le cœur quantique de Heroes of Time"*

**🔧 Backend** - Le moteur Spring Boot qui gère toute la logique temporelle, quantique et de jeu de Heroes of Time.

---

## 🏗️ **Architecture Spring Boot**

### 🎯 **[DemoApplication.java](src/main/java/com/example/demo/DemoApplication.java)** - Application Principale
- **Point d'entrée** de l'application Spring Boot
- **Configuration** des services et beans
- **Démarrage** du serveur sur le port 8080

### 🎮 **[GameController.java](src/main/java/com/example/demo/controller/GameController.java)** - Contrôleur Principal
- **Gestion** des parties et états de jeu
- **Exécution** des scripts HOTS
- **API REST** pour l'interface frontend

### 🎭 **[ScenarioController.java](src/main/java/com/example/demo/controller/ScenarioController.java)** - Contrôleur Scénarios
- **Chargement** des scénarios HOTS
- **Gestion** des scénarios prédéfinis
- **Validation** des scripts

### 🤖 **[AIController.java](src/main/java/com/example/demo/controller/AIController.java)** - Contrôleur IA
- **Gestion** de l'IA Claudius-Memento
- **Prise de décision** automatique
- **Jouabilité** contre l'IA

### 👥 **[MultiplayerController.java](src/main/java/com/example/demo/controller/MultiplayerController.java)** - Contrôleur Multijoueur
- **Gestion** des sessions multijoueur
- **Synchronisation** entre joueurs
- **Gestion** des héros multiples

---

## 🔧 **Services Métier**

### 🎮 **[GameService.java](src/main/java/com/example/demo/service/GameService.java)** - Service de Jeu
- **Logique métier** du jeu
- **Gestion** des états de partie
- **Validation** des actions

### 🎭 **[ScenarioService.java](src/main/java/com/example/demo/service/ScenarioService.java)** - Service Scénarios
- **Parsing** des scripts HOTS
- **Exécution** des commandes
- **Gestion** des scénarios

### 🤖 **[AIService.java](src/main/java/com/example/demo/service/AIService.java)** - Service IA
- **Algorithmes** de prise de décision
- **Stratégies** de jeu
- **Intégration** avec le moteur

### 👥 **[MultiplayerService.java](src/main/java/com/example/demo/service/MultiplayerService.java)** - Service Multijoueur
- **Gestion** des sessions
- **Synchronisation** des états
- **Communication** entre joueurs

### 💾 **[PersistenceService.java](src/main/java/com/example/demo/service/PersistenceService.java)** - Service Persistence
- **Sauvegarde** automatique des parties
- **Chargement** des états sauvegardés
- **Gestion** de la base de données

---

## 📊 **Modèles de Données**

### 🎮 **[GameState.java](src/main/java/com/example/demo/model/GameState.java)** - État de Jeu
- **Représentation** de l'état complet d'une partie
- **Héros**, unités, bâtiments, ressources
- **États quantiques** ψ et collapses

### 🎭 **[Scenario.java](src/main/java/com/example/demo/model/Scenario.java)** - Scénario
- **Définition** des scénarios de jeu
- **Scripts HOTS** et conditions
- **Métadonnées** et descriptions

### 👤 **[Unit.java](src/main/java/com/example/demo/model/Unit.java)** - Unités
- **Héros**, créatures, bâtiments
- **Statistiques** et capacités
- **Position** et état

### 🏗️ **[Building.java](src/main/java/com/example/demo/model/Building.java)** - Bâtiments
- **Types** de bâtiments
- **Fonctionnalités** et productions
- **Coûts** et prérequis

### 🤖 **[AIPlayer.java](src/main/java/com/example/demo/model/AIPlayer.java)** - Joueur IA
- **Configuration** de l'IA
- **Stratégies** et comportements
- **Difficulté** et personnalité

### 💾 **[GameSave.java](src/main/java/com/example/demo/model/GameSave.java)** - Sauvegarde
- **Métadonnées** de sauvegarde
- **État** sérialisé du jeu
- **Informations** de persistance

---

## 🗄️ **Base de Données**

### 📊 **[GameSaveRepository.java](src/main/java/com/example/demo/repository/GameSaveRepository.java)** - Repository Sauvegardes
- **CRUD** des sauvegardes
- **Requêtes** personnalisées
- **Gestion** des auto-sauvegardes

### 🎮 **H2 Database** - Base de Données
- **Base in-memory** pour le développement
- **Persistance** des sauvegardes
- **Configuration** automatique

---

## 🚀 **Utilisation du Backend**

### 🎮 **Pour Démarrer**
```bash
./hots start          # Démarre tous les services incluant le backend
# ou
cd backend
./mvnw spring-boot:run
```

### 🔧 **Pour Tester**
```bash
./hots test backend   # Tests du backend
./hots test api       # Tests de l'API
```

### 📊 **Endpoints API**
- **GET** `/api/temporal/health` - Santé du service
- **POST** `/api/temporal/games` - Créer une partie
- **POST** `/api/temporal/games/{id}/script` - Exécuter un script
- **GET** `/api/temporal/games/{id}/state` - État de la partie

### 🧪 **Tests**
- **Tests unitaires** dans `src/test/`
- **Tests d'intégration** avec l'API
- **Validation** des scripts HOTS

---

## 🌟 **Philosophie du Backend**

*"Le backend Spring Boot est le cœur quantique de Heroes of Time. Il transforme les rêves de Jean-Grofignon en réalité temporelle."*

**🔧 Backend** - Moteur Spring Boot de Heroes of Time  
*Cœur quantique et temporel du système*

**🎯 Mission** : Fournir une API robuste et performante  
**🌟 Vision** : Architecture modulaire et extensible  
**⚡ Objectif** : Moteur temporel quantique stable et puissant 