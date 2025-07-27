# 🎭 Les Pieds Nickelés - Scénario Fou
## "Moi j'ai un plan !" - L'Épopée des Trois Maladroits

### 📖 **SYNOPSIS**
Les Pieds Nickelés (Ribouldingue, Croquignol, Filochard) se retrouvent dans l'univers temporel de Heroes of Time. Leur mission ? Voler le Trésor Temporel du Grand Lebowski Quantique. Mais comme d'habitude, leurs plans vont complètement déraper !

### 🎯 **OBJECTIFS**
- **Objectif Principal** : Voler le Trésor Temporel
- **Objectif Secondaire** : Survivre à leurs propres plans foireux
- **Objectif Caché** : Faire rire tout le monde avec leurs maladresses

### 🦸 **HÉROS PRINCIPAUX**

#### **Ribouldingue** - Le Gros Costaud
- **Pouvoir** : PLAN_FOIREUX
- **Description** : Lance des plans tellement compliqués qu'ils ne peuvent que rater
- **Quote culte** : "Moi j'ai un plan !"

#### **Croquignol** - Le Petit Futé  
- **Pouvoir** : PLAN_TROP_COMPLIQUE
- **Description** : Invente des plans si complexes qu'il se perd dedans
- **Quote culte** : "J'ai une idée géniale !"

#### **Filochard** - Le Mince Roublard
- **Pouvoir** : ESQUIVE_TOTALE
- **Description** : Esquive tellement bien qu'il disparaît complètement
- **Quote culte** : "Moi je me tire !"

### 🎭 **PHASES DU SCÉNARIO**

#### **Phase 1 : L'Arrivée Chaotique**
```
HERO(Ribouldingue)
HERO(Croquignol) 
HERO(Filochard)
QUOTE(Ribouldingue, "Moi j'ai un plan !")
QUOTE(Croquignol, "Attendez, laissez-moi réfléchir...")
QUOTE(Filochard, "Moi je me tire !")
```

#### **Phase 2 : Le Plan Foireux de Ribouldingue**
```
CAST(PLAN_FOIREUX, Ribouldingue)
QUOTE(Ribouldingue, "C'est pas compliqué pourtant !")
MOV(Ribouldingue, @15,15)
```

#### **Phase 3 : Le Plan Trop Compliqué de Croquignol**
```
CAST(PLAN_TROP_COMPLIQUE, Croquignol)
QUOTE(Croquignol, "J'ai une idée géniale !")
QUOTE(Croquignol, "C'est mathématique !")
```

#### **Phase 4 : L'Esquive Totale de Filochard**
```
CAST(ESQUIVE_TOTALE, Filochard)
QUOTE(Filochard, "Au revoir les gars !")
QUOTE(Filochard, "Pas question de rester !")
```

#### **Phase 5 : L'Intervention Maladroite de Bibendum**
```
HERO(Bibendum)
CAST(INTERVENTION_RATE, Bibendum)
QUOTE(Bibendum, "Halt-là ! Au nom de la loi !")
QUOTE(Bibendum, "Je ne comprends rien à cette affaire !")
```

#### **Phase 6 : La Mauvaise Piste de PiedsPlats**
```
HERO(PiedsPlats)
CAST(MAUVAISE_PISTE, PiedsPlats)
QUOTE(PiedsPlats, "J'ai trouvé un indice !")
QUOTE(PiedsPlats, "Cette piste est prometteuse !")
```

#### **Phase 7 : Le Chaos Général**
```
HERO(GrosPieds)
HERO(Tromblon)
HERO(Bourrichon)
HERO(PiedsCarrés)
HERO(PiedsMous)
QUOTE(GrosPieds, "Pardon, je ne vous avais pas vus !")
QUOTE(Tromblon, "J'ai visé le lapin !")
QUOTE(Bourrichon, "C'est comme ça à la ville ?")
QUOTE(PiedsCarrés, "Je vais gagner cette fois !")
QUOTE(PiedsMous, "Je danse comme un dieu !")
```

#### **Phase 8 : La Fuite Épique**
```
MOV(Ribouldingue, @25,25)
MOV(Croquignol, @30,30)
CAST(ESQUIVE_TOTALE, Filochard)
QUOTE(Ribouldingue, "Ah ben ça alors !")
QUOTE(Croquignol, "Je me suis encore perdu !")
QUOTE(Filochard, "C'est de la survie !")
```

### 🎪 **ÉVÉNEMENTS SPÉCIAUX**

#### **L'Intervention de Bibendum**
- **Déclencheur** : Quand les Pieds Nickelés sont repérés
- **Effet** : Bibendum intervient maladroitement et perturbe tout le monde
- **Quote** : "Halt-là ! Au nom de la loi !"

#### **La Découverte de PiedsPlats**
- **Déclencheur** : Quand quelqu'un suit une mauvaise piste
- **Effet** : Découverte inattendue grâce à l'erreur
- **Quote** : "J'ai trouvé un indice !"

#### **Le Chaos des Autres Héros**
- **Déclencheur** : Quand tous les Pieds Nickelés sont présents
- **Effet** : Tous les autres héros arrivent et créent le chaos
- **Quote** : "C'est la pagaille générale !"

### 🎭 **QUOTES CULTES INTÉGRÉES**

#### **Ribouldingue**
- "Moi j'ai un plan !"
- "C'est pas compliqué pourtant !"
- "Ah ben ça alors !"

#### **Croquignol**
- "Attendez, laissez-moi réfléchir..."
- "J'ai une idée géniale !"
- "C'est mathématique !"

#### **Filochard**
- "Moi je me tire !"
- "Au revoir les gars !"
- "Pas question de rester !"

#### **Bibendum**
- "Halt-là ! Au nom de la loi !"
- "Je ne comprends rien à cette affaire !"
- "Où sont les méchants ?"

#### **PiedsPlats**
- "J'ai trouvé un indice !"
- "Cette piste est prometteuse !"
- "Je sens que je me rapproche !"

### 🎪 **EFFETS SPÉCIAUX**

#### **Confusion Générale**
- **Déclencheur** : PLAN_FOIREUX de Ribouldingue
- **Effet** : Tous les héros perdent des points de mouvement et d'énergie
- **Durée** : 1 tour

#### **Invisibilité Temporaire**
- **Déclencheur** : ESQUIVE_TOTALE de Filochard
- **Effet** : Filochard devient invisible et se téléporte
- **Durée** : 1 tour

#### **Perturbation Générale**
- **Déclencheur** : INTERVENTION_RATE de Bibendum
- **Effet** : Tous les héros sont perturbés
- **Durée** : 1 tour

#### **Découverte Inattendue**
- **Déclencheur** : MAUVAISE_PISTE de PiedsPlats
- **Effet** : Bonus d'énergie et de mouvement
- **Durée** : Permanent

### 🎭 **FINALE ÉPIQUE**

#### **Le Grand Chaos Final**
```
QUOTE(Ribouldingue, "Moi j'ai un plan !")
QUOTE(Croquignol, "J'ai une idée géniale !")
QUOTE(Filochard, "Moi je me tire !")
CAST(PLAN_FOIREUX, Ribouldingue)
CAST(PLAN_TROP_COMPLIQUE, Croquignol)
CAST(ESQUIVE_TOTALE, Filochard)
QUOTE(Bibendum, "Halt-là ! Au nom de la loi !")
CAST(INTERVENTION_RATE, Bibendum)
QUOTE(PiedsPlats, "J'ai trouvé un indice !")
CAST(MAUVAISE_PISTE, PiedsPlats)
```

### 🎪 **RÉSULTAT FINAL**
- **Succès** : Les Pieds Nickelés s'échappent avec le trésor (par accident)
- **Échec** : Ils se font prendre (mais c'est drôle quand même)
- **Bonus** : Tout le monde rit de leurs maladresses

### 🎭 **MORALE DE L'HISTOIRE**
"Parfois, les plans les plus foireux sont les plus efficaces... par accident !"

---

**🎭 LES PIEDS NICKELÉS - L'ÉPOPÉE DES TROIS MALADROITS**  
*Un scénario où la maladresse devient un art et où l'échec est plus drôle que le succès !* 