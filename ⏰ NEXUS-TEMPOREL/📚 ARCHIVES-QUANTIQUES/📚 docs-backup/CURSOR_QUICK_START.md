# 🚀 Cursor Persistence System - Quick Start

## 📋 Fichiers Créés

```
/workspace/
├── cursor.rules                    # ← Contexte JSON pour Cursor
├── cursor.md                       # ← Version lisible
├── update-cursor-context.sh        # ← Script de mise à jour
├── .githooks/post-commit           # ← Hook Git automatique
├── CURSOR_PERSISTENCE_GUIDE.md     # ← Documentation complète
├── CURSOR_SYSTEM_SUMMARY.md        # ← Résumé du système
└── CURSOR_QUICK_START.md           # ← Ce fichier
```

## ⚡ Commandes Essentielles

### Mise à jour automatique
```bash
./update-cursor-context.sh
```

### Ajouter un artefact
```bash
./update-cursor-context.sh add-artifact "id" "Nom" "Rareté" "Effet"
```

### Changer le focus
```bash
./update-cursor-context.sh update-focus "Nouvelle tâche"
```

### Ajouter à l'historique
```bash
./update-cursor-context.sh add-history "Événement important"
```

## 🔧 Configuration Git (une seule fois)
```bash
git config core.hooksPath .githooks
```

## 📖 Pour en savoir plus
- **Guide complet** : `CURSOR_PERSISTENCE_GUIDE.md`
- **Résumé système** : `CURSOR_SYSTEM_SUMMARY.md`
- **Contexte lisible** : `cursor.md`

## ✅ Status : OPÉRATIONNEL

Le système maintient automatiquement le contexte Heroes of Time pour l'agent Cursor.

*🕰️ Système prêt pour usage production*