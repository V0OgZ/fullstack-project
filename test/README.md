# 🧪 Heroes of Time - Système de Test Complet

Ce dossier contient le système de test d'intégration complet pour Heroes of Time, utilisant des scénarios réalistes avec le langage de script .hots et des objets JSON.

## 🎯 **Objectif**

Tester toutes les fonctionnalités du moteur temporel dans un environnement réaliste en utilisant :
- **Scripts .hots** : Langage de script temporel avec syntaxe quantique
- **Objets JSON** : Définition des artefacts temporels et créatures
- **Scénarios complets** : Simulation de parties complètes
- **Tests d'intégration** : Validation du système bout en bout

## 📁 **Structure des Fichiers**

```
test/
├── artefacts/
│   ├── scenarios/
│   │   └── bataille_temporelle.json      # Scénario de test principal
│   ├── objects/
│   │   ├── temporal_artifacts.json       # Artefacts temporels
│   │   └── creatures.json                # Créatures et monstres
│   └── scripts/
│       ├── bataille_temporelle_setup.hots    # Script de configuration
│       ├── bataille_temporelle_combat.hots   # Script de combat
│       └── bataille_temporelle_finale.hots   # Script de résolution
├── run-bataille-temporelle.sh           # Script d'exécution automatique
└── README.md                           # Ce fichier
```

## 🚀 **Utilisation Rapide**

### Exécution Automatique

```bash
# Lancer le test d'intégration complet
./test/run-bataille-temporelle.sh
```

### Exécution Manuelle

```bash
# 1. Démarrer le backend
cd backend
mvn spring-boot:run &

# 2. Exécuter les tests
mvn test -Dtest=BatailleTemporelleIntegrationTest
```

## 📊 **Scénario "Bataille Temporelle"**

### Description
Scénario de test complet simulant une bataille épique entre deux héros (Arthur et Morgana) avec :
- **2 héros** avec statistiques et inventaires
- **4 créatures** : Dragon Rouge, Guerriers Fantômes, Élémentaire Temporel, Araignées Quantiques
- **7 artefacts temporels** : Lame d'Avant-Monde, Horloge Inversée, Orbe de Probabilité, etc.
- **Zones spéciales** : Zones temporelles et champs quantiques
- **26 états ψ** : Superpositions quantiques complexes

### Phases du Test

#### 🔧 **Phase 1 : Setup**
- Création des héros Arthur et Morgana
- Placement des créatures et artefacts
- Configuration des zones temporelles
- Création des premiers états ψ

#### ⚔️ **Phase 2 : Combat**
- Mouvements avec superposition quantique
- Utilisation d'artefacts temporels
- Batailles fantômes
- Manipulation des probabilités
- Résolution de conflits temporels

#### 🏁 **Phase 3 : Finale**
- Bataille finale pour la Lame d'Avant-Monde
- Contrôle des zones temporelles
- Résolution des paradoxes temporels
- Nettoyage et statistiques

## 🔬 **Fonctionnalités Testées**

### ✅ **Mécaniques Temporelles**
- **États ψ** : Création, manipulation, collapse
- **Superpositions** : Multiples possibilités simultanées
- **Observations** : Déclenchement de collapses
- **Branching** : Création de timelines parallèles
- **Rewind** : Retour en arrière dans le temps

### ✅ **Artefacts Temporels**
- **Tier 1-5** : Système de puissance progressive
- **Synergies** : Combinaisons d'artefacts
- **Effets quantiques** : Probabilités, quantum boost
- **Coûts temporels** : Gestion de l'énergie temporelle

### ✅ **Créatures Avancées**
- **Résistance temporelle** : Immunité aux effets temporels
- **Capacités spéciales** : Manipulation du temps
- **Interactions** : Comportements entre créatures
- **Loot dynamique** : Récompenses basées sur les conditions

### ✅ **Système de Jeu**
- **Heroes of Might & Magic 3** : Mécaniques classiques
- **Quantum mechanics** : Physique quantique appliquée
- **Multiplayer** : Support multi-joueurs
- **Persistence** : Sauvegarde des états

## 📜 **Langage de Script .hots**

### Syntaxe de Base

```hots
# Création d'un héros
HERO(Arthur)

# Mouvement simple
MOV(Arthur, @10,15)

# État ψ (superposition quantique)
ψ001: ⊙(Δt+2 @20,20 ⟶ MOV(Arthur, @20,20))

# Observation et collapse
⟨ψ001 | OBSERVE(Morgana) ⟩ → †ψ001

# Utilisation d'artefact
USE(ARTIFACT, temporal_sword, HERO:Arthur)

# Bataille
BATTLE(Arthur, DragonRouge)
```

### Syntaxe Avancée

```hots
# Branching temporel
BRANCH(Timeline_A): ψ007: ⊙(Δt+2 @10,8 ⟶ CAST(Arthur, quantum_leap))

# Conflit temporel
⟨ψ011 ∧ ψ012 | QUANTUM_CONFLICT(@10,10) ⟩ → RESOLVE(probability_wave)

# Rewind temporel
REWIND(2)

# Manipulation de probabilités
BOOST(probability, 0.25)
```

## 🎮 **Objets JSON**

### Artefacts Temporels

```json
{
  "id": "avant_monde_blade",
  "name": "Lame d'Avant-Monde",
  "tier": 5,
  "effects": {
    "quantum_boost": 0.95,
    "temporal_damage": 25,
    "collapse_chance": 0.15
  },
  "special_abilities": [
    "big_bang_strike",
    "quantum_annihilation"
  ]
}
```

### Créatures

```json
{
  "id": "dragon_rouge",
  "name": "Dragon Rouge",
  "stats": {
    "health": 200,
    "attack": 15,
    "temporal_resistance": 0.3
  },
  "abilities": [
    {
      "name": "temporal_roar",
      "effect": "collapse_nearby_psi_states"
    }
  ]
}
```

## 📊 **Métriques et Résultats**

### Statistiques Collectées
- **Taux de réussite** : Pourcentage de commandes exécutées avec succès
- **États ψ créés** : Nombre total de superpositions quantiques
- **Collapses déclenchés** : Nombre d'observations ayant causé un collapse
- **Artefacts utilisés** : Nombre d'artefacts temporels activés
- **Batailles fantômes** : Nombre de combats dans des états ψ

### Critères de Validation
- **≥ 80%** de taux de réussite global
- **≥ 26 états ψ** créés durant le test complet
- **≥ 15 collapses** déclenchés par observation
- **≥ 5 artefacts** temporels utilisés
- **≥ 2 héros** survivants à la fin

## 🔧 **Configuration et Prérequis**

### Logiciels Requis
- **Java 17+** : Runtime pour Spring Boot
- **Maven 3.6+** : Gestionnaire de dépendances
- **Spring Boot 3.2+** : Framework backend
- **H2 Database** : Base de données temporelle

### Configuration
```properties
# Configuration parser (dans application.properties)
heroes.parser.use.antlr=false  # Utiliser REGEX par défaut
logging.level.com.heroesoftimepoc.temporalengine=DEBUG
```

## 🚨 **Dépannage**

### Problèmes Courants

#### Le backend ne démarre pas
```bash
# Vérifier les ports
lsof -ti:8080 | xargs kill -9

# Relancer
cd backend
mvn spring-boot:run
```

#### Tests échouent
```bash
# Vérifier les logs
tail -f test-backend.log
cat backend/target/surefire-reports/*.txt
```

#### Fichiers manquants
```bash
# Vérifier la structure
find test/artefacts -name "*.json" -o -name "*.hots"
```

## 📈 **Évolution et Maintenance**

### Ajout de Nouveaux Scénarios
1. Créer le JSON dans `test/artefacts/scenarios/`
2. Créer les scripts .hots correspondants
3. Ajouter une classe de test Java
4. Mettre à jour le script d'exécution

### Nouveaux Artefacts
1. Ajouter dans `temporal_artifacts.json`
2. Implémenter les effets dans le backend
3. Créer les tests correspondants

### Nouvelles Créatures
1. Ajouter dans `creatures.json`
2. Implémenter les capacités spéciales
3. Tester les interactions

## 🏆 **Objectifs de Qualité**

- **Couverture de code** : > 90% des fonctionnalités temporelles
- **Tests d'intégration** : Tous les scénarios passent
- **Performance** : < 5 secondes par test complet
- **Stabilité** : 0 flaky tests (tests instables)

---

## 📞 **Support**

Pour toute question ou problème :
1. Consulter les logs : `test-backend.log`
2. Vérifier les rapports de test : `backend/target/surefire-reports/`
3. Relancer avec debug : `mvn test -Dtest=BatailleTemporelleIntegrationTest -X`

**Note** : Ce système de test représente l'aboutissement des fonctionnalités temporelles de Heroes of Time et sert de référence pour l'intégration continue. 