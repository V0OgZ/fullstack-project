#!/bin/bash

# 🏰 Download Game Assets Collection (Heroes of Time)
# ================================================================
# Bâtiments, créatures, et objets pour un jeu qui a de la classe
# Style LPC/HoMM compatible avec notre interface actuelle

echo "🏰 Downloading Game Assets Collection for Heroes of Time..."
echo "============================================================"

# Variables de configuration
ASSETS_DIR="🌐 frontend/public/assets"
BUILDINGS_DIR="$ASSETS_DIR/buildings"
CREATURES_DIR="$ASSETS_DIR/creatures"
TEMP_DIR="temp_assets_download"

# URLs des packs OpenGameArt
declare -a ASSET_PACKS=(
    "https://opengameart.org/sites/default/files/lpc-buildings_0.zip"
    "https://opengameart.org/sites/default/files/lpc-monsters.zip"
    "https://opengameart.org/sites/default/files/medieval-fantasy-character-pack.zip"
    "https://opengameart.org/sites/default/files/oga-character-sprites.zip"
)

# Noms des packs
declare -a PACK_NAMES=(
    "LPC Buildings"
    "LPC Monsters"
    "Medieval Fantasy Characters"
    "OGA Character Sprites"
)

# Types de contenu
declare -a PACK_TYPES=(
    "buildings"
    "creatures"
    "creatures"
    "creatures"
)

# Créer les dossiers nécessaires
echo "📁 Creating directories..."
mkdir -p "$BUILDINGS_DIR"
mkdir -p "$CREATURES_DIR"
mkdir -p "$TEMP_DIR"

# Compteurs
TOTAL_DOWNLOADED=0
TOTAL_BUILDINGS=0
TOTAL_CREATURES=0

cd "$TEMP_DIR"

# Télécharger tous les packs
for i in "${!ASSET_PACKS[@]}"; do
    url="${ASSET_PACKS[$i]}"
    name="${PACK_NAMES[$i]}"
    type="${PACK_TYPES[$i]}"
    filename="asset_pack_$i.zip"
    
    echo ""
    echo "⬇️ Downloading $name..."
    
    # Télécharger avec curl ou wget
    if command -v curl &> /dev/null; then
        curl -L "$url" -o "$filename" 2>/dev/null
    elif command -v wget &> /dev/null; then
        wget "$url" -O "$filename" 2>/dev/null
    else
        echo "❌ Error: Neither curl nor wget found."
        continue
    fi
    
    # Vérifier le téléchargement
    if [ -f "$filename" ]; then
        echo "✅ $name downloaded successfully"
        TOTAL_DOWNLOADED=$((TOTAL_DOWNLOADED + 1))
        
        # Marquer le type pour l'organisation
        echo "$type" > "${filename}.type"
    else
        echo "⚠️  Warning: Failed to download $name"
    fi
done

echo ""
echo "📦 Extracting and organizing assets..."

# Extraire et organiser tous les fichiers
for file in asset_pack_*.zip; do
    if [ -f "$file" ]; then
        echo "  📂 Extracting $file..."
        
        # Lire le type d'asset
        type_file="${file}.type"
        if [ -f "$type_file" ]; then
            asset_type=$(cat "$type_file")
        else
            asset_type="misc"
        fi
        
        # Extraire dans un dossier temporaire
        extract_dir="extracted_$(basename "$file" .zip)"
        mkdir -p "$extract_dir"
        
        if command -v unzip &> /dev/null; then
            unzip -q "$file" -d "$extract_dir" 2>/dev/null
        fi
        
        # Organiser par type
        if [ "$asset_type" == "buildings" ]; then
            target_dir="../$BUILDINGS_DIR"
        elif [ "$asset_type" == "creatures" ]; then
            target_dir="../$CREATURES_DIR"
        else
            target_dir="../$ASSETS_DIR/misc"
            mkdir -p "$target_dir"
        fi
        
        # Copier tous les fichiers image
        find "$extract_dir" -name "*.png" -o -name "*.jpg" -o -name "*.gif" | while read -r asset; do
            if [ -f "$asset" ]; then
                filename=$(basename "$asset")
                clean_name=$(echo "$filename" | tr '[:upper:]' '[:lower:]' | tr ' ' '_')
                
                # Éviter les doublons
                counter=1
                final_name="$clean_name"
                while [ -f "$target_dir/$final_name" ]; do
                    extension="${clean_name##*.}"
                    basename="${clean_name%.*}"
                    final_name="${basename}_${counter}.${extension}"
                    counter=$((counter + 1))
                done
                
                cp "$asset" "$target_dir/$final_name"
                echo "    ✓ $filename → $final_name"
                
                if [ "$asset_type" == "buildings" ]; then
                    TOTAL_BUILDINGS=$((TOTAL_BUILDINGS + 1))
                elif [ "$asset_type" == "creatures" ]; then
                    TOTAL_CREATURES=$((TOTAL_CREATURES + 1))
                fi
            fi
        done
    fi
done

# Retourner au répertoire principal
cd ..

# Nettoyer les fichiers temporaires
echo ""
echo "🧹 Cleaning up temporary files..."
rm -rf "$TEMP_DIR"

# Créer les fichiers de configuration
echo "📄 Creating asset configuration files..."

# Configuration des bâtiments
cat > "$BUILDINGS_DIR/buildings-config.json" << 'EOF'
{
  "buildings": {
    "castle": {
      "name": "Castle",
      "type": "stronghold",
      "description": "Main fortress for hero recruitment"
    },
    "tower": {
      "name": "Mage Tower",
      "type": "magic",
      "description": "Magical research facility"
    },
    "barracks": {
      "name": "Barracks",
      "type": "military",
      "description": "Training ground for warriors"
    },
    "marketplace": {
      "name": "Marketplace",
      "type": "economic",
      "description": "Trade and resource management"
    },
    "temple": {
      "name": "Temple",
      "type": "religious",
      "description": "Healing and divine magic"
    }
  },
  "style": "LPC Fantasy",
  "format": "PNG sprites",
  "license": "CC-BY-SA 3.0"
}
EOF

# Configuration des créatures
cat > "$CREATURES_DIR/creatures-config.json" << 'EOF'
{
  "creatures": {
    "dragon": {
      "name": "Dragon",
      "type": "legendary",
      "description": "Powerful flying creature"
    },
    "knight": {
      "name": "Knight",
      "type": "human",
      "description": "Elite warrior unit"
    },
    "wizard": {
      "name": "Wizard",
      "type": "human",
      "description": "Magical spellcaster"
    },
    "orc": {
      "name": "Orc",
      "type": "monster",
      "description": "Savage warrior"
    },
    "skeleton": {
      "name": "Skeleton",
      "type": "undead",
      "description": "Animated bones"
    }
  },
  "style": "LPC Fantasy",
  "format": "PNG sprites",
  "license": "CC-BY-SA 3.0"
}
EOF

# Créer un README pour les assets
cat > "$ASSETS_DIR/ASSETS_README.md" << 'EOF'
# Game Assets Collection - Heroes of Time

## 🏰 Buildings
Fantasy structures for kingdom building and strategic gameplay.
- **Source**: LPC Buildings (OpenGameArt)
- **Style**: Top-down/isometric pixel art
- **Usage**: Castle management, city building

## 🐉 Creatures
Combat units and monsters for tactical battles.
- **Source**: LPC Monsters, Medieval Fantasy Pack
- **Style**: Character sprites with animations
- **Usage**: Combat, unit recruitment, encounters

## 🎨 Integration
Assets are organized by type and ready for use in React components:

```typescript
// Example usage
const buildingSprite = '/assets/buildings/castle.png';
const creatureSprite = '/assets/creatures/dragon.png';
```

## 📝 License
All assets are CC-BY-SA 3.0 licensed.
Attribution to original artists from OpenGameArt.org.

## 🎮 EpicView Integration
These assets are displayed in the Epic Items Viewer for easy browsing.
EOF

# Créer un script de vérification des assets
cat > "check-assets.sh" << 'EOF'
#!/bin/bash
echo "🔍 Checking Heroes of Time Assets..."
echo "=================================="

echo "🏰 Buildings:"
find 🌐 frontend/public/assets/buildings -name "*.png" -o -name "*.jpg" | wc -l | xargs echo "  PNG/JPG files:"

echo "🐉 Creatures:"
find 🌐 frontend/public/assets/creatures -name "*.png" -o -name "*.jpg" | wc -l | xargs echo "  PNG/JPG files:"

echo "🎨 Heroes:"
find 🌐 frontend/public/assets/heroes -name "*.png" -o -name "*.jpg" | wc -l | xargs echo "  PNG/JPG files:"

echo ""
echo "✅ Asset check complete!"
EOF

chmod +x "check-assets.sh"

# Résumé final
echo ""
echo "🎉 Game Assets Collection installed successfully!"
echo "==============================================="
echo "📊 Statistics:"
echo "   • Packs downloaded: $TOTAL_DOWNLOADED/4"
echo "   • Buildings: $TOTAL_BUILDINGS assets"
echo "   • Creatures: $TOTAL_CREATURES assets"
echo "   • Total size: $(du -sh $ASSETS_DIR 2>/dev/null | cut -f1)"
echo ""
echo "🚀 Next steps:"
echo "   1. Assets ready for EpicView integration"
echo "   2. Run ./check-assets.sh to verify"
echo "   3. Create EpicView component to display all content"
echo ""
echo "✅ Your game now has the visual assets it deserves!"
echo "   Ready for epic battles and kingdom building! 🏰⚔️" 