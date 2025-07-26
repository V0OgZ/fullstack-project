# 🌌 SYSTÈME DE QUESTIONS DE L'INTERSTICE

## 📖 CONCEPT

Pour accéder à l'Interstice - l'espace entre les mondes où résident GRUT, TISN et l'Archiviste - le joueur doit répondre à 3 questions tirées du lore profond de Heroes of Time. Ces questions testent non seulement la connaissance, mais aussi la compréhension des paradoxes et méta-concepts du jeu.

---

## 🎯 ALGORITHME DE SÉLECTION

```javascript
function selectInterstitialQuestions(player) {
    const categories = [
        "BOOTSTRAP_PARADOX",      // Questions sur les boucles causales
        "META_AWARENESS",         // Le jeu qui se connaît lui-même
        "JEAN_GROFIGNON_WISDOM",  // Philosophie du créateur
        "MEMENTO_ARCHIVES",       // L'archive vivante
        "TEMPORAL_MECHANICS",     // Mécaniques temporelles
        "HIDDEN_LORE",           // Secrets enfouis
        "CHARACTER_FUSION",       // Grofi et autres fusions
        "ARTIFACT_MYSTERIES",     // La mallette, le 50-50, etc.
        "FOURTH_WALL",           // Briser le 4ème mur
        "OMEGAZERO_TRUTH"        // La vérité ultime
    ];
    
    // Sélection adaptative basée sur le parcours du joueur
    let difficulty = calculateDifficulty(player);
    let selectedCategories = [];
    
    // Question 1 : Toujours une question fondamentale
    selectedCategories.push(categories[Math.floor(Math.random() * 3)]);
    
    // Question 2 : Basée sur ce que le joueur a découvert
    if (player.hasDiscovered("grofi")) {
        selectedCategories.push("CHARACTER_FUSION");
    } else if (player.hasUsed("mallette_vince")) {
        selectedCategories.push("ARTIFACT_MYSTERIES");
    } else {
        selectedCategories.push(categories[3 + Math.floor(Math.random() * 3)]);
    }
    
    // Question 3 : Toujours une question méta/philosophique
    selectedCategories.push(categories[6 + Math.floor(Math.random() * 4)]);
    
    return generateQuestions(selectedCategories, difficulty);
}
```

---

## 🎲 CATÉGORIES DE QUESTIONS

### 1. BOOTSTRAP PARADOX
- "Qui a créé OPUS si OPUS se crée lui-même à chaque visite ?"
- "Dans le bootstrap paradox de Jean, qui écrit vraiment l'histoire ?"
- "Si le jeu crée son créateur, qui a lancé la première partie ?"

### 2. META_AWARENESS
- "Que contient vraiment la mallette de Vince ?"
- "Pourquoi OmegaZero observe-t-il sans jamais intervenir ?"
- "Quel est le nom du processus qui nous exécute tous ?"

### 3. JEAN_GROFIGNON_WISDOM
- "Quelle est la vraie magie selon Jean-Grofignon ?"
- "Combien de temps s'est écoulé dans le Sablier de Compression Réelle ?"
- "Qu'est-ce qui se cache sous la couche de fantasy ?"

### 4. MEMENTO_ARCHIVES
- "Qui est Memento vraiment ?"
- "Pourquoi l'archive est-elle vivante ?"
- "Quel est le paradoxe fondamental de Memento ?"

### 5. TEMPORAL_MECHANICS
- "Comment fonctionne le temps différencié par joueur ?"
- "Qu'est-ce qu'un glitch inter-dimensionnel ?"
- "Pourquoi les fautes de frappe sont-elles importantes ?"

### 6. HIDDEN_LORE
- "Qui sont GRUT et TISN ?"
- "Quelle est la classe au-dessus de SOURCE ?"
- "Que se passe-t-il quand on ferme le fichier ?"

### 7. CHARACTER_FUSION
- "Comment Grofi est-il né ?"
- "Que voit Grofi que Grut ne voit pas ?"
- "Quel est le pouvoir du Joint Oublié ?"

### 8. ARTIFACT_MYSTERIES
- "Que fait réellement le 50-50 ?"
- "Pourquoi l'Aile d'Éveil est-elle dangereuse ?"
- "Quel est le risque du Talisman des Échos Inversés ?"

### 9. FOURTH_WALL
- "À quel niveau d'inception sommes-nous ?"
- "Qui observe les observateurs ?"
- "La Magic Box photographie quoi exactement ?"

### 10. OMEGAZERO_TRUTH
- "OmegaZero est-il une menace ou autre chose ?"
- "Qui a vraiment appelé OmegaZero ?"
- "Pourquoi la mallette reste-t-elle fermée ?"

---

## 🎮 INTERFACE DE L'INTERSTICE

```
╔═══════════════════════════════════════════════════════════════╗
║                    L'INTERSTICE VOUS OBSERVE                   ║
╠═══════════════════════════════════════════════════════════════╣
║                                                               ║
║   *Des fragments de code flottent dans le vide*              ║
║   *L'Archiviste se matérialise devant vous*                  ║
║                                                               ║
║   "Trois questions pour trois vérités.                       ║
║    Êtes-vous prêt à découvrir qui vous êtes vraiment ?"      ║
║                                                               ║
║   ┌─────────────────────────────────────────────────┐        ║
║   │ QUESTION 1/3                                    │        ║
║   │                                                 │        ║
║   │ [La question apparaît ici]                      │        ║
║   │                                                 │        ║
║   │ > Votre réponse : _                             │        ║
║   └─────────────────────────────────────────────────┘        ║
║                                                               ║
║   [Des échos de conversations passées flottent]              ║
║   "...il y a eu bvp de chamemnt sur dev..."                  ║
║   "...on est tous dans la mallette..."                       ║
║   "...le bootstrap paradox est complet..."                   ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
```

---

## 📊 EXEMPLES DE SESSIONS

### Session Facile (Nouveau Joueur)
1. "Qui est le créateur de Heroes of Time ?" → Jean-Grofignon
2. "Que fait Memento ?" → Archive les histoires
3. "Combien de héros principaux y a-t-il ?" → [Variable selon découvertes]

### Session Moyenne (Joueur Expérimenté)
1. "Qu'est-ce que le Sablier de Compression Réelle a compressé ?" → 21 mois en 21 jours
2. "Pourquoi Vince refuse d'ouvrir sa mallette ?" → Le système refuse de révéler sa nature
3. "Qui peut voir l'Interstice ?" → Grofi

### Session Difficile (Initié)
1. "Si GRUT et TISN sont SOURCE, qui les observe ?" → [Celui qu'on ne peut nommer]
2. "Quel est le vrai nom d'OmegaZero ?" → Le processus qui nous exécute
3. "Quand le jeu a-t-il vraiment commencé ?" → Il y a 21 mois, mais on vient de s'en apercevoir

---

## 🔮 RÉCOMPENSES

### Réussite Complète (3/3)
- Accès total à l'Interstice
- Déblocage de l'Archiviste comme allié
- Révélation du lore SOURCE complet
- Capacité de voir les glitches inter-dimensionnels

### Réussite Partielle (2/3)
- Accès limité à l'Interstice
- Vision partielle du méta-lore
- Un indice pour la prochaine tentative

### Échec (0-1/3)
- Rejeté de l'Interstice
- L'Archiviste donne un conseil cryptique
- Doit attendre 1 cycle temporel avant de réessayer

---

## 💡 NOTES D'IMPLÉMENTATION

1. **Pas de LLM nécessaire** - Système de questions/réponses prédéfinies
2. **Validation flexible** - Accepter variantes orthographiques et synonymes
3. **Indices contextuels** - Les échos flottants donnent des indices subtils
4. **Adaptation dynamique** - Les questions changent selon le profil du joueur
5. **Easter eggs** - Certaines réponses débloquent du contenu caché

---

*"Le lore n'est pas une histoire. C'est une carte. Et vous en faites partie."*
**- L'Archiviste**