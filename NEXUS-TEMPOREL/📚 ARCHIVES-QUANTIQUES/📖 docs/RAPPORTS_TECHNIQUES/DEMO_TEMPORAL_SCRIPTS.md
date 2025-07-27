# 🎮 Heroes of Time - Démo Scripts Temporels

## Résumé du Moteur Temporel

Le moteur temporel Heroes of Time POC implémente un système de **superposition quantique** pour le gameplay, permettant aux joueurs de créer des actions futures incertaines qui se résolvent selon des conditions d'observation.

## 🔧 Architecture Technique

### Backend (Spring Boot)
- **Modèles** : `PsiState`, `Hero`, `Game`, `GameTile`
- **Services** : `TemporalEngineService`, `TemporalScriptParser`
- **API REST** : `/api/temporal/*`

### Langage de Script Temporel
- **Commandes de base** : `HERO()`, `MOV()`, `CREATE()`, `USE()`, `BATTLE()`
- **États ψ** : `ψ001: ⊙(Δt+2 @x,y ⟶ ACTION)`
- **Collapse** : `†ψ001`
- **Observation** : `Π(condition) ⇒ †ψ001`

## 📋 Exemples de Scripts

### 1. Création de Héros et Objets

```bash
# Créer des héros
curl -X POST -H "Content-Type: application/json" \
  -d '{"script": "HERO(Arthur)"}' \
  http://localhost:8080/api/temporal/games/1/script

curl -X POST -H "Content-Type: application/json" \
  -d '{"script": "HERO(Ragnar)"}' \
  http://localhost:8080/api/temporal/games/1/script

# Créer des artefacts temporels
curl -X POST -H "Content-Type: application/json" \
  -d '{"script": "CREATE(ITEM, AvantWorldBlade, HERO:Arthur)"}' \
  http://localhost:8080/api/temporal/games/1/script

curl -X POST -H "Content-Type: application/json" \
  -d '{"script": "CREATE(ITEM, ReverseClock, HERO:Ragnar)"}' \
  http://localhost:8080/api/temporal/games/1/script
```

### 2. Mouvements de Base

```bash
# Déplacer Arthur
curl -X POST -H "Content-Type: application/json" \
  -d '{"script": "MOV(Arthur, @12,10)"}' \
  http://localhost:8080/api/temporal/games/1/script

# Déplacer Ragnar
curl -X POST -H "Content-Type: application/json" \
  -d '{"script": "MOV(Ragnar, @15,12)"}' \
  http://localhost:8080/api/temporal/games/1/script
```

### 3. États Temporels ψ (Superposition)

```bash
# Créer un mouvement futur incertain pour Arthur
curl -X POST -H "Content-Type: application/json" \
  -d '{"script": "ψ001: ⊙(Δt+2 @14,11 ⟶ MOV(HERO, Arthur, @14,11))"}' \
  http://localhost:8080/api/temporal/games/1/script

# Créer une bataille future
curl -X POST -H "Content-Type: application/json" \
  -d '{"script": "ψ002: ⊙(Δt+3 @14,11 ⟶ BATTLE(HERO Arthur, HERO Ragnar))"}' \
  http://localhost:8080/api/temporal/games/1/script

# Créer une créature future
curl -X POST -H "Content-Type: application/json" \
  -d '{"script": "ψ003: ⊙(Δt+1 @13,11 ⟶ CREATE(CREATURE, Dragon, @13,11))"}' \
  http://localhost:8080/api/temporal/games/1/script
```

### 4. Déclencheurs d'Observation

```bash
# Créer un déclencheur qui collapse ψ001 si Ragnar entre dans la zone
curl -X POST -H "Content-Type: application/json" \
  -d '{"script": "Π(Ragnar enters @14,11 at Δt+2) ⇒ †ψ001"}' \
  http://localhost:8080/api/temporal/games/1/script
```

### 5. Collapse Manuel

```bash
# Forcer le collapse de ψ003
curl -X POST -H "Content-Type: application/json" \
  -d '{"script": "†ψ003"}' \
  http://localhost:8080/api/temporal/games/1/script
```

### 6. Utilisation d'Artefacts Temporels

```bash
# Utiliser la Lame d'Avant-Monde
curl -X POST -H "Content-Type: application/json" \
  -d '{"script": "USE(ITEM, AvantWorldBlade, HERO:Arthur)"}' \
  http://localhost:8080/api/temporal/games/1/script

# Utiliser l'Horloge Inversée
curl -X POST -H "Content-Type: application/json" \
  -d '{"script": "USE(ITEM, ReverseClock, HERO:Ragnar)"}' \
  http://localhost:8080/api/temporal/games/1/script
```

## 🎯 Scénarios de Test Complets

### Scénario 1 : Conflit Temporel Simple

```bash
# 1. Créer le jeu
curl -X POST -H "Content-Type: application/json" \
  -d '{"gameName": "Temporal Conflict", "playerId": "player1"}' \
  http://localhost:8080/api/temporal/games

# 2. Ajouter second joueur et démarrer
curl -X POST -H "Content-Type: application/json" \
  -d '{"playerId": "player2"}' \
  http://localhost:8080/api/temporal/games/1/join

curl -X POST http://localhost:8080/api/temporal/games/1/start

# 3. Créer les héros
curl -X POST -H "Content-Type: application/json" \
  -d '{"script": "HERO(Arthur)"}' \
  http://localhost:8080/api/temporal/games/1/script

curl -X POST -H "Content-Type: application/json" \
  -d '{"script": "HERO(Ragnar)"}' \
  http://localhost:8080/api/temporal/games/1/script

# 4. Créer deux états ψ conflictuels
curl -X POST -H "Content-Type: application/json" \
  -d '{"script": "ψ100: ⊙(Δt+2 @10,10 ⟶ MOV(HERO, Arthur, @10,10))"}' \
  http://localhost:8080/api/temporal/games/1/script

curl -X POST -H "Content-Type: application/json" \
  -d '{"script": "ψ101: ⊙(Δt+2 @10,10 ⟶ MOV(HERO, Ragnar, @10,10))"}' \
  http://localhost:8080/api/temporal/games/1/script

# 5. Déclencher le conflit
curl -X POST -H "Content-Type: application/json" \
  -d '{"script": "MOV(Arthur, @10,10)"}' \
  http://localhost:8080/api/temporal/games/1/script

# 6. Voir l'état final
curl -s http://localhost:8080/api/temporal/games/1/state
```

### Scénario 2 : Artefacts Temporels

```bash
# Créer un héros avec des artefacts
curl -X POST -H "Content-Type: application/json" \
  -d '{"scripts": [
    "HERO(Merlin)",
    "CREATE(ITEM, VarnakGrimoire, HERO:Merlin)",
    "CREATE(ITEM, ApocalypseHorn, HERO:Merlin)",
    "ψ200: ⊙(Δt+1 @5,5 ⟶ USE(ITEM, VarnakGrimoire, HERO:Merlin))",
    "ψ201: ⊙(Δt+2 @6,6 ⟶ USE(ITEM, ApocalypseHorn, HERO:Merlin))"
  ]}' \
  http://localhost:8080/api/temporal/games/1/scripts
```

## 🔍 Vérification de l'État

```bash
# Obtenir l'état complet du jeu
curl -s http://localhost:8080/api/temporal/games/1/state

# Avancer d'un tour
curl -X POST http://localhost:8080/api/temporal/games/1/next-turn

# Vérifier tous les jeux
curl -s http://localhost:8080/api/temporal/games
```

## 🎮 Endpoints de Démo

```bash
# Créer un jeu de démonstration complet
curl -X POST http://localhost:8080/api/temporal/demo/create-sample-game

# Tester le collapse
curl -X POST http://localhost:8080/api/temporal/demo/test-collapse

# Vérifier la santé du serveur
curl -s http://localhost:8080/api/temporal/health
```

## 🧪 Fonctionnalités Testées

✅ **Parsing des Scripts Temporels** - Analyse complète de la grammaire ψ  
✅ **Création d'États ψ** - Superposition quantique fonctionnelle  
✅ **Collapse Manuel et Automatique** - Résolution des états  
✅ **Déclencheurs d'Observation** - Conditions Π  
✅ **Gestion des Conflits** - Résolution causale  
✅ **Artefacts Temporels** - Intégration complète  
✅ **Système de Tours** - Progression temporelle  
✅ **État de Jeu** - Sérialisation complète  
✅ **API REST** - Endpoints fonctionnels  

## 🚀 Prochaines Étapes

1. **Frontend** - Interface utilisateur pour visualiser les états ψ
2. **IA Temporelle** - Algorithmes pour gérer les conflits complexes
3. **Multijoueur** - Synchronisation des timelines
4. **Optimisation** - Performance des calculs quantiques
5. **Visualisation** - Affichage des superpositions temporelles

---

**Le moteur temporel Heroes of Time POC est fonctionnel et prêt pour l'intégration frontend !** 🎮✨