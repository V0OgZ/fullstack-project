# 🎮 BACKEND UNIFIÉ - VUE JOUEUR
*20 juillet 2025 - Pour Jean*

## 🎯 CE QUE VOIT LE JOUEUR (PAS GOD VIEW)

### Tour 1 - Le Joueur Démarre
```
Joueur A : Héros Arthur à (10,10), Jour 1
- Voit : Zone de vision rayon 5 autour de lui
- Fog : Tout le reste est noir (UNEXPLORED)
- Peut bouger : 7 cases max (points de mouvement)
```

### Ce que le Backend fait
```java
// 1. Calcul de la vision
List<TileCoord> visionZone = causalityZoneService.calculateVisionZone(
    game, arthur.getPosition(), arthur.getVisionRange()
);

// 2. Calcul du fog pour ce joueur
for (TileCoord tile : allTiles) {
    FogState state = causalityZoneService.determineFogState(
        game, tile, "playerA"
    );
    // UNEXPLORED, VISION, REACHABLE, etc.
}

// 3. Zone de mouvement autorisée
List<TileCoord> movementZone = causalityZoneService.calculateMovementZone(
    game, arthur.getPosition(), arthur.getMovementPoints()
);
```

## 🚶 MOUVEMENT ET TEMPS

### Le Joueur bouge Arthur de (10,10) à (15,15)
```
Distance : 5 cases
Points de mouvement : 7 par jour
Temps écoulé : 1 jour (5 < 7)
```

### Backend - moveGameHero()
```java
// 1. Vérifier le mur de causalité spatial
if (!movementZone.contains(targetPosition)) {
    return error("Trop loin!");
}

// 2. Calculer le temps qui passe
int distance = heroPosition.distanceTo(targetPosition);
int daysRequired = Math.ceil(distance / hero.getMovementPointsPerDay());
hero.setCurrentDay(hero.getCurrentDay() + daysRequired);

// 3. Mettre à jour le fog
causalityZoneService.updateCausalityZones(
    game, hero.getPlayerId(), "HERO_MOVE", targetPosition
);

// 4. Vérifier les collisions temporelles
for (Hero other : heroesAtSamePosition) {
    if (Math.abs(hero.getCurrentDay() - other.getCurrentDay()) <= 1) {
        // COLLISION TEMPORELLE !
        triggerCausalCollapse();
    }
}
```

## 👻 CE QUE LE JOUEUR VOIT DES AUTRES TIMELINES

### Sans objets spéciaux
```
Timeline ℬ1 (la sienne) : Normal
Timeline ℬ2 : RIEN (fog total)
Timeline ℬ3 : RIEN
```

### Avec "Veil of Shadows" ou "Magic Spyglass"
```
Timeline ℬ1 : Normal
Timeline ℬ2 : GHOST (grisé, fantôme)
Timeline ℬ3 : GHOST

Le joueur voit les héros des autres timelines comme des fantômes !
```

### Backend - Calcul du fog multi-timeline
```java
public FogState getFogStateAt5D(Position5D pos, String playerId) {
    // Si autre timeline
    if (!pos.timeline.equals(currentTimeline)) {
        if (player.hasItem("multiverse_lens")) {
            return FogState.GHOST; // Voit comme fantôme
        }
        return FogState.UNEXPLORED; // Voit rien
    }
    
    // Sinon calcul normal
    return calculateNormalFogState(pos);
}
```

## ⚔️ UTILISATION D'ARTEFACTS

### Le Joueur utilise "Quantum Mirror"
```
USE(ARTIFACT, quantum_mirror, HERO:Arthur)
```

### Backend - Flux complet
```java
// 1. TemporalEngineService reçoit la commande
case "USE":
    if ("ARTIFACT".equals(itemType)) {
        // Délègue à ArtifactEffectExecutor
        result = artifactEffectExecutor.executeArtifactEffect(
            "quantum_mirror", arthur, game
        );
    }

// 2. ArtifactEffectExecutor charge l'artefact
Artifact artifact = artifactService.getArtifactById("quantum_mirror");
String formula = artifact.getFormula();
// "CREATE_TEMPORAL_ECHO(hero) + VISION_RANGE(hero, 10)"

// 3. DynamicFormulaParser parse la formule
Map<String, Object> effects = formulaParser.parseAndExecute(
    formula, hero, game
);

// 4. Effets appliqués
- CREATE_TEMPORAL_ECHO → Crée un écho temporel
- VISION_RANGE → Augmente la vision à 10
```

## 🌀 ÉTATS QUANTIQUES (ψ)

### Le Joueur voit
```
Case (15,15) : Scintille (SUPERPOSED)
Info-bulle : "Arthur pourrait être ici dans 2 tours"
```

### Backend - États ψ
```java
// État quantique créé
PsiState psi = new PsiState();
psi.setPsiId("ψ001");
psi.setTargetX(15);
psi.setTargetY(15);
psi.setDeltaT(2); // Dans 2 tours
psi.setProbability(0.8);

// Mise à jour visuelle
GameTile tile = game.getTileAt(15, 15);
tile.setHasPsiStates(true); // Fait scintiller

// Au tour+2, collapse !
if (game.getCurrentTurn() >= psi.getCreationTurn() + psi.getDeltaT()) {
    executeQuantumStateCollapse(psi);
}
```

## 🏆 FORMULES ET AMPLITUDES

### Artefact avec formule complexe
```json
{
  "id": "temporal_blade",
  "formula": "CREATE_AMPLITUDE(0.8, 0.6) + Σ[REDUCE:0.2] + DAMAGE(target, result)"
}
```

### Backend - Parsing unifié
```java
// 1. CREATE_AMPLITUDE(0.8, 0.6)
ComplexAmplitude amp = new ComplexAmplitude(0.8, 0.6);
// = 1.0 de magnitude, 36.87° de phase

// 2. Σ[REDUCE:0.2]
double reduction = executeGrofiSigma("REDUCE:0.2", amp);
// Réduit toutes les amplitudes de 20%

// 3. DAMAGE(target, result)
int damage = (int)(amp.getMagnitude() * 10 * reduction);
target.takeDamage(damage);
```

## 📊 RÉSUMÉ : CE QUE LE BACKEND FAIT À CHAQUE ACTION

### 1. MOUVEMENT
- Vérifie distance max (mur spatial)
- Calcule temps qui passe
- Met à jour position
- Vérifie collisions temporelles
- Met à jour fog/vision

### 2. UTILISATION D'ITEM
- Charge l'artefact JSON
- Parse la formule
- Exécute chaque opération
- Applique les effets
- Met à jour l'état

### 3. ÉTATS QUANTIQUES
- Crée/modifie états ψ
- Calcule probabilités
- Gère les collapses
- Résout les conflits

### 4. FOG ET VISION
- 7 états différents de fog
- Calcul par joueur
- Support multi-timeline
- Mise à jour dynamique

## 🎯 PERFORMANCE

### Optimisations implémentées
```java
// 1. Cache des regex compilés
@Component
public class OptimizedRegexCache {
    private final Map<String, Pattern> cache = new ConcurrentHashMap<>();
}

// 2. Lookup tables pour calculs quantiques
@Component 
public class QuantumLookupTables {
    private final double[] sinTable = new double[360];
    private final double[] cosTable = new double[360];
}

// 3. Métriques de performance
@Component
public class PerformanceMetricsService {
    public <T> T measureOperation(String name, Supplier<T> operation);
}
```

## 🚀 EXEMPLE COMPLET : TOUR DE JEU

```
1. Joueur A bouge Arthur → Backend calcule temps+fog
2. Joueur B (jour+5) voit Arthur comme GHOST
3. Arthur utilise temporal_sword → +10 mouvement
4. Arthur bouge 15 cases → Avance de 2 jours
5. Collision avec état ψ → Collapse déclenché
6. Fog mis à jour pour tous les joueurs
```

---
*"The backend really ties the room together, man."* 🎳 