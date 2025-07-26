# 🪞 SCÉNARIO - "LES DEUX QUI PARLENT"

*"Tu étais là. Et là aussi. Mais ce n'était pas la même toi. Et l'un de vous ment."*

---

## 🌀 **CONTEXTE NARRATIF**

Le joueur entre dans une zone d'interstice instable, le **Dôme de la Cascade**, activée par le **Talisman des Échos Inversés**. L'espace-temps y est fragmenté, les lois de causalité flexibles.

Deux versions du même héros sont projetées dans des Trames parallèles, décalées de quelques tics temporels et ayant vécu des choix différents. Le joueur peut observer, écouter, puis choisir de fusionner, refuser ou effacer l'une des versions.

---

## 🗺️ **PARAMÈTRES DE LA MAP**

```json
{
  "map_id": "dome_cascade_divergent",
  "geometry_formula": "HEX_FRACTAL",
  "tileset": "GLITCH_FOREST",
  "sound_theme": "eerie_echo",
  "music_layer": "multi-phase ambient",
  "timeline_phasing_enabled": true,
  "tick_per_day_per_player": {
    "player": 24,
    "echo_A": 21,
    "echo_B": 27
  },
  "divergence_visuals": {
    "ghost_echoes": true,
    "phase_transparency": 0.7,
    "temporal_blur": "high",
    "reality_glitches": "intense"
  }
}
```

---

## 🎭 **SCÉNARIO HOTS COMPLET**

```hots
## === INTRODUCTION ===
SETUP(MAP: dome_cascade_divergent, WEATHER: temporal_storm)
NARRATE "Le Dôme de la Cascade pulse d'une énergie étrange. L'air vibre de possibilités non résolues."

## === ACTIVATION ===
TRIGGER: PLAYER_ENTERS ZONE=DOME_CASCADE
NARRATE "Le Talisman des Échos Inversés s'active sans prévenir. La réalité se dédouble."

USE HERO=PLAYER ITEM="TALISMAN_ECHOS_INVERSES"
EFFECT: SCREEN_SPLIT_VERTICAL
SOUND: reality_tear.ogg

## === DIVERGENCE ===
SPLIT HERO=PLAYER INTO PLAYER_A, PLAYER_B

# Version A apparaît à gauche, légèrement transparente
PLACE PLAYER_A AT @10,10
SET PLAYER_A.transparency = 0.7
SET PLAYER_A.tick_memory = -3

# Version B apparaît à droite, également transparente
PLACE PLAYER_B AT @14,10
SET PLAYER_B.transparency = 0.7
SET PLAYER_B.tick_memory = +5

## === PREMIER CONTACT ===
PAUSE 2s

SAY HERO=PLAYER_A "J'ai activé le talisman à tic +38. Pourquoi suis-je ici ?"
EFFECT: TEXT_GLITCH on PLAYER_A.dialogue

SAY HERO=PLAYER_B "Tu l'as activé ? Non, c'était moi. Et c'était à tic +41."
EFFECT: TEXT_GLITCH on PLAYER_B.dialogue

NARRATE "Les deux versions se regardent. L'une d'elles ment. Ou les deux disent une vérité différente."

## === PHASE D'INVESTIGATION ===
ENABLE_COMMANDS: [OBSERVE, ASK, EXAMINE]

ON_COMMAND OBSERVE PLAYER_A:
  DISPLAY_MEMORY:
    > "Trace mémoire : Dialogue avec Ford à T-35"
    > "Action : Activation de la tour temporelle"
    > "Rencontre : Vince absent de la timeline"
    > "État émotionnel : Confiant"
  SET instability +5

ON_COMMAND OBSERVE PLAYER_B:
  DISPLAY_MEMORY:
    > "Trace mémoire : Déclenchement de la mallette à T-40"
    > "Action : Silence face à Vince"
    > "Rencontre : Ford n'était pas là"
    > "État émotionnel : Méfiant"
  SET instability +5

## === DIALOGUES DIVERGENTS ===
ON_COMMAND ASK PLAYER_A ABOUT FORD:
  SAY HERO=PLAYER_A "Ford m'a prévenu. Il savait que cela arriverait."
  SAY HERO=PLAYER_B "Ford ? Il n'existe pas dans ma timeline !"
  SET instability +10

ON_COMMAND ASK PLAYER_B ABOUT MALLETTE:
  SAY HERO=PLAYER_B "J'ai vu ce qu'il y avait dedans. C'était..."
  SAY HERO=PLAYER_A "Impossible ! La mallette ne s'ouvre jamais !"
  EFFECT: REALITY_GLITCH radius=5
  SET instability +15

## === ESCALADE D'INSTABILITÉ ===
IF instability > 50:
  NARRATE "L'espace commence à se fragmenter. Des échos d'autres versions apparaissent."
  SPAWN ECHO_C AT random_position
  SPAWN ECHO_D AT random_position
  SET ECHO_C.transparency = 0.3
  SET ECHO_D.transparency = 0.3

IF instability > 80:
  NARRATE "ALERTE : Effondrement causal imminent. Une décision doit être prise."
  EFFECT: SCREEN_SHAKE intensity=high
  SOUND: collapse_warning.ogg

## === CHOIX FINAL ===
DISPLAY_CHOICE:
  [1] "Fusionner les deux versions (⚠️ Instable)"
  [2] "Supprimer PLAYER_A (Garder les souvenirs de B)"
  [3] "Supprimer PLAYER_B (Garder les souvenirs de A)"
  [4] "Laisser les deux exister (Créer une ramification)"

## === RÉSOLUTIONS ===

# Option 1 : Fusion
IF CHOICE = 1:
  COMMAND: FUSE PLAYER_A WITH PLAYER_B
  EFFECT: BLINDING_LIGHT duration=3s
  
  IF SUCCESS (60% chance):
    CREATE PLAYER_FUSED AT @12,10
    SAY HERO=PLAYER_FUSED "Je... je me souviens des deux versions. Ford était là et pas là. La mallette était ouverte et fermée."
    GRANT PLAYER_FUSED STATUS="REWRITTEN_IDENTITY"
    GRANT PLAYER_FUSED ABILITY="DOUBLE_MEMORY"
    NARRATE "Vous êtes maintenant un paradoxe vivant. Vos souvenirs contradictoires sont votre force... et votre malédiction."
  
  ELSE:
    EFFECT: EXPLOSION_TEMPORAL
    NARRATE "La fusion échoue. Les deux versions s'annulent mutuellement."
    RESPAWN PLAYER AT ZONE_ENTRANCE
    GRANT DEBUFF="TEMPORAL_AMNESIA" duration=10min

# Option 2 : Collapse A
IF CHOICE = 2:
  COMMAND: COLLAPSE PLAYER_A
  EFFECT: PLAYER_A.fade_out duration=5s
  SAY HERO=PLAYER_A "Je n'étais qu'un écho... mais j'étais réel..."
  
  TRANSFER PLAYER_B TO PLAYER
  SAY HERO=PLAYER "La mallette... je sais maintenant ce qu'elle contient. Mais je ne peux pas le dire."
  GRANT MEMORY="MALLETTE_TRUTH"
  SET PLAYER.permanent_secret = true

# Option 3 : Collapse B  
IF CHOICE = 3:
  COMMAND: COLLAPSE PLAYER_B
  EFFECT: PLAYER_B.dissolve duration=5s
  SAY HERO=PLAYER_B "Ma vérité disparaît avec moi..."
  
  TRANSFER PLAYER_A TO PLAYER
  SAY HERO=PLAYER "Ford avait raison. Certaines choses ne doivent pas être vues."
  GRANT MEMORY="FORD_WARNING"
  GRANT ALLY_REPUTATION="FORD" +20

# Option 4 : Coexistence
IF CHOICE = 4:
  NARRATE "Les deux versions se regardent, puis hochent la tête."
  SAY HERO=PLAYER_A "Nous pouvons coexister."
  SAY HERO=PLAYER_B "Mais à quel prix ?"
  
  CREATE TIMELINE_FORK ID="PLAYER_DIVERGENCE"
  SET PLAYER_A.timeline = "ALPHA"
  SET PLAYER_B.timeline = "BETA"
  
  NARRATE "La réalité se scinde. Deux chemins s'ouvrent devant vous."
  DISPLAY_WARNING "Attention : Vous devrez choisir quelle version jouer à chaque connexion."
  
  IF instability > 90:
    SPAWN PLAYER_C AT @12,12
    SAY HERO=PLAYER_C "Et moi ? J'existe aussi maintenant."
    NARRATE "Le fork devient incontrôlable. D'autres versions commencent à apparaître..."

## === ÉPILOGUE ===
WAIT 3s

IF EXISTS(PLAYER_FUSED):
  NARRATE "Le Talisman des Échos Inversés retourne à son état dormant. Mais vous n'êtes plus le/la même."

IF EXISTS(TIMELINE_FORK):
  NARRATE "Le Dôme de la Cascade est maintenant un nexus permanent. Les échos de vos autres vous résonneront à jamais ici."

ELSE:
  NARRATE "Une seule vérité subsiste. Mais était-ce la bonne ?"

## === RÉCOMPENSES ===
GRANT ACHIEVEMENT="Les Deux Qui Parlent"
GRANT XP=5000

IF STATUS="REWRITTEN_IDENTITY":
  GRANT ITEM="Fragment du Talisman"
  GRANT TITLE="Le/La Paradoxe Vivant(e)"

IF EXISTS(TIMELINE_FORK):
  GRANT ABILITY="Vision Parallèle"
  GRANT ACCESS="Nexus des Échos"

## === FIN ===
FADE_OUT
END_SCENARIO
```

---

## 🎮 **MÉCANIQUES SPÉCIALES**

### **Instabilité Causale**
- Commence à 0
- +5 par observation
- +10 par question contradictoire
- +15 pour révélations majeures
- À 50+ : Apparition d'échos supplémentaires
- À 80+ : Effondrement imminent

### **Dialogues Dynamiques**
Les réponses changent selon :
- L'ordre des questions
- Le niveau d'instabilité
- Les observations précédentes
- La proximité des versions

### **Effets Visuels**
- Split screen lors de la divergence
- Transparence variable des échos
- Glitches textuels sur les dialogues
- Distorsions spatiales autour des paradoxes

---

## 🏆 **RÉCOMPENSES POSSIBLES**

| Fin | Récompense | Effet |
|-----|------------|-------|
| Fusion réussie | Double Mémoire | Peut voir 2 timelines simultanément |
| Collapse A | Secret de la Mallette | Connaissance interdite |
| Collapse B | Alliance de Ford | +20 réputation Ford |
| Coexistence | Vision Parallèle | Accès au Nexus des Échos |

---

## ⚠️ **AVERTISSEMENTS**

- Ce scénario peut créer des sauvegardes corrompues si mal géré
- Les forks de timeline persistent entre les sessions
- Certains choix sont irréversibles pour le personnage
- L'instabilité causale peut affecter d'autres joueurs proches

---

*"Dans le Dôme de la Cascade, même les mensonges deviennent des vérités parallèles."*