# 🎮 SYSTÈME DE SCRIPTS DE JEU HEROES OF TIME

## 🏆 VISION GLOBALE

Le système de scripts Heroes of Time (.hots) révolutionne la façon de tester et valider le gameplay. Au lieu de multiplier les classes Java complexes, nous utilisons des **scripts déclaratifs** exécutés via API REST.

## 🎯 ARCHITECTURE HYBRIDE

### ✅ **Tests Java** (Backend/Technique)
- `TemporalStressTest` → Validation mémoire et performance
- `DualParserComparisonTest` → Benchmark technique des parsers
- `ComplexScenarioTest` → Tests unitaires et intégration

### ✅ **Scripts .hots** (Fonctionnel/Utilisateur)
- Scénarios de gameplay complets
- Tests d'intégration via API REST
- Validation fonctionnelle et expérience utilisateur

## 📁 STRUCTURE DES SCRIPTS

```
backend/src/main/resources/scripts/
├── scenarios/          # Scénarios de gameplay
│   ├── epic-arthur-vs-ragnar.hots
│   ├── temporal-stress-test.hots
│   └── performance-benchmark.hots
├── tests/              # Tests de validation
│   ├── parser-comparison.hots
│   ├── memory-stress.hots
│   └── compatibility-check.hots
└── demos/              # Démonstrations
    ├── simple-game.hots
    └── multiplayer-demo.hots
```

## 🔧 API REST COMPLÈTE

### 📋 Liste des Scripts
```bash
GET /api/temporal/scripts/list
```

### 🎮 Exécution Simple
```bash
POST /api/temporal/scripts/execute
{
  "scriptFile": "demos/simple-game.hots",
  "parser": "regex|antlr4",
  "gameId": 123 (optionnel)
}
```

### 📝 Exécution Verbose
```bash
POST /api/temporal/scripts/execute-verbose
{
  "scriptFile": "scenarios/epic-arthur-vs-ragnar.hots",
  "parser": "regex"
}
```

### 📊 Benchmark Automatique
```bash
POST /api/temporal/scripts/benchmark
{
  "scriptFile": "tests/parser-comparison.hots"
}
```

## 🎪 FORMAT DES SCRIPTS .hots

### 📚 Syntaxe Basique
```
# === COMMENTAIRES ===
# Les lignes commençant par # sont ignorées

# === SETUP DU JEU ===
GAME: "Nom du jeu"

# === CRÉATION DE HÉROS ===
HERO: NomDuHéros

# === MOUVEMENTS ===
MOV(Héros, @x,y)

# === ÉTATS TEMPORELS ===
ψ001: ⊙(Δt+1 @x,y ⟶ MOV(Héros, @x,y))

# === EFFONDREMENTS ===
†ψ001

# === COMMANDES SPÉCIALES ===
NEXT_TURN
BATTLE(Héros1, Héros2)
CREATE(ITEM, Objet, Héros)
```

### 🏰 Exemple : Scénario Épique
```
# 🏰 SCÉNARIO ÉPIQUE : ARTHUR VS RAGNAR
GAME: "Epic Battle: Arthur vs Ragnar"

# === HÉROS ===
HERO: Arthur
HERO: Ragnar
HERO: Merlin

# === POSITIONNEMENT ===
MOV(Arthur, @10,10)
MOV(Ragnar, @25,25)

# === OBJETS MAGIQUES ===
CREATE(ITEM, Excalibur, Arthur)
CREATE(ITEM, Mjolnir, Ragnar)

# === ÉTATS TEMPORELS ===
ψ001: ⊙(Δt+1 @12,12 ⟶ MOV(Arthur, @12,12))
ψ002: ⊙(Δt+2 @15,15 ⟶ CREATE(CREATURE, Dragon, @15,15))

# === BATAILLE ===
NEXT_TURN
†ψ001
†ψ002
BATTLE(Arthur, Dragon)
BATTLE(Arthur, Ragnar)
```

## 🎛️ MODES D'EXÉCUTION

### 🎯 Mode Normal
- Exécution séquentielle du script
- Rapport de succès/échec
- Statistiques de performance

### 🔍 Mode Verbose
- Logs détaillés ligne par ligne
- Statut ✅/❌ pour chaque commande
- Idéal pour le debugging

### 📊 Mode Benchmark
- Comparaison automatique REGEX vs ANTLR4
- Métriques de performance (ops/sec)
- Rapports détaillés

## 📊 EXEMPLE DE RÉPONSE API

```json
{
  "success": true,
  "gameId": 123,
  "scriptPath": "demos/simple-game.hots",
  "parser": "regex",
  "successCount": 7,
  "errorCount": 0,
  "totalCommands": 7,
  "stats": {
    "duration": 245,
    "totalCommands": 7,
    "avgTimePerCommand": 35.0
  },
  "executionLog": [
    "✅ HERO: Arthur",
    "✅ MOV(Arthur, @10,10)",
    "✅ ψ001: ⊙(Δt+1 @12,12 ⟶ MOV(Arthur, @12,12))",
    "✅ †ψ001",
    "✅ BATTLE(Arthur, Merlin)"
  ]
}
```

## 🚀 DÉMARRAGE RAPIDE

### 1. Compiler le Backend
```bash
cd backend
mvn compile
```

### 2. Démarrer le Backend
```bash
mvn spring-boot:run
```

### 3. Tester le Système
```bash
# Script de démonstration complet
./test-game-scripts.sh
```

### 4. Exécuter un Script Spécifique
```bash
curl -X POST http://localhost:8080/api/temporal/scripts/execute-verbose \
  -H "Content-Type: application/json" \
  -d '{"scriptFile": "demos/simple-game.hots", "parser": "regex"}'
```

## 🎯 AVANTAGES DU SYSTÈME

### ✅ **Maintenabilité**
- Scripts lisibles vs classes Java complexes
- Pas de compilation nécessaire
- Modification rapide des scénarios

### ✅ **Réutilisabilité**
- Un script = test avec les deux parsers
- Scénarios partageables entre équipes
- Templates pour nouveaux tests

### ✅ **Évolutivité**
- Ajout facile de nouveaux scripts
- Extension du format .hots
- Intégration CI/CD simple

### ✅ **Testabilité**
- Validation fonctionnelle complète
- Benchmarks automatiques
- Logs détaillés pour debugging

## 🔮 ÉVOLUTIONS FUTURES

### 📈 Phase 2
- Interface web pour créer/éditer des scripts
- Bibliothèque de scripts communautaires
- Système de variables et boucles

### 📈 Phase 3
- Génération automatique de scripts
- Tests de régression automatiques
- Intégration avec outils de monitoring

## 📚 RESSOURCES

- **Scripts d'exemple** : `backend/src/main/resources/scripts/`
- **Documentation API** : Swagger UI disponible
- **Tests de validation** : `./test-game-scripts.sh`

---

🎉 **Le système de scripts Heroes of Time est maintenant opérationnel et prêt pour la production !** 