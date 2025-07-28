# 🔧 SCRIPTS ADAPTÉS POUR SCÉNARIOS JSON

## Vue d'ensemble

Suite à la clarification des formats de scénarios, nous avons adapté plusieurs scripts shell pour qu'ils utilisent les scénarios JSON au lieu de générer du code HOTS à la volée.

## 📋 Scripts Adaptés

### 1. `test-panopticon-json-scenario.sh`

**Objectif :** Teste le scénario PANOPTICON en chargeant le fichier `panopticon_axis_test.json`

**Caractéristiques :**
- ✅ Charge le scénario JSON complet
- ✅ Valide la structure JSON
- ✅ Crée le jeu selon les paramètres du scénario
- ✅ Exécute les ψ-states définis dans le JSON
- ✅ Vérifie les résultats attendus
- ✅ Gestion d'erreurs robuste

**Usage :**
```bash
cd scripts
./test-panopticon-json-scenario.sh
```

**Fonctionnalités :**
- Analyse automatique du scénario JSON
- Extraction des informations (nom, description, héros, ψ-states)
- Exécution séquentielle des actions définies
- Vérification des conditions de victoire
- Résumé détaillé des résultats

### 2. `test-duel-collapse-json.sh`

**Objectif :** Teste le scénario DUEL COLLAPSE en chargeant le fichier `DUEL_COLLAPSE.json`

**Caractéristiques :**
- ✅ Spécialisé pour les duels PVP
- ✅ Configuration automatique de la carte
- ✅ Création et placement des héros
- ✅ Simulation du combat
- ✅ Vérification des conditions de victoire

**Usage :**
```bash
cd scripts
./test-duel-collapse-json.sh
```

**Fonctionnalités spéciales :**
- Analyse des statistiques des héros
- Configuration de l'équipement
- Simulation de combat automatique
- Suivi des conditions de victoire PVP

### 3. `test-json-scenario-runner.sh` (Script Générique)

**Objectif :** Runner générique capable de charger n'importe quel scénario JSON

**Usage :**
```bash
cd scripts
./test-json-scenario-runner.sh <nom_scenario>

# Exemples :
./test-json-scenario-runner.sh DUEL_COLLAPSE
./test-json-scenario-runner.sh panopticon_axis_test
./test-json-scenario-runner.sh ECLAT_MONDES_DISSOLUS
```

**Fonctionnalités avancées :**
- 🔍 **Auto-détection** de la structure du scénario
- 📊 **Analyse flexible** supportant différents formats JSON
- 🎮 **Création automatique** du jeu selon les paramètres
- 👥 **Gestion multi-héros** avec placement automatique
- ⚡ **Exécution des ψ-states** avec logging détaillé
- 🏆 **Vérification des conditions** de victoire
- 📋 **Liste automatique** des scénarios disponibles si erreur

## 🔄 Différences avec les Anciens Scripts

### Avant (Scripts HOTS)
```bash
# Génération de HOTS à la volée
echo "HERO(Axis)" | curl -X POST ...
echo "MOV(Axis, @5,5)" | curl -X POST ...
echo "VISION_5D(Axis)" | curl -X POST ...
```

### Maintenant (Scripts JSON)
```bash
# Chargement du scénario JSON complet
SCENARIO_DATA=$(cat "../🎮 game_assets/scenarios/visualizer/panopticon_axis_test.json")

# Extraction des ψ-states depuis le JSON
psi_states=$(echo "$SCENARIO_DATA" | jq -c '.psi_states[]')

# Exécution des actions définies dans le JSON
while IFS= read -r psi_state; do
    action=$(echo "$psi_state" | jq -r '.action')
    curl -X POST ... -d "{\"script\":\"$action\"}"
done
```

## 📊 Avantages de l'Approche JSON

### 1. **Cohérence**
- ✅ Tous les éléments du scénario dans un seul fichier
- ✅ Structure standardisée
- ✅ Validation JSON automatique

### 2. **Maintenabilité**
- ✅ Modification facile des scénarios sans toucher au code
- ✅ Versioning des scénarios
- ✅ Réutilisabilité entre différents scripts

### 3. **Flexibilité**
- ✅ Support de différentes structures JSON
- ✅ Compatibilité avec les anciens et nouveaux formats
- ✅ Extensions faciles (nouvelles propriétés)

### 4. **Debugging**
- ✅ Logs détaillés avec timestamps
- ✅ Validation étape par étape
- ✅ Messages d'erreur explicites

## 🎯 Structure Type d'un Scénario JSON

```json
{
  "scenario": {
    "name": "Nom du Scénario",
    "type": "PVP/PVE/COOP",
    "description": "Description du scénario"
  },
  "scenario_info": {
    "difficulty": "EASY/MEDIUM/HARD",
    "duration_estimate": "5-10 minutes",
    "max_turns": 50
  },
  "heroes": [
    {
      "name": "NomHero",
      "level": 5,
      "class": "Temporal Warrior",
      "start_position": { "x": 5, "y": 5 },
      "stats": { "health": 100, "mana": 50 },
      "equipment": ["Épée Temporelle", "Armure Quantique"]
    }
  ],
  "psi_states": [
    {
      "id": "PSI_01",
      "action": "VISION_5D(NomHero)",
      "description": "Activation de la vision 5D"
    }
  ],
  "game_settings": {
    "map": {
      "width": 10,
      "height": 10,
      "terrain": "quantum_maze"
    },
    "victory_conditions": [
      "Éliminer tous les adversaires",
      "Contrôler le centre de la carte"
    ]
  }
}
```

## 🚀 Comment Utiliser

### 1. **Pour un scénario spécifique :**
```bash
cd scripts
./test-panopticon-json-scenario.sh
./test-duel-collapse-json.sh
```

### 2. **Pour n'importe quel scénario :**
```bash
cd scripts
./test-json-scenario-runner.sh <nom_scenario>
```

### 3. **Pour lister les scénarios disponibles :**
```bash
cd scripts
./test-json-scenario-runner.sh
# Affiche la liste des scénarios disponibles
```

## 🔧 Configuration

### Variables d'environnement supportées :
- `HOST` : Adresse du backend (défaut: localhost:8080)
- `SCENARIOS_DIR` : Répertoire des scénarios (défaut: ../🎮 game_assets/scenarios/visualizer)

### Prérequis :
- Backend Heroes of Time démarré
- `jq` installé pour le parsing JSON
- `curl` pour les requêtes HTTP

## 📝 Logs et Debugging

Tous les scripts incluent :
- 🕐 **Timestamps** sur chaque action
- 🎨 **Couleurs** pour faciliter la lecture
- ✅ **Validation** à chaque étape
- 📊 **Résumé détaillé** en fin d'exécution
- 🚨 **Gestion d'erreurs** avec arrêt propre

## 🔮 Prochaines Étapes

1. **Intégration Frontend** : Connecter ces scripts au menu de sélection de scénarios
2. **API Scénarios** : Créer des endpoints dédiés `/api/scenarios/load`
3. **Validation Avancée** : Schémas JSON pour validation stricte
4. **Métriques** : Collecte de statistiques d'exécution
5. **Tests Automatisés** : Intégration dans la CI/CD

---

*Cette adaptation respecte la nouvelle architecture où les actions sont définies dans les JSON de scénarios, et les scripts SH ne font que les charger et les exécuter, sans plus générer de HOTS à la volée.*