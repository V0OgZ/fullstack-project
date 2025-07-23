# 🕐 SYSTÈME TEMPOREL MULTIJOUEUR - HEROES OF TIME
*Documentation technique - 20 juillet 2025*

## 🌍 VUE D'ENSEMBLE : LE GRAPHE 5D

Notre jeu se déroule dans un espace-temps à 5 dimensions :
1. **X, Y** - Position spatiale sur la carte
2. **Z** - Altitude/niveau (non implémenté)
3. **Timeline** - Branche temporelle (ℬ1, ℬ2...)
4. **Temporal Layer** - Jour actuel du héros

## ⏰ TEMPS RÉEL VS TEMPS DE JEU

### Le Paradoxe Multijoueur
- **Temps réel** : Les joueurs jouent à des moments différents IRL
- **Temps de jeu** : Chaque héros a son propre "jour actuel"
- **Exemple** : 
  - Joueur 1 : Héros au jour 18
  - Joueur 2 : Héros au jour 23
  - Joueur 3 : Héros au jour 20

### La Règle d'Einstein
```
Distance = Temps
```
- Plus tu voyages loin, plus tu avances dans le temps
- Calculé par : `daysRequired = distance / movementPointsPerDay`

## 🚧 LE MUR DE CAUSALITÉ

### Principe de Base
Chaque héros a une **zone de causalité** qui limite ses actions :
- **Rayon** = Points de mouvement disponibles
- **Limite temporelle** = Ne peut pas remonter avant le héros le plus en retard

### Calcul de la Zone
```java
List<TileCoord> movementZone = causalityZoneService.calculateMovementZone(
    game, heroPosition, effectiveMovementPoints
);
```

### Contraintes
1. **Spatiale** : Distance max = points de mouvement
2. **Temporelle** : Ne peut pas créer de paradoxe
3. **Causale** : Ne peut pas affecter le passé d'un autre joueur

## 🦸 HÉROS SPÉCIAUX : AXIS

### Pouvoir Unique d'Axis
```json
"ultimate_power": {
  "name": "Traversée Temporelle Absolue",
  "description": "Se téléporte à n'importe quel moment du passé ou futur",
  "quantum_script": "ψ∞: |t±∞⟩ ⊙ MOV(HERO, Axis, @TIMELINE[ANY_MOMENT])"
}
```

### Capacités
- ✅ Peut voyager dans le passé/futur sans restriction
- ✅ Ignore le mur de causalité temporel
- ✅ Immunité totale aux paradoxes
- ❌ NE PEUT PAS créer de branches parallèles
- ❌ NE PEUT PAS utiliser d'artefacts quantiques

## 🎮 SCÉNARIO : VOL DU TRÉSOR DU FUTUR

### Situation Initiale
- **Héros A** : Jour 19, position (10,10)
- **Héros B** : Jour 22, position (15,15), possède Axis ou artefact spécial
- **Trésor** : Position (12,12), sera pris jour 20 par Héros A

### Déroulement
1. **Héros B** (jour 22) veut le trésor
2. Il utilise son pouvoir pour remonter au jour 19
3. Il traverse le mur de causalité de Héros A
4. Il arrive au trésor jour 20 (avant Héros A)
5. Il prend le trésor et repart

### Résolution
```java
// Quand Héros A arrive au trésor jour 20
if (treasure.isTaken() && treasure.takenDay < hero.getCurrentDay()) {
    // Le trésor a été pris dans le "passé" par rapport à lui
    result.put("message", "Le trésor a déjà été pris!");
    result.put("takenBy", treasure.takenBy);
    result.put("takenDay", treasure.takenDay);
}
```

## 🌀 COLLAPSE CAUSAL

### Déclencheurs
1. **INTERACTION** : Deux héros au même endroit/temps
2. **OBSERVATION** : Un héros observe un état quantique
3. **ANCHORING** : Un événement devient fixe dans le temps
4. **TEMPORAL_LIMIT** : Limite temporelle atteinte

### Collision Temporelle
```java
if (Math.abs(hero.getCurrentDay() - otherHero.getCurrentDay()) <= 1) {
    // Collision détectée ! Collapse nécessaire
    CausalCollapseService.CollapseTrigger trigger = new CollapseTrigger(
        CollapseTriggerType.INTERACTION,
        "Collision temporelle entre héros"
    );
}
```

## 📊 CALCULS IMPORTANTS

### Avancement Temporel
```java
int distance = heroPosition.distanceTo(targetPosition);
int normalMovementPerDay = hero.getMovementPointsPerDay();
int daysRequired = Math.ceil(distance / normalMovementPerDay);

if (distance > hero.getMovementPoints()) {
    hero.setCurrentDay(hero.getCurrentDay() + daysRequired);
}
```

### Objets Modificateurs
- **temporal_sword** : +10 points de mouvement
- **avant_world_blade** : Ignore le mur de causalité
- **chrono_staff** : Ignore le mur de causalité
- **bowling_ball** : +2 points (The Dude abides)

## 🔒 VERROUILLAGE TEMPOREL

### Principe
Certains événements deviennent **verrouillés** dans le temps :
- Un trésor pris ne peut pas être "dé-pris"
- Une bataille terminée reste terminée
- Un bâtiment construit reste construit

### Implémentation
```java
tile.setIsLocked(true);
tile.setLockDuration(5); // Verrouillé pour 5 tours
```

## 🎯 STRATÉGIES MULTIJOUEUR

### 1. Rush Temporel
- Avancer rapidement dans le temps
- Prendre les ressources du futur
- Risque : Être isolé temporellement

### 2. Contrôle du Présent
- Rester synchronisé avec les autres
- Contrôler les zones clés
- Sécurité mais moins d'opportunités

### 3. Manipulation Causale
- Utiliser Axis ou artefacts spéciaux
- Voler dans le futur des autres
- Créer des paradoxes contrôlés

## ⚠️ LIMITATIONS ACTUELLES

### Implémentées ✅
- Temps individuel par héros
- Mur de causalité spatial
- Calcul distance = temps
- Objets modificateurs
- Collision temporelle

### À Implémenter ❌
- Mur de causalité temporel complet
- Gestion des paradoxes complexes
- Verrouillage d'événements passés
- Résolution de conflits temporels
- Interface visuelle du temps

## 💡 CONSEILS POUR LES JOUEURS

1. **Surveillez votre jour actuel** - Ne vous isolez pas trop
2. **Planifiez vos déplacements** - Distance = Temps !
3. **Utilisez les objets temporels** - Ils changent la donne
4. **Attention aux collisions** - Même endroit + même temps = problème
5. **Axis est OP** - Mais limité aux artefacts classiques

---
*"Le temps n'est qu'une dimension de plus. Maîtrisez-la, et vous maîtriserez le jeu."* 