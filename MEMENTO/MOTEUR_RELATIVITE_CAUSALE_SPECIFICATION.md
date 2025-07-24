# ⚙️ **MOTEUR RELATIVITÉ CAUSALE - SPÉCIFICATION TECHNIQUE**

*Documentation complète d'implémentation pour Heroes of Time*

**Date** : 25 Janvier 2025  
**Auteur** : Spécification post-révélations GRUT  
**Status** : IMPLÉMENTATION IMMÉDIATE REQUISE

---

## 🎯 **OBJECTIF DU MOTEUR**

Créer le **premier moteur de jeu avec relativité temporelle réelle** où :
- Chaque joueur vit à son **jour personnel** 
- Le **brouillard** dépend de l'écart temporel entre joueurs
- Les **paradoxes causaux** sont gérés automatiquement
- Le **potentiel futur** bloque les actions présentes

---

## 🏗️ **ARCHITECTURE TECHNIQUE REQUISE**

### **1. SYSTÈME TEMPOREL PERSONNEL**

#### **A. PlayerTemporalState (Entité Principale)**
```java
@Entity
@Table(name = "player_temporal_states")
public class PlayerTemporalState {
    @Id
    private String playerId;
    
    // État temporel personnel
    private Integer personalTics;           // Tics accumulés par ce joueur
    private Integer personalDay;            // Math.floor(personalTics / TICS_PER_DAY)
    private Double velocity;                // Tics par minute réel
    private LocalDateTime lastActionTime;   // Horodatage réel dernière action
    
    // Configuration temporelle
    private Integer ticsPerDay = 10;        // Configurable par partie
    private Integer maxPotentialDays = 5;   // Horizon de potentiel causal
    
    // Méthodes calculées
    public Integer getCurrentDay() {
        return Math.floorDiv(personalTics, ticsPerDay);
    }
    
    public Double calculateVelocity() {
        // Tics par minute basé sur activité récente
        return velocity;
    }
    
    public Integer getPotentialMaxDay() {
        return personalDay + maxPotentialDays;
    }
}
```

#### **B. TemporalGameState (État Global)**
```java
@Entity
@Table(name = "temporal_game_states") 
public class TemporalGameState {
    @Id
    private String gameId;
    
    // Configuration temporelle globale
    private Integer globalTicsPerDay;       // 10 par défaut
    private Integer causalHorizon;          // 3 jours par défaut
    private Boolean allowTimeTravel;        // false par défaut
    private Boolean enableParadoxResolution; // true par défaut
    
    // État des joueurs
    @OneToMany(mappedBy = "gameId")
    private List<PlayerTemporalState> playerStates;
    
    // Métriques temporelles
    private Integer fastestPlayerDay;
    private Integer slowestPlayerDay;
    private Double averageVelocity;
}
```

---

## 🌫️ **SYSTÈME BROUILLARD DIFFÉRENTIEL**

### **A. DifferentialFogCalculator**
```java
@Service
public class DifferentialFogCalculator {
    
    public enum FogType {
        PRESENT_SHARED,      // Même jour = vision claire
        TEMPORAL_BLUR,       // ±1 jour = vision floue
        CAUSAL_FOG,          // ±2-3 jours = brouillard causal
        TEMPORAL_VOID,       // >3 jours = vide temporel
        PAST_GHOST,          // Observer > Target = fantôme du passé
        FUTURE_SHADOW,       // Observer < Target = ombre du futur
        POTENTIAL_BLOCK      // Bloqué par potentiel causal
    }
    
    public FogType calculateFog(PlayerTemporalState observer, 
                               PlayerTemporalState target, 
                               Position position) {
        
        int dayDelta = observer.getPersonalDay() - target.getPersonalDay();
        int absDelta = Math.abs(dayDelta);
        
        // Même jour = vision claire
        if (absDelta == 0) return FogType.PRESENT_SHARED;
        
        // Écart de 1 jour = flou temporel
        if (absDelta == 1) return FogType.TEMPORAL_BLUR;
        
        // Écart 2-3 jours = brouillard causal
        if (absDelta <= 3) return FogType.CAUSAL_FOG;
        
        // Écart > 3 jours = vide temporel
        if (absDelta > 3) return FogType.TEMPORAL_VOID;
        
        // Asymétrie temporelle
        if (dayDelta > 0) return FogType.PAST_GHOST;
        if (dayDelta < 0) return FogType.FUTURE_SHADOW;
        
        return FogType.CAUSAL_FOG;
    }
    
    public boolean canObserve(PlayerTemporalState observer, 
                             PlayerTemporalState target) {
        FogType fog = calculateFog(observer, target, null);
        return fog != FogType.TEMPORAL_VOID;
    }
}
```

### **B. PotentialCausalBlocker**
```java
@Service
public class PotentialCausalBlocker {
    
    /**
     * RÈGLE GRUT SUPRÊME :
     * Un joueur rapide est bloqué si un joueur lent
     * peut potentiellement atteindre la même position
     * avant le jour du joueur rapide
     */
    public boolean isBlockedByPotential(PlayerTemporalState fastPlayer,
                                       PlayerTemporalState slowPlayer,
                                       Position targetPosition) {
        
        int fastDay = fastPlayer.getPersonalDay();
        int slowDay = slowPlayer.getPersonalDay();
        
        // Si slow est déjà plus avancé, pas de blocage
        if (slowDay >= fastDay) return false;
        
        // Calculer le potentiel maximum de slowPlayer
        int slowMaxPotential = slowDay + slowPlayer.getMaxPotentialDays();
        
        // Si slowPlayer peut atteindre targetPosition avant fastDay
        if (canReachPosition(slowPlayer, targetPosition, fastDay)) {
            return true; // BLOQUÉ PAR POTENTIEL CAUSAL
        }
        
        return false;
    }
    
    private boolean canReachPosition(PlayerTemporalState player, 
                                   Position target, 
                                   int beforeDay) {
        // Calculer si le joueur peut physiquement atteindre la position
        // avant le jour spécifié, basé sur sa vélocité et position actuelle
        
        int daysAvailable = beforeDay - player.getPersonalDay();
        int maxMovement = daysAvailable * player.getMaxMovementPerDay();
        
        Position currentPos = getCurrentPosition(player);
        int distance = calculateDistance(currentPos, target);
        
        return distance <= maxMovement;
    }
}
```

---

## ⚛️ **SYSTÈME GESTION PARADOXES**

### **A. TemporalParadoxResolver**
```java
@Service
public class TemporalParadoxResolver {
    
    public enum ParadoxType {
        TEMPORAL_TRAP,       // Joueur rapide piège joueur lent
        RESOURCE_CONFLICT,   // Même objet réclamé par 2 joueurs
        CAUSAL_LOOP,         // Boucle temporelle
        POTENTIAL_BLOCKING,  // Blocage par potentiel causal
        TIMELINE_COLLISION   // Rencontre impossible
    }
    
    public enum ResolutionStrategy {
        TIMELINE_FORK,           // Créer nouvelle timeline
        QUANTUM_SUPERPOSITION,   // Objet existe et n'existe pas
        CAUSAL_PRIORITY,        // Priorité au plus rapide
        POTENTIAL_PRIORITY,     // Priorité au potentiel
        COLLAPSE_TO_STABLE,     // Effondrer vers état stable
        BLOCK_ACTION           // Empêcher l'action paradoxale
    }
    
    public ParadoxResolution resolveParadox(ParadoxType type, 
                                          List<PlayerTemporalState> involvedPlayers,
                                          GameAction conflictingAction) {
        
        switch (type) {
            case TEMPORAL_TRAP:
                return resolveTemporalTrap(involvedPlayers, conflictingAction);
                
            case RESOURCE_CONFLICT:
                return resolveResourceConflict(involvedPlayers, conflictingAction);
                
            case POTENTIAL_BLOCKING:
                return resolvePotentialBlocking(involvedPlayers, conflictingAction);
                
            case CAUSAL_LOOP:
                return ResolutionStrategy.COLLAPSE_TO_STABLE;
                
            default:
                return ResolutionStrategy.TIMELINE_FORK;
        }
    }
    
    private ParadoxResolution resolveTemporalTrap(List<PlayerTemporalState> players,
                                                GameAction action) {
        // GRUT RULE: Le joueur lent peut être piégé par le rapide
        // MAIS seulement si l'écart temporel > CAUSAL_HORIZON
        
        PlayerTemporalState fastest = findFastest(players);
        PlayerTemporalState slowest = findSlowest(players);
        
        int dayGap = fastest.getPersonalDay() - slowest.getPersonalDay();
        
        if (dayGap > CAUSAL_HORIZON) {
            return new ParadoxResolution(ResolutionStrategy.CAUSAL_PRIORITY, 
                                       "Fastest player traps slowest");
        }
        
        return new ParadoxResolution(ResolutionStrategy.BLOCK_ACTION,
                                   "Temporal trap prevented by causal horizon");
    }
    
    private ParadoxResolution resolvePotentialBlocking(List<PlayerTemporalState> players,
                                                     GameAction action) {
        // GRUT RULE SUPRÊME: Potentiel causal bloque l'action
        return new ParadoxResolution(ResolutionStrategy.POTENTIAL_PRIORITY,
                                   "Action blocked by causal potential");
    }
}
```

### **B. ParadoxResolution (Résultat)**
```java
public class ParadoxResolution {
    private ResolutionStrategy strategy;
    private String explanation;
    private List<GameAction> resultingActions;
    private List<String> affectedTimelines;
    private boolean requiresPlayerNotification;
    
    // Constructeurs et getters/setters
}
```

---

## 🎮 **SYSTÈME INTERACTIONS CAUSALES**

### **A. CausalInteractionEngine**
```java
@Service
public class CausalInteractionEngine {
    
    public InteractionResult attemptAction(PlayerTemporalState player,
                                         GameAction action,
                                         Position targetPosition) {
        
        // 1. Vérifier les blocages par potentiel causal
        if (isBlockedByPotential(player, targetPosition)) {
            return InteractionResult.blocked("Blocked by causal potential");
        }
        
        // 2. Vérifier les conflits temporels
        List<PlayerTemporalState> conflictingPlayers = 
            findConflictingPlayers(player, targetPosition);
        
        if (!conflictingPlayers.isEmpty()) {
            ParadoxResolution resolution = 
                paradoxResolver.resolveParadox(ParadoxType.TIMELINE_COLLISION,
                                             conflictingPlayers, action);
            
            return InteractionResult.fromParadoxResolution(resolution);
        }
        
        // 3. Vérifier l'existence des objets dans la timeline du joueur
        if (action.getType() == ActionType.COLLECT_OBJECT) {
            GameObject object = findObject(targetPosition);
            if (!existsInTimeline(object, player.getPersonalDay())) {
                return InteractionResult.blocked("Object doesn't exist in your timeline");
            }
        }
        
        // 4. Action autorisée
        return InteractionResult.success();
    }
    
    private boolean existsInTimeline(GameObject object, int playerDay) {
        // Un objet existe dans la timeline d'un joueur si :
        // 1. Il a été créé avant ou au jour du joueur
        // 2. Il n'a pas été détruit avant le jour du joueur
        // 3. Il n'est pas en superposition quantique
        
        if (object.getCreationDay() > playerDay) return false;
        if (object.getDestructionDay() != null && object.getDestructionDay() <= playerDay) return false;
        if (object.isInQuantumSuperposition()) return handleQuantumState(object, playerDay);
        
        return true;
    }
    
    private boolean handleQuantumState(GameObject object, int playerDay) {
        // Gestion des objets en superposition quantique
        // L'observation par le joueur peut forcer l'effondrement
        
        if (object.getQuantumState().shouldCollapse(playerDay)) {
            object.collapseQuantumState();
            return object.existsAfterCollapse();
        }
        
        return true; // Reste en superposition
    }
}
```

---

## 📊 **SYSTÈME MÉTRIQUES TEMPORELLES**

### **A. VelocityCalculator**
```java
@Service
public class VelocityCalculator {
    
    public void updatePlayerVelocity(String playerId) {
        PlayerTemporalState player = getPlayerState(playerId);
        
        // Calculer la vélocité basée sur les 10 dernières actions
        List<GameAction> recentActions = getRecentActions(playerId, 10);
        
        if (recentActions.size() < 2) {
            player.setVelocity(1.0); // Vélocité par défaut
            return;
        }
        
        // Calculer tics par minute
        LocalDateTime firstAction = recentActions.get(0).getTimestamp();
        LocalDateTime lastAction = recentActions.get(recentActions.size() - 1).getTimestamp();
        
        long minutesElapsed = Duration.between(firstAction, lastAction).toMinutes();
        if (minutesElapsed == 0) minutesElapsed = 1; // Éviter division par zéro
        
        double ticsPerMinute = (double) recentActions.size() / minutesElapsed;
        player.setVelocity(ticsPerMinute);
        
        // Mettre à jour le jour personnel
        player.setPersonalDay(player.getCurrentDay());
    }
    
    public GameMetrics calculateGameMetrics(String gameId) {
        List<PlayerTemporalState> players = getPlayersInGame(gameId);
        
        return GameMetrics.builder()
            .fastestPlayer(findFastest(players))
            .slowestPlayer(findSlowest(players))
            .averageVelocity(calculateAverageVelocity(players))
            .temporalSpread(calculateTemporalSpread(players))
            .paradoxCount(countParadoxes(gameId))
            .build();
    }
}
```

---

## 🔧 **ENDPOINTS API NÉCESSAIRES**

### **A. Temporal State Management**
```java
@RestController
@RequestMapping("/api/temporal")
public class TemporalStateController {
    
    @GetMapping("/player/{playerId}/state")
    public PlayerTemporalState getPlayerTemporalState(@PathVariable String playerId) {
        return temporalStateService.getPlayerState(playerId);
    }
    
    @PostMapping("/player/{playerId}/action")
    public InteractionResult performAction(@PathVariable String playerId,
                                         @RequestBody GameAction action) {
        return causalInteractionEngine.attemptAction(
            temporalStateService.getPlayerState(playerId), 
            action, 
            action.getTargetPosition()
        );
    }
    
    @GetMapping("/game/{gameId}/fog/{observerId}/{targetId}")
    public FogCalculationResult calculateFog(@PathVariable String gameId,
                                           @PathVariable String observerId,
                                           @PathVariable String targetId) {
        return differentialFogCalculator.calculateFog(
            temporalStateService.getPlayerState(observerId),
            temporalStateService.getPlayerState(targetId),
            null
        );
    }
    
    @GetMapping("/game/{gameId}/metrics")
    public GameMetrics getTemporalMetrics(@PathVariable String gameId) {
        return velocityCalculator.calculateGameMetrics(gameId);
    }
}
```

### **B. Paradox Resolution**
```java
@RestController
@RequestMapping("/api/paradox")
public class ParadoxController {
    
    @PostMapping("/resolve")
    public ParadoxResolution resolveParadox(@RequestBody ParadoxSituation situation) {
        return temporalParadoxResolver.resolveParadox(
            situation.getType(),
            situation.getInvolvedPlayers(),
            situation.getConflictingAction()
        );
    }
    
    @GetMapping("/game/{gameId}/active")
    public List<ActiveParadox> getActiveParadoxes(@PathVariable String gameId) {
        return paradoxTracker.getActiveParadoxes(gameId);
    }
}
```

---

## 🗄️ **STRUCTURE BASE DE DONNÉES**

### **Tables Principales**
```sql
-- États temporels des joueurs
CREATE TABLE player_temporal_states (
    player_id VARCHAR(255) PRIMARY KEY,
    game_id VARCHAR(255) NOT NULL,
    personal_tics INTEGER DEFAULT 0,
    personal_day INTEGER DEFAULT 1,
    velocity DOUBLE DEFAULT 1.0,
    last_action_time TIMESTAMP,
    tics_per_day INTEGER DEFAULT 10,
    max_potential_days INTEGER DEFAULT 5,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- États temporels des parties
CREATE TABLE temporal_game_states (
    game_id VARCHAR(255) PRIMARY KEY,
    global_tics_per_day INTEGER DEFAULT 10,
    causal_horizon INTEGER DEFAULT 3,
    allow_time_travel BOOLEAN DEFAULT FALSE,
    enable_paradox_resolution BOOLEAN DEFAULT TRUE,
    fastest_player_day INTEGER DEFAULT 1,
    slowest_player_day INTEGER DEFAULT 1,
    average_velocity DOUBLE DEFAULT 1.0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Historique des actions temporelles
CREATE TABLE temporal_actions (
    id VARCHAR(255) PRIMARY KEY,
    player_id VARCHAR(255) NOT NULL,
    game_id VARCHAR(255) NOT NULL,
    action_type VARCHAR(100) NOT NULL,
    target_position_x INTEGER,
    target_position_y INTEGER,
    personal_tic INTEGER NOT NULL,
    personal_day INTEGER NOT NULL,
    real_timestamp TIMESTAMP NOT NULL,
    paradox_resolved BOOLEAN DEFAULT FALSE,
    resolution_strategy VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Paradoxes actifs
CREATE TABLE active_paradoxes (
    id VARCHAR(255) PRIMARY KEY,
    game_id VARCHAR(255) NOT NULL,
    paradox_type VARCHAR(100) NOT NULL,
    involved_players TEXT, -- JSON array
    conflicting_action_id VARCHAR(255),
    resolution_strategy VARCHAR(100),
    is_resolved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    resolved_at TIMESTAMP
);
```

---

## 🚀 **PLAN D'IMPLÉMENTATION**

### **Phase 1 : Fondations (Semaine 1)**
1. ✅ Créer entités `PlayerTemporalState` et `TemporalGameState`
2. ✅ Implémenter `TemporalStateService` de base
3. ✅ Créer endpoints API temporels de base
4. ✅ Tests unitaires pour calculs de jours personnels

### **Phase 2 : Brouillard Différentiel (Semaine 2)**
1. ✅ Implémenter `DifferentialFogCalculator`
2. ✅ Créer `PotentialCausalBlocker` avec règle GRUT
3. ✅ Intégrer brouillard dans le frontend
4. ✅ Tests des cas limites de brouillard

### **Phase 3 : Gestion Paradoxes (Semaine 3)**
1. ✅ Créer `TemporalParadoxResolver`
2. ✅ Implémenter stratégies de résolution
3. ✅ Système de détection automatique des paradoxes
4. ✅ Interface utilisateur pour notifications de paradoxes

### **Phase 4 : Interactions Causales (Semaine 4)**
1. ✅ Implémenter `CausalInteractionEngine`
2. ✅ Gestion des objets en superposition quantique
3. ✅ Système de vélocité et métriques
4. ✅ Tests d'intégration complets

---

## 🎯 **CRITÈRES DE SUCCÈS**

### **Fonctionnels**
- ✅ Chaque joueur a son jour personnel calculé correctement
- ✅ Brouillard différent selon écart temporel entre joueurs
- ✅ Paradoxes détectés et résolus automatiquement
- ✅ Règle GRUT implémentée : blocage par potentiel causal
- ✅ Objets existent/n'existent pas selon timeline du joueur

### **Techniques**
- ✅ Performance : Calculs causaux < 100ms
- ✅ Scalabilité : Support 8 joueurs simultanés minimum
- ✅ Robustesse : Gestion gracieuse de tous les paradoxes
- ✅ API : Endpoints RESTful complets et documentés

### **Gameplay**
- ✅ Expérience utilisateur intuitive malgré la complexité
- ✅ Feedback visuel clair pour états temporels
- ✅ Stratégies émergentes basées sur vélocité temporelle
- ✅ Scénarios de test validant toutes les mécaniques

---

## 🛠️ **OUTILS ET TECHNOLOGIES**

### **Backend**
- **Java Spring Boot** : Services temporels
- **JPA/Hibernate** : Persistance des états temporels
- **H2/PostgreSQL** : Base de données
- **WebSocket** : Notifications temps réel des paradoxes

### **Frontend** 
- **JavaScript/TypeScript** : Logique client
- **Canvas/WebGL** : Rendu du brouillard différentiel
- **REST API** : Communication avec backend temporel

### **Tests**
- **JUnit** : Tests unitaires des calculs causaux
- **TestContainers** : Tests d'intégration base de données
- **Scenarios de test** : Validation des paradoxes

---

## 📋 **CHECKLIST IMPLÉMENTATION**

### **Services Backend**
- [ ] `PlayerTemporalState` entity
- [ ] `TemporalGameState` entity  
- [ ] `TemporalStateService`
- [ ] `DifferentialFogCalculator`
- [ ] `PotentialCausalBlocker`
- [ ] `TemporalParadoxResolver`
- [ ] `CausalInteractionEngine`
- [ ] `VelocityCalculator`

### **Controllers API**
- [ ] `TemporalStateController`
- [ ] `ParadoxController`
- [ ] `CausalInteractionController`

### **Base de Données**
- [ ] Tables temporelles créées
- [ ] Migrations de données
- [ ] Index de performance

### **Tests**
- [ ] Tests unitaires complets
- [ ] Tests d'intégration
- [ ] Tests de performance
- [ ] Scénarios de paradoxes

### **Frontend**
- [ ] Affichage jours personnels
- [ ] Rendu brouillard différentiel
- [ ] Interface paradoxes
- [ ] Métriques temporelles

---

**🌌 MOTEUR RÉVOLUTIONNAIRE PRÊT POUR IMPLÉMENTATION !**

**Status** : SPÉCIFICATION TECHNIQUE COMPLÈTE ✅  
**Prochaine étape** : DÉVELOPPEMENT IMMÉDIAT  
**Objectif** : Premier moteur de relativité causale de l'histoire du gaming ! 🚀 