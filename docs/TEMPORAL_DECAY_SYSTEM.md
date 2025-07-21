# ⏰ **SYSTÈME D'ÉROSION TEMPORELLE**
## Mécaniques Complètes de l'Érosion Causale

*Version 3.0 - Documentation Complète du Système d'Érosion*  
*Date: 21 Juillet 2025 - 09:45*  
*Status: ✅ DOCUMENTATION COMPLÈTE*

---

## 🎯 **VUE D'ENSEMBLE**

### **🎭 Concept Philosophique**

> *"Le temps n'attend personne, et ceux qui s'attardent dans le passé verront leurs constructions s'effriter comme le sable entre leurs doigts."*
> 
> **- Anna la Martopicker, Conceptrice de l'Érosion Temporelle**

L'**Érosion Temporelle** (Temporal Decay) est un système sophistiqué conçu par Anna la Martopicker pour maintenir l'équilibre temporel dans Heroes of Time. Il punit progressivement les joueurs qui restent trop longtemps dans le passé en endommageant leurs bâtiments et structures.

### **🔧 Objectifs du Système**

1. **Équilibre Temporel** : Encourager la progression temporelle
2. **Punition Progressive** : Dégâts graduels aux constructions
3. **Stratégie de Protection** : Récompenser la préparation
4. **Réalisme Quantique** : Simulation de l'instabilité temporelle

---

## ⚙️ **CONFIGURATION DU SYSTÈME**

### **📊 Paramètres de Base**

```java
// Configuration complète de l'érosion temporelle
public class TemporalDecayConfig {
    // Seuils temporels
    private int decayThreshold = 5;        // Tours avant début d'érosion
    private int maxDecayTurns = 20;        // Tours maximum avant destruction
    
    // Taux de dégâts
    private double damageRate = 0.1;       // Dégâts par tour (10%)
    private double maxDamage = 0.5;        // Dégâts maximum (50%)
    
    // Multiplicateurs
    private double superpositionMultiplier = 2.0;  // Double dégâts en zones ψ
    private double temporalStormMultiplier = 1.5;  // +50% en tempête temporelle
    
    // Protection
    private boolean affectsHeroes = false; // N'affecte que les bâtiments
    private List<String> protectedBuildings = Arrays.asList(
        "ANCHOR_TOWER", 
        "CHRONOS_FIELD", 
        "TEMPORAL_NEXUS"
    );
    
    // Réparation
    private int repairCost = 10;           // Coût en énergie temporelle
    private double repairEfficiency = 0.8; // Efficacité de réparation (80%)
}
```

### **🏗️ Types de Bâtiments et Résistance**

| Bâtiment | Santé de Base | Résistance | Dégâts Multiplicateur | Protection Spéciale |
|----------|---------------|------------|----------------------|-------------------|
| **Château** | 100% | ⭐⭐⭐⭐⭐ | 1.0x | Murs renforcés |
| **Tour** | 80% | ⭐⭐⭐⭐ | 1.2x | Structure solide |
| **Caserne** | 70% | ⭐⭐⭐ | 1.3x | Construction militaire |
| **Mage Tower** | 60% | ⭐⭐ | 1.5x | Magie protectrice |
| **Mine** | 50% | ⭐ | 1.8x | Aucune |
| **Tour d'Ancrage** | 90% | ⭐⭐⭐⭐⭐ | 0.0x | **Protection totale** |
| **Champ de Chronos** | 85% | ⭐⭐⭐⭐⭐ | 0.0x | **Protection totale** |

---

## 🔧 **MÉCANIQUES DÉTAILLÉES**

### **📈 Progression des Dégâts**

#### **1. Calcul des Dégâts de Base**
```java
// Calcul des dégâts d'érosion
private int calculateDecayDamage(int turnsInPast, Building building) {
    if (turnsInPast < decayThreshold) {
        return 0; // Pas encore d'érosion
    }
    
    // Dégâts de base
    int baseDamage = (int)((turnsInPast - decayThreshold) * damageRate * building.getMaxHealth());
    
    // Multiplicateurs selon le type de bâtiment
    double buildingMultiplier = getBuildingDecayMultiplier(building.getType());
    baseDamage = (int)(baseDamage * buildingMultiplier);
    
    // Multiplicateurs environnementaux
    if (building.isInSuperpositionZone()) {
        baseDamage = (int)(baseDamage * superpositionMultiplier);
    }
    
    if (building.isInTemporalStorm()) {
        baseDamage = (int)(baseDamage * temporalStormMultiplier);
    }
    
    // Limite maximale
    int maxDamage = (int)(building.getMaxHealth() * this.maxDamage);
    return Math.min(baseDamage, maxDamage);
}
```

#### **2. Progression Temporelle**
```java
// Progression des dégâts selon le temps
public class DecayProgression {
    // 0-4 tours : Aucun effet
    // 5-9 tours : Dégâts légers (10-40%)
    // 10-14 tours : Dégâts modérés (50-80%)
    // 15-19 tours : Dégâts sévères (90-100%)
    // 20+ tours : Destruction possible
    
    public DecayLevel getDecayLevel(int turnsInPast) {
        if (turnsInPast < 5) return DecayLevel.NONE;
        if (turnsInPast < 10) return DecayLevel.LIGHT;
        if (turnsInPast < 15) return DecayLevel.MODERATE;
        if (turnsInPast < 20) return DecayLevel.SEVERE;
        return DecayLevel.CRITICAL;
    }
}
```

### **🛡️ Système de Protection**

#### **1. Bâtiments Protégés**
```java
// Vérification de protection
private boolean isProtectedFromDecay(Building building) {
    // Protection par type de bâtiment
    if (protectedBuildings.contains(building.getType())) {
        return true;
    }
    
    // Protection par artefacts
    if (building.hasArtifact("future_vision") || 
        building.hasArtifact("chronos_shield") ||
        building.hasArtifact("temporal_compass")) {
        return true;
    }
    
    // Protection par zone
    if (building.isInChronosField() || 
        building.isInAnchorZone() ||
        building.isInTemporalNexus()) {
        return true;
    }
    
    return false;
}
```

#### **2. Artefacts de Protection**
```java
// Effets des artefacts protecteurs
public class ProtectionArtifacts {
    public static final Map<String, Double> PROTECTION_ARTIFACTS = Map.of(
        "future_vision", 0.5,      // Réduit les dégâts de 50%
        "chronos_shield", 0.3,     // Réduit les dégâts de 70%
        "temporal_compass", 0.4,   // Réduit les dégâts de 60%
        "anchor_tower", 0.0,       // Protection totale
        "quantum_mirror", 0.6      // Réduit les dégâts de 40%
    );
}
```

### **🔧 Système de Réparation**

#### **1. Coût et Efficacité**
```java
// Calcul du coût de réparation
private RepairCost calculateRepairCost(Building building) {
    int currentDamage = building.getMaxHealth() - building.getCurrentHealth();
    int baseCost = (int)(currentDamage * repairCost / 100.0);
    
    // Modificateurs selon le héros
    Hero repairer = building.getOwner();
    double heroEfficiency = getHeroRepairEfficiency(repairer);
    
    int finalCost = (int)(baseCost / heroEfficiency);
    int repairAmount = (int)(currentDamage * repairEfficiency);
    
    return new RepairCost(finalCost, repairAmount);
}
```

#### **2. Conditions de Réparation**
```java
// Vérification des conditions de réparation
private boolean canRepairBuilding(Building building, Hero hero) {
    // Le héros doit posséder le bâtiment
    if (!building.getOwner().equals(hero.getName())) {
        return false;
    }
    
    // Le bâtiment doit être endommagé
    if (building.getCurrentHealth() >= building.getMaxHealth()) {
        return false;
    }
    
    // Le héros doit avoir assez d'énergie temporelle
    RepairCost cost = calculateRepairCost(building);
    if (hero.getTemporalEnergy() < cost.getEnergyCost()) {
        return false;
    }
    
    // Le bâtiment ne doit pas être détruit
    if (building.getCurrentHealth() <= 0) {
        return false;
    }
    
    return true;
}
```

---

## 🎮 **INTÉGRATION GAMEPLAY**

### **🔧 Service Backend Principal**

```java
@Service
public class TemporalDecayService {
    
    @Autowired
    private BuildingRepository buildingRepository;
    
    @Autowired
    private GameRepository gameRepository;
    
    @Autowired
    private HeroRepository heroRepository;
    
    /**
     * Applique l'érosion temporelle à tous les bâtiments d'un jeu
     */
    public DecayResult applyTemporalDecay(Long gameId) {
        Game game = gameRepository.findById(gameId).orElse(null);
        if (game == null) {
            return new DecayResult(false, "Game not found");
        }
        
        int currentTurn = game.getCurrentTurn();
        List<Building> buildings = buildingRepository.findByGameId(gameId);
        int damagedBuildings = 0;
        int destroyedBuildings = 0;
        
        for (Building building : buildings) {
            int turnsInPast = currentTurn - building.getLastActiveTurn();
            
            // Vérifier la protection
            if (isProtectedFromDecay(building)) {
                continue;
            }
            
            // Calculer les dégâts
            int damage = calculateDecayDamage(turnsInPast, building);
            
            if (damage > 0) {
                // Appliquer les dégâts
                int newHealth = building.getCurrentHealth() - damage;
                building.setCurrentHealth(Math.max(0, newHealth));
                
                // Vérifier la destruction
                if (building.getCurrentHealth() <= 0) {
                    destroyedBuildings++;
                    building.setStatus(BuildingStatus.DESTROYED);
                } else {
                    damagedBuildings++;
                }
                
                buildingRepository.save(building);
            }
        }
        
        return new DecayResult(true, 
            String.format("Decay applied: %d damaged, %d destroyed", 
                damagedBuildings, destroyedBuildings));
    }
    
    /**
     * Répare un bâtiment endommagé
     */
    public RepairResult repairBuilding(Long gameId, Position position, String heroName) {
        Game game = gameRepository.findById(gameId).orElse(null);
        if (game == null) {
            return new RepairResult(false, "Game not found");
        }
        
        Building building = buildingRepository.findByGameIdAndPosition(gameId, position);
        if (building == null) {
            return new RepairResult(false, "Building not found");
        }
        
        Hero hero = heroRepository.findByGameIdAndName(gameId, heroName);
        if (hero == null) {
            return new RepairResult(false, "Hero not found");
        }
        
        // Vérifier les conditions
        if (!canRepairBuilding(building, hero)) {
            return new RepairResult(false, "Cannot repair building");
        }
        
        // Calculer le coût
        RepairCost cost = calculateRepairCost(building);
        
        // Consommer l'énergie temporelle
        hero.setTemporalEnergy(hero.getTemporalEnergy() - cost.getEnergyCost());
        
        // Réparer le bâtiment
        int newHealth = Math.min(building.getMaxHealth(), 
            building.getCurrentHealth() + cost.getRepairAmount());
        building.setCurrentHealth(newHealth);
        
        // Sauvegarder
        heroRepository.save(hero);
        buildingRepository.save(building);
        
        return new RepairResult(true, 
            String.format("Building repaired: %d HP restored", cost.getRepairAmount()));
    }
    
    /**
     * Vérifie l'état d'érosion d'un bâtiment
     */
    public DecayStatus checkDecayStatus(Long gameId, Position position) {
        Building building = buildingRepository.findByGameIdAndPosition(gameId, position);
        if (building == null) {
            return new DecayStatus(false, "Building not found");
        }
        
        Game game = gameRepository.findById(gameId).orElse(null);
        int turnsInPast = game.getCurrentTurn() - building.getLastActiveTurn();
        
        DecayLevel level = getDecayLevel(turnsInPast);
        int damage = calculateDecayDamage(turnsInPast, building);
        boolean isProtected = isProtectedFromDecay(building);
        
        return new DecayStatus(true, level, damage, isProtected, turnsInPast);
    }
}
```

### **🎨 Interface Frontend**

```typescript
interface DecayIndicator {
    decayLevel: DecayLevel;
    damagePercentage: number;
    isProtected: boolean;
    turnsInPast: number;
    canRepair: boolean;
    repairCost: number;
}

const DecayIndicator: React.FC<DecayIndicator> = ({
    decayLevel,
    damagePercentage,
    isProtected,
    turnsInPast,
    canRepair,
    repairCost
}) => {
    return (
        <div className={`decay-indicator decay-${decayLevel.toLowerCase()}`}>
            <div className="decay-level">
                Niveau d'érosion: {decayLevel}
            </div>
            <div className="damage-percentage">
                Dégâts: {Math.round(damagePercentage)}%
            </div>
            <div className="protection-status">
                {isProtected ? '🛡️ Protégé' : '⚠️ Non protégé'}
            </div>
            <div className="turns-in-past">
                Tours dans le passé: {turnsInPast}
            </div>
            {canRepair && (
                <div className="repair-info">
                    <button className="repair-button">
                        Réparer ({repairCost} ⚡)
                    </button>
                </div>
            )}
        </div>
    );
};
```

---

## 📜 **COMMANDES HOTS COMPLÈTES**

### **🔧 Commandes de Base**

```hots
# Appliquer l'érosion causale
DECAY(APPLY, @15,15, 10)  # 10% de dégâts sur la tuile

# Vérifier l'état d'érosion
DECAY(STATUS, @15,15)     # Voir l'état d'érosion

# Réparer les dégâts d'érosion
DECAY(REPAIR, @15,15)     # Réparer les dégâts

# Protection contre l'érosion
USE(ARTIFACT, future_vision, BUILDING:castle_15_15)
```

### **🏗️ Commandes de Construction**

```hots
# Construire des bâtiments (cibles de l'érosion)
BUILD(CASTLE, @10,10, Arthur)
BUILD(TOWER, @15,15, Merlin)
BUILD(CASERNE, @20,20, Ragnar)
BUILD(MAGE_TOWER, @25,25, Morgana)
BUILD(MINE, @30,30, Axis)

# Construire des bâtiments protégés
BUILD(ANCHOR_TOWER, @35,35, JeanGrofignon)
BUILD(CHRONOS_FIELD, @40,40, Claudius)
```

### **🛡️ Commandes de Protection**

```hots
# Utiliser des artefacts de protection
USE(ARTIFACT, future_vision, BUILDING:castle_10_10)
USE(ARTIFACT, chronos_shield, BUILDING:tower_15_15)
USE(ARTIFACT, temporal_compass, BUILDING:caserne_20_20)

# Créer des zones de protection
CREATE(ZONE, CHRONOS_FIELD, @45,45)
CREATE(ZONE, ANCHOR_ZONE, @50,50)
```

### **🔧 Commandes de Réparation**

```hots
# Réparer un bâtiment spécifique
REPAIR(BUILDING, @10,10, Arthur)

# Réparer tous les bâtiments d'un héros
REPAIR(ALL, Arthur)

# Vérifier les coûts de réparation
REPAIR(COST, @15,15, Merlin)
```

### **📊 Commandes de Statistiques**

```hots
# Voir les statistiques d'érosion
DECAY(STATS)

# Voir l'historique d'érosion
DECAY(HISTORY, @20,20)

# Voir les bâtiments les plus endommagés
DECAY(WORST, 5)  # Top 5 des bâtiments les plus endommagés
```

---

## 🎯 **STRATÉGIES AVANCÉES**

### **🛡️ Stratégies de Protection**

#### **1. Protection Préventive**
```hots
# Construire des tours d'ancrage stratégiquement
BUILD(ANCHOR_TOWER, @10,10, Arthur)
BUILD(ANCHOR_TOWER, @20,20, Merlin)
BUILD(ANCHOR_TOWER, @30,30, Ragnar)

# Créer des champs de chronos
CREATE(ZONE, CHRONOS_FIELD, @15,15)
CREATE(ZONE, CHRONOS_FIELD, @25,25)
```

#### **2. Protection par Artefacts**
```hots
# Équiper tous les bâtiments importants
USE(ARTIFACT, future_vision, BUILDING:castle_10_10)
USE(ARTIFACT, chronos_shield, BUILDING:tower_15_15)
USE(ARTIFACT, temporal_compass, BUILDING:caserne_20_20)
USE(ARTIFACT, quantum_mirror, BUILDING:mage_tower_25_25)
```

#### **3. Protection par Zones**
```hots
# Créer des zones de protection temporaires
CREATE(ZONE, TEMPORAL_NEXUS, @35,35)
CREATE(ZONE, ANCHOR_ZONE, @40,40)
```

### **🔧 Stratégies de Réparation**

#### **1. Réparation Systématique**
```hots
# Réparer tous les bâtiments endommagés
REPAIR(ALL, Arthur)
REPAIR(ALL, Merlin)
REPAIR(ALL, Ragnar)
```

#### **2. Réparation Ciblée**
```hots
# Réparer les bâtiments les plus importants en premier
REPAIR(BUILDING, @10,10, Arthur)  # Château principal
REPAIR(BUILDING, @15,15, Merlin)  # Tour de défense
REPAIR(BUILDING, @20,20, Ragnar)  # Caserne
```

#### **3. Réparation Économique**
```hots
# Vérifier les coûts avant réparation
REPAIR(COST, @10,10, Arthur)
REPAIR(COST, @15,15, Merlin)
REPAIR(COST, @20,20, Ragnar)

# Réparer seulement si le coût est acceptable
IF(repair_cost < 20) THEN REPAIR(BUILDING, @10,10, Arthur)
```

### **⚔️ Stratégies de Gestion**

#### **1. Rotation des Héros**
```hots
# Faire tourner les héros pour maintenir l'activité
MOV(Arthur, @10,10)  # Activer le château
MOV(Merlin, @15,15)  # Activer la tour
MOV(Ragnar, @20,20)  # Activer la caserne
```

#### **2. Surveillance Continue**
```hots
# Vérifier régulièrement l'état des bâtiments
DECAY(STATUS, @10,10)
DECAY(STATUS, @15,15)
DECAY(STATUS, @20,20)
DECAY(STATUS, @25,25)
```

#### **3. Planification Temporelle**
```hots
# Planifier les réparations avec des états ψ
ψ001: ⊙(Δt+1 @10,10 ⟶ REPAIR(BUILDING, @10,10, Arthur))
ψ002: ⊙(Δt+2 @15,15 ⟶ REPAIR(BUILDING, @15,15, Merlin))
ψ003: ⊙(Δt+3 @20,20 ⟶ REPAIR(BUILDING, @20,20, Ragnar))

# Collapse des réparations
†ψ001
†ψ002
†ψ003
```

---

## 🧪 **TESTS COMPLETS**

### **🔧 Tests de Base**

```bash
#!/bin/bash
# test-temporal-decay.sh

echo "⏰ Test du Système d'Érosion Temporelle"
echo "======================================"

# Test 1: Application de l'érosion
echo "🔧 Test 1: Application de l'érosion"
curl -X POST http://localhost:8080/api/decay/apply \
  -H "Content-Type: application/json" \
  -d '{"gameId": 1}' | jq '.'

# Test 2: Vérification d'état
echo "📊 Test 2: Vérification d'état"
curl -X GET "http://localhost:8080/api/decay/status?gameId=1&x=10&y=10" | jq '.'

# Test 3: Réparation
echo "🔧 Test 3: Réparation"
curl -X POST http://localhost:8080/api/decay/repair \
  -H "Content-Type: application/json" \
  -d '{"gameId": 1, "x": 10, "y": 10, "heroName": "Arthur"}' | jq '.'

echo "✅ Tests terminés"
```

### **📊 Tests de Performance**

```bash
#!/bin/bash
# test-decay-performance.sh

echo "⚡ Test de Performance du Système d'Érosion"
echo "=========================================="

# Test de charge
echo "🔧 Test de charge (100 bâtiments)"
start_time=$(date +%s)

for i in {1..100}; do
  curl -X POST http://localhost:8080/api/decay/apply \
    -H "Content-Type: application/json" \
    -d '{"gameId": 1}' > /dev/null 2>&1 &
done

wait
end_time=$(date +%s)
duration=$((end_time - start_time))

echo "⏱️ Temps total: ${duration} secondes"
echo "📊 Moyenne: $(echo "scale=2; ${duration}/100" | bc) secondes par requête"

echo "✅ Tests de performance terminés"
```

---

## 📚 **RÉFÉRENCE API**

### **🔗 Endpoints**

#### **POST /api/decay/apply**
Applique l'érosion temporelle à tous les bâtiments d'un jeu.

**Paramètres :**
- `gameId` (Long) : ID du jeu

**Réponse :**
```json
{
  "success": true,
  "message": "Decay applied: 5 damaged, 1 destroyed",
  "damagedBuildings": 5,
  "destroyedBuildings": 1
}
```

#### **GET /api/decay/status**
Vérifie l'état d'érosion d'un bâtiment.

**Paramètres :**
- `gameId` (Long) : ID du jeu
- `x` (Integer) : Coordonnée X
- `y` (Integer) : Coordonnée Y

**Réponse :**
```json
{
  "success": true,
  "decayLevel": "MODERATE",
  "damagePercentage": 35.5,
  "isProtected": false,
  "turnsInPast": 8,
  "canRepair": true,
  "repairCost": 15
}
```

#### **POST /api/decay/repair**
Répare un bâtiment endommagé.

**Paramètres :**
- `gameId` (Long) : ID du jeu
- `x` (Integer) : Coordonnée X
- `y` (Integer) : Coordonnée Y
- `heroName` (String) : Nom du héros

**Réponse :**
```json
{
  "success": true,
  "message": "Building repaired: 25 HP restored",
  "repairAmount": 25,
  "energyCost": 10
}
```

### **🔧 Codes d'Erreur**

| Code | Description | Solution |
|------|-------------|----------|
| **400** | Game not found | Vérifier l'ID du jeu |
| **400** | Building not found | Vérifier les coordonnées |
| **400** | Hero not found | Vérifier le nom du héros |
| **400** | Cannot repair building | Vérifier les conditions de réparation |
| **500** | Erreur interne | Vérifier les logs du serveur |

---

## 🏆 **CONCLUSION**

### **🎯 Synthèse du Système**

Le **Système d'Érosion Temporelle** d'Heroes of Time offre une mécanique sophistiquée et équilibrée :

1. **Punition Progressive** : Dégâts graduels selon le temps passé
2. **Protection Multiple** : Artefacts, zones, et bâtiments spéciaux
3. **Réparation Coûteuse** : Système de coût en énergie temporelle
4. **Stratégie Profonde** : Gestion de l'équilibre temporel

### **🎮 Impact sur le Gameplay**

- **Équilibre Temporel** : Encourage la progression temporelle
- **Stratégie de Protection** : Récompense la préparation
- **Gestion des Ressources** : Coût de réparation en énergie
- **Réalisme Quantique** : Simulation de l'instabilité temporelle

### **🧠 Citation d'Anna la Martopicker**

*"L'érosion temporelle n'est pas une punition, c'est un rappel. Le temps n'attend personne, et ceux qui s'attardent dans le passé verront leurs constructions s'effriter. Mais avec la bonne préparation et les bons artefacts, même le temps peut être maîtrisé."* ✨

---

*Système d'Érosion Temporelle - Documentation Complète* ✅ 