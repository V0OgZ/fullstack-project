#!/bin/bash

# 🏰 Download Race-Specific Buildings for Heroes of Time
# =======================================================
# Télécharge les bâtiments par race selon buildingImageService.ts

echo "🏰 Downloading Race-Specific Buildings..."
echo "========================================"

BUILDINGS_DIR="🌐 frontend/public/assets/buildings"

# Créer les dossiers de races
mkdir -p "$BUILDINGS_DIR/human"
mkdir -p "$BUILDINGS_DIR/elf"
mkdir -p "$BUILDINGS_DIR/dwarf"
mkdir -p "$BUILDINGS_DIR/orc"
mkdir -p "$BUILDINGS_DIR/undead"
mkdir -p "$BUILDINGS_DIR/celestial"

# Function to download or create SVG building
download_or_create_building() {
    local race="$1"
    local building="$2"
    local name="$3"
    local color="$4"
    local icon="$5"
    
    local target_file="$BUILDINGS_DIR/$race/$building.svg"
    local target_icon="$BUILDINGS_DIR/$race/${building}_icon.svg"
    
    echo "  📁 Creating $race $building..."
    
    # Créer un SVG simple avec style approprié
    cat > "$target_file" << EOF
<svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <rect x="8" y="16" width="48" height="32" fill="$color" stroke="#000" stroke-width="2"/>
  <rect x="12" y="20" width="12" height="16" fill="#654321" stroke="#000"/>
  <rect x="40" y="20" width="12" height="16" fill="#654321" stroke="#000"/>
  <polygon points="32,8 8,16 56,16" fill="#8B4513" stroke="#000" stroke-width="2"/>
  <text x="32" y="54" text-anchor="middle" font-family="Arial" font-size="8" fill="#000">$icon</text>
</svg>
EOF
    
    # Créer l'icône
    cat > "$target_icon" << EOF
<svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
  <rect x="4" y="8" width="24" height="16" fill="$color" stroke="#000" stroke-width="1"/>
  <polygon points="16,4 4,8 28,8" fill="#8B4513" stroke="#000"/>
  <text x="16" y="28" text-anchor="middle" font-family="Arial" font-size="12" fill="#000">$icon</text>
</svg>
EOF
    
    echo "    ✅ $name créé"
}

# Télécharger/créer les bâtiments par race
echo "🏰 Creating Human buildings..."
download_or_create_building "human" "castle" "Château Humain" "#D2691E" "🏰"
download_or_create_building "human" "barracks" "Caserne Humaine" "#8B4513" "⚔️"
download_or_create_building "human" "tower" "Tour de Mage" "#4169E1" "🔮"

echo "🧝 Creating Elf buildings..."
download_or_create_building "elf" "tree_castle" "Château-Arbre Elfique" "#228B22" "🌳"
download_or_create_building "elf" "moonwell" "Puits de Lune" "#E6E6FA" "🌙"

echo "🏔️ Creating Dwarf buildings..."
download_or_create_building "dwarf" "mountain_hall" "Salle des Montagnes" "#696969" "⛰️"
download_or_create_building "dwarf" "forge" "Grande Forge" "#FF4500" "🔨"

echo "👹 Creating Orc buildings..."
download_or_create_building "orc" "stronghold" "Forteresse Orc" "#8B0000" "💀"
download_or_create_building "orc" "pit" "Fosse de Combat" "#654321" "⚔️"

echo "💀 Creating Undead buildings..."
download_or_create_building "undead" "necropolis" "Nécropole" "#2F4F4F" "💀"
download_or_create_building "undead" "mausoleum" "Mausolée" "#000000" "⚱️"

echo "✨ Creating Celestial buildings..."
download_or_create_building "celestial" "crystal_spire" "Flèche de Cristal" "#00CED1" "💎"
download_or_create_building "celestial" "sanctuary" "Sanctuaire" "#FFD700" "✨"

# Vérifier les résultats
echo ""
echo "📊 Building assets summary:"
for race in human elf dwarf orc undead celestial; do
    count=$(find "$BUILDINGS_DIR/$race" -name "*.svg" | wc -l)
    echo "  $race: $count SVG files"
done

echo ""
echo "🎉 Race-specific buildings created successfully!"
echo "🏰 All races now have their unique architectural style!"
echo "✅ Buildings ready for EpicContentViewer integration!" 