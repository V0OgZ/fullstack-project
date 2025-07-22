# 🏰 Heroes of Time - Référence Complète Heroes of Might & Magic 3 + Temporel

## 📋 **Table des Matières**
1. [Vue d'ensemble](#vue-densemble)
2. [Système de villes et constructions](#système-de-villes-et-constructions)
3. [Ressources et économie](#ressources-et-économie)
4. [Héros et compétences](#héros-et-compétences)
5. [Armées et créatures](#armées-et-créatures)
6. [Magie et sorts](#magie-et-sorts)
7. [Exploration et aventure](#exploration-et-aventure)
8. [Équipement et artefacts](#équipement-et-artefacts)
9. [Éléments temporels](#éléments-temporels)
10. [Combat et tactique](#combat-et-tactique)
11. [Victoire et objectifs](#victoire-et-objectifs)
12. [API Endpoints](#api-endpoints)

---

## 🎯 **Vue d'ensemble**

Heroes of Time combine les mécaniques classiques d'Heroes of Might & Magic 3 avec des éléments temporels révolutionnaires. Le jeu offre une expérience stratégique complète où les joueurs gèrent villes, armées, héros et manipulent le temps lui-même.

### **Nouveautés Temporelles**
- **ψ-states** : Superpositions quantiques d'actions
- **Triggers** : Observation automatique avec collapse
- **Timelines** : Branches parallèles (ℬ1, ℬ2, ℬ3...)
- **Artefacts temporels** : Objets manipulant le temps

---

## 🏰 **Système de Villes et Constructions**

### **Commandes de Construction**
```bash
# Construction de base
BUILD(CASTLE, @x,y, PLAYER:joueur)
BUILD(WATCHTOWER, @x,y, PLAYER:joueur)
BUILD(GOLD_MINE, @x,y, PLAYER:joueur)
BUILD(TEMPLE, @x,y, PLAYER:joueur)

# Constructions avancées
BUILD(FORTRESS, @x,y, PLAYER:joueur)
BUILD(MAGIC_GUILD, @x,y, PLAYER:joueur)
BUILD(MARKETPLACE, @x,y, PLAYER:joueur)
BUILD(TAVERN, @x,y, PLAYER:joueur)
```

### **Types de Bâtiments**

| Bâtiment | Effet | Coût | Prérequis |
|----------|-------|------|-----------|
| **CASTLE** | +3 défense, +2 énergie temporelle | 2000 or, 20 pierre | Aucun |
| **WATCHTOWER** | +2 défense, vision étendue | 1000 or, 10 pierre | Aucun |
| **GOLD_MINE** | +1000 or/tour | 2500 or, 5 pierre | Aucun |
| **TEMPLE** | Guérison, +1 moral | 1200 or, 5 pierre | Aucun |
| **FORTRESS** | +4 défense, garnison | 3000 or, 30 pierre | CASTLE |
| **MAGIC_GUILD** | Apprentissage sorts | 2000 or, 10 gemmes | TEMPLE |

### **Bâtiments Temporels**
```bash
# Constructions temporelles spéciales
BUILD(TEMPORAL_ANCHOR, @x,y, PLAYER:joueur)  # Ancre temporelle
BUILD(NEXUS_GATE, @x,y, PLAYER:joueur)       # Portail nexus
BUILD(CHRONO_TOWER, @x,y, PLAYER:joueur)     # Tour chronologique
```

---

## 💰 **Ressources et Économie**

### **Ressources Principales**
```bash
# Collecte de ressources
COLLECT(RESOURCE, GOLD, quantité, PLAYER:joueur)
COLLECT(RESOURCE, WOOD, quantité, PLAYER:joueur)
COLLECT(RESOURCE, STONE, quantité, PLAYER:joueur)
COLLECT(RESOURCE, GEMS, quantité, PLAYER:joueur)

# Ressources temporelles
COLLECT(RESOURCE, TEMPORAL_ENERGY, quantité, PLAYER:joueur)
COLLECT(RESOURCE, CHRONOS_CRYSTAL, quantité, PLAYER:joueur)
```

### **Système Économique**

| Ressource | Utilisation | Production |
|-----------|-------------|------------|
| **Or** | Recrutement, construction | Mines, trésors |
| **Bois** | Constructions, équipement | Scieries, forêts |
| **Pierre** | Fortifications, temples | Carrières, montagnes |
| **Gemmes** | Magie, artefacts | Mines précieuses |
| **Énergie Temporelle** | ψ-states, collapse | Artefacts, nexus |
| **Cristaux Chronos** | Voyages temporels | Failles temporelles |

### **Commerce et Échange**
```bash
# Échange de ressources
TRADE(RESOURCE, GOLD, 1000, FOR, WOOD, 500, PLAYER:joueur)
TRADE(RESOURCE, STONE, 200, FOR, GEMS, 50, PLAYER:joueur)

# Commerce avec marchands
MERCHANT(BUY, ARTIFACT, MAGIC_SWORD, 5000, PLAYER:joueur)
MERCHANT(SELL, RESOURCE, GOLD, 2000, PLAYER:joueur)
```

---

## 🦸 **Héros et Compétences**

### **Classes de Héros**
```bash
# Création de héros avec classes
HERO(nom, CLASS:KNIGHT, LEVEL:1)      # Chevalier
HERO(nom, CLASS:SORCERESS, LEVEL:1)   # Sorcière
HERO(nom, CLASS:RANGER, LEVEL:1)      # Rôdeur
HERO(nom, CLASS:NECROMANCER, LEVEL:1) # Nécromancien
HERO(nom, CLASS:WARLOCK, LEVEL:1)     # Démoniste
HERO(nom, CLASS:BARBARIAN, LEVEL:1)   # Barbare
```

### **Système de Niveaux**
```bash
# Montée de niveau
LEVELUP(hero, SKILL:LEADERSHIP)    # Commandement
LEVELUP(hero, SKILL:ARCHERY)       # Tir à l'arc
LEVELUP(hero, SKILL:DEFENSE)       # Défense
LEVELUP(hero, SKILL:OFFENSE)       # Offense
LEVELUP(hero, SKILL:WISDOM)        # Sagesse
LEVELUP(hero, SKILL:MYSTICISM)     # Mysticisme

# Compétences temporelles
LEVELUP(hero, SKILL:TEMPORAL_MASTERY)  # Maîtrise temporelle
LEVELUP(hero, SKILL:PSI_CONTROL)       # Contrôle ψ
```

### **Spécialisations**

| Classe | Spécialité | Bonus |
|--------|------------|-------|
| **KNIGHT** | Commandement | +2 moral, +1 défense |
| **SORCERESS** | Magie | +2 mana, +1 puissance sorts |
| **RANGER** | Archerie | +1 portée, +1 dégâts à distance |
| **NECROMANCER** | Nécromancie | Ressuscite morts |
| **WARLOCK** | Démonologie | Invoque démons |
| **BARBARIAN** | Rage | +2 attaque, +1 vitesse |

---

## ⚔️ **Armées et Créatures**

### **Recrutement d'Unités**
```bash
# Unités de base
RECRUIT(UNIT, SWORDSMEN, quantité, HERO:hero)    # Épéistes
RECRUIT(UNIT, ARCHERS, quantité, HERO:hero)      # Archers
RECRUIT(UNIT, CAVALRY, quantité, HERO:hero)      # Cavalerie
RECRUIT(UNIT, PIKEMEN, quantité, HERO:hero)      # Piquiers

# Unités avancées
RECRUIT(UNIT, KNIGHTS, quantité, HERO:hero)      # Chevaliers
RECRUIT(UNIT, CRUSADERS, quantité, HERO:hero)    # Croisés
RECRUIT(UNIT, ANGELS, quantité, HERO:hero)       # Anges
RECRUIT(UNIT, ARCHANGELS, quantité, HERO:hero)   # Archanges

# Créatures magiques
RECRUIT(UNIT, DRAGON, quantité, HERO:hero)       # Dragons
RECRUIT(UNIT, PHOENIX, quantité, HERO:hero)      # Phénix
RECRUIT(UNIT, UNICORN, quantité, HERO:hero)      # Licornes
```

### **Hiérarchie des Créatures**

| Niveau | Créature | Attaque | Défense | HP | Coût |
|--------|----------|---------|---------|----|----- |
| **1** | Swordsmen | 6 | 6 | 10 | 200 or |
| **2** | Archers | 6 | 3 | 8 | 150 or |
| **3** | Cavalry | 8 | 5 | 15 | 300 or |
| **4** | Knights | 12 | 12 | 25 | 600 or |
| **5** | Crusaders | 18 | 18 | 35 | 1000 or |
| **6** | Angels | 20 | 20 | 50 | 3000 or |
| **7** | Dragons | 30 | 30 | 100 | 8000 or |

### **Créatures Temporelles**
```bash
# Créatures spéciales temporelles
RECRUIT(UNIT, TEMPORAL_GUARDIAN, quantité, HERO:hero)  # Gardien temporel
RECRUIT(UNIT, CHRONO_WARRIOR, quantité, HERO:hero)     # Guerrier chrono
RECRUIT(UNIT, PSI_ENTITY, quantité, HERO:hero)         # Entité ψ
```

---

## ⚡ **Magie et Sorts**

### **Écoles de Magie**
```bash
# École de Feu
LEARN(SPELL, FIREBALL, HERO:hero)        # Boule de feu
LEARN(SPELL, FLAME_ARROW, HERO:hero)     # Flèche de flamme
LEARN(SPELL, METEOR, HERO:hero)          # Météore

# École d'Eau
LEARN(SPELL, HEAL, HERO:hero)            # Guérison
LEARN(SPELL, CURE, HERO:hero)            # Soin
LEARN(SPELL, RESURRECTION, HERO:hero)    # Résurrection

# École de Terre
LEARN(SPELL, STONE_SKIN, HERO:hero)      # Peau de pierre
LEARN(SPELL, EARTHQUAKE, HERO:hero)      # Tremblement de terre
LEARN(SPELL, SLOW, HERO:hero)            # Ralentissement

# École d'Air
LEARN(SPELL, HASTE, HERO:hero)           # Hâte
LEARN(SPELL, LIGHTNING, HERO:hero)       # Foudre
LEARN(SPELL, TELEPORT, HERO:hero)        # Téléportation
```

### **Sorts Temporels**
```bash
# Magie temporelle
LEARN(SPELL, TIME_STOP, HERO:hero)       # Arrêt du temps
LEARN(SPELL, TEMPORAL_SHIELD, HERO:hero) # Bouclier temporel
LEARN(SPELL, CHRONO_BOOST, HERO:hero)    # Accélération chrono
LEARN(SPELL, PSI_COLLAPSE, HERO:hero)    # Effondrement ψ
```

### **Lancement de Sorts**
```bash
# Sorts de combat
CAST(SPELL, FIREBALL, TARGET:@x,y, HERO:hero)
CAST(SPELL, HEAL, TARGET:HERO:cible, HERO:hero)
CAST(SPELL, BLESS, TARGET:UNIT:SWORDSMEN, HERO:hero)

# Sorts temporels
CAST(SPELL, TIME_STOP, TARGET:ZONE:@x,y, HERO:hero)
CAST(SPELL, PSI_COLLAPSE, TARGET:PSI:ψ001, HERO:hero)
```

---

## 🗺️ **Exploration et Aventure**

### **Exploration du Monde**
```bash
# Exploration terrain
EXPLORE(TERRAIN, @x,y, HERO:hero)
EXPLORE(FOREST, @x,y, HERO:hero)
EXPLORE(MOUNTAIN, @x,y, HERO:hero)
EXPLORE(CAVE, @x,y, HERO:hero)

# Découvertes
DISCOVER(TREASURE, @x,y, HERO:hero)
DISCOVER(ARTIFACT, @x,y, HERO:hero)
DISCOVER(RESOURCE, @x,y, HERO:hero)
```

### **Lieux Mystiques**
```bash
# Visites de lieux spéciaux
VISIT(MYSTICAL_PLACE, @x,y, HERO:hero)
VISIT(SHRINE, @x,y, HERO:hero)
VISIT(ORACLE, @x,y, HERO:hero)
VISIT(FOUNTAIN, @x,y, HERO:hero)

# Lieux temporels
VISIT(TEMPORAL_RIFT, @x,y, HERO:hero)
VISIT(CHRONO_NEXUS, @x,y, HERO:hero)
VISIT(PSI_FOUNTAIN, @x,y, HERO:hero)
```

### **Événements Aléatoires**
```bash
# Événements d'exploration
EVENT(RANDOM_ENCOUNTER, @x,y, HERO:hero)
EVENT(TREASURE_FIND, @x,y, HERO:hero)
EVENT(MAGICAL_SPRING, @x,y, HERO:hero)
EVENT(TEMPORAL_ANOMALY, @x,y, HERO:hero)
```

---

## 🛡️ **Équipement et Artefacts**

### **Équipement Classique**
```bash
# Armes
EQUIP(ARTIFACT, MAGIC_SWORD, HERO:hero)
EQUIP(ARTIFACT, FLAMING_SWORD, HERO:hero)
EQUIP(ARTIFACT, DRAGON_SLAYER, HERO:hero)

# Armures
EQUIP(ARTIFACT, PLATE_ARMOR, HERO:hero)
EQUIP(ARTIFACT, DRAGON_SCALE, HERO:hero)
EQUIP(ARTIFACT, CELESTIAL_ARMOR, HERO:hero)

# Accessoires
EQUIP(ARTIFACT, POWER_RING, HERO:hero)
EQUIP(ARTIFACT, MAGIC_CLOAK, HERO:hero)
EQUIP(ARTIFACT, WISDOM_AMULET, HERO:hero)
```

### **Artefacts Temporels**
```bash
# Artefacts de manipulation temporelle
EQUIP(ARTIFACT, AVANTWORLD_BLADE, HERO:hero)    # Lame d'Avant-Monde
EQUIP(ARTIFACT, REVERSE_CLOCK, HERO:hero)       # Horloge Inversée
EQUIP(ARTIFACT, TEMPORAL_ANCHOR, HERO:hero)     # Ancre Temporelle
EQUIP(ARTIFACT, CHRONO_CRYSTAL, HERO:hero)      # Cristal Chronos
```

### **Combinaisons d'Artefacts**
```bash
# Ensembles d'artefacts
COMBINE(ARTIFACT, DRAGON_SET, HERO:hero)        # Set du Dragon
COMBINE(ARTIFACT, TEMPORAL_SET, HERO:hero)      # Set Temporel
COMBINE(ARTIFACT, NECRO_SET, HERO:hero)         # Set Nécromancien
```

---

## 🌀 **Éléments Temporels**

### **ψ-States avec Éléments H3**
```bash
# Superpositions avec armées
ψ001: ⊙(Δt+3 @x,y ⟶ BATTLE(ARMY:hero, ARMY:enemy))
ψ002: ⊙(Δt+2 @x,y ⟶ RECRUIT(UNIT, DRAGON, 5, HERO:hero))
ψ003: ⊙(Δt+1 @x,y ⟶ BUILD(CASTLE, @x,y, PLAYER:joueur))

# Superpositions magiques
ψ004: ⊙(Δt+2 @x,y ⟶ CAST(SPELL, METEOR, TARGET:@x,y, HERO:hero))
ψ005: ⊙(Δt+1 @x,y ⟶ LEARN(SPELL, RESURRECTION, HERO:hero))
```

### **Triggers Avancés**
```bash
# Triggers économiques
Π(GOLD > 10000) ⇒ †ψ001
Π(ARMY_SIZE > 1000) ⇒ †ψ002

# Triggers de combat
Π(HERO_HP < 50%) ⇒ †ψ003
Π(ENEMY_APPROACHES) ⇒ †ψ004

# Triggers temporels
Π(PSI_CONFLICT) ⇒ †ψ005
Π(TEMPORAL_ANOMALY) ⇒ †ψ006
```

### **Collapse Conditionnel**
```bash
# Collapse avec conditions
†ψ001 IF(GOLD >= 5000)
†ψ002 IF(ARMY_READY)
†ψ003 IF(ENEMY_WEAK)
```

---

## ⚔️ **Combat et Tactique**

### **Système de Combat**
```bash
# Combat d'armées
BATTLE(ARMY:hero1, ARMY:hero2, LOCATION:@x,y)
BATTLE(ARMY:hero, ARMY:NEUTRAL_GUARDS, LOCATION:@x,y)

# Combat tactique
TACTICAL_BATTLE(ARMY:attacker, ARMY:defender, TERRAIN:type)
```

### **Sièges**
```bash
# Siège de ville
SIEGE(CASTLE, @x,y, HERO:attacker)
SIEGE(FORTRESS, @x,y, HERO:attacker)

# Défense
DEFEND(CASTLE, @x,y, HERO:defender)
DEFEND(FORTRESS, @x,y, HERO:defender)
```

### **Formations de Combat**
```bash
# Formations d'armée
FORMATION(ARMY:hero, TYPE:DEFENSIVE)
FORMATION(ARMY:hero, TYPE:OFFENSIVE)
FORMATION(ARMY:hero, TYPE:BALANCED)

# Formations temporelles
FORMATION(ARMY:hero, TYPE:TEMPORAL_SHIELD)
FORMATION(ARMY:hero, TYPE:PSI_BURST)
```

---

## 🏆 **Victoire et Objectifs**

### **Conditions de Victoire**
```bash
# Capture d'objectifs
CAPTURE(OBJECTIVE, MAIN_CASTLE, HERO:hero)
CAPTURE(OBJECTIVE, ALL_TOWNS, HERO:hero)
CAPTURE(OBJECTIVE, GRAIL, HERO:hero)

# Élimination
ELIMINATE(PLAYER, opponent)
ELIMINATE(ALL_ENEMIES)

# Objectifs temporels
CAPTURE(OBJECTIVE, TEMPORAL_NEXUS, HERO:hero)
CAPTURE(OBJECTIVE, CHRONO_THRONE, HERO:hero)
```

### **Vérification de Victoire**
```bash
# Vérification des conditions
CHECK(VICTORY, PLAYER:joueur)
CHECK(DEFEAT, PLAYER:joueur)
CHECK(TEMPORAL_VICTORY, PLAYER:joueur)
```

---

## 🌐 **API Endpoints**

### **Endpoints de Base**
- `POST /api/temporal/games` - Créer un nouveau jeu
- `POST /api/temporal/games/{id}/start` - Démarrer un jeu
- `POST /api/temporal/games/{id}/script` - Exécuter un script
- `GET /api/temporal/games/{id}/state` - État du jeu
- `GET /api/temporal/health` - Santé du moteur

### **Endpoints Avancés**
- `POST /api/temporal/games/{id}/build` - Constructions
- `POST /api/temporal/games/{id}/recruit` - Recrutement
- `POST /api/temporal/games/{id}/cast` - Lancement de sorts
- `POST /api/temporal/games/{id}/battle` - Combat
- `POST /api/temporal/games/{id}/explore` - Exploration

---

## 🎮 **Exemple de Partie Complète**

```bash
# Création et démarrage
GAME_START(PLAYER:player1, MAP:large)

# Construction initiale
BUILD(CASTLE, @20,20, PLAYER:player1)
BUILD(GOLD_MINE, @18,18, PLAYER:player1)

# Création de héros
HERO(Arthur, CLASS:KNIGHT, LEVEL:1)
HERO(Morgana, CLASS:SORCERESS, LEVEL:1)

# Développement économique
COLLECT(RESOURCE, GOLD, 5000, PLAYER:player1)
RECRUIT(UNIT, SWORDSMEN, 50, HERO:Arthur)

# Magie et exploration
LEARN(SPELL, FIREBALL, HERO:Morgana)
EXPLORE(TERRAIN, @30,30, HERO:Arthur)

# Éléments temporels
ψ001: ⊙(Δt+3 @40,40 ⟶ BATTLE(ARMY:Arthur, ARMY:Enemy))
Π(ENEMY_WEAK) ⇒ †ψ001

# Combat et victoire
BATTLE(ARMY:Arthur, ARMY:Neutral, LOCATION:@35,35)
CAPTURE(OBJECTIVE, MAIN_CASTLE, HERO:Arthur)
CHECK(VICTORY, PLAYER:player1)
```

---

**🚀 Heroes of Time - La stratégie temporelle ultime !**

**Maîtrisez le temps, dominez l'espace, conquérez l'éternité !** 