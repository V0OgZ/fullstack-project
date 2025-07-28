# 🌫️ **CONCEPTS AVANCÉS TEMPORELLES HEROES OF TIME**
## Brouillard de Causalité, Érosion Causale, Tuiles et Nouveaux Concepts

*Version 2.0 - Documentation Complète des Mécaniques Avancées*  
*Date: 21 Juillet 2025 - 07:00*  
*Status: ✅ DOCUMENTATION COMPLÈTE*

---

## 🎯 **TABLE DES MATIÈRES**

1. [🌫️ Brouillard de Causalité](#brouillard-de-causalité)
2. [⏰ Érosion Causale](#érosion-causale)
3. [🔷 Système de Tuiles](#système-de-tuiles)
4. [🧠 Concepts Quantiques Avancés](#concepts-quantiques-avancés)
5. [🎮 Intégration Gameplay](#intégration-gameplay)
6. [🔧 Implémentation Technique](#implémentation-technique)

---

## 🌫️ **BROUILLARD DE CAUSALITÉ**

### **🎭 Concept Philosophique**

> *"Le brouillard n'est pas juste de la distance, c'est l'incertitude quantique du futur !"*
> 
> **- Jean-Grofignon, l'Éveillé Ontologique**

Le **Brouillard de Causalité** (Fog of Causality) est le système central qui gère l'incertitude temporelle dans Heroes of Time. Contrairement au brouillard de guerre classique qui cache simplement l'information spatiale, le brouillard de causalité représente l'**incertitude quantique** de ce qui existe ou n'existe pas encore dans le futur.

### **📊 Les 7 États du Brouillard**

| État | Nom | Description | Interaction | Couleur UI |
|------|-----|-------------|-------------|------------|
| **0** | **Unexplored** | Brouillard total, jamais vu | Aucune | 🌫️ Gris foncé |
| **1** | **Collapsed Past** | Exploré dans le passé résolu | Vision seule | 🔘 Gris clair |
| **2** | **Reachable** | Accessible mais pas observé | Planification | 🟡 Jaune |
| **3** | **Vision** | Vision directe d'unité/château | Complètement interactif | 🟢 Vert |
| **4** | **Ghost** | Vu avec objet spectral (Voile) | Pas d'interaction | 👻 Blanc transparent |
| **5** | **Superposed** | Entité en flux quantique | Partiellement visible | 🔮 Violet |
| **6** | **Anchored** | Zone qui bloque le branchement temporel | Force le collapse | 🔒 Bleu |

### **🧮 Formule Mathématique du Brouillard**

```java
// Formule complète du Fog of Causality
private double calculateZoneFogOfCausality(int x, int y, WorldStateGraph graph, Game game) {
    // 🌀 Facteur 1: Densité d'états quantiques (0.0-0.4)
    double quantumDensity = countQuantumStatesInRadius(x, y, 5) * 0.2;
    
    // ⚔️ Facteur 2: Conflits causals détectés (0.0-0.6)
    double conflictIntensity = countCausalConflicts(x, y, 5) * 0.3;
    
    // 🔮 Facteur 3: Interférences quantiques (0.0-0.25)
    double interferenceLevel = calculateQuantumInterference(x, y) * 0.25;
    
    // 🏺 Facteur 4: Influence artefacts temporels (0.0-0.4)
    double artifactInfluence = calculateArtifactInfluence(x, y, game);
    
    // 👁️ Facteur 5: Clarté par observations récentes (0.0-0.5)
    double observationClarity = calculateObservationClarity(x, y, game);
    
    // 📊 Formule finale normalisée [0.0, 1.0]
    double fogValue = (quantumDensity + conflictIntensity + interferenceLevel + artifactInfluence) 
                     * (1.0 - observationClarity);
    
    return Math.max(0.0, Math.min(1.0, fogValue));
}
```

### **🎮 Exemple Concret de Brouillard**

#### **Situation de Test**
```hots
# Héros A (jour 18) en (10,10)
# Héros B (jour 23) en (15,15)
# Trésor en (12,12)

# Calcul du Fog pour Héros B
1. Zone de vision : Rayon 3 autour de (15,15)
2. Zone de mouvement : Distance 5 (avec points de mouvement)
3. Zone causale étendue : 
   - Inclut (12,12) car état ψ possible
   - État = "Reachable" (pas encore observé)
4. Simulation temporelle :
   - Si B va en (12,12), arrive jour 24
   - Mais A pourrait y être jour 20
   - Fog = 0.7 (haute incertitude)
```

---

## ⏰ **ÉROSION CAUSALE**

### **🎭 Anna the Martopicker - Architecte du Temps**

> *"Le temps n'attend personne, et ceux qui s'attardent dans le passé verront leurs constructions s'effriter comme le sable entre leurs doigts."*
> 
> **- Anna the Martopicker, Architecte du Temps**

L'**Érosion Causale** est le système de punition temporelle conçu par Anna the Martopicker pour maintenir l'équilibre dans le jeu asynchrone. Il détruit progressivement les constructions des joueurs qui restent trop longtemps dans le passé.

### **📊 Paramètres de Configuration**

```java
// Seuil de déclenchement
DECAY_THRESHOLD_DAYS = 5;           // 5 jours de retard avant décroissance

// Taux de dégâts
DECAY_RATE_PER_DAY = 0.15;          // 15% de dégâts par jour

// Limite maximale
MAX_DECAY_DAYS = 10;                // Maximum 10 jours avant destruction totale

// Multiplicateur de superposition
SUPERPOSITION_DECAY_MULTIPLIER = 2.0; // Double dégâts en zones de superposition
```

### **🏗️ Effets sur les Bâtiments**

#### **Types de Bâtiments et Santé**
| Bâtiment | Santé de Base | Résistance à l'Érosion |
|----------|---------------|------------------------|
| **Château** | 100% | ⭐⭐⭐⭐⭐ |
| **Tour** | 80% | ⭐⭐⭐⭐ |
| **Casernes** | 70% | ⭐⭐⭐ |
| **Tour de Mage** | 60% | ⭐⭐ |
| **Autres** | 50% | ⭐ |

#### **Progression des Dégâts**
1. **0-4 jours de retard** : Aucun effet
2. **5-9 jours de retard** : Dégâts progressifs (15% par jour)
3. **10+ jours de retard** : Destruction possible

### **🛡️ Protection par Vision Future**

Les objets de vision future réduisent la décroissance de **50%** :

**Objets Protecteurs :**
- Lunettes de Wigner
- Spyglass temporel
- Artefacts de vision future
- Items contenant "future", "vision", "wigner"

### **🔧 Système de Réparation**

**Coût :** 10 énergie temporelle par bâtiment

**Conditions :**
- Le héros doit posséder le bâtiment
- Suffisamment d'énergie temporelle
- Bâtiment endommagé (pas détruit)

### **📜 Commandes HOTS pour l'Érosion**

```hots
# Construire des bâtiments (cibles de la décroissance)
BUILD(CASTLE, @10,10, Arthur)
BUILD(TOWER, @15,15, Merlin)

# Appliquer la décroissance temporelle
DECAY(APPLY, 6)  # 6 jours de retard

# Réparer un bâtiment
REPAIR(BUILDING, @10,10, Arthur)

# Voir les statistiques de décroissance
DECAY(STATS)
```

---

## 🔷 **SYSTÈME DE TUILES**

### **🎯 Concept des Tuiles Hexagonales**

Le système de tuiles d'Heroes of Time utilise une **grille hexagonale** pour une meilleure représentation spatiale et temporelle. Chaque tuile peut contenir des entités multiples et des effets temporels.

### **🏗️ Structure de la Tuile (GameTile.java)**

```java
@Entity
@Table(name = "game_tiles")
public class GameTile {
    // Coordonnées spatiales
    private Integer x;
    private Integer y;
    
    // Terrain et environnement
    private String terrain = "grass";
    private List<String> occupants = new ArrayList<>();
    private List<String> effects = new ArrayList<>();
    private List<String> items = new ArrayList<>();
    
    // États quantiques
    private Boolean hasPsiStates = false;
    private Boolean isTemporalZone = false;
    private String temporalZoneType; // TEMPORAL_STORM, CHRONOS_FIELD, etc.
    
    // Bâtiments
    private String buildingType; // CASTLE, TOWER, etc.
    private String buildingOwner;
    
    // Coûts et bonus
    private Integer movementCost = 1;
    private Integer defenseBonus = 0;
    private Integer temporalEnergyBonus = 0;
    
    // Verrouillage temporel
    private Boolean isLocked = false; // Pour effet Anchor Tower
    private Integer lockDuration = 0;
}
```

### **🌍 Types de Terrain**

| Terrain | Coût de Mouvement | Bonus Défense | Bonus Énergie | Description |
|---------|-------------------|---------------|---------------|-------------|
| **Grass** | 1 | 0 | 0 | Terrain de base |
| **Forest** | 2 | +1 | +1 | Couverture, énergie naturelle |
| **Swamp** | 3 | -1 | +2 | Ralentissement, énergie mystique |
| **Mountain** | 4 | +2 | +3 | Défense élevée, énergie temporelle |
| **Water** | ∞ | 0 | 0 | Impassable (sauf avec artefacts) |
| **Temporal Grass** | 1 | 0 | +2 | Herbe imprégnée de temps |
| **Chrono Forest** | 2 | +1 | +3 | Forêt où le temps s'écoule différemment |
| **Time River** | 2 | 0 | +5 | Rivière de flux temporel |
| **Crystal Mountains** | 3 | +3 | +4 | Montagnes de cristal temporel |
| **Temporal Desert** | 2 | -1 | +1 | Désert où le temps s'évapore |

### **🏺 Zones Temporelles Spéciales**

#### **1. Zones de Tempête Temporelle**
```java
temporalZoneType = "TEMPORAL_STORM"
// Effets :
// - Mouvement aléatoire des unités
// - Collapse automatique des ψ-states
// - Dégâts temporels aux héros
```

#### **2. Champs de Chronos**
```java
temporalZoneType = "CHRONOS_FIELD"
// Effets :
// - Ralentissement du temps
// - Amplification des artefacts temporels
// - Protection contre l'érosion causale
```

#### **3. Zones d'Ancrage**
```java
temporalZoneType = "ANCHOR_ZONE"
// Effets :
// - Blocage du branchement temporel
// - Force le collapse des superpositions
// - Stabilisation de la réalité locale
```

### **🔒 Système de Verrouillage**

```java
// Verrouiller une tuile (effet Anchor Tower)
public void lockTile(int duration) {
    this.isLocked = true;
    this.lockDuration = duration;
}

// Déverrouiller automatiquement
public void decrementLockDuration() {
    if (lockDuration > 0) {
        lockDuration--;
        if (lockDuration == 0) {
            isLocked = false;
        }
    }
}
```

---

## 🧠 **CONCEPTS QUANTIQUES AVANCÉS**

### **🌀 Interférence Quantique**

L'interférence quantique se produit quand plusieurs états ψ interagissent dans la même zone spatio-temporelle.

#### **Types d'Interférence**
1. **Constructive** : Amplification des effets
2. **Destructive** : Annulation des effets
3. **Neutral** : Pas d'effet net
4. **Complex** : Effets imprévisibles

#### **Formule d'Interférence**
```java
private double calculateQuantumInterference(int x, int y) {
    List<PsiState> nearbyStates = getPsiStatesInRadius(x, y, 3);
    
    if (nearbyStates.size() < 2) return 0.0;
    
    double interference = 0.0;
    for (int i = 0; i < nearbyStates.size(); i++) {
        for (int j = i + 1; j < nearbyStates.size(); j++) {
            PsiState psi1 = nearbyStates.get(i);
            PsiState psi2 = nearbyStates.get(j);
            
            // Calcul de l'interférence entre deux états
            double overlap = calculateStateOverlap(psi1, psi2);
            interference += overlap * 0.5;
        }
    }
    
    return Math.min(1.0, interference);
}
```

### **🎭 Collapse Causal**

Le collapse causal se produit quand une observation force la résolution d'un état quantique.

#### **Déclencheurs de Collapse**
1. **Observation directe** : Un héros entre dans la zone
2. **Observation indirecte** : Artefact de vision
3. **Conflit temporel** : Deux actions incompatibles
4. **Ancrage forcé** : Zone d'ancrage temporel

#### **Résolution des Conflits**
```java
public CollapseResult resolveCausalConflict(PsiState psi1, PsiState psi2) {
    // Calcul de la probabilité de chaque résultat
    double prob1 = psi1.getProbability();
    double prob2 = psi2.getProbability();
    
    // Résolution basée sur les probabilités
    if (Math.random() < prob1 / (prob1 + prob2)) {
        return new CollapseResult(psi1, "psi1_wins");
    } else {
        return new CollapseResult(psi2, "psi2_wins");
    }
}
```

### **🌐 Zones de Causalité (ZFC)**

Les Zones de Causalité Temporelle (ZFC) sont des régions où les lois causales normales sont altérées.

#### **Types de ZFC**
1. **ZFC Stable** : Causalité normale
2. **ZFC Instable** : Causalité fluctuante
3. **ZFC Paradoxale** : Causalité inversée
4. **ZFC Quantique** : Superposition causale

---

## 🎮 **INTÉGRATION GAMEPLAY**

### **🎯 Interface Utilisateur**

#### **Affichage du Brouillard**
```css
/* États du brouillard en CSS */
.fog-unexplored { background: rgba(50, 50, 50, 0.9); }
.fog-collapsed-past { background: rgba(100, 100, 100, 0.7); }
.fog-reachable { background: rgba(255, 255, 0, 0.3); }
.fog-vision { background: rgba(0, 255, 0, 0.1); }
.fog-ghost { background: rgba(255, 255, 255, 0.2); }
.fog-superposed { background: rgba(128, 0, 255, 0.4); }
.fog-anchored { background: rgba(0, 0, 255, 0.3); }
```

#### **Indicateurs d'Érosion**
```css
/* Effets visuels de décroissance */
.building-decay-1 { filter: sepia(0.2); }
.building-decay-2 { filter: sepia(0.4); }
.building-decay-3 { filter: sepia(0.6); }
.building-decay-4 { filter: sepia(0.8); }
.building-decay-5 { filter: sepia(1.0) brightness(0.5); }
```

### **🎲 Mécaniques de Jeu**

#### **1. Exploration et Découverte**
- **Vision normale** : Rayon autour des héros
- **Vision étendue** : Avec artefacts de vision
- **Vision quantique** : Avec objets spéciaux

#### **2. Planification Temporelle**
- **Zones reachable** : Planification possible
- **Zones ghost** : Observation sans interaction
- **Zones superposed** : Actions conditionnelles

#### **3. Gestion de l'Érosion**
- **Surveillance** : Vérifier régulièrement l'état des bâtiments
- **Réparation** : Coût en énergie temporelle
- **Protection** : Utiliser des artefacts de vision future

### **📜 Scripts HOTS Avancés**

```hots
# Créer un état quantique avec interférence
ψ001: (0.8+0.6i) ⊙(Δt+2 @15,15 ⟶ BUILD(CASTLE, @15,15, Arthur))
ψ002: (0.7-0.3i) ⊙(Δt+1 @15,15 ⟶ BUILD(TOWER, @15,15, Merlin))

# Observation qui force le collapse
Π(Arthur @15,15) ⇒ †ψ001

# Utiliser un artefact de vision future
USE(ARTIFACT, wigner_eye, HERO:Arthur)

# Réparer un bâtiment endommagé
REPAIR(BUILDING, @15,15, Arthur)

# Vérifier l'état du brouillard
FOG(STATUS, @15,15)
```

---

## 🔧 **IMPLÉMENTATION TECHNIQUE**

### **🏗️ Architecture des Services**

#### **1. CausalityZoneService**
```java
@Service
public class CausalityZoneService {
    
    // Calcule TOUTES les zones dans le graphe
    public Map<String, FogState> calculateAllCausalityZones(Game game, String playerId) {
        // Zone de vision (rayon autour des héros)
        // Zone de mouvement (où on peut aller)
        // Zone de causalité étendue (états ψ actifs)
        // Zones ancrées (objets légendaires)
        // Zones fantômes (avec objets spéciaux)
        // Zones de rollback
    }
    
    // Détermine l'état précis d'une tuile
    public FogState determineFogState(Game game, Position position, String playerId) {
        // Retourne un des 7 états selon :
        // - Position des héros
        // - États quantiques actifs
        // - Objets légendaires
        // - Historique d'exploration
    }
}
```

#### **2. TemporalDecayService**
```java
@Service
public class TemporalDecayService {
    
    // Applique la décroissance temporelle
    public DecayResult applyTemporalDecay(Long gameId, int daysBehind) {
        // Calcul du retard temporel
        // Application des dégâts aux bâtiments
        // Gestion des protections
        // Retour des statistiques
    }
    
    // Répare un bâtiment
    public RepairResult repairBuilding(Long gameId, Position position, String heroName) {
        // Vérification des conditions
        // Coût en énergie temporelle
        // Réparation du bâtiment
    }
}
```

#### **3. GameTileService**
```java
@Service
public class GameTileService {
    
    // Met à jour les états des tuiles
    public void updateTileStates(Game game) {
        // Mise à jour des occupants
        // Calcul des effets temporels
        // Gestion du verrouillage
        // Mise à jour des ψ-states
    }
    
    // Calcule les coûts de mouvement
    public int calculateMovementCost(GameTile tile, Hero hero) {
        // Coût de base du terrain
        // Modificateurs temporels
        // Effets d'artefacts
        // Bonus/malus de héros
    }
}
```

### **📊 Base de Données**

#### **Table game_tiles**
```sql
CREATE TABLE game_tiles (
    id BIGINT PRIMARY KEY,
    x INTEGER NOT NULL,
    y INTEGER NOT NULL,
    terrain VARCHAR(255) DEFAULT 'grass',
    has_psi_states BOOLEAN DEFAULT FALSE,
    is_temporal_zone BOOLEAN DEFAULT FALSE,
    temporal_zone_type VARCHAR(255),
    building_type VARCHAR(255),
    building_owner VARCHAR(255),
    movement_cost INTEGER DEFAULT 1,
    defense_bonus INTEGER DEFAULT 0,
    temporal_energy_bonus INTEGER DEFAULT 0,
    is_locked BOOLEAN DEFAULT FALSE,
    lock_duration INTEGER DEFAULT 0,
    game_id BIGINT REFERENCES games(id)
);
```

#### **Tables de Relations**
```sql
-- Occupants des tuiles
CREATE TABLE tile_occupants (
    tile_id BIGINT REFERENCES game_tiles(id),
    occupant VARCHAR(255)
);

-- Effets des tuiles
CREATE TABLE tile_effects (
    tile_id BIGINT REFERENCES game_tiles(id),
    effect VARCHAR(255)
);

-- Items sur les tuiles
CREATE TABLE tile_items (
    tile_id BIGINT REFERENCES game_tiles(id),
    item VARCHAR(255)
);
```

### **🎨 Interface Utilisateur**

#### **Composants React**
```typescript
// Composant de tuile hexagonale
interface TileProps {
    x: number;
    y: number;
    terrain: string;
    fogState: FogState;
    occupants: string[];
    effects: string[];
    building?: Building;
    isLocked: boolean;
    decayLevel: number;
}

const HexTile: React.FC<TileProps> = ({ x, y, terrain, fogState, ... }) => {
    // Rendu de la tuile hexagonale
    // Gestion des états de brouillard
    // Affichage des occupants et effets
    // Indicateurs de décroissance
};
```

---

## 🏆 **CONCLUSION**

### **🎯 Synthèse des Concepts**

Les **Concepts Avancés Temporels** d'Heroes of Time forment un système cohérent et sophistiqué :

1. **🌫️ Brouillard de Causalité** : Gère l'incertitude quantique du futur
2. **⏰ Érosion Causale** : Maintient l'équilibre temporel du jeu
3. **🔷 Système de Tuiles** : Représentation spatiale et temporelle
4. **🧠 Concepts Quantiques** : Mécaniques de superposition et collapse

### **🎮 Impact sur le Gameplay**

- **Stratégie profonde** : Les joueurs doivent gérer l'incertitude temporelle
- **Équilibre dynamique** : L'érosion punit les joueurs en retard
- **Exploration riche** : Le brouillard révèle progressivement le monde
- **Interactions complexes** : Les tuiles supportent de multiples entités

### **🧠 Citation de Jean-Grofignon**

*"Ces concepts avancés révèlent la vraie nature de notre réalité quantique. Le brouillard n'est pas un obstacle, c'est une invitation à explorer l'incertitude. L'érosion n'est pas une punition, c'est un rappel que le temps n'attend personne. Et les tuiles ne sont pas de simples cases, ce sont les pixels de notre univers temporel."* ✨

---

*Documentation des Concepts Avancés Temporels - COMPLÈTE* ✅ 