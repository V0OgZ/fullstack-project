# 🎮 Heroes of Time - Scripts de Simulation de Partie

## 📋 Vue d'Ensemble

Les scripts de simulation permettent de tester et démontrer les capacités du moteur temporel Heroes of Time dans différents scénarios de jeu.

---

## 🚀 Scripts Disponibles

### 1. **simulate-game.sh** - Simulation Complète
**Durée** : ~15-20 minutes  
**Objectif** : Simulation complète d'une partie multi-joueurs avec mécaniques temporelles avancées

#### Fonctionnalités Testées
- ✅ Partie multi-joueurs (3 joueurs : Arthur, Ragnar, Merlin)
- ✅ 5 tours de jeu complets
- ✅ Création et gestion des ψ-states
- ✅ Utilisation d'artefacts temporels
- ✅ Triggers d'observation (Π)
- ✅ Résolution de conflits causaux
- ✅ Branches temporelles (ℬ)
- ✅ Scénarios d'endgame

#### Utilisation
```bash
./simulate-game.sh
```

#### Scénarios Inclus
- **Setup** : Création du jeu et des héros
- **Turns 1-5** : Actions stratégiques par joueur
- **Turn 3** : Conflits temporels et résolution
- **Turn 4** : Mécaniques temporelles avancées
- **Endgame** : Utilisation massive d'artefacts et collapse final

---

### 2. **simulate-quick.sh** - Test Rapide
**Durée** : ~2-3 minutes  
**Objectif** : Test rapide des fonctionnalités principales

#### Fonctionnalités Testées
- ✅ Création de héros et positionnement
- ✅ ψ-states basiques avec collapse
- ✅ Artefacts temporels principaux
- ✅ Triggers d'observation
- ✅ Conflits temporels simples
- ✅ Branches temporelles
- ✅ Progression de tours

#### Utilisation
```bash
./simulate-quick.sh
```

#### Idéal Pour
- Tests de régression rapides
- Validation après modifications
- Démonstration des concepts de base

---

### 3. **simulate-performance.sh** - Test de Performance
**Durée** : ~10-15 minutes  
**Objectif** : Mesurer les performances du moteur temporel sous charge

#### Tests de Performance
- ⚡ **Opérations en masse** : 50 ψ-states + 25 collapses
- ⚡ **Opérations concurrentes** : Créations simultanées
- ⚡ **Simulation mémoire** : Scénarios complexes interdépendants
- ⚡ **Scénarios de stress** : Progression rapide + artefacts massifs

#### Métriques Mesurées
- Temps de création des ψ-states
- Temps de collapse
- Temps de récupération d'état
- Performance concurrente
- Gestion mémoire

#### Utilisation
```bash
./simulate-performance.sh
```

#### Prérequis
- `bc` (calculateur) installé automatiquement si absent
- Serveur Heroes of Time en cours d'exécution

---

## 🔧 Scripts de Test Existants

### 4. **test-temporal-engine.sh** - Tests Complets
**Durée** : ~5-8 minutes  
**Objectif** : Tests détaillés de toutes les fonctionnalités

#### Fonctionnalités
- 20 tests individuels
- Validation des réponses API
- Scénarios temporels complexes
- Endpoints de démo

### 5. **test-simple.sh** - Tests Basiques
**Durée** : ~1-2 minutes  
**Objectif** : Tests basiques sans dépendances

#### Fonctionnalités
- Tests sans `jq`
- Validation de connectivité
- Opérations de base

### 6. **test-manual.sh** - Tests Manuels
**Durée** : ~30 secondes  
**Objectif** : Tests manuels step-by-step

#### Fonctionnalités
- 8 tests manuels
- Commandes curl explicites
- Validation manuelle

---

## 🎯 Scénarios de Simulation

### Scénario 1: Bataille Temporelle
```bash
# Arthur crée une superposition future
ψ001: ⊙(Δt+2 @15,15 ⟶ MOV(HERO, Arthur, @15,15))

# Ragnar planifie le même mouvement
ψ002: ⊙(Δt+2 @15,15 ⟶ MOV(HERO, Ragnar, @15,15))

# Conflit déclenché quand Arthur bouge
MOV(Arthur, @15,15)  # → Résolution automatique
```

### Scénario 2: Artefacts Temporels
```bash
# Utilisation de la Lame d'Avant-Monde
USE(ITEM, AvantWorldBlade, HERO:Arthur)

# Horloge Inversée pour rollback
USE(ITEM, ReverseClock, HERO:Ragnar)

# Balise d'Ignorance pour bypass
USE(ITEM, IgnoranceBeacon, HERO:Merlin)
```

### Scénario 3: Triggers Complexes
```bash
# Création d'une créature future
ψ003: ⊙(Δt+3 @25,25 ⟶ CREATE(CREATURE, Dragon, @25,25))

# Trigger d'observation
Π(Dragon spawns @25,25) ⇒ †ψ003

# Cascade de triggers
Π(ψ003 collapsed) ⇒ ψ004: ⊙(Δt+1 @30,30 ⟶ ...)
```

---

## 📊 Métriques de Performance

### Benchmarks Typiques
- **Création ψ-state** : ~0.05-0.1s
- **Collapse** : ~0.03-0.08s
- **État du jeu** : ~0.1-0.2s
- **Artefact usage** : ~0.1-0.15s
- **Progression tour** : ~0.2-0.3s

### Limites Testées
- **50 ψ-states** simultanés
- **25 collapses** en série
- **10 opérations** concurrentes
- **20 scénarios** complexes
- **25 artefacts** utilisés

---

## 🔍 Débogage et Monitoring

### Logs Détaillés
Tous les scripts incluent :
- Codes couleur pour la lisibilité
- Timestamps pour les métriques
- Messages d'erreur détaillés
- Progression en temps réel

### Monitoring des Performances
```bash
# Exemple de sortie de simulate-performance.sh
⚡ PERFORMANCE: Testing Bulk ψ-state Operations
📊 METRIC: Create ψ-state 1: 0.0523s
📊 METRIC: Create ψ-state 2: 0.0445s
📊 METRIC: Average ψ-state creation time: 0.0484s
```

---

## 🚀 Utilisation Avancée

### Exécution en Parallèle
```bash
# Lancer plusieurs simulations
./simulate-quick.sh &
./simulate-performance.sh &
wait
```

### Intégration CI/CD
```bash
# Script de validation automatique
#!/bin/bash
if ./simulate-quick.sh > /dev/null 2>&1; then
    echo "✅ Simulation passed"
    exit 0
else
    echo "❌ Simulation failed"
    exit 1
fi
```

### Personnalisation
```bash
# Variables d'environnement
export BASE_URL="http://localhost:9090/api/temporal"
export GAME_ID=5
./simulate-quick.sh
```

---

## 🎮 Cas d'Usage

### Développement
- **Validation** après modifications de code
- **Régression** testing automatique
- **Performance** monitoring continu

### Démonstration
- **Présentation** des capacités temporelles
- **Formation** des nouveaux développeurs
- **Validation** des concepts de jeu

### Production
- **Health checks** du moteur temporel
- **Load testing** avant déploiement
- **Monitoring** des performances

---

## 📝 Notes Importantes

### Prérequis
- Serveur Heroes of Time en cours d'exécution (port 8080)
- `curl` installé
- `bc` pour les calculs de performance
- `jq` pour la manipulation JSON (optionnel)

### Sécurité
- Scripts conçus pour environnement de test
- Pas de données sensibles
- Nettoyage automatique après tests

### Maintenance
- Scripts auto-documentés
- Gestion d'erreurs robuste
- Compatibilité multi-plateforme

---

## 🔄 Intégration avec le Système de Persistance

Les scripts de simulation sont automatiquement documentés dans le système de persistance Cursor :

```json
{
  "simulation_scripts": [
    "simulate-game.sh - Simulation complète multi-joueurs",
    "simulate-quick.sh - Test rapide des fonctionnalités",
    "simulate-performance.sh - Tests de performance",
    "test-temporal-engine.sh - Tests complets existants",
    "test-simple.sh - Tests basiques",
    "test-manual.sh - Tests manuels"
  ]
}
```

---

*🎮 Scripts de Simulation Heroes of Time - Validation complète du moteur temporel*

**Status : ✅ READY FOR TESTING**