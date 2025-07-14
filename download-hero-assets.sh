#!/bin/bash

# Heroes of Time - Hero Assets Download Script
# Downloads free hero graphics and organizes them properly

echo "🎨 Heroes of Time - Hero Assets Download Script"
echo "=============================================="

# Create directories
mkdir -p frontend/public/assets/heroes/portraits
mkdir -p frontend/public/assets/heroes/sprites
mkdir -p frontend/public/assets/heroes/animations

echo "📁 Created asset directories"

# Download function
download_asset() {
    local name=$1
    local url=$2
    local desc=$3
    
    echo "📥 Downloading $name..."
    echo "   Description: $desc"
    echo "   URL: $url"
    echo ""
}

echo "🎁 Available FREE Hero Assets:"
echo ""

# OpenGameArt.org Resources
echo "1. 📋 OpenGameArt.org (CC-BY License)"
download_asset "24x32 Characters Big Pack" \
    "https://opengameart.org/content/24x32-characters-with-faces-big-pack" \
    "53 characters including heroes, NPCs, and portrait faces"

download_asset "Classic Hero Pack" \
    "https://opengameart.org/content/classic-hero-and-baddies-pack" \
    "Animated heroes with punching, kicking, movement animations"

download_asset "12 RPG Sprites + Base" \
    "https://opengameart.org/content/twelve-16x18-rpg-sprites-plus-base" \
    "Warriors, mages, thieves, healers with customizable base template"

download_asset "Cabbit's Hero Collection" \
    "https://opengameart.org/content/24x32-heroine-lyuba-sprites-faces-pictures" \
    "Multiple classes with both portraits and battle sprites"

echo ""
echo "2. 🎨 Kenney.nl (CC0 - No Attribution Required)"
download_asset "Roguelike Characters" \
    "https://kenney.nl/assets/roguelike-characters" \
    "450+ character sprites, completely free"

download_asset "Tiny Dungeon Pack" \
    "https://kenney-assets.itch.io/tiny-dungeon" \
    "130+ sprites including heroes, weapons, and items"

download_asset "1-Bit Pack" \
    "https://kenney-assets.itch.io/1-bit-pack" \
    "1000+ sprites perfect for prototyping"

echo ""
echo "3. 💰 Itch.io Premium (Worth $3-5)"
download_asset "Cute Fantasy RPG" \
    "https://kenmi-art.itch.io/cute-fantasy-rpg" \
    "Adorable 16x16 heroes with full animations"

echo ""
echo "🔧 INSTALLATION INSTRUCTIONS:"
echo ""
echo "1. Visit the URLs above and download the assets"
echo "2. Extract hero sprites to: frontend/public/assets/heroes/sprites/"
echo "3. Extract portraits to: frontend/public/assets/heroes/portraits/"
echo "4. Update frontend/src/constants/gameAssets.ts with new paths"
echo ""
echo "Example usage in gameAssets.ts:"
echo "export const HERO_ASSETS = {"
echo "  WARRIOR: '/assets/heroes/sprites/warrior.png',"
echo "  MAGE: '/assets/heroes/sprites/mage.png',"
echo "  ARCHER: '/assets/heroes/sprites/archer.png',"
echo "  KNIGHT: '/assets/heroes/sprites/knight.png',"
echo "  ROGUE: '/assets/heroes/sprites/rogue.png',"
echo "};"
echo ""
echo "export const HERO_PORTRAITS = {"
echo "  WARRIOR: '/assets/heroes/portraits/warrior_portrait.png',"
echo "  MAGE: '/assets/heroes/portraits/mage_portrait.png',"
echo "  // ... more portraits"
echo "};"
echo ""
echo "🎯 RECOMMENDED STARTER PACK:"
echo "- Download 'Classic Hero Pack' for animations"
echo "- Download 'Cabbit's Big Pack' for portraits"
echo "- Download 'Kenney Roguelike Characters' for variety"
echo ""
echo "💡 TIP: Your current SVG system is already great!"
echo "   These assets will give you more variety and animations."
echo ""
echo "Happy hero hunting! 🎮" 