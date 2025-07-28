# 🎯 HACKER MODE - Heroes of Time
*Guide de survie pour comprendre et naviguer le projet*

---

## 🚨 **LE PROBLÈME : TROP DE COMPLEXITÉ**

### **7 Services Différents = Confusion Totale**
```
🎯 Dashboard (9000)     - Interface centrale
📊 Frontend (8000)      - Jeu principal  
⚙️ Backend (8080)       - API Java
⚡ Temporal (5174)      - Interface temporelle
🌌 Quantum (8001)       - Lab quantique
🏛️ Visualizer (5175)    - Collection & Grammar
🧪 Test Runner (8888)   - Tests
```

### **Systèmes Avancés = Overwhelming**
- **ψ-states** : États quantiques superposés
- **Timelines** : Lignes temporelles parallèles  
- **GROFI** : Graph of Reality Organized by Fog and Immunities
- **Causalité** : Effondrement causale
- **Artefacts temporels** : Objets avec formules complexes

---

## 🎯 **LA SOLUTION : HACKER MODE**

### **1. COMMENCER PAR L'ESSENTIEL**
```bash
# Seulement 3 services pour commencer
./hots start essential

# Services essentiels :
# - Backend (8080) : Le moteur
# - Frontend (8000) : Le jeu
# - Dashboard (9000) : Le hub
```

### **2. COMPRENDRE L'ARCHITECTURE EN 30 SECONDES**
```
🎮 HEROES OF TIME = MOTEUR DE JEU GÉNÉRIQUE

JSON Configs + HOTS Scripts → Moteur Java → Effets de Jeu

Exemple :
- JSON : "sword" → "MODIFY_ENERGY(target, -50)"
- HOTS : "USE(ARTIFACT, sword, HERO:Arthur)"  
- Résultat : Arthur utilise l'épée, dégâts appliqués
```

### **3. NAVIGATION SIMPLIFIÉE**
```
🎯 DASHBOARD (9000) - Point d'entrée unique
├── 🎮 Jouer → Frontend (8000)
├── 🧪 Tester → Test Runner (8888)  
├── 🌟 Mode Éthéré → UIs cachées
└── 🎬 Centre de Replay → Scénarios

📊 FRONTEND (8000) - Le vrai jeu
├── Grille hexagonale
├── Héros (Arthur, Ragnar, etc.)
├── Console HOTS
└── Interface de base
```

---

## 🎮 **COMMENT JOUER VRAIMENT**

### **Étape 1 : Démarrer l'Essentiel**
```bash
./hots start essential
```

### **Étape 2 : Aller sur le Dashboard**
```
http://localhost:9000/dashboard.html
```

### **Étape 3 : Cliquer "🎮 Jouer"**
```
→ Redirige vers http://localhost:8000
```

### **Étape 4 : Créer une Partie**
```javascript
// Dans la console du frontend
HERO(Arthur)                    // Créer Arthur
MOV(Arthur, @10,10)            // Le déplacer
CREATE(CREATURE, Dragon, @15,15) // Créer un dragon
```

### **Étape 5 : Utiliser les Artefacts**
```javascript
USE(ARTIFACT, sword, HERO:Arthur)  // Arthur utilise l'épée
USE(ARTIFACT, potion, HERO:Ragnar) // Ragnar boit une potion
```

---

## 🔧 **SYSTÈMES AVANCÉS (OPTIONNELS)**

### **ψ-States (États Quantiques)**
```javascript
// Créer une superposition
ψ001: ⊙(Δt+2 @15,15 ⟶ MOV(Arthur, @15,15))

// L'effondrer
†ψ001
```

### **Timelines Parallèles**
```javascript
// Créer une timeline alternative
TIMELINE(ℬ2)
HERO(Arthur, ℬ2)
```

### **Artefacts Temporels**
```javascript
// Utiliser un artefact avec formule complexe
USE(ARTIFACT, wigner_eye, HERO:Arthur)
// Formule : "SEE_FUTURE(3) + REVEAL_HIDDEN()"
```

---

## 🎯 **OBJECTIF ACTUEL : VERSION ALPHA**

### **6 Priorités Critiques (11-13 jours)**
1. **🏛️ Interface de Ville** - Gestion de base
2. **⚔️ Interface de Combat** - Combat hexagonale  
3. **👤 Interface de Héros** - Fiches complètes
4. **🧙‍♂️ Système de Magie** - Grimoire basique
5. **🗺️ Minimap** - Navigation
6. **💰 Économie** - Ressources

### **Résultat : Jeu Jouable**
- **Partie complète** : 30-60 minutes
- **Objectifs clairs** : Conquérir une ville
- **Progression visible** : Héros qui montent en niveau
- **Interface intuitive** : Pas de documentation nécessaire

---

## 🚀 **COMMANDES HACKER**

### **Démarrer Tout**
```bash
./hots start                    # Tous les services
./hots start essential          # Services essentiels seulement
```

### **Tester**
```bash
./hots test quick               # Tests rapides
./hots test report              # Rapport complet
```

### **Scénarios**
```bash
./hots replay center            # Centre de replay
./hots scenario list            # Liste des scénarios
```

### **Debug**
```bash
./hots status                   # Statut des services
./hots logs                     # Logs en temps réel
```

---

## 🎯 **RÈGLES D'OR DU HACKER**

### **1. COMMENCER SIMPLE**
- Ne pas essayer de tout comprendre d'un coup
- Commencer par le frontend (8000) seulement
- Ajouter les systèmes avancés progressivement

### **2. UTILISER LE DASHBOARD**
- Point d'entrée unique pour tout
- Navigation claire entre les services
- Mode Éthéré pour les UIs cachées

### **3. TESTER SOUVENT**
- `./hots test quick` après chaque modification
- Vérifier que le jeu fonctionne toujours
- Commits fréquents pour sauvegarder

### **4. DOCUMENTER**
- 📚 MEMENTO/ pour les découvertes
- TODO_SESSION_ACTUELLE.md pour les objectifs
- Commits avec messages clairs

---

## 🏆 **CONCLUSION HACKER**

**Heroes of Time n'est pas compliqué, il est complet !**

### **🎯 Pour Jouer :**
1. Dashboard (9000) → Frontend (8000)
2. Créer des héros et les déplacer
3. Utiliser des artefacts
4. Tester les ψ-states (optionnel)

### **🎯 Pour Développer :**
1. Suivre le TODO_SESSION_ACTUELLE.md
2. 6 priorités critiques pour version alpha
3. 11-13 jours pour un jeu jouable
4. Protection Tour de Domburg active

### **🎯 Pour Explorer :**
1. Mode Éthéré pour les UIs cachées
2. Centre de Replay pour les scénarios
3. Quantum Visualizer pour les graphiques
4. Collection & Grammar pour la documentation

---

**🚀 HACKER MODE ACTIVÉ - PRÊT À CONQUÉRIR LE TEMPS !** ⏰ 