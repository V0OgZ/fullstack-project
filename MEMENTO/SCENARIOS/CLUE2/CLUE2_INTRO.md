# 🎲 CLUE² - LE SOUPÇON AU-DELÀ DU MUR

*"Quelqu'un a appelé OmegaZero. Quelqu'un ment. Et quelqu'un n'a jamais existé."*

---

## 🌀 **CONCEPT**

CLUE² est une mini-campagne méta-narrative qui se joue en dehors du scénario principal. C'est un Cluedo spatio-temporel où les joueurs doivent découvrir qui a provoqué l'Appel d'OmegaZero en recoupant des informations contradictoires à travers plusieurs timelines superposées.

---

## 🎭 **UNIVERS DE CLUE²**

### **Accès**
- Un portail s'ouvre dans la Tour d'Ancrage
- Commande : `ENTER(PORTAL, CLUE2_INSTANCE)`
- Le joueur est projeté dans une réalité dédiée

### **Géométrie**
L'univers CLUE² peut prendre plusieurs formes selon l'instance :
- **Table Hexagonale** : Vue top-down classique
- **Spirale Temporelle** : Les suspects bougent dans le temps
- **Sphère Causale** : Navigation 3D entre les indices

### **Règles Modifiées**
- Mémoires floutées pour tous les personnages
- Artefacts bloqués (sauf indices)
- Certains personnages en boucle de script
- La mallette de Vince reste fermée (comme toujours)

---

## 🧑‍⚖️ **LES SUSPECTS**

### **La Table des Six**

| Suspect | Classe | Particularité | Indice Clé |
|---------|--------|---------------|------------|
| **Vince Vega** | Architect | Refuse d'ouvrir la mallette | "Je transportais quelque chose ce jour-là" |
| **Jean-Grofignon** | Dreamer | Se contredit entre timelines | "Dans mon rêve, le coupable me ressemble" |
| **Ford** | Architect | Ne regarde jamais le joueur | "J'observe les contradictions" |
| **Anna** | Scribe | Lit des logs invisibles | "Il y a un log d'avant la création" |
| **Axis** | Temporal | Dit être "hors de l'affaire" | "Je connais toutes les scènes" |
| **Le Joueur** | ??? | Aucune preuve, aucune mémoire | Vous |

---

## 🗺️ **LA SALLE D'INTERROGATOIRE**

```
        [AXIS]
    /           \
[ANNA]         [FORD]
    \           /
     [MALLETTE]
    /           \
[VINCE]      [JEAN]
    \           /
      [JOUEUR]
```

### **Éléments Centraux**
- **La Mallette** : Au centre, fermée, pulse d'une lueur dorée
- **Les Logs Flottants** : Des fragments de code apparaissent et disparaissent
- **L'Horloge Brisée** : Indique plusieurs temps simultanément
- **Le Miroir Sans Reflet** : Ne reflète que les mensonges

---

## 🎯 **OBJECTIF**

### **Mission Principale**
Découvrir qui a provoqué l'Appel d'OmegaZero avant que la réalité ne s'effondre.

### **Indices à Collecter**
1. **Traces Temporelles** : Qui était où/quand
2. **Contradictions** : Les mensonges révèlent la vérité
3. **Logs Cachés** : Anna peut les voir, mais ment-elle ?
4. **États Superposés** : Un suspect existe dans plusieurs états

### **Révélation Finale**
L'un des suspects n'existe pas vraiment. L'identifier est la clé.

---

## 🌊 **MÉCANIQUES SPÉCIALES**

### **Superposition Narrative**
Chaque personnage peut dire des choses contradictoires :
- **Timeline A** : "J'étais avec Ford"
- **Timeline B** : "Ford n'existe pas"
- **Timeline C** : "Nous sommes tous Ford"

### **Effondrement par Observation**
Observer trop longtemps un suspect peut :
- Fixer sa version de l'histoire
- Effacer d'autres possibilités
- Révéler qu'il n'existe pas

### **La Règle du 50-50**
Si le joueur possède l'artefact 50-50 :
- Toutes les accusations ont 50% de chance d'être vraies
- Mais aussi 50% de faire disparaître l'accusé
- Utilisation unique et irréversible

---

## 🎬 **SCÈNE D'OUVERTURE**

```hots
## PORTAIL D'ENTRÉE
NARRATE "La Tour d'Ancrage vibre. Un portail s'ouvre, différent des autres."
NARRATE "Des échos de voix familières s'en échappent, déformées, contradictoires."

SAY HERO=MEMENTO "Ce portail... il mène vers quelque chose qui n'aurait jamais dû exister."
SAY HERO=PLAYER "Qu'est-ce que CLUE² ?"
SAY HERO=MEMENTO "Un endroit où la vérité et le mensonge sont identiques. Où quelqu'un a appelé OmegaZero."

CHOICE [
  "Entrer dans CLUE²",
  "Demander plus d'informations",
  "Refuser et partir"
]

IF CHOICE=1 THEN
  WARP PLAYER TO=CLUE2_INSTANCE
  NARRATE "Vous franchissez le seuil. La réalité se plie."
ENDIF
```

---

## ⚠️ **AVERTISSEMENTS**

1. **Sauvegarde Impossible** : CLUE² ne permet pas les sauvegardes
2. **Une Seule Chance** : Accuser le mauvais suspect a des conséquences
3. **Paradoxes Permanents** : Les révélations peuvent affecter le jeu principal
4. **La Vérité Fait Mal** : Découvrir qui vous êtes vraiment

---

## 🔚 **FINS POSSIBLES**

| Condition | Résultat |
|-----------|----------|
| Accuser le bon suspect avec preuves | OmegaZero s'effondre, CLUE² se ferme |
| Accuser le mauvais suspect | Le joueur devient le prochain suspect |
| Ne rien faire trop longtemps | Le monde s'effondre, Vince disparaît |
| Observer tous les logs sans accuser | Révélation : le joueur EST OmegaZero |

---

*"Dans CLUE², personne n'est innocent. Même pas vous."*

**→ Continuer vers** : [CLUE2_GAMEPLAY.md](CLUE2_GAMEPLAY.md)