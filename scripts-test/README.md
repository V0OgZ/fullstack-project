# 🧪 Scripts de Test Heroes of Time

Ce dossier contient tous les scripts de test et de démonstration créés pour Heroes of Time.

## 📋 **Liste des Scripts**

### 🎮 **demo-heroes-of-time-script.sh**
**Script principal de démonstration du langage Heroes of Time**

- **Objectif** : Démonstration complète du langage de script temporel
- **Fonctionnalités testées** :
  - 🦸 Création de héros (Arthur, Ragnar, Morgana, Merlin)
  - 🏃 Mouvements tactiques
  - 🏺 Artefacts temporels (AvantWorldBlade, ReverseClock, IgnoreBeacon)
  - 🌀 ψ-states (superpositions quantiques)
  - 🎯 Triggers d'observation Π(...) ⇒ †ψ001
  - 💥 Collapses temporels †ψ001
  - ⚡ Actions avancées (BATTLE, TELEPORT, HEAL, BUFF)

**Usage** : `./demo-heroes-of-time-script.sh`

---

### 🔧 **test-ui-fix.sh**
**Script de test pour vérifier le fix du 'New Game' functionality**

- **Objectif** : Tester que les corrections des UIs fonctionnent
- **Tests effectués** :
  - ✅ Backend health check
  - ✅ Frontend Classic (port 8000)
  - ✅ Frontend Temporal (port 5173)
  - ✅ Game creation API

**Usage** : `./test-ui-fix.sh`

---

### 🚀 **start-fixed-uis.sh**
**Script de démarrage des interfaces corrigées**

- **Objectif** : Démarrer tous les services et montrer les corrections
- **Services gérés** :
  - 🔥 Backend Spring Boot (port 8080)
  - 🌐 Frontend Classic (port 8000)
  - ⚡ Frontend Temporal (port 5173)
- **Vérifications** : Tests de connectivité et d'accessibilité

**Usage** : `./start-fixed-uis.sh`

---

### ✅ **TRAVAIL_RECUPERE_VERIFICATION.sh**
**Script de vérification que tout le travail backend est récupéré**

- **Objectif** : Prouver que toutes les fonctionnalités sont opérationnelles
- **Vérifications** :
  - ✅ Backend health
  - ✅ Game creation
  - ✅ Hero creation via script
  - ✅ ψ-state creation et collapse
  - ✅ Frontend temporal accessibility

**Usage** : `./TRAVAIL_RECUPERE_VERIFICATION.sh`

---

## 🎯 **Utilisation Recommandée**

### **Pour démarrer le système complet :**
```bash
./start-fixed-uis.sh
```

### **Pour tester les fonctionnalités :**
```bash
./test-ui-fix.sh
```

### **Pour vérifier que tout fonctionne :**
```bash
./TRAVAIL_RECUPERE_VERIFICATION.sh
```

### **Pour la démonstration complète :**
```bash
./demo-heroes-of-time-script.sh
```

---

## 📊 **Prérequis**

- **Backend** : Spring Boot démarré (port 8080)
- **Java** : Version 17+
- **Maven** : Version 3.8+
- **Python** : Version 3.8+ (pour les frontends)

---

## 🌐 **Accès aux Interfaces**

- **Backend API** : http://localhost:8080/api/temporal/health
- **Frontend Classic** : http://localhost:8000/
- **Frontend Temporal** : http://localhost:5173/

---

## 🎮 **Exemple de Commandes Script**

```bash
# Créer un héros
HERO(Arthur)

# Déplacer un héros  
MOV(Arthur, @10,10)

# Créer un objet temporel
CREATE(ITEM, AvantWorldBlade, @10,10)

# Utiliser un objet
USE(ITEM, AvantWorldBlade, HERO:Arthur)

# Créer une superposition quantique
ψ001: ⊙(Δt+2 @12,12 ⟶ MOV(HERO, Arthur, @12,12))

# Trigger d'observation
Π(Arthur enters @12,12 at Δt+2) ⇒ †ψ001

# Collapse temporel
†ψ001
```

---

## 📝 **Notes de Développement**

Ces scripts ont été créés pour :
- **Tester** toutes les fonctionnalités du moteur temporel
- **Valider** les corrections des interfaces
- **Démontrer** les capacités du langage de script
- **Vérifier** la récupération du travail backend

Tous les scripts sont fonctionnels et testés avec succès sur la branche `poc-heroes-of-time`.

---

**🎉 Heroes of Time Script Testing Suite - Ready to Use!** 