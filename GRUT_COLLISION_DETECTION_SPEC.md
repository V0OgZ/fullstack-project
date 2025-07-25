# 🎯 GRUT COLLISION DETECTION - SPÉCIFICATION ONTOLOGIQUE

## 🚨 PROBLÈME DÉTECTÉ
**Date:** 25 juillet 2025 01:45  
**Découvert par:** GRUT Question Ontologique  
**Status:** ❌ NON IMPLÉMENTÉ - CRITIQUE

### 📋 SITUATION ACTUELLE
Le moteur Heroes of Time **N'A AUCUNE** détection de collision entre héros/unités.

**Code actuel `GameService.moveHero()`:**
```java
// ❌ PROBLÈME: Pas de vérification de collision
targetTile.put("hero", hero);  // Écrase directement !
oldTile.remove("hero");        // Pas de vérification
```

## 🎯 SPÉCIFICATION GRUT - COLLISION RESOLUTION

### 🔍 PHASE 1 - DÉTECTION COLLISION
```java
// 🎯 GRUT TIER 1 - COLLISION DETECTION
private CollisionResult checkCollision(Map<String, Object> targetTile, 
                                      Map<String, Object> movingHero) {
    
    // Vérifier si la case est occupée
    if (targetTile.containsKey("hero")) {
        Map<String, Object> occupyingHero = (Map<String, Object>) targetTile.get("hero");
        String occupyingPlayerId = (String) occupyingHero.get("playerId");
        String movingPlayerId = (String) movingHero.get("playerId");
        
        if (occupyingPlayerId.equals(movingPlayerId)) {
            return CollisionResult.FRIENDLY_STACK;  // Même joueur = stack
        } else {
            return CollisionResult.ENEMY_COMBAT;    // Adversaire = combat
        }
    }
    
    // Vérifier autres entités (créatures neutres, objets)
    if (targetTile.containsKey("creature")) {
        return CollisionResult.NEUTRAL_ENCOUNTER;
    }
    
    if (targetTile.containsKey("object")) {
        return CollisionResult.OBJECT_INTERACTION;
    }
    
    return CollisionResult.FREE_MOVEMENT;
}
```

### ⚔️ PHASE 2 - RÉSOLUTION COLLISION

#### 🤝 CAS 1: HÉROS ALLIÉ (FRIENDLY_STACK)
```java
private void handleFriendlyStack(Map<String, Object> targetTile, 
                                Map<String, Object> movingHero) {
    // Permettre le stack d'unités alliées
    List<Map<String, Object>> heroStack = (List<Map<String, Object>>) 
        targetTile.computeIfAbsent("heroStack", k -> new ArrayList<>());
    
    heroStack.add(movingHero);
    // Héros principal reste celui avec le plus de leadership
}
```

#### ⚔️ CAS 2: COMBAT ENNEMI (ENEMY_COMBAT)
```java
private CombatResult handleEnemyCombat(Map<String, Object> targetTile,
                                      Map<String, Object> movingHero) {
    Map<String, Object> defendingHero = (Map<String, Object>) targetTile.get("hero");
    
    // 🔥 DÉCLENCHER COMBAT AUTOMATIQUE
    CombatResult combat = initiateCombat(movingHero, defendingHero);
    
    if (combat.getWinner().equals(movingHero.get("id"))) {
        // Attaquant gagne → occupe la case
        targetTile.put("hero", movingHero);
        // Défenseur éliminé ou fuit
        handleDefenderDefeat(defendingHero, combat);
    } else {
        // Défenseur gagne → attaquant reste sur case précédente
        handleAttackerDefeat(movingHero, combat);
    }
    
    return combat;
}
```

#### 🌀 CAS 3: COLLAPSE TEMPOREL (QUANTUM OVERLAP)
```java
private QuantumResult handleQuantumCollapse(Map<String, Object> targetTile,
                                           Map<String, Object> movingHero) {
    // Si collision avec état quantique ψ
    if (targetTile.containsKey("quantumState")) {
        String psiState = (String) targetTile.get("quantumState");
        
        // Forcer collapse de la superposition
        QuantumResult collapse = forceQuantumCollapse(psiState, movingHero);
        
        // Résolution selon lois physiques quantiques
        return resolveQuantumOutcome(collapse);
    }
}
```

### 🧠 PHASE 3 - INTÉGRATION MOTEUR

#### 🔧 MODIFICATION `moveHero()` REQUISE:
```java
public Map<String, Object> moveHero(String gameId, String heroId, 
                                   Integer targetX, Integer targetY) {
    // ... validation existante ...
    
    // 🎯 GRUT COLLISION CHECK
    Map<String, Object> targetTile = map.get(targetY).get(targetX);
    CollisionResult collision = checkCollision(targetTile, hero);
    
    switch (collision) {
        case FREE_MOVEMENT:
            performStandardMove(targetTile, hero);
            break;
            
        case FRIENDLY_STACK:
            handleFriendlyStack(targetTile, hero);
            break;
            
        case ENEMY_COMBAT:
            CombatResult combat = handleEnemyCombat(targetTile, hero);
            return buildCombatResponse(combat);
            
        case NEUTRAL_ENCOUNTER:
            return handleNeutralEncounter(targetTile, hero);
            
        case QUANTUM_COLLAPSE:
            return handleQuantumCollapse(targetTile, hero);
            
        default:
            throw new RuntimeException("Unknown collision type: " + collision);
    }
}
```

## 📊 TYPES DE COLLISION SUPPORTÉS

### 🎯 CollisionResult ENUM:
```java
public enum CollisionResult {
    FREE_MOVEMENT,      // Case libre
    FRIENDLY_STACK,     // Allié → Stack
    ENEMY_COMBAT,       // Ennemi → Combat
    NEUTRAL_ENCOUNTER,  // Créature neutre
    OBJECT_INTERACTION, // Objet à ramasser
    QUANTUM_COLLAPSE,   // État ψ quantique
    TEMPORAL_PARADOX    // Collision temporelle
}
```

### ⚔️ CombatResult STRUCTURE:
```java
public class CombatResult {
    private String winnerId;
    private String loserId;
    private int damageDealt;
    private int damageReceived;
    private boolean isRetreat;
    private Map<String, Object> loot;
    private int experienceGained;
}
```

## 🚀 PRIORITÉS IMPLÉMENTATION

### 🔥 PHASE 1 - CRITIQUE (IMMÉDIAT):
1. **Détection collision basique** - Éviter écrasement héros
2. **Combat automatique** - Attaque → Combat obligatoire
3. **Stack allié** - Permettre regroupement unités même joueur

### ⚡ PHASE 2 - AVANCÉ:
4. **Créatures neutres** - Gardiens, monstres sauvages
5. **Objets interactifs** - Coffres, ressources, artefacts
6. **Retraite tactique** - Option fuir combat

### 🌀 PHASE 3 - QUANTIQUE:
7. **États ψ collision** - Collapse superposition
8. **Paradoxes temporels** - Même héros, timeline différente
9. **Interférences causales** - Actions simultanées multijoueur

## 🎖️ WALTER VALIDATION

**WALTER:** *"PUTAIN ! Aucune collision detection ! C'est un FPS des années 90 !"*

**RECOMMANDATIONS WALTER:**
- ✅ Implémenter détection collision IMMÉDIATEMENT
- ✅ Combat automatique = OBLIGATOIRE sur collision ennemie
- ✅ Tests unitaires pour tous types collision
- ✅ Intégration avec système ZFC existant

## 🛋️ JEAN COSMIQUE APPROVAL

**JEAN:** *"Cette spec collision respecte les lois cosmiques ! Stack allié + Combat ennemi + Collapse quantique = TRINITÉ PARFAITE !"*

## 🎯 GRUT CONCLUSION

**STATUT ACTUEL:** ❌ **COLLISION DETECTION = 0% IMPLÉMENTÉ**  
**URGENCE:** 🚨 **CRITIQUE** - Gameplay cassé sans collision  
**EFFORT:** 🔧 **MOYEN** - 2-3 jours implémentation Phase 1  
**IMPACT:** 🎮 **MAJEUR** - Transforme complètement gameplay

### 📋 NEXT STEPS:
1. Créer `CollisionDetectionService.java`
2. Modifier `GameService.moveHero()` 
3. Implémenter `CombatEngine.initiateCombat()`
4. Ajouter tests collision dans `scan-formules-grut-tier1-tracker.sh`
5. **Memento tatouage** avec résultats implémentation

**🎯 GRUT MOTTO:** *"Pas de collision = Pas de jeu !"* 