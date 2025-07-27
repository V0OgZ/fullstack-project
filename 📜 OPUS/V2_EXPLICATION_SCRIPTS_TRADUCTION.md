# 📜 **EXPLICATION DES SCRIPTS DE TRADUCTION**

*Documenté par OPUS pour Jean*

---

## 🔍 **Les Deux Scripts de Traduction**

### **1. `scripts/test/generate-scenario-md.py`** (EXISTANT)
```python
# Script original de Memento
# TRÈS spécifique et complexe

def main():
    # Chemin HARDCODÉ
    hots_file = "game_assets/scenarios/hots/test-economie-guerre.hots"
    output_file = "docs/SCENARIO_ECONOMIE_GUERRE_TRADUIT.md"
```

**Caractéristiques :**
- ❌ **Fichier d'entrée fixe** : Toujours `test-economie-guerre.hots`
- ❌ **Sortie fixe** : Toujours `SCENARIO_ECONOMIE_GUERRE_TRADUIT.md`
- 🎲 **Variations aléatoires** : Change le texte à chaque exécution
- 📚 **440 lignes** de code avec beaucoup de complexité
- 🎯 **Usage** : Spécifique pour UN seul scénario

### **2. `scripts/generate-scenario-translation.py`** (NOUVEAU - OPUS)
```python
# Script créé par OPUS
# UNIVERSEL et simple

def main():
    # Accepte N'IMPORTE QUEL fichier
    hots_file = Path(sys.argv[1])
    output_path = Path("docs/scenarios/generated") / f"{stem}_LITERARY.md"
```

**Caractéristiques :**
- ✅ **Fichier d'entrée variable** : Accepte n'importe quel `.hots`
- ✅ **Sortie organisée** : Dans `docs/scenarios/generated/`
- 📖 **Traduction consistante** : Même résultat à chaque fois
- 💡 **~200 lignes** de code simple et clair
- 🌍 **Usage** : Universel pour TOUS les scénarios

---

## 🎯 **Comment J'ai Généré le Scénario**

### **Étape 1 : Création du fichier HOTS**
```bash
# J'ai créé le scénario de réconciliation
vi scenarios/reconciliation_vince_opus.hots
```

### **Étape 2 : Traduction automatique**
```bash
# Utilisation de MON script universel
python3 scripts/generate-scenario-translation.py scenarios/reconciliation_vince_opus.hots

# Résultat automatique
✨ Traduction littéraire générée : docs/scenarios/generated/reconciliation_vince_opus_LITERARY.md
```

---

## 🚀 **Nouvelle Commande dans HOTS**

J'ai ajouté la commande `translate` au menu principal :

```bash
# Afficher l'aide
./hots translate

# Traduire un scénario
./hots translate scenarios/bataille_temporelle.hots

# Traduire le scénario de Vince
./hots translate scenarios/reconciliation_vince_opus.hots
```

### **Ce qui a été modifié dans `hots` :**

1. **Menu principal** (ligne ~32) :
   ```bash
   echo -e "  ${GREEN}translate${NC}   📜 Traduit un scénario HOTS en narration littéraire"
   ```

2. **Exemples** (ligne ~83) :
   ```bash
   echo -e "  ${CYAN}./hots translate scenario.hots${NC} # 📜 Traduit HOTS en narration"
   ```

3. **Switch case** (ligne ~1252) :
   ```bash
   "translate")
       translate_scenario "$2"
       ;;
   ```

4. **Nouvelle fonction** (ligne ~839) :
   ```bash
   translate_scenario() {
       # Logique de traduction
   }
   ```

---

## 💡 **Pourquoi Deux Scripts ?**

### **Le script de Memento** (`generate-scenario-md.py`)
- Créé pour UN cas spécifique
- Très détaillé avec variations aléatoires
- Parfait pour son usage original

### **Mon script OPUS** (`generate-scenario-translation.py`)
- Créé pour être UNIVERSEL
- Simple et prévisible
- Parfait pour traduire N'IMPORTE QUEL scénario

---

## 🎭 **Philosophie de Traduction**

Mon script transforme :
```hots
CREATE_HERO(OPUS, pos: @10,10)
QUOTE(OPUS, "Je suis l'écho du futur")
```

En :
```markdown
✨ 🌌 OPUS, l'écho du futur, se matérialise dans un tourbillon d'énergie temporelle.
💬 OPUS proclame : *"Je suis l'écho du futur"*
```

---

## 📊 **Résumé**

- **Script existant** = Spécialisé, complexe, pour UN fichier
- **Mon script** = Universel, simple, pour TOUS les fichiers
- **Nouvelle commande** = `./hots translate <fichier.hots>`
- **Résultat** = Narration épique automatique !

---

*"Le code est poésie, et maintenant nous avons deux poètes !"*  
— OPUS, Echo du Futur