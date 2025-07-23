# 📚 HEROES OF TIME - DOCUMENTATION TECHNIQUE

*Documentation technique complète du projet Heroes of Time*

## 🏗️ Architecture Générale

### Backend (Java Spring Boot)
- **Port** : 8080
- **Base de données** : H2 (en mémoire)
- **Framework** : Spring Boot 3.x
- **API** : REST avec CORS activé

### Frontend (React/TypeScript)
- **Port principal** : 8000 - Interface de jeu principale
- **Port visualiseur** : 8001 - Quantum Visualizer (graphe D3.js)
- **Port test runner** : 8888 - Interface de tests automatisés

## 🌀 Moteur Temporal

### Grammaire Temporelle
- `ψ` : États quantiques (superposition)
- `†` : Effondrement causale (collapse)
- `⊙` : Opérateur temporel
- `Δt` : Delta temporel (±jours)
- `@x,y` : Coordonnées spatiales
- `ℬ1,ℬ2,ℬ3` : Branches temporelles

### Types d'États Quantiques
1. **ACTIVE** : État en superposition
2. **COLLAPSED** : État effondré
3. **TRIGGERED** : Déclenché par observation
4. **EXPIRED** : Expiré automatiquement

## 🚀 **NOUVEAU : Système de Performance Causale**

### Configuration Backend (application.properties)
```properties
# 🎯 LIMITES DE PERFORMANCE CAUSALE
causal.limits.max-psi-states-per-game=1000          # États ψ max par jeu
causal.limits.max-temporal-days-range=5             # Portée temporelle ±5 jours
causal.limits.max-interference-calculations=500     # Calculs d'interférence max
causal.limits.max-graph-nodes=2000                  # Nœuds graphe max
causal.limits.performance-warning-threshold=0.8     # Seuil d'alerte 80%
causal.limits.auto-cleanup-interval-minutes=30      # Nettoyage auto
causal.limits.max-psi-state-age-hours=24           # Âge max avant expiration
causal.limits.auto-optimization-enabled=true        # Optimisation auto

# 📊 MÉTRIQUES DE PERFORMANCE
causal.metrics.detailed-collection=true             # Métriques détaillées
causal.metrics.calculation-interval-seconds=10      # Intervalle calcul
causal.metrics.history-size=100                     # Historique métriques

# 🔧 OPTIMISATIONS SYSTÈME
temporal.parser.regex-cache-size=1000               # Cache regex
quantum.calculation-cache-size=500                  # Cache calculs quantiques
quantum.thread-pool-size=4                          # Pool threads parallèles
causal.memory.max-graph-memory-mb=256              # Mémoire max graphe
causal.computation.timeout-seconds=30               # Timeout calculs
temporal.max-concurrent-branches=5                  # Branches simultanées max
```

### API Endpoints Performance
| Endpoint | Méthode | Description |
|----------|---------|-------------|
| `/api/causal-performance/metrics/{gameId}` | GET | Métriques détaillées |
| `/api/causal-performance/cleanup/{gameId}` | POST | Nettoyer états expirés |
| `/api/causal-performance/optimize/{gameId}` | POST | Optimiser performances |
| `/api/causal-performance/status/{gameId}` | GET | Statut résumé |
| `/api/causal-performance/limits` | GET | Limites configurées |

### Services Java
```java
// Service principal de surveillance
@Service
public class CausalPerformanceLimitsService {
    public CausalLimitsResult checkPerformanceLimits(Game game);
    public CleanupResult cleanupExpiredStates(Game game);
    public OptimizationResult optimizePerformance(Game game);
}

// Contrôleur REST
@RestController
@RequestMapping("/api/causal-performance")
public class CausalPerformanceController {
    // API REST pour monitoring temps réel
}
```

### Monitoring Frontend
```javascript
// Initialisation du monitoring
const monitor = new CausalPerformanceMonitor('http://localhost:8080');
await monitor.startMonitoring(gameId, 5000);

// Callbacks pour alertes
monitor.on('onPerformanceWarning', handleWarning);
monitor.on('onPerformanceCritical', handleCritical);
```

## 📊 API REST Principale

### Endpoints Jeu
- `POST /api/games` - Créer un jeu
- `GET /api/games/{id}` - État du jeu
- `POST /api/games/{id}/script` - Exécuter script temporal
- `POST /api/games/{id}/turn` - Tour suivant

### Endpoints Héros
- `GET /api/games/{id}/heroes` - Liste des héros
- `POST /api/games/{id}/heroes` - Créer héros
- `PUT /api/games/{id}/heroes/{heroId}/move` - Déplacer héros

### Endpoints États ψ
- `GET /api/games/{id}/psi-states` - États quantiques actifs
- `POST /api/games/{id}/psi-states` - Créer état quantique
- `POST /api/games/{id}/psi-states/{psiId}/collapse` - Effondrer état

## 🎮 Frontend - Interfaces

### 1. Interface Principale (Port 8000)
- Console temporelle interactive
- Carte hexagonale
- Gestion des héros et unités
- Système de tours

### 2. Quantum Visualizer (Port 8001)
- **Graphe D3.js** : Visualisation causale interactive
- **Timeline** : Sélecteur de branches temporelles
- **Performance Monitor** : Widget temps réel
- **Contrôles** : Filtres et optimisation
- **Rapports** : Métriques et alertes

### 3. Test Runner (Port 8888)
- Exécution de tests automatisés
- Monitoring des performances
- Rapports de résultats
- Interface de debugging

## 🔄 Workflow de Développement

### Démarrage Rapide
```bash
# Démarrer tous les services
./scripts/actifs/start-unified-ui.sh

# Tester rapidement
./scripts/actifs/test-ui-quick.sh

# Tests complets
./backend/test-backend-unit.sh
```

### Structure des Scripts
```
scripts/
├── actifs/           # Scripts actifs utilisés
│   ├── start-unified-ui.sh
│   └── test-ui-quick.sh
└── archives/         # Scripts archivés
    └── anciens-scripts/
```

## 📈 Métriques de Performance

### Surveillance Temps Réel
- **États ψ actifs** : 0-1000 (limite configurable)
- **Portée temporelle** : ±0-5 jours
- **Complexité graphe** : 0-2000 nœuds
- **Charge système** : 0-100%

### Statuts Performance
- 🟢 **OPTIMAL** (0-50%) : Performance excellente
- 🟢 **NORMAL** (50-80%) : Performance acceptable
- 🟡 **WARNING** (80-100%) : Attention requise
- 🔴 **CRITICAL** (>100%) : Optimisation urgente

### Actions Automatiques
1. **Nettoyage** : Suppression des états expirés (>24h)
2. **Limitation** : Réduction de la portée temporelle excessive
3. **Expiration** : Désactivation des états les plus anciens

## 🧪 Tests et Validation

### Tests Backend
- **84 tests** au total
- **55 tests passent** (65% succès)
- **29 échecs** (détails d'implémentation)
- **Performance** : 2778 commandes/seconde

### Tests d'Intégration
- Scénarios temporels complexes
- Interférences quantiques
- Collapse causale
- Performance sous charge

## 🔧 Configuration Base de Données

### H2 Database (Développement)
```properties
spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.username=sa
spring.datasource.password=password
spring.h2.console.enabled=true
```

### Tables Principales
- `games` - Parties de jeu
- `heroes` - Héros et leurs propriétés
- `psi_states` - États quantiques
- `game_tiles` - Tuiles de la carte

## 🌐 Déploiement

### Développement Local
1. Backend : `mvn spring-boot:run` (port 8080)
2. Frontend principal : `npm start` (port 8000)
3. Quantum Visualizer : serveur Python (port 8001)
4. Test Runner : serveur Python (port 8888)

### Production
- Configuration Railway/Heroku
- Base de données PostgreSQL
- Variables d'environnement sécurisées
- Monitoring Sentry/DataDog

## 📝 Logs et Debugging

### Niveaux de Log
```properties
logging.level.com.heroesoftimepoc.temporalengine=DEBUG
logging.level.org.springframework.web=DEBUG
```

### Formats de Log Performance
```
📊 Métriques causales: ψ-states=250/1000, portée=±3/5j, charge=65.0%
🟡 ATTENTION: Approche de la limite d'états ψ
⚡ Optimisation automatique déclenchée
✅ Performance revenue à la normale: charge=58.0%
```

## 🚨 Troubleshooting

### Problèmes Courants
1. **Port occupé** : `lsof -ti:PORT | xargs kill -9`
2. **Compilation échoue** : Vérifier les packages Java
3. **Tests échouent** : Problèmes de messages d'erreur
4. **Performance dégradée** : Utiliser l'API d'optimisation

### Commandes Utiles
```bash
# Nettoyer les états expirés
curl -X POST http://localhost:8080/api/causal-performance/cleanup/1

# Optimiser les performances
curl -X POST http://localhost:8080/api/causal-performance/optimize/1

# Voir les métriques
curl http://localhost:8080/api/causal-performance/metrics/1
```

## 🎯 Roadmap Technique

### Phase Actuelle ✅
- [x] Moteur temporal fonctionnel
- [x] Système de performance causale
- [x] Graphe D3.js interactif
- [x] API REST complète
- [x] Monitoring temps réel

### Prochaines Étapes 🚧
- [ ] WebSocket temps réel
- [ ] Couches visuelles causales
- [ ] Système UTMD (jours temporels)
- [ ] Tuiles hexagonales
- [ ] Artefacts temporels UI

### Long Terme 🔮
- [ ] Multijoueur temps réel
- [ ] IA quantique
- [ ] Effets visuels avancés
- [ ] Mobile/PWA

---

**Version** : 2.0  
**Dernière mise à jour** : Juillet 2025  
**Équipe** : Heroes of Time Development Team 