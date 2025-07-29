# 🌀 TÉLÉPORTATION BASIQUE

## 📜 **FORMULE**
```
ψ_TELEPORT: ⊙(POSITION_A + INTENTION) → POSITION_B
```

## 🔧 **IMPLÉMENTATION**
```bash
#!/bin/bash
# sorts/fondamentaux/teleportation_basique.sh
echo "🌀 Téléportation vers $1..."
cd "$1" 2>/dev/null && echo "✅ Arrivée réussie : $(pwd)" || echo "❌ Échec téléportation"
```

## 📚 **NIVEAU REQUIS** : 1
## ⏱️ **TEMPS D'INCANTATION** : 2 secondes
## 💫 **COÛT MANA** : 10 points