# 🎮 CLUE² - MÉCANIQUES DE JEU

*Guide technique pour naviguer dans le Cluedo spatio-temporel*

---

## 🎯 **COMMANDES DISPONIBLES**

### **Commandes d'Investigation**

```hots
OBSERVE <HERO>
# Examine un suspect et révèle ses traces temporelles
# Attention : Observer trop longtemps peut fixer leur état

ASK <HERO> ABOUT <EVENT>
# Interroge un suspect sur un événement spécifique
# Les réponses varient selon la timeline active

EXAMINE <OBJECT>
# Inspecte un objet dans la salle
# Objets disponibles : MALLETTE, LOGS, HORLOGE, MIROIR

REWIND TO <POINT>
# Revient à un point antérieur de l'interrogatoire
# Coût : 1 Charge Temporelle (max 3)
```

### **Commandes d'Accusation**

```hots
ACCUSE <HERO> OF <CRIME>
# Accuse formellement un suspect
# IRREVERSIBLE - Réfléchissez bien !

PRESENT <EVIDENCE> TO <HERO>
# Confronte un suspect avec une preuve
# Peut déclencher des révélations ou des mensonges

COLLAPSE <TIMELINE>
# Force l'effondrement d'une timeline contradictoire
# Dangereux : peut effacer des suspects
```

---

## 🔍 **SYSTÈME D'INDICES**

### **Types d'Indices**

1. **Traces Temporelles** 🕐
   - Empreintes laissées dans différentes timelines
   - Visibles avec `OBSERVE`
   - Peuvent se contredire entre elles

2. **Logs Fantômes** 📜
   - Fragments de code qui apparaissent/disparaissent
   - Anna peut les lire... ou prétend le pouvoir
   - Certains datent d'avant la création du jeu

3. **Contradictions** ⚡
   - Quand deux témoignages s'opposent
   - La vérité est souvent entre les deux
   - Ou aucun des deux n'est vrai

4. **États Superposés** 🌀
   - Un suspect dans plusieurs états simultanés
   - Exemple : Ford vivant ET mort
   - L'observation force un état

### **Collecte d'Indices**

```hots
## Exemple de séquence d'investigation
OBSERVE VINCE
> "Traces temporelles : Présent à T-5, T-2, absent à T-0"

ASK VINCE ABOUT MALLETTE
> Timeline A : "Je ne l'ai jamais vue"
> Timeline B : "Elle est à moi depuis toujours"
> Timeline C : "Quelle mallette ?"

EXAMINE LOGS
> "Log corrompu : USER_OMEGAZERO accessed system at T-NULL"
```

---

## 🎭 **COMPORTEMENTS DES SUSPECTS**

### **Vince Vega**
- **Pattern** : Nie tout, sauf la mallette qu'il "protège"
- **Contradiction** : Dit ne pas connaître OmegaZero mais a ses logs
- **Indice Caché** : La mallette pulse quand il ment

### **Jean-Grofignon**
- **Pattern** : Ses réponses changent selon qui l'interroge
- **Contradiction** : Se souvient avoir créé ET détruit OmegaZero
- **Indice Caché** : Parfois, il n'est qu'une projection

### **Ford**
- **Pattern** : Parle en énigmes, évite le contact visuel
- **Contradiction** : Observer tout en étant non-observable
- **Indice Caché** : Son reflet dans le miroir montre autre chose

### **Anna**
- **Pattern** : Cite des logs que personne d'autre ne voit
- **Contradiction** : Les logs changent à chaque lecture
- **Indice Caché** : Peut-être qu'elle invente les logs

### **Axis**
- **Pattern** : Prétend être "au-dessus" de l'enquête
- **Contradiction** : Connaît des détails qu'il ne devrait pas
- **Indice Caché** : Ses tatouages changent selon les accusations

---

## 🌀 **MÉCANIQUES AVANCÉES**

### **Superposition de Témoignages**

Quand plusieurs suspects donnent des versions contradictoires :

```
VINCE : "J'étais avec Ford à T-3"
FORD : "Je n'ai jamais rencontré Vince"
ANNA : "Ils étaient tous les deux dans les logs"
```

**Résolution** : 
- Soit l'un ment
- Soit ils parlent de timelines différentes
- Soit l'un d'eux n'existe pas

### **Paradoxe d'Existence**

Certains suspects peuvent ne pas exister :
- Leurs réponses sont incohérentes
- Ils disparaissent quand observés directement
- D'autres suspects ne se souviennent pas d'eux

**Test d'Existence** :
```hots
OBSERVE <SUSPECT> DURATION=LONG
IF suspect.flickers THEN
  suspect.existence = UNCERTAIN
ENDIF
```

### **La Règle du Miroir**

Le Miroir Sans Reflet révèle :
- Les mensonges (reflet inversé)
- Les non-existants (pas de reflet)
- Les coupables (reflet multiple)

```hots
EXAMINE MIROIR WHILE OBSERVING <SUSPECT>
```

---

## 📊 **SYSTÈME DE SCORING**

### **Points d'Investigation**

| Action | Points |
|--------|--------|
| Découvrir une contradiction | +10 |
| Révéler un état superposé | +15 |
| Identifier un non-existant | +25 |
| Accusation correcte | +100 |
| Accusation incorrecte | -50 |

### **Charges Temporelles**

Vous commencez avec 3 Charges :
- `REWIND` : -1 Charge
- Observer trop longtemps : -1 Charge
- Effondrer une timeline : -2 Charges

À 0 Charge : Fin forcée de l'enquête

---

## 🎲 **UTILISATION DU 50-50**

Si vous possédez l'artefact :

```hots
USE ARTIFACT=50-50 ON ACCUSATION
# Résultat : 50% correct, 50% catastrophe

POSSIBLE OUTCOMES:
- Accusation vraie → Victoire
- Accusation fausse → Vous devenez suspect
- Suspect disparaît → Enquête compromise
- Réalité s'inverse → Le coupable change
```

**⚠️ USAGE UNIQUE**

---

## 🔚 **CONDITIONS DE VICTOIRE**

### **Victoire Parfaite**
1. Identifier le vrai coupable
2. Prouver qu'un suspect n'existe pas
3. Comprendre pourquoi OmegaZero fut appelé
4. Garder au moins 1 Charge Temporelle

### **Victoire Partielle**
- Identifier le coupable sans toutes les preuves
- Ou prouver l'inexistence sans trouver le coupable

### **Échec**
- Accuser le mauvais suspect
- Épuiser toutes les Charges
- Laisser le temps s'écouler

---

## 💡 **CONSEILS STRATÉGIQUES**

1. **Commencez par observer** sans interagir
2. **Notez les contradictions** entre timelines
3. **Le miroir ne ment jamais** (mais peut tromper)
4. **Méfiez-vous des évidences** trop claires
5. **Un suspect qui évite les questions** cache quelque chose
6. **L'absence de preuve** peut être une preuve

---

*"Dans CLUE², la vérité n'est qu'une possibilité parmi d'autres."*

**→ Continuer vers** : [CLUE2_DIALOGUES.md](CLUE2_DIALOGUES.md)