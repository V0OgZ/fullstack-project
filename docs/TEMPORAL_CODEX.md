# 🕰️ Heroes of Time – Codex Temporel Complet
**Version :** V2.0 – Codex Unifié  
**Dernière mise à jour :** 2025-01-17

---

## 📋 Table des Matières

1. [Concept Général](#-concept-général)
2. [Système de Temporalité & Causalité](#-système-de-temporalité--causalité)
3. [Catégories d'Artefacts](#️-catégories-dartefacts)
4. [Artefacts Détaillés](#-artefacts-détaillés)
5. [Algorithmes et Mécanismes](#-algorithmes-et-mécanismes)
6. [Exemples de Gameplay](#-exemples-de-gameplay)
7. [Implémentation Technique](#-implémentation-technique)

---

## 🔷 Concept Général

*Heroes of Time* est un jeu de stratégie **asynchrone** combinant les mécaniques classiques de **Heroes of Might & Magic 3** avec un système de **temporalité quantique avancé**.

### Principes Fondamentaux

- **Timelines Asynchrones** : Chaque joueur évolue dans sa propre timeline
- **Superposition Quantique** : Les actions futures existent en état de probabilité (ψ-states)
- **Conflits Causaux** : Émergent lors du chevauchement des timelines
- **Artefacts Temporels** : Permettent de lire, écrire ou réécrire la réalité
- **Bataille en 4D** : Combat spatial ET temporel

---

## 🧬 Système de Temporalité & Causalité

### ⏳ Modèle Temporel

#### Architecture des Timelines

```java
public class Timeline {
    private String id;              // ℬ1, ℬ2, ℬ3...
    private int currentTurn;        // Tour actuel
    private String playerId;        // Joueur propriétaire
    private List<PsiState> states;  // États quantiques
    private Timeline parent;        // Timeline d'origine (fork)
}
```

#### Gestion par Tuile

```java
public class TemporalTile {
    private int x, y, z;
    private Map<String, LocalTimeline> playerTimelines;
    private List<CausalConflict> conflicts;
    private TemporalAnchor anchor; // Si zone verrouillée
}
```

### 💡 Notions Clés

| Terme | Description | Formule |
|-------|-------------|---------|
| **Cône de causalité** | Zone d'influence spatio-temporelle d'une action | `C(x,y,t) = {(x',y',t') : |x-x'| + |y-y'| ≤ c(t'-t)}` |
| **Projection** | Avancer dans un futur non-fixé | `ψ_proj: ⊙(Δt+n @x,y ⟶ ACTION)` |
| **Rollback** | Retour temporel limité | `R(t) = State(t-n), n ∈ [1,3]` |
| **Anomalie causale** | Conflit entre versions d'un événement | `A = ψ1 ∩ ψ2, ψ1 ≠ ψ2` |
| **Stabilisation** | Résolution d'anomalie | `†A → Reality` |
| **Singularité** | Événement brisant les règles temporelles | `S: ∀ψ → †ψ (forced)` |

---

## 🏷️ Catégories d'Artefacts

### Hiérarchie de Rareté

| Tier | Rareté | % Drop | Pouvoirs | Charges |
|------|--------|--------|----------|---------|
| **Commun** | Basique | 60% | Bonus mineurs, vision limitée | 10-20 |
| **Rare** | Peu commun | 25% | Manipulation temporelle simple | 5-10 |
| **Épique** | Tactique | 10% | Lecture avancée, boost modérés | 3-5 |
| **Légendaire** | Puissant | 4% | Écriture temporelle, protection | 2-3 |
| **Paradoxe** | Réalité-altérant | 0.9% | Fork de timeline, dualité | 1-2 |
| **Singularité** | Univers-brisant | 0.1% | Altération absolue | 1 |

### Types de Pouvoirs

| Type | Capacités | Exemples |
|------|-----------|----------|
| **Lecture (Read)** | Observer futurs possibles | Vision, analyse, espionnage |
| **Écriture (Write)** | Créer des futurs | Projection, ancrage, protection |
| **Réécriture (Rewrite)** | Modifier passé/futur | Rollback, fork, fusion |
| **Suppression (Delete)** | Effacer des possibilités | Collapse forcé, annulation |

---

## 🧠 Artefacts Détaillés

### ⚔️ Lame de l'Avant-Monde *(Paradoxe)*

```javascript
// Formule temporelle
ψ_blade: ⊙(Δt+3 @x,y ⟶ WRITE_FUTURE(EVENT))

// Trigger
Π(Enemy enters zone @x,y at Δt+3) ⇒ PHANTOM_BATTLE(ψ_blade)
```

**Mécaniques :**
- Écrit un événement futur encore instable
- Ignore les timelines non-hostiles
- Déclenche une **bataille fantôme** si contradiction
- Le vainqueur impose sa réalité

**Exemple :** Tu captures un château tour 6, un ennemi arrive tour 3 → bataille fantôme entre les deux réalités.

---

### 🕰️ Horloge du Dernier Instant *(Légendaire)*

```javascript
ψ_clock: ROLLBACK(ENTITY, Δt-n) where n ∈ [1,3]
FREEZE_ZONE(@x,y, radius=2, duration=1)
```

**Mécaniques :**
- Rollback de 1-3 tours pour une entité
- Crée une zone gélifiée temporaire
- Ne peut annuler une action déjà observée par un autre joueur

---

### 🚫 Balise d'Ignorance Temporelle *(Légendaire)*

```javascript
TAG(HERO, 'temporal_ghost') if POWER < threshold
ψ_ignore: PASS_THROUGH(@x,y) if TAG exists
```

**Mécaniques :**
- Rend les héros faibles "fantômes temporels"
- Permet de passer à travers sans interaction
- Micro-anomalie si le héros redevient actif

---

### 🧱 Tour de l'Ancrage *(Légendaire)*

```javascript
ANCHOR_ZONE(@x,y, radius=3, duration=X)
∀ψ ∈ zone → IMMUNE_TO_TEMPORAL
```

**Mécaniques :**
- Zone immunisée aux altérations temporelles
- Protège structures et unités
- Idéal pour défendre points stratégiques

---

### 📯 Trompette de l'Apocalypse *(Singularité)*

```javascript
COLLAPSE_ALL(@x,y, radius=10)
∀timeline ∈ zone → MERGE_TO_CANON(winner_timeline)
```

**Mécaniques :**
- Force une timeline unique sur une zone
- Supprime tous les futurs alternatifs
- Duel si contestation → perdant effacé

---

### 🧬 Chrono-Grimoire de Varnak *(Paradoxe)*

```javascript
ψ_fork: FORK(HERO) → [HERO_A, HERO_B]
DURATION = 3 turns
CHOICE at Δt+3 → KEEP(selected) & DELETE(other)
```

**Mécaniques :**
- Bifurcation du héros en 2 versions
- Évolution parallèle pendant 3 tours
- Choix final de la version à conserver

---

### 🪞 Fragment d'Âme Inversée *(Légendaire)*

```javascript
ψ_spy: REPLAY_TURN(PLAYER, Δt-1)
OBSERVE(actions, strategy, resources)
```

**Mécaniques :**
- Rejoue le dernier tour adverse
- Analyse complète des actions
- Information stratégique cruciale

---

### 💀 Noyau de Boucle Éternelle *(Singularité)*

```javascript
LOOP_ZONE(@x,y, radius=5)
while (!CONVERGENCE) {
    ∀player ∈ zone → REPLAY_TURN()
}
```

**Mécaniques :**
- Boucle temporelle jusqu'à stabilité
- Tous les joueurs rejouent leurs actions
- Sort uniquement par convergence ou timeout

---

## 🧪 Algorithmes et Mécanismes

### 🔁 Gestion des Timelines

```java
@Service
public class TemporalEngine {
    
    public void processAction(Action action, Game game) {
        // 1. Horodatage et contextualisation
        action.setTimestamp(game.getCurrentTime());
        action.setTimeline(game.getCurrentTimeline());
        
        // 2. Vérification des conflits
        List<Conflict> conflicts = detectConflicts(action, game);
        
        // 3. Application des artefacts
        if (action.hasArtifact()) {
            applyArtifactMutation(action, game);
        }
        
        // 4. Résolution si conflit
        if (!conflicts.isEmpty()) {
            resolveConflicts(conflicts, action, game);
        }
    }
}
```

### 📜 Résolution d'Anomalies

```java
public class ConflictResolver {
    
    public Resolution resolve(CausalConflict conflict) {
        // 1. Identifier le type de conflit
        ConflictType type = analyzeConflict(conflict);
        
        // 2. Appliquer la règle appropriée
        switch(type) {
            case SPATIAL_OVERLAP:
                return phantomBattle(conflict);
            case TEMPORAL_PARADOX:
                return priorityResolution(conflict);
            case ARTIFACT_CLASH:
                return artifactDuel(conflict);
            default:
                return defaultResolution(conflict);
        }
    }
    
    private Resolution phantomBattle(CausalConflict conflict) {
        // Simulation de bataille entre états quantiques
        PsiState state1 = conflict.getState1();
        PsiState state2 = conflict.getState2();
        
        // Projection des forces
        Army projectedArmy1 = projectArmy(state1);
        Army projectedArmy2 = projectArmy(state2);
        
        // Combat fantôme
        BattleResult result = simulateBattle(projectedArmy1, projectedArmy2);
        
        // Le vainqueur impose sa réalité
        return new Resolution(result.getWinner());
    }
}
```

### 🎯 Système de Priorités

```java
public enum TemporalPriority {
    SINGULARITY(1000),    // Plus haute priorité
    PARADOX(100),         // Très prioritaire
    LEGENDARY(50),        // Prioritaire
    EPIC(20),            // Modéré
    RARE(10),            // Faible
    COMMON(5),           // Très faible
    NORMAL(1);           // Base
    
    private final int weight;
}
```

---

## 🎮 Exemples de Gameplay

### Scénario 1 : Blocage de Pont

```
Tour 1: Ennemi bloque pont avec héros lvl 1
Tour 2: Tu places Balise d'Ignorance → passage libre
Tour 3: Tu traverses, l'ennemi devient "fantôme temporel"
```

### Scénario 2 : Perte d'Artefact Critique

```
Tour 5: Tu perds la Couronne de Commandement
Tour 6: Activation Horloge → rollback au tour 3
Tour 3bis: Tu changes de route, évites le combat
```

### Scénario 3 : Bataille Décisive

```
Tour 10: Combat crucial pour le contrôle de la carte
Action: Trompette de l'Apocalypse → ta timeline devient canonique
Résultat: Victoire assurée dans cette zone
```

### Scénario 4 : Exploration Stratégique

```
Tour 7: Choix entre deux chemins
Action: Grimoire de Varnak → fork du héros
Tour 10: Un chemin mène à un trésor, l'autre à un piège
Choix: Garder la version avec le trésor
```

---

## 📦 Implémentation Technique

### Structure de Données

```java
// Tuile temporelle enrichie
public class TemporalTile {
    private int x, y, z;
    private Map<String, Timeline> timelines;
    private List<TemporalEvent> events;
    private List<ConflictZone> conflicts;
    private TemporalAnchor anchor;
    private List<Artifact> activeArtifacts;
    
    public void addEvent(TemporalEvent event) {
        events.add(event);
        checkForConflicts(event);
        applyArtifactEffects(event);
    }
}

// Gestionnaire d'artefacts
@Component
public class ArtifactManager {
    
    @Autowired
    private TemporalEngine engine;
    
    public void useArtifact(Artifact artifact, GameContext context) {
        // Vérifier les charges
        if (artifact.getCharges() <= 0) {
            throw new ArtifactDepletedException();
        }
        
        // Appliquer l'effet
        ArtifactEffect effect = artifact.createEffect(context);
        engine.applyTemporalMutation(effect);
        
        // Décrémenter les charges
        artifact.decrementCharges();
        
        // Log pour debug
        log.info("Artifact {} used by {} at {}", 
            artifact.getName(), 
            context.getPlayer(), 
            context.getCoordinates()
        );
    }
}
```

### API Endpoints

```java
// Nouveaux endpoints pour les artefacts temporels
@RestController
@RequestMapping("/api/temporal/artifacts")
public class ArtifactController {
    
    @PostMapping("/use")
    public ResponseEntity<?> useArtifact(@RequestBody ArtifactUseRequest request) {
        // Utilisation d'artefact
    }
    
    @GetMapping("/effects/{gameId}")
    public ResponseEntity<?> getActiveEffects(@PathVariable Long gameId) {
        // Liste des effets actifs
    }
    
    @PostMapping("/phantom-battle")
    public ResponseEntity<?> resolvePhantomBattle(@RequestBody PhantomBattleRequest request) {
        // Résolution de bataille fantôme
    }
}
```

### Outils de Debug

```javascript
// Visualiseur de timelines (JSON)
{
  "game_id": 123,
  "current_turn": 10,
  "timelines": {
    "ℬ1": {
      "player": "Alice",
      "events": [...],
      "artifacts_used": ["Horloge", "Balise"]
    },
    "ℬ2": {
      "player": "Bob",
      "parent": "ℬ1",
      "fork_turn": 7,
      "events": [...]
    }
  },
  "conflict_zones": [
    {
      "location": "@15,15",
      "type": "PHANTOM_BATTLE",
      "participants": ["ℬ1", "ℬ2"],
      "resolution": "pending"
    }
  ]
}
```

---

## 🔮 Prochaines Étapes

1. **Implémentation des Batailles Fantômes**
2. **Système de Fork/Merge de Timelines**
3. **Interface de Visualisation 4D**
4. **Équilibrage des Artefacts**
5. **Mode Tutorial Temporel**

---

*Fin du Codex Temporel V2.0*  
*"Le temps n'est qu'une dimension de plus à conquérir"*