# 🚀 DOCUMENTATION - SYSTÈME DE PERFORMANCE CAUSALE

*Heroes of Time - Backend Performance Management*

## 📋 Vue d'ensemble

Le système de performance causale surveille et limite automatiquement les ressources pour éviter que le graphe causale devienne trop gourmand. Il utilise des métriques temps réel et des optimisations automatiques.

## ⚙️ Configuration (application.properties)

### 🎯 Limites de Performance

```properties
# Limite maximale d'états ψ actifs par jeu (augmentée pour tester les vraies limites)
causal.limits.max-psi-states-per-game=1000

# Portée temporelle maximale en jours (±X jours)
causal.limits.max-temporal-days-range=5

# Nombre maximum de calculs d'interférence simultanés
causal.limits.max-interference-calculations=500

# Nombre maximum de nœuds dans le graphe causale
causal.limits.max-graph-nodes=2000

# Seuil d'avertissement de performance (0.0 à 1.0)
causal.limits.performance-warning-threshold=0.8

# Intervalle de nettoyage automatique en minutes
causal.limits.auto-cleanup-interval-minutes=30

# Âge maximum d'un état ψ avant expiration (en heures)
causal.limits.max-psi-state-age-hours=24

# Activer l'optimisation automatique en cas de surcharge
causal.limits.auto-optimization-enabled=true
```

### 📊 Métriques de Performance

```properties
# Activer la collecte de métriques détaillées
causal.metrics.detailed-collection=true

# Intervalle de calcul des métriques en secondes
causal.metrics.calculation-interval-seconds=10

# Conserver l'historique des métriques (nombre de snapshots)
causal.metrics.history-size=100
```

### 🔧 Optimisations Système

```properties
# Cache des regex pour l'analyse des scripts temporels
temporal.parser.regex-cache-size=1000

# Cache des calculs quantiques
quantum.calculation-cache-size=500

# Pool de threads pour les calculs parallèles
quantum.thread-pool-size=4

# Mémoire maximale allouée au graphe causale (en MB)
causal.memory.max-graph-memory-mb=256

# Timeout pour les calculs complexes (en secondes)
causal.computation.timeout-seconds=30

# Nombre maximum de branches temporelles simultanées
temporal.max-concurrent-branches=5
```

## 🏗️ Architecture du Système

### Services Backend

#### 1. CausalPerformanceLimitsService
```java
@Service
public class CausalPerformanceLimitsService {
    // Surveillance des limites de performance
    public CausalLimitsResult checkPerformanceLimits(Game game)
    
    // Nettoyage automatique des états expirés
    public CleanupResult cleanupExpiredStates(Game game)
    
    // Optimisation des performances
    public OptimizationResult optimizePerformance(Game game)
}
```

#### 2. CausalPerformanceController
```java
@RestController
@RequestMapping("/api/causal-performance")
public class CausalPerformanceController {
    // API REST pour la surveillance
}
```

### API Endpoints

| Endpoint | Méthode | Description |
|----------|---------|-------------|
| `/api/causal-performance/metrics/{gameId}` | GET | Obtenir les métriques détaillées |
| `/api/causal-performance/cleanup/{gameId}` | POST | Nettoyer les états expirés |
| `/api/causal-performance/optimize/{gameId}` | POST | Optimiser les performances |
| `/api/causal-performance/status/{gameId}` | GET | Statut de performance résumé |
| `/api/causal-performance/limits` | GET | Voir les limites configurées |

## 📊 Métriques Surveillées

### 1. États ψ Actifs
- **Limite** : 1000 par jeu
- **Avertissement** : 800 (80%)
- **Action** : Nettoyage automatique des anciens états

### 2. Portée Temporelle
- **Limite** : ±5 jours
- **Contrôle** : Limitation automatique des Δt
- **Impact** : Réduit la complexité des calculs

### 3. Complexité du Graphe
- **Limite** : 2000 nœuds
- **Calcul** : Positions uniques + états ψ
- **Optimisation** : Fusion des nœuds proches

### 4. Calculs d'Interférence
- **Limite** : 500 calculs simultanés
- **Formule** : n*(n-1)/2 par position
- **Optimisation** : Cache des résultats

### 5. Charge Système
- **Calcul** : max(ψLoad, temporalLoad, graphLoad, interferenceLoad)
- **États** :
  - 🟢 **0-50%** : Performance optimale
  - 🟡 **50-80%** : Performance acceptable  
  - 🟠 **80-100%** : Attention requise
  - 🔴 **>100%** : Optimisation critique

## 🛠️ Actions d'Optimisation

### 1. Nettoyage Automatique
- Supprime les états ψ > 24h
- Limite la portée temporelle excessive
- Libère la mémoire inutilisée

### 2. Limitation Temporelle
- Réduit les Δt > ±5 jours
- Empêche les prédictions trop lointaines
- Maintient la cohérence causale

### 3. Expiration Forcée
- Désactive les états les plus anciens
- Maintient le nombre sous la limite
- Préserve les états critiques

## 🎮 Intégration Frontend

### JavaScript Monitor
```javascript
// Initialisation
const monitor = new CausalPerformanceMonitor('http://localhost:8080');
await monitor.startMonitoring(gameId, 5000);

// Callbacks
monitor.on('onPerformanceWarning', handleWarning);
monitor.on('onPerformanceCritical', handleCritical);

// Actions
await monitor.cleanupExpiredStates();
await monitor.optimizePerformance();
```

### Widget de Monitoring
- Affichage temps réel des métriques
- Barres de progression colorées
- Boutons d'optimisation rapide
- Alertes visuelles automatiques

## 📈 Exemples de Réponses API

### Métriques Détaillées
```json
{
  "gameId": 1,
  "metrics": {
    "activePsiStates": 250,
    "maxTemporalRange": 3,
    "graphComplexity": 400,
    "interferenceCalculations": 125,
    "averageStateAge": 45.2,
    "systemLoad": 0.65
  },
  "status": "WARNING",
  "violations": [],
  "warnings": ["Approche de la limite d'états ψ: 250/1000 (25%)"],
  "timestamp": 1642612800000
}
```

### Optimisation
```json
{
  "gameId": 1,
  "success": true,
  "actions": [
    "Nettoyage: 15 états expirés supprimés",
    "Limitation: 8 états temporels réduits à ±5 jours"
  ],
  "newMetrics": {
    "activePsiStates": 235,
    "systemLoad": 0.58
  },
  "message": "Optimisation terminée - 2 actions effectuées"
}
```

## 🔍 Monitoring en Production

### Logs de Performance
```
📊 Métriques causales: ψ-states=250/1000, portée=±3/5j, charge=65.0%
🟡 ATTENTION: Approche de la limite d'états ψ
⚡ Optimisation automatique déclenchée
🧹 Nettoyage: 15 états expirés supprimés
✅ Performance revenue à la normale: charge=58.0%
```

### Alertes Système
- **Warning** : Email/Slack à 80% des limites
- **Critical** : Optimisation automatique + notification urgente
- **Recovery** : Confirmation du retour à la normale

## 🎯 Recommandations

### Développement
1. **Tester les limites** : Utiliser les valeurs élevées (1000) pour identifier les vrais bottlenecks
2. **Monitorer en continu** : Intégrer le widget dans toutes les interfaces
3. **Optimiser proactivement** : Lancer le nettoyage avant les pics

### Production
1. **Limites conservatives** : Réduire à 500 ψ-states pour la stabilité
2. **Surveillance 24/7** : Alertes automatiques configurées
3. **Métriques historiques** : Analyser les tendances de charge

### Performance
1. **Cache efficace** : Regex et calculs quantiques mis en cache
2. **Parallélisation** : Pool de threads pour les gros calculs
3. **Mémoire contrôlée** : Limite stricte de 256MB pour le graphe

## 🚨 Troubleshooting

### Problème : Charge système > 100%
**Cause** : Trop d'états ψ ou calculs complexes
**Solution** : 
```bash
curl -X POST http://localhost:8080/api/causal-performance/optimize/1
```

### Problème : Performance dégradée
**Cause** : États ψ anciens accumulés
**Solution** :
```bash
curl -X POST http://localhost:8080/api/causal-performance/cleanup/1
```

### Problème : Mémoire saturée
**Cause** : Graphe causale trop complexe
**Solution** : Réduire `causal.limits.max-graph-nodes` dans application.properties

---

**Version** : 1.0  
**Dernière mise à jour** : Juillet 2025  
**Auteur** : Heroes of Time Development Team 