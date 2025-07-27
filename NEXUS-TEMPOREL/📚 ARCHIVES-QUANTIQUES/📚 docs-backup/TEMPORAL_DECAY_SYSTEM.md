# ⏰ **SYSTÈME DE DÉCROISSANCE TEMPORELLE - ANNA THE MARTOPICKER**

*Punition pour les joueurs qui restent trop longtemps dans le passé*  
*Version: 1.0 - Implémentation complète*  
*Date: 21 Juillet 2025 - 02:00*  
*Status: ✅ IMPLÉMENTÉ*

---

## 🎭 **CONCEPT ET PHILOSOPHIE**

### **Anna the Martopicker - Architecte du Temps**

> *"Le temps n'attend personne, et ceux qui s'attardent dans le passé verront leurs constructions s'effriter comme le sable entre leurs doigts."*
> 
> **- Anna the Martopicker, Architecte du Temps**

**Anna the Martopicker** est l'architecte visionnaire qui a conçu le système de décroissance temporelle pour maintenir l'équilibre dans Heroes of Time. Son système punit les joueurs qui restent trop longtemps dans le passé et ralentissent le jeu asynchrone.

### **Problématique Résolue**

Le jeu Heroes of Time est conçu comme un **jeu asynchrone** où les joueurs doivent progresser dans le temps. Cependant, certains joueurs restent volontairement dans le passé pour :
- Accumuler des ressources
- Construire des empires massifs
- Éviter les conflits temporels
- Ralentir le jeu pour les autres

**Solution d'Anna** : Un système de décroissance qui détruit progressivement les constructions des joueurs en retard.

---

## 🔧 **MÉCANIQUES DU SYSTÈME**

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

### **⏰ Calcul du Retard Temporel**

```java
int daysBehind = currentGameDay - heroCurrentDay;
```

Un héros est considéré "en retard" s'il est dans le passé par rapport au temps du jeu principal.

### **🏗️ Effets sur les Bâtiments**

#### **Types de Bâtiments et Santé**
- **Château** : 100% de santé
- **Tour** : 80% de santé  
- **Casernes** : 70% de santé
- **Tour de Mage** : 60% de santé
- **Autres** : 50% de santé

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

---

## 🎮 **UTILISATION EN JEU**

### **📜 Commandes HOTS**

```hots
# Construire des bâtiments (cibles de la décroissance)
BUILD(CASTLE, @10,10, Arthur)
BUILD(TOWER, @15,15, Merlin)
BUILD(BARRACKS, @12,12, Arthur)

# Créer des objets de protection
CREATE(ARTIFACT, wigner_eye, HERO:Merlin)
CREATE(ITEM, spyglass, HERO:Arthur)
```

### **🔧 Endpoints API**

#### **Appliquer la Décroissance**
```bash
POST /api/temporal/decay/{gameId}/apply
```

#### **Réparer un Bâtiment**
```bash
POST /api/temporal/decay/{gameId}/repair
{
  "heroName": "Arthur",
  "x": 10,
  "y": 10
}
```

#### **Statistiques de Décroissance**
```bash
GET /api/temporal/decay/{gameId}/statistics
```

#### **Informations du Système**
```bash
GET /api/temporal/decay/info
```

---

## 🧪 **TEST ET DÉMONSTRATION**

### **Script de Test Automatisé**

```bash
./⚙️ scripts/test/test-temporal-decay.sh
```

**Phases du Test :**
1. **Construction** : Création de héros et bâtiments
2. **Retard Temporel** : Simulation de 3, 6, et 10 jours de retard
3. **Réparation** : Test du système de réparation
4. **Analyse** : Comparaison des statistiques

### **Exemple de Sortie**

```
🌟 TEST SYSTÈME DE DÉCROISSANCE TEMPORELLE - ANNA THE MARTOPICKER
===============================================================
Concept: Punir les joueurs qui restent trop longtemps dans le passé
Quote: "Le temps n'attend personne, et ceux qui s'attardent dans le passé
        verront leurs constructions s'effriter comme le sable entre leurs doigts."
        - Anna the Martopicker, Architecte du Temps

🏗️ PHASE 1: CONSTRUCTION DES BÂTIMENTS
==========================================
📜 Création du héros Arthur
Script: HERO(Arthur)
Réponse: {"success":true,"heroName":"Arthur",...}

⏰ PHASE 2: SIMULATION DU RETARD TEMPOREL
============================================
📅 Simulation: Retard de 6 jours (décroissance active)
⏰ Application de la décroissance temporelle (6 jours de retard)
Résultat: {"success":true,"totalHeroesAffected":1,"totalBuildingsAffected":2,...}

🔧 PHASE 3: RÉPARATION ET PROTECTION
=====================================
🔧 Réparation du bâtiment par Arthur à (10,10)
Résultat: {"success":true,"message":"Building repaired successfully"}
```

---

## 📊 **STATISTIQUES ET ANALYSE**

### **Métriques Collectées**

- **Héros affectés** : Nombre de héros en retard
- **Bâtiments endommagés** : Structures avec dégâts
- **Bâtiments détruits** : Structures complètement détruites
- **Protection active** : Héros avec objets de vision future
- **Taux de décroissance** : Pourcentage de dégâts appliqués

### **Exemple de Statistiques**

```json
{
  "success": true,
  "totalHeroes": 2,
  "heroesWithDecay": 1,
  "totalBuildingsAffected": 2,
  "totalBuildingsDestroyed": 0,
  "heroesWithFutureVision": 1,
  "heroDetails": {
    "Arthur": {
      "daysBehind": 6,
      "decayAmount": 0.15,
      "affectedBuildings": ["CASTLE", "BARRACKS"],
      "destroyedBuildings": [],
      "hasFutureVisionProtection": false,
      "quote": "Chaque jour dans le passé est un coup de marteau sur vos fondations temporelles."
    },
    "Merlin": {
      "daysBehind": 6,
      "decayAmount": 0.075,
      "affectedBuildings": ["TOWER"],
      "destroyedBuildings": [],
      "hasFutureVisionProtection": true,
      "quote": "La vision du futur vous protège, mais même les lunettes de Wigner ont leurs limites."
    }
  }
}
```

---

## 🎯 **STRATÉGIES ET CONTRES**

### **🛡️ Stratégies Défensives**

1. **Objets de Vision Future**
   - Acquérir des lunettes de Wigner
   - Utiliser des spyglass temporels
   - Équiper des artefacts de vision

2. **Gestion de l'Énergie**
   - Maintenir suffisamment d'énergie pour réparer
   - Réparer avant destruction complète
   - Prioriser les bâtiments importants

3. **Progression Temporelle**
   - Ne pas rester plus de 4 jours en retard
   - Avancer régulièrement dans le temps
   - Participer aux événements temporels

### **⚔️ Stratégies Offensives**

1. **Exploitation du Retard**
   - Attaquer les joueurs en retard
   - Profiter de leurs bâtiments affaiblis
   - Bloquer leurs réparations

2. **Manipulation Temporelle**
   - Forcer les autres à rester dans le passé
   - Créer des zones de superposition excessive
   - Accélérer le temps pour les autres

---

## 🔮 **ÉVOLUTIONS FUTURES**

### **Fonctionnalités Prévues**

1. **Zones de Superposition Excessive**
   - Détection automatique des zones problématiques
   - Multiplicateur de décroissance variable
   - Effets visuels spéciaux

2. **Système de Réputation Temporelle**
   - Score de "ponctualité temporelle"
   - Avantages pour les joueurs ponctuels
   - Pénalités pour les retardataires chroniques

3. **Artefacts Anti-Décroissance**
   - Boucliers temporels
   - Stabilisateurs de construction
   - Ancreurs temporels

4. **Événements de Décroissance**
   - Vagues de décroissance massives
   - Événements saisonniers
   - Défis temporels

### **Intégration avec GROFI**

Le système de décroissance s'intègre parfaitement avec le système GROFI :
- **Jean-Grofignon** : Immunité partielle grâce à sa nature légendaire
- **Claudius** : Contrôle de l'ordre vs chaos temporel
- **The Dude, Vince Vega, Walter** : Compagnons avec protections spéciales

---

## 📚 **RÉFÉRENCES TECHNIQUES**

### **Fichiers Principaux**

- `TemporalDecayService.java` - Service principal
- `TemporalDecayController.java` - Contrôleur API
- `TemporalEngineService.java` - Intégration
- `test-temporal-decay.sh` - Script de test

### **Classes et Interfaces**

```java
// Service principal
TemporalDecayService
├── DecayResult          // Résultat d'une décroissance
├── applyTemporalDecay() // Méthode principale
├── calculateDecayRate() // Calcul du taux
└── repairBuilding()     // Réparation

// Contrôleur API
TemporalDecayController
├── applyTemporalDecay() // POST /apply
├── repairDecayedBuilding() // POST /repair
├── getTemporalDecayStatistics() // GET /statistics
└── getDecaySystemInfo() // GET /info
```

### **Configuration**

```properties
# application.properties
temporal.decay.threshold=5
temporal.decay.rate=0.15
temporal.decay.max-days=10
temporal.decay.superposition-multiplier=2.0
temporal.decay.repair-cost=10
```

---

## 🎉 **CONCLUSION**

Le **Système de Décroissance Temporelle d'Anna the Martopicker** est maintenant pleinement opérationnel ! 

**Bénéfices :**
- ✅ Maintient l'équilibre du jeu asynchrone
- ✅ Punition équitable pour les retardataires
- ✅ Système de protection et réparation
- ✅ Intégration parfaite avec l'existant
- ✅ Documentation complète et tests automatisés

**Prochaine étape :** Tester le système en conditions réelles et ajuster les paramètres selon le feedback des joueurs.

*"Le temps n'attend personne, mais maintenant il punit ceux qui s'attardent."* 