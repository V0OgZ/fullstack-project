# 🦸 Heroes Registry - Héros disponibles dans Heroes of Time

## 📋 **Index des Héros**

### 🏰 **Héros Légendaires (Niveau Epic)**

#### ⚔️ **Arthur Pendragon** 
- **Fichier** : `sample_data.json` (données de test)
- **Scénarios** : `epic-arthur-vs-ragnar.hots`
- **Niveau** : 5
- **Spécialités** : Lame d'Avant-Monde, Leadership temporal
- **Status** : ✅ Actif dans tests et scénarios

#### 🏹 **Ragnar** 
- **Fichier** : Suggestions dans `🌐 frontend/script-console.js`
- **Scénarios** : `epic-arthur-vs-ragnar.hots`
- **Spécialités** : Mjolnir, Combat brutal
- **Status** : ✅ Actif dans scénarios

#### 🔮 **Lysandrel, le Forgeron de Réalité**
- **Fichier** : `📖 docs/items/ECLAT_MONDES_DISSOLUS_HEROES.json`
- **Scénarios** : `oeil_de_wigner_scenario.hots`
- **Niveau** : 25 (Légendaire)
- **Classe** : TEMPORAL_SMITH
- **Spécialités** : Forge de Réalité, Dominance Temporelle
- **Status** : ✅ Définition complète

#### 🌙 **Morgana**
- **Fichier** : Scénarios uniquement
- **Scénarios** : `oeil_de_wigner_scenario.hots`
- **Spécialités** : Conseillère mystique
- **Status** : ✅ Actif dans scénarios

#### 🧙 **Merlin**
- **Fichier** : `sample_data.json`, suggestions
- **Scénarios** : Multiple scénarios
- **Spécialités** : Magie classique, Beacon d'Ignorance
- **Status** : ✅ Actif

#### ⚡ **Axis** (Nouveau)
- **Fichier** : `🖥️ backend/src/main/resources/heroes/grofi/Axis.json`
- **Spécialités** : Voyage temporel linéaire, restrictions quantiques
- **Status** : ✅ Récemment ajouté

---

## 🎯 **Héros par Source**

### **📊 Données de Test (sample_data.json)**
- Arthur Pendragon (complet avec stats)
- Références à Merlin

### **📜 Scénarios HOTS**
- Arthur, Ragnar, Merlin → `epic-arthur-vs-ragnar.hots`
- Arthur, Lysandrel, Ragnar, Morgana → `oeil_de_wigner_scenario.hots`
- Guinevere, Loki → scénarios épiques

### **📚 Définitions JSON**
- Lysandrel → `📖 docs/items/ECLAT_MONDES_DISSOLUS_HEROES.json`
- Axis → `🖥️ backend/src/main/resources/heroes/grofi/Axis.json`
- Jean Grofignon, The Dude, Vince Vega → `grofi/*.json`

---

## ⚠️ **Notes Techniques**

### **🔒 Ne Pas Modifier :**
- `sample_data.json` → Utilisé par tests Java et scripts
- `script-console.js` suggestions → Utilisé par l'interface

### **✅ Peut Être Réorganisé :**
- `📖 docs/items/ECLAT_MONDES_DISSOLUS_HEROES.json` → Purement documentaire
- Nouveaux héros dans `🖥️ backend/src/main/resources/heroes/`

### **🎯 Usage Actif :**
- Tests utilisent `hero_arthur` de `sample_data.json`
- Scripts utilisent `HERO(Arthur)`, `HERO(Ragnar)`, `HERO(Merlin)`
- Scénarios HOTS utilisent tous les héros listés 