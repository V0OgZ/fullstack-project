# 🧠 MÉMOIRE DE TRAVAIL CLAUDE - MUR DE CAUSALITÉ & FORMULES
*Fichier pour ne pas perdre le contexte de la mission*

## 🎯 VISION DE JEAN - LE JEU ASYNCHRONE TEMPOREL

### Concept Central : Distance = Temps
- Quand tu bouges dans l'espace, tu bouges dans le temps
- 1 case = X heures/jours selon la distance parcourue
- Les joueurs peuvent être à des moments différents sur la carte

### Exemple Concret
```
Héros A : 12 juin, 10h00, position (5,5)
Héros B : 12 juin, 10h00, position (20,20)

Si A se déplace vers B:
- Distance = 15 cases
- Avec 3 mouvements/tour → 5 tours nécessaires
- A arrive le 17 juin à (20,20)
- Mais B a peut-être bougé entre temps !
```

### Le Mur de Causalité
- Empêche les paradoxes temporels
- Limite les mouvements selon qui est "dans le futur"
- MAIS peut être traversé avec des objets spéciaux !

### Objets Magiques qui Cassent les Règles
1. **Épée Temporelle** → +10 mouvement = voyage plus vite dans le temps
2. **Longue-vue Magique** → Voit 3 jours dans le futur
3. **Bouclier Chrono** → Immunité aux collapses
4. **Œil de Wigner** → Force l'observation/collapse

## 🔍 CE QUE J'AI TROUVÉ

### Services Implémentés
- ✅ `CausalityZoneService` - Calcule les zones de mouvement
- ✅ `CausalCollapseService` - Gère les effondrements
- ✅ `GrofiCausalIntegrationService` - World State Graph
- ⚠️ PROBLÈME : Pas vraiment connectés ensemble !

### Ce qui Manque
- ❌ Le temps qui avance différemment pour chaque joueur
- ❌ La vision du futur/passé avec objets
- ❌ Les immunités GROFI aux collapses
- ❌ Le serveur qui collapse selon la charge

## 📊 SCHÉMA SIMPLE - COMMENT ÇA DEVRAIT MARCHER

```
        JOUEUR A (12 juin)              JOUEUR B (14 juin)
             |                                |
             v                                v
    [Héros + Objets]                  [Héros + Objets]
             |                                |
             v                                v
    ┌─────────────────────────────────────────────────┐
    │          TEMPORAL ENGINE SERVICE                 │
    │  ┌─────────────────┐  ┌──────────────────┐    │
    │  │ Causality Zones │  │ Collapse Service │    │
    │  │  - Vision zones │  │  - Détection     │    │
    │  │  - Move zones   │  │  - Résolution    │    │
    │  │  - Time calc    │  │  - Immunités     │    │
    │  └─────────────────┘  └──────────────────┘    │
    │              ↓                ↓                │
    │         ┌─────────────────────┐               │
    │         │   WORLD STATE GRAPH │               │
    │         │  - Timelines        │               │
    │         │  - Causal links     │               │
    │         │  - Server load      │               │
    │         └─────────────────────┘               │
    └─────────────────────────────────────────────────┘
                         |
                         v
                  [GAME STATE]
                  - Qui est quand
                  - Qui voit quoi
                  - Qui peut bouger où
```

## 🎯 MISSION VINCE VEGA - TROUVER LES SCÉNARIOS

### Où Chercher
1. **Classes Java de test** - `*Test.java`
2. **Scripts .sh** - Vieux tests
3. **Fichiers .hots** - Scénarios
4. **JSON** - Formules dans les artefacts

### Ce qu'on Cherche
- Scénarios avec Œil de Wigner
- Scénarios avec Ragnar
- Tests de mouvement temporel
- Formules d'algèbre quantique
- Tout ce qui teste la causalité

### Critères d'Élimination
- ❌ Formules décoratives sans effet
- ❌ Propriétés non parsées
- ✅ Garder : Formules exécutées par le système hybride
- ✅ Garder : Effets codés en Java (performance)

## 🔧 SYSTÈME HYBRIDE TROUVÉ

Dans `ArtifactEffectExecutor`:
1. Cherche d'abord dans les JSON
2. Parse les formules dynamiques
3. Fallback sur code Java
4. Fallback générique si rien trouvé

## 📝 PROCHAINES ÉTAPES

1. Trouver TOUS les scénarios
2. Identifier les formules utilisées/inutilisées
3. Connecter causality + time + movement
4. Implémenter vision futur/passé
5. Ajouter immunités GROFI
6. Server load → collapse

## 🚨 NOTES IMPORTANTES

- Le CausalityZoneService EXISTE mais n'est utilisé que dans AdvancedTemporalController
- On l'a connecté dans moveGameHero() mais c'est basique
- Il faut gérer le temps différent pour chaque joueur
- Les objets magiques doivent vraiment casser les règles

## 🎯 CE QU'ON A IMPLÉMENTÉ (20 JUILLET)

### 1. ✅ Mur de Causalité Connecté
- `CausalityZoneService` → `TemporalEngineService.moveGameHero()`
- Limite de mouvement basée sur les points (3 par défaut)
- Épée temporelle donne +10 mouvement

### 2. ✅ Temps Individuel par Héros
- `currentDay` - Jour actuel du héros
- `daysTraveled` - Total des jours voyagés
- Le temps avance quand on voyage loin (distance → jours)

### 3. ✅ Vision Temporelle
- `magic_spyglass` → `executeMagicSpyglass()`
- Voir 3 jours dans le futur
- Montre les héros et ψ-states futurs

### 4. ✅ Rapport Vince Vega
- Identifié les vraies formules vs fakes
- `DynamicFormulaParser` parse les formules
- Formules GROFI non gérées (Σ, †, Ω, etc.)

## 🔧 CE QUI RESTE À FAIRE

1. **Parser GROFI** - Gérer les symboles spéciaux
2. **Immunités** - Implémenter les immunités aux collapses
3. **Server Load** - Collapse selon la charge serveur
4. **WebSocket** - Events temps réel
5. **Nettoyer JSON** - Supprimer les formules inutiles 