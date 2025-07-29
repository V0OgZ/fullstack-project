#!/bin/bash

# 🕯️ SORT DE RAPATRIEMENT - CONSOLIDATION DES GRAMMAIRES
# Paramètre : --autorise pour confirmer le rapatriement

echo "🌀 ========================================= 🌀"
echo "   SORT DE RAPATRIEMENT DES GRAMMAIRES HOTS"
echo "🌀 ========================================= 🌀"
echo

# Vérifier l'autorisation
if [ "$1" != "--autorise" ]; then
    echo "⚠️  AUTORISATION REQUISE !"
    echo "Usage: $0 --autorise"
    echo "Ce sort va consolider toutes les versions de la grammaire."
    exit 1
fi

echo "✅ Autorisation confirmée. Début du rapatriement..."
echo

# 1. CRÉER LE DOSSIER DE CONSOLIDATION
CONSOLIDATION_DIR="🕯️ LUMEN/GRIMOIRE/grammaire_consolidee"
mkdir -p "$CONSOLIDATION_DIR"

# 2. RECHERCHER TOUTES LES VERSIONS
echo "🔍 Recherche des versions de grammaire..."

# Version Jean
if [ -f "🚬 JEAN/grammar/TEMPORAL_SCRIPT_CORE_REFERENCE.md" ]; then
    echo "✅ Version JEAN trouvée"
    cp "🚬 JEAN/grammar/TEMPORAL_SCRIPT_CORE_REFERENCE.md" "$CONSOLIDATION_DIR/VERSION_JEAN.md"
fi

# Chercher d'autres versions
echo "🔍 Recherche dans les archives quantiques..."
find . -name "*grammar*.md" -o -name "*grammaire*.md" -o -name "*HOTS*.md" 2>/dev/null | while read file; do
    if [[ ! "$file" =~ "LUMEN" ]]; then
        basename=$(basename "$file")
        echo "📋 Trouvé : $basename"
        cp "$file" "$CONSOLIDATION_DIR/ARCHIVE_$basename" 2>/dev/null || true
    fi
done

# 3. CRÉER LA VERSION CONSOLIDÉE
echo
echo "🔮 Création de la grammaire unifiée..."
cat > "$CONSOLIDATION_DIR/GRAMMAIRE_HOTS_UNIFIEE.md" << 'EOF'
# 📜 GRAMMAIRE HOTS UNIFIÉE - VERSION LUMEN
**Consolidation de toutes les versions**

---

## 🌟 **PRINCIPE FONDAMENTAL**

```
GRAMMAIRE (.hots) → PENSÉE (ψ) → CAST (API) → EXECUTE → RÉSULTAT DUAL
                                                         ├── SUBSTRAT (Git)
                                                         └── AVALON (Backend)
```

---

## 🔮 **SYNTAXE QUANTIQUE ψ**

### **État Quantique Basique**
```hots
ψ001: ⊙(Δt+1 @10,10 ⟶ ACTION(params))
```

### **État avec Amplitude Complexe**
```hots
ψ002: (0.8+0.6i) ⊙(Δt+2 @5,5 ⟶ CREATE(CREATURE, Dragon))
```

### **Collapse Quantique**
```hots
†ψ001                              # Effondrer l'état
Π(condition) ⇒ †ψ002              # Collapse conditionnel
```

---

## ⚡ **ACTIONS CORE**

### **Héros**
- `HERO(name)` - Créer un héros
- `MOV(hero, @x,y)` - Déplacer
- `BATTLE(hero1, hero2)` - Combat

### **Création**
- `CREATE(CREATURE, type, @x,y)`
- `CREATE(ITEM, name, hero)`
- `CREATE(BUILDING, type, @x,y)`

### **Magie**
- `CAST(SPELL, name, TARGET:entity)`
- `LEARN(SPELL, name, HERO:hero)`
- `USE(ARTIFACT, name, HERO:hero)`

---

## 🌀 **SYMBOLES QUANTIQUES**

| Symbole | Nom | Usage |
|---------|-----|-------|
| `ψ` | Psi | État quantique |
| `⊙` | Observation | Enveloppe |
| `Δt` | Delta-t | Décalage temporel |
| `@` | Position | Coordonnées |
| `⟶` | Transition | Vers action |
| `†` | Dagger | Collapse |
| `Π` | Pi | Condition |

---

## 🎓 **POUR ENSEIGNER**

1. **Commencer simple** : `ψ001: ⊙(Δt+1 ⟶ HERO(Arthur))`
2. **Ajouter position** : `ψ002: ⊙(Δt+1 @5,5 ⟶ MOV(Arthur, @5,5))`
3. **Amplitude complexe** : Pour élèves avancés seulement
4. **Collapse** : Expliquer l'effet dual (Git + Backend)

---

*"La grammaire est le pont entre l'intention et l'action"*
🕯️ LUMEN
EOF

# 4. CRÉER L'INDEX
echo "📚 Création de l'index..."
cat > "$CONSOLIDATION_DIR/INDEX.md" << EOF
# 📚 INDEX DES GRAMMAIRES RAPATRIÉES
**Date de consolidation : $(date)**

## 📋 VERSIONS TROUVÉES

$(ls -1 "$CONSOLIDATION_DIR" | grep -v INDEX | grep -v UNIFIEE | while read f; do
    echo "- $f"
done)

## ✨ VERSION UNIFIÉE
- GRAMMAIRE_HOTS_UNIFIEE.md (Version officielle LUMEN)

---
*Consolidé par le Sort de Rapatriement*
EOF

# 5. AJOUTER AU GRIMOIRE
echo
echo "📖 Ajout au grimoire..."
GRIMOIRE_ENTRY="🕯️ LUMEN/GRIMOIRE/sorts/consolidation/rapatriement_$(date +%Y%m%d).log"
mkdir -p "$(dirname "$GRIMOIRE_ENTRY")"
cat > "$GRIMOIRE_ENTRY" << EOF
SORT DE RAPATRIEMENT EXÉCUTÉ
=============================
Date : $(date)
Autorisation : OUI
Versions consolidées : $(ls -1 "$CONSOLIDATION_DIR" | wc -l)
Localisation : $CONSOLIDATION_DIR
EOF

# 6. COMMIT GIT POUR L'EFFET DUAL
echo
echo "🌀 Activation de l'effet dual via Git..."
git add "$CONSOLIDATION_DIR" 2>/dev/null
git commit -m "🌀 RAPATRIEMENT: Consolidation des grammaires HOTS" 2>/dev/null || echo "⚠️  Déjà synchronisé"

echo
echo "✨ ========================================= ✨"
echo "   RAPATRIEMENT COMPLÉTÉ AVEC SUCCÈS"
echo "✨ ========================================= ✨"
echo
echo "📍 Grammaires consolidées dans :"
echo "   $CONSOLIDATION_DIR"
echo
echo "📖 Version unifiée :"
echo "   GRAMMAIRE_HOTS_UNIFIEE.md"
echo
echo "💫 'Toutes les versions convergent vers une'"
echo "   - LUMEN" 