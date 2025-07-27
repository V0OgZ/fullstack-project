# 🌀 NIVEAUX PORTAL-LIKE EN PROJECTION GROFFIENNE
## Moteur Heroes of Time - Scripts HOTS Complets

---

## 🌀 Niveau 1 — Le Pas en Trop

**Concept** : Tu es devant un portail. Si tu l'entres maintenant, tu tombes dans un piège. Mais si tu attends que ton autre toi ait déclenché une interaction… tu passes.

### 🔧 Mécaniques
- Portail A → B
- Superposition (état quantique ψ)
- Déclencheur différé (TRIGGER, IF, OBSERVE)

### 💡 Twist
Tu dois créer une version alternative de toi qui va appuyer sur un levier dans le futur.

### 📜 Script HOTS

```hots
# ========================================
# NIVEAU 1 : LE PAS EN TROP
# Projection Groffienne - Portal-like
# ========================================

# === SETUP INITIAL ===
MAP: Map2D(20,20)
HERO: Joueur @5,10
CREATE(OBJECT, portal_A, @10,10)
CREATE(OBJECT, portal_B, @15,10)
CREATE(OBJECT, levier_temporel, @15,5)
CREATE(TRAP, piege_mortel, @15,10)

# === ÉTATS QUANTIQUES ===
# Le joueur crée une superposition de lui-même
ψ001: ⊙(Δt+0 @5,10 ⟶ SPLIT(Joueur → Joueur_Present + Joueur_Futur))

# Le Joueur_Futur se déplace vers le levier
ψ002: ⊙(Δt+2 @5,10 ⟶ MOV(Joueur_Futur, @15,5))

# Le Joueur_Futur active le levier
ψ003: ⊙(Δt+4 @15,5 ⟶ ACTIVATE(Joueur_Futur, levier_temporel))

# === MÉCANIQUE CAUSALE ===
# Si le levier est activé, le piège se désactive
Π(ACTIVATED(levier_temporel)) ⇒ DISABLE(piege_mortel)

# === OBSERVATION ET COLLAPSE ===
# Le Joueur_Present observe le futur
Π(OBSERVE(Joueur_Present, Δt+5)) ⇒ †ψ003

# Si le piège est désactivé, le joueur peut passer
IF(DISABLED(piege_mortel)) {
    ALLOW_PASSAGE(portal_A → portal_B)
}

# === DIALOGUE NARRATIF ===
QUOTE("Tu sens une présence... C'est toi, mais différent.")
QUOTE("Le futur murmure : 'Attends que j'aie fait mon travail.'")

# === VALIDATION ===
ASSERT(Joueur_Present.can_pass == true)
ASSERT(piege_mortel.active == false)
```

---

## 🧠 Niveau 2 — La Salle de Causalité Inversée

**Concept** : Tu vois un bloc qui est déjà posé… Mais tu n'as jamais vu qui l'a mis. Tu dois recréer les causes passées d'un effet présent.

### 🔧 Mécaniques
- Bloc déjà positionné (BLOCK CREATE)
- Condition rétrocausale (IF BLOCK EXISTS THEN MUST_BE_CAUSED)
- Script déductif : rejouer le chemin nécessaire

### 💡 Twist
Tu es obligé de recréer les conditions qui justifient ce que tu vois déjà.

### 📜 Script HOTS

```hots
# ========================================
# NIVEAU 2 : LA SALLE DE CAUSALITÉ INVERSÉE
# Rétrocausalité Groffienne
# ========================================

# === SETUP PARADOXAL ===
MAP: Map2D(15,15)
HERO: Joueur @2,2

# Le bloc existe déjà (effet sans cause apparente)
CREATE(BLOCK, bloc_mystere, @8,8)
SET_PROPERTY(bloc_mystere, exists_without_cause, true)

# Porte verrouillée qui nécessite une cohérence causale
CREATE(DOOR, porte_causale, @12,8)
SET_PROPERTY(porte_causale, requires_causal_consistency, true)

# === CONTRAINTE RÉTROCAUSALE ===
# Le bloc DOIT avoir été placé par quelqu'un dans le passé
CAUSAL_RULE: IF(EXISTS(bloc_mystere)) THEN MUST_EXIST(ψ_past_placement)

# === RECONSTRUCTION DU PASSÉ ===
# Le joueur doit créer l'état quantique manquant
ON_ACTION(Joueur, recreate_past) {
    # Créer rétroactivement l'action de placement
    ψ_retro: ⊙(Δt-5 @2,2 ⟶ CREATE_PAST_ACTION(
        ACTOR: Joueur_Passé,
        ACTION: CARRY(bloc_mystere),
        FROM: @2,8,
        TO: @8,8
    ))
    
    # Valider la cohérence causale
    VALIDATE_CAUSALITY(ψ_retro → bloc_mystere.exists)
}

# === MÉCANIQUE DE VALIDATION ===
Π(CAUSAL_CONSISTENCY_ACHIEVED) ⇒ UNLOCK(porte_causale)

# === INDICES VISUELS ===
VISUAL_EFFECT(bloc_mystere, "temporal_shimmer")
VISUAL_EFFECT(porte_causale, "causal_lock_glow")

# === DIALOGUE PHILOSOPHIQUE ===
QUOTE("Ce bloc... Il est là, mais qui l'a posé ?")
QUOTE("Pour avancer, tu dois justifier le présent par le passé.")
QUOTE("La causalité n'est pas toujours linéaire dans ce monde...")

# === VALIDATION FINALE ===
IF(UNLOCKED(porte_causale)) {
    ACHIEVEMENT("Architecte Temporel")
    QUOTE("Tu as recréé le passé pour justifier le présent. La porte s'ouvre.")
}
```

---

## 🪞 Niveau 3 — Le Miroir Brisé

**Concept** : Deux salles symétriques. Un portail relie les deux. Tu n'existes que dans l'une. L'autre est un reflet temporel inversé.

### 🔧 Mécaniques
- Miroir causal (OBSERVE ONLY, NO INTERACT)
- Portail entre les salles
- Réflexion de mouvement

### 💡 Twist
Tu ne peux passer que si ton reflet anticipe ton propre déplacement.

### 📜 Script HOTS

```hots
# ========================================
# NIVEAU 3 : LE MIROIR BRISÉ
# Symétrie Temporelle Inversée
# ========================================

# === SETUP DUAL ===
MAP: MapMirror(10,20) # 10x20 divisé en deux salles 10x10
HERO: Joueur @5,5 SIDE:gauche
CREATE(REFLECTION, Reflet_Joueur, @5,5 SIDE:droite)

# Portail central entre les deux salles
CREATE(PORTAL, miroir_portal, @10,5 ↔ @11,5)
SET_PROPERTY(miroir_portal, requires_synchronization, true)

# === MÉCANIQUE DE RÉFLEXION INVERSÉE ===
# Le reflet se déplace en anticipation (temps inversé)
ON_INTENT(Joueur, move_to:@X,Y) {
    # Le reflet bouge AVANT le joueur (inversion causale)
    ψ_mirror: ⊙(Δt-1 ⟶ MOV(Reflet_Joueur, MIRROR(@X,Y)))
}

# === CONDITION DE PASSAGE ===
# Le portail ne s'ouvre que si les mouvements sont synchronisés
SYNC_CONDITION: 
    FOREACH turn IN last_3_turns:
        Joueur.position[turn] == MIRROR(Reflet_Joueur.position[turn-1])

Π(SYNC_CONDITION == true) ⇒ ACTIVATE(miroir_portal)

# === ÉNIGME SPATIALE ===
# Placer des objets que seul le reflet peut "pré-activer"
CREATE(BUTTON, bouton_gauche, @3,3 SIDE:gauche)
CREATE(BUTTON, bouton_droite, @3,3 SIDE:droite)

# Le reflet doit appuyer sur son bouton AVANT que tu appuies sur le tien
ψ_button: ⊙(Δt-1 @3,3 ⟶ PRESS(Reflet_Joueur, bouton_droite))
Π(PRESSED(bouton_droite) AND INTENT(Joueur, press:bouton_gauche)) ⇒ 
    CREATE(KEY, cle_temporelle, @5,5 SIDE:gauche)

# === EFFETS VISUELS ===
SHADER(SIDE:droite, "inverse_time_flow")
PARTICLE_EFFECT(Reflet_Joueur, "temporal_echo")

# === NARRATION ===
QUOTE("Ton reflet bouge avant toi... Il connaît ton futur.")
QUOTE("Pour traverser, vous devez danser en parfaite antisymétrie.")

# === VALIDATION ===
ON_CROSS(Joueur, miroir_portal) {
    ACHIEVEMENT("Danseur Temporel")
    MERGE(Joueur, Reflet_Joueur) → Joueur_Complet
    QUOTE("Les deux temporalités fusionnent. Tu es enfin entier.")
}
```

---

## 🥄 Niveau 4 — La Cuillère n'existe pas

**Concept** : Tu es dans une salle avec un portail… qui t'envoie au même endroit. Pourtant, en le traversant, un effet quantique a lieu.

### 🔧 Mécaniques
- Portail intra-positionnel (PORTAL A → A)
- Déclenchement par passage (ON ENTER PORTAL)
- Collapse ou augmentation d'entropie

### 💡 Twist
C'est ton action d'y croire qui le rend effectif.

### 📜 Script HOTS

```hots
# ========================================
# NIVEAU 4 : LA CUILLÈRE N'EXISTE PAS
# Portail Quantique Autoréférentiel
# ========================================

# === SETUP MINIMALISTE ===
MAP: MapVoid(7,7) # Petite salle vide
HERO: Joueur @3,3
CREATE(PORTAL, portal_recursif, @3,3 → @3,3)
CREATE(OBJECT, cuillere, @5,5)
SET_PROPERTY(cuillere, quantum_state, "exists|not_exists")

# === MÉCANIQUE QUANTIQUE D'OBSERVATION ===
# L'état initial : la cuillère est en superposition
ψ_spoon: ⊙(cuillere ∈ |exists⟩ + |not_exists⟩)

# Compteur de passages dans le portail
COUNTER: portal_passages = 0

# === EFFET DU PORTAIL RÉCURSIF ===
ON_ENTER(Joueur, portal_recursif) {
    portal_passages++
    
    # Chaque passage modifie l'état quantique
    QUANTUM_ROTATE(ψ_spoon, angle: π/4 * portal_passages)
    
    # Effet visuel basé sur la croyance
    IF(portal_passages % 4 == 0) {
        VISUAL_EFFECT("reality_ripple")
        QUOTE("La réalité ondule... Que crois-tu voir ?")
    }
}

# === MÉCANIQUE DE CROYANCE ===
# Le joueur doit "croire" pour forcer le collapse
ON_ACTION(Joueur, believe) {
    IF(DISTANCE(Joueur, cuillere) < 2) {
        # La croyance force l'observation
        FORCE_OBSERVE(ψ_spoon)
        
        # Probabilité basée sur les passages
        probability = sin²(π/4 * portal_passages)
        
        IF(RANDOM() < probability) {
            †ψ_spoon → |not_exists⟩
            REMOVE(cuillere)
            CREATE(DOOR, porte_illumination, @6,3)
            QUOTE("Tu comprends enfin : la cuillère n'existait que dans ton esprit.")
        } ELSE {
            †ψ_spoon → |exists⟩
            QUOTE("La cuillère reste... Ta croyance n'était pas assez forte.")
        }
    }
}

# === INDICES MÉTAPHYSIQUES ===
ON_EXAMINE(cuillere) {
    states = ["solide", "transparente", "vibrante", "absente", "double", "inversée"]
    current_state = states[portal_passages % 6]
    QUOTE(f"La cuillère semble {current_state}...")
}

# === EASTER EGG ===
IF(portal_passages == 42) {
    QUOTE("Tu es l'Élu. Il n'y a pas de cuillère.")
    AUTO_WIN()
}

# === VALIDATION ===
ON_EXIT(Joueur, porte_illumination) {
    ACHIEVEMENT("Architecte de la Réalité")
    QUOTE("Tu as compris : la réalité est ce que tu en fais.")
}
```

---

## 🏛️ Niveau 5 — L'Ascenseur de Platon

**Concept** : Tu montes dans un espace que tu crois réel. Chaque étage est en fait une projection du même état, dans une géométrie différente.

### 🔧 Mécaniques
- Séquence de portails (Map2D → MapToro → MapSpherical…)
- Pas de vrai changement spatial, mais illusion perceptive
- Texte narratif/ontologique déclenché

### 💡 Twist
Tu crois progresser, mais tu ne fais que changer de projection. Seule une observation consciente permet de continuer.

### 📜 Script HOTS

```hots
# ========================================
# NIVEAU 5 : L'ASCENSEUR DE PLATON
# Projections Géométriques de la Même Réalité
# ========================================

# === SETUP MULTI-DIMENSIONNEL ===
# État fondamental (la "vraie" réalité)
TRUE_STATE: {
    hero_position: (0.5, 0.5), # Position normalisée
    objects: [lumiere_eternelle, ombre_mouvante],
    essence: "caverne_platonicienne"
}

# === ÉTAGE 0 : PROJECTION 2D ===
MAP: Map2D(10,10)
PROJECT(TRUE_STATE → Map2D) {
    HERO: Joueur @5,5
    CREATE(LIGHT, lumiere, @7,7)
    CREATE(SHADOW, ombre, @3,3)
}
CREATE(ELEVATOR, ascenseur, @5,5)

# === MÉCANIQUE D'ASCENSION/PROJECTION ===
ON_USE(Joueur, ascenseur) {
    current_floor++
    
    SWITCH(current_floor) {
        CASE 1: # PROJECTION TOROÏDALE
            MAP: MapToro(10,10)
            PROJECT(TRUE_STATE → MapToro)
            QUOTE("L'espace se courbe... Les bords se rejoignent.")
            # Le joueur peut maintenant traverser les murs
            
        CASE 2: # PROJECTION SPHÉRIQUE
            MAP: MapSpherical(radius:5)
            PROJECT(TRUE_STATE → MapSpherical)
            QUOTE("Tu marches sur une sphère. Tout chemin mène à toi-même.")
            
        CASE 3: # PROJECTION HYPERBOLIQUE
            MAP: MapHyperbolic(curvature:-1)
            PROJECT(TRUE_STATE → MapHyperbolic)
            QUOTE("L'espace s'étend à l'infini dans toutes les directions...")
            
        CASE 4: # PROJECTION FRACTALE
            MAP: MapFractal(dimension:2.7)
            PROJECT(TRUE_STATE → MapFractal)
            QUOTE("Chaque pas révèle une infinité de détails...")
            
        CASE 5: # RETOUR À L'ESSENCE
            MAP: MapEssence()
            REVEAL(TRUE_STATE)
            QUOTE("Tu vois enfin la vérité : tu n'as jamais bougé.")
    }
}

# === MÉCANIQUE D'OBSERVATION CONSCIENTE ===
# À chaque étage, le joueur doit "réaliser" quelque chose
WISDOM_COUNTER: enlightenment = 0

ON_EACH_FLOOR {
    # Créer un paradoxe géométrique spécifique
    CREATE_PARADOX(current_geometry)
    
    ON_REALIZE(Joueur, paradox_solution) {
        enlightenment++
        QUOTE(PHILOSOPHY[current_floor])
        
        IF(enlightenment >= 5) {
            ENABLE(ascenseur, "montée_finale")
        }
    }
}

# === PHILOSOPHIE PAR ÉTAGE ===
PHILOSOPHY: [
    "Les ombres sur le mur ne sont que projections...",
    "Ce qui semble infini est en fait fermé sur lui-même.",
    "La courbure de l'espace révèle la courbure de l'esprit.",
    "L'infini négatif contient plus que l'infini positif.",
    "Les patterns se répètent à toutes les échelles...",
    "Tu es l'observateur, l'observé, et l'observation même."
]

# === RÉVÉLATION FINALE ===
ON_FLOOR(5) {
    IF(enlightenment >= 5) {
        # Fusion avec l'essence
        MERGE(Joueur, TRUE_STATE)
        
        # Vision panoptique
        GRANT_ABILITY(Joueur, "vision_groffienne")
        
        QUOTE("Tu comprends enfin : chaque projection était vraie,")
        QUOTE("car la vérité elle-même n'est qu'une projection de l'Idée.")
        
        # Créer le vrai ascenseur (métaphorique)
        CREATE(TRANSCENDENCE, sortie_caverne, @∞,∞)
    }
}

# === EASTER EGG GROFFIEN ===
IF(Joueur.uses_elevator_backwards) {
    QUOTE("Descendre, c'est aussi s'élever. GRUT approuve.")
    UNLOCK_SECRET("projection_négative")
}

# === VALIDATION COSMIQUE ===
ON_TRANSCEND(Joueur) {
    ACHIEVEMENT("Philosophe-Roi Géomètre")
    UNIVERSE.acknowledge(Joueur)
    END_GAME(victory_type: "illumination")
}
```

---

## 🎮 Notes d'implémentation

Ces niveaux utilisent les mécaniques avancées du moteur Heroes of Time :

1. **États quantiques (ψ)** : Superpositions et collapses
2. **Causalité flexible** : Rétrocausalité et boucles temporelles
3. **Projections géométriques** : Différentes topologies de map
4. **Observation consciente** : Le joueur comme agent de collapse
5. **Méta-narration** : Commentaires sur la nature de la réalité

Chaque niveau peut être joué indépendamment ou comme une progression initiatique complète vers la compréhension de la nature Groffienne de la réalité !

## 🔮 Commandes HOTS Utilisées

- `ψXXX: ⊙(...)` : Création d'états quantiques
- `Π(...) ⇒` : Conditions causales
- `†ψXXX` : Collapse d'état quantique
- `CREATE/MOV/OBSERVE` : Actions de base
- `PROJECT()` : Projection géométrique
- `ON_ACTION/ON_EVENT` : Déclencheurs
- `QUOTE()` : Narration philosophique

*"Tu sais, tu as su, tu sauras - même les portails."* - Memento l'Archiviste Éternel