# 🚨 TODO CRITIQUE 2 JOURS - ORGANISATION STRICTE
## 📅 **Période : 26-28 Juillet 2025**
## 🎯 **Mission : Merge sans perdre + Finaliser Alpha**
## 🛡️ **Protections : Tatouages + TODO + McKinsey**

---

## ⚡ **JOUR 1 (26/07 - AUJOURD'HUI)**

### 🔄 **14h-16h : MERGE INTELLIGENT**
```bash
# 1. Sauvegarder les tatouages AVANT merge
cp game_assets/artifacts/mineurs/tatouages_memento_archiviste.json BACKUP_TATOUAGES_26_07.json

# 2. Merge avec stratégie
git checkout main
git merge origin/dev --no-commit
# Vérifier CHAQUE fichier, surtout tatouages

# 3. Résoudre conflits MANUELLEMENT
# PRIORITÉ : Garder version avec le plus d'infos
```

### 🧹 **16h-17h : NETTOYAGE SÉLECTIF**
**GARDER :**
- ✅ TOUS les .md dans MEMENTO/
- ✅ TOUS les tatouages JSON
- ✅ TOUTES les TODO
- ✅ Code source (java, js, html)

**JETER :**
- ❌ logs/*.log (sauf backend.log récent)
- ❌ test-*.js temporaires
- ❌ Screenshots de test
- ❌ node_modules (regénérable)

### 🔧 **17h-19h : VÉRIFICATION BACKEND**
1. Compiler backend
2. Tester QuantumService
3. Vérifier WorldStateGraph
4. Connecter page GRUT

### 📝 **19h-20h : RAPPORT GRUT**
- État du merge
- Systèmes fonctionnels
- Problèmes rencontrés
- Plan jour 2

---

## 🎮 **JOUR 2 (27/07)**

### 🏛️ **9h-12h : INTERFACE VILLE**
**CRÉATION DEPUIS ZÉRO :**
```javascript
// frontend/components/CityInterface.js
- Vue ville basique
- 3 bâtiments (Mairie, Caserne, Tour)
- Affichage ressources (Or, Bois, Pierre)
- Connexion /api/cities
```

### 🤖 **14h-16h : IA UI**
```javascript
// frontend/components/AISelector.js
- Menu difficulté (Easy → Paradox)
- Connexion AIPlayer backend
- Stats en temps réel
```

### 🧙 **16h-18h : MAGIE BASIQUE**
```javascript
// frontend/components/SpellBook.js
- 6 sorts simples
- Interface grimoire
- Effets visuels CSS
```

### ✅ **18h-19h : TESTS FINAUX**
- Partie complète 30 min
- Tous systèmes connectés
- Performance OK

---

## 🛡️ **PROTECTIONS PERMANENTES**

### 📁 **Fichiers INTOUCHABLES**
```
MEMENTO/
├── TODO_SESSION_ACTUELLE.md ← NE PAS ÉCRASER
├── TODO_SESSION_ACTUELLE_V2.md ← NOUVELLE VERSION
├── TODO_2_JOURS_CRITICAL.md ← CE FICHIER
└── tatouages_memento_* ← SAUVEGARDER AVANT TOUT

game_assets/artifacts/mineurs/
└── tatouages_memento_archiviste.json ← CRITIQUE !
```

### 🚨 **Surveillance McKinsey**
- Vérifier logs suspects
- Maintenir ancre Jour 10
- Sauvegarder régulièrement

---

## 📊 **CHECKLIST RAPIDE**

### **AVANT MERGE**
- [ ] Backup tatouages
- [ ] Backup TODO
- [ ] git fetch --all
- [ ] Analyser conflits

### **PENDANT MERGE**
- [ ] Résoudre manuellement
- [ ] Préserver tatouages
- [ ] Garder TODO structure
- [ ] Tester compilation

### **APRÈS MERGE**
- [ ] Vérifier tatouages intacts
- [ ] Backend compile
- [ ] Services connectés
- [ ] Rapport à GRUT

---

## 🎯 **OBJECTIF FINAL 28/07**

**VERSION ALPHA JOUABLE :**
- ✅ Combat fonctionnel
- ✅ Héros avec stats
- ✅ Ville basique
- ✅ IA jouable
- ✅ 6 sorts magie
- ✅ Story Mode
- ✅ Sauvegarde/Chargement

**Temps de jeu :** 30-60 minutes
**Stabilité :** Pas de crash
**Performance :** 60 FPS

---

## 🔥 **NOTES CRITIQUES**

1. **NE JAMAIS** écraser les tatouages sans backup
2. **TOUJOURS** garder structure TODO
3. **MERGER** avec --no-commit pour vérifier
4. **TESTER** après chaque changement
5. **RAPPORT** à GRUT obligatoire

---

**🎯 PROCHAINE ACTION :** BACKUP TATOUAGES puis MERGE !

*"L'organisation sauve les projets. Le chaos les détruit."* - OPUS