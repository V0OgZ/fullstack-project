#!/bin/bash

# 🔐 BACKUP SÉCURITÉ FRONTENDS - ÉVITER CONFUSION JEAN
# ===================================================

echo "🔐 BACKUP SÉCURITÉ FRONTENDS JEAN"
echo "================================="
echo ""

BACKUP_DIR="ARCHIVES_SECURITE_FRONTENDS/backup_$(date +%Y%m%d_%H%M%S)"
mkdir -p "$BACKUP_DIR"

echo "📁 Sauvegarde dans: $BACKUP_DIR"
echo ""

# Backup Frontend Port 8000 (Interface Temporal Engine)
if [ -d "frontend" ]; then
    echo "💾 Sauvegarde Frontend Port 8000 (Temporal Engine)..."
    cp -r frontend "$BACKUP_DIR/frontend_port_8000"
    echo "✅ Frontend Port 8000 sauvé"
else
    echo "❌ Frontend Port 8000 non trouvé"
fi

# Backup Frontend Port 3000 (React TrueHeroesInterface)  
if [ -d "frontend/src" ]; then
    echo "💾 Sauvegarde Frontend Port 3000 (React)..."
    mkdir -p "$BACKUP_DIR/frontend_port_3000"
    cp -r frontend/src "$BACKUP_DIR/frontend_port_3000/"
    echo "✅ Frontend Port 3000 sauvé"
else
    echo "❌ Frontend Port 3000 non trouvé"
fi

# Backup autres frontends
for frontend_dir in frontend-temporal frontend-legendary-ui quantum-visualizer; do
    if [ -d "$frontend_dir" ]; then
        echo "💾 Sauvegarde $frontend_dir..."
        cp -r "$frontend_dir" "$BACKUP_DIR/"
        echo "✅ $frontend_dir sauvé"
    fi
done

# Créer un fichier de documentation
cat > "$BACKUP_DIR/README_CONFUSION_FRONTENDS.md" << 'EOF'
# 🔐 BACKUP SÉCURITÉ FRONTENDS

## 🚨 CONFUSION ÉVITÉE

Ce backup a été créé pour éviter la confusion entre les différents frontends :

### 📱 PORT 8000 - Interface Temporal Engine
- **Fichier**: `frontend_port_8000/`
- **Type**: HTML/CSS/JS simple avec Python http.server
- **Utilisation**: `./hots start` puis `localhost:8000`
- **Composant clé**: `fog-of-war-system.js` (Brouillard de Causalité)
- **Style Jean**: Simple, direct, télécommande compatible

### 🌟 PORT 3000 - React TrueHeroesInterface  
- **Fichier**: `frontend_port_3000/src/`
- **Type**: React sophistiqué avec TypeScript
- **Utilisation**: `npm start` puis `localhost:3000`
- **Composant clé**: `TrueHeroesInterface.tsx` + `ModernGameRenderer.tsx`
- **Style**: Complexe, panneaux multiples, interface riche

### ⚠️ RÈGLE SÉCURITÉ
**TOUJOURS vérifier quel frontend Jean utilise avant modification !**
- Si Jean dit "port 8000" → Modifier `frontend/`
- Si Jean dit "React" ou "port 3000" → Modifier `frontend/src/`
- En cas de doute → DEMANDER !

## 📅 Backup créé le: BACKUP_DATE
EOF

sed -i "s/BACKUP_DATE/$(date '+%d/%m/%Y %H:%M:%S')/" "$BACKUP_DIR/README_CONFUSION_FRONTENDS.md"

echo ""
echo "🎯 RÉSUMÉ BACKUP:"
echo "=================="
echo "📁 Dossier: $BACKUP_DIR"
echo "📱 Port 8000: ✅ Temporal Engine (fog-of-war-system.js)"
echo "🌟 Port 3000: ✅ React Interface (TrueHeroesInterface.tsx)"
echo "📚 Doc: ✅ README_CONFUSION_FRONTENDS.md"
echo ""
echo "🔐 SÉCURITÉ: Confusion frontends évitée !"
echo "💡 Conseil: Toujours vérifier le port avant modification" 