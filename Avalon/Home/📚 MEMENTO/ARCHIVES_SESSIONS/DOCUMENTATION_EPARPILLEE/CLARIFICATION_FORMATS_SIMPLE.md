# 🎯 CLARIFICATION SIMPLE - Les 3 Formats dans Heroes of Time

**Pour comprendre rapidement la différence !**

---

## 🎮 **EN RÉSUMÉ SIMPLE**

### **📜 .hots = SCÉNARIO DE JEU**
- **C'est quoi ?** → Le script du jeu (comme un script de film)
- **Ça fait quoi ?** → Décrit ce qui se passe dans le jeu
- **Exemple** → "Arthur se bat contre un dragon"

### **🐚 .sh = ROBOT QUI JOUE**
- **C'est quoi ?** → Un robot qui lance les scénarios
- **Ça fait quoi ?** → Prend le script .hots et le fait jouer
- **Exemple** → "Lance le scénario Arthur vs Dragon"

### **📄 .json = FICHE D'IDENTITÉ**
- **C'est quoi ?** → La carte d'identité des personnages
- **Ça fait quoi ?** → Décrit les stats, pouvoirs, équipement
- **Exemple** → "Arthur a 100 HP et une épée magique"

---

## 🔄 **COMMENT ÇA MARCHE ENSEMBLE ?**

```
1. JSON définit Arthur      →  Arthur: 100HP, épée magique
2. HOTS écrit l'histoire    →  Arthur se bat contre dragon
3. SH fait jouer           →  Le robot lance le combat
```

---

## 📝 **EXEMPLES CONCRETS**

### **📜 Fichier HOTS (le scénario)**
```hots
# bataille_simple.hots
HERO(Arthur)                    # Créer Arthur
MOV(Arthur, @10,10)            # Arthur va en position
CREATE(CREATURE, Dragon, @15,15) # Créer un dragon
BATTLE(Arthur, Dragon)         # Combat !
```

### **🐚 Script SH (le lanceur)**
```bash
# lancer_bataille.sh
#!/bin/bash
echo "🎮 Lancement bataille Arthur vs Dragon"
curl -X POST "http://localhost:8080/api/scripts" \
  -d "HERO(Arthur)"
curl -X POST "http://localhost:8080/api/scripts" \
  -d "BATTLE(Arthur, Dragon)"
echo "✅ Bataille terminée !"
```

### **📄 Fichier JSON (les stats)**
```json
{
  "name": "Arthur",
  "hp": 100,
  "weapon": "épée magique",
  "abilities": ["coup d'épée", "magie"]
}
```

---

## 🎯 **POUR JOUER UN SCÉNARIO, TU FAIS QUOI ?**

### **Option A : Via Script SH (Automatique)**
```bash
./⚙️ scripts/test-bataille-arthur.sh
# → Le script lance tout automatiquement
```

### **Option B : Via l'UI (Manuel)**
1. Ouvrir l'interface web
2. Cliquer sur "Bataille Arthur vs Dragon"
3. Regarder le combat se dérouler

### **Option C : Via API (Développeur)**
```bash
curl -X POST "http://localhost:8080/api/scripts" \
  -d "HERO(Arthur); BATTLE(Arthur, Dragon)"
```

---

## 🔍 **DANS TON PROJET, OÙ C'EST ?**

### **📁 Scénarios HOTS**
```
🎮 game_assets/scenarios/hots/
├── simple-game.hots              ← Démo simple
├── bataille_temporelle_complete.hots ← Bataille épique
├── quantum_maze.hots             ← Labyrinthe quantique
└── memento_hero_test.hots        ← Test du héros Memento
```

### **📁 Scripts SH**
```
⚙️ scripts/
├── test-heros-memento.sh         ← Test Memento
├── test-bataille-arthur.sh       ← Test Arthur
└── start-services-background.sh  ← Démarrer tout
```

### **📁 Fichiers JSON**
```
🖥️ backend/src/main/resources/
├── heroes/memento.json           ← Stats de Memento
├── heroes/arthur.json            ← Stats d'Arthur
└── artifacts/temporal_artifacts.json ← Objets magiques
```

---

## 🎮 **POUR AJOUTER UN SCÉNARIO DANS L'UI**

### **Étape 1 : Créer le scénario HOTS**
```hots
# mon_scenario.hots
HERO(MonHeros)
MOV(MonHeros, @5,5)
# ... autres actions
```

### **Étape 2 : L'ajouter au menu**
```javascript
// Dans le frontend
{
  scenario: "mon_scenario.hots",
  title: "🎯 Mon Scénario",
  description: "Description de mon scénario"
}
```

### **Étape 3 : Connecter au backend**
```javascript
// Fonction pour jouer
async function playScenario(scenarioFile) {
  const response = await fetch('/api/scripts', {
    method: 'POST',
    body: scenarioFile
  });
}
```

---

## ⚡ **DIFFÉRENCES IMPORTANTES**

| Format | Rôle | Qui l'utilise | Exemple |
|--------|------|---------------|---------|
| **HOTS** | Histoire du jeu | Créateur de scénarios | `HERO(Arthur)` |
| **SH** | Robot lanceur | Testeur/Développeur | `curl -X POST...` |
| **JSON** | Base de données | Backend/Configuration | `{"hp": 100}` |

---

## 🚀 **POUR COMMENCER RAPIDEMENT**

### **Je veux juste jouer un scénario :**
```bash
cd frontend-temporal
python3 -m http.server 3000
# Ouvrir http://localhost:3000
# Cliquer sur un scénario dans le menu
```

### **Je veux créer un nouveau scénario :**
1. Copier `simple-game.hots`
2. Modifier les actions
3. L'ajouter au menu de l'UI

### **Je veux tester avec le backend :**
```bash
./⚙️ scripts/test-simple-scenario.sh
```

---

## 🎯 **CONCLUSION**

- **HOTS** = Le scénario (quoi)
- **SH** = Le lanceur (comment)  
- **JSON** = Les données (qui/avec quoi)

**Ensemble, ils font un jeu complet !** 🎮✨

---

*Maintenant c'est clair ? 😊*