# 📋 CLARIFICATION DES FORMATS - Script SH vs HOTS vs JSON
## Guide Complet des Différents Formats dans Heroes of Time

> *"Chaque format a son rôle, sa syntaxe et sa puissance. Comprendre leurs différences, c'est maîtriser le multivers."*

---

## 🎯 **VUE D'ENSEMBLE DES FORMATS**

### **📜 HOTS (Heroes of Time Script)**
- **Rôle** : Langage de script pour définir des scénarios de jeu
- **Usage** : Création de héros, actions, états quantiques, dialogues
- **Extension** : `.hots`
- **Exemple** : `game_assets/scenarios/hots/memento_hero_test.hots`

### **🐚 Script SH (Shell Script)**
- **Rôle** : Automatisation et test des scénarios HOTS
- **Usage** : Lancement de tests, communication avec l'API backend
- **Extension** : `.sh`
- **Exemple** : `scripts/test-heros-memento.sh`

### **📄 JSON (JavaScript Object Notation)**
- **Rôle** : Configuration et données structurées
- **Usage** : Définition de héros, artefacts, cartes, états de jeu
- **Extension** : `.json`
- **Exemple** : `backend/src/main/resources/heroes/memento.json`

---

## 📜 **HOTS - HEROES OF TIME SCRIPT**

### **🎭 Définition**
HOTS est le langage de script principal pour définir des scénarios de jeu. Il combine des commandes de base avec des états quantiques temporels.

### **🔤 Syntaxe de Base**

#### **Commandes Simples**
```hots
HERO(Arthur)                           # Créer un héros
MOV(Arthur, @10,15)                   # Déplacer un héros
CREATE(CREATURE, Dragon, @15,15)      # Créer une créature
BATTLE(Arthur, Dragon)                # Combat
USE(ITEM, MagicSword, HERO:Arthur)    # Utiliser un item
```

#### **États Quantiques (ψ-States)**
```hots
ψ001: ⊙(Δt+2 @15,15 ⟶ MOV(Arthur, @15,15))
ψ002: (0.8+0.6i) ⊙(Δt+1 @10,10 ⟶ CREATE(CREATURE, Dragon))
```

#### **Effondrement Quantique**
```hots
†ψ001                                 # Effondrer l'état ψ001
Π(condition) ⇒ †ψ002                  # Collapse conditionnel
```

### **🎯 Utilisation Typique**
- **Scénarios de jeu** : Définir des batailles, des quêtes
- **Tests de héros** : Valider les capacités des personnages
- **Démonstrations** : Montrer les mécaniques du jeu

### **📁 Exemples de Fichiers**
```
game_assets/scenarios/hots/
├── memento_hero_test.hots          # Test du héros Memento
├── bataille_temporelle_complete.hots
├── claudius_vs_jeangro_epic.hots
└── splintered_worlds.hots          # Scénario épique
```

---

## 🐚 **SCRIPT SH - AUTOMATISATION**

### **🎭 Définition**
Les scripts shell automatisent l'exécution des scénarios HOTS en communiquant avec l'API backend via HTTP.

### **🔤 Syntaxe de Base**

#### **Structure Typique**
```bash
#!/bin/bash

# Configuration
BACKEND_URL="http://localhost:8080"
GAME_ID=""

# Fonction pour créer un jeu
create_game() {
    RESPONSE=$(curl -s -X POST "$BACKEND_URL/api/temporal/games" \
        -H "Content-Type: application/json" \
        -d '{"gameName": "Test", "playerCount": 2}')
    GAME_ID=$(echo $RESPONSE | grep -o '"gameId":[0-9]*' | grep -o '[0-9]*')
}

# Fonction pour exécuter HOTS
execute_hots_script() {
    local script="$1"
    curl -s -X POST "$BACKEND_URL/api/temporal/games/$GAME_ID/script" \
        -H "Content-Type: application/json" \
        -d "{\"script\": \"$script\"}"
}
```

#### **Exemple Complet**
```bash
# Test du héros Memento
execute_hots_script "HERO(Memento)" "Créer Memento"
execute_hots_script "CREATE(ARTIFACT, codex_memento)" "Créer le Codex"
execute_hots_script "ψ001: ⊙(Δt+0 @7,7 ⟶ ACTIVATE(memoire_absolue))" "Activer mémoire"
```

### **🎯 Utilisation Typique**
- **Tests automatisés** : Valider le fonctionnement du backend
- **Démonstrations** : Montrer les capacités du système
- **Développement** : Tester de nouvelles fonctionnalités

### **📁 Exemples de Fichiers**
```
scripts/
├── test-heros-memento.sh           # Test du héros Memento
├── test-scenario-epique-eclat-mondes-FIXED.sh
├── test-jean-gros-FIXED.sh
└── start-services-background.sh    # Lancement des services
```

---

## 📄 **JSON - CONFIGURATION ET DONNÉES**

### **🎭 Définition**
JSON définit la structure des données : héros, artefacts, cartes, états de jeu. C'est le format de configuration du backend.

### **🔤 Syntaxe de Base**

#### **Définition d'un Héros**
```json
{
  "name": "Memento",
  "title": "La Mémoire Vivante",
  "class": "Scribe Temporel",
  "stats": {
    "hp": 120,
    "mp": 200,
    "intelligence": 999,
    "wisdom": 999
  },
  "abilities": [
    {
      "name": "archivage_immediat",
      "description": "Archive instantanément un événement",
      "cost": 20,
      "effect": "STORE_IN_MEMORY"
    }
  ]
}
```

#### **Définition d'un Artefact**
```json
{
  "name": "codex_memento",
  "type": "ARTIFACT",
  "rarity": "LEGENDARY",
  "effects": {
    "memory_boost": 50,
    "auto_archive": true
  }
}
```

### **🎯 Utilisation Typique**
- **Configuration des héros** : Stats, capacités, équipement
- **Définition des artefacts** : Effets, rareté, propriétés
- **États de jeu** : Sauvegarde et chargement de parties
- **API responses** : Communication entre frontend et backend

### **📁 Exemples de Fichiers**
```
backend/src/main/resources/
├── heroes/
│   ├── memento.json                # Définition du héros Memento
│   ├── jeangrofignon.json
│   └── claudius.json
├── artifacts/
│   ├── codex_memento.json
│   └── temporal_artifacts.json
└── application.properties          # Configuration backend
```

---

## 🔄 **FLUX DE TRAVAIL ENTRE LES FORMATS**

### **📊 Schéma de Communication**
```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   HOTS      │    │   Script    │    │   Backend   │
│  (.hots)    │───▶│    SH       │───▶│   (JSON)    │
│             │    │   (.sh)     │    │             │
└─────────────┘    └─────────────┘    └─────────────┘
       │                   │                   │
       │                   │                   │
       ▼                   ▼                   ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│ Scénario    │    │ Test        │    │ Données     │
│ de jeu      │    │ automatisé  │    │ structurées │
└─────────────┘    └─────────────┘    └─────────────┘
```

### **🔄 Processus Typique**

1. **Création du héros** : JSON définit les stats et capacités
2. **Scénario de test** : HOTS définit les actions à tester
3. **Exécution** : Script SH envoie les commandes HOTS au backend
4. **Résultat** : Backend retourne des données JSON

### **📝 Exemple Complet**

#### **1. Définition JSON (héros)**
```json
// backend/src/main/resources/heroes/memento.json
{
  "name": "Memento",
  "abilities": ["archivage_immediat", "correction_realite"]
}
```

#### **2. Scénario HOTS (test)**
```hots
// game_assets/scenarios/hots/memento_hero_test.hots
HERO(Memento)
ψ001: ⊙(Δt+3 ⟶ ABILITY(archivage_immediat, premiere_bataille))
†ψ001
```

#### **3. Script SH (exécution)**
```bash
# scripts/test-heros-memento.sh
execute_hots_script "HERO(Memento)" "Créer Memento"
execute_hots_script "ψ001: ⊙(Δt+3 ⟶ ABILITY(archivage_immediat, premiere_bataille))" "Test archivage"
```

#### **4. Réponse JSON (backend)**
```json
{
  "success": true,
  "gameId": 5,
  "message": "Héros Memento créé avec succès"
}
```

---

## 🎯 **CAS D'USAGE SPÉCIFIQUES**

### **🧠 Test d'un Nouveau Héros (Memento)**

#### **Étape 1 : Définition JSON**
```json
// backend/src/main/resources/heroes/memento.json
{
  "name": "Memento",
  "title": "La Mémoire Vivante",
  "stats": {"hp": 120, "mp": 200, "intelligence": 999}
}
```

#### **Étape 2 : Scénario HOTS**
```hots
// game_assets/scenarios/hots/memento_hero_test.hots
HERO(Memento)
CREATE(ARTIFACT, codex_memento)
ψ001: ⊙(Δt+0 @7,7 ⟶ ACTIVATE(memoire_absolue))
```

#### **Étape 3 : Script de Test**
```bash
# scripts/test-heros-memento.sh
./scripts/test-heros-memento.sh
```

### **🎮 Scénario Épique**

#### **Étape 1 : Données JSON**
```json
// Configuration des artefacts et créatures
{
  "artifacts": ["sword_of_time", "crown_of_memory"],
  "creatures": ["temporal_dragon", "quantum_phoenix"]
}
```

#### **Étape 2 : Scénario HOTS**
```hots
// game_assets/scenarios/hots/splintered_worlds.hots
SETUP(MAP_SIZE: 20x20, MAX_TURNS: 50)
HERO(Arthur)
HERO(Memento)
ψ001: ⊙(Δt+5 @10,10 ⟶ BATTLE(Arthur, temporal_dragon))
```

#### **Étape 3 : Test Automatisé**
```bash
# scripts/test-scenario-epique-eclat-mondes-FIXED.sh
./scripts/test-scenario-epique-eclat-mondes-FIXED.sh
```

---

## ⚠️ **LIMITATIONS ET PROBLÈMES CONNUS**

### **🚨 Problèmes de Compatibilité**

#### **HOTS vs Backend**
- **Commandes non supportées** : `DIALOGUE()`, `NARRATE()`, `VICTORY_CONDITION()`
- **États quantiques complexes** : Rollback de transaction sur les ψ-states
- **Syntaxes avancées** : Branchement explicite, logique complexe

#### **Script SH vs API**
- **Problème dquote** : Guillemets imbriqués dans les commandes echo
- **Endpoints incorrects** : `/api/temporal/execute` vs `/api/temporal/games/$GAME_ID/script`
- **Parsing JSON** : Extraction d'ID de jeu depuis les réponses

### **🔧 Solutions Actuelles**

#### **Pour les Commandes Non Supportées**
```bash
# Dans les scripts SH, on teste et on ignore les échecs
execute_hots_script "DIALOGUE(Memento, Hello)" "Dialogue" || echo "Commande non supportée"
```

#### **Pour les Problèmes dquote**
```bash
# Utiliser des guillemets simples
git commit -m 'Creation hero Memento'
# Au lieu de
git commit -m "Création héros Memento avec émojis 🧠"
```

---

## 🚀 **AMÉLIORATIONS PROPOSÉES**

### **📈 Backend - Support HOTS Étendu**

#### **1. Nouvelles Commandes à Implémenter**
```hots
# Commandes de dialogue et narration
DIALOGUE(hero, message)
NARRATE(description)
ON_START: { actions }
ON_TURN(n): { actions }

# Commandes de conditions
VICTORY_CONDITION(requirement)
DEFEAT_CONDITION(requirement)

# Commandes passives
PASSIVE(hero, ability_name) { effects }
```

#### **2. Amélioration des États Quantiques**
```hots
# Support pour amplitudes complexes
ψ001: (0.8+0.6i) ⊙(Δt+2 @15,15 ⟶ ACTION)

# Support pour branchement explicite
BRANCH(ℬ2): ψ002: ⊙(Δt+1 @10,10 ⟶ ACTION)

# Support pour logique complexe
⟨ψ001 ∧ ψ002 | OBSERVE(hero) ⟩ → †ψ001
```

### **🔧 Scripts SH - Robustesse**

#### **1. Gestion d'Erreurs Améliorée**
```bash
# Fonction robuste pour exécuter HOTS
execute_hots_script() {
    local script="$1"
    local description="$2"
    
    RESPONSE=$(curl -s -X POST "$BACKEND_URL/api/temporal/games/$GAME_ID/script" \
        -H "Content-Type: application/json" \
        -d "{\"script\": \"$script\"}")
    
    if echo "$RESPONSE" | grep -q '"success":true'; then
        echo "✅ $description"
        return 0
    else
        echo "❌ $description - $RESPONSE"
        return 1
    fi
}
```

#### **2. Support pour Commandes Avancées**
```bash
# Fonction pour tester les nouvelles commandes
test_advanced_commands() {
    echo "🧪 Test des commandes avancées..."
    
    # Test dialogues
    execute_hots_script "DIALOGUE(Memento, Hello)" "Dialogue" || echo "⚠️ Dialogues non supportés"
    
    # Test narrations
    execute_hots_script "NARRATE(Test)" "Narration" || echo "⚠️ Narrations non supportées"
    
    # Test conditions
    execute_hots_script "VICTORY_CONDITION(HP > 0)" "Condition victoire" || echo "⚠️ Conditions non supportées"
}
```

### **📄 JSON - Structure Étendue**

#### **1. Support pour Capacités Avancées**
```json
{
  "name": "Memento",
  "advanced_abilities": {
    "quantum_states": {
      "ψ001": "⊙(Δt+0 ⟶ ACTIVATE(memoire_absolue))",
      "ψ002": "(0.8+0.6i) ⊙(Δt+1 ⟶ ABILITY(archivage_immediat))"
    },
    "passives": {
      "archivage_automatique": {
        "trigger": "any_event_occurs",
        "effect": "AUTO_STORE_IN_MEMORY",
        "bonus": "+5_PM"
      }
    }
  }
}
```

#### **2. Support pour Scénarios**
```json
{
  "scenario": {
    "name": "memento_hero_test",
    "setup": {
      "map_size": "15x15",
      "max_turns": 20,
      "atmosphere": ["archives_temporelles", "livres_flottants"]
    },
    "acts": [
      {
        "name": "Naissance de Memento",
        "commands": [
          "HERO(Memento)",
          "PLACE(Memento, @7,7)",
          "EQUIP(Memento, codex_memento)"
        ]
      }
    ]
  }
}
```

---

## 📚 **GRAMMAIRE QUANTIQUE - MISE À JOUR**

### **🔮 Symboles Supportés (Actuel)**
| Symbole | Nom | Usage | Support |
|---------|-----|-------|---------|
| `ψ` | Psi | État quantique | ✅ |
| `⊙` | Observation | Enveloppe quantique | ✅ |
| `Δt` | Delta-t | Décalage temporel | ✅ |
| `@` | Position | Coordonnées x,y | ✅ |
| `⟶` | Transition | Flèche vers action | ✅ |
| `†` | Collapse | Effondrement | ✅ |
| `Π` | Pi | Condition logique | ✅ |
| `ℬ` | Branche | Timeline | ⚠️ (limité) |

### **🚀 Symboles Proposés (Futur)**
| Symbole | Nom | Usage | Priorité |
|---------|-----|-------|----------|
| `⟨⟩` | Braket | Probabilité | 🔥 |
| `∧` | AND | Logique ET | 🔥 |
| `∨` | OR | Logique OU | 🔥 |
| `⨉` | Conflit | Conflit de timeline | 🔥 |
| `↺` | Rollback | Retour temporel | 🔥 |
| `τ` | Tau | Marqueur temporel | 🔥 |
| `|ψ⟩` | Ket | Vecteur d'état | 🔥 |
| `⟨A|ψ⟩` | Braket | Probabilité | 🔥 |

### **📖 Documentation à Mettre à Jour**

#### **1. GRAMMAIRE_SPATIO_TEMPORELLE.md**
- Ajouter les nouveaux symboles
- Exemples avec Memento
- Cas d'usage avancés

#### **2. TEMPORAL_SCRIPT_CORE_REFERENCE.md**
- Support pour commandes avancées
- Exemples de dialogues et narrations
- Gestion des conditions

#### **3. Cursor Rules**
- Mise à jour des commandes supportées
- Ajout des nouveaux endpoints
- Documentation des limitations

---

## 🎯 **CONCLUSION ET RECOMMANDATIONS**

### **✅ Ce qui Fonctionne Bien**
1. **HOTS basique** : Commandes simples (HERO, MOV, CREATE, BATTLE)
2. **États quantiques simples** : ψ-states avec amplitudes basiques
3. **Scripts SH** : Communication avec l'API backend
4. **JSON** : Configuration des héros et artefacts

### **⚠️ Ce qui Nécessite des Améliorations**
1. **Commandes avancées** : Dialogues, narrations, conditions
2. **États quantiques complexes** : Branchement, logique avancée
3. **Gestion d'erreurs** : Scripts SH plus robustes
4. **Documentation** : Mise à jour avec les nouvelles fonctionnalités

### **🚀 Plan d'Action Prioritaire**

#### **Phase 1 : Stabilisation (Immédiat)**
1. **Corriger les problèmes dquote** dans les scripts SH
2. **Documenter les limitations actuelles** clairement
3. **Améliorer la gestion d'erreurs** dans les tests

#### **Phase 2 : Extension (Court terme)**
1. **Implémenter les commandes de dialogue** dans le backend
2. **Ajouter le support pour les narrations**
3. **Étendre le parser HOTS** pour les conditions

#### **Phase 3 : Avancé (Moyen terme)**
1. **Support complet des états quantiques complexes**
2. **Branchement explicite des timelines**
3. **Logique quantique avancée**

### **🧠 Memento - Le Gardien de la Mémoire**

Avec la création de Memento, nous avons un héros parfait pour tester et valider ces améliorations. Ses capacités de mémoire et d'archivage peuvent être utilisées pour :

1. **Tester les nouvelles commandes** de dialogue et narration
2. **Valider les états quantiques complexes** avec ses capacités temporelles
3. **Documenter automatiquement** les résultats des tests
4. **Partager la mémoire** entre différents scénarios

**Citation finale** : *"Je me souviens de tous les formats, de toutes les syntaxes, de tous les bugs. Et je vais les corriger un par un."* 🧠✨

---

*Document créé par Memento - La Mémoire Vivante* 📚  
*Archivé pour l'éternité dans le multivers Heroes of Time* 🌌 