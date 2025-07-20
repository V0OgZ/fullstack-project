# 🧠 COMPRÉHENSION ARCHITECTURE HEROES OF TIME - OPUS
*Fichier de travail pour ne pas perdre la mémoire*

## 📊 SCHÉMA SIMPLE DE L'ARCHITECTURE

```
                    FRONTEND (Ports multiples)
                           |
                           v
    ┌─────────────────────────────────────────────────┐
    │          API REST :8080 (/api/temporal/*)       │
    └─────────────────────────────────────────────────┘
                           |
                           v
    ┌─────────────────────────────────────────────────┐
    │         TemporalEngineService (MOTEUR)          │
    │  - executeTemporalGameScript() [Point entrée]   │
    │  - Parse HOTS scripts → Actions                 │
    │  - Gère ψ-states et collapse                     │
    └─────────────────────────────────────────────────┘
                    /              \
                   v                v
    ┌──────────────────────┐  ┌───────────────────────┐
    │  CausalCollapseService│  │ ArtifactEffectExecutor│
    │  - 4 types collapse   │  │ - Formules JSON       │
    │  - INTERACTION        │  │ - Code Java hardcodé  │
    │  - OBSERVATION        │  │ - DynamicFormulaParser│
    │  - ANCHORING          │  └───────────────────────┘
    │  - TEMPORAL_LIMIT     │
    └──────────────────────┘
                |
                v
    ┌─────────────────────────────────────────────────┐
    │         CausalityZoneService (MUR CAUSAL)       │
    │  ⚠️ IMPLÉMENTÉ MAIS PAS CONNECTÉ !              │
    │  - calculateMovementZone()                      │
    │  - calculateVisionZone()                        │
    │  - calculateCausalityZone()                     │
    │  - fogOfCausality                               │
    └─────────────────────────────────────────────────┘
```

## 🎯 COMMENT ÇA DEVRAIT ÊTRE - EXEMPLE DE JEAN

### Scénario : Héros avec épée temporelle traverse le mur de causalité

```
JOUR 12 JUIN - SITUATION INITIALE
=================================

Héros A (Joueur 1)          Héros B (Joueur 2)
Position: @5,5              Position: @20,20
Jour: 12 juin               Jour: 12 juin
Mouvement: 2 cases/jour     Mouvement: 2 cases/jour
Objet: Épée Temporelle      Objet: Longue-vue Magique
(+10 mouvement + ignore     (voit 3 jours futur)
 mur causalité)            

         MUR DE CAUSALITÉ (distance = temps)
         =====================================
         Zone normale: 2 cases/jour
         Avec épée: 12 cases/jour → avance dans le temps!

ACTIONS
=======
1. Héros A utilise épée → MOV(@15,15)
   - Normal: bloqué (trop loin, 2 jours de voyage)
   - Avec épée: AUTORISÉ → arrive le 12 juin 23h (futur!)

2. Héros B utilise longue-vue
   - Voit que A a pris le trésor @15,15 dans le futur
   - Peut planifier contre-attaque

3. Conséquences:
   - A est "dans le futur" par rapport à B
   - Si B arrive @15,15 le 14 juin, trésor déjà pris
   - Collapse causal si ils se rencontrent
```

### Architecture Cible Connectée

```
                    MOV(Hero, @x,y)
                           |
                           v
    ┌─────────────────────────────────────────────────┐
    │         TemporalEngineService.moveGameHero()    │
    └─────────────────────────────────────────────────┘
                           |
                           v
    ┌─────────────────────────────────────────────────┐
    │  1. CausalityZoneService.calculateMovementZone()│
    │     - Rayon normal: movementPoints              │
    │     - Check objets spéciaux (épée → +10)        │
    │     - Calcul distance temporelle                │
    └─────────────────────────────────────────────────┘
                           |
                    [Zone autorisée?]
                    /              \
                   OUI             NON
                   |                |
                   v                v
    ┌──────────────────────┐  ┌───────────────────────┐
    │  2. Avancer le temps  │  │  Bloquer mouvement    │
    │  hero.currentDay++    │  │  "Hors zone causale"  │
    │  si distance > normal │  └───────────────────────┘
    └──────────────────────┘
                |
                v
    ┌─────────────────────────────────────────────────┐
    │  3. CausalCollapseService.checkCollisions()     │
    │     - Même position + même temps = COLLAPSE!    │
    │     - Immunités GROFI?                          │
    └─────────────────────────────────────────────────┘
                |
                v
    ┌─────────────────────────────────────────────────┐
    │  4. Update fog of causality                     │
    │     - Zones explorées                           │
    │     - Interférences quantiques                  │
    └─────────────────────────────────────────────────┘
```

## 🔍 CE QUE J'AI COMPRIS

### 1. FLUX D'EXÉCUTION HOTS
```
Script HOTS → API → TemporalEngineService → Parser → Action
   |                                           |
   |                                           v
   └──────────────────────────────> Si USE(ARTIFACT) → ArtifactEffectExecutor
```

### 2. SYSTÈME GROFI
- **GrofiCausalIntegrationService** : Construit le World State Graph
- **GrofiHeroService** : Gère les héros GROFI avec immunités
- **PROBLÈME** : Pas vraiment intégré au moteur principal

### 3. MUR DE CAUSALITÉ (Fog of Causality)
**EXISTE** sous forme de zones :
- Zone de vision (rayon 3)
- Zone de mouvement (selon points)
- Zone de causalité étendue (rayon 10)
- **MAIS** : Pas appliqué aux mouvements réels !

### 4. FORMULES DANS JSON
**PAS DÉCORATIVES !** Elles sont exécutées par :
1. `ArtifactEffectExecutor` → `tryDynamicFormulaExecution()`
2. `DynamicFormulaParser` → Parse et exécute :
   - CONSTRUCTIVE(ψ1, ψ2)
   - DESTRUCTIVE(ψ1, ψ2)
   - AMPLIFY(ψ, factor)
   - TELEPORT_HERO(hero, x, y)
   - CREATE_TEMPORAL_ECHO(hero)
   - Etc.

### 5. SYSTÈME TEMPOREL UTMD
Dans Hero.java :
- `currentDay` : Jour actuel du héros
- `movementPointsPerDay` : 4 points/jour
- `daysTraveled` : Total jours voyagés

## 🚨 PROBLÈMES IDENTIFIÉS

1. **CausalityZoneService pas connecté**
   - La méthode `moveGameHero()` ne vérifie pas les zones
   - Le fog n'est pas appliqué

2. **GROFI pas intégré**
   - Les immunités sont des flags mais pas vérifiées
   - `updateGrofiMetrics()` est vide

3. **Formules JSON sous-utilisées**
   - Le système préfère le code hardcodé
   - Pas tous les artefacts ont des formules

## 📝 NOTES IMPORTANTES

### Services Clés :
- `TemporalEngineService` : Moteur principal
- `TemporalScriptParser` : Parse les scripts HOTS
- `CausalCollapseService` : Gère les effondrements
- `CausalityZoneService` : MUR DE CAUSALITÉ (non connecté)
- `ArtifactEffectExecutor` : Exécute effets artefacts
- `DynamicFormulaParser` : Parse formules JSON
- `GrofiCausalIntegrationService` : Intégration GROFI
- `QuantumInterferenceService` : Calcul interférences

### Modèles Importants :
- `Game` : État global avec heroes, psiStates, tiles
- `Hero` : Position, inventaire, énergie, UTMD (jours)
- `PsiState` : États quantiques ψ
- `GameTile` : Cases avec occupants, locked, etc.
- `ComplexAmplitude` : Nombres complexes pour ψ
- `WorldStateGraph` : Graphe unifié (dans GROFI)

### Endpoints API :
- POST `/api/temporal/games` : Créer jeu
- POST `/api/temporal/games/{id}/script` : Exécuter script
- GET `/api/temporal/games/{id}/state` : État du jeu

## 🎯 PROCHAINES ÉTAPES

1. **Connecter CausalityZoneService**
   ```java
   // Dans moveGameHero()
   List<TileCoord> movementZone = causalityZoneService.calculateMovementZone(game, heroPos, hero.getMovementPoints());
   if (!movementZone.contains(targetPos)) {
       return error("Hors zone de mouvement");
   }
   ```

2. **Activer GROFI**
   - Appeler GrofiHeroService dans le moteur
   - Vérifier immunités avant actions

3. **Privilégier formules JSON**
   - Modifier ArtifactEffectExecutor pour JSON first

## 🎮 SYSTÈME DE GAMEPLAY

### Mur de Causalité (Causality Wall)
- **Implémenté** : `TemporalEngineService.moveGameHero()`
- **Calcul** : `CausalityZoneService.calculateMovementZone()`
- **Limite** : Distance = Points de mouvement du héros
- **Objets spéciaux** : 
  - `temporal_sword` : +10 mouvement
  - `avant_world_blade` : Ignore le mur

### Vision Temporelle
- **Implémenté** : `ArtifactEffectExecutor.executeMagicSpyglass()`
- **Effet** : Voir 3 jours dans le futur
- **Mécanisme** : Avance le temps du héros individuellement

## 🆕 INTÉGRATION AMPLITUDES & GROFI

### Support des Amplitudes Complexes
Le système supporte maintenant les amplitudes complexes dans les formules JSON :

#### Nouvelles Opérations
```java
// Créer une amplitude
CREATE_AMPLITUDE(0.8, 0.6)  // Crée (0.8+0.6i)

// Définir l'amplitude d'un état ψ
SET_AMPLITUDE(ψ001, 0.707, 0.707)  // |ψ|² = 0.98

// Parser depuis une formule textuelle
AMPLITUDE_FROM_FORMULA("(0.8+0.6i)")  // Supporte tous les formats
```

#### Formats d'Amplitude Supportés
- **Complexe** : `(0.8+0.6i)` ou `(0.8-0.6i)`
- **Polaire** : `1.0∠0.5` (magnitude∠phase)
- **Imaginaire pur** : `0.6i`
- **Réel pur** : `0.8`

### Système GROFI (Graph of Reality Organized by Fog and Immunities)

#### Symboles Implémentés
1. **Σ (Sigma)** - Somme des possibles / Réduction
   ```java
   Σ[REDUCE:0.2]  // Réduit toutes les amplitudes de 20%
   Σ[]            // Somme toutes les amplitudes proches
   ```

2. **† (Dagger)** - Mort/Renaissance quantique
   ```java
   †[]  // Si mort → ressuscite à 50% HP
        // Si vivant → crée état mort/vie superposé
   ```

3. **Ω (Omega)** - Finalité ultime
   ```java
   Ω[]  // Force le collapse de TOUS les états ψ
        // Verrouille les tuiles temporellement
   ```

4. **↯ (Chaos)** - Chaos contrôlé
   ```java
   ↯[]  // Effet aléatoire parmi :
        // - Téléportation aléatoire
        // - Inversion d'amplitude
        // - Changement d'énergie ±20
        // - Création état chaotique
   ```

### Exemples de Formules Complètes

#### Artefact avec Amplitude
```json
{
  "id": "quantum_resonator",
  "name": "Résonateur Quantique",
  "formula": "CREATE_AMPLITUDE(0.8, 0.6) + CONSTRUCTIVE(ψ1, ψ2) + AMPLIFY(result, 1.5)",
  "description": "Crée une résonance quantique amplifiée"
}
```

#### Artefact GROFI
```json
{
  "id": "jean_grofignon_special",
  "name": "Épée de Jean Grofignon",
  "formula": "Σ[REDUCE:0.3] + †[] + MODIFY_ENERGY(hero, 20)",
  "description": "Réduit le chaos, ressuscite et restaure l'énergie"
}
```

#### Artefact Chaotique
```json
{
  "id": "vince_vega_gun",
  "name": "Pistolet de Vince Vega",
  "formula": "↯[] + ↯[] + Ω[]",
  "description": "Double chaos suivi d'un collapse total"
}
```

### Flux d'Exécution

1. **Parser** : `DynamicFormulaParser` détecte les nouvelles opérations
2. **Variables** : Les amplitudes sont stockées comme variables (`result`, `amplitude`)
3. **Combinaison** : Les opérations s'enchaînent et se combinent
4. **Persistance** : Les états ψ modifiés sont sauvegardés

### Tests Recommandés

```bash
# Tester les amplitudes
./scripts/test-amplitude-formulas.sh

# Tester GROFI
./scripts/test-grofi-symbols.sh

# Test intégration complète
./scripts/test-jean-gros-v2.sh
```

---
*Dernière mise à jour : Maintenant* 