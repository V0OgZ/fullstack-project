#!/bin/bash

# 🔮 TÉLÉCHARGEMENT D'OBJETS MAGIQUES
# Assets d'objets magiques depuis OpenGameArt.org

echo "🔮 Téléchargement des objets magiques depuis OpenGameArt.org..."

# Créer le dossier des objets magiques
mkdir -p frontend/public/assets/objects

# Fonction pour télécharger un asset
download_asset() {
  local url=$1
  local filename=$2
  local name=$3
  
  echo "📥 Téléchargement de $name..."
  
  if curl -L -o "frontend/public/assets/objects/$filename" "$url"; then
    echo "✅ $name téléchargé avec succès"
  else
    echo "❌ Échec du téléchargement de $name"
  fi
}

echo "🎯 Téléchargement des assets d'objets magiques..."

# LPC Magic Items (OpenGameArt.org)
download_asset "https://opengameart.org/sites/default/files/LPC%20Magic%20Items.zip" "magic_items.zip" "LPC Magic Items"

# Simple Magic Items Pack
download_asset "https://opengameart.org/sites/default/files/simple_magic_items.zip" "simple_magic_items.zip" "Simple Magic Items"

# Fantasy UI Items
download_asset "https://opengameart.org/sites/default/files/fantasy_ui_items.zip" "fantasy_ui_items.zip" "Fantasy UI Items"

# Weapons and Armor Pack
download_asset "https://opengameart.org/sites/default/files/weapons_armor_pack.zip" "weapons_armor.zip" "Weapons & Armor Pack"

# Medieval Items
download_asset "https://opengameart.org/sites/default/files/medieval_items.zip" "medieval_items.zip" "Medieval Items"

echo "📦 Extraction des archives..."

cd frontend/public/assets/objects || exit 1

# Extraire les archives si disponibles
for zip_file in *.zip; do
  if [ -f "$zip_file" ]; then
    echo "📤 Extraction de $zip_file..."
    unzip -q "$zip_file" 2>/dev/null || echo "⚠️ Impossible d'extraire $zip_file"
  fi
done

# Organiser les fichiers
echo "📁 Organisation des fichiers..."

# Créer des dossiers par type
mkdir -p swords shields rings potions scrolls orbs boots crowns amulets staffs tomes gems

# Déplacer les fichiers selon leur type (si ils existent)
find . -name "*sword*" -type f -exec mv {} swords/ \; 2>/dev/null
find . -name "*shield*" -type f -exec mv {} shields/ \; 2>/dev/null
find . -name "*ring*" -type f -exec mv {} rings/ \; 2>/dev/null
find . -name "*potion*" -type f -exec mv {} potions/ \; 2>/dev/null
find . -name "*scroll*" -type f -exec mv {} scrolls/ \; 2>/dev/null
find . -name "*orb*" -type f -exec mv {} orbs/ \; 2>/dev/null
find . -name "*boot*" -type f -exec mv {} boots/ \; 2>/dev/null
find . -name "*crown*" -type f -exec mv {} crowns/ \; 2>/dev/null
find . -name "*amulet*" -type f -exec mv {} amulets/ \; 2>/dev/null
find . -name "*staff*" -type f -exec mv {} staffs/ \; 2>/dev/null
find . -name "*tome*" -type f -exec mv {} tomes/ \; 2>/dev/null
find . -name "*gem*" -type f -exec mv {} gems/ \; 2>/dev/null

# Nettoyer les archives
rm -f *.zip

echo "🎮 Objets magiques téléchargés dans frontend/public/assets/objects/"
echo "📁 Dossiers créés : swords, shields, rings, potions, scrolls, orbs, boots, crowns, amulets, staffs, tomes, gems"
echo "✅ Script terminé ! Les objets magiques sont maintenant disponibles."

# Retour au dossier principal
cd ../../../../ 