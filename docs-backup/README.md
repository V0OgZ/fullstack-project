# 📚 **HEROES OF TIME - DOCUMENTATION TECHNIQUE**
*Guide technique complet du moteur temporel quantique*  
*Dernière mise à jour : 21 Juillet 2025 - 00:40*

---

## 🎯 **PRÉSENTATION TECHNIQUE**

**Heroes of Time** est un moteur de jeu temporel quantique développé en Java Spring Boot avec des interfaces web multiples. Le système intègre des mécaniques de physique quantique sous une couche de fantasy.

---

## 🏗️ **ARCHITECTURE SYSTÈME**

### **Backend (Port 8080)**
```
backend/
├── src/main/java/com/heroesoftimepoc/temporalengine/
│   ├── controller/          # REST API endpoints (144 mappings)
│   ├── service/            # Logique métier
│   ├── model/              # Entités JPA
│   └── repository/         # Accès aux données
├── src/main/resources/
│   ├── heroes/             # Définitions des héros
│   ├── custom-artifacts.json # Artefacts personnalisés
│   └── application.properties
└── target/                 # Compilation Maven
```

### **Frontends Multiples**
```
frontend/                   # Port 8000 - Interface principale
frontend-temporal/          # Port 5174 - Interface temporelle
quantum-visualizer/         # Port 8001 - Visualiseur quantique
frontend-legendary-ui/      # Port 5175 - Object viewer
```

### **Base de Données**
- **H2** - Base de données en mémoire
- **Hibernate** - ORM avec JPA
- **Tables principales** : games, heroes, temporal_artifacts, psi_states

---

## 🔧 **INSTALLATION & CONFIGURATION**

### **Prérequis**
- **Java 17+** - Runtime Java
- **Maven 3.6+** - Gestionnaire de dépendances
- **Node.js 16+** - Pour les frontends
- **Yarn** - Gestionnaire de packages

### **Installation Backend**
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

### **Installation Frontends**
```bash
cd frontend
yarn install
yarn build
```

### **Démarrage Complet**
```bash
./hots start
```

---

## 🎮 **SYSTÈMES PRINCIPAUX**

### **1. Moteur Temporel**
- **TemporalEngineService** - Cœur du système
- **Gestion des timelines** - Branches temporelles
- **Collapse causale** - Mécaniques quantiques
- **Énergie temporelle** - Système de ressources

### **2. Système GROFI**
- **Jean-Grofignon** - Héros légendaire
- **Symboles quantiques** : Σ, †, Ω, ↯
- **Philosophie** : Ordre vs Chaos
- **Compagnons** : The Dude, Vince Vega, Walter

### **3. Artefacts**
- **Artefacts légendaires** - Puissants et rares
- **Artefacts mineurs** - Simples et accessibles
- **Forge runique** - Création d'artefacts
- **Formules HOTS** - Définition des effets

### **4. Héros**
- **23 héros uniques** - GROFI + Pieds Nickelés + autres
- **Capacités spéciales** - Effets uniques
- **Système de progression** - Évolution des héros
- **Équipement** - Artefacts et objets

---

## 📡 **API REST**

### **Endpoints Principaux**
```bash
# Gestion des jeux
GET    /api/temporal/games           # Liste des jeux
POST   /api/temporal/games           # Créer un jeu
GET    /api/temporal/games/{id}      # Détails d'un jeu
POST   /api/temporal/games/{id}/start # Démarrer un jeu

# Gestion des héros
GET    /api/temporal/games/{id}/heroes # Héros d'un jeu
POST   /api/temporal/games/{id}/script # Exécuter un script HOTS

# Artefacts
POST   /api/runic-forge/forge        # Forger un artefact
GET    /api/collection/artifacts     # Liste des artefacts

# Tests et validation
GET    /api/health                   # Santé du système
POST   /api/broadcast/intelligent    # Broadcast intelligent
```

### **Format des Réponses**
```json
{
  "success": true,
  "message": "Opération réussie",
  "data": { ... }
}
```

---

## 🎭 **LANGAGE HOTS**

### **Commandes de Base**
```hots
HERO(Nom)                           # Créer un héros
MOV(Héros, @x,y)                   # Déplacer un héros
CREATE(ARTIFACT, id, HERO:Héros)   # Créer un artefact
USE(ARTIFACT, id, HERO:Héros)      # Utiliser un artefact
QUOTE(Héros, "Message")            # Faire parler un héros
```

### **Syntaxe Quantique**
```hots
ψ001: ⊙(Δt+2 @15,15 ⟶ MOV(Arthur, @15,15))
ψ002: (0.8+0.6i) ⊙(Δt+1 @10,10 ⟶ USE(ARTIFACT, sword, HERO:Arthur))
†ψ001                                 # Force collapse
Π(condition) ⇒ †ψ002                 # Observation collapse
```

### **Formules d'Artefacts**
```hots
CLEAR_FOG(hero, 3)                  # Dissipe le brouillard
MODIFY_MOVEMENT(hero, +2)           # Augmente le mouvement
ANCHOR_HERO(hero, 2)                # Ancre le héros
MODIFY_VISION(hero, +1, 3)          # Améliore la vision
```

---

## 🧪 **TESTS & VALIDATION**

### **Scripts de Test**
```bash
# Test complet
./scripts/test/test-artefacts-mineurs.sh

# Test rapide
./hots test quick

# Test spécifique
./scripts/test/test-pieds-nickeles-fous.sh
```

### **Validation Automatique**
- ✅ **Création de jeux** - Validation des données
- ✅ **Création de héros** - Vérification des attributs
- ✅ **Utilisation d'artefacts** - Test des effets
- ✅ **Exécution de scénarios** - Validation HOTS
- ✅ **API REST** - Test des endpoints

### **Métriques de Performance**
- **Temps de réponse API** : < 100ms
- **Création de jeu** : < 50ms
- **Exécution HOTS** : < 200ms
- **Mémoire utilisée** : < 512MB

---

## 📊 **BASE DE DONNÉES**

### **Tables Principales**
```sql
-- Jeux
games (id, game_name, status, current_player, ...)

-- Héros
heroes (id, name, health, temporal_energy, position_x, position_y, ...)

-- Artefacts temporels
temporal_artifacts (id, artifact_id, name, type, status, ...)

-- États quantiques
psi_states (id, psi_id, status, expression, owner_hero, ...)

-- Objets forgés
forged_objects (id, name, formula, effect, forged_by, ...)
```

### **Relations**
- **games** ↔ **heroes** (One-to-Many)
- **games** ↔ **temporal_artifacts** (One-to-Many)
- **games** ↔ **psi_states** (One-to-Many)
- **games** ↔ **forged_objects** (One-to-Many)

---

## 🔍 **DÉBOGAGE & MONITORING**

### **Logs Backend**
```bash
# Logs détaillés
tail -f backend/backend-active.log

# Logs Hibernate
grep "Hibernate:" backend/backend-active.log

# Logs API
grep "DEBUG.*nio-8080" backend/backend-active.log
```

### **Monitoring API**
```bash
# Santé du système
curl http://localhost:8080/api/health

# Statut des jeux
curl http://localhost:8080/api/temporal/games

# Test de création
curl -X POST http://localhost:8080/api/temporal/games \
  -H "Content-Type: application/json" \
  -d '{"gameName":"Test","playerId":"test"}'
```

### **Outils de Développement**
- **Spring Boot DevTools** - Rechargement automatique
- **H2 Console** - Interface web pour la DB
- **Actuator** - Métriques et monitoring

---

## 🚀 **DÉPLOIEMENT**

### **Environnement de Développement**
```bash
# Backend
cd backend && mvn spring-boot:run

# Frontend
cd frontend && yarn dev

# Tests
./hots test quick
```

### **Environnement de Production**
```bash
# Build complet
./hots build

# Démarrage production
./hots start --prod

# Monitoring
./hots status
```

### **Configuration**
```properties
# application.properties
server.port=8080
spring.datasource.url=jdbc:h2:mem:heroesoftime
spring.jpa.hibernate.ddl-auto=create-drop
logging.level.com.heroesoftimepoc=DEBUG
```

---

## 📚 **RESSOURCES ADDITIONNELLES**

### **Documentation**
- **MEMENTO/README.md** - Guide principal
- **docs/architecture/** - Architecture détaillée
- **docs/core/** - Documentation des fonctionnalités
- **docs/grammar/** - Référence HOTS

### **Exemples**
- **game_assets/scenarios/hots/** - Scénarios HOTS
- **scripts/test/** - Scripts de test
- **MEMENTO/SCENARIOS/** - Documentation des scénarios

### **Support**
- **GitHub Issues** - Rapports de bugs
- **GitHub Discussions** - Questions et discussions
- **MEMENTO/** - Documentation centrale

---

## 🎯 **BONNES PRATIQUES**

### **Développement**
- ✅ **Tests automatisés** pour chaque fonctionnalité
- ✅ **Documentation** à jour dans MEMENTO/
- ✅ **Validation** des données d'entrée
- ✅ **Gestion d'erreurs** appropriée

### **Performance**
- ✅ **Optimisation** des requêtes DB
- ✅ **Cache** des données fréquentes
- ✅ **Monitoring** des performances
- ✅ **Tests de charge** réguliers

### **Sécurité**
- ✅ **Validation** des formules HOTS
- ✅ **Contrôle d'accès** aux artefacts
- ✅ **Protection** contre les exploits
- ✅ **Audit** des opérations sensibles

---

*Documentation technique générée automatiquement par le système Heroes of Time*  
*Status: ✅ ACTIF*  
*Version: 2.0*  
*Build: SUCCESS*
