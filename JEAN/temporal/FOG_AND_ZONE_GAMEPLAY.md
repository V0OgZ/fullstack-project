# 🌫️ **GAMEPLAY DU BROUILLARD ET DES ZONES TEMPORELLES**
## Guide Complet des Mécaniques de Brouillard de Causalité

*Version 4.0 - Documentation Complète avec Nouveaux Concepts*  
*Date: 21 Juillet 2025 - 10:00*  
*Status: ✅ DOCUMENTATION COMPLÈTE*

---

## 🎯 **VUE D'ENSEMBLE**

### **🎭 Concept Philosophique**

> *"Le brouillard n'est pas juste de la distance, c'est l'incertitude quantique du futur !"*
> 
> **- Jean-Grofignon, l'Éveillé Ontologique**

Le **Brouillard de Causalité** (Fog of Causality) est le système central qui gère l'incertitude temporelle dans Heroes of Time. Contrairement au brouillard de guerre classique qui cache simplement l'information spatiale, le brouillard de causalité représente l'**incertitude quantique** de ce qui existe ou n'existe pas encore dans le futur.

### **🎮 Objectifs du Système**

1. **Gérer l'incertitude** : Représenter l'incertitude quantique du futur
2. **Encourager l'exploration** : Révéler progressivement le monde
3. **Créer la tension** : Ajouter un élément de mystère et de découverte
4. **Récompenser la vision** : Donner un avantage aux joueurs avec des artefacts de vision

---

## 📊 **LES 7 ÉTATS DU BROUILLARD**

### **🎨 Tableau des États**

| État | Nom | Description | Interaction | Couleur UI | Visibilité |
|------|-----|-------------|-------------|------------|------------|
| **0** | **Unexplored** | Brouillard total, jamais vu | Aucune | 🌫️ Gris foncé | 0% |
| **1** | **Collapsed Past** | Exploré dans le passé résolu | Vision seule | 🔘 Gris clair | 25% |
| **2** | **Reachable** | Accessible mais pas observé | Planification | 🟡 Jaune | 50% |
| **3** | **Vision** | Vision directe d'unité/château | Complètement interactif | 🟢 Vert | 100% |
| **4** | **Ghost** | Vu avec objet spectral (Voile) | Pas d'interaction | 👻 Blanc transparent | 75% |
| **5** | **Superposed** | Entité en flux quantique | Partiellement visible | 🔮 Violet | 60% |
| **6** | **Anchored** | Zone qui bloque le branchement temporel | Force le collapse | 🔒 Bleu | 80% |

### **🔍 Détail de Chaque État**

#### **0. Unexplored (Inexploré)**
- **Description** : Zone jamais vue, brouillard total
- **Interaction** : Aucune interaction possible
- **Découverte** : Nécessite exploration directe
- **Stratégie** : Zone à explorer en priorité

#### **1. Collapsed Past (Passé Effondré)**
- **Description** : Zone explorée dans le passé résolu
- **Interaction** : Vision seule, pas d'interaction
- **Découverte** : Historique d'exploration
- **Stratégie** : Zone connue mais non interactive

#### **2. Reachable (Accessible)**
- **Description** : Zone accessible mais non observée
- **Interaction** : Planification possible
- **Découverte** : Calcul de mouvement
- **Stratégie** : Zone de planification stratégique

#### **3. Vision (Vision Directe)**
- **Description** : Vision directe d'unité ou château
- **Interaction** : Complètement interactive
- **Découverte** : Observation directe
- **Stratégie** : Zone d'action immédiate

#### **4. Ghost (Fantôme)**
- **Description** : Vu avec objet spectral (Voile)
- **Interaction** : Observation sans interaction
- **Découverte** : Artefacts de vision spectrale
- **Stratégie** : Reconnaissance sans engagement

#### **5. Superposed (Superposé)**
- **Description** : Entité en flux quantique
- **Interaction** : Partiellement visible
- **Découverte** : États ψ actifs
- **Stratégie** : Gestion des superpositions

#### **6. Anchored (Ancré)**
- **Description** : Zone qui bloque le branchement temporel
- **Interaction** : Force le collapse
- **Découverte** : Objets légendaires
- **Stratégie** : Stabilisation de la réalité

---

## 🧮 **FORMULE MATHÉMATIQUE DU BROUILLARD**

### **🔬 Calcul Détaillé**

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

### **📊 Facteurs de Calcul**

#### **1. Densité Quantique (0.0-0.4)**
- **Description** : Nombre d'états ψ dans un rayon de 5 cases
- **Impact** : Plus d'états = plus de brouillard
- **Formule** : `countQuantumStatesInRadius(x, y, 5) * 0.2`

#### **2. Conflits Causals (0.0-0.6)**
- **Description** : Conflits temporels détectés
- **Impact** : Conflits = incertitude élevée
- **Formule** : `countCausalConflicts(x, y, 5) * 0.3`

#### **3. Interférences Quantiques (0.0-0.25)**
- **Description** : Interférences entre états ψ
- **Impact** : Interférences = brouillard complexe
- **Formule** : `calculateQuantumInterference(x, y) * 0.25`

#### **4. Influence Artefacts (0.0-0.4)**
- **Description** : Effets des artefacts temporels
- **Impact** : Artefacts = modification du brouillard
- **Formule** : `calculateArtifactInfluence(x, y, game)`

#### **5. Clarté d'Observation (0.0-0.5)**
- **Description** : Observations récentes de la zone
- **Impact** : Observations = réduction du brouillard
- **Formule** : `calculateObservationClarity(x, y, game)`

---

## 🎮 **MÉCANIQUES DE GAMEPLAY**

### **🔍 Exploration et Découverte**

#### **1. Vision Normale**
- **Rayon** : 3 cases autour des héros
- **Découverte** : Zones automatiquement révélées
- **Interaction** : Complète dans le rayon de vision

#### **2. Vision Étendue**
- **Artefacts** : Lunettes de Wigner, Spyglass temporel
- **Rayon** : 5-7 cases selon l'artefact
- **Découverte** : Zones étendues révélées
- **Interaction** : Étendue avec limitations

#### **3. Vision Quantique**
- **Objets** : Miroir quantique, Boussole temporelle
- **Rayon** : Variable selon l'objet
- **Découverte** : États ψ et zones spéciales
- **Interaction** : Quantique avec superpositions

### **📋 Planification Temporelle**

#### **1. Zones Reachable**
- **Utilisation** : Planification de mouvements
- **Limitations** : Pas d'interaction directe
- **Stratégie** : Préparation d'actions futures

#### **2. Zones Ghost**
- **Utilisation** : Reconnaissance sans engagement
- **Limitations** : Observation seule
- **Stratégie** : Évaluation des menaces

#### **3. Zones Superposed**
- **Utilisation** : Actions conditionnelles
- **Limitations** : Visibilité partielle
- **Stratégie** : Gestion des probabilités

### **⚔️ Combat et Interaction**

#### **1. Zones de Vision**
- **Combat** : Normal avec toutes les informations
- **Interaction** : Complète avec les unités
- **Stratégie** : Actions tactiques standard

#### **2. Zones de Brouillard**
- **Combat** : Avec incertitude sur les positions
- **Interaction** : Limitée par la visibilité
- **Stratégie** : Actions basées sur les probabilités

#### **3. Zones Ancrées**
- **Combat** : Force le collapse des superpositions
- **Interaction** : Stabilisation de la réalité
- **Stratégie** : Contrôle des zones critiques

---

## 🏺 **ZONES TEMPORELLES SPÉCIALES**

### **🌪️ Zones de Tempête Temporelle**

#### **Caractéristiques**
- **Type** : `TEMPORAL_STORM`
- **Effets** : Mouvement aléatoire, collapse automatique
- **Dégâts** : Dégâts temporels aux héros
- **Stratégie** : Éviter ou traverser rapidement

#### **Mécaniques**
```java
temporalZoneType = "TEMPORAL_STORM"
// Effets :
// - Mouvement aléatoire des unités
// - Collapse automatique des ψ-states
// - Dégâts temporels aux héros
// - Érosion causale accélérée
```

### **⏰ Champs de Chronos**

#### **Caractéristiques**
- **Type** : `CHRONOS_FIELD`
- **Effets** : Ralentissement du temps, amplification des artefacts
- **Protection** : Contre l'érosion causale
- **Stratégie** : Utiliser pour les actions complexes

#### **Mécaniques**
```java
temporalZoneType = "CHRONOS_FIELD"
// Effets :
// - Ralentissement du temps
// - Amplification des artefacts temporels
// - Protection contre l'érosion causale
// - Bonus d'énergie temporelle
```

### **🔒 Zones d'Ancrage**

#### **Caractéristiques**
- **Type** : `ANCHOR_ZONE`
- **Effets** : Blocage du branchement temporel
- **Stabilisation** : Force le collapse des superpositions
- **Stratégie** : Contrôle des zones critiques

#### **Mécaniques**
```java
temporalZoneType = "ANCHOR_ZONE"
// Effets :
// - Blocage du branchement temporel
// - Force le collapse des superpositions
// - Stabilisation de la réalité locale
// - Protection totale contre l'érosion
```

### **🌐 Nexus Temporels**

#### **Caractéristiques**
- **Type** : `TEMPORAL_NEXUS`
- **Effets** : Téléportation, amplification quantique
- **Bonus** : Réduction des coûts de mouvement
- **Stratégie** : Points de contrôle stratégiques

#### **Mécaniques**
```java
temporalZoneType = "TEMPORAL_NEXUS"
// Effets :
// - Point de téléportation temporelle
// - Amplification des capacités quantiques
// - Réduction des coûts de mouvement
// - Bonus de vision étendue
```

---

## 🎨 **INTERFACE UTILISATEUR**

### **🎨 Affichage du Brouillard**

#### **CSS pour les États**
```css
/* États du brouillard en CSS */
.fog-unexplored { 
    background: rgba(50, 50, 50, 0.9); 
    filter: blur(2px);
}

.fog-collapsed-past { 
    background: rgba(100, 100, 100, 0.7); 
    filter: grayscale(0.8);
}

.fog-reachable { 
    background: rgba(255, 255, 0, 0.3); 
    border: 2px dashed rgba(255, 255, 0, 0.5);
}

.fog-vision { 
    background: rgba(0, 255, 0, 0.1); 
    border: 2px solid rgba(0, 255, 0, 0.3);
}

.fog-ghost { 
    background: rgba(255, 255, 255, 0.2); 
    filter: blur(1px);
}

.fog-superposed { 
    background: rgba(128, 0, 255, 0.4); 
    animation: pulse 2s infinite;
}

.fog-anchored { 
    background: rgba(0, 0, 255, 0.3); 
    border: 2px solid rgba(0, 0, 255, 0.6);
}

@keyframes pulse {
    0%, 100% { opacity: 0.4; }
    50% { opacity: 0.8; }
}
```

### **📊 Indicateurs Visuels**

#### **Composant React**
```typescript
interface FogIndicator {
    fogState: FogState;
    fogLevel: number;
    canInteract: boolean;
    description: string;
    temporalZoneType?: string;
    decayLevel?: number;
}

const FogIndicator: React.FC<FogIndicator> = ({ 
    fogState, fogLevel, canInteract, description, temporalZoneType, decayLevel
}) => {
    return (
        <div className={`fog-indicator fog-${fogState.toLowerCase()}`}>
            <div className="fog-level">
                Brouillard: {Math.round(fogLevel * 100)}%
            </div>
            <div className="fog-interaction">
                {canInteract ? '✅ Interactif' : '❌ Non interactif'}
            </div>
            <div className="fog-description">
                {description}
            </div>
            {temporalZoneType && (
                <div className="temporal-zone">
                    Zone: {temporalZoneType}
                </div>
            )}
            {decayLevel && (
                <div className="decay-level">
                    Érosion: {decayLevel}%
                </div>
            )}
        </div>
    );
};
```

---

## 📜 **SCRIPTS HOTS AVANCÉS**

### **🔍 Exploration et Découverte**

```hots
# Exploration avec vision temporelle
USE(ARTIFACT, wigner_eye, HERO:Arthur)

# Création d'états quantiques pour exploration
ψ001: ⊙(Δt+2 @12,12 ⟶ CREATE(CREATURE, quantum_phoenix, @12,12))
ψ002: ⊙(Δt+1 @18,18 ⟶ BUILD(TOWER, @18,18, Merlin))

# Observation qui force le collapse
Π(Arthur enters @12,12) ⇒ †ψ001
```

### **⚔️ Combat dans le Brouillard**

```hots
# Combat avec incertitude
ψ003: (0.8+0.6i) ⊙(Δt+1 @25,25 ⟶ BATTLE(Arthur, quantum_phoenix))
ψ004: (0.7-0.3i) ⊙(Δt+2 @30,30 ⟶ BATTLE(Merlin, quantum_lich))

# Collapse des états de combat
†ψ003
†ψ004
```

### **🔮 Gestion des Zones Spéciales**

```hots
# Utilisation d'artefacts pour zones spéciales
USE(ARTIFACT, quantum_mirror, HERO:Arthur)
USE(ARTIFACT, temporal_compass, HERO:Merlin)

# Vérification de l'état du brouillard
FOG(STATUS, @15,15)

# Dissipation du brouillard
FOG(CLEAR, @15,15)
```

### **🌪️ Gestion des Zones Temporelles**

```hots
# Créer une zone temporelle
CREATE(ZONE, TEMPORAL_STORM, @20,20)

# Vérifier le type de zone
ZONE(TYPE, @20,20)

# Appliquer un effet de zone
ZONE(EFFECT, @20,20, SLOW_TIME)

# Dissiper une zone
ZONE(DISSIPATE, @20,20)
```

### **⏰ Gestion de l'Érosion**

```hots
# Appliquer l'érosion causale
DECAY(APPLY, @15,15, 15)  # 15% de dégâts

# Vérifier l'état d'érosion
DECAY(STATUS, @15,15)

# Réparer les dégâts
DECAY(REPAIR, @15,15)

# Protection contre l'érosion
USE(ARTIFACT, future_vision, BUILDING:castle_15_15)
```

---

## 🏆 **STRATÉGIES AVANCÉES**

### **🎯 Stratégies d'Exploration**

#### **1. Exploration Systématique**
- **Méthode** : Explorer en spirale depuis la base
- **Avantages** : Couverture complète
- **Inconvénients** : Temps de découverte long

#### **2. Exploration Ciblée**
- **Méthode** : Se diriger vers des objectifs spécifiques
- **Avantages** : Découverte rapide des cibles
- **Inconvénients** : Zones inexplorées

#### **3. Exploration avec Artefacts**
- **Méthode** : Utiliser des artefacts de vision
- **Avantages** : Découverte étendue
- **Inconvénients** : Coût en artefacts

### **⚔️ Stratégies de Combat**

#### **1. Combat en Zone Claire**
- **Méthode** : Attirer l'ennemi en zone de vision
- **Avantages** : Informations complètes
- **Inconvénients** : Position prévisible

#### **2. Combat dans le Brouillard**
- **Méthode** : Utiliser l'incertitude à son avantage
- **Avantages** : Élément de surprise
- **Inconvénients** : Informations limitées

#### **3. Combat avec Superpositions**
- **Méthode** : Utiliser les états ψ pour l'avantage
- **Avantages** : Actions multiples
- **Inconvénients** : Complexité de gestion

### **🔮 Stratégies de Contrôle**

#### **1. Contrôle des Zones Critiques**
- **Méthode** : Occuper les zones d'ancrage
- **Avantages** : Stabilisation de la réalité
- **Inconvénients** : Position fixe

#### **2. Manipulation du Brouillard**
- **Méthode** : Utiliser des artefacts pour modifier le brouillard
- **Avantages** : Contrôle de l'information
- **Inconvénients** : Coût en ressources

#### **3. Exploitation des Zones Spéciales**
- **Méthode** : Utiliser les effets des zones temporelles
- **Avantages** : Effets spéciaux
- **Inconvénients** : Risques associés

### **🛡️ Stratégies de Protection**

#### **1. Protection contre l'Érosion**
```hots
# Construire des tours d'ancrage stratégiquement
BUILD(ANCHOR_TOWER, @10,10, Arthur)
BUILD(ANCHOR_TOWER, @20,20, Merlin)

# Créer des champs de chronos
CREATE(ZONE, CHRONOS_FIELD, @15,15)
CREATE(ZONE, CHRONOS_FIELD, @25,25)

# Utiliser des artefacts de protection
USE(ARTIFACT, future_vision, BUILDING:castle_10_10)
USE(ARTIFACT, chronos_shield, BUILDING:tower_15_15)
```

#### **2. Gestion de l'Érosion**
```hots
# Surveillance continue
DECAY(STATUS, @10,10)
DECAY(STATUS, @15,15)
DECAY(STATUS, @20,20)

# Réparation systématique
REPAIR(ALL, Arthur)
REPAIR(ALL, Merlin)

# Planification temporelle
ψ001: ⊙(Δt+1 @10,10 ⟶ REPAIR(BUILDING, @10,10, Arthur))
ψ002: ⊙(Δt+2 @15,15 ⟶ REPAIR(BUILDING, @15,15, Merlin))
†ψ001
†ψ002
```

---

## 🔧 **INTÉGRATION TECHNIQUE**

### **🏗️ Service Backend Principal**

```java
@Service
public class CausalityZoneService {
    
    @Autowired
    private GameTileRepository gameTileRepository;
    
    @Autowired
    private PsiStateRepository psiStateRepository;
    
    @Autowired
    private TemporalDecayService temporalDecayService;
    
    /**
     * Calcule le niveau de brouillard pour une zone
     */
    public double calculateFogOfCausality(int x, int y, Game game) {
        return calculateZoneFogOfCausality(x, y, game);
    }
    
    /**
     * Détermine l'état du brouillard pour une position
     */
    public FogState determineFogState(Game game, Position position, String playerId) {
        // Calcul des facteurs
        double quantumDensity = countQuantumStatesInRadius(position.getX(), position.getY(), 5);
        double conflictIntensity = countCausalConflicts(position.getX(), position.getY(), 5);
        double interferenceLevel = calculateQuantumInterference(position.getX(), position.getY());
        double artifactInfluence = calculateArtifactInfluence(position.getX(), position.getY(), game);
        double observationClarity = calculateObservationClarity(position.getX(), position.getY(), game);
        
        // Détermination de l'état
        if (observationClarity > 0.8) return FogState.VISION;
        if (quantumDensity > 0.3) return FogState.SUPERPOSED;
        if (artifactInfluence > 0.2) return FogState.GHOST;
        if (conflictIntensity > 0.4) return FogState.ANCHORED;
        if (interferenceLevel > 0.1) return FogState.REACHABLE;
        
        return FogState.UNEXPLORED;
    }
    
    /**
     * Applique l'érosion causale
     */
    public void applyTemporalDecay(Game game) {
        temporalDecayService.processDecay(game);
    }
    
    /**
     * Gère les interférences quantiques
     */
    public void processQuantumInterference(Game game) {
        List<GameTile> tilesWithPsiStates = gameTileRepository.findTilesWithPsiStatesByGameId(game.getId());
        
        for (GameTile tile : tilesWithPsiStates) {
            List<PsiState> psiStates = tile.getPsiStates();
            if (psiStates.size() > 1) {
                processInterference(psiStates);
            }
        }
    }
}
```

### **🎨 Interface Frontend Avancée**

```typescript
interface AdvancedFogState {
    fogState: FogState;
    fogLevel: number;
    canInteract: boolean;
    description: string;
    temporalZoneType?: string;
    decayLevel?: number;
    psiStates: PsiState[];
    artifacts: Artifact[];
    occupants: string[];
}

const AdvancedFogIndicator: React.FC<AdvancedFogState> = ({
    fogState,
    fogLevel,
    canInteract,
    description,
    temporalZoneType,
    decayLevel,
    psiStates,
    artifacts,
    occupants
}) => {
    return (
        <div className={`advanced-fog-indicator fog-${fogState.toLowerCase()}`}>
            <div className="fog-header">
                <div className="fog-level">
                    Brouillard: {Math.round(fogLevel * 100)}%
                </div>
                <div className="fog-state">
                    État: {fogState}
                </div>
            </div>
            
            <div className="fog-details">
                <div className="interaction-status">
                    {canInteract ? '✅ Interactif' : '❌ Non interactif'}
                </div>
                <div className="description">
                    {description}
                </div>
            </div>
            
            {temporalZoneType && (
                <div className="temporal-zone-info">
                    <div className="zone-type">
                        Zone: {temporalZoneType}
                    </div>
                    <div className="zone-effects">
                        {getZoneEffects(temporalZoneType)}
                    </div>
                </div>
            )}
            
            {decayLevel && (
                <div className="decay-info">
                    <div className="decay-level">
                        Érosion: {decayLevel}%
                    </div>
                    <div className="decay-status">
                        {decayLevel > 50 ? '⚠️ Critique' : '✅ Normal'}
                    </div>
                </div>
            )}
            
            {psiStates.length > 0 && (
                <div className="psi-states-info">
                    <div className="psi-count">
                        États ψ: {psiStates.length}
                    </div>
                    <div className="psi-list">
                        {psiStates.map(psi => (
                            <div key={psi.id} className="psi-state">
                                {psi.id}: {psi.getAmplitude()}
                            </div>
                        ))}
                    </div>
                </div>
            )}
            
            {artifacts.length > 0 && (
                <div className="artifacts-info">
                    <div className="artifacts-count">
                        Artefacts: {artifacts.length}
                    </div>
                    <div className="artifacts-list">
                        {artifacts.map(artifact => (
                            <div key={artifact.id} className="artifact">
                                {artifact.name}: {artifact.effect}
                            </div>
                        ))}
                    </div>
                </div>
            )}
            
            {occupants.length > 0 && (
                <div className="occupants-info">
                    <div className="occupants-count">
                        Occupants: {occupants.length}
                    </div>
                    <div className="occupants-list">
                        {occupants.map(occupant => (
                            <div key={occupant} className="occupant">
                                {occupant}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
```

---

## 🏆 **CONCLUSION**

### **🎯 Synthèse du Gameplay**

Le **Gameplay du Brouillard et des Zones Temporelles** offre une expérience riche et complexe :

1. **Exploration dynamique** : Découverte progressive du monde
2. **Stratégie profonde** : Gestion de l'incertitude temporelle
3. **Interactions complexes** : Différents niveaux d'interaction
4. **Récompenses de la vision** : Avantages pour les joueurs préparés
5. **Équilibre temporel** : Système d'érosion pour maintenir l'activité

### **🎮 Impact sur l'Expérience**

- **Mystère** : Élément de découverte constant
- **Tension** : Incertitude sur les actions ennemies
- **Récompense** : Avantages pour l'exploration
- **Profondeur** : Stratégies multiples et complexes
- **Équilibre** : Système d'érosion pour maintenir l'activité

### **🧠 Citation de Jean-Grofignon**

*"Le brouillard de causalité n'est pas un obstacle, c'est une invitation à explorer l'incertitude. Chaque zone révélée est une nouvelle possibilité, chaque état superposé une nouvelle stratégie. C'est dans l'incertitude que naît la vraie maîtrise temporelle. Et avec l'érosion causale, le temps nous rappelle qu'il n'attend personne."* ✨

---

*Gameplay du Brouillard et des Zones Temporelles - Documentation Complète* ✅
